import { Shop } from "./shop";

export class Location {
  private _name: string;
  private _nextLocation: string;
  private _shops: Shop[];
  private _hasHotel: boolean;
  private _hasHospital: boolean;

  constructor(name: string, nextLocation: string, shops: Shop[], hasHotel: boolean, hasHospital: boolean) {
    this._name = name;
    this._nextLocation = nextLocation;
    this._shops = shops;
    this._hasHotel = hasHotel;
    this._hasHospital = hasHospital;
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
}