/**
* DevExtreme (esm/__internal/ui/multi_view/m_multi_view.animation.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fx } from '../../../common/core/animation';
import { move } from '../../../common/core/animation/translator';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const _translator = {
  move($element, position) {
    move($element, {
      left: position
    });
  }
};
export const animation = {
  moveTo($element, position, duration, completeAction) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration,
      complete: completeAction
    });
  },
  complete($element) {
    // @ts-expect-error
    fx.stop($element, true);
  }
};
