import { Howl } from "howler";
import { NPCTranslate } from "./npc-translate";
import { Shop } from "./shop";

export class Location {
  private _name: string;
  private _nextLocation: string;
  private _npcs: NPCTranslate[];
  private _shops: Shop[];
  private _hasHotel: boolean;
  private _hasHospital: boolean;
  private _music: Howl;

  constructor(name: string, nextLocation: string, npcs: NPCTranslate[], shops: Shop[], hasHotel: boolean, hasHospital: boolean, music: Howl) {
    this._name = name;
    this._nextLocation = nextLocation;
    this._npcs = npcs;
    this._shops = shops;
    this._hasHotel = hasHotel;
    this._hasHospital = hasHospital;
    this._music = music;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get nextLocation(): string {
    return this._nextLocation;
  }

  public set nextLocation(value: string) {
    this._nextLocation = value;
  }

  public get npcs(): NPCTranslate[] {
    return this._npcs;
  }
  
  public set npcs(value: NPCTranslate[]) {
    this._npcs = value;
  }

  public get shops(): Shop[] {
    return this._shops;
  }

  public set shops(value: Shop[]) {
    this._shops = value;
  }

  public get hasHotel(): boolean {
    return this._hasHotel;
  }

  public set hasHotel(value: boolean) {
    this._hasHotel = value;
  }

  public get hasHospital(): boolean {
    return this._hasHospital;
  }
  
  public set hasHospital(value: boolean) {
    this._hasHospital = value;
  }

  public get music(): Howl {
    return this._music;
  }
  
  public set music(value: Howl) {
    this._music = value;
  }
}