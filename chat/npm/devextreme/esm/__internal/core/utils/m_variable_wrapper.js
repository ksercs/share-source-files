/**
* DevExtreme (esm/__internal/core/utils/m_variable_wrapper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable object-shorthand */
import { logger } from '../../../core/utils/console';
import dependencyInjector from '../../../core/utils/dependency_injector';
const variableWrapper = dependencyInjector({
  isWrapped: function () {
    return false;
  },
  isWritableWrapped: function () {
    return false;
  },
  wrap: function (value) {
    return value;
  },
  unwrap: function (value) {
    return value;
  },
  assign: function () {
    logger.error('Method \'assign\' should not be used for not wrapped variables. Use \'isWrapped\' method for ensuring.');
  }
});
export { variableWrapper };
