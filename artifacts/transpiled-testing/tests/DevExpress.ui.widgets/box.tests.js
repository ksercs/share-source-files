!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/box.tests.js"], ["events/visibility_change","jquery","ui/box","ui/scroll_view/ui.scrollable","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/box.tests.js", ["events/visibility_change", "jquery", "ui/box", "ui/scroll_view/ui.scrollable", "generic_light.css!"], function($__export) {
  "use strict";
  var triggerShownEvent,
      $,
      testStart,
      module,
      test,
      BOX_ITEM_CLASS,
      BOX_ITEM_CONTENT_CLASS,
      relativeOffset,
      createBox,
      getBoxInstance;
  return {
    setters: [function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__3;
      (($__3 = QUnit, testStart = $__3.testStart, module = $__3.module, test = $__3.test, $__3));
      testStart(function() {
        var markup = "\n        <div id=\"box\"></div>\n        <div id=\"boxWithScrollable\">\n            <div data-options=\"dxItem: { ratio: 1 }\">\n                <div id=\"scrollable\">\n                    <div style=\"height: 200px;\"></div>\n                </div>\n            </div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      BOX_ITEM_CLASS = 'dx-box-item';
      BOX_ITEM_CONTENT_CLASS = 'dx-box-item-content';
      relativeOffset = function($element, $relativeElement) {
        $relativeElement = $relativeElement || $element.parent();
        var elementOffset = $element.offset();
        var relativeElementOffset = $relativeElement.offset();
        return {
          top: elementOffset.top - relativeElementOffset.top,
          left: elementOffset.left - relativeElementOffset.left
        };
      };
      createBox = function() {
        for (var parameters = [],
            $__2 = 0; $__2 < arguments.length; $__2++)
          parameters[$__2] = arguments[$__2];
        if (parameters.length > 2) {
          return;
        }
        var selector = parameters.length === 1 ? '#box' : parameters[0];
        var options = parameters.length === 1 ? parameters[0] : parameters[1];
        return $(selector).dxBox(options);
      };
      getBoxInstance = function($element) {
        return $($element).dxBox('instance');
      };
      module('Scrollable integration', function() {
        test('Scrollable placed in dxBox stretch correctly', function(assert) {
          var $box = createBox('#boxWithScrollable', {
            height: 100,
            direction: 'col'
          });
          var $scrollable = $box.find('#scrollable').dxScrollable();
          assert.equal($scrollable.height(), 100, 'Scrollable height is correct');
        });
      });
      module('layouting', function() {
        test('direction column', function(assert) {
          var size = 100;
          var $box = createBox({
            direction: 'col',
            items: [{ratio: 1}, {ratio: 1}],
            width: size,
            height: size
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var firstItemLayout = $.extend(relativeOffset($firstItem), {
            width: $firstItem.width(),
            height: $firstItem.height()
          });
          var firstItemExpectedLayout = {
            top: 0,
            left: 0,
            width: size,
            height: size / 2
          };
          assert.deepEqual(firstItemLayout, firstItemExpectedLayout, 'first item positioned correctly');
          var $secondItem = $items.eq(1);
          var secondItemLayout = $.extend(relativeOffset($secondItem), {
            width: $secondItem.width(),
            height: $secondItem.height()
          });
          var secondItemExpectedLayout = {
            top: size / 2,
            left: 0,
            width: size,
            height: size / 2
          };
          assert.deepEqual(secondItemLayout, secondItemExpectedLayout, 'second item positioned correctly');
        });
        test('direction row', function(assert) {
          var size = 100;
          var $box = createBox({
            direction: 'row',
            items: [{ratio: 1}, {ratio: 1}],
            width: size,
            height: size
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var firstItemLayout = $.extend(relativeOffset($firstItem), {
            width: $firstItem.width(),
            height: $firstItem.height()
          });
          var firstItemExpectedLayout = {
            top: 0,
            left: 0,
            width: size / 2,
            height: size
          };
          assert.deepEqual(firstItemLayout, firstItemExpectedLayout, 'first item positioned correctly');
          var $secondItem = $items.eq(1);
          var secondItemLayout = $.extend(relativeOffset($secondItem), {
            width: $secondItem.width(),
            height: $secondItem.height()
          });
          var secondItemExpectedLayout = {
            top: 0,
            left: size / 2,
            width: size / 2,
            height: size
          };
          assert.deepEqual(secondItemLayout, secondItemExpectedLayout, 'second item positioned correctly');
          var $firstItemContent = $firstItem.find('.' + BOX_ITEM_CONTENT_CLASS);
          $firstItemContent.append($('<div>').width(0.75 * size));
          assert.equal($firstItemContent.width(), size / 2, 'item content width is less or equal to item width');
        });
        test('align for column direction', function(assert) {
          var baseSize = 40;
          var boxSize = baseSize * 5;
          var $box = createBox({
            direction: 'col',
            align: 'start',
            items: [{baseSize: baseSize}, {baseSize: baseSize}],
            height: boxSize
          });
          var $boxItems = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $boxItems.eq(0);
          assert.equal(relativeOffset($firstItem).top, 0, 'first item positioned correctly for align: start');
          var $secondItem = $boxItems.eq(1);
          assert.equal(relativeOffset($secondItem).top, baseSize, 'second item positioned correctly for align: start');
          var box = getBoxInstance($box);
          box.option('align', 'end');
          assert.equal(relativeOffset($firstItem).top, boxSize - 2 * baseSize, 'first item positioned correctly for align: end');
          assert.equal(relativeOffset($secondItem).top, boxSize - baseSize, 'second item positioned correctly for align: end');
          box.option('align', 'space-between');
          assert.equal(relativeOffset($firstItem).top, 0, 'first item positioned correctly for align: space-between');
          assert.equal(relativeOffset($secondItem).top, boxSize - baseSize, 'second item positioned correctly for align: space-between');
          box.option('align', 'center');
          assert.equal(relativeOffset($firstItem).top, (boxSize - 2 * baseSize) / 2, 'first item positioned correctly for align: center');
          assert.equal(relativeOffset($secondItem).top, (boxSize - 2 * baseSize) / 2 + baseSize, 'second item positioned correctly for align: center');
          box.option('align', 'space-around');
          assert.equal(relativeOffset($firstItem).top, (boxSize / 2 - baseSize) / 2, 'first item positioned correctly for align: space-around');
          assert.equal(relativeOffset($secondItem).top, (boxSize / 2) + (boxSize / 2 - baseSize) / 2, 'second item positioned correctly for align: space-around');
        });
        test('align for row direction', function(assert) {
          var baseSize = 40;
          var boxSize = baseSize * 5;
          var $box = createBox({
            direction: 'row',
            align: 'start',
            items: [{baseSize: baseSize}, {baseSize: baseSize}],
            width: boxSize
          });
          var $boxItems = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $boxItems.eq(0);
          assert.equal(relativeOffset($firstItem).left, 0, 'first item positioned correctly for align: start');
          var $secondItem = $boxItems.eq(1);
          assert.equal(relativeOffset($secondItem).left, baseSize, 'second item positioned correctly for align: start');
          var box = getBoxInstance($box);
          box.option('align', 'end');
          assert.equal(relativeOffset($firstItem).left, boxSize - 2 * baseSize, 'first item positioned correctly for align: end');
          assert.equal(relativeOffset($secondItem).left, boxSize - baseSize, 'second item positioned correctly for align: end');
          box.option('align', 'space-between');
          assert.equal(relativeOffset($firstItem).left, 0, 'first item positioned correctly for align: space-between');
          assert.equal(relativeOffset($secondItem).left, boxSize - baseSize, 'second item positioned correctly for align: space-between');
          box.option('align', 'center');
          assert.equal(relativeOffset($firstItem).left, (boxSize - 2 * baseSize) / 2, 'first item positioned correctly for align: center');
          assert.equal(relativeOffset($secondItem).left, (boxSize - 2 * baseSize) / 2 + baseSize, 'second item positioned correctly for align: center');
          box.option('align', 'space-around');
          assert.equal(relativeOffset($firstItem).left, (boxSize / 2 - baseSize) / 2, 'first item positioned correctly for align: space-around');
          assert.equal(relativeOffset($secondItem).left, (boxSize / 2) + (boxSize / 2 - baseSize) / 2, 'second item positioned correctly for align: space-around');
        });
        test('crossAlign for column direction', function(assert) {
          var size = 50;
          var boxSize = 2 * size;
          var $box = createBox({
            direction: 'col',
            crossAlign: 'start',
            items: [{html: '<div style=\'width: ' + size + 'px\'></div>'}],
            width: boxSize
          });
          var box = getBoxInstance($box);
          var $item = $box.find('.' + BOX_ITEM_CLASS).eq(0);
          assert.equal(relativeOffset($item).left, 0, 'item positioned for crossAlign: start');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'end');
          assert.equal(relativeOffset($item).left, boxSize - size, 'item positioned for crossAlign: end');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'center');
          assert.equal(relativeOffset($item).left, (boxSize - size) / 2, 'item positioned for crossAlign: center');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'stretch');
          assert.equal(relativeOffset($item).left, 0, 'item positioned for crossAlign: stretch');
          assert.equal($item.width(), boxSize, 'element is stretched over container');
        });
        test('crossAlign for row direction', function(assert) {
          var size = 50;
          var boxSize = 2 * size;
          var $box = createBox({
            direction: 'row',
            crossAlign: 'start',
            items: [{html: '<div style=\'height: ' + size + 'px\'></div>'}],
            height: boxSize
          });
          var box = getBoxInstance($box);
          var $item = $box.find('.' + BOX_ITEM_CLASS).eq(0);
          assert.equal(relativeOffset($item).top, 0, 'item positioned for crossAlign: start');
          assert.equal($item.height(), size, 'item is stretched over content');
          box.option('crossAlign', 'end');
          assert.equal(relativeOffset($item).top, boxSize - size, 'item positioned for crossAlign: end');
          assert.equal($item.height(), size, 'item is stretched over content');
          box.option('crossAlign', 'center');
          assert.equal(relativeOffset($item).top, (boxSize - size) / 2, 'item positioned for crossAlign: center');
          assert.equal($item.height(), size, 'item is stretched over content');
          box.option('crossAlign', 'stretch');
          assert.equal(relativeOffset($item).top, 0, 'item positioned for crossAlign: stretch');
          assert.equal($item.height(), boxSize, 'element is stretched over container');
        });
        test('percent baseSize', function(assert) {
          var firstItemDimension = {baseSize: '60%'};
          var secondItemDimension = {baseSize: '40%'};
          var boxSize = 300;
          var $box = createBox({
            direction: 'row',
            items: [firstItemDimension, secondItemDimension],
            width: boxSize
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          assert.equal($firstItem.width(), 0.6 * boxSize, 'first item has correct size');
          assert.equal($secondItem.width(), 0.4 * boxSize, 'second item has correct size');
        });
        test('items with auto baseSize should have size of content', function(assert) {
          var firstItemDimension = {
            ratio: 0,
            baseSize: 'auto'
          };
          var secondItemDimension = {
            ratio: 0,
            baseSize: 'auto'
          };
          var boxSize = 300;
          var $box = createBox({
            direction: 'row',
            items: [firstItemDimension, secondItemDimension],
            width: boxSize,
            onItemRendered: function(args) {
              var $content = $('<div>').width(50);
              $(args.itemElement).children().append($content);
            }
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          assert.equal($firstItem.width(), 50, 'first item has correct size');
          assert.equal($secondItem.width(), 50, 'second item has correct size');
        });
        test('items should have baseSize 0 by default', function(assert) {
          var firstItemDimension = {ratio: 1};
          var secondItemDimension = {ratio: 1};
          var boxSize = 300;
          var itemWidth = 50;
          var $box = createBox({
            direction: 'row',
            items: [firstItemDimension, secondItemDimension],
            width: boxSize,
            onItemRendered: function(args) {
              var $content = $('<div>').width(itemWidth);
              $(args.itemElement).children().append($content);
              itemWidth += 50;
            }
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          assert.equal($firstItem.width(), $secondItem.width(), 'items has same width');
        });
        test('baseSize and ratio option', function(assert) {
          var firstItemDimension = {
            ratio: 1,
            baseSize: 100
          };
          var secondItemDimension = {
            ratio: 3,
            baseSize: 20
          };
          var boxSize = 300;
          var $box = createBox({
            direction: 'row',
            items: [firstItemDimension, secondItemDimension],
            width: boxSize
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          var freeSpace = boxSize - firstItemDimension.baseSize - secondItemDimension.baseSize;
          var partsCount = firstItemDimension.ratio + secondItemDimension.ratio;
          var partSpace = freeSpace / partsCount;
          assert.equal($firstItem.width(), firstItemDimension.baseSize + firstItemDimension.ratio * partSpace, 'first item has correct size');
          assert.equal($secondItem.width(), secondItemDimension.baseSize + secondItemDimension.ratio * partSpace, 'second item has correct size');
        });
        test('default shrink option', function(assert) {
          var firstItemDimension = {
            ratio: 1,
            baseSize: 160
          };
          var secondItemDimension = {
            ratio: 3,
            baseSize: 40
          };
          var thirdItemDimension = {ratio: 3};
          var boxSize = 100;
          var $box = createBox({
            direction: 'row',
            items: [firstItemDimension, secondItemDimension, thirdItemDimension],
            width: boxSize
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          var $thirdItem = $items.eq(2);
          var totalBaseSize = firstItemDimension.baseSize + secondItemDimension.baseSize;
          var firstItemWidth = boxSize * firstItemDimension.baseSize / totalBaseSize;
          var secondItemWidth = boxSize * secondItemDimension.baseSize / totalBaseSize;
          assert.equal($firstItem.width(), firstItemWidth, 'first item has correct size');
          assert.equal($secondItem.width(), secondItemWidth, 'second item has correct size');
          assert.equal($thirdItem.width(), 0, 'third item has correct size');
        });
        test('minSize & maxSize', function(assert) {
          var boxSize = 100;
          var minSize = 80;
          var maxSize = 5;
          var $box = createBox({
            items: [{
              baseSize: 0,
              ratio: 1,
              minSize: minSize
            }, {
              ratio: 1,
              maxSize: maxSize
            }, {ratio: 1}],
            direction: 'row',
            width: boxSize,
            height: boxSize
          });
          var $firstItem = $box.find('.' + BOX_ITEM_CLASS).eq(0);
          var $secondItem = $box.find('.' + BOX_ITEM_CLASS).eq(1);
          assert.equal($firstItem.width(), minSize, 'first item width is min-width');
          assert.equal($secondItem.width(), maxSize, 'second item width is max-width');
          $box.dxBox('option', 'direction', 'col');
          $firstItem = $box.find('.' + BOX_ITEM_CLASS).eq(0);
          $secondItem = $box.find('.' + BOX_ITEM_CLASS).eq(1);
          var $thirdItem = $box.find('.' + BOX_ITEM_CLASS).eq(2);
          assert.equal($firstItem.height(), minSize, 'first item height is min-height');
          assert.equal($secondItem.height(), maxSize, 'second item height is max-height');
          assert.equal($thirdItem.css('minHeight'), '0px', 'min-height is 0 by default');
        });
        test('rendering after visibility changing', function(assert) {
          var $box = createBox({
            direction: 'row',
            items: [{
              ratio: 1,
              baseSize: 0
            }, {
              ratio: 1,
              baseSize: 0
            }],
            visible: false
          });
          $box.parent().width(100);
          $box.dxBox('option', 'visible', true);
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $items.eq(0);
          var $secondItem = $items.eq(1);
          assert.equal($firstItem.width(), $box.width() / 2, 'first item has correct size');
          assert.equal($secondItem.width(), $box.width() / 2, 'second item has correct size');
        });
        test('shrink', function(assert) {
          var boxSize = 100;
          var itemBaseSize = 100;
          var shrinkRatio1 = 1;
          var shrinkRatio2 = 3;
          var $box = $('#box').height(boxSize).dxBox({
            direction: 'col',
            items: [{
              baseSize: boxSize,
              shrink: shrinkRatio1
            }, {
              baseSize: boxSize,
              shrink: shrinkRatio2
            }]
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.eq(0).height(), itemBaseSize - (itemBaseSize * 2 - boxSize) / (shrinkRatio1 + shrinkRatio2) * shrinkRatio1);
          assert.equal($items.eq(1).height(), itemBaseSize - (itemBaseSize * 2 - boxSize) / (shrinkRatio1 + shrinkRatio2) * shrinkRatio2);
        });
        test('shrink may be set to 0', function(assert) {
          var boxSize = 100;
          var firstItemSize = 75;
          var secondItemSize = 100;
          var firstItemShrink = 0;
          var secondItemShrink = 1;
          var $box = $('#box').height(boxSize).dxBox({
            direction: 'col',
            items: [{
              baseSize: firstItemSize,
              shrink: firstItemShrink
            }, {
              baseSize: secondItemSize,
              shrink: secondItemShrink
            }]
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.eq(0).height(), firstItemSize - (firstItemSize + secondItemSize - boxSize) / (firstItemShrink + secondItemShrink) * firstItemShrink);
          assert.equal($items.eq(1).height(), secondItemSize - (firstItemSize + secondItemSize - boxSize) / (firstItemShrink + secondItemShrink) * secondItemShrink);
        });
        test('total baseSize should be used when size is zero', function(assert) {
          var baseSize1 = 100;
          var baseSize2 = 200;
          var $box = createBox({
            direction: 'col',
            items: [{
              baseSize: baseSize1,
              ratio: 2
            }, {
              baseSize: baseSize2,
              ratio: 1
            }],
            height: 'auto'
          });
          assert.equal($box.height(), baseSize1 + baseSize2, 'box height calculated based on total baseSize');
        });
        test('baseSize in % in invisible area', function(assert) {
          var $box = $('#box').hide().dxBox({
            height: 100,
            direction: 'col',
            items: [{
              baseSize: '50%',
              ratio: 0
            }, {
              baseSize: '50%',
              ratio: 0
            }]
          });
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          var round = Math.round;
          $box.show();
          triggerShownEvent($box);
          assert.equal(round($items.eq(0).outerHeight()), round($box.outerHeight() * 0.5), 'first item has correct width');
          assert.equal(round($items.eq(0).outerHeight()), round($box.outerHeight() * 0.5), 'second item has correct width');
        });
        test('items size should be changed inside fieldset', function(assert) {
          var $box = $('#box');
          var $wrapper = $box.wrap('<fieldset>').parent();
          $wrapper.width(400);
          $box.dxBox({
            direction: 'row',
            items: [{
              baseSize: 0,
              ratio: 1
            }, {
              baseSize: 0,
              ratio: 1
            }]
          });
          $wrapper.width(200);
          var $items = $box.find('.' + BOX_ITEM_CLASS);
          assert.equal($items.eq(0).outerWidth(), 100, 'items rendered correctly');
        });
      });
      module('layouting in RTL', function() {
        test('align for row direction', function(assert) {
          var baseSize = 40;
          var boxSize = baseSize * 5;
          var $box = createBox({
            direction: 'row',
            align: 'start',
            items: [{baseSize: baseSize}, {baseSize: baseSize}],
            width: boxSize,
            rtlEnabled: true
          });
          var $boxItems = $box.find('.' + BOX_ITEM_CLASS);
          var $firstItem = $boxItems.eq(0);
          assert.equal(relativeOffset($firstItem).left, boxSize - baseSize, 'first item positioned correctly for align: start');
          var $secondItem = $boxItems.eq(1);
          assert.equal(relativeOffset($secondItem).left, boxSize - 2 * baseSize, 'second item positioned correctly for align: start');
          var box = getBoxInstance($box);
          box.option('align', 'end');
          assert.equal(relativeOffset($firstItem).left, baseSize, 'first item positioned correctly for align: end');
          assert.equal(relativeOffset($secondItem).left, 0, 'second item positioned correctly for align: end');
          box.option('align', 'center');
          assert.equal(relativeOffset($firstItem).left, (boxSize - 2 * baseSize) / 2 + baseSize, 'first item positioned correctly for align: center');
          assert.equal(relativeOffset($secondItem).left, (boxSize - 2 * baseSize) / 2, 'second item positioned correctly for align: center');
          box.option('align', 'space-between');
          assert.equal(relativeOffset($firstItem).left, boxSize - baseSize, 'first item positioned correctly for align: space-between');
          assert.equal(relativeOffset($secondItem).left, 0, 'second item positioned correctly for align: space-between');
          box.option('align', 'space-around');
          assert.equal(relativeOffset($firstItem).left, (boxSize / 2) + (boxSize / 2 - baseSize) / 2, 'first item positioned correctly for align: space-around');
          assert.equal(relativeOffset($secondItem).left, (boxSize / 2 - baseSize) / 2, 'second item positioned correctly for align: space-around');
        });
        test('crossAlign for column direction', function(assert) {
          var size = 50;
          var boxSize = 2 * size;
          var $box = createBox({
            direction: 'col',
            crossAlign: 'start',
            items: [{html: '<div style=\'width: ' + size + 'px\'></div>'}],
            width: boxSize,
            rtlEnabled: true
          });
          var box = getBoxInstance($box);
          var $item = $box.find('.' + BOX_ITEM_CLASS).eq(0);
          assert.equal(relativeOffset($item).left, size, 'item positioned for crossAlign: start');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'end');
          assert.equal(relativeOffset($item).left, 0, 'item positioned for crossAlign: end');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'center');
          assert.equal(relativeOffset($item).left, (boxSize - size) / 2, 'item positioned for crossAlign: center');
          assert.equal($item.width(), size, 'item is stretched over content');
          box.option('crossAlign', 'stretch');
          assert.equal(relativeOffset($item).left, 0, 'item positioned for crossAlign: stretch');
          assert.equal($item.width(), boxSize, 'element is stretched over container');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["events/visibility_change","jquery","ui/box","ui/scroll_view/ui.scrollable","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("events/visibility_change"), require("jquery"), require("ui/box"), require("ui/scroll_view/ui.scrollable"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=box.tests.js.map