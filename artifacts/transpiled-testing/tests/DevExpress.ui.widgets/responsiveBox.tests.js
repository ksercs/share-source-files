!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/responsiveBox.tests.js"], ["jquery","core/devices","core/component_registrator","ui/widget/ui.widget","ui/responsive_box","../../helpers/responsiveBoxScreenMock.js","ui/button","ui/box","events/core/events_engine","core/dom_adapter","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/responsiveBox.tests.js", ["jquery", "core/devices", "core/component_registrator", "ui/widget/ui.widget", "ui/responsive_box", "../../helpers/responsiveBoxScreenMock.js", "ui/button", "ui/box", "events/core/events_engine", "core/dom_adapter", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      devices,
      registerComponent,
      Widget,
      ResponsiveBox,
      responsiveBoxScreenMock,
      dxButton,
      eventsEngine,
      domAdapter,
      BOX_CLASS,
      BOX_ITEM_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      Widget = $__m.default;
    }, function($__m) {
      ResponsiveBox = $__m.default;
    }, function($__m) {
      responsiveBoxScreenMock = $__m.default;
    }, function($__m) {
      dxButton = $__m.default;
    }, function($__m) {}, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="responsiveBox"></div>\
        \
        <div id="responsiveBoxWithTemplate">\
            <div data-options="dxItem: { location: { row: 0 , col: 0 } }">test</div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      BOX_CLASS = 'dx-box';
      BOX_ITEM_CLASS = 'dx-box-item';
      moduleConfig = {
        beforeEach: function() {
          responsiveBoxScreenMock.setup.call(this);
        },
        afterEach: function() {
          responsiveBoxScreenMock.teardown.call(this);
        }
      };
      QUnit.module('layouting', moduleConfig, function() {
        QUnit.test('check size of grid without items', function(assert) {
          var rows = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }];
          var cols = [{
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 100
          }];
          var height = 600;
          var width = 600;
          var heightWithoutBaseSize = height - rows[0].baseSize - rows[1].baseSize;
          var widthWithoutBaseSize = width - cols[0].baseSize - cols[1].baseSize;
          var heightRatioUnit = heightWithoutBaseSize / (rows[0].ratio + rows[1].ratio);
          var widthRatioUnit = widthWithoutBaseSize / (cols[0].ratio + cols[1].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            width: width,
            height: height
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(0);
          var $columnBoxes = $rowBox.find('.' + BOX_CLASS);
          var $firstRow = $columnBoxes.eq(0).find('.' + BOX_ITEM_CLASS);
          assert.equal($firstRow.eq(0).width(), cols[0].baseSize + widthRatioUnit * cols[0].ratio, 'empty item 11 width');
          assert.equal($firstRow.eq(0).height(), rows[0].baseSize + heightRatioUnit * rows[0].ratio, 'empty item 11 height');
          assert.equal($firstRow.eq(1).width(), cols[1].baseSize + widthRatioUnit * cols[1].ratio, 'empty item 12 width');
          assert.equal($firstRow.eq(1).height(), rows[0].baseSize + heightRatioUnit * rows[0].ratio, 'empty item 12 height');
          var $secondRow = $columnBoxes.eq(1).find('.' + BOX_ITEM_CLASS);
          assert.equal($secondRow.eq(0).width(), cols[0].baseSize + widthRatioUnit * cols[0].ratio, 'empty item 21 width');
          assert.equal($secondRow.eq(0).height(), rows[1].baseSize + heightRatioUnit * rows[1].ratio, 'empty item 21 height');
          assert.equal($secondRow.eq(1).width(), cols[1].baseSize + widthRatioUnit * cols[1].ratio, 'empty item 22 width');
          assert.equal($secondRow.eq(1).height(), rows[1].baseSize + heightRatioUnit * rows[1].ratio, 'empty item 22 height');
        });
        QUnit.test('check size of grid with items', function(assert) {
          var rows = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }];
          var cols = [{
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 100
          }];
          var height = 600;
          var width = 600;
          var heightWithoutBaseSize = height - rows[0].baseSize - rows[1].baseSize;
          var widthWithoutBaseSize = width - cols[0].baseSize - cols[1].baseSize;
          var heightRatioUnit = heightWithoutBaseSize / (rows[0].ratio + rows[1].ratio);
          var widthRatioUnit = widthWithoutBaseSize / (cols[0].ratio + cols[1].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'item11'
            }, {
              location: {
                row: 1,
                col: 1
              },
              text: 'item22'
            }, {
              location: {
                row: 1,
                col: 0
              },
              text: 'item21'
            }, {
              location: {
                row: 0,
                col: 1
              },
              text: 'item12'
            }],
            width: width,
            height: height
          });
          var $boxes = $responsiveBox.find('.' + BOX_CLASS);
          var $firstRow = $boxes.eq(1).find('.' + BOX_ITEM_CLASS);
          assert.equal($firstRow.eq(0).width(), cols[0].baseSize + widthRatioUnit * cols[0].ratio, 'item11 width');
          assert.equal($firstRow.eq(0).height(), rows[0].baseSize + heightRatioUnit * rows[0].ratio, 'item11 height');
          assert.equal($firstRow.eq(1).width(), cols[1].baseSize + widthRatioUnit * cols[1].ratio, 'item12 width');
          assert.equal($firstRow.eq(1).height(), rows[0].baseSize + heightRatioUnit * rows[0].ratio, 'item12 height');
          var $secondRow = $boxes.eq(2).find('.' + BOX_ITEM_CLASS);
          assert.equal($secondRow.eq(0).width(), cols[0].baseSize + widthRatioUnit * cols[0].ratio, 'item21 width');
          assert.equal($secondRow.eq(0).height(), rows[1].baseSize + heightRatioUnit * rows[1].ratio, 'item21 height');
          assert.equal($secondRow.eq(1).width(), cols[1].baseSize + widthRatioUnit * cols[1].ratio, 'item22 width');
          assert.equal($secondRow.eq(1).height(), rows[1].baseSize + heightRatioUnit * rows[1].ratio, 'item22 height');
        });
        QUnit.test('root box and it\'s items should have correct height (T566515)', function(assert) {
          var rows = [{}, {}];
          var cols = [{ratio: 1}, {ratio: 1}];
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'item11'
            }, {
              location: {
                row: 1,
                col: 1
              },
              text: 'item22'
            }, {
              location: {
                row: 1,
                col: 0
              },
              text: 'item21'
            }, {
              location: {
                row: 0,
                col: 1
              },
              text: 'item12'
            }],
            height: 'auto'
          });
          var $boxes = $responsiveBox.find('.' + BOX_CLASS);
          var $rootBox = $boxes.eq(0);
          assert.notEqual($rootBox.height(), 0, 'Height of the rootBox is OK');
          var $rootItems = $rootBox.find('.' + BOX_ITEM_CLASS);
          assert.roughEqual($rootItems.eq(0).height(), 19, 2.1, 'Height of the root item is OK');
          assert.roughEqual($rootItems.eq(1).height(), 19, 2.1, 'Height of the root item is OK');
        });
        QUnit.test('check width of colspan', function(assert) {
          var cols = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var size = 900;
          var sizeWithoutBaseSize = size - cols[0].baseSize - cols[1].baseSize - cols[2].baseSize;
          var ratioUnit = sizeWithoutBaseSize / (cols[0].ratio + cols[1].ratio + cols[2].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: cols,
            width: size,
            items: [{location: {
                row: 0,
                col: 0,
                colspan: 2
              }}, {location: {
                row: 0,
                col: 2
              }}]
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(1);
          var $boxItems = $rowBox.find('.' + BOX_ITEM_CLASS);
          var firstColumnSize = cols[0].baseSize + cols[0].ratio * ratioUnit;
          var secondColumnSize = cols[1].baseSize + cols[1].ratio * ratioUnit;
          var thirdColumnSize = cols[2].baseSize + cols[2].ratio * ratioUnit;
          assert.equal($boxItems.eq(0).width(), firstColumnSize + secondColumnSize, 'first item size');
          assert.equal($boxItems.eq(1).width(), thirdColumnSize, 'second item size');
        });
        QUnit.test('check height of rowspan', function(assert) {
          var rows = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var size = 900;
          var sizeWithoutBaseSize = size - rows[0].baseSize - rows[1].baseSize - rows[2].baseSize;
          var ratioUnit = sizeWithoutBaseSize / (rows[0].ratio + rows[1].ratio + rows[2].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: [{}],
            height: size,
            items: [{location: {
                row: 0,
                col: 0,
                rowspan: 2
              }}, {location: {
                row: 2,
                col: 0
              }}]
          });
          var $boxItems = $responsiveBox.find('.' + BOX_ITEM_CLASS);
          var firstRowSize = rows[0].baseSize + rows[0].ratio * ratioUnit;
          var secondRowSize = rows[1].baseSize + rows[1].ratio * ratioUnit;
          var thirdRowSize = rows[2].baseSize + rows[2].ratio * ratioUnit;
          assert.equal($boxItems.eq(0).height(), firstRowSize + secondRowSize, 'first item size');
          assert.equal($boxItems.eq(1).height(), thirdRowSize, 'second item size');
        });
        QUnit.test('rowspan and colspan', function(assert) {
          var rows = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var cols = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var size = 900;
          var sizeWithoutBaseSize = size - rows[0].baseSize - rows[1].baseSize - rows[2].baseSize;
          var ratioUnit = sizeWithoutBaseSize / (rows[0].ratio + rows[1].ratio + rows[2].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            items: [{location: {
                row: 0,
                col: 0,
                rowspan: 2
              }}, {location: {
                row: 0,
                col: 1,
                colspan: 2
              }}],
            width: size,
            height: size
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(1);
          assert.equal($rowBox.height(), rows[0].baseSize + rows[1].baseSize + ratioUnit * rows[0].ratio + ratioUnit * rows[1].ratio, 'rowspan height');
          var $colBox = $rowBox.find('.' + BOX_CLASS).eq(0);
          assert.equal($colBox.width(), cols[1].baseSize + cols[2].baseSize + ratioUnit * cols[1].ratio + ratioUnit * cols[2].ratio, 'colspan width');
          assert.equal($rowBox.height(), $colBox.height(), 'inner boxes are equal');
        });
        QUnit.test('rowspan and colspan simultaneously', function(assert) {
          var rows = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var cols = [{
            ratio: 1,
            baseSize: 100
          }, {
            ratio: 2,
            baseSize: 200
          }, {
            ratio: 1,
            baseSize: 200
          }];
          var size = 900;
          var sizeWithoutBaseSize = size - rows[0].baseSize - rows[1].baseSize - rows[2].baseSize;
          var ratioUnit = sizeWithoutBaseSize / (rows[0].ratio + rows[1].ratio + rows[2].ratio);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            items: [{location: {
                col: 0,
                row: 0,
                colspan: 2,
                rowspan: 2
              }}],
            width: size,
            height: size
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(1);
          var $firstItem = $rowBox.find('.' + BOX_ITEM_CLASS).eq(0);
          var firstItemWidth = rows[0].baseSize + rows[1].baseSize + ratioUnit * rows[0].ratio + ratioUnit * rows[1].ratio;
          var firstItemHeight = cols[0].baseSize + cols[1].baseSize + ratioUnit * cols[0].ratio + ratioUnit * cols[1].ratio;
          assert.equal($firstItem.width(), firstItemWidth, 'item width');
          assert.equal($firstItem.height(), firstItemHeight, 'item height');
        });
        QUnit.test('overlapping rowspan and colspan', function(assert) {
          var size = 100;
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {}, {}],
            cols: [{}, {}, {}, {}],
            items: [{location: {
                col: 0,
                row: 0,
                rowspan: 3
              }}, {location: {
                col: 1,
                row: 1,
                rowspan: 2
              }}, {location: {
                col: 1,
                row: 0,
                colspan: 2
              }}, {location: {
                col: 2,
                row: 1,
                colspan: 2
              }}],
            width: 4 * size,
            height: 3 * size
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(1);
          assert.roughEqual($rowBox.height(), 3 * size, 0.1, 'first row box height');
          var $colBox = $rowBox.find('.' + BOX_CLASS).eq(1);
          assert.roughEqual($colBox.width(), 3 * size, 0.1, 'second col box width');
        });
        QUnit.test('minSize and maxSize', function(assert) {
          var size = 100;
          var minSize = 80;
          var maxSize = 5;
          var device = devices.real();
          var version = device.version;
          var isAndroid = device.android;
          if (isAndroid && (version[0] < 4 || (version[0] === 4 && version[1] === 0))) {
            assert.ok(true, 'old android min/max height problem');
            return;
          }
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{
              baseSize: 0,
              minSize: minSize,
              ratio: 1
            }, {
              maxSize: maxSize,
              ratio: 1
            }, {ratio: 1}],
            cols: [{
              baseSize: 0,
              minSize: minSize,
              ratio: 1
            }, {
              maxSize: maxSize,
              ratio: 1
            }, {ratio: 1}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              html: '<div class=\'first\'></div>'
            }, {
              location: {
                row: 1,
                col: 1
              },
              html: '<div class=\'second\'></div>'
            }],
            width: size,
            height: size
          });
          var $first = $responsiveBox.find('.first').parent();
          var $second = $responsiveBox.find('.second').parent();
          assert.equal($first.width(), minSize, 'width is min-width');
          assert.equal($first.height(), minSize, 'height is min-height');
          assert.equal($second.width(), maxSize, 'width is max-width');
          assert.equal($second.height(), maxSize, 'height is max-height');
        });
        QUnit.test('singleColumnScreen render items with baseSize: auto', function(assert) {
          this.updateScreenSize(500);
          var $responsiveBox = $('#responsiveBox').css('height', 'auto').dxResponsiveBox({
            rows: [{}, {}],
            cols: [{}],
            singleColumnScreen: 'xs',
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: '1'
            }, {
              location: {
                row: 0,
                col: 1
              },
              text: '2'
            }]
          });
          assert.notEqual($responsiveBox.height(), 0, 'item has height: auto');
        });
        QUnit.test('width and height rendered correctly when dxResponsiveBox has one row and column', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            width: 'auto',
            height: 'auto',
            rows: [{
              ratio: 1,
              baseSize: 'auto'
            }],
            cols: [{
              ratio: 1,
              baseSize: 'auto'
            }],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              html: '<div style=\'height: 100px;\'></div>'
            }]
          });
          assert.equal($responsiveBox.height(), 100, 'height calculated correctly');
          var $item = $responsiveBox.find('.dx-box-item');
          assert.equal($item.width(), $responsiveBox.width(), 'item width calculated correctly');
        });
      });
      QUnit.module('template rendering', moduleConfig, function() {
        QUnit.test('widget inside item is not disposed', function(assert) {
          this.updateScreenSize(1000);
          registerComponent('dxWidget', Widget.inherit({}));
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0,
                screen: 'md'
              },
              template: function() {
                return $('<div>').dxWidget();
              }
            }]
          });
          var $widget = $responsiveBox.find('.dx-item .dx-widget');
          var initialWidget = $widget.dxWidget('instance');
          this.updateScreenSize(700);
          this.updateScreenSize(1000);
          $widget = $responsiveBox.find('.dx-item .dx-widget');
          assert.equal($widget.dxWidget('instance'), initialWidget, 'widget was rendered correctly');
        });
        QUnit.test('items have no unsafe modifications after dispose', function(assert) {
          this.updateScreenSize(1000);
          var items = [{
            location: {
              row: 0,
              col: 0,
              screen: 'md'
            },
            template: 'template'
          }];
          var result = [{
            baseSize: 'auto',
            ratio: 1,
            location: {
              row: 0,
              col: 0,
              screen: 'md'
            },
            template: 'template'
          }];
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: items
          });
          assert.ok(items[0].node, 'node exists on rendering (unsafe)');
          $responsiveBox.dxResponsiveBox('instance').dispose();
          assert.deepEqual(items, result, 'items have no unsafe modifications after dispose');
        });
      });
      QUnit.module('events', moduleConfig, function() {
        QUnit.test('onLayoutChanged', function(assert) {
          this.updateScreenSize(500);
          var onLayoutChangedSpy = sinon.stub();
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'item(0,0)'
            }],
            onLayoutChanged: onLayoutChangedSpy
          });
          assert.equal(onLayoutChangedSpy.called, false, 'onLayoutChanged not triggered on start');
          this.updateScreenSize(800);
          assert.ok(onLayoutChangedSpy.calledOnce, 'onLayoutChanged was triggered');
          this.updateScreenSize(1000);
          assert.ok(onLayoutChangedSpy.calledTwice, 'onLayoutChanged was triggered twice');
          this.updateScreenSize(1001);
          assert.ok(onLayoutChangedSpy.calledTwice, 'onLayoutChanged was not triggered when screen was not changed');
          $responsiveBox.dxResponsiveBox('repaint');
          assert.ok(onLayoutChangedSpy.calledThrice, 'onLayoutChanged was triggered after repaint');
        });
        QUnit.test('onItemClick', function(assert) {
          var responsiveBox = new ResponsiveBox($('#responsiveBox'), {items: [{text: 1}, {text: 2}]});
          responsiveBox.on('itemClick', function() {
            assert.ok(true, 'clicked');
          });
          $(responsiveBox.itemElements()).eq(0).trigger('dxclick');
        });
      });
      QUnit.module('option', moduleConfig, function() {
        QUnit.test('currentScreenFactor', function(assert) {
          this.updateScreenSize(500);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'item(0,0)'
            }]
          });
          var responsiveBox = $responsiveBox.dxResponsiveBox('instance');
          assert.equal(responsiveBox.option('currentScreenFactor'), 'xs', 'currentScreenFactor update on start');
          this.updateScreenSize(800);
          assert.equal(responsiveBox.option('currentScreenFactor'), 'sm', 'currentScreenFactor update after restart');
        });
        QUnit.test('Changing visibility should update height', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            visible: false,
            height: 400,
            rows: [{ratio: 1}, {ratio: 1}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              template: function() {
                return $('<div>').prop('id', 'cellTest');
              }
            }]
          });
          var responsiveBox = $responsiveBox.dxResponsiveBox('instance');
          responsiveBox.option('visible', true);
          var $firstItem = $('#cellTest').closest('.dx-item');
          assert.equal($firstItem.height(), 200, 'height calculate correctly');
        });
        QUnit.test('onOptionChanged should not be fired after click on item', function(assert) {
          var onOptionChangedStub = sinon.stub();
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'item(0,0)'
            }],
            onOptionChanged: onOptionChangedStub
          });
          var initCallCount = onOptionChangedStub.callCount;
          $($responsiveBox.find('.dx-item')).trigger('dxclick');
          assert.equal(onOptionChangedStub.callCount, initCallCount, 'onOptionChanged wasn\'t fired');
        });
        QUnit.test('responsive box should work correctly after item option changing', function(assert) {
          var responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                col: 0,
                row: 0
              },
              html: '<div class=\'test\'>'
            }]
          }).dxResponsiveBox('instance');
          responsiveBox.option('items[0].visible', false);
          assert.ok($('#responsiveBox').find('.dx-item').eq(0).hasClass('dx-state-invisible'), 'responsive box works correctly');
        });
        QUnit.test('responsive box should render layout correctly after item option changing', function(assert) {
          var responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                col: 0,
                row: 0
              },
              html: '<div class=\'test\'>'
            }]
          }).dxResponsiveBox('instance');
          responsiveBox.option('items[0].visible', false);
          responsiveBox.option('items[0].visible', true);
          assert.equal($('#responsiveBox').find('.dx-item').eq(0).get(0).style.display, 'flex', 'Layout is correct');
          assert.equal($('#responsiveBox').find('.dx-item').eq(0).get(0).style.flex, '1 1 auto', 'Layout is correct');
        });
        [function(box) {
          box.option('items[0].visible', false);
          box.option('items[0].visible', true);
        }, function(box) {
          box.option('items[0].disabled', true);
          box.option('items[0].disabled', false);
        }].forEach(function(optionRefreshAction) {
          QUnit.test(("nested component is recreated after item option " + optionRefreshAction.toString() + " changed  (T940715)"), function(assert) {
            registerComponent('dxWidget', Widget.inherit({}));
            var isDisposed = false;
            var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
              items: [{ratio: 1}],
              itemTemplate: function(data, index, element) {
                var $button = domAdapter.getDocument().createElement('div');
                new dxButton($button, {onDisposing: function() {
                    isDisposed = true;
                  }});
                $(element).append($button);
              }
            });
            var getButton = function() {
              return $responsiveBox.find('.dx-button').dxButton('instance');
            };
            var initialWidget = getButton();
            var responsiveBox = $responsiveBox.dxResponsiveBox('instance');
            optionRefreshAction(responsiveBox);
            assert.equal(isDisposed, true, 'disposed is called for old instance');
            assert.notEqual(initialWidget, getButton(), 'widget is new instance');
            assert.equal(responsiveBox._assistantRoots, undefined, 'there is no roots cache');
          });
          QUnit.test(("nested component in template should work after item option  " + optionRefreshAction.toString() + " changed (T940715)"), function(assert) {
            var expected = false;
            var responsiveBox = $('#responsiveBox').dxResponsiveBox({
              items: [{ratio: 1}],
              itemTemplate: function(data, index, element) {
                var $button = domAdapter.getDocument().createElement('div');
                new dxButton($button, {onClick: function() {
                    expected = true;
                  }});
                $(element).append($button);
              }
            }).dxResponsiveBox('instance');
            optionRefreshAction(responsiveBox);
            eventsEngine.trigger(responsiveBox.$element().find('.dx-button'), 'dxclick');
            assert.equal(expected, true, 'onClick event is processed');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","core/component_registrator","ui/widget/ui.widget","ui/responsive_box","../../helpers/responsiveBoxScreenMock.js","ui/button","ui/box","events/core/events_engine","core/dom_adapter","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("core/component_registrator"), require("ui/widget/ui.widget"), require("ui/responsive_box"), require("../../helpers/responsiveBoxScreenMock.js"), require("ui/button"), require("ui/box"), require("events/core/events_engine"), require("core/dom_adapter"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=responsiveBox.tests.js.map