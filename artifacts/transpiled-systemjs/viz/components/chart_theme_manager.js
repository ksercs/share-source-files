!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/components/chart_theme_manager.js"], ["../../core/utils/common","../../core/utils/type","../../core/utils/extend","../core/base_theme_manager","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/components/chart_theme_manager.js", ["../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "../core/base_theme_manager", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ThemeManager = void 0;
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _base_theme_manager = $__require("../core/base_theme_manager");
  var _utils = $__require("../core/utils");
  var ThemeManager = _base_theme_manager.BaseThemeManager.inherit(function () {
    var ctor = function ctor(params) {
      var that = this;
      that.callBase.apply(that, arguments);
      var options = params.options || {};
      that._userOptions = options;
      that._mergeAxisTitleOptions = [];
      that._multiPieColors = {};

      // This is required because chart calls "_getOption" during "_init" stage
      // TODO: Remove it when chart stops doing that
      that._callback = _common.noop;
    };
    var dispose = function dispose() {
      var that = this;
      that.palette && that.palette.dispose();
      that.palette = that._userOptions = that._mergedSettings = that._multiPieColors = null;
      return that.callBase.apply(that, arguments);
    };
    var resetPalette = function resetPalette() {
      this.palette.reset();
      this._multiPieColors = {};
    };
    var processTitleOptions = function processTitleOptions(options) {
      return (0, _type.isString)(options) ? {
        text: options
      } : options;
    };
    var processAxisOptions = function processAxisOptions(axisOptions) {
      if (!axisOptions) {
        return {};
      }
      axisOptions = (0, _extend.extend)(true, {}, axisOptions);
      axisOptions.title = processTitleOptions(axisOptions.title);
      if (axisOptions.type === 'logarithmic' && axisOptions.logarithmBase <= 0 || axisOptions.logarithmBase && !(0, _type.isNumeric)(axisOptions.logarithmBase)) {
        axisOptions.logarithmBase = undefined;
        axisOptions.logarithmBaseError = true;
      }
      if (axisOptions.label) {
        if (axisOptions.label.alignment) {
          axisOptions.label['userAlignment'] = true;
        }
      }
      return axisOptions;
    };
    var applyParticularAxisOptions = function applyParticularAxisOptions(name, userOptions, rotated) {
      var theme = this._theme;
      var position = !(rotated ^ name === 'valueAxis') ? 'horizontalAxis' : 'verticalAxis';
      var processedUserOptions = processAxisOptions(userOptions);
      var commonAxisSettings = processAxisOptions(this._userOptions['commonAxisSettings']);
      var mergeOptions = (0, _extend.extend)(true, {}, theme.commonAxisSettings, theme[position], theme[name], commonAxisSettings, processedUserOptions);
      mergeOptions.workWeek = processedUserOptions.workWeek || theme[name].workWeek;
      mergeOptions.forceUserTickInterval |= (0, _type.isDefined)(processedUserOptions.tickInterval) && !(0, _type.isDefined)(processedUserOptions.axisDivisionFactor);
      return mergeOptions;
    };
    var mergeOptions = function mergeOptions(name, userOptions) {
      userOptions = userOptions || this._userOptions[name];
      var theme = this._theme[name];
      var result = this._mergedSettings[name];
      if (result) {
        return result;
      }
      if ((0, _type.isPlainObject)(theme) && (0, _type.isPlainObject)(userOptions)) {
        result = (0, _extend.extend)(true, {}, theme, userOptions);
      } else {
        result = (0, _type.isDefined)(userOptions) ? userOptions : theme;
      }
      this._mergedSettings[name] = result;
      return result;
    };
    var applyParticularTheme = {
      base: mergeOptions,
      argumentAxis: applyParticularAxisOptions,
      valueAxisRangeSelector: function valueAxisRangeSelector() {
        return mergeOptions.call(this, 'valueAxis');
      },
      valueAxis: applyParticularAxisOptions,
      series: function series(name, userOptions, seriesCount) {
        var that = this;
        var theme = that._theme;
        var userCommonSettings = that._userOptions.commonSeriesSettings || {};
        var themeCommonSettings = theme.commonSeriesSettings;
        var widgetType = that._themeSection.split('.').slice(-1)[0];
        var type = (0, _utils.normalizeEnum)(userOptions.type || userCommonSettings.type || themeCommonSettings.type || widgetType === 'pie' && theme.type); // userCommonSettings.type && themeCommonSettings.type deprecated in 15.2 in pie
        var palette = that.palette;
        var isBar = ~type.indexOf('bar');
        var isLine = ~type.indexOf('line');
        var isArea = ~type.indexOf('area');
        var isBubble = type === 'bubble';
        var mainSeriesColor;
        var resolveLabelsOverlapping = that.getOptions('resolveLabelsOverlapping');
        var containerBackgroundColor = that.getOptions('containerBackgroundColor');
        var seriesTemplate = applyParticularTheme.seriesTemplate.call(this);
        var seriesVisibility;
        if (isBar || isBubble) {
          userOptions = (0, _extend.extend)(true, {}, userCommonSettings, userCommonSettings[type], userOptions);
          seriesVisibility = userOptions.visible;
          userCommonSettings = {
            type: {}
          };
          (0, _extend.extend)(true, userOptions, userOptions.point);
          userOptions.visible = seriesVisibility;
        }
        var settings = (0, _extend.extend)(true, {
          aggregation: {}
        }, themeCommonSettings, themeCommonSettings[type], userCommonSettings, userCommonSettings[type], userOptions);
        settings.aggregation.enabled = widgetType === 'chart' && !!settings.aggregation.enabled;
        settings.type = type;
        settings.widgetType = widgetType;
        settings.containerBackgroundColor = containerBackgroundColor;
        if (widgetType !== 'pie') {
          mainSeriesColor = (0, _utils.extractColor)(settings.color, true) || palette.getNextColor(seriesCount);
        } else {
          mainSeriesColor = function mainSeriesColor(argument, index, count) {
            var cat = "".concat(argument, "-").concat(index);
            if (!that._multiPieColors[cat]) {
              that._multiPieColors[cat] = palette.getNextColor(count);
            }
            return that._multiPieColors[cat];
          };
        }
        settings.mainSeriesColor = mainSeriesColor;
        settings.resolveLabelsOverlapping = resolveLabelsOverlapping;
        if (settings.label && (isLine || isArea && type !== 'rangearea' || type === 'scatter')) {
          settings.label.position = 'outside';
        }
        if (seriesTemplate) {
          settings.nameField = seriesTemplate.nameField;
        }
        return settings;
      },
      animation: function animation(name) {
        var userOptions = this._userOptions[name];
        userOptions = (0, _type.isPlainObject)(userOptions) ? userOptions : (0, _type.isDefined)(userOptions) ? {
          enabled: !!userOptions
        } : {};
        return mergeOptions.call(this, name, userOptions);
      },
      seriesTemplate: function seriesTemplate() {
        var value = mergeOptions.call(this, 'seriesTemplate');
        if (value) {
          value.nameField = value.nameField || 'series';
        }
        return value;
      },
      zoomAndPan: function zoomAndPan() {
        function parseOption(option) {
          option = (0, _utils.normalizeEnum)(option);
          var pan = option === 'pan' || option === 'both';
          var zoom = option === 'zoom' || option === 'both';
          return {
            pan: pan,
            zoom: zoom,
            none: !pan && !zoom
          };
        }
        var options = mergeOptions.call(this, 'zoomAndPan');
        return {
          valueAxis: parseOption(options.valueAxis),
          argumentAxis: parseOption(options.argumentAxis),
          dragToZoom: !!options.dragToZoom,
          dragBoxStyle: {
            class: 'dxc-shutter',
            fill: options.dragBoxStyle.color,
            opacity: options.dragBoxStyle.opacity
          },
          panKey: options.panKey,
          allowMouseWheel: !!options.allowMouseWheel,
          allowTouchGestures: !!options.allowTouchGestures
        };
      }
    };
    return {
      _themeSection: 'chart',
      ctor: ctor,
      dispose: dispose,
      resetPalette: resetPalette,
      getOptions: function getOptions(name) {
        return (applyParticularTheme[name] || applyParticularTheme.base).apply(this, arguments);
      },
      refresh: function refresh() {
        this._mergedSettings = {};
        return this.callBase.apply(this, arguments);
      },
      _initializeTheme: function _initializeTheme() {
        var that = this;
        that.callBase.apply(that, arguments);
        that.updatePalette();
      },
      resetOptions: function resetOptions(name) {
        this._mergedSettings[name] = null;
      },
      update: function update(options) {
        this._userOptions = options;
      },
      updatePalette: function updatePalette() {
        var that = this;
        that.palette = that.createPalette(that.getOptions('palette'), {
          useHighlight: true,
          extensionMode: that.getOptions('paletteExtensionMode')
        });
      }
    };
  }());
  exports.ThemeManager = ThemeManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/type","../../core/utils/extend","../core/base_theme_manager","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../core/base_theme_manager"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chart_theme_manager.js.map