import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private element: ElementRef) {
    this.music.loop = true;
    this.music.play();
    this.saves.push(
      '1: Samu Level: 48 Text Speed: Fast',
      '2: Start New Game',
      '3: Start New Game'
    );
    this.speeds.push(
      'Fast',
      'Medium',
      'Slow'
    );
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
