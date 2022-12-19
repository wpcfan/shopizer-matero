import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { environment } from '@env/environment';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as BrandActions from '../+state/actions/brand.actions';
import { BrandService } from '../+state/services/brand.service';
@Component({
  selector: 'app-brands-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsCreateComponent implements OnInit {
  apiKey = environment.tinyMCEApiKey;
  tinyMCEConfig = {
    selector: 'textarea', // change this value according to your HTML
    menu: {
      main: { title: 'Menu', items: 'code' },
    },
    plugins: 'code', // required by the code menu item
    menubar: 'main', // adds main to the menu bar
  };
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  descriptions: FormArray = this.fb.array([]);
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
      title: ['', Validators.required],
      name: ['', Validators.required],
      friendlyUrl: ['', Validators.required],
      highlights: ['', Validators.required],
      metaDescription: ['', Validators.required],
      description: ['', Validators.required],
      keyWords: ['', Validators.required],
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
    this.store.dispatch(BrandActions.createBrand({ data: this.form.value }));
  }
}
