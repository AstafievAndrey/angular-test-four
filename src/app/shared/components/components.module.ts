import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@shared/material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [DialogComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DialogComponent,
    NotFoundComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class ComponentsModule { }
