!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/area_item/module.js"], ["../../../../core/utils/size","../../../../core/renderer","../../../../core/class","../../../../core/element","../../../../core/utils/extend","../../../../core/utils/position","../../../../core/utils/type","../../../../core/utils/style","../../../../core/dom_adapter","../../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/area_item/module.js", ["../../../../core/utils/size", "../../../../core/renderer", "../../../../core/class", "../../../../core/element", "../../../../core/utils/extend", "../../../../core/utils/position", "../../../../core/utils/type", "../../../../core/utils/style", "../../../../core/dom_adapter", "../../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getRealElementWidth = exports.default = exports.AreaItem = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _element = $__require("../../../../core/element");
  var _extend = $__require("../../../../core/utils/extend");
  var _position = $__require("../../../../core/utils/position");
  var _type = $__require("../../../../core/utils/type");
  var _style = $__require("../../../../core/utils/style");
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _getMemoizeScrollTo2 = $__require("../../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var PIVOTGRID_EXPAND_CLASS = 'dx-expand';
  var getRealElementWidth = function getRealElementWidth(element) {
    var width = 0;
    var offsetWidth = element.offsetWidth;
    if (element.getBoundingClientRect) {
      var clientRect = (0, _position.getBoundingRect)(element);
      width = clientRect.width;
      if (!width) {
        width = clientRect.right - clientRect.left;
      }
      if (width <= offsetWidth - 1) {
        width = offsetWidth;
      }
    }
    return width > 0 ? width : offsetWidth;
  };
  exports.getRealElementWidth = getRealElementWidth;
  function getFakeTableOffset(scrollPos, elementOffset, tableSize, viewPortSize) {
    var offset = 0;
    var halfTableCount = 0;
    var halfTableSize = tableSize / 2;
    if (scrollPos + viewPortSize - (elementOffset + tableSize) > 1) {
      if (scrollPos >= elementOffset + tableSize + halfTableSize) {
        halfTableCount = parseInt((scrollPos - (elementOffset + tableSize)) / halfTableSize, 10);
      }
      offset = elementOffset + tableSize + halfTableSize * halfTableCount;
    } else if (scrollPos < elementOffset) {
      if (scrollPos <= elementOffset - halfTableSize) {
        halfTableCount = parseInt((scrollPos - (elementOffset - halfTableSize)) / halfTableSize, 10);
      }
      offset = elementOffset - (tableSize - halfTableSize * halfTableCount);
    } else {
      offset = elementOffset;
    }
    return offset;
  }
  var AreaItem = _class.default.inherit({
    ctor: function ctor(component) {
      this.component = component;
    },
    option: function option() {
      return this.component.option.apply(this.component, arguments);
    },
    _getRowElement: function _getRowElement(index) {
      var that = this;
      if (that._tableElement && that._tableElement.length > 0) {
        return that._tableElement[0].rows[index];
      }
      return null;
    },
    _createGroupElement: function _createGroupElement() {
      return (0, _renderer.default)('<div>');
    },
    _createTableElement: function _createTableElement() {
      return (0, _renderer.default)('<table>');
    },
    _getCellText: function _getCellText(cell, encodeHtml) {
      var cellText = cell.isWhiteSpace ? '&nbsp' : cell.text || '&nbsp';
      if (encodeHtml && (cellText.indexOf('<') !== -1 || cellText.indexOf('>') !== -1)) {
        cellText = (0, _renderer.default)('<div>').text(cellText).html();
      }
      return cellText;
    },
    _getRowClassNames: function _getRowClassNames() {},
    _applyCustomStyles: function _applyCustomStyles(options) {
      if (options.cell.width) {
        options.cssArray.push("min-width:".concat(options.cell.width, "px"));
      }
      if (options.cell.sorted) {
        options.classArray.push('dx-pivotgrid-sorted');
      }
    },
    _getMainElementMarkup: function _getMainElementMarkup() {
      return _dom_adapter.default.createElement('tbody');
    },
    _getCloseMainElementMarkup: function _getCloseMainElementMarkup() {
      return '</tbody>';
    },
    _renderTableContent: function _renderTableContent(tableElement, data) {
      var that = this;
      var rowsCount = data.length;
      var row;
      var cell;
      var i;
      var j;
      var rowElement;
      var cellElement;
      var cellText;
      var rtlEnabled = that.option('rtlEnabled');
      var encodeHtml = that.option('encodeHtml');
      var rowClassNames;
      tableElement.data('area', that._getAreaName());
      tableElement.data('data', data);
      tableElement.css('width', '');
      var tbody = this._getMainElementMarkup();
      for (i = 0; i < rowsCount; i += 1) {
        row = data[i];
        rowClassNames = [];
        var tr = _dom_adapter.default.createElement('tr');
        for (j = 0; j < row.length; j += 1) {
          cell = row[j];
          this._getRowClassNames(i, cell, rowClassNames);
          var td = _dom_adapter.default.createElement('td');
          if (cell) {
            cell.rowspan && td.setAttribute('rowspan', cell.rowspan || 1);
            cell.colspan && td.setAttribute('colspan', cell.colspan || 1);
            var styleOptions = {
              cellElement: cellElement,
              cell: cell,
              cellsCount: row.length,
              cellIndex: j,
              rowElement: rowElement,
              rowIndex: i,
              rowsCount: rowsCount,
              rtlEnabled: rtlEnabled,
              classArray: [],
              cssArray: []
            };
            that._applyCustomStyles(styleOptions);
            if (styleOptions.cssArray.length) {
              (0, _style.setStyle)(td, styleOptions.cssArray.join(';'));
            }
            if (styleOptions.classArray.length) {
              td.setAttribute('class', styleOptions.classArray.join(' '));
            }
            if ((0, _type.isDefined)(cell.expanded)) {
              var div = _dom_adapter.default.createElement('div');
              div.classList.add('dx-expand-icon-container');
              var _span = _dom_adapter.default.createElement('span');
              _span.classList.add(PIVOTGRID_EXPAND_CLASS);
              div.appendChild(_span);
              td.appendChild(div);
            }
            cellText = this._getCellText(cell, encodeHtml);
          } else {
            cellText = '';
          }
          var span = _dom_adapter.default.createElement('span');
          if ((0, _type.isDefined)(cell.wordWrapEnabled)) {
            span.style.whiteSpace = cell.wordWrapEnabled ? 'normal' : 'nowrap';
          }
          span.innerHTML = cellText;
          td.appendChild(span);
          if (cell.sorted) {
            var _span2 = _dom_adapter.default.createElement('span');
            _span2.classList.add('dx-icon-sorted');
            td.appendChild(_span2);
          }
          tr.appendChild(td);
        }
        if (rowClassNames.length) {
          tr.setAttribute('class', rowClassNames.join(' '));
        }
        tbody.appendChild(tr);
      }
      tableElement.append(tbody);
      this._triggerOnCellPrepared(tableElement, data);
    },
    _triggerOnCellPrepared: function _triggerOnCellPrepared(tableElement, data) {
      var that = this;
      var rowElements = tableElement.find('tr');
      var areaName = that._getAreaName();
      var onCellPrepared = that.option('onCellPrepared');
      var hasEvent = that.component._eventsStrategy.hasEvent('cellPrepared');
      var rowElement;
      var $cellElement;
      var onCellPreparedArgs;
      var defaultActionArgs = this.component._defaultActionArgs();
      var row;
      var cell;
      var rowIndex;
      var columnIndex;
      if (onCellPrepared || hasEvent) {
        for (rowIndex = 0; rowIndex < data.length; rowIndex += 1) {
          row = data[rowIndex];
          rowElement = rowElements.eq(rowIndex);
          for (columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
            cell = row[columnIndex];
            $cellElement = rowElement.children().eq(columnIndex);
            onCellPreparedArgs = {
              area: areaName,
              rowIndex: rowIndex,
              columnIndex: columnIndex,
              cellElement: (0, _element.getPublicElement)($cellElement),
              cell: cell
            };
            if (hasEvent) {
              that.component._trigger('onCellPrepared', onCellPreparedArgs);
            } else {
              onCellPrepared((0, _extend.extend)(onCellPreparedArgs, defaultActionArgs));
            }
          }
        }
      }
    },
    _getRowHeight: function _getRowHeight(index) {
      var row = this._getRowElement(index);
      var height = 0;
      var offsetHeight = row.offsetHeight;
      if (row && row.lastChild) {
        if (row.getBoundingClientRect) {
          var clientRect = (0, _position.getBoundingRect)(row);
          height = clientRect.height;
          if (height <= offsetHeight - 1) {
            height = offsetHeight;
          }
        }
        return height > 0 ? height : offsetHeight;
      }
      return 0;
    },
    _setRowHeight: function _setRowHeight(index, value) {
      var row = this._getRowElement(index);
      if (row) {
        row.style.height = "".concat(value, "px");
      }
    },
    getRowsLength: function getRowsLength() {
      var that = this;
      if (that._tableElement && that._tableElement.length > 0) {
        return that._tableElement[0].rows.length;
      }
      return 0;
    },
    getRowsHeight: function getRowsHeight() {
      var that = this;
      var result = [];
      var rowsLength = that.getRowsLength();
      for (var i = 0; i < rowsLength; i += 1) {
        result.push(that._getRowHeight(i));
      }
      return result;
    },
    setRowsHeight: function setRowsHeight(values) {
      var that = this;
      var totalHeight = 0;
      var valuesLength = values.length;
      for (var i = 0; i < valuesLength; i += 1) {
        totalHeight += values[i];
        that._setRowHeight(i, values[i]);
      }
      this._tableHeight = totalHeight;
      this._tableElement[0].style.height = "".concat(totalHeight, "px");
    },
    getColumnsWidth: function getColumnsWidth() {
      var rowsLength = this.getRowsLength();
      var rowIndex;
      var row;
      var i;
      var columnIndex;
      var processedCells = [];
      var result = [];
      var fillCells = function fillCells(cells, rowIndex, columnIndex, rowSpan, colSpan) {
        var rowOffset;
        var columnOffset;
        for (rowOffset = 0; rowOffset < rowSpan; rowOffset += 1) {
          for (columnOffset = 0; columnOffset < colSpan; columnOffset += 1) {
            cells[rowIndex + rowOffset] = cells[rowIndex + rowOffset] || [];
            cells[rowIndex + rowOffset][columnIndex + columnOffset] = true;
          }
        }
      };
      if (rowsLength) {
        for (rowIndex = 0; rowIndex < rowsLength; rowIndex += 1) {
          processedCells[rowIndex] = processedCells[rowIndex] || [];
          row = this._getRowElement(rowIndex);
          for (i = 0; i < row.cells.length; i += 1) {
            for (columnIndex = 0; processedCells[rowIndex][columnIndex]; columnIndex += 1);
            fillCells(processedCells, rowIndex, columnIndex, row.cells[i].rowSpan, row.cells[i].colSpan);
            if (row.cells[i].colSpan === 1) {
              result[columnIndex] = result[columnIndex] || getRealElementWidth(row.cells[i]);
            }
          }
        }
      }
      return result;
    },
    setColumnsWidth: function setColumnsWidth(values) {
      var i;
      var tableElement = this._tableElement[0];
      this._colgroupElement.html('');
      var columnsCount = this.getColumnsCount();
      var columnWidth = [];
      for (i = 0; i < columnsCount; i += 1) {
        columnWidth.push(values[i] || 0);
      }
      for (i = columnsCount; i < values.length && values; i += 1) {
        columnWidth[columnsCount - 1] += values[i];
      }
      for (i = 0; i < columnsCount; i += 1) {
        var col = _dom_adapter.default.createElement('col');
        col.style.width = "".concat(columnWidth[i], "px");
        this._colgroupElement.append(col);
      }
      this._tableWidth = columnWidth.reduce(function (sum, width) {
        return sum + width;
      }, 0);
      tableElement.style.width = "".concat(this._tableWidth, "px");
      tableElement.style.tableLayout = 'fixed';
    },
    resetColumnsWidth: function resetColumnsWidth() {
      (0, _size.setWidth)(this._colgroupElement.find('col'), 'auto');
      this._tableElement.css({
        width: '',
        tableLayout: ''
      });
    },
    setGroupWidth: function setGroupWidth(value) {
      this._getScrollable().option('width', value);
    },
    setGroupHeight: function setGroupHeight(value) {
      this._getScrollable().option('height', value);
    },
    getGroupHeight: function getGroupHeight() {
      return this._getGroupElementSize('height');
    },
    getGroupWidth: function getGroupWidth() {
      return this._getGroupElementSize('width');
    },
    _getGroupElementSize: function _getGroupElementSize(dimension) {
      var size = this.groupElement()[0].style[dimension];
      if (size.indexOf('px') > 0) {
        return parseFloat(size);
      }
      return null;
    },
    groupElement: function groupElement() {
      return this._groupElement;
    },
    tableElement: function tableElement() {
      return this._tableElement;
    },
    element: function element() {
      return this._rootElement;
    },
    headElement: function headElement() {
      return this._tableElement.find('thead');
    },
    _setTableCss: function _setTableCss(styles) {
      if (this.option('rtlEnabled')) {
        styles.right = styles.left;
        delete styles.left;
      }
      this.tableElement().css(styles);
    },
    setVirtualContentParams: function setVirtualContentParams(params) {
      this._virtualContent.css({
        width: params.width,
        height: params.height
      });
      var scrollable = this._getScrollable();
      if (scrollable === null || scrollable === void 0 ? void 0 : scrollable.isRenovated()) {
        this._getScrollable().option('classes', 'dx-virtual-mode');
      } else {
        this.groupElement().addClass('dx-virtual-mode');
      }
    },
    disableVirtualMode: function disableVirtualMode() {
      var scrollable = this._getScrollable();
      if (scrollable === null || scrollable === void 0 ? void 0 : scrollable.isRenovated()) {
        this._getScrollable().option('classes', '');
      } else {
        this.groupElement().removeClass('dx-virtual-mode');
      }
    },
    _renderVirtualContent: function _renderVirtualContent() {
      var that = this;
      if (!that._virtualContent && that.option('scrolling.mode') === 'virtual') {
        that._virtualContent = (0, _renderer.default)('<div>').addClass('dx-virtual-content').insertBefore(that._tableElement);
      }
    },
    reset: function reset() {
      var that = this;
      var tableElement = that._tableElement[0];
      that._fakeTable && that._fakeTable.detach();
      that._fakeTable = null;
      that.disableVirtualMode();
      that.setGroupWidth('100%');
      that.setGroupHeight('auto');
      that.resetColumnsWidth();
      if (tableElement) {
        for (var i = 0; i < tableElement.rows.length; i += 1) {
          tableElement.rows[i].style.height = '';
        }
        tableElement.style.height = '';
        tableElement.style.width = '100%';
      }
    },
    _updateFakeTableVisibility: function _updateFakeTableVisibility() {
      var that = this;
      var tableElement = that.tableElement()[0];
      var horizontalOffsetName = that.option('rtlEnabled') ? 'right' : 'left';
      var fakeTableElement = that._fakeTable[0];
      if (tableElement.style.top === fakeTableElement.style.top && fakeTableElement.style[horizontalOffsetName] === tableElement.style[horizontalOffsetName]) {
        that._fakeTable.addClass('dx-hidden');
      } else {
        that._fakeTable.removeClass('dx-hidden');
      }
    },
    _moveFakeTableHorizontally: function _moveFakeTableHorizontally(scrollPos) {
      var that = this;
      var rtlEnabled = that.option('rtlEnabled');
      var offsetStyleName = rtlEnabled ? 'right' : 'left';
      var tableElementOffset = parseFloat(that.tableElement()[0].style[offsetStyleName]);
      var offset = getFakeTableOffset(scrollPos, tableElementOffset, that._tableWidth, that.getGroupWidth());
      if (parseFloat(that._fakeTable[0].style[offsetStyleName]) !== offset) {
        that._fakeTable[0].style[offsetStyleName] = "".concat(offset, "px");
      }
    },
    _moveFakeTableTop: function _moveFakeTableTop(scrollPos) {
      var that = this;
      var tableElementOffsetTop = parseFloat(that.tableElement()[0].style.top);
      var offsetTop = getFakeTableOffset(scrollPos, tableElementOffsetTop, that._tableHeight, that.getGroupHeight());
      if (parseFloat(that._fakeTable[0].style.top) !== offsetTop) {
        that._fakeTable[0].style.top = "".concat(offsetTop, "px");
      }
    },
    _moveFakeTable: function _moveFakeTable() {
      this._updateFakeTableVisibility();
    },
    _createFakeTable: function _createFakeTable() {
      var that = this;
      if (!that._fakeTable) {
        that._fakeTable = that.tableElement().clone().addClass('dx-pivot-grid-fake-table').appendTo(that._virtualContent);
      }
    },
    render: function render(rootElement, data) {
      var that = this;
      if (that._tableElement) {
        try {
          that._tableElement[0].innerHTML = '';
        } catch (e) {
          that._tableElement.empty();
        }
        that._tableElement.attr('style', '');
      } else {
        that._groupElement = that._createGroupElement();
        that._tableElement = that._createTableElement();
        that._tableElement.appendTo(that._groupElement);
        that._groupElement.appendTo(rootElement);
        that._rootElement = rootElement;
      }
      that._colgroupElement = (0, _renderer.default)('<colgroup>').appendTo(that._tableElement);
      that._renderTableContent(that._tableElement, data);
      that._renderVirtualContent();
    },
    _getScrollable: function _getScrollable() {
      return this.groupElement().data('dxScrollable');
    },
    _getMemoizeScrollTo: function _getMemoizeScrollTo() {
      var _this = this;
      var _a;
      this._memoizeScrollTo = (_a = this._memoizeScrollTo) !== null && _a !== void 0 ? _a : (0, _getMemoizeScrollTo2.getMemoizeScrollTo)(function () {
        return _this._getScrollable();
      });
      return this._memoizeScrollTo;
    },
    _getMaxLeftOffset: function _getMaxLeftOffset(scrollable) {
      var containerElement = (0, _renderer.default)(scrollable.container()).get(0);
      return containerElement.scrollWidth - containerElement.clientWidth;
    },
    on: function on(eventName, handler) {
      var that = this;
      var scrollable = that._getScrollable();
      if (scrollable) {
        scrollable.on(eventName, function (e) {
          if (that.option('rtlEnabled') && (0, _type.isDefined)(e.scrollOffset.left)) {
            e.scrollOffset.left = that._getMaxLeftOffset(scrollable) - e.scrollOffset.left;
          }
          handler(e);
        });
      }
      return this;
    },
    off: function off(eventName) {
      var scrollable = this._getScrollable();
      if (scrollable) {
        scrollable.off(eventName);
      }
      return this;
    },
    scrollTo: function scrollTo(pos) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scrollable = this._getScrollable();
      if (!scrollable) {
        return;
      }
      var rtlEnabled = this.option('rtlEnabled');
      var areaName = this._getAreaName();
      var scrollablePos = _extends(_extends({}, pos), {
        left: rtlEnabled && (areaName === 'column' || areaName === 'data') ? this._getMaxLeftOffset(scrollable) - pos.left : pos.left
      });
      var memoizeScrollTo = this._getMemoizeScrollTo();
      memoizeScrollTo(scrollablePos, force);
      if (this._virtualContent) {
        this._createFakeTable();
        this._moveFakeTable(pos);
      }
    },
    updateScrollable: function updateScrollable() {
      var scrollable = this._getScrollable();
      if (scrollable) {
        return scrollable.update();
      }
      return undefined;
    },
    getColumnsCount: function getColumnsCount() {
      var columnCount = 0;
      var row = this._getRowElement(0);
      var cells;
      if (row) {
        cells = row.cells;
        // eslint-disable-next-line no-plusplus
        for (var i = 0, len = cells.length; i < len; ++i) {
          columnCount += cells[i].colSpan;
        }
      }
      return columnCount;
    },
    getData: function getData() {
      var tableElement = this._tableElement;
      return tableElement ? tableElement.data('data') : [];
    }
  });
  exports.AreaItem = AreaItem;
  var _default = {
    AreaItem: AreaItem,
    getRealElementWidth: getRealElementWidth
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/renderer","../../../../core/class","../../../../core/element","../../../../core/utils/extend","../../../../core/utils/position","../../../../core/utils/type","../../../../core/utils/style","../../../../core/dom_adapter","../../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/renderer"), require("../../../../core/class"), require("../../../../core/element"), require("../../../../core/utils/extend"), require("../../../../core/utils/position"), require("../../../../core/utils/type"), require("../../../../core/utils/style"), require("../../../../core/dom_adapter"), require("../../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map