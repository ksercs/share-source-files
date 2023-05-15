!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui/widget.tests.js"], ["jquery","ui/widget/ui.widget","core/component_registrator","core/devices","core/utils/extend","core/templates/template_base","core/templates/template","data_helper","data/data_source/data_source","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/config","core/element_data","core/utils/common","../../helpers/registerKeyHandlerTestHelper.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui/widget.tests.js", ["jquery", "ui/widget/ui.widget", "core/component_registrator", "core/devices", "core/utils/extend", "core/templates/template_base", "core/templates/template", "data_helper", "data/data_source/data_source", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "core/config", "core/element_data", "core/utils/common", "../../helpers/registerKeyHandlerTestHelper.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      Widget,
      registerComponent,
      devices,
      extend,
      TemplateBase,
      Template,
      DataHelperMixin,
      DataSource,
      keyboardMock,
      pointerMock,
      config,
      dataUtils,
      deferUpdate,
      registerKeyHandlerTestHelper,
      ACTIVE_STATE_CLASS,
      DISABLED_STATE_CLASS,
      HOVER_STATE_CLASS,
      FOCUSED_STATE_CLASS,
      FEEDBACK_SHOW_TIMEOUT,
      FEEDBACK_HIDE_TIMEOUT,
      RTL_CLASS,
      DxWidget;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Widget = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      TemplateBase = $__m.TemplateBase;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      DataHelperMixin = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {
      registerKeyHandlerTestHelper = $__m.default;
    }, function($__m) {}],
    execute: function() {
      ACTIVE_STATE_CLASS = 'dx-state-active';
      DISABLED_STATE_CLASS = 'dx-state-disabled';
      HOVER_STATE_CLASS = 'dx-state-hover';
      FOCUSED_STATE_CLASS = 'dx-state-focused';
      FEEDBACK_SHOW_TIMEOUT = 30;
      FEEDBACK_HIDE_TIMEOUT = 400;
      RTL_CLASS = 'dx-rtl';
      DxWidget = Widget.inherit({});
      registerComponent('dxWidget', DxWidget);
      QUnit.testStart(function() {
        var markup = "\n    <div id=\"widget\"></div>\n    <div id=\"another\"></div>\n    <div id=\"parentWrapper\">\n        <div id=\"wrappedWidget\"></div>\n    </div>\n    <div id=\"widthRootStyle\" style=\"width: 300px;\"></div>\n    <div id=\"widthRootStylePercent\" style=\"width: 50%;\"></div>\n\n    <div id=\"container\">\n        <div data-options=\"dxTemplate: { name: 'item' }\">item template content</div>\n        <div data-options=\"dxTemplate: { name: 'group' }\">group template content</div>\n        <table data-options=\"dxTemplate: { name: 'rowItem' }\"><tr><td>item template content</td></tr></table>\n    </div>\n\n    <div id=\"container2\">\n        <div data-options=\"dxTemplate: { name: 'item' }\">item template content</div>\n        <div data-options=\"dxTemplate: { name: 'group' }\">group template content</div>\n    </div>\n\n    <div id=\"container-custom-config\">\n        <div data-options='{ \"dxTemplate\": { \"name\": \"item\" } }'>item template content</div>\n        <div data-options='{ \"dxTemplate\": { \"name\": \"group\" } }'>group template content</div>\n    </div>\n\n    <div id=\"externalContainer\">\n        <div data-options=\"dxTemplate: { name: 'item1' }\">template content</div>\n        <div data-options=\"dxTemplate: { name: 'group2' }\">template content</div>\n    </div>\n\n    <div id=\"jQueryContainerWidget\">\n        <div id=\"innerWidget\"></div>\n    </div>\n\n    <div id=\"platformSpecificContainer\">\n        <div data-options=\"dxTemplate: { name: 'item', platform: 'generic' }\">generic</div>\n        <div data-options=\"dxTemplate: { name: 'item', platform: 'ios' }\">ios</div>\n        <div data-options=\"dxTemplate: { name: 'item' }\">common</div>\n    </div>\n\n    <div id=\"platformSpecificContainer2\">\n        <div data-options=\"dxTemplate: { name: 'item', platform: 'ios' }\">ios</div>\n        <div data-options=\"dxTemplate: { name: 'item', platform: 'ios' }\">ios2</div>\n    </div>\n\n    <script type=\"text/html\" id=\"scriptTemplate\">\n        <div class=\"myTemplate\"></div>\n    </script>\n\n    <div id=\"widgetWithScriptInTemplate\">\n        Text\n        <script></script>\n    </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('render', {}, function() {
        QUnit.test('visibility change handling works optimally', function(assert) {
          var hidingFired = 0;
          var shownFired = 0;
          var visibilityChanged = function(visible) {
            visible ? shownFired++ : hidingFired++;
          };
          var TestWidget = Widget.inherit({
            NAME: 'TestWidget1',
            _visibilityChanged: visibilityChanged
          });
          var $element = $('#widget');
          var component = new TestWidget($element, {visible: false});
          assert.equal(hidingFired, 0, 'hidden is not fired initially');
          assert.equal(shownFired, 0, 'shown is not fired initially');
          $element.triggerHandler('dxhiding');
          $element.triggerHandler('dxshown');
          assert.equal(hidingFired, 0, 'hidden is not fired if visible option is false');
          assert.equal(shownFired, 0, 'shown is not fired if visible option is false');
          component.option('visible', true);
          assert.equal(hidingFired, 0, 'hidden is not fired if visible option is changed to true');
          assert.equal(shownFired, 1, 'shown is fired if visible option is changed to true');
          $element.triggerHandler('dxshown');
          $element.triggerHandler('dxshown');
          assert.equal(shownFired, 1, 'shown is not fired if dxshown is fired after visible was changed to true');
          $element.triggerHandler('dxhiding');
          $element.triggerHandler('dxhiding');
          assert.equal(hidingFired, 1, 'hidden is fired only once if dxhiding is fired when widget is visible');
          component.option('visible', false);
          assert.equal(hidingFired, 1, 'hidden is not fired if visible was changed after hiding');
        });
        QUnit.test('option \'hoverStateEnabled\' - default', function(assert) {
          var element = $('#widget').dxWidget();
          var instance = element.dxWidget('instance');
          element.trigger('dxhoverstart');
          assert.ok(!instance.option('hoverStateEnabled'));
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          instance.option('hoverStateEnabled', true);
          element.trigger('dxhoverstart');
          assert.ok(element.hasClass(HOVER_STATE_CLASS));
        });
        QUnit.test('option \'hoverStateEnabled\' when disabled', function(assert) {
          var element = $('#widget').dxWidget({
            hoverStateEnabled: true,
            disabled: true
          });
          var instance = element.dxWidget('instance');
          element.trigger('dxhoverstart');
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          instance.option('disabled', false);
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          element.trigger('dxhoverstart');
          assert.ok(element.hasClass(HOVER_STATE_CLASS));
          instance.option('disabled', true);
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          element.trigger('dxhoverend');
          instance.option('disabled', false);
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
        });
        QUnit.test('option onFocusIn/onFocusOut', function(assert) {
          var focusInHandled = false;
          var focusOutHandled = false;
          var $element = $('#widget').dxWidget({
            focusStateEnabled: true,
            onFocusIn: function() {
              focusInHandled = true;
            },
            onFocusOut: function() {
              focusOutHandled = true;
            }
          });
          $element.focusin();
          assert.ok(focusInHandled, 'focusIn action was fired');
          $element.focusout();
          assert.ok(focusOutHandled, 'focusOut action was fired');
        });
        QUnit.test('focusout should fired even in disabled container', function(assert) {
          var focusOutHandled = false;
          var $container = $('<div>').appendTo('#qunit-fixture');
          var $element = $('<div>').appendTo($container).dxWidget({
            focusStateEnabled: true,
            onFocusOut: function() {
              focusOutHandled = true;
            }
          });
          $element.focusin();
          $container.addClass('dx-state-disabled');
          $element.focusout();
          assert.ok(focusOutHandled, 'focusOut action was fired');
        });
        ['FocusIn', 'FocusOut'].forEach(function(focusEvent) {
          QUnit.test(("widget should not fire the on" + focusEvent + " event in case the original event is prevented"), function(assert) {
            var $__3;
            var stubHandler = sinon.stub();
            var optionName = ("on" + focusEvent);
            var $element = $('#widget').dxWidget(($__3 = {}, Object.defineProperty($__3, "focusStateEnabled", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, optionName, {
              value: stubHandler,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var event = $.Event(focusEvent.toLowerCase());
            $element.trigger(event);
            assert.ok(stubHandler.calledOnce, ("on" + focusEvent + " action was fired"));
            event.preventDefault();
            $element.trigger(event);
            assert.ok(stubHandler.calledOnce, ("on" + focusEvent + " action wasn't fired"));
          });
          QUnit.test(("widget should not fire the on" + focusEvent + " event in case the original event is prevented after subscribe at runtime"), function(assert) {
            var stubHandler = sinon.stub();
            var dxEventName = 'f' + focusEvent.substring(1);
            var $element = $('#widget').dxWidget({focusStateEnabled: true});
            $element.dxWidget('on', dxEventName, stubHandler);
            var event = $.Event(focusEvent.toLowerCase());
            $element.trigger(event);
            assert.ok(stubHandler.calledOnce, ("on" + focusEvent + " action was fired"));
            event.preventDefault();
            $element.trigger(event);
            assert.ok(stubHandler.calledOnce, ("on" + focusEvent + " action wasn't fired"));
          });
        });
        QUnit.test('widget has class dx-state-hover when child widget lose cursor', function(assert) {
          var parentElement = $('#jQueryContainerWidget').dxWidget();
          var parentInstance = parentElement.dxWidget('instance');
          parentInstance.option('hoverStateEnabled', true);
          var childElement = $('<div>').appendTo($('#jQueryContainerWidget')).dxWidget();
          var childInstance = childElement.dxWidget('instance');
          childInstance.option('hoverStateEnabled', true);
          parentElement.trigger('dxhoverstart');
          assert.ok(parentElement.hasClass(HOVER_STATE_CLASS));
          childElement.trigger('dxhoverstart');
          assert.ok(childElement.hasClass(HOVER_STATE_CLASS));
          childElement.trigger('dxhoverend');
          assert.ok(!childElement.hasClass(HOVER_STATE_CLASS));
          assert.ok(parentElement.hasClass(HOVER_STATE_CLASS));
        });
        QUnit.test('options \'width\'&\'height\'', function(assert) {
          var element = $('#widget').dxWidget();
          var instance = element.dxWidget('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual(instance.option('height'), undefined);
          instance.option({
            width: 50,
            height: 50
          });
          assert.equal(element.width(), 50);
          assert.equal(element.height(), 50);
        });
        QUnit.test('set dimensions on create', function(assert) {
          var element = $('#widget').dxWidget({
            width: 50,
            height: 50
          });
          assert.equal(element.width(), 50);
          assert.equal(element.height(), 50);
        });
        QUnit.test('check that width include borders, paddings', function(assert) {
          var element = $('#widget').css({
            border: '1px solid red',
            padding: '3px'
          }).dxWidget();
          var instance = element.dxWidget('instance');
          instance.option('width', 100);
          instance.option('height', 150);
          assert.equal(element.outerWidth(), 100);
          assert.equal(element.outerHeight(), 150);
        });
        QUnit.test('set dimensions in percent, parent element have dimensions', function(assert) {
          $('#parentWrapper').css({
            width: 400,
            height: 200
          });
          var element = $('#wrappedWidget').dxWidget();
          var instance = element.dxWidget('instance');
          var $parentElement = $('#parentWrapper');
          instance.option('width', '50%');
          instance.option('height', '40%');
          assert.equal(element.outerWidth(), $parentElement.width() * 0.5);
          assert.equal(element.outerHeight(), $parentElement.height() * 0.4);
        });
        QUnit.test('set dimensions as function', function(assert) {
          var element = $('#widget').dxWidget();
          var instance = element.dxWidget('instance');
          instance.option('width', function() {
            return 50;
          });
          instance.option('height', function() {
            return 100;
          });
          assert.equal(element.outerWidth(), 50);
          assert.equal(element.outerHeight(), 100);
        });
        QUnit.test('\'disabled\' option has \'false\' value by default', function(assert) {
          var instance = $('#widget').dxWidget().dxWidget('instance');
          assert.strictEqual(instance.option('disabled'), false);
        });
        QUnit.test('accessKey option', function(assert) {
          var $widget = $('#widget').dxWidget({
            focusStateEnabled: true,
            accessKey: 'y'
          });
          assert.equal($widget.attr('accesskey'), 'y', 'widget element has accesskey attribute');
        });
        QUnit.test('accessKey option changed', function(assert) {
          var $widget = $('#widget').dxWidget({
            focusStateEnabled: true,
            accessKey: 'y'
          });
          var instance = $widget.dxWidget('instance');
          instance.option('accessKey', 'g');
          assert.equal($widget.attr('accesskey'), 'g', 'widget option has been changed successfully');
        });
        QUnit.test('dxWidget on a custom node is a block DOM node', function(assert) {
          var $element = $('<custom-node/>').appendTo('#qunit-fixture');
          new DxWidget($element);
          assert.equal($element.css('display'), 'block');
        });
        QUnit.test('option \'rtl\'', function(assert) {
          var $element = $('#widget').dxWidget();
          var instance = $element.dxWidget('instance');
          assert.ok(!$element.hasClass(RTL_CLASS));
          instance.option('rtlEnabled', true);
          assert.ok($element.hasClass(RTL_CLASS));
        });
        QUnit.test('init option \'rtl\' is true', function(assert) {
          var $element = $('#widget').dxWidget({rtlEnabled: true});
          var instance = $element.dxWidget('instance');
          assert.ok($element.hasClass(RTL_CLASS));
          instance.option('rtlEnabled', false);
          assert.ok(!$element.hasClass(RTL_CLASS));
        });
        QUnit.test('\'hint\' option has \'undefined\' value by default', function(assert) {
          var instance = $('#widget').dxWidget().dxWidget('instance');
          assert.equal(instance.option('hint'), undefined);
        });
        QUnit.test('init with ignoreParentReadOnly option', function(assert) {
          var $element = $('#widget').dxWidget({ignoreParentReadOnly: true});
          assert.ok($element.hasClass('dx-state-independent'), 'button with icon has icon class');
        });
        QUnit.test('ignoreParentReadOnly option change', function(assert) {
          var element = $('#widget');
          var instance = element.dxWidget({}).dxWidget('instance');
          assert.notOk(element.hasClass('dx-state-independent'));
          instance.option({ignoreParentReadOnly: true});
          assert.ok(element.hasClass('dx-state-independent'));
          instance.option({ignoreParentReadOnly: false});
          assert.notOk(element.hasClass('dx-state-independent'));
        });
      });
      QUnit.module('API', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('\'repaint\' method refreshes widget by default', function(assert) {
          var NewWidget = Widget.inherit({
            NAME: 'Widget',
            _render: function() {
              this.$element().append('<div></div>');
            }
          });
          var element = $('#widget');
          var instance = new NewWidget('#widget');
          assert.ok($.isFunction(instance.repaint));
          var children = element.children();
          instance.repaint();
          assert.ok(!children.is(element.children()));
        });
        QUnit.testInActiveWindow('\'focus\' method focus widget', function(assert) {
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          var instance = $element.dxWidget('instance');
          var $anotherElement = $('#another').dxWidget({focusStateEnabled: true});
          var anotherInstance = $anotherElement.dxWidget('instance');
          assert.ok($.isFunction(instance.focus), 'focus method exist');
          anotherInstance.focus();
          assert.ok($anotherElement.hasClass(FOCUSED_STATE_CLASS), '\'focus\' method focus the widget');
          instance.focus();
          assert.ok($element.hasClass(FOCUSED_STATE_CLASS), '\'focus\' method focus another widget');
          assert.ok(!$anotherElement.hasClass(FOCUSED_STATE_CLASS), '\'focus\' blur focus from another widget');
        });
      });
      QUnit.module('actions', {}, function() {
        QUnit.test('onOptionChanged should be triggered when widget is disabled', function(assert) {
          var $element = $('#widget').dxWidget({
            disabled: true,
            onOptionChanged: function() {
              assert.ok(true);
            }
          });
          var instance = $element.dxWidget('instance');
          instance.option('option1', true);
        });
        QUnit.test('onDisposing should be triggered when widget is disabled', function(assert) {
          var $element = $('#widget').dxWidget({
            disabled: true,
            onDisposing: function() {
              assert.ok(true);
            }
          });
          $element.remove();
        });
      });
      QUnit.module('ui feedback', {
        beforeEach: function() {
          this.element = $('#widget');
          this.mouse = pointerMock(this.element);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('option activeStateEnabled', function(assert) {
          var element = this.element.dxWidget({activeStateEnabled: true});
          var instance = element.dxWidget('instance');
          assert.ok(!element.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.active();
          assert.ok(element.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(!element.hasClass(ACTIVE_STATE_CLASS));
          instance.option('activeStateEnabled', true);
          assert.ok(!element.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.active();
          assert.ok(element.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(!element.hasClass(ACTIVE_STATE_CLASS));
        });
        QUnit.test('active state should be cleared after repaint', function(assert) {
          var element = this.element.dxWidget({activeStateEnabled: true});
          var instance = element.dxWidget('instance');
          this.mouse.active();
          instance.repaint();
          assert.notOk(element.hasClass(ACTIVE_STATE_CLASS));
        });
        QUnit.test('widget with ui feedback support, disabled state', function(assert) {
          var el = this.element.dxWidget({
            activeStateEnabled: true,
            disabled: true
          });
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          this.mouse.active();
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
        });
        QUnit.test('widget with ui feedback support, disabled option changing', function(assert) {
          var el = this.element.dxWidget({
            activeStateEnabled: true,
            disabled: true
          });
          var instance = el.dxWidget('instance');
          instance.option('disabled', false);
          assert.ok(!el.hasClass(DISABLED_STATE_CLASS));
          this.mouse.active();
          assert.ok(!el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(el.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(!el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          instance.option('disabled', true);
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          this.mouse.active();
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
        });
        QUnit.test('widget with ui feedback support, disabled option changing after mousedown', function(assert) {
          var el = this.element.dxWidget({activeStateEnabled: true});
          var instance = el.dxWidget('instance');
          this.mouse.start('touch').down();
          instance.option('disabled', true);
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          this.mouse.up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok(el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.start('touch').down();
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          instance.option('disabled', false);
          assert.ok(!el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
          this.mouse.up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
          assert.ok(!el.hasClass(DISABLED_STATE_CLASS));
          assert.ok(!el.hasClass(ACTIVE_STATE_CLASS));
        });
        QUnit.test('remove hover state on mouse down', function(assert) {
          var element = this.element.dxWidget({
            hoverStateEnabled: true,
            activeStateEnabled: true
          });
          var instance = element.dxWidget('instance');
          element.trigger('dxhoverstart');
          this.mouse.active();
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(element.hasClass(HOVER_STATE_CLASS));
          instance.option('disabled', false);
          this.mouse.active();
          assert.ok(!element.hasClass(DISABLED_STATE_CLASS));
          this.mouse.inactive();
          assert.ok(!element.hasClass(DISABLED_STATE_CLASS));
        });
        QUnit.test('activeElement should be reset after widget dispose', function(assert) {
          assert.expect(0);
          var el = this.element.dxWidget({activeStateEnabled: true});
          this.mouse.start().down();
          this.clock.tick(FEEDBACK_SHOW_TIMEOUT);
          el.remove();
          el = $('<div />').appendTo('#qunit-fixture').dxWidget({activeStateEnabled: true});
          pointerMock(el).start('touch').down().up();
          this.clock.tick(FEEDBACK_HIDE_TIMEOUT);
        });
        QUnit.test('set disabled of one widget doesn\'t turn off the feedback of another active element', function(assert) {
          var activeEl = this.element.dxWidget({activeStateEnabled: true});
          var disablingEl = $('<div />').appendTo('#qunit-fixture').dxWidget({activeStateEnabled: true});
          this.mouse.active();
          assert.equal(activeEl.hasClass(ACTIVE_STATE_CLASS), true);
          disablingEl.dxWidget('instance').option('disabled', true);
          assert.equal(activeEl.hasClass(ACTIVE_STATE_CLASS), true);
          this.mouse.inactive();
          assert.equal(activeEl.hasClass(ACTIVE_STATE_CLASS), false);
        });
        QUnit.test('disabled state does not works correctly during click (B233180)', function(assert) {
          var clicked = 0;
          var element = $('#slider').dxWidget({
            disabled: true,
            clickAction: function() {
              clicked++;
            }
          });
          pointerMock(element).start().click();
          assert.equal(clicked, 0);
        });
        QUnit.test('hover state on dxhoverstart/dxhoverend', function(assert) {
          var element = $('#widget').dxWidget({hoverStateEnabled: true});
          assert.ok(!element.hasClass(HOVER_STATE_CLASS), 'element has not class dx-hover-state');
          element.trigger('dxhoverstart');
          assert.ok(element.hasClass(HOVER_STATE_CLASS), 'element has class dx-hover-state after dxhoverstart');
          element.trigger('dxhoverend');
          assert.ok(!element.hasClass(HOVER_STATE_CLASS), 'element has not class dx-hover-state after dxhoverend');
        });
        QUnit.test('hover state with option hoverStateEnabled - false', function(assert) {
          var element = $('#widget').dxWidget({hoverStateEnabled: false});
          assert.ok(!element.hasClass(HOVER_STATE_CLASS), 'element has not hover class');
          element.trigger('dxhoverstart');
          assert.ok(!element.hasClass(HOVER_STATE_CLASS), 'element has not hover class after hover');
        });
        QUnit.test('hover state with option hoverStateEnabled - true/false', function(assert) {
          var element = $('#widget').dxWidget({hoverStateEnabled: true});
          var instance = element.dxWidget('instance');
          assert.ok(!element.hasClass(HOVER_STATE_CLASS));
          element.trigger('dxhoverstart');
          assert.ok(element.hasClass(HOVER_STATE_CLASS), 'element has hover after dxhoverstart');
          instance.option('hoverStateEnabled', false);
          assert.ok(!element.hasClass(HOVER_STATE_CLASS), 'element has not hover after change hoverStateEnabled to false');
        });
        QUnit.test('hover state on dxhoverstart/dxhoverend on nested elements by _activeStateUnit', function(assert) {
          if (!devices.real().generic) {
            assert.ok(true, 'hover, triggered by dxpointerenter, does not work on mobile devices');
            return;
          }
          var element = $('#widget').dxWidget({hoverStateEnabled: false});
          var instance = element.dxWidget('instance');
          var item1 = $('<div>').addClass('widget-item-hover');
          var item2 = $('<div>').addClass('widget-item-hover');
          instance.$element().append(item1).append(item2);
          instance._activeStateUnit = '.widget-item-hover';
          instance.option('hoverStateEnabled', true);
          element.trigger({
            target: item1.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.equal(item1.hasClass(HOVER_STATE_CLASS), true, 'first element has hovered class after hover');
          assert.equal(item2.hasClass(HOVER_STATE_CLASS), false, 'second element has not hovered class after hover on first');
          element.trigger({
            target: item2.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.equal(item1.hasClass(HOVER_STATE_CLASS), false, 'first element has not hovered class after hover on second');
          assert.equal(item2.hasClass(HOVER_STATE_CLASS), true, 'second element has hovered class after hover');
        });
        QUnit.test('allow to use widget CSS classes (T145015)', function(assert) {
          assert.expect(0);
          var element = $('#widget').addClass('dx-test');
          element.trigger('dxpointerdown').trigger('dxpointerup').trigger('dxclick');
        });
      });
      QUnit.module('widget sizing render', {}, function() {
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxWidget({width: 1234});
          var instance = $element.dxWidget('instance');
          assert.strictEqual(instance.option('width'), 1234);
          assert.strictEqual($element.outerWidth(), 1234, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom percent width and option', function(assert) {
          var $element = $('#widthRootStylePercent').dxWidget({width: '70%'});
          assert.strictEqual($element[0].style.width, '70%');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxWidget();
          var instance = $element.dxWidget('instance');
          var customWidth = 1234;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('templates support', {}, function() {
        var TestContainer = Widget.inherit({
          NAME: 'TestContainer',
          _renderContentImpl: function() {
            if (this.option('integrationOptions.templates').template) {
              this.option('integrationOptions.templates').template.render({container: this.$element()});
            }
          }
        });
        registerComponent('TestContainer', TestContainer);
        QUnit.test('internal template collection', function(assert) {
          var testContainer = new TestContainer('#container', {});
          var templateCollection = testContainer.option('integrationOptions.templates');
          assert.ok(templateCollection['item'] instanceof Template);
          assert.ok(templateCollection['group'] instanceof Template);
        });
        QUnit.test('internal template as name (string)', function(assert) {
          var testContainer = new TestContainer('#container', {
            template1: 'item',
            template2: 'group'
          });
          var templateCollection = testContainer.option('integrationOptions.templates');
          assert.strictEqual(testContainer._getTemplateByOption('template1'), templateCollection['item']);
          assert.strictEqual(testContainer._getTemplateByOption('template2'), templateCollection['group']);
        });
        QUnit.test('internal row template as name (string)', function(assert) {
          var testContainer = new TestContainer('#container', {rowTemplate: 'rowItem'});
          var $row = testContainer._getTemplateByOption('rowTemplate').render();
          assert.strictEqual($row.length, 1, 'one element is rendered');
          assert.strictEqual($row[0].tagName, 'TR', 'tr is rendered');
          assert.strictEqual($row.html(), '<td>item template content</td>', 'tr contains td with content');
        });
        QUnit.test('internal template as function returning name', function(assert) {
          var testContainer = new TestContainer('#container', {
            template1: function() {
              return 'item';
            },
            template2: function() {
              return 'group';
            }
          });
          assert.strictEqual(testContainer._getTemplateByOption('template1').render().text(), 'item template content');
          assert.strictEqual(testContainer._getTemplateByOption('template2').render().text(), 'group template content');
        });
        QUnit.test('external template as DOM Element', function(assert) {
          var testContainer = new TestContainer('#container', {template: $('[data-options*=dxTemplate]').get(0)});
          assert.ok(testContainer._getTemplateByOption('template') instanceof Template);
        });
        QUnit.test('external template as jQuery', function(assert) {
          var testContainer = new TestContainer('#container', {template: $('[data-options*=dxTemplate]')});
          assert.ok(testContainer._getTemplateByOption('template') instanceof Template);
        });
        QUnit.test('external template as script element', function(assert) {
          var testContainer = new TestContainer('#container', {template: $('#scriptTemplate')});
          var template = testContainer._getTemplateByOption('template');
          assert.ok(template instanceof Template);
          assert.ok(template.render().is('.myTemplate'));
        });
        QUnit.test('external custom template should call onRendered method without templatesRenderAsynchronously', function(assert) {
          var templateRenderer = function() {
            return this.name;
          };
          var onRenderedHandler = sinon.spy();
          var testContainer = new TestContainer('#container', {
            templatesRenderAsynchronously: false,
            integrationOptions: {templates: {'testTemplate': {
                  name: 'TestTemplate',
                  render: templateRenderer
                }}},
            template: 'testTemplate'
          });
          var template = testContainer._getTemplateByOption('template');
          var renderResult = template.render({onRendered: onRenderedHandler});
          assert.equal(template.name, 'TestTemplate', 'template is correct');
          assert.equal(renderResult, 'TestTemplate', 'render method should have correct context');
          assert.equal(onRenderedHandler.callCount, 1, 'onRendered has been called');
          assert.equal(testContainer.option('integrationOptions.templates').testTemplate.render, templateRenderer, 'template renderer is preserved');
        });
        QUnit.test('external custom template should call onRendered method without templatesRenderAsynchronously (template.render exists)', function(assert) {
          var onRenderedHandler = sinon.spy();
          var testContainer = new TestContainer('#container', {
            templatesRenderAsynchronously: false,
            template: {render: function() {
                return 'template result';
              }}
          });
          var template = testContainer._getTemplateByOption('template');
          var renderResult = template.render({onRendered: onRenderedHandler});
          assert.equal(renderResult, 'template result', 'render method should have correct context');
          assert.equal(onRenderedHandler.callCount, 1, 'onRendered has been called');
        });
        QUnit.test('external custom template should not call onRendered method with templatesRenderAsynchronously (template.render exists)', function(assert) {
          var onRenderedHandler = sinon.spy();
          var testContainer = new TestContainer('#container', {
            templatesRenderAsynchronously: true,
            template: {render: function() {
                return 'template result';
              }}
          });
          var template = testContainer._getTemplateByOption('template');
          var renderResult = template.render({onRendered: onRenderedHandler});
          assert.equal(renderResult, 'template result', 'render method should have correct context');
          assert.equal(onRenderedHandler.callCount, 0, 'onRendered has been called');
        });
        QUnit.test('shared external template as script element', function(assert) {
          var testContainer1 = new TestContainer('#container', {template: $('#scriptTemplate')});
          var template1 = testContainer1._getTemplateByOption('template');
          assert.ok(template1 instanceof Template);
          assert.ok(template1.render().is('.myTemplate'));
          var testContainer2 = new TestContainer('#container2', {template: $('#scriptTemplate')});
          var template2 = testContainer2._getTemplateByOption('template');
          assert.ok(template2 instanceof Template);
          assert.ok(template2.render().is('.myTemplate'));
        });
        QUnit.test('external template as function returning element', function(assert) {
          var testContainer = new TestContainer('#container', {template: function() {
              return $('#scriptTemplate');
            }});
          var template = testContainer._getTemplateByOption('template');
          assert.ok(template instanceof TemplateBase);
          assert.ok(template.render().is('.myTemplate'));
        });
        QUnit.test('named template should be cut', function(assert) {
          new TestContainer('#container', {});
          assert.equal($('#container').contents().filter(function(_, el) {
            return el.nodeType === 1;
          }).length, 0);
        });
        QUnit.test('anonymous template should be cut even if it contain script tag', function(assert) {
          new TestContainer('#widgetWithScriptInTemplate', {});
          assert.equal($('#widgetWithScriptInTemplate').contents().filter(function(_, el) {
            return el.nodeType === 1;
          }).length, 1);
        });
        QUnit.test('shared template as Template instance', function(assert) {
          var template = new Template();
          var testContainer = new TestContainer('#container', {myTemplate: template});
          assert.strictEqual(testContainer._getTemplateByOption('myTemplate'), template);
        });
        QUnit.test('shared template as Template interface', function(assert) {
          var renderHandler = sinon.spy();
          var template = {render: renderHandler};
          var fakeTemplate = {fakeRender: function() {}};
          var testContainer = new TestContainer('#container', {myTemplate: template});
          testContainer._getTemplateByOption('myTemplate').render();
          assert.deepEqual(renderHandler.callCount, 1, 'object with render function acquired as template');
          testContainer = new TestContainer('#container', {myTemplate: fakeTemplate});
          assert.notDeepEqual(testContainer._getTemplateByOption('myTemplate'), fakeTemplate);
        });
        QUnit.test('template should not be rendered if function return null or undefined', function(assert) {
          var testContainer = new TestContainer('#container', {
            nullTemplate: function() {
              return null;
            },
            undefinedTemplate: function() {
              return;
            }
          });
          var nullTemplate = testContainer._getTemplateByOption('nullTemplate');
          var undefinedTemplate = testContainer._getTemplateByOption('undefinedTemplate');
          assert.equal(nullTemplate.render().length, 0, 'null template not rendered');
          assert.equal(undefinedTemplate.render().length, 0, 'undefined template not rendered');
        });
        QUnit.test('dynamically created with function template should be removed after rendering', function(assert) {
          try {
            var text = 'some text template';
            var disposed = false;
            Template.prototype.dispose = function() {
              if ($.trim(this.render({
                model: {},
                container: $('<div>')
              }).text()) === text) {
                disposed = true;
              }
            };
            var testContainer = new TestContainer('#container', {template: function() {
                return text;
              }});
            var template = testContainer._getTemplateByOption('template');
            template.render({
              model: {},
              container: $('<div>')
            });
            assert.ok(disposed, 'template was disposed');
          } finally {
            delete Template.prototype.dispose;
          }
        });
        QUnit.test('dynamically created with function template should not be removed after rendering if it has another owner', function(assert) {
          var $__2 = this;
          try {
            var text = 'some text template';
            var disposed = false;
            Template.prototype.dispose = function() {
              if ($.trim($__2.render({
                model: {},
                container: $('<div>')
              }).text()) === text) {
                disposed = true;
              }
            };
            var testContainer = new TestContainer('#container', {
              ownedTemplate: text,
              template: function() {
                return testContainer._getTemplateByOption('ownedTemplate');
              }
            });
            var template = testContainer._getTemplateByOption('template');
            template.render({
              model: {},
              container: $('<div>')
            });
            assert.ok(!disposed, 'template won\'t disposed');
          } finally {
            delete Template.prototype.dispose;
          }
        });
        $.each({
          string: 'custom text',
          element: $('<span>')
        }, function(name, data) {
          QUnit.test('dynamically created from ' + name + ' template should be removed after rendering', function(assert) {
            var disposed = false;
            var testContainer = new TestContainer('#container', {template: data});
            var template = testContainer._getTemplateByOption('template');
            template.dispose = function() {
              disposed = true;
            };
            testContainer.$element().remove();
            assert.ok(disposed, 'template disposed');
          });
        });
        $.each({
          node: document.createElement('span'),
          jquery: $('<span>')
        }, function(name, element) {
          if (name === 'jquery') {
            element = element.get(0);
          }
          QUnit.test('dynamically created ' + name + ' template should save data associated with it', function(assert) {
            dataUtils.data(element, 'key', 'value');
            var testContainer = new TestContainer('#container', {template: function() {
                return element;
              }});
            var template = testContainer._getTemplateByOption('template');
            assert.equal(template.render().data('key'), 'value', 'data was not removed');
          });
        });
        QUnit.test('custom config parser', function(assert) {
          var originalParser = config().optionsParser;
          config({optionsParser: JSON.parse});
          var testContainer;
          try {
            testContainer = new TestContainer('#container-custom-config', {});
          } finally {
            config({optionsParser: originalParser});
          }
          var templateCollection = testContainer.option('integrationOptions.templates');
          assert.ok(templateCollection['item'] instanceof Template);
          assert.ok(templateCollection['group'] instanceof Template);
        });
      });
      QUnit.module('templates caching', {beforeEach: function() {
          var $__2 = this;
          this.compileCalled = 0;
          this.integrationOptions = {createTemplate: function(source) {
              $__2.compileCalled++;
              return {render: function() {
                  return source.contents();
                }};
            }};
          this.TestContainer = Widget.inherit({
            NAME: 'TestContainer',
            _renderContentImpl: function() {
              this._getTemplateByOption('template').render({container: this.$element()});
            }
          });
          $('<script id=\'external-template\' type=\'text/html\'>template string</script>').appendTo('#qunit-fixture');
        }}, function() {
        QUnit.test('template defined by jquery should be cached', function(assert) {
          var testContainer = new this.TestContainer($('<div>').appendTo('#qunit-fixture'), {
            integrationOptions: this.integrationOptions,
            template: $('#external-template')
          });
          testContainer.repaint();
          assert.equal(this.compileCalled, 1);
        });
        QUnit.test('template defined by string should be cached', function(assert) {
          var testContainer = new this.TestContainer($('<div>').appendTo('#qunit-fixture'), {
            integrationOptions: this.integrationOptions,
            template: '#external-template'
          });
          testContainer.repaint();
          assert.equal(this.compileCalled, 1);
        });
      });
      QUnit.module('platform specific templates', {
        beforeEach: function() {
          var TestContainerWidget = Widget.inherit({
            NAME: 'TestContainerWidget',
            _renderContentImpl: function() {
              if (this.option('integrationOptions.templates')['item']) {
                this.option('integrationOptions.templates')['item'].render({container: this.$element()});
              }
            }
          });
          registerComponent('TestContainerWidget', TestContainerWidget);
          this.currentDevice = devices.current();
        },
        afterEach: function() {
          delete $.fn['TestContainerWidget'];
          devices.current(this.currentDevice);
        }
      }, function() {
        QUnit.test('init template depends on platform', function(assert) {
          devices.current({platform: 'ios'});
          var $testContainer = $('#platformSpecificContainer').TestContainerWidget();
          assert.equal($testContainer.children().eq(0).text(), 'ios', 'correct template was chosen');
        });
        QUnit.test('search best template', function(assert) {
          devices.current({platform: 'android'});
          var $testContainer = $('#platformSpecificContainer').TestContainerWidget();
          assert.equal($testContainer.children().eq(0).text(), 'common', 'best template was chosen');
        });
        QUnit.test('container widget without best template', function(assert) {
          devices.current({platform: 'android'});
          var $testContainer = $('#platformSpecificContainer2').TestContainerWidget();
          var instance = $testContainer.TestContainerWidget('instance');
          assert.equal(instance.option('integrationOptions.templates')['item'], undefined, 'could not find template for selected platform');
        });
        QUnit.test('several best templates for widget', function(assert) {
          devices.current({platform: 'ios'});
          var $testContainer = $('#platformSpecificContainer2').TestContainerWidget();
          assert.equal($testContainer.children().eq(0).text(), 'ios', 'choose first best template');
        });
      });
      QUnit.module('template support regressions', {
        beforeEach: function() {
          var TestContainer = Widget.inherit({
            NAME: 'TestContainer',
            _renderContentImpl: function() {
              if (this.option('integrationOptions.templates').template) {
                this.option('integrationOptions.templates').template.render({container: this.$element()});
              }
            }
          });
          var TestWidget = Widget.inherit({
            NAME: 'TestWidget',
            _render: function() {
              this.callBase();
              this.$element().text('test');
            }
          });
          registerComponent('TestContainer', TestContainer);
          registerComponent('TestWidget', TestWidget);
        },
        afterEach: function() {
          delete $.fn['TestContainer'];
          delete $.fn['TestWidget'];
        }
      }, function() {
        QUnit.test('B235090 - Unable to render container widget content (jQuery plug-in scenario)', function(assert) {
          assert.expect(2);
          var $testContainer = $('#jQueryContainerWidget');
          $testContainer.TestContainer({onContentReady: function() {
              $('#innerWidget').TestWidget({});
              assert.equal($testContainer.children().length, 1);
              assert.equal($testContainer.children().eq(0).text(), 'test');
            }});
        });
        QUnit.test('container widget should ignore unknown data-options params (B253554)', function(assert) {
          var $__2 = this;
          assert.expect(0);
          $.each(['<div data-options="dxTest : { title: \'View2\' }" >123</div>', '<div data-options="dxTest : { title: \'View2\' }, dxTemplate: { name: \'content\' } " >123</div>', '<div data-options="dxTemplate:{name:\'content\'}, dxTest : { title: \'View2\' } " >123</div>', '<div data-options="dxTest: { title: \'View2\' },dxTemplate: { name: \'content\' }, dxTest123: true ">123</div>', '<div data-options="dxTest : {title: \'View2\' },dxTemplate: { name: \'content\' }, dxTest123: true " >123</div>', '<div data-options="dxTest : {title: \'View2\' }, dxTemplate:  {  name:  \'content\'}" >123</div>', '<div data-options="dxTest : {title: \'View2\' }, dxtemplate:  {  name:  \'content\'}" >123</div>', '<div data-options="dxTest : {title: \'View2\', dxTemplate:  {  name:  \'content\'} } " >123</div>'], function() {
            var $element;
            try {
              $element = $('<div></div>').append($__2).appendTo('#qunit-fixture').TestContainer({});
            } finally {
              $element.remove();
            }
          });
        });
      });
      QUnit.module('keyboard navigation', {}, function() {
        QUnit.test('widget obtaining focus after click on its inner element (T242395)', function(assert) {
          assert.expect(1);
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          var isPrevented = false;
          $element.append($('<div>', {style: 'width: 10px; height: 10px;'}));
          if (document['onbeforeactivate'] !== undefined) {
            var $inner = $element.find('div').eq(0);
            $element.on('beforeactivate', function(e) {
              isPrevented = e.isDefaultPrevented();
            });
            $inner.trigger('beforeactivate');
            assert.ok(isPrevented, 'native focus set to widget');
          } else {
            assert.notOk(isPrevented, 'native focus set to widget');
          }
        });
        QUnit.test('supported keys should have an event as a parameter', function(assert) {
          var supportedKeysHandler = sinon.stub().returns({'a': function() {}});
          var TestWidget = Widget.inherit({
            NAME: 'TestWidget',
            _supportedKeys: supportedKeysHandler
          });
          var $element = $('#widget');
          new TestWidget($element, {focusStateEnabled: true});
          var kb = keyboardMock($element);
          kb.press('a');
          assert.equal(supportedKeysHandler.callCount, 1, 'supportedKeys was called');
          assert.equal(supportedKeysHandler.getCall(0).args[0].type, 'keydown', 'event is correct');
        });
        QUnit.test('focus state', function(assert) {
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), false, 'element has not dx-state-focus class');
          assert.equal($element.attr('tabindex'), 0, 'element has tabindex after focus');
          $element.trigger('focusin');
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), true, 'element has dx-state-focus class after focus');
        });
        QUnit.test('tabIndex option', function(assert) {
          var $element = $('#widget').dxWidget({
            focusStateEnabled: true,
            tabIndex: 3
          });
          var instance = $element.dxWidget('instance');
          assert.equal($element.attr('tabindex'), 3, 'element has right tabindex');
          instance.option('tabIndex', -1);
          assert.equal($element.attr('tabindex'), -1, 'element has right tabindex after change');
        });
        QUnit.test('focus state option changed', function(assert) {
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          var instance = $element.dxWidget('instance');
          $element.trigger('focusin');
          instance.option('focusStateEnabled', false);
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), false, 'element has not dx-state-focus class after focus');
          instance.option('focusStateEnabled', true);
          $element.trigger('focusin');
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), true, 'element has not dx-state-focus class after focus');
        });
        QUnit.test('focus in disabled state', function(assert) {
          var $element = $('#widget').dxWidget({
            focusStateEnabled: true,
            disabled: true
          });
          var instance = $element.dxWidget('instance');
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), false, 'element has not dx-state-focus class');
          assert.equal($element.attr('tabindex'), null, 'element has not tabindex after focus');
          $element.trigger('focusin');
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), false, 'element has not dx-state-focus class after focus in disabled state');
          instance.option('disabled', false);
          $element.trigger('focusin');
          assert.equal($element.hasClass(FOCUSED_STATE_CLASS), true, 'element has dx-state-focus class after focus');
        });
        QUnit.test('registerKeyHandler function add key handler to widget', function(assert) {
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          var widget = $element.dxWidget('instance');
          var keyboard = keyboardMock($element);
          var handlerFired = 0;
          var handler = function() {
            handlerFired++;
          };
          widget.registerKeyHandler('tab', handler);
          keyboard.keyDown('tab');
          assert.equal(handlerFired, 1, 'new handler fired');
        });
        QUnit.test('registerKeyHandler can attach a key handler to widget by a key code', function(assert) {
          var $element = $('#widget').dxWidget({focusStateEnabled: true});
          var widget = $element.dxWidget('instance');
          var handler = sinon.stub();
          widget.registerKeyHandler('113', handler);
          var event = $.Event('keydown', {
            which: 113,
            key: 'F2'
          });
          $element.trigger(event);
          assert.equal(handler.callCount, 1, 'new handler fired');
        });
        QUnit.test('Call \'repaint\' from \'onContentReady\'', function(assert) {
          var keyHandler = sinon.stub();
          var firstCall = true;
          var $element = $('#widget').dxWidget({
            focusStateEnabled: true,
            onContentReady: function() {
              if (firstCall) {
                firstCall = false;
                this.repaint();
              }
            }
          });
          var widget = $('#widget').dxWidget('instance');
          widget.registerKeyHandler('A', keyHandler);
          keyboardMock($element).press('A');
          assert.strictEqual(keyHandler.callCount, 1, 'keyHandler.callCount');
          assert.strictEqual(keyHandler.getCall(0).args[0].type, 'keydown', 'keyHandler.type');
        });
      });
      if (devices.current().deviceType === 'desktop') {
        registerKeyHandlerTestHelper.runTests({
          createWidget: function($element, options) {
            return $element.dxWidget($.extend({focusStateEnabled: true}, options)).dxWidget('instance');
          },
          checkInitialize: true
        });
      }
      QUnit.module('isReady', {}, function() {
        QUnit.test('widget is ready after rendering', function(assert) {
          var isReadyOnInit;
          registerComponent('dxWidget', Widget.inherit({_init: function() {
              this.callBase();
              isReadyOnInit = this.isReady();
            }}));
          var $widget = $('#widget').dxWidget();
          assert.equal(isReadyOnInit, false, 'widget is not ready on init');
          assert.equal($widget.dxWidget('isReady'), true, 'widget is ready after render');
        });
        QUnit.test('widget doesn\'t throw if disposed before rendering (T717968)', function(assert) {
          deferUpdate(function() {
            new DxWidget('#widget').dispose();
          });
          assert.ok(true);
        });
      });
      QUnit.module('dataHelperMixin', {}, function() {
        QUnit.test('dataSource disposing should remove only widget handlers preserving existing handlers (T213769)', function(assert) {
          var TestWidget = Widget.inherit({
            NAME: 'TestWidget',
            _getDefaultOptions: function() {
              return $.extend(this.callBase(), {dataSource: null});
            },
            _init: function() {
              this.callBase();
              this._refreshDataSource();
            }
          }).include(DataHelperMixin);
          var dataSource = new DataSource({store: []});
          var changeHandler = function() {};
          var loadErrorHandler = function() {};
          var loadingChangedHandler = function() {};
          dataSource.on('changed', changeHandler);
          dataSource.on('loadError', loadErrorHandler);
          dataSource.on('loadingChanged', loadingChangedHandler);
          new TestWidget('#widget', {dataSource: dataSource});
          $('#widget').remove();
          var events = dataSource._eventsStrategy._events;
          assert.ok(events.changed.has(changeHandler), 'external \'change\' handler still attached');
          assert.ok(events.loadError.has(loadErrorHandler), 'external \'loadError\' handler still attached');
          assert.ok(events.loadingChanged.has(loadingChangedHandler), 'external \'loadingChanged\' handler still attached');
        });
      });
      QUnit.module('aria accessibility', {}, function() {
        QUnit.test('aria-disabled', function(assert) {
          var $element = $('#widget').dxWidget({disabled: true});
          var instance = $element.dxWidget('instance');
          assert.equal($element.attr('aria-disabled'), 'true', 'attribute test on init');
          instance.option('disabled', false);
          assert.equal($element.attr('aria-disabled'), undefined, 'attribute test on option change');
        });
        QUnit.test('aria-hidden', function(assert) {
          var $element = $('#widget').dxWidget({visible: false});
          assert.strictEqual($element.attr('aria-hidden'), undefined, 'attribute should not be set while element has "display:none"');
        });
        QUnit.test('setAria function', function(assert) {
          var $element = $('#widget').dxWidget();
          var instance = $element.dxWidget('instance');
          var $customTarget = $('<div>');
          instance.setAria('test', 'test value 1');
          assert.equal($element.attr('aria-test'), 'test value 1', '2 arguments should set aria-attribute to the aria target');
          instance.setAria('test', 'test value 2', $customTarget);
          assert.equal($customTarget.attr('aria-test'), 'test value 2', '3 arguments should set aria-attribute to the custom target');
          instance.setAria('role', 'test role');
          assert.equal($element.attr('role'), 'test role', 'role should not add aria- prefix');
          instance.setAria('id', 'test id');
          assert.equal($element.attr('id'), 'test id', 'id should not add aria- prefix');
          instance.setAria({
            role: 'testing role',
            id: 'testing id',
            label: 'testing label'
          });
          assert.equal($element.attr('role'), 'testing role', 'multiple attribute role');
          assert.equal($element.attr('id'), 'testing id', 'multiple attribute id');
          assert.equal($element.attr('aria-label'), 'testing label', 'multiple attribute aria-label');
          instance.setAria({'test': 'test'}, $customTarget);
          assert.equal($customTarget.attr('aria-test'), 'test', 'custom target with object');
        });
      });
      QUnit.module('inner options cache', {}, function() {
        var TestWidget = Widget.inherit({
          NAME: 'TestWidget',
          _init: function() {
            this.callBase();
            this._options.cache('innerComponentOptions', this.option('innerComponentOptions'));
          },
          _renderInnerWidget: function() {
            return this._createComponent($('<div>'), Widget, extend({defaultOption: 'Test'}, this._options.cache('innerComponentOptions')));
          },
          _render: function() {
            this.callBase();
            this.innerComponent = this._renderInnerWidget();
            this._bindInnerWidgetOptions(this.innerComponent, 'innerComponentOptions');
          },
          _optionChanged: function(args) {
            switch (args.name) {
              case 'innerComponentOptions':
                this._innerWidgetOptionChanged(this.innerComponent, args);
                break;
              default:
                this.callBase(args);
            }
          }
        });
        QUnit.test('a user can redefine inner component options', function(assert) {
          var widget = new TestWidget('#widget', {innerComponentOptions: {
              someOption: 'Test',
              defaultOption: 'New'
            }});
          assert.strictEqual(widget.innerComponent.option('someOption'), 'Test', 'option has been passed');
          assert.strictEqual(widget.innerComponent.option('defaultOption'), 'New', 'default option has been redefined');
        });
        QUnit.test('two way binding should work with inner component options', function(assert) {
          var widget = new TestWidget('#widget', {});
          assert.strictEqual(widget.option('innerComponentOptions.defaultOption'), 'Test', 'inner component options has been loaded');
          widget.innerComponent.option('newOption', 'Test');
          assert.strictEqual(widget.option('innerComponentOptions.newOption'), 'Test', 'option has been passed to the main widget');
          widget.option('innerComponentOptions', {newOption: 'Test 2'});
          assert.strictEqual(widget.innerComponent.option('newOption'), 'Test 2', 'option has been passed to the inner widget');
          assert.strictEqual(widget.innerComponent.option('defaultOption'), 'Test', 'default option should not be redefined');
        });
        QUnit.test('inner component options should not be losed on dispose', function(assert) {
          var widget = new TestWidget('#widget', {innerComponentOptions: {
              someOption: 'Test',
              defaultOption: 'New'
            }});
          widget.repaint();
          assert.strictEqual(widget.innerComponent.option('someOption'), 'Test', 'option has been passed');
          assert.strictEqual(widget.innerComponent.option('defaultOption'), 'New', 'default option has been redefined');
        });
        QUnit.test('the exception should not be shown when the inner component is not exist yet', function(assert) {
          var widget = new TestWidget('#widget', {innerComponentOptions: {
              someOption: 'Test',
              defaultOption: 'New'
            }});
          delete widget.innerComponent;
          widget.option('innerComponentOptions.someOption', 'Test2');
          widget.repaint();
          assert.strictEqual(widget.innerComponent.option('someOption'), 'Test2', 'option is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/widget/ui.widget","core/component_registrator","core/devices","core/utils/extend","core/templates/template_base","core/templates/template","data_helper","data/data_source/data_source","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/config","core/element_data","core/utils/common","../../helpers/registerKeyHandlerTestHelper.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/widget/ui.widget"), require("core/component_registrator"), require("core/devices"), require("core/utils/extend"), require("core/templates/template_base"), require("core/templates/template"), require("data_helper"), require("data/data_source/data_source"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("core/config"), require("core/element_data"), require("core/utils/common"), require("../../helpers/registerKeyHandlerTestHelper.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=widget.tests.js.map