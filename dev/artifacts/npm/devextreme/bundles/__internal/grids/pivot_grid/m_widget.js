/**
* DevExtreme (bundles/__internal/grids/pivot_grid/m_widget.js)
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
exports.default = exports.PivotGrid = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _string = require("../../../core/utils/string");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _click = require("../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _context_menu = _interopRequireDefault(require("../../../ui/context_menu"));
var _ui = _interopRequireDefault(require("../../../ui/popup/ui.popup"));
var _ui2 = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
var _m_chart_integration = require("./chart_integration/m_chart_integration");
var _m_data_area = _interopRequireDefault(require("./data_area/m_data_area"));
var _m_data_controller = _interopRequireDefault(require("./data_controller/m_data_controller"));
var _m_export = require("./export/m_export");
var _m_field_chooser = require("./field_chooser/m_field_chooser");
var _m_field_chooser_base = require("./field_chooser/m_field_chooser_base");
var _m_fields_area = require("./fields_area/m_fields_area");
var _m_headers_area = _interopRequireDefault(require("./headers_area/m_headers_area"));
var _m_widget_utils = require("./m_widget_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
var DATA_AREA_CELL_CLASS = 'dx-area-data-cell';
var ROW_AREA_CELL_CLASS = 'dx-area-row-cell';
var COLUMN_AREA_CELL_CLASS = 'dx-area-column-cell';
var DESCRIPTION_AREA_CELL_CLASS = 'dx-area-description-cell';
var BORDERS_CLASS = 'dx-pivotgrid-border';
var PIVOTGRID_CLASS = 'dx-pivotgrid';
var ROW_LINES_CLASS = 'dx-row-lines';
var BOTTOM_ROW_CLASS = 'dx-bottom-row';
var BOTTOM_BORDER_CLASS = 'dx-bottom-border';
var FIELDS_CONTAINER_CLASS = 'dx-pivotgrid-fields-container';
var FIELDS_CLASS = 'dx-area-fields';
var FIELD_CHOOSER_POPUP_CLASS = 'dx-fieldchooser-popup';
var INCOMPRESSIBLE_FIELDS_CLASS = 'dx-incompressible-fields';
var OVERFLOW_HIDDEN_CLASS = 'dx-overflow-hidden';
var TR = '<tr>';
var TD = '<td>';
var DIV = '<div>';
var TEST_HEIGHT = 66666;
var FIELD_CALCULATED_OPTIONS = ['allowSorting', 'allowSortingBySummary', 'allowFiltering', 'allowExpandAll'];
function getArraySum(array) {
  var sum = 0;
  (0, _iterator.each)(array, function (_, value) {
    sum += value || 0;
  });
  return sum;
}
function adjustSizeArray(sizeArray, space) {
  var delta = space / sizeArray.length;
  for (var i = 0; i < sizeArray.length; i += 1) {
    sizeArray[i] -= delta;
  }
}
function unsubscribeScrollEvents(area) {
  area.off('scroll').off('stop');
}
function subscribeToScrollEvent(area, handler) {
  unsubscribeScrollEvents(area);
  area.on('scroll', handler).on('stop', handler);
}
function getCommonBorderWidth(elements, direction) {
  var borderStyleNames = direction === 'width' ? ['borderLeftWidth', 'borderRightWidth'] : ['borderTopWidth', 'borderBottomWidth'];
  var width = 0;
  (0, _iterator.each)(elements, function (_, elem) {
    var computedStyle = window.getComputedStyle(elem.get(0));
    borderStyleNames.forEach(function (borderStyleName) {
      width += parseFloat(computedStyle[borderStyleName]) || 0;
    });
  });
  return width;
}
function clickedOnFieldsArea($targetElement) {
  return $targetElement.closest(".".concat(FIELDS_CLASS)).length || $targetElement.find(".".concat(FIELDS_CLASS)).length;
}
var PivotGrid = _ui2.default.inherit({
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      scrolling: {
        timeout: 300,
        renderingThreshold: 150,
        minTimeout: 10,
        mode: 'standard',
        useNative: 'auto',
        removeInvisiblePages: true,
        virtualRowHeight: 50,
        virtualColumnWidth: 100,
        loadTwoPagesOnStart: true
      },
      encodeHtml: true,
      dataSource: null,
      activeStateEnabled: false,
      fieldChooser: {
        minWidth: 250,
        minHeight: 250,
        enabled: true,
        allowSearch: false,
        searchTimeout: 500,
        layout: 0,
        title: _message.default.format('dxPivotGrid-fieldChooserTitle'),
        width: 600,
        height: 600,
        applyChangesMode: 'instantly'
      },
      onContextMenuPreparing: null,
      allowSorting: false,
      allowSortingBySummary: false,
      allowFiltering: false,
      allowExpandAll: false,
      wordWrapEnabled: true,
      fieldPanel: {
        showColumnFields: true,
        showFilterFields: true,
        showDataFields: true,
        showRowFields: true,
        allowFieldDragging: true,
        visible: false,
        texts: {
          columnFieldArea: _message.default.format('dxPivotGrid-columnFieldArea'),
          rowFieldArea: _message.default.format('dxPivotGrid-rowFieldArea'),
          filterFieldArea: _message.default.format('dxPivotGrid-filterFieldArea'),
          dataFieldArea: _message.default.format('dxPivotGrid-dataFieldArea')
        }
      },
      dataFieldArea: 'column',
      export: {
        enabled: false,
        fileName: 'PivotGrid'
      },
      showRowTotals: true,
      showRowGrandTotals: true,
      showColumnTotals: true,
      showColumnGrandTotals: true,
      hideEmptySummaryCells: true,
      showTotalsPrior: 'none',
      rowHeaderLayout: 'standard',
      loadPanel: {
        enabled: true,
        text: _message.default.format('Loading'),
        width: 200,
        height: 70,
        showIndicator: true,
        indicatorSrc: '',
        showPane: true
      },
      texts: {
        grandTotal: _message.default.format('dxPivotGrid-grandTotal'),
        total: _message.default.getFormatter('dxPivotGrid-total'),
        noData: _message.default.format('dxDataGrid-noDataText'),
        showFieldChooser: _message.default.format('dxPivotGrid-showFieldChooser'),
        expandAll: _message.default.format('dxPivotGrid-expandAll'),
        collapseAll: _message.default.format('dxPivotGrid-collapseAll'),
        sortColumnBySummary: _message.default.getFormatter('dxPivotGrid-sortColumnBySummary'),
        sortRowBySummary: _message.default.getFormatter('dxPivotGrid-sortRowBySummary'),
        removeAllSorting: _message.default.format('dxPivotGrid-removeAllSorting'),
        exportToExcel: _message.default.format('dxDataGrid-exportToExcel'),
        dataNotAvailable: _message.default.format('dxPivotGrid-dataNotAvailable')
      },
      onCellClick: null,
      onCellPrepared: null,
      showBorders: false,
      stateStoring: {
        enabled: false,
        storageKey: null,
        type: 'localStorage',
        customLoad: null,
        customSave: null,
        savingTimeout: 2000
      },
      onExpandValueChanging: null,
      renderCellCountLimit: 20000,
      onExporting: null,
      headerFilter: {
        width: 252,
        height: 325,
        allowSelectAll: true,
        showRelevantValues: false,
        search: {
          enabled: false,
          timeout: 500,
          editorOptions: {},
          mode: 'contains'
        },
        texts: {
          emptyValue: _message.default.format('dxDataGrid-headerFilterEmptyValue'),
          ok: _message.default.format('dxDataGrid-headerFilterOK'),
          cancel: _message.default.format('dxDataGrid-headerFilterCancel')
        }
      }
    });
  },
  _updateCalculatedOptions(fields) {
    var that = this;
    (0, _iterator.each)(fields, function (_, field) {
      (0, _iterator.each)(FIELD_CALCULATED_OPTIONS, function (_, optionName) {
        var isCalculated = field._initProperties && optionName in field._initProperties && field._initProperties[optionName] === undefined;
        var needUpdate = field[optionName] === undefined || isCalculated;
        if (needUpdate) {
          (0, _m_widget_utils.setFieldProperty)(field, optionName, that.option(optionName));
        }
      });
    });
  },
  _getDataControllerOptions() {
    var that = this;
    return {
      component: that,
      dataSource: that.option('dataSource'),
      texts: that.option('texts'),
      showRowTotals: that.option('showRowTotals'),
      showRowGrandTotals: that.option('showRowGrandTotals'),
      showColumnTotals: that.option('showColumnTotals'),
      showTotalsPrior: that.option('showTotalsPrior'),
      showColumnGrandTotals: that.option('showColumnGrandTotals'),
      dataFieldArea: that.option('dataFieldArea'),
      rowHeaderLayout: that.option('rowHeaderLayout'),
      hideEmptySummaryCells: that.option('hideEmptySummaryCells'),
      onFieldsPrepared(fields) {
        that._updateCalculatedOptions(fields);
      }
    };
  },
  _initDataController() {
    var that = this;
    that._dataController && that._dataController.dispose();
    that._dataController = new _m_data_controller.default.DataController(that._getDataControllerOptions());
    if ((0, _window.hasWindow)()) {
      that._dataController.changed.add(function () {
        that._render();
      });
    }
    that._dataController.scrollChanged.add(function (options) {
      that._scrollLeft = options.left;
      that._scrollTop = options.top;
    });
    that._dataController.loadingChanged.add(function () {
      that._updateLoading();
    });
    that._dataController.progressChanged.add(that._updateLoading.bind(that));
    that._dataController.dataSourceChanged.add(function () {
      that._trigger('onChanged');
    });
    var expandValueChanging = that.option('onExpandValueChanging');
    if (expandValueChanging) {
      that._dataController.expandValueChanging.add(function (e) {
        expandValueChanging(e);
      });
    }
  },
  _init() {
    var that = this;
    that.callBase();
    that._initDataController();
    _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    that._scrollLeft = that._scrollTop = null;
    that._initActions();
  },
  _initActions() {
    var that = this;
    that._actions = {
      onChanged: that._createActionByOption('onChanged'),
      onContextMenuPreparing: that._createActionByOption('onContextMenuPreparing'),
      onCellClick: that._createActionByOption('onCellClick'),
      onExporting: that._createActionByOption('onExporting'),
      onCellPrepared: that._createActionByOption('onCellPrepared')
    };
  },
  _trigger(eventName, eventArg) {
    this._actions[eventName](eventArg);
  },
  _optionChanged(args) {
    var that = this;
    if (FIELD_CALCULATED_OPTIONS.includes(args.name)) {
      var fields = this.getDataSource().fields();
      this._updateCalculatedOptions(fields);
    }
    switch (args.name) {
      case 'dataSource':
      case 'allowSorting':
      case 'allowFiltering':
      case 'allowExpandAll':
      case 'allowSortingBySummary':
      case 'scrolling':
      case 'stateStoring':
        that._initDataController();
        that._fieldChooserPopup.hide();
        that._renderFieldChooser();
        that._invalidate();
        break;
      case 'texts':
      case 'showTotalsPrior':
      case 'showRowTotals':
      case 'showRowGrandTotals':
      case 'showColumnTotals':
      case 'showColumnGrandTotals':
      case 'hideEmptySummaryCells':
      case 'dataFieldArea':
        that._dataController.updateViewOptions(that._getDataControllerOptions());
        break;
      case 'useNativeScrolling':
      case 'encodeHtml':
      case 'renderCellCountLimit':
        break;
      case 'rtlEnabled':
        that.callBase(args);
        that._renderFieldChooser();
        that._renderContextMenu();
        (0, _window.hasWindow)() && that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
        that._invalidate();
        break;
      case 'export':
        that._renderDescriptionArea();
        break;
      case 'onExpandValueChanging':
        break;
      case 'onCellClick':
      case 'onContextMenuPreparing':
      case 'onExporting':
      case 'onExported':
      case 'onFileSaving':
      case 'onCellPrepared':
        that._actions[args.name] = that._createActionByOption(args.name);
        break;
      case 'fieldChooser':
        that._renderFieldChooser();
        that._renderDescriptionArea();
        break;
      case 'loadPanel':
        if ((0, _window.hasWindow)()) {
          if (args.fullName === 'loadPanel.enabled') {
            clearTimeout(this._hideLoadingTimeoutID);
            that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
          } else {
            that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
            that._invalidate();
          }
        }
        break;
      case 'fieldPanel':
        that._renderDescriptionArea();
        that._invalidate();
        break;
      case 'headerFilter':
        that._renderFieldChooser();
        that._invalidate();
        break;
      case 'showBorders':
        that._tableElement().toggleClass(BORDERS_CLASS, !!args.value);
        that.updateDimensions();
        break;
      case 'wordWrapEnabled':
        that._tableElement().toggleClass('dx-word-wrap', !!args.value);
        that.updateDimensions();
        break;
      case 'rowHeaderLayout':
        that._tableElement().find(".".concat(ROW_AREA_CELL_CLASS)).toggleClass('dx-area-tree-view', args.value === 'tree');
        that._dataController.updateViewOptions(that._getDataControllerOptions());
        break;
      case 'height':
      case 'width':
        that._hasHeight = null;
        that.callBase(args);
        that.resize();
        break;
      default:
        that.callBase(args);
    }
  },
  _updateScrollPosition(columnsArea, rowsArea, dataArea) {
    var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var that = this;
    var scrollTop;
    var scrollLeft;
    var scrolled = that._scrollTop || that._scrollLeft;
    if (that._scrollUpdating) return; // T645458
    that._scrollUpdating = true;
    if (rowsArea && !rowsArea.hasScroll() && that._hasHeight) {
      that._scrollTop = null;
    }
    if (columnsArea && !columnsArea.hasScroll()) {
      that._scrollLeft = null;
    }
    if (that._scrollTop !== null || that._scrollLeft !== null || scrolled || that.option('rtlEnabled')) {
      scrollTop = that._scrollTop || 0;
      scrollLeft = that._scrollLeft || 0;
      dataArea.scrollTo({
        left: scrollLeft,
        top: scrollTop
      }, force);
      columnsArea.scrollTo({
        left: scrollLeft
      }, force);
      rowsArea.scrollTo({
        top: scrollTop
      }, force);
      that._dataController.updateWindowScrollPosition(that._scrollTop);
    }
    that._scrollUpdating = false;
  },
  _subscribeToEvents(columnsArea, rowsArea, dataArea) {
    var that = this;
    var scrollHandler = function scrollHandler(e, area) {
      var scrollOffset = e.scrollOffset;
      var scrollable = area._getScrollable();
      var leftOffset = scrollable.option('direction') !== 'vertical' ? scrollOffset.left : that._scrollLeft;
      var topOffset = scrollable.option('direction') !== 'horizontal' && that._hasHeight ? scrollOffset.top : that._scrollTop;
      if ((that._scrollLeft || 0) !== (leftOffset || 0) || (that._scrollTop || 0) !== (topOffset || 0)) {
        that._scrollLeft = leftOffset;
        that._scrollTop = topOffset;
        that._updateScrollPosition(columnsArea, rowsArea, dataArea);
        if (that.option('scrolling.mode') === 'virtual') {
          that._dataController.setViewportPosition(that._scrollLeft, that._scrollTop);
        }
      }
    };
    (0, _iterator.each)([columnsArea, rowsArea, dataArea], function (_, area) {
      subscribeToScrollEvent(area, function (e) {
        return scrollHandler(e, area);
      });
    });
    !that._hasHeight && that._dataController.subscribeToWindowScrollEvents(dataArea.groupElement());
  },
  _clean: _common.noop,
  _needDelayResizing(cellsInfo) {
    var cellsCount = cellsInfo.length * (cellsInfo.length ? cellsInfo[0].length : 0);
    return cellsCount > this.option('renderCellCountLimit');
  },
  _renderFieldChooser() {
    var _a;
    var that = this;
    var container = that._pivotGridContainer;
    var fieldChooserOptions = that.option('fieldChooser') || {};
    var toolbarItems = fieldChooserOptions.applyChangesMode === 'onDemand' ? [{
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: _message.default.format('OK'),
        onClick() {
          that._fieldChooserPopup.$content().dxPivotGridFieldChooser('applyChanges');
          that._fieldChooserPopup.hide();
        }
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: _message.default.format('Cancel'),
        onClick() {
          that._fieldChooserPopup.hide();
        }
      }
    }] : [];
    var fieldChooserComponentOptions = {
      layout: fieldChooserOptions.layout,
      texts: fieldChooserOptions.texts || {},
      dataSource: that.getDataSource(),
      allowSearch: fieldChooserOptions.allowSearch,
      searchTimeout: fieldChooserOptions.searchTimeout,
      width: undefined,
      height: undefined,
      headerFilter: that.option('headerFilter'),
      encodeHtml: (_a = that.option('fieldChooser.encodeHtml')) !== null && _a !== void 0 ? _a : that.option('encodeHtml'),
      applyChangesMode: fieldChooserOptions.applyChangesMode,
      onContextMenuPreparing(e) {
        that._trigger('onContextMenuPreparing', e);
      }
    };
    var popupOptions = {
      shading: false,
      title: fieldChooserOptions.title,
      width: fieldChooserOptions.width,
      height: fieldChooserOptions.height,
      showCloseButton: true,
      resizeEnabled: true,
      minWidth: fieldChooserOptions.minWidth,
      minHeight: fieldChooserOptions.minHeight,
      toolbarItems,
      onResize(e) {
        e.component.$content().dxPivotGridFieldChooser('updateDimensions');
      },
      onShown(e) {
        that._createComponent(e.component.content(), _m_field_chooser.FieldChooser, fieldChooserComponentOptions);
      },
      onHidden(e) {
        var fieldChooser = e.component.$content().dxPivotGridFieldChooser('instance');
        fieldChooser.resetTreeView();
        fieldChooser.cancelChanges();
      }
    };
    if (that._fieldChooserPopup) {
      that._fieldChooserPopup.option(popupOptions);
      that._fieldChooserPopup.$content().dxPivotGridFieldChooser(fieldChooserComponentOptions);
    } else {
      that._fieldChooserPopup = that._createComponent((0, _renderer.default)(DIV).addClass(FIELD_CHOOSER_POPUP_CLASS).appendTo(container), _ui.default, popupOptions);
    }
  },
  _renderContextMenu() {
    var that = this;
    var $container = that._pivotGridContainer;
    if (that._contextMenu) {
      that._contextMenu.$element().remove();
    }
    that._contextMenu = that._createComponent((0, _renderer.default)(DIV).appendTo($container), _context_menu.default, {
      onPositioning(actionArgs) {
        var event = actionArgs.event;
        actionArgs.cancel = true;
        if (!event) {
          return;
        }
        var targetElement = event.target.cellIndex >= 0 ? event.target : (0, _renderer.default)(event.target).closest('td').get(0);
        if (!targetElement) {
          return;
        }
        var args = that._createEventArgs(targetElement, event);
        var items = that._getContextMenuItems(args);
        if (items) {
          actionArgs.component.option('items', items);
          actionArgs.cancel = false;
        }
      },
      onItemClick(params) {
        params.itemData.onItemClick && params.itemData.onItemClick(params);
      },
      cssClass: PIVOTGRID_CLASS,
      target: that.$element()
    });
  },
  _getContextMenuItems(e) {
    var that = this;
    var items = [];
    var texts = that.option('texts');
    if (e.area === 'row' || e.area === 'column') {
      var areaFields = e["".concat(e.area, "Fields")];
      var oppositeAreaFields = e[e.area === 'column' ? 'rowFields' : 'columnFields'];
      var field = e.cell.path && areaFields[e.cell.path.length - 1];
      var dataSource = that.getDataSource();
      if (field && field.allowExpandAll && e.cell.path.length < e["".concat(e.area, "Fields")].length && !dataSource.paginate()) {
        items.push({
          beginGroup: true,
          icon: 'none',
          text: texts.expandAll,
          onItemClick() {
            dataSource.expandAll(field.index);
          }
        });
        items.push({
          text: texts.collapseAll,
          icon: 'none',
          onItemClick() {
            dataSource.collapseAll(field.index);
          }
        });
      }
      if (e.cell.isLast && !dataSource.paginate()) {
        var sortingBySummaryItemCount = 0;
        (0, _iterator.each)(oppositeAreaFields, function (_, field) {
          if (!field.allowSortingBySummary) {
            return;
          }
          (0, _iterator.each)(e.dataFields, function (dataIndex, dataField) {
            if ((0, _type.isDefined)(e.cell.dataIndex) && e.cell.dataIndex !== dataIndex) {
              return;
            }
            var showDataFieldCaption = !(0, _type.isDefined)(e.cell.dataIndex) && e.dataFields.length > 1;
            var textFormat = e.area === 'column' ? texts.sortColumnBySummary : texts.sortRowBySummary;
            var checked = (0, _m_widget_utils.findField)(e.dataFields, field.sortBySummaryField) === dataIndex && (e.cell.path || []).join('/') === (field.sortBySummaryPath || []).join('/');
            var text = (0, _string.format)(textFormat, showDataFieldCaption ? "".concat(field.caption, " - ").concat(dataField.caption) : field.caption);
            items.push({
              beginGroup: sortingBySummaryItemCount === 0,
              icon: checked ? field.sortOrder === 'desc' ? 'sortdowntext' : 'sortuptext' : 'none',
              text,
              onItemClick() {
                dataSource.field(field.index, {
                  sortBySummaryField: dataField.name || dataField.caption || dataField.dataField,
                  sortBySummaryPath: e.cell.path,
                  sortOrder: field.sortOrder === 'desc' ? 'asc' : 'desc'
                });
                dataSource.load();
              }
            });
            sortingBySummaryItemCount += 1;
          });
        });
        (0, _iterator.each)(oppositeAreaFields, function (_, field) {
          if (!field.allowSortingBySummary || !(0, _type.isDefined)(field.sortBySummaryField)) {
            return undefined;
          }
          items.push({
            beginGroup: sortingBySummaryItemCount === 0,
            icon: 'none',
            text: texts.removeAllSorting,
            onItemClick() {
              (0, _iterator.each)(oppositeAreaFields, function (_, field) {
                dataSource.field(field.index, {
                  sortBySummaryField: undefined,
                  sortBySummaryPath: undefined,
                  sortOrder: undefined
                });
              });
              dataSource.load();
            }
          });
          return false;
        });
      }
    }
    if (that.option('fieldChooser.enabled')) {
      items.push({
        beginGroup: true,
        icon: 'columnchooser',
        text: texts.showFieldChooser,
        onItemClick() {
          that._fieldChooserPopup.show();
        }
      });
    }
    if (that.option('export.enabled')) {
      items.push({
        beginGroup: true,
        icon: 'xlsxfile',
        text: texts.exportToExcel,
        onItemClick() {
          that.exportTo();
        }
      });
    }
    e.items = items;
    that._trigger('onContextMenuPreparing', e);
    items = e.items;
    if (items && items.length) {
      return items;
    }
    return undefined;
  },
  _createEventArgs(targetElement, dxEvent) {
    var that = this;
    var dataSource = that.getDataSource();
    var args = {
      rowFields: dataSource.getAreaFields('row'),
      columnFields: dataSource.getAreaFields('column'),
      dataFields: dataSource.getAreaFields('data'),
      event: dxEvent
    };
    if (clickedOnFieldsArea((0, _renderer.default)(targetElement))) {
      return (0, _extend.extend)(that._createFieldArgs(targetElement), args);
    }
    return (0, _extend.extend)(that._createCellArgs(targetElement), args);
  },
  _createFieldArgs(targetElement) {
    var field = (0, _renderer.default)(targetElement).children().data('field');
    var args = {
      field
    };
    return (0, _type.isDefined)(field) ? args : {};
  },
  _createCellArgs(cellElement) {
    var $cellElement = (0, _renderer.default)(cellElement);
    var columnIndex = cellElement.cellIndex;
    var rowIndex = cellElement.parentElement.rowIndex;
    var $table = $cellElement.closest('table');
    var data = $table.data('data');
    var cell = data && data[rowIndex] && data[rowIndex][columnIndex];
    var args = {
      area: $table.data('area'),
      rowIndex,
      columnIndex,
      cellElement: (0, _element.getPublicElement)($cellElement),
      cell
    };
    return args;
  },
  _handleCellClick(e) {
    var that = this;
    var args = that._createEventArgs(e.currentTarget, e);
    var cell = args.cell;
    if (!cell || !args.area && (args.rowIndex || args.columnIndex)) {
      return;
    }
    that._trigger('onCellClick', args);
    cell && !args.cancel && (0, _type.isDefined)(cell.expanded) && setTimeout(function () {
      that._dataController[cell.expanded ? 'collapseHeaderItem' : 'expandHeaderItem'](args.area, cell.path);
    });
  },
  _getNoDataText() {
    return this.option('texts.noData');
  },
  _renderNoDataText: _m_utils.default.renderNoDataText,
  _renderLoadPanel: _m_utils.default.renderLoadPanel,
  _updateLoading(progress) {
    var that = this;
    var isLoading = that._dataController.isLoading();
    if (!that._loadPanel) return;
    var loadPanelVisible = that._loadPanel.option('visible');
    if (!loadPanelVisible) {
      that._startLoadingTime = new Date();
    }
    if (isLoading) {
      if (progress) {
        if (new Date() - that._startLoadingTime >= 1000) {
          that._loadPanel.option('message', "".concat(Math.floor(progress * 100), "%"));
        }
      } else {
        that._loadPanel.option('message', that.option('loadPanel.text'));
      }
    }
    clearTimeout(that._hideLoadingTimeoutID);
    if (loadPanelVisible && !isLoading) {
      that._hideLoadingTimeoutID = setTimeout(function () {
        that._loadPanel.option('visible', false);
        that.$element().removeClass(OVERFLOW_HIDDEN_CLASS);
      });
    } else {
      var visibilityOptions = {
        visible: isLoading
      };
      if (isLoading) {
        visibilityOptions.position = _m_utils.default.calculateLoadPanelPosition(that._dataArea.groupElement());
      }
      that._loadPanel.option(visibilityOptions);
      that.$element().toggleClass(OVERFLOW_HIDDEN_CLASS, !isLoading);
    }
  },
  _renderDescriptionArea() {
    var _this = this;
    var $element = this.$element();
    var $descriptionCell = $element.find(".".concat(DESCRIPTION_AREA_CELL_CLASS));
    var $toolbarContainer = (0, _renderer.default)(DIV).addClass('dx-pivotgrid-toolbar');
    var fieldPanel = this.option('fieldPanel');
    var $filterHeader = $element.find('.dx-filter-header');
    var $columnHeader = $element.find('.dx-column-header');
    var $targetContainer;
    if (fieldPanel.visible && fieldPanel.showFilterFields) {
      $targetContainer = $filterHeader;
    } else if (fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)) {
      $targetContainer = $columnHeader;
    } else {
      $targetContainer = $descriptionCell;
    }
    $columnHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)));
    $filterHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && fieldPanel.showFilterFields));
    $descriptionCell.toggleClass('dx-pivotgrid-background', fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields || fieldPanel.showRowFields));
    this.$element().find('.dx-pivotgrid-toolbar').remove();
    $toolbarContainer.prependTo($targetContainer);
    if (this.option('fieldChooser.enabled')) {
      var $buttonElement = (0, _renderer.default)(DIV).appendTo($toolbarContainer).addClass('dx-pivotgrid-field-chooser-button');
      var buttonOptions = {
        icon: 'columnchooser',
        hint: this.option('texts.showFieldChooser'),
        onClick: function onClick() {
          _this.getFieldChooserPopup().show();
        }
      };
      this._createComponent($buttonElement, 'dxButton', buttonOptions);
    }
    if (this.option('export.enabled')) {
      var _$buttonElement = (0, _renderer.default)(DIV).appendTo($toolbarContainer).addClass('dx-pivotgrid-export-button');
      var _buttonOptions = {
        icon: 'xlsxfile',
        hint: this.option('texts.exportToExcel'),
        onClick: function onClick() {
          _this.exportTo();
        }
      };
      this._createComponent(_$buttonElement, 'dxButton', _buttonOptions);
    }
  },
  _detectHasContainerHeight() {
    var that = this;
    var element = that.$element();
    if ((0, _type.isDefined)(that._hasHeight)) {
      var height = that.option('height') || that.$element().get(0).style.height;
      if (height && that._hasHeight ^ height !== 'auto') {
        that._hasHeight = null;
      }
    }
    if ((0, _type.isDefined)(that._hasHeight) || element.is(':hidden')) {
      return;
    }
    that._pivotGridContainer.addClass('dx-hidden');
    var testElement = (0, _renderer.default)(DIV);
    (0, _size.setHeight)(testElement, TEST_HEIGHT);
    element.append(testElement);
    that._hasHeight = (0, _size.getHeight)(element) !== TEST_HEIGHT;
    that._pivotGridContainer.removeClass('dx-hidden');
    testElement.remove();
  },
  _renderHeaders(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer) {
    var that = this;
    var dataSource = that.getDataSource();
    that._rowFields = that._rowFields || new _m_fields_area.FieldsArea(that, 'row');
    that._rowFields.render(rowHeaderContainer, dataSource.getAreaFields('row'));
    that._columnFields = that._columnFields || new _m_fields_area.FieldsArea(that, 'column');
    that._columnFields.render(columnHeaderContainer, dataSource.getAreaFields('column'));
    that._filterFields = that._filterFields || new _m_fields_area.FieldsArea(that, 'filter');
    that._filterFields.render(filterHeaderContainer, dataSource.getAreaFields('filter'));
    that._dataFields = that._dataFields || new _m_fields_area.FieldsArea(that, 'data');
    that._dataFields.render(dataHeaderContainer, dataSource.getAreaFields('data'));
    that.$element().dxPivotGridFieldChooserBase('instance').renderSortable();
  },
  _createTableElement() {
    var that = this;
    var $table = (0, _renderer.default)('<table>').css({
      width: '100%'
    }).toggleClass(BORDERS_CLASS, !!that.option('showBorders')).toggleClass('dx-word-wrap', !!that.option('wordWrapEnabled'));
    _events_engine.default.on($table, (0, _index.addNamespace)(_click.name, 'dxPivotGrid'), 'td', that._handleCellClick.bind(that));
    return $table;
  },
  _renderDataArea(dataAreaElement) {
    var that = this;
    var dataArea = that._dataArea || new _m_data_area.default.DataArea(that);
    that._dataArea = dataArea;
    dataArea.render(dataAreaElement, that._dataController.getCellsInfo());
    return dataArea;
  },
  _renderRowsArea(rowsAreaElement) {
    var that = this;
    var rowsArea = that._rowsArea || new _m_headers_area.default.VerticalHeadersArea(that);
    that._rowsArea = rowsArea;
    rowsArea.render(rowsAreaElement, that._dataController.getRowsInfo());
    return rowsArea;
  },
  _renderColumnsArea(columnsAreaElement) {
    var that = this;
    var columnsArea = that._columnsArea || new _m_headers_area.default.HorizontalHeadersArea(that);
    that._columnsArea = columnsArea;
    columnsArea.render(columnsAreaElement, that._dataController.getColumnsInfo());
    return columnsArea;
  },
  _initMarkup() {
    var that = this;
    that.callBase.apply(this, arguments);
    that.$element().addClass(PIVOTGRID_CLASS);
  },
  _renderContentImpl() {
    var that = this;
    var columnsAreaElement;
    var rowsAreaElement;
    var dataAreaElement;
    var tableElement;
    var isFirstDrawing = !that._pivotGridContainer;
    var rowHeaderContainer;
    var columnHeaderContainer;
    var filterHeaderContainer;
    var dataHeaderContainer;
    tableElement = !isFirstDrawing && that._tableElement();
    if (!tableElement) {
      that.$element().addClass(ROW_LINES_CLASS).addClass(FIELDS_CONTAINER_CLASS);
      that._pivotGridContainer = (0, _renderer.default)(DIV).addClass('dx-pivotgrid-container');
      that._renderFieldChooser();
      that._renderContextMenu();
      columnsAreaElement = (0, _renderer.default)(TD).addClass(COLUMN_AREA_CELL_CLASS);
      rowsAreaElement = (0, _renderer.default)(TD).addClass(ROW_AREA_CELL_CLASS);
      dataAreaElement = (0, _renderer.default)(TD).addClass(DATA_AREA_CELL_CLASS);
      tableElement = that._createTableElement();
      dataHeaderContainer = (0, _renderer.default)(TD).addClass('dx-data-header');
      filterHeaderContainer = (0, _renderer.default)('<td>').attr('colspan', '2').addClass('dx-filter-header');
      columnHeaderContainer = (0, _renderer.default)(TD).addClass('dx-column-header');
      rowHeaderContainer = (0, _renderer.default)(TD).addClass(DESCRIPTION_AREA_CELL_CLASS);
      (0, _renderer.default)(TR).append(filterHeaderContainer).appendTo(tableElement);
      (0, _renderer.default)(TR).append(dataHeaderContainer).append(columnHeaderContainer).appendTo(tableElement);
      (0, _renderer.default)(TR).append(rowHeaderContainer).append(columnsAreaElement).appendTo(tableElement);
      (0, _renderer.default)(TR).addClass(BOTTOM_ROW_CLASS).append(rowsAreaElement).append(dataAreaElement).appendTo(tableElement);
      that._pivotGridContainer.append(tableElement);
      that.$element().append(that._pivotGridContainer);
      if (that.option('rowHeaderLayout') === 'tree') {
        rowsAreaElement.addClass('dx-area-tree-view');
      }
    }
    that.$element().addClass(OVERFLOW_HIDDEN_CLASS);
    that._createComponent(that.$element(), _m_field_chooser_base.FieldChooserBase, {
      dataSource: that.getDataSource(),
      encodeHtml: that.option('encodeHtml'),
      allowFieldDragging: that.option('fieldPanel.allowFieldDragging'),
      headerFilter: that.option('headerFilter'),
      visible: that.option('visible'),
      remoteSort: that.option('scrolling.mode') === 'virtual'
    });
    var dataArea = that._renderDataArea(dataAreaElement);
    var rowsArea = that._renderRowsArea(rowsAreaElement);
    var columnsArea = that._renderColumnsArea(columnsAreaElement);
    dataArea.tableElement().prepend(columnsArea.headElement());
    if (isFirstDrawing) {
      that._renderLoadPanel(dataArea.groupElement().parent(), that.$element());
      that._renderDescriptionArea();
      rowsArea.renderScrollable();
      columnsArea.renderScrollable();
      dataArea.renderScrollable();
    }
    [dataArea, rowsArea, columnsArea].forEach(function (area) {
      unsubscribeScrollEvents(area);
    });
    that._renderHeaders(rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer);
    that._update(isFirstDrawing);
  },
  _update(isFirstDrawing) {
    var that = this;
    var updateHandler = function updateHandler() {
      that.updateDimensions();
    };
    if (that._needDelayResizing(that._dataArea.getData()) && isFirstDrawing) {
      setTimeout(updateHandler);
    } else {
      updateHandler();
    }
  },
  _fireContentReadyAction() {
    if (!this._dataController.isLoading()) {
      this.callBase();
    }
  },
  getScrollPath(area) {
    var that = this;
    if (area === 'column') {
      return that._columnsArea.getScrollPath(that._scrollLeft);
    }
    return that._rowsArea.getScrollPath(that._scrollTop);
  },
  getDataSource() {
    return this._dataController.getDataSource();
  },
  getFieldChooserPopup() {
    return this._fieldChooserPopup;
  },
  hasScroll(area) {
    var that = this;
    return area === 'column' ? that._columnsArea.hasScroll() : that._rowsArea.hasScroll();
  },
  _dimensionChanged() {
    this.updateDimensions();
  },
  _visibilityChanged(visible) {
    if (visible) {
      this.updateDimensions();
    }
  },
  _dispose() {
    var that = this;
    clearTimeout(that._hideLoadingTimeoutID);
    that.callBase.apply(that, arguments);
    if (that._dataController) {
      that._dataController.dispose();
    }
  },
  _tableElement() {
    return this.$element().find('table').first();
  },
  addWidgetPrefix(className) {
    return "dx-pivotgrid-".concat(className);
  },
  resize() {
    this.updateDimensions();
  },
  isReady() {
    return this.callBase() && !this._dataController.isLoading();
  },
  updateDimensions() {
    var that = this;
    var groupWidth;
    var tableElement = that._tableElement();
    var bordersWidth;
    var totalWidth = 0;
    var totalHeight = 0;
    var rowsAreaWidth = 0;
    var hasRowsScroll;
    var hasColumnsScroll;
    var dataAreaCell = tableElement.find(".".concat(DATA_AREA_CELL_CLASS));
    var rowAreaCell = tableElement.find(".".concat(ROW_AREA_CELL_CLASS));
    var columnAreaCell = tableElement.find(".".concat(COLUMN_AREA_CELL_CLASS));
    var descriptionCell = tableElement.find(".".concat(DESCRIPTION_AREA_CELL_CLASS));
    var filterHeaderCell = tableElement.find('.dx-filter-header');
    var columnHeaderCell = tableElement.find('.dx-column-header');
    var rowFieldsHeader = that._rowFields;
    // @ts-expect-error
    var d = new _deferred.Deferred();
    if (!(0, _window.hasWindow)()) {
      return undefined;
    }
    var needSynchronizeFieldPanel = rowFieldsHeader.isVisible() && that.option('rowHeaderLayout') !== 'tree';
    that._detectHasContainerHeight();
    if (!that._dataArea.headElement().length) {
      that._dataArea.tableElement().prepend(that._columnsArea.headElement());
    }
    if (needSynchronizeFieldPanel) {
      that._rowsArea.updateColspans(rowFieldsHeader.getColumnsCount());
      that._rowsArea.tableElement().prepend(rowFieldsHeader.headElement());
    }
    tableElement.addClass(INCOMPRESSIBLE_FIELDS_CLASS);
    that._dataArea.reset();
    that._rowsArea.reset();
    that._columnsArea.reset();
    rowFieldsHeader.reset();
    var calculateHasScroll = function calculateHasScroll(areaSize, totalSize) {
      return totalSize - areaSize >= 1;
    };
    var calculateGroupHeight = function calculateGroupHeight(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth) {
      return hasRowsScroll ? dataAreaHeight : totalHeight + (hasColumnsScroll ? scrollBarWidth : 0);
    };
    (0, _common.deferUpdate)(function () {
      var rowHeights = that._rowsArea.getRowsHeight();
      var descriptionCellHeight = (0, _size.getOuterHeight)(descriptionCell[0], true) + (needSynchronizeFieldPanel ? rowHeights[0] : 0);
      var filterAreaHeight = 0;
      var dataAreaHeight = 0;
      if (that._hasHeight) {
        filterAreaHeight = (0, _size.getHeight)(filterHeaderCell);
        var $dataHeader = tableElement.find('.dx-data-header');
        var dataHeaderHeight = (0, _size.getHeight)($dataHeader);
        bordersWidth = getCommonBorderWidth([columnAreaCell, dataAreaCell, tableElement, columnHeaderCell, filterHeaderCell], 'height');
        dataAreaHeight = (0, _size.getHeight)(that.$element()) - filterAreaHeight - dataHeaderHeight - (Math.max((0, _size.getHeight)(that._dataArea.headElement()), (0, _size.getHeight)(columnAreaCell), descriptionCellHeight) + bordersWidth);
      }
      var scrollBarWidth = that._dataArea.getScrollbarWidth();
      var hasVerticalScrollbar = calculateHasScroll(dataAreaHeight, (0, _size.getHeight)(that._dataArea.tableElement()));
      that._dataArea.tableElement().css({
        width: that._hasHeight && hasVerticalScrollbar && scrollBarWidth ? "calc(100% - ".concat(scrollBarWidth, "px)") : '100%'
      });
      var resultWidths = that._dataArea.getColumnsWidth();
      var rowsAreaHeights = needSynchronizeFieldPanel ? rowHeights.slice(1) : rowHeights;
      var dataAreaHeights = that._dataArea.getRowsHeight();
      var columnsAreaRowCount = that._dataController.getColumnsInfo().length;
      var resultHeights = (0, _m_widget_utils.mergeArraysByMaxValue)(rowsAreaHeights, dataAreaHeights.slice(columnsAreaRowCount));
      var columnsAreaRowHeights = dataAreaHeights.slice(0, columnsAreaRowCount);
      var columnsAreaHeight = getArraySum(columnsAreaRowHeights);
      var rowsAreaColumnWidths = that._rowsArea.getColumnsWidth();
      totalWidth = (0, _size.getWidth)(that._dataArea.tableElement());
      totalHeight = getArraySum(resultHeights);
      if (!totalWidth || !totalHeight) {
        d.resolve();
        return;
      }
      rowsAreaWidth = getArraySum(rowsAreaColumnWidths);
      var elementWidth = (0, _size.getWidth)(that.$element());
      bordersWidth = getCommonBorderWidth([rowAreaCell, dataAreaCell, tableElement], 'width');
      groupWidth = elementWidth - rowsAreaWidth - bordersWidth;
      groupWidth = groupWidth > 0 ? groupWidth : totalWidth;
      var diff = totalWidth - groupWidth;
      var needAdjustWidthOnZoom = diff >= 0 && diff <= 2;
      if (needAdjustWidthOnZoom) {
        // T914454
        adjustSizeArray(resultWidths, diff);
        totalWidth = groupWidth;
      }
      hasRowsScroll = that._hasHeight && calculateHasScroll(dataAreaHeight, totalHeight);
      hasColumnsScroll = calculateHasScroll(groupWidth, totalWidth);
      var groupHeight = calculateGroupHeight(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
      (0, _common.deferRender)(function () {
        that._columnsArea.tableElement().append(that._dataArea.headElement());
        rowFieldsHeader.tableElement().append(that._rowsArea.headElement());
        if (descriptionCellHeight > columnsAreaHeight) {
          adjustSizeArray(columnsAreaRowHeights, columnsAreaHeight - descriptionCellHeight);
          that._columnsArea.setRowsHeight(columnsAreaRowHeights);
        }
        tableElement.removeClass(INCOMPRESSIBLE_FIELDS_CLASS);
        columnHeaderCell.children().css('maxWidth', groupWidth);
        that._columnsArea.setGroupWidth(groupWidth);
        that._columnsArea.processScrollBarSpacing(hasRowsScroll ? scrollBarWidth : 0);
        that._columnsArea.setColumnsWidth(resultWidths);
        that._rowsArea.setGroupHeight(that._hasHeight ? groupHeight : 'auto');
        that._rowsArea.processScrollBarSpacing(hasColumnsScroll ? scrollBarWidth : 0);
        // B232690
        that._rowsArea.setColumnsWidth(rowsAreaColumnWidths);
        that._rowsArea.setRowsHeight(resultHeights);
        that._dataArea.setColumnsWidth(resultWidths);
        that._dataArea.setRowsHeight(resultHeights);
        that._dataArea.setGroupWidth(groupWidth);
        that._dataArea.setGroupHeight(that._hasHeight ? groupHeight : 'auto');
        needSynchronizeFieldPanel && rowFieldsHeader.setColumnsWidth(rowsAreaColumnWidths);
        dataAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll);
        rowAreaCell.toggleClass(BOTTOM_BORDER_CLASS, !hasRowsScroll);
        // T317921
        if (!that._hasHeight && elementWidth !== (0, _size.getWidth)(that.$element())) {
          var _diff = elementWidth - (0, _size.getWidth)(that.$element());
          if (!hasColumnsScroll) {
            adjustSizeArray(resultWidths, _diff);
            that._columnsArea.setColumnsWidth(resultWidths);
            that._dataArea.setColumnsWidth(resultWidths);
          }
          that._dataArea.setGroupWidth(groupWidth - _diff);
          that._columnsArea.setGroupWidth(groupWidth - _diff);
        }
        if (that._hasHeight && that._filterFields.isVisible() && (0, _size.getHeight)(filterHeaderCell) !== filterAreaHeight) {
          var _diff2 = (0, _size.getHeight)(filterHeaderCell) - filterAreaHeight;
          if (_diff2 > 0) {
            hasRowsScroll = calculateHasScroll(dataAreaHeight - _diff2, totalHeight);
            var _groupHeight = calculateGroupHeight(dataAreaHeight - _diff2, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
            that._dataArea.setGroupHeight(_groupHeight);
            that._rowsArea.setGroupHeight(_groupHeight);
          }
        }
        var scrollingOptions = that.option('scrolling');
        if (scrollingOptions.mode === 'virtual') {
          that._setVirtualContentParams(scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, that._hasHeight, rowsAreaWidth);
        }
        var updateScrollableResults = [];
        that._dataArea.updateScrollableOptions({
          direction: that._dataArea.getScrollableDirection(hasColumnsScroll, hasRowsScroll),
          rtlEnabled: that.option('rtlEnabled')
        });
        that._columnsArea.updateScrollableOptions({
          rtlEnabled: that.option('rtlEnabled')
        });
        (0, _iterator.each)([that._columnsArea, that._rowsArea, that._dataArea], function (_, area) {
          updateScrollableResults.push(area && area.updateScrollable());
        });
        that._updateLoading();
        that._renderNoDataText(dataAreaCell);
        _deferred.when.apply(_renderer.default, updateScrollableResults).done(function () {
          that._updateScrollPosition(that._columnsArea, that._rowsArea, that._dataArea, true);
          that._subscribeToEvents(that._columnsArea, that._rowsArea, that._dataArea);
          d.resolve();
        });
      });
    });
    return d;
  },
  _setVirtualContentParams(scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, hasHeight, rowsAreaWidth) {
    var virtualContentParams = this._dataController.calculateVirtualContentParams({
      virtualRowHeight: scrollingOptions.virtualRowHeight,
      virtualColumnWidth: scrollingOptions.virtualColumnWidth,
      itemWidths: resultWidths,
      itemHeights: resultHeights,
      rowCount: resultHeights.length,
      columnCount: resultWidths.length,
      viewportWidth: groupWidth,
      viewportHeight: hasHeight ? groupHeight : (0, _size.getOuterHeight)(window)
    });
    this._dataArea.setVirtualContentParams({
      top: virtualContentParams.contentTop,
      left: virtualContentParams.contentLeft,
      width: virtualContentParams.width,
      height: virtualContentParams.height
    });
    this._rowsArea.setVirtualContentParams({
      top: virtualContentParams.contentTop,
      width: rowsAreaWidth,
      height: virtualContentParams.height
    });
    this._columnsArea.setVirtualContentParams({
      left: virtualContentParams.contentLeft,
      width: virtualContentParams.width,
      height: (0, _size.getHeight)(this._columnsArea.groupElement())
    });
  },
  applyPartialDataSource(area, path, dataSource) {
    this._dataController.applyPartialDataSource(area, path, dataSource);
  }
}).inherit(_m_export.ExportController).include(_m_chart_integration.ChartIntegrationMixin);
exports.PivotGrid = PivotGrid;
(0, _component_registrator.default)('dxPivotGrid', PivotGrid);
var _default = {
  PivotGrid
};
exports.default = _default;
