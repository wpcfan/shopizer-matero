import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresCreateComponent } from './create/create.component';
import { StoresUpdateComponent } from './update/update.component';
import { StoresListComponent } from './list/list.component';

const COMPONENTS: any[] = [StoresCreateComponent, StoresUpdateComponent, StoresListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    StoresRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class StoresModule { }
