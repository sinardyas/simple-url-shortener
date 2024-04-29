import express from "express";
import type { Request, Response, Router } from "express";

import { apiV1RateLimiter } from "../middlewares/api-rate-limit.middleware";
import scheduleRoute from "./v1/schedule/schedule.route";
import stationRoute from "./v1/station/station.route";

const router: Router = express.Router();

router.get("/ping", (_req: Request, res: Response) => res.json({ message: "pong!" }));

router.use(apiV1RateLimiter);
router.use("/station", stationRoute);
router.use("/schedule", scheduleRoute);

export default router;
