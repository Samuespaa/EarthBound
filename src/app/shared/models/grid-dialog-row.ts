import { DialogOption } from "./dialog-option";

export class GridDialogRow {
  private _text: string;
  private _options: DialogOption[];

  constructor(options: DialogOption[], text: string = '') {
    this._text = text;
    this._options = options;
  }

  public get text(): string {
    return this._text;
  }
  
  public set text(value: string) {
    this._text = value;
  }

  public get options(): DialogOption[] {
    return this._options;
  }

  public set options(value: DialogOption[]) {
    this._options = value;
  }
}