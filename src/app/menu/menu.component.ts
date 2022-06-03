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
  public resetLoad: boolean = false;
  public speedConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetSpeed: boolean = false;
  public difficultyConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetDifficulty: boolean = false;
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
  public gridConfig: GridDialogConfig = new GridDialogConfig();
  public overlay: boolean = false;
  private characterSpriteInterval: NodeJS.Timeout | undefined;

  constructor(
    private element: ElementRef,
    private translate: TranslateService,
    private router: Router
  ) {
    MUSICS.chooseAFile.loop = true;
    MUSICS.chooseAFile.play();
    this.slotsInfo = Save.loadSlotsInfo();
    this.translate.get(['menu.load.newGame', 'menu.load.level', 'menu.load.textSpeed', 'menu.load.difficulty']).subscribe(translations => {
      for (let i = 0; i < this.slotsInfo.length; i++) {
        if (this.slotsInfo[i].used) {
          const text = `${i + 1}: ${this.slotsInfo[i].mainCharacterName}
                        ${translations['menu.load.level']}: ${this.slotsInfo[i].mainCharacterLevel}
                        ${translations['menu.load.textSpeed']}: ${this.slotsInfo[i].speed.text}
                        ${translations['menu.load.difficulty']}: ${this.slotsInfo[i].difficulty.text}`;
          this.loadConfig.options.push(new DialogOption((i + 1).toString(), text));
        }
        else {
          this.loadConfig.options.push(new DialogOption((i + 1).toString(), `${i + 1}: ${translations['menu.load.newGame']}`));
        }
      }
    });
    this.translate.get(['menu.textSpeed.title', 'menu.textSpeed.fast', 'menu.textSpeed.medium', 'menu.textSpeed.slow']).subscribe(translations => {
      this.speedConfig.text = translations['menu.textSpeed.title'] + '.';
      this.speedConfig.options = [
        new DialogOption('15', translations['menu.textSpeed.fast']),
        new DialogOption('30', translations['menu.textSpeed.medium']),
        new DialogOption('50', translations['menu.textSpeed.slow'])
      ];
    });
    this.translate.get(['menu.difficulty.title', 'menu.difficulty.hard', 'menu.difficulty.normal']).subscribe(translations => {
      this.difficultyConfig.text = translations['menu.difficulty.title'] + '.';
      this.difficultyConfig.options = [
        new DialogOption('1', translations['menu.difficulty.hard']),
        new DialogOption('0', translations['menu.difficulty.normal'])
      ];
    });
    this.dialogsVisible = {
      load: true,
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
        new DialogOption('0', translations['menu.summary.nope']),
      ];
      const row: GridDialogRow = new GridDialogRow(options, translations['menu.summary.sure']);
      const rows: GridDialogRow[] = [row];
      this.gridConfig.rows = rows;
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
    this.resetLoad = false;
    const slot: SlotInfo = this.slotsInfo.find(slot => slot.id === Number(optionSelected.value)) || new SlotInfo();
    if (slot && slot.used) {
      this.overlay = true;
      setTimeout(() => {
        this.router.navigateByUrl('loading');
      }, 1000);
    }
    else {
      this.speedConfig.focus = true;
      this.dialogsVisible.speed = true;
    }
  }

  manageSpeedSelected(speedSelected: DialogOption) {
    this.menuConfig.speed = speedSelected;
    this.speedConfig.defaultOption = speedSelected;
    this.speedConfig.focus = false;
    this.resetSpeed = false;
    this.difficultyConfig.focus = true;
    this.dialogsVisible.difficulty = true;
  }

  cancelSpeedSelection() {
    this.speedConfig.focus = false;
    this.loadConfig.focus = true;
    this.resetLoad = true;
    this.dialogsVisible.speed = false;
  }

  manageDifficultySelected(difficultySelected: DialogOption) {
    MUSICS.chooseAFile.pause();
    MUSICS.yourNamePlease.loop = true;
    MUSICS.yourNamePlease.play();
    this.menuConfig.difficulty = difficultySelected;
    this.difficultyConfig.defaultOption = difficultySelected;
    this.difficultyConfig.focus = false;
    for (const property in this.dialogsVisible) {
      this.dialogsVisible[property] = false;
    }
    this.dialogsVisible.input = true;
    this.enterCharacterAnimation(true);
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
    this.resetSpeed = true;
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

  manageConfirmation(answer: DialogOption) {
    if (Number(answer.value)) {
      MUSICS.yourNamePlease.pause();
      MUSICS.nowLetsGo.play();
      this.gridConfig.focus = false;
      Save.saveNewGame(this.menuConfig);
      setTimeout(() => {
        this.overlay = true;
      }, 2000);
      setTimeout(() => {
        this.router.navigateByUrl('loading');
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
