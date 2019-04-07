import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from './services/indexed-db.service';
import { LayoutsModule } from './layouts/layouts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutsModule,
  ],
  providers: [IndexedDbService]
})
export class CoreModule { }
