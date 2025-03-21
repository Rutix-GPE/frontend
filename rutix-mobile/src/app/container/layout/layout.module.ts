import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonContent, IonicModule, IonicRouteStrategy, IonTabs} from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {LayoutComponent} from "./layout.component";
import {RouterModule, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    BrowserModule,
  ]
})
export class LayoutModule { }
