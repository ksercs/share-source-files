!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/headers_area/module.js"], ["../../../../core/utils/size","../../../../core/renderer","../../../../core/utils/type","../../../../core/utils/iterator","../../../../ui/scroll_view/ui.scrollable","../../../../core/dom_adapter","../area_item/module"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/headers_area/module.js", ["../../../../core/utils/size", "../../../../core/renderer", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../ui/scroll_view/ui.scrollable", "../../../../core/dom_adapter", "../area_item/module"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.VerticalHeadersArea = exports.HorizontalHeadersArea = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _ui = _interopRequireDefault($__require("../../../../ui/scroll_view/ui.scrollable"));
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _module = $__require("../area_item/module");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
  var PIVOTGRID_AREA_COLUMN_CLASS = 'dx-pivotgrid-horizontal-headers';
  var PIVOTGRID_AREA_ROW_CLASS = 'dx-pivotgrid-vertical-headers';
  var PIVOTGRID_TOTAL_CLASS = 'dx-total';
  var PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
  var PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
  var PIVOTGRID_EXPANDED_CLASS = 'dx-pivotgrid-expanded';
  var PIVOTGRID_COLLAPSED_CLASS = 'dx-pivotgrid-collapsed';
  var PIVOTGRID_LAST_CELL_CLASS = 'dx-last-cell';
  var PIVOTGRID_VERTICAL_SCROLL_CLASS = 'dx-vertical-scroll';
  var PIVOTGRID_EXPAND_BORDER = 'dx-expand-border';
  var isRenovatedScrollable = !!_ui.default.IS_RENOVATED_WIDGET;
  function getCellPath(tableElement, cell) {
    if (cell) {
      var _tableElement$data = tableElement.data(),
          data = _tableElement$data.data;
      var rowIndex = cell.parentNode.rowIndex;
      var cellIndex = cell.cellIndex;
      return data[rowIndex] && data[rowIndex][cellIndex] && data[rowIndex][cellIndex].path;
    }
    return undefined;
  }
  var HorizontalHeadersArea = _module.AreaItem.inherit({
    ctor: function ctor(component) {
      this.callBase(component);
      this._scrollBarWidth = 0;
    },
    _getAreaName: function _getAreaName() {
      return 'column';
    },
    _getAreaClassName: function _getAreaClassName() {
      return PIVOTGRID_AREA_COLUMN_CLASS;
    },
    _createGroupElement: function _createGroupElement() {
      return (0, _renderer.default)('<div>').addClass(this._getAreaClassName()).addClass(PIVOTGRID_AREA_CLASS);
    },
    _applyCustomStyles: function _applyCustomStyles(options) {
      var cssArray = options.cssArray;
      var cell = options.cell;
      var rowsCount = options.rowsCount;
      var classArray = options.classArray;
      if (options.cellIndex === options.cellsCount - 1) {
        cssArray.push("".concat(options.rtlEnabled ? 'border-left:' : 'border-right:', "0px"));
      }
      if (cell.rowspan === rowsCount - options.rowIndex || options.rowIndex + 1 === rowsCount) {
        cssArray.push('border-bottom-width:0px');
      }
      if (cell.type === 'T' || cell.type === 'GT') {
        classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
      }
      if (options.cell.type === 'T') {
        classArray.push(PIVOTGRID_TOTAL_CLASS);
      }
      if (options.cell.type === 'GT') {
        classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
      }
      if ((0, _type.isDefined)(cell.expanded)) {
        classArray.push(cell.expanded ? PIVOTGRID_EXPANDED_CLASS : PIVOTGRID_COLLAPSED_CLASS);
      }
      this.callBase(options);
    },
    _getMainElementMarkup: function _getMainElementMarkup() {
      var thead = _dom_adapter.default.createElement('thead');
      thead.setAttribute('class', this._getAreaClassName());
      return thead;
    },
    _getCloseMainElementMarkup: function _getCloseMainElementMarkup() {
      return '</thead>';
    },
    setVirtualContentParams: function setVirtualContentParams(params) {
      this.callBase(params);
      this._setTableCss({
        left: params.left,
        top: 0
      });
      this._virtualContentWidth = params.width;
    },
    hasScroll: function hasScroll() {
      var tableWidth = this._virtualContent ? this._virtualContentWidth : this._tableWidth;
      var groupWidth = this.getGroupWidth();
      if (groupWidth && tableWidth) {
        return tableWidth - groupWidth >= 1;
      }
      return false;
    },
    renderScrollable: function renderScrollable() {
      this._groupElement.dxScrollable({
        useNative: false,
        useSimulatedScrollbar: false,
        showScrollbar: 'never',
        bounceEnabled: false,
        direction: 'horizontal',
        rtlEnabled: isRenovatedScrollable ? this.component.option('rtlEnabled') : false,
        updateManually: true
      });
    },
    updateScrollableOptions: function updateScrollableOptions(_ref) {
      var rtlEnabled = _ref.rtlEnabled;
      var scrollable = this._getScrollable();
      isRenovatedScrollable && scrollable.option({
        rtlEnabled: rtlEnabled
      });
    },
    processScrollBarSpacing: function processScrollBarSpacing(scrollBarWidth) {
      var groupAlignment = this.option('rtlEnabled') ? 'right' : 'left';
      var groupWidth = this.getGroupWidth();
      if (groupWidth) {
        this.setGroupWidth(groupWidth - scrollBarWidth);
      }
      if (this._scrollBarWidth) {
        this._groupElement.next().remove();
      }
      this._groupElement.toggleClass(PIVOTGRID_VERTICAL_SCROLL_CLASS, scrollBarWidth > 0);
      (0, _size.setWidth)(this._groupElement.css('float', groupAlignment), this.getGroupHeight());
      this._scrollBarWidth = scrollBarWidth;
    },
    getScrollPath: function getScrollPath(offset) {
      var tableElement = this.tableElement();
      var cell;
      offset -= parseInt(tableElement[0].style.left, 10) || 0;
      (0, _iterator.each)(tableElement.find('td'), function (_, td) {
        if (td.colSpan === 1 && td.offsetLeft <= offset && td.offsetWidth + td.offsetLeft > offset) {
          cell = td;
          return false;
        }
        return undefined;
      });
      return getCellPath(tableElement, cell);
    },
    _moveFakeTable: function _moveFakeTable(scrollPos) {
      this._moveFakeTableHorizontally(scrollPos);
      this.callBase();
    }
  });
  exports.HorizontalHeadersArea = HorizontalHeadersArea;
  var VerticalHeadersArea = HorizontalHeadersArea.inherit({
    _getAreaClassName: function _getAreaClassName() {
      return PIVOTGRID_AREA_ROW_CLASS;
    },
    _applyCustomStyles: function _applyCustomStyles(options) {
      this.callBase(options);
      if (options.cellIndex === options.cellsCount - 1) {
        options.classArray.push(PIVOTGRID_LAST_CELL_CLASS);
      }
      if (options.rowIndex === options.rowsCount - 1) {
        options.cssArray.push('border-bottom: 0px');
      }
      if (options.cell.isWhiteSpace) {
        options.classArray.push('dx-white-space-column');
      }
    },
    _getAreaName: function _getAreaName() {
      return 'row';
    },
    setVirtualContentParams: function setVirtualContentParams(params) {
      this.callBase(params);
      this._setTableCss({
        top: params.top,
        left: 0
      });
      this._virtualContentHeight = params.height;
    },
    hasScroll: function hasScroll() {
      var tableHeight = this._virtualContent ? this._virtualContentHeight : this._tableHeight;
      var groupHeight = this.getGroupHeight();
      if (groupHeight && tableHeight) {
        return tableHeight - groupHeight >= 1;
      }
      return false;
    },
    renderScrollable: function renderScrollable() {
      this._groupElement.dxScrollable({
        useNative: false,
        useSimulatedScrollbar: false,
        showScrollbar: 'never',
        bounceEnabled: false,
        direction: 'vertical',
        updateManually: true
      });
    },
    processScrollBarSpacing: function processScrollBarSpacing(scrollBarWidth) {
      var groupHeight = this.getGroupHeight();
      if (groupHeight) {
        this.setGroupHeight(groupHeight - scrollBarWidth);
      }
      if (this._scrollBarWidth) {
        this._groupElement.next().remove();
      }
      if (scrollBarWidth) {
        var $div = (0, _renderer.default)('<div>');
        (0, _size.setWidth)($div, '100%');
        (0, _size.setHeight)($div, scrollBarWidth - 1);
        this._groupElement.after($div);
      }
      this._scrollBarWidth = scrollBarWidth;
    },
    getScrollPath: function getScrollPath(offset) {
      var tableElement = this.tableElement();
      var cell;
      offset -= parseInt(tableElement[0].style.top, 10) || 0;
      (0, _iterator.each)(tableElement.find('tr'), function (_, tr) {
        var td = tr.childNodes[tr.childNodes.length - 1];
        if (td && td.rowSpan === 1 && td.offsetTop <= offset && td.offsetHeight + td.offsetTop > offset) {
          cell = td;
          return false;
        }
        return undefined;
      });
      return getCellPath(tableElement, cell);
    },
    _moveFakeTable: function _moveFakeTable(scrollPos) {
      this._moveFakeTableTop(scrollPos);
      this.callBase();
    },
    _getRowClassNames: function _getRowClassNames(rowIndex, cell, rowClassNames) {
      // @ts-expect-error
      if (rowIndex !== 0 & cell.expanded && !rowClassNames.includes(PIVOTGRID_EXPAND_BORDER)) {
        rowClassNames.push(PIVOTGRID_EXPAND_BORDER);
      }
    },
    _getMainElementMarkup: function _getMainElementMarkup() {
      var tbody = _dom_adapter.default.createElement('tbody');
      tbody.classList.add(this._getAreaClassName());
      return tbody;
    },
    _getCloseMainElementMarkup: function _getCloseMainElementMarkup() {
      return '</tbody>';
    },
    updateColspans: function updateColspans(columnCount) {
      var rows = this.tableElement()[0].rows;
      var columnOffset = 0;
      var columnOffsetResetIndexes = [];
      if (this.getColumnsCount() - columnCount > 0) {
        return;
      }
      for (var i = 0; i < rows.length; i += 1) {
        for (var j = 0; j < rows[i].cells.length; j += 1) {
          var cell = rows[i].cells[j];
          var rowSpan = cell.rowSpan;
          if (columnOffsetResetIndexes[i]) {
            columnOffset -= columnOffsetResetIndexes[i];
            columnOffsetResetIndexes[i] = 0;
          }
          var diff = columnCount - (columnOffset + cell.colSpan);
          if (j === rows[i].cells.length - 1 && diff > 0) {
            cell.colSpan += diff;
          }
          columnOffsetResetIndexes[i + rowSpan] = (columnOffsetResetIndexes[i + rowSpan] || 0) + cell.colSpan;
          columnOffset += cell.colSpan;
        }
      }
    }
  });
  exports.VerticalHeadersArea = VerticalHeadersArea;
  var _default = {
    HorizontalHeadersArea: HorizontalHeadersArea,
    VerticalHeadersArea: VerticalHeadersArea
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/renderer","../../../../core/utils/type","../../../../core/utils/iterator","../../../../ui/scroll_view/ui.scrollable","../../../../core/dom_adapter","../area_item/module"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/renderer"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../ui/scroll_view/ui.scrollable"), require("../../../../core/dom_adapter"), require("../area_item/module"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map