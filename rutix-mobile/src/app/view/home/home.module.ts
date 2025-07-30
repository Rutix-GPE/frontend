import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.component';
import { HomePageRoutingModule } from './home-routing.module';
import { RoutineListPageModule } from '../routine-list/routine-list.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        RoutineListPageModule,
    ],
  declarations: [HomePage]
})
export class HomePageModule {}




