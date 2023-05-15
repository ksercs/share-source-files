!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/responsiveBox.markup.tests.js"], ["jquery","ui/widget/ui.errors","core/component_registrator","ui/widget/ui.widget","../../helpers/responsiveBoxScreenMock.js","ui/box","ui/responsive_box","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/responsiveBox.markup.tests.js", ["jquery", "ui/widget/ui.errors", "core/component_registrator", "ui/widget/ui.widget", "../../helpers/responsiveBoxScreenMock.js", "ui/box", "ui/responsive_box", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      errors,
      registerComponent,
      Widget,
      responsiveBoxScreenMock,
      BOX_CLASS,
      BOX_ITEM_CLASS,
      RESPONSIVE_BOX_CLASS,
      SCREEN_SIZE_CLASS_PREFIX,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      Widget = $__m.default;
    }, function($__m) {
      responsiveBoxScreenMock = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
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
      RESPONSIVE_BOX_CLASS = 'dx-responsivebox';
      SCREEN_SIZE_CLASS_PREFIX = RESPONSIVE_BOX_CLASS + '-screen-';
      moduleConfig = {
        beforeEach: function() {
          responsiveBoxScreenMock.setup.call(this);
        },
        afterEach: function() {
          responsiveBoxScreenMock.teardown.call(this);
        }
      };
      QUnit.module('render', moduleConfig, function() {
        QUnit.test('render', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({items: [{text: 1}, {text: 2}]});
          assert.ok($responsiveBox.hasClass(RESPONSIVE_BOX_CLASS), 'necessary class attached');
          var $items = $responsiveBox.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.length, 2, 'items rendered when rows and columns are not defined (using single column layout)');
        });
        QUnit.test('empty widget shouldn\'t raise exception on resize (T259132)', function(assert) {
          assert.expect(0);
          $('#responsiveBox').dxResponsiveBox({});
          this.updateScreenSize();
        });
      });
      QUnit.module('layouting', moduleConfig, function() {
        QUnit.test('grid without items', function(assert) {
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
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: rows,
            cols: cols,
            width: width,
            height: height
          });
          var $rowBox = $responsiveBox.find('.' + BOX_CLASS).eq(0);
          assert.equal($rowBox.dxBox('option', 'direction'), 'col', 'rowBox wraps inner content');
          var $columnBoxes = $rowBox.find('.' + BOX_CLASS);
          var columnBoxFirst = $columnBoxes.eq(0).dxBox('instance');
          var columnBoxSecond = $columnBoxes.eq(1).dxBox('instance');
          assert.equal($columnBoxes.length, 2, 'two row boxes');
          assert.equal(columnBoxFirst.option('direction'), 'row');
          assert.equal(columnBoxSecond.option('direction'), 'row');
          assert.equal(columnBoxFirst.option('items').length, 2);
          assert.equal(columnBoxSecond.option('items').length, 2);
        });
        QUnit.test('grid with items', function(assert) {
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
          var $rootBox = $boxes.eq(0);
          assert.equal($rootBox.text(), 'item11item12item21item22', 'items rendered correctly');
        });
        QUnit.test('grid with factors', function(assert) {
          this.updateScreenSize(500);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {screen: 'sm md lg'}, {screen: 'md lg'}, {screen: 'lg'}],
            cols: [{}, {screen: 'sm md lg'}, {screen: 'md lg'}, {screen: 'lg'}],
            items: [{
              location: {
                row: 0,
                col: 0,
                screen: 'lg'
              },
              text: 'item(0,0)-lg'
            }, {
              location: {
                row: 0,
                col: 0,
                screen: 'md'
              },
              text: 'item(0,0)-md'
            }, {
              location: {
                row: 0,
                col: 0,
                screen: 'sm'
              },
              text: 'item(0,0)-sm'
            }, {
              location: {
                row: 0,
                col: 0,
                screen: 'xs'
              },
              text: 'item(0,0)-xs'
            }, {
              location: {
                row: 0,
                col: 1
              },
              text: ' item(0,1)'
            }, {
              location: {
                row: 0,
                col: 2
              },
              text: ' item(0,2)'
            }, {
              location: {
                row: 0,
                col: 3
              },
              text: ' item(0,3)'
            }, {
              location: {
                row: 1,
                col: 0
              },
              text: ' item(1,0)'
            }, {
              location: {
                row: 1,
                col: 1
              },
              text: ' item(1,1)'
            }, {
              location: {
                row: 1,
                col: 2
              },
              text: ' item(1,2)'
            }, {
              location: {
                row: 1,
                col: 3
              },
              text: ' item(1,3)'
            }, {
              location: {
                row: 2,
                col: 0
              },
              text: ' item(2,0)'
            }, {
              location: {
                row: 2,
                col: 1
              },
              text: ' item(2,1)'
            }, {
              location: {
                row: 2,
                col: 2
              },
              text: ' item(2,2)'
            }, {
              location: {
                row: 2,
                col: 3
              },
              text: ' item(2,3)'
            }, {
              location: {
                row: 3,
                col: 0
              },
              text: ' item(3,0)'
            }, {
              location: {
                row: 3,
                col: 1
              },
              text: ' item(3,1)'
            }, {
              location: {
                row: 3,
                col: 2
              },
              text: ' item(3,2)'
            }, {
              location: {
                row: 3,
                col: 3
              },
              text: ' item(3,3)'
            }]
          });
          var xsExpectedText = 'item(0,0)-xs';
          var smallExpectedText = 'item(0,0)-sm item(0,1) item(1,0) item(1,1)';
          var mediumExpectedText = 'item(0,0)-md item(0,1) item(0,2) item(1,0) item(1,1) item(1,2) item(2,0) item(2,1) item(2,2)';
          var lgExpectedText = 'item(0,0)-lg item(0,1) item(0,2) item(0,3) item(1,0) item(1,1) item(1,2) item(1,3) item(2,0) item(2,1) item(2,2) item(2,3) item(3,0) item(3,1) item(3,2) item(3,3)';
          assert.equal($responsiveBox.text(), xsExpectedText);
          this.updateScreenSize(800);
          assert.equal($responsiveBox.text(), smallExpectedText);
          this.updateScreenSize(1000);
          assert.equal($responsiveBox.text(), mediumExpectedText);
          this.updateScreenSize(1500);
          assert.equal($responsiveBox.text(), lgExpectedText);
        });
        QUnit.test('colspan', function(assert) {
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
          assert.equal($boxItems.length, 2, 'two items were rendered');
        });
        QUnit.test('rowspan', function(assert) {
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
          assert.equal($boxItems.length, 2, 'two items were rendered');
        });
        QUnit.test('repaint should not detach items', function(assert) {
          assert.expect(0);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: 'test'
            }]
          });
          var $childrenResponsiveBox;
          try {
            var $dxItem = $responsiveBox.find('.' + BOX_ITEM_CLASS).first().children();
            $childrenResponsiveBox = $('<div>').dxResponsiveBox({onDisposing: function() {
                assert.ok(false, 'widget disposed');
              }}).appendTo($dxItem);
            $responsiveBox.dxResponsiveBox('repaint');
          } finally {
            $childrenResponsiveBox.dxResponsiveBox('option', 'onDisposing', null);
          }
        });
        QUnit.test('recalculation on size changing', function(assert) {
          var $responsiveBox = $('#responsiveBox');
          this.setScreenSize(500);
          $responsiveBox.dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                screen: 'sm',
                row: 0,
                col: 0
              },
              text: 'sm'
            }, {
              location: {
                screen: 'xs',
                row: 0,
                col: 0
              },
              text: 'xs'
            }, {
              location: {
                screen: 'md',
                row: 0,
                col: 0
              },
              text: 'md'
            }]
          });
          var responsiveBox = $responsiveBox.dxResponsiveBox('instance');
          this.setScreenSize(1000);
          responsiveBox.repaint();
          assert.equal($.trim($responsiveBox.text()), 'md', 'md item apply');
        });
        QUnit.test('singleColumnScreen render items in one column', function(assert) {
          this.updateScreenSize(500);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {}],
            cols: [{}, {}],
            singleColumnScreen: 'xs',
            items: [{
              location: {
                row: 0,
                col: 0,
                rowspan: 2
              },
              text: '1'
            }, {
              location: {
                row: 1,
                col: 1,
                colspan: 2
              },
              text: '4'
            }, {
              location: {
                row: 0,
                col: 1,
                screen: 'sm md lg'
              },
              text: '2'
            }, {
              location: {
                row: 1,
                col: 0,
                screen: 'xs sm'
              },
              text: '3'
            }]
          });
          var responsiveBox = $responsiveBox.dxResponsiveBox('instance');
          var checkLayoutByScreen = $.proxy(function(screenWidth, expectedText) {
            this.updateScreenSize(screenWidth);
            var $box = $responsiveBox.find('.' + BOX_CLASS);
            assert.equal($box.length, 1, 'one box rendered');
            var $items = $box.find('.' + BOX_ITEM_CLASS);
            assert.equal($items.length, expectedText.length, $items.length + ' items rendered');
            assert.equal($.trim($responsiveBox.text()), expectedText, 'rendered only needed items');
          }, this);
          checkLayoutByScreen(500, '134');
          responsiveBox.option('singleColumnScreen', 'xs sm');
          checkLayoutByScreen(800, '1234');
        });
        QUnit.test('too complex layout', function(assert) {
          assert.throws(function() {
            var size = 900;
            $('#responsiveBox').dxResponsiveBox({
              rows: [{ratio: 1}, {ratio: 1}, {ratio: 1}, {ratio: 1}],
              cols: [{ratio: 1}, {ratio: 1}, {ratio: 1}, {ratio: 1}],
              items: [{
                location: {
                  row: 0,
                  col: 0,
                  colspan: 3
                },
                html: '<div class=\'div_0_0\'/>'
              }, {
                location: {
                  row: 1,
                  col: 0,
                  rowspan: 3
                },
                html: '<div class=\'div_1_0\'/>'
              }, {
                location: {
                  row: 1,
                  col: 1,
                  rowspan: 2,
                  colspan: 2
                },
                html: '<div class=\'div_1_1\'/>'
              }, {
                location: {
                  row: 0,
                  col: 3,
                  rowspan: 3
                },
                html: '<div class=\'div_0_3\'/>'
              }, {
                location: {
                  row: 3,
                  col: 1,
                  colspan: 3
                },
                html: '<div class=\'div_3_1\'/>'
              }],
              width: size,
              height: size
            });
          }, errors.Error('E1025'), 'raised error E1025');
        });
        QUnit.test('Box should has a class appropriate a screen resolution', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            width: 'auto',
            height: 'auto'
          });
          this.updateScreenSize(600);
          assert.ok($responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'xs'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'sm'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'md'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'lg'));
          this.updateScreenSize(800);
          assert.ok($responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'sm'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'xs'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'md'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'lg'));
          this.updateScreenSize(1000);
          assert.ok($responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'md'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'xs'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'sm'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'lg'));
          this.updateScreenSize(1300);
          assert.ok($responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'lg'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'xs'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'sm'));
          assert.ok(!$responsiveBox.hasClass(SCREEN_SIZE_CLASS_PREFIX + 'md'));
        });
        QUnit.test('Set the shrink option of row to box', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{
              ratio: 1,
              shrink: 0
            }, {ratio: 1}],
            cols: [{ratio: 1}],
            items: [{location: {
                row: 0,
                col: 0
              }}, {location: {
                row: 1,
                col: 0
              }}]
          });
          var $items = $responsiveBox.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.eq(0).css('flex-shrink'), 0, 'flex-shrink style for first row');
          assert.equal($items.eq(1).css('flex-shrink'), 1, 'flex-shrink style for second row');
        });
        QUnit.test('Set the shrink option of column to box', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{ratio: 1}],
            cols: [{ratio: 1}, {
              ratio: 1,
              shrink: 0
            }],
            items: [{location: {
                row: 0,
                col: 0
              }}, {location: {
                row: 0,
                col: 1
              }}]
          });
          var $items = $responsiveBox.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.eq(1).css('flex-shrink'), 1, 'flex-shrink style for first column');
          assert.equal($items.eq(2).css('flex-shrink'), 0, 'flex-shrink style for second column');
        });
        QUnit.test('Set the shrink option of row to box when the singleColumnMode is applied', function(assert) {
          this.updateScreenSize(500);
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{
              shrink: 0,
              screen: 'xs'
            }, {screen: 'xs'}, {}],
            cols: [{}, {}],
            singleColumnScreen: 'xs',
            items: [{location: {
                row: 0,
                col: 0
              }}, {location: {
                row: 1,
                col: 0
              }}, {location: {
                row: 0,
                col: 0
              }}]
          });
          var $items = $responsiveBox.find(("." + BOX_ITEM_CLASS));
          assert.equal($items.eq(0).css('flex-shrink'), 0, 'flex-shrink is applied for first row');
          assert.equal($items.eq(1).css('flex-shrink'), 1, 'flex-shrink is applied for second row');
          assert.equal($items.eq(2).css('flex-shrink'), 1, 'flex-shrink is applied for third row');
        });
      });
      QUnit.module('behavior', function() {
        QUnit.test('update does not rerender items', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{
              location: {
                col: 0,
                row: 0
              },
              html: '<div class=\'test\'>'
            }]
          });
          var $div = $responsiveBox.find('.test');
          $responsiveBox.dxResponsiveBox('repaint');
          assert.equal($responsiveBox.find('.test').get(0), $div.get(0), 'item was not rerendered');
        });
      });
      QUnit.module('templates', function() {
        QUnit.test('custom item templates', function(assert) {
          var $responsiveBox = $('#responsiveBoxWithTemplate').dxResponsiveBox({
            rows: [{}],
            cols: [{}]
          });
          assert.equal($.trim($responsiveBox.text()), 'test', 'item template rendered');
        });
        QUnit.test('custom item renderer', function(assert) {
          var templateContext;
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            itemTemplate: function() {
              templateContext = this.NAME;
              return $('<div>test</div>');
            },
            items: [{location: {
                row: 0,
                col: 0
              }}]
          });
          assert.equal(templateContext, 'dxResponsiveBox', 'Correct context');
          assert.equal($.trim($responsiveBox.text()), 'test', 'item rendered');
        });
      });
      QUnit.module('template rendering', moduleConfig, function() {
        QUnit.test('template rendered when it set after creation', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}],
            items: [{location: {
                row: 0,
                col: 0,
                text: 'before rendering'
              }}]
          });
          $responsiveBox.dxResponsiveBox('option', 'itemTemplate', function() {
            return $('<div>').text('after rendering');
          });
          assert.equal($.trim($responsiveBox.text()), 'after rendering', 'item template was rendered');
        });
        QUnit.test('widget rendered correctly after rows option was changed', function(assert) {
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
          $responsiveBox.dxResponsiveBox('option', 'rows', [{}]);
          assert.ok($responsiveBox.find('.dx-item .dx-widget').dxWidget('instance'), 'widget is created');
        });
      });
      QUnit.module('collision', moduleConfig, function() {
        QUnit.test('item located at the same cell of another item', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {}],
            cols: [{}, {}],
            items: [{
              location: {
                row: 0,
                col: 0
              },
              text: '0'
            }, {
              location: {
                row: 0,
                col: 0
              },
              text: '1'
            }, {
              location: {
                row: 1,
                col: 1
              },
              text: '2'
            }, {
              location: {
                row: 1,
                col: 1
              },
              text: '3'
            }]
          });
          assert.equal($.trim($responsiveBox.text()), '02', 'the former item rendered');
        });
        QUnit.test('item located at spanning cell', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}],
            cols: [{}, {}],
            items: [{
              location: {
                row: 0,
                col: 0,
                colspan: 2
              },
              text: '0'
            }, {
              location: {
                row: 0,
                col: 1
              },
              text: '1'
            }]
          });
          assert.equal($.trim($responsiveBox.text()), '0', 'the former item rendered');
        });
        QUnit.test('item spanning located at spanning of another item', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {}],
            cols: [{}, {}],
            items: [{
              location: {
                row: 0,
                col: 1,
                rowspan: 2
              },
              text: '0'
            }, {
              location: {
                row: 1,
                col: 0,
                colspan: 2
              },
              text: '1'
            }]
          });
          assert.equal($.trim($responsiveBox.text()), '0', 'the former item rendered');
        });
        QUnit.test('item spanning out of bounds', function(assert) {
          var $responsiveBox = $('#responsiveBox').dxResponsiveBox({
            rows: [{}, {}],
            cols: [{}],
            items: [{
              location: {
                row: 0,
                col: 0,
                colspan: 2
              },
              text: '0'
            }, {
              location: {
                row: 1,
                col: 0,
                rowspan: 2
              },
              text: '1'
            }]
          });
          assert.equal($.trim($responsiveBox.text()), '01', 'the former item rendered');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/widget/ui.errors","core/component_registrator","ui/widget/ui.widget","../../helpers/responsiveBoxScreenMock.js","ui/box","ui/responsive_box","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/widget/ui.errors"), require("core/component_registrator"), require("ui/widget/ui.widget"), require("../../helpers/responsiveBoxScreenMock.js"), require("ui/box"), require("ui/responsive_box"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=responsiveBox.markup.tests.js.map