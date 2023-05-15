/**
* DevExtreme (esm/ui/validation_message.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getOuterWidth } from '../core/utils/size';
import $ from '../core/renderer';
import registerComponent from '../core/component_registrator';
import Overlay from './overlay/ui.overlay';
import { extend } from '../core/utils/extend';
import { encodeHtml } from '../core/utils/string';
import { getDefaultAlignment } from '../core/utils/position';
var INVALID_MESSAGE = 'dx-invalid-message';
var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
var INVALID_MESSAGE_ALWAYS = 'dx-invalid-message-always';
var INVALID_MESSAGE_CONTENT = 'dx-invalid-message-content';
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = Overlay.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      integrationOptions: {},
      templatesRenderAsynchronously: false,
      shading: false,
      width: 'auto',
      height: 'auto',
      hideOnOutsideClick: false,
      animation: null,
      visible: true,
      propagateOutsideClick: true,
      _checkParentVisibility: false,
      rtlEnabled: false,
      contentTemplate: this._renderInnerHtml,
      maxWidth: '100%',
      container: this.$element(),
      target: undefined,
      mode: 'auto',
      validationErrors: undefined,
      preventScrollEvents: false,
      positionSide: 'top',
      boundary: undefined,
      offset: {
        h: 0,
        v: 0
      },
      contentId: undefined
    });
  },
  _init() {
    this.callBase();
    this.updateMaxWidth();
    this._updatePosition();
  },
  _initMarkup() {
    this.callBase();
    this._ensureMessageNotEmpty();
    this._updatePositionByTarget();
    this._toggleModeClass();
    this._updateContentId();
  },
  _updatePositionByTarget: function _updatePositionByTarget() {
    var {
      target
    } = this.option();
    this.option('position.of', target);
  },
  _ensureMessageNotEmpty: function _ensureMessageNotEmpty() {
    this._textMarkup = this._getTextMarkup();
    var shouldShowMessage = this.option('visible') && this._textMarkup;
    this._toggleVisibilityClasses(shouldShowMessage);
  },
  _toggleVisibilityClasses: function _toggleVisibilityClasses(visible) {
    if (visible) {
      this.$element().addClass(INVALID_MESSAGE);
      this.$wrapper().addClass(INVALID_MESSAGE);
    } else {
      this.$element().removeClass(INVALID_MESSAGE);
      this.$wrapper().removeClass(INVALID_MESSAGE);
    }
  },
  _updateContentId() {
    var {
      container,
      contentId
    } = this.option();
    var id = contentId !== null && contentId !== void 0 ? contentId : $(container).attr('aria-describedby');
    this.$content().addClass(INVALID_MESSAGE_CONTENT).attr('id', id);
  },
  _renderInnerHtml(element) {
    var $element = element && $(element);
    $element === null || $element === void 0 ? void 0 : $element.html(this._textMarkup);
  },
  _getTextMarkup() {
    var _this$option;
    var validationErrors = (_this$option = this.option('validationErrors')) !== null && _this$option !== void 0 ? _this$option : [];
    var validationErrorMessage = '';
    validationErrors.forEach(err => {
      var _err$message;
      var separator = validationErrorMessage ? '<br />' : '';
      validationErrorMessage += separator + encodeHtml((_err$message = err === null || err === void 0 ? void 0 : err.message) !== null && _err$message !== void 0 ? _err$message : '');
    });
    return validationErrorMessage;
  },
  _toggleModeClass() {
    var mode = this.option('mode');
    this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, mode === 'auto').toggleClass(INVALID_MESSAGE_ALWAYS, mode === 'always');
  },
  updateMaxWidth() {
    var target = this.option('target');
    var targetWidth = getOuterWidth(target);
    var maxWidth = '100%';
    if (targetWidth) {
      maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH);
    }
    this.option({
      maxWidth
    });
  },
  _getPositionsArray: function _getPositionsArray(positionSide, rtlSide) {
    switch (positionSide) {
      case 'top':
        return ["".concat(rtlSide, " bottom"), "".concat(rtlSide, " top")];
      case 'left':
        return ['right', 'left'];
      case 'right':
        return ['left', 'right'];
      default:
        return ["".concat(rtlSide, " top"), "".concat(rtlSide, " bottom")];
    }
  },
  _updatePosition: function _updatePosition() {
    var {
      positionSide,
      rtlEnabled,
      offset: componentOffset,
      boundary
    } = this.option();
    var rtlSide = getDefaultAlignment(rtlEnabled);
    var positions = this._getPositionsArray(positionSide, rtlSide);
    var offset = _extends({}, componentOffset);
    this.$element().addClass("dx-invalid-message-".concat(positionSide));
    if (rtlEnabled && positionSide !== 'left' && positionSide !== 'right') offset.h = -offset.h;
    if (positionSide === 'top') offset.v = -offset.v;
    if (positionSide === 'left') offset.h = -offset.h;
    this.option('position', {
      offset,
      boundary,
      my: positions[0],
      at: positions[1],
      collision: 'none flip'
    });
  },
  _optionChanged(args) {
    var {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'target':
        this._updatePositionByTarget();
        this.updateMaxWidth();
        this.callBase(args);
        break;
      case 'boundary':
        this.option('position.boundary', value);
        break;
      case 'mode':
        this._toggleModeClass(value);
        break;
      case 'rtlEnabled':
      case 'offset':
      case 'positionSide':
        this.$element().removeClass("dx-invalid-message-".concat(previousValue));
        this._updatePosition();
        break;
      case 'container':
        this._updateContentId();
        this.callBase(args);
        break;
      case 'contentId':
        this._updateContentId();
        break;
      case 'validationErrors':
        this._ensureMessageNotEmpty();
        this._renderInnerHtml(this.$content());
        break;
      default:
        this.callBase(args);
    }
  }
});
registerComponent('dxValidationMessage', ValidationMessage);
export default ValidationMessage;
