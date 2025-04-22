/**
* DevExtreme (esm/__internal/pagination/page_size/large.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createFragment, createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
import { Fragment } from 'inferno';
import { format } from '../../../core/utils/string';
import { combineClasses } from '../../core/r1/utils/render_utils';
import { FIRST_CHILD_CLASS, PAGINATION_PAGE_SIZE_CLASS, PAGINATION_SELECTED_PAGE_SIZE_CLASS } from '../common/consts';
import { LightButton } from '../common/light_button';
import { PaginationDefaultProps } from '../common/pagination_props';
import { getLocalizationMessage } from '../utils/compatibility_utils';
export const PageSizeLargeDefaultProps = {
  allowedPageSizes: [],
  pageSize: PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: PaginationDefaultProps.pageSizeChangedInternal
};
export class PageSizeLarge extends BaseInfernoComponent {
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
        const className = combineClasses({
          [selected ? PAGINATION_SELECTED_PAGE_SIZE_CLASS : PAGINATION_PAGE_SIZE_CLASS]: true,
          [FIRST_CHILD_CLASS]: index === 0
        });
        return {
          className,
          click: this.onPageSizeChange(processedPageSize),
          label: format(getLocalizationMessage(this.context, 'dxPagination-pageSize'), processedPageSize || getLocalizationMessage(this.context, 'dxPagination-pageSizesAllText')),
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
    return createFragment(this.getPageSizesText().map(_ref => {
      let {
        text,
        className,
        label,
        click
      } = _ref;
      return createComponentVNode(2, LightButton, {
        "className": className,
        "label": label,
        "onClick": click,
        children: text
      }, text);
    }), 0);
  }
}
PageSizeLarge.defaultProps = PageSizeLargeDefaultProps;
