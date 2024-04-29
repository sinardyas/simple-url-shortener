import { Router } from "express";
import catchHandlerMiddleware from "../../../middlewares/catch-handler.middleware";
import { get, sync } from "./schedule.controller";

const router = Router();

router.post("/", catchHandlerMiddleware(sync));
router.get("/", catchHandlerMiddleware(get));

export default router;
