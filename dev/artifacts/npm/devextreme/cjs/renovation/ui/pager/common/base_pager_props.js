/**
* DevExtreme (cjs/renovation/ui/pager/common/base_pager_props.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.BasePagerProps = void 0;
var _message = _interopRequireDefault(require("../../../../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var BasePagerProps = Object.defineProperties({
  gridCompatibility: true,
  showInfo: false,
  displayMode: 'adaptive',
  maxPagesCount: 10,
  pageCount: 10,
  visible: true,
  hasKnownLastPage: true,
  pagesNavigatorVisible: 'auto',
  showPageSizes: true,
  pageSizes: Object.freeze([5, 10]),
  showNavigationButtons: false,
  totalCount: 0
}, {
  label: {
    get: function get() {
      return _message.default.format('dxPager-ariaLabel');
    },
    configurable: true,
    enumerable: true
  }
});
exports.BasePagerProps = BasePagerProps;
