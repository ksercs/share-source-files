/**
* DevExtreme (cjs/__internal/pagination/pages/small.js)
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
exports.PaginationSmallDefaultProps = exports.PagesSmall = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _pagination_props = require("../common/pagination_props");
var _number_box = require("../editors/number_box");
var _info = require("../info");
var _calculate_values_fitted_width = require("../utils/calculate_values_fitted_width");
var _compatibility_utils = require("../utils/compatibility_utils");
var _get_element_width = require("../utils/get_element_width");
var _page = require("./page");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const PAGER_INFO_TEXT_CLASS = `${_info.PAGER_INFO_CLASS}  dx-info-text`;
const PAGER_PAGE_INDEX_CLASS = 'dx-page-index';
const LIGHT_PAGES_CLASS = 'dx-light-pages';
const PAGER_PAGES_COUNT_CLASS = 'dx-pages-count';
const PaginationSmallDefaultProps = exports.PaginationSmallDefaultProps = {
  pageIndex: _pagination_props.PaginationDefaultProps.pageIndex,
  pageCount: _pagination_props.PaginationDefaultProps.pageCount,
  pageIndexChangedInternal: _pagination_props.PaginationDefaultProps.pageIndexChangedInternal
};
class PagesSmall extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      minWidth: 10
    };
    this.refs = null;
    this.pageIndexRef = (0, _inferno.createRef)();
    this.updateWidth = this.updateWidth.bind(this);
    this.selectLastPageIndex = this.selectLastPageIndex.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.updateWidth, [this.state.minWidth])];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.state.minWidth]);
  }
  updateWidth() {
    var _this$pageIndexRef$cu;
    const el = (_this$pageIndexRef$cu = this.pageIndexRef.current) === null || _this$pageIndexRef$cu === void 0 ? void 0 : _this$pageIndexRef$cu.querySelector(`.${PAGER_PAGE_INDEX_CLASS}`);
    const minWidth = el ? (0, _get_element_width.getElementMinWidth)(el) : 0;
    this.setState(state => ({
      minWidth: minWidth > 0 ? minWidth : state.minWidth
    }));
  }
  getValue() {
    return this.props.pageIndex + 1;
  }
  getWidth() {
    return (0, _calculate_values_fitted_width.calculateValuesFittedWidth)(this.state.minWidth, [this.props.pageCount]);
  }
  getPagesCountText() {
    return (this.props.pagesCountText ?? '') || (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-pagesCountText');
  }
  getInputAttributes() {
    return {
      'aria-label': (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-ariaPageNumber')
    };
  }
  selectLastPageIndex() {
    this.props.pageIndexChangedInternal(this.props.pageCount - 1);
  }
  valueChange(value) {
    this.props.pageIndexChangedInternal(value - 1);
  }
  render() {
    return (0, _inferno.createVNode)(1, "div", LIGHT_PAGES_CLASS, [(0, _inferno.createComponentVNode)(2, _number_box.NumberBox, {
      "className": PAGER_PAGE_INDEX_CLASS,
      "min": 1,
      "max": Math.max(this.props.pageCount, this.getValue()),
      "width": this.getWidth(),
      "value": this.getValue(),
      "valueChange": this.valueChange,
      "inputAttr": this.getInputAttributes()
    }), (0, _inferno.createVNode)(1, "span", PAGER_INFO_TEXT_CLASS, this.getPagesCountText(), 0), (0, _inferno.createComponentVNode)(2, _page.Page, {
      "className": PAGER_PAGES_COUNT_CLASS,
      "selected": false,
      "index": this.props.pageCount - 1,
      "onClick": this.selectLastPageIndex
    })], 4, null, null, this.pageIndexRef);
  }
}
exports.PagesSmall = PagesSmall;
PagesSmall.defaultProps = PaginationSmallDefaultProps;
