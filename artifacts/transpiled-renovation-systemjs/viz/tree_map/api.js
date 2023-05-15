!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/tree_map/api.js"], ["./tree_map.base","./node","../../core/utils/extend","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/tree_map/api.js", ["./tree_map.base", "./node", "../../core/utils/extend", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _tree_map = _interopRequireDefault($__require("./tree_map.base"));
  var _node = _interopRequireDefault($__require("./node"));
  var _extend2 = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var proto = _tree_map.default.prototype;
  var nodeProto = _node.default.prototype;
  proto._eventsMap.onNodesInitialized = {
    name: 'nodesInitialized'
  };
  proto._eventsMap.onNodesRendering = {
    name: 'nodesRendering'
  };
  proto._createProxyType = function () {
    var that = this;
    var nodes;
    Proxy.prototype = {
      constructor: Proxy,
      getParent: function getParent() {
        return nodes[this._id].parent.proxy || null;
      },
      getChild: function getChild(index) {
        var _nodes = nodes[this._id].nodes;
        return _nodes ? _nodes[index].proxy : null;
      },
      getChildrenCount: function getChildrenCount() {
        var _nodes = nodes[this._id].nodes;
        return _nodes ? _nodes.length : 0;
      },
      getAllChildren: function getAllChildren() {
        var _nodes = nodes[this._id].nodes;
        var i;
        var ii = _nodes && _nodes.length;
        var list = [];
        for (i = 0; i < ii; ++i) {
          list.push(_nodes[i].proxy);
        }
        return list;
      },
      getAllNodes: function getAllNodes() {
        var list = [];
        collectNodes(nodes[this._id], list);
        return list;
      },
      isLeaf: function isLeaf() {
        return !nodes[this._id].isNode();
      },
      isActive: function isActive() {
        return nodes[this._id].isActive();
      },
      value: function value(arg) {
        var node = nodes[this._id];
        var result;
        if (arg !== undefined) {
          updateValue(node, arg > 0 ? Number(arg) : 0);
          change(node, ['TILING']);
          result = this;
        } else {
          result = node.value;
        }
        return result;
      },
      label: function label(arg) {
        var node = nodes[this._id];
        var result;
        if (arg !== undefined) {
          node.customLabel = arg ? String(arg) : null;
          change(node, ['LABELS']);
          result = this;
        } else {
          result = node.customLabel || node.label;
        }
        return result;
      },
      customize: function customize(settings) {
        var node = nodes[this._id];
        if (settings) {
          node._custom = node._custom || {};
          (0, _extend2.extend)(true, node._custom, settings);
          node._partialState = node._partialLabelState = null;
        }
        change(node, ['TILES', 'LABELS']);
        return this;
      },
      resetCustomization: function resetCustomization() {
        var node = nodes[this._id];
        node._custom = node._partialState = node._partialLabelState = null;
        change(node, ['TILES', 'LABELS']);
        return this;
      }
    };
    that._extendProxyType(Proxy.prototype);
    function Proxy(node) {
      var that = this;
      node.proxy = that;
      that._id = node._id;
      that.level = node.level;
      that.index = node.index;
      that.data = node.data;
    }

    // TODO: Find a way to make the following methods exist one per module rather then one per instance
    that._handlers.beginBuildNodes = function () {
      nodes = that._nodes;
      new Proxy(that._root);
    };
    that._handlers.buildNode = function (node) {
      new Proxy(node);
    };
    that._handlers.endBuildNodes = function () {
      that._eventTrigger('nodesInitialized', {
        root: that._root.proxy
      });
    };
  };
  function change(node, codes) {
    var ctx = node.ctx;
    ctx.suspend();
    ctx.change(codes);
    ctx.resume();
  }
  function collectNodes(node, list) {
    var nodes = node.nodes;
    var i;
    var ii = nodes && nodes.length;
    for (i = 0; i < ii; ++i) {
      list.push(nodes[i].proxy);
      collectNodes(nodes[i], list);
    }
  }
  function updateValue(node, value) {
    var delta = value - node.value;
    while (node) {
      node.value += delta;
      node = node.parent;
    }
  }
  proto._extendProxyType = _common.noop;
  var _resetNodes = proto._resetNodes;
  proto._resetNodes = function () {
    _resetNodes.call(this);
    this._eventTrigger('nodesRendering', {
      node: this._topNode.proxy
    });
  };
  var _updateStyles = nodeProto.updateStyles;
  nodeProto.updateStyles = function () {
    var that = this;
    _updateStyles.call(that);
    if (that._custom) {
      that._partialState = !that.ctx.forceReset && that._partialState || that.ctx.calculateState(that._custom);
      (0, _extend2.extend)(true, that.state, that._partialState);
    }
  };
  var _updateLabelStyle = nodeProto.updateLabelStyle;
  nodeProto.updateLabelStyle = function () {
    var that = this;
    var custom = that._custom;
    _updateLabelStyle.call(that);
    if (custom && custom.label) {
      that._partialLabelState = !that.ctx.forceReset && that._partialLabelState || calculatePartialLabelState(that, custom.label);
      that.labelState = (0, _extend2.extend)(true, {}, that.labelState, that._partialLabelState);
    }
  };
  function calculatePartialLabelState(node, settings) {
    var state = node.ctx.calculateLabelState(settings);
    if ('visible' in settings) {
      state.visible = !!settings.visible;
    }
    return state;
  }
  proto.getRootNode = function () {
    return this._root.proxy;
  };
  proto.resetNodes = function () {
    var context = this._context;
    context.suspend();
    context.change(['NODES_CREATE']);
    context.resume();
    return this;
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./tree_map.base","./node","../../core/utils/extend","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./tree_map.base"), require("./node"), require("../../core/utils/extend"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=api.js.map