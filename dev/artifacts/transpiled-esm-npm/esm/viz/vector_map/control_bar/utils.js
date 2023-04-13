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