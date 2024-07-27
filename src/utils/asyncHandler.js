const asyncHandler = (asyncFn) =>
    async(req,res,next) => {
      try {
        await asyncFn(req,res,next)
      } catch (error) {
        res.status(error.code || 500).json(
            {
                success : false,
                message : error.message
            }
        )
      }
    }

export {asyncHandler}