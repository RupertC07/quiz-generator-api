"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const CustomErrors_1 = require("../utils/CustomErrors");
const validateSchema = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new CustomErrors_1.ValidationError(result.error.errors[0].message);
    }
    return result.data;
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=zod.valiadator.js.map