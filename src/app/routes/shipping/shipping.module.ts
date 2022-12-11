import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShippingExpeditionComponent } from './expedition/expedition.component';
import { ShippingMethodsComponent } from './methods/methods.component';
import { ShippingOriginComponent } from './origin/origin.component';
import { ShippingPackagingComponent } from './packaging/packaging.component';
import { ShippingRoutingModule } from './shipping-routing.module';

const COMPONENTS: any[] = [
  ShippingExpeditionComponent,
  ShippingMethodsComponent,
  ShippingOriginComponent,
  ShippingPackagingComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ShippingRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class ShippingModule {}
