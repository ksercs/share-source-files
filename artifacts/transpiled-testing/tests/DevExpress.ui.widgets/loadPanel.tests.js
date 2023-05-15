!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/loadPanel.tests.js"], ["core/utils/size","jquery","../../helpers/keyboardMock.js","ui/widget/ui.errors","animation/fx","generic_light.css!","ui/load_panel"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/loadPanel.tests.js", ["core/utils/size", "jquery", "../../helpers/keyboardMock.js", "ui/widget/ui.errors", "animation/fx", "generic_light.css!", "ui/load_panel"], function($__export) {
  "use strict";
  var getOuterWidth,
      getOuterHeight,
      $,
      keyboardMock,
      uiErrors,
      fx,
      LOADPANEL_CLASS,
      LOADPANEL_MESSAGE_CLASS,
      MESSAGE_SELECTOR,
      LOADPANEL_CONTENT_CLASS,
      LOADPANEL_PANE_HIDDEN_CLASS;
  return {
    setters: [function($__m) {
      getOuterWidth = $__m.getOuterWidth;
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      uiErrors = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture" class="dx-viewport">\
            <div id="target" style="position: absolute; top: 0; left: 0; width: 100px; height: 100px;">\
                <div id="container">\
                    <div id="loadPanel" style="width: 100px; height: 100px;"></div>\
                    <div id="loadPanel2"></div>\
                </div>\
            </div>\
        </div>';
        $('#qunit-fixture').replaceWith(markup);
      });
      LOADPANEL_CLASS = 'dx-loadpanel';
      LOADPANEL_MESSAGE_CLASS = 'dx-loadpanel-message';
      MESSAGE_SELECTOR = '.' + LOADPANEL_MESSAGE_CLASS;
      LOADPANEL_CONTENT_CLASS = 'dx-loadpanel-content';
      LOADPANEL_PANE_HIDDEN_CLASS = 'dx-loadpanel-pane-hidden';
      QUnit.module('init', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('rendered markup', function(assert) {
          var $element = $('#loadPanel').dxLoadPanel({
            message: 'Test Loading Message',
            visible: true
          });
          var $content = $element.dxLoadPanel('instance').$content();
          assert.ok($element.hasClass(LOADPANEL_CLASS));
          assert.ok($content.hasClass(LOADPANEL_CONTENT_CLASS), 'Load Indicator created');
          assert.ok($content.find(MESSAGE_SELECTOR).length);
          assert.equal($content.find(MESSAGE_SELECTOR).text(), 'Test Loading Message');
        });
        QUnit.test('load panel created with templatesRenderAsynchronously option should be shown with delay', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var onShowingSpy = sinon.spy();
            var instance = $('#loadPanel').dxLoadPanel({
              templatesRenderAsynchronously: true,
              visible: true,
              onShowing: onShowingSpy
            }).dxLoadPanel('instance');
            assert.strictEqual(instance.option('templatesRenderAsynchronously'), true, 'templatesRenderAsynchronously option can be reassigned (T896267)');
            assert.strictEqual(onShowingSpy.called, false);
            clock.tick(10);
            assert.strictEqual(onShowingSpy.called, true);
          } finally {
            clock.restore();
          }
        });
        QUnit.test('shows on init if loading option is true', function(assert) {
          $('#loadPanel').dxLoadPanel({
            message: 'Test Loading Message',
            visible: true
          });
          assert.ok($('#loadPanel').is(':visible'));
        });
        QUnit.test('visible changes visibility', function(assert) {
          var $loadPanel = $('#loadPanel').dxLoadPanel({
            message: '',
            visible: false
          });
          var loadPanel = $loadPanel.dxLoadPanel('instance');
          var $content = loadPanel.$content();
          assert.ok(!$content.is(':visible'));
          loadPanel.option('visible', false);
          assert.ok(!$content.is(':visible'));
          loadPanel.option('visible', true);
          assert.ok($content.is(':visible'));
          loadPanel.option('visible', false);
          assert.ok($content.is(':hidden'));
        });
        QUnit.test('visible changes visibility option', function(assert) {
          var element = $('#loadPanel2').dxLoadPanel({
            visible: false,
            message: 'Text'
          });
          var $content = element.dxLoadPanel('instance').$content();
          var loadIndicator = element.dxLoadPanel('instance');
          assert.ok(!$content.is(':visible'));
          loadIndicator.option('visible', false);
          assert.ok(!$content.is(':visible'));
          loadIndicator.option('visible', true);
          assert.ok($content.is(':visible'));
          loadIndicator.option('visible', false);
          assert.ok($content.is(':hidden'));
        });
        QUnit.test('keep user defined position.of', function(assert) {
          var instance = $('#loadPanel').dxLoadPanel({
            targetContainer: '#container',
            position: {of: 'body'}
          }).dxLoadPanel('instance');
          assert.equal(instance.option('position.of'), 'body');
        });
        QUnit.test('widget should be rendered with non-existing target in position', function(assert) {
          assert.expect(0);
          $('#loadPanel').dxLoadPanel({
            visible: true,
            position: {of: '#non-exist'}
          }).dxLoadPanel('instance');
        });
        QUnit.module('Breaking change t1123711 - warning W1021', function() {
          QUnit.test('should be logged if container is invalid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#loadPanel').dxLoadPanel({
                container: 'invalid',
                visible: true
              });
              assert.ok(uiErrors.log.calledOnce, 'only one warning is logged');
              assert.deepEqual(uiErrors.log.lastCall.args, ['W1021', 'dxLoadPanel'], 'args of the log method');
            } finally {
              uiErrors.log.restore();
            }
          });
          QUnit.test('should not not be logged if container is valid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#loadPanel').dxLoadPanel({
                container: 'body',
                visible: true
              });
              assert.ok(uiErrors.log.notCalled, 'no warning is logged');
            } finally {
              uiErrors.log.restore();
            }
          });
        });
      });
      QUnit.module('options changed callbacks', {beforeEach: function() {
          this.element = $('#loadPanel').dxLoadPanel();
          this.instance = this.element.dxLoadPanel('instance');
        }}, function() {
        QUnit.test('message', function(assert) {
          this.instance.option('message', 'new message');
          this.instance.show();
          assert.equal(this.instance.$content().text(), 'new message');
        });
        QUnit.test('width/height', function(assert) {
          this.instance.option('visible', true);
          this.instance.option('width', 123);
          assert.equal(getOuterWidth(this.instance.$content()), 123);
          this.instance.option('height', 321);
          assert.equal(getOuterHeight(this.instance.$content()), 321);
        });
        QUnit.test('showIndicator option', function(assert) {
          var instance = this.element.dxLoadPanel({showIndicator: false}).dxLoadPanel('instance');
          var indicator = instance.$content().find('.dx-loadindicator');
          instance.show();
          assert.equal(indicator.length, 0, 'indicator is hidden');
          instance.option('showIndicator', true);
          indicator = instance.$content().find('.dx-loadindicator');
          assert.equal(indicator.length, 1, 'indicator is shown');
          instance.option('showIndicator', false);
          indicator = instance.$content().find('.dx-loadindicator');
          assert.equal(indicator.length, 0, 'indicator is hidden');
        });
        QUnit.test('showIndicator option change to true after change to false should render loadIndicator (T943765)', function(assert) {
          var instance = this.element.dxLoadPanel({
            showIndicator: true,
            visible: true
          }).dxLoadPanel('instance');
          instance.option('showIndicator', false);
          instance.option('showIndicator', true);
          var indicator = instance.$content().find('.dx-loadindicator');
          assert.equal(indicator.length, 1, 'indicator is shown');
        });
        QUnit.test('message option change should not hide loadIndicator (T943765)', function(assert) {
          var instance = this.element.dxLoadPanel({
            showIndicator: true,
            visible: true
          }).dxLoadPanel('instance');
          instance.option('message', 'new message');
          var indicator = instance.$content().find('.dx-loadindicator');
          assert.equal(indicator.length, 1, 'indicator is shown');
        });
        QUnit.test('showPane option', function(assert) {
          var instance = this.element.dxLoadPanel({showPane: true}).dxLoadPanel('instance');
          assert.ok(!instance.$content().hasClass(LOADPANEL_PANE_HIDDEN_CLASS));
          instance.option('showPane', false);
          assert.ok(instance.$content().hasClass(LOADPANEL_PANE_HIDDEN_CLASS));
          instance.option('showPane', true);
          assert.ok(!instance.$content().hasClass(LOADPANEL_PANE_HIDDEN_CLASS));
        });
        QUnit.test('LoadPanel with custom indicator', function(assert) {
          var url = '../../testing/content/customLoadIndicator.png';
          var instance = this.element.dxLoadPanel({
            showIndicator: true,
            indicatorSrc: url
          }).dxLoadPanel('instance');
          instance.show();
          var loadIndicatorInstance = this.instance.$content().find('.dx-loadindicator').dxLoadIndicator().dxLoadIndicator('instance');
          assert.equal(loadIndicatorInstance.option('indicatorSrc'), url, 'custom indicator option installed successfully');
          instance.option('indicatorSrc', '');
          assert.equal(instance.option('indicatorSrc'), loadIndicatorInstance.option('indicatorSrc'), 'custom indicator option changed successfully');
        });
        QUnit.test('indicatorSrc option change', function(assert) {
          var url = '../../testing/content/customLoadIndicator.png';
          var instance = this.element.dxLoadPanel({showIndicator: true}).dxLoadPanel('instance');
          instance.show();
          instance.option('indicatorSrc', url);
          var loadIndicatorInstance = this.instance.$content().find('.dx-loadindicator').dxLoadIndicator().dxLoadIndicator('instance');
          assert.strictEqual(loadIndicatorInstance.option('indicatorSrc'), url, 'custom indicator option installed successfully');
          instance.option('indicatorSrc', '');
          assert.equal(instance.option('indicatorSrc'), loadIndicatorInstance.option('indicatorSrc'), 'custom indicator option changed successfully');
        });
        QUnit.test('indicatorSrc option change when showIndicator is false', function(assert) {
          var url = '../../testing/content/customLoadIndicator.png';
          var instance = this.element.dxLoadPanel({}).dxLoadPanel('instance');
          instance.show();
          instance.option('indicatorSrc', url);
          instance.option('showIndicator', true);
          var loadIndicatorInstance = this.instance.$content().find('.dx-loadindicator').dxLoadIndicator().dxLoadIndicator('instance');
          assert.strictEqual(loadIndicatorInstance.option('indicatorSrc'), url, 'custom indicator option installed successfully');
        });
        QUnit.test('Load panel should not close on esc button when focusStateEnabled is true', function(assert) {
          var instance = this.element.dxLoadPanel({
            focusStateEnabled: true,
            width: 1,
            height: 1,
            visible: true
          }).dxLoadPanel('instance');
          var keyboard = keyboardMock(instance.$content());
          keyboard.keyDown('esc');
          assert.ok(instance.option('visible'), 'load panel stay visible after esc press');
        });
        QUnit.testInActiveWindow('Load panel with shading should grabbing focus from inputs under the shading when focusStateEnabled is true', function(assert) {
          var $input = $('<input/>').val('');
          try {
            var instance = this.element.dxLoadPanel({
              focusStateEnabled: true,
              shading: true,
              delay: 0,
              width: 1,
              height: 1
            }).dxLoadPanel('instance');
            $input.appendTo('body');
            $input.focus().focusin();
            instance.show();
            assert.equal(document.activeElement, instance.$content().get(0), 'load panel is focused');
          } finally {
            $input.remove();
          }
        });
      });
      QUnit.module('delay', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('option \'delay\' delays showing', function(assert) {
          var delayTimeout = 500;
          var $loadPanel = $('#loadPanel').dxLoadPanel({delay: delayTimeout});
          $loadPanel.dxLoadPanel('show');
          var $content = $loadPanel.dxLoadPanel('$content');
          assert.equal($content.is(':visible'), false, 'load panel showing delayed');
          this.clock.tick(delayTimeout);
          assert.equal($content.is(':visible'), true, 'load panel shown after delay');
        });
        QUnit.test('onShowing and onShown action delayed', function(assert) {
          var showingFired = 0;
          var shownFired = 0;
          var delayTimeout = 500;
          var $loadPanel = $('#loadPanel').dxLoadPanel({
            delay: delayTimeout,
            animation: null,
            onShowing: function() {
              showingFired++;
            },
            onShown: function() {
              shownFired++;
            }
          });
          $loadPanel.dxLoadPanel('show');
          assert.equal(showingFired, 0, 'showing action was not fired');
          assert.equal(shownFired, 0, 'shown action was not fired');
          this.clock.tick(delayTimeout);
          assert.equal(showingFired, 1, 'showing action was fired after delay timeout');
          assert.equal(shownFired, 1, 'shown action was fired after delay timeout');
        });
        QUnit.test('hiding rejects delayed showing', function(assert) {
          var delayTimeout = 500;
          var $loadPanel = $('#loadPanel').dxLoadPanel({delay: delayTimeout});
          var $content = $loadPanel.dxLoadPanel('$content');
          $loadPanel.dxLoadPanel('show');
          $loadPanel.dxLoadPanel('hide');
          this.clock.tick(delayTimeout);
          assert.equal($content.is(':visible'), false, 'load panel was not shown after hide');
        });
      });
      QUnit.module('default options', {beforeEach: function() {
          this.element = $('#loadPanel').dxLoadPanel({});
          this.instance = this.element.dxLoadPanel('instance');
        }}, function() {
        QUnit.test('"propagateOutsideClick" option by default should be set to true (T1085638)', function(assert) {
          assert.ok(this.instance.option('propagateOutsideClick'), true);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","../../helpers/keyboardMock.js","ui/widget/ui.errors","animation/fx","generic_light.css!","ui/load_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("../../helpers/keyboardMock.js"), require("ui/widget/ui.errors"), require("animation/fx"), require("generic_light.css!"), require("ui/load_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=loadPanel.tests.js.map