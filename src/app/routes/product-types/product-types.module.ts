import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ProductTypeEffects } from './+state/effects/product-type.effects';
import * as fromProductType from './+state/reducers/product-type.reducer';
import { ProductTypeService } from './+state/services/product-type.service';
import { ProductTypesCreateComponent } from './create/create.component';
import { ProductTypesListComponent } from './list/list.component';
import { ProductTypesRoutingModule } from './product-types-routing.module';
import { ProductTypesUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [
  ProductTypesListComponent,
  ProductTypesCreateComponent,
  ProductTypesUpdateComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProductTypesRoutingModule,
    StoreModule.forFeature(fromProductType.productTypeFeatureKey, fromProductType.reducer),
    EffectsModule.forFeature([ProductTypeEffects]),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [ProductTypeService],
})
export class ProductTypesModule {}
