import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Expense } from "../models/expense.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import PDFDocument from 'pdfkit';

const addExpense = asyncHandler(async (req, res) => {
    const { description,splitMethod, participants } = req.body;
    const userId = req.user._id;
    const addedBy = userId;
    let totalAmount=0;

    let members = [];
   
    const allowedSplitMethods = ["equal", "exact", "percentage"];
    if (!allowedSplitMethods.includes(splitMethod)) {
        throw new apiError(404, "Invalid split method. Choose from equal, exact, or percentage.");
    }
    
    // calculate overall / total expense
    participants.map((participant)=>{
        totalAmount+=participant.amount
    })
    

    

    // Check if all participants exist in DB and calculate the amount owed by each member
    await Promise.all(
        participants.map(async (participant) => {
            const name = participant.name;
            const user = await User.findOne({ name });

            if (!user) {
                throw new apiError(404, `Participant with username ${name} doesn't exist`);
            }

            if (splitMethod === "equal") {
                const amount = totalAmount / participants.length;
                const temp = {
                    participant: user._id,
                    amountOwed: amount,
                };
                members.push(temp);
            } else if (splitMethod === "exact") {
                members.push({
                    participant: user._id,
                    amountOwed: participant.amount,
                });
            } 
            else  {
                if(totalAmount != 100){
                    throw new apiError(401, "Sum of percentages should equal 100%");
                }
                members.push({
                    participant: user._id,
                    amountOwed: participant.amount,
                });
            }
        })
    );
    
    const expense = await Expense.create({
        description,
        totalAmount,
        addedBy,
        splitMethod,
        participants: members,
    });

    if (!expense) {
        throw new apiError(500, "Something went wrong while adding expense");
    }

    res.status(200).json(new apiResponse(200, expense, "Successfully added expense to database"));
});

const individualExpense = asyncHandler(async(req,res)=>{
    const userId= req.user._id 
    const expense = await Expense.findOne({"participants.participant": userId})
    if(!expense){
        throw new apiError(404,"No expenses found for given a user")
    }
    const participants=expense.participants
    
    let individualExpense=0
    participants.map((member)=>{
        
        if(userId.toString() === member.participant.toString()){
           
           individualExpense=member.amountOwed
        }
    })
    
    res.status(200)
    .json(
        new apiResponse(
            200,
            {individualExpense:individualExpense},
            "Individual Expense retreived Successfully"

        )
    )
})

const overallExpense = asyncHandler(async(req,res)=>{
    const userId= req.user._id 
    const expense = await Expense.findOne({"participants.participant": userId})
    if(!expense){
        throw new apiError(404,"No expenses found for a given user")
    }
    res.status(200)
    .json(
        new apiResponse(
            200,
            {overallExpense : expense.totalAmount},
            "Overall Expense retireved successfully"

        )
    )
})

const balanceSheet = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const expense = await Expense.findOne({ "participants.participant": userId });

    if (!expense) {
        throw new apiError(404, "No expenses found for a given user");
    }

    const participants = expense.participants;
   

    // Fetch participant details
    const participantDetails = await Promise.all(
        participants.map(async (member) => {
            let user = await User.findById(member.participant);
            return {
                name: user.name,
                amountOwed: member.amountOwed
            };
        })
    );

    
    const doc = new PDFDocument();

    // Set response headers to indicate a file download
    res.setHeader('Content-Disposition', 'attachment; filename=balance_sheet.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(20).text('Balance Sheet', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Total Amount: ${expense.totalAmount}`, { align: 'left' });
    doc.moveDown();

    participantDetails.forEach(participant => {
        doc.text(`${participant.name}: ${participant.amountOwed}`);
        doc.moveDown();
    });

    doc.end();
});

export { addExpense,
    individualExpense,
    overallExpense,
    balanceSheet
 };
