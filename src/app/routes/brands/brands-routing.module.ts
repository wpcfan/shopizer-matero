import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsCreateComponent } from './create/create.component';
import { BrandsListComponent } from './list/list.component';
import { BrandsUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: BrandsListComponent },
  { path: 'create', component: BrandsCreateComponent },
  { path: 'update/:id', component: BrandsUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandsRoutingModule {}
