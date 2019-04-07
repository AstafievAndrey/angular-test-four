import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [HeaderComponent, MainComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    MainComponent
  ]
})
export class LayoutsModule { }
