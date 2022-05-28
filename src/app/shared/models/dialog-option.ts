export class DialogOption {
  private _value: string;
  private _text: string;

  constructor(value: string, text: string) {
    this._value = value;
    this._text = text;
  }

  public get value(): string {
    return this._value;
  }
  
  public set value(value: string) {
    this._value = value;
  }

  public get text(): string {
    return this._text;
  }
  
  public set text(value: string) {
    this._text = value;
  }
}