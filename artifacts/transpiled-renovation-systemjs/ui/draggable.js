!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/draggable.js"], ["../core/utils/size","../core/renderer","../core/dom_adapter","../core/utils/window","../core/utils/position","../events/core/events_engine","../core/utils/string","../core/component_registrator","../animation/translator","./scroll_view/animator","../core/utils/inflector","../core/utils/extend","../core/dom_component","../core/element","../events/utils/index","../events/pointer","../events/drag","../animation/position","../core/utils/type","../core/utils/common","../core/utils/view_port","../core/templates/empty_template","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/draggable.js", ["../core/utils/size", "../core/renderer", "../core/dom_adapter", "../core/utils/window", "../core/utils/position", "../events/core/events_engine", "../core/utils/string", "../core/component_registrator", "../animation/translator", "./scroll_view/animator", "../core/utils/inflector", "../core/utils/extend", "../core/dom_component", "../core/element", "../events/utils/index", "../events/pointer", "../events/drag", "../animation/position", "../core/utils/type", "../core/utils/common", "../core/utils/view_port", "../core/templates/empty_template", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _window = $__require("../core/utils/window");
  var _position = $__require("../core/utils/position");
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _string = $__require("../core/utils/string");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _translator = $__require("../animation/translator");
  var _animator = _interopRequireDefault($__require("./scroll_view/animator"));
  var _inflector = $__require("../core/utils/inflector");
  var _extend = $__require("../core/utils/extend");
  var _dom_component = _interopRequireDefault($__require("../core/dom_component"));
  var _element = $__require("../core/element");
  var _index = $__require("../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _drag = $__require("../events/drag");
  var _position2 = _interopRequireDefault($__require("../animation/position"));
  var _type = $__require("../core/utils/type");
  var _common = $__require("../core/utils/common");
  var _view_port = $__require("../core/utils/view_port");
  var _empty_template = $__require("../core/templates/empty_template");
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var window = (0, _window.getWindow)();
  var KEYDOWN_EVENT = 'keydown';
  var DRAGGABLE = 'dxDraggable';
  var DRAGSTART_EVENT_NAME = (0, _index.addNamespace)(_drag.start, DRAGGABLE);
  var DRAG_EVENT_NAME = (0, _index.addNamespace)(_drag.move, DRAGGABLE);
  var DRAGEND_EVENT_NAME = (0, _index.addNamespace)(_drag.end, DRAGGABLE);
  var DRAG_ENTER_EVENT_NAME = (0, _index.addNamespace)(_drag.enter, DRAGGABLE);
  var DRAGEND_LEAVE_EVENT_NAME = (0, _index.addNamespace)(_drag.leave, DRAGGABLE);
  var POINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, DRAGGABLE);
  var KEYDOWN_EVENT_NAME = (0, _index.addNamespace)(KEYDOWN_EVENT, DRAGGABLE);
  var CLONE_CLASS = 'clone';
  var targetDraggable;
  var sourceDraggable;
  var ANONYMOUS_TEMPLATE_NAME = 'content';
  var getMousePosition = function getMousePosition(event) {
    return {
      x: event.pageX - (0, _renderer.default)(window).scrollLeft(),
      y: event.pageY - (0, _renderer.default)(window).scrollTop()
    };
  };
  var GESTURE_COVER_CLASS = 'dx-gesture-cover';
  var OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
  var OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
  var ScrollHelper = /*#__PURE__*/function () {
    function ScrollHelper(orientation, component) {
      this._preventScroll = true;
      this._component = component;
      if (orientation === 'vertical') {
        this._scrollValue = 'scrollTop';
        this._overFlowAttr = 'overflowY';
        this._sizeAttr = 'height';
        this._scrollSizeProp = 'scrollHeight';
        this._clientSizeProp = 'clientHeight';
        this._limitProps = {
          start: 'top',
          end: 'bottom'
        };
      } else {
        this._scrollValue = 'scrollLeft';
        this._overFlowAttr = 'overflowX';
        this._sizeAttr = 'width';
        this._scrollSizeProp = 'scrollWidth';
        this._clientSizeProp = 'clientWidth';
        this._limitProps = {
          start: 'left',
          end: 'right'
        };
      }
    }
    var _proto = ScrollHelper.prototype;
    _proto.updateScrollable = function updateScrollable(elements, mousePosition) {
      var _this = this;
      var isScrollableFound = false;
      elements.some(function (element) {
        var $element = (0, _renderer.default)(element);
        var isTargetOverOverlayWrapper = $element.hasClass(OVERLAY_WRAPPER_CLASS);
        var isTargetOverOverlayContent = $element.hasClass(OVERLAY_CONTENT_CLASS);
        if (isTargetOverOverlayWrapper || isTargetOverOverlayContent) {
          return true;
        }
        isScrollableFound = _this._trySetScrollable(element, mousePosition);
        return isScrollableFound;
      });
      if (!isScrollableFound) {
        this._$scrollableAtPointer = null;
        this._scrollSpeed = 0;
      }
    };
    _proto.isScrolling = function isScrolling() {
      return !!this._scrollSpeed;
    };
    _proto.isScrollable = function isScrollable($element) {
      return ($element.css(this._overFlowAttr) === 'auto' || $element.hasClass('dx-scrollable-container')) && $element.prop(this._scrollSizeProp) > Math.ceil(this._sizeAttr === 'width' ? (0, _size.getWidth)($element) : (0, _size.getHeight)($element));
    };
    _proto._trySetScrollable = function _trySetScrollable(element, mousePosition) {
      var that = this;
      var $element = (0, _renderer.default)(element);
      var distanceToBorders;
      var sensitivity = that._component.option('scrollSensitivity');
      var isScrollable = that.isScrollable($element);
      if (isScrollable) {
        distanceToBorders = that._calculateDistanceToBorders($element, mousePosition);
        if (sensitivity > distanceToBorders[that._limitProps.start]) {
          if (!that._preventScroll) {
            that._scrollSpeed = -that._calculateScrollSpeed(distanceToBorders[that._limitProps.start]);
            that._$scrollableAtPointer = $element;
          }
        } else if (sensitivity > distanceToBorders[that._limitProps.end]) {
          if (!that._preventScroll) {
            that._scrollSpeed = that._calculateScrollSpeed(distanceToBorders[that._limitProps.end]);
            that._$scrollableAtPointer = $element;
          }
        } else {
          isScrollable = false;
          that._preventScroll = false;
        }
      }
      return isScrollable;
    };
    _proto._calculateDistanceToBorders = function _calculateDistanceToBorders($area, mousePosition) {
      var area = $area.get(0);
      var areaBoundingRect;
      if (area) {
        areaBoundingRect = (0, _position.getBoundingRect)(area);
        return {
          left: mousePosition.x - areaBoundingRect.left,
          top: mousePosition.y - areaBoundingRect.top,
          right: areaBoundingRect.right - mousePosition.x,
          bottom: areaBoundingRect.bottom - mousePosition.y
        };
      } else {
        return {};
      }
    };
    _proto._calculateScrollSpeed = function _calculateScrollSpeed(distance) {
      var component = this._component;
      var sensitivity = component.option('scrollSensitivity');
      var maxSpeed = component.option('scrollSpeed');
      return Math.ceil(Math.pow((sensitivity - distance) / sensitivity, 2) * maxSpeed);
    };
    _proto.scrollByStep = function scrollByStep() {
      var that = this;
      if (that._$scrollableAtPointer && that._scrollSpeed) {
        if (that._$scrollableAtPointer.hasClass('dx-scrollable-container')) {
          var $scrollable = that._$scrollableAtPointer.closest('.dx-scrollable');
          var scrollableInstance = $scrollable.data('dxScrollable') || $scrollable.data('dxScrollView');
          if (scrollableInstance) {
            var nextScrollPosition = scrollableInstance.scrollOffset()[that._limitProps.start] + that._scrollSpeed;
            scrollableInstance.scrollTo(_defineProperty({}, that._limitProps.start, nextScrollPosition));
          }
        } else {
          var _nextScrollPosition = that._$scrollableAtPointer[that._scrollValue]() + that._scrollSpeed;
          that._$scrollableAtPointer[that._scrollValue](_nextScrollPosition);
        }
        var dragMoveArgs = that._component._dragMoveArgs;
        if (dragMoveArgs) {
          that._component._dragMoveHandler(dragMoveArgs);
        }
      }
    };
    _proto.reset = function reset() {
      this._$scrollableAtPointer = null;
      this._scrollSpeed = 0;
      this._preventScroll = true;
    };
    _proto.isOutsideScrollable = function isOutsideScrollable($scrollable, event) {
      if (!$scrollable) {
        return false;
      }
      var scrollableSize = (0, _position.getBoundingRect)($scrollable.get(0));
      var start = scrollableSize[this._limitProps.start];
      var size = scrollableSize[this._sizeAttr];
      var mousePosition = getMousePosition(event);
      var location = this._sizeAttr === 'width' ? mousePosition.x : mousePosition.y;
      return location < start || location > start + size;
    };
    return ScrollHelper;
  }();
  var ScrollAnimator = _animator.default.inherit({
    ctor: function ctor(strategy) {
      this.callBase();
      this._strategy = strategy;
    },
    _step: function _step() {
      var horizontalScrollHelper = this._strategy._horizontalScrollHelper;
      var verticalScrollHelper = this._strategy._verticalScrollHelper;
      horizontalScrollHelper && horizontalScrollHelper.scrollByStep();
      verticalScrollHelper && verticalScrollHelper.scrollByStep();
    }
  });
  var Draggable = _dom_component.default.inherit({
    reset: _common.noop,
    dragMove: _common.noop,
    dragEnter: _common.noop,
    dragLeave: _common.noop,
    dragEnd: function dragEnd(sourceEvent) {
      var sourceDraggable = this._getSourceDraggable();
      sourceDraggable._fireRemoveEvent(sourceEvent);
      return new _deferred.Deferred().resolve();
    },
    _fireRemoveEvent: _common.noop,
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        onDragStart: null,
        onDragMove: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragLeave: null,
        onDragCancel: null,
        onCancelByEsc: false,
        /**
         * @section Utils
         * @default null
         * @name dxDraggableOptions.onDrop
         * @type function(e)
         * @type_function_param1 e:object
         * @type_function_param1_field1 component:this
         * @type_function_param1_field2 element:DxElement
         * @type_function_param1_field3 model:object
         * @type_function_param1_field4 event:event
         * @type_function_param1_field5 itemData:any
         * @type_function_param1_field6 itemElement:DxElement
         * @type_function_param1_field7 fromComponent:dxSortable|dxDraggable
         * @type_function_param1_field8 toComponent:dxSortable|dxDraggable
         * @type_function_param1_field9 fromData:any
         * @type_function_param1_field10 toData:any
         * @action
         * @hidden
         */
        onDrop: null,
        immediate: true,
        dragDirection: 'both',
        boundary: undefined,
        boundOffset: 0,
        allowMoveByClick: false,
        itemData: null,
        container: undefined,
        dragTemplate: undefined,
        /**
         * @name DraggableBaseOptions.contentTemplate
         * @type template|function
         * @type_function_return string|Element|jQuery
         * @hidden
         * @default "content"
         */
        contentTemplate: 'content',
        handle: '',
        /**
         * @name dxDraggableOptions.filter
         * @type string
         * @default ""
         * @hidden
         */
        filter: '',
        clone: false,
        autoScroll: true,
        scrollSpeed: 30,
        scrollSensitivity: 60,
        group: undefined,
        data: undefined
      });
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase.apply(this, arguments);
      (0, _extend.extend)(this._optionsByReference, {
        component: true,
        group: true,
        itemData: true,
        data: true
      });
    },
    _init: function _init() {
      this.callBase();
      this._attachEventHandlers();
      this._scrollAnimator = new ScrollAnimator(this);
      this._horizontalScrollHelper = new ScrollHelper('horizontal', this);
      this._verticalScrollHelper = new ScrollHelper('vertical', this);
    },
    _normalizeCursorOffset: function _normalizeCursorOffset(offset) {
      if ((0, _type.isObject)(offset)) {
        offset = {
          h: offset.x,
          v: offset.y
        };
      }
      offset = (0, _common.splitPair)(offset).map(function (value) {
        return parseFloat(value);
      });
      return {
        left: offset[0],
        top: offset.length === 1 ? offset[0] : offset[1]
      };
    },
    _getNormalizedCursorOffset: function _getNormalizedCursorOffset(offset, options) {
      if ((0, _type.isFunction)(offset)) {
        offset = offset.call(this, options);
      }
      return this._normalizeCursorOffset(offset);
    },
    _calculateElementOffset: function _calculateElementOffset(options) {
      var elementOffset;
      var dragElementOffset;
      var event = options.event;
      var $element = (0, _renderer.default)(options.itemElement);
      var $dragElement = (0, _renderer.default)(options.dragElement);
      var isCloned = this._dragElementIsCloned();
      var cursorOffset = this.option('cursorOffset');
      var normalizedCursorOffset = {
        left: 0,
        top: 0
      };
      var currentLocate = this._initialLocate = (0, _translator.locate)($dragElement);
      if (isCloned || options.initialOffset || cursorOffset) {
        elementOffset = options.initialOffset || $element.offset();
        if (cursorOffset) {
          normalizedCursorOffset = this._getNormalizedCursorOffset(cursorOffset, options);
          if (isFinite(normalizedCursorOffset.left)) {
            elementOffset.left = event.pageX;
          }
          if (isFinite(normalizedCursorOffset.top)) {
            elementOffset.top = event.pageY;
          }
        }
        dragElementOffset = $dragElement.offset();
        elementOffset.top -= dragElementOffset.top + (normalizedCursorOffset.top || 0) - currentLocate.top;
        elementOffset.left -= dragElementOffset.left + (normalizedCursorOffset.left || 0) - currentLocate.left;
      }
      return elementOffset;
    },
    _initPosition: function _initPosition(options) {
      var $dragElement = (0, _renderer.default)(options.dragElement);
      var elementOffset = this._calculateElementOffset(options);
      if (elementOffset) {
        this._move(elementOffset, $dragElement);
      }
      this._startPosition = (0, _translator.locate)($dragElement);
    },
    _startAnimator: function _startAnimator() {
      if (!this._scrollAnimator.inProgress()) {
        this._scrollAnimator.start();
      }
    },
    _stopAnimator: function _stopAnimator() {
      this._scrollAnimator.stop();
    },
    _addWidgetPrefix: function _addWidgetPrefix(className) {
      var componentName = this.NAME;
      return (0, _inflector.dasherize)(componentName) + (className ? '-' + className : '');
    },
    _getItemsSelector: function _getItemsSelector() {
      return this.option('filter') || '';
    },
    _$content: function _$content() {
      var $element = this.$element();
      var $wrapper = $element.children('.dx-template-wrapper');
      return $wrapper.length ? $wrapper : $element;
    },
    _attachEventHandlers: function _attachEventHandlers() {
      var _this2 = this;
      if (this.option('disabled')) {
        return;
      }
      var $element = this._$content();
      var itemsSelector = this._getItemsSelector();
      var allowMoveByClick = this.option('allowMoveByClick');
      var data = {
        direction: this.option('dragDirection'),
        immediate: this.option('immediate'),
        checkDropTarget: function checkDropTarget($target, event) {
          var targetGroup = _this2.option('group');
          var sourceGroup = _this2._getSourceDraggable().option('group');
          var $scrollable = _this2._getScrollable($target);
          if (_this2._verticalScrollHelper.isOutsideScrollable($scrollable, event) || _this2._horizontalScrollHelper.isOutsideScrollable($scrollable, event)) {
            return false;
          }
          return sourceGroup && sourceGroup === targetGroup;
        }
      };
      if (allowMoveByClick) {
        $element = this._getArea();
        _events_engine.default.on($element, POINTERDOWN_EVENT_NAME, data, this._pointerDownHandler.bind(this));
      }
      if (itemsSelector[0] === '>') {
        itemsSelector = itemsSelector.slice(1);
      }
      _events_engine.default.on($element, DRAGSTART_EVENT_NAME, itemsSelector, data, this._dragStartHandler.bind(this));
      _events_engine.default.on($element, DRAG_EVENT_NAME, data, this._dragMoveHandler.bind(this));
      _events_engine.default.on($element, DRAGEND_EVENT_NAME, data, this._dragEndHandler.bind(this));
      _events_engine.default.on($element, DRAG_ENTER_EVENT_NAME, data, this._dragEnterHandler.bind(this));
      _events_engine.default.on($element, DRAGEND_LEAVE_EVENT_NAME, data, this._dragLeaveHandler.bind(this));
      if (this.option('onCancelByEsc')) {
        _events_engine.default.on($element, KEYDOWN_EVENT_NAME, this._keydownHandler.bind(this));
      }
    },
    _dragElementIsCloned: function _dragElementIsCloned() {
      return this._$dragElement && this._$dragElement.hasClass(this._addWidgetPrefix(CLONE_CLASS));
    },
    _getDragTemplateArgs: function _getDragTemplateArgs($element, $container) {
      return {
        container: (0, _element.getPublicElement)($container),
        model: {
          itemData: this.option('itemData'),
          itemElement: (0, _element.getPublicElement)($element)
        }
      };
    },
    _createDragElement: function _createDragElement($element) {
      var result = $element;
      var clone = this.option('clone');
      var $container = this._getContainer();
      var template = this.option('dragTemplate');
      if (template) {
        template = this._getTemplate(template);
        result = (0, _renderer.default)('<div>').appendTo($container);
        template.render(this._getDragTemplateArgs($element, result));
      } else if (clone) {
        result = (0, _renderer.default)('<div>').appendTo($container);
        $element.clone().css({
          width: $element.css('width'),
          height: $element.css('height')
        }).appendTo(result);
      }
      return result.toggleClass(this._addWidgetPrefix(CLONE_CLASS), result.get(0) !== $element.get(0)).toggleClass('dx-rtl', this.option('rtlEnabled'));
    },
    _resetDragElement: function _resetDragElement() {
      if (this._dragElementIsCloned()) {
        this._$dragElement.remove();
      } else {
        this._toggleDraggingClass(false);
      }
      this._$dragElement = null;
    },
    _resetSourceElement: function _resetSourceElement() {
      this._toggleDragSourceClass(false);
      this._$sourceElement = null;
    },
    _detachEventHandlers: function _detachEventHandlers() {
      _events_engine.default.off(this._$content(), '.' + DRAGGABLE);
      _events_engine.default.off(this._getArea(), '.' + DRAGGABLE);
    },
    _move: function _move(position, $element) {
      (0, _translator.move)($element || this._$dragElement, position);
    },
    _getDraggableElement: function _getDraggableElement(e) {
      var $sourceElement = this._getSourceElement();
      if ($sourceElement) {
        return $sourceElement;
      }
      var allowMoveByClick = this.option('allowMoveByClick');
      if (allowMoveByClick) {
        return this.$element();
      }
      var $target = (0, _renderer.default)(e && e.target);
      var itemsSelector = this._getItemsSelector();
      if (itemsSelector[0] === '>') {
        var $items = this._$content().find(itemsSelector);
        if (!$items.is($target)) {
          $target = $target.closest($items);
        }
      }
      return $target;
    },
    _getSourceElement: function _getSourceElement() {
      var draggable = this._getSourceDraggable();
      return draggable._$sourceElement;
    },
    _pointerDownHandler: function _pointerDownHandler(e) {
      if ((0, _index.needSkipEvent)(e)) {
        return;
      }
      var position = {};
      var $element = this.$element();
      var dragDirection = this.option('dragDirection');
      if (dragDirection === 'horizontal' || dragDirection === 'both') {
        position.left = e.pageX - $element.offset().left + (0, _translator.locate)($element).left - (0, _size.getWidth)($element) / 2;
      }
      if (dragDirection === 'vertical' || dragDirection === 'both') {
        position.top = e.pageY - $element.offset().top + (0, _translator.locate)($element).top - (0, _size.getHeight)($element) / 2;
      }
      this._move(position, $element);
      this._getAction('onDragMove')(this._getEventArgs(e));
    },
    _isValidElement: function _isValidElement(event, $element) {
      var handle = this.option('handle');
      var $target = (0, _renderer.default)(event.originalEvent && event.originalEvent.target);
      if (handle && !$target.closest(handle).length) {
        return false;
      }
      if (!$element.length) {
        return false;
      }
      return !$element.is('.dx-state-disabled, .dx-state-disabled *');
    },
    _dragStartHandler: function _dragStartHandler(e) {
      var $element = this._getDraggableElement(e);
      this.dragInProgress = true;
      if (!this._isValidElement(e, $element)) {
        e.cancel = true;
        return;
      }
      if (this._$sourceElement) {
        return;
      }
      var dragStartArgs = this._getDragStartArgs(e, $element);
      this._getAction('onDragStart')(dragStartArgs);
      if (dragStartArgs.cancel) {
        e.cancel = true;
        return;
      }
      this.option('itemData', dragStartArgs.itemData);
      this._setSourceDraggable();
      this._$sourceElement = $element;
      var initialOffset = $element.offset();
      var $dragElement = this._$dragElement = this._createDragElement($element);
      this._toggleDraggingClass(true);
      this._toggleDragSourceClass(true);
      this._setGestureCoverCursor($dragElement.children());
      var isFixedPosition = $dragElement.css('position') === 'fixed';
      this._initPosition((0, _extend.extend)({}, dragStartArgs, {
        dragElement: $dragElement.get(0),
        initialOffset: isFixedPosition && initialOffset
      }));
      this._getAction('onDraggableElementShown')(_extends({}, dragStartArgs, {
        dragElement: $dragElement
      }));
      var $area = this._getArea();
      var areaOffset = this._getAreaOffset($area);
      var boundOffset = this._getBoundOffset();
      var areaWidth = (0, _size.getOuterWidth)($area);
      var areaHeight = (0, _size.getOuterHeight)($area);
      var elementWidth = (0, _size.getWidth)($dragElement);
      var elementHeight = (0, _size.getHeight)($dragElement);
      var startOffset = {
        left: $dragElement.offset().left - areaOffset.left,
        top: $dragElement.offset().top - areaOffset.top
      };
      if ($area.length) {
        e.maxLeftOffset = startOffset.left - boundOffset.left;
        e.maxRightOffset = areaWidth - startOffset.left - elementWidth - boundOffset.right;
        e.maxTopOffset = startOffset.top - boundOffset.top;
        e.maxBottomOffset = areaHeight - startOffset.top - elementHeight - boundOffset.bottom;
      }
      if (this.option('autoScroll')) {
        this._startAnimator();
      }
    },
    _getAreaOffset: function _getAreaOffset($area) {
      var offset = $area && _position2.default.offset($area);
      return offset ? offset : {
        left: 0,
        top: 0
      };
    },
    _toggleDraggingClass: function _toggleDraggingClass(value) {
      this._$dragElement && this._$dragElement.toggleClass(this._addWidgetPrefix('dragging'), value);
    },
    _toggleDragSourceClass: function _toggleDragSourceClass(value, $element) {
      var $sourceElement = $element || this._$sourceElement;
      $sourceElement && $sourceElement.toggleClass(this._addWidgetPrefix('source'), value);
    },
    _setGestureCoverCursor: function _setGestureCoverCursor($element) {
      (0, _renderer.default)(".".concat(GESTURE_COVER_CLASS)).css('cursor', $element.css('cursor'));
    },
    _getBoundOffset: function _getBoundOffset() {
      var boundOffset = this.option('boundOffset');
      if ((0, _type.isFunction)(boundOffset)) {
        boundOffset = boundOffset.call(this);
      }
      return (0, _string.quadToObject)(boundOffset);
    },
    _getArea: function _getArea() {
      var area = this.option('boundary');
      if ((0, _type.isFunction)(area)) {
        area = area.call(this);
      }
      return (0, _renderer.default)(area);
    },
    _getContainer: function _getContainer() {
      var container = this.option('container');
      if (container === undefined) {
        container = (0, _view_port.value)();
      }
      return (0, _renderer.default)(container);
    },
    _dragMoveHandler: function _dragMoveHandler(e, scrollBy) {
      this._dragMoveArgs = e;
      if (!this._$dragElement) {
        e.cancel = true;
        return;
      }
      var offset = e.offset;
      var startPosition = this._startPosition;
      this._move({
        left: startPosition.left + offset.x,
        top: startPosition.top + offset.y
      });
      if (!scrollBy) {
        this._updateScrollable(e);
      }
      var eventArgs = this._getEventArgs(e);
      this._getAction('onDragMove')(eventArgs);
      if (eventArgs.cancel === true) {
        return;
      }
      var targetDraggable = this._getTargetDraggable();
      targetDraggable.dragMove(e, scrollBy);
    },
    _updateScrollable: function _updateScrollable(e) {
      var that = this;
      if (that.option('autoScroll')) {
        var mousePosition = getMousePosition(e);
        var allObjects = _dom_adapter.default.elementsFromPoint(mousePosition.x, mousePosition.y, this.$element().get(0));
        that._verticalScrollHelper.updateScrollable(allObjects, mousePosition);
        that._horizontalScrollHelper.updateScrollable(allObjects, mousePosition);
      }
    },
    _getScrollable: function _getScrollable($element) {
      var _this3 = this;
      var $scrollable;
      $element.parents().toArray().some(function (parent) {
        var $parent = (0, _renderer.default)(parent);
        if (_this3._horizontalScrollHelper.isScrollable($parent) || _this3._verticalScrollHelper.isScrollable($parent)) {
          $scrollable = $parent;
          return true;
        }
      });
      return $scrollable;
    },
    _defaultActionArgs: function _defaultActionArgs() {
      var args = this.callBase.apply(this, arguments);
      var component = this.option('component');
      if (component) {
        args.component = component;
        args.element = component.element();
      }
      return args;
    },
    _getEventArgs: function _getEventArgs(e) {
      var sourceDraggable = this._getSourceDraggable();
      var targetDraggable = this._getTargetDraggable();
      return {
        event: e,
        itemData: sourceDraggable.option('itemData'),
        itemElement: (0, _element.getPublicElement)(sourceDraggable._$sourceElement),
        fromComponent: sourceDraggable.option('component') || sourceDraggable,
        toComponent: targetDraggable.option('component') || targetDraggable,
        fromData: sourceDraggable.option('data'),
        toData: targetDraggable.option('data')
      };
    },
    _getDragStartArgs: function _getDragStartArgs(e, $itemElement) {
      var args = this._getEventArgs(e);
      return {
        event: args.event,
        itemData: args.itemData,
        itemElement: $itemElement,
        fromData: args.fromData
      };
    },
    _revertItemToInitialPosition: function _revertItemToInitialPosition() {
      !this._dragElementIsCloned() && this._move(this._initialLocate, this._$sourceElement);
    },
    _dragEndHandler: function _dragEndHandler(e) {
      var _this4 = this;
      var d = new _deferred.Deferred();
      var dragEndEventArgs = this._getEventArgs(e);
      var dropEventArgs = this._getEventArgs(e);
      var targetDraggable = this._getTargetDraggable();
      var needRevertPosition = true;
      this.dragInProgress = false;
      try {
        this._getAction('onDragEnd')(dragEndEventArgs);
      } finally {
        (0, _deferred.when)((0, _deferred.fromPromise)(dragEndEventArgs.cancel)).done(function (cancel) {
          if (!cancel) {
            if (targetDraggable !== _this4) {
              targetDraggable._getAction('onDrop')(dropEventArgs);
            }
            if (!dropEventArgs.cancel) {
              needRevertPosition = false;
              (0, _deferred.when)((0, _deferred.fromPromise)(targetDraggable.dragEnd(dragEndEventArgs))).always(d.resolve);
              return;
            }
          }
          d.resolve();
        }).fail(d.resolve);
        d.done(function () {
          if (needRevertPosition) {
            _this4._revertItemToInitialPosition();
          }
          _this4._resetDragOptions(targetDraggable);
        });
      }
    },
    _isTargetOverAnotherDraggable: function _isTargetOverAnotherDraggable(e) {
      var _this5 = this;
      var sourceDraggable = this._getSourceDraggable();
      if (this === sourceDraggable) {
        return false;
      }
      var $dragElement = sourceDraggable._$dragElement;
      var $sourceDraggableElement = sourceDraggable.$element();
      var $targetDraggableElement = this.$element();
      var mousePosition = getMousePosition(e);
      var elements = _dom_adapter.default.elementsFromPoint(mousePosition.x, mousePosition.y, this.element());
      var firstWidgetElement = elements.filter(function (element) {
        var $element = (0, _renderer.default)(element);
        if ($element.hasClass(_this5._addWidgetPrefix())) {
          return !$element.closest($dragElement).length;
        }
      })[0];
      var $sourceElement = this._getSourceElement();
      var isTargetOverItself = firstWidgetElement === $sourceDraggableElement.get(0);
      var isTargetOverNestedDraggable = (0, _renderer.default)(firstWidgetElement).closest($sourceElement).length;
      return !firstWidgetElement || firstWidgetElement === $targetDraggableElement.get(0) && !isTargetOverItself && !isTargetOverNestedDraggable;
    },
    _dragEnterHandler: function _dragEnterHandler(e) {
      this._fireDragEnterEvent(e);
      if (this._isTargetOverAnotherDraggable(e)) {
        this._setTargetDraggable();
      }
      var sourceDraggable = this._getSourceDraggable();
      sourceDraggable.dragEnter(e);
    },
    _dragLeaveHandler: function _dragLeaveHandler(e) {
      this._fireDragLeaveEvent(e);
      this._resetTargetDraggable();
      if (this !== this._getSourceDraggable()) {
        this.reset();
      }
      var sourceDraggable = this._getSourceDraggable();
      sourceDraggable.dragLeave(e);
    },
    _keydownHandler: function _keydownHandler(e) {
      if (this.dragInProgress && e.key === 'Escape') {
        this._keydownEscapeHandler(e);
      }
    },
    _keydownEscapeHandler: function _keydownEscapeHandler(e) {
      var _sourceDraggable;
      var $sourceElement = this._getSourceElement();
      if (!$sourceElement) {
        return;
      }
      var dragCancelEventArgs = this._getEventArgs(e);
      this._getAction('onDragCancel')(dragCancelEventArgs);
      if (dragCancelEventArgs.cancel) {
        return;
      }
      this.dragInProgress = false;
      (_sourceDraggable = sourceDraggable) === null || _sourceDraggable === void 0 ? void 0 : _sourceDraggable._toggleDraggingClass(false);
      this._detachEventHandlers();
      this._revertItemToInitialPosition();
      var targetDraggable = this._getTargetDraggable();
      this._resetDragOptions(targetDraggable);
      this._attachEventHandlers();
    },
    _getAction: function _getAction(name) {
      return this['_' + name + 'Action'] || this._createActionByOption(name);
    },
    _getAnonymousTemplateName: function _getAnonymousTemplateName() {
      return ANONYMOUS_TEMPLATE_NAME;
    },
    _initTemplates: function _initTemplates() {
      if (!this.option('contentTemplate')) return;
      this._templateManager.addDefaultTemplates({
        content: new _empty_template.EmptyTemplate()
      });
      this.callBase.apply(this, arguments);
    },
    _render: function _render() {
      this.callBase();
      this.$element().addClass(this._addWidgetPrefix());
      var transclude = this._templateManager.anonymousTemplateName === this.option('contentTemplate');
      var template = this._getTemplateByOption('contentTemplate');
      if (template) {
        (0, _renderer.default)(template.render({
          container: this.element(),
          transclude: transclude
        }));
      }
    },
    _optionChanged: function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'onDragStart':
        case 'onDragMove':
        case 'onDragEnd':
        case 'onDrop':
        case 'onDragEnter':
        case 'onDragLeave':
        case 'onDragCancel':
        case 'onDraggableElementShown':
          this['_' + name + 'Action'] = this._createActionByOption(name);
          break;
        case 'dragTemplate':
        case 'contentTemplate':
        case 'container':
        case 'clone':
          break;
        case 'allowMoveByClick':
        case 'dragDirection':
        case 'disabled':
        case 'boundary':
        case 'filter':
        case 'immediate':
          this._resetDragElement();
          this._detachEventHandlers();
          this._attachEventHandlers();
          break;
        case 'onCancelByEsc':
          this._keydownHandler();
          break;
        case 'autoScroll':
          this._verticalScrollHelper.reset();
          this._horizontalScrollHelper.reset();
          break;
        case 'scrollSensitivity':
        case 'scrollSpeed':
        case 'boundOffset':
        case 'handle':
        case 'group':
        case 'data':
        case 'itemData':
          break;
        default:
          this.callBase(args);
      }
    },
    _getTargetDraggable: function _getTargetDraggable() {
      return targetDraggable || this;
    },
    _getSourceDraggable: function _getSourceDraggable() {
      return sourceDraggable || this;
    },
    _setTargetDraggable: function _setTargetDraggable() {
      var currentGroup = this.option('group');
      var sourceDraggable = this._getSourceDraggable();
      if (currentGroup && currentGroup === sourceDraggable.option('group')) {
        targetDraggable = this;
      }
    },
    _setSourceDraggable: function _setSourceDraggable() {
      sourceDraggable = this;
    },
    _resetSourceDraggable: function _resetSourceDraggable() {
      sourceDraggable = null;
    },
    _resetTargetDraggable: function _resetTargetDraggable() {
      targetDraggable = null;
    },
    _resetDragOptions: function _resetDragOptions(targetDraggable) {
      this.reset();
      targetDraggable.reset();
      this._stopAnimator();
      this._horizontalScrollHelper.reset();
      this._verticalScrollHelper.reset();
      this._resetDragElement();
      this._resetSourceElement();
      this._resetTargetDraggable();
      this._resetSourceDraggable();
    },
    _dispose: function _dispose() {
      this.callBase();
      this._detachEventHandlers();
      this._resetDragElement();
      this._resetTargetDraggable();
      this._resetSourceDraggable();
      this._$sourceElement = null;
      this._stopAnimator();
    },
    _fireDragEnterEvent: function _fireDragEnterEvent(sourceEvent) {
      var args = this._getEventArgs(sourceEvent);
      this._getAction('onDragEnter')(args);
    },
    _fireDragLeaveEvent: function _fireDragLeaveEvent(sourceEvent) {
      var args = this._getEventArgs(sourceEvent);
      this._getAction('onDragLeave')(args);
    }
  });
  (0, _component_registrator.default)(DRAGGABLE, Draggable);
  var _default = Draggable;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/dom_adapter","../core/utils/window","../core/utils/position","../events/core/events_engine","../core/utils/string","../core/component_registrator","../animation/translator","./scroll_view/animator","../core/utils/inflector","../core/utils/extend","../core/dom_component","../core/element","../events/utils/index","../events/pointer","../events/drag","../animation/position","../core/utils/type","../core/utils/common","../core/utils/view_port","../core/templates/empty_template","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/dom_adapter"), require("../core/utils/window"), require("../core/utils/position"), require("../events/core/events_engine"), require("../core/utils/string"), require("../core/component_registrator"), require("../animation/translator"), require("./scroll_view/animator"), require("../core/utils/inflector"), require("../core/utils/extend"), require("../core/dom_component"), require("../core/element"), require("../events/utils/index"), require("../events/pointer"), require("../events/drag"), require("../animation/position"), require("../core/utils/type"), require("../core/utils/common"), require("../core/utils/view_port"), require("../core/templates/empty_template"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=draggable.js.map