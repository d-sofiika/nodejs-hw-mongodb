export const errorHandles = (err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        data: 
    })
}