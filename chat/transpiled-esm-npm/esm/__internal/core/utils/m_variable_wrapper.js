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