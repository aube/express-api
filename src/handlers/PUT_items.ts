import { Request, Response } from "express";
import { resetItems } from "../usecases/resetItems";

export const PUT_items = (_: Request, res: Response): void => {
  resetItems();
  res.status(200).json({});
};
