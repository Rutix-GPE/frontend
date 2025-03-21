import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { QuestionComponent } from './view/question/question.component';
import { RoutineListComponent } from './view/routine-list/routine-list.component';
import {LayoutComponent} from "./container/layout/layout.component";

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'question', component: QuestionComponent,
    canActivate: [AuthGuard]
   },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./view/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'routine',
        loadChildren: () => import('./view/routine-list/routine-list.module').then(m => m.RoutineListPageModule),
        canActivate: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
