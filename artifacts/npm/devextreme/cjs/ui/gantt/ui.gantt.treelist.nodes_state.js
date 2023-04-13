/**
* DevExtreme (cjs/ui/gantt/ui.gantt.treelist.nodes_state.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

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
