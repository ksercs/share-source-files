!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/toolbar.menu.tests.js"], ["core/utils/size","jquery","data/array_store","animation/fx","ui/button","ui/popup","ui/toolbar/internal/ui.toolbar.menu","ui/toolbar/internal/ui.toolbar.menu.list","../../helpers/executeAsyncMock.js","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","core/config","data/data_source/data_source","core/utils/type","ui/themes","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/toolbar.menu.tests.js", ["core/utils/size", "jquery", "data/array_store", "animation/fx", "ui/button", "ui/popup", "ui/toolbar/internal/ui.toolbar.menu", "ui/toolbar/internal/ui.toolbar.menu.list", "../../helpers/executeAsyncMock.js", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "core/config", "data/data_source/data_source", "core/utils/type", "ui/themes", "generic_light.css!"], function($__export) {
  "use strict";
  var getOuterHeight,
      getOuterWidth,
      $,
      ArrayStore,
      fx,
      Button,
      Popup,
      DropDownMenu,
      ToolbarMenuList,
      executeAsyncMock,
      pointerMock,
      keyboardMock,
      config,
      DataSource,
      isRenderer,
      themes,
      DROP_DOWN_MENU_CLASS,
      DROP_DOWN_MENU_LIST_CLASS,
      DROP_DOWN_MENU_BUTTON_CLASS,
      STATE_FOCUSED_CLASS,
      DROP_DOWN_MENU_POPUP_CLASS,
      DROP_DOWN_MENU_POPUP_WRAPPER_CLASS,
      LIST_ITEM_CLASS,
      SCROLLVIEW_CONTENT_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      getOuterHeight = $__m.getOuterHeight;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      Button = $__m.default;
    }, function($__m) {
      Popup = $__m.default;
    }, function($__m) {
      DropDownMenu = $__m.default;
    }, function($__m) {
      ToolbarMenuList = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dropDownMenu"></div>\
        <div id="dropDownMenuSecond"></div>';
        $('#qunit-fixture').html(markup);
      });
      DROP_DOWN_MENU_CLASS = 'dx-dropdownmenu';
      DROP_DOWN_MENU_LIST_CLASS = 'dx-dropdownmenu-list';
      DROP_DOWN_MENU_BUTTON_CLASS = 'dx-dropdownmenu-button';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      DROP_DOWN_MENU_POPUP_CLASS = 'dx-dropdownmenu-popup';
      DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = 'dx-dropdownmenu-popup-wrapper';
      LIST_ITEM_CLASS = 'dx-list-item';
      SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          executeAsyncMock.setup();
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#dropDownMenu');
          this.instance = new DropDownMenu($('#dropDownMenu'));
          this.overflowMenu = {
            click: function() {
              $__3.$element.trigger('dxclick');
            },
            button: function() {
              return $__3.instance._button;
            },
            $button: function() {
              return $(this.button().$element());
            },
            list: function() {
              return $__3.instance._list;
            },
            $list: function() {
              return $(this.list().$element());
            },
            popup: function() {
              return $__3.instance._popup;
            },
            $popup: function() {
              return $(this.popup().$element());
            },
            $popupContent: function() {
              return $(this.popup().$content());
            },
            $items: function() {
              return this.$list().find(("." + LIST_ITEM_CLASS));
            }
          };
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          this.clock.restore();
          fx.off = false;
        }
      };
      QUnit.module('render with popup', moduleConfig, function() {
        QUnit.test('default', function(assert) {
          assert.ok(this.overflowMenu.button() instanceof Button);
          assert.ok(this.$element.hasClass(DROP_DOWN_MENU_CLASS));
          assert.ok(this.overflowMenu.$button().hasClass(DROP_DOWN_MENU_BUTTON_CLASS));
          this.overflowMenu.click();
          assert.ok(this.overflowMenu.popup() instanceof Popup);
          assert.ok(this.overflowMenu.$list().hasClass(DROP_DOWN_MENU_LIST_CLASS));
          assert.equal(this.overflowMenu.$items().length, 0);
          assert.ok(this.overflowMenu.$popup().dxPopup('instance'));
        });
        QUnit.test('list should be rendered before onContentReady of the popup', function(assert) {
          var $__3 = this;
          assert.expect(1);
          try {
            Popup.defaultOptions({options: {onContentReady: function() {
                  assert.strictEqual($__3.overflowMenu.$list().length, 1, 'List is already rendered');
                }}});
            this.overflowMenu.click();
          } finally {
            Popup.defaultOptions({options: {onContentReady: function() {}}});
          }
        });
        QUnit.test('w/ options - items', function(assert) {
          this.instance.option('items', ['Item 0', 'Item 1', 'Item 2']);
          this.overflowMenu.click();
          assert.equal(this.overflowMenu.$items().length, 3);
          this.instance.option({items: ['Item 3', 'Item 4']});
          this.overflowMenu.click();
          assert.equal(this.overflowMenu.$items().length, 2);
        });
        QUnit.test('w/ options - dataSource', function(assert) {
          this.instance.option('items', ['Item 0', 'Item 1', 'Item 2']);
          this.overflowMenu.click();
          assert.equal(this.overflowMenu.$items().length, 3);
          this.instance.option({dataSource: new DataSource(['Item 3', 'Item 4'])});
          assert.equal(this.overflowMenu.$items().length, 2);
        });
        QUnit.test('RTL support', function(assert) {
          var RTL_SELECTOR = '.dx-rtl';
          this.instance.option({
            dataSource: new ArrayStore(['Item 0', 'Item 1', 'Item 2']),
            rtlEnabled: true
          });
          this.instance.option();
          this.overflowMenu.click();
          assert.ok($(("." + DROP_DOWN_MENU_POPUP_WRAPPER_CLASS + " " + RTL_SELECTOR)).length > 0, 'menu is in RTL mode');
        });
        QUnit.test('correct wrapper classes should be set', function(assert) {
          var dropDownMenu = new DropDownMenu($('<div>').appendTo('#qunit-fixture'), {animation: {show: {start: function() {
                  var $wrapper = $(("." + DROP_DOWN_MENU_POPUP_WRAPPER_CLASS));
                  assert.strictEqual($wrapper.hasClass(DROP_DOWN_MENU_POPUP_CLASS), true, 'popup class added');
                }}}});
          dropDownMenu.option('opened', true);
        });
        QUnit.test('overlay should not overlap bottom button border', function(assert) {
          var $button = $('<div>');
          new DropDownMenu($button.appendTo('#qunit-fixture'), {opened: true});
          var $overlay = $('.dx-overlay-content').first();
          var overlayTop = $overlay.offset().top;
          var buttonBottom = $button.offset().top + getOuterHeight($button);
          assert.ok(overlayTop >= buttonBottom);
        });
      });
      QUnit.module('render', moduleConfig, function() {
        QUnit.test('w/ options - visible', function(assert) {
          var overflowMenuButton = this.overflowMenu.button();
          this.instance.option('visible', false);
          assert.equal(overflowMenuButton.option('visible'), false);
          this.instance.option('visible', false);
          assert.equal(overflowMenuButton.option('visible'), false);
          this.instance.option('visible', true);
          assert.equal(overflowMenuButton.option('visible'), true);
          this.instance.option('visible', true);
          assert.equal(overflowMenuButton.option('visible'), true);
        });
        QUnit.test('w/ options - deferRendering', function(assert) {
          this.instance.option({
            items: [0, 1, 2],
            deferRendering: true
          });
          this.overflowMenu.click();
          this.instance.option('opened', false);
          this.instance.option('items', [3, 4, 5]);
          assert.equal(this.overflowMenu.$items().text(), '012');
          this.overflowMenu.click();
          assert.equal(this.overflowMenu.$items().text(), '345');
        });
        QUnit.test('w/ options - itemTemplate', function(assert) {
          this.instance.option({
            items: [0, 1, 2],
            itemTemplate: function(item, itemIndex, itemElement) {
              assert.equal(isRenderer(itemElement), !!config().useJQuery, 'itemElement is correct');
              return 'Item' + item;
            }
          });
          this.overflowMenu.click();
          assert.equal(this.overflowMenu.$items().text(), 'Item0Item1Item2');
        });
        QUnit.test('custom item template can return default template name', function(assert) {
          this.instance.option({
            items: [1, 2],
            itemTemplate: function() {
              return 'item';
            }
          });
          this.overflowMenu.click();
          var $items = this.overflowMenu.list().itemElements();
          assert.strictEqual($items.eq(0).text(), '1', 'default item template was applied');
          assert.strictEqual($items.eq(1).text(), '2', 'default item template was applied');
        });
        QUnit.test('popup should be rendered after first click only', function(assert) {
          assert.strictEqual(this.overflowMenu.popup(), undefined, 'popup is not rendered before it is opened');
          this.instance.option('opened', true);
          assert.strictEqual(this.overflowMenu.$popup().length, 1, 'popup is not rendered before it is opened');
        });
        QUnit.test('popup should be rendered if opened option is set to true on init', function(assert) {
          this.instance.option('opened', true);
          assert.ok(this.overflowMenu.popup().option('visible'), 'popup is visible');
        });
        QUnit.test('popup should be placed into container specified in the \'container\' option', function(assert) {
          var $container = $('#dropDownMenu');
          this.instance.option({
            container: $container,
            opened: true
          });
          assert.strictEqual(this.overflowMenu.$popupContent().closest($container).length, 1, 'Popover content located into desired container');
        });
        QUnit.test('popup should be placed into new container after changing the \'container\' option', function(assert) {
          var $container = $('#dropDownMenu');
          this.instance.option('opened', true);
          this.instance.option('container', $container);
          assert.strictEqual(this.overflowMenu.$popupContent().closest($container).length, 1, 'Popup content located into desired container');
        });
      });
      QUnit.module('behavior', moduleConfig, function() {
        QUnit.test('first click on button shows drop-down list, second click hides', function(assert) {
          this.overflowMenu.click();
          var popup = this.overflowMenu.popup();
          assert.ok(popup.option('visible'), 'popup is opened after first click');
          this.overflowMenu.click();
          assert.ok(!popup.option('visible'), 'popup is closed after second click');
        });
        QUnit.test('click outside of popup hides drop-down list', function(assert) {
          this.overflowMenu.click();
          var popup = this.overflowMenu.popup();
          assert.equal(popup.option('visible'), true);
          pointerMock(document).start().down();
          assert.equal(popup.option('visible'), false);
        });
        QUnit.test('click on list item hides drop-down list if closeOnClick=true', function(assert) {
          assert.expect(4);
          this.instance.option({
            items: [1, 2, 3],
            closeOnClick: false
          });
          this.overflowMenu.click();
          var popup = this.overflowMenu.popup();
          var $list = this.overflowMenu.$list();
          assert.equal(popup.option('visible'), true, 'popup is visible');
          $($list).trigger('dxclick');
          assert.equal(popup.option('visible'), true, 'click on list does not hide popup');
          $(this.overflowMenu.$items().first()).trigger('dxclick');
          assert.equal(popup.option('visible'), true, 'popup is visible');
          this.instance.option('closeOnClick', true);
          $(this.overflowMenu.$items().first()).trigger('dxclick');
          assert.equal(popup.option('visible'), false, 'popup is hidden');
        });
        QUnit.test('click on list item is not outside click for popup', function(assert) {
          assert.expect(1);
          this.overflowMenu.click();
          this.overflowMenu.popup().option('visible', false);
          assert.equal(this.instance.option('opened'), false);
        });
      });
      QUnit.module('integration', moduleConfig, function() {
        QUnit.test('list defaults', function(assert) {
          var list = new ToolbarMenuList($('#dropDownMenu'));
          assert.strictEqual(list.option('pullRefreshEnabled'), false);
          assert.strictEqual(list.option('activeStateEnabled'), true);
        });
        QUnit.test('button defaults', function(assert) {
          var button = $('#dropDownMenu').dxButton().dxButton('instance');
          assert.strictEqual(button.option('type'), 'normal');
          assert.strictEqual(button.option('text'), '');
          assert.strictEqual(button.option('template'), 'content');
          assert.strictEqual(button.option('width'), undefined);
          assert.strictEqual(button.option('height'), undefined);
        });
        [true, false].forEach(function(isMaterial) {
          [true, false].forEach(function(rtlEnabled) {
            QUnit.test(("popup defaults, rtlEnabled: " + rtlEnabled + ", isMaterialTheme: " + isMaterial), function(assert) {
              var origIsMaterial = themes.isMaterial;
              themes.isMaterial = function() {
                return true;
              };
              try {
                this.instance.option('rtlEnabled', rtlEnabled);
                this.overflowMenu.click();
                var popup = this.overflowMenu.popup();
                assert.strictEqual(popup.option('height'), 'auto', 'popup.height');
                assert.strictEqual(popup.option('width'), 'auto', 'popup.width');
                assert.strictEqual(popup.option('autoResizeEnabled'), false, 'popup.autoResizeEnabled');
                assert.strictEqual(popup.option('visible'), true, 'popup.visible');
                assert.strictEqual(popup.option('deferRendering'), false, 'popup.deferRendering');
                assert.strictEqual(popup.option('hideOnParentScroll'), true, 'popup.hideOnParentScroll');
                assert.strictEqual(popup.option('shading'), false, 'popup.shading');
                assert.strictEqual(popup.option('dragEnabled'), false, 'popup.dragEnabled');
                assert.strictEqual(popup.option('showTitle'), false, 'popup.showTitle');
                assert.strictEqual(popup.option('_fixWrapperPosition'), true, 'popup._fixWrapperPosition');
                var $__4 = popup.option('position'),
                    my = $__4.my,
                    at = $__4.at,
                    collision = $__4.collision,
                    offset = $__4.offset,
                    of = $__4.of;
                assert.strictEqual(my, ("top " + (rtlEnabled ? 'left' : 'right')), 'popup.position.my');
                assert.strictEqual(at, ("bottom " + (rtlEnabled ? 'left' : 'right')), 'popup.position.at');
                assert.strictEqual(collision, 'fit flip', 'popup.position.collision');
                assert.deepEqual(offset, {v: 3}, 'popup.position.offset');
                assert.deepEqual(of.get(0), this.$element.get(0), 'popup.position.of');
              } finally {
                themes.isMaterial = origIsMaterial;
              }
            });
          });
        });
        QUnit.test('paginateEnabled is false by default', function(assert) {
          this.instance.option({
            dataSource: [1, 2, 3],
            opened: true
          });
          assert.strictEqual(this.overflowMenu.list()._dataSource.paginate(), false, 'paginate is false');
        });
        QUnit.test('the \'onItemRendered\' option should be proxied to the list', function(assert) {
          var onItemRenderedHandler = sinon.stub();
          this.instance.option({
            dataSource: [1, 2],
            onItemRendered: onItemRenderedHandler,
            opened: true
          });
          var itemRenderedCallbackArgs = onItemRenderedHandler.getCall(0).args[0];
          assert.strictEqual(onItemRenderedHandler.callCount, 2, 'onItemRendered was fired');
          assert.strictEqual(this.overflowMenu.list().element(), itemRenderedCallbackArgs.element, 'onItemRendered was fired in the right context');
          assert.strictEqual(this.overflowMenu.list(), itemRenderedCallbackArgs.component, 'onItemRendered was fired in the right context');
        });
      });
      QUnit.module('regression', moduleConfig, function() {
        QUnit.test('B233109: dropDownMenu menu interference', function(assert) {
          this.instance.option({
            items: [{text: 'test1'}],
            opened: true
          });
          var ddMenu2 = new DropDownMenu($('#dropDownMenuSecond'));
          ddMenu2.option({
            items: [{text: 'test2'}],
            opened: true
          });
          var $button2 = $(ddMenu2._button.$element());
          var popup2 = ddMenu2._popup;
          this.overflowMenu.click();
          ddMenu2.option('opened', false);
          assert.equal(this.overflowMenu.popup().option('visible'), false);
          assert.equal(popup2.option('visible'), false);
          this.overflowMenu.$button().trigger('dxpointerdown').trigger('dxclick');
          assert.equal(this.overflowMenu.popup().option('visible'), true);
          assert.equal(popup2.option('visible'), false);
          $button2.trigger('dxpointerdown').trigger('dxclick');
          assert.equal(this.overflowMenu.popup().option('visible'), false);
          assert.equal(popup2.option('visible'), true);
          this.overflowMenu.$button().trigger('dxpointerdown').trigger('dxclick');
          assert.equal(this.overflowMenu.popup().option('visible'), true);
          assert.equal(popup2.option('visible'), false);
          $('#qunit-fixture').trigger('dxpointerdown').trigger('dxclick');
          assert.equal(this.overflowMenu.popup().option('visible'), false);
          assert.equal(popup2.option('visible'), false);
        });
        QUnit.test('B250811 - Cancel item in overflow menu on Android does not work', function(assert) {
          var $__3 = this;
          assert.expect(1);
          this.instance.option({
            items: ['Item 0'],
            onItemClick: function() {
              assert.equal($__3.overflowMenu.popup().option('visible'), false, 'popup hides before onItemClick executed');
            }
          });
          this.overflowMenu.click();
          this.overflowMenu.$items().last().trigger('dxclick');
        });
      });
      QUnit.module('widget sizing render', moduleConfig, function() {
        QUnit.test('constructor', function(assert) {
          var dropDownMenuWidth = 400;
          this.instance.option({
            items: ['Item 0', 'Item 1', 'Item 2'],
            width: dropDownMenuWidth
          });
          this.overflowMenu.click();
          assert.strictEqual(this.instance.option('width'), dropDownMenuWidth);
          assert.strictEqual(getOuterWidth(this.$element), dropDownMenuWidth, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('change width', function(assert) {
          this.instance.option({items: ['Item 0', 'Item 1', 'Item 2']});
          var customWidth = 400;
          this.instance.option('width', customWidth);
          this.overflowMenu.click();
          assert.strictEqual(getOuterWidth(this.$element), customWidth, 'outer width of the element must be equal to custom width');
        });
        QUnit.module('keyboard navigation', {beforeEach: function() {
            this.instance.option({
              items: [1, 2, 3],
              focusStateEnabled: true,
              opened: true
            });
            this.keyboard = keyboardMock(this.overflowMenu.$button());
          }}, function() {
          QUnit.test('list focusStateEnabled option', function(assert) {
            assert.expect(3);
            this.instance.option({focusStateEnabled: false});
            assert.ok(!this.overflowMenu.list().option('focusStateEnabled'));
            this.instance.option('focusStateEnabled', true);
            assert.ok(this.overflowMenu.list().option('focusStateEnabled'));
            var $listItemContainer = this.overflowMenu.$list().find(("." + SCROLLVIEW_CONTENT_CLASS));
            assert.equal($listItemContainer.attr('tabindex'), -1, 'tabindex for list is -1');
          });
          QUnit.test('enter/space keys', function(assert) {
            assert.expect(3);
            this.instance.option('opened', false);
            this.overflowMenu.$button().focusin();
            assert.ok(this.overflowMenu.$button().hasClass(STATE_FOCUSED_CLASS), 'element is focused');
            this.keyboard.keyDown('enter');
            assert.ok(this.overflowMenu.popup().option('visible'));
            this.keyboard.keyDown('space');
            assert.ok(!this.overflowMenu.popup().option('visible'));
          });
          QUnit.test('navigation by arrows', function(assert) {
            assert.expect(4);
            this.instance.option('opened', false);
            this.overflowMenu.$button().focusin();
            this.keyboard.keyDown('enter');
            assert.ok(this.overflowMenu.popup().option('visible'));
            this.keyboard.keyDown('down');
            assert.ok(this.overflowMenu.$items().eq(0).hasClass(STATE_FOCUSED_CLASS), 'first item has focus class');
            this.keyboard.keyDown('down');
            assert.ok(this.overflowMenu.$items().eq(1).hasClass(STATE_FOCUSED_CLASS), 'second item has focus class');
            this.keyboard.keyDown('up');
            assert.ok(this.overflowMenu.$items().eq(0).hasClass(STATE_FOCUSED_CLASS), 'first item has focus class');
          });
          QUnit.test('hide popup on press tab', function(assert) {
            assert.expect(2);
            this.instance.option('opened', false);
            this.overflowMenu.$button().focusin();
            this.keyboard.keyDown('enter');
            assert.ok(this.overflowMenu.popup().option('visible'));
            this.keyboard.keyDown('tab');
            assert.ok(!this.overflowMenu.popup().option('visible'));
          });
          QUnit.test('Enter or space press should call onItemClick (T318240)', function(assert) {
            var itemClicked = 0;
            this.instance.option('onItemClick', function() {
              itemClicked++;
            });
            this.instance.option('opened', false);
            this.overflowMenu.$button().focusin();
            this.keyboard.keyDown('enter');
            this.keyboard.keyDown('down');
            this.keyboard.keyDown('enter');
            this.keyboard.keyDown('enter');
            this.keyboard.keyDown('down');
            this.keyboard.keyDown('space');
            assert.equal(itemClicked, 2, 'item was clicked twice');
          });
          QUnit.test('No exceptions on \'tab\' key pressing when popup is not opened', function(assert) {
            assert.expect(0);
            this.instance.option({focusStateEnabled: true});
            var keyboard = keyboardMock(this.$element);
            keyboard.keyDown('tab');
          });
        });
      });
      QUnit.module('\'opened\' option', moduleConfig, function() {
        QUnit.test('Default option value', function(assert) {
          assert.strictEqual(this.instance.option('opened'), false, 'Option\'s default value is correct');
        });
        QUnit.test('Change menu visibility by option \'opened\' change', function(assert) {
          this.instance.option('opened', true);
          assert.ok($(document.body).find('.dx-overlay-wrapper').length, 'Correctly opened by option change');
          this.instance.option('opened', false);
          assert.ok(!$(document.body).find('.dx-overlay-wrapper').length, 'Correctly closed by option change');
        });
        QUnit.test('option opened should change after button click', function(assert) {
          this.overflowMenu.click();
          assert.ok(this.instance.option('opened'), 'option opened change to true');
        });
      });
      QUnit.module('aria accessibility', moduleConfig, function() {
        QUnit.test('aria role for widget', function(assert) {
          assert.strictEqual(this.$element.attr('role'), 'button');
        });
        QUnit.test('aria-haspopup for widget', function(assert) {
          assert.strictEqual(this.$element.attr('aria-haspopup'), 'true');
        });
        QUnit.test('aria role for widget after Popup opening (T1157065)', function(assert) {
          this.instance.option({items: [1, 2, 3]});
          this.overflowMenu.click();
          assert.strictEqual(this.$element.attr('role'), 'button');
        });
        QUnit.test('aria role for section container (T1157065)', function(assert) {
          this.instance.option({items: [1, 2, 3]});
          this.overflowMenu.click();
          assert.strictEqual(this.overflowMenu.$popupContent().find(("." + SCROLLVIEW_CONTENT_CLASS)).attr('role'), 'menu');
        });
        QUnit.test('aria role for list items', function(assert) {
          this.instance.option({
            items: [1, 2, 3],
            opened: true
          });
          this.overflowMenu.click();
          assert.strictEqual(this.$element.find('.dx-list-item:first').attr('role'), 'menuitem');
        });
        QUnit.test('aria-activedescendant on widget should point to focused list item', function(assert) {
          this.instance.option({
            items: [1, 2, 3],
            opened: true
          });
          this.overflowMenu.click();
          var $listItem = this.$element.find('.dx-list-item:first');
          this.overflowMenu.click();
          var list = this.overflowMenu.list();
          list.option('focusedElement', $listItem);
          var $listItemContainer = list.$element().find(("." + SCROLLVIEW_CONTENT_CLASS));
          assert.notEqual($listItemContainer.attr('aria-activedescendant'), undefined);
          assert.strictEqual($listItemContainer.attr('aria-activedescendant'), $listItem.attr('id'));
        });
        QUnit.test('aria-expanded property', function(assert) {
          this.instance.option({items: [1, 2, 3]});
          assert.strictEqual(this.$element.attr('aria-expanded'), 'false', 'collapsed by default');
          this.overflowMenu.click();
          assert.strictEqual(this.$element.attr('aria-expanded'), 'true', 'expanded after click');
          this.overflowMenu.click();
          assert.strictEqual(this.$element.attr('aria-expanded'), 'false', 'collapsed after click');
          this.overflowMenu.click();
          assert.strictEqual(this.$element.attr('aria-expanded'), 'true', 'expanded after option change');
          var $listItem = $(this.overflowMenu.$popupContent().find('.dx-list-item').first());
          $($listItem).trigger('dxclick');
          assert.strictEqual(this.$element.attr('aria-expanded'), 'false', 'collapsed after item click');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","data/array_store","animation/fx","ui/button","ui/popup","ui/toolbar/internal/ui.toolbar.menu","ui/toolbar/internal/ui.toolbar.menu.list","../../helpers/executeAsyncMock.js","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","core/config","data/data_source/data_source","core/utils/type","ui/themes","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("data/array_store"), require("animation/fx"), require("ui/button"), require("ui/popup"), require("ui/toolbar/internal/ui.toolbar.menu"), require("ui/toolbar/internal/ui.toolbar.menu.list"), require("../../helpers/executeAsyncMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("core/config"), require("data/data_source/data_source"), require("core/utils/type"), require("ui/themes"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.menu.tests.js.map