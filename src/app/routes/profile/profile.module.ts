import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSettingComponent } from './setting/setting.component';
import { ProfileOverviewComponent } from './overview/overview.component';

const COMPONENTS: any[] = [ProfileSettingComponent, ProfileOverviewComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class ProfileModule { }
