/**
* DevExtreme (esm/__internal/ui/drawer/m_drawer.rendering.strategy.shrink.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { camelize } from '../../../core/utils/inflector';
import { animation } from './m_drawer.animation';
import DrawerStrategy from './m_drawer.rendering.strategy';
class ShrinkStrategy extends DrawerStrategy {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    // @ts-expect-error
    const direction = drawer.calcTargetPosition();
    const $panel = $(drawer.content());
    const panelSize = this._getPanelSize(drawer.option('opened'));
    const panelOffset = this._getPanelOffset(drawer.option('opened'));
    const revealMode = drawer.option('revealMode');
    if (changePositionUsingFxAnimation) {
      if (revealMode === 'slide') {
        animation.margin({
          complete: () => {
            whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: drawer.option('animationDuration'),
          direction,
          margin: panelOffset
        });
      } else if (revealMode === 'expand') {
        animation.size({
          complete: () => {
            whenAnimationCompleted.resolve();
          },
          $element: $panel,
          duration: drawer.option('animationDuration'),
          direction,
          size: panelSize
        });
      }
    } else if (revealMode === 'slide') {
      $panel.css(`margin${camelize(direction, true)}`, panelOffset);
    } else if (revealMode === 'expand') {
      // @ts-expect-error
      $panel.css(drawer.isHorizontalDirection() ? 'width' : 'height', panelSize);
    }
  }
  // @ts-expect-error
  isViewContentFirst(position, isRtl) {
    return (isRtl ? position === 'left' : position === 'right') || position === 'bottom';
  }
}
export default ShrinkStrategy;
