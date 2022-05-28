import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogOption } from '../shared/models/dialog-option';
import { MenuConfig } from '../shared/models/menu-config';
import { SelectionDialogConfig } from '../shared/models/selection-dialog-config';
import { Utils } from '../shared/utils';
import { MUSICS } from '../shared/constants/musics';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private menuConfig: MenuConfig = new MenuConfig();
  public loadConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetLoad: boolean = false;
  public speedConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetSpeed: boolean = false;
  public difficultyConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetDifficulty: boolean = false;
  public dialogsVisible: any;

  constructor(
    private element: ElementRef,
    private translate: TranslateService
  ) {
    MUSICS.menu.loop = true;
    MUSICS.menu.play();
    this.translate.get('menu.load.newGame').subscribe(translation => {
      this.loadConfig.options = [
        new DialogOption('1', `1: ${translation}`),
        new DialogOption('2', `2: ${translation}`),
        new DialogOption('3', `3: ${translation}`)
      ];
    });
    this.translate.get(['menu.textSpeed.title', 'menu.textSpeed.fast', 'menu.textSpeed.medium', 'menu.textSpeed.slow']).subscribe(translations => {
      this.speedConfig.text = translations['menu.textSpeed.title'] + '.';
      this.speedConfig.options = [
        new DialogOption('3', translations['menu.textSpeed.fast']),
        new DialogOption('2', translations['menu.textSpeed.medium']),
        new DialogOption('1', translations['menu.textSpeed.slow'])
      ];
    });
    this.speedConfig.focus = false;
    this.translate.get(['menu.difficulty.title', 'menu.difficulty.hard', 'menu.difficulty.normal']).subscribe(translations => {
      this.difficultyConfig.text = translations['menu.difficulty.title'] + '.';
      this.difficultyConfig.options = [
        new DialogOption('2', translations['menu.difficulty.hard']),
        new DialogOption('1', translations['menu.difficulty.normal'])
      ];
    });
    this.difficultyConfig.focus = false;
    this.dialogsVisible = {
      load: true,
      speed: false,
      difficulty: false
    }
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    MUSICS.menu.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.menu');
    Utils.calculateTextSize();
  }

  manageLoadSelected(optionSelected: DialogOption) {
    this.menuConfig.load = optionSelected;
    this.loadConfig.defaultOption = optionSelected;
    this.loadConfig.focus = false;
    this.resetLoad = false;
    this.speedConfig.focus = true;
    this.dialogsVisible.speed = true;
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
    this.menuConfig.difficulty = difficultySelected;
    this.difficultyConfig.defaultOption = difficultySelected;
    this.difficultyConfig.focus = false;
  }

  cancelDifficultySelection() {
    this.difficultyConfig.focus = false;
    this.speedConfig.focus = true;
    this.resetSpeed = true;
    this.dialogsVisible.difficulty = false;
  }
}
