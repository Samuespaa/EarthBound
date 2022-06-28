import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS } from '../../constants/items';
import { SOUNDS } from '../../constants/sounds';
import { DialogOption } from '../../models/dialog-option';
import { InventoryDialogConfig } from '../../models/inventory-dialog-config';
import { InventoryDialogRow } from '../../models/inventory-dialog-row';
import { Item } from '../../models/item';
import { SelectionDialogConfig } from '../../models/selection-dialog-config';
import { TextConfig } from '../../models/text-config';

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.scss']
})
export class InventoryDialogComponent implements OnInit, OnDestroy {
  @Input() public config: InventoryDialogConfig = new InventoryDialogConfig();
  @Output() private canceled: EventEmitter<undefined> = new EventEmitter<undefined>();
  public actionsConfig: SelectionDialogConfig = new SelectionDialogConfig();
  public resetActions: boolean = false;
  public rows: InventoryDialogRow[] = [];
  public characterIndex: number = 0;
  public characterSelected: boolean = false;
  public hoverIndex: string = '00';
  public questionConfig: TextConfig = new TextConfig(false, true, true, 0, false);
  public itemHelpConfig: TextConfig = new TextConfig(true, false, false, 0, true);
  public itemSelected: Item | undefined = undefined;
  public itemDropText: string = '';
  public itemHelpText: string = '';
  public itemHelpTextIndex: number = -1;
  public cursorSprite: number = 1;
  private cursorInterval: NodeJS.Timeout;

  constructor(private translate: TranslateService) {
    this.translate.get(['location.menu.goods.use', 'location.menu.goods.give', 'location.menu.goods.drop', 'location.menu.goods.help']).subscribe(translations => {
      const options: DialogOption[] = [
        new DialogOption('use', translations['location.menu.goods.use']),
        new DialogOption('give', translations['location.menu.goods.give']),
        new DialogOption('drop', translations['location.menu.goods.drop']),
        new DialogOption('help', translations['location.menu.goods.help'])
      ];
      this.actionsConfig.options = options;
    });
    this.cursorInterval = setInterval(() => {
      this.changeCursorSprite();
    }, 166);
  }

  ngOnInit(): void {
    if (this.config.characters.length === 1) {
      this.characterSelected = true;
    }
    this.config.characters[0].items.push(ITEMS.bagOfFries, ITEMS.cookie, ITEMS.hamburguer);
    // this.config.characters[1].items.push(ITEMS.bagOfFries, ITEMS.breadRoll, ITEMS.cookie, ITEMS.hamburguer);
    this.createRows(this.characterIndex);
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
    if (this.config.characters[this.characterIndex].items.length) {
      this.config.focus = false;
      this.itemSelected = this.rows[Number(this.hoverIndex[0])].options[Number(this.hoverIndex[1])];
    }
  }

  manageActionSelected(option: DialogOption) {
    this.actionsConfig.focus = false;
    this.resetActions = false;
    switch (option.value) {
      case 'use':

        break;
      case 'give':

        break;
      case 'drop':
        this.itemDrop();
        break;
      case 'help':
        this.itemHelp();
    }
  }

  itemDrop() {
    if (this.itemSelected) {
      if (!this.itemDropText) {
        this.itemDropText = `${this.config.characters[this.characterIndex].name} ${this.translate.instant('location.menu.goods.dropMessage')} ${this.translate.instant(this.itemSelected.name)}.`;
      }
      else {
        this.config.characters[this.characterIndex].items.splice(Number(this.hoverIndex[0]) * 2 + Number(this.hoverIndex[1]), 1);
        this.createRows(this.characterIndex);
        this.actionsConfig.focus = true;
        this.hoverIndex = '00';
        this.itemDropText = '';
        this.cancelActionSelection();
      }
    }
  }

  itemHelp() {
    if (this.itemSelected) {
      const translation = this.translate.instant(this.itemSelected.description)
      if (this.itemHelpTextIndex === -1) {
        this.itemHelpText = `<${this.translate.instant(this.itemSelected.name)}>`;
        this.itemHelpTextIndex++;
      }
      else if (this.itemHelpTextIndex < translation.length) {
        this.itemHelpText = translation[this.itemHelpTextIndex++];
      }
      else {
        this.actionsConfig.focus = true;
        this.resetActions = true;
        this.itemHelpText = '';
        this.itemHelpTextIndex = -1;
      }
    }
  }

  cancelActionSelection() {
    this.config.focus = true;
    this.itemSelected = undefined;
  }

  cancel() {
    this.canceled.emit();
  }
}
