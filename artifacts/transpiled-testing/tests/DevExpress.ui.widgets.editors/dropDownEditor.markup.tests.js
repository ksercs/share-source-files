!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownEditor.markup.tests.js"], ["jquery","core/utils/deferred","ui/drop_down_editor/ui.drop_down_editor"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownEditor.markup.tests.js", ["jquery", "core/utils/deferred", "ui/drop_down_editor/ui.drop_down_editor"], function($__export) {
  "use strict";
  var $,
      Deferred,
      module,
      test,
      testStart,
      DROP_DOWN_EDITOR_CLASS,
      DROP_DOWN_EDITOR_INPUT_WRAPPER,
      DROP_DOWN_EDITOR_BUTTON_CLASS,
      DROP_DOWN_EDITOR_BUTTON_VISIBLE,
      DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER,
      TEXTEDITOR_INPUT_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {}],
    execute: function() {
      var $__2;
      (($__2 = QUnit, module = $__2.module, test = $__2.test, testStart = $__2.testStart, $__2));
      testStart(function() {
        var markup = '<div id="qunit-fixture" class="qunit-fixture-visible">\
            <div id="dropDownEditorLazy"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      DROP_DOWN_EDITOR_CLASS = 'dx-dropdowneditor';
      DROP_DOWN_EDITOR_INPUT_WRAPPER = 'dx-dropdowneditor-input-wrapper';
      DROP_DOWN_EDITOR_BUTTON_CLASS = 'dx-dropdowneditor-button';
      DROP_DOWN_EDITOR_BUTTON_VISIBLE = 'dx-dropdowneditor-button-visible';
      DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER = 'dx-dropdowneditor-field-template-wrapper';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      module('DropDownEditor markup', {
        beforeEach: function() {
          this.rootElement = $('<div id=\'dropDownEditor\'></div>');
          this.rootElement.appendTo($('#qunit-fixture'));
          this.$dropDownEditor = $('#dropDownEditor').dxDropDownEditor();
          this.dropDownEditor = this.$dropDownEditor.dxDropDownEditor('instance');
        },
        afterEach: function() {
          this.rootElement.remove();
          this.dropDownEditor = null;
        }
      }, function() {
        test('root element must be decorated with DROP_DOWN_EDITOR_CLASS', function(assert) {
          assert.ok(this.rootElement.hasClass(DROP_DOWN_EDITOR_CLASS));
        });
        test('root element have only one child', function(assert) {
          assert.strictEqual(this.rootElement.children().length, 1);
        });
        test('dxDropDownEditor must have a button which must be decorated with DROP_DOWN_EDITOR_BUTTON_CLASS', function(assert) {
          var $dropDownButton = this.rootElement.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          assert.strictEqual($dropDownButton.length, 1);
          assert.ok($dropDownButton.hasClass(DROP_DOWN_EDITOR_BUTTON_CLASS));
        });
        test('dxDropDownEditor button should have correct aria-label attribute', function(assert) {
          var $dropDownButton = this.rootElement.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS));
          assert.strictEqual($dropDownButton.attr('aria-label'), 'Select', '\'aria-label\' is correct');
        });
        test('input wrapper must be upper than button', function(assert) {
          var $inputWrapper = this.rootElement.children();
          assert.strictEqual(this.rootElement.find(("." + DROP_DOWN_EDITOR_INPUT_WRAPPER))[0], $inputWrapper[0]);
          assert.strictEqual(this.rootElement.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS))[0], $inputWrapper.find(("." + DROP_DOWN_EDITOR_BUTTON_CLASS))[0]);
        });
        test('input must be wrapped for proper event handling', function(assert) {
          assert.ok(this.dropDownEditor._input().parents().find(("." + DROP_DOWN_EDITOR_INPUT_WRAPPER)).hasClass(DROP_DOWN_EDITOR_INPUT_WRAPPER));
        });
        test('DROP_DOWN_EDITOR_BUTTON_VISIBLE class should depend on drop down button visibility', function(assert) {
          assert.ok(this.rootElement.hasClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE), 'class present by default');
          this.dropDownEditor.option('showDropDownButton', false);
          assert.notOk(this.rootElement.hasClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE), 'class removes when the button hides');
          this.dropDownEditor.option('showDropDownButton', true);
          assert.ok(this.rootElement.hasClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE), 'class appears when the button shows');
        });
        test('correct buttons order after rendering', function(assert) {
          var $dropDownEditor = this.rootElement.dxDropDownEditor({showClearButton: true});
          var $buttonsContainer = $dropDownEditor.find('.dx-texteditor-buttons-container');
          var $buttons = $buttonsContainer.children();
          assert.equal($buttons.length, 2, 'clear button and drop button were rendered');
          assert.ok($buttons.eq(0).hasClass('dx-clear-button-area'), 'clear button is the first one');
          assert.ok($buttons.eq(1).hasClass(DROP_DOWN_EDITOR_BUTTON_CLASS), 'drop button is the second one');
        });
        test('fieldTemplate as render', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({
            fieldTemplate: function(value) {
              var $textBox = $('<div>').dxTextBox();
              return $('<div>').text(value + this.option('value')).append($textBox);
            },
            value: 'test'
          });
          assert.strictEqual($dropDownEditor.find(("." + DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER)).length, 1);
          assert.equal($.trim($dropDownEditor.text()), 'testtest', 'field rendered');
        });
        test('field should be rendered after input value rendering', function(assert) {
          var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({value: 'test'}).dxDropDownEditor('instance');
          var deferred = new Deferred();
          var renderFieldSpy = sinon.spy(dropDownEditor, '_renderField');
          sinon.stub(dropDownEditor, '_renderInputValue').returns(deferred.promise());
          dropDownEditor.repaint();
          assert.ok(renderFieldSpy.notCalled, 'field rendering is waiting for an input value rendering');
          deferred.resolve();
          assert.ok(renderFieldSpy.calledOnce, 'field has been rendered');
        });
      });
      module('aria accessibility', function() {
        test('aria role', function(assert) {
          var $dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor();
          var $input = $dropDownEditor.find(("." + TEXTEDITOR_INPUT_CLASS));
          assert.strictEqual($input.attr('role'), 'combobox', 'aria role on input is correct');
          assert.strictEqual($dropDownEditor.attr('role'), undefined, 'aria role on element is not exist');
        });
        test('aria-autocomplete property on input', function(assert) {
          var $input = $('#dropDownEditorLazy').dxDropDownEditor().find(("." + TEXTEDITOR_INPUT_CLASS));
          assert.equal($input.attr('aria-autocomplete'), 'list', 'haspopup attribute exists');
        });
      });
      module('option change', function() {
        var getStartDirection = function(isRtlEnabled) {
          return isRtlEnabled ? 'right' : 'left';
        };
        [false, true].forEach(function(rtlEnabled) {
          test(("after updating of the \"rtlEnabled\" option to \"" + rtlEnabled + "\" Popup should update its position"), function(assert) {
            var dropDownEditor = $('#dropDownEditorLazy').dxDropDownEditor({rtlEnabled: rtlEnabled}).dxDropDownEditor('instance');
            var $__3 = dropDownEditor.option('popupPosition'),
                initialMyPosition = $__3.my,
                initialAtPosition = $__3.at;
            var initialStartDirection = getStartDirection(rtlEnabled);
            assert.strictEqual(initialAtPosition, (initialStartDirection + " bottom"), 'correct initial "at" position');
            assert.strictEqual(initialMyPosition, (initialStartDirection + " top"), 'correct initial "my" position');
            dropDownEditor.option('rtlEnabled', !rtlEnabled);
            var $__4 = dropDownEditor.option('popupPosition'),
                newMyPosition = $__4.my,
                newAtPosition = $__4.at;
            var newStartDirection = getStartDirection(!rtlEnabled);
            assert.strictEqual(newAtPosition, (newStartDirection + " bottom"), 'correct new "at" position');
            assert.strictEqual(newMyPosition, (newStartDirection + " top"), 'correct new "my" position');
            dropDownEditor.option('rtlEnabled', rtlEnabled);
            var $__5 = dropDownEditor.option('popupPosition'),
                revertedMyPosition = $__5.my,
                revertedAtPosition = $__5.at;
            assert.strictEqual(revertedAtPosition, (initialStartDirection + " bottom"), 'correct initial "at" position');
            assert.strictEqual(revertedMyPosition, (initialStartDirection + " top"), 'correct initial "my" position');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/deferred","ui/drop_down_editor/ui.drop_down_editor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/deferred"), require("ui/drop_down_editor/ui.drop_down_editor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownEditor.markup.tests.js.map