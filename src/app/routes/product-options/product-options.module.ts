import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ProductOptionValueEffects } from './+state/effects/product-option-value.effects';
import { ProductOptionEffects } from './+state/effects/product-option.effects';
import * as fromProductOptionValue from './+state/reducers/product-option-value.reducer';
import * as fromProductOption from './+state/reducers/product-option.reducer';
import { ProductOptionValueService } from './+state/services/product-option-value.service';
import { ProductOptionService } from './+state/services/product-option.service';
import { ProductOptionsCreateComponent } from './options/create/create.component';
import { ProductOptionsListComponent } from './options/list/list.component';
import { ProductOptionsUpdateComponent } from './options/update/update.component';
import { ProductOptionsRoutingModule } from './product-options-routing.module';
import { ProductOptionValueCreateComponent } from './values/create/create.component';
import { ProductOptionValueListComponent } from './values/list/list.component';
import { ProductOptionValueUpdateComponent } from './values/update/update.component';

const COMPONENTS: any[] = [
  ProductOptionsListComponent,
  ProductOptionsCreateComponent,
  ProductOptionsUpdateComponent,
  ProductOptionValueListComponent,
  ProductOptionValueCreateComponent,
  ProductOptionValueUpdateComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProductOptionsRoutingModule,
    StoreModule.forFeature(fromProductOption.productOptionFeatureKey, fromProductOption.reducer),
    EffectsModule.forFeature([ProductOptionEffects, ProductOptionValueEffects]),
    StoreModule.forFeature(
      fromProductOptionValue.productOptionValueFeatureKey,
      fromProductOptionValue.reducer
    ),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [ProductOptionService, ProductOptionValueService],
})
export class ProductOptionsModule {}
