import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicService } from '@core';
import { Expedition } from '@models';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import * as ExpeditionActions from '../+state/actions/expedition.actions';
import * as fromExpedition from '../+state/selectors/expedition.selectors';
@Component({
  selector: 'app-shipping-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingExpeditionComponent implements OnInit, OnDestroy {
  countries$ = this.publicService
    .countries()
    .pipe(map(countries => countries.map(country => ({ label: country.name, value: country }))));
  form!: FormGroup;
  selected$!: Observable<Expedition | undefined>;
  sub = new Subscription();
  constructor(
    private publicService: PublicService,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      iternationalShipping: [false],
      taxOnShipping: [false],
      shipToCountry: [{ value: [], disabled: true }],
    });
    this.store.dispatch(ExpeditionActions.loadExpedition());
    this.selected$ = this.store.select(fromExpedition.selectExpedition).pipe(
      tap(selected => {
        if (selected) {
          this.form.patchValue({ ...selected });
        }
      })
    );
    this.sub.add(
      this.form.get('iternationalShipping')?.valueChanges.subscribe(internationalShipping => {
        if (internationalShipping) {
          this.form.get('shipToCountry')?.enable();
        } else {
          this.form.get('shipToCountry')?.disable();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(ExpeditionActions.updateExpedition({ data: this.form.value }));
  }
}
