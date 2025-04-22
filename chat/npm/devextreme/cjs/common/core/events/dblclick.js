/**
* DevExtreme (cjs/common/core/events/dblclick.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var dblclick = _interopRequireWildcard(require("./double_click"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
  * @name UI Events.dxdblclick
  * @type eventType
  * @type_function_param1 event:event
  * @module events/dblclick
*/
// NOTE: The "double_click" module created to overcome adblock issue https://isc.devexpress.com/Thread/WorkplaceDetails/T465804. This file was kept as a fasade not to create a BC.
var _default = exports.default = dblclick;
module.exports = exports.default;
module.exports.default = exports.default;
