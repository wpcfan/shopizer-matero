import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCreateComponent } from './create/create.component';
import { UsersListComponent } from './list/list.component';
import { UsersPasswordComponent } from './password/password.component';
import { UsersUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'create', component: UsersCreateComponent },
  { path: ':id', component: UsersUpdateComponent },
  { path: ':id/password', component: UsersPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
