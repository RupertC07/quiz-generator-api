"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleControllerCatch = void 0;
const AppResponse_1 = __importDefault(require("./AppResponse"));
const CustomErrors_1 = require("./CustomErrors");
const handleControllerCatch = (res, error) => {
    let responseMessage = error.message;
    let statusCode = error.statusCode || 500;
    if (error instanceof CustomErrors_1.CustomError) {
        responseMessage = error.message;
        statusCode = error.statusCode;
    }
    // Send the error response
    return AppResponse_1.default.sendError({
        res,
        data: null,
        message: responseMessage,
        code: statusCode,
    });
};
exports.handleControllerCatch = handleControllerCatch;
//# sourceMappingURL=handleControllerCatch.js.map