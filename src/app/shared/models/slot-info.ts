import { DialogOption } from "./dialog-option";

export class SlotInfo {
  private _id: number = 1;
  private _mainCharacterName: string = 'Ness';
  private _mainCharacterLevel: number = 1;
  private _speed: DialogOption = new DialogOption('', '');
  private _difficulty: DialogOption = new DialogOption('', '');
  private _used: boolean = false;

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get mainCharacterName(): string {
    return this._mainCharacterName;
  }

  public set mainCharacterName(value: string) {
    this._mainCharacterName = value;
  }

  public get mainCharacterLevel(): number {
    return this._mainCharacterLevel;
  }

  public set mainCharacterLevel(value: number) {
    this._mainCharacterLevel = value;
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
  
  public get used(): boolean {
    return this._used;
  }

  public set used(value: boolean) {
    this._used = value;
  }
}