export type Item = {
  id: number;
  content: string;
  mark: boolean;
};

const LEN = 1e6;
const LEN_CONTENT = LEN.toString().length;

export class MemStore {
  private static instance: MemStore;
  private items: Int32Array;
  private marks: Int8Array;

  private constructor() {
    this.items = this.getItemsArr();
    this.marks = this.getMarksArr();
  }

  public static getInstance(): MemStore {
    if (!MemStore.instance) {
      MemStore.instance = new MemStore();
    }
    return MemStore.instance;
  }

  private getItemsArr() {
    return new Int32Array(LEN).map((_, idx) => idx + 1);
  }

  private getMarksArr() {
    return new Int8Array(LEN).fill(0);
  }

  private getItemByIndex(index: number): Item {
    const id = this.items[index];
    const mark = Boolean(this.marks[index]);
    const content = ("0".repeat(LEN_CONTENT) + String(id)).slice(-LEN_CONTENT);
    return {
      id,
      content,
      mark,
    };
  }

  private moveArrayElements<T extends Int8Array | Int32Array>(
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

  public getItems(from: number, limit: number): Item[] {
    const arr: Item[] = new Array(limit);

    let i = 0;
    let n = from;
    while (i < limit && n < LEN) {
      const item = this.getItemByIndex(n++);
      arr[i++] = item;
    }
    return arr;
  }

  public getItemsFiltered(
    from: number,
    limit: number,
    filter: string,
  ): { items: Item[]; firstEntry: number; lastEntry: number } {
    const arr: Item[] = new Array(limit);

    let i = 0;
    let n = from;
    let firstEntry = 0;
    let lastEntry = 0;

    while (i < limit && n < LEN) {
      const item = this.getItemByIndex(n++);
      if (item.content.includes(filter)) {
        firstEntry = firstEntry ? firstEntry : n;
        lastEntry = n;
        arr[i++] = item;
      }
    }

    return {
      items: arr,
      firstEntry,
      lastEntry,
    };
  }

  public getIndexById(id: number): number {
    return this.items.findIndex((item) => item === id);
  }

  public changePosition(id: number, shift: number): Item {
    let index = this.getIndexById(id);
    let newIndex = index + shift;

    this.moveArrayElements(this.items, index, newIndex);
    this.moveArrayElements(this.marks, index, newIndex);

    return this.getItemByIndex(newIndex);
  }

  public markToggle = (id: number): Item => {
    let index = this.getIndexById(id);

    this.marks[index] = Number(!this.marks[index]);

    return this.getItemByIndex(index);
  };

  public reset() {
    this.items = this.getItemsArr();
    this.marks = this.getMarksArr();
  }
}
