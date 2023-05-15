!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/commandManager.tests.js"], ["jquery","ui/diagram","ui/diagram/diagram.commands_manager.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/commandManager.tests.js", ["jquery", "ui/diagram", "ui/diagram/diagram.commands_manager.js"], function($__export) {
  "use strict";
  var $,
      test,
      DiagramCommandsManager,
      customCommands,
      customTabs,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DiagramCommandsManager = $__m.default;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      customCommands = ['copy', 'paste', 'separator', {'text': 'AAA'}, {'icon': 'BBB'}, {'name': 'CCC'}, {'name': 'bold'}, {
        'name': 'bold',
        'text': 'Custom bold1'
      }, {
        'name': 'bold',
        'icon': 'Custom bold2'
      }, {
        'name': 'fontName',
        'text': 'Custom fontName'
      }, {'xxx': 'DDD'}, {
        'text': 'EEE',
        'items': ['cut', 'separator', 'selectAll']
      }, 'toolbox', {name: 'zoomLevel'}, {name: 'pageSize'}];
      customTabs = [{
        title: 'AAA',
        groups: [{
          title: 'AAA1',
          commands: ['fontName', 'fontSize']
        }, {
          title: 'AAA2',
          commands: ['fillColor']
        }]
      }, {
        title: 'BBB',
        groups: [{
          title: 'BBB1',
          commands: ['gridSize']
        }]
      }];
      moduleConfig = {beforeEach: function() {
          this.$element = $('#diagram').dxDiagram();
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('CommandManager', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('default main toolbar commands', function(assert) {
          assert.equal(DiagramCommandsManager.getMainToolbarCommands().length, 25);
        });
        test('default history toolbar commands', function(assert) {
          assert.equal(DiagramCommandsManager.getHistoryToolbarCommands().length, 4);
        });
        test('default view toolbar commands', function(assert) {
          var commands = DiagramCommandsManager.getViewToolbarCommands();
          assert.equal(commands.length, 6);
          assert.equal(commands[5].items.length, 6);
        });
        test('default view toolbar commands with excludes', function(assert) {
          var commands = DiagramCommandsManager.getViewToolbarCommands(undefined, ['toolbox']);
          assert.equal(commands.length, 6);
          assert.equal(commands[5].items.length, 5);
        });
        test('custom main toolbar commands', function(assert) {
          var commands = DiagramCommandsManager.getMainToolbarCommands(customCommands);
          assert.equal(commands.length, 14);
          assert.equal(commands[6].command, 16);
          assert.equal(commands[6].icon, 'bold');
          assert.equal(commands[6].text, 'Bold');
          assert.equal(commands[7].command, 16);
          assert.equal(commands[7].icon, 'bold');
          assert.equal(commands[7].text, 'Custom bold1');
          assert.equal(commands[8].command, 16);
          assert.equal(commands[8].icon, 'Custom bold2');
          assert.equal(commands[8].text, 'Bold');
          assert.equal(commands[9].command, 19);
          assert.equal(commands[9].text, 'Custom fontName');
          assert.equal(commands[9].widget, 'dxSelectBox');
          assert.equal(commands[9].items.length, 10);
          assert.equal(commands[10].items.length, 2);
          assert.equal(commands[10].items[1].beginGroup, true);
        });
        test('custom history toolbar commands', function(assert) {
          var commands = DiagramCommandsManager.getHistoryToolbarCommands(customCommands);
          assert.equal(commands.length, 14);
          assert.equal(commands[10].items.length, 2);
          assert.equal(commands[10].items[1].beginGroup, true);
        });
        test('custom view toolbar commands', function(assert) {
          var commands = DiagramCommandsManager.getViewToolbarCommands(customCommands);
          assert.equal(commands.length, 14);
          assert.equal(commands[10].items.length, 2);
          assert.equal(commands[10].items[1].beginGroup, true);
          assert.equal(commands[11].command, 'toolbox');
          assert.notEqual(commands[11].iconChecked, undefined);
          assert.notEqual(commands[11].iconUnchecked, undefined);
          assert.equal(commands[12].command, 60);
          assert.equal(commands[12].name, 'zoomLevel');
          assert.notEqual(commands[12].getEditorDisplayValue, undefined);
          assert.equal(commands[13].command, 54);
          assert.equal(commands[13].name, 'pageSize');
          assert.notEqual(commands[13].getCommandValue, undefined);
          assert.notEqual(commands[13].getEditorValue, undefined);
        });
        test('custom view toolbar commands with excludes', function(assert) {
          var commands = DiagramCommandsManager.getViewToolbarCommands(customCommands, ['toolbox']);
          assert.equal(commands.length, 13);
          assert.equal(commands[10].items.length, 2);
          assert.equal(commands[10].items[1].beginGroup, true);
        });
        test('default context menu commands', function(assert) {
          assert.equal(DiagramCommandsManager.getContextMenuCommands().length, 12);
        });
        test('custom context menu commands', function(assert) {
          var commands = DiagramCommandsManager.getContextMenuCommands(customCommands);
          assert.equal(commands.length, 13);
          assert.equal(commands[2].beginGroup, true);
          assert.equal(commands[5].command, 16);
          assert.equal(commands[5].icon, 'bold');
          assert.equal(commands[5].text, 'Bold');
          assert.equal(commands[6].command, 16);
          assert.equal(commands[6].icon, 'bold');
          assert.equal(commands[6].text, 'Custom bold1');
          assert.equal(commands[7].command, 16);
          assert.equal(commands[7].icon, 'Custom bold2');
          assert.equal(commands[7].text, 'Bold');
          assert.equal(commands[8].command, 19);
          assert.equal(commands[8].text, 'Custom fontName');
          assert.equal(commands[8].widget, 'dxSelectBox');
          assert.equal(commands[8].items.length, 10);
          assert.equal(commands[9].items.length, 2);
          assert.equal(commands[9].items[1].beginGroup, true);
        });
        test('default properties panel command tabs', function(assert) {
          var groups = DiagramCommandsManager.getPropertyPanelCommandTabs();
          assert.equal(groups.length, 3);
          assert.equal(groups[0].groups.length, 3);
          assert.equal(groups[0].groups[2].commands.length, 3);
        });
        test('custom properties panel command tabs', function(assert) {
          var groups = DiagramCommandsManager.getPropertyPanelCommandTabs(customTabs);
          assert.equal(groups.length, 2);
          assert.equal(groups[0].groups.length, 2);
          assert.equal(groups[0].groups[0].commands.length, 2);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","ui/diagram/diagram.commands_manager.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("ui/diagram/diagram.commands_manager.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=commandManager.tests.js.map