!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sparklines/bulletTooltip.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/core/tooltip","viz/core/renderers/renderer","viz/core/base_theme_manager","core/utils/type","viz/bullet"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.sparklines/bulletTooltip.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/core/tooltip", "viz/core/renderers/renderer", "viz/core/base_theme_manager", "core/utils/type", "viz/bullet"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      tooltipModule,
      rendererModule,
      baseThemeManagerModule,
      isFunction,
      TOOLTIP_TABLE_BORDER_SPACING,
      TOOLTIP_TABLE_KEY_VALUE_SPACE,
      StubThemeManager,
      StubTooltip,
      environment;
  function getBulletTooltip(bullet) {
    return bullet._tooltip;
  }
  function showBulletTooltip(bullet) {
    bullet._showTooltip();
  }
  function checkTemplateTable(assert, $table, templateArg, elementsSettings) {
    assert.strictEqual($table.css('borderSpacing'), (TOOLTIP_TABLE_BORDER_SPACING + "px"));
    assert.strictEqual($table.css('lineHeight'), elementsSettings.lineHeight);
    var $tr = $table.find('tr');
    assert.strictEqual($tr.length, templateArg.valueText.length / 2);
    for (var i = 0; i < $tr.length; i += 2) {
      var $currentTr = $($tr[i]);
      var $td = $currentTr.find('td');
      assert.strictEqual($td.length, 3);
      assert.strictEqual($($td.get(0)).text(), templateArg.valueText[i]);
      assert.strictEqual($($td.get(1)).css('width'), (TOOLTIP_TABLE_KEY_VALUE_SPACE + "px"));
      assert.strictEqual($($td.get(2)).css('textAlign'), elementsSettings.textAlign);
      assert.strictEqual($($td.get(2)).text(), templateArg.valueText[i + 1]);
    }
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      tooltipModule = $__m.default;
    }, function($__m) {
      rendererModule = $__m.default;
    }, function($__m) {
      baseThemeManagerModule = $__m.default;
    }, function($__m) {
      isFunction = $__m.isFunction;
    }, function($__m) {}],
    execute: function() {
      TOOLTIP_TABLE_BORDER_SPACING = 0;
      TOOLTIP_TABLE_KEY_VALUE_SPACE = 15;
      $('<div>').attr('id', 'container').css({
        width: 250,
        height: 20
      }).appendTo('#qunit-fixture');
      StubThemeManager = vizMocks.stubClass(baseThemeManagerModule.BaseThemeManager);
      StubTooltip = vizMocks.stubClass(tooltipModule.Tooltip, {
        isEnabled: function() {
          return true;
        },
        formatValue: function(value, format) {
          return value + ':' + format;
        }
      });
      tooltipModule.DEBUG_set_tooltip(function(parameters) {
        return new StubTooltip(parameters);
      });
      rendererModule.Renderer = function() {
        return currentTest().renderer;
      };
      baseThemeManagerModule.BaseThemeManager = function() {
        return currentTest().themeManager;
      };
      StubThemeManager.prototype.setTheme = function() {
        vizMocks.forceThemeOptions(this);
      };
      environment = {
        beforeEach: function() {
          this.themeManager = new StubThemeManager();
          this.themeManager.stub('theme').returns({
            showTarget: true,
            showZeroLevel: true,
            tooltip: {
              enabled: true,
              font: {}
            }
          }).withArgs('tooltip').returns({
            enabled: true,
            font: {}
          });
          this.renderer = new vizMocks.Renderer();
          this.$container = $(createTestContainer('#container'));
        },
        afterEach: function() {
          this.$container.remove();
        },
        createBullet: function(options) {
          return this.$container.dxBullet($.extend(true, {tooltip: {enabled: true}}, options)).dxBullet('instance');
        }
      };
      QUnit.module('Bullet tooltip', environment);
      QUnit.test('Tooltip constructor should accept valid params when tooltip is enabled', function(assert) {
        var bullet = this.createBullet({
          value: 10,
          maxScaleValue: 20,
          tooltip: {font: {size: 12}}
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        var arg = tooltip.ctorArgs;
        assert.strictEqual(arg.length, 1);
        assert.deepEqual(arg[0].cssClass, 'dxb-tooltip', 'parameter - cssClass');
        assert.strictEqual(arg[0].eventTrigger, bullet._eventTrigger, 'parameter - event trigger');
      });
      QUnit.test('Update method should accept valid params when tooltip is enabled', function(assert) {
        var bullet = this.createBullet({
          value: 10,
          maxScaleValue: 20,
          tooltip: {font: {size: 12}}
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        assert.equal(tooltip.update.callCount, 1, 'update is called');
        assert.strictEqual(tooltip.update.lastCall.args[0].enabled, true);
        assert.strictEqual(tooltip.update.lastCall.args[0].font.size, 12);
        assert.strictEqual(isFunction(tooltip.update.lastCall.args[0].contentTemplate), true);
      });
      QUnit.test('Tooltip constructor should accept valid params when tooltip is enabled and no data', function(assert) {
        var bullet = this.createBullet({tooltip: {font: {size: 12}}});
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        var arg = tooltip.ctorArgs;
        assert.strictEqual(arg.length, 1);
        assert.deepEqual(arg[0].cssClass, 'dxb-tooltip', 'parameter - cssClass');
        assert.strictEqual(arg[0].eventTrigger, bullet._eventTrigger, 'parameter - event trigger');
      });
      QUnit.test('Update method should accept valid params when tooltip is enabled and no data', function(assert) {
        var bullet = this.createBullet({tooltip: {font: {size: 12}}});
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        assert.equal(tooltip.update.callCount, 1, 'update is called');
        assert.strictEqual(tooltip.update.lastCall.args[0].enabled, false);
        assert.strictEqual(tooltip.update.lastCall.args[0].font.size, 12);
        assert.strictEqual(isFunction(tooltip.update.lastCall.args[0].contentTemplate), true);
      });
      QUnit.test('Disabled tooltip', function(assert) {
        var bullet = this.createBullet({
          value: 10,
          maxScaleValue: 20,
          tooltip: {enabled: false}
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        assert.equal(tooltip.update.callCount, 1, 'update is called');
        assert.equal(tooltip.update.lastCall.args[0].enabled, false);
      });
      QUnit.test('dxBullet get TooltipFormatObject', function(assert) {
        this.renderer.bBoxTemplate = {
          x: 10,
          width: 200
        };
        var bullet = this.createBullet({
          value: 10,
          target: 20,
          endScaleValue: 30
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        assert.deepEqual(tooltip.show.lastCall.args, [{
          originalTarget: 20,
          originalValue: 10,
          target: '20:undefined',
          value: '10:undefined',
          valueText: ['Actual Value:', '10:undefined', 'Target Value:', '20:undefined']
        }, {
          x: (200 / 2) + 10 + 3,
          y: 30 / 2 + 5
        }, {}]);
      });
      QUnit.test('Default template should be used when customizeTooltip is not specified', function(assert) {
        var data = [4, 8, 6, 9, 5, 7, 8, 6, 8, 1, 2, 6, 23, 2, 8, 9, 4, 5, 6, -1, 12];
        var templateArg = {valueText: ['Cell11', 'Cell12', 'Cell21', 'Cell22']};
        var $templateContainer = $('<div>');
        var bullet = this.createBullet({
          dataSource: data,
          tooltip: {font: {size: 12}}
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        var contentTemplate = tooltip.update.lastCall.args[0].contentTemplate;
        contentTemplate(templateArg, $templateContainer);
        var $table = $templateContainer.find('table');
        checkTemplateTable(assert, $table, templateArg, {
          textAlign: 'right',
          lineHeight: '14px'
        });
      });
      QUnit.test('Default tooltip template should have valid text align when rtl is enabled', function(assert) {
        var data = [4, 8, 6, 9, 5, 7, 8, 6, 8, 1, 2, 6, 23, 2, 8, 9, 4, 5, 6, -1, 12];
        var templateArg = {valueText: ['Cell11', 'Cell12', 'Cell21', 'Cell22']};
        var $templateContainer = $('<div>');
        var bullet = this.createBullet({
          dataSource: data,
          tooltip: {font: {size: 12}},
          rtlEnabled: true
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        var contentTemplate = tooltip.update.lastCall.args[0].contentTemplate;
        contentTemplate(templateArg, $templateContainer);
        var $table = $templateContainer.find('table');
        checkTemplateTable(assert, $table, templateArg, {
          textAlign: 'left',
          lineHeight: '14px'
        });
      });
      QUnit.test('Method "show" should accept valud info', function(assert) {
        var data = [4, 8, 6, 9, 5, 7, 8, 6, 8, 1, 2, 6, 23, 2, 8, 9, 4, 5, 6, -1, 12];
        var bullet = this.createBullet({
          dataSource: data,
          type: 'winloss'
        });
        showBulletTooltip(bullet);
        var tooltip = getBulletTooltip(bullet);
        assert.deepEqual(tooltip.show.lastCall.args, [{
          'originalValue': 0,
          'originalTarget': 0,
          'value': '0:undefined',
          'target': '0:undefined',
          'valueText': ['Actual Value:', '0:undefined', 'Target Value:', '0:undefined']
        }, {
          'x': 14,
          'y': 20
        }, {}]);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/core/tooltip","viz/core/renderers/renderer","viz/core/base_theme_manager","core/utils/type","viz/bullet"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/core/tooltip"), require("viz/core/renderers/renderer"), require("viz/core/base_theme_manager"), require("core/utils/type"), require("viz/bullet"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bulletTooltip.tests.js.map