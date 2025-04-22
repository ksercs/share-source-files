import './module_not_extended/column_headers';
import './m_columns_controller';
import './m_data_controller';
import './module_not_extended/sorting';
import './module_not_extended/rows';
import './module_not_extended/context_menu';
import './module_not_extended/error_handling';
import './module_not_extended/grid_view';
import './module_not_extended/header_panel';
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import browser from '../../../core/utils/browser';
import { logger } from '../../../core/utils/console';
import { extend } from '../../../core/utils/extend';
import { isString } from '../../../core/utils/type';
import { isMaterialBased } from '../../../ui/themes';
import gridCoreUtils from '../../grids/grid_core/m_utils';
import GridCoreWidget from '../../grids/grid_core/m_widget_base';
import gridCore from './m_core';
const DATAGRID_DEPRECATED_TEMPLATE_WARNING = 'Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.';
gridCore.registerModulesOrder(['stateStoring', 'columns', 'selection', 'editorFactory', 'columnChooser', 'grouping', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'masterDetail', 'validating', 'adaptivity', 'data', 'virtualScrolling', 'columnHeaders', 'filterRow', 'headerPanel', 'headerFilter', 'sorting', 'search', 'rows', 'pager', 'columnsResizingReordering', 'contextMenu', 'keyboardNavigation', 'errorHandling', 'summary', 'columnFixing', 'export', 'gridView']);
class DataGrid extends GridCoreWidget {
  _defaultOptionsRules() {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super._defaultOptionsRules().concat([{
      device: {
        platform: 'ios'
      },
      options: {
        showRowLines: true
      }
    }, {
      device() {
        // @ts-expect-error
        return isMaterialBased();
      },
      options: {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
          height: 315
        },
        editing: {
          useIcons: true
        },
        selection: {
          showCheckBoxesMode: 'always'
        }
      }
    }, {
      device() {
        return browser.webkit;
      },
      options: {
        loadingTimeout: 30,
        loadPanel: {
          animation: {
            show: {
              easing: 'cubic-bezier(1, 0, 1, 0)',
              duration: 500,
              from: {
                opacity: 0
              },
              to: {
                opacity: 1
              }
            }
          }
        }
      }
    }, {
      device(device) {
        return device.deviceType !== 'desktop';
      },
      options: {
        grouping: {
          expandMode: 'rowClick'
        }
      }
    }]);
  }
  _init() {
    const that = this;
    super._init();
    gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(that);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    gridCore.processModules(that, gridCore);
    gridCore.callModuleItemsMethod(that, 'init');
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup.apply(this, arguments);
    this.getView('gridView').render(this.$element());
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    // @ts-expect-error
    extend(this._deprecatedOptions, {
      useKeyboard: {
        since: '19.2',
        alias: 'keyboardNavigation.enabled'
      },
      rowTemplate: {
        since: '21.2',
        message: 'Use the "dataRowTemplate" option instead'
      }
    });
  }
  static registerModule(name, module) {
    gridCore.registerModule(name, module);
  }
  getGridCoreHelper() {
    return gridCore;
  }
  _getTemplate(templateName) {
    let template = templateName;
    if (isString(template) && template.startsWith('#')) {
      template = $(templateName);
      logger.warn(DATAGRID_DEPRECATED_TEMPLATE_WARNING);
    }
    return super._getTemplate(template);
  }
  focus(element) {
    this.getController('keyboardNavigation').focus(element);
  }
}
// @ts-expect-error
registerComponent('dxDataGrid', DataGrid);
export default DataGrid;