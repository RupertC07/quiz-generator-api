"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.NotFoundError = exports.AuthError = exports.ValidationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        // Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.CustomError = CustomError;
class ValidationError extends CustomError {
    constructor(message = "Validation failed") {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class AuthError extends CustomError {
    constructor(message = "Invalid Credentials") {
        super(message, 401);
    }
}
exports.AuthError = AuthError;
class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ServerError extends CustomError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=CustomErrors.js.map