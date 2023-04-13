import { addToStyles } from '../../workspaces/utils';
import { getAppointmentColor } from '../../resources/utils';
export var getOverflowIndicatorStyles = viewModel => {
  var {
    geometry: {
      height,
      left,
      top,
      width
    }
  } = viewModel;
  var result = addToStyles([{
    attr: 'left',
    value: "".concat(left, "px")
  }, {
    attr: 'top',
    value: "".concat(top, "px")
  }, {
    attr: 'width',
    value: "".concat(width, "px")
  }, {
    attr: 'height',
    value: "".concat(height, "px")
  }, {
    attr: 'boxShadow',
    value: "inset ".concat(width, "px 0 0 0 rgba(0, 0, 0, 0.3)")
  }]);
  return result;
};
export var getOverflowIndicatorColor = (color, colors) => !colors.length || colors.filter(item => item !== color).length === 0 ? color : undefined;
export var getIndicatorColor = (appointmentContext, viewModel, groups) => {
  var _viewModel$groupIndex;
  var groupIndex = (_viewModel$groupIndex = viewModel.groupIndex) !== null && _viewModel$groupIndex !== void 0 ? _viewModel$groupIndex : 0;
  var {
    appointment
  } = viewModel.items.settings[0];
  return getAppointmentColor({
    resources: appointmentContext.resources,
    resourceLoaderMap: appointmentContext.resourceLoaderMap,
    resourcesDataAccessors: appointmentContext.dataAccessors.resources,
    loadedResources: appointmentContext.loadedResources
  }, {
    itemData: appointment,
    groupIndex,
    groups
  });
};