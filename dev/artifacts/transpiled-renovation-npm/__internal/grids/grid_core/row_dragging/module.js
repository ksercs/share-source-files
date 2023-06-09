"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowDraggingModule = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/../core/renderer"));
var extend_1 = require("../../../../core/../core/utils/extend");
var sortable_1 = __importDefault(require("../../../../ui/sortable"));
var common_1 = require("../../../../core/utils/common");
var module_utils_1 = __importDefault(require("../module_utils"));
var dom_1 = require("./dom");
var const_1 = require("./const");
var RowDraggingExtender = {
    init: function () {
        this.callBase.apply(this, arguments);
        this._updateHandleColumn();
    },
    _allowReordering: function () {
        var rowDragging = this.option('rowDragging');
        return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group));
    },
    _updateHandleColumn: function () {
        var rowDragging = this.option('rowDragging');
        var allowReordering = this._allowReordering();
        var columnsController = this._columnsController;
        var isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
        columnsController && columnsController.addCommandColumn({
            type: 'drag',
            command: 'drag',
            visibleIndex: -2,
            alignment: 'center',
            cssClass: const_1.CLASSES.commandDrag,
            width: 'auto',
            cellTemplate: this._getHandleTemplate(),
            visible: isHandleColumnVisible,
        });
        columnsController.columnOption('type:drag', 'visible', isHandleColumnVisible);
    },
    _renderContent: function () {
        var _this = this;
        var rowDragging = this.option('rowDragging');
        var allowReordering = this._allowReordering();
        var $content = this.callBase.apply(this, arguments);
        var isFixedTableRendering = this._isFixedTableRendering;
        var sortableName = '_sortable';
        var sortableFixedName = '_sortableFixed';
        var currentSortableName = isFixedTableRendering ? sortableFixedName : sortableName;
        var anotherSortableName = isFixedTableRendering ? sortableName : sortableFixedName;
        var togglePointerEventsStyle = function (toggle) {
            var _a;
            // T929503
            (_a = _this[sortableFixedName]) === null || _a === void 0 ? void 0 : _a.$element().css('pointerEvents', toggle ? 'auto' : '');
        };
        var rowSelector = '.dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)';
        var filter = this.option('dataRowTemplate')
            ? "> table > tbody" + rowSelector
            : "> table > tbody > " + rowSelector;
        if ((allowReordering || this[currentSortableName]) && $content.length) {
            this[currentSortableName] = this._createComponent($content, sortable_1.default, extend_1.extend({
                component: this.component,
                contentTemplate: null,
                filter: filter,
                cursorOffset: function (options) {
                    var event = options.event;
                    var rowsViewOffset = renderer_1.default(_this.element()).offset();
                    return {
                        // @ts-expect-error
                        x: event.pageX - rowsViewOffset.left,
                    };
                },
                onDraggableElementShown: function (e) {
                    if (rowDragging.dragTemplate) {
                        return;
                    }
                    var $dragElement = renderer_1.default(e.dragElement);
                    var gridInstance = $dragElement.children('.dx-widget').data(_this.component.NAME);
                    _this._synchronizeScrollLeftPosition(gridInstance);
                },
                dragTemplate: this._getDraggableRowTemplate(),
                handle: rowDragging.showDragIcons && "." + const_1.CLASSES.commandDrag,
                dropFeedbackMode: 'indicate',
            }, rowDragging, {
                onDragStart: function (e) {
                    var _a, _b;
                    (_a = _this.getController('keyboardNavigation')) === null || _a === void 0 ? void 0 : _a._resetFocusedCell();
                    var row = e.component.getVisibleRows()[e.fromIndex];
                    e.itemData = row && row.data;
                    var isDataRow = row && row.rowType === 'data';
                    e.cancel = !allowReordering || !isDataRow;
                    (_b = rowDragging.onDragStart) === null || _b === void 0 ? void 0 : _b.call(rowDragging, e);
                },
                onDragEnter: function () {
                    togglePointerEventsStyle(true);
                },
                onDragLeave: function () {
                    togglePointerEventsStyle(false);
                },
                onDragEnd: function (e) {
                    var _a;
                    togglePointerEventsStyle(false);
                    (_a = rowDragging.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
                },
                onAdd: function (e) {
                    var _a;
                    togglePointerEventsStyle(false);
                    (_a = rowDragging.onAdd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
                },
                dropFeedbackMode: rowDragging.dropFeedbackMode,
                onOptionChanged: function (e) {
                    var hasFixedSortable = _this[sortableFixedName];
                    if (hasFixedSortable) {
                        if (e.name === 'fromIndex' || e.name === 'toIndex') {
                            _this[anotherSortableName].option(e.name, e.value);
                        }
                    }
                },
            }));
            $content.toggleClass('dx-scrollable-container', isFixedTableRendering);
            $content.toggleClass(const_1.CLASSES.sortableWithoutHandle, allowReordering && !rowDragging.showDragIcons);
        }
        return $content;
    },
    _renderCore: function (e) {
        var _this = this;
        this.callBase.apply(this, arguments);
        if (e && e.changeType === 'update'
            && e.repaintChangesOnly
            && module_utils_1.default.isVirtualRowRendering(this)) {
            common_1.deferUpdate(function () {
                _this._updateSortable();
            });
        }
    },
    _updateSortable: function () {
        var offset = this._dataController.getRowIndexOffset();
        [this._sortable, this._sortableFixed].forEach(function (sortable) {
            sortable === null || sortable === void 0 ? void 0 : sortable.option('offset', offset);
            sortable === null || sortable === void 0 ? void 0 : sortable.update();
        });
    },
    _resizeCore: function () {
        this.callBase.apply(this, arguments);
        this._updateSortable();
    },
    _getDraggableGridOptions: function (options) {
        var gridOptions = this.option();
        var columns = this.getColumns();
        var $rowElement = renderer_1.default(this.getRowElement(options.rowIndex));
        return {
            dataSource: [{ id: 1, parentId: 0 }],
            showBorders: true,
            showColumnHeaders: false,
            scrolling: {
                useNative: false,
                showScrollbar: 'never',
            },
            pager: {
                visible: false,
            },
            loadingTimeout: null,
            columnFixing: gridOptions.columnFixing,
            columnAutoWidth: gridOptions.columnAutoWidth,
            showColumnLines: gridOptions.showColumnLines,
            columns: columns.map(function (column) { return ({
                width: column.width || column.visibleWidth,
                fixed: column.fixed,
                fixedPosition: column.fixedPosition,
            }); }),
            onRowPrepared: function (e) {
                var rowsView = e.component.getView('rowsView');
                renderer_1.default(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone());
            },
        };
    },
    _synchronizeScrollLeftPosition: function (gridInstance) {
        var scrollable = gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getScrollable();
        scrollable === null || scrollable === void 0 ? void 0 : scrollable.scrollTo({ x: this._scrollLeft });
    },
    _getDraggableRowTemplate: function () {
        var _this = this;
        return function (options) {
            var $rootElement = _this.component.$element();
            var $dataGridContainer = renderer_1.default('<div>');
            size_1.setWidth($dataGridContainer, size_1.getWidth($rootElement));
            var items = _this._dataController.items();
            var row = items && items[options.fromIndex];
            var gridOptions = _this._getDraggableGridOptions(row);
            _this._createComponent($dataGridContainer, _this.component.NAME, gridOptions);
            $dataGridContainer
                .find('.dx-gridbase-container')
                .children(":not(." + _this.addWidgetPrefix(const_1.CLASSES.rowsView) + ")")
                .hide();
            return $dataGridContainer;
        };
    },
    _getHandleTemplate: function () {
        var _this = this;
        return dom_1.GridCoreRowDraggingDom.createHandleTemplateFunc(function (string) { return _this.addWidgetPrefix(string); });
    },
    optionChanged: function (args) {
        if (args.name === 'rowDragging') {
            this._updateHandleColumn();
            this._invalidate(true, true);
            args.handled = true;
        }
        this.callBase.apply(this, arguments);
    },
};
exports.rowDraggingModule = {
    defaultOptions: function () {
        return {
            rowDragging: {
                showDragIcons: true,
                dropFeedbackMode: 'indicate',
                allowReordering: false,
                allowDropInsideItem: false,
            },
        };
    },
    extenders: {
        views: {
            rowsView: RowDraggingExtender,
        },
    },
};