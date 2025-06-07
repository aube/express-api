import { Request, Response } from "express";
import { sortItem } from "../usecases/sortItem";

export const POST_items_id_sort = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const item = sortItem(id, req.body);
  res.status(200).json(item);
};
