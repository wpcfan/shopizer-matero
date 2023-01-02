import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RateService } from './+state/services/rate.service';
import { TaxService } from './+state/services/tax.service';
import { TaxClassesCreateComponent } from './classes/create/create.component';
import { TaxClassesListComponent } from './classes/list/list.component';
import { TaxClassesUpdateComponent } from './classes/update/update.component';
import { TaxRatesCreateComponent } from './rates/create/create.component';
import { TaxRatesListComponent } from './rates/list/list.component';
import { TaxRatesUpdateComponent } from './rates/update/update.component';
import { TaxRoutingModule } from './tax-routing.module';

const COMPONENTS: any[] = [
  TaxClassesListComponent,
  TaxRatesListComponent,
  TaxRatesCreateComponent,
  TaxRatesUpdateComponent,
  TaxClassesUpdateComponent,
  TaxClassesCreateComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, TaxRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [TaxService, RateService],
})
export class TaxModule {}
