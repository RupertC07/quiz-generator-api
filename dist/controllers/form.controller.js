"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleControllerCatch_1 = require("../utils/handleControllerCatch");
const zod_valiadator_1 = require("../zod/zod.valiadator");
const form_schema_1 = require("../zod/form.schema");
const form_services_1 = __importDefault(require("../services/form.services"));
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
class FormController {
    constructor() {
        this.generateForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.body;
                const data = (0, zod_valiadator_1.validateSchema)(form_schema_1.query_schema, { query });
                const response = yield form_services_1.default.create(data.query);
                return AppResponse_1.default.sendSuccess({
                    res,
                    data: response,
                    message: "Quiz form generated successfully",
                    code: 201,
                });
            }
            catch (error) {
                (0, handleControllerCatch_1.handleControllerCatch)(res, error);
            }
        });
    }
}
exports.default = new FormController();
//# sourceMappingURL=form.controller.js.map