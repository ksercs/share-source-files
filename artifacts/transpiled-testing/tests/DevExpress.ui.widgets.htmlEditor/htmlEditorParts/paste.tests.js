!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/paste.tests.js"], ["jquery","ui/html_editor"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/paste.tests.js", ["jquery", "ui/html_editor"], function($__export) {
  "use strict";
  var $,
      MS_BULLET_LIST,
      MS_ORDERED_LIST,
      TEXT_WITH_DECORATION,
      MS_INVALID_LIST_PARAGRAPH,
      testModule,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__2;
      MS_BULLET_LIST = '<p class=MsoListParagraphCxSpFirst style=\'text-indent:-18.0pt;mso-list:l1 level1 lfo1\'><![if !supportLists]><span' + '><span style=\'mso-list:Ignore\'>·<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '</span></span></span><![endif]><span lang=EN-US style=\'mso-ansi-language:EN-US\'>1</span><o:p></o:p></p>' + '<p class=MsoListParagraphCxSpMiddle style=\'margin-left:72.0pt;mso-add-space:' + 'auto;text-indent:-18.0pt;mso-list:l1 level2 lfo1\'><![if !supportLists]><span><span' + 'style=\'mso-list:Ignore\'>o<span>&nbsp;&nbsp;</span></span></span><![endif]><span lang=EN-US style=\'mso-ansi-language:EN-US\'>2</span><o:p></o:p></p>' + '<p class=MsoListParagraphCxSpMiddle style=\'margin-left:108.0pt;mso-add-space:' + 'auto;text-indent:-18.0pt;mso-list:l1 level3 lfo1\'><![if !supportLists]><span' + '><span style=\'mso-list:Ignore\'>§<span>&nbsp;' + '</span></span></span><![endif]><span lang=EN-US style=\'mso-ansi-language:EN-US\'>3</span><o:p></o:p></p>';
      MS_ORDERED_LIST = '<p class=MsoListParagraphCxSpMiddle style=\'text-indent:-18.0pt;mso-list:l0 level1 lfo2\'><![if !supportLists]><span' + 'lang=EN-US style=\'mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;' + 'mso-ansi-language:EN-US\'><span style=\'mso-list:Ignore\'>1.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]><span' + 'lang=EN-US style=\'mso-ansi-language:EN-US\'>1<o:p></o:p></span></p>' + '<p class=MsoListParagraphCxSpMiddle style=\'margin-left:72.0pt;mso-add-space:' + 'auto;text-indent:-18.0pt;mso-list:l0 level2 lfo2\'><![if !supportLists]><span' + 'lang=EN-US style=\'mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;' + 'mso-ansi-language:EN-US\'><span style=\'mso-list:Ignore\'>a.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><![endif]><span' + 'lang=EN-US style=\'mso-ansi-language:EN-US\'>2<o:p></o:p></span></p>' + '<p class=MsoListParagraphCxSpLast style=\'margin-left:108.0pt;mso-add-space:' + 'auto;text-indent:-108.0pt;mso-text-indent-alt:-9.0pt;mso-list:l0 level3 lfo2\'><![if !supportLists]><span' + 'lang=EN-US style=\'mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin;' + 'mso-ansi-language:EN-US\'><span style=\'mso-list:Ignore\'><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '</span>i.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '</span></span></span><![endif]><span lang=EN-US style=\'mso-ansi-language:EN-US\'>3<o:p></o:p></span></p>';
      TEXT_WITH_DECORATION = '<span style=\'text-decoration: underline;\'>test1</span>' + '<span style=\'text-decoration: line-through;\'>test2</span>' + '<span style=\'text-decoration: underline line-through;\'>test3</span>';
      MS_INVALID_LIST_PARAGRAPH = '<p class=\'MsoListParagraphCxSpFirst\'><span>test<o:p></o:p></span></p>';
      (($__2 = QUnit, testModule = $__2.module, test = $__2.test, $__2));
      $__export('default', function() {
        testModule('Paste from MS Word', {
          beforeEach: function() {
            this.clock = sinon.useFakeTimers();
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          test('paste bullet list with indent', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({onValueChanged: function($__3) {
                var value = $__3.value;
                assert.equal(value, '<ul><li>1<ul><li>2<ul><li>3</li></ul></li></ul></li></ul>');
                done();
              }}).dxHtmlEditor('instance');
            var newDelta = instance._quillInstance.clipboard.convert({html: MS_BULLET_LIST});
            instance._quillInstance.setContents(newDelta);
          });
          test('paste ordered list with indent', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({onValueChanged: function($__3) {
                var value = $__3.value;
                assert.equal(value, '<ol><li>1<ol><li>2<ol><li>3</li></ol></li></ol></li></ol>');
                done();
              }}).dxHtmlEditor('instance');
            var newDelta = instance._quillInstance.clipboard.convert({html: MS_ORDERED_LIST});
            instance._quillInstance.setContents(newDelta);
          });
          test('paste list paragraph without styles', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({onValueChanged: function($__3) {
                var value = $__3.value;
                assert.equal(value, '<p>test</p>');
                done();
              }}).dxHtmlEditor('instance');
            var newDelta = instance._quillInstance.clipboard.convert({html: MS_INVALID_LIST_PARAGRAPH});
            instance._quillInstance.setContents(newDelta);
          });
        });
        testModule('Text with decoration', function() {
          test('paste text with text-decoration style', function(assert) {
            var done = assert.async();
            var instance = $('#htmlEditor').dxHtmlEditor({onValueChanged: function($__3) {
                var value = $__3.value;
                assert.equal(value, '<p><u>test1</u><s>test2<u>test3</u></s></p>', 'correct value');
                done();
              }}).dxHtmlEditor('instance');
            var newDelta = instance._quillInstance.clipboard.convert({html: TEXT_WITH_DECORATION});
            instance._quillInstance.setContents(newDelta);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=paste.tests.js.map