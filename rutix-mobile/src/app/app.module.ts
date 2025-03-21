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
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
import { CoreHttpClientPatch } from 'src/core/http/services/core-http-client-patch.service';
import { CoreHttpClientDelete } from 'src/core/http/services/core-http-client-delete.service';
import { AuthService } from 'src/backend/user/auth.service';
import { AuthenticationTokenService } from 'src/core/http/services/authentication.service';
import { CoreHttpHeaders } from 'src/core/http/services/core-http-headers.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { QuestionComponent } from './view/question/question.component';
import { QuestionModule } from './view/question/question.module';
import {LayoutComponent} from "./container/layout/layout.component";
import {LayoutModule} from "./container/layout/layout.module";

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AuthModule, CoreHttpModule, QuestionModule, LayoutModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
