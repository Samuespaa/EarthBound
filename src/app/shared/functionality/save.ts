import { Character } from "../models/character";
import { DialogOption } from "../models/dialog-option";
import { MenuConfig } from "../models/menu-config";
import { SaveSlot } from "../models/save-slot";
import { SlotInfo } from "../models/slot-info";
import { Stats } from "../models/stats";

export class Save {
  static save: SaveSlot;

  static firstTimePlaying(): boolean {
    const firstTime = localStorage.getItem('firstTimePlaying') || '';
    return firstTime ? false : true;
  }

  static setFirstTimePlaying(firstTime: boolean) {
    localStorage.setItem('firstTimePlaying', JSON.stringify(firstTime));
  }

  static saveNewGame(menuConfig: MenuConfig) {
    const characters = [];
    for (let i = 0; i < 4; i++) {
      characters.push(new Character(menuConfig.inputs[i].inputConfig.value));
    }
    characters[0].inParty = true;
    const saveData: SaveSlot = new SaveSlot(Number(menuConfig.load.value), menuConfig.speed, menuConfig.difficulty, characters);
    localStorage.setItem('slot' + menuConfig.load.value, JSON.stringify(saveData));
    Save.loadGame(Number(menuConfig.load.value));
  }

  static saveGame() {
    localStorage.setItem('slot' + Save.save.id, JSON.stringify(Save.save));
  }

  static loadGame(slot: number) {
    const localInfo: string = localStorage.getItem('slot' + slot) || '';
    if (localInfo) {
      const localObject: any = JSON.parse(localInfo);
      const speed: DialogOption = new DialogOption(localObject._speed._value, localObject._speed._text);
      const difficulty: DialogOption = new DialogOption(localObject._difficulty._value, localObject._difficulty._text);
      const characters: Character[] = [];
      for (const character of localObject._characters) {
        const c = new Character(character._name);
        const stats = new Stats([
          character._stats._hp,
          character._stats._maxHp,
          character._stats._pp,
          character._stats._maxPp,
          character._stats._offense,
          character._stats._defense,
          character._stats._speed,
          character._stats._guts,
          character._stats._vitality,
          character._stats._iq,
          character._stats._luck
        ]);
        c.level = character._level;
        c.stats = stats;
        c.exp = character._exp;
        c.toNextLevel = character._toNextLevel;
        c.inParty = character._inParty;
        characters.push(c);
      }
      Save.save = new SaveSlot(localObject._id, speed, difficulty, characters);
    }
  }

  static loadSlotsInfo(): SlotInfo[] {
    const slots: SlotInfo[] = [];
    let localInfo: string;
    for (let i = 1; i <= 3; i++) {
      localInfo = localStorage.getItem('slot' + i) || '';
      if (localInfo) {
        const localObject: any = JSON.parse(localInfo);
        const newSlot: SlotInfo = new SlotInfo();
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

  static copySlot(from: number, to: number) {
    Save.loadGame(from);
    Save.save.id = to;
    Save.saveGame();
    Save.save.id = from;
  }

  static deleteSlot(slotId: number) {
    localStorage.removeItem('slot' + slotId);
  }

  static setupSlot(menuConfig: MenuConfig) {
    Save.loadGame(Number(menuConfig.load.value));
    Save.save.speed = menuConfig.speed;
    Save.save.difficulty = menuConfig.difficulty;
    Save.saveGame();
  }
}