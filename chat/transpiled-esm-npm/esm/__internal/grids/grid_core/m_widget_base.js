import { deferRender } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { isFunction } from '../../../core/utils/type';
import Widget from '../../../ui/widget/ui.widget';
const GRID_CORE_ROW_SELECTOR = '.dx-row';
export default class GridCoreWidget extends Widget {
  _getDefaultOptions() {
    // @ts-expect-error
    const result = super._getDefaultOptions();
    each(this.getGridCoreHelper().modules, function () {
      if (isFunction(this.defaultOptions)) {
        extend(true, result, this.defaultOptions());
      }
    });
    return result;
  }
  _init() {
    this._activeStateUnit = GRID_CORE_ROW_SELECTOR;
    // @ts-expect-error
    super._init();
  }
  _setDeprecatedOptions() {
    // @ts-expect-error
    super._setDeprecatedOptions();
    // @ts-expect-error
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
  }
  _clean() {}
  _optionChanged(args) {
    this.getGridCoreHelper().callModuleItemsMethod(this, 'optionChanged', [args]);
    if (!args.handled) {
      // @ts-expect-error
      super._optionChanged(args);
    }
  }
  _dimensionChanged() {
    // @ts-expect-error
    this.updateDimensions(true);
  }
  _visibilityChanged(visible) {
    if (visible) {
      // @ts-expect-error
      this.updateDimensions();
    }
  }
  _renderContentImpl() {
    this.getView('gridView').update();
  }
  _renderContent() {
    const that = this;
    deferRender(() => {
      that._renderContentImpl();
    });
  }
  _dispose() {
    // @ts-expect-error
    super._dispose();
    this.getGridCoreHelper().callModuleItemsMethod(this, 'dispose');
  }
  isReady() {
    return this.getController('data').isReady();
  }
  getController(name) {
    return this._controllers[name];
  }
  getView(name) {
    return this._views[name];
  }
  getGridCoreHelper() {}
  beginUpdate() {
    super.beginUpdate();
    this.getGridCoreHelper().callModuleItemsMethod(this, 'beginUpdate');
  }
  endUpdate() {
    this.getGridCoreHelper().callModuleItemsMethod(this, 'endUpdate');
    super.endUpdate();
  }
}