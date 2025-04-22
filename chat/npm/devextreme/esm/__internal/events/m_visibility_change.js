/**
* DevExtreme (esm/__internal/events/m_visibility_change.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../common/core/events/core/events_engine';
import $ from '../../core/renderer';
const triggerVisibilityChangeEvent = function (eventName) {
  const VISIBILITY_CHANGE_SELECTOR = '.dx-visibility-change-handler';
  return function (element) {
    const $element = $(element || 'body');
    const changeHandlers = $element.filter(VISIBILITY_CHANGE_SELECTOR)
    // @ts-expect-error
    .add($element.find(VISIBILITY_CHANGE_SELECTOR));
    for (let i = 0; i < changeHandlers.length; i++) {
      eventsEngine.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
export const triggerShownEvent = triggerVisibilityChangeEvent('dxshown');
export const triggerHidingEvent = triggerVisibilityChangeEvent('dxhiding');
export const triggerResizeEvent = triggerVisibilityChangeEvent('dxresize');
export default {
  triggerHidingEvent,
  triggerResizeEvent,
  triggerShownEvent
};
