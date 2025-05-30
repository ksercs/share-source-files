/**
* DevExtreme (cjs/__internal/scheduler/m_loading.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hide = hide;
exports.show = show;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _view_port = require("../../core/utils/view_port");
var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var loading = null;
var createLoadPanel = function createLoadPanel(options) {
  return new _load_panel.default((0, _renderer.default)('<div>').appendTo(options && options.container || (0, _view_port.value)()), options);
};
var removeLoadPanel = function removeLoadPanel() {
  if (!loading) {
    return;
  }
  loading.$element().remove();
  loading = null;
};
function show(options) {
  removeLoadPanel();
  loading = createLoadPanel(options);
  return loading.show();
}
function hide() {
  // todo: hot fix for case without viewport
  if (!loading) {
    // @ts-expect-error
    return new _deferred.Deferred().resolve();
  }
  return loading.hide().done(removeLoadPanel).promise();
}
