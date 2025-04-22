"use strict";

var _event_nodes_disposing = require("../../common/core/events/utils/event_nodes_disposing");
Object.keys(_event_nodes_disposing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _event_nodes_disposing[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event_nodes_disposing[key];
    }
  });
});