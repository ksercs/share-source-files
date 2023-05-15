!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/tooltip.js"], ["../../core/utils/size","../../core/dom_adapter","../../core/utils/window","../../core/utils/dom","../../core/utils/inflector","../../core/renderer","./renderers/renderer","../../core/utils/type","../../core/utils/extend","./utils","../../format_helper","./plaque"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/tooltip.js", ["../../core/utils/size", "../../core/dom_adapter", "../../core/utils/window", "../../core/utils/dom", "../../core/utils/inflector", "../../core/renderer", "./renderers/renderer", "../../core/utils/type", "../../core/utils/extend", "./utils", "../../format_helper", "./plaque"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.plugin = exports.Tooltip = exports.DEBUG_set_tooltip = void 0;
  var _size = $__require("../../core/utils/size");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _window = $__require("../../core/utils/window");
  var _dom = $__require("../../core/utils/dom");
  var _inflector = $__require("../../core/utils/inflector");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _renderer2 = $__require("./renderers/renderer");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _utils = $__require("./utils");
  var _format_helper = _interopRequireDefault($__require("../../format_helper"));
  var _plaque = $__require("./plaque");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var format = _format_helper.default.format;
  var mathCeil = Math.ceil;
  var mathMax = Math.max;
  var mathMin = Math.min;
  var window = (0, _window.getWindow)();
  var DEFAULT_HTML_GROUP_WIDTH = 3000;
  function hideElement($element) {
    $element.css({
      left: '-9999px'
    }).detach();
  }
  function getSpecialFormatOptions(options, specialFormat) {
    var result = options;
    switch (specialFormat) {
      case 'argument':
        result = {
          format: options.argumentFormat
        };
        break;
      case 'percent':
        result = {
          format: {
            type: 'percent',
            precision: options.format && options.format.percentPrecision
          }
        };
        break;
    }
    return result;
  }
  function createTextHtml() {
    return (0, _renderer.default)('<div>').css({
      position: 'relative',
      display: 'inline-block',
      padding: 0,
      margin: 0,
      border: '0px solid transparent'
    });
  }
  function removeElements(elements) {
    elements.forEach(function (el) {
      return el.remove();
    });
  }
  var Tooltip = function Tooltip(params) {
    var that = this;
    that._eventTrigger = params.eventTrigger;
    that._widgetRoot = params.widgetRoot;
    that._widget = params.widget;
    that._textHtmlContainers = []; // T1015148

    that._wrapper = (0, _renderer.default)('<div>').css({
      position: 'absolute',
      overflow: 'hidden',
      'pointerEvents': 'none'
    }) // T265557, T447623
    .addClass(params.cssClass);
    var renderer = that._renderer = new _renderer2.Renderer({
      pathModified: params.pathModified,
      container: that._wrapper[0]
    });
    var root = renderer.root;
    root.attr({
      'pointer-events': 'none'
    });

    // svg text
    that._text = renderer.text(undefined, 0, 0);

    // html text
    that._textGroupHtml = (0, _renderer.default)('<div>').css({
      position: 'absolute',
      padding: 0,
      margin: 0,
      border: '0px solid transparent'
    }).appendTo(that._wrapper);
    that._textHtml = createTextHtml().appendTo(that._textGroupHtml);
  };
  exports.Tooltip = Tooltip;
  Tooltip.prototype = {
    constructor: Tooltip,
    dispose: function dispose() {
      this._wrapper.remove();
      this._renderer.dispose();
      this._options = this._widgetRoot = null;
    },
    _getContainer: function _getContainer() {
      var options = this._options;
      var container = (0, _renderer.default)(this._widgetRoot).closest(options.container);
      if (container.length === 0) {
        container = (0, _renderer.default)(options.container);
      }
      return (container.length ? container : (0, _renderer.default)('body')).get(0);
    },
    setTemplate: function setTemplate(contentTemplate) {
      var that = this;
      that._template = contentTemplate ? that._widget._getTemplate(contentTemplate) : null;
    },
    setOptions: function setOptions(options) {
      var _this = this;
      options = options || {};
      var that = this;
      that._options = options;
      that._textFontStyles = (0, _utils.patchFontOptions)(options.font);
      that._textFontStyles.color = that._textFontStyles.fill;
      that._wrapper.css({
        'zIndex': options.zIndex
      });
      that._customizeTooltip = options.customizeTooltip;
      var textGroupHtml = that._textGroupHtml;
      if (this.plaque) {
        this.plaque.clear();
      }
      this.setTemplate(options.contentTemplate);
      var pointerEvents = options.interactive ? 'auto' : 'none';
      if (options.interactive) {
        this._renderer.root.css({
          '-ms-user-select': 'auto',
          '-moz-user-select': 'auto',
          '-webkit-user-select': 'auto'
        });
      }
      var drawTooltip = function drawTooltip(_ref) {
        var group = _ref.group,
            onRender = _ref.onRender,
            eventData = _ref.eventData,
            isMoving = _ref.isMoving,
            _ref$templateCallback = _ref.templateCallback,
            templateCallback = _ref$templateCallback === void 0 ? function () {} : _ref$templateCallback;
        var state = that._state;
        if (!isMoving) {
          var template = that._template;
          var useTemplate = template && !state.formatObject.skipTemplate;
          if (state.html || useTemplate) {
            textGroupHtml.css({
              color: state.textColor,
              width: DEFAULT_HTML_GROUP_WIDTH,
              'pointerEvents': pointerEvents
            });
            if (useTemplate) {
              var htmlContainers = that._textHtmlContainers;
              var containerToTemplateRender = createTextHtml().appendTo(that._textGroupHtml);
              htmlContainers.push(containerToTemplateRender);
              template.render({
                model: state.formatObject,
                container: containerToTemplateRender,
                onRendered: function onRendered() {
                  removeElements(htmlContainers.splice(0, htmlContainers.length - 1));
                  that._textHtml = (0, _dom.replaceWith)(that._textHtml, containerToTemplateRender);
                  state.html = that._textHtml.html();
                  if ((0, _size.getWidth)(that._textHtml) === 0 && (0, _size.getHeight)(that._textHtml) === 0) {
                    _this.plaque.clear();
                    templateCallback(false);
                    return;
                  }
                  onRender();
                  that._riseEvents(eventData);
                  that._moveWrapper();
                  that.plaque.customizeCloud({
                    fill: state.color,
                    stroke: state.borderColor,
                    'pointer-events': pointerEvents
                  });
                  templateCallback(true);
                  that._textHtmlContainers = [];
                }
              });
              return;
            } else {
              that._text.attr({
                text: ''
              });
              that._textHtml.html(state.html);
            }
          } else {
            that._text.css({
              fill: state.textColor
            }).attr({
              text: state.text,
              class: options.cssClass,
              'pointer-events': pointerEvents
            }).append(group.attr({
              align: options.textAlignment
            }));
          }
          that._riseEvents(eventData);
          that.plaque.customizeCloud({
            fill: state.color,
            stroke: state.borderColor,
            'pointer-events': pointerEvents
          });
        }
        onRender();
        that._moveWrapper();
        return true;
      };
      this.plaque = new _plaque.Plaque({
        opacity: that._options.opacity,
        color: that._options.color,
        border: that._options.border,
        paddingLeftRight: that._options.paddingLeftRight,
        paddingTopBottom: that._options.paddingTopBottom,
        arrowLength: that._options.arrowLength,
        arrowWidth: 20,
        shadow: that._options.shadow,
        cornerRadius: that._options.cornerRadius
      }, that, that._renderer.root, drawTooltip, true, function (tooltip, g) {
        var state = tooltip._state;
        if (state.html) {
          var bBox = window.getComputedStyle(that._textHtml.get(0));
          bBox = {
            x: 0,
            y: 0,
            width: mathCeil(parseFloat(bBox.width)),
            height: mathCeil(parseFloat(bBox.height))
          };
          return bBox;
        }
        return g.getBBox();
      }, function (tooltip, g, x, y) {
        var state = tooltip._state;
        if (state.html) {
          that._textGroupHtml.css({
            left: x,
            top: y
          });
        } else {
          g.move(x, y);
        }
      });
      return that;
    },
    _riseEvents: function _riseEvents(eventData) {
      // trigger event
      // The *onTooltipHidden* is triggered outside the *hide* method because of the cases when *show* is called to determine if tooltip will be visible or not (when target is changed) -
      // *hide* can neither be called before that *show* - because if tooltip is determined to hide it requires some timeout before actually hiding
      // nor after that *show* - because it is either too early to hide (because of timeout) or wrong (because tooltip has already been shown for new target)
      // It is only inside the *show* where it is known weather *onTooltipHidden* is required or not
      // This functionality can be simplified when we get rid of timeouts for tooltip
      var that = this;
      that._eventData && that._eventTrigger('tooltipHidden', that._eventData);
      that._eventData = eventData;
      that._eventTrigger('tooltipShown', that._eventData);
    },
    setRendererOptions: function setRendererOptions(options) {
      this._renderer.setOptions(options);
      this._textGroupHtml.css({
        direction: options.rtl ? 'rtl' : 'ltr'
      });
      return this;
    },
    update: function update(options) {
      var that = this;
      that.setOptions(options);

      // The following is because after update (on widget refresh) tooltip must be hidden
      hideElement(that._wrapper);

      // text area
      var normalizedCSS = {};
      for (var name in that._textFontStyles) {
        normalizedCSS[(0, _inflector.camelize)(name)] = that._textFontStyles[name];
      }
      that._textGroupHtml.css(normalizedCSS);
      that._text.css(that._textFontStyles);
      that._eventData = null;
      return that;
    },
    _prepare: function _prepare(formatObject, state) {
      var customizeTooltip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._customizeTooltip;
      var options = this._options;
      var customize = {};
      if ((0, _type.isFunction)(customizeTooltip)) {
        customize = customizeTooltip.call(formatObject, formatObject);
        customize = (0, _type.isPlainObject)(customize) ? customize : {};
        if ('text' in customize) {
          state.text = (0, _type.isDefined)(customize.text) ? String(customize.text) : '';
        }
        if ('html' in customize) {
          state.html = (0, _type.isDefined)(customize.html) ? String(customize.html) : '';
        }
      }
      if (!('text' in state) && !('html' in state)) {
        state.text = formatObject.valueText || formatObject.description || '';
      }
      state.color = customize.color || options.color;
      state.borderColor = customize.borderColor || (options.border || {}).color;
      state.textColor = customize.fontColor || (this._textFontStyles || {}).color;
      return !!state.text || !!state.html || !!this._template;
    },
    show: function show(formatObject, params, eventData, customizeTooltip, templateCallback) {
      var that = this;
      if (that._options.forceEvents) {
        // for Blazor charts
        eventData.x = params.x;
        eventData.y = params.y - params.offset;
        that._riseEvents(eventData);
        return true;
      }
      var state = {
        formatObject: formatObject,
        eventData: eventData,
        templateCallback: templateCallback
      };
      if (!that._prepare(formatObject, state, customizeTooltip)) {
        return false;
      }
      that._state = state;
      that._wrapper.appendTo(that._getContainer());
      that._clear();
      var parameters = (0, _extend.extend)({}, that._options, {
        canvas: that._getCanvas()
      }, state, {
        x: params.x,
        y: params.y,
        offset: params.offset
      });
      return this.plaque.clear().draw(parameters);
    },
    isCursorOnTooltip: function isCursorOnTooltip(x, y) {
      if (this._options.interactive) {
        var box = this.plaque.getBBox();
        return x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height;
      }
      return false;
    },
    hide: function hide(isPointerOut) {
      var that = this;
      hideElement(that._wrapper);
      // trigger event
      if (that._eventData) {
        that._eventTrigger('tooltipHidden', that._options.forceEvents ? (0, _extend.extend)({
          isPointerOut: isPointerOut
        }, that._eventData) : that._eventData);
        that._clear();
        that._eventData = null;
      }
    },
    _clear: function _clear() {
      this._textHtml.empty();
    },
    move: function move(x, y, offset) {
      this.plaque.draw({
        x: x,
        y: y,
        offset: offset,
        canvas: this._getCanvas(),
        isMoving: true
      });
    },
    _moveWrapper: function _moveWrapper() {
      var that = this;
      var plaqueBBox = this.plaque.getBBox();
      that._renderer.resize(plaqueBBox.width, plaqueBBox.height);

      // move wrapper
      var offset = that._wrapper.css({
        left: 0,
        top: 0
      }).offset();
      var left = plaqueBBox.x;
      var top = plaqueBBox.y;
      that._wrapper.css({
        left: left - offset.left,
        top: top - offset.top
      });
      this.plaque.moveRoot(-left, -top);
      if (this._state.html) {
        that._textHtml.css({
          left: -left,
          top: -top
        });
        that._textGroupHtml.css({
          width: mathCeil((0, _size.getWidth)(that._textHtml))
        });
      }
    },
    formatValue: function formatValue(value, _specialFormat) {
      var options = _specialFormat ? getSpecialFormatOptions(this._options, _specialFormat) : this._options;
      return format(value, options.format);
    },
    getOptions: function getOptions() {
      return this._options;
    },
    getLocation: function getLocation() {
      return (0, _utils.normalizeEnum)(this._options.location);
    },
    isEnabled: function isEnabled() {
      return !!this._options.enabled || !!this._options.forceEvents; // for Blazor charts
    },

    isShared: function isShared() {
      return !!this._options.shared;
    },
    _getCanvas: function _getCanvas() {
      var container = this._getContainer();
      var containerBox = container.getBoundingClientRect();
      var html = _dom_adapter.default.getDocumentElement();
      var document = _dom_adapter.default.getDocument();
      var left = window.pageXOffset || html.scrollLeft || 0;
      var top = window.pageYOffset || html.scrollTop || 0;
      var box = {
        left: left,
        top: top,
        width: mathMax(html.clientWidth, document.body.clientWidth) + left,
        height: mathMax(document.body.scrollHeight, html.scrollHeight, document.body.offsetHeight, html.offsetHeight, document.body.clientHeight, html.clientHeight),
        right: 0,
        bottom: 0
      };
      if (container !== _dom_adapter.default.getBody()) {
        left = mathMax(box.left, box.left + containerBox.left);
        top = mathMax(box.top, box.top + containerBox.top);
        box.width = mathMin(containerBox.width, box.width) + left + box.left;
        box.height = mathMin(containerBox.height, box.height) + top + box.top;
        box.left = left;
        box.top = top;
      }
      return box;
    }
  };
  var plugin = {
    name: 'tooltip',
    init: function init() {
      this._initTooltip();
    },
    dispose: function dispose() {
      this._disposeTooltip();
    },
    members: {
      // The method exists only to be overridden in sparklines.
      _initTooltip: function _initTooltip() {
        // "exports" is used for testing purposes.
        this._tooltip = new Tooltip({
          cssClass: this._rootClassPrefix + '-tooltip',
          eventTrigger: this._eventTrigger,
          pathModified: this.option('pathModified'),
          widgetRoot: this.element(),
          widget: this
        });
      },
      // The method exists only to be overridden in sparklines.
      _disposeTooltip: function _disposeTooltip() {
        this._tooltip.dispose();
        this._tooltip = null;
      },
      // The method exists only to be overridden in sparklines.
      _setTooltipRendererOptions: function _setTooltipRendererOptions() {
        this._tooltip.setRendererOptions(this._getRendererOptions());
      },
      // The method exists only to be overridden in sparklines and gauges.
      _setTooltipOptions: function _setTooltipOptions() {
        this._tooltip.update(this._getOption('tooltip'));
      }
    },
    extenders: {
      _stopCurrentHandling: function _stopCurrentHandling() {
        this._tooltip && this._tooltip.hide();
      }
    },
    customize: function customize(constructor) {
      var proto = constructor.prototype;
      proto._eventsMap.onTooltipShown = {
        name: 'tooltipShown'
      };
      proto._eventsMap.onTooltipHidden = {
        name: 'tooltipHidden'
      };
      constructor.addChange({
        code: 'TOOLTIP_RENDERER',
        handler: function handler() {
          this._setTooltipRendererOptions();
        },
        isThemeDependent: true,
        isOptionChange: true
      });
      constructor.addChange({
        code: 'TOOLTIP',
        handler: function handler() {
          this._setTooltipOptions();
        },
        isThemeDependent: true,
        isOptionChange: true,
        option: 'tooltip'
      });
    },
    fontFields: ['tooltip.font']
  };

  ///#DEBUG
  exports.plugin = plugin;
  var DEBUG_set_tooltip = function DEBUG_set_tooltip(value) {
    exports.Tooltip = Tooltip = value;
  };
  ///#ENDDEBUG
  exports.DEBUG_set_tooltip = DEBUG_set_tooltip;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/dom_adapter","../../core/utils/window","../../core/utils/dom","../../core/utils/inflector","../../core/renderer","./renderers/renderer","../../core/utils/type","../../core/utils/extend","./utils","../../format_helper","./plaque"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/dom_adapter"), require("../../core/utils/window"), require("../../core/utils/dom"), require("../../core/utils/inflector"), require("../../core/renderer"), require("./renderers/renderer"), require("../../core/utils/type"), require("../../core/utils/extend"), require("./utils"), require("../../format_helper"), require("./plaque"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tooltip.js.map