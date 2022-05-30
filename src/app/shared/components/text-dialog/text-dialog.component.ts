import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TextConfig } from '../../models/text-config';
import { SOUNDS } from '../../constants/sounds';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.scss']
})
export class TextDialogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public config: TextConfig = new TextConfig(true, false, false, 0, true);
  @Input() public text: string = '';
  @Output() private finished: EventEmitter<boolean> = new EventEmitter<boolean>();
  public texts: string[] = [];
  public ready: boolean = false;
  public cursorSprite: number = 1;
  private cursorInterval: NodeJS.Timeout;

  constructor() {
    this.cursorInterval = setInterval(() => {
      this.changeLoadingSprite();
    }, 200);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const property in changes) {
      if (property === 'text') {
        this.manageInstant(changes[property].currentValue);
      }
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.cursorInterval);
  }

  @HostListener('window:keyup') continue() {
    if (this.ready) {
      switch ((event as KeyboardEvent).code) {
        case 'Enter':
        case 'Space':
        case 'KeyZ':
        case 'Escape':
        case 'Backspace':
        case 'KeyX':
          this.ready = false;
          this.finish();
      }
    }
  }

  changeLoadingSprite() {
    if (this.ready) {
      this.cursorSprite === 1 ? this.cursorSprite++ : this.cursorSprite--;
    }
  }

  manageInstant(value: string) {
    if (this.config.instant) {
      this.texts.push(value);
      this.manageAuto();
    }
    else {
      this.letterByLetter(value);
    }
  }

  manageAuto() {
    if (this.config.auto) {
      setTimeout(() => {
        this.finish();
      }, this.config.autoTime);
    }
    else {
      this.ready = true;
    }
  }

  letterByLetter(newText: string) {
    this.texts[this.texts.length] = '';
    if (this.config.sound) {
      SOUNDS.text.loop = true;
      SOUNDS.text.play();
    }
    for (let i = 0; i < newText.length; i++) {
      setTimeout(() => {
        this.texts[this.texts.length - 1] += newText[i];
      }, 15 * (i + 1));
    }
    setTimeout(() => {
      if (this.config.sound) {
        SOUNDS.text.pause();
      }
      this.manageAuto();
    }, 15 * newText.length);
  }

  finish() {
    this.finished.emit(true);
  }
}
