import { extend } from '../../../core/utils/extend';
import { validatingModule } from '../../grids/grid_core/validating/m_validating';
import treeListCore from './m_core';
var EditingControllerExtender = extend({}, validatingModule.extenders.controllers.editing);
delete EditingControllerExtender.processItems;
delete EditingControllerExtender.processDataItem;
treeListCore.registerModule('validating', {
  defaultOptions: validatingModule.defaultOptions,
  controllers: validatingModule.controllers,
  extenders: {
    controllers: {
      editing: EditingControllerExtender,
      editorFactory: validatingModule.extenders.controllers.editorFactory
    },
    views: validatingModule.extenders.views
  }
});