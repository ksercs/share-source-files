!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/drawer.markup.tests.js"], ["jquery","core/config","core/utils/type","generic_light.css!","ui/drawer"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/drawer.markup.tests.js", ["jquery", "core/config", "core/utils/type", "generic_light.css!", "ui/drawer"], function($__export) {
  "use strict";
  var $,
      config,
      typeUtils,
      DRAWER_CLASS,
      DRAWER_WRAPPER_CLASS,
      DRAWER_PANEL_CONTENT_CLASS,
      DRAWER_VIEW_CONTENT_CLASS,
      DRAWER_SHADER_CLASS,
      OPENED_STATE_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      DRAWER_CLASS = 'dx-drawer';
      DRAWER_WRAPPER_CLASS = 'dx-drawer-wrapper';
      DRAWER_PANEL_CONTENT_CLASS = 'dx-drawer-panel-content';
      DRAWER_VIEW_CONTENT_CLASS = 'dx-drawer-content';
      DRAWER_SHADER_CLASS = 'dx-drawer-shader';
      OPENED_STATE_CLASS = 'dx-drawer-opened';
      QUnit.testStart(function() {
        var markup = '\
    <style>\
        .dx-drawer-panel-content {\
            width: 200px;\
        }\
    </style>\
    \
    <div id="drawer">\
        Test Content\
    </div>\
    <div id="contentTemplate">\
        <div data-options="dxTemplate: { name: \'customPanel\' }">\
            Test panel Template\
        </div>\
            <div data-options="dxTemplate: { name: \'customContent\' }">\
            Test Content Template\
        </div>\
    </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('rendering', function() {
        QUnit.test('render drawer', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          assert.ok($element.hasClass(DRAWER_CLASS), 'drawer rendered');
          assert.equal($element.find('.' + DRAWER_WRAPPER_CLASS).length, 1, 'drawer has wrapper');
          assert.equal($element.find('.' + DRAWER_PANEL_CONTENT_CLASS).length, 1, 'drawer has panel container');
          assert.equal($element.find('.' + DRAWER_VIEW_CONTENT_CLASS).length, 1, 'drawer has content');
        });
        QUnit.test('drawer should have correct mode class by default', function(assert) {
          var $element = $('#drawer').dxDrawer();
          assert.ok($element.hasClass(DRAWER_CLASS + '-shrink'), 'drawer class is correct');
        });
        QUnit.test('drawer should have correct revealMode class by default', function(assert) {
          var $element = $('#drawer').dxDrawer();
          assert.ok($element.hasClass(DRAWER_CLASS + '-slide'), 'drawer class is correct');
        });
        QUnit.test('render drawer content', function(assert) {
          var $element = $('#drawer').dxDrawer({});
          var $content = $element.find('.' + DRAWER_VIEW_CONTENT_CLASS);
          assert.equal($content.text().trim(), 'Test Content', 'drawer content was rendered');
        });
        QUnit.test('opened class should be applied correctly', function(assert) {
          var $element = $('#drawer').dxDrawer({opened: true});
          var instance = $element.dxDrawer('instance');
          assert.ok($element.hasClass(OPENED_STATE_CLASS), 'drawer has opened class');
          instance.option('opened', false);
          assert.notOk($element.hasClass(OPENED_STATE_CLASS), 'drawer hasn\'t opened class');
        });
        QUnit.test('custom template for panel should be rendered correctly', function(assert) {
          var $element = $('#contentTemplate').dxDrawer({template: 'customPanel'});
          var $panel = $($element.dxDrawer('instance').content());
          assert.equal($panel.text().trim(), 'Test panel Template', 'panel content text is correct');
        });
        QUnit.test('templates should be dom nodes without jQuery', function(assert) {
          assert.expect(2);
          $('#contentTemplate').dxDrawer({
            template: function(element) {
              assert.equal(typeUtils.isRenderer(element), !!config().useJQuery, 'element is correct');
            },
            contentTemplate: function(element) {
              assert.equal(typeUtils.isRenderer(element), !!config().useJQuery, 'element is correct');
            }
          });
        });
        QUnit.test('custom content template for content should be rendered correctly', function(assert) {
          var $element = $('#contentTemplate').dxDrawer({contentTemplate: 'customContent'});
          var $content = $($element.dxDrawer('instance').viewContent());
          assert.equal($content.text().trim(), 'Test Content Template', 'content text is correct');
        });
        QUnit.test('render panel positions', function(assert) {
          var $element = $('#contentTemplate').dxDrawer({
            position: 'right',
            openedStateMode: 'shrink',
            opened: true
          });
          var instance = $element.dxDrawer('instance');
          assert.notOk($element.hasClass(DRAWER_CLASS + '-left'), 'there is no left panel position class');
          assert.ok($element.hasClass(DRAWER_CLASS + '-right'), 'right panel position class added');
          instance.option('position', 'top');
          assert.notOk($element.hasClass(DRAWER_CLASS + '-right'), 'right panel position class has been removed');
          assert.notOk($element.hasClass(DRAWER_CLASS + '-left'), 'right panel position class has been removed');
          assert.ok($element.hasClass(DRAWER_CLASS + '-top'), 'top panel position class added');
        });
        QUnit.test('shader should be rendered by default if panel is visible', function(assert) {
          var $element = $('#drawer').dxDrawer({opened: true});
          assert.equal($element.find('.' + DRAWER_SHADER_CLASS).length, 1, 'drawer has shader');
        });
        QUnit.test('shader should not be rendered if shading = false', function(assert) {
          var $element = $('#drawer').dxDrawer({
            opened: true,
            shading: false
          });
          assert.equal($element.find('.' + DRAWER_SHADER_CLASS).length, 1, 'drawer has shader');
        });
      });
      QUnit.module('push mode', function() {
        QUnit.test('drawer should have correct class depending on mode', function(assert) {
          var $element = $('#drawer').dxDrawer({openedStateMode: 'push'});
          assert.ok($element.hasClass(DRAWER_CLASS + '-push'), 'drawer class is correct');
        });
      });
      QUnit.module('overlap mode', function() {
        QUnit.test('drawer should have correct class depending on mode', function(assert) {
          var $element = $('#drawer').dxDrawer({openedStateMode: 'overlap'});
          assert.ok($element.hasClass(DRAWER_CLASS + '-overlap'), 'drawer class is correct');
        });
        QUnit.test('drawer panel should be overlay in overlap mode', function(assert) {
          var drawer = $('#drawer').dxDrawer({openedStateMode: 'overlap'}).dxDrawer('instance');
          var $panel = drawer.content();
          assert.ok($($panel).hasClass('dx-overlay'), 'drawer panel is overlay');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","core/utils/type","generic_light.css!","ui/drawer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("core/utils/type"), require("generic_light.css!"), require("ui/drawer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drawer.markup.tests.js.map