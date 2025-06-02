import { Request, Response } from "express";
import { ItemModel } from "../models";

const model = new ItemModel();

export const GET_items = (req: Request, res: Response): void => {
  const page = Number(req.query.page);
  const size = Number(req.query.size);

  const items = model.getItems(page, size);

  res.status(200).json({ items, ...model.status() });
};
