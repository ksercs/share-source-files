/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/date_table/layout.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../../core/component_registrator';
import { DateTable } from '../../../../../component_wrapper/scheduler/date_table';
import { DateTableLayoutBase as DateTableLayoutBaseComponent } from './layout';
export default class DateTableLayoutBase extends DateTable {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['cellTemplate', 'dataCellTemplate'],
      props: ['cellTemplate', 'viewData', 'groupOrientation', 'leftVirtualCellWidth', 'rightVirtualCellWidth', 'topVirtualRowHeight', 'bottomVirtualRowHeight', 'addDateTableClass', 'addVerticalSizesClassToRows', 'width', 'dataCellTemplate']
    };
  }
  get _viewComponent() {
    return DateTableLayoutBaseComponent;
  }
}
registerComponent('dxDateTableLayoutBase', DateTableLayoutBase);
