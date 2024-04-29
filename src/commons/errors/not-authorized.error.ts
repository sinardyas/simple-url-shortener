import { CustomError } from "./error";

export class NotAuthorizedError extends CustomError {
  constructor(message: string) {
    super(401, message);
  }
}
