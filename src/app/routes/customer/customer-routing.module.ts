import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './create/create.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CustomerListComponent },
  { path: 'create', component: CustomerCreateComponent },
  { path: 'update/:id', component: CustomerUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
