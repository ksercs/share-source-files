/**
* DevExtreme (bundles/__internal/grids/grid_core/filter/m_filter_builder.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterBuilderModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _filter_builder = _interopRequireDefault(require("../../../../ui/filter_builder"));
var _ui = _interopRequireDefault(require("../../../../ui/popup/ui.popup"));
var _scroll_view = _interopRequireDefault(require("../../../../ui/scroll_view"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _m_modules = _interopRequireDefault(require("../m_modules"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FilterBuilderView = _m_modules.default.View.inherit({
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
    that._filterBuilderPopup = that._createComponent(that.element(), _ui.default, (0, _extend.extend)({
      title: _message.default.format('dxDataGrid-filterBuilderPopupTitle'),
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
        (0, _accessibility.restoreFocus)(that);
        that._disposePopup();
      }
    }));
  },
  _getPopupContentTemplate(contentElement) {
    var $contentElement = (0, _renderer.default)(contentElement);
    var $filterBuilderContainer = (0, _renderer.default)('<div>').appendTo((0, _renderer.default)(contentElement));
    this._filterBuilder = this._createComponent($filterBuilderContainer, _filter_builder.default, (0, _extend.extend)({
      value: this.option('filterValue'),
      fields: this.getController('columns').getFilteringColumns()
    }, this.option('filterBuilder'), {
      customOperations: this.getController('filterSync').getCustomFilterOperations()
    }));
    this._createComponent($contentElement, _scroll_view.default, {
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
        text: _message.default.format('OK'),
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
        text: _message.default.format('Cancel'),
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
var filterBuilderModule = {
  defaultOptions() {
    return {
      filterBuilder: {
        groupOperationDescriptions: {
          and: _message.default.format('dxFilterBuilder-and'),
          or: _message.default.format('dxFilterBuilder-or'),
          notAnd: _message.default.format('dxFilterBuilder-notAnd'),
          notOr: _message.default.format('dxFilterBuilder-notOr')
        },
        filterOperationDescriptions: {
          between: _message.default.format('dxFilterBuilder-filterOperationBetween'),
          equal: _message.default.format('dxFilterBuilder-filterOperationEquals'),
          notEqual: _message.default.format('dxFilterBuilder-filterOperationNotEquals'),
          lessThan: _message.default.format('dxFilterBuilder-filterOperationLess'),
          lessThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationLessOrEquals'),
          greaterThan: _message.default.format('dxFilterBuilder-filterOperationGreater'),
          greaterThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
          startsWith: _message.default.format('dxFilterBuilder-filterOperationStartsWith'),
          contains: _message.default.format('dxFilterBuilder-filterOperationContains'),
          notContains: _message.default.format('dxFilterBuilder-filterOperationNotContains'),
          endsWith: _message.default.format('dxFilterBuilder-filterOperationEndsWith'),
          isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
          isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
        }
      },
      filterBuilderPopup: {}
    };
  },
  views: {
    filterBuilderView: FilterBuilderView
  }
};
exports.filterBuilderModule = filterBuilderModule;
