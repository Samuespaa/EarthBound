import { ElementRef } from "@angular/core";
import { Character } from "./models/character";
import { DialogOption } from "./models/dialog-option";
import { MenuConfig } from "./models/menu-config";
import { SaveSlot } from "./models/save-slot";
import { SlotInfo } from "./models/slot-info";
import { Stats } from "./models/stats";

export class Utils {
  static calculateBackgroundSize(element: ElementRef, selector: string) {
    const home: HTMLHtmlElement = element.nativeElement.querySelector(selector);
    const width: number = window.innerWidth / 1234;
    const height: number = window.innerHeight / 1080;
    if (width > height) {
      home.style.width = '114.26vh';
      home.style.height = '100vh';
    }
    else {
      home.style.width = '100vw';
      home.style.height = '87.52vw';
    }
  }

  static calculateTextSize() {
    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (html) {
      let size: number = 16;
      const width: number = window.innerWidth / 1234 * size;
      const height: number = window.innerHeight / 1080 * size;
      width > height
      ? size = height
      : size = width;
      html.style.fontSize = size.toString() + 'px';
    }
  }

  static saveNewGame(menuConfig: MenuConfig) {
    const stats: Stats = new Stats(new Array(9).fill(2));
    const character: Character = new Character(menuConfig.inputs[0].inputConfig.value, stats);
    const saveData: SaveSlot = new SaveSlot(Number(menuConfig.load.value), menuConfig.speed, menuConfig.difficulty, [character]);
    localStorage.setItem('slot' + menuConfig.load.value, JSON.stringify(saveData));
  }

  static loadGame(slot: number) {
    
  }

  static loadSlotsInfo(): SlotInfo[] {
    const slots: SlotInfo[] = [];
    let localInfo: string;
    for (let i = 1; i <= 3; i++) {
      localInfo = localStorage.getItem('slot' + i) || '';
      if (localInfo) {
        const localObject: any = JSON.parse(localInfo);
        const newSlot = new SlotInfo();
        newSlot.id = localObject._id;
        newSlot.mainCharacterName = localObject._characters[0]._name;
        newSlot.mainCharacterLevel = localObject._characters[0]._level;
        newSlot.speed = new DialogOption(localObject._speed._value, localObject._speed._text);
        newSlot.difficulty = new DialogOption(localObject._difficulty._value, localObject._difficulty._text);
        newSlot.used = true;
        slots.push(newSlot);
      }
      else {
        slots.push(new SlotInfo());
      }
    }
    return slots;
  }
}