import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './list/list.component';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsUpdateComponent } from './update/update.component';
import { ProductsOptionsComponent } from './options/options.component';
import { ProductsValuesComponent } from './values/values.component';
import { ProductsSetsComponent } from './sets/sets.component';
import { ProductsVariationComponent } from './variation/variation.component';

const COMPONENTS: any[] = [ProductsListComponent, ProductsCreateComponent, ProductsUpdateComponent, ProductsOptionsComponent, ProductsValuesComponent, ProductsSetsComponent, ProductsVariationComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class ProductsModule { }
