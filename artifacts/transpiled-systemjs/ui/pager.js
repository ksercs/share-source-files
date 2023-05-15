!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/pager.js"], ["../core/utils/size","../core/renderer","../events/core/events_engine","../core/class","../core/utils/string","../core/component_registrator","../core/utils/common","../core/utils/iterator","../core/utils/type","../core/utils/extend","../events/click","../events/pointer","../localization/message","./widget/ui.widget","./select_box","./number_box","../events/utils/index","./shared/accessibility"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/pager.js", ["../core/utils/size", "../core/renderer", "../events/core/events_engine", "../core/class", "../core/utils/string", "../core/component_registrator", "../core/utils/common", "../core/utils/iterator", "../core/utils/type", "../core/utils/extend", "../events/click", "../events/pointer", "../localization/message", "./widget/ui.widget", "./select_box", "./number_box", "../events/utils/index", "./shared/accessibility"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _class = _interopRequireDefault($__require("../core/class"));
  var _string = $__require("../core/utils/string");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _common = $__require("../core/utils/common");
  var _iterator = $__require("../core/utils/iterator");
  var _type = $__require("../core/utils/type");
  var _extend = $__require("../core/utils/extend");
  var _click = $__require("../events/click");
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _message = _interopRequireDefault($__require("../localization/message"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _select_box = _interopRequireDefault($__require("./select_box"));
  var _number_box = _interopRequireDefault($__require("./number_box"));
  var _index = $__require("../events/utils/index");
  var _accessibility = $__require("./shared/accessibility");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var PAGES_LIMITER = 4;
  var PAGER_CLASS = 'dx-pager';
  var PAGER_PAGE_CLASS = 'dx-page';
  var PAGER_PAGE_CLASS_SELECTOR = '.' + PAGER_PAGE_CLASS;
  var PAGER_PAGES_CLASS = 'dx-pages';
  var LIGHT_MODE_CLASS = 'dx-light-mode';
  var LIGHT_PAGES_CLASS = 'dx-light-pages';
  var PAGER_PAGE_INDEX_CLASS = 'dx-page-index';
  var PAGER_PAGES_COUNT_CLASS = 'dx-pages-count';
  var PAGER_SELECTION_CLASS = 'dx-selection';
  var PAGER_PAGE_SEPARATOR_CLASS = 'dx-separator';
  var PAGER_PAGE_SIZES_CLASS = 'dx-page-sizes';
  var PAGER_PAGE_SIZE_CLASS = 'dx-page-size';
  var PAGER_PAGE_SIZE_CLASS_SELECTOR = '.' + PAGER_PAGE_SIZE_CLASS;
  var PAGER_NAVIGATE_BUTTON = 'dx-navigate-button';
  var PAGER_PREV_BUTTON_CLASS = 'dx-prev-button';
  var PAGER_NEXT_BUTTON_CLASS = 'dx-next-button';
  var PAGER_INFO_CLASS = 'dx-info';
  var PAGER_INFO_TEXT_CLASS = 'dx-info-text';
  var PAGER_BUTTON_DISABLE_CLASS = 'dx-button-disable';
  var Page = _class.default.inherit({
    ctor: function ctor(value, index) {
      var that = this;
      that.index = index;
      that._$page = (0, _renderer.default)('<div>').text(value).addClass(PAGER_PAGE_CLASS);
    },
    value: function value(_value) {
      var that = this;
      if ((0, _type.isDefined)(_value)) {
        that._$page.text(_value);
      } else {
        var text = that._$page.text();
        if ((0, _type.isNumeric)(text)) {
          return parseInt(text);
        } else {
          return text;
        }
      }
    },
    element: function element() {
      return this._$page;
    },
    select: function select(value) {
      this._$page.toggleClass(PAGER_SELECTION_CLASS, value);
    },
    render: function render(rootElement, rtlEnabled) {
      rtlEnabled ? this._$page.prependTo(rootElement) : this._$page.appendTo(rootElement);
    }
  });
  var Pager = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        visible: true,
        pagesNavigatorVisible: 'auto',
        pageIndex: 1,
        maxPagesCount: 10,
        pageCount: 10,
        totalCount: 0,
        pageSize: 5,
        showPageSizes: true,
        pageSizes: [5, 10],
        hasKnownLastPage: true,
        showNavigationButtons: false,
        showInfo: false,
        infoText: _message.default.getFormatter('dxPager-infoText'),
        pagesCountText: _message.default.getFormatter('dxPager-pagesCountText'),
        rtlEnabled: false,
        lightModeEnabled: false,
        pageIndexChanged: _common.noop,
        pageSizeChanged: _common.noop
      });
    },
    _toggleVisibility: function _toggleVisibility(value) {
      var $element = this.$element();
      if ($element) {
        $element.css('display', value ? '' : 'none');
      }
    },
    _getPages: function _getPages(currentPage, count) {
      var pages = [];
      var showMoreButton = !this.option('hasKnownLastPage');
      var firstValue;
      var i;

      ///#DEBUG
      this._testPagesCount = count;
      this._testShowMoreButton = showMoreButton;
      ///#ENDDEBUG

      if (count > 0 || showMoreButton) {
        if (count <= this.option('maxPagesCount')) {
          for (i = 1; i <= count; i++) {
            pages.push(new Page(i, i - 1));
          }
          if (showMoreButton) {
            pages.push(new Page('>', i - 1));
          }
        } else {
          pages.push(new Page(1, 0));
          firstValue = currentPage ? currentPage.value() - currentPage.index : 1;
          var pagesCount = count === firstValue + PAGES_LIMITER ? PAGES_LIMITER - 1 : PAGES_LIMITER;
          for (i = 1; i <= pagesCount; i++) {
            pages.push(new Page(firstValue + i, i));
          }
          pages.push(new Page(count, PAGES_LIMITER + 1));
          if (showMoreButton) {
            pages.push(new Page('>', PAGES_LIMITER + 1));
          }
        }
      }
      return pages;
    },
    _getPageByValue: function _getPageByValue(value) {
      var that = this;
      var page;
      var i;
      for (i = 0; i < that._pages.length; i++) {
        page = that._pages[i];
        if (page.value() === value) {
          return page;
        }
      }
    },
    _processSelectedPage: function _processSelectedPage(maxPagesCount, pageIndex, pageCount) {
      var that = this;
      var isPageIndexValid = false;
      var selectedPageIndex;
      if (that._pages) {
        (0, _iterator.each)(that._pages, function (key, page) {
          if (pageIndex === page.value()) {
            isPageIndexValid = true;
          }
        });
        if (!isPageIndexValid) {
          that.selectedPage = null;
        }
      }
      if ((0, _type.isDefined)(that.selectedPage)) {
        if (pageIndex === pageCount && pageCount > maxPagesCount && that.selectedPage.index !== PAGES_LIMITER + 1) {
          that.selectedPage.index = PAGES_LIMITER + 1;
        }
      } else {
        if (pageIndex > PAGES_LIMITER && pageIndex < pageCount) {
          selectedPageIndex = pageCount - PAGES_LIMITER < pageIndex ? PAGES_LIMITER - (pageCount - pageIndex) + 1 : 2;
          that.selectedPage = new Page(pageIndex, selectedPageIndex);
        }
      }
    },
    _selectPageByValue: function _selectPageByValue(value) {
      var that = this;
      var i;
      var page = that._getPageByValue(value);
      var pages = that._pages;
      var pagesLength = pages.length;
      var nextPage;
      var morePage;
      if (!(0, _type.isDefined)(page)) {
        return;
      }
      var prevPage = that._pages[page.index - 1];
      nextPage = that._pages[page.index + 1];
      if (nextPage && nextPage.value() === '>') {
        morePage = nextPage;
        nextPage = undefined;
        pagesLength--;
        pages.pop();
      }
      if (that.selectedPage) {
        that.selectedPage.select(false);
      }
      page.select(true);
      that.selectedPage = page;
      if (nextPage && nextPage.value() - value > 1) {
        if (page.index !== 0) {
          prevPage.value(value + 1);
          that._pages.splice(page.index, 1);
          that._pages.splice(page.index - 1, 0, page);
          that._pages[page.index].index = page.index;
          page.index = page.index - 1;
          for (i = page.index - 1; i > 0; i--) {
            that._pages[i].value(that._pages[i + 1].value() - 1);
          }
        } else {
          for (i = 0; i < pagesLength - 1; i++) {
            that._pages[i].value(i + 1);
          }
        }
      }
      if (prevPage && value - prevPage.value() > 1) {
        if (page.index !== pagesLength - 1) {
          nextPage.value(value - 1);
          that._pages.splice(page.index, 1);
          that._pages.splice(page.index + 1, 0, page);
          that._pages[page.index].index = page.index;
          page.index = page.index + 1;
          for (i = page.index + 1; i < pagesLength - 1; i++) {
            that._pages[i].value(that._pages[i - 1].value() + 1);
          }
        } else {
          for (i = 1; i <= pagesLength - 2; i++) {
            that._pages[pagesLength - 1 - i].value(that._pages[pagesLength - 1].value() - i);
          }
        }
      }
      if (morePage) {
        pages.push(morePage);
      }
    },
    _updatePagesTabIndices: function _updatePagesTabIndices() {
      var _this = this;
      var $selectedPage = this.selectedPage._$page;
      var updatePageIndices = function updatePageIndices() {
        var buttons = (0, _renderer.default)(_this.element()).find('[role=button]:not(.dx-button-disable)');
        (0, _iterator.each)(buttons, function (_, element) {
          return (0, _renderer.default)(element).attr('tabindex', 0);
        });
        _events_engine.default.off($selectedPage, 'focus', updatePageIndices);
      };
      _events_engine.default.on($selectedPage, 'focus', updatePageIndices);
    },
    _nextPage: function _nextPage(direction) {
      var pageIndex = this.option('pageIndex');
      var pageCount = this.option('pageCount');
      if ((0, _type.isDefined)(pageIndex)) {
        pageIndex = direction === 'next' ? ++pageIndex : --pageIndex;
        if (pageIndex > 0 && pageIndex <= pageCount) {
          this.option('pageIndex', pageIndex);
        }
      }
    },
    _wrapClickAction: function _wrapClickAction(action) {
      var _this2 = this;
      return function (e) {
        if (e.type === 'dxpointerup') {
          _this2._pointerUpHappened = true;
        } else if (_this2._pointerUpHappened) {
          _this2._pointerUpHappened = false;
          return;
        }
        action({
          event: e
        });
      };
    },
    _renderPages: function _renderPages(pages) {
      var that = this;
      var $separator;
      var pagesLength = pages.length;
      var clickPagesIndexAction = that._createAction(function (args) {
        var e = args.event;
        var pageNumber = (0, _renderer.default)(e.target).text();
        var pageIndex = pageNumber === '>' ? that.option('pageCount') + 1 : Number(pageNumber);

        ///#DEBUG
        that._testPageIndex = pageIndex;
        ///#ENDDEBUG

        that.option('pageIndex', pageIndex);
      });
      var page;
      if (pagesLength > 1) {
        that._pageClickHandler = this._wrapClickAction(clickPagesIndexAction);
        _events_engine.default.on(that._$pagesChooser, (0, _index.addNamespace)([_pointer.default.up, _click.name], that.Name + 'Pages'), PAGER_PAGE_CLASS_SELECTOR, that._pageClickHandler);
        (0, _accessibility.registerKeyboardAction)('pager', that, that._$pagesChooser, PAGER_PAGE_CLASS_SELECTOR, clickPagesIndexAction);
      }
      for (var i = 0; i < pagesLength; i++) {
        page = pages[i];
        page.render(that._$pagesChooser, that.option('rtlEnabled'));
        that.setAria({
          'role': 'button',
          'label': _message.default.format('dxPager-page') + page.value()
        }, page.element());
        (0, _accessibility.setTabIndex)(that, page.element());
        if (pages[i + 1] && pages[i + 1].value() - page.value() > 1) {
          $separator = (0, _renderer.default)('<div>').text('. . .').addClass(PAGER_PAGE_SEPARATOR_CLASS);
          that.option('rtlEnabled') ? $separator.prependTo(that._$pagesChooser) : $separator.appendTo(that._$pagesChooser);
        }
      }
    },
    _calculateLightPagesWidth: function _calculateLightPagesWidth($pageIndex, pageCount) {
      return Number($pageIndex.css('minWidth').replace('px', '')) + 10 * pageCount.toString().length;
    },
    _renderLightPages: function _renderLightPages() {
      var that = this;
      var pageCount = this.option('pageCount');
      var pageIndex = this.option('pageIndex');
      var clickAction = that._createAction(function () {
        that.option('pageIndex', pageCount);
      });
      var pagesCountText = this.option('pagesCountText');
      var $container = (0, _renderer.default)('<div>').addClass(LIGHT_PAGES_CLASS).appendTo(this._$pagesChooser);
      var $pageIndex = (0, _renderer.default)('<div>').addClass(PAGER_PAGE_INDEX_CLASS).appendTo($container);
      that._pageIndexEditor = that._createComponent($pageIndex, _number_box.default, {
        value: pageIndex,
        min: 1,
        max: pageCount,
        width: that._calculateLightPagesWidth($pageIndex, pageCount),
        onValueChanged: function onValueChanged(e) {
          if (e.value === null) {
            return;
          }
          that.option('pageIndex', e.value);
        }
      });
      (0, _renderer.default)('<span>').text(pagesCountText).addClass(PAGER_INFO_TEXT_CLASS + ' ' + PAGER_INFO_CLASS).appendTo($container);
      var $pageCount = (0, _renderer.default)('<span>').addClass(PAGER_PAGES_COUNT_CLASS).text(pageCount);
      _events_engine.default.on($pageCount, (0, _index.addNamespace)(_click.name, that.Name + 'PagesCount'), function (e) {
        clickAction({
          event: e
        });
      });
      (0, _accessibility.registerKeyboardAction)('pager', that, $pageCount, undefined, clickAction);
      $pageCount.appendTo($container);
      that.setAria({
        'role': 'button',
        'label': 'Navigates to the last page'
      }, $pageCount);
    },
    _renderPagesChooser: function _renderPagesChooser() {
      var that = this;
      var lightModeEnabled = that.option('lightModeEnabled');
      var pagesNavigatorVisible = that.option('pagesNavigatorVisible');
      var $element = that.$element();
      that._$pagesChooser && that._$pagesChooser.remove();
      if (!pagesNavigatorVisible) {
        return;
      }
      if (that._pages && that._pages.length === 0) {
        that.selectedPage = null;
        return;
      }
      that._$pagesChooser = (0, _renderer.default)('<div>').addClass(PAGER_PAGES_CLASS).appendTo($element);
      if (pagesNavigatorVisible === 'auto') {
        that._$pagesChooser.css('visibility', that.option('pageCount') === 1 ? 'hidden' : '');
      }
      if (!lightModeEnabled) {
        that._renderInfo();
      }
      that._renderNavigateButton('prev');
      if (lightModeEnabled) {
        that._renderLightPages();
      } else {
        that._renderPages(that._pages);
      }
      that._renderNavigateButton('next');
      that._updatePagesChooserWidth();
    },
    _renderPageSizes: function _renderPageSizes() {
      var that = this;
      var i;
      var pageSizes = that.option('pageSizes');
      var pagesSizesLength = pageSizes && pageSizes.length;
      var pageSizeValue;
      var currentPageSize = that.option('pageSize');
      var $pageSize;
      var clickPagesSizeAction = that._createAction(function (args) {
        var e = args.event;
        pageSizeValue = parseInt((0, _renderer.default)(e.target).text());

        ///#DEBUG
        that._testPageSizeIndex = pageSizeValue;
        ///#ENDDEBUG

        that.option('pageSize', pageSizeValue);
      });

      ///#DEBUG
      that._testCurrentPageSize = currentPageSize;
      ///#ENDDEBUG

      _events_engine.default.on(that._$pagesSizeChooser, (0, _index.addNamespace)(_click.name, that.Name + 'PageSize'), PAGER_PAGE_SIZE_CLASS_SELECTOR, function (e) {
        clickPagesSizeAction({
          event: e
        });
      });
      (0, _accessibility.registerKeyboardAction)('pager', that, that._$pagesSizeChooser, PAGER_PAGE_SIZE_CLASS_SELECTOR, clickPagesSizeAction);
      for (i = 0; i < pagesSizesLength; i++) {
        $pageSize = (0, _renderer.default)('<div>').text(pageSizes[i]).addClass(PAGER_PAGE_SIZE_CLASS);
        that.setAria({
          'role': 'button',
          'label': 'Display ' + pageSizes[i] + ' items on page'
        }, $pageSize);
        (0, _accessibility.setTabIndex)(that, $pageSize);
        if (currentPageSize === pageSizes[i]) {
          $pageSize.addClass(PAGER_SELECTION_CLASS);
        }
        that._$pagesSizeChooser.append($pageSize);
      }
    },
    _calculateLightPageSizesWidth: function _calculateLightPageSizesWidth(pageSizes) {
      return Number(this._$pagesSizeChooser.css('minWidth').replace('px', '')) + 10 * Math.max.apply(Math, pageSizes).toString().length;
    },
    _renderLightPageSizes: function _renderLightPageSizes() {
      var that = this;
      var pageSizes = that.option('pageSizes');
      var $editor = (0, _renderer.default)('<div>').appendTo(that._$pagesSizeChooser);
      that._pageSizeEditor = that._createComponent($editor, _select_box.default, {
        dataSource: pageSizes,
        value: that.option('pageSize'),
        onSelectionChanged: function onSelectionChanged(e) {
          ///#DEBUG
          that._testPageSizeIndex = e.selectedItem;
          ///#ENDDEBUG
          that.option('pageSize', e.selectedItem);
        },
        width: that._calculateLightPageSizesWidth(pageSizes)
      });
    },
    _renderPagesSizeChooser: function _renderPagesSizeChooser() {
      var that = this;
      var pageSizes = that.option('pageSizes');
      var showPageSizes = that.option('showPageSizes');
      var pagesSizesLength = pageSizes && pageSizes.length;
      var $element = that.$element();
      that._$pagesSizeChooser && that._$pagesSizeChooser.remove();
      if (!showPageSizes || !pagesSizesLength) {
        return;
      }
      that._$pagesSizeChooser = (0, _renderer.default)('<div>').addClass(PAGER_PAGE_SIZES_CLASS).appendTo($element);
      if (that.option('lightModeEnabled')) {
        that._renderLightPageSizes();
      } else {
        that._renderPageSizes();
      }
      that._pagesSizeChooserWidth = (0, _size.getWidth)(that._$pagesSizeChooser);
    },
    _renderInfo: function _renderInfo() {
      var infoText = this.option('infoText');
      if (this.option('showInfo') && (0, _type.isDefined)(infoText)) {
        this._$info = (0, _renderer.default)('<div>').css('display', this._isInfoHide ? 'none' : '').addClass(PAGER_INFO_CLASS).text((0, _string.format)(infoText, this.selectedPage && this.selectedPage.value(), this.option('pageCount'), this.option('totalCount'))).appendTo(this._$pagesChooser);
        if (!this._isInfoHide) {
          this._infoWidth = (0, _size.getOuterWidth)(this._$info, true);
        }
      }
    },
    _renderNavigateButton: function _renderNavigateButton(direction) {
      var that = this;
      var clickAction = that._createAction(function () {
        that._nextPage(direction);
      });
      var $button;
      if (that.option('showNavigationButtons') || that.option('lightModeEnabled')) {
        $button = (0, _renderer.default)('<div>').addClass(PAGER_NAVIGATE_BUTTON);
        _events_engine.default.on($button, (0, _index.addNamespace)([_pointer.default.up, _click.name], that.Name + 'Pages'), that._wrapClickAction(clickAction));
        (0, _accessibility.registerKeyboardAction)('pager', that, $button, undefined, clickAction);
        that.setAria({
          'role': 'button',
          'label': _message.default.format("dxPager-".concat(_message.default.format(direction === 'prev' ? 'prev' : 'next'), "Page"))
        }, $button);
        (0, _accessibility.setTabIndex)(that, $button);
        if (that.option('rtlEnabled')) {
          $button.addClass(direction === 'prev' ? PAGER_NEXT_BUTTON_CLASS : PAGER_PREV_BUTTON_CLASS);
          $button.prependTo(this._$pagesChooser);
        } else {
          $button.addClass(direction === 'prev' ? PAGER_PREV_BUTTON_CLASS : PAGER_NEXT_BUTTON_CLASS);
          $button.appendTo(this._$pagesChooser);
        }
      }
    },
    _renderContentImpl: function _renderContentImpl() {
      this.$element().toggleClass(LIGHT_MODE_CLASS, this.option('lightModeEnabled'));
      this._toggleVisibility(this.option('visible'));
      this._updatePageSizes(true);
      this._updatePages(true);
      (0, _accessibility.restoreFocus)(this);
    },
    _initMarkup: function _initMarkup() {
      var $element = this.$element();
      $element.addClass(PAGER_CLASS);
      var $pageSize = (0, _renderer.default)('<div>').addClass(PAGER_PAGE_CLASS);
      this._$pagesChooser = (0, _renderer.default)('<div>').addClass(PAGER_PAGES_CLASS).append($pageSize).appendTo($element);
    },
    _render: function _render() {
      this.option().lightModeEnabled = false;
      this.callBase();
      this._updateLightMode();
    },
    _updatePageSizes: function _updatePageSizes(forceRender) {
      var lightModeEnabled = this.option('lightModeEnabled');
      var pageSize = this.option('pageSize');
      var pageSizes = this.option('pageSizes');
      if (lightModeEnabled) {
        this._pageSizeEditor && this._pageSizeEditor.option({
          value: pageSize,
          dataSource: pageSizes,
          width: this._calculateLightPageSizesWidth(pageSizes)
        });
      }
      if (!lightModeEnabled || forceRender) {
        this._renderPagesSizeChooser();
      }
    },
    _updatePages: function _updatePages(forceRender) {
      var pageCount = this.option('pageCount');
      var pageIndex = this.option('pageIndex');
      var lightModeEnabled = this.option('lightModeEnabled');
      if (!lightModeEnabled) {
        this._processSelectedPage(this.option('maxPagesCount'), pageIndex, pageCount);
        this._pages = this._getPages(this.selectedPage, pageCount);
        this._selectPageByValue(pageIndex);
      } else {
        this._pageIndexEditor && this._pageIndexEditor.option({
          value: pageIndex,
          width: this._calculateLightPagesWidth(this._pageIndexEditor.$element(), pageCount)
        });
      }
      if (!lightModeEnabled || forceRender) {
        this._renderPagesChooser();
      }
      this._updateButtonsState(pageIndex);
    },
    _isPageIndexInvalid: function _isPageIndexInvalid(direction, pageIndex) {
      var isNextDirection = direction === 'next';
      var rtlEnabled = this.option('rtlEnabled');
      if (rtlEnabled && isNextDirection || !rtlEnabled && !isNextDirection) {
        return pageIndex <= 1;
      }
      return pageIndex >= this.option('pageCount');
    },
    _updateButtonsState: function _updateButtonsState(pageIndex) {
      var nextButton = this.$element().find('.' + PAGER_NEXT_BUTTON_CLASS);
      var prevButton = this.$element().find('.' + PAGER_PREV_BUTTON_CLASS);
      nextButton.toggleClass(PAGER_BUTTON_DISABLE_CLASS, this._isPageIndexInvalid('next', pageIndex));
      prevButton.toggleClass(PAGER_BUTTON_DISABLE_CLASS, this._isPageIndexInvalid('prev', pageIndex));
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'visible':
          this._toggleVisibility(args.value);
          break;
        case 'pageIndex':
          {
            var pageIndexChanged = this.option('pageIndexChanged');
            if (pageIndexChanged) {
              pageIndexChanged(args.value);
            }
            this._updatePages();
            break;
          }
        case 'maxPagesCount':
        case 'pageCount':
        case 'totalCount':
        case 'hasKnownLastPage':
        case 'pagesNavigatorVisible':
        case 'showNavigationButtons':
          this._updatePages();
          break;
        case 'pageSize':
          {
            var pageSizeChanged = this.option('pageSizeChanged');
            if (pageSizeChanged) {
              pageSizeChanged(args.value);
            }
            this._updatePageSizes();
            break;
          }
        case 'pageSizes':
          this._updatePageSizes();
          break;
        case 'lightModeEnabled':
          this._renderContentImpl();
          !args.value && this._updateLightMode();
          break;
        default:
          this._invalidate();
      }
    },
    _clean: function _clean() {
      if (this._$pagesChooser) {
        _events_engine.default.off(this._$pagesChooser, (0, _index.addNamespace)([_pointer.default.up, _click.name], this.Name + 'Pages'), PAGER_PAGE_CLASS_SELECTOR, this._pageClickHandler);
        (0, _accessibility.registerKeyboardAction)('pager', this, this._$pagesChooser, PAGER_PAGE_CLASS_SELECTOR, this._pageKeyDownHandler);
      }
      this.callBase();
    },
    _getMinPagerWidth: function _getMinPagerWidth() {
      var pagesChooserWidth = (0, _type.isDefined)(this._pagesChooserWidth) ? this._pagesChooserWidth : 0;
      var pagesSizeChooserWidth = (0, _type.isDefined)(this._pagesSizeChooserWidth) ? this._pagesSizeChooserWidth : 0;
      return pagesChooserWidth + pagesSizeChooserWidth;
    },
    _updatePagesChooserWidth: (0, _common.deferUpdater)(function () {
      var lastPageWidth = this._pages && this._pages.length > 0 ? (0, _size.getWidth)(this._pages[this._pages.length - 1]._$page) : 0;
      this._pagesChooserWidth = (0, _size.getWidth)(this._$pagesChooser) + lastPageWidth;
    }),
    _updateLightMode: (0, _common.deferUpdater)(function () {
      var that = this;
      var width = (0, _size.getWidth)(this.$element());
      var infoWidth = (0, _type.isDefined)(this._infoWidth) ? this._infoWidth : 0;
      (0, _common.deferRender)(function () {
        if (that._isInfoHide && width > that._getMinPagerWidth() + infoWidth) {
          that._$info.css('display', '');
          that._updatePagesChooserWidth();
          that._isInfoHide = false;
        }
        if (!that._isInfoHide && width > that._getMinPagerWidth() - infoWidth && width < that._getMinPagerWidth()) {
          that._$info.css('display', 'none');
          that._updatePagesChooserWidth();
          that._isInfoHide = true;
        }
        (0, _common.deferUpdate)(function () {
          (0, _common.deferRender)(function () {
            if (that.option('lightModeEnabled') && width > that._previousWidth) {
              that.option('lightModeEnabled', false);
            } else {
              if (width < that._getMinPagerWidth()) {
                that.option('lightModeEnabled', true);
              }
            }
            that._previousWidth = width;
          });
        });
      });
    }),
    _dimensionChanged: function _dimensionChanged() {
      this._updateLightMode();
    },
    getHeight: function getHeight() {
      return this.option('visible') ? (0, _size.getOuterHeight)(this.$element()) : 0;
    }
  });
  var _default = Pager;
  exports.default = _default;
  (0, _component_registrator.default)('dxPager', Pager);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../events/core/events_engine","../core/class","../core/utils/string","../core/component_registrator","../core/utils/common","../core/utils/iterator","../core/utils/type","../core/utils/extend","../events/click","../events/pointer","../localization/message","./widget/ui.widget","./select_box","./number_box","../events/utils/index","./shared/accessibility"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/class"), require("../core/utils/string"), require("../core/component_registrator"), require("../core/utils/common"), require("../core/utils/iterator"), require("../core/utils/type"), require("../core/utils/extend"), require("../events/click"), require("../events/pointer"), require("../localization/message"), require("./widget/ui.widget"), require("./select_box"), require("./number_box"), require("../events/utils/index"), require("./shared/accessibility"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pager.js.map