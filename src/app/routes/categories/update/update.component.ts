import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Category } from '@models';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import * as CategoryActions from '../+state/actions/category.actions';
import * as fromCategory from '../+state/selectors/category.selectors';
@Component({
  selector: 'app-categories-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  stores$ = this.store.select(fromProfile.selectStores);
  categories$ = this.store.select(fromCategory.selectAllFlatCategories);
  selectedCategory$!: Observable<Category | undefined>;
  id$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => params.get('id') as string),
    tap(id => this.store.dispatch(CategoryActions.getById({ id: parseInt(id) })))
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
      sortOrder: [0, [Validators.required]],
      visible: [true, [Validators.required]],
      featured: [false, [Validators.required]],
      parent: [null],
      store: ['', [Validators.required]],
      descriptions: [[]],
    });
    this.selectedCategory$ = this.store.select(fromCategory.selectSelectedCategory).pipe(
      tap(category => {
        if (category) {
          this.form.patchValue({ ...category });
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
    this.store.dispatch(
      CategoryActions.updateCategory({ id: parseInt(id), data: this.form.value })
    );
  }

  delete(id: string) {
    this.store.dispatch(CategoryActions.deleteCategory({ id: parseInt(id) }));
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
