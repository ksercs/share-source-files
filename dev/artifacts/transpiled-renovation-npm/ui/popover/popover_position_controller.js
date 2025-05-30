"use strict";

exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _position = _interopRequireDefault(require("../../animation/position"));
var _common = require("../../core/utils/common");
var _utils = require("../../renovation/ui/resizable/utils");
var _size = require("../../core/utils/size");
var _overlay_position_controller = require("../overlay/overlay_position_controller");
var _excluded = ["shading", "target", "$arrow"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var WEIGHT_OF_SIDES = {
  'left': -1,
  'top': -1,
  'center': 0,
  'right': 1,
  'bottom': 1
};
var POPOVER_POSITION_ALIASES = {
  // NOTE: public API
  'top': {
    my: 'bottom center',
    at: 'top center',
    collision: 'fit flip'
  },
  'bottom': {
    my: 'top center',
    at: 'bottom center',
    collision: 'fit flip'
  },
  'right': {
    my: 'left center',
    at: 'right center',
    collision: 'flip fit'
  },
  'left': {
    my: 'right center',
    at: 'left center',
    collision: 'flip fit'
  }
};
exports.POPOVER_POSITION_ALIASES = POPOVER_POSITION_ALIASES;
var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
  h: 10,
  v: 10
};
var PopoverPositionController = /*#__PURE__*/function (_OverlayPositionContr) {
  _inheritsLoose(PopoverPositionController, _OverlayPositionContr);
  function PopoverPositionController(_ref) {
    var _this;
    var shading = _ref.shading,
      target = _ref.target,
      $arrow = _ref.$arrow,
      args = _objectWithoutProperties(_ref, _excluded);
    _this = _OverlayPositionContr.call(this, args) || this;
    _this._props = _extends({}, _this._props, {
      shading,
      target
    });
    _this._$arrow = $arrow;
    _this._positionSide = undefined;
    _this.updatePosition(_this._props.position);
    return _this;
  }
  var _proto = PopoverPositionController.prototype;
  _proto.positionWrapper = function positionWrapper() {
    if (this._props.shading) {
      this._$wrapper.css({
        top: 0,
        left: 0
      });
    }
  };
  _proto.updateTarget = function updateTarget(target) {
    this._props.target = target;
    this.updatePosition(this._props.position);
  };
  _proto._renderBoundaryOffset = function _renderBoundaryOffset() {};
  _proto._getContainerPosition = function _getContainerPosition() {
    var offset = (0, _common.pairToObject)(this._position.offset || '');
    var hOffset = offset.h,
      vOffset = offset.v;
    var isVerticalSide = this._isVerticalSide();
    var isHorizontalSide = this._isHorizontalSide();
    if (isVerticalSide || isHorizontalSide) {
      var isPopoverInside = this._isPopoverInside();
      var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
      var arrowSize = isVerticalSide ? (0, _size.getHeight)(this._$arrow) : (0, _size.getWidth)(this._$arrow);
      var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
      var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
      isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset;
    }
    return (0, _extend.extend)({}, this._position, {
      offset: hOffset + ' ' + vOffset
    });
  };
  _proto._getContentBorderWidth = function _getContentBorderWidth(side) {
    var borderWidth = this._$content.css(_utils.borderWidthStyles[side]);
    return parseInt(borderWidth) || 0;
  };
  _proto._isPopoverInside = function _isPopoverInside() {
    var my = _position.default.setup.normalizeAlign(this._position.my);
    var at = _position.default.setup.normalizeAlign(this._position.at);
    return my.h === at.h && my.v === at.v;
  };
  _proto._isVerticalSide = function _isVerticalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'top' || side === 'bottom';
  };
  _proto._isHorizontalSide = function _isHorizontalSide() {
    var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
    return side === 'left' || side === 'right';
  };
  _proto._getDisplaySide = function _getDisplaySide(position) {
    var my = _position.default.setup.normalizeAlign(position.my);
    var at = _position.default.setup.normalizeAlign(position.at);
    var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
    var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
    var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
    return horizontalWeight > verticalWeight ? at.h : at.v;
  };
  _proto._normalizePosition = function _normalizePosition(positionProp) {
    var defaultPositionConfig = {
      of: this._props.target,
      boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
    };
    var resultPosition;
    if ((0, _type.isDefined)(positionProp)) {
      resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    } else {
      resultPosition = defaultPositionConfig;
    }
    this._positionSide = this._getDisplaySide(resultPosition);
    return resultPosition;
  };
  _proto._positionToObject = function _positionToObject(positionProp) {
    if ((0, _type.isString)(positionProp)) {
      return (0, _extend.extend)({}, POPOVER_POSITION_ALIASES[positionProp]);
    }
    return positionProp;
  };
  return PopoverPositionController;
}(_overlay_position_controller.OverlayPositionController);
exports.PopoverPositionController = PopoverPositionController;