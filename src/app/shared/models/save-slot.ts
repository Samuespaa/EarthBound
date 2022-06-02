import { Character } from "./character";
import { DialogOption } from "./dialog-option";

export class SaveSlot {
  private _id: number;
  private _speed: DialogOption;
  private _difficulty: DialogOption;
  private _characters: Character[];

  constructor(id: number, speed: DialogOption, difficulty: DialogOption, characters: Character[]) {
    this._id = id;
    this._speed = speed;
    this._difficulty = difficulty;
    this._characters = characters;
  }

  public get id(): number {
    return this._id;
  }
  
  public set id(value: number) {
    this._id = value;
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

  public get characters(): Character[] {
    return this._characters;
  }

  public set characters(value: Character[]) {
    this._characters = value;
  }
}