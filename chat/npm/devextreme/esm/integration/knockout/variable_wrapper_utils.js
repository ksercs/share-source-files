/**
* DevExtreme (esm/integration/knockout/variable_wrapper_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import variableWrapper from '../../core/utils/variable_wrapper';
if (ko) {
  variableWrapper.inject({
    isWrapped: ko.isObservable,
    isWritableWrapped: ko.isWritableObservable,
    wrap: ko.observable,
    unwrap: function (value) {
      if (ko.isObservable(value)) {
        return ko.utils.unwrapObservable(value);
      }
      return this.callBase(value);
    },
    assign: function (variable, value) {
      if (ko.isObservable(variable)) {
        variable(value);
      } else {
        this.callBase(variable, value);
      }
    }
  });
}
