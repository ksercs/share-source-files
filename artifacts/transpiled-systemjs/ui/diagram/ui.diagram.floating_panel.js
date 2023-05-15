!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/diagram/ui.diagram.floating_panel.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/window","../popup/ui.popup","./ui.diagram.panel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/diagram/ui.diagram.floating_panel.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/window", "../popup/ui.popup", "./ui.diagram.panel"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _window = $__require("../../core/utils/window");
  var _ui = _interopRequireDefault($__require("../popup/ui.popup"));
  var _uiDiagram = _interopRequireDefault($__require("./ui.diagram.panel"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DIAGRAM_MOBILE_POPUP_CLASS = 'dx-diagram-mobile-popup';
  var DiagramFloatingPanel = /*#__PURE__*/function (_DiagramPanel) {
    _inheritsLoose(DiagramFloatingPanel, _DiagramPanel);
    function DiagramFloatingPanel() {
      return _DiagramPanel.apply(this, arguments) || this;
    }
    var _proto = DiagramFloatingPanel.prototype;
    _proto._init = function _init() {
      _DiagramPanel.prototype._init.call(this);
      this._createOnVisibilityChangingAction();
      this._createOnVisibilityChangedAction();
    };
    _proto.isVisible = function isVisible() {
      return this.option('isVisible');
    };
    _proto.isMobileView = function isMobileView() {
      return this.option('isMobileView');
    };
    _proto._initMarkup = function _initMarkup() {
      _DiagramPanel.prototype._initMarkup.call(this);
      var $parent = this.$element();
      var $popupElement = (0, _renderer.default)('<div>').addClass(this._getPopupClass()).addClass(this.isMobileView() && DIAGRAM_MOBILE_POPUP_CLASS).appendTo($parent);
      this._popup = this._createComponent($popupElement, _ui.default, this._getPopupOptions());
      this._updatePopupVisible();
    };
    _proto.show = function show() {
      this.option('isVisible', true);
    };
    _proto.hide = function hide() {
      this.option('isVisible', false);
    };
    _proto.toggle = function toggle() {
      this.option('isVisible', !this.isVisible());
    };
    _proto.repaint = function repaint() {
      this._popup.repaint();
    };
    _proto._getPopupContent = function _getPopupContent() {
      return this._popup.content();
    };
    _proto._getPopupTitle = function _getPopupTitle() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return $content.parent().find('.dx-popup-title');
    };
    _proto._getPointerUpElements = function _getPointerUpElements() {
      return [this._getPopupContent(), this._getPopupTitle()];
    };
    _proto._getVerticalPaddingsAndBorders = function _getVerticalPaddingsAndBorders() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return (0, _size.getOuterHeight)($content) - (0, _size.getHeight)($content);
    };
    _proto._getHorizontalPaddingsAndBorders = function _getHorizontalPaddingsAndBorders() {
      var $content = (0, _renderer.default)(this._getPopupContent());
      return (0, _size.getOuterWidth)($content) - (0, _size.getWidth)($content);
    };
    _proto._getPopupClass = function _getPopupClass() {
      return '';
    };
    _proto._getPopupWidth = function _getPopupWidth() {
      return this.option('width') || 'auto';
    };
    _proto._getPopupMaxWidth = function _getPopupMaxWidth() {
      return this.option('maxWidth');
    };
    _proto._getPopupMinWidth = function _getPopupMinWidth() {
      return this.option('minWidth');
    };
    _proto._getPopupHeight = function _getPopupHeight() {
      return this.option('height') || 'auto';
    };
    _proto._getPopupMaxHeight = function _getPopupMaxHeight() {
      return this.option('maxHeight');
    };
    _proto._getPopupMinHeight = function _getPopupMinHeight() {
      return this.option('minHeight');
    };
    _proto._getPopupPosition = function _getPopupPosition() {
      return {};
    };
    _proto._getPopupContainer = function _getPopupContainer() {
      return this.option('container');
    };
    _proto._getPopupSlideAnimationObject = function _getPopupSlideAnimationObject(properties) {
      return (0, _extend.extend)({
        type: 'slide',
        start: function start() {
          (0, _renderer.default)('body').css('overflow', 'hidden');
        },
        complete: function complete() {
          (0, _renderer.default)('body').css('overflow', '');
        }
      }, properties);
    };
    _proto._getPopupAnimation = function _getPopupAnimation() {
      return {
        hide: {
          type: 'fadeOut'
        },
        show: {
          type: 'fadeIn'
        }
      };
    };
    _proto._getPopupOptions = function _getPopupOptions() {
      var _this = this;
      var that = this;
      return {
        animation: (0, _window.hasWindow)() ? this._getPopupAnimation() : null,
        shading: false,
        showTitle: false,
        focusStateEnabled: false,
        container: this._getPopupContainer(),
        width: this._getPopupWidth(),
        height: this._getPopupHeight(),
        maxWidth: this._getPopupMaxWidth(),
        maxHeight: this._getPopupMaxHeight(),
        minWidth: this._getPopupMinWidth(),
        minHeight: this._getPopupMinHeight(),
        position: this._getPopupPosition(),
        showCloseButton: true,
        copyRootClassesToWrapper: true,
        _ignoreCopyRootClassesToWrapperDeprecation: true,
        onContentReady: function onContentReady() {
          that._renderPopupContent(that._popup.content());
        },
        onShowing: function onShowing() {
          _this._onVisibilityChangingAction({
            visible: true,
            component: _this
          });
        },
        onShown: function onShown() {
          _this.option('isVisible', true);
          _this._onVisibilityChangedAction({
            visible: true,
            component: _this
          });
        },
        onHiding: function onHiding() {
          _this._onVisibilityChangingAction({
            visible: false,
            component: _this
          });
        },
        onHidden: function onHidden() {
          _this.option('isVisible', false);
          _this._onVisibilityChangedAction({
            visible: false,
            component: _this
          });
        }
      };
    };
    _proto._renderPopupContent = function _renderPopupContent($parent) {};
    _proto._updatePopupVisible = function _updatePopupVisible() {
      this._popup.option('visible', this.isVisible());
    };
    _proto._createOnVisibilityChangingAction = function _createOnVisibilityChangingAction() {
      this._onVisibilityChangingAction = this._createActionByOption('onVisibilityChanging');
    };
    _proto._createOnVisibilityChangedAction = function _createOnVisibilityChangedAction() {
      this._onVisibilityChangedAction = this._createActionByOption('onVisibilityChanged');
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'onVisibilityChanging':
          this._createOnVisibilityChangingAction();
          break;
        case 'onVisibilityChanged':
          this._createOnVisibilityChangedAction();
          break;
        case 'container':
          this._popup.option('container', this._getPopupContainer());
          break;
        case 'width':
          this._popup.option('width', this._getPopupWidth());
          break;
        case 'height':
          this._popup.option('height', this._getPopupHeight());
          break;
        case 'maxWidth':
          this._popup.option('maxWidth', this._getPopupMaxWidth());
          break;
        case 'maxHeight':
          this._popup.option('maxHeight', this._getPopupMaxHeight());
          break;
        case 'minWidth':
          this._popup.option('minWidth', this._getPopupMinWidth());
          break;
        case 'minHeight':
          this._popup.option('minHeight', this._getPopupMinHeight());
          break;
        case 'isMobileView':
          this._invalidate();
          break;
        case 'isVisible':
          this._updatePopupVisible();
          break;
        default:
          _DiagramPanel.prototype._optionChanged.call(this, args);
      }
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_DiagramPanel.prototype._getDefaultOptions.call(this), {
        isVisible: true,
        isMobileView: false,
        offsetX: 0,
        offsetY: 0
      });
    };
    return DiagramFloatingPanel;
  }(_uiDiagram.default);
  var _default = DiagramFloatingPanel;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/window","../popup/ui.popup","./ui.diagram.panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/window"), require("../popup/ui.popup"), require("./ui.diagram.panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.diagram.floating_panel.js.map