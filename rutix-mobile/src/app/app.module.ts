import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './view/auth/auth.module';
import { CoreHttpModule } from 'src/core/http/core-http.module';
import { QuestionModule } from './view/question/question.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent], // Retiré WelcomeComponent et IntroComponent
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    CoreHttpModule,
    QuestionModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
