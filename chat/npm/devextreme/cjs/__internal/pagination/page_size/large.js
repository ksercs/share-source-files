/**
* DevExtreme (cjs/__internal/pagination/page_size/large.js)
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
exports.PageSizeLargeDefaultProps = exports.PageSizeLarge = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _string = require("../../../core/utils/string");
var _render_utils = require("../../core/r1/utils/render_utils");
var _consts = require("../common/consts");
var _light_button = require("../common/light_button");
var _pagination_props = require("../common/pagination_props");
var _compatibility_utils = require("../utils/compatibility_utils");
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const PageSizeLargeDefaultProps = exports.PageSizeLargeDefaultProps = {
  allowedPageSizes: [],
  pageSize: _pagination_props.PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: _pagination_props.PaginationDefaultProps.pageSizeChangedInternal
};
class PageSizeLarge extends _index.BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.__getterCache = {
      pageSizesText: undefined
    };
    this.state = {};
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
  }
  getPageSizesText() {
    if (this.__getterCache.pageSizesText !== undefined) {
      return this.__getterCache.pageSizesText;
    }
    const result = (() => {
      const {
        pageSize,
        allowedPageSizes
      } = this.props;
      return allowedPageSizes.map((_ref3, index) => {
        const {
          text,
          value: processedPageSize
        } = _ref3;
        const selected = processedPageSize === pageSize;
        const className = (0, _render_utils.combineClasses)({
          [selected ? _consts.PAGINATION_SELECTED_PAGE_SIZE_CLASS : _consts.PAGINATION_PAGE_SIZE_CLASS]: true,
          [_consts.FIRST_CHILD_CLASS]: index === 0
        });
        return {
          className,
          click: this.onPageSizeChange(processedPageSize),
          label: (0, _string.format)((0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-pageSize'), processedPageSize || (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-pageSizesAllText')),
          text
        };
      });
    })();
    this.__getterCache.pageSizesText = result;
    return result;
  }
  onPageSizeChange(processedPageSize) {
    return () => {
      this.props.pageSizeChangedInternal(processedPageSize);
      return this.props.pageSize;
    };
  }
  componentWillUpdate(nextProps) {
    const componentChanged = this.props.pageSize !== nextProps.pageSize || this.props.allowedPageSizes !== nextProps.allowedPageSizes || this.props.pageSizeChangedInternal !== nextProps.pageSizeChangedInternal;
    if (componentChanged) {
      this.__getterCache.pageSizesText = undefined;
    }
  }
  render() {
    return (0, _inferno.createFragment)(this.getPageSizesText().map(_ref => {
      let {
        text,
        className,
        label,
        click
      } = _ref;
      return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
        "className": className,
        "label": label,
        "onClick": click,
        children: text
      }, text);
    }), 0);
  }
}
exports.PageSizeLarge = PageSizeLarge;
PageSizeLarge.defaultProps = PageSizeLargeDefaultProps;
