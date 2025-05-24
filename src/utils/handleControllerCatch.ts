import { Response } from "express";
import AppResponse from "./AppResponse";
import { AuthError, ValidationError, CustomError } from "./CustomErrors";

export const handleControllerCatch = (res: Response, error: any) => {
    let responseMessage = error.message;
    let statusCode = error.statusCode || 500;


    if (error instanceof CustomError) {
        responseMessage = error.message;
        statusCode = error.statusCode;
    }

    // Send the error response
    return AppResponse.sendError({
        res,
        data: null,
        message: responseMessage,
        code: statusCode,
    });
};
