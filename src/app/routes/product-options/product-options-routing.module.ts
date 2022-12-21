import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOptionsCreateComponent } from './options/create/create.component';
import { ProductOptionsListComponent } from './options/list/list.component';
import { ProductOptionsUpdateComponent } from './options/update/update.component';
import { ProductOptionsValuesCreateComponent } from './values/create/create.component';
import { ProductOptionsValuesListComponent } from './values/list/list.component';
import { ProductOptionsValuesUpdateComponent } from './values/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'options', pathMatch: 'full' },
  {
    path: 'options',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProductOptionsListComponent },
      { path: 'create', component: ProductOptionsCreateComponent },
      { path: 'update/:id', component: ProductOptionsUpdateComponent },
    ],
  },
  {
    path: 'values',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProductOptionsValuesListComponent },
      { path: 'create', component: ProductOptionsValuesCreateComponent },
      { path: 'update/:id', component: ProductOptionsValuesUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductOptionsRoutingModule {}
