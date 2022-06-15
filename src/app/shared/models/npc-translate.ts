export class NPCTranslate {
  private _name: string;
  private _texts: string;

  constructor(name: string, texts: string) {
    this._name = name;
    this._texts = texts;
  }

  public get name(): string {
    return this._name;
  }
  
  public set name(value: string) {
    this._name = value;
  }

  public get texts(): string {
    return this._texts;
  }
  
  public set texts(value: string) {
    this._texts = value;
  }
}