import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ExpeditionEffects } from './+state/effects/expedition.effects';
import * as fromExpedition from './+state/reducers/expedition.reducer';
import { ShippingService } from './+state/services/shipping.service';
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
  imports: [
    SharedModule,
    ShippingRoutingModule,
    StoreModule.forFeature(fromExpedition.expeditionFeatureKey, fromExpedition.reducer),
    EffectsModule.forFeature([ExpeditionEffects]),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [ShippingService],
})
export class ShippingModule {}
