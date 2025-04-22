/* eslint-disable @typescript-eslint/no-unused-vars */
import { validatingModule } from '../../grids/grid_core/validating/m_validating';
import treeListCore from './m_core';
const editingControllerExtender = Base => class TreeListEditingControllerExtender extends validatingModule.extenders.controllers.editing(Base) {
  processDataItem(item) {
    super.processDataItemTreeListHack.apply(this, arguments);
  }
  processItems(items, e) {
    return super.processItemsTreeListHack.apply(this, arguments);
  }
};
treeListCore.registerModule('validating', {
  defaultOptions: validatingModule.defaultOptions,
  controllers: validatingModule.controllers,
  extenders: {
    controllers: {
      editing: editingControllerExtender,
      editorFactory: validatingModule.extenders.controllers.editorFactory
    },
    views: validatingModule.extenders.views
  }
});