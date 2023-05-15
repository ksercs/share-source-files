!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/textEditorLabel.tests.js"], ["jquery","ui/text_box/ui.text_editor.label","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/textEditorLabel.tests.js", ["jquery", "ui/text_box/ui.text_editor.label", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      TextEditorLabel,
      getWidth,
      TEXTEDITOR_LABEL_CLASS,
      TEXTEDITOR_WITH_LABEL_CLASS,
      TEXTEDITOR_WITH_FLOATING_LABEL_CLASS,
      TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS,
      LABEL_BEFORE_SELECTOR,
      LABEL_SELECTOR,
      LABEL_AFTER_SELECTOR;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TextEditorLabel = $__m.TextEditorLabel;
    }, function($__m) {
      getWidth = $__m.getWidth;
    }],
    execute: function() {
      TEXTEDITOR_LABEL_CLASS = 'dx-texteditor-label';
      TEXTEDITOR_WITH_LABEL_CLASS = 'dx-texteditor-with-label';
      TEXTEDITOR_WITH_FLOATING_LABEL_CLASS = 'dx-texteditor-with-floating-label';
      TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS = 'dx-texteditor-with-before-buttons';
      LABEL_BEFORE_SELECTOR = '.dx-label-before';
      LABEL_SELECTOR = '.dx-label';
      LABEL_AFTER_SELECTOR = '.dx-label-after';
      QUnit.testStart(function() {
        var markup = '<div id="textEditor"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('textEditorLabel', {beforeEach: function() {
          var $__3 = this;
          this.$editor = $('#textEditor');
          this.labelInitialConfig = {
            $editor: this.$editor,
            text: 'Label',
            mark: '*',
            mode: 'static',
            beforeWidth: 7,
            containerWidth: 180,
            containsButtonsBefore: false
          };
          this.init = function(options) {
            $__3.label = new TextEditorLabel($.extend({}, $__3.labelInitialConfig, options));
            $__3.$label = $__3.label.$element();
            $__3.getBeforeElement = function() {
              return $__3.$label.find(LABEL_BEFORE_SELECTOR);
            };
            $__3.getLabelElement = function() {
              return $__3.$label.find(LABEL_SELECTOR);
            };
            $__3.getSpan = function() {
              return $__3.getLabelElement().find('span');
            };
          };
          this.reinit = function(options) {
            $__3.label = null;
            $__3.$label.remove();
            $__3.init(options);
          };
          this.init({});
        }}, function() {
        QUnit.module('render', function() {
          QUnit.test('base markup', function(assert) {
            assert.ok(this.getBeforeElement().length, 'label has before element');
            assert.ok(this.getLabelElement().length, 'label has internal element');
            assert.ok(this.$label.find(LABEL_AFTER_SELECTOR).length, 'label has after element');
            assert.ok(this.getSpan().length, 'internal label has span');
          });
          QUnit.test('root element should have dx-texteditor-label class', function(assert) {
            assert.ok(this.$label.hasClass(TEXTEDITOR_LABEL_CLASS));
          });
          QUnit.test('span should have text equal to text prop', function(assert) {
            assert.strictEqual(this.getSpan().text(), this.labelInitialConfig.text, 'text is correct');
          });
          QUnit.test('span should have data-mark requal to mark prop', function(assert) {
            assert.strictEqual(this.getSpan().attr('data-mark'), this.labelInitialConfig.mark, 'mark is correct');
          });
          QUnit.test('label before element should have width equal to beforeWidth prop', function(assert) {
            var beforeWidth = getWidth(this.getBeforeElement());
            assert.strictEqual(beforeWidth, this.labelInitialConfig.beforeWidth, 'before element width is correct');
          });
          QUnit.test('label internal element should have max-width equal to containerWidth prop', function(assert) {
            var labelWidth = Number.parseInt(this.getLabelElement().css('maxWidth'), 10);
            assert.strictEqual(labelWidth, this.labelInitialConfig.containerWidth, 'label internal element width is correct');
          });
          QUnit.module('markup visibility', function(assert) {
            QUnit.test('markup should be detached if mode="hidden"', function(assert) {
              this.reinit({mode: 'hidden'});
              assert.notOk(this.$editor.find(LABEL_SELECTOR).length, 'markup is detached');
            });
            QUnit.test('markup should be detached if text is empty', function(assert) {
              this.reinit({text: ''});
              assert.notOk(this.$editor.find(LABEL_SELECTOR).length, 'markup is detached');
            });
          });
        });
        QUnit.module('public methods', function() {
          QUnit.module('updateText', function() {
            QUnit.test('updates text', function(assert) {
              var newText = 'LabelNew';
              this.label.updateText(newText);
              assert.strictEqual(this.getSpan().text(), newText, 'text is updated');
            });
            QUnit.test('toggles markup visibility', function(assert) {
              this.label.updateText();
              assert.notOk(this.$editor.find(LABEL_SELECTOR).length, 'markup is detached');
            });
            QUnit.test('text="" removes label classes from editor element', function(assert) {
              this.label.updateText('');
              assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'editor has no default label class');
              assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'editor has no floating label class');
            });
            QUnit.test('not empty text adds label classes to editor element if mode is not "hidden"', function(assert) {
              this.reinit({text: ''});
              this.label.updateText('some');
              assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'editor has label class');
            });
          });
          QUnit.module('updateContainsButtonsBefore', function() {
            QUnit.test('change to false removes dx-texteditor-with-before-buttons class from editor element', function(assert) {
              this.reinit({containsButtonsBefore: true});
              this.label.updateContainsButtonsBefore(false);
              assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS));
            });
            QUnit.test('change to true adds dx-texteditor-with-before-buttons class to editor element', function(assert) {
              this.label.updateContainsButtonsBefore(true);
              assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS));
            });
          });
          QUnit.test('updateMark', function(assert) {
            var newMark = ':';
            this.label.updateMark(newMark);
            assert.strictEqual(this.getSpan().attr('data-mark'), newMark, 'span mark is updated');
          });
          QUnit.test('updateBeforeWidth', function(assert) {
            var newBeforeWidth = 200;
            this.label.updateBeforeWidth(newBeforeWidth);
            var labelBeforeWidth = getWidth(this.getBeforeElement());
            assert.strictEqual(labelBeforeWidth, newBeforeWidth, 'before element width is updated');
          });
          QUnit.test('updateMaxWidth', function(assert) {
            var newContainerWidth = 300;
            this.label.updateMaxWidth(newContainerWidth);
            var labelWidth = Number.parseInt(this.getLabelElement().css('maxWidth'), 10);
            assert.strictEqual(labelWidth, newContainerWidth, 'label max width is updated');
          });
          QUnit.module('updateMode', function() {
            QUnit.module('markup visibility toggling', function() {
              QUnit.test('mode="hidden" removes label classes from editor element', function(assert) {
                this.label.updateMode('hidden');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'editor has no default label class');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'editor has no floating label class');
              });
              QUnit.test('mode not "hidden" adds label classes to editor element if text is not empty', function(assert) {
                this.reinit({mode: 'hidden'});
                this.label.updateMode('static');
                assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'editor has label class');
              });
            });
            QUnit.module('editor classes toggling', function() {
              QUnit.test('editor has correct class if mode is changed to "static"', function(assert) {
                this.reinit({mode: 'floating'});
                this.label.updateMode('static');
                assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has default label class');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has no floating label class');
              });
              QUnit.test('editor has correct class if mode is changed to "floating"', function(assert) {
                this.label.updateMode('floating');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has no default label class');
                assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has floating label class');
              });
              QUnit.test('editor has not label class if after mode changed to "hidden"', function(assert) {
                this.label.updateMode('hidden');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has no default label class');
                assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has no floating label class');
              });
            });
          });
          QUnit.module('isVisible', function() {
            QUnit.test('returns true if text is not empty and mode is not "hidden"', function(assert) {
              assert.strictEqual(this.label.isVisible(), true);
            });
            QUnit.test('return false if mode="hidden"', function(assert) {
              this.reinit({mode: 'hidden'});
              assert.strictEqual(this.label.isVisible(), false);
            });
            QUnit.test('return false if text is empty', function(assert) {
              this.reinit({text: ''});
              assert.strictEqual(this.label.isVisible(), false);
            });
          });
        });
        QUnit.module('adding classes to editor on init', function() {
          QUnit.test('editor has correct class if mode="static"', function(assert) {
            assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has default label class');
            assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has no floating label class');
          });
          QUnit.test('editor has correct class if mode="floating"', function(assert) {
            this.reinit({mode: 'floating'});
            assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has no default label class');
            assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has floating label class');
          });
          QUnit.test('editor has not label class if label is hidden', function(assert) {
            this.reinit({mode: 'hidden'});
            assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_LABEL_CLASS), 'has no default label class');
            assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS), 'has no floating label class');
          });
          QUnit.test('editor has no dx-texteditor-with-before-buttons class if containsButtonsBefore=false', function(assert) {
            assert.notOk(this.$editor.hasClass(TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS));
          });
          QUnit.test('editor has dx-texteditor-with-before-buttons class if containsButtonsBefore=true', function(assert) {
            this.reinit({containsButtonsBefore: true});
            assert.ok(this.$editor.hasClass(TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS));
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/text_box/ui.text_editor.label","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/text_box/ui.text_editor.label"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=textEditorLabel.tests.js.map