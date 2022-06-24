import { Item } from "./item";

export class InventoryDialogRow {
  private _options: Item[];

  constructor(options: Item[]) {
    this._options = options;
  }

  public get options(): Item[] {
    return this._options;
  }

  public set options(value: Item[]) {
    this._options = value;
  }
}