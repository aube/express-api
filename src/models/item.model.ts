import logger from "../logger";

export type Item = {
  id: number;
  content: string;
  mark: boolean;
};

// Заполнение массива

const LEN = 1e6;
const LEN_CONTENT = LEN.toString().length;

const ITEMS = new Int32Array(LEN).map((_, idx) => idx + 1);
const MARKS = new Int8Array(LEN).fill(0);

logger.info(`Array generated with length: ${ITEMS.length}`);

function getItemByIndex(index: number): Item {
  const id = ITEMS[index];
  const mark = Boolean(MARKS[index]);
  const content = ("0".repeat(LEN_CONTENT) + String(id)).slice(-LEN_CONTENT);
  return {
    id,
    content,
    mark,
  };
}

export class ItemModel {
  private data: Int32Array;

  constructor() {
    this.data = ITEMS;
  }

  public status = (): any => {
    return {
      length: this.data.length,
    };
  };

  public getItems = (page: number, size: number): Item[] => {
    const limit = size || 20;
    const from = ((page || 1) - 1) * limit;
    const arr: Item[] = new Array(limit);

    let i = 0;
    let n = from;
    while (i < limit && n < LEN) {
      const item = getItemByIndex(n++);
      arr[i++] = item;
    }
    return arr;
  };

  public getItemsFiltered = (
    lastindex: number,
    size: number,
    filter: string,
  ): { items: Item[]; li: number } => {
    const limit = size || 20;
    const startIndex = isNaN(parseInt(filter)) ? 0 : parseInt(filter) - 1;
    const from = Math.max(lastindex, startIndex, 0);
    const arr: Item[] = new Array(limit);

    let i = 0;
    let n = from;

    while (i < limit && n < LEN) {
      const item = getItemByIndex(n++);
      if (item.content.includes(filter)) {
        arr[i++] = item;
      }
    }
    return {
      items: arr,
      li: n,
    };
  };

  public changePosition = (id: number, shift: number): Item => {
    let index = ITEMS.findIndex((item) => item === id);
    let newIndex = index + shift;

    function moveItems<T extends Int8Array | Int32Array>(
      arr: T,
      from: number,
      to: number,
    ): void {
      const movedItem = arr[from];
      if (from < to) {
        for (let n = from; n < to; n++) {
          arr[n] = arr[n + 1];
        }
      } else if (from > to) {
        for (let n = from; n > to; n--) {
          arr[n] = arr[n - 1];
        }
      }

      arr[to] = movedItem;
    }

    moveItems(ITEMS, index, newIndex);
    moveItems(MARKS, index, newIndex);

    return getItemByIndex(newIndex);
  };

  public markToggle = (id: number): Item => {
    let index = ITEMS.findIndex((item) => item === id);

    MARKS[index] = Number(!MARKS[index]);

    return getItemByIndex(index);
  };
}
