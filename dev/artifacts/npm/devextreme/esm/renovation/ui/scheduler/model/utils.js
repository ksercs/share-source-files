/**
* DevExtreme (esm/renovation/ui/scheduler/model/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
