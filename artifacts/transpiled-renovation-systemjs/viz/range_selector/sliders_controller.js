!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/range_selector/sliders_controller.js"], ["../../core/utils/common","./common","./slider","../core/utils","../../core/utils/type","../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/range_selector/sliders_controller.js", ["../../core/utils/common", "./common", "./slider", "../core/utils", "../../core/utils/type", "../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.SlidersController = SlidersController;
  var _common = $__require("../../core/utils/common");
  var _common2 = $__require("./common");
  var _slider = _interopRequireDefault($__require("./slider"));
  var _utils = $__require("../core/utils");
  var _type = $__require("../../core/utils/type");
  var _math = $__require("../../core/utils/math");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var animationSettings = _common2.utils.animationSettings;
  var emptySliderMarkerText = _common2.consts.emptySliderMarkerText;
  function buildRectPoints(left, top, right, bottom) {
    return [left, top, right, top, right, bottom, left, bottom];
  }
  function isLess(a, b) {
    return a < b;
  }
  function isGreater(a, b) {
    return a > b;
  }
  function selectClosestValue(target, values) {
    var start = 0;
    var end = values ? values.length - 1 : 0;
    var middle;
    var val = target;
    while (end - start > 1) {
      middle = start + end >> 1;
      val = values[middle];
      if (val === target) {
        return target;
      } else if (target < val) {
        end = middle;
      } else {
        start = middle;
      }
    }
    if (values) {
      val = values[target - values[start] <= values[end] - target ? start : end];
    }
    return val;
  }
  function dummyProcessSelectionChanged() {
    this._lastSelectedRange = this.getSelectedRange();
    delete this._processSelectionChanged;
  }

  // See tests in "rangeSelectorWithAssertion.html", "'onSelectedRangeChanged' event" module
  function suppressSetSelectedRange(controller) {
    controller.setSelectedRange = _common.noop;
    if (controller._processSelectionChanged === dummyProcessSelectionChanged) {
      controller._processSelectionChanged();
    }
  }
  function restoreSetSelectedRange(controller) {
    delete controller.setSelectedRange;
  }
  function SlidersController(params) {
    var that = this;
    var sliderParams = {
      renderer: params.renderer,
      root: params.root,
      trackersGroup: params.trackersGroup,
      translator: params.translator
    };
    that._params = params;
    that._areaTracker = params.renderer.path(null, 'area').attr({
      'class': 'area-tracker',
      fill: '#000000',
      opacity: 0.0001
    }).append(params.trackersGroup);
    that._selectedAreaTracker = params.renderer.path(null, 'area').attr({
      'class': 'selected-area-tracker',
      fill: '#000000',
      opacity: 0.0001
    }).append(params.trackersGroup);
    // Shutter is appended before sliders because later (when they will be foregrounded) it will be at any case located before them.
    that._shutter = params.renderer.path(null, 'area').append(params.root);
    that._sliders = [new _slider.default(sliderParams, 0), new _slider.default(sliderParams, 1)];
    // It seems that there is no special reasons to suppress first event - it was accidentally suppressed.
    // Let it stay so for now.
    that._processSelectionChanged = dummyProcessSelectionChanged;
  }
  SlidersController.prototype = {
    constructor: SlidersController,
    dispose: function dispose() {
      this._sliders[0].dispose();
      this._sliders[1].dispose();
    },
    getTrackerTargets: function getTrackerTargets() {
      return {
        area: this._areaTracker,
        selectedArea: this._selectedAreaTracker,
        sliders: this._sliders
      };
    },
    _processSelectionChanged: function _processSelectionChanged(e) {
      var that = this;
      var selectedRange = that.getSelectedRange();
      if (!(0, _utils.rangesAreEqual)(selectedRange, that._lastSelectedRange)) {
        that._params.updateSelectedRange(selectedRange, that._lastSelectedRange, e);
        that._lastSelectedRange = selectedRange;
      }
    },
    update: function update(verticalRange, behavior, isCompactMode, sliderHandleOptions, sliderMarkerOptions, shutterOptions, rangeBounds, fullTicks, selectedRangeColor) {
      var that = this;
      var screenRange = that._params.translator.getScreenRange();
      that._verticalRange = verticalRange;
      that._minRange = rangeBounds.minRange;
      that._maxRange = rangeBounds.maxRange;
      // TODO: Investigate reasons of "renderer.animationEnabled" usage - it seems to be useless (if only for vml somehow)
      that._animationEnabled = behavior.animationEnabled && that._params.renderer.animationEnabled();
      that._allowSlidersSwap = behavior.allowSlidersSwap;
      that._sliders[0].update(verticalRange, sliderHandleOptions, sliderMarkerOptions);
      that._sliders[1].update(verticalRange, sliderHandleOptions, sliderMarkerOptions);
      // This is required for placing sliders and shutter into initial position from which initial animation will be going.
      that._sliders[0]._position = that._sliders[1]._position = screenRange[0];
      that._values = !that._params.translator.isValueProlonged && behavior.snapToTicks ? fullTicks : null;
      that._areaTracker.attr({
        points: buildRectPoints(screenRange[0], verticalRange[0], screenRange[1], verticalRange[1])
      });

      // SlidersContainer
      that._isCompactMode = isCompactMode;
      that._shutterOffset = sliderHandleOptions.width / 2;
      that._updateSelectedView(shutterOptions, selectedRangeColor);
      that._isOnMoving = (0, _utils.normalizeEnum)(behavior.valueChangeMode) === 'onhandlemove' || (0, _utils.normalizeEnum)(behavior.callValueChanged) === 'onmoving';
      that._updateSelectedRange();
      // This is placing sliders and shutter into initial position. They all will be animated from that position when "setSelectedRange" is called.
      that._applyTotalPosition(false);
    },
    _updateSelectedView: function _updateSelectedView(shutterOptions, selectedRangeColor) {
      var settings = {
        fill: null,
        'fill-opacity': null,
        stroke: null,
        'stroke-width': null
      };
      if (this._isCompactMode) {
        settings.stroke = selectedRangeColor;
        settings['stroke-width'] = 3;
        settings.sharp = 'v';
      } else {
        settings.fill = shutterOptions.color;
        settings['fill-opacity'] = shutterOptions.opacity;
      }
      this._shutter.attr(settings);
    },
    _updateSelectedRange: function _updateSelectedRange() {
      var that = this;
      var sliders = that._sliders;
      sliders[0].cancelAnimation();
      sliders[1].cancelAnimation();
      that._shutter.stopAnimation();
      if (that._params.translator.getBusinessRange().isEmpty()) {
        sliders[0]._setText(emptySliderMarkerText);
        sliders[1]._setText(emptySliderMarkerText);
        sliders[0]._value = sliders[1]._value = undefined;
        sliders[0]._position = that._params.translator.getScreenRange()[0];
        sliders[1]._position = that._params.translator.getScreenRange()[1];
        that._applyTotalPosition(false);
        suppressSetSelectedRange(that);
      } else {
        restoreSetSelectedRange(that);
      }
    },
    _applyTotalPosition: function _applyTotalPosition(isAnimated) {
      var sliders = this._sliders;
      isAnimated = this._animationEnabled && isAnimated;
      sliders[0].applyPosition(isAnimated);
      sliders[1].applyPosition(isAnimated);
      var areOverlapped = sliders[0].getCloudBorder() > sliders[1].getCloudBorder();
      sliders[0].setOverlapped(areOverlapped);
      sliders[1].setOverlapped(areOverlapped);
      this._applyAreaTrackersPosition();
      this._applySelectedRangePosition(isAnimated);
    },
    _applyAreaTrackersPosition: function _applyAreaTrackersPosition() {
      var that = this;
      var position1 = that._sliders[0].getPosition();
      var position2 = that._sliders[1].getPosition();
      that._selectedAreaTracker.attr({
        points: buildRectPoints(position1, that._verticalRange[0], position2, that._verticalRange[1])
      }).css({
        cursor: Math.abs(that._params.translator.getScreenRange()[1] - that._params.translator.getScreenRange()[0] - position2 + position1) < 0.001 ? 'default' : 'pointer'
      });
    },
    _applySelectedRangePosition: function _applySelectedRangePosition(isAnimated) {
      var that = this;
      var verticalRange = that._verticalRange;
      var pos1 = that._sliders[0].getPosition();
      var pos2 = that._sliders[1].getPosition();
      var screenRange;
      var points;
      if (that._isCompactMode) {
        points = [pos1 + Math.ceil(that._shutterOffset), (verticalRange[0] + verticalRange[1]) / 2, pos2 - Math.floor(that._shutterOffset), (verticalRange[0] + verticalRange[1]) / 2];
      } else {
        screenRange = that._params.axis.getVisibleArea();
        points = [buildRectPoints(screenRange[0], verticalRange[0], Math.max(pos1 - Math.floor(that._shutterOffset), screenRange[0]), verticalRange[1]), buildRectPoints(screenRange[1], verticalRange[0], Math.min(pos2 + Math.ceil(that._shutterOffset), screenRange[1]), verticalRange[1])];
      }
      if (isAnimated) {
        that._shutter.animate({
          points: points
        }, animationSettings);
      } else {
        that._shutter.attr({
          points: points
        });
      }
    },
    getSelectedRange: function getSelectedRange() {
      return {
        startValue: this._sliders[0].getValue(),
        endValue: this._sliders[1].getValue()
      };
    },
    setSelectedRange: function setSelectedRange(visualRange, e) {
      visualRange = visualRange || {};
      var that = this;
      var translator = that._params.translator;
      var businessRange = translator.getBusinessRange();
      var compare = businessRange.axisType === 'discrete' ? function (a, b) {
        return a < b;
      } : function (a, b) {
        return a <= b;
      };
      var _adjustVisualRange = (0, _utils.adjustVisualRange)({
        dataType: businessRange.dataType,
        axisType: businessRange.axisType,
        base: businessRange.base
      }, {
        startValue: translator.isValid(visualRange.startValue) ? translator.getCorrectValue(visualRange.startValue, +1) : undefined,
        endValue: translator.isValid(visualRange.endValue) ? translator.getCorrectValue(visualRange.endValue, -1) : undefined,
        length: visualRange.length
      }, {
        min: businessRange.minVisible,
        max: businessRange.maxVisible,
        categories: businessRange.categories
      }),
          startValue = _adjustVisualRange.startValue,
          endValue = _adjustVisualRange.endValue;
      startValue = (0, _type.isNumeric)(startValue) ? (0, _math.adjust)(startValue) : startValue;
      endValue = (0, _type.isNumeric)(endValue) ? (0, _math.adjust)(endValue) : endValue;
      var values = compare(translator.to(startValue, -1), translator.to(endValue, +1)) ? [startValue, endValue] : [endValue, startValue];
      that._sliders[0].setDisplayValue(values[0]);
      that._sliders[1].setDisplayValue(values[1]);
      that._sliders[0]._position = translator.to(values[0], -1);
      that._sliders[1]._position = translator.to(values[1], +1);
      that._applyTotalPosition(true);
      that._processSelectionChanged(e);
    },
    beginSelectedAreaMoving: function beginSelectedAreaMoving(initialPosition) {
      var that = this;
      var sliders = that._sliders;
      var offset = (sliders[0].getPosition() + sliders[1].getPosition()) / 2 - initialPosition;
      var currentPosition = initialPosition;
      move.complete = function (e) {
        that._dockSelectedArea(e);
      };
      return move;
      function move(position, e) {
        if (position !== currentPosition && position > currentPosition === position > (sliders[0].getPosition() + sliders[1].getPosition()) / 2 - offset) {
          that._moveSelectedArea(position + offset, false, e);
        }
        currentPosition = position;
      }
    },
    _dockSelectedArea: function _dockSelectedArea(e) {
      var translator = this._params.translator;
      var sliders = this._sliders;
      sliders[0]._position = translator.to(sliders[0].getValue(), -1);
      sliders[1]._position = translator.to(sliders[1].getValue(), +1);
      this._applyTotalPosition(true);
      this._processSelectionChanged(e);
    },
    moveSelectedArea: function moveSelectedArea(screenPosition, e) {
      this._moveSelectedArea(screenPosition, true, e);
      this._dockSelectedArea(e);
    },
    _moveSelectedArea: function _moveSelectedArea(screenPosition, isAnimated, e) {
      var that = this;
      var translator = that._params.translator;
      var sliders = that._sliders;
      var interval = sliders[1].getPosition() - sliders[0].getPosition();
      var startPosition = screenPosition - interval / 2;
      var endPosition = screenPosition + interval / 2;
      if (startPosition < translator.getScreenRange()[0]) {
        startPosition = translator.getScreenRange()[0];
        endPosition = startPosition + interval;
      }
      if (endPosition > translator.getScreenRange()[1]) {
        endPosition = translator.getScreenRange()[1];
        startPosition = endPosition - interval;
      }

      // Check for "minRange" and "maxRange" is not performed because it was not performed in the previous code, though I find it strange.
      var startValue = selectClosestValue(translator.from(startPosition, -1), that._values);
      sliders[0].setDisplayValue(startValue);
      sliders[1].setDisplayValue(selectClosestValue(translator.from(translator.to(startValue, -1) + interval, +1), that._values));
      sliders[0]._position = startPosition;
      sliders[1]._position = endPosition;
      that._applyTotalPosition(isAnimated);
      if (that._isOnMoving) {
        that._processSelectionChanged(e);
      }
    },
    placeSliderAndBeginMoving: function placeSliderAndBeginMoving(firstPosition, secondPosition, e) {
      var that = this;
      var translator = that._params.translator;
      var sliders = that._sliders;
      var index = firstPosition < secondPosition ? 0 : 1;
      var dir = index > 0 ? +1 : -1;
      var compare = index > 0 ? isGreater : isLess;
      var antiCompare = index > 0 ? isLess : isGreater;
      var thresholdPosition;
      var positions = [];
      var values = [];
      values[index] = translator.from(firstPosition, dir);
      values[1 - index] = translator.from(secondPosition, -dir);
      positions[1 - index] = secondPosition;
      if (translator.isValueProlonged) {
        // Ensure that first value is strictly to the outer side from the "firstPosition".
        if (compare(firstPosition, translator.to(values[index], dir))) {
          values[index] = translator.from(firstPosition, -dir);
        }
        // Check - if "secondPosition" is closer to "firstPosition" than a span of a single category.
        if (compare(secondPosition, translator.to(values[index], -dir))) {
          values[1 - index] = values[index];
        }
      }
      if (that._minRange) {
        thresholdPosition = translator.to(translator.add(selectClosestValue(values[index], that._values), that._minRange, -dir), -dir);
        // Check - if "secondPosition" is closer to "firstPosition" than it is allowed by "minRange".
        if (compare(secondPosition, thresholdPosition)) {
          values[1 - index] = translator.add(values[index], that._minRange, -dir);
        }
        thresholdPosition = translator.to(translator.add(translator.getRange()[1 - index], that._minRange, dir), -dir);
        // Check - if "firstPosition" is closer to an end than it is allowed by "minRange".
        // So there is definitely not enough space for both sliders - the first  (as the one which is farther from the end) has to be moved away by "minRange".
        if (antiCompare(firstPosition, thresholdPosition)) {
          values[1 - index] = translator.getRange()[1 - index];
          values[index] = translator.add(values[1 - index], that._minRange, dir);
          positions[1 - index] = firstPosition;
        }
      }
      values[0] = selectClosestValue(values[0], that._values);
      values[1] = selectClosestValue(values[1], that._values);
      positions[index] = translator.to(values[index], dir);
      sliders[0].setDisplayValue(values[0]);
      sliders[1].setDisplayValue(values[1]);
      sliders[0]._position = positions[0];
      sliders[1]._position = positions[1];
      that._applyTotalPosition(true);
      if (that._isOnMoving) {
        that._processSelectionChanged(e);
      }
      var handler = that.beginSliderMoving(1 - index, secondPosition);
      sliders[1 - index]._sliderGroup.stopAnimation();
      that._shutter.stopAnimation();
      handler(secondPosition);
      return handler;
    },
    beginSliderMoving: function beginSliderMoving(initialIndex, initialPosition) {
      var that = this;
      var translator = that._params.translator;
      var sliders = that._sliders;
      var minPosition = translator.getScreenRange()[0];
      var maxPosition = translator.getScreenRange()[1];
      var index = initialIndex;
      var staticPosition = sliders[1 - index].getPosition();
      var currentPosition = initialPosition;
      var dir = index > 0 ? +1 : -1;
      var compareMin = index > 0 ? isLess : isGreater;
      var compareMax = index > 0 ? isGreater : isLess;
      var moveOffset = sliders[index].getPosition() - initialPosition;
      var swapOffset = compareMin(sliders[index].getPosition(), initialPosition) ? -moveOffset : moveOffset;
      move.complete = function (e) {
        sliders[index]._setValid(true);
        that._dockSelectedArea(e);
      };
      return move;
      function move(position, e) {
        var isValid;
        var temp;
        var pos;
        var slider;
        var value;
        if (position !== currentPosition) {
          if (compareMin(position + swapOffset, staticPosition)) {
            isValid = that._allowSlidersSwap;
            // TODO: Validate "_minRange" so that for discrete translator it is always null - that will allow to split "isValueProlonged" and "_minRange" checks
            if (isValid && !translator.isValueProlonged && that._minRange) {
              isValid = translator.isValid(translator.add(sliders[1 - index].getValue(), that._minRange, -dir));
            }
            if (isValid) {
              that._changeMovingSlider(index);
              index = 1 - index;
              dir = -dir;
              temp = compareMin;
              compareMin = compareMax;
              compareMax = temp;
              moveOffset = -dir * Math.abs(moveOffset);
              swapOffset = -moveOffset;
            }
          }
          if (compareMax(position + moveOffset, staticPosition)) {
            slider = sliders[index];
            value = sliders[1 - index].getValue();
            pos = Math.max(Math.min(position + moveOffset, maxPosition), minPosition);
            // TODO: Write it as single operation (isValid = ... && ... && ...) when code is stable.
            // Check - if moving slider is closer to static slider than a span of a single category.
            isValid = translator.isValueProlonged ? !compareMin(pos, translator.to(value, dir)) : true;
            var invalidStateValue;
            // Check - if moving slider is closer to static slider than it is allowed "minRange".
            if (isValid && that._minRange) {
              isValid = !compareMin(pos, translator.to(translator.add(value, that._minRange, dir), dir));
              if (!isValid) {
                invalidStateValue = translator.add(value, that._minRange, dir);
              }
            }
            // Check - if moving slider is farther from static slider than it is allowed by "maxRange"
            if (isValid && that._maxRange) {
              isValid = !compareMax(pos, translator.to(translator.add(value, that._maxRange, dir), dir));
              if (!isValid) {
                invalidStateValue = translator.add(value, that._maxRange, dir);
              }
            }
            slider._setValid(isValid);
            slider.setDisplayValue(isValid ? selectClosestValue(translator.from(pos, dir), that._values) : (0, _type.isDefined)(invalidStateValue) ? invalidStateValue : slider.getValue());
            slider._position = pos;
            that._applyTotalPosition(false);
            slider.toForeground();
            if (that._isOnMoving) {
              that._processSelectionChanged(e);
            }
          }
        }
        currentPosition = position;
      }
    },
    _changeMovingSlider: function _changeMovingSlider(index) {
      var that = this;
      var translator = that._params.translator;
      var sliders = that._sliders;
      var position = sliders[1 - index].getPosition();
      var dir = index > 0 ? +1 : -1;
      var newValue;
      sliders[index].setDisplayValue(selectClosestValue(translator.from(position, dir), that._values));
      newValue = translator.from(position, -dir);
      if (translator.isValueProlonged) {
        newValue = translator.from(position, dir);
      } else if (that._minRange) {
        // TODO: Consider adding "translator.isValid" check - that will allow to split "if-else" into two "if"
        newValue = translator.add(newValue, that._minRange, -dir);
      }
      sliders[1 - index].setDisplayValue(selectClosestValue(newValue, that._values));
      sliders[index]._setValid(true);
      sliders[index]._marker._update(); // This is to update "text" element
      sliders[0]._position = sliders[1]._position = position;
    },
    foregroundSlider: function foregroundSlider(index) {
      this._sliders[index].toForeground();
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","./common","./slider","../core/utils","../../core/utils/type","../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("./common"), require("./slider"), require("../core/utils"), require("../../core/utils/type"), require("../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sliders_controller.js.map