import express from "express";
import type { Request, Response, Router } from "express";

import { apiV1RateLimiter } from "../middlewares/api-rate-limit.middleware";
import shortenerRoute from "./v1/shortener/shortener.route";

const router: Router = express.Router();

router.get("/ping", (_req: Request, res: Response) => res.json({ message: "pong!" }));

router.use(apiV1RateLimiter);

router.use("/shortener", shortenerRoute);

export default router;
