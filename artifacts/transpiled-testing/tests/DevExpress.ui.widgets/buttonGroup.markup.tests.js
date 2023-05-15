!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/buttonGroup.markup.tests.js"], ["jquery","ui/button","ui/button_group","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/buttonGroup.markup.tests.js", ["jquery", "ui/button", "ui/button_group", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      BUTTON_GROUP_CLASS,
      BUTTON_GROUP_WRAPPER_CLASS,
      BUTTON_CLASS,
      BUTTON_GROUP_ITEM_CLASS,
      BUTTON_GROUP_FIRST_ITEM_CLASS,
      BUTTON_GROUP_LAST_ITEM_CLASS,
      BUTTON_GROUP_ITEM_HAS_WIDTH,
      SHAPE_STANDARD_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      BUTTON_GROUP_CLASS = 'dx-buttongroup';
      BUTTON_GROUP_WRAPPER_CLASS = BUTTON_GROUP_CLASS + '-wrapper';
      BUTTON_CLASS = 'dx-button';
      BUTTON_GROUP_ITEM_CLASS = BUTTON_GROUP_CLASS + '-item';
      BUTTON_GROUP_FIRST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-first-item';
      BUTTON_GROUP_LAST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-last-item';
      BUTTON_GROUP_ITEM_HAS_WIDTH = BUTTON_GROUP_ITEM_CLASS + '-has-width';
      SHAPE_STANDARD_CLASS = 'dx-shape-standard';
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"buttonGroup\"></div>\n        <div id=\"widget\"></div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('default', {beforeEach: function() {
          this.$buttonGroup = $('#buttonGroup').dxButtonGroup({items: [{text: 'left'}, {
              icon: 'center icon',
              type: 'normal'
            }]});
          this.buttonGroup = this.$buttonGroup.dxButtonGroup('instance');
        }}, function() {
        QUnit.test('default options', function(assert) {
          var buttonGroup = $('#widget').dxButtonGroup().dxButtonGroup('instance');
          var getOptionValue = function(name) {
            return buttonGroup.option(name);
          };
          assert.strictEqual(getOptionValue('hoverStateEnabled'), true, 'hoverStateEnabled');
          assert.strictEqual(getOptionValue('focusStateEnabled'), true, 'focusStateEnabled');
          assert.strictEqual(getOptionValue('selectionMode'), 'single', 'selectionMode');
          assert.deepEqual(getOptionValue('selectedItems'), [], 'selectedItems');
          assert.deepEqual(getOptionValue('selectedItemKeys'), [], 'selectedItemKeys');
          assert.strictEqual(getOptionValue('keyExpr'), 'text', 'keyExpr');
          assert.deepEqual(getOptionValue('items'), [], 'items');
          assert.strictEqual(getOptionValue('buttonTemplate'), 'content', 'buttonTemplate');
          assert.strictEqual(getOptionValue('onSelectionChanged'), null, 'onSelectionChanged');
          assert.strictEqual(getOptionValue('stylingMode'), 'contained', 'stylingMode');
        });
        QUnit.test('render markup', function(assert) {
          assert.equal(this.$buttonGroup.attr('role'), 'group', 'aria role');
          assert.ok(this.$buttonGroup.hasClass(BUTTON_GROUP_CLASS), 'button group class');
          var $wrapper = $(this.$buttonGroup).children();
          assert.equal($wrapper.length, 1, 'button group wrapper elements count');
          assert.ok($wrapper.eq(0).hasClass(BUTTON_GROUP_WRAPPER_CLASS), 'css class for button collection');
          var $buttons = $(("." + BUTTON_GROUP_WRAPPER_CLASS + " ." + BUTTON_GROUP_ITEM_CLASS + "." + BUTTON_CLASS));
          assert.ok($buttons.eq(0).hasClass(BUTTON_GROUP_FIRST_ITEM_CLASS), 'first item has css class when item is first');
          assert.ok($buttons.eq(0).hasClass(SHAPE_STANDARD_CLASS), 'first item has the shape standard CSS class');
          assert.ok($buttons.eq(1).hasClass(SHAPE_STANDARD_CLASS), 'second item has the shape standard CSS class');
          assert.notOk($buttons.eq(0).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH), 'first item has no css class when width of ButtonGroup is undefined');
          assert.notOk($buttons.eq(1).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH), 'second item has no css class when width of ButtonGroup is undefined');
          assert.equal($buttons.length, 2, 'buttons count');
        });
        QUnit.test('render with default key', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({items: [{text: 'item 1'}, {text: 'item 2'}]});
          var buttons = $buttonGroup.find(("." + BUTTON_CLASS)).map(function(_, $button) {
            return $($button).dxButton('instance');
          });
          assert.equal(buttons[0].option('text'), 'item 1', 'text of first button');
          assert.equal(buttons[1].option('text'), 'item 2', 'text of second button');
        });
        QUnit.test('check button\'s options', function(assert) {
          var buttons = $(("." + BUTTON_CLASS)).map(function(_, $button) {
            return $($button).dxButton('instance');
          });
          assert.equal(buttons[0].option('text'), 'left', 'text of first button');
          assert.equal(buttons[1].option('icon'), 'center icon', 'icon of second button');
          assert.equal(buttons[1].option('type'), 'normal', 'type of second button');
        });
        QUnit.test('focused state is disabled by default for all buttons', function(assert) {
          var buttons = $(("." + BUTTON_CLASS)).map(function(_, $button) {
            return $($button).dxButton('instance');
          });
          assert.equal(buttons[0].option('focusStateEnabled'), false, 'first button');
          assert.equal(buttons[1].option('focusStateEnabled'), false, 'second button');
        });
        QUnit.test('the active state is disabled by default for all buttons', function(assert) {
          var buttons = $(("." + BUTTON_CLASS)).map(function(_, $button) {
            return $($button).dxButton('instance');
          });
          assert.equal(buttons[0].option('activeStateEnabled'), false, 'first button');
          assert.equal(buttons[1].option('activeStateEnabled'), false, 'second button');
        });
        QUnit.test('default options of buttons collection', function(assert) {
          var buttonGroup = $('#widget').dxButtonGroup({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            accessKey: 'test key',
            selectedItemKeys: ['item 1'],
            tabIndex: 25
          }).dxButtonGroup('instance');
          var buttonCollection = buttonGroup._buttonsCollection;
          assert.equal(buttonCollection.option('items').length, 2, 'items of data source count');
          assert.equal(buttonCollection.option('accessKey'), 'test key', 'accessKey option');
          assert.equal(buttonCollection.option('tabIndex'), 25, 'tabIndex option');
          assert.equal(buttonCollection.option('selectedItemKeys'), 'item 1', 'selectedItemKeys option');
          assert.equal(buttonCollection.option('keyExpr'), 'text', 'keyExpr option');
          assert.ok(buttonCollection.option('buttonTemplate'), 'buttonTemplate option');
          assert.ok(buttonCollection.option('focusStateEnabled'), 'focusStateEnabled option');
          assert.notOk(buttonCollection.option('scrollingEnabled'), 'scrollingEnabled option');
          assert.equal(buttonCollection.option('noDataText'), '', 'noDataText option');
        });
        QUnit.test('default item template', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({items: [{
              text: 'item 1',
              type: 'normal',
              icon: 'plus',
              disabled: true,
              visible: false,
              hint: 'Custom hint'
            }]});
          var $button = $buttonGroup.find(("." + BUTTON_GROUP_ITEM_CLASS)).first();
          var button = $button.dxButton('instance');
          assert.equal(button.option('text'), 'item 1', 'text');
          assert.equal(button.option('type'), 'normal', 'type');
          assert.equal(button.option('icon'), 'plus', 'icon');
          assert.equal(button.option('disabled'), true, 'disabled');
          assert.equal(button.option('visible'), false, 'visible');
          assert.equal(button.option('hint'), 'Custom hint', 'hint');
        });
        QUnit.test('use item template', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            buttonTemplate: function(buttonData, buttonContent) {
              $(buttonContent).append($(("<span class=\"custom-template\">" + buttonData.text + "</span>")));
            }
          });
          var $templates = $buttonGroup.find(("." + BUTTON_GROUP_ITEM_CLASS + " .custom-template"));
          assert.equal($templates.eq(0).text(), 'item 1', 'text of first template');
          assert.equal($templates.eq(1).text(), 'item 2', 'text of second template');
        });
        QUnit.test('add css class when the width is defined', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            width: 500
          });
          var $buttons = $buttonGroup.find(("." + BUTTON_GROUP_ITEM_CLASS));
          assert.ok($buttons.eq(0).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH));
          assert.ok($buttons.eq(1).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH));
        });
        QUnit.test('add css class to item with a template when the width is defined', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            buttonTemplate: function() {
              return '<div/>';
            },
            width: 500
          });
          var $buttons = $buttonGroup.find(("." + BUTTON_GROUP_ITEM_CLASS));
          assert.ok($buttons.eq(0).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH));
          assert.ok($buttons.eq(1).hasClass(BUTTON_GROUP_ITEM_HAS_WIDTH));
        });
        QUnit.test('stylingMode', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            stylingMode: 'text'
          });
          var buttons = $buttonGroup.find(("." + BUTTON_CLASS)).map(function(_, $button) {
            return $($button).dxButton('instance');
          });
          assert.equal(buttons[0].option('stylingMode'), 'text', 'first button');
          assert.equal(buttons[1].option('stylingMode'), 'text', 'first button');
        });
        QUnit.test('add css class for a last item', function(assert) {
          var $buttonGroup = $('#widget').dxButtonGroup({items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}]});
          var $lastButton = $buttonGroup.find(("." + BUTTON_CLASS)).last();
          assert.ok($lastButton.hasClass(BUTTON_GROUP_LAST_ITEM_CLASS));
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/button","ui/button_group","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/button"), require("ui/button_group"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=buttonGroup.markup.tests.js.map