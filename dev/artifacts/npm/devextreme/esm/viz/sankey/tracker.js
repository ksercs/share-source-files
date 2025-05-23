/**
* DevExtreme (esm/viz/sankey/tracker.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Sankey from './sankey';
import { Tracker } from '../components/tracker';
var proto = Sankey.prototype;
var DATA_KEY_BASE = '__sankey_data_';
var dataKeyModifier = 0;
proto._eventsMap.onNodeClick = {
  name: 'nodeClick'
};
proto._eventsMap.onLinkClick = {
  name: 'linkClick'
};
var getDataKey = function getDataKey() {
  return DATA_KEY_BASE + dataKeyModifier++;
};
export var plugin = {
  name: 'tracker',
  init: function init() {
    var that = this;
    var dataKey = getDataKey();
    that._tracker = new Tracker({
      widget: that,
      root: that._renderer.root,
      getData: function getData(e) {
        var target = e.target;
        return target[dataKey];
      },
      getNode: function getNode(index) {
        if (index < that._nodes.length) {
          return that._nodes[index];
        } else {
          return that._links[index - that._nodes.length];
        }
      },
      click: function click(e) {
        var eventName = this.getData(e.event) < that._nodes.length ? 'nodeClick' : 'linkClick';
        that._eventTrigger(eventName, {
          target: e.node,
          event: e.event
        });
      }
    });
    this._dataKey = dataKey;
  },
  dispose: function dispose() {
    this._tracker.dispose();
  },
  extenders: {
    _change_LINKS_DRAW: function _change_LINKS_DRAW() {
      var dataKey = this._dataKey;
      this._nodes.concat(this._links).forEach(function (item, index) {
        item.element.data(dataKey, index);
      });
    }
  }
};
