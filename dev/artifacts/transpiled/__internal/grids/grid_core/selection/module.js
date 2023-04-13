"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionModule = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var type_1 = require("../../../../core/utils/type");
var iterator_1 = require("../../../../core/utils/iterator");
var extend_1 = require("../../../../core/utils/extend");
var support_1 = require("../../../../core/utils/support");
var click_1 = require("../../../../events/click");
var message_1 = __importDefault(require("../../../../localization/message"));
var index_1 = require("../../../../events/utils/index");
var hold_1 = __importDefault(require("../../../../events/hold"));
var selection_1 = __importDefault(require("../../../../ui/selection/selection"));
var deferred_1 = require("../../../../core/utils/deferred");
var ui_errors_1 = __importDefault(require("../../../../ui/widget/ui.errors"));
var common_1 = require("../../../../core/utils/common");
var module_utils_1 = __importDefault(require("../module_utils"));
var modules_1 = __importDefault(require("../modules"));
var EDITOR_CELL_CLASS = 'dx-editor-cell';
var ROW_CLASS = 'dx-row';
var ROW_SELECTION_CLASS = 'dx-selection';
var SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
var CHECKBOXES_HIDDEN_CLASS = 'dx-select-checkboxes-hidden';
var COMMAND_SELECT_CLASS = 'dx-command-select';
var SELECTION_DISABLED_CLASS = 'dx-selection-disabled';
var DATA_ROW_CLASS = 'dx-data-row';
var SHOW_CHECKBOXES_MODE = 'selection.showCheckBoxesMode';
var SELECTION_MODE = 'selection.mode';
var processLongTap = function (that, dxEvent) {
    var selectionController = that.getController('selection');
    var rowsView = that.getView('rowsView');
    var $row = renderer_1.default(dxEvent.target).closest("." + DATA_ROW_CLASS);
    var rowIndex = rowsView.getRowIndex($row);
    if (rowIndex < 0)
        return;
    if (that.option(SHOW_CHECKBOXES_MODE) === 'onLongTap') {
        if (selectionController.isSelectionWithCheckboxes()) {
            selectionController.stopSelectionWithCheckboxes();
        }
        else {
            selectionController.startSelectionWithCheckboxes();
        }
    }
    else {
        if (that.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
            selectionController.startSelectionWithCheckboxes();
        }
        if (that.option(SHOW_CHECKBOXES_MODE) !== 'always') {
            selectionController.changeItemSelection(rowIndex, { control: true });
        }
    }
};
var SelectionController = modules_1.default.Controller.inherit((function () {
    var isSeveralRowsSelected = function (that, selectionFilter) {
        var keyIndex = 0;
        var store = that._dataController.store();
        var key = store && store.key();
        var isComplexKey = Array.isArray(key);
        if (!selectionFilter.length) {
            return false;
        }
        if (isComplexKey && Array.isArray(selectionFilter[0]) && selectionFilter[1] === 'and') {
            for (var i = 0; i < selectionFilter.length; i++) {
                if (Array.isArray(selectionFilter[i])) {
                    if (selectionFilter[i][0] !== key[keyIndex] || selectionFilter[i][1] !== '=') {
                        return true;
                    }
                    keyIndex++;
                }
            }
            return false;
        }
        return key !== selectionFilter[0];
    };
    var selectionCellTemplate = function (container, options) {
        var component = options.component;
        var rowsView = component.getView('rowsView');
        if (component.option('renderAsync') && !component.option('selection.deferred')) {
            options.value = component.isRowSelected(options.row.key);
        }
        rowsView.renderSelectCheckBoxContainer(renderer_1.default(container), options);
    };
    var selectionHeaderTemplate = function (container, options) {
        var column = options.column;
        var $cellElement = renderer_1.default(container);
        var columnHeadersView = options.component.getView('columnHeadersView');
        $cellElement.addClass(EDITOR_CELL_CLASS);
        columnHeadersView._renderSelectAllCheckBox($cellElement, column);
        columnHeadersView._attachSelectAllCheckBoxClickEvent($cellElement);
    };
    return {
        init: function () {
            var _a = this.option('selection') || {}, deferred = _a.deferred, selectAllMode = _a.selectAllMode, mode = _a.mode;
            if (this.option('scrolling.mode') === 'infinite' && !deferred && mode === 'multiple' && selectAllMode === 'allPages') {
                ui_errors_1.default.log('W1018');
            }
            this._dataController = this.getController('data');
            this._selectionMode = mode;
            this._isSelectionWithCheckboxes = false;
            this._selection = this._createSelection();
            this._updateSelectColumn();
            this.createAction('onSelectionChanged', { excludeValidators: ['disabled', 'readOnly'] });
            this._dataController && this._dataController.pushed.add(this._handleDataPushed.bind(this));
        },
        _handleDataPushed: function (changes) {
            var removedKeys = changes
                .filter(function (change) { return change.type === 'remove'; })
                .map(function (change) { return change.key; });
            if (this.option('selection.deferred')) {
                var selectedKeys_1 = this._dataController.items()
                    .filter(function (item) { return item.isSelected; })
                    .map(function (item) { return item.key; });
                removedKeys = removedKeys
                    .filter(function (key) { return selectedKeys_1.find(function (selectedKey) { return common_1.equalByValue(selectedKey, key); }); });
            }
            removedKeys.length && this.deselectRows(removedKeys);
        },
        _getSelectionConfig: function () {
            var dataController = this._dataController;
            var columnsController = this.getController('columns');
            var selectionOptions = this.option('selection') || {};
            var deferred = selectionOptions.deferred;
            var scrollingMode = this.option('scrolling.mode');
            var virtualPaging = scrollingMode === 'virtual' || scrollingMode === 'infinite';
            var allowSelectAll = this.option('selection.allowSelectAll');
            var legacyScrollingMode = this.option('scrolling.legacyMode');
            return {
                selectedKeys: this.option('selectedRowKeys'),
                mode: this._selectionMode,
                deferred: deferred,
                maxFilterLengthInRequest: selectionOptions.maxFilterLengthInRequest,
                selectionFilter: this.option('selectionFilter'),
                ignoreDisabledItems: true,
                allowLoadByRange: function () {
                    var hasGroupColumns = columnsController.getGroupColumns().length > 0;
                    return virtualPaging && !legacyScrollingMode && !hasGroupColumns && allowSelectAll && !deferred;
                },
                key: function () {
                    return dataController === null || dataController === void 0 ? void 0 : dataController.key();
                },
                keyOf: function (item) {
                    return dataController === null || dataController === void 0 ? void 0 : dataController.keyOf(item);
                },
                dataFields: function () {
                    var _a;
                    return (_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.select();
                },
                load: function (options) {
                    var _a;
                    // @ts-expect-error
                    return ((_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.load(options)) || new deferred_1.Deferred().resolve([]);
                },
                plainItems: function () {
                    return dataController.items(true);
                },
                isItemSelected: function (item) {
                    return item.selected;
                },
                isSelectableItem: function (item) {
                    return (item === null || item === void 0 ? void 0 : item.rowType) === 'data' && !item.isNewRow;
                },
                getItemData: function (item) {
                    return type_1.isDefined(item === null || item === void 0 ? void 0 : item.rowType) ? (item === null || item === void 0 ? void 0 : item.oldData) || (item === null || item === void 0 ? void 0 : item.data) : item;
                },
                filter: function () {
                    return dataController.getCombinedFilter(deferred);
                },
                totalCount: function () { return dataController.totalCount(); },
                getLoadOptions: function (loadItemIndex, focusedItemIndex, shiftItemIndex) {
                    var _a, _b;
                    var _c = (_b = (_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.lastLoadOptions()) !== null && _b !== void 0 ? _b : {}, sort = _c.sort, filter = _c.filter;
                    var minIndex = Math.min(loadItemIndex, focusedItemIndex);
                    var maxIndex = Math.max(loadItemIndex, focusedItemIndex);
                    if (type_1.isDefined(shiftItemIndex)) {
                        minIndex = Math.min(shiftItemIndex, minIndex);
                        maxIndex = Math.max(shiftItemIndex, maxIndex);
                    }
                    var take = maxIndex - minIndex + 1;
                    return {
                        skip: minIndex,
                        take: take,
                        filter: filter,
                        sort: sort,
                    };
                },
                onSelectionChanged: this._updateSelectedItems.bind(this),
            };
        },
        _updateSelectColumn: function () {
            var columnsController = this.getController('columns');
            var isSelectColumnVisible = this.isSelectColumnVisible();
            columnsController.addCommandColumn({
                type: 'selection',
                command: 'select',
                visible: isSelectColumnVisible,
                visibleIndex: -1,
                dataType: 'boolean',
                alignment: 'center',
                cssClass: COMMAND_SELECT_CLASS,
                width: 'auto',
                cellTemplate: selectionCellTemplate,
                headerCellTemplate: selectionHeaderTemplate,
            });
            columnsController.columnOption('command:select', 'visible', isSelectColumnVisible);
        },
        _createSelection: function () {
            var options = this._getSelectionConfig();
            return new selection_1.default(options);
        },
        _fireSelectionChanged: function (options) {
            var argument = this.option('selection.deferred')
                ? { selectionFilter: this.option('selectionFilter') }
                : { selectedRowKeys: this.option('selectedRowKeys') };
            this.selectionChanged.fire(argument);
            if (options) {
                this.executeAction('onSelectionChanged', options);
            }
        },
        _updateCheckboxesState: function (options) {
            var isDeferredMode = options.isDeferredMode;
            var selectionFilter = options.selectionFilter;
            var selectedItemKeys = options.selectedItemKeys;
            var removedItemKeys = options.removedItemKeys;
            if (this.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
                if (isDeferredMode ? selectionFilter && isSeveralRowsSelected(this, selectionFilter) : selectedItemKeys.length > 1) {
                    this.startSelectionWithCheckboxes();
                }
                else if (isDeferredMode ? selectionFilter && !selectionFilter.length : selectedItemKeys.length === 0 && removedItemKeys.length) {
                    this.stopSelectionWithCheckboxes();
                }
            }
        },
        _updateSelectedItems: function (args) {
            var that = this;
            var selectionChangedOptions;
            var isDeferredMode = that.option('selection.deferred');
            var selectionFilter = that._selection.selectionFilter();
            var dataController = that._dataController;
            var items = dataController.items(true);
            var visibleItems = dataController.items();
            if (!items) {
                return;
            }
            var isSelectionWithCheckboxes = that.isSelectionWithCheckboxes();
            var changedItemIndexes = that.getChangedItemIndexes(items);
            var visibleChangedItemIndexes = that.getChangedItemIndexes(visibleItems);
            that._updateCheckboxesState({
                selectedItemKeys: args.selectedItemKeys,
                removedItemKeys: args.removedItemKeys,
                selectionFilter: selectionFilter,
                isDeferredMode: isDeferredMode,
            });
            if (changedItemIndexes.length || (isSelectionWithCheckboxes !== that.isSelectionWithCheckboxes())) {
                dataController.updateItems({
                    changeType: 'updateSelection',
                    itemIndexes: visibleChangedItemIndexes,
                });
            }
            if (isDeferredMode) {
                that.option('selectionFilter', selectionFilter);
                selectionChangedOptions = {};
            }
            else if (args.addedItemKeys.length || args.removedItemKeys.length) {
                that._selectedItemsInternalChange = true;
                that.option('selectedRowKeys', args.selectedItemKeys.slice(0));
                that._selectedItemsInternalChange = false;
                selectionChangedOptions = {
                    selectedRowsData: args.selectedItems.slice(0),
                    selectedRowKeys: args.selectedItemKeys.slice(0),
                    currentSelectedRowKeys: args.addedItemKeys.slice(0),
                    currentDeselectedRowKeys: args.removedItemKeys.slice(0),
                };
            }
            that._fireSelectionChanged(selectionChangedOptions);
        },
        getChangedItemIndexes: function (items) {
            var that = this;
            var itemIndexes = [];
            var isDeferredSelection = this.option('selection.deferred');
            for (var i = 0, length = items.length; i < length; i++) {
                var row = items[i];
                var isItemSelected = that.isRowSelected(isDeferredSelection ? row.data : row.key);
                if (that._selection.isDataItem(row) && row.isSelected !== isItemSelected) {
                    itemIndexes.push(i);
                }
            }
            return itemIndexes;
        },
        callbackNames: function () {
            return ['selectionChanged'];
        },
        optionChanged: function (args) {
            var _this = this;
            this.callBase(args);
            // eslint-disable-next-line default-case
            switch (args.name) {
                case 'selection': {
                    var oldSelectionMode = this._selectionMode;
                    this.init();
                    if (args.fullName !== 'selection.showCheckBoxesMode') {
                        var selectionMode = this._selectionMode;
                        var selectedRowKeys = this.option('selectedRowKeys');
                        if (oldSelectionMode !== selectionMode) {
                            if (selectionMode === 'single') {
                                if (selectedRowKeys.length > 1) {
                                    selectedRowKeys = [selectedRowKeys[0]];
                                }
                            }
                            else if (selectionMode !== 'multiple') {
                                selectedRowKeys = [];
                            }
                        }
                        this.selectRows(selectedRowKeys).always(function () {
                            _this._fireSelectionChanged();
                        });
                    }
                    this.getController('columns').updateColumns();
                    args.handled = true;
                    break;
                }
                case 'selectionFilter':
                    this._selection.selectionFilter(args.value);
                    args.handled = true;
                    break;
                case 'selectedRowKeys': {
                    var value = args.value || [];
                    if (Array.isArray(value) && !this._selectedItemsInternalChange && (this.component.getDataSource() || !value.length)) {
                        this.selectRows(value);
                    }
                    args.handled = true;
                    break;
                }
            }
        },
        publicMethods: function () {
            return ['selectRows', 'deselectRows', 'selectRowsByIndexes', 'getSelectedRowKeys', 'getSelectedRowsData', 'clearSelection', 'selectAll', 'deselectAll', 'startSelectionWithCheckboxes', 'stopSelectionWithCheckboxes', 'isRowSelected'];
        },
        isRowSelected: function (arg) {
            return this._selection.isItemSelected(arg);
        },
        isSelectColumnVisible: function () {
            return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this.option(SHOW_CHECKBOXES_MODE) === 'onClick' || this._isSelectionWithCheckboxes);
        },
        _isOnePageSelectAll: function () {
            return this.option('selection.selectAllMode') === 'page';
        },
        isSelectAll: function () {
            return this._selection.getSelectAllState(this._isOnePageSelectAll());
        },
        selectAll: function () {
            if (this.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
                this.startSelectionWithCheckboxes();
            }
            return this._selection.selectAll(this._isOnePageSelectAll());
        },
        deselectAll: function () {
            return this._selection.deselectAll(this._isOnePageSelectAll());
        },
        clearSelection: function () {
            return this.selectedItemKeys([]);
        },
        refresh: function () {
            var selectedRowKeys = this.option('selectedRowKeys') || [];
            if (!this.option('selection.deferred') && selectedRowKeys.length) {
                return this.selectedItemKeys(selectedRowKeys);
            }
            // @ts-expect-error
            return new deferred_1.Deferred().resolve().promise();
        },
        selectedItemKeys: function (value, preserve, isDeselect, isSelectAll) {
            return this._selection.selectedItemKeys(value, preserve, isDeselect, isSelectAll);
        },
        getSelectedRowKeys: function () {
            return this._selection.getSelectedItemKeys();
        },
        selectRows: function (keys, preserve) {
            return this.selectedItemKeys(keys, preserve);
        },
        deselectRows: function (keys) {
            return this.selectedItemKeys(keys, true, true);
        },
        selectRowsByIndexes: function (indexes) {
            var items = this._dataController.items();
            var keys = [];
            if (!Array.isArray(indexes)) {
                indexes = Array.prototype.slice.call(arguments, 0);
            }
            iterator_1.each(indexes, function () {
                var item = items[this];
                if (item && item.rowType === 'data') {
                    keys.push(item.key);
                }
            });
            return this.selectRows(keys);
        },
        getSelectedRowsData: function () {
            return this._selection.getSelectedItems();
        },
        changeItemSelection: function (visibleItemIndex, keys, setFocusOnly) {
            keys = keys || {};
            if (this.isSelectionWithCheckboxes()) {
                keys.control = true;
            }
            var loadedItemIndex = visibleItemIndex + this._dataController.getRowIndexOffset() - this._dataController.getRowIndexOffset(true);
            return this._selection.changeItemSelection(loadedItemIndex, keys, setFocusOnly);
        },
        focusedItemIndex: function (itemIndex) {
            var that = this;
            if (type_1.isDefined(itemIndex)) {
                that._selection._focusedItemIndex = itemIndex;
            }
            else {
                return that._selection._focusedItemIndex;
            }
        },
        isSelectionWithCheckboxes: function () {
            return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this._isSelectionWithCheckboxes);
        },
        startSelectionWithCheckboxes: function () {
            var that = this;
            if (that.option(SELECTION_MODE) === 'multiple' && !that.isSelectionWithCheckboxes()) {
                that._isSelectionWithCheckboxes = true;
                that._updateSelectColumn();
                return true;
            }
            return false;
        },
        stopSelectionWithCheckboxes: function () {
            var that = this;
            if (that._isSelectionWithCheckboxes) {
                that._isSelectionWithCheckboxes = false;
                that._updateSelectColumn();
                return true;
            }
            return false;
        },
    };
})());
exports.selectionModule = {
    defaultOptions: function () {
        return {
            selection: {
                mode: 'none',
                showCheckBoxesMode: 'onClick',
                allowSelectAll: true,
                selectAllMode: 'allPages',
                maxFilterLengthInRequest: 1500,
                deferred: false,
            },
            selectionFilter: [],
            selectedRowKeys: [],
        };
    },
    controllers: {
        selection: SelectionController,
    },
    extenders: {
        controllers: {
            data: {
                init: function () {
                    var selectionController = this.getController('selection');
                    var isDeferredMode = this.option('selection.deferred');
                    this.callBase.apply(this, arguments);
                    if (isDeferredMode) {
                        selectionController._updateCheckboxesState({
                            isDeferredMode: true,
                            selectionFilter: this.option('selectionFilter'),
                        });
                    }
                },
                _loadDataSource: function () {
                    var that = this;
                    return that.callBase().always(function () {
                        that.getController('selection').refresh();
                    });
                },
                _processDataItem: function (item, options) {
                    var that = this;
                    var selectionController = that.getController('selection');
                    var hasSelectColumn = selectionController.isSelectColumnVisible();
                    var isDeferredSelection = options.isDeferredSelection = options.isDeferredSelection === undefined ? this.option('selection.deferred') : options.isDeferredSelection;
                    var dataItem = this.callBase.apply(this, arguments);
                    dataItem.isSelected = selectionController.isRowSelected(isDeferredSelection ? dataItem.data : dataItem.key);
                    if (hasSelectColumn && dataItem.values) {
                        for (var i = 0; i < options.visibleColumns.length; i++) {
                            if (options.visibleColumns[i].command === 'select') {
                                dataItem.values[i] = dataItem.isSelected;
                                break;
                            }
                        }
                    }
                    return dataItem;
                },
                refresh: function (options) {
                    var that = this;
                    // @ts-expect-error
                    var d = new deferred_1.Deferred();
                    this.callBase.apply(this, arguments).done(function () {
                        if (!options || options.selection) {
                            that.getController('selection').refresh().done(d.resolve).fail(d.reject);
                        }
                        else {
                            d.resolve();
                        }
                    }).fail(d.reject);
                    return d.promise();
                },
                _handleDataChanged: function (e) {
                    this.callBase.apply(this, arguments);
                    if ((!e || e.changeType === 'refresh') && !this._repaintChangesOnly) {
                        this.getController('selection').focusedItemIndex(-1);
                    }
                },
                _applyChange: function (change) {
                    var _this = this;
                    if (change && change.changeType === 'updateSelection') {
                        change.items.forEach(function (item, index) {
                            var currentItem = _this._items[index];
                            if (currentItem) {
                                currentItem.isSelected = item.isSelected;
                                currentItem.values = item.values;
                            }
                        });
                        return;
                    }
                    return this.callBase.apply(this, arguments);
                },
                _endUpdateCore: function () {
                    var changes = this._changes;
                    var isUpdateSelection = changes.length > 1 && changes.every(function (change) { return change.changeType === 'updateSelection'; });
                    if (isUpdateSelection) {
                        var itemIndexes = changes.map(function (change) { return change.itemIndexes || []; }).reduce(function (a, b) { return a.concat(b); });
                        this._changes = [{ changeType: 'updateSelection', itemIndexes: itemIndexes }];
                    }
                    this.callBase.apply(this, arguments);
                },
            },
            contextMenu: {
                _contextMenuPrepared: function (options) {
                    var dxEvent = options.event;
                    if (dxEvent.originalEvent && dxEvent.originalEvent.type !== 'dxhold' || options.items && options.items.length > 0)
                        return;
                    processLongTap(this, dxEvent);
                },
            },
        },
        views: {
            columnHeadersView: {
                init: function () {
                    var that = this;
                    that.callBase();
                    that.getController('selection').selectionChanged.add(that._updateSelectAllValue.bind(that));
                },
                _updateSelectAllValue: function () {
                    var that = this;
                    var $element = that.element();
                    var $editor = $element && $element.find("." + SELECT_CHECKBOX_CLASS);
                    if ($element && $editor.length && that.option('selection.mode') === 'multiple') {
                        var selectAllValue = that.getController('selection').isSelectAll();
                        var hasSelection = selectAllValue !== false;
                        var isVisible = that.option('selection.allowSelectAll') ? !that.getController('data').isEmpty() : hasSelection;
                        $editor.dxCheckBox('instance').option({
                            visible: isVisible,
                            value: selectAllValue,
                        });
                    }
                },
                _handleDataChanged: function (e) {
                    this.callBase(e);
                    if (!e || e.changeType === 'refresh' || (e.repaintChangesOnly && e.changeType === 'update')) {
                        this._updateSelectAllValue();
                    }
                },
                _renderSelectAllCheckBox: function ($container, column) {
                    var that = this;
                    var selectionController = that.getController('selection');
                    var isEmptyData = that.getController('data').isEmpty();
                    var groupElement = renderer_1.default('<div>')
                        .appendTo($container)
                        .addClass(SELECT_CHECKBOX_CLASS);
                    that.setAria('label', message_1.default.format('dxDataGrid-ariaSelectAll'), groupElement);
                    that.getController('editorFactory').createEditor(groupElement, extend_1.extend({}, column, {
                        parentType: 'headerRow',
                        dataType: 'boolean',
                        value: selectionController.isSelectAll(),
                        editorOptions: {
                            visible: !isEmptyData && (that.option('selection.allowSelectAll') || selectionController.isSelectAll() !== false),
                        },
                        tabIndex: that.option('useLegacyKeyboardNavigation') ? -1 : that.option('tabIndex') || 0,
                        setValue: function (value, e) {
                            var allowSelectAll = that.option('selection.allowSelectAll');
                            e.component.option('visible', allowSelectAll || e.component.option('value') !== false);
                            if (!e.event || selectionController.isSelectAll() === value) {
                                return;
                            }
                            if (e.value && !allowSelectAll) {
                                e.component.option('value', false);
                            }
                            else {
                                e.value ? selectionController.selectAll() : selectionController.deselectAll();
                            }
                            e.event.preventDefault();
                        },
                    }));
                    return groupElement;
                },
                _attachSelectAllCheckBoxClickEvent: function ($element) {
                    events_engine_1.default.on($element, click_1.name, this.createAction(function (e) {
                        var event = e.event;
                        if (!renderer_1.default(event.target).closest("." + SELECT_CHECKBOX_CLASS).length) {
                            // @ts-expect-error
                            events_engine_1.default.trigger(renderer_1.default(event.currentTarget).children("." + SELECT_CHECKBOX_CLASS), click_1.name);
                        }
                        event.preventDefault();
                    }));
                },
            },
            rowsView: {
                renderSelectCheckBoxContainer: function ($container, options) {
                    if (options.rowType === 'data' && !options.row.isNewRow) {
                        $container.addClass(EDITOR_CELL_CLASS);
                        this._attachCheckBoxClickEvent($container);
                        this._renderSelectCheckBox($container, options);
                    }
                    else {
                        module_utils_1.default.setEmptyText($container);
                    }
                },
                _renderSelectCheckBox: function (container, options) {
                    var groupElement = renderer_1.default('<div>')
                        .addClass(SELECT_CHECKBOX_CLASS)
                        .appendTo(container);
                    this.setAria('label', message_1.default.format('dxDataGrid-ariaSelectRow'), groupElement);
                    this.getController('editorFactory').createEditor(groupElement, extend_1.extend({}, options.column, {
                        parentType: 'dataRow',
                        dataType: 'boolean',
                        lookup: null,
                        value: options.value,
                        setValue: function (value, e) {
                            var _a;
                            if (((_a = e === null || e === void 0 ? void 0 : e.event) === null || _a === void 0 ? void 0 : _a.type) === 'keydown') {
                                // @ts-expect-error
                                events_engine_1.default.trigger(e.element, click_1.name, e);
                            }
                        },
                        row: options.row,
                    }));
                    return groupElement;
                },
                _attachCheckBoxClickEvent: function ($element) {
                    events_engine_1.default.on($element, click_1.name, this.createAction(function (e) {
                        var selectionController = this.getController('selection');
                        var event = e.event;
                        var rowIndex = this.getRowIndex(renderer_1.default(event.currentTarget).closest("." + ROW_CLASS));
                        if (rowIndex >= 0) {
                            selectionController.startSelectionWithCheckboxes();
                            selectionController.changeItemSelection(rowIndex, { shift: event.shiftKey });
                            if (renderer_1.default(event.target).closest("." + SELECT_CHECKBOX_CLASS).length) {
                                this.getController('data').updateItems({
                                    changeType: 'updateSelection',
                                    itemIndexes: [rowIndex],
                                });
                            }
                        }
                    }));
                },
                _update: function (change) {
                    var that = this;
                    var tableElements = that.getTableElements();
                    if (change.changeType === 'updateSelection') {
                        if (tableElements.length > 0) {
                            iterator_1.each(tableElements, function (_, tableElement) {
                                iterator_1.each(change.itemIndexes || [], function (_, index) {
                                    var $row;
                                    // T108078
                                    if (change.items[index]) {
                                        $row = that._getRowElements(renderer_1.default(tableElement)).eq(index);
                                        if ($row.length) {
                                            var isSelected = change.items[index].isSelected;
                                            $row
                                                .toggleClass(ROW_SELECTION_CLASS, isSelected === undefined ? false : isSelected)
                                                .find("." + SELECT_CHECKBOX_CLASS).dxCheckBox('option', 'value', isSelected);
                                            that.setAria('selected', isSelected, $row);
                                        }
                                    }
                                });
                            });
                            that._updateCheckboxesClass();
                        }
                    }
                    else {
                        that.callBase(change);
                    }
                },
                _createTable: function () {
                    var that = this;
                    var selectionMode = that.option('selection.mode');
                    var $table = that.callBase.apply(that, arguments);
                    if (selectionMode !== 'none') {
                        if (that.option(SHOW_CHECKBOXES_MODE) === 'onLongTap' || !support_1.touch) {
                            // TODO Not working timeout by hold when it is larger than other timeouts by hold
                            events_engine_1.default.on($table, index_1.addNamespace(hold_1.default.name, 'dxDataGridRowsView'), "." + DATA_ROW_CLASS, that.createAction(function (e) {
                                processLongTap(that.component, e.event);
                                e.event.stopPropagation();
                            }));
                        }
                        events_engine_1.default.on($table, 'mousedown selectstart', that.createAction(function (e) {
                            var event = e.event;
                            if (event.shiftKey) {
                                event.preventDefault();
                            }
                        }));
                    }
                    return $table;
                },
                _createRow: function (row) {
                    var $row = this.callBase.apply(this, arguments);
                    if (row) {
                        var isSelected = row.isSelected;
                        if (isSelected) {
                            $row.addClass(ROW_SELECTION_CLASS);
                        }
                        var selectionMode = this.option(SELECTION_MODE);
                        if (selectionMode !== 'none') {
                            this.setAria('selected', isSelected, $row);
                        }
                    }
                    return $row;
                },
                _rowClick: function (e) {
                    var that = this;
                    var dxEvent = e.event;
                    var isSelectionDisabled = renderer_1.default(dxEvent.target).closest("." + SELECTION_DISABLED_CLASS).length;
                    if (!that.isClickableElement(renderer_1.default(dxEvent.target))) {
                        if (!isSelectionDisabled && (that.option(SELECTION_MODE) !== 'multiple' || that.option(SHOW_CHECKBOXES_MODE) !== 'always')) {
                            if (that.getController('selection').changeItemSelection(e.rowIndex, {
                                control: index_1.isCommandKeyPressed(dxEvent),
                                shift: dxEvent.shiftKey,
                            })) {
                                dxEvent.preventDefault();
                                e.handled = true;
                            }
                        }
                        that.callBase(e);
                    }
                },
                isClickableElement: function ($target) {
                    var isCommandSelect = $target.closest("." + COMMAND_SELECT_CLASS).length;
                    return !!isCommandSelect;
                },
                _renderCore: function (change) {
                    var deferred = this.callBase(change);
                    this._updateCheckboxesClass();
                    return deferred;
                },
                _updateCheckboxesClass: function () {
                    var tableElements = this.getTableElements();
                    var selectionController = this.getController('selection');
                    var isCheckBoxesHidden = selectionController.isSelectColumnVisible() && !selectionController.isSelectionWithCheckboxes();
                    iterator_1.each(tableElements, function (_, tableElement) {
                        renderer_1.default(tableElement).toggleClass(CHECKBOXES_HIDDEN_CLASS, isCheckBoxesHidden);
                    });
                },
            },
        },
    },
};