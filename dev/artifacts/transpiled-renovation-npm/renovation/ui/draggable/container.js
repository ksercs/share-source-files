"use strict";

exports.viewFunction = exports.DraggableContainerProps = exports.DraggableContainer = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _drag = require("../../../events/drag");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _combine_classes = require("../../utils/combine_classes");
var _excluded = ["children", "className", "data", "disabled", "onDragEnd", "onDragMove", "onDragStart"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var cssClasses = _ref.cssClasses,
    children = _ref.props.children,
    restAttributes = _ref.restAttributes,
    widgetRef = _ref.widgetRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", cssClasses, children, 0, _extends({}, restAttributes), null, widgetRef));
};
exports.viewFunction = viewFunction;
var DraggableContainerProps = {
  className: ''
};
exports.DraggableContainerProps = DraggableContainerProps;
var DraggableContainer = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(DraggableContainer, _InfernoComponent);
  function DraggableContainer(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.widgetRef = (0, _inferno.createRef)();
    _this.state = {
      isDragging: false
    };
    _this.dragEffect = _this.dragEffect.bind(_assertThisInitialized(_this));
    _this.dragStartHandler = _this.dragStartHandler.bind(_assertThisInitialized(_this));
    _this.dragMoveHandler = _this.dragMoveHandler.bind(_assertThisInitialized(_this));
    _this.dragEndHandler = _this.dragEndHandler.bind(_assertThisInitialized(_this));
    _this.getEventArgs = _this.getEventArgs.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = DraggableContainer.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.dragEffect, [this.props.disabled, this.props.data, this.props.onDragStart, this.props.onDragMove, this.props.onDragEnd])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.disabled, this.props.data, this.props.onDragStart, this.props.onDragMove, this.props.onDragEnd]);
  };
  _proto.dragEffect = function dragEffect() {
    var _this2 = this;
    if (this.props.disabled) {
      return undefined;
    }
    _events_engine.default.on(this.widgetRef.current, _drag.start, this.dragStartHandler);
    _events_engine.default.on(this.widgetRef.current, _drag.move, this.dragMoveHandler);
    _events_engine.default.on(this.widgetRef.current, _drag.end, this.dragEndHandler);
    return function () {
      _events_engine.default.off(_this2.widgetRef.current, _drag.start, _this2.dragStartHandler);
      _events_engine.default.off(_this2.widgetRef.current, _drag.move, _this2.dragMoveHandler);
      _events_engine.default.off(_this2.widgetRef.current, _drag.end, _this2.dragEndHandler);
    };
  };
  _proto.dragStartHandler = function dragStartHandler(event) {
    this.setState(function (__state_argument) {
      return {
        isDragging: true
      };
    });
    var dragStartArgs = this.getEventArgs(event);
    var onDragStart = this.props.onDragStart;
    onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(dragStartArgs);
  };
  _proto.dragMoveHandler = function dragMoveHandler(event) {
    var dragMoveArgs = this.getEventArgs(event);
    var onDragMove = this.props.onDragMove;
    onDragMove === null || onDragMove === void 0 ? void 0 : onDragMove(dragMoveArgs);
  };
  _proto.dragEndHandler = function dragEndHandler(event) {
    this.setState(function (__state_argument) {
      return {
        isDragging: false
      };
    });
    var dragEndArgs = this.getEventArgs(event);
    var onDragEnd = this.props.onDragEnd;
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(dragEndArgs);
  };
  _proto.getEventArgs = function getEventArgs(e) {
    return {
      event: e,
      data: this.props.data,
      itemElement: this.widgetRef.current
    };
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      isDragging: this.state.isDragging,
      widgetRef: this.widgetRef,
      cssClasses: this.cssClasses,
      dragStartHandler: this.dragStartHandler,
      dragMoveHandler: this.dragMoveHandler,
      dragEndHandler: this.dragEndHandler,
      getEventArgs: this.getEventArgs,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DraggableContainer, [{
    key: "cssClasses",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled;
      var classesMap = {
        [className]: !!className,
        'dx-draggable': true,
        'dx-draggable-dragging': this.state.isDragging,
        'dx-state-disabled': !!disabled
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        data = _this$props2.data,
        disabled = _this$props2.disabled,
        onDragEnd = _this$props2.onDragEnd,
        onDragMove = _this$props2.onDragMove,
        onDragStart = _this$props2.onDragStart,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return DraggableContainer;
}(_inferno2.InfernoComponent);
exports.DraggableContainer = DraggableContainer;
DraggableContainer.defaultProps = DraggableContainerProps;