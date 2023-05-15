!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/axes/tick.js"], ["../../core/utils/type","../../core/utils/extend","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/axes/tick.js", ["../../core/utils/type", "../../core/utils/extend", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.tick = createTick;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _deferred = $__require("../../core/utils/deferred");
  function getPathStyle(options) {
    return {
      stroke: options.color,
      'stroke-width': options.width,
      'stroke-opacity': options.opacity,
      opacity: 1
    };
  }
  function createTick(axis, renderer, tickOptions, gridOptions, skippedCategory, skipLabels, offset) {
    var tickOffset = offset || axis._tickOffset;
    var lineGroup = axis._axisLineGroup;
    var elementsGroup = axis._axisElementsGroup;
    var tickStyle = getPathStyle(tickOptions);
    var gridStyle = getPathStyle(gridOptions);
    var emptyStrRegExp = /^\s+$/;
    var axisOptions = axis.getOptions();
    var labelOptions = axisOptions.label;
    var labelStyle = axis._textOptions;
    function getLabelFontStyle(tick) {
      var fontStyle = axis._textFontStyles;
      var customizeColor = labelOptions.customizeColor;
      if (customizeColor && customizeColor.call) {
        fontStyle = (0, _extend.extend)({}, axis._textFontStyles, {
          fill: customizeColor.call(tick, tick)
        });
      }
      return fontStyle;
    }
    function createLabelHint(tick, range) {
      var labelHint = axis.formatHint(tick.value, labelOptions, range);
      if ((0, _type.isDefined)(labelHint) && labelHint !== '') {
        tick.getContentContainer().setTitle(labelHint);
      }
    }
    return function (value) {
      var tick = {
        value: value,
        updateValue: function updateValue(newValue) {
          this.value = value = newValue;
        },
        initCoords: function initCoords() {
          this.coords = axis._getTranslatedValue(value, tickOffset);
          this.labelCoords = axis._getTranslatedValue(value);
        },
        saveCoords: function saveCoords() {
          this._lastStoredCoordinates = {
            coords: this._storedCoords,
            labelCoords: this._storedLabelsCoords
          };
          this._storedCoords = this.coords;
          this._storedLabelsCoords = this.templateContainer ? this._getTemplateCoords() : this.labelCoords;
        },
        resetCoordinates: function resetCoordinates() {
          if (this._lastStoredCoordinates) {
            this._storedCoords = this._lastStoredCoordinates.coords;
            this._storedLabelsCoords = this._lastStoredCoordinates.labelCoords;
          }
        },
        drawMark: function drawMark(options) {
          if (!tickOptions.visible || skippedCategory === value) {
            return;
          }
          if (axis.areCoordsOutsideAxis(this.coords)) {
            return;
          }
          if (this.mark) {
            this.mark.append(lineGroup);
            axis.sharp(this.mark, axis.getSharpDirectionByCoords(this.coords));
            this.updateTickPosition(options);
          } else {
            this.mark = axis._createPathElement([], tickStyle, axis.getSharpDirectionByCoords(this.coords)).append(lineGroup);
            this.updateTickPosition(options);
          }
        },
        setSkippedCategory: function setSkippedCategory(category) {
          skippedCategory = category;
        },
        _updateLine: function _updateLine(lineElement, settings, storedSettings, animate, isGridLine) {
          if (!lineElement) {
            return;
          }
          if (settings.points === null || settings.r === null) {
            lineElement.remove();
            return;
          }
          if (animate && storedSettings && storedSettings.points !== null) {
            settings.opacity = 1;
            lineElement.attr(storedSettings);
            lineElement.animate(settings);
          } else {
            settings.opacity = animate ? 0 : 1;
            lineElement.attr(settings);
            animate && lineElement.animate({
              opacity: 1
            }, {
              delay: 0.5,
              partitionDuration: 0.5
            });
          }
          this.coords.angle && axis._rotateTick(lineElement, this.coords, isGridLine);
        },
        updateTickPosition: function updateTickPosition(options, animate) {
          this._updateLine(this.mark, {
            points: axis._getTickMarkPoints(tick.coords, tickOptions.length, options)
          }, this._storedCoords && {
            points: axis._getTickMarkPoints(tick._storedCoords, tickOptions.length, options)
          }, animate, false);
        },
        drawLabel: function drawLabel(range, template) {
          var _this = this;
          if (this.templateContainer && axis.isRendered()) {
            this.updateLabelPosition();
            return;
          }
          var labelIsVisible = labelOptions.visible && !skipLabels && !axis.getTranslator().getBusinessRange().isEmpty() && !axis.areCoordsOutsideAxis(this.labelCoords);
          if (!labelIsVisible) {
            if (this.label) {
              this.removeLabel();
            }
            return;
          }
          var templateOption = labelOptions.template;
          var text = axis.formatLabel(value, labelOptions, range);
          if (this.label) {
            this.label.attr({
              text: text,
              rotate: 0
            }).append(elementsGroup);
            createLabelHint(this, range);
            this.updateLabelPosition();
            return;
          }
          if (templateOption) {
            this.templateContainer = renderer.g().append(elementsGroup);
            this._templateDef && this._templateDef.reject();
            this._templateDef = new _deferred.Deferred();
            template.render({
              model: {
                valueText: text,
                value: this.value,
                labelFontStyle: getLabelFontStyle(this),
                labelStyle: labelStyle
              },
              container: this.templateContainer.element,
              onRendered: function onRendered() {
                _this.updateLabelPosition();
                _this._templateDef && _this._templateDef.resolve();
              }
            });
          } else {
            if ((0, _type.isDefined)(text) && text !== '' && !emptyStrRegExp.test(text)) {
              this.label = renderer.text(text).css(getLabelFontStyle(this)).attr(labelStyle).append(elementsGroup);
              this.updateLabelPosition();
              createLabelHint(this, range);
            }
          }
          var containerForData = this.getContentContainer();
          containerForData && containerForData.data('chart-data-argument', this.value);
          this.templateContainer && createLabelHint(this, range);
        },
        getTemplateDeferred: function getTemplateDeferred() {
          return this._templateDef;
        },
        getContentContainer: function getContentContainer() {
          return this.templateContainer || this.label;
        },
        fadeOutElements: function fadeOutElements() {
          var startSettings = {
            opacity: 1
          };
          var endSettings = {
            opacity: 0
          };
          var animationSettings = {
            partitionDuration: 0.5
          };
          if (this.getContentContainer()) {
            this._fadeOutLabel();
          }
          if (this.grid) {
            this.grid.append(axis._axisGridGroup).attr(startSettings).animate(endSettings, animationSettings);
          }
          if (this.mark) {
            this.mark.append(axis._axisLineGroup).attr(startSettings).animate(endSettings, animationSettings);
          }
        },
        _fadeInLabel: function _fadeInLabel() {
          var group = axis._renderer.g().attr({
            opacity: 0
          }).append(axis._axisElementsGroup).animate({
            opacity: 1
          }, {
            delay: 0.5,
            partitionDuration: 0.5
          });
          this.getContentContainer().append(group);
        },
        _fadeOutLabel: function _fadeOutLabel() {
          var group = axis._renderer.g().attr({
            opacity: 1
          }).animate({
            opacity: 0
          }, {
            partitionDuration: 0.5
          }).append(axis._axisElementsGroup).toBackground();
          this.getContentContainer().append(group);
        },
        _getTemplateCoords: function _getTemplateCoords() {
          return axis._getLabelAdjustedCoord(this, (axis._constantLabelOffset || 0) + (tick.labelOffset || 0));
        },
        updateLabelPosition: function updateLabelPosition(animate) {
          var templateContainer = this.templateContainer;
          if (!this.getContentContainer()) {
            return;
          }
          if (animate && this._storedLabelsCoords) {
            if (templateContainer) {
              templateContainer.attr(this._storedLabelsCoords);
              var lCoords = this._getTemplateCoords();
              templateContainer.animate(lCoords);
            } else {
              this.label.attr({
                x: this._storedLabelsCoords.x,
                y: this._storedLabelsCoords.y
              });
              this.label.animate({
                x: this.labelCoords.x,
                y: this.labelCoords.y
              });
            }
          } else {
            if (templateContainer) {
              var _lCoords = this._getTemplateCoords();
              templateContainer.attr(_lCoords);
            } else {
              this.label.attr({
                x: this.labelCoords.x,
                y: this.labelCoords.y
              });
            }
            if (animate) {
              this._fadeInLabel();
            }
          }
        },
        updateMultilineTextAlignment: function updateMultilineTextAlignment() {
          if (labelOptions.template || !this.label) {
            return;
          }
          this.label.attr({
            textsAlignment: this.labelAlignment || axis.getOptions().label.alignment
          });
        },
        drawGrid: function drawGrid(drawLine) {
          if (gridOptions.visible && skippedCategory !== this.value) {
            if (this.grid) {
              this.grid.append(axis._axisGridGroup);
              axis.sharp(this.grid, axis.getSharpDirectionByCoords(this.coords));
              this.updateGridPosition();
            } else {
              this.grid = drawLine(this, gridStyle);
              this.grid && this.grid.append(axis._axisGridGroup);
            }
          }
        },
        updateGridPosition: function updateGridPosition(animate) {
          this._updateLine(this.grid, axis._getGridPoints(tick.coords), this._storedCoords && axis._getGridPoints(this._storedCoords), animate, true);
        },
        removeLabel: function removeLabel() {
          var contentContainer = this.getContentContainer();
          contentContainer && contentContainer.remove();
          this._templateDef && this._templateDef.reject();
          this._templateDef = this.templateContainer = this.label = null;
        }
      };
      return tick;
    };
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tick.js.map