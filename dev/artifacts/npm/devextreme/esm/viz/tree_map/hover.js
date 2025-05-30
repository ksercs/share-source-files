/**
* DevExtreme (esm/viz/tree_map/hover.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TreeMapBase from './tree_map.base';
import Node from './node';
import { expand } from '../core/helpers';
import { buildRectAppearance } from './common';
import { parseScalar as _parseScalar } from '../core/utils';
var proto = TreeMapBase.prototype;
var nodeProto = Node.prototype;
var STATE_CODE = 1;
import './api';
import './states';
proto._eventsMap.onHoverChanged = {
  name: 'hoverChanged'
};
expand(proto._handlers, 'calculateAdditionalStates', function (states, options) {
  states[1] = options.hoverStyle ? buildRectAppearance(options.hoverStyle) : {};
});
TreeMapBase.addChange({
  code: 'HOVER_ENABLED',
  handler: function handler() {
    var hoverEnabled = _parseScalar(this._getOption('hoverEnabled', true), true);
    if (!hoverEnabled) {
      this.clearHover();
    }
    this._hoverEnabled = hoverEnabled;
  },
  isThemeDependent: true,
  isOptionChange: true,
  option: 'hoverEnabled'
});
nodeProto.statesMap[1] = 1;
nodeProto.additionalStates.push(1);
expand(proto, '_extendProxyType', function (proto) {
  var that = this;
  proto.setHover = function () {
    that._hoverNode(this._id);
  };
  proto.isHovered = function () {
    return that._hoverIndex === this._id;
  };
});
expand(proto, '_onNodesCreated', function () {
  this._hoverIndex = -1;
});
expand(proto, '_changeGroupSettings', function () {
  var that = this;
  that._groupHoverEnabled = _parseScalar(that._getOption('group').hoverEnabled, true);
  if (!that._groupHoverEnabled) {
    that.clearHover();
  }
});
proto._applyHoverState = function (index, state) {
  setNodeStateRecursive(this._nodes[index], STATE_CODE, state);
  this._eventTrigger('hoverChanged', {
    node: this._nodes[index].proxy
  });
};
function setNodeStateRecursive(node, code, state) {
  var nodes = node.isNode() && node.nodes;
  var i;
  var ii = nodes && nodes.length;
  node.setState(code, state);
  for (i = 0; i < ii; ++i) {
    setNodeStateRecursive(nodes[i], code, state);
  }
}
proto._hoverNode = function (index) {
  var that = this;
  var currentIndex = that._hoverIndex;
  if (that._hoverEnabled && currentIndex !== index) {
    if (!that._groupHoverEnabled && index >= 0 && that._nodes[index].isNode()) {
      that.clearHover();
      return;
    }
    that._context.suspend();
    that._hoverIndex = -1;
    if (currentIndex >= 0) {
      that._applyHoverState(currentIndex, false);
    }
    that._hoverIndex = index;
    if (index >= 0) {
      that._applyHoverState(index, true);
    }
    that._context.resume();
  }
};
proto.clearHover = function () {
  this._hoverNode(-1);
};
