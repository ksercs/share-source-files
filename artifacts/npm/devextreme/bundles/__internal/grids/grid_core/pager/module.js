/**
* DevExtreme (bundles/__internal/grids/grid_core/pager/module.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagerModule = void 0;
var _pager = _interopRequireDefault(require("../../../../ui/pager"));
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _modules = _interopRequireDefault(require("../modules"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var PAGER_CLASS = 'pager';
var MAX_PAGES_COUNT = 10;
var getPageIndex = function getPageIndex(dataController) {
  // eslint-disable-next-line radix
  return 1 + (parseInt(dataController.pageIndex()) || 0);
};
var PagerView = _modules.default.View.inherit({
  init: function init() {
    var _this = this;
    var dataController = this.getController('data');
    dataController.changed.add(function (e) {
      if (e && e.repaintChangesOnly) {
        var pager = _this._pager;
        if (pager) {
          pager.option({
            pageIndex: getPageIndex(dataController),
            pageSize: dataController.pageSize(),
            pageCount: dataController.pageCount(),
            totalCount: dataController.totalCount(),
            hasKnownLastPage: dataController.hasKnownLastPage()
          });
        } else {
          _this.render();
        }
      } else if (!e || e.changeType !== 'update' && e.changeType !== 'updateSelection' && e.changeType !== 'updateFocusedRow') {
        _this._pager = null;
        _this.render();
      }
    });
  },
  _renderCore: function _renderCore() {
    var that = this;
    var $element = that.element().addClass(that.addWidgetPrefix(PAGER_CLASS));
    var pagerOptions = that.option('pager') || {};
    var dataController = that.getController('data');
    var keyboardController = that.getController('keyboardNavigation');
    var options = {
      maxPagesCount: MAX_PAGES_COUNT,
      pageIndex: getPageIndex(dataController),
      pageCount: dataController.pageCount(),
      pageSize: dataController.pageSize(),
      showPageSizes: pagerOptions.showPageSizeSelector,
      showInfo: pagerOptions.showInfo,
      displayMode: pagerOptions.displayMode,
      pagesNavigatorVisible: pagerOptions.visible,
      showNavigationButtons: pagerOptions.showNavigationButtons,
      label: pagerOptions.label,
      pageSizes: that.getPageSizes(),
      totalCount: dataController.totalCount(),
      hasKnownLastPage: dataController.hasKnownLastPage(),
      pageIndexChanged: function pageIndexChanged(pageIndex) {
        if (dataController.pageIndex() !== pageIndex - 1) {
          dataController.pageIndex(pageIndex - 1);
        }
      },
      pageSizeChanged: function pageSizeChanged(pageSize) {
        dataController.pageSize(pageSize);
      },
      onKeyDown: function onKeyDown(e) {
        return keyboardController && keyboardController.executeAction('onKeyDown', e);
      },
      useLegacyKeyboardNavigation: this.option('useLegacyKeyboardNavigation'),
      useKeyboard: this.option('keyboardNavigation.enabled')
    };
    if ((0, _type.isDefined)(pagerOptions.infoText)) {
      options.infoText = pagerOptions.infoText;
    }
    if (this._pager) {
      this._pager.repaint();
      return;
    }
    if ((0, _window.hasWindow)()) {
      this._pager = that._createComponent($element, _pager.default, options);
    } else {
      $element.addClass('dx-pager').html('<div class="dx-pages"><div class="dx-page"></div></div>');
    }
  },
  getPager: function getPager() {
    return this._pager;
  },
  getPageSizes: function getPageSizes() {
    var that = this;
    var dataController = that.getController('data');
    var pagerOptions = that.option('pager');
    var allowedPageSizes = pagerOptions && pagerOptions.allowedPageSizes;
    var pageSize = dataController.pageSize();
    if (!(0, _type.isDefined)(that._pageSizes) || !that._pageSizes.includes(pageSize)) {
      that._pageSizes = [];
      if (pagerOptions) {
        if (Array.isArray(allowedPageSizes)) {
          that._pageSizes = allowedPageSizes;
        } else if (allowedPageSizes && pageSize > 1) {
          that._pageSizes = [Math.floor(pageSize / 2), pageSize, pageSize * 2];
        }
      }
    }
    return that._pageSizes;
  },
  isVisible: function isVisible() {
    var dataController = this.getController('data');
    var pagerOptions = this.option('pager');
    var pagerVisible = pagerOptions && pagerOptions.visible;
    var scrolling = this.option('scrolling');
    if (pagerVisible === 'auto') {
      if (scrolling && (scrolling.mode === 'virtual' || scrolling.mode === 'infinite')) {
        pagerVisible = false;
      } else {
        pagerVisible = dataController.pageCount() > 1 || dataController.isLoaded() && !dataController.hasKnownLastPage();
      }
    }
    return pagerVisible;
  },
  getHeight: function getHeight() {
    return this.getElementHeight();
  },
  optionChanged: function optionChanged(args) {
    var name = args.name;
    var isPager = name === 'pager';
    var isPaging = name === 'paging';
    var isDataSource = name === 'dataSource';
    var isScrolling = name === 'scrolling';
    var dataController = this.getController('data');
    if (isPager || isPaging || isScrolling || isDataSource) {
      args.handled = true;
      if (dataController.skipProcessingPagingChange(args.fullName)) {
        return;
      }
      if (isPager || isPaging) {
        this._pageSizes = null;
      }
      if (!isDataSource) {
        this._pager = null;
        this._invalidate();
        if ((0, _window.hasWindow)() && isPager && this.component) {
          this.component.resize();
        }
      }
    }
  },
  dispose: function dispose() {
    this._pager = null;
  }
});
var pagerModule = {
  defaultOptions: function defaultOptions() {
    return {
      pager: {
        visible: 'auto',
        showPageSizeSelector: false,
        allowedPageSizes: 'auto',
        label: _message.default.format('dxPager-ariaLabel')
      }
    };
  },
  views: {
    pagerView: PagerView
  }
};
exports.pagerModule = pagerModule;
