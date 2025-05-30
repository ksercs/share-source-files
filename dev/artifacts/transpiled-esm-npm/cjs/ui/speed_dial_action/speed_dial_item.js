"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _click = require("../../events/click");
var _icon = require("../../core/utils/icon");
var _ui = _interopRequireDefault(require("../overlay/ui.overlay"));
var _utils = require("../widget/utils.ink_ripple");
var _themes = require("../themes");
var _type = require("../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FAB_CLASS = 'dx-fa-button';
var FAB_ICON_CLASS = 'dx-fa-button-icon';
var FAB_LABEL_CLASS = 'dx-fa-button-label';
var FAB_LABEL_WRAPPER_CLASS = 'dx-fa-button-label-wrapper';
var FAB_CONTENT_REVERSE_CLASS = 'dx-fa-button-content-reverse';
var OVERLAY_CONTENT_SELECTOR = '.dx-overlay-content';
var SpeedDialItem = /*#__PURE__*/function (_Overlay) {
  _inheritsLoose(SpeedDialItem, _Overlay);
  function SpeedDialItem() {
    return _Overlay.apply(this, arguments) || this;
  }
  var _proto = SpeedDialItem.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Overlay.prototype._getDefaultOptions.call(this), {
      shading: false,
      useInkRipple: false,
      callOverlayRenderShading: false,
      width: 'auto',
      zIndex: 1500,
      _observeContentResize: false
    });
  };
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    return _Overlay.prototype._defaultOptionsRules.call(this).concat([{
      device() {
        return (0, _themes.isMaterial)();
      },
      options: {
        useInkRipple: true
      }
    }]);
  };
  _proto._moveToContainer = function _moveToContainer() {
    this._$wrapper.appendTo(this.$element());
    this._$content.appendTo(this._$wrapper);
  };
  _proto._render = function _render() {
    this.$element().addClass(FAB_CLASS);
    this._renderIcon();
    this._renderLabel();
    _Overlay.prototype._render.call(this);
    this.option('useInkRipple') && this._renderInkRipple();
    this._renderClick();
  };
  _proto._renderLabel = function _renderLabel() {
    !!this._$label && this._$label.remove();
    var labelText = this.option('label');
    if (!labelText) {
      this._$label = null;
      return;
    }
    var $element = (0, _renderer.default)('<div>').addClass(FAB_LABEL_CLASS);
    var $wrapper = (0, _renderer.default)('<div>').addClass(FAB_LABEL_WRAPPER_CLASS);
    this._$label = $wrapper.prependTo(this.$content()).append($element.text(labelText));
    this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option('parentPosition')));
  };
  _proto._isPositionLeft = function _isPositionLeft(position) {
    var currentLocation = '';
    if (position) {
      if ((0, _type.isPlainObject)(position) && position.at) {
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
  };
  _proto._renderButtonIcon = function _renderButtonIcon($element, icon, iconClass) {
    !!$element && $element.remove();
    $element = (0, _renderer.default)('<div>').addClass(iconClass);
    var $iconElement = (0, _icon.getImageContainer)(icon);
    $element.append($iconElement).appendTo(this.$content());
    return $element;
  };
  _proto._renderIcon = function _renderIcon() {
    this._$icon = this._renderButtonIcon(this._$icon, this._options.silent('icon'), FAB_ICON_CLASS);
  };
  _proto._renderWrapper = function _renderWrapper() {
    if (this._options.silent('callOverlayRenderShading')) {
      _Overlay.prototype._renderWrapper.call(this);
    }
  };
  _proto._getVisibleActions = function _getVisibleActions(actions) {
    var currentActions = actions || this.option('actions') || [];
    return currentActions.filter(function (action) {
      return action.option('visible');
    });
  };
  _proto._getActionComponent = function _getActionComponent() {
    if (this._getVisibleActions().length === 1) {
      return this._getVisibleActions()[0];
    } else {
      return this.option('actionComponent') || this.option('actions')[0];
    }
  };
  _proto._initContentReadyAction = function _initContentReadyAction() {
    this._contentReadyAction = this._getActionComponent()._createActionByOption('onContentReady', {
      excludeValidators: ['disabled', 'readOnly']
    }, true);
  };
  _proto._fireContentReadyAction = function _fireContentReadyAction() {
    this._contentReadyAction({
      actionElement: this.$element()
    });
  };
  _proto._updateZIndexStackPosition = function _updateZIndexStackPosition() {
    var zIndex = this.option('zIndex');
    this._$wrapper.css('zIndex', zIndex);
    this._$content.css('zIndex', zIndex);
  };
  _proto._setClickAction = function _setClickAction() {
    var _this = this;
    var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
    var overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);
    _events_engine.default.off(overlayContent, eventName);
    _events_engine.default.on(overlayContent, eventName, function (e) {
      var clickActionArgs = {
        event: e,
        actionElement: _this.element(),
        element: _this._getActionComponent().$element()
      };
      _this._clickAction(clickActionArgs);
    });
  };
  _proto._defaultActionArgs = function _defaultActionArgs() {
    return {
      component: this._getActionComponent()
    };
  };
  _proto._renderClick = function _renderClick() {
    this._clickAction = this._getActionComponent()._createActionByOption('onClick');
    this._setClickAction();
  };
  _proto._renderInkRipple = function _renderInkRipple() {
    this._inkRipple = (0, _utils.render)();
  };
  _proto._getInkRippleContainer = function _getInkRippleContainer() {
    return this._$icon;
  };
  _proto._toggleActiveState = function _toggleActiveState($element, value, e) {
    _Overlay.prototype._toggleActiveState.apply(this, arguments);
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
  };
  _proto._optionChanged = function _optionChanged(args) {
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
        _Overlay.prototype._optionChanged.call(this, args);
    }
  };
  return SpeedDialItem;
}(_ui.default);
var _default = SpeedDialItem;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;