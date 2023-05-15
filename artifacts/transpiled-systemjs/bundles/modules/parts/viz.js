!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/bundles/modules/parts/viz.js"], ["./core","./data","../common.charts","../../../bundles/modules/viz","../../../viz/themes","../../../viz/export","../../../viz/palette","../../../viz/chart","../../../viz/pie_chart","../../../viz/polar_chart","../../../viz/linear_gauge","../../../viz/circular_gauge","../../../viz/bar_gauge","../../../viz/range_selector","../../../viz/vector_map","../../../viz/vector_map/projection","../../../viz/sparkline","../../../viz/bullet","../../../viz/tree_map","../../../viz/funnel","../../../viz/sankey","../../../viz/core/base_widget","../../../viz/utils","../../../viz/core/renderers/renderer","../../../viz/core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled/bundles/modules/parts/viz.js', ['./core', './data', '../common.charts', '../../../bundles/modules/viz', '../../../viz/themes', '../../../viz/export', '../../../viz/palette', '../../../viz/chart', '../../../viz/pie_chart', '../../../viz/polar_chart', '../../../viz/linear_gauge', '../../../viz/circular_gauge', '../../../viz/bar_gauge', '../../../viz/range_selector', '../../../viz/vector_map', '../../../viz/vector_map/projection', '../../../viz/sparkline', '../../../viz/bullet', '../../../viz/tree_map', '../../../viz/funnel', '../../../viz/sankey', '../../../viz/core/base_widget', '../../../viz/utils', '../../../viz/core/renderers/renderer', '../../../viz/core/utils'], true, function ($__require, exports, module) {
  "use strict";

  /* eslint-disable import/no-commonjs */

  var global = this || self,
      GLOBAL = global;
  var DevExpress = $__require('./core');
  $__require('./data');
  $__require('../common.charts');

  /// BUNDLER_PARTS
  /* Viz core (dx.module-viz-core.js) */

  var viz = DevExpress.viz = $__require('../../../bundles/modules/viz');
  viz.currentTheme = $__require('../../../viz/themes').currentTheme;
  viz.registerTheme = $__require('../../../viz/themes').registerTheme;
  viz.exportFromMarkup = $__require('../../../viz/export').exportFromMarkup;
  viz.getMarkup = $__require('../../../viz/export').getMarkup;
  viz.exportWidgets = $__require('../../../viz/export').exportWidgets;
  viz.currentPalette = $__require('../../../viz/palette').currentPalette;
  viz.getPalette = $__require('../../../viz/palette').getPalette;
  viz.generateColors = $__require('../../../viz/palette').generateColors;
  viz.registerPalette = $__require('../../../viz/palette').registerPalette;
  viz.refreshTheme = $__require('../../../viz/themes').refreshTheme;

  /* Charts (dx.module-viz-charts.js) */
  viz.dxChart = $__require('../../../viz/chart');
  viz.dxPieChart = $__require('../../../viz/pie_chart');
  viz.dxPolarChart = $__require('../../../viz/polar_chart');

  /* Gauges (dx.module-viz-gauges.js) */
  viz.dxLinearGauge = $__require('../../../viz/linear_gauge');
  viz.dxCircularGauge = $__require('../../../viz/circular_gauge');
  viz.dxBarGauge = $__require('../../../viz/bar_gauge');

  /* Range selector (dx.module-viz-rangeselector.js) */
  viz.dxRangeSelector = $__require('../../../viz/range_selector');

  /* Vector map (dx.module-viz-vectormap.js) */
  viz.dxVectorMap = $__require('../../../viz/vector_map');
  viz.map = {};
  viz.map.sources = {};
  viz.map.projection = $__require('../../../viz/vector_map/projection').projection;

  /* Sparklines (dx.module-viz-sparklines.js) */
  viz.dxSparkline = $__require('../../../viz/sparkline');
  viz.dxBullet = $__require('../../../viz/bullet');

  /* Treemap */
  viz.dxTreeMap = $__require('../../../viz/tree_map');

  /* Funnel */
  viz.dxFunnel = $__require('../../../viz/funnel');

  /* Sankey */
  viz.dxSankey = $__require('../../../viz/sankey');

  /// BUNDLER_PARTS_END

  viz.BaseWidget = $__require('../../../viz/core/base_widget');
  viz.getTheme = $__require('../../../viz/themes').getTheme;
  // Keep it for backward compatibility after renaming findTheme to getTheme
  viz.findTheme = $__require('../../../viz/themes').getTheme;
  // We need to keep this method as we suggested it to users
  viz.refreshAll = $__require('../../../viz/themes').refreshTheme;
  viz.refreshPaths = $__require('../../../viz/utils').refreshPaths;
  viz.gauges = {
    __internals: {}
  };
  viz._dashboard = {};
  viz._dashboard.Renderer = $__require('../../../viz/core/renderers/renderer').Renderer;
  viz._dashboard.SvgElement = $__require('../../../viz/core/renderers/renderer').SvgElement;
  viz._dashboard.patchFontOptions = $__require('../../../viz/core/utils').patchFontOptions;
  module.exports = viz;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./core","./data","../common.charts","../../../bundles/modules/viz","../../../viz/themes","../../../viz/export","../../../viz/palette","../../../viz/chart","../../../viz/pie_chart","../../../viz/polar_chart","../../../viz/linear_gauge","../../../viz/circular_gauge","../../../viz/bar_gauge","../../../viz/range_selector","../../../viz/vector_map","../../../viz/vector_map/projection","../../../viz/sparkline","../../../viz/bullet","../../../viz/tree_map","../../../viz/funnel","../../../viz/sankey","../../../viz/core/base_widget","../../../viz/utils","../../../viz/core/renderers/renderer","../../../viz/core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./core"), require("./data"), require("../common.charts"), require("../../../bundles/modules/viz"), require("../../../viz/themes"), require("../../../viz/export"), require("../../../viz/palette"), require("../../../viz/chart"), require("../../../viz/pie_chart"), require("../../../viz/polar_chart"), require("../../../viz/linear_gauge"), require("../../../viz/circular_gauge"), require("../../../viz/bar_gauge"), require("../../../viz/range_selector"), require("../../../viz/vector_map"), require("../../../viz/vector_map/projection"), require("../../../viz/sparkline"), require("../../../viz/bullet"), require("../../../viz/tree_map"), require("../../../viz/funnel"), require("../../../viz/sankey"), require("../../../viz/core/base_widget"), require("../../../viz/utils"), require("../../../viz/core/renderers/renderer"), require("../../../viz/core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=viz.js.map