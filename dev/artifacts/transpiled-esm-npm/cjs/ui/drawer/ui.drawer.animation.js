"use strict";

exports.animation = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _inflector = require("../../core/utils/inflector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var animation = {
  moveTo(config) {
    var $element = config.$element;
    var position = config.position;
    var direction = config.direction || 'left';
    var toConfig = {};
    var animationType;
    switch (direction) {
      case 'right':
        toConfig['transform'] = 'translate(' + position + 'px, 0px)';
        animationType = 'custom';
        break;
      case 'left':
        toConfig['left'] = position;
        animationType = 'slide';
        break;
      case 'top':
      case 'bottom':
        toConfig['top'] = position;
        animationType = 'slide';
    }
    _fx.default.animate($element, {
      type: animationType,
      to: toConfig,
      duration: config.duration,
      complete: config.complete
    });
  },
  margin(config) {
    var $element = config.$element;
    var margin = config.margin;
    var direction = config.direction || 'left';
    var toConfig = {};
    toConfig['margin' + (0, _inflector.camelize)(direction, true)] = margin;
    _fx.default.animate($element, {
      to: toConfig,
      duration: config.duration,
      complete: config.complete
    });
  },
  fade($element, config, duration, completeAction) {
    _fx.default.animate($element, {
      type: 'fade',
      to: config.to,
      from: config.from,
      duration,
      complete: completeAction
    });
  },
  size(config) {
    var $element = config.$element;
    var size = config.size;
    var direction = config.direction || 'left';
    var marginTop = config.marginTop || 0;
    var duration = config.duration;
    var toConfig = {};
    if (direction === 'right' || direction === 'left') {
      toConfig['width'] = size;
    } else {
      toConfig['height'] = size;
    }
    if (direction === 'bottom') {
      toConfig['marginTop'] = marginTop;
    }
    _fx.default.animate($element, {
      to: toConfig,
      duration,
      complete: config.complete
    });
  },
  complete($element) {
    _fx.default.stop($element, true);
  }
};
exports.animation = animation;