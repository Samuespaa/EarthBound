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
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  public hoverIndex: number = 0;
  public cursorSprite: number = 1;
  private cursorInterval: NodeJS.Timeout;

  constructor() {
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
          this.manageHoverOption(true);
          break;
        case 'ArrowDown':
          this.manageHoverOption(false);
          break;
        case 'ArrowRight':
        case 'ArrowLeft':
          //*añadir sonido
          break;
        case 'Enter':
        case 'Space':
        case 'KeyZ':
          this.selectOption();
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
    this.optionSelected.emit(this.options[this.hoverIndex]);
  }
}
