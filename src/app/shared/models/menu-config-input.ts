import { InputConfig } from "./input-config";

export class MenuConfigInput {
  private _inputConfig: InputConfig;
  private _helpText: string;

  constructor(inputConfig: InputConfig, helpText: string) {
    this._inputConfig = inputConfig;
    this._helpText = helpText;
  }

  public get inputConfig(): InputConfig {
    return this._inputConfig;
  }

  public set inputConfig(value: InputConfig) {
    this._inputConfig = value;
  }

  public get helpText(): string {
    return this._helpText;
  }

  public set helpText(value: string) {
    this._helpText = value;
  }
}