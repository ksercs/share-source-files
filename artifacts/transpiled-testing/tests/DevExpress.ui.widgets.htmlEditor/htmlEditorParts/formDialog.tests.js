!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/formDialog.tests.js"], ["jquery","ui/html_editor/ui/formDialog","core/utils/type","core/devices","core/utils/window","../../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/formDialog.tests.js", ["jquery", "ui/html_editor/ui/formDialog", "core/utils/type", "core/devices", "core/utils/window", "../../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var $,
      FormDialog,
      isPromise,
      devices,
      getCurrentScreenFactor,
      hasWindow,
      keyboardMock,
      DIALOG_CLASS,
      FORM_CLASS,
      FIELD_ITEM_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      BUTTON_WITH_TEXT_CLASS,
      CUSTOM_CLASS,
      moduleConfig,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      FormDialog = $__m.default;
    }, function($__m) {
      isPromise = $__m.isPromise;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      getCurrentScreenFactor = $__m.getCurrentScreenFactor;
      hasWindow = $__m.hasWindow;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      var $__4;
      DIALOG_CLASS = 'dx-formdialog';
      FORM_CLASS = 'dx-formdialog-form';
      FIELD_ITEM_CLASS = 'dx-field-item';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      BUTTON_WITH_TEXT_CLASS = 'dx-button-has-text';
      CUSTOM_CLASS = 'custom-class';
      moduleConfig = {beforeEach: function() {
          var $__3 = this;
          this.$element = $('#htmlEditor');
          this.componentMock = {
            _createComponent: function($container, Widget, options) {
              return new Widget($container, options);
            },
            $element: function() {
              return $__3.$element;
            }
          };
        }};
      (($__4 = QUnit, test = $__4.test, $__4));
      QUnit.module('FormDialog', moduleConfig, function() {
        test('Wrapper has dialog class when the "wrapperAttr.class" property is added to "popupOption"', function(assert) {
          var popupConfig = {
            container: this.$element,
            wrapperAttr: {class: CUSTOM_CLASS}
          };
          var formDialog = new FormDialog(this.componentMock, popupConfig);
          formDialog.show();
          var $wrapper = this.$element.find(("." + CUSTOM_CLASS))[0];
          var wrapperHasDialogClass = Array.from($wrapper.classList).includes(DIALOG_CLASS);
          assert.strictEqual(wrapperHasDialogClass, true, 'Wrapper with the FormDialog class');
        });
        test('render FormDialog', function(assert) {
          var formDialog = new FormDialog(this.componentMock);
          var $dialog = this.$element.find(("." + DIALOG_CLASS));
          var $form = $dialog.find(("." + FORM_CLASS));
          assert.ok(formDialog, 'constructor return an instance');
          assert.equal($dialog.length, 1, 'There is element with the FormDialog class');
          assert.equal($form.length, 1, 'There is element with the Form class inside FormDialog');
        });
        test('render FormDialog with popup options', function(assert) {
          var formDialog = new FormDialog(this.componentMock, {width: 155});
          assert.equal(formDialog.popupOption('width'), 155, 'Custom width should apply');
        });
        test('change FormDialog form options', function(assert) {
          var formDialog = new FormDialog(this.componentMock);
          formDialog.formOption('width', 155);
          assert.equal(formDialog.formOption('width'), 155, 'Custom width should apply');
        });
        test('show dialog', function(assert) {
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name', 'age']});
          var formItemsCount = this.$element.find(("." + FORM_CLASS + " ." + FIELD_ITEM_CLASS)).length;
          assert.ok(isPromise(promise), 'show returns a promise');
          assert.equal(formItemsCount, 2, '2 form items are rendered');
        });
        test('check dialog popup fullscreen mode (T1026801)', function(assert) {
          var screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
          var expectedFullScreen = devices.real().deviceType === 'phone' || screenFactor === 'xs';
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          formDialog.show({items: ['name']});
          assert.strictEqual(formDialog._popup.option('fullScreen'), expectedFullScreen);
        });
        test('confirm dialog by api', function(assert) {
          assert.expect(1);
          var EXPECTED_DATA = {
            name: 'Test',
            age: 20
          };
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name', 'age']});
          promise.done(function(formData) {
            assert.deepEqual(formData, EXPECTED_DATA, 'new data is correct');
          });
          formDialog.hide(EXPECTED_DATA);
        });
        test('confirm dialog by Enter key press', function(assert) {
          assert.expect(1);
          var EXPECTED_DATA = {name: 'Test'};
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name']});
          var $input = $(("." + FORM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          promise.done(function(formData) {
            assert.deepEqual(formData, EXPECTED_DATA, 'new data is correct');
          });
          keyboardMock($input).type('Test').change().press('enter');
        });
        test('confirm dialog by button', function(assert) {
          assert.expect(1);
          var EXPECTED_DATA = {name: 'Test'};
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name']});
          var $input = $(("." + FORM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          promise.done(function(formData) {
            assert.deepEqual(formData, EXPECTED_DATA, 'new data is correct');
          });
          keyboardMock($input).type('Test').change();
          $(("." + DIALOG_CLASS + " ." + BUTTON_WITH_TEXT_CLASS)).first().trigger('dxclick');
        });
        test('decline dialog by button click', function(assert) {
          assert.expect(1);
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name']});
          var $input = $(("." + FORM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          promise.fail(function(formData) {
            assert.notOk(formData, 'There is no data');
          });
          keyboardMock($input).type('Test').change();
          $(("." + DIALOG_CLASS + " ." + BUTTON_WITH_TEXT_CLASS)).last().trigger('dxclick');
        });
        test('decline dialog on hiding', function(assert) {
          assert.expect(1);
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name']});
          var $input = $(("." + FORM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          promise.fail(function(formData) {
            assert.notOk(formData, 'There is no data');
          });
          keyboardMock($input).type('Test').change();
          formDialog._popup.hide();
        });
        test('decline dialog by escape key press', function(assert) {
          assert.expect(1);
          var formDialog = new FormDialog(this.componentMock, {container: this.$element});
          var promise = formDialog.show({items: ['name']});
          var $input = $(("." + FORM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          promise.fail(function(formData) {
            assert.notOk(formData, 'There is no data');
          });
          keyboardMock($input).type('Test').change().keyDown('esc');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor/ui/formDialog","core/utils/type","core/devices","core/utils/window","../../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor/ui/formDialog"), require("core/utils/type"), require("core/devices"), require("core/utils/window"), require("../../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=formDialog.tests.js.map