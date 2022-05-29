export class TextConfig {
  private _auto: boolean;
  private _instant: boolean;
  private _sound: boolean;
  private _autoTime: number;

  constructor(sound: boolean, instant: boolean, auto: boolean, autoTime: number) {
    this._sound = sound;
    this._instant = instant;
    this._auto = auto;
    this._autoTime = autoTime;
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
}