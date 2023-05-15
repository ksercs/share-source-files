!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/radioGroup.tests.js"], ["jquery","core/devices","../../helpers/executeAsyncMock.js","../../helpers/keyboardMock.js","data/custom_store","data/data_source/data_source","core/utils/common","../../helpers/registerKeyHandlerTestHelper.js","ui/widget/ui.errors","events/utils/index","ui/radio_group"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/radioGroup.tests.js", ["jquery", "core/devices", "../../helpers/executeAsyncMock.js", "../../helpers/keyboardMock.js", "data/custom_store", "data/data_source/data_source", "core/utils/common", "../../helpers/registerKeyHandlerTestHelper.js", "ui/widget/ui.errors", "events/utils/index", "ui/radio_group"], function($__export) {
  "use strict";
  var $,
      devices,
      executeAsyncMock,
      keyboardMock,
      CustomStore,
      DataSource,
      deferUpdate,
      registerKeyHandlerTestHelper,
      errors,
      normalizeKeyName,
      testStart,
      module,
      test,
      testInActiveWindow,
      RADIO_GROUP_CLASS,
      RADIO_BUTTON_CLASS,
      RADIO_BUTTON_CHECKED_CLASS,
      FOCUSED_CLASS,
      moduleConfig,
      createRadioGroup,
      getInstance;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {
      registerKeyHandlerTestHelper = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {}],
    execute: function() {
      var $__5;
      (($__5 = QUnit, testStart = $__5.testStart, module = $__5.module, test = $__5.test, testInActiveWindow = $__5.testInActiveWindow, $__5));
      testStart(function() {
        $('#qunit-fixture').html('<div id="radioGroup"></div>');
      });
      RADIO_GROUP_CLASS = 'dx-radiogroup';
      RADIO_BUTTON_CLASS = 'dx-radiobutton';
      RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
      FOCUSED_CLASS = 'dx-state-focused';
      moduleConfig = {
        beforeEach: function() {
          executeAsyncMock.setup();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
        }
      };
      createRadioGroup = function(options) {
        return $('#radioGroup').dxRadioGroup(options);
      };
      getInstance = function($element) {
        return $element.dxRadioGroup('instance');
      };
      module('nested radio group', moduleConfig, function() {
        test('T680199 - click on nested radio group in template should not affect on contaier parent radio group', function(assert) {
          var $nestedRadioGroup;
          var $radioGroup = createRadioGroup({items: [{template: function(itemData, itemIndex, element) {
                $nestedRadioGroup = $('<div/>').dxRadioGroup({items: [1, 2]}).appendTo(element);
                $('<div/>').dxRadioGroup({items: [1, 2]}).appendTo(element);
              }}]});
          var parentRadioGroup = getInstance($radioGroup);
          var parentItemElement = $(parentRadioGroup.itemElements()).first();
          parentItemElement.trigger('dxclick');
          assert.ok(parentItemElement.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item of parent radio group is checked');
          var nestedRadioGroup = getInstance($nestedRadioGroup);
          var nestedItemElement = $(nestedRadioGroup.itemElements()).first();
          nestedItemElement.trigger('dxclick');
          assert.ok(nestedItemElement.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item of nested radio group is checked');
          assert.ok(parentItemElement.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item of parent radio group is not changed');
        });
        test('T680199 - click on one nested radio group doesn\'t change another nested group', function(assert) {
          var $nestedRadioGroup1;
          var $nestedRadioGroup2;
          createRadioGroup({items: [{template: function(itemData, itemIndex, element) {
                $nestedRadioGroup1 = $('<div/>').dxRadioGroup({items: [1, 2]}).appendTo(element);
                $nestedRadioGroup2 = $('<div/>').dxRadioGroup({items: [1, 2]}).appendTo(element);
              }}]});
          var nestedRadioGroup1 = getInstance($nestedRadioGroup1);
          var nestedRadioGroup2 = getInstance($nestedRadioGroup2);
          var firstNestedItemElement1 = $(nestedRadioGroup1.itemElements()).first();
          firstNestedItemElement1.trigger('dxclick');
          assert.ok(firstNestedItemElement1.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item of first nested radio group is checked');
          var firstNestedItemElement2 = $(nestedRadioGroup2.itemElements()).first();
          assert.notOk(firstNestedItemElement2.hasClass(RADIO_BUTTON_CHECKED_CLASS), 'item of second nested radio group is not changed');
        });
        QUnit.test('item template can return default template name', function(assert) {
          var instance = $('#radioGroup').dxRadioGroup({
            items: [1, 2, 3],
            itemTemplate: function() {
              return 'item';
            }
          }).dxRadioGroup('instance');
          assert.strictEqual(instance.itemElements().eq(0).text(), '1', 'Default item template was rendered');
          assert.strictEqual(instance.itemElements().eq(1).text(), '2', 'Default item template was rendered');
        });
      });
      module('buttons group rendering', function() {
        test('onContentReady fired after the widget is fully ready', function(assert) {
          assert.expect(2);
          createRadioGroup({
            items: [{text: '0'}],
            onContentReady: function(e) {
              assert.ok($(e.element).hasClass(RADIO_GROUP_CLASS));
              assert.ok($(e.element).find('.' + RADIO_BUTTON_CLASS).length);
            }
          });
        });
        test('onContentReady should rise after changing dataSource (T697809)', function(assert) {
          var onContentReadyHandler = sinon.stub();
          var instance = getInstance(createRadioGroup({
            dataSource: ['str1', 'str2', 'str3'],
            onContentReady: onContentReadyHandler
          }));
          assert.ok(onContentReadyHandler.calledOnce);
          instance.option('dataSource', [1, 2, 3]);
          assert.strictEqual(onContentReadyHandler.callCount, 2);
        });
        test('should render new items if them were setted in onContentReady handler (T861468)', function(assert) {
          var onContentReadyHandler = sinon.spy(function(e) {
            if (!isReady) {
              isReady = true;
              e.component.option('items', [1, 2, 3]);
            }
          });
          var isReady;
          var instance = getInstance(createRadioGroup({
            items: ['str1', 'str2'],
            onContentReady: onContentReadyHandler
          }));
          assert.strictEqual(onContentReadyHandler.callCount, 2);
          assert.strictEqual($(instance.element()).find(("." + RADIO_BUTTON_CLASS)).length, 3);
        });
        test('should render new items if async dataSource was setted in onContentReady handler (T861468)', function(assert) {
          var clock = sinon.useFakeTimers();
          var asyncDataSource = new DataSource({load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve([1, 2, 3]);
              }, 200);
              return d.promise();
            }});
          var onContentReadyHandler = sinon.spy(function(e) {
            if (!isReady) {
              isReady = true;
              e.component.option('dataSource', asyncDataSource);
            }
          });
          var isReady;
          var instance = getInstance(createRadioGroup({
            dataSource: ['str1', 'str2'],
            onContentReady: onContentReadyHandler
          }));
          clock.tick(300);
          assert.strictEqual(onContentReadyHandler.callCount, 3);
          assert.strictEqual($(instance.element()).find(("." + RADIO_BUTTON_CLASS)).length, 3);
          clock.restore();
        });
        test('onContentReady - subscription using "on" method', function(assert) {
          var done = assert.async();
          var onContentReadyHandler = function() {
            assert.strictEqual(instance.itemElements().eq(0).text(), '1', 'contentReady is fired');
            done();
          };
          var instance = getInstance(createRadioGroup({dataSource: ['str1', 'str2', 'str3']}));
          instance.on('contentReady', onContentReadyHandler);
          instance.option('dataSource', [1, 2, 3]);
        });
      });
      module('layout', moduleConfig, function() {
        test('On the tablet radio group must use a horizontal layout', function(assert) {
          var currentDevice = devices.current();
          devices.current('iPad');
          var $radioGroup = createRadioGroup();
          var isHorizontalLayout = getInstance($radioGroup).option('layout') === 'horizontal';
          assert.ok(isHorizontalLayout, 'radio group on tablet have horizontal layout');
          devices.current(currentDevice);
        });
        test('RadioGroup items should have the \'dx-radio-button\' class after render on deferUpdate (T820582)', function(assert) {
          var items = [{text: 'test 1'}, {text: 'test 2'}];
          deferUpdate(function() {
            createRadioGroup({items: items});
          });
          var itemsCount = $('#radioGroup').find(("." + RADIO_BUTTON_CLASS)).length;
          assert.strictEqual(itemsCount, items.length, ("items with the \"" + RADIO_BUTTON_CLASS + "\" class were rendered"));
        });
      });
      module('hidden input', function() {
        test('the hidden input should get correct value on widget value change', function(assert) {
          var $element = createRadioGroup({
            items: [1, 2, 3],
            value: 2
          });
          var instance = getInstance($element);
          var $input = $element.find('input');
          instance.option('value', 1);
          assert.equal($input.val(), '1', 'input value is correct');
        });
      });
      module('value', moduleConfig, function() {
        test('should throw the W1002 error when the value is unknown key', function(assert) {
          var errorLogStub = sinon.stub(errors, 'log');
          createRadioGroup({
            items: [{value: '1'}, {value: '2'}],
            valueExpr: 'value',
            value: '3'
          });
          assert.ok(errorLogStub.calledOnce, 'error was thrown');
          errorLogStub.restore();
        });
        test('should not throw the W1002 error when the value is \'null\' (T823478)', function(assert) {
          var errorLogStub = sinon.stub(errors, 'log');
          createRadioGroup({
            items: ['1', '2', '3'],
            value: null
          });
          assert.ok(errorLogStub.notCalled, 'error was not thrown');
          errorLogStub.restore();
        });
        test('should not throw the W1002 error when the value is changed to \'null\' (T823478)', function(assert) {
          var errorLogStub = sinon.stub(errors, 'log');
          var instance = getInstance(createRadioGroup({
            items: ['1', '2', '3'],
            value: '2'
          }));
          instance.option('value', null);
          assert.ok(errorLogStub.notCalled, 'error was not thrown');
          errorLogStub.restore();
        });
        test('should not throw the W1002 error when the reset method is called (T823478)', function(assert) {
          var errorLogStub = sinon.stub(errors, 'log');
          createRadioGroup({
            items: ['1', '2', '3'],
            value: '2'
          }).dxRadioGroup('reset');
          assert.ok(errorLogStub.notCalled, 'error was not thrown');
          errorLogStub.restore();
        });
        test('should have correct initialized selection', function(assert) {
          var radioGroupInstance = null;
          var isItemChecked = function(index) {
            return radioGroupInstance.itemElements().eq(index).hasClass(RADIO_BUTTON_CHECKED_CLASS);
          };
          radioGroupInstance = getInstance(createRadioGroup({items: ['item1', 'item2', 'item3']}));
          assert.notOk(isItemChecked(0));
          assert.notOk(isItemChecked(1));
          assert.notOk(isItemChecked(2));
          radioGroupInstance = getInstance(createRadioGroup({
            items: ['item1', 'item2', 'item3'],
            value: 'item2'
          }));
          assert.notOk(isItemChecked(0));
          assert.ok(isItemChecked(1));
          assert.notOk(isItemChecked(2));
        });
        test('null item should be selectable', function(assert) {
          var radioGroupInstance = getInstance(createRadioGroup({
            items: [{
              id: null,
              name: 'null'
            }, {
              id: false,
              name: 'false'
            }, {
              id: 0,
              name: '0'
            }],
            valueExpr: 'id',
            displayExpr: 'name'
          }));
          var $radioButtons = radioGroupInstance.$element().find('.dx-radiobutton');
          radioGroupInstance.option('value', null);
          assert.ok($radioButtons.eq(0).hasClass('dx-radiobutton-checked'), 'null item is selected');
          radioGroupInstance.option('value', false);
          assert.ok($radioButtons.eq(1).hasClass('dx-radiobutton-checked'), 'false item is selected');
          radioGroupInstance.option('value', 0);
          assert.ok($radioButtons.eq(2).hasClass('dx-radiobutton-checked'), '0 item is selected');
        });
        test('repaint of widget shouldn\'t reset value option', function(assert) {
          var items = [{text: '0'}, {text: '1'}];
          var $radioGroup = createRadioGroup({
            items: items,
            value: items[1]
          });
          var radioGroup = getInstance($radioGroup);
          radioGroup.repaint();
          assert.strictEqual(radioGroup.option('value'), items[1]);
        });
        test('value is changed on item click', function(assert) {
          assert.expect(1);
          var value;
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            onValueChanged: function(e) {
              value = e.value;
            }
          });
          var radioGroup = getInstance($radioGroup);
          $(radioGroup.itemElements()).first().trigger('dxclick');
          assert.equal(value, 1, 'value changed');
        });
        test('value is changed on item click - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          var $radioGroup = createRadioGroup({items: [1, 2, 3]});
          var radioGroup = getInstance($radioGroup);
          radioGroup.on('valueChanged', handler);
          $(radioGroup.itemElements()).first().trigger('dxclick');
          var e = handler.lastCall.args[0];
          assert.ok(handler.calledOnce, 'handler was called');
          assert.strictEqual(e.component, radioGroup, 'component is correct');
          assert.strictEqual(e.element, radioGroup.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
          assert.strictEqual(e.value, 1, 'itemData is correct');
        });
        test('widget changes the selection correctly when using the dataSource with the key', function(assert) {
          assert.expect(2);
          var items = [{
            id: '001',
            text: 'test 1'
          }, {
            id: '002',
            text: 'test 2'
          }];
          var $radioGroup = createRadioGroup({
            dataSource: {store: {
                type: 'array',
                data: items,
                key: 'id'
              }},
            onValueChanged: function(e) {
              assert.deepEqual(e.value, items[0], 'default valueExpr -> set an object as the value');
            }
          });
          var radioGroup = getInstance($radioGroup);
          var $firstItem = $(radioGroup.itemElements()).first();
          $firstItem.trigger('dxclick');
          assert.ok($firstItem.hasClass('dx-item-selected'), 'first item is selected');
        });
        test('widget should not try to load value if value=undefined and valueExpr is specified (T1006909)', function(assert) {
          var loadStub = sinon.stub();
          createRadioGroup({
            dataSource: {load: loadStub},
            valueExpr: 'id',
            value: undefined
          });
          assert.ok(loadStub.calledOnce, 'load method was called only once');
        });
        test('widget should not try to load value if it is set to undefined on runtime and valueExpr is specified', function(assert) {
          var loadStub = sinon.stub();
          var radioGroup = createRadioGroup({
            dataSource: {load: loadStub},
            valueExpr: 'id'
          }).dxRadioGroup('instance');
          assert.strictEqual(loadStub.callCount, 2, 'load method was called to load items and "null" selected value');
          radioGroup.option('value', undefined);
          assert.strictEqual(loadStub.callCount, 2, 'no additional call to load "undefined" value');
        });
        QUnit.module('valueChanged handler should receive correct event parameter', {beforeEach: function() {
            var $__4 = this;
            this.valueChangedHandler = sinon.stub();
            this.$element = createRadioGroup({
              items: [1, 2],
              onValueChanged: this.valueChangedHandler,
              focusStateEnabled: true
            });
            this.instance = getInstance(this.$element);
            this.keyboard = keyboardMock(this.$element);
            this.$firstItem = $(this.instance.itemElements().first());
            this.testProgramChange = function(assert) {
              $__4.instance.option('value', 2);
              var callCount = $__4.valueChangedHandler.callCount - 1;
              var event = $__4.valueChangedHandler.getCall(callCount).args[0].event;
              assert.strictEqual(event, undefined, 'event is undefined');
            };
            this.checkEvent = function(assert, type, target, key) {
              var event = $__4.valueChangedHandler.getCall(0).args[0].event;
              assert.strictEqual(event.type, type, 'event type is correct');
              assert.strictEqual(event.target, target.get(0), 'event target is correct');
              if (type === 'keydown') {
                assert.strictEqual(normalizeKeyName(event), normalizeKeyName({key: key}), 'event key is correct');
              }
            };
          }}, function() {
          QUnit.test('after click', function(assert) {
            this.$firstItem.trigger('dxclick');
            this.checkEvent(assert, 'dxclick', this.$firstItem);
            this.testProgramChange(assert);
          });
          ['space', 'enter'].forEach(function(key) {
            QUnit.test(("after " + key + " press"), function(assert) {
              this.keyboard.press(key);
              this.checkEvent(assert, 'keydown', this.$firstItem, key);
              this.testProgramChange(assert);
            });
          });
          QUnit.test('after runtime change', function(assert) {
            this.testProgramChange(assert);
          });
        });
      });
      module('valueExpr', moduleConfig, function() {
        test('value should be correct if valueExpr is a string', function(assert) {
          var items = [{
            number: 1,
            caption: 'one'
          }, {
            number: 2,
            caption: 'two'
          }];
          var radioGroup = getInstance(createRadioGroup({
            dataSource: items,
            valueExpr: 'number',
            value: 2,
            itemTemplate: function(item) {
              return item.caption;
            }
          }));
          var $secondItem = $(radioGroup.itemElements()).eq(1);
          assert.equal($secondItem.text(), 'two');
          radioGroup.option('itemTemplate', function(item) {
            return item.number;
          });
          $secondItem = $(radioGroup.itemElements()).eq(1);
          assert.equal($secondItem.text(), '2');
          radioGroup.option('valueExpr', 'caption');
          assert.equal(radioGroup.option('value'), 2);
          assert.equal($(radioGroup.itemElements()).find(("." + RADIO_BUTTON_CHECKED_CLASS)).length, 0, 'no items selected');
        });
        test('value should be correct if valueExpr is a function', function(assert) {
          var items = [{
            text: 'text1',
            value: true
          }, {
            text: 'text2',
            value: false
          }];
          var radioGroup = getInstance(createRadioGroup({
            dataSource: items,
            valueExpr: function(e) {
              return e.value;
            }
          }));
          assert.strictEqual(radioGroup.option('value'), null);
          assert.strictEqual($(radioGroup.itemElements()).find(("." + RADIO_BUTTON_CHECKED_CLASS)).length, 0);
          var itemElement = $(radioGroup.itemElements()).first();
          itemElement.trigger('dxclick');
          assert.strictEqual(radioGroup.option('value'), true);
          assert.ok(itemElement.hasClass(RADIO_BUTTON_CHECKED_CLASS));
        });
        test('displayExpr option should work', function(assert) {
          var radioGroup = getInstance(createRadioGroup({
            dataSource: [{
              id: 1,
              name: 'Item 1'
            }],
            valueExpr: 'id',
            displayExpr: 'name',
            value: 1
          }));
          var $item = $(radioGroup.itemElements()).eq(0);
          assert.strictEqual($item.text(), 'Item 1', 'displayExpr works');
        });
      });
      module('widget sizing render', moduleConfig, function() {
        test('change width', function(assert) {
          var $element = createRadioGroup({items: [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}]});
          var instance = getInstance($element);
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      module('keyboard navigation', moduleConfig, function() {
        test('keys tests', function(assert) {
          assert.expect(3);
          var items = [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}];
          var $element = createRadioGroup({
            focusStateEnabled: true,
            items: items
          });
          var instance = getInstance($element);
          var keyboard = keyboardMock($element);
          $element.focusin();
          keyboard.keyDown('enter');
          assert.equal(instance.option('value'), items[0], 'first item chosen');
          keyboard.keyDown('down');
          keyboard.keyDown('enter');
          assert.equal(instance.option('value'), items[1], 'second item chosen');
          keyboard.keyDown('up');
          keyboard.keyDown('space');
          assert.equal(instance.option('value'), items[0], 'first item chosen');
        });
        test('control keys should be prevented', function(assert) {
          var items = [{text: '0'}, {text: '1'}];
          var $element = createRadioGroup({
            focusStateEnabled: true,
            items: items
          });
          var keyboard = keyboardMock($element);
          var isDefaultPrevented = false;
          $($element).on('keydown', function(e) {
            isDefaultPrevented = e.isDefaultPrevented();
          });
          $element.focusin();
          keyboard.keyDown('enter');
          assert.ok(isDefaultPrevented, 'enter is default prevented');
          keyboard.keyDown('down');
          assert.ok(isDefaultPrevented, 'down is default prevented');
          keyboard.keyDown('up');
          assert.ok(isDefaultPrevented, 'up is default prevented');
          keyboard.keyDown('space');
          assert.ok(isDefaultPrevented, 'space is default prevented');
        });
        test('keyboard navigation does not work in disabled widget', function(assert) {
          var items = [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}];
          var $element = createRadioGroup({
            focusStateEnabled: true,
            items: items,
            disabled: true
          });
          assert.strictEqual($element.attr('tabindex'), undefined, 'collection of radio group has not tabindex');
        });
        test('radio group items should not have tabIndex(T674238)', function(assert) {
          var items = [{text: '0'}, {text: '1'}];
          var $element = createRadioGroup({
            focusStateEnabled: true,
            items: items
          });
          var $items = $element.find('.' + RADIO_BUTTON_CLASS);
          assert.strictEqual($items.eq(0).attr('tabindex'), undefined, 'items of radio group hasn\'t tabindex');
          assert.strictEqual($items.eq(1).attr('tabindex'), undefined, 'items of radio group hasn\'t tabindex');
        });
      });
      if (devices.current().deviceType === 'desktop') {
        registerKeyHandlerTestHelper.runTests({
          createWidget: function($element, options) {
            return $element.dxRadioGroup($.extend({items: [{text: 'text'}]}, options)).dxRadioGroup('instance');
          },
          checkInitialize: true
        });
      }
      module('focus policy', moduleConfig, function() {
        test('focused-state set up on radio group after focusing on any item', function(assert) {
          assert.expect(2);
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true
          });
          var radioGroup = getInstance($radioGroup);
          var $firstRButton = $(radioGroup.itemElements()).first();
          assert.ok(!$radioGroup.hasClass(FOCUSED_CLASS), 'radio group is not focused');
          $radioGroup.focusin();
          $($firstRButton).trigger('dxpointerdown');
          assert.ok($radioGroup.hasClass(FOCUSED_CLASS), 'radio group was focused after focusing on item');
        });
        test('radioGroup item has not dx-state-focused class after radioGroup lose focus', function(assert) {
          assert.expect(2);
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true
          });
          var radioGroup = getInstance($radioGroup);
          var $firstRButton = $(radioGroup.itemElements()).first();
          $radioGroup.focusin();
          $($firstRButton).trigger('dxpointerdown');
          assert.ok($firstRButton.hasClass(FOCUSED_CLASS), 'radioGroup item is focused');
          $radioGroup.focusout();
          assert.ok(!$firstRButton.hasClass(FOCUSED_CLASS), 'radio group item lost focus after focusout on radio group');
        });
        test('RadioGroup item has dx-state-focused class when RadioGroup focused', function(assert) {
          assert.expect(2);
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true
          });
          var radioGroup = getInstance($radioGroup);
          var $firstRButton = $(radioGroup.itemElements()).first();
          assert.ok(!$firstRButton.hasClass(FOCUSED_CLASS));
          $radioGroup.focusin();
          assert.ok($firstRButton.hasClass(FOCUSED_CLASS), 'radioGroup item is focused');
        });
        test('radioGroup element should get \'dx-state-focused\' class', function(assert) {
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true
          });
          $radioGroup.focusin();
          assert.ok($radioGroup.hasClass(FOCUSED_CLASS), 'element got \'dx-state-focused\' class');
        });
        test('option \'accessKey\' has effect', function(assert) {
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true,
            accessKey: 'k'
          });
          var instance = getInstance($radioGroup);
          assert.equal($radioGroup.attr('accessKey'), 'k', 'access key is correct');
          instance.option('accessKey', 'o');
          assert.equal($radioGroup.attr('accessKey'), 'o', 'access key is correct after change');
        });
        test('option \'tabIndex\' has effect', function(assert) {
          var $radioGroup = createRadioGroup({
            items: [1, 2, 3],
            focusStateEnabled: true,
            tabIndex: 4
          });
          var instance = getInstance($radioGroup);
          assert.equal($radioGroup.attr('tabIndex'), 4, 'tab index is correct');
          instance.option('tabIndex', 7);
          assert.equal($radioGroup.attr('tabIndex'), 7, 'tab index is correct after change');
        });
        testInActiveWindow('the \'focus()\' method should set focused class to widget', function(assert) {
          var $radioGroup = createRadioGroup({focusStateEnabled: true});
          var instance = getInstance($radioGroup);
          instance.focus();
          assert.ok($radioGroup.hasClass('dx-state-focused'), 'widget got focused class');
        });
      });
      module('option changed', function() {
        test('focusStateEnabled option change', function(assert) {
          var $radioGroup = createRadioGroup({focusStateEnabled: true});
          var instance = getInstance($radioGroup);
          instance.option('focusStateEnabled', false);
          assert.strictEqual(instance.$element().attr('tabindex'), undefined, 'element is not focusable');
          instance.option('focusStateEnabled', true);
          assert.strictEqual(instance.$element().attr('tabindex'), '0', 'element is focusable');
        });
        test('items option change', function(assert) {
          var $radioGroup = createRadioGroup({items: [1, 2, 3]});
          var instance = getInstance($radioGroup);
          assert.equal($(instance.itemElements()).eq(0).text(), '1', 'item is correct');
          instance.option('items', [4, 5, 6]);
          assert.equal($(instance.itemElements()).eq(0).text(), '4', 'item is correct');
        });
        test('displayExpr option change', function(assert) {
          var radioGroup = getInstance(createRadioGroup({
            dataSource: [{
              id: 1,
              name: 'Item 1'
            }],
            valueExpr: 'id',
            displayExpr: 'id',
            value: 1
          }));
          radioGroup.option('displayExpr', 'name');
          var $item = $(radioGroup.itemElements()).eq(0);
          assert.strictEqual($item.text(), 'Item 1', 'displayExpr works');
        });
        test('items from the getDataSource method are wrong when the dataSource option is changed', function(assert) {
          var instance = getInstance(createRadioGroup({dataSource: [1, 2, 3]}));
          instance.option('dataSource', [4, 5, 6]);
          assert.deepEqual(instance.getDataSource().items(), [4, 5, 6], 'items from data source');
        });
        test('items from the getDataSource method are wrong when the dataSource option is changed if uses an instance of dataSource', function(assert) {
          var instance = getInstance(createRadioGroup({dataSource: new DataSource({store: [1, 2, 3]})}));
          instance.option('dataSource', [4, 5, 6]);
          assert.deepEqual(instance.getDataSource().items(), [4, 5, 6], 'items from data source');
        });
        test('widget should select a correct item if an unexisting item was set as a value but new dataSource has it', function(assert) {
          var instance = getInstance(createRadioGroup({
            dataSource: new DataSource({store: [1, 2, 3]}),
            value: 1
          }));
          instance.option('value', 4);
          instance.option('dataSource', new DataSource({store: [4, 5, 6]}));
          var $radioButtons = instance.$element().find('.dx-radiobutton');
          assert.ok($radioButtons.eq(0).hasClass('dx-radiobutton-checked'), 'correct item is selected');
        });
        test('widget should select a correct item if an unexisting item was set as a value but new Items has it', function(assert) {
          var instance = getInstance(createRadioGroup({
            items: [1, 2, 3],
            value: 1
          }));
          instance.option('value', 4);
          instance.option('items', [4, 5, 6]);
          var $radioButtons = instance.$element().find('.dx-radiobutton');
          assert.ok($radioButtons.eq(0).hasClass('dx-radiobutton-checked'), 'correct item is selected');
        });
        test('There is no error on updating async CustomStore (T9011779)', function(assert) {
          var done = assert.async();
          var items = [{
            id: 1,
            value: 't1'
          }, {
            id: 2,
            value: 't2'
          }, {
            id: 3,
            value: 't3'
          }];
          var storeOptions = {
            key: 'id',
            loadMode: 'processed',
            load: function(loadOptions) {
              return new Promise(function(resolve) {
                resolve(items);
              });
            }
          };
          var options = {
            dataSource: new DataSource({store: new CustomStore(storeOptions)}),
            valueExpr: 'id',
            displayExpr: 'id',
            value: null
          };
          var radioGroup = $('#radioGroup').dxRadioGroup(options).dxRadioGroup('instance');
          setTimeout(function() {
            var newValue2 = 2;
            options.value = newValue2;
            radioGroup.option(options);
            items = [{
              id: 1,
              value: 't1'
            }, {
              id: 2,
              value: 't2'
            }];
            options.dataSource = new DataSource({store: new CustomStore(storeOptions)});
            options.value = newValue2;
            radioGroup.option(options);
            setTimeout(function() {
              assert.ok(true);
              done();
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
    define(["jquery","core/devices","../../helpers/executeAsyncMock.js","../../helpers/keyboardMock.js","data/custom_store","data/data_source/data_source","core/utils/common","../../helpers/registerKeyHandlerTestHelper.js","ui/widget/ui.errors","events/utils","ui/radio_group"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("../../helpers/executeAsyncMock.js"), require("../../helpers/keyboardMock.js"), require("data/custom_store"), require("data/data_source/data_source"), require("core/utils/common"), require("../../helpers/registerKeyHandlerTestHelper.js"), require("ui/widget/ui.errors"), require("events/utils"), require("ui/radio_group"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=radioGroup.tests.js.map