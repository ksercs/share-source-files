/**
* DevExtreme (esm/__internal/scheduler/r1/components/wrappers/date_table_month.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../core/component_registrator';
import { DateTableMonth } from '../month/date_table_month';
import { DateTableComponent } from './date_table';
export class DateTableMonthComponent extends DateTableComponent {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['cellTemplate', 'dataCellTemplate'],
      props: ['viewData', 'viewContext', 'cellTemplate', 'groupOrientation', 'leftVirtualCellWidth', 'rightVirtualCellWidth', 'topVirtualRowHeight', 'bottomVirtualRowHeight', 'addDateTableClass', 'addVerticalSizesClassToRows', 'width', 'dataCellTemplate']
    };
  }
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  get _viewComponent() {
    return DateTableMonth;
  }
}
registerComponent('dxMonthDateTableLayout', DateTableMonthComponent);
