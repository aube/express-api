import { Item, ItemModel } from "../models";
import type { ParsedQs } from "qs";

const model = new ItemModel();

type ItemsResponse = {
  items: Item[];
  page: number;
  size: number;
  lastEntry?: number;
  firstEntry?: number;
  filter?: string;
};

export const getItems = (query: ParsedQs): ItemsResponse => {
  const page = Number(query.page) || 1;
  const size = Number(query.size) || 20;
  const from = Number(query.from) || 0;
  const filter = String(query.filter || "");

  let responce: ItemsResponse = {
    items: [],
    page,
    size,
  };

  if (filter) {
    responce = { ...responce, ...model.getItemsFiltered(from, size, filter) };
  } else {
    responce = { ...responce, items: model.getItems(page, size) };
  }

  return responce;
};
