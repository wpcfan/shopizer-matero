import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { StoreEffects } from './+state/effects/store.effects';
import * as fromStore from './+state/reducers/store.reducer';
import { StoreService } from './+state/services/store.service';
import { StoresCreateComponent } from './create/create.component';
import { StoresListComponent } from './list/list.component';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [StoresCreateComponent, StoresUpdateComponent, StoresListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    StoresRoutingModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducer),
    EffectsModule.forFeature([StoreEffects]),
  ],
  providers: [StoreService],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class StoresModule {}
