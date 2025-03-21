export const errorHandler = (err, req, res, next) => {
   
        const statusCode = res.statusCode || 400;
        res.status(statusCode).json({
            message : err.message,
            stack : process.env.NODE_ENV === 'development' ? err.stack : null,
        })

}


export const invalidPathHandler = (req, res, next) => {
    let  error = new Error('Invalid path');
    error.statusCode = 404;
    next(error);
}


