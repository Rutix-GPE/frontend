import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutineListPageRoutingModule } from './routine-list-routing.module';
import { RoutineListComponent } from './routine-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutineListPageRoutingModule
  ],
  declarations: [RoutineListComponent],
  exports: [
    RoutineListComponent
  ]
})
export class RoutineListPageModule {}
