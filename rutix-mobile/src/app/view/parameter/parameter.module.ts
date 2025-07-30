import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ParameterComponent} from "./parameter.component";
import {ParameterRoutingModule} from "./parameter-routing.module";



@NgModule({
  declarations: [ParameterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ParameterRoutingModule
  ]
})
export class ParameterModule { }
