import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { CategoryEffects } from './+state/effects/category.effects';
import * as fromCategory from './+state/reducers/category.reducer';
import { CategoryService } from './+state/services/category.service';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesCreateComponent } from './create/create.component';
import { CategoriesListComponent } from './list/list.component';
import { CategoriesUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [
  CategoriesListComponent,
  CategoriesCreateComponent,
  CategoriesUpdateComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  providers: [CategoryService],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class CategoriesModule {}
