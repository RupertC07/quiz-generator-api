import z from "zod"

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


export const question_schema = z.object({
    question: z.string().min(1, "Question cannot be empty"),
    type: z.enum(["true_false", "multiple_choice", "text", "select_correct_answers"]),
    options: z.array(z.string()).min(1, "At least one option is required").optional(),
    correct_answers: z.array(z.string()).min(1, "At least one correct answer is required"),
})

export const form_schema = z.object({
    name: z.string().min(1, "Form name cannot be empty"),
    description: z.string().min(1, "Form description cannot be empty"),
    questions: z.array(question_schema).min(15, "At least fifteen questions are required").max(50, "No more than fifty questions are allowed"),
}); 

export type FormSchema = z.infer<typeof form_schema>;