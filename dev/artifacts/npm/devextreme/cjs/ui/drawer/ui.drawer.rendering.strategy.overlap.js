/**
* DevExtreme (cjs/ui/drawer/ui.drawer.rendering.strategy.overlap.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _uiDrawer = require("./ui.drawer.animation");
var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _translator = require("../../animation/translator");
var _ui = _interopRequireDefault(require("../overlay/ui.overlay"));
var _common = require("../../core/utils/common");
var _inflector = require("../../core/utils/inflector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var OverlapStrategy = /*#__PURE__*/function (_DrawerStrategy) {
  _inheritsLoose(OverlapStrategy, _DrawerStrategy);
  function OverlapStrategy() {
    return _DrawerStrategy.apply(this, arguments) || this;
  }
  var _proto = OverlapStrategy.prototype;
  _proto.renderPanelContent = function renderPanelContent(whenPanelContentRendered) {
    var _this = this;
    delete this._initialPosition;
    var drawer = this.getDrawerInstance();
    var _drawer$option = drawer.option(),
      opened = _drawer$option.opened,
      minSize = _drawer$option.minSize;
    drawer._overlay = drawer._createComponent(drawer.content(), _ui.default, {
      shading: false,
      container: drawer.content(),
      visualContainer: drawer.getOverlayTarget(),
      position: this._getOverlayPosition(),
      width: opened ? 'auto' : minSize || 0,
      height: '100%',
      templatesRenderAsynchronously: drawer.option('templatesRenderAsynchronously'),
      animation: {
        show: {
          duration: 0
        }
      },
      onPositioned: function (e) {
        this._fixOverlayPosition(e.component.$content());
      }.bind(this),
      contentTemplate: drawer.option('template'),
      onContentReady: function onContentReady(args) {
        whenPanelContentRendered.resolve();
        _this._processOverlayZIndex(args.component.content());
      },
      visible: true,
      propagateOutsideClick: true
    });
  };
  _proto._fixOverlayPosition = function _fixOverlayPosition($overlayContent) {
    // NOTE: overlay should be positioned in extended wrapper
    var position = (0, _common.ensureDefined)(this._initialPosition, {
      left: 0,
      top: 0
    });
    (0, _translator.move)($overlayContent, position);
    if (this.getDrawerInstance().calcTargetPosition() === 'right') {
      $overlayContent.css('left', 'auto');
    }
    if (this.getDrawerInstance().calcTargetPosition() === 'bottom') {
      $overlayContent.css('top', 'auto');
      $overlayContent.css('bottom', '0px');
    }
  };
  _proto._getOverlayPosition = function _getOverlayPosition() {
    var drawer = this.getDrawerInstance();
    var panelPosition = drawer.calcTargetPosition();
    var result = {};
    switch (panelPosition) {
      case 'left':
        {
          result = {
            my: 'top left',
            at: 'top left'
          };
          break;
        }
      case 'right':
        {
          result = {
            my: drawer.option('rtlEnabled') ? 'top left' : 'top right',
            at: 'top right'
          };
          break;
        }
      case 'top':
      case 'bottom':
        {
          result = {
            my: panelPosition,
            at: panelPosition
          };
          break;
        }
    }
    result.of = drawer.getOverlayTarget();
    return result;
  };
  _proto.refreshPanelElementSize = function refreshPanelElementSize(calcFromRealPanelSize) {
    var drawer = this.getDrawerInstance();
    var overlay = drawer.getOverlay();
    if (drawer.isHorizontalDirection()) {
      overlay.option('height', '100%');
      overlay.option('width', calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(drawer.option('opened')));
    } else {
      overlay.option('width', (0, _size.getWidth)(drawer.getOverlayTarget()));
      overlay.option('height', calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(drawer.option('opened')));
    }
  };
  _proto.onPanelContentRendered = function onPanelContentRendered() {
    this._updateViewContentStyles();
  };
  _proto._updateViewContentStyles = function _updateViewContentStyles() {
    var drawer = this.getDrawerInstance();
    (0, _renderer.default)(drawer.viewContent()).css('padding' + (0, _inflector.camelize)(drawer.calcTargetPosition(), true), drawer.option('minSize'));
    (0, _renderer.default)(drawer.viewContent()).css('transform', 'inherit');
  };
  _proto._internalRenderPosition = function _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    var drawer = this.getDrawerInstance();
    var $panel = (0, _renderer.default)(drawer.content());
    var $panelOverlayContent = drawer.getOverlay().$content();
    var revealMode = drawer.option('revealMode');
    var targetPanelPosition = drawer.calcTargetPosition();
    var panelSize = this._getPanelSize(drawer.option('opened'));
    var panelOffset = this._getPanelOffset(drawer.option('opened')) * drawer._getPositionCorrection();
    var marginTop = drawer.getRealPanelHeight() - panelSize;
    this._updateViewContentStyles();
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: panelOffset
        } : {
          top: panelOffset
        };
        _uiDrawer.animation.moveTo({
          complete: function complete() {
            whenAnimationCompleted.resolve();
          },
          duration: drawer.option('animationDuration'),
          direction: targetPanelPosition,
          $element: $panel,
          position: panelOffset
        });
      } else if (revealMode === 'expand') {
        this._initialPosition = {
          left: 0
        };
        (0, _translator.move)($panelOverlayContent, this._initialPosition);
        _uiDrawer.animation.size({
          complete: function complete() {
            whenAnimationCompleted.resolve();
          },
          duration: drawer.option('animationDuration'),
          direction: targetPanelPosition,
          $element: $panelOverlayContent,
          size: panelSize,
          marginTop: marginTop
        });
      }
    } else {
      if (revealMode === 'slide') {
        this._initialPosition = drawer.isHorizontalDirection() ? {
          left: panelOffset
        } : {
          top: panelOffset
        };
        (0, _translator.move)($panel, this._initialPosition);
      } else if (revealMode === 'expand') {
        this._initialPosition = {
          left: 0
        };
        (0, _translator.move)($panelOverlayContent, this._initialPosition);
        if (drawer.isHorizontalDirection()) {
          (0, _renderer.default)($panelOverlayContent).css('width', panelSize);
        } else {
          (0, _renderer.default)($panelOverlayContent).css('height', panelSize);
          if (targetPanelPosition === 'bottom') {
            (0, _renderer.default)($panelOverlayContent).css('marginTop', marginTop);
          }
        }
      }
    }
  };
  _proto.getPanelContent = function getPanelContent() {
    return (0, _renderer.default)(this.getDrawerInstance().getOverlay().content());
  };
  _proto._processOverlayZIndex = function _processOverlayZIndex($element) {
    var styles = (0, _renderer.default)($element).get(0).style;
    var zIndex = styles.zIndex || 1;
    this.getDrawerInstance().setZIndex(zIndex);
  };
  _proto.isViewContentFirst = function isViewContentFirst(position) {
    return position === 'right' || position === 'bottom';
  };
  return OverlapStrategy;
}(_uiDrawerRendering.default);
var _default = OverlapStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
