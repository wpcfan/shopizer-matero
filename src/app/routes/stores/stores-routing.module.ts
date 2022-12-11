import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresCreateComponent } from './create/create.component';
import { StoresListComponent } from './list/list.component';
import { StoresUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'create', component: StoresCreateComponent },
  { path: ':id', component: StoresUpdateComponent },
  { path: 'list', component: StoresListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
