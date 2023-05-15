!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/actionButtons.test.js"], ["jquery","generic_light.css!","ui/text_box","ui/select_box","ui/number_box","ui/widget/ui.errors"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/actionButtons.test.js", ["jquery", "generic_light.css!", "ui/text_box", "ui/select_box", "ui/number_box", "ui/widget/ui.errors"], function($__export) {
  "use strict";
  var $,
      errors,
      module,
      test,
      CUSTOM_BUTTON_HOVERED_CLASS;
  function getTextEditorButtons($editor) {
    return {
      $before: $editor.find(' > div > .dx-texteditor-buttons-container:first-child, > .dx-dropdowneditor-input-wrapper > div > .dx-texteditor-buttons-container:first-child').children(),
      $after: $editor.find('.dx-texteditor-buttons-container:last-child').children()
    };
  }
  function isClearButton($element) {
    return $element.hasClass('dx-clear-button-area');
  }
  function isSpinButton($element) {
    return $element.hasClass('dx-numberbox-spin-container');
  }
  function isDropDownButton($element) {
    return $element.hasClass('dx-dropdowneditor-button');
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      errors = $__m.default;
    }],
    execute: function() {
      var $__1;
      (($__1 = QUnit, module = $__1.module, test = $__1.test, $__1));
      CUSTOM_BUTTON_HOVERED_CLASS = 'dx-custom-button-hovered';
      module('button collection', function() {
        test('should render default buttons if the \'buttons\' option is not defined', function(assert) {
          var $textBox = $('<div>').dxTextBox({showClearButton: true});
          var $__2 = getTextEditorButtons($textBox),
              $before = $__2.$before,
              $after = $__2.$after;
          assert.notOk($before.length);
          assert.strictEqual($after.length, 1);
        });
        test('should not render default buttons if the collection is defined', function(assert) {
          var $textBox = $('<div>').dxTextBox({
            buttons: [],
            showClearButton: true
          });
          var $__2 = getTextEditorButtons($textBox),
              $before = $__2.$before,
              $after = $__2.$after;
          assert.notOk($before.length);
          assert.notOk($after.length);
        });
        test('should be an array', function(assert) {
          var checkException = function(value) {
            var textBox = $('<div>').dxTextBox({}).dxTextBox('instance');
            assert.throws(function() {
              return $('<div>').dxTextBox({buttons: value});
            }, errors.Error('E1053'));
            assert.throws(function() {
              return textBox.option('buttons', value);
            }, errors.Error('E1053'));
          };
          ['string', {}, 2, true].forEach(checkException);
        });
        module('button', function() {
          test('should be a string or an object only', function(assert) {
            var checkException = function(value) {
              var textBox = $('<div>').dxTextBox({}).dxTextBox('instance');
              assert.throws(function() {
                return $('<div>').dxTextBox({buttons: [value]});
              }, errors.Error('E1053'));
              assert.throws(function() {
                return textBox.option('buttons', [value]);
              }, errors.Error('E1053'));
            };
            [0, [], true, null, void 0].forEach(checkException);
          });
          test('should not have buttons with same names', function(assert) {
            assert.throws(function() {
              return $('<div>').dxTextBox({buttons: ['clear', 'clear']});
            }, errors.Error('E1055', 'clear'));
            assert.throws(function() {
              return $('<div>').dxTextBox({buttons: [{name: 'name'}, {name: 'name'}]});
            }, errors.Error('E1055', 'name'));
          });
          module('fields', function() {
            test('\'name\' filed should be defined for custom buttons', function(assert) {
              assert.throws(function() {
                return $('<div>').dxTextBox({buttons: [{}]});
              }, errors.Error('E1054'));
            });
            test('\'name\' filed should be a string', function(assert) {
              var checkException = function(value) {
                var textBox = $('<div>').dxTextBox({}).dxTextBox('instance');
                assert.throws(function() {
                  return $('<div>').dxTextBox({buttons: [{name: value}]});
                }, errors.Error('E1055'));
                assert.throws(function() {
                  return textBox.option('buttons', [{name: value}]);
                }, errors.Error('E1055'));
              };
              [1, [], {}, false, null, void 0].forEach(checkException);
            });
            test('\'location\' field should be \'after\' or \'before\' string only', function(assert) {
              var $textBox = $('<div>').dxTextBox({buttons: [{
                  name: 'name',
                  location: 'incorrect'
                }]});
              var $__2 = getTextEditorButtons($textBox),
                  $before = $__2.$before,
                  $after = $__2.$after;
              assert.strictEqual($before.length, 0);
              assert.strictEqual($after.length, 1);
            });
            test('\'options\' and \'location\' fields should not be required', function(assert) {
              var $textBox = $('<div>').dxTextBox({buttons: [{name: 'name1'}, {name: 'name2'}]});
              var $__2 = getTextEditorButtons($textBox),
                  $before = $__2.$before,
                  $after = $__2.$after;
              assert.notOk($before.length);
              assert.strictEqual($after.length, 2);
            });
            test('custom button should skip content template from the integrationOptions', function(assert) {
              var $textBox = $('<div>').dxTextBox({buttons: [{name: 'name1'}]});
              var buttons = getTextEditorButtons($textBox);
              var button = buttons.$after.eq(0).dxButton('instance');
              assert.deepEqual(button.option('integrationOptions.skipTemplates'), ['content'], 'content is skipped');
            });
            test('custom button should have ignoreParentReadOnly option as true', function(assert) {
              var $textBox = $('<div>').dxTextBox({buttons: [{name: 'name1'}]});
              var buttons = getTextEditorButtons($textBox);
              var button = buttons.$after.eq(0).dxButton('instance');
              assert.strictEqual(button.option('ignoreParentReadOnly'), true, 'button has ignoreParentReadOnly option');
            });
          });
        });
      });
      module('API', function() {
        test('\'getButton\' method should returns action button instance', function(assert) {
          var selectBox = $('<div>').dxSelectBox({
            showClearButton: true,
            text: 'someText',
            buttons: ['clear', {
              name: 'custom',
              options: {text: 'customButtonText'}
            }, 'dropDown']
          }).dxSelectBox('instance');
          var clearButton = selectBox.getButton('clear');
          var fakeButton = selectBox.getButton('fake');
          var dropDownButton = selectBox.getButton('dropDown');
          var customButton = selectBox.getButton('custom');
          assert.ok(clearButton.hasClass('dx-clear-button-area'));
          assert.strictEqual(fakeButton, undefined);
          assert.ok(dropDownButton.$element().hasClass('dx-dropdowneditor-button'));
          assert.strictEqual(customButton.option('text'), 'customButtonText');
        });
      });
      module('rendering', function() {
        function getButtonPlaceHolders($container) {
          return $container.filter(':empty');
        }
        module('textBox', function() {
          test('custom button options should be applied', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              buttons: [{
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }]
            });
            var $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 1);
            assert.strictEqual($after.text(), 'custom');
          });
          test('editor with button should have smaller placeholder than the editor without buttons', function(assert) {
            var $textBox = $('<div>').appendTo('body').dxTextBox({
              width: 150,
              placeholder: 'Test long text example',
              buttons: [{
                name: 'custom',
                location: 'after',
                options: {text: 'B'}
              }]
            });
            var beforeStyle = getComputedStyle($textBox.find('.dx-placeholder').get(0), ':before');
            assert.ok(parseInt(beforeStyle.width) < $textBox.outerWidth(), 'placeholder is smaller than the editor');
            $textBox.remove();
          });
          test('should not render \'clear\' button if showClearButton is false', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              buttons: ['clear'],
              value: 'text'
            });
            var $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 1);
            assert.strictEqual(getButtonPlaceHolders($after).length, 1);
          });
          test('should render \'clear\' button only after it becomes visible', function(assert) {
            var $textBox = $('<div>').dxTextBox({});
            var textBox = $textBox.dxTextBox('instance');
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 1);
            assert.strictEqual(getButtonPlaceHolders($after).length, 1);
            textBox.option({showClearButton: true});
            var textEditorButtons = getTextEditorButtons($textBox);
            $before = textEditorButtons.$before;
            $after = textEditorButtons.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 1);
            assert.notOk(getButtonPlaceHolders($after).length);
            assert.ok(isClearButton($after.eq(0)));
          });
          test('should render predefined button (\'clear\')', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear']
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 1);
            assert.notOk(getButtonPlaceHolders($after).length);
          });
          test('should render predefined button (\'clear\') configurated as object', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: [{name: 'clear'}]
            });
            var $after = getTextEditorButtons($textBox).$after;
            assert.ok(isClearButton($after.eq(0)));
          });
          test('should have only \'clear\' predefined button', function(assert) {
            assert.throws(function() {
              return $('<div>').dxTextBox({buttons: ['fakeButtonName']});
            }, errors.Error('E1056', 'dxTextBox', 'fakeButtonName'));
          });
          test('predefined button should ignore \'location\' or \'options\' fields in predefined button configuration', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              value: 'text',
              showClearButton: true,
              buttons: [{
                name: 'clear',
                location: 'before'
              }]
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 0);
            assert.strictEqual($after.length, 1);
            assert.ok(isClearButton($after.eq(0)));
            assert.strictEqual($after.eq(0).text(), '');
          });
          test('custom button with location \'before\' should be rendered', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              value: 'text',
              buttons: [{
                name: 'custom',
                location: 'before',
                options: {text: 'custom'}
              }]
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 1);
            assert.strictEqual($after.length, 0);
          });
          test('custom button with location \'after\' should be rendered', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              value: 'text',
              buttons: [{
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }]
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($after.length, 1);
            assert.strictEqual($before.length, 0);
          });
          test('custom button should not change the widget height', function(assert) {
            var $textBox = $('<div>').appendTo('#qunit-fixture').dxTextBox({
              value: 'text',
              stylingMode: 'underlined'
            });
            var startHeight = $textBox.height();
            var textBox = $textBox.dxTextBox('instance');
            textBox.option('buttons', [{
              name: 'custom',
              location: 'after',
              options: {text: 'custom'}
            }]);
            assert.strictEqual($textBox.height(), startHeight);
          });
          test('custom button should be disabled in readOnly state by default', function(assert) {
            var textBox = $('<div>').appendTo('#qunit-fixture').dxTextBox({
              value: 'text',
              buttons: [{
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }],
              readOnly: true
            }).dxTextBox('instance');
            var button = textBox.getButton('custom');
            assert.ok(button.option('disabled'), 'button is disabled');
            textBox.option('readOnly', false);
            assert.notOk(button.option('disabled'), 'button is enabled');
          });
          test('custom button should not be disabled in readOnly state if it was specified by a user', function(assert) {
            var textBox = $('<div>').appendTo('#qunit-fixture').dxTextBox({
              value: 'text',
              buttons: [{
                name: 'custom',
                location: 'after',
                options: {
                  disabled: false,
                  text: 'custom'
                }
              }],
              readOnly: true
            }).dxTextBox('instance');
            var button = textBox.getButton('custom');
            assert.notOk(button.option('disabled'), 'button is enabled');
            button.option('disabled', true);
            textBox.option('readOnly', false);
            assert.ok(button.option('disabled'), 'button is disabled');
          });
        });
        module('numberBox', function() {
          test('widget should not render a clear button if \'buttons\' option have no string for it', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showClearButton: true,
              showSpinButtons: true,
              buttons: ['spins'],
              value: 1
            });
            var $after = getTextEditorButtons($numberBox).$after;
            assert.ok($after.length, 1);
            assert.ok(isSpinButton($after.eq(0)));
          });
          test('should render \'spins\' buttons only after they become visible', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({showClearButton: true});
            var numberBox = $numberBox.dxNumberBox('instance');
            var $__2 = getTextEditorButtons($numberBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 1);
            numberBox.option({
              text: 'Some text',
              showSpinButtons: true
            });
            var textEditorButtons = getTextEditorButtons($numberBox);
            $before = textEditorButtons.$before;
            $after = textEditorButtons.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.notOk(getButtonPlaceHolders($after).length);
          });
          test('should render predefined buttons (\'clear\', \'spins\')', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showClearButton: true,
              showSpinButtons: true,
              buttons: ['clear', 'spins']
            });
            var $__2 = getTextEditorButtons($numberBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 0);
          });
          test('should render predefined buttons (\'clear\', \'spins\') configurated as object', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showClearButton: true,
              showSpinButtons: true,
              buttons: [{name: 'clear'}, {name: 'spins'}]
            });
            var $__2 = getTextEditorButtons($numberBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 0);
          });
          test('should have only \'clear\', \'spins\' predefined buttons', function(assert) {
            assert.throws(function() {
              return $('<div>').dxNumberBox({buttons: ['fakeButtonName']});
            }, errors.Error('E1056', 'dxNumberBox', 'fakeButtonName'));
          });
          test('predefined buttons should ignore \'location\' or \'options\' fields in predefined button configuration', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              value: 1,
              showClearButton: true,
              showSpinButtons: true,
              buttons: [{
                name: 'clear',
                location: 'before'
              }, {
                name: 'spins',
                location: 'before',
                options: {text: 'spins'}
              }]
            });
            var $__2 = getTextEditorButtons($numberBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 0);
            assert.strictEqual($after.length, 2);
            assert.ok(isClearButton($after.eq(0)));
            assert.ok(isSpinButton($after.eq(1)));
            assert.strictEqual($after.eq(1).text(), '');
          });
        });
        module('dropDownEditors', function() {
          test('should render drop down button', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              buttons: ['dropDown'],
              items: ['1', '2'],
              value: '1'
            });
            var $after = getTextEditorButtons($selectBox).$after;
            assert.strictEqual($after.length, 1);
            assert.ok(isDropDownButton($after.eq(0)));
          });
          test('should render \'dropDown\' button only after it becomes visible', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              showDropDownButton: false
            });
            var selectBox = $selectBox.dxSelectBox('instance');
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 1);
            selectBox.option({
              text: 'Some text',
              showDropDownButton: true
            });
            var textEditorButtons = getTextEditorButtons($selectBox);
            $before = textEditorButtons.$before;
            $after = textEditorButtons.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.notOk(getButtonPlaceHolders($after).length);
          });
          test('should render predefined buttons (\'clear\', \'dropDown\')', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: ['clear', 'dropDown']
            });
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 0);
          });
          test('should render predefined buttons (\'clear\', \'dropDown\') configurated as object', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: [{name: 'clear'}, {name: 'dropDown'}]
            });
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.notOk($before.length);
            assert.strictEqual($after.length, 2);
            assert.strictEqual(getButtonPlaceHolders($after).length, 0);
          });
          test('should have only \'clear\', \'dropDown\' predefined button', function(assert) {
            assert.throws(function() {
              return $('<div>').dxSelectBox({buttons: ['fakeButtonName']});
            }, errors.Error('E1056', 'dxSelectBox', 'fakeButtonName'));
          });
          test('predefined buttons should ignore \'location\' or \'options\' fields in predefined button configuration', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              items: ['1', '2'],
              value: '1',
              showClearButton: true,
              buttons: [{
                name: 'clear',
                location: 'before'
              }, {
                name: 'dropDown',
                location: 'before',
                options: {text: 'dropDown'}
              }]
            });
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 0);
            assert.strictEqual($after.length, 2);
            assert.ok(isClearButton($after.eq(0)));
            assert.ok(isDropDownButton($after.eq(1)));
            assert.strictEqual($after.eq(1).text(), '');
          });
          test('buttons is rendered with fieldTemplate', function(assert) {
            var $selectBox = $('<div>').appendTo('#qunit-fixture').dxSelectBox({
              showClearButton: true,
              items: ['1', '2'],
              value: '1',
              buttons: [{
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }, 'clear', 'dropDown'],
              fieldTemplate: function(value) {
                var $textBox = $('<div>').dxTextBox();
                return $('<div>').addClass('custom-template').text(value).append($textBox);
              }
            });
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.eq(0).text(), 'before1');
            assert.strictEqual($selectBox.find('.custom-template').text(), '1');
            assert.ok(isClearButton($after.eq(1)));
            assert.ok(isDropDownButton($after.eq(2)));
          });
          test('buttons should not be rendered for the textBox in the dropDownBox fieldTemplate by default', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: [{
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }, 'clear', 'dropDown'],
              fieldTemplate: function(value) {
                var $textBox = $('<div>').attr('id', 'internal-textbox').dxTextBox({value: 'test'});
                return $('<div>').text(value).append($textBox);
              },
              value: 'test'
            });
            var $textBox = $selectBox.find('#internal-textbox');
            var $textBoxAfter = getTextEditorButtons($textBox).$after;
            assert.strictEqual($textBoxAfter.length, 1);
            assert.strictEqual(getButtonPlaceHolders($textBoxAfter).length, 1);
          });
          test('buttons can be rendered for the textBox in the dropDownBox fieldTemplate', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: [{
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }, 'clear', 'dropDown'],
              fieldTemplate: function(value) {
                var $textBox = $('<div>').attr('id', 'internal-textbox').dxTextBox({
                  value: 'test',
                  showClearButton: true,
                  buttons: ['clear']
                });
                return $('<div>').text(value).append($textBox);
              },
              value: 'test'
            });
            var $textBox = $selectBox.find('#internal-textbox');
            var $textBoxAfter = getTextEditorButtons($textBox).$after;
            assert.strictEqual($textBoxAfter.length, 1);
            assert.ok(isClearButton($textBoxAfter.eq(0)));
          });
        });
      });
      module('reordering', function() {
        module('textBox', function() {
          test('custom button with location \'after\' should be rendered after the clear button', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear', {
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }],
              value: 'text'
            });
            var $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 2);
            assert.ok(isClearButton($after.eq(0)));
            assert.strictEqual($after.eq(1).text(), 'custom');
          });
          test('the group of predefined and custom buttons should have correct order', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: [{
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }, {
                name: 'after1',
                location: 'after',
                options: {text: 'after1'}
              }, 'clear', {
                name: 'after2',
                location: 'after',
                options: {text: 'after2'}
              }],
              value: 'text'
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 1);
            assert.strictEqual($before.text(), 'before1');
            assert.strictEqual($after.length, 3);
            assert.strictEqual($after.eq(0).text(), 'after1');
            assert.ok(isClearButton($after.eq(1)));
            assert.strictEqual($after.eq(2).text(), 'after2');
          });
          test('buttons should have correct order if \'before\' custom button is after \'after\' buttons in the \'buttons\' array', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear', {
                name: 'after1',
                location: 'after',
                options: {text: 'after1'}
              }, {
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }],
              value: 'text'
            });
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 1);
            assert.strictEqual($before.text(), 'before1');
            assert.strictEqual($after.length, 2);
            assert.ok(isClearButton($after.eq(0)));
            assert.strictEqual($after.eq(1).text(), 'after1');
          });
        });
        module('numberBox', function() {
          test('buttons option can reorder predefined buttons', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showClearButton: true,
              showSpinButtons: true,
              buttons: ['spins', 'clear'],
              value: 1
            });
            var $after = getTextEditorButtons($numberBox).$after;
            assert.ok(isSpinButton($after.eq(0)));
            assert.ok(isClearButton($after.eq(1)));
          });
          test('widget should render custom and predefined buttons in the right order', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showClearButton: true,
              showSpinButtons: true,
              buttons: [{
                name: 'after1',
                location: 'after',
                options: {text: 'after1'}
              }, 'clear', {
                name: 'after2',
                location: 'after',
                options: {text: 'after2'}
              }, 'spins', {
                name: 'after3',
                location: 'after',
                options: {text: 'after3'}
              }, {
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }],
              value: 1
            });
            var $__2 = getTextEditorButtons($numberBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($after.eq(0).text(), 'after1');
            assert.ok(isClearButton($after.eq(1)));
            assert.strictEqual($after.eq(2).text(), 'after2');
            assert.ok(isSpinButton($after.eq(3)));
            assert.strictEqual($after.eq(4).text(), 'after3');
            assert.strictEqual($before.length, 1);
          });
        });
        module('dropDownEditors', function() {
          test('buttons option can reorder predefined buttons', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: ['dropDown', 'clear'],
              value: 1
            });
            var $after = getTextEditorButtons($selectBox).$after;
            assert.ok(isDropDownButton($after.eq(0)));
            assert.ok(isClearButton($after.eq(1)));
          });
          test('widget should render custom and predefined buttons in the right order', function(assert) {
            var $selectBox = $('<div>').dxSelectBox({
              showClearButton: true,
              buttons: [{
                name: 'after1',
                location: 'after',
                options: {text: 'after1'}
              }, 'clear', {
                name: 'after2',
                location: 'after',
                options: {text: 'after2'}
              }, 'dropDown', {
                name: 'after3',
                location: 'after',
                options: {text: 'after3'}
              }, {
                name: 'before1',
                location: 'before',
                options: {text: 'before1'}
              }],
              value: 1
            });
            var $__2 = getTextEditorButtons($selectBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($after.eq(0).text(), 'after1');
            assert.ok(isClearButton($after.eq(1)));
            assert.strictEqual($after.eq(2).text(), 'after2');
            assert.ok(isDropDownButton($after.eq(3)));
            assert.strictEqual($after.eq(4).text(), 'after3');
            assert.strictEqual($before.length, 1);
          });
        });
      });
      module('collection updating', function() {
        module('textBox', function() {
          test('it is able to change internal custom button option', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear', {
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }],
              value: 'text'
            });
            var textBox = $textBox.dxTextBox('instance');
            textBox.option('buttons[1].options.text', 'custom2');
            textBox.option('buttons[1].location', 'before');
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 1);
            assert.strictEqual($before.eq(0).text(), 'custom2');
            assert.strictEqual($after.length, 1);
            assert.ok(isClearButton($after.eq(0)));
          });
          test('it is able to reorder buttons', function(assert) {
            var customButtonConfig = {
              name: 'custom',
              location: 'after',
              options: {text: 'custom'}
            };
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear', customButtonConfig],
              value: 'text'
            });
            var textBox = $textBox.dxTextBox('instance');
            textBox.option('buttons', [customButtonConfig, 'clear']);
            var $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.eq(0).text(), 'custom');
            assert.ok(isClearButton($after.eq(1)));
          });
          test('it is able to change buttons', function(assert) {
            var customButtonConfig = {
              name: 'custom',
              location: 'after',
              options: {text: 'custom'}
            };
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear', customButtonConfig],
              value: 'text'
            });
            var textBox = $textBox.dxTextBox('instance');
            textBox.option('buttons', [{
              name: 'custom2',
              location: 'before',
              options: {text: 'custom2'}
            }, 'clear', customButtonConfig]);
            var $__2 = getTextEditorButtons($textBox),
                $before = $__2.$before,
                $after = $__2.$after;
            assert.strictEqual($before.length, 1);
            assert.strictEqual($after.length, 2);
            assert.strictEqual($before.eq(0).text(), 'custom2');
            assert.ok(isClearButton($after.eq(0)));
          });
          test('buttons and showClearButton options should control clear button visibility', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: true,
              buttons: ['clear'],
              value: 'text'
            });
            var textBox = $textBox.dxTextBox('instance');
            var $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 1);
            textBox.option('buttons', []);
            $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 0);
            textBox.option('buttons', ['clear']);
            $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 1);
            textBox.option('showClearButton', false);
            $after = getTextEditorButtons($textBox).$after;
            assert.strictEqual($after.length, 1);
            assert.ok($after.eq(0).is(':hidden'));
          });
          test('custom button should have \'text\' styling mode by default if editor has stylingMode = \'underlined\'', function(assert) {
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              stylingMode: 'underlined',
              value: 'text',
              buttons: ['clear', {
                name: 'custom',
                location: 'after',
                options: {text: 'custom'}
              }]
            });
            var textBox = $textBox.dxTextBox('instance');
            var customButton = textBox.getButton('custom');
            assert.strictEqual(customButton.option('stylingMode'), 'text');
            textBox.option('stylingMode', 'filled');
            customButton = textBox.getButton('custom');
            assert.notStrictEqual(customButton.option('stylingMode'), 'text');
          });
          test('custom button should have \'text\' styling mode if editor has stylingMode = \'underlined\' and buttons config was changed (T992034)', function(assert) {
            var buttonConfig = {
              name: 'custom',
              location: 'after',
              options: {text: 'custom'}
            };
            var $textBox = $('<div>').dxTextBox({
              showClearButton: false,
              stylingMode: 'underlined',
              value: 'text',
              buttons: [buttonConfig]
            });
            var textBox = $textBox.dxTextBox('instance');
            textBox.option('buttons', [buttonConfig]);
            var customButton = textBox.getButton('custom');
            assert.strictEqual(customButton.option('stylingMode'), 'text');
          });
        });
        module('numberBox', function() {
          test('number box should work with \'buttons\' option', function(assert) {
            var $numberBox = $('<div>').dxNumberBox({
              showSpinButtons: true,
              buttons: ['spins'],
              value: 1
            });
            var numberBox = $numberBox.dxNumberBox('instance');
            var $after = getTextEditorButtons($numberBox).$after;
            assert.strictEqual($after.length, 1);
            numberBox.option('buttons', []);
            $after = getTextEditorButtons($numberBox).$after;
            assert.strictEqual($after.length, 0);
            numberBox.option('buttons', ['spins']);
            $after = getTextEditorButtons($numberBox).$after;
            assert.strictEqual($after.length, 1);
            numberBox.option('showSpinButtons', false);
            $after = getTextEditorButtons($numberBox).$after;
            assert.strictEqual($after.length, 1);
            assert.ok($after.eq(0).children().eq(0).is(':hidden'));
            assert.ok($after.eq(0).children().eq(1).is(':hidden'));
          });
        });
        module('dropDownEditors', function() {
          test('Drop button template should work with \'buttons\' option', function(assert) {
            var buttonTemplate = function() {
              return '<div>Template</div>';
            };
            var $selectBox = $('<div>').dxSelectBox({items: ['1', '2']});
            var selectBox = $selectBox.dxSelectBox('instance');
            selectBox.option('buttons', ['dropDown']);
            selectBox.option('dropDownButtonTemplate', buttonTemplate);
            var $after = getTextEditorButtons($selectBox).$after;
            assert.strictEqual($after.length, 1);
            assert.strictEqual($after.eq(0).text(), 'Template');
            selectBox.option('buttons', []);
            $after = getTextEditorButtons($selectBox).$after;
            assert.strictEqual($after.length, 0, 'Button was not rendered');
            selectBox.option('buttons', ['dropDown']);
            $after = getTextEditorButtons($selectBox).$after;
            assert.strictEqual($after.eq(0).text(), 'Template');
            selectBox.option('dropDownButtonTemplate', null);
            $after = getTextEditorButtons($selectBox).$after;
            assert.ok(isDropDownButton($after.eq(0)));
          });
        });
      });
      module('events', function() {
        test('should use CUSTOM_BUTTON_HOVERED_CLASS to prevent predefined button hover styling while custom button is hovered', function(assert) {
          var $textBox = $('<div>').dxTextBox({
            value: 'text',
            buttons: [{
              name: 'custom',
              location: 'after',
              options: {text: 'custom'}
            }]
          });
          var textBox = $textBox.dxTextBox('instance');
          var $customButton = $(textBox.getButton('custom').$element());
          $textBox.trigger('dxhoverstart');
          assert.notOk($textBox.hasClass(CUSTOM_BUTTON_HOVERED_CLASS));
          $customButton.trigger('dxhoverstart');
          assert.ok($textBox.hasClass(CUSTOM_BUTTON_HOVERED_CLASS));
          $customButton.trigger('dxhoverend');
          assert.notOk($textBox.hasClass(CUSTOM_BUTTON_HOVERED_CLASS));
        });
        test('should not open dropDown editor after custom button click', function(assert) {
          var spy = sinon.spy();
          var selectBox = $('<div>').dxSelectBox({
            items: ['1', '2'],
            buttons: [{
              name: 'custom',
              location: 'after',
              options: {
                text: 'custom',
                onClick: spy
              }
            }, 'dropDown'],
            opened: false
          }).dxSelectBox('instance');
          var $customButton = $(selectBox.getButton('custom').$element());
          $customButton.trigger('dxclick');
          assert.notOk(selectBox.option('opened'));
          assert.strictEqual(spy.callCount, 1);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/text_box","ui/select_box","ui/number_box","ui/widget/ui.errors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/text_box"), require("ui/select_box"), require("ui/number_box"), require("ui/widget/ui.errors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=actionButtons.test.js.map