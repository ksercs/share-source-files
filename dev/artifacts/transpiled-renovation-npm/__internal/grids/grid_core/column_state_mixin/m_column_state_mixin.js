"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _extend = require("../../../../core/utils/extend");
var _position = require("../../../../core/utils/position");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var COLUMN_INDICATORS_CLASS = 'dx-column-indicators';
var GROUP_PANEL_ITEM_CLASS = 'dx-group-panel-item';
var _default = {
  _applyColumnState(options) {
    var _a;
    var that = this;
    var rtlEnabled = this.option('rtlEnabled');
    var columnAlignment = that._getColumnAlignment(options.column.alignment, rtlEnabled);
    var parameters = (0, _extend.extend)(true, {
      columnAlignment
    }, options);
    var isGroupPanelItem = parameters.rootElement.hasClass(GROUP_PANEL_ITEM_CLASS);
    var $indicatorsContainer = that._createIndicatorContainer(parameters, isGroupPanelItem);
    var $span = (0, _renderer.default)('<span>').addClass(that._getIndicatorClassName(options.name));
    var columnsController = (_a = that.component) === null || _a === void 0 ? void 0 : _a.getController('columns');
    var indicatorAlignment = (columnsController === null || columnsController === void 0 ? void 0 : columnsController.getHeaderContentAlignment(columnAlignment)) || columnAlignment;
    parameters.container = $indicatorsContainer;
    parameters.indicator = $span;
    that._renderIndicator(parameters);
    $indicatorsContainer[(isGroupPanelItem || !options.showColumnLines) && indicatorAlignment === 'left' ? 'appendTo' : 'prependTo'](options.rootElement);
    return $span;
  },
  _getIndicatorClassName: _common.noop,
  _getColumnAlignment(alignment, rtlEnabled) {
    rtlEnabled = rtlEnabled || this.option('rtlEnabled');
    return alignment && alignment !== 'center' ? alignment : (0, _position.getDefaultAlignment)(rtlEnabled);
  },
  _createIndicatorContainer(options, ignoreIndicatorAlignment) {
    var $indicatorsContainer = this._getIndicatorContainer(options.rootElement);
    var indicatorAlignment = options.columnAlignment === 'left' ? 'right' : 'left';
    if (!$indicatorsContainer.length) {
      $indicatorsContainer = (0, _renderer.default)('<div>').addClass(COLUMN_INDICATORS_CLASS);
    }
    this.setAria('role', 'presentation', $indicatorsContainer);
    return $indicatorsContainer.css('float', options.showColumnLines && !ignoreIndicatorAlignment ? indicatorAlignment : null);
  },
  _getIndicatorContainer($cell) {
    return $cell && $cell.find(".".concat(COLUMN_INDICATORS_CLASS));
  },
  _getIndicatorElements($cell) {
    var $indicatorContainer = this._getIndicatorContainer($cell);
    return $indicatorContainer && $indicatorContainer.children();
  },
  _renderIndicator(options) {
    var $container = options.container;
    var $indicator = options.indicator;
    $container && $indicator && $container.append($indicator);
  },
  _updateIndicators(indicatorName) {
    var that = this;
    var columns = that.getColumns();
    var $cells = that.getColumnElements();
    var $cell;
    if (!$cells || columns.length !== $cells.length) return;
    for (var i = 0; i < columns.length; i++) {
      $cell = $cells.eq(i);
      that._updateIndicator($cell, columns[i], indicatorName);
      var rowOptions = $cell.parent().data('options');
      if (rowOptions && rowOptions.cells) {
        rowOptions.cells[$cell.index()].column = columns[i];
      }
    }
  },
  _updateIndicator($cell, column, indicatorName) {
    if (!column.command) {
      return this._applyColumnState({
        name: indicatorName,
        rootElement: $cell,
        column,
        showColumnLines: this.option('showColumnLines')
      });
    }
  }
};
exports.default = _default;