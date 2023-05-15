!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/contextMenu.tests.js"], ["jquery","core/utils/extend","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/contextMenu.tests.js", ["jquery", "core/utils/extend", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      extend,
      Consts,
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
      options = $__m.options;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
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
      QUnit.module('Context Menu', moduleConfig, function() {
        test('showing', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          assert.equal(getContextMenuElement().length, 0, 'menu is hidden on create');
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          assert.equal(getContextMenuElement().length, 1, 'menu is visible after right click');
        });
        test('tree list context menu', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          assert.equal(getContextMenuElement().length, 0, 'menu is hidden on create');
          var $cellElement = $(this.instance._treeList.getCellElement(0, 0));
          $cellElement.trigger('contextmenu');
          assert.equal(getContextMenuElement().length, 2, 'menu is visible after right click in tree list');
        });
        test('shown at correct position', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var oldTop = $('#qunit-fixture').css('top');
          var oldLeft = $('#qunit-fixture').css('left');
          $('#qunit-fixture').css('top', '0');
          $('#qunit-fixture').css('left', '0');
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          assert.equal(getContextMenuElement().length, 0, 'menu is hidden on create');
          var boundsMax = $(window).height();
          var positionTop = boundsMax + 1;
          this.instance._showPopupMenu({position: {
              x: 0,
              y: positionTop
            }});
          var contextMenuElement = getContextMenuElement();
          assert.equal(contextMenuElement.length, 1, 'menu is visible after right click');
          assert.roughEqual(contextMenuElement.position().top, boundsMax - contextMenuElement.height(), 0.9, 'menu has been shown at correct position');
          this.clock.tick(10);
          $('#qunit-fixture').css('top', oldTop);
          $('#qunit-fixture').css('left', oldLeft);
        });
        test('enabled', function(assert) {
          this.createInstance(extend(options.tasksOnlyOptions, {contextMenu: {enabled: false}}));
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          assert.equal(getContextMenuElement().length, 0, 'menu is hidden after right click');
          this.instance.option('contextMenu.enabled', true);
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          assert.equal(getContextMenuElement().length, 1, 'menu is visible after right click');
        });
        test('customization', function(assert) {
          var contextMenuOptions = {contextMenu: {items: ['undo', 'redo', 'taskDetails', 'zoomIn', 'zoomOut', {
                name: 'custom',
                text: 'customItem',
                icon: 'blockquote',
                beginGroup: true
              }]}};
          this.createInstance(extend(options.tasksOnlyOptions, contextMenuOptions));
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          var getItems = function() {
            return getContextMenuElement().find(Consts.CONTEXT_MENU_ITEM_SELECTOR);
          };
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          var items = getItems();
          assert.equal(items.length, 6, 'there are 6 items');
          assert.equal(items.eq(0).text().toLowerCase(), contextMenuOptions.contextMenu.items[0].toLowerCase(), 'undo item was rendered');
          assert.equal(items.eq(5).text(), contextMenuOptions.contextMenu.items[5].text, 'custom item was rendered');
          this.instance.option('contextMenu.items', []);
          assert.equal(getItems().length, 4, 'there are 4 items by default');
        });
        test('cancel ContextMenuPreparing', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          this.instance.option('onContextMenuPreparing', function(e) {
            e.cancel = true;
          });
          this.clock.tick(10);
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          assert.equal(getContextMenuElement().length, 0, 'menu is hidden after right click');
        });
        test('add item in ContextMenuPreparing', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          this.instance.option('onContextMenuPreparing', function(e) {
            e.items.push({
              text: 'My Command',
              name: 'Custom'
            });
          });
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          var items = getContextMenuElement().find(Consts.CONTEXT_MENU_ITEM_SELECTOR);
          assert.equal(items.eq(items.length - 1).text(), 'My Command', 'custom item was rendered');
        });
        test('add subTask', function(assert) {
          var contextMenuOptions = {contextMenu: {items: ['addSubTask']}};
          this.createInstance(extend(options.tasksOnlyOptions, contextMenuOptions));
          this.clock.tick(10);
          var getContextMenuElement = function() {
            return $('body').find(Consts.OVERLAY_WRAPPER_SELECTOR).find(Consts.CONTEXT_MENU_SELECTOR);
          };
          var getItems = function() {
            return getContextMenuElement().find(Consts.CONTEXT_MENU_ITEM_SELECTOR);
          };
          this.instance._showPopupMenu({position: {
              x: 0,
              y: 0
            }});
          var items = getItems();
          assert.equal(items.length, 1, 'there are 1 items');
          assert.equal(items.eq(0).text(), 'New Subtask', 'undo item was rendered');
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
//# sourceMappingURL=contextMenu.tests.js.map