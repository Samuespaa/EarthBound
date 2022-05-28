import { DialogOption } from "./dialog-option";

export class MenuConfig {
  private _load: DialogOption;
  private _speed: DialogOption;
  private _difficulty: DialogOption;
  private _charactersName: {ness: string; paula: string; jeff: string; poo: string;};

  constructor() {
    this._load = new DialogOption('', '');
    this._speed = new DialogOption('', '');
    this._difficulty = new DialogOption('', '');
    this._charactersName = {
      ness: 'Ness',
      paula: 'Paula',
      jeff: 'Jeff',
      poo: 'Poo'
    };
  }

  public get load(): DialogOption {
    return this._load;
  }
  
  public set load(value: DialogOption) {
    this._load = value;
  }

  public get speed(): DialogOption {
    return this._speed;
  }

  public set speed(value: DialogOption) {
    this._speed = value;
  }

  public get difficulty(): DialogOption {
    return this._difficulty;
  }

  public set difficulty(value: DialogOption) {
    this._difficulty = value;
  }

  public get charactersName(): {ness: string; paula: string; jeff: string; poo: string;} {
    return this._charactersName;
  }

  public set charactersName(value: {ness: string; paula: string; jeff: string; poo: string;}) {
    this._charactersName = value;
  }
}