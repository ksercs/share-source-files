/**
* DevExtreme (cjs/__internal/grids/grid_core/sorting/m_sorting.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortingModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_sorting_mixin = _interopRequireDefault(require("./m_sorting_mixin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var COLUMN_HEADERS_VIEW_NAMESPACE = 'dxDataGridColumnHeadersView';
var ColumnHeadersViewSortingExtender = (0, _extend.extend)({}, _m_sorting_mixin.default, {
  _createRow(row) {
    var _this = this;
    var $row = this.callBase(row);
    if (row.rowType === 'header') {
      _events_engine.default.on($row, (0, _index.addNamespace)(_click.name, COLUMN_HEADERS_VIEW_NAMESPACE), 'td', this.createAction(function (e) {
        _this._processHeaderAction(e.event, $row);
      }));
    }
    return $row;
  },
  _processHeaderAction(event, $row) {
    if ((0, _renderer.default)(event.currentTarget).parent().get(0) !== $row.get(0)) {
      return;
    }
    var that = this;
    var keyName = null;
    var $cellElementFromEvent = (0, _renderer.default)(event.currentTarget);
    var rowIndex = $cellElementFromEvent.parent().index();
    var columnIndex = -1;
    // eslint-disable-next-line array-callback-return
    [].slice.call(that.getCellElements(rowIndex)).some(function ($cellElement, index) {
      if ($cellElement === $cellElementFromEvent.get(0)) {
        columnIndex = index;
        return true;
      }
      return undefined;
    });
    var visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
    var column = visibleColumns[columnIndex];
    var editingController = that.getController('editing');
    var editingMode = that.option('editing.mode');
    var isCellEditing = editingController && editingController.isEditing() && (editingMode === 'batch' || editingMode === 'cell');
    if (isCellEditing || !that._isSortableElement((0, _renderer.default)(event.target))) {
      return;
    }
    if (column && !(0, _type.isDefined)(column.groupIndex) && !column.command) {
      if (event.shiftKey) {
        keyName = 'shift';
      } else if ((0, _index.isCommandKeyPressed)(event)) {
        keyName = 'ctrl';
      }
      setTimeout(function () {
        that._columnsController.changeSortOrder(column.index, keyName);
      });
    }
  },
  _renderCellContent($cell, options) {
    var that = this;
    var column = options.column;
    if (!column.command && options.rowType === 'header') {
      that._applyColumnState({
        name: 'sort',
        rootElement: $cell,
        column,
        showColumnLines: that.option('showColumnLines')
      });
    }
    this.callBase.apply(this, arguments);
  },
  _columnOptionChanged(e) {
    var changeTypes = e.changeTypes;
    if (changeTypes.length === 1 && changeTypes.sorting) {
      this._updateIndicators('sort');
      return;
    }
    this.callBase(e);
  },
  optionChanged(args) {
    var that = this;
    switch (args.name) {
      case 'sorting':
        that._invalidate();
        args.handled = true;
        break;
      default:
        that.callBase(args);
    }
  }
});
var HeaderPanelSortingExtender = (0, _extend.extend)({}, _m_sorting_mixin.default, {
  _createGroupPanelItem($rootElement, groupColumn) {
    var that = this;
    var $item = that.callBase.apply(that, arguments);
    _events_engine.default.on($item, (0, _index.addNamespace)(_click.name, 'dxDataGridHeaderPanel'), that.createAction(function () {
      that._processGroupItemAction(groupColumn.index);
    }));
    that._applyColumnState({
      name: 'sort',
      rootElement: $item,
      column: {
        alignment: that.option('rtlEnabled') ? 'right' : 'left',
        allowSorting: groupColumn.allowSorting,
        sortOrder: groupColumn.sortOrder === 'desc' ? 'desc' : 'asc',
        isGrouped: true
      },
      showColumnLines: true
    });
    return $item;
  },
  _processGroupItemAction(groupColumnIndex) {
    var _this2 = this;
    setTimeout(function () {
      return _this2.getController('columns').changeSortOrder(groupColumnIndex);
    });
  },
  optionChanged(args) {
    var that = this;
    switch (args.name) {
      case 'sorting':
        that._invalidate();
        args.handled = true;
        break;
      default:
        that.callBase(args);
    }
  }
});
var sortingModule = {
  defaultOptions() {
    return {
      sorting: {
        mode: 'single',
        ascendingText: _message.default.format('dxDataGrid-sortingAscendingText'),
        descendingText: _message.default.format('dxDataGrid-sortingDescendingText'),
        clearText: _message.default.format('dxDataGrid-sortingClearText'),
        showSortIndexes: true
      }
    };
  },
  extenders: {
    views: {
      columnHeadersView: ColumnHeadersViewSortingExtender,
      headerPanel: HeaderPanelSortingExtender
    }
  }
};
exports.sortingModule = sortingModule;
