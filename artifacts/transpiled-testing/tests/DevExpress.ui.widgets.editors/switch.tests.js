!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/switch.tests.js"], ["jquery","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils/index","generic_light.css!","ui/switch"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/switch.tests.js", ["jquery", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "animation/fx", "events/utils/index", "generic_light.css!", "ui/switch"], function($__export) {
  "use strict";
  var $,
      pointerMock,
      keyboardMock,
      fx,
      normalizeKeyName,
      SWITCH_CLASS,
      SWITCH_ON_VALUE_CLASS,
      INNER_CLASS,
      HANDLE_CLASS,
      DISABLED_CLASS,
      INNER_SELECTOR,
      HANDLE_SELECTOR,
      LABEL_ON_CLASS,
      LABEL_OFF_CLASS,
      INNER_TRANSFORM_RANGE,
      HANDLE_TRANSFORM_RANGE,
      UIState,
      UIStateWithRTL;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="switch"></div>\
            <div id="switch2"></div>\
            <div id="widget"></div>\
            <div id="invisibleSwitch"></div>\
            <div id="widthRootStyle"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
        $('#invisibleSwitch').css('display', 'none');
        $('#widthRootStyle').css('width', '300px');
      });
      SWITCH_CLASS = 'dx-switch';
      SWITCH_ON_VALUE_CLASS = SWITCH_CLASS + '-on-value';
      INNER_CLASS = 'dx-switch-inner';
      HANDLE_CLASS = 'dx-switch-handle';
      DISABLED_CLASS = 'dx-state-disabled';
      INNER_SELECTOR = '.' + INNER_CLASS;
      HANDLE_SELECTOR = '.' + HANDLE_CLASS;
      LABEL_ON_CLASS = 'dx-switch-on';
      LABEL_OFF_CLASS = 'dx-switch-off';
      INNER_TRANSFORM_RANGE = {
        left: 'translateX(-50%)',
        right: 'translateX(0%)'
      };
      HANDLE_TRANSFORM_RANGE = {
        left: 'translateX(0%)',
        right: 'translateX(-100%)'
      };
      UIState = function(inner, handle) {
        if (inner.hasClass(SWITCH_CLASS)) {
          inner = inner.find(INNER_SELECTOR), handle = inner.find(HANDLE_SELECTOR);
        }
        var innerTransform = inner.get(0).style.transform;
        var handleTransform = handle.get(0).style.transform;
        if (innerTransform === INNER_TRANSFORM_RANGE.left && handleTransform === HANDLE_TRANSFORM_RANGE.left) {
          return false;
        } else if (innerTransform === INNER_TRANSFORM_RANGE.right && handleTransform === HANDLE_TRANSFORM_RANGE.right) {
          return true;
        } else {
          return undefined;
        }
      };
      UIStateWithRTL = function(element) {
        var inner;
        var handle;
        if (element.hasClass(SWITCH_CLASS)) {
          inner = element.find(INNER_SELECTOR), handle = element.find(HANDLE_SELECTOR);
        }
        var innerTransform = inner.get(0).style.transform;
        var handleTransform = handle.get(0).style.transform;
        if (innerTransform === INNER_TRANSFORM_RANGE.right && handleTransform === HANDLE_TRANSFORM_RANGE.left) {
          return true;
        } else if (innerTransform === INNER_TRANSFORM_RANGE.right && handleTransform === HANDLE_TRANSFORM_RANGE.right) {
          return false;
        } else {
          return undefined;
        }
      };
      QUnit.module('widget init', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('switch should have correct width by default', function(assert) {
          var $element = $('#switch').dxSwitch();
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('onContentReady fired after the widget is fully ready', function(assert) {
          assert.expect(2);
          $('#switch').dxSwitch({
            value: true,
            onContentReady: function(e) {
              assert.ok($(e.element).hasClass(SWITCH_CLASS));
              assert.ok($(e.element).hasClass(SWITCH_ON_VALUE_CLASS));
            }
          });
        });
        QUnit.test('switchedOnText/switchedOffText options changing', function(assert) {
          var $element = $('#switch').dxSwitch({});
          var instance = $element.dxSwitch('instance');
          instance.option('switchedOnText', '1');
          assert.equal($element.find('.' + LABEL_ON_CLASS).text(), '1');
          instance.option('switchedOnText', '11');
          assert.equal($element.find('.' + LABEL_ON_CLASS).text(), '11');
          instance.option('switchedOffText', '0');
          assert.equal($element.find('.' + LABEL_OFF_CLASS).text(), '0');
          instance.option('switchedOffText', '00');
          assert.equal($element.find('.' + LABEL_OFF_CLASS).text(), '00');
        });
        QUnit.test('onValueChanged option', function(assert) {
          var count = 0;
          var $element = $('#switch').dxSwitch({
            value: true,
            onValueChanged: function() {
              count++;
            }
          });
          var instance = $element.dxSwitch('instance');
          instance.option('value', false);
          assert.equal(count, 1);
          instance.option('onValueChanged', function() {
            count += 2;
          });
          instance.option('value', true);
          assert.equal(count, 3);
        });
        QUnit.test('value option changing', function(assert) {
          var element = $('#switch').dxSwitch({
            switchedOnText: 'customOn',
            switchedOffText: 'customOff',
            value: false
          });
          var instance = element.dxSwitch('instance');
          instance.option('value', true);
          assert.ok(element.hasClass('dx-switch-on-value'));
        });
        QUnit.test('value option changing - using non bool value', function(assert) {
          var element = $('#switch').dxSwitch();
          var instance = element.dxSwitch('instance');
          instance.option('value', undefined);
          assert.equal(element.dxSwitch('option', 'value'), false);
          instance.option('value', 123);
          assert.equal(element.dxSwitch('option', 'value'), true);
        });
        QUnit.test('value option changing must invoke the \'onValueChanged\' action', function(assert) {
          var switcher = $('#switch').dxSwitch({onValueChanged: function() {
              assert.ok(true);
            }}).dxSwitch('instance');
          switcher.option('value', true);
        });
        QUnit.test('disabled option', function(assert) {
          var element = $('#switch').dxSwitch();
          var instance = element.dxSwitch('instance');
          instance.option('disabled', true);
          instance.option('value', true);
          element.trigger('dxclick');
          assert.equal(instance.option('value'), true, 'value is not changed');
        });
        QUnit.test('disabled switch should have special class', function(assert) {
          var element = $('#switch2').dxSwitch({disabled: true});
          assert.ok(element.hasClass(DISABLED_CLASS));
        });
      });
      QUnit.module('invisible container', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('the position of handle for invisible and visible switch should be equal', function(assert) {
          var $visibleElement = $('#switch').dxSwitch();
          var $invisibleElement = $('#invisibleSwitch').dxSwitch();
          $invisibleElement.css('display', 'block');
          assert.equal($visibleElement.find('.' + HANDLE_CLASS).position().left, $invisibleElement.find('.' + HANDLE_CLASS).position().left);
        });
      });
      QUnit.module('hidden input', function() {
        QUnit.test('the hidden input should change its value on widget value change', function(assert) {
          var $element = $('#switch').dxSwitch({value: true});
          var instance = $element.dxSwitch('instance');
          var $input = $element.find('input');
          instance.option('value', false);
          assert.equal($input.val(), 'false', 'input value has been changed');
          instance.option('value', true);
          assert.equal($input.val(), 'true', 'input value has been changed second time');
        });
      });
      QUnit.module('the \'name\' option', function() {
        QUnit.test('widget input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#switch').dxSwitch({name: expectedName});
          var $input = $element.find('input');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
      QUnit.module('interaction', {
        beforeEach: function() {
          fx.off = true;
          this.element = $('#switch').dxSwitch({value: true});
          this.mouse = pointerMock(this.element);
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('click switches state', function(assert) {
          this.element.trigger('dxclick');
          assert.strictEqual(UIState(this.element), false);
          assert.equal(this.element.dxSwitch('option', 'value'), false);
          this.element.trigger('dxclick');
          assert.strictEqual(UIState(this.element), true);
          assert.equal(this.element.dxSwitch('option', 'value'), true);
        });
        QUnit.test('swipe switches state', function(assert) {
          this.mouse.start().swipeStart().swipeEnd(-1);
          assert.strictEqual(UIState(this.element), false);
          assert.equal(this.element.dxSwitch('option', 'value'), false);
          this.mouse.start().swipeStart().swipeEnd(1);
          assert.strictEqual(UIState(this.element), true);
          assert.equal(this.element.dxSwitch('option', 'value'), true);
        });
        QUnit.test('swipe gesture is to fire onValueChanged', function(assert) {
          var valueChangeStub = sinon.stub();
          var $element = $('#switch').dxSwitch({
            value: true,
            onValueChanged: valueChangeStub
          });
          var mouse = pointerMock($element);
          mouse.start().swipeStart().swipeEnd(-1);
          assert.ok(valueChangeStub.calledOnce);
          mouse.start().swipeStart().swipeEnd(1);
          assert.ok(valueChangeStub.calledTwice);
          var event = valueChangeStub.lastCall.args[0].event;
          assert.ok(event);
          assert.strictEqual(event.type, 'dxswipeend');
        });
        QUnit.test('swipe doesn\'t turn off feedback during gesture', function(assert) {
          var activeStateClass = 'dx-state-active';
          var clock = sinon.useFakeTimers();
          try {
            assert.equal(this.element.hasClass(activeStateClass), false, 'feedback off before start');
            this.mouse.start().swipeStart();
            assert.equal(this.element.hasClass(activeStateClass), true, 'feedback on gesture start');
            this.mouse.swipe(0.01);
            assert.equal(this.element.hasClass(activeStateClass), true, 'feedback stays on after gesture start');
            this.mouse.swipe(0.2);
            assert.equal(this.element.hasClass(activeStateClass), true, 'feedback stays on after gesture continue');
            this.mouse.swipeEnd(1);
            assert.equal(this.element.hasClass(activeStateClass), false, 'feedback off after gesture end');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('click during animation hasn\'t any effects', function(assert) {
          var originalFxOff = fx.off;
          fx.off = false;
          var clock = sinon.useFakeTimers();
          try {
            var element = this.element;
            var instance = element.dxSwitch('instance');
            var originalRenderPosition = instance._renderPosition;
            var prevState = Number.MAX_VALUE;
            var stateMonotonicallyDecreases = true;
            var d1 = $.Deferred();
            var d2 = $.Deferred();
            instance._renderPosition = function(state, swipeOffset) {
              originalRenderPosition.call(instance, state, swipeOffset);
              stateMonotonicallyDecreases = stateMonotonicallyDecreases && (state <= prevState);
              prevState = state;
            };
            instance._animationDuration = 12345;
            element.click();
            setTimeout(function() {
              d1.resolve();
            }, 100);
            clock.tick(100);
            $.when(d1).done(function() {
              element.click();
              setTimeout(function() {
                d2.resolve();
              }, 500);
            });
            clock.tick(500);
            $.when(d2).done(function() {
              assert.ok(stateMonotonicallyDecreases);
            });
          } finally {
            clock.restore();
            fx.off = originalFxOff;
          }
        });
        QUnit.test('switch should have right class before animation', function(assert) {
          var originalAnimation = fx.animate;
          var clock = sinon.useFakeTimers();
          try {
            var element = this.element;
            var instance = element.dxSwitch('instance');
            instance.option('value', false);
            fx.animate = function($element, config) {
              assert.ok(element.hasClass(SWITCH_ON_VALUE_CLASS), 'Switch has correct class');
            };
            this.element.trigger('dxclick');
            clock.tick(150);
          } finally {
            fx.animate = originalAnimation;
            clock.restore();
          }
        });
        QUnit.test('widget should be active while handle is swiped', function(assert) {
          var $element = this.element;
          var pointer = this.mouse;
          var clock = sinon.useFakeTimers();
          try {
            pointer.start().down().swipeStart().up();
            clock.tick(400);
            assert.ok($element.hasClass('dx-state-active'), 'widget is still active');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('handle follow of mouse during swipe', function(assert) {
          var $element = this.element;
          var pointer = this.mouse;
          $element.dxSwitch('option', {value: false});
          var $container = $element.find('.dx-switch-container');
          var $handle = $element.find('.dx-switch-handle');
          var $innerWrapper = $element.find('.dx-switch-inner');
          var offset = ($container.outerWidth(true) - $handle.outerWidth()) / 2;
          pointer.start().down().move(offset, 0);
          var innerTransform = $innerWrapper.get(0).style.transform;
          var handleTransform = $handle.get(0).style.transform;
          assert.equal(innerTransform, 'translateX(-25%)', 'Inner position is right');
          assert.equal(handleTransform, 'translateX(-50%)', 'Handle position is right');
        });
        QUnit.test('handle should have correct position after swipeend', function(assert) {
          var $element = this.element;
          var pointer = this.mouse;
          $element.dxSwitch('option', {value: false});
          var $container = $element.find('.dx-switch-container');
          var $handle = $element.find('.dx-switch-handle');
          var $innerWrapper = $element.find('.dx-switch-inner');
          var offset = ($container.outerWidth(true) - $handle.outerWidth()) / 4;
          pointer.start().down().move(offset, 0).up();
          var innerTransform = $innerWrapper.get(0).style.transform;
          var handleTransform = $handle.get(0).style.transform;
          assert.equal(innerTransform, 'translateX(0%)', 'Inner position is right');
          assert.equal(handleTransform, 'translateX(-100%)', 'Handle position is right');
        });
        QUnit.test('click on disabled switch has no effect', function(assert) {
          var element = this.element;
          var instance = element.dxSwitch('instance');
          instance.option('value', false);
          instance.option('disabled', true);
          element.trigger('dxclick');
          assert.strictEqual(UIState(element), false);
          this.mouse.start().swipeStart().swipeEnd(-1);
          assert.strictEqual(UIState(element), false);
        });
      });
      QUnit.module('RTL', {
        beforeEach: function() {
          fx.off = true;
          this.element = $('#switch').dxSwitch({
            value: true,
            rtlEnabled: true
          });
          this.mouse = pointerMock(this.element);
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('click switches state', function(assert) {
          var $element = this.element;
          var instance = this.element.dxSwitch('instance');
          $element.trigger('dxclick');
          assert.equal(instance.option('value'), false);
          $element.trigger('dxclick');
          assert.strictEqual(UIStateWithRTL($element), true);
          assert.equal(instance.option('value'), true);
        });
        QUnit.test('swipe switches state', function(assert) {
          var $element = this.element;
          var instance = this.element.dxSwitch('instance');
          this.mouse.start().swipeStart().swipeEnd(1);
          assert.equal(instance.option('value'), false);
          this.mouse.start().swipeStart().swipeEnd(-1);
          assert.strictEqual(UIStateWithRTL($element), true);
          assert.equal(instance.option('value'), true);
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxSwitch({width: 400});
          var instance = $element.dxSwitch('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element.outerWidth(), 400, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxSwitch();
          var instance = $element.dxSwitch('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('state changes on enter/space/right and left key press', function(assert) {
          assert.expect(5);
          var $element = $('#widget').dxSwitch({
            focusStateEnabled: true,
            value: false
          });
          var instance = $element.dxSwitch('instance');
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          keyboard.keyDown('enter');
          assert.equal(instance.option('value'), true, 'value has been change');
          keyboard.keyDown('space');
          assert.equal(instance.option('value'), false, 'value has been change');
          keyboard.keyDown('right');
          assert.equal(instance.option('value'), true, 'value has been change');
          keyboard.keyDown('right');
          assert.equal(instance.option('value'), true, 'value has not been change');
          keyboard.keyDown('left');
          assert.equal(instance.option('value'), false, 'value has been change');
        });
        QUnit.test('state changes on right and left key press correctly in rtl mode', function(assert) {
          assert.expect(2);
          var $element = $('#widget').dxSwitch({
            focusStateEnabled: true,
            value: false,
            rtlEnabled: true
          });
          var instance = $element.dxSwitch('instance');
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          keyboard.keyDown('left');
          assert.equal(instance.option('value'), true, 'value has not been change');
          keyboard.keyDown('right');
          assert.equal(instance.option('value'), false, 'value has been change');
        });
      });
      QUnit.module('valueChanged handler should receive correct event parameter', {
        beforeEach: function() {
          var $__2 = this;
          fx.off = true;
          this.valueChangedHandler = sinon.stub();
          var initialOptions = {
            onValueChanged: this.valueChangedHandler,
            focusStateEnabled: true
          };
          this.init = function(options) {
            $__2.$element = $('#switch').dxSwitch(options);
            $__2.instance = $__2.$element.dxSwitch('instance');
            $__2.keyboard = keyboardMock($__2.$element);
            $__2.pointer = pointerMock($__2.$element);
          };
          this.reinit = function(options) {
            $__2.instance.dispose();
            $__2.init($.extend({}, initialOptions, options));
          };
          this.testProgramChange = function(assert) {
            var value = $__2.instance.option('value');
            $__2.instance.option('value', !value);
            var callCount = $__2.valueChangedHandler.callCount;
            var event = $__2.valueChangedHandler.getCall(callCount - 1).args[0].event;
            assert.strictEqual(event, undefined, 'event is undefined');
          };
          this.checkEvent = function(assert, type, target, key) {
            var event = $__2.valueChangedHandler.getCall(0).args[0].event;
            assert.strictEqual(event.type, type, 'event type is correct');
            assert.strictEqual(event.target, target.get(0), 'event target is correct');
            if (type === 'keydown') {
              assert.strictEqual(normalizeKeyName(event), normalizeKeyName({key: key}), 'event key is correct');
            }
          };
          this.init(initialOptions);
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('on runtime change', function(assert) {
          this.testProgramChange(assert);
        });
        QUnit.test('on click', function(assert) {
          this.$element.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', this.$element);
          this.testProgramChange(assert);
        });
        QUnit.test('on swipe', function(assert) {
          this.pointer.start().swipeStart().swipeEnd(1);
          this.checkEvent(assert, 'dxswipeend', this.$element);
          this.testProgramChange(assert);
        });
        ['enter', 'space'].forEach(function(key) {
          QUnit.test(("on " + key + " press"), function(assert) {
            this.keyboard.press(key);
            this.checkEvent(assert, 'keydown', this.$element, key);
            this.testProgramChange(assert);
          });
        });
        ['rightArrow', 'leftArrow'].forEach(function(arrow) {
          QUnit.test(("on " + arrow.replace('Arrow', '') + " arrow press"), function(assert) {
            this.reinit({value: arrow === 'leftArrow' ? true : false});
            this.keyboard.press(arrow);
            this.checkEvent(assert, 'keydown', this.$element, arrow);
            this.testProgramChange(assert);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils","generic_light.css!","ui/switch"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("animation/fx"), require("events/utils"), require("generic_light.css!"), require("ui/switch"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=switch.tests.js.map