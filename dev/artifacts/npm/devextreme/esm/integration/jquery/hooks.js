/**
* DevExtreme (esm/integration/jquery/hooks.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import useJQueryFn from './use_jquery';
var useJQuery = useJQueryFn();
import { compare as compareVersion } from '../../core/utils/version';
import { each } from '../../core/utils/iterator';
import { isNumeric } from '../../core/utils/type';
import { setEventFixMethod } from '../../events/utils/index';
import registerEvent from '../../events/core/event_registrator';
import hookTouchProps from '../../events/core/hook_touch_props';
if (useJQuery) {
  if (compareVersion(jQuery.fn.jquery, [3]) < 0) {
    var POINTER_TYPE_MAP = {
      2: 'touch',
      3: 'pen',
      4: 'mouse'
    };
    each(['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel', 'MSPointerOver', 'MSPointerOut', 'mouseenter', 'mouseleave', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave'], function () {
      jQuery.event.fixHooks[this] = {
        filter: function filter(event, originalEvent) {
          var pointerType = originalEvent.pointerType;
          if (isNumeric(pointerType)) {
            event.pointerType = POINTER_TYPE_MAP[pointerType];
          }
          return event;
        },
        props: jQuery.event.mouseHooks.props.concat(['pointerId', 'pointerType', 'originalTarget', 'width', 'height', 'pressure', 'result', 'tiltX', 'charCode', 'tiltY', 'detail', 'isPrimary', 'prevValue'])
      };
    });
    each(['touchstart', 'touchmove', 'touchend', 'touchcancel'], function () {
      jQuery.event.fixHooks[this] = {
        filter: function filter(event, originalEvent) {
          hookTouchProps(function (name, hook) {
            event[name] = hook(originalEvent);
          });
          return event;
        },
        props: jQuery.event.mouseHooks.props.concat(['touches', 'changedTouches', 'targetTouches', 'detail', 'result', 'originalTarget', 'charCode', 'prevValue'])
      };
    });
    jQuery.event.fixHooks['wheel'] = jQuery.event.mouseHooks;
    var DX_EVENT_HOOKS = {
      props: jQuery.event.mouseHooks.props.concat(['pointerType', 'pointerId', 'pointers'])
    };
    registerEvent.callbacks.add(function (name) {
      jQuery.event.fixHooks[name] = DX_EVENT_HOOKS;
    });
    var fix = function fix(event, originalEvent) {
      var fixHook = jQuery.event.fixHooks[originalEvent.type] || jQuery.event.mouseHooks;
      var props = fixHook.props ? jQuery.event.props.concat(fixHook.props) : jQuery.event.props;
      var propIndex = props.length;
      while (propIndex--) {
        var prop = props[propIndex];
        event[prop] = originalEvent[prop];
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    };
    setEventFixMethod(fix);
  } else {
    hookTouchProps(function (name, hook) {
      jQuery.event.addProp(name, hook);
    });
  }
}
