import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Save } from '../shared/functionality/save';
import { Utils } from '../shared/functionality/utils';
import { SaveSlot } from '../shared/models/save-slot';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  private save: SaveSlot;
  public backgroundImage: string;

  constructor(
    private element: ElementRef,
    private router: Router
  ) {
    this.save = Save.save;
    if (!this.save) {
      this.router.navigateByUrl('menu');
    }
    this.save.location.music.loop = true;
    this.save.location.music.currentTime = 0;
    this.save.location.music.play();
    this.backgroundImage = this.save.location.name.split('.')[2];
  }

  ngOnInit(): void {
    this.calculateSizes();
  }

  ngOnDestroy(): void {
    this.save.location.music.pause();
  }

  @HostListener('window:resize') calculateSizes() {
    Utils.calculateBackgroundSize(this.element, '.location');
    Utils.calculateTextSize();
  }
}
