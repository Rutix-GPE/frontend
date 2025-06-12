import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskListPageRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskListPageRoutingModule
  ],
  declarations: [TaskListComponent],
  exports: [
    TaskListComponent
  ]
})
export class TaskListPageModule {}
