/**
* DevExtreme (esm/__internal/scheduler/m_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { compileGetter, compileSetter } from '../../core/utils/data';
import dateSerialization from '../../core/utils/date_serialization';
import { each } from '../../core/utils/iterator';
import { getOuterHeight, setHeight, setWidth } from '../../core/utils/size';
import { APPOINTMENT_SETTINGS_KEY } from './m_constants';
export var utils = {
  dataAccessors: {
    getAppointmentSettings: element => $(element).data(APPOINTMENT_SETTINGS_KEY),
    getAppointmentInfo: element => {
      var settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    },
    create: (fields, currentDataAccessors, forceIsoDateParsing, dateSerializationFormat) => {
      var isDateField = field => field === 'startDate' || field === 'endDate';
      var defaultDataAccessors = {
        getter: {},
        setter: {},
        expr: {}
      };
      var dataAccessors = currentDataAccessors ? _extends({}, currentDataAccessors) : defaultDataAccessors;
      each(fields, (name, expr) => {
        if (expr) {
          var getter = compileGetter(expr);
          var setter = compileSetter(expr);
          var dateGetter;
          var dateSetter;
          var serializationFormat;
          if (isDateField(name)) {
            dateGetter = object => {
              var value = getter(object);
              if (forceIsoDateParsing) {
                value = dateSerialization.deserializeDate(value);
              }
              return value;
            };
            dateSetter = (object, value) => {
              if (dateSerializationFormat) {
                serializationFormat = dateSerializationFormat;
              } else if (forceIsoDateParsing && !serializationFormat) {
                var oldValue = getter(object);
                serializationFormat = dateSerialization.getDateSerializationFormat(oldValue);
              }
              var newValue = dateSerialization.serializeDate(value, serializationFormat);
              setter(object, newValue);
            };
          }
          dataAccessors.getter[name] = dateGetter || getter;
          dataAccessors.setter[name] = dateSetter || setter;
          dataAccessors.expr["".concat(name, "Expr")] = expr;
        } else {
          /* eslint-disable @typescript-eslint/no-dynamic-delete */
          delete dataAccessors.getter[name];
          delete dataAccessors.setter[name];
          delete dataAccessors.expr["".concat(name, "Expr")];
          /* eslint-enable @typescript-eslint/no-dynamic-delete */
        }
      });

      return dataAccessors;
    }
  },
  DOM: {
    getHeaderHeight: header => header ? header._$element && parseInt(getOuterHeight(header._$element), 10) : 0
  },
  renovation: {
    renderComponent: (widget, parentElement, componentClass, componentName, viewModel) => {
      var component = widget[componentName];
      if (!component) {
        var container = getPublicElement(parentElement);
        component = widget._createComponent(container, componentClass, viewModel);
        widget[componentName] = component;
      } else {
        // TODO: this is a workaround for setTablesSizes. Remove after CSS refactoring
        var $element = component.$element();
        var elementStyle = $element.get(0).style;
        var {
          height
        } = elementStyle;
        var {
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
