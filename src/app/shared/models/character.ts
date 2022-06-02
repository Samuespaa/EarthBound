import { Stats } from "./stats";

export class Character {
  private _name: string;
  private _level: number = 1;
  private _stats: Stats;
  private _exp: number = 0;
  private _toNextLevel: number = 4;
  //private _psi: Psi[] = [];
  //private _items: Item[] = [];

  constructor(name: string, stats: Stats) {
    this._name = name;
    this._stats = stats;
  }

  public get name(): string {
    return this._name;
  }
  
  public set name(value: string) {
    this._name = value;
  }

  public get level(): number {
    return this._level;
  }
  
  public set level(value: number) {
    this._level = value;
  }

  public get stats(): Stats {
    return this._stats;
  }

  public set stats(value: Stats) {
    this._stats = value;
  }

  public get exp(): number {
    return this._exp;
  }
  
  public set exp(value: number) {
    this._exp = value;
  }

  public get toNextLevel(): number {
    return this._toNextLevel;
  }

  public set toNextLevel(value: number) {
    this._toNextLevel = value;
  }
}