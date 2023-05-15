!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chartParts/commons.js"], ["../../../helpers/trackerMock.js","jquery","../../../helpers/vizMocks.js","viz/series/points/label","viz/components/chart_theme_manager","viz/chart_components/layout_manager","viz/core/utils","viz/core/series_family","viz/components/legend","viz/core/renderers/renderer","viz/core/tooltip","viz/core/title","viz/chart_components/crosshair","viz/chart_components/scroll_bar","viz/chart_components/tracker","viz/components/data_validator","../../../helpers/chartMocks.js","viz/core/export","viz/utils","viz/chart"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/chartParts/commons.js', ['../../../helpers/trackerMock.js', 'jquery', '../../../helpers/vizMocks.js', 'viz/series/points/label', 'viz/components/chart_theme_manager', 'viz/chart_components/layout_manager', 'viz/core/utils', 'viz/core/series_family', 'viz/components/legend', 'viz/core/renderers/renderer', 'viz/core/tooltip', 'viz/core/title', 'viz/chart_components/crosshair', 'viz/chart_components/scroll_bar', 'viz/chart_components/tracker', 'viz/components/data_validator', '../../../helpers/chartMocks.js', 'viz/core/export', 'viz/utils', 'viz/chart'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    $__require('../../../helpers/trackerMock.js');

    const $ = $__require('jquery');
    const vizMocks = $__require('../../../helpers/vizMocks.js');
    const { Label } = $__require('viz/series/points/label');
    const LabelCtor = new vizMocks.ObjectPool(Label);
    const ThemeManager = vizMocks.stubClass($__require('viz/components/chart_theme_manager').ThemeManager);
    const layoutManagerModule = $__require('viz/chart_components/layout_manager');
    const LayoutManager = vizMocks.stubClass(layoutManagerModule.LayoutManager);
    const vizUtils = $__require('viz/core/utils');
    const StubTooltip = vizMocks.Tooltip;
    const seriesFamilyModule = $__require('viz/core/series_family');
    const legendModule = $__require('viz/components/legend');
    const rendererModule = $__require('viz/core/renderers/renderer');
    const tooltipModule = $__require('viz/core/tooltip');
    const titleModule = $__require('viz/core/title');
    const crosshairModule = $__require('viz/chart_components/crosshair');
    const Crosshair = crosshairModule.Crosshair;
    const chartThemeManagerModule = $__require('viz/components/chart_theme_manager');
    const scrollBarClassModule = $__require('viz/chart_components/scroll_bar');
    const ScrollBarClass = scrollBarClassModule.ScrollBar;
    const trackerModule = $__require('viz/chart_components/tracker');
    const dataValidatorModule = $__require('viz/components/data_validator');
    const chartMocks = $__require('../../../helpers/chartMocks.js');
    const insertMockFactory = chartMocks.insertMockFactory;
    const resetMockFactory = chartMocks.resetMockFactory;
    const exportModule = $__require('viz/core/export');
    const _test_prepareSegmentRectPoints = $__require('viz/utils')._test_prepareSegmentRectPoints;
    const restoreMockFactory = chartMocks.restoreMockFactory;

    const tooltipOrig = tooltipModule.Tooltip;

    exports.LabelCtor = LabelCtor;
    exports.rendererModule = rendererModule;

    function stubExport() {
        const that = this;
        that.export = new vizMocks.ExportMenu();
        that.export.stub('measure').returns([0, 0]);
        exportModule.DEBUG_set_ExportMenu(sinon.spy(function () {
            return that.export;
        }));
    }

    stubExport();

    vizMocks.Element.prototype.updateRectangle = sinon.spy(window.vizMocks.Element.prototype.updateRectangle);

    const categories = ['First', 2005, 'Last'];
    exports.categories = categories;

    const baseEnvironment = {
        beforeEach: function () {
            this.$container = $('#chartContainer');
        }
    };
    const defaultCommonPaneSettings = {
        backgroundColor: 'none',
        border: {
            visible: false,
            top: true,
            bottom: true,
            left: true,
            right: true,
            dashStyle: 'solid'
        }
    };

    const defaultCrosshairOptions = {
        horizontalLine: {},
        verticalLine: {}
    };

    // stubs
    rendererModule.Renderer = sinon.spy(function (parameters) {
        return new vizMocks.Renderer(parameters);
    });

    titleModule.DEBUG_set_title(sinon.spy(function (parameters) {
        const title = new vizMocks.Title(parameters);
        title.stub('layoutOptions').returns({ horizontalAlignment: 'center', verticalAlignment: 'top' });
        title.stub('measure').returns([0, 0]);
        return title;
    }));

    legendModule.Legend = sinon.spy(function (parameters) {
        const legend = new vizMocks.Legend(parameters);
        legend.getActionCallback = sinon.spy(function (arg) {
            return arg;
        });
        legend.getTemplatesGroups = sinon.spy(function () {
            return [];
        });
        legend.getTemplatesDef = sinon.spy(function () {
            return [];
        });
        return legend;
    });

    const resetModules = exports.resetModules = function () {
        trackerModule.ChartTracker.reset();
        trackerModule.PieTracker.reset();

        legendModule.Legend.reset();

        rendererModule.Renderer.reset();
        exportModule.ExportMenu.reset();
        titleModule.Title.reset();
    };

    // stubs getters
    function getTitleStub() {
        return titleModule.Title.lastCall.returnValue;
    }
    exports.getTitleStub = getTitleStub;

    function getLegendStub() {
        return legendModule.Legend.lastCall.returnValue;
    }
    exports.getLegendStub = getLegendStub;

    function getTrackerStub(isPie) {
        return trackerModule[isPie ? 'PieTracker' : 'ChartTracker'].lastCall.returnValue;
    }
    exports.getTrackerStub = getTrackerStub;

    function createChartInstance(options, chartContainer) {
        return chartContainer.dxChart(options).dxChart('instance');
    }
    exports.createChartInstance = createChartInstance;

    function setupMocks($container) {
        $container.width(300);
        $container.height(150);
        $container.show();
        insertMockFactory();
    }

    exports.environment = {
        beforeEach: function () {
            const that = this;
            baseEnvironment.beforeEach.apply(that, arguments);

            setupMocks(that.$container);
            that.tooltip = new StubTooltip();
            that.themeManager = new ThemeManager();
            that.themeManager.stub('theme').withArgs('legend').returns({ title: {} });
            that.themeManager.stub('getOptions').withArgs('rotated').returns(false);
            that.themeManager.getOptions.withArgs('panes').returns({ name: 'default' });
            that.themeManager.getOptions.withArgs('containerBackgroundColor').returns('#ffffff');
            that.themeManager.getOptions.withArgs('animation').returns(true);
            that.themeManager.getOptions.withArgs('valueAxis').returnsArg(1);
            that.themeManager.getOptions.withArgs('series').returnsArg(1);
            that.themeManager.getOptions.withArgs('seriesTemplate').returns(false);
            that.themeManager.getOptions.withArgs('margin').returns({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            });
            that.themeManager.getOptions.withArgs('commonPaneSettings').returns(defaultCommonPaneSettings);
            that.themeManager.getOptions.withArgs('crosshair').returns(defaultCrosshairOptions);

            that.themeManager.getOptions.withArgs('dataPrepareSettings').returns({
                checkTypeForAllData: true,
                convertToAxisDataType: false
            });
            that.themeManager.getOptions.withArgs('resolveLabelOverlapping').returns(false);
            that.themeManager.getOptions.withArgs('zoomAndPan').returns({ valueAxis: {}, argumentAxis: {} });
            that.themeManager.getOptions.returns({});

            that.layoutManager = new LayoutManager();
            that.layoutManager.layoutElements = sinon.spy(function () {
                arguments[2]();
            });
            this.StubLayoutManager = sinon.stub(layoutManagerModule, 'LayoutManager').callsFake(function () {
                return that.layoutManager;
            });

            sinon.stub(scrollBarClassModule, 'ScrollBar').callsFake(function () {
                const ScrollBar = vizMocks.stubClass(ScrollBarClass);
                const scrollBar = new ScrollBar();
                scrollBar.stub('init').returns(scrollBar);
                scrollBar.stub('update').returns(scrollBar);
                scrollBar.stub('getMargins').returns({ left: 0, top: 0, right: 0, bottom: 0 });
                scrollBar.stub('estimateMargins').returns({ left: 0, top: 0, right: 0, bottom: 0 });
                scrollBar.stub('getOptions').returns({});
                return scrollBar;
            });
            that.createChart = function (options) {
                $.each(options || {}, function (k, v) {
                    if (k === 'commonPaneSettings') {
                        that.themeManager.getOptions.withArgs(k).returns($.extend(true, {}, defaultCommonPaneSettings, v));
                    } else if (k === 'crosshair') {
                        that.themeManager.getOptions.withArgs(k).returns($.extend(true, {}, defaultCrosshairOptions, v));
                    } else if (k !== 'series') {
                        that.themeManager.getOptions.withArgs(k).returns(v);
                    }
                });
                that.themeManager.getOptions.withArgs('argumentAxis').returns($.extend(true, {
                    tick: {},
                    minorTick: {},
                    label: {}
                }, options.argumentAxis));
                return createChartInstance(options, this.$container);
            };
            this.createThemeManager = sinon.stub(chartThemeManagerModule, 'ThemeManager').callsFake(function () {
                return that.themeManager;
            });
            const family = sinon.createStubInstance(seriesFamilyModule.SeriesFamily);
            this.createSeriesFamily = sinon.stub(seriesFamilyModule, 'SeriesFamily').callsFake(function () {
                family.pane = 'default';
                family.adjustSeriesDimensions = sinon.stub();
                family.adjustSeriesValues = sinon.stub();
                family.updateSeriesValues = sinon.stub();
                return family;
            });
            this.prepareSegmentRectPoints = _test_prepareSegmentRectPoints(function (x, y, w, h, borderOptions) {
                return { points: [x, y, w, h], pathType: borderOptions };
            });
            this.createCrosshair = sinon.stub(crosshairModule, 'Crosshair').callsFake(function () {
                return sinon.createStubInstance(Crosshair);
            });

            tooltipModule.DEBUG_set_tooltip(sinon.spy(function (parameters) {
                return that.tooltip;
            }));
            sinon.stub(vizUtils, 'updatePanesCanvases').callsFake(function (panes, canvas) {
                $.each(panes, function (_, item) {
                    item.canvas = $.extend({}, canvas);
                });
            });

            this.mockValidateData();
        },
        afterEach: function () {
            this.$container.remove();
            restoreMockFactory();
            resetMockFactory();
            this.createThemeManager.reset();
            this.createThemeManager.restore();
            window.vizMocks.Element.prototype.updateRectangle.reset();
            scrollBarClassModule.ScrollBar.restore();
            this.createSeriesFamily.restore();
            this.prepareSegmentRectPoints.restore();
            this.createCrosshair.restore();
            vizUtils.updatePanesCanvases.restore();

            this.layoutManager.layoutElements.reset();
            this.layoutManager = null;
            this.StubLayoutManager.reset();
            this.StubLayoutManager.restore();

            this.themeManager.getOptions.reset();
            this.themeManager = null;

            this.restoreValidateData();

            resetModules();
            tooltipModule.DEBUG_set_tooltip(tooltipOrig);

            this.tooltip = null;

            tooltipModule.DEBUG_set_tooltip(null);
        },

        mockValidateData: function () {
            this.validateData = sinon.stub(dataValidatorModule, 'validateData', function (data, groupsData) {
                const categories = [];
                if (data) {
                    data.forEach(function (item) {
                        categories.push(item.arg);
                    });
                    groupsData.categories = categories;
                }
                return { arg: data || [] };
            });
        },

        restoreValidateData: function () {
            this.validateData.reset();
            this.validateData.restore();
        }
    };

    $__require('viz/chart');
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/trackerMock.js","jquery","../../../helpers/vizMocks.js","viz/series/points/label","viz/components/chart_theme_manager","viz/chart_components/layout_manager","viz/core/utils","viz/core/series_family","viz/components/legend","viz/core/renderers/renderer","viz/core/tooltip","viz/core/title","viz/chart_components/crosshair","viz/chart_components/scroll_bar","viz/chart_components/tracker","viz/components/data_validator","../../../helpers/chartMocks.js","viz/core/export","viz/utils","viz/chart"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/trackerMock.js"), require("jquery"), require("../../../helpers/vizMocks.js"), require("viz/series/points/label"), require("viz/components/chart_theme_manager"), require("viz/chart_components/layout_manager"), require("viz/core/utils"), require("viz/core/series_family"), require("viz/components/legend"), require("viz/core/renderers/renderer"), require("viz/core/tooltip"), require("viz/core/title"), require("viz/chart_components/crosshair"), require("viz/chart_components/scroll_bar"), require("viz/chart_components/tracker"), require("viz/components/data_validator"), require("../../../helpers/chartMocks.js"), require("viz/core/export"), require("viz/utils"), require("viz/chart"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=commons.js.map