/**
* DevExtreme (esm/ui/drawer/ui.drawer.rendering.strategy.shrink.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { animation } from './ui.drawer.animation';
import DrawerStrategy from './ui.drawer.rendering.strategy';
import $ from '../../core/renderer';
import { camelize } from '../../core/utils/inflector';
class ShrinkStrategy extends DrawerStrategy {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    var drawer = this.getDrawerInstance();
    var direction = drawer.calcTargetPosition();
    var $panel = $(drawer.content());
    var panelSize = this._getPanelSize(drawer.option('opened'));
    var panelOffset = this._getPanelOffset(drawer.option('opened'));
    var revealMode = drawer.option('revealMode');
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        animation.margin({
          complete: () => {
            whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: drawer.option('animationDuration'),
          direction: direction,
          margin: panelOffset
        });
      } else if (revealMode === 'expand') {
        animation.size({
          complete: () => {
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
        $panel.css('margin' + camelize(direction, true), panelOffset);
      } else if (revealMode === 'expand') {
        $panel.css(drawer.isHorizontalDirection() ? 'width' : 'height', panelSize);
      }
    }
  }
  isViewContentFirst(position, isRtl) {
    return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
  }
}
export default ShrinkStrategy;
