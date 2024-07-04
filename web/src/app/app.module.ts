import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './views/auth/auth.component';
import { AuthModule } from './views/auth/auth.module';
import { CoreHttpModule } from 'src/core/http/core-http.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
     ,
    CoreHttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
