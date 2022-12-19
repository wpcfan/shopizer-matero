import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { BrandEffects } from './+state/effects/brand.effects';
import * as fromBrands from './+state/reducers/brand.reducer';
import { BrandService } from './+state/services/brand.service';
import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsCreateComponent } from './create/create.component';
import { BrandsListComponent } from './list/list.component';
import { BrandsUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [BrandsListComponent, BrandsCreateComponent, BrandsUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    BrandsRoutingModule,
    StoreModule.forFeature(fromBrands.brandFeatureKey, fromBrands.reducer),
    EffectsModule.forFeature([BrandEffects]),
  ],
  providers: [BrandService],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class BrandsModule {}
