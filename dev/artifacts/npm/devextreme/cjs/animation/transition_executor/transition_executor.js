/**
* DevExtreme (cjs/animation/transition_executor/transition_executor.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TransitionExecutor = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _fx = _interopRequireDefault(require("../fx"));
var _presets = require("../presets/presets");
var _deferred = require("../../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var directionPostfixes = {
  forward: ' dx-forward',
  backward: ' dx-backward',
  none: ' dx-no-direction',
  undefined: ' dx-no-direction'
};
var DX_ANIMATING_CLASS = 'dx-animating';
var TransitionExecutor = _class.default.inherit({
  ctor: function ctor() {
    this._accumulatedDelays = {
      enter: 0,
      leave: 0
    };
    this._animations = [];
    this.reset();
  },
  _createAnimations: function _createAnimations($elements, initialConfig, configModifier, type) {
    $elements = (0, _renderer.default)($elements);
    var that = this;
    var result = [];
    configModifier = configModifier || {};
    var animationConfig = this._prepareElementAnimationConfig(initialConfig, configModifier, type);
    if (animationConfig) {
      $elements.each(function () {
        var animation = that._createAnimation((0, _renderer.default)(this), animationConfig, configModifier);
        if (animation) {
          animation.element.addClass(DX_ANIMATING_CLASS);
          animation.setup();
          result.push(animation);
        }
      });
    }
    return result;
  },
  _prepareElementAnimationConfig: function _prepareElementAnimationConfig(config, configModifier, type) {
    var result;
    if (typeof config === 'string') {
      var presetName = config;
      config = _presets.presets.getPreset(presetName);
    }
    if (!config) {
      result = undefined;
    } else if ((0, _type.isFunction)(config[type])) {
      result = config[type];
    } else {
      result = (0, _extend.extend)({
        skipElementInitialStyles: true,
        cleanupWhen: this._completePromise
      }, config, configModifier);
      if (!result.type || result.type === 'css') {
        var cssClass = 'dx-' + type;
        var extraCssClasses = (result.extraCssClasses ? ' ' + result.extraCssClasses : '') + directionPostfixes[result.direction];
        result.type = 'css';
        result.from = (result.from || cssClass) + extraCssClasses;
        result.to = result.to || cssClass + '-active';
      }
      result.staggerDelay = result.staggerDelay || 0;
      result.delay = result.delay || 0;
      if (result.staggerDelay) {
        result.delay += this._accumulatedDelays[type];
        this._accumulatedDelays[type] += result.staggerDelay;
      }
    }
    return result;
  },
  _createAnimation: function _createAnimation($element, animationConfig, configModifier) {
    var result;
    if ((0, _type.isPlainObject)(animationConfig)) {
      result = _fx.default.createAnimation($element, animationConfig);
    } else if ((0, _type.isFunction)(animationConfig)) {
      result = animationConfig($element, configModifier);
    }
    return result;
  },
  _startAnimations: function _startAnimations() {
    var animations = this._animations;
    for (var i = 0; i < animations.length; i++) {
      animations[i].start();
    }
  },
  _stopAnimations: function _stopAnimations(jumpToEnd) {
    var animations = this._animations;
    for (var i = 0; i < animations.length; i++) {
      animations[i].stop(jumpToEnd);
    }
  },
  _clearAnimations: function _clearAnimations() {
    var animations = this._animations;
    for (var i = 0; i < animations.length; i++) {
      animations[i].element.removeClass(DX_ANIMATING_CLASS);
    }
    this._animations.length = 0;
  },
  reset: function reset() {
    this._accumulatedDelays.enter = 0;
    this._accumulatedDelays.leave = 0;
    this._clearAnimations();
    this._completeDeferred = new _deferred.Deferred();
    this._completePromise = this._completeDeferred.promise();
  },
  enter: function enter($elements, animationConfig, configModifier) {
    var animations = this._createAnimations($elements, animationConfig, configModifier, 'enter');
    this._animations.push.apply(this._animations, animations);
  },
  leave: function leave($elements, animationConfig, configModifier) {
    var animations = this._createAnimations($elements, animationConfig, configModifier, 'leave');
    this._animations.push.apply(this._animations, animations);
  },
  start: function start() {
    var that = this;
    var result;
    if (!this._animations.length) {
      that.reset();
      result = new _deferred.Deferred().resolve().promise();
    } else {
      var animationDeferreds = (0, _iterator.map)(this._animations, function (animation) {
        var result = new _deferred.Deferred();
        animation.deferred.always(function () {
          result.resolve();
        });
        return result.promise();
      });
      result = _deferred.when.apply(_renderer.default, animationDeferreds).always(function () {
        that._completeDeferred.resolve();
        that.reset();
      });
      (0, _common.executeAsync)(function () {
        that._startAnimations();
      });
    }
    return result;
  },
  stop: function stop(jumpToEnd) {
    this._stopAnimations(jumpToEnd);
  }
});
exports.TransitionExecutor = TransitionExecutor;
