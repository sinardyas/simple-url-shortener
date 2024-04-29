export class CustomError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function onError(e: any): string {
  if (e instanceof Error) {
    return e.message;
  }

  return JSON.stringify(e);
}
