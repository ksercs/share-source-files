/**
* DevExtreme (cjs/__internal/ui/list/m_list.edit.search.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.search_box_mixin"));
var _m_list = _interopRequireDefault(require("./m_list.edit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error ts-error
const ListSearch = _m_list.default.inherit(_ui.default).inherit({
  _addWidgetPrefix(className) {
    return `dx-list-${className}`;
  },
  _getCombinedFilter() {
    const dataController = this._dataController;
    const storeLoadOptions = {
      filter: dataController.filter()
    };
    dataController.addSearchFilter(storeLoadOptions);
    const {
      filter
    } = storeLoadOptions;
    return filter;
  },
  _initDataSource() {
    const value = this.option('searchValue');
    const expr = this.option('searchExpr');
    const mode = this.option('searchMode');
    this.callBase();
    const dataController = this._dataController;
    (value === null || value === void 0 ? void 0 : value.length) && dataController.searchValue(value);
    // @ts-expect-error
    mode.length && dataController.searchOperation(_ui.default.getOperationBySearchMode(mode));
    expr && dataController.searchExpr(expr);
  }
});
var _default = exports.default = ListSearch;
