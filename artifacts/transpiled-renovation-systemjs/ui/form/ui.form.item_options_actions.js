!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/form/ui.form.item_options_actions.js"], ["./ui.form.item_option_action","../../core/element_data","../../core/utils/extend","./ui.form.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/form/ui.form.item_options_actions.js", ["./ui.form.item_option_action", "../../core/element_data", "../../core/utils/extend", "./ui.form.utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _uiForm = _interopRequireDefault($__require("./ui.form.item_option_action"));
  var _element_data = $__require("../../core/element_data");
  var _extend = $__require("../../core/utils/extend");
  var _uiForm2 = $__require("./ui.form.utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var WidgetOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction) {
    _inheritsLoose(WidgetOptionItemOptionAction, _ItemOptionAction);
    function WidgetOptionItemOptionAction() {
      return _ItemOptionAction.apply(this, arguments) || this;
    }
    var _proto = WidgetOptionItemOptionAction.prototype;
    _proto.tryExecute = function tryExecute() {
      var value = this._options.value;
      var instance = this.findInstance();
      if (instance) {
        instance.option(value);
        return true;
      }
      return false;
    };
    return WidgetOptionItemOptionAction;
  }(_uiForm.default);
  var TabOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction2) {
    _inheritsLoose(TabOptionItemOptionAction, _ItemOptionAction2);
    function TabOptionItemOptionAction() {
      return _ItemOptionAction2.apply(this, arguments) || this;
    }
    var _proto2 = TabOptionItemOptionAction.prototype;
    _proto2.tryExecute = function tryExecute() {
      var tabPanel = this.findInstance();
      if (tabPanel) {
        var _this$_options = this._options,
            optionName = _this$_options.optionName,
            item = _this$_options.item,
            value = _this$_options.value;
        var itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item);
        if (itemIndex >= 0) {
          tabPanel.option((0, _uiForm2.getFullOptionName)("items[".concat(itemIndex, "]"), optionName), value);
          return true;
        }
      }
      return false;
    };
    return TabOptionItemOptionAction;
  }(_uiForm.default);
  var SimpleItemTemplateChangedAction = /*#__PURE__*/function (_ItemOptionAction3) {
    _inheritsLoose(SimpleItemTemplateChangedAction, _ItemOptionAction3);
    function SimpleItemTemplateChangedAction() {
      return _ItemOptionAction3.apply(this, arguments) || this;
    }
    var _proto3 = SimpleItemTemplateChangedAction.prototype;
    _proto3.tryExecute = function tryExecute() {
      return false;
    };
    return SimpleItemTemplateChangedAction;
  }(_uiForm.default);
  var GroupItemTemplateChangedAction = /*#__PURE__*/function (_ItemOptionAction4) {
    _inheritsLoose(GroupItemTemplateChangedAction, _ItemOptionAction4);
    function GroupItemTemplateChangedAction() {
      return _ItemOptionAction4.apply(this, arguments) || this;
    }
    var _proto4 = GroupItemTemplateChangedAction.prototype;
    _proto4.tryExecute = function tryExecute() {
      var preparedItem = this.findPreparedItem();
      if (preparedItem != null && preparedItem._prepareGroupItemTemplate && preparedItem._renderGroupContentTemplate) {
        preparedItem._prepareGroupItemTemplate(this._options.item.template);
        preparedItem._renderGroupContentTemplate();
        return true;
      }
      return false;
    };
    return GroupItemTemplateChangedAction;
  }(_uiForm.default);
  var TabsOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction5) {
    _inheritsLoose(TabsOptionItemOptionAction, _ItemOptionAction5);
    function TabsOptionItemOptionAction() {
      return _ItemOptionAction5.apply(this, arguments) || this;
    }
    var _proto5 = TabsOptionItemOptionAction.prototype;
    _proto5.tryExecute = function tryExecute() {
      var tabPanel = this.findInstance();
      if (tabPanel) {
        var value = this._options.value;
        tabPanel.option('dataSource', value);
        return true;
      }
      return false;
    };
    return TabsOptionItemOptionAction;
  }(_uiForm.default);
  var ValidationRulesItemOptionAction = /*#__PURE__*/function (_ItemOptionAction6) {
    _inheritsLoose(ValidationRulesItemOptionAction, _ItemOptionAction6);
    function ValidationRulesItemOptionAction() {
      return _ItemOptionAction6.apply(this, arguments) || this;
    }
    var _proto6 = ValidationRulesItemOptionAction.prototype;
    _proto6.tryExecute = function tryExecute() {
      var item = this._options.item;
      var instance = this.findInstance();
      var validator = instance && (0, _element_data.data)(instance.$element()[0], 'dxValidator');
      if (validator && item) {
        var filterRequired = function filterRequired(item) {
          return item.type === 'required';
        };
        var oldContainsRequired = (validator.option('validationRules') || []).some(filterRequired);
        var newContainsRequired = (item.validationRules || []).some(filterRequired);
        if (!oldContainsRequired && !newContainsRequired || oldContainsRequired && newContainsRequired) {
          validator.option('validationRules', item.validationRules);
          return true;
        }
      }
      return false;
    };
    return ValidationRulesItemOptionAction;
  }(_uiForm.default);
  var CssClassItemOptionAction = /*#__PURE__*/function (_ItemOptionAction7) {
    _inheritsLoose(CssClassItemOptionAction, _ItemOptionAction7);
    function CssClassItemOptionAction() {
      return _ItemOptionAction7.apply(this, arguments) || this;
    }
    var _proto7 = CssClassItemOptionAction.prototype;
    _proto7.tryExecute = function tryExecute() {
      var $itemContainer = this.findItemContainer();
      var _this$_options2 = this._options,
          previousValue = _this$_options2.previousValue,
          value = _this$_options2.value;
      if ($itemContainer) {
        $itemContainer.removeClass(previousValue).addClass(value);
        return true;
      }
      return false;
    };
    return CssClassItemOptionAction;
  }(_uiForm.default);
  var tryCreateItemOptionAction = function tryCreateItemOptionAction(optionName, itemActionOptions) {
    switch (optionName) {
      case 'editorOptions': // SimpleItem/#editorOptions
      case 'buttonOptions':
        // ButtonItem/#buttonOptions
        return new WidgetOptionItemOptionAction(itemActionOptions);
      case 'validationRules':
        // SimpleItem/#validationRules
        return new ValidationRulesItemOptionAction(itemActionOptions);
      case 'cssClass':
        // ButtonItem/#cssClass or EmptyItem/#cssClass or GroupItem/#cssClass or SimpleItem/#cssClass or TabbedItem/#cssClass
        return new CssClassItemOptionAction(itemActionOptions);
      case 'badge': // TabbedItem/tabs/#badge
      case 'disabled': // TabbedItem/tabs/#disabled
      case 'icon': // TabbedItem/tabs/#icon
      case 'tabTemplate': // TabbedItem/tabs/#tabTemplate
      case 'title':
        // TabbedItem/tabs/#title
        return new TabOptionItemOptionAction((0, _extend.extend)(itemActionOptions, {
          optionName: optionName
        }));
      case 'tabs':
        // TabbedItem/tabs
        return new TabsOptionItemOptionAction(itemActionOptions);
      case 'template':
        {
          var _itemActionOptions$it, _itemActionOptions$it2, _itemActionOptions$it3;
          // TabbedItem/tabs/#template or SimpleItem/#template or GroupItem/#template
          var itemType = (_itemActionOptions$it = itemActionOptions === null || itemActionOptions === void 0 ? void 0 : (_itemActionOptions$it2 = itemActionOptions.item) === null || _itemActionOptions$it2 === void 0 ? void 0 : _itemActionOptions$it2.itemType) !== null && _itemActionOptions$it !== void 0 ? _itemActionOptions$it : (_itemActionOptions$it3 = itemActionOptions.itemsRunTimeInfo.findPreparedItemByItem(itemActionOptions === null || itemActionOptions === void 0 ? void 0 : itemActionOptions.item)) === null || _itemActionOptions$it3 === void 0 ? void 0 : _itemActionOptions$it3.itemType;
          if (itemType === 'simple') {
            return new SimpleItemTemplateChangedAction(itemActionOptions);
          } else if (itemType === 'group') {
            return new GroupItemTemplateChangedAction(itemActionOptions);
          }
          return new TabOptionItemOptionAction((0, _extend.extend)(itemActionOptions, {
            optionName: optionName
          }));
        }
      default:
        return null;
    }
  };
  var _default = tryCreateItemOptionAction;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./ui.form.item_option_action","../../core/element_data","../../core/utils/extend","./ui.form.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./ui.form.item_option_action"), require("../../core/element_data"), require("../../core/utils/extend"), require("./ui.form.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.form.item_options_actions.js.map