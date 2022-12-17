import { Category } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.State>(
  fromCategory.categoryFeatureKey
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state): Category[] => state.categories
);

export const selectCategoryById = (id: number) =>
  createSelector(selectCategories, (categories): Category | undefined =>
    categories.find(category => category.id === id)
  );

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state): boolean => state.loading
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state): string | undefined => state.error
);

export const selectCategoryTotal = createSelector(
  selectCategoryState,
  (state): number => state.total
);

export const selectSelectedCategory = createSelector(
  selectCategoryState,
  (state): Category | undefined => state.selectedCategory
);

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state): Category[] => state.allCategories
);
