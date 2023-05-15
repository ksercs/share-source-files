!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/popupModule.tests.js"], ["jquery","ui/html_editor/modules/popup","core/utils/window"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/popupModule.tests.js", ["jquery", "ui/html_editor/modules/popup", "core/utils/window"], function($__export) {
  "use strict";
  var $,
      PopupModule,
      windowUtils,
      POPUP_CLASS,
      SUGGESTION_LIST_CLASS,
      SUGGESTION_LIST_WRAPPER_CLASS,
      MIN_HEIGHT,
      moduleConfig,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      PopupModule = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }],
    execute: function() {
      var $__5;
      POPUP_CLASS = 'dx-popup';
      SUGGESTION_LIST_CLASS = 'dx-suggestion-list';
      SUGGESTION_LIST_WRAPPER_CLASS = 'dx-suggestion-list-wrapper';
      MIN_HEIGHT = 100;
      moduleConfig = {
        beforeEach: function() {
          var $__4 = this;
          this.$element = $('#htmlEditor');
          this.clock = sinon.useFakeTimers();
          this.options = {editorInstance: {
              $element: function() {
                return $__4.$element;
              },
              _createComponent: function($element, widget, options) {
                return new widget($element, options);
              }
            }};
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      (($__5 = QUnit, test = $__5.test, $__5));
      QUnit.module('Popup module', moduleConfig, function() {
        test('Render Popup with a suggestion list', function(assert) {
          this.options.dataSource = ['Test1', 'Test2'];
          new PopupModule({}, this.options);
          var $popup = this.$element.children();
          var $suggestionList = $popup.find(("." + SUGGESTION_LIST_CLASS));
          var listDataSource = $suggestionList.dxList('option', 'dataSource');
          assert.ok($popup.hasClass(POPUP_CLASS), 'Popup rendered');
          assert.strictEqual($suggestionList.length, 1, 'Popup contains one suggestion list');
          assert.deepEqual(listDataSource, this.options.dataSource, 'List has a correct dataSource');
        });
        test('Show and hide popup on item selecting', function(assert) {
          this.options.dataSource = ['Test1', 'Test2'];
          var popupModule = new PopupModule({}, this.options);
          var insertEmbedContent = sinon.spy(popupModule, 'insertEmbedContent');
          popupModule.showPopup();
          this.clock.tick(10);
          var $suggestionList = $(("." + SUGGESTION_LIST_CLASS));
          var $suggestionListWrapper = $suggestionList.closest(("." + SUGGESTION_LIST_WRAPPER_CLASS));
          assert.strictEqual($suggestionListWrapper.length, 1, 'Suggestion list is wrapped by element with specific class');
          assert.ok($suggestionList.is(':visible'), 'list is visible');
          assert.strictEqual($suggestionList.length, 1, 'one list');
          assert.ok(insertEmbedContent.notCalled, 'ok');
          $suggestionList.find('.dx-list-item').first().trigger('dxclick');
          this.clock.tick(500);
          assert.ok(insertEmbedContent.calledOnce, 'ok');
          assert.notOk($suggestionList.is(':visible'), 'list isn\'t visible');
        });
        test('Save position and get position', function(assert) {
          var popupModule = new PopupModule({}, this.options);
          popupModule.savePosition(5);
          assert.strictEqual(popupModule.getPosition(), 5, 'correct position');
        });
        test('Max height should be a half of the window height', function(assert) {
          var windowStub = sinon.stub(windowUtils, 'getWindow').returns($('<div>').height(240));
          var popupModule = new PopupModule({}, this.options);
          assert.strictEqual(popupModule.maxHeight, 120, 'max height is a half of the window height');
          windowStub.restore();
        });
        test('Max height shouldn\'t less than a predefined threshold', function(assert) {
          var windowStub = sinon.stub(windowUtils, 'getWindow').returns($('<div>').height(80));
          var popupModule = new PopupModule({}, this.options);
          assert.strictEqual(popupModule.maxHeight, MIN_HEIGHT, 'Max height cannot be less than a threshold');
          windowStub.restore();
        });
        test('Popup should prevent editor focusout on mousedown event (T1063461)', function(assert) {
          var windowStub = sinon.stub(windowUtils, 'getWindow').returns($('<div>').height(80));
          var popupModule = new PopupModule({}, this.options);
          popupModule.showPopup();
          this.clock.tick(10);
          var $wrapper = $(popupModule._popup.$wrapper());
          $wrapper.on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'Default prevented');
          });
          $wrapper.trigger('mousedown');
          windowStub.restore();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor/modules/popup","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor/modules/popup"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popupModule.tests.js.map