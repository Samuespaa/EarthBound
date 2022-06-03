import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../shared/functionality/utils';
import { MUSICS } from '../shared/constants/musics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public hideLetters: boolean = false;
  private logoTimeout: NodeJS.Timeout;
  private navigationTimeout: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private router: Router
  ) {
    MUSICS.titleScreen.play();
    this.logoTimeout = setTimeout(() => {
      this.hideLetters = true;
    }, 3700);
    this.navigationTimeout = setTimeout(() => {
      this.router.navigateByUrl('menu');
    }, 16000);
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    clearTimeout(this.logoTimeout);
    clearTimeout(this.navigationTimeout);
    MUSICS.titleScreen.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.home');
    Utils.calculateTextSize();
  }
}
