import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTypesCreateComponent } from './create/create.component';
import { ProductTypesListComponent } from './list/list.component';
import { ProductTypesUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: ProductTypesListComponent },
  { path: 'create', component: ProductTypesCreateComponent },
  { path: 'update/:id', component: ProductTypesUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTypesRoutingModule {}
