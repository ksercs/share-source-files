/**
* DevExtreme (bundles/__internal/grids/pivot_grid/fields_area/module.js)
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
exports.FieldsArea = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var common_1 = require("../../../../core/utils/common");
var iterator_1 = require("../../../../core/utils/iterator");
var style_1 = require("../../../../core/utils/style");
var ui_popup_1 = __importDefault(require("../../../../ui/popup/ui.popup"));
var button_1 = __importDefault(require("../../../../ui/button"));
var module_1 = require("../area_item/module");
var module_widget_utils_1 = require("../module_widget_utils");
require("../field_chooser/module_base");
var DIV = '<div>';
var AREA_DRAG_CLASS = 'dx-pivotgrid-drag-action';
function renderGroupConnector(field, nextField, prevField, $container) {
    if (prevField && prevField.groupName && prevField.groupName === field.groupName) {
        renderer_1.default(DIV).addClass('dx-group-connector').addClass('dx-group-connector-prev').appendTo($container);
    }
    if (nextField && nextField.groupName && nextField.groupName === field.groupName) {
        renderer_1.default(DIV).addClass('dx-group-connector').addClass('dx-group-connector-next').appendTo($container);
    }
}
var FieldsArea = module_1.AreaItem.inherit({
    ctor: function (component, area) {
        this.callBase(component);
        this._area = area;
    },
    _getAreaName: function () {
        return 'fields';
    },
    _createGroupElement: function () {
        return renderer_1.default(DIV)
            .addClass('dx-pivotgrid-fields-area')
            .addClass('dx-area-fields')
            .addClass(AREA_DRAG_CLASS)
            .attr('group', this._area);
    },
    isVisible: function () {
        return !!this.option('fieldPanel.visible') && this.option("fieldPanel.show" + module_widget_utils_1.capitalizeFirstLetter(this._area) + "Fields");
    },
    _renderButton: function (element) {
        var that = this;
        var container = renderer_1.default('<td>').appendTo(renderer_1.default('<tr>').appendTo(element));
        var button = that.component._createComponent(renderer_1.default(DIV).appendTo(container), button_1.default, {
            text: 'Fields',
            icon: 'menu',
            width: 'auto',
            onClick: function () {
                var popup = that.tableElement().find('.dx-fields-area-popup').dxPopup('instance');
                if (!popup.option('visible')) {
                    popup.show();
                }
            },
        });
        button.$element().addClass('dx-pivotgrid-fields-area-hamburger');
    },
    _getPopupOptions: function (row, button) {
        return {
            contentTemplate: function () {
                return renderer_1.default('<table>').addClass('dx-area-field-container')
                    .append(renderer_1.default('<thead>').addClass('dx-pivotgrid-fields-area-head')
                    .append(row));
            },
            height: 'auto',
            width: 'auto',
            position: {
                at: 'left',
                my: 'left',
                of: button,
            },
            dragEnabled: false,
            animation: {
                show: {
                    type: 'pop',
                    duration: 200,
                },
            },
            shading: false,
            showTitle: false,
            hideOnOutsideClick: true,
            container: button.parent(),
        };
    },
    _renderPopup: function (tableElement, row) {
        var that = this;
        var button = tableElement.find('.dx-button');
        var popupOptions = that._getPopupOptions(row, button);
        var FieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
        if (that._rowPopup) {
            that._rowPopup.$element().remove();
        }
        that._rowPopup = that.component._createComponent(renderer_1.default(DIV).appendTo(tableElement), ui_popup_1.default, popupOptions);
        that._rowPopup.$element().addClass('dx-fields-area-popup');
        that._rowPopup.content()
            .addClass('dx-pivotgrid-fields-container');
        that._rowPopup.content().parent()
            .attr('group', 'row');
        FieldChooserBase.subscribeToEvents(that._rowPopup.content());
        FieldChooserBase.renderSortable(that._rowPopup.content());
    },
    _shouldCreateButton: function () {
        return false;
    },
    _renderTableContent: function (tableElement, data) {
        var that = this;
        var groupElement = this.groupElement();
        var isVisible = this.isVisible();
        var fieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
        var head = renderer_1.default('<thead>').addClass('dx-pivotgrid-fields-area-head').appendTo(tableElement);
        var area = that._area;
        var row = renderer_1.default('<tr>');
        groupElement.toggleClass('dx-hidden', !isVisible);
        tableElement.addClass('dx-area-field-container');
        if (!isVisible) {
            return;
        }
        iterator_1.each(data, function (index, field) {
            if (field.area === area && field.visible !== false) {
                var td = renderer_1.default('<td>').append(fieldChooserBase.renderField(field, field.area === 'row'));
                var indicators = td.find('.dx-column-indicators');
                if (indicators.length && that._shouldCreateButton()) {
                    indicators.insertAfter(indicators.next());
                }
                td.appendTo(row);
                renderGroupConnector(field, data[index + 1], data[index - 1], td);
            }
        });
        if (!row.children().length) {
            renderer_1.default('<td>').append(renderer_1.default(DIV).addClass('dx-empty-area-text').text(this.option("fieldPanel.texts." + area + "FieldArea"))).appendTo(row);
        }
        if (that._shouldCreateButton()) {
            that._renderButton(head);
            that._renderPopup(tableElement, row);
        }
        else {
            head.append(row);
        }
    },
    setGroupWidth: function (value) {
        style_1.setWidth(this.groupElement(), value);
    },
    setGroupHeight: function (value) {
        style_1.setHeight(this.groupElement(), value);
    },
    reset: function () {
        this.callBase();
        this.groupElement().css('marginTop', 0);
    },
    _renderVirtualContent: common_1.noop,
});
exports.FieldsArea = FieldsArea;
exports.default = { FieldsArea: FieldsArea };
