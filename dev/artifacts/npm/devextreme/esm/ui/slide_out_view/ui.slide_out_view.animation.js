/**
* DevExtreme (esm/ui/slide_out_view/ui.slide_out_view.animation.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import fx from '../../animation/fx';
var ANIMATION_DURATION = 400;
export var animation = {
  moveTo: function moveTo($element, position, completeAction) {
    fx.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration: ANIMATION_DURATION,
      complete: completeAction
    });
  },
  complete: function complete($element) {
    fx.stop($element, true);
  }
};
