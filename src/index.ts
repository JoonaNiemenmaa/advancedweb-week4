import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
	response.send("<h1>It's working!</h1>");
});

export default router;
