!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/baseThemeManager.tests.js"], ["jquery","viz/themes","viz/core/base_theme_manager","viz/palette"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/baseThemeManager.tests.js', ['jquery', 'viz/themes', 'viz/core/base_theme_manager', 'viz/palette'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const themeModule = $__require('viz/themes');
    const BaseThemeManager = $__require('viz/core/base_theme_manager').BaseThemeManager;
    const currentTheme = themeModule.currentTheme();
    const paletteModule = $__require('viz/palette');

    themeModule.registerTheme({
        name: 'custom',
        chart: {
            isCustomTheme: true,
            legend: {
                visible: true,
                padding: 10,
                markerSize: 25,
                borderWidth: 1
            }
        }
    });

    themeModule.registerTheme({
        name: 'custom-default-palette',
        defaultPalette: 'some-default-palette'
    });

    themeModule.registerTheme({
        name: 'custom-default-gradient-palette',
        defaultPalette: ['#000000', '#100000']
    });

    const environment = {
        beforeEach: function () {
            themeModule.currentTheme(currentTheme);
            this.themeManager = new BaseThemeManager({ fontFields: [] });
            this.callback = sinon.spy();
            this.themeManager.setCallback(this.callback);
            this.createPalette = sinon.stub(paletteModule, 'createPalette');
            this.getDiscretePalette = sinon.stub(paletteModule, 'getDiscretePalette');
            this.getAccentColor = sinon.stub(paletteModule, 'getAccentColor');
        },

        afterEach: function () {
            this.themeManager.dispose();
            this.createPalette.restore();
            this.getDiscretePalette.restore();
            this.getAccentColor.restore();
        }
    };

    QUnit.module('Common', environment);

    QUnit.test('set theme', function (assert) {
        this.themeManager.setTheme('custom');

        assert.strictEqual(this.themeManager.themeName(), 'custom', 'theme');
        assert.deepEqual(this.callback.lastCall.args, [], 'callback');
    });

    QUnit.test('set unknown theme', function (assert) {
        this.themeManager.setTheme('some-theme');

        assert.strictEqual(this.themeManager.themeName(), currentTheme, 'theme');
        assert.deepEqual(this.callback.lastCall.args, [], 'callback');
    });

    QUnit.test('refresh', function (assert) {
        this.themeManager.setTheme().refresh();

        assert.strictEqual(this.themeManager.themeName(), currentTheme, 'theme');
        assert.strictEqual(this.callback.callCount, 2, 'callback');
    });

    QUnit.test('refresh when current theme is changed and theme is set', function (assert) {
        this.themeManager.setTheme('custom');
        themeModule.currentTheme('generic.dark');
        this.themeManager.refresh();

        assert.strictEqual(this.themeManager.themeName(), 'custom', 'theme');
        assert.strictEqual(this.callback.callCount, 2, 'callback');
    });

    QUnit.test('refresh when current theme is changed and theme is not set', function (assert) {
        this.themeManager.setTheme('some-theme');
        themeModule.currentTheme('generic.dark');
        this.themeManager.refresh();

        assert.strictEqual(this.themeManager.themeName(), 'generic.dark', 'theme');
        assert.strictEqual(this.callback.callCount, 2, 'callback');
    });

    QUnit.module('Cache', {
        cache: themeModule.widgetsCache,

        create: function () {
            return new BaseThemeManager({});
        }
    });

    QUnit.test('Adding and removing', function (assert) {
        const item = this.create();
        let k;
        $.each(this.cache, function (i) {
            k = i;
            return false;
        });
        assert.strictEqual(this.cache[k], item);
        item.dispose();
        assert.strictEqual(this.cache[k], undefined);
    });

    QUnit.module('Themes', environment);

    QUnit.test('default theme', function (assert) {
        // act
        this.themeManager.setTheme();
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.equal(theme.name, 'generic.light');
        assert.ok(theme.font);
        assert.ok(theme.rangeSelector);
        assert.ok(theme.gauge);
        assert.ok(theme.chart);
    });

    QUnit.test('default theme with groupName', function (assert) {
        // act
        this.themeManager._themeSection = 'rangeSelector';
        this.themeManager.setTheme('generic');
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.ok(theme.sliderMarker);
        assert.ok(theme.scale);
        assert.ok(theme.chart);
    });

    QUnit.test('default theme with complex groupName', function (assert) {
        // act
        this.themeManager._themeSection = 'rangeSelector.scale';
        this.themeManager.setTheme('generic.light');
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.ok(theme.tick);
        assert.ok(theme.marker);
    });

    QUnit.test('customize default theme', function (assert) {
        // act
        this.themeManager.setTheme({
            chart: {
                legend: {
                    borderWidth: 1
                }
            }
        });
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.equal(theme.name, 'generic.light');
        assert.equal(theme.chart.legend.borderWidth, 1);
        assert.ok(theme.chart.legend.visible);
    });

    QUnit.test('customize theme with groupName', function (assert) {
        // act
        this.themeManager._themeSection = 'chart';
        this.themeManager.setTheme({
            legend: {
                borderWidth: 1
            }
        });
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.equal(theme.legend.borderWidth, 1);
        assert.ok(theme.legend.visible);
    });

    QUnit.test('customize custom theme', function (assert) {
        // act
        this.themeManager._themeSection = 'chart';
        this.themeManager.setTheme({
            name: 'custom',
            legend: {
                markerSize: 15,
                borderWidth: 0
            }
        });

        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'custom');
        assert.ok(theme);
        assert.ok(theme.isCustomTheme);
        assert.ok(theme.legend.visible);
        assert.equal(theme.legend.markerSize, 15);
        assert.equal(theme.legend.borderWidth, 0);
    });

    QUnit.test('global customized theme', function (assert) {
        // act
        themeModule.getTheme('custom').chart.isGlobalCustomized = true;

        this.themeManager._themeSection = 'chart';
        this.themeManager.setTheme('custom');
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'custom');
        assert.ok(theme);
        assert.ok(theme.isCustomTheme);
        assert.ok(theme.isGlobalCustomized);
    });

    QUnit.test('theme by name', function (assert) {
        // act
        this.themeManager._themeSection = 'chart';
        this.themeManager.setTheme('custom');
        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'custom');
        assert.ok(theme);
        assert.ok(theme.isCustomTheme);
        assert.ok(theme.legend.visible);
        assert.equal(theme.legend.markerSize, 25);
        assert.equal(theme.legend.borderWidth, 1);
    });

    QUnit.test('initializeFont', function (assert) {
        this.themeManager.setTheme({
            testLabel: {
                font: {
                    color: 'white'
                }
            }
        });

        // act
        this.themeManager._initializeFont(this.themeManager.theme().testLabel.font);

        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.ok(theme.testLabel);
        assert.equal(theme.testLabel.font.color, 'white', 'color');
        assert.equal(theme.testLabel.font.size, 12, 'size');
        assert.equal(theme.testLabel.font.family, '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif', 'Font families');
        assert.equal(theme.testLabel.font.cursor, 'default');
    });

    QUnit.test('initializeFont from customized font', function (assert) {
        this.themeManager.setTheme({
            font: {
                size: 16,
                color: 'black',
                family: 'Times New Roman',
                style: 'custom'
            },
            testLabel: {
                color: 'white'
            }
        });

        // act
        this.themeManager._initializeFont(this.themeManager.theme().testLabel);

        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'generic.light');
        assert.ok(theme);
        assert.ok(theme.testLabel);
        assert.equal(theme.testLabel.color, 'white', 'color');
        assert.equal(theme.testLabel.size, 16, 'size');
        assert.equal(theme.testLabel.family, 'Times New Roman', 'family');
        assert.equal(theme.testLabel.style, 'custom', 'style');
    });

    QUnit.test('initializeFont from customized font with groupName', function (assert) {
        this.themeManager.setTheme({
            name: 'custom',
            font: {
                size: 16,
                color: 'black',
                family: 'Times New Roman',
                style: 'custom'
            },
            legend: {
                testLabel: {
                    color: 'white'
                }
            }
        }, 'chart');

        // act
        this.themeManager._initializeFont(this.themeManager.theme().legend.testLabel);

        const theme = this.themeManager.theme();

        // assert
        assert.equal(this.themeManager.themeName(), 'custom');
        assert.ok(theme);
        assert.ok(theme.legend.testLabel);
        assert.equal(theme.legend.testLabel.color, 'white', 'color');
        assert.equal(theme.legend.testLabel.size, 16, 'size');
        assert.equal(theme.legend.testLabel.family, 'Times New Roman', 'family');
        assert.equal(theme.legend.testLabel.style, 'custom', 'style');
    });

    QUnit.test('theme getter', function (assert) {
        this.themeManager._themeSection = 'chart';
        this.themeManager.setTheme({
            option1: 100,
            option2: {
                option21: 'hello',
                option22: {
                    option221: 200
                }
            }
        });

        assert.strictEqual(this.themeManager.theme().option1, 100, 'option1');
        assert.deepEqual(this.themeManager.theme().option2, {
            option21: 'hello',
            option22: {
                option221: 200
            }
        }, 'option2');

        assert.strictEqual(this.themeManager.theme('option1'), 100, 'option1 by name');
        assert.deepEqual(this.themeManager.theme('option2'), {
            option21: 'hello',
            option22: {
                option221: 200
            }
        }, 'option2 by name');

        assert.strictEqual(this.themeManager.theme('option2.option21'), 'hello', 'option21 by name');
        assert.deepEqual(this.themeManager.theme('option2.option22'), {
            option221: 200
        }, 'option22 by name');
        assert.strictEqual(this.themeManager.theme('option2.option22.option221'), 200, 'option221 by name');

        assert.strictEqual(this.themeManager.theme('option3'), undefined, 'option3 by name / unknown option');
        assert.strictEqual(this.themeManager.theme('option2.option23'), undefined, 'option23 by name / unknown option');
        assert.strictEqual(this.themeManager.theme('option2.option22.option222'), undefined, 'option222 by name / unknown option');
    });

    QUnit.test('initializeFont via font fields', function (assert) {
        // act
        this.themeManager = new BaseThemeManager({ fontFields: ['testLabel1.font', 'testObject2.testLabel2.font'] });
        this.themeManager.setCallback(this.callback);
        this.themeManager.setTheme({
            testLabel1: {
                font: {
                    color: 'white'
                }
            },
            testObject2: {
                testLabel2: {
                    font: {
                        size: 20
                    }
                }
            }
        });

        // assert
        assert.deepEqual(this.themeManager.theme('testLabel1.font'), {
            size: 12, cursor: 'default', weight: 400, color: 'white',
            family: '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif'
        }, 'font 1');
        assert.deepEqual(this.themeManager.theme('testObject2.testLabel2.font'), {
            size: 20, cursor: 'default', weight: 400, color: '#767676',
            family: '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif'
        }, 'font 2');
    });

    QUnit.module('Palettes', environment);

    QUnit.test('Create palette', function (assert) {
        this.themeManager.setTheme('custom');

        const palette = this.themeManager.createPalette('paletteName', { palette: 'options' });

        assert.ok(this.createPalette.calledOnce);
        assert.ok(this.createPalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.createPalette.firstCall.returnValue);
        assert.deepEqual(this.createPalette.firstCall.args, ['paletteName', { palette: 'options' }, undefined]);
    });

    QUnit.test('Create discrete palette', function (assert) {
        this.themeManager.setTheme('custom');

        const palette = this.themeManager.createDiscretePalette('paletteName', 13);

        assert.ok(this.getDiscretePalette.calledOnce);
        assert.ok(this.getDiscretePalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.getDiscretePalette.firstCall.returnValue);
        assert.deepEqual(this.getDiscretePalette.firstCall.args, ['paletteName', 13, undefined]);
    });

    QUnit.test('Create gradient palette', function (assert) {
        this.themeManager.setTheme('custom');

        const palette = this.themeManager.createGradientPalette(['#000000', '#080000']);

        assert.strictEqual(palette.getColor(0.25), '#020000');
    });

    QUnit.test('Create palette. With default palette', function (assert) {
        this.themeManager.setTheme('custom-default-palette');

        const palette = this.themeManager.createPalette(undefined, { palette: 'options' });

        assert.ok(this.createPalette.calledOnce);
        assert.ok(this.createPalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.createPalette.firstCall.returnValue);
        assert.deepEqual(this.createPalette.firstCall.args, [undefined, { palette: 'options' }, 'some-default-palette']);
    });

    QUnit.test('Create discrete palette. With default palette', function (assert) {
        this.themeManager.setTheme('custom-default-palette');

        const palette = this.themeManager.createDiscretePalette(undefined, 13);

        assert.ok(this.getDiscretePalette.calledOnce);
        assert.ok(this.getDiscretePalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.getDiscretePalette.firstCall.returnValue);
        assert.deepEqual(this.getDiscretePalette.firstCall.args, [undefined, 13, 'some-default-palette']);
    });

    QUnit.test('Create gradient palette. With default palette', function (assert) {
        this.themeManager.setTheme('custom-default-gradient-palette');

        const palette = this.themeManager.createGradientPalette(undefined);

        assert.strictEqual(palette.getColor(0.25), '#040000');
    });

    QUnit.test('Create palette. Palette and default palette', function (assert) {
        this.themeManager.setTheme('custom-default-palette');

        const palette = this.themeManager.createPalette('paletteName', { palette: 'options' });

        assert.ok(this.createPalette.calledOnce);
        assert.ok(this.createPalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.createPalette.firstCall.returnValue);
        assert.deepEqual(this.createPalette.firstCall.args, ['paletteName', { palette: 'options' }, 'some-default-palette']);
    });

    QUnit.test('Create discrete palette. Palette and default palette', function (assert) {
        this.themeManager.setTheme('custom-default-palette');

        const palette = this.themeManager.createDiscretePalette('paletteName', 13);

        assert.ok(this.getDiscretePalette.calledOnce);
        assert.ok(this.getDiscretePalette.firstCall.calledWithNew);
        assert.strictEqual(palette, this.getDiscretePalette.firstCall.returnValue);
        assert.deepEqual(this.getDiscretePalette.firstCall.args, ['paletteName', 13, 'some-default-palette']);
    });

    QUnit.test('Get palette\'s accent color', function (assert) {
        this.getAccentColor.returns('accent color');
        this.themeManager.setTheme('custom-default-palette');

        const color = this.themeManager.getAccentColor('paletteName');

        assert.equal(color, 'accent color');
        assert.deepEqual(this.getAccentColor.lastCall.args, ['paletteName', 'some-default-palette']);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/themes","viz/core/base_theme_manager","viz/palette"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/themes"), require("viz/core/base_theme_manager"), require("viz/palette"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=baseThemeManager.tests.js.map