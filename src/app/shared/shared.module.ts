import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { TextDialogComponent } from './components/text-dialog/text-dialog.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';

@NgModule({
  declarations: [
    SelectionDialogComponent,
    TextDialogComponent,
    InputDialogComponent
  ],
  imports: [BrowserModule],
  exports: [
    SelectionDialogComponent,
    TextDialogComponent,
    InputDialogComponent
  ],
  providers: []
})
export class SharedModule { }
