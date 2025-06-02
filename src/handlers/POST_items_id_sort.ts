import { Request, Response } from "express";
import { ItemModel } from "../models";

const model = new ItemModel();

export const POST_items_id_sort = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const shift = Number(req.body.shift);
  const item = model.changePosition(id, shift);
  res.status(200).json(item);
};
