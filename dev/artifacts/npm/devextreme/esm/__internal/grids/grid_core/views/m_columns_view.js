/**
* DevExtreme (esm/__internal/grids/grid_core/views/m_columns_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import domAdapter from '../../../../core/dom_adapter';
import { getPublicElement } from '../../../../core/element';
import { data as elementData } from '../../../../core/element_data';
import Guid from '../../../../core/guid';
import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
import { noop } from '../../../../core/utils/common';
import { Deferred, when } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import * as iteratorUtils from '../../../../core/utils/iterator';
import { getBoundingRect, getDefaultAlignment } from '../../../../core/utils/position';
import { getHeight, getOuterHeight, getOuterWidth, getWidth } from '../../../../core/utils/size';
import { setWidth } from '../../../../core/utils/style';
import { nativeScrolling } from '../../../../core/utils/support';
import { isDefined, isFunction, isNumeric, isRenderer, isString } from '../../../../core/utils/type';
import { getWindow, hasWindow } from '../../../../core/utils/window';
import { name as clickEventName } from '../../../../events/click';
import eventsEngine from '../../../../events/core/events_engine';
import { name as dblclickEvent } from '../../../../events/double_click';
import pointerEvents from '../../../../events/pointer';
import { removeEvent } from '../../../../events/remove';
import columnStateMixin from '../../../grids/grid_core/column_state_mixin/m_column_state_mixin';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
var SCROLL_CONTAINER_CLASS = 'scroll-container';
var SCROLLABLE_SIMULATED_CLASS = 'scrollable-simulated';
var GROUP_SPACE_CLASS = 'group-space';
var CONTENT_CLASS = 'content';
var TABLE_CLASS = 'table';
var TABLE_FIXED_CLASS = 'table-fixed';
var CONTENT_FIXED_CLASS = 'content-fixed';
var ROW_CLASS = 'dx-row';
var GROUP_ROW_CLASS = 'dx-group-row';
var GROUP_CELL_CLASS = 'dx-group-cell';
var DETAIL_ROW_CLASS = 'dx-master-detail-row';
var FILTER_ROW_CLASS = 'filter-row';
var ERROR_ROW_CLASS = 'dx-error-row';
var CELL_UPDATED_ANIMATION_CLASS = 'cell-updated-animation';
var HIDDEN_COLUMNS_WIDTH = '0.0001px';
var CELL_HINT_VISIBLE = 'dxCellHintVisible';
var FORM_FIELD_ITEM_CONTENT_CLASS = 'dx-field-item-content';
var appendElementTemplate = {
  render(options) {
    options.container.append(options.content);
  }
};
var subscribeToRowEvents = function subscribeToRowEvents(that, $table) {
  var touchTarget;
  var touchCurrentTarget;
  var timeoutId;
  function clearTouchTargets(timeout) {
    return setTimeout(() => {
      touchTarget = touchCurrentTarget = null;
    }, timeout);
  }
  eventsEngine.on($table, 'touchstart touchend', '.dx-row', e => {
    clearTimeout(timeoutId);
    if (e.type === 'touchstart') {
      touchTarget = e.target;
      touchCurrentTarget = e.currentTarget;
      timeoutId = clearTouchTargets(1000);
    } else {
      timeoutId = clearTouchTargets();
    }
  });
  eventsEngine.on($table, [clickEventName, dblclickEvent, pointerEvents.down].join(' '), '.dx-row', that.createAction(e => {
    var {
      event
    } = e;
    if (touchTarget) {
      event.target = touchTarget;
      event.currentTarget = touchCurrentTarget;
    }
    if (!$(event.target).closest('a').length) {
      e.rowIndex = that.getRowIndex(event.currentTarget);
      if (e.rowIndex >= 0) {
        e.rowElement = getPublicElement($(event.currentTarget));
        e.columns = that.getColumns();
        if (event.type === pointerEvents.down) {
          that._rowPointerDown(e);
        } else if (event.type === clickEventName) {
          that._rowClick(e);
        } else {
          that._rowDblClick(e);
        }
      }
    }
  }));
};
var getWidthStyle = function getWidthStyle(width) {
  if (width === 'auto') return '';
  return isNumeric(width) ? "".concat(width, "px") : width;
};
var setCellWidth = function setCellWidth(cell, column, width) {
  cell.style.width = cell.style.maxWidth = column.width === 'auto' ? '' : width;
};
var copyAttributes = function copyAttributes(element, newElement) {
  if (!element || !newElement) return;
  var oldAttributes = element.attributes;
  var newAttributes = newElement.attributes;
  var i;
  for (i = 0; i < oldAttributes.length; i++) {
    var name = oldAttributes[i].nodeName;
    if (!newElement.hasAttribute(name)) {
      element.removeAttribute(name);
    }
  }
  for (i = 0; i < newAttributes.length; i++) {
    element.setAttribute(newAttributes[i].nodeName, newAttributes[i].nodeValue);
  }
};
var removeHandler = function removeHandler(templateDeferred) {
  templateDeferred.resolve();
};
export var normalizeWidth = width => {
  if (typeof width === 'number') {
    return "".concat(width.toFixed(3), "px");
  }
  if (width === 'adaptiveHidden') {
    return HIDDEN_COLUMNS_WIDTH;
  }
  return width;
};
var viewWithColumnStateMixin = modules.View.inherit(columnStateMixin);
export class ColumnsView extends viewWithColumnStateMixin {
  _createScrollableOptions() {
    var that = this;
    var scrollingOptions = that.option('scrolling');
    var useNativeScrolling = that.option('scrolling.useNative');
    var options = extend({}, scrollingOptions, {
      direction: 'both',
      bounceEnabled: false,
      useKeyboard: false
    });
    // TODO jsdmitry: This condition is for unit tests and testing scrollable
    if (useNativeScrolling === undefined) {
      useNativeScrolling = true;
    }
    if (useNativeScrolling === 'auto') {
      delete options.useNative;
      delete options.useSimulatedScrollbar;
    } else {
      options.useNative = !!useNativeScrolling;
      options.useSimulatedScrollbar = !useNativeScrolling;
    }
    return options;
  }
  _updateCell($cell, parameters) {
    if (parameters.rowType) {
      this._cellPrepared($cell, parameters);
    }
  }
  _createCell(options) {
    var {
      column
    } = options;
    var alignment = column.alignment || getDefaultAlignment(this.option('rtlEnabled'));
    var cell = domAdapter.createElement('td');
    cell.style.textAlign = alignment;
    var $cell = $(cell);
    if (options.rowType === 'data' && column.headerId && !column.type) {
      if (this.component.option('showColumnHeaders')) {
        this.setAria('describedby', column.headerId, $cell);
      }
    }
    if (column.cssClass) {
      $cell.addClass(column.cssClass);
    }
    if (Array.isArray(column.elementAttr)) {
      column.elementAttr.forEach(_ref => {
        var {
          name,
          value
        } = _ref;
        $cell.attr(name, value);
      });
    }
    if (column.command === 'expand') {
      $cell.addClass(column.cssClass);
      $cell.addClass(this.addWidgetPrefix(GROUP_SPACE_CLASS));
    }
    if (column.colspan > 1) {
      $cell.attr('colSpan', column.colspan);
    } else if (!column.isBand && column.visibleWidth !== 'auto' && this.option('columnAutoWidth')) {
      if (column.width || column.minWidth) {
        cell.style.minWidth = getWidthStyle(column.minWidth || column.width);
      }
      if (column.width) {
        setCellWidth(cell, column, getWidthStyle(column.width));
      }
    }
    return $cell;
  }
  _createRow(rowObject, tagName) {
    tagName = tagName || 'tr';
    var $element = $("<".concat(tagName, ">")).addClass(ROW_CLASS);
    this.setAria('role', 'row', $element);
    return $element;
  }
  _isAltRow(row) {
    return row && row.dataIndex % 2 === 1;
  }
  _createTable(columns, isAppend) {
    var $table = $('<table>').addClass(this.addWidgetPrefix(TABLE_CLASS)).addClass(this.addWidgetPrefix(TABLE_FIXED_CLASS));
    if (columns && !isAppend) {
      $table.attr('id', "dx-".concat(new Guid())).append(this._createColGroup(columns));
      if (browser.safari) {
        // T198380, T809552
        // @ts-expect-error
        $table.append($('<thead>').append('<tr>'));
      }
      this.setAria('role', 'presentation', $table);
    } else {
      this.setAria('hidden', true, $table);
    }
    this.setAria('role', 'presentation', $('<tbody>').appendTo($table));
    if (isAppend) {
      return $table;
    }
    // T138469
    if (browser.mozilla) {
      eventsEngine.on($table, 'mousedown', 'td', e => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      });
    }
    if (this.option('cellHintEnabled')) {
      eventsEngine.on($table, 'mousemove', '.dx-row > td', this.createAction(args => {
        var e = args.event;
        var $element = $(e.target);
        var $cell = $(e.currentTarget);
        var $row = $cell.parent();
        var visibleColumns = this._columnsController.getVisibleColumns();
        var rowOptions = $row.data('options');
        var columnIndex = $cell.index();
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        var cellOptions = rowOptions && rowOptions.cells && rowOptions.cells[columnIndex];
        var column = cellOptions ? cellOptions.column : visibleColumns[columnIndex];
        var isHeaderRow = $row.hasClass('dx-header-row');
        var isDataRow = $row.hasClass('dx-data-row');
        var isMasterDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
        var isGroupRow = $row.hasClass(GROUP_ROW_CLASS);
        var isFilterRow = $row.hasClass(this.addWidgetPrefix(FILTER_ROW_CLASS));
        var isDataRowWithTemplate = isDataRow && (!column || column.cellTemplate);
        var isEditorShown = isDataRow && cellOptions && (rowOptions.isEditing || cellOptions.isEditing || (column === null || column === void 0 ? void 0 : column.showEditorAlways));
        var isHeaderRowWithTemplate = isHeaderRow && (!column || column.headerCellTemplate);
        var isGroupCellWithTemplate = isGroupRow && (!column || column.groupIndex && column.groupCellTemplate);
        var shouldShowHint = !isMasterDetailRow && !isFilterRow && !isEditorShown && !isDataRowWithTemplate && !isHeaderRowWithTemplate && !isGroupCellWithTemplate;
        if (shouldShowHint) {
          if ($element.data(CELL_HINT_VISIBLE)) {
            $element.removeAttr('title');
            $element.data(CELL_HINT_VISIBLE, false);
          }
          var difference = $element[0].scrollWidth - $element[0].clientWidth;
          if (difference > 0 && !isDefined($element.attr('title'))) {
            $element.attr('title', $element.text());
            $element.data(CELL_HINT_VISIBLE, true);
          }
        }
      }));
    }
    var getOptions = event => {
      var $cell = $(event.currentTarget);
      var $fieldItemContent = $(event.target).closest(".".concat(FORM_FIELD_ITEM_CONTENT_CLASS));
      var $row = $cell.parent();
      var rowOptions = $row.data('options');
      var options = rowOptions && rowOptions.cells && rowOptions.cells[$cell.index()];
      if (!$cell.closest('table').is(event.delegateTarget)) return;
      var resultOptions = extend({}, options, {
        cellElement: getPublicElement($cell),
        event,
        eventType: event.type
      });
      resultOptions.rowIndex = this.getRowIndex($row);
      if ($fieldItemContent.length) {
        var formItemOptions = $fieldItemContent.data('dx-form-item');
        if (formItemOptions.column) {
          resultOptions.column = formItemOptions.column;
          resultOptions.columnIndex = this._columnsController.getVisibleIndex(resultOptions.column.index);
        }
      }
      return resultOptions;
    };
    eventsEngine.on($table, 'mouseover', '.dx-row > td', e => {
      var options = getOptions(e);
      options && this.executeAction('onCellHoverChanged', options);
    });
    eventsEngine.on($table, 'mouseout', '.dx-row > td', e => {
      var options = getOptions(e);
      options && this.executeAction('onCellHoverChanged', options);
    });
    eventsEngine.on($table, clickEventName, '.dx-row > td', e => {
      var options = getOptions(e);
      options && this.executeAction('onCellClick', options);
    });
    eventsEngine.on($table, dblclickEvent, '.dx-row > td', e => {
      var options = getOptions(e);
      options && this.executeAction('onCellDblClick', options);
    });
    subscribeToRowEvents(this, $table);
    return $table;
  }
  _rowPointerDown() {}
  _rowClick() {}
  _rowDblClick() {}
  _createColGroup(columns) {
    var colgroupElement = $('<colgroup>');
    for (var i = 0; i < columns.length; i++) {
      var colspan = columns[i].colspan || 1;
      for (var j = 0; j < colspan; j++) {
        colgroupElement.append(this._createCol(columns[i]));
      }
    }
    return colgroupElement;
  }
  _createCol(column) {
    var width = column.visibleWidth || column.width;
    if (width === 'adaptiveHidden') {
      width = HIDDEN_COLUMNS_WIDTH;
    }
    var col = $('<col>');
    setWidth(col, width);
    return col;
  }
  renderDelayedTemplates(change) {
    var delayedTemplates = this._delayedTemplates;
    var syncTemplates = delayedTemplates.filter(template => !template.async);
    var asyncTemplates = delayedTemplates.filter(template => template.async);
    this._delayedTemplates = [];
    this._renderDelayedTemplatesCore(syncTemplates, false, change);
    this._renderDelayedTemplatesCoreAsync(asyncTemplates);
  }
  _renderDelayedTemplatesCoreAsync(templates) {
    if (templates.length) {
      var templateTimeout = getWindow().setTimeout(() => {
        this._templateTimeouts.delete(templateTimeout);
        this._renderDelayedTemplatesCore(templates, true);
      });
      this._templateTimeouts.add(templateTimeout);
    }
  }
  _renderDelayedTemplatesCore(templates, isAsync, change) {
    var date = new Date();
    while (templates.length) {
      var templateParameters = templates.shift();
      var {
        options
      } = templateParameters;
      // @ts-expect-error
      var doc = domAdapter.getRootNode($(options.container).get(0));
      var needWaitAsyncTemplates = this.needWaitAsyncTemplates();
      // @ts-expect-error
      if (!isAsync || $(options.container).closest(doc).length || needWaitAsyncTemplates) {
        if (change) {
          options.change = change;
        }
        templateParameters.template.render(options);
      }
      // @ts-expect-error
      if (isAsync && new Date() - date > 30) {
        this._renderDelayedTemplatesCoreAsync(templates);
        break;
      }
    }
    if (!templates.length && this._delayedTemplates.length) {
      this.renderDelayedTemplates();
    }
  }
  _processTemplate(template, options) {
    var that = this;
    var renderingTemplate;
    if (template && template.render && !isRenderer(template)) {
      renderingTemplate = {
        allowRenderToDetachedContainer: template.allowRenderToDetachedContainer,
        render(options) {
          template.render(options.container, options.model, options.change);
          options.deferred && options.deferred.resolve();
        }
      };
    } else if (isFunction(template)) {
      renderingTemplate = {
        render(options) {
          var renderedTemplate = template(getPublicElement(options.container), options.model, options.change);
          if (renderedTemplate && (renderedTemplate.nodeType || isRenderer(renderedTemplate))) {
            options.container.append(renderedTemplate);
          }
          options.deferred && options.deferred.resolve();
        }
      };
    } else {
      var templateID = isString(template) ? template : $(template).attr('id');
      if (!templateID) {
        renderingTemplate = that.getTemplate(template);
      } else {
        if (!that._templatesCache[templateID]) {
          that._templatesCache[templateID] = that.getTemplate(template);
        }
        renderingTemplate = that._templatesCache[templateID];
      }
    }
    return renderingTemplate;
  }
  renderTemplate(container, template, options, allowRenderToDetachedContainer, change) {
    var _a;
    var renderingTemplate = this._processTemplate(template, options);
    var {
      column
    } = options;
    var isDataRow = options.rowType === 'data';
    // @ts-expect-error
    var templateDeferred = new Deferred();
    var templateOptions = {
      container,
      model: options,
      deferred: templateDeferred,
      onRendered: () => {
        if (this.isDisposed()) {
          templateDeferred.reject();
        } else {
          templateDeferred.resolve();
        }
      }
    };
    if (renderingTemplate) {
      options.component = this.component;
      var columnAsync = column && (column.renderAsync && isDataRow || this.option('renderAsync') && (column.renderAsync !== false && (column.command || column.showEditorAlways) && isDataRow || options.rowType === 'filter'));
      var async = (_a = options.renderAsync) !== null && _a !== void 0 ? _a : columnAsync;
      if ((renderingTemplate.allowRenderToDetachedContainer || allowRenderToDetachedContainer) && !async) {
        renderingTemplate.render(templateOptions);
      } else {
        this._delayedTemplates.push({
          template: renderingTemplate,
          options: templateOptions,
          async
        });
      }
      this._templateDeferreds.add(templateDeferred);
      eventsEngine.on(container, removeEvent, removeHandler.bind(null, templateDeferred));
    } else {
      templateDeferred.reject();
    }
    return templateDeferred.promise().always(() => {
      this._templateDeferreds.delete(templateDeferred);
    });
  }
  _getBodies(tableElement) {
    return $(tableElement).children('tbody').not('.dx-header').not('.dx-footer');
  }
  _needWrapRow($tableElement) {
    var _a;
    var hasRowTemplate = !!this.option().rowTemplate;
    return hasRowTemplate && !!((_a = this._getBodies($tableElement)) === null || _a === void 0 ? void 0 : _a.filter(".".concat(ROW_CLASS)).length);
  }
  _wrapRowIfNeed($table, $row, isRefreshing) {
    var $tableElement = isRefreshing ? $table || this._tableElement : this._tableElement || $table;
    var needWrapRow = this._needWrapRow($tableElement);
    if (needWrapRow) {
      var $tbody = $('<tbody>').addClass($row.attr('class'));
      this.setAria('role', 'presentation', $tbody);
      return $tbody.append($row);
    }
    return $row;
  }
  _appendRow($table, $row, appendTemplate) {
    appendTemplate = appendTemplate || appendElementTemplate;
    appendTemplate.render({
      content: $row,
      container: $table
    });
  }
  _resizeCore() {
    var scrollLeft = this._scrollLeft;
    if (scrollLeft >= 0) {
      this._scrollLeft = 0;
      this.scrollTo({
        left: scrollLeft
      });
    }
  }
  _renderCore(e) {
    var $root = this.element().parent();
    if (!$root || $root.parent().length) {
      this.renderDelayedTemplates(e);
    }
  }
  _renderTable(options) {
    options = options || {};
    options.columns = this._columnsController.getVisibleColumns();
    var changeType = options.change && options.change.changeType;
    var $table = this._createTable(options.columns, changeType === 'append' || changeType === 'prepend' || changeType === 'update');
    this._renderRows($table, options);
    return $table;
  }
  _renderRows($table, options) {
    var that = this;
    var rows = that._getRows(options.change);
    var columnIndices = options.change && options.change.columnIndices || [];
    var changeTypes = options.change && options.change.changeTypes || [];
    for (var i = 0; i < rows.length; i++) {
      that._renderRow($table, extend({
        row: rows[i],
        columnIndices: columnIndices[i],
        changeType: changeTypes[i]
      }, options));
    }
  }
  _renderRow($table, options) {
    if (!options.columnIndices) {
      options.row.cells = [];
    }
    var $row = this._createRow(options.row);
    var $wrappedRow = this._wrapRowIfNeed($table, $row);
    if (options.changeType !== 'remove') {
      this._renderCells($row, options);
    }
    this._appendRow($table, $wrappedRow);
    var rowOptions = extend({
      columns: options.columns
    }, options.row);
    this._addWatchMethod(rowOptions, options.row);
    this._rowPrepared($wrappedRow, rowOptions, options.row);
  }
  _needRenderCell(columnIndex, columnIndices) {
    return !columnIndices || columnIndices.indexOf(columnIndex) >= 0;
  }
  _renderCells($row, options) {
    var that = this;
    var columnIndex = 0;
    var {
      row
    } = options;
    var {
      columns
    } = options;
    for (var i = 0; i < columns.length; i++) {
      if (this._needRenderCell(i, options.columnIndices)) {
        that._renderCell($row, extend({
          column: columns[i],
          columnIndex,
          value: row.values && row.values[columnIndex],
          oldValue: row.oldValues && row.oldValues[columnIndex]
        }, options));
      }
      if (columns[i].colspan > 1) {
        columnIndex += columns[i].colspan;
      } else {
        columnIndex++;
      }
    }
  }
  _updateCells($rowElement, $newRowElement, columnIndices) {
    var $cells = $rowElement.children();
    var $newCells = $newRowElement.children();
    var highlightChanges = this.option('highlightChanges');
    var cellUpdatedClass = this.addWidgetPrefix(CELL_UPDATED_ANIMATION_CLASS);
    columnIndices.forEach((columnIndex, index) => {
      var $cell = $cells.eq(columnIndex);
      var $newCell = $newCells.eq(index);
      $cell.replaceWith($newCell);
      if (highlightChanges && !$newCell.hasClass('dx-command-expand')) {
        $newCell.addClass(cellUpdatedClass);
      }
    });
    copyAttributes($rowElement.get(0), $newRowElement.get(0));
  }
  _setCellAriaAttributes($cell, cellOptions) {
    if (cellOptions.rowType !== 'freeSpace') {
      this.setAria('role', 'gridcell', $cell);
      var columnIndexOffset = this._columnsController.getColumnIndexOffset();
      var ariaColIndex = cellOptions.columnIndex + columnIndexOffset + 1;
      this.setAria('colindex', ariaColIndex, $cell);
    }
  }
  _renderCell($row, options) {
    var cellOptions = this._getCellOptions(options);
    if (options.columnIndices) {
      if (options.row.cells) {
        var cellIndex = options.row.cells.findIndex(cell => cell.columnIndex === cellOptions.columnIndex);
        options.row.cells[cellIndex] = cellOptions;
      }
    } else {
      options.row.cells.push(cellOptions);
    }
    var $cell = this._createCell(cellOptions);
    this._setCellAriaAttributes($cell, cellOptions);
    this._renderCellContent($cell, cellOptions, options);
    $row.get(0).appendChild($cell.get(0));
    return $cell;
  }
  _renderCellContent($cell, options, renderOptions) {
    var template = this._getCellTemplate(options);
    when(!template || this.renderTemplate($cell, template, options, undefined, renderOptions.change)).done(() => {
      this._updateCell($cell, options);
    });
  }
  _getCellTemplate(options) {}
  _getRows(change) {
    return [];
  }
  _getCellOptions(options) {
    var cellOptions = {
      column: options.column,
      columnIndex: options.columnIndex,
      rowType: options.row.rowType,
      isAltRow: this._isAltRow(options.row)
    };
    this._addWatchMethod(cellOptions);
    return cellOptions;
  }
  _addWatchMethod(options, source) {
    if (!this.option('repaintChangesOnly')) return;
    var watchers = [];
    source = source || options;
    source.watch = source.watch || function (getter, updateValueFunc, updateRowFunc) {
      var oldValue = getter(source.data);
      var watcher = function watcher(row) {
        if (row && updateRowFunc) {
          updateRowFunc(row);
        }
        var newValue = getter(source.data);
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          if (row) {
            updateValueFunc(newValue);
          }
          oldValue = newValue;
        }
      };
      watchers.push(watcher);
      var stopWatch = function stopWatch() {
        var index = watchers.indexOf(watcher);
        if (index >= 0) {
          watchers.splice(index, 1);
        }
      };
      return stopWatch;
    };
    source.update = source.update || function (row, keepRow) {
      if (row) {
        this.data = options.data = row.data;
        this.rowIndex = options.rowIndex = row.rowIndex;
        this.dataIndex = options.dataIndex = row.dataIndex;
        this.isExpanded = options.isExpanded = row.isExpanded;
        if (options.row && !keepRow) {
          options.row = row;
        }
      }
      watchers.forEach(watcher => {
        watcher(row);
      });
    };
    if (source !== options) {
      options.watch = source.watch.bind(source);
    }
    return options;
  }
  _cellPrepared(cell, options) {
    options.cellElement = getPublicElement($(cell));
    this.executeAction('onCellPrepared', options);
  }
  _rowPrepared($row, options, row) {
    elementData($row.get(0), 'options', options);
    options.rowElement = getPublicElement($row);
    this.executeAction('onRowPrepared', options);
  }
  _columnOptionChanged(e) {
    var {
      optionNames
    } = e;
    if (gridCoreUtils.checkChanges(optionNames, ['width', 'visibleWidth'])) {
      var visibleColumns = this._columnsController.getVisibleColumns();
      var widths = visibleColumns.map(column => column.visibleWidth || column.width);
      this.setColumnWidths({
        widths,
        optionNames
      });
      return;
    }
    if (!this._requireReady) {
      this.render();
    }
  }
  getCellIndex($cell) {
    var cellIndex = $cell.length ? $cell[0].cellIndex : -1;
    return cellIndex;
  }
  getTableElements() {
    // @ts-expect-error
    return this._tableElement || $();
  }
  getTableElement(isFixedTableRendering) {
    return this._tableElement;
  }
  setTableElement(tableElement, isFixedTableRendering) {
    this._tableElement = tableElement;
  }
  optionChanged(args) {
    super.optionChanged(args);
    // eslint-disable-next-line default-case
    switch (args.name) {
      case 'cellHintEnabled':
      case 'onCellPrepared':
      case 'onRowPrepared':
      case 'onCellHoverChanged':
      case 'keyboardNavigation':
        this._invalidate(true, true);
        args.handled = true;
        break;
    }
  }
  init() {
    this._scrollLeft = -1;
    this._columnsController = this.getController('columns');
    this._dataController = this.getController('data');
    this._delayedTemplates = [];
    this._templateDeferreds = new Set();
    this._templatesCache = {};
    this._templateTimeouts = new Set();
    this.createAction('onCellClick');
    this.createAction('onRowClick');
    this.createAction('onCellDblClick');
    this.createAction('onRowDblClick');
    this.createAction('onCellHoverChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
    this.createAction('onCellPrepared', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    this.createAction('onRowPrepared', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering',
      afterExecute: e => {
        this._afterRowPrepared(e);
      }
    });
    this._columnsController.columnsChanged.add(this._columnOptionChanged.bind(this));
    this._dataController && this._dataController.changed.add(this._handleDataChanged.bind(this));
  }
  _afterRowPrepared(e) {}
  _handleDataChanged() {}
  callbackNames() {
    return ['scrollChanged'];
  }
  _updateScrollLeftPosition() {
    var scrollLeft = this._scrollLeft;
    if (scrollLeft >= 0) {
      this._scrollLeft = 0;
      this.scrollTo({
        left: scrollLeft
      });
    }
  }
  scrollTo(pos) {
    var $element = this.element();
    var $scrollContainer = $element && $element.children(".".concat(this.addWidgetPrefix(SCROLL_CONTAINER_CLASS))).not(".".concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS)));
    if (isDefined(pos) && isDefined(pos.left) && this._scrollLeft !== pos.left) {
      this._scrollLeft = pos.left;
      $scrollContainer && $scrollContainer.scrollLeft(pos.left);
    }
  }
  _getContent(isFixedTableRendering) {
    var _a;
    return (_a = this._tableElement) === null || _a === void 0 ? void 0 : _a.parent();
  }
  _removeContent(isFixedTableRendering) {
    var $scrollContainer = this._getContent(isFixedTableRendering);
    if ($scrollContainer === null || $scrollContainer === void 0 ? void 0 : $scrollContainer.length) {
      $scrollContainer.remove();
    }
  }
  _wrapTableInScrollContainer($table, isFixedTableRendering) {
    var $scrollContainer = $('<div>');
    var useNative = this.option('scrolling.useNative');
    if (useNative === false || useNative === 'auto' && !nativeScrolling) {
      $scrollContainer.addClass(this.addWidgetPrefix(SCROLLABLE_SIMULATED_CLASS));
    }
    eventsEngine.on($scrollContainer, 'scroll', () => {
      var scrollLeft = $scrollContainer.scrollLeft();
      if (scrollLeft !== this._scrollLeft) {
        this.scrollChanged.fire({
          left: scrollLeft
        }, this.name);
      }
    });
    $scrollContainer.addClass(this.addWidgetPrefix(CONTENT_CLASS)).addClass(this.addWidgetPrefix(SCROLL_CONTAINER_CLASS)).append($table).appendTo(this.element());
    this.setAria('role', 'presentation', $scrollContainer);
    return $scrollContainer;
  }
  needWaitAsyncTemplates() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return this.option('templatesRenderAsynchronously') && this.option('renderAsync') === false;
  }
  waitAsyncTemplates() {
    var forceWaiting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    // @ts-expect-error
    var result = new Deferred();
    var needWaitAsyncTemplates = forceWaiting || this.needWaitAsyncTemplates();
    if (!needWaitAsyncTemplates) {
      return result.resolve();
    }
    var waitTemplatesRecursion = () => when.apply(this, Array.from(this._templateDeferreds)).done(() => {
      if (this.isDisposed()) {
        result.reject();
      } else if (this._templateDeferreds.size > 0) {
        waitTemplatesRecursion();
      } else {
        result.resolve();
      }
    }).fail(result.reject);
    waitTemplatesRecursion();
    return result.promise();
  }
  _updateContent($newTableElement, change, isFixedTableRendering) {
    return this.waitAsyncTemplates().done(() => {
      this._removeContent(isFixedTableRendering);
      this.setTableElement($newTableElement, isFixedTableRendering);
      this._wrapTableInScrollContainer($newTableElement, isFixedTableRendering);
    });
  }
  _findContentElement() {}
  _getWidths($cellElements) {
    if (!$cellElements) {
      return [];
    }
    var result = [];
    var cellElements = $cellElements.toArray();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    cellElements.forEach(cell => {
      var width = cell.offsetWidth;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      if (cell.getBoundingClientRect) {
        var rect = getBoundingRect(cell);
        if (rect.width > cell.offsetWidth - 1) {
          width = rect.width;
        }
      }
      result.push(width);
    });
    return result;
  }
  getColumnWidths($tableElement) {
    (this.option('forceApplyBindings') || noop)();
    $tableElement = $tableElement !== null && $tableElement !== void 0 ? $tableElement : this.getTableElement();
    if ($tableElement) {
      var $rows = $tableElement.children('tbody:not(.dx-header)').children();
      for (var i = 0; i < $rows.length; i++) {
        var $row = $rows.eq(i);
        var isGroupRow = $row.hasClass(GROUP_ROW_CLASS);
        var isDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
        var isErrorRow = $row.hasClass(ERROR_ROW_CLASS);
        var isRowVisible = $row.get(0).style.display !== 'none' && !$row.hasClass('dx-state-invisible');
        var isRelevantRow = !isGroupRow && !isDetailRow && !isErrorRow;
        if (isRowVisible && isRelevantRow) {
          var $cells = $row.children('td');
          var result = this._getWidths($cells);
          return result;
        }
      }
    }
    return [];
  }
  getVisibleColumnIndex(columnIndex, rowIndex) {
    return columnIndex;
  }
  setColumnWidths(_ref2) {
    var {
      widths,
      optionNames
    } = _ref2;
    var $tableElement = this.getTableElement();
    if (!($tableElement === null || $tableElement === void 0 ? void 0 : $tableElement.length) || !widths) {
      return;
    }
    var columns = this.getColumns();
    var columnAutoWidth = this.option('columnAutoWidth');
    var $cols = $tableElement.children('colgroup').children('col');
    $cols.toArray().forEach(col => col.removeAttribute('style'));
    columns.forEach((column, columnIndex) => {
      /*
      Probably we do not need this if statement. It seems like there is no point to set
      min-width, width and max-width for each cell, beacuse below width for cols in colgroup is set.
      Style for cols applies to all td elements.
             Also check _createCell method because min-width, width and max-width are also set there.
      */
      if (columnAutoWidth && column.width && !column.command) {
        var width = getWidthStyle(column.visibleWidth || column.width);
        var minWidth = getWidthStyle(column.minWidth || width);
        var $rows = $tableElement.children().children('.dx-row').not(".".concat(DETAIL_ROW_CLASS));
        for (var rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
          var $row = $rows.eq(rowIndex);
          var visibleIndex = this.getVisibleColumnIndex(columnIndex, rowIndex);
          var $cell = $row.hasClass(GROUP_ROW_CLASS) ? $row.find("td[aria-colindex='".concat(visibleIndex + 1, "']:not(.").concat(GROUP_CELL_CLASS, ")")) : $row.find('td').eq(visibleIndex);
          var cell = $cell.get(0);
          if (cell) {
            setCellWidth(cell, column, width);
            cell.style.minWidth = minWidth;
          }
        }
      }
      var colWidth = normalizeWidth(widths[columnIndex]);
      if (isDefined(colWidth)) {
        setWidth($cols.eq(columnIndex), colWidth);
      }
    });
  }
  getCellElements(rowIndex) {
    return this._getCellElementsCore(rowIndex);
  }
  _getCellElementsCore(rowIndex) {
    if (rowIndex < 0) {
      return undefined;
    }
    var $row = this._getRowElements().eq(rowIndex);
    return $row.children();
  }
  _getCellElement(rowIndex, columnIdentifier) {
    var $cells = this.getCellElements(rowIndex);
    var columnVisibleIndex = this._getVisibleColumnIndex($cells, rowIndex, columnIdentifier);
    if (!($cells === null || $cells === void 0 ? void 0 : $cells.length) || columnVisibleIndex < 0) {
      return undefined;
    }
    var $cell = $cells.eq(columnVisibleIndex);
    return $cell.length > 0 ? $cell : undefined;
  }
  _getRowElement(rowIndex) {
    var that = this;
    // @ts-expect-error
    var $rowElement = $();
    var $tableElements = that.getTableElements();
    iteratorUtils.each($tableElements, (_, tableElement) => {
      $rowElement = $rowElement.add(that._getRowElements($(tableElement)).eq(rowIndex));
    });
    if ($rowElement.length) {
      return $rowElement;
    }
    return undefined;
  }
  getCellElement(rowIndex, columnIdentifier) {
    var $cell = this._getCellElement(rowIndex, columnIdentifier);
    if ($cell) {
      return getPublicElement($cell);
    }
    return undefined;
  }
  getRowElement(rowIndex) {
    var $rows = this._getRowElement(rowIndex);
    var elements = [];
    // @ts-expect-error
    if ($rows && !getPublicElement($rows).get) {
      for (var i = 0; i < $rows.length; i++) {
        elements.push($rows[i]);
      }
    } else {
      elements = $rows;
    }
    return elements;
  }
  _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
    if (isString(columnIdentifier)) {
      var columnIndex = this._columnsController.columnOption(columnIdentifier, 'index');
      return this._columnsController.getVisibleIndex(columnIndex);
    }
    return columnIdentifier;
  }
  getColumnElements() {}
  getColumns(rowIndex) {
    return this._columnsController.getVisibleColumns(rowIndex);
  }
  getCell(cellPosition, rows, cells) {
    var $rows = rows || this._getRowElements();
    var $cells;
    if ($rows.length > 0 && cellPosition.rowIndex >= 0) {
      if (this.option('scrolling.mode') !== 'virtual' && this.option('scrolling.rowRenderingMode') !== 'virtual') {
        cellPosition.rowIndex = cellPosition.rowIndex < $rows.length ? cellPosition.rowIndex : $rows.length - 1;
      }
      $cells = cells || this.getCellElements(cellPosition.rowIndex);
      if (($cells === null || $cells === void 0 ? void 0 : $cells.length) > 0) {
        return $cells.eq($cells.length > cellPosition.columnIndex ? cellPosition.columnIndex : $cells.length - 1);
      }
    }
  }
  getRowsCount() {
    var tableElement = this.getTableElement();
    if (tableElement && tableElement.length === 1) {
      return tableElement[0].rows.length;
    }
    return 0;
  }
  _getRowElementsCore(tableElement) {
    tableElement = tableElement || this.getTableElement();
    if (tableElement) {
      var hasRowTemplate = this.option().rowTemplate || this.option('dataRowTemplate');
      var tBodies = hasRowTemplate && tableElement.find("> tbody.".concat(ROW_CLASS));
      // eslint-disable-next-line no-useless-concat
      return tBodies && tBodies.length ? tBodies : tableElement.find('> tbody > ' + ".".concat(ROW_CLASS, ", > .").concat(ROW_CLASS));
    }
    // @ts-expect-error
    return $();
  }
  _getRowElements(tableElement) {
    return this._getRowElementsCore(tableElement);
  }
  getRowIndex($row) {
    return this._getRowElements().index($row);
  }
  getBoundingRect() {}
  getName() {}
  setScrollerSpacing(width) {
    var that = this;
    var $element = that.element();
    var rtlEnabled = that.option('rtlEnabled');
    $element && $element.css({
      paddingLeft: rtlEnabled ? width : '',
      paddingRight: !rtlEnabled ? width : ''
    });
  }
  isScrollbarVisible(isHorizontal) {
    var $element = this.element();
    var $tableElement = this._tableElement;
    if ($element && $tableElement) {
      return isHorizontal ? getOuterWidth($tableElement) - getWidth($element) > 0 : getOuterHeight($tableElement) - getHeight($element) > 0;
    }
    return false;
  }
  isDisposed() {
    var _a;
    return (_a = this.component) === null || _a === void 0 ? void 0 : _a._disposed;
  }
  dispose() {
    var _a, _b;
    if (hasWindow()) {
      var window = getWindow();
      (_a = this._templateTimeouts) === null || _a === void 0 ? void 0 : _a.forEach(templateTimeout => window.clearTimeout(templateTimeout));
      (_b = this._templateTimeouts) === null || _b === void 0 ? void 0 : _b.clear();
    }
  }
}
