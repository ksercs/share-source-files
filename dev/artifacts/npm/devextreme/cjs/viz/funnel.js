/**
* DevExtreme (cjs/viz/funnel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _funnel = _interopRequireDefault(require("./funnel/funnel"));
var _label = require("./funnel/label");
var _export = require("./core/export");
var _title = require("./core/title");
var _legend = require("./components/legend");
var _tracker = require("./funnel/tracker");
var _tooltip = require("./funnel/tooltip");
var _loading_indicator = require("./core/loading_indicator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_funnel.default.addPlugin(_label.plugin);
_funnel.default.addPlugin(_export.plugin);
_funnel.default.addPlugin(_title.plugin);
_funnel.default.addPlugin(_legend.plugin);
_funnel.default.addPlugin(_tracker.plugin);
_funnel.default.addPlugin(_tooltip.plugin);
_funnel.default.addPlugin(_loading_indicator.plugin);
var _default = _funnel.default;
/**
 * @name dxFunnelItem
 * @publicName Item
 */
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
