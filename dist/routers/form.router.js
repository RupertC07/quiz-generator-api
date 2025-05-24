"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_controller_1 = __importDefault(require("../controllers/form.controller"));
const formRouter = (0, express_1.Router)();
formRouter.post("/", form_controller_1.default.generateForm);
exports.default = formRouter;
//# sourceMappingURL=form.router.js.map