import { Request, Response } from "express";
import { ItemModel } from "../models";

const model = new ItemModel();

export const GET_items_filter = (req: Request, res: Response): void => {
  const lastindex = Number(req.query.lastindex);
  const size = Number(req.query.size);
  const filter = String(req.params.filter);

  const { items, li } = model.getItemsFiltered(lastindex, size, filter);

  res.status(200).json({ items, lastindex: li, ...model.status() });
};
