import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaxRoutingModule } from './tax-routing.module';
import { TaxClassListComponent } from './class-list/class-list.component';
import { TaxRateListComponent } from './rate-list/rate-list.component';

const COMPONENTS: any[] = [TaxClassListComponent, TaxRateListComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    TaxRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class TaxModule { }
