!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/variablesModule.tests.js"], ["jquery","ui/html_editor/formats/variable","ui/html_editor/modules/variables","core/utils/common"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/variablesModule.tests.js", ["jquery", "ui/html_editor/formats/variable", "ui/html_editor/modules/variables", "core/utils/common"], function($__export) {
  "use strict";
  var $,
      VariableFormat,
      Variables,
      noop,
      SUGGESTION_LIST_CLASS,
      moduleConfig,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      VariableFormat = $__m.default;
    }, function($__m) {
      Variables = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }],
    execute: function() {
      var $__5;
      SUGGESTION_LIST_CLASS = 'dx-suggestion-list';
      moduleConfig = {
        beforeEach: function() {
          var $__4 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.log = [];
          this._keyBindingStub = sinon.stub();
          this.quillMock = {
            insertEmbed: function(position, format, value) {
              $__4.log.push({
                position: position,
                format: format,
                value: value
              });
            },
            keyboard: {addBinding: this._keyBindingStub},
            getLength: function() {
              return 0;
            },
            getBounds: function() {
              return {
                left: 0,
                bottom: 0
              };
            },
            root: this.$element.get(0),
            getModule: noop,
            getSelection: noop,
            setSelection: noop,
            getFormat: noop
          };
          this.options = {
            dataSource: ['TEST_NAME', 'TEST_COMPANY'],
            editorInstance: {
              $element: function() {
                return $__4.$element;
              },
              _createComponent: function($element, widget, options) {
                return new widget($element, options);
              }
            }
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      (($__5 = QUnit, test = $__5.test, $__5));
      QUnit.module('Variable format', function() {
        test('Create an element by data', function(assert) {
          var data = {
            value: 'TEST_NAME',
            escapeChar: '@'
          };
          var element = VariableFormat.create(data);
          assert.equal(element.dataset.varStartEscChar, '@', 'correct start escape char');
          assert.equal(element.dataset.varEndEscChar, '@', 'correct end escape char');
          assert.equal(element.dataset.varValue, 'TEST_NAME', 'correct inner text');
          assert.equal(element.innerText, '@TEST_NAME@', 'correct inner text');
        });
        test('Create an element with default escape char', function(assert) {
          var data = {
            value: 'TEST_NAME',
            escapeChar: ''
          };
          var element = VariableFormat.create(data);
          assert.equal(element.dataset.varStartEscChar, '', 'correct start escape char');
          assert.equal(element.dataset.varEndEscChar, '', 'correct end escape char');
          assert.equal(element.dataset.varValue, 'TEST_NAME', 'correct inner text');
          assert.equal(element.innerText, 'TEST_NAME', 'correct inner text');
        });
        test('Create an element with start escaping char', function(assert) {
          var data = {
            value: 'TEST_NAME',
            escapeChar: ['{', '']
          };
          var element = VariableFormat.create(data);
          assert.equal(element.dataset.varValue, 'TEST_NAME', 'correct inner text');
          assert.equal(element.dataset.varStartEscChar, '{', 'There is no start char');
          assert.notOk(element.dataset.varEndEscChar, 'There is no end char');
          assert.equal(element.innerText, '{TEST_NAME', 'correct inner text');
        });
        test('Create an element with end escaping char', function(assert) {
          var data = {
            value: 'TEST_NAME',
            escapeChar: ['', '}']
          };
          var element = VariableFormat.create(data);
          assert.equal(element.dataset.varValue, 'TEST_NAME', 'correct inner text');
          assert.notOk(element.dataset.varStartEscChar, 'There is no start char');
          assert.equal(element.dataset.varEndEscChar, '}', 'There is no end char');
          assert.equal(element.innerText, 'TEST_NAME}', 'correct inner text');
        });
        test('Create an element with start, end and default escaping char', function(assert) {
          var data = {
            value: 'TEST_NAME',
            escapeChar: ['{', '}']
          };
          var element = VariableFormat.create(data);
          assert.equal(element.dataset.varValue, 'TEST_NAME', 'correct inner text');
          assert.equal(element.dataset.varStartEscChar, '{', 'There is no start char');
          assert.equal(element.dataset.varEndEscChar, '}', 'There is no end char');
          assert.equal(element.innerText, '{TEST_NAME}', 'correct inner text');
        });
        test('Get data from element', function(assert) {
          var markup = '<span class=\'dx-variable\' data-var-start-esc-char=## data-var-value=TEST_NAME><span>##TEST_NAME##</span></span>';
          var element = $(markup).get(0);
          var data = VariableFormat.value(element);
          assert.deepEqual(data, {
            value: 'TEST_NAME',
            escapeChar: ['##', '']
          }, 'Correct data');
        });
      });
      QUnit.module('Variables module', moduleConfig, function() {
        test('insert variable after click on item', function(assert) {
          this.options.escapeChar = '#';
          var variables = new Variables(this.quillMock, this.options);
          variables.showPopup();
          $(("." + SUGGESTION_LIST_CLASS + " .dx-item")).first().trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(this.log, [{
            format: 'variable',
            position: 0,
            value: {
              escapeChar: '#',
              value: 'TEST_NAME'
            }
          }], 'Correct formatting');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor/formats/variable","ui/html_editor/modules/variables","core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor/formats/variable"), require("ui/html_editor/modules/variables"), require("core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=variablesModule.tests.js.map