import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductGroupListComponent } from './list/list.component';
import { ProductGroupCreateComponent } from './create/create.component';
import { ProductGroupUpdateComponent } from './update/update.component';

const routes: Routes = [{ path: 'list', component: ProductGroupListComponent },
{ path: 'create', component: ProductGroupCreateComponent },
{ path: 'update', component: ProductGroupUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductGroupRoutingModule { }
