import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputConfig } from '../../models/input-config';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit, OnChanges {
  @Input() public config: InputConfig = new InputConfig('', 6);
  @Input() public focus: boolean = true;
  @Output() private confirmed: EventEmitter<string> = new EventEmitter<string>();
  public value: string = '';

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.value = this.config.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const property in changes) {
      if (property === 'focus') {
        this.getFocus(changes[property].currentValue);
      }
    }
  }

  setInputValue() {
    this.value = this.element.nativeElement.querySelector('.input-dialog-input').value;
  }

  getFocus(focus: boolean) {
    if (focus) {
      this.element.nativeElement.querySelector('.input-dialog-input').focus();
    }
    else {
      this.element.nativeElement.querySelector('.input-dialog-input').blur();
    }
  }

  confirm() {
    this.confirmed.emit(this.value);
  }
}
