/**
* DevExtreme (esm/integration/jquery/hold_ready.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import { themeReadyCallback } from '../../ui/themes_callback';
import readyCallbacks from '../../core/utils/ready_callbacks';
if (jQuery && !themeReadyCallback.fired()) {
  var holdReady = jQuery.holdReady || jQuery.fn.holdReady;
  holdReady(true);
  themeReadyCallback.add(function () {
    readyCallbacks.add(function () {
      holdReady(false);
    });
  });
}
