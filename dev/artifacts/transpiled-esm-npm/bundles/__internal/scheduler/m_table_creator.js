"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _element = require("../../core/element");
var _element_data = require("../../core/element_data");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    var _a;
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
        (_a = options.setAdditionalClasses) === null || _a === void 0 ? void 0 : _a.call(options, (0, _renderer.default)(td), dataValue);
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
              templateOptions.model.startDate = dataValue.startDate;
            }
            if (dataValue.endDate) {
              templateOptions.model.endDate = dataValue.endDate;
            }
            if (dataValue.groups) {
              templateOptions.model.groups = dataValue.groups;
            }
            if (dataValue.allDay) {
              templateOptions.model.allDay = dataValue.allDay;
            }
          }
          templateCallbacks.push(options.cellTemplate.render.bind(options.cellTemplate, templateOptions));
        } else if (options.getCellText) {
          (0, _renderer.default)('<div>').text(options.getCellText(rowIndex, columnIndex)).addClass(options.getCellTextClass).appendTo((0, _renderer.default)(td));
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
    var _config = config,
      groupTableClass = _config.groupTableClass;
    var _config2 = config,
      groupRowClass = _config2.groupRowClass;
    var _config3 = config,
      groupCellClass = _config3.groupCellClass;
    var _config4 = config,
      groupCellCustomContent = _config4.groupCellCustomContent;
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
        childCount
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
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._makeVerticalGroupedRows = function _makeVerticalGroupedRows(groups, cssClasses, cellTemplate, rowCount) {
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
        // eslint-disable-next-line operator-assignment
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
      cellTemplates
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
        // eslint-disable-next-line operator-assignment
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
        colspan *= cellCount;
      }
      if (colspan > 1 && repeatByDate === 1 || groupByDate && groupCount > 1) {
        $cell.attr('colSpan', colspan);
      }
    }
    return {
      elements: rows,
      cellTemplates
    };
  };
  _proto._makeGroupedRowCells = function _makeGroupedRowCells(group, repeatCount, cssClasses, cellTemplate, repeatByDate) {
    repeatByDate = repeatByDate || 1;
    repeatCount *= repeatByDate;
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