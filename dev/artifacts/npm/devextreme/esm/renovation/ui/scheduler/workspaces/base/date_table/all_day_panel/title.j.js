/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/title.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../../../core/component_registrator';
import BaseComponent from '../../../../../../component_wrapper/common/component';
import { AllDayPanelTitle as AllDayPanelTitleComponent } from './title';
export default class AllDayPanelTitle extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: []
    };
  }
  get _viewComponent() {
    return AllDayPanelTitleComponent;
  }
}
registerComponent('dxAllDayPanelTitle', AllDayPanelTitle);
