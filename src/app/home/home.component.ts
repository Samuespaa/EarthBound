import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  music: HTMLAudioElement = new Audio('../../assets/musics/title-screen.mp3');
  logoTimeout: NodeJS.Timeout;
  navigationTimeout: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private route: Router
  ) {
    this.music.play();
    this.logoTimeout = setTimeout(() => {
      this.changeLogo();
    }, 3700);
    this.navigationTimeout = setTimeout(() => {
      this.navigateToDifficulty();
    }, 16500);
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
    this.calculateBackgroundSize();
    this.calculateTextSize();
  }

  calculateBackgroundSize() {
    const home = this.element.nativeElement.querySelector('.home');
    const width = window.innerWidth / 1234;
    const height = window.innerHeight / 1080;
    if (width > height) {
      home.style.width = '114.26vh';
      home.style.height = '100vh';
    }
    else {
      home.style.width = '100vw';
      home.style.height = '87.52vw';
    }
  }

  calculateTextSize() {
    const html = document.querySelector('html');
    if (html) {
      let size: number = 16;
      const width = window.innerWidth / 1234 * size;
      const height = window.innerHeight / 1080 * size;
      width > height
      ? size = height
      : size = width;
      html.style.fontSize = size.toString() + 'px';
    }
  }

  changeLogo() {
    for (const letter of this.element.nativeElement.querySelectorAll('.home-content-letter')) {
      this.render.setStyle(letter, 'display', 'none');
    }
    this.render.setStyle(this.element.nativeElement.querySelector('.home-content-logo'), 'display', 'block');
  }

  navigateToDifficulty() {
    this.route.navigate(['loading']);
  }
}
