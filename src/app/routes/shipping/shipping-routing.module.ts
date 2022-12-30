import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingExpeditionComponent } from './expedition/expedition.component';
import { ShippingMethodsComponent } from './methods/methods.component';
import { ShippingOriginComponent } from './origin/origin.component';
import { ShippingPackagingCreateComponent } from './packaging/create/create.component';
import { ShippingPackagingListComponent } from './packaging/list/list.component';
import { ShippingPackagingUpdateComponent } from './packaging/update/update.component';

const routes: Routes = [
  { path: 'expedition', component: ShippingExpeditionComponent },
  { path: 'methods', component: ShippingMethodsComponent },
  { path: 'origin', component: ShippingOriginComponent },
  {
    path: 'packaging',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ShippingPackagingListComponent },
      { path: 'create', component: ShippingPackagingCreateComponent },
      { path: 'update/:code', component: ShippingPackagingUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
