/**
* DevExtreme (bundles/__internal/grids/pivot_grid/module_widget.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotGrid = void 0;
var renderer_1 = __importDefault(require("../../../core/renderer"));
var window_1 = require("../../../core/utils/window");
var events_engine_1 = __importDefault(require("../../../events/core/events_engine"));
var component_registrator_1 = __importDefault(require("../../../core/component_registrator"));
var element_1 = require("../../../core/element");
var string_1 = require("../../../core/utils/string");
var common_1 = require("../../../core/utils/common");
var iterator_1 = require("../../../core/utils/iterator");
var type_1 = require("../../../core/utils/type");
var extend_1 = require("../../../core/utils/extend");
var click_1 = require("../../../events/click");
var message_1 = __importDefault(require("../../../localization/message"));
var ui_widget_1 = __importDefault(require("../../../ui/widget/ui.widget"));
var index_1 = require("../../../events/utils/index");
var ui_grid_core_utils_1 = __importDefault(require("../../../ui/grid_core/ui.grid_core.utils"));
var size_1 = require("../../../core/utils/size");
var ui_popup_1 = __importDefault(require("../../../ui/popup/ui.popup"));
var context_menu_1 = __importDefault(require("../../../ui/context_menu"));
var deferred_1 = require("../../../core/utils/deferred");
var module_widget_utils_1 = require("./module_widget_utils");
var module_1 = __importDefault(require("./data_controller/module"));
var module_2 = __importDefault(require("./data_area/module"));
var module_3 = __importDefault(require("./headers_area/module"));
var module_4 = require("./fields_area/module");
var module_5 = require("./field_chooser/module");
var module_base_1 = require("./field_chooser/module_base");
var module_6 = require("./export/module");
var module_7 = require("./chart_integration/module");
var window = window_1.getWindow();
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
    iterator_1.each(array, function (_, value) {
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
    area.off('scroll')
        .off('stop');
}
function subscribeToScrollEvent(area, handler) {
    unsubscribeScrollEvents(area);
    area.on('scroll', handler)
        .on('stop', handler);
}
function getCommonBorderWidth(elements, direction) {
    var borderStyleNames = direction === 'width' ? ['borderLeftWidth', 'borderRightWidth'] : ['borderTopWidth', 'borderBottomWidth'];
    var width = 0;
    iterator_1.each(elements, function (_, elem) {
        var computedStyle = window.getComputedStyle(elem.get(0));
        borderStyleNames.forEach(function (borderStyleName) {
            width += parseFloat(computedStyle[borderStyleName]) || 0;
        });
    });
    return width;
}
function clickedOnFieldsArea($targetElement) {
    return $targetElement.closest("." + FIELDS_CLASS).length || $targetElement.find("." + FIELDS_CLASS).length;
}
var PivotGrid = ui_widget_1.default.inherit({
    _getDefaultOptions: function () {
        return extend_1.extend(this.callBase(), {
            scrolling: {
                timeout: 300,
                renderingThreshold: 150,
                minTimeout: 10,
                mode: 'standard',
                useNative: 'auto',
                removeInvisiblePages: true,
                virtualRowHeight: 50,
                virtualColumnWidth: 100,
                loadTwoPagesOnStart: true,
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
                title: message_1.default.format('dxPivotGrid-fieldChooserTitle'),
                width: 600,
                height: 600,
                applyChangesMode: 'instantly',
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
                    columnFieldArea: message_1.default.format('dxPivotGrid-columnFieldArea'),
                    rowFieldArea: message_1.default.format('dxPivotGrid-rowFieldArea'),
                    filterFieldArea: message_1.default.format('dxPivotGrid-filterFieldArea'),
                    dataFieldArea: message_1.default.format('dxPivotGrid-dataFieldArea'),
                },
            },
            dataFieldArea: 'column',
            export: {
                enabled: false,
                fileName: 'PivotGrid',
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
                text: message_1.default.format('Loading'),
                width: 200,
                height: 70,
                showIndicator: true,
                indicatorSrc: '',
                showPane: true,
            },
            texts: {
                grandTotal: message_1.default.format('dxPivotGrid-grandTotal'),
                total: message_1.default.getFormatter('dxPivotGrid-total'),
                noData: message_1.default.format('dxDataGrid-noDataText'),
                showFieldChooser: message_1.default.format('dxPivotGrid-showFieldChooser'),
                expandAll: message_1.default.format('dxPivotGrid-expandAll'),
                collapseAll: message_1.default.format('dxPivotGrid-collapseAll'),
                sortColumnBySummary: message_1.default.getFormatter('dxPivotGrid-sortColumnBySummary'),
                sortRowBySummary: message_1.default.getFormatter('dxPivotGrid-sortRowBySummary'),
                removeAllSorting: message_1.default.format('dxPivotGrid-removeAllSorting'),
                exportToExcel: message_1.default.format('dxDataGrid-exportToExcel'),
                dataNotAvailable: message_1.default.format('dxPivotGrid-dataNotAvailable'),
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
                savingTimeout: 2000,
            },
            onExpandValueChanging: null,
            renderCellCountLimit: 20000,
            onExporting: null,
            headerFilter: {
                width: 252,
                height: 325,
                allowSearch: false,
                showRelevantValues: false,
                searchTimeout: 500,
                texts: {
                    emptyValue: message_1.default.format('dxDataGrid-headerFilterEmptyValue'),
                    ok: message_1.default.format('dxDataGrid-headerFilterOK'),
                    cancel: message_1.default.format('dxDataGrid-headerFilterCancel'),
                },
            },
        });
    },
    _updateCalculatedOptions: function (fields) {
        var that = this;
        iterator_1.each(fields, function (_, field) {
            iterator_1.each(FIELD_CALCULATED_OPTIONS, function (_, optionName) {
                var isCalculated = field._initProperties
                    && (optionName in field._initProperties)
                    && (field._initProperties[optionName] === undefined);
                var needUpdate = field[optionName] === undefined || isCalculated;
                if (needUpdate) {
                    module_widget_utils_1.setFieldProperty(field, optionName, that.option(optionName));
                }
            });
        });
    },
    _getDataControllerOptions: function () {
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
            onFieldsPrepared: function (fields) {
                that._updateCalculatedOptions(fields);
            },
        };
    },
    _initDataController: function () {
        var that = this;
        that._dataController && that._dataController.dispose();
        that._dataController = new module_1.default
            .DataController(that._getDataControllerOptions());
        if (window_1.hasWindow()) {
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
    _init: function () {
        var that = this;
        that.callBase();
        that._initDataController();
        that._scrollLeft = that._scrollTop = null;
        that._initActions();
    },
    _initActions: function () {
        var that = this;
        that._actions = {
            onChanged: that._createActionByOption('onChanged'),
            onContextMenuPreparing: that._createActionByOption('onContextMenuPreparing'),
            onCellClick: that._createActionByOption('onCellClick'),
            onExporting: that._createActionByOption('onExporting'),
            onCellPrepared: that._createActionByOption('onCellPrepared'),
        };
    },
    _trigger: function (eventName, eventArg) {
        this._actions[eventName](eventArg);
    },
    _optionChanged: function (args) {
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
                window_1.hasWindow() && that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
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
                if (window_1.hasWindow()) {
                    if (args.fullName === 'loadPanel.enabled') {
                        clearTimeout(this._hideLoadingTimeoutID);
                        that._renderLoadPanel(that._dataArea.groupElement(), that.$element());
                    }
                    else {
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
                that._tableElement().find("." + ROW_AREA_CELL_CLASS).toggleClass('dx-area-tree-view', args.value === 'tree');
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
    _updateScrollPosition: function (columnsArea, rowsArea, dataArea, force) {
        if (force === void 0) { force = false; }
        var that = this;
        var scrollTop;
        var scrollLeft;
        var scrolled = that._scrollTop || that._scrollLeft;
        if (that._scrollUpdating)
            return; // T645458
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
            dataArea.scrollTo({ left: scrollLeft, top: scrollTop }, force);
            columnsArea.scrollTo({ left: scrollLeft }, force);
            rowsArea.scrollTo({ top: scrollTop }, force);
            that._dataController.updateWindowScrollPosition(that._scrollTop);
        }
        that._scrollUpdating = false;
    },
    _subscribeToEvents: function (columnsArea, rowsArea, dataArea) {
        var that = this;
        var scrollHandler = function (e, area) {
            var scrollOffset = e.scrollOffset;
            var scrollable = area._getScrollable();
            var leftOffset = scrollable.option('direction') !== 'vertical' ? scrollOffset.left : that._scrollLeft;
            var topOffset = scrollable.option('direction') !== 'horizontal' && that._hasHeight ? scrollOffset.top : that._scrollTop;
            if ((that._scrollLeft || 0) !== (leftOffset || 0)
                || (that._scrollTop || 0) !== (topOffset || 0)) {
                that._scrollLeft = leftOffset;
                that._scrollTop = topOffset;
                that._updateScrollPosition(columnsArea, rowsArea, dataArea);
                if (that.option('scrolling.mode') === 'virtual') {
                    that._dataController.setViewportPosition(that._scrollLeft, that._scrollTop);
                }
            }
        };
        iterator_1.each([columnsArea, rowsArea, dataArea], function (_, area) {
            subscribeToScrollEvent(area, function (e) { return scrollHandler(e, area); });
        });
        !that._hasHeight && that._dataController.subscribeToWindowScrollEvents(dataArea.groupElement());
    },
    _clean: common_1.noop,
    _needDelayResizing: function (cellsInfo) {
        var cellsCount = cellsInfo.length * (cellsInfo.length ? cellsInfo[0].length : 0);
        return cellsCount > this.option('renderCellCountLimit');
    },
    _renderFieldChooser: function () {
        var _a;
        var that = this;
        var container = that._pivotGridContainer;
        var fieldChooserOptions = that.option('fieldChooser') || {};
        var toolbarItems = fieldChooserOptions.applyChangesMode === 'onDemand' ? [
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: message_1.default.format('OK'),
                    onClick: function () {
                        that._fieldChooserPopup.$content().dxPivotGridFieldChooser('applyChanges');
                        that._fieldChooserPopup.hide();
                    },
                },
            },
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: message_1.default.format('Cancel'),
                    onClick: function () {
                        that._fieldChooserPopup.hide();
                    },
                },
            },
        ] : [];
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
            onContextMenuPreparing: function (e) {
                that._trigger('onContextMenuPreparing', e);
            },
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
            toolbarItems: toolbarItems,
            onResize: function (e) {
                e.component.$content().dxPivotGridFieldChooser('updateDimensions');
            },
            onShown: function (e) {
                that._createComponent(e.component.content(), module_5.FieldChooser, fieldChooserComponentOptions);
            },
            onHidden: function (e) {
                var fieldChooser = e.component.$content().dxPivotGridFieldChooser('instance');
                fieldChooser.resetTreeView();
                fieldChooser.cancelChanges();
            },
        };
        if (that._fieldChooserPopup) {
            that._fieldChooserPopup.option(popupOptions);
            that._fieldChooserPopup.$content().dxPivotGridFieldChooser(fieldChooserComponentOptions);
        }
        else {
            that._fieldChooserPopup = that._createComponent(renderer_1.default(DIV)
                .addClass(FIELD_CHOOSER_POPUP_CLASS)
                .appendTo(container), ui_popup_1.default, popupOptions);
        }
    },
    _renderContextMenu: function () {
        var that = this;
        var $container = that._pivotGridContainer;
        if (that._contextMenu) {
            that._contextMenu.$element().remove();
        }
        that._contextMenu = that._createComponent(renderer_1.default(DIV).appendTo($container), context_menu_1.default, {
            onPositioning: function (actionArgs) {
                var event = actionArgs.event;
                actionArgs.cancel = true;
                if (!event) {
                    return;
                }
                var targetElement = event.target.cellIndex >= 0 ? event.target : renderer_1.default(event.target).closest('td').get(0);
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
            onItemClick: function (params) {
                params.itemData.onItemClick && params.itemData.onItemClick(params);
            },
            cssClass: PIVOTGRID_CLASS,
            target: that.$element(),
        });
    },
    _getContextMenuItems: function (e) {
        var that = this;
        var items = [];
        var texts = that.option('texts');
        if (e.area === 'row' || e.area === 'column') {
            var areaFields = e[e.area + "Fields"];
            var oppositeAreaFields_1 = e[e.area === 'column' ? 'rowFields' : 'columnFields'];
            var field_1 = e.cell.path && areaFields[e.cell.path.length - 1];
            var dataSource_1 = that.getDataSource();
            if (field_1 && field_1.allowExpandAll && e.cell.path.length < e[e.area + "Fields"].length && !dataSource_1.paginate()) {
                items.push({
                    beginGroup: true,
                    icon: 'none',
                    text: texts.expandAll,
                    onItemClick: function () {
                        dataSource_1.expandAll(field_1.index);
                    },
                });
                items.push({
                    text: texts.collapseAll,
                    icon: 'none',
                    onItemClick: function () {
                        dataSource_1.collapseAll(field_1.index);
                    },
                });
            }
            if (e.cell.isLast && !dataSource_1.paginate()) {
                var sortingBySummaryItemCount_1 = 0;
                iterator_1.each(oppositeAreaFields_1, function (_, field) {
                    if (!field.allowSortingBySummary) {
                        return;
                    }
                    iterator_1.each(e.dataFields, function (dataIndex, dataField) {
                        if (type_1.isDefined(e.cell.dataIndex) && e.cell.dataIndex !== dataIndex) {
                            return;
                        }
                        var showDataFieldCaption = !type_1.isDefined(e.cell.dataIndex) && e.dataFields.length > 1;
                        var textFormat = e.area === 'column' ? texts.sortColumnBySummary : texts.sortRowBySummary;
                        var checked = module_widget_utils_1.findField(e.dataFields, field.sortBySummaryField) === dataIndex && (e.cell.path || []).join('/') === (field.sortBySummaryPath || []).join('/');
                        var text = string_1.format(textFormat, showDataFieldCaption ? field.caption + " - " + dataField.caption : field.caption);
                        items.push({
                            beginGroup: sortingBySummaryItemCount_1 === 0,
                            icon: checked ? field.sortOrder === 'desc' ? 'sortdowntext' : 'sortuptext' : 'none',
                            text: text,
                            onItemClick: function () {
                                dataSource_1.field(field.index, {
                                    sortBySummaryField: dataField.name || dataField.caption || dataField.dataField,
                                    sortBySummaryPath: e.cell.path,
                                    sortOrder: field.sortOrder === 'desc' ? 'asc' : 'desc',
                                });
                                dataSource_1.load();
                            },
                        });
                        sortingBySummaryItemCount_1 += 1;
                    });
                });
                iterator_1.each(oppositeAreaFields_1, function (_, field) {
                    if (!field.allowSortingBySummary || !type_1.isDefined(field.sortBySummaryField)) {
                        return undefined;
                    }
                    items.push({
                        beginGroup: sortingBySummaryItemCount_1 === 0,
                        icon: 'none',
                        text: texts.removeAllSorting,
                        onItemClick: function () {
                            iterator_1.each(oppositeAreaFields_1, function (_, field) {
                                dataSource_1.field(field.index, {
                                    sortBySummaryField: undefined,
                                    sortBySummaryPath: undefined,
                                    sortOrder: undefined,
                                });
                            });
                            dataSource_1.load();
                        },
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
                onItemClick: function () {
                    that._fieldChooserPopup.show();
                },
            });
        }
        if (that.option('export.enabled')) {
            items.push({
                beginGroup: true,
                icon: 'xlsxfile',
                text: texts.exportToExcel,
                onItemClick: function () {
                    that.exportTo();
                },
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
    _createEventArgs: function (targetElement, dxEvent) {
        var that = this;
        var dataSource = that.getDataSource();
        var args = {
            rowFields: dataSource.getAreaFields('row'),
            columnFields: dataSource.getAreaFields('column'),
            dataFields: dataSource.getAreaFields('data'),
            event: dxEvent,
        };
        if (clickedOnFieldsArea(renderer_1.default(targetElement))) {
            return extend_1.extend(that._createFieldArgs(targetElement), args);
        }
        return extend_1.extend(that._createCellArgs(targetElement), args);
    },
    _createFieldArgs: function (targetElement) {
        var field = renderer_1.default(targetElement).children().data('field');
        var args = {
            field: field,
        };
        return type_1.isDefined(field) ? args : {};
    },
    _createCellArgs: function (cellElement) {
        var $cellElement = renderer_1.default(cellElement);
        var columnIndex = cellElement.cellIndex;
        var rowIndex = cellElement.parentElement.rowIndex;
        var $table = $cellElement.closest('table');
        var data = $table.data('data');
        var cell = data && data[rowIndex] && data[rowIndex][columnIndex];
        var args = {
            area: $table.data('area'),
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            cellElement: element_1.getPublicElement($cellElement),
            cell: cell,
        };
        return args;
    },
    _handleCellClick: function (e) {
        var that = this;
        var args = that._createEventArgs(e.currentTarget, e);
        var cell = args.cell;
        if (!cell || (!args.area && (args.rowIndex || args.columnIndex))) {
            return;
        }
        that._trigger('onCellClick', args);
        cell && !args.cancel && type_1.isDefined(cell.expanded) && setTimeout(function () {
            that._dataController[cell.expanded ? 'collapseHeaderItem' : 'expandHeaderItem'](args.area, cell.path);
        });
    },
    _getNoDataText: function () {
        return this.option('texts.noData');
    },
    _renderNoDataText: ui_grid_core_utils_1.default.renderNoDataText,
    _renderLoadPanel: ui_grid_core_utils_1.default.renderLoadPanel,
    _updateLoading: function (progress) {
        var that = this;
        var isLoading = that._dataController.isLoading();
        if (!that._loadPanel)
            return;
        var loadPanelVisible = that._loadPanel.option('visible');
        if (!loadPanelVisible) {
            that._startLoadingTime = new Date();
        }
        if (isLoading) {
            if (progress) {
                if (new Date() - that._startLoadingTime >= 1000) {
                    that._loadPanel.option('message', Math.floor(progress * 100) + "%");
                }
            }
            else {
                that._loadPanel.option('message', that.option('loadPanel.text'));
            }
        }
        clearTimeout(that._hideLoadingTimeoutID);
        if (loadPanelVisible && !isLoading) {
            that._hideLoadingTimeoutID = setTimeout(function () {
                that._loadPanel.option('visible', false);
                that.$element().removeClass(OVERFLOW_HIDDEN_CLASS);
            });
        }
        else {
            var visibilityOptions = {
                visible: isLoading,
            };
            if (isLoading) {
                visibilityOptions.position = ui_grid_core_utils_1.default.calculateLoadPanelPosition(that._dataArea.groupElement());
            }
            that._loadPanel.option(visibilityOptions);
            that.$element().toggleClass(OVERFLOW_HIDDEN_CLASS, !isLoading);
        }
    },
    _renderDescriptionArea: function () {
        var _this = this;
        var $element = this.$element();
        var $descriptionCell = $element.find("." + DESCRIPTION_AREA_CELL_CLASS);
        var $toolbarContainer = renderer_1.default(DIV).addClass('dx-pivotgrid-toolbar');
        var fieldPanel = this.option('fieldPanel');
        var $filterHeader = $element.find('.dx-filter-header');
        var $columnHeader = $element.find('.dx-column-header');
        var $targetContainer;
        if (fieldPanel.visible && fieldPanel.showFilterFields) {
            $targetContainer = $filterHeader;
        }
        else if (fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)) {
            $targetContainer = $columnHeader;
        }
        else {
            $targetContainer = $descriptionCell;
        }
        $columnHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && (fieldPanel.showDataFields || fieldPanel.showColumnFields)));
        $filterHeader.toggleClass(BOTTOM_BORDER_CLASS, !!(fieldPanel.visible && fieldPanel.showFilterFields));
        $descriptionCell.toggleClass('dx-pivotgrid-background', fieldPanel.visible
            && (fieldPanel.showDataFields || fieldPanel.showColumnFields || fieldPanel.showRowFields));
        this.$element().find('.dx-pivotgrid-toolbar').remove();
        $toolbarContainer.prependTo($targetContainer);
        if (this.option('fieldChooser.enabled')) {
            var $buttonElement = renderer_1.default(DIV)
                .appendTo($toolbarContainer)
                .addClass('dx-pivotgrid-field-chooser-button');
            var buttonOptions = {
                icon: 'columnchooser',
                hint: this.option('texts.showFieldChooser'),
                onClick: function () {
                    _this.getFieldChooserPopup().show();
                },
            };
            this._createComponent($buttonElement, 'dxButton', buttonOptions);
        }
        if (this.option('export.enabled')) {
            var $buttonElement = renderer_1.default(DIV)
                .appendTo($toolbarContainer)
                .addClass('dx-pivotgrid-export-button');
            var buttonOptions = {
                icon: 'xlsxfile',
                hint: this.option('texts.exportToExcel'),
                onClick: function () {
                    _this.exportTo();
                },
            };
            this._createComponent($buttonElement, 'dxButton', buttonOptions);
        }
    },
    _detectHasContainerHeight: function () {
        var that = this;
        var element = that.$element();
        if (type_1.isDefined(that._hasHeight)) {
            var height = that.option('height') || that.$element().get(0).style.height;
            if (height && (that._hasHeight ^ (height !== 'auto'))) {
                that._hasHeight = null;
            }
        }
        if (type_1.isDefined(that._hasHeight) || element.is(':hidden')) {
            return;
        }
        that._pivotGridContainer.addClass('dx-hidden');
        var testElement = renderer_1.default(DIV);
        size_1.setHeight(testElement, TEST_HEIGHT);
        element.append(testElement);
        that._hasHeight = size_1.getHeight(element) !== TEST_HEIGHT;
        that._pivotGridContainer.removeClass('dx-hidden');
        testElement.remove();
    },
    _renderHeaders: function (rowHeaderContainer, columnHeaderContainer, filterHeaderContainer, dataHeaderContainer) {
        var that = this;
        var dataSource = that.getDataSource();
        that._rowFields = that._rowFields || new module_4.FieldsArea(that, 'row');
        that._rowFields.render(rowHeaderContainer, dataSource.getAreaFields('row'));
        that._columnFields = that._columnFields || new module_4.FieldsArea(that, 'column');
        that._columnFields.render(columnHeaderContainer, dataSource.getAreaFields('column'));
        that._filterFields = that._filterFields || new module_4.FieldsArea(that, 'filter');
        that._filterFields.render(filterHeaderContainer, dataSource.getAreaFields('filter'));
        that._dataFields = that._dataFields || new module_4.FieldsArea(that, 'data');
        that._dataFields.render(dataHeaderContainer, dataSource.getAreaFields('data'));
        that.$element().dxPivotGridFieldChooserBase('instance').renderSortable();
    },
    _createTableElement: function () {
        var that = this;
        var $table = renderer_1.default('<table>')
            .css({ width: '100%' })
            .toggleClass(BORDERS_CLASS, !!that.option('showBorders'))
            .toggleClass('dx-word-wrap', !!that.option('wordWrapEnabled'));
        events_engine_1.default.on($table, index_1.addNamespace(click_1.name, 'dxPivotGrid'), 'td', that._handleCellClick.bind(that));
        return $table;
    },
    _renderDataArea: function (dataAreaElement) {
        var that = this;
        var dataArea = that._dataArea || new module_2.default.DataArea(that);
        that._dataArea = dataArea;
        dataArea.render(dataAreaElement, that._dataController.getCellsInfo());
        return dataArea;
    },
    _renderRowsArea: function (rowsAreaElement) {
        var that = this;
        var rowsArea = that._rowsArea || new module_3.default.VerticalHeadersArea(that);
        that._rowsArea = rowsArea;
        rowsArea.render(rowsAreaElement, that._dataController.getRowsInfo());
        return rowsArea;
    },
    _renderColumnsArea: function (columnsAreaElement) {
        var that = this;
        var columnsArea = that._columnsArea || new module_3.default.HorizontalHeadersArea(that);
        that._columnsArea = columnsArea;
        columnsArea.render(columnsAreaElement, that._dataController.getColumnsInfo());
        return columnsArea;
    },
    _initMarkup: function () {
        var that = this;
        that.callBase.apply(this, arguments);
        that.$element().addClass(PIVOTGRID_CLASS);
    },
    _renderContentImpl: function () {
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
            that.$element().addClass(ROW_LINES_CLASS)
                .addClass(FIELDS_CONTAINER_CLASS);
            that._pivotGridContainer = renderer_1.default(DIV).addClass('dx-pivotgrid-container');
            that._renderFieldChooser();
            that._renderContextMenu();
            columnsAreaElement = renderer_1.default(TD).addClass(COLUMN_AREA_CELL_CLASS);
            rowsAreaElement = renderer_1.default(TD).addClass(ROW_AREA_CELL_CLASS);
            dataAreaElement = renderer_1.default(TD).addClass(DATA_AREA_CELL_CLASS);
            tableElement = that._createTableElement();
            dataHeaderContainer = renderer_1.default(TD).addClass('dx-data-header');
            filterHeaderContainer = renderer_1.default('<td>').attr('colspan', '2').addClass('dx-filter-header');
            columnHeaderContainer = renderer_1.default(TD).addClass('dx-column-header');
            rowHeaderContainer = renderer_1.default(TD).addClass(DESCRIPTION_AREA_CELL_CLASS);
            renderer_1.default(TR)
                .append(filterHeaderContainer)
                .appendTo(tableElement);
            renderer_1.default(TR)
                .append(dataHeaderContainer)
                .append(columnHeaderContainer)
                .appendTo(tableElement);
            renderer_1.default(TR)
                .append(rowHeaderContainer)
                .append(columnsAreaElement)
                .appendTo(tableElement);
            renderer_1.default(TR)
                .addClass(BOTTOM_ROW_CLASS)
                .append(rowsAreaElement)
                .append(dataAreaElement)
                .appendTo(tableElement);
            that._pivotGridContainer.append(tableElement);
            that.$element().append(that._pivotGridContainer);
            if (that.option('rowHeaderLayout') === 'tree') {
                rowsAreaElement.addClass('dx-area-tree-view');
            }
        }
        that.$element().addClass(OVERFLOW_HIDDEN_CLASS);
        that._createComponent(that.$element(), module_base_1.FieldChooserBase, {
            dataSource: that.getDataSource(),
            encodeHtml: that.option('encodeHtml'),
            allowFieldDragging: that.option('fieldPanel.allowFieldDragging'),
            headerFilter: that.option('headerFilter'),
            visible: that.option('visible'),
            remoteSort: that.option('scrolling.mode') === 'virtual',
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
    _update: function (isFirstDrawing) {
        var that = this;
        var updateHandler = function () {
            that.updateDimensions();
        };
        if (that._needDelayResizing(that._dataArea.getData()) && isFirstDrawing) {
            setTimeout(updateHandler);
        }
        else {
            updateHandler();
        }
    },
    _fireContentReadyAction: function () {
        if (!this._dataController.isLoading()) {
            this.callBase();
        }
    },
    getScrollPath: function (area) {
        var that = this;
        if (area === 'column') {
            return that._columnsArea.getScrollPath(that._scrollLeft);
        }
        return that._rowsArea.getScrollPath(that._scrollTop);
    },
    getDataSource: function () {
        return this._dataController.getDataSource();
    },
    getFieldChooserPopup: function () {
        return this._fieldChooserPopup;
    },
    hasScroll: function (area) {
        var that = this;
        return area === 'column' ? that._columnsArea.hasScroll() : that._rowsArea.hasScroll();
    },
    _dimensionChanged: function () {
        this.updateDimensions();
    },
    _visibilityChanged: function (visible) {
        if (visible) {
            this.updateDimensions();
        }
    },
    _dispose: function () {
        var that = this;
        clearTimeout(that._hideLoadingTimeoutID);
        that.callBase.apply(that, arguments);
        if (that._dataController) {
            that._dataController.dispose();
        }
    },
    _tableElement: function () {
        return this.$element().find('table').first();
    },
    addWidgetPrefix: function (className) {
        return "dx-pivotgrid-" + className;
    },
    resize: function () {
        this.updateDimensions();
    },
    isReady: function () {
        return this.callBase() && !this._dataController.isLoading();
    },
    updateDimensions: function () {
        var that = this;
        var groupWidth;
        var tableElement = that._tableElement();
        var bordersWidth;
        var totalWidth = 0;
        var totalHeight = 0;
        var rowsAreaWidth = 0;
        var hasRowsScroll;
        var hasColumnsScroll;
        var dataAreaCell = tableElement.find("." + DATA_AREA_CELL_CLASS);
        var rowAreaCell = tableElement.find("." + ROW_AREA_CELL_CLASS);
        var columnAreaCell = tableElement.find("." + COLUMN_AREA_CELL_CLASS);
        var descriptionCell = tableElement.find("." + DESCRIPTION_AREA_CELL_CLASS);
        var filterHeaderCell = tableElement.find('.dx-filter-header');
        var columnHeaderCell = tableElement.find('.dx-column-header');
        var rowFieldsHeader = that._rowFields;
        // @ts-expect-error
        var d = new deferred_1.Deferred();
        if (!window_1.hasWindow()) {
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
        var calculateHasScroll = function (areaSize, totalSize) { return totalSize - areaSize >= 1; };
        var calculateGroupHeight = function (dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth) { return (hasRowsScroll
            ? dataAreaHeight
            : totalHeight + (hasColumnsScroll ? scrollBarWidth : 0)); };
        common_1.deferUpdate(function () {
            var rowHeights = that._rowsArea.getRowsHeight();
            var descriptionCellHeight = size_1.getOuterHeight(descriptionCell[0], true)
                + (needSynchronizeFieldPanel ? rowHeights[0] : 0);
            var filterAreaHeight = 0;
            var dataAreaHeight = 0;
            if (that._hasHeight) {
                filterAreaHeight = size_1.getHeight(filterHeaderCell);
                var $dataHeader = tableElement.find('.dx-data-header');
                var dataHeaderHeight = size_1.getHeight($dataHeader);
                bordersWidth = getCommonBorderWidth([columnAreaCell, dataAreaCell, tableElement, columnHeaderCell, filterHeaderCell], 'height');
                dataAreaHeight = size_1.getHeight(that.$element()) - filterAreaHeight - dataHeaderHeight
                    - (Math.max(size_1.getHeight(that._dataArea.headElement()), size_1.getHeight(columnAreaCell), descriptionCellHeight)
                        + bordersWidth);
            }
            var scrollBarWidth = that._dataArea.getScrollbarWidth();
            var hasVerticalScrollbar = calculateHasScroll(dataAreaHeight, size_1.getHeight(that._dataArea.tableElement()));
            that._dataArea.tableElement().css({
                width: that._hasHeight && hasVerticalScrollbar && scrollBarWidth
                    ? "calc(100% - " + scrollBarWidth + "px)"
                    : '100%',
            });
            var resultWidths = that._dataArea.getColumnsWidth();
            var rowsAreaHeights = needSynchronizeFieldPanel ? rowHeights.slice(1) : rowHeights;
            var dataAreaHeights = that._dataArea.getRowsHeight();
            var columnsAreaRowCount = that._dataController.getColumnsInfo().length;
            var resultHeights = module_widget_utils_1.mergeArraysByMaxValue(rowsAreaHeights, dataAreaHeights.slice(columnsAreaRowCount));
            var columnsAreaRowHeights = dataAreaHeights.slice(0, columnsAreaRowCount);
            var columnsAreaHeight = getArraySum(columnsAreaRowHeights);
            var rowsAreaColumnWidths = that._rowsArea.getColumnsWidth();
            totalWidth = size_1.getWidth(that._dataArea.tableElement());
            totalHeight = getArraySum(resultHeights);
            if (!totalWidth || !totalHeight) {
                d.resolve();
                return;
            }
            rowsAreaWidth = getArraySum(rowsAreaColumnWidths);
            var elementWidth = size_1.getWidth(that.$element());
            bordersWidth = getCommonBorderWidth([rowAreaCell, dataAreaCell, tableElement], 'width');
            groupWidth = elementWidth - rowsAreaWidth - bordersWidth;
            groupWidth = groupWidth > 0 ? groupWidth : totalWidth;
            var diff = totalWidth - groupWidth;
            var needAdjustWidthOnZoom = diff >= 0 && diff <= 2;
            if (needAdjustWidthOnZoom) { // T914454
                adjustSizeArray(resultWidths, diff);
                totalWidth = groupWidth;
            }
            hasRowsScroll = that._hasHeight && calculateHasScroll(dataAreaHeight, totalHeight);
            hasColumnsScroll = calculateHasScroll(groupWidth, totalWidth);
            /// #DEBUG
            that.__scrollBarUseNative = that._dataArea.getUseNativeValue();
            that.__scrollBarWidth = scrollBarWidth;
            /// #ENDDEBUG
            var groupHeight = calculateGroupHeight(dataAreaHeight, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
            common_1.deferRender(function () {
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
                if (!that._hasHeight && (elementWidth !== size_1.getWidth(that.$element()))) {
                    var diff_1 = elementWidth - size_1.getWidth(that.$element());
                    if (!hasColumnsScroll) {
                        adjustSizeArray(resultWidths, diff_1);
                        that._columnsArea.setColumnsWidth(resultWidths);
                        that._dataArea.setColumnsWidth(resultWidths);
                    }
                    that._dataArea.setGroupWidth(groupWidth - diff_1);
                    that._columnsArea.setGroupWidth(groupWidth - diff_1);
                }
                if (that._hasHeight && that._filterFields.isVisible()
                    && size_1.getHeight(filterHeaderCell) !== filterAreaHeight) {
                    var diff_2 = size_1.getHeight(filterHeaderCell) - filterAreaHeight;
                    if (diff_2 > 0) {
                        hasRowsScroll = calculateHasScroll(dataAreaHeight - diff_2, totalHeight);
                        var groupHeight_1 = calculateGroupHeight(dataAreaHeight - diff_2, totalHeight, hasRowsScroll, hasColumnsScroll, scrollBarWidth);
                        that._dataArea.setGroupHeight(groupHeight_1);
                        that._rowsArea.setGroupHeight(groupHeight_1);
                    }
                }
                var scrollingOptions = that.option('scrolling');
                if (scrollingOptions.mode === 'virtual') {
                    that._setVirtualContentParams(scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, that._hasHeight, rowsAreaWidth);
                }
                var updateScrollableResults = [];
                that._dataArea.updateScrollableOptions({
                    direction: that._dataArea.getScrollableDirection(hasColumnsScroll, hasRowsScroll),
                    rtlEnabled: that.option('rtlEnabled'),
                });
                that._columnsArea.updateScrollableOptions({
                    rtlEnabled: that.option('rtlEnabled'),
                });
                iterator_1.each([that._columnsArea, that._rowsArea, that._dataArea], function (_, area) {
                    updateScrollableResults.push(area && area.updateScrollable());
                });
                that._updateLoading();
                that._renderNoDataText(dataAreaCell);
                /// #DEBUG
                that._testResultWidths = resultWidths;
                that._testResultHeights = resultHeights;
                /// #ENDDEBUG
                deferred_1.when.apply(renderer_1.default, updateScrollableResults).done(function () {
                    that._updateScrollPosition(that._columnsArea, that._rowsArea, that._dataArea, true);
                    that._subscribeToEvents(that._columnsArea, that._rowsArea, that._dataArea);
                    d.resolve();
                });
            });
        });
        return d;
    },
    _setVirtualContentParams: function (scrollingOptions, resultWidths, resultHeights, groupWidth, groupHeight, hasHeight, rowsAreaWidth) {
        var virtualContentParams = this._dataController.calculateVirtualContentParams({
            virtualRowHeight: scrollingOptions.virtualRowHeight,
            virtualColumnWidth: scrollingOptions.virtualColumnWidth,
            itemWidths: resultWidths,
            itemHeights: resultHeights,
            rowCount: resultHeights.length,
            columnCount: resultWidths.length,
            viewportWidth: groupWidth,
            viewportHeight: hasHeight ? groupHeight : size_1.getOuterHeight(window),
        });
        this._dataArea.setVirtualContentParams({
            top: virtualContentParams.contentTop,
            left: virtualContentParams.contentLeft,
            width: virtualContentParams.width,
            height: virtualContentParams.height,
        });
        this._rowsArea.setVirtualContentParams({
            top: virtualContentParams.contentTop,
            width: rowsAreaWidth,
            height: virtualContentParams.height,
        });
        this._columnsArea.setVirtualContentParams({
            left: virtualContentParams.contentLeft,
            width: virtualContentParams.width,
            height: size_1.getHeight(this._columnsArea.groupElement()),
        });
    },
    applyPartialDataSource: function (area, path, dataSource) {
        this._dataController.applyPartialDataSource(area, path, dataSource);
    },
})
    .inherit(module_6.ExportController)
    .include(module_7.ChartIntegrationMixin);
exports.PivotGrid = PivotGrid;
component_registrator_1.default('dxPivotGrid', PivotGrid);
exports.default = { PivotGrid: PivotGrid };
