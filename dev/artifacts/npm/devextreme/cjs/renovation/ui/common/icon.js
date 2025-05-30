/**
* DevExtreme (cjs/renovation/ui/common/icon.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.IconProps = exports.Icon = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _icon = require("../../../core/utils/icon");
var _combine_classes = require("../../utils/combine_classes");
var _excluded = ["iconTemplate", "position", "source"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var iconClassName = _ref.iconClassName,
    _ref$props = _ref.props,
    IconTemplate = _ref$props.iconTemplate,
    source = _ref$props.source,
    sourceType = _ref.sourceType;
  return (0, _inferno.createFragment)([sourceType === 'dxIcon' && (0, _inferno.createVNode)(1, "i", iconClassName), sourceType === 'fontIcon' && (0, _inferno.createVNode)(1, "i", iconClassName), sourceType === 'image' && (0, _inferno.createVNode)(1, "img", iconClassName, null, 1, {
    "alt": "",
    "src": source
  }), IconTemplate && (0, _inferno.createVNode)(1, "i", iconClassName, IconTemplate({}), 0)], 0);
};
exports.viewFunction = viewFunction;
var IconProps = {
  position: 'left',
  source: ''
};
exports.IconProps = IconProps;
var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};
var Icon = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Icon, _BaseInfernoComponent);
  function Icon(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = Icon.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        iconTemplate: getTemplate(props.iconTemplate)
      }),
      sourceType: this.sourceType,
      cssClass: this.cssClass,
      iconClassName: this.iconClassName,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Icon, [{
    key: "sourceType",
    get: function get() {
      return (0, _icon.getImageSourceType)(this.props.source);
    }
  }, {
    key: "cssClass",
    get: function get() {
      return this.props.position !== 'left' ? 'dx-icon-right' : '';
    }
  }, {
    key: "iconClassName",
    get: function get() {
      var generalClasses = {
        'dx-icon': true,
        [this.cssClass]: !!this.cssClass
      };
      var source = this.props.source;
      if (this.sourceType === 'dxIcon') {
        return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
          ["dx-icon-".concat(source)]: true
        }));
      }
      if (this.sourceType === 'fontIcon') {
        return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
          [String(source)]: !!source
        }));
      }
      if (this.sourceType === 'image') {
        return (0, _combine_classes.combineClasses)(generalClasses);
      }
      if (this.sourceType === 'svg') {
        return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
          'dx-svg-icon': true
        }));
      }
      return '';
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        iconTemplate = _this$props.iconTemplate,
        position = _this$props.position,
        source = _this$props.source,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return Icon;
}(_inferno2.BaseInfernoComponent);
exports.Icon = Icon;
Icon.defaultProps = IconProps;
