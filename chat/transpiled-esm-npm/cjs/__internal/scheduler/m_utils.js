"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _size = require("../../core/utils/size");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const utils = exports.utils = {
  dataAccessors: {
    getAppointmentSettings: element => (0, _renderer.default)(element).data(_constants.APPOINTMENT_SETTINGS_KEY),
    getAppointmentInfo: element => {
      const settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    }
  },
  DOM: {
    getHeaderHeight: header => header ? header._$element && parseInt((0, _size.getOuterHeight)(header._$element), 10) : 0
  },
  renovation: {
    renderComponent: (widget, parentElement, componentClass, componentName, viewModel) => {
      let component = widget[componentName];
      if (!component) {
        const container = (0, _element.getPublicElement)(parentElement);
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
          (0, _size.setHeight)($element, height);
        }
        if (width) {
          (0, _size.setWidth)($element, width);
        }
      }
    }
  }
};