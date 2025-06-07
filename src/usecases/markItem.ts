import { Item, ItemModel } from "../models";

const model = new ItemModel();

export const markItem = (id: number): Item => {
  return model.markToggle(id);
};
