import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as ProductOptionsActions from '../../+state/actions/product-option.actions';
import { ProductOptionService } from '../../+state/services/product-option.service';

@Component({
  selector: 'app-product-options-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOptionsCreateComponent implements OnInit {
  optionTypes = ['select', 'radio', 'checkbox', 'text'];
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  descriptions: FormArray = this.fb.array([]);
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductOptionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      order: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      readOnly: [true],
      type: ['', [Validators.required]],
      descriptions: this.descriptions,
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages).pipe(
      tap(languages => {
        if (languages.length > 0) {
          this.descriptions.clear();
        }
        languages.forEach(language => {
          this.descriptions.push(this.createDescription(language.code));
        });
      })
    );
  }

  codeValidator(): AsyncValidatorFn {
    return control => this.service.unique(control.value);
  }

  createDescription(language: string) {
    return this.fb.group({
      language: [language, Validators.required],
      title: [''],
      name: ['', Validators.required],
      friendlyUrl: [''],
      highlights: [''],
      metaDescription: [''],
      description: [''],
      keyWords: [''],
    });
  }

  getIndexedFormGroup(index: number) {
    return this.descriptions.controls[index] as FormGroup;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(ProductOptionsActions.createProductOption({ data: this.form.value }));
  }
}
