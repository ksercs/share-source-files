/**
* DevExtreme (esm/__internal/ui/drawer/m_drawer.rendering.strategy.push.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { move } from '../../../common/core/animation/translator';
import $ from '../../../core/renderer';
import { animation } from './m_drawer.animation';
import DrawerStrategy from './m_drawer.rendering.strategy';
class PushStrategy extends DrawerStrategy {
  _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
    const drawer = this.getDrawerInstance();
    const openedPanelSize = this._getPanelSize(true);
    // @ts-expect-error
    const contentPosition = this._getPanelSize(drawer.option('opened')) * drawer._getPositionCorrection();
    // @ts-expect-error
    $(drawer.content()).css(drawer.isHorizontalDirection() ? 'width' : 'height', openedPanelSize);
    // @ts-expect-error
    if (drawer.getMinSize()) {
      let paddingCssPropertyName = 'padding';
      // @ts-expect-error
      // eslint-disable-next-line default-case
      switch (drawer.calcTargetPosition()) {
        case 'left':
          paddingCssPropertyName += 'Right';
          break;
        case 'right':
          paddingCssPropertyName += 'Left';
          break;
        case 'top':
          paddingCssPropertyName += 'Bottom';
          break;
        case 'bottom':
          paddingCssPropertyName += 'Top';
          break;
      }
      // @ts-expect-error
      $(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize());
    } else {
      // TODO: ???
    }
    if (changePositionUsingFxAnimation) {
      animation.moveTo({
        // @ts-expect-error
        $element: $(drawer.viewContent()),
        position: contentPosition,
        // @ts-expect-error
        direction: drawer.calcTargetPosition(),
        duration: drawer.option('animationDuration'),
        complete: () => {
          whenAnimationCompleted.resolve();
        }
      });
      // @ts-expect-error
    } else if (drawer.isHorizontalDirection()) {
      // @ts-expect-error
      move($(drawer.viewContent()), {
        left: contentPosition
      });
    } else {
      // @ts-expect-error
      move($(drawer.viewContent()), {
        top: contentPosition
      });
    }
  }
  onPanelContentRendered() {
    // @ts-expect-error
    $(this.getDrawerInstance().viewContent()).addClass('dx-theme-background-color');
  }
}
export default PushStrategy;
