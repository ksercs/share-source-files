/**
* DevExtreme (esm/ui/drawer/ui.drawer.rendering.strategy.overlap.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth } from '../../core/utils/size';
import { animation } from './ui.drawer.animation';
import DrawerStrategy from './ui.drawer.rendering.strategy';
import $ from '../../core/renderer';
import { move } from '../../animation/translator';
import Overlay from '../overlay/ui.overlay';
import { ensureDefined } from '../../core/utils/common';
import { camelize } from '../../core/utils/inflector';
class OverlapStrategy extends DrawerStrategy {
  renderPanelContent(whenPanelContentRendered) {
    delete this._initialPosition;
    var drawer = this.getDrawerInstance();
    var {
      opened,
      minSize
    } = drawer.option();
    drawer._overlay = drawer._createComponent(drawer.content(), Overlay, {
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
      onContentReady: args => {
        whenPanelContentRendered.resolve();
        this._processOverlayZIndex(args.component.content());
      },
      visible: true,
      propagateOutsideClick: true
    });
  }
  _fixOverlayPosition($overlayContent) {
    // NOTE: overlay should be positioned in extended wrapper
    var position = ensureDefined(this._initialPosition, {
      left: 0,
      top: 0
    });
    move($overlayContent, position);
    if (this.getDrawerInstance().calcTargetPosition() === 'right') {
      $overlayContent.css('left', 'auto');
    }
    if (this.getDrawerInstance().calcTargetPosition() === 'bottom') {
      $overlayContent.css('top', 'auto');
      $overlayContent.css('bottom', '0px');
    }
  }
  _getOverlayPosition() {
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
  }
  refreshPanelElementSize(calcFromRealPanelSize) {
    var drawer = this.getDrawerInstance();
    var overlay = drawer.getOverlay();
    if (drawer.isHorizontalDirection()) {
      overlay.option('height', '100%');
      overlay.option('width', calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(drawer.option('opened')));
    } else {
      overlay.option('width', getWidth(drawer.getOverlayTarget()));
      overlay.option('height', calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(drawer.option('opened')));
    }
  }
  onPanelContentRendered() {
    this._updateViewContentStyles();
  }
  _updateViewContentStyles() {
    var drawer = this.getDrawerInstance();
    $(drawer.viewContent()).css('padding' + camelize(drawer.calcTargetPosition(), true), drawer.option('minSize'));
    $(drawer.viewContent()).css('transform', 'inherit');
  }
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    var drawer = this.getDrawerInstance();
    var $panel = $(drawer.content());
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
        animation.moveTo({
          complete: () => {
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
        move($panelOverlayContent, this._initialPosition);
        animation.size({
          complete: () => {
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
        move($panel, this._initialPosition);
      } else if (revealMode === 'expand') {
        this._initialPosition = {
          left: 0
        };
        move($panelOverlayContent, this._initialPosition);
        if (drawer.isHorizontalDirection()) {
          $($panelOverlayContent).css('width', panelSize);
        } else {
          $($panelOverlayContent).css('height', panelSize);
          if (targetPanelPosition === 'bottom') {
            $($panelOverlayContent).css('marginTop', marginTop);
          }
        }
      }
    }
  }
  getPanelContent() {
    return $(this.getDrawerInstance().getOverlay().content());
  }
  _processOverlayZIndex($element) {
    var styles = $($element).get(0).style;
    var zIndex = styles.zIndex || 1;
    this.getDrawerInstance().setZIndex(zIndex);
  }
  isViewContentFirst(position) {
    return position === 'right' || position === 'bottom';
  }
}
export default OverlapStrategy;
