/**
* DevExtreme (esm/viz/tree_map/api.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TreeMapBase from './tree_map.base';
import Node from './node';
import { extend as _extend } from '../../core/utils/extend';
import { noop } from '../../core/utils/common';
var proto = TreeMapBase.prototype;
var nodeProto = Node.prototype;
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
        _extend(true, node._custom, settings);
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
proto._extendProxyType = noop;
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
    _extend(true, that.state, that._partialState);
  }
};
var _updateLabelStyle = nodeProto.updateLabelStyle;
nodeProto.updateLabelStyle = function () {
  var that = this;
  var custom = that._custom;
  _updateLabelStyle.call(that);
  if (custom && custom.label) {
    that._partialLabelState = !that.ctx.forceReset && that._partialLabelState || calculatePartialLabelState(that, custom.label);
    that.labelState = _extend(true, {}, that.labelState, that._partialLabelState);
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
