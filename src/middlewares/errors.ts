import { Request, Response, NextFunction } from "express";

export const midErrors = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  const code = parseInt(err.message) || 500;
  res.status(code).json({
    error: "midErrors",
    message: err.message,
  });
};
