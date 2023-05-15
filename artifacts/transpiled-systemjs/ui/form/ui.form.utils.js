!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/form/ui.form.utils.js"], ["../../core/utils/type","../../core/utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/form/ui.form.utils.js", ["../../core/utils/type", "../../core/utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.concatPaths = void 0;
  exports.convertToLayoutManagerOptions = convertToLayoutManagerOptions;
  exports.tryGetTabPath = exports.isFullPathContainsTabs = exports.isEqualToDataFieldOrNameOrTitleOrCaption = exports.getTextWithoutSpaces = exports.getOptionNameFromFullName = exports.getItemPath = exports.getFullOptionName = exports.createItemPathByIndex = void 0;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var createItemPathByIndex = function createItemPathByIndex(index, isTabs) {
    return "".concat(isTabs ? 'tabs' : 'items', "[").concat(index, "]");
  };
  exports.createItemPathByIndex = createItemPathByIndex;
  var concatPaths = function concatPaths(path1, path2) {
    if ((0, _type.isDefined)(path1) && (0, _type.isDefined)(path2)) {
      return "".concat(path1, ".").concat(path2);
    }
    return path1 || path2;
  };
  exports.concatPaths = concatPaths;
  var getTextWithoutSpaces = function getTextWithoutSpaces(text) {
    return text ? text.replace(/\s/g, '') : undefined;
  };
  exports.getTextWithoutSpaces = getTextWithoutSpaces;
  var isEqualToDataFieldOrNameOrTitleOrCaption = function isEqualToDataFieldOrNameOrTitleOrCaption(item, fieldName) {
    if (item) {
      return item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || item.itemType === 'group' && getTextWithoutSpaces(item.caption) === fieldName;
    }
    return false;
  };
  exports.isEqualToDataFieldOrNameOrTitleOrCaption = isEqualToDataFieldOrNameOrTitleOrCaption;
  var getFullOptionName = function getFullOptionName(path, optionName) {
    return "".concat(path, ".").concat(optionName);
  };
  exports.getFullOptionName = getFullOptionName;
  var getOptionNameFromFullName = function getOptionNameFromFullName(fullName) {
    var parts = fullName.split('.');
    return parts[parts.length - 1].replace(/\[\d+]/, '');
  };
  exports.getOptionNameFromFullName = getOptionNameFromFullName;
  var tryGetTabPath = function tryGetTabPath(fullPath) {
    var pathParts = fullPath.split('.');
    var resultPathParts = _toConsumableArray(pathParts);
    for (var i = pathParts.length - 1; i >= 0; i--) {
      if (isFullPathContainsTabs(pathParts[i])) {
        return resultPathParts.join('.');
      }
      resultPathParts.splice(i, 1);
    }
    return '';
  };
  exports.tryGetTabPath = tryGetTabPath;
  var isFullPathContainsTabs = function isFullPathContainsTabs(fullPath) {
    return fullPath.indexOf('tabs') > -1;
  };
  exports.isFullPathContainsTabs = isFullPathContainsTabs;
  var getItemPath = function getItemPath(items, item, isTabs) {
    var index = items.indexOf(item);
    if (index > -1) {
      return createItemPathByIndex(index, isTabs);
    }
    for (var i = 0; i < items.length; i++) {
      var targetItem = items[i];
      var tabOrGroupItems = targetItem.tabs || targetItem.items;
      if (tabOrGroupItems) {
        var itemPath = getItemPath(tabOrGroupItems, item, targetItem.tabs);
        if (itemPath) {
          return concatPaths(createItemPathByIndex(i, isTabs), itemPath);
        }
      }
    }
  };
  exports.getItemPath = getItemPath;
  function convertToLayoutManagerOptions(_ref) {
    var form = _ref.form,
        $formElement = _ref.$formElement,
        formOptions = _ref.formOptions,
        items = _ref.items,
        validationGroup = _ref.validationGroup,
        extendedLayoutManagerOptions = _ref.extendedLayoutManagerOptions,
        onFieldDataChanged = _ref.onFieldDataChanged,
        onContentReady = _ref.onContentReady,
        onDisposing = _ref.onDisposing,
        onFieldItemRendered = _ref.onFieldItemRendered;
    var baseOptions = {
      form: form,
      items: items,
      $formElement: $formElement,
      validationGroup: validationGroup,
      onFieldDataChanged: onFieldDataChanged,
      onContentReady: onContentReady,
      onDisposing: onDisposing,
      onFieldItemRendered: onFieldItemRendered,
      validationBoundary: formOptions.scrollingEnabled ? $formElement : undefined,
      scrollingEnabled: formOptions.scrollingEnabled,
      showRequiredMark: formOptions.showRequiredMark,
      showOptionalMark: formOptions.showOptionalMark,
      requiredMark: formOptions.requiredMark,
      optionalMark: formOptions.optionalMark,
      requiredMessage: formOptions.requiredMessage,
      screenByWidth: formOptions.screenByWidth,
      layoutData: formOptions.formData,
      labelLocation: formOptions.labelLocation,
      customizeItem: formOptions.customizeItem,
      minColWidth: formOptions.minColWidth,
      showColonAfterLabel: formOptions.showColonAfterLabel,
      onEditorEnterKey: formOptions.onEditorEnterKey,
      labelMode: formOptions.labelMode
    };

    // cannot use '=' because 'extend' makes special assingment
    var result = (0, _extend.extend)(baseOptions, {
      isRoot: extendedLayoutManagerOptions.isRoot,
      colCount: extendedLayoutManagerOptions.colCount,
      alignItemLabels: extendedLayoutManagerOptions.alignItemLabels,
      cssItemClass: extendedLayoutManagerOptions.cssItemClass,
      colCountByScreen: extendedLayoutManagerOptions.colCountByScreen,
      onLayoutChanged: extendedLayoutManagerOptions.onLayoutChanged,
      width: extendedLayoutManagerOptions.width
    });
    return result;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.form.utils.js.map