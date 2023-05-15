!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/toolbarIntegration.tests.js"], ["jquery","ui/html_editor","animation/fx","./utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/toolbarIntegration.tests.js", ["jquery", "ui/html_editor", "animation/fx", "./utils.js"], function($__export) {
  "use strict";
  var $,
      fx,
      checkLink,
      prepareEmbedValue,
      prepareTableValue,
      TOOLBAR_CLASS,
      TOOLBAR_WRAPPER_CLASS,
      TOOLBAR_FORMAT_WIDGET_CLASS,
      TOOLBAR_MULTILINE_CLASS,
      TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS,
      DROPDOWNMENU_CLASS,
      DROPDOWNEDITOR_ICON_CLASS,
      BUTTON_CONTENT_CLASS,
      QUILL_CONTAINER_CLASS,
      STATE_DISABLED_CLASS,
      HEX_FIELD_CLASS,
      INPUT_CLASS,
      DIALOG_CLASS,
      DIALOG_FORM_CLASS,
      BUTTON_CLASS,
      LIST_ITEM_CLASS,
      BLACK_PIXEL,
      test,
      testModule;
  function getToolbar($container) {
    return $container.find(("." + TOOLBAR_CLASS));
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      checkLink = $__m.checkLink;
      prepareEmbedValue = $__m.prepareEmbedValue;
      prepareTableValue = $__m.prepareTableValue;
    }],
    execute: function() {
      var $__3;
      TOOLBAR_CLASS = 'dx-htmleditor-toolbar';
      TOOLBAR_WRAPPER_CLASS = 'dx-htmleditor-toolbar-wrapper';
      TOOLBAR_FORMAT_WIDGET_CLASS = 'dx-htmleditor-toolbar-format';
      TOOLBAR_MULTILINE_CLASS = 'dx-toolbar-multiline';
      TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS = 'dx-format-active';
      DROPDOWNMENU_CLASS = 'dx-dropdownmenu-button';
      DROPDOWNEDITOR_ICON_CLASS = 'dx-dropdowneditor-icon';
      BUTTON_CONTENT_CLASS = 'dx-button-content';
      QUILL_CONTAINER_CLASS = 'dx-quill-container';
      STATE_DISABLED_CLASS = 'dx-state-disabled';
      HEX_FIELD_CLASS = 'dx-colorview-label-hex';
      INPUT_CLASS = 'dx-texteditor-input';
      DIALOG_CLASS = 'dx-formdialog';
      DIALOG_FORM_CLASS = 'dx-formdialog-form';
      BUTTON_CLASS = 'dx-button';
      LIST_ITEM_CLASS = 'dx-list-item';
      BLACK_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWNgYmL6DwABFgEGpP/tHAAAAABJRU5ErkJggg==';
      (($__3 = QUnit, test = $__3.test, testModule = $__3.module, $__3));
      $__export('default', function() {
        testModule('Toolbar integration', {
          beforeEach: function() {
            this.clock = sinon.useFakeTimers();
            fx.off = true;
          },
          afterEach: function() {
            this.clock.restore();
            fx.off = false;
          }
        }, function() {
          test('Apply simple format without focus', function(assert) {
            var focusInStub = sinon.stub();
            var focusOutStub = sinon.stub();
            $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['bold']},
              onFocusIn: focusInStub,
              onFocusOut: focusOutStub
            });
            try {
              $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            } catch (e) {
              assert.ok(false, 'error on formatting');
            }
            assert.strictEqual(focusInStub.callCount, 1, 'editor focused');
            assert.strictEqual(focusOutStub.callCount, 0, 'editor isn\'t blurred');
          });
          test('there is no extra focusout when applying toolbar formatting to the selected range', function(assert) {
            var done = assert.async();
            var focusInStub = sinon.stub();
            var focusOutStub = sinon.stub();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['bold']},
              onValueChanged: function(e) {
                assert.strictEqual(focusInStub.callCount, 1, 'editor focused');
                assert.strictEqual(focusOutStub.callCount, 0, 'editor isn\'t blurred');
                done();
              },
              onFocusIn: focusInStub,
              onFocusOut: focusOutStub
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
          });
          test('Apply simple format with selection', function(assert) {
            var done = assert.async();
            var expected = '<p><strong>te</strong>st</p>';
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['bold']},
              onValueChanged: function(e) {
                assert.equal(e.value, expected, 'markup contains a formatted text');
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
          });
          test('Apply format via color dialog located in the adaptive menu', function(assert) {
            var done = assert.async();
            var toolbarClickStub = sinon.stub();
            var expected = '<p><span style="color: rgb(250, 250, 250);">te</span>st</p>';
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {
                items: [{
                  name: 'color',
                  locateInMenu: 'always'
                }],
                multiline: false
              },
              onValueChanged: function(e) {
                assert.equal(e.value, expected, 'color has been applied');
                assert.equal(toolbarClickStub.callCount, 2, 'Clicks on toolbar buttons should bubbling to the toolbar container');
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $(("." + TOOLBAR_WRAPPER_CLASS)).on('dxclick', toolbarClickStub);
            $('#htmlEditor').find('.dx-dropdownmenu-button').trigger('dxclick');
            $(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            $(("." + HEX_FIELD_CLASS + " ." + INPUT_CLASS)).val('fafafa').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('adaptive menu should be hidden after selecting formatting', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {
                items: [{
                  name: 'header',
                  acceptedValues: [false, 1, 2, 3, 4, 5],
                  options: {opened: true},
                  locateInMenu: 'always'
                }],
                multiline: false
              },
              onValueChanged: function(e) {
                assert.ok($(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).is(':hidden'));
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $('#htmlEditor').find(("." + DROPDOWNMENU_CLASS)).trigger('dxclick');
            $(("." + LIST_ITEM_CLASS)).last().trigger('dxclick');
          });
          test('Add a link via dialog', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['link']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: 'http://test.test',
                  content: 'te'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            var linkText = $inputs.last().val();
            assert.strictEqual(linkText, 'te', 'Link test equal to the selected content');
            $inputs.first().val('http://test.test').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('Overflow menu button should have a correct content', function(assert) {
            $('#htmlEditor').html('<p>test</p>').dxHtmlEditor({toolbar: {
                multiline: false,
                items: ['bold', {
                  text: 'test',
                  showInMenu: 'always'
                }]
              }});
            var buttonContent = $('#htmlEditor').find(("." + DROPDOWNMENU_CLASS + " ." + BUTTON_CONTENT_CLASS)).html();
            var expectedContent = '<i class="dx-icon dx-icon-overflow"></i>';
            assert.equal(buttonContent, expectedContent);
          });
          test('Editor disposing should dispose external toolbar', function(assert) {
            var $toolbarContainer = $('<div>').addClass('external-container');
            $('#qunit-fixture').append($toolbarContainer);
            var editor = $('#htmlEditor').dxHtmlEditor({toolbar: {
                container: $toolbarContainer,
                items: ['bold']
              }}).dxHtmlEditor('instance');
            assert.ok($toolbarContainer.hasClass(TOOLBAR_WRAPPER_CLASS), 'Container has wrapper class');
            assert.equal($toolbarContainer.find(("." + TOOLBAR_CLASS)).length, 1, 'Toolbar container contains the htmlEditor\'s toolbar');
            editor.dispose();
            assert.equal($toolbarContainer.html(), '', 'Container\'s inner html is empty');
            assert.notOk($toolbarContainer.hasClass(TOOLBAR_WRAPPER_CLASS), 'Container hasn\'t wrapper class');
          });
          test('Editor should consider toolbar height', (function(assert) {
            var height = 100;
            var $container = $('#htmlEditor');
            var markup = '';
            for (var i = 1; i < 50; i++) {
              markup += ("<p>test " + i + "</p>");
            }
            $container.html(markup).dxHtmlEditor({
              height: height,
              toolbar: {items: ['bold']}
            });
            var quillContainerHeight = $container.find(("." + QUILL_CONTAINER_CLASS)).outerHeight();
            var toolbarHeight = $container.find(("." + TOOLBAR_WRAPPER_CLASS)).outerHeight();
            var bordersWidth = parseInt($container.css('border-top-width')) + parseInt($container.css('border-bottom-width'));
            assert.roughEqual(quillContainerHeight + toolbarHeight + bordersWidth, height, 1, 'Toolbar + editor equals to the predefined height');
          }));
          test('Toolbar correctly disposed after repaint', function(assert) {
            var $toolbarContainer = $('<div>').addClass('external-container');
            $('#qunit-fixture').append($toolbarContainer);
            var editor = $('#htmlEditor').dxHtmlEditor({toolbar: {
                container: $toolbarContainer,
                items: ['bold']
              }}).dxHtmlEditor('instance');
            editor.repaint();
            assert.ok($toolbarContainer.hasClass(TOOLBAR_WRAPPER_CLASS), 'Container has wrapper class');
            assert.equal($toolbarContainer.find(("." + TOOLBAR_CLASS)).length, 1, 'Toolbar container contains the htmlEditor\'s toolbar');
          });
          test('Toolbar should be disabled once editor is read only', function(assert) {
            $('#htmlEditor').dxHtmlEditor({
              readOnly: true,
              toolbar: {items: ['bold']}
            });
            var isToolbarDisabled = $(("." + TOOLBAR_CLASS)).hasClass(STATE_DISABLED_CLASS);
            assert.ok(isToolbarDisabled);
          });
          test('Toolbar should be disabled once editor is disabled', function(assert) {
            $('#htmlEditor').dxHtmlEditor({
              disabled: true,
              toolbar: {items: ['bold']}
            });
            var isToolbarDisabled = $(("." + TOOLBAR_CLASS)).hasClass(STATE_DISABLED_CLASS);
            assert.ok(isToolbarDisabled);
          });
          test('Toolbar should correctly update disabled state on the option changed', function(assert) {
            var editor = $('#htmlEditor').dxHtmlEditor({
              disabled: true,
              readOnly: true,
              toolbar: {items: ['bold']}
            }).dxHtmlEditor('instance');
            var $toolbar = $(("." + TOOLBAR_CLASS));
            editor.option('disabled', false);
            assert.ok($toolbar.hasClass(STATE_DISABLED_CLASS));
            editor.option('readOnly', false);
            assert.notOk($toolbar.hasClass(STATE_DISABLED_CLASS));
            editor.option('disabled', true);
            assert.ok($toolbar.hasClass(STATE_DISABLED_CLASS));
          });
          test('SelectBox should keep selected value after format applying', function(assert) {
            $('#htmlEditor').dxHtmlEditor({toolbar: {items: [{
                  name: 'size',
                  acceptedValues: ['10px', '11px']
                }]}});
            var $formatWidget = $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS));
            $formatWidget.find(("." + DROPDOWNEDITOR_ICON_CLASS)).trigger('dxclick');
            $(("." + LIST_ITEM_CLASS)).last().trigger('dxclick');
            var value = $formatWidget.find(("." + INPUT_CLASS)).val();
            assert.strictEqual(value, '11px', 'SelectBox contain selected value');
          });
          test('link should be correctly set to an image', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var link = 'http://test.test';
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: ("<img src=" + BLACK_PIXEL + ">"),
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: link,
                  content: ("<img src=\"" + BLACK_PIXEL + "\">")
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(0, 1);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $urlInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).first();
            var $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            $urlInput.val(link).change();
            $okDialogButton.trigger('dxclick');
          });
          test('link should be correctly added for a third', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var $urlInput;
            var $okDialogButton;
            var prepareLink = function() {
              instance.focus();
              instance.setSelection(0, 4);
              var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
              $linkFormatButton.trigger('dxclick');
              $urlInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).first();
              $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            };
            var valueChangeSpy = sinon.spy(function($__4) {
              var value = $__4.value;
              if (valueChangeSpy.calledOnce) {
                setTimeout(function() {
                  prepareLink();
                  $urlInput.val('http://test2.test').change();
                  $okDialogButton.trigger('dxclick');
                });
              } else if (valueChangeSpy.calledTwice) {
                setTimeout(function() {
                  prepareLink();
                  $urlInput.val('http://test3.test').change();
                  $okDialogButton.trigger('dxclick');
                });
              } else {
                checkLink(assert, {
                  href: 'http://test3.test',
                  content: 'test'
                }, value);
                done();
              }
            });
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: '<p>test</p>',
              onValueChanged: valueChangeSpy
            }).dxHtmlEditor('instance');
            prepareLink();
            $urlInput.val('http://test1.test').change();
            $okDialogButton.trigger('dxclick');
            this.clock.tick(10);
            this.clock.tick(10);
          });
          test('Add a link with empty text', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['link']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: 'http://test.test',
                  content: 'http://test.test',
                  afterLink: 'test'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 0);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            $inputs.first().val('http://test.test').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('Add a link and text without selection', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['link']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: 'http://test.test',
                  content: '123',
                  afterLink: 'test'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 0);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            $inputs.first().val('http://test.test').change();
            $inputs.last().val('123').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('Add a link with empty text and selected range', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['link']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: 'http://test.test',
                  content: 'http://test.test',
                  afterLink: 'st'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(0, 2);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            $inputs.first().val('http://test.test').change();
            $inputs.last().val('').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('format image and text', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var link = 'http://test.test';
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: ("<img src=" + BLACK_PIXEL + ">12"),
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: link,
                  content: ("<img src=\"" + BLACK_PIXEL + "\">12")
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(0, 3);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $urlInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).first();
            var $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            $urlInput.val(link).change();
            $okDialogButton.trigger('dxclick');
          });
          test('replace the text of the existed link', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var link = 'http://test.test';
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: ("<a href=\"" + link + "\" target=\"_blank\">test</a>"),
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: link,
                  content: '123'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(0, 4);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $textInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).last();
            var $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            $textInput.val('123').change();
            $okDialogButton.trigger('dxclick');
          });
          test('href in markup should be empty when empty href is passed in value (T1134100)', function(assert) {
            var $container = $('#htmlEditor').dxHtmlEditor({value: '<a href="">test</a>'});
            var linkHref = $container.find('a').attr('href');
            assert.strictEqual(linkHref, '');
          });
          test('href should be empty on empty URL input submit (T1134100)', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: '<p>test</p>',
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: '',
                  content: '123'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(0, 4);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $textInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).last();
            var $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            $textInput.val('123').change();
            $okDialogButton.trigger('dxclick');
          });
          test('Update link dialog should display link text when link href is empty (T1134100)', function(assert) {
            var $container = $('#htmlEditor');
            var linkText = 'test';
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: ("<a href=\"\">" + linkText + "</a>")
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(2, 0);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $textInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).last();
            assert.strictEqual(linkText, $textInput.val());
          });
          test('Add link dialog should contains info about link when cursor is placed on right border of link(T1157840)', function(assert) {
            var linkText = 'text';
            var linkAddress = 'http://devexpress.com';
            var $htmlEditor = $('#htmlEditor');
            var htmlEditor = $htmlEditor.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: ("<a href=\"" + linkAddress + "\">" + linkText + "</a>")
            }).dxHtmlEditor('instance');
            htmlEditor.setSelection(linkText.length, 0);
            var $linkFormatButton = $htmlEditor.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $formInputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            var $linkAddressInput = $formInputs.first();
            var $textInput = $formInputs.last();
            assert.strictEqual(linkAddress, $linkAddressInput.val());
            assert.strictEqual(linkText, $textInput.val());
          });
          test('Text input should be visible in dialog if selected text has whitespaces on sides (T1134089)', function(assert) {
            var $container = $('#htmlEditor');
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: '<p>text with whitespaces</p>'
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(4, 6);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $textInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).last();
            assert.strictEqual($textInput.val(), ' with ');
          });
          test('Selected text with whitespaces on sides should be replaced by link', function(assert) {
            var done = assert.async();
            var link = 'http://test.com';
            var $container = $('#htmlEditor');
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['link']},
              value: '<p>text with whitespaces</p>',
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: link,
                  content: ' with '
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            instance.setSelection(4, 6);
            var $linkFormatButton = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0);
            $linkFormatButton.trigger('dxclick');
            var $urlInput = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS)).first();
            var $okDialogButton = $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first();
            $urlInput.val(link).change();
            $okDialogButton.trigger('dxclick');
          });
          test('Update whole link by dialog (zero-length selection)', function(assert) {
            var done = assert.async();
            var initialUrl = 'http://test.test';
            var initialUrlText = 'test';
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: ("<a href=\"" + initialUrl + "\">" + initialUrlText + "</a>']"),
              toolbar: {items: ['link']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                checkLink(assert, {
                  href: initialUrl + 'a',
                  content: initialUrlText + 't'
                }, value);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(2, 0);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            var url = $inputs.first().val();
            var urlText = $inputs.last().val();
            $inputs.first().val(initialUrl + 'a').change();
            $inputs.last().val(initialUrlText + 't').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
            assert.strictEqual(url, initialUrl);
            assert.strictEqual(urlText, initialUrlText);
          });
          [{
            format: 'bold',
            which: 66
          }, {
            format: 'italic',
            which: 73
          }, {
            format: 'underline',
            which: 85
          }].forEach(function($__4) {
            var $__5 = $__4,
                format = $__5.format,
                which = $__5.which;
            test(("hotkey handler can set active state for " + format + " button (T1027453)"), function(assert) {
              var $container = $('#htmlEditor').html('<p>test</p>');
              var instance = $container.dxHtmlEditor({
                toolbar: {items: ['bold', 'italic', 'underline']},
                height: 100,
                width: 300,
                value: '<p>test</p>'
              }).dxHtmlEditor('instance');
              var quill = instance.getQuillInstance();
              var formatHandler = quill.keyboard.bindings[which][1].handler;
              instance.setSelection(4, 0);
              instance.formatText(3, 1, {
                bold: true,
                italic: true,
                underline: true
              });
              $container.find(("." + TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS)).removeClass(TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS);
              formatHandler.call(quill.keyboard, null, null, {which: which});
              var $activeFormats = $container.find(("." + TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS));
              assert.strictEqual($activeFormats.length, 1, 'one format button state is changed');
              assert.ok($activeFormats.eq(0).hasClass(("dx-" + format + "-format")), 'correct toolbar item is active');
            });
            test(("hotkey handler can set inactive state for " + format + " button (T1027453)"), function(assert) {
              var $container = $('#htmlEditor').html('<p>test</p>');
              var instance = $container.dxHtmlEditor({
                toolbar: {items: ['bold', 'italic', 'underline']},
                height: 100,
                width: 300,
                value: '<p>test</p>'
              }).dxHtmlEditor('instance');
              var quill = instance.getQuillInstance();
              var formatHandler = quill.keyboard.bindings[which][1].handler;
              instance.setSelection(4, 0);
              $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).addClass(TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS);
              formatHandler.call(quill.keyboard, null, null, {which: which});
              var $activeFormats = $container.find(("." + TOOLBAR_FORMAT_BUTTON_ACTIVE_CLASS));
              assert.strictEqual($activeFormats.length, 2, 'other toolbar items are not changed');
              assert.notOk($activeFormats.eq(0).hasClass(("dx-" + format + "-format")), 'toolbar item state is changed');
            });
          });
          test('history buttons are inactive after processing transcluded content', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor').html('<p>test</p>');
            $container.dxHtmlEditor({
              toolbar: {items: ['undo', 'redo']},
              onContentReady: function() {
                var $toolbarButtons = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS));
                assert.ok($toolbarButtons.eq(0).hasClass(STATE_DISABLED_CLASS), 'Undo button is disabled');
                assert.ok($toolbarButtons.eq(1).hasClass(STATE_DISABLED_CLASS), 'Redo button is disabled');
                done();
              }
            }).dxHtmlEditor('instance');
            this.clock.tick(10);
          });
          test('history buttons are inactive when editor has initial value', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            $container.dxHtmlEditor({
              toolbar: {items: ['undo', 'redo']},
              value: '<p>test</p>',
              onContentReady: function() {
                var $toolbarButtons = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS));
                assert.ok($toolbarButtons.eq(0).hasClass(STATE_DISABLED_CLASS), 'Undo button is disabled');
                assert.ok($toolbarButtons.eq(1).hasClass(STATE_DISABLED_CLASS), 'Redo button is disabled');
                done();
              }
            }).dxHtmlEditor('instance');
          });
          test('history buttons are inactive when editor hasn\'t initial value', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            $container.dxHtmlEditor({
              toolbar: {items: ['undo', 'redo']},
              onContentReady: function() {
                var $toolbarButtons = $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS));
                assert.ok($toolbarButtons.eq(0).hasClass(STATE_DISABLED_CLASS), 'Undo button is disabled');
                assert.ok($toolbarButtons.eq(1).hasClass(STATE_DISABLED_CLASS), 'Redo button is disabled');
                done();
              }
            }).dxHtmlEditor('instance');
          });
          test('Toolbar should correctly update its dimensions after changing the width of the HtmlEditor', function(assert) {
            var $container = $('#htmlEditor');
            var instance = $container.dxHtmlEditor({
              width: 1000,
              toolbar: {items: ['undo', 'redo', 'bold', 'italic', 'strike', 'underline', 'separator', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator', 'orderedList', 'bulletList', 'separator', 'color', 'background', 'separator', 'link', 'image', 'separator', 'clear', 'codeBlock', 'blockquote']}
            }).dxHtmlEditor('instance');
            this.clock.tick(10);
            instance.option('width', 100);
            this.clock.tick(10);
            var toolbarWidth = $container.find(("." + TOOLBAR_CLASS)).width();
            var beforeContainerWidth = $container.find('.dx-toolbar-before').width();
            assert.ok(beforeContainerWidth <= toolbarWidth, 'toolbar items fits the widget container');
          });
          test('Multiline toolbar rendered by default', function(assert) {
            var $container = $('#htmlEditor');
            $container.dxHtmlEditor({toolbar: {items: ['bold']}});
            assert.ok(getToolbar($container).hasClass(TOOLBAR_MULTILINE_CLASS));
          });
          [true, false].forEach(function(multiline) {
            test(("Multiline mode change to " + multiline + " is performed correctly at runtime"), function(assert) {
              var $container = $('#htmlEditor');
              var editor = $container.dxHtmlEditor({toolbar: {
                  items: ['bold'],
                  multiline: multiline
                }}).dxHtmlEditor('instance');
              assert.strictEqual(getToolbar($container).hasClass(TOOLBAR_MULTILINE_CLASS), multiline, ("Toolbar in " + (multiline ? 'multiline' : 'adaptive') + " mode"));
              editor.option('toolbar.multiline', !multiline);
              assert.strictEqual(getToolbar($container).hasClass(TOOLBAR_MULTILINE_CLASS), !multiline, ("Toolbar in " + (!multiline ? 'multiline' : 'adaptive') + " mode"));
            });
          });
          test('Add a table via dialog', function(assert) {
            var done = assert.async();
            var expectedValue = '<table><tbody><tr><td><p>t</p></td></tr><tr><td><p><br></p></td></tr></tbody></table><p>est</p>';
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '<p>test</p>',
              toolbar: {items: ['insertTable']},
              onValueChanged: function($__4) {
                var value = $__4.value;
                assert.strictEqual(prepareTableValue(value), expectedValue);
                done();
              }
            }).dxHtmlEditor('instance');
            instance.setSelection(1, 0);
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $inputs = $(("." + DIALOG_FORM_CLASS + " ." + INPUT_CLASS));
            $inputs.first().val('2').change();
            $(("." + DIALOG_CLASS + " ." + BUTTON_CLASS)).first().trigger('dxclick');
          });
          test('Add a variable via toolbar', function(assert) {
            fx.off = false;
            var done = assert.async();
            var expectedValue = '<p><span class="dx-variable" data-var-start-esc-char="%" data-var-end-esc-char="%" data-var-value="test"><span contenteditable="false">%test%</span></span></p>';
            $('#htmlEditor').dxHtmlEditor({
              toolbar: {items: ['variable']},
              variables: {
                dataSource: ['test'],
                escapeChar: '%'
              },
              onValueChanged: function($__4) {
                var value = $__4.value;
                assert.strictEqual(prepareEmbedValue(value), expectedValue);
                done();
              }
            });
            $('#htmlEditor').find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            $('.dx-suggestion-list .dx-list-item').trigger('dxclick');
            this.clock.tick(10);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","animation/fx","./utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("animation/fx"), require("./utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbarIntegration.tests.js.map