import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { UserEffects } from './+state/effects/user.effects';
import * as fromUser from './+state/reducers/user.reducer';
import { UserService } from './+state/service/user.service';
import { UsersCreateComponent } from './create/create.component';
import { UsersListComponent } from './list/list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [UsersListComponent, UsersCreateComponent, UsersUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [UserService],
})
export class UsersModule {}
