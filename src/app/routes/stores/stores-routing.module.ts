import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresCreateComponent } from './create/create.component';
import { StoresListComponent } from './list/list.component';
import { StoresUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'list', component: StoresListComponent },
  { path: 'create', component: StoresCreateComponent },
  { path: ':id', component: StoresUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
