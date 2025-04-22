"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../core/utils/common");
var _item = _interopRequireDefault(require("../../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TabPanelItem extends _item.default {
  _renderWatchers() {
    this._startWatcher('badge', _common.noop);
    super._renderWatchers();
  }
}
exports.default = TabPanelItem;