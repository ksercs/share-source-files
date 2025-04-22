"use strict";

var _m_event_target = require("../../../../__internal/events/utils/m_event_target");
Object.keys(_m_event_target).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_event_target[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_event_target[key];
    }
  });
});