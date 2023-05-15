!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/sparklines/base_sparkline.js"], ["../../events/core/events_engine","../../core/dom_adapter","../../core/utils/type","../core/base_widget","../../core/utils/extend","../../events/utils/index","../../events/pointer","../core/utils","../../core/renderer","../translators/translator2d","../../core/utils/common","../core/tooltip","../core/export"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/sparklines/base_sparkline.js", ["../../events/core/events_engine", "../../core/dom_adapter", "../../core/utils/type", "../core/base_widget", "../../core/utils/extend", "../../events/utils/index", "../../events/pointer", "../core/utils", "../../core/renderer", "../translators/translator2d", "../../core/utils/common", "../core/tooltip", "../core/export"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _type = $__require("../../core/utils/type");
  var _base_widget = _interopRequireDefault($__require("../core/base_widget"));
  var _extend2 = $__require("../../core/utils/extend");
  var _index = $__require("../../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _utils = $__require("../core/utils");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _translator2d = $__require("../translators/translator2d");
  var _common = $__require("../../core/utils/common");
  var _tooltip = $__require("../core/tooltip");
  var _export = $__require("../core/export");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
      width: width,
      height: height
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
        lineHeight: lineHeight
      });
      for (var i = 0; i < valueText.length; i += 2) {
        var tr = (0, _renderer.default)('<tr>');
        (0, _renderer.default)('<td>').text(valueText[i]).appendTo(tr);
        (0, _renderer.default)('<td>').css({
          width: TOOLTIP_TABLE_KEY_VALUE_SPACE
        }).appendTo(tr);
        (0, _renderer.default)('<td>').css({
          textAlign: textAlign
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
      getVisibleArea: function getVisibleArea() {
        var visibleArea = translator.getCanvasVisibleArea();
        return [visibleArea.min, visibleArea.max];
      },
      visualRange: _common.noop,
      calculateInterval: _common.noop,
      getMarginOptions: function getMarginOptions() {
        return {};
      },
      aggregatedPointBetweenTicks: function aggregatedPointBetweenTicks() {
        return false;
      }
    };
  }

  /* eslint-disable-next-line */
  var _initTooltip;
  var BaseSparkline = _base_widget.default.inherit({
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
    _initTooltipEvents: function _initTooltipEvents() {
      var data = {
        widget: this
      };
      this._renderer.root.off('.' + EVENT_NS).on(POINTER_ACTION, data, pointerHandler);
    },
    _showTooltip: function _showTooltip() {
      var that = this;
      var tooltip;
      if (!that._tooltipShown) {
        that._tooltipShown = true;
        tooltip = that._getTooltip();
        tooltip.isEnabled() && that._tooltip.show(that._getTooltipData(), that._getTooltipCoords(), {});
      }
    },
    _hideTooltip: function _hideTooltip() {
      if (this._tooltipShown) {
        this._tooltipShown = false;
        this._tooltip.hide();
      }
    },
    _stopCurrentHandling: function _stopCurrentHandling() {
      this._hideTooltip();
    },
    _enableOutHandler: function _enableOutHandler() {
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
    _disableOutHandler: function _disableOutHandler() {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../core/dom_adapter","../../core/utils/type","../core/base_widget","../../core/utils/extend","../../events/utils/index","../../events/pointer","../core/utils","../../core/renderer","../translators/translator2d","../../core/utils/common","../core/tooltip","../core/export"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../core/dom_adapter"), require("../../core/utils/type"), require("../core/base_widget"), require("../../core/utils/extend"), require("../../events/utils/index"), require("../../events/pointer"), require("../core/utils"), require("../../core/renderer"), require("../translators/translator2d"), require("../../core/utils/common"), require("../core/tooltip"), require("../core/export"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_sparkline.js.map