/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/time_panel/layout.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../../core/component_registrator';
import { TimePanel } from '../../../../../component_wrapper/scheduler/time_panel';
import { TimePanelTableLayout as TimePanelTableLayoutComponent } from './layout';
export default class TimePanelTableLayout extends TimePanel {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['timeCellTemplate'],
      props: ['groupOrientation', 'timePanelData', 'timeCellTemplate']
    };
  }
  get _viewComponent() {
    return TimePanelTableLayoutComponent;
  }
}
registerComponent('dxTimePanelTableLayout', TimePanelTableLayout);
