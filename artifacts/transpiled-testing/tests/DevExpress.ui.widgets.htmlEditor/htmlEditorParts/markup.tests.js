!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/markup.tests.js"], ["jquery","ui/html_editor","ui/html_editor/converters/markdown","core/config"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/markup.tests.js", ["jquery", "ui/html_editor", "ui/html_editor/converters/markdown", "core/config"], function($__export) {
  "use strict";
  var $,
      config,
      HTML_EDITOR_CLASS,
      QUILL_CONTAINER_CLASS,
      HTML_EDITOR_CONTENT_CLASS,
      HTML_EDITOR_SUBMIT_ELEMENT_CLASS,
      HTML_EDITOR_OUTLINED_CLASS,
      HTML_EDITOR_FILLED_CLASS,
      HTML_EDITOR_UNDERLINED_CLASS,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      config = $__m.default;
    }],
    execute: function() {
      var $__2;
      HTML_EDITOR_CLASS = 'dx-htmleditor';
      QUILL_CONTAINER_CLASS = 'dx-quill-container';
      HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
      HTML_EDITOR_SUBMIT_ELEMENT_CLASS = 'dx-htmleditor-submit-element';
      HTML_EDITOR_OUTLINED_CLASS = 'dx-htmleditor-outlined';
      HTML_EDITOR_FILLED_CLASS = 'dx-htmleditor-filled';
      HTML_EDITOR_UNDERLINED_CLASS = 'dx-htmleditor-filled';
      (($__2 = QUnit, test = $__2.test, $__2));
      $__export('default', function() {
        QUnit.module('Base markup', function() {
          test('render markup', function(assert) {
            var instance = $('#htmlEditor').dxHtmlEditor({value: '<h1>Hi!</h1><p>Test</p>'}).dxHtmlEditor('instance');
            var $element = instance.$element();
            var $submitElement = $element.find(("." + HTML_EDITOR_SUBMIT_ELEMENT_CLASS));
            assert.ok($element.hasClass(HTML_EDITOR_CLASS), 'Widget has a specific class on the root level');
            assert.ok($element.children().hasClass(QUILL_CONTAINER_CLASS), 'Widget has a child marked as quill container');
            assert.equal($element.find(("." + QUILL_CONTAINER_CLASS)).text(), 'Hi!Test');
            assert.equal($submitElement.length, 1, 'Submit element rendered');
            assert.equal($submitElement.val(), '<h1>Hi!</h1><p>Test</p>', 'It\'s value equal to the editor\'s value');
            var isQuillRendered = !!$element.find(("." + HTML_EDITOR_CONTENT_CLASS)).length;
            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
          });
          test('name options should be applies to the submit element', function(assert) {
            var instance = $('#htmlEditor').dxHtmlEditor({name: 'Test'}).dxHtmlEditor('instance');
            var $submitElement = instance.$element().find(("." + HTML_EDITOR_SUBMIT_ELEMENT_CLASS));
            assert.equal($submitElement.attr('name'), 'Test', 'It\'s the right name');
            instance.option('name', 'New');
            assert.equal($submitElement.attr('name'), 'New', 'It\'s the right new name');
          });
          test('render markdown markup', function(assert) {
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: '*Test* **text**',
              valueType: 'markdown'
            }).dxHtmlEditor('instance');
            var $element = instance.$element();
            var $htmlEditorContent = $element.find(("." + HTML_EDITOR_CONTENT_CLASS));
            var isQuillRendered = !!$htmlEditorContent.length;
            var $content = isQuillRendered ? $htmlEditorContent : $element.find(("." + QUILL_CONTAINER_CLASS));
            assert.ok($element.hasClass(HTML_EDITOR_CLASS), 'Widget has a specific class on the root level');
            assert.ok($element.children().hasClass(QUILL_CONTAINER_CLASS), 'Widget has a child marked as quill container');
            assert.equal($content.html(), '<p><em>Test</em> <strong>text</strong></p>');
            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
          });
          test('change value', function(assert) {
            var instance = $('#htmlEditor').dxHtmlEditor({value: '<h1>Hi!</h1><p>Test</p>'}).dxHtmlEditor('instance');
            var $element = instance.$element();
            var $submitElement = $element.find(("." + HTML_EDITOR_SUBMIT_ELEMENT_CLASS));
            instance.option('value', '<p>New value</p>');
            assert.equal($element.find(("." + QUILL_CONTAINER_CLASS)).text(), 'New value');
            assert.equal($submitElement.val(), '<p>New value</p>', 'Submit element\'s value equal to the editor\'s value');
            var isQuillRendered = !!$element.find(("." + HTML_EDITOR_CONTENT_CLASS)).length;
            assert.equal(!!instance._deltaConverter, isQuillRendered, 'Delta converter isn\'t initialized at SSR');
            assert.equal(!!instance._quillRegistrator, isQuillRendered, 'Quill registrator isn\'t initialized at SSR');
          });
          test('styling mode', function(assert) {
            var $element = $('#htmlEditor').dxHtmlEditor({
              value: 'Test',
              stylingMode: 'outlined'
            });
            assert.ok($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), 'has outlined mode class');
            assert.notOk($element.hasClass(HTML_EDITOR_FILLED_CLASS), 'has no filled mode class');
            assert.notOk($element.hasClass(HTML_EDITOR_UNDERLINED_CLASS), 'has no underlined mode class');
          });
          test('change styling mode', function(assert) {
            var instance = $('#htmlEditor').dxHtmlEditor({
              value: 'Test',
              stylingMode: 'outlined'
            }).dxHtmlEditor('instance');
            var $element = instance.$element();
            instance.option('stylingMode', 'filled');
            assert.notOk($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), 'has no old styling mode class');
            assert.ok($element.hasClass(HTML_EDITOR_FILLED_CLASS), 'has new styling mode class');
          });
        });
        QUnit.module('Accessibility', function() {
          test('accessibility roles', function(assert) {
            var $element = $('#htmlEditor');
            $element.dxHtmlEditor({value: '<p>Test</p>'});
            var $editorContent = $element.find(("." + HTML_EDITOR_CONTENT_CLASS));
            var isQuillRendered = !!$editorContent.length;
            assert.expect(isQuillRendered ? 2 : 1);
            assert.strictEqual($element.attr('role'), 'application');
            if (isQuillRendered) {
              assert.strictEqual($editorContent.attr('role'), 'textbox');
            }
          });
          test('aria-label on textbox', function(assert) {
            var $htmlEditor = $('#htmlEditor').dxHtmlEditor();
            var $editorContent = $htmlEditor.find(("." + HTML_EDITOR_CONTENT_CLASS));
            var isQuillRendered = !!$editorContent.length;
            assert.expect(isQuillRendered ? 1 : 0);
            if (isQuillRendered) {
              assert.strictEqual($editorContent.attr('aria-label'), 'Editor content');
            }
          });
        });
        QUnit.module('Props from global config', {
          beforeEach: function() {
            config({editorStylingMode: 'filled'});
          },
          afterEach: function() {
            config({editorStylingMode: 'outlined'});
          }
        }, function() {
          test('editorStylingMode should be applyed', function(assert) {
            var $element = $('#htmlEditor').dxHtmlEditor({value: 'Test'});
            assert.strictEqual($element.hasClass(HTML_EDITOR_OUTLINED_CLASS), false, 'has no old styling mode class');
            assert.strictEqual($element.hasClass(HTML_EDITOR_FILLED_CLASS), true, 'has new styling mode class');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","ui/html_editor/converters/markdown","core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("ui/html_editor/converters/markdown"), require("core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=markup.tests.js.map