!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/imageUploadIntegration.tests.js"], ["jquery","../../../helpers/keyboardMock.js","../../../helpers/xmlHttpRequestMock.js","core/devices","animation/fx","ui/html_editor"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/imageUploadIntegration.tests.js", ["jquery", "../../../helpers/keyboardMock.js", "../../../helpers/xmlHttpRequestMock.js", "core/devices", "animation/fx", "ui/html_editor"], function($__export) {
  "use strict";
  var $,
      keyboardMock,
      devices,
      fx,
      FIELD_ITEM_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      TOOLBAR_FORMAT_WIDGET_CLASS,
      ADD_IMAGE_DIALOG_CLASS,
      ADD_IMAGE_DIALOG_WITH_TABS_CLASS,
      FILE_UPLOADER_CLASS,
      CHECKBOX_CLASS,
      TEXTBOX_CLASS,
      FORM_CLASS,
      POPUP_TITLE_CLASS,
      FILEUPLOADER_INPUT_CLASS,
      DIALOG_OK_BUTTON_SELECTOR,
      ASPECT_RATIO_BUTTON_SELECTOR,
      OVERLAY_CONTENT_CLASS,
      WHITE_PIXEL,
      BLACK_PIXEL,
      ORANGE_PIXEL,
      TIME_TO_WAIT,
      test,
      module,
      markup,
      fakeFile,
      fakeFile2,
      fakeFileText,
      createFakeFile,
      serverUploadMarkup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__5;
      FIELD_ITEM_CLASS = 'dx-field-item';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      TOOLBAR_FORMAT_WIDGET_CLASS = 'dx-htmleditor-toolbar-format';
      ADD_IMAGE_DIALOG_CLASS = 'dx-htmleditor-add-image-popup';
      ADD_IMAGE_DIALOG_WITH_TABS_CLASS = 'dx-htmleditor-add-image-popup-with-tabs';
      FILE_UPLOADER_CLASS = 'dx-fileuploader';
      CHECKBOX_CLASS = 'dx-checkbox';
      TEXTBOX_CLASS = 'dx-textbox';
      FORM_CLASS = 'dx-form';
      POPUP_TITLE_CLASS = 'dx-popup-title';
      FILEUPLOADER_INPUT_CLASS = 'dx-fileuploader-input';
      DIALOG_OK_BUTTON_SELECTOR = '.dx-formdialog .dx-toolbar .dx-button';
      ASPECT_RATIO_BUTTON_SELECTOR = '.dx-buttongroup .dx-button';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      WHITE_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWP4////fwAJ+wP93BEhJAAAAABJRU5ErkJggg==';
      BLACK_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWNgYmL6DwABFgEGpP/tHAAAAABJRU5ErkJggg==';
      ORANGE_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWP4z8j4HwAFBQIB6OfkUgAAAABJRU5ErkJggg==';
      TIME_TO_WAIT = 200;
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      markup = '\
    <p>test text</p>\
    <br>';
      fakeFile = {
        name: 'fakefile1.jpeg',
        size: 1063,
        type: 'image/jpeg',
        lastModifiedDate: Date.now()
      };
      fakeFile2 = {
        name: 'fakefile2.jpeg',
        size: 963,
        type: 'image/jpeg',
        lastModifiedDate: Date.now()
      };
      fakeFileText = {
        name: 'fakefile1.txt',
        size: 1063,
        type: 'text/plain',
        lastModifiedDate: Date.now()
      };
      createFakeFile = function(name, size, type) {
        return new File(new Array(size).fill('a'), name, {
          type: type || 'image/png',
          lastModified: Date.now()
        });
      };
      serverUploadMarkup = '<p>test text</p><p><br></p><p><img src="/uploadDirectory/fakefile1.jpeg"></p>';
      module('Image uploading integration', {
        beforeEach: function() {
          var $__4 = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.options = {
            toolbar: {items: ['image']},
            imageUpload: {
              fileUploadMode: 'both',
              tabs: ['file', 'url'],
              uploadUrl: '/',
              uploadDirectory: '/uploadDirectory/'
            },
            value: markup
          };
          this.createWidget = function(options) {
            var newOptions = $.extend({}, $__4.options, options);
            $__4.instance = $__4.$element.dxHtmlEditor(newOptions).dxHtmlEditor('instance');
            $__4.quillInstance = $__4.instance.getQuillInstance();
          };
          this.getFormElement = function() {
            var selectionArgs = arguments[0] !== (void 0) ? arguments[0] : [0, 1];
            $__4.instance.focus();
            $__4.instance.setSelection.apply($__4.instance, selectionArgs);
            $__4.$element.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            $__4.clock.tick(TIME_TO_WAIT);
            return $(("." + FORM_CLASS));
          };
          this.getSizeEditors = function($form) {
            var widthEditor = $form.find(("." + TEXTBOX_CLASS)).eq(1).dxTextBox('instance');
            var heightEditor = $form.find(("." + TEXTBOX_CLASS)).eq(2).dxTextBox('instance');
            return {
              widthEditor: widthEditor,
              heightEditor: heightEditor
            };
          };
          this.getBase64EditorElement = function($form) {
            return $form.find(("." + CHECKBOX_CLASS));
          };
          this.clickAspectRatioButton = function($form) {
            var $aspectRatioButton = $form.find(ASPECT_RATIO_BUTTON_SELECTOR);
            $aspectRatioButton.trigger('dxclick');
          };
          this.clickDialogOkButton = function() {
            $(DIALOG_OK_BUTTON_SELECTOR).first().trigger('dxclick');
          };
          this.clickCancelDialogButton = function() {
            $(DIALOG_OK_BUTTON_SELECTOR).eq(1).trigger('dxclick');
          };
          this.checkBothTabsConfigs = function(assert, $__6) {
            var $__7 = $__6,
                formItems = $__7.formItems,
                formInstance = $__7.formInstance,
                fileUploader = $__7.fileUploader;
            var $okButton = $(DIALOG_OK_BUTTON_SELECTOR).first();
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 1, 'has add image dialog class');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 1, 'has add image dialog with tabs class');
            assert.strictEqual(formItems[0].itemType, 'tabbed', 'has tabbed items');
            assert.strictEqual(formItems[0].tabs[0].items.length, 2, 'has items for the first tab');
            assert.strictEqual(formItems[0].tabs[1].items.length, 4, 'has items for the second tab');
            assert.strictEqual(fileUploader.length, 1, 'file uploader is exists on the form');
            assert.strictEqual(formInstance.option('colCount'), 1, 'has correct form colCount');
            assert.strictEqual(formInstance.option('width'), devices.current().deviceType === 'phone' ? '100%' : 493, 'has correct form width');
            assert.strictEqual($(("." + POPUP_TITLE_CLASS)).text(), 'Add Image', 'dialog title is modified');
            assert.strictEqual($okButton.text(), 'Add', 'dialog add button text is modified');
            assert.ok($okButton.is(':visible'), 'dialog add button is visible');
          };
          this.checkFileTabConfigs = function(assert, $__6) {
            var $__7 = $__6,
                formItems = $__7.formItems,
                formInstance = $__7.formInstance;
            var $okButton = $(DIALOG_OK_BUTTON_SELECTOR).first();
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 1, 'has add image dialog class');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 0, 'has no add image dialog with tabs class');
            assert.strictEqual(formItems.length, 2, 'has correct form items count');
            assert.strictEqual(formInstance.option('colCount'), 11, 'has correct form callCount');
            assert.strictEqual(formInstance.option('width'), devices.current().deviceType === 'phone' ? '100%' : 493, 'has correct form width');
            assert.strictEqual(formItems[0].items || formItems[0].tabs, undefined, 'has no embeded items');
            assert.strictEqual($(("." + POPUP_TITLE_CLASS)).text(), 'Add Image', 'dialog title is modified');
            assert.strictEqual($okButton.text(), 'Add', 'dialog add button text is modified');
            assert.notOk($okButton.is(':visible'), 'dialog add button is hidden');
          };
          this.checkUrlTabConfigs = function(assert, $__6) {
            var $__8;
            var $__7 = $__6,
                formItems = $__7.formItems,
                formInstance = $__7.formInstance,
                isUpdating = ($__8 = $__7.isUpdating) === void 0 ? false : $__8;
            var $okButton = $(DIALOG_OK_BUTTON_SELECTOR).first();
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 1, 'has add image dialog class');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 0, 'has no add image dialog with tabs class');
            assert.strictEqual(formItems.length, 4, 'has correct form items count');
            assert.strictEqual(formInstance.option('colCount'), 11, 'has correct form callCount');
            assert.strictEqual(formItems[0].items || formItems[0].tabs, undefined, 'has no embeded items');
            assert.strictEqual($(("." + POPUP_TITLE_CLASS)).text(), isUpdating ? 'Update Image' : 'Add Image', 'dialog title is modified');
            assert.strictEqual($okButton.text(), isUpdating ? 'Update' : 'Add', 'dialog add button text is modified');
            assert.ok($okButton.is(':visible'), 'dialog add button is visible');
          };
        },
        afterEach: function() {
          fx.off = false;
          this.instance && this.instance.dispose();
          this.clock.restore();
        }
      }, function() {
        module('resizing frames initialization', {}, function() {
          ['both', 'base64', 'server'].forEach(function(fileUploadMode) {
            test(("the form popup is correctly rendered for two tabs and fileUploadMode=\"" + fileUploadMode + "\""), function(assert) {
              this.createWidget({imageUpload: {
                  tabs: ['file', 'url'],
                  fileUploadMode: fileUploadMode
                }});
              this.clock.tick(TIME_TO_WAIT);
              var $form = this.getFormElement();
              var formInstance = $form.dxForm('instance');
              var formItems = formInstance.option('items');
              var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS));
              this.checkBothTabsConfigs(assert, {
                formItems: formItems,
                formInstance: formInstance,
                fileUploader: fileUploader
              });
            });
          });
          test('the form popup is correctly rendered for two tabs with object configs', function(assert) {
            this.createWidget({imageUpload: {tabs: [{name: 'file'}, {name: 'url'}]}});
            this.clock.tick(TIME_TO_WAIT);
            var $form = this.getFormElement();
            var formInstance = $form.dxForm('instance');
            var formItems = formInstance.option('items');
            var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS));
            this.checkBothTabsConfigs(assert, {
              formItems: formItems,
              formInstance: formInstance,
              fileUploader: fileUploader
            });
          });
          test('the popup and form is correctly rendered for url tab', function(assert) {
            this.createWidget({imageUpload: {tabs: ['url']}});
            this.clock.tick(TIME_TO_WAIT);
            var $form = this.getFormElement();
            var formInstance = $form.dxForm('instance');
            var formItems = formInstance.option('items');
            this.checkUrlTabConfigs(assert, {
              formItems: formItems,
              formInstance: formInstance
            });
          });
          test('the popup and form is correctly rendered for two reordered tab', function(assert) {
            this.createWidget({imageUpload: {tabs: ['url', 'file']}});
            this.clock.tick(TIME_TO_WAIT);
            var $form = this.getFormElement();
            var formInstance = $form.dxForm('instance');
            var formItems = formInstance.option('items');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 1, 'has add image dialog class');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 1, 'has add image dialog with tabs class');
            assert.strictEqual(formItems[0].itemType, 'tabbed', 'has tabbed items');
            assert.strictEqual(formItems[0].tabs[0].items.length, 4, 'has items for the first tab');
            assert.strictEqual(formItems[0].tabs[1].items.length, 2, 'has items for the second tab');
            assert.strictEqual(formInstance.option('colCount'), 1, 'has correct form callCount');
            assert.strictEqual($(("." + POPUP_TITLE_CLASS)).text(), 'Add Image', 'dialog title is modified');
            assert.strictEqual($(DIALOG_OK_BUTTON_SELECTOR).first().text(), 'Add', 'dialog add button text is modified');
          });
          test('apply one tab config after second tab selection', function(assert) {
            this.createWidget({imageUpload: {
                tabs: ['url', 'file'],
                fileUploadMode: 'base64'
              }});
            this.clock.tick(TIME_TO_WAIT);
            this.getFormElement();
            $('.dx-tabs-wrapper > .dx-tab').eq(1).trigger('dxclick');
            this.clickCancelDialogButton();
            this.instance.option({imageUpload: {tabs: ['image']}});
            var file = createFakeFile(fakeFile.name, fakeFile.size, fakeFile.type);
            var quillUploadSpy = sinon.spy(this.instance.getQuillInstance().getModule('uploader'), 'upload');
            try {
              var $form = this.getFormElement([1, 2]);
              var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
              fileUploader.option('value', [file]);
              this.clock.tick(TIME_TO_WAIT);
              this.clickDialogOkButton();
              assert.strictEqual(quillUploadSpy.callCount, 1, 'file uploader upload method is called');
            } catch (e) {
              assert.ok(false);
            }
          });
          test('the popup and form is correctly rendered for both tabs if imageUpload option was changed', function(assert) {
            this.createWidget({imageUpload: {tabs: ['file']}});
            this.clock.tick(TIME_TO_WAIT);
            this.getFormElement();
            this.instance.option({imageUpload: {tabs: ['file', 'url']}});
            this.clickCancelDialogButton();
            var $form = this.getFormElement();
            var formInstance = $form.dxForm('instance');
            var formItems = formInstance.option('items');
            var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS));
            this.checkBothTabsConfigs(assert, {
              formItems: formItems,
              formInstance: formInstance,
              fileUploader: fileUploader
            });
          });
          [undefined, null].forEach(function(imageUploadValue) {
            test(("the popup and form is correctly rendered if imageUpload is " + imageUploadValue), function(assert) {
              this.instance = this.$element.dxHtmlEditor({
                toolbar: {items: ['image']},
                imageUpload: imageUploadValue,
                value: markup
              }).dxHtmlEditor('instance');
              this.clock.tick(TIME_TO_WAIT);
              var $form = this.getFormElement();
              var formInstance = $form.dxForm('instance');
              var formItems = formInstance.option('items');
              assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 1, 'has add image dialog class');
              assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 0, 'has no add image dialog with tabs class');
              assert.strictEqual(formItems.length, 4, 'has correct form items count');
              assert.strictEqual(formInstance.option('colCount'), 11, 'has correct form callCount');
              assert.strictEqual(formItems[0].items || formItems[0].tabs, undefined, 'has no embeded items');
            });
          });
          test('The popup has correct title, button texts and form options after it is closed and other type dialog is opened', function(assert) {
            this.createWidget({
              imageUpload: {mode: 'url'},
              toolbar: {items: ['image', 'link']}
            });
            this.clock.tick(TIME_TO_WAIT);
            this.$element.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(0).trigger('dxclick');
            this.clock.tick(TIME_TO_WAIT);
            var $form = $(("." + FORM_CLASS));
            var formInstance = $form.dxForm('instance');
            formInstance.getEditor('src').option('value', 'temp');
            this.clickDialogOkButton();
            this.clock.tick(TIME_TO_WAIT);
            this.$element.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).eq(1).trigger('dxclick');
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_CLASS)).length, 0, 'has no add image dialog class');
            assert.strictEqual($(("." + ADD_IMAGE_DIALOG_WITH_TABS_CLASS)).length, 0, 'has no add image dialog with tabs class');
            assert.strictEqual(formInstance.option('colCount'), 1, 'has correct form callCount');
            assert.strictEqual(formInstance.option('labelLocation'), 'left', 'has correct form labelLocation');
            assert.strictEqual($(DIALOG_OK_BUTTON_SELECTOR).first().text(), 'OK', 'dialog ok button text is reverted');
          });
          test('check file uploading form base64 checkbox', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $form = this.getFormElement();
            var $base64Editor = this.getBase64EditorElement($form);
            var base64EditorInstance = $base64Editor.dxCheckBox('instance');
            assert.strictEqual(base64EditorInstance.option('value'), false, 'base64 checkbox default value is false');
            assert.strictEqual(base64EditorInstance.option('visible'), true, 'base64 checkbox is visible');
          });
          test('check file uploading form base64 checkbox if mode = "base64"', function(assert) {
            this.createWidget({imageUpload: {
                fileUploadMode: 'base64',
                tabs: ['file'],
                uploadUrl: undefined
              }});
            this.clock.tick(TIME_TO_WAIT);
            var $form = this.getFormElement();
            var $base64Editor = this.getBase64EditorElement($form);
            var base64EditorInstance = $base64Editor.dxCheckBox('instance');
            assert.strictEqual(base64EditorInstance.option('value'), true, 'base64 checkbox default value is true');
            assert.strictEqual(base64EditorInstance.option('visible'), false, 'base64 checkbox is hidden');
          });
          test('check file uploading in base64 format', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var file = createFakeFile(fakeFile.name, fakeFile.size, fakeFile.type);
            var quillUploadSpy = sinon.spy(this.quillInstance.getModule('uploader'), 'upload');
            var $form = this.getFormElement([1, 2]);
            var $base64Editor = this.getBase64EditorElement($form);
            var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
            var base64EditorInstance = $base64Editor.dxCheckBox('instance');
            base64EditorInstance.option('value', true);
            fileUploader.option('value', [file]);
            this.clock.tick(TIME_TO_WAIT);
            this.clickDialogOkButton();
            assert.strictEqual(quillUploadSpy.callCount, 1, 'file uploader upload method is called');
            assert.strictEqual(quillUploadSpy.getCall(0).args[0].index, 1, 'first upload arg index is correct');
            assert.deepEqual(quillUploadSpy.getCall(0).args[1], [file], 'file upload arg is correct');
          });
          test('check file uploading in base64 format if fileUploadMode is not defined', function(assert) {
            this.instance = this.$element.dxHtmlEditor({
              toolbar: {items: ['image']},
              imageUpload: {tabs: ['file']},
              value: markup
            }).dxHtmlEditor('instance');
            this.clock.tick(TIME_TO_WAIT);
            var file = createFakeFile(fakeFile.name, fakeFile.size, fakeFile.type);
            var quillUploadSpy = sinon.spy(this.instance.getQuillInstance().getModule('uploader'), 'upload');
            var $form = this.getFormElement([1, 2]);
            var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
            fileUploader.option('value', [file]);
            this.clickDialogOkButton();
            assert.strictEqual(quillUploadSpy.callCount, 1, 'file uploader upload method is called');
          });
          function prepareImageUpdateTest(caretPosition, selectionLength) {
            return function(assert) {
              var $__4 = this;
              var done = assert.async();
              this.createWidget({
                value: ("<img src=" + WHITE_PIXEL + ">"),
                imageUpload: {
                  fileUploadMode: 'url',
                  tabs: ['url']
                },
                onValueChanged: function($__6) {
                  var value = $__6.value;
                  assert.ok(value.indexOf(WHITE_PIXEL) === -1, 'There is no white pixel');
                  assert.ok(value.indexOf(BLACK_PIXEL) !== -1, 'There is a black pixel');
                  done();
                }
              });
              this.instance.focus();
              setTimeout(function() {
                $__4.instance.setSelection(caretPosition, selectionLength);
              }, 100);
              this.clock.tick(100);
              this.$element.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
              var $srcInput = $(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS)).first().val('');
              keyboardMock($srcInput.eq(0)).type(BLACK_PIXEL).change().press('enter');
            };
          }
          test('image should be correctly updated after change a source and caret placed after', prepareImageUpdateTest(1, 0));
          test('image should be correctly updated after change a source and caret placed before an image', prepareImageUpdateTest(0, 0));
          test('selected image should be correctly updated after change a source and caret placed after', prepareImageUpdateTest(1, 1));
          test('selected image should be correctly updated after change a source and caret placed before an image', prepareImageUpdateTest(0, 1));
          test('image should be correctly updated after change a source and caret placed between two images', function(assert) {
            var done = assert.async();
            var $container = $('#htmlEditor');
            var instance = $container.dxHtmlEditor({
              toolbar: {items: ['image']},
              value: ("<img src=" + WHITE_PIXEL + "><img src=" + BLACK_PIXEL + ">"),
              onValueChanged: function($__6) {
                var value = $__6.value;
                var blackIndex = value.indexOf(BLACK_PIXEL);
                var orangeIndex = value.indexOf(ORANGE_PIXEL);
                assert.strictEqual(value.indexOf(WHITE_PIXEL), -1, 'There is no white pixel');
                assert.notStrictEqual(blackIndex, -1, 'There is a black pixel');
                assert.notStrictEqual(orangeIndex, -1, 'There is an orange pixel');
                assert.ok(orangeIndex < blackIndex, 'orange pixel placed before black pixel');
                done();
              }
            }).dxHtmlEditor('instance');
            instance.focus();
            setTimeout(function() {
              instance.setSelection(1, 0);
            }, 100);
            this.clock.tick(100);
            $container.find(("." + TOOLBAR_FORMAT_WIDGET_CLASS)).trigger('dxclick');
            var $srcInput = $(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_INPUT_CLASS)).first().val('');
            keyboardMock($srcInput.eq(0)).type(ORANGE_PIXEL).change().press('enter');
          });
        });
        test('check file uploading by url dimention editors default value', function(assert) {
          this.createWidget({
            value: markup,
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '', 'height value is empty');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '', 'width value is empty');
          assert.ok(sizeEditors.widthEditor.option('inputAttr.id'), 'label id is defined');
          assert.ok(sizeEditors.heightEditor.option('inputAttr.id'), 'label id is defined');
        });
        test('check file uploading by url with dimentions', function(assert) {
          this.createWidget({
            value: ("<img width=\"0\" height=\"0\" src=" + WHITE_PIXEL + ">"),
            imageUpload: {mode: 'url'}
          });
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          sizeEditors.widthEditor.option('value', '70');
          sizeEditors.heightEditor.option('value', '65');
          this.clock.tick(TIME_TO_WAIT);
          this.clickDialogOkButton();
          this.clock.tick(TIME_TO_WAIT);
          var imageFormat = this.instance.getFormat();
          assert.strictEqual(imageFormat.width, '70', 'width is correct');
          assert.strictEqual(imageFormat.height, '65', 'height is correct');
        });
        test('check dimentions default values', function(assert) {
          this.createWidget({
            value: ("<img width='50' height='40' src=" + WHITE_PIXEL + ">"),
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '40', 'height value is correct');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '50', 'width value is correct');
        });
        test('check aspect ratio base', function(assert) {
          this.createWidget({
            value: ("<img width=\"0\" height=\"0\" src=" + WHITE_PIXEL + ">"),
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          sizeEditors.widthEditor.option('value', '50');
          sizeEditors.heightEditor.option('value', '25');
          this.clock.tick(TIME_TO_WAIT);
          sizeEditors.widthEditor.option('value', '100');
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '50', 'height value is recalculated');
          this.clock.tick(TIME_TO_WAIT);
          sizeEditors.heightEditor.option('value', '60');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '120', 'width value is recalculated');
        });
        test('check aspect ratio with default values', function(assert) {
          this.createWidget({
            value: ("<img width='50' height='40' src=" + WHITE_PIXEL + ">"),
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          sizeEditors.heightEditor.option('value', '80');
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '80', 'height value is recalculated');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '100', 'width value is recalculated');
        });
        test('check aspect ratio disabling', function(assert) {
          this.createWidget({
            value: ("<img src=" + WHITE_PIXEL + ">"),
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          this.clickAspectRatioButton($form);
          sizeEditors.widthEditor.option('value', '50');
          sizeEditors.heightEditor.option('value', '25');
          sizeEditors.widthEditor.option('value', '100');
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '25', 'height value is recalculated');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '100', 'width value is recalculated');
        });
        test('check aspect ratio when only one size is defined', function(assert) {
          this.createWidget({
            value: markup,
            imageUpload: {mode: 'url'}
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var sizeEditors = this.getSizeEditors($form);
          sizeEditors.widthEditor.option('value', '50');
          assert.strictEqual(sizeEditors.heightEditor.option('value'), '', 'height value is recalculated');
          assert.strictEqual(sizeEditors.widthEditor.option('value'), '50', 'width value is recalculated');
        });
        ['/uploadDirectory', '/uploadDirectory/'].forEach(function(uploadDirectory) {
          test(("check file uploading to the server for directoryUrl = \"" + uploadDirectory + "\""), function(assert) {
            var expectedValue = '<p>t<img src="/uploadDirectory/fakefile1.jpeg">est text</p><p><br></p>';
            this.createWidget({imageUpload: {
                fileUploadMode: 'both',
                tabs: ['file', 'url'],
                uploadUrl: '/',
                uploadDirectory: uploadDirectory
              }});
            this.clock.tick(TIME_TO_WAIT);
            this.xhrMock = new window.XMLHttpRequestMock();
            this._nativeXhr = XMLHttpRequest;
            window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
            this.formDataMock = new window.FormDataMock();
            this._nativeFormData = window.FormData;
            window.FormData = this.formDataMock.FormData;
            var $form = this.getFormElement([1, 2]);
            var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
            fileUploader.option('value', [fakeFile]);
            $form.find(("." + FILEUPLOADER_INPUT_CLASS)).trigger('change');
            this.clickDialogOkButton();
            this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
            var request = this.xhrMock.getInstanceAt();
            assert.ok(request.uploaded, 'upload is done');
            assert.strictEqual(this.instance.option('value'), expectedValue, 'value is correct');
            window.XMLHttpRequest = this._nativeXhr;
            window.FormData = this._nativeFormData;
            this.xhrMock.dispose();
            delete this.xhrMock;
            delete this.formDataMock;
          });
        });
        test('file uploading to the server should not raise error if uploadDirectory is not set', function(assert) {
          this.createWidget({imageUpload: {
              fileUploadMode: 'both',
              tabs: ['file', 'url'],
              uploadUrl: '/'
            }});
          this.clock.tick(TIME_TO_WAIT);
          this.xhrMock = new window.XMLHttpRequestMock();
          this._nativeXhr = XMLHttpRequest;
          window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
          this.formDataMock = new window.FormDataMock();
          this._nativeFormData = window.FormData;
          window.FormData = this.formDataMock.FormData;
          var $form = this.getFormElement([1, 2]);
          var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
          fileUploader.option('value', [fakeFile]);
          $form.find(("." + FILEUPLOADER_INPUT_CLASS)).trigger('change');
          assert.notOk(this.$element.find(("." + OVERLAY_CONTENT_CLASS)).hasClass('dx-state-invisible'), 'overlay is visible');
          try {
            this.clickDialogOkButton();
            this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
            assert.ok(this.$element.find(("." + OVERLAY_CONTENT_CLASS)).hasClass('dx-state-invisible'), 'overlay is not visible');
            assert.ok(true, 'There is no error');
          } catch (e) {
            assert.ok(false, ("Error message: " + e));
          }
          window.XMLHttpRequest = this._nativeXhr;
          window.FormData = this._nativeFormData;
          this.xhrMock.dispose();
          delete this.xhrMock;
          delete this.formDataMock;
        });
        test('check form fileUploaderOption', function(assert) {
          this.createWidget({imageUpload: {
              tabs: ['file'],
              fileUploadMode: 'both',
              fileUploaderOptions: {
                width: 155,
                name: 'photo123'
              }
            }});
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement([1, 2]);
          var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
          assert.strictEqual(fileUploader.option('width'), 155, 'width value is correct');
          assert.strictEqual(fileUploader.option('name'), 'photo123', 'name is correct');
        });
        test('check the fileUploader options are applied for hidden file uploader', function(assert) {
          var testHandler = function() {};
          this.createWidget({imageUpload: {
              tabs: ['file'],
              fileUploadMode: 'server',
              uploadUrl: '/Upload/',
              uploadDirectory: '/uploadDirectory/',
              fileUploaderOptions: {onBeforeSend: testHandler}
            }});
          this.clock.tick(TIME_TO_WAIT);
          var fileUploader = this.$element.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
          assert.strictEqual(fileUploader.option('onBeforeSend'), testHandler, 'config is applied');
        });
        [{
          optionName: 'imageUpload.fileUploaderOptions',
          optionValue: {name: 'test1'}
        }, {
          optionName: 'imageUpload.fileUploaderOptions.name',
          optionValue: 'test1'
        }].forEach(function(data) {
          test(("check the fileUploader with " + data.optionName.split('.').length + " cascade options can be changed at runtime"), function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var fileUploader = this.$element.find(("." + FILE_UPLOADER_CLASS)).dxFileUploader('instance');
            this.instance.option(data.optionName, data.optionValue);
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(fileUploader.option('name'), 'test1', 'config is applied');
          });
        });
        [{
          testNamePart: 'one file',
          files: [fakeFile],
          uploadedStatus: true,
          expectedMarkup: serverUploadMarkup
        }, {
          testNamePart: 'image and text files',
          files: [fakeFile, fakeFileText],
          uploadedStatus: true,
          expectedMarkup: serverUploadMarkup
        }, {
          testNamePart: 'one text file',
          files: [fakeFileText],
          uploadedStatus: undefined,
          expectedMarkup: markup
        }, {
          testNamePart: 'two image files',
          files: [fakeFile, fakeFile2],
          uploadedStatus: true,
          expectedMarkup: '<p>test text</p><p><br></p><p><img src="/uploadDirectory/fakefile1.jpeg"><img src="/uploadDirectory/fakefile2.jpeg"></p>'
        }].forEach(function(data) {
          test(("check upload to the server after drop " + data.testNamePart), function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.xhrMock = new window.XMLHttpRequestMock();
            this._nativeXhr = XMLHttpRequest;
            window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
            this.formDataMock = new window.FormDataMock();
            this._nativeFormData = window.FormData;
            window.FormData = this.formDataMock.FormData;
            var files = data.files;
            var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
            $(this.quillInstance.root).trigger(event);
            var request = this.xhrMock.getInstanceAt();
            this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
            assert.strictEqual(request && request.uploaded, data.uploadedStatus, 'upload is called');
            assert.strictEqual(this.instance.option('value'), data.expectedMarkup, 'value is correct');
            window.XMLHttpRequest = this._nativeXhr;
            window.FormData = this._nativeFormData;
            this.xhrMock.dispose();
            delete this.xhrMock;
            delete this.formDataMock;
          });
          test(("check upload to the server after paste " + data.testNamePart), function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.xhrMock = new window.XMLHttpRequestMock();
            this._nativeXhr = XMLHttpRequest;
            window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
            this.formDataMock = new window.FormDataMock();
            this._nativeFormData = window.FormData;
            window.FormData = this.formDataMock.FormData;
            var files = data.files;
            var event = $.Event($.Event('paste', {clipboardData: {files: files}}));
            $(this.quillInstance.root).trigger(event);
            var request = this.xhrMock.getInstanceAt();
            this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
            assert.strictEqual(request && request.uploaded, data.uploadedStatus, 'upload is called');
            assert.strictEqual(this.instance.option('value'), data.expectedMarkup, 'value is correct');
            window.XMLHttpRequest = this._nativeXhr;
            window.FormData = this._nativeFormData;
            this.xhrMock.dispose();
            delete this.xhrMock;
            delete this.formDataMock;
          });
        });
        test('file uploading to the server with drop should not raise error if uploadDirectory is not set', function(assert) {
          this.createWidget({imageUpload: {
              fileUploadMode: 'both',
              tabs: ['file', 'url'],
              uploadUrl: '/'
            }});
          this.clock.tick(TIME_TO_WAIT);
          this.xhrMock = new window.XMLHttpRequestMock();
          this._nativeXhr = XMLHttpRequest;
          window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
          this.formDataMock = new window.FormDataMock();
          this._nativeFormData = window.FormData;
          window.FormData = this.formDataMock.FormData;
          var event = $.Event($.Event('drop', {dataTransfer: {files: [fakeFile]}}));
          $(this.quillInstance.root).trigger(event);
          try {
            this.xhrMock.getInstanceAt();
            this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
            assert.ok(true, 'There is no error');
          } catch (e) {
            assert.ok(false, ("Error message: " + e));
          }
          window.XMLHttpRequest = this._nativeXhr;
          window.FormData = this._nativeFormData;
          this.xhrMock.dispose();
          delete this.xhrMock;
          delete this.formDataMock;
        });
        test('the form popup render only url tab for image updating', function(assert) {
          this.createWidget({value: ("<img src=" + WHITE_PIXEL + ">")});
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement();
          var formInstance = $form.dxForm('instance');
          var formItems = formInstance.option('items');
          this.checkUrlTabConfigs(assert, {
            formItems: formItems,
            formInstance: formInstance,
            isUpdating: true
          });
        });
        test('the form updating mode does not change tabs config for the next form showing', function(assert) {
          this.createWidget({value: ("<img src=" + WHITE_PIXEL + ">123123")});
          this.clock.tick(TIME_TO_WAIT);
          this.getFormElement();
          this.clickDialogOkButton();
          this.clock.tick(TIME_TO_WAIT);
          var $form = this.getFormElement([5, 1]);
          var formInstance = $form.dxForm('instance');
          var formItems = formInstance.option('items');
          var fileUploader = $form.find(("." + FILE_UPLOADER_CLASS));
          this.checkBothTabsConfigs(assert, {
            formItems: formItems,
            formInstance: formInstance,
            fileUploader: fileUploader
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/keyboardMock.js","../../../helpers/xmlHttpRequestMock.js","core/devices","animation/fx","ui/html_editor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/keyboardMock.js"), require("../../../helpers/xmlHttpRequestMock.js"), require("core/devices"), require("animation/fx"), require("ui/html_editor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=imageUploadIntegration.tests.js.map