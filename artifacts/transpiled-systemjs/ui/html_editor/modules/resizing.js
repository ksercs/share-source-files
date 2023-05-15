!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/html_editor/modules/resizing.js"], ["../../../core/renderer","../../../events/core/events_engine","../../../events/click","../../../events/utils/index","../../../animation/translator","../../../core/devices","../../resizable","../../../core/utils/position","devextreme-quill","./base","../../../core/utils/size"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/html_editor/modules/resizing.js", ["../../../core/renderer", "../../../events/core/events_engine", "../../../events/click", "../../../events/utils/index", "../../../animation/translator", "../../../core/devices", "../../resizable", "../../../core/utils/position", "devextreme-quill", "./base", "../../../core/utils/size"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _click = $__require("../../../events/click");
  var _index = $__require("../../../events/utils/index");
  var _translator = $__require("../../../animation/translator");
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _resizable = _interopRequireDefault($__require("../../resizable"));
  var _position = $__require("../../../core/utils/position");
  var _devextremeQuill = _interopRequireDefault($__require("devextreme-quill"));
  var _base = _interopRequireDefault($__require("./base"));
  var _size = $__require("../../../core/utils/size");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DX_RESIZE_FRAME_CLASS = 'dx-resize-frame';
  var DX_TOUCH_DEVICE_CLASS = 'dx-touch-device';
  var MODULE_NAMESPACE = 'dxHtmlResizingModule';
  var KEYDOWN_EVENT = (0, _index.addNamespace)('keydown', MODULE_NAMESPACE);
  var SCROLL_EVENT = (0, _index.addNamespace)('scroll', MODULE_NAMESPACE);
  var MOUSEDOWN_EVENT = (0, _index.addNamespace)('mousedown', MODULE_NAMESPACE);
  var FRAME_PADDING = 1;
  var ResizingModule = /*#__PURE__*/function (_BaseModule) {
    _inheritsLoose(ResizingModule, _BaseModule);
    function ResizingModule(quill, options) {
      var _this;
      _this = _BaseModule.call(this, quill, options) || this;
      _this.allowedTargets = options.allowedTargets || ['image'];
      _this.enabled = !!options.enabled;
      _this._hideFrameWithContext = _this.hideFrame.bind(_assertThisInitialized(_this));
      _this._framePositionChangedHandler = _this._prepareFramePositionChangedHandler();
      if (_this.enabled) {
        _this._attachEvents();
        _this._createResizeFrame();
      }
      return _this;
    }
    var _proto = ResizingModule.prototype;
    _proto._attachEvents = function _attachEvents() {
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)(_click.name, MODULE_NAMESPACE), this._clickHandler.bind(this));
      _events_engine.default.on(this.quill.root, SCROLL_EVENT, this._framePositionChangedHandler);
      this.editorInstance.on('focusOut', this._hideFrameWithContext);
      this.quill.on('text-change', this._framePositionChangedHandler);
    };
    _proto._detachEvents = function _detachEvents() {
      _events_engine.default.off(this.quill.root, MODULE_NAMESPACE);
      this.editorInstance.off('focusOut', this._hideFrameWithContext);
      this.quill.off('text-change', this._framePositionChangedHandler);
    };
    _proto._clickHandler = function _clickHandler(e) {
      if (this._isAllowedTarget(e.target)) {
        if (this._$target === e.target) {
          return;
        }
        this._$target = e.target;
        var $target = (0, _renderer.default)(this._$target);
        var minWidth = Math.max((0, _size.getOuterWidth)($target) - (0, _size.getWidth)($target), this.resizable.option('minWidth'));
        var minHeight = Math.max((0, _size.getOuterHeight)($target) - (0, _size.getHeight)($target), this.resizable.option('minHeight'));
        this.resizable.option({
          minWidth: minWidth,
          minHeight: minHeight
        });
        this.updateFramePosition();
        this.showFrame();
        this._adjustSelection();
      } else if (this._$target) {
        this.hideFrame();
      }
    };
    _proto._prepareFramePositionChangedHandler = function _prepareFramePositionChangedHandler(e) {
      var _this2 = this;
      return function () {
        if (_this2._$target) {
          _this2.updateFramePosition();
        }
      };
    };
    _proto._adjustSelection = function _adjustSelection() {
      if (!this.quill.getSelection()) {
        this.quill.setSelection(0, 0);
      }
    };
    _proto._isAllowedTarget = function _isAllowedTarget(targetElement) {
      return this._isImage(targetElement);
    };
    _proto._isImage = function _isImage(targetElement) {
      return this.allowedTargets.indexOf('image') !== -1 && targetElement.tagName.toUpperCase() === 'IMG';
    };
    _proto.showFrame = function showFrame() {
      this._$resizeFrame.show();
      _events_engine.default.on(this.quill.root, KEYDOWN_EVENT, this._handleFrameKeyDown.bind(this));
    };
    _proto._handleFrameKeyDown = function _handleFrameKeyDown(e) {
      var keyName = (0, _index.normalizeKeyName)(e);
      if (keyName === 'del' || keyName === 'backspace') {
        this._deleteImage();
      }
      this.hideFrame();
    };
    _proto.hideFrame = function hideFrame() {
      this._$target = null;
      this._$resizeFrame.hide();
      _events_engine.default.off(this.quill.root, KEYDOWN_EVENT);
    };
    _proto.updateFramePosition = function updateFramePosition() {
      var _getBoundingRect = (0, _position.getBoundingRect)(this._$target),
          height = _getBoundingRect.height,
          width = _getBoundingRect.width,
          targetTop = _getBoundingRect.top,
          targetLeft = _getBoundingRect.left;
      var _getBoundingRect2 = (0, _position.getBoundingRect)(this.quill.root),
          containerTop = _getBoundingRect2.top,
          containerLeft = _getBoundingRect2.left;
      var borderWidth = this._getBorderWidth();
      this._$resizeFrame.css({
        height: height,
        width: width,
        padding: FRAME_PADDING,
        top: targetTop - containerTop - borderWidth - FRAME_PADDING,
        left: targetLeft - containerLeft - borderWidth - FRAME_PADDING
      });
      (0, _translator.move)(this._$resizeFrame, {
        left: 0,
        top: 0
      });
    };
    _proto._getBorderWidth = function _getBorderWidth() {
      return parseInt(this._$resizeFrame.css('borderTopWidth'));
    };
    _proto._createResizeFrame = function _createResizeFrame() {
      var _this3 = this;
      if (this._$resizeFrame) {
        return;
      }
      var _devices$current = _devices.default.current(),
          deviceType = _devices$current.deviceType;
      this._$resizeFrame = (0, _renderer.default)('<div>').addClass(DX_RESIZE_FRAME_CLASS).toggleClass(DX_TOUCH_DEVICE_CLASS, deviceType !== 'desktop').appendTo(this.editorInstance._getQuillContainer()).hide();
      _events_engine.default.on(this._$resizeFrame, MOUSEDOWN_EVENT, function (e) {
        e.preventDefault();
      });
      this.resizable = this.editorInstance._createComponent(this._$resizeFrame, _resizable.default, {
        onResize: function onResize(e) {
          if (!_this3._$target) {
            return;
          }
          (0, _renderer.default)(_this3._$target).attr({
            height: e.height,
            width: e.width
          });
          _this3.updateFramePosition();
        }
      });
    };
    _proto._deleteImage = function _deleteImage() {
      if (this._isAllowedTarget(this._$target)) {
        var _Quill$find;
        (_Quill$find = _devextremeQuill.default.find(this._$target)) === null || _Quill$find === void 0 ? void 0 : _Quill$find.deleteAt(0);
      }
    };
    _proto.option = function option(_option, value) {
      if (_option === 'mediaResizing') {
        this.handleOptionChangeValue(value);
        return;
      }
      if (_option === 'enabled') {
        this.enabled = value;
        value ? this._attachEvents() : this._detachEvents();
      } else if (_option === 'allowedTargets' && Array.isArray(value)) {
        this.allowedTargets = value;
      }
    };
    _proto.clean = function clean() {
      this._detachEvents();
      this._$resizeFrame.remove();
      this._$resizeFrame = undefined;
    };
    return ResizingModule;
  }(_base.default);
  exports.default = ResizingModule;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../events/core/events_engine","../../../events/click","../../../events/utils/index","../../../animation/translator","../../../core/devices","../../resizable","../../../core/utils/position","devextreme-quill","./base","../../../core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../events/core/events_engine"), require("../../../events/click"), require("../../../events/utils/index"), require("../../../animation/translator"), require("../../../core/devices"), require("../../resizable"), require("../../../core/utils/position"), require("devextreme-quill"), require("./base"), require("../../../core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizing.js.map