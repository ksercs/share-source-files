/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/group_panel/group_panel.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../../core/component_registrator';
import { GroupPanelWrapper } from '../../../../../component_wrapper/scheduler/group_panel';
import { GroupPanel as GroupPanelComponent } from './group_panel';
export default class GroupPanel extends GroupPanelWrapper {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['resourceCellTemplate'],
      props: ['groups', 'groupOrientation', 'groupPanelData', 'groupByDate', 'height', 'className', 'resourceCellTemplate']
    };
  }
  get _viewComponent() {
    return GroupPanelComponent;
  }
}
registerComponent('dxGroupPanel', GroupPanel);
