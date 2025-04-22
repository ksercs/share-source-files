import { extend } from '../../../core/utils/extend';
import { columnsControllerModule } from '../../grids/grid_core/columns_controller/m_columns_controller';
import gridCore from './m_core';
gridCore.registerModule('columns', {
  defaultOptions() {
    return extend(true, {}, columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: columnsControllerModule.controllers
});