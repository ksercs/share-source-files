!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/themes.tests.js"], ["jquery","viz/themes","ui/themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/themes.tests.js', ['jquery', 'viz/themes', 'ui/themes'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const themeModule = $__require('viz/themes');
    const uiThemeModule = $__require('ui/themes');

    uiThemeModule.setDefaultTimeout(0);

    QUnit.moduleStart(function () {
        $.each([{ platform: 'platform' }, { name: 'platform1', isCustomTheme: true }, { name: 'platform1.dark' }, { name: 'platform2' }, { name: 'platform2.dark' }, { name: 'platform2.light' }, { name: 'platform3' }, { name: 'platform3.holo-light' }, { name: 'platform3.holo-dark' }], function (_, options) {
            themeModule.registerTheme(options);
        });

        themeModule.registerThemeSchemeAlias('platform3.light', 'platform3.holo-light');
        themeModule.registerThemeSchemeAlias('platform3.dark', 'platform3.holo-dark');
    });

    QUnit.testStart(function () {
        themeModule.currentTheme('generic');
    });

    QUnit.module('Register theme');

    QUnit.test('registerTheme', function (assert) {
        themeModule.registerTheme({
            name: 'custom theme',
            isCustomTheme1: true
        });

        const theme = themeModule.getTheme('custom theme');

        assert.ok(theme);
        assert.ok(theme.isCustomTheme1);
    });

    QUnit.test('registerTheme based on theme', function (assert) {
        themeModule.registerTheme({
            name: 'platform',
            isCustomTheme: true
        }, 'platform');

        themeModule.registerTheme({
            name: 'custom theme 2',
            isCustomTheme2: true
        }, 'platform');

        const theme = themeModule.getTheme('custom theme 2');

        assert.ok(theme);
        assert.ok(theme.isCustomTheme);
        assert.ok(!theme.isCustomTheme1);
        assert.ok(theme.isCustomTheme2);
    });

    QUnit.test('registerTheme with options', function (assert) {
        const lightTheme = {
            platform: 'platform',
            version: '5',
            tone: 'light',
            name: 'platform5.light'
        };

        themeModule.registerTheme(lightTheme);

        $.each(lightTheme, function (key, value) {
            assert.equal(themeModule.getTheme('platform5.light')[key], value);
        });
    });

    QUnit.test('register compact theme with the same name (T925673)', function (assert) {
        const darkTheme = {
            name: 'generic.dark.compact',
            rangeSelector: { background: { color: 'test-background' } }
        };
        themeModule.registerTheme(darkTheme, 'generic.dark.compact');

        assert.deepEqual(themeModule.getTheme('generic.dark.compact').rangeSelector.background, {
            'color': 'test-background',
            'image': {
                'location': 'full'
            },
            'visible': true
        });
    });

    QUnit.test('Patched properties on register theme', function (assert) {
        let theme = {
            name: 'custom theme',
            defaultPalette: 'custom palette',
            backgroundColor: 'background color',
            primaryTitleColor: 'primary title color',
            secondaryTitleColor: 'secondary title color',
            gridColor: 'grid color',
            axisColor: 'axis color',
            redrawOnResize: 'redraw on resize',
            tooltip: { some: 'tooltip settings' },
            'export': {
                some: 'export settings',
                font: {
                    some: 'font settings'
                }
            },
            loadingIndicator: { some: 'loadingIndicator settings' },
            legend: { some: 'legend settings' },
            title: {
                some: 'title settings',
                subtitle: {
                    some: 'subtitle settings'
                }
            },
            'chart:common:axis': { some: 'common axis settings' },
            'chart:common': { some: 'common chart settings' },
            map: {
                layer: { 'layer-tag': 1 },
                'layer:marker': { 'layer:marker-tag': 2 }
            }
        };
        themeModule.resetCurrentTheme();

        // act
        themeModule.registerTheme(theme);

        // assert
        theme = themeModule.getTheme('custom theme');

        // backgroundColor
        assert.strictEqual(theme.loadingIndicator.backgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.chart.commonSeriesSettings.candlestick.innerColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.map.background.color, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.map.legend.backgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.chart.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.pie.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.polar.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.gauge.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.barGauge.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.map.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.rangeSelector.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.sparkline.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.bullet.containerBackgroundColor, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.gauge.scale.tick.color, theme.backgroundColor, 'backgroundColor');
        assert.strictEqual(theme.gauge.scale.minorTick.color, theme.backgroundColor, 'backgroundColor');

        // commonAxisSettings
        assert.deepEqual(theme.chart.commonAxisSettings, theme['chart:common:axis'], 'commonAxisSettings');
        assert.deepEqual(theme.polar.commonAxisSettings, theme['chart:common:axis'], 'commonAxisSettings');

        // primaryTitleColor
        assert.strictEqual(theme.title.font.color, theme.primaryTitleColor, 'primaryTitleColor');

        // secondaryTitleColor
        assert.strictEqual(theme.legend.font.color, theme.secondaryTitleColor, 'secondaryTitleColor');
        assert.deepEqual(theme.chart.commonAxisSettings.title.font.color, theme.secondaryTitleColor, 'secondaryTitleColor');
        assert.deepEqual(theme.polar.commonAxisSettings.title.font.color, theme.secondaryTitleColor, 'secondaryTitleColor');

        // gridColor
        assert.strictEqual(theme.legend.border.color, theme.gridColor, 'gridColor');
        assert.deepEqual(theme.chart.commonAxisSettings.grid.color, theme.gridColor, 'gridColor');
        assert.deepEqual(theme.chart.commonAxisSettings.minorGrid.color, theme.gridColor, 'gridColor');
        assert.deepEqual(theme.polar.commonAxisSettings.grid.color, theme.gridColor, 'gridColor');
        assert.deepEqual(theme.polar.commonAxisSettings.minorGrid.color, theme.gridColor, 'gridColor');

        // axisColor
        assert.deepEqual(theme.chart.commonAxisSettings.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.chart.commonAxisSettings.tick.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.chart.commonAxisSettings.minorTick.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.polar.commonAxisSettings.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.polar.commonAxisSettings.tick.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.polar.commonAxisSettings.minorTick.color, theme.axisColor, 'axisColor');
        assert.strictEqual(theme.gauge.scale.label.font.color, theme.axisColor, 'axisColor');
        assert.strictEqual(theme.rangeSelector.scale.label.font.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.chart.commonAxisSettings.label.font.color, theme.axisColor, 'axisColor');
        assert.deepEqual(theme.polar.commonAxisSettings.label.font.color, theme.axisColor, 'axisColor');

        // redrawOnResize
        assert.strictEqual(theme.chart.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.pie.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.polar.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.gauge.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.barGauge.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.map.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.rangeSelector.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.sparkline.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');
        assert.strictEqual(theme.bullet.redrawOnResize, theme.redrawOnResize, 'redrawOnResize');

        // tooltip
        assert.deepEqual(theme.chart.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.pie.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.polar.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.gauge.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.barGauge.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.map.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.rangeSelector.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.sparkline.tooltip, theme.tooltip, 'tooltip');
        assert.deepEqual(theme.bullet.tooltip, theme.tooltip, 'tooltip');

        // loadingIndicator
        assert.deepEqual(theme.chart.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.pie.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.polar.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.gauge.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.barGauge.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.map.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');
        assert.deepEqual(theme.rangeSelector.loadingIndicator, theme.loadingIndicator, 'loadingIndicator');

        // export
        assert.deepEqual(theme.chart.export, theme.export, 'export');
        assert.deepEqual(theme.pie.export, theme.export, 'export');
        assert.deepEqual(theme.polar.export, theme.export, 'export');
        assert.deepEqual(theme.gauge.export, theme.export, 'export');
        assert.deepEqual(theme.barGauge.export, theme.export, 'export');
        assert.deepEqual(theme.map.export, theme.export, 'export');
        assert.deepEqual(theme.rangeSelector.export, theme.export, 'export');
        assert.deepEqual(theme.sparkline.export, theme.export, 'export');
        assert.deepEqual(theme.bullet.export, theme.export, 'export');

        // legend
        assert.deepEqual(theme.chart.legend, theme.legend, 'legend');
        assert.deepEqual(theme.pie.legend, theme.legend, 'legend');
        assert.deepEqual(theme.polar.legend, theme.legend, 'legend');
        assert.deepEqual(theme.gauge.legend, theme.legend, 'legend');
        assert.deepEqual(theme.barGauge.legend, theme.legend, 'legend');
        assert.deepEqual(theme.map.legend, $.extend({}, theme.legend, { backgroundColor: theme.backgroundColor }), 'legend');
        assert.deepEqual(theme.rangeSelector.legend, theme.legend, 'legend');

        // title
        assert.deepEqual(theme.chart.title, theme.title, 'title');
        assert.deepEqual(theme.pie.title, theme.title, 'title');
        assert.deepEqual(theme.polar.title, theme.title, 'title');
        assert.deepEqual(theme.gauge.title, theme.title, 'title');
        assert.deepEqual(theme.barGauge.title, theme.title, 'title');
        assert.deepEqual(theme.map.title, theme.title, 'title');

        // common chart settings
        assert.deepEqual(theme.chart, $.extend(true, {}, theme.chart, theme['chart:common']), 'common chart settings');
        assert.deepEqual(theme.pie, $.extend(true, {}, theme.pie, theme['chart:common']), 'common chart settings');
        assert.deepEqual(theme.polar, $.extend(true, {}, theme.polar, theme['chart:common']), 'common chart settings');

        // rangeSelector commonSeriesSettings
        assert.deepEqual(theme.rangeSelector.chart.commonSeriesSettings, theme.chart.commonSeriesSettings, 'rangeSelector commonSeriesSettings');

        // rangeSelector dataPrepareSettings
        assert.deepEqual(theme.rangeSelector.chart.dataPrepareSettings, theme.chart.dataPrepareSettings, 'rangeSelector dataPrepareSettings');

        // map
        $.each(['area', 'line', 'marker:dot', 'marker:bubble', 'marker:pie', 'marker:image'], function (_, name) {
            assert.strictEqual(theme.map['layer:' + name]['layer-tag'], 1, 'map layer:' + name + ' from layer');
        });
        $.each(['dot', 'bubble', 'pie', 'image'], function (_, name) {
            assert.strictEqual(theme.map['layer:marker:' + name]['layer:marker-tag'], 2, 'map layer:marker:' + name + ' from layer:marker');
        });

        // treeMap
        assert.strictEqual(theme.treeMap.group.border.color, theme.gridColor, 'treeMap - group.border.color');
        assert.strictEqual(theme.treeMap.tile.selectionStyle.border.color, theme.primaryTitleColor, 'treeMap - tile.selectionStyle.border.color');
        assert.strictEqual(theme.treeMap.group.selectionStyle.border.color, theme.primaryTitleColor, 'treeMap - group.selectionStyle.border.color');
    });

    QUnit.module('Themes functions');

    QUnit.test('getTheme', function (assert) {
        const theme = themeModule.getTheme('platform1');

        assert.ok(theme);
        assert.ok(theme.isCustomTheme);
    });

    QUnit.test('getTheme not exists', function (assert) {
        assert.strictEqual(themeModule.getTheme('not exists').name, 'generic.light');
    });

    QUnit.module('currentTheme method.');

    QUnit.test('Get default theme', function (assert) {
        const currentTheme = themeModule.currentTheme();

        assert.strictEqual(currentTheme, 'generic.light', 'valid default theme');
    });

    QUnit.test('get platform with version', function (assert) {
        themeModule.currentTheme({
            platform: 'platform',
            version: '1'
        });

        assert.equal(themeModule.currentTheme(), 'platform1');
    });

    QUnit.test('get theme with tone', function (assert) {
        themeModule.currentTheme({
            platform: 'platform',
            version: '2'
        }, 'light');

        assert.equal(themeModule.currentTheme(), 'platform2.light');
    });

    QUnit.test('get theme with tone. another name', function (assert) {
        themeModule.currentTheme({
            platform: 'platform',
            version: '3'
        }, 'dark');

        assert.equal(themeModule.currentTheme(), 'platform3.holo-dark');
    });

    QUnit.test('not exist version', function (assert) {
        themeModule.currentTheme({
            platform: 'platform',
            version: '100'
        });

        assert.equal(themeModule.currentTheme(), 'platform');
    });

    QUnit.test('currentTheme return registered default theme', function (assert) {
        themeModule.resetCurrentTheme();
        themeModule.registerTheme({
            name: 'custom default theme',
            isDefault: true
        });
        const currentTheme = themeModule.currentTheme();

        assert.strictEqual(currentTheme, 'custom default theme');
    });

    QUnit.test('Invalid input data', function (assert) {
        themeModule.currentTheme('invalid_data');

        assert.strictEqual(themeModule.currentTheme(), 'generic.light');
    });

    QUnit.test('Invalid input data (with color scheme)', function (assert) {
        themeModule.currentTheme('invalid_data', 'light');

        assert.strictEqual(themeModule.currentTheme(), 'generic.light');
    });

    QUnit.module('refresh all', {
        createItem: function () {
            return {
                refresh: function () {
                    this.refreshed = true;
                }
            };
        }
    });

    QUnit.test('added items are refresh', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        themeModule.addCacheItem(item1);
        themeModule.addCacheItem(item2);
        themeModule.addCacheItem(item3);

        themeModule.refreshTheme();

        assert.ok(item1.refreshed, 'item 1');
        assert.ok(item2.refreshed, 'item 2');
        assert.ok(item3.refreshed, 'item 3');
    });

    QUnit.test('removed items are not refreshed', function (assert) {
        const item1 = this.createItem();
        const item2 = this.createItem();
        const item3 = this.createItem();
        themeModule.addCacheItem(item1);
        themeModule.addCacheItem(item2);
        themeModule.addCacheItem(item3);
        themeModule.removeCacheItem(item2);

        themeModule.refreshTheme();

        assert.ok(item1.refreshed, 'item 1');
        assert.ok(!item2.refreshed, 'item 2');
        assert.ok(item3.refreshed, 'item 3');
    });

    QUnit.module('Interaction with ui.themes', {
        beforeEach: function () {
            themeModule.resetCurrentTheme();
            this.$frame = $('<iframe></iframe>').appendTo('body');
            return new Promise(resolve => uiThemeModule.initialized(resolve));
        },
        afterEach: function () {
            this.$frame.remove();
        },

        frameDoc: function () {
            return this.$frame[0].contentWindow.document;
        },
        writeToFrame: function writeToFrame(markup) {
            this.frameDoc().write(markup);
        }
    });

    QUnit.test('currentTheme returns theme from ui.themes', function (assert) {
        this.writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'platform2\' />');
        uiThemeModule.init({ theme: 'platform2', context: this.frameDoc() });

        // act
        const currentTheme = themeModule.currentTheme();

        assert.strictEqual(currentTheme, 'platform2');
    });

    QUnit.test('currentTheme returns previously set theme, regardles of what ui theme is set', function (assert) {
        this.writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'platform2\' />');
        uiThemeModule.init({ theme: 'platform2', context: this.frameDoc() });
        themeModule.currentTheme('generic');

        // act
        const currentTheme = themeModule.currentTheme();

        assert.strictEqual(currentTheme, 'generic.light');
    });

    QUnit.test('currentTheme returns default theme if ui theme returns wrong theme', function (assert) {
        this.writeToFrame('<link rel=\'dx-theme\' href=\'style1.css\' data-theme=\'some-platform2\' />');
        uiThemeModule.init({ theme: 'some-platform2', context: this.frameDoc() });
        themeModule.registerTheme({
            name: 'viz default theme',
            isDefault: true
        });

        // act
        const currentTheme = themeModule.currentTheme();

        assert.strictEqual(currentTheme, 'viz default theme');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/themes","ui/themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/themes"), require("ui/themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=themes.tests.js.map