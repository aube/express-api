import { Item, ItemModel } from "../models";

const model = new ItemModel();

type SortItemBody = {
  shift?: number;
  after?: number;
  before?: number;
};

export const sortItem = (id: number, body: SortItemBody): Item => {
  const { shift, after, before } = body;

  if (after) {
    return placeItemAfter(id, after);
  } else if (before) {
    return placeItemBefore(id, before);
  } else if (shift) {
    return moveItem(id, shift);
  }

  throw Error("[after, before, shift] - one of prameters must be specified");
};

const calcShift = (id: number, otherId: number): number => {
  const index0 = model.getIndexById(id);
  const index1 = model.getIndexById(otherId);
  return index1 - index0;
};

const placeItemBefore = (id: number, before: number): Item => {
  return moveItem(id, calcShift(id, before));
};

const placeItemAfter = (id: number, after: number): Item => {
  return moveItem(id, calcShift(id, after));
};

const moveItem = (id: number, shift: number): Item => {
  if (!shift) {
    throw Error("shift = 0");
  }
  if (shift > 0) {
    return moveItemUp(id, shift);
  }
  return moveItemDowm(id, shift);
};

const moveItemUp = (id: number, shift: number): Item => {
  return model.changePosition(id, shift);
};

const moveItemDowm = (id: number, shift: number): Item => {
  return model.changePosition(id, shift);
};
