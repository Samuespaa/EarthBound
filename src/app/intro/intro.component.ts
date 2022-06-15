import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MUSICS } from '../shared/constants/musics';
import { Save } from '../shared/functionality/save';
import { Utils } from '../shared/functionality/utils';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {
  public protagonistName: string;
  public hide: boolean = false;
  private hideTimeout: NodeJS.Timeout;
  private navigationTimeout: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private router: Router
  ) {
    MUSICS.aFlashOfMemory.currentTime = 0;
    MUSICS.aFlashOfMemory.play();
    this.protagonistName = Save.save.characters[0].name;
    this.hideTimeout = setTimeout(() => {
      this.hide = true;
    }, 42000);
    this.navigationTimeout = setTimeout(() => {
      this.router.navigateByUrl('location');
    }, 43500);
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    clearTimeout(this.navigationTimeout);
    clearTimeout(this.hideTimeout);
    MUSICS.aFlashOfMemory.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.intro');
    Utils.calculateTextSize();
  }

  @HostListener('window:keyup') keyPressed() {
    switch ((event as KeyboardEvent).code) {
      case 'Enter':
      case 'Space':
      case 'KeyZ':
      case 'Escape':
      case 'Backspace':
      case 'KeyX':
        this.router.navigateByUrl('location');
    }
  }
}
