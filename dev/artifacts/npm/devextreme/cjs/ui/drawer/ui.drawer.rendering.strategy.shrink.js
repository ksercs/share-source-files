/**
* DevExtreme (cjs/ui/drawer/ui.drawer.rendering.strategy.shrink.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiDrawer = require("./ui.drawer.animation");
var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _inflector = require("../../core/utils/inflector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ShrinkStrategy = /*#__PURE__*/function (_DrawerStrategy) {
  _inheritsLoose(ShrinkStrategy, _DrawerStrategy);
  function ShrinkStrategy() {
    return _DrawerStrategy.apply(this, arguments) || this;
  }
  var _proto = ShrinkStrategy.prototype;
  _proto._internalRenderPosition = function _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    var drawer = this.getDrawerInstance();
    var direction = drawer.calcTargetPosition();
    var $panel = (0, _renderer.default)(drawer.content());
    var panelSize = this._getPanelSize(drawer.option('opened'));
    var panelOffset = this._getPanelOffset(drawer.option('opened'));
    var revealMode = drawer.option('revealMode');
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        _uiDrawer.animation.margin({
          complete: function complete() {
            whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: drawer.option('animationDuration'),
          direction: direction,
          margin: panelOffset
        });
      } else if (revealMode === 'expand') {
        _uiDrawer.animation.size({
          complete: function complete() {
            whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: drawer.option('animationDuration'),
          direction: direction,
          size: panelSize
        });
      }
    } else {
      if (revealMode === 'slide') {
        $panel.css('margin' + (0, _inflector.camelize)(direction, true), panelOffset);
      } else if (revealMode === 'expand') {
        $panel.css(drawer.isHorizontalDirection() ? 'width' : 'height', panelSize);
      }
    }
  };
  _proto.isViewContentFirst = function isViewContentFirst(position, isRtl) {
    return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
  };
  return ShrinkStrategy;
}(_uiDrawerRendering.default);
var _default = ShrinkStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
