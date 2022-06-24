import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { TextDialogComponent } from './components/text-dialog/text-dialog.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { GridDialogComponent } from './components/grid-dialog/grid-dialog.component';
import { InventoryDialogComponent } from './components/inventory-dialog/inventory-dialog.component';

@NgModule({
  declarations: [
    SelectionDialogComponent,
    TextDialogComponent,
    InputDialogComponent,
    GridDialogComponent,
    InventoryDialogComponent
  ],
  imports: [BrowserModule, TranslateModule],
  exports: [
    SelectionDialogComponent,
    TextDialogComponent,
    InputDialogComponent,
    GridDialogComponent,
    InventoryDialogComponent
  ],
  providers: []
})
export class SharedModule { }
