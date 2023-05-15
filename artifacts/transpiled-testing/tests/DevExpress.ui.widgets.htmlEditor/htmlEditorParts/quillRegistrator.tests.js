!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/quillRegistrator.tests.js"], ["jquery","ui/html_editor/quill_registrator","ui/html_editor/formats/image","ui/html_editor/formats/font","ui/html_editor/formats/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/quillRegistrator.tests.js", ["jquery", "ui/html_editor/quill_registrator", "ui/html_editor/formats/image", "ui/html_editor/formats/font", "ui/html_editor/formats/size"], function($__export) {
  "use strict";
  var $,
      QuillRegistrator,
      Image,
      Font,
      Size,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      QuillRegistrator = $__m.default;
    }, function($__m) {
      Image = $__m.default;
    }, function($__m) {
      Font = $__m.default;
    }, function($__m) {
      Size = $__m.default;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, test = $__2.test, $__2));
      QUnit.module('Quill registrator', function() {
        test('check defaults', function(assert) {
          var quillRegistrator = new QuillRegistrator();
          var quill = quillRegistrator.getQuill();
          var alignFormat = quill.import('formats/align');
          var directionFormat = quill.import('formats/direction');
          var fontFormat = quill.import('formats/font');
          var sizeFormat = quill.import('formats/size');
          var AlignStyle = quill.import('attributors/style/align');
          var DirectionStyle = quill.import('attributors/style/direction');
          var imageFormat = quill.import('formats/extendedImage');
          var baseTheme = quill.import('themes/basic');
          assert.deepEqual(alignFormat, AlignStyle, 'Style attributor');
          assert.deepEqual(directionFormat, DirectionStyle, 'Style attributor');
          assert.deepEqual(fontFormat, Font, 'Style attributor');
          assert.deepEqual(sizeFormat, Size, 'Style attributor');
          assert.deepEqual(imageFormat, Image, 'Custom format');
          assert.ok(baseTheme, 'custom base theme');
        });
        test('change format', function(assert) {
          var quillRegistrator = new QuillRegistrator();
          var quill = quillRegistrator.getQuill();
          var alignClassFormat = quill.import('attributors/class/align');
          quillRegistrator.registerModules({'formats/align': alignClassFormat});
          var alignFormat = quill.import('formats/align');
          assert.deepEqual(alignFormat, alignClassFormat, 'Class attributor');
        });
        test('create a quill editor instance', function(assert) {
          var element = $('#htmlEditor').get(0);
          var quillRegistrator = new QuillRegistrator();
          quillRegistrator.createEditor(element);
          assert.equal(element.className, 'ql-container');
        });
        test('add a customModule', function(assert) {
          var quillRegistrator = new QuillRegistrator();
          quillRegistrator.registerModules({
            'modules/fakeModule': function() {},
            'modules/toolbar': function() {}
          });
          var customModuleNames = quillRegistrator.getRegisteredModuleNames();
          assert.deepEqual(customModuleNames, ['fakeModule'], 'Should return only custom modules');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor/quill_registrator","ui/html_editor/formats/image","ui/html_editor/formats/font","ui/html_editor/formats/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor/quill_registrator"), require("ui/html_editor/formats/image"), require("ui/html_editor/formats/font"), require("ui/html_editor/formats/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=quillRegistrator.tests.js.map