/**
* DevExtreme (cjs/__internal/pagination/page_size/selector.js)
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
exports.PageSizeSelector = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _consts = require("../common/consts");
var _pagination_props = require("../common/pagination_props");
var _compatibility_utils = require("../utils/compatibility_utils");
var _large = require("./large");
var _small = require("./small");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const PageSizeSelectorDefaultProps = {
  isLargeDisplayMode: true,
  pageSize: _pagination_props.PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: _pagination_props.PaginationDefaultProps.pageSizeChangedInternal,
  allowedPageSizes: _pagination_props.PaginationDefaultProps.allowedPageSizes
};
class PageSizeSelector extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.rootElementRef = (0, _inferno.createRef)();
    this.htmlRef = (0, _inferno.createRef)();
    this.__getterCache = {
      normalizedPageSizes: undefined
    };
    this.setRootElementRef = this.setRootElementRef.bind(this);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.setRootElementRef, [])];
  }
  setRootElementRef() {
    const {
      rootElementRef
    } = this.props;
    if (rootElementRef) {
      rootElementRef.current = this.htmlRef.current;
    }
  }
  getAllText() {
    return (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-pageSizesAllText');
  }
  getNormalizedPageSizes() {
    if (this.__getterCache.normalizedPageSizes !== undefined) {
      return this.__getterCache.normalizedPageSizes;
    }
    const mapFunction = p => p === 'all' || p === 0 ? {
      text: this.getAllText(),
      value: 0
    } : {
      text: String(p),
      value: p
    };
    // eslint-disable-next-line @stylistic/max-len
    const result = this.props.allowedPageSizes.map(mapFunction);
    this.__getterCache.normalizedPageSizes = result;
    return result;
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.allowedPageSizes !== nextProps.allowedPageSizes) {
      this.__getterCache.normalizedPageSizes = undefined;
    }
  }
  render() {
    const normalizedPageSizes = this.getNormalizedPageSizes();
    const {
      pageSize,
      pageSizeChangedInternal,
      isLargeDisplayMode
    } = this.props;
    return (0, _inferno.createVNode)(1, "div", _consts.PAGINATION_PAGE_SIZES_CLASS, [isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PageSizeLarge, {
      "allowedPageSizes": this.getNormalizedPageSizes(),
      "pageSize": pageSize,
      "pageSizeChangedInternal": pageSizeChangedInternal
    }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PageSizeSmall, {
      "parentRef": this.htmlRef,
      "allowedPageSizes": normalizedPageSizes,
      "pageSize": pageSize,
      "pageSizeChangedInternal": pageSizeChangedInternal
    })], 0, null, null, this.htmlRef);
  }
}
exports.PageSizeSelector = PageSizeSelector;
PageSizeSelector.defaultProps = PageSizeSelectorDefaultProps;
