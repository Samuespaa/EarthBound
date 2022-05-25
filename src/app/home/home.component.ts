import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  music: HTMLAudioElement = new Audio('../../assets/musics/title-screen.mp3');
  navigationTimeout: NodeJS.Timeout;

  constructor(private route: Router) {
    this.music.play();
    this.navigationTimeout = setTimeout(() => {
      this.navigateToDifficulty();
    }, 16500);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    clearTimeout(this.navigationTimeout);
    this.music.pause();
  }

  navigateToDifficulty() {
    this.route.navigate(['loading']);
  }
}
