/**
* DevExtreme (esm/__internal/grids/data_grid/m_editing.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import './module_not_extended/editor_factory';
import { dataControllerEditingExtenderMixin, editingModule } from '../../grids/grid_core/editing/m_editing';
import gridCore from './m_core';
const data = Base => class DataEditingDataGridExtender extends dataControllerEditingExtenderMixin(Base) {
  _changeRowExpandCore(key) {
    const editingController = this._editingController;
    if (Array.isArray(key)) {
      editingController && editingController.refresh();
    }
    // @ts-expect-error
    return super._changeRowExpandCore.apply(this, arguments);
  }
};
gridCore.registerModule('editing', _extends({}, editingModule, {
  extenders: _extends({}, editingModule.extenders, {
    controllers: _extends({}, editingModule.extenders.controllers, {
      data
    })
  })
}));
