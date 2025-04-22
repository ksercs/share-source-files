/**
* DevExtreme (cjs/__internal/ui/m_track_bar.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../common/core/animation");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _editor = _interopRequireDefault(require("../ui/editor/editor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TRACKBAR_CLASS = 'dx-trackbar';
const TRACKBAR_CONTAINER_CLASS = 'dx-trackbar-container';
const TRACKBAR_RANGE_CLASS = 'dx-trackbar-range';
const TRACKBAR_WRAPPER_CLASS = 'dx-trackbar-wrapper';
class TrackBar extends _editor.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      min: 0,
      max: 100,
      value: 0
    });
  }
  _initMarkup() {
    this.$element().addClass(TRACKBAR_CLASS);
    this._renderWrapper();
    this._renderContainer();
    this._renderRange();
    this._renderValue();
    this._setRangeStyles();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._setRangeStyles(this._rangeStylesConfig());
  }
  _renderWrapper() {
    this._$wrapper = (0, _renderer.default)('<div>').addClass(TRACKBAR_WRAPPER_CLASS).appendTo(this.$element());
  }
  _renderContainer() {
    this._$bar = (0, _renderer.default)('<div>').addClass(TRACKBAR_CONTAINER_CLASS).appendTo(this._$wrapper);
  }
  _renderRange() {
    this._$range = (0, _renderer.default)('<div>').addClass(TRACKBAR_RANGE_CLASS).appendTo(this._$bar);
  }
  _renderValue() {
    const {
      value: val,
      min,
      max
    } = this.option();
    // @ts-expect-error ts-error
    if (min > max) {
      return;
    }
    // @ts-expect-error ts-error
    if (val < min) {
      this.option('value', min);
      this._currentRatio = 0;
      return;
    }
    // @ts-expect-error ts-error
    if (val > max) {
      this.option('value', max);
      this._currentRatio = 1;
      return;
    }
    // @ts-expect-error ts-error
    const ratio = min === max ? 0 : (val - min) / (max - min);
    if (!this._needPreventAnimation) {
      this._setRangeStyles({
        width: `${ratio * 100}%`
      });
    }
    this.setAria({
      // eslint-disable-next-line spellcheck/spell-checker
      valuemin: this.option('min'),
      // eslint-disable-next-line spellcheck/spell-checker
      valuemax: max,
      // eslint-disable-next-line spellcheck/spell-checker
      valuenow: val
    });
    this._currentRatio = ratio;
  }
  _rangeStylesConfig() {
    return {
      width: `${this._currentRatio * 100}%`
    };
  }
  _setRangeStyles(options) {
    // @ts-expect-error ts-error
    _animation.fx.stop(this._$range);
    if (!options) {
      this._$range.css({
        width: 0
      });
      return;
    }
    if (this._needPreventAnimation || !(0, _window.hasWindow)()) {
      return;
    }
    // @ts-expect-error ts-error
    _animation.fx.animate(this._$range, {
      type: 'custom',
      duration: 100,
      to: options
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'value':
        this._renderValue();
        super._optionChanged(args);
        break;
      case 'max':
      case 'min':
        this._renderValue();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    // @ts-expect-error ts-error
    _animation.fx.stop(this._$range);
    super._dispose();
  }
}
(0, _component_registrator.default)('dxTrackBar', TrackBar);
var _default = exports.default = TrackBar;
