!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/events.tests.js"], ["jquery","core/utils/extend","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/events.tests.js", ["jquery", "core/utils/extend", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      extend,
      Consts,
      data,
      options,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      data = $__m.data;
      options = $__m.options;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, test = $__5.test, $__5));
      moduleConfig = {
        beforeEach: function() {
          var $__4 = this;
          this.createInstance = function(settings) {
            $__4.instance = $__4.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Events', moduleConfig, function() {
        test('onCustomCommand', function(assert) {
          var executedCommandName;
          var eventsOptions = {
            contextMenu: {items: [{
                name: 'custom',
                text: 'customItem'
              }]},
            onCustomCommand: function(e) {
              executedCommandName = e.name;
            }
          };
          this.createInstance(extend(options.tasksOnlyOptions, eventsOptions));
          this.clock.tick(10);
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          var popupItem = $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR).find(Consts.CONTEXT_MENU_ITEM_SELECTOR).eq(0);
          popupItem.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(executedCommandName, eventsOptions.contextMenu.items[0].name, 'onCustomCommand was raised');
        });
        test('selection changed', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var key = 2;
          var keyFromEvent;
          this.instance.option('onSelectionChanged', function(e) {
            keyFromEvent = e.selectedRowKey;
          });
          this.instance.option('selectedRowKey', key);
          this.clock.tick(10);
          assert.equal(keyFromEvent, key);
        });
        test('onContentReady', function(assert) {
          var onContentReadyHandler = sinon.stub();
          var eventsOptions = {
            tasks: {dataSource: data.tasks},
            onContentReady: onContentReadyHandler
          };
          this.createInstance(eventsOptions);
          this.clock.tick(10);
          assert.equal(onContentReadyHandler.callCount, 1, 'onContentReadyHandler was called 1 times');
        });
        test('task click', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var key = 2;
          var keyFromEvent;
          this.instance.option('onTaskClick', function(e) {
            keyFromEvent = e.key;
          });
          var $cellElement = $(this.instance._treeList.getCellElement(key - 1, 0));
          $cellElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(keyFromEvent, key);
        });
        test('task double click', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var key = 2;
          var keyFromEvent;
          this.instance.option('onTaskDblClick', function(e) {
            keyFromEvent = e.key;
            e.cancel = true;
          });
          var $cellElement = $(this.instance._treeList.getCellElement(key - 1, 0));
          $cellElement.trigger('dxdblclick');
          this.clock.tick(10);
          assert.equal(keyFromEvent, key);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 0, 'dialog is not shown');
        });
        test('scale cell prepared', function(assert) {
          var my_options = {
            tasks: {dataSource: data.tasks},
            onScaleCellPrepared: function(e) {
              var scaleElement = $(e.scaleElement);
              var line = $(e.separatorElement);
              if (e.scaleIndex === 0) {
                line.addClass('gsb_separator');
                scaleElement.addClass('gsb_item');
              } else {
                line.addClass('gst_separator');
                scaleElement.addClass('gst_item');
              }
            }
          };
          this.createInstance(my_options);
          this.clock.tick(10);
          var $top_item = $('#qunit-fixture').find('.gst_item');
          assert.ok($top_item.length > 0, 'top items customized');
          var $top_separator = $('#qunit-fixture').find('.gst_separator');
          assert.ok($top_separator.length > 0, 'top separators customized');
          var $bottom_item = $('#qunit-fixture').find('.gsb_item');
          assert.ok($bottom_item.length > 0, 'bottom items customized');
          var $bottom_separator = $('#qunit-fixture').find('.gsb_separator');
          assert.ok($bottom_separator.length > 0, 'bottom separators customized');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/extend","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/extend"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=events.tests.js.map