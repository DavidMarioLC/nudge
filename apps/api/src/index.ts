import type { Request, Response } from "express";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.send("Hello World");
});

app.listen(3000, () => {
	console.log("API Server running on http://localhost:3000");
});
