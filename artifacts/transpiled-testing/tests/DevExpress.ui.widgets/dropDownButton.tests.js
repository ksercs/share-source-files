!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/dropDownButton.tests.js"], ["core/utils/size","jquery","ui/drop_down_button","core/utils/type","events/core/events_engine","../../helpers/keyboardMock.js","data/array_store","data/data_source/data_source","data/custom_store","core/utils/extend","core/devices","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/dropDownButton.tests.js", ["core/utils/size", "jquery", "ui/drop_down_button", "core/utils/type", "events/core/events_engine", "../../helpers/keyboardMock.js", "data/array_store", "data/data_source/data_source", "data/custom_store", "core/utils/extend", "core/devices", "generic_light.css!"], function($__export) {
  "use strict";
  var getHeight,
      getOuterHeight,
      getOuterWidth,
      getWidth,
      $,
      DropDownButton,
      typeUtils,
      eventsEngine,
      keyboardMock,
      ArrayStore,
      DataSource,
      CustomStore,
      extend,
      devices,
      DROP_DOWN_BUTTON_CONTENT,
      DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS,
      DROP_DOWN_BUTTON_ACTION_CLASS,
      DROP_DOWN_BUTTON_TOGGLE_CLASS,
      BUTTON,
      BUTTON_GROUP_WRAPPER,
      BUTTON_TEXT,
      LIST_GROUP_HEADER_CLASS,
      DROP_DOWN_BUTTON_HAS_ARROW_CLASS,
      OVERLAY_CONTENT_CLASS,
      OVERLAY_WRAPPER_CLASS,
      POPUP_CONTENT_CLASS,
      POPUP_CLASS,
      FOCUSED_CLASS,
      DROP_DOWN_EDITOR_OVERLAY_CLASS,
      CUSTOM_CLASS,
      LIST_CLASS,
      SCROLLVIEW_CONTENT_CLASS,
      getPopup,
      getList,
      getListKeyboard,
      getButtonGroup,
      getActionButton,
      getToggleButton;
  return {
    setters: [function($__m) {
      getHeight = $__m.getHeight;
      getOuterHeight = $__m.getOuterHeight;
      getOuterWidth = $__m.getOuterWidth;
      getWidth = $__m.getWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DropDownButton = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {}],
    execute: function() {
      DROP_DOWN_BUTTON_CONTENT = 'dx-dropdownbutton-content';
      DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS = 'dx-dropdownbutton-popup-wrapper';
      DROP_DOWN_BUTTON_ACTION_CLASS = 'dx-dropdownbutton-action';
      DROP_DOWN_BUTTON_TOGGLE_CLASS = 'dx-dropdownbutton-toggle';
      BUTTON = 'dx-button';
      BUTTON_GROUP_WRAPPER = 'dx-buttongroup-wrapper';
      BUTTON_TEXT = 'dx-button-text';
      LIST_GROUP_HEADER_CLASS = 'dx-list-group-header';
      DROP_DOWN_BUTTON_HAS_ARROW_CLASS = 'dx-dropdownbutton-has-arrow';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      POPUP_CLASS = 'dx-popup';
      FOCUSED_CLASS = 'dx-state-focused';
      DROP_DOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
      CUSTOM_CLASS = 'custom-class';
      LIST_CLASS = 'dx-list';
      SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
      QUnit.testStart(function() {
        var markup = "<div id='container'>\n            <div id='dropDownButton'></div>\n            <div id='anotherDropDownButton'></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      getPopup = function(instance) {
        return instance._popup;
      };
      getList = function(instance) {
        return instance._list;
      };
      getListKeyboard = function(dropDownButton) {
        return keyboardMock($(getList(dropDownButton).element()).find('[tabindex=0]'));
      };
      getButtonGroup = function(instance) {
        return instance._buttonGroup;
      };
      getActionButton = function(instance) {
        return instance.$element().find(("." + DROP_DOWN_BUTTON_ACTION_CLASS));
      };
      getToggleButton = function(instance) {
        return instance.$element().find(("." + DROP_DOWN_BUTTON_TOGGLE_CLASS));
      };
      QUnit.module('button group integration', {}, function() {
        QUnit.test('height option should change buttonGroup wrapper height', function(assert) {
          var dropDownButton = $('#dropDownButton').dxDropDownButton({height: '300px'}).dxDropDownButton('instance');
          var buttonGroup = getButtonGroup(dropDownButton);
          var buttonGroupWrapper = buttonGroup.$element().find(("." + BUTTON_GROUP_WRAPPER));
          assert.strictEqual(getHeight(buttonGroupWrapper.eq(0)), 300, 'height is right');
          $('#container').css('height', '900px');
          dropDownButton.option('height', '50%');
          var newButtonGroupWrapper = buttonGroup.$element().find(("." + BUTTON_GROUP_WRAPPER));
          assert.strictEqual(getHeight(newButtonGroupWrapper.eq(0)), 450, 'height after option change in runtime is right');
        });
        QUnit.test('accessKey option should be passed to buttonGroup (T1089414)', function(assert) {
          var accessKey = 't';
          var dropDownButton = $('#dropDownButton').dxDropDownButton({accessKey: accessKey}).dxDropDownButton('instance');
          var buttonGroup = getButtonGroup(dropDownButton);
          assert.strictEqual(buttonGroup.option('accessKey'), accessKey, 'accessKey is passed to buttonGroup');
        });
      });
      QUnit.module('popup integration', {beforeEach: function() {
          this.instance = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            splitButton: true,
            items: [{text: 'Item 1'}, {text: 'Item 2'}]
          });
          this.popup = getPopup(this.instance);
        }}, function() {
        QUnit.module('overlay content height', function() {
          QUnit.test('should be equal to content height when dropDownOptions.height in not defined', function(assert) {
            var contentHeight = 300;
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownContentTemplate: function() {
                return $('<div>').css({height: contentHeight});
              }
            });
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual(getHeight($popupContent), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to content height when dropDownOptions.height is set to auto', function(assert) {
            var contentHeight = 300;
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownContentTemplate: function() {
                return $('<div>').css({height: contentHeight});
              },
              dropDownOptions: {height: 'auto'}
            });
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual(getHeight($popupContent), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to content height when dropDownOptions.height in not defined after editor height runtime change', function(assert) {
            var contentHeight = 300;
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownContentTemplate: function() {
                return $('<div>').css({height: contentHeight});
              }
            }).dxDropDownButton('instance');
            dropDownButton.option('height', 200);
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual(getHeight($popupContent), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to content height when dropDownOptions.height is set to auto after editor height runtime change', function(assert) {
            var contentHeight = 300;
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownContentTemplate: function() {
                return $('<div>').css({height: contentHeight});
              },
              dropDownOptions: {height: 'auto'}
            }).dxDropDownButton('instance');
            dropDownButton.option('height', 200);
            var $popupContent = $(("." + POPUP_CONTENT_CLASS));
            assert.strictEqual(getHeight($popupContent), contentHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height if it is defined', function(assert) {
            var dropDownOptionsHeight = 300;
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {height: dropDownOptionsHeight}
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual(getOuterHeight($overlayContent), dropDownOptionsHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height if it is defined even after editor height runtime change', function(assert) {
            var dropDownOptionsHeight = 300;
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {height: dropDownOptionsHeight}
            }).dxDropDownButton('instance');
            dropDownButton.option('height', 200);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual(getOuterHeight($overlayContent), dropDownOptionsHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to wrapper height if dropDownOptions.height is set to 100%', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {height: '100%'}
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual(getOuterHeight($overlayContent), getOuterHeight($overlayWrapper), 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.height is percent', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {height: '50%'}
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight($overlayWrapper) / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor height runtime change', function(assert) {
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {height: '50%'},
              height: 600
            }).dxDropDownButton('instance');
            dropDownButton.option('height', 200);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight($overlayWrapper) / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.position.of if it is specified', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {
                height: '50%',
                position: {of: window}
              },
              height: 600
            }).dxDropDownButton('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight(window) / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.container if it is specified', function(assert) {
            var $container = $('<div>').css({height: 500}).appendTo('#qunit-fixture');
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              dropDownOptions: {
                height: '50%',
                position: {of: window},
                container: $container
              },
              height: 600
            }).dxDropDownButton('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight($container) / 2, 0.1, 'overlay content height is correct');
          });
        });
        QUnit.test('dropDownOptions.height should be passed to popup', function(assert) {
          var dropDownOptionsHeight = 500;
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            dropDownOptions: {height: dropDownOptionsHeight},
            opened: true
          });
          var popup = $dropDownButton.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('height'), dropDownOptionsHeight, 'popup height option value is correct');
        });
        QUnit.test('popup should have height equal to dropDownOptions.height even after editor input height change', function(assert) {
          var dropDownOptionsHeight = 500;
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            dropDownOptions: {height: dropDownOptionsHeight},
            opened: true
          });
          var dropDownButton = $dropDownButton.dxDropDownButton('instance');
          dropDownButton.option('height', 300);
          var popup = $dropDownButton.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('height'), dropDownOptionsHeight, 'popup height option value is correct');
        });
        QUnit.module('overlay content width', function() {
          QUnit.test('should be equal to editor width if dropDownOptions.width is not defined and content width is smaller than editor width', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            var $dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 500,
              dropDownOptions: {container: $container}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.strictEqual(overlayContentWidth, getOuterWidth($dropDownButton), 'width is correct on init');
            assert.strictEqual(overlayContentWidth, 500, 'width is correct on init');
          });
          QUnit.test('should be equal to editor width if dropDownOptions.width is not defined and content width is bigger than editor width', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            var $dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 100,
              dropDownOptions: {container: $container}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.strictEqual(overlayContentWidth, getOuterWidth($dropDownButton), 'width is correct on init');
            assert.strictEqual(overlayContentWidth, 100, 'width is correct on init');
          });
          QUnit.test('should be equal to editor width if dropDownOptions.width is not defined after editor width runtime change', function(assert) {
            var $dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 500
            });
            var instance = $dropDownButton.dxDropDownButton('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            instance.option('width', 700);
            assert.strictEqual(getOuterWidth($overlayContent), getOuterWidth($dropDownButton), 'width are equal after option change');
            assert.strictEqual(getOuterWidth($overlayContent), 700, 'width is correct after option change');
          });
          QUnit.test('should be equal to content width if dropDownOptions.width is "auto" and content width is bigger than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 100,
              dropDownContentTemplate: function() {
                return $('<div>').css({width: 300});
              },
              dropDownOptions: {width: 'auto'}
            });
            var popupContentWidth = getWidth($(("." + POPUP_CONTENT_CLASS)));
            assert.strictEqual(popupContentWidth, 300, 'width is correct');
          });
          QUnit.test('should be equal to content width if dropDownOptions.width is "auto" and content width is smaller than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownContentTemplate: function() {
                return $('<div>').css({width: 100});
              },
              dropDownOptions: {width: 'auto'}
            });
            var popupContentWidth = getWidth($(("." + POPUP_CONTENT_CLASS)));
            assert.strictEqual(popupContentWidth, 100, 'width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is "100%" and content width is smaller than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownContentTemplate: function() {
                return $('<div>').css({width: 100});
              },
              dropDownOptions: {width: '100%'}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.strictEqual(overlayContentWidth, 300, 'width is correct');
            assert.strictEqual(overlayContentWidth, overlayWrapperWidth, 'width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is "100%" and content width is bigger than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 100,
              dropDownContentTemplate: function() {
                return $('<div>').css({width: 300});
              },
              dropDownOptions: {width: '100%'}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.strictEqual(overlayContentWidth, 100, 'width is correct');
            assert.strictEqual(overlayContentWidth, overlayWrapperWidth, 'width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is "100%" and visualContainer is defined', function(assert) {
            var $container = $('<div>').css({width: 150}).appendTo('#qunit-fixture');
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 100,
              dropDownOptions: {
                width: '100%',
                visualContainer: $container
              }
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.strictEqual(overlayContentWidth, getOuterWidth($container), 'width is correct');
            assert.strictEqual(overlayContentWidth, overlayWrapperWidth, 'width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width if dropDownOptions.width is bigger than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 100,
              dropDownOptions: {width: 200}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.strictEqual(overlayContentWidth, 200, 'width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width if dropDownOptions.width is smaller than editor width', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 200,
              dropDownOptions: {width: 100}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.strictEqual(overlayContentWidth, 100, 'width is correct');
          });
          QUnit.test('should be calculated relative to wrapper width when dropDownOptions.width is pecrentage and smaller than 100', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {width: '50%'}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.roughEqual(overlayContentWidth, overlayWrapperWidth / 2, 0.1, 'width is correct');
            assert.roughEqual(overlayContentWidth, 150, 0.1, 'width is correct');
          });
          QUnit.test('should be calculated relative to wrapper width when dropDownOptions.width is pecrentage and bigger than 100', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {width: '150%'}
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.roughEqual(overlayContentWidth, overlayWrapperWidth * 1.5, 0.1, 'width is correct');
            assert.roughEqual(overlayContentWidth, 450, 0.1, 'width is correct');
          });
          QUnit.test('should be calculated relative to wrapper width when visualContainer is defined', function(assert) {
            var $container = $('<div>').css({width: 500}).appendTo('#qunit-fixture');
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {
                width: '150%',
                visualContainer: $container
              }
            });
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.roughEqual(overlayContentWidth, overlayWrapperWidth * 1.5, 0.1, 'width is correct');
            assert.roughEqual(overlayContentWidth, 750, 0.1, 'width is correct');
          });
          QUnit.test('should be calculated relative to wrapper width after wrapper width runtime change', function(assert) {
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {width: '150%'}
            }).dxDropDownButton('instance');
            dropDownButton.option('width', 500);
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            var overlayWrapperWidth = getOuterWidth($(("." + OVERLAY_WRAPPER_CLASS)));
            assert.roughEqual(overlayContentWidth, overlayWrapperWidth * 1.5, 0.1, 'width is correct');
            assert.roughEqual(overlayContentWidth, 750, 0.1, 'width is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.position.of if it is specified', function(assert) {
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {
                width: '50%',
                position: {of: window}
              }
            }).dxDropDownButton('instance');
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.roughEqual(overlayContentWidth, getOuterWidth(window) / 2, 0.1, 'width is correct');
          });
          QUnit.test('should be calculated relative to dropDownOptions.container if it is specified', function(assert) {
            var $container = $('<div>').css({width: 500}).appendTo('#qunit-fixture');
            $('#dropDownButton').dxDropDownButton({
              opened: true,
              width: 300,
              dropDownOptions: {
                width: '50%',
                position: {of: window},
                container: $container
              }
            }).dxDropDownButton('instance');
            var overlayContentWidth = getOuterWidth($(("." + OVERLAY_CONTENT_CLASS)));
            assert.roughEqual(overlayContentWidth, getOuterWidth($container) / 2, 0.1, 'width is correct');
          });
        });
        QUnit.test('toggle button should toggle the widget', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {splitButton: true});
          var $toggleButton = getToggleButton(instance);
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.strictEqual(instance.option('dropDownOptions.visible'), true, 'the widget is opened');
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.strictEqual(instance.option('dropDownOptions.visible'), false, 'the widget is closed');
        });
        QUnit.test('list should be rendered on init when deferRendering is false', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {deferRendering: false});
          assert.strictEqual(getList(dropDownButton).NAME, 'dxList', 'list has been rendered');
        });
        QUnit.test('popup should have special classes', function(assert) {
          assert.ok($(this.popup.$content()).hasClass(DROP_DOWN_BUTTON_CONTENT), 'popup has a special class');
          assert.ok($(this.popup.$wrapper()).hasClass(DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS), 'popup wrapper has a special class');
        });
        QUnit.test('popup content should have special class when custom template is used', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            dropDownContentTemplate: function() {
              return 'Custom Content';
            }
          });
          var $popupContent = getPopup(instance).$content();
          assert.ok($popupContent.hasClass(DROP_DOWN_BUTTON_CONTENT), 'popup has special class');
        });
        QUnit.test('popup should be positioned correctly if rtlEnabled is true', function(assert) {
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            opened: true,
            dropDownOptions: {
              width: 200,
              'position.collision': 'none'
            }
          });
          var instance = $dropDownButton.dxDropDownButton('instance');
          var dropDownButtonElementRect = $dropDownButton.get(0).getBoundingClientRect();
          var popupContentElementRect = getPopup(instance).$overlayContent().get(0).getBoundingClientRect();
          assert.strictEqual(popupContentElementRect.left, dropDownButtonElementRect.left, 'popup position is correct, rtlEnabled = false');
        });
        QUnit.test('popup width should change if content is truncated', function(assert) {
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            icon: 'square',
            opened: true,
            dropDownContentTemplate: function(data, $container) {
              $('<div>').addClass('custom-color-picker').css({
                width: 82,
                padding: 5
              }).appendTo($container);
            },
            dropDownOptions: {width: 'auto'}
          });
          var instance = $dropDownButton.dxDropDownButton('instance');
          var $popupContent = getPopup(instance).$content();
          assert.equal(getOuterWidth($popupContent), 84, 'width is right');
        });
        QUnit.test('popup width should be recalculated when button dimension changed', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            opened: true
          });
          var repaintMock = sinon.spy(getPopup(instance), 'repaint');
          instance.option({
            icon: 'box',
            text: 'Test',
            showArrowIcon: false
          });
          assert.strictEqual(repaintMock.callCount, 3, 'popup has been repainted 3 times');
        });
        QUnit.test('popup should be repositioned after height option runtime change', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            opened: true,
            dropDownOptions: {'position.collision': 'none'}
          });
          instance.option('height', 300);
          var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
          var overlayContentRect = $overlayContent.get(0).getBoundingClientRect();
          var dropDownButtonRect = $('#dropDownButton').get(0).getBoundingClientRect();
          assert.roughEqual(overlayContentRect.top, dropDownButtonRect.bottom, 1.01, 'top position is correct');
          assert.roughEqual(overlayContentRect.left, dropDownButtonRect.left, 1.01, 'left position is correct');
        });
        QUnit.test('click on toggle button should not be outside', function(assert) {
          var $toggleButton = getToggleButton(this.instance);
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.ok(this.instance.option('dropDownOptions.visible'), 'popup is visible');
          eventsEngine.trigger($toggleButton, 'dxpointerdown');
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.notOk(this.instance.option('dropDownOptions.visible'), 'popup is hidden');
        });
        QUnit.test('click on other toggle button should be outside', function(assert) {
          var otherButton = new DropDownButton($('#anotherDropDownButton'), {
            text: 'Text',
            icon: 'box',
            splitButton: true
          });
          var $toggleButton = getToggleButton(this.instance);
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.ok(this.instance.option('dropDownOptions.visible'), 'popup is visible');
          $toggleButton = getToggleButton(otherButton);
          eventsEngine.trigger($toggleButton, 'dxpointerdown');
          eventsEngine.trigger($toggleButton, 'dxclick');
          assert.notOk(this.instance.option('dropDownOptions.visible'), 'popup is hidden');
        });
        QUnit.module('ios tests', {
          beforeEach: function() {
            this._savedDevice = devices.current();
            devices.current({platform: 'ios'});
            var getWrapperClasses = function(element) {
              return Array.from(element._popup.$wrapper()[0].classList);
            };
            this.hasClass = function(element, className) {
              return getWrapperClasses(element).includes(className);
            };
          },
          afterEach: function() {
            devices.current(this._savedDevice);
          }
        }, function() {
          QUnit.test('DropDownButton popup wrapper has overlay and custom classes if the "wrapperAttr.class" property is added to "dropDownOptions" on init on iOS', function(assert) {
            var $dropDownButton = $('#dropDownButton').dxDropDownButton({dropDownOptions: {wrapperAttr: {class: CUSTOM_CLASS}}});
            var dropDownButton = $dropDownButton.dxDropDownButton('instance');
            dropDownButton.open();
            assert.strictEqual(this.hasClass(dropDownButton, DROP_DOWN_EDITOR_OVERLAY_CLASS), true, 'popup wrapper has overlay class');
            assert.strictEqual(this.hasClass(dropDownButton, CUSTOM_CLASS), true, 'popup wrapper has custom class');
          });
        });
      });
      QUnit.module('list integration', {}, function() {
        QUnit.test('hoverStateEnabled should be transfered to the list', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            hoverStateEnabled: false,
            deferRendering: false
          });
          var list = getList(instance);
          assert.strictEqual(list.option('hoverStateEnabled'), false, 'List has correct option');
          instance.option('hoverStateEnabled', true);
          assert.strictEqual(list.option('hoverStateEnabled'), true, 'List has changed option');
        });
        QUnit.test('it should be possible to render the widget list item without a text', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            items: [{icon: 'box'}, {icon: 'user'}],
            keyExpr: 'icon',
            displayExpr: '',
            selectedItemKey: 'user'
          });
          var $listItemText = getList(dropDownButton).itemElements().eq(0).text();
          assert.strictEqual($listItemText, '', 'item text is empty');
        });
        QUnit.test('default list item template should correctly render item text', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{text: 'Item 1'}],
            deferRendering: false
          });
          var list = getList(dropDownButton);
          var $listItem = list.itemElements();
          assert.strictEqual($listItem.text(), 'Item 1', 'displayExpr works');
        });
        QUnit.test('list should be displayed correctly without data expressions', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: ['Item 1'],
            deferRendering: false
          });
          var list = getList(dropDownButton);
          var $listItem = list.itemElements();
          assert.strictEqual($listItem.text(), 'Item 1', 'displayExpr works');
          assert.strictEqual(list.option('keyExpr'), 'this', 'keyExpr is \'this\'');
        });
        QUnit.test('data expressions should work with dropDownButton', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1',
              icon: 'box'
            }],
            keyExpr: 'key',
            displayExpr: 'name',
            deferRendering: false
          });
          var list = getList(dropDownButton);
          var $listItem = list.itemElements();
          assert.strictEqual($listItem.text(), 'Item 1', 'displayExpr works');
          assert.strictEqual(list.option('keyExpr'), 'key', 'keyExpr works');
          assert.strictEqual($listItem.find('.dx-icon-box').length, 1, 'item icon works');
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
          var list = getList(dropDownButton);
          assert.strictEqual(list.option('grouped'), true, 'grouped option transfered');
          assert.strictEqual(list.option('noDataText'), 'No data', 'noDataText option transfered');
          assert.strictEqual(list.option('selectionMode'), 'none', 'selectionMode is none for useSelectMode: false');
        });
        QUnit.test('text property value should be rendered as the button text after useSelectMode changed to false', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              id: 1,
              name: 'Item 1'
            }],
            deferRendering: false,
            useSelectMode: true,
            keyExpr: 'id',
            displayExpr: 'name',
            selectedItemKey: 1,
            text: 'initial text'
          });
          var $element = dropDownButton.$element();
          var $text = $element.find(("." + BUTTON_TEXT));
          assert.strictEqual($text.text(), 'Item 1', 'selected item text is rendered as the button text');
          dropDownButton.option({
            text: 'new text',
            useSelectMode: false
          });
          $text = $element.find(("." + BUTTON_TEXT));
          assert.strictEqual($text.text(), 'new text', 'text property value is rendered as the button text');
        });
        QUnit.test('selected item text should be rendered as the button text after useSelectMode changed to true (T1049361)', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              id: 1,
              name: 'Item 1'
            }, {
              id: 2,
              name: 'Item 2'
            }],
            deferRendering: false,
            useSelectMode: false,
            keyExpr: 'id',
            displayExpr: 'name',
            selectedItemKey: 1,
            text: 'initial text'
          });
          var $element = dropDownButton.$element();
          var $text = $element.find(("." + BUTTON_TEXT));
          assert.strictEqual($text.text(), 'initial text', 'text property value is rendered as the button text');
          dropDownButton.option({
            selectedItemKey: 2,
            useSelectMode: true
          });
          $text = $element.find(("." + BUTTON_TEXT));
          assert.strictEqual($text.text(), 'Item 2', 'selected item text is rendered as the button text');
        });
        QUnit.test('groupTemplate should be transfered to list', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1',
              icon: 'box'
            }],
            deferRendering: false,
            grouped: true,
            groupTemplate: function(data) {
              return $('<div>').text((data.key + ": " + data.name));
            }
          });
          var $element = dropDownButton.$element();
          var groupHeaders = $element.find(("." + LIST_GROUP_HEADER_CLASS));
          assert.equal(groupHeaders.eq(0).text(), '1: Item 1', 'groupTemplate is transfered to list on init');
          dropDownButton.option('groupTemplate', function(data) {
            return $('<div>').text(("Group #" + data.key));
          });
          groupHeaders = $element.find(("." + LIST_GROUP_HEADER_CLASS));
          assert.equal(groupHeaders.eq(0).text(), 'Group #1', 'groupTemplate is transfered to list after option change');
        });
        QUnit.test('list should have single selection mode if useSelectMode: true', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1',
              icon: 'box'
            }],
            deferRendering: false,
            useSelectMode: true
          });
          var list = getList(dropDownButton);
          assert.strictEqual(list.option('selectionMode'), 'single', 'selectionMode is single for useSelectMode: true');
        });
        QUnit.test('useItemTextAsTitle should be true for the list', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1',
              icon: 'box'
            }],
            deferRendering: false
          });
          var list = getList(dropDownButton);
          assert.strictEqual(list.option('useItemTextAsTitle'), true, 'option is true');
        });
        QUnit.test('wrapItemText option', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: ['Text'],
            deferRendering: false,
            wrapItemText: true
          });
          var list = getList(dropDownButton);
          var $itemContainer = list._itemContainer();
          assert.ok($itemContainer.hasClass('dx-wrap-item-text'), 'class was added');
        });
        [true, false].forEach(function(useItemTextAsTitle) {
          QUnit.test(("useItemTextAsTitle=" + useItemTextAsTitle + " option should be passed to list on init"), function(assert) {
            var dropDownButton = new DropDownButton($('#dropDownButton'), {
              deferRendering: false,
              useItemTextAsTitle: useItemTextAsTitle
            });
            var list = getList(dropDownButton);
            assert.strictEqual(list.option('useItemTextAsTitle'), useItemTextAsTitle, 'list option initial value is correct');
          });
          QUnit.test(("useItemTextAsTitle option runtime change to " + useItemTextAsTitle + " should be passed to list"), function(assert) {
            var dropDownButton = new DropDownButton($('#dropDownButton'), {
              deferRendering: false,
              useItemTextAsTitle: !useItemTextAsTitle
            });
            var list = getList(dropDownButton);
            dropDownButton.option('useItemTextAsTitle', useItemTextAsTitle);
            assert.strictEqual(list.option('useItemTextAsTitle'), useItemTextAsTitle, 'list option value is correct after runtime change');
          });
        });
        [true, false].forEach(function(wrapItemText) {
          QUnit.test('wrapItemText option should be synchronized with dxList wrapItemText option (T846124)', function(assert) {
            var dropDownButton = new DropDownButton($('#dropDownButton'), {
              deferRendering: false,
              wrapItemText: wrapItemText
            });
            var list = getList(dropDownButton);
            assert.strictEqual(list.option('wrapItemText'), dropDownButton.option('wrapItemText'), ("list option is correct when dropDownButton wrapItemText is " + wrapItemText + " on init"));
            dropDownButton.option('wrapItemText', !wrapItemText);
            assert.strictEqual(list.option('wrapItemText'), dropDownButton.option('wrapItemText'), 'list option is correct after dropDownButton wrapItemText option value change');
          });
        });
        [true, false].forEach(function(wrapItemText) {
          QUnit.test(("toggleButton should render inside of dropDownButton when width option is defined in generic themes when wrapItemText=" + wrapItemText + " (T847072)"), function(assert) {
            var dropDownButton = $('#dropDownButton').dxDropDownButton({
              items: [{
                'id': 1,
                'name': 'VeryVeryVeryVeryLongString',
                'icon': 'alignright'
              }],
              displayExpr: 'name',
              keyExpr: 'id',
              stylingMode: 'text',
              useSelectMode: true,
              width: 120,
              splitButton: true,
              selectedItemKey: 1,
              wrapItemText: wrapItemText
            }).dxDropDownButton('instance');
            var dropDownButtonElement = dropDownButton.$element().get(0);
            var toggleButtonElement = getToggleButton(dropDownButton).get(0);
            var dropDownButtonRightPosition = dropDownButtonElement.getBoundingClientRect(0).right;
            var toggleButtonRightPosition = toggleButtonElement.getBoundingClientRect(0).right;
            assert.strictEqual(dropDownButtonRightPosition, toggleButtonRightPosition, 'toggleButton position is correct');
          });
        });
        QUnit.test('dropDownButton content should be centered vertically (T847072)', function(assert) {
          var $dropDownButton = $('#dropDownButton').dxDropDownButton({
            items: [{
              'id': 1,
              'name': 'VeryVeryVeryVeryLongString',
              'icon': 'alignright'
            }],
            displayExpr: 'name',
            keyExpr: 'id',
            useSelectMode: true,
            width: 100,
            height: 100,
            splitButton: true,
            selectedItemKey: 1
          });
          var $buttonText = $dropDownButton.find(("." + BUTTON_TEXT));
          var dropDownButtonRect = $dropDownButton.get(0).getBoundingClientRect();
          var buttonTextRect = $buttonText.get(0).getBoundingClientRect();
          var dropDownButtonVerticalCenter = (dropDownButtonRect.top + dropDownButtonRect.bottom) / 2;
          var buttonTextVerticalCenter = (buttonTextRect.top + buttonTextRect.bottom) / 2;
          assert.roughEqual(buttonTextVerticalCenter, dropDownButtonVerticalCenter, 2, 'content is vertically centered');
        });
        QUnit.test('toggle/action buttons should have correct height when height option is not defined (T847072)', function(assert) {
          var dropDownButton = $('#dropDownButton').dxDropDownButton({
            items: [{
              'id': 1,
              'name': 'I',
              'icon': 'alignright'
            }],
            displayExpr: 'name',
            keyExpr: 'id',
            useSelectMode: true,
            width: 100,
            splitButton: true,
            selectedItemKey: 1
          }).dxDropDownButton('instance');
          var toggleButtonElement = getToggleButton(dropDownButton);
          var actionButtonElement = getActionButton(dropDownButton);
          assert.strictEqual(getOuterHeight(toggleButtonElement), 36, 'toggleButton has correct height in generic theme');
          assert.strictEqual(getOuterHeight(actionButtonElement), 36, 'actionButton has correct height in generic theme');
        });
        QUnit.test('list selection should depend on selectedItemKey option', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1'
            }, {
              key: 2,
              name: 'Item 2'
            }],
            deferRendering: false,
            keyExpr: 'key',
            displayExpr: 'name',
            selectedItemKey: 2,
            useSelectMode: true
          });
          var list = getList(dropDownButton);
          assert.deepEqual(list.option('selectedItemKeys'), [2], 'selection is correct');
          dropDownButton.option('selectedItemKey', 1);
          assert.deepEqual(list.option('selectedItemKeys'), [1], 'selection is correct');
        });
        QUnit.test('list selection should by defined depend on useSelectMode option (T838962)', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1'
            }, {
              key: 2,
              name: 'Item 2'
            }],
            deferRendering: false,
            keyExpr: 'key',
            displayExpr: 'name',
            selectedItemKey: 1,
            useSelectMode: false
          });
          var list = getList(dropDownButton);
          assert.deepEqual(list.option('selectedItemKeys'), [], 'selection is correct');
          dropDownButton.option('useSelectMode', true);
          assert.deepEqual(list.option('selectedItemKeys'), [1], 'selection is correct');
          dropDownButton.option('useSelectMode', false);
          assert.deepEqual(list.option('selectedItemKeys'), [], 'selection is correct');
        });
        QUnit.test('selection by click, key has been provided by dataSource', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {store: {
                type: 'array',
                data: [{
                  key: 1,
                  name: 'Item 1'
                }, {
                  key: 2,
                  name: 'Item 2'
                }],
                key: 'key'
              }},
            deferRendering: false,
            displayExpr: 'name',
            selectedItemKey: 2,
            useSelectMode: true
          });
          var list = getList(dropDownButton);
          assert.deepEqual(list.option('selectedItemKeys'), [2], 'selection is correct');
          dropDownButton.open();
          eventsEngine.trigger(list.itemElements().eq(0), 'dxclick');
          assert.deepEqual(dropDownButton.option('selectedItemKey'), 1, 'dropDownButton selected item key is correct');
          assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selected item key is correct');
        });
        QUnit.test('selection by click, key has been provided by widget', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [{
              key: 1,
              name: 'Item 1'
            }, {
              key: 2,
              name: 'Item 2'
            }],
            deferRendering: false,
            keyExpr: 'key',
            displayExpr: 'name',
            selectedItemKey: 2,
            useSelectMode: true
          });
          var list = getList(dropDownButton);
          assert.deepEqual(list.option('selectedItemKeys'), [2], 'selection is correct');
          dropDownButton.open();
          eventsEngine.trigger(list.itemElements().eq(0), 'dxclick');
          assert.deepEqual(dropDownButton.option('selectedItemKey'), 1, 'dropDownButton selected item key is correct');
          assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selected item key is correct');
        });
        QUnit.test('selected item with zero-equal key should be selected in the built-in List', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            items: [{
              id: 0,
              text: 'text1'
            }, {
              id: 1,
              text: 'text2'
            }],
            keyExpr: 'id',
            displayExpr: 'text',
            useSelectMode: true,
            selectedItemKey: 0
          });
          var list = getList(instance);
          assert.deepEqual(list.option('selectedItemKeys'), [0], 'List has correct selection');
        });
        QUnit.test('selected item with zero-equal key should be selected in the built-in List when select mode turning on', function(assert) {
          var instance = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            items: [{
              id: 0,
              text: 'text1'
            }, {
              id: 1,
              text: 'text2'
            }],
            keyExpr: 'id',
            displayExpr: 'text',
            useSelectMode: false,
            selectedItemKey: 0
          });
          var list = getList(instance);
          instance.option('useSelectMode', true);
          assert.deepEqual(list.option('selectedItemKeys'), [0], 'List has correct selection');
        });
      });
      QUnit.module('common use cases', {beforeEach: function() {
          this.itemClickHandler = sinon.spy();
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {
            useSelectMode: false,
            deferRendering: false,
            keyExpr: 'id',
            displayExpr: 'name',
            onItemClick: this.itemClickHandler,
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
          this.list = getList(this.dropDownButton);
          this.listItems = this.list.itemElements();
        }}, function() {
        QUnit.test('dataSource store should have correct key', function(assert) {
          var dropDownButton = $('#dropDownButton').dxDropDownButton({
            items: [{
              'id': 1,
              'name': 'I'
            }],
            keyExpr: 'id'
          }).dxDropDownButton('instance');
          var store = dropDownButton.getDataSource().store();
          assert.strictEqual(store.key(), 'id', 'store key is correct');
          dropDownButton.option('keyExpr', 'this');
          store = dropDownButton.getDataSource().store();
          assert.strictEqual(store.key(), 'this', 'store key is correct');
        });
        QUnit.test('toggleButton should have static width (T847072)', function(assert) {
          var dropDownButton = $('#dropDownButton').dxDropDownButton({
            items: [{
              'id': 1,
              'name': 'I',
              'icon': 'alignright'
            }],
            displayExpr: 'name',
            keyExpr: 'id',
            useSelectMode: true,
            width: 100,
            splitButton: true,
            selectedItemKey: 1
          }).dxDropDownButton('instance');
          var toggleButtonElement = getToggleButton(dropDownButton);
          assert.strictEqual(getOuterWidth(toggleButtonElement), 20, 'toggleButton has correct width in generic theme');
        });
        QUnit.test('it should be possible to set non-datasource action button', function(assert) {
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Download DevExtreme Trial', 'initial text is correct');
          eventsEngine.trigger(this.listItems.eq(0), 'dxclick');
          assert.strictEqual(this.itemClickHandler.callCount, 1, 'item clicked');
          assert.strictEqual(this.itemClickHandler.getCall(0).args[0].itemData.id, 1, 'vs.exe clicked');
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Download DevExtreme Trial', 'initial text was not changed');
          assert.notOk(getPopup(this.dropDownButton).option('visible'), 'popup is hidden');
        });
        QUnit.test('custom item should be redefined after selection if useSelectMode is true', function(assert) {
          this.dropDownButton.option({
            useSelectMode: true,
            opened: true
          });
          eventsEngine.trigger(this.list.itemElements().eq(0), 'dxclick');
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Trial for Visual Studio', 'action button has been changed');
        });
        QUnit.test('Widget should work correct if new selected item has key is 0', function(assert) {
          this.dropDownButton.option({
            items: [{
              id: 0,
              name: 'Test 0'
            }, {
              id: 1,
              name: 'Test 1'
            }],
            selectedItemKey: 1,
            useSelectMode: true,
            opened: true
          });
          eventsEngine.trigger(this.list.itemElements().eq(0), 'dxclick');
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Test 0', 'action button text is correct');
        });
        QUnit.test('custom item should be redefined after selection if useSelectMode is changed to true at runtime', function(assert) {
          this.dropDownButton.option({
            useSelectMode: false,
            opened: true
          });
          eventsEngine.trigger(this.list.itemElements().eq(1), 'dxclick');
          assert.strictEqual(this.list.option('selectedItem'), undefined, 'list selectedItem is undefined after item click');
          this.dropDownButton.option({
            useSelectMode: true,
            opened: true
          });
          eventsEngine.trigger(this.list.itemElements().eq(0), 'dxclick');
          assert.deepEqual(this.dropDownButton.option('selectedItem'), {
            id: 1,
            file: 'vs.exe',
            name: 'Trial for Visual Studio',
            icon: 'box'
          }, 'selectedItem is defined after item click');
          assert.deepEqual(this.list.option('selectedItem'), {
            id: 1,
            file: 'vs.exe',
            name: 'Trial for Visual Studio',
            icon: 'box'
          }, 'list selectedITem is defined after item click');
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'Trial for Visual Studio', 'action button has been changed');
          this.dropDownButton.option('useSelectMode', false);
          assert.deepEqual(this.dropDownButton.option('selectedItem'), undefined, 'selectedITem is undefined if useSelectMode is changed to false');
        });
        QUnit.test('prevent default behavior for the itemClick action', function(assert) {
          var clickHandler = sinon.stub().returns(false);
          this.dropDownButton.option('onItemClick', clickHandler);
          this.dropDownButton.toggle(true);
          eventsEngine.trigger(this.listItems.eq(0), 'dxclick');
          assert.strictEqual(clickHandler.callCount, 1, 'clickHandler called');
          assert.ok(getPopup(this.dropDownButton).option('visible'), 'default behavior has been prevented');
        });
        QUnit.test('the user can hide the toggle button', function(assert) {
          this.dropDownButton.option('splitButton', false);
          assert.strictEqual(getToggleButton(this.dropDownButton).length, 0, 'there is no toggle button');
          eventsEngine.trigger(getActionButton(this.dropDownButton), 'dxclick');
          assert.ok(this.dropDownButton.option('dropDownOptions.visible'), 'action button opens the dropdown');
          this.dropDownButton.close();
          this.dropDownButton.option('splitButton', true);
          assert.strictEqual(getToggleButton(this.dropDownButton).length, 1, 'the toggle button is visible');
          eventsEngine.trigger(getActionButton(this.dropDownButton), 'dxclick');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'action button doesn\'t open the dropdown');
        });
        QUnit.test('click on item should raise onSelectionChanged (T848284)', function(assert) {
          var selectionChangeHandler = sinon.spy();
          this.dropDownButton.option({
            items: [{
              id: 1,
              name: 'a'
            }, {
              id: 2,
              name: 'b'
            }],
            useSelectMode: true,
            onSelectionChanged: selectionChangeHandler
          });
          var firstListItems = getList(this.dropDownButton).itemElements();
          eventsEngine.trigger(firstListItems[1], 'dxclick');
          this.dropDownButton.option('items', [{
            id: 1,
            name: 'test'
          }]);
          this.dropDownButton.option('selectedItemKey', 1);
          assert.strictEqual(getActionButton(this.dropDownButton).text(), 'test', 'actionButton text is correct');
          assert.strictEqual(selectionChangeHandler.callCount, 2, 'onSelectionChange is raised');
        });
        QUnit.test('selectedItem should be kept after items option change when new dataSource includes selectedItemKey (T919804)', function(assert) {
          var $__2 = this;
          var done = assert.async();
          this.dropDownButton.option({
            items: [{
              id: 1,
              name: 'a'
            }, {
              id: 2,
              name: 'b'
            }],
            useSelectMode: true,
            selectedItemKey: 1
          });
          var items = [{
            id: 1,
            name: 'test'
          }];
          this.dropDownButton.option('items', items);
          setTimeout(function() {
            assert.strictEqual($__2.dropDownButton.option('selectedItemKey'), 1, 'selectedItemKey is kept');
            assert.deepEqual($__2.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
            var list = getList($__2.dropDownButton);
            assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selectedItemKey is kept');
            assert.deepEqual(list.option('selectedItem'), items[0], 'list selectedItem is correct');
            done();
          });
        });
        QUnit.test('selectedItem should be kept after dataSource option change when new dataSource-array includes selectedItemKey (T919804)', function(assert) {
          var $__2 = this;
          var done = assert.async();
          this.dropDownButton.option({
            dataSource: [{
              id: 1,
              name: 'a'
            }, {
              id: 2,
              name: 'b'
            }],
            useSelectMode: true,
            selectedItemKey: 1
          });
          var items = [{
            id: 1,
            name: 'test'
          }];
          this.dropDownButton.option('dataSource', items);
          setTimeout(function() {
            assert.strictEqual($__2.dropDownButton.option('selectedItemKey'), 1, 'selectedItemKey is kept');
            assert.deepEqual($__2.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
            var list = getList($__2.dropDownButton);
            assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selectedItemKey is kept');
            assert.deepEqual(list.option('selectedItem'), items[0], 'list selectedItem is correct');
            done();
          });
        });
        QUnit.test('keyGetter should be updated after keyExpr option change', function(assert) {
          this.dropDownButton.option({
            dataSource: [{
              key: 1,
              name: 'a'
            }, {
              key: 2,
              name: 'b'
            }],
            keyExpr: 'key',
            useSelectMode: true,
            selectedItemKey: 1
          });
          assert.strictEqual(this.dropDownButton._getKey(), 'key', '_keyGetter was updated');
        });
        QUnit.test('keyGetter should be updated after dataSource option change', function(assert) {
          this.dropDownButton.option({
            keyExpr: 'this',
            dataSource: new DataSource({store: new ArrayStore({
                data: [{
                  key: 1,
                  name: 'a'
                }, {
                  key: 2,
                  name: 'b'
                }],
                key: 'key'
              })}),
            useSelectMode: true,
            selectedItemKey: 1
          });
          assert.strictEqual(this.dropDownButton._getKey(), 'key', '_keyGetter was updated');
        });
        QUnit.test('list keyExpr should be updated after keyExpr option change', function(assert) {
          this.dropDownButton.option({keyExpr: 'newValue'});
          var list = getList(this.dropDownButton);
          assert.strictEqual(list.option('keyExpr'), 'newValue', 'list keyExpr was updated');
        });
        QUnit.test('list keyExpr should be updated after dataSource option change', function(assert) {
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {deferRendering: false});
          this.dropDownButton.option({dataSource: new DataSource({store: new ArrayStore({
                data: [{
                  key: 1,
                  name: 'test'
                }],
                key: 'newValue'
              })})});
          var list = getList(this.dropDownButton);
          assert.strictEqual(list.option('keyExpr'), 'newValue', 'list keyExpr was updated');
        });
        QUnit.test('selectedItem should be kept after dataSource option change when new dataSource includes selectedItemKey (T919804)', function(assert) {
          var $__2 = this;
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {deferRendering: false});
          var done = assert.async();
          var oldDataSource = new DataSource({store: new ArrayStore({
              data: [{
                id: 1,
                name: 'a'
              }, {
                id: 2,
                name: 'b'
              }],
              key: 'id'
            })});
          var newDataSource = new DataSource({store: new ArrayStore({
              data: [{
                key: 1,
                name: 'test'
              }],
              key: 'key'
            })});
          this.dropDownButton.option({
            dataSource: oldDataSource,
            useSelectMode: true,
            selectedItemKey: 1
          });
          var items = [{
            key: 1,
            name: 'test'
          }];
          this.dropDownButton.option('dataSource', newDataSource);
          setTimeout(function() {
            assert.strictEqual($__2.dropDownButton.option('selectedItemKey'), 1, 'selectedItemKey is kept');
            assert.deepEqual($__2.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
            var list = getList($__2.dropDownButton);
            assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selectedItemKeys is kept');
            assert.deepEqual(list.option('selectedItem'), items[0], 'list selectedItem is correct');
            done();
          });
        });
        QUnit.test('selectedItem should be kept after dataSource reload when new dataSource includes selectedItemKey and keyExpr is default (T919804)', function(assert) {
          var $__2 = this;
          var done = assert.async();
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2],
            useSelectMode: true,
            selectedItemKey: 1,
            deferRendering: false
          });
          var items = [1, 4, 5];
          this.dropDownButton.option('items', items);
          setTimeout(function() {
            assert.strictEqual($__2.dropDownButton.option('selectedItemKey'), 1, 'selectedItemKey is kept');
            assert.strictEqual($__2.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
            var list = getList($__2.dropDownButton);
            assert.deepEqual(list.option('selectedItemKeys'), [1], 'list selectedItemKey is kept');
            assert.strictEqual(list.option('selectedItem'), items[0], 'list selectedItem is correct');
            done();
          });
        });
        QUnit.test('list selectedItem should be restored after dataSource reload when new dataSource doesn\'t include selectedItemKey', function(assert) {
          var $__2 = this;
          var done = assert.async();
          this.dropDownButton.option({
            items: [{
              id: 1,
              name: 'a'
            }, {
              id: 2,
              name: 'b'
            }],
            useSelectMode: true,
            selectedItemKey: 1
          });
          var items = [{
            id: 3,
            name: 'test'
          }];
          this.dropDownButton.option('items', items);
          setTimeout(function() {
            assert.strictEqual($__2.dropDownButton.option('selectedItemKey'), null, 'selectedItemKey is correct');
            assert.strictEqual($__2.dropDownButton.option('selectedItem'), null, 'selectedItem is correct');
            var list = getList($__2.dropDownButton);
            assert.deepEqual(list.option('selectedItemKeys'), [], 'list selectedItemKey is kept');
            assert.strictEqual(list.option('selectedItem'), undefined, 'list selectedItem is correct');
            done();
          });
        });
        QUnit.test('click on item should raise selectionChanged - subscription by "on" method', function(assert) {
          var selectionChangeHandler = sinon.spy();
          var items = [{
            id: 1,
            name: 'a'
          }, {
            id: 2,
            name: 'b'
          }];
          this.dropDownButton.option({
            items: items,
            useSelectMode: true
          });
          this.dropDownButton.on('selectionChanged', selectionChangeHandler);
          var firstListItems = getList(this.dropDownButton).itemElements();
          eventsEngine.trigger(firstListItems[0], 'dxclick');
          assert.strictEqual(selectionChangeHandler.callCount, 1, 'selectionChanged is raised');
        });
        QUnit.test('click on item should change selectedItem option', function(assert) {
          var items = [{
            id: 1,
            name: 'a'
          }, {
            id: 2,
            name: 'b'
          }];
          this.dropDownButton.option({
            items: items,
            useSelectMode: true
          });
          var firstListItems = getList(this.dropDownButton).itemElements();
          eventsEngine.trigger(firstListItems[0], 'dxclick');
          assert.strictEqual(this.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
        });
        QUnit.test('widget should have specific class if it\'s is shown or hidden runtime', function(assert) {
          this.dropDownButton.option({showArrowIcon: false});
          var $dropDownButton = this.dropDownButton.$element();
          this.dropDownButton.option('showArrowIcon', true);
          assert.ok($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
          this.dropDownButton.option('showArrowIcon', false);
          assert.notOk($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
          this.dropDownButton.option('splitButton', true);
          assert.ok($dropDownButton.hasClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS));
        });
      });
      QUnit.module('public methods', {beforeEach: function() {
          this.dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: ['Item 1', 'Item 2', 'Item 3'],
            deferRendering: false
          });
        }}, function() {
        QUnit.test('toggle method', function(assert) {
          var popup = getPopup(this.dropDownButton);
          assert.strictEqual(popup.option('visible'), false, 'popup is closed');
          this.dropDownButton.toggle(true);
          assert.strictEqual(popup.option('visible'), true, 'popup is opened');
          this.dropDownButton.toggle(true);
          assert.strictEqual(popup.option('visible'), true, 'popup is still opened');
          this.dropDownButton.toggle(false);
          assert.strictEqual(popup.option('visible'), false, 'popup is closed');
          this.dropDownButton.toggle();
          assert.strictEqual(popup.option('visible'), true, 'popup visibility is inverted');
          var togglePromise = this.dropDownButton.toggle();
          assert.strictEqual(popup.option('visible'), false, 'popup visibility is inverted');
          assert.ok(typeUtils.isPromise(togglePromise), 'toggle should return promise');
        });
        QUnit.test('open method', function(assert) {
          var popup = getPopup(this.dropDownButton);
          assert.strictEqual(popup.option('visible'), false, 'popup is closed');
          var openPromise = this.dropDownButton.open();
          assert.strictEqual(popup.option('visible'), true, 'popup is opened');
          assert.ok(typeUtils.isPromise(openPromise), 'open should return promise');
        });
        QUnit.test('close method', function(assert) {
          this.dropDownButton.option('opened', true);
          var popup = getPopup(this.dropDownButton);
          assert.strictEqual(popup.option('visible'), true, 'popup is opened');
          var closePromise = this.dropDownButton.close();
          assert.strictEqual(popup.option('visible'), false, 'popup is closed');
          assert.ok(typeUtils.isPromise(closePromise), 'close should return promise');
        });
        QUnit.test('opened option', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {opened: true});
          assert.ok(getPopup(dropDownButton).option('visible'), 'popup is opened');
          dropDownButton.option('opened', false);
          assert.notOk(getPopup(dropDownButton).option('visible'), 'popup is closed');
        });
        QUnit.test('optionChange should be called when popup opens manually', function(assert) {
          var optionChangedHandler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {onOptionChanged: optionChangedHandler});
          var $actionButton = getActionButton(dropDownButton);
          eventsEngine.trigger($actionButton, 'dxclick');
          assert.ok(getPopup(dropDownButton).option('visible'), 'popup is opened');
          assert.strictEqual(optionChangedHandler.callCount, 1, 'optionChanged was called');
          assert.strictEqual(optionChangedHandler.getCall(0).args[0].name, 'opened', 'option name is correct');
          assert.strictEqual(optionChangedHandler.getCall(0).args[0].value, true, 'option value is correct');
          eventsEngine.trigger($actionButton, 'dxclick');
          assert.notOk(getPopup(dropDownButton).option('visible'), 'popup is closed');
          assert.strictEqual(optionChangedHandler.callCount, 2, 'optionChanged was called');
          assert.strictEqual(optionChangedHandler.getCall(1).args[0].name, 'opened', 'option name is correct');
          assert.strictEqual(optionChangedHandler.getCall(1).args[0].value, false, 'option value is correct');
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
        QUnit.test('showing and hiding the toggle button should not lead to datasource loading when there is no list', function(assert) {
          var loadHandler = sinon.stub().returns([{
            id: 1,
            name: 'Item 1'
          }]);
          var byKeyHandler = sinon.stub().withArgs(1).returns([{
            id: 1,
            name: 'Item 1'
          }]).returns([]);
          this.dropDownButton.option({
            dataSource: {
              load: loadHandler,
              byKey: byKeyHandler
            },
            deferRendering: false,
            selectedItemKey: 1
          });
          var loadCount = loadHandler.callCount;
          var byKeyCount = byKeyHandler.callCount;
          this.dropDownButton.option('splitButton', true);
          this.dropDownButton.option('splitButton', false);
          assert.strictEqual(byKeyHandler.callCount, byKeyCount, 'byKey was not called');
          assert.strictEqual(loadHandler.callCount, loadCount, 'load was not called');
        });
        QUnit.test('items changing with useSelectMode: false should not lead to datasource loading', function(assert) {
          var data = [{
            id: 1,
            name: 'Item 1'
          }, {
            id: 2,
            name: 'Item 2'
          }, {
            id: 3,
            name: 'Item 3'
          }];
          var loadHandler = sinon.stub().returns(data);
          var byKeyHandler = sinon.spy(function(key) {
            return [data[key - 1]];
          });
          this.dropDownButton.option({
            dataSource: {
              load: loadHandler,
              byKey: byKeyHandler
            },
            useSelectMode: false,
            deferRendering: false,
            keyExpr: 'id',
            displayExpr: 'name',
            selectedItemKey: 1,
            opened: true
          });
          var loadCount = loadHandler.callCount;
          var byKeyCount = byKeyHandler.callCount;
          var $items = getList(this.dropDownButton).itemElements();
          eventsEngine.trigger($items.eq(0), 'dxclick');
          this.dropDownButton.option('opened', true);
          eventsEngine.trigger($items.eq(1), 'dxclick');
          this.dropDownButton.option('opened', true);
          eventsEngine.trigger($items.eq(2), 'dxclick');
          assert.strictEqual(byKeyHandler.callCount, byKeyCount, 'byKey was not called after items clicks');
          assert.strictEqual(loadHandler.callCount, loadCount, 'load was not called after items clicks');
          this.dropDownButton.option('selectedItemKey', 1);
          this.dropDownButton.option('selectedItemKey', 3);
          assert.strictEqual(byKeyHandler.callCount, byKeyCount, 'byKey was not called');
          assert.strictEqual(loadHandler.callCount, loadCount, 'load was not called');
        });
      });
      QUnit.module('deferred datasource', {
        beforeEach: function() {
          var $__2 = this;
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
                d.resolve($__2.items.slice());
              }, 500);
              return d.promise();
            },
            byKey: function(key) {
              var d = $.Deferred();
              setTimeout(function() {
                var item = $.grep($__2.items, function(item) {
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
        QUnit.test('displayExpr should work with deferred datasource', function(assert) {
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            displayExpr: 'name',
            dataSource: this.dataSourceConfig
          });
          dropDownButton.open();
          this.clock.tick(500);
          var list = getList(dropDownButton);
          var $item = list.itemElements().eq(0);
          assert.strictEqual($item.text(), 'Left', 'text is correct');
        });
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
          assert.strictEqual(getList(dropDownButton).option('selectedItemKeys')[0], 2, 'selectedItemKeys is correct');
        });
        QUnit.test('dropDownButton should not try to load selected item after dataSource change if selectedItemKey is undefined', function(assert) {
          var byKeySpy = sinon.spy(this.dataSourceConfig, 'byKey');
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            useSelectMode: true,
            keyExpr: 'id',
            displayExpr: 'text',
            items: [1, 2, 3]
          });
          dropDownButton.option('dataSource', this.dataSourceConfig);
          assert.ok(byKeySpy.notCalled, 'no unnecessary call was made');
        });
        QUnit.test('dropDownButton should not try to load value on init if selectedItemKey is undefined (T925687)', function(assert) {
          var byKeySpy = sinon.spy(this.dataSourceConfig, 'byKey');
          new DropDownButton($('#dropDownButton'), {
            deferRendering: false,
            useSelectMode: true,
            keyExpr: 'id',
            displayExpr: 'text',
            dataSource: this.dataSourceConfig
          });
          assert.ok(byKeySpy.notCalled, 'no unnecessary call was made');
        });
        QUnit.module('byKey call result should be ignored', {beforeEach: function() {
            var $__2 = this;
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
                    data: $__2.items,
                    totalCount: $__2.items.length
                  });
                }, 100);
                return deferred.promise();
              },
              byKey: function(key) {
                var deferred = $.Deferred();
                var filter = function() {
                  return $__2.items.find(function(item) {
                    return item.id === key;
                  });
                };
                if ($__2.callCount === 0) {
                  setTimeout(function() {
                    deferred.resolve(filter());
                  }, 2000);
                } else {
                  setTimeout(function() {
                    deferred.resolve(filter());
                  }, 1000);
                }
                ++$__2.callCount;
                return deferred.promise();
              }
            });
            this.dataSource = new DataSource({store: this.customStore});
            this.dropDownButton = $('#dropDownButton').dxDropDownButton({
              dataSource: this.dataSource,
              displayExpr: 'text',
              keyExpr: 'id',
              selectedItemKey: 1
            }).dxDropDownButton('instance');
          }}, function() {
          QUnit.test('after new call', function(assert) {
            this.dropDownButton.option('selectedItemKey', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownButton.option('selectedItem').id, 2, 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownButton.option('selectedItem').id, 2, 'first init byKey result is ignored');
          });
          QUnit.test('after value change to already loaded value', function(assert) {
            this.dropDownButton.open();
            this.clock.tick(100);
            this.dropDownButton.option('selectedItemKey', 2);
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownButton.option('selectedItem').id, 2, 'second request is resolved');
            this.clock.tick(1000);
            assert.strictEqual(this.dropDownButton.option('selectedItem').id, 2, 'first init byKey result is ignored');
          });
          QUnit.test('after change value to undefined (T1008488)', function(assert) {
            this.dropDownButton.option('selectedItemKey', undefined);
            this.clock.tick(2000);
            assert.strictEqual(this.dropDownButton.option('selectedItem'), null, 'init byKey result is ignored');
          });
        });
      });
      QUnit.module('events', {}, function() {
        QUnit.test('onItemClick event', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            onItemClick: handler
          });
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 5, 'event has 5 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
          assert.strictEqual(e.itemData, 1, 'itemData is correct');
          assert.strictEqual($(e.itemElement).get(0), $item.get(0), 'itemElement is correct');
        });
        QUnit.test('itemClick event - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {items: [1, 2, 3]});
          dropDownButton.on('itemClick', handler);
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 5, 'event has 5 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
          assert.strictEqual(e.itemData, 1, 'itemData is correct');
          assert.strictEqual($(e.itemElement).get(0), $item.get(0), 'itemElement is correct');
        });
        QUnit.test('itemClick event change - subscription by "on" method', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {items: [1, 2, 3]});
          dropDownButton.open();
          dropDownButton.on('itemClick', handler);
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          assert.strictEqual(handler.callCount, 1, 'handler was called');
        });
        QUnit.test('onButtonClick event', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: true,
            selectedItemKey: 2,
            onButtonClick: handler
          });
          var $actionButton = getActionButton(dropDownButton);
          eventsEngine.trigger($actionButton, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 4, 'event has 4 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
          assert.strictEqual(e.selectedItem, 2, 'itemData is correct');
        });
        QUnit.test('onButtonClick option change', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            selectedItemKey: 2
          });
          dropDownButton.option('onButtonClick', handler);
          var $actionButton = getActionButton(dropDownButton);
          eventsEngine.trigger($actionButton, 'dxclick');
          var e = handler.lastCall.args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.event.type, 'dxclick', 'event is correct');
        });
        QUnit.test('onButtonClick should be called even if splitButton is false', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: false,
            onButtonClick: handler
          });
          var $actionButton = getActionButton(dropDownButton);
          eventsEngine.trigger($actionButton, 'dxclick');
          assert.strictEqual(handler.callCount, 1, 'handler was called');
        });
        QUnit.test('buttonClick - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            splitButton: false
          });
          dropDownButton.on('buttonClick', handler);
          var $actionButton = getActionButton(dropDownButton);
          eventsEngine.trigger($actionButton, 'dxclick');
          assert.strictEqual(handler.callCount, 1, 'handler was called');
        });
        QUnit.test('onContentReady should be fired after widget rendering and take into account Popup rendering', function(assert) {
          var contentReadyHandler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {
              load: sinon.stub().returns([1, 2, 3]),
              byKey: sinon.stub().returns(1)
            },
            deferRendering: true,
            onContentReady: contentReadyHandler
          });
          assert.strictEqual(contentReadyHandler.callCount, 1, 'Widget is ready');
          dropDownButton.open();
          assert.strictEqual(contentReadyHandler.callCount, 3, 'Popup is ready, then List is ready');
        });
        QUnit.test('onContentReady should be fired after widget rendering when subscription uses "on" method', function(assert) {
          var contentReadyHandler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {
              load: sinon.stub().returns([1, 2, 3]),
              byKey: sinon.stub().returns(1)
            },
            deferRendering: true
          });
          dropDownButton.on('contentReady', contentReadyHandler);
          dropDownButton.open();
          assert.strictEqual(contentReadyHandler.callCount, 2, 'Popup is ready, then List is ready');
          dropDownButton.option('dataSource', [1, 2, 3]);
          assert.strictEqual(contentReadyHandler.callCount, 3, 'List is ready after updating Popup content');
        });
        QUnit.test('onContentReady should be fired after widget with custom content template rendering', function(assert) {
          var contentReadyHandler = sinon.spy();
          var firstTemplateHandler = sinon.stub().returns('Template 1');
          var secondTemplateHandler = sinon.stub().returns('Template 2');
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {
              load: sinon.stub().returns([1, 2, 3]),
              byKey: sinon.stub().returns(1)
            },
            dropDownContentTemplate: firstTemplateHandler,
            deferRendering: false,
            onContentReady: contentReadyHandler,
            opened: true
          });
          assert.strictEqual(contentReadyHandler.callCount, 1, 'event is fired');
          dropDownButton.option('dropDownContentTemplate', secondTemplateHandler);
          assert.strictEqual(contentReadyHandler.callCount, 2, 'event is fired after template change');
        });
        QUnit.test('onContentReady should be fired after widget with custom content template rendering - subscription uses "on" method', function(assert) {
          var contentReadyHandler = sinon.spy();
          var firstTemplateHandler = sinon.stub().returns('Template 1');
          var secondTemplateHandler = sinon.stub().returns('Template 2');
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {
              load: sinon.stub().returns([1, 2, 3]),
              byKey: sinon.stub().returns(1)
            },
            dropDownContentTemplate: firstTemplateHandler,
            deferRendering: true
          });
          dropDownButton.on('contentReady', contentReadyHandler);
          dropDownButton.open();
          assert.strictEqual(contentReadyHandler.callCount, 1, 'event is fired');
          dropDownButton.option('dropDownContentTemplate', secondTemplateHandler);
          assert.strictEqual(contentReadyHandler.callCount, 2, 'event is fired after template change');
        });
        QUnit.test('onSelectionChanged event', function(assert) {
          var handler = sinon.spy();
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            selectedItemKey: 2,
            onSelectionChanged: handler
          });
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 4, 'event has 4 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.strictEqual(e.previousItem, 2, 'previousItem is correct');
          assert.strictEqual(e.item, 1, 'item is correct');
        });
        QUnit.test('onSelectionChanged event with data expressions', function(assert) {
          var handler = sinon.spy();
          var items = [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }];
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: items,
            keyExpr: 'id',
            displayExpr: 'text',
            selectedItemKey: 2,
            onSelectionChanged: handler
          });
          dropDownButton.open();
          var $item = getList(dropDownButton).itemElements().eq(0);
          eventsEngine.trigger($item, 'dxclick');
          var e = handler.getCall(0).args[0];
          assert.strictEqual(handler.callCount, 1, 'handler was called');
          assert.strictEqual(Object.keys(e).length, 4, 'event has 4 properties');
          assert.strictEqual(e.component, dropDownButton, 'component is correct');
          assert.strictEqual(e.element, dropDownButton.element(), 'element is correct');
          assert.deepEqual(e.previousItem, items[1], 'previousItem is correct');
          assert.deepEqual(e.item, items[0], 'item is correct');
        });
      });
      QUnit.module('keyboard navigation', {beforeEach: function() {
          this.$element = $('#dropDownButton');
          this.dropDownButton = new DropDownButton(this.$element, {
            focusStateEnabled: true,
            splitButton: true,
            deferRendering: false,
            items: [{
              name: 'Item 1',
              id: 1
            }, {
              name: 'Item 2',
              id: 2
            }, {
              name: 'Item 3',
              id: 3
            }],
            displayExpr: 'name',
            keyExpr: 'id'
          });
          this.$actionButton = getActionButton(this.dropDownButton);
          this.$toggleButton = getToggleButton(this.dropDownButton);
          this.keyboard = keyboardMock(getButtonGroup(this.dropDownButton).element());
        }}, function() {
        QUnit.test('focusStateEnabled option should be transfered to list and buttonGroup', function(assert) {
          assert.ok(getList(this.dropDownButton).option('focusStateEnabled'), 'list got option on init');
          assert.ok(getButtonGroup(this.dropDownButton).option('focusStateEnabled'), 'buttonGroup got option on init');
          this.dropDownButton.option('focusStateEnabled', false);
          assert.notOk(getList(this.dropDownButton).option('focusStateEnabled'), 'list got option on change');
          assert.notOk(getButtonGroup(this.dropDownButton).option('focusStateEnabled'), 'buttonGroup got option on change');
        });
        QUnit.testInActiveWindow('arrow right and left should select a button', function(assert) {
          this.keyboard.press('right');
          assert.ok(this.$toggleButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
          assert.notOk(this.$actionButton.hasClass(FOCUSED_CLASS), 'action button lose focus');
          this.keyboard.press('left');
          assert.notOk(this.$toggleButton.hasClass(FOCUSED_CLASS), 'action button lose');
          assert.ok(this.$actionButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
        });
        QUnit.testInActiveWindow('action button should be clicked on enter or space', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.option('onButtonClick', handler);
          this.keyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'action button pressed');
          this.keyboard.press('space');
          assert.strictEqual(handler.callCount, 2, 'action button pressed twice');
        });
        QUnit.testInActiveWindow('enter/space press should raise itemClick event when list item is focused', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.option('onItemClick', handler);
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'itemClick has been raised');
          listKeyboard.press('down').press('space');
          assert.strictEqual(handler.callCount, 2, 'itemClick has been raised');
        });
        QUnit.testInActiveWindow('enter/space press should raise itemClick event when list item is focused - subscription by "on" method', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.on('itemClick', handler);
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'itemClick has been raised');
          listKeyboard.press('down').press('space');
          assert.strictEqual(handler.callCount, 2, 'itemClick has been raised');
        });
        QUnit.test('enter/space press should raise selectionChanged event when list item is focused', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.option('onSelectionChanged', handler);
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'selectionChanged is raised');
          listKeyboard.press('down').press('space');
          assert.strictEqual(handler.callCount, 2, 'selectionChanged has been raised');
        });
        QUnit.test('enter/space press should change selectedItem option when list item is focused', function(assert) {
          var items = this.dropDownButton.option('items');
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.strictEqual(this.dropDownButton.option('selectedItem'), items[0], 'selectedItem is correct');
          listKeyboard.press('down').press('space');
          assert.strictEqual(this.dropDownButton.option('selectedItem'), items[1], 'selectedItem is correct');
        });
        QUnit.test('enter/space press should raise selectionChanged event when list item is focused - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.on('selectionChanged', handler);
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'onSelectionChanged is raised');
          listKeyboard.press('down').press('space');
          assert.strictEqual(handler.callCount, 2, 'selectionChanged has been raised');
        });
        QUnit.testInActiveWindow('enter/space press should rise buttonClick event when action button is focused - subscription using "on" method', function(assert) {
          var handler = sinon.spy();
          this.dropDownButton.on('buttonClick', handler);
          this.keyboard.press('enter');
          assert.strictEqual(handler.callCount, 1, 'buttonClick event has been raised after enter press');
          this.keyboard.press('space');
          assert.strictEqual(handler.callCount, 2, 'buttonClick event has been raised after space press');
        });
        QUnit.testInActiveWindow('toggle button should be clicked on enter or space', function(assert) {
          this.keyboard.press('right').press('enter');
          assert.ok(this.dropDownButton.option('dropDownOptions.visible'), 'popup is opened');
          assert.ok(this.$toggleButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
          this.keyboard.press('space');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$toggleButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
        });
        QUnit.testInActiveWindow('list should get first focused item when down arrow pressed after opening', function(assert) {
          this.keyboard.press('right').press('enter').press('down');
          var $firstItem = getList(this.dropDownButton).itemElements().first();
          assert.ok($firstItem.hasClass(FOCUSED_CLASS), 'first list item is focused');
        });
        QUnit.testInActiveWindow('list should get first focused item when up arrow pressed after opening', function(assert) {
          this.keyboard.press('right').press('enter').press('up');
          var $firstItem = getList(this.dropDownButton).itemElements().first();
          assert.ok($firstItem.hasClass(FOCUSED_CLASS), 'first list item is focused');
        });
        QUnit.testInActiveWindow('esc on list should close the popup', function(assert) {
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('esc');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$actionButton.hasClass(FOCUSED_CLASS), 'action button is focused');
        });
        QUnit.testInActiveWindow('esc on button group should close the popup', function(assert) {
          this.keyboard.press('right').press('enter').press('esc');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$toggleButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
        });
        QUnit.testInActiveWindow('left on list should close the popup', function(assert) {
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('left');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$actionButton.hasClass(FOCUSED_CLASS), 'action button is focused');
        });
        QUnit.testInActiveWindow('right on list should close the popup', function(assert) {
          this.keyboard.press('right').press('enter').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('right');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$actionButton.hasClass(FOCUSED_CLASS), 'action button is focused');
        });
        QUnit.testInActiveWindow('down arrow on toggle button should open the popup', function(assert) {
          this.keyboard.press('right').press('down');
          assert.ok(this.dropDownButton.option('dropDownOptions.visible'), 'popup is opened');
        });
        QUnit.testInActiveWindow('selection of the item should return focus to the button group', function(assert) {
          this.keyboard.press('right').press('down').press('down');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          listKeyboard.press('enter');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(this.$toggleButton.hasClass(FOCUSED_CLASS), 'toggle button is focused');
        });
        QUnit.testInActiveWindow('tab on button should close the popup', function(assert) {
          this.keyboard.press('right').press('down');
          assert.ok(this.dropDownButton.option('dropDownOptions.visible'), 'popup is opened');
          this.keyboard.press('tab');
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
        });
        QUnit.testInActiveWindow('tab on list should close the popup', function(assert) {
          this.keyboard.press('right').press('down').press('down');
          assert.ok(this.dropDownButton.option('dropDownOptions.visible'), 'popup is opened');
          var listKeyboard = getListKeyboard(this.dropDownButton);
          var event = listKeyboard.press('tab').event;
          assert.notOk(this.dropDownButton.option('dropDownOptions.visible'), 'popup is closed');
          assert.ok(getButtonGroup(this.dropDownButton).$element().hasClass(FOCUSED_CLASS), 'button group was focused');
          assert.strictEqual(event.isDefaultPrevented(), false, 'event was not prevented and native focus move next');
        });
        QUnit.testInActiveWindow('focus method call moves focus to buttonGroup', function(assert) {
          var $buttonGroup = getButtonGroup(this.dropDownButton).$element();
          this.dropDownButton.focus();
          assert.ok($buttonGroup.hasClass(FOCUSED_CLASS), 'button group is focused');
        });
        QUnit.testInActiveWindow('focusIn handler should be called on dropDownButton focus', function(assert) {
          var focusInHandler = sinon.stub();
          this.dropDownButton.option({onFocusIn: focusInHandler});
          this.dropDownButton.focus();
          assert.ok(focusInHandler.calledOnce, 'focusIn handler was called');
        });
        QUnit.testInActiveWindow('focusOut handler should be called on buttonGroup blur', function(assert) {
          var focusOutHandler = sinon.stub();
          this.dropDownButton.option({onFocusOut: focusOutHandler});
          var $buttonGroup = getButtonGroup(this.dropDownButton).$element();
          this.dropDownButton.focus();
          eventsEngine.trigger($buttonGroup, 'focusout');
          assert.ok(focusOutHandler.calledOnce, 'focusOut handler was called');
        });
        QUnit.module('registerKeyHandler', function() {
          QUnit.test('should add keyboard event handler with correct context', function(assert) {
            assert.expect(1);
            var handler = function() {
              assert.strictEqual(this.NAME, 'dxDropDownButton', 'context is correct');
            };
            this.dropDownButton.registerKeyHandler('backspace', handler);
            this.keyboard.press('backspace');
          });
          [['downArrow', true], ['upArrow', true], ['tab', false], ['escape', false]].forEach(function($__4) {
            var $__6,
                $__7;
            var $__5 = $__4,
                key = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
                opened = ($__7 = $__6.next()).done ? void 0 : $__7.value;
            QUnit.test(("should work correctly with " + key), function(assert) {
              var handler = sinon.stub();
              this.dropDownButton.registerKeyHandler(key, handler);
              this.dropDownButton.focus();
              this.keyboard.press(key);
              assert.strictEqual(this.dropDownButton.option('opened'), opened, 'default handler was called');
              assert.ok(handler.calledOnce, 'custom handler was called');
            });
          });
        });
      });
      QUnit.module('custom content template', {}, function() {
        QUnit.test('dropDownContentTemplate option can be used', function(assert) {
          var templateHandler = sinon.stub().returns('Template 1');
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            items: [1, 2, 3],
            dropDownContentTemplate: templateHandler,
            deferRendering: false
          });
          var popupContent = getPopup(dropDownButton).content();
          assert.strictEqual(templateHandler.callCount, 1, 'templateHandler was called');
          assert.deepEqual(templateHandler.getCall(0).args[0], [1, 2, 3], 'data is correct');
          assert.strictEqual(templateHandler.getCall(0).args[1], popupContent, 'container is correct');
          assert.strictEqual($(popupContent).text(), 'Template 1', 'template was rendered');
          var templateHandler2 = sinon.stub().returns('Template 2');
          dropDownButton.option('dropDownContentTemplate', templateHandler2);
          assert.strictEqual(templateHandler.callCount, 1, 'templateHandler was called');
          assert.strictEqual($(popupContent).text(), 'Template 2', 'template was rendered');
        });
        QUnit.test('datasource should be passed to contentTemplae when items are not specified', function(assert) {
          var templateHandler = sinon.stub().returns('Template 1');
          var dropDownButton = new DropDownButton($('#dropDownButton'), {
            dataSource: {
              load: sinon.stub().returns([1, 2, 3]),
              byKey: sinon.stub().returns(1)
            },
            dropDownContentTemplate: templateHandler,
            deferRendering: false
          });
          assert.deepEqual(templateHandler.getCall(0).args[0], dropDownButton.getDataSource(), 'data is correct');
        });
        QUnit.test('itemTemplate option', function(assert) {
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
          var $listItems = getList(dropDownButton).itemElements();
          assert.strictEqual($listItems.eq(0).text(), '1: A', 'itemTemlate has changed item text');
        });
      });
      QUnit.module('Accessibility', {beforeEach: function() {
          var $__2 = this;
          this.elementSelector = '#dropDownButton';
          this.$element = $(this.elementSelector);
          this.createInstance = function(options) {
            return new DropDownButton($__2.$element, extend({
              items: ['item 1'],
              text: 'Text'
            }, options));
          };
          this.getButtons = function() {
            return $($__2.elementSelector).find(("." + BUTTON));
          };
        }}, function() {
        QUnit.test('check aria-expanded attr for dropdown', function(assert) {
          this.createInstance();
          var buttonElements = this.getButtons();
          assert.strictEqual(buttonElements.eq(0).attr('aria-expanded'), 'false');
          assert.strictEqual(this.$element.attr('aria-expanded'), undefined);
        });
        QUnit.test('check aria-expanded attr for visible dropdown', function(assert) {
          this.createInstance({opened: true});
          var buttonElements = this.getButtons();
          assert.strictEqual(buttonElements.eq(0).attr('aria-expanded'), 'true');
          assert.strictEqual(this.$element.attr('aria-expanded'), undefined);
        });
        QUnit.test('check aria-expanded attr for visible dropdown if splitButton is true', function(assert) {
          var instance = this.createInstance({splitButton: true});
          instance.open();
          var buttonElements = this.getButtons();
          assert.strictEqual($(buttonElements[0]).attr('aria-expanded'), 'true');
          assert.strictEqual($(buttonElements[1]).attr('aria-expanded'), 'true');
          assert.strictEqual(this.$element.attr('aria-expanded'), undefined);
        });
        QUnit.test('check aria-expanded attr if splitButton is true after dropdown was closed', function(assert) {
          var instance = this.createInstance({splitButton: true});
          var buttonElements = this.getButtons();
          instance.open();
          instance.close();
          assert.strictEqual($(buttonElements[0]).attr('aria-expanded'), 'false');
          assert.strictEqual($(buttonElements[1]).attr('aria-expanded'), 'false');
          assert.strictEqual(this.$element.attr('aria-expanded'), undefined);
        });
        QUnit.test('check aria-expanded attr if splitButton=true', function(assert) {
          var instance = this.createInstance();
          var $firstButton = this.getButtons().eq(0);
          assert.strictEqual($firstButton.attr('aria-expanded'), 'false');
          instance.option({splitButton: true});
          var $buttonElements = this.getButtons();
          assert.strictEqual($buttonElements.eq(0).attr('aria-expanded'), 'false');
          assert.strictEqual($buttonElements.eq(1).attr('aria-expanded'), 'false');
        });
        QUnit.test('check aria-owns attr for element', function(assert) {
          var instance = this.createInstance();
          assert.strictEqual(this.$element.attr('aria-owns'), undefined);
          instance.open();
          var popupId = $(("." + POPUP_CONTENT_CLASS)).attr('id');
          assert.strictEqual(this.$element.attr('aria-owns'), popupId);
        });
        [true, false].forEach(function(splitButton) {
          QUnit.test(("check aria-haspopup attr for button if splitButton=" + splitButton), function(assert) {
            this.createInstance({splitButton: splitButton});
            var $buttonElements = this.getButtons();
            var $button = splitButton ? $buttonElements.eq(1) : $buttonElements.eq(0);
            assert.strictEqual($button.attr('aria-haspopup'), 'listbox');
          });
        });
        QUnit.test('check aria-haspopup attr for button if splitButton was changed in runtime', function(assert) {
          var instance = this.createInstance();
          var $button = this.getButtons().eq(0);
          assert.strictEqual($button.attr('aria-haspopup'), 'listbox');
          instance.option('splitButton', true);
          var $firstButton = this.getButtons().eq(0);
          var $secondButton = this.getButtons().eq(1);
          assert.strictEqual($firstButton.attr('aria-haspopup'), 'listbox');
          assert.strictEqual($secondButton.attr('aria-haspopup'), 'listbox');
        });
        [{
          name: 'text',
          value: 'text',
          updatedValue: 'new text'
        }, {
          name: 'icon',
          value: 'icon',
          updatedValue: 'newIcon'
        }, {
          name: 'focusStateEnabled',
          value: false,
          updatedValue: true
        }, {
          name: 'hoverStateEnabled',
          value: false,
          updatedValue: true
        }, {
          name: 'stylingMode',
          value: 'text',
          updatedValue: 'outlined'
        }, {
          name: 'tabIndex',
          value: 0,
          updatedValue: 1
        }].forEach(function(option) {
          QUnit.test(("button should have aria-haspopup, aria-label and aria-expanded attributes after update " + option.name + " option"), function(assert) {
            var $__3;
            var instance = this.createInstance(($__3 = {}, Object.defineProperty($__3, option.name, {
              value: option.value,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            instance.option(option.name, option.updatedValue);
            var $button = this.getButtons().eq(0);
            assert.strictEqual($button.attr('aria-haspopup'), 'listbox');
            assert.strictEqual($button.attr('aria-label'), option.name === 'text' ? 'new text' : 'Text');
            assert.strictEqual($button.attr('aria-expanded'), 'false');
          });
          QUnit.test(("buttons should have aria-haspopup, aria-label and aria-expanded attributes if splitButton is set and after update " + option.name + " option"), function(assert) {
            var $__3;
            var instance = this.createInstance(($__3 = {}, Object.defineProperty($__3, "splitButton", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, option.name, {
              value: option.value,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            instance.option(option.name, option.updatedValue);
            var $firstButton = this.getButtons().eq(0);
            var $secondButton = this.getButtons().eq(1);
            assert.strictEqual($firstButton.attr('aria-haspopup'), 'listbox');
            assert.strictEqual($firstButton.attr('aria-label'), option.name === 'text' ? 'new text' : 'Text');
            assert.strictEqual($firstButton.attr('aria-expanded'), 'false');
            assert.strictEqual($secondButton.attr('aria-haspopup'), 'listbox');
            assert.strictEqual($secondButton.attr('aria-label'), 'spindown');
            assert.strictEqual($secondButton.attr('aria-expanded'), 'false');
          });
        });
        QUnit.test('button should have correct aria-label attribute if text is not specified', function(assert) {
          this.createInstance({text: ''});
          var $button = this.getButtons().eq(0);
          assert.strictEqual($button.attr('aria-label'), 'dropdownbutton');
        });
        QUnit.test('button should have correct aria-label attribute if text updated from empty value', function(assert) {
          var instance = this.createInstance({text: ''});
          instance.option('text', 'new text');
          var $button = this.getButtons().eq(0);
          assert.strictEqual($button.attr('aria-label'), 'new text');
        });
        QUnit.test('buttons should have correct aria-label attributes if text is not specified and splitButton is set', function(assert) {
          this.createInstance({
            splitButton: true,
            text: ''
          });
          var $firstButton = this.getButtons().eq(0);
          var $secondButton = this.getButtons().eq(1);
          assert.strictEqual($firstButton.attr('aria-label'), 'dropdownbutton');
          assert.strictEqual($secondButton.attr('aria-label'), 'spindown');
        });
        ['items', 'dataSource'].forEach(function(dataSource) {
          QUnit.test(("list aria-label should be set correctly if data source is " + dataSource + " and items is not empty on init"), function(assert) {
            var instance = this.createInstance({opened: true});
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'Items');
            instance.option(dataSource, []);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'No data to display');
            instance.option(dataSource, [1, 2, 3]);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'Items');
          });
          QUnit.test(("list aria-label should be set correctly if data source is " + dataSource + " and items is empty on init"), function(assert) {
            var $__3;
            var instance = this.createInstance(($__3 = {}, Object.defineProperty($__3, dataSource, {
              value: [],
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "opened", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'No data to display');
            instance.option(dataSource, [1, 2, 3]);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'Items');
            instance.option(dataSource, []);
            assert.strictEqual($(("." + LIST_CLASS + " ." + SCROLLVIEW_CONTENT_CLASS)).attr('aria-label'), 'No data to display');
          });
          [[1, 2, 3], []].forEach(function(items) {
            QUnit.test(("There is no errors if dataSource is " + dataSource + "=[" + items + "] was changed in runtime and list was not rendered"), function(assert) {
              var $__3;
              var instance = this.createInstance(($__3 = {}, Object.defineProperty($__3, dataSource, {
                value: items,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__3));
              try {
                instance.option(dataSource, items);
              } catch (e) {
                assert.ok(false, ("error is raised: " + e.message));
              } finally {
                assert.ok(true, 'no error raised');
              }
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
    define(["core/utils/size","jquery","ui/drop_down_button","core/utils/type","events/core/events_engine","../../helpers/keyboardMock.js","data/array_store","data/data_source/data_source","data/custom_store","core/utils/extend","core/devices","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("ui/drop_down_button"), require("core/utils/type"), require("events/core/events_engine"), require("../../helpers/keyboardMock.js"), require("data/array_store"), require("data/data_source/data_source"), require("data/custom_store"), require("core/utils/extend"), require("core/devices"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownButton.tests.js.map