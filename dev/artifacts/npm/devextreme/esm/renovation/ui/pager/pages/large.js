/**
* DevExtreme (esm/renovation/ui/pager/pages/large.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["pageIndexes"],
  _excluded2 = ["maxPagesCount", "pageCount", "pageIndex", "pageIndexChange"];
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { Fragment } from 'inferno';
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { Page } from './page';
import { InternalPagerProps } from '../common/pager_props';
import { ConfigContext } from '../../../common/config_context';
var PAGER_PAGE_SEPARATOR_CLASS = 'dx-separator';
export var viewFunction = _ref => {
  var {
    pages
  } = _ref;
  var PagesMarkup = pages.map(_ref2 => {
    var {
      key,
      pageProps
    } = _ref2;
    return pageProps ? createComponentVNode(2, Page, {
      "index": pageProps.index,
      "selected": pageProps.selected,
      "onClick": pageProps.onClick
    }, key) : createVNode(1, "div", PAGER_PAGE_SEPARATOR_CLASS, ". . .", 16, null, key);
  });
  return createFragment(PagesMarkup, 0);
};
var PAGES_LIMITER = 4;
function getDelimiterType(startIndex, slidingWindowSize, pageCount) {
  if (startIndex === 1) {
    return 'high';
  }
  if (startIndex + slidingWindowSize === pageCount - 1) {
    return 'low';
  }
  return 'both';
}
function createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter) {
  var pageIndexes = [];
  var indexesForReuse = [];
  switch (delimiter) {
    case 'none':
      pageIndexes = [...slidingWindowIndexes];
      break;
    case 'both':
      pageIndexes = [0, 'low', ...slidingWindowIndexes, 'high', pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(1, -1);
      break;
    case 'high':
      pageIndexes = [0, ...slidingWindowIndexes, 'high', pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(0, -1);
      break;
    case 'low':
      pageIndexes = [0, 'low', ...slidingWindowIndexes, pageCount - 1];
      indexesForReuse = slidingWindowIndexes.slice(1);
      break;
  }
  return {
    slidingWindowIndexes,
    indexesForReuse,
    pageIndexes
  };
}
function createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter) {
  var slidingWindowIndexes = [];
  for (var i = 0; i < slidingWindowSize; i += 1) {
    slidingWindowIndexes.push(i + startIndex);
  }
  return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter);
}
var PagesLargePropsType = {
  get pageIndex() {
    return InternalPagerProps.pageIndex;
  },
  get maxPagesCount() {
    return InternalPagerProps.maxPagesCount;
  },
  get pageCount() {
    return InternalPagerProps.pageCount;
  }
};
export class PagesLarge extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.canReuseSlidingWindow = this.canReuseSlidingWindow.bind(this);
    this.generatePageIndexes = this.generatePageIndexes.bind(this);
    this.isSlidingWindowMode = this.isSlidingWindowMode.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  get slidingWindowState() {
    var slidingWindowState = this.slidingWindowStateHolder;
    if (!slidingWindowState) {
      return {
        indexesForReuse: [],
        slidingWindowIndexes: []
      };
    }
    return slidingWindowState;
  }
  canReuseSlidingWindow(currentPageCount, pageIndex) {
    var {
      indexesForReuse
    } = this.slidingWindowState;
    var lastPageIsFartherThanWindow = indexesForReuse.slice(-1)[0] < currentPageCount - 1;
    var pageIndexExistInIndexes = indexesForReuse.includes(pageIndex);
    return lastPageIsFartherThanWindow && pageIndexExistInIndexes;
  }
  generatePageIndexes() {
    var {
      pageCount,
      pageIndex
    } = this.props;
    var startIndex = 0;
    var {
      slidingWindowIndexes
    } = this.slidingWindowState;
    if (pageIndex === slidingWindowIndexes[0]) {
      startIndex = pageIndex - 1;
    } else if (pageIndex === slidingWindowIndexes[slidingWindowIndexes.length - 1]) {
      startIndex = pageIndex + 2 - PAGES_LIMITER;
    } else if (pageIndex < PAGES_LIMITER) {
      startIndex = 1;
    } else if (pageIndex >= pageCount - PAGES_LIMITER) {
      startIndex = pageCount - PAGES_LIMITER - 1;
    } else {
      startIndex = pageIndex - 1;
    }
    var slidingWindowSize = PAGES_LIMITER;
    var delimiter = getDelimiterType(startIndex, slidingWindowSize, pageCount);
    var _createPageIndexes = createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter),
      {
        pageIndexes
      } = _createPageIndexes,
      slidingWindowState = _objectWithoutPropertiesLoose(_createPageIndexes, _excluded);
    this.slidingWindowStateHolder = slidingWindowState;
    return pageIndexes;
  }
  isSlidingWindowMode() {
    var {
      maxPagesCount,
      pageCount
    } = this.props;
    return pageCount <= PAGES_LIMITER || pageCount <= maxPagesCount;
  }
  onPageClick(pageIndex) {
    this.props.pageIndexChange(pageIndex);
  }
  get pageIndexes() {
    var {
      pageCount
    } = this.props;
    if (this.isSlidingWindowMode()) {
      return createPageIndexes(0, pageCount, pageCount, 'none').pageIndexes;
    }
    if (this.canReuseSlidingWindow(pageCount, this.props.pageIndex)) {
      var {
        slidingWindowIndexes
      } = this.slidingWindowState;
      var delimiter = getDelimiterType(slidingWindowIndexes[0], PAGES_LIMITER, pageCount);
      return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter).pageIndexes;
    }
    return this.generatePageIndexes();
  }
  get pages() {
    var _this$config;
    var {
      pageIndex
    } = this.props;
    var createPage = index => {
      var pagerProps = index === 'low' || index === 'high' ? null : {
        index,
        onClick: () => this.onPageClick(index),
        selected: pageIndex === index
      };
      return {
        key: index.toString(),
        pageProps: pagerProps
      };
    };
    var rtlPageIndexes = (_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled ? [...this.pageIndexes].reverse() : this.pageIndexes;
    return rtlPageIndexes.map(index => createPage(index));
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      config: this.config,
      pageIndexes: this.pageIndexes,
      pages: this.pages,
      restAttributes: this.restAttributes
    });
  }
}
PagesLarge.defaultProps = PagesLargePropsType;
