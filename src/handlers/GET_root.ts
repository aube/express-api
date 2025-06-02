import { Request, Response } from "express";

export const GET_root = (_: Request, res: Response): void => {
  res.status(200).json({ message: "Welcome to my API" });
};
