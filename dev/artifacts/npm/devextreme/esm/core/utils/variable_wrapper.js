/**
* DevExtreme (esm/core/utils/variable_wrapper.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { logger } from './console';
import dependencyInjector from './dependency_injector';
export default dependencyInjector({
  isWrapped: function isWrapped() {
    return false;
  },
  isWritableWrapped: function isWritableWrapped() {
    return false;
  },
  wrap: function wrap(value) {
    return value;
  },
  unwrap: function unwrap(value) {
    return value;
  },
  assign: function assign() {
    logger.error('Method \'assign\' should not be used for not wrapped variables. Use \'isWrapped\' method for ensuring.');
  }
});
