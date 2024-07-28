import { mongoose, Schema } from "mongoose";


const expenseSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        splitMethod: {
            type: String,
            enum: ["equal", "exact", "percentage"]
        },
        participants: [{
            participant: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            amountOwed: {
                type: Number,
                required: true,
                min: 0
            },
        }],
        
    },
    {
        timestamps: true
    }
)

export const Expense = mongoose.model("Expense", expenseSchema)