import { Character } from "./character";

export class InventoryDialogConfig {
  private _characters: Character[] = [];
  private _battleInterface: boolean = false;
  private _focus: boolean = true;

  public get characters(): Character[] {
    return this._characters;
  }

  public set characters(value: Character[]) {
    this._characters = value;
  }

  public get battleInterface(): boolean {
    return this._battleInterface;
  }

  public set battleInterface(value: boolean) {
    this._battleInterface = value;
  }

  public get focus(): boolean {
    return this._focus;
  }

  public set focus(value: boolean) {
    this._focus = value;
  }
}