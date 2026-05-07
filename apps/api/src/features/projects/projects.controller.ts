import type { NextFunction, Request, Response } from "express";
import { ProjectsService } from "./projects.services";

const projectsService = new ProjectsService();

export async function createProjectByUser(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const user_id = req.session.user.id;

		if (!user_id) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const users = await projectsService.findAllByUser(user_id);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
}
