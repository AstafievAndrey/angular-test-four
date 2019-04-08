import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@shared/material/material.module';
import { BlueLineComponent } from './blue-line/blue-line.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [BlueLineComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    BlueLineComponent,
    DialogComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class ComponentsModule { }
