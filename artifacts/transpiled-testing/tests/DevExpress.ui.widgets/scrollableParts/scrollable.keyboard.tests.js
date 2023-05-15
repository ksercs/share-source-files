!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.keyboard.tests.js"], ["jquery","core/devices","../../../helpers/pointerMock.js","../../../helpers/keyboardMock.js","renovation/ui/scroll_view/utils/get_translate_values","core/utils/window","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.keyboard.tests.js", ["jquery", "core/devices", "../../../helpers/pointerMock.js", "../../../helpers/keyboardMock.js", "renovation/ui/scroll_view/utils/get_translate_values", "core/utils/window", "ui/scroll_view/ui.scrollable", "generic_light.css!", "./scrollable.constants.js"], function($__export) {
  "use strict";
  var $,
      devices,
      pointerMock,
      keyboardMock,
      getTranslateValues,
      setWindow,
      getWindow,
      Scrollable,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_SCROLL_CLASS,
      SCROLL_LINE_HEIGHT,
      isRenovatedScrollable,
      getKeyboardMock;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      setWindow = $__m.setWindow;
      getWindow = $__m.getWindow;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {}, function($__m) {
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_SCROLL_CLASS = $__m.SCROLLABLE_SCROLL_CLASS;
    }],
    execute: function() {
      SCROLL_LINE_HEIGHT = 40;
      isRenovatedScrollable = !!Scrollable.IS_RENOVATED_WIDGET;
      QUnit.module('keyboard support', {
        beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollable .content1 {\n                    height: 100px;\n                    width: 100px;\n                }\n                #scrollable_content {\n                    width: 400px;\n                }\n                #content_container_1, #content_container_2 {\n                    height: 200px; width: 198px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>\n            <div id=\"scrollable_container\">\n                <div id=\"scrollable_content\">\n                    <div id=\"content_container_1\" tabindex=\"1\"></div>\n                    <div id=\"content_container_2\" tabindex=\"2\"></div>\n                </div>\n            </div>";
          $('#qunit-fixture').html(markup);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      getKeyboardMock = function($scrollable) {
        var keyboard;
        if (isRenovatedScrollable) {
          keyboard = keyboardMock($scrollable);
          $scrollable.focus();
        } else {
          var $container = $scrollable.find(("." + SCROLLABLE_CONTAINER_CLASS));
          keyboard = keyboardMock($container);
          $container.focus();
        }
        return keyboard;
      };
      QUnit.test('support arrow keys', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        $scrollable.width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both'
        });
        var scrollable = $scrollable.dxScrollable('instance');
        var keyboard = getKeyboardMock($scrollable);
        keyboard.keyDown('down');
        assert.equal(scrollable.scrollOffset().top, SCROLL_LINE_HEIGHT, 'down key moves to one line down');
        keyboard.keyDown('up');
        assert.equal(scrollable.scrollOffset().top, 0, 'up key moves to one line up');
        keyboard.keyDown('right');
        assert.equal(scrollable.scrollOffset().left, SCROLL_LINE_HEIGHT, 'right key moves to one column right');
        keyboard.keyDown('left');
        assert.equal(scrollable.scrollOffset().left, 0, 'left key moves to one column down');
      });
      QUnit.test('support pageup and pagedown', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        var containerHeight = 100;
        $scrollable.height(containerHeight);
        $scrollable.children().height(1000);
        $scrollable.dxScrollable({useNative: false});
        var scrollable = $scrollable.dxScrollable('instance');
        var keyboard = getKeyboardMock($scrollable);
        keyboard.keyDown('pagedown');
        keyboard.keyDown('pagedown');
        assert.equal(scrollable.scrollOffset().top, 2 * containerHeight, 'page down key moves to one page down');
        keyboard.keyDown('pageup');
        assert.equal(scrollable.scrollOffset().top, containerHeight, 'page up key moves to one page up');
      });
      QUnit.test('support end and home', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        var containerHeight = 100;
        var contentHeight = 1000;
        $scrollable.height(containerHeight).wrapInner('<div>').children().height(contentHeight);
        $scrollable.dxScrollable({useNative: false});
        var scrollable = $scrollable.dxScrollable('instance');
        var keyboard = getKeyboardMock($scrollable);
        keyboard.keyDown('end');
        assert.roughEqual(scrollable.scrollOffset().top, contentHeight - containerHeight, 1, 'end key moves to the bottom');
        keyboard.keyDown('home');
        assert.equal(scrollable.scrollOffset().top, 0, 'home key moves to the top');
      });
      QUnit.test('supportKeyboard option', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        $scrollable.width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both',
          useKeyboard: false
        });
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        assert.equal($container.attr('tabindex'), null, 'scrollable has not tabindex after focus');
      });
      QUnit.test('supportKeyboard option after render', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        $scrollable.width(100);
        $scrollable.children().width(200);
        $scrollable.dxScrollable({
          useNative: false,
          direction: 'both',
          useKeyboard: true
        });
        var scrollable = $scrollable.dxScrollable('instance');
        var keyboard = getKeyboardMock($scrollable);
        scrollable.option('useKeyboard', false);
        keyboard.keyDown('down');
        assert.equal(scrollable.scrollOffset().top, 0, 'down key does not move to one line down after option change');
        scrollable.option('useKeyboard', true);
        keyboard.keyDown('down');
        assert.equal(scrollable.scrollOffset().top, SCROLL_LINE_HEIGHT, 'right key moves to one column down after option change');
      });
      QUnit.test('arrow keys does not trigger when it not need', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        $scrollable.height(100);
        $scrollable.wrapInner('<div>');
        $scrollable.children().height(50);
        $scrollable.dxScrollable({
          useNative: false,
          useKeyboard: true,
          bounceEnabled: false
        });
        var count = 0;
        $scrollable.on('scroll', function(assert) {
          count++;
        });
        var keyboard = getKeyboardMock($scrollable);
        keyboard.keyDown('down');
        assert.equal(count, 0, 'down key moves to one line down');
      });
      QUnit.test('arrows work correctly after scroll by scrollbar', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'mobile device does not support tabindex on div element');
          return;
        }
        var $scrollable = $('#scrollable');
        $scrollable.height(100);
        $scrollable.children().height(200);
        $scrollable.dxScrollable({
          useNative: false,
          useKeyboard: true,
          bounceEnabled: false,
          scrollByThumb: true,
          useSimulatedScrollbar: true
        });
        var scrollable = $scrollable.dxScrollable('instance');
        var keyboard = getKeyboardMock($scrollable);
        var $scrollbar = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
        var pointer = pointerMock($scrollbar).start();
        pointer.down().move(0, 10).up();
        var scrollLocation = scrollable.scrollOffset().top;
        keyboard.keyDown('down');
        assert.equal(scrollable.scrollOffset().top, SCROLL_LINE_HEIGHT + scrollLocation);
      });
      QUnit.testInActiveWindow('arrows was not handled when focus on input element', function(assert) {
        var $scrollable = $('#scrollable');
        var $input = $('<input type=\'text\' />').appendTo($scrollable);
        $scrollable.dxScrollable({
          useNative: false,
          useKeyboard: true
        });
        $input.focus();
        try {
          $(document).on('keydown.test', function(e) {
            assert.equal(e.isDefaultPrevented(), false, 'event was not prevented');
          });
          var keyboard = keyboardMock($input);
          keyboard.keyDown('down');
        } finally {
          $(document).off('keydown.test');
        }
      });
      if (devices.real().deviceType === 'desktop') {
        [true, false].forEach(function(useNativeMode) {
          ['vertical', 'horizontal'].forEach(function(scrollbarDirection) {
            function checkScrollLocation($scrollable, expectedLocation) {
              var $scroll = $scrollable.find('.' + SCROLLABLE_SCROLL_CLASS);
              var scrollLocation = getTranslateValues($scroll.get(0));
              QUnit.assert.deepEqual(scrollLocation, expectedLocation, 'scroll location');
            }
            QUnit.testInActiveWindow(("Update scroll location on tab: useNative - " + useNativeMode + ", direction: " + scrollbarDirection), function(assert) {
              this.clock.restore();
              var done = assert.async();
              var scrollableContainerSize = 200;
              var $scrollable = $('#scrollable_container').dxScrollable({
                height: scrollableContainerSize,
                width: scrollableContainerSize,
                useNative: useNativeMode,
                direction: scrollbarDirection,
                showScrollbar: 'always',
                useSimulatedScrollbar: true
              });
              var $contentContainer1 = $scrollable.find(("." + SCROLLABLE_CONTAINER_CLASS + " #content_container_1"));
              var $contentContainer2 = $scrollable.find(("." + SCROLLABLE_CONTAINER_CLASS + " #content_container_2"));
              $contentContainer1.css('tabindex', 1);
              $contentContainer2.css('tabindex', 2);
              if (scrollbarDirection === 'horizontal') {
                $contentContainer1.css('display', 'inline-block');
                $contentContainer2.css('display', 'inline-block');
              }
              checkScrollLocation($scrollable, {
                top: 0,
                left: 0
              });
              var keyboard = keyboardMock($contentContainer1);
              $contentContainer2.focus();
              keyboard.keyDown('tab');
              setTimeout(function() {
                checkScrollLocation($scrollable, scrollbarDirection === 'vertical' ? {
                  top: 100,
                  left: 0
                } : {
                  top: 0,
                  left: 100
                });
                done();
              }, 50);
            });
          });
        });
        [true, false].forEach(function(bounceEnabled) {
          [true, false].forEach(function(ctrlKey) {
            [true, false].forEach(function(metaKey) {
              QUnit.test(("Handle ctrl key (T970904). bounceEnabled: " + bounceEnabled + ", ctrlKey: " + ctrlKey + ", metaKey: " + metaKey), function(assert) {
                var scrollable = $('#scrollable').dxScrollable({
                  useNative: false,
                  bounceEnabled: bounceEnabled
                }).dxScrollable('instance');
                var validateRes = scrollable._validate({
                  type: 'dxmousewheel',
                  delta: -100,
                  ctrlKey: ctrlKey,
                  metaKey: metaKey
                });
                var expectedRes = (metaKey || ctrlKey) ? false : true;
                assert.equal(validateRes, expectedRes);
              });
            });
          });
        });
        [1, 1.5, 0.25].forEach(function(browserZoom) {
          ['up', 'down', 'left', 'right'].forEach(function(key) {
            QUnit.testInActiveWindow(("Offset after press \"" + key + "\" key with browser zoom - " + browserZoom * 100 + "%: useNative - " + false + ", direction: \"both\""), function(assert) {
              var originalWindow = getWindow();
              try {
                var $scrollable = $('#scrollable');
                $scrollable.children().width(1000);
                $scrollable.children().height(1000);
                $scrollable.dxScrollable({
                  height: 400,
                  width: 400,
                  useNative: false,
                  direction: 'both',
                  showScrollbar: 'always'
                });
                var scrollable = $scrollable.dxScrollable('instance');
                scrollable.scrollTo({
                  top: 200,
                  left: 200
                });
                var defaultDevicePixelRatio = getWindow().devicePixelRatio;
                setWindow({devicePixelRatio: browserZoom}, true);
                var keyboard = getKeyboardMock($scrollable);
                keyboard.keyDown(key);
                var expectedOffset = {
                  top: 200,
                  left: 200
                };
                var delta = SCROLL_LINE_HEIGHT / browserZoom;
                if (key === 'down') {
                  expectedOffset.top += delta;
                }
                if (key === 'up') {
                  expectedOffset.top -= delta;
                }
                if (key === 'left') {
                  expectedOffset.left -= delta;
                }
                if (key === 'right') {
                  expectedOffset.left += delta;
                }
                assert.roughEqual(scrollable.scrollOffset().top, expectedOffset.top, 1, 'scrollOffset.top');
                assert.roughEqual(scrollable.scrollOffset().left, expectedOffset.left, 1, 'scrollOffset.left');
                setWindow({devicePixelRatio: defaultDevicePixelRatio}, true);
              } finally {
                setWindow(originalWindow);
              }
            });
          });
        });
      }
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","../../../helpers/pointerMock.js","../../../helpers/keyboardMock.js","renovation/ui/scroll_view/utils/get_translate_values","core/utils/window","ui/scroll_view/ui.scrollable","generic_light.css!","./scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("../../../helpers/pointerMock.js"), require("../../../helpers/keyboardMock.js"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("core/utils/window"), require("ui/scroll_view/ui.scrollable"), require("generic_light.css!"), require("./scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.keyboard.tests.js.map