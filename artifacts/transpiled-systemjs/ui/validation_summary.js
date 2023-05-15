!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/validation_summary.js"], ["../core/component_registrator","../events/core/events_engine","../core/utils/common","../core/utils/extend","../core/utils/iterator","./validation_engine","./collection/ui.collection_widget.edit"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/validation_summary.js", ["../core/component_registrator", "../events/core/events_engine", "../core/utils/common", "../core/utils/extend", "../core/utils/iterator", "./validation_engine", "./collection/ui.collection_widget.edit"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _common = $__require("../core/utils/common");
  var _extend = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _validation_engine = _interopRequireDefault($__require("./validation_engine"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
  var ITEM_CLASS = VALIDATION_SUMMARY_CLASS + '-item';
  var ITEM_DATA_KEY = VALIDATION_SUMMARY_CLASS + '-item-data';
  var ValidationSummary = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
        * @name dxValidationSummaryOptions.focusStateEnabled
        * @hidden
        */
        focusStateEnabled: false,
        /**
        * @name dxValidationSummaryOptions.noDataText
        * @hidden
        */
        noDataText: null

        // Ignore comments
        /**
        * @name dxValidationSummaryOptions.dataSource
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.itemRender
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.activeStateEnabled
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.disabled
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.hint
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.itemHoldTimeout
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.rtlEnabled
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.selectedIndex
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.selectedItem
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.selectedItemKeys
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.keyExpr
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.visible
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.width
        * @hidden
        */
        /**
        * @name dxValidationSummaryOptions.height
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.onItemHold
        * @hidden
        * @action
        */

        /**
        * @name dxValidationSummaryOptions.onItemRendered
        * @hidden
        * @action
        */

        /**
        * @name dxValidationSummaryOptions.onItemSelect
        * @hidden
        * @action
        */
        /**
        * @name dxValidationSummaryOptions.onSelectionChanged
        * @hidden
        * @action
        */

        /**
        * @name dxValidationSummaryOptions.onItemContextMenu
        * @hidden
        * @action
        */

        /**
        * @name dxValidationSummaryOptions.accessKey
        * @hidden
        */

        /**
        * @name dxValidationSummaryOptions.tabIndex
        * @hidden
        */
      });
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        validationGroup: true
      });
    },
    _init: function _init() {
      this.callBase();
      this._initGroupRegistration();
    },
    _initGroupRegistration: function _initGroupRegistration() {
      var $element = this.$element();
      var group = this.option('validationGroup') || _validation_engine.default.findGroup($element, this._modelByElement($element));
      var groupConfig = _validation_engine.default.addGroup(group);
      this._unsubscribeGroup();
      this._groupWasInit = true;
      this._validationGroup = group;
      this.groupSubscription = this._groupValidationHandler.bind(this);
      groupConfig.on('validated', this.groupSubscription);
    },
    _unsubscribeGroup: function _unsubscribeGroup() {
      var groupConfig = _validation_engine.default.getGroupConfig(this._validationGroup);
      groupConfig && groupConfig.off('validated', this.groupSubscription);
    },
    _getOrderedItems: function _getOrderedItems(validators, items) {
      var orderedItems = [];
      (0, _iterator.each)(validators, function (_, validator) {
        var foundItems = (0, _common.grep)(items, function (item) {
          if (item.validator === validator) {
            return true;
          }
        });
        if (foundItems.length) {
          orderedItems = orderedItems.concat(foundItems);
        }
      });
      return orderedItems;
    },
    _groupValidationHandler: function _groupValidationHandler(params) {
      var _this = this;
      var items = this._getOrderedItems(params.validators, (0, _iterator.map)(params.brokenRules, function (rule) {
        return {
          text: rule.message,
          validator: rule.validator,
          index: rule.index
        };
      }));
      this.validators = params.validators;
      (0, _iterator.each)(this.validators, function (_, validator) {
        if (validator._validationSummary !== _this) {
          var handler = _this._itemValidationHandler.bind(_this);
          var disposingHandler = function disposingHandler() {
            validator.off('validated', handler);
            validator._validationSummary = null;
            handler = null;
          };
          validator.on('validated', handler);
          validator.on('disposing', disposingHandler);
          validator._validationSummary = _this;
        }
      });
      this.option('items', items);
    },
    _itemValidationHandler: function _itemValidationHandler(_ref) {
      var isValid = _ref.isValid,
          validator = _ref.validator,
          brokenRules = _ref.brokenRules;
      var items = this.option('items');
      var itemsChanged = false;
      var itemIndex = 0;
      var _loop = function _loop() {
        var item = items[itemIndex];
        if (item.validator === validator) {
          var foundRule = (0, _common.grep)(brokenRules || [], function (rule) {
            return rule.index === item.index;
          })[0];
          if (isValid || !foundRule) {
            items.splice(itemIndex, 1);
            itemsChanged = true;
            return "continue";
          }
          if (foundRule.message !== item.text) {
            item.text = foundRule.message;
            itemsChanged = true;
          }
        }
        itemIndex++;
      };
      while (itemIndex < items.length) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
      (0, _iterator.each)(brokenRules, function (_, rule) {
        var foundItem = (0, _common.grep)(items, function (item) {
          return item.validator === validator && item.index === rule.index;
        })[0];
        if (!foundItem) {
          items.push({
            text: rule.message,
            validator: validator,
            index: rule.index
          });
          itemsChanged = true;
        }
      });
      if (itemsChanged) {
        items = this._getOrderedItems(this.validators, items);
        this.option('items', items);
      }
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(VALIDATION_SUMMARY_CLASS);
      this.callBase();
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'validationGroup':
          this._initGroupRegistration();
          break;
        default:
          this.callBase(args);
      }
    },
    _itemClass: function _itemClass() {
      return ITEM_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return ITEM_DATA_KEY;
    },
    _postprocessRenderItem: function _postprocessRenderItem(params) {
      _events_engine.default.on(params.itemElement, 'click', function () {
        params.itemData.validator && params.itemData.validator.focus && params.itemData.validator.focus();
      });
    },
    _dispose: function _dispose() {
      this.callBase();
      this._unsubscribeGroup();
    },
    refreshValidationGroup: function refreshValidationGroup() {
      this._initGroupRegistration();
    }
    /**
    * @name dxValidationSummary.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */
    /**
    * @name dxValidationSummary.getDataSource
    * @publicName getDataSource()
    * @hidden
    */
    /**
    * @name dxValidationSummary.focus
    * @publicName focus()
    * @hidden
    */
  });
  (0, _component_registrator.default)('dxValidationSummary', ValidationSummary);
  var _default = ValidationSummary;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/component_registrator","../events/core/events_engine","../core/utils/common","../core/utils/extend","../core/utils/iterator","./validation_engine","./collection/ui.collection_widget.edit"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/component_registrator"), require("../events/core/events_engine"), require("../core/utils/common"), require("../core/utils/extend"), require("../core/utils/iterator"), require("./validation_engine"), require("./collection/ui.collection_widget.edit"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validation_summary.js.map