!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/button.markup.tests.js"], ["jquery","core/utils/type","core/config","ui/button"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/button.markup.tests.js", ["jquery", "core/utils/type", "core/config", "ui/button"], function($__export) {
  "use strict";
  var $,
      isRenderer,
      config,
      BUTTON_CLASS,
      BUTTON_TEXT_CLASS,
      BUTTON_HAS_TEXT_CLASS,
      BUTTON_HAS_ICON_CLASS,
      BUTTON_CONTENT_CLASS,
      BUTTON_BACK_CLASS,
      TEMPLATE_WRAPPER_CLASS,
      BUTTON_TEXT_STYLE_CLASS,
      BUTTON_CONTAINED_STYLE_CLASS,
      BUTTON_SUBMIT_INPUT_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="button"></div>\
        <div id="widget"></div>\
        <div id="buttonWithTemplate">\
            <div data-options="dxTemplate: { name: \'content\' }" data-bind="text: text"></div>\
        </div>\
        <div id="buttonWithAnonymousTemplate">\
            <div id="content">test</div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      BUTTON_CLASS = 'dx-button';
      BUTTON_TEXT_CLASS = 'dx-button-text';
      BUTTON_HAS_TEXT_CLASS = 'dx-button-has-text';
      BUTTON_HAS_ICON_CLASS = 'dx-button-has-icon';
      BUTTON_CONTENT_CLASS = 'dx-button-content';
      BUTTON_BACK_CLASS = 'dx-button-back';
      TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
      BUTTON_TEXT_STYLE_CLASS = 'dx-button-mode-text';
      BUTTON_CONTAINED_STYLE_CLASS = 'dx-button-mode-contained';
      BUTTON_SUBMIT_INPUT_CLASS = 'dx-button-submit-input';
      QUnit.module('Button markup', function() {
        QUnit.test('markup init', function(assert) {
          var element = $('#button').dxButton();
          assert.ok(element.hasClass(BUTTON_CLASS));
          var items = element.children();
          var hasButtonContentClass = $(items[0]).hasClass(BUTTON_CONTENT_CLASS);
          assert.ok(hasButtonContentClass);
        });
        QUnit.test('init with options', function(assert) {
          var element = $('#button').dxButton({
            text: 'text',
            icon: 'home'
          });
          var buttonContent = element.find('.' + BUTTON_CONTENT_CLASS);
          assert.equal($.trim(buttonContent.find('.' + BUTTON_TEXT_CLASS).text()), 'text');
          assert.ok(element.hasClass(BUTTON_HAS_ICON_CLASS), 'button with icon has icon class');
          assert.ok(element.hasClass(BUTTON_HAS_TEXT_CLASS), 'button with text has text class');
        });
        QUnit.test('submit element should have tabindex attribute', function(assert) {
          var $element = $('#button').dxButton({useSubmitBehavior: true});
          var $submitElement = $element.find('input');
          assert.equal($submitElement.attr('tabindex'), -1, 'submit input is not focusable');
        });
        QUnit.test('class added from type (back)', function(assert) {
          var element = $('#button').dxButton({type: 'back'});
          var buttonContent = element.find('.' + BUTTON_CONTENT_CLASS);
          assert.ok(element.hasClass(BUTTON_BACK_CLASS), 'class was added');
          assert.ok(buttonContent.find('.dx-icon').length, 'icon class was added');
        });
        QUnit.test('class added from stylingMode', function(assert) {
          var element = $('#button').dxButton({stylingMode: 'text'});
          assert.ok(element.hasClass(BUTTON_TEXT_STYLE_CLASS), 'class was added');
        });
        QUnit.test('Default value should be used if stylingMode has wrong value', function(assert) {
          var element = $('#button').dxButton({stylingMode: 'someWrongValue'});
          assert.ok(element.hasClass(BUTTON_CONTAINED_STYLE_CLASS), 'class was added');
        });
        QUnit.test('icon must rendered after change type of button on \'back\'', function(assert) {
          var element = $('#button').dxButton({
            type: 'normal',
            text: 'test'
          });
          assert.ok(element.hasClass('dx-button-normal'), 'button has correct type class');
          assert.equal(element.find('.dx-icon').length, 0, 'icon not be rendered');
          element.dxButton('instance').option('type', 'back');
          assert.equal(element.find('.dx-button-normal').length, 0, 'prev class type was removed');
          assert.equal(element.find('.dx-icon').length, 1, 'icon was rendered');
          assert.ok(element.hasClass(BUTTON_BACK_CLASS), 'button has correct type class after change type');
        });
        QUnit.test('class is not removed after change type', function(assert) {
          var $element = $('#button').dxButton({});
          $element.addClass('test');
          $element.dxButton('option', 'type', 'custom-1');
          assert.ok($element.hasClass('test'));
        });
        ['back', 'danger', 'default', 'normal', 'success'].forEach(function(type) {
          QUnit.test(("previous type=" + type + " class is removed after type changed"), function(assert) {
            var $element = $('#button').dxButton({});
            $element.dxButton('option', 'type', type);
            assert.ok($element.hasClass(("dx-button-" + type)));
            $element.dxButton('option', 'type', 'custom');
            assert.ok($element.hasClass('dx-button-custom'));
            assert.ok(!$element.hasClass(("dx-button-" + type)));
          });
        });
        QUnit.test('icon', function(assert) {
          var element = $('#button').dxButton({icon: 'back'});
          assert.ok(element.find('.dx-icon').hasClass('dx-icon-back'), 'class was added');
          element.dxButton('instance').option('icon', 'success');
          assert.ok(element.find('.dx-icon').hasClass('dx-icon-success'), 'class set with option');
          assert.ok(element.hasClass(BUTTON_HAS_ICON_CLASS), 'button with icon has icon class');
          assert.ok(!element.hasClass(BUTTON_HAS_TEXT_CLASS, 'button with icon only has not text class'));
        });
        QUnit.test('icon as path', function(assert) {
          var element = $('#button').dxButton({icon: '../../testing/content/add.png'});
          assert.ok(element.find('img[src=\'../../testing/content/add.png\']').length, 'icon was added by src');
          element.dxButton('instance').option('icon', '../../testing/content/plus.png');
          assert.ok(element.find('img[src=\'../../testing/content/plus.png\']').length, 'icon was changed correctly');
        });
        QUnit.test('icon as external lib class', function(assert) {
          var element = $('#button').dxButton({icon: 'fa fa-icon'});
          assert.ok(element.find('.fa.fa-icon').length, 'icon was added by fa class');
          element.dxButton('instance').option('icon', 'fa-new-icon fa');
          assert.ok(element.find('.fa-new-icon.fa').length, 'icon was changed correctly');
        });
        QUnit.test('dxButton content class appear on correct container (T256387)', function(assert) {
          var $button = $('#buttonWithTemplate').dxButton({
            text: 'text1',
            icon: 'test-icon',
            template: 'content'
          });
          assert.ok($button.find('.' + BUTTON_CONTENT_CLASS).hasClass(TEMPLATE_WRAPPER_CLASS), 'template has content class');
        });
        QUnit.test('dxButton with anonymous template', function(assert) {
          var $button = $('#buttonWithAnonymousTemplate').dxButton();
          assert.equal($.trim($button.text()), 'test', 'anonymous template rendered');
        });
        QUnit.test('anonymous content template rendering', function(assert) {
          var $contentElement = $('#buttonWithAnonymousTemplate #content');
          var $button = $('#buttonWithAnonymousTemplate').dxButton();
          assert.equal($button.find('#content')[0], $contentElement[0], 'content element preserved');
        });
        QUnit.test('dxButton with template as function', function(assert) {
          $('#button').dxButton({template: function(data, container) {
              assert.equal(isRenderer(container), !!config().useJQuery, 'container is correct');
              return $('<div>');
            }});
        });
        QUnit.test('dxButton should render custom template with render function that returns dom node', function(assert) {
          var $element = $('#button').dxButton({
            template: 'test',
            integrationOptions: {templates: {'test': {render: function(args) {
                    var $element = $('<span>').addClass('dx-template-wrapper').text('button text');
                    return $element.get(0);
                  }}}}
          });
          assert.equal($element.text(), 'button text', 'container is correct');
        });
        QUnit.test('dxButton template content has input element', function(assert) {
          var $element = $('#button').dxButton({
            template: 'test',
            useSubmitBehavior: true,
            integrationOptions: {templates: {'test': {render: function(args) {
                    var $element = $('<span>').addClass('dx-template-wrapper').text('button text');
                    return $element.get(0);
                  }}}}
          });
          var $templateContent = $element.find(("." + TEMPLATE_WRAPPER_CLASS));
          assert.ok($templateContent.children(("." + BUTTON_SUBMIT_INPUT_CLASS)).length, 'template has submit input');
        });
        QUnit.module('aria accessibility', function() {
          QUnit.test('aria role', function(assert) {
            var $element = $('#button').dxButton({});
            assert.equal($element.attr('role'), 'button', 'aria role is correct');
          });
          QUnit.test('aria-label attribute', function(assert) {
            var $element = $('#button').dxButton({
              text: 'test',
              icon: 'find',
              type: 'danger'
            });
            var instance = $element.dxButton('instance');
            assert.equal($element.attr('aria-label'), 'test', 'aria label for all params is correct');
            instance.option('text', '');
            assert.equal($element.attr('aria-label'), 'find', 'aria label without text is correct');
            instance.option('icon', '/path/file.png');
            assert.equal($element.attr('aria-label'), 'file', 'aria label without text and icon is correct');
            instance.option('icon', '');
            assert.equal($element.attr('aria-label'), undefined, 'aria label without text and icon is correct');
          });
          QUnit.test('aria-label attribute should be overriden by custom value via elementAttr option (T1115877)', function(assert) {
            var $element = $('#button').dxButton({
              icon: 'find',
              type: 'danger',
              elementAttr: {'aria-label': 'custom'}
            });
            var instance = $element.dxButton('instance');
            assert.strictEqual($element.attr('aria-label'), 'custom', 'aria label is correct');
            instance.option('text', '');
            assert.strictEqual($element.attr('aria-label'), 'custom', 'custom aria label is correct after text is changed');
            instance.option('icon', '/path/file.png');
            assert.strictEqual($element.attr('aria-label'), 'custom', 'custom aria label is correct after icon is changed');
            instance.option('icon', '');
            assert.strictEqual($element.attr('aria-label'), 'custom', 'custom aria label is correct after icon is changed');
            instance.option('elementAttr', {'aria-label': 'new custom value'});
            assert.strictEqual($element.attr('aria-label'), 'new custom value', 'custom aria label was overridden via elementAttr option');
          });
          QUnit.test('aria-label should be empty if icon is set as a base64 (T281454)', function(assert) {
            var $element = $('#button').dxButton({icon: 'data:image/png;base64,'});
            assert.equal($element.attr('aria-label'), undefined, 'aria label does not exist');
          });
          QUnit.test('after change the button type to \'back\' and then change to \'normal\' arrow should be disappear', function(assert) {
            var $element = $('#button').dxButton({});
            var instance = $element.dxButton('instance');
            var backIconClass = '.dx-icon-back';
            assert.equal($element.find(backIconClass).length, 0, 'button hasn\'t \'back\' icon');
            instance.option('type', 'back');
            assert.equal($element.find(backIconClass).length, 1, 'button has \'back\' icon');
            instance.option('type', 'normal');
            assert.equal($element.find(backIconClass).length, 0, 'button hasn\'t \'back\' icon');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/config","ui/button"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/config"), require("ui/button"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button.markup.tests.js.map