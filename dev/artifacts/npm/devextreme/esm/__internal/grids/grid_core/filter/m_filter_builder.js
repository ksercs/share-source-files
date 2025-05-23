/**
* DevExtreme (esm/__internal/grids/grid_core/filter/m_filter_builder.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import messageLocalization from '../../../../localization/message';
import FilterBuilder from '../../../../ui/filter_builder';
import Popup from '../../../../ui/popup/ui.popup';
import ScrollView from '../../../../ui/scroll_view';
import { restoreFocus } from '../../../../ui/shared/accessibility';
import modules from '../m_modules';
var FilterBuilderView = modules.View.inherit({
  _renderCore() {
    this._updatePopupOptions();
  },
  _updatePopupOptions() {
    if (this.option('filterBuilderPopup.visible')) {
      this._initPopup();
    } else if (this._filterBuilderPopup) {
      this._filterBuilderPopup.hide();
    }
  },
  _disposePopup() {
    if (this._filterBuilderPopup) {
      this._filterBuilderPopup.dispose();
      this._filterBuilderPopup = undefined;
    }
    if (this._filterBuilder) {
      this._filterBuilder.dispose();
      this._filterBuilder = undefined;
    }
  },
  _initPopup() {
    var that = this;
    that._disposePopup();
    that._filterBuilderPopup = that._createComponent(that.element(), Popup, extend({
      title: messageLocalization.format('dxDataGrid-filterBuilderPopupTitle'),
      contentTemplate($contentElement) {
        return that._getPopupContentTemplate($contentElement);
      },
      onOptionChanged(args) {
        if (args.name === 'visible') {
          that.option('filterBuilderPopup.visible', args.value);
        }
      },
      toolbarItems: that._getPopupToolbarItems()
    }, that.option('filterBuilderPopup'), {
      onHidden() {
        restoreFocus(that);
        that._disposePopup();
      }
    }));
  },
  _getPopupContentTemplate(contentElement) {
    var $contentElement = $(contentElement);
    var $filterBuilderContainer = $('<div>').appendTo($(contentElement));
    this._filterBuilder = this._createComponent($filterBuilderContainer, FilterBuilder, extend({
      value: this.option('filterValue'),
      fields: this.getController('columns').getFilteringColumns()
    }, this.option('filterBuilder'), {
      customOperations: this.getController('filterSync').getCustomFilterOperations()
    }));
    this._createComponent($contentElement, ScrollView, {
      direction: 'both'
    });
  },
  _getPopupToolbarItems() {
    var that = this;
    return [{
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: messageLocalization.format('OK'),
        onClick() {
          var filter = that._filterBuilder.option('value');
          that.option('filterValue', filter);
          that._filterBuilderPopup.hide();
        }
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: messageLocalization.format('Cancel'),
        onClick() {
          that._filterBuilderPopup.hide();
        }
      }
    }];
  },
  optionChanged(args) {
    switch (args.name) {
      case 'filterBuilder':
      case 'filterBuilderPopup':
        this._invalidate();
        args.handled = true;
        break;
      default:
        this.callBase(args);
    }
  }
});
export var filterBuilderModule = {
  defaultOptions() {
    return {
      filterBuilder: {
        groupOperationDescriptions: {
          and: messageLocalization.format('dxFilterBuilder-and'),
          or: messageLocalization.format('dxFilterBuilder-or'),
          notAnd: messageLocalization.format('dxFilterBuilder-notAnd'),
          notOr: messageLocalization.format('dxFilterBuilder-notOr')
        },
        filterOperationDescriptions: {
          between: messageLocalization.format('dxFilterBuilder-filterOperationBetween'),
          equal: messageLocalization.format('dxFilterBuilder-filterOperationEquals'),
          notEqual: messageLocalization.format('dxFilterBuilder-filterOperationNotEquals'),
          lessThan: messageLocalization.format('dxFilterBuilder-filterOperationLess'),
          lessThanOrEqual: messageLocalization.format('dxFilterBuilder-filterOperationLessOrEquals'),
          greaterThan: messageLocalization.format('dxFilterBuilder-filterOperationGreater'),
          greaterThanOrEqual: messageLocalization.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
          startsWith: messageLocalization.format('dxFilterBuilder-filterOperationStartsWith'),
          contains: messageLocalization.format('dxFilterBuilder-filterOperationContains'),
          notContains: messageLocalization.format('dxFilterBuilder-filterOperationNotContains'),
          endsWith: messageLocalization.format('dxFilterBuilder-filterOperationEndsWith'),
          isBlank: messageLocalization.format('dxFilterBuilder-filterOperationIsBlank'),
          isNotBlank: messageLocalization.format('dxFilterBuilder-filterOperationIsNotBlank')
        }
      },
      filterBuilderPopup: {}
    };
  },
  views: {
    filterBuilderView: FilterBuilderView
  }
};
