import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './list/list.component';

const COMPONENTS: any[] = [OrdersListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class OrdersModule { }
