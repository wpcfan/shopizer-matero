import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAttributeCreateComponent } from './attributes/create/create.component';
import { ProductAttributeListComponent } from './attributes/list/list.component';
import { ProductAttributeUpdateComponent } from './attributes/update/update.component';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsListComponent } from './list/list.component';
import { ProductsUpdateComponent } from './update/update.component';
import { ProductsVariantsCreateComponent } from './variants/create/create.component';
import { ProductsVariantsListComponent } from './variants/list/list.component';
import { ProductsVariantsUpdateComponent } from './variants/update/update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProductsListComponent },
      { path: 'create', component: ProductsCreateComponent },
      {
        path: 'update/:id',
        component: ProductsUpdateComponent,
        children: [
          {
            path: 'attributes',
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              { path: 'list', component: ProductAttributeListComponent },
              { path: 'create', component: ProductAttributeCreateComponent },
              { path: 'update/:attributeId', component: ProductAttributeUpdateComponent },
            ],
          },
        ],
      },
      {
        path: 'variants',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProductsVariantsListComponent },
          { path: 'create', component: ProductsVariantsCreateComponent },
          { path: 'update/:id', component: ProductsVariantsUpdateComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
