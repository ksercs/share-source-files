!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/multilineIntegration.tests.js"], ["jquery","ui/html_editor","./markup.tests.js","./valueRendering.tests.js","./toolbarIntegration.tests.js","./paste.tests.js","./mentionIntegration.tests.js","./utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/multilineIntegration.tests.js", ["jquery", "ui/html_editor", "./markup.tests.js", "./valueRendering.tests.js", "./toolbarIntegration.tests.js", "./paste.tests.js", "./mentionIntegration.tests.js", "./utils.js"], function($__export) {
  "use strict";
  var $,
      HtmlEditor,
      markupTests,
      valueRenderingTests,
      toolbarIntegrationTests,
      pasteTests,
      mentionIntegrationTests,
      prepareTableValue,
      CONTENT_CLASS,
      TIME_TO_WAIT,
      testModule,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      HtmlEditor = $__m.default;
    }, function($__m) {
      markupTests = $__m.default;
    }, function($__m) {
      valueRenderingTests = $__m.default;
    }, function($__m) {
      toolbarIntegrationTests = $__m.default;
    }, function($__m) {
      pasteTests = $__m.default;
    }, function($__m) {
      mentionIntegrationTests = $__m.default;
    }, function($__m) {
      prepareTableValue = $__m.prepareTableValue;
    }],
    execute: function() {
      var $__4;
      CONTENT_CLASS = 'dx-htmleditor-content';
      TIME_TO_WAIT = 500;
      (($__4 = QUnit, testModule = $__4.module, test = $__4.test, $__4));
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      $__export('default', function() {
        testModule('Multiline module integration', {
          beforeEach: function() {
            this.initialEditorDefaults = HtmlEditor._classCustomRules;
            HtmlEditor.defaultOptions({options: {allowSoftLineBreak: true}});
          },
          afterEach: function() {
            HtmlEditor._classCustomRules = this.initialEditorDefaults;
          }
        }, function() {
          markupTests();
          valueRenderingTests();
          toolbarIntegrationTests();
          pasteTests();
          mentionIntegrationTests();
          testModule('initial render', function() {
            test('editor should preserve initial breakers', function(assert) {
              var value = '<h1>Hi!<br>Hej!</h1><p>Ab<br>Cd</p><ul><li>First<br>item</li><li>Second item</li></ul>';
              var $element = $('#htmlEditor');
              var instance = $element.dxHtmlEditor({value: value}).dxHtmlEditor('instance');
              var markup = $element.find(("." + CONTENT_CLASS)).html();
              assert.strictEqual(instance.option('value'), value);
              assert.strictEqual(markup, '<h1>Hi!<br>Hej!</h1><p>Ab<br>Cd</p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>First<br>item</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Second item</li></ol>');
            });
            test('editor should preserve table cell breaks', function(assert) {
              var value = '<table><tbody><tr><td><p>plain text</p></td><td><p>multi<br>line<br>text</p></td></tr><tr><td><p>multi<br>line<br>text</p></td><td><p>plain text</p></td></tr></tbody></table>';
              var $element = $('#htmlEditor');
              var instance = $element.dxHtmlEditor({value: value}).dxHtmlEditor('instance');
              var markup = prepareTableValue($element.find(("." + CONTENT_CLASS)).html());
              assert.strictEqual(instance.option('value'), prepareTableValue(value));
              assert.strictEqual(markup, value);
            });
          });
          testModule('runtime editing', moduleConfig, function() {
            [{
              name: 'break paragraph',
              value: 'test',
              expected: '<p>te<br>st</p>'
            }, {
              name: 'break list item',
              value: '<ul><li>item 1</li><li>item 2</li></ul>',
              expected: '<ul><li>it<br>em 1</li><li>item 2</li></ul>'
            }, {
              name: 'break table cell',
              value: '<table><tr><td>cell 1</td><td>cell 2</td></tr></table>',
              expected: '<table><tbody><tr><td><p>ce<br>ll 1</p></td><td><p>cell 2</p></td></tr></tbody></table>'
            }].forEach(function($__5) {
              var $__6 = $__5,
                  name = $__6.name,
                  value = $__6.value,
                  expected = $__6.expected;
              QUnit.skipInShadowDomMode(name, function(assert) {
                var done = assert.async();
                var $element = $('#htmlEditor');
                var instance = $element.dxHtmlEditor({
                  value: value,
                  onValueChanged: function($__7) {
                    var newValue = $__7.value;
                    assert.strictEqual(prepareTableValue(newValue), expected);
                    done();
                  }
                }).dxHtmlEditor('instance');
                instance.setSelection(2, 0, true);
                this.clock.tick(TIME_TO_WAIT);
                var contentElem = $(instance.element()).find(("." + CONTENT_CLASS)).get(0);
                contentElem.dispatchEvent(new KeyboardEvent('keydown', {
                  key: 'Enter',
                  shiftKey: true
                }));
              });
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
    define(["jquery","ui/html_editor","./markup.tests.js","./valueRendering.tests.js","./toolbarIntegration.tests.js","./paste.tests.js","./mentionIntegration.tests.js","./utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("./markup.tests.js"), require("./valueRendering.tests.js"), require("./toolbarIntegration.tests.js"), require("./paste.tests.js"), require("./mentionIntegration.tests.js"), require("./utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=multilineIntegration.tests.js.map