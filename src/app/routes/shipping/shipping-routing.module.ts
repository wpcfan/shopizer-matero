import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingExpeditionComponent } from './expedition/expedition.component';
import { ShippingMethodsComponent } from './methods/methods.component';
import { ShippingOriginComponent } from './origin/origin.component';
import { ShippingPackagingComponent } from './packaging/packaging.component';

const routes: Routes = [{ path: 'expedition', component: ShippingExpeditionComponent }, { path: 'methods', component: ShippingMethodsComponent }, { path: 'origin', component: ShippingOriginComponent }, { path: 'packaging', component: ShippingPackagingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
