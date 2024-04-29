import type { NextFunction, Request, Response } from "express";
// import {ICustomExpressRequest} from './currentUser.middleware';

/**
 * A function that takes a request, response, and next function as parameters.
 */
export default (catchAsyncHandler: (a: Request, b: Response, c: NextFunction) => void) =>
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      catchAsyncHandler(request, response, next);
    } catch (error) {
      return next(error);
    }
  };
