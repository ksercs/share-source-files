!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.virtual_columns.js"], ["../../core/utils/size","../../core/utils/window","./ui.grid_core.virtual_columns_core","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.virtual_columns.js", ["../../core/utils/size", "../../core/utils/window", "./ui.grid_core.virtual_columns_core", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.virtualColumnsModule = void 0;
  var _size = $__require("../../core/utils/size");
  var _window = $__require("../../core/utils/window");
  var _uiGrid_core = $__require("./ui.grid_core.virtual_columns_core");
  var _type = $__require("../../core/utils/type");
  var DEFAULT_COLUMN_WIDTH = 50;
  var VirtualScrollingRowsViewExtender = {
    _resizeCore: function _resizeCore() {
      this.callBase.apply(this, arguments);
      this._columnsController.resize();
    },
    _handleScroll: function _handleScroll(e) {
      var that = this;
      var scrollable = this.getScrollable();
      var left = e.scrollOffset.left;
      that.callBase.apply(that, arguments);
      if (that.option('rtlEnabled') && scrollable) {
        left = (0, _size.getWidth)(scrollable.$content()) - (0, _size.getWidth)(scrollable.$element()) - left;
      }
      that._columnsController.setScrollPosition(left);
    }
  };
  var HeaderViewExtender = {
    _renderCore: function _renderCore() {
      var deferred = this.callBase.apply(this, arguments);
      if (this._columnsController.isVirtualMode()) {
        this._updateScrollLeftPosition();
      }
      return deferred;
    }
  };
  var ColumnsControllerExtender = function () {
    var getWidths = function getWidths(columns) {
      return columns.map(function (column) {
        return column.visibleWidth || parseFloat(column.width) || DEFAULT_COLUMN_WIDTH;
      });
    };
    var members = {
      init: function init() {
        var that = this;
        that.callBase.apply(this, arguments);
        that._beginPageIndex = null;
        that._endPageIndex = null;
        that._position = 0;
        that._virtualVisibleColumns = {};
      },
      resetColumnsCache: function resetColumnsCache() {
        this.callBase();
        this._virtualVisibleColumns = {};
      },
      getBeginPageIndex: function getBeginPageIndex(position) {
        var visibleColumns = this.getVisibleColumns(undefined, true);
        var widths = getWidths(visibleColumns);
        var currentPosition = 0;
        for (var index = 0; index < widths.length; index++) {
          if (currentPosition >= position) {
            return Math.floor(index / this.getColumnPageSize());
          }
          currentPosition += widths[index];
        }
        return 0;
      },
      getTotalWidth: function getTotalWidth() {
        var width = this.option('width');
        if (typeof width === 'number') {
          return width;
        }
        return this.getController('resizing')._lastWidth || (0, _size.getOuterWidth)(this.component.$element());
      },
      getEndPageIndex: function getEndPageIndex(position) {
        var visibleColumns = this.getVisibleColumns(undefined, true);
        var widths = getWidths(visibleColumns);
        var currentPosition = 0;
        position += this.getTotalWidth();
        for (var index = 0; index < widths.length; index++) {
          if (currentPosition >= position) {
            return Math.ceil(index / this.getColumnPageSize());
          }
          currentPosition += widths[index];
        }
        return Math.ceil(widths.length / this.getColumnPageSize());
      },
      getColumnPageSize: function getColumnPageSize() {
        return this.option('scrolling.columnPageSize');
      },
      _fireColumnsChanged: function _fireColumnsChanged() {
        var date = new Date();
        this.columnsChanged.fire({
          optionNames: {
            all: true,
            length: 1
          },
          changeTypes: {
            columns: true,
            virtualColumnsScrolling: true,
            length: 2
          }
        });
        this._renderTime = new Date() - date;
      },
      getScrollingTimeout: function getScrollingTimeout() {
        var renderingThreshold = this.option('scrolling.columnRenderingThreshold');
        var renderAsync = this.option('scrolling.renderAsync');
        var scrollingTimeout = 0;
        if (!(0, _type.isDefined)(renderAsync) && this._renderTime > renderingThreshold || renderAsync) {
          scrollingTimeout = this.option('scrolling.timeout');
        }
        return scrollingTimeout;
      },
      setScrollPosition: function setScrollPosition(position) {
        var _this = this;
        var scrollingTimeout = this.getScrollingTimeout();
        if (scrollingTimeout > 0) {
          clearTimeout(this._changedTimeout);
          this._changedTimeout = setTimeout(function () {
            _this._setScrollPositionCore(position);
          }, scrollingTimeout);
        } else {
          this._setScrollPositionCore(position);
        }
      },
      isVirtualMode: function isVirtualMode() {
        return (0, _window.hasWindow)() && this.option('scrolling.columnRenderingMode') === 'virtual';
      },
      resize: function resize() {
        this._setScrollPositionCore(this._position);
      },
      _setScrollPositionCore: function _setScrollPositionCore(position) {
        var that = this;
        if (that.isVirtualMode()) {
          var beginPageIndex = that.getBeginPageIndex(position);
          var endPageIndex = that.getEndPageIndex(position);
          var needColumnsChanged = position < that._position ? that._beginPageIndex > beginPageIndex : that._endPageIndex < endPageIndex;
          that._position = position;
          if (needColumnsChanged) {
            that._beginPageIndex = beginPageIndex;
            that._endPageIndex = endPageIndex;
            that._fireColumnsChanged();
          }
        }
      },
      getFixedColumns: function getFixedColumns(rowIndex, isBase) {
        var fixedColumns = this.callBase(rowIndex);
        if (this.isVirtualMode() && !isBase && fixedColumns.length) {
          var transparentColumnIndex = fixedColumns.map(function (c) {
            return c.command;
          }).indexOf('transparent');
          fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - this.callBase().length + 1;
          return fixedColumns;
        }
        return fixedColumns;
      },
      _compileVisibleColumns: function _compileVisibleColumns(rowIndex, isBase) {
        var _this$_columns;
        if (isBase || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
          return this.callBase(rowIndex);
        }
        if ((_this$_columns = this._columns) !== null && _this$_columns !== void 0 && _this$_columns.length && !(0, _type.isDefined)(this._beginPageIndex) && !(0, _type.isDefined)(this._endPageIndex)) {
          this._beginPageIndex = this.getBeginPageIndex(this._position);
          this._endPageIndex = this.getEndPageIndex(this._position);
        }
        var beginPageIndex = this._beginPageIndex;
        var endPageIndex = this._endPageIndex;
        var visibleColumnsHash = rowIndex + '-' + beginPageIndex + '-' + endPageIndex;
        if (this._virtualVisibleColumns[visibleColumnsHash]) {
          return this._virtualVisibleColumns[visibleColumnsHash];
        }
        var visibleColumns = this.callBase();
        var rowCount = this.getRowCount();
        var pageSize = this.getColumnPageSize();
        var startIndex = beginPageIndex * pageSize;
        var endIndex = endPageIndex * pageSize;
        var fixedColumns = this.getFixedColumns(undefined, true);
        var transparentColumnIndex = fixedColumns.map(function (c) {
          return c.command;
        }).indexOf('transparent');
        var beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
        var beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
        var beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
        var beginWidth = getWidths(beginColumns).reduce(function (a, b) {
          return a + b;
        }, 0);
        if (!beginWidth) {
          startIndex = 0;
        }
        var endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
        var endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
        var endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
        var endWidth = getWidths(endColumns).reduce(function (a, b) {
          return a + b;
        }, 0);
        if (!endWidth) {
          endIndex = visibleColumns.length;
        }
        if (rowCount > 1 && typeof rowIndex === 'number') {
          var columnsInfo = [];
          for (var i = 0; i <= rowCount; i++) {
            columnsInfo.push(this.callBase(i));
          }
          beginFixedColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
          endFixedColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
          visibleColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, startIndex, endIndex)[rowIndex] || [];
        } else {
          visibleColumns = visibleColumns.slice(startIndex, endIndex);
        }
        if (beginWidth) {
          visibleColumns.unshift({
            command: 'virtual',
            width: beginWidth
          });
          visibleColumns = beginFixedColumns.concat(visibleColumns);
        }
        if (endWidth) {
          visibleColumns.push({
            command: 'virtual',
            width: endWidth
          });
          visibleColumns = visibleColumns.concat(endFixedColumns);
        }
        this._virtualVisibleColumns[visibleColumnsHash] = visibleColumns;
        return visibleColumns;
      },
      getColumnIndexOffset: function getColumnIndexOffset() {
        var offset = 0;
        if (this._beginPageIndex > 0) {
          var fixedColumns = this.getFixedColumns();
          var transparentColumnIndex = fixedColumns.map(function (c) {
            return c.command;
          }).indexOf('transparent');
          var leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
          offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1;
        }
        return offset > 0 ? offset : 0;
      },
      dispose: function dispose() {
        clearTimeout(this._changedTimeout);
        this.callBase.apply(this, arguments);
      }
    };
    return members;
  }();
  var virtualColumnsModule = {
    defaultOptions: function defaultOptions() {
      return {
        scrolling: {
          columnRenderingMode: 'standard',
          columnPageSize: 5,
          columnRenderingThreshold: 300
        }
      };
    },
    extenders: {
      controllers: {
        columns: ColumnsControllerExtender
      },
      views: {
        columnHeadersView: HeaderViewExtender,
        rowsView: VirtualScrollingRowsViewExtender
      }
    }
  };
  exports.virtualColumnsModule = virtualColumnsModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/utils/window","./ui.grid_core.virtual_columns_core","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/utils/window"), require("./ui.grid_core.virtual_columns_core"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.virtual_columns.js.map