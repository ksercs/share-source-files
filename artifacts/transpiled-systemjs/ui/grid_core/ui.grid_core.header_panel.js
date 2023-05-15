!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.header_panel.js"], ["../../core/renderer","../toolbar","./ui.grid_core.columns_view","../../core/utils/common","../../core/utils/type","../../localization/message","../../core/utils/extend","../../core/utils/data"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.header_panel.js", ["../../core/renderer", "../toolbar", "./ui.grid_core.columns_view", "../../core/utils/common", "../../core/utils/type", "../../localization/message", "../../core/utils/extend", "../../core/utils/data"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.headerPanelModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _toolbar = _interopRequireDefault($__require("../toolbar"));
  var _uiGrid_core = $__require("./ui.grid_core.columns_view");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _extend = $__require("../../core/utils/extend");
  var _data = $__require("../../core/utils/data");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var HEADER_PANEL_CLASS = 'header-panel';
  var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
  var TOOLBAR_ARIA_LABEL = '-ariaToolbar';
  var DEFAULT_TOOLBAR_ITEM_NAMES = ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'];

  /**
   * @type {Partial<import('./ui.grid_core.header_panel').HeaderPanel>}
   */
  var members = {
    _getToolbarItems: function _getToolbarItems() {
      return [];
    },
    _getButtonContainer: function _getButtonContainer() {
      return (0, _renderer.default)('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
    },
    _getToolbarButtonClass: function _getToolbarButtonClass(specificClass) {
      var secondClass = specificClass ? ' ' + specificClass : '';
      return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
    },
    _getToolbarOptions: function _getToolbarOptions() {
      var userToolbarOptions = this.option('toolbar');
      var options = {
        toolbarOptions: {
          items: this._getToolbarItems(),
          visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
          disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
          onItemRendered: function onItemRendered(e) {
            var itemRenderedCallback = e.itemData.onItemRendered;
            if (itemRenderedCallback) {
              itemRenderedCallback(e);
            }
          }
        }
      };
      var userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
      options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
      this.executeAction('onToolbarPreparing', options);
      if (options.toolbarOptions && !(0, _type.isDefined)(options.toolbarOptions.visible)) {
        var toolbarItems = options.toolbarOptions.items;
        options.toolbarOptions.visible = !!(toolbarItems !== null && toolbarItems !== void 0 && toolbarItems.length);
      }
      return options.toolbarOptions;
    },
    _normalizeToolbarItems: function _normalizeToolbarItems(defaultItems, userItems) {
      defaultItems.forEach(function (button) {
        // @ts-expect-error
        if (!DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
          throw new Error("Default toolbar item '".concat(button.name, "' is not added to DEFAULT_TOOLBAR_ITEM_NAMES"));
        }
      });
      var defaultProps = {
        location: 'after'
      };
      var isArray = Array.isArray(userItems);
      if (!(0, _type.isDefined)(userItems)) {
        return defaultItems;
      }
      if (!isArray) {
        // @ts-expect-error
        userItems = [userItems];
      }
      var defaultButtonsByNames = {};
      defaultItems.forEach(function (button) {
        defaultButtonsByNames[button.name] = button;
      });

      // @ts-expect-error
      var normalizedItems = userItems.map(function (button) {
        if ((0, _type.isString)(button)) {
          button = {
            name: button
          };
        }
        if ((0, _type.isDefined)(button.name)) {
          if ((0, _type.isDefined)(defaultButtonsByNames[button.name])) {
            button = (0, _extend.extend)(true, {}, defaultButtonsByNames[button.name], button);
          } else if (DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
            button = _extends({}, button, {
              visible: false
            });
          }
        }
        return (0, _extend.extend)(true, {}, defaultProps, button);
      });
      return isArray ? normalizedItems : normalizedItems[0];
    },
    _renderCore: function _renderCore() {
      if (!this._toolbar) {
        var $headerPanel = this.element();
        $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
        var label = _message.default.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
        var $toolbar = (0, _renderer.default)('<div>').attr('aria-label', label).appendTo($headerPanel);
        this._toolbar = this._createComponent($toolbar, _toolbar.default, this._toolbarOptions);
      } else {
        this._toolbar.option(this._toolbarOptions);
      }
    },
    _columnOptionChanged: _common.noop,
    _handleDataChanged: function _handleDataChanged() {
      if (this._requireReady) {
        this.render();
      }
    },
    init: function init() {
      this.callBase();
      this.createAction('onToolbarPreparing', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    render: function render() {
      this._toolbarOptions = this._getToolbarOptions();
      this.callBase.apply(this, arguments);
    },
    setToolbarItemDisabled: function setToolbarItemDisabled(name, optionValue) {
      var toolbarInstance = this._toolbar;
      if (toolbarInstance) {
        var items = toolbarInstance.option('items') || [];
        var itemIndex = items.indexOf(items.filter(function (item) {
          return item.name === name;
        })[0]);
        if (itemIndex >= 0) {
          var itemOptionPrefix = 'items[' + itemIndex + ']';
          if (toolbarInstance.option(itemOptionPrefix + '.options')) {
            toolbarInstance.option(itemOptionPrefix + '.options.disabled', optionValue);
          } else {
            toolbarInstance.option(itemOptionPrefix + '.disabled', optionValue);
          }
        }
      }
    },
    updateToolbarDimensions: function updateToolbarDimensions() {
      var _this$_toolbar;
      // @ts-expect-error
      (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 ? void 0 : _this$_toolbar.updateDimensions();
    },
    getHeaderPanel: function getHeaderPanel() {
      return this.element();
    },
    getHeight: function getHeight() {
      return this.getElementHeight();
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'onToolbarPreparing') {
        this._invalidate();
        args.handled = true;
      }
      if (args.name === 'toolbar') {
        args.handled = true;
        if (this._toolbar) {
          var parts = (0, _data.getPathParts)(args.fullName);
          var optionName = args.fullName.replace(/^toolbar\./, '');
          if (parts.length === 1) {
            // `toolbar` case
            var toolbarOptions = this._getToolbarOptions();
            this._toolbar.option(toolbarOptions);
          } else if (parts[1] === 'items') {
            if (parts.length === 2) {
              // `toolbar.items` case
              var _toolbarOptions = this._getToolbarOptions();
              this._toolbar.option('items', _toolbarOptions.items);
            } else if (parts.length === 3) {
              // `toolbar.items[i]` case
              var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);
              this._toolbar.option(optionName, normalizedItem);
            } else if (parts.length >= 4) {
              // `toolbar.items[i].prop` case
              this._toolbar.option(optionName, args.value);
            }
          } else {
            // `toolbar.visible`, `toolbar.disabled` case
            this._toolbar.option(optionName, args.value);
          }
        }
      }
      this.callBase(args);
    },
    isVisible: function isVisible() {
      return !!(this._toolbarOptions && this._toolbarOptions.visible);
    },
    allowDragging: _common.noop,
    hasGroupedColumns: _common.noop
  };
  var HeaderPanel = _uiGrid_core.ColumnsView.inherit(members);

  /**
   * @type {import('./ui.grid_core.modules').Module}
   */
  var headerPanelModule = {
    defaultOptions: function defaultOptions() {
      return {};
    },
    views: {
      headerPanel: HeaderPanel
    },
    extenders: {
      controllers: {
        resizing: {
          _updateDimensionsCore: function _updateDimensionsCore() {
            this.callBase.apply(this, arguments);
            this.getView('headerPanel').updateToolbarDimensions();
          }
        }
      }
    }
  };
  exports.headerPanelModule = headerPanelModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../toolbar","./ui.grid_core.columns_view","../../core/utils/common","../../core/utils/type","../../localization/message","../../core/utils/extend","../../core/utils/data"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../toolbar"), require("./ui.grid_core.columns_view"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../localization/message"), require("../../core/utils/extend"), require("../../core/utils/data"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.header_panel.js.map