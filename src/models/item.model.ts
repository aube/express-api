import { Item, MemStore } from "../storage/memstore";

export { Item } from "../storage/memstore";

export class ItemModel {
  private store;

  constructor() {
    this.store = MemStore.getInstance();
  }

  public getItems(page: number, size: number): Item[] {
    const limit = size || 20;
    const from = ((page || 1) - 1) * limit;

    return this.store.getItems(from, limit);
  }

  public getItemsFiltered(
    from: number,
    size: number,
    filter: string,
  ): { items: Item[]; firstEntry: number; lastEntry: number } {
    const limit = size || 20;

    return this.store.getItemsFiltered(from, limit, filter);
  }

  public getIndexById(id: number): number {
    return this.store.getIndexById(id);
  }

  public changePosition(id: number, shift: number): Item {
    return this.store.changePosition(id, shift);
  }

  public markToggle = (id: number): Item => {
    return this.store.markToggle(id);
  };

  public reset(): void {
    this.store.reset();
  }
}
