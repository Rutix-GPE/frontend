import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './view/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { QuestionComponent } from './view/question/question.component';
import { RoutineListComponent } from './view/routine-list/routine-list.component';
import { LayoutComponent } from './container/layout/layout.component';
import { Intro1Component } from './view/intro/intro1/intro1.component';
import { Intro2Component } from './view/intro/intro2/intro2.component';
import { Intro3Component } from './view/intro/intro3/intro3.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro1', pathMatch: 'full' },
  { path: 'intro1', component: Intro1Component },
  { path: 'intro2', component: Intro2Component },
  { path: 'intro3', component: Intro3Component },
  { path: 'login', component: AuthComponent },
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
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
        path: 'routine',
        loadChildren: () => import('./view/routine-list/routine-list.module').then(m => m.RoutineListPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'taskList',
        loadChildren: () => import('./view/task-list/task-list.module').then(m => m.TaskListPageModule),
        canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }