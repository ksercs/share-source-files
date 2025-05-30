"use strict";

exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _type = require("../../core/utils/type");
var _m_base_widget = _interopRequireDefault(require("../../__internal/viz/core/m_base_widget"));
var _extend2 = require("../../core/utils/extend");
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _utils = require("../core/utils");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _translator2d = require("../translators/translator2d");
var _common = require("../../core/utils/common");
var _tooltip = require("../core/tooltip");
var _export = require("../core/export");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_LINE_SPACING = 2;
var TOOLTIP_TABLE_BORDER_SPACING = 0;
var TOOLTIP_TABLE_KEY_VALUE_SPACE = 15;
var EVENT_NS = 'sparkline-tooltip';
var POINTER_ACTION = (0, _index.addNamespace)([_pointer.default.down, _pointer.default.move], EVENT_NS);
var _extend = _extend2.extend;
var _floor = Math.floor;
function inCanvas(_ref, x, y) {
  var width = _ref.width,
    height = _ref.height;
  return (0, _utils.pointInCanvas)({
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height
  }, x, y);
}
function pointerHandler(_ref2) {
  var data = _ref2.data;
  var that = data.widget;
  that._enableOutHandler();
  that._showTooltip();
}
function getDefaultTemplate(_ref3, textAlign) {
  var lineSpacing = _ref3.lineSpacing,
    size = _ref3.size;
  var lineHeight = "".concat((lineSpacing !== null && lineSpacing !== void 0 ? lineSpacing : DEFAULT_LINE_SPACING) + size, "px");
  return function (_ref4, container) {
    var valueText = _ref4.valueText;
    var table = (0, _renderer.default)('<table>').css({
      borderSpacing: TOOLTIP_TABLE_BORDER_SPACING,
      lineHeight
    });
    for (var i = 0; i < valueText.length; i += 2) {
      var tr = (0, _renderer.default)('<tr>');
      (0, _renderer.default)('<td>').text(valueText[i]).appendTo(tr);
      (0, _renderer.default)('<td>').css({
        width: TOOLTIP_TABLE_KEY_VALUE_SPACE
      }).appendTo(tr);
      (0, _renderer.default)('<td>').css({
        textAlign
      }).text(valueText[i + 1]).appendTo(tr);
      table.append(tr);
    }
    container.append(table);
  };
}
function createAxis(isHorizontal) {
  var translator = new _translator2d.Translator2D({}, {}, {
    shiftZeroValue: !isHorizontal,
    isHorizontal: !!isHorizontal
  });
  return {
    getTranslator: function getTranslator() {
      return translator;
    },
    update: function update(range, canvas, options) {
      translator.update(range, canvas, options);
    },
    getVisibleArea() {
      var visibleArea = translator.getCanvasVisibleArea();
      return [visibleArea.min, visibleArea.max];
    },
    visualRange: _common.noop,
    calculateInterval: _common.noop,
    getMarginOptions() {
      return {};
    },
    aggregatedPointBetweenTicks() {
      return false;
    }
  };
}

