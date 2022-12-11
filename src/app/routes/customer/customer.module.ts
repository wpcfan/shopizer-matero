import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './list/list.component';
import { CustomerCreateComponent } from './create/create.component';
import { CustomerUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [CustomerListComponent, CustomerCreateComponent, CustomerUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    CustomerRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class CustomerModule { }
