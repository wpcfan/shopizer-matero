import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './list/list.component';
import { CategoriesCreateComponent } from './create/create.component';
import { CategoriesUpdateComponent } from './update/update.component';

const COMPONENTS: any[] = [CategoriesListComponent, CategoriesCreateComponent, CategoriesUpdateComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class CategoriesModule { }
