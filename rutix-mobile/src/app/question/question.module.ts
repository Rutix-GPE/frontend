import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from './question.component';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrowserModule
  ]
})
export class QuestionModule { }
