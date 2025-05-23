/**
* DevExtreme (esm/ui/speed_dial_action/speed_dial_item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import eventsEngine from '../../events/core/events_engine';
import { addNamespace } from '../../events/utils/index';
import { name as clickEventName } from '../../events/click';
import { getImageContainer } from '../../core/utils/icon';
import Overlay from '../overlay/ui.overlay';
import { render } from '../widget/utils.ink_ripple';
import { isMaterial } from '../themes';
import { isPlainObject } from '../../core/utils/type';
var FAB_CLASS = 'dx-fa-button';
var FAB_ICON_CLASS = 'dx-fa-button-icon';
var FAB_LABEL_CLASS = 'dx-fa-button-label';
var FAB_LABEL_WRAPPER_CLASS = 'dx-fa-button-label-wrapper';
var FAB_CONTENT_REVERSE_CLASS = 'dx-fa-button-content-reverse';
var OVERLAY_CONTENT_SELECTOR = '.dx-overlay-content';
class SpeedDialItem extends Overlay {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      shading: false,
      useInkRipple: false,
      callOverlayRenderShading: false,
      width: 'auto',
      zIndex: 1500,
      _observeContentResize: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return isMaterial();
      },
      options: {
        useInkRipple: true
      }
    }]);
  }
  _moveToContainer() {
    this._$wrapper.appendTo(this.$element());
    this._$content.appendTo(this._$wrapper);
  }
  _render() {
    this.$element().addClass(FAB_CLASS);
    this._renderIcon();
    this._renderLabel();
    super._render();
    this.option('useInkRipple') && this._renderInkRipple();
    this._renderClick();
  }
  _renderLabel() {
    !!this._$label && this._$label.remove();
    var labelText = this.option('label');
    if (!labelText) {
      this._$label = null;
      return;
    }
    var $element = $('<div>').addClass(FAB_LABEL_CLASS);
    var $wrapper = $('<div>').addClass(FAB_LABEL_WRAPPER_CLASS);
    this._$label = $wrapper.prependTo(this.$content()).append($element.text(labelText));
    this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option('parentPosition')));
  }
  _isPositionLeft(position) {
    var currentLocation = '';
    if (position) {
      if (isPlainObject(position) && position.at) {
        if (position.at.x) {
          currentLocation = position.at.x;
        } else {
          currentLocation = position.at;
        }
      } else {
        if (typeof position === 'string') {
          currentLocation = position;
        }
      }
    }
    return currentLocation.split(' ')[0] === 'left';
  }
  _renderButtonIcon($element, icon, iconClass) {
    !!$element && $element.remove();
    $element = $('<div>').addClass(iconClass);
    var $iconElement = getImageContainer(icon);
    $element.append($iconElement).appendTo(this.$content());
    return $element;
  }
  _renderIcon() {
    this._$icon = this._renderButtonIcon(this._$icon, this._options.silent('icon'), FAB_ICON_CLASS);
  }
  _renderWrapper() {
    if (this._options.silent('callOverlayRenderShading')) {
      super._renderWrapper();
    }
  }
  _getVisibleActions(actions) {
    var currentActions = actions || this.option('actions') || [];
    return currentActions.filter(action => action.option('visible'));
  }
  _getActionComponent() {
    if (this._getVisibleActions().length === 1) {
      return this._getVisibleActions()[0];
    } else {
      return this.option('actionComponent') || this.option('actions')[0];
    }
  }
  _initContentReadyAction() {
    this._contentReadyAction = this._getActionComponent()._createActionByOption('onContentReady', {
      excludeValidators: ['disabled', 'readOnly']
    }, true);
  }
  _fireContentReadyAction() {
    this._contentReadyAction({
      actionElement: this.$element()
    });
  }
  _updateZIndexStackPosition() {
    var zIndex = this.option('zIndex');
    this._$wrapper.css('zIndex', zIndex);
    this._$content.css('zIndex', zIndex);
  }
  _setClickAction() {
    var eventName = addNamespace(clickEventName, this.NAME);
    var overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);
    eventsEngine.off(overlayContent, eventName);
    eventsEngine.on(overlayContent, eventName, e => {
      var clickActionArgs = {
        event: e,
        actionElement: this.element(),
        element: this._getActionComponent().$element()
      };
      this._clickAction(clickActionArgs);
    });
  }
  _defaultActionArgs() {
    return {
      component: this._getActionComponent()
    };
  }
  _renderClick() {
    this._clickAction = this._getActionComponent()._createActionByOption('onClick');
    this._setClickAction();
  }
  _renderInkRipple() {
    this._inkRipple = render();
  }
  _getInkRippleContainer() {
    return this._$icon;
  }
  _toggleActiveState($element, value, e) {
    super._toggleActiveState.apply(this, arguments);
    if (!this._inkRipple) {
      return;
    }
    var config = {
      element: this._getInkRippleContainer(),
      event: e
    };
    if (value) {
      this._inkRipple.showWave(config);
    } else {
      this._inkRipple.hideWave(config);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'icon':
        this._renderIcon();
        break;
      case 'onClick':
        this._renderClick();
        break;
      case 'label':
        this._renderLabel();
        break;
      case 'visible':
        this._currentVisible = args.previousValue;
        args.value ? this._show() : this._hide();
        break;
      case 'useInkRipple':
        this._render();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default SpeedDialItem;
