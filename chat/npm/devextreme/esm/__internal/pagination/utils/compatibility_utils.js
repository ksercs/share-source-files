/**
* DevExtreme (esm/__internal/pagination/utils/compatibility_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import messageLocalization from '../../../common/core/localization/message';
import { PaginationConfigContext } from '../common/pagination_config_context';
function getPaginationConfig(context) {
  if (context[PaginationConfigContext.id]) {
    return context[PaginationConfigContext.id];
  }
  return PaginationConfigContext.defaultValue;
}
export function isGridCompatibilityMode(context) {
  var _getPaginationConfig;
  return !!((_getPaginationConfig = getPaginationConfig(context)) !== null && _getPaginationConfig !== void 0 && _getPaginationConfig.isGridCompatibilityMode);
}
export function getLocalizationMessage(context, key) {
  let actualKey = key;
  if (isGridCompatibilityMode(context)) {
    actualKey = key.replace('dxPagination', 'dxPager');
  }
  return messageLocalization.getFormatter(actualKey)();
}
