export class Item {
  private _name: string;
  private _type: 'heal' | 'combat';
  private _power: number;
  private _cost: number;
  private _usableBy: number;
  private _description: string;

  constructor(name: string, type: 'heal' | 'combat', power: number, cost: number, usableBy: number, description: string) {
    this._name = name;
    this._type = type;
    this._power = power;
    this._cost = cost;
    this._usableBy = usableBy;
    this._description = description;
  }

  public get name(): string {
    return this._name;
  }
  
  public set name(value: string) {
    this._name = value;
  }
  
  public get type(): 'heal' | 'combat' {
    return this._type;
  }
  
  public set type(value: 'heal' | 'combat') {
    this._type = value;
  }

  public get power(): number {
    return this._power;
  }

  public set power(value: number) {
    this._power = value;
  }
  
  public get cost(): number {
    return this._cost;
  }
  
  public set cost(value: number) {
    this._cost = value;
  }
  
  public get usableBy(): number {
    return this._usableBy;
  }
  
  public set usableBy(value: number) {
    this._usableBy = value;
  }
  
  public get description(): string {
    return this._description;
  }
  
  public set description(value: string) {
    this._description = value;
  }
}