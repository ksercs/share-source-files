/**
* DevExtreme (cjs/__internal/grids/tree_list/module_widget_base.js)
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
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _common = require("../../../core/utils/common");
var _type = require("../../../core/utils/type");
var _iterator = require("../../../core/utils/iterator");
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _themes = require("../../../ui/themes");
var _module_core = _interopRequireDefault(require("./module_core"));
var _module_utils = _interopRequireDefault(require("../grid_core/module_utils"));
require("./module_not_extended/column_headers");
require("./module_columns_controller");
require("./data_controller/module");
require("./module_not_extended/sorting");
require("./rows/module");
require("./module_not_extended/context_menu");
require("./module_not_extended/error_handling");
require("./module_grid_view");
require("./module_not_extended/header_panel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var callModuleItemsMethod = _module_core.default.callModuleItemsMethod;
var DATAGRID_ROW_SELECTOR = '.dx-row';
var TREELIST_CLASS = 'dx-treelist';
_module_core.default.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'editing', 'grouping', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
var TreeList = _ui.default.inherit({
  _activeStateUnit: DATAGRID_ROW_SELECTOR,
  _getDefaultOptions: function _getDefaultOptions() {
    var that = this;
    var result = that.callBase();
    (0, _iterator.each)(_module_core.default.modules, function () {
      if ((0, _type.isFunction)(this.defaultOptions)) {
        (0, _extend.extend)(true, result, this.defaultOptions());
      }
    });
    return result;
  },
  _setDeprecatedOptions: function _setDeprecatedOptions() {
    this.callBase();
    (0, _extend.extend)(this._deprecatedOptions, {
      'columnChooser.allowSearch': {
        since: '23.1',
        message: 'Use the "columnChooser.search.enabled" option instead'
      },
      'columnChooser.searchTimeout': {
        since: '23.1',
        message: 'Use the "columnChooser.search.timeout" option instead'
      }
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        // @ts-expect-error
        return (0, _themes.isMaterial)();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        }
      }
    }]);
  },
  _init: function _init() {
    var that = this;
    that.callBase();
    if (!this.option('_disableDeprecationWarnings')) {
      _module_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    _module_core.default.processModules(that, _module_core.default);
    callModuleItemsMethod(that, 'init');
  },
  _clean: _common.noop,
  _optionChanged: function _optionChanged(args) {
    var that = this;
    callModuleItemsMethod(that, 'optionChanged', [args]);
    if (!args.handled) {
      that.callBase(args);
    }
  },
  _dimensionChanged: function _dimensionChanged() {
    this.updateDimensions(true);
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this.updateDimensions();
    }
  },
  _initMarkup: function _initMarkup() {
    this.callBase.apply(this, arguments);
    this.$element().addClass(TREELIST_CLASS);
    this.getView('gridView').render(this.$element());
  },
  _renderContentImpl: function _renderContentImpl() {
    this.getView('gridView').update();
  },
  _renderContent: function _renderContent() {
    var that = this;
    (0, _common.deferRender)(function () {
      that._renderContentImpl();
    });
  },
  _dispose: function _dispose() {
    var that = this;
    that.callBase();
    callModuleItemsMethod(that, 'dispose');
  },
  isReady: function isReady() {
    return this.getController('data').isReady();
  },
  beginUpdate: function beginUpdate() {
    var that = this;
    that.callBase();
    callModuleItemsMethod(that, 'beginUpdate');
  },
  endUpdate: function endUpdate() {
    var that = this;
    callModuleItemsMethod(that, 'endUpdate');
    that.callBase();
  },
  getController: function getController(name) {
    return this._controllers[name];
  },
  getView: function getView(name) {
    return this._views[name];
  },
  focus: function focus(element) {
    this.callBase();
    if ((0, _type.isDefined)(element)) {
      this.getController('keyboardNavigation').focus(element);
    }
  }
});
TreeList.registerModule = _module_core.default.registerModule.bind(_module_core.default);
(0, _component_registrator.default)('dxTreeList', TreeList);
var _default = TreeList;
exports.default = _default;
