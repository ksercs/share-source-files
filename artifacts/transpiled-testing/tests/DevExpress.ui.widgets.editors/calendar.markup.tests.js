!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/calendar.markup.tests.js"], ["jquery","core/utils/date_serialization","core/utils/type","core/config","core/utils/window","generic_light.css!","ui/calendar"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/calendar.markup.tests.js", ["jquery", "core/utils/date_serialization", "core/utils/type", "core/config", "core/utils/window", "generic_light.css!", "ui/calendar"], function($__export) {
  "use strict";
  var $,
      dateSerialization,
      isDefined,
      isRenderer,
      config,
      windowUtils,
      CALENDAR_CLASS,
      CALENDAR_WEEK_NUMBER_CELL_CLASS,
      CALENDAR_WEEK_NUMBER_HEADER_CLASS,
      CALENDAR_NAVIGATOR_CLASS,
      CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS,
      CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS,
      CALENDAR_FOOTER_CLASS,
      CALENDAR_CAPTION_BUTTON_CLASS,
      CALENDAR_VIEWS_WRAPPER_CLASS,
      CALENDAR_MULTIVIEW_CLASS,
      CALENDAR_RANGE_CLASS,
      toSelector,
      testModule,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dateSerialization = $__m.default;
    }, function($__m) {
      isDefined = $__m.isDefined;
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      CALENDAR_CLASS = 'dx-calendar';
      CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
      CALENDAR_WEEK_NUMBER_HEADER_CLASS = 'dx-week-number-header';
      CALENDAR_NAVIGATOR_CLASS = 'dx-calendar-navigator';
      CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS = 'dx-calendar-navigator-previous-view';
      CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS = 'dx-calendar-navigator-next-view';
      CALENDAR_FOOTER_CLASS = 'dx-calendar-footer';
      CALENDAR_CAPTION_BUTTON_CLASS = 'dx-calendar-caption-button';
      CALENDAR_VIEWS_WRAPPER_CLASS = 'dx-calendar-views-wrapper';
      CALENDAR_MULTIVIEW_CLASS = 'dx-calendar-multiview';
      CALENDAR_RANGE_CLASS = 'dx-calendar-range';
      toSelector = function(className) {
        return '.' + className;
      };
      (($__4 = QUnit, testModule = $__4.module, test = $__4.test, $__4));
      QUnit.module('Calendar markup', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar({
            value: new Date(2013, 9, 15),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          }).dxCalendar('instance');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('\'dx-calendar\' class should be added', function(assert) {
          assert.ok(this.$element.hasClass(CALENDAR_CLASS));
        });
        QUnit.test('navigator is rendered', function(assert) {
          assert.equal(this.$element.find(toSelector(CALENDAR_NAVIGATOR_CLASS)).length, 1, 'navigator is rendered');
        });
        [1, 2].forEach(function(viewsCount) {
          QUnit.test(("rendered views amount is correct when viewsCount option equals " + viewsCount), function(assert) {
            this.calendar.option('viewsCount', viewsCount);
            if (windowUtils.hasWindow()) {
              var hiddenViews = 2;
              assert.equal(this.$element.find(toSelector(CALENDAR_VIEWS_WRAPPER_CLASS) + ' .dx-widget').length, viewsCount + hiddenViews, 'all views are rendered');
            } else {
              assert.equal(this.$element.find(toSelector(CALENDAR_VIEWS_WRAPPER_CLASS) + ' .dx-widget').length, viewsCount, 'only one view is rendered');
            }
          });
        });
        QUnit.module('multiview', {beforeEach: function() {
            var $__3 = this;
            this.calendar.option('viewsCount', 2);
            this.viewWidth = this.calendar._viewWidth();
            this.getViews = function() {
              return $__3.$element.find(("." + CALENDAR_VIEWS_WRAPPER_CLASS + " .dx-widget"));
            };
          }}, function() {
          QUnit.test('calendar should have width equals viewsCount * view width', function(assert) {
            var elementWidth = $(this.calendar.$element()).width();
            assert.strictEqual(elementWidth, this.viewWidth * 2);
          });
          QUnit.test('calendar should not have inline width after multiview runtime disable', function(assert) {
            this.calendar.option('viewsCount', 1);
            var elementWidth = this.$element[0].style.width;
            assert.strictEqual(elementWidth, '');
          });
        });
        QUnit.test('Calendar must render with dx-rtl class', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          $element.dxCalendar({
            value: new Date(2013, 9, 15),
            rtlEnabled: true
          });
          assert.ok($element.hasClass('dx-rtl'), 'class dx-rtl must be');
          $element.remove();
        });
      });
      QUnit.module('Hidden input', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar({value: new Date(2013, 9, 15)}).dxCalendar('instance');
          this.stringValue = function(value) {
            return dateSerialization.serializeDate(value, 'yyyy-MM-dd');
          };
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('Calendar must create a hidden input', function(assert) {
          var $input = this.$element.find('input');
          assert.equal($input.length, 1, 'input is rendered');
          assert.equal($input.attr('type'), 'hidden', 'input type is \'hidden\'');
        });
        QUnit.test('Calendar should pass value to the hidden input on init', function(assert) {
          var $input = this.$element.find('input');
          var expectedValue = this.stringValue(this.calendar.option('value'));
          assert.equal($input.val(), expectedValue, 'input value is correct after init');
        });
      });
      QUnit.module('The \'name\' option', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('widget input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = this.$element.dxCalendar({name: expectedName});
          var $input = $element.find('input');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
      QUnit.module('Navigator', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar({value: new Date(2015, 5, 13)}).dxCalendar('instance');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('Caption button is render', function(assert) {
          assert.strictEqual(this.$element.find('.dx-calendar-caption-button').length, 1);
        });
        QUnit.test('Calendar must display previous and next month links, and previous and next year links', function(assert) {
          assert.strictEqual(this.$element.find(toSelector(CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS)).length, 1);
          assert.strictEqual(this.$element.find(toSelector(CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS)).length, 1);
        });
        QUnit.test('Calendar must display the current month and year', function(assert) {
          var navigatorCaption = this.$element.find(toSelector(CALENDAR_CAPTION_BUTTON_CLASS));
          assert.equal(navigatorCaption.text(), 'June 2015');
        });
        QUnit.test('Calendar with two views should display 2 months', function(assert) {
          this.calendar.option('viewsCount', 2);
          var navigatorCaption = this.$element.find(toSelector(CALENDAR_CAPTION_BUTTON_CLASS));
          assert.equal(navigatorCaption.text(), 'June 2015July 2015');
        });
        QUnit.test('Calendar with two views and rtlEnabled should display 2 months in reverse order', function(assert) {
          this.calendar.option({
            viewsCount: 2,
            rtlEnabled: true
          });
          var navigatorCaption = this.$element.find(toSelector(CALENDAR_CAPTION_BUTTON_CLASS));
          assert.equal(navigatorCaption.text(), 'July 2015June 2015');
        });
      });
      QUnit.module('Calendar footer', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('calendar must have _footer if showTodayButton = true', function(assert) {
          var $element = this.$element;
          $element.dxCalendar({
            value: new Date(2015, 5, 13),
            showTodayButton: true
          }).dxCalendar('instance');
          assert.equal($element.find(toSelector(CALENDAR_FOOTER_CLASS)).length, 1, 'footer exist');
        });
        QUnit.test('calendar mustn\'t have _footer if showTodayButton  = false', function(assert) {
          var $element = this.$element;
          $element.dxCalendar({
            value: new Date(2015, 5, 13),
            showTodayButton: false
          }).dxCalendar('instance');
          assert.equal($element.find(toSelector(CALENDAR_FOOTER_CLASS)).length, 0, 'footer doesn\'t exist');
        });
      });
      QUnit.module('showWeekNumbers', {
        beforeEach: function(assert) {
          var $__3 = this;
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar().dxCalendar('instance');
          this.reinit = function(options) {
            $__3.$element.remove();
            $__3.$element = $('<div>').appendTo('#qunit-fixture');
            $__3.calendar = $__3.$element.dxCalendar(options).dxCalendar('instance');
          };
          this.cacheTableElements = function() {
            $__3.$table = $__3.$element.find('table').eq(0);
            $__3.$headerRow = $__3.$table.find('thead').eq(0).children().eq(0);
            $__3.$firstBodyRow = $__3.$table.find('tbody').eq(0).children().eq(0);
          };
          this.checkColumnCount = function(expectedColumnCount) {
            $__3.cacheTableElements();
            assert.strictEqual($__3.$headerRow.children().length, expectedColumnCount);
            assert.strictEqual($__3.$firstBodyRow.children().length, expectedColumnCount);
          };
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('table should have additional column if showWeekNumbers=true', function() {
          this.reinit({showWeekNumbers: true});
          this.checkColumnCount(8);
        });
        QUnit.test('table should not have additional column if showWeekNumbers=false', function() {
          this.reinit({showWeekNumbers: false});
          this.checkColumnCount(7);
        });
        QUnit.test('table should be rerendered with additional column after runtime change of showWeekNumbers', function(assert) {
          this.reinit({});
          this.checkColumnCount(7);
          this.calendar.option('showWeekNumbers', true);
          this.checkColumnCount(8);
        });
        QUnit.test('first header cell should have "dx-week-number-header" class when showWeekNumbers=true', function(assert) {
          this.reinit({showWeekNumbers: true});
          this.cacheTableElements();
          var $firstHeaderCell = this.$headerRow.children().eq(0);
          assert.ok($firstHeaderCell.hasClass(CALENDAR_WEEK_NUMBER_HEADER_CLASS));
        });
        QUnit.test('first cell in tbody should have "dx-calendar-week-number-cell" class when showWeekNumbers=true', function(assert) {
          this.reinit({showWeekNumbers: true});
          this.cacheTableElements();
          var $firstBodyCell = this.$firstBodyRow.children().eq(0);
          assert.ok($firstBodyCell.hasClass(CALENDAR_WEEK_NUMBER_CELL_CLASS));
        });
        QUnit.test('last header cell should have "dx-week-number-header" class when showWeekNumbers=true and rtlEnabled=true', function(assert) {
          this.reinit({
            showWeekNumbers: true,
            rtlEnabled: true
          });
          this.cacheTableElements();
          var $lastHeaderCell = this.$headerRow.children().eq(7);
          assert.ok($lastHeaderCell.hasClass(CALENDAR_WEEK_NUMBER_HEADER_CLASS));
        });
        QUnit.test('last cell in tbody should have "dx-calendar-week-number-cell" class when showWeekNumbers=true and rtlEnabled=true', function(assert) {
          this.reinit({
            showWeekNumbers: true,
            rtlEnabled: true
          });
          this.cacheTableElements();
          var $lastBodyRowCell = this.$firstBodyRow.children().eq(7);
          assert.ok($lastBodyRowCell.hasClass(CALENDAR_WEEK_NUMBER_CELL_CLASS));
        });
        QUnit.test('calendar with zoomLevel!=="month" and showWeekNumbers=true should not have additional column', function(assert) {
          this.reinit({
            showWeekNumbers: true,
            zoomLevel: 'year'
          });
          this.cacheTableElements();
          assert.strictEqual(this.$firstBodyRow.children().length, 4);
        });
        QUnit.test('calendar with zoomLevel="month" and showWeekNumbers=true should not have additional column after zoomLevel runtime change', function(assert) {
          this.reinit({showWeekNumbers: true});
          this.calendar.option('zoomLevel', 'year');
          this.cacheTableElements();
          assert.strictEqual(this.$firstBodyRow.children().length, 4);
        });
      });
      QUnit.module('CellTemplate option', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar().dxCalendar('instance');
        },
        reinit: function(options) {
          this.$element.remove();
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.calendar = this.$element.dxCalendar(options).dxCalendar('instance');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('custom markup should be applied', function(assert) {
          var $cellTemplate = $('<span class=\'custom-cell-class\'>');
          try {
            this.reinit({
              value: new Date(2013, 11, 15),
              currentDate: new Date(2013, 11, 15),
              cellTemplate: $cellTemplate
            });
            assert.ok(this.$element.find('.custom-cell-class').length > 0, 'custom templated cells are rendered');
          } finally {
            $cellTemplate.remove();
          }
        });
        QUnit.test('correct data should be passed to cellTemplate', function(assert) {
          var data;
          this.reinit({cellTemplate: function(itemData, itemIndex, itemElement) {
              assert.equal(isRenderer(itemElement), !!config().useJQuery, 'itemElement is correct');
              if (!data) {
                data = itemData;
              }
            }});
          assert.equal(isDefined(data.text), true, 'text field is present in itemData');
          assert.equal(isDefined(data.date), true, 'date field is present in itemData');
          assert.equal(isDefined(data.view), true, 'view field is present in itemData');
        });
        QUnit.test('calendar must have view class name', function(assert) {
          var className = 'dx-calendar-view-';
          $.each(['month', 'year', 'decade', 'century'], (function(_, type) {
            this.reinit({zoomLevel: type});
            var $element = this.$element;
            assert.ok($element.hasClass(className + type));
            $.each(['month', 'year', 'decade', 'century'], function(_, affix) {
              if (type !== affix)
                assert.ok(!$element.hasClass(className + affix));
            });
          }).bind(this));
        });
        QUnit.test('calendar should not have multiview class name if viewsCount = 1', function(assert) {
          this.reinit({viewsCount: 1});
          assert.strictEqual(this.$element.hasClass(CALENDAR_MULTIVIEW_CLASS), false);
        });
        QUnit.test('calendar should have multiview class name if viewsCount > 1', function(assert) {
          this.reinit({viewsCount: 2});
          assert.strictEqual(this.$element.hasClass(CALENDAR_MULTIVIEW_CLASS), true);
        });
        QUnit.test('calendar should toggle multiview class name after change viewsCount option value', function(assert) {
          this.reinit({viewsCount: 1});
          assert.strictEqual(this.$element.hasClass(CALENDAR_MULTIVIEW_CLASS), false, 'calendar element has not multiview class');
          this.calendar.option('viewsCount', 2);
          assert.strictEqual(this.$element.hasClass(CALENDAR_MULTIVIEW_CLASS), true, 'calendar element has multiview class');
          this.calendar.option('viewsCount', 1);
          assert.strictEqual(this.$element.hasClass(CALENDAR_MULTIVIEW_CLASS), false, 'calendar element has not multiview class');
        });
        QUnit.test('calendar should have range class if selectionMode is range', function(assert) {
          this.reinit({selectionMode: 'range'});
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), true);
        });
        QUnit.test('calendar should toggle range class after change selectionMode option value in runtime', function(assert) {
          this.reinit({});
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), false);
          this.calendar.option('selectionMode', 'range');
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), true);
          this.calendar.option('selectionMode', 'multiple');
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), false);
          this.calendar.option('selectionMode', 'single');
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), false);
          this.calendar.option('selectionMode', 'range');
          assert.strictEqual(this.$element.hasClass(CALENDAR_RANGE_CLASS), true);
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('table should have a role "grid"', function(assert) {
          this.$element.dxCalendar();
          var $tables = this.$element.find('table');
          $tables.each(function(index, tableElement) {
            var role = tableElement.getAttribute('role');
            assert.strictEqual(role, 'grid', 'role is correct');
          });
        });
        QUnit.test('table should have an aria-label describing specific hotkeys (T1158729)', function(assert) {
          this.$element.dxCalendar();
          var $tables = this.$element.find('table');
          $tables.each(function(index, tableElement) {
            var label = tableElement.getAttribute('aria-label');
            var expectedLabel = "\n                Calendar.\n                To navigate between views, press Control, and then Left Arrow or Right Arrow.\n                To zoom in on a view, press Control, and then Down Arrow.\n                To zoom out, press Control, and then Up Arrow.\n            ".replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ').trim();
            assert.strictEqual(label, expectedLabel, 'label is correct');
          });
        });
      });
      testModule('OptionChanged', {
        beforeEach: function() {
          var $__3 = this;
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.createCalendar = function() {
            var config = arguments[0] !== (void 0) ? arguments[0] : {};
            return $__3.$element.dxCalendar(config).dxCalendar('instance');
          };
          this.getViews = function() {
            return $__3.$element.find(("." + CALENDAR_VIEWS_WRAPPER_CLASS + " .dx-widget"));
          };
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        [false, true].forEach(function(initialBoolOption) {
          test(("Calendar with initial disabled=" + initialBoolOption + " option"), function(assert) {
            var instance = this.createCalendar({disabled: initialBoolOption});
            this.getViews().each(function(index, element) {
              assert.strictEqual($(element).hasClass('dx-state-disabled'), initialBoolOption, 'initial view\'s disabled state is correct');
            });
            instance.option('disabled', !initialBoolOption);
            this.getViews().each(function(index, element) {
              assert.strictEqual($(element).hasClass('dx-state-disabled'), !initialBoolOption, 'updated view\'s disabled state is correct');
            });
          });
          test(("Calendar with initial rtlEnabled=" + initialBoolOption + " option"), function(assert) {
            var instance = this.createCalendar({rtlEnabled: initialBoolOption});
            this.getViews().each(function(index, element) {
              assert.strictEqual($(element).hasClass('dx-rtl'), initialBoolOption, 'initial view\'s RTL state is correct');
            });
            instance.option('rtlEnabled', !initialBoolOption);
            this.getViews().each(function(index, element) {
              assert.strictEqual($(element).hasClass('dx-rtl'), !initialBoolOption, 'updated view\'s RTL state is correct');
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
    define(["jquery","core/utils/date_serialization","core/utils/type","core/config","core/utils/window","generic_light.css!","ui/calendar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/date_serialization"), require("core/utils/type"), require("core/config"), require("core/utils/window"), require("generic_light.css!"), require("ui/calendar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=calendar.markup.tests.js.map