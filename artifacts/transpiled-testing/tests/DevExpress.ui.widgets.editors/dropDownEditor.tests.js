!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownEditor.tests.js"], ["jquery","core/config","core/devices","events/core/events_engine","animation/fx","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/utils/support","core/errors","ui/drop_down_editor/ui.drop_down_editor","ui/overlay/ui.overlay","core/utils/type","./textEditorParts/caretWorkaround.js","core/utils/resize_callbacks","ui/button","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownEditor.tests.js", ["jquery", "core/config", "core/devices", "events/core/events_engine", "animation/fx", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "core/utils/support", "core/errors", "ui/drop_down_editor/ui.drop_down_editor", "ui/overlay/ui.overlay", "core/utils/type", "./textEditorParts/caretWorkaround.js", "core/utils/resize_callbacks", "ui/button", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      config,
      devices,
      eventsEngine,
      fx,
      keyboardMock,
      pointerMock,
      support,
      errors,
      DropDownEditor,
      Overlay,
      isRenderer,
      caretWorkaround,
      resizeCallbacks,
      dxButton,
      DROP_DOWN_EDITOR_BUTTON_ICON,
      DROP_DOWN_EDITOR_BUTTON_CLASS,
      DROP_DOWN_EDITOR_OVERLAY,
      DROP_DOWN_EDITOR_ACTIVE,
      TEXT_EDITOR_INPUT_CLASS,
      TEXT_EDITOR_BUTTONS_CONTAINER_CLASS,
      DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER,
      POPUP_CONTENT,
      TAB_KEY_CODE,
      ESC_KEY_CODE,
      POPUP_CONTENT_CLASS,
      OVERLAY_CONTENT_CLASS,
      OVERLAY_WRAPPER_CLASS,
      CUSTOM_CLASS,
      isIOs,
      beforeEach,
      afterEach,
      reinitFixture,
      testEnvironment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      DropDownEditor = $__m.default;
    }, function($__m) {
      Overlay = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      caretWorkaround = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      dxButton = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div id=\"dropDownEditorLazy\"></div>\n         <div id=\"dropDownEditorSecond\"></div>";
        $('#qunit-fixture').html(markup);
      });
      DROP_DOWN_EDITOR_BUTTON_ICON = 'dx-dropdowneditor-icon';
      DROP_DOWN_EDITOR_BUTTON_CLASS = 'dx-dropdowneditor-button';
      DROP_DOWN_EDITOR_OVERLAY = 'dx-dropdowneditor-overlay';
      DROP_DOWN_EDITOR_ACTIVE = 'dx-dropdowneditor-active';
      TEXT_EDITOR_INPUT_CLASS = 'dx-texteditor-input';
      TEXT_EDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
      DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER = 'dx-dropdowneditor-field-template-wrapper';
      POPUP_CONTENT = 'dx-popup-content';
      TAB_KEY_CODE = 'Tab';
      ESC_KEY_CODE = 'Escape';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      CUSTOM_CLASS = 'custom-class';
      isIOs = devices.current().platform === 'ios';
      beforeEach = function() {
        fx.off = true;
        this.rootElement = $('<div id="dropDownEditor"></div>');
        this.rootElement.appendTo($('#qunit-fixture'));
        this.$dropDownEditor = $('#dropDownEditor').dxDropDownEditor();
        this.dropDownEditor = this.$dropDownEditor.dxDropDownEditor('instance');
        this.clock = sinon.useFakeTimers();
        this.originalTouchSupport = support.touch;
      };
      afterEach = function() {
        this.rootElement.remove();
        this.dropDownEditor = null;
        this.clock.restore();
        support.touch = this.originalTouchSupport;
        fx.off = false;
      };
      reinitFixture = function(options) {
        this.$dropDownEditor.remove();
        this.$dropDownEditor = $('<div id="dropDownEditor"></div>').appendTo('#qunit-fixture');
        this.dropDownEditor = this.$dropDownEditor.dxDropDownEditor(options).dxDropDownEditor('instance');
      };
      testEnvironment = {
        beforeEach: beforeEach,
        reinitFixture: reinitFixture,
        afterEach: afterEach
      };
      QUnit.module('dxDropDownEditor', testEnvironment, function() {
        QUnit.test('dxDropDownEditor is defined', function(assert) {
          assert.ok(this.dropDownEditor);
        });
        QUnit.test('dxDropDownEditor can be instantiated', function(assert) {
          assert.ok(this.dropDownEditor instanceof DropDownEditor);
        });
        QUnit.test('the element must be decorated with the DROP_DOWN_EDITOR_ACTIVE class while the drop down is displayed', function(assert) {
          var activeClass = DROP_DOWN_EDITOR_ACTIVE;
          assert.ok(!this.rootElement.hasClass(activeClass));
          this.dropDownEditor.open();
          assert.ok(this.rootElement.hasClass(activeClass));
          this.dropDownEditor.close();
          assert.ok(!this.rootElement.hasClass(activeClass));
        });
        QUnit.test('content returned by _renderPopupContent must be rendered inside the dropdown', function(assert) {
          var content = $('<div>test</div>');
          var dropDownEditor = this.dropDownEditor;
          dropDownEditor._renderPopupContent = function() {
            return content.appendTo(dropDownEditor._popup.$content());
          };
          dropDownEditor.open();
          assert.strictEqual(dropDownEditor._$popup.dxPopup('$content').find(content)[0], content[0]);
        });
        QUnit.test('widget should have only one input by default', function(assert) {
          var $inputs = this.$dropDownEditor.find('input');
          var $submitElement = this.dropDownEditor._getSubmitElement();
          assert.equal($inputs.length, 1, 'there is only one input');
          assert.ok($inputs.is($submitElement), 'and it is a submit element');
        });
        QUnit.test('widget should have two inputs when \'useHiddenSubmitElement\' is \'true\'', function(assert) {
          this.dropDownEditor.option('useHiddenSubmitElement', true);
          var $inputs = this.$dropDownEditor.find('input');
          assert.equal($inputs.length, 2, 'there are two inputs');
        });
        QUnit.test('widget should have only one input when \'useHiddenSubmitElement\' changing to \'false\'', function(assert) {
          this.dropDownEditor.option('useHiddenSubmitElement', true);
          this.dropDownEditor.option('useHiddenSubmitElement', false);
          var $inputs = this.$dropDownEditor.find('input');
          var $submitElement = this.dropDownEditor._getSubmitElement();
          assert.equal($inputs.length, 1, 'there is only one input');
          assert.ok($inputs.is($submitElement), 'and it is a submit element');
        });
        QUnit.test('widget should render hidden submit input when \'useHiddenSubmitElement\' is \'true\'', function(assert) {
          this.dropDownEditor.option('useHiddenSubmitElement', true);
          var $submitInput = this.$dropDownEditor.find('input[type=\'hidden\']');
          assert.equal($submitInput.length, 1, 'there is one hidden input');
        });
        QUnit.test('submit value should be equal to the widget value', function(assert) {
          this.dropDownEditor.option({
            useHiddenSubmitElement: true,
            value: 'test'
          });
          var $submitInput = this.$dropDownEditor.find('input[type=\'hidden\']');
          assert.equal($submitInput.val(), 'test', 'the submit value is correct');
        });
        QUnit.test('submit value should be equal to the value of widget with fieldTemplate', function(assert) {
          this.reinitFixture({
            useHiddenSubmitElement: true,
            fieldTemplate: function() {
              return $('<div>').dxTextBox();
            },
            value: 'test'
          });
          var $submitInput = this.$dropDownEditor.find('input[type=\'hidden\']');
          assert.strictEqual($submitInput.length, 1);
          assert.strictEqual($submitInput.val(), 'test', 'the submit value is correct');
        });
        QUnit.test('clicking the input must not close the dropdown', function(assert) {
          this.dropDownEditor.open();
          pointerMock(this.dropDownEditor._input()).click();
          assert.ok(this.dropDownEditor.option('opened'));
        });
        QUnit.test('clicking the button must correctly close the dropdown', function(assert) {
          this.dropDownEditor.open();
          var $dropDownButton = this.dropDownEditor.$element().find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($dropDownButton).click();
          assert.ok(!this.dropDownEditor.option('opened'));
        });
        QUnit.test('clicking the button descendants must also correctly close the dropdown', function(assert) {
          this.dropDownEditor.open();
          var $dropDownButton = this.dropDownEditor.$element().find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($dropDownButton.find(("." + DROP_DOWN_EDITOR_BUTTON_ICON))).click();
          assert.ok(!this.dropDownEditor.option('opened'));
        });
        QUnit.test('dropdown must be decorated with DROP_DOWN_EDITOR_OVERLAY', function(assert) {
          this.dropDownEditor.open();
          assert.ok(this.dropDownEditor._$popup.hasClass(DROP_DOWN_EDITOR_OVERLAY));
        });
        QUnit.test('option opened', function(assert) {
          this.dropDownEditor.option('opened', true);
          var $popup = $('.dx-popup');
          var popup = $popup.dxPopup('instance');
          popup.$content().append('test');
          assert.ok(popup.$content().is(':visible'), 'popup is visible after opening');
          this.dropDownEditor.option('opened', false);
          assert.ok(popup.$content().is(':hidden'), 'popup is hidden after closing');
        });
        QUnit.test('overlay get correct open and close', function(assert) {
          var opened;
          this.dropDownEditor.option('onOpened', function() {
            opened = true;
          });
          this.dropDownEditor.option('onClosed', function() {
            opened = false;
          });
          this.dropDownEditor.open();
          assert.strictEqual(opened, true, 'open');
          this.dropDownEditor.close();
          assert.strictEqual(opened, false, 'close');
        });
        QUnit.test('when a drop down editor is disabled, it should not be possible to show the drop down by clicking the drop down button', function(assert) {
          this.dropDownEditor.option('disabled', true);
          var $dropDownButton = this.dropDownEditor.$element().find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($dropDownButton).click();
          assert.ok(!this.dropDownEditor._popup);
        });
        QUnit.test('when a drop down editor is readonly, it should not be possible to show the drop down by clicking the drop down button', function(assert) {
          this.dropDownEditor.option('readOnly', true);
          var $dropDownButton = this.dropDownEditor.$element().find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($dropDownButton).click();
          assert.ok(!this.dropDownEditor._popup);
        });
        QUnit.test('changing the readonly option changing button state', function(assert) {
          var $button = this.$dropDownEditor.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($button).click();
          assert.ok(this.dropDownEditor.option('opened'));
          this.dropDownEditor.close();
          this.dropDownEditor.option('readOnly', true);
          $button = this.$dropDownEditor.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          pointerMock($button).click();
          assert.ok(!this.dropDownEditor.option('opened'));
        });
        QUnit.test('correct buttons order after option change', function(assert) {
          this.dropDownEditor.option('showClearButton', true);
          var $buttonsContainer = this.$dropDownEditor.find('.dx-texteditor-buttons-container');
          var $buttons = $buttonsContainer.children();
          assert.equal($buttons.length, 2, 'clear button and drop button were rendered');
          assert.ok($buttons.eq(0).hasClass('dx-clear-button-area'), 'clear button is the first one');
          assert.ok($buttons.eq(1).hasClass(DROP_DOWN_EDITOR_BUTTON_CLASS), 'drop button is the second one');
        });
        QUnit.test('Validation: onShown validation message handler should change', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          dropDownEditor.option({
            isValid: false,
            validationError: {message: 'Something bad happened'}
          });
          dropDownEditor.open();
          assert.ok(dropDownEditor._$validationMessage);
          var pos = dropDownEditor._validationMessage.option('position');
          assert.equal(pos.my, 'left bottom', 'Message should be above dropdown');
          assert.equal(pos.at, 'left top', 'Message should be above dropdown');
        });
        QUnit.test('Validation: onHidden validation message handler should restore tooltip position', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          dropDownEditor.option({
            isValid: false,
            validationError: {message: 'Something bad happened'}
          });
          dropDownEditor.open();
          dropDownEditor.close();
          assert.ok(dropDownEditor._$validationMessage);
          var pos = dropDownEditor._validationMessage.option('position');
          assert.equal(pos.my, 'left top', 'Message should be below dropdown');
          assert.equal(pos.at, 'left bottom', 'Message should be below dropdown');
        });
        QUnit.test('\'popupPosition\' option default value should depend on \'rtlEnabled\' option value (T180106)', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          var positionLTR = dropDownEditor.option('popupPosition');
          config({rtlEnabled: true});
          var dropDownEditorRTL = $('<div id="dropDownEditorRTL">').dxDropDownEditor();
          try {
            var positionRTL = dropDownEditorRTL.dxDropDownEditor('option', 'popupPosition');
            var at = positionLTR.at.indexOf('left') > -1 ? 'right' : 'left';
            var my = positionLTR.my.indexOf('left') > -1 ? 'right' : 'left';
            assert.ok(positionRTL.at.indexOf(at) > -1, 'position.at is reversed');
            assert.ok(positionRTL.my.indexOf(my) > -1, 'position.my is reversed');
          } finally {
            $('#dropDownEditorRTL').remove();
            config({rtlEnabled: false});
          }
        });
        QUnit.test('default value', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          assert.strictEqual(dropDownEditor.option('value'), null, 'Default value is null');
        });
        QUnit.test('reset()', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          dropDownEditor.option('value', '123');
          dropDownEditor.reset();
          assert.strictEqual(dropDownEditor.option('value'), null, 'Value should be reset');
        });
        QUnit.test('reset method should clear the input value', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          var $editor = dropDownEditor.$element();
          var $input = $editor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          dropDownEditor.option('value', null);
          $input.val('456');
          dropDownEditor.reset();
          assert.strictEqual(dropDownEditor.option('value'), null, 'Value should be null');
          assert.equal($input.val(), '', 'Input value is correct');
        });
        QUnit.test('dx-state-hover class added after hover on element', function(assert) {
          this.dropDownEditor.option({
            value: '123',
            hoverStateEnabled: true
          });
          this.$dropDownEditor.trigger('dxhoverstart');
          assert.ok(this.$dropDownEditor.hasClass('dx-state-hover'), 'hover class has been added');
        });
        QUnit.test('content method returning overlay content', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          dropDownEditor.open();
          var $content = $(dropDownEditor.content());
          assert.ok($content.hasClass('dx-popup-content'), 'content has class dx-popup-content');
        });
        QUnit.test('field method returning overlay content', function(assert) {
          var dropDownEditor = this.dropDownEditor;
          var $field = $(dropDownEditor.field());
          assert.equal(isRenderer(dropDownEditor.field()), !!config().useJQuery, 'fieldElement is correct');
          assert.ok($field.hasClass('dx-texteditor-input'), 'field has class dx-texteditor-input');
          assert.ok($field.hasClass('dx-texteditor-input'), 'field has class dx-texteditor-input');
        });
      });
      QUnit.module('focus policy', function() {
        QUnit.testInActiveWindow('editor should save focus on button clicking', function(assert) {
          var isDesktop = devices.real().deviceType === 'desktop';
          if (!isDesktop) {
            assert.ok(true, 'blur preventing unnecessary on mobile devices');
            return;
          }
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            applyValueMode: 'useButtons',
            focusStateEnabled: true
          });
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          instance.open();
          var $buttons = instance._popup.$wrapper().find('.dx-button');
          $.each($buttons, function(index, button) {
            var $button = $(button);
            var buttonInstance = $button.dxButton('instance');
            instance.focus();
            $button.focus();
            var pointer = pointerMock(button);
            assert.ok(!$dropDownEditor.hasClass('dx-state-focused') || !buttonInstance.option('focusStateEnabled'), 'dropDownEditor lose focus after click on button, nested into overlay');
            pointer.click();
            if (!instance.option('opened')) {
              assert.ok($dropDownEditor.hasClass('dx-state-focused'), 'dropDownEditor obtained focus after popup button click with close action');
            } else {
              instance.option('opened', false);
            }
          });
        });
        QUnit.testInActiveWindow('editor should save focus on clearbutton clicking, fieldTemplate is used', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'blur preventing unnecessary on mobile devices');
            return;
          }
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            items: [{
              'Name': 'one',
              'ID': 1
            }, {
              'Name': 'two',
              'ID': 2
            }, {
              'Name': 'three',
              'ID': 3
            }],
            displayExpr: 'Name',
            valueExpr: 'ID',
            showClearButton: 'true',
            value: 1,
            fieldTemplate: function(value) {
              var $textBox = $('<div>').dxTextBox({
                text: value,
                focusStateEnabled: true
              });
              return $('<div>').text(value + this.option('value')).append($textBox);
            }
          });
          $dropDownEditor.find('.dx-texteditor-input').focus();
          assert.ok($dropDownEditor.find('.dx-texteditor').hasClass('dx-state-focused'), 'Widget is focused');
          var $buttonsContainer = $dropDownEditor.find('.dx-texteditor-buttons-container');
          var $buttons = $buttonsContainer.children();
          $buttons.eq(1).trigger('dxclick');
          assert.ok($dropDownEditor.hasClass('dx-state-focused'), 'Widget is focused after click on clearButton');
        });
        QUnit.testInActiveWindow('input is focused by click on dropDownButton', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({focusStateEnabled: true});
          var $dropDownButton = $dropDownEditor.find('.dx-dropdowneditor-button');
          $dropDownButton.trigger('dxclick');
          assert.ok($dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS)).is(':focus'), 'input focused');
        });
        QUnit.test('native focus event should not be triggered if dropdown button clicked on mobile device', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            focusStateEnabled: false,
            showDropDownButton: true
          });
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          var focusinHandler = sinon.spy();
          var $input = $dropDownEditor.find('.dx-texteditor-input');
          var $dropDownButton = $dropDownEditor.find('.dx-dropdowneditor-button');
          eventsEngine.on($input, 'focus focusin', focusinHandler);
          eventsEngine.trigger($dropDownButton, 'dxclick');
          assert.ok(instance.option('opened'), 'editor was opened');
          assert.equal(focusinHandler.callCount, 0, 'native focus should not be triggered');
        });
        QUnit.testInActiveWindow('focusout should not be fired after click on the dropDownButton when editor is focused', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({focusStateEnabled: true});
          var $dropDownButton = $dropDownEditor.find('.dx-dropdowneditor-button');
          $dropDownEditor.dxDropDownEditor('focus');
          var e = $.Event('mousedown');
          $dropDownButton.trigger(e);
          assert.ok(e.isDefaultPrevented(), 'focusout was prevented');
        });
        QUnit.testInActiveWindow('focusout should be fired after click on the dropDownButton when editor isn\'t focused (T823431)', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({focusStateEnabled: true});
          var $dropDownButton = $dropDownEditor.find('.dx-dropdowneditor-button');
          var e = $.Event('mousedown');
          $dropDownButton.trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'focusout was not prevented');
        });
        QUnit.test('focusout should not be fired on valueChanged', function(assert) {
          var onFocusOutStub = sinon.stub();
          var textBoxOnFocusOutStub = sinon.stub();
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            fieldTemplate: function(value) {
              var $textBox = $('<div>').dxTextBox({onFocusOut: textBoxOnFocusOutStub});
              return $('<div>').text(value + this.option('value')).append($textBox);
            },
            items: [0, 1, 2, 3, 4, 5],
            acceptCustomValue: true,
            valueChangeEvent: 'change',
            onFocusOut: onFocusOutStub,
            focusStateEnabled: true
          });
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.type('2');
          keyboard.change();
          assert.equal(onFocusOutStub.callCount, 0, 'onFocusOut is fired');
          assert.equal(textBoxOnFocusOutStub.callCount, 0, 'onFocusOut textbox is fired');
        });
        QUnit.test('focusout to another editor should close current ddb (T832410)', function(assert) {
          var $dropDownEditor1 = $('#dropDownEditorLazy').dxDropDownEditor({
            items: [0, 1, 2],
            acceptCustomValue: true,
            focusStateEnabled: true,
            opened: true
          });
          var $dropDownEditor2 = $('#dropDownEditorSecond').dxDropDownEditor({
            items: [0, 1, 2],
            acceptCustomValue: true,
            focusStateEnabled: true
          });
          var dropDownEditor1 = $dropDownEditor1.dxDropDownEditor('instance');
          var $input1 = $dropDownEditor1.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var $input2 = $dropDownEditor2.find(("." + TEXT_EDITOR_INPUT_CLASS));
          dropDownEditor1.focus();
          $input1.trigger($.Event('focusout', {relatedTarget: $input2}));
          assert.strictEqual(dropDownEditor1.option('opened'), !isIOs, 'should be closed after another editor focus');
          dropDownEditor1.open();
          dropDownEditor1.focus();
          $input1.trigger($.Event('focusout', {relatedTarget: $(("." + POPUP_CONTENT))}));
          assert.ok(dropDownEditor1.option('opened'), 'should be still opened after the widget\'s popup focus');
        });
        [false, true].forEach(function(acceptCustomValue) {
          var position = acceptCustomValue ? 'end' : 'beginning';
          var testTitle = ("caret should be set to the " + position + " of the text after click on the dropDown button when \"acceptCustomValue\" option is " + acceptCustomValue + " (T976700)");
          QUnit.testInActiveWindow(testTitle, function(assert) {
            var value = '1234567890abcdefgh';
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              items: [value],
              focusStateEnabled: true,
              showDropDownButton: true,
              acceptCustomValue: acceptCustomValue,
              value: value
            });
            var $dropDownButton = $dropDownEditor.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
            var input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS)).get(0);
            var expectedPosition = acceptCustomValue ? value.length : 0;
            $dropDownButton.trigger('dxclick');
            assert.strictEqual(input.selectionStart, expectedPosition, 'correct start position');
            assert.strictEqual(input.selectionEnd, expectedPosition, 'correct end position');
          });
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
          this.$rootElement = $('<div id="dropDownEditor"></div>');
          this.$rootElement.appendTo('#qunit-fixture');
          this.dropDownEditor = $('#dropDownEditor').dxDropDownEditor({focusStateEnabled: true}).dxDropDownEditor('instance');
          this.$input = this.$rootElement.find('.dx-texteditor-input');
          this.$overlay = this.$rootElement.find('.dx-overlay');
          this.keyboard = keyboardMock(this.$input);
        },
        afterEach: function() {
          this.$rootElement.remove();
          this.dropDownEditor = null;
          fx.off = false;
        }
      }, function() {
        QUnit.test('control keys test', function(assert) {
          var altDown = $.Event('keydown', {
            key: 'ArrowDown',
            altKey: true
          });
          var altUp = $.Event('keydown', {
            key: 'ArrowUp',
            altKey: true
          });
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is hidden on first show');
          this.dropDownEditor.option('opened', true);
          this.keyboard.keyDown('esc');
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is closed on escape press');
          this.$input.trigger(altDown);
          assert.ok(this.dropDownEditor.option('opened'), 'overlay is visible on alt+down press');
          this.$input.trigger(altUp);
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is visible on alt+up press');
        });
        [{
          key: 'ArrowUp',
          ctrlKey: true
        }, {
          key: 'ArrowDown',
          ctrlKey: true
        }, {
          key: 'ArrowUp',
          metaKey: true
        }, {
          key: 'ArrowDown',
          metaKey: true
        }].forEach(function(keyDownConfig) {
          var commandKey = keyDownConfig.ctrlKey ? 'ctrl' : 'command';
          QUnit.test(("default behavior of " + keyDownConfig.key + " arrow key with " + commandKey + " key should not be prevented"), function(assert) {
            this.keyboard.keyDown(keyDownConfig.key, keyDownConfig);
            assert.notOk(this.keyboard.event.isDefaultPrevented(), 'event is not prevented');
            assert.notOk(this.keyboard.event.isPropagationStopped(), 'propogation is not stopped');
            assert.notOk(this.dropDownEditor.option('opened'), 'overlay is closed');
          });
        });
        QUnit.test('space/altDown key press on readOnly drop down doesn\'t toggle popup visibility', function(assert) {
          var altDown = $.Event('keydown', {
            key: 'ArrowDown',
            altKey: true
          });
          this.dropDownEditor.option('readOnly', true);
          this.keyboard.keyDown('space');
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is not visible on space press in readonly state');
          this.$input.trigger(altDown);
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is not visible on alt+down press in readonly state');
        });
        QUnit.test('Enter and escape key press prevent default when popup in opened', function(assert) {
          assert.expect(1);
          var prevented = 0;
          this.dropDownEditor.option('opened', true);
          this.$rootElement.on('keydown', function(e) {
            if (e.isDefaultPrevented()) {
              prevented++;
            }
          });
          this.keyboard.keyDown('enter');
          this.keyboard.keyDown('esc');
          assert.equal(prevented, 2, 'defaults prevented on enter and escape keys');
        });
        QUnit.test('Enter and escape key press does not prevent default when popup in not opened', function(assert) {
          assert.expect(1);
          var prevented = 0;
          this.dropDownEditor.option('opened', false);
          this.$rootElement.on('keydown', function(e) {
            if (e.isDefaultPrevented()) {
              prevented++;
            }
          });
          this.keyboard.keyDown('esc');
          this.keyboard.keyDown('enter');
          assert.equal(prevented, 0, 'defaults has not prevented on enter and escape keys');
        });
        QUnit.test('Escape key press should be handled by a children keyboard processor', function(assert) {
          var handler = sinon.stub();
          this.dropDownEditor.option('onKeyboardHandled', handler);
          this.keyboard.keyDown('esc');
          assert.ok(handler.calledOnce, 'Children keyboard processor can process the \'esc\' key pressing');
        });
        QUnit.test('Home and end key press does not prevent default when popup in opened (T865192)', function(assert) {
          assert.expect(1);
          var prevented = 0;
          this.dropDownEditor.option('opened', true);
          this.$rootElement.on('keydown', function(e) {
            if (e.isDefaultPrevented()) {
              prevented++;
            }
          });
          this.keyboard.keyDown('home');
          this.keyboard.keyDown('end');
          assert.equal(prevented, 0, 'defaults has not prevented on home and end keys');
        });
        QUnit.test('Keyboard navigation with field template', function(assert) {
          this.dropDownEditor.option('fieldTemplate', function(data, container) {
            $(container).append($('<div>').dxTextBox({value: data}));
          });
          this.$rootElement.find('.dx-texteditor-input').trigger($.Event('keydown', {
            key: 'ArrowDown',
            altKey: true
          }));
          assert.ok(this.dropDownEditor.option('opened'), 'overlay is visible on alt+down press');
          this.dropDownEditor.option('value', '123');
          keyboardMock(this.$rootElement.find('.dx-texteditor-input')).keyDown('esc');
          assert.ok(!this.dropDownEditor.option('opened'), 'overlay is not visible on esc press after value changed');
          this.$rootElement.find('.dx-texteditor-input').trigger($.Event('keydown', {
            key: 'ArrowDown',
            altKey: true
          }));
          assert.ok(this.dropDownEditor.option('opened'), 'overlay is visible on esc press after value changed');
        });
        QUnit.testInActiveWindow('Focus policy with field template', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'blur preventing unnecessary on mobile devices');
            return;
          }
          this.dropDownEditor.option('fieldTemplate', function(data, container) {
            $(container).append($('<div>').dxTextBox({value: data}));
          });
          this.$rootElement.find('.dx-texteditor-input').focus();
          this.$rootElement.find('.dx-texteditor-input').focusin();
          assert.ok(this.$rootElement.find('.dx-texteditor').hasClass('dx-state-focused'));
          this.dropDownEditor.option('value', '123');
          assert.ok(this.$rootElement.find('.dx-texteditor').hasClass('dx-state-focused'), 'Text editor is focused after change value');
        });
        QUnit.test('Drop button template should be rendered correctly', function(assert) {
          var buttonTemplate = function(buttonData, contentElement) {
            assert.equal(isRenderer(contentElement), !!config().useJQuery, 'contentElement is correct');
            return '<div>Template</div>';
          };
          this.dropDownEditor.option('dropDownButtonTemplate', buttonTemplate);
          var $button = this.$rootElement.find('.dx-dropdowneditor-button');
          assert.equal($button.text(), 'Template', 'Template was rendered');
        });
      });
      QUnit.module('keyboard navigation inside popup', {
        beforeEach: function() {
          fx.off = true;
          this.$element = $('<div>');
          $('#qunit-fixture').append(this.$element);
          this.instance = this.$element.dxDropDownEditor({
            focusStateEnabled: true,
            applyValueMode: 'useButtons',
            opened: true
          }).dxDropDownEditor('instance');
          this.$input = this.$element.find('.dx-texteditor-input');
          var $popupWrapper = $(this.instance._popup.$wrapper());
          this.$doneButton = $popupWrapper.find('.dx-popup-done.dx-button');
          this.$cancelButton = $popupWrapper.find('.dx-popup-cancel.dx-button');
          this.triggerKeyPress = function($element, keyCode, shiftKey) {
            var eventConfig = {key: keyCode};
            if (shiftKey) {
              eventConfig.shiftKey = shiftKey;
            }
            $($element).focus().trigger($.Event('keydown', eventConfig));
          };
        },
        afterEach: function() {
          this.$element.remove();
          this.instance = null;
          fx.off = false;
        }
      }, function() {
        QUnit.testInActiveWindow('the first popup element should be focused on the \'tab\' key press if the input is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          this.triggerKeyPress(this.$input, TAB_KEY_CODE);
          assert.ok(this.$doneButton.hasClass('dx-state-focused'), 'the first popup element is focused');
        });
        QUnit.testInActiveWindow('the input should be focused on the \'tab\' key press if the last element is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          this.triggerKeyPress(this.$cancelButton, TAB_KEY_CODE);
          assert.ok(this.$element.hasClass('dx-state-focused'), 'the input is focused');
        });
        QUnit.testInActiveWindow('the input should be focused on the \'tab+shift\' key press if the first element is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          this.triggerKeyPress(this.$doneButton, TAB_KEY_CODE, true);
          assert.ok(this.$element.hasClass('dx-state-focused'), 'the input is focused');
        });
        QUnit.testInActiveWindow('the last popup element should be focused on the \'tab+shift\' key press if the input is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          this.triggerKeyPress(this.$input, TAB_KEY_CODE, true);
          assert.ok(this.$cancelButton.hasClass('dx-state-focused'), 'the last popup element is focused');
        });
        QUnit.testInActiveWindow('default event should be prevented on the tab key press if the input is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          var spy = sinon.spy();
          this.$cancelButton.on('keydown', spy);
          this.triggerKeyPress(this.$cancelButton, TAB_KEY_CODE);
          assert.ok(spy.args[0][0].isDefaultPrevented(), 'default is prevented');
        });
        QUnit.testInActiveWindow('default event should be prevented on the tab key press if the last element is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          var spy = sinon.spy();
          this.$input.on('keydown', spy);
          this.triggerKeyPress(this.$input, TAB_KEY_CODE);
          assert.ok(spy.args[0][0].isDefaultPrevented(), 'default is prevented');
        });
        QUnit.testInActiveWindow('popup should be closed on the \'esc\' key press if the button inside is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.instance.open();
          this.triggerKeyPress(this.$doneButton, ESC_KEY_CODE);
          assert.notOk(this.instance.option('opened'), 'popup is closed');
          assert.ok(this.$element.hasClass('dx-state-focused'), 'editor is focused');
        });
      });
      QUnit.module('Templates', function() {
        QUnit.test('should not render placeholder if the fieldTemplate is used', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            items: [0, 1, 2, 3, 4, 5],
            placeholder: 'placeholder',
            fieldTemplate: function() {
              return $('<div>').dxTextBox({placeholder: 'placeholder'});
            }
          });
          var $placeholder = $dropDownEditor.find('.dx-placeholder');
          assert.strictEqual($placeholder.length, 1, 'has only one placeholder');
          assert.strictEqual($placeholder.closest('.dx-textbox').length, 1, 'is textbox\'s placeholder');
        });
        QUnit.test('should not raise error if template finished its render after new template starts render (T1059261)', function(assert) {
          var clock = sinon.useFakeTimers();
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            fieldTemplate: 'field',
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {field: {render: function($__3) {
                    var $__4 = $__3,
                        container = $__4.container,
                        onRendered = $__4.onRendered;
                    var $input = $('<div>').appendTo(container);
                    setTimeout(function() {
                      $input.dxTextBox();
                      onRendered();
                    });
                  }}}}
          }).dxDropDownEditor('instance');
          try {
            dropDownEditor.repaint();
            clock.tick(10);
          } catch (e) {
            assert.ok(false, ("error is raised: " + e.message));
          } finally {
            clock.tick(10);
            clock.restore();
            assert.ok(true);
          }
        });
        QUnit.test('onValueChanged should be fired for each change by keyboard when fieldTemplate is used', function(assert) {
          var valueChangedSpy = sinon.spy();
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            fieldTemplate: function(value) {
              var $textBox = $('<div>').dxTextBox();
              return $('<div>').text(value + this.option('value')).append($textBox);
            },
            items: [0, 1, 2, 3, 4, 5],
            acceptCustomValue: true,
            valueChangeEvent: 'keyup',
            onValueChanged: valueChangedSpy
          });
          keyboardMock($dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS))).type('2');
          assert.equal(valueChangedSpy.callCount, 1, 'onValueChanged is fired first time');
          keyboardMock($dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS))).type('4');
          assert.equal(valueChangedSpy.callCount, 2, 'onValueChanged is fired second time');
        });
        QUnit.test('field template should be correctly removed after it is been applied once', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy');
          var dropDownEditor = $dropDownEditor.dxDropDownEditor({
            items: [1, 2, 3],
            opened: true,
            value: [1],
            searchEnabled: true,
            fieldTemplate: function(itemData, container) {
              var $textBox = $('<div>').dxTextBox();
              var $field = $('<div>Test<div/>');
              assert.equal(isRenderer(container), !!config().useJQuery, 'container is correct');
              $(container).append($field).append($textBox);
            }
          }).dxDropDownEditor('instance');
          dropDownEditor.option('fieldTemplate', null);
          assert.notEqual($dropDownEditor.text(), 'Test', 'fieldTemplate was correctly cleared');
        });
        QUnit.test('events should be rendered for input after value is changed when field template is specified (T399896)', function(assert) {
          var events = ['KeyDown', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input'];
          var spies = {};
          var options = {
            value: 1,
            fieldTemplate: function() {
              return $('<div>').dxTextBox();
            }
          };
          $.each(events, function(_, event) {
            var spy = sinon.spy();
            options['on' + event] = spy;
            spies[event] = spy;
          });
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor(options);
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          instance.option('value', 2);
          $.each(events, function(_, eventName) {
            var params = {};
            if (eventName.indexOf('Key') !== -1) {
              params.key = '';
            }
            var event = $.Event(eventName.toLowerCase(), params);
            $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS)).trigger(event);
            assert.equal(spies[eventName].callCount, 1, 'the \'' + eventName + '\' event was fired after value change');
          });
        });
        QUnit.test('should have no errors after value change if text editor buttons were directly removed (T743479)', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            items: [0, 1, 2, 3, 4, 5],
            value: 1,
            fieldTemplate: function(value) {
              var $textBox = $('<div>').dxTextBox();
              return $('<div>').text(value + this.option('value')).append($textBox);
            }
          });
          var dropDownEditor = $dropDownEditor.dxDropDownEditor('instance');
          $dropDownEditor.find('.dx-texteditor-buttons-container').remove();
          try {
            dropDownEditor.option('value', 2);
            assert.ok(true);
          } catch (e) {
            assert.ok(false, 'the error is thrown');
          }
        });
        QUnit.testInActiveWindow('widget should detach focus events before fieldTemplate rerender', function(assert) {
          var focusOutSpy = sinon.stub();
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            dataSource: [1, 2],
            fieldTemplate: function(value, container) {
              var $textBoxContainer = $('<div>').appendTo(container);
              $('<div>').dxTextBox().appendTo($textBoxContainer);
              $($textBoxContainer).one('dxremove', function() {
                $textBoxContainer.detach();
              });
            },
            onFocusOut: focusOutSpy,
            opened: true
          });
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          $input.focus();
          keyboard.press('down');
          keyboard.press('enter');
          assert.strictEqual(focusOutSpy.callCount, 0, 'there\'s no focus outs from deleted field container');
        });
        QUnit.test('fieldTemplate item element should have 100% width (T826516)', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            dataSource: [1, 2],
            width: 500,
            fieldTemplate: function(value, container) {
              var $textBoxContainer = $('<div>').appendTo(container);
              $('<div>').dxTextBox().appendTo($textBoxContainer);
            }
          });
          var $fieldTemplateWrapper = $dropDownEditor.find(("." + DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER));
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var $buttonsContainer = $dropDownEditor.find(("." + TEXT_EDITOR_BUTTONS_CONTAINER_CLASS));
          assert.roughEqual($fieldTemplateWrapper.outerWidth(), $input.outerWidth() + $buttonsContainer.outerWidth(), 1);
        });
        QUnit.test('fieldTemplate item element should have 100% width with field template wrapper (T826516)', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            dataSource: [1, 2],
            width: 500,
            fieldTemplate: 'field',
            integrationOptions: {templates: {'field': {render: function(args) {
                    var $element = $('<div>').addClass('dx-template-wrapper');
                    $('<div>').dxTextBox().appendTo($element);
                    $element.appendTo(args.container);
                  }}}}
          });
          var $fieldTemplateWrapper = $dropDownEditor.find(("." + DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER));
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var $buttonsContainer = $dropDownEditor.find(("." + TEXT_EDITOR_BUTTONS_CONTAINER_CLASS));
          assert.roughEqual($fieldTemplateWrapper.outerWidth(), $input.outerWidth() + $buttonsContainer.outerWidth(), 1);
        });
        QUnit.testInActiveWindow('fieldTemplate can contain a masked TextBox', function(assert) {
          var keyboard;
          var $input;
          this.clock = sinon.useFakeTimers();
          try {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dataSource: [1, 2],
              fieldTemplate: function(value, $element) {
                var $textBox = $('<div>').appendTo($element).dxTextBox({
                  mask: '0-0',
                  value: value
                });
                $input = $textBox.find(("." + TEXT_EDITOR_INPUT_CLASS));
                keyboard = new keyboardMock($input, true);
                caretWorkaround($input);
                keyboard.caret(0);
              }
            });
            keyboard.type('z5');
            this.clock.tick(10);
            assert.strictEqual($input.val(), '5-_', 'Masked TextBox works fine');
          } finally {
            this.clock.restore();
          }
        });
        QUnit.test('contentTemplate should not redefine popup content (T860163)', function(assert) {
          assert.expect(1);
          var $editor = $("<div id='editor'>\n                <div data-options=\"dxTemplate: { name: 'content' }\">\n                    Content template markup\n                </div>\n            </div>").appendTo('#qunit-fixture');
          $editor.dxDropDownEditor({
            onPopupInitialized: function($__3) {
              var popup = $__3.popup;
              popup.on('contentReady', function() {
                var popupContentText = $(popup.content()).text();
                assert.ok(popupContentText.indexOf('Content template markup') < 0);
              });
            },
            opened: true
          });
        });
        QUnit.test('editor with fieldTemplate should correctly render additional action buttons on changing the "buttons" option', function(assert) {
          var editor = $('#dropDownEditorLazy').dxDropDownEditor({
            dataSource: [1, 2],
            fieldTemplate: function(data, container) {
              $('<div>').dxTextBox().appendTo(container);
            }
          }).dxDropDownEditor('instance');
          editor.option('buttons', [{
            name: 'custom',
            options: {text: 'test button'}
          }]);
          var $buttons = editor.$element().find('.dx-button');
          assert.strictEqual($buttons.length, 1, 'there is only one button');
          assert.strictEqual($buttons.text(), 'test button', 'correct text');
        });
        var isRenovation = !!dxButton.IS_RENOVATED_WIDGET;
        if (!isRenovation) {
          ['readOnly', 'disabled'].forEach(function(prop) {
            [false, true].forEach(function(propValue) {
              QUnit.test(("Drop button template should be rendered once after change the \"" + prop + "\" option value to " + !propValue), function(assert) {
                var $__2;
                var dropDownButtonTemplate = sinon.spy(function() {
                  return '<div>Template</div>';
                });
                var editor = $('#dropDownEditorLazy').dxDropDownEditor(($__2 = {}, Object.defineProperty($__2, "dropDownButtonTemplate", {
                  value: dropDownButtonTemplate,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__2, prop, {
                  value: propValue,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__2)).dxDropDownEditor('instance');
                editor.option(prop, !propValue);
                assert.ok(dropDownButtonTemplate.calledOnce, 'dropDownButton template rendered once');
              });
            });
          });
        }
      });
      QUnit.module('options', function() {
        QUnit.test('acceptCustomValue', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            acceptCustomValue: false,
            valueChangeEvent: 'change keyup'
          });
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          keyboardMock($input).type('test');
          assert.equal($dropDownEditor.dxDropDownEditor('option', 'value'), '', 'value is not set');
          assert.equal($input.val(), '', 'text is not rendered');
        });
        [false, true].forEach(function(openOnFieldClick) {
          QUnit.test(("appearance with openOnFieldClick = " + openOnFieldClick), function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({openOnFieldClick: openOnFieldClick});
            var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
            var isPointerCursor = $input.css('cursor') === 'pointer';
            assert.strictEqual($dropDownEditor.hasClass('dx-dropdowneditor-field-clickable'), openOnFieldClick, ("special css class is " + (openOnFieldClick ? '' : 'not') + " attached"));
            assert.strictEqual(isPointerCursor, openOnFieldClick, ("input should " + (openOnFieldClick ? '' : 'not') + " have the pointer cursor"));
          });
        });
        QUnit.test('openOnFieldClick', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({openOnFieldClick: true});
          var dropDownEditor = $dropDownEditor.dxDropDownEditor('instance');
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          $input.trigger('dxclick');
          assert.equal(dropDownEditor.option('opened'), true, 'opened by field click');
          dropDownEditor.option({
            opened: false,
            openOnFieldClick: false
          });
          $input.trigger('dxclick');
          assert.equal(dropDownEditor.option('opened'), false, 'not opened by field click');
        });
        QUnit.testInActiveWindow('focus editor in the case when \'openOnFieldClick\' is false', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({openOnFieldClick: false});
          var $input = $dropDownEditor.find('.dx-texteditor-input');
          $input.trigger('dxclick');
          assert.ok($dropDownEditor.hasClass('dx-state-focused'), 'editor is focused on click');
        });
        QUnit.test('DropDownEditor doesn\'t opened on field click when it located in element with disabled state', function(assert) {
          var dropDownEditor = $('#dropDownEditorLazy').wrap('<div class=\'dx-state-disabled\'>').dxDropDownEditor({openOnFieldClick: true}).dxDropDownEditor('instance');
          $('#dropDownEditorLazy input').trigger('dxclick');
          assert.notOk(dropDownEditor.option('opened'), 'DropDownEditor isn\'t opened');
        });
        QUnit.test('DropDownButton state after drop readOnly editor\'s state', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({readOnly: true});
          var dropDownEditor = $dropDownEditor.dxDropDownEditor('instance');
          dropDownEditor.option('readOnly', false);
          var dropDownButton = $dropDownEditor.find('.dx-dropdowneditor-button').dxButton('instance');
          assert.equal(dropDownButton.option('disabled'), false, 'dropDownButton is not disabled');
        });
        QUnit.test('input is not editable after changed readOnly state', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            items: ['one', 'two', 'three'],
            acceptCustomValue: false,
            readOnly: true
          });
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          instance.option('value', 'one');
          instance.option('readOnly', false);
          keyboardMock($input).type('b');
          assert.equal($input.val(), 'one', 'value is not changed');
        });
      });
      QUnit.module('popup integration', function() {
        QUnit.module('overlay content width', function() {
          QUnit.test('should be equal to the editor width when dropDownOptions.width in not defined', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $dropDownEditor.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be equal to the editor width when dropDownOptions.width in not defined after editor width runtime change', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
            var instance = $dropDownEditor.dxDropDownEditor('instance');
            instance.option('width', 153);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $dropDownEditor.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be equal to content width if dropDownOptions.width is set to auto', function(assert) {
            var contentWidth = 500;
            var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({dropDownOptions: {width: 'auto'}}).dxDropDownEditor('instance');
            dropDownEditor._renderPopupContent = function() {
              return $('<div>').css({width: contentWidth}).appendTo(dropDownEditor._popup.$content());
            };
            dropDownEditor.open();
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual($popupContent.width(), contentWidth, 'overlay content width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width if it\'s defined', function(assert) {
            var overlayContentWidth = 500;
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {width: overlayContentWidth},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), overlayContentWidth, 'overlay content width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width even after editor input width change', function(assert) {
            var overlayContentWidth = 500;
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {width: overlayContentWidth},
              opened: true
            });
            var instance = $dropDownEditor.dxDropDownEditor('instance');
            instance.option('width', 300);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), overlayContentWidth, 'overlay content width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is set to 100%', function(assert) {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {width: '100%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.width is percent', function(assert) {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {width: '50%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor width runtime change', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              width: 600,
              dropDownOptions: {width: '50%'},
              opened: true
            });
            var instance = $dropDownEditor.dxDropDownEditor('instance');
            instance.option('width', 700);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be equal to editor input width even when dropDownOptions.container is defined', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {container: $container},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $dropDownEditor.outerWidth(), 'width is correct');
          });
          QUnit.test('should be equal to editor input width even when dropDownOptions.position.of is specified', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {position: {of: $container}},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $dropDownEditor.outerWidth(), 'width is correct');
          });
          QUnit.test('should be calculated relative to position.of when dropDownOptions.position.of is specified', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {
                width: '100%',
                position: {of: $container}
              },
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $container.outerWidth(), 'width is correct');
          });
          QUnit.test('should be calculated relative to container when dropDownOptions.container is specified', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {
                width: '100%',
                position: {of: 'window'},
                container: $container
              },
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $container.outerWidth(), 'width is correct');
          });
        });
        QUnit.module('overlay content height', function() {
          QUnit.test('should be equal to content height if dropDownOptions.height is not specified', function(assert) {
            var contentHeight = 500;
            var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor().dxDropDownEditor('instance');
            dropDownEditor._renderPopupContent = function() {
              return $('<div>').css({height: contentHeight}).appendTo(dropDownEditor._popup.$content());
            };
            dropDownEditor.open();
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual($popupContent.height(), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to content height if dropDownOptions.height is not specified even after editor height change', function(assert) {
            var contentHeight = 500;
            var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor().dxDropDownEditor('instance');
            dropDownEditor._renderPopupContent = function() {
              return $('<div>').css({height: contentHeight}).appendTo(dropDownEditor._popup.$content());
            };
            dropDownEditor.open();
            dropDownEditor.option('height', 300);
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual($popupContent.height(), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to content height if dropDownOptions.height is set to auto', function(assert) {
            var contentHeight = 500;
            var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({dropDownOptions: {height: 'auto'}}).dxDropDownEditor('instance');
            dropDownEditor._renderPopupContent = function() {
              return $('<div>').css({height: contentHeight}).appendTo(dropDownEditor._popup.$content());
            };
            dropDownEditor.open();
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual($popupContent.height(), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height if it is specified', function(assert) {
            var overlayContentHeight = 500;
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {height: overlayContentHeight},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), overlayContentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height even after editor height change', function(assert) {
            var overlayContentHeight = 500;
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {height: overlayContentHeight},
              opened: true
            });
            var instance = $dropDownEditor.dxDropDownEditor('instance');
            instance.option('height', 300);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), overlayContentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to wrapper height if dropDownOptions.height is set to 100%', function(assert) {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {height: '100%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight(), 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.height is percent', function(assert) {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {height: '50%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight() / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor height runtime change', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              height: 600,
              dropDownOptions: {height: '50%'},
              opened: true
            });
            var instance = $dropDownEditor.dxDropDownEditor('instance');
            instance.option('height', 700);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight() / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.position.of if it is specified (T1106785)', function(assert) {
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {
                height: '50%',
                position: {of: window}
              },
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $(window).height() / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.container if it is specified', function(assert) {
            var $container = $('<div>').css({height: 150}).appendTo('#qunit-fixture');
            $('#dropDownEditorLazy').dxDropDownEditor({
              dropDownOptions: {
                height: '50%',
                container: $container,
                position: {of: window}
              },
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $container.outerHeight() / 2, 0.1, 'overlay content height is correct');
          });
        });
        QUnit.test('popup should be repositioned after height option runtime change', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          instance.option('height', 300);
          var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
          var overlayContentRect = $overlayContent.get(0).getBoundingClientRect();
          var editorRect = $dropDownEditor.get(0).getBoundingClientRect();
          assert.roughEqual(overlayContentRect.top, editorRect.bottom, 1.01, 'top position is correct');
          assert.roughEqual(overlayContentRect.left, editorRect.left, 1.01, 'left position is correct');
        });
        QUnit.test('popup should be closed on resize if the editor is hidden (T1133813)', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          $dropDownEditor.css('display', 'none');
          assert.strictEqual(instance.option('opened'), true, 'popup is opened');
          resizeCallbacks.fire();
          assert.strictEqual(instance.option('opened'), false, 'popup is closed');
        });
        QUnit.test('onPopupInitialized', function(assert) {
          assert.expect(1);
          $('#dropDownEditorLazy').dxDropDownEditor({
            onPopupInitialized: function(e) {
              assert.equal(e.popup.NAME, 'dxPopup', 'initialized event is fired for popup');
            },
            opened: true
          });
        });
        QUnit.test('showTitle option', function(assert) {
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            dropDownOptions: {showTitle: true},
            opened: true
          }).dxDropDownEditor('instance');
          assert.equal($('.dx-overlay-content .dx-popup-title').length, 1, 'popup title is rendered');
          dropDownEditor.close();
          dropDownEditor.option('dropDownOptions.showTitle', false);
          dropDownEditor.open();
          assert.equal($('.dx-overlay-content .dx-popup-title').length, 0, 'popup title is not rendered');
        });
        QUnit.test('popup should have correct class if it is flipped', function(assert) {
          var $dropDownEditor = $('<div>').appendTo('#qunit-fixture');
          try {
            $dropDownEditor.css({
              position: 'fixed',
              bottom: 0
            });
            $dropDownEditor.dxDropDownEditor({opened: true});
            var $popupContent = $('.dx-overlay-content');
            assert.ok($popupContent.hasClass('dx-dropdowneditor-overlay-flipped'), 'flipped class was added');
          } finally {
            $dropDownEditor.remove();
          }
        });
        QUnit.test('the popup \'fullScreen\' option should be overridden (T295450)', function(assert) {
          Overlay.defaultOptions({options: {fullScreen: true}});
          var $dropDownEditor = $('<div>').dxDropDownEditor({opened: true}).appendTo('#qunit-fixture');
          try {
            var popup = $dropDownEditor.find('.dx-popup').dxPopup('instance');
            assert.equal(popup.option('fullScreen'), false, 'the popup \'fullScreen\' is still false');
          } finally {
            Overlay.defaultOptions({options: {fullScreen: false}});
            $dropDownEditor.remove();
          }
        });
        QUnit.module('ios tests', {
          beforeEach: function() {
            this.clock = sinon.useFakeTimers();
            this._savedDevice = devices.current();
            devices.current({platform: 'ios'});
            var getWrapperClasses = function(element) {
              return Array.from(element._popup.$wrapper()[0].classList);
            };
            this.hasClass = function(element, className) {
              return getWrapperClasses(element).includes(className);
            };
          },
          afterEach: function() {
            this.clock.restore();
            devices.current(this._savedDevice);
          }
        }, function() {
          QUnit.test('Drop down popup wrapper has overlay and custom classes if the "wrapperAttr.class" property is added to "dropDownOptions" on init on iOS (T1118164)', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
              openOnFieldClick: true,
              dropDownOptions: {wrapperAttr: {class: CUSTOM_CLASS}}
            });
            var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
            var dropDownEditor = $dropDownEditor.dxDropDownEditor('instance');
            $input.trigger('dxclick');
            assert.strictEqual(this.hasClass(dropDownEditor, DROP_DOWN_EDITOR_OVERLAY), true, 'drop down popup wrapper has overlay class');
            assert.strictEqual(this.hasClass(dropDownEditor, CUSTOM_CLASS), true, 'drop down popup wrapper has custom class');
          });
          QUnit.test('Drop down popup wrapper has overlay and custom classes if the "wrapperAttr.class" property is added to "dropDownOptions" after init on iOS (T1118164)', function(assert) {
            var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({openOnFieldClick: true});
            var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
            var dropDownEditor = $dropDownEditor.dxDropDownEditor('instance');
            this.clock.tick(500);
            dropDownEditor.option('dropDownOptions.wrapperAttr.class', CUSTOM_CLASS);
            $input.trigger('dxclick');
            assert.strictEqual(this.hasClass(dropDownEditor, DROP_DOWN_EDITOR_OVERLAY), true, 'drop down popup wrapper has overlay class');
            assert.strictEqual(this.hasClass(dropDownEditor, CUSTOM_CLASS), true, 'drop down popup wrapper has custom class');
          });
        });
        QUnit.test('popup rerender should not provoke deprecation logs (T1129836)', function(assert) {
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true}).dxDropDownEditor('instance');
          var logStub = sinon.stub(errors, 'log');
          dropDownEditor.option('dropDownOptions', {showTitle: true});
          dropDownEditor._renderPopup();
          assert.strictEqual(logStub.callCount, 0);
        });
      });
      QUnit.module('popup buttons', {
        beforeEach: function() {
          fx.off = true;
          this.$dropDownEditor = $('<div id="dropDownEditor"></div>').appendTo('#qunit-fixture');
          this.dropDownEditor = this.$dropDownEditor.dxDropDownEditor({
            applyValueMode: 'useButtons',
            dropDownOptions: {showTitle: true}
          }).dxDropDownEditor('instance');
        },
        reinitFixture: function(options) {
          this.$dropDownEditor.remove();
          this.dropDownEditor = null;
          this.$dropDownEditor = $('<div id="dropDownEditor"></div>').appendTo('#qunit-fixture');
          this.dropDownEditor = this.$dropDownEditor.dxDropDownEditor(options).dxDropDownEditor('instance');
        },
        afterEach: function() {
          this.$dropDownEditor.remove();
          this.dropDownEditor = null;
          fx.off = false;
        }
      }, function() {
        QUnit.test('applyValueMode option should affect on buttons rendering inside popup', function(assert) {
          if (!devices.current().ios) {
            this.reinitFixture({
              dropDownOptions: {showTitle: false},
              applyValueMode: 'useButtons'
            });
          }
          this.dropDownEditor.open();
          assert.ok($('.dx-overlay-content .dx-button').length > 0, 'buttons are rendered');
          this.dropDownEditor.option('applyValueMode', 'instantly');
          this.dropDownEditor.close();
          this.dropDownEditor.open();
          assert.equal($('.dx-overlay-content .dx-button').length, 0, 'no buttons are rendered');
        });
        QUnit.test('OK/Cancel button should be shown dependent on applyValueMode option (T184179)', function(assert) {
          this.reinitFixture({applyValueMode: 'instantly'});
          this.dropDownEditor.open();
          var $applyButton = $('.dx-popup-done.dx-button');
          var $cancelButton = $('.dx-popup-cancel.dx-button');
          assert.ok(!$applyButton.length);
          assert.ok(!$cancelButton.length);
        });
        QUnit.test('Render apply button', function(assert) {
          this.dropDownEditor.open();
          var $applyButton = $('.dx-popup-done.dx-button').eq(0);
          assert.equal($applyButton.length, 1);
          assert.equal($applyButton.find('.dx-button-text').text(), 'OK');
        });
        QUnit.test('Render apply button with custom text', function(assert) {
          this.reinitFixture({
            applyButtonText: 'Apply',
            applyValueMode: 'useButtons',
            dropDownOptions: {showTitle: true}
          });
          this.dropDownEditor.open();
          var $applyButton = $('.dx-popup-done.dx-button').eq(0);
          assert.equal($applyButton.find('.dx-button-text').text(), 'Apply');
        });
        QUnit.test('Apply button text changing', function(assert) {
          this.dropDownEditor.open();
          this.dropDownEditor.option({
            applyButtonText: 'Apply',
            applyValueMode: 'useButtons'
          });
          var $applyButton = $('.dx-popup-done.dx-button').eq(0);
          assert.equal($applyButton.find('.dx-button-text').text(), 'Apply');
        });
        QUnit.test('Render cancel button', function(assert) {
          this.dropDownEditor.open();
          var $cancelButton = $('.dx-popup-cancel.dx-button').eq(0);
          assert.equal($cancelButton.length, 1);
          assert.equal($cancelButton.find('.dx-button-text').text(), 'Cancel');
        });
        QUnit.test('Render cancel button with custom text', function(assert) {
          this.reinitFixture({
            cancelButtonText: 'Discard',
            applyValueMode: 'useButtons',
            dropDownOptions: {showTitle: true}
          });
          this.dropDownEditor.open();
          var $cancelButton = $('.dx-popup-cancel.dx-button').eq(0);
          assert.equal($cancelButton.find('.dx-button-text').text(), 'Discard');
        });
        QUnit.test('Cancel button text changing', function(assert) {
          this.dropDownEditor.open();
          this.dropDownEditor.option({
            cancelButtonText: 'Discard',
            applyValueMode: 'useButtons'
          });
          var $cancelButton = $('.dx-popup-cancel.dx-button').eq(0);
          assert.equal($cancelButton.find('.dx-button-text').text(), 'Discard');
        });
        QUnit.test('Clicking on buttons should close dropDown popup', function(assert) {
          this.dropDownEditor.open();
          var $applyButton = $('.dx-popup-done.dx-button').eq(0);
          var $cancelButton = $('.dx-popup-cancel.dx-button').eq(0);
          $applyButton.trigger('dxclick');
          assert.ok(!this.dropDownEditor.option('opened'), 'dropDown is closed after click on apply button');
          $cancelButton.trigger('dxclick');
          assert.ok(!this.dropDownEditor.option('opened'), 'dropDown is closed after click on cancel button');
        });
        QUnit.test('\'buttonsLocation\' option', function(assert) {
          this.reinitFixture({
            applyValueMode: 'useButtons',
            buttonsLocation: 'bottom after'
          });
          this.dropDownEditor.open();
          assert.equal($('.dx-popup-bottom .dx-toolbar-after .dx-button').length, 2, 'buttons are rendered in \'toolbar-after\'');
          this.dropDownEditor.close();
          this.dropDownEditor.option('buttonsLocation', 'bottom before');
          this.dropDownEditor.open();
          assert.equal($('.dx-popup-bottom .dx-toolbar-before .dx-button').length, 2, 'buttons are rendered in \'toolbar-before\'');
        });
      });
      QUnit.module('actions', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('onContentReady should fire when widget is readOnly', function(assert) {
          var contentReadyFired = 0;
          $('#dropDownEditorLazy').dxDropDownEditor({
            readOnly: true,
            onContentReady: function() {
              contentReadyFired++;
            },
            deferRendering: false
          });
          assert.equal(contentReadyFired, 1, 'content ready fired once');
        });
        QUnit.test('onOpened should fire when widget is readonly', function(assert) {
          var onOpenedActionStub = sinon.stub();
          var onClosedActionStub = sinon.stub();
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            readOnly: true,
            onOpened: onOpenedActionStub,
            onClosed: onClosedActionStub,
            deferRendering: false
          }).dxDropDownEditor('instance');
          dropDownEditor.open();
          assert.ok(onOpenedActionStub.called, 'onOpened action was fired');
          dropDownEditor.close();
          assert.ok(onClosedActionStub.called, 'onClosed action was fired');
        });
        QUnit.test('onOpened should fire when widget is disabled', function(assert) {
          var onOpenedActionStub = sinon.stub();
          var onClosedActionStub = sinon.stub();
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            disabled: true,
            onOpened: onOpenedActionStub,
            onClosed: onClosedActionStub
          }).dxDropDownEditor('instance');
          dropDownEditor.open();
          assert.ok(onOpenedActionStub.called, 'onOpened action was fired');
          dropDownEditor.close();
          assert.ok(onClosedActionStub.called, 'onClosed action was fired');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor();
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          assert.strictEqual($input.attr('role'), 'combobox', 'aria role on input is correct');
          assert.strictEqual($dropDownEditor.attr('role'), undefined, 'aria role on element is not exist');
        });
        QUnit.test('aria-expanded property on input', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
          var $input = $dropDownEditor.find(("." + TEXT_EDITOR_INPUT_CLASS));
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          assert.equal($input.attr('aria-expanded'), 'true', 'aria-expanded property on opened');
          instance.option('opened', false);
          assert.equal($input.attr('aria-expanded'), 'false', 'aria-expanded property on closed');
        });
        QUnit.test('aria-haspopup property on input', function(assert) {
          var $input = $('#dropDownEditorLazy').dxDropDownEditor().find(("." + TEXT_EDITOR_INPUT_CLASS));
          assert.equal($input.attr('aria-haspopup'), 'true', 'haspopup attribute exists');
        });
        QUnit.test('aria-autocomplete property on input', function(assert) {
          var $input = $('#dropDownEditorLazy').dxDropDownEditor().find(("." + TEXT_EDITOR_INPUT_CLASS));
          assert.equal($input.attr('aria-autocomplete'), 'list', 'haspopup attribute exists');
        });
        QUnit.test('aria-owns should be removed when popup is not visible', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({opened: true});
          var instance = $dropDownEditor.dxDropDownEditor('instance');
          assert.notEqual($dropDownEditor.attr('aria-owns'), undefined, 'owns exists');
          assert.equal($dropDownEditor.attr('aria-owns'), $(("." + POPUP_CONTENT)).attr('id'), 'aria-owns points to popup\'s content id');
          instance.close();
          assert.strictEqual($dropDownEditor.attr('aria-owns'), undefined, 'owns does not exist');
        });
        QUnit.module('aria-controls', {}, function() {
          var attrName = 'aria-controls';
          var deferRenderings = [true, false];
          deferRenderings.forEach(function(deferRendering) {
            QUnit.test(("'aria-controls' should be set if deferRendering=\"" + deferRendering + "\""), function(assert) {
              var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({deferRendering: deferRendering}).dxDropDownEditor('instance');
              var $input = $(dropDownEditor.field());
              var hasAttr = function() {
                return $input[0].hasAttribute(attrName);
              };
              assert.strictEqual(hasAttr(), !deferRendering, (attrName + " attribute has " + (deferRendering ? 'not' : '') + " been set"));
              dropDownEditor.open();
              var popupId = $(dropDownEditor.content()).attr('id');
              assert.strictEqual($input.attr(attrName), popupId, ("input has correct " + attrName + " attribute"));
              assert.ok(hasAttr(), (attrName + " attribute has been set"));
              dropDownEditor.close();
              assert.strictEqual($input.attr(attrName), popupId, ("input has correct " + attrName + " attribute"));
              assert.ok(hasAttr(), (attrName + " attribute has been set"));
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
    define(["jquery","core/config","core/devices","events/core/events_engine","animation/fx","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/utils/support","core/errors","ui/drop_down_editor/ui.drop_down_editor","ui/overlay/ui.overlay","core/utils/type","./textEditorParts/caretWorkaround.js","core/utils/resize_callbacks","ui/button","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("core/devices"), require("events/core/events_engine"), require("animation/fx"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("core/utils/support"), require("core/errors"), require("ui/drop_down_editor/ui.drop_down_editor"), require("ui/overlay/ui.overlay"), require("core/utils/type"), require("./textEditorParts/caretWorkaround.js"), require("core/utils/resize_callbacks"), require("ui/button"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownEditor.tests.js.map