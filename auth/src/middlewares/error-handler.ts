import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError, RequestValidationError, CustomError } from "../errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  res.status(400).send({
    message: "Something went wrong",
  });
};
