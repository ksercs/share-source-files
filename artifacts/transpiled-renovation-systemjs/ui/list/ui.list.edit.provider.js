!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/list/ui.list.edit.provider.js"], ["../../core/renderer","../../core/utils/common","../../core/class","../../core/utils/extend","../../core/utils/iterator","../widget/ui.errors","./ui.list.edit.decorator_registry"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/list/ui.list.edit.provider.js", ["../../core/renderer", "../../core/utils/common", "../../core/class", "../../core/utils/extend", "../../core/utils/iterator", "../widget/ui.errors", "./ui.list.edit.decorator_registry"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _common = $__require("../../core/utils/common");
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _uiListEdit = $__require("./ui.list.edit.decorator_registry");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var editOptionsRegistry = [];
  var registerOption = function registerOption(enabledFunc, decoratorTypeFunc, decoratorSubTypeFunc) {
    editOptionsRegistry.push({
      enabled: enabledFunc,
      decoratorType: decoratorTypeFunc,
      decoratorSubType: decoratorSubTypeFunc
    });
  };

  // NOTE: option registration order does matter
  registerOption(function () {
    return this.option('menuItems').length;
  }, function () {
    return 'menu';
  }, function () {
    return this.option('menuMode');
  });
  registerOption(function () {
    return !this.option('menuItems').length && this.option('allowItemDeleting');
  }, function () {
    var mode = this.option('itemDeleteMode');
    return mode === 'toggle' || mode === 'slideButton' || mode === 'swipe' || mode === 'static' ? 'delete' : 'menu';
  }, function () {
    var mode = this.option('itemDeleteMode');
    if (mode === 'slideItem') {
      mode = 'slide';
    }
    return mode;
  });
  registerOption(function () {
    return this.option('selectionMode') !== 'none' && this.option('showSelectionControls');
  }, function () {
    return 'selection';
  }, function () {
    return 'default';
  });
  registerOption(function () {
    return this.option('itemDragging.allowReordering') || this.option('itemDragging.allowDropInsideItem') || this.option('itemDragging.group');
  }, function () {
    return 'reorder';
  }, function () {
    return 'default';
  });
  var LIST_ITEM_BEFORE_BAG_CLASS = 'dx-list-item-before-bag';
  var LIST_ITEM_AFTER_BAG_CLASS = 'dx-list-item-after-bag';
  var DECORATOR_BEFORE_BAG_CREATE_METHOD = 'beforeBag';
  var DECORATOR_AFTER_BAG_CREATE_METHOD = 'afterBag';
  var DECORATOR_MODIFY_ELEMENT_METHOD = 'modifyElement';
  var DECORATOR_AFTER_RENDER_METHOD = 'afterRender';
  var DECORATOR_GET_EXCLUDED_SELECTORS_METHOD = 'getExcludedSelectors';
  var EditProvider = _class.default.inherit({
    ctor: function ctor(list) {
      this._list = list;
      this._fetchRequiredDecorators();
    },
    dispose: function dispose() {
      if (this._decorators && this._decorators.length) {
        (0, _iterator.each)(this._decorators, function (_, decorator) {
          decorator.dispose();
        });
      }
    },
    _fetchRequiredDecorators: function _fetchRequiredDecorators() {
      this._decorators = [];
      (0, _iterator.each)(editOptionsRegistry, function (_, option) {
        var optionEnabled = option.enabled.call(this._list);
        if (optionEnabled) {
          var decoratorType = option.decoratorType.call(this._list);
          var decoratorSubType = option.decoratorSubType.call(this._list);
          var decorator = this._createDecorator(decoratorType, decoratorSubType);
          this._decorators.push(decorator);
        }
      }.bind(this));
    },
    _createDecorator: function _createDecorator(type, subType) {
      var decoratorClass = this._findDecorator(type, subType);
      return new decoratorClass(this._list);
    },
    _findDecorator: function _findDecorator(type, subType) {
      var _registry$type;
      var foundDecorator = (_registry$type = _uiListEdit.registry[type]) === null || _registry$type === void 0 ? void 0 : _registry$type[subType];
      if (!foundDecorator) {
        throw _ui.default.Error('E1012', type, subType);
      }
      return foundDecorator;
    },
    modifyItemElement: function modifyItemElement(args) {
      var $itemElement = (0, _renderer.default)(args.itemElement);
      var config = {
        $itemElement: $itemElement
      };
      this._prependBeforeBags($itemElement, config);
      this._appendAfterBags($itemElement, config);
      this._applyDecorators(DECORATOR_MODIFY_ELEMENT_METHOD, config);
    },
    afterItemsRendered: function afterItemsRendered() {
      this._applyDecorators(DECORATOR_AFTER_RENDER_METHOD);
    },
    _prependBeforeBags: function _prependBeforeBags($itemElement, config) {
      var $beforeBags = this._collectDecoratorsMarkup(DECORATOR_BEFORE_BAG_CREATE_METHOD, config, LIST_ITEM_BEFORE_BAG_CLASS);
      $itemElement.prepend($beforeBags);
    },
    _appendAfterBags: function _appendAfterBags($itemElement, config) {
      var $afterBags = this._collectDecoratorsMarkup(DECORATOR_AFTER_BAG_CREATE_METHOD, config, LIST_ITEM_AFTER_BAG_CLASS);
      $itemElement.append($afterBags);
    },
    _collectDecoratorsMarkup: function _collectDecoratorsMarkup(method, config, containerClass) {
      var $collector = (0, _renderer.default)('<div>');
      (0, _iterator.each)(this._decorators, function () {
        var $container = (0, _renderer.default)('<div>').addClass(containerClass);
        this[method]((0, _extend.extend)({
          $container: $container
        }, config));
        if ($container.children().length) {
          $collector.append($container);
        }
      });
      return $collector.children();
    },
    _applyDecorators: function _applyDecorators(method, config) {
      (0, _iterator.each)(this._decorators, function () {
        this[method](config);
      });
    },
    _handlerExists: function _handlerExists(name) {
      if (!this._decorators) {
        return false;
      }
      var decorators = this._decorators;
      var length = decorators.length;
      for (var i = 0; i < length; i++) {
        if (decorators[i][name] !== _common.noop) {
          return true;
        }
      }
      return false;
    },
    _eventHandler: function _eventHandler(name, $itemElement, e) {
      if (!this._decorators) {
        return false;
      }
      var response = false;
      var decorators = this._decorators;
      var length = decorators.length;
      for (var i = 0; i < length; i++) {
        response = decorators[i][name]($itemElement, e);
        if (response) {
          break;
        }
      }
      return response;
    },
    handleClick: function handleClick($itemElement, e) {
      return this._eventHandler('handleClick', $itemElement, e);
    },
    handleKeyboardEvents: function handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
      return this._eventHandler('handleKeyboardEvents', currentFocusedIndex, moveFocusUp);
    },
    handleEnterPressing: function handleEnterPressing(e) {
      return this._eventHandler('handleEnterPressing', e);
    },
    contextMenuHandlerExists: function contextMenuHandlerExists() {
      return this._handlerExists('handleContextMenu');
    },
    handleContextMenu: function handleContextMenu($itemElement, e) {
      return this._eventHandler('handleContextMenu', $itemElement, e);
    },
    getExcludedItemSelectors: function getExcludedItemSelectors() {
      var excludedSelectors = [];
      this._applyDecorators(DECORATOR_GET_EXCLUDED_SELECTORS_METHOD, excludedSelectors);
      return excludedSelectors.join(',');
    }
  });
  var _default = EditProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/common","../../core/class","../../core/utils/extend","../../core/utils/iterator","../widget/ui.errors","./ui.list.edit.decorator_registry"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/common"), require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../widget/ui.errors"), require("./ui.list.edit.decorator_registry"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.list.edit.provider.js.map