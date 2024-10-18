import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { QuestionComponent } from './question/question.component';
import { RoutineListComponent } from './routine-list/routine-list.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'question', component: QuestionComponent,
    canActivate: [AuthGuard]
   },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'routine',
    loadChildren: () => import('./routine-list/routine-list.module').then( m => m.RoutineListPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
