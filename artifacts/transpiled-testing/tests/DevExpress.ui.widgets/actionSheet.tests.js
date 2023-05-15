!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/actionSheet.tests.js"], ["core/utils/size","jquery","animation/fx","animation/position","events/hold","../../helpers/pointerMock.js","generic_light.css!","ui/action_sheet"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/actionSheet.tests.js", ["core/utils/size", "jquery", "animation/fx", "animation/position", "events/hold", "../../helpers/pointerMock.js", "generic_light.css!", "ui/action_sheet"], function($__export) {
  "use strict";
  var getWidth,
      getHeight,
      getOuterWidth,
      $,
      fx,
      positionUtils,
      holdEvent,
      pointerMock,
      ACTION_SHEET_WITHOUT_TITLE_CLASS,
      POPOVER_CLASS,
      POPUP_CLASS;
  return {
    setters: [function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      positionUtils = $__m.default;
    }, function($__m) {
      holdEvent = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container">\
            <div id="actionSheet"></div>\
        </div>\
        \
        <div id="widget"></div>';
        $('#qunit-fixture').html(markup);
      });
      ACTION_SHEET_WITHOUT_TITLE_CLASS = 'dx-actionsheet-without-title';
      POPOVER_CLASS = 'dx-popover';
      POPUP_CLASS = 'dx-popup';
      QUnit.module('action sheet', {
        beforeEach: function() {
          fx.off = true;
          this.element = $($('#actionSheet').dxActionSheet());
          this.instance = this.element.dxActionSheet('instance');
          this.instance.show();
          this.instance.hide();
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('render popup', function(assert) {
          var popupElement = $(("." + POPUP_CLASS), this.element);
          var popup = popupElement.dxPopup('instance');
          var popupPosition = popup.option('position');
          assert.ok(popupElement.length, 'Popup rendered');
          assert.ok(popupElement.dxPopup('instance'));
          assert.equal(popupPosition.my, 'bottom');
          assert.equal(popupPosition.at, 'bottom');
          assert.strictEqual(popupPosition.of, window);
          assert.equal(popup.option('width'), '100%');
          assert.equal(popup.option('height'), 'auto');
        });
        QUnit.test('popover should have role="dialog" attribute', function(assert) {
          $('#actionSheet').dxActionSheet({
            usePopover: true,
            target: $('#container')
          });
          var $popoverInstance = $(("." + POPOVER_CLASS)).dxPopover('instance');
          assert.strictEqual($popoverInstance.$content().parent().attr('role'), 'dialog');
        });
        QUnit.test('popup should have role="dialog" attribute', function(assert) {
          $('#actionSheet').dxActionSheet({usePopover: false});
          var $popupInstance = $(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual($popupInstance.$content().parent().attr('role'), 'dialog');
        });
        QUnit.test('popup is not draggable', function(assert) {
          var $overlayContent = $('.dx-overlay-content');
          assert.ok(!$overlayContent.hasClass('dx-popup-draggable'), 'is not draggable');
        });
        QUnit.test('popup position (B252842)', function(assert) {
          assert.expect(1);
          var $popup = $(("." + POPUP_CLASS), this.element);
          var $overlayContent = $('.dx-overlay-content', $popup);
          var popup = $popup.dxPopup('instance');
          var positionConfig = popup.option('position');
          this.instance.show().done(function() {
            var expectedPosition = positionUtils.calculate($overlayContent, positionConfig).v.location;
            assert.equal($overlayContent.position().top, expectedPosition, 'correct position of overlay content element');
          });
        });
        QUnit.test('Resize by option', function(assert) {
          var setUpWidth = 11;
          var setUpHeight = 22;
          var increment = 123;
          var $actionSheet = $('#actionSheet').dxActionSheet({
            items: [{text: 'items 1'}],
            itemTemplate: $('<div />'),
            visible: true,
            width: setUpWidth,
            height: setUpHeight
          });
          var initialWidth = getWidth($actionSheet);
          var initialHeight = getHeight($actionSheet);
          var actionSheet = $actionSheet.dxActionSheet('instance');
          var popup = actionSheet._popup;
          assert.notEqual(setUpWidth, initialWidth, 'Width init does NOT effect element itself');
          assert.notEqual(setUpHeight, initialHeight, 'Height init does NOT effect element itself');
          assert.deepEqual({
            w: setUpWidth,
            h: setUpHeight
          }, {
            w: popup.option('width'),
            h: popup.option('height')
          }, 'Popup\'s size was inited correctly');
          actionSheet.option('width', setUpWidth + increment);
          actionSheet.option('height', setUpHeight + increment);
          assert.deepEqual({
            w: initialWidth,
            h: initialHeight
          }, {
            w: getWidth($actionSheet),
            h: getHeight($actionSheet)
          }, 'Resize does NOT effect element itself');
          assert.deepEqual({
            w: popup.option('width'),
            h: popup.option('height')
          }, {
            w: setUpWidth + increment,
            h: setUpHeight + increment
          }, 'Popup\'s size changed properly');
        });
        QUnit.test('render cancel', function(assert) {
          var popup = $(("." + POPUP_CLASS), this.element).dxPopup('instance');
          this.instance.option('showCancelButton', true);
          var cancelButton = $('.dx-actionsheet-cancel', popup.$content());
          assert.ok(cancelButton.dxButton('instance') && cancelButton.length, 'Cancel button was rendered in popup content');
          this.instance.option('showCancelButton', false);
          cancelButton = $('.dx-actionsheet-cancel', popup.$content());
          assert.ok(!cancelButton.length, 'Cancel button was removed from popup content');
        });
        QUnit.test('render \'onCancelClick\'', function(assert) {
          var cancelActionFired = 0;
          var secondCancelActionFired = 0;
          var $actionSheet = $('#actionSheet').dxActionSheet({
            items: [{text: 'items 1'}],
            visible: true,
            onCancelClick: function() {
              cancelActionFired++;
            }
          });
          var actionSheet = $actionSheet.dxActionSheet('instance');
          actionSheet.show();
          $('.dx-actionsheet-cancel').trigger('dxclick');
          assert.equal(cancelActionFired, 1, 'cancelClick was rendered on init');
          actionSheet.option('onCancelClick', function() {
            secondCancelActionFired++;
          });
          actionSheet.show();
          $('.dx-actionsheet-cancel').trigger('dxclick');
          assert.equal(secondCancelActionFired, 1, 'cancelClick was rendered on option change');
        });
        QUnit.test('show and hide methods are provided to popup', function(assert) {
          assert.expect(5);
          var popup = $(("." + POPUP_CLASS), this.element).dxPopup('instance');
          var instance = this.instance;
          assert.equal(popup.option('visible'), false, 'hidden on init');
          this.instance.show().done(function() {
            assert.strictEqual(this, instance);
          });
          assert.equal(popup.option('visible'), true, 'show()');
          this.instance.hide().done(function() {
            assert.strictEqual(this, instance);
          });
          assert.equal(popup.option('visible'), false, 'hide()');
        });
        QUnit.test('cancel button click hides popup', function(assert) {
          var $cancelButton = $('.dx-actionsheet-cancel', this.element);
          var popup = $(("." + POPUP_CLASS), this.element).dxPopup('instance');
          this.instance.show();
          assert.equal(popup.option('visible'), true, 'shown before click');
          $($cancelButton).trigger('dxclick');
          assert.equal(popup.option('visible'), false, 'hides on click');
        });
        QUnit.test('render items', function(assert) {
          var clickedAction = 0;
          var items = [{
            text: 'Action 1',
            onClick: function() {
              clickedAction = 1;
            },
            type: 'danger'
          }, {
            text: 'Action 2',
            onClick: function() {
              clickedAction = 2;
            },
            disabled: true
          }];
          this.instance.option('items', items);
          this.instance.show();
          var itemElements = $('.dx-actionsheet-item', $($(("." + POPUP_CLASS), this.element).dxPopup('instance').$content()));
          assert.equal(itemElements.length, 2, 'correct items count');
          var first = itemElements.find('.dx-button').eq(0);
          assert.equal(first.dxButton('instance').option('text'), items[0].text, 'correct item text');
          assert.equal(first.dxButton('instance').option('type'), items[0].type, 'correct item type');
          first.trigger('dxclick');
          assert.equal(clickedAction, 1, 'correct item click handler');
          var second = itemElements.find('.dx-button').eq(-1);
          assert.ok(second.dxButton('instance').option('disabled'), 'correct item disabled state');
          assert.equal($('.dx-actionsheet-cancel').length, 1, 'there is only one \'cancel\' button');
        });
        QUnit.test('render items with the right stylingMode', function(assert) {
          var items = [{text: 'Action 1'}, {
            text: 'Action 2',
            stylingMode: 'text'
          }];
          this.instance.option('items', items);
          this.instance.show();
          var itemElements = $('.dx-actionsheet-item', $($(("." + POPUP_CLASS), this.element).dxPopup('instance').$content()));
          assert.equal(itemElements.length, 2, 'correct items count');
          var first = itemElements.find('.dx-button').eq(0);
          assert.equal(first.dxButton('instance').option('stylingMode'), 'outlined', 'default stylingMode is correct');
          var second = itemElements.find('.dx-button').eq(-1);
          assert.equal(second.dxButton('instance').option('stylingMode'), items[1].stylingMode, 'correct stylingMode is set by option');
        });
        QUnit.test('\'onItemHold\' should be fired after hold (T106668)', function(assert) {
          assert.expect(2);
          var $actionSheet = $('#actionSheet').dxActionSheet({
            items: [{text: 'text'}],
            onItemHold: function() {
              assert.ok(true, 'action fired');
            }
          });
          var actionSheet = $actionSheet.dxActionSheet('instance');
          actionSheet.show();
          $(actionSheet.itemElements()).eq(0).trigger(holdEvent.name);
          assert.equal(actionSheet.option('visible'), false, 'closed after hold');
        });
        QUnit.test('title option', function(assert) {
          var popup = $(("." + POPUP_CLASS), this.element).dxPopup('instance');
          assert.equal(popup.option('title'), '', 'default value');
          this.instance.option('title', 'Another title');
          assert.equal(popup.option('title'), 'Another title', 'new value set');
        });
        QUnit.test('showTitle option', function(assert) {
          this.instance.show();
          var $popupTitle = $('.dx-popup-title');
          var $popup = $('.dx-popup-wrapper');
          assert.ok($popupTitle.is(':visible'), 'visible by default');
          assert.ok(!$popup.hasClass(ACTION_SHEET_WITHOUT_TITLE_CLASS), 'class set');
          this.instance.option('showTitle', false);
          assert.ok(!$popupTitle.is(':visible'), 'hidden');
          assert.ok($popup.hasClass(ACTION_SHEET_WITHOUT_TITLE_CLASS), 'class removed');
        });
        QUnit.test('cancelText option', function(assert) {
          var cancelButton = $('.dx-actionsheet-cancel', this.element).dxButton('instance');
          assert.equal(cancelButton.option('text'), 'Cancel', 'default value');
          this.instance.option('cancelText', 'Another cancel text');
          cancelButton = $('.dx-actionsheet-cancel', this.element).dxButton('instance');
          assert.equal(cancelButton.option('text'), 'Another cancel text', 'new value set');
        });
        QUnit.test('regression: B233733 dxActionSheet: popup hides on render', function(assert) {
          var items = [{text: 'Action 1'}, {text: 'Action 2'}];
          this.instance.show();
          this.instance.option('items', items);
          var popup = this.instance.$element().find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.ok(popup.option('visible'), 'popup is shown after items change');
          assert.equal(popup.$content().text(), ['Action 1', 'Action 2', 'Cancel'].join(''), 'popup refreshed after items change');
        });
        QUnit.test('regression: B233570 Menu isn\'t hidden after click on action', function(assert) {
          var items = [{text: 'Action 1'}, {
            text: 'Action 2',
            disabled: true
          }];
          this.instance.option('items', items);
          this.instance.show();
          var itemElements = $('.dx-actionsheet-item', $($(("." + POPUP_CLASS), this.element).dxPopup('instance').$content()));
          var first = itemElements.first();
          var second = itemElements.last();
          var popup = this.element.find(("." + POPUP_CLASS)).dxPopup('instance');
          this.instance.show();
          first.trigger('dxclick');
          assert.ok(!popup.option('visible'), 'popup hides after click');
          this.instance.show();
          second.trigger('dxclick');
          assert.ok(popup.option('visible'), 'popup not hides if button is disabled');
        });
        QUnit.test('popup toggling on option \'visible\' change', function(assert) {
          assert.expect(4);
          var popup = $(("." + POPUP_CLASS), this.element).dxPopup('instance');
          assert.equal(popup.option('visible'), false, 'hidden on init');
          this.instance.option('visible', true);
          assert.equal(popup.option('visible'), true, 'shown');
          this.instance.option('visible', false);
          assert.equal(popup.option('visible'), false, 'hidden');
          var anotherActionSheet = $('<div/>').appendTo($('#container'));
          anotherActionSheet.dxActionSheet({visible: true});
          assert.equal($(("." + POPUP_CLASS), anotherActionSheet).dxPopup('instance').option('visible'), true, 'shown on init');
          anotherActionSheet.remove();
        });
        QUnit.test('items rendered correctly after changing items and showing (Q570978)', function(assert) {
          var $actionSheet = $('<div>').dxActionSheet({}).appendTo('#qunit-fixture');
          var actionSheet = $actionSheet.dxActionSheet('instance');
          actionSheet.option('items', [{text: '1'}, {text: '2'}, {text: '3'}]);
          actionSheet.option('visible', true);
          assert.equal($('.dx-actionsheet-item').length, 3, 'three items rendered');
        });
        QUnit.test('disabled', function(assert) {
          var executed = 0;
          var items = [{
            text: 'Action 1',
            click: function() {
              executed++;
            }
          }];
          this.instance.option('items', items);
          var $button = this.element.find('.dx-actionsheet-item').eq(0);
          this.instance.option('disabled', true);
          this.instance.show();
          pointerMock($button).start().click();
          assert.equal(executed, 0, 'popup not hides if it is disabled');
        });
        QUnit.test('initialized with disabled state widget should not be disabled at all (popup)', function(assert) {
          var $actionSheet = $('#actionSheet').dxActionSheet({
            disabled: true,
            items: [1, 2, 3],
            usePopover: false,
            visible: true
          });
          $actionSheet.dxActionSheet('option', 'disabled', false);
          assert.equal($('.dx-actionsheet-popup-wrapper .dx-state-disabled').length, 0, 'widget enabled');
        });
        QUnit.test('initialized with disabled state widget should not be disabled at all (popover)', function(assert) {
          var $actionSheet = $('#actionSheet').dxActionSheet({
            disabled: true,
            items: [1, 2, 3],
            usePopover: true,
            target: 'body',
            visible: true
          });
          $actionSheet.dxActionSheet('option', 'disabled', false);
          assert.equal($('.dx-actionsheet-popover-wrapper .dx-state-disabled').length, 0, 'widget enabled');
        });
        QUnit.test('\'visible\' option', function(assert) {
          this.instance.show();
          var $cancelButton = this.element.find('dx-button');
          $($cancelButton).trigger('dxclick');
          assert.ok(this.instance.option('visible'), false);
        });
        QUnit.test('visible option should be updated if was changed in popup (Q571157)', function(assert) {
          this.instance.option('visible', true);
          this.instance._popup.option('visible', false);
          assert.equal(this.instance.option('visible'), false);
        });
      });
      QUnit.module('popover integration', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('usePopover without target creates Popup', function(assert) {
          var $actionSheet = $('#actionSheet').dxActionSheet({usePopover: true});
          $actionSheet.dxActionSheet('option', 'visible', true);
          var $popup = $actionSheet.find(("." + POPUP_CLASS));
          assert.equal($popup.length, 1, 'popup was created');
        });
        QUnit.test('usePopover with target creates Popover', function(assert) {
          var $container = $('#container');
          var $actionSheet = $('#actionSheet').dxActionSheet({
            usePopover: true,
            target: $container
          });
          $actionSheet.dxActionSheet('option', 'visible', true);
          var $popover = $(("." + POPOVER_CLASS));
          var $target = $($popover.dxPopover('option', 'target'));
          assert.equal($popover.length, 1, 'popover was created');
          assert.equal($target.get(0), $container.get(0), 'popover target is element');
          assert.equal($('.dx-actionsheet-popup-wrapper').length, 0, 'no popup-related css class');
          assert.equal($('.dx-actionsheet-popover-wrapper').length, 1, 'popover-related css class added');
          assert.equal($('.dx-actionsheet-cancel').length, 0, 'no cancel button');
        });
        QUnit.test('usePopover option change', function(assert) {
          var $container = $('#container');
          var actionSheet = $('#actionSheet').dxActionSheet({
            usePopover: false,
            target: $container
          }).dxActionSheet('instance');
          assert.equal($(("." + POPOVER_CLASS)).length, 0, 'popover is not selected');
          actionSheet.option('usePopover', true);
          assert.equal($(("." + POPOVER_CLASS)).length, 1, 'popover is selected');
          actionSheet.option('usePopover', false);
          assert.equal($(("." + POPOVER_CLASS)).length, 0, 'popover is not selected');
        });
        QUnit.test('outside click fires cancel', function(assert) {
          var $actionSheet = $('#actionSheet').dxActionSheet({
            usePopover: true,
            target: $('#container')
          });
          $actionSheet.dxActionSheet('show');
          pointerMock($('#qunit-fixture')).start().wait(500).click();
          var $popover = $('#container').find('.dx-overlay-content');
          assert.ok($popover.is(':hidden'), 'popover is hidden');
          $actionSheet.dxActionSheet('show');
          assert.ok($popover.is(':visible'), 'popover is visible');
        });
      });
      QUnit.module('Forward templates to popup', function() {
        QUnit.test('Forward templates to popup', function(assert) {
          var $actionSheet = $('#actionSheet').append($('<div />').attr('data-options', 'dxTemplate : { name: \'title\' }'));
          $actionSheet.dxActionSheet();
          var actionSheet = $actionSheet.dxActionSheet('instance');
          var templates = actionSheet.option('integrationOptions.templates');
          var popupTemplates = actionSheet._popup.option('integrationOptions.templates');
          var noOneTemplateIsMissing = true;
          $.each(templates, function(key) {
            if (popupTemplates[key])
              return;
            noOneTemplateIsMissing = false;
          });
          assert.ok(noOneTemplateIsMissing, 'Templates were forwarded');
        });
      });
      QUnit.module('regressions', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Q463379 - dxActionSheet adds duplicated items when they are added at runtime (13.2 Beta)', function(assert) {
          var items = [{text: 'Action 1'}, {text: 'Action 2'}];
          var $actionSheet = $('#actionSheet');
          $actionSheet.dxActionSheet({items: items});
          $actionSheet.dxActionSheet('show');
          $actionSheet.dxActionSheet('option', 'items', items);
          var $itemElements = $('.dx-actionsheet-item', $(("." + POPUP_CLASS), $actionSheet).dxPopup('instance').$content());
          assert.equal($itemElements.length, 2, 'correct items count');
        });
        QUnit.test('fails when using custom itemTemplate or itemRender (B253839)', function(assert) {
          var $actionSheet = $('#actionSheet').dxActionSheet({
            items: [{text: 'item 1'}],
            itemTemplate: $('<div />'),
            visible: true
          });
          $($actionSheet.find('.dx-actionsheet-item')).trigger('dxclick');
          assert.expect(0);
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('default', function(assert) {
          var $element = $('#widget').dxActionSheet();
          var instance = $element.dxActionSheet('instance');
          instance.show();
          assert.ok(getOuterWidth(instance._popup.$overlayContent()) > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxActionSheet({width: 400});
          var instance = $element.dxActionSheet('instance');
          instance.show();
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual(getOuterWidth(instance._popup.$overlayContent()), 400, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxActionSheet();
          var instance = $element.dxActionSheet('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          instance.show();
          assert.strictEqual(getOuterWidth(instance._popup.$overlayContent()), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","animation/fx","animation/position","events/hold","../../helpers/pointerMock.js","generic_light.css!","ui/action_sheet"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("animation/fx"), require("animation/position"), require("events/hold"), require("../../helpers/pointerMock.js"), require("generic_light.css!"), require("ui/action_sheet"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=actionSheet.tests.js.map