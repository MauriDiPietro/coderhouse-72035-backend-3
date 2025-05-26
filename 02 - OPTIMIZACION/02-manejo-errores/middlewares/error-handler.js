import { NotFoundError, UnauthorizedError } from "../utils/error-manager.js";
import { httpResponse } from "../utils/http-response.js";

export const errorHandler = (error, req, res, next) =>{
    let statusCode = error.status;
    if(error instanceof NotFoundError) return httpResponse.NotFound(res, error);
    if(error instanceof UnauthorizedError) return httpResponse.Unauthorized(res, error);
    res.status(statusCode).json({
        status: statusCode,
        error: error.name,
        message: error.message,
    })
}