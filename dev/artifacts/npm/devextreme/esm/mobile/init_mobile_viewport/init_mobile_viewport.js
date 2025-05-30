/**
* DevExtreme (esm/mobile/init_mobile_viewport/init_mobile_viewport.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth, setWidth } from '../../core/utils/size';
import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
import { getWindow } from '../../core/utils/window';
var window = getWindow();
import eventsEngine from '../../events/core/events_engine';
import { extend } from '../../core/utils/extend';
import resizeCallbacks from '../../core/utils/resize_callbacks';
import { supportProp, touch } from '../../core/utils/support';
import { styleProp } from '../../core/utils/style';
import devices from '../../core/devices';
export var initMobileViewport = function initMobileViewport(options) {
  options = extend({}, options);
  var realDevice = devices.real();
  var allowZoom = options.allowZoom;
  var allowPan = options.allowPan;
  var allowSelection = 'allowSelection' in options ? options.allowSelection : realDevice.platform === 'generic';
  var metaSelector = 'meta[name=viewport]';
  if (!$(metaSelector).length) {
    $('<meta>').attr('name', 'viewport').appendTo('head');
  }
  var metaVerbs = ['width=device-width'];
  var msTouchVerbs = [];
  if (allowZoom) {
    msTouchVerbs.push('pinch-zoom');
  } else {
    metaVerbs.push('initial-scale=1.0', 'maximum-scale=1.0, user-scalable=no');
  }
  if (allowPan) {
    msTouchVerbs.push('pan-x', 'pan-y');
  }
  if (!allowPan && !allowZoom) {
    $('html, body').css({
      'msContentZooming': 'none',
      'msUserSelect': 'none',
      'overflow': 'hidden'
    });
  } else {
    $('html').css('msOverflowStyle', '-ms-autohiding-scrollbar');
  }
  if (!allowSelection && supportProp('userSelect')) {
    $('.dx-viewport').css(styleProp('userSelect'), 'none');
  }
  $(metaSelector).attr('content', metaVerbs.join());
  $('html').css('msTouchAction', msTouchVerbs.join(' ') || 'none');
  realDevice = devices.real();
  if (touch) {
    eventsEngine.off(domAdapter.getDocument(), '.dxInitMobileViewport');
    eventsEngine.on(domAdapter.getDocument(), 'dxpointermove.dxInitMobileViewport', function (e) {
      var count = e.pointers.length;
      var isTouchEvent = e.pointerType === 'touch';
      var zoomDisabled = !allowZoom && count > 1;
      var panDisabled = !allowPan && count === 1 && !e.isScrollingEvent;
      if (isTouchEvent && (zoomDisabled || panDisabled)) {
        e.preventDefault();
      }
    });
  }
  if (realDevice.ios) {
    var isPhoneGap = domAdapter.getLocation().protocol === 'file:';
    if (!isPhoneGap) {
      // NOTE: fix app size after device rotation in Safari when keyboard was shown
      resizeCallbacks.add(function () {
        var windowWidth = getWidth(window);
        setWidth($('body'), windowWidth);
      });
    }
  }
  if (realDevice.android) {
    resizeCallbacks.add(function () {
      setTimeout(function () {
        var activeElement = domAdapter.getActiveElement();
        activeElement.scrollIntoViewIfNeeded ? activeElement.scrollIntoViewIfNeeded() : activeElement.scrollIntoView(false);
      });
    });
  }
};
