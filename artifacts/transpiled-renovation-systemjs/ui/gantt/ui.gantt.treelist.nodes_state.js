!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/gantt/ui.gantt.treelist.nodes_state.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/gantt/ui.gantt.treelist.nodes_state.js", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GanttTreeListNodesState = exports.GanttTreeListNodeState = void 0;
  var GanttTreeListNodeState = /*#__PURE__*/function () {
    function GanttTreeListNodeState(treeListNode) {
      var _treeListNode$parent;
      this.collapsed = false;
      this.key = treeListNode.key;
      this.children = treeListNode.children.map(function (node) {
        return node.key;
      });
      this.parentKey = (_treeListNode$parent = treeListNode.parent) === null || _treeListNode$parent === void 0 ? void 0 : _treeListNode$parent.key;
    }
    var _proto = GanttTreeListNodeState.prototype;
    _proto.hasChildren = function hasChildren() {
      return this.children.length > 0;
    };
    _proto.removeChild = function removeChild(state) {
      var index = this.children.indexOf(state.key);
      if (index > -1) {
        this.children = this.children.splice(index, 1);
      }
    };
    _proto.equal = function equal(state) {
      if (!state || state.key !== this.key || state.parentKey !== this.parentKey) {
        return false;
      }
      if (this.children.length !== state.children.length || this.children.some(function (value, index) {
        return value !== state.children[index];
      })) {
        return false;
      }
      return true;
    };
    return GanttTreeListNodeState;
  }();
  exports.GanttTreeListNodeState = GanttTreeListNodeState;
  var GanttTreeListNodesState = /*#__PURE__*/function () {
    function GanttTreeListNodesState() {
      this._resetHash();
    }
    var _proto2 = GanttTreeListNodesState.prototype;
    _proto2.clear = function clear() {
      this._resetHash();
    };
    _proto2.applyNodes = function applyNodes(nodes, rootValue) {
      var _this = this;
      if (this._rootValue !== rootValue) {
        this._resetHash();
        this._rootValue = rootValue;
      }
      this._removeNonExistentNodes(nodes.map(function (node) {
        return node.key;
      }));
      nodes.forEach(function (node) {
        return _this._applyNode(node);
      });
      this._validateHash();
    };
    _proto2.saveExpandedState = function saveExpandedState(expandedKeys) {
      var _this2 = this;
      this._hasCollapsed = false;
      this._forEachState(function (state) {
        if (state.hasChildren() && !expandedKeys.includes(state.key)) {
          state.collapsed = true;
          _this2._hasCollapsed = true;
        }
      });
    };
    _proto2.getExpandedKeys = function getExpandedKeys() {
      if (this._hasCollapsed) {
        var keys = [];
        this._forEachState(function (state) {
          if (state.hasChildren() && !state.collapsed) {
            keys.push(state.key);
          }
        });
        return keys;
      }
      return null;
    };
    _proto2._resetHash = function _resetHash() {
      this._nodeHash = {};
      this._hasCollapsed = false;
    };
    _proto2._getNodeState = function _getNodeState(key) {
      return this._nodeHash[key];
    };
    _proto2._removeNonExistentNodes = function _removeNonExistentNodes(existingKeys) {
      var _this3 = this;
      if (existingKeys) {
        this._forEachState(function (state) {
          if (!existingKeys.includes(state.key)) {
            _this3._removeStateWithChildren(state);
          }
        });
      }
    };
    _proto2._removeStateWithChildren = function _removeStateWithChildren(key) {
      var _this4 = this;
      var state = this._getNodeState(key);
      if (state) {
        state.children.forEach(function (child) {
          return _this4._removeStateWithChildren(child);
        });
        var parent = this._getNodeState(state.parentKey);
        if (parent) {
          parent.removeChild(state);
        }
        delete this._nodeHash[key];
      }
    };
    _proto2._applyNode = function _applyNode(node) {
      var nodeState = new GanttTreeListNodeState(node);
      var oldState = this._getNodeState(node.key);
      if (!(oldState !== null && oldState !== void 0 && oldState.equal(nodeState))) {
        this._nodeHash[node.key] = nodeState;
        this._expandTreelineToNode(node.key);
      }
    };
    _proto2._expandTreelineToNode = function _expandTreelineToNode(key) {
      var state = this._getNodeState(key);
      var parent = this._getNodeState(state === null || state === void 0 ? void 0 : state.parentKey);
      while (parent) {
        parent.collapsed = false;
        parent = this._getNodeState(parent.parentKey);
      }
    };
    _proto2._validateHash = function _validateHash() {
      var _this5 = this;
      Object.keys(this._nodeHash).forEach(function (key) {
        var state = _this5._getNodeState(key);
        var parentKey = state === null || state === void 0 ? void 0 : state.parentKey;
        if (parentKey !== _this5._rootValue && !_this5._getNodeState(parentKey)) {
          _this5._removeStateWithChildren(key);
        }
      });
    };
    _proto2._forEachState = function _forEachState(callback) {
      var _this6 = this;
      Object.keys(this._nodeHash).forEach(function (key) {
        var state = _this6._nodeHash[key];
        if (state) {
          callback(state);
        }
      });
    };
    return GanttTreeListNodesState;
  }();
  exports.GanttTreeListNodesState = GanttTreeListNodesState;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=ui.gantt.treelist.nodes_state.js.map