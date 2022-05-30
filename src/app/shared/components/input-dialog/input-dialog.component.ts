import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputConfig } from '../../models/input-config';
import { SOUNDS } from '../../constants/sounds';

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
      if (property === 'config') {
        this.value = changes[property].currentValue.value;
      }
      if (property === 'focus') {
        this.getFocus(changes[property].currentValue);
      }
    }
  }
  
  getFocus(focus: boolean) {
    if (focus) {
      this.element.nativeElement.querySelector('.input-dialog-input').focus();
    }
    else {
      this.element.nativeElement.querySelector('.input-dialog-input').blur();
    }
  }
  
  setInputValue() {
    let input = this.element.nativeElement.querySelector('.input-dialog-input');
    input.value = input.value.replace(/[^\w]/g, '');
    this.value = input.value;
  }
  
  checkKey() {
    const code = (event as KeyboardEvent).code;
    if (code === 'Backspace') {
      SOUNDS.deleteLetter.currentTime = 0;
      SOUNDS.deleteLetter.play();
    }
    else if (code.startsWith('Key') || code.startsWith('Digit')) {
      SOUNDS.insertLetter.currentTime = 0;
      SOUNDS.insertLetter.play();
    }
    this.getFocus(code !== 'Enter');
  }

  confirm() {
    SOUNDS.okdesuka.play();
    if (this.value === '') {
      this.value = this.config.value;
    }
    this.confirmed.emit(this.value);
  }
}
