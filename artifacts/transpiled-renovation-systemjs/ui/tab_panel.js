!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/tab_panel.js"], ["../core/utils/size","../core/renderer","../core/utils/support","../core/utils/extend","../core/devices","../core/dom_adapter","../core/component_registrator","./multi_view","./tabs","./tab_panel/item","../core/utils/icon","../core/element","../core/utils/type","../core/templates/bindable_template","../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/tab_panel.js", ["../core/utils/size", "../core/renderer", "../core/utils/support", "../core/utils/extend", "../core/devices", "../core/dom_adapter", "../core/component_registrator", "./multi_view", "./tabs", "./tab_panel/item", "../core/utils/icon", "../core/element", "../core/utils/type", "../core/templates/bindable_template", "../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _support = $__require("../core/utils/support");
  var _extend = $__require("../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _multi_view = _interopRequireDefault($__require("./multi_view"));
  var _tabs = _interopRequireDefault($__require("./tabs"));
  var _item = _interopRequireDefault($__require("./tab_panel/item"));
  var _icon = $__require("../core/utils/icon");
  var _element = $__require("../core/element");
  var _type = $__require("../core/utils/type");
  var _bindable_template = $__require("../core/templates/bindable_template");
  var _window = $__require("../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE tabPanel

  var TABPANEL_CLASS = 'dx-tabpanel';
  var TABPANEL_TABS_CLASS = 'dx-tabpanel-tabs';
  var TABPANEL_CONTAINER_CLASS = 'dx-tabpanel-container';
  var TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
  var DISABLED_FOCUSED_TAB_CLASS = 'dx-disabled-focused-tab';
  var TabPanel = _multi_view.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        itemTitleTemplate: 'title',
        hoverStateEnabled: true,
        showNavButtons: false,
        scrollByContent: true,
        scrollingEnabled: true,
        onTitleClick: null,
        onTitleHold: null,
        onTitleRendered: null,
        badgeExpr: function badgeExpr(data) {
          return data ? data.badge : undefined;
        }

        /**
        * @name dxTabPanelItem.visible
        * @hidden
        */
      });
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          return !_support.touch;
        },
        options: {
          swipeEnabled: false
        }
      }, {
        device: {
          platform: 'generic'
        },
        options: {
          animationEnabled: false
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this.$element().addClass(TABPANEL_CLASS);
      this.setAria('role', 'tabpanel');
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._createTitleActions();
      this._renderLayout();
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      this._templateManager.addDefaultTemplates({
        title: new _bindable_template.BindableTemplate(function ($container, data) {
          if ((0, _type.isPlainObject)(data)) {
            var $iconElement = (0, _icon.getImageContainer)(data.icon);
            if ($iconElement) {
              $container.append($iconElement);
            }
            if ((0, _type.isDefined)(data.title) && !(0, _type.isPlainObject)(data.title)) {
              $container.append(_dom_adapter.default.createTextNode(data.title));
            }
          } else {
            if ((0, _type.isDefined)(data)) {
              $container.text(String(data));
            }
          }
          $container.wrapInner((0, _renderer.default)('<span>').addClass(TABS_ITEM_TEXT_CLASS));
        }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
      });
    },
    _createTitleActions: function _createTitleActions() {
      this._createTitleClickAction();
      this._createTitleHoldAction();
      this._createTitleRenderedAction();
    },
    _createTitleClickAction: function _createTitleClickAction() {
      this._titleClickAction = this._createActionByOption('onTitleClick');
    },
    _createTitleHoldAction: function _createTitleHoldAction() {
      this._titleHoldAction = this._createActionByOption('onTitleHold');
    },
    _createTitleRenderedAction: function _createTitleRenderedAction() {
      this._titleRenderedAction = this._createActionByOption('onTitleRendered');
    },
    _renderContent: function _renderContent() {
      var that = this;
      this.callBase();
      if (this.option('templatesRenderAsynchronously')) {
        this._resizeEventTimer = setTimeout(function () {
          that._updateLayout();
        }, 0);
      }
    },
    _renderLayout: function _renderLayout() {
      if (this._tabs) {
        this._updateLayout();
        return;
      }
      var $element = this.$element();
      this._$tabContainer = (0, _renderer.default)('<div>').addClass(TABPANEL_TABS_CLASS).appendTo($element);
      var $tabs = (0, _renderer.default)('<div>').appendTo(this._$tabContainer);
      this._tabs = this._createComponent($tabs, _tabs.default, this._tabConfig());
      this._$container = (0, _renderer.default)('<div>').addClass(TABPANEL_CONTAINER_CLASS).appendTo($element);
      this._$container.append(this._$wrapper);
      this._updateLayout();
    },
    _updateLayout: function _updateLayout() {
      if ((0, _window.hasWindow)()) {
        var tabsHeight = (0, _size.getOuterHeight)(this._$tabContainer);
        this._$container.css({
          'marginTop': -tabsHeight,
          'paddingTop': tabsHeight
        });
      }
    },
    _refreshActiveDescendant: function _refreshActiveDescendant() {
      if (!this._tabs) {
        return;
      }
      var tabs = this._tabs;
      var tabItems = tabs.itemElements();
      var $activeTab = (0, _renderer.default)(tabItems[tabs.option('selectedIndex')]);
      var id = this.getFocusedItemId();
      this.setAria('controls', undefined, (0, _renderer.default)(tabItems));
      this.setAria('controls', id, $activeTab);
    },
    _tabConfig: function _tabConfig() {
      return {
        selectOnFocus: true,
        focusStateEnabled: this.option('focusStateEnabled'),
        hoverStateEnabled: this.option('hoverStateEnabled'),
        repaintChangesOnly: this.option('repaintChangesOnly'),
        tabIndex: this.option('tabIndex'),
        selectedIndex: this.option('selectedIndex'),
        badgeExpr: this.option('badgeExpr'),
        onItemClick: this._titleClickAction.bind(this),
        onItemHold: this._titleHoldAction.bind(this),
        itemHoldTimeout: this.option('itemHoldTimeout'),
        onSelectionChanged: function (e) {
          this.option('selectedIndex', e.component.option('selectedIndex'));
          this._refreshActiveDescendant();
        }.bind(this),
        onItemRendered: this._titleRenderedAction.bind(this),
        itemTemplate: this._getTemplateByOption('itemTitleTemplate'),
        items: this.option('items'),
        noDataText: null,
        scrollingEnabled: this.option('scrollingEnabled'),
        scrollByContent: this.option('scrollByContent'),
        showNavButtons: this.option('showNavButtons'),
        itemTemplateProperty: 'tabTemplate',
        loopItemFocus: this.option('loop'),
        selectionRequired: true,
        onOptionChanged: function (args) {
          if (args.name === 'focusedElement') {
            if (args.value) {
              var $value = (0, _renderer.default)(args.value);
              var $newItem = this._itemElements().eq($value.index());
              this.option('focusedElement', (0, _element.getPublicElement)($newItem));
            } else {
              this.option('focusedElement', args.value);
            }
          }
        }.bind(this),
        onFocusIn: function (args) {
          this._focusInHandler(args.event);
        }.bind(this),
        onFocusOut: function (args) {
          if (!this._isFocusOutHandlerExecuting) {
            this._focusOutHandler(args.event);
          }
        }.bind(this)
      };
    },
    _renderFocusTarget: function _renderFocusTarget() {
      this._focusTarget().attr('tabIndex', -1);
    },
    _toggleWrapperFocusedClass: function _toggleWrapperFocusedClass(isFocused) {
      this._toggleFocusClass(isFocused, this._$wrapper);
    },
    _toggleDisabledFocusedClass: function _toggleDisabledFocusedClass(isFocused) {
      this._focusTarget().toggleClass(DISABLED_FOCUSED_TAB_CLASS, isFocused);
    },
    _updateFocusState: function _updateFocusState(e, isFocused) {
      this.callBase(e, isFocused);
      var isTabsTarget = e.target === this._tabs._focusTarget().get(0);
      var isMultiViewTarget = e.target === this._focusTarget().get(0);
      if (isTabsTarget) {
        this._toggleFocusClass(isFocused, this._focusTarget());
      }
      if (isTabsTarget || isMultiViewTarget) {
        var isDisabled = this._isDisabled(this.option('focusedElement'));
        this._toggleWrapperFocusedClass(isFocused && !isDisabled);
        this._toggleDisabledFocusedClass(isFocused && isDisabled);
      }
      if (isMultiViewTarget) {
        this._toggleFocusClass(isFocused, this._tabs.option('focusedElement'));
      }
    },
    _focusOutHandler: function _focusOutHandler(e) {
      this._isFocusOutHandlerExecuting = true;
      this.callBase.apply(this, arguments);
      this._tabs._focusOutHandler(e);
      this._isFocusOutHandlerExecuting = false;
    },
    _setTabsOption: function _setTabsOption(name, value) {
      if (this._tabs) {
        this._tabs.option(name, value);
      }
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._tabs._dimensionChanged();
        this._updateLayout();
      }
    },
    registerKeyHandler: function registerKeyHandler(key, handler) {
      this.callBase(key, handler);
      if (this._tabs) {
        this._tabs.registerKeyHandler(key, handler);
      }
    },
    repaint: function repaint() {
      this.callBase();
      this._tabs.repaint();
    },
    _optionChanged: function _optionChanged(args) {
      var name = args.name;
      var value = args.value;
      var fullName = args.fullName;
      switch (name) {
        case 'dataSource':
          this.callBase(args);
          break;
        case 'items':
          this._setTabsOption(name, this.option(name));
          this._updateLayout();
          if (!this.option('repaintChangesOnly')) {
            this._tabs.repaint();
          }
          this.callBase(args);
          break;
        case 'width':
          this.callBase(args);
          this._tabs.repaint();
          break;
        case 'selectedIndex':
        case 'selectedItem':
          {
            this._setTabsOption(fullName, value);
            this.callBase(args);
            if (this.option('focusStateEnabled') === true) {
              var selectedIndex = this.option('selectedIndex');
              var selectedTabContent = this._itemElements().eq(selectedIndex);
              this.option('focusedElement', (0, _element.getPublicElement)(selectedTabContent));
            }
            break;
          }
        case 'itemHoldTimeout':
        case 'focusStateEnabled':
        case 'hoverStateEnabled':
          this._setTabsOption(fullName, value);
          this.callBase(args);
          break;
        case 'scrollingEnabled':
        case 'scrollByContent':
        case 'showNavButtons':
          this._setTabsOption(fullName, value);
          break;
        case 'focusedElement':
          {
            var id = value ? (0, _renderer.default)(value).index() : value;
            var newItem = value ? this._tabs._itemElements().eq(id) : value;
            this._setTabsOption('focusedElement', (0, _element.getPublicElement)(newItem));
            var isDisabled = this._isDisabled(value);
            this._toggleWrapperFocusedClass(!isDisabled);
            this._toggleDisabledFocusedClass(isDisabled);
            this.callBase(args);
            break;
          }
        case 'itemTitleTemplate':
          this._setTabsOption('itemTemplate', this._getTemplateByOption('itemTitleTemplate'));
          break;
        case 'onTitleClick':
          this._createTitleClickAction();
          this._setTabsOption('onItemClick', this._titleClickAction.bind(this));
          break;
        case 'onTitleHold':
          this._createTitleHoldAction();
          this._setTabsOption('onItemHold', this._titleHoldAction.bind(this));
          break;
        case 'onTitleRendered':
          this._createTitleRenderedAction();
          this._setTabsOption('onItemRendered', this._titleRenderedAction.bind(this));
          break;
        case 'loop':
          this._setTabsOption('loopItemFocus', value);
          break;
        case 'badgeExpr':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    },
    _clean: function _clean() {
      clearTimeout(this._resizeEventTimer);
      this.callBase();
    }
  });
  TabPanel.ItemClass = _item.default;
  (0, _component_registrator.default)('dxTabPanel', TabPanel);
  var _default = TabPanel;
  /**
   * @name dxTabPanelItem
   * @inherits dxMultiViewItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/utils/support","../core/utils/extend","../core/devices","../core/dom_adapter","../core/component_registrator","./multi_view","./tabs","./tab_panel/item","../core/utils/icon","../core/element","../core/utils/type","../core/templates/bindable_template","../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/utils/support"), require("../core/utils/extend"), require("../core/devices"), require("../core/dom_adapter"), require("../core/component_registrator"), require("./multi_view"), require("./tabs"), require("./tab_panel/item"), require("../core/utils/icon"), require("../core/element"), require("../core/utils/type"), require("../core/templates/bindable_template"), require("../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tab_panel.js.map