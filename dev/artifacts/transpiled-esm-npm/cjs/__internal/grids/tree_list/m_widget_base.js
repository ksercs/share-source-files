"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./module_not_extended/column_headers");
require("./m_columns_controller");
require("./data_controller/m_data_controller");
require("./module_not_extended/sorting");
require("./rows/m_rows");
require("./module_not_extended/context_menu");
require("./module_not_extended/error_handling");
require("./m_grid_view");
require("./module_not_extended/header_panel");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _themes = require("../../../ui/themes");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var callModuleItemsMethod = _m_core.default.callModuleItemsMethod;
var DATAGRID_ROW_SELECTOR = '.dx-row';
var TREELIST_CLASS = 'dx-treelist';
_m_core.default.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'editing', 'grouping', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
var TreeList = _ui.default.inherit({
  _activeStateUnit: DATAGRID_ROW_SELECTOR,
  _getDefaultOptions() {
    var that = this;
    var result = that.callBase();
    (0, _iterator.each)(_m_core.default.modules, function () {
      if ((0, _type.isFunction)(this.defaultOptions)) {
        (0, _extend.extend)(true, result, this.defaultOptions());
      }
    });
    return result;
  },
  _setDeprecatedOptions() {
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
  _defaultOptionsRules() {
    return this.callBase().concat([{
      device() {
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
  _init() {
    var that = this;
    that.callBase();
    if (!this.option('_disableDeprecationWarnings')) {
      _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    _m_core.default.processModules(that, _m_core.default);
    callModuleItemsMethod(that, 'init');
  },
  _clean: _common.noop,
  _optionChanged(args) {
    var that = this;
    callModuleItemsMethod(that, 'optionChanged', [args]);
    if (!args.handled) {
      that.callBase(args);
    }
  },
  _dimensionChanged() {
    this.updateDimensions(true);
  },
  _visibilityChanged(visible) {
    if (visible) {
      this.updateDimensions();
    }
  },
  _initMarkup() {
    this.callBase.apply(this, arguments);
    this.$element().addClass(TREELIST_CLASS);
    this.getView('gridView').render(this.$element());
  },
  _renderContentImpl() {
    this.getView('gridView').update();
  },
  _renderContent() {
    var that = this;
    (0, _common.deferRender)(function () {
      that._renderContentImpl();
    });
  },
  _dispose() {
    var that = this;
    that.callBase();
    callModuleItemsMethod(that, 'dispose');
  },
  isReady() {
    return this.getController('data').isReady();
  },
  beginUpdate() {
    var that = this;
    that.callBase();
    callModuleItemsMethod(that, 'beginUpdate');
  },
  endUpdate() {
    var that = this;
    callModuleItemsMethod(that, 'endUpdate');
    that.callBase();
  },
  getController(name) {
    return this._controllers[name];
  },
  getView(name) {
    return this._views[name];
  },
  focus(element) {
    this.callBase();
    if ((0, _type.isDefined)(element)) {
      this.getController('keyboardNavigation').focus(element);
    }
  }
});
TreeList.registerModule = _m_core.default.registerModule.bind(_m_core.default);
(0, _component_registrator.default)('dxTreeList', TreeList);
var _default = TreeList;
exports.default = _default;