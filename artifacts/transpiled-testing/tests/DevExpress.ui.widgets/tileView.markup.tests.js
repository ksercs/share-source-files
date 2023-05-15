!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tileView.markup.tests.js"], ["jquery","ui/tile_view","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tileView.markup.tests.js", ["jquery", "ui/tile_view", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      TILEVIEW_CLASS,
      TILEVIEW_ITEM_CLASS,
      TILEVIEW_ITEM_SELECTOR,
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
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="widget"></div>\
        <div id="widthRootStyle" style="width: 300px;"></div>';
        $('#qunit-fixture').html(markup);
      });
      TILEVIEW_CLASS = 'dx-tileview';
      TILEVIEW_ITEM_CLASS = 'dx-tile';
      TILEVIEW_ITEM_SELECTOR = '.' + TILEVIEW_ITEM_CLASS;
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
          return Math.round($el.get(0)['offset' + config[axis].position.charAt(0).toUpperCase() + config[axis].position.slice(1)]);
        };
      };
      QUnit.module('rendering', {
        beforeEach: function() {
          var $container = $('<div>').appendTo('body');
          this.$element = $('<div>').appendTo($container);
        },
        afterEach: function() {
          this.$element.parent().remove();
        }
      }, function() {
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
      });
      $.each(configs, function(direction, config) {
        var getPosition = getPositionCreator(config);
        QUnit.module('rendering ' + direction, {
          beforeEach: function() {
            var $container = $('<div>').appendTo('body');
            this.$element = $('<div>').appendTo($container);
          },
          afterEach: function() {
            this.$element.parent().remove();
          }
        }, function() {
          QUnit.test('items positions should be correct', function(assert) {
            var element = this.$element.dxTileView({
              direction: direction,
              height: 200,
              width: 200,
              items: prepareItems(items, config)
            });
            assert.ok(element.hasClass(TILEVIEW_CLASS));
            var $items = element.find(TILEVIEW_ITEM_SELECTOR);
            assert.equal($items.length, 10);
            assert.ok($items.eq(0).hasClass(TILEVIEW_ITEM_CLASS));
            assert.equal(getPosition($items.eq(0), 'main'), DEFAULT_ITEMMARGIN, 'item 1');
            assert.equal(getPosition($items.eq(0), 'cross'), DEFAULT_ITEMMARGIN, 'item 1');
            assert.equal(getPosition($items.eq(1), 'main'), DEFAULT_ITEMMARGIN, 'item 2');
            assert.equal(getPosition($items.eq(1), 'cross'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET, 'item 2');
            assert.equal(getPosition($items.eq(2), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 3, 'item 3');
            assert.equal(getPosition($items.eq(2), 'cross'), DEFAULT_ITEMMARGIN, 'item 3');
            assert.equal(getPosition($items.eq(3), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 5, 'item 4');
            assert.equal(getPosition($items.eq(3), 'cross'), DEFAULT_ITEMMARGIN, 'item 4');
            assert.equal(getPosition($items.eq(4), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 7, 'item 5');
            assert.equal(getPosition($items.eq(4), 'cross'), DEFAULT_ITEMMARGIN, 'item 5');
            assert.equal(getPosition($items.eq(5), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET * 9, 'item 6');
            assert.equal(getPosition($items.eq(5), 'cross'), DEFAULT_ITEMMARGIN, 'item 6');
            assert.equal(getPosition($items.eq(6), 'main'), DEFAULT_ITEMMARGIN + DEFAULT_ITEMOFFSET, 'item 7');
            assert.equal(getPosition($items.eq(6), 'cross'), DEFAULT_ITEMMARGIN, 'item 7');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/tile_view","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/tile_view"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tileView.markup.tests.js.map