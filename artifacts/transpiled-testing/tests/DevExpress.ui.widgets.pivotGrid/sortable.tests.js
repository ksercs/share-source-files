!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.pivotGrid/sortable.tests.js"], ["jquery","core/utils/size","generic_light.css!","__internal/grids/pivot_grid/sortable/module","ui/scroll_view/ui.scrollable","../../helpers/pointerMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.pivotGrid/sortable.tests.js", ["jquery", "core/utils/size", "generic_light.css!", "__internal/grids/pivot_grid/sortable/module", "ui/scroll_view/ui.scrollable", "../../helpers/pointerMock.js"], function($__export) {
  "use strict";
  var $,
      getWidth,
      getHeight,
      pointerMock,
      HORIZONTAL_WIDTH_LARGE,
      HORIZONTAL_WIDTH_SMALL;
  function createHorizontalMarkUp(width, addItems, createTable) {
    $('#sortable').css('width', width);
    if (addItems) {
      $('<div>').addClass('test-item').text('5').appendTo('.test-container');
      $('<div>').addClass('test-item').text('6').appendTo('.test-container');
    }
    $.each($('#sortable').find('.test-item'), function(_, item) {
      $(item).css('display', 'inline-block');
      if (!createTable) {
        return;
      }
      var td = $('<span>').appendTo('.test-container');
      $(item).appendTo(td);
    });
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      pointerMock = $__m.default;
    }],
    execute: function() {
      HORIZONTAL_WIDTH_LARGE = 1500;
      HORIZONTAL_WIDTH_SMALL = 900;
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            .test-item {\n                border: 1px solid black;\n                height: 10px;\n                width: 200px;\n            }\n            .test-container {\n                border: 1px solid black;\n            }\n            .hidden-source {\n                display: none;\n            }\n            .group {\n                border: 1px solid red;\n            }\n            .horizontal .test-item {\n                display: inline-block;\n            }\n            #qunit-fixture, :scope .shadow-container {\n                left: 0;\n                top: 0;\n            }\n            #sortable {\n                height: 300px;\n                width: 300px;\n            }\n            #swatchSortable {\n                height: 300px;\n                width: 300px;\n            }\n        </style>\n        <div id=\"sortable\" class=\"test-items\">\n            <div class=\"test-container\">\n                <div class=\"test-item\">1</div>\n                <div class=\"test-item\">2</div>\n                <div class=\"test-item\">3</div>\n                <div class=\"test-item\">4</div>\n            </div>\n        </div>\n\n        <div class=\"dx-swatch-1\">\n            <div id=\"swatchSortable\" class=\"test-items\">\n                <div class=\"test-container\">\n                    <div class=\"test-item\">1</div>\n                    <div class=\"test-item\">2</div>\n                    <div class=\"test-item\">3</div>\n                    <div class=\"test-item\">4</div>\n                </div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('sortable without containers', function() {
        QUnit.test('sortable render without parameters', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({});
          assert.ok($sortable.hasClass('dx-sortable-old'), 'dx-sortable-old class attached');
        });
        QUnit.test('vertical dragging', function(assert) {
          var changedArgs;
          var draggingArgs = [];
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onDragging: function(e) {
              draggingArgs.push(e);
            },
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '1', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.equal(draggingArgs.length, 2, 'fired two times');
          assert.strictEqual(draggingArgs[0].sourceIndex, 0, 'source index');
          assert.strictEqual(draggingArgs[0].targetIndex, -1, 'target index');
          assert.strictEqual(draggingArgs[1].sourceIndex, 0, 'source index');
          assert.strictEqual(draggingArgs[1].targetIndex, -1, 'target index');
          assert.strictEqual(changedArgs.sourceIndex, 0, 'source index');
          assert.strictEqual(changedArgs.targetIndex, 2, 'target index');
        });
        QUnit.test('set onChanged arg\'s fields', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              e.removeSourceElement = false, e.removeTargetElement = true, e.removeSourceClass = false;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22).up();
          assert.ok($('#sortable').find('.dx-drag-source').length);
          assert.equal($('#sortable').find('.dx-drag-target').length, 0);
        });
        QUnit.test('horizontal dragging - right', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'horizontal',
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 400, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '1', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
        });
        QUnit.skip('horizontal dragging between lines', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_SMALL, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            direction: 'auto'
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 350, offset.top + 15).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 6, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '5', 'item 3 text');
          assert.equal($items.eq(4).text(), '1', 'item 4 text');
          assert.equal($items.eq(5).text(), '6', 'item 5 text');
        });
        QUnit.skip('horizontal dragging between lines to the end of the first line', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_SMALL, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            direction: 'auto'
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 551, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 6, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '1', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.equal($items.eq(4).text(), '5', 'item 4 text');
          assert.equal($items.eq(5).text(), '6', 'item 5 text');
        });
        QUnit.test('dragging inside table', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE, true, true);
          var changedArgs;
          var draggingArgs = [];
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            itemContainerSelector: '.test-container',
            onDragging: function(e) {
              draggingArgs.push(e);
            },
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 500, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal(draggingArgs.length, 2, 'fired two times');
          assert.strictEqual(draggingArgs[0].sourceIndex, 1, 'source index');
          assert.strictEqual(draggingArgs[0].targetIndex, -1, 'target index');
          assert.strictEqual(draggingArgs[1].sourceIndex, 1, 'source index');
          assert.strictEqual(draggingArgs[1].targetIndex, -1, 'target index');
          assert.strictEqual(changedArgs.sourceIndex, 1, 'source index');
          assert.strictEqual(changedArgs.targetIndex, 4, 'target index');
          assert.equal($items.length, 6, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '2', 'item 3 text');
          assert.equal($items.eq(4).text(), '5', 'item 4 text');
          assert.equal($items.eq(5).text(), '6', 'item 5 text');
        });
        QUnit.test('dragging move over half of item height', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 25).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '1', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.ok(changedArgs, 'changed called');
          assert.strictEqual(changedArgs.sourceIndex, 0, 'source index');
          assert.strictEqual(changedArgs.targetIndex, 3, 'target index');
        });
        QUnit.test('dragging - to end of container', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 200).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '1', 'item 3 text');
          assert.strictEqual(changedArgs.sourceIndex, 0, 'source index');
          assert.strictEqual(changedArgs.targetIndex, 4, 'target index');
        });
        QUnit.test('dragging - to end of container without dragend', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 200);
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 5, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '2', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          var $draggable = $('.dx-drag');
          assert.ok($draggable.hasClass('test-item'));
          assert.ok($draggable.css('position'), 'absolute');
          assert.ok($draggable.hasClass($sortable.dxSortableOld('instance').option('dragClass')));
          assert.ok($items.eq(4).hasClass($sortable.dxSortableOld('instance').option('targetClass')));
          assert.ok($items.eq(0).hasClass($sortable.dxSortableOld('instance').option('sourceClass')));
          assert.ok(!changedArgs, 'change callback not called');
          assert.ok($sortable.hasClass($sortable.dxSortableOld('instance').option('targetClass')));
        });
        QUnit.test('dragging - out from container', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top - 400).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '2', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.ok(!changedArgs, 'changed called');
        });
        QUnit.test('dragging - out from container without dragend', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top - 400);
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '2', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.equal($('.dx-drag.test-item').length, 1, 'drag element exists');
          assert.ok($items.eq(0).hasClass($sortable.dxSortableOld('instance').option('sourceClass')));
          assert.ok(!$sortable.hasClass($sortable.dxSortableOld('instance').option('targetClass')));
          assert.ok(!changedArgs, 'changed called');
        });
        QUnit.skip('dragging not allowed item', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.not-test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left + 5, offset.top + 25).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '2', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.ok(!$sortable.hasClass($sortable.dxSortableOld('instance').option('targetClass')));
          assert.ok(!changedArgs, 'changed not called');
        });
        QUnit.test('dragging when no itemContainer', function(assert) {
          var changedArgs;
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.no',
            onChanged: function(e) {
              changedArgs = e;
            }
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left + 5, offset.top + 25).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '1', 'item 0 text');
          assert.equal($items.eq(1).text(), '2', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.ok(!changedArgs, 'changed not called');
        });
        QUnit.test('dragging with color swatch', function(assert) {
          var $sortable = $('#swatchSortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5);
          assert.equal($('body > .dx-swatch-1 > .test-item.dx-drag').length, 1, 'Dragging item rendered in container with swatch class');
        });
      });
      QUnit.module('\'useIndicator\' option', function() {
        QUnit.test('indicator is shown on right dragging', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var $targetItem = $sortable.find('.dx-drag-target');
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 500, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          assert.notOk($targetItem.is(':visible'));
          assert.ok(indicator.offset().left <= $sortable.find('.test-item').eq(5).offset().left, 'indicator was rendered before 5 item');
          assert.ok(indicator.offset().left > $sortable.find('.test-item').eq(3).offset().left, 'indicator was rendered after 4 item');
          assert.ok(indicator.hasClass('dx-position-indicator-horizontal'));
          assert.ok(!indicator.hasClass('dx-position-indicator-vertical'));
          assert.ok(!indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator should not be shown on small dragging', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 153, offset.top + 3);
          var indicator = $('.dx-position-indicator');
          assert.ok(!indicator.length, 'indicator is rendered');
        });
        QUnit.test('indicator is shown on left dragging', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left - 3, offset.top + 3).move(offset.left - 302, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          assert.ok(indicator.offset().left <= $sortable.find('.test-item').eq(1).offset().left, 'indicator is rendered before 1 item');
        });
        QUnit.test('indicator is shown after last item dragging', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE * 2, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 1500, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          assert.ok(indicator.offset().left > $sortable.find('.test-item').eq(5).offset().left, 'indicator was rendered after 4 item');
          assert.ok(indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator was removed', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE * 2, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left + 1500, offset.top).up();
          assert.notOk($('.dx-position-indicator').length, 'indicator is removed');
        });
        QUnit.test('remove indicator when item dragged out from container', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE * 2, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left - 3, offset.top + 3).move(offset.left - 302, offset.top).move(offset.left - 302, offset.top - 100);
          assert.strictEqual($('.dx-position-indicator').length, 0, 'indicator is removed');
        });
        QUnit.test('indicator should be shown on dragging between groups', function(assert) {
          $('#sortable').width(1700).html('').append("<div id=\"group1\" group=\"group1\" class=\"group\">\n            <div class=\"test-container\">\n                <div class=\"test-item\">1</div>\n                <div class=\"test-item\">2</div>\n                <div class=\"test-item\">3</div>\n                <div class=\"test-item\">4</div>\n            </div>\n        </div>");
          $('#sortable').append("<div id=\"group2\" group=\"group2\" class=\"group\">\n            <div class=\"test-container\">\n                <div class=\"test-item\">2-1</div>\n                <div class=\"test-item\">2-2</div>\n                <div class=\"test-item\">2-3</div>\n                <div class=\"test-item\">2-4</div>\n            </div>\n        </div>");
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left, offset.top + 20);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length);
        });
        QUnit.test('dragging to empty group', function(assert) {
          $('#sortable').width(1700).html('').append("<div id=\"group1\" group=\"group1\" class=\"group\">\n            <div class=\"test-container\">\n                <div class=\"test-item\">1</div>\n                <div class=\"test-item\">2</div>\n                <div class=\"test-item\">3</div>\n                <div class=\"test-item\">4</div>\n            </div>\n        </div>");
          $('#sortable #group1 .test-item').css('display', 'inline-block');
          $('#sortable').append("<div id=\"group2\" group=\"group2\" class=\"group\">\n            <div class=\"test-container\"></div>\n        </div>");
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 3).move(offset.left, offset.top + 20);
          var indicator = $('.dx-position-indicator');
          assert.ok(!indicator.length);
        });
        QUnit.test('indicator is shown on bottom dragging when items are set in two lines', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_SMALL, true, true);
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            direction: 'auto',
            useIndicator: true,
            itemContainerSelector: '.test-container'
          });
          var $item = $sortable.find('.test-item').eq(1);
          var $targetItem = $sortable.find('.dx-drag-target');
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left - 3, offset.top + 3).move(offset.left - 103, offset.top + 15);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          assert.notOk($targetItem.is(':visible'));
          assert.ok(indicator.offset().left <= $sortable.find('.test-item').eq(5).offset().left, 'indicator was rendered before 5 item');
          assert.ok(indicator.offset().left > $sortable.find('.test-item').eq(4).offset().left, 'indicator was rendered after 4 item');
          assert.ok(indicator.hasClass('dx-position-indicator-horizontal'));
          assert.ok(!indicator.hasClass('dx-position-indicator-vertical'));
          assert.ok(!indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator is shown on bottom dragging', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            useIndicator: true
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          var $items = $sortable.find('.test-item');
          assert.ok(indicator.offset().top <= $items.eq(3).offset().top, 'indicator was rendered before 2 item');
          assert.ok(indicator.offset().top > $items.eq(1).offset().top, 'indicator was rendered after 1 item');
          assert.ok(!indicator.hasClass('dx-position-indicator-horizontal'));
          assert.ok(indicator.hasClass('dx-position-indicator-vertical'));
          assert.ok(!indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator is shown on bottom dragging. RTL', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            useIndicator: true,
            rtlEnabled: true
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          var $items = $sortable.find('.test-item');
          assert.ok(indicator.offset().top <= $items.eq(3).offset().top, 'indicator was rendered before 2 item');
          assert.ok(indicator.offset().top > $items.eq(1).offset().top, 'indicator was rendered after 1 item');
          assert.ok(!indicator.hasClass('dx-position-indicator-horizontal'));
          assert.ok(indicator.hasClass('dx-position-indicator-vertical'));
          assert.ok(!indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator is shown after last item bottom dragging', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            useIndicator: true
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 45);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          var $items = $sortable.find('.test-item');
          assert.ok(indicator.offset().top >= $items.eq(3).offset().top, 'indicator was rendered after 4 item');
          assert.ok(indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('indicator is shown after last item bottom dragging. RTL', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            useIndicator: true,
            rtlEnabled: true
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 45);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length, 'indicator is rendered');
          var $items = $sortable.find('.test-item');
          assert.ok(indicator.offset().top >= $items.eq(3).offset().top, 'indicator was rendered after 4 item');
          assert.ok(indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('drag without source element', function(assert) {
          var $sortable = $('#sortable').dxSortableOld({
            itemSelector: '.test-item',
            itemContainerSelector: '.test-container',
            useIndicator: true
          });
          var $item = $sortable.find('.test-container');
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + $item.width() / 2 + 10, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(!indicator.length);
        });
        QUnit.test('Indicator should not be shown on dragging to the same item at another sortable', function(assert) {
          $('#sortable').css('display', 'none');
          $("\n            <div id=\"sortable1\">\n                <div id=\"second-group\" group=\"groupFilter\" class=\"group horizontal\">\n                    <div class=\"test-container\">\n                        <div class=\"test-item\">1</div>\n                        <div class=\"test-item\">2</div>\n                        <div class=\"test-item\">3</div>\n                    </div>\n                </div>\n            </div>\n        ").insertAfter('#sortable');
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"groupFilter\" class=\"group horizontal\">\n                    <div class=\"test-container\">\n                        <div class=\"test-item\">1</div>\n                        <div class=\"test-item\">2</div>\n                        <div class=\"test-item\">3</div>\n                    </div>\n                </div>\n            </div>\n        ").insertAfter('#sortable1');
          var sortableDown = $('#sortable1').dxSortableOld({
            selector: '#sortable1',
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            groupFilter: function() {
              return $(this).attr('group') === 'groupFilter';
            },
            itemContainerSelector: '.test-container',
            useIndicator: true
          });
          $('#sortable2').dxSortableOld({
            selector: '#sortable2',
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            groupFilter: function() {
              return $(this).attr('group') === 'groupFilter';
            },
            itemContainerSelector: '.test-container',
            useIndicator: true
          });
          var $item = sortableDown.find('.test-item').eq(1);
          pointerMock($item).start().down().move(305, 200);
          var indicator = $('.dx-position-indicator');
          assert.ok(!indicator.length);
        });
      });
      QUnit.module('sortable when source item is hidden', {beforeEach: function() {
          this.createSortable = function(options) {
            options = options || {};
            return $(options.selector || '#sortable').dxSortableOld($.extend({
              itemSelector: '.test-item',
              itemContainerSelector: '.test-container',
              onChanged: sinon.stub(),
              sourceClass: 'hidden-source',
              itemRender: function($sourceItem, target) {
                var $item = $sourceItem.clone().css({
                  width: getWidth($sourceItem),
                  height: getHeight($sourceItem)
                });
                if (target === 'target') {
                  $item.insertBefore($sourceItem);
                }
                return $item;
              }
            }, options));
          };
        }}, function() {
        QUnit.test('dragging', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '1', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].targetIndex, 2);
        });
        QUnit.test('dragging move over half of item height', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 25).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '1', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].targetIndex, 3);
        });
        QUnit.test('dragging - to end of container', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 200).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '1', 'item 3 text');
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].targetIndex, 4);
        });
        QUnit.test('dragging - add element to empty container', function(assert) {
          var $sortable = $('#sortable');
          var $container = $sortable.find('.test-container').remove();
          $('<div id="first-group" group="first" class="group">').css({height: 150}).append($container).appendTo($sortable);
          $('<div id="second-group" group="second" class="group">').append($('<div class="test-container">')).appendTo($sortable);
          this.createSortable({groupSelector: '.group'});
          var firstGroup = $('#first-group');
          var $item = firstGroup.find('.test-item').eq(2);
          var secondGroup = $('#second-group');
          pointerMock($item).start().down().move(5, 155).up();
          var $firstGroupItems = firstGroup.find('.test-item');
          var $secondGroupItems = secondGroup.find('.test-item');
          var onChangedArgs = $sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0];
          assert.equal($secondGroupItems.length, 1, 'item count in second group');
          assert.equal($secondGroupItems.eq(0).text(), '3', 'item 0 text');
          assert.equal($firstGroupItems.length, 3, 'item count in first group');
          assert.equal($firstGroupItems.eq(0).text(), '1', 'item 0 text');
          assert.equal($firstGroupItems.eq(1).text(), '2', 'item 1 text');
          assert.equal($firstGroupItems.eq(2).text(), '4', 'item 3 text');
          assert.deepEqual(onChangedArgs.sourceIndex, 2);
          assert.deepEqual(onChangedArgs.sourceGroup, 'first');
          assert.deepEqual(onChangedArgs.targetIndex, 0);
          assert.deepEqual(onChangedArgs.targetGroup, 'second');
        });
        QUnit.test('dragging between different sortables by groupFilter callback to empty container', function(assert) {
          var $sortable = $('#sortable');
          var $container = $sortable.find('.test-container').remove();
          $('<div id="first-group" group="first" class="group">').append($container).appendTo($sortable);
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"second\" class=\"group\">\n                    <div class=\"test-container\"></div>\n                </div>\n            </div>\n        ").insertAfter($sortable);
          $('#second-group').css('height', '150px');
          this.createSortable({
            groupSelector: '.group',
            groupFilter: function() {
              return $(this).attr('group') === 'second';
            }
          });
          this.createSortable({
            selector: '#sortable2',
            groupSelector: '.group'
          });
          var firstGroup = $('#first-group');
          var $item = firstGroup.find('.test-item').eq(2);
          var secondGroup = $('#second-group');
          pointerMock($item).start().down().move(5, 305).up();
          var $firstGroupItems = firstGroup.find('.test-item');
          var $secondGroupItems = secondGroup.find('.test-item');
          var onChangedArgs = $sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0];
          assert.equal($secondGroupItems.length, 1, 'item count in second group');
          assert.equal($secondGroupItems.eq(0).text(), '3', 'item 0 text');
          assert.equal($firstGroupItems.length, 3, 'item count in first group');
          assert.equal($firstGroupItems.eq(0).text(), '1', 'item 0 text');
          assert.equal($firstGroupItems.eq(1).text(), '2', 'item 1 text');
          assert.equal($firstGroupItems.eq(2).text(), '4', 'item 3 text');
          assert.deepEqual(onChangedArgs.sourceIndex, 2);
          assert.deepEqual(onChangedArgs.sourceGroup, 'first');
          assert.deepEqual(onChangedArgs.targetIndex, 0);
          assert.deepEqual(onChangedArgs.targetGroup, 'second');
        });
        QUnit.test('disable dragging between different sortables by groupFilter callback', function(assert) {
          var $sortable = $('#sortable');
          var $container = $sortable.find('.test-container').remove();
          $('<div id="first-group" group="first" class="group">').append($container).appendTo($sortable);
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"second\" class=\"group\">\n                    <div class=\"test-container\"></div>\n                </div>\n            </div>\n        ").insertAfter($sortable);
          this.createSortable({
            groupSelector: '.group',
            groupFilter: function() {
              return $(this).attr('group') !== 'second';
            }
          });
          this.createSortable({
            selector: '#sortable2',
            groupSelector: '.group'
          });
          var firstGroup = $('#first-group');
          var $item = firstGroup.find('.test-item').eq(2);
          pointerMock($item).start().down().move(5, 305).up();
          var onChangedCalled = $sortable.dxSortableOld('instance').option('onChanged').called;
          assert.strictEqual(onChangedCalled, false, 'onChanged is not called');
        });
        QUnit.test('dragging between different sortables by groupFilter callback to non-empty container with another direction', function(assert) {
          var $sortable = $('#sortable');
          var $container = $sortable.find('.test-container').remove();
          $('<div id="first-group" group="first" class="group">').append($container).appendTo($sortable);
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"second\" class=\"group horizontal\">\n                    <div class=\"test-container\">\n                        <div class=\"test-item\">10</div>\n                        <div class=\"test-item\">11</div>\n                        <div class=\"test-item\">12</div>\n                    </div>\n                </div>\n            </div>\n        ").insertAfter($sortable);
          this.createSortable({
            groupSelector: '.group',
            groupFilter: function() {
              return $(this).attr('group') === 'second';
            }
          });
          this.createSortable({
            selector: '#sortable2',
            direction: 'horizontal',
            groupSelector: '.group'
          });
          var firstGroup = $('#first-group');
          var $item = firstGroup.find('.test-item').eq(2);
          var secondGroup = $('#second-group');
          pointerMock($item).start().down().move(400, 300).up();
          var $firstGroupItems = firstGroup.find('.test-item');
          var $secondGroupItems = secondGroup.find('.test-item');
          var onChangedArgs = $sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0];
          assert.equal($secondGroupItems.length, 4, 'item count in second group');
          assert.equal($secondGroupItems.eq(0).text(), '10', 'item 0 text');
          assert.equal($secondGroupItems.eq(1).text(), '11', 'item 1 text');
          assert.equal($secondGroupItems.eq(2).text(), '3', 'item 2 text');
          assert.equal($secondGroupItems.eq(3).text(), '12', 'item 3 text');
          assert.equal($firstGroupItems.length, 3, 'item count in first group');
          assert.equal($firstGroupItems.eq(0).text(), '1', 'item 0 text');
          assert.equal($firstGroupItems.eq(1).text(), '2', 'item 1 text');
          assert.equal($firstGroupItems.eq(2).text(), '4', 'item 3 text');
          assert.deepEqual(onChangedArgs.sourceIndex, 2);
          assert.deepEqual(onChangedArgs.sourceGroup, 'first');
          assert.deepEqual(onChangedArgs.targetIndex, 2);
          assert.deepEqual(onChangedArgs.targetGroup, 'second');
        });
        QUnit.test('dragging between different sortables by groupFilter callback to non-empty container with another useIndicator option value', function(assert) {
          var $sortable = $('#sortable');
          var $container = $sortable.find('.test-container').remove();
          $('<div id="first-group" group="first" class="group">').append($container).appendTo($sortable);
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"second\" class=\"group horizontal\">\n                    <div class=\"test-container\">\n                        <div class=\"test-item\">10</div>\n                        <div class=\"test-item\">11</div>\n                        <div class=\"test-item\">12</div>\n                    </div>\n                </div>\n        ").insertAfter($sortable);
          this.createSortable({
            groupSelector: '.group',
            groupFilter: function() {
              return $(this).attr('group') === 'second';
            },
            useIndicator: false
          });
          this.createSortable({
            selector: '#sortable2',
            direction: 'horizontal',
            groupSelector: '.group',
            useIndicator: true
          });
          var firstGroup = $('#first-group');
          var $item = firstGroup.find('.test-item').eq(2);
          var pointer = pointerMock($item).start().down().move(400, 300);
          assert.strictEqual($('.dx-position-indicator').length, 1);
          pointer.up();
          assert.strictEqual($('.dx-position-indicator').length, 0);
        });
        QUnit.test('dragging between different sortables positioned one on another', function(assert) {
          $("\n            <div id=\"sortable1\">\n                <div id=\"second-group\" group=\"groupFilter\" class=\"group horizontal\">\n                    <div class=\"test-container\">\n                        <div class=\"test-item\">1</div>\n                        <div class=\"test-item\">2</div>\n                    </div>\n                </div>\n            </div>\n        ").insertAfter('#sortable').css({
            position: 'absolute',
            left: '20px',
            top: '0px',
            width: '300px',
            height: '150px'
          });
          $("\n            <div id=\"sortable2\">\n                <div id=\"second-group\" group=\"groupFilter\" class=\"group horizontal\">\n                <div class=\"test-container\"></div>\n            </div>\n        ").insertAfter('#sortable1').css({
            position: 'absolute',
            left: '20px',
            top: '0px',
            width: '300px',
            height: '150px'
          });
          $('#sortable2 #second-group').css('height', '150px');
          var sortableDown = this.createSortable({
            selector: '#sortable1',
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            groupFilter: function() {
              return $(this).attr('group') === 'groupFilter';
            },
            itemContainerSelector: '.test-container'
          });
          var sortableUp = this.createSortable({
            selector: '#sortable2',
            itemSelector: '.test-item',
            groupSelector: '.group',
            direction: 'auto',
            groupFilter: function() {
              return $(this).attr('group') === 'groupFilter';
            },
            itemContainerSelector: '.test-container'
          });
          var $item = sortableDown.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left + 20, offset.top + 22).up();
          var $items1 = sortableDown.find('.test-item');
          var $items2 = sortableUp.find('.test-item');
          assert.equal($items1.length, 1, 'item count');
          assert.equal($items1.eq(0).text(), '2', 'item 1 text');
          assert.equal($items2.eq(0).text(), '1', 'item 0 text');
        });
        QUnit.test('Disable dragging', function(assert) {
          var $sortable = this.createSortable({allowDragging: false});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22).up();
          assert.ok(!$sortable.dxSortableOld('instance').option('onChanged').called, 'dragging should be disabled');
        });
        QUnit.test('Enable dragging at runtime', function(assert) {
          var $sortable = this.createSortable({allowDragging: false});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          $sortable.dxSortableOld('option', 'allowDragging', true);
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 5).move(offset.left, offset.top + 22).up();
          assert.ok($sortable.dxSortableOld('instance').option('onChanged').called, 'dragging should be disabled');
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.deepEqual($sortable.dxSortableOld('instance').option('onChanged').lastCall.args[0].targetIndex, 2);
        });
      });
      QUnit.module('Group items', {beforeEach: function() {
          this.createSortable = function(options) {
            options = options || {};
            return $(options.selector || '#sortable').dxSortableOld($.extend({
              itemSelector: '.test-item',
              itemContainerSelector: '.test-container',
              onChanged: sinon.stub()
            }, options));
          };
        }}, function() {
        QUnit.test('Groups dragging', function(assert) {
          $('.test-item').eq(0).attr('item-group', 'group1');
          $('.test-item').eq(1).attr('item-group', 'group1');
          $('.test-container').css('border', 'none');
          var $sortable = this.createSortable({groupSelector: '.test-container'});
          var $item = $sortable.find('.test-item').eq(0);
          var offset1 = $item.offset();
          var offset2 = $sortable.find('.test-item').eq(1).offset();
          pointerMock($item).start().down().move(offset1.left + 5, offset1.top + 5);
          var dragElements = $('.dx-drag');
          assert.strictEqual(dragElements.length, 2);
          assert.strictEqual(dragElements.eq(0).text(), '1');
          assert.strictEqual(dragElements.eq(1).text(), '2');
          assert.strictEqual(parseInt(dragElements.eq(0).css('left')), parseInt(offset1.left + 5));
          assert.strictEqual(parseInt(dragElements.eq(1).css('left')), parseInt(offset2.left + 5));
          assert.strictEqual(parseInt(dragElements.eq(0).css('top')), parseInt(offset1.top + 5));
          assert.strictEqual(parseInt(dragElements.eq(1).css('top')), parseInt(offset2.top + 5));
        });
        QUnit.test('Groups dragging. get correct source index for no group item', function(assert) {
          $('.test-item').eq(1).attr('item-group', 'group1');
          $('.test-item').eq(2).attr('item-group', 'group1');
          $('.test-container').css('border', 'none');
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top - 25).up();
          var changedArgs = $sortable.dxSortableOld('option', 'onChanged').lastCall.args[0];
          assert.strictEqual(changedArgs.sourceIndex, 2, 'sourceIndex');
          assert.strictEqual(changedArgs.targetIndex, 1, 'targetIndex');
        });
        QUnit.test('Groups dragging. get correct source index for group item', function(assert) {
          $('.test-item').eq(1).attr('item-group', 'group1');
          $('.test-item').eq(2).attr('item-group', 'group1');
          $('.test-container').css('border', 'none');
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(2);
          var offset = $sortable.find('.test-item').eq(1).offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top + 25).up();
          var changedArgs = $sortable.dxSortableOld('option', 'onChanged').lastCall.args[0];
          assert.strictEqual(changedArgs.sourceIndex, 1, 'sourceIndex');
          assert.strictEqual(changedArgs.targetIndex, 2, 'targetIndex');
        });
        QUnit.test('do not change index on small dragging inside group. horizontal', function(assert) {
          createHorizontalMarkUp(1500, false, false);
          $('.test-item').eq(1).attr('item-group', 'group1');
          $('.test-item').eq(2).attr('item-group', 'group1');
          $('.test-container').css('border', 'none');
          var $sortable = this.createSortable({
            direction: 'auto',
            useIndicator: true
          });
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + 350, offset.top + 5).up();
          assert.ok(!$sortable.dxSortableOld('option', 'onChanged').called);
        });
        QUnit.test('do not change index on small dragging inside group.', function(assert) {
          $('.test-item').eq(1).attr('item-group', 'group1');
          $('.test-item').eq(2).attr('item-group', 'group1');
          $('.test-container').css('border', 'none');
          var $sortable = this.createSortable({useIndicator: true});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + 3, offset.top + 10).up();
          assert.ok(!$sortable.dxSortableOld('option', 'onChanged').called);
        });
        QUnit.test('Get correct source index for last item', function(assert) {
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + 5, offset.top - 25).up();
          var changedArgs = $sortable.dxSortableOld('option', 'onChanged').lastCall.args[0];
          assert.strictEqual(changedArgs.sourceIndex, 3, 'sourceIndex');
          assert.strictEqual(changedArgs.targetIndex, 1, 'targetIndex');
        });
      });
      QUnit.module('Horizontal direction. RTL', {beforeEach: function() {
          var that = this;
          createHorizontalMarkUp(HORIZONTAL_WIDTH_LARGE);
          this.createSortable = function(options) {
            options = options || {};
            var $sortable = $(options.selector || '#sortable').dxSortableOld($.extend({
              itemSelector: '.test-item',
              itemContainerSelector: '.test-container',
              onChanged: sinon.stub(),
              rtlEnabled: true,
              direction: 'horizontal'
            }, options));
            that.sortable = $sortable.dxSortableOld('instance');
            return $sortable;
          };
        }}, function() {
        QUnit.test('horizontal dragging - left', function(assert) {
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + $item.width() - 400, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '1', 'item 1 text');
          assert.equal($items.eq(2).text(), '3', 'item 2 text');
          assert.equal($items.eq(3).text(), '4', 'item 3 text');
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].targetIndex, 2);
        });
        QUnit.skip('horizontal dragging between lines', function(assert) {
          createHorizontalMarkUp(HORIZONTAL_WIDTH_SMALL, true);
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + $item.width() - 350, offset.top + 15).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 6, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '5', 'item 3 text');
          assert.equal($items.eq(4).text(), '1', 'item 4 text');
          assert.equal($items.eq(5).text(), '6', 'item 5 text');
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].targetIndex, 5);
        });
        QUnit.test('drag to the end of the container', function(assert) {
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $sortable.find('.test-item').eq(3).offset();
          pointerMock($item).start().down().move(offset.left - 10, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '2', 'item 0 text');
          assert.equal($items.eq(1).text(), '3', 'item 1 text');
          assert.equal($items.eq(2).text(), '4', 'item 2 text');
          assert.equal($items.eq(3).text(), '1', 'item 3 text');
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].sourceIndex, 0);
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].targetIndex, 4);
        });
        QUnit.test('drag to begin of the container', function(assert) {
          var $sortable = this.createSortable({});
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + $item.width() / 2 + 10, offset.top).up();
          var $items = $sortable.find('.test-item');
          assert.equal($items.length, 4, 'item count');
          assert.equal($items.eq(0).text(), '4', 'item 0 text');
          assert.equal($items.eq(1).text(), '1', 'item 1 text');
          assert.equal($items.eq(2).text(), '2', 'item 2 text');
          assert.equal($items.eq(3).text(), '3', 'item 3 text');
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].sourceIndex, 3);
          assert.strictEqual(this.sortable.option('onChanged').lastCall.args[0].targetIndex, 0);
        });
        QUnit.test('horizontal dragging - left. Render Indicator', function(assert) {
          var $sortable = this.createSortable({useIndicator: true});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $item.offset();
          pointerMock($item).start().down().move(offset.left + $item.width() - 400, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length);
          assert.roughEqual(parseInt(indicator.css('left')), $sortable.find('.test-item').eq(2).offset().left + $sortable.find('.test-item').eq(2).outerWidth(true), 1);
          assert.ok(indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('drag to the end of the container. Render Indicator', function(assert) {
          var $sortable = this.createSortable({useIndicator: true});
          var $item = $sortable.find('.test-item').eq(0);
          var offset = $sortable.find('.test-item').eq(3).offset();
          pointerMock($item).start().down().move(offset.left - 10, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length);
          assert.roughEqual(parseInt(indicator.css('left')), $sortable.find('.test-item').eq(3).offset().left, 1);
          assert.ok(!indicator.hasClass('dx-position-indicator-last'));
        });
        QUnit.test('drag to begin of the container. Render Indicator', function(assert) {
          var $sortable = this.createSortable({useIndicator: true});
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + $item.width() / 2 + 10, offset.top);
          var indicator = $('.dx-position-indicator');
          assert.ok(indicator.length);
          assert.roughEqual(parseInt(indicator.css('left')), $sortable.find('.test-item').eq(0).offset().left + $sortable.find('.test-item').eq(0).outerWidth(true), 1);
          assert.ok(indicator.hasClass('dx-position-indicator-last'));
        });
      });
      QUnit.module('Scroll group content', {
        beforeEach: function() {
          this.createSortable = function(options) {
            options = options || {};
            return $(options.selector || '#sortable').dxSortableOld($.extend({
              itemSelector: '.test-item',
              itemContainerSelector: '.test-container',
              groupSelector: '.test-container',
              sourceClass: 'hidden-source',
              itemRender: function($sourceItem, target) {
                var $item = $sourceItem.clone().css({
                  width: getWidth($sourceItem),
                  height: getHeight($sourceItem)
                });
                if (target === 'target') {
                  $item.insertBefore($sourceItem);
                }
                return $item;
              }
            }, options));
          };
          this.onScroll = sinon.stub();
          $('.test-container').attr('allow-scrolling', true).height(150).dxScrollable({
            onScroll: this.onScroll,
            disabled: true,
            useNative: false
          });
          $('.test-item').height(75);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('No scroll group content', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-item').eq(0).offset();
          pointerMock($item).start().down().move(offset.left + $item.width() / 2 + 10, offset.top);
          this.clock.tick(10);
          assert.ok(!this.onScroll.called);
        });
        QUnit.test('Scroll down group content', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          pointerMock($item).start().down().move(offset.left, offset.top + 30).move(offset.left, offset.top + $('.test-container').height());
          assert.strictEqual(this.onScroll.callCount, 1);
          assert.strictEqual(this.onScroll.lastCall.args[0].scrollOffset.top, $sortable.dxSortableOld('instance').__SCROLL_STEP);
        });
        QUnit.test('Scroll down group content second time after clock tick if pointer at the bottom', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          pointerMock($item).start().down().move(offset.left, offset.top + 30).move(offset.left, offset.top + $('.test-container').height());
          this.onScroll.reset();
          this.clock.tick(10);
          assert.strictEqual(this.onScroll.callCount, 1);
          assert.strictEqual(this.onScroll.lastCall.args[0].scrollOffset.top, 2 * $sortable.dxSortableOld('instance').__SCROLL_STEP);
        });
        QUnit.test('Scroll down group content while pointer at the bottom', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          pointerMock($item).start().down().move(offset.left, offset.top + 30).move(offset.left, offset.top + $('.test-container').height());
          this.clock.tick(100);
          assert.strictEqual(this.onScroll.callCount, 11);
          assert.strictEqual(this.onScroll.lastCall.args[0].scrollOffset.top, 11 * $sortable.dxSortableOld('instance').__SCROLL_STEP);
        });
        QUnit.test('Scroll up group content', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top + 8);
          assert.strictEqual(this.onScroll.callCount, 1);
          assert.strictEqual(this.onScroll.lastCall.args[0].scrollOffset.top, 50 - $sortable.dxSortableOld('instance').__SCROLL_STEP);
        });
        QUnit.test('Scroll up group content to begin when pointer above area', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top - 10);
          this.clock.tick(1000);
          assert.strictEqual(this.onScroll.callCount, 25);
          assert.strictEqual(this.onScroll.lastCall.args[0].scrollOffset.top, 0);
        });
        QUnit.test('Stop scrolling affer return pointer in the middle of group', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          var pointer = pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top - 10);
          this.clock.tick(20);
          this.onScroll.reset();
          pointer.move(offset.left, offset.top + 40);
          this.clock.tick(100);
          assert.strictEqual(this.onScroll.callCount, 0);
        });
        QUnit.test('Stop scrolling affer drag end', function(assert) {
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          var pointer = pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top - 10);
          this.clock.tick(20);
          this.onScroll.reset();
          pointer.up();
          this.clock.tick(100);
          assert.strictEqual(this.onScroll.callCount, 0);
          assert.strictEqual($sortable.find('.test-container').dxScrollable('instance')._eventsStrategy.hasEvent('scroll'), false);
        });
        QUnit.test('Stop scrolling affer drag to another group', function(assert) {
          $('#sortable').append('<div id="second-group" class="test-container"><div class="test-item">1</div><div class="test-item">2</div></div>');
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').eq(0).dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          var pointer = pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top + 5);
          this.clock.tick(20);
          this.onScroll.reset();
          var secondGroupOffset = $('#second-group').offset();
          pointer.move(secondGroupOffset.left + 10, secondGroupOffset.top + 15);
          this.clock.tick(100);
          assert.strictEqual(this.onScroll.callCount, 0);
          assert.strictEqual($sortable.find('.test-container').eq(0).dxScrollable('instance')._eventsStrategy.hasEvent('scroll'), false);
        });
        QUnit.test('Stop scrolling affer drag from emty space(no group) to another group', function(assert) {
          $('#sortable').append('<div id="second-group" class="test-container"><div class="test-item">1</div><div class="test-item">2</div></div>');
          var $sortable = this.createSortable();
          var $item = $sortable.find('.test-item').eq(3);
          var offset = $sortable.find('.test-container').eq(0).offset();
          $sortable.find('.test-container').eq(0).dxScrollable('scrollTo', 50);
          this.onScroll.reset();
          var pointer = pointerMock($item).start().down().move(offset.left, offset.top + 1).move(offset.left, offset.top - 10);
          this.clock.tick(20);
          this.onScroll.reset();
          var secondGroupOffset = $('#second-group').offset();
          pointer.move(secondGroupOffset.left + 10, secondGroupOffset.top + 15);
          this.clock.tick(100);
          assert.strictEqual(this.onScroll.callCount, 0);
          assert.strictEqual($sortable.find('.test-container').eq(0).dxScrollable('instance')._eventsStrategy.hasEvent('scroll'), false);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/size","generic_light.css!","__internal/grids/pivot_grid/sortable/module","ui/scroll_view/ui.scrollable","../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/size"), require("generic_light.css!"), require("__internal/grids/pivot_grid/sortable/module"), require("ui/scroll_view/ui.scrollable"), require("../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sortable.tests.js.map