import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogOption } from '../../models/dialog-option';
import { SelectionDialogConfig } from '../../models/selection-dialog-config';

@Component({
  selector: 'app-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.scss']
})
export class SelectionDialogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config: SelectionDialogConfig = new SelectionDialogConfig();
  @Input() reset: boolean = false;
  @Output() selected: EventEmitter<DialogOption> = new EventEmitter<DialogOption>();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  public hoverIndex: number = 0;
  public optionSelected: number = -1;
  public cursorSprite: number = 1;
  private cursorSounds: any;
  private cursorInterval: NodeJS.Timeout;

  constructor() {
    //*Mirar unificar sonidos en una clase
    this.cursorSounds = {
      vertical: new Audio('../../../assets/sounds/cursor-vertical.wav'),
      accept: new Audio('../../../assets/sounds/accept.wav'),
      back: new Audio('../../../assets/sounds/back.wav')
    }
    this.cursorInterval = setInterval(() => {
      this.changeLoadingSprite();
    }, 166);
  }

  ngOnInit(): void {
    this.searchDefaultOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const property in changes) {
      if (changes[property].currentValue) {
        this.resetDialog();
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.cursorInterval);
  }

  @HostListener('window:keyup') optionsHandler() {
    if (this.config.focus) {
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
        case 'Backspace':
        case 'KeyX':
          this.cursorSounds.back.play();
          this.cancel();
      }
    }
  }

  changeLoadingSprite() {
    this.cursorSprite === 1 ? this.cursorSprite++ : this.cursorSprite--;
  }

  searchDefaultOption() {
    this.hoverIndex = this.config.options.findIndex(option => option.value === this.config.defaultOption.value);
    if (this.hoverIndex === -1) {
      this.hoverIndex = 0;
    }
  }

  resetDialog() {
    this.optionSelected = -1;
  }

  manageHoverOption(up: boolean) {
    if (up) {
      if (this.hoverIndex) {
        this.hoverIndex--;
      }
      else {
        this.hoverIndex = this.config.options.length - 1;
      }
    }
    else {
      if (this.hoverIndex < this.config.options.length - 1) {
        this.hoverIndex++;
      }
      else {
        this.hoverIndex = 0;
      }
    }
  }

  selectOption() {
    this.optionSelected = this.hoverIndex;
    this.selected.emit(this.config.options[this.optionSelected]);
  }

  cancel() {
    this.canceled.emit(true);
  }
}
