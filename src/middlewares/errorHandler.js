
import createError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (!err.status) {
        err = createError(500, 'Something went wrong');
    }

    res.status(err.status).json({
        status: err.status,
        message: err.message,
        data: null,
    });
};