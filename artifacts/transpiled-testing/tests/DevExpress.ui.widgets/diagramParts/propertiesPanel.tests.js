!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/propertiesPanel.tests.js"], ["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js","../../../helpers/shadowDom.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/propertiesPanel.tests.js", ["jquery", "ui/diagram", "devexpress-diagram", "../../../helpers/diagramHelpers.js", "../../../helpers/shadowDom.js"], function($__export) {
  "use strict";
  var $,
      test,
      DiagramCommand,
      Consts,
      getPropertiesToolbarElement,
      getPropertiesToolbarInstance,
      findPropertiesToolbarItem,
      findPropertiesPanelToolbarItem,
      getActiveElement,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DiagramCommand = $__m.DiagramCommand;
    }, function($__m) {
      Consts = $__m.Consts;
      getPropertiesToolbarElement = $__m.getPropertiesToolbarElement;
      getPropertiesToolbarInstance = $__m.getPropertiesToolbarInstance;
      findPropertiesToolbarItem = $__m.findPropertiesToolbarItem;
      findPropertiesPanelToolbarItem = $__m.findPropertiesPanelToolbarItem;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, test = $__2.test, $__2));
      moduleConfig = {beforeEach: function() {
          this.$element = $('#diagram').dxDiagram();
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('Properties Panel', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('should render if propertiesPanel.visibility is "visible"', function(assert) {
          this.instance.option('propertiesPanel.visibility', 'visible');
          var $panel = $('#qunit-fixture').find(Consts.PROPERTIES_PANEL_SELECTOR);
          assert.equal($panel.length, 1);
          var $toolbar = getPropertiesToolbarElement(this.$element);
          assert.equal($toolbar.length, 1);
        });
        test('should not render if propertiesPanel.visibility is "disabled"', function(assert) {
          var $toolbar = this.$element.find(Consts.FLOATING_TOOLBAR_SELECTOR);
          assert.equal($toolbar.length, 3);
          this.instance.option('propertiesPanel.visibility', 'disabled');
          var $panel = $('#qunit-fixture').find(Consts.PROPERTIES_PANEL_SELECTOR);
          assert.equal($panel.length, 0);
          $toolbar = this.$element.find(Consts.FLOATING_TOOLBAR_SELECTOR);
          assert.equal($toolbar.length, 2);
        });
        test('should render if propertiesPanel.visibility is "collapsed"', function(assert) {
          this.instance.option('propertiesPanel.visibility', 'collapsed');
          var $panel = $('#qunit-fixture').find(Consts.PROPERTIES_PANEL_SELECTOR);
          assert.equal($panel.length, 0);
          var $toolbar = getPropertiesToolbarElement(this.$element);
          assert.equal($toolbar.length, 1);
          var $button = findPropertiesToolbarItem(this.$element, 'properties');
          $button.trigger('dxclick');
          $panel = $('#qunit-fixture').find(Consts.PROPERTIES_PANEL_SELECTOR);
          assert.equal($panel.length, 1);
          assert.equal($panel.is(':visible'), true);
          $button = findPropertiesToolbarItem(this.$element, 'properties');
          $button.trigger('dxclick');
          this.clock.tick(2000);
          assert.equal($panel.length, 1);
          assert.equal($panel.is(':visible'), false);
        });
        test('should fill properties panel with default items', function(assert) {
          this.instance.option('propertiesPanel.visibility', 'visible');
          var toolbar = getPropertiesToolbarInstance(this.$element);
          assert.equal(toolbar.option('items').length, 1);
        });
        test('should fill properties panel with custom items', function(assert) {
          this.instance.option('propertiesPanel.tabs', [{commands: ['units']}]);
          this.instance.option('propertiesPanel.visibility', 'visible');
          var toolbar = getPropertiesToolbarInstance(this.$element);
          assert.equal(toolbar.option('items').length, 1);
        });
        test('button should raise diagram commands', function(assert) {
          this.instance.option('propertiesPanel.visibility', 'visible');
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.TextLeftAlign).getState().value);
          findPropertiesPanelToolbarItem(this.$element, 'left').trigger('dxclick');
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.TextLeftAlign).getState().value);
        });
        test('diagram should be focused after set font bold', function(assert) {
          this.instance.option('propertiesPanel.visibility', 'visible');
          var $boldButton = findPropertiesPanelToolbarItem(this.$element, 'bold');
          assert.notEqual(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
          $boldButton.trigger('dxclick');
          this.clock.tick(200);
          assert.equal(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js","../../../helpers/shadowDom.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("devexpress-diagram"), require("../../../helpers/diagramHelpers.js"), require("../../../helpers/shadowDom.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=propertiesPanel.tests.js.map