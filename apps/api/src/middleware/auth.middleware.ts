import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import type { Session } from "../lib/auth";
import { auth } from "../lib/auth";

// Extendemos Request para que TypeScript sepa que req.session existe
declare global {
	namespace Express {
		interface Request {
			session: Session;
		}
	}
}

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	if (!session) {
		res.status(401).json({ error: "No autorizado" });
		return;
	}

	// Inyectamos la sesión en el request para usarla en la ruta
	req.session = session;
	next();
}
