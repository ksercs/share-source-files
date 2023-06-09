/**
* DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/module_base.js)
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
exports.FieldChooserBase = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var array_store_1 = __importDefault(require("../../../../data/array_store"));
var click_1 = require("../../../../events/click");
var common_1 = require("../../../../core/utils/common");
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var message_1 = __importDefault(require("../../../../localization/message"));
var component_registrator_1 = __importDefault(require("../../../../core/component_registrator"));
var ui_widget_1 = __importDefault(require("../../../../ui/widget/ui.widget"));
var ui_grid_core_header_filter_core_1 = require("../../../../ui/grid_core/ui.grid_core.header_filter_core");
var ui_grid_core_column_state_mixin_1 = __importDefault(require("../../../../ui/grid_core/ui.grid_core.column_state_mixin"));
var ui_grid_core_sorting_mixin_1 = __importDefault(require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"));
var deferred_1 = require("../../../../core/utils/deferred");
var utils_1 = require("./utils");
var module_widget_utils_1 = require("../module_widget_utils");
var module_1 = require("../sortable/module");
var const_1 = require("./const");
var dom_1 = require("./dom");
var DIV = '<div>';
var HeaderFilterView = ui_grid_core_header_filter_core_1.HeaderFilterView.inherit({
    _getSearchExpr: function (options) {
        options.useDefaultSearchExpr = true;
        return this.callBase(options);
    },
});
var processItems = function (groupItems, field) {
    var filterValues = [];
    var isTree = !!field.groupName;
    var isExcludeFilterType = field.filterType === 'exclude';
    if (field.filterValues) {
        iterator_1.each(field.filterValues, function (_, filterValue) {
            filterValues.push(Array.isArray(filterValue) ? filterValue.join('/') : filterValue && filterValue.valueOf());
        });
    }
    module_widget_utils_1.foreachTree(groupItems, function (items) {
        var item = items[0];
        var path = module_widget_utils_1.createPath(items);
        var preparedFilterValueByText = isTree ? iterator_1.map(items, function (item) { return item.text; }).reverse().join('/') : item.text;
        item.value = isTree ? path.slice(0) : item.key || item.value;
        var preparedFilterValue = isTree ? path.join('/') : item.value && item.value.valueOf();
        if (item.children) {
            item.items = item.children;
            item.children = null;
        }
        ui_grid_core_header_filter_core_1.updateHeaderFilterItemSelectionState(item, item.key
            && filterValues.includes(preparedFilterValueByText)
            || filterValues.includes(preparedFilterValue), isExcludeFilterType);
    });
};
function getMainGroupField(dataSource, sourceField) {
    var field = sourceField;
    if (type_1.isDefined(sourceField.groupIndex)) {
        field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex];
    }
    return field;
}
function getStringState(state) {
    state = state || {};
    return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths]);
}
var FieldChooserBase = ui_widget_1.default
    .inherit(ui_grid_core_column_state_mixin_1.default)
    .inherit(ui_grid_core_sorting_mixin_1.default)
    .inherit(ui_grid_core_header_filter_core_1.headerFilterMixin)
    .inherit({
    _getDefaultOptions: function () {
        return extend_1.extend(this.callBase(), {
            allowFieldDragging: true,
            applyChangesMode: 'instantly',
            state: null,
            headerFilter: {
                width: 252,
                height: 325,
                searchTimeout: 500,
                texts: {
                    emptyValue: message_1.default.format('dxDataGrid-headerFilterEmptyValue'),
                    ok: message_1.default.format('dxDataGrid-headerFilterOK'),
                    cancel: message_1.default.format('dxDataGrid-headerFilterCancel'),
                },
            },
            // NOTE: private option added in fix of the T1150523 ticket.
            remoteSort: false,
        });
    },
    _init: function () {
        this.callBase();
        this._headerFilterView = new HeaderFilterView(this);
        this._refreshDataSource();
        this.subscribeToEvents();
    },
    _refreshDataSource: function () {
        var dataSource = this.option('dataSource');
        if (dataSource
            && dataSource.fields && dataSource.load /* instanceof DX.ui.dxPivotGrid.DataSource */) {
            this._dataSource = dataSource;
        }
    },
    _optionChanged: function (args) {
        switch (args.name) {
            case 'dataSource':
                this._refreshDataSource();
                break;
            case 'applyChangesMode':
            case 'remoteSort':
                break;
            case 'state':
                if (this._skipStateChange || !this._dataSource) {
                    break;
                }
                if (this.option('applyChangesMode') === 'instantly'
                    && getStringState(this._dataSource.state()) !== getStringState(args.value)) {
                    this._dataSource.state(args.value);
                }
                else {
                    this._clean(true);
                    this._renderComponent();
                }
                break;
            case 'headerFilter':
            case 'allowFieldDragging':
                this._invalidate();
                break;
            default:
                this.callBase(args);
        }
    },
    renderField: function (field, showColumnLines) {
        var that = this;
        var $fieldContent = renderer_1.default(DIV).addClass(const_1.CLASSES.area.fieldContent)
            .text(field.caption || field.dataField);
        var $fieldElement = renderer_1.default(DIV)
            .addClass(const_1.CLASSES.area.field)
            .addClass(const_1.CLASSES.area.box)
            .data('field', field)
            .append($fieldContent);
        var mainGroupField = getMainGroupField(that._dataSource, field);
        if (field.area !== 'data') {
            if (field.allowSorting) {
                that._applyColumnState({
                    name: 'sort',
                    rootElement: $fieldElement,
                    column: {
                        alignment: that.option('rtlEnabled') ? 'right' : 'left',
                        sortOrder: field.sortOrder === 'desc' ? 'desc' : 'asc',
                        allowSorting: field.allowSorting,
                    },
                    showColumnLines: showColumnLines,
                });
            }
            that._applyColumnState({
                name: 'headerFilter',
                rootElement: $fieldElement,
                column: {
                    alignment: that.option('rtlEnabled') ? 'right' : 'left',
                    filterValues: mainGroupField.filterValues,
                    allowFiltering: mainGroupField.allowFiltering && !field.groupIndex,
                    allowSorting: field.allowSorting,
                },
                showColumnLines: showColumnLines,
            });
        }
        if (field.groupName) {
            $fieldElement.attr(const_1.ATTRIBUTES.itemGroup, field.groupName);
        }
        return $fieldElement;
    },
    _clean: function () {
    },
    _render: function () {
        this.callBase();
        this._headerFilterView.render(this.$element());
    },
    renderSortable: function () {
        var that = this;
        that._createComponent(that.$element(), module_1.Sortable, extend_1.extend({
            allowDragging: that.option('allowFieldDragging'),
            itemSelector: "." + const_1.CLASSES.area.field,
            itemContainerSelector: "." + const_1.CLASSES.area.fieldContainer,
            groupSelector: "." + const_1.CLASSES.area.fieldList,
            groupFilter: function () {
                var dataSource = that._dataSource;
                var $sortable = renderer_1.default(this).closest('.dx-sortable-old');
                var pivotGrid = $sortable.data('dxPivotGrid');
                var pivotGridFieldChooser = $sortable.data('dxPivotGridFieldChooser');
                if (pivotGrid) {
                    return pivotGrid.getDataSource() === dataSource;
                }
                if (pivotGridFieldChooser) {
                    return pivotGridFieldChooser.option('dataSource') === dataSource;
                }
                return false;
            },
            itemRender: dom_1.dragAndDropItemRender,
            onDragging: function (e) {
                var field = e.sourceElement.data('field');
                var targetGroup = e.targetGroup;
                e.cancel = false;
                if (field.isMeasure === true) {
                    if (targetGroup === 'column' || targetGroup === 'row' || targetGroup === 'filter') {
                        e.cancel = true;
                    }
                }
                else if (field.isMeasure === false && targetGroup === 'data') {
                    e.cancel = true;
                }
            },
            useIndicator: true,
            onChanged: function (e) {
                var field = e.sourceElement.data('field');
                e.removeSourceElement = !!e.sourceGroup;
                that._adjustSortableOnChangedArgs(e);
                if (field) {
                    var targetIndex_1 = e.targetIndex;
                    var mainGroupField_1;
                    var invisibleFieldsIndexOffset_1 = 0;
                    that._processDemandState(function (dataSource) {
                        var fields = dataSource.getAreaFields(field.area, true);
                        mainGroupField_1 = getMainGroupField(dataSource, field);
                        var visibleFields = fields.filter(function (f) { return f.visible !== false; });
                        var fieldBeforeTarget = visibleFields[targetIndex_1 - 1];
                        if (fieldBeforeTarget) {
                            invisibleFieldsIndexOffset_1 = fields
                                .filter(function (f) { return f.visible === false
                                && f.areaIndex <= fieldBeforeTarget.areaIndex; })
                                .length;
                        }
                    });
                    that._applyChanges([mainGroupField_1], {
                        area: e.targetGroup,
                        areaIndex: targetIndex_1 + invisibleFieldsIndexOffset_1,
                    });
                }
            },
        }, that._getSortableOptions()));
    },
    _processDemandState: function (func) {
        var that = this;
        var isInstantlyMode = that.option('applyChangesMode') === 'instantly';
        var dataSource = that._dataSource;
        if (isInstantlyMode) {
            func(dataSource, isInstantlyMode);
        }
        else {
            var currentState = dataSource.state();
            var pivotGridState = that.option('state');
            if (pivotGridState) {
                dataSource.state(pivotGridState, true);
            }
            func(dataSource, isInstantlyMode);
            dataSource.state(currentState, true);
        }
    },
    _applyChanges: function (fields, props) {
        var that = this;
        that._processDemandState(function (dataSource, isInstantlyMode) {
            fields.forEach(function (_a) {
                var index = _a.index;
                dataSource.field(index, props);
            });
            if (isInstantlyMode) {
                dataSource.load();
            }
            else {
                that._changedHandler();
            }
        });
    },
    _applyLocalSortChanges: function (fieldIdx, sortOrder) {
        this._processDemandState(function (dataSource) {
            dataSource.field(fieldIdx, { sortOrder: sortOrder });
            dataSource.sortLocal();
        });
    },
    _adjustSortableOnChangedArgs: function (e) {
        e.removeSourceElement = false;
        e.removeTargetElement = true;
        e.removeSourceClass = false;
    },
    _getSortableOptions: function () {
        return {
            direction: 'auto',
        };
    },
    subscribeToEvents: function (element) {
        var that = this;
        var func = function (e) {
            var field = renderer_1.default(e.currentTarget).data('field');
            var mainGroupField = extend_1.extend(true, {}, getMainGroupField(that._dataSource, field));
            var isHeaderFilter = renderer_1.default(e.target).hasClass(const_1.CLASSES.headerFilter);
            var dataSource = that._dataSource;
            var type = mainGroupField.groupName ? 'tree' : 'list';
            var paginate = dataSource.paginate() && type === 'list';
            if (isHeaderFilter) {
                that._headerFilterView.showHeaderFilterMenu(renderer_1.default(e.currentTarget), extend_1.extend(mainGroupField, {
                    type: type,
                    encodeHtml: that.option('encodeHtml'),
                    dataSource: {
                        useDefaultSearch: !paginate,
                        // paginate: false,
                        load: function (options) {
                            var userData = options.userData;
                            if (userData.store) {
                                return userData.store.load(options);
                            }
                            // @ts-expect-error
                            var d = new deferred_1.Deferred();
                            dataSource.getFieldValues(mainGroupField.index, that.option('headerFilter.showRelevantValues'), paginate
                                ? options
                                : undefined).done(function (data) {
                                var emptyValue = that.option('headerFilter.texts.emptyValue');
                                data.forEach(function (element) {
                                    if (!element.text) {
                                        element.text = emptyValue;
                                    }
                                });
                                if (paginate) {
                                    d.resolve(data);
                                }
                                else {
                                    userData.store = new array_store_1.default(data);
                                    userData.store.load(options).done(d.resolve).fail(d.reject);
                                }
                            }).fail(d.reject);
                            return d;
                        },
                        postProcess: function (data) {
                            processItems(data, mainGroupField);
                            return data;
                        },
                    },
                    apply: function () {
                        that._applyChanges([mainGroupField], {
                            filterValues: this.filterValues,
                            filterType: this.filterType,
                        });
                    },
                }));
            }
            else if (field.allowSorting && field.area !== 'data') {
                var isRemoteSort = that.option('remoteSort');
                var sortOrder = utils_1.reverseSortOrder(field.sortOrder);
                if (isRemoteSort) {
                    that._applyChanges([field], { sortOrder: sortOrder });
                }
                else {
                    that._applyLocalSortChanges(field.index, sortOrder);
                }
            }
        };
        if (element) {
            events_engine_1.default.on(element, click_1.name, "." + const_1.CLASSES.area.field + "." + const_1.CLASSES.area.box, func);
            return;
        }
        events_engine_1.default.on(that.$element(), click_1.name, "." + const_1.CLASSES.area.field + "." + const_1.CLASSES.area.box, func);
    },
    _initTemplates: common_1.noop,
    addWidgetPrefix: function (className) {
        return "dx-pivotgrid-" + className;
    },
});
exports.FieldChooserBase = FieldChooserBase;
component_registrator_1.default('dxPivotGridFieldChooserBase', FieldChooserBase);
exports.default = { FieldChooserBase: FieldChooserBase };
