import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogOption } from '../shared/models/dialog-option';
import { MenuConfig } from '../shared/models/menu-config';
import { SelectionDialogConfig } from '../shared/models/selection-dialog-config';
import { TextConfig } from '../shared/models/text-config';
import { InputConfig } from '../shared/models/input-config';
import { Utils } from '../shared/functionality/utils';
import { MUSICS } from '../shared/constants/musics';
import { GridDialogRow } from '../shared/models/grid-dialog-row';
import { GridDialogConfig } from '../shared/models/grid-dialog-config';
import { Router } from '@angular/router';
import { SlotInfo } from '../shared/models/slot-info';
import { Save } from '../shared/functionality/save';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private slotsInfo: SlotInfo[];
  public menuConfig: MenuConfig = new MenuConfig();
  public loadConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public continueGridConfig: GridDialogConfig = new GridDialogConfig();
  public copyConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public deleteConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public speedConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public difficultyConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public dialogsReset: any;
  public dialogsVisible: any;
  public textConfig: TextConfig = new TextConfig(false, true, false, 0, false);
  public helpText: string = '';
  public inputConfig: InputConfig;
  public inputFocus: boolean = false;
  public inputId: number = 0;
  public characterAnimation: {name: string, sprite: number, direction: 'right' | 'bottom' | 'left'};
  private inputsOriginalNames: string[] = ['ness', 'paula', 'jeff', 'poo', 'steak', 'rockin'];
  public characterOriginalNames: string[] = ['ness', 'paula', 'jeff', 'poo'];
  public favoriteFoodSummary: string = '';
  public coolestThingSummary: string = '';
  public confirmGridConfig: GridDialogConfig = new GridDialogConfig();
  public overlay: boolean = false;
  private characterSpriteInterval: NodeJS.Timeout | undefined;

  constructor(
    private element: ElementRef,
    private translate: TranslateService,
    private router: Router
  ) {
    MUSICS.chooseAFile.loop = true;
    MUSICS.chooseAFile.currentTime = 0;
    MUSICS.chooseAFile.play();
    this.slotsInfo = Save.loadSlotsInfo();
    this.setLoadOptions();
    this.translate.get(['menu.continue.continue', 'menu.continue.copy', 'menu.continue.delete', 'menu.continue.setup']).subscribe(translations => {
      const options: DialogOption[] = [
        new DialogOption('continue', translations['menu.continue.continue']),
        new DialogOption('copy', translations['menu.continue.copy']),
        new DialogOption('delete', translations['menu.continue.delete']),
        new DialogOption('setup', translations['menu.continue.setup'])
      ];
      this.continueGridConfig.rows = [new GridDialogRow(options)];
      this.continueGridConfig.evenOptions = false;
    });
    this.setCopyOptions();
    this.translate.get(['menu.delete.title', 'menu.delete.no', 'menu.delete.yes']).subscribe(translations => {
      this.deleteConfig.text = translations['menu.delete.title'];
      this.deleteConfig.options = [
        new DialogOption('0', translations['menu.delete.no']),
        new DialogOption('1', translations['menu.delete.yes'])
      ];
    });
    this.translate.get(['menu.speed.title', 'menu.speed.fast', 'menu.speed.medium', 'menu.speed.slow']).subscribe(translations => {
      this.speedConfig.text = translations['menu.speed.title'] + '.';
      this.speedConfig.options = [
        new DialogOption('15', translations['menu.speed.fast']),
        new DialogOption('30', translations['menu.speed.medium']),
        new DialogOption('50', translations['menu.speed.slow'])
      ];
    });
    this.translate.get(['menu.difficulty.title', 'menu.difficulty.hard', 'menu.difficulty.normal']).subscribe(translations => {
      this.difficultyConfig.text = translations['menu.difficulty.title'] + '.';
      this.difficultyConfig.options = [
        new DialogOption('1', translations['menu.difficulty.hard']),
        new DialogOption('0', translations['menu.difficulty.normal'])
      ];
    });
    this.dialogsReset = {
      load: false,
      continue: false,
      speed: false
    };
    this.dialogsVisible = {
      load: true,
      continue: false,
      copy: false,
      delete: false,
      speed: false,
      difficulty: false,
      input: false,
      summary: false
    }
    this.translate.get(this.menuConfig.inputs[this.inputId].helpText).subscribe(translation => {
      this.helpText = translation;
    });
    this.inputConfig = this.menuConfig.inputs[this.inputId].inputConfig;
    this.characterAnimation = {
      name: this.inputsOriginalNames[0],
      direction: 'right',
      sprite: 1
    }
    this.translate.get(['menu.summary.sure', 'menu.summary.yep', 'menu.summary.nope']).subscribe(translations => {
      const options: DialogOption[] = [
        new DialogOption('1', translations['menu.summary.yep']),
        new DialogOption('0', translations['menu.summary.nope'])
      ];
      this.confirmGridConfig.rows = [new GridDialogRow(options, translations['menu.summary.sure'])];
    });
    this.setSpriteInterval(166);
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    MUSICS.chooseAFile.pause();
    MUSICS.yourNamePlease.pause();
    MUSICS.nowLetsGo.pause();
    clearInterval(this.characterSpriteInterval);
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.menu');
    Utils.calculateTextSize();
  }

  setLoadOptions() {
    this.loadConfig.options = [];
    this.translate.get(['menu.load.newGame', 'menu.load.level', 'menu.load.speed', 'menu.load.difficulty']).subscribe(translations => {
      for (let i = 0; i < this.slotsInfo.length; i++) {
        if (this.slotsInfo[i].used) {
          const text = `${i + 1}: ${this.slotsInfo[i].mainCharacterName}
                        ${translations['menu.load.level']}: ${this.slotsInfo[i].mainCharacterLevel}
                        ${translations['menu.load.speed']}: ${this.slotsInfo[i].speed.text}
                        ${translations['menu.load.difficulty']}: ${this.slotsInfo[i].difficulty.text}`;
          this.loadConfig.options.push(new DialogOption((i + 1).toString(), text));
        }
        else {
          this.loadConfig.options.push(new DialogOption((i + 1).toString(), `${i + 1}: ${translations['menu.load.newGame']}`));
        }
      }
    });
  }

  setCopyOptions() {
    this.copyConfig.options = [];
    this.translate.get('menu.copy.title').subscribe(translation => {
      this.copyConfig.text = translation;
      for (let i = 0; i < this.slotsInfo.length; i++) {
        if (!this.slotsInfo[i].used) {
          this.copyConfig.options.push(new DialogOption(`${i + 1}`, `${i + 1}:`));
        }
      }
    });
  }

  setSpriteInterval(time: number) {
    if (this.characterSpriteInterval) {
      clearInterval(this.characterSpriteInterval);
    }
    this.characterSpriteInterval = setInterval(() => {
      this.changeCharacterSprite();
    }, time);
  }

  changeCharacterSprite() {
    this.characterAnimation.sprite === 1 ? this.characterAnimation.sprite++ : this.characterAnimation.sprite--;
  }

  manageLoadSelected(optionSelected: DialogOption) {
    this.menuConfig.load = optionSelected;
    this.loadConfig.defaultOption = optionSelected;
    this.loadConfig.focus = false;
    this.dialogsReset.load = false;
    const slot: SlotInfo = this.slotsInfo.find(slot => slot.id === Number(optionSelected.value)) || new SlotInfo();
    if (slot && slot.used) {
      this.continueGridConfig.focus = true;
      this.dialogsVisible.continue = true;
    }
    else {
      this.speedConfig.focus = true;
      this.dialogsVisible.speed = true;
    }
  }

  manageContinue(option: DialogOption) {
    this.continueGridConfig.focus = false;
    this.dialogsReset.continue = false;
    switch (option.value) {
      case 'continue':
        this.continueGame(Number(this.menuConfig.load.value));
        break;
      case 'copy':
        this.copyGame();
        break;
      case 'delete':
        this.deleteGame();
        break;
      case 'setup':
        this.setupGame();
    }
  }

  continueGame(slotId: number) {
    this.overlay = true;
    Save.loadGame(slotId);
    setTimeout(() => {
      this.router.navigateByUrl('location');
    }, 1000);
  }

  copyGame() {
    this.dialogsVisible.copy = true;
  }

  manageCopyLocation(option: DialogOption) {
    if (this.copyConfig.options.length) {
      this.loadConfig.focus = true;
      this.dialogsVisible.continue = false;
      this.dialogsVisible.copy = false;
      this.dialogsReset.load = true;
      Save.copySlot(Number(this.menuConfig.load.value), Number(option.value));
      this.slotsInfo = Save.loadSlotsInfo();
      this.setLoadOptions();
      this.setCopyOptions();
    }
  }

  cancelCopy() {
    this.continueGridConfig.focus = true;
    this.dialogsVisible.copy = false;
    this.dialogsReset.continue = true;
  }

  deleteGame() {
    this.dialogsVisible.delete = true;
  }

  manageDelete(option: DialogOption) {
    if (Number(option.value)) {
      this.loadConfig.focus = true;
      this.dialogsVisible.continue = false;
      this.dialogsVisible.delete = false;
      this.dialogsReset.load = true;
      Save.deleteSlot(Number(this.menuConfig.load.value));
      this.slotsInfo = Save.loadSlotsInfo();
      this.setLoadOptions();
      this.setCopyOptions();
    }
    else {
      this.cancelDelete();
    }
  }

  cancelDelete() {
    this.continueGridConfig.focus = true;
    this.dialogsVisible.delete = false;
    this.dialogsReset.continue = true;
  }

  setupGame() {
    this.speedConfig.focus = true;
    this.dialogsVisible.speed = true;
  }

  cancelContinue() {
    this.loadConfig.focus = true;
    this.dialogsReset.load = true;
    this.dialogsVisible.continue = false;
  }

  manageSpeedSelected(speedSelected: DialogOption) {
    this.menuConfig.speed = speedSelected;
    this.speedConfig.defaultOption = speedSelected;
    this.speedConfig.focus = false;
    this.dialogsReset.speed = false;
    this.difficultyConfig.focus = true;
    this.dialogsVisible.difficulty = true;
  }

  cancelSpeedSelection() {
    this.speedConfig.focus = false;
    this.dialogsVisible.speed = false;
    if (this.dialogsVisible.continue) {
      this.continueGridConfig.focus = true;
      this.dialogsReset.continue = true;
    }
    else {
      this.loadConfig.focus = true;
      this.dialogsReset.load = true;
    }
  }

  manageDifficultySelected(difficultySelected: DialogOption) {
    this.menuConfig.difficulty = difficultySelected;
    this.difficultyConfig.focus = false;
    this.difficultyConfig.defaultOption = difficultySelected;
    if (this.dialogsVisible.continue) {
      this.loadConfig.focus = true;
      this.dialogsVisible.continue = false;
      this.dialogsVisible.speed = false;
      this.dialogsVisible.difficulty = false;
      this.dialogsReset.load = true;
      Save.setupSlot(this.menuConfig);
      this.slotsInfo = Save.loadSlotsInfo();
      this.setLoadOptions();
    }
    else {
      MUSICS.chooseAFile.pause();
      MUSICS.yourNamePlease.loop = true;
      MUSICS.yourNamePlease.play();
      for (const property in this.dialogsVisible) {
        this.dialogsVisible[property] = false;
      }
      this.dialogsVisible.input = true;
      this.enterCharacterAnimation(true);
    }
  }

  enterCharacterAnimation(enter: boolean) {
    if (enter) {
      this.characterAnimation.direction = 'right';
      setTimeout(() => {
        this.characterAnimation.direction = 'bottom';
      }, 500);
    }
    else {
      this.characterAnimation.direction = 'left';
    }
  }

  cancelDifficultySelection() {
    this.difficultyConfig.focus = false;
    this.speedConfig.focus = true;
    this.dialogsReset.speed = true;
    this.dialogsVisible.difficulty = false;
  }

  manageTextFinished() {
    this.inputFocus = true;
  }

  manageInputConfirmed(name: string) {
    this.menuConfig.inputs[this.inputId++].inputConfig.value = name;
    this.inputFocus = false;
    this.enterCharacterAnimation(false);
    setTimeout(() => {
      if (this.inputId < this.menuConfig.inputs.length) {
        this.characterAnimation.name = this.inputsOriginalNames[this.inputId];
        this.helpText = this.translate.instant(this.menuConfig.inputs[this.inputId].helpText);
        this.inputConfig = this.menuConfig.inputs[this.inputId].inputConfig;
        this.inputConfig.value = this.translate.instant(this.inputConfig.value);
        this.enterCharacterAnimation(true);
      }
      else {
        this.prepareSummary();
      }
    }, 500);
  }

  prepareSummary() {
    this.dialogsVisible.input = false;
    this.dialogsVisible.summary = true;
    this.setSpriteInterval(250);
    this.textConfig = new TextConfig(false, true, true, 0, false);
    this.favoriteFoodSummary = this.translate.instant('menu.summary.favoriteFood') + ':';
    this.coolestThingSummary = this.translate.instant('menu.summary.coolestThing') + ':';
    setTimeout(() => {
      this.favoriteFoodSummary = '      ' + this.menuConfig.inputs[4].inputConfig.value;
      this.coolestThingSummary = '      ' + this.menuConfig.inputs[5].inputConfig.value;
    }); 
  }

  manageConfirmation(option: DialogOption) {
    if (Number(option.value)) {
      MUSICS.yourNamePlease.pause();
      MUSICS.nowLetsGo.play();
      this.confirmGridConfig.focus = false;
      Save.saveNewGame(this.menuConfig);
      setTimeout(() => {
        this.overlay = true;
      }, 2000);
      setTimeout(() => {
        this.router.navigateByUrl('intro');
      }, 3000);
    }
    else {
      this.resetInputs();
    }
  }

  resetInputs() {
    this.dialogsVisible.summary = false;
    this.dialogsVisible.input = true;
    this.textConfig = new TextConfig(false, true, false, 0, false);
    this.inputId = 0;
    this.characterAnimation.name = this.inputsOriginalNames[this.inputId];
    this.helpText = this.translate.instant(this.menuConfig.inputs[this.inputId].helpText);
    this.inputConfig = this.menuConfig.inputs[this.inputId].inputConfig;
    this.inputConfig.value = this.translate.instant(this.inputConfig.value);
    this.enterCharacterAnimation(true);
  }
}
