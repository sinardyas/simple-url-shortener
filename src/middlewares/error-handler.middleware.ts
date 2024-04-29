/**
 * This middleware is responsible for returning a json every time
 * an error comes in. We use in the index.ts as global middleware
 */
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../commons/errors/error";
import { logger } from "../commons/utils/log";

dotenv.config();

const errorHandleMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isProduction = process.env.NODE_ENV === "production";
  let errorMessage = {};

  if (res.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    logger.debug(err.stack);
    errorMessage = err;
  }

  if (err) {
    return res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      error: {
        message: err.message,
        ...(!isProduction && { trace: errorMessage }),
      },
    });
  }
};

export default errorHandleMiddleware;
