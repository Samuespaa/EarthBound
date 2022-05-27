import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.scss']
})
export class SelectionDialogComponent implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() options: string[] = [];
  @Input() focus: boolean = true;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  public hoverIndex: number = 0;
  public optionSelected: number = -1;
  public cursorSprite: number = 1;
  private cursorSounds: any;
  private cursorInterval: NodeJS.Timeout;

  constructor() {
    this.cursorSounds = {
      vertical: new Audio('../../../assets/sounds/cursor-vertical.wav'),
      accept: new Audio('../../../assets/sounds/accept.wav'),
      back: new Audio('../../../assets/sounds/back.wav')
    }
    this.cursorInterval = setInterval(() => {
      this.changeLoadingSprite();
    }, 166);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    clearInterval(this.cursorInterval);
  }

  @HostListener('window:keyup') optionsHandler() {
    if (this.focus) {
      switch ((event as KeyboardEvent).code) {
        case 'ArrowUp':
        case 'KeyW':
          this.cursorSounds.vertical.play();
          this.manageHoverOption(true);
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.cursorSounds.vertical.play();
          this.manageHoverOption(false);
          break;
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'KeyD':
        case 'KeyA':
          this.cursorSounds.back.play();
          break;
        case 'Enter':
        case 'Space':
        case 'KeyZ':
          this.cursorSounds.accept.play();
          this.selectOption();
          break;
        case 'Escape':
        case 'KeyX':
          this.cursorSounds.back.play();
          this.cancel();
      }
    }
  }

  changeLoadingSprite() {
    this.cursorSprite === 1 ? this.cursorSprite++ : this.cursorSprite--;
  }

  manageHoverOption(up: boolean) {
    if (up) {
      if (this.hoverIndex) {
        this.hoverIndex--;
      }
      else {
        this.hoverIndex = this.options.length - 1;
      }
    }
    else {
      if (this.hoverIndex < this.options.length - 1) {
        this.hoverIndex++;
      }
      else {
        this.hoverIndex = 0;
      }
    }
  }

  selectOption() {
    this.optionSelected = this.hoverIndex;
    this.selected.emit(this.options[this.optionSelected]);
  }

  cancel() {
    this.canceled.emit(true);
  }
}
