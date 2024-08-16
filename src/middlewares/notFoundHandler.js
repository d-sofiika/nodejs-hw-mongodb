import { HttpError } from 'http-errors';

export const notFoundHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.name,
            data: err
        })
        return;
    }
}