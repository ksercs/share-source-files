/**
* DevExtreme (bundles/__internal/grids/pivot_grid/fields_area/m_fields_area.js)
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
exports.default = exports.FieldsArea = void 0;
require("../field_chooser/m_field_chooser_base");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _iterator = require("../../../../core/utils/iterator");
var _style = require("../../../../core/utils/style");
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _ui = _interopRequireDefault(require("../../../../ui/popup/ui.popup"));
var _m_area_item = require("../area_item/m_area_item");
var _m_widget_utils = require("../m_widget_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DIV = '<div>';
var AREA_DRAG_CLASS = 'dx-pivotgrid-drag-action';
function renderGroupConnector(field, nextField, prevField, $container) {
  if (prevField && prevField.groupName && prevField.groupName === field.groupName) {
    (0, _renderer.default)(DIV).addClass('dx-group-connector').addClass('dx-group-connector-prev').appendTo($container);
  }
  if (nextField && nextField.groupName && nextField.groupName === field.groupName) {
    (0, _renderer.default)(DIV).addClass('dx-group-connector').addClass('dx-group-connector-next').appendTo($container);
  }
}
var FieldsArea = _m_area_item.AreaItem.inherit({
  ctor(component, area) {
    this.callBase(component);
    this._area = area;
  },
  _getAreaName() {
    return 'fields';
  },
  _createGroupElement() {
    return (0, _renderer.default)(DIV).addClass('dx-pivotgrid-fields-area').addClass('dx-area-fields').addClass(AREA_DRAG_CLASS).attr('group', this._area);
  },
  isVisible() {
    return !!this.option('fieldPanel.visible') && this.option("fieldPanel.show".concat((0, _m_widget_utils.capitalizeFirstLetter)(this._area), "Fields"));
  },
  _renderButton(element) {
    var that = this;
    var container = (0, _renderer.default)('<td>').appendTo((0, _renderer.default)('<tr>').appendTo(element));
    var button = that.component._createComponent((0, _renderer.default)(DIV).appendTo(container), _button.default, {
      text: 'Fields',
      icon: 'menu',
      width: 'auto',
      onClick() {
        var popup = that.tableElement().find('.dx-fields-area-popup').dxPopup('instance');
        if (!popup.option('visible')) {
          popup.show();
        }
      }
    });
    button.$element().addClass('dx-pivotgrid-fields-area-hamburger');
  },
  _getPopupOptions(row, button) {
    return {
      contentTemplate() {
        return (0, _renderer.default)('<table>').addClass('dx-area-field-container').append((0, _renderer.default)('<thead>').addClass('dx-pivotgrid-fields-area-head').append(row));
      },
      height: 'auto',
      width: 'auto',
      position: {
        at: 'left',
        my: 'left',
        of: button
      },
      dragEnabled: false,
      animation: {
        show: {
          type: 'pop',
          duration: 200
        }
      },
      shading: false,
      showTitle: false,
      hideOnOutsideClick: true,
      container: button.parent()
    };
  },
  _renderPopup(tableElement, row) {
    var that = this;
    var button = tableElement.find('.dx-button');
    var popupOptions = that._getPopupOptions(row, button);
    var FieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
    if (that._rowPopup) {
      that._rowPopup.$element().remove();
    }
    that._rowPopup = that.component._createComponent((0, _renderer.default)(DIV).appendTo(tableElement), _ui.default, popupOptions);
    that._rowPopup.$element().addClass('dx-fields-area-popup');
    that._rowPopup.content().addClass('dx-pivotgrid-fields-container');
    that._rowPopup.content().parent().attr('group', 'row');
    FieldChooserBase.subscribeToEvents(that._rowPopup.content());
    FieldChooserBase.renderSortable(that._rowPopup.content());
  },
  _shouldCreateButton() {
    return false;
  },
  _renderTableContent(tableElement, data) {
    var that = this;
    var groupElement = this.groupElement();
    var isVisible = this.isVisible();
    var fieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
    var head = (0, _renderer.default)('<thead>').addClass('dx-pivotgrid-fields-area-head').appendTo(tableElement);
    var area = that._area;
    var row = (0, _renderer.default)('<tr>');
    groupElement.toggleClass('dx-hidden', !isVisible);
    tableElement.addClass('dx-area-field-container');
    if (!isVisible) {
      return;
    }
    (0, _iterator.each)(data, function (index, field) {
      if (field.area === area && field.visible !== false) {
        var td = (0, _renderer.default)('<td>').append(fieldChooserBase.renderField(field, field.area === 'row'));
        var indicators = td.find('.dx-column-indicators');
        if (indicators.length && that._shouldCreateButton()) {
          indicators.insertAfter(indicators.next());
        }
        td.appendTo(row);
        renderGroupConnector(field, data[index + 1], data[index - 1], td);
      }
    });
    if (!row.children().length) {
      (0, _renderer.default)('<td>').append((0, _renderer.default)(DIV).addClass('dx-empty-area-text').text(this.option("fieldPanel.texts.".concat(area, "FieldArea")))).appendTo(row);
    }
    if (that._shouldCreateButton()) {
      that._renderButton(head);
      that._renderPopup(tableElement, row);
    } else {
      head.append(row);
    }
  },
  setGroupWidth(value) {
    (0, _style.setWidth)(this.groupElement(), value);
  },
  setGroupHeight(value) {
    (0, _style.setHeight)(this.groupElement(), value);
  },
  reset() {
    this.callBase();
    this.groupElement().css('marginTop', 0);
  },
  _renderVirtualContent: _common.noop
});
exports.FieldsArea = FieldsArea;
var _default = {
  FieldsArea
};
exports.default = _default;
