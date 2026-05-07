import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { projectRouter } from "./features/projects/projects.routes";
import { auth } from "./lib/auth";

const app = express();
const port = process.env.PORT;

// Configure CORS middleware
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	credentials: true,
};
app.use(cors(corsOptions));

app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
app.use(express.json());

// endpoints
app.post("/projects", projectRouter);
// app.get("/api/me", requireAuth, async (req, res) => {
// 	return res.json({ user: req.session.user });
// });

app.listen(port, () => {
	console.log(`REST API : http://localhost:${port}`);
});
