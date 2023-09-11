export var getAppointmentRenderingStrategyName = viewType => {
  var appointmentRenderingStrategyMap = {
    day: {
      renderingStrategy: 'vertical'
    },
    week: {
      renderingStrategy: 'week'
    },
    workWeek: {
      renderingStrategy: 'week'
    },
    month: {
      renderingStrategy: 'horizontalMonth'
    },
    timelineDay: {
      renderingStrategy: 'horizontal'
    },
    timelineWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineWorkWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineMonth: {
      renderingStrategy: 'horizontalMonthLine'
    },
    agenda: {
      renderingStrategy: 'agenda'
    }
  };
  var {
    renderingStrategy
  } = appointmentRenderingStrategyMap[viewType];
  return renderingStrategy;
};