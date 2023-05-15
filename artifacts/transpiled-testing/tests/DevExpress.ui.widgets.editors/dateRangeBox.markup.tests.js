!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dateRangeBox.markup.tests.js"], ["jquery","core/config","ui/date_range_box","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dateRangeBox.markup.tests.js", ["jquery", "core/config", "ui/date_range_box", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      config,
      DATERANGEBOX_CLASS,
      START_DATEBOX_CLASS,
      END_DATEBOX_CLASS,
      DATERANGEBOX_SEPARATOR_CLASS,
      ICON_CLASS,
      CLEAR_BUTTON,
      DROP_DOWN_EDITOR_BUTTONS_CONTAINER_CLASS,
      READONLY_STATE_CLASS,
      STATE_FOCUSED_CLASS,
      stylingModes,
      getStartDateBoxInstance,
      getEndDateBoxInstance,
      getStartDateBoxElement,
      getEndDateBoxElement,
      getSeparatorElement,
      getClearButton,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dateRangeBox"></div>';
        $('#qunit-fixture').html(markup);
      });
      DATERANGEBOX_CLASS = 'dx-daterangebox';
      START_DATEBOX_CLASS = 'dx-start-datebox';
      END_DATEBOX_CLASS = 'dx-end-datebox';
      DATERANGEBOX_SEPARATOR_CLASS = 'dx-daterangebox-separator';
      ICON_CLASS = 'dx-icon';
      CLEAR_BUTTON = 'dx-clear-button-area';
      DROP_DOWN_EDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
      READONLY_STATE_CLASS = 'dx-state-readonly';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      stylingModes = ['outlined', 'underlined', 'filled'];
      getStartDateBoxInstance = function(dateRangeBoxInstance) {
        return dateRangeBoxInstance.getStartDateBox();
      };
      getEndDateBoxInstance = function(dateRangeBoxInstance) {
        return dateRangeBoxInstance.getEndDateBox();
      };
      getStartDateBoxElement = function(dateRangeBoxInstance) {
        return getStartDateBoxInstance(dateRangeBoxInstance).$element();
      };
      getEndDateBoxElement = function(dateRangeBoxInstance) {
        return getEndDateBoxInstance(dateRangeBoxInstance).$element();
      };
      getSeparatorElement = function(dateRangeBoxInstance) {
        return dateRangeBoxInstance._$separator;
      };
      getClearButton = function($element) {
        return $element.find(("> ." + DROP_DOWN_EDITOR_BUTTONS_CONTAINER_CLASS)).find(("." + CLEAR_BUTTON));
      };
      moduleConfig = {beforeEach: function() {
          var $__3 = this;
          var init = function(options) {
            $__3.$element = $('#dateRangeBox').dxDateRangeBox(options);
            $__3.instance = $__3.$element.dxDateRangeBox('instance');
          };
          this.reinit = function(options) {
            $__3.instance.dispose();
            init(options);
          };
          init({value: ['2023/01/05', '2023/02/14']});
        }};
      QUnit.module('DateRangeBox markup', moduleConfig, function() {
        QUnit.test('DateRangeBox has expected class', function(assert) {
          assert.ok(this.$element.hasClass(DATERANGEBOX_CLASS));
        });
        stylingModes.forEach(function(stylingMode) {
          QUnit.test(("DateRangeBox has \"" + stylingMode + "\" class if config().editorStylingMode is " + stylingMode), function(assert) {
            var $__3 = this;
            config({editorStylingMode: stylingMode});
            this.reinit({});
            assert.strictEqual(this.$element.hasClass((DATERANGEBOX_CLASS + "-" + stylingMode)), true, (stylingMode + " class was added"));
            var restStylingModes = stylingModes.filter(function(mode) {
              return mode !== stylingMode;
            });
            restStylingModes.forEach(function(mode) {
              assert.strictEqual($__3.$element.hasClass((DATERANGEBOX_CLASS + "-" + mode)), false, (mode + " class was not added"));
            });
            config({editorStylingMode: null});
          });
          QUnit.test(("DateRangeBox has \"" + stylingMode + "\" class if styling mode is \"" + stylingMode + "\""), function(assert) {
            var $__3 = this;
            this.reinit({stylingMode: stylingMode});
            assert.strictEqual(this.$element.hasClass((DATERANGEBOX_CLASS + "-" + stylingMode)), true, (stylingMode + " class was added"));
            var restStylingModes = stylingModes.filter(function(mode) {
              return mode !== stylingMode;
            });
            restStylingModes.forEach(function(mode) {
              assert.strictEqual($__3.$element.hasClass((DATERANGEBOX_CLASS + "-" + mode)), false, (mode + " class was not added"));
            });
          });
          stylingModes.forEach(function(newStylingMode) {
            QUnit.test(("DateRangeBox has \"" + newStylingMode + "\" class if styling mode value is changed to \"" + newStylingMode + "\""), function(assert) {
              var $__3 = this;
              this.instance.option('stylingMode', newStylingMode);
              assert.strictEqual(this.$element.hasClass((DATERANGEBOX_CLASS + "-" + newStylingMode)), true, (stylingMode + " class was changed to " + newStylingMode));
              var restStylingModes = stylingModes.filter(function(mode) {
                return mode !== newStylingMode;
              });
              restStylingModes.forEach(function(mode) {
                assert.strictEqual($__3.$element.hasClass((DATERANGEBOX_CLASS + "-" + mode)), false, (mode + " class was not added"));
              });
            });
          });
        });
        QUnit.test('DateRangeBox has not readonly state class if readonly option value is false', function(assert) {
          this.reinit({readOnly: false});
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), false, 'readonly class was not added');
        });
        QUnit.test('DateRangeBox has readonly state class if readonly option value is true', function(assert) {
          this.reinit({readOnly: true});
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), true, 'readonly class was added');
        });
        QUnit.test('DateRangeBox has readonly state class if readonly option value is changed in runtime', function(assert) {
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), false, 'readonly class was not added on init');
          this.instance.option('readOnly', true);
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), true, 'readonly class was added');
        });
        QUnit.test('DateRangeBox should lose focus state if readonly option value is changed in runtime', function(assert) {
          this.instance.focus();
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), false, 'readonly class was not added on init');
          this.instance.option('readOnly', true);
          assert.strictEqual(this.$element.hasClass(READONLY_STATE_CLASS), true, 'readonly class was added');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), false, 'dateRangeBox does not have focus state class');
        });
        QUnit.test('StartDateBox has expected class', function(assert) {
          var $startDateBox = getStartDateBoxElement(this.instance);
          assert.ok($startDateBox.hasClass(START_DATEBOX_CLASS));
        });
        QUnit.test('EndDateBox has expected class', function(assert) {
          var $endDateBox = getEndDateBoxElement(this.instance);
          assert.ok($endDateBox.hasClass(END_DATEBOX_CLASS));
        });
        QUnit.test('Separator has expected class', function(assert) {
          var $separator = getSeparatorElement(this.instance);
          assert.ok($separator.hasClass(DATERANGEBOX_SEPARATOR_CLASS));
        });
        QUnit.test('Separator has icon', function(assert) {
          var $separator = getSeparatorElement(this.instance);
          var $icon = $separator.find(("." + ICON_CLASS));
          assert.strictEqual($icon.length, 1);
        });
        QUnit.test('Clear button is not rendered if dateRangeBox readOnly is true', function(assert) {
          this.reinit({
            showClearButton: true,
            readOnly: true
          });
          var $clearButton = getClearButton(this.$element);
          assert.strictEqual($clearButton.length, 0, 'clear button was rendered');
        });
        QUnit.test('StartDateBox input should have accesKey attribute if accesKey option is set on init', function(assert) {
          this.reinit({accessKey: 'x'});
          var $startDateInput = $(this.instance.field()[0]);
          assert.strictEqual($startDateInput.attr('accesskey'), 'x');
        });
        QUnit.test('EndDateBox input should have accesKey attribute if accesKey option is set on init', function(assert) {
          this.reinit({accessKey: 'x'});
          var $endDateInput = $(this.instance.field()[1]);
          assert.strictEqual($endDateInput.attr('accesskey'), undefined);
        });
        QUnit.test('StartDateBox input should have accesKey attribute if accesKey option is set on runtime', function(assert) {
          this.instance.option('accessKey', 'y');
          var $startDateInput = $(this.instance.field()[0]);
          assert.strictEqual($startDateInput.attr('accesskey'), 'y');
        });
        QUnit.test('EndDateBox input should have accesKey attribute if accesKey option is set on runtime', function(assert) {
          this.instance.option('accessKey', 'y');
          var $endDateInput = $(this.instance.field()[1]);
          assert.strictEqual($endDateInput.attr('accesskey'), undefined);
        });
        ['readOnly', 'disabled'].forEach(function(optionName) {
          QUnit.test(("DateRangeBox inputs should not have " + optionName + " attribute if " + optionName + " is false"), function(assert) {
            var $__4;
            this.reinit(($__4 = {}, Object.defineProperty($__4, optionName, {
              value: false,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var field = this.instance.field();
            assert.strictEqual($(field[0]).prop(optionName), false, ("startDate input does not have " + optionName + " attribute"));
            assert.strictEqual($(field[1]).prop(optionName), false, ("endDate input does not have " + optionName + " attribute"));
          });
          QUnit.test(("DateRangeBox inputs should have " + optionName + " attribute if " + optionName + " is true"), function(assert) {
            var $__4;
            this.reinit(($__4 = {}, Object.defineProperty($__4, optionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var field = this.instance.field();
            assert.strictEqual($(field[0]).prop(optionName), true, ("startDate input have " + optionName + " attribute"));
            assert.strictEqual($(field[1]).prop(optionName), true, ("endDate input have " + optionName + " attribute"));
          });
          QUnit.test(("DateRangeBox inputs should have " + optionName + " attribute if " + optionName + " option value is changed in runtime"), function(assert) {
            var $__4;
            this.reinit(($__4 = {}, Object.defineProperty($__4, optionName, {
              value: false,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            this.instance.option(optionName, true);
            var field = this.instance.field();
            assert.strictEqual($(field[0]).prop(optionName), true, ("startDate input have " + optionName + " attribute"));
            assert.strictEqual($(field[1]).prop(optionName), true, ("endDate input have " + optionName + " attribute"));
            this.instance.option(optionName, false);
            assert.strictEqual($(field[0]).prop(optionName), false, ("startDate input does not have " + optionName + " attribute"));
            assert.strictEqual($(field[1]).prop(optionName), false, ("endDate input does not have " + optionName + " attribute"));
          });
        });
        QUnit.test('DateRangeBox inputs should have the same value of tabIndex attribute after initialization', function(assert) {
          this.reinit({tabIndex: '2'});
          assert.strictEqual($(this.instance.field()[0]).attr('tabIndex'), '2', 'startDateBox input tabIndex value');
          assert.strictEqual($(this.instance.field()[1]).attr('tabIndex'), '2', 'endDateBox input tabIndex value');
        });
        QUnit.test('DateRangeBox inputs should have the same value of tabIndex attribute if tabIndex option was changed in runtime', function(assert) {
          this.reinit({});
          this.instance.option('tabIndex', 3);
          assert.strictEqual($(this.instance.field()[0]).attr('tabIndex'), '3', 'startDateBox input tabIndex value');
          assert.strictEqual($(this.instance.field()[1]).attr('tabIndex'), '3', 'endDateBox input tabIndex value');
        });
        QUnit.test('DateRangeBox inputs should have tabIndex attribute that equal -1 after initialization if focusStateEnabled is false', function(assert) {
          this.reinit({
            tabIndex: '2',
            focusStateEnabled: false
          });
          assert.strictEqual($(this.instance.field()[0]).attr('tabIndex'), '-1', 'startDateBox input tabIndex value');
          assert.strictEqual($(this.instance.field()[1]).attr('tabIndex'), '-1', 'endDateBox input tabIndex value');
        });
        QUnit.test('DateRangeBox inputs should have correct tabIndex attribute value if focusStateEnabled is changed in runtime', function(assert) {
          this.reinit({
            tabIndex: '2',
            focusStateEnabled: true
          });
          assert.strictEqual($(this.instance.field()[0]).attr('tabIndex'), '2', 'startDateBox input tabIndex value');
          assert.strictEqual($(this.instance.field()[1]).attr('tabIndex'), '2', 'endDateBox input tabIndex value');
          this.instance.option('focusStateEnabled', false);
          assert.strictEqual($(this.instance.field()[0]).attr('tabIndex'), '-1', 'startDateBox input tabIndex value');
          assert.strictEqual($(this.instance.field()[1]).attr('tabIndex'), '-1', 'endDateBox input tabIndex value');
          this.instance.option('focusStateEnabled', true);
        });
        QUnit.test('DateRangeBox inside flex container should not be change width after change min option', function(assert) {
          var $flexContainer = $('<div>').css({display: 'flex'});
          try {
            var $dateRangeBox = $('<div>');
            $dateRangeBox.appendTo($flexContainer);
            $flexContainer.appendTo('#qunit-fixture');
            var dateRangeBox = $dateRangeBox.dxDateRangeBox({}).dxDateRangeBox('instance');
            var width = $dateRangeBox.width();
            dateRangeBox.option('min', new Date(2021, 9, 17));
            assert.strictEqual($dateRangeBox.width(), width, 'width is not changed');
          } finally {
            $flexContainer.remove();
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","ui/date_range_box","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("ui/date_range_box"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dateRangeBox.markup.tests.js.map