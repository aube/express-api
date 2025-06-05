import { Request, Response } from "express";
import { ItemModel } from "../models";

const model = new ItemModel();

export const GET_items_filter = (req: Request, res: Response): void => {
  const from = Number(req.query.from) || 0;
  const size = Number(req.query.size);
  const filter = String(req.params.filter);

  const { items, lastIndex, firstEntry } = model.getItemsFiltered(
    from,
    size,
    filter,
  );

  res.status(200).json({ items, lastIndex, firstEntry, ...model.status() });
};
