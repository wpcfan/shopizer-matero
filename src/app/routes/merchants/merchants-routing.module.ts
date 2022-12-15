import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantsCreateComponent } from './create/create.component';
import { MerchantsListComponent } from './list/list.component';
import { MerchantsLogoComponent } from './logo/logo.component';
import { MerchantsUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: MerchantsListComponent },
  { path: 'create', component: MerchantsCreateComponent },
  { path: 'logo/:code', component: MerchantsLogoComponent },
  { path: 'update/:code', component: MerchantsUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantsRoutingModule {}
