/**
* DevExtreme (esm/ui/multi_view/ui.multi_view.animation.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import fx from '../../animation/fx';
import { move } from '../../animation/translator';
export var _translator = {
  move($element, position) {
    move($element, {
      left: position
    });
  }
};
export var animation = {
  moveTo($element, position, duration, completeAction) {
    fx.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration: duration,
      complete: completeAction
    });
  },
  complete($element) {
    fx.stop($element, true);
  }
};
