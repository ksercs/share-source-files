import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { DefaultSizes } from '../const';
import { AllDayPanelTableBody, AllDayPanelTableBodyDefaultProps } from './all_day_panel_table_body';
import { LayoutDefaultProps } from './layout_props';
import { Table } from './table';
export class AllDayTable extends InfernoWrapperComponent {
  constructor() {
    super(...arguments);
    this.allDayPanelData = null;
  }
  createEffects() {
    return [createReRenderEffect()];
  }
  getAllDayPanelData() {
    if (this.allDayPanelData !== null) {
      return this.allDayPanelData;
    }
    this.allDayPanelData = this.props.viewData.groupedData[0].allDayPanel;
    return this.allDayPanelData;
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.viewData !== nextProps.viewData) {
      this.allDayPanelData = null;
    }
  }
  render() {
    const {
      viewData,
      viewContext,
      width,
      tableRef,
      dataCellTemplate
    } = this.props;
    const allDayPanelData = this.getAllDayPanelData();
    return createComponentVNode(2, Table, {
      "className": "dx-scheduler-all-day-table",
      "height": allDayPanelData ? undefined : DefaultSizes.allDayPanelHeight,
      "width": width,
      "tableRef": tableRef,
      children: createComponentVNode(2, AllDayPanelTableBody, {
        "viewData": allDayPanelData ?? AllDayPanelTableBodyDefaultProps.viewData,
        "viewContext": viewContext,
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth ?? AllDayPanelTableBodyDefaultProps.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount,
        "dataCellTemplate": dataCellTemplate
      })
    });
  }
}
AllDayTable.defaultProps = LayoutDefaultProps;