/**
* DevExtreme (esm/ui/toast/ui.toast.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
import eventsEngine from '../../events/core/events_engine';
import readyCallbacks from '../../core/utils/ready_callbacks';
import { isString } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import pointerEvents from '../../events/pointer';
import registerComponent from '../../core/component_registrator';
import Overlay from '../overlay/ui.overlay';
import { isMaterial } from '../themes';
var ready = readyCallbacks.add;

// STYLE toast

var TOAST_CLASS = 'dx-toast';
var TOAST_CLASS_PREFIX = TOAST_CLASS + '-';
var TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + 'wrapper';
var TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + 'content';
var TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + 'message';
var TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + 'icon';
var WIDGET_NAME = 'dxToast';
var toastTypes = ['info', 'warning', 'error', 'success'];
var TOAST_STACK = [];
var FIRST_Z_INDEX_OFFSET = 8000;
var POSITION_ALIASES = {
  'top': {
    my: 'top',
    at: 'top',
    of: null,
    offset: '0 0'
  },
  'bottom': {
    my: 'bottom',
    at: 'bottom',
    of: null,
    offset: '0 -20'
  },
  'center': {
    my: 'center',
    at: 'center',
    of: null,
    offset: '0 0'
  },
  'right': {
    my: 'center right',
    at: 'center right',
    of: null,
    offset: '0 0'
  },
  'left': {
    my: 'center left',
    at: 'center left',
    of: null,
    offset: '0 0'
  }
};
var DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
var DEFAULT_MARGIN = 20;
ready(function () {
  eventsEngine.subscribeGlobal(domAdapter.getDocument(), pointerEvents.down, function (e) {
    for (var i = TOAST_STACK.length - 1; i >= 0; i--) {
      if (!TOAST_STACK[i]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var Toast = Overlay.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      message: '',
      type: 'info',
      displayTime: 2000,
      position: 'bottom center',
      animation: {
        show: {
          type: 'fade',
          duration: 400,
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          duration: 400,
          from: 1,
          to: 0
        }
      },
      shading: false,
      /**
      * @name dxToastOptions.disabled
      * @hidden
      */

      height: 'auto',
      hideTopOverlayHandler: null,
      preventScrollEvents: false,
      closeOnSwipe: true,
      closeOnClick: false
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    var tabletAndMobileAnimation = {
      show: {
        type: 'fade',
        duration: 200,
        from: 0,
        to: 1
      },
      hide: {
        type: 'fade',
        duration: 200,
        from: 1,
        to: 0
      }
    };
    var tabletAndMobileCommonOptions = {
      displayTime: isMaterial() ? 4000 : 2000,
      hideOnOutsideClick: true,
      animation: tabletAndMobileAnimation
    };
    return this.callBase().concat([{
      device(device) {
        return device.deviceType === 'phone';
      },
      options: _extends({
        width: "calc(100vw - ".concat(DEFAULT_MARGIN * 2, "px)")
      }, tabletAndMobileCommonOptions)
    }, {
      device(device) {
        return device.deviceType === 'tablet';
      },
      options: _extends({
        width: 'auto',
        maxWidth: '80vw'
      }, tabletAndMobileCommonOptions)
    }, {
      device(device) {
        return isMaterial() && device.deviceType === 'desktop';
      },
      options: {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4000
      }
    }]);
  },
  _init: function _init() {
    this.callBase();
    this._posStringToObject();
  },
  _renderContentImpl: function _renderContentImpl() {
    this._message = $('<div>').addClass(TOAST_MESSAGE_CLASS).text(this.option('message')).appendTo(this.$content());
    this.setAria('role', 'alert', this._message);
    if (toastTypes.includes(this.option('type').toLowerCase())) {
      this.$content().prepend($('<div>').addClass(TOAST_ICON_CLASS));
    }
    this.callBase();
  },
  _render: function _render() {
    this.callBase();
    this.$element().addClass(TOAST_CLASS);
    this.$wrapper().addClass(TOAST_WRAPPER_CLASS);
    this.$content().addClass(TOAST_CLASS_PREFIX + String(this.option('type')).toLowerCase());
    this.$content().addClass(TOAST_CONTENT_CLASS);
    this._toggleCloseEvents('Swipe');
    this._toggleCloseEvents('Click');
  },
  _toggleCloseEvents: function _toggleCloseEvents(event) {
    var dxEvent = 'dx' + event.toLowerCase();
    eventsEngine.off(this.$content(), dxEvent);
    this.option('closeOn' + event) && eventsEngine.on(this.$content(), dxEvent, this.hide.bind(this));
  },
  _posStringToObject: function _posStringToObject() {
    if (!isString(this.option('position'))) return;
    var verticalPosition = this.option('position').split(' ')[0];
    var horizontalPosition = this.option('position').split(' ')[1];
    this.option('position', extend({
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    }, POSITION_ALIASES[verticalPosition]));
    switch (horizontalPosition) {
      case 'center':
      case 'left':
      case 'right':
        this.option('position').at += ' ' + horizontalPosition;
        this.option('position').my += ' ' + horizontalPosition;
        break;
    }
  },
  _show: function _show() {
    return this.callBase.apply(this, arguments).always(function () {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = setTimeout(this.hide.bind(this), this.option('displayTime'));
    }.bind(this));
  },
  _overlayStack: function _overlayStack() {
    return TOAST_STACK;
  },
  _zIndexInitValue: function _zIndexInitValue() {
    return this.callBase() + FIRST_Z_INDEX_OFFSET;
  },
  _dispose: function _dispose() {
    clearTimeout(this._hideTimeout);
    this.callBase();
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'type':
        this.$content().removeClass(TOAST_CLASS_PREFIX + args.previousValue);
        this.$content().addClass(TOAST_CLASS_PREFIX + String(args.value).toLowerCase());
        break;
      case 'message':
        if (this._message) {
          this._message.text(args.value);
        }
        break;
      case 'closeOnSwipe':
        this._toggleCloseEvents('Swipe');
        break;
      case 'closeOnClick':
        this._toggleCloseEvents('Click');
        break;
      case 'displayTime':
        break;
      default:
        this.callBase(args);
    }
  }
});
registerComponent(WIDGET_NAME, Toast);
export default Toast;
