/**
* DevExtreme (esm/__internal/scheduler/m_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { getOuterHeight, setHeight, setWidth } from '../../core/utils/size';
import { APPOINTMENT_SETTINGS_KEY } from './constants';
export const utils = {
  dataAccessors: {
    getAppointmentSettings: element => $(element).data(APPOINTMENT_SETTINGS_KEY),
    getAppointmentInfo: element => {
      const settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    }
  },
  DOM: {
    getHeaderHeight: header => header ? header._$element && parseInt(getOuterHeight(header._$element), 10) : 0
  },
  renovation: {
    renderComponent: (widget, parentElement, componentClass, componentName, viewModel) => {
      let component = widget[componentName];
      if (!component) {
        const container = getPublicElement(parentElement);
        component = widget._createComponent(container, componentClass, viewModel);
        widget[componentName] = component;
      } else {
        const $element = component.$element();
        const elementStyle = $element.get(0).style;
        const {
          height
        } = elementStyle;
        const {
          width
        } = elementStyle;
        component.option(viewModel);
        if (height) {
          setHeight($element, height);
        }
        if (width) {
          setWidth($element, width);
        }
      }
    }
  }
};
