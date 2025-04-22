"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePaginationDefaultProps = void 0;
var _base_props = require("../../core/r1/base_props");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BasePaginationDefaultProps = exports.BasePaginationDefaultProps = _extends({}, _base_props.BaseWidgetDefaultProps, {
  isGridCompatibilityMode: false,
  showInfo: false,
  displayMode: 'adaptive',
  maxPagesCount: 10,
  pageCount: 1,
  visible: true,
  hasKnownLastPage: true,
  pagesNavigatorVisible: 'auto',
  showPageSizeSelector: true,
  allowedPageSizes: [5, 10],
  showNavigationButtons: false,
  itemCount: 1,
  label: _message.default.format('dxPagination-ariaLabel')
});