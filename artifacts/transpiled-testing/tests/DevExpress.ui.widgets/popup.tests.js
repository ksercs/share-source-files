!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/popup.tests.js"], ["core/utils/size","jquery","core/devices","animation/fx","core/utils/view_port","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","core/config","core/utils/type","core/utils/browser","core/utils/version","core/utils/resize_callbacks","core/utils/window","ui/widget/ui.errors","ui/themes","../../helpers/executeAsyncMock.js","events/visibility_change","core/dom_adapter","generic_light.css!","ui/popup","ui/tab_panel","ui/scroll_view","ui/date_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/popup.tests.js", ["core/utils/size", "jquery", "core/devices", "animation/fx", "core/utils/view_port", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "core/config", "core/utils/type", "core/utils/browser", "core/utils/version", "core/utils/resize_callbacks", "core/utils/window", "ui/widget/ui.errors", "ui/themes", "../../helpers/executeAsyncMock.js", "events/visibility_change", "core/dom_adapter", "generic_light.css!", "ui/popup", "ui/tab_panel", "ui/scroll_view", "ui/date_box"], function($__export) {
  "use strict";
  var getOuterHeight,
      getOuterWidth,
      setWidth,
      getHeight,
      getInnerHeight,
      getInnerWidth,
      getWidth,
      $,
      devices,
      fx,
      viewPort,
      pointerMock,
      keyboardMock,
      config,
      isRenderer,
      browser,
      compareVersions,
      resizeCallbacks,
      windowUtils,
      uiErrors,
      themes,
      executeAsyncMock,
      visibilityChangeUtils,
      domAdapter,
      IS_SAFARI,
      IS_IOS_DEVICE,
      IS_OLD_SAFARI,
      PREVENT_SAFARI_SCROLLING_CLASS,
      POPUP_CONTENT_SCROLLABLE_CLASS,
      POPUP_CLASS,
      POPUP_WRAPPER_CLASS,
      POPUP_CONTENT_CLASS,
      OVERLAY_CONTENT_CLASS,
      OVERLAY_WRAPPER_CLASS,
      POPUP_BOTTOM_CLASS,
      POPUP_FULL_SCREEN_CLASS,
      POPUP_TITLE_CLASS,
      POPUP_TITLE_CLOSEBUTTON_CLASS,
      POPUP_HAS_CLOSE_BUTTON_CLASS,
      POPUP_NORMAL_CLASS,
      POPUP_CONTENT_FLEX_HEIGHT_CLASS,
      POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
      POPUP_BOTTOM_RIGHT_RESIZE_HANDLE_CLASS,
      POPUP_TOP_LEFT_RESIZE_HANDLE_CLASS,
      DISABLED_STATE_CLASS,
      POPUP_DRAGGABLE_CLASS,
      VIEWPORT_CLASS,
      viewport,
      toSelector;
  return {
    setters: [function($__m) {
      getOuterHeight = $__m.getOuterHeight;
      getOuterWidth = $__m.getOuterWidth;
      setWidth = $__m.setWidth;
      getHeight = $__m.getHeight;
      getInnerHeight = $__m.getInnerHeight;
      getInnerWidth = $__m.getInnerWidth;
      getWidth = $__m.getWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      viewPort = $__m.value;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      compareVersions = $__m.compare;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {
      uiErrors = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      visibilityChangeUtils = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      IS_SAFARI = !!browser.safari;
      IS_IOS_DEVICE = devices.real().platform === 'ios';
      IS_OLD_SAFARI = IS_SAFARI && compareVersions(browser.version, [11]) < 0;
      PREVENT_SAFARI_SCROLLING_CLASS = 'dx-prevent-safari-scrolling';
      POPUP_CONTENT_SCROLLABLE_CLASS = 'dx-popup-content-scrollable';
      themes.setDefaultTimeout(0);
      QUnit.testStart(function() {
        viewPort($('#qunit-fixture').addClass(VIEWPORT_CLASS));
        var style = '<style nonce="qunit-test">\
        html, body {\
            height: 100%;\
            margin: 0;\
        }\
        \
        #qunit-fixture {\
            width: 100%;\
            height: 100%;\
        }';
        var fixtureRoot = $('#qunit-fixture').get(0);
        if (fixtureRoot.getRootNode().host) {
          style += '\
            :scope div.shadow-container {\
                width: 100% !important;\
                height: 100% !important;\
            }\
            :host {\
                width: 100%;\
                height: 100%;\
            }';
        }
        style += '</style>';
        var markup = style + '<div id="popup"></div>\
        <div id="secondPopup"></div>\
        <div id="container"></div>\
        \
        <div id="popupWithAnonymousTmpl">\
            <div class="testContent">TestContent</div>\
        </div>\
        \
        <div id="popupWithContentTmpl">\
            <div data-options="dxTemplate: { name: \'content\'}">\
                <div class="testContent">testContent</div>\
            </div>\
        </div>\
        \
        <div id="popupWithTitleAndContentTmpl">\
            <div data-options="dxTemplate: { name: \'title\'}">\
                <div class="testTitle">testTitle</div>\
            </div>\
            <div data-options="dxTemplate: { name: \'content\'}">\
                <div class="testContent">testContent</div>\
            </div>\
        </div>\
        \
        <div id="popupWithTitleTemplate">\
            <div data-options="dxTemplate: { name: \'customTitle\' }">testTitle</div>\
            <div data-options="dxTemplate: { name: \'content\' }"></div>\
        </div>\
        \
        <div id="popupWithCustomAndContentTemplate">\
            <div data-options="dxTemplate: { name: \'custom\' }">\
                TestContent\
            </div>\
            <div data-options="dxTemplate: { name: \'content\' }">\
                WrongContent\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      executeAsyncMock.setup();
      POPUP_CLASS = 'dx-popup';
      POPUP_WRAPPER_CLASS = 'dx-popup-wrapper';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      POPUP_BOTTOM_CLASS = 'dx-popup-bottom';
      POPUP_FULL_SCREEN_CLASS = 'dx-popup-fullscreen';
      POPUP_TITLE_CLASS = 'dx-popup-title';
      POPUP_TITLE_CLOSEBUTTON_CLASS = 'dx-closebutton';
      POPUP_HAS_CLOSE_BUTTON_CLASS = 'dx-has-close-button';
      POPUP_NORMAL_CLASS = 'dx-popup-normal';
      POPUP_CONTENT_FLEX_HEIGHT_CLASS = 'dx-popup-flex-height';
      POPUP_CONTENT_INHERIT_HEIGHT_CLASS = 'dx-popup-inherit-height';
      POPUP_BOTTOM_RIGHT_RESIZE_HANDLE_CLASS = 'dx-resizable-handle-corner-bottom-right';
      POPUP_TOP_LEFT_RESIZE_HANDLE_CLASS = 'dx-resizable-handle-corner-top-left';
      DISABLED_STATE_CLASS = 'dx-state-disabled';
      POPUP_DRAGGABLE_CLASS = 'dx-popup-draggable';
      VIEWPORT_CLASS = 'dx-viewport';
      viewport = function() {
        return $(toSelector(VIEWPORT_CLASS));
      };
      toSelector = function(cssClass) {
        return ("." + cssClass);
      };
      QUnit.module('basic', function() {
        QUnit.test('markup init', function(assert) {
          var $element = $('#popup').dxPopup();
          assert.ok($element.hasClass(POPUP_CLASS));
          $element.dxPopup('show');
          var $container = viewport().find(("." + POPUP_WRAPPER_CLASS)).children();
          assert.ok($container.hasClass(OVERLAY_CONTENT_CLASS));
          assert.ok($container.children(':eq(0)').hasClass(POPUP_TITLE_CLASS));
          assert.ok($container.children(':eq(1)').hasClass(POPUP_CONTENT_CLASS));
        });
        QUnit.test('content', function(assert) {
          var instance = $('#popup').dxPopup({visible: true}).dxPopup('instance');
          assert.equal(instance.$content().get(0), viewport().find(("." + POPUP_WRAPPER_CLASS)).find(("." + POPUP_CONTENT_CLASS)).get(0));
        });
        QUnit.test('role="dialog" attribute should be set', function(assert) {
          var instance = $('#popup').dxPopup().dxPopup('instance');
          var $overlayContent = instance.$content().parent();
          assert.strictEqual($overlayContent.attr('role'), 'dialog');
        });
        QUnit.test('popup wrapper should have \'fixed\' or \'absolute\' position in fullscreen', function(assert) {
          $('#popup').dxPopup({
            fullScreen: true,
            visible: true
          });
          var $wrapper = $('.' + POPUP_WRAPPER_CLASS);
          assert.ok(($wrapper.css('position') === 'fixed') || ($wrapper.css('position') === 'absolute'), 'popup wrapper position type is correct');
        });
        QUnit.test('shading has width and height if enabled', function(assert) {
          $('#popup').dxPopup({visible: true});
          var $wrapper = $('.' + POPUP_WRAPPER_CLASS);
          assert.equal(getOuterHeight($wrapper), getOuterHeight($('#qunit-fixture')), 'height is 100%');
          assert.equal(getOuterWidth($wrapper), getOuterWidth($('#qunit-fixture')), 'width is 100%');
        });
        QUnit.test('default options', function(assert) {
          var $popup = $('#popup').dxPopup({
            title: 'Any header',
            visible: true
          });
          var instance = $popup.dxPopup('instance');
          var $overlayContent = instance.$content().parent();
          assert.equal(instance.option('title'), 'Any header');
          assert.equal(instance.option('title'), $overlayContent.children().eq(0).text());
          instance.option('title', 'Other header');
          assert.equal($overlayContent.children().eq(0).text(), 'Other header');
        });
        QUnit.test('content template', function(assert) {
          var $popup = $('#popupWithContentTmpl').dxPopup({visible: true});
          var instance = $popup.dxPopup('instance');
          var $content = instance.$content();
          instance.show();
          assert.equal($content.children().length, 1);
          assert.ok($content.find('.testContent').length);
          assert.equal($.trim($content.text()), 'testContent');
        });
        QUnit.test('title and content template', function(assert) {
          var $popup = $('#popupWithTitleAndContentTmpl').dxPopup({visible: true});
          var instance = $popup.dxPopup('instance');
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          var $content = instance.$content();
          assert.equal($title.children().length, 1);
          assert.ok($title.find('.testTitle').length);
          assert.equal($.trim($title.text()), 'testTitle');
          assert.equal($content.children().length, 1);
          assert.ok($content.find('.testContent').length);
          assert.equal($.trim($content.text()), 'testContent');
        });
        QUnit.test('custom titleTemplate option', function(assert) {
          $('#popupWithTitleTemplate').dxPopup({
            titleTemplate: 'customTitle',
            visible: true
          });
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          assert.equal($.trim($title.text()), 'testTitle', 'title text is correct');
        });
        QUnit.test('done button is located after cancel button in non-win8 device', function(assert) {
          devices.current('androidPhone');
          var $popup = $('#popup').dxPopup({
            toolbarItems: [{shortcut: 'done'}, {shortcut: 'cancel'}],
            animation: null,
            visible: true
          });
          var instance = $popup.dxPopup('instance');
          var $popupBottom = instance.$content().parent().find('.dx-popup-bottom');
          assert.equal($popupBottom.text(), 'CancelOK', 'buttons order is correct');
          instance.option('toolbarItems', [{shortcut: 'cancel'}, {shortcut: 'done'}]);
          $popupBottom = instance.$content().parent().find('.dx-popup-bottom');
          assert.equal($popupBottom.text(), 'CancelOK', 'buttons order is correct');
          devices.current(devices.real());
        });
        QUnit.test('buttons should be rendered correctly after toolbar was repainted', function(assert) {
          devices.current('desktop');
          var $popup = $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              'widget': 'dxButton',
              'toolbar': 'bottom',
              'location': 'before',
              'options': {
                'text': 'Today',
                'type': 'today'
              }
            }, {
              'shortcut': 'done',
              'options': {'text': 'OK'},
              'toolbar': 'bottom',
              'location': 'after'
            }, {
              'shortcut': 'cancel',
              'options': {'text': 'Cancel'},
              'toolbar': 'bottom',
              'location': 'after'
            }]
          });
          var instance = $popup.dxPopup('instance');
          var $popupBottom = instance.$content().parent().find('.dx-popup-bottom');
          $popupBottom.dxToolbar('repaint');
          assert.equal($popupBottom.text(), 'TodayOKCancel', 'buttons order is correct');
          devices.current(devices.real());
        });
        QUnit.test('Check that title do not render twice or more, Q553652', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            title: 'test'
          });
          var instance = $popup.dxPopup('instance');
          assert.equal(instance.option('title'), 'test', 'title is test');
          assert.equal($(("." + POPUP_TITLE_CLASS), viewport()).length, 1, 'there can be only one title');
          instance.option('visible', false);
          instance.option('title', 'test2');
          instance.option('visible', true);
          assert.equal(instance.option('title'), 'test2', 'title is test2');
          assert.equal($(("." + POPUP_TITLE_CLASS), viewport()).length, 1, 'there can be only one title');
        });
        QUnit.test('close button is not shown when title is not displayed', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            closeButton: true,
            showTitle: false
          });
          var $closeButton = $('.' + POPUP_TITLE_CLOSEBUTTON_CLASS, $popup);
          assert.equal($closeButton.length, 0, 'close button element');
        });
        QUnit.test('close button is shown when title changes', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            showTitle: true,
            showCloseButton: true
          }).dxPopup('instance');
          popup.option('title', 'new title');
          var $titleToolbar = popup.$wrapper().find(("." + POPUP_TITLE_CLASS));
          assert.ok($(("." + POPUP_TITLE_CLOSEBUTTON_CLASS), $titleToolbar).length);
        });
        QUnit.test('popup top toolbar rendering', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              text: 'top text',
              toolbar: 'top',
              location: 'center'
            }]
          });
          var $popupWrapper = $('.' + POPUP_WRAPPER_CLASS);
          var $titleToolbar = $popupWrapper.find('.' + POPUP_TITLE_CLASS);
          assert.ok($titleToolbar.hasClass('dx-toolbar'), 'top toolbar is present');
          assert.equal($titleToolbar.text(), 'top text', 'top toolbar has correct content');
        });
        QUnit.test('popup bottom toolbar rendering', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              text: 'bottom text',
              toolbar: 'bottom',
              location: 'center'
            }]
          });
          var $popupWrapper = $('.' + POPUP_WRAPPER_CLASS);
          var $bottomToolbar = $popupWrapper.find('.' + POPUP_BOTTOM_CLASS);
          assert.ok($bottomToolbar.hasClass('dx-toolbar'), 'bottom toolbar is present');
          assert.equal($bottomToolbar.text(), 'bottom text', 'bottom toolbar has correct content');
        });
        QUnit.test(("top toolbar has specific " + POPUP_HAS_CLOSE_BUTTON_CLASS + " class"), function(assert) {
          $('#popup').dxPopup({
            visible: true,
            showCloseButton: true,
            showTitle: true
          });
          var $titleToolbar = $('.' + POPUP_TITLE_CLASS);
          assert.ok($titleToolbar.hasClass(POPUP_HAS_CLOSE_BUTTON_CLASS));
        });
        QUnit.test(("top toolbar has no specific " + POPUP_HAS_CLOSE_BUTTON_CLASS + " class if popup has no close button"), function(assert) {
          $('#popup').dxPopup({
            visible: true,
            showCloseButton: true,
            showTitle: false
          });
          var $titleToolbar = $('.' + POPUP_TITLE_CLASS);
          assert.notOk($titleToolbar.hasClass(POPUP_HAS_CLOSE_BUTTON_CLASS));
        });
        QUnit.test('buttons rendering when aliases are specified', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            showCloseButton: false,
            toolbarItems: [{shortcut: 'cancel'}, {shortcut: 'done'}, {shortcut: 'clear'}]
          });
          var $popupWrapper = $('.' + POPUP_WRAPPER_CLASS);
          assert.equal($popupWrapper.find('.dx-button').length, 3, 'all buttons are rendered');
        });
        QUnit.test('shortcut buttons are placed in specified location', function(assert) {
          devices.current('desktop');
          $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              shortcut: 'done',
              location: 'after'
            }]
          });
          var $button = $('.' + POPUP_BOTTOM_CLASS).find('.dx-toolbar-after').find('.dx-popup-done');
          assert.equal($button.length, 1, 'done button is at correct location');
          devices.current(devices.real());
        });
        QUnit.test('items should be rendered with toolbarItems.toolbar=\'top\' as default', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              text: 'sample',
              location: 'center'
            }]
          });
          var $popupWrapper = $('.' + POPUP_WRAPPER_CLASS);
          var $titleToolbar = $popupWrapper.find('.' + POPUP_TITLE_CLASS);
          var instance = $('#popup').dxPopup('instance');
          assert.equal(instance.option('toolbarItems')[0].toolbar, 'top', 'toolbar property was set correctly');
          assert.equal($titleToolbar.text(), 'sample', 'top toolbar has correct content');
        });
        QUnit.test('toolbar must receive \'rtlEnabled\' option from dxPopup', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            rtlEnabled: true,
            toolbarItems: [{
              'widget': 'dxButton',
              'toolbar': 'bottom',
              'location': 'before',
              'options': {
                'text': 'Today',
                'type': 'today'
              }
            }, {
              'shortcut': 'done',
              'options': {'text': 'OK'},
              'toolbar': 'bottom',
              'location': 'after'
            }, {
              'shortcut': 'cancel',
              'options': {'text': 'Cancel'},
              'toolbar': 'bottom',
              'location': 'after'
            }]
          });
          var instance = $popup.dxPopup('instance');
          var toolbarInstance = instance.$content().parent().find('.dx-popup-bottom').dxToolbar('instance');
          assert.ok(toolbarInstance.option('rtlEnabled'), 'toolbar\'s \'rtlEnabled\' option is true');
        });
        QUnit.test('toolbar must receive \'rtlEnabled\' from dxPopup after optionChanged', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            rtlEnabled: true,
            deferRendering: false,
            toolbarItems: [{
              'widget': 'dxButton',
              'toolbar': 'bottom',
              'location': 'before',
              'options': {
                'text': 'Today',
                'type': 'today'
              }
            }, {
              'shortcut': 'done',
              'options': {'text': 'OK'},
              'toolbar': 'bottom',
              'location': 'after'
            }, {
              'shortcut': 'cancel',
              'options': {'text': 'Cancel'},
              'toolbar': 'bottom',
              'location': 'after'
            }]
          });
          var instance = $popup.dxPopup('instance');
          instance.option('rtlEnabled', false);
          var toolbarInstance = instance.$content().parent().find('.dx-popup-bottom').dxToolbar('instance');
          assert.notOk(toolbarInstance.option('rtlEnabled'), 'toolbar\'s \'rtlEnabled\' option is false');
        });
        QUnit.test('toolbar must render \'default\' type buttons if \'useDefaultToolbarButtons\' is set', function(assert) {
          var popupInstance = $('#popup').dxPopup({
            visible: true,
            useDefaultToolbarButtons: true,
            deferRendering: false,
            toolbarItems: [{
              toolbar: 'bottom',
              widget: 'dxButton',
              options: {
                text: 'Retry',
                type: 'danger'
              }
            }, {
              toolbar: 'bottom',
              widget: 'dxButton',
              options: {text: 'Ok'}
            }]
          }).dxPopup('instance');
          var toolbarButtons = popupInstance.$content().parent().find('.dx-popup-bottom .dx-button');
          assert.ok(toolbarButtons.eq(0).hasClass('dx-button-danger'), 'button has custom class');
          assert.ok(toolbarButtons.eq(1).hasClass('dx-button-default'), 'button default class is \'default\', not normal');
        });
        QUnit.test('toolbar must render flat buttons and shortcuts if \'useFlatToolbarButtons\' is set', function(assert) {
          devices.current('desktop');
          var popupInstance = $('#popup').dxPopup({
            visible: true,
            useFlatToolbarButtons: true,
            deferRendering: false,
            toolbarItems: [{
              shortcut: 'done',
              options: {text: 'Retry'}
            }, {
              toolbar: 'bottom',
              widget: 'dxButton',
              options: {text: 'Ok'}
            }]
          }).dxPopup('instance');
          var toolbarButtons = popupInstance.$content().parent().find('.dx-popup-bottom .dx-button');
          assert.ok(toolbarButtons.eq(0).hasClass('dx-button-mode-text'), 'shortcut has dx-button-mode-text class');
          assert.ok(toolbarButtons.eq(1).hasClass('dx-button-mode-text'), 'button has dx-button-mode-text class');
          devices.current(devices.real());
        });
        QUnit.test('disabled=true should add "dx-state-disabled" class to popup content (T1046427)', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            disabled: true
          }).dxPopup('instance');
          assert.ok(popup.$content().hasClass(DISABLED_STATE_CLASS));
          popup.option('disabled', false);
          assert.notOk(popup.$content().hasClass(DISABLED_STATE_CLASS), 'class is removed after runtime change to false');
        });
        QUnit.test('disabled=true should pass disabled to toolbars', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            disabled: true,
            toolbarItems: [{
              location: 'before',
              name: 'topButton',
              visible: true,
              widget: 'dxButton'
            }, {
              location: 'after',
              toolbar: 'bottom',
              name: 'bottomButton',
              visible: true,
              widget: 'dxButton'
            }]
          }).dxPopup('instance');
          assert.ok(popup.topToolbar().hasClass(DISABLED_STATE_CLASS), 'top toolbar has disabled class');
          assert.ok(popup.bottomToolbar().hasClass(DISABLED_STATE_CLASS), 'bottom toolbar has disabled class');
          popup.option('disabled', false);
          assert.notOk(popup.topToolbar().hasClass(DISABLED_STATE_CLASS), 'class is removed from top toolbar');
          assert.notOk(popup.bottomToolbar().hasClass(DISABLED_STATE_CLASS), 'class is removed from bottom toolbar');
        });
        QUnit.test('popup should update zIndex on focus', function(assert) {
          var firstPopup = $('#popup').dxPopup({
            visible: true,
            focusStateEnabled: true
          }).dxPopup('instance');
          var secondPopup = $('#secondPopup').dxPopup({
            visible: true,
            focusStateEnabled: true
          }).dxPopup('instance');
          var baseZIndex = 1501;
          firstPopup.focus();
          var firstPopupZIndex = parseInt(firstPopup.$wrapper().css('zIndex'), 10);
          secondPopup.focus();
          var secondPopupZIndex = parseInt(secondPopup.$wrapper().css('zIndex'), 10);
          assert.strictEqual(firstPopupZIndex, baseZIndex + 2);
          assert.strictEqual(secondPopupZIndex, baseZIndex + 3);
        });
        QUnit.test('popup should not update z-index if it is already a biggest one', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            focusStateEnabled: true
          }).dxPopup('instance');
          var expectedZIndex = 1501;
          popup.focus();
          var ZIndex = parseInt(popup.$wrapper().css('zIndex'), 10);
          assert.strictEqual(ZIndex, expectedZIndex);
        });
        ['outlined', 'underlined', 'filled'].forEach(function(stylingMode) {
          QUnit.test(("popup content should not be scrollable with datebox in stylingMode: " + stylingMode + " (T1100188)"), function(assert) {
            var popupContent = $("<div id=\"scrollView\">\n                    <div id=\"dateBox\"></div>\n                </div>'");
            popupContent.appendTo($('#popup'));
            $('#popup').dxPopup({
              height: 'auto',
              visible: true
            });
            var scrollView = $('#scrollView').dxScrollView({
              scrollByContent: true,
              showScrollbar: 'always'
            }).dxScrollView('instance');
            $('#dateBox').dxDateBox({
              label: 'Hello',
              stylingMode: stylingMode,
              displayFormat: 'dd.MM.yyyy'
            });
            scrollView.scrollTo(100);
            assert.deepEqual(scrollView.scrollOffset(), {
              top: 0,
              left: 0
            }, 'scroll position does not changed');
          });
        });
        QUnit.module('Breaking change t1123711 - warning W1021', function() {
          QUnit.test('should be logged if container is invalid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#popup').dxPopup({
                container: 'invalid',
                visible: true
              });
              assert.ok(uiErrors.log.calledOnce, 'only one warning is logged');
              assert.deepEqual(uiErrors.log.lastCall.args, ['W1021', 'dxPopup'], 'args of the log method');
            } finally {
              uiErrors.log.restore();
            }
          });
          QUnit.test('should not not be logged if container is valid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#popup').dxPopup({
                container: 'body',
                visible: true
              });
              assert.ok(uiErrors.log.notCalled, 'no warning is logged');
            } finally {
              uiErrors.log.restore();
            }
          });
        });
      });
      QUnit.module('dimensions', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('content must not overlap bottom buttons', function(assert) {
          devices.current('desktop');
          var $popup = $('#popup').dxPopup({
            toolbarItems: [{shortcut: 'cancel'}, {shortcut: 'done'}, {shortcut: 'clear'}],
            showCloseButton: true,
            visible: true
          });
          var instance = $popup.dxPopup('instance');
          var $popupContent = instance.$content();
          var $popupBottom = $popupContent.parent().find('.dx-popup-bottom');
          assert.roughEqual($popupContent.offset().top + getOuterHeight($popupContent), $popupBottom.offset().top, 0.1, 'content doesn\'t overlap bottom buttons');
          devices.current(devices.real());
        });
        QUnit.test('dimensions should be shrunk correctly with height = auto specified', function(assert) {
          var $content = $('#popup').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            contentTemplate: function() {
              return $('<div>').width(200).height(200);
            }
          }).dxPopup('instance').$content();
          var popupContentHeight = getHeight($content);
          var addedContent = $('<div>').width(200).height(200);
          $content.append(addedContent);
          assert.equal(getHeight($content), popupContentHeight + getHeight(addedContent));
        });
        QUnit.test('dxPopup should render custom template with render function that returns dom node', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            integrationOptions: {templates: {'title': {render: function(args) {
                    var $element = $('<span>').addClass('dx-template-wrapper').text('text');
                    return $element.get(0);
                  }}}}
          }).dxPopup('instance');
          assert.equal(popup.$overlayContent().text(), 'text', 'container is correct');
        });
        QUnit.test('dimensions should be shrunk correctly with floating heights', function(assert) {
          var floatingTemplate = function() {
            var $result = $('<div>').width(20);
            $result.get(0).style.height = '20.2px';
            return $result;
          };
          var $content = $('<div>').appendTo('#qunit-fixture').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            minHeight: 10,
            animation: null,
            toolbarItems: [{toolbar: 'bottom'}],
            titleTemplate: floatingTemplate,
            contentTemplate: floatingTemplate,
            bottomTemplate: floatingTemplate
          }).dxPopup('instance').$content();
          var contentPaddings = getOuterHeight($content) - getHeight($content);
          var computedContentHeight = $content.get(0).getBoundingClientRect().height - contentPaddings;
          var realContentHeight = floatingTemplate().appendTo('#qunit-fixture').get(0).getBoundingClientRect().height;
          assert.ok(Math.abs(computedContentHeight - realContentHeight) < 0.02, computedContentHeight + ' ' + realContentHeight);
        });
        QUnit.test('content height change should be correctly handled', function(assert) {
          var instance = $('#popup').dxPopup({
            'height': 100,
            'visible': true
          }).dxPopup('instance');
          var $popupContent = instance.$content();
          var $overlayContent = $popupContent.parent();
          var $contentElement = $('<div>').height(50);
          $popupContent.append($contentElement);
          instance.option('height', 'auto');
          assert.notEqual(getHeight($overlayContent), 100, 'auto height option');
        });
        ['minWidth', 'maxWidth', 'minHeight', 'maxHeight'].forEach(function(option) {
          QUnit.test(("overlay content should have correct " + option + " attr"), function(assert) {
            var $__3;
            var instance = $('#popup').dxPopup(($__3 = {}, Object.defineProperty($__3, option, {
              value: 100,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxPopup('instance');
            var overlayContentElement = instance.$content().parent().get(0);
            assert.strictEqual(overlayContentElement.style[option], '100px', 'css attr value is correct');
          });
          QUnit.test(("overlay content " + option + " attr should be restored after fullScreen option set to true"), function(assert) {
            var $__3;
            var instance = $('#popup').dxPopup(($__3 = {}, Object.defineProperty($__3, option, {
              value: 100,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxPopup('instance');
            var overlayContentElement = instance.$content().parent().get(0);
            instance.option('fullScreen', true);
            assert.strictEqual(overlayContentElement.style[option], '', 'css attr value is restored');
          });
        });
        QUnit.test('minHeight should affect popup content height correctly', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            minHeight: 400,
            toolbarItems: [{
              text: 'text',
              toolbar: 'top',
              location: 'center'
            }, {
              text: 'text',
              toolbar: 'bottom',
              location: 'center'
            }],
            titleTemplate: function() {
              return $('<div>').width('100%').height(100);
            },
            bottomTemplate: function() {
              return $('<div>').width('100%').height(100);
            },
            contentTemplate: function() {
              return $('<div>').width(1000).height(0);
            }
          });
          var instance = $popup.dxPopup('instance');
          var $popupContent = instance.$content();
          var $overlayContent = $popupContent.parent();
          var $popupTitle = $overlayContent.find('.dx-popup-title');
          var $popupBottom = $overlayContent.find('.dx-popup-bottom');
          assert.equal(getOuterHeight($popupContent, true) + getOuterHeight($popupTitle, true) + getOuterHeight($popupBottom, true), getHeight($overlayContent));
        });
        QUnit.test('maxHeight should affect popup content height correctly', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            maxHeight: 400,
            toolbarItems: [{
              text: 'text',
              toolbar: 'top',
              location: 'center'
            }, {
              text: 'text',
              toolbar: 'bottom',
              location: 'center'
            }],
            titleTemplate: function() {
              return $('<div>').width('100%').height(100);
            },
            bottomTemplate: function() {
              return $('<div>').width('100%').height(100);
            },
            contentTemplate: function() {
              return $('<div>').width(1000).height(1000);
            }
          });
          var instance = $popup.dxPopup('instance');
          var $popupContent = instance.$content();
          var $overlayContent = $popupContent.parent();
          var $popupTitle = $overlayContent.find('.dx-popup-title');
          var $popupBottom = $overlayContent.find('.dx-popup-bottom');
          assert.equal(getOuterHeight($popupContent, true) + getOuterHeight($popupTitle, true) + getOuterHeight($popupBottom, true), getHeight($overlayContent));
        });
        QUnit.module('Popup should keep nested scroll position on geometry rerendering', {beforeEach: function() {
            var SCROLLABLE_CONTAINER_CLASS = 'test-scroll';
            this.instance = $('#popup').dxPopup({
              visible: true,
              resizeEnabled: true,
              width: 'auto',
              contentTemplate: function() {
                var $content = $('<div>').height(3000);
                var $wrapper = $('<div>');
                return $wrapper.addClass(SCROLLABLE_CONTAINER_CLASS).css({
                  height: '100%',
                  width: 50,
                  overflow: 'auto'
                }).append($content);
              }
            }).dxPopup('instance');
            this.$scrollableContainer = $(("." + SCROLLABLE_CONTAINER_CLASS));
            this.$scrollableContainer.scrollTop(300);
          }}, function() {
          QUnit.test('on window resize', function(assert) {
            assert.strictEqual(this.$scrollableContainer.scrollTop(), 300, 'scroll position is set');
            resizeCallbacks.fire();
            assert.strictEqual(this.$scrollableContainer.scrollTop(), 300, 'scroll position is not changed');
          });
          QUnit.test('on dimension option change', function(assert) {
            this.instance.option('width', 100);
            assert.strictEqual(this.$scrollableContainer.scrollTop(), 300, 'scroll position is not changed');
          });
          QUnit.test('on content dimension change', function(assert) {
            var $__2 = this;
            var showingObserved = assert.async();
            var contentResizingObserved = assert.async();
            setTimeout(function() {
              setWidth($__2.$scrollableContainer, 300);
              setTimeout(function() {
                assert.strictEqual($__2.$scrollableContainer.scrollTop(), 300, 'scroll position is not changed');
                contentResizingObserved();
              }, 100);
              showingObserved();
            });
          });
          QUnit.test('on resize', function(assert) {
            var $overlayContent = this.instance.$overlayContent();
            var $handle = $overlayContent.find('.dx-resizable-handle-right');
            var pointer = pointerMock($handle);
            pointer.start().dragStart().drag(100).dragEnd();
            assert.strictEqual(this.$scrollableContainer.scrollTop(), 300, 'scroll position is not changed');
          });
        });
        QUnit.module('popup should be repositioned correctly after change height', {beforeEach: function() {
            this.getCenterY = function(rect) {
              return (rect.bottom + rect.top) / 2;
            };
            this.popup = $('#popup').dxPopup({
              visible: true,
              height: 500,
              contentTemplate: function($container) {
                return $('<div>').height(100);
              }
            }).dxPopup('instance');
            this.contentElement = this.popup.$content().get(0);
            this.initialContentRect = this.contentElement.getBoundingClientRect();
          }}, function() {
          QUnit.test('from static to "auto"', function(assert) {
            this.popup.option('height', 'auto');
            var contentRect = this.contentElement.getBoundingClientRect();
            assert.roughEqual(this.getCenterY(contentRect), this.getCenterY(this.initialContentRect), 0.51, 'popup is repositioned correctly');
          });
          QUnit.test('from static to function which returns "auto"', function(assert) {
            this.popup.option('height', function() {
              return 'auto';
            });
            var contentRect = this.contentElement.getBoundingClientRect();
            assert.roughEqual(this.getCenterY(contentRect), this.getCenterY(this.initialContentRect), 0.51, 'popup is repositioned correctly');
          });
        });
      });
      QUnit.module('options changed callbacks', {
        beforeEach: function() {
          this.element = $('#popup').dxPopup();
          this.instance = this.element.dxPopup('instance');
          devices.current('desktop');
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          return new Promise(function(resolve) {
            return themes.initialized(resolve);
          });
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('width/height', function(assert) {
          var instance = this.instance;
          instance.show();
          var $overlayContent = instance.$content().parent();
          instance.option('width', 345);
          assert.equal(getOuterWidth($overlayContent), 345);
          instance.option('height', 567);
          assert.equal(getOuterHeight($overlayContent), 567);
        });
        QUnit.test('popup height can be changed according to the content if height = auto', function(assert) {
          var $content = $('<div>').attr('id', 'content');
          var minHeight = 100;
          var popup = $('#popup').dxPopup({
            visible: true,
            showTitle: true,
            title: 'Information',
            height: 'auto',
            contentTemplate: function() {
              return $content.append($('<div>').height(50));
            },
            maxHeight: 400,
            minHeight: minHeight
          }).dxPopup('instance');
          var $popup = popup.$content().parent(("." + OVERLAY_CONTENT_CLASS)).eq(0);
          var popupHeight = getHeight($popup);
          $('<div>').height(50).appendTo($content);
          assert.strictEqual(getHeight($popup), (popupHeight + 50), 'popup height has been changed');
          $('<div>').height(450).appendTo($content);
          assert.strictEqual(getOuterHeight($popup), 400, 'popup height has been changed, it is equal to the maxHeight');
          $content.empty();
          assert.strictEqual(getOuterHeight($popup), minHeight, 'popup height has been changed, it is equal to the minHeight');
          popup.option('autoResizeEnabled', false);
          $('<div>').height(450).appendTo($content);
          assert.strictEqual(getOuterHeight($popup), minHeight, 'popup height does not change if autoResizeEnabled = false');
          popup.option('autoResizeEnabled', true);
          assert.strictEqual(getOuterHeight($popup), 400, 'popup height has been changed after \'autoResizeEnabled\' change');
          popup.option('width', 'auto');
          $content.empty();
          assert.strictEqual(getOuterHeight($popup), minHeight, 'popup with auto width can change height');
        });
        QUnit.test('popup height should support top and bottom toolbars if height = auto', function(assert) {
          var $content = $('<div>').attr('id', 'content');
          var minHeight = 170;
          var maxHeight = 400;
          var popup = $('#popup').dxPopup({
            visible: true,
            height: 'auto',
            showTitle: true,
            title: 'Information',
            toolbarItems: [{shortcut: 'cancel'}],
            contentTemplate: function() {
              return $content;
            },
            maxHeight: maxHeight,
            minHeight: minHeight
          }).dxPopup('instance');
          var $popup = popup.$content().parent();
          var $popupContent = popup.$content();
          var topToolbarHeight = getOuterHeight($popup.find(("." + POPUP_TITLE_CLASS)).eq(0));
          var bottomToolbarHeight = getOuterHeight($popup.find(("." + POPUP_BOTTOM_CLASS)).eq(0));
          var popupContentPadding = getOuterHeight($popupContent) - getHeight($popupContent);
          var popupBordersHeight = parseInt($popup.css('borderTopWidth')) + parseInt($popup.css('borderBottomWidth'));
          var popupContentHeight = getOuterHeight($popupContent);
          assert.strictEqual(getOuterHeight($popup), minHeight, 'popup has max height');
          assert.strictEqual(popupContentHeight, minHeight - topToolbarHeight - bottomToolbarHeight - popupBordersHeight, 'popup has minimum content height');
          $('<div>').height(150).appendTo($content);
          popupContentHeight = getInnerHeight($popupContent);
          assert.strictEqual(popupContentHeight, 150 + popupContentPadding, 'popup has right height');
          $('<div>').height(300).appendTo($content);
          popupContentHeight = getInnerHeight($popupContent);
          assert.strictEqual(getOuterHeight($popup), maxHeight, 'popup has max height');
          assert.strictEqual(popupContentHeight, maxHeight - topToolbarHeight - bottomToolbarHeight - popupBordersHeight, 'popup has maximum content height');
        });
        QUnit.test('popup height should support any maxHeight and minHeight option values if height = auto', function(assert) {
          devices.current('desktop');
          var $content = $('<div>').attr('id', 'content');
          var popup = $('#popup').dxPopup({
            visible: true,
            height: 'auto',
            showTitle: true,
            title: 'Information',
            contentTemplate: function() {
              return $content;
            },
            maxHeight: '90%',
            minHeight: '50%'
          }).dxPopup('instance');
          var $popup = popup.$content().parent();
          var windowHeight = getInnerHeight($(window));
          var $popupContent = popup.$content();
          var topToolbarHeight = getOuterHeight($popup.find(("." + POPUP_TITLE_CLASS)).eq(0));
          var popupContentPadding = getOuterHeight($popupContent) - getHeight($popupContent);
          assert.roughEqual(getOuterHeight($popup), windowHeight * 0.5, 1, 'minimum popup height in percentages');
          $('<div>').height(windowHeight).appendTo($content);
          assert.roughEqual(getOuterHeight($popup), windowHeight * 0.9, 1, 'maximum popup height in percentages');
          popup.option('maxHeight', 'none');
          assert.roughEqual(getHeight($popup), windowHeight + popupContentPadding + topToolbarHeight, 1, 'popup maxHeight: none');
          $content.empty();
          popup.option('minHeight', 'auto');
          assert.strictEqual(getHeight($popup), getOuterHeight($popup.find(("." + POPUP_TITLE_CLASS))) + popupContentPadding, 'popup minHeight: auto');
          devices.current(devices.real());
        });
        QUnit.test('popup overlay should have correct height strategy classes for all browsers', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            height: 'auto',
            showTitle: false,
            contentTemplate: function() {
              return $('<div>');
            }
          }).dxPopup('instance');
          var $popup = popup.$content().parent();
          if (IS_OLD_SAFARI) {
            assert.notOk($popup.hasClass(POPUP_CONTENT_FLEX_HEIGHT_CLASS), 'has no POPUP_CONTENT_FLEX_HEIGHT_CLASS with fixed width for old safari');
            assert.ok($popup.hasClass(POPUP_CONTENT_INHERIT_HEIGHT_CLASS), 'has POPUP_CONTENT_INHERIT_HEIGHT_CLASS with fixed width for old safari');
          } else {
            assert.ok($popup.hasClass(POPUP_CONTENT_FLEX_HEIGHT_CLASS), 'has POPUP_CONTENT_FLEX_HEIGHT_CLASS with fixed width');
            assert.notOk($popup.hasClass(POPUP_CONTENT_INHERIT_HEIGHT_CLASS), 'has no POPUP_CONTENT_INHERIT_HEIGHT_CLASS with fixed width');
          }
          popup.option('width', 'auto');
          assert.ok($popup.hasClass(POPUP_CONTENT_INHERIT_HEIGHT_CLASS), 'has POPUP_CONTENT_INHERIT_HEIGHT_CLASS with auto width');
        });
        QUnit.test('popup height should support TreeView with Search if height = auto (T724029)', function(assert) {
          if (IS_OLD_SAFARI) {
            assert.expect(0);
            return;
          }
          var $content = $('<div class="dx-treeview"></div>').append($('<div>').css('height', '30px'), $('<div class="dx-scrollable"></div>').css('height', 'calc(100% - 30px)').append($('<div>').css('height', '100px')));
          $('#popup').dxPopup({
            visible: true,
            height: 'auto',
            showTitle: false,
            contentTemplate: function() {
              return $content;
            },
            maxHeight: 100
          });
          var treeviewContentHeight = 0;
          $content.children().each(function(_, item) {
            treeviewContentHeight += getHeight($(item));
          });
          assert.roughEqual(getHeight($content), treeviewContentHeight, 1, 'treeview content can not be heighter than container');
        });
        QUnit.test('Set right content height if window.innerHeight was changed only (T834502)', function(assert) {
          var instance = $('#popup').dxPopup({
            showTitle: true,
            title: 'Information',
            fullScreen: true,
            visible: true,
            contentTemplate: function() {
              return $('<div>').height(150);
            }
          }).dxPopup('instance');
          var $popup = instance.$content().parent();
          var $popupContent = instance.$content();
          var topToolbarHeight = getOuterHeight($popup.find(("." + POPUP_TITLE_CLASS)).eq(0)) || 0;
          var bottomToolbarHeight = getOuterHeight($popup.find(("." + POPUP_BOTTOM_CLASS)).eq(0)) || 0;
          var popupBordersHeight = parseInt($popup.css('borderTopWidth')) + parseInt($popup.css('borderBottomWidth'));
          try {
            sinon.stub(windowUtils, 'getWindow').returns({
              innerHeight: 100,
              innerWidth: 200
            });
            resizeCallbacks.fire();
            assert.roughEqual(getOuterHeight($popupContent) + topToolbarHeight + bottomToolbarHeight + popupBordersHeight, 100, 1);
          } finally {
            windowUtils.getWindow.restore();
          }
        });
        QUnit.test('fullScreen', function(assert) {
          this.instance.option({
            fullScreen: true,
            width: 345,
            height: 567,
            visible: true
          });
          var $overlayContent = this.instance.$content().parent();
          assert.equal(getOuterWidth($overlayContent), getOuterWidth($('#qunit-fixture')), 'wrapper has 100% width');
          assert.equal(getOuterHeight($overlayContent), getOuterHeight($('#qunit-fixture')), 'wrapper has 100% height');
          assert.ok($overlayContent.hasClass(POPUP_FULL_SCREEN_CLASS), 'fullscreen class added');
          assert.ok(!$overlayContent.hasClass(POPUP_NORMAL_CLASS), 'normal class is removed');
          this.instance.option('fullScreen', false);
          assert.equal(getOuterWidth($overlayContent), 345);
          assert.equal(getOuterHeight($overlayContent), 567);
          assert.ok(!$overlayContent.hasClass(POPUP_FULL_SCREEN_CLASS), 'fullscreen class deleted');
          assert.ok($overlayContent.hasClass(POPUP_NORMAL_CLASS), 'normal class is added');
        });
        QUnit.test('overlay wrapper should have correct size when fullScreen is enabled (T844343)', function(assert) {
          $('#container').css({
            width: 200,
            height: 200
          });
          $('#popup').dxPopup({
            fullScreen: true,
            visible: true,
            container: $('#container')
          });
          var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
          assert.equal(getOuterWidth($overlayWrapper), getInnerWidth($(window)), 'wrapper has correct width');
          assert.equal(getOuterHeight($overlayWrapper), getInnerHeight($(window)), 'wrapper has correct height');
        });
        QUnit.test('start scroll position is saved after full screen popup hiding', function(assert) {
          var $additionalElement;
          try {
            $additionalElement = $('<div>').height(2000).appendTo('body');
            this.instance.option({
              fullScreen: true,
              visible: false
            });
            window.scrollTo(0, 100);
            this.instance.show();
            this.instance.hide();
            assert.strictEqual(window.pageYOffset, 100);
          } finally {
            window.scrollTo(0, 0);
            $additionalElement.remove();
          }
        });
        QUnit.test('PopupContent doesn\'t disappear while fullScreen option changing', function(assert) {
          this.instance.option({
            fullScreen: false,
            width: 345,
            height: 567,
            visible: true
          });
          var popupContent = this.instance.$content();
          $('<iframe>').attr('src', 'about:blank').appendTo(popupContent);
          var iFrame = $('iframe').get(0);
          var iFrameDoc = iFrame.contentWindow.document;
          var element = document.createElement('div');
          if (iFrameDoc.body === null || iFrameDoc.body === undefined) {
            iFrameDoc.write('<body></body>');
          }
          var body = iFrameDoc.getElementsByTagName('body')[0];
          body.appendChild(element);
          this.instance.option('fullScreen', true);
          body = iFrameDoc.getElementsByTagName('body')[0];
          assert.equal(body.children.length, 1, 'Content doesn\'t disappear');
        });
        QUnit.test('fullScreen with disabled shading', function(assert) {
          this.instance.option({
            fullScreen: true,
            shading: false,
            width: 345,
            height: 567,
            visible: true
          });
          var wrapper = this.instance.$wrapper().get(0);
          assert.equal(parseInt(getComputedStyle(wrapper).width), getWidth($(window)), 'wrappers width specified');
          assert.equal(parseInt(getComputedStyle(wrapper).height), getHeight($(window)), 'wrappers height specified');
        });
        QUnit.test('title', function(assert) {
          this.instance.option('visible', 'true');
          this.instance.option('title', 'new title');
          assert.equal($(("." + POPUP_WRAPPER_CLASS), viewport()).text(), 'new title');
        });
        QUnit.test('showTitle option', function(assert) {
          this.instance.option({
            title: 'Title',
            showCloseButton: false,
            opened: true
          });
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          assert.ok(!!$title.length, 'show title by default');
          this.instance.option('showTitle', false);
          $title = $(("." + POPUP_TITLE_CLASS), viewport());
          assert.ok(!$title.length, 'hide title');
        });
        QUnit.test('title toolbar should not show with showCloseButton option', function(assert) {
          this.instance.option({
            showCloseButton: true,
            title: 'Test',
            showTitle: false
          });
          assert.ok(!$('.dx-popup-title').length, 'title is hidden');
        });
        $.each(['cancel', 'clear', 'done'], function(_, buttonType) {
          QUnit.test(buttonType + ' button rendering', function(assert) {
            this.instance.option('toolbarItems', [{shortcut: buttonType}]);
            this.instance.show();
            var $bottomBar = $(("." + POPUP_WRAPPER_CLASS), viewport()).find('.' + POPUP_BOTTOM_CLASS);
            var $button = $(("." + POPUP_WRAPPER_CLASS), viewport()).find('.dx-button.dx-popup-' + buttonType);
            assert.equal($bottomBar.length, 1, 'Bottom bar rendered');
            assert.ok($(("." + POPUP_WRAPPER_CLASS), viewport()).hasClass('dx-popup-' + buttonType + '-visible'), 'popup has according class');
            assert.ok($bottomBar.hasClass('dx-popup-' + buttonType), 'Bottom bar has class \'dx-popup-' + buttonType + '\'');
            assert.equal($button.length, 1, buttonType + ' button rendered');
          });
        });
        QUnit.test('buttons close button', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            showCloseButton: true
          });
          var instance = $popup.dxPopup('instance');
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          var $closeButton = $(("." + POPUP_TITLE_CLOSEBUTTON_CLASS), viewport());
          assert.equal($title.find('.dx-button').length, 1, 'title has close button');
          assert.equal($closeButton.length, 1, 'close button element');
          instance.option('toolbarItems', []);
          assert.equal($title.find('.dx-button').length, 0, 'close button is removed');
        });
        QUnit.test('close button options', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            showCloseButton: true
          });
          var $closeButton = $(("." + POPUP_TITLE_CLOSEBUTTON_CLASS), viewport());
          var $__4 = $closeButton.dxButton('instance').option(),
              stylingMode = $__4.stylingMode,
              icon = $__4.icon,
              onClick = $__4.onClick;
          assert.equal(stylingMode, 'text', 'close button has correct styling mode');
          assert.equal(icon, 'close', 'close button has correct icon');
          assert.ok(!!onClick, 'close button has onclick handler');
        });
        QUnit.test('showCloseButton option', function(assert) {
          var $popup = $('#popup').dxPopup({
            visible: true,
            toolbarItems: []
          });
          var instance = $popup.dxPopup('instance');
          var $closeButton = $('.' + POPUP_TITLE_CLOSEBUTTON_CLASS);
          assert.ok($closeButton.length, 'Need to show close button by default');
          instance.option('showCloseButton', true);
          $closeButton = $('.' + POPUP_TITLE_CLOSEBUTTON_CLASS);
          assert.ok($closeButton.length, 'Close button appears when we set option to the true through api');
          instance.option('toolbarItems', [{shortcut: 'close'}]);
          instance.option('showCloseButton', false);
          $closeButton = $('.' + POPUP_TITLE_CLOSEBUTTON_CLASS);
          assert.ok(!$closeButton.length, 'Close button is independent from the \'buttons\' option');
        });
        QUnit.test('hide popup when close button is clicked', function(assert) {
          this.instance.option('visible', 'true');
          this.instance.option('showCloseButton', true);
          var $closeButton = $(("." + POPUP_WRAPPER_CLASS), viewport()).find('.' + POPUP_TITLE_CLOSEBUTTON_CLASS);
          var isHideCalled = 0;
          this.instance.hide = function() {
            isHideCalled++;
          };
          $closeButton.triggerHandler('dxclick');
          assert.equal(isHideCalled, 1, 'hide is called');
        });
        $.each(['cancel', 'clear', 'done'], function(_, buttonType) {
          QUnit.test('fire specific action and hide popup' + buttonType + ' button is clicked', function(assert) {
            var buttonClickFired = 0;
            var popupHideFired = 0;
            this.instance.option('toolbarItems', [{
              shortcut: buttonType,
              onClick: function() {
                buttonClickFired++;
              }
            }]);
            this.instance.hide = function() {
              popupHideFired++;
            };
            this.instance.show();
            var $button = $(("." + POPUP_WRAPPER_CLASS), viewport()).find('.dx-button.dx-popup-' + buttonType);
            $button.trigger('dxclick');
            assert.equal(buttonClickFired, 1, 'button click action fired');
            assert.equal(popupHideFired, 1, 'popup is hidden');
          });
        });
        QUnit.test('buttons', function(assert) {
          this.instance.option('visible', true);
          var $container = this.instance.$content().parent();
          var $popupTitle = $container.find('.' + POPUP_TITLE_CLASS);
          var $popupBottom = $container.find('.' + POPUP_BOTTOM_CLASS);
          assert.ok(!$popupTitle.hasClass('.dx-toolbar'), 'top toolbar is not initialized when buttons is empty');
          assert.equal($popupBottom.length, 0, 'bottom toolbar is not rendered when buttons is empty');
          this.instance.option('toolbarItems', [{
            text: 'test 1 top',
            toolbar: 'top',
            location: 'before'
          }, {
            text: 'test 1 bottom',
            toolbar: 'bottom',
            location: 'before'
          }]);
          $popupTitle = $container.find('.' + POPUP_TITLE_CLASS);
          $popupBottom = $container.find('.' + POPUP_BOTTOM_CLASS);
          assert.ok($popupTitle.hasClass('dx-toolbar'), 'top toolbar is rendered after buttons option was set');
          assert.equal($popupTitle.text(), 'test 1 top', 'top toolbar value is correct');
          assert.ok($popupBottom.hasClass('dx-toolbar'), 'bottom toolbar is  rendered after buttons option was set');
          assert.equal($popupBottom.text(), 'test 1 bottom', 'bottom toolbar value is correct');
          this.instance.option('toolbarItems', [{
            widget: 'dxButton',
            options: {text: 'test 2 top'},
            toolbar: 'top',
            location: 'before'
          }, {
            widget: 'dxButton',
            options: {text: 'test 2 bottom'},
            toolbar: 'bottom',
            location: 'before'
          }]);
          $popupTitle = $container.find('.' + POPUP_TITLE_CLASS);
          $popupBottom = $container.find('.' + POPUP_BOTTOM_CLASS);
          assert.equal($popupTitle.text(), 'test 2 top', 'top toolbar value is correct after buttons option is changed');
          assert.equal($popupBottom.text(), 'test 2 bottom', 'bottom toolbar value is correct after buttons option is changed');
        });
        QUnit.test('buttons aliases change affects container classes', function(assert) {
          var popup = $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{shortcut: 'cancel'}]
          }).dxPopup('instance');
          var $popupBottom = this.instance.$content().parent().find('.' + POPUP_BOTTOM_CLASS);
          assert.ok($popupBottom.hasClass('dx-popup-cancel'), 'popup bottom has cancel class');
          popup.option('toolbarItems', [{shortcut: 'done'}]);
          $popupBottom = this.instance.$content().parent().find('.dx-popup-bottom');
          assert.ok($popupBottom.hasClass('dx-popup-done'), 'popup bottom has done class');
          assert.ok(!$popupBottom.hasClass('dx-popup-cancel'), 'popup bottom has not cancel class');
        });
        QUnit.test('empty item should not be rendered in top toolbar', function(assert) {
          $('#popup').dxPopup({
            visible: true,
            showTitle: true,
            showCloseButton: false
          });
          var $toolbarItems = $('.' + POPUP_TITLE_CLASS).find('.dx-item');
          assert.equal($toolbarItems.length, 0, 'no items are rendered inside top toolbar');
        });
        QUnit.test('toolbarItems option change should trigger resize event for content correct geometry rendering (T934380)', function(assert) {
          var resizeEventSpy = sinon.spy(visibilityChangeUtils, 'triggerResizeEvent');
          try {
            this.instance.option({
              visible: true,
              toolbarItems: [{
                widget: 'dxButton',
                options: {text: 'test 2 top'},
                toolbar: 'bottom',
                location: 'after'
              }]
            });
            assert.ok(resizeEventSpy.calledOnce, 'resize event is triggered after option change');
          } finally {
            resizeEventSpy.restore();
          }
        });
        QUnit.test('titleTemplate option change should trigger resize event for content correct geometry rendering', function(assert) {
          this.instance.option('visible', true);
          var resizeEventSpy = sinon.spy(visibilityChangeUtils, 'triggerResizeEvent');
          try {
            this.instance.option({titleTemplate: function() {
                return '';
              }});
            assert.ok(resizeEventSpy.calledOnce, 'resize event is triggered after option change');
          } finally {
            resizeEventSpy.restore();
          }
        });
        QUnit.test('bottomTemplate option change should trigger resize event for content correct geometry rendering', function(assert) {
          this.instance.option('visible', true);
          var resizeEventSpy = sinon.spy(visibilityChangeUtils, 'triggerResizeEvent');
          try {
            this.instance.option({bottomTemplate: function() {
                return '';
              }});
            assert.ok(resizeEventSpy.calledOnce, 'resize event is triggered after option change');
          } finally {
            resizeEventSpy.restore();
          }
        });
        QUnit.module('enableBodyScroll on desktop', {
          beforeEach: function() {
            var $__2 = this;
            fx.off = true;
            this.getBodyStyle = function(property) {
              return $__2.$body.get(0).style[property];
            };
            this.getBodyStyleAttr = function() {
              return $__2.$body.get(0).getAttribute('style');
            };
            this.$body = $('body');
            this.$body.get(0).removeAttribute('style');
            this.createPopup = function(options) {
              return $('#popup').dxPopup(options).dxPopup('instance');
            };
            this.$additionalElement = $('<div>').height(2000).appendTo(this.$body);
            this.scrollbarWidth = window.innerWidth - domAdapter.getDocument().documentElement.clientWidth;
          },
          afterEach: function() {
            this.instance.dispose();
            window.scrollTo(0, 0);
            this.$additionalElement.remove();
            fx.off = false;
          }
        }, function() {
          if (IS_IOS_DEVICE) {
            return;
          }
          QUnit.test('body should not have overflow styles after showing with enableBodyScroll is true', function(assert) {
            window.scrollTo(200, 200);
            this.createPopup({
              visible: true,
              enableBodyScroll: true
            });
            var $__4 = this.$body.get(0).style,
                overflow = $__4.overflow,
                paddingRight = $__4.paddingRight;
            assert.strictEqual(this.getBodyStyleAttr(), null, 'body style attribute');
            assert.strictEqual(overflow, '', 'body overflow style');
            assert.strictEqual(paddingRight, '', 'body padding right style');
          });
          QUnit.test('body should have overflow styles after showing and restore them after hidden, enableBodyScroll is false', function(assert) {
            window.scrollTo(200, 200);
            assert.strictEqual(this.getBodyStyleAttr(), null, 'body style attribute');
            var popup = this.createPopup({
              visible: true,
              enableBodyScroll: false
            });
            assert.strictEqual(this.getBodyStyleAttr(), this.scrollbarWidth ? ("padding-right: " + this.scrollbarWidth + "px; overflow: hidden;") : 'overflow: hidden;', 'body style attribute');
            assert.strictEqual(this.getBodyStyle('overflow'), 'hidden', 'body overflow style');
            assert.strictEqual(this.getBodyStyle('paddingRight'), this.scrollbarWidth ? (this.scrollbarWidth + "px") : '', 'body padding right style');
            popup.hide();
            assert.strictEqual(this.getBodyStyleAttr(), '', 'body style attribute');
            assert.strictEqual(this.getBodyStyle('overflow'), '', 'body overflow style');
            assert.strictEqual(this.getBodyStyle('paddingRight'), '', 'body padding right style');
          });
          ['overflow', 'overflowX', 'overflowY'].forEach(function(overflow) {
            QUnit.test(("body with " + overflow + " inline style should have overflow styles after showing and restore them after hidden, enableBodyScroll is false"), function(assert) {
              window.scrollTo(200, 200);
              var bodyPaddingValue = 10;
              var propertyInKebabCase = overflow.replace(/(X)|(Y)/, function(symbol) {
                return ("-" + symbol.toLowerCase());
              });
              $('body').get(0).style[overflow] = 'scroll';
              $('body').get(0).style.paddingRight = (bodyPaddingValue + "px");
              assert.strictEqual(this.getBodyStyleAttr(), (propertyInKebabCase + ": scroll; padding-right: " + bodyPaddingValue + "px;"), 'body style attribute');
              var popup = this.createPopup({
                visible: true,
                enableBodyScroll: false
              });
              assert.strictEqual(this.getBodyStyle('overflow'), 'hidden', 'body overflow style');
              assert.strictEqual(this.getBodyStyle('paddingRight'), ((this.scrollbarWidth + bodyPaddingValue) + "px"), 'body padding right style');
              popup.hide();
              if (overflow === 'overflow') {
                assert.strictEqual(this.getBodyStyleAttr(), (propertyInKebabCase + ": scroll; padding-right: " + bodyPaddingValue + "px;"), 'body style attribute');
              } else {
                assert.strictEqual(this.getBodyStyleAttr(), ("padding-right: " + bodyPaddingValue + "px; " + propertyInKebabCase + ": scroll;"), 'body style attribute');
              }
              assert.strictEqual(this.getBodyStyle(overflow), 'scroll', 'body overflow style');
              assert.strictEqual(this.getBodyStyle('paddingRight'), (bodyPaddingValue + "px"), 'body padding right style');
            });
          });
        });
        QUnit.module('enableBodyScroll on Ios devices', {
          beforeEach: function() {
            fx.off = true;
            this.originalDevice = {
              platform: devices.real().platform,
              deviceType: devices.real().deviceType
            };
            this.instance = $('#popup').dxPopup().dxPopup('instance');
            devices.real({
              platform: 'ios',
              deviceType: 'phone'
            });
            this.$body = $('body');
            this.$body.get(0).style.overflow = 'auto';
            this.$additionalElement = $('<div>').height(2000).appendTo(this.$body);
          },
          afterEach: function() {
            this.instance.dispose();
            devices.real(this.originalDevice);
            window.scrollTo(0, 0);
            this.$additionalElement.remove();
            fx.off = false;
          }
        }, function() {
          QUnit.test('body should not have PREVENT_SAFARI_SCROLLING_CLASS if container is window and shading is enabled on popup init, enableBodyScroll: false', function(assert) {
            this.instance.dispose();
            $('#popup').dxPopup({
              visible: true,
              enableBodyScroll: false
            });
            assert.strictEqual(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), false);
          });
          QUnit.test('body should have position fixed after showing if enableBodyScroll: false', function(assert) {
            this.instance.dispose();
            window.scrollTo(0, 200);
            var popup = $('#popup').dxPopup({
              visible: true,
              enableBodyScroll: false
            }).dxPopup('instance');
            assert.strictEqual(this.$body.get(0).style.position, 'fixed');
            assert.strictEqual(this.$body.get(0).style.top, '-200px');
            assert.strictEqual(this.$body.get(0).style.left, '0px');
            popup.hide();
            assert.strictEqual(this.$body.get(0).style.position, '');
            assert.strictEqual(this.$body.get(0).style.top, '');
            assert.strictEqual(this.$body.get(0).style.left, '');
          });
          QUnit.test('body should change the fixed position after change of enableBodyScroll option in runtime', function(assert) {
            this.instance.dispose();
            window.scrollTo(0, 200);
            var popup = $('#popup').dxPopup({
              visible: true,
              shading: false
            }).dxPopup('instance');
            assert.strictEqual(this.$body.get(0).style.position, '');
            assert.strictEqual(this.$body.get(0).style.top, '');
            assert.strictEqual(this.$body.get(0).style.left, '');
            popup.option('enableBodyScroll', false);
            assert.strictEqual(this.$body.get(0).style.position, 'fixed');
            assert.strictEqual(this.$body.get(0).style.top, '-200px');
            assert.strictEqual(this.$body.get(0).style.left, '0px');
            popup.option('enableBodyScroll', true);
            assert.strictEqual(this.$body.get(0).style.position, '');
            assert.strictEqual(this.$body.get(0).style.top, '');
            assert.strictEqual(this.$body.get(0).style.left, '');
          });
        });
        QUnit.module('prevent safari scrolling on ios devices', {
          beforeEach: function() {
            this.originalDevice = {
              platform: devices.real().platform,
              deviceType: devices.real().deviceType
            };
            devices.real({
              platform: 'ios',
              deviceType: 'phone'
            });
            this.$body = $('body');
            this.$additionalElement = $('<div>').height(2000).appendTo(this.$body);
          },
          afterEach: function() {
            this.instance.dispose();
            devices.real(this.originalDevice);
            window.scrollTo(0, 0);
            this.$additionalElement.remove();
          }
        }, function() {
          QUnit.test('body should have PREVENT_SAFARI_SCROLLING_CLASS for is popup is in fullScreen mode on init', function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.dispose();
            $('#popup').dxPopup({
              fullScreen: true,
              visible: true,
              shading: false
            });
            assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS));
          });
          QUnit.test('body should have PREVENT_SAFARI_SCROLLING_CLASS for fullScreen popup in safari (T714801)', function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.option({
              fullScreen: true,
              visible: true,
              shading: false
            });
            assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS));
          });
          QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be toggled on "fullScreen" option change', function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.option({
              shading: false,
              visible: true
            });
            this.instance.option('fullScreen', true);
            assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is added when "fullScreen" is enabled');
            this.instance.option('fullScreen', false);
            assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed when "fullScreen" is disabled');
          });
          QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be added to the body if fullScreen option is set to "true" on showing event in safari (T825004)', function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.option({
              shading: false,
              onShowing: function(e) {
                e.component.option('fullScreen', true);
              }
            });
            var $wrapper = this.instance.$wrapper();
            window.scrollTo(0, 200);
            this.instance.show();
            assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS));
            assert.strictEqual($wrapper.css('transform').split(',')[5], ' 0)', 'popup has translateY: 0');
          });
          QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be removed from body if fullScreen option is set to "false" on showing event in safari (T825004)', function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.option({
              fullScreen: true,
              shading: false,
              onShowing: function(e) {
                e.component.option('fullScreen', false);
              }
            });
            window.scrollTo(0, 200);
            this.instance.show();
            assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed from body on fullScreen disable');
            assert.strictEqual(window.pageYOffset, 200, 'scroll position is correct');
          });
        });
      });
      QUnit.module('drag', {beforeEach: function() {
          var $__2 = this;
          var initialOptions = {
            animation: null,
            dragEnabled: true,
            visible: true
          };
          this.init = function(options) {
            $__2.element = $('#popup');
            $__2.popup = $__2.element.dxPopup($.extend({}, initialOptions, options)).dxPopup('instance');
            $__2.$overlayContent = $__2.popup.$content().parent();
            $__2.$title = $__2.popup.topToolbar();
          };
          this.reinit = function(options) {
            $__2.popup.dispose();
            $__2.init(options);
          };
          this.init();
        }}, function() {
        QUnit.test('class should be added if drag is enabled', function(assert) {
          assert.ok(this.$overlayContent.hasClass(POPUP_DRAGGABLE_CLASS), 'class was added');
          this.popup.option('dragEnabled', false);
          assert.ok(!this.$overlayContent.hasClass(POPUP_DRAGGABLE_CLASS), 'class was added');
        });
        QUnit.test('popup should be dragged by title', function(assert) {
          var pointer = pointerMock(this.$title);
          var position = this.$overlayContent.position();
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.deepEqual(this.$overlayContent.position(), {
            top: position.top + 50,
            left: position.left + 50
          }, 'popup was moved');
        });
        QUnit.test('popup shouldn\'t be dragged by content', function(assert) {
          var pointer = pointerMock(this.popup.$content());
          var position = this.$overlayContent.position();
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.deepEqual(this.$overlayContent.position(), {
            top: position.top,
            left: position.left
          }, 'popup was not moved');
        });
        QUnit.test('popup should be dragged if title was changed', function(assert) {
          var position = this.$overlayContent.position();
          this.popup.option('title', 'newTitle');
          var $title = this.popup.topToolbar();
          var pointer = pointerMock($title);
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.deepEqual(this.$overlayContent.position(), {
            top: position.top + 50,
            left: position.left + 50
          }, 'popup was moved');
        });
        QUnit.test('overlay should not be dragged if dragEnabled is false', function(assert) {
          this.reinit({dragEnabled: false});
          var pointer = pointerMock(this.$title);
          var position = this.$overlayContent.position();
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.deepEqual(this.$overlayContent.position(), {
            top: position.top,
            left: position.left
          }, 'popup was not moved');
        });
        QUnit.test('popup should not be dragged if dragEnabled is changed dynamically', function(assert) {
          var pointer = pointerMock(this.$title);
          var position = this.$overlayContent.position();
          this.popup.option('dragEnabled', false);
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.deepEqual(this.$overlayContent.position(), {
            top: position.top,
            left: position.left
          }, 'popup was not moved');
        });
        QUnit.test('dragged popup should save position after dimensions change', function(assert) {
          this.reinit({
            width: 1,
            height: 1,
            position: {of: viewPort()}
          });
          var pointer = pointerMock(this.$title);
          pointer.start().dragStart().drag(-10).dragEnd();
          var prevPosition = this.$overlayContent.position().left;
          resizeCallbacks.fire();
          assert.strictEqual(this.$overlayContent.position().left, prevPosition, 'correct position after first move');
          pointer.start().dragStart().drag(-10).dragEnd();
          prevPosition = this.$overlayContent.position().left;
          resizeCallbacks.fire();
          assert.strictEqual(this.$overlayContent.position().left, prevPosition, 'correct position after next move');
        });
        QUnit.test('popup should not be dragged out of target', function(assert) {
          this.reinit({
            width: 2,
            height: 2,
            position: {of: viewPort()},
            visualContainer: viewport()
          });
          var $container = viewPort();
          var pointer = pointerMock(this.$title);
          $container.css({padding: '10px'});
          var viewWidth = getOuterWidth($container);
          var viewHeight = getOuterHeight($container);
          var position = this.$overlayContent.position();
          var startEvent = pointer.start().dragStart().lastEvent();
          $container.css({padding: 0});
          assert.strictEqual(position.left - startEvent.maxLeftOffset, 0, 'popup should not be dragged left of target');
          assert.strictEqual(position.left + startEvent.maxRightOffset, viewWidth - getOuterWidth(this.$overlayContent), 'popup should not be dragged right of target');
          assert.strictEqual(position.top - startEvent.maxTopOffset, 0, 'popup should not be dragged above the target');
          assert.strictEqual(position.top + startEvent.maxBottomOffset, viewHeight - getOuterHeight(this.$overlayContent), 'popup should not be dragged below than target');
        });
        QUnit.test('popup can be dragged out of target if viewport and container is not specified', function(assert) {
          try {
            viewPort(null);
            this.reinit({
              width: 2,
              height: 2
            });
            var pointer = pointerMock(this.$title);
            viewPort().attr('style', 'width: 100px; height: 100px');
            var $container = $(window);
            var viewWidth = Math.max(document.body.clientWidth, getOuterWidth($container));
            var viewHeight = Math.max(document.body.clientHeight, getOuterHeight($container));
            var position = this.$overlayContent.position();
            var startEvent = pointer.start().dragStart().lastEvent();
            assert.strictEqual(position.left + startEvent.maxRightOffset, viewWidth - getOuterWidth(this.$overlayContent), 'popup should not be dragged right of target');
            assert.strictEqual(position.top + startEvent.maxBottomOffset, viewHeight - getOuterHeight(this.$overlayContent), 'popup should not be dragged below than target');
          } finally {
            viewPort().removeAttr('style');
            viewPort(toSelector(VIEWPORT_CLASS));
          }
        });
        QUnit.test('popup should not be dragged when container size less than overlay content', function(assert) {
          var $container = $('<div>').appendTo('#qunit-fixture').height(0).width(20);
          this.reinit({
            height: 10,
            width: 10,
            container: $container
          });
          var pointer = pointerMock(this.$title);
          var startEvent = pointer.start().dragStart().lastEvent();
          assert.strictEqual(startEvent.maxTopOffset, 0, 'popup should not be dragged vertically');
          assert.strictEqual(startEvent.maxBottomOffset, 0, 'popup should not be dragged vertically');
          assert.strictEqual(startEvent.maxLeftOffset, 0, 'popup should not be dragged horizontally');
          assert.strictEqual(startEvent.maxRightOffset, 0, 'popup should not be dragged horizontally');
        });
        QUnit.test('popup can be dragged when container size less than overlay content and outsideDragFactor is enabled', function(assert) {
          var $container = $('<div>').appendTo('#qunit-fixture').height(10).width(10);
          this.reinit({
            height: 10,
            width: 10,
            container: $container,
            position: {of: $container},
            outsideDragFactor: 1
          });
          var pointer = pointerMock(this.$title);
          var startEvent = pointer.start().dragStart().lastEvent();
          assert.strictEqual(startEvent.maxTopOffset, 10, 'popup can dragged vertically');
          assert.strictEqual(startEvent.maxBottomOffset, 10, 'popup can be dragged vertically');
          assert.strictEqual(startEvent.maxLeftOffset, 10, 'popup can be dragged horizontally');
          assert.strictEqual(startEvent.maxRightOffset, 10, 'popup can be dragged horizontally');
        });
        QUnit.test('popup should be dragged correctly when position.of and shading (T534551)', function(assert) {
          var $container = $('<div>').appendTo('#qunit-fixture').height(0).width(200);
          $container.css('margin-left', '200px');
          $container.css('margin-top', '200px');
          this.reinit({
            shading: true,
            height: 20,
            width: 20,
            position: {of: $container},
            visualContainer: $container
          });
          var overlayPosition = this.$overlayContent.position();
          var containerPosition = $container.position();
          var viewWidth = getOuterWidth(viewport());
          var viewHeight = getOuterHeight(viewport());
          var pointer = pointerMock(this.$title);
          var startEvent = pointer.start().dragStart().lastEvent();
          assert.strictEqual(startEvent.maxRightOffset, viewWidth - getOuterWidth(this.$overlayContent) - overlayPosition.left - 200, 'popup should be dragged right');
          assert.strictEqual(startEvent.maxLeftOffset, 200 + overlayPosition.left, 'popup should be dragged left');
          assert.roughEqual(startEvent.maxTopOffset, 200 + overlayPosition.top + containerPosition.top, 1, 'popup should be dragged top');
          assert.roughEqual(startEvent.maxBottomOffset, viewHeight - getOuterHeight(this.$overlayContent) - containerPosition.top - overlayPosition.top - 200, 1, 'popup should be dragged bottom');
        });
        QUnit.test('popup changes position after dragging', function(assert) {
          this.reinit({
            position: {
              my: 'top',
              at: 'top',
              of: viewport(),
              offset: '0 0'
            },
            visualContainer: viewport()
          });
          var pointer = pointerMock(this.$title);
          pointer.start().dragStart().drag(50, 50).dragEnd();
          assert.strictEqual(this.$overlayContent.position().top, 50, 'overlay positioned correctly after dragging');
          this.popup.option('position.offset', '0 20');
          assert.strictEqual(this.$overlayContent.position().top, 20, 'overlay positioned correctly after change the \'position\' option');
        });
        QUnit.test('popup should reposition after dragging if position is outside of drag area', function(assert) {
          var startOverlayPosition = this.$overlayContent.position().left;
          var pointer = pointerMock(this.$title);
          pointer.start().down().move(10, 10).move(-10, -10).up();
          var newOverlayPosition = this.$overlayContent.position().left;
          assert.notStrictEqual(startOverlayPosition, newOverlayPosition, 'overlay repositioned after dragging');
          assert.ok(newOverlayPosition < -9000, 'overlay now is positioned in viewport');
        });
        QUnit.test('dragged popup should have default dimensions after toggle visibility', function(assert) {
          this.reinit({
            width: 'auto',
            height: 'auto'
          });
          var pointer = pointerMock(this.$title);
          pointer.start().dragStart().drag(-10).dragEnd();
          this.popup.hide();
          this.popup.show();
          assert.deepEqual([this.$overlayContent[0].style.width, this.$overlayContent[0].style.height], ['auto', 'auto'], 'correct size');
        });
      });
      QUnit.module('resize', {beforeEach: function() {
          var $__2 = this;
          var initialOptions = {
            animation: null,
            resizeEnabled: true,
            visible: true,
            width: 200,
            height: 200
          };
          this.init = function(options) {
            $__2.element = $('#popup');
            $__2.popup = $__2.element.dxPopup($.extend({}, initialOptions, options)).dxPopup('instance');
            $__2.$overlayContent = $__2.popup.$content().parent();
            $__2.$handle = $__2.$overlayContent.find(toSelector(POPUP_BOTTOM_RIGHT_RESIZE_HANDLE_CLASS));
          };
          this.reinit = function(options) {
            $__2.popup && $__2.popup.dispose();
            $__2.init(options);
          };
          this.init();
        }}, function() {
        QUnit.test('popup should have resizable component on overlay content', function(assert) {
          assert.strictEqual(this.$overlayContent.dxResizable('option', 'handles'), 'all', 'direction specified correctly');
        });
        QUnit.test('popup shouldn\'t have resizable component on overlay content if resizeEnabled is false', function(assert) {
          this.reinit({resizeEnabled: false});
          assert.strictEqual(this.$overlayContent.dxResizable('option', 'handles'), 'none', 'direction specified correctly');
        });
        QUnit.test('popup shouldn\'t have resizable component on overlay content if resizeEnabled is changed dynamically', function(assert) {
          this.popup.option('resizeEnabled', false);
          assert.strictEqual(this.$overlayContent.dxResizable('option', 'handles'), 'none', 'direction specified correctly');
        });
        QUnit.test('resized popup should save dimensions after dimensions change', function(assert) {
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(10, 10).dragEnd();
          assert.deepEqual([this.popup.option('width'), this.popup.option('height')], [210, 210], 'correct size');
          pointer.start().dragStart().drag(-20, -20).dragEnd();
          assert.deepEqual([this.popup.option('width'), this.popup.option('height')], [190, 190], 'correct size');
        });
        QUnit.test('resized popup should not save dimensions after height changed', function(assert) {
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(10, 10).dragEnd();
          this.popup.option('width', 300);
          assert.deepEqual([this.popup.option('width'), this.popup.option('height')], [300, 210], 'correct size');
        });
        QUnit.test('resized popup should save dimension for the side which was not resized', function(assert) {
          this.reinit({height: '70%'});
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(10, 0).dragEnd();
          assert.deepEqual([this.popup.option('width'), this.popup.option('height')], [210, '70%'], 'correct size');
        });
        QUnit.test('resized popup should not have default dimensions after toggle visibility', function(assert) {
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(50, 50).dragEnd();
          this.popup.hide();
          this.popup.show();
          assert.deepEqual([this.popup.option('width'), this.popup.option('height')], [250, 250], 'correct size');
        });
        QUnit.test('resize callbacks', function(assert) {
          var onResizeStartFired = sinon.stub();
          var onResizeFired = sinon.stub();
          var onResizeEndFired = sinon.stub();
          var checkExtraFields = function(args, eventType) {
            ['event', 'height', 'width'].forEach(function(field) {
              assert.ok(field in args, (field + " field is existed"));
            });
            assert.strictEqual(args.event.type, eventType, 'correct event type');
          };
          this.reinit({
            onResizeStart: onResizeStartFired,
            onResize: onResizeFired,
            onResizeEnd: onResizeEndFired
          });
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(0, 50).dragEnd();
          assert.strictEqual(onResizeStartFired.callCount, 1, 'onResizeStart fired');
          assert.strictEqual(onResizeStartFired.getCall(0).args.length, 1, 'event is passed');
          checkExtraFields(onResizeStartFired.lastCall.args[0], 'dxdragstart');
          assert.strictEqual(onResizeFired.callCount, 1, 'onResize fired');
          assert.strictEqual(onResizeFired.getCall(0).args.length, 1, 'event is passed');
          checkExtraFields(onResizeFired.lastCall.args[0], 'dxdrag');
          assert.strictEqual(onResizeEndFired.callCount, 1, 'onResizeEnd fired');
          assert.strictEqual(onResizeEndFired.getCall(0).args.length, 1, 'event is passed');
          checkExtraFields(onResizeEndFired.lastCall.args[0], 'dxdragend');
        });
        QUnit.test('resize event handlers should correctly added via "on" method', function(assert) {
          var onResizeStartStub = sinon.stub();
          var onResizeStub = sinon.stub();
          var onResizeEndStub = sinon.stub();
          this.popup.on('resize', onResizeStub);
          this.popup.on('resizeStart', onResizeStartStub);
          this.popup.on('resizeEnd', onResizeEndStub);
          this.popup.show();
          var pointer = pointerMock(this.$handle);
          pointer.start().dragStart().drag(0, 50).dragEnd();
          assert.ok(onResizeStartStub.calledOnce, 'onResizeStart fired');
          assert.ok(onResizeStub.calledOnce, 'onResize fired');
          assert.ok(onResizeEndStub.calledOnce, 'onResizeEnd fired');
        });
        QUnit.test('popup should have correct resizable area if viewport and container is not specified', function(assert) {
          try {
            viewPort(null);
            this.reinit({
              width: 2,
              height: 2
            });
            var resizable = this.$overlayContent.dxResizable('instance');
            assert.ok($.isWindow(resizable.option('area').get(0)), 'window is the area of the resizable');
          } finally {
            viewPort(toSelector(VIEWPORT_CLASS));
          }
        });
        QUnit.module('popup should set resize area', {beforeEach: function() {
            var $__2 = this;
            this.$container = $('#container');
            this.initialOptions = {
              resizeEnabled: true,
              visible: true
            };
            this.reinit = function(options) {
              $__2.init(options);
              $__2.getResizableArea = function() {
                return $__2.popup._resizable.option('area');
              };
            };
            this.reinit({});
          }}, function() {
          QUnit.test('after dragAndResizeArea option set on init', function(assert) {
            this.reinit({dragAndResizeArea: this.$container});
            assert.strictEqual(this.getResizableArea().get(0), this.$container.get(0), 'resize container was configured');
          });
          QUnit.test('after container option set on init', function(assert) {
            this.reinit({container: this.$container});
            assert.strictEqual(this.getResizableArea().get(0), this.$container.get(0), 'resize container was configured');
          });
          QUnit.test('after dragAndResizeArea option runtime change', function(assert) {
            this.popup.option('dragAndResizeArea', this.$container);
            assert.equal(this.getResizableArea().get(0), this.$container.get(0), 'resize container was changed');
          });
          QUnit.test('after container option runtime change', function(assert) {
            this.popup.option('container', this.$container);
            assert.strictEqual(this.getResizableArea().get(0), this.$container.get(0), 'resize container was changed');
          });
        });
        QUnit.module('resizeObserver integration', {beforeEach: function() {
            this.timeToWaitResize = 50;
          }}, function() {
          QUnit.testInActiveWindow('overlay content dimensions should be updated during resize', function(assert) {
            var $__2 = this;
            var resizeOnOpeningDone = assert.async();
            var resizeOnDraggingDone = assert.async();
            var pointer = pointerMock(this.$handle);
            setTimeout(function() {
              pointer.start().dragStart().drag(10);
              setTimeout(function() {
                assert.strictEqual(getWidth($__2.$overlayContent), 208, 'width was changed before pointerdown');
                resizeOnDraggingDone();
              }, $__2.timeToWaitResize);
              resizeOnOpeningDone();
            }, this.timeToWaitResize);
          });
        });
      });
      QUnit.module('keyboard navigation', {beforeEach: function() {
          var $__2 = this;
          var initialOptions = {
            animation: null,
            focusStateEnabled: true,
            dragEnabled: true,
            visible: true,
            width: 1,
            height: 1,
            position: {of: viewPort()},
            visualContainer: viewPort()
          };
          this.init = function(options) {
            $__2.element = $('#popup');
            $__2.popup = $__2.element.dxPopup($.extend({}, initialOptions, options)).dxPopup('instance');
            $__2.$overlayContent = $__2.popup.$content().parent();
            $__2.position = $__2.$overlayContent.position();
            $__2.keyboard = keyboardMock($__2.$overlayContent);
          };
        }}, function() {
        QUnit.test('arrows handling', function(assert) {
          this.init();
          var offset = 5;
          this.keyboard.keyDown('left');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left - offset, 'popup position was change after pressing left arrow');
          this.position = this.$overlayContent.position();
          this.keyboard.keyDown('down');
          assert.strictEqual(this.$overlayContent.position().top, this.position.top + offset, 'popup position was change after pressing down arrow');
          this.position = this.$overlayContent.position();
          this.keyboard.keyDown('right');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left + offset, 'popup position was change after pressing right arrow');
          this.position = this.$overlayContent.position();
          this.keyboard.keyDown('up');
          assert.strictEqual(this.$overlayContent.position().top, this.position.top - offset, 'popup position was change after pressing up arrow');
        });
        QUnit.test('popup should not be dragged when container size is less than overlay content size', function(assert) {
          var $container = $('<div>').appendTo('#qunit-fixture').height(14).width(14);
          this.init({
            height: 10,
            width: 10,
            container: $container,
            position: {
              my: 'center center',
              at: 'center center',
              of: $container
            },
            visualContainer: $container
          });
          var $overlayContent = this.$overlayContent;
          var keyboard = keyboardMock($overlayContent);
          keyboard.keyDown('left');
          assert.strictEqual($overlayContent.position().left, 0, 'popup should not be dragged left of target');
          keyboard.keyDown('right');
          assert.strictEqual($overlayContent.position().left, getWidth($container) - getOuterWidth($overlayContent), 'popup should not be dragged right of target');
          keyboard.keyDown('up');
          assert.strictEqual($overlayContent.position().top, 0, 'popup should not be dragged above the target');
          keyboard.keyDown('down');
          assert.strictEqual($overlayContent.position().top, getHeight($container) - getOuterHeight($overlayContent), 'popup should not be dragged below than target');
        });
        QUnit.test('arrows handling for rtl', function(assert) {
          this.init({rtlEnabled: true});
          var offset = 5;
          this.keyboard.keyDown('left');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left - offset, 'popup position was change after pressing left arrow');
          this.position = this.$overlayContent.position();
          this.keyboard.keyDown('right');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left + offset, 'popup position was change after pressing right arrow');
        });
        QUnit.test('arrows handling with dragEnabled = false', function(assert) {
          this.init({dragEnabled: false});
          this.keyboard.keyDown('left');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left, 'popup position was not changed after pressing left arrow');
          this.keyboard.keyDown('down');
          assert.strictEqual(this.$overlayContent.position().top, this.position.top, 'popup position was not changed after pressing down arrow');
          this.keyboard.keyDown('right');
          assert.strictEqual(this.$overlayContent.position().left, this.position.left, 'popup position was not changed after pressing right arrow');
          assert.strictEqual(this.$overlayContent.position().top, this.position.top, 'popup position was not changed after pressing up arrow');
        });
        QUnit.test('arrows handling should not throw an error', function(assert) {
          this.init({
            dragEnabled: false,
            title: null,
            showTitle: false
          });
          var isOk = true;
          try {
            this.keyboard.keyDown('left');
            this.keyboard.keyDown('right');
            this.keyboard.keyDown('up');
            this.keyboard.keyDown('down');
          } catch (e) {
            isOk = false;
          }
          assert.ok(isOk, 'arrows handling should not throw an error');
        });
      });
      QUnit.module('rendering', {beforeEach: function() {
          this.element = $('#popup').dxPopup();
          this.instance = this.element.dxPopup('instance');
          devices.current('desktop');
          return new Promise(function(resolve) {
            return themes.initialized(resolve);
          });
        }}, function() {
        QUnit.test('anonymous content template rendering', function(assert) {
          var $inner = $('#popupWithAnonymousTmpl .testContent');
          var $popup = $('#popupWithAnonymousTmpl').dxPopup({visible: true});
          var $content = $popup.dxPopup('$content');
          assert.equal($.trim($content.text()), 'TestContent', 'content rendered');
          assert.equal($content.find('.testContent').get(0), $inner[0], 'content should not lost the link');
        });
        QUnit.test('custom content template is applied even if there is \'content\' template in popup', function(assert) {
          var $popup = $('#popupWithCustomAndContentTemplate').dxPopup({
            contentTemplate: 'custom',
            visible: true
          });
          var $content = $popup.dxPopup('$content');
          assert.equal($.trim($content.text()), 'TestContent', 'content is correct');
        });
        QUnit.test('title toolbar with buttons when \'showTitle\' is false', function(assert) {
          this.instance.option({
            showTitle: false,
            title: 'Hidden title',
            toolbarItems: [{
              shortcut: 'done',
              toolbar: 'top',
              location: 'after'
            }],
            showCloseButton: false,
            opened: true
          });
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          assert.equal($title.length, 1, 'title toolbar is rendered');
          assert.equal($title.find('.dx-toolbar-button').length, 1, 'button is rendered in title toolbar');
          assert.equal($title.find('.dx-toolbar-label').length, 0, 'toolbar has no text');
        });
        QUnit.test('container argument of toolbarItems.template option is correct', function(assert) {
          this.instance.option({toolbarItems: [{template: function(e, index, container) {
                assert.equal(isRenderer(container), !!config().useJQuery, 'container is correct');
              }}]});
        });
        QUnit.test('dx-popup-fullscreen-width class should be attached when width is equal to screen width', function(assert) {
          this.instance.option('width', function() {
            return getWidth($(window));
          });
          this.instance.show();
          assert.ok(this.instance.$overlayContent().hasClass('dx-popup-fullscreen-width'), 'fullscreen width class is attached');
          this.instance.option('width', function() {
            return getWidth($(window)) - 1;
          });
          assert.ok(!this.instance.$overlayContent().hasClass('dx-popup-fullscreen-width'), 'fullscreen width class is detached');
        });
        QUnit.test('popup with toolbar should have compactMode option for the bottom toolbar', function(assert) {
          var popup = $('#popup').dxPopup({toolbarItems: [{
              shortcut: 'done',
              toolbar: 'bottom',
              location: 'after'
            }]}).dxPopup('instance');
          popup.show();
          assert.ok($('.' + POPUP_BOTTOM_CLASS).dxToolbar('instance').option('compactMode'), 'bottom toolbar has the compact option');
        });
        QUnit.test('dx-popup-content-scrollable class should be attached when preventScrollEvents is used', function(assert) {
          this.instance.show();
          var $popupContent = this.instance.$content();
          assert.strictEqual($popupContent.hasClass(POPUP_CONTENT_SCROLLABLE_CLASS), true, 'scrollable class is attached');
          this.instance.option('preventScrollEvents', true);
          assert.strictEqual($popupContent.hasClass(POPUP_CONTENT_SCROLLABLE_CLASS), false, 'scrollable class is detached');
          this.instance.option('preventScrollEvents', false);
          assert.strictEqual($popupContent.hasClass(POPUP_CONTENT_SCROLLABLE_CLASS), true, 'scrollable class is attached');
        });
      });
      QUnit.module('templates', function() {
        QUnit.test('titleTemplate test', function(assert) {
          assert.expect(6);
          var $element = $('#popup').dxPopup({
            visible: true,
            titleTemplate: function(titleElement) {
              var result = '<div class=\'test-title-renderer\'>';
              result += '<h1>Title</h1>';
              result += '</div>';
              assert.equal(isRenderer(titleElement), !!config().useJQuery, 'titleElement is correct');
              return result;
            }
          });
          var instance = $element.dxPopup('instance');
          var $popupContent = instance.$content().parent();
          assert.equal($popupContent.find(("." + 'test-title-renderer')).length, 1, 'option \'titleTemplate\'  was set successfully');
          instance.option('onTitleRendered', function(e) {
            assert.equal(e.element, e.component.element(), 'element is correct');
            assert.ok(true, 'option \'onTitleRendered\' successfully passed to the popup widget raised on titleTemplate');
          });
          instance.option('titleTemplate', function(titleElement) {
            assert.equal($(titleElement).get(0), $popupContent.find('.' + POPUP_TITLE_CLASS).get(0));
            var result = '<div class=\'changed-test-title-renderer\'>';
            result += '<h1>Title</h1>';
            result += '</div>';
            return result;
          });
          assert.equal($popupContent.find(("." + 'changed-test-title-renderer')).length, 1, 'option \'titleTemplate\' successfully passed to the popup widget');
        });
        QUnit.test('titleRendered event should be fired if was set thought method', function(assert) {
          assert.expect(1);
          var $element = $('#popup').dxPopup({
            visible: true,
            showTitle: true
          });
          var instance = $element.dxPopup('instance');
          instance.on('titleRendered', function(e) {
            assert.ok(true, 'titleRendered event handled');
          });
          instance.option('titleTemplate', function() {
            return $('<div>').text('new title');
          });
          instance.show();
        });
        QUnit.test('\'bottomTemplate\' options test', function(assert) {
          var $element = $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              text: 'bottom text',
              toolbar: 'bottom',
              location: 'center'
            }],
            bottomTemplate: function(titleElement) {
              var result = '<div class=\'test-bottom-renderer\'>';
              result += '<h1>bottom</h1>';
              result += '</div>';
              return result;
            }
          });
          var instance = $element.dxPopup('instance');
          var $popupContent = instance.$content().parent();
          assert.equal($popupContent.find('.test-bottom-renderer').length, 1, 'option \'bottomTemplate\'  was set successfully');
          instance.option('bottomTemplate', function(titleElement) {
            assert.equal($(titleElement).get(0), $popupContent.find('.' + POPUP_BOTTOM_CLASS).get(0));
            var result = '<div class=\'changed-test-bottom-renderer\'>';
            result += '<h1>bottom</h1>';
            result += '</div>';
            return result;
          });
          assert.equal($popupContent.find('.changed-test-bottom-renderer').length, 1, 'option \'bottomTemplate\' successfully passed to the popup widget');
        });
        QUnit.test('title should be rendered if custom \'titleTemplate\' is specified and \'title\' is not set', function(assert) {
          $('#popupWithTitleTemplate').dxPopup({
            visible: true,
            titleTemplate: 'customTitle',
            toolbarItems: [],
            showCloseButton: false
          });
          var $title = $(("." + POPUP_TITLE_CLASS), viewport());
          assert.equal($title.length, 1, 'title is rendered');
          assert.equal($title.text(), 'testTitle', 'title template is rendered correctly');
        });
        QUnit.test('popup title should be rendered before content', function(assert) {
          var contentIsRendered = false;
          $('#popupWithTitleTemplate').dxPopup({
            visible: true,
            titleTemplate: function() {
              if (!contentIsRendered) {
                assert.ok(true, 'Popup title is rendered before content');
              }
            },
            contentTemplate: function() {
              contentIsRendered = true;
            }
          });
        });
        [true, false].forEach(function(isDeferRendering) {
          QUnit.test(("content should be append to the element when render the title with deferRendering=" + isDeferRendering), function(assert) {
            var $widgetContainer = $('#popupWithTitleTemplate');
            $widgetContainer.dxPopup({
              deferRendering: isDeferRendering,
              visible: isDeferRendering,
              titleTemplate: function(container) {
                var hasParentContainer = !!$(container).closest($widgetContainer).length;
                assert.ok(hasParentContainer);
              }
            });
          });
        });
        QUnit.test('Popup toolbar should render custom template with render function passed from integrationOptions', function(assert) {
          var text = 'toolbar template';
          var popup = $('#popup').dxPopup({
            visible: true,
            width: 'auto',
            height: 'auto',
            toolbarItems: [{
              location: 'before',
              toolbar: 'bottom',
              template: 'custom'
            }],
            integrationOptions: {templates: {'custom': {render: function(args) {
                    $('<span>').text(text).appendTo(args.container);
                  }}}}
          }).dxPopup('instance');
          var toolbarItemText = popup.$overlayContent().find('.dx-toolbar-item').text();
          assert.strictEqual(toolbarItemText, text, 'Custom template rendered');
        });
        QUnit.test('Popup should not pass the "content" and "title" templates via integrationOptions (T872394)', function(assert) {
          var buttonText = 'ToolbarButton';
          var titleText = 'TabTitle';
          var popup = $('#popup').dxPopup({
            visible: true,
            toolbarItems: [{
              location: 'before',
              toolbar: 'bottom',
              widget: 'dxButton',
              options: {text: buttonText}
            }, {
              location: 'before',
              toolbar: 'bottom',
              widget: 'dxTabPanel',
              options: {items: [{
                  title: titleText,
                  text: 'TabText'
                }]}
            }],
            integrationOptions: {templates: {
                'content': {render: function(args) {
                    $('<div>').text('PopupContent').appendTo(args.container);
                  }},
                'title': {render: function(args) {
                    $('<div>').text('PopupTitle').appendTo(args.container);
                  }}
              }}
          }).dxPopup('instance');
          var toolbarButtonText = popup.$overlayContent().find('.dx-popup-bottom .dx-button').text();
          var toolbarTabTitleText = popup.$overlayContent().find('.dx-popup-bottom .dx-tab').text();
          assert.strictEqual(toolbarButtonText, buttonText, 'default content template rendered');
          assert.strictEqual(toolbarTabTitleText, titleText, 'default title template rendered');
        });
      });
      QUnit.module('renderGeometry', {beforeEach: function() {
          var $__2 = this;
          var initialOptions = {
            visible: true,
            resizeEnabled: false
          };
          this.init = function(options) {
            $__2.popup = $('#popup').dxPopup($.extend({}, initialOptions, options)).dxPopup('instance');
            $__2.renderGeometrySpy = sinon.spy($__2.popup, '_renderGeometry');
          };
          this.reinit = function(options) {
            $__2.renderGeometrySpy.restore();
            $__2.init(options);
          };
          this.init();
        }}, function() {
        QUnit.test('toolBar should not update geometry after toolbarItems visibility option change', function(assert) {
          this.popup.option('toolbarItems[0].visible', true);
          assert.ok(this.renderGeometrySpy.notCalled, 'renderGeometry is not called for visibility option');
          this.popup.option('toolbarItems', [{
            widget: 'dxButton',
            options: {
              text: 'Supprimer',
              type: 'danger'
            }
          }]);
          assert.ok(this.renderGeometrySpy.notCalled, 'renderGeometry is not called for toolbarItems option fully change');
          this.popup.option('toolbarItems[0]', {
            widget: 'dxButton',
            options: {
              text: 'Supprimer',
              type: 'danger'
            }
          });
          assert.ok(this.renderGeometrySpy.notCalled, 'renderGeometry is not called for toolbarItems option partial change');
        });
        QUnit.test('toolBar should not update geometry after partial update of its items', function(assert) {
          this.reinit({
            visible: true,
            toolbarItems: [{
              widget: 'dxButton',
              options: {text: 'test 2 top'},
              toolbar: 'bottom',
              location: 'after'
            }]
          });
          this.popup.option('toolbarItems[0].options', {
            text: 'test',
            disabled: true
          });
          assert.ok(this.renderGeometrySpy.notCalled, 'renderGeometry is not called on partial update of a widget');
          this.popup.option('toolbarItems[0].toolbar', 'top');
          assert.ok(this.renderGeometrySpy.calledOnce, 'renderGeometry is called on item location changing');
        });
        QUnit.test('option change', function(assert) {
          var options = this.popup.option();
          var newOptions = {
            resizeEnabled: true,
            fullScreen: !options.fullScreen,
            autoResizeEnabled: !options.autoResizeEnabled,
            showTitle: !options.showTitle,
            title: 'test',
            titleTemplate: function() {
              return $('<div>').text('title template');
            },
            bottomTemplate: function() {
              return $('<div>').text('bottom template');
            },
            useDefaultToolbarButtons: !options.useDefaultToolbarButtons,
            useFlatToolbarButtons: !options.useFlatToolbarButtons
          };
          for (var optionName in newOptions) {
            var initialCallCount = this.renderGeometrySpy.callCount;
            this.popup.option(optionName, newOptions[optionName]);
            assert.ok(initialCallCount < this.renderGeometrySpy.callCount, 'renderGeomentry callCount has increased');
          }
        });
        QUnit.test('dimension change should not reset content height to not restore inner scroll position (T1113123)', function(assert) {
          var $scrollView = $('<div>');
          $('#popup').dxPopup({
            height: 'auto',
            maxHeight: 200,
            visible: true,
            contentTemplate: function() {
              return $scrollView.append($('<div>').height(400));
            }
          });
          var scrollView = $scrollView.dxScrollView({height: '100%'}).dxScrollView('instance');
          var scrollTop = 100;
          scrollView.scrollTo(scrollTop);
          resizeCallbacks.fire();
          assert.strictEqual(scrollView.scrollTop(), scrollTop, 'content scroll position is not reset');
        });
      });
      QUnit.module('positioning', {beforeEach: function() {
          var $__2 = this;
          var initialOptions = {
            width: 100,
            height: 100,
            visible: true,
            animation: null,
            position: {
              my: 'top left',
              at: 'center',
              of: window
            }
          };
          this.init = function() {
            var options = arguments[0] !== (void 0) ? arguments[0] : {};
            $__2.$popup = $('#popup').dxPopup($.extend({}, initialOptions, options));
            $__2.popup = $__2.$popup.dxPopup('instance');
            $__2.$overlayContent = $__2.popup.$overlayContent();
            $__2.getPosition = function() {
              return $__2.$overlayContent.position();
            };
          };
          this.reinit = function(options) {
            $__2.popup.dispose();
            $__2.init(options);
          };
          this.init();
        }}, function() {
        QUnit.module('after fullScreen option change', function() {
          QUnit.test('popup should render on initial position if it is first render', function(assert) {
            var $target = $('#container');
            this.reinit({
              fullScreen: true,
              visible: false,
              position: {
                my: 'top left',
                at: 'top left',
                of: $target
              },
              visualContainer: $target,
              restorePosition: false
            });
            this.popup.option('fullScreen', false);
            this.popup.show();
            var visualPosition = this.getPosition();
            var expectedPosition = $target.position();
            assert.deepEqual(visualPosition, expectedPosition, 'position is correct');
          });
          QUnit.test('popup should not restore position after fullScreen disable', function(assert) {
            var visualPositionBeforeFullScreen = this.getPosition();
            this.popup.option('fullScreen', true);
            this.popup.option('position', {of: '#container'});
            this.popup.option('fullScreen', false);
            var visualPositionAfterFullScreen = this.getPosition();
            assert.deepEqual(visualPositionAfterFullScreen, visualPositionBeforeFullScreen, 'visual position was not changed');
          });
          QUnit.test('popup should not restore position on rerender after fullScreen changed to false', function(assert) {
            var visualPositionBeforeFullScreen = this.getPosition();
            this.popup.option('fullScreen', true);
            this.popup.option('position', {of: '#container'});
            this.popup.option('fullScreen', false);
            this.popup.option('height', 'auto');
            var visualPositionAfterFullScreen = this.getPosition();
            assert.deepEqual(visualPositionAfterFullScreen, visualPositionBeforeFullScreen, 'visual position was not changed');
          });
          QUnit.test('fullScreen option change to true should trigger visualPositionChanged event', function(assert) {
            var visualPositionChangedHandlerStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedHandlerStub);
            this.popup.option('fullScreen', true);
            assert.ok(visualPositionChangedHandlerStub.calledOnce, 'visualPositionChanged event is raised');
            assert.deepEqual(visualPositionChangedHandlerStub.getCall(0).args[0].position, {
              top: 0,
              left: 0
            }, 'parameter is correct');
          });
        });
        QUnit.module('drag and resize', {beforeEach: function() {
            var $__2 = this;
            var baseInit = this.init;
            var initialOptions = {
              dragEnabled: true,
              resizeEnabled: true,
              dragAndResizeArea: window
            };
            this.init = function() {
              var options = arguments[0] !== (void 0) ? arguments[0] : {};
              baseInit($.extend(initialOptions, options));
              $__2.$title = $__2.$overlayContent.children(("." + POPUP_TITLE_CLASS));
              $__2.$resizeHandle = $__2.$overlayContent.find(("." + POPUP_TOP_LEFT_RESIZE_HANDLE_CLASS));
              $__2.dragPointer = pointerMock($__2.$title);
              $__2.resizePointer = pointerMock($__2.$resizeHandle);
              $__2.getPosition = function() {
                return $__2.$overlayContent.position();
              };
              $__2.drag = function() {
                $__2.dragPointer.start().down().move(100, 100).up();
              };
              $__2.resize = function() {
                $__2.resizePointer.start().down().move(-100, -100).up();
              };
            };
            this.init();
          }}, function() {
          QUnit.test('popup should not restore position on rerender after fullScreen changed to false', function(assert) {
            this.popup.option('fullScreen', true);
            this.popup.option('fullScreen', false);
            this.drag();
            var expectedPosition = this.getPosition();
            this.popup.option('height', 'auto');
            var position = this.getPosition();
            assert.deepEqual(position, expectedPosition, 'visual position was not changed');
          });
          QUnit.test('dragEnd should trigger positioned event with correct parameters', function(assert) {
            var visualPositionChangedStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedStub);
            this.drag();
            var $__4 = this.getPosition(),
                left = $__4.left,
                top = $__4.top;
            assert.ok(visualPositionChangedStub.calledOnce, 'visualPositionChanged event was raised');
            var args = visualPositionChangedStub.getCall(0).args[0];
            assert.deepEqual(args.position, {
              top: top,
              left: left
            }, 'position parameter is correct');
            assert.strictEqual(args.event.type, 'dxdragend', 'event parameter is correct');
          });
          QUnit.test('drag using kbn should raise visualPositionChanged event with correct parameters', function(assert) {
            var isDesktop = devices.real().deviceType === 'desktop';
            if (!isDesktop) {
              assert.ok(true, 'test is actual only for desktop');
              return;
            }
            var visualPositionChangedStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedStub);
            this.keyboard = keyboardMock(this.$overlayContent);
            this.keyboard.press('down');
            var $__4 = this.getPosition(),
                left = $__4.left,
                top = $__4.top;
            assert.ok(visualPositionChangedStub.calledOnce, 'visualPositionChanged event was raised');
            var args = visualPositionChangedStub.getCall(0).args[0];
            assert.deepEqual(args.position, {
              top: top,
              left: left
            }, 'position parameter is correct');
            assert.strictEqual(args.event.type, 'keydown', 'event parameter is correct');
          });
          QUnit.test('resizeEnd should trigger visualPositionChanged event with correct parameters', function(assert) {
            var visualPositionChangedStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedStub);
            this.resize();
            var $__4 = this.getPosition(),
                left = $__4.left,
                top = $__4.top;
            assert.ok(visualPositionChangedStub.calledOnce, 'visualPositionChanged event was raised');
            var args = visualPositionChangedStub.getCall(0).args[0];
            assert.deepEqual(args.position, {
              top: top,
              left: left
            }, 'position parameter is correct');
            assert.strictEqual(args.event.type, 'dxdragend', 'event parameter type is correct');
            assert.strictEqual(args.event.target, this.$resizeHandle.get(0), 'event parameter target is correct');
          });
          QUnit.test('fullScrren change after drag should trigger visualPositionChanged event with correct parameters', function(assert) {
            var visualPositionChangedStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedStub);
            this.drag();
            var $__4 = this.getPosition(),
                left = $__4.left,
                top = $__4.top;
            this.popup.option('fullScreen', true);
            assert.deepEqual(visualPositionChangedStub.getCall(1).args[0].position, {
              top: 0,
              left: 0
            }, 'position parameter is correct after change to true');
            this.popup.option('fullScreen', false);
            assert.deepEqual(visualPositionChangedStub.getCall(2).args[0].position, {
              top: top,
              left: left
            }, 'position parameter is correct after change to false');
          });
          QUnit.test('position change should not trigger visualPositionChanged event if fullScreen=true', function(assert) {
            this.popup.option('fullScreen', true);
            var visualPositionChangedStub = sinon.stub();
            this.popup.on('visualPositionChanged', visualPositionChangedStub);
            this.popup.option('position', {of: '#container'});
            assert.ok(visualPositionChangedStub.notCalled, 'visualPositionChanged event is not called');
          });
          QUnit.test('restorePosition option runtime change', function(assert) {
            this.popup.option('restorePosition', false);
            this.drag();
            var expectedPosition = this.getPosition();
            this.popup.hide();
            this.popup.show();
            var newPosition = this.getPosition();
            assert.deepEqual(newPosition, expectedPosition, 'position is not restored after runtime change to false');
          });
          QUnit.module('position after', function() {
            QUnit.test('resize should not be restored to initial', function(assert) {
              var position = this.getPosition();
              this.resize();
              var newPosition = this.getPosition();
              assert.strictEqual(newPosition.left, position.left - 100, 'left coordinate is correct');
              assert.strictEqual(newPosition.top, position.top - 100, 'top coordinate is correct');
            });
            ['drag', 'resize'].forEach(function(moveMethodName) {
              QUnit.module(moveMethodName, function() {
                QUnit.test('should not be changed after fullScreen is enabled and disabled', function(assert) {
                  this[moveMethodName]();
                  var position = this.getPosition();
                  this.popup.option('fullScreen', true);
                  this.popup.option('fullScreen', false);
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, position.left, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, position.top, 'top coordinate is correct');
                });
                QUnit.test('should not be changed after width or height change', function(assert) {
                  this[moveMethodName]();
                  var position = this.getPosition();
                  this.popup.option('width', 200);
                  this.popup.option('height', 200);
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, position.left, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, position.top, 'top coordinate is correct');
                });
                QUnit.test('should not be changed after content dimension change', function(assert) {
                  var $__2 = this;
                  var done = assert.async();
                  this.popup.option({
                    width: 'auto',
                    height: 'auto',
                    contentTemplate: function() {
                      return $('<div>').attr('id', 'content').width(100).height(100);
                    }
                  });
                  this[moveMethodName]();
                  var position = this.getPosition();
                  $('#content').width(300).height(300);
                  setTimeout(function() {
                    var newPosition = $__2.getPosition();
                    assert.strictEqual(newPosition.left, position.left, 'left coordinate is correct');
                    assert.strictEqual(newPosition.top, position.top, 'top coordinate is correct');
                    done();
                  }, 250);
                });
                QUnit.test('should be restored to position from option after repaint', function(assert) {
                  var position = this.getPosition();
                  this[moveMethodName]();
                  this.popup.repaint();
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, position.left, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, position.top, 'top coordinate is correct');
                });
                QUnit.test('should be change after position option change', function(assert) {
                  var position = this.getPosition();
                  this[moveMethodName]();
                  this.popup.option('position.offset', '100 100');
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, position.left + 100, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, position.top + 100, 'top coordinate is correct');
                });
                QUnit.test('should be restored to position from option after reopening', function(assert) {
                  var position = this.getPosition();
                  this[moveMethodName]();
                  this.popup.hide();
                  this.popup.show();
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, position.left, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, position.top, 'top coordinate is correct');
                });
                QUnit.test('should not be restored to position from option after reopening if restorePosition=false', function(assert) {
                  this.reinit({restorePosition: false});
                  this[moveMethodName]();
                  var visualPosition = this.getPosition();
                  this.popup.hide();
                  this.popup.show();
                  var newPosition = this.getPosition();
                  assert.strictEqual(newPosition.left, visualPosition.left, 'left coordinate is correct');
                  assert.strictEqual(newPosition.top, visualPosition.top, 'top coordinate is correct');
                });
              });
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
    define(["core/utils/size","jquery","core/devices","animation/fx","core/utils/view_port","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","core/config","core/utils/type","core/utils/browser","core/utils/version","core/utils/resize_callbacks","core/utils/window","ui/widget/ui.errors","ui/themes","../../helpers/executeAsyncMock.js","events/visibility_change","core/dom_adapter","generic_light.css!","ui/popup","ui/tab_panel","ui/scroll_view","ui/date_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("core/devices"), require("animation/fx"), require("core/utils/view_port"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("core/config"), require("core/utils/type"), require("core/utils/browser"), require("core/utils/version"), require("core/utils/resize_callbacks"), require("core/utils/window"), require("ui/widget/ui.errors"), require("ui/themes"), require("../../helpers/executeAsyncMock.js"), require("events/visibility_change"), require("core/dom_adapter"), require("generic_light.css!"), require("ui/popup"), require("ui/tab_panel"), require("ui/scroll_view"), require("ui/date_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popup.tests.js.map