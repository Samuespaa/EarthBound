export class Stats {
  private _hp: number;
  private _maxHp: number;
  private _pp: number;
  private _maxPp: number;
  private _offense: number;
  private _defense: number;
  private _speed: number;
  private _guts: number;
  private _vitality: number;
  private _iq: number;
  private _luck: number;

  constructor(stats: number[]) {
    this._maxHp = stats[0];
    this._hp = this._maxHp;
    this._maxPp = stats[1];
    this._pp = this._maxPp;
    this._offense = stats[2];
    this._defense = stats[3];
    this._speed = stats[4];
    this._guts = stats[5];
    this._vitality = stats[6];
    this._iq = stats[7];
    this._luck = stats[8];
  }

  public get hp(): number {
    return this._hp;
  }

  public set hp(value: number) {
    this._hp = value;
  }

  public get maxHp(): number {
    return this._maxHp;
  }

  public set maxHp(value: number) {
    this._maxHp = value;
  }

  public get pp(): number {
    return this._pp;
  }

  public set pp(value: number) {
    this._pp = value;
  }

  public get offense(): number {
    return this._offense;
  }

  public set offense(value: number) {
    this._offense = value;
  }

  public get defense(): number {
    return this._defense;
  }

  public set defense(value: number) {
    this._defense = value;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get guts(): number {
    return this._guts;
  }

  public set guts(value: number) {
    this._guts = value;
  }

  public get vitality(): number {
    return this._vitality;
  }

  public set vitality(value: number) {
    this._vitality = value;
  }

  public get iq(): number {
    return this._iq;
  }

  public set iq(value: number) {
    this._iq = value;
  }

  public get luck(): number {
    return this._luck;
  }

  public set luck(value: number) {
    this._luck = value;
  }
}