import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { SOUNDS } from '../../constants/sounds';
import { InventoryDialogConfig } from '../../models/inventory-dialog-config';
import { InventoryDialogRow } from '../../models/inventory-dialog-row';

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.scss']
})
export class InventoryDialogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public config: InventoryDialogConfig = new InventoryDialogConfig();
  @Input() public reset: boolean = false;
  @Output() private canceled: EventEmitter<undefined> = new EventEmitter<undefined>();
  public rows: InventoryDialogRow[] = [];
  public characterIndex: number = 0;
  public characterSelected: boolean = false;
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
    if (this.config.characters.length === 1) {
      this.characterSelected = true;
    }
    this.createRows(this.characterIndex);
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
          if (this.characterSelected) {
            SOUNDS.cursorVertical.play();
            this.manageHoverOption('up');
          }
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (this.characterSelected) {
            SOUNDS.cursorVertical.play();
            this.manageHoverOption('down');
          }
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (this.characterSelected) {
            SOUNDS.back.play();
            this.manageHoverOption('right');
          }
          else {
            SOUNDS.window.play();
            if (this.characterIndex < this.config.characters.length - 1) {
              this.characterIndex++;
            }
            else {
              this.characterIndex = 0;
            }
            this.createRows(this.characterIndex);
          }
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (this.characterSelected) {
            SOUNDS.back.play();
            this.manageHoverOption('left');
          }
          else {
            SOUNDS.window.play();
            if (this.characterIndex) {
              this.characterIndex--;
            }
            else {
              this.characterIndex = this.config.characters.length - 1;
            }
            this.createRows(this.characterIndex);
          }
          break;
        case 'Enter':
        case 'Space':
        case 'KeyZ':
          SOUNDS.accept.play();
          if (this.characterSelected) {
            this.selectItem();
          }
          else {
            this.characterSelected = true;
            this.hoverIndex = '00';
          }
          break;
        case 'Escape':
        case 'Backspace':
        case 'KeyX':
          if (this.characterSelected && this.config.characters.length > 1) {
            SOUNDS.back.play();
            this.characterSelected = false;
          }
          else {
            SOUNDS.window.play();
            this.cancel();
          }
      }
    }
  }

  changeCursorSprite() {
    this.cursorSprite === 1 ? this.cursorSprite++ : this.cursorSprite--;
  }

  createRows(characterIndex: number) {
    this.rows = [];
    let row: InventoryDialogRow = new InventoryDialogRow([]);
    this.config.characters[characterIndex].items.forEach(item => {
      if (row.options.length < 2) {
        row.options.push(item);
      }
      else {
        this.rows.push(row);
        row = new InventoryDialogRow([item]);
      }
    });
    if (row.options.length) {
      this.rows.push(row);
    }
  }

  resetDialog() {
    this.optionSelected = '';
  }

  manageHoverOption(direction: 'up' | 'right' | 'down' | 'left') {
    if (this.rows.length) {
      const indexArray = this.hoverIndex.split('').map(i => Number(i));
      switch (direction) {
        case 'up':
          if (indexArray[0]) {
            indexArray[0]--;
          }
          else {
            indexArray[0] = this.rows.length - 1;
          }
          break;
        case 'right':
          if (indexArray[1] < this.rows[indexArray[0]].options.length - 1 ) {
            indexArray[1]++;
          }
          else if (indexArray[0] && this.rows[indexArray[0] - 1].options[indexArray[1] + 1]) {
            indexArray[0]--;
            indexArray[1]++;
          }
          else {
            indexArray[1] = 0;
          }
          break;
        case 'down':
          if (indexArray[0] < this.rows.length - 1) {
            indexArray[0]++;
            if (!this.rows[indexArray[0]].options[indexArray[1]]) {
              indexArray[1]--;
            }
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
            indexArray[1] = this.rows[indexArray[0]].options.length - 1;
          }
      }
      this.hoverIndex = indexArray.join('');
    }
  }

  selectItem() {
    
  }

  cancel() {
    this.canceled.emit();
  }
}
