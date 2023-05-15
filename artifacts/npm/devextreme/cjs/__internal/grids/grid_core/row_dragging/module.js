/**
* DevExtreme (cjs/__internal/grids/grid_core/row_dragging/module.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowDraggingModule = void 0;
var _size = require("../../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../../core/../core/renderer"));
var _extend = require("../../../../core/../core/utils/extend");
var _sortable = _interopRequireDefault(require("../../../../ui/sortable"));
var _common = require("../../../../core/utils/common");
var _module_utils = _interopRequireDefault(require("../module_utils"));
var _dom = require("./dom");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var RowDraggingExtender = {
  init: function init() {
    this.callBase.apply(this, arguments);
    this._updateHandleColumn();
  },
  _allowReordering: function _allowReordering() {
    var rowDragging = this.option('rowDragging');
    return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group));
  },
  _updateHandleColumn: function _updateHandleColumn() {
    var rowDragging = this.option('rowDragging');
    var allowReordering = this._allowReordering();
    var columnsController = this._columnsController;
    var isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
    columnsController && columnsController.addCommandColumn({
      type: 'drag',
      command: 'drag',
      visibleIndex: -2,
      alignment: 'center',
      cssClass: _const.CLASSES.commandDrag,
      width: 'auto',
      cellTemplate: this._getHandleTemplate(),
      visible: isHandleColumnVisible
    });
    columnsController.columnOption('type:drag', 'visible', isHandleColumnVisible);
  },
  _renderContent: function _renderContent() {
    var _this = this;
    var rowDragging = this.option('rowDragging');
    var allowReordering = this._allowReordering();
    var $content = this.callBase.apply(this, arguments);
    var isFixedTableRendering = this._isFixedTableRendering;
    var sortableName = '_sortable';
    var sortableFixedName = '_sortableFixed';
    var currentSortableName = isFixedTableRendering ? sortableFixedName : sortableName;
    var anotherSortableName = isFixedTableRendering ? sortableName : sortableFixedName;
    var togglePointerEventsStyle = function togglePointerEventsStyle(toggle) {
      var _a;
      // T929503
      (_a = _this[sortableFixedName]) === null || _a === void 0 ? void 0 : _a.$element().css('pointerEvents', toggle ? 'auto' : '');
    };
    var rowSelector = '.dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)';
    var filter = this.option('dataRowTemplate') ? "> table > tbody".concat(rowSelector) : "> table > tbody > ".concat(rowSelector);
    if ((allowReordering || this[currentSortableName]) && $content.length) {
      this[currentSortableName] = this._createComponent($content, _sortable.default, (0, _extend.extend)({
        component: this.component,
        contentTemplate: null,
        filter: filter,
        cursorOffset: function cursorOffset(options) {
          var event = options.event;
          var rowsViewOffset = (0, _renderer.default)(_this.element()).offset();
          return {
            // @ts-expect-error
            x: event.pageX - rowsViewOffset.left
          };
        },
        onDraggableElementShown: function onDraggableElementShown(e) {
          if (rowDragging.dragTemplate) {
            return;
          }
          var $dragElement = (0, _renderer.default)(e.dragElement);
          var gridInstance = $dragElement.children('.dx-widget').data(_this.component.NAME);
          _this._synchronizeScrollLeftPosition(gridInstance);
        },
        dragTemplate: this._getDraggableRowTemplate(),
        handle: rowDragging.showDragIcons && ".".concat(_const.CLASSES.commandDrag),
        dropFeedbackMode: 'indicate'
      }, rowDragging, {
        onDragStart: function onDragStart(e) {
          var _a, _b;
          (_a = _this.getController('keyboardNavigation')) === null || _a === void 0 ? void 0 : _a._resetFocusedCell();
          var row = e.component.getVisibleRows()[e.fromIndex];
          e.itemData = row && row.data;
          var isDataRow = row && row.rowType === 'data';
          e.cancel = !allowReordering || !isDataRow;
          (_b = rowDragging.onDragStart) === null || _b === void 0 ? void 0 : _b.call(rowDragging, e);
        },
        onDragEnter: function onDragEnter() {
          togglePointerEventsStyle(true);
        },
        onDragLeave: function onDragLeave() {
          togglePointerEventsStyle(false);
        },
        onDragEnd: function onDragEnd(e) {
          var _a;
          togglePointerEventsStyle(false);
          (_a = rowDragging.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
        },
        onAdd: function onAdd(e) {
          var _a;
          togglePointerEventsStyle(false);
          (_a = rowDragging.onAdd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
        },
        dropFeedbackMode: rowDragging.dropFeedbackMode,
        onOptionChanged: function onOptionChanged(e) {
          var hasFixedSortable = _this[sortableFixedName];
          if (hasFixedSortable) {
            if (e.name === 'fromIndex' || e.name === 'toIndex') {
              _this[anotherSortableName].option(e.name, e.value);
            }
          }
        }
      }));
      $content.toggleClass('dx-scrollable-container', isFixedTableRendering);
      $content.toggleClass(_const.CLASSES.sortableWithoutHandle, allowReordering && !rowDragging.showDragIcons);
    }
    return $content;
  },
  _renderCore: function _renderCore(e) {
    var _this2 = this;
    this.callBase.apply(this, arguments);
    if (e && e.changeType === 'update' && e.repaintChangesOnly && _module_utils.default.isVirtualRowRendering(this)) {
      (0, _common.deferUpdate)(function () {
        _this2._updateSortable();
      });
    }
  },
  _updateSortable: function _updateSortable() {
    var offset = this._dataController.getRowIndexOffset();
    [this._sortable, this._sortableFixed].forEach(function (sortable) {
      sortable === null || sortable === void 0 ? void 0 : sortable.option('offset', offset);
      sortable === null || sortable === void 0 ? void 0 : sortable.update();
    });
  },
  _resizeCore: function _resizeCore() {
    this.callBase.apply(this, arguments);
    this._updateSortable();
  },
  _getDraggableGridOptions: function _getDraggableGridOptions(options) {
    var gridOptions = this.option();
    var columns = this.getColumns();
    var $rowElement = (0, _renderer.default)(this.getRowElement(options.rowIndex));
    return {
      dataSource: [{
        id: 1,
        parentId: 0
      }],
      showBorders: true,
      showColumnHeaders: false,
      scrolling: {
        useNative: false,
        showScrollbar: 'never'
      },
      pager: {
        visible: false
      },
      loadingTimeout: null,
      columnFixing: gridOptions.columnFixing,
      columnAutoWidth: gridOptions.columnAutoWidth,
      showColumnLines: gridOptions.showColumnLines,
      columns: columns.map(function (column) {
        return {
          width: column.width || column.visibleWidth,
          fixed: column.fixed,
          fixedPosition: column.fixedPosition
        };
      }),
      onRowPrepared: function onRowPrepared(e) {
        var rowsView = e.component.getView('rowsView');
        (0, _renderer.default)(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone());
      }
    };
  },
  _synchronizeScrollLeftPosition: function _synchronizeScrollLeftPosition(gridInstance) {
    var scrollable = gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getScrollable();
    scrollable === null || scrollable === void 0 ? void 0 : scrollable.scrollTo({
      x: this._scrollLeft
    });
  },
  _getDraggableRowTemplate: function _getDraggableRowTemplate() {
    var _this3 = this;
    return function (options) {
      var $rootElement = _this3.component.$element();
      var $dataGridContainer = (0, _renderer.default)('<div>');
      (0, _size.setWidth)($dataGridContainer, (0, _size.getWidth)($rootElement));
      var items = _this3._dataController.items();
      var row = items && items[options.fromIndex];
      var gridOptions = _this3._getDraggableGridOptions(row);
      _this3._createComponent($dataGridContainer, _this3.component.NAME, gridOptions);
      $dataGridContainer.find('.dx-gridbase-container').children(":not(.".concat(_this3.addWidgetPrefix(_const.CLASSES.rowsView), ")")).hide();
      return $dataGridContainer;
    };
  },
  _getHandleTemplate: function _getHandleTemplate() {
    var _this4 = this;
    return _dom.GridCoreRowDraggingDom.createHandleTemplateFunc(function (string) {
      return _this4.addWidgetPrefix(string);
    });
  },
  optionChanged: function optionChanged(args) {
    if (args.name === 'rowDragging') {
      this._updateHandleColumn();
      this._invalidate(true, true);
      args.handled = true;
    }
    this.callBase.apply(this, arguments);
  }
};
var rowDraggingModule = {
  defaultOptions: function defaultOptions() {
    return {
      rowDragging: {
        showDragIcons: true,
        dropFeedbackMode: 'indicate',
        allowReordering: false,
        allowDropInsideItem: false
      }
    };
  },
  extenders: {
    views: {
      rowsView: RowDraggingExtender
    }
  }
};
exports.rowDraggingModule = rowDraggingModule;
