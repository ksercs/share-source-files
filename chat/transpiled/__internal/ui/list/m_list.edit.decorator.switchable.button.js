"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _themes = require("../../../ui/themes");
var _m_listEditDecorator = _interopRequireDefault(require("./m_list.edit.decorator.switchable"));
var _m_listEdit = require("./m_list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-switchable-delete-button-container';
const SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS = 'dx-list-switchable-delete-button-wrapper';
const SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS = 'dx-list-switchable-delete-button-inner-wrapper';
const SWITCHABLE_DELETE_BUTTON_CLASS = 'dx-list-switchable-delete-button';
const SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION = 200;
class SwitchableButtonEditDecorator extends _m_listEditDecorator.default {
  _init() {
    // @ts-expect-error ts-error
    super._init.apply(this, arguments);
    const $buttonContainer = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CONTAINER_CLASS);
    const $buttonWrapper = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_WRAPPER_CLASS);
    const $buttonInnerWrapper = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_INNER_WRAPPER_CLASS);
    const $button = (0, _renderer.default)('<div>').addClass(SWITCHABLE_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, _button.default, {
      text: _message.default.format('dxListEditDecorator-delete'),
      type: 'danger',
      // @ts-expect-error ts-error
      stylingMode: (0, _themes.isMaterialBased)() ? 'text' : 'contained',
      onClick: function (e) {
        this._deleteItem();
        e.event.stopPropagation();
      }.bind(this),
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $buttonContainer.append($buttonWrapper);
    $buttonWrapper.append($buttonInnerWrapper);
    $buttonInnerWrapper.append($button);
    this._$buttonContainer = $buttonContainer;
  }
  _enablePositioning($itemElement) {
    // @ts-expect-error ts-error
    super._enablePositioning.apply(this, arguments);
    // @ts-expect-error ts-error
    _animation.fx.stop(this._$buttonContainer, true);
    this._$buttonContainer.appendTo($itemElement);
  }
  _disablePositioning() {
    // @ts-expect-error ts-error
    super._disablePositioning.apply(this, arguments);
    this._$buttonContainer.detach();
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  _animatePrepareDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = (0, _size.getWidth)(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth : -buttonWidth;
    const toValue = rtl ? listWidth - buttonWidth : 0;
    // @ts-expect-error ts-error
    return _animation.fx.animate(this._$buttonContainer, {
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      from: {
        right: fromValue
      },
      to: {
        right: toValue
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  _animateForgetDeleteReady() {
    const rtl = this._isRtlEnabled();
    const listWidth = (0, _size.getWidth)(this._list.$element());
    const buttonWidth = this._buttonWidth();
    const fromValue = rtl ? listWidth - buttonWidth : 0;
    const toValue = rtl ? listWidth : -buttonWidth;
    // @ts-expect-error ts-error
    return _animation.fx.animate(this._$buttonContainer, {
      type: 'custom',
      duration: SWITCHABLE_DELETE_BUTTON_ANIMATION_DURATION,
      from: {
        right: fromValue
      },
      to: {
        right: toValue
      }
    });
  }
  _buttonWidth() {
    if (!this._buttonContainerWidth) {
      this._buttonContainerWidth = (0, _size.getOuterWidth)(this._$buttonContainer);
    }
    return this._buttonContainerWidth;
  }
  dispose() {
    if (this._$buttonContainer) {
      this._$buttonContainer.remove();
    }
    // @ts-expect-error ts-error
    super.dispose.apply(this, arguments);
  }
}
const TOGGLE_DELETE_SWITCH_CONTAINER_CLASS = 'dx-list-toggle-delete-switch-container';
const TOGGLE_DELETE_SWITCH_CLASS = 'dx-list-toggle-delete-switch';
class SwitchableButtonToggleEditDecorator extends SwitchableButtonEditDecorator {
  beforeBag(config) {
    const {
      $itemElement
    } = config;
    const {
      $container
    } = config;
    const $toggle = (0, _renderer.default)('<div>').addClass(TOGGLE_DELETE_SWITCH_CLASS);
    this._list._createComponent($toggle, _button.default, {
      icon: 'toggle-delete',
      onClick: function (e) {
        _animation.fx.stop(this._$buttonContainer, false);
        this._toggleDeleteReady($itemElement);
        e.event.stopPropagation();
      }.bind(this),
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $container.addClass(TOGGLE_DELETE_SWITCH_CONTAINER_CLASS);
    $container.append($toggle);
  }
}
(0, _m_listEdit.register)('delete', 'toggle', SwitchableButtonToggleEditDecorator);
class SwitchableButtonSlideEditDecorator extends SwitchableButtonEditDecorator {
  // eslint-disable-next-line class-methods-use-this
  _shouldHandleSwipe() {
    return true;
  }
  _swipeEndHandler($itemElement, args) {
    if (args.targetOffset !== 0) {
      // @ts-expect-error ts-error
      _animation.fx.stop(this._$buttonContainer, false);
      this._toggleDeleteReady($itemElement);
    }
    return true;
  }
}
(0, _m_listEdit.register)('delete', 'slideButton', SwitchableButtonSlideEditDecorator);
var _default = exports.default = SwitchableButtonEditDecorator;