import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { environment } from '@env/environment';
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
  apiKey = environment.tinyMCEApiKey;
  tinyMCEConfig = {
    selector: 'textarea', // change this value according to your HTML
    menu: {
      main: { title: 'Menu', items: 'code' },
    },
    plugins: 'code', // required by the code menu item
    menubar: 'main', // adds main to the menu bar
  };
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  stores$ = this.store.select(fromProfile.selectStores);
  categories$ = this.store.select(fromCategory.selectAllCategories);
  selectedCategory$!: Observable<Category | undefined>;
  id$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => params.get('id') as string),
    tap(id => this.store.dispatch(CategoryActions.getById({ id: parseInt(id) })))
  );
  form!: FormGroup;
  descriptions!: FormArray;

  constructor(private store: Store, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.descriptions = this.fb.array([
      this.fb.group({
        language: ['', Validators.required],
        title: ['', Validators.required],
        name: ['', Validators.required],
        friendlyUrl: ['', Validators.required],
        highlights: ['', Validators.required],
        metaDescription: ['', Validators.required],
        description: ['', Validators.required],
        keyWords: ['', Validators.required],
      }),
    ]);
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      sortOrder: [0, [Validators.required]],
      visible: [true, [Validators.required]],
      featured: [false, [Validators.required]],
      parent: [null],
      store: ['', [Validators.required]],
      descriptions: this.descriptions,
    });
    this.selectedCategory$ = this.store.select(fromCategory.selectSelectedCategory).pipe(
      tap(category => {
        if (category) {
          this.form.patchValue({
            code: category.code,
            sortOrder: category.sortOrder,
            visible: category.visible,
            featured: category.featured,
            parent: category.parent,
            store: category.store,
            descriptions: [category.description],
          });
        }
      })
    );
  }

  getIndexedFormGroup(index: number) {
    return this.descriptions.controls[index] as FormGroup;
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
}
