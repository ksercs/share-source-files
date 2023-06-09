/**
* DevExtreme (bundles/__internal/grids/grid_core/pager/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagerModule = void 0;
var pager_1 = __importDefault(require("../../../../ui/pager"));
var type_1 = require("../../../../core/utils/type");
var window_1 = require("../../../../core/utils/window");
var message_1 = __importDefault(require("../../../../localization/message"));
var modules_1 = __importDefault(require("../modules"));
var PAGER_CLASS = 'pager';
var MAX_PAGES_COUNT = 10;
var getPageIndex = function (dataController) {
    // eslint-disable-next-line radix
    return 1 + (parseInt(dataController.pageIndex()) || 0);
};
var PagerView = modules_1.default.View.inherit({
    init: function () {
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
                        hasKnownLastPage: dataController.hasKnownLastPage(),
                    });
                }
                else {
                    _this.render();
                }
            }
            else if (!e || e.changeType !== 'update' && e.changeType !== 'updateSelection' && e.changeType !== 'updateFocusedRow') {
                _this._pager = null;
                _this.render();
            }
        });
    },
    _renderCore: function () {
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
            pageIndexChanged: function (pageIndex) {
                if (dataController.pageIndex() !== pageIndex - 1) {
                    dataController.pageIndex(pageIndex - 1);
                }
            },
            pageSizeChanged: function (pageSize) {
                dataController.pageSize(pageSize);
            },
            onKeyDown: function (e) { return keyboardController && keyboardController.executeAction('onKeyDown', e); },
            useLegacyKeyboardNavigation: this.option('useLegacyKeyboardNavigation'),
            useKeyboard: this.option('keyboardNavigation.enabled'),
        };
        if (type_1.isDefined(pagerOptions.infoText)) {
            options.infoText = pagerOptions.infoText;
        }
        if (this._pager) {
            this._pager.repaint();
            return;
        }
        if (window_1.hasWindow()) {
            this._pager = that._createComponent($element, pager_1.default, options);
        }
        else {
            $element
                .addClass('dx-pager')
                .html('<div class="dx-pages"><div class="dx-page"></div></div>');
        }
    },
    getPager: function () {
        return this._pager;
    },
    getPageSizes: function () {
        var that = this;
        var dataController = that.getController('data');
        var pagerOptions = that.option('pager');
        var allowedPageSizes = pagerOptions && pagerOptions.allowedPageSizes;
        var pageSize = dataController.pageSize();
        if (!type_1.isDefined(that._pageSizes) || !that._pageSizes.includes(pageSize)) {
            that._pageSizes = [];
            if (pagerOptions) {
                if (Array.isArray(allowedPageSizes)) {
                    that._pageSizes = allowedPageSizes;
                }
                else if (allowedPageSizes && pageSize > 1) {
                    that._pageSizes = [Math.floor(pageSize / 2), pageSize, pageSize * 2];
                }
            }
        }
        return that._pageSizes;
    },
    isVisible: function () {
        var dataController = this.getController('data');
        var pagerOptions = this.option('pager');
        var pagerVisible = pagerOptions && pagerOptions.visible;
        var scrolling = this.option('scrolling');
        if (pagerVisible === 'auto') {
            if (scrolling && (scrolling.mode === 'virtual' || scrolling.mode === 'infinite')) {
                pagerVisible = false;
            }
            else {
                pagerVisible = dataController.pageCount() > 1 || (dataController.isLoaded() && !dataController.hasKnownLastPage());
            }
        }
        return pagerVisible;
    },
    getHeight: function () {
        return this.getElementHeight();
    },
    optionChanged: function (args) {
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
                if (window_1.hasWindow() && isPager && this.component) {
                    this.component.resize();
                }
            }
        }
    },
    dispose: function () {
        this._pager = null;
    },
});
exports.pagerModule = {
    defaultOptions: function () {
        return {
            pager: {
                visible: 'auto',
                showPageSizeSelector: false,
                allowedPageSizes: 'auto',
                label: message_1.default.format('dxPager-ariaLabel'),
            },
        };
    },
    views: {
        pagerView: PagerView,
    },
};
