import express from "express";
import formRouter from "./form.router";

const routes = express.Router();

routes.use("/form", formRouter);

export default routes;
