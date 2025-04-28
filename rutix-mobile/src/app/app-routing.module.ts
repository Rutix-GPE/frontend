import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { QuestionComponent } from './view/question/question.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Redirection par défaut vers la page de bienvenue
  {
    path: 'welcome',
    loadChildren: () => import('./view/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'intro',
    loadChildren: () => import('./view/intro/intro.module').then(m => m.IntroModule),
  },
  { path: 'login', component: AuthComponent },
  {
    path: 'question',
    component: QuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'routine',
    loadChildren: () => import('./view/routine-list/routine-list.module').then(m => m.RoutineListPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
