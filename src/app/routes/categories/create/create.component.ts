import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Category, Language } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as CategoryActions from '../+state/actions/category.actions';
import * as fromCategory from '../+state/selectors/category.selectors';
import { CategoryService } from '../+state/services/category.service';
@Component({
  selector: 'app-categories-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCreateComponent implements OnInit {
  languages$!: Observable<Language[]>;
  stores$ = this.store.select(fromProfile.selectStores);
  parentIdAndCategories$!: Observable<{ parentId: string | null; categories: Category[] }>;
  form!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      sortOrder: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      visible: [true, [Validators.required]],
      featured: [false, [Validators.required]],
      parent: [null],
      store: ['', [Validators.required]],
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
    this.parentIdAndCategories$ = combineLatest([
      this.route.queryParamMap.pipe(
        filter(params => params.has('parentId')),
        map(params => params.get('parentId'))
      ),
      this.store.select(fromCategory.selectAllFlatCategories),
    ]).pipe(
      map(([parentId, categories]) => ({ parentId, categories })),
      tap(({ parentId, categories }) => {
        const parent = categories.find(category => category.id.toString() === parentId);
        if (parent) {
          this.form.patchValue({ parent: { id: parent.id, code: parent.code } });
        }
      })
    );
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
    this.store.dispatch(CategoryActions.createCategory({ data: this.form.value }));
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
