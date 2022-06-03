import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from '../shared/functionality/utils';
import { Save } from '../shared/functionality/save';
import { INITIAL_IMAGES } from '../shared/constants/initial-resources';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public ready: boolean = false;
  public loadingSprite: number = 1;
  public noMouse: boolean = false;
  public initialImages: string[] = [];
  private loadingInterval: NodeJS.Timeout;

  constructor(
    private element: ElementRef,
    private router: Router
  ) {
    if (Save.firstTimePlaying()) {
      this.preloadResources();
    }
    else {
      setTimeout(() => {
        this.ready = true;
      }, 333);
    }
    this.loadingInterval = setInterval(() => {
      this.changeLoadingSprite();
    }, 166);
  }
  
  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    clearInterval(this.loadingInterval);
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.loading');
    Utils.calculateTextSize();
  }

  @HostListener('window:keyup') navigate() {
    if (this.ready) {
      document.documentElement.requestFullscreen();
      this.router.navigateByUrl('home');
    }
  }

  preloadResources() {
    for (let i = 0; i< INITIAL_IMAGES.length; i++) {
      setTimeout(() => {
        this.initialImages.push(INITIAL_IMAGES[i]);
      }, 1000 + 100 * i, i);
    }
    setTimeout(() => {
      Save.setFirstTimePlaying(false);
      this.ready = true;
    }, 500 + 100 * INITIAL_IMAGES.length);
  }

  changeLoadingSprite() {
    this.loadingSprite === 1 ? this.loadingSprite++ : this.loadingSprite--;
  }

  showNoMouse() {
    this.noMouse = true;
  }
}
