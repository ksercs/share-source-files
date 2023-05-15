!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/themes.js"], ["../core/utils/extend","../core/utils/iterator","./core/utils","../ui/themes","../core/utils/type","./core/themes/generic.light","./core/themes/generic.carmine","./core/themes/generic.dark","./core/themes/generic.contrast","./core/themes/generic.darkmoon","./core/themes/generic.darkviolet","./core/themes/generic.greenmist","./core/themes/generic.softblue","./core/themes/material"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/themes.js", ["../core/utils/extend", "../core/utils/iterator", "./core/utils", "../ui/themes", "../core/utils/type", "./core/themes/generic.light", "./core/themes/generic.carmine", "./core/themes/generic.dark", "./core/themes/generic.contrast", "./core/themes/generic.darkmoon", "./core/themes/generic.darkviolet", "./core/themes/generic.greenmist", "./core/themes/generic.softblue", "./core/themes/material"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.addCacheItem = addCacheItem;
  exports.currentTheme = currentTheme;
  exports.getTheme = getTheme;
  exports.refreshTheme = refreshTheme;
  exports.registerTheme = registerTheme;
  exports.registerThemeSchemeAlias = registerThemeSchemeAlias;
  exports.removeCacheItem = removeCacheItem;
  exports.widgetsCache = exports.themesSchemeMapping = exports.themesMapping = exports.themes = exports.resetCurrentTheme = void 0;
  var _extend2 = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _utils = $__require("./core/utils");
  var _themes = $__require("../ui/themes");
  var _type = $__require("../core/utils/type");
  var _generic = _interopRequireDefault($__require("./core/themes/generic.light"));
  var _generic2 = _interopRequireDefault($__require("./core/themes/generic.carmine"));
  var _generic3 = _interopRequireDefault($__require("./core/themes/generic.dark"));
  var _generic4 = _interopRequireDefault($__require("./core/themes/generic.contrast"));
  var _generic5 = _interopRequireDefault($__require("./core/themes/generic.darkmoon"));
  var _generic6 = _interopRequireDefault($__require("./core/themes/generic.darkviolet"));
  var _generic7 = _interopRequireDefault($__require("./core/themes/generic.greenmist"));
  var _generic8 = _interopRequireDefault($__require("./core/themes/generic.softblue"));
  var _material = _interopRequireDefault($__require("./core/themes/material"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var themes = {};
  exports.themes = themes;
  var themesMapping = {};
  exports.themesMapping = themesMapping;
  var themesSchemeMapping = {};
  exports.themesSchemeMapping = themesSchemeMapping;
  var _extend = _extend2.extend;
  var _each = _iterator.each;
  var currentThemeName = null;
  var defaultTheme;
  var nextCacheUid = 0;
  var widgetsCache = {};
  exports.widgetsCache = widgetsCache;
  function getTheme(themeName) {
    var name = (0, _utils.normalizeEnum)(themeName);
    return themes[name] || themes[themesMapping[name] || currentTheme()];
  }
  function findThemeNameByName(name, scheme) {
    return themesMapping[name + '.' + scheme] || themesSchemeMapping[name + '.' + scheme] || themesMapping[name];
  }
  function findThemeNameByPlatform(platform, version, scheme) {
    return findThemeNameByName(platform + version, scheme) || findThemeNameByName(platform, scheme);
  }
  function currentTheme(themeName, colorScheme) {
    if (!arguments.length) {
      return currentThemeName || findThemeNameByName((0, _themes.current)()) || defaultTheme;
    }
    var scheme = (0, _utils.normalizeEnum)(colorScheme);
    currentThemeName = (themeName && themeName.platform ? findThemeNameByPlatform((0, _utils.normalizeEnum)(themeName.platform), themeName.version, scheme) : findThemeNameByName((0, _utils.normalizeEnum)(themeName), scheme)) || currentThemeName;
    // For chaining only
    return this;
  }
  function getThemeInfo(themeName, splitter) {
    var k = themeName.indexOf(splitter);
    return k > 0 ? {
      name: themeName.substring(0, k),
      scheme: themeName.substring(k + 1)
    } : null;
  }
  function registerThemeName(themeName, targetThemeName) {
    var themeInfo = getThemeInfo(themeName, '.') || {
      name: themeName
    };
    var name = themeInfo.name;
    var scheme = themeInfo.scheme;
    if (scheme) {
      themesMapping[name] = themesMapping[name] || targetThemeName;
      themesMapping[name + '.' + scheme] = targetThemeName;
    } else {
      themesMapping[name] = targetThemeName;
    }
  }
  function registerTheme(theme, baseThemeName) {
    var themeName = (0, _utils.normalizeEnum)(theme && theme.name);
    if (themeName) {
      theme.isDefault && (defaultTheme = themeName);
      registerThemeName(themeName, themeName);
      themes[themeName] = _extend(true, {}, getTheme(baseThemeName), patchTheme(theme));
    }
  }
  function registerThemeSchemeAlias(from, to) {
    themesSchemeMapping[from] = to;
  }
  function mergeScalar(target, field, source, sourceValue) {
    var _value = source ? source[field] : sourceValue;
    if (_value !== undefined && target[field] === undefined) {
      target[field] = _value;
    }
  }
  function mergeObject(target, field, source, sourceValue) {
    var _value = source ? source[field] : sourceValue;
    if (_value !== undefined) {
      target[field] = _extend(true, {}, _value, target[field]);
    }
  }

  // TODO: Font initialization should be done here
  function patchTheme(theme) {
    theme = _extend(true, {
      loadingIndicator: {
        font: {}
      },
      'export': {
        font: {}
      },
      legend: {
        font: {},
        border: {}
      },
      title: {
        font: {}
      },
      tooltip: {
        font: {}
      },
      'chart:common': {},
      'chart:common:axis': {
        grid: {},
        minorGrid: {},
        tick: {},
        minorTick: {},
        title: {
          font: {}
        },
        label: {
          font: {}
        }
      },
      'chart:common:annotation': {
        font: {},
        border: {}
      },
      chart: {
        commonSeriesSettings: {
          candlestick: {}
        }
      },
      pie: {},
      polar: {},
      gauge: {
        scale: {
          tick: {},
          minorTick: {},
          label: {
            font: {}
          }
        }
      },
      barGauge: {},
      funnel: {},
      sankey: {},
      map: {
        background: {}
      },
      treeMap: {
        tile: {
          selectionStyle: {
            border: {}
          }
        },
        group: {
          border: {},
          selectionStyle: {
            border: {}
          },
          label: {
            font: {}
          }
        }
      },
      rangeSelector: {
        scale: {
          tick: {},
          minorTick: {},
          label: {
            font: {}
          }
        },
        chart: {}
      },
      sparkline: {},
      bullet: {}
    }, theme);
    mergeScalar(theme.loadingIndicator, 'backgroundColor', theme);
    mergeScalar(theme.chart.commonSeriesSettings.candlestick, 'innerColor', null, theme.backgroundColor);
    mergeScalar(theme.map.background, 'color', null, theme.backgroundColor);
    mergeScalar(theme.title.font, 'color', null, theme.primaryTitleColor);
    mergeObject(theme.title, 'subtitle', null, theme.title);
    mergeScalar(theme.legend.font, 'color', null, theme.secondaryTitleColor);
    mergeScalar(theme.legend.border, 'color', null, theme.gridColor);
    patchAxes(theme);
    _each(['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sparkline', 'bullet', 'sankey'], function (_, section) {
      mergeScalar(theme[section], 'redrawOnResize', theme);
      mergeScalar(theme[section], 'containerBackgroundColor', null, theme.backgroundColor);
      mergeObject(theme[section], 'tooltip', theme);
      mergeObject(theme[section], 'export', theme);
    });
    _each(['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sankey'], function (_, section) {
      mergeObject(theme[section], 'loadingIndicator', theme);
      mergeObject(theme[section], 'legend', theme);
      mergeObject(theme[section], 'title', theme);
    });
    _each(['chart', 'pie', 'polar'], function (_, section) {
      mergeObject(theme, section, null, theme['chart:common']);
    });
    _each(['chart', 'polar'], function (_, section) {
      theme[section] = theme[section] || {};
      mergeObject(theme[section], 'commonAxisSettings', null, theme['chart:common:axis']);
    });
    _each(['chart', 'polar', 'map', 'pie'], function (_, section) {
      theme[section] = theme[section] || {};
      mergeObject(theme[section], 'commonAnnotationSettings', null, theme['chart:common:annotation']);
    });
    mergeObject(theme.rangeSelector.chart, 'commonSeriesSettings', theme.chart);
    mergeObject(theme.rangeSelector.chart, 'dataPrepareSettings', theme.chart);
    mergeScalar(theme.treeMap.group.border, 'color', null, theme.gridColor);
    mergeScalar(theme.treeMap.tile.selectionStyle.border, 'color', null, theme.primaryTitleColor);
    mergeScalar(theme.treeMap.group.selectionStyle.border, 'color', null, theme.primaryTitleColor);
    mergeScalar(theme.map.legend, 'backgroundColor', theme);
    patchMapLayers(theme);
    return theme;
  }
  function patchAxes(theme) {
    var commonAxisSettings = theme['chart:common:axis'];
    var colorFieldName = 'color';
    _each([commonAxisSettings.grid, commonAxisSettings.minorGrid], function (_, obj) {
      mergeScalar(obj, colorFieldName, null, theme.gridColor);
    });
    _each([commonAxisSettings, commonAxisSettings.tick, commonAxisSettings.minorTick, commonAxisSettings.label.font], function (_, obj) {
      mergeScalar(obj, colorFieldName, null, theme.axisColor);
    });
    mergeScalar(commonAxisSettings.title.font, colorFieldName, null, theme.secondaryTitleColor);
    mergeScalar(theme.gauge.scale.label.font, colorFieldName, null, theme.axisColor);
    mergeScalar(theme.gauge.scale.tick, colorFieldName, null, theme.backgroundColor);
    mergeScalar(theme.gauge.scale.minorTick, colorFieldName, null, theme.backgroundColor);
    mergeScalar(theme.rangeSelector.scale.label.font, colorFieldName, null, theme.axisColor);
  }
  function patchMapLayers(theme) {
    var map = theme.map;
    _each(['area', 'line', 'marker'], function (_, section) {
      mergeObject(map, 'layer:' + section, null, map.layer);
    });
    _each(['dot', 'bubble', 'pie', 'image'], function (_, section) {
      mergeObject(map, 'layer:marker:' + section, null, map['layer:marker']);
    });
  }
  function addCacheItem(target) {
    var cacheUid = ++nextCacheUid;
    target._cache = cacheUid;
    widgetsCache[cacheUid] = target;
  }
  function removeCacheItem(target) {
    delete widgetsCache[target._cache];
  }
  function refreshTheme() {
    _each(widgetsCache, function () {
      this.refresh();
    });
    // For chaining only
    return this;
  }

  // register themes
  if ((0, _type.isEmptyObject)(themes) && (0, _type.isEmptyObject)(themesMapping) && !defaultTheme) {
    [].concat(_generic.default, _generic2.default, _generic3.default, _generic4.default, _generic5.default, _generic6.default, _generic7.default, _generic8.default, _material.default).forEach(function (t) {
      registerTheme(t.theme, t.baseThemeName);
    });
  }

  ///#DEBUG

  var resetCurrentTheme = function resetCurrentTheme() {
    currentThemeName = null;
  };
  ///#ENDDEBUG
  exports.resetCurrentTheme = resetCurrentTheme;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/extend","../core/utils/iterator","./core/utils","../ui/themes","../core/utils/type","./core/themes/generic.light","./core/themes/generic.carmine","./core/themes/generic.dark","./core/themes/generic.contrast","./core/themes/generic.darkmoon","./core/themes/generic.darkviolet","./core/themes/generic.greenmist","./core/themes/generic.softblue","./core/themes/material"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/extend"), require("../core/utils/iterator"), require("./core/utils"), require("../ui/themes"), require("../core/utils/type"), require("./core/themes/generic.light"), require("./core/themes/generic.carmine"), require("./core/themes/generic.dark"), require("./core/themes/generic.contrast"), require("./core/themes/generic.darkmoon"), require("./core/themes/generic.darkviolet"), require("./core/themes/generic.greenmist"), require("./core/themes/generic.softblue"), require("./core/themes/material"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=themes.js.map