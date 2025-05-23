/**
* DevExtreme (cjs/ui/speed_dial_action/speed_dial_action.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _guid = _interopRequireDefault(require("../../core/guid"));
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _speed_dial_main_item = require("./speed_dial_main_item");
var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var getSwatchContainer = _swatch_container.default.getSwatchContainer;

// STYLE speedDialAction

var ready = _ready_callbacks.default.add;
var SpeedDialAction = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(SpeedDialAction, _Widget);
  function SpeedDialAction() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = SpeedDialAction.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      icon: '',
      onClick: null,
      label: '',
      visible: true,
      index: 0,
      /**
      * @name dxSpeedDialActionOptions.width
      * @hidden
      */

      /**
      * @name dxSpeedDialActionOptions.height
      * @hidden
      */

      /**
      * @name dxSpeedDialActionOptions.disabled
      * @hidden
      */

      onContentReady: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      animation: {
        show: {
          type: 'pop',
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          from: {
            scale: 0,
            opacity: 0
          },
          to: {
            scale: 1,
            opacity: 1
          }
        },
        hide: {
          type: 'pop',
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          from: {
            scale: 1,
            opacity: 1
          },
          to: {
            scale: 0,
            opacity: 0
          }
        }
      },
      id: new _guid.default()
    });
  };
  _proto._optionChanged = function _optionChanged(args) {
    switch (args.name) {
      case 'onClick':
      case 'icon':
      case 'label':
      case 'visible':
      case 'index':
      case 'onInitializing':
        (0, _speed_dial_main_item.initAction)(this);
        break;
      case 'animation':
      case 'id':
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto._render = function _render() {
    var _this = this;
    this._toggleVisibility(false);
    if (!getSwatchContainer(this.$element())) {
      ready(function () {
        return (0, _speed_dial_main_item.initAction)(_this);
      });
    } else {
      (0, _speed_dial_main_item.initAction)(this);
    }
  };
  _proto._dispose = function _dispose() {
    (0, _speed_dial_main_item.disposeAction)(this._options.silent('id'));
    _Widget.prototype._dispose.call(this);
  };
  return SpeedDialAction;
}(_ui.default);
(0, _component_registrator.default)('dxSpeedDialAction', SpeedDialAction);
var _default = SpeedDialAction;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
