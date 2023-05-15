!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/checkbox.tests.js"], ["jquery","core/devices","core/utils/shadow_dom","../../helpers/keyboardMock.js","ui/validation_engine","ui/check_box","events/utils/index","generic_light.css!","ui/validator"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/checkbox.tests.js", ["jquery", "core/devices", "core/utils/shadow_dom", "../../helpers/keyboardMock.js", "ui/validation_engine", "ui/check_box", "events/utils/index", "generic_light.css!", "ui/validator"], function($__export) {
  "use strict";
  var $,
      devices,
      addShadowDomStyles,
      keyboardMock,
      validateGroup,
      dxCheckBox,
      normalizeKeyName,
      CHECKBOX_CLASS,
      CHECKBOX_CHECKED_CLASS,
      ICON_SELECTOR;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      validateGroup = $__m.validateGroup;
    }, function($__m) {
      dxCheckBox = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div id=\"qunit-fixture\">\n            <div id=\"checkBox\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      CHECKBOX_CLASS = 'dx-checkbox';
      CHECKBOX_CHECKED_CLASS = 'dx-checkbox-checked';
      ICON_SELECTOR = '.dx-checkbox-icon';
      QUnit.module('Checkbox', function() {
        var isRenovation = !!dxCheckBox.IS_RENOVATED_WIDGET;
        QUnit.test('checkBox is checked if any non-nullable data is passed as value (T1044062)', function(assert) {
          var $checkBox = $('#checkBox').dxCheckBox({});
          var checkBox = $checkBox.dxCheckBox('instance');
          [true, 1, 'some', {}].forEach(function(value) {
            checkBox.option({value: value});
            assert.ok($checkBox.hasClass(CHECKBOX_CHECKED_CLASS), ("checkbox is checked if value=" + JSON.stringify(value)));
          });
        });
        QUnit.module('methods', function() {
          QUnit.testInActiveWindow('focus', function(assert) {
            var $element = $('#checkBox').dxCheckBox({focusStateEnabled: true});
            var instance = $element.dxCheckBox('instance');
            instance.focus();
            assert.ok($element.hasClass('dx-state-focused'), 'checkBox has focus class');
          });
        });
        QUnit.module('render', function() {
          QUnit.test('init with default options', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var instance = $element.dxCheckBox('instance');
            assert.strictEqual(instance.option('value'), false, 'checkbox has a false value by default');
          });
          QUnit.test('click triggers user handler and changes state', function(assert) {
            assert.expect(5);
            var checked = false;
            var $element = $('#checkBox').dxCheckBox({onValueChanged: function(e) {
                assert.ok(e.value, 'value present');
                checked = true;
              }});
            var instance = $element.dxCheckBox('instance');
            assert.notOk(checked);
            assert.notOk(instance.option('value'));
            $element.trigger('dxclick');
            assert.ok(checked);
            assert.ok(instance.option('value'));
          });
        });
        QUnit.module('validation', function() {
          if (devices.real().deviceType === 'desktop') {
            QUnit.test('the click should be processed before the validation message is shown (T570458)', function(assert) {
              var $checkBox = $('#checkBox').dxCheckBox({}).dxValidator({validationRules: [{
                  type: 'required',
                  message: 'message'
                }]});
              var checkBox = $checkBox.dxCheckBox('instance');
              var isValidationMessageVisible = function() {
                var message = $checkBox.find('.dx-overlay-wrapper.dx-invalid-message').get(0);
                return message && window.getComputedStyle(message).visibility === 'visible';
              };
              validateGroup();
              assert.notOk(checkBox.option('isValid'));
              $checkBox.focus();
              assert.notOk(checkBox.option('isValid'));
              assert.notOk(isValidationMessageVisible());
              $checkBox.trigger('dxclick');
              assert.ok(checkBox.option('isValid'));
              assert.notOk(isValidationMessageVisible());
              $checkBox.trigger('dxclick');
              assert.notOk(checkBox.option('isValid'));
              assert.ok(isValidationMessageVisible());
            });
            QUnit.test('should show validation message after focusing', function(assert) {
              var clock = sinon.useFakeTimers();
              var $checkBox = $('#checkBox').dxCheckBox({}).dxValidator({validationRules: [{
                  type: 'required',
                  message: 'message'
                }]});
              var instance = $checkBox.dxCheckBox('instance');
              validateGroup();
              instance.focus();
              clock.tick(200);
              var message = $checkBox.find('.dx-overlay-wrapper.dx-invalid-message').get(0);
              assert.strictEqual(window.getComputedStyle(message).visibility, 'visible');
              clock.restore();
            });
          }
        });
        QUnit.module('options', function() {
          QUnit.test('visible', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var instance = $element.dxCheckBox('instance');
            instance.option('width', 1);
            assert.ok($element.is(':visible'), 'checkBox is visible');
            instance.option('visible', false);
            assert.ok($element.is(':hidden'), 'checkBox is hidden');
          });
          QUnit.test('text is changed according to the corresponding option', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var instance = $element.dxCheckBox('instance');
            instance.option('text', 'new text');
            assert.equal($element.text(), 'new text', 'checkbox changed text to \'new text\'');
            instance.option('text', 'new text 2');
            assert.equal($element.text(), 'new text 2', 'checkbox changed text to \'new text 2\'');
          });
          QUnit.test('disabled', function(assert) {
            var $element = $('#checkBox').dxCheckBox({
              disabled: true,
              value: false
            });
            var instance = $element.dxCheckBox('instance');
            $element.trigger('dxclick');
            assert.equal(instance.option('value'), false);
            instance.option('disabled', false);
            $element.trigger('dxclick');
            assert.equal(instance.option('value'), true);
          });
          QUnit.test('checkbox icon must not resize according to the "width" and "height" options', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var instance = $element.dxCheckBox('instance');
            var initWidth = $element.find(ICON_SELECTOR).width();
            var initHeight = $element.find(ICON_SELECTOR).height();
            var newSize = 50;
            instance.option('width', newSize);
            assert.equal($element.find(ICON_SELECTOR).width(), initWidth, 'icon width is not resized');
            instance.option('height', newSize);
            assert.equal($element.find(ICON_SELECTOR).height(), initHeight, 'icon height is not resized');
          });
        });
        QUnit.module('hidden input', function() {
          QUnit.test('the hidden input has "true" value', function(assert) {
            var $element = $('#checkBox').dxCheckBox({value: true});
            var $input = $element.find('input');
            assert.strictEqual($input.val(), 'true', 'hidden input value is correct');
          });
          QUnit.test('the hidden input has "false" value', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var $input = $element.find('input');
            assert.strictEqual($input.val(), 'false', 'hidden input value is correct');
          });
          QUnit.test('the hidden should change its value on widget value change', function(assert) {
            var $element = $('#checkBox').dxCheckBox({value: undefined});
            var instance = $element.dxCheckBox('instance');
            var $input = $element.find('input');
            instance.option('value', false);
            assert.strictEqual($input.val(), 'false', 'input value has been changed');
            instance.option('value', true);
            assert.strictEqual($input.val(), 'true', 'input value has been changed second time');
          });
        });
        QUnit.module('widget sizing render', function() {
          QUnit.test('constructor', function(assert) {
            var $element = $('#checkBox').dxCheckBox({width: 400});
            var instance = $element.dxCheckBox('instance');
            assert.strictEqual(instance.option('width'), 400);
            assert.strictEqual($element.outerWidth(), 400, 'outer width of the element must be equal to custom width');
          });
          QUnit.test('change width', function(assert) {
            var $element = $('#checkBox').dxCheckBox();
            var instance = $element.dxCheckBox('instance');
            var customWidth = 400;
            instance.option('width', customWidth);
            assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
          });
        });
        QUnit.module('keyboard navigation', function() {
          QUnit.test('space press should toggle value', function(assert) {
            var $element = $('#checkBox').dxCheckBox({
              focusStateEnabled: true,
              value: false
            });
            var instance = $element.dxCheckBox('instance');
            var keyboard = keyboardMock($element);
            $element.trigger('focusin');
            keyboard.keyDown('space');
            assert.ok(instance.option('value'), 'value has been changed successfully');
          });
        });
        QUnit.module('events', function() {
          QUnit.test('valueChanged event fired after setting the value by click', function(assert) {
            var handler = sinon.stub();
            var $element = $('#checkBox').dxCheckBox({});
            var checkbox = $element.dxCheckBox('instance');
            checkbox.on('valueChanged', handler);
            $element.trigger('dxclick');
            assert.ok(handler.calledOnce);
          });
          QUnit.test('valueChanged handler runtime change', function(assert) {
            var handler = sinon.stub();
            var newHandler = sinon.stub();
            var $element = $('#checkBox').dxCheckBox({onValueChanged: handler});
            var checkBox = $element.dxCheckBox('instance');
            checkBox.option('onValueChanged', newHandler);
            $element.trigger('dxclick');
            assert.ok(newHandler.calledOnce);
          });
          QUnit.test('valueChanged should have correct previousValue when it is undefined', function(assert) {
            var handler = sinon.stub();
            var $element = $('#checkBox').dxCheckBox({
              onValueChanged: handler,
              value: undefined
            });
            $element.trigger('dxclick');
            assert.ok(handler.calledOnce);
            assert.strictEqual(handler.getCalls()[0].args[0].previousValue, undefined, 'previousValue is correct');
          });
          QUnit.test('value=undefined should be set correctly', function(assert) {
            var $element = $('#checkBox').dxCheckBox({value: undefined});
            var checkbox = $element.dxCheckBox('instance');
            assert.strictEqual(checkbox.option('value'), undefined, 'value on init is correct');
            assert.ok($element.hasClass('dx-checkbox-indeterminate'), '"dx-checkbox-indeterminate"class has been added');
            $element.trigger('dxclick');
            assert.strictEqual(checkbox.option('value'), true, 'value on correct after click');
            assert.ok($element.hasClass('dx-checkbox-checked'), 'class has been changed to "dx-checkbox-checked"');
            checkbox.option('value', undefined);
            assert.strictEqual(checkbox.option('value'), undefined, 'value on correct after runtime change to undefined');
            assert.ok($element.hasClass('dx-checkbox-indeterminate'), 'class has been added');
          });
          QUnit.test('valueChanged event fired after setting the value by keyboard', function(assert) {
            var handler = sinon.stub();
            var $element = $('#checkBox').dxCheckBox({focusStateEnabled: true});
            var checkbox = $element.dxCheckBox('instance');
            var keyboard = keyboardMock($element);
            checkbox.on('valueChanged', handler);
            $element.trigger('focusin');
            keyboard.keyDown('space');
            assert.ok(handler.calledOnce);
          });
          QUnit.test('valueChanged event fired after setting the value by option', function(assert) {
            var handler = sinon.stub();
            var $element = $('#checkBox').dxCheckBox({value: true});
            var checkbox = $element.dxCheckBox('instance');
            checkbox.on('valueChanged', handler);
            checkbox.option('value', false);
            assert.ok(handler.calledOnce);
          });
          QUnit.module('valueChanged handler should receive correct event parameter', {beforeEach: function() {
              var $__2 = this;
              this.valueChangedHandler = sinon.stub();
              this.$element = $('#checkBox').dxCheckBox({
                onValueChanged: this.valueChangedHandler,
                focusStateEnabled: true
              });
              this.instance = this.$element.dxCheckBox('instance');
              this.keyboard = keyboardMock(this.$element);
              this.testProgramChange = function(assert) {
                var value = $__2.instance.option('value');
                $__2.instance.option('value', !value);
                var callCount = $__2.valueChangedHandler.callCount - 1;
                var event = $__2.valueChangedHandler.getCall(callCount).args[0].event;
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
            QUnit.test('after click', function(assert) {
              this.$element.trigger('dxclick');
              this.checkEvent(assert, 'dxclick', this.$element);
              this.testProgramChange(assert);
            });
            QUnit.test('after space press', function(assert) {
              this.keyboard.press('space');
              this.checkEvent(assert, 'keydown', this.$element, 'space');
              this.testProgramChange(assert);
            });
            QUnit.test('after runtime change', function(assert) {
              this.testProgramChange(assert);
            });
          });
          QUnit.test('onContentReady is fired after first render', function(assert) {
            assert.expect(2);
            $('#checkBox').dxCheckBox({
              value: true,
              onContentReady: function(e) {
                assert.ok($(e.element).find('input').val());
                assert.ok($(e.element).hasClass(CHECKBOX_CLASS));
              }
            });
          });
        });
        QUnit.module('Renovated Checkbox', function() {
          if (isRenovation) {
            QUnit.module('renovated options', {beforeEach: function() {
                this.$element = $('#checkBox').dxCheckBox();
                this.instance = this.$element.dxCheckBox('instance');
              }}, function() {
              QUnit.test('checkbox icon must resize according to the "iconSize" option', function(assert) {
                var iconSize = 50;
                this.instance.option({iconSize: iconSize});
                assert.strictEqual(this.$element.find(ICON_SELECTOR).outerWidth(), iconSize, 'icon width is resized');
                assert.strictEqual(this.$element.find(ICON_SELECTOR).outerHeight(), iconSize, 'icon height is resized');
              });
              QUnit.test('checkbox icon\'s font-size should be Math.ceil(iconSize * 16 / 22)', function(assert) {
                var iconSize = 50;
                this.instance.option({
                  iconSize: iconSize,
                  value: true
                });
                var newFontSize = this.$element.find(ICON_SELECTOR).css('font-size');
                var iconFontSizeRatio = 16 / 22;
                var expectedFontSize = (Math.ceil(iconSize * iconFontSizeRatio) + "px");
                assert.strictEqual(newFontSize, expectedFontSize, 'font-size has correct value');
              });
              QUnit.test('checkbox icon\'s font-size should decrease if "iconSize" option decrease', function(assert) {
                var iconSize = 10;
                this.instance.option({
                  iconSize: iconSize,
                  value: true
                });
                assert.strictEqual(this.$element.find(ICON_SELECTOR).css('font-size'), '8px', 'font-size was decreased');
              });
              QUnit.test('checkbox icon\'s font-size should increase if "iconSize" option increase', function(assert) {
                var iconSize = 30;
                this.instance.option({
                  iconSize: iconSize,
                  value: true
                });
                assert.strictEqual(this.$element.find(ICON_SELECTOR).css('font-size'), '22px', 'font-size was increased');
              });
              QUnit.test('checkbox root element size should adjust to "iconSize" options if "widht"/"height" options are not specified', function(assert) {
                var iconSize = 45;
                this.instance.option({iconSize: iconSize});
                assert.strictEqual(this.$element.css('width'), (iconSize + "px"), 'root element width equals icon width');
                assert.strictEqual(this.$element.css('height'), (iconSize + "px"), 'root element height equals icon height');
              });
              QUnit.test('checkbox root element size should not adjust to "iconSize" options if "widht"/"height" options not defined', function(assert) {
                var iconSize = 45;
                var width = 30;
                var height = 30;
                this.instance.option({
                  iconSize: iconSize,
                  width: width,
                  height: height
                });
                assert.strictEqual(this.$element.css('width'), (width + "px"), 'root element width not equals icon width');
                assert.strictEqual(this.$element.css('height'), (height + "px"), 'root element height not equals icon height');
              });
              [14, '14', '14px', '50%'].forEach(function(value) {
                QUnit.test(("checkbox \"iconSize\" option should correctly apply value in format " + value), function(assert) {
                  this.instance.option({
                    width: 28,
                    height: 28,
                    iconSize: value
                  });
                  assert.strictEqual(this.$element.find(ICON_SELECTOR).outerWidth(), 14, ("icon got expected width from " + value + " option value"));
                });
              });
            });
            QUnit.testInActiveWindow('blur method', function(assert) {
              var blurSpy = sinon.spy();
              var $element = $('#checkBox').dxCheckBox({focusStateEnabled: true});
              var instance = $element.dxCheckBox('instance');
              $element.on('blur', blurSpy);
              instance.focus();
              instance.blur();
              assert.ok(blurSpy.calledOnce, 'element was blurred');
            });
            QUnit.module('_isFocused method', function() {
              QUnit.test('should return true if element has dx-state-focused class', function(assert) {
                var $element = $('#checkBox').dxCheckBox({focusStateEnabled: true});
                var instance = $element.dxCheckBox('instance');
                $element.addClass('dx-state-focused');
                assert.ok(instance._isFocused(), 'checkBox is focused');
              });
              QUnit.test('should return false if element does not have dx-state-focused class', function(assert) {
                var $element = $('#checkBox').dxCheckBox({focusStateEnabled: true});
                var instance = $element.dxCheckBox('instance');
                assert.notOk(instance._isFocused(), 'checkBox is not focused');
              });
            });
            QUnit.module('indeterminate state', function() {
              [{
                initial: 'string',
                expected: false
              }, {
                initial: '',
                expected: null
              }, {
                initial: 0,
                expected: null
              }, {
                initial: 1,
                expected: false
              }, {
                initial: true,
                expected: false
              }, {
                initial: false,
                expected: null
              }, {
                initial: undefined,
                expected: true
              }, {
                initial: null,
                expected: true
              }].forEach(function($__3) {
                var $__4 = $__3,
                    initial = $__4.initial,
                    expected = $__4.expected;
                QUnit.test(("click should change value from \"" + initial + "\" to \"" + expected + "\""), function(assert) {
                  var $element = $('#checkBox').dxCheckBox({
                    enableThreeStateBehavior: true,
                    focusStateEnabled: true,
                    value: initial
                  });
                  var instance = $element.dxCheckBox('instance');
                  $element.trigger('dxclick');
                  assert.strictEqual(instance.option('value'), expected, 'value has been changed');
                });
                QUnit.test(("space press should change value from \"" + initial + "\" to \"" + expected + "\""), function(assert) {
                  var $element = $('#checkBox').dxCheckBox({
                    enableThreeStateBehavior: true,
                    focusStateEnabled: true,
                    value: initial
                  });
                  var instance = $element.dxCheckBox('instance');
                  var keyboard = keyboardMock($element);
                  $element.trigger('focusin');
                  keyboard.keyDown('space');
                  assert.strictEqual(instance.option('value'), expected, 'value has been changed');
                });
              });
            });
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","core/utils/shadow_dom","../../helpers/keyboardMock.js","ui/validation_engine","ui/check_box","events/utils","generic_light.css!","ui/validator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("core/utils/shadow_dom"), require("../../helpers/keyboardMock.js"), require("ui/validation_engine"), require("ui/check_box"), require("events/utils"), require("generic_light.css!"), require("ui/validator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=checkbox.tests.js.map