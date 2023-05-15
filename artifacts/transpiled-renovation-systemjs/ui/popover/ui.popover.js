!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/popover/ui.popover.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/window","../../core/element","../../core/dom_adapter","../../events/core/events_engine","../../core/component_registrator","../../core/utils/extend","../../animation/translator","../../animation/position","../../core/utils/type","../../core/utils/math","../../events/utils/index","../widget/ui.errors","../popup/ui.popup","../../core/utils/position","./popover_position_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/popover/ui.popover.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/window", "../../core/element", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/component_registrator", "../../core/utils/extend", "../../animation/translator", "../../animation/position", "../../core/utils/type", "../../core/utils/math", "../../events/utils/index", "../widget/ui.errors", "../popup/ui.popup", "../../core/utils/position", "./popover_position_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _element = $__require("../../core/element");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _extend = $__require("../../core/utils/extend");
  var _translator = $__require("../../animation/translator");
  var _position = _interopRequireDefault($__require("../../animation/position"));
  var _type = $__require("../../core/utils/type");
  var _math = $__require("../../core/utils/math");
  var _index = $__require("../../events/utils/index");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _ui2 = _interopRequireDefault($__require("../popup/ui.popup"));
  var _position2 = $__require("../../core/utils/position");
  var _popover_position_controller = $__require("./popover_position_controller");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  // STYLE popover

  var POPOVER_CLASS = 'dx-popover';
  var POPOVER_WRAPPER_CLASS = 'dx-popover-wrapper';
  var POPOVER_ARROW_CLASS = 'dx-popover-arrow';
  var POPOVER_WITHOUT_TITLE_CLASS = 'dx-popover-without-title';
  var POSITION_FLIP_MAP = {
    'left': 'right',
    'top': 'bottom',
    'right': 'left',
    'bottom': 'top',
    'center': 'center'
  };
  var getEventNameByOption = function getEventNameByOption(optionValue) {
    return (0, _type.isObject)(optionValue) ? optionValue.name : optionValue;
  };
  var getEventName = function getEventName(that, optionName) {
    var optionValue = that.option(optionName);
    return getEventNameByOption(optionValue);
  };
  var getEventDelay = function getEventDelay(that, optionName) {
    var optionValue = that.option(optionName);
    return (0, _type.isObject)(optionValue) && optionValue.delay;
  };
  var attachEvent = function attachEvent(that, name) {
    var _that$option = that.option(),
        target = _that$option.target,
        shading = _that$option.shading,
        disabled = _that$option.disabled,
        hideEvent = _that$option.hideEvent;
    var isSelector = (0, _type.isString)(target);
    var shouldIgnoreHideEvent = shading && name === 'hide';
    var event = shouldIgnoreHideEvent ? null : getEventName(that, "".concat(name, "Event"));
    if (shouldIgnoreHideEvent && hideEvent) {
      _ui.default.log('W1020');
    }
    if (!event || disabled) {
      return;
    }
    var eventName = (0, _index.addNamespace)(event, that.NAME);
    var action = that._createAction(function () {
      var delay = getEventDelay(that, name + 'Event');
      this._clearEventsTimeouts();
      if (delay) {
        this._timeouts[name] = setTimeout(function () {
          that[name]();
        }, delay);
      } else {
        that[name]();
      }
    }.bind(that), {
      validatingTargetName: 'target'
    });
    var handler = function handler(e) {
      action({
        event: e,
        target: (0, _renderer.default)(e.currentTarget)
      });
    };
    var EVENT_HANDLER_NAME = '_' + name + 'EventHandler';
    if (isSelector) {
      that[EVENT_HANDLER_NAME] = handler;
      _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, target, handler);
    } else {
      var targetElement = (0, _element.getPublicElement)((0, _renderer.default)(target));
      that[EVENT_HANDLER_NAME] = undefined;
      _events_engine.default.on(targetElement, eventName, handler);
    }
  };
  var detachEvent = function detachEvent(that, target, name, event) {
    var eventName = event || getEventName(that, name + 'Event');
    if (!eventName) {
      return;
    }
    eventName = (0, _index.addNamespace)(eventName, that.NAME);
    var EVENT_HANDLER_NAME = '_' + name + 'EventHandler';
    if (that[EVENT_HANDLER_NAME]) {
      _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, target, that[EVENT_HANDLER_NAME]);
    } else {
      _events_engine.default.off((0, _element.getPublicElement)((0, _renderer.default)(target)), eventName);
    }
  };
  var Popover = _ui2.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        target: undefined,
        shading: false,
        position: (0, _extend.extend)({}, _popover_position_controller.POPOVER_POSITION_ALIASES.bottom),
        hideOnOutsideClick: true,
        animation: {
          show: {
            type: 'fade',
            from: 0,
            to: 1
          },
          hide: {
            type: 'fade',
            from: 1,
            to: 0
          }
        },
        showTitle: false,
        width: 'auto',
        height: 'auto',
        /**
         * @name dxPopoverOptions.dragEnabled
         * @hidden
         */
        dragEnabled: false,
        /**
        * @name dxPopoverOptions.dragOutsideBoundary
        * @hidden
        */

        /**
        * @name dxPopoverOptions.dragAndResizeArea
        * @hidden
        */

        /**
        * @name dxPopoverOptions.resizeEnabled
        * @hidden
        */
        resizeEnabled: false,
        /**
        * @name dxPopoverOptions.restorePosition
        * @hidden
        */

        /**
        * @section Utils
        * @type function
        * @default null
        * @type_function_param1 e:object
        * @type_function_param1_field1 component:this
        * @type_function_param1_field2 element:DxElement
        * @type_function_param1_field3 model:object
        * @name dxPopoverOptions.onResizeStart
        * @action
        * @hidden
        */

        /**
        * @section Utils
        * @type function
        * @default null
        * @type_function_param1 e:object
        * @type_function_param1_field1 component:this
        * @type_function_param1_field2 element:DxElement
        * @type_function_param1_field3 model:object
        * @name dxPopoverOptions.onResize
        * @action
        * @hidden
        */

        /**
        * @section Utils
        * @type function
        * @default null
        * @type_function_param1 e:object
        * @type_function_param1_field1 component:this
        * @type_function_param1_field2 element:DxElement
        * @type_function_param1_field3 model:object
        * @name dxPopoverOptions.onResizeEnd
        * @action
        * @hidden
        */

        /**
        * @name dxPopoverOptions.fullScreen
        * @hidden
        */

        fullScreen: false,
        hideOnParentScroll: true,
        arrowPosition: '',
        arrowOffset: 0,
        _fixWrapperPosition: true

        /**
        * @name dxPopoverOptions.focusStateEnabled
        * @hidden
        */

        /**
        * @name dxPopoverOptions.accessKey
        * @hidden
        */

        /**
        * @name dxPopoverOptions.tabIndex
        * @hidden
        */
      });
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return [{
        device: {
          platform: 'ios'
        },
        options: {
          arrowPosition: {
            boundaryOffset: {
              h: 20,
              v: -10
            },
            collision: 'fit'
          }
        }
      }, {
        device: function device() {
          return !(0, _window.hasWindow)();
        },
        options: {
          animation: null
        }
      }];
    },
    _init: function _init() {
      var _this$option;
      this.callBase();
      this._renderArrow();
      this._timeouts = {};
      this.$element().addClass(POPOVER_CLASS);
      this.$wrapper().addClass(POPOVER_WRAPPER_CLASS);
      var isInteractive = (_this$option = this.option('toolbarItems')) === null || _this$option === void 0 ? void 0 : _this$option.length;
      this.setAria('role', isInteractive ? 'dialog' : 'tooltip');
    },
    _render: function _render() {
      this.callBase.apply(this, arguments);
      this._detachEvents(this.option('target'));
      this._attachEvents();
    },
    _detachEvents: function _detachEvents(target) {
      detachEvent(this, target, 'show');
      detachEvent(this, target, 'hide');
    },
    _attachEvents: function _attachEvents() {
      attachEvent(this, 'show');
      attachEvent(this, 'hide');
    },
    _renderArrow: function _renderArrow() {
      this._$arrow = (0, _renderer.default)('<div>').addClass(POPOVER_ARROW_CLASS).prependTo(this.$overlayContent());
    },
    _documentDownHandler: function _documentDownHandler(e) {
      if (this._isOutsideClick(e)) {
        return this.callBase(e);
      }
      return true;
    },
    _isOutsideClick: function _isOutsideClick(e) {
      return !(0, _renderer.default)(e.target).closest(this.option('target')).length;
    },
    _animate: function _animate(animation) {
      if (animation && animation.to && _typeof(animation.to) === 'object') {
        (0, _extend.extend)(animation.to, {
          position: this._getContainerPosition()
        });
      }
      this.callBase.apply(this, arguments);
    },
    _stopAnimation: function _stopAnimation() {
      this.callBase.apply(this, arguments);
    },
    _renderTitle: function _renderTitle() {
      this.$wrapper().toggleClass(POPOVER_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
      this.callBase();
    },
    _renderPosition: function _renderPosition() {
      var shouldUpdateDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.callBase();
      this._renderOverlayPosition(shouldUpdateDimensions);
      this._actions.onPositioned();
    },
    _renderOverlayPosition: function _renderOverlayPosition(shouldUpdateDimensions) {
      this._resetOverlayPosition(shouldUpdateDimensions);
      this._updateContentSize(shouldUpdateDimensions);
      var contentPosition = this._getContainerPosition();
      var resultLocation = _position.default.setup(this.$overlayContent(), contentPosition);
      var positionSide = this._getSideByLocation(resultLocation);
      this._togglePositionClass('dx-position-' + positionSide);
      this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
      var isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
      if (isArrowVisible) {
        this._renderArrowPosition(positionSide);
      }
    },
    _resetOverlayPosition: function _resetOverlayPosition(shouldUpdateDimensions) {
      this._setContentHeight(shouldUpdateDimensions);
      this._togglePositionClass('dx-position-' + this._positionController._positionSide);
      (0, _translator.move)(this.$overlayContent(), {
        left: 0,
        top: 0
      });
      this._$arrow.css({
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto'
      });
    },
    _updateContentSize: function _updateContentSize(shouldUpdateDimensions) {
      if (!this.$content() || !shouldUpdateDimensions) {
        return;
      }
      var containerLocation = _position.default.calculate(this.$overlayContent(), this._getContainerPosition());
      if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
        var newContainerWidth = (0, _size.getWidth)(this.$overlayContent()) - containerLocation.h.oversize;
        (0, _size.setWidth)(this.$overlayContent(), newContainerWidth);
      }
      if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
        var newOverlayContentHeight = (0, _size.getHeight)(this.$overlayContent()) - containerLocation.v.oversize;
        var newPopupContentHeight = (0, _size.getHeight)(this.$content()) - containerLocation.v.oversize;
        (0, _size.setHeight)(this.$overlayContent(), newOverlayContentHeight);
        (0, _size.setHeight)(this.$content(), newPopupContentHeight);
      }
    },
    _getContainerPosition: function _getContainerPosition() {
      return this._positionController._getContainerPosition();
    },
    _hideOnParentScrollTarget: function _hideOnParentScrollTarget() {
      return (0, _renderer.default)(this._positionController._position.of || this.callBase());
    },
    _getSideByLocation: function _getSideByLocation(location) {
      var isFlippedByVertical = location.v.flip;
      var isFlippedByHorizontal = location.h.flip;
      return this._isVerticalSide() && isFlippedByVertical || this._isHorizontalSide() && isFlippedByHorizontal || this._isPopoverInside() ? POSITION_FLIP_MAP[this._positionController._positionSide] : this._positionController._positionSide;
    },
    _togglePositionClass: function _togglePositionClass(positionClass) {
      this.$wrapper().removeClass('dx-position-left dx-position-right dx-position-top dx-position-bottom').addClass(positionClass);
    },
    _toggleFlippedClass: function _toggleFlippedClass(isFlippedHorizontal, isFlippedVertical) {
      this.$wrapper().toggleClass('dx-popover-flipped-horizontal', isFlippedHorizontal).toggleClass('dx-popover-flipped-vertical', isFlippedVertical);
    },
    _renderArrowPosition: function _renderArrowPosition(side) {
      var arrowRect = (0, _position2.getBoundingRect)(this._$arrow.get(0));
      var arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
      this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
      var axis = this._isVerticalSide(side) ? 'left' : 'top';
      var sizeProperty = this._isVerticalSide(side) ? 'width' : 'height';
      var $target = (0, _renderer.default)(this._positionController._position.of);
      var targetOffset = _position.default.offset($target) || {
        top: 0,
        left: 0
      };
      var contentOffset = _position.default.offset(this.$overlayContent());
      var arrowSize = arrowRect[sizeProperty];
      var contentLocation = contentOffset[axis];
      var contentSize = (0, _position2.getBoundingRect)(this.$overlayContent().get(0))[sizeProperty];
      var targetLocation = targetOffset[axis];
      var targetElement = $target.get(0);
      var targetSize = targetElement && !targetElement.preventDefault ? (0, _position2.getBoundingRect)(targetElement)[sizeProperty] : 0;
      var min = Math.max(contentLocation, targetLocation);
      var max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
      var arrowLocation;
      if (this.option('arrowPosition') === 'start') {
        arrowLocation = min - contentLocation;
      } else if (this.option('arrowPosition') === 'end') {
        arrowLocation = max - contentLocation - arrowSize;
      } else {
        arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2;
      }
      var borderWidth = this._positionController._getContentBorderWidth(side);
      var finalArrowLocation = (0, _math.fitIntoRange)(arrowLocation - borderWidth + this.option('arrowOffset'), borderWidth, contentSize - arrowSize - borderWidth * 2);
      this._$arrow.css(axis, finalArrowLocation);
    },
    _isPopoverInside: function _isPopoverInside() {
      return this._positionController._isPopoverInside();
    },
    _setContentHeight: function _setContentHeight(fullUpdate) {
      if (fullUpdate) {
        this.callBase();
      }
    },
    _getPositionControllerConfig: function _getPositionControllerConfig() {
      var _this$option2 = this.option(),
          shading = _this$option2.shading,
          target = _this$option2.target;
      return (0, _extend.extend)({}, this.callBase(), {
        target: target,
        shading: shading,
        $arrow: this._$arrow
      });
    },
    _initPositionController: function _initPositionController() {
      this._positionController = new _popover_position_controller.PopoverPositionController(this._getPositionControllerConfig());
    },
    _renderWrapperDimensions: function _renderWrapperDimensions() {
      if (this.option('shading')) {
        this.$wrapper().css({
          width: '100%',
          height: '100%'
        });
      }
    },
    _isVerticalSide: function _isVerticalSide(side) {
      return this._positionController._isVerticalSide(side);
    },
    _isHorizontalSide: function _isHorizontalSide(side) {
      return this._positionController._isHorizontalSide(side);
    },
    _clearEventTimeout: function _clearEventTimeout(name) {
      clearTimeout(this._timeouts[name]);
    },
    _clearEventsTimeouts: function _clearEventsTimeouts() {
      this._clearEventTimeout('show');
      this._clearEventTimeout('hide');
    },
    _clean: function _clean() {
      this._detachEvents(this.option('target'));
      this.callBase.apply(this, arguments);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'arrowPosition':
        case 'arrowOffset':
          this._renderGeometry();
          break;
        case 'fullScreen':
          if (args.value) {
            this.option('fullScreen', false);
          }
          break;
        case 'target':
          args.previousValue && this._detachEvents(args.previousValue);
          this._positionController.updateTarget(args.value);
          this._invalidate();
          break;
        case 'showEvent':
        case 'hideEvent':
          {
            var name = args.name.substring(0, 4);
            var event = getEventNameByOption(args.previousValue);
            this.hide();
            detachEvent(this, this.option('target'), name, event);
            attachEvent(this, name);
            break;
          }
        case 'visible':
          this._clearEventTimeout(args.value ? 'show' : 'hide');
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    },
    show: function show(target) {
      if (target) {
        this.option('target', target);
      }
      return this.callBase();
    }

    /**
    * @name dxPopover.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxPopover.focus
    * @publicName focus()
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxPopover', Popover);
  var _default = Popover;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/window","../../core/element","../../core/dom_adapter","../../events/core/events_engine","../../core/component_registrator","../../core/utils/extend","../../animation/translator","../../animation/position","../../core/utils/type","../../core/utils/math","../../events/utils/index","../widget/ui.errors","../popup/ui.popup","../../core/utils/position","./popover_position_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/window"), require("../../core/element"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/component_registrator"), require("../../core/utils/extend"), require("../../animation/translator"), require("../../animation/position"), require("../../core/utils/type"), require("../../core/utils/math"), require("../../events/utils/index"), require("../widget/ui.errors"), require("../popup/ui.popup"), require("../../core/utils/position"), require("./popover_position_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.popover.js.map