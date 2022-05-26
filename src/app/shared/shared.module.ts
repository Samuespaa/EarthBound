import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { TextDialogComponent } from './components/text-dialog/text-dialog.component';

@NgModule({
  declarations: [
    SelectionDialogComponent,
    TextDialogComponent
  ],
  imports: [BrowserModule],
  exports: [
    SelectionDialogComponent,
    TextDialogComponent
  ],
  providers: []
})
export class SharedModule { }
