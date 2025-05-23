/**
* DevExtreme (esm/ui/tooltip/ui.tooltip.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Tooltip from './tooltip';
import { extend } from '../../core/utils/extend';
import { Deferred } from '../../core/utils/deferred';
import { value as viewPort } from '../../core/utils/view_port';
var tooltip = null;
var removeTooltipElement = null;
var createTooltip = function createTooltip(options) {
  options = extend({
    position: 'top'
  }, options);
  var content = options.content;
  delete options.content;
  var $tooltip = $('<div>').html(content).appendTo(viewPort());
  removeTooltipElement = function removeTooltipElement() {
    $tooltip.remove();
  };
  tooltip = new Tooltip($tooltip, options);
};
var removeTooltip = function removeTooltip() {
  if (!tooltip) {
    return;
  }
  removeTooltipElement();
  tooltip = null;
};
export function show(options) {
  removeTooltip();
  createTooltip(options);
  return tooltip.show();
}
export function hide() {
  if (!tooltip) {
    return new Deferred().resolve();
  }
  return tooltip.hide().done(removeTooltip).promise();
}
