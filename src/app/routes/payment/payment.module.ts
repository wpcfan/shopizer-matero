import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './list/list.component';

const COMPONENTS: any[] = [PaymentListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class PaymentModule { }
