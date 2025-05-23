/**
* DevExtreme (cjs/ui/collection/ui.collection_widget.async.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiCollection_widget = _interopRequireDefault(require("./ui.collection_widget.edit"));
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var AsyncCollectionWidget = _uiCollection_widget.default.inherit({
  _initMarkup() {
    this._deferredItems = [];
    this.callBase();
  },
  _renderItemContent(args) {
    var renderContentDeferred = new _deferred.Deferred();
    var itemDeferred = new _deferred.Deferred();
    var that = this;
    this._deferredItems[args.index] = itemDeferred;
    var $itemContent = this.callBase.call(that, args);
    itemDeferred.done(function () {
      renderContentDeferred.resolve($itemContent);
    });
    return renderContentDeferred.promise();
  },
  _onItemTemplateRendered: function _onItemTemplateRendered(itemTemplate, renderArgs) {
    var _this = this;
    return function () {
      _this._deferredItems[renderArgs.index].resolve();
    };
  },
  _postProcessRenderItems: _common.noop,
  _renderItemsAsync() {
    var _this2 = this;
    var d = new _deferred.Deferred();
    _deferred.when.apply(this, this._deferredItems).done(function () {
      _this2._postProcessRenderItems();
      d.resolve();
    });
    return d.promise();
  },
  _clean() {
    this.callBase();
    this._deferredItems = [];
  }
});
var _default = AsyncCollectionWidget;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
