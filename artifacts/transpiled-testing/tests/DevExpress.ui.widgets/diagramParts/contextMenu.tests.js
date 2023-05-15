!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/contextMenu.tests.js"], ["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js","../../../helpers/shadowDom.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/contextMenu.tests.js", ["jquery", "ui/diagram", "devexpress-diagram", "../../../helpers/diagramHelpers.js", "../../../helpers/shadowDom.js"], function($__export) {
  "use strict";
  var $,
      test,
      DiagramCommand,
      Consts,
      getContextMenuInstance,
      findContextMenuItem,
      getActiveElement,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DiagramCommand = $__m.DiagramCommand;
    }, function($__m) {
      Consts = $__m.Consts;
      getContextMenuInstance = $__m.getContextMenuInstance;
      findContextMenuItem = $__m.findContextMenuItem;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      moduleConfig = {beforeEach: function() {
          this.onCustomCommand = sinon.spy();
          this.$element = $('#diagram').dxDiagram({onCustomCommand: this.onCustomCommand});
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('Context Menu', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('should not render if contextMenu.enabled is false', function(assert) {
          var $contextMenu = this.$element.find(Consts.CONTEXT_MENU_SELECTOR);
          assert.equal($contextMenu.length, 1);
          this.instance.option('contextMenu.enabled', false);
          $contextMenu = this.$element.children(Consts.CONTEXT_MENU_SELECTOR);
          assert.equal($contextMenu.length, 0);
        });
        test('should load default items', function(assert) {
          var contextMenu = getContextMenuInstance(this.$element);
          assert.ok(contextMenu.option('items').length > 1);
        });
        test('should load custom items', function(assert) {
          this.instance.option('contextMenu.commands', ['copy']);
          var contextMenu = getContextMenuInstance(this.$element);
          assert.equal(contextMenu.option('items').length, 1);
        });
        test('should update items on showing', function(assert) {
          this.instance.option('contextMenu.commands', ['copy', 'selectAll']);
          var contextMenu = getContextMenuInstance(this.$element);
          assert.notOk(contextMenu.option('visible'));
          assert.equal(contextMenu.option('items')[0].visible, undefined);
          assert.equal(contextMenu.option('items')[1].visible, undefined);
          contextMenu.show();
          assert.ok(contextMenu.option('visible'));
          assert.equal(contextMenu.option('items')[0].visible, false);
          assert.equal(contextMenu.option('items')[1].visible, true);
        });
        test('should execute commands on click', function(assert) {
          this.instance.option('contextMenu.commands', ['selectAll']);
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var contextMenu = getContextMenuInstance(this.$element);
          contextMenu.show();
          assert.ok(this.instance._diagramInstance.selection.isEmpty());
          findContextMenuItem(this.$element, 'select all').trigger('dxclick');
          assert.notOk(this.instance._diagramInstance.selection.isEmpty());
        });
        test('diagram should be focused after menu item click', function(assert) {
          this.instance.option('contextMenu.commands', ['selectAll']);
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var contextMenu = getContextMenuInstance(this.$element);
          assert.notEqual(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
          contextMenu.show();
          findContextMenuItem(this.$element, 'select all').trigger('dxclick');
          this.clock.tick(200);
          assert.equal(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
        });
        test('should execute custom commands on click', function(assert) {
          this.instance.option('contextMenu.commands', [{
            name: 'custom1',
            text: 'custom1'
          }, {
            name: 'bold',
            text: 'custom bold'
          }, {
            text: 'sub menu',
            items: [{
              name: 'custom2',
              text: 'custom2'
            }, {
              name: 'italic',
              text: 'custom italic'
            }]
          }]);
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Bold).getState().value);
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Italic).getState().value);
          var contextMenu = getContextMenuInstance(this.$element);
          contextMenu.show();
          findContextMenuItem(this.$element, 'custom1').trigger('dxclick');
          findContextMenuItem(this.$element, 'custom bold').trigger('dxclick');
          findContextMenuItem(this.$element, 'sub menu').trigger('dxclick');
          findContextMenuItem(this.$element, 'custom2').trigger('dxclick');
          findContextMenuItem(this.$element, 'sub menu').trigger('dxclick');
          findContextMenuItem(this.$element, 'custom italic').trigger('dxclick');
          assert.ok(this.onCustomCommand.called);
          assert.equal(this.onCustomCommand.getCalls().length, 4);
          assert.equal(this.onCustomCommand.getCall(0).args[0]['name'], 'custom1');
          assert.equal(this.onCustomCommand.getCall(1).args[0]['name'], 'bold');
          assert.equal(this.onCustomCommand.getCall(2).args[0]['name'], 'custom2');
          assert.equal(this.onCustomCommand.getCall(3).args[0]['name'], 'italic');
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Bold).getState().value);
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Italic).getState().value);
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
//# sourceMappingURL=contextMenu.tests.js.map