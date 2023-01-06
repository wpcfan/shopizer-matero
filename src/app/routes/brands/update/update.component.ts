import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Manufacturer } from '@models';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import * as BrandActions from '../+state/actions/brand.actions';
import * as fromBrand from '../+state/selectors/brand.selectors';
@Component({
  selector: 'app-brands-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<Manufacturer | undefined>;
  id$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => params.get('id') as string),
    tap(id => this.store.dispatch(BrandActions.getById({ id: parseInt(id) })))
  );

  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      order: [0, [Validators.required]],
      descriptions: [[]],
    });
    this.selected$ = this.store.select(fromBrand.selectSelected).pipe(
      tap(brand => {
        if (brand) {
          this.form.patchValue(brand);
        }
      })
    );
  }

  update(ev: Event, id: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(BrandActions.updateBrand({ id: parseInt(id), data: this.form.value }));
  }

  delete(id: string) {
    this.store.dispatch(BrandActions.deleteBrand({ id: parseInt(id) }));
  }
}
