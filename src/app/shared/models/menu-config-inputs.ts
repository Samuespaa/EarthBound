import { MenuConfigInput } from "./menu-config-input";

export class MenuConfigInputs {
  private _ness: MenuConfigInput;
  private _paula: MenuConfigInput;
  private _jeff: MenuConfigInput;
  private _poo: MenuConfigInput;
  private _favoriteFood: MenuConfigInput;
  private _coolestThing: MenuConfigInput;

  constructor(
    ness: MenuConfigInput,
    paula: MenuConfigInput,
    jeff: MenuConfigInput,
    poo: MenuConfigInput,
    favoriteFood: MenuConfigInput,
    coolestThing: MenuConfigInput) {
      this._ness = ness;
      this._paula = paula;
      this._jeff = jeff;
      this._poo = poo;
      this._favoriteFood = favoriteFood;
      this._coolestThing = coolestThing;
  }

  public get ness(): MenuConfigInput {
    return this._ness;
  }

  public set ness(value: MenuConfigInput) {
    this._ness = value;
  }

  public get paula(): MenuConfigInput {
    return this._paula;
  }

  public set paula(value: MenuConfigInput) {
    this._paula = value;
  }

  public get jeff(): MenuConfigInput {
    return this._jeff;
  }

  public set jeff(value: MenuConfigInput) {
    this._jeff = value;
  }

  public get poo(): MenuConfigInput {
    return this._poo;
  }

  public set poo(value: MenuConfigInput) {
    this._poo = value;
  }

  public get favoriteFood(): MenuConfigInput {
    return this._favoriteFood;
  }

  public set favoriteFood(value: MenuConfigInput) {
    this._favoriteFood = value;
  }

  public get coolestThing(): MenuConfigInput {
    return this._coolestThing;
  }

  public set coolestThing(value: MenuConfigInput) {
    this._coolestThing = value;
  }
}