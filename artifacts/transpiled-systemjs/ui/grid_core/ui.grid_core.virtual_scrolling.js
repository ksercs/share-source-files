!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.virtual_scrolling.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/window","./ui.grid_core.virtual_scrolling_core","./ui.grid_core.utils","../../core/utils/iterator","../../core/utils/deferred","../load_indicator","../../core/utils/browser","../../core/utils/position","../../core/utils/dom","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.virtual_scrolling.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/window", "./ui.grid_core.virtual_scrolling_core", "./ui.grid_core.utils", "../../core/utils/iterator", "../../core/utils/deferred", "../load_indicator", "../../core/utils/browser", "../../core/utils/position", "../../core/utils/dom", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.virtualScrollingModule = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _uiGrid_core = $__require("./ui.grid_core.virtual_scrolling_core");
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _iterator = $__require("../../core/utils/iterator");
  var _deferred = $__require("../../core/utils/deferred");
  var _load_indicator = _interopRequireDefault($__require("../load_indicator"));
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _position = $__require("../../core/utils/position");
  var _dom = $__require("../../core/utils/dom");
  var _type = $__require("../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var BOTTOM_LOAD_PANEL_CLASS = 'bottom-load-panel';
  var TABLE_CONTENT_CLASS = 'table-content';
  var GROUP_SPACE_CLASS = 'group-space';
  var CONTENT_CLASS = 'content';
  var FREESPACE_CLASS = 'dx-freespace-row';
  var COLUMN_LINES_CLASS = 'dx-column-lines';
  var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
  var ROW_INSERTED = 'dx-row-inserted';
  var SCROLLING_MODE_INFINITE = 'infinite';
  var SCROLLING_MODE_VIRTUAL = 'virtual';
  var LOAD_TIMEOUT = 300;
  var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
  var VISIBLE_PAGE_INDEX = 'paging.pageIndex';
  var isVirtualMode = function isVirtualMode(that) {
    return that.option('scrolling.mode') === SCROLLING_MODE_VIRTUAL;
  };
  var isAppendMode = function isAppendMode(that) {
    return that.option('scrolling.mode') === SCROLLING_MODE_INFINITE;
  };
  var isVirtualPaging = function isVirtualPaging(that) {
    return isVirtualMode(that) || isAppendMode(that);
  };
  var _correctCount = function correctCount(items, count, fromEnd, isItemCountableFunc) {
    for (var i = 0; i < count + 1; i++) {
      var item = items[fromEnd ? items.length - 1 - i : i];
      if (item && !isItemCountableFunc(item, i === count, fromEnd)) {
        count++;
      }
    }
    return count;
  };
  var isItemCountableByDataSource = function isItemCountableByDataSource(item, dataSource) {
    return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && dataSource.isGroupItemCountable(item.data);
  };
  var updateItemIndices = function updateItemIndices(items) {
    items.forEach(function (item, index) {
      item.rowIndex = index;
    });
    return items;
  };
  var VirtualScrollingDataSourceAdapterExtender = function () {
    var _updateLoading = function updateLoading(that) {
      var beginPageIndex = that._virtualScrollController.beginPageIndex(-1);
      if (isVirtualMode(that)) {
        if (beginPageIndex < 0 || that.viewportSize() >= 0 && that.getViewportItemIndex() >= 0 && (beginPageIndex * that.pageSize() > that.getViewportItemIndex() || beginPageIndex * that.pageSize() + that.itemsCount() < that.getViewportItemIndex() + that.viewportSize()) && that._dataSource.isLoading()) {
          if (!that._isLoading) {
            that._isLoading = true;
            that.loadingChanged.fire(true);
          }
        } else {
          if (that._isLoading) {
            that._isLoading = false;
            that.loadingChanged.fire(false);
          }
        }
      }
    };
    var result = {
      init: function init() {
        this.callBase.apply(this, arguments);
        this._items = [];
        this._totalCount = -1;
        this._isLoaded = true;
        this._loadPageCount = 1;
        this._virtualScrollController = new _uiGrid_core.VirtualScrollController(this.component, this._getVirtualScrollDataOptions());
      },
      _getVirtualScrollDataOptions: function _getVirtualScrollDataOptions() {
        var that = this;
        return {
          pageSize: function pageSize() {
            return that.pageSize();
          },
          totalItemsCount: function totalItemsCount() {
            return that.totalItemsCount();
          },
          hasKnownLastPage: function hasKnownLastPage() {
            return that.hasKnownLastPage();
          },
          pageIndex: function pageIndex(index) {
            return that._dataSource.pageIndex(index);
          },
          isLoading: function isLoading() {
            return that._dataSource.isLoading() && !that.isCustomLoading();
          },
          pageCount: function pageCount() {
            return that.pageCount();
          },
          load: function load() {
            return that._dataSource.load();
          },
          updateLoading: function updateLoading() {
            _updateLoading(that);
          },
          itemsCount: function itemsCount() {
            return that.itemsCount(true);
          },
          items: function items() {
            return that._dataSource.items();
          },
          viewportItems: function viewportItems(items) {
            if (items) {
              that._items = items;
            }
            return that._items;
          },
          onChanged: function onChanged(e) {
            that.changed.fire(e);
          },
          changingDuration: function changingDuration(e) {
            if (that.isLoading()) {
              return LOAD_TIMEOUT;
            }
            return that._renderTime || 0;
          }
        };
      },
      _handleLoadingChanged: function _handleLoadingChanged(isLoading) {
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          this.callBase.apply(this, arguments);
          return;
        }
        if (!isVirtualMode(this) || this._isLoadingAll) {
          this._isLoading = isLoading;
          this.callBase.apply(this, arguments);
        }
        if (isLoading) {
          this._startLoadTime = new Date();
        } else {
          this._startLoadTime = undefined;
        }
      },
      _handleLoadError: function _handleLoadError() {
        if (this.option(LEGACY_SCROLLING_MODE) !== false) {
          this._isLoading = false;
          this.loadingChanged.fire(false);
        }
        this.callBase.apply(this, arguments);
      },
      _handleDataChanged: function _handleDataChanged(e) {
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          this._items = this._dataSource.items().slice();
          this._totalCount = this._dataSourceTotalCount(true);
          this.callBase.apply(this, arguments);
          return;
        }
        var callBase = this.callBase.bind(this);
        this._virtualScrollController.handleDataChanged(callBase, e);
      },
      _customizeRemoteOperations: function _customizeRemoteOperations(options, operationTypes) {
        var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
        var renderAsync = this.option('scrolling.renderAsync');
        if (!(0, _type.isDefined)(renderAsync)) {
          renderAsync = this._renderTime >= this.option('scrolling.renderingThreshold');
        }
        if ((isVirtualMode(this) || isAppendMode(this) && newMode) && !operationTypes.reload && (operationTypes.skip || newMode) && !renderAsync) {
          options.delay = undefined;
        }
        this.callBase.apply(this, arguments);
      },
      items: function items() {
        return this._items;
      },
      _dataSourceTotalCount: function _dataSourceTotalCount(isBase) {
        return this.option(LEGACY_SCROLLING_MODE) === false && isVirtualMode(this) && !isBase ? this._totalCount : this.callBase();
      },
      itemsCount: function itemsCount(isBase) {
        if (isBase || this.option(LEGACY_SCROLLING_MODE) === false) {
          return this.callBase();
        }
        return this._virtualScrollController.itemsCount();
      },
      load: function load(loadOptions) {
        if (this.option(LEGACY_SCROLLING_MODE) === false || loadOptions) {
          return this.callBase(loadOptions);
        }
        return this._virtualScrollController.load();
      },
      isLoading: function isLoading() {
        return this.option(LEGACY_SCROLLING_MODE) === false ? this._dataSource.isLoading() : this._isLoading;
      },
      isLoaded: function isLoaded() {
        return this._dataSource.isLoaded() && this._isLoaded;
      },
      resetPagesCache: function resetPagesCache(isLiveUpdate) {
        if (!isLiveUpdate) {
          this._virtualScrollController.reset(true);
        }
        this.callBase.apply(this, arguments);
      },
      _changeRowExpandCore: function _changeRowExpandCore() {
        var result = this.callBase.apply(this, arguments);
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          return result;
        }
        this.resetPagesCache();
        _updateLoading(this);
        return result;
      },
      reload: function reload() {
        this._dataSource.pageIndex(this.pageIndex());
        var virtualScrollController = this._virtualScrollController;
        if (this.option(LEGACY_SCROLLING_MODE) !== false && virtualScrollController) {
          var d = new _deferred.Deferred();
          this.callBase.apply(this, arguments).done(function (r) {
            var delayDeferred = virtualScrollController.getDelayDeferred();
            if (delayDeferred) {
              delayDeferred.done(d.resolve).fail(d.reject);
            } else {
              d.resolve(r);
            }
          }).fail(d.reject);
          return d;
        } else {
          return this.callBase.apply(this, arguments);
        }
      },
      refresh: function refresh(options, operationTypes) {
        if (this.option(LEGACY_SCROLLING_MODE) !== false) {
          var storeLoadOptions = options.storeLoadOptions;
          var dataSource = this._dataSource;
          if (operationTypes.reload) {
            this._virtualScrollController.reset();
            dataSource.items().length = 0;
            this._isLoaded = false;
            _updateLoading(this);
            this._isLoaded = true;
            if (isAppendMode(this)) {
              this.pageIndex(0);
              dataSource.pageIndex(0);
              storeLoadOptions.pageIndex = 0;
              options.pageIndex = 0;
              storeLoadOptions.skip = 0;
            } else {
              dataSource.pageIndex(this.pageIndex());
              if (dataSource.paginate()) {
                options.pageIndex = this.pageIndex();
                storeLoadOptions.skip = this.pageIndex() * this.pageSize();
              }
            }
          } else if (isAppendMode(this) && storeLoadOptions.skip && this._totalCountCorrection < 0) {
            storeLoadOptions.skip += this._totalCountCorrection;
          }
        }
        return this.callBase.apply(this, arguments);
      },
      dispose: function dispose() {
        this._virtualScrollController.dispose();
        this.callBase.apply(this, arguments);
      },
      loadPageCount: function loadPageCount(count) {
        if (!(0, _type.isDefined)(count)) {
          return this._loadPageCount;
        }
        this._loadPageCount = count;
      },
      _handleDataLoading: function _handleDataLoading(options) {
        var loadPageCount = this.loadPageCount();
        var pageSize = this.pageSize();
        var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
        var storeLoadOptions = options.storeLoadOptions;
        var takeIsDefined = (0, _type.isDefined)(storeLoadOptions.take);
        options.loadPageCount = loadPageCount;
        if (!options.isCustomLoading && newMode && takeIsDefined && loadPageCount > 1 && pageSize > 0) {
          storeLoadOptions.take = loadPageCount * pageSize;
        }
        this.callBase.apply(this, arguments);
      },
      _loadPageSize: function _loadPageSize() {
        return this.callBase.apply(this, arguments) * this.loadPageCount();
      }
    };
    ['beginPageIndex', 'endPageIndex', 'pageIndex'].forEach(function (name) {
      result[name] = function () {
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          var dataSource = this._dataSource;
          return dataSource.pageIndex.apply(dataSource, arguments);
        }
        var virtualScrollController = this._virtualScrollController;
        return virtualScrollController[name].apply(virtualScrollController, arguments);
      };
    });
    ['virtualItemsCount', 'getContentOffset', 'getVirtualContentSize', 'setContentItemSizes', 'setViewportPosition', 'getViewportItemIndex', 'setViewportItemIndex', 'getItemIndexByPosition', 'viewportSize', 'viewportItemSize', 'getItemSize', 'getItemSizes', 'loadIfNeed'].forEach(function (name) {
      result[name] = function () {
        var virtualScrollController = this._virtualScrollController;
        return virtualScrollController[name].apply(virtualScrollController, arguments);
      };
    });
    return result;
  }();
  var VirtualScrollingRowsViewExtender = function () {
    var removeEmptyRows = function removeEmptyRows($emptyRows, className) {
      var getRowParent = function getRowParent(row) {
        return (0, _renderer.default)(row).parent('.' + className).get(0);
      };
      var tBodies = $emptyRows.toArray().map(getRowParent).filter(function (row) {
        return row;
      });
      if (tBodies.length) {
        $emptyRows = (0, _renderer.default)(tBodies);
      }
      var rowCount = className === FREESPACE_CLASS ? $emptyRows.length - 1 : $emptyRows.length;
      for (var i = 0; i < rowCount; i++) {
        $emptyRows.eq(i).remove();
      }
    };
    return {
      init: function init() {
        var _this = this,
            _dataController$state;
        var dataController = this.getController('data');
        this.callBase();
        dataController.pageChanged.add(function (pageIndex) {
          var scrollTop = _this._scrollTop;
          _this.scrollToPage(pageIndex !== null && pageIndex !== void 0 ? pageIndex : dataController.pageIndex());
          if (_this.option(LEGACY_SCROLLING_MODE) === false && _this._scrollTop === scrollTop) {
            dataController.updateViewport();
          }
        });
        dataController.dataSourceChanged.add(function () {
          !_this._scrollTop && _this._scrollToCurrentPageOnResize();
        });
        (_dataController$state = dataController.stateLoaded) === null || _dataController$state === void 0 ? void 0 : _dataController$state.add(function () {
          _this._scrollToCurrentPageOnResize();
        });
        this._scrollToCurrentPageOnResize();
      },
      _scrollToCurrentPageOnResize: function _scrollToCurrentPageOnResize() {
        var _this2 = this;
        var dataController = this.getController('data');
        if (dataController.pageIndex() > 0) {
          var resizeHandler = function resizeHandler() {
            _this2.resizeCompleted.remove(resizeHandler);
            _this2.scrollToPage(dataController.pageIndex());
          };
          this.resizeCompleted.add(resizeHandler);
        }
      },
      scrollToPage: function scrollToPage(pageIndex) {
        var that = this;
        var dataController = that._dataController;
        var pageSize = dataController ? dataController.pageSize() : 0;
        var scrollPosition;
        if (isVirtualMode(that) || isAppendMode(that)) {
          var itemSize = dataController.getItemSize();
          var itemSizes = dataController.getItemSizes();
          var itemIndex = pageIndex * pageSize;
          scrollPosition = itemIndex * itemSize;
          for (var index in itemSizes) {
            if (index < itemIndex) {
              scrollPosition += itemSizes[index] - itemSize;
            }
          }
        } else {
          scrollPosition = 0;
        }
        that.scrollTo({
          y: scrollPosition,
          x: that._scrollLeft
        });
      },
      renderDelayedTemplates: function renderDelayedTemplates(e) {
        var _this3 = this;
        this.waitAsyncTemplates().done(function () {
          _this3._updateContentPosition(true);
        });
        this.callBase.apply(this, arguments);
      },
      _renderCore: function _renderCore(e) {
        var startRenderTime = new Date();
        var deferred = this.callBase.apply(this, arguments);
        var dataSource = this._dataController._dataSource;
        if (dataSource && e) {
          var itemCount = e.items ? e.items.length : 20;
          var viewportSize = this._dataController.viewportSize() || 20;
          if (_uiGrid_core2.default.isVirtualRowRendering(this) && itemCount > 0 && this.option(LEGACY_SCROLLING_MODE) !== false) {
            dataSource._renderTime = (new Date() - startRenderTime) * viewportSize / itemCount;
          } else {
            dataSource._renderTime = new Date() - startRenderTime;
          }
        }
        return deferred;
      },
      _getRowElements: function _getRowElements(tableElement) {
        var $rows = this.callBase(tableElement);
        return $rows && $rows.not('.' + VIRTUAL_ROW_CLASS);
      },
      _removeRowsElements: function _removeRowsElements(contentTable, removeCount, changeType) {
        var rowElements = this._getRowElements(contentTable).toArray();
        if (changeType === 'append') {
          rowElements = rowElements.slice(0, removeCount);
        } else {
          rowElements = rowElements.slice(-removeCount);
        }
        var errorHandlingController = this.getController('errorHandling');
        rowElements.map(function (rowElement) {
          var $rowElement = (0, _renderer.default)(rowElement);
          errorHandlingController && errorHandlingController.removeErrorRow($rowElement.next());
          $rowElement.remove();
        });
      },
      _updateContent: function _updateContent(tableElement, change) {
        var _this4 = this;
        var $freeSpaceRowElements;
        var contentElement = this._findContentElement();
        var changeType = change && change.changeType;
        var d = (0, _deferred.Deferred)();
        var contentTable = contentElement.children().first();
        if (changeType === 'append' || changeType === 'prepend') {
          this.waitAsyncTemplates().done(function () {
            var $tBodies = _this4._getBodies(tableElement);
            if ($tBodies.length === 1) {
              _this4._getBodies(contentTable)[changeType === 'append' ? 'append' : 'prepend']($tBodies.children());
            } else {
              $tBodies[changeType === 'append' ? 'appendTo' : 'prependTo'](contentTable);
            }
            tableElement.remove();
            $freeSpaceRowElements = _this4._getFreeSpaceRowElements(contentTable);
            removeEmptyRows($freeSpaceRowElements, FREESPACE_CLASS);
            if (change.removeCount) {
              _this4._removeRowsElements(contentTable, change.removeCount, changeType);
            }
            _this4._restoreErrorRow(contentTable);
            d.resolve();
          }).fail(d.reject);
        } else {
          this.callBase.apply(this, arguments).done(function () {
            if (changeType === 'update') {
              _this4._restoreErrorRow(contentTable);
            }
            d.resolve();
          }).fail(d.reject);
        }
        return d.promise().done(function () {
          _this4._updateBottomLoading();
        });
      },
      _addVirtualRow: function _addVirtualRow($table, isFixed, location, position) {
        if (!position) return;
        var $virtualRow = this._createEmptyRow(VIRTUAL_ROW_CLASS, isFixed, position);
        $virtualRow = this._wrapRowIfNeed($table, $virtualRow);
        this._appendEmptyRow($table, $virtualRow, location);
      },
      _updateContentItemSizes: function _updateContentItemSizes() {
        var rowHeights = this._getRowHeights();
        var correctedRowHeights = this._correctRowHeights(rowHeights);
        this._dataController.setContentItemSizes(correctedRowHeights);
      },
      _updateViewportSize: function _updateViewportSize(viewportHeight, scrollTop) {
        if (!(0, _type.isDefined)(viewportHeight)) {
          viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
        }
        this._dataController.viewportHeight(viewportHeight, scrollTop);
      },
      _getRowHeights: function _getRowHeights() {
        var _this$getController, _this$getController$i;
        var isPopupEditMode = (_this$getController = this.getController('editing')) === null || _this$getController === void 0 ? void 0 : (_this$getController$i = _this$getController.isPopupEditMode) === null || _this$getController$i === void 0 ? void 0 : _this$getController$i.call(_this$getController);
        var rowElements = this._getRowElements(this._tableElement).toArray();
        if (isPopupEditMode) {
          rowElements = rowElements.filter(function (row) {
            return !(0, _renderer.default)(row).hasClass(ROW_INSERTED);
          });
        }
        return rowElements.map(function (row) {
          return (0, _position.getBoundingRect)(row).height;
        });
      },
      _correctRowHeights: function _correctRowHeights(rowHeights) {
        var dataController = this._dataController;
        var dataSource = dataController._dataSource;
        var correctedRowHeights = [];
        var visibleRows = dataController.getVisibleRows();
        var itemSize = 0;
        var firstCountableItem = true;
        var lastLoadIndex = -1;
        for (var i = 0; i < rowHeights.length; i++) {
          var currentItem = visibleRows[i];
          if (!(0, _type.isDefined)(currentItem)) {
            continue;
          }
          if (this.option(LEGACY_SCROLLING_MODE) === false) {
            if (lastLoadIndex >= 0 && lastLoadIndex !== currentItem.loadIndex) {
              correctedRowHeights.push(itemSize);
              itemSize = 0;
            }
            lastLoadIndex = currentItem.loadIndex;
          } else {
            if (isItemCountableByDataSource(currentItem, dataSource)) {
              if (firstCountableItem) {
                firstCountableItem = false;
              } else {
                correctedRowHeights.push(itemSize);
                itemSize = 0;
              }
            }
          }
          itemSize += rowHeights[i];
        }
        itemSize > 0 && correctedRowHeights.push(itemSize);
        return correctedRowHeights;
      },
      _updateContentPosition: function _updateContentPosition(isRender) {
        var _this5 = this;
        var dataController = this._dataController;
        var rowHeight = this._rowHeight || 20;
        dataController.viewportItemSize(rowHeight);
        if (isVirtualMode(this) || _uiGrid_core2.default.isVirtualRowRendering(this)) {
          if (!isRender) {
            this._updateContentItemSizes();
          }
          var top = dataController.getContentOffset('begin');
          var bottom = dataController.getContentOffset('end');
          var $tables = this.getTableElements();
          var $virtualRows = $tables.children('tbody').children('.' + VIRTUAL_ROW_CLASS);
          removeEmptyRows($virtualRows, VIRTUAL_ROW_CLASS);
          $tables.each(function (index, element) {
            var isFixed = index > 0;
            var prevFixed = _this5._isFixedTableRendering;
            _this5._isFixedTableRendering = isFixed;
            _this5._addVirtualRow((0, _renderer.default)(element), isFixed, 'top', top);
            _this5._addVirtualRow((0, _renderer.default)(element), isFixed, 'bottom', bottom);
            _this5._isFixedTableRendering = prevFixed;
          });
        }
      },
      _isTableLinesDisplaysCorrect: function _isTableLinesDisplaysCorrect(table) {
        var hasColumnLines = table.find('.' + COLUMN_LINES_CLASS).length > 0;
        return hasColumnLines === this.option('showColumnLines');
      },
      _isColumnElementsEqual: function _isColumnElementsEqual($columns, $virtualColumns) {
        var result = $columns.length === $virtualColumns.length;
        if (result) {
          (0, _iterator.each)($columns, function (index, element) {
            if (element.style.width !== $virtualColumns[index].style.width) {
              result = false;
              return result;
            }
          });
        }
        return result;
      },
      _getCellClasses: function _getCellClasses(column) {
        var classes = [];
        var cssClass = column.cssClass;
        var isExpandColumn = column.command === 'expand';
        cssClass && classes.push(cssClass);
        isExpandColumn && classes.push(this.addWidgetPrefix(GROUP_SPACE_CLASS));
        return classes;
      },
      _findBottomLoadPanel: function _findBottomLoadPanel($contentElement) {
        var $element = $contentElement || this.element();
        var $bottomLoadPanel = $element && $element.find('.' + this.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS));
        if ($bottomLoadPanel && $bottomLoadPanel.length) {
          return $bottomLoadPanel;
        }
      },
      _updateBottomLoading: function _updateBottomLoading() {
        var that = this;
        var virtualMode = isVirtualMode(this);
        var appendMode = isAppendMode(this);
        var showBottomLoading = !that._dataController.hasKnownLastPage() && that._dataController.isLoaded() && (virtualMode || appendMode);
        var $contentElement = that._findContentElement();
        var bottomLoadPanelElement = that._findBottomLoadPanel($contentElement);
        if (showBottomLoading) {
          if (!bottomLoadPanelElement) {
            (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(BOTTOM_LOAD_PANEL_CLASS)).append(that._createComponent((0, _renderer.default)('<div>'), _load_indicator.default).$element()).appendTo($contentElement);
          }
        } else if (bottomLoadPanelElement) {
          bottomLoadPanelElement.remove();
        }
      },
      _handleScroll: function _handleScroll(e) {
        var legacyScrollingMode = this.option(LEGACY_SCROLLING_MODE) === true;
        var zeroTopPosition = e.scrollOffset.top === 0;
        var isScrollTopChanged = this._scrollTop !== e.scrollOffset.top;
        var hasScrolled = isScrollTopChanged || e.forceUpdateScrollPosition;
        var isValidScrollTarget = this._hasHeight || !legacyScrollingMode && zeroTopPosition;
        if (hasScrolled && isValidScrollTarget && this._rowHeight) {
          this._scrollTop = e.scrollOffset.top;
          var isVirtualRowRendering = isVirtualMode(this) || this.option('scrolling.rowRenderingMode') !== 'standard';
          if (isVirtualRowRendering && this.option(LEGACY_SCROLLING_MODE) === false) {
            this._updateContentItemSizes();
            this._updateViewportSize(null, this._scrollTop);
          }
          this._dataController.setViewportPosition(e.scrollOffset.top);
        }
        this.callBase.apply(this, arguments);
      },
      _needUpdateRowHeight: function _needUpdateRowHeight(itemsCount) {
        return this.callBase.apply(this, arguments) || itemsCount > 0 && isAppendMode(this) && !_uiGrid_core2.default.isVirtualRowRendering(this);
      },
      _updateRowHeight: function _updateRowHeight() {
        this.callBase.apply(this, arguments);
        if (this._rowHeight) {
          this._updateContentPosition();
          var viewportHeight = this._hasHeight ? (0, _size.getOuterHeight)(this.element()) : (0, _size.getOuterHeight)((0, _window.getWindow)());
          var dataController = this._dataController;
          if (this.option(LEGACY_SCROLLING_MODE) === false) {
            this._updateViewportSize(viewportHeight);
            dataController.updateViewport();
          } else {
            dataController.viewportSize(Math.ceil(viewportHeight / this._rowHeight));
          }
        }
      },
      updateFreeSpaceRowHeight: function updateFreeSpaceRowHeight() {
        var result = this.callBase.apply(this, arguments);
        if (result) {
          this._updateContentPosition();
        }
        return result;
      },
      setLoading: function setLoading(isLoading, messageText) {
        var dataController = this._dataController;
        var hasBottomLoadPanel = dataController.pageIndex() > 0 && dataController.isLoaded() && !!this._findBottomLoadPanel();
        if (this.option(LEGACY_SCROLLING_MODE) === false && isLoading && dataController.isViewportChanging()) {
          return;
        }
        if (hasBottomLoadPanel) {
          isLoading = false;
        }
        this.callBase.call(this, isLoading, messageText);
      },
      _resizeCore: function _resizeCore() {
        var that = this;
        var $element = that.element();
        that.callBase();
        if (that.component.$element() && !that._windowScroll && (0, _dom.isElementInDom)($element)) {
          that._windowScroll = (0, _uiGrid_core.subscribeToExternalScrollers)($element, function (scrollPos) {
            if (!that._hasHeight && that._rowHeight) {
              that._dataController.setViewportPosition(scrollPos);
            }
          }, that.component.$element());
          that.on('disposing', function () {
            that._windowScroll.dispose();
          });
        }
        if (this.option(LEGACY_SCROLLING_MODE) !== false) {
          that.loadIfNeed();
        }
      },
      loadIfNeed: function loadIfNeed() {
        var _dataController$loadI;
        var dataController = this._dataController;
        dataController === null || dataController === void 0 ? void 0 : (_dataController$loadI = dataController.loadIfNeed) === null || _dataController$loadI === void 0 ? void 0 : _dataController$loadI.call(dataController);
      },
      setColumnWidths: function setColumnWidths(widths) {
        var scrollable = this.getScrollable();
        var $content;
        this.callBase.apply(this, arguments);
        if (this.option('scrolling.mode') === 'virtual') {
          $content = scrollable ? (0, _renderer.default)(scrollable.content()) : this.element();
          this.callBase(widths, $content.children('.' + this.addWidgetPrefix(CONTENT_CLASS)).children(':not(.' + this.addWidgetPrefix(TABLE_CONTENT_CLASS) + ')'));
        }
      },
      _restoreErrorRow: function _restoreErrorRow() {
        if (this.option(LEGACY_SCROLLING_MODE) === false) {
          var errorHandling = this.getController('errorHandling');
          errorHandling === null || errorHandling === void 0 ? void 0 : errorHandling.removeErrorRow();
        }
        this.callBase.apply(this, arguments);
      },
      dispose: function dispose() {
        clearTimeout(this._scrollTimeoutID);
        this.callBase();
      }
    };
  }();
  var virtualScrollingModule = {
    defaultOptions: function defaultOptions() {
      return {
        scrolling: {
          timeout: 300,
          updateTimeout: 300,
          minTimeout: 0,
          renderingThreshold: 100,
          removeInvisiblePages: true,
          rowPageSize: 5,
          prerenderedRowChunkSize: 1,
          mode: 'standard',
          preloadEnabled: false,
          rowRenderingMode: 'standard',
          loadTwoPagesOnStart: false,
          legacyMode: false,
          prerenderedRowCount: 1
        }
      };
    },
    extenders: {
      dataSourceAdapter: VirtualScrollingDataSourceAdapterExtender,
      controllers: {
        data: function () {
          var members = {
            _refreshDataSource: function _refreshDataSource() {
              var baseResult = this.callBase.apply(this, arguments) || new _deferred.Deferred().resolve().promise();
              baseResult.done(this.initVirtualRows.bind(this));
              return baseResult;
            },
            _loadDataSource: function _loadDataSource() {
              if (this._rowsScrollController && isVirtualPaging(this)) {
                var _this$_dataSource;
                var _ref = (0, _type.isDefined)(this._loadViewportParams) ? this.getLoadPageParams() : {},
                    loadPageCount = _ref.loadPageCount;
                loadPageCount >= 1 && ((_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.loadPageCount(loadPageCount));
              }
              return this.callBase.apply(this, arguments);
            },
            getRowPageSize: function getRowPageSize() {
              var rowPageSize = this.option('scrolling.rowPageSize');
              var pageSize = this.pageSize();
              return pageSize && pageSize < rowPageSize ? pageSize : rowPageSize;
            },
            reload: function reload() {
              var _this6 = this;
              var rowsScrollController = this._rowsScrollController || this._dataSource;
              var itemIndex = rowsScrollController && rowsScrollController.getItemIndexByPosition();
              var result = this.callBase.apply(this, arguments);
              return result && result.done(function () {
                if (isVirtualMode(_this6) || _uiGrid_core2.default.isVirtualRowRendering(_this6)) {
                  var rowIndexOffset = _this6.getRowIndexOffset();
                  var rowIndex = Math.floor(itemIndex) - rowIndexOffset;
                  var component = _this6.component;
                  var scrollable = component.getScrollable && component.getScrollable();
                  var isSortingOperation = _this6.dataSource().operationTypes().sorting;
                  if (scrollable && !isSortingOperation && rowIndex >= 0) {
                    var rowElement = component.getRowElement(rowIndex);
                    var $rowElement = rowElement && rowElement[0] && (0, _renderer.default)(rowElement[0]);
                    var top = $rowElement && $rowElement.position().top;
                    var isChromeLatest = _browser.default.chrome && _browser.default.version >= 91;
                    var allowedTopOffset = _browser.default.mozilla || isChromeLatest ? 1 : 0; // T884308
                    if (top > allowedTopOffset) {
                      top = Math.round(top + (0, _size.getOuterHeight)($rowElement) * (itemIndex % 1));
                      scrollable.scrollTo({
                        y: top
                      });
                    }
                  }
                }
              });
            },
            initVirtualRows: function initVirtualRows() {
              var _this7 = this;
              var virtualRowsRendering = _uiGrid_core2.default.isVirtualRowRendering(this);
              this._allItems = null;
              this._loadViewportParams = null;
              if (this.option('scrolling.mode') !== 'virtual' && virtualRowsRendering !== true || virtualRowsRendering === false || this.option(LEGACY_SCROLLING_MODE) !== false && !this.option('scrolling.rowPageSize')) {
                this._visibleItems = null;
                this._rowsScrollController = null;
                return;
              }
              var pageIndex = !isVirtualMode(this) && this.pageIndex() >= this.pageCount() ? this.pageCount() - 1 : this.pageIndex();
              this._rowPageIndex = Math.ceil(pageIndex * this.pageSize() / this.getRowPageSize());
              this._visibleItems = this.option(LEGACY_SCROLLING_MODE) === false ? null : [];
              this._viewportChanging = false;
              this._needUpdateViewportAfterLoading = false;
              if (!this._rowsScrollController) {
                this._rowsScrollController = new _uiGrid_core.VirtualScrollController(this.component, this._getRowsScrollDataOptions(), true);
                this._rowsScrollController.positionChanged.add(function () {
                  var _this7$_dataSource;
                  if (_this7.option(LEGACY_SCROLLING_MODE) === false) {
                    _this7._viewportChanging = true;
                    _this7.loadViewport();
                    _this7._viewportChanging = false;
                    return;
                  }
                  (_this7$_dataSource = _this7._dataSource) === null || _this7$_dataSource === void 0 ? void 0 : _this7$_dataSource.setViewportItemIndex(_this7._rowsScrollController.getViewportItemIndex());
                });
              }
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                this._updateLoadViewportParams();
              }
              if (this.isLoaded() && this.option(LEGACY_SCROLLING_MODE) !== false) {
                this._rowsScrollController.load();
              }
            },
            isViewportChanging: function isViewportChanging() {
              return this._viewportChanging;
            },
            _getRowsScrollDataOptions: function _getRowsScrollDataOptions() {
              var that = this;
              var isItemCountable = function isItemCountable(item) {
                return isItemCountableByDataSource(item, that._dataSource);
              };
              return {
                pageSize: function pageSize() {
                  return that.getRowPageSize();
                },
                loadedOffset: function loadedOffset() {
                  var _that$_dataSource;
                  return isVirtualMode(that) && ((_that$_dataSource = that._dataSource) === null || _that$_dataSource === void 0 ? void 0 : _that$_dataSource.lastLoadOptions().skip) || 0;
                },
                loadedItemCount: function loadedItemCount() {
                  return that._itemCount;
                },
                totalItemsCount: function totalItemsCount() {
                  if (isVirtualPaging(that)) {
                    return that.totalItemsCount();
                  }
                  return that.option(LEGACY_SCROLLING_MODE) === false ? that._itemCount : that._items.filter(isItemCountable).length;
                },
                hasKnownLastPage: function hasKnownLastPage() {
                  return that.option(LEGACY_SCROLLING_MODE) === false ? that.hasKnownLastPage() : true;
                },
                pageIndex: function pageIndex(index) {
                  if (index !== undefined) {
                    that._rowPageIndex = index;
                  }
                  return that._rowPageIndex;
                },
                isLoading: function isLoading() {
                  return that.isLoading();
                },
                pageCount: function pageCount() {
                  var pageCount = Math.ceil(this.totalItemsCount() / this.pageSize());
                  return pageCount ? pageCount : 1;
                },
                load: function load() {
                  if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                    that._rowPageIndex = this.pageCount() - 1;
                    that._rowsScrollController.pageIndex(that._rowPageIndex);
                  }
                  if (!this.items().length && this.totalItemsCount()) return;
                  that._rowsScrollController.handleDataChanged(function (change) {
                    change = change || {};
                    change.changeType = change.changeType || 'refresh';
                    change.items = change.items || that._visibleItems;
                    that._visibleItems.forEach(function (item, index) {
                      item.rowIndex = index;
                    });
                    that._fireChanged(change);
                  });
                },
                updateLoading: function updateLoading() {},
                itemsCount: function itemsCount() {
                  return this.items(true).length;
                },
                correctCount: function correctCount(items, count, fromEnd) {
                  return _correctCount(items, count, fromEnd, function (item, isNextAfterLast, fromEnd) {
                    if (item.isNewRow) {
                      return isNextAfterLast && !fromEnd;
                    }
                    if (isNextAfterLast && fromEnd) {
                      return !item.isNewRow;
                    }
                    return isItemCountable(item);
                  });
                },
                items: function items(countableOnly) {
                  var result = that._items;
                  if (that.option(LEGACY_SCROLLING_MODE)) {
                    var dataSource = that.dataSource();
                    var virtualItemsCount = dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount();
                    var begin = virtualItemsCount ? virtualItemsCount.begin : 0;
                    var rowPageSize = that.getRowPageSize();
                    var skip = that._rowPageIndex * rowPageSize - begin;
                    var take = rowPageSize;
                    if (skip < 0) {
                      return [];
                    }
                    if (skip) {
                      skip = this.correctCount(result, skip);
                      result = result.slice(skip);
                    }
                    if (take) {
                      take = this.correctCount(result, take);
                      result = result.slice(0, take);
                    }
                  }
                  return countableOnly ? result.filter(isItemCountable) : result;
                },
                viewportItems: function viewportItems(items) {
                  if (items && that.option(LEGACY_SCROLLING_MODE) !== false) {
                    that._visibleItems = items;
                  }
                  return that._visibleItems;
                },
                onChanged: function onChanged() {},
                changingDuration: function changingDuration(e) {
                  var dataSource = that.dataSource();
                  if (dataSource !== null && dataSource !== void 0 && dataSource.isLoading() && that.option(LEGACY_SCROLLING_MODE) !== false) {
                    return LOAD_TIMEOUT;
                  }
                  return (dataSource === null || dataSource === void 0 ? void 0 : dataSource._renderTime) || 0;
                }
              };
            },
            _updateItemsCore: function _updateItemsCore(change) {
              var _this8 = this;
              var delta = this.getRowIndexDelta();
              this.callBase.apply(this, arguments);
              if (this.option(LEGACY_SCROLLING_MODE) === false && _uiGrid_core2.default.isVirtualRowRendering(this)) {
                if (change.changeType === 'update' && change.rowIndices.length === 0 && change.cancelEmptyChanges) {
                  change.cancel = true;
                }
                return;
              }
              var rowsScrollController = this._rowsScrollController;
              if (rowsScrollController) {
                var visibleItems = this._visibleItems;
                var isRefresh = change.changeType === 'refresh' || change.isLiveUpdate;
                if (change.changeType === 'append' && change.items && !change.items.length) return;
                if (isRefresh || change.changeType === 'append' || change.changeType === 'prepend') {
                  change.cancel = true;
                  isRefresh && rowsScrollController.reset(true);
                  rowsScrollController.load();
                } else {
                  if (change.changeType === 'update') {
                    change.rowIndices.forEach(function (rowIndex, index) {
                      var changeType = change.changeTypes[index];
                      var newItem = change.items[index];
                      if (changeType === 'update') {
                        visibleItems[rowIndex] = newItem;
                      } else if (changeType === 'insert') {
                        visibleItems.splice(rowIndex, 0, newItem);
                      } else if (changeType === 'remove') {
                        visibleItems.splice(rowIndex, 1);
                      }
                    });
                  } else {
                    visibleItems.forEach(function (item, index) {
                      visibleItems[index] = _this8._items[index + delta] || visibleItems[index];
                    });
                    change.items = visibleItems;
                  }
                  updateItemIndices(visibleItems);
                }
              }
            },
            _updateLoadViewportParams: function _updateLoadViewportParams() {
              var viewportParams = this._rowsScrollController.getViewportParams();
              var pageSize = this.pageSize();
              if (viewportParams && !isVirtualPaging(this) && pageSize > 0) {
                var pageOffset = this.pageIndex() * pageSize;
                viewportParams.skip += pageOffset;
              }
              this._loadViewportParams = viewportParams;
            },
            _processItems: function _processItems(items) {
              var resultItems = this.callBase.apply(this, arguments);
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                var _dataSource$lastLoadO;
                var dataSource = this._dataSource;
                var currentIndex = (_dataSource$lastLoadO = dataSource === null || dataSource === void 0 ? void 0 : dataSource.lastLoadOptions().skip) !== null && _dataSource$lastLoadO !== void 0 ? _dataSource$lastLoadO : 0;
                var prevCountable;
                var prevRowType;
                var isPrevRowNew;
                var wasCountableItem = false;
                var newRows = [];
                resultItems.forEach(function (item) {
                  var rowType = item.rowType;
                  var itemCountable = isItemCountableByDataSource(item, dataSource);
                  var isNextGroupItem = rowType === 'group' && (prevCountable || itemCountable || prevRowType !== 'group' && currentIndex > 0);
                  var isNextDataItem = rowType === 'data' && itemCountable && (prevCountable || prevRowType !== 'group');
                  if (!item.isNewRow && (0, _type.isDefined)(prevCountable)) {
                    var isPrevNewRowFirst = isPrevRowNew && !wasCountableItem;
                    if ((isNextGroupItem || isNextDataItem) && !isPrevNewRowFirst) {
                      currentIndex++;
                    }
                  }
                  if (isNextGroupItem || isNextDataItem) {
                    wasCountableItem = true;
                  }
                  if (item.isNewRow) {
                    newRows.push(item);
                  } else {
                    newRows.forEach(function (it) {
                      return it.loadIndex = currentIndex;
                    });
                    newRows = [];
                  }
                  item.loadIndex = currentIndex;
                  prevCountable = itemCountable;
                  prevRowType = rowType;
                  isPrevRowNew = item.isNewRow;
                });
                newRows.forEach(function (it) {
                  return it.loadIndex = currentIndex;
                });
              }
              return resultItems;
            },
            _afterProcessItems: function _afterProcessItems(items, change) {
              var _this9 = this;
              this._itemCount = items.filter(function (item) {
                return isItemCountableByDataSource(item, _this9._dataSource);
              }).length;
              if ((0, _type.isDefined)(this._loadViewportParams)) {
                this._updateLoadViewportParams();
                var result = items;
                this._allItems = items;
                if (items.length) {
                  var _this$getLoadPagePara = this.getLoadPageParams(true),
                      skipForCurrentPage = _this$getLoadPagePara.skipForCurrentPage;
                  var skip = items[0].loadIndex + skipForCurrentPage;
                  var take = this._loadViewportParams.take;
                  result = items.filter(function (it) {
                    var isNewRowInEmptyData = it.isNewRow && it.loadIndex === skip && take === 0;
                    var isLoadIndexGreaterStart = it.loadIndex >= skip;
                    var isLoadIndexLessEnd = it.loadIndex < skip + take || isNewRowInEmptyData;
                    return isLoadIndexGreaterStart && isLoadIndexLessEnd;
                  });
                }
                return result;
              }
              return this.callBase.apply(this, arguments);
            },
            _applyChange: function _applyChange(change) {
              var that = this;
              var items = change.items;
              var changeType = change.changeType;
              var removeCount = change.removeCount;
              if (removeCount) {
                var fromEnd = changeType === 'prepend';
                removeCount = _correctCount(that._items, removeCount, fromEnd, function (item, isNextAfterLast) {
                  return item.rowType === 'data' && !item.isNewRow || item.rowType === 'group' && (that._dataSource.isGroupItemCountable(item.data) || isNextAfterLast);
                });
                change.removeCount = removeCount;
              }
              switch (changeType) {
                case 'prepend':
                  that._items.unshift.apply(that._items, items);
                  if (removeCount) {
                    that._items.splice(-removeCount);
                  }
                  break;
                case 'append':
                  that._items.push.apply(that._items, items);
                  if (removeCount) {
                    that._items.splice(0, removeCount);
                  }
                  break;
                default:
                  that.callBase(change);
                  break;
              }
            },
            items: function items(allItems) {
              return allItems ? this._allItems || this._items : this._visibleItems || this._items;
            },
            getRowIndexDelta: function getRowIndexDelta() {
              var delta = 0;
              if (this.option(LEGACY_SCROLLING_MODE)) {
                var visibleItems = this._visibleItems;
                if (visibleItems && visibleItems[0]) {
                  delta = this._items.indexOf(visibleItems[0]);
                }
              }
              return delta < 0 ? 0 : delta;
            },
            getRowIndexOffset: function getRowIndexOffset(byLoadedRows) {
              var offset = 0;
              var dataSource = this.dataSource();
              var rowsScrollController = this._rowsScrollController;
              var newMode = this.option(LEGACY_SCROLLING_MODE) === false;
              var virtualPaging = isVirtualPaging(this);
              if (rowsScrollController && !byLoadedRows) {
                if (newMode && (0, _type.isDefined)(this._loadViewportParams)) {
                  var _this$getLoadPagePara2 = this.getLoadPageParams(true),
                      skipForCurrentPage = _this$getLoadPagePara2.skipForCurrentPage,
                      pageIndex = _this$getLoadPagePara2.pageIndex;
                  var items = this.items(true);
                  offset = virtualPaging ? pageIndex * this.pageSize() : 0;
                  if (items.length) {
                    var firstLoadIndex = items[0].loadIndex;
                    offset += items.filter(function (item) {
                      return item.loadIndex < firstLoadIndex + skipForCurrentPage;
                    }).length;
                  }
                } else {
                  offset = rowsScrollController.beginPageIndex() * rowsScrollController.pageSize();
                }
              } else if (virtualPaging && newMode && dataSource) {
                var _dataSource$lastLoadO2;
                offset = (_dataSource$lastLoadO2 = dataSource.lastLoadOptions().skip) !== null && _dataSource$lastLoadO2 !== void 0 ? _dataSource$lastLoadO2 : 0;
              } else if (isVirtualMode(this) && dataSource) {
                offset = dataSource.beginPageIndex() * dataSource.pageSize();
              }
              return offset;
            },
            getDataIndex: function getDataIndex(change) {
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                return this.getRowIndexOffset(true);
              }
              return this.callBase.apply(this, arguments);
            },
            viewportSize: function viewportSize() {
              var rowsScrollController = this._rowsScrollController;
              var dataSource = this._dataSource;
              var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportSize.apply(rowsScrollController, arguments);
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                return result;
              }
              return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportSize.apply(dataSource, arguments);
            },
            viewportHeight: function viewportHeight(height, scrollTop) {
              var _this$_rowsScrollCont;
              (_this$_rowsScrollCont = this._rowsScrollController) === null || _this$_rowsScrollCont === void 0 ? void 0 : _this$_rowsScrollCont.viewportHeight(height, scrollTop);
            },
            viewportItemSize: function viewportItemSize() {
              var rowsScrollController = this._rowsScrollController;
              var dataSource = this._dataSource;
              var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.viewportItemSize.apply(rowsScrollController, arguments);
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                return result;
              }
              return dataSource === null || dataSource === void 0 ? void 0 : dataSource.viewportItemSize.apply(dataSource, arguments);
            },
            setViewportPosition: function setViewportPosition() {
              var rowsScrollController = this._rowsScrollController;
              var dataSource = this._dataSource;
              this._isPaging = false;
              if (rowsScrollController) {
                rowsScrollController.setViewportPosition.apply(rowsScrollController, arguments);
              } else {
                dataSource === null || dataSource === void 0 ? void 0 : dataSource.setViewportPosition.apply(dataSource, arguments);
              }
            },
            setContentItemSizes: function setContentItemSizes(sizes) {
              var rowsScrollController = this._rowsScrollController;
              var dataSource = this._dataSource;
              var result = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.setContentItemSizes(sizes);
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                return result;
              }
              return dataSource === null || dataSource === void 0 ? void 0 : dataSource.setContentItemSizes(sizes);
            },
            getPreloadedRowCount: function getPreloadedRowCount() {
              var preloadCount = this.option('scrolling.preloadedRowCount');
              var preloadEnabled = this.option('scrolling.preloadEnabled');
              if ((0, _type.isDefined)(preloadCount)) {
                return preloadCount;
              }
              var viewportSize = this.viewportSize();
              return preloadEnabled ? 2 * viewportSize : viewportSize;
            },
            getLoadPageParams: function getLoadPageParams(byLoadedPage) {
              var _this$_dataSource2, _this$_dataSource3;
              var pageSize = this.pageSize();
              var viewportParams = this._loadViewportParams;
              var lastLoadOptions = (_this$_dataSource2 = this._dataSource) === null || _this$_dataSource2 === void 0 ? void 0 : _this$_dataSource2.lastLoadOptions();
              var loadedPageIndex = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.pageIndex) || 0;
              var loadedTake = (lastLoadOptions === null || lastLoadOptions === void 0 ? void 0 : lastLoadOptions.take) || 0;
              var isScrollingBack = this._rowsScrollController.isScrollingBack();
              var topPreloadCount = isScrollingBack ? this.getPreloadedRowCount() : 0;
              var bottomPreloadCount = isScrollingBack ? 0 : this.getPreloadedRowCount();
              var totalCountCorrection = ((_this$_dataSource3 = this._dataSource) === null || _this$_dataSource3 === void 0 ? void 0 : _this$_dataSource3.totalCountCorrection()) || 0;
              var skipWithPreload = Math.max(0, viewportParams.skip - topPreloadCount);
              var pageIndex = byLoadedPage ? loadedPageIndex : Math.floor(pageSize ? skipWithPreload / pageSize : 0);
              var pageOffset = pageIndex * pageSize;
              var skipForCurrentPage = viewportParams.skip - pageOffset;
              var loadingTake = viewportParams.take + skipForCurrentPage + bottomPreloadCount - totalCountCorrection;
              var take = byLoadedPage ? loadedTake : loadingTake;
              var loadPageCount = Math.ceil(pageSize ? take / pageSize : 0);
              return {
                pageIndex: pageIndex,
                loadPageCount: Math.max(1, loadPageCount),
                skipForCurrentPage: Math.max(0, skipForCurrentPage)
              };
            },
            _updateVisiblePageIndex: function _updateVisiblePageIndex(currentPageIndex) {
              if (!this._rowsScrollController) {
                return;
              }
              if ((0, _type.isDefined)(currentPageIndex)) {
                this._silentOption(VISIBLE_PAGE_INDEX, currentPageIndex);
                this.pageChanged.fire();
                return;
              }
              var viewPortItemIndex = this._rowsScrollController.getViewportItemIndex();
              var newPageIndex = Math.floor(viewPortItemIndex / this.pageSize());
              if (this.pageIndex() !== newPageIndex) {
                this._silentOption(VISIBLE_PAGE_INDEX, newPageIndex);
                this.updateItems({
                  changeType: 'pageIndex'
                });
              }
            },
            _getChangedLoadParams: function _getChangedLoadParams() {
              var loadedPageParams = this.getLoadPageParams(true);
              var _this$getLoadPagePara3 = this.getLoadPageParams(),
                  pageIndex = _this$getLoadPagePara3.pageIndex,
                  loadPageCount = _this$getLoadPagePara3.loadPageCount;
              var pageIndexIsValid = this._pageIndexIsValid(pageIndex);
              var result = null;
              if (!this._isLoading && pageIndexIsValid && (pageIndex !== loadedPageParams.pageIndex || loadPageCount !== loadedPageParams.loadPageCount)) {
                result = {
                  pageIndex: pageIndex,
                  loadPageCount: loadPageCount
                };
              }
              return result;
            },
            _pageIndexIsValid: function _pageIndexIsValid(pageIndex) {
              var result = true;
              if (isAppendMode(this) && this.hasKnownLastPage() || isVirtualMode(this)) {
                result = pageIndex * this.pageSize() < this.totalItemsCount();
              }
              return result;
            },
            _loadItems: function _loadItems(checkLoading, viewportIsFilled) {
              var _dataSourceAdapter$lo,
                  _dataSourceAdapter$pa,
                  _this10 = this;
              var virtualPaging = isVirtualPaging(this);
              var dataSourceAdapter = this._dataSource;
              var changedParams = this._getChangedLoadParams();
              var currentLoadPageCount = (_dataSourceAdapter$lo = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.loadPageCount()) !== null && _dataSourceAdapter$lo !== void 0 ? _dataSourceAdapter$lo : 0;
              var lastRequiredItemCount = this.pageSize() * currentLoadPageCount;
              var currentPageIndex = (_dataSourceAdapter$pa = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.pageIndex()) !== null && _dataSourceAdapter$pa !== void 0 ? _dataSourceAdapter$pa : 0;
              var pageIndexNotChanged = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) === currentPageIndex;
              var allLoadedInAppendMode = isAppendMode(this) && this.totalItemsCount() < lastRequiredItemCount;
              var isRepaintMode = this.option('editing.refreshMode') === 'repaint';
              var pageIndexIncreased = (changedParams === null || changedParams === void 0 ? void 0 : changedParams.pageIndex) > currentPageIndex;
              var result = false;
              if (!dataSourceAdapter || virtualPaging && checkLoading && (isRepaintMode && viewportIsFilled || pageIndexIncreased || pageIndexNotChanged && allLoadedInAppendMode)) {
                return result;
              }
              if (virtualPaging && this._isLoading) {
                this._needUpdateViewportAfterLoading = true;
              }
              if (virtualPaging && changedParams) {
                result = true;
                dataSourceAdapter.pageIndex(changedParams.pageIndex);
                dataSourceAdapter.loadPageCount(changedParams.loadPageCount);
                this._repaintChangesOnly = true;
                this._needUpdateDimensions = true;
                var viewportChanging = this._viewportChanging;
                this.load().always(function () {
                  _this10._repaintChangesOnly = undefined;
                  _this10._needUpdateDimensions = undefined;
                }).done(function () {
                  var isLastPage = _this10.pageCount() > 0 && _this10.pageIndex() === _this10.pageCount() - 1;
                  (viewportChanging || isLastPage) && _this10._updateVisiblePageIndex();
                  if (_this10._needUpdateViewportAfterLoading) {
                    _this10._needUpdateViewportAfterLoading = false;
                    _this10.loadViewport({
                      checkLoadedParamsOnly: true
                    });
                  }
                });
              }
              return result;
            },
            loadViewport: function loadViewport(params) {
              var _ref2 = params !== null && params !== void 0 ? params : {},
                  checkLoadedParamsOnly = _ref2.checkLoadedParamsOnly,
                  checkLoading = _ref2.checkLoading,
                  viewportIsNotFilled = _ref2.viewportIsNotFilled;
              var virtualPaging = isVirtualPaging(this);
              if (virtualPaging || _uiGrid_core2.default.isVirtualRowRendering(this)) {
                this._updateLoadViewportParams();
                var loadingItemsStarted = this._loadItems(checkLoading, !viewportIsNotFilled);
                var needToUpdateItems = !(loadingItemsStarted || this._isLoading && checkLoading || checkLoadedParamsOnly);
                if (needToUpdateItems) {
                  var _this$getController2, _this$getController2$;
                  var noPendingChangesInEditing = !((_this$getController2 = this.getController('editing')) !== null && _this$getController2 !== void 0 && (_this$getController2$ = _this$getController2.getChanges()) !== null && _this$getController2$ !== void 0 && _this$getController2$.length);
                  this.updateItems({
                    repaintChangesOnly: true,
                    needUpdateDimensions: true,
                    useProcessedItemsCache: noPendingChangesInEditing,
                    cancelEmptyChanges: true
                  });
                }
              }
            },
            updateViewport: function updateViewport() {
              var _this$_loadViewportPa, _this$_loadViewportPa2;
              var viewportSize = this.viewportSize();
              var itemCount = this.items().length;
              var viewportIsNotFilled = viewportSize > itemCount;
              var currentTake = (_this$_loadViewportPa = (_this$_loadViewportPa2 = this._loadViewportParams) === null || _this$_loadViewportPa2 === void 0 ? void 0 : _this$_loadViewportPa2.take) !== null && _this$_loadViewportPa !== void 0 ? _this$_loadViewportPa : 0;
              var rowsScrollController = this._rowsScrollController;
              var newTake = rowsScrollController === null || rowsScrollController === void 0 ? void 0 : rowsScrollController.getViewportParams().take;
              (viewportIsNotFilled || currentTake < newTake) && !this._isPaging && itemCount && this.loadViewport({
                checkLoading: true,
                viewportIsNotFilled: viewportIsNotFilled
              });
            },
            loadIfNeed: function loadIfNeed() {
              if (this.option(LEGACY_SCROLLING_MODE) === false) {
                return;
              }
              var rowsScrollController = this._rowsScrollController;
              rowsScrollController && rowsScrollController.loadIfNeed();
              var dataSource = this._dataSource;
              return dataSource && dataSource.loadIfNeed();
            },
            getItemSize: function getItemSize() {
              var rowsScrollController = this._rowsScrollController;
              if (rowsScrollController) {
                return rowsScrollController.getItemSize.apply(rowsScrollController, arguments);
              }
              var dataSource = this._dataSource;
              return dataSource && dataSource.getItemSize.apply(dataSource, arguments);
            },
            getItemSizes: function getItemSizes() {
              var rowsScrollController = this._rowsScrollController;
              if (rowsScrollController) {
                return rowsScrollController.getItemSizes.apply(rowsScrollController, arguments);
              }
              var dataSource = this._dataSource;
              return dataSource && dataSource.getItemSizes.apply(dataSource, arguments);
            },
            getContentOffset: function getContentOffset() {
              var rowsScrollController = this._rowsScrollController;
              if (rowsScrollController) {
                return rowsScrollController.getContentOffset.apply(rowsScrollController, arguments);
              }
              var dataSource = this._dataSource;
              return dataSource && dataSource.getContentOffset.apply(dataSource, arguments);
            },
            refresh: function refresh(options) {
              var dataSource = this._dataSource;
              if (dataSource && options && options.load && isAppendMode(this)) {
                dataSource.resetCurrentTotalCount();
              }
              return this.callBase.apply(this, arguments);
            },
            dispose: function dispose() {
              var rowsScrollController = this._rowsScrollController;
              rowsScrollController && rowsScrollController.dispose();
              this.callBase.apply(this, arguments);
            },
            topItemIndex: function topItemIndex() {
              var _this$_loadViewportPa3;
              return (_this$_loadViewportPa3 = this._loadViewportParams) === null || _this$_loadViewportPa3 === void 0 ? void 0 : _this$_loadViewportPa3.skip;
            },
            bottomItemIndex: function bottomItemIndex() {
              var viewportParams = this._loadViewportParams;
              return viewportParams && viewportParams.skip + viewportParams.take;
            },
            virtualItemsCount: function virtualItemsCount() {
              var rowsScrollController = this._rowsScrollController;
              if (rowsScrollController) {
                return rowsScrollController.virtualItemsCount.apply(rowsScrollController, arguments);
              }
              var dataSource = this._dataSource;
              return dataSource === null || dataSource === void 0 ? void 0 : dataSource.virtualItemsCount.apply(dataSource, arguments);
            },
            pageIndex: function pageIndex(_pageIndex) {
              var virtualPaging = isVirtualPaging(this);
              var rowsScrollController = this._rowsScrollController;
              if (this.option(LEGACY_SCROLLING_MODE) === false && virtualPaging && rowsScrollController) {
                if (_pageIndex === undefined) {
                  var _this$option;
                  return (_this$option = this.option(VISIBLE_PAGE_INDEX)) !== null && _this$option !== void 0 ? _this$option : 0;
                }
              }
              return this.callBase.apply(this, arguments);
            },
            _fireChanged: function _fireChanged(e) {
              this.callBase.apply(this, arguments);
              var operationTypes = e.operationTypes;
              if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this) && operationTypes) {
                var fullReload = operationTypes.fullReload,
                    pageIndex = operationTypes.pageIndex;
                if (e.isDataChanged && !fullReload && pageIndex) {
                  this._updateVisiblePageIndex(this._dataSource.pageIndex());
                }
              }
            },
            _getPagingOptionValue: function _getPagingOptionValue(optionName) {
              var result = this.callBase.apply(this, arguments);
              if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
                result = this[optionName]();
              }
              return result;
            },
            isEmpty: function isEmpty() {
              return this.option(LEGACY_SCROLLING_MODE) === false ? !this.items(true).length : this.callBase(this, arguments);
            },
            isLastPageLoaded: function isLastPageLoaded() {
              var result = false;
              if (this.option(LEGACY_SCROLLING_MODE) === false && isVirtualPaging(this)) {
                var _this$getLoadPagePara4 = this.getLoadPageParams(true),
                    pageIndex = _this$getLoadPagePara4.pageIndex,
                    loadPageCount = _this$getLoadPagePara4.loadPageCount;
                var pageCount = this.pageCount();
                result = pageIndex + loadPageCount >= pageCount;
              } else {
                result = this.callBase.apply(this, arguments);
              }
              return result;
            },
            reset: function reset() {
              this._itemCount = 0;
              this._allItems = null;
              this.callBase.apply(this, arguments);
            },
            _applyFilter: function _applyFilter() {
              var _this$_dataSource4;
              (_this$_dataSource4 = this._dataSource) === null || _this$_dataSource4 === void 0 ? void 0 : _this$_dataSource4.loadPageCount(1);
              this.callBase.apply(this, arguments);
            }
          };
          _uiGrid_core2.default.proxyMethod(members, 'getVirtualContentSize');
          _uiGrid_core2.default.proxyMethod(members, 'setViewportItemIndex');
          return members;
        }(),
        resizing: {
          _updateMasterDataGridCore: function _updateMasterDataGridCore(masterDataGrid) {
            return (0, _deferred.when)(this.callBase.apply(this, arguments)).done(function (masterDataGridUpdated) {
              var isNewVirtualMode = isVirtualMode(masterDataGrid) && masterDataGrid.option(LEGACY_SCROLLING_MODE) === false;
              if (!masterDataGridUpdated && isNewVirtualMode) {
                var scrollable = masterDataGrid.getScrollable();
                if (scrollable) {
                  masterDataGrid.updateDimensions();
                }
              }
            });
          },
          hasResizeTimeout: function hasResizeTimeout() {
            return !!this._resizeTimeout;
          },
          resize: function resize() {
            var _this11 = this;
            var callBase = this.callBase;
            var result;
            if (isVirtualMode(this) || _uiGrid_core2.default.isVirtualRowRendering(this)) {
              clearTimeout(this._resizeTimeout);
              this._resizeTimeout = null;
              var diff = new Date() - this._lastTime;
              var updateTimeout = this.option('scrolling.updateTimeout');
              if (this._lastTime && diff < updateTimeout) {
                result = new _deferred.Deferred();
                this._resizeTimeout = setTimeout(function () {
                  _this11._resizeTimeout = null;
                  callBase.apply(_this11).done(result.resolve).fail(result.reject);
                  _this11._lastTime = new Date();
                }, updateTimeout);
                this._lastTime = new Date();
              } else {
                result = callBase.apply(this);
                if (this._dataController.isLoaded()) {
                  this._lastTime = new Date();
                }
              }
            } else {
              result = callBase.apply(this);
            }
            return result;
          },
          dispose: function dispose() {
            this.callBase.apply(this, arguments);
            clearTimeout(this._resizeTimeout);
          }
        }
      },
      views: {
        rowsView: VirtualScrollingRowsViewExtender
      }
    }
  };
  exports.virtualScrollingModule = virtualScrollingModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/window","./ui.grid_core.virtual_scrolling_core","./ui.grid_core.utils","../../core/utils/iterator","../../core/utils/deferred","../load_indicator","../../core/utils/browser","../../core/utils/position","../../core/utils/dom","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/window"), require("./ui.grid_core.virtual_scrolling_core"), require("./ui.grid_core.utils"), require("../../core/utils/iterator"), require("../../core/utils/deferred"), require("../load_indicator"), require("../../core/utils/browser"), require("../../core/utils/position"), require("../../core/utils/dom"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.virtual_scrolling.js.map