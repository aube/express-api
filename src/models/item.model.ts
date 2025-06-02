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

    for (let n = from; n < from + limit; n++) {
      arr[n] = getItemByIndex(n);
    }

    return arr;
  };

  public changePosition = (id: number, shift: number): Item => {
    let index = ITEMS.findIndex((item) => item === id);
    let newIndex = index + shift;

    console.log(getItemByIndex(index));

    ITEMS[index] = ITEMS[index] ^ ITEMS[newIndex];
    ITEMS[newIndex] = ITEMS[newIndex] ^ ITEMS[index];
    ITEMS[index] = ITEMS[index] ^ ITEMS[newIndex];

    MARKS[index] = MARKS[index] ^ MARKS[newIndex];
    MARKS[newIndex] = MARKS[newIndex] ^ MARKS[index];
    MARKS[index] = MARKS[index] ^ MARKS[newIndex];

    console.log(index, getItemByIndex(index));
    console.log(newIndex, getItemByIndex(newIndex));

    return getItemByIndex(newIndex);
  };

  public markToggle = (id: number): Item => {
    let index = ITEMS.findIndex((item) => item === id);

    MARKS[index] = Number(!MARKS[index]);

    return getItemByIndex(index);
  };
}
