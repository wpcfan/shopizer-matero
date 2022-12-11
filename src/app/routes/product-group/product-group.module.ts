import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductGroupRoutingModule } from './product-group-routing.module';
import { ProductGroupListComponent } from './list/list.component';
import { ProductGroupCreateComponent } from './create/create.component';
import { ProductGroupUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [ProductGroupListComponent, ProductGroupCreateComponent, ProductGroupUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProductGroupRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class ProductGroupModule { }
