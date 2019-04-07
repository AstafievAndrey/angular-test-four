import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlueLineComponent } from './blue-line/blue-line.component';

@NgModule({
  declarations: [BlueLineComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    BlueLineComponent
  ]
})
export class ComponentsModule { }
