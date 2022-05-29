import { DialogOption } from "./dialog-option";
import { InputConfig } from "./input-config";
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
    const ness = new MenuConfigInput(new InputConfig('Ness', 5), 'menu.inputs.nessHelpText');
    const paula = new MenuConfigInput(new InputConfig('Paula', 5), 'menu.inputs.paulaHelpText');
    const jeff = new MenuConfigInput(new InputConfig('Jeff', 5), 'menu.inputs.jeffHelpText');
    const poo = new MenuConfigInput(new InputConfig('Poo', 5), 'menu.inputs.pooHelpText');
    const favoriteFood = new MenuConfigInput(new InputConfig('menu.inputs.steak', 5), 'menu.inputs.favoriteFoodHelpText');
    const coolestThing = new MenuConfigInput(new InputConfig('menu.inputs.rockin', 5), 'menu.inputs.coolestThingHelpText');
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