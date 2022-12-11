import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxClassListComponent } from './class-list/class-list.component';
import { TaxRateListComponent } from './rate-list/rate-list.component';

const routes: Routes = [{ path: 'class-list', component: TaxClassListComponent },
{ path: 'rate-list', component: TaxRateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
