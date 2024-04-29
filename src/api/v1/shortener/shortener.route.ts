import { Router } from "express";
import catchHandlerMiddleware from "../../../middlewares/catch-handler.middleware";
import validationMiddleware from "../../../middlewares/validation.middleware";
import { create, redirect } from "./shortener.controller";
import { shortenerSchema } from "./shortener.schema";

const router = Router();

router.post("/", validationMiddleware(shortenerSchema), catchHandlerMiddleware(create));
router.get("/:id", catchHandlerMiddleware(redirect));

export default router;
