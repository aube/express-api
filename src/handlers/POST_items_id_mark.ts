import { Request, Response } from "express";
import { ItemModel } from "../models";

const model = new ItemModel();

export const POST_items_id_mark = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const item = model.markToggle(id);
  res.status(200).json(item);
};
