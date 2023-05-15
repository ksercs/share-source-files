!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/button.tests.js"], ["jquery","core/renderer","ui/validation_engine","ui/validator","ui/validation/default_adapter","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/checkStyleHelper.js","localization","localization/messages/ja.json!","core/utils/deferred","core/utils/shadow_dom","ui/button","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/button.tests.js", ["jquery", "core/renderer", "ui/validation_engine", "ui/validator", "ui/validation/default_adapter", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "../../helpers/checkStyleHelper.js", "localization", "localization/messages/ja.json!", "core/utils/deferred", "core/utils/shadow_dom", "ui/button", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      renderer,
      ValidationEngine,
      Validator,
      DefaultAdapter,
      keyboardMock,
      pointerMock,
      checkStyleHelper,
      localization,
      ja,
      Deferred,
      addShadowDomStyles,
      dxButton,
      BUTTON_HAS_TEXT_CLASS,
      BUTTON_HAS_ICON_CLASS,
      BUTTON_BACK_CLASS,
      BUTTON_SUBMIT_INPUT_CLASS,
      BUTTON_TEXT_STYLE_CLASS,
      BUTTON_CONTAINED_STYLE_CLASS,
      BUTTON_OUTLINED_STYLE_CLASS,
      INK_RIPPLE_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      Validator = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      checkStyleHelper = $__m;
    }, function($__m) {
      localization = $__m.default;
    }, function($__m) {
      ja = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      dxButton = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<form id="form">\
        <div id="button"></div>\
        <div id="widget"></div>\
        <div id="widthRootStyle" style="width: 300px;"></div>\
        <div id="inkButton"></div>\
            <div data-options="dxTemplate: { name: \'content\' }" data-bind="text: text"></div>\
        </div>\
        </form>';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
        $('#form').on('submit', function(e) {
          e.preventDefault();
        });
      });
      BUTTON_HAS_TEXT_CLASS = 'dx-button-has-text';
      BUTTON_HAS_ICON_CLASS = 'dx-button-has-icon';
      BUTTON_BACK_CLASS = 'dx-button-back';
      BUTTON_SUBMIT_INPUT_CLASS = 'dx-button-submit-input';
      BUTTON_TEXT_STYLE_CLASS = 'dx-button-mode-text';
      BUTTON_CONTAINED_STYLE_CLASS = 'dx-button-mode-contained';
      BUTTON_OUTLINED_STYLE_CLASS = 'dx-button-mode-outlined';
      INK_RIPPLE_CLASS = 'dx-inkripple';
      QUnit.module('Button', function() {
        QUnit.module('options changed callbacks', {beforeEach: function() {
            this.element = $('#button').dxButton();
            this.instance = this.element.dxButton('instance');
          }}, function() {
          QUnit.test('text', function(assert) {
            this.instance.option('text', 'new text');
            assert.equal(this.element.text(), 'new text');
            this.instance.option('text', 'new text 2');
            assert.equal(this.element.text(), 'new text 2');
            assert.ok(!this.element.hasClass(BUTTON_HAS_ICON_CLASS), 'button with text only has not icon class');
            assert.ok(this.element.hasClass(BUTTON_HAS_TEXT_CLASS, 'button with text has text class'));
          });
          QUnit.test('onClick', function(assert) {
            var clickHandler = sinon.spy();
            this.instance.option('onClick', clickHandler);
            this.element.trigger('dxclick');
            assert.ok(clickHandler.calledOnce, 'Handler should be called');
            var params = clickHandler.getCall(0).args[0];
            assert.ok(params, 'Event params should be passed');
            assert.ok(params.event, 'Event should be passed');
            assert.ok(params.validationGroup, 'validationGroup should be passed');
          });
          QUnit.test('onClick handler should not closure on a first one', function(assert) {
            this.instance.option('onClick', function() {});
            this.element.trigger('dxclick');
            var clickHandler = sinon.stub();
            this.instance.option('onClick', clickHandler);
            this.element.trigger('dxclick');
            assert.ok(clickHandler.calledOnce, 'second handler is called');
          });
          QUnit.test('onClick should have validationGroup parameter even if validationGroup is inited on another element (T1041957)', function(assert) {
            var clickHandler = sinon.stub();
            this.instance.option({
              onClick: clickHandler,
              validationGroup: 'group'
            });
            try {
              ValidationEngine.registerValidatorInGroup('group', sinon.stub());
              this.element.trigger('dxclick');
              var params = clickHandler.getCall(0).args[0];
              assert.ok(params.validationGroup, 'validationGroup should be passed');
            } finally {
              ValidationEngine.initGroups();
            }
          });
          QUnit.test('icon', function(assert) {
            this.instance.option('icon', 'home');
            assert.equal(this.element.find('.dx-icon-home').length, 1);
            this.instance.option('icon', 'add');
            assert.equal(this.element.find('.dx-icon-add').length, 1);
            this.instance.option('icon', undefined);
            assert.equal(this.element.find('.dx-icon-add').length, 0);
            assert.equal(this.element.find('.dx-icon-home').length, 0);
          });
          QUnit.test('icon position', function(assert) {
            this.instance.option({
              icon: 'box',
              text: 'Text',
              iconPosition: 'right'
            });
            var $buttonContentElements = this.element.find('.dx-button-content').children();
            assert.ok($buttonContentElements.eq(1).hasClass('dx-icon'), 'icon is after the text');
            assert.ok($buttonContentElements.eq(1).hasClass('dx-icon-right'), 'icon has class for right position');
            assert.ok(this.element.hasClass('dx-button-icon-right'), 'button has class for right icon position');
            this.instance.option('iconPosition', 'left');
            $buttonContentElements = this.element.find('.dx-button-content').children();
            assert.ok($buttonContentElements.eq(0).hasClass('dx-icon'), 'icon is before the text');
            assert.notOk($buttonContentElements.eq(0).hasClass('dx-icon-right'), 'icon has no class for right position');
            assert.notOk(this.element.hasClass('dx-button-icon-right'), 'button has no class for right icon position');
          });
          QUnit.test('type', function(assert) {
            this.instance.option('type', 'back');
            assert.ok(this.element.hasClass(BUTTON_BACK_CLASS));
          });
          QUnit.test('disabled', function(assert) {
            this.instance.option('disabled', true);
            assert.ok(this.element.hasClass('dx-state-disabled'));
          });
          QUnit.test('_templateData', function(assert) {
            var template = sinon.stub().returns('TPL');
            this.instance.option('template', template);
            this.instance.option('_templateData', {custom: 1});
            template.reset();
            this.instance.repaint();
            assert.strictEqual(template.firstCall.args[0].custom, 1, 'custom field is correct');
          });
          QUnit.test('stylingMode', function(assert) {
            assert.ok(this.element.hasClass(BUTTON_CONTAINED_STYLE_CLASS));
            this.instance.option('stylingMode', 'text');
            assert.ok(this.element.hasClass(BUTTON_TEXT_STYLE_CLASS));
            assert.notOk(this.element.hasClass(BUTTON_CONTAINED_STYLE_CLASS));
            this.instance.option('stylingMode', 'outlined');
            assert.ok(this.element.hasClass(BUTTON_OUTLINED_STYLE_CLASS));
            assert.notOk(this.element.hasClass(BUTTON_TEXT_STYLE_CLASS));
            this.instance.option('stylingMode', 'contained');
            assert.ok(this.element.hasClass(BUTTON_CONTAINED_STYLE_CLASS));
            assert.notOk(this.element.hasClass(BUTTON_OUTLINED_STYLE_CLASS));
          });
          if (!dxButton.IS_RENOVATED_WIDGET) {
            [{
              option: 'stylingMode',
              value: 'text'
            }, {
              option: 'type',
              value: 'danger'
            }].forEach(function($__3) {
              var $__4 = $__3,
                  option = $__4.option,
                  value = $__4.value;
              QUnit.test(("only className argument is passed when changing the \"" + option + "\" option"), function(assert) {
                var removeClassSpy = sinon.spy(renderer.fn, 'removeClass');
                this.instance.option(option, value);
                removeClassSpy.getCalls().forEach(function(funcCall) {
                  assert.strictEqual(funcCall.args.length, 1, 'only one argument passed to removeClass');
                });
                removeClassSpy.restore();
              });
            });
          }
          QUnit.test('readOnly validator should be excluded for the click action', function(assert) {
            var clickHandler = sinon.spy();
            this.instance.option({onClick: clickHandler});
            this.element.addClass('dx-state-readonly');
            this.element.trigger('dxclick');
            assert.strictEqual(clickHandler.callCount, 1, 'click handler was executed');
          });
          QUnit.test('T325811 - \'text\' option change should not lead to widget clearing', function(assert) {
            var $testElement = $('<div>').appendTo(this.element);
            assert.ok($testElement.parent().hasClass('dx-button'), 'test element is in button');
            this.instance.option('text', 'new test button text');
            assert.ok($testElement.parent().hasClass('dx-button'), 'test element is still in button');
          });
          QUnit.test('button with non-string text option value should not raise an error (T893304)', function(assert) {
            assert.expect(0);
            try {
              this.instance.option('text', 100);
            } catch (e) {
              assert.ok(false);
            }
          });
        });
        QUnit.module('regressions', {beforeEach: function() {
            this.element = $('#button').dxButton();
            this.instance = this.element.dxButton('instance');
          }}, function() {
          QUnit.test('B230602', function(assert) {
            this.instance.option('icon', '1.png');
            assert.equal(this.element.find('img').length, 1);
            this.instance.option('icon', '2.png');
            assert.equal(this.element.find('img').length, 1);
          });
          QUnit.test('Q513961', function(assert) {
            this.instance.option({
              text: '123',
              'icon': 'home'
            });
            assert.equal(this.element.find('.dx-icon-home').index(), 0);
          });
          QUnit.test('B238735: dxButton holds the shape of an arrow after you change it\'s type from back to any other', function(assert) {
            this.instance.option('type', 'back');
            assert.equal(this.element.hasClass(BUTTON_BACK_CLASS), true, 'back button css class removed');
            this.instance.option('type', 'normal');
            assert.equal(this.element.hasClass(BUTTON_BACK_CLASS), false, 'back button css class removed');
          });
        });
        QUnit.module('contentReady', {}, function() {
          QUnit.test('T355000 - the \'onContentReady\' action should be fired after widget is rendered entirely', function(assert) {
            var buttonConfig = {
              text: 'Test button',
              icon: 'trash'
            };
            var areElementsEqual = function(first, second) {
              if (first.length !== second.length) {
                return false;
              }
              if (first.length === 0) {
                return true;
              }
              if (first.text() !== second.text()) {
                return false;
              }
              if (first.attr('class') !== second.attr('class')) {
                return false;
              }
              var firstChildren = first.children();
              var secondChildren = second.children();
              for (var i = 0,
                  n = first.length; i < n; i++) {
                if (!areElementsEqual(firstChildren.eq(i), secondChildren.eq(i))) {
                  return false;
                }
              }
              return true;
            };
            var $firstButton = $('#widget').dxButton(buttonConfig);
            $('#button').dxButton($.extend({}, buttonConfig, {onContentReady: function(e) {
                assert.ok(areElementsEqual($firstButton, $(e.element)), 'rendered widget and widget with fired action are equals');
              }}));
          });
        });
        QUnit.module('inkRipple', {}, function() {
          QUnit.test('inkRipple should be removed when widget is removed', function(assert) {
            $('#inkButton').dxButton({
              useInkRipple: true,
              onClick: function(e) {
                var $element = $(e.component.$element());
                $element.triggerHandler({type: 'dxremove'});
                $element.trigger('dxinactive');
                assert.ok(true, 'no exceptions');
              }
            });
            $('#inkButton').trigger('dxclick');
          });
          QUnit.test('widget should works correctly when the useInkRipple option is changed at runtime', function(assert) {
            var clock = sinon.useFakeTimers();
            var $inkButton = $('#inkButton').dxButton({
              text: 'test',
              useInkRipple: true
            });
            var inkButton = $inkButton.dxButton('instance');
            var pointer = pointerMock($inkButton);
            pointer.start('touch').down();
            clock.tick(10);
            pointer.start('touch').up();
            assert.strictEqual($inkButton.find(("." + INK_RIPPLE_CLASS)).length, 1, 'inkRipple element was rendered');
            inkButton.option('useInkRipple', false);
            assert.strictEqual($inkButton.find(("." + INK_RIPPLE_CLASS)).length, 0, 'inkRipple element was removed');
            pointer.start('touch').down();
            clock.tick(10);
            pointer.start('touch').up();
            assert.strictEqual($inkButton.find(("." + INK_RIPPLE_CLASS)).length, 0, 'inkRipple element was removed is still removed after click');
            inkButton.option('useInkRipple', true);
            pointer.start('touch').down();
            clock.tick(10);
            pointer.start('touch').up();
            assert.strictEqual($inkButton.find(("." + INK_RIPPLE_CLASS)).length, 1, 'inkRipple element was rendered');
            clock.restore();
          });
        });
        QUnit.module('widget sizing render', {}, function() {
          QUnit.test('default', function(assert) {
            var $element = $('#widget').dxButton({text: 'ahoy!'});
            assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
          });
          QUnit.test('constructor', function(assert) {
            var $element = $('#widget').dxButton({
              text: 'ahoy!',
              width: 400
            });
            var instance = $element.dxButton('instance');
            assert.strictEqual(instance.option('width'), 400);
            assert.strictEqual($element.outerWidth(), 400, 'outer width of the element must be equal to custom width');
          });
          QUnit.test('root with custom width', function(assert) {
            var $element = $('#widthRootStyle').dxButton({text: 'ahoy!'});
            var instance = $element.dxButton('instance');
            assert.strictEqual(instance.option('width'), undefined);
            assert.strictEqual($element.outerWidth(), 300, 'outer width of the element must be equal to custom width');
          });
          QUnit.test('change width', function(assert) {
            var $element = $('#widget').dxButton({text: 'ahoy!'});
            var instance = $element.dxButton('instance');
            var customWidth = 400;
            instance.option('width', customWidth);
            assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
          });
        });
        QUnit.module('keyboard navigation', {}, function() {
          QUnit.test('click fires on enter', function(assert) {
            assert.expect(2);
            var clickFired = 0;
            var $element = $('#button').dxButton({
              focusStateEnabled: true,
              onClick: function() {
                clickFired++;
              }
            });
            var keyboard = keyboardMock($element);
            $element.trigger('focusin');
            keyboard.keyDown('enter');
            assert.equal(clickFired, 1, 'press enter on button call click action');
            keyboard.keyDown('space');
            assert.equal(clickFired, 2, 'press space on button call click action');
          });
          QUnit.test('arguments on key press', function(assert) {
            var clickHandler = sinon.spy();
            var $element = $('#button').dxButton({
              focusStateEnabled: true,
              onClick: clickHandler
            });
            var keyboard = keyboardMock($element);
            $element.trigger('focusin');
            keyboard.keyDown('enter');
            assert.ok(clickHandler.calledOnce, 'Handler should be called');
            var params = clickHandler.getCall(0).args[0];
            assert.ok(params, 'Event params should be passed');
            assert.ok(params.event, 'Event should be passed');
            assert.ok(params.validationGroup, 'validationGroup should be passed');
          });
        });
        QUnit.module('submit behavior', {
          beforeEach: function() {
            this.clock = sinon.useFakeTimers();
            this.$element = $('#button').dxButton({useSubmitBehavior: true});
            this.$form = $('#form');
            this.clickButton = function() {
              this.$element.trigger('dxclick');
              this.clock.tick(10);
            };
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          QUnit.test('render input with submit type', function(assert) {
            assert.strictEqual(this.$element.find('input[type=submit]').length, 1);
          });
          QUnit.test('input with submit type should not have display:none (T983803)', function(assert) {
            assert.notStrictEqual(this.$element.find('input[type=submit]').css('display'), 'none');
          });
          QUnit.test('submit input has .dx-button-submit-input CSS class', function(assert) {
            assert.strictEqual(this.$element.find(("." + BUTTON_SUBMIT_INPUT_CLASS)).length, 1);
          });
          QUnit.test('Button should not raise any errors after text option change when useSubmitBehavior is true (T892480)', function(assert) {
            this.$element.dxButton('instance').option('text', 'new text');
            assert.equal(this.$element.text(), 'new text');
            try {
              this.clickButton();
            } catch (e) {
              assert.notOk(true, 'Error is raised after click');
            }
          });
          QUnit.test('button click call click() on submit input', function(assert) {
            var clickHandlerSpy = sinon.spy();
            this.$element.find('.' + BUTTON_SUBMIT_INPUT_CLASS).on('click', clickHandlerSpy);
            this.clickButton();
            assert.ok(clickHandlerSpy.calledOnce);
          });
          QUnit.test('widget should work correctly if useSubmitBehavior was changed runtime', function(assert) {
            var instance = this.$element.dxButton('instance');
            instance.option('useSubmitBehavior', false);
            assert.strictEqual(this.$element.find('input[type=submit]').length, 0, 'no submit input if useSubmitBehavior is false');
            assert.strictEqual(this.$element.find(("." + BUTTON_SUBMIT_INPUT_CLASS)).length, 0, 'no submit class if useSubmitBehavior is false');
            instance.option('useSubmitBehavior', true);
            assert.strictEqual(this.$element.find('input[type=submit]').length, 1, 'has submit input if useSubmitBehavior is false');
            assert.strictEqual(this.$element.find(("." + BUTTON_SUBMIT_INPUT_CLASS)).length, 1, 'has submit class if useSubmitBehavior is false');
          });
          QUnit.test('preventDefault is called to dismiss submit of form if validation failed', function(assert) {
            assert.expect(2);
            try {
              var validatorStub = sinon.createStubInstance(Validator);
              var clickHandlerSpy = sinon.spy(function(e) {
                assert.ok(e.isDefaultPrevented(), 'default is prevented');
              });
              var $element = this.$element.dxButton({validationGroup: 'testGroup'});
              validatorStub.validate = function() {
                return {isValid: false};
              };
              ValidationEngine.registerValidatorInGroup('testGroup', validatorStub);
              $element.find('.' + BUTTON_SUBMIT_INPUT_CLASS).on('click', clickHandlerSpy);
              this.clickButton();
              assert.ok(clickHandlerSpy.called);
            } finally {
              ValidationEngine.initGroups();
            }
          });
          QUnit.test('button onClick event handler should raise once (T443747)', function(assert) {
            var clickHandlerSpy = sinon.spy();
            this.$element.dxButton({onClick: clickHandlerSpy});
            this.clickButton();
            assert.ok(clickHandlerSpy.calledOnce);
          });
          QUnit.test('Submit button should not be enabled on pending', function(assert) {
            try {
              var validator = new Validator(document.createElement('div'), {
                adapter: sinon.createStubInstance(DefaultAdapter),
                validationRules: [{
                  type: 'async',
                  validationCallback: function() {
                    var d = new Deferred();
                    return d.promise();
                  }
                }]
              });
              var clickHandlerSpy = sinon.spy(function(e) {
                assert.ok(e.isDefaultPrevented(), 'default is prevented');
              });
              var $element = this.$element.dxButton({validationGroup: 'testGroup'});
              var buttonInstance = this.$element.dxButton('instance');
              ValidationEngine.registerValidatorInGroup('testGroup', validator);
              $element.find('.' + BUTTON_SUBMIT_INPUT_CLASS).on('click', clickHandlerSpy);
              this.clickButton();
              assert.ok(clickHandlerSpy.called);
              assert.ok(buttonInstance.option('disabled'), 'button is disabled after the click');
            } finally {
              ValidationEngine.initGroups();
            }
          });
          QUnit.test('Submit button should change the \'disabled\' option to \'false\' when validation is passed negatively', function(assert) {
            this.clock.restore();
            var validator = new Validator($('<div>').appendTo(this.$form), {
              adapter: sinon.createStubInstance(DefaultAdapter),
              validationRules: [{
                type: 'async',
                validationCallback: function() {
                  var d = new Deferred();
                  setTimeout(function() {
                    d.reject();
                  }, 10);
                  return d.promise();
                }
              }]
            });
            var done = assert.async();
            this.$element.dxButton({
              validationGroup: 'testGroup',
              onOptionChanged: function(args) {
                if (args.name === 'disabled') {
                  if (args.value === true) {
                    assert.equal(validator._validationInfo.result.status, 'pending', 'validator in pending');
                  } else {
                    assert.equal(validator._validationInfo.result.status, 'invalid', 'validator is invalid');
                    ValidationEngine.initGroups();
                    done();
                  }
                }
              }
            });
            ValidationEngine.registerValidatorInGroup('testGroup', validator);
            this.$element.trigger('dxclick');
          });
          QUnit.test('Submit button should change the \'disabled\' option to \'false\' when validation is passed positively', function(assert) {
            this.clock.restore();
            var validator = new Validator($('<div>').appendTo(this.$form), {
              adapter: sinon.createStubInstance(DefaultAdapter),
              validationRules: [{
                type: 'async',
                validationCallback: function() {
                  var d = new Deferred();
                  setTimeout(function() {
                    d.resolve();
                  }, 10);
                  return d.promise();
                }
              }]
            });
            var done = assert.async();
            this.$element.dxButton({
              validationGroup: 'testGroup',
              onOptionChanged: function(args) {
                if (args.name === 'disabled') {
                  if (args.value === true) {
                    assert.equal(validator._validationInfo.result.status, 'pending', 'validator in pending');
                  } else {
                    assert.equal(validator._validationInfo.result.status, 'valid', 'validator is valid');
                    ValidationEngine.initGroups();
                    done();
                  }
                }
              }
            });
            ValidationEngine.registerValidatorInGroup('testGroup', validator);
            this.$element.trigger('dxclick');
          });
          QUnit.test('Form should be submitted only when an async validation rule is passed positively (T887207)', function(assert) {
            var $__2 = this;
            this.clock.restore();
            var value = 'a';
            var validValue = 'b';
            var validator = new Validator($('<div>').appendTo(this.$form), {
              adapter: sinon.createStubInstance(DefaultAdapter),
              validationRules: [{
                type: 'async',
                validationCallback: function() {
                  var d = new Deferred();
                  setTimeout(function() {
                    d.resolve({isValid: value === validValue});
                  }, 10);
                  return d.promise();
                }
              }]
            });
            var done = assert.async();
            var onSubmit = function() {
              assert.strictEqual(value, validValue, 'submitted with valid value');
              ValidationEngine.initGroups();
              $__2.$form.off('submit', onSubmit);
              done();
            };
            var triggerButtonClick = function() {
              $__2.$element.trigger('dxclick');
            };
            this.$form.on('submit', onSubmit);
            this.$element.dxButton({
              validationGroup: 'testGroup',
              onOptionChanged: function(args) {
                if (args.name === 'disabled') {
                  if (args.value === false && validator._validationInfo.result.status === 'invalid') {
                    setTimeout(function() {
                      value = validValue;
                      triggerButtonClick();
                    });
                  }
                }
              }
            });
            ValidationEngine.registerValidatorInGroup('testGroup', validator);
            triggerButtonClick();
          });
        });
        QUnit.module('templates', function() {
          checkStyleHelper.testInChromeOnDesktopActiveWindow('parent styles when button is not focused', function(assert) {
            var $template = $('<div>').text('test1');
            $('#button').dxButton({template: function() {
                return $template;
              }});
            $('#input1').focus();
            assert.equal(checkStyleHelper.getColor($template[0]), 'rgb(51, 51, 51)', 'color');
            assert.equal(checkStyleHelper.getBackgroundColor($template[0]), 'rgb(255, 255, 255)', 'backgroundColor');
            assert.equal(checkStyleHelper.getOverflowX($template[0].parentNode), 'visible', 'overflowX');
            assert.equal(checkStyleHelper.getTextOverflow($template[0].parentNode), 'clip', 'textOverflow');
            assert.equal(checkStyleHelper.getWhiteSpace($template[0].parentNode), 'normal', 'whiteSpace');
          });
          checkStyleHelper.testInChromeOnDesktopActiveWindow('parent styles when button is focused, text is not empty', function(assert) {
            var $template = $('<div>').text('test1');
            var $button = $('#button').dxButton({
              text: 'not empty',
              template: function() {
                return $template;
              }
            });
            $button.dxButton('instance').focus();
            assert.strictEqual(checkStyleHelper.getColor($template[0]), 'rgb(51, 51, 51)', 'color');
            assert.strictEqual(checkStyleHelper.getBackgroundColor($template[0]), 'rgb(235, 235, 235)', 'backgroundColor');
            assert.strictEqual(checkStyleHelper.getOverflowX($template[0].parentNode), 'hidden', 'overflowX');
            assert.strictEqual(checkStyleHelper.getTextOverflow($template[0].parentNode), 'ellipsis', 'textOverflow');
            assert.strictEqual(checkStyleHelper.getWhiteSpace($template[0].parentNode), 'nowrap', 'whiteSpace');
          });
          checkStyleHelper.testInChromeOnDesktopActiveWindow('parent styles when button is focused, text is empty', function(assert) {
            var $template = $('<div>').text('test1');
            var $button = $('#button').dxButton({
              text: null,
              template: function() {
                return $template;
              }
            });
            $button.dxButton('instance').focus();
            assert.strictEqual(checkStyleHelper.getColor($template[0]), 'rgb(51, 51, 51)', 'color');
            assert.strictEqual(checkStyleHelper.getBackgroundColor($template[0]), 'rgb(235, 235, 235)', 'backgroundColor');
            assert.strictEqual(checkStyleHelper.getOverflowX($template[0].parentNode), 'visible', 'overflowX');
            assert.strictEqual(checkStyleHelper.getTextOverflow($template[0].parentNode), 'clip', 'textOverflow');
            assert.strictEqual(checkStyleHelper.getWhiteSpace($template[0].parentNode), 'normal', 'whiteSpace');
          });
        });
        QUnit.module('events subscriptions', function() {
          QUnit.test('click', function(assert) {
            var clickHandler = sinon.spy();
            var $button = $('#button').dxButton({text: 'test'});
            var button = $button.dxButton('instance');
            button.on('click', clickHandler);
            $button.trigger('dxclick');
            assert.ok(clickHandler.calledOnce, 'Handler should be called');
            var params = clickHandler.getCall(0).args[0];
            assert.ok(params, 'Event params should be passed');
            assert.ok(params.event, 'Event should be passed');
            assert.ok(params.validationGroup, 'validationGroup should be passed');
          });
          QUnit.test('contentReady', function(assert) {
            assert.expect(3);
            var button = $('#button').dxButton({text: 'test'}).dxButton('instance');
            button.on('contentReady', function(e) {
              assert.ok(e.component, 'Component info should be passed');
              assert.ok(e.element, 'Element info should be passed');
              assert.strictEqual($(e.element).text(), 'test', 'Text is rendered to the element');
            });
            button.repaint();
          });
        });
        QUnit.module('localization', function() {
          [{
            locale: 'en',
            text: 'text',
            icon: 'close',
            expectedAriaLabelText: 'text'
          }, {
            locale: 'en',
            text: '',
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'en',
            text: '',
            icon: '',
            expectedAriaLabelText: undefined
          }, {
            locale: 'en',
            text: undefined,
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'en',
            text: null,
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'en',
            text: 'text',
            icon: 'close',
            expectedAriaLabelText: 'text'
          }, {
            locale: 'en',
            text: '',
            icon: 'close',
            expectedAriaLabelText: 'Close'
          }, {
            locale: 'en',
            text: undefined,
            icon: 'close',
            expectedAriaLabelText: 'Close'
          }, {
            locale: 'en',
            text: null,
            icon: 'close',
            expectedAriaLabelText: 'Close'
          }, {
            locale: 'ja',
            text: 'text',
            icon: 'close',
            expectedAriaLabelText: 'text'
          }, {
            locale: 'ja',
            text: 'text',
            icon: 'close',
            expectedAriaLabelText: 'text'
          }, {
            locale: 'ja',
            text: '',
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'ja',
            text: '',
            icon: '',
            expectedAriaLabelText: undefined
          }, {
            locale: 'ja',
            text: undefined,
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'ja',
            text: null,
            icon: 'iconName',
            expectedAriaLabelText: 'iconName'
          }, {
            locale: 'ja',
            text: 'text',
            icon: 'close',
            expectedAriaLabelText: 'text'
          }, {
            locale: 'ja',
            text: '',
            icon: 'close',
            expectedAriaLabelText: '閉じる'
          }, {
            locale: 'ja',
            text: undefined,
            icon: 'close',
            expectedAriaLabelText: '閉じる'
          }, {
            locale: 'ja',
            text: null,
            icon: 'close',
            expectedAriaLabelText: '閉じる'
          }].forEach(function($__3) {
            var $__4 = $__3,
                locale = $__4.locale,
                text = $__4.text,
                icon = $__4.icon,
                expectedAriaLabelText = $__4.expectedAriaLabelText;
            QUnit.test(("aria-label attribute value should be equal=" + expectedAriaLabelText + " in '" + locale + "' locale when text='" + text + "', icon='" + icon + "' (T1109711)"), function(assert) {
              var defaultLocale = localization.locale();
              try {
                localization.loadMessages(ja);
                localization.locale(locale);
                var $button = $('#button').dxButton({
                  text: text,
                  icon: icon
                });
                assert.strictEqual($button.attr('aria-label'), expectedAriaLabelText, 'aria-label attribute localized correctly');
              } finally {
                localization.locale(defaultLocale);
              }
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/renderer","ui/validation_engine","ui/validator","ui/validation/default_adapter","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/checkStyleHelper.js","localization","localization/messages/ja.json!","core/utils/deferred","core/utils/shadow_dom","ui/button","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/renderer"), require("ui/validation_engine"), require("ui/validator"), require("ui/validation/default_adapter"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/checkStyleHelper.js"), require("localization"), require("localization/messages/ja.json!"), require("core/utils/deferred"), require("core/utils/shadow_dom"), require("ui/button"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button.tests.js.map