/**
* DevExtreme (esm/ui/widget/utils.ink_ripple.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterWidth, getOuterHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
var INKRIPPLE_CLASS = 'dx-inkripple';
var INKRIPPLE_WAVE_CLASS = 'dx-inkripple-wave';
var INKRIPPLE_SHOWING_CLASS = 'dx-inkripple-showing';
var INKRIPPLE_HIDING_CLASS = 'dx-inkripple-hiding';
var DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
var MAX_WAVE_SIZE = 4000; // NOTE: incorrect scaling of ink with big size (T310238)
var ANIMATION_DURATION = 300;
var HOLD_ANIMATION_DURATION = 1000;
var DEFAULT_WAVE_INDEX = 0;
export var initConfig = function initConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var {
    useHoldAnimation,
    waveSizeCoefficient,
    isCentered,
    wavesNumber
  } = config;
  return {
    waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
    isCentered: isCentered || false,
    wavesNumber: wavesNumber || 1,
    durations: getDurations(useHoldAnimation !== null && useHoldAnimation !== void 0 ? useHoldAnimation : true)
  };
};
export var render = function render(args) {
  var config = initConfig(args);
  return {
    showWave: showWave.bind(this, config),
    hideWave: hideWave.bind(this, config)
  };
};
var getInkRipple = function getInkRipple(element) {
  var result = element.children('.' + INKRIPPLE_CLASS);
  if (result.length === 0) {
    result = $('<div>').addClass(INKRIPPLE_CLASS).appendTo(element);
  }
  return result;
};
var getWaves = function getWaves(element, wavesNumber) {
  var inkRipple = getInkRipple($(element));
  var result = inkRipple.children('.' + INKRIPPLE_WAVE_CLASS).toArray();
  for (var i = result.length; i < wavesNumber; i++) {
    var $currentWave = $('<div>').appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
    result.push($currentWave[0]);
  }
  return $(result);
};
var getWaveStyleConfig = function getWaveStyleConfig(args, config) {
  var element = $(config.element);
  var elementWidth = getOuterWidth(element);
  var elementHeight = getOuterHeight(element);
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
export function showWave(args, config) {
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
export function hideWave(args, config) {
  args.showingTimeout && clearTimeout(args.showingTimeout);
  var $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
  var durations = args.durations;
  var durationCss = durations.hidingScale + 'ms, ' + durations.hidingOpacity + 'ms';
  $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
  var animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
  args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration);
}
