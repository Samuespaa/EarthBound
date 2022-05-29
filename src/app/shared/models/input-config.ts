export class InputConfig {
  private _value: string = '';
  private _maxLength: number = 6;

  constructor(value: string, maxLength: number) {
    this._value = value;
    this._maxLength = maxLength;
  }

  public get value(): string {
    return this._value;
  }
  
  public set value(value: string) {
    this._value = value;
  }

  public get maxLength(): number {
    return this._maxLength;
  }

  public set maxLength(value: number) {
    this._maxLength = value;
  }
}