!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/dropDownButton.markup.tests.js"], ["core/utils/size","jquery","ui/drop_down_button","core/utils/window","events/core/events_engine","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/dropDownButton.markup.tests.js", ["core/utils/size", "jquery", "ui/drop_down_button", "core/utils/window", "events/core/events_engine", "generic_light.css!"], function($__export) {
  "use strict";
  var getHeight,
      getOuterWidth,
      getWidth,
      $,
      DropDownButton,
      windowUtils,
      eventsEngine,
      DROP_DOWN_BUTTON_CLASS,
      DROP_DOWN_BUTTON_ACTION_CLASS,
      DROP_DOWN_BUTTON_TOGGLE_CLASS,
      DROP_DOWN_BUTTON_HAS_ARROW_CLASS,
      getButtonGroup,
      getPopup,
      getList,
      getActionButton,
      getToggleButton;
  return {
    setters: [function($__m) {
      getHeight = $__m.getHeight;
      getOuterWidth = $__m.getOuterWidth;
      getWidth = $__m.getWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DropDownButton = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {}],
    execute: function() {
      DROP_DOWN_BUTTON_CLASS = 'dx-dropdownbutton';
      DROP_DOWN_BUTTON_ACTION_CLASS = 'dx-dropdownbutton-action';
      DROP_DOWN_BUTTON_TOGGLE_CLASS = 'dx-dropdownbutton-toggle';
      DROP_DOWN_BUTTON_HAS_ARROW_CLASS = 'dx-dropdownbutton-has-arrow';
      QUnit.testStart(function() {
        var markup = "<div id='container'>\n            <div id='dropDownButton'></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      getButtonGroup = function(instance) {
        return instance._buttonGroup;
      };
      getPopup = function(instance) {
        return instance._popup;
      };
      getList = function(instance) {
        return instance._list;
      };
      getActionButton = function(instance) {
        return instance.$element().find(("." + DROP_DOWN_BUTTON_ACTION_CLASS));
      };
      getToggleButton = function(instance) {
        return instance.$element().find(("." + DROP_DOWN_BUTTON_TOGGLE_CLASS));
      };
      QUnit.module('common markup', {beforeEach: function() {
          this.instance = new DropDownButton($('#dropDownButton'), {});
        }}, function() {
        QUnit.test('element should have dropDownButton and widget class', function(assert) {
          assert.ok(this.instance.$element().hasClass(DROP_DOWN_BUTTON_CLASS), 'dropdownbutton class is ok');
          assert.ok(this.instance.$element().hasClass('dx-widget'), 'widget class is ok');
        });
        QUnit.test('it should be possible to render the widget button without a text', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            items: [{icon: 'box'}, {icon: 'user'}],
            keyExpr: 'icon',
            displayExpr: '',
            selectedItemKey: 'user'
          });
          var $actionButtonText = getActionButton(dropDownButton).text();
          assert.strictEqual($actionButtonText, '', 'action button text is empty');
        });
        QUnit.test('Widget should have no text after selectedItemKey is changed to null', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              id: 1,
              text: 'Test'
            }],
            keyExpr: 'id',
            displayExpr: 'text',
            selectedItemKey: 1,
            useSelectMode: true
          });
          var $actionButtonText = getActionButton(dropDownButton).text();
          assert.strictEqual($actionButtonText, 'Test', 'action button text is not empty');
          dropDownButton.option('selectedItemKey', null);
          $actionButtonText = getActionButton(dropDownButton).text();
          assert.strictEqual($actionButtonText, '', 'action button text is empty');
        });
        QUnit.test('Widget should have no text after Items is changed to empty array', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              id: 1,
              text: 'Test'
            }],
            keyExpr: 'id',
            displayExpr: 'text',
            selectedItemKey: 1,
            useSelectMode: true
          });
          var $actionButtonText = getActionButton(dropDownButton).text();
          assert.strictEqual($actionButtonText, 'Test', 'action button text is not empty');
          dropDownButton.option('items', []);
          $actionButtonText = getActionButton(dropDownButton).text();
          assert.strictEqual($actionButtonText, '', 'action button text is empty');
        });
        QUnit.test('width option should change dropDownButton width', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            width: 235
          });
          assert.strictEqual(dropDownButton.option('width'), 235, 'width is right');
          dropDownButton.option('width', 135);
          assert.strictEqual(dropDownButton.option('width'), 135, 'width was successfully changed');
        });
        QUnit.test('dropDownButton height should be equal to main button height when height depends on content', function(assert) {
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            splitButton: true,
            icon: 'icon.png'
          });
          var actionButton = $dropDownButton.find('.dx-dropdownbutton-action');
          var toggleButton = $dropDownButton.find('.dx-dropdownbutton-toggle');
          $dropDownButton.find('img.dx-icon').css('height', '50px');
          var mainButtonHeight = getHeight(actionButton);
          var dropDownButtonHeight = getHeight(toggleButton);
          assert.strictEqual(dropDownButtonHeight, mainButtonHeight, 'heights are equal after main button content change');
          $dropDownButton.find('i.dx-icon').css('height', '100px');
          mainButtonHeight = getHeight(actionButton);
          dropDownButtonHeight = getHeight(toggleButton);
          assert.strictEqual(mainButtonHeight, dropDownButtonHeight, 'heights are equal after toggle button content change');
        });
        QUnit.test('stylingMode option should be transfered to buttonGroup', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            stylingMode: 'text'
          });
          assert.strictEqual(getButtonGroup(dropDownButton).option('stylingMode'), 'text', 'stylingMode was successfully transfered');
          dropDownButton.option('stylingMode', 'outlined');
          assert.strictEqual(getButtonGroup(dropDownButton).option('stylingMode'), 'outlined', 'stylingMode was successfully changed');
        });
        QUnit.test('widget should have specific class if it has an arrow part (T888866)', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            stylingMode: 'text'
          });
          var $dropDownButton = dropDownButton.$element();
          assert.ok($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
        });
        QUnit.test('widget should have specific class if it has no arrow part', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            stylingMode: 'text',
            showArrowIcon: false
          });
          var $dropDownButton = dropDownButton.$element();
          assert.notOk($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
        });
        QUnit.test('widget should have specific class if splitButton is true', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            stylingMode: 'text',
            showArrowIcon: false,
            splitButton: true
          });
          var $dropDownButton = dropDownButton.$element();
          assert.ok($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
        });
      });
      QUnit.module('button group integration', {}, function() {
        QUnit.test('element should have buttonGroup inside', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            selectionMode: true,
            splitButton: true
          });
          var buttonGroup = getButtonGroup(instance);
          assert.strictEqual(buttonGroup.NAME, 'dxButtonGroup', 'buttonGroup rendered');
          assert.strictEqual(buttonGroup.option('selectionMode'), 'none', 'selection should be disabled');
          assert.strictEqual(buttonGroup.option('stylingMode'), 'outlined', 'styling mode should be outlined');
          var buttonGroupItems = buttonGroup.option('items');
          assert.strictEqual(buttonGroupItems.length, 2, '2 buttons are rendered');
          assert.strictEqual(buttonGroupItems[0].icon, undefined, 'empty icon is correct');
          assert.strictEqual(buttonGroupItems[1].icon, 'spindown', 'dropdown icon is correct');
        });
        QUnit.test('hoverStateEnabled should be transfered to the buttonGroup', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            hoverStateEnabled: false,
            deferRendering: false
          });
          var buttonGroup = getButtonGroup(instance);
          assert.strictEqual(buttonGroup.option('hoverStateEnabled'), false, 'buttonGroup has correct option');
          instance.option('hoverStateEnabled', true);
          assert.strictEqual(buttonGroup.option('hoverStateEnabled'), true, 'buttonGroup has changed option');
        });
        QUnit.test('action and toggle button should have special class', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {splitButton: true});
          assert.ok(instance.$element().find('.dx-button').eq(0).hasClass(DROP_DOWN_BUTTON_ACTION_CLASS));
          assert.ok(instance.$element().find('.dx-button').eq(1).hasClass(DROP_DOWN_BUTTON_TOGGLE_CLASS));
        });
        QUnit.test('a user can redefine buttonGroupOptions', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            useSelectMode: false,
            buttonGroupOptions: {
              items: [{text: 'Test'}],
              someOption: 'Test'
            }
          });
          var buttonGroup = getButtonGroup(instance);
          assert.strictEqual(buttonGroup.option('items[0].text'), 'Test', 'text of the first item is correct');
          assert.strictEqual(buttonGroup.option('items[0].icon'), undefined, 'icon of the first item is correct');
          assert.strictEqual(buttonGroup.option('items[1]'), undefined, 'second item is not exist');
          instance.option('buttonGroupOptions.items[0]', {text: 'Test 2'});
          assert.strictEqual(buttonGroup.option('items[0].text'), 'Test 2', 'text of the first item is correct');
        });
        QUnit.test('a user can read buttonGroupOptions', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {});
          assert.strictEqual(instance.option('buttonGroupOptions.stylingMode'), 'outlined', 'option is correct');
        });
        QUnit.test('text and icon options should depend on selection', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            text: 'Item 1',
            icon: 'box',
            keyExpr: 'id',
            displayExpr: 'text',
            items: [{
              id: 1,
              text: 'User',
              icon: 'user'
            }, {
              id: 2,
              text: 'Group',
              icon: 'group'
            }],
            selectedItemKey: 1,
            useSelectMode: true
          });
          assert.strictEqual(instance.option('text'), 'User', 'text option is correct');
          assert.strictEqual(instance.option('icon'), 'user', 'icon option is correct');
          instance.option('selectedItemKey', 2);
          assert.strictEqual(instance.option('text'), 'Group', 'text option is correct');
          assert.strictEqual(instance.option('icon'), 'group', 'icon option is correct');
        });
      });
      QUnit.module('common use cases', {beforeEach: function() {
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            keyExpr: 'id',
            displayExpr: 'name',
            items: [{
              id: 1,
              file: 'vs.exe',
              name: 'Trial for Visual Studio',
              icon: 'box'
            }, {
              id: 2,
              file: 'all.exe',
              name: 'Trial for all platforms',
              icon: 'user'
            }],
            text: 'Download DevExtreme Trial',
            icon: 'group'
          });
        }}, function() {
        QUnit.test('custom button is rendered', function(assert) {
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Download DevExtreme Trial', 'text is correct on init');
          assert.ok(getActionButton(this.dropDownButton).find('.dx-icon').hasClass('dx-icon-group'), 'icon is correct on init');
          this.dropDownButton.option({
            text: 'New text',
            icon: 'box'
          });
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'New text', 'text is correct on change');
          assert.ok(getActionButton(this.dropDownButton).find('.dx-icon').hasClass('dx-icon-box'), 'icon is correct on change');
        });
        QUnit.test('it should be possible to set non-datasource action button', function(assert) {
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Download DevExtreme Trial', 'initial text is correct');
        });
        QUnit.test('spindown secondary icon should be rendered when splitButton is false', function(assert) {
          this.dropDownButton.option('splitButton', false);
          var $icons = getActionButton(this.dropDownButton).find('.dx-icon');
          assert.strictEqual($icons.length, 2, '2 icons are rendered');
          assert.ok($icons.eq(0).hasClass('dx-icon-group'), 'first icon is correct');
          assert.ok($icons.eq(1).hasClass('dx-icon-spindown'), 'second icon is correct');
        });
        QUnit.test('spindown secondary icon should not be rendered when showArrowIcon is false', function(assert) {
          this.dropDownButton.option({
            splitButton: false,
            showArrowIcon: false
          });
          var $icons = getActionButton(this.dropDownButton).find('.dx-icon');
          assert.strictEqual($icons.length, 1, '1 icon is rendered');
          assert.ok($icons.eq(0).hasClass('dx-icon-group'), 'first icon is correct');
          this.dropDownButton.option('showArrowIcon', true);
          $icons = getActionButton(this.dropDownButton).find('.dx-icon');
          assert.strictEqual($icons.length, 2, '2 icons are rendered');
          assert.ok($icons.eq(0).hasClass('dx-icon-group'), 'first icon is correct');
          assert.ok($icons.eq(1).hasClass('dx-icon-spindown'), 'second icon is correct');
        });
      });
      QUnit.module('data expressions', {beforeEach: function() {
          this.createWidget = function() {
            var config = arguments[0] !== (void 0) ? arguments[0] : {
              items: [{
                id: 1,
                file: 'vs.exe',
                name: 'Trial for Visual Studio',
                icon: 'box'
              }, {
                id: 2,
                file: 'all.exe',
                name: 'Trial for all platforms',
                icon: 'user'
              }],
              keyExpr: 'id',
              useSelectMode: true,
              deferRendering: false
            };
            return new DropDownButton($('#dropDownButton'), config);
          };
        }}, function() {
        QUnit.test('displayExpr is required when items are objects', function(assert) {
          var dropDownButton = this.createWidget();
          dropDownButton.option('displayExpr', undefined);
          dropDownButton.option('selectedItemKey', 1);
          assert.strictEqual(getActionButton(dropDownButton).text(), '');
        });
        QUnit.test('displayExpr as function should work', function(assert) {
          var dropDownButton = this.createWidget();
          dropDownButton.option('displayExpr', function(itemData) {
            return (itemData && itemData.name + '!') || '';
          });
          dropDownButton.option('selectedItemKey', 2);
          assert.strictEqual(getActionButton(dropDownButton).text(), 'Trial for all platforms!', 'displayExpr works');
        });
        QUnit.test('null value should be displayed as an empty string', function(assert) {
          var dropDownButton = this.createWidget({
            items: ['Item 1', 'Item 2', 'Item 3'],
            useSelectMode: true,
            selectedItemKey: null
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), '', 'value is correct');
        });
        QUnit.test('undefined value should be displayed as an empty string', function(assert) {
          var dropDownButton = this.createWidget({
            items: ['Item 1', 'Item 2', 'Item 3'],
            useSelectMode: true,
            selectedItemKey: undefined
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), '', 'value is correct');
        });
        QUnit.test('primitive items can be used without data expressions', function(assert) {
          var dropDownButton = this.createWidget({
            items: ['Item 1', 'Item 2', 'Item 3'],
            useSelectMode: true,
            selectedItemKey: 'Item 1'
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), 'Item 1', 'value is correct');
        });
        QUnit.test('numbers can be used without data expressions', function(assert) {
          var dropDownButton = this.createWidget({
            items: [0, 1, 2],
            useSelectMode: true,
            selectedItemKey: 0
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), '0', 'value is correct');
        });
        QUnit.test('booleans can be used without data expressions', function(assert) {
          var dropDownButton = this.createWidget({
            items: [true, false],
            useSelectMode: true,
            selectedItemKey: false
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), 'false', 'value is correct');
        });
        QUnit.test('widget should use dataSource key in case the "keyExpr" option is not defined', function(assert) {
          var dropDownButton = this.createWidget({
            dataSource: {store: {
                type: 'array',
                data: [{
                  id: '001',
                  text: 'test 1'
                }, {
                  id: '002',
                  text: 'test 2'
                }],
                key: 'id'
              }},
            useSelectMode: true,
            displayExpr: 'text',
            selectedItemKey: '001'
          });
          assert.strictEqual(getActionButton(dropDownButton).text(), 'test 1', 'value is correct');
        });
      });
      QUnit.module('items changing', {beforeEach: function() {
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              id: 1,
              file: 'vs.exe',
              name: 'Trial for Visual Studio',
              icon: 'box'
            }, {
              id: 2,
              file: 'all.exe',
              name: 'Trial for all platforms',
              icon: 'user'
            }],
            useSelectMode: true,
            keyExpr: 'id',
            displayExpr: 'name'
          });
        }}, function() {
        QUnit.test('changing of items should load new selected item', function(assert) {
          this.dropDownButton.option({selectedItemKey: 2});
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Trial for all platforms', 'item was selected');
          this.dropDownButton.option('items', [{
            id: 2,
            name: 'Item 2'
          }]);
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Item 2', 'changed item has been loaded by id');
        });
        QUnit.test('changing of dataSource should load new selected item', function(assert) {
          this.dropDownButton.option({selectedItemKey: 2});
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Trial for all platforms', 'item was selected');
          this.dropDownButton.option('dataSource', [{
            id: 2,
            name: 'Item 2'
          }]);
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Item 2', 'changed item has been loaded by id');
        });
      });
      QUnit.module('deferred datasource', {
        beforeEach: function() {
          var $__3 = this;
          this.items = [{
            id: 1,
            name: 'Left',
            icon: 'alignleft'
          }, {
            id: 4,
            name: 'Right',
            icon: 'alignright'
          }, {
            id: 2,
            name: 'Center',
            icon: 'aligncenter'
          }, {
            id: 3,
            name: 'Justify',
            icon: 'alignjustify'
          }];
          this.clock = sinon.useFakeTimers();
          this.dataSourceConfig = {
            load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve($__3.items.slice());
              }, 500);
              return d.promise();
            },
            byKey: function(key) {
              var d = $.Deferred();
              setTimeout(function() {
                var item = $.grep($__3.items, function(item) {
                  return item.id === key;
                });
                d.resolve(item);
              }, 200);
              return d.promise();
            }
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('select an item via api', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            useSelectMode: true,
            keyExpr: 'id',
            displayExpr: 'text',
            items: [{
              id: 1,
              text: 'Item 1'
            }, {
              id: 2,
              text: 'Item 2'
            }]
          });
          dropDownButton.option('selectedItemKey', 2);
          this.clock.tick(10);
          assert.strictEqual(getActionButton(dropDownButton).text(), 'Item 2', 'action button has been changed');
        });
      });
      QUnit.module('option change', {}, function() {
        QUnit.test('keyExpr option change', function(assert) {
          var items = [{
            name: 'A',
            id: 1
          }, {
            name: 'B',
            id: 2
          }];
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: items,
            opened: true,
            keyExpr: 'name',
            selectedItemKey: 'B',
            useSelectMode: true,
            displayExpr: 'name'
          });
          dropDownButton.option('keyExpr', 'id');
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var listItems = getList(dropDownButton).itemElements();
          eventsEngine.trigger(listItems.eq(0), 'dxclick');
          assert.strictEqual(dropDownButton.option('text'), 'A', 'value is correct');
          assert.deepEqual(getList(dropDownButton).option('selectedItemKeys'), [1], 'value is correct');
        });
        QUnit.test('displayExpr option change', function(assert) {
          var items = [{
            name: 'A',
            id: 1
          }, {
            name: 'B',
            id: 2
          }];
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: items,
            opened: true,
            keyExpr: 'name',
            selectedItemKey: 'B',
            useSelectMode: true,
            displayExpr: 'name'
          });
          dropDownButton.option('displayExpr', 'id');
          assert.strictEqual(dropDownButton.option('text'), '2', 'value is correct');
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $items = getList(dropDownButton).itemElements();
          assert.strictEqual($items.eq(0).text(), '1', 'value is correct');
        });
        QUnit.test('focusStateEnabled option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('focusStateEnabled', false);
          assert.strictEqual(dropDownButton.$element().attr('tabindex'), undefined, 'element is not focusable');
        });
        QUnit.test('tabIndex option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('tabIndex', 3);
          assert.strictEqual(dropDownButton.$element().attr('tabindex'), undefined, 'tabIndex is correct');
        });
        QUnit.test('dropDownButton has no tabIndex attribute', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          var tabIndexAttribute = dropDownButton.$element().attr('tabIndex');
          assert.strictEqual(tabIndexAttribute, undefined);
        });
        QUnit.test('buttonGroup tabIndex attribute equals 0', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          var $buttonGroup = getButtonGroup(dropDownButton).$element();
          var tabIndexAttribute = $buttonGroup.attr('tabIndex');
          assert.strictEqual(tabIndexAttribute, '0');
        });
        QUnit.test('tabIndex option change sets buttonGroup tabIndex attribute', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          var $buttonGroup = getButtonGroup(dropDownButton).$element();
          dropDownButton.option('tabIndex', 1);
          var tabIndexAttribute = $buttonGroup.attr('tabIndex');
          assert.strictEqual(tabIndexAttribute, '1', 'buttonGroup tabIndex attribute changed');
        });
        QUnit.test('opened option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('opened', true);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var popup = getPopup(dropDownButton);
          assert.strictEqual(popup.option('visible'), true, 'popup is opened');
          dropDownButton.option('opened', false);
          assert.strictEqual(popup.option('visible'), false, 'popup is closed');
        });
        QUnit.test('visible option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('visible', false);
          assert.ok(dropDownButton.$element().hasClass('dx-state-invisible'), 'widget is invisible');
        });
        QUnit.test('selectedItemKey option change should raise selectionChanged event', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: true,
            selectedItemKey: 2,
            onSelectionChanged: handler
          });
          dropDownButton.option('selectedItemKey', 3);
          assert.strictEqual(handler.callCount, 1, 'selectionChanged has been raised');
        });
        QUnit.test('selectedItemKey option change should raise selectionChanged event - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: true,
            selectedItemKey: 2
          });
          dropDownButton.on('selectionChanged', handler);
          dropDownButton.option('selectedItemKey', 3);
          assert.strictEqual(handler.callCount, 1, 'selectionChanged has been raised');
        });
        QUnit.test('selectedItemKey option change should change selectedItem option', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: true,
            selectedItemKey: 2
          });
          dropDownButton.option('selectedItemKey', 3);
          assert.strictEqual(dropDownButton.option('selectedItem'), 3, 'selectedItem is correct');
        });
        QUnit.test('dropDownOptions runtime change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            width: 100,
            deferRendering: false
          });
          dropDownButton.option('dropDownOptions', {width: 50});
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var popup = getPopup(dropDownButton);
          assert.strictEqual(popup.option('width'), 50, 'option has been changed');
        });
        QUnit.test('dropDownOptions.visible option change should be ignored', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {deferRendering: false});
          dropDownButton.option('dropDownOptions.visible', true);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var popup = getPopup(dropDownButton);
          assert.strictEqual(popup.option('visible'), false, 'popup is still closed');
        });
        QUnit.test('dropDownOptions.visible option change should not open/close popup', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {deferRendering: false});
          dropDownButton.option('dropDownOptions', {visible: true});
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var popup = getPopup(dropDownButton);
          assert.strictEqual(popup.option('visible'), false, 'popup is still closed');
          dropDownButton.open();
          dropDownButton.option('dropDownOptions', {visible: false});
          popup = getPopup(dropDownButton);
          assert.strictEqual(popup.option('visible'), true, 'popup is still opened');
        });
        QUnit.test('elementAttr runtime change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {elementAttr: {class: 'first'}});
          dropDownButton.option('elementAttr', {class: 'second'});
          var $element = dropDownButton.$element();
          assert.ok($element.hasClass('second'), 'option has been changed');
        });
        QUnit.test('icon option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {icon: 'save'});
          dropDownButton.option('icon', 'box');
          var $icon = dropDownButton.$element().find('.dx-icon').eq(0);
          assert.ok($icon.hasClass('dx-icon-box'), 'option has been changed');
        });
        QUnit.test('deferRendering option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {items: ['Item 1']});
          dropDownButton.option('deferRendering', false);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $listItems = getList(dropDownButton).itemElements();
          assert.strictEqual($listItems.eq(0).text(), 'Item 1', 'deferRendering has been changed true -> false');
        });
        QUnit.test('dropDownContentTemplate option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            deferRendering: false
          });
          var templateFunction = function() {
            return 'Custom template';
          };
          dropDownButton.option('dropDownContentTemplate', templateFunction);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var popupContent = getPopup(dropDownButton).$content();
          assert.strictEqual(popupContent.text(), 'Custom template', 'option has been changed');
        });
        QUnit.test('items option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            deferRendering: false
          });
          dropDownButton.option('items', [4, 5, 6]);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $firstItem = getList(dropDownButton).itemElements().eq(0);
          assert.strictEqual($firstItem.text(), '4', 'option has been changed');
        });
        QUnit.test('splitButton option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('splitButton', true);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          assert.strictEqual(getToggleButton(dropDownButton).length, 1, 'toggle button is rendered');
          dropDownButton.option('splitButton', false);
          assert.strictEqual(getToggleButton(dropDownButton).length, 0, 'there is no toggle button');
        });
        QUnit.test('dataSource option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: [1, 2, 3],
            deferRendering: false
          });
          dropDownButton.option('dataSource', [4, 5, 6]);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $firstItem = getList(dropDownButton).itemElements().eq(0);
          assert.strictEqual($firstItem.text(), '4', 'option has been changed');
        });
        QUnit.test('height option change', function(assert) {
          $('#container').css('height', '900px');
          var dropDownButton = $('#dropDownButton').dxDropDownButton({height: '300px'}).dxDropDownButton('instance');
          dropDownButton.option('height', '50%');
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var buttonGroup = getButtonGroup(dropDownButton);
          var $buttonGroupElement = buttonGroup.$element();
          assert.strictEqual(getHeight($buttonGroupElement), 450, 'height has been transfered to buttonGroup');
          assert.strictEqual(getHeight(dropDownButton.$element()), 450, 'height is correct after option change');
        });
        QUnit.test('itemTemplate option change', function(assert) {
          var items = [{
            id: 1,
            name: 'A'
          }, {
            id: 2,
            name: 'B'
          }];
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: items,
            deferRendering: false,
            itemTemplate: function(itemData) {
              return $('<div>').text((itemData.id + ": " + itemData.name));
            }
          });
          dropDownButton.option('itemTemplate', function(itemData) {
            return $('<div>').text(("#" + itemData.id));
          });
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $listItems = getList(dropDownButton).itemElements();
          assert.strictEqual($listItems.eq(0).text(), '#1', 'itemTemlate has changed item text after option change');
        });
        QUnit.test('some options should be transfered to the list', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1',
              icon: 'box'
            }],
            deferRendering: false,
            grouped: true,
            noDataText: 'No data',
            useSelectMode: false
          });
          dropDownButton.option({
            grouped: false,
            noDataText: 'nothing',
            useSelectMode: true
          });
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var list = getList(dropDownButton);
          assert.strictEqual(list.option('grouped'), false, 'grouped option transfered');
          assert.strictEqual(list.option('noDataText'), 'nothing', 'noDataText option transfered');
          assert.strictEqual(list.option('selectionMode'), 'single', 'selectionMode is single for useSelectMode: true');
        });
        QUnit.test('rtlEnabled option change', function(assert) {
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            opened: true,
            dropDownOptions: {
              width: 200,
              'position.collision': 'none'
            }
          });
          var instance = $dropDownButton.dxDropDownButton('instance');
          instance.option('rtlEnabled', true);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var dropDownButtonElementRect = $dropDownButton.get(0).getBoundingClientRect();
          var popupContentElementRect = getPopup(instance).$overlayContent().get(0).getBoundingClientRect();
          assert.strictEqual(popupContentElementRect.right, dropDownButtonElementRect.right, 'popup position is correct, rtlEnabled = true');
        });
        QUnit.test('showArrowIcon option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            icon: 'group',
            deferRendering: false,
            splitButton: false,
            showArrowIcon: false
          });
          dropDownButton.option('showArrowIcon', true);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var $icons = getActionButton(dropDownButton).find('.dx-icon');
          assert.strictEqual($icons.length, 2, '2 icons are rendered');
          assert.ok($icons.eq(0).hasClass('dx-icon-group'), 'first icon is correct');
          assert.ok($icons.eq(1).hasClass('dx-icon-spindown'), 'second icon is correct');
        });
        QUnit.test('text option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {text: 'A'});
          dropDownButton.option('text', 'B');
          assert.strictEqual(getActionButton(dropDownButton).text(), 'B', 'option has been changed');
        });
        QUnit.test('width option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {width: 235});
          dropDownButton.option('width', 135);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var buttonGroup = getButtonGroup(dropDownButton);
          var $buttonGroupElement = buttonGroup.$element();
          assert.strictEqual(getOuterWidth(dropDownButton.$element()), 135, 'width is correct after option change');
          assert.strictEqual(getWidth($buttonGroupElement), 135, 'option has been transfered to buttonGroup');
        });
        QUnit.test('wrapItemText option change', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            wrapItemText: true
          });
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          dropDownButton.option('wrapItemText', false);
          var list = getList(dropDownButton);
          var $itemContainer = list._itemContainer();
          assert.notOk($itemContainer.hasClass('dx-wrap-item-text'), 'class was removed');
        });
        QUnit.test('onContentReady option change', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            selectedItemKey: 2
          });
          dropDownButton.option('onContentReady', handler);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          dropDownButton.open();
          assert.strictEqual(handler.callCount, 2, 'popup and list are rendered');
        });
        QUnit.test('onItemClick option change', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {items: [1, 2, 3]});
          dropDownButton.option('onItemClick', handler);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.ok(handler.calledOnce, 'handler was called');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
          assert.strictEqual(e.itemData, 1, 'itemData is correct');
          assert.strictEqual($(e.itemElement).get(0), $item.get(0), 'itemElement is correct');
        });
        QUnit.test('onSelectionChanged option runtime change', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            selectedItemKey: 2
          });
          dropDownButton.option('onSelectionChanged', handler);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.ok(handler.calledOnce, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 4, 'event has 4 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.previousItem, 2, 'previousItem is correct');
          assert.strictEqual(e.item, 1, 'item is correct');
        });
        QUnit.test('onOptionChanged option runtime change', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'));
          dropDownButton.option('onOptionChanged', handler);
          if (!windowUtils.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var e = handler.lastCall.args[0];
          assert.ok(handler.calledOnce, 'handler was called');
          assert.strictEqual(e.name, 'onOptionChanged', 'changed option name is correct');
          assert.strictEqual(e.value, handler, 'changed option new value is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","ui/drop_down_button","core/utils/window","events/core/events_engine","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("ui/drop_down_button"), require("core/utils/window"), require("events/core/events_engine"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownButton.markup.tests.js.map