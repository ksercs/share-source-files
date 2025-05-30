/**
* DevExtreme (cjs/viz/vector_map/tooltip_viewer.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TooltipViewer = TooltipViewer;
var TOOLTIP_OFFSET = 12;

// TODO: Somehow it should be merged with the core.Tooltip
function TooltipViewer(params) {
  this._subscribeToTracker(params.tracker, params.tooltip, params.layerCollection);
}
TooltipViewer.prototype = {
  constructor: TooltipViewer,
  dispose: function dispose() {
    this._offTracker();
    this._offTracker = null;
  },
  _subscribeToTracker: function _subscribeToTracker(tracker, tooltip, layerCollection) {
    this._offTracker = tracker.on({
      'focus-on': function focusOn(arg) {
        var layer;
        var proxy;
        if (tooltip.isEnabled()) {
          layer = layerCollection.byName(arg.data.name);
          proxy = layer && layer.getProxy(arg.data.index);
          var callback = function callback(result) {
            result && arg.done(result);
          };
          proxy && callback(tooltip.show(proxy, {
            x: arg.x,
            y: arg.y,
            offset: TOOLTIP_OFFSET
          }, {
            target: proxy
          }, undefined, callback));
        }
      },
      // There are no checks for `tooltip.isEnabled()` in the following two handlers because they are called only if the previous one has finished with `true`
      'focus-move': function focusMove(arg) {
        tooltip.move(arg.x, arg.y, TOOLTIP_OFFSET);
      },
      'focus-off': function focusOff() {
        tooltip.hide();
      }
    });
  }
};
