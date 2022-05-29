export class MenuConfigInput {
  private _defaultText: string;
  private _maxLength: number;
  private _helpText: string;

  constructor(name: string, maxLength: number, helpText: string) {
    this._defaultText = name;
    this._maxLength = maxLength;
    this._helpText = helpText;
  }

  public get defaultText(): string {
    return this._defaultText;
  }
  
  public set defaultText(value: string) {
    this._defaultText = value;
  }

  public get maxLength(): number {
    return this._maxLength;
  }
  
  public set maxLength(value: number) {
    this._maxLength = value;
  }

  public get helpText(): string {
    return this._helpText;
  }

  public set helpText(value: string) {
    this._helpText = value;
  }
}