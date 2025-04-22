/**
* DevExtreme (cjs/__internal/ui/m_load_indicator.js)
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
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _size = require("../../core/utils/size");
var _window = require("../../core/utils/window");
var _themes = require("../../ui/themes");
var _widget = _interopRequireDefault(require("../core/widget/widget"));
var _m_support = _interopRequireDefault(require("../core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const navigator = (0, _window.getNavigator)();
const LOADINDICATOR_CLASS = 'dx-loadindicator';
const LOADINDICATOR_WRAPPER_CLASS = 'dx-loadindicator-wrapper';
const LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
const LOADINDICATOR_ICON_CLASS = 'dx-loadindicator-icon';
const LOADINDICATOR_SEGMENT_CLASS = 'dx-loadindicator-segment';
const LOADINDICATOR_SEGMENT_INNER_CLASS = 'dx-loadindicator-segment-inner';
const LOADINDICATOR_IMAGE_CLASS = 'dx-loadindicator-image';
class LoadIndicator extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      indicatorSrc: '',
      activeStateEnabled: false,
      hoverStateEnabled: false,
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false
    });
  }
  _defaultOptionsRules() {
    const themeName = (0, _themes.current)();
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = _devices.default.real();
        const obsoleteAndroid = realDevice.platform === 'android' && !/chrome/i.test(navigator.userAgent);
        return obsoleteAndroid;
      },
      options: {
        viaImage: true
      }
    }, {
      device() {
        return (0, _themes.isMaterialBased)(themeName);
      },
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device() {
        return (0, _themes.isGeneric)(themeName);
      },
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
  _init() {
    super._init();
    this.$element().addClass(LOADINDICATOR_CLASS);
    const label = _message.default.format('Loading');
    const aria = {
      role: 'alert',
      label
    };
    this.setAria(aria);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  }
  _renderWrapper() {
    this._$wrapper = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_WRAPPER_CLASS);
    this.$element().append(this._$wrapper);
  }
  _renderIndicatorContent() {
    this._$content = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_CONTENT_CLASS);
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      viaImage,
      indicatorSrc
    } = this.option();
    if (_m_support.default.animation() && !viaImage && !indicatorSrc) {
      // B236922
      this._renderMarkupForAnimation();
    } else {
      this._renderMarkupForImage();
    }
  }
  _renderMarkupForAnimation() {
    const animatingSegmentInner = this.option('_animatingSegmentInner');
    this._$indicator = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_ICON_CLASS);
    this._$content.append(this._$indicator);
    // Indicator markup
    // @ts-expect-error ts-error
    for (let i = this.option('_animatingSegmentCount'); i >= 0; --i) {
      const $segment = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_CLASS)
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
      .addClass(LOADINDICATOR_SEGMENT_CLASS + i);
      if (animatingSegmentInner) {
        $segment.append((0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_INNER_CLASS));
      }
      this._$indicator.append($segment);
    }
  }
  _renderMarkupForImage() {
    const {
      indicatorSrc
    } = this.option();
    if (indicatorSrc) {
      this._$wrapper.addClass(LOADINDICATOR_IMAGE_CLASS);
      this._$wrapper.css('backgroundImage', `url(${indicatorSrc})`);
    } else if (_m_support.default.animation()) {
      this._renderMarkupForAnimation();
    }
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updateContentSizeForAnimation();
  }
  _updateContentSizeForAnimation() {
    if (!this._$indicator) {
      return;
    }
    let width = this.option('width');
    let height = this.option('height');
    if (width || height) {
      width = (0, _size.getWidth)(this.$element());
      height = (0, _size.getHeight)(this.$element());
      // @ts-expect-error ts-error
      const minDimension = Math.min(height, width);
      this._$wrapper.css({
        height: minDimension,
        width: minDimension,
        fontSize: minDimension
      });
    }
  }
  _clean() {
    super._clean();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  }
  _removeMarkupForAnimation() {
    if (!this._$indicator) {
      return;
    }
    this._$indicator.remove();
    delete this._$indicator;
  }
  _removeMarkupForImage() {
    this._$wrapper.css('backgroundImage', 'none');
  }
  _optionChanged(args) {
    switch (args.name) {
      case '_animatingSegmentCount':
      case '_animatingSegmentInner':
      case 'indicatorSrc':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxLoadIndicator', LoadIndicator);
var _default = exports.default = LoadIndicator;
