export class TextConfig {
  private _auto: boolean;
  private _instant: boolean;
  private _sound: boolean;
  private _autoTime: number;
  private _paragraphSymbol: boolean;

  constructor(
    sound: boolean = true,
    instant: boolean = false,
    auto: boolean = false,
    autoTime: number = 1000,
    paragraphSymbol: boolean = true) {
    this._sound = sound;
    this._instant = instant;
    this._auto = auto;
    this._autoTime = autoTime;
    this._paragraphSymbol = paragraphSymbol;
  }

  public get sound(): boolean {
    return this._sound;
  }

  public set sound(value: boolean) {
    this._sound = value;
  }

  public get instant(): boolean {
    return this._instant;
  }

  public set instant(value: boolean) {
    this._instant = value;
  }

  public get auto(): boolean {
    return this._auto;
  }
  
  public set auto(value: boolean) {
    this._auto = value;
  }

  public get autoTime(): number {
    return this._autoTime;
  }

  public set autoTime(value: number) {
    this._autoTime = value;
  }

  public get paragraphSymbol(): boolean {
    return this._paragraphSymbol;
  }

  public set paragraphSymbol(value: boolean) {
    this._paragraphSymbol = value;
  }
}