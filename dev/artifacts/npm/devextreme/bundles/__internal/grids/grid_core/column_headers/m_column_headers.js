/**
* DevExtreme (bundles/__internal/grids/grid_core/column_headers/m_column_headers.js)
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
exports.columnHeadersModule = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _m_accessibility = require("../m_accessibility");
var _m_columns_view = require("../views/m_columns_view");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CELL_CONTENT_CLASS = 'text-content';
var HEADERS_CLASS = 'headers';
var NOWRAP_CLASS = 'nowrap';
var ROW_CLASS_SELECTOR = '.dx-row';
var HEADER_ROW_CLASS = 'dx-header-row';
var COLUMN_LINES_CLASS = 'dx-column-lines';
var CONTEXT_MENU_SORT_ASC_ICON = 'context-menu-sort-asc';
var CONTEXT_MENU_SORT_DESC_ICON = 'context-menu-sort-desc';
var CONTEXT_MENU_SORT_NONE_ICON = 'context-menu-sort-none';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var VISIBILITY_HIDDEN_CLASS = 'dx-visibility-hidden';
var TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX = 'dx-text-content-alignment-';
var SORT_INDICATOR_CLASS = 'dx-sort-indicator';
var SORT_INDEX_INDICATOR_CLASS = 'dx-sort-index-indicator';
var HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
var HEADER_FILTER_INDICATOR_CLASS = 'dx-header-filter-indicator';
var MULTI_ROW_HEADER_CLASS = 'dx-header-multi-row';
var LINK = 'dx-link';
var columnHeadersModule = {
  defaultOptions() {
    return {
      showColumnHeaders: true,
      cellHintEnabled: true
    };
  },
  views: {
    columnHeadersView: _m_columns_view.ColumnsView.inherit(function () {
      var createCellContent = function createCellContent(that, $cell, options) {
        var $cellContent = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(CELL_CONTENT_CLASS));
        that.setAria('role', 'presentation', $cellContent);
        addCssClassesToCellContent(that, $cell, options.column, $cellContent);
        var showColumnLines = that.option('showColumnLines');
        var contentAlignment = that.getController('columns').getHeaderContentAlignment(options.column.alignment);
        return $cellContent[showColumnLines || contentAlignment === 'right' ? 'appendTo' : 'prependTo']($cell);
      };
      function addCssClassesToCellContent(that, $cell, column, $cellContent) {
        var $indicatorElements = that._getIndicatorElements($cell, true);
        var $visibleIndicatorElements = that._getIndicatorElements($cell);
        var indicatorCount = $indicatorElements && $indicatorElements.length;
        var columnAlignment = that._getColumnAlignment(column.alignment);
        var sortIndicatorClassName = ".".concat(that._getIndicatorClassName('sort'));
        var sortIndexIndicatorClassName = ".".concat(that._getIndicatorClassName('sortIndex'));
        var $sortIndicator = $visibleIndicatorElements.filter(sortIndicatorClassName);
        var $sortIndexIndicator = $visibleIndicatorElements.children().filter(sortIndexIndicatorClassName);
        $cellContent = $cellContent || $cell.children(".".concat(that.addWidgetPrefix(CELL_CONTENT_CLASS)));
        $cellContent.toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + columnAlignment, indicatorCount > 0).toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + (columnAlignment === 'left' ? 'right' : 'left'), indicatorCount > 0 && column.alignment === 'center').toggleClass(SORT_INDICATOR_CLASS, !!$sortIndicator.length).toggleClass(SORT_INDEX_INDICATOR_CLASS, !!$sortIndexIndicator.length).toggleClass(HEADER_FILTER_INDICATOR_CLASS, !!$visibleIndicatorElements.filter(".".concat(that._getIndicatorClassName('headerFilter'))).length);
      }
      var members = {
        _createTable() {
          var $table = this.callBase.apply(this, arguments);
          _events_engine.default.on($table, 'mousedown selectstart', this.createAction(function (e) {
            var event = e.event;
            if (event.shiftKey) {
              event.preventDefault();
            }
          }));
          return $table;
        },
        _isLegacyKeyboardNavigation() {
          return this.option('useLegacyKeyboardNavigation');
        },
        _getDefaultTemplate(column) {
          var that = this;
          return function ($container, options) {
            var caption = column.caption;
            var needCellContent = !column.command || caption && column.command !== 'expand';
            if (column.command === 'empty') {
              that._renderEmptyMessage($container, options);
            } else if (needCellContent) {
              var $content = createCellContent(that, $container, options);
              $content.text(caption);
            } else if (column.command) {
              $container.html('&nbsp;');
            }
          };
        },
        _renderEmptyMessage($container, options) {
          var textEmpty = this._getEmptyHeaderText();
          if (!textEmpty) {
            $container.html('&nbsp;');
            return;
          }
          var $cellContent = createCellContent(this, $container, options);
          var needSplit = textEmpty.includes('{0}');
          if (needSplit) {
            var _textEmpty$split = textEmpty.split('{0}'),
              _textEmpty$split2 = _slicedToArray(_textEmpty$split, 2),
              leftPart = _textEmpty$split2[0],
              rightPart = _textEmpty$split2[1];
            var columnChooserTitle = _message.default.format('dxDataGrid-emptyHeaderColumnChooserText');
            var columnChooserView = this.component.getView('columnChooserView');
            var $link = (0, _renderer.default)('<a>').text(columnChooserTitle).addClass(LINK);
            _events_engine.default.on($link, 'click', this.createAction(function () {
              return columnChooserView.showColumnChooser();
            }));
            $cellContent
            // @ts-expect-error
            .append(_dom_adapter.default.createTextNode(leftPart)).append($link)
            // @ts-expect-error
            .append(_dom_adapter.default.createTextNode(rightPart));
          } else {
            $cellContent.text(textEmpty);
          }
        },
        _getEmptyHeaderText() {
          var hasHiddenColumns = !!this.component.getView('columnChooserView').hasHiddenColumns();
          var hasGroupedColumns = !!this.component.getView('headerPanel').hasGroupedColumns();
          switch (true) {
            case hasHiddenColumns && hasGroupedColumns:
              return _message.default.format('dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText');
            case hasGroupedColumns:
              return _message.default.format('dxDataGrid-emptyHeaderWithGroupPanelText');
            case hasHiddenColumns:
              return _message.default.format('dxDataGrid-emptyHeaderWithColumnChooserText');
            default:
              return '';
          }
        },
        _getHeaderTemplate(column) {
          return column.headerCellTemplate || {
            allowRenderToDetachedContainer: true,
            render: this._getDefaultTemplate(column)
          };
        },
        _processTemplate(template, options) {
          var that = this;
          var resultTemplate;
          var column = options.column;
          var renderingTemplate = that.callBase(template);
          if (options.rowType === 'header' && renderingTemplate && column.headerCellTemplate && !column.command) {
            resultTemplate = {
              render(options) {
                var $content = createCellContent(that, options.container, options.model);
                renderingTemplate.render((0, _extend.extend)({}, options, {
                  container: $content
                }));
              }
            };
          } else {
            resultTemplate = renderingTemplate;
          }
          return resultTemplate;
        },
        _handleDataChanged(e) {
          if (e.changeType !== 'refresh') return;
          if (this._isGroupingChanged || this._requireReady) {
            this._isGroupingChanged = false;
            this.render();
          }
        },
        _renderCell($row, options) {
          var $cell = this.callBase($row, options);
          if (options.row.rowType === 'header') {
            $cell.addClass(CELL_FOCUS_DISABLED_CLASS);
            if (!this._isLegacyKeyboardNavigation()) {
              if (options.column && !options.column.type) {
                $cell.attr('tabindex', this.option('tabindex') || 0);
              }
            }
          }
          return $cell;
        },
        _setCellAriaAttributes($cell, cellOptions) {
          this.callBase($cell, cellOptions);
          if (cellOptions.rowType === 'header') {
            if (!cellOptions.column.type) {
              this.setAria('role', 'columnheader', $cell);
            }
            if (cellOptions.column && !cellOptions.column.command && !cellOptions.column.isBand) {
              $cell.attr('id', cellOptions.column.headerId);
              this.setAria('label', "".concat(_message.default.format('dxDataGrid-ariaColumn'), " ").concat(cellOptions.column.caption), $cell);
            }
          }
        },
        _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          $row.toggleClass(COLUMN_LINES_CLASS, this.option('showColumnLines'));
          if (row.rowType === 'header') {
            $row.addClass(HEADER_ROW_CLASS);
            if (!this._isLegacyKeyboardNavigation()) {
              (0, _m_accessibility.registerKeyboardAction)('columnHeaders', this, $row, 'td', this._handleActionKeyDown.bind(this));
            }
          }
          return $row;
        },
        _handleActionKeyDown(args) {
          var event = args.event;
          var $target = (0, _renderer.default)(event.target);
          this._lastActionElement = event.target;
          if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
            var headerFilterController = this.getController('headerFilter');
            var $column = $target.closest('td');
            var columnIndex = this.getColumnIndexByElement($column);
            if (columnIndex >= 0) {
              headerFilterController.showHeaderFilterMenu(columnIndex, false);
            }
          } else {
            var $row = $target.closest(ROW_CLASS_SELECTOR);
            this._processHeaderAction(event, $row);
          }
          event.preventDefault();
        },
        _renderCore() {
          var that = this;
          var $container = that.element();
          var change = {};
          if (that._tableElement && !that._dataController.isLoaded() && !that._hasRowElements) {
            return;
          }
          $container.addClass(that.addWidgetPrefix(HEADERS_CLASS)).toggleClass(that.addWidgetPrefix(NOWRAP_CLASS), !that.option('wordWrapEnabled')).empty();
          that.setAria('role', 'presentation', $container);
          var deferred = that._updateContent(that._renderTable({
            change
          }), change);
          if (that.getRowCount() > 1) {
            $container.addClass(MULTI_ROW_HEADER_CLASS);
          }
          that.callBase.apply(that, arguments);
          return deferred;
        },
        _renderRows() {
          var that = this;
          if (that._dataController.isLoaded() || that._hasRowElements) {
            that.callBase.apply(that, arguments);
            that._hasRowElements = true;
          }
        },
        _renderRow($table, options) {
          var rowIndex = this.getRowCount() === 1 ? null : options.row.rowIndex;
          options.columns = this.getColumns(rowIndex);
          this.callBase($table, options);
        },
        _createCell(options) {
          var column = options.column;
          var $cellElement = this.callBase.apply(this, arguments);
          column.rowspan > 1 && options.rowType === 'header' && $cellElement.attr('rowSpan', column.rowspan);
          return $cellElement;
        },
        _getRows() {
          var result = [];
          var rowCount = this.getRowCount();
          if (this.option('showColumnHeaders')) {
            for (var i = 0; i < rowCount; i++) {
              result.push({
                rowType: 'header',
                rowIndex: i
              });
            }
          }
          return result;
        },
        _getCellTemplate(options) {
          if (options.rowType === 'header') {
            return this._getHeaderTemplate(options.column);
          }
        },
        _columnOptionChanged(e) {
          var changeTypes = e.changeTypes;
          var optionNames = e.optionNames;
          if (changeTypes.grouping || changeTypes.groupExpanding) {
            if (changeTypes.grouping) {
              this._isGroupingChanged = true;
            }
            return;
          }
          this.callBase(e);
          if (optionNames.width || optionNames.visible) {
            this.resizeCompleted.fire();
          }
        },
        _isElementVisible(elementOptions) {
          return elementOptions && elementOptions.visible;
        },
        _alignCaptionByCenter($cell) {
          var $indicatorsContainer = this._getIndicatorContainer($cell, true);
          if ($indicatorsContainer && $indicatorsContainer.length) {
            $indicatorsContainer.filter(".".concat(VISIBILITY_HIDDEN_CLASS)).remove();
            $indicatorsContainer = this._getIndicatorContainer($cell);
            $indicatorsContainer.clone().addClass(VISIBILITY_HIDDEN_CLASS).css('float', '').insertBefore($cell.children(".".concat(this.addWidgetPrefix(CELL_CONTENT_CLASS))));
          }
        },
        _updateCell($cell, options) {
          if (options.rowType === 'header' && options.column.alignment === 'center') {
            this._alignCaptionByCenter($cell);
          }
          this.callBase.apply(this, arguments);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _updateIndicator($cell, column, indicatorName) {
          var $indicatorElement = this.callBase.apply(this, arguments);
          if (column.alignment === 'center') {
            this._alignCaptionByCenter($cell);
          }
          addCssClassesToCellContent(this, $cell, column);
          return $indicatorElement;
        },
        _getIndicatorContainer($cell, returnAll) {
          var $indicatorsContainer = this.callBase($cell);
          return returnAll ? $indicatorsContainer : $indicatorsContainer.filter(":not(.".concat(VISIBILITY_HIDDEN_CLASS, ")"));
        },
        _isSortableElement() {
          return true;
        },
        getHeadersRowHeight() {
          var $tableElement = this.getTableElement();
          var $headerRows = $tableElement && $tableElement.find(".".concat(HEADER_ROW_CLASS));
          return $headerRows && $headerRows.toArray().reduce(function (sum, headerRow) {
            return sum + (0, _size.getHeight)(headerRow);
          }, 0) || 0;
        },
        getHeaderElement(index) {
          var columnElements = this.getColumnElements();
          return columnElements && columnElements.eq(index);
        },
        getColumnElements(index, bandColumnIndex) {
          var that = this;
          var $cellElement;
          var columnsController = that._columnsController;
          var rowCount = that.getRowCount();
          if (that.option('showColumnHeaders')) {
            if (rowCount > 1 && (!(0, _type.isDefined)(index) || (0, _type.isDefined)(bandColumnIndex))) {
              var result = [];
              var visibleColumns = (0, _type.isDefined)(bandColumnIndex) ? columnsController.getChildrenByBandColumn(bandColumnIndex, true) : columnsController.getVisibleColumns();
              (0, _iterator.each)(visibleColumns, function (_, column) {
                var rowIndex = (0, _type.isDefined)(index) ? index : columnsController.getRowIndex(column.index);
                $cellElement = that._getCellElement(rowIndex, columnsController.getVisibleIndex(column.index, rowIndex));
                $cellElement && result.push($cellElement.get(0));
              });
              // @ts-expect-error
              return (0, _renderer.default)(result);
            }
            if (!index || index < rowCount) {
              return that.getCellElements(index || 0);
            }
          }
        },
        getColumnIndexByElement($cell) {
          var cellIndex = this.getCellIndex($cell);
          var $row = $cell.closest('.dx-row');
          var rowIndex = $row[0].rowIndex;
          var column = this.getColumns(rowIndex)[cellIndex];
          return column ? column.index : -1;
        },
        getVisibleColumnIndex(columnIndex, rowIndex) {
          var column = this.getColumns()[columnIndex];
          return column ? this._columnsController.getVisibleIndex(column.index, rowIndex) : -1;
        },
        getColumnWidths() {
          var $columnElements = this.getColumnElements();
          if ($columnElements && $columnElements.length) {
            return this._getWidths($columnElements);
          }
          return this.callBase.apply(this, arguments);
        },
        allowDragging(column) {
          var rowIndex = column && this._columnsController.getRowIndex(column.index);
          var columns = this.getColumns(rowIndex);
          var isReorderingEnabled = this.option('allowColumnReordering') || this._columnsController.isColumnOptionUsed('allowReordering');
          return isReorderingEnabled && column.allowReordering && columns.length > 1;
        },
        getBoundingRect() {
          var that = this;
          var $columnElements = that.getColumnElements();
          if ($columnElements && $columnElements.length) {
            var offset = that.getTableElement().offset();
            return {
              top: offset.top
            };
          }
          return null;
        },
        getName() {
          return 'headers';
        },
        getColumnCount() {
          var $columnElements = this.getColumnElements();
          return $columnElements ? $columnElements.length : 0;
        },
        isVisible() {
          return this.option('showColumnHeaders');
        },
        optionChanged(args) {
          var that = this;
          switch (args.name) {
            case 'showColumnHeaders':
            case 'wordWrapEnabled':
            case 'showColumnLines':
              that._invalidate(true, true);
              args.handled = true;
              break;
            default:
              that.callBase(args);
          }
        },
        getHeight() {
          return this.getElementHeight();
        },
        getContextMenuItems(options) {
          var that = this;
          var column = options.column;
          if (options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
            var sortingOptions = that.option('sorting');
            if (sortingOptions && sortingOptions.mode !== 'none' && column && column.allowSorting) {
              var onItemClick = function onItemClick(params) {
                setTimeout(function () {
                  that._columnsController.changeSortOrder(column.index, params.itemData.value);
                });
              };
              return [{
                text: sortingOptions.ascendingText,
                value: 'asc',
                disabled: column.sortOrder === 'asc',
                icon: CONTEXT_MENU_SORT_ASC_ICON,
                onItemClick
              }, {
                text: sortingOptions.descendingText,
                value: 'desc',
                disabled: column.sortOrder === 'desc',
                icon: CONTEXT_MENU_SORT_DESC_ICON,
                onItemClick
              }, {
                text: sortingOptions.clearText,
                value: 'none',
                disabled: !column.sortOrder,
                icon: CONTEXT_MENU_SORT_NONE_ICON,
                onItemClick
              }];
            }
          }
          return undefined;
        },
        getRowCount() {
          return this._columnsController && this._columnsController.getRowCount();
        },
        setRowsOpacity(columnIndex, value, rowIndex) {
          var _this = this;
          var i;
          var columnElements;
          var rowCount = this.getRowCount();
          var columns = this._columnsController.getColumns();
          var column = columns && columns[columnIndex];
          var columnID = column && column.isBand && column.index;
          var setColumnOpacity = function setColumnOpacity(column, index) {
            if (column.ownerBand === columnID) {
              columnElements.eq(index).css({
                opacity: value
              });
              if (column.isBand) {
                _this.setRowsOpacity(column.index, value, i + 1);
              }
            }
          };
          if ((0, _type.isDefined)(columnID)) {
            rowIndex = rowIndex || 0;
            for (i = rowIndex; i < rowCount; i++) {
              columnElements = this.getCellElements(i);
              if (columnElements) {
                var rowColumns = this.getColumns(i);
                rowColumns.forEach(setColumnOpacity);
              }
            }
          }
        }
      };
      return members;
    }())
  }
};
exports.columnHeadersModule = columnHeadersModule;
