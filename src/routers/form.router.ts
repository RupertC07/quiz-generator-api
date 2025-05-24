import { Router } from "express";
import formController from "../controllers/form.controller";


const formRouter = Router();

formRouter.post("/", formController.generateForm);

export default formRouter;