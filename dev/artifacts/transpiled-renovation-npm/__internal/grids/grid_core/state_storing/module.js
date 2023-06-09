"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateStoringModule = void 0;
// @ts-expect-error
var common_1 = require("../../../../core/utils/common");
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var deferred_1 = require("../../../../core/utils/deferred");
var module_core_1 = __importDefault(require("./module_core"));
var getDataState = function (that) {
    var pagerView = that.getView('pagerView');
    var dataController = that.getController('data');
    var state = {
        allowedPageSizes: pagerView ? pagerView.getPageSizes() : undefined,
        filterPanel: { filterEnabled: that.option('filterPanel.filterEnabled') },
        filterValue: that.option('filterValue'),
        focusedRowKey: that.option('focusedRowEnabled') ? that.option('focusedRowKey') : undefined,
    };
    return extend_1.extend(state, dataController.getUserState());
};
// TODO move processLoadState to target modules (data, columns, pagerView)
var processLoadState = function (that) {
    var columnsController = that.getController('columns');
    var selectionController = that.getController('selection');
    var exportController = that.getController('export');
    var dataController = that.getController('data');
    if (columnsController) {
        columnsController.columnsChanged.add(function () {
            that.updateState({
                columns: columnsController.getUserState(),
            });
        });
    }
    if (selectionController) {
        selectionController.selectionChanged.add(function (e) {
            that.updateState({
                selectedRowKeys: e.selectedRowKeys,
                selectionFilter: e.selectionFilter,
            });
        });
    }
    if (dataController) {
        that._initialPageSize = that.option('paging.pageSize');
        that._initialFilterValue = that.option('filterValue');
        dataController.changed.add(function () {
            var state = getDataState(that);
            that.updateState(state);
        });
    }
    if (exportController) {
        exportController.selectionOnlyChanged.add(function () {
            that.updateState({
                exportSelectionOnly: exportController.selectionOnly(),
            });
        });
    }
};
var DEFAULT_FILTER_VALUE = null;
var getFilterValue = function (that, state) {
    var filterSyncController = that.getController('filterSync');
    var columnsController = that.getController('columns');
    var hasFilterState = state.columns || state.filterValue !== undefined;
    if (filterSyncController) {
        if (hasFilterState) {
            return state.filterValue || filterSyncController.getFilterValueFromColumns(state.columns);
        }
        return that._initialFilterValue || filterSyncController.getFilterValueFromColumns(columnsController.getColumns());
    }
    return DEFAULT_FILTER_VALUE;
};
exports.stateStoringModule = {
    defaultOptions: function () {
        return {
            stateStoring: {
                enabled: false,
                storageKey: null,
                type: 'localStorage',
                customLoad: null,
                customSave: null,
                savingTimeout: 2000,
            },
        };
    },
    controllers: {
        stateStoring: module_core_1.default.StateStoringController,
    },
    extenders: {
        views: {
            rowsView: {
                init: function () {
                    var that = this;
                    var dataController = that.getController('data');
                    that.callBase();
                    dataController.stateLoaded.add(function () {
                        if (dataController.isLoaded() && !dataController.getDataSource()) {
                            that.setLoading(false);
                            that.renderNoDataText();
                            var columnHeadersView = that.component.getView('columnHeadersView');
                            columnHeadersView && columnHeadersView.render();
                            that.component._fireContentReadyAction();
                        }
                    });
                },
            },
        },
        controllers: {
            stateStoring: {
                init: function () {
                    this.callBase.apply(this, arguments);
                    processLoadState(this);
                },
                isLoading: function () {
                    return this.callBase() || this.getController('data').isStateLoading();
                },
                state: function (state) {
                    var result = this.callBase.apply(this, arguments);
                    if (state !== undefined) {
                        this.applyState(extend_1.extend(true, {}, state));
                    }
                    return result;
                },
                updateState: function (state) {
                    if (this.isEnabled()) {
                        var oldState = this.state();
                        var newState = extend_1.extend({}, oldState, state);
                        var oldStateHash = common_1.getKeyHash(oldState);
                        var newStateHash = common_1.getKeyHash(newState);
                        if (!common_1.equalByValue(oldStateHash, newStateHash)) {
                            state = extend_1.extend(true, {}, state);
                            extend_1.extend(this._state, state);
                            this.save();
                        }
                    }
                    else {
                        extend_1.extend(this._state, state);
                    }
                },
                applyState: function (state) {
                    var _a;
                    var allowedPageSizes = state.allowedPageSizes;
                    var searchText = state.searchText;
                    var selectedRowKeys = state.selectedRowKeys;
                    var selectionFilter = state.selectionFilter;
                    var exportController = this.getController('export');
                    var columnsController = this.getController('columns');
                    var dataController = this.getController('data');
                    var scrollingMode = this.option('scrolling.mode');
                    var isVirtualScrollingMode = scrollingMode === 'virtual' || scrollingMode === 'infinite';
                    var showPageSizeSelector = this.option('pager.visible') === true && this.option('pager.showPageSizeSelector');
                    var hasHeight = (_a = this.getView('rowsView')) === null || _a === void 0 ? void 0 : _a.hasHeight();
                    this.component.beginUpdate();
                    if (columnsController) {
                        columnsController.setUserState(state.columns);
                    }
                    if (exportController) {
                        exportController.selectionOnly(state.exportSelectionOnly);
                    }
                    if (!this.option('selection.deferred')) {
                        this.option('selectedRowKeys', selectedRowKeys || []);
                    }
                    this.option('selectionFilter', selectionFilter);
                    if (allowedPageSizes && this.option('pager.allowedPageSizes') === 'auto') {
                        this.option('pager').allowedPageSizes = allowedPageSizes;
                    }
                    if (this.option('focusedRowEnabled')) {
                        this.option('focusedRowIndex', -1);
                        this.option('focusedRowKey', state.focusedRowKey || null);
                    }
                    this.component.endUpdate();
                    this.option('searchPanel.text', searchText || '');
                    this.option('filterValue', getFilterValue(this, state));
                    this.option('filterPanel.filterEnabled', state.filterPanel ? state.filterPanel.filterEnabled : true);
                    this.option('paging.pageIndex', (!isVirtualScrollingMode || hasHeight) && state.pageIndex || 0);
                    this.option('paging.pageSize', (!isVirtualScrollingMode || showPageSizeSelector) && type_1.isDefined(state.pageSize) ? state.pageSize : this._initialPageSize);
                    dataController && dataController.reset();
                },
            },
            columns: {
                _shouldReturnVisibleColumns: function () {
                    var result = this.callBase.apply(this, arguments);
                    var stateStoringController = this.getController('stateStoring');
                    return result && (!stateStoringController.isEnabled() || stateStoringController.isLoaded());
                },
            },
            data: {
                callbackNames: function () {
                    return this.callBase().concat(['stateLoaded']);
                },
                _refreshDataSource: function () {
                    var _this = this;
                    var callBase = this.callBase;
                    var stateStoringController = this.getController('stateStoring');
                    if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
                        clearTimeout(this._restoreStateTimeoutID);
                        // @ts-expect-error
                        var deferred_2 = new deferred_1.Deferred();
                        this._restoreStateTimeoutID = setTimeout(function () {
                            stateStoringController.load().always(function () {
                                _this._restoreStateTimeoutID = null;
                            }).done(function () {
                                callBase.call(_this);
                                _this.stateLoaded.fire();
                                deferred_2.resolve();
                            }).fail(function (error) {
                                _this.stateLoaded.fire();
                                _this._handleLoadError(error || 'Unknown error');
                                deferred_2.reject();
                            });
                        });
                        return deferred_2.promise();
                    }
                    if (!this.isStateLoading()) {
                        callBase.call(this);
                    }
                },
                isLoading: function () {
                    var that = this;
                    var stateStoringController = that.getController('stateStoring');
                    return this.callBase() || stateStoringController.isLoading();
                },
                isStateLoading: function () {
                    return type_1.isDefined(this._restoreStateTimeoutID);
                },
                isLoaded: function () {
                    return this.callBase() && !this.isStateLoading();
                },
                dispose: function () {
                    clearTimeout(this._restoreStateTimeoutID);
                    this.callBase();
                },
            },
            selection: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _fireSelectionChanged: function (options) {
                    var stateStoringController = this.getController('stateStoring');
                    var isDeferredSelection = this.option('selection.deferred');
                    if (stateStoringController.isLoading() && isDeferredSelection) {
                        return;
                    }
                    this.callBase.apply(this, arguments);
                },
            },
        },
    },
};