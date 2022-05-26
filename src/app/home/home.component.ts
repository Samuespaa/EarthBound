import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private music: HTMLAudioElement = new Audio('../../assets/musics/title-screen.mp3');
  private logoTimeout: NodeJS.Timeout;
  private navigationTimeout: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private router: Router
  ) {
    this.music.play();
    this.logoTimeout = setTimeout(() => {
      this.changeLogo();
    }, 3700);
    this.navigationTimeout = setTimeout(() => {
      Utils.navigateTo(this.router, 'loading');
    }, 16000);
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    clearTimeout(this.logoTimeout);
    clearTimeout(this.navigationTimeout);
    this.music.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.home');
    Utils.calculateTextSize();
  }

  changeLogo() {
    for (const letter of this.element.nativeElement.querySelectorAll('.home-content-letter')) {
      this.render.setStyle(letter, 'display', 'none');
    }
    this.render.setStyle(this.element.nativeElement.querySelector('.home-content-logo'), 'display', 'block');
  }
}
