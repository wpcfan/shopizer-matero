import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsListComponent } from './list/list.component';
import { BrandsCreateComponent } from './create/create.component';
import { BrandsUpdateComponent } from './update/update.component';

const routes: Routes = [{ path: 'list', component: BrandsListComponent },
{ path: 'create', component: BrandsCreateComponent },
{ path: 'update', component: BrandsUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
