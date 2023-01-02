import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxClassesCreateComponent } from './classes/create/create.component';
import { TaxClassesListComponent } from './classes/list/list.component';
import { TaxClassesUpdateComponent } from './classes/update/update.component';
import { TaxRatesCreateComponent } from './rates/create/create.component';
import { TaxRatesListComponent } from './rates/list/list.component';
import { TaxRatesUpdateComponent } from './rates/update/update.component';

const routes: Routes = [
  {
    path: 'classes',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TaxClassesListComponent },
      { path: 'create', component: TaxClassesCreateComponent },
      { path: 'update/:code', component: TaxClassesUpdateComponent },
    ],
  },
  {
    path: 'rates',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TaxRatesListComponent },
      { path: 'create', component: TaxRatesCreateComponent },
      { path: 'update/:id', component: TaxRatesUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxRoutingModule {}
