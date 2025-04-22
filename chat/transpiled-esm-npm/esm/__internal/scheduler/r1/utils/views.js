import { isObject } from '../../../../core/utils/type';
import { VIEW_TYPES } from '../../constants';
export const getCurrentView = (currentView,
// https://github.com/DevExpress/devextreme-renovation/issues/754
views) => {
  let currentViewProps = views.find(view => {
    const names = isObject(view)
    // @ts-expect-error this type was related to R1 TSX
    ? [view.name, view.type] : [view];
    if (names.includes(currentView)) {
      return true;
    }
    return false;
  });
  if (currentViewProps === undefined) {
    if (VIEW_TYPES.includes(currentView)) {
      currentViewProps = currentView;
    } else {
      [currentViewProps] = views;
    }
  }
  return currentViewProps;
};