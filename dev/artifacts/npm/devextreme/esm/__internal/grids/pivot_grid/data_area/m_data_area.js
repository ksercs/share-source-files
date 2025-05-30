/**
* DevExtreme (esm/__internal/grids/pivot_grid/data_area/m_data_area.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { nativeScrolling } from '../../../../core/utils/support';
import { AreaItem } from '../area_item/m_area_item';
import { calculateScrollbarWidth } from '../m_widget_utils';
var PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
var PIVOTGRID_AREA_DATA_CLASS = 'dx-pivotgrid-area-data';
var PIVOTGRID_TOTAL_CLASS = 'dx-total';
var PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
var PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
var DataArea = AreaItem.inherit({
  _getAreaName() {
    return 'data';
  },
  _createGroupElement() {
    return $('<div>').addClass(PIVOTGRID_AREA_CLASS).addClass(PIVOTGRID_AREA_DATA_CLASS).css('borderTopWidth', 0);
  },
  _applyCustomStyles(options) {
    var {
      cell
    } = options;
    var {
      classArray
    } = options;
    if (cell.rowType === 'T' || cell.columnType === 'T') {
      classArray.push(PIVOTGRID_TOTAL_CLASS);
    }
    if (cell.rowType === 'GT' || cell.columnType === 'GT') {
      classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
    }
    if (cell.rowType === 'T' || cell.rowType === 'GT') {
      classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
    }
    if (options.rowIndex === options.rowsCount - 1) {
      options.cssArray.push('border-bottom: 0px');
    }
    this.callBase(options);
  },
  _moveFakeTable(scrollPos) {
    this._moveFakeTableHorizontally(scrollPos.x);
    this._moveFakeTableTop(scrollPos.y);
    this.callBase();
  },
  renderScrollable() {
    this._groupElement.dxScrollable({
      useNative: this.getUseNativeValue(),
      useSimulatedScrollbar: false,
      rtlEnabled: this.component.option('rtlEnabled'),
      bounceEnabled: false,
      updateManually: true
    });
  },
  getUseNativeValue() {
    var {
      useNative
    } = this.component.option('scrolling');
    return useNative === 'auto' ? !!nativeScrolling : !!useNative;
  },
  getScrollbarWidth() {
    return this.getUseNativeValue() ? calculateScrollbarWidth() : 0;
  },
  updateScrollableOptions(_ref) {
    var {
      direction,
      rtlEnabled
    } = _ref;
    var scrollable = this._getScrollable();
    scrollable.option('useNative', this.getUseNativeValue());
    scrollable.option({
      direction,
      rtlEnabled
    });
  },
  getScrollableDirection(horizontal, vertical) {
    if (horizontal && !vertical) {
      return 'horizontal';
    }
    if (!horizontal && vertical) {
      return 'vertical';
    }
    return 'both';
  },
  reset() {
    this.callBase();
    if (this._virtualContent) {
      this._virtualContent.parent().css('height', 'auto');
    }
  },
  setVirtualContentParams(params) {
    this.callBase(params);
    this._virtualContent.parent().css('height', params.height);
    this._setTableCss({
      top: params.top,
      left: params.left
    });
  }
});
export default {
  DataArea
};
export { DataArea };
