import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private music: HTMLAudioElement = new Audio('../../assets/musics/choose-a-file.mp3');
  public saves: string[] = [];
  public speeds: string[] = [];

  constructor(
    private element: ElementRef,
    private translate: TranslateService
  ) {
    this.music.loop = true;
    this.music.play();
    this.translate.get('menu.load.newGame').subscribe(translation => {
      this.saves.push(
        '1: Samu Level: 48 Text Speed: Fast',
        `2: ${translation}`,
        `3: ${translation}`
      );
    });
    this.translate.get(['menu.textSpeed.fast', 'menu.textSpeed.medium', 'menu.textSpeed.slow']).subscribe(translations => {
      this.speeds.push(
        translations['menu.textSpeed.fast'],
        translations['menu.textSpeed.medium'],
        translations['menu.textSpeed.slow'],
      );
    });
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    this.music.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.menu');
    Utils.calculateTextSize();
  }

  manageOptionSelected(optionSelected: string) {
    console.log(optionSelected);
  }
}
