!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/diagram/ui.diagram.menu_helper.js"], ["../../core/renderer","../../core/utils/icon"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/diagram/ui.diagram.menu_helper.js", ["../../core/renderer", "../../core/utils/icon"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _icon = $__require("../../core/utils/icon");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  var DIAGRAM_CONTEXT_MENU_CLASS = 'dx-diagram-contextmenu';
  var DiagramMenuHelper = {
    getContextMenuItemTemplate: function getContextMenuItemTemplate(contextMenu, itemData, itemIndex, itemElement) {
      var $itemElement = (0, _renderer.default)(itemElement);
      $itemElement.empty();
      var itemKey = itemData.rootCommand !== undefined ? itemData.rootCommand : -1;
      if (itemData.icon && !itemData.checked) {
        var $iconElement = (0, _icon.getImageContainer)(itemData.icon);
        $itemElement.append($iconElement);
      } else if (contextMenu._menuHasCheckedItems && contextMenu._menuHasCheckedItems[itemKey] === true) {
        var $checkElement = (0, _icon.getImageContainer)('check');
        $checkElement.css('visibility', !itemData.checked ? 'hidden' : 'visible');
        $itemElement.append($checkElement);
      }
      $itemElement.append('<span class="dx-menu-item-text">' + itemData.text + '</span>');
      if (Array.isArray(itemData.items) && itemData.items.length > 0) {
        $itemElement.append('<span class="dx-menu-item-popout-container"><div class="dx-menu-item-popout"></div></span>');
      }
    },
    getContextMenuCssClass: function getContextMenuCssClass() {
      return DIAGRAM_CONTEXT_MENU_CLASS;
    },
    onContextMenuItemClick: function onContextMenuItemClick(widget, itemData, actionHandler) {
      if ((itemData.command !== undefined || itemData.name !== undefined) && (!Array.isArray(itemData.items) || !itemData.items.length)) {
        var parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData);
        actionHandler.call(this, itemData.command, itemData.name, parameter);
      } else if (itemData.rootCommand !== undefined && itemData.value !== undefined) {
        var _parameter = DiagramMenuHelper.getItemCommandParameter(widget, itemData, itemData.value);
        actionHandler.call(this, itemData.rootCommand, undefined, _parameter);
      }
    },
    getItemValue: function getItemValue(item) {
      return _typeof(item.value) === 'object' ? JSON.stringify(item.value) : item.value;
    },
    getItemOptionText: function getItemOptionText(contextMenu, indexPath) {
      if (contextMenu) {
        indexPath = indexPath.slice();
        var parentItemOptionText = this._getParentItemOptionText(indexPath);
        if (contextMenu._originalItemsInfo && contextMenu._originalItemsInfo[parentItemOptionText]) {
          indexPath[indexPath.length - 1] += contextMenu._originalItemsInfo[parentItemOptionText].indexPathCorrection;
        }
      }
      return this._getItemOptionTextCore(indexPath);
    },
    _getParentItemOptionText: function _getParentItemOptionText(indexPath) {
      var parentIndexPath = indexPath.slice(0, indexPath.length - 1);
      return this._getItemOptionTextCore(parentIndexPath);
    },
    _getItemOptionTextCore: function _getItemOptionTextCore(indexPath) {
      return indexPath.reduce(function (r, i) {
        return r + "items[".concat(i, "].");
      }, '');
    },
    getItemCommandParameter: function getItemCommandParameter(widget, item, value) {
      if (item.getParameter) {
        return item.getParameter(widget);
      }
      return value;
    },
    updateContextMenuItems: function updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
      var _this = this;
      if (!contextMenu._originalItemsInfo) {
        contextMenu._originalItemsInfo = {};
      }
      if (!contextMenu._originalItemsInfo[itemOptionText]) {
        contextMenu._originalItemsInfo[itemOptionText] = {
          items: contextMenu.option(itemOptionText + 'items') || []
        };
      }
      items = items.map(function (item) {
        return {
          'value': _this.getItemValue(item),
          'text': item.text,
          'checked': item.checked,
          'widget': contextMenu,
          'rootCommand': rootCommandKey
        };
      });
      var originalItems = contextMenu._originalItemsInfo[itemOptionText].items;
      contextMenu.option(itemOptionText + 'items', items.concat(originalItems));
      if (contextMenu._originalItemsInfo[itemOptionText] && originalItems.length) {
        contextMenu._originalItemsInfo[itemOptionText].indexPathCorrection = items.length;
      }
    },
    updateContextMenuItemVisible: function updateContextMenuItemVisible(contextMenu, itemOptionText, visible) {
      contextMenu.option(itemOptionText + 'visible', visible);
    },
    updateContextMenuItemValue: function updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
      var items = contextMenu.option(itemOptionText + 'items');
      if (typeof value === 'boolean' && (!items || !items.length)) {
        this._setContextMenuHasCheckedItems(contextMenu, -1);
        contextMenu.option(itemOptionText + 'checked', value);
      } else if (value !== undefined) {
        this._setContextMenuHasCheckedItems(contextMenu, rootCommandKey);
        if (Array.isArray(items)) {
          items.forEach(function (item, index) {
            item.checked = item.value === value;
          });
        }
      }
    },
    _setContextMenuHasCheckedItems: function _setContextMenuHasCheckedItems(contextMenu, key) {
      if (!contextMenu._menuHasCheckedItems) {
        contextMenu._menuHasCheckedItems = {};
      }
      contextMenu._menuHasCheckedItems[key] = true;
    }
  };
  var _default = DiagramMenuHelper;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/icon"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/icon"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.diagram.menu_helper.js.map