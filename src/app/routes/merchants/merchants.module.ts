import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { MerchantEffects } from './+state/effects/merchant.effects';
import * as fromMerchant from './+state/reducers/merchant.reducer';
import { MerchantService } from './+state/services/merchant.service';
import { MerchantsCreateComponent } from './create/create.component';
import { MerchantsListComponent } from './list/list.component';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [
  MerchantsCreateComponent,
  MerchantsUpdateComponent,
  MerchantsListComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    MerchantsRoutingModule,
    StoreModule.forFeature(fromMerchant.merchantFeatureKey, fromMerchant.reducer),
    EffectsModule.forFeature([MerchantEffects]),
  ],
  providers: [MerchantService],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class MerchantsModule {}
