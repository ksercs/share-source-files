/**
* DevExtreme (bundles/__internal/grids/grid_core/column_state_mixin/module.js)
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
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var common_1 = require("../../../../core/utils/common");
var extend_1 = require("../../../../core/utils/extend");
var position_1 = require("../../../../core/utils/position");
var COLUMN_INDICATORS_CLASS = 'dx-column-indicators';
var GROUP_PANEL_ITEM_CLASS = 'dx-group-panel-item';
exports.default = {
    _applyColumnState: function (options) {
        var _a;
        var that = this;
        var rtlEnabled = this.option('rtlEnabled');
        var columnAlignment = that._getColumnAlignment(options.column.alignment, rtlEnabled);
        var parameters = extend_1.extend(true, { columnAlignment: columnAlignment }, options);
        var isGroupPanelItem = parameters.rootElement.hasClass(GROUP_PANEL_ITEM_CLASS);
        var $indicatorsContainer = that._createIndicatorContainer(parameters, isGroupPanelItem);
        var $span = renderer_1.default('<span>').addClass(that._getIndicatorClassName(options.name));
        var columnsController = (_a = that.component) === null || _a === void 0 ? void 0 : _a.getController('columns');
        var indicatorAlignment = (columnsController === null || columnsController === void 0 ? void 0 : columnsController.getHeaderContentAlignment(columnAlignment)) || columnAlignment;
        parameters.container = $indicatorsContainer;
        parameters.indicator = $span;
        that._renderIndicator(parameters);
        $indicatorsContainer[(isGroupPanelItem || !options.showColumnLines) && indicatorAlignment === 'left' ? 'appendTo' : 'prependTo'](options.rootElement);
        return $span;
    },
    _getIndicatorClassName: common_1.noop,
    _getColumnAlignment: function (alignment, rtlEnabled) {
        rtlEnabled = rtlEnabled || this.option('rtlEnabled');
        return alignment && alignment !== 'center' ? alignment : position_1.getDefaultAlignment(rtlEnabled);
    },
    _createIndicatorContainer: function (options, ignoreIndicatorAlignment) {
        var $indicatorsContainer = this._getIndicatorContainer(options.rootElement);
        var indicatorAlignment = options.columnAlignment === 'left' ? 'right' : 'left';
        if (!$indicatorsContainer.length) {
            $indicatorsContainer = renderer_1.default('<div>').addClass(COLUMN_INDICATORS_CLASS);
        }
        this.setAria('role', 'presentation', $indicatorsContainer);
        return $indicatorsContainer.css('float', options.showColumnLines && !ignoreIndicatorAlignment ? indicatorAlignment : null);
    },
    _getIndicatorContainer: function ($cell) {
        return $cell && $cell.find("." + COLUMN_INDICATORS_CLASS);
    },
    _getIndicatorElements: function ($cell) {
        var $indicatorContainer = this._getIndicatorContainer($cell);
        return $indicatorContainer && $indicatorContainer.children();
    },
    _renderIndicator: function (options) {
        var $container = options.container;
        var $indicator = options.indicator;
        $container && $indicator && $container.append($indicator);
    },
    _updateIndicators: function (indicatorName) {
        var that = this;
        var columns = that.getColumns();
        var $cells = that.getColumnElements();
        var $cell;
        if (!$cells || columns.length !== $cells.length)
            return;
        for (var i = 0; i < columns.length; i++) {
            $cell = $cells.eq(i);
            that._updateIndicator($cell, columns[i], indicatorName);
            var rowOptions = $cell.parent().data('options');
            if (rowOptions && rowOptions.cells) {
                rowOptions.cells[$cell.index()].column = columns[i];
            }
        }
    },
    _updateIndicator: function ($cell, column, indicatorName) {
        if (!column.command) {
            return this._applyColumnState({
                name: indicatorName,
                rootElement: $cell,
                column: column,
                showColumnLines: this.option('showColumnLines'),
            });
        }
    },
};
