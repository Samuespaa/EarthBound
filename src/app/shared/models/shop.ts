import { Item } from "./item";

export class Shop {
  private _name: string;
  private _items: Item[];

  constructor(name: string, items: Item[]) {
    this._name = name;
    this._items = items;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get items(): Item[] {
    return this._items;
  }
  
  public set items(value: Item[]) {
    this._items = value;
  }
}