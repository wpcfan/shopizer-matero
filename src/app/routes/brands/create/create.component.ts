import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BrandActions from '../+state/actions/brand.actions';
import { BrandService } from '../+state/services/brand.service';
@Component({
  selector: 'app-brands-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsCreateComponent implements OnInit {
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: BrandService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      order: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
  }

  codeValidator(): AsyncValidatorFn {
    return control => this.service.unique(control.value);
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(BrandActions.createBrand({ data: this.form.value }));
  }
}
