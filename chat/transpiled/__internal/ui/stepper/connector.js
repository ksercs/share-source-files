"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS = exports.STEPPER_CONNECTOR_VALUE_CLASS = exports.STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS = exports.STEPPER_CONNECTOR_CONTAINER_CLASS = exports.STEPPER_CONNECTOR_CLASS = exports.MAX_SIZE = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _style = require("../../../core/utils/style");
var _dom_component = _interopRequireDefault(require("../../core/widget/dom_component"));
var _stepper = require("./stepper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STEPPER_CONNECTOR_CLASS = exports.STEPPER_CONNECTOR_CLASS = 'dx-stepper-connector';
const STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS = exports.STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS = 'dx-stepper-connector-horizontal';
const STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS = exports.STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS = 'dx-stepper-connector-vertical';
const STEPPER_CONNECTOR_CONTAINER_CLASS = exports.STEPPER_CONNECTOR_CONTAINER_CLASS = 'dx-stepper-connector-container';
const STEPPER_CONNECTOR_VALUE_CLASS = exports.STEPPER_CONNECTOR_VALUE_CLASS = 'dx-stepper-connector-value';
const PERCENT_UNIT = '%';
const FLEX_GROW = 'flexGrow';
const MAX_SIZE = exports.MAX_SIZE = 100;
class Connector extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      size: MAX_SIZE,
      value: 0
    });
  }
  _init() {
    super._init();
    (0, _renderer.default)(this.element()).addClass(STEPPER_CONNECTOR_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    this._toggleOrientationClass();
    this._renderContent();
    this._updateDimensions();
  }
  _updateDimensions() {
    const isHorizontal = this._isHorizontalOrientation();
    const dimension = isHorizontal ? 'width' : 'height';
    const inverseDimension = isHorizontal ? 'height' : 'width';
    const {
      size
    } = this.option();
    this.option(inverseDimension, null);
    this.option(dimension, `${size}${PERCENT_UNIT}`);
    this._updateConnectorValue();
  }
  _updateConnectorValue() {
    const {
      value
    } = this.option();
    const connectorElement = this._$connectorValue().get(0);
    const ratio = value / MAX_SIZE;
    connectorElement.style[(0, _style.styleProp)(FLEX_GROW)] = String(ratio);
  }
  _$connectorValue() {
    return this.$element().find(`.${STEPPER_CONNECTOR_VALUE_CLASS}`);
  }
  _toggleOrientationClass() {
    (0, _renderer.default)(this.element()).toggleClass(STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation()).toggleClass(STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _isHorizontalOrientation() {
    const {
      orientation
    } = this.option();
    return orientation === _stepper.ORIENTATION.horizontal;
  }
  _renderContent() {
    const $container = (0, _renderer.default)('<div>').addClass(STEPPER_CONNECTOR_CONTAINER_CLASS).appendTo(this.element());
    (0, _renderer.default)('<div>').addClass(STEPPER_CONNECTOR_VALUE_CLASS).appendTo($container);
  }
  _clean() {
    super._clean();
    this.$element().empty();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'orientation':
        this._toggleOrientationClass();
        this._updateDimensions();
        break;
      case 'size':
      case 'value':
        this._updateDimensions();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = Connector;