import { Request, Response } from "express";
import { handleControllerCatch } from "../utils/handleControllerCatch";
import { validateSchema } from "../zod/zod.valiadator";
import { query_schema } from "../zod/form.schema";
import formService from "../services/form.services";
import AppResponse from "../utils/AppResponse";

class FormController {


    generateForm = async (req: Request, res: Response) => {

        try {

            const { query } = req.body;
            const data = validateSchema(query_schema, { query })
            const response = await formService.create(data.query)

            return AppResponse.sendSuccess({
                res,
                data: response,
                message: "Quiz form generated successfully",
                code: 201,
            })


        } catch (error: any) {
            handleControllerCatch(res, error);

        }

    }
}
export default new FormController();
