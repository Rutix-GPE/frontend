import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IntroComponent } from './intro.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IntroComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: IntroComponent }]),
  ],
})
export class IntroModule {}
