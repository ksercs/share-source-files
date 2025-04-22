/**
* DevExtreme (esm/__internal/grids/grid_core/m_accessibility.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as accessibility from '../../../ui/shared/accessibility';
export const registerKeyboardAction = function (viewName, instance, $element, selector, action) {
  const keyboardController = instance.getController('keyboardNavigation');
  if (instance.option('useLegacyKeyboardNavigation') || keyboardController && !keyboardController.isKeyboardEnabled()) {
    return;
  }
  const executeKeyDown = args => {
    instance.executeAction('onKeyDown', args);
  };
  instance.createAction('onKeyDown');
  accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
