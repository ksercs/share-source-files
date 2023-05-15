!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/radioGroup.markup.tests.js"], ["jquery","../../helpers/executeAsyncMock.js","ui/radio_group","../../helpers/ariaAccessibilityTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/radioGroup.markup.tests.js", ["jquery", "../../helpers/executeAsyncMock.js", "ui/radio_group", "../../helpers/ariaAccessibilityTestHelper.js"], function($__export) {
  "use strict";
  var $,
      executeAsyncMock,
      RadioGroup,
      ariaAccessibilityTestHelper,
      test,
      module,
      RADIO_GROUP_CLASS,
      RADIO_BUTTON_CLASS,
      RADIO_BUTTON_CHECKED_CLASS,
      RADIO_GROUP_VERTICAL_CLASS,
      RADIO_GROUP_HORIZONTAL_CLASS,
      toSelector,
      moduleConfig,
      helper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      RadioGroup = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }],
    execute: function() {
      var $__3;
      QUnit.testStart(function() {
        var markup = '<div id="radioGroup"> </div>\
        <div id="radioGroup2"> </div>\
        <div id="widget"></div>\
        <div id="widthRootStyle"></div>';
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      (($__3 = QUnit, test = $__3.test, module = $__3.module, $__3));
      RADIO_GROUP_CLASS = 'dx-radiogroup';
      RADIO_BUTTON_CLASS = 'dx-radiobutton';
      RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
      RADIO_GROUP_VERTICAL_CLASS = 'dx-radiogroup-vertical';
      RADIO_GROUP_HORIZONTAL_CLASS = 'dx-radiogroup-horizontal';
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
      moduleConfig = {
        beforeEach: function() {
          executeAsyncMock.setup();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
        }
      };
      QUnit.module('buttons group rendering', moduleConfig, function() {
        QUnit.test('widget should be rendered', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup();
          assert.ok($radioGroup.hasClass(RADIO_GROUP_CLASS), 'widget class added');
        });
        QUnit.test('widget should generate buttons', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({items: [{text: '0'}, {text: '1'}, {text: '2'}]});
          assert.equal($radioGroup.find(toSelector(RADIO_BUTTON_CLASS)).length, 3, 'buttons generated');
        });
        QUnit.test('empty message should not be generated if no items', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup();
          assert.equal($radioGroup.find('.dx-scrollview-content').text(), '', 'empty message is not shown');
        });
        QUnit.test('widget should correctly process \'disabled\' option changed', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({
            items: [{text: '0'}, {text: '1'}, {text: '2'}],
            disabled: true
          });
          assert.ok($radioGroup.find('.dx-collection').hasClass('dx-state-disabled'), 'inner collection has disabled-state class');
          var radioGroup = $radioGroup.dxRadioGroup('instance');
          radioGroup.option('disabled', false);
          assert.ok(!$radioGroup.find('.dx-collection').hasClass('dx-state-disabled'), 'inner collection hasn\'t disabled-state class');
        });
        [null, undefined].forEach(function(value) {
          test(("widget should not try to load " + value + " initial value from the data source"), function(assert) {
            var loadStub = sinon.stub().returns([1, 2, 3]);
            $('#radioGroup').dxRadioGroup({
              dataSource: {load: loadStub},
              value: value
            });
            assert.ok(loadStub.calledOnce, 'load callback called once');
          });
        });
        test('widget should not try to extra load initial value from the data source', function(assert) {
          var loadStub = sinon.stub().returns([1, 2, 3]);
          $('#radioGroup').dxRadioGroup({
            dataSource: {load: loadStub},
            value: 2
          });
          assert.ok(loadStub.calledOnce, 'load callback called once');
        });
      });
      QUnit.module('buttons rendering', moduleConfig, function() {
        QUnit.test('button markup item if item.value is specified', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({
            items: [{
              text: '0',
              value: '0'
            }],
            valueExpr: 'value'
          });
          var $radioButton = $radioGroup.find(toSelector(RADIO_BUTTON_CLASS)).eq(0);
          assert.equal($radioButton.text(), '0', 'text rendered correctly');
        });
        QUnit.test('button markup item if item.value is not specified', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({
            items: [{text: '0'}],
            valueExpr: 'value'
          });
          var $radioButton = $radioGroup.find(toSelector(RADIO_BUTTON_CLASS)).eq(0);
          assert.equal($radioButton.text(), '0', 'text rendered correctly');
        });
        QUnit.test('button markup item if item is primitive string', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({items: ['0']});
          var $radioButton = $radioGroup.find(toSelector(RADIO_BUTTON_CLASS)).eq(0);
          assert.equal($radioButton.text(), '0', 'text rendered correctly');
        });
        QUnit.test('button markup item if item has html', function(assert) {
          var $radioGroup = $('#radioGroup').dxRadioGroup({items: [{html: '<input type=\'radio\' value=\'foo\'>'}]});
          var $radioButton = $radioGroup.find(toSelector(RADIO_BUTTON_CLASS)).find('input');
          assert.equal($radioButton.prop('type'), 'radio', 'input type rendered correctly');
          assert.equal($radioButton.prop('value'), 'foo', 'input value rendered correctly');
        });
      });
      QUnit.module('hidden input', function() {
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = $('#radioGroup').dxRadioGroup();
          var $input = $element.find('input');
          assert.equal($input.length, 1, 'input is rendered');
          assert.equal($input.attr('type'), 'hidden', 'the input type is \'hidden\'');
        });
        QUnit.test('the hidden input should have correct value on widget init', function(assert) {
          var $element = $('#radioGroup').dxRadioGroup({
            items: [1, 2, 3],
            value: 2
          });
          var $input = $element.find('input');
          assert.equal($input.val(), '2', 'input value is correct');
        });
        QUnit.test('the hidden input should get display text as value if widget value is an object', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#radioGroup').dxRadioGroup({
            items: items,
            value: items[0],
            displayExpr: 'text'
          });
          var $input = $element.find('input');
          assert.equal($input.val(), items[0].text, 'input value is correct');
        });
        QUnit.test('the hidden input should get value in respect of the \'valueExpr\' option', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#radioGroup').dxRadioGroup({
            items: items,
            value: items[0].id,
            valueExpr: 'id',
            displayExpr: 'text'
          });
          var $input = $element.find('input');
          assert.equal($input.val(), items[0].id, 'input value is correct');
        });
      });
      QUnit.module('the \'name\' option', function() {
        QUnit.test('widget hidden input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#radioGroup').dxRadioGroup({name: expectedName});
          var $input = $element.find('input');
          assert.equal($input.attr('name'), expectedName, 'the hidden input \'name\' attribute has correct value');
        });
      });
      QUnit.module('value', moduleConfig, function() {
        QUnit.test('item checked on start', function(assert) {
          var done = assert.async();
          executeAsyncMock.teardown();
          var items = [{text: '0'}, {text: '1'}];
          var $radioGroup = $('#radioGroup').dxRadioGroup({
            dataSource: items,
            value: items[1]
          });
          var radioGroup = $radioGroup.dxRadioGroup('instance');
          setTimeout(function() {
            assert.equal($(radioGroup.itemElements()).filter(toSelector(RADIO_BUTTON_CHECKED_CLASS)).length, 1, 'one item checked');
            done();
          });
        });
      });
      QUnit.module('valueExpr', moduleConfig, function() {
        QUnit.test('value should be correct if valueExpr is a string', function(assert) {
          var items = [{
            number: 0,
            caption: 'zero'
          }, {
            number: 1,
            caption: 'one'
          }];
          var radioGroup = $('#radioGroup').dxRadioGroup({
            dataSource: items,
            valueExpr: 'number',
            itemRender: function(item) {
              return item.caption;
            },
            value: 0
          }).dxRadioGroup('instance');
          var $firstItem = $(radioGroup.itemElements()).eq(0);
          assert.ok($firstItem.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item with zero value rendered correctly');
        });
      });
      QUnit.module('widget sizing render', moduleConfig, function() {
        QUnit.test('default', function(assert) {
          var $element = $('#widget').dxRadioGroup({items: [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}]});
          assert.ok($element[0].offsetWidth > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxRadioGroup({
            items: [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}],
            width: 400
          });
          var instance = $element.dxRadioGroup('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element[0].style.width, '400px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxRadioGroup({items: [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}]});
          var instance = $element.dxRadioGroup('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element[0].style.width, '300px', 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new RadioGroup($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        QUnit.test('Items: []', function() {
          helper.createWidget({});
          helper.checkAttributes(helper.$widget, {
            role: 'radiogroup',
            tabindex: '0'
          }, 'widget');
        });
        QUnit.test('Items: [1, 2, 3], Item.selected: true', function() {
          helper.createWidget({
            items: [1, 2, 3],
            value: 1
          });
          helper.checkAttributes(helper.$widget, {
            role: 'radiogroup',
            tabindex: '0'
          }, 'widget');
          helper.checkItemsAttributes([0], {
            attributes: ['aria-checked'],
            role: 'radio'
          });
        });
        QUnit.test('Items: [1, 2, 3], Item.selected: true, set focusedElement -> clean focusedElement', function() {
          helper.createWidget({
            items: [1, 2, 3],
            value: 1
          });
          helper.widget.option('focusedElement', helper.getItems().eq(0));
          helper.checkAttributes(helper.$widget, {
            role: 'radiogroup',
            tabindex: '0'
          }, 'widget');
          helper.checkItemsAttributes([0], {
            attributes: ['aria-checked'],
            role: 'radio'
          });
          helper.widget.option('focusedElement', null);
          helper.checkAttributes(helper.$widget, {
            role: 'radiogroup',
            tabindex: '0'
          }, 'widget');
          helper.checkItemsAttributes([0], {
            attributes: ['aria-checked'],
            role: 'radio'
          });
        });
      });
      module('layout', moduleConfig, function() {
        var createRadioGroup = function(options) {
          return $('#radioGroup').dxRadioGroup(options);
        };
        var getInstance = function($element) {
          return $element.dxRadioGroup('instance');
        };
        test('should be generated proper class with vertical layout', function(assert) {
          var $radioGroup = createRadioGroup({layout: 'vertical'});
          assert.ok($radioGroup.hasClass(RADIO_GROUP_VERTICAL_CLASS), 'class set correctly');
        });
        test('should be generated proper class with horizontal layout', function(assert) {
          var $radioGroup = createRadioGroup({layout: 'horizontal'});
          assert.ok($radioGroup.hasClass(RADIO_GROUP_HORIZONTAL_CLASS), 'class set correctly');
        });
        test('should be generated proper class when layout is changed', function(assert) {
          var $radioGroup = createRadioGroup({layout: 'horizontal'});
          getInstance($radioGroup).option('layout', 'vertical');
          assert.ok($radioGroup.hasClass(RADIO_GROUP_VERTICAL_CLASS), 'class set correctly');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/executeAsyncMock.js","ui/radio_group","../../helpers/ariaAccessibilityTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/executeAsyncMock.js"), require("ui/radio_group"), require("../../helpers/ariaAccessibilityTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=radioGroup.markup.tests.js.map