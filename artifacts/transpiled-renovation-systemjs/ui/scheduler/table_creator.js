!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/table_creator.js"], ["../../core/renderer","../../core/dom_adapter","../../core/element_data","../../core/utils/type","../../core/element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/table_creator.js", ["../../core/renderer", "../../core/dom_adapter", "../../core/element_data", "../../core/utils/type", "../../core/element"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _element_data = $__require("../../core/element_data");
  var _type = $__require("../../core/utils/type");
  var _element = $__require("../../core/element");
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
  var ROW_SELECTOR = 'tr';
  var SchedulerTableCreator = /*#__PURE__*/function () {
    function SchedulerTableCreator() {
      this.VERTICAL = 'vertical';
      this.HORIZONTAL = 'horizontal';
    }
    var _proto = SchedulerTableCreator.prototype;
    _proto.insertAllDayRow = function insertAllDayRow(allDayElements, tableBody, index) {
      if (allDayElements[index]) {
        var row = allDayElements[index].find(ROW_SELECTOR);
        if (!row.length) {
          row = (0, _renderer.default)(_dom_adapter.default.createElement(ROW_SELECTOR));
          row.append(allDayElements[index].get(0));
        }
        tableBody.appendChild(row.get ? row.get(0) : row);
      }
    };
    _proto.makeTable = function makeTable(options) {
      var tableBody = _dom_adapter.default.createElement('tbody');
      var templateCallbacks = [];
      var row;
      var rowCountInGroup = options.groupCount ? options.rowCount / options.groupCount : options.rowCount;
      var allDayElementIndex = 0;
      var allDayElements = options.allDayElements;
      var groupIndex = options.groupIndex;
      var rowCount = options.rowCount;
      (0, _renderer.default)(options.container).append(tableBody);
      if (allDayElements) {
        this.insertAllDayRow(allDayElements, tableBody, 0);
        allDayElementIndex++;
      }
      for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        row = _dom_adapter.default.createElement(ROW_SELECTOR);
        tableBody.appendChild(row);
        var isLastRowInGroup = (rowIndex + 1) % rowCountInGroup === 0;
        if (options.rowClass) {
          row.className = options.rowClass;
        }
        for (var columnIndex = 0; columnIndex < options.cellCount; columnIndex++) {
          var _options$setAdditiona;
          var td = _dom_adapter.default.createElement('td');
          row.appendChild(td);
          if (options.cellClass) {
            if ((0, _type.isFunction)(options.cellClass)) {
              td.className = options.cellClass(rowIndex, columnIndex);
            } else {
              td.className = options.cellClass;
            }
          }
          var cellDataObject = void 0;
          var dataKey = void 0;
          var dataValue = void 0;
          if (options.getCellData) {
            cellDataObject = options.getCellData(td, rowIndex, columnIndex, groupIndex);
            dataKey = cellDataObject.key;
            dataValue = cellDataObject.value;
            dataKey && (0, _element_data.data)(td, dataKey, dataValue);
          }
          (_options$setAdditiona = options.setAdditionalClasses) === null || _options$setAdditiona === void 0 ? void 0 : _options$setAdditiona.call(options, (0, _renderer.default)(td), dataValue);
          if (options.cellTemplate && options.cellTemplate.render) {
            var additionalTemplateData = options.getTemplateData ? options.getTemplateData(rowIndex) : {};
            var templateOptions = {
              model: _extends({
                text: options.getCellText ? options.getCellText(rowIndex, columnIndex) : '',
                date: options.getCellDate ? options.getCellDate(rowIndex) : undefined
              }, additionalTemplateData),
              container: (0, _element.getPublicElement)((0, _renderer.default)(td)),
              index: rowIndex * options.cellCount + columnIndex
            };
            if (dataValue) {
              if (dataValue.startDate) {
                templateOptions.model['startDate'] = dataValue.startDate;
              }
              if (dataValue.endDate) {
                templateOptions.model['endDate'] = dataValue.endDate;
              }
              if (dataValue.groups) {
                templateOptions.model['groups'] = dataValue.groups;
              }
              if (dataValue.allDay) {
                templateOptions.model['allDay'] = dataValue.allDay;
              }
            }
            templateCallbacks.push(options.cellTemplate.render.bind(options.cellTemplate, templateOptions));
          } else {
            if (options.getCellText) {
              (0, _renderer.default)('<div>').text(options.getCellText(rowIndex, columnIndex)).addClass(options.getCellTextClass).appendTo((0, _renderer.default)(td));
            }
          }
        }
        if (allDayElements && isLastRowInGroup) {
          this.insertAllDayRow(allDayElements, tableBody, allDayElementIndex);
          allDayElementIndex++;
        }
      }
      return templateCallbacks;
    };
    _proto.makeGroupedTable = function makeGroupedTable(type, groups, cssClasses, cellCount, cellTemplate, rowCount, groupByDate) {
      var rows = [];
      if (type === this.VERTICAL) {
        rows = this._makeVerticalGroupedRows(groups, cssClasses, cellTemplate, rowCount);
      } else {
        rows = this._makeHorizontalGroupedRows(groups, cssClasses, cellCount, cellTemplate, groupByDate);
      }
      return rows;
    };
    _proto.makeGroupedTableFromJSON = function makeGroupedTableFromJSON(type, data, config) {
      var table;
      var cellStorage = [];
      var rowIndex = 0;
      config = config || {};
      var cellTag = config.cellTag || 'td';
      var childrenField = config.childrenField || 'children';
      var titleField = config.titleField || 'title';
      var groupTableClass = config.groupTableClass;
      var groupRowClass = config.groupRowClass;
      var groupCellClass = config.groupCellClass;
      var groupCellCustomContent = config.groupCellCustomContent;
      function createTable() {
        table = _dom_adapter.default.createElement('table');
        if (groupTableClass) {
          table.className = groupTableClass;
        }
      }
      function getChildCount(item) {
        if (item[childrenField]) {
          return item[childrenField].length;
        }
        return 0;
      }
      function createCell(text, childCount, index, data) {
        var cell = {
          element: _dom_adapter.default.createElement(cellTag),
          childCount: childCount
        };
        if (groupCellClass) {
          cell.element.className = groupCellClass;
        }
        var cellText = _dom_adapter.default.createTextNode(text);
        if (typeof groupCellCustomContent === 'function') {
          groupCellCustomContent(cell.element, cellText, index, data);
        } else {
          cell.element.appendChild(cellText);
        }
        return cell;
      }
      function generateCells(data) {
        for (var i = 0; i < data.length; i++) {
          var childCount = getChildCount(data[i]);
          var cell = createCell(data[i][titleField], childCount, i, data[i]);
          if (!cellStorage[rowIndex]) {
            cellStorage[rowIndex] = [];
          }
          cellStorage[rowIndex].push(cell);
          if (childCount) {
            generateCells(data[i][childrenField]);
          } else {
            rowIndex++;
          }
        }
      }
      function putCellsToRows() {
        cellStorage.forEach(function (cells) {
          var row = _dom_adapter.default.createElement(ROW_SELECTOR);
          if (groupRowClass) {
            row.className = groupRowClass;
          }
          var rowspans = [];
          for (var i = cells.length - 1; i >= 0; i--) {
            var prev = cells[i + 1];
            var rowspan = cells[i].childCount;
            if (prev && prev.childCount) {
              rowspan *= prev.childCount;
            }
            rowspans.push(rowspan);
          }
          rowspans.reverse();
          cells.forEach(function (cell, index) {
            if (rowspans[index]) {
              cell.element.setAttribute('rowSpan', rowspans[index]);
            }
            row.appendChild(cell.element);
          });
          table.appendChild(row);
        });
      }
      createTable();
      generateCells(data);
      putCellsToRows();
      return table;
    };
    _proto._makeFlexGroupedRowCells = function _makeFlexGroupedRowCells(group, repeatCount, cssClasses, cellTemplate) {
      var repeatByDate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var cells = [];
      var items = group.items;
      var itemCount = items.length;
      for (var i = 0; i < repeatCount * repeatByDate; i++) {
        for (var j = 0; j < itemCount; j++) {
          var $container = (0, _renderer.default)('<div>');
          var cell = {};
          if (cellTemplate && cellTemplate.render) {
            var templateOptions = {
              model: items[j],
              container: (0, _element.getPublicElement)($container),
              index: i * itemCount + j
            };
            if (group.data) {
              templateOptions.model.data = group.data[j];
            }
            cell.template = cellTemplate.render.bind(cellTemplate, templateOptions);
          } else {
            $container.text(items[j].text).attr('title', items[j].text).addClass('dx-scheduler-group-header-content');
            $container = (0, _renderer.default)('<div>').append($container);
          }
          var cssClass = (0, _type.isFunction)(cssClasses.groupHeaderClass) ? cssClasses.groupHeaderClass(j) : cssClasses.groupHeaderClass;
          cell.element = $container.addClass(cssClass);
          cells.push(cell);
        }
      }
      return cells;
    };
    _proto._makeVerticalGroupedRows = function _makeVerticalGroupedRows(groups, cssClasses, cellTemplate) {
      var cellTemplates = [];
      var repeatCount = 1;
      var cellsArray = [];
      var cellIterator = function cellIterator(cell) {
        if (cell.template) {
          cellTemplates.push(cell.template);
        }
      };
      for (var i = 0; i < groups.length; i++) {
        if (i > 0) {
          repeatCount = groups[i - 1].items.length * repeatCount;
        }
        var cells = this._makeFlexGroupedRowCells(groups[i], repeatCount, cssClasses, cellTemplate);
        cells.forEach(cellIterator);
        cellsArray.push(cells);
      }
      var rows = [];
      var groupCount = cellsArray.length;
      for (var _i = 0; _i < groupCount; _i++) {
        rows.push((0, _renderer.default)('<div>').addClass(cssClasses.groupHeaderRowClass));
      }
      for (var _i2 = groupCount - 1; _i2 >= 0; _i2--) {
        var currentColumnLength = cellsArray[_i2].length;
        for (var j = 0; j < currentColumnLength; j++) {
          rows[_i2].append(cellsArray[_i2][j].element);
        }
      }
      return {
        elements: (0, _renderer.default)('<div>').addClass('dx-scheduler-group-flex-container').append(rows),
        cellTemplates: cellTemplates
      };
    };
    _proto._makeHorizontalGroupedRows = function _makeHorizontalGroupedRows(groups, cssClasses, cellCount, cellTemplate, groupByDate) {
      var repeatCount = 1;
      var groupCount = groups.length;
      var rows = [];
      var cellTemplates = [];
      var repeatByDate = groupByDate ? cellCount : 1;
      var cellIterator = function cellIterator(cell) {
        if (cell.template) {
          cellTemplates.push(cell.template);
        }
        return cell.element;
      };
      for (var i = 0; i < groupCount; i++) {
        if (i > 0) {
          repeatCount = groups[i - 1].items.length * repeatCount;
        }
        var cells = this._makeGroupedRowCells(groups[i], repeatCount, cssClasses, cellTemplate, repeatByDate);
        rows.push((0, _renderer.default)('<tr>').addClass(cssClasses.groupRowClass).append(cells.map(cellIterator)));
      }
      var maxCellCount = rows[groupCount - 1].find('th').length;
      for (var j = 0; j < groupCount; j++) {
        var $cell = rows[j].find('th');
        var colspan = maxCellCount / $cell.length;
        if (!groupByDate) {
          colspan = colspan * cellCount;
        }
        if (colspan > 1 && repeatByDate === 1 || groupByDate && groupCount > 1) {
          $cell.attr('colSpan', colspan);
        }
      }
      return {
        elements: rows,
        cellTemplates: cellTemplates
      };
    };
    _proto._makeGroupedRowCells = function _makeGroupedRowCells(group, repeatCount, cssClasses, cellTemplate, repeatByDate) {
      repeatByDate = repeatByDate || 1;
      repeatCount = repeatCount * repeatByDate;
      var cells = [];
      var items = group.items;
      var itemCount = items.length;
      for (var i = 0; i < repeatCount; i++) {
        for (var j = 0; j < itemCount; j++) {
          var $container = (0, _renderer.default)('<div>');
          var cell = {};
          if (cellTemplate && cellTemplate.render) {
            var templateOptions = {
              model: items[j],
              container: (0, _element.getPublicElement)($container),
              index: i * itemCount + j
            };
            if (group.data) {
              templateOptions.model.data = group.data[j];
            }
            cell.template = cellTemplate.render.bind(cellTemplate, templateOptions);
          } else {
            $container.text(items[j].text);
            $container = (0, _renderer.default)('<div>').append($container);
          }
          $container.addClass(cssClasses.groupHeaderContentClass);
          var cssClass = void 0;
          if ((0, _type.isFunction)(cssClasses.groupHeaderClass)) {
            cssClass = cssClasses.groupHeaderClass(j);
          } else {
            cssClass = cssClasses.groupHeaderClass;
          }
          cell.element = (0, _renderer.default)('<th>').addClass(cssClass).append($container);
          cells.push(cell);
        }
      }
      return cells;
    };
    return SchedulerTableCreator;
  }();
  var _default = {
    tableCreator: new SchedulerTableCreator()
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/dom_adapter","../../core/element_data","../../core/utils/type","../../core/element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/dom_adapter"), require("../../core/element_data"), require("../../core/utils/type"), require("../../core/element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=table_creator.js.map