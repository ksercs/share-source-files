/**
* DevExtreme (esm/viz/vector_map/control_bar/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var createTracker = (renderer, root) => renderer.g().attr({
  stroke: 'none',
  'stroke-width': 0,
  fill: '#000000',
  opacity: 0.0001
}).css({
  cursor: 'pointer'
}).append(root);
export var createVisibilityGroup = function createVisibilityGroup(renderer, root) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return renderer.g().attr({
    'class': className
  }).append(root);
};
export var toggleDisplay = (blocks, isVisible) => {
  var cssDisplayBlock = {
    display: 'block'
  };
  var cssDisplayNone = {
    display: 'none'
  };
  var style = isVisible ? cssDisplayBlock : cssDisplayNone;
  blocks.map(item => item.css(style));
};
