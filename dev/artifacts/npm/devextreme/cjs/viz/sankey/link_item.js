/**
* DevExtreme (cjs/viz/sankey/link_item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _constants = require("./constants");
var _type = require("../../core/utils/type");
var states = ['normal', 'adjacentNodeHover', 'hover'];
function compileAttrs(color, itemOptions, itemBaseOptions, gradient) {
  var border = itemOptions.border;
  var baseBorder = itemBaseOptions.border;
  var borderVisible = (0, _type.isDefined)(border.visible) ? border.visible : baseBorder.visible;
  var borderWidth = (0, _type.isDefined)(border.width) ? border.width : baseBorder.width;
  var borderOpacity = (0, _type.isDefined)(border.opacity) ? border.opacity : (0, _type.isDefined)(baseBorder.opacity) ? baseBorder.opacity : 1;
  var opacity = (0, _type.isDefined)(itemOptions.opacity) ? itemOptions.opacity : (0, _type.isDefined)(itemBaseOptions.opacity) ? itemBaseOptions.opacity : 1;
  var fill = itemOptions.color || color;
  if (itemBaseOptions.colorMode === _constants.COLOR_MODE_TARGET || itemBaseOptions.colorMode === _constants.COLOR_MODE_SOURCE) {
    fill = color;
  } else if (itemBaseOptions.colorMode === _constants.COLOR_MODE_GRADIENT && gradient && (0, _type.isDefined)(gradient.id)) {
    fill = gradient.id;
  }
  return {
    fill: fill,
    'stroke-width': borderVisible ? borderWidth : 0,
    stroke: itemOptions.border.color || itemBaseOptions.border.color,
    'stroke-opacity': borderOpacity,
    opacity: opacity,
    hatching: itemOptions.hatching
  };
}
function Link(widget, params) {
  var that = this;
  var widgetOffset = widget._renderer.getRootOffset();
  that.code = 0;
  that.widget = widget;
  that.color = params.color;
  that.connection = params.connection;
  that.d = params.d;
  that.options = params.options;
  that.boundingRect = params.boundingRect, that.coords = {
    x: params.boundingRect.x + params.boundingRect.width / 2 + widgetOffset.left,
    y: params.boundingRect.y + params.boundingRect.height / 2 + widgetOffset.top
  };
  that.states = {
    normal: compileAttrs(that.color, that.options, that.options, params.gradient),
    adjacentNodeHover: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options, params.gradient),
    hover: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options, params.gradient)
  };
  that.overlayStates = {
    normal: compileAttrs(that.color, {
      opacity: 0,
      border: {}
    }, that.options),
    adjacentNodeHover: compileAttrs(that.color, that.options.hoverStyle, that.options),
    hover: compileAttrs(that.color, that.options.hoverStyle, that.options)
  };
}
Link.prototype = {
  getState: function getState() {
    return states[this.code];
  },
  isHovered: function isHovered() {
    return this.code === 2;
  },
  isAdjacentNodeHovered: function isAdjacentNodeHovered() {
    return this.code === 1;
  },
  setState: function setState(code, state) {
    if (state) {
      this.code = code;
    } else {
      this.code = 0;
      this.hideTooltip();
    }
    this.widget._applyLinksAppearance();
  },
  setHover: function setHover() {
    this.hover(true);
  },
  hover: function hover(state) {
    if (!this.widget._getOption('hoverEnabled', true) || state === this.isHovered()) {
      return;
    }
    this.widget._suspend();
    state && this.widget.clearHover();
    this.setState(2, state);
    this.widget._eventTrigger('linkHoverChanged', {
      target: this
    });
    this.widget._resume();
  },
  adjacentNodeHover: function adjacentNodeHover(state) {
    if (!this.widget._getOption('hoverEnabled', true) || state === this.isAdjacentNodeHovered()) {
      return;
    }
    this.widget._suspend();
    this.setState(1, state);
    this.widget._resume();
  },
  setAdjacentNodeHover: function setAdjacentNodeHover() {
    this.adjacentNodeHover(true);
  },
  showTooltip: function showTooltip(coords) {
    this.widget._getOption('hoverEnabled', true) && this.widget._tooltip && this.widget._tooltip.show({
      type: 'link',
      info: {
        source: this.connection.source,
        target: this.connection.target,
        weight: this.connection.weight
      }
    }, typeof coords !== 'undefined' ? {
      x: coords[0],
      y: coords[1]
    } : this.coords);
  },
  hideTooltip: function hideTooltip() {
    this.widget._tooltip && this.widget._tooltip.hide();
  }
};
var _default = Link;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
