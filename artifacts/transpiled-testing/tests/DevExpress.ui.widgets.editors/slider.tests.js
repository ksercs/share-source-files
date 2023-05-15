!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/slider.tests.js"], ["animation/fx","animation/position","generic_light.css!","core/config","core/utils/resize_callbacks","events/visibility_change","jquery","mobile/hide_callback","ui/slider","ui/slider/ui.slider_tooltip","ui/slider/ui.slider_handle","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","events/utils/index"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/slider.tests.js", ["animation/fx", "animation/position", "generic_light.css!", "core/config", "core/utils/resize_callbacks", "events/visibility_change", "jquery", "mobile/hide_callback", "ui/slider", "ui/slider/ui.slider_tooltip", "ui/slider/ui.slider_handle", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "events/utils/index"], function($__export) {
  "use strict";
  var fx,
      positionUtils,
      config,
      resizeCallbacks,
      triggerShownEvent,
      $,
      hideTopOverlayCallback,
      SliderTooltip,
      SliderHandle,
      keyboardMock,
      pointerMock,
      normalizeKeyName,
      module,
      testStart,
      test,
      testInActiveWindow,
      SLIDER_PADDING,
      SLIDER_CLASS,
      SLIDER_WRAPPER_CLASS,
      SLIDER_LABEL_POSITION_CLASS_PREFIX,
      SLIDER_RANGE_CLASS,
      SLIDER_BAR_CLASS,
      SLIDER_HANDLE_CLASS,
      SLIDER_LABEL_CLASS,
      ACTIVE_STATE_CLASS,
      HOVER_STATE_CLASS,
      DISABLED_STATE_CLASS,
      FEEDBACK_SHOW_TIMEOUT,
      FEEDBACK_HIDE_TIMEOUT,
      SLIDER_HANDLE_WIDTH,
      POPUP_CONTENT_CLASS,
      TOOLTIP_CLASS,
      TOOLTIP_CONTENT_CLASS,
      INVALID_MESSAGE_VISIBLE_CLASS,
      SLIDER_TOOLTIP_VISIBILITY_CLASS,
      moduleOptions,
      handlePositionAgainstTrackBar;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      positionUtils = $__m.default;
    }, function($__m) {}, function($__m) {
      config = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      hideTopOverlayCallback = $__m.hideCallback;
    }, function($__m) {}, function($__m) {
      SliderTooltip = $__m.default;
    }, function($__m) {
      SliderHandle = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, module = $__5.module, testStart = $__5.testStart, test = $__5.test, testInActiveWindow = $__5.testInActiveWindow, $__5));
      SLIDER_PADDING = 7;
      testStart(function() {
        var markup = "<div id=\"slider\"></div>\n        <div id=\"widget\"></div>\n        <div id=\"widthRootStyle\"></div>";
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      SLIDER_CLASS = 'dx-slider';
      SLIDER_WRAPPER_CLASS = SLIDER_CLASS + '-wrapper';
      SLIDER_LABEL_POSITION_CLASS_PREFIX = SLIDER_CLASS + '-label-position-';
      SLIDER_RANGE_CLASS = SLIDER_CLASS + '-range';
      SLIDER_BAR_CLASS = SLIDER_CLASS + '-bar';
      SLIDER_HANDLE_CLASS = SLIDER_CLASS + '-handle';
      SLIDER_LABEL_CLASS = SLIDER_CLASS + '-label';
      ACTIVE_STATE_CLASS = 'dx-state-active';
      HOVER_STATE_CLASS = 'dx-state-hover';
      DISABLED_STATE_CLASS = 'dx-state-disabled';
      FEEDBACK_SHOW_TIMEOUT = 30;
      FEEDBACK_HIDE_TIMEOUT = 400;
      SLIDER_HANDLE_WIDTH = 14;
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      TOOLTIP_CLASS = 'dx-tooltip';
      TOOLTIP_CONTENT_CLASS = 'dx-overlay-content';
      INVALID_MESSAGE_VISIBLE_CLASS = 'dx-invalid-message-visible';
      SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
      moduleOptions = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      handlePositionAgainstTrackBar = function($handle) {
        var $range = $handle.parent();
        var rangeBorderWidth = parseInt($range.css('borderLeftWidth'));
        var positionAgainstRange = $handle.position();
        var handleHalfWidth = $handle.outerWidth() / 2;
        var handleHalfHeight = $handle.outerHeight() / 2;
        return {
          left: positionAgainstRange.left + rangeBorderWidth + handleHalfWidth,
          top: positionAgainstRange.top + rangeBorderWidth + handleHalfHeight
        };
      };
      module('render', moduleOptions, function() {
        test('default size', function(assert) {
          var $element = $('#widget').dxSlider();
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        test('onContentReady fired after the widget is fully ready', function(assert) {
          assert.expect(2);
          var position = 'top';
          $('#slider').dxSlider({
            label: {
              visible: true,
              position: position
            },
            onContentReady: function(e) {
              assert.ok($(e.element).hasClass(SLIDER_CLASS));
              assert.ok($(e.element).hasClass(SLIDER_LABEL_POSITION_CLASS_PREFIX + position));
            }
          });
        });
        test('Resize by option', function(assert) {
          var setUpWidth = 11;
          var setUpHeight = 22;
          var increment = 123;
          var $slider = $('#slider').dxSlider({
            max: 100,
            min: 0,
            width: setUpWidth,
            height: setUpHeight
          });
          var slider = $slider.dxSlider('instance');
          var initialWidth = $slider.width();
          var initialHeight = $slider.height();
          assert.equal(initialWidth, setUpWidth, 'Element\'s width was set properly on init');
          assert.equal(initialHeight, setUpHeight, 'Element\'s height was et properly on init');
          slider.option('width', initialWidth + increment);
          slider.option('height', initialHeight + increment);
          assert.equal($slider.width() - initialWidth, increment, 'Element\'s width was set properly on resize');
          assert.equal($slider.height() - initialHeight, increment, 'Element\'s height was set properly on resize');
        });
        test('check range-slide width after resize', function(assert) {
          var setUpWidth = 100;
          var decrement = 0.7 * setUpWidth;
          var $slider = $('#slider').dxSlider({
            max: 100,
            min: 0,
            width: setUpWidth
          });
          var slider = $slider.dxSlider('instance');
          slider.option('width', setUpWidth - decrement);
          var $range = $slider.find('.' + SLIDER_RANGE_CLASS);
          assert.ok($range.width() < $slider.width(), 'range width is correct');
        });
        test('mousedown/touchstart on slider set new value (B233178)', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0
          }).css('width', 500 + 2 * SLIDER_PADDING);
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          pointerMock($element).start({x: SLIDER_PADDING}).move(250 + $element.offset().left).down();
          assert.equal(handlePositionAgainstTrackBar($handle).left, 250);
          assert.equal($range.width(), 250);
          pointerMock($element).start({x: SLIDER_PADDING}).move(350 + $element.offset().left).down();
          assert.equal(handlePositionAgainstTrackBar($handle).left, 350);
          assert.equal($range.width(), 350);
        });
        test('slider doesn\'t turn off feedback during gesture', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0
          }).css('width', 500);
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var mouse = pointerMock($handle);
          assert.equal($handle.hasClass(ACTIVE_STATE_CLASS), false, 'feedback off before start');
          mouse.start().down();
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          assert.ok($handle.hasClass(ACTIVE_STATE_CLASS), 'feedback on gesture start');
          mouse.move(100);
          assert.equal($handle.hasClass(ACTIVE_STATE_CLASS), true, 'feedback stays on after gesture start');
          mouse.up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok(!$handle.hasClass(ACTIVE_STATE_CLASS), 'feedback off after gesture end');
        });
        test('slider should not turn off feedback during second gesture', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 100,
            width: 500
          });
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var pointer = pointerMock($handle);
          pointer.start().down().move(100).up();
          pointer.down().move(-100);
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok($handle.hasClass(ACTIVE_STATE_CLASS), 'handle is active during swipe');
          pointer.up();
        });
        test('slider should turn off feedback after several gestures', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 100,
            width: 500
          });
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var pointer = pointerMock($handle);
          pointer.start().down().move(100).up();
          pointer.down().move(-100);
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          pointer.up().down().move(-100).up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok(!$handle.hasClass(ACTIVE_STATE_CLASS), 'handle isn\'t active after swipe');
        });
        test('slider doesn\'t turn off feedback after sliding in vertical direction', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0
          }).css('width', 500);
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var mouse = pointerMock($handle);
          assert.equal($handle.hasClass(ACTIVE_STATE_CLASS), false, 'feedback off before start');
          mouse.start().down();
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          assert.ok($handle.hasClass(ACTIVE_STATE_CLASS), 'feedback on gesture start');
          mouse.move(0, 1).move(1);
          assert.ok($handle.hasClass(ACTIVE_STATE_CLASS), 'feedback turned on');
          mouse.up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok(!$handle.hasClass(ACTIVE_STATE_CLASS), 'feedback turned off');
        });
        test('drag handler', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0
          }).css('width', 500);
          $element.find('.' + SLIDER_BAR_CLASS).css('margin', '14px 0px');
          var $handle = $element.find('.' + SLIDER_HANDLE_CLASS);
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          var $bar = $element.find('.' + SLIDER_BAR_CLASS);
          var offsetX = $element.offset().left;
          pointerMock($bar).start().move(offsetX).down().move(250).up();
          assert.equal(handlePositionAgainstTrackBar($handle).left, 250);
          assert.equal($range.width(), 250);
          pointerMock($bar).start().down().move(500 + $handle.outerWidth() / 2).up();
          assert.equal(handlePositionAgainstTrackBar($handle).left, 500);
          assert.equal($range.width(), 500);
        });
        test('smooth drag of handler', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0,
            step: 250,
            width: 500
          });
          $element.find('.' + SLIDER_BAR_CLASS).css('margin', '14px 0px');
          var $handle = $element.find('.' + SLIDER_HANDLE_CLASS);
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          var pointer = pointerMock($handle);
          pointer.start().down($range.offset().left).move(100);
          assert.equal(handlePositionAgainstTrackBar($handle).left, 100);
          pointer.up();
        });
        test('value should be updated on swipestart on mobile devices', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0,
            width: 500 + 2 * SLIDER_PADDING
          });
          var instance = $element.dxSlider('instance');
          var $handle = $element.find('.' + SLIDER_WRAPPER_CLASS);
          var pointer = pointerMock($handle);
          pointer.start({
            pointerType: 'touch',
            x: SLIDER_PADDING
          }).move($element.offset().left + 300).swipeStart();
          assert.equal(instance.option('value'), 300, 'value set after dxswipestart');
        });
        ['onHandleMove', 'onHandleRelease'].forEach(function(mode) {
          test('value option should be updated on click', function(assert) {
            var $element = $('#slider').dxSlider({
              max: 500,
              min: 0,
              value: 0,
              width: 500 + 2 * SLIDER_PADDING,
              valueChangeMode: mode
            });
            var instance = $element.dxSlider('instance');
            var $handle = $element.find('.' + SLIDER_WRAPPER_CLASS);
            var pointer = pointerMock($handle);
            pointer.start({
              pointerType: 'touch',
              x: SLIDER_PADDING
            }).move($element.offset().left + 300).click();
            assert.equal(instance.option('value'), 300, 'value set after dxclick');
          });
        });
        test('value should be correctly updated on swipestart with the step that exceeds the maximum (T831727)', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0,
            width: 500 + 2 * SLIDER_PADDING,
            onOptionChanged: function($__6) {
              var $__7 = $__6,
                  component = $__7.component,
                  name = $__7.name;
              return name === 'value' && component.option('step', 2000);
            }
          });
          var offsetX = $element.offset().left;
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var $range = $element.find(("." + SLIDER_RANGE_CLASS));
          var $bar = $element.find(("." + SLIDER_BAR_CLASS));
          pointerMock($bar).start().move(offsetX).down().move(100).move(100);
          assert.equal(handlePositionAgainstTrackBar($handle).left, 500, 'handle is positioned at the max');
          assert.equal($range.width(), 500, 'the width of the range doesn\'t exceed the maximum');
        });
        [false, true].forEach(function(isDisabled) {
          function checkDisabledState($element, assert, isDisabled) {
            var assertType = isDisabled ? 'ok' : 'notOk';
            assert[assertType]($element.hasClass(DISABLED_STATE_CLASS), 'root class');
            assert[assertType]($element.find(("." + SLIDER_HANDLE_CLASS)).hasClass(DISABLED_STATE_CLASS), 'handle class');
          }
          test(("update disabled state from " + isDisabled + " to " + !isDisabled), function(assert) {
            var $element = $('#widget').dxSlider({disabled: isDisabled});
            var widget = $element.dxSlider('instance');
            checkDisabledState($element, assert, isDisabled);
            widget.option('disabled', !isDisabled);
            checkDisabledState($element, assert, !isDisabled);
          });
        });
      });
      module('hidden input', function() {
        test('the hidden input should use the decimal separator specified in DevExpress.config', function(assert) {
          var originalConfig = config();
          try {
            config({serverDecimalSeparator: '|'});
            var $element = $('#slider').dxSlider({value: 12.25});
            var $input = $element.find('input');
            assert.equal($input.val(), '12|25', 'the correct decimal separator is used');
          } finally {
            config(originalConfig);
          }
        });
      });
      module('the \'name\' option', function() {
        test('widget input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#slider').dxSlider({name: expectedName});
          var $input = $element.find('input');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
      module('labels', moduleOptions, function() {
        test('\'label.visible\' option toggles label visibility', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 0,
            max: 100,
            label: {visible: true}
          });
          var $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.length, 2, 'labels are rendered');
          assert.equal($sliderLabels.eq(0).html(), '0');
          assert.equal($sliderLabels.eq(1).html(), '100');
          $slider.dxSlider('option', 'label.visible', false);
          $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.length, 0, 'labels are removed');
        });
        test('labels should re-rendered if \'min\' or/and \'max\' options changed', function(assert) {
          var $slider = $('#slider').dxSlider({label: {visible: true}});
          $slider.dxSlider({
            min: 1000,
            max: 2000
          });
          var $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.eq(0).html(), '1000');
          assert.equal($sliderLabels.eq(1).html(), '2000');
          $slider.dxSlider({min: 1500});
          $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.eq(0).html(), '1500');
          assert.equal($sliderLabels.eq(1).html(), '2000');
          $slider.dxSlider({max: 2500});
          $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.eq(0).html(), '1500');
          assert.equal($sliderLabels.eq(1).html(), '2500');
        });
      });
      module('events', function() {
        module('valueChanged handler should receive correct event', {beforeEach: function() {
            var $__2 = this;
            this.valueChangedHandler = sinon.stub();
            this.$element = $('#slider').dxSlider({
              max: 500,
              min: 0,
              value: 100,
              onValueChanged: this.valueChangedHandler,
              width: 500
            });
            this.instance = this.$element.dxSlider('instance');
            this.$handle = this.$element.find(("." + SLIDER_HANDLE_CLASS));
            this.$wrapper = this.$element.find(("." + SLIDER_WRAPPER_CLASS));
            this.pointer = pointerMock(this.$wrapper);
            this.keyboard = keyboardMock(this.$handle);
            this.testProgramChange = function(assert) {
              var value = $__2.instance.option('value');
              $__2.instance.option('value', value + 1);
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
          }}, function() {
          test('on runtime change', function(assert) {
            this.testProgramChange(assert);
          });
          test('on handle swipe', function(assert) {
            this.pointer.start().swipeStart().swipe(10);
            this.checkEvent(assert, 'dxswipe', this.$wrapper);
            this.testProgramChange(assert);
          });
          test('on handle swipeend (correction after swipe on float step)', function(assert) {
            this.pointer.start().swipeStart().swipeEnd(9.666692444513187);
            var event = this.valueChangedHandler.getCall(0).args[0].event;
            assert.strictEqual(event.type, 'dxswipeend', 'event type is correct');
            assert.strictEqual(event.target, this.$wrapper.get(0), 'event target is correct');
            this.testProgramChange(assert);
          });
          test('on click on slider scale', function(assert) {
            this.pointer.start().move(250 + this.$element.offset().left).down();
            this.checkEvent(assert, 'dxpointerdown', this.$wrapper);
            this.testProgramChange(assert);
          });
          ['rightArrow', 'leftArrow', 'home', 'end', 'pageUp', 'pageDown'].forEach(function(key) {
            test(("on " + key + " press"), function(assert) {
              this.keyboard.press(key);
              this.checkEvent(assert, 'keydown', this.$handle, key);
              this.testProgramChange(assert);
            });
          });
        });
        test('value change should cause value change action call', function(assert) {
          assert.expect(1);
          var $slider = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0,
            onValueChanged: function() {
              assert.ok(true, 'action fired');
            }
          }).css('width', 500);
          pointerMock($slider).start().move(250 + $slider.offset().left).down();
        });
        test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          var slider = $('#slider').dxSlider({onValueChanged: function() {
              assert.ok(true);
            }}).dxSlider('instance');
          slider.option('value', true);
        });
        test('T269867 - handle should not have active state if the \'activeStateEnabled\' option is false', function(assert) {
          var $element = $('#slider').dxSlider({activeStateEnabled: false});
          var $handle = $element.find('.dx-slider-handle');
          pointerMock($handle).start().down().move(250 + $element.offset().left);
          assert.ok(!$handle.hasClass('dx-state-active'), 'handle should not have active state');
        });
      });
      module('focus policy', moduleOptions, function() {
        testInActiveWindow('Handle focus by click on track bar (T249311)', function(assert) {
          assert.expect(1);
          var $slider = $('#slider').dxSlider({focusStateEnabled: true});
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          $slider.trigger('dxclick');
          assert.ok($handle.hasClass('dx-state-focused'), 'handle has focus class after click on track');
        });
      });
      module('keyboard navigation', moduleOptions, function() {
        test('control keys test', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 10,
            max: 90,
            value: 50,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('right');
          assert.equal(slider.option('value'), 51, 'value is correct after rightArrow press');
          keyboard.keyDown('left');
          assert.equal(slider.option('value'), 50, 'value is correct after leftArrow press');
        });
        test('control keys test with step', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 10,
            max: 90,
            value: 50,
            step: 3,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('right');
          assert.equal(slider.option('value'), 52, 'value is correct after rightArrow press');
          keyboard.keyDown('left');
          assert.equal(slider.option('value'), 49, 'value is correct after leftArrow press');
          keyboard.keyDown('home');
          assert.equal(slider.option('value'), 10, 'value is correct after home press');
          keyboard.keyDown('end');
          assert.equal(slider.option('value'), 90, 'value is correct after end press');
        });
        test('pageUp/pageDown keys test', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 10,
            max: 90,
            value: 50,
            keyStep: 1,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('pageUp');
          assert.equal(slider.option('value'), 51, 'value is correct after pageUp press');
          keyboard.keyDown('pageDown');
          assert.equal(slider.option('value'), 50, 'value is correct after pageDown press');
          slider.option('keyStep', 10);
          slider.option('step', 2);
          keyboard.keyDown('pageUp');
          assert.equal(slider.option('value'), 70, 'value is correct after pageUp press');
          keyboard.keyDown('pageDown');
          assert.equal(slider.option('value'), 50, 'value is correct after pageDown press');
        });
        test('home/end keys test', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 0,
            max: 50,
            value: 25,
            keyStep: 1,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('end');
          assert.equal(slider.option('value'), 50, 'value is correct after end press');
          keyboard.keyDown('home');
          assert.equal(slider.option('value'), 0, 'value is correct after home press');
        });
        test('control keys test for rtl', function(assert) {
          var $slider = $('#slider').dxSlider({
            rtlEnabled: true,
            min: 10,
            max: 90,
            value: 50,
            step: 3,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('right');
          assert.equal(slider.option('value'), 49, 'value is correct after rightArrow press');
          keyboard.keyDown('left');
          assert.equal(slider.option('value'), 52, 'value is correct after leftArrow press');
          keyboard.keyDown('home');
          assert.equal(slider.option('value'), 10, 'value is correct after home press');
          keyboard.keyDown('end');
          assert.equal(slider.option('value'), 90, 'value is correct after end press');
        });
        test('pageUp/pageDown keys test for rtl', function(assert) {
          var $slider = $('#slider').dxSlider({
            rtlEnabled: true,
            min: 10,
            max: 90,
            value: 50,
            keyStep: 1,
            focusStateEnabled: true
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.trigger('focusin');
          keyboard.keyDown('pageUp');
          assert.equal(slider.option('value'), 49, 'value is correct after pageUp press');
          keyboard.keyDown('pageDown');
          assert.equal(slider.option('value'), 50, 'value is correct after pageDown press');
          slider.option('keyStep', 10);
          keyboard.keyDown('pageUp');
          assert.equal(slider.option('value'), 40, 'value is correct after pageUp press');
          keyboard.keyDown('pageDown');
          assert.equal(slider.option('value'), 50, 'value is correct after pageDown press');
        });
        test('T380070 - the value should not be changed on the \'left\' key press if the value is min', function(assert) {
          var spy = sinon.spy();
          var $slider = $('#slider').dxSlider({
            min: 10,
            value: 10,
            focusStateEnabled: true,
            onValueChanged: spy
          });
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          keyboardMock($handle).press('left');
          assert.strictEqual(spy.called, false, 'the onValueChanged is not called');
        });
        test('T380070 - the value should not be changed on the \'right\' key press if the value is max', function(assert) {
          var spy = sinon.spy();
          var $slider = $('#slider').dxSlider({
            max: 10,
            value: 10,
            focusStateEnabled: true,
            onValueChanged: spy
          });
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          keyboardMock($handle).press('right');
          assert.strictEqual(spy.called, false, 'the onValueChanged is not called');
        });
      });
      module('regression tests', moduleOptions, function() {
        test('change value of invisible element', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 100,
            min: 0,
            value: 20
          }).css('width', 100 + SLIDER_PADDING * 2);
          var instance = $element.dxSlider('instance');
          var range = $element.find('.' + SLIDER_RANGE_CLASS);
          instance.option('visible', false);
          instance.option('value', 40);
          instance.option('visible', true);
          assert.equal(range.width(), 40, 'range width is right');
        });
        test('min value behaviour', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 600,
            min: 100,
            value: 200
          }).css('width', 500);
          var slider = $element.dxSlider('instance');
          pointerMock($element).start().move(250 + $element.offset().left).down();
          assert.equal(slider.option('value'), 350);
        });
        test('B230095 - value is set to \'0\' after click on the handle', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 10,
            min: 0,
            value: 5
          });
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          pointerMock($element.find(("." + SLIDER_HANDLE_CLASS))).start().move(handleX).click();
          assert.equal($element.dxSlider('option', 'value'), 5);
        });
        test('B232111, B233180 - disabled state doesn\'t work', function(assert) {
          var $element = $('#slider').dxSlider({
            min: 0,
            value: 50,
            max: 100,
            disabled: true
          });
          var slider = $element.dxSlider('instance');
          assert.ok($element.hasClass('dx-state-disabled'));
          pointerMock($element).start().move(250 + $element.offset().left).down();
          assert.equal(slider.option('value'), 50);
        });
        test('B233256 - incorrect options', function(assert) {
          var $element = $('#slider').dxSlider({
            min: 0,
            value: 50,
            max: 100
          });
          var slider = $element.dxSlider('instance');
          slider.option('min', 110);
          assert.expect(0);
        });
        test('B233288 - incorrect behavior when swipe on handle', function(assert) {
          var $element = $('#slider').css('width', 500).dxSlider({
            max: 500,
            min: 0,
            value: 250
          });
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          var instance = $element.dxSlider('instance');
          assert.equal(instance.option('value'), 250);
          pointerMock($handle).start().move(handleX).down().move(2).up();
          assert.equal(instance.option('value'), 252);
        });
        test('B234545 dxRangeSlider/dxSlider - incorrect behavior with negative min and max values.', function(assert) {
          var $element = $('#slider').css('width', 960);
          $element.dxSlider({
            max: 100,
            min: 0,
            value: 0
          });
          var slider = $element.dxSlider('instance');
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          slider.option('min', -10);
          slider.option('max', -10);
          assert.equal(slider.option('value'), -10);
          assert.equal($range.width(), 0);
        });
        test('B234766 dxSlider - incorrect value calculation with fractional step', function(assert) {
          var $element = $('#slider').css('width', 960 + 2 * SLIDER_PADDING);
          $element.dxSlider({
            max: 100,
            min: 0,
            value: 0
          });
          var slider = $element.dxSlider('instance');
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          slider.option('step', 2.5);
          slider.option('value', 2.5);
          assert.equal(handlePositionAgainstTrackBar($handle).left, 960 / 40);
          assert.equal($range.width(), 960 / 40);
          slider.option('max', 10);
          slider.option('step', 0.5);
          slider.option('value', 0.5);
          assert.equal(handlePositionAgainstTrackBar($handle).left, 960 / 20);
          assert.equal($range.width(), 960 / 20);
        });
        test('incorrect when step is NAN or empty string', function(assert) {
          var $element = $('#slider').css('width', 500).dxSlider({
            max: 500,
            min: 0,
            value: 250
          });
          var slider = $element.dxSlider('instance');
          slider.option('step', 'NANstring');
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          assert.equal(slider.option('value'), 250);
          pointerMock($handle).start().move(handleX).down().move(50).up();
          assert.equal(slider.option('value'), 300);
          slider.option('step', '');
          slider.option('value', 250);
          assert.equal(slider.option('value'), 250);
          pointerMock($handle).start().move(handleX).down().move(50).up();
          assert.equal(slider.option('value'), 300);
        });
        test('Q374462 dxSlider - It is impossible to set the step option to the float value', function(assert) {
          var $element = $('#slider').css('width', 100).dxSlider({
            max: 1,
            min: -1,
            value: 0
          });
          var slider = $element.dxSlider('instance');
          slider.option('step', 0.01);
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          assert.equal(slider.option('value'), 0);
          pointerMock($handle).start().move(handleX).down().move(10).up();
          assert.equal(slider.option('value'), 0.20);
          slider.option('step', 0.00015);
          slider.option('value', 0);
          assert.equal(slider.option('value'), 0);
          pointerMock($handle).start().move(handleX).down().move(15).up();
          assert.equal(slider.option('value'), 0.30005);
          slider.option('step', 0.0000001);
          slider.option('value', 0);
          pointerMock($handle).start().move(handleX).down().move(15).up();
          assert.equal(slider.option('value'), 0.3, 'step should be reset to default');
        });
        test('step depends on min value after swipe', function(assert) {
          var $element = $('#slider').css('width', 150).dxSlider({
            max: 2,
            min: 0.5,
            value: 0.5,
            step: 1
          });
          var slider = $element.dxSlider('instance');
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          pointerMock($handle).start().move(handleX).down().move(100).up();
          assert.equal(slider.option('value'), 1.5, 'step depends min value');
        });
        test('The error should not be thrown if value is null', function(assert) {
          try {
            var slider = $('#slider').dxSlider({value: null}).dxSlider('instance');
            slider.option('value', 100);
            assert.ok(true, 'The error doesn\'t be thrown');
          } catch (e) {
            assert.ok(false, e);
          }
        });
        test('Value is not jumping when the slider handler is moved', function(assert) {
          var left = $('#qunit-fixture').css('left');
          $('#qunit-fixture').css('left', '0px');
          var $element = $('#slider').dxSlider({
            min: 0,
            max: 3,
            width: 500,
            value: 0
          });
          var $handle = $element.find(("." + SLIDER_HANDLE_CLASS));
          var mouse = pointerMock($handle);
          mouse.start().down();
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          mouse.move(99);
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          assert.ok($range.width() < 160, 'range width is not jumping');
          mouse.up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          $('#qunit-fixture').css('left', left);
        });
      });
      module('RTL', moduleOptions, function() {
        test('render value', function(assert) {
          var $element = $('#slider').css('width', 960 + 2 * SLIDER_PADDING);
          $element.dxSlider({
            max: 100,
            min: 0,
            value: 0,
            rtlEnabled: true
          });
          var slider = $element.dxSlider('instance');
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          var rangeBorderWidth = parseInt($range.css('borderLeftWidth'));
          assert.equal($range.position().left + rangeBorderWidth * 2, 960);
          slider.option('value', 100);
          assert.equal($range.position().left + rangeBorderWidth * 2, 0);
        });
        test('mousedown/touchstart on slider set new value', function(assert) {
          var $element = $('#slider').dxSlider({
            max: 500,
            min: 0,
            value: 0,
            rtlEnabled: true
          }).css('width', 500 + 2 * SLIDER_PADDING);
          var $range = $element.find('.' + SLIDER_RANGE_CLASS);
          pointerMock($element).start({x: SLIDER_PADDING}).move(250 + $element.offset().left).down();
          assert.equal($range.width(), 250);
          pointerMock($element).start({x: SLIDER_PADDING}).move(350 + $element.offset().left).down();
          assert.equal($range.width(), 150);
        });
      });
      module('validation', function() {
        testInActiveWindow('add the CSS class on the focusIn event for show a validation message', function(assert) {
          var $slider = $('#slider');
          $slider.dxSlider({
            max: 100,
            min: 0,
            value: 50,
            isValid: false,
            validationError: {message: 'Test message'}
          });
          $slider.find(("." + SLIDER_HANDLE_CLASS)).first().trigger('focusin');
          assert.ok($slider.hasClass(INVALID_MESSAGE_VISIBLE_CLASS));
          assert.equal($('.dx-overlay-wrapper.dx-invalid-message').css('visibility'), 'visible', 'validation message is shown');
        });
        testInActiveWindow('remove the CSS class on the focusOut event for hide a validation message', function(assert) {
          var $slider = $('#slider');
          $slider.dxSlider({
            max: 100,
            min: 0,
            value: 50,
            isValid: false,
            validationError: {message: 'Test message'}
          });
          var handle = $slider.find(("." + SLIDER_HANDLE_CLASS)).first();
          handle.trigger('focusin');
          handle.trigger('focusout');
          assert.notOk($slider.hasClass(INVALID_MESSAGE_VISIBLE_CLASS));
          assert.equal($('.dx-overlay-wrapper.dx-invalid-message').css('visibility'), 'hidden', 'validation message is hidden');
        });
        testInActiveWindow('validation message should be hidden once focusStateEnabled option switch off', function(assert) {
          var $slider = $('#slider');
          var instance = $slider.dxSlider({
            max: 100,
            min: 0,
            value: 50,
            isValid: false,
            validationError: {message: 'Test message'}
          }).dxSlider('instance');
          var handle = $slider.find(("." + SLIDER_HANDLE_CLASS)).first();
          handle.trigger('focusin');
          instance.option('focusStateEnabled', false);
          assert.notOk($slider.hasClass(INVALID_MESSAGE_VISIBLE_CLASS));
          assert.strictEqual($('.dx-overlay-wrapper.dx-invalid-message').css('visibility'), 'hidden', 'validation message is hidden');
        });
      });
      module('small float step', function() {
        test('real step should be 1 if it is set to zero', function(assert) {
          var realStep = 1;
          var $slider = $('#slider').dxSlider({
            step: 0,
            min: 0,
            max: 3,
            value: 0
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          pointerMock($handle).start().move(handleX).down().move(realStep / 2).up();
          assert.strictEqual(slider.option('value'), realStep, 'new value is correct');
        });
        test('handle should move on correct step when step is very small (T945742)', function(assert) {
          var step = 0.0000001;
          var startValue = 0.5;
          var $slider = $('#slider').dxSlider({
            step: step,
            min: 0,
            max: 1,
            value: startValue
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left + $handle.outerWidth() / 2;
          pointerMock($handle).start().move(handleX).down().move(step).up();
          assert.strictEqual(slider.option('value'), startValue + step, 'new value is correct');
        });
        test('keyboard navigation shound work correctly even when step is very small', function(assert) {
          var step = 0.0000000001;
          var epsilon = step / 10;
          var startValue = 0.50000000005;
          var $slider = $('#slider').dxSlider({
            step: step,
            min: 0,
            max: 1,
            value: startValue
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var keyboard = keyboardMock($handle);
          $handle.focusin();
          var currentValue = 0.5;
          for (var i = 0; i < 15; ++i) {
            keyboard.press('left');
            assert.roughEqual(slider.option('value'), currentValue, epsilon, 'value is correct');
            currentValue -= step;
          }
        });
      });
      module('tooltip integration', {
        beforeEach: function() {
          var $__2 = this;
          this.$slider = $('<div>').appendTo('body');
          positionUtils.setup(this.$slider, {
            my: 'center',
            at: 'center',
            of: window
          });
          this.$slider.css('position', 'absolute');
          this.init = function(options) {
            $__2.slider = $__2.$slider.dxSlider(options).dxSlider('instance');
            $__2.$handle = $__2.$slider.find(("." + SLIDER_HANDLE_CLASS));
            $__2.handle = SliderHandle.getInstance($__2.$handle);
            $__2.$tooltip = $__2.$handle.find(("." + TOOLTIP_CLASS));
            $__2.getTooltip = function() {
              return $__2.$handle.find(("." + TOOLTIP_CLASS));
            };
            $__2.getTooltipContent = function() {
              return $__2.getTooltip().find(("." + TOOLTIP_CONTENT_CLASS));
            };
            $__2.getTooltipText = function() {
              return $.trim($__2.getTooltip().text());
            };
          };
          this.reinit = function(options) {
            $__2.slider.dispose();
            $__2.init(options);
          };
          this.checkTooltipExists = function(exists, assert) {
            var check = exists ? assert.ok.bind(assert) : assert.notOk.bind(assert);
            check(!!$__2.getTooltip().length);
            check($__2.$slider.hasClass('dx-slider-tooltip-position-top') || $__2.$slider.hasClass('dx-slider-tooltip-position-bottom'));
          };
          this.checkTooltipVisible = function(visible, assert) {
            var check = visible ? assert.notEqual.bind(assert) : assert.strictEqual.bind(assert);
            $__2.checkTooltipExists(true, assert);
            check($__2.getTooltipContent().css('visibility'), 'hidden');
          };
        },
        afterEach: function() {
          this.$slider.remove();
        }
      }, function() {
        [{
          name: 'tooltip',
          initValue: {
            enabled: true,
            format: function(value) {
              return ("(" + value + ")");
            },
            position: 'top',
            showMode: 'onHover'
          },
          changeValue: {
            enabled: false,
            showMode: 'onHover',
            position: 'bottom',
            format: function() {}
          }
        }, {
          name: 'tooltip.enabled',
          initValue: true,
          changeValue: false
        }, {
          name: 'tooltip.format',
          initValue: function(value) {
            return ("(" + value + ")");
          },
          changeValue: function(value) {
            return ("[" + value + "]");
          }
        }, {
          name: 'tooltip.showMode',
          initValue: 'always',
          changeValue: 'onHover'
        }, {
          name: 'tooltip.position',
          initValue: 'bottom',
          changeValue: 'top'
        }].forEach(function($__6) {
          var $__7 = $__6,
              name = $__7.name,
              initValue = $__7.initValue,
              changeValue = $__7.changeValue;
          QUnit.test(("slider should pass " + name + " options value to SliderHandle"), function(assert) {
            var $__3,
                $__4;
            this.init(($__3 = {}, Object.defineProperty($__3, name, {
              value: initValue,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            assert.deepEqual(this.handle.option(name), initValue, 'option value is passed on init');
            this.slider.option(($__4 = {}, Object.defineProperty($__4, name, {
              value: changeValue,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            assert.deepEqual(this.handle.option(name), changeValue, 'option value is passed on runtime change');
          });
        });
        test('tooltip default rendering', function(assert) {
          this.init({tooltip: {
              enabled: true,
              showMode: 'always'
            }});
          assert.ok(this.$tooltip.length);
          assert.ok(SliderTooltip.getInstance(this.$tooltip));
        });
        test('tooltip displays current value', function(assert) {
          this.init({
            min: 0,
            value: 50,
            max: 100,
            tooltip: {
              enabled: true,
              showMode: 'always'
            }
          });
          assert.strictEqual(this.getTooltipText(), '50');
          this.slider.option('value', 75);
          assert.strictEqual(this.getTooltipText(), '75');
        });
        test('"rtlEnabled" changing should not leads to error', function(assert) {
          assert.expect(0);
          this.init({
            rtlEnabled: false,
            tooltip: {
              enabled: true,
              showMode: 'onhover'
            }
          });
          this.slider.option('rtlEnabled', true);
        });
        test('slider tooltip should not add hideTopOverlayCallback (T104070)', function(assert) {
          this.init({tooltip: {
              enabled: true,
              showMode: 'always'
            }});
          assert.ok(!hideTopOverlayCallback.hasCallback());
        });
        test('tooltip option changing when slider "visible" = false', function(assert) {
          this.init({visible: false});
          this.slider.option({tooltip: {
              enabled: true,
              position: 'top',
              showMode: 'always'
            }});
          this.slider.option({visible: true});
          var $tooltipContent = this.getTooltipContent();
          var $sliderBar = this.$slider.find(("." + SLIDER_BAR_CLASS));
          var tooltipBottom = $tooltipContent.offset().top + $tooltipContent.outerHeight();
          var sliderTop = $sliderBar.offset().top;
          assert.ok(tooltipBottom < sliderTop, ("tooltip bottom = " + tooltipBottom + ", slider top = " + sliderTop + " - tooltip should be display on top"));
        });
        test('tooltip should repaints when repaint function called (T260971)', function(assert) {
          this.$slider.hide();
          this.init({
            min: 0,
            max: 100,
            value: 50,
            width: 2000,
            tooltip: {
              enabled: true,
              position: 'top',
              showMode: 'always'
            }
          });
          this.$slider.show();
          this.slider.repaint();
          this.checkTooltipExists(true, assert);
        });
        module('tooltip position', function() {
          test('tooltip should be centered after visibility changed', function(assert) {
            var $parent = this.$slider.parent();
            $parent.hide();
            this.init({
              max: 100,
              min: 0,
              value: 50,
              tooltip: {
                enabled: true,
                showMode: 'always',
                position: 'top'
              }
            });
            $parent.show();
            triggerShownEvent($parent);
            var tooltipWidth = this.$tooltip.outerWidth();
            var tooltipCenter = tooltipWidth / 2;
            var tooltipOffsetAgainstHandle = Math.abs(this.$tooltip.position().left) + this.$handle.width() / 2;
            assert.roughEqual(tooltipCenter, tooltipOffsetAgainstHandle, 0.4, 'tooltip position is centered');
          });
          test('tooltip should be centered after render', function(assert) {
            this.init({
              max: 100,
              min: 0,
              value: 50,
              tooltip: {
                enabled: true,
                showMode: 'always',
                position: 'top'
              }
            });
            var tooltipWidth = this.$tooltip.outerWidth();
            var tooltipCenter = tooltipWidth / 2;
            var tooltipOffsetAgainstHandle = Math.abs(this.$tooltip.position().left) + this.$handle.width() / 2;
            assert.roughEqual(tooltipCenter, tooltipOffsetAgainstHandle, 0.5, 'tooltip position is centered');
          });
          test('"tooltip.position" option', function(assert) {
            this.init({tooltip: {
                enabled: true,
                showMode: 'always',
                position: 'top'
              }});
            var $sliderBar = this.$slider.find(("." + SLIDER_BAR_CLASS));
            var $tooltipContent = this.$handle.find(("." + TOOLTIP_CONTENT_CLASS));
            var tooltipBottom = $tooltipContent.offset().top + $tooltipContent.outerHeight();
            var sliderTop = $sliderBar.offset().top;
            assert.ok(this.$slider.hasClass('dx-slider-tooltip-position-top'));
            assert.ok(!this.$slider.hasClass('dx-slider-tooltip-position-bottom'));
            assert.ok(tooltipBottom < sliderTop, ("tooltip bottom = '" + tooltipBottom + "', slider top = '" + sliderTop + "' - tooltip should be display on top"));
            this.slider.option('tooltip.position', 'bottom');
            $tooltipContent = this.$handle.find(("." + TOOLTIP_CONTENT_CLASS));
            var tooltipTop = $tooltipContent.offset().top;
            var sliderBottom = $sliderBar.offset().top + $sliderBar.outerHeight();
            assert.ok(!this.$slider.hasClass('dx-slider-tooltip-position-top'));
            assert.ok(this.$slider.hasClass('dx-slider-tooltip-position-bottom'));
            assert.ok(tooltipTop > sliderBottom, ("tooltip top = '" + tooltipTop + "', slider bottom = '" + sliderBottom + " - tooltip should be display on bottom"));
          });
          test('tooltip should be fitted into slide right and left bounds', function(assert) {
            this.$slider.css('position', '');
            this.init({
              value: 0,
              min: 0,
              max: 100,
              tooltip: {
                enabled: true,
                showMode: 'always'
              }
            });
            var $tooltipContent = this.getTooltipContent();
            var tooltipLeft = $tooltipContent.offset().left;
            var sliderLeft = this.$slider.offset().left;
            assert.ok(tooltipLeft >= sliderLeft, ("tooltip left = '" + tooltipLeft + "', slider left = '" + sliderLeft + "'"));
            this.slider.option('value', 100);
            var tooltipRight = $tooltipContent.offset().left + $tooltipContent.outerWidth();
            var sliderRight = this.$slider.offset().left + this.$slider.outerWidth();
            assert.ok(tooltipRight <= sliderRight, ("tooltip right = '" + tooltipRight + "', slider right = '" + sliderRight + "'"));
          });
          test('tooltip renders correct after value length changed', function(assert) {
            var originalFX = fx.off;
            try {
              fx.off = true;
              this.init({
                min: -1000000,
                max: 1000000,
                value: 0,
                width: 2000,
                tooltip: {
                  enabled: true,
                  position: 'top',
                  showMode: 'always'
                }
              });
              this.slider.option('value', 500000);
              var $tooltipContent = this.getTooltipContent();
              var $popupContent = $tooltipContent.find('.dx-popup-content');
              var centerSlider = this.$handle.offset().left + this.$handle.outerWidth() / 2;
              var centerTooltipContent = $tooltipContent.offset().left + $tooltipContent.outerWidth() / 2;
              assert.roughEqual(Math.abs(centerSlider), Math.abs(centerTooltipContent), 1, 'center slider equals center tooltip');
              assert.roughEqual($tooltipContent.width(), $popupContent.outerWidth(), 2.1, 'popupcontent is stretched');
            } finally {
              fx.off = originalFX;
            }
          });
          test('slider in scrollable should not show scroll in max position (T315618)', function(assert) {
            var sliderWidth = 400;
            this.init({
              min: 0,
              max: 100,
              value: 100,
              width: sliderWidth,
              tooltip: {
                enabled: true,
                position: 'bottom',
                showMode: 'always'
              }
            });
            var $tooltipContent = this.getTooltipContent();
            var tooltipRightBorder = $tooltipContent.offset().left + $tooltipContent.outerWidth() - this.$slider.offset().left;
            var boundaryOffset = sliderWidth - tooltipRightBorder;
            assert.roughEqual(boundaryOffset, 2, 0.3, 'tooltip content should have correct boundary offset');
          });
          test('arrow should be centered after dimension was changed', function(assert) {
            this.$slider.css('position', '');
            this.init({
              min: 0,
              max: 100,
              value: 50,
              tooltip: {
                enabled: true,
                showMode: 'always'
              },
              useInkRipple: false
            });
            resizeCallbacks.fire();
            var $arrow = this.$slider.find('.dx-popover-arrow');
            var arrowCenter = $arrow.offset().left + $arrow.outerWidth() / 2;
            var handleCenter = this.$handle.offset().left + this.$handle.outerWidth() / 2;
            assert.roughEqual(arrowCenter, handleCenter, 0.1, 'arrow is centered');
          });
          test('arrow should not go outside of the content overlay', function(assert) {
            this.init({
              min: 0,
              max: 100,
              value: 0,
              tooltip: {
                enabled: true,
                showMode: 'always'
              }
            });
            var $arrow = this.$slider.find('.dx-popover-arrow');
            this.$handle.width(SLIDER_HANDLE_WIDTH);
            resizeCallbacks.fire();
            assert.ok($arrow.offset().left >= this.getTooltipContent().offset().left, 'arrow was fitted');
          });
        });
        module('tooltip.enabled', function() {
          test('"repaint" method should not leads to error if "tooltip.enabled" is true', function(assert) {
            assert.expect(0);
            this.init({tooltip: {
                enabled: true,
                showMode: 'always'
              }});
            this.slider.repaint();
          });
          test('renders or remove tooltip', function(assert) {
            this.init({tooltip: {
                enabled: false,
                showMode: 'always'
              }});
            this.checkTooltipExists(false, assert);
            this.slider.option('tooltip.enabled', true);
            this.checkTooltipExists(true, assert);
            this.slider.option('tooltip.enabled', false);
            this.checkTooltipExists(false, assert);
          });
          test('and showMode="always" should show tooltip on init', function(assert) {
            this.init({tooltip: {
                enabled: true,
                showMode: 'always'
              }});
            this.checkTooltipVisible(true, assert);
          });
          test('and showMode="onHover" on init', function(assert) {
            this.init({tooltip: {
                enabled: true,
                showMode: 'onHover'
              }});
            this.checkTooltipVisible(false, assert);
            this.$handle.addClass(HOVER_STATE_CLASS);
            this.checkTooltipVisible(true, assert);
          });
          test('runtime change to true shows tooltip if showMode="always"', function(assert) {
            this.init({tooltip: {showMode: 'always'}});
            this.slider.option('tooltip.enabled', true);
            this.checkTooltipVisible(true, assert);
          });
          test('runtime change to true if showMode="onHover"', function(assert) {
            this.init({tooltip: {showMode: 'onHover'}});
            this.slider.option('tooltip.enabled', true);
            this.checkTooltipVisible(false, assert);
            this.$handle.addClass(HOVER_STATE_CLASS);
            this.checkTooltipVisible(true, assert);
          });
        });
        module('tooltip.showMode', function() {
          test('appropriate class should be added to handle if showMode="onHover"', function(assert) {
            this.init({
              min: 0,
              value: 50,
              max: 100,
              tooltip: {
                enabled: true,
                showMode: 'onHover'
              }
            });
            assert.ok(this.$handle.hasClass(SLIDER_TOOLTIP_VISIBILITY_CLASS));
            this.slider.option('tooltip.showMode', 'always');
            assert.ok(!this.$handle.hasClass(SLIDER_TOOLTIP_VISIBILITY_CLASS));
          });
        });
        module('"tooltip.format" option', function() {
          test('as function', function(assert) {
            this.init({
              min: 0,
              value: 50,
              max: 100,
              tooltip: {
                enabled: true,
                showMode: 'always',
                format: function(value) {
                  return '$' + value;
                }
              }
            });
            assert.strictEqual(this.getTooltipText(), '$50');
            this.slider.option('value', 75);
            assert.strictEqual(this.getTooltipText(), '$75');
          });
          test('as FormatHelper format', function(assert) {
            this.init({
              min: 0,
              value: 0.12345,
              max: 1,
              tooltip: {
                enabled: true,
                showMode: 'always',
                format: {
                  type: 'fixedpoint',
                  precision: 1
                }
              }
            });
            assert.strictEqual(this.getTooltipText(), '0.1');
            this.slider.option('tooltip.format', {
              format: 'fixedpoint',
              precision: 2
            });
            assert.strictEqual(this.getTooltipText(), '0.12');
          });
          test('changing should re-render tooltip content', function(assert) {
            this.init({
              min: 0,
              value: 1,
              max: 1,
              tooltip: {
                enabled: true,
                showMode: 'always',
                format: function(value) {
                  return '(' + value + ')';
                }
              }
            });
            assert.strictEqual(this.getTooltipText(), '(1)');
            this.slider.option('tooltip.format', function(value) {
              return '[' + value + ']';
            });
            assert.strictEqual(this.getTooltipText(), '[1]');
          });
          test('as undefined (null, false) should render value as is', function(assert) {
            this.init({
              min: 0,
              value: 1,
              max: 1,
              tooltip: {
                enabled: true,
                showMode: 'always',
                format: null
              }
            });
            assert.strictEqual(this.getTooltipText(), '1');
          });
          test('tooltip width should be updated when value is formatted', function(assert) {
            var values = ['first', 'second value', 'third'];
            this.init({
              min: 0,
              value: 1,
              max: 3,
              tooltip: {
                enabled: true,
                showMode: 'always',
                format: function(index) {
                  return values[index - 1];
                }
              }
            });
            this.slider.option('value', 2);
            var $tooltipContent = this.getTooltipContent();
            var $popupContent = this.$tooltip.find(("." + POPUP_CONTENT_CLASS));
            assert.ok($tooltipContent.width() >= $popupContent.width());
          });
        });
      });
      module('if only the single value is possible', moduleOptions, function() {
        test('click on slider should not change value either handle position', function(assert) {
          var value = 1;
          var $slider = $('#slider').dxSlider({
            min: value,
            max: value,
            value: value
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left;
          pointerMock($slider).down();
          assert.strictEqual($handle.offset().left, handleX, 'handle position was not changed');
          assert.strictEqual(slider.option('value'), value, 'value was not changed');
        });
        test('handle move should not change value either handle position', function(assert) {
          var value = 3;
          var $slider = $('#slider').dxSlider({
            min: value,
            max: value,
            value: value
          });
          var slider = $slider.dxSlider('instance');
          var $handle = $slider.find(("." + SLIDER_HANDLE_CLASS));
          var handleX = $handle.offset().left;
          pointerMock($handle).start().down().move(-100).up();
          assert.strictEqual($handle.offset().left, handleX, 'handle position was not changed');
          assert.strictEqual(slider.option('value'), value, 'value was not changed');
        });
      });
      module('valueChangeMode option', {beforeEach: function() {
          var $__2 = this;
          this.valueChangedHandler = sinon.stub();
          this.$element = $('#slider').dxSlider({
            valueChangeMode: 'onHandleRelease',
            onValueChanged: this.valueChangedHandler,
            tooltip: {
              enabled: true,
              showMode: 'always'
            }
          });
          this.instance = this.$element.dxSlider('instance');
          this.$handle = this.$element.find(("." + SLIDER_HANDLE_CLASS));
          this.$wrapper = this.$element.find(("." + SLIDER_WRAPPER_CLASS));
          this.pointer = pointerMock(this.$wrapper);
          this.keyboard = keyboardMock(this.$handle);
          this.$tooltip = this.$handle.find(("." + TOOLTIP_CLASS));
          this.getTooltip = function() {
            return $__2.$handle.find(("." + TOOLTIP_CLASS));
          };
          this.getTooltipText = function() {
            return $.trim($__2.getTooltip().text());
          };
        }}, function() {
        test('slider value should not change on swipe with "onHandleRelease" valueChangeMode', function(assert) {
          this.pointer.start({x: SLIDER_PADDING});
          this.pointer.swipeStart();
          this.pointer.swipe(20);
          assert.notOk(this.valueChangedHandler.called, 'the onValueChanged is not called');
          this.pointer.swipeEnd(40);
          assert.ok(this.valueChangedHandler.called, 'the onValueChanged is called');
          assert.strictEqual(this.instance.option('value'), 90);
        });
        test('slider tooltip value should change on swipe if valueChangeMode = onHandleRelease', function(assert) {
          this.pointer.start({x: SLIDER_PADDING});
          this.pointer.swipeStart();
          this.pointer.swipe(20);
          assert.strictEqual(this.getTooltipText(), '70');
          this.pointer.swipeEnd(40);
          assert.strictEqual(this.getTooltipText(), '90');
        });
        test('slider should change its value on every step after runtime change valueChangeMode to onHandleMove', function(assert) {
          this.instance.option('valueChangeMode', 'onHandleMove');
          this.pointer.start({x: SLIDER_PADDING});
          this.pointer.swipeStart();
          this.pointer.swipe(20);
          assert.strictEqual(this.valueChangedHandler.called, true, 'the onValueChanged is called');
          this.pointer.swipeEnd(20);
          assert.strictEqual(this.instance.option('value'), 70);
        });
        test('slider should change its value on moving complete after runtime change valueChangeMode to onHandleRelease', function(assert) {
          this.instance.option('valueChangeMode', 'onHandleRelease');
          this.pointer.start({x: SLIDER_PADDING});
          this.pointer.swipeStart().swipe(20);
          assert.notOk(this.valueChangedHandler.called, 'the onValueChanged is not called');
          assert.strictEqual(this.instance.option('value'), 50, 'value is not changed');
          this.pointer.swipeEnd(20);
          assert.ok(this.valueChangedHandler.called, 'the onValueChanged is called');
          assert.strictEqual(this.instance.option('value'), 70, 'value is changed');
        });
        test('tooltip value should be correctly updated on left arrow pressed', function(assert) {
          this.instance.option('valueChangeMode', 'onHandleMove');
          this.keyboard.press('leftArrow');
          assert.strictEqual(this.getTooltipText(), '49');
        });
        test('tooltip value should be correctly updated on right arrow pressed', function(assert) {
          this.instance.option('valueChangeMode', 'onHandleMove');
          this.keyboard.press('rightArrow');
          assert.strictEqual(this.getTooltipText(), '51');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","animation/position","generic_light.css!","core/config","core/utils/resize_callbacks","events/visibility_change","jquery","mobile/hide_callback","ui/slider","ui/slider/ui.slider_tooltip","ui/slider/ui.slider_handle","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","events/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("animation/position"), require("generic_light.css!"), require("core/config"), require("core/utils/resize_callbacks"), require("events/visibility_change"), require("jquery"), require("mobile/hide_callback"), require("ui/slider"), require("ui/slider/ui.slider_tooltip"), require("ui/slider/ui.slider_handle"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("events/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=slider.tests.js.map