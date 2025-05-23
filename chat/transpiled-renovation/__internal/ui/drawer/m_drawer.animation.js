"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = void 0;
var _animation = require("../../../common/core/animation");
var _inflector = require("../../../core/utils/inflector");
const animation = exports.animation = {
  moveTo(config) {
    const {
      $element
    } = config;
    const {
      position
    } = config;
    const direction = config.direction || 'left';
    const toConfig = {};
    let animationType;
    // eslint-disable-next-line default-case
    switch (direction) {
      case 'right':
        // @ts-expect-error
        toConfig.transform = `translate(${position}px, 0px)`;
        animationType = 'custom';
        break;
      case 'left':
        // @ts-expect-error
        toConfig.left = position;
        animationType = 'slide';
        break;
      case 'top':
      case 'bottom':
        // @ts-expect-error
        toConfig.top = position;
        animationType = 'slide';
    }
    _animation.fx.animate($element, {
      type: animationType,
      // @ts-expect-error
      to: toConfig,
      duration: config.duration,
      complete: config.complete
    });
  },
  margin(config) {
    const {
      $element
    } = config;
    const {
      margin
    } = config;
    const direction = config.direction || 'left';
    const toConfig = {};
    toConfig[`margin${(0, _inflector.camelize)(direction, true)}`] = margin;
    _animation.fx.animate($element, {
      // @ts-expect-error
      to: toConfig,
      duration: config.duration,
      complete: config.complete
    });
  },
  fade($element, config, duration, completeAction) {
    _animation.fx.animate($element, {
      type: 'fade',
      to: config.to,
      from: config.from,
      duration,
      complete: completeAction
    });
  },
  size(config) {
    const {
      $element
    } = config;
    const {
      size
    } = config;
    const direction = config.direction || 'left';
    const marginTop = config.marginTop || 0;
    const {
      duration
    } = config;
    const toConfig = {};
    if (direction === 'right' || direction === 'left') {
      // @ts-expect-error
      toConfig.width = size;
    } else {
      // @ts-expect-error
      toConfig.height = size;
    }
    if (direction === 'bottom') {
      // @ts-expect-error
      toConfig.marginTop = marginTop;
    }
    _animation.fx.animate($element, {
      // @ts-expect-error
      to: toConfig,
      duration,
      complete: config.complete
    });
  },
  complete($element) {
    _animation.fx.stop($element, true);
  }
};