/* eslint-disable-next-line */
var _initTooltip;
var BaseSparkline = _m_base_widget.default.inherit({
  _getLayoutItems: _common.noop,
  _useLinks: false,
  _themeDependentChanges: ['OPTIONS'],
  _initCore: function _initCore() {
    var that = this;
    that._tooltipTracker = that._renderer.root;
    that._tooltipTracker.attr({
      'pointer-events': 'visible'
    });
    that._createHtmlElements();
    that._initTooltipEvents();
    that._argumentAxis = createAxis(true);
    that._valueAxis = createAxis();
  },
  _getDefaultSize: function _getDefaultSize() {
    return this._defaultSize;
  },
  _disposeCore: function _disposeCore() {
    this._disposeWidgetElements();
    this._disposeTooltipEvents();
    this._ranges = null;
  },
  _optionChangesOrder: ['OPTIONS'],
  _change_OPTIONS: function _change_OPTIONS() {
    this._prepareOptions();
    this._change(['UPDATE']);
  },
  _customChangesOrder: ['UPDATE'],
  _change_UPDATE: function _change_UPDATE() {
    this._update();
  },
  _update: function _update() {
    var that = this;
    if (that._tooltipShown) {
      that._tooltipShown = false;
      that._tooltip.hide();
    }
    that._cleanWidgetElements();
    that._updateWidgetElements();
    that._drawWidgetElements();
  },
  _updateWidgetElements: function _updateWidgetElements() {
    var canvas = this._getCorrectCanvas();
    this._updateRange();
    this._argumentAxis.update(this._ranges.arg, canvas, this._getStick());
    this._valueAxis.update(this._ranges.val, canvas);
  },
  _getStick: function _getStick() {},
  _applySize: function _applySize(rect) {
    this._allOptions.size = {
      width: rect[2] - rect[0],
      height: rect[3] - rect[1]
    };
    this._change(['UPDATE']);
  },
  _setupResizeHandler: _common.noop,
  _prepareOptions: function _prepareOptions() {
    return _extend(true, {}, this._themeManager.theme(), this.option());
  },
  _getTooltipCoords: function _getTooltipCoords() {
    var canvas = this._canvas;
    var rootOffset = this._renderer.getRootOffset();
    return {
      x: canvas.width / 2 + rootOffset.left,
      y: canvas.height / 2 + rootOffset.top
    };
  },
  _initTooltipEvents() {
    var data = {
      widget: this
    };
    this._renderer.root.off('.' + EVENT_NS).on(POINTER_ACTION, data, pointerHandler);
  },
  _showTooltip() {
    var that = this;
    var tooltip;
    if (!that._tooltipShown) {
      that._tooltipShown = true;
      tooltip = that._getTooltip();
      tooltip.isEnabled() && that._tooltip.show(that._getTooltipData(), that._getTooltipCoords(), {});
    }
  },
  _hideTooltip() {
    if (this._tooltipShown) {
      this._tooltipShown = false;
      this._tooltip.hide();
    }
  },
  _stopCurrentHandling() {
    this._hideTooltip();
  },
  _enableOutHandler() {
    var that = this;
    if (that._outHandler) {
      return;
    }
    var handler = function handler(_ref5) {
      var pageX = _ref5.pageX,
        pageY = _ref5.pageY;
      var _that$_renderer$getRo = that._renderer.getRootOffset(),
        left = _that$_renderer$getRo.left,
        top = _that$_renderer$getRo.top;
      var x = _floor(pageX - left);
      var y = _floor(pageY - top);
      if (!inCanvas(that._canvas, x, y)) {
        that._hideTooltip();
        that._disableOutHandler();
      }
    };
    _events_engine.default.on(_dom_adapter.default.getDocument(), POINTER_ACTION, handler);
    this._outHandler = handler;
  },
  _disableOutHandler() {
    this._outHandler && _events_engine.default.off(_dom_adapter.default.getDocument(), POINTER_ACTION, this._outHandler);
    this._outHandler = null;
  },
  _disposeTooltipEvents: function _disposeTooltipEvents() {
    this._tooltipTracker.off();
    this._disableOutHandler();
    this._renderer.root.off('.' + EVENT_NS);
  },
  _getTooltip: function _getTooltip() {
    var that = this;
    if (!that._tooltip) {
      _initTooltip.apply(this, arguments);
      that._setTooltipRendererOptions(that._tooltipRendererOptions);
      that._tooltipRendererOptions = null;
      that._setTooltipOptions();
    }
    return that._tooltip;
  }
});
var _default = BaseSparkline; // PLUGINS_SECTION
exports.default = _default;
BaseSparkline.addPlugin(_tooltip.plugin);

// These are sparklines specifics on using tooltip - they cannot be omitted because of tooltip laziness.
_initTooltip = BaseSparkline.prototype._initTooltip;
BaseSparkline.prototype._initTooltip = _common.noop;
var _disposeTooltip = BaseSparkline.prototype._disposeTooltip;
BaseSparkline.prototype._disposeTooltip = function () {
  if (this._tooltip) {
    _disposeTooltip.apply(this, arguments);
  }
};
BaseSparkline.prototype._setTooltipRendererOptions = function () {
  var options = this._getRendererOptions();
  if (this._tooltip) {
    this._tooltip.setRendererOptions(options);
  } else {
    this._tooltipRendererOptions = options;
  }
};
BaseSparkline.prototype._setTooltipOptions = function () {
  if (this._tooltip) {
    var options = this._getOption('tooltip');
    var defaultContentTemplate = this._getDefaultTooltipTemplate(options);
    var contentTemplateOptions = defaultContentTemplate ? {
      contentTemplate: defaultContentTemplate
    } : {};
    var optionsToUpdate = _extend(contentTemplateOptions, options, {
      enabled: options.enabled && this._isTooltipEnabled()
    });
    this._tooltip.update(optionsToUpdate);
  }
};
BaseSparkline.prototype._getDefaultTooltipTemplate = function (options) {
  var defaultTemplateNeeded = true;
  var textAlign = this.option('rtlEnabled') ? 'left' : 'right';
  if ((0, _type.isFunction)(options.customizeTooltip)) {
    var _options$customizeToo;
    this._tooltip.update(options);
    var formatObject = this._getTooltipData();
    var customizeResult = (_options$customizeToo = options.customizeTooltip.call(formatObject, formatObject)) !== null && _options$customizeToo !== void 0 ? _options$customizeToo : {};
    defaultTemplateNeeded = !('html' in customizeResult) && !('text' in customizeResult);
  }
  return defaultTemplateNeeded && getDefaultTemplate(options.font, textAlign);
};

// PLUGINS_SECTION
// T422022
var exportPlugin = (0, _extend2.extend)(true, {}, _export.plugin, {
  init: _common.noop,
  dispose: _common.noop,
  customize: null,
  members: {
    _getExportMenuOptions: null
  }
});
BaseSparkline.addPlugin(exportPlugin);
module.exports = exports.default;
module.exports.default = exports.default;