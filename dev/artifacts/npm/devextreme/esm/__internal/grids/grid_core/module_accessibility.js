/**
* DevExtreme (esm/__internal/grids/grid_core/module_accessibility.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as accessibility from '../../../ui/shared/accessibility';
export const registerKeyboardAction = function (viewName, instance, $element, selector, action) {
    const keyboardController = instance.getController('keyboardNavigation');
    if (instance.option('useLegacyKeyboardNavigation') || (keyboardController && !keyboardController.isKeyboardEnabled())) {
        return;
    }
    const executeKeyDown = (args) => {
        instance.executeAction('onKeyDown', args);
    };
    instance.createAction('onKeyDown');
    accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
