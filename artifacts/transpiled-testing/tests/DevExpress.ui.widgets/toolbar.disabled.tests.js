!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/toolbar.disabled.tests.js"], ["jquery","ui/toolbar","ui/toolbar/ui.toolbar.base","events/core/events_engine","ui/button_group","ui/text_box","generic_light.css!","ui/button","ui/drop_down_button","ui/tabs","ui/autocomplete","ui/date_box","ui/menu","core/devices","animation/fx"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/toolbar.disabled.tests.js", ["jquery", "ui/toolbar", "ui/toolbar/ui.toolbar.base", "events/core/events_engine", "ui/button_group", "ui/text_box", "generic_light.css!", "ui/button", "ui/drop_down_button", "ui/tabs", "ui/autocomplete", "ui/date_box", "ui/menu", "core/devices", "animation/fx"], function($__export) {
  "use strict";
  var $,
      eventsEngine,
      devices,
      fx,
      moduleConfig,
      getItemElement,
      getDropDownMenu,
      openDropDownMenuIfExist;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }],
    execute: function() {
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          fx.off = true;
          this.$fixture = $('#qunit-fixture');
          this.$element = $('<div></div>');
          this.$element.appendTo(this.$fixture);
          this.createInstance = function(options) {
            $__3.toolbar = $__3.$element.dxToolbar(options).dxToolbar('instance');
          };
        },
        afterEach: function() {
          fx.off = false;
          this.$element.dxToolbar('instance').dispose();
          this.$element.remove();
          delete this.$element;
        }
      };
      getItemElement = function(toolbar, itemElementSelector) {
        var dropDownMenu = getDropDownMenu(toolbar);
        return dropDownMenu ? $(dropDownMenu._popup._$content).find(itemElementSelector) : $(toolbar.element()).find(itemElementSelector);
      };
      getDropDownMenu = function(toolbar) {
        var dropDownMenu = toolbar._layoutStrategy._menu;
        if (dropDownMenu) {
          return dropDownMenu;
        }
      };
      openDropDownMenuIfExist = function(toolbar) {
        var dropDownMenu = getDropDownMenu(toolbar);
        if (dropDownMenu) {
          dropDownMenu.option('opened', true);
        }
      };
      ['never', 'always'].forEach(function(locateInMenu) {
        if (devices.real().deviceType !== 'desktop') {
          return;
        }
        [{
          widget: 'dxButton',
          focusableElementSelector: '.dx-button:not(.dx-dropdownmenu-button)'
        }, {
          widget: 'dxTextBox',
          focusableElementSelector: '.dx-textbox .dx-texteditor-input'
        }, {
          widget: 'dxSelectBox',
          focusableElementSelector: '.dx-selectbox .dx-texteditor-input'
        }, {
          widget: 'dxDropDownButton',
          focusableElementSelector: '.dx-dropdownbutton .dx-buttongroup'
        }].forEach(function($__4) {
          var $__5 = $__4,
              widget = $__5.widget,
              focusableElementSelector = $__5.focusableElementSelector;
          QUnit.module(("Disabled state: locateInMenu: " + locateInMenu + ", widget: " + widget), moduleConfig, function() {
            var itemClickHandler = sinon.spy();
            var buttonClickHandler = sinon.spy();
            var getExpectedDisabledState = function(toolbarDisabled, itemDisabled, itemOptionsDisabled) {
              return [{
                toolbarDisabled: true,
                itemDisabled: true,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: true,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: true,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: true,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: true,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: true,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: false,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: false,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: false,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: false,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: false,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: false,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: undefined,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: undefined,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: undefined,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: undefined,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: 'not declared',
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: 'not declared',
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: 'not declared',
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: true,
                itemDisabled: 'not declared',
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: true,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: true,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: true,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: true,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: true,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: false,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: false,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: false,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: false,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: undefined,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: undefined,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: undefined,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: undefined,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: 'not declared',
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: 'not declared',
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: 'not declared',
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: false,
                itemDisabled: 'not declared',
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: true,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: true,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: true,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: true,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: true,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: true,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: false,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: false,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: false,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: false,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: false,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: undefined,
                  item: undefined,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: false,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: undefined,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: undefined,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: undefined,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: undefined,
                  item: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: undefined,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: 'not declared',
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: 'not declared',
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: 'not declared',
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: undefined,
                  item: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: undefined,
                itemDisabled: 'not declared',
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: true,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: true,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: true,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: true,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: true,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: false,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: false,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: false,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  item: undefined,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: false,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: false,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: undefined,
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: undefined,
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: undefined,
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  item: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: undefined,
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: 'not declared',
                itemOptionsDisabled: true,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: true
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: 'not declared',
                itemOptionsDisabled: false,
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: false
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: 'not declared',
                itemOptionsDisabled: undefined,
                expectedDisabled: {
                  toolbar: false,
                  item: undefined,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }, {
                toolbarDisabled: 'not declared',
                itemDisabled: 'not declared',
                itemOptionsDisabled: 'not declared',
                expectedDisabled: {
                  toolbar: false,
                  itemDisabled: undefined,
                  itemOptionsDisabled: undefined
                }
              }].filter(function(config) {
                return (config.toolbarDisabled === toolbarDisabled && config.itemDisabled === itemDisabled && config.itemOptionsDisabled === itemOptionsDisabled);
              })[0].expectedDisabled;
            };
            var checkClickHandlers = function($item, toolbarDisabled, itemDisabled, itemOptionsDisabled) {
              itemClickHandler.reset();
              buttonClickHandler.reset();
              eventsEngine.trigger($item, 'dxclick');
              QUnit.assert.strictEqual(itemClickHandler.callCount, itemDisabled || toolbarDisabled ? 0 : 1, ("onItemClick " + itemClickHandler.callCount));
              QUnit.assert.strictEqual(buttonClickHandler.callCount, itemOptionsDisabled || itemDisabled || toolbarDisabled ? 0 : 1, ("onButtonClick " + buttonClickHandler.callCount));
            };
            var checkFocusableElementTabIndex = function(focusableElement, widgetName, expectedDisabled) {
              var expectedFocusableElementTabIndex = expectedDisabled.itemOptionsDisabled || expectedDisabled.itemDisabled || expectedDisabled.toolbar ? -1 : 0;
              QUnit.assert.strictEqual(focusableElement.tabIndex, expectedFocusableElementTabIndex, (widgetName + ".tabIndex"));
            };
            var checkDisabledState = function(toolbar, widgetName, toolbarDisabled, itemDisabled, itemOptionsDisabled, focusableElementSelector) {
              var $element = $(toolbar.element());
              var expectedDisabled = getExpectedDisabledState(toolbarDisabled, itemDisabled, itemOptionsDisabled);
              QUnit.assert.strictEqual(toolbar.option('disabled'), expectedDisabled.toolbar, 'toolbar.disabled');
              QUnit.assert.strictEqual($element.hasClass('dx-state-disabled'), !!expectedDisabled.toolbar, 'toolbar disabled class');
              var itemElementSelector = focusableElementSelector.split(' ')[0];
              var $item = getItemElement(toolbar, itemElementSelector);
              var $toolbarMenu = $element.find('.dx-dropdownmenu-button');
              if ($toolbarMenu.length) {
                QUnit.assert.strictEqual($toolbarMenu.hasClass('dx-state-disabled'), !!expectedDisabled.toolbar, 'menu button disabled class');
              }
              var $itemElement = $item.parent().parent();
              QUnit.assert.strictEqual($itemElement.hasClass('dx-state-disabled'), !!expectedDisabled.itemDisabled, 'toolbar item disabled class');
              QUnit.assert.strictEqual(toolbar.option('items')[0].disabled, expectedDisabled.itemDisabled, 'item.disabled');
              var itemDisabledOption = toolbar.option('items')[0].options && toolbar.option('items')[0].options.disabled;
              QUnit.assert.strictEqual(itemDisabledOption, expectedDisabled.itemOptionsDisabled, 'item.options.disabled');
              QUnit.assert.strictEqual($item.hasClass('dx-state-disabled'), !!expectedDisabled.itemOptionsDisabled, (widgetName + " disabled class"));
              checkFocusableElementTabIndex(getItemElement(toolbar, focusableElementSelector).get(0), widgetName, expectedDisabled);
              if (widgetName === 'dxButton') {
                checkClickHandlers($item, expectedDisabled.toolbar, expectedDisabled.itemDisabled, expectedDisabled.itemOptionsDisabled);
              }
            };
            [true, false, 'not declared'].forEach(function(isToolbarDisabled) {
              [true, false, 'not declared'].forEach(function(isItemOptionsDisabled) {
                [true, false, 'not declared'].forEach(function(isItemDisabled) {
                  var initialTestConfig = ("Toolbar.disabled=" + isToolbarDisabled + ", items[].disabled=" + isItemDisabled + ", items[].options.disabled=" + isItemOptionsDisabled);
                  var getInitialToolbarOptions = function() {
                    var initialToolbarOptions = {items: [{
                        location: 'after',
                        locateInMenu: locateInMenu,
                        widget: widget,
                        options: {}
                      }]};
                    if (widget === 'dxButton') {
                      initialToolbarOptions.onItemClick = itemClickHandler;
                      initialToolbarOptions.items[0].options.onClick = buttonClickHandler;
                    }
                    if (isToolbarDisabled !== 'not declared') {
                      initialToolbarOptions.disabled = isToolbarDisabled;
                    }
                    if (isItemDisabled !== 'not declared') {
                      initialToolbarOptions.items[0].disabled = isItemDisabled;
                    }
                    if (isItemOptionsDisabled !== 'not declared') {
                      initialToolbarOptions.items[0].options.disabled = isItemOptionsDisabled;
                    }
                    return initialToolbarOptions;
                  };
                  QUnit.test(("Nested widgets, " + initialTestConfig), function() {
                    this.createInstance(getInitialToolbarOptions());
                    openDropDownMenuIfExist(this.toolbar);
                    checkDisabledState(this.toolbar, widget, isToolbarDisabled, isItemDisabled, isItemOptionsDisabled, focusableElementSelector);
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: items[].options.disabled -> toolbar.disabled -> items[].disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isItemOptionsDisabled;
                    }).forEach(function(newItemOptionsDisabled) {
                      $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                      currentItemOptionsDisabledState = newItemOptionsDisabled;
                      openDropDownMenuIfExist($__3.toolbar);
                      checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                      [true, false, undefined].filter(function(value) {
                        return value !== isToolbarDisabled;
                      }).forEach(function(newToolbarDisabled) {
                        $__3.toolbar.option('disabled', newToolbarDisabled);
                        currentToolbarDisabledState = newToolbarDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newItemDisabled) {
                          $__3.toolbar.option('items[0].disabled', newItemDisabled);
                          currentItemDisabledState = newItemDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: items[].options.disabled -> items[].disabled -> toolbar.disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isItemOptionsDisabled;
                    }).forEach(function(newItemOptionsDisabled) {
                      $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                      currentItemOptionsDisabledState = newItemOptionsDisabled;
                      [true, false, undefined].filter(function(value) {
                        return value !== isItemDisabled;
                      }).forEach(function(newItemDisabled) {
                        $__3.toolbar.option('items[0].disabled', newItemDisabled);
                        currentItemDisabledState = newItemDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newToolbarDisabled) {
                          $__3.toolbar.option('disabled', newToolbarDisabled);
                          currentToolbarDisabledState = newToolbarDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: toolbar.disabled -> items[].options.disabled -> items[].disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isToolbarDisabled;
                    }).forEach(function(newToolbarDisabled) {
                      $__3.toolbar.option('disabled', newToolbarDisabled);
                      currentToolbarDisabledState = newToolbarDisabled;
                      openDropDownMenuIfExist($__3.toolbar);
                      checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                      [true, false, undefined].filter(function(value) {
                        return value !== isItemOptionsDisabled;
                      }).forEach(function(newItemOptionsDisabled) {
                        $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                        currentItemOptionsDisabledState = newItemOptionsDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newItemDisabled) {
                          $__3.toolbar.option('items[0].disabled', newItemDisabled);
                          currentItemDisabledState = newItemDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: toolbar.disabled -> items[].disabled -> items[].options.disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isToolbarDisabled;
                    }).forEach(function(newToolbarDisabled) {
                      $__3.toolbar.option('disabled', newToolbarDisabled);
                      currentToolbarDisabledState = newToolbarDisabled;
                      [true, false, undefined].filter(function(value) {
                        return value !== isItemOptionsDisabled;
                      }).forEach(function(newItemOptionsDisabled) {
                        $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                        currentItemOptionsDisabledState = newItemOptionsDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newItemDisabled) {
                          $__3.toolbar.option('items[0].disabled', newItemDisabled);
                          currentItemDisabledState = newItemDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: items[].disabled -> toolbar.disabled -> items[].options.disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isItemDisabled;
                    }).forEach(function(newItemDisabled) {
                      $__3.toolbar.option('items[0].disabled', newItemDisabled);
                      currentItemDisabledState = newItemDisabled;
                      openDropDownMenuIfExist($__3.toolbar);
                      checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                      [true, false, undefined].filter(function(value) {
                        return value !== isToolbarDisabled;
                      }).forEach(function(newToolbarDisabled) {
                        $__3.toolbar.option('disabled', newToolbarDisabled);
                        currentToolbarDisabledState = newToolbarDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newItemOptionsDisabled) {
                          $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                          currentItemOptionsDisabledState = newItemOptionsDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                  QUnit.test(("Nested widgets, " + initialTestConfig + " -> change order: items[].disabled -> items[].options.disabled -> toolbar.disabled"), function() {
                    var $__3 = this;
                    this.createInstance(getInitialToolbarOptions());
                    var currentToolbarDisabledState = isToolbarDisabled;
                    var currentItemOptionsDisabledState = isItemOptionsDisabled;
                    var currentItemDisabledState = isItemDisabled;
                    [true, false, undefined].filter(function(value) {
                      return value !== isItemDisabled;
                    }).forEach(function(newItemDisabled) {
                      $__3.toolbar.option('items[0].disabled', newItemDisabled);
                      currentItemDisabledState = newItemDisabled;
                      [true, false, undefined].filter(function(value) {
                        return value !== isItemOptionsDisabled;
                      }).forEach(function(newItemOptionsDisabled) {
                        $__3.toolbar.option('items[0].options.disabled', newItemOptionsDisabled);
                        currentItemOptionsDisabledState = newItemOptionsDisabled;
                        openDropDownMenuIfExist($__3.toolbar);
                        checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        [true, false, undefined].forEach(function(newToolbarDisabled) {
                          $__3.toolbar.option('disabled', newToolbarDisabled);
                          currentToolbarDisabledState = newToolbarDisabled;
                          openDropDownMenuIfExist($__3.toolbar);
                          checkDisabledState($__3.toolbar, widget, currentToolbarDisabledState, currentItemDisabledState, currentItemOptionsDisabledState, focusableElementSelector);
                        });
                      });
                    });
                  });
                });
              });
            });
            QUnit.test(("Restore default " + widget + " tabIndex value on change toolbar.items[i].disabled, locateInMenu: " + locateInMenu), function(assert) {
              var initialToolbarOptions = {items: [{
                  location: 'before',
                  widget: widget,
                  locateInMenu: locateInMenu,
                  options: {tabIndex: 2}
                }]};
              this.createInstance(initialToolbarOptions);
              openDropDownMenuIfExist(this.toolbar);
              var $item = getItemElement(this.toolbar, focusableElementSelector);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
              this.toolbar.option('items[0].disabled', true);
              assert.strictEqual($item.attr('tabIndex'), '-1', 'tabIndex');
              this.toolbar.option('items[0].disabled', false);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
            });
            QUnit.test(("Restore default " + widget + " tabIndex value on change toolbar.disabled, locateInMenu: " + locateInMenu), function(assert) {
              var initialToolbarOptions = {items: [{
                  location: 'before',
                  widget: widget,
                  locateInMenu: locateInMenu,
                  options: {tabIndex: 2}
                }]};
              this.createInstance(initialToolbarOptions);
              openDropDownMenuIfExist(this.toolbar);
              var $item = getItemElement(this.toolbar, focusableElementSelector);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
              this.toolbar.option('disabled', true);
              assert.strictEqual($item.attr('tabIndex'), '-1', 'tabIndex');
              this.toolbar.option('disabled', false);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
            });
            QUnit.test(("Restore default " + widget + " tabIndex value on change toolbar.disabled.items[i].options.disabled, locateInMenu: " + locateInMenu), function(assert) {
              var initialToolbarOptions = {items: [{
                  location: 'before',
                  widget: widget,
                  locateInMenu: locateInMenu,
                  options: {tabIndex: 2}
                }]};
              this.createInstance(initialToolbarOptions);
              openDropDownMenuIfExist(this.toolbar);
              var $item = getItemElement(this.toolbar, focusableElementSelector);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
              this.toolbar.option('items[0].options.disabled', true);
              $item = getItemElement(this.toolbar, focusableElementSelector);
              assert.strictEqual($item.attr('tabIndex'), '-1', 'tabIndex');
              this.toolbar.option('items[0].options.disabled', false);
              $item = getItemElement(this.toolbar, focusableElementSelector);
              assert.strictEqual($item.attr('tabIndex'), '2', 'tabIndex');
            });
          });
        });
        QUnit.module(("Editor state: locateInMenu: " + locateInMenu), moduleConfig, function() {
          QUnit.test('Changing toolbar.items[i].options.disabled does not save the current value in selectbox', function(assert) {
            var initialToolbarOptions = {items: [{
                location: 'before',
                widget: 'dxSelectBox',
                cssClass: 'my-test-selectbox',
                locateInMenu: locateInMenu,
                options: {
                  items: ['item1', 'item2'],
                  value: 'item1'
                }
              }]};
            this.createInstance(initialToolbarOptions);
            openDropDownMenuIfExist(this.toolbar);
            var $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var selectBox = $selectBox.dxSelectBox('instance');
            selectBox.option('value', 'item2');
            assert.equal(selectBox.option('value'), 'item2', 'selectbox state is right');
            this.toolbar.option('items[0].options.disabled', true);
            $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var $selectBoxDisabledContainer = $selectBox.closest('.my-test-selectbox');
            assert.ok(!$selectBoxDisabledContainer.hasClass('dx-state-disabled'), 'button option changed');
            var selectBoxDisabled = $selectBox.dxSelectBox('instance');
            assert.equal(selectBoxDisabled.option('value'), 'item1', 'selectbox state saved');
          });
          QUnit.test('Changing toolbar.disable saves the current value in selectbox', function(assert) {
            var initialToolbarOptions = {items: [{
                location: 'before',
                widget: 'dxSelectBox',
                cssClass: 'my-test-selectbox',
                locateInMenu: locateInMenu,
                options: {
                  items: ['item1', 'item2'],
                  value: 'item1'
                }
              }]};
            this.createInstance(initialToolbarOptions);
            openDropDownMenuIfExist(this.toolbar);
            var $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var selectBox = $selectBox.dxSelectBox('instance');
            selectBox.option('value', 'item2');
            assert.equal(selectBox.option('value'), 'item2', 'selectbox state is right');
            this.toolbar.option('disabled', true);
            $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var $selectBoxDisabledContainer = $selectBox.closest('.my-test-selectbox');
            assert.ok(!$selectBoxDisabledContainer.hasClass('dx-state-disabled'), 'button option changed');
            var selectBoxDisabled = $selectBox.dxSelectBox('instance');
            assert.equal(selectBoxDisabled.option('value'), 'item2', 'selectbox state saved');
          });
          QUnit.test('Changing toolbar.items[i].disabled saves the current value in selectbox', function(assert) {
            var initialToolbarOptions = {items: [{
                location: 'before',
                widget: 'dxSelectBox',
                cssClass: 'my-test-selectbox',
                locateInMenu: locateInMenu,
                options: {
                  items: ['item1', 'item2'],
                  value: 'item1'
                }
              }]};
            this.createInstance(initialToolbarOptions);
            openDropDownMenuIfExist(this.toolbar);
            var $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var selectBox = $selectBox.dxSelectBox('instance');
            selectBox.option('value', 'item2');
            assert.equal(selectBox.option('value'), 'item2', 'selectbox state is right');
            this.toolbar.option('items[0].disabled', true);
            $selectBox = getItemElement(this.toolbar, '.dx-selectbox');
            var $selectBoxDisabledContainer = $selectBox.closest('.my-test-selectbox');
            assert.ok($selectBoxDisabledContainer.hasClass('dx-state-disabled'), 'button option changed');
            var selectBoxDisabled = $selectBox.dxSelectBox('instance');
            assert.equal(selectBoxDisabled.option('value'), 'item2', 'selectbox state saved');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/toolbar","ui/toolbar/ui.toolbar.base","events/core/events_engine","ui/button_group","ui/text_box","generic_light.css!","ui/button","ui/drop_down_button","ui/tabs","ui/autocomplete","ui/date_box","ui/menu","core/devices","animation/fx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/toolbar"), require("ui/toolbar/ui.toolbar.base"), require("events/core/events_engine"), require("ui/button_group"), require("ui/text_box"), require("generic_light.css!"), require("ui/button"), require("ui/drop_down_button"), require("ui/tabs"), require("ui/autocomplete"), require("ui/date_box"), require("ui/menu"), require("core/devices"), require("animation/fx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.disabled.tests.js.map