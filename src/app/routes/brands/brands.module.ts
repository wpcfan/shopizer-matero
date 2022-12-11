import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsListComponent } from './list/list.component';
import { BrandsCreateComponent } from './create/create.component';
import { BrandsUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [BrandsListComponent, BrandsCreateComponent, BrandsUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    BrandsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class BrandsModule { }
