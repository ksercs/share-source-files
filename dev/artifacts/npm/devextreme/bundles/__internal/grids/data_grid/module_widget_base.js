/**
* DevExtreme (bundles/__internal/grids/data_grid/module_widget_base.js)
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
var renderer_1 = __importDefault(require("../../../core/renderer"));
var component_registrator_1 = __importDefault(require("../../../core/component_registrator"));
var common_1 = require("../../../core/utils/common");
var type_1 = require("../../../core/utils/type");
var iterator_1 = require("../../../core/utils/iterator");
var extend_1 = require("../../../core/utils/extend");
var console_1 = require("../../../core/utils/console");
var browser_1 = __importDefault(require("../../../core/utils/browser"));
var ui_widget_1 = __importDefault(require("../../../ui/widget/ui.widget"));
var themes_1 = require("../../../ui/themes");
var module_core_1 = __importDefault(require("./module_core"));
require("./module_not_extended/column_headers");
require("./module_columns_controller");
require("./module_data_controller");
require("./module_not_extended/sorting");
require("./module_not_extended/rows");
require("./module_not_extended/context_menu");
require("./module_not_extended/error_handling");
require("./module_not_extended/grid_view");
require("./module_not_extended/header_panel");
var DATAGRID_ROW_SELECTOR = '.dx-row';
var DATAGRID_DEPRECATED_TEMPLATE_WARNING = 'Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.';
module_core_1.default.registerModulesOrder([
    'stateStoring',
    'columns',
    'selection',
    'editorFactory',
    'columnChooser',
    'grouping',
    'editing',
    'editingRowBased',
    'editingFormBased',
    'editingCellBased',
    'masterDetail',
    'validating',
    'adaptivity',
    'data',
    'virtualScrolling',
    'columnHeaders',
    'filterRow',
    'headerPanel',
    'headerFilter',
    'sorting',
    'search',
    'rows',
    'pager',
    'columnsResizingReordering',
    'contextMenu',
    'keyboardNavigation',
    'errorHandling',
    'summary',
    'columnFixing',
    'export',
    'gridView'
]);
var DataGrid = ui_widget_1.default.inherit({
    _activeStateUnit: DATAGRID_ROW_SELECTOR,
    _getDefaultOptions: function () {
        var that = this;
        var result = that.callBase();
        iterator_1.each(module_core_1.default.modules, function () {
            if (type_1.isFunction(this.defaultOptions)) {
                extend_1.extend(true, result, this.defaultOptions());
            }
        });
        return result;
    },
    _setDeprecatedOptions: function () {
        this.callBase();
        extend_1.extend(this._deprecatedOptions, {
            useKeyboard: { since: '19.2', alias: 'keyboardNavigation.enabled' },
            rowTemplate: { since: '21.2', message: 'Use the "dataRowTemplate" option instead' },
        });
    },
    _defaultOptionsRules: function () {
        return this.callBase().concat([
            {
                device: { platform: 'ios' },
                options: {
                    showRowLines: true,
                },
            },
            {
                device: function () {
                    // @ts-expect-error
                    return themes_1.isMaterial();
                },
                options: {
                    showRowLines: true,
                    showColumnLines: false,
                    headerFilter: {
                        height: 315,
                    },
                    editing: {
                        useIcons: true,
                    },
                    selection: {
                        showCheckBoxesMode: 'always',
                    },
                },
            },
            {
                device: function () {
                    return browser_1.default.webkit;
                },
                options: {
                    loadingTimeout: 30,
                    loadPanel: {
                        animation: {
                            show: {
                                easing: 'cubic-bezier(1, 0, 1, 0)',
                                duration: 500,
                                from: { opacity: 0 },
                                to: { opacity: 1 },
                            },
                        },
                    },
                },
            },
            {
                device: function (device) {
                    return device.deviceType !== 'desktop';
                },
                options: {
                    grouping: {
                        expandMode: 'rowClick',
                    },
                },
            },
        ]);
    },
    _init: function () {
        var that = this;
        that.callBase();
        module_core_1.default.processModules(that, module_core_1.default);
        module_core_1.default.callModuleItemsMethod(that, 'init');
    },
    _clean: common_1.noop,
    _optionChanged: function (args) {
        var that = this;
        module_core_1.default.callModuleItemsMethod(that, 'optionChanged', [args]);
        if (!args.handled) {
            that.callBase(args);
        }
    },
    _dimensionChanged: function () {
        this.updateDimensions(true);
    },
    _visibilityChanged: function (visible) {
        if (visible) {
            this.updateDimensions();
        }
    },
    _initMarkup: function () {
        this.callBase.apply(this, arguments);
        this.getView('gridView').render(this.$element());
    },
    _renderContentImpl: function () {
        this.getView('gridView').update();
    },
    _renderContent: function () {
        var that = this;
        common_1.deferRender(function () {
            that._renderContentImpl();
        });
    },
    _getTemplate: function (templateName) {
        var template = templateName;
        if (type_1.isString(template) && template.startsWith('#')) {
            template = renderer_1.default(templateName);
            console_1.logger.warn(DATAGRID_DEPRECATED_TEMPLATE_WARNING);
        }
        return this.callBase(template);
    },
    _dispose: function () {
        var that = this;
        that.callBase();
        module_core_1.default.callModuleItemsMethod(that, 'dispose');
    },
    isReady: function () {
        return this.getController('data').isReady();
    },
    beginUpdate: function () {
        var that = this;
        that.callBase();
        module_core_1.default.callModuleItemsMethod(that, 'beginUpdate');
    },
    endUpdate: function () {
        var that = this;
        module_core_1.default.callModuleItemsMethod(that, 'endUpdate');
        that.callBase();
    },
    getController: function (name) {
        return this._controllers[name];
    },
    getView: function (name) {
        return this._views[name];
    },
    focus: function (element) {
        this.getController('keyboardNavigation').focus(element);
    },
});
DataGrid.registerModule = module_core_1.default.registerModule.bind(module_core_1.default);
component_registrator_1.default('dxDataGrid', DataGrid);
exports.default = DataGrid;
