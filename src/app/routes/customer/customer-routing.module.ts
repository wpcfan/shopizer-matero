import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './list/list.component';
import { CustomerCreateComponent } from './create/create.component';
import { CustomerUpdateComponent } from './update/update.component';

const routes: Routes = [{ path: 'list', component: CustomerListComponent },
{ path: 'create', component: CustomerCreateComponent },
{ path: 'update', component: CustomerUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
