import { DialogOption } from "./dialog-option";
import { InputConfig } from "./input-config";
import { MenuConfigInput } from "./menu-config-input";

export class MenuConfig {
  private _load: DialogOption;
  private _speed: DialogOption;
  private _difficulty: DialogOption;
  private _inputs: MenuConfigInput[] = [];

  constructor() {
    this._load = new DialogOption('', '');
    this._speed = new DialogOption('', '');
    this._difficulty = new DialogOption('', '');
    this._inputs.push(new MenuConfigInput(new InputConfig('Ness', 5), 'menu.inputs.nessHelpText'));
    this._inputs.push(new MenuConfigInput(new InputConfig('Paula', 5), 'menu.inputs.paulaHelpText'));
    this._inputs.push(new MenuConfigInput(new InputConfig('Jeff', 5), 'menu.inputs.jeffHelpText'));
    this._inputs.push(new MenuConfigInput(new InputConfig('Poo', 5), 'menu.inputs.pooHelpText'));
    this._inputs.push(new MenuConfigInput(new InputConfig('menu.inputs.steak', 6), 'menu.inputs.favoriteFoodHelpText'));
    this._inputs.push(new MenuConfigInput(new InputConfig('menu.inputs.rockin', 6), 'menu.inputs.coolestThingHelpText'));
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

  public get inputs(): MenuConfigInput[] {
    return this._inputs;
  }

  public set inputs(value: MenuConfigInput[]) {
    this._inputs = value;
  }
}