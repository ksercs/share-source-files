!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/resizable.tests.js"], ["animation/translator","events/visibility_change","jquery","ui/resizable","../../helpers/pointerMock.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/resizable.tests.js", ["animation/translator", "events/visibility_change", "jquery", "ui/resizable", "../../helpers/pointerMock.js", "generic_light.css!"], function($__export) {
  "use strict";
  var translator,
      visibilityChange,
      $,
      pointerMock,
      RESIZABLE_HANDLE_CLASS,
      RESIZABLE_HANDLE_CORNER_CLASS,
      getHandle;
  return {
    setters: [function($__m) {
      translator = $__m.default;
    }, function($__m) {
      visibilityChange = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="resizable" style="height: 50px; width: 50px; position: absolute; box-sizing: border-box;"></div>\
        <div id="resizableAutoSize" style="height: auto; width: auto; position: absolute"><div style="height: 50px; width: 50px; box-sizing: border-box;"></div></div>\
        <div id="areaDiv" style="height: 100px; width:100px; position: absolute; box-sizing: border-box;"></div>';
        $('#qunit-fixture').html(markup);
      });
      RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
      RESIZABLE_HANDLE_CORNER_CLASS = 'dx-resizable-handle-corner';
      getHandle = function(direction) {
        return direction.indexOf('-') !== -1 ? $(("." + RESIZABLE_HANDLE_CORNER_CLASS + "-" + direction)) : $(("." + RESIZABLE_HANDLE_CLASS + "-" + direction));
      };
      QUnit.module('behavior', function() {
        ['none', '', undefined].forEach(function(handles) {
          QUnit.test(("no handle should be rendered if handles=" + handles), function(assert) {
            var $resizable = $('#resizable').dxResizable({handles: handles});
            assert.strictEqual($resizable.find(("." + RESIZABLE_HANDLE_CLASS)).length, 0, 'no handle is rendered');
          });
        });
        QUnit.test('resizable should have dx-resizable-resizing class while resizing', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'right'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          assert.ok(!$resizable.hasClass('dx-resizable-resizing'), 'element has not appropriate class before resizing');
          pointer.dragStart().drag(10, 0);
          assert.ok($resizable.hasClass('dx-resizable-resizing'), 'element has right class');
          pointer.dragEnd();
          assert.ok(!$resizable.hasClass('dx-resizable-resizing'), 'element has not appropriate class');
        });
        QUnit.test('drag on right handle should change width', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'right'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          var elementWidth = $resizable.outerWidth();
          pointer.dragStart().drag(10, 0);
          assert.equal($resizable.outerWidth(), elementWidth + 10, 'width of element was changed');
        });
        QUnit.test('drag on bottom handle should change height', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'bottom'});
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          var elementHeight = $resizable.outerHeight();
          pointer.dragStart().drag(0, 10);
          assert.equal($resizable.outerHeight(), elementHeight + 10, 'height of element was changed');
        });
        QUnit.test('drag on top handle should change height and top', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'top'});
          var $handle = getHandle('top');
          var pointer = pointerMock($handle).start();
          var elementHeight = $resizable.outerHeight();
          var elementTop = $resizable.offset().top;
          pointer.dragStart().drag(0, -10);
          assert.equal($resizable.outerHeight(), elementHeight + 10, 'height of element was changed');
          assert.equal($resizable.offset().top, elementTop - 10, 'top of element was changed');
        });
        QUnit.test('drag on top handle should not move the widget down', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            handles: 'top',
            height: 15,
            minHeight: 15
          });
          var $handle = getHandle('top');
          var pointer = pointerMock($handle).start();
          var elementHeight = $resizable.outerHeight();
          var elementTop = $resizable.offset().top;
          pointer.dragStart().drag(0, 10);
          assert.equal($resizable.outerHeight(), elementHeight, 'height of element was not changed');
          assert.equal($resizable.offset().top, elementTop, 'top of element was not changed');
        });
        QUnit.test('drag on left handle should not move the widget right', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            handles: 'left',
            width: 15,
            minWidth: 15
          });
          var $handle = getHandle('left');
          var pointer = pointerMock($handle).start();
          var elementWidth = $resizable.outerWidth();
          var elementLeft = $resizable.offset().left;
          pointer.dragStart().drag(10, 0);
          assert.equal($resizable.outerWidth(), elementWidth, 'height of element was not changed');
          assert.equal($resizable.offset().left, elementLeft, 'top of element was not changed');
        });
        QUnit.test('drag on handle should not break element position', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'left'});
          translator.move($resizable, {
            top: 100,
            left: 100
          });
          var $handle = getHandle('left');
          var elementLeft = $resizable.offset().left;
          pointerMock($handle).start().dragStart().drag(0, 0);
          assert.equal(elementLeft, $resizable.offset().left, 'element position is correct');
        });
        QUnit.test('resizable should change size correctly after several drag events', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'bottom right'});
          var $handle;
          var elementWidth = $resizable.outerWidth();
          var elementHeight = $resizable.outerHeight();
          $handle = getHandle('bottom');
          pointerMock($handle).start().dragStart().drag(0, 10).drag(0, 1);
          assert.equal($resizable.outerHeight(), elementHeight + 11, 'height of element was changed correctly');
          $handle = getHandle('right');
          pointerMock($handle).start().dragStart().drag(10, 0).drag(1, 0);
          assert.equal($resizable.outerWidth(), elementWidth + 11, 'width of element was changed correctly');
        });
      });
      QUnit.module('behavior with auto size', function() {
        QUnit.test('drag on left handle should not change height', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'left'});
          var $handle = getHandle('left');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(-10, 0);
          assert.equal($resizable[0].style.height, 'auto', 'height of element was not changed');
        });
        QUnit.test('drag on right handle should not change height', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'right'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(10, 0);
          assert.equal($resizable[0].style.height, 'auto', 'height of element was not changed');
        });
        QUnit.test('horizontal resize back to the start position should not change height', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'right'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(10, 0).drag(-10, 0);
          assert.strictEqual($resizable[0].style.height, 'auto', 'height of element was not changed');
        });
        QUnit.test('vertical resize back to the start position should not change width', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'bottom'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(0, 10).drag(0, -10);
          assert.strictEqual($resizable[0].style.width, 'auto', 'width of element was not changed');
        });
        QUnit.test('drag on top handle should not change width', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'top'});
          var $handle = getHandle('top');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(0, -10);
          assert.equal($resizable[0].style.width, 'auto', 'width of element was not changed');
        });
        QUnit.test('drag on bottom handle should not change width', function(assert) {
          var $resizable = $('#resizableAutoSize').dxResizable({handles: 'bottom'});
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(0, 10);
          assert.equal($resizable[0].style.width, 'auto', 'width of element was not changed');
        });
      });
      QUnit.module('drag integration', function() {
        QUnit.test('vertical handle should change only width', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'right'});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          var elementHeight = $resizable.outerHeight();
          pointer.down().move(0, 20);
          assert.equal($resizable.outerHeight(), elementHeight, 'height of element was not changed');
        });
        QUnit.test('horizontal handle should change only height', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'bottom'});
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          var elementWidth = $resizable.outerWidth();
          pointer.down().move(20, 0);
          assert.equal($resizable.outerWidth(), elementWidth, 'height of element was not changed');
        });
        QUnit.test('top left corner', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'top left'});
          var $handle = getHandle('top-left');
          var pointer = pointerMock($handle).start();
          var width = $resizable.outerWidth();
          var height = $resizable.outerHeight();
          var top = $resizable.offset().top;
          var left = $resizable.offset().left;
          pointer.down().move(-20, -20);
          assert.equal($resizable.outerWidth(), width + 20, 'width was enlarged');
          assert.equal($resizable.outerHeight(), height + 20, 'height was enlarged');
          assert.equal($resizable.offset().left, left - 20, 'top was reduced');
          assert.equal($resizable.offset().top, top - 20, 'left was reduced');
        });
        QUnit.test('top left corner with css maxWidth and minWidth', function(assert) {
          var $resizable = $('#resizable').css({
            maxWidth: 300,
            minWidth: 200,
            width: 250,
            maxHeight: 300,
            minHeight: 200,
            height: 250
          }).dxResizable({handles: 'top left'});
          var $handle = getHandle('top-left');
          var pointer = pointerMock($handle).start();
          var top = $resizable.offset().top;
          var left = $resizable.offset().left;
          pointer.down().move(-100, -100);
          assert.equal($resizable.outerWidth(), 300, 'width was enlarged');
          assert.equal($resizable.outerHeight(), 300, 'height was enlarged');
          assert.equal($resizable.offset().left, left - 50, 'top was reduced');
          assert.equal($resizable.offset().top, top - 50, 'left was reduced');
        });
        QUnit.test('top right corner', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'top right'});
          var $handle = getHandle('top-right');
          var pointer = pointerMock($handle).start();
          var width = $resizable.outerWidth();
          var height = $resizable.outerHeight();
          var top = $resizable.offset().top;
          var left = $resizable.offset().left;
          pointer.down().move(20, -20);
          assert.equal($resizable.outerWidth(), width + 20, 'width was enlarged');
          assert.equal($resizable.outerHeight(), height + 20, 'height was enlarged');
          assert.equal($resizable.offset().top, top - 20, 'top was reduced');
          assert.equal($resizable.offset().left, left, 'left was not changed');
        });
        QUnit.test('bottom left corner', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'bottom left'});
          var $handle = getHandle('bottom-left');
          var pointer = pointerMock($handle).start();
          var width = $resizable.outerWidth();
          var height = $resizable.outerHeight();
          var top = $resizable.offset().top;
          var left = $resizable.offset().left;
          pointer.down().move(-20, 20);
          assert.equal($resizable.outerWidth(), width + 20, 'width was enlarged');
          assert.equal($resizable.outerHeight(), height + 20, 'height was enlarged');
          assert.equal($resizable.offset().top, top, 'top was not changed');
          assert.equal($resizable.offset().left, left - 20, 'left was reduced');
        });
        QUnit.test('bottom right corner', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'bottom right'});
          var $handle = getHandle('bottom-right');
          var pointer = pointerMock($handle).start();
          var width = $resizable.outerWidth();
          var height = $resizable.outerHeight();
          var top = $resizable.offset().top;
          var left = $resizable.offset().left;
          pointer.down().move(20, 20);
          assert.equal($resizable.outerWidth(), width + 20, 'width was enlarged');
          assert.equal($resizable.outerHeight(), height + 20, 'height was enlarged');
          assert.equal($resizable.offset().top, top, 'top was not changed');
          assert.equal($resizable.offset().left, left, 'left was not changed');
        });
        QUnit.test('moved resizable should have correct position after drag', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'all'});
          translator.move($resizable, {
            top: 100,
            left: 100
          });
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          var elementOffset = $resizable.offset();
          pointer.dragStart().drag(20, 20);
          assert.equal(elementOffset.top, $resizable.offset().top, '');
          assert.equal(elementOffset.left, $resizable.offset().left, '');
        });
        QUnit.test('onResizeEnd right handle', function(assert) {
          assert.expect(2);
          $('#resizable').dxResizable({
            handles: 'all',
            'onResizeEnd': function(args) {
              assert.deepEqual(args.handles, {
                left: false,
                right: true,
                top: false,
                bottom: false
              }, 'right handle returns correct handles');
            }
          });
          var $handle = getHandle('right');
          var handlePointer = pointerMock($handle).start();
          handlePointer.dragStart().drag(20, 0).dragEnd();
          handlePointer.dragStart().drag(-40, 0).dragEnd();
        });
        QUnit.test('onResizeEnd left handle', function(assert) {
          assert.expect(2);
          $('#resizable').dxResizable({
            handles: 'all',
            'onResizeEnd': function(args) {
              assert.deepEqual(args.handles, {
                left: true,
                right: false,
                top: false,
                bottom: false
              }, 'left handle returns correct handles');
            }
          });
          var $handle = getHandle('left');
          var handlePointer = pointerMock($handle).start();
          handlePointer.dragStart().drag(20, 0).dragEnd();
          handlePointer.dragStart().drag(-40, 0).dragEnd();
        });
        QUnit.test('onResizeEnd top handle', function(assert) {
          assert.expect(2);
          $('#resizable').dxResizable({
            handles: 'all',
            'onResizeEnd': function(args) {
              assert.deepEqual(args.handles, {
                left: false,
                right: false,
                top: true,
                bottom: false
              }, 'top handle returns correct handles');
            }
          });
          var $handle = getHandle('top');
          var handlePointer = pointerMock($handle).start();
          handlePointer.dragStart().drag(0, 20).dragEnd();
          handlePointer.dragStart().drag(0, -40).dragEnd();
        });
        QUnit.test('onResizeEnd bottom handle', function(assert) {
          assert.expect(2);
          $('#resizable').dxResizable({
            handles: 'all',
            'onResizeEnd': function(args) {
              assert.deepEqual(args.handles, {
                left: false,
                right: false,
                top: false,
                bottom: true
              }, 'bottom handle returns correct handles');
            }
          });
          var $handle = getHandle('bottom');
          var handlePointer = pointerMock($handle).start();
          handlePointer.dragStart().drag(0, 20).dragEnd();
          handlePointer.dragStart().drag(0, -40).dragEnd();
        });
        QUnit.test('Resizable horizontal offset should be right when stepPrecision is strict', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            handles: 'right left',
            stepPrecision: 'strict',
            step: 40,
            width: 60
          });
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(20, 0);
          assert.equal($resizable.outerWidth(), 80, 'right offset - correct width');
          pointer.dragStart().drag(-20, 0);
          assert.equal($resizable.outerWidth(), 80, 'back offset - width didn\'t change');
          pointer.dragStart().drag(-40, 0);
          assert.equal($resizable.outerWidth(), 40, 'back offset - correct width');
          var $leftHandle = getHandle('left');
          var leftPointer = pointerMock($leftHandle).start();
          leftPointer.dragStart().drag(-40, 0);
          assert.equal($resizable.outerWidth(), 80, 'left offset - correct width');
        });
        QUnit.test('Resizable vertical offset should be right when stepPrecision is strict', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            handles: 'top bottom',
            stepPrecision: 'strict',
            step: 40,
            height: 60
          });
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(0, 20);
          assert.equal($resizable.outerHeight(), 80, 'bottom offset - correct width');
          pointer.dragStart().drag(0, -20);
          assert.equal($resizable.outerHeight(), 80, 'back offset - height didn\'t change');
          pointer.dragStart().drag(0, -40);
          assert.equal($resizable.outerHeight(), 40, 'back offset - correct height');
          var $topHandle = getHandle('top');
          var topPointer = pointerMock($topHandle).start();
          topPointer.dragStart().drag(0, -40);
          assert.equal($resizable.outerHeight(), 80, 'top offset - correct width');
        });
        QUnit.module('drag offset calculation', {
          beforeEach: function() {
            var $__2 = this;
            this.$resizable = $('#resizable').dxResizable({keepAspectRatio: false});
            this.cachedStyles = ['border', 'boxSizing', 'padding'].reduce(function(cache, prop) {
              cache[prop] = $__2.$resizable.css(prop);
              return cache;
            }, {});
            this.getRect = function() {
              return $__2.$resizable.get(0).getBoundingClientRect();
            };
          },
          afterEach: function() {
            this.$resizable.css(this.cachedStyles);
          }
        }, function() {
          [{
            border: '17px solid black',
            'box-sizing': 'content-box'
          }, {
            border: '17px solid black',
            'box-sizing': 'border-box'
          }, {
            padding: '17px',
            'box-sizing': 'content-box'
          }, {
            padding: '17px',
            'box-sizing': 'border-box'
          }].forEach(function(sizeStyles) {
            QUnit.test(("drag offset should be expected if " + JSON.stringify(sizeStyles)), function(assert) {
              $('#resizable').css(sizeStyles);
              var $rightBottomHandle = getHandle('bottom-right');
              var pointer = pointerMock($rightBottomHandle).start();
              var offsetX = 1;
              var offsetY = 3;
              var initialRect = this.getRect();
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, initialRect.width + offsetX, 'border is not included in x offset');
              assert.strictEqual(rect.height, initialRect.height + offsetY, 'border is not included in y offset');
            });
          });
        });
        [true, false].forEach(function(keepAspectRatio) {
          QUnit.module(("resize by non-corner handles if keepAspectRatio=" + keepAspectRatio), {
            beforeEach: function() {
              var $__2 = this;
              this.$resizable = $('#resizable');
              this.cachedStyles = ['left', 'top'].reduce(function(cache, prop) {
                cache[prop] = $__2.$resizable.css(prop);
                return cache;
              }, {});
              this.$resizable.css({
                left: 200,
                top: 200
              }).dxResizable({keepAspectRatio: keepAspectRatio});
              this.resizable = this.$resizable.dxResizable('instance');
              this.getRect = function() {
                return $__2.$resizable.get(0).getBoundingClientRect();
              };
              this.initialRect = this.getRect();
            },
            afterEach: function() {
              this.$resizable.css(this.cachedStyles);
            }
          }, function() {
            [1, -1].forEach(function(sign) {
              var offsetX = 10 * sign;
              var offsetY = 15 * sign;
              QUnit.test(("right handle - to the " + (sign > 0 ? 'right' : 'left')), function(assert) {
                var $handle = getHandle('right');
                var pointer = pointerMock($handle).start();
                pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.initialRect.width + offsetX, ("width is " + (sign > 0 ? 'increased' : 'decreased')));
                assert.strictEqual(rect.height, this.initialRect.height, 'height is not changed');
                assert.strictEqual(rect.right, this.initialRect.right + offsetX, ("right bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              });
              QUnit.test(("left handle - to the " + (sign > 0 ? 'right' : 'left')), function(assert) {
                var $handle = getHandle('left');
                var pointer = pointerMock($handle).start();
                pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.initialRect.width - offsetX, ("width is " + (sign > 0 ? 'decreased' : 'increased')));
                assert.strictEqual(rect.height, this.initialRect.height, 'height is not changed');
                assert.strictEqual(rect.left, this.initialRect.left + offsetX, ("left bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              });
              QUnit.test(("bottom handle - " + (sign > 0 ? 'down' : 'up')), function(assert) {
                var $handle = getHandle('bottom');
                var pointer = pointerMock($handle).start();
                pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.initialRect.width, 'width is not changed');
                assert.strictEqual(rect.height, this.initialRect.height + offsetY, ("height is " + (sign > 0 ? 'increased' : 'decreased')));
                assert.strictEqual(rect.bottom, this.initialRect.bottom + offsetY, ("bottom bound is moved " + (sign > 0 ? 'down' : 'up')));
              });
              QUnit.test(("top handle - " + (sign > 0 ? 'down' : 'up')), function(assert) {
                var $handle = getHandle('top');
                var pointer = pointerMock($handle).start();
                pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.initialRect.width, 'width is not changed');
                assert.strictEqual(rect.height, this.initialRect.height - offsetY, ("height is " + (sign > 0 ? 'decreased' : 'increased')));
                assert.strictEqual(rect.top, this.initialRect.top + offsetY, ("top bound is moved " + (sign > 0 ? 'down' : 'up')));
              });
            });
            QUnit.test('dimensions should be updated if handle is returned to the start position (offset = 0)', function(assert) {
              this.resizable.option('step', 20);
              var $handle = getHandle('right');
              var pointer = pointerMock($handle).start();
              pointer.dragStart().drag(20, 0).drag(-20, 0);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width, 'width is rerendered on start position');
              assert.strictEqual(rect.height, this.initialRect.height, 'height is rerendered on start position');
            });
            QUnit.test('horizontal resize should not be done is result offset is smaller than step', function(assert) {
              this.resizable.option({
                minWidth: 40,
                step: 20
              });
              var $handle = getHandle('right');
              var pointer = pointerMock($handle).start();
              pointer.dragStart().drag(-20, 0);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width, 'width is not changed(only resize by 10px can be done because of min width)');
            });
            QUnit.test('vertical resize should not be done is result offset is smaller than step', function(assert) {
              this.resizable.option({
                minHeight: 40,
                step: 20
              });
              var $handle = getHandle('right');
              var pointer = pointerMock($handle).start();
              pointer.dragStart().drag(0, -20);
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.initialRect.height, 'height is not changed(only resize by 10px can be done because of min height)');
            });
          });
        });
        QUnit.module('resize by corner handles if keepAspectRatio=false', {
          beforeEach: function() {
            var $__2 = this;
            this.$resizable = $('#resizable');
            this.cachedStyles = ['left, top'].reduce(function(cache, prop) {
              cache[prop] = $__2.$resizable.css(prop);
              return cache;
            }, {});
            this.$resizable.css({
              left: 200,
              top: 200
            }).dxResizable({keepAspectRatio: false});
            this.getRect = function() {
              return $__2.$resizable.get(0).getBoundingClientRect();
            };
            this.initialRect = this.getRect();
          },
          afterEach: function() {
            this.$resizable.css(this.cachedStyles);
          }
        }, function() {
          [1, -1].forEach(function(sign) {
            QUnit.test(("bottom-right handle - " + (sign > 0 ? 'outside' : 'inside')), function(assert) {
              var $handle = getHandle('bottom-right');
              var pointer = pointerMock($handle).start();
              var offsetX = 10 * sign;
              var offsetY = 15 * sign;
              var dimensionChange = sign > 0 ? 'increased' : 'decreased';
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width + offsetX, ("width is " + dimensionChange));
              assert.strictEqual(rect.height, this.initialRect.height + offsetY, ("height is " + dimensionChange));
              assert.strictEqual(rect.right, this.initialRect.right + offsetX, ("right bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              assert.strictEqual(rect.bottom, this.initialRect.bottom + offsetY, ("bottom bound is moved " + (sign > 0 ? 'down' : 'up')));
            });
            QUnit.test(("bottom-left handle - " + (sign > 0 ? 'inside' : 'outside')), function(assert) {
              var $handle = getHandle('bottom-left');
              var pointer = pointerMock($handle).start();
              var offsetX = 10 * sign;
              var offsetY = 15 * sign * -1;
              var dimensionChange = sign > 0 ? 'decreased' : 'increased';
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width - offsetX, ("width is " + dimensionChange));
              assert.strictEqual(rect.height, this.initialRect.height + offsetY, ("height is " + dimensionChange));
              assert.strictEqual(rect.left, this.initialRect.left + offsetX, ("left bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              assert.strictEqual(rect.bottom, this.initialRect.bottom + offsetY, ("bottom bound is moved to the " + (sign > 0 ? 'right' : 'left')));
            });
            QUnit.test(("top-right handle - " + (sign > 0 ? 'outside' : 'inside')), function(assert) {
              var $handle = getHandle('top-right');
              var pointer = pointerMock($handle).start();
              var offsetX = 10 * sign;
              var offsetY = 15 * sign * -1;
              var dimensionChange = sign > 0 ? 'increased' : 'decreased';
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width + offsetX, ("width is " + dimensionChange));
              assert.strictEqual(rect.height, this.initialRect.height - offsetY, ("height is " + dimensionChange));
              assert.strictEqual(rect.right, this.initialRect.right + offsetX, ("right bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              assert.strictEqual(rect.top, this.initialRect.top + offsetY, ("top bound is moved " + (sign > 0 ? 'up' : 'down')));
            });
            QUnit.test(("top-left handle - " + (sign > 0 ? 'inside' : 'outside')), function(assert) {
              var $handle = getHandle('top-left');
              var pointer = pointerMock($handle).start();
              var offsetX = 10 * sign;
              var offsetY = 15 * sign;
              var dimensionChange = sign > 0 ? 'decreased' : 'increased';
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width - offsetX, ("width is " + dimensionChange));
              assert.strictEqual(rect.height, this.initialRect.height - offsetY, ("height is " + dimensionChange));
              assert.strictEqual(rect.left, this.initialRect.left + offsetX, ("left bound is moved to the " + (sign > 0 ? 'right' : 'left')));
              assert.strictEqual(rect.top, this.initialRect.top + offsetY, ("top bound is moved " + (sign > 0 ? 'down' : 'up')));
            });
          });
        });
        QUnit.module('resize by corner handles if keepAspectRatio=true', {
          beforeEach: function() {
            var $__2 = this;
            this.$resizable = $('#resizable');
            this.cachedStyles = ['left', 'top', 'width', 'height', 'boxSizing'].reduce(function(cache, prop) {
              cache[prop] = $__2.$resizable.css(prop);
              return cache;
            }, {});
            this.$resizable.css({
              left: 200,
              top: 200,
              width: 100,
              height: 50,
              boxSizing: 'content-box'
            }).dxResizable({keepAspectRatio: true});
            this.resizable = this.$resizable.dxResizable('instance');
            this.getRect = function() {
              return $__2.$resizable.get(0).getBoundingClientRect();
            };
            this.width = 100;
            this.height = 50;
            this.widthToHeightRatio = this.width / this.height;
            this.heightToWidthRatio = this.height / this.width;
            this.initialRect = this.getRect();
          },
          afterEach: function() {
            this.$resizable.css(this.cachedStyles);
          }
        }, function() {
          QUnit.module('bottom-right handle', {beforeEach: function() {
              this.$handle = getHandle('bottom-right');
              this.pointer = pointerMock(this.$handle).start();
            }}, function() {
            QUnit.test('move to I coordinate quarter', function(assert) {
              var offsetX = 6;
              var offsetY = -17;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaX = offsetX;
              var deltaY = deltaX * this.heightToWidthRatio;
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.width + deltaX, 'width in increased');
              assert.strictEqual(rect.height, this.height + deltaY, 'height is increased proportionally');
            });
            QUnit.test('move to II coordinate quarter', function(assert) {
              var offsetX = -6;
              var offsetY = -17;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaX = offsetX;
              var deltaY = deltaX * this.heightToWidthRatio;
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.width + deltaX, 'width in decreased');
              assert.strictEqual(rect.height, this.height + deltaY, 'height is decreased proportionally');
            });
            QUnit.test('move to III coordinate quarter', function(assert) {
              var offsetX = -6;
              var offsetY = 10;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaY = offsetY;
              var deltaX = deltaY * this.widthToHeightRatio;
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height + deltaY, 'height is increased');
              assert.strictEqual(rect.width, this.width + deltaX, 'width in increased proportionally');
            });
            QUnit.test('move to IV coordinate quarter', function(assert) {
              var offsetX = 6;
              var offsetY = 10;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaY = offsetY;
              var deltaX = deltaY * this.widthToHeightRatio;
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height + deltaY, 'height is increased');
              assert.strictEqual(rect.width, this.width + deltaX, 'width in increased proportionally');
            });
            [[0, -15], [-15, 0]].forEach(function($__3) {
              var $__5,
                  $__6;
              var $__4 = $__3,
                  offsetX = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                  offsetY = ($__6 = $__5.next()).done ? void 0 : $__6.value;
              QUnit.test(("no dimension decreasing resize if " + (offsetX === 0 ? 'X' : 'Y') + " offset = 0"), function(assert) {
                this.pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.width, 'width is not changed');
                assert.strictEqual(rect.height, this.height, 'height is not changed');
              });
            });
            QUnit.test('max possible proportional resize should be done if max height is exceeded', function(assert) {
              var maxHeight = 60;
              this.resizable.option({maxHeight: maxHeight});
              this.pointer.dragStart().drag(100, 30);
              var rect = this.getRect();
              assert.strictEqual(rect.height, maxHeight, 'height is max');
              assert.strictEqual(rect.width, maxHeight * this.widthToHeightRatio, 'width is increased proportionally to height');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
            QUnit.test('max possible proportional resize should be done if max width is exceeded', function(assert) {
              var maxWidth = 150;
              this.resizable.option({maxWidth: maxWidth});
              this.pointer.dragStart().drag(300, 600);
              var rect = this.getRect();
              assert.strictEqual(rect.width, maxWidth, 'width is max');
              assert.strictEqual(rect.height, maxWidth * this.heightToWidthRatio, 'height is increased proportonally to width');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
            QUnit.test('max possible proportional resize should be done if min width is exceeded', function(assert) {
              var minWidth = 80;
              this.resizable.option({minWidth: minWidth});
              this.pointer.dragStart().drag(-300, -600);
              var rect = this.getRect();
              assert.strictEqual(rect.width, minWidth, 'width is min');
              assert.strictEqual(rect.height, minWidth * this.heightToWidthRatio, 'height is decreased proportonally to width');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
            QUnit.test('max possible proportional resize should be done if min height is exceeded', function(assert) {
              var minHeight = 40;
              this.resizable.option({minHeight: minHeight});
              this.pointer.dragStart().drag(-300, -600);
              var rect = this.getRect();
              assert.strictEqual(rect.height, minHeight, 'height is min');
              assert.strictEqual(rect.width, minHeight * this.widthToHeightRatio, 'width is decreased proportionally to height');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
            QUnit.test('no resize should be done if it can not be proportional', function(assert) {
              var minHeight = 50;
              this.resizable.option({minHeight: minHeight});
              this.pointer.dragStart().drag(-2, -1);
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height, 'height is not changed');
              assert.strictEqual(rect.width, this.width, 'width is not changed');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
            QUnit.test('dimensions should be updated if handle is returned to the start position (offset = 0)', function(assert) {
              this.resizable.option('step', 20);
              var $handle = getHandle('bottom-right');
              var pointer = pointerMock($handle).start();
              pointer.dragStart().drag(20, 20).drag(-20, -20);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width, 'width is rerendered on start position');
              assert.strictEqual(rect.height, this.initialRect.height, 'height is rerendered on start position');
            });
            QUnit.test('step should not affect proportional resize', function(assert) {
              this.resizable.option('step', 50);
              var $handle = getHandle('bottom-right');
              var pointer = pointerMock($handle).start();
              var offsetX = 40;
              var offsetY = 20;
              pointer.dragStart().drag(offsetX, offsetY);
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.initialRect.width + offsetX, 'width is changed');
              assert.strictEqual(rect.height, this.initialRect.height + offsetY, 'height is changed');
            });
          });
          QUnit.module('top-left handle', {beforeEach: function() {
              this.$handle = getHandle('top-left');
              this.pointer = pointerMock(this.$handle).start();
            }}, function() {
            QUnit.test('move to I coordinate quarter', function(assert) {
              var offsetX = 6;
              var offsetY = -17;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaX = offsetY * this.widthToHeightRatio;
              var deltaY = offsetY;
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.width - deltaX, 'width in increased proportionally');
              assert.strictEqual(rect.height, this.height - deltaY, 'height is increased');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top is moved up');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left is moved to the left');
            });
            QUnit.test('move to II coordinate quarter', function(assert) {
              var offsetX = -6;
              var offsetY = -17;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaX = offsetY * this.widthToHeightRatio;
              var deltaY = offsetY;
              var rect = this.getRect();
              assert.strictEqual(rect.width, this.width - deltaX, 'width in increased');
              assert.strictEqual(rect.height, this.height - deltaY, 'height is increased proportionally');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top is moved up');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left is moved to the left');
            });
            QUnit.test('move to III coordinate quarter', function(assert) {
              var offsetX = -6;
              var offsetY = 10;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaX = offsetX;
              var deltaY = offsetX * this.heightToWidthRatio;
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height - deltaY, 'height is increased');
              assert.strictEqual(rect.width, this.width - deltaX, 'width in increased proportionally');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left is moved to the left');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top is moved up');
            });
            QUnit.test('move to IV coordinate quarter', function(assert) {
              var offsetX = 6;
              var offsetY = 10;
              this.pointer.dragStart().drag(offsetX, offsetY);
              var deltaY = offsetX * this.heightToWidthRatio;
              var deltaX = offsetX;
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height - deltaY, 'height is decreased');
              assert.strictEqual(rect.width, this.width - deltaX, 'width in decreased proportionally');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left is moved to the right');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top is moved down');
            });
            [[0, 15], [15, 0]].forEach(function($__3) {
              var $__5,
                  $__6;
              var $__4 = $__3,
                  offsetX = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
                  offsetY = ($__6 = $__5.next()).done ? void 0 : $__6.value;
              QUnit.test(("no dimension decreasing resize if " + (offsetX === 0 ? 'X' : 'Y') + " offset = 0"), function(assert) {
                this.pointer.dragStart().drag(offsetX, offsetY);
                var rect = this.getRect();
                assert.strictEqual(rect.width, this.width, 'width is not changed');
                assert.strictEqual(rect.height, this.height, 'height is not changed');
              });
            });
            QUnit.test('max possible proportional resize should be done if max height is exceeded', function(assert) {
              var maxHeight = 60;
              this.resizable.option({maxHeight: maxHeight});
              this.pointer.dragStart().drag(-100, -30);
              var deltaY = -10;
              var deltaX = -20;
              var rect = this.getRect();
              assert.strictEqual(rect.height, maxHeight, 'height is max');
              assert.strictEqual(rect.width, maxHeight * this.widthToHeightRatio, 'width is increased proportionally to height');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top coordinate is moved up');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left coordinate is moved to the left');
            });
            QUnit.test('max possible proportional resize should be done if max width is exceeded', function(assert) {
              var maxWidth = 150;
              this.resizable.option({maxWidth: maxWidth});
              this.pointer.dragStart().drag(-300, -600);
              var deltaX = -50;
              var deltaY = -25;
              var rect = this.getRect();
              assert.strictEqual(rect.width, maxWidth, 'width is max');
              assert.strictEqual(rect.height, maxWidth * this.heightToWidthRatio, 'height is increased proportonally to width');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top coordinate is moved up');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left coordinate is moved to the left');
            });
            QUnit.test('max possible proportional resize should be done if min width is exceeded', function(assert) {
              var minWidth = 80;
              this.resizable.option({minWidth: minWidth});
              this.pointer.dragStart().drag(300, 600);
              var deltaX = 20;
              var deltaY = 10;
              var rect = this.getRect();
              assert.strictEqual(rect.width, minWidth, 'width is min');
              assert.strictEqual(rect.height, minWidth * this.heightToWidthRatio, 'height is decreased proportonally to width');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top coordinate is moved down');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left coordinate is moved to the right');
            });
            QUnit.test('max possible proportional resize should be done if min height is exceeded', function(assert) {
              var minHeight = 40;
              this.resizable.option({minHeight: minHeight});
              this.pointer.dragStart().drag(300, 600);
              var deltaX = 20;
              var deltaY = 10;
              var rect = this.getRect();
              assert.strictEqual(rect.height, minHeight, 'height is min');
              assert.strictEqual(rect.width, minHeight * this.widthToHeightRatio, 'width is decreased proportionally to height');
              assert.strictEqual(rect.top, this.initialRect.top + deltaY, 'top coordinate is moved down');
              assert.strictEqual(rect.left, this.initialRect.left + deltaX, 'left coordinate is moved to the right');
            });
            QUnit.test('no resize should be done if it can not be proportional', function(assert) {
              var minHeight = 50;
              this.resizable.option({minHeight: minHeight});
              this.pointer.dragStart().drag(2, 1);
              var rect = this.getRect();
              assert.strictEqual(rect.height, this.height, 'height is not changed');
              assert.strictEqual(rect.width, this.width, 'width is not changed');
              assert.strictEqual(rect.top, this.initialRect.top, 'top coordinate is not changed');
              assert.strictEqual(rect.left, this.initialRect.left, 'left coordinate is not changed');
            });
          });
        });
        QUnit.module('proportional resize: proportionated dimension should be fitted to the area', {
          beforeEach: function() {
            var $__2 = this;
            this.$resizable = $('#resizable');
            this.cachedStyles = ['left', 'top', 'width', 'height'].reduce(function(cache, prop) {
              cache[prop] = $__2.$resizable.css(prop);
              return cache;
            }, {});
            this.$area = $('#areaDiv');
            this.areaRect = this.$area.get(0).getBoundingClientRect();
            this.getRect = function() {
              return $__2.$resizable.get(0).getBoundingClientRect();
            };
          },
          afterEach: function() {
            this.$resizable.css(this.cachedStyles);
          }
        }, function() {
          QUnit.test('bottom-right handler - to the right', function(assert) {
            var $__3 = this.areaRect,
                areaBottom = $__3.bottom,
                areaRight = $__3.right;
            var width = 50;
            var height = 75;
            var left = 30;
            var top = 20;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('bottom-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(areaRight - initialRect.right, 0);
            var rect = this.getRect();
            assert.strictEqual(rect.height, height + areaBottom - initialRect.bottom, 'height is fitted to the area');
          });
          QUnit.test('bottom-right handler - down', function(assert) {
            var $__3 = this.areaRect,
                areaBottom = $__3.bottom,
                areaRight = $__3.right;
            var width = 75;
            var height = 50;
            var left = 20;
            var top = 30;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('bottom-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(0, areaBottom - initialRect.bottom);
            var rect = this.getRect();
            assert.strictEqual(rect.width, width + areaRight - initialRect.right, 'width is fitted to the area');
          });
          QUnit.test('top-right handler - up', function(assert) {
            var $__3 = this.areaRect,
                areaTop = $__3.top,
                areaRight = $__3.right;
            var width = 75;
            var height = 50;
            var left = 20;
            var top = 30;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('top-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(0, -(initialRect.top - areaTop));
            var rect = this.getRect();
            assert.strictEqual(rect.width, width + areaRight - initialRect.right, 'width is fitted to the area');
          });
          QUnit.test('top-right handler - to the right', function(assert) {
            var $__3 = this.areaRect,
                areaTop = $__3.top,
                areaRight = $__3.right;
            var width = 50;
            var height = 75;
            var left = 30;
            var top = 15;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('top-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(areaRight - initialRect.right, 0);
            var rect = this.getRect();
            assert.strictEqual(rect.height, height + initialRect.top - areaTop, 'height is fitted to the area');
          });
          QUnit.test('top-left handler - up', function(assert) {
            var $__3 = this.areaRect,
                areaTop = $__3.top,
                areaLeft = $__3.left;
            var width = 75;
            var height = 50;
            var left = 5;
            var top = 15;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('top-left');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(0, -(initialRect.top - areaTop));
            var rect = this.getRect();
            assert.strictEqual(rect.width, width + initialRect.left - areaLeft, 'width is fitted to the area');
          });
          QUnit.test('top-left handler - to the left', function(assert) {
            var $__3 = this.areaRect,
                areaTop = $__3.top,
                areaLeft = $__3.left;
            var width = 50;
            var height = 75;
            var left = 30;
            var top = 15;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('top-left');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(-(initialRect.left - areaLeft), 0);
            var rect = this.getRect();
            assert.strictEqual(rect.height, height + initialRect.top - areaTop, 'height is fitted to the area');
          });
          QUnit.test('bottom-left handler - to the left', function(assert) {
            var $__3 = this.areaRect,
                areaBottom = $__3.bottom,
                areaLeft = $__3.left;
            var width = 50;
            var height = 75;
            var left = 30;
            var top = 15;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('bottom-left');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(-(initialRect.left - areaLeft), 0);
            var rect = this.getRect();
            assert.strictEqual(rect.height, height + areaBottom - initialRect.bottom, 'height is fitted to the area');
          });
          QUnit.test('bottom-left handler - down', function(assert) {
            var $__3 = this.areaRect,
                areaBottom = $__3.bottom,
                areaLeft = $__3.left;
            var width = 75;
            var height = 50;
            var left = 5;
            var top = 15;
            this.$resizable.css({
              width: width,
              height: height,
              left: left,
              top: top
            }).dxResizable({
              keepAspectRatio: true,
              area: this.$area
            });
            var initialRect = this.getRect();
            var $handle = getHandle('bottom-left');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(0, areaBottom - initialRect.bottom);
            var rect = this.getRect();
            assert.strictEqual(rect.width, width + initialRect.left - areaLeft, 'width is fitted to the area');
          });
        });
      });
      QUnit.module('options', function() {
        QUnit.test('disabled option', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            disabled: true,
            width: 50
          });
          var pointerDrag = function() {
            var pointer = pointerMock(getHandle('right')).start();
            pointer.dragStart().drag(-10, 0);
          };
          pointerDrag();
          assert.equal($resizable.outerWidth(), 50, 'resizable was not updated');
          $resizable.dxResizable('option', 'disabled', false);
          pointerDrag();
          assert.equal($resizable.outerWidth(), 40, 'resizable was updated');
          $resizable.dxResizable('option', 'disabled', true);
          pointerDrag();
          assert.equal($resizable.outerWidth(), 40, 'resizable was not updated');
        });
        QUnit.test('dx-state-disabled class', function(assert) {
          var $resizable = $('#resizable').dxResizable({width: 50});
          var pointerDrag = function() {
            var pointer = pointerMock(getHandle('right')).start();
            pointer.down().move(-10, 0).up();
          };
          $resizable.addClass('dx-state-disabled');
          pointerDrag();
          assert.equal($resizable.outerWidth(), 50, 'resizable was not updated');
          $resizable.removeClass('dx-state-disabled');
          pointerDrag();
          assert.equal($resizable.outerWidth(), 40, 'resizable was updated');
        });
        QUnit.test('min/max width option', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            minWidth: 50,
            maxWidth: 60
          });
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          $resizable.width(55);
          pointer.dragStart().drag(-10, 0);
          assert.equal($resizable.outerWidth(), 50, 'width of the resizable should be set to minWidth');
          pointer.dragStart().drag(30, 0);
          assert.equal($resizable.outerWidth(), 60, 'width of the resizable should be set to maxWidth');
        });
        QUnit.test('min/max height option', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            minHeight: 50,
            maxHeight: 60
          });
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          $resizable.height(55);
          pointer.dragStart().drag(0, -10);
          assert.equal($resizable.outerHeight(), 50, 'height of the resizable should be set to minWidth');
          pointer.dragStart().drag(0, 30);
          assert.equal($resizable.outerHeight(), 60, 'height of the resizable should be set to maxWidth');
        });
        QUnit.test('min/max width option change should change element width', function(assert) {
          var $resizable = $('#resizable').dxResizable({minWidth: 30});
          var resizable = $resizable.dxResizable('instance');
          assert.equal($resizable.outerWidth(), 50, 'width of the resizable should not be changed');
          resizable.option('minWidth', 70);
          assert.equal($resizable.outerWidth(), 70, 'width of the resizable should be set to minWidth');
        });
        QUnit.test('min/max height option change should change element height', function(assert) {
          var $resizable = $('#resizable').dxResizable({minHeight: 30});
          var resizable = $resizable.dxResizable('instance');
          assert.equal($resizable.outerHeight(), 50, 'height of the resizable should not be changed');
          resizable.option('minHeight', 70);
          assert.equal($resizable.outerHeight(), 70, 'height of the resizable should be set to minWidth');
        });
        QUnit.test('horizontal grid step', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            step: '10 7',
            width: 50
          });
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(12, 0).dragEnd();
          assert.equal($resizable.outerWidth(), 60, 'grid step forward');
        });
        QUnit.test('vertical grid step', function(assert) {
          var $resizable = $('#resizable').dxResizable({
            step: '7 10',
            height: 50
          });
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(0, 12).dragEnd();
          assert.equal($resizable.outerHeight(), 60, 'grid step forward');
        });
      });
      QUnit.module('area', function() {
        QUnit.test('element bottom boundary', function(assert) {
          var $resizable = $('#resizable').dxResizable({area: $('#areaDiv')});
          var $handle = getHandle('bottom');
          var pointer = pointerMock($handle).start();
          var areaBottomBoundary = $('#areaDiv').offset().top + $('#areaDiv').outerHeight();
          pointer.down().move(0, 70).dragEnd();
          var resizableBottomBoundary = $resizable.offset().top + $resizable.outerHeight();
          assert.equal(resizableBottomBoundary, areaBottomBoundary, 'resizable did not go outside of the area');
        });
        QUnit.test('top boundary', function(assert) {
          var $resizable = $('#resizable').dxResizable({area: $('#areaDiv')});
          var $handle = getHandle('top');
          var pointer = pointerMock($handle).start();
          var areaTopBoundary = $('#areaDiv').offset().top;
          pointer.down().move(0, -70).dragEnd();
          var resizableTopBoundary = $resizable.offset().top;
          assert.equal(resizableTopBoundary, areaTopBoundary, 'resizable did not go outside of the area');
        });
        QUnit.test('left boundary', function(assert) {
          var $resizable = $('#resizable').dxResizable({area: $('#areaDiv')});
          var $handle = getHandle('left');
          var pointer = pointerMock($handle).start();
          var areaLeftBoundary = $('#areaDiv').offset().left;
          pointer.down().move(-50, 0).dragEnd();
          var resizableLeftBoundary = $resizable.offset().left;
          assert.equal(resizableLeftBoundary, areaLeftBoundary, 'resizable did not go outside of the area');
        });
        QUnit.test('right boundary', function(assert) {
          var $resizable = $('#resizable').dxResizable({area: function() {
              return $('#areaDiv');
            }});
          var $handle = getHandle('right');
          var pointer = pointerMock($handle).start();
          var areaRightBoundary = $('#areaDiv').offset().left + $('#areaDiv').outerWidth();
          pointer.down().move(70, 0).dragEnd();
          var resizableRightBoundary = $resizable.offset().left + $resizable.outerWidth();
          assert.equal(resizableRightBoundary, areaRightBoundary, 'resizable did not go outside of the area');
        });
        QUnit.test('borders should be included in drag offset', function(assert) {
          var $area = $('#areaDiv');
          var $resizable = $('#resizable').dxResizable({area: function() {
              return $area;
            }});
          $area.css('border', '6px solid red');
          $resizable.css('border', '8px solid red');
          pointerMock(getHandle('left')).start().down().move(-70, 0).dragEnd();
          assert.equal($resizable.offset().left, $area.offset().left + 6);
          pointerMock(getHandle('top')).start().down().move(0, -70).dragEnd();
          assert.equal($resizable.offset().top, $area.offset().top + 6);
          pointerMock(getHandle('right')).start().down().move(70, 0).dragEnd();
          assert.equal($resizable.offset().left + $resizable.outerWidth(), $area.offset().left + 6 + $area.innerWidth());
          pointerMock(getHandle('bottom')).start().down().move(0, 70).dragEnd();
          assert.equal($resizable.offset().top + $resizable.outerHeight(), $area.offset().top + 6 + $area.innerHeight());
        });
        QUnit.test('It should be possible to set area as object with coordinates', function(assert) {
          var $area = $('#areaDiv');
          var areaOffset = $area.offset();
          var areaOffsetLeft = areaOffset.left;
          var areaOffsetTop = areaOffset.top;
          var $resizable = $('#resizable').dxResizable({area: function() {
              return {
                left: areaOffsetLeft,
                top: areaOffsetTop,
                right: areaOffsetLeft + $area.outerWidth(),
                bottom: areaOffsetTop + $area.outerHeight()
              };
            }});
          pointerMock(getHandle('left')).start().down().move(-70, 0).dragEnd();
          assert.equal($resizable.offset().left, areaOffsetLeft);
          pointerMock(getHandle('top')).start().down().move(0, -70).dragEnd();
          assert.equal($resizable.offset().top, areaOffsetTop);
        });
        QUnit.test('Borders should be included in drag offset if area is object with coordinates', function(assert) {
          var $area = $('#areaDiv');
          var areaOffset = $area.offset();
          var areaOffsetLeft = areaOffset.left;
          var areaOffsetTop = areaOffset.top;
          var $resizable = $('#resizable').dxResizable({area: function() {
              return {
                left: areaOffsetLeft,
                top: areaOffsetTop,
                right: areaOffsetLeft + $area.outerWidth(),
                bottom: areaOffsetTop + $area.outerHeight()
              };
            }});
          $resizable.css('border', '8px solid red');
          pointerMock(getHandle('left')).start().down().move(-70, 0).dragEnd();
          assert.equal($resizable.offset().left, areaOffsetLeft);
          pointerMock(getHandle('top')).start().down().move(0, -70).dragEnd();
          assert.equal($resizable.offset().top, areaOffsetTop);
          pointerMock(getHandle('right')).start().down().move(70, 0).dragEnd();
          assert.equal($resizable.offset().left + $resizable.outerWidth(), areaOffsetLeft + $area.innerWidth());
          pointerMock(getHandle('bottom')).start().down().move(0, 70).dragEnd();
          assert.equal($resizable.offset().top + $resizable.outerHeight(), areaOffsetTop + $area.innerHeight());
        });
        QUnit.test('Area can be a window', function(assert) {
          $('#resizable').offset({
            left: 150,
            top: 150
          });
          var $resizable = $('#resizable').dxResizable({area: $(window)});
          var resizableLeft = $resizable.offset().left;
          var resizableTop = $resizable.offset().top;
          $resizable.css('border', '8px solid red');
          pointerMock(getHandle('left')).start().down().move(-20, 0).dragEnd();
          assert.equal($resizable.offset().left, resizableLeft - 20);
          pointerMock(getHandle('top')).start().down().move(0, -20).dragEnd();
          assert.equal($resizable.offset().top, resizableTop - 20);
          var resizableRight = $resizable.offset().left + $resizable.outerWidth();
          var resizableBottom = $resizable.offset().top + $resizable.outerHeight();
          pointerMock(getHandle('right')).start().down().move(20, 0).dragEnd();
          assert.equal($resizable.offset().left + $resizable.outerWidth(), resizableRight + 20);
          pointerMock(getHandle('bottom')).start().down().move(0, 20).dragEnd();
          assert.equal($resizable.offset().top + $resizable.outerHeight(), resizableBottom + 20);
        });
        QUnit.test('resizing with "window" area that have a scroll offset', function(assert) {
          var scrollY = 1500;
          var scrollX = 2500;
          var $resizable = $('#resizable').offset({
            left: scrollX + 150,
            top: scrollY + 150
          }).css('border', '8px solid red');
          var $fixtureElement = $('<div>').height(3000).width(3000).appendTo('body');
          $(window).scrollTop(scrollY).scrollLeft(scrollX);
          $resizable.dxResizable({area: $(window)});
          pointerMock(getHandle('left')).start({
            x: scrollX,
            y: scrollY
          }).down().move(-20, 0).dragEnd();
          assert.strictEqual($resizable.outerWidth(), 70, 'width changed correctly');
          pointerMock(getHandle('top')).start({
            x: scrollX,
            y: scrollY
          }).down().move(0, -20).dragEnd();
          assert.strictEqual($resizable.outerHeight(), 70, 'height changed correctly');
          $fixtureElement.remove();
        });
      });
      QUnit.module('actions', function() {
        QUnit.test('onResizeStart action should be fired on resize start', function(assert) {
          var $resizable = $('#resizable').dxResizable({onResizeStart: function(e) {
              assert.ok(true, 'onResizeStart action fired');
              assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
              assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
            }});
          var $handle = getHandle('bottom-right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart();
        });
        QUnit.test('onResizeStart - subscription by "on" method', function(assert) {
          assert.expect(3);
          var resizeStartHandler = function(e) {
            assert.ok(true, 'onResizeStart action fired');
            assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
            assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
          };
          var resize = function() {
            var $handle = getHandle('bottom-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart();
          };
          var $resizable = $('#resizable').dxResizable();
          var instance = $resizable.dxResizable('instance');
          instance.on('resizeStart', resizeStartHandler);
          resize();
          instance.off('resizeStart', resizeStartHandler);
          resize();
        });
        QUnit.test('onResize action should be fired during resize', function(assert) {
          assert.expect(3);
          var $resizable = $('#resizable').dxResizable({onResize: function(e) {
              assert.ok(true, 'onResize action fired');
              assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
              assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
            }});
          var $handle = getHandle('bottom-right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(10, 0);
        });
        QUnit.test('onResize action - subscription by "on" method', function(assert) {
          assert.expect(3);
          var resizeHandler = function(e) {
            assert.ok(true, 'onResize action fired');
            assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
            assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
          };
          var resize = function() {
            var $handle = getHandle('bottom-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(10, 0);
          };
          var $resizable = $('#resizable').dxResizable();
          var instance = $resizable.dxResizable('instance');
          instance.on('resize', resizeHandler);
          resize();
          instance.off('resize', resizeHandler);
          resize();
        });
        QUnit.test('dxresize event should be fired during resize', function(assert) {
          $('#resizable').dxResizable();
          var $handle = getHandle('bottom-right');
          var pointer = pointerMock($handle).start();
          var triggerFunction = visibilityChange.triggerResizeEvent;
          assert.expect(1);
          try {
            visibilityChange.triggerResizeEvent = function() {
              assert.ok(true, 'event triggered');
            };
            pointer.dragStart().drag(10, 0);
          } finally {
            visibilityChange.triggerResizeEvent = triggerFunction;
          }
        });
        QUnit.test('onResize action should be fired with correct args when oversizing', function(assert) {
          assert.expect(2);
          var $resizable = $('#resizable').dxResizable({
            maxWidth: 100,
            maxHeight: 100,
            onResize: function(e) {
              assert.equal(e.width, 100, 'width passed as event argument');
            }
          });
          var $handle = getHandle('bottom-right');
          var resizable = $resizable.dxResizable('instance');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(160, 0);
          resizable.option('onResize', function(e) {
            assert.equal(e.height, 100, 'height passed as event argument');
          });
          pointer.dragStart().drag(0, 160);
        });
        QUnit.test('onResizeEnd action should be fired after end resize', function(assert) {
          var $resizable = $('#resizable').dxResizable({onResizeEnd: function(e) {
              assert.ok(true, 'onResizeEnd action fired');
              assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
              assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
            }});
          var $handle = getHandle('bottom-right');
          var pointer = pointerMock($handle).start();
          pointer.dragStart().drag(10, 0).dragEnd();
        });
        QUnit.test('onResizeEnd action - subscription by "on" method', function(assert) {
          var resizeEndHandler = function(e) {
            assert.ok(true, 'onResizeEnd action fired');
            assert.equal(e.width, $resizable.outerWidth(), 'width passed as event argument');
            assert.equal(e.height, $resizable.outerHeight(), 'height passed as event argument');
          };
          var resize = function() {
            var $handle = getHandle('bottom-right');
            var pointer = pointerMock($handle).start();
            pointer.dragStart().drag(10, 0).dragEnd();
          };
          var $resizable = $('#resizable').dxResizable();
          var instance = $resizable.dxResizable('instance');
          instance.on('resizeEnd', resizeEndHandler);
          resize();
          instance.off('resizeEnd', resizeEndHandler);
          resize();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/translator","events/visibility_change","jquery","ui/resizable","../../helpers/pointerMock.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/translator"), require("events/visibility_change"), require("jquery"), require("ui/resizable"), require("../../helpers/pointerMock.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizable.tests.js.map