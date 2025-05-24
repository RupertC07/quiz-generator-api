import { ZodSchema } from "zod";
import { ValidationError } from "../utils/CustomErrors";

export const validateSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new ValidationError(result.error.errors[0].message);
    }

    return result.data;
};
