import { DialogOption } from "./dialog-option";
import { Character } from "./character";
import { Location } from "./location";
import { LOCATIONS } from "../constants/locations";

export class SaveSlot {
  private _id: number;
  private _speed: DialogOption;
  private _difficulty: DialogOption;
  private _favoriteFood: string;
  private _coolestThing: string;
  private _characters: Character[];
  private _location: Location;
  private _money: number;

  constructor(id: number, speed: DialogOption, difficulty: DialogOption, favoriteFood: string, coolestThing: string, characters: Character[]) {
    this._id = id;
    this._speed = speed;
    this._difficulty = difficulty;
    this._favoriteFood = favoriteFood;
    this._coolestThing = coolestThing;
    this._characters = characters;
    this._location = LOCATIONS[0];
    this._money = 20;
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

  public get favoriteFood(): string {
    return this._favoriteFood;
  }
  
  public set favoriteFood(value: string) {
    this._favoriteFood = value;
  }

  public get coolestThing(): string {
    return this._coolestThing;
  }
  
  public set coolestThing(value: string) {
    this._coolestThing = value;
  }

  public get characters(): Character[] {
    return this._characters;
  }

  public set characters(value: Character[]) {
    this._characters = value;
  }

  public get location(): Location {
    return this._location;
  }

  public set location(value: Location) {
    this._location = value;
  }

  public get money(): number {
    return this._money;
  }
  
  public set money(value: number) {
    this._money = value;
  }
}