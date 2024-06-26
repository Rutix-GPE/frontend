import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { UserListComponent } from './views/user/user-list/user-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
