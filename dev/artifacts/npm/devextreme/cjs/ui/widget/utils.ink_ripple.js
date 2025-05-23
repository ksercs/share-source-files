/**
* DevExtreme (cjs/ui/widget/utils.ink_ripple.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.hideWave = hideWave;
exports.render = exports.initConfig = void 0;
exports.showWave = showWave;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var INKRIPPLE_CLASS = 'dx-inkripple';
var INKRIPPLE_WAVE_CLASS = 'dx-inkripple-wave';
var INKRIPPLE_SHOWING_CLASS = 'dx-inkripple-showing';
var INKRIPPLE_HIDING_CLASS = 'dx-inkripple-hiding';
var DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
var MAX_WAVE_SIZE = 4000; // NOTE: incorrect scaling of ink with big size (T310238)
var ANIMATION_DURATION = 300;
var HOLD_ANIMATION_DURATION = 1000;
var DEFAULT_WAVE_INDEX = 0;
var initConfig = function initConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var useHoldAnimation = config.useHoldAnimation,
    waveSizeCoefficient = config.waveSizeCoefficient,
    isCentered = config.isCentered,
    wavesNumber = config.wavesNumber;
  return {
    waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
    isCentered: isCentered || false,
    wavesNumber: wavesNumber || 1,
    durations: getDurations(useHoldAnimation !== null && useHoldAnimation !== void 0 ? useHoldAnimation : true)
  };
};
exports.initConfig = initConfig;
var render = function render(args) {
  var config = initConfig(args);
  return {
    showWave: showWave.bind(this, config),
    hideWave: hideWave.bind(this, config)
  };
};
exports.render = render;
var getInkRipple = function getInkRipple(element) {
  var result = element.children('.' + INKRIPPLE_CLASS);
  if (result.length === 0) {
    result = (0, _renderer.default)('<div>').addClass(INKRIPPLE_CLASS).appendTo(element);
  }
  return result;
};
var getWaves = function getWaves(element, wavesNumber) {
  var inkRipple = getInkRipple((0, _renderer.default)(element));
  var result = inkRipple.children('.' + INKRIPPLE_WAVE_CLASS).toArray();
  for (var i = result.length; i < wavesNumber; i++) {
    var $currentWave = (0, _renderer.default)('<div>').appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
    result.push($currentWave[0]);
  }
  return (0, _renderer.default)(result);
};
var getWaveStyleConfig = function getWaveStyleConfig(args, config) {
  var element = (0, _renderer.default)(config.element);
  var elementWidth = (0, _size.getOuterWidth)(element);
  var elementHeight = (0, _size.getOuterHeight)(element);
  var elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
  var waveSize = Math.min(MAX_WAVE_SIZE, parseInt(elementDiagonal * args.waveSizeCoefficient));
  var left;
  var top;
  if (args.isCentered) {
    left = (elementWidth - waveSize) / 2;
    top = (elementHeight - waveSize) / 2;
  } else {
    var event = config.event;
    var position = element.offset();
    var x = event.pageX - position.left;
    var y = event.pageY - position.top;
    left = x - waveSize / 2;
    top = y - waveSize / 2;
  }
  return {
    left,
    top,
    height: waveSize,
    width: waveSize
  };
};
function showWave(args, config) {
  var $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
  args.hidingTimeout && clearTimeout(args.hidingTimeout);
  hideSelectedWave($wave);
  $wave.css(getWaveStyleConfig(args, config));
  args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0);
}
function showingWaveHandler(args, $wave) {
  var durationCss = args.durations.showingScale + 'ms';
  $wave.addClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
}
function getDurations(useHoldAnimation) {
  return {
    showingScale: useHoldAnimation ? HOLD_ANIMATION_DURATION : ANIMATION_DURATION,
    hidingScale: ANIMATION_DURATION,
    hidingOpacity: ANIMATION_DURATION
  };
}
function hideSelectedWave($wave) {
  $wave.removeClass(INKRIPPLE_HIDING_CLASS).css('transitionDuration', '');
}
function hideWave(args, config) {
  args.showingTimeout && clearTimeout(args.showingTimeout);
  var $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
  var durations = args.durations;
  var durationCss = durations.hidingScale + 'ms, ' + durations.hidingOpacity + 'ms';
  $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
  var animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
  args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration);
}
