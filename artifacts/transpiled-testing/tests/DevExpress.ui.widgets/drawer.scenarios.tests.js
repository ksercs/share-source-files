!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/drawer.scenarios.tests.js"], ["jquery","core/utils/extend","core/utils/type","../../helpers/drawerHelpers.js","core/utils/resize_callbacks","ui/overlay/z_index","ui/file_manager","ui/color_box","ui/menu","ui/select_box","ui/tab_panel","ui/text_box","ui/tree_view","generic_light.css!","ui/drawer","animation/fx"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/drawer.scenarios.tests.js", ["jquery", "core/utils/extend", "core/utils/type", "../../helpers/drawerHelpers.js", "core/utils/resize_callbacks", "ui/overlay/z_index", "ui/file_manager", "ui/color_box", "ui/menu", "ui/select_box", "ui/tab_panel", "ui/text_box", "ui/tree_view", "generic_light.css!", "ui/drawer", "animation/fx"], function($__export) {
  "use strict";
  var $,
      extend,
      isNumeric,
      drawerTesters,
      resizeCallbacks,
      clearStack,
      dxDrawer,
      fx,
      moduleConfig,
      openedStateModes,
      configs,
      changeOpenedStateModeConfigs;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      isNumeric = $__m.isNumeric;
    }, function($__m) {
      drawerTesters = $__m.drawerTesters;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      clearStack = $__m.clearStack;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      dxDrawer = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }],
    execute: function() {
      moduleConfig = {
        beforeEach: function() {
          this.$fixture = $('#qunit-fixture');
          this.$element = $(drawerTesters.markup);
          this.$fixture.html(this.$element);
          this.clock = sinon.useFakeTimers();
          clearStack();
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
          this.$element.dxDrawer('instance').dispose();
          this.$element.remove();
          delete this.$element;
          this.clock.restore();
          this.clock = undefined;
          clearStack();
        }
      };
      openedStateModes = ['shrink', 'push', 'overlap'];
      configs = [];
      openedStateModes.forEach(function(openedStateMode) {
        ['left', 'top', 'right', 'bottom'].forEach(function(position) {
          ['slide', 'expand'].forEach(function(revealMode) {
            [true, false].forEach(function(shading) {
              [undefined, 25].forEach(function(minSize) {
                configs.push({
                  openedStateMode: openedStateMode,
                  position: position,
                  revealMode: revealMode,
                  shading: shading,
                  minSize: minSize
                });
              });
            });
          });
        });
      });
      QUnit.module('zIndex conflicts', moduleConfig, function() {
        openedStateModes.forEach(function(openedStateMode) {
          function checkShaderZIndex($drawer) {
            $drawer.dxDrawer({
              shading: true,
              opened: true,
              width: 600,
              height: 600,
              position: 'left',
              openedStateMode: openedStateMode,
              template: function() {
                return $('<div>').width(100).css('background-color', 'aqua').css('height', '100%');
              }
            });
            var $shader = $drawer.find('.dx-drawer-shader');
            var shaderZIndex = window.getComputedStyle($shader[0]).zIndex;
            if (!isNumeric(shaderZIndex)) {
              QUnit.assert.ok(false, ("test is designed for shader ZIndex numeric value but '" + shaderZIndex + "' was found. Redesign this test for another approach."));
            }
            var recursionLevel = 0;
            var recursiveCheckZIndex = function($element) {
              var currentElementStyle = getComputedStyle($element[0]);
              var currentElementRect = $element[0].getBoundingClientRect();
              if (recursionLevel > 100 || currentElementStyle.display === 'none' || currentElementRect.width === 0 || currentElementRect.height === 0 || $element.hasClass('dx-drawer-panel-content')) {
                return;
              }
              if (isNumeric(currentElementStyle.zIndex) && Number(currentElementStyle.zIndex) > Number(shaderZIndex)) {
                QUnit.assert.ok(false, ("shader has '" + shaderZIndex + "' z-index but there z-index is greater: " + $element.prop('tagName') + "(z-Index: " + currentElementStyle.zIndex + ", id:" + $element.attr('id') + ")"));
              }
              recursionLevel++;
              $element.children().each(function(_, child) {
                return recursiveCheckZIndex($(child));
              });
              recursionLevel--;
            };
            recursiveCheckZIndex($drawer.find('#view'));
            QUnit.assert.ok(true, 'one assert to fit the "at least one assertion" rule');
          }
          QUnit.test(("(" + openedStateMode + ") ColorBox_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxColorBox({value: '#f05b41'});
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") DataGrid_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxDataGrid({
              editing: {
                mode: 'row',
                allowUpdating: true
              },
              dataSource: [{
                date: new Date(2010, 10, 10),
                str: 'qwe'
              }]
            });
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") FileManager_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxFileManager({
              currentPath: 'Documents/Projects',
              fileSystemProvider: [{
                name: 'Documents',
                isDirectory: true,
                items: [{
                  name: 'Projects',
                  isDirectory: true,
                  items: [{name: 'About.rtf'}, {name: 'Passwords.rtf'}]
                }]
              }],
              height: 300,
              width: 300,
              permissions: {
                create: true,
                copy: true,
                move: true,
                delete: true,
                rename: true,
                upload: true,
                download: true
              }
            });
            this.clock.tick(400);
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") Menu_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxMenu({dataSource: [{
                text: 'item1',
                items: [{text: 'item1/item1'}, {text: 'item1/item2'}]
              }]});
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") SelectBox_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxSelectBox({dataSource: ['item1', 'item2']});
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") TabPanel_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxTabPanel({
              selectedIndex: 1,
              items: [{
                title: 'Tab1',
                text: 'This is Tab1'
              }, {
                title: 'Tab2',
                text: 'This is Tab2'
              }, {
                title: 'Tab3',
                text: 'This is Tab3'
              }]
            });
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") TextBox_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxTextBox({value: 'value'});
            checkShaderZIndex(this.$element);
          });
          QUnit.test(("(" + openedStateMode + ") TreeView_inner"), function(assert) {
            var $view = this.$element.find('#view');
            $('<div>').appendTo($view).dxTreeView({
              showCheckBoxesMode: 'normal',
              items: [{
                id: '1',
                text: 'item1',
                expanded: true,
                items: [{
                  id: '11',
                  text: 'item1_1',
                  expanded: true,
                  items: [{
                    id: '111',
                    text: 'item1_1_1',
                    expanded: true
                  }]
                }]
              }]
            });
            checkShaderZIndex(this.$element);
          });
        });
      });
      configs.forEach(function(config) {
        QUnit.module(("Scenarios (" + config.openedStateMode + ", " + config.position + ", " + config.revealMode + ", shading: " + config.shading + ", minSize: " + config.minSize + ")"), moduleConfig, function() {
          function configIs(openedStateMode, position, revealMode) {
            var isPosition = Array.isArray(position) ? (position.indexOf(config.position) >= 0) : (config.position === position || !position);
            var isRevealMode = Array.isArray(revealMode) ? (revealMode.indexOf(config.revealMode) >= 0) : (config.revealMode === revealMode || !revealMode);
            return config.openedStateMode === openedStateMode && isPosition && isRevealMode;
          }
          function testOrSkip(name, skip, callback) {
            if (skip()) {} else {
              QUnit.test(name, callback);
            }
          }
          function testOverlap(name, skip, callback) {
            if (config.openedStateMode === 'overlap') {
              if (skip()) {} else {
                QUnit.test(name, callback);
              }
            }
          }
          function getFullDrawerOptions(targetOptions) {
            return extend({
              rtlEnabled: false,
              animationEnabled: false
            }, config, targetOptions);
          }
          QUnit.test('opened: false', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template,
              __debugWhenPanelContentRendered: function(e) {
                if (!(configIs('overlap', ['right', 'top', 'bottom'], ['expand', 'slide']) && config.minSize)) {
                  drawerTesters[config.position].checkWhenPanelContentRendered(assert, e.drawer, drawerElement, $('#template').get(0), config.minSize);
                }
              }
            }));
            this.clock.tick(100);
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false -> minSize: 0', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('minSize', 0);
            this.clock.tick(100);
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false -> minSize: null', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('minSize', null);
            this.clock.tick(100);
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false -> minSize: 30', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('minSize', 30);
            this.clock.tick(100);
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false -> opened: true', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template()
            }));
            this.clock.tick(100);
            drawer.option('opened', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOrSkip('opened: false, visible: false -> visible: true', function() {
            return configIs('overlap') && config.minSize;
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              visible: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('visible', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          testOrSkip('opened: false, visible: false -> visible: true -> opened: true', function() {
            return configIs('overlap');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              visible: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('visible', true);
            this.clock.tick(100);
            drawer.option('opened', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true -> visible: false', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('visible', false);
            this.clock.tick(100);
            assert.strictEqual(drawer.option('visible'), false, 'option(visible)');
            assert.strictEqual(window.getComputedStyle(drawerElement).display, 'none', 'drawerElement.display');
          });
          [true, false].forEach(function(closeOnOutsideClick) {
            QUnit.test(("opened: true -> click by viewContent, closeOnOutsideClick: " + closeOnOutsideClick), function(assert) {
              var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
              var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
                opened: true,
                closeOnOutsideClick: closeOnOutsideClick,
                template: drawerTesters[config.position].template
              }));
              this.clock.tick(100);
              $(drawer.viewContent()).trigger('dxclick');
              this.clock.tick(100);
              if (closeOnOutsideClick) {
                drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
              } else {
                drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
              }
            });
          });
          QUnit.test('opened: true -> visible: false -> visible: true', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('visible', false);
            this.clock.tick(100);
            drawer.option('visible', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test(("opened: true, shading: " + config.shading + " -> shading: " + !config.shading), function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              shading: config.shading,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('shading', !config.shading);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true -> repaint', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.repaint();
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOrSkip('opened: false -> resize -> opened: true, update position config after resize', function() {
            return configIs('overlap', 'bottom');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: false,
              template: drawerTesters[config.position].template
            }));
            var originalRenderPositionFunc = drawer._renderPosition;
            try {
              sinon.spy(drawer, '_renderPosition');
              resizeCallbacks.fire();
            } finally {
              drawer._renderPosition = originalRenderPositionFunc;
            }
            resizeCallbacks.fire();
            this.clock.tick(100);
            drawer.option('opened', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOrSkip('opened: true (template + onRendered)', function() {
            return configIs('overlap', 'bottom');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              width: 200,
              height: 100,
              opened: true,
              visible: true,
              template: 'template1',
              templatesRenderAsynchronously: true,
              integrationOptions: {templates: {template1: {render: function(data) {
                      $(data.container).append(drawerTesters[config.position].template);
                      data.onRendered();
                    }}}}
            }));
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOverlap('opened: true (T813710: template + rendered + _viewPortChangeHandler)', function() {
            return configIs(undefined, 'right') || configIs('overlap', 'bottom');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              visible: true,
              template: 'template1',
              templatesRenderAsynchronously: true,
              templateSize: drawerTesters[config.position].templateSize,
              integrationOptions: {templates: {template1: {render: function(data) {
                      drawer.getOverlay()._viewPortChangeHandler();
                      $(data.container).append($(drawerTesters[config.position].template()));
                      data.onRendered();
                    }}}}
            }));
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOrSkip('opened: true, visible: false -> visible: true', function() {
            return configIs('overlap');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              visible: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.option('visible', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          testOrSkip('opened: true, visible: false -> repaint -> visible: true', function() {
            return configIs('overlap');
          }, function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              opened: true,
              visible: false,
              template: drawerTesters[config.position].template
            }));
            this.clock.tick(100);
            drawer.repaint();
            this.clock.tick(100);
            drawer.option('visible', true);
            this.clock.tick(100);
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
        });
      });
      changeOpenedStateModeConfigs = [];
      ['slide', 'expand'].forEach(function(revealMode) {
        [undefined, 25].forEach(function(minSize) {
          ['left', 'top', 'right', 'bottom'].forEach(function(position) {
            changeOpenedStateModeConfigs.push({
              position: position,
              revealMode: revealMode,
              minSize: minSize
            });
          });
        });
      });
      changeOpenedStateModeConfigs.forEach(function(config) {
        function getFullDrawerOptions(targetOptions) {
          return extend({
            rtlEnabled: false,
            animationEnabled: false,
            shading: false,
            template: drawerTesters[config.position].template
          }, config, targetOptions);
        }
        QUnit.module(("Change openedStateMode (position: " + config.position + ", revealMode: " + config.revealMode + ", minSize: " + config.minSize + ")"), moduleConfig, function() {
          QUnit.test('opened: false, push -> shrink', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'push',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'shrink');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false, push -> overlap', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'push',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'overlap');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false, shrink -> push', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'shrink',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'push');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false, shrink -> overlap', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'shrink',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'overlap');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false, overlap -> shrink', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'overlap',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'shrink');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: false, overlap -> push', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'overlap',
              opened: false
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'push');
            drawerTesters[config.position].checkHidden(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, push -> shrink', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'push',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'shrink');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, push -> overlap', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'push',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'overlap');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, shrink -> push', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'shrink',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'push');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, shrink -> overlap', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'shrink',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'overlap');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, overlap -> shrink', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'overlap',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'shrink');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
          QUnit.test('opened: true, overlap -> push', function(assert) {
            var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
            var drawer = new dxDrawer(drawerElement, getFullDrawerOptions({
              openedStateMode: 'overlap',
              opened: true
            }));
            this.clock.tick(100);
            drawer.option('openedStateMode', 'push');
            drawerTesters[config.position].checkOpened(assert, drawer, drawerElement);
          });
        });
      });
      QUnit.module('Scenarios', moduleConfig, function() {
        QUnit.test('push, left, opened: false, hidden child, AngularJS, T956751', function(assert) {
          var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
          var drawer = new dxDrawer(drawerElement, {
            openedStateMode: 'shrink',
            position: 'left',
            template: function() {
              return "<div id=\"template\" data-options=\"dxTemplate: {name: 'chartDrawerTemplate'}\" class=\"dx-template-wrapper ng-scope\">\n                    <div style=\"width: 150px; display: none !important;\"></div>\n                    <div style=\"width: 150px; height: 100px\"></div>\n                </div>";
            },
            opened: false
          });
          this.clock.tick(100);
          drawerTesters['left'].checkHidden(assert, drawer, drawerElement);
        });
        QUnit.test('overlay, left, opened: false, Angular, T948509', function(assert) {
          var drawerElement = $('#' + drawerTesters.drawerElementId).get(0);
          var drawer = new dxDrawer(drawerElement, {
            openedStateMode: 'overlap',
            position: 'left',
            template: function() {
              return "<div _ngcontent-qhr-c357=\"\" class=\"dx-template-wrapper\">\n                    <div id=\"template\" style=\"width: 150px; height: 100px\"></div>\n                </div>";
            },
            opened: false
          });
          this.clock.tick(100);
          drawerTesters['left'].checkHidden(assert, drawer, drawerElement);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/extend","core/utils/type","../../helpers/drawerHelpers.js","core/utils/resize_callbacks","ui/overlay/z_index","ui/file_manager","ui/color_box","ui/menu","ui/select_box","ui/tab_panel","ui/text_box","ui/tree_view","generic_light.css!","ui/drawer","animation/fx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/extend"), require("core/utils/type"), require("../../helpers/drawerHelpers.js"), require("core/utils/resize_callbacks"), require("ui/overlay/z_index"), require("ui/file_manager"), require("ui/color_box"), require("ui/menu"), require("ui/select_box"), require("ui/tab_panel"), require("ui/text_box"), require("ui/tree_view"), require("generic_light.css!"), require("ui/drawer"), require("animation/fx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drawer.scenarios.tests.js.map