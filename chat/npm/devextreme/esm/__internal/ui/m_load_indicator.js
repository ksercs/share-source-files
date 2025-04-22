/**
* DevExtreme (esm/__internal/ui/m_load_indicator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import $ from '../../core/renderer';
import { getHeight, getWidth } from '../../core/utils/size';
import { getNavigator } from '../../core/utils/window';
import { current, isGeneric, isMaterialBased } from '../../ui/themes';
import Widget from '../core/widget/widget';
import supportUtils from '../core/utils/m_support';
const navigator = getNavigator();
const LOADINDICATOR_CLASS = 'dx-loadindicator';
const LOADINDICATOR_WRAPPER_CLASS = 'dx-loadindicator-wrapper';
const LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
const LOADINDICATOR_ICON_CLASS = 'dx-loadindicator-icon';
const LOADINDICATOR_SEGMENT_CLASS = 'dx-loadindicator-segment';
const LOADINDICATOR_SEGMENT_INNER_CLASS = 'dx-loadindicator-segment-inner';
const LOADINDICATOR_IMAGE_CLASS = 'dx-loadindicator-image';
class LoadIndicator extends Widget {
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
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = devices.real();
        const obsoleteAndroid = realDevice.platform === 'android' && !/chrome/i.test(navigator.userAgent);
        return obsoleteAndroid;
      },
      options: {
        viaImage: true
      }
    }, {
      device() {
        return isMaterialBased(themeName);
      },
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device() {
        return isGeneric(themeName);
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
    const label = messageLocalization.format('Loading');
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
    this._$wrapper = $('<div>').addClass(LOADINDICATOR_WRAPPER_CLASS);
    this.$element().append(this._$wrapper);
  }
  _renderIndicatorContent() {
    this._$content = $('<div>').addClass(LOADINDICATOR_CONTENT_CLASS);
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      viaImage,
      indicatorSrc
    } = this.option();
    if (supportUtils.animation() && !viaImage && !indicatorSrc) {
      // B236922
      this._renderMarkupForAnimation();
    } else {
      this._renderMarkupForImage();
    }
  }
  _renderMarkupForAnimation() {
    const animatingSegmentInner = this.option('_animatingSegmentInner');
    this._$indicator = $('<div>').addClass(LOADINDICATOR_ICON_CLASS);
    this._$content.append(this._$indicator);
    // Indicator markup
    // @ts-expect-error ts-error
    for (let i = this.option('_animatingSegmentCount'); i >= 0; --i) {
      const $segment = $('<div>').addClass(LOADINDICATOR_SEGMENT_CLASS)
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
      .addClass(LOADINDICATOR_SEGMENT_CLASS + i);
      if (animatingSegmentInner) {
        $segment.append($('<div>').addClass(LOADINDICATOR_SEGMENT_INNER_CLASS));
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
    } else if (supportUtils.animation()) {
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
      width = getWidth(this.$element());
      height = getHeight(this.$element());
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
registerComponent('dxLoadIndicator', LoadIndicator);
export default LoadIndicator;
