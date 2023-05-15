!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/fileUploader.markup.tests.js"], ["jquery","ui/file_uploader"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/fileUploader.markup.tests.js", ["jquery", "ui/file_uploader"], function($__export) {
  "use strict";
  var $,
      FILEUPLOADER_CLASS,
      FILEUPLOADER_WRAPPER_CLASS,
      FILEUPLOADER_CONTAINER_CLASS,
      FILEUPLOADER_CONTENT_CLASS,
      FILEUPLOADER_INPUT_WRAPPER_CLASS,
      FILEUPLOADER_BUTTON_CLASS,
      FILEUPLOADER_INPUT_CONTAINER_CLASS,
      FILEUPLOADER_INPUT_CLASS,
      FILEUPLOADER_INPUT_LABEL_CLASS,
      FILEUPLOADER_UPLOAD_BUTTON_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="fileuploader"></div>';
        $('#qunit-fixture').html(markup);
      });
      FILEUPLOADER_CLASS = 'dx-fileuploader';
      FILEUPLOADER_WRAPPER_CLASS = 'dx-fileuploader-wrapper';
      FILEUPLOADER_CONTAINER_CLASS = 'dx-fileuploader-container';
      FILEUPLOADER_CONTENT_CLASS = 'dx-fileuploader-content';
      FILEUPLOADER_INPUT_WRAPPER_CLASS = 'dx-fileuploader-input-wrapper';
      FILEUPLOADER_BUTTON_CLASS = 'dx-fileuploader-button';
      FILEUPLOADER_INPUT_CONTAINER_CLASS = 'dx-fileuploader-input-container';
      FILEUPLOADER_INPUT_CLASS = 'dx-fileuploader-input';
      FILEUPLOADER_INPUT_LABEL_CLASS = 'dx-fileuploader-input-label';
      FILEUPLOADER_UPLOAD_BUTTON_CLASS = 'dx-fileuploader-upload-button';
      QUnit.module('fileUploader markup', function() {
        QUnit.test('fileUploader should have correct class', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          assert.ok($fileUploader.hasClass(FILEUPLOADER_CLASS), 'widget rendered');
        });
        QUnit.test('wrapper should be rendered', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $wrapper = $fileUploader.children('.' + FILEUPLOADER_WRAPPER_CLASS);
          assert.equal($wrapper.length, 1, 'wrapper wrapper was rendered');
        });
        QUnit.test('container should be rendered in wrapper', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $wrapper = $fileUploader.find('.' + FILEUPLOADER_WRAPPER_CLASS);
          var $container = $wrapper.children('.' + FILEUPLOADER_CONTAINER_CLASS);
          assert.equal($container.length, 1, 'container was rendered');
        });
        QUnit.test('content should be rendered in container', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $container = $fileUploader.find('.' + FILEUPLOADER_CONTAINER_CLASS);
          var $content = $container.children('.' + FILEUPLOADER_CONTENT_CLASS);
          assert.equal($content.length, 1, 'field was rendered');
        });
        QUnit.test('input wrapper should be rendered in content', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $content = $fileUploader.find('.' + FILEUPLOADER_CONTENT_CLASS);
          var $inputWrapper = $content.children('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          assert.equal($inputWrapper.length, 1, 'input wrapper was rendered');
        });
        QUnit.test('input container should be rendered in input wrapper', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var $inputContainer = $inputWrapper.children('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          assert.equal($inputContainer.length, 1, 'input was rendered');
        });
        QUnit.test('button should be rendered in input container', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var $button = $inputWrapper.children('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.equal($button.length, 1, 'input was rendered');
        });
        QUnit.test('input label should be rendered in input container', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.children('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.equal($inputLabel.length, 1, 'field was rendered');
        });
        QUnit.test('\'upload\' button should be rendered, \'uploadMode\'=\'useButtons\'', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 1, '\'upload\' button is rendered');
        });
        QUnit.test('\'upload\' button should not be rendered, \'uploadMode\'=\'instantly\'', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 0, '\'upload\' button is not rendered');
        });
        QUnit.test('select button text is changed by option', function(assert) {
          var selectButtonText = 'Click me!';
          var $fileUploader = $('#fileuploader').dxFileUploader({selectButtonText: selectButtonText});
          var instance = $fileUploader.dxFileUploader('instance');
          var $button = $fileUploader.find('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.equal($button.text(), selectButtonText, 'button text is correct');
          selectButtonText = 'Click me again!';
          instance.option('selectButtonText', selectButtonText);
          assert.equal($button.text(), selectButtonText, 'button text is correct');
        });
        QUnit.test('upload button text is changed by option', function(assert) {
          var uploadButtonText = 'Click me!';
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            uploadButtonText: uploadButtonText
          });
          var instance = $fileUploader.dxFileUploader('instance');
          var $button = $fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.equal($button.text(), uploadButtonText, 'button text is correct');
          uploadButtonText = 'Click me again!';
          instance.option('uploadButtonText', uploadButtonText);
          assert.equal($button.text(), uploadButtonText, 'button text is correct');
        });
        QUnit.test('file input accessability attrbutes rendered', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var $fileInput = $fileUploader.find(("." + FILEUPLOADER_INPUT_CLASS));
          var $fileInputLabel = $fileUploader.find(("." + FILEUPLOADER_INPUT_LABEL_CLASS));
          var labelId = $fileInputLabel.attr('id');
          assert.strictEqual($fileInput.attr('aria-labelledby'), labelId, 'aria attribute rendered');
        });
        QUnit.test('file input custom attrbutes rendered', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            inputAttr: {
              role: 'test_role1',
              id: 'test_id1'
            }
          });
          var $fileInput = $fileUploader.find(("." + FILEUPLOADER_INPUT_CLASS));
          assert.strictEqual($fileInput.attr('role'), 'test_role1', 'custom attribute rendered');
          assert.strictEqual($fileInput.attr('id'), 'test_id1', 'custom attribute rendered');
        });
        QUnit.test('partically update the "inputAttr" option', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          $fileUploader.dxFileUploader('option', 'inputAttr.id', 'test_id1');
          var $fileInput = $fileUploader.find(("." + FILEUPLOADER_INPUT_CLASS));
          assert.strictEqual($fileInput.attr('id'), 'test_id1', 'custom attribute has been applied');
        });
        QUnit.test('partial update of the "inputAttr" option should not replace other attibutes', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            inputAttr: {
              role: 'test_role1',
              autocomplete: 'on',
              id: 'test_id1'
            }
          });
          $fileUploader.dxFileUploader('option', 'inputAttr.id', 'test_id1');
          var $fileInput = $fileUploader.find(("." + FILEUPLOADER_INPUT_CLASS));
          assert.strictEqual($fileInput.attr('role'), 'test_role1', '"role" attribute has the same value');
          assert.strictEqual($fileInput.attr('id'), 'test_id1', '"id" attribute has been applied');
          assert.strictEqual($fileInput.attr('autocomplete'), 'on', '"autocomplete" attribute has the same value');
        });
      });
      QUnit.module('multiple option', function() {
        QUnit.test('field multiple attr should be set correctly, multiple = true', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: true});
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.prop('multiple'), true, 'file input has correct name property');
        });
        QUnit.test('field multiple attr should be set correctly, multiple = false', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: false});
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.prop('multiple'), false, 'file input has correct name property');
        });
      });
      QUnit.module('option accept', function() {
        QUnit.test('field accept should be rendered correctly', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({accept: 'image/*'});
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.prop('accept'), 'image/*', 'value was set to empty string');
          fileUploader.option('accept', 'video/*');
          assert.equal($fileInput.prop('accept'), 'video/*', 'value was set to empty string');
        });
      });
      QUnit.module('the \'name\' option', function() {
        QUnit.test('widget input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#fileuploader').dxFileUploader({name: expectedName});
          var $input = $element.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/file_uploader"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/file_uploader"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fileUploader.markup.tests.js.map