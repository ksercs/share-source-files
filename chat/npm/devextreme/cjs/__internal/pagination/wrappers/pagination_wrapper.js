/**
* DevExtreme (cjs/__internal/pagination/wrappers/pagination_wrapper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationWrapper = void 0;
var _component_wrapper = require("../../core/r1/component_wrapper");
var _validation_utils = require("../utils/validation_utils");
const _excluded = ["pageSize", "pageIndex", "itemCount"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
class PaginationWrapper extends _component_wrapper.ComponentWrapper {
  _optionChanged(args) {
    switch (args.name) {
      case 'pageIndex':
        {
          const pageIndexChanged = this.option('pageIndexChanged');
          if (pageIndexChanged) {
            pageIndexChanged(args.value);
          }
          break;
        }
      case 'pageSize':
        {
          const pageSizeChanged = this.option('pageSizeChanged');
          if (pageSizeChanged) {
            pageSizeChanged(args.value);
          }
          break;
        }
      default:
        break;
    }
    super._optionChanged(args);
  }
  getPageCount() {
    return this.option('pageCount');
  }
  _validateOptions(options) {
    if (options._skipValidation || this.option('_skipValidation')) {
      return options;
    }
    const initialOptions = super._validateOptions(options);
    let {
        pageSize,
        pageIndex,
        itemCount
        // eslint-disable-next-line prefer-const
      } = initialOptions,
      rest = _objectWithoutPropertiesLoose(initialOptions, _excluded);
    if (pageSize === undefined) {
      pageSize = this.option('pageSize');
    }
    if (pageIndex === undefined) {
      pageIndex = this.option('pageIndex');
    }
    if (itemCount === undefined) {
      itemCount = this.option('itemCount');
    }
    const validatedOptions = (0, _validation_utils.validateOptions)(pageSize, pageIndex, itemCount);
    return _extends({}, rest, validatedOptions);
  }
}
exports.PaginationWrapper = PaginationWrapper;
