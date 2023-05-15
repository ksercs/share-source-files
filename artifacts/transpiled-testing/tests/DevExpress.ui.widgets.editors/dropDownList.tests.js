!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownList.tests.js"], ["jquery","core/utils/common","core/devices","core/templates/template","core/guid","data/data_source/data_source","data/array_store","data/custom_store","../../helpers/keyboardMock.js","animation/fx","core/utils/type","core/config","../../helpers/ajaxMock.js","ui/drop_down_editor/ui.drop_down_list","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownList.tests.js", ["jquery", "core/utils/common", "core/devices", "core/templates/template", "core/guid", "data/data_source/data_source", "data/array_store", "data/custom_store", "../../helpers/keyboardMock.js", "animation/fx", "core/utils/type", "core/config", "../../helpers/ajaxMock.js", "ui/drop_down_editor/ui.drop_down_list", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      noop,
      devices,
      Template,
      Guid,
      DataSource,
      ArrayStore,
      CustomStore,
      keyboardMock,
      fx,
      isRenderer,
      config,
      ajaxMock,
      LIST_ITEM_SELECTOR,
      STATE_FOCUSED_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      POPUP_CONTENT_CLASS,
      LIST_CLASS,
      EMPTY_MESSAGE_CLASS,
      SCROLLVIEW_CONTENT_CLASS,
      TIME_TO_WAIT,
      getPopup,
      getList,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      Guid = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dropDownList"></div>\
        <div id="popup"></div>';
        $('#qunit-fixture').html(markup);
      });
      LIST_ITEM_SELECTOR = '.dx-list-item';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      LIST_CLASS = 'dx-list';
      EMPTY_MESSAGE_CLASS = 'dx-empty-message';
      SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
      TIME_TO_WAIT = 500;
      getPopup = function(instance) {
        return instance._popup;
      };
      getList = function(instance) {
        return instance._list;
      };
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      };
      QUnit.module('focus policy', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#dropDownList').dxDropDownList({
            focusStateEnabled: true,
            dataSource: ['item 1', 'item 2', 'item 3']
          });
          this.instance = this.$element.dxDropDownList('instance');
          this.$input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          this.keyboard = keyboardMock(this.$input);
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('focus removed from list on type some text', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.instance.option('opened', true);
          this.clock.tick(TIME_TO_WAIT);
          this.keyboard.keyDown('down');
          var $firstItem = this.instance._$list.find(LIST_ITEM_SELECTOR).eq(0);
          assert.equal(isRenderer(getList(this.instance).option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.ok($firstItem.hasClass(STATE_FOCUSED_CLASS), 'first list element is focused');
          this.keyboard.type('some text');
          assert.ok(!$firstItem.hasClass(STATE_FOCUSED_CLASS), 'first list element is not focused');
        });
        QUnit.testInActiveWindow('popup should not focus when we selecting an item', function(assert) {
          this.instance.option('opened', true);
          var mouseDownStub = sinon.stub();
          var $popupContent = $(getPopup(this.instance).$content());
          $popupContent.on('mousedown', mouseDownStub).trigger('mousedown').trigger('mouseup');
          assert.notOk(mouseDownStub.getCall(0).args[0].isDefaultPrevented(), 'mousedown isn\'t prevented');
          if (devices.real().deviceType === 'desktop') {
            assert.ok(this.$element.hasClass(STATE_FOCUSED_CLASS), 'element save focused state after click on popup content');
          }
        });
        QUnit.test('hover and focus states for list should be initially disabled on mobile devices only', function(assert) {
          this.instance.option('opened', true);
          var list = $(("." + LIST_CLASS)).dxList('instance');
          if (devices.real().deviceType === 'desktop') {
            assert.ok(list.option('hoverStateEnabled'), 'hover state should be enabled on desktop');
            assert.ok(list.option('focusStateEnabled'), 'focus state should be enabled on desktop');
          } else {
            assert.notOk(list.option('hoverStateEnabled'), 'hover state should be disabled on mobiles');
            assert.notOk(list.option('focusStateEnabled'), 'focus state should be disabled on mobiles');
          }
        });
        QUnit.test('changing hover and focus states for list should be enabled on desktop only', function(assert) {
          this.instance.option('opened', true);
          var list = $(("." + LIST_CLASS)).dxList('instance');
          this.instance.option({
            hoverStateEnabled: false,
            focusStateEnabled: false
          });
          if (devices.real().deviceType === 'desktop') {
            assert.notOk(list.option('hoverStateEnabled'), 'hover state should be changed to disabled on desktop');
            assert.notOk(list.option('focusStateEnabled'), 'focus state should be changed to disabled on desktop');
          } else {
            this.instance.option({
              hoverStateEnabled: true,
              focusStateEnabled: true
            });
            assert.notOk(list.option('hoverStateEnabled'), 'hover state should not be changed on mobiles');
            assert.notOk(list.option('focusStateEnabled'), 'focus state should not be changed on mobiles');
          }
        });
        QUnit.test('setFocusPolicy should correctly renew subscription', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var setFocusPolicySpy = sinon.spy(this.instance, '_setFocusPolicy');
          this.instance.option('onChange', noop);
          this.instance.option('onKeyUp', noop);
          this.$input.trigger('input');
          assert.equal(setFocusPolicySpy.callCount, 1, 'setFocusPollicy called once');
        });
        [false, true].forEach(function(searchEnabled) {
          [false, true].forEach(function(acceptCustomValue) {
            var isEditable = acceptCustomValue || searchEnabled;
            var position = isEditable ? 'end' : 'beginning';
            var testTitle = ("caret should be set to the " + position + " of the text after click on the dropDown button when ") + ("\"acceptCustomValue\" is " + acceptCustomValue + " and \"searchEnabled\" is " + searchEnabled + " (T976700)");
            QUnit.testInActiveWindow(testTitle, function(assert) {
              var value = '1234567890abcdefgh';
              this.instance.option({
                items: [value],
                showDropDownButton: true,
                acceptCustomValue: acceptCustomValue,
                searchEnabled: searchEnabled,
                value: value
              });
              var $dropDownButton = this.$element.find('.dx-dropdowneditor-button');
              var input = this.$element.find(("." + TEXTEDITOR_INPUT_CLASS)).get(0);
              var expectedPosition = isEditable ? value.length : 0;
              $dropDownButton.trigger('dxclick');
              assert.strictEqual(input.selectionStart, expectedPosition, 'correct start position');
              assert.strictEqual(input.selectionEnd, expectedPosition, 'correct end position');
            });
          });
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
          this.$element = $('#dropDownList').dxDropDownList({
            focusStateEnabled: true,
            dataSource: ['item 1', 'item 2', 'item 3'],
            applyValueMode: 'instantly'
          });
          this.clock = sinon.useFakeTimers();
          this.instance = this.$element.dxDropDownList('instance');
          this.$input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          this.popup = getPopup(this.instance);
          this.$list = this.instance._$list;
          this.keyboard = keyboardMock(this.$input);
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('focusout should not be fired on input element', function(assert) {
          var onFocusOutStub = sinon.stub();
          this.instance.option('onFocusOut', onFocusOutStub);
          this.$element.focusin();
          this.keyboard.keyDown('tab');
          assert.equal(onFocusOutStub.callCount, 0, 'onFocusOut wasn\'t fired');
        });
        QUnit.test('focusout should be prevented when list clicked', function(assert) {
          assert.expect(1);
          this.instance.open();
          var $list = $(this.instance.content()).find(("." + LIST_CLASS));
          $list.on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'mousedown was prevented and lead to focusout prevent');
          });
          $list.trigger('mousedown');
        });
        QUnit.test('list should not have tab index to prevent its focusing when scrollbar clicked', function(assert) {
          this.instance.option({
            items: [1, 2, 3, 4, 5, 6],
            opened: true,
            value: null
          });
          var $content = $(this.instance.content());
          var $list = $content.find(("." + LIST_CLASS));
          assert.notOk($list.attr('tabIndex'), 'list have no tabindex');
        });
        QUnit.testInActiveWindow('popup hides on tab', function(assert) {
          this.instance.focus();
          assert.ok(this.$element.hasClass(STATE_FOCUSED_CLASS), 'element is focused');
          this.instance.open();
          this.keyboard.keyDown('tab');
          assert.equal(this.instance.option('opened'), false, 'popup is hidden');
        });
        QUnit.test('event should be a parameter for onValueChanged function after select an item via tab', function(assert) {
          var valueChangedHandler = sinon.spy();
          this.instance.option({
            opened: true,
            onValueChanged: valueChangedHandler
          });
          var $content = $(this.instance.content());
          var list = $content.find(("." + LIST_CLASS)).dxList('instance');
          var $listItem = $content.find(LIST_ITEM_SELECTOR).eq(0);
          list.option('focusedElement', $listItem);
          this.keyboard.keyDown('tab');
          assert.ok(valueChangedHandler.getCall(0).args[0].event, 'event is defined');
        });
        QUnit.test('No item should be chosen after pressing tab', function(assert) {
          this.instance.option('opened', true);
          this.$input.focusin();
          this.keyboard.keyDown('tab');
          assert.equal(this.instance.option('value'), null, 'value was set correctly');
        });
        QUnit.test('DropDownList does not crushed after pressing pageup, pagedown keys when list doesn\'t have focused item', function(assert) {
          assert.expect(0);
          this.instance.option('opened', true);
          this.$input.focusin();
          try {
            this.keyboard.keyDown('pagedown');
            this.keyboard.keyDown('pageup');
          } catch (e) {
            assert.ok(false, 'exception was threw');
          }
        });
      });
      QUnit.module('displayExpr', moduleConfig, function() {
        QUnit.test('displayExpr has item in argument', function(assert) {
          var args = [];
          var dataSource = [1, 2, 3];
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: dataSource,
            deferRendering: false,
            value: 2,
            useItemTextAsTitle: false,
            displayExpr: function(item) {
              args.push(item);
            }
          });
          $dropDownList.dxDropDownList('option', 'opened', true);
          this.clock.tick(10);
          assert.deepEqual(args, [2].concat(dataSource), 'displayExpr args is correct');
        });
        QUnit.test('submit value should be equal to the displayExpr in case value is object and valueExpr isn\'t an object field', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [{text: 'test'}],
            deferRendering: false,
            value: {text: 'test'},
            displayExpr: 'text',
            useHiddenSubmitElement: true
          });
          var $submitInput = $dropDownList.find('input[type=\'hidden\']');
          assert.equal($submitInput.val(), 'test', 'the submit value is correct');
        });
        QUnit.test('submit value should be equal to the primitive value type', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: ['test'],
            deferRendering: false,
            value: 'test',
            displayExpr: function(item) {
              if (item) {
                return item + '123';
              }
            },
            useHiddenSubmitElement: true
          });
          var $submitInput = $dropDownList.find('input[type=\'hidden\']');
          assert.equal($submitInput.val(), 'test', 'the submit value is correct');
        });
      });
      QUnit.module('items & dataSource', moduleConfig, function() {
        QUnit.test('No data text message - custom value with link, encodeNoDataText: false', function(assert) {
          var noDataText = '<a href="javascript:alert(1)">link</a>';
          var dropDownList = $('#dropDownList').dxDropDownList({
            noDataText: noDataText,
            encodeNoDataText: false,
            deferRendering: false
          }).dxDropDownList('instance');
          assert.strictEqual($(("." + EMPTY_MESSAGE_CLASS)).html(), noDataText);
          noDataText = noDataText + 'no data';
          dropDownList.option({noDataText: noDataText});
          assert.strictEqual($(("." + EMPTY_MESSAGE_CLASS)).html(), noDataText);
        });
        QUnit.test('No data text message - custom value with link, encodeNoDataText: true', function(assert) {
          var noDataText = '<a href="javascript:alert(1)">link</a>';
          var encodedNoDataText = '&lt;a href="javascript:alert(1)"&gt;link&lt;/a&gt;';
          var dropDownList = $('#dropDownList').dxDropDownList({
            noDataText: noDataText,
            encodeNoDataText: true,
            deferRendering: false
          }).dxDropDownList('instance');
          assert.strictEqual($(("." + EMPTY_MESSAGE_CLASS)).html(), encodedNoDataText);
          noDataText = noDataText + 'no data';
          dropDownList.option({noDataText: noDataText});
          assert.strictEqual($(("." + EMPTY_MESSAGE_CLASS)).html(), encodedNoDataText + 'no data');
        });
        QUnit.test('default value is null', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList();
          var instance = $dropDownList.dxDropDownList('instance');
          assert.strictEqual(instance.option('value'), null, 'value is null on default');
        });
        QUnit.test('wrapItemText option', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            items: [1],
            deferRendering: false,
            wrapItemText: true
          });
          var instance = $dropDownList.dxDropDownList('instance');
          var $itemContainer = $(instance.content()).find('.dx-scrollview-content');
          assert.ok($itemContainer.hasClass('dx-wrap-item-text'), 'class was added');
          instance.option('wrapItemText', false);
          assert.notOk($itemContainer.hasClass('dx-wrap-item-text'), 'class was removed');
        });
        [true, false].forEach(function(useItemTextAsTitle) {
          QUnit.test(("useItemTextAsTitle=" + useItemTextAsTitle + " option should be passed to list on init"), function(assert) {
            var dropDownList = $('#dropDownList').dxDropDownList({
              deferRendering: false,
              useItemTextAsTitle: useItemTextAsTitle
            }).dxDropDownList('instance');
            var list = getList(dropDownList);
            assert.strictEqual(list.option('useItemTextAsTitle'), useItemTextAsTitle, 'list option initial value is correct');
          });
          QUnit.test(("useItemTextAsTitle option runtime change to " + useItemTextAsTitle + " should be passed to list"), function(assert) {
            var dropDownList = $('#dropDownList').dxDropDownList({
              deferRendering: false,
              useItemTextAsTitle: !useItemTextAsTitle
            }).dxDropDownList('instance');
            var list = getList(dropDownList);
            dropDownList.option('useItemTextAsTitle', useItemTextAsTitle);
            assert.strictEqual(list.option('useItemTextAsTitle'), useItemTextAsTitle, 'list option value is correct after runtime change');
          });
        });
        QUnit.test('widget should render with empty items', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            items: null,
            opened: true
          });
          var instance = $dropDownList.dxDropDownList('instance');
          assert.ok(instance, 'widget was rendered');
        });
        QUnit.test('items option contains items from dataSource after load', function(assert) {
          var dataSource = [1, 2, 3];
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: dataSource,
            deferRendering: false
          });
          this.clock.tick(10);
          assert.deepEqual($dropDownList.dxDropDownList('option', 'items'), dataSource, 'displayExpr args is correct');
        });
        QUnit.test('all items', function(assert) {
          var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
          var $dropDownList = $('#dropDownList').dxDropDownList({
            items: items,
            opened: true
          });
          this.clock.tick(10);
          assert.deepEqual($dropDownList.dxDropDownList('option', 'items'), items, 'rendered all items');
        });
        QUnit.test('calcNextItem private method should work', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3, 4],
            opened: true,
            value: 2
          });
          var dropDownList = $dropDownList.dxDropDownList('instance');
          assert.strictEqual(dropDownList._calcNextItem(1), 3, 'step forward');
          assert.strictEqual(dropDownList._calcNextItem(-1), 1, 'step backward');
        });
        QUnit.test('items private method should work', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3, 4],
            opened: true,
            value: 2
          });
          var dropDownList = $dropDownList.dxDropDownList('instance');
          assert.deepEqual(dropDownList._items(), [1, 2, 3, 4], 'items are correct');
        });
        QUnit.test('fitIntoRange private method should work', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3, 4],
            opened: true,
            value: 2
          });
          var dropDownList = $dropDownList.dxDropDownList('instance');
          assert.deepEqual(dropDownList._fitIntoRange(1, 2, 4), 4, 'smaller than min');
          assert.deepEqual(dropDownList._fitIntoRange(3, 2, 4), 3, 'in range');
          assert.deepEqual(dropDownList._fitIntoRange(5, 2, 4), 2, 'larger than max');
        });
        QUnit.test('getSelectedIndex private method should work', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [{id: 1}, {id: 2}],
            opened: true,
            valueExpr: 'id',
            value: 2
          });
          var dropDownList = $dropDownList.dxDropDownList('instance');
          assert.deepEqual(dropDownList._getSelectedIndex(), 1, 'index is correct');
        });
        QUnit.test('widget should be openable if dataSource is null', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({dataSource: [1]}).dxDropDownList('instance');
          dropDownList.option('dataSource', null);
          dropDownList.open();
          assert.ok(true, 'Widget works correctly');
        });
        QUnit.test('itemTemplate accepts template', function(assert) {
          var $template = $('<div>').text('test');
          $('#dropDownList').dxDropDownList({
            items: [1],
            displayExpr: 'this',
            opened: true,
            itemTemplate: new Template($template)
          });
          this.clock.tick(10);
          assert.equal($.trim($('.dx-list-item').text()), 'test', 'template rendered');
        });
        QUnit.test('dataSource with Guid key', function(assert) {
          var guidKey1 = 'bd330029-8106-6d2d-5371-f27325155e99';
          var dataSource = new DataSource({
            load: function() {
              return [{
                key: new Guid(guidKey1),
                value: 'one'
              }];
            },
            byKey: function(key, extra) {
              return {
                key: new Guid(guidKey1),
                value: 'one'
              };
            },
            key: 'key',
            keyType: 'Guid'
          });
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: dataSource,
            value: {
              key: new Guid(guidKey1),
              value: 'one'
            },
            valueExpr: 'this',
            displayExpr: 'value'
          });
          assert.equal($dropDownList.dxDropDownList('option', 'text'), 'one', 'value displayed');
        });
        QUnit.test('set item when key is 0', function(assert) {
          var data = [{
            key: 0,
            value: 'one'
          }];
          var store = new CustomStore({
            load: function() {
              return data;
            },
            byKey: function(key) {
              return key === data[0].key ? data[0] : null;
            },
            key: 'key'
          });
          var $dropDownList = $('#dropDownList').dxDropDownList({
            displayExpr: 'value',
            valueExpr: 'this',
            dataSource: store
          });
          var dropDownList = $dropDownList.dxDropDownList('instance');
          dropDownList.option('value', {
            key: 0,
            value: 'one'
          });
          this.clock.tick(10);
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), 'one', 'item displayed');
        });
        QUnit.test('composite keys should be supported (T431267)', function(assert) {
          var data = [{
            a: 1,
            b: 1,
            value: 'one'
          }, {
            a: 1,
            b: 2,
            value: 'two'
          }];
          var dropDownList = $('#dropDownList').dxDropDownList({dataSource: new CustomStore({
              load: function() {
                return data;
              },
              byKey: function(key) {
                return data.reduce(function(_, current) {
                  if (current.a === key.a && current.b === key.b) {
                    return current;
                  }
                });
              },
              key: ['a', 'b']
            })}).dxDropDownList('instance');
          dropDownList.option('value', data[1]);
          assert.deepEqual(dropDownList.option('selectedItem'), data[1], 'the selected item is set correctly');
        });
        QUnit.test('T321572: dxSelectBox - Use clear button with custom store leads to duplicate items', function(assert) {
          var productSample = [{
            'ID': 1,
            'Name': 'HD Video Player'
          }, {
            'ID': 2,
            'Name': 'SuperHD Player'
          }, {
            'ID': 3,
            'Name': 'SuperPlasma 50'
          }, {
            'ID': 4,
            'Name': 'SuperLED 50'
          }, {
            'ID': 5,
            'Name': 'SuperLED 42'
          }, {
            'ID': 6,
            'Name': 'SuperLCD 55'
          }, {
            'ID': 7,
            'Name': 'SuperLCD 42'
          }, {
            'ID': 8,
            'Name': 'SuperPlasma 65'
          }, {
            'ID': 9,
            'Name': 'SuperLCD 70'
          }];
          var $element = $('#dropDownList').dxDropDownList({
            displayExpr: 'Name',
            valueExpr: 'ID',
            dataSource: new DataSource({store: new CustomStore({
                key: 'ID',
                byKey: noop,
                load: function(options) {
                  return productSample.slice(options.skip, options.skip + options.take);
                },
                pageSize: 5
              })}),
            placeholder: 'Choose Product',
            showClearButton: true,
            opened: true
          });
          var scrollView = $('.dx-scrollview').dxScrollView('instance');
          scrollView.scrollToElement($('.dx-list-item').last());
          scrollView.scrollToElement($('.dx-list-item').last());
          var dataSource = $element.dxDropDownList('option', 'dataSource');
          assert.ok(dataSource.isLastPage(), 'last page is loaded');
          $('.dx-list-item').last().trigger('dxclick');
          $($element.find('.dx-clear-button-area')).trigger('dxclick');
          assert.ok(dataSource.isLastPage(), 'last page is not changed');
        });
        QUnit.test('items value should be escaped', function(assert) {
          var $element = $('#dropDownList').dxDropDownList({
            dataSource: [{
              'CustId': -1,
              'Customer': '<None>'
            }],
            displayExpr: 'Customer',
            valueExpr: 'CustId'
          });
          var instance = $element.dxDropDownList('instance');
          instance.option('opened', true);
          assert.equal($.trim($('.dx-list-item').text()), '<None>', 'template rendered');
        });
        QUnit.test('searchTimeout should be refreshed after next symbol entered', function(assert) {
          var loadHandler = sinon.spy();
          var $element = $('#dropDownList').dxDropDownList({
            searchEnabled: true,
            dataSource: new CustomStore({
              load: loadHandler,
              byKey: noop
            }),
            searchTimeout: 100
          });
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          var kb = keyboardMock($input);
          kb.type('1');
          this.clock.tick(100);
          assert.equal(loadHandler.callCount, 1, 'dataSource loaded after search timeout');
          kb.type('2');
          this.clock.tick(60);
          kb.type('3');
          this.clock.tick(60);
          assert.equal(loadHandler.callCount, 1, 'new time should start when new character is entered. DataSource should not load again');
          this.clock.tick(40);
          assert.equal(loadHandler.callCount, 2, 'dataSource loaded when full time is over after last input character');
        });
        QUnit.module('search', {beforeEach: function() {
            var $__3 = this;
            this.$element = $('#dropDownList').dxDropDownList({
              searchEnabled: true,
              dataSource: ['1', 'ㅏ'],
              deferRendering: false
            });
            this.instance = this.$element.dxDropDownList('instance');
            this.$input = this.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
            this.keyboard = keyboardMock(this.$input);
            this.getListItemsCount = function() {
              var $content = $($__3.instance.content());
              var $listItems = $content.find(LIST_ITEM_SELECTOR);
              return $listItems.length;
            };
          }}, function() {
          QUnit.test('dropDownList should search for a pasted value', function(assert) {
            this.$input.val('1');
            this.keyboard.input();
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(this.getListItemsCount(), 1, 'was search');
          });
          QUnit.test('should not search if composition is in progress (T1003899)', function(assert) {
            if (devices.real().platform === 'android') {
              assert.expect(0);
              return;
            }
            this.$input.trigger($.Event('compositionstart'));
            this.keyboard.type('ㅇ');
            this.clock.tick(TIME_TO_WAIT);
            this.keyboard.type('ㅡ');
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(this.getListItemsCount(), 2, 'was no search');
          });
          QUnit.test('should not cancel search on input if composition is in progress', function(assert) {
            this.keyboard.type('2');
            this.$input.trigger($.Event('compositionstart'));
            this.keyboard.type('ㅇ');
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(this.getListItemsCount(), 0, 'search is still in progress');
          });
          QUnit.test('should not get composite characters as search value when compositionend is raised because of next composition start', function(assert) {
            if (devices.real().platform === 'android') {
              assert.expect(0);
              return;
            }
            this.$input.trigger($.Event('compositionstart'));
            this.keyboard.type('ㅏ');
            this.$input.trigger($.Event('compositionend'));
            this.$input.trigger($.Event('compositionstart'));
            this.keyboard.type('ㅇ');
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(this.getListItemsCount(), 1, 'last input composite character is not in search value');
          });
          QUnit.test('should search if composition is finished', function(assert) {
            this.$input.trigger($.Event('compositionstart'));
            this.keyboard.type('ㅇ');
            this.clock.tick(TIME_TO_WAIT);
            this.keyboard.type('ㅡ');
            this.clock.tick(TIME_TO_WAIT);
            this.$input.trigger($.Event('compositionend'));
            this.clock.tick(TIME_TO_WAIT);
            assert.strictEqual(this.getListItemsCount(), 0, 'was search');
          });
        });
        QUnit.test('dropDownList should search in grouped DataSource', function(assert) {
          var $element = $('#dropDownList').dxDropDownList({
            grouped: true,
            searchEnabled: true,
            valueExpr: 'name',
            displayExpr: 'name',
            searchExpr: 'name',
            dataSource: [{
              key: 'a',
              items: [{name: '1'}]
            }, {
              key: 'b',
              items: [{name: '2'}]
            }]
          });
          var instance = $element.dxDropDownList('instance');
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          var kb = keyboardMock($input);
          var expectedValue = {
            key: 'b',
            items: [{
              name: '2',
              key: 'b'
            }]
          };
          kb.type('2');
          this.clock.tick(TIME_TO_WAIT);
          assert.deepEqual(instance.option('items')[0], expectedValue, 'widget searched for a suitable values');
        });
        QUnit.test('valueExpr should not be passed to the list if it is \'this\'', function(assert) {
          $('#dropDownList').dxDropDownList({
            dataSource: [{
              id: 1,
              text: 'Item 1'
            }],
            displayExpr: 'text',
            valueExpr: 'this',
            opened: true
          });
          var list = $(("." + LIST_CLASS)).dxList('instance');
          assert.equal(list.option('keyExpr'), null, 'keyExpr is correct');
        });
        QUnit.test('valueExpr should be passed to the list\'s keyExpr option', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [{
              id: 1,
              text: 'Item 1'
            }],
            displayExpr: 'text',
            valueExpr: 'id',
            opened: true
          }).dxDropDownList('instance');
          var list = $(("." + LIST_CLASS)).dxList('instance');
          assert.equal(list.option('keyExpr'), 'id', 'keyExpr should be passed on init');
          dropDownList.option('valueExpr', 'this');
          assert.equal(list.option('keyExpr'), null, 'keyExpr should be cleared when valueExpr was changed to \'this\'');
          dropDownList.option('valueExpr', 'text');
          assert.equal(list.option('keyExpr'), 'text', 'keyExpr should be passed on optionChanged');
        });
        QUnit.test('value option should be case-sensitive', function(assert) {
          var $element = $('#dropDownList').dxDropDownList({
            dataSource: [{text: 'first'}, {text: 'First'}],
            displayExpr: 'text',
            valueExpr: 'text'
          });
          var instance = $element.dxDropDownList('instance');
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), '');
          instance.option('value', 'First');
          assert.equal($input.val(), 'First');
        });
        QUnit.test('set items on init when items of a data source are loaded', function(assert) {
          var arrayStore = new ArrayStore({
            data: [{
              id: 1,
              text: 'first'
            }, {
              id: 2,
              text: 'second'
            }],
            key: 'id'
          });
          var customStore = new CustomStore({
            load: function(options) {
              return arrayStore.load(options);
            },
            byKey: function(key) {
              return arrayStore.byKey(key);
            },
            key: 'id'
          });
          var dataSource = new DataSource({store: customStore});
          var createDropDownList = function() {
            return $('<div/>').appendTo($('#dropDownList')).dxDropDownList({
              dataSource: dataSource,
              displayExpr: 'text',
              valueExpr: 'id',
              opened: true,
              value: 1
            }).dxDropDownList('instance');
          };
          createDropDownList();
          $('#dropDownList').empty();
          var spy = sinon.spy(customStore, 'byKey');
          var instance = createDropDownList();
          var $listItem = $(instance._$list.find(LIST_ITEM_SELECTOR).eq(1));
          $listItem.trigger('dxclick');
          assert.equal(spy.callCount, 0, 'byKey is not called when items are loaded');
        });
        QUnit.module('byKey call result should be ignored', {beforeEach: function() {
            var $__3 = this;
            this.callCount = 0;
            this.items = [{
              id: 1,
              text: 'first'
            }, {
              id: 2,
              text: 'second'
            }];
            this.customStore = new CustomStore({
              load: function() {
                var deferred = $.Deferred();
                setTimeout(function() {
                  deferred.resolve({
                    data: $__3.items,
                    totalCount: $__3.items.length
                  });
                }, 100);
                return deferred.promise();
              },
              byKey: function(key) {
                var deferred = $.Deferred();
                var filter = function() {
                  return $__3.items.find(function(item) {
                    return item.id === key;
                  });
                };
                if ($__3.callCount === 0) {
                  setTimeout(function() {
                    deferred.resolve(filter());
                  }, 2000);
                } else {
                  setTimeout(function() {
                    deferred.resolve(filter());
                  }, 1000);
                }
                ++$__3.callCount;
                return deferred.promise();
              }
            });
            this.dataSource = new DataSource({store: this.customStore});
            this.dropDownList = $('#dropDownList').dxDropDownList({
              dataSource: this.dataSource,
              displayExpr: 'text',
              valueExpr: 'id',
              value: 1
            }).dxDropDownList('instance');
          }}, function() {
          QUnit.test('after new call', function(assert) {
            this.dropDownList.option('value', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownList.option('selectedItem').id, 2, 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownList.option('selectedItem').id, 2, 'first init byKey result is ignored');
          });
          QUnit.test('after value change to already loaded value', function(assert) {
            this.dropDownList.open();
            this.clock.tick(100);
            this.dropDownList.option('value', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownList.option('selectedItem').id, 2, 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownList.option('selectedItem').id, 2, 'first init byKey result is ignored');
          });
          QUnit.test('after change value to undefined (T1008488)', function(assert) {
            this.dropDownList.option('value', undefined);
            this.clock.tick(2000);
            assert.strictEqual(this.dropDownList.option('selectedItem'), null, 'init byKey result is ignored');
          });
          QUnit.test('after value reset', function(assert) {
            this.dropDownList.reset();
            this.clock.tick(2000);
            assert.strictEqual(this.dropDownList.option('selectedItem'), null, 'byKey result is ignored');
          });
        });
      });
      QUnit.module('selectedItem', moduleConfig, function() {
        QUnit.test('selectedItem', function(assert) {
          var items = [{
            key: 1,
            value: 'one'
          }, {
            key: 2,
            value: 'two'
          }];
          var dropDownList = $('#dropDownList').dxDropDownList({
            items: items,
            valueExpr: 'key',
            opened: true,
            value: 1
          }).dxDropDownList('instance');
          this.clock.tick(10);
          assert.deepEqual(dropDownList.option('selectedItem'), items[0], 'selected item');
        });
        QUnit.test('selectedItem and value should be reset on loading new items', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            items: [1, 2, 3, 4],
            value: 1,
            selectedItem: 1
          }).dxDropDownList('instance');
          this.clock.tick(10);
          dropDownList.option('items', ['a', 'b', 's', 'd']);
          this.clock.tick(10);
          assert.strictEqual(dropDownList.option('value'), 1, 'value is unchanged');
          assert.strictEqual(dropDownList.option('selectedItem'), null, 'selected item was reset');
        });
        QUnit.test('selectedItem and value should be reset on loading new dataSource', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: ['1', '2', '3', '4'],
            value: '1',
            selectedItem: '1'
          }).dxDropDownList('instance');
          this.clock.tick(10);
          dropDownList.option('dataSource', ['a', 'b', 's', 'd']);
          this.clock.tick(10);
          assert.strictEqual(dropDownList.option('value'), '1', 'value is unchanged');
          assert.strictEqual(dropDownList.option('selectedItem'), null, 'selected item was reset');
        });
        QUnit.test('selectedItem and value should not be reset on loading new dataSource, if the same element is contained in new dataSource', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [],
            value: 2,
            selectedItem: 2
          }).dxDropDownList('instance');
          this.clock.tick(10);
          dropDownList.option('dataSource', [5, 2, 6, 7]);
          this.clock.tick(10);
          assert.strictEqual(dropDownList.option('value'), 2, 'value is correct');
          assert.strictEqual(dropDownList.option('selectedItem'), 2, 'selected item was not reset');
        });
        QUnit.test('\'null\' value processed correctly', function(assert) {
          var store = new ArrayStore({
            key: 'k',
            data: [{
              k: 1,
              v: 'a'
            }, {
              k: 2,
              v: 'b'
            }]
          });
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [0, 2, 3, 4],
            value: 0,
            selectedItem: 0
          }).dxDropDownList('instance');
          try {
            dropDownList.option('dataSource', store);
            assert.strictEqual(dropDownList.option('value'), 0, 'value is unchanged');
            assert.strictEqual(dropDownList.option('selectedItem'), null, 'selectedItem is null');
          } catch (e) {
            assert.ok(false, 'value was unwrapped incorrectly');
          }
        });
        QUnit.test('onSelectionChanged args should provide selectedItem (T193115)', function(assert) {
          assert.expect(2);
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: {
              load: function() {
                return [1, 2, 3, 4, 5];
              },
              byKey: function(key) {
                var deferred = $.Deferred();
                setTimeout(function() {
                  deferred.resolve(key);
                });
                return deferred.promise();
              }
            },
            value: 2,
            onSelectionChanged: function(e) {
              assert.ok(Object.prototype.hasOwnProperty.call(e, 'selectedItem'), 'onSelectionChanged fired on creation when selectedItem is loaded');
            }
          });
          this.clock.tick(10);
          $dropDownList.dxDropDownList('option', 'onSelectionChanged', function(e) {
            assert.equal(e.selectedItem, 1, 'selectedItem provided in onValueChanged');
          });
          $dropDownList.dxDropDownList('option', 'value', 1);
          this.clock.tick(10);
        });
        QUnit.test('selectedItem should be chosen synchronously if item is already loaded', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: {
              store: new CustomStore({
                load: function(options) {
                  var result = [];
                  for (var i = options.skip; i < options.take; i++) {
                    result.push(i);
                  }
                  return result;
                },
                byKey: function(key) {
                  assert.ok(false, 'dataSource.byKey should not be called to fetch selected item');
                }
              }),
              pageSize: 1,
              paginate: true
            },
            opened: true
          });
          this.clock.tick(10);
          $(("." + LIST_CLASS)).dxList('_loadNextPage');
          this.clock.tick(10);
          $dropDownList.dxDropDownList('option', 'value', 0);
          assert.equal($dropDownList.dxDropDownList('option', 'selectedItem'), 0, 'selectedItem is fetched');
        });
        QUnit.test('selectedItem should be chosen correctly if deferRendering = false and dataSource is async', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: {store: new CustomStore({
                load: function(options) {
                  var deferred = $.Deferred();
                  setTimeout(function() {
                    deferred.resolve([1, 2, 3, 4, 5, 6, 7]);
                  }, 100);
                  return deferred.promise();
                },
                byKey: function(key) {
                  var res = $.Deferred();
                  setTimeout(function() {
                    res.resolve(key);
                  }, 10);
                  return res.promise();
                }
              })},
            opened: false,
            value: 1,
            deferRendering: false
          }).dxDropDownList('instance');
          dropDownList.option('opened', true);
          this.clock.tick(TIME_TO_WAIT);
          assert.equal(getList(dropDownList).option('selectedItem'), 1, 'selectedItem is correct');
        });
        QUnit.test('reset()', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3, 4],
            value: 2,
            selectedItem: 2
          }).dxDropDownList('instance');
          dropDownList.reset();
          assert.strictEqual(dropDownList.option('value'), null, 'Value should be reset');
          assert.strictEqual(dropDownList.option('selectedItem'), null, 'Value should be reset');
        });
        QUnit.test('onSelectionChanged action should not be fired after dataSource has been updated and selectedItem was not changed', function(assert) {
          var selectionChangedHandler = sinon.spy();
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [],
            value: 'unknown value',
            valueExpr: 'id',
            displayExpr: 'name',
            acceptCustomValue: true,
            onSelectionChanged: selectionChangedHandler
          }).dxDropDownList('instance');
          dropDownList.option('dataSource', [{
            id: 0,
            name: 'zero'
          }, {
            id: 1,
            name: 'one'
          }]);
          assert.strictEqual(selectionChangedHandler.callCount, 0, 'selectionChanged action was not fired');
        });
        QUnit.test('selectionChanged should not fire if selectedItem was not changed', function(assert) {
          var selectionChangedHandler = sinon.stub();
          var items = [{name: 'item1'}, {name: 'item2'}];
          var instance = $('#dropDownList').dxDropDownList({
            dataSource: items,
            value: items[0],
            onSelectionChanged: selectionChangedHandler,
            displayExpr: 'name'
          }).dxDropDownList('instance');
          assert.strictEqual(instance.option('selectedItem'), items[0], 'selectedItem is correct on init');
          instance.option('selectedItem', items[0]);
          assert.strictEqual(instance.option('selectedItem'), items[0], 'selectedItem was not changed');
          assert.equal(selectionChangedHandler.callCount, 1, 'selectionChanged should not fire twice');
        });
      });
      QUnit.module('popup', moduleConfig, function() {
        QUnit.test('popup max height should fit in the window', function(assert) {
          var items = ['item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3'];
          $('#dropDownList').dxDropDownList({
            items: items,
            opened: true
          }).dxDropDownList('instance');
          assert.ok($('.dx-overlay-content').height() <= Math.ceil($(window).height() * 0.5));
        });
        QUnit.test('popup max height are limited by container bounds', function(assert) {
          var items = ['item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3', 'item 1', 'item 2', 'item 3'];
          var parentContainer = $('<div>').attr('id', 'specific-container').height(80).appendTo('#qunit-fixture');
          var childContainer = $('<div>').attr('id', 'child-container').height(60).appendTo(parentContainer);
          var instance = $('#dropDownList').dxDropDownList({
            items: items,
            dropDownOptions: {container: childContainer},
            opened: true
          }).dxDropDownList('instance');
          assert.ok($(instance.content()).parent().height() > 80, 'popup sizes are not limited if container has no overflow: hidden styles');
          parentContainer.css('overflow', 'hidden');
          instance.close();
          instance.open();
          assert.roughEqual($(instance.content()).parent().height(), 80 / 2, 2, 'popup sizes are limited by container parent bounds');
          childContainer.css('overflow', 'hidden');
          instance.repaint();
          assert.roughEqual($(instance.content()).parent().height(), 60 / 2, 2, 'popup sizes are limited by container bounds');
          parentContainer.remove();
        });
        QUnit.test('popup max height are limited by container bounds and window', function(assert) {
          var items = [];
          for (var i = 0; i < 100; i++) {
            items.push(("item " + i));
          }
          var windowHeight = $(window).outerHeight();
          var parentContainer = $('<div>').attr('id', 'specific-container').css('overflow', 'hidden').height(windowHeight * 2).appendTo('#qunit-fixture');
          var instance = $('#dropDownList').dxDropDownList({
            items: items,
            dropDownOptions: {container: parentContainer},
            opened: true
          }).dxDropDownList('instance');
          var $overlay = $(instance.content()).parent();
          assert.roughEqual($overlay.height(), windowHeight / 2, 2, 'popup sizes are limited by window if overflow:hidden container is larger than window');
          parentContainer.remove();
        });
        QUnit.test('After load new page scrollTop should not be changed', function(assert) {
          var data = [];
          var done = assert.async();
          for (var i = 100; i >= 0; i--) {
            data.push(i);
          }
          $('#dropDownList').wrap($('<div>').css({
            left: 0,
            top: 0
          })).dxDropDownList({
            searchEnabled: true,
            dataSource: {
              store: new ArrayStore(data),
              paginate: true,
              pageSize: 40
            },
            opened: true,
            searchTimeout: 0,
            width: 200
          });
          var listInstance = $(("." + LIST_CLASS)).dxList('instance');
          listInstance.option('pageLoadMode', 'scrollBottom');
          listInstance.option('useNativeScrolling', 'true');
          listInstance.scrollTo(1000);
          var scrollTop = listInstance.scrollTop();
          setTimeout(function() {
            assert.strictEqual(listInstance.scrollTop(), scrollTop, 'scrollTop is correctly after new page load');
            done();
          });
          this.clock.tick(10);
        });
        QUnit.testInActiveWindow('After search and load new page scrollTop should not be changed', function(assert) {
          var data = [];
          var done = assert.async();
          for (var i = 100; i >= 0; i--) {
            data.push(i);
          }
          var $dropDownList = $('#dropDownList').dxDropDownList({
            searchEnabled: true,
            dataSource: {
              store: new ArrayStore(data),
              paginate: true,
              pageSize: 40
            },
            searchTimeout: 0
          });
          $dropDownList.dxDropDownList('instance').open();
          var listInstance = $(("." + LIST_CLASS)).dxList('instance');
          listInstance.option('pageLoadMode', 'scrollBottom');
          listInstance.option('useNativeScrolling', 'true');
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          $dropDownList.focusin();
          keyboard.type('5').press('backspace');
          listInstance.scrollTo(1000);
          var scrollTop = listInstance.scrollTop();
          setTimeout(function() {
            assert.roughEqual(listInstance.scrollTop(), scrollTop, 2, 'scrollTop is correctly after new page load');
            assert.ok(listInstance.scrollTop() === scrollTop, 'scrollTop was not changed after loading new page');
            done();
          });
          this.clock.tick(10);
        });
        QUnit.test('popup should be configured with templatesRenderAsynchronously=false (T470619)', function(assert) {
          var data = ['item-1', 'item-2', 'item-3'];
          $('#dropDownList').dxDropDownList({
            dataSource: new DataSource(data),
            value: data[0],
            opened: true
          });
          var popup = $('.dx-dropdowneditor-overlay.dx-popup').dxPopup('instance');
          assert.strictEqual(popup.option('templatesRenderAsynchronously'), false, 'templatesRenderAsynchronously should have false value');
        });
        QUnit.test('popup should be configured with autoResizeEnabled=false (to prevent issues with pushBackValue and scrolling in IOS)', function(assert) {
          var data = ['item-1'];
          $('#dropDownList').dxDropDownList({
            dataSource: new DataSource(data),
            value: data[0],
            opened: true
          });
          var popup = $('.dx-dropdowneditor-overlay.dx-popup').dxPopup('instance');
          assert.strictEqual(popup.option('autoResizeEnabled'), false, 'autoResizeEnabled should have false value');
        });
        QUnit.test('no exception when \'container\' is empty jQuery set (T831152)', function(assert) {
          var exception = null;
          try {
            $('#dropDownList').dxDropDownList({
              items: ['1', '2', '3'],
              opened: true,
              dropDownOptions: {container: $()}
            });
          } catch (e) {
            exception = e;
          } finally {
            assert.strictEqual(exception, null);
          }
        });
        QUnit.test('scroll on input should not scroll the page when opened DropDownList is inside Popup (T1082501)', function(assert) {
          var $dropDownList = $('<div>').dxDropDownList({opened: true});
          $('#popup').dxPopup({
            visible: true,
            contentTemplate: function() {
              return $dropDownList;
            }
          });
          var $input = $dropDownList.find(("." + TEXTEDITOR_INPUT_CLASS));
          var wheelEvent = $.Event('dxmousewheel', {
            delta: -125,
            pageX: $input.scrollLeft(),
            pageY: $input.scrollTop(),
            originalEvent: $.Event('wheel')
          });
          $input.trigger(wheelEvent);
          assert.ok(wheelEvent.originalEvent.isDefaultPrevented());
        });
      });
      QUnit.module('dataSource integration', moduleConfig, function() {
        QUnit.test('guid integration', function(assert) {
          var value = '6fd3d2c5-904d-4e6f-a302-3e277ef36630';
          var data = [new Guid(value)];
          var dataSource = new DataSource(data);
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: dataSource,
            value: value
          });
          this.clock.tick(10);
          assert.deepEqual($dropDownList.dxDropDownList('option', 'selectedItem'), data[0], 'value found');
        });
        QUnit.test('dataSource loading longer than 400ms should not lead to the load panel being displayed', function(assert) {
          var loadDelay = 1000;
          var instance = $('#dropDownList').dxDropDownList({
            dataSource: {load: function() {
                var d = new $.Deferred();
                setTimeout(function() {
                  d.resolve([1, 2, 3]);
                }, loadDelay);
                return d;
              }},
            opened: true
          }).dxDropDownList('instance');
          this.clock.tick(loadDelay);
          var $content = $(instance.content());
          var $loadPanel = $content.find('.dx-scrollview-loadpanel');
          instance.getDataSource().load();
          this.clock.tick(loadDelay / 2);
          assert.ok($loadPanel.is(':hidden'), ("load panel is not visible (" + loadDelay / 2 + "ms after the loading started)"));
          this.clock.tick(loadDelay / 2);
          assert.ok($loadPanel.is(':hidden'), 'load panel is not visible when loading has been finished');
        });
        QUnit.test('dataSource should not be reloaded while minSearchLength is not exceeded (T876423)', function(assert) {
          var loadStub = sinon.stub().returns([{name: 'test 1'}, {name: 'test 2'}, {name: 'test 3'}]);
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: {
              load: loadStub,
              byKey: function(id) {
                return {name: id};
              }
            },
            searchEnabled: true,
            deferRendering: false,
            showDataBeforeSearch: true,
            valueExpr: 'name',
            displayExpr: 'name',
            searchExpr: 'name',
            searchTimeout: 0,
            minSearchLength: 3
          });
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          var kb = keyboardMock($input);
          kb.type('123');
          assert.strictEqual(loadStub.callCount, 2);
          kb.press('backspace').press('backspace');
          assert.strictEqual(loadStub.callCount, 3);
        });
      });
      QUnit.module('action options', moduleConfig, function() {
        QUnit.test('onItemClick action', function(assert) {
          assert.expect(3);
          var items = ['item 1', 'item 2', 'item 3'];
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: items,
            opened: true
          });
          var instance = $dropDownList.dxDropDownList('instance');
          this.clock.tick(10);
          var $listItem = instance._$list.find(LIST_ITEM_SELECTOR).eq(1);
          instance.option('onItemClick', function(e) {
            assert.deepEqual($(e.itemElement)[0], $listItem[0], 'itemElement is correct');
            assert.strictEqual(e.itemData, items[1], 'itemData is correct');
            assert.strictEqual(e.itemIndex, 1, 'itemIndex is correct');
          });
          $($listItem).trigger('dxclick');
        });
      });
      QUnit.module('render input addons', moduleConfig, function() {
        QUnit.test('dropDownButton rendered correctly when dataSource is async', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: {
              load: function() {
                var deferred = $.Deferred();
                setTimeout(function() {
                  deferred.resolve([1, 2, 3, 4, 5, 6, 7]);
                }, 1000);
                return deferred.promise();
              },
              byKey: function(key) {
                var deferred = $.Deferred();
                setTimeout(function() {
                  deferred.resolve(key);
                }, 1000);
                return deferred.promise();
              }
            },
            showDropDownButton: true,
            openOnFieldClick: false,
            value: 1
          });
          this.clock.tick(1000);
          assert.ok($dropDownList.find('.dx-dropdowneditor-button').length, 'dropDownButton rendered');
        });
      });
      QUnit.module('aria accessibility', moduleConfig, function() {
        QUnit.test('aria-owns should point to list', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({opened: true});
          var $popupContent = $(("." + POPUP_CONTENT_CLASS));
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.notEqual($input.attr('aria-owns'), undefined, 'aria-owns exists');
          assert.equal($input.attr('aria-owns'), $popupContent.attr('id'), 'aria-owns equals popup content\'s id');
        });
        QUnit.test('aria-owns should point to the list even if popup is closed but rendered', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({deferRendering: false});
          var $popupContent = $(("." + POPUP_CONTENT_CLASS));
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.notEqual($input.attr('aria-owns'), undefined, 'aria-owns exists');
          assert.equal($input.attr('aria-owns'), $popupContent.attr('id'), 'aria-owns equals popup content\'s id');
        });
        QUnit.test('input aria-owns should point to list', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({opened: true});
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          var $popupContent = $(("." + POPUP_CONTENT_CLASS));
          assert.notEqual($input.attr('aria-owns'), undefined, 'aria-owns exists');
          assert.equal($input.attr('aria-owns'), $popupContent.attr('id'), 'aria-owns equals popup content\'s id');
        });
        QUnit.test('aria-controls should not be removed when popup is not visible', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({opened: true});
          var $input = $dropDownList.find(("." + TEXTEDITOR_INPUT_CLASS));
          var instance = $dropDownList.dxDropDownList('instance');
          var $list = $(instance.content()).find(("." + LIST_CLASS));
          assert.notEqual($input.attr('aria-controls'), undefined, 'controls exists');
          assert.equal($input.attr('aria-controls'), $list.attr('id'), 'aria-controls points to list\'s id');
          instance.close();
          assert.notEqual($input.attr('aria-controls'), undefined, 'controls exists');
          assert.equal($input.attr('aria-controls'), $list.attr('id'), 'aria-controls points to list\'s id');
        });
        QUnit.test('aria-controls should be defined immediately if deferRendering is false', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({deferRendering: false});
          var $input = $dropDownList.find(("." + TEXTEDITOR_INPUT_CLASS));
          var instance = $dropDownList.dxDropDownList('instance');
          var $list = $(instance.content()).find(("." + LIST_CLASS));
          assert.notEqual($input.attr('aria-controls'), undefined, 'controls exists');
          assert.equal($input.attr('aria-controls'), $list.attr('id'), 'aria-controls points to list\'s id');
        });
        QUnit.test('input\'s aria-activedescendant attribute should point to the focused item', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3],
            opened: true,
            focusStateEnabled: true
          });
          var $list = $(("." + LIST_CLASS));
          var list = $list.dxList('instance');
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          var $item = $list.find('.dx-list-item:eq(1)');
          assert.strictEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant exists');
          list.option('focusedElement', $item);
          assert.notEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant exists');
          assert.equal($input.attr('aria-activedescendant'), $item.attr('id'), 'aria-activedescendant and id of the focused item are equals');
        });
        QUnit.test('input\'s aria-activedescendant attribute should not be defined after popup reopen', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3],
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dropDownList.dxDropDownList('instance');
          var $list = $(("." + LIST_CLASS));
          var list = $list.dxList('instance');
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          var $item = $list.find('.dx-list-item:eq(1)');
          list.option('focusedElement', $item);
          instance.option('opened', false);
          assert.strictEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant is not defined');
          instance.option('opened', true);
          assert.strictEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant is not defined');
        });
        QUnit.test('input\'s aria-activedescendant attribute should be reset after list focused element change to null', function(assert) {
          var $dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: [1, 2, 3],
            opened: true,
            focusStateEnabled: true
          });
          var $list = $(("." + LIST_CLASS));
          var list = $list.dxList('instance');
          var $input = $dropDownList.find('.' + TEXTEDITOR_INPUT_CLASS);
          list.option('focusedElement', null);
          assert.strictEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant is not defined');
        });
        ['items', 'dataSource'].forEach(function(dataSource) {
          QUnit.test(("list focusable element should have aria-label if data source is " + dataSource), function(assert) {
            var instance = $('#dropDownList').dxDropDownList({opened: true}).dxDropDownList('instance');
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'No data to display');
            instance.option(dataSource, [1, 2, 3]);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'Items');
            instance.option(dataSource, []);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'No data to display');
          });
        });
      });
      QUnit.module('dropdownlist with groups', {beforeEach: function() {
          this.dataSource = new DataSource({
            store: [{
              id: 1,
              group: 'first'
            }, {
              id: 2,
              group: 'second'
            }],
            key: 'id',
            group: 'group'
          });
        }}, function() {
        QUnit.test('grouped option', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: this.dataSource,
            opened: true,
            grouped: true
          }).dxDropDownList('instance');
          var list = $(("." + LIST_CLASS)).dxList('instance');
          assert.strictEqual(list.option('grouped'), true, 'grouped option is passed to the list');
          assert.deepEqual(list.option('items'), dropDownList.option('items'), 'items is equal');
          dropDownList.option('grouped', false);
          assert.strictEqual(list.option('grouped'), false, 'grouped option is passed to the list');
        });
        QUnit.test('groupTemplate option', function(assert) {
          var groupTemplate1 = new Template('<div>Test</div>');
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: this.dataSource,
            opened: true,
            grouped: true,
            groupTemplate: groupTemplate1
          }).dxDropDownList('instance');
          var list = $(("." + LIST_CLASS)).dxList('instance');
          assert.strictEqual(list.option('groupTemplate'), groupTemplate1, 'groupTemplate has been passed on init');
          var groupTemplate2 = new Template('<div>Test</div>');
          dropDownList.option('groupTemplate', groupTemplate2);
          assert.strictEqual(list.option('groupTemplate'), groupTemplate2, 'groupTemplate has been passed on option changing');
        });
        QUnit.test('itemElement argument of groupTemplate option is correct', function(assert) {
          $('#dropDownList').dxDropDownList({
            dataSource: this.dataSource,
            opened: true,
            grouped: true,
            groupTemplate: function(itemData, itemIndex, itemElement) {
              assert.equal(isRenderer(itemElement), !!config().useJQuery, 'itemElement is correct');
              return $('<div>');
            }
          }).dxDropDownList('instance');
        });
        QUnit.test('selectedItem for grouped dropdownlist', function(assert) {
          var dropDownList = $('#dropDownList').dxDropDownList({
            dataSource: this.dataSource,
            opened: true,
            grouped: true,
            valueExpr: 'id',
            displayExpr: 'id',
            value: 2
          }).dxDropDownList('instance');
          assert.strictEqual(dropDownList.option('selectedItem').id, 2, 'selectedItem is correct');
        });
      });
      QUnit.module('data source from url', {afterEach: function() {
          ajaxMock.clear();
        }}, function() {
        var TEST_URL = '/a3211c1d-c725-4185-acc0-0a59a4152aae';
        var setupAjaxMock = function(responseFactory) {
          ajaxMock.setup({
            url: TEST_URL,
            callback: function() {
              this.responseText = responseFactory();
            }
          });
        };
        var appendWidgetContainer = function() {
          return $('#qunit-fixture').append('<div id=test-drop-down></div>');
        };
        QUnit.test('initial value', function(assert) {
          var done = assert.async();
          appendWidgetContainer();
          setupAjaxMock(function() {
            return [{
              value: 123,
              text: 'Expected Text'
            }];
          });
          $('#test-drop-down').dxDropDownList({
            dataSource: TEST_URL,
            valueExpr: 'value',
            displayExpr: 'text',
            value: 123
          });
          window.waitFor(function() {
            return $('#test-drop-down').dxDropDownList('option', 'displayValue') === 'Expected Text';
          }).done(function() {
            assert.expect(0);
            done();
          });
        });
        QUnit.test('search', function(assert) {
          var done = assert.async();
          appendWidgetContainer();
          setupAjaxMock(function() {
            return ['a', 'z'];
          });
          $('#test-drop-down').dxDropDownList({
            dataSource: TEST_URL,
            searchEnabled: true,
            searchTimeout: 0,
            opened: true
          });
          keyboardMock($('#test-drop-down .' + TEXTEDITOR_INPUT_CLASS)).type('z');
          window.waitFor(function() {
            var instance = $('#test-drop-down').dxDropDownList('instance');
            var popup = getPopup(instance).$content();
            var items = popup.find('.dx-list-item');
            return items.length === 1 && $(items[0]).text() === 'z';
          }).done(function() {
            assert.expect(0);
            done();
          });
        });
      });
      QUnit.module('contentReady', {
        beforeEach: function() {
          fx.off = true;
          this.contentReadyActionStub = sinon.stub();
          this.$dropDownList = $('#dropDownList').dxDropDownList({
            onContentReady: this.contentReadyActionStub,
            deferRendering: true
          });
          this.instance = this.$dropDownList.dxDropDownList('instance');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('fires on base content rendering', function(assert) {
          assert.strictEqual(this.contentReadyActionStub.callCount, 1, 'content ready is fired');
        });
        QUnit.test('fires after popup first rendering', function(assert) {
          this.instance.open();
          assert.strictEqual(this.contentReadyActionStub.callCount, 2, 'content ready is fired after popup first opening');
        });
        QUnit.test('does not fire after reopening', function(assert) {
          this.instance.open();
          this.instance.close();
          this.instance.open();
          assert.strictEqual(this.contentReadyActionStub.callCount, 2, 'content ready is not fired after reopening');
        });
        QUnit.test('fires on popup rendering without opening', function(assert) {
          this.instance.option('deferRendering', false);
          assert.strictEqual(this.contentReadyActionStub.callCount, 2, 'content ready is fired on popup rendering');
        });
        QUnit.test('fires on popup first opening when readOnly=true', function(assert) {
          this.instance.option('readOnly', true);
          this.instance.open();
          assert.strictEqual(this.contentReadyActionStub.callCount, 2, 'content ready is fired on popup rendering');
        });
        QUnit.test('fires on popup first opening when disabled=true', function(assert) {
          this.instance.option('disabled', true);
          this.instance.open();
          assert.strictEqual(this.contentReadyActionStub.callCount, 2, 'content ready is fired on popup rendering');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/devices","core/templates/template","core/guid","data/data_source/data_source","data/array_store","data/custom_store","../../helpers/keyboardMock.js","animation/fx","core/utils/type","core/config","../../helpers/ajaxMock.js","ui/drop_down_editor/ui.drop_down_list","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/devices"), require("core/templates/template"), require("core/guid"), require("data/data_source/data_source"), require("data/array_store"), require("data/custom_store"), require("../../helpers/keyboardMock.js"), require("animation/fx"), require("core/utils/type"), require("core/config"), require("../../helpers/ajaxMock.js"), require("ui/drop_down_editor/ui.drop_down_list"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownList.tests.js.map