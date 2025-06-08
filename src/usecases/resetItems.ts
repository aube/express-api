import { ItemModel } from "../models";

const model = new ItemModel();

export const resetItems = (): void => {
  model.reset();
};
