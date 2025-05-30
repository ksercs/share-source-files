"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _button = _interopRequireDefault(require("../component_wrapper/button"));
var _button2 = require("./button");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Button = /*#__PURE__*/function (_BaseComponent) {
  _inheritsLoose(Button, _BaseComponent);
  function Button() {
    return _BaseComponent.apply(this, arguments) || this;
  }
  var _proto = Button.prototype;
  _proto.getProps = function getProps() {
    var props = _BaseComponent.prototype.getProps.call(this);
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  };
  _proto.focus = function focus() {
    var _this$viewRef;
    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus.apply(_this$viewRef, arguments);
  };
  _proto.activate = function activate() {
    var _this$viewRef2;
    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.activate.apply(_this$viewRef2, arguments);
  };
  _proto.deactivate = function deactivate() {
    var _this$viewRef3;
    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.deactivate.apply(_this$viewRef3, arguments);
  };
  _proto._getActionConfigs = function _getActionConfigs() {
    return {
      onClick: {
        excludeValidators: ['readOnly']
      },
      onSubmit: {}
    };
  };
  _createClass(Button, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [],
        allowNull: [],
        elements: ['onSubmit'],
        templates: ['template', 'iconTemplate'],
        props: ['activeStateEnabled', 'hoverStateEnabled', 'icon', 'iconPosition', 'onClick', 'onSubmit', 'pressed', 'stylingMode', 'template', 'iconTemplate', 'text', 'type', 'useInkRipple', 'useSubmitBehavior', 'templateData', 'className', 'accessKey', 'disabled', 'focusStateEnabled', 'height', 'hint', 'onKeyDown', 'rtlEnabled', 'tabIndex', 'visible', 'width']
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _button2.Button;
    }
  }]);
  return Button;
}(_button.default);
exports.default = Button;
(0, _component_registrator.default)('dxButton', Button);
Button.defaultOptions = _button2.defaultOptions;
module.exports = exports.default;
module.exports.default = exports.default;