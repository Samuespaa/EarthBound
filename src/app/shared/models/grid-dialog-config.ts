import { GridDialogRow } from "./grid-dialog-row";

export class GridDialogConfig {
  private _rows: GridDialogRow[] = [];
  private _type: string = ''; // *Si el grid es de tipo batalla, menú, normal... Para su maquetación especial
  private _focus: boolean = true;
  
  public get rows(): GridDialogRow[] {
    return this._rows;
  }

  public set rows(value: GridDialogRow[]) {
    this._rows = value;
  }

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  public get focus(): boolean {
    return this._focus;
  }

  public set focus(value: boolean) {
    this._focus = value;
  }
}