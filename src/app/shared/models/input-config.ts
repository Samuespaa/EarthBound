export class InputConfig {
  private _defaultValue: string = '';
  private _maxLength: number = 6;

  constructor(defaultValue: string, maxLength: number) {
    this._defaultValue = defaultValue;
    this._maxLength = maxLength;
  }

  public get defaultValue(): string {
    return this._defaultValue;
  }
  
  public set defaultValue(value: string) {
    this._defaultValue = value;
  }

  public get maxLength(): number {
    return this._maxLength;
  }

  public set maxLength(value: number) {
    this._maxLength = value;
  }
}