!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownBox.tests.js"], ["jquery","core/renderer","../../helpers/keyboardMock.js","animation/fx","ui/drop_down_box","core/utils/type","core/config","core/devices","events/utils/index","data/custom_store","data/data_source/data_source","generic_light.css!","ui/validator","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownBox.tests.js", ["jquery", "core/renderer", "../../helpers/keyboardMock.js", "animation/fx", "ui/drop_down_box", "core/utils/type", "core/config", "core/devices", "events/utils/index", "data/custom_store", "data/data_source/data_source", "generic_light.css!", "ui/validator", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      renderer,
      keyboardMock,
      fx,
      DropDownBox,
      typeUtils,
      isRenderer,
      config,
      devices,
      normalizeKeyName,
      CustomStore,
      DataSource,
      implementationsMap,
      realDevice,
      TEXTEDITOR_INPUT_CLASS,
      TAB_KEY_CODE,
      DX_STATE_FOCUSED_CLASS,
      OVERLAY_CONTENT_CLASS,
      CLEAR_BUTTON_AREA_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DropDownBox = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {}, function($__m) {}, function($__m) {
      implementationsMap = $__m.implementationsMap;
    }],
    execute: function() {
      realDevice = devices.real();
      QUnit.testStart(function() {
        var markup = '<div id="container">\
            <div id="dropDownBox"></div>\
            <div id="dropDownBoxAnonymous"><div id="inner">Test</div></div>\
        </div>';
        $('#qunit-fixture').html(markup);
        $('#qunit-fixture').addClass('qunit-fixture-visible');
      });
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      TAB_KEY_CODE = 'Tab';
      DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      CLEAR_BUTTON_AREA_CLASS = 'dx-clear-button-area';
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#dropDownBox');
          this.simpleItems = [{
            id: 1,
            name: 'Item 1'
          }, {
            id: 2,
            name: 'Item 2'
          }, {
            id: 3,
            name: 'Item 3'
          }];
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      QUnit.module('common', moduleConfig, function() {
        QUnit.test('the widget should display custom value without the dataSource', function(assert) {
          this.$element.dxDropDownBox({
            value: 1,
            acceptCustomValue: true
          });
          var $input = this.$element.find('.dx-texteditor-input');
          var instance = this.$element.dxDropDownBox('instance');
          assert.equal(instance.option('value'), 1, 'value is correct');
          assert.equal(instance.option('text'), 1, 'text is correct');
          assert.equal($input.val(), 1, 'input value is correct');
          instance.option('value', 'Test');
          assert.equal(instance.option('value'), 'Test', 'value is correct');
          assert.equal(instance.option('text'), 'Test', 'text is correct');
          assert.equal($input.val(), 'Test', 'input value is correct');
        });
        QUnit.test('the widget should keep value', function(assert) {
          this.$element.dxDropDownBox({value: 1});
          var $input = this.$element.find('.dx-texteditor-input');
          var instance = this.$element.dxDropDownBox('instance');
          assert.equal(instance.option('value'), 1, 'value is correct');
          assert.equal(instance.option('text'), '', 'text is correct');
          assert.equal($input.val(), '', 'input value is correct');
          instance.option('value', 'Test');
          assert.equal(instance.option('value'), 'Test', 'value is correct');
          assert.equal(instance.option('text'), '', 'text is correct');
          assert.equal($input.val(), '', 'input value is correct');
          instance.option('dataSource', ['Test', 'Data']);
          assert.equal(instance.option('value'), 'Test', 'value is correct');
          assert.equal(instance.option('text'), 'Test', 'text is correct');
          assert.equal($input.val(), 'Test', 'input value is correct');
        });
        QUnit.test('value should be rendered if it is resolved after non-existent item resolve (T1017628)', function(assert) {
          var item = {
            id: 1,
            name: 'test'
          };
          var store = {
            load: function() {
              $.Deferred().resolve([item]).promise();
            },
            byKey: function(key) {
              var d = $.Deferred();
              if (key === 1) {
                setTimeout(function() {
                  d.resolve(item);
                }, 500);
              } else {
                d.resolve(null);
              }
              return d.promise();
            }
          };
          this.$element.dxDropDownBox({
            dataSource: store,
            valueExpr: 'id',
            displayExpr: 'name',
            value: [1, 2]
          });
          var instance = this.$element.dxDropDownBox('instance');
          var $input = this.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
          this.clock.tick(500);
          assert.deepEqual(instance.option('value'), [1, 2], 'value is correct');
          assert.strictEqual(instance.option('text'), 'test', 'text is correct');
          assert.strictEqual($input.val(), 'test', 'input value is correct');
        });
        QUnit.test('the widget should work when dataSource is set to null', function(assert) {
          this.$element.dxDropDownBox({
            value: 1,
            dataSource: [1, 2, 3]
          });
          var instance = this.$element.dxDropDownBox('instance');
          instance.option('dataSource', null);
          assert.ok(true, 'widget works correctly');
        });
        QUnit.test('array value should be supported', function(assert) {
          this.$element.dxDropDownBox({
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: [2]
          });
          var $input = this.$element.find('.dx-texteditor-input');
          assert.equal($input.val(), 'Item 2', 'array value works');
        });
        QUnit.test('it should be possible to restore value after reset', function(assert) {
          var instance = new DropDownBox(this.$element, {
            value: 2,
            acceptCustomValue: true
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.reset();
          instance.option('value', 'Test');
          assert.equal($input.val(), 'Test', 'value has been applied');
        });
        QUnit.test('array value changing', function(assert) {
          var instance = new DropDownBox(this.$element, {
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: [2]
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option('value', 1);
          assert.equal($input.val(), 'Item 1', 'value has been changed correctly from array to primitive');
          instance.option('value', [2]);
          assert.equal($input.val(), 'Item 2', 'value has been changed correctly from primitive to array');
        });
        QUnit.test('multiple selection should work', function(assert) {
          this.$element.dxDropDownBox({
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: [1, 3]
          });
          var $input = this.$element.find('.dx-texteditor-input');
          assert.equal($input.val(), 'Item 1, Item 3', 'multiple selection works');
        });
        QUnit.test('multiple selection value changing', function(assert) {
          var instance = new DropDownBox(this.$element, {
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: 2
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option('value', [1, 3]);
          assert.equal($input.val(), 'Item 1, Item 3', 'correct values are selected');
        });
        QUnit.test('value clearing', function(assert) {
          var instance = new DropDownBox(this.$element, {
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: [1, 3]
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option('value', null);
          assert.equal($input.val(), '', 'input was cleared');
        });
        QUnit.test('content template should work', function(assert) {
          assert.expect(4);
          var instance = new DropDownBox(this.$element, {
            items: this.simpleItems,
            opened: true,
            contentTemplate: function(e, contentElement) {
              assert.strictEqual(e.component.NAME, 'dxDropDownBox', 'component is correct');
              assert.equal(e.value, 1, 'value is correct');
              assert.equal(isRenderer(contentElement), !!config().useJQuery, 'contentElement is correct');
              return 'Test content';
            },
            valueExpr: 'id',
            displayExpr: 'name',
            value: 1
          });
          assert.equal($(instance.content()).text(), 'Test content', 'content template has been rendered');
        });
        QUnit.test('click on inner DropDownEditor should not close parent DropDownEditor (T998926)', function(assert) {
          var $contentTemplateEditor = $('<div>').dxDropDownBox({});
          var onClosed = sinon.stub();
          var dropDownBox = new DropDownBox(this.$element, {
            onClosed: onClosed,
            deferRendering: false,
            contentTemplate: function() {
              return $contentTemplateEditor;
            }
          });
          dropDownBox.open();
          $contentTemplateEditor.find(TEXTEDITOR_INPUT_CLASS).trigger('click');
          assert.ok(onClosed.notCalled);
        });
        QUnit.test('anonymous content template should work', function(assert) {
          var $inner = $('#dropDownBoxAnonymous #inner');
          var instance = new DropDownBox($('#dropDownBoxAnonymous'), {opened: true});
          var $content = $(instance.content());
          assert.equal($content.text(), 'Test', 'Anonymous template works');
          assert.equal($content.find('#inner')[0], $inner[0], 'Markup is equal by the link');
        });
        QUnit.test('anonymous template should not be passed to the custom button', function(assert) {
          var instance = new DropDownBox($('#dropDownBoxAnonymous'), {
            buttons: [{
              name: 'test',
              location: 'after',
              options: {text: 'Button text'}
            }],
            opened: true
          });
          var $content = $(instance.content());
          assert.equal($content.text(), 'Test', 'Anonymous template works');
          assert.equal($('#dropDownBoxAnonymous').find('.dx-button').text(), 'Button text', 'Button text is correct');
        });
        QUnit.test('dropDownBox should work with the slow dataSource', function(assert) {
          var items = [{
            key: 1,
            text: 'Item 1'
          }, {
            key: 2,
            text: 'Item 2'
          }];
          var instance = new DropDownBox(this.$element, {
            dataSource: {
              load: function() {
                $.Deferred().resolve(items).promise();
              },
              byKey: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([{
                    key: 2,
                    text: 'Item 2'
                  }]);
                }, 50);
                return d.promise();
              }
            },
            valueExpr: 'key',
            displayExpr: 'text',
            value: 2
          });
          var $input = this.$element.find('.dx-texteditor-input');
          this.clock.tick(50);
          assert.equal($input.val(), 'Item 2', 'Input value was filled');
          assert.equal(instance.option('value'), 2, 'value was applied');
        });
        QUnit.test('dropDownBox should update display text after dataSource changed', function(assert) {
          var items = [{
            id: 1,
            name: 'item 1'
          }, {
            id: 2,
            name: 'item 2'
          }, {
            id: 3,
            name: 'item 3'
          }];
          var instance = new DropDownBox(this.$element, {
            dataSource: [],
            displayExpr: 'name',
            valueExpr: 'id',
            value: [2, 3]
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option('dataSource', items);
          assert.equal($input.val(), 'item 2, item 3', 'input text has been updated');
        });
        QUnit.test('dropDownBox should update display text after displayExpr changed', function(assert) {
          var items = [{
            id: 1,
            name: 'item 1',
            text: 'text 1'
          }];
          var instance = new DropDownBox(this.$element, {
            items: items,
            displayExpr: 'name',
            valueExpr: 'id',
            value: 1
          });
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option('displayExpr', 'text');
          assert.equal($input.val(), 'text 1', 'input text has been updated');
        });
        QUnit.test('dropDownBox should update display text when displayExpr was changed on initialization', function(assert) {
          this.$element.dxDropDownBox({
            items: [{
              id: 1,
              name: 'item 1',
              text: 'text 1'
            }],
            onInitialized: function(e) {
              e.component.option('displayExpr', 'name');
            },
            valueExpr: 'id',
            value: 1
          });
          var $input = this.$element.find('.dx-texteditor-input');
          assert.equal($input.val(), 'item 1', 'input text is correct');
        });
        QUnit.test('text option should follow the displayValue option', function(assert) {
          var instance = new DropDownBox(this.$element, {});
          instance.option('displayValue', 'test');
          assert.equal(instance.option('text'), 'test', 'text option has been changed');
        });
        QUnit.test('displayValue option should be correct after value option changed, acceptCustomValue = true', function(assert) {
          var instance = new DropDownBox(this.$element, {
            acceptCustomValue: true,
            dataSource: ['1', '2', '3'],
            value: '1'
          });
          instance.option('value', '12');
          assert.equal(instance.option('displayValue'), '12', 'displayValue option has been changed');
        });
        QUnit.test('displayValue option should be correct after value option changed, acceptCustomValue = true, initial value = null', function(assert) {
          var instance = new DropDownBox(this.$element, {
            acceptCustomValue: true,
            dataSource: ['1', '2', '3'],
            value: null
          });
          instance.option('value', '12');
          assert.equal(instance.option('displayValue'), '12', 'displayValue option has been changed');
        });
        QUnit.test('displayValueFormatter should be called once (T883129)', function(assert) {
          var spy = sinon.spy();
          new DropDownBox(this.$element, {
            value: 1,
            displayValueFormatter: spy
          });
          assert.strictEqual(spy.callCount, 1, 'value has been applied');
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
            this.dropDownBox = this.$element.dxDropDownBox({
              dataSource: this.dataSource,
              displayExpr: 'text',
              valueExpr: 'id',
              value: 1
            }).dxDropDownBox('instance');
          }}, function() {
          QUnit.test('after new call', function(assert) {
            this.dropDownBox.option('value', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownBox.option('text'), 'second', 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownBox.option('text'), 'second', 'first init byKey result is ignored');
          });
          QUnit.test('after new call event when acceptCustomValue=true', function(assert) {
            this.dropDownBox.option({
              acceptCustomValue: true,
              displayExpr: undefined
            });
            this.dropDownBox.option('value', 2);
            assert.strictEqual(this.dropDownBox.option('text'), null, 'text is not changed on byKey reject');
          });
          QUnit.test('after value change to already loaded value', function(assert) {
            this.dropDownBox.open();
            this.clock.tick(100);
            this.dropDownBox.option('value', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownBox.option('text'), 'second', 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownBox.option('text'), 'second', 'first init byKey result is ignored');
          });
          QUnit.test('after change value to undefined', function(assert) {
            this.dropDownBox.option('value', undefined);
            this.clock.tick(2000);
            assert.strictEqual(this.dropDownBox.option('text'), '', 'init byKey result is ignored');
          });
          QUnit.test('after value reset', function(assert) {
            this.dropDownBox.reset();
            this.clock.tick(2000);
            assert.strictEqual(this.dropDownBox.option('text'), '', 'byKey result is ignored');
          });
        });
        QUnit.test('value should be rendered if it is not in dataSource if acceptCustomValue=true (T1042773)', function(assert) {
          new DropDownBox(this.$element, {
            dataSource: [{
              id: 1,
              name: 'first'
            }],
            value: [1],
            valueExpr: 'id',
            displayExpr: 'name',
            acceptCustomValue: true
          });
          var $input = this.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          var customValue = 'custom';
          keyboard.caret({
            start: 0,
            end: 5
          }).type(customValue).change();
          assert.strictEqual($input.val(), customValue, 'custom value is rendered');
        });
      });
      QUnit.module('popup options', moduleConfig, function() {
        QUnit.test('popup should be positioned correctly if rtlEnabled is true', function(assert) {
          var instance = new DropDownBox(this.$element, {
            opened: true,
            width: 100,
            dropDownOptions: {
              width: 200,
              'position.collision': 'none'
            }
          });
          var dropDownButtonElementRect = this.$element.get(0).getBoundingClientRect();
          var overlayContentElementRect = $(instance.content()).parent().get(0).getBoundingClientRect();
          assert.strictEqual(overlayContentElementRect.left, dropDownButtonElementRect.left, 'popup position is correct, rtlEnabled = false');
          instance.option('rtlEnabled', true);
          overlayContentElementRect = $(instance.content()).parent().get(0).getBoundingClientRect();
          assert.strictEqual(overlayContentElementRect.right, dropDownButtonElementRect.right, 'popup position is correct, rtlEnabled = true');
        });
        QUnit.test('popup should be flipped when container size is smaller than content size', function(assert) {
          var $dropDownBox = $('<div>').appendTo('body');
          try {
            $dropDownBox.css({
              position: 'fixed',
              bottom: 0
            });
            $dropDownBox.dxDropDownBox({
              opened: true,
              contentTemplate: function() {
                return $('<div>').css({
                  height: '300px',
                  border: '1px solid #000'
                });
              }
            });
            var $popupContent = $('.' + OVERLAY_CONTENT_CLASS);
            assert.ok($popupContent.hasClass('dx-dropdowneditor-overlay-flipped'), 'popup was flipped');
          } finally {
            $dropDownBox.remove();
          }
        });
        QUnit.test('maxHeight should be 90% of maximum of top or bottom offsets including page scroll', function(assert) {
          this.$element.dxDropDownBox({
            items: [1, 2, 3],
            value: 2
          });
          var scrollTopValue = 100;
          var windowHeightValue = 700;
          var editorHeight = this.$element.outerHeight();
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(scrollTopValue);
          var windowHeight = sinon.stub(implementationsMap, 'getInnerHeight').returns(windowHeightValue);
          var offset = sinon.stub(renderer.fn, 'offset').returns({
            left: 0,
            top: 200
          });
          var instance = this.$element.dxDropDownBox('instance');
          try {
            instance.open();
            var popup = $('.dx-popup').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            assert.roughEqual(Math.floor(maxHeight()), (windowHeightValue - scrollTopValue - editorHeight) * 0.9, 3, 'maxHeight is correct');
          } finally {
            scrollTop.restore();
            windowHeight.restore();
            offset.restore();
          }
        });
        QUnit.test('maxHeight should be 90% of bottom offset if popup has been rendered at the bottom already (T874949)', function(assert) {
          this.$element.dxDropDownBox({
            width: 300,
            contentTemplate: function() {
              var content = $('<div id=\'dd-content\'></div>');
              setTimeout(function() {
                $('#dd-content').height(300);
              });
              return content;
            }
          });
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(0);
          var bottomPosition = 200;
          var windowHeight = $(window).height();
          var topValue = windowHeight - bottomPosition;
          var offset = sinon.stub(renderer.fn, 'offset').returns({
            left: 0,
            top: topValue
          });
          var instance = this.$element.dxDropDownBox('instance');
          try {
            instance.open();
            this.clock.tick(10);
            var popup = $('.dx-popup').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            assert.roughEqual(Math.floor(maxHeight()), (200 - this.$element.height()) * 0.9, 3, 'maxHeight is correct');
          } finally {
            scrollTop.restore();
            offset.restore();
          }
        });
        QUnit.test('maxHeight should be distance between the popup top bound and the element top bound if the popup has been rendered at the top already (T874949, T942217)', function(assert) {
          this.$element.dxDropDownBox({
            width: 300,
            contentTemplate: function(e) {
              return $('<div id=\'dd-content\'></div>');
            }
          });
          var elementHeight = this.$element.height();
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(0);
          var windowHeight = $(window).height();
          this.$element.css('margin-top', windowHeight - elementHeight - 1);
          var instance = this.$element.dxDropDownBox('instance');
          try {
            instance.open();
            var startPopupHeight = $(instance.content()).parent('.dx-overlay-content').outerHeight();
            $('#dd-content').height(300);
            var popup = this.$element.find('.dx-popup').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            assert.roughEqual(maxHeight(), startPopupHeight, 1.01, 'maxHeight is correct');
          } finally {
            scrollTop.restore();
          }
        });
        QUnit.test('maxHeight should be distance between the popup top bound and the element top bound if the popup has been rendered at the top already and the window was scrolled (T874949, T942217)', function(assert) {
          var scrollTopValue = 50;
          this.$element.dxDropDownBox({
            width: 300,
            contentTemplate: function(e) {
              return $('<div id=\'dd-content\'></div>');
            }
          });
          var elementHeight = this.$element.height();
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(scrollTopValue);
          var windowHeight = $(window).height();
          this.$element.css('margin-top', windowHeight - elementHeight - 1 - scrollTopValue);
          var instance = this.$element.dxDropDownBox('instance');
          try {
            instance.open();
            var startPopupHeight = $(instance.content()).parent('.dx-overlay-content').height();
            $('#dd-content').height(300);
            var popup = this.$element.find('.dx-popup').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            assert.roughEqual(maxHeight(), startPopupHeight + scrollTopValue, 1.01, 'maxHeight is correct');
          } finally {
            scrollTop.restore();
          }
        });
        QUnit.test('maxHeight should be recalculated if popup has been reopened after content change (T874949, T942217)', function(assert) {
          var contentHeight = 90;
          var windowHeight = $(window).height();
          var marginTop = Math.max(windowHeight - 50, 200);
          this.$element.dxDropDownBox({
            width: 300,
            contentTemplate: function(e) {
              return $('<div id=\'dd-content\'></div>');
            }
          });
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(0);
          this.$element.css('margin-top', marginTop);
          var instance = this.$element.dxDropDownBox('instance');
          try {
            instance.open();
            $('#dd-content').height(contentHeight);
            instance.close();
            instance.open();
            this.clock.tick(10);
            var popup = this.$element.find('.dx-popup').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            var $popupContent = $(popup.content());
            var overlayContentHeight = $popupContent.outerHeight();
            var overlayOffset = $popupContent.offset().top;
            var elementOffset = this.$element.offset().top;
            assert.ok(overlayContentHeight >= contentHeight, 'height is recalculated');
            assert.roughEqual(maxHeight(), elementOffset - overlayOffset, 1.01, 'maxHeight is correct');
          } finally {
            scrollTop.restore();
          }
        });
        QUnit.test('Dropdownbox popup should change height according to the content', function(assert) {
          var $content = $('<div>').attr('id', 'content');
          var instance = new DropDownBox($('#dropDownBox'), {
            opened: true,
            contentTemplate: function() {
              return $content;
            }
          });
          var $popupContent = $(instance.content()).parent('.' + OVERLAY_CONTENT_CLASS);
          var popupHeight = $popupContent.height();
          $('<div>').height(50).appendTo($content);
          assert.strictEqual($popupContent.height(), popupHeight + 50, 'popup height has been changed');
        });
        QUnit.test('Dropdownbox popup should have function as hideOnParentScroll option value (T845484)', function(assert) {
          var $content = $('<div>').attr('id', 'content');
          var instance = new DropDownBox($('#dropDownBox'), {
            opened: true,
            contentTemplate: function() {
              return $content;
            }
          });
          assert.ok(typeUtils.isFunction(instance.option('dropDownOptions.hideOnParentScroll')));
        });
        [true, false].forEach(function(isMac) {
          QUnit.test(("Dropdownbox should " + (isMac ? 'not' : '') + " close the popup after window scroll for " + (isMac ? '' : 'non') + " Mac desktop devices (T845484)"), function(assert) {
            if (realDevice.deviceType !== 'desktop') {
              assert.expect(0);
              return;
            }
            var originalRealDeviceIsMac = DropDownBox.prototype._realDevice.mac;
            DropDownBox.prototype._realDevice.mac = isMac;
            try {
              var $content = $('<input type="text" />');
              var instance = new DropDownBox($('#dropDownBox'), {contentTemplate: function() {
                  return $content;
                }});
              instance.open();
              $content.focus();
              this.clock.tick(10);
              $(window).trigger('scroll');
              assert.strictEqual(instance.option('opened'), isMac);
            } finally {
              DropDownBox.prototype._realDevice.mac = originalRealDeviceIsMac;
            }
          });
        });
        QUnit.test('popup should be positioned with the correct popupPosition offset', function(assert) {
          var vOffset = 2;
          var instance = new DropDownBox(this.$element, {
            opened: true,
            width: 100,
            popupPosition: {offset: {v: vOffset}}
          });
          var elementBottom = this.$element.get(0).getBoundingClientRect().bottom;
          var popupTop = $(instance.content()).parent().get(0).getBoundingClientRect().top;
          var actualOffset = Math.round(popupTop) - Math.round(elementBottom);
          assert.strictEqual(actualOffset, vOffset, 'popup offset is correct');
        });
      });
      QUnit.module('keyboard navigation', moduleConfig, function() {
        QUnit.test('alt+down should open dropDownBox', function(assert) {
          var instance = new DropDownBox(this.$element);
          var $input = this.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
          keyboardMock($input).keyDown('down', {altKey: true});
          assert.ok(instance.option('opened'), 'dropDownBox is opened after alt+down is pressed');
        });
        QUnit.testInActiveWindow('first focusable element inside of content should get focused after tab pressing', function(assert) {
          var $input1 = $('<input>', {
            id: 'input1',
            type: 'text'
          });
          var $input2 = $('<input>', {
            id: 'input2',
            type: 'text'
          });
          var instance = new DropDownBox(this.$element, {
            opened: true,
            focusStateEnabled: true,
            contentTemplate: function(component, content) {
              $(content).append($input1, $input2);
            }
          });
          var $input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          keyboard.press('tab');
          assert.equal($(instance.content()).parent('.' + OVERLAY_CONTENT_CLASS).attr('tabindex'), -1, 'popup content should not be tabbable');
          assert.ok(instance.option('opened'), 'popup was not closed after tab key pressed');
          assert.ok($input1.is(':focus'), 'first focusable content element got focused');
        });
        QUnit.testInActiveWindow('last focusable element inside of content should get focused after shift+tab pressing', function(assert) {
          var $input1 = $('<input>', {
            id: 'input1',
            type: 'text'
          });
          var $input2 = $('<input>', {
            id: 'input2',
            type: 'text'
          });
          var instance = new DropDownBox(this.$element, {
            opened: true,
            focusStateEnabled: true,
            contentTemplate: function(component, content) {
              $(content).append($input1, $input2);
            }
          });
          var $input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          var event = $.Event('keydown', {
            key: TAB_KEY_CODE,
            shiftKey: true
          });
          $input.focus().trigger(event);
          assert.ok(instance.option('opened'), 'popup was not closed after shift+tab key pressed');
          assert.ok($input2.is(':focus'), 'first focusable content element got focused');
        });
        QUnit.testInActiveWindow('widget should be closed after tab pressing on the last content element', function(assert) {
          var $input1 = $('<input>', {
            id: 'input1',
            type: 'text'
          });
          var $input2 = $('<input>', {
            id: 'input2',
            type: 'text'
          });
          var instance = new DropDownBox(this.$element, {
            focusStateEnabled: true,
            opened: true,
            contentTemplate: function(component, content) {
              $(content).append($input1, $input2);
            }
          });
          var keyboard = keyboardMock($input2);
          keyboard.press('tab');
          this.clock.tick(10);
          assert.notOk(instance.option('opened'), 'popup was closed');
        });
        QUnit.testInActiveWindow('input should get focused when shift+tab pressed on first content element', function(assert) {
          var $input1 = $('<input>', {
            id: 'input1',
            type: 'text'
          });
          var $input2 = $('<input>', {
            id: 'input2',
            type: 'text'
          });
          var instance = new DropDownBox(this.$element, {
            focusStateEnabled: true,
            opened: true,
            contentTemplate: function(component, content) {
              $(content).append($input1, $input2);
            }
          });
          var event = $.Event('keydown', {
            key: TAB_KEY_CODE,
            shiftKey: true
          });
          $input1.focus().trigger(event);
          assert.notOk(instance.option('opened'), 'popup was closed');
          assert.ok(this.$element.hasClass(DX_STATE_FOCUSED_CLASS), 'input is focused');
          assert.ok(event.isDefaultPrevented(), 'prevent default for focusing it\'s own input but not an input of the previous editor on the page');
        });
        QUnit.testInActiveWindow('inner input should be focused after popup opening', function(assert) {
          var inputFocusedHandler = sinon.stub();
          var $input = $('<input>', {
            id: 'input1',
            type: 'text'
          }).on('focusin', inputFocusedHandler);
          var instance = new DropDownBox(this.$element, {
            focusStateEnabled: true,
            contentTemplate: function(component, content) {
              $(content).append($input);
            }
          });
          instance.open();
          assert.ok(inputFocusedHandler.callCount, 1, 'input get focused');
        });
      });
      QUnit.module('validation', moduleConfig, function() {
        QUnit.test('validation message should be visible if validation is failed even when popup is opened (T923454)', function(assert) {
          this.$element.dxDropDownBox({
            value: [1],
            showClearButton: true
          }).dxValidator({validationRules: [{type: 'required'}]});
          var instance = this.$element.dxDropDownBox('instance');
          var $clearButton = this.$element.find(("." + CLEAR_BUTTON_AREA_CLASS));
          $clearButton.trigger('dxclick');
          assert.strictEqual($('.dx-overlay-wrapper.dx-invalid-message').css('visibility'), 'visible', 'validation message is shown');
          instance.open();
          assert.strictEqual($('.dx-overlay-wrapper.dx-invalid-message').css('visibility'), 'visible', 'validation message is shown after popup opening');
        });
      });
      QUnit.module('valueChanged handler should receive correct event', {
        beforeEach: function() {
          var $__3 = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.valueChangedHandler = sinon.stub();
          var initialOptions = {
            items: [1, 2, 3],
            opened: true,
            onValueChanged: this.valueChangedHandler,
            value: [1]
          };
          this.init = function(options) {
            $__3.$element = $('#dropDownBox').dxDropDownBox(options);
            $__3.instance = $__3.$element.dxDropDownBox('instance');
            $__3.$input = $__3.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
            $__3.keyboard = keyboardMock($__3.$input);
          };
          this.testProgramChange = function(assert) {
            $__3.instance.option('value', [3]);
            var callCount = $__3.valueChangedHandler.callCount;
            var event = $__3.valueChangedHandler.getCall(callCount - 1).args[0].event;
            assert.strictEqual(event, undefined, 'event is undefined');
          };
          this.reinit = function(options) {
            $__3.instance.dispose();
            $__3.init($.extend({}, initialOptions, options));
          };
          this.checkEvent = function(assert, type, target, key) {
            var event = $__3.valueChangedHandler.getCall(0).args[0].event;
            assert.strictEqual(event.type, type, 'event type is correct');
            assert.strictEqual(event.target, target.get(0), 'event target is correct');
            if (type === 'keydown') {
              assert.strictEqual(normalizeKeyName(event), normalizeKeyName({key: key}), 'event key is correct');
            }
          };
          this.init(initialOptions);
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('on runtime change', function(assert) {
          this.testProgramChange(assert);
        });
        QUnit.test('on click on clear button', function(assert) {
          this.reinit({showClearButton: true});
          var $clearButton = this.$element.find(("." + CLEAR_BUTTON_AREA_CLASS));
          $clearButton.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', $clearButton);
          this.testProgramChange(assert);
        });
        QUnit.test('on custom item adding', function(assert) {
          this.reinit({acceptCustomValue: true});
          this.keyboard.type('custom item').change();
          this.checkEvent(assert, 'change', this.$input);
          this.testProgramChange(assert);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/renderer","../../helpers/keyboardMock.js","animation/fx","ui/drop_down_box","core/utils/type","core/config","core/devices","events/utils","data/custom_store","data/data_source/data_source","generic_light.css!","ui/validator","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/renderer"), require("../../helpers/keyboardMock.js"), require("animation/fx"), require("ui/drop_down_box"), require("core/utils/type"), require("core/config"), require("core/devices"), require("events/utils"), require("data/custom_store"), require("data/data_source/data_source"), require("generic_light.css!"), require("ui/validator"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownBox.tests.js.map