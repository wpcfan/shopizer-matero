import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesCreateComponent } from './create/create.component';
import { CategoriesListComponent } from './list/list.component';
import { CategoriesUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: CategoriesListComponent },
  { path: 'create', component: CategoriesCreateComponent },
  { path: ':id', component: CategoriesUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
