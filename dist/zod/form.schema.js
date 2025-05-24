"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query_schema = exports.form_schema = exports.question_schema = void 0;
const zod_1 = __importDefault(require("zod"));
// export const form_schema = z.object({
//     name: z.string(),
//     description: z.string(),
//     questions: z
//         .array(
//             z.object({
//                 question: z.string(),
//                 type: z.enum(["text", "rate"]),
//                 is_required: z.boolean(),
//                 text_type: z.enum(["long", "short"]).optional()
//             })
//         )
//         .min(1),
// });
// export const question_schema = z.object({
//     question: z.string(),
//     type: z.enum(["text", "rate"]),
//     is_required: z.boolean(),
//     text_type: z.enum(["long", "short"]).optional().nullable()
// })
exports.question_schema = zod_1.default.object({
    question: zod_1.default.string().min(1, "Question cannot be empty"),
    type: zod_1.default.enum(["true_false", "multiple_choice", "text", "select_correct_answers"]),
    options: zod_1.default.array(zod_1.default.string()).min(1, "At least one option is required").optional(),
    correct_answers: zod_1.default.array(zod_1.default.string()).min(1, "At least one correct answer is required"),
});
exports.form_schema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Form name cannot be empty"),
    description: zod_1.default.string().min(1, "Form description cannot be empty"),
    questions: zod_1.default.array(exports.question_schema).min(15, "At least fifteen questions are required").max(50, "No more than fifty questions are allowed"),
});
exports.query_schema = zod_1.default.object({
    query: zod_1.default.string().min(1, "Query cannot be empty")
});
//# sourceMappingURL=form.schema.js.map