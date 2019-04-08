import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IndexedDbService } from './services/indexed-db.service';
import { LayoutsModule } from './layouts/layouts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutsModule,
    FormsModule,
  ],
  providers: [IndexedDbService]
})
export class CoreModule { }
