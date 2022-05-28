import { DialogOption } from "./dialog-option";

export class SelectionDialogConfig {
  private _text: string = '';
  private _options: DialogOption[] = [];
  private _defaultOption: DialogOption = new DialogOption('', '');
  private _focus: boolean = true;

  public get text() {
    return this._text;
  }

  public set text(text) {
    this._text = text;
  }

  public get options(): DialogOption[] {
    return this._options;
  }

  public set options(value: DialogOption[]) {
    this._options = value;
  }

  public get defaultOption(): DialogOption {
    return this._defaultOption;
  }
  
  public set defaultOption(value: DialogOption) {
    this._defaultOption = value;
  }

  public get focus() {
    return this._focus;
  }

  public set focus(focus) {
    this._focus = focus;
  }
}