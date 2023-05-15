!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/click.tests.js"], ["jquery","core/utils/common","events/click","core/utils/dom","core/utils/support","core/devices","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.events/click.tests.js", ["jquery", "core/utils/common", "events/click", "core/utils/dom", "core/utils/support", "core/devices", "../../helpers/pointerMock.js", "../../helpers/nativePointerMock.js"], function($__export) {
  "use strict";
  var $,
      noop,
      clickEvent,
      domUtils,
      support,
      devices,
      pointerMock,
      nativePointerMock,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      clickEvent = $__m.default;
    }, function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      nativePointerMock = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="inputWrapper">\
            <input id="input" />\
        </div>\
        <div id="container">\
            <div id="element">\
                <div id="wrapper">\
                    <div><div id="first"></div></div>\
                    <div><div id="second"></div></div>\
                </div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      moduleConfig = {
        beforeEach: function() {
          this.element = $('#element');
          this.container = $('#container');
          this.clock = sinon.useFakeTimers();
          this._originalAnimFrame = clickEvent.misc.requestAnimationFrame;
          clickEvent.misc.requestAnimationFrame = function(callback) {
            callback();
          };
        },
        afterEach: function() {
          this.clock.restore();
          clickEvent.misc.requestAnimationFrame = this._originalAnimFrame;
        }
      };
      QUnit.module('click handler', moduleConfig);
      QUnit.test('event triggers', function(assert) {
        assert.expect(1);
        var $element = this.element.on('dxclick', function(e) {
          assert.ok(e);
        });
        pointerMock($element).start().down().up();
      });
      QUnit.test('event args', function(assert) {
        var fields = ['altKey', 'cancelable', 'clientX', 'clientY', 'ctrlKey', 'currentTarget', 'data', 'delegateTarget', 'isDefaultPrevented', 'metaKey', 'originalEvent', 'pageX', 'pageY', 'screenX', 'screenY', 'shiftKey', 'target', 'timeStamp', 'type', 'view', 'which'];
        var element = this.element.on('dxclick', function(e) {
          $.each(fields, function() {
            assert.ok(this in e, this);
          });
        });
        nativePointerMock(element).start().down().up();
      });
      QUnit.test('unsubscribing', function(assert) {
        assert.expect(0);
        var $element = this.element.on('dxclick', function(e) {
          assert.ok(e);
        }).off('dxclick');
        pointerMock($element).start().down().up();
      });
      QUnit.test('delegated handlers', function(assert) {
        assert.expect(1);
        this.container.on('dxclick', '#element', function(e) {
          assert.ok(e);
        });
        pointerMock(this.element).start().down().up();
      });
      QUnit.test('bubbling', function(assert) {
        assert.expect(4);
        this.container.on('dxclick', function(e) {
          assert.ok(e);
          assert.equal(e.type, 'dxclick');
        });
        this.element.on('dxclick', function(e) {
          assert.ok(e);
          assert.equal(e.type, 'dxclick');
        });
        this.element.trigger('dxclick');
      });
      QUnit.test('click subscription should not add onclick attr for native strategy (T527293)', function(assert) {
        this.element.on('dxclick', noop);
        assert.equal(this.element.attr('onclick'), undefined);
      });
      QUnit.module('prevent default', moduleConfig);
      QUnit.test('pointer events should not be prevented', function(assert) {
        var $element = this.element;
        var pointer = nativePointerMock($element);
        $element.on('dxclick', noop);
        $.each(['mousedown', 'mouseup', 'touchstart', 'touchend'], function(_, eventName) {
          $element.on(eventName, function(e) {
            assert.ok(!e.isDefaultPrevented(), eventName + ' should not be prevented');
          });
        });
        pointer.start().touchStart().touchEnd().mouseDown().mouseUp();
      });
      QUnit.test('click should not be prevented (T131440, T131837)', function(assert) {
        var $element = this.element;
        $element.on('dxclick', function(e) {
          assert.ok(!e.originalEvent.isDefaultPrevented(), 'dxpointerup is not prevented');
        });
        nativePointerMock($element).click();
      });
      QUnit.module('reset active element', moduleConfig);
      QUnit.test('native click should not focus on input after animation or scroll', function(assert) {
        if (devices.real().generic) {
          assert.ok(true);
          return;
        }
        var originalResetActiveElement = domUtils.resetActiveElement;
        try {
          var $element = this.element;
          var $input = $('#input');
          var pointer = nativePointerMock($element);
          var isMouseDownPrevented = false;
          var resetCount = 0;
          $element.on('dxclick', noop).on('mousedown', function(e) {
            isMouseDownPrevented = e.isDefaultPrevented();
          });
          pointer.start().touchStart().touchEnd().mouseDown().mouseUp().pointerDown().pointerUp();
          domUtils.resetActiveElement = $.proxy(function() {
            resetCount++;
          }, this);
          if (!isMouseDownPrevented) {
            $input.focus();
            $input.trigger('click');
          }
          assert.equal(resetCount, 1, 'input should not get focus after animation or scroll');
        } finally {
          domUtils.resetActiveElement = originalResetActiveElement;
        }
      });
      QUnit.test('native click should focus on input after animation or scroll if default action prevented', function(assert) {
        if (devices.real().generic) {
          assert.ok(true);
          return;
        }
        var originalResetActiveElement = domUtils.resetActiveElement;
        try {
          var $element = this.element;
          var $input = $('#input');
          var pointer = nativePointerMock($element);
          var isMouseDownPrevented = false;
          var resetCount = 0;
          $element.on({
            'dxclick': noop,
            'mousedown': function(e) {
              isMouseDownPrevented = e.isDefaultPrevented();
            },
            'dxpointerdown': function(e) {
              e.preventDefault();
            }
          });
          pointer.start().touchStart().touchEnd().mouseDown().mouseUp().pointerDown().pointerUp();
          domUtils.resetActiveElement = $.proxy(function() {
            resetCount++;
          }, this);
          if (!isMouseDownPrevented) {
            $input.focus();
            $input.trigger('click');
          }
          assert.equal(resetCount, 0, 'input should get focus');
        } finally {
          domUtils.resetActiveElement = originalResetActiveElement;
        }
      });
      QUnit.test('native click should focus on input', function(assert) {
        var originalResetActiveElement = domUtils.resetActiveElement;
        try {
          var $input = $('#input');
          var resetCount = 0;
          domUtils.resetActiveElement = $.proxy(function() {
            resetCount++;
          }, this);
          $input.trigger('click');
          assert.equal(resetCount, 0, 'input should not get focus after animation or scroll');
        } finally {
          domUtils.resetActiveElement = originalResetActiveElement;
        }
      });
      QUnit.test('click on element should not prevent focus on mousedown if used native click (Q586100)', function(assert) {
        if (!support.touch) {
          assert.ok(true);
          return;
        }
        this.container.css({
          overflow: 'scroll',
          height: 100
        });
        this.element.css({height: 200});
        var $element = this.element;
        var pointer = nativePointerMock($element);
        var isDefaultPrevented = false;
        $element.on('dxclick', noop).on('mousedown', function(e) {
          isDefaultPrevented = e.isDefaultPrevented();
        });
        pointer.start().touchStart().touchEnd().mouseDown().mouseUp().click(true);
        assert.ok(!isDefaultPrevented, 'click on element should call preventDefault() on \'mousedown\' event');
      });
      QUnit.module('native click support');
      QUnit.test('dxclick should be based on native click', function(assert) {
        assert.expect(1);
        var $element = $('#element');
        $element.on('dxclick', function() {
          assert.ok(true, 'dxclick present');
        });
        $element.trigger('click');
      });
      QUnit.test('dxclick should be based on native click for all devices', function(assert) {
        var $element = $('#element');
        var dxClickCallCount = 0;
        var dxClickChildCallCount = 0;
        $element.on('dxclick', {useNative: true}, function() {
          dxClickCallCount++;
        });
        var $childElement = $('<div>').on('dxclick', function() {
          dxClickChildCallCount++;
        }).appendTo($element);
        nativePointerMock($element).start().click();
        nativePointerMock($childElement).start().click();
        assert.equal(dxClickCallCount, 2, 'dxclick call count');
        assert.equal(dxClickChildCallCount, 1, 'dxclick child call count');
      });
      QUnit.test('dxclick should triggers only on left mouse button click', function(assert) {
        var triggered = 0;
        var $element = $('#element').on('dxclick', function(e) {
          triggered++;
        });
        $element.trigger($.Event('click', {which: 1}));
        assert.equal(triggered, 1, 'left button click');
        $element.trigger($.Event('click', {which: 2}));
        assert.equal(triggered, 1, 'middle button click');
        $element.trigger($.Event('click', {which: 3}));
        assert.equal(triggered, 1, 'right button click');
      });
      QUnit.test('dxclick should not be fired twice after pointerdown, pointerup and click', function(assert) {
        assert.expect(1);
        var $element = $('#element');
        var pointer = pointerMock($element);
        $element.on('dxclick', function() {
          assert.ok(true, 'dxclick fired');
        });
        pointer.start().down().up();
      });
      QUnit.test('dxclick should be fired even if propagation was stopped', function(assert) {
        assert.expect(1);
        var $element = $('#element');
        var pointer = nativePointerMock($element);
        $element.on('dxclick', function() {
          assert.ok(true, 'dxclick fired');
        }).on('click', function(e) {
          e.stopPropagation();
        });
        pointer.start().down().up();
      });
      QUnit.test('dxclick should not be fired twice when \'click\' is triggered from its handler (T503035)', function(assert) {
        assert.expect(1);
        var $element = $('#element');
        var pointer = nativePointerMock($element);
        $(document).on('dxclick', $.noop);
        $element.on('dxclick', function() {
          $('#inputWrapper').trigger('click');
          assert.ok(true, 'dxclick fired');
        });
        pointer.start().down().up();
        $(document).off('dxclick', $.noop);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","events/click","core/utils/dom","core/utils/support","core/devices","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("events/click"), require("core/utils/dom"), require("core/utils/support"), require("core/devices"), require("../../helpers/pointerMock.js"), require("../../helpers/nativePointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=click.tests.js.map