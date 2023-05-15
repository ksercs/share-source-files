!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/gantt/ui.gantt.export_helper.js"], ["../../core/utils/window","../grid_core/ui.grid_core.utils","../../core/utils/type","../../localization/date","../../localization/number"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/gantt/ui.gantt.export_helper.js", ["../../core/utils/window", "../grid_core/ui.grid_core.utils", "../../core/utils/type", "../../localization/date", "../../localization/number"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GanttExportHelper = void 0;
  var _window = $__require("../../core/utils/window");
  var _uiGrid_core = _interopRequireDefault($__require("../grid_core/ui.grid_core.utils"));
  var _type = $__require("../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _number = _interopRequireDefault($__require("../../localization/number"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var TREELIST_EMPTY_SPACE = 'dx-treelist-empty-space';
  var TREELIST_TABLE = 'dx-treelist-table';
  var GanttExportHelper = /*#__PURE__*/function () {
    function GanttExportHelper(gantt) {
      this._gantt = gantt;
      this._treeList = gantt._treeList;
      this._cache = {};
    }
    var _proto = GanttExportHelper.prototype;
    _proto.reset = function reset() {
      this._cache = {};
    };
    _proto.getTreeListTableStyle = function getTreeListTableStyle() {
      var table = this._getTreeListTable();
      var style = window.getComputedStyle(table);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        textAlign: 'left',
        verticalAlign: 'middle'
      };
    };
    _proto.getTreeListColCount = function getTreeListColCount() {
      var headerView = this._getHeaderView();
      var widths = headerView.getColumnWidths().filter(function (w) {
        return w > 0;
      });
      return widths.length;
    };
    _proto.getTreeListHeaderInfo = function getTreeListHeaderInfo(colIndex) {
      var element = this._getHeaderElement(colIndex);
      if (!element) return null;
      var style = window.getComputedStyle(element);
      var styleForExport = {
        color: style.color,
        padding: style.padding,
        paddingLeft: style.paddingLeft,
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        verticalAlign: style.verticalAlign,
        width: this._getColumnWidth(colIndex)
      };
      return {
        content: element.textContent,
        styles: styleForExport
      };
    };
    _proto.getTreeListCellInfo = function getTreeListCellInfo(key, colIndex) {
      var _cell$textContent;
      var node = this._treeList.getNodeByKey(key);
      var visibleRowIndex = this._treeList.getRowIndexByKey(key);
      var cell = visibleRowIndex > -1 ? this._getDataCell(visibleRowIndex, colIndex) : null;
      var style = cell ? window.getComputedStyle(cell) : this._getColumnCellStyle(colIndex);
      var styleForExport = {
        color: style.color,
        padding: style.padding,
        paddingLeft: style.paddingLeft,
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        width: this._getColumnWidth(colIndex)
      };
      if (colIndex === 0) {
        styleForExport.extraLeftPadding = this._getEmptySpaceWidth(node.level);
      }
      return {
        content: (_cell$textContent = cell === null || cell === void 0 ? void 0 : cell.textContent) !== null && _cell$textContent !== void 0 ? _cell$textContent : this._getDisplayText(key, colIndex),
        styles: styleForExport
      };
    };
    _proto.getTreeListEmptyDataCellInfo = function getTreeListEmptyDataCellInfo() {
      return {
        content: this._treeList.option('noDataText')
      };
    };
    _proto._ensureColumnWidthCache = function _ensureColumnWidthCache(colIndex) {
      var _this$_cache, _columnWidths, _this$_cache$_columnW;
      (_this$_cache$_columnW = (_this$_cache = this._cache)[_columnWidths = 'columnWidths']) !== null && _this$_cache$_columnW !== void 0 ? _this$_cache$_columnW : _this$_cache[_columnWidths] = {};
      if (!this._cache['columnWidths'][colIndex]) {
        var _header$clientWidth;
        var header = this._getHeaderElement(colIndex);
        this._cache['columnWidths'][colIndex] = (_header$clientWidth = header === null || header === void 0 ? void 0 : header.clientWidth) !== null && _header$clientWidth !== void 0 ? _header$clientWidth : 0;
      }
    };
    _proto._getColumnWidth = function _getColumnWidth(colIndex) {
      this._ensureColumnWidthCache(colIndex);
      var widths = this._cache['columnWidths'];
      return widths && widths[colIndex];
    };
    _proto._getEmptySpaceWidth = function _getEmptySpaceWidth(level) {
      if (!this._cache['emptyWidth']) {
        var _this$_cache2, _emptyWidth, _this$_cache2$_emptyW, _element$offsetWidth;
        var element = this._getTreeListElement(TREELIST_EMPTY_SPACE);
        (_this$_cache2$_emptyW = (_this$_cache2 = this._cache)[_emptyWidth = 'emptyWidth']) !== null && _this$_cache2$_emptyW !== void 0 ? _this$_cache2$_emptyW : _this$_cache2[_emptyWidth] = (_element$offsetWidth = element.offsetWidth) !== null && _element$offsetWidth !== void 0 ? _element$offsetWidth : 0;
      }
      return this._cache['emptyWidth'] * (level + 1);
    };
    _proto._getColumnCellStyle = function _getColumnCellStyle(colIndex) {
      this._ensureColumnCellStyleCache(colIndex);
      return this._cache['columnStyles'][colIndex];
    };
    _proto._ensureColumnCellStyleCache = function _ensureColumnCellStyleCache(colIndex) {
      var _this$_cache3, _columnStyles, _this$_cache3$_column;
      (_this$_cache3$_column = (_this$_cache3 = this._cache)[_columnStyles = 'columnStyles']) !== null && _this$_cache3$_column !== void 0 ? _this$_cache3$_column : _this$_cache3[_columnStyles] = {};
      if (!this._cache['columnStyles'][colIndex]) {
        var cell = this._getDataCell(0, colIndex);
        this._cache['columnStyles'][colIndex] = window.getComputedStyle(cell);
      }
    };
    _proto._getTask = function _getTask(key) {
      this._ensureTaskCache(key);
      return this._cache['tasks'][key];
    };
    _proto._ensureTaskCache = function _ensureTaskCache(key) {
      var _this$_cache4, _tasks, _this$_cache4$_tasks, _this$_cache$tasks, _this$_cache$tasks$ke;
      (_this$_cache4$_tasks = (_this$_cache4 = this._cache)[_tasks = 'tasks']) !== null && _this$_cache4$_tasks !== void 0 ? _this$_cache4$_tasks : _this$_cache4[_tasks] = {};
      (_this$_cache$tasks$ke = (_this$_cache$tasks = this._cache['tasks'])[key]) !== null && _this$_cache$tasks$ke !== void 0 ? _this$_cache$tasks$ke : _this$_cache$tasks[key] = this._gantt._findTaskByKey(key);
    };
    _proto._getTreeListTable = function _getTreeListTable() {
      return this._getTreeListElement(TREELIST_TABLE);
    };
    _proto._getTreeListElement = function _getTreeListElement(className) {
      return this._treeList._$element.find('.' + className).get(0);
    };
    _proto._getDataCell = function _getDataCell(rowIndex, colIndex) {
      var treeList = this._treeList;
      var cellElement = treeList.getCellElement(rowIndex, colIndex);
      return cellElement && cellElement.length ? cellElement[0] : cellElement;
    };
    _proto._getHeaderElement = function _getHeaderElement(index) {
      return this._getHeaderView().getHeaderElement(index).get(0);
    };
    _proto._getHeaderView = function _getHeaderView() {
      return this._treeList._views.columnHeadersView;
    };
    _proto._getDisplayText = function _getDisplayText(key, colIndex) {
      var task = this._getTask(key);
      return task && this._getGridDisplayText(colIndex, task);
    };
    _proto._getGridDisplayText = function _getGridDisplayText(colIndex, data) {
      var columns = this._treeList.getController('columns').getColumns();
      var column = columns[colIndex];
      var field = column === null || column === void 0 ? void 0 : column.dataField;
      var format = column === null || column === void 0 ? void 0 : column.format;
      var value = _uiGrid_core.default.getDisplayValue(column, data[field], data, 'data');
      if ((0, _type.isDefined)(format)) {
        if ((column === null || column === void 0 ? void 0 : column.dataType) === 'date' || (column === null || column === void 0 ? void 0 : column.dataType) === 'datetime') {
          var date = (0, _type.isDate)(value) ? value : new Date(value);
          return _date.default.format(date, format);
        }
        if ((0, _type.isNumeric)(value)) {
          return _number.default.format(value, format);
        }
      }
      return typeof value === 'string' ? value : value === null || value === void 0 ? void 0 : value.toString();
    };
    return GanttExportHelper;
  }();
  exports.GanttExportHelper = GanttExportHelper;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/window","../grid_core/ui.grid_core.utils","../../core/utils/type","../../localization/date","../../localization/number"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/window"), require("../grid_core/ui.grid_core.utils"), require("../../core/utils/type"), require("../../localization/date"), require("../../localization/number"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.gantt.export_helper.js.map