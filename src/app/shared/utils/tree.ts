import { Category } from '@models';
import { SimpleTreeNode } from '@shared/components/simple-tree/model';
import { flatMap } from 'lodash';

export const getFlatCategories = (categories: Category[]): Category[] => {
  return flatMap(
    categories.map(category =>
      category.children && category.children.length > 0
        ? [category, ...getFlatCategories(category.children)]
        : [category]
    )
  );
};

export const convertCategoriesToNestedTree = (categories: Category[]): SimpleTreeNode[] => {
  return categories.map(category => ({
    id: `${category.id}`,
    name: category.code,
    value: category,
    children:
      category.children && category.children.length > 0
        ? convertCategoriesToNestedTree(category.children)
        : [],
  }));
};

export const convertNestedToFlat = (
  categories: Category[],
  level = 0
): {
  name: string;
  expandable: boolean;
  level: number;
  value: any;
}[] => {
  return flatMap(
    categories.map(category => {
      const hasChildren = !!category.children && category.children.length > 0;
      return hasChildren
        ? convertNestedToFlat(category.children, level + 1)
        : [
            {
              name: category.code,
              level,
              value: category,
              expandable: hasChildren,
            },
          ];
    })
  );
};
