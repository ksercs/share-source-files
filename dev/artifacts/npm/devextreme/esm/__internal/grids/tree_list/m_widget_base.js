/**
* DevExtreme (esm/__internal/grids/tree_list/m_widget_base.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './module_not_extended/column_headers';
import './m_columns_controller';
import './data_controller/m_data_controller';
import './module_not_extended/sorting';
import './rows/m_rows';
import './module_not_extended/context_menu';
import './module_not_extended/error_handling';
import './m_grid_view';
import './module_not_extended/header_panel';
import registerComponent from '../../../core/component_registrator';
import { deferRender, noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { isDefined, isFunction } from '../../../core/utils/type';
import { isMaterial } from '../../../ui/themes';
import Widget from '../../../ui/widget/ui.widget';
import gridCoreUtils from '../../grids/grid_core/m_utils';
import treeListCore from './m_core';
var {
  callModuleItemsMethod
} = treeListCore;
var DATAGRID_ROW_SELECTOR = '.dx-row';
var TREELIST_CLASS = 'dx-treelist';
treeListCore.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'editing', 'grouping', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
var TreeList = Widget.inherit({
  _activeStateUnit: DATAGRID_ROW_SELECTOR,
  _getDefaultOptions() {
    var that = this;
    var result = that.callBase();
    each(treeListCore.modules, function () {
      if (isFunction(this.defaultOptions)) {
        extend(true, result, this.defaultOptions());
      }
    });
    return result;
  },
  _setDeprecatedOptions() {
    this.callBase();
    extend(this._deprecatedOptions, {
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
        return isMaterial();
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
      gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this);
    }
    treeListCore.processModules(that, treeListCore);
    callModuleItemsMethod(that, 'init');
  },
  _clean: noop,
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
    deferRender(() => {
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
    if (isDefined(element)) {
      this.getController('keyboardNavigation').focus(element);
    }
  }
});
TreeList.registerModule = treeListCore.registerModule.bind(treeListCore);
registerComponent('dxTreeList', TreeList);
export default TreeList;
