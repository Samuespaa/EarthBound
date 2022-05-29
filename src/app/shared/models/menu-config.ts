import { DialogOption } from "./dialog-option";
import { MenuConfigInput } from "./menu-config-input";
import { MenuConfigInputs } from "./menu-config-inputs";

export class MenuConfig {
  private _load: DialogOption;
  private _speed: DialogOption;
  private _difficulty: DialogOption;
  private _inputs: MenuConfigInputs;

  constructor() {
    this._load = new DialogOption('', '');
    this._speed = new DialogOption('', '');
    this._difficulty = new DialogOption('', '');
    const ness = new MenuConfigInput('Ness', 5, 'menu.inputs.nessHelpText');
    const paula = new MenuConfigInput('Paula', 5, 'menu.inputs.paulaHelpText');
    const jeff = new MenuConfigInput('Jeff', 5, 'menu.inputs.jeffHelpText');
    const poo = new MenuConfigInput('Poo', 5, 'menu.inputs.pooHelpText');
    const favoriteFood = new MenuConfigInput('menu.inputs.steak', 6, 'menu.inputs.favoriteFoodHelpText');
    const coolestThing = new MenuConfigInput('menu.inputs.rockin', 6, 'menu.inputs.coolestThingHelpText');
    this._inputs = new MenuConfigInputs(ness, paula, jeff, poo, favoriteFood, coolestThing);
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

  public get inputs(): MenuConfigInputs {
    return this._inputs;
  }

  public set inputs(value: MenuConfigInputs) {
    this._inputs = value;
  }
}