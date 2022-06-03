import { Character } from "../models/character";
import { DialogOption } from "../models/dialog-option";
import { MenuConfig } from "../models/menu-config";
import { SaveSlot } from "../models/save-slot";
import { SlotInfo } from "../models/slot-info";
import { Stats } from "../models/stats";

export class Save {
  static firstTimePlaying(): boolean {
    const firstTime = localStorage.getItem('firstTimePlaying') || '';
    return firstTime ? false : true;
  }

  static setFirstTimePlaying(firstTime: boolean) {
    localStorage.setItem('firstTimePlaying', JSON.stringify(firstTime));
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