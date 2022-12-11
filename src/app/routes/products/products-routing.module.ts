import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsListComponent } from './list/list.component';
import { ProductsUpdateComponent } from './update/update.component';
import { ProductsOptionsComponent } from './options/options.component';
import { ProductsValuesComponent } from './values/values.component';
import { ProductsSetsComponent } from './sets/sets.component';
import { ProductsVariationComponent } from './variation/variation.component';

const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'create', component: ProductsCreateComponent },
  { path: ':id', component: ProductsUpdateComponent },
  { path: 'options', component: ProductsOptionsComponent },
  { path: 'values', component: ProductsValuesComponent },
  { path: 'sets', component: ProductsSetsComponent },
  { path: 'variation', component: ProductsVariationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
