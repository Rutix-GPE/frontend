import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    IonicModule, // Assure que les composants Ionic sont disponibles
    RouterModule.forChild([{ path: '', component: WelcomeComponent }]),
  ],
})
export class WelcomeModule {}
