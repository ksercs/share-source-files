!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/constraintViolationDialog.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/constraintViolationDialog.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      test,
      DependencyType,
      data,
      dependency_options,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      DependencyType = {
        FS: 0,
        SS: 1,
        FF: 2,
        SF: 3
      };
      data = {
        tasks: [{
          id: '1',
          title: 'Task 1',
          start: new Date(2019, 0, 1),
          end: new Date(2019, 0, 15),
          progress: 0
        }, {
          id: '2',
          title: 'Task 2',
          start: new Date(2019, 0, 2),
          end: new Date(2019, 0, 15),
          progress: 0
        }, {
          id: '3',
          title: 'Task 3',
          start: new Date(2019, 0, 15),
          end: new Date(2019, 0, 23),
          progress: 0
        }, {
          id: '4',
          title: 'Task 4',
          start: new Date(2019, 0, 13),
          end: new Date(2019, 0, 18),
          progress: 0
        }, {
          id: '5',
          title: 'Task 5',
          start: new Date(2019, 0, 13),
          end: new Date(2019, 0, 21),
          progress: 0
        }, {
          id: '6',
          title: 'Task 6',
          start: new Date(2019, 0, 13),
          end: new Date(2019, 0, 15),
          progress: 0
        }, {
          id: '7',
          title: 'Task 7',
          start: new Date(2019, 0, 14),
          end: new Date(2019, 0, 20),
          progress: 0
        }, {
          id: '8',
          title: 'Task 8',
          start: new Date(2019, 0, 13),
          end: new Date(2019, 0, 20),
          progress: 0
        }, {
          id: '9',
          title: 'Task 9',
          start: new Date(2019, 0, 12),
          end: new Date(2019, 0, 20),
          progress: 0
        }, {
          id: '10',
          title: 'Task 10',
          start: new Date(2019, 0, 14),
          end: new Date(2019, 0, 20),
          progress: 0
        }, {
          id: '11',
          title: 'Task 11',
          start: new Date(2019, 0, 14),
          end: new Date(2019, 0, 20),
          progress: 0
        }, {
          id: '12',
          title: 'Task 12',
          start: new Date(2019, 0, 12),
          end: new Date(2019, 0, 14),
          progress: 0
        }],
        dependencies: [{
          id: '1',
          predecessorId: '1',
          successorId: '3',
          type: DependencyType.FS
        }, {
          id: '2',
          predecessorId: '2',
          successorId: '3',
          type: DependencyType.FS
        }, {
          id: '3',
          predecessorId: '4',
          successorId: '6',
          type: DependencyType.SS
        }, {
          id: '4',
          predecessorId: '5',
          successorId: '6',
          type: DependencyType.SS
        }, {
          id: '5',
          predecessorId: '7',
          successorId: '9',
          type: DependencyType.FF
        }, {
          id: '6',
          predecessorId: '8',
          successorId: '9',
          type: DependencyType.FF
        }, {
          id: '7',
          predecessorId: '10',
          successorId: '12',
          type: DependencyType.SF
        }, {
          id: '8',
          predecessorId: '11',
          successorId: '12',
          type: DependencyType.SF
        }]
      };
      dependency_options = {
        tasks: {dataSource: data.tasks},
        dependencies: {dataSource: data.dependencies},
        editing: {enabled: true},
        validation: {validateDependencies: true}
      };
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          this.createInstance = function(settings) {
            $__3.instance = $__3.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('ConstraintViolationDialog', moduleConfig, function() {
        test('FS, critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('3', {start: new Date(2019, 0, 14)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 2, '2 options for critical errors');
        });
        test('FS, no critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('3', {start: new Date(2019, 0, 16)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 3, '3 options for no critical errors');
        });
        test('SS, critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('6', {start: new Date(2019, 0, 12)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 2, '2 options for critical errors');
        });
        test('SS, no critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('6', {start: new Date(2019, 0, 14)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 3, '3 options for no critical errors');
        });
        test('FF, critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('9', {end: new Date(2019, 0, 19)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 2, '2 options for critical errors');
        });
        test('FF, no critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('9', {end: new Date(2019, 0, 22)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 3, '3 options for no critical errors');
        });
        test('SF, critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('12', {end: new Date(2019, 0, 13)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 2, '2 options for critical errors');
        });
        test('SF, no critical errors', function(assert) {
          this.createInstance(dependency_options);
          this.clock.tick(10);
          this.instance.updateTask('12', {end: new Date(2019, 0, 15)});
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $options = $dialog.find(Consts.RADIO_BUTTON_SELECTOR);
          assert.equal($options.length, 3, '3 options for no critical errors');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=constraintViolationDialog.tests.js.map