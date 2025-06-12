import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Intro1Component } from './intro1/intro1.component';
import { Intro2Component } from './intro2/intro2.component';
import { Intro3Component } from './intro3/intro3.component';

@NgModule({
  declarations: [Intro1Component, Intro2Component, Intro3Component],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [Intro1Component, Intro2Component, Intro3Component]
})
export class IntroModule { }