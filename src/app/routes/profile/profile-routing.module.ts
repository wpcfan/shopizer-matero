import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileOverviewComponent } from './overview/overview.component';
import { ProfileSettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'setting', component: ProfileSettingComponent },
  { path: 'overview', component: ProfileOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
