/**
* DevExtreme (esm/__internal/scheduler/r1/components/wrappers/time_panel.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../../../core/component_registrator';
import { ComponentWrapper } from '../../../../core/r1/index';
import { TimePanelTable } from '../base/time_panel_table';
export class TimePanelComponent extends ComponentWrapper {
  _setOptionsByReference() {
    // @ts-expect-error badly typed DomComponent
    super._setOptionsByReference();
    // @ts-expect-error badly typed DomComponent
    this._optionsByReference = _extends({}, this._optionsByReference, {
      timeCellTemplate: true
    });
  }
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['timeCellTemplate'],
      props: ['viewContext', 'groupOrientation', 'timePanelData', 'timeCellTemplate']
    };
  }
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  // @ts-expect-error types error in R1
  get _viewComponent() {
    return TimePanelTable;
  }
}
registerComponent('dxTimePanelTableLayout', TimePanelComponent);
