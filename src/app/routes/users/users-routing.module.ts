import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCreateComponent } from './create/create.component';
import { UsersListComponent } from './list/list.component';
import { UsersUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'create', component: UsersCreateComponent },
  { path: ':id', component: UsersUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
