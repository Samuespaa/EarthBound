import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { SOUNDS } from '../../constants/sounds';
import { DialogOption } from '../../models/dialog-option';
import { GridDialogConfig } from '../../models/grid-dialog-config';

@Component({
  selector: 'app-grid-dialog',
  templateUrl: './grid-dialog.component.html',
  styleUrls: ['./grid-dialog.component.scss']
})
export class GridDialogComponent implements OnInit, OnChanges, OnDestroy{
  @Input() public config: GridDialogConfig = new GridDialogConfig();
  @Input() public reset: boolean = false;
  @Output() private hovered: EventEmitter<DialogOption> = new EventEmitter<DialogOption>();
  @Output() private selected: EventEmitter<DialogOption> = new EventEmitter<DialogOption>();
  @Output() private canceled: EventEmitter<undefined> = new EventEmitter<undefined>();
  public hoverIndex: string = '00';
  public optionSelected: string = '';
  public cursorSprite: number = 1;
  private cursorInterval: NodeJS.Timeout;

  constructor() {
    this.cursorInterval = setInterval(() => {
      this.changeCursorSprite();
    }, 166);
  }

  ngOnInit(): void {
    this.hoverOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const property in changes) {
      if (property === 'reset' && changes[property].currentValue) {
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
          SOUNDS.cursorVertical.play();
          this.manageHoverOption('up');
          break;
        case 'ArrowDown':
        case 'KeyS':
          SOUNDS.cursorVertical.play();
          this.manageHoverOption('down');
          break;
        case 'ArrowRight':
        case 'KeyD':
          SOUNDS.back.play();
          this.manageHoverOption('right');
          break;
        case 'ArrowLeft':
        case 'KeyA':
          SOUNDS.back.play();
          this.manageHoverOption('left');
          break;
        case 'Enter':
        case 'Space':
        case 'KeyZ':
          SOUNDS.accept.play();
          this.selectOption();
          break;
        case 'Escape':
        case 'Backspace':
        case 'KeyX':
          SOUNDS.back.play();
          this.cancel();
      }
    }
  }

  changeCursorSprite() {
    this.cursorSprite === 1 ? this.cursorSprite++ : this.cursorSprite--;
  }

  resetDialog() {
    this.optionSelected = '';
  }

  manageHoverOption(direction: 'up' | 'right' | 'down' | 'left') {
    // *Tener en cuenta huecos vacíos
    const indexArray = this.hoverIndex.split('').map(i => Number(i));
    switch (direction) {
      case 'up':
        if (indexArray[0]) {
          indexArray[0]--;
        }
        else {
          indexArray[0] = this.config.rows.length - 1;
        }
        break;
      case 'right':
        if (indexArray[1] < this.config.rows[indexArray[0]].options.length - 1 ) {
          indexArray[1]++;
        }
        else {
          indexArray[1] = 0;
        }
        break;
      case 'down':
        if (indexArray[0] < this.config.rows.length - 1) {
          indexArray[0]++;
        }
        else {
          indexArray[0] = 0;
        }
        break;
      case 'left':
        if (indexArray[1]) {
          indexArray[1]--;
        }
        else {
          indexArray[1] = this.config.rows[indexArray[0]].options.length - 1;
        }
    }
    this.hoverIndex = indexArray.join('');
    this.hoverOption();
  }

  hoverOption() {
    this.hovered.emit(this.config.rows[Number(this.hoverIndex[0])].options[Number(this.hoverIndex[1])]);
  }

  selectOption() {
    this.optionSelected = this.hoverIndex;
    this.selected.emit(this.config.rows[Number(this.hoverIndex[0])].options[Number(this.hoverIndex[1])]);
  }

  cancel() {
    this.canceled.emit();
  }
}
