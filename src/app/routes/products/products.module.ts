import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { BrandService } from '../brands/+state/services/brand.service';
import { CategoryService } from '../categories/+state/services/category.service';
import { ProductOptionValueService } from '../product-options/+state/services/product-option-value.service';
import { ProductOptionService } from '../product-options/+state/services/product-option.service';
import { ProductTypeService } from '../product-types/+state/services/product-type.service';
import { ProductAttributeEffects } from './+state/effects/product-attribute.effects';
import { ProductEffects } from './+state/effects/product.effects';
import * as fromProductAttribute from './+state/reducers/product-attribute.reducer';
import * as fromProduct from './+state/reducers/product.reducer';
import { ProductAttributeService } from './+state/services/product-attribute.service';
import { ProductService } from './+state/services/product.service';
import { ProductAttributeCreateComponent } from './attributes/create/create.component';
import { ProductAttributeListComponent } from './attributes/list/list.component';
import { ProductAttributeUpdateComponent } from './attributes/update/update.component';
import { ProductsCreateComponent } from './create/create.component';
import { ProductsListComponent } from './list/list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsUpdateComponent } from './update/update.component';
import { ProductsVariationComponent } from './variation/variation.component';

const COMPONENTS: any[] = [
  ProductsListComponent,
  ProductsCreateComponent,
  ProductsUpdateComponent,
  ProductsVariationComponent,
  ProductAttributeListComponent,
  ProductAttributeCreateComponent,
  ProductAttributeUpdateComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature(
      fromProductAttribute.productAttributeFeatureKey,
      fromProductAttribute.reducer
    ),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductAttributeEffects, ProductEffects]),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [
    ProductService,
    ProductAttributeService,
    BrandService,
    CategoryService,
    ProductTypeService,
    ProductOptionService,
    ProductOptionValueService,
  ],
})
export class ProductsModule {}
