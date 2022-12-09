import { Menu, MenuChildrenItem } from '@models';

export const addNamespace = (menu: Menu[] | MenuChildrenItem[], namespace: string) => {
  menu.forEach(menuItem => {
    menuItem.name = `${namespace}.${menuItem.name}`;
    if (menuItem.children && menuItem.children.length > 0) {
      addNamespace(menuItem.children, menuItem.name);
    }
  });
};
const deepClone = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
};

// Whether two objects could be jsonized equal
const isJsonObjEqual = (obj0: any, obj1: any): boolean => {
  return JSON.stringify(obj0) === JSON.stringify(obj1);
};

// Whether routeArr equals realRouteArr (after remove empty route element)
const isRouteEqual = (routeArr: Array<string>, realRouteArr: Array<string>): boolean => {
  realRouteArr = deepClone(realRouteArr);
  realRouteArr = realRouteArr.filter(r => r !== '');
  return isJsonObjEqual(routeArr, realRouteArr);
};

/** Get the menu item name based on current route. */
const getItemName = (routeArr: string[], menus: Menu[]): string => {
  return getMenuLevel(routeArr, menus)[routeArr.length - 1];
};

const isLeafItem = (item: MenuChildrenItem): boolean => {
  const cond0 = item.route === undefined;
  const cond1 = item.children === undefined;
  const cond2 = !cond1 && item.children?.length === 0;
  return cond0 || cond1 || cond2;
};
/** Get the menu level. */
export const getMenuLevel = (routeArr: string[], menus: Menu[]): string[] => {
  let tmpArr: any[] = [];
  menus.forEach(item => {
    // Breadth-first traverse
    let unhandledLayer = [{ item, parentNamePathList: [], realRouteArr: [] }];
    while (unhandledLayer.length > 0) {
      let nextUnhandledLayer: any[] = [];
      for (const ele of unhandledLayer) {
        const eachItem = ele.item;
        const currentNamePathList = deepClone(ele.parentNamePathList).concat(eachItem.name);
        const currentRealRouteArr = deepClone(ele.realRouteArr).concat(eachItem.route);
        // Compare the full Array for expandable
        if (isRouteEqual(routeArr, currentRealRouteArr)) {
          tmpArr = currentNamePathList;
          break;
        }
        if (!isLeafItem(eachItem)) {
          const wrappedChildren = eachItem.children?.map(child => ({
            item: child,
            parentNamePathList: currentNamePathList,
            realRouteArr: currentRealRouteArr,
          }));
          nextUnhandledLayer = nextUnhandledLayer.concat(wrappedChildren);
        }
      }
      unhandledLayer = nextUnhandledLayer;
    }
  });
  return tmpArr;
};

/** Delete empty values and rebuild route. */
export const buildRoute = (routeArr: string[]): string => {
  let route = '';
  routeArr.forEach(item => {
    if (item && item.trim()) {
      route += '/' + item.replace(/^\/+|\/+$/g, '');
    }
  });
  return route;
};
