!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/vectorMapParts/commons.js"], ["jquery","../../../helpers/vizMocks.js","viz/vector_map/vector_map.utils","viz/vector_map/projection.main","viz/vector_map/control_bar/control_bar","viz/vector_map/gesture_handler","viz/vector_map/tracker","viz/core/base_theme_manager","viz/vector_map/data_exchanger","viz/vector_map/legend","viz/vector_map/layout","viz/vector_map/map_layer","viz/vector_map/tooltip_viewer","viz/core/renderers/renderer","viz/core/title","viz/core/export","viz/core/tooltip","core/utils/size","viz/vector_map"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/vectorMapParts/commons.js', ['jquery', '../../../helpers/vizMocks.js', 'viz/vector_map/vector_map.utils', 'viz/vector_map/projection.main', 'viz/vector_map/control_bar/control_bar', 'viz/vector_map/gesture_handler', 'viz/vector_map/tracker', 'viz/core/base_theme_manager', 'viz/vector_map/data_exchanger', 'viz/vector_map/legend', 'viz/vector_map/layout', 'viz/vector_map/map_layer', 'viz/vector_map/tooltip_viewer', 'viz/core/renderers/renderer', 'viz/core/title', 'viz/core/export', 'viz/core/tooltip', 'core/utils/size', 'viz/vector_map'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const vizMocks = $__require('../../../helpers/vizMocks.js');
    const dxVectorMapUtils = $__require('viz/vector_map/vector_map.utils');

    const projectionModule = $__require('viz/vector_map/projection.main');
    const controlBarModule = $__require('viz/vector_map/control_bar/control_bar');
    const gestureHandlerModule = $__require('viz/vector_map/gesture_handler');
    const trackerModule = $__require('viz/vector_map/tracker');
    const themeManagerModule = $__require('viz/core/base_theme_manager');
    const dataExchangerModule = $__require('viz/vector_map/data_exchanger');
    const legendModule = $__require('viz/vector_map/legend');
    const layoutModule = $__require('viz/vector_map/layout');
    const mapLayerModule = $__require('viz/vector_map/map_layer');
    const tooltipViewerModule = $__require('viz/vector_map/tooltip_viewer');

    const StubProjection = vizMocks.stubClass(projectionModule.Projection);
    const StubControlBar = vizMocks.stubClass(controlBarModule.ControlBar);
    const StubGestureHandler = vizMocks.stubClass(gestureHandlerModule.GestureHandler);
    const StubTracker = vizMocks.stubClass(trackerModule.Tracker);
    const StubThemeManager = vizMocks.stubClass(themeManagerModule.BaseThemeManager);
    const StubDataExchanger = vizMocks.stubClass(dataExchangerModule.DataExchanger);
    const StubLegendsControl = vizMocks.stubClass(legendModule.LegendsControl);
    const StubLayoutControl = vizMocks.stubClass(layoutModule.LayoutControl);
    const StubMapLayerCollection = vizMocks.stubClass(mapLayerModule.MapLayerCollection);
    const StubTooltipViewer = vizMocks.stubClass(tooltipViewerModule.TooltipViewer);

    const rendererModule = $__require('viz/core/renderers/renderer');
    const titleModule = $__require('viz/core/title');
    const exportModule = $__require('viz/core/export');
    const tooltipModule = $__require('viz/core/tooltip');
    const { implementationsMap } = $__require('core/utils/size');

    $__require('viz/vector_map');

    const StubExportMenu = vizMocks.stubClass(exportModule.ExportMenu);

    function returnValue(value) {
        return function () {
            return value;
        };
    }
    exports.returnValue = returnValue;

    StubThemeManager.prototype.setTheme = function () {
        vizMocks.forceThemeOptions(this);
    };

    function stubComponentConstructors(test) {
        rendererModule.Renderer = returnValue(test.renderer);
        // $.extend(DevExpress.viz, {
        //     LoadingIndicator: returnValue(test.loadingIndicator)
        // });
        titleModule.DEBUG_set_title(returnValue(test.title));
        tooltipModule.DEBUG_set_tooltip(returnValue(test.tooltip));
        exportModule.DEBUG_set_ExportMenu(returnValue(test.exportMenu));

        projectionModule.Projection = returnValue(test.projection);
        controlBarModule.ControlBar = returnValue(test.controlBar);
        gestureHandlerModule.GestureHandler = returnValue(test.gestureHandler);
        trackerModule.Tracker = returnValue(test.tracker);
        themeManagerModule.BaseThemeManager = returnValue(test.themeManager);
        dataExchangerModule.DataExchanger = returnValue(test.dataExchanger);
        legendModule.LegendsControl = returnValue(test.legendsControl);
        layoutModule.LayoutControl = returnValue(test.layoutControl);
        mapLayerModule.MapLayerCollection = returnValue(test.layerCollection);
        tooltipViewerModule.TooltipViewer = returnValue(test.tooltipViewer);
    }
    exports.stubComponentConstructors = stubComponentConstructors;

    exports.environment = {
        beforeEach: function () {
            dxVectorMapUtils._TESTS_resetDataKey();
            this.$container = $('<div id="test-container"></div>');
            this.renderer = new vizMocks.Renderer();
            this.themeManager = new StubThemeManager();
            this.themeManager.stub('theme').returns({});
            this.dataExchanger = new StubDataExchanger();
            this.gestureHandler = new StubGestureHandler();
            this.projection = new StubProjection();
            this.layoutControl = new StubLayoutControl();
            this.tracker = new StubTracker();
            this.layerCollection = new StubMapLayerCollection();
            this.controlBar = new StubControlBar();
            this.legendsControl = new StubLegendsControl();
            this.tooltipViewer = new StubTooltipViewer();
            this.loadingIndicator = new vizMocks.LoadingIndicator();
            this.title = new vizMocks.Title();
            this.exportMenu = new StubExportMenu();
            this.tooltip = new vizMocks.Tooltip();
            this._$fn_width = implementationsMap.getWidth;
            this._$fn_height = implementationsMap.getHeight;
            implementationsMap.getWidth = returnValue(400);
            implementationsMap.getHeight = returnValue(300);
            stubComponentConstructors(this);
        },

        afterEach: function () {
            this.$container.remove(); //  To invoke Component disposing mechanism
            implementationsMap.getWidth = this._$fn_width;
            implementationsMap.getHeight = this._$fn_height;
        },

        createMap: function (options) {
            this.map = this.$container.dxVectorMap(options).dxVectorMap('instance');
            return this.map;
        }
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/vizMocks.js","viz/vector_map/vector_map.utils","viz/vector_map/projection.main","viz/vector_map/control_bar/control_bar","viz/vector_map/gesture_handler","viz/vector_map/tracker","viz/core/base_theme_manager","viz/vector_map/data_exchanger","viz/vector_map/legend","viz/vector_map/layout","viz/vector_map/map_layer","viz/vector_map/tooltip_viewer","viz/core/renderers/renderer","viz/core/title","viz/core/export","viz/core/tooltip","core/utils/size","viz/vector_map"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/vizMocks.js"), require("viz/vector_map/vector_map.utils"), require("viz/vector_map/projection.main"), require("viz/vector_map/control_bar/control_bar"), require("viz/vector_map/gesture_handler"), require("viz/vector_map/tracker"), require("viz/core/base_theme_manager"), require("viz/vector_map/data_exchanger"), require("viz/vector_map/legend"), require("viz/vector_map/layout"), require("viz/vector_map/map_layer"), require("viz/vector_map/tooltip_viewer"), require("viz/core/renderers/renderer"), require("viz/core/title"), require("viz/core/export"), require("viz/core/tooltip"), require("core/utils/size"), require("viz/vector_map"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=commons.js.map