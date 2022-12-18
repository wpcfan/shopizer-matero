import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@models';
import { Store } from '@ngrx/store';

import * as CategortActions from '../+state/actions/category.actions';
import * as fromCategory from '../+state/selectors/category.selectors';

@Component({
  selector: 'app-categories-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesHierarchyComponent {
  tree$ = this.store.select(fromCategory.selectTreeCategories);

  constructor(private store: Store, private router: Router) {}

  onNodeSelected(category: Category) {
    console.log(category);
  }

  handleAddSibling(category: Category) {
    this.router.navigate(['/categories', 'create'], {
      queryParams: { parentId: category.parent?.id },
    });
  }

  handleAddChild(category: Category) {
    this.router.navigate(['/categories', 'create'], {
      queryParams: { parentId: category.id },
    });
  }

  handleDeleteNode(category: Category) {
    this.store.dispatch(CategortActions.deleteCategory({ id: category.id }));
  }
}
