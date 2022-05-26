import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public ready: boolean = false;
  public loadingSprite: number = 1;
  public noMouse: boolean = false;
  private readyTimeout: NodeJS.Timeout;
  private loadingInterval: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private router: Router
  ) {
    this.readyTimeout = setTimeout(() => {
      this.ready = true;
    }, 3000);
    this.loadingInterval = setInterval(() => {
      this.changeLoadingSprite();
    }, 166);
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
      clearTimeout(this.readyTimeout);
      clearInterval(this.loadingInterval);
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.loading');
    Utils.calculateTextSize();
  }

  @HostListener('window:keypress') navigateTo() {
    if (this.ready) {
      document.documentElement.requestFullscreen();
      Utils.navigateTo(this.router, 'home');
    }
  }

  changeLoadingSprite() {
    this.loadingSprite === 1 ? this.loadingSprite++ : this.loadingSprite--;
  }

  showNoMouse() {
    this.noMouse = true;
  }
}
