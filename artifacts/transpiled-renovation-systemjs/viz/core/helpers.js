!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/helpers.js"], ["../../core/utils/extend","../../core/utils/window","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/helpers.js", ["../../core/utils/extend", "../../core/utils/window", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.changes = changes;
  exports.expand = expand;
  exports.replaceInherit = void 0;
  var _extend2 = $__require("../../core/utils/extend");
  var _window = $__require("../../core/utils/window");
  var _common = $__require("../../core/utils/common");
  var isServerSide = !(0, _window.hasWindow)();
  function Flags() {
    this.reset();
  }
  Flags.prototype = {
    constructor: Flags,
    add: function add(codes) {
      var i;
      var ii = codes.length;
      var flags = this._flags;
      for (i = 0; i < ii; ++i) {
        flags[codes[i]] = 1;
      }
    },
    has: function has(code) {
      return this._flags[code] > 0;
    },
    count: function count() {
      return Object.keys(this._flags).length;
    },
    reset: function reset() {
      this._flags = {};
    }
  };
  function combineMaps(baseMap, thisMap) {
    return baseMap !== thisMap ? (0, _extend2.extend)({}, baseMap, thisMap) : (0, _extend2.extend)({}, baseMap);
  }
  function combineLists(baseList, thisList) {
    return baseList !== thisList ? baseList.concat(thisList) : baseList.slice();
  }
  function buildTotalChanges(proto) {
    proto._totalChangesOrder = proto._optionChangesOrder.concat(proto._layoutChangesOrder, proto._customChangesOrder);
  }
  function addChange(settings) {
    var proto = this.prototype;
    var code = settings.code;
    proto['_change_' + code] = settings.handler;
    if (settings.isThemeDependent) {
      proto._themeDependentChanges.push(code);
    }
    if (settings.option) {
      proto._optionChangesMap[settings.option] = code;
    }
    (settings.isOptionChange ? proto._optionChangesOrder : proto._customChangesOrder).push(code);
    buildTotalChanges(proto);
  }
  function createChainExecutor() {
    var executeChain = function executeChain() {
      var i;
      var ii = executeChain._chain.length;
      var result;
      for (i = 0; i < ii; ++i) {
        result = executeChain._chain[i].apply(this, arguments);
      }
      return result;
    };
    executeChain._chain = [];
    executeChain.add = function (item) {
      executeChain._chain.push(item);
    };
    executeChain.copy = function (executor) {
      executeChain._chain = executor._chain.slice();
    };
    return executeChain;
  }
  function expand(target, name, expander) {
    var current = target[name];
    if (!current) {
      current = expander;
    } else {
      if (!current.add) {
        current = createChainExecutor();
        current.add(target[name]);
        current.add(expander);
      } else {
        if (Object.prototype.hasOwnProperty.call(target, name) === false) {
          current = createChainExecutor();
          current.copy(target[name]);
        }
        current.add(expander);
      }
    }
    target[name] = current;
  }
  function addPlugin(plugin) {
    var proto = this.prototype;
    proto._plugins.push(plugin);
    plugin.fontFields && proto._fontFields.push.apply(proto._fontFields, plugin.fontFields);
    if (plugin.members) {
      (0, _extend2.extend)(this.prototype, plugin.members);
    }
    if (plugin.customize) {
      plugin.customize(this);
    }
    if (plugin.extenders) {
      Object.keys(plugin.extenders).forEach(function (key) {
        var func = plugin.extenders[key];
        expand(proto, key, func);
      }, this);
    }
  }
  var replaceInherit = isServerSide ? function (widget) {
    var _inherit = widget.inherit;
    widget.inherit = function () {
      var result = _inherit.apply(this, arguments);
      var proto = result.prototype;
      ['_plugins', '_eventsMap', '_initialChanges', '_themeDependentChanges', '_optionChangesMap', '_optionChangesOrder', '_layoutChangesOrder', '_customChangesOrder', '_totalChangesOrder'].forEach(function (key) {
        proto[key] = {};
      });
      result.addPlugin = _common.noop;
      return result;
    };
    widget.addChange = _common.noop;
    widget.addPlugin = _common.noop;
  } : function (widget) {
    var _inherit = widget.inherit;
    widget.inherit = function () {
      var proto = this.prototype;
      var plugins = proto._plugins;
      var fontFields = proto._fontFields;
      var eventsMap = proto._eventsMap;
      var initialChanges = proto._initialChanges;
      var themeDependentChanges = proto._themeDependentChanges;
      var optionChangesMap = proto._optionChangesMap;
      var partialOptionChangesMap = proto._partialOptionChangesMap;
      var partialOptionChangesPath = proto._partialOptionChangesPath;
      var optionChangesOrder = proto._optionChangesOrder;
      var layoutChangesOrder = proto._layoutChangesOrder;
      var customChangesOrder = proto._customChangesOrder;
      var result = _inherit.apply(this, arguments);
      proto = result.prototype;
      proto._plugins = combineLists(plugins, proto._plugins);
      proto._fontFields = combineLists(fontFields, proto._fontFields);
      proto._eventsMap = combineMaps(eventsMap, proto._eventsMap);
      proto._initialChanges = combineLists(initialChanges, proto._initialChanges);
      proto._themeDependentChanges = combineLists(themeDependentChanges, proto._themeDependentChanges);
      proto._optionChangesMap = combineMaps(optionChangesMap, proto._optionChangesMap);
      proto._partialOptionChangesMap = combineMaps(partialOptionChangesMap, proto._partialOptionChangesMap);
      proto._partialOptionChangesPath = combineMaps(partialOptionChangesPath, proto._partialOptionChangesPath);
      proto._optionChangesOrder = combineLists(optionChangesOrder, proto._optionChangesOrder);
      proto._layoutChangesOrder = combineLists(layoutChangesOrder, proto._layoutChangesOrder);
      proto._customChangesOrder = combineLists(customChangesOrder, proto._customChangesOrder);
      buildTotalChanges(proto);
      result.addPlugin = addPlugin;
      return result;
    };
    widget.prototype._plugins = [];
    widget.prototype._fontFields = [];
    widget.addChange = addChange;
    widget.addPlugin = addPlugin;
  };
  exports.replaceInherit = replaceInherit;
  function changes() {
    return new Flags();
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/window","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/window"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=helpers.js.map