import { Request, Response } from "express";
import { markItem } from "../usecases/markItem";

export const POST_items_id_mark = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const item = markItem(id);
  res.status(200).json(item);
};
