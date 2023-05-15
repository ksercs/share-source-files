!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tileView.tests.js"], ["jquery","core/config","../../helpers/keyboardMock.js","data/data_source/data_source","core/utils/type","core/utils/common","ui/tile_view","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tileView.tests.js", ["jquery", "core/config", "../../helpers/keyboardMock.js", "data/data_source/data_source", "core/utils/type", "core/utils/common", "ui/tile_view", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      globalConfig,
      keyboardMock,
      DataSource,
      isRenderer,
      deferUpdate,
      TILEVIEW_CONTAINER_CLASS,
      TILEVIEW_ITEM_CLASS,
      TILEVIEW_ITEM_SELECTOR,
      SCROLLVIEW_CONTENT_CLASS,
      DEFAULT_ITEMSIZE,
      DEFAULT_ITEMMARGIN,
      DEFAULT_ITEMOFFSET,
      items,
      configs,
      prepareItems,
      getPositionCreator;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      globalConfig = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div id=\"widget\"></div>\n        <div id=\"widthRootStyle\"></div>";
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      TILEVIEW_CONTAINER_CLASS = 'dx-tileview-wrapper';
      TILEVIEW_ITEM_CLASS = 'dx-tile';
      TILEVIEW_ITEM_SELECTOR = '.' + TILEVIEW_ITEM_CLASS;
      SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
      DEFAULT_ITEMSIZE = 100;
      DEFAULT_ITEMMARGIN = 20;
      DEFAULT_ITEMOFFSET = DEFAULT_ITEMSIZE + DEFAULT_ITEMMARGIN;
      items = [{text: 'item1'}, {
        text: 'item2',
        mainRatio: 3
      }, {
        text: 'item3',
        mainRatio: 2,
        crossRatio: 2
      }, {
        text: 'item4',
        mainRatio: 2,
        crossRatio: 2
      }, {
        text: 'item5',
        mainRatio: 2,
        crossRatio: 2
      }, {
        text: 'item6',
        crossRatio: 2
      }, {
        text: 'item7',
        mainRatio: 2
      }, {
        text: 'item8',
        mainRatio: -3,
        crossRatio: -3
      }, {
        text: 'item9',
        mainRatio: 1.9,
        crossRatio: 1.9
      }, {
        text: 'item10',
        mainRatio: 2.1,
        crossRatio: 2.1
      }];
      configs = {
        'horizontal': {
          main: {
            position: 'left',
            ratio: 'widthRatio'
          },
          cross: {
            position: 'top',
            ratio: 'heightRatio'
          },
          scrollByProp: 'x'
        },
        'vertical': {
          main: {
            position: 'top',
            ratio: 'heightRatio'
          },
          cross: {
            position: 'left',
            ratio: 'widthRatio'
          },
          scrollByProp: 'y'
        }
      };
      prepareItems = function(items, config) {
        return $.map(items, function(item) {
          var ratios = {};
          ratios[config.main.ratio] = item.mainRatio;
          ratios[config.cross.ratio] = item.crossRatio;
          return $.extend(ratios, item);
        });
      };
      getPositionCreator = function(config) {
        return function($el, axis) {
          return Math.round($el.position()[config[axis].position]);
        };
      };
      $.each(configs, function(direction, config) {
        QUnit.module('rendering ' + direction, {
          beforeEach: function() {
            var $container = $('<div />').appendTo('body');
            this.$element = $('<div>').appendTo($container);
          },
          afterEach: function() {
            this.$element.parent().remove();
          }
        }, function() {
          QUnit.test('non standard item ratios should be handled correctly', function(assert) {
            var element = this.$element.dxTileView({
              height: 20,
              items: prepareItems(items, config),
              itemRender: function(item) {
                return 'Text is: ' + item.text;
              }
            });
            var $items = element.find(TILEVIEW_ITEM_SELECTOR);
            assert.ok($items.eq(7).width() === 0 && $items.eq(7).height() === 0, 'item 8 not displayed');
            assert.roughEqual($items.eq(8).outerHeight(), 220, 0.1, 'item 9');
            assert.roughEqual($items.eq(8).outerWidth(), 220, 0.1, 'item 9');
            assert.roughEqual($items.eq(9).outerHeight(), 220, 0.1, 'item 10');
            assert.roughEqual($items.eq(9).outerWidth(), 220, 0.1, 'item 10');
          });
        });
      });
      QUnit.module('rendering', {
        beforeEach: function() {
          var $container = $('<div>').appendTo('body');
          this.$element = $('<div>').appendTo($container);
        },
        afterEach: function() {
          this.$element.parent().remove();
        }
      }, function() {
        QUnit.test('Item collection changing should repaint widget (T686243)', function(assert) {
          var tileView = this.$element.dxTileView({items: prepareItems(items, configs.horizontal)}).dxTileView('instance');
          var getFirstItemElementHeight = function() {
            return tileView.$element().find(TILEVIEW_ITEM_SELECTOR).get(0).offsetHeight;
          };
          assert.strictEqual(getFirstItemElementHeight(), DEFAULT_ITEMSIZE);
          tileView.option('items[0].heightRatio', 2);
          assert.strictEqual(getFirstItemElementHeight(), DEFAULT_ITEMSIZE * 2 + DEFAULT_ITEMMARGIN);
        });
        QUnit.test('template should be rendered correctly', function(assert) {
          var element = this.$element.dxTileView({
            items: prepareItems(items, configs.horizontal),
            itemTemplate: function(item) {
              return 'Text is: ' + item.text;
            }
          });
          var $items = element.find(TILEVIEW_ITEM_SELECTOR);
          assert.equal($items.eq(0).text(), 'Text is: item1');
        });
        QUnit.test('tiles should not be collapsed if widget rendered in disabled state (T184853)', function(assert) {
          this.$element.dxTileView({
            items: prepareItems(items, configs.horizontal),
            disabled: true
          });
          var $tiles = this.$element.find('.dx-tile');
          var firstTileOffset = $tiles.eq(0).offset();
          var tilesImposed = false;
          for (var i = 1,
              n = $tiles.length; i < n; i++) {
            var offset = $tiles.eq(i).offset();
            if (offset.left === firstTileOffset.left && offset.top === firstTileOffset.top) {
              tilesImposed = true;
              break;
            }
          }
          assert.ok(!tilesImposed, 'tiles are not imposed');
        });
        QUnit.test('rendering horizontal in RTL mode', function(assert) {
          var config = configs.horizontal;
          var getPosition = getPositionCreator(config);
          var element = this.$element.dxTileView({
            height: 200,
            direction: 'horizontal',
            items: prepareItems(items, config),
            rtlEnabled: true
          });
          var $items = element.find(TILEVIEW_ITEM_SELECTOR);
          var width = element.find('.' + TILEVIEW_CONTAINER_CLASS).width();
          assert.equal(getPosition($items.eq(0), 'main'), width - DEFAULT_ITEMOFFSET, 'item 1');
          assert.equal(getPosition($items.eq(0), 'cross'), DEFAULT_ITEMMARGIN, 'item 1');
          assert.equal(getPosition($items.eq(1), 'main'), width - DEFAULT_ITEMOFFSET * 3, 'item 2');
          assert.equal(getPosition($items.eq(1), 'cross'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET, 'item 2');
          assert.equal(getPosition($items.eq(2), 'main'), width - DEFAULT_ITEMOFFSET * 5, 'item 3');
          assert.equal(getPosition($items.eq(2), 'cross'), DEFAULT_ITEMMARGIN, 'item 3');
          assert.equal(getPosition($items.eq(3), 'main'), width - DEFAULT_ITEMOFFSET * 7, 'item 4');
          assert.equal(getPosition($items.eq(3), 'cross'), DEFAULT_ITEMMARGIN, 'item 4');
          assert.equal(getPosition($items.eq(4), 'main'), width - DEFAULT_ITEMOFFSET * 9, 'item 5');
          assert.equal(getPosition($items.eq(4), 'cross'), DEFAULT_ITEMMARGIN, 'item 5');
          assert.equal(getPosition($items.eq(5), 'main'), width - DEFAULT_ITEMOFFSET * 10, 'item 6');
          assert.equal(getPosition($items.eq(5), 'cross'), DEFAULT_ITEMMARGIN, 'item 6');
          assert.equal(getPosition($items.eq(6), 'main'), width - DEFAULT_ITEMOFFSET * 3, 'item 7');
          assert.equal(getPosition($items.eq(6), 'cross'), DEFAULT_ITEMMARGIN, 'item 7');
        });
        QUnit.test('rendering vertical in RTL mode', function(assert) {
          var config = configs.vertical;
          var getPosition = getPositionCreator(config);
          var element = this.$element.dxTileView({
            width: 200,
            direction: 'vertical',
            items: prepareItems(items, config),
            rtlEnabled: true
          });
          var $items = element.find(TILEVIEW_ITEM_SELECTOR);
          var width = element.find('.' + TILEVIEW_CONTAINER_CLASS).width();
          assert.equal(getPosition($items.eq(0), 'main'), DEFAULT_ITEMMARGIN, 'item 1');
          assert.equal(getPosition($items.eq(0), 'cross'), width - DEFAULT_ITEMOFFSET, 'item 1');
          assert.equal(getPosition($items.eq(1), 'main'), DEFAULT_ITEMMARGIN, 'item 2');
          assert.equal(getPosition($items.eq(1), 'cross'), width - DEFAULT_ITEMOFFSET * 2, 'item 2');
          assert.equal(getPosition($items.eq(2), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 3, 'item 3');
          assert.equal(getPosition($items.eq(2), 'cross'), width - DEFAULT_ITEMOFFSET * 2, 'item 3');
          assert.equal(getPosition($items.eq(3), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 5, 'item 4');
          assert.equal(getPosition($items.eq(3), 'cross'), width - DEFAULT_ITEMOFFSET * 2, 'item 4');
          assert.equal(getPosition($items.eq(4), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 7, 'item 5');
          assert.equal(getPosition($items.eq(4), 'cross'), width - DEFAULT_ITEMOFFSET * 2, 'item 5');
          assert.equal(getPosition($items.eq(5), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 9, 'item 6');
          assert.equal(getPosition($items.eq(5), 'cross'), width - DEFAULT_ITEMOFFSET * 2, 'item 6');
          assert.equal(getPosition($items.eq(6), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET, 'item 7');
          assert.equal(getPosition($items.eq(6), 'cross'), width - DEFAULT_ITEMOFFSET, 'item 7');
        });
        QUnit.test('Tiles should have the correct dimensions after rendered as a part of react template', function(assert) {
          var $__4 = this;
          deferUpdate(function() {
            $__4.$element.dxTileView({items: [{text: 'test 1'}]});
          });
          var $tile = this.$element.find(("." + TILEVIEW_ITEM_CLASS));
          assert.strictEqual($tile.outerHeight(), DEFAULT_ITEMSIZE, 'Tile height updated correctly');
          assert.strictEqual($tile.outerWidth(), DEFAULT_ITEMSIZE, 'Tile width updated correctly');
        });
      });
      $.each(configs, function(direction, config) {
        QUnit.module('API ' + direction, {
          beforeEach: function() {
            var $container = $('<div>').appendTo('body');
            this.$element = $('<div>').appendTo($container);
          },
          afterEach: function() {
            this.$element.parent().remove();
          }
        }, function() {
          QUnit.test('getting scroll position', function(assert) {
            var $element = this.$element.dxTileView({
              items: prepareItems(items, config),
              direction: direction,
              height: 100,
              width: 100
            });
            var instance = $element.dxTileView('instance');
            var scrollView = $element.dxScrollView('instance');
            var scrollPosition = {};
            assert.equal(instance.scrollPosition(), 0, 'default scroll position');
            scrollPosition[config.scrollByProp] = 30;
            scrollView.scrollBy(scrollPosition);
            assert.equal(instance.scrollPosition(), 30, 'scrolling to forward');
            scrollPosition[config.scrollByProp] = -10;
            scrollView.scrollBy(scrollPosition);
            assert.equal(instance.scrollPosition(), 20, 'scrolling to backward');
          });
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('default', function(assert) {
          var $element = $('#widget').dxTileView({items: prepareItems(items, configs.horizontal)});
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxTileView({
            items: prepareItems(items, configs.horizontal),
            width: 400
          });
          var instance = $element.dxTileView('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element.outerWidth(), 400, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxTileView({items: prepareItems(items, configs.horizontal)});
          var instance = $element.dxTileView('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element.outerWidth(), 300, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxTileView({items: prepareItems(items, configs.horizontal)});
          var instance = $element.dxTileView('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('scrollable content has the correct width if it is larger than the widget', function(assert) {
          var customWidth = 500;
          var $element = $('#widget').dxTileView({
            items: prepareItems(items, configs.horizontal),
            height: 300,
            width: customWidth
          });
          assert.ok($element.find(("." + SCROLLVIEW_CONTENT_CLASS)).width() > customWidth + 1);
        });
        QUnit.test('scrollable content has the correct width if it is less than the widget (T860587)', function(assert) {
          var customWidth = 1500;
          var $element = $('#widget').dxTileView({
            items: prepareItems(items, configs.horizontal),
            height: 600,
            width: customWidth,
            rtlEnabled: true
          });
          assert.roughEqual($element.find(("." + SCROLLVIEW_CONTENT_CLASS)).width(), customWidth, 1);
        });
        QUnit.test('scrollable content height is recalculated if the element was resized and the widget has vertical direction (T934021)', function(assert) {
          var $element = $('#widget').dxTileView({
            direction: 'vertical',
            items: prepareItems(items, configs.vertical),
            height: 300,
            width: 240
          });
          var instance = $element.dxTileView('instance');
          var startContentHeight = $element.find(("." + SCROLLVIEW_CONTENT_CLASS)).height();
          instance.option('width', 900);
          assert.ok($element.find(("." + SCROLLVIEW_CONTENT_CLASS)).height() < startContentHeight / 2);
        });
        QUnit.test('scrollable content height is recalculated if the element was resized and the widget has horizontal direction (T934021)', function(assert) {
          var $element = $('#widget').dxTileView({
            items: prepareItems(items, configs.horizontal),
            height: 240,
            width: 300
          });
          var instance = $element.dxTileView('instance');
          var startContentWidth = $element.find(("." + SCROLLVIEW_CONTENT_CLASS)).width();
          instance.option('height', 900);
          assert.ok($element.find(("." + SCROLLVIEW_CONTENT_CLASS)).width() < startContentWidth / 2);
        });
      });
      QUnit.module('integration with dataSource', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('process indication during dataSource loading', function(assert) {
          var dataSourceLoadTime = 100;
          var dataSource = new DataSource({load: function() {
              var deferred = $.Deferred();
              setTimeout(function() {
                deferred.resolve([]);
              }, dataSourceLoadTime);
              return deferred.promise();
            }});
          var element = $('<div>').appendTo('#qunit-fixture').dxTileView({dataSource: dataSource});
          var loadPanel = element.find('.dx-scrollview-loadpanel').eq(0).dxLoadPanel('instance');
          this.clock.tick(dataSourceLoadTime);
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
          dataSource.load();
          assert.equal(loadPanel.option('visible'), true, 'load panel shown');
          this.clock.tick(dataSourceLoadTime);
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
        });
        QUnit.test('timeview doesn\'t show load panel during dataSource loading when indicateLoading = false', function(assert) {
          var dataSourceLoadTime = 100;
          var dataSource = new DataSource({load: function() {
              var deferred = $.Deferred();
              setTimeout(function() {
                deferred.resolve([]);
              }, dataSourceLoadTime);
              return deferred.promise();
            }});
          var element = $('<div>').appendTo('#qunit-fixture').dxTileView({
            dataSource: dataSource,
            indicateLoading: false
          });
          var loadPanel = element.find('.dx-scrollview-loadpanel').eq(0).dxLoadPanel('instance');
          dataSource.load();
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
        });
        QUnit.test('setting indicateLoading to false hides load panel at once', function(assert) {
          var dataSourceLoadTime = 100;
          var dataSource = new DataSource({load: function() {
              var deferred = $.Deferred();
              setTimeout(function() {
                deferred.resolve([]);
              }, dataSourceLoadTime);
              return deferred.promise();
            }});
          var element = $('<div>').appendTo('#qunit-fixture').dxTileView({
            dataSource: dataSource,
            indicateLoading: false
          });
          var loadPanel = element.find('.dx-scrollview-loadpanel').eq(0).dxLoadPanel('instance');
          dataSource.load();
          setTimeout(function() {
            element.dxTileView('option', 'indicateLoading', false);
          }, dataSourceLoadTime / 2);
          this.clock.tick(dataSourceLoadTime / 2);
          assert.equal(loadPanel.option('visible'), false, 'load panel hidden');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          this.$element = $('#widget').dxTileView({
            height: 500,
            items: prepareItems(items, configs.horizontal),
            focusStateEnabled: true
          }), this.keyboard = keyboardMock(this.$element);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('useKeyboard is must be false by default', function(assert) {
          var instance = this.$element.dxTileView().dxTileView('instance');
          var scrollView = this.$element.dxScrollView('instance');
          instance.option('useKeyboard', false);
          assert.ok(!scrollView.option('useKeyboard'), 'useKeyboard is false in scrollview');
        });
        QUnit.test('home move focus to first element', function(assert) {
          var $element = this.$element;
          var keyboard = this.keyboard;
          $element.find(TILEVIEW_ITEM_SELECTOR).eq(5).trigger('dxpointerup');
          this.clock.tick(10);
          keyboard.keyDown('home');
          assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).first().hasClass('dx-state-focused'), 'first element obtained dx-state-focused after press home');
        }), QUnit.test('end move focus to last element', function(assert) {
          var $element = this.$element;
          var keyboard = this.keyboard;
          $element.find(TILEVIEW_ITEM_SELECTOR).eq(5).trigger('dxpointerup');
          this.clock.tick(10);
          keyboard.keyDown('end');
          assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).last().hasClass('dx-state-focused'), 'last element obtained dx-state-focused after press end');
        });
      });
      $.each(configs, function(direction, config) {
        QUnit.module('keyboard navigation ' + direction, {
          beforeEach: function() {
            this.$element = $('#widget').dxTileView({
              height: 500,
              width: 500,
              direction: direction,
              items: prepareItems(items, config),
              focusStateEnabled: true
            }), this.keyboard = keyboardMock(this.$element);
            this.clock = sinon.useFakeTimers();
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          QUnit.test('right arrow move focus to right element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 1,
                end: 4
              },
              'vertical': {
                start: 1,
                end: 2
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            var instance = $('#widget').dxTileView('instance');
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('right');
            assert.equal(isRenderer(instance.option('focusedElement')), !!globalConfig().useJQuery, 'focusedElement is correct');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'right element obtained dx-state-focused after press right arrow');
          });
          QUnit.test('left arrow move focus to left element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 4,
                end: 6
              },
              'vertical': {
                start: 3,
                end: 1
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('left');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'left element obtained dx-state-focused after press left arrow');
          });
          QUnit.test('down arrow move focus to down element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 4,
                end: 3
              },
              'vertical': {
                start: 3,
                end: 5
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('down');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'down element obtained dx-state-focused after press down arrow');
          });
          QUnit.test('pageDown move focus to down element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 4,
                end: 3
              },
              'vertical': {
                start: 3,
                end: 5
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('pageDown');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'pageDown element obtained dx-state-focused after press pageDown arrow');
          });
          QUnit.test('up arrow move focus to up element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 5,
                end: 4
              },
              'vertical': {
                start: 3,
                end: 2
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('up');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'up element obtained dx-state-focused after press up arrow');
          });
          QUnit.test('pageUp move focus to up element', function(assert) {
            var testConfig = ({
              'horizontal': {
                start: 5,
                end: 4
              },
              'vertical': {
                start: 3,
                end: 2
              }
            })[direction];
            var $element = this.$element;
            var keyboard = this.keyboard;
            $element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.start).trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown('pageUp');
            assert.ok($element.find(TILEVIEW_ITEM_SELECTOR).eq(testConfig.end).hasClass('dx-state-focused'), 'up element obtained dx-state-focused after press pageUp');
          });
          QUnit.test('scroll to item on arrows', function(assert) {
            var testConfig = ({
              'horizontal': {
                forward: 'right',
                backward: 'left'
              },
              'vertical': {
                forward: 'down',
                backward: 'up'
              }
            })[direction];
            var $element = $('#widget').dxTileView({
              height: 300,
              width: 300,
              items: prepareItems(items, config),
              focusStateEnabled: true
            });
            var instance = $element.dxTileView('instance');
            var keyboard = keyboardMock($element);
            assert.equal(instance.scrollPosition(), 0, 'scrollPosition equal zero on init');
            $element.find(TILEVIEW_ITEM_SELECTOR).first().trigger('dxpointerup');
            this.clock.tick(10);
            keyboard.keyDown(testConfig.forward);
            assert.equal(instance.scrollPosition(), 80, 'scrollPosition equal 80 after press forward arrow (item num 7)');
            keyboard.keyDown(testConfig.forward);
            assert.equal(instance.scrollPosition(), 320, 'scrollPosition equal 320 after press forward arrow in second time (item num 3)');
            keyboard.keyDown(testConfig.backward);
            assert.equal(instance.scrollPosition(), 120, 'scrollPosition equal 120 after press backward arrow (item num 7)');
            keyboard.keyDown(testConfig.backward);
            assert.equal(instance.scrollPosition(), 0, 'scrollPosition equal 0 after press backward arrow in second time (item num 1)');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","../../helpers/keyboardMock.js","data/data_source/data_source","core/utils/type","core/utils/common","ui/tile_view","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("../../helpers/keyboardMock.js"), require("data/data_source/data_source"), require("core/utils/type"), require("core/utils/common"), require("ui/tile_view"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tileView.tests.js.map