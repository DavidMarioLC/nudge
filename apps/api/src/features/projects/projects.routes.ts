import { Router } from "express";
import { createProjectByUser } from "./projects.controller";
export const projectRouter = Router();

projectRouter.post("/projects", createProjectByUser);
