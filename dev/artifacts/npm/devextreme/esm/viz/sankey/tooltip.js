/**
* DevExtreme (esm/viz/sankey/tooltip.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend as _extend } from '../../core/utils/extend';
import { isFunction } from '../../core/utils/type';
var defaultCustomizeLinkTooltip = formatter => function (info) {
  return {
    html: "<strong>".concat(info.source, " > ").concat(info.target, "</strong><br/>Weight: ").concat(formatter(info.weight))
  };
};
var defaultCustomizeNodeTooltip = formatter => function (info) {
  return {
    html: "<strong>".concat(info.label, "</strong><br/>Incoming weight: ").concat(formatter(info.weightIn), "<br/>Outgoing weight: ").concat(formatter(info.weightOut))
  };
};
var generateCustomCallback = function generateCustomCallback(customCallback, defaultCallback) {
  return function (objectInfo) {
    var res = isFunction(customCallback) ? customCallback.call(objectInfo, objectInfo) : {};
    var hasOwnProperty = Object.prototype.hasOwnProperty.bind(res);
    if (!hasOwnProperty('html') && !hasOwnProperty('text')) {
      res = _extend(res, defaultCallback.call(objectInfo, objectInfo));
    }
    return res;
  };
};
export function setTooltipCustomOptions(sankey) {
  sankey.prototype._setTooltipOptions = function () {
    var tooltip = this._tooltip;
    var options = tooltip && this._getOption('tooltip');
    var linkTemplate;
    var nodeTemplate;
    if (options.linkTooltipTemplate) {
      linkTemplate = this._getTemplate(options.linkTooltipTemplate);
    }
    if (options.nodeTooltipTemplate) {
      nodeTemplate = this._getTemplate(options.nodeTooltipTemplate);
    }
    tooltip && tooltip.update(_extend({}, options, {
      customizeTooltip: function customizeTooltip(args) {
        if (!(linkTemplate && args.type === 'link' || nodeTemplate && args.type === 'node')) {
          args.skipTemplate = true;
        }
        var formatter = value => tooltip.formatValue(value);
        if (args.type === 'node') {
          return generateCustomCallback(options.customizeNodeTooltip, defaultCustomizeNodeTooltip(formatter))(args.info);
        } else if (args.type === 'link') {
          return generateCustomCallback(options.customizeLinkTooltip, defaultCustomizeLinkTooltip(formatter))(args.info);
        }
        return {};
      },
      contentTemplate(arg, div) {
        var templateArgs = {
          model: arg.info,
          container: div
        };
        if (linkTemplate && arg.type === 'link') {
          return linkTemplate.render(templateArgs);
        }
        if (nodeTemplate && arg.type === 'node') {
          return nodeTemplate.render(templateArgs);
        }
      },
      enabled: options.enabled
    }));
  };
  sankey.prototype.hideTooltip = function () {
    this._tooltip && this._tooltip.hide();
  };
}
