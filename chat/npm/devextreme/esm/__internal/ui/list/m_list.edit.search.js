/**
* DevExtreme (esm/__internal/ui/list/m_list.edit.search.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import searchBoxMixin from '../../../ui/widget/ui.search_box_mixin';
import ListEdit from './m_list.edit';
// @ts-expect-error ts-error
const ListSearch = ListEdit.inherit(searchBoxMixin).inherit({
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
    mode.length && dataController.searchOperation(searchBoxMixin.getOperationBySearchMode(mode));
    expr && dataController.searchExpr(expr);
  }
});
export default ListSearch;
