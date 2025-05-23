/**
* DevExtreme (esm/renovation/ui/scheduler/header/header.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["agendaDuration", "currentDate", "currentView", "currentViewChange", "customizationFunction", "defaultCurrentView", "firstDayOfWeek", "intervalCount", "items", "max", "min", "onCurrentDateUpdate", "onCurrentViewUpdate", "startViewDate", "useDropDownViewSwitcher", "useShortDateFormat", "viewType", "views"];
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import devices from '../../../../core/devices';
import { Toolbar } from '../../toolbar/toolbar';
import '../../../../ui/button_group';
import '../../../../ui/drop_down_button';
import dateUtils from '../../../../core/utils/date';
import { getCaption, nextWeek, getStep, getViewName, getNextIntervalDate } from '../../../../__internal/scheduler/header/m_utils';
import { formToolbarItem, formatViews, isMonthView } from './utils';
import { SchedulerProps } from '../props';
import { SchedulerCalendar } from './calendar';
var {
  trimTime
} = dateUtils;
export var viewFunction = viewModel => {
  var {
    currentDate,
    firstDayOfWeek,
    max,
    min
  } = viewModel.props;
  var {
    calendarVisible,
    changeCalendarDate,
    changeCalendarVisible,
    items
  } = viewModel;
  return createVNode(1, "div", "dx-scheduler-header", [createComponentVNode(2, SchedulerCalendar, {
    "currentDate": currentDate,
    "onCurrentDateUpdate": changeCalendarDate,
    "min": min,
    "max": max,
    "firstDayOfWeek": firstDayOfWeek,
    "visible": calendarVisible,
    "onVisibleUpdate": changeCalendarVisible
  }), createComponentVNode(2, Toolbar, {
    "items": items
  })], 4);
};
export var SchedulerToolbarBaseProps = {
  intervalCount: 1,
  firstDayOfWeek: 0,
  agendaDuration: 7,
  get useShortDateFormat() {
    return !devices.real().generic || devices.isSimulator();
  },
  viewType: 'day'
};
export var SchedulerToolbarProps = {
  get intervalCount() {
    return SchedulerToolbarBaseProps.intervalCount;
  },
  get firstDayOfWeek() {
    return SchedulerToolbarBaseProps.firstDayOfWeek;
  },
  get agendaDuration() {
    return SchedulerToolbarBaseProps.agendaDuration;
  },
  get useShortDateFormat() {
    return SchedulerToolbarBaseProps.useShortDateFormat;
  },
  get viewType() {
    return SchedulerToolbarBaseProps.viewType;
  },
  get useDropDownViewSwitcher() {
    return SchedulerProps.useDropDownViewSwitcher;
  },
  get defaultCurrentView() {
    return SchedulerProps.currentView;
  },
  get currentViewChange() {
    return () => {};
  }
};
import { convertRulesToOptions } from '../../../../core/options/utils';
export class SchedulerToolbar extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.state = {
      calendarVisible: false,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.props.defaultCurrentView
    };
    this.setCurrentView = this.setCurrentView.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
    this.getNextDate = this.getNextDate.bind(this);
    this.updateDateByDirection = this.updateDateByDirection.bind(this);
    this.isPreviousButtonDisabled = this.isPreviousButtonDisabled.bind(this);
    this.isNextButtonDisabled = this.isNextButtonDisabled.bind(this);
    this.changeCalendarDate = this.changeCalendarDate.bind(this);
    this.changeCalendarVisible = this.changeCalendarVisible.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }
  get step() {
    return getStep(this.props.viewType);
  }
  get displayedDate() {
    if (this.__getterCache['displayedDate'] !== undefined) {
      return this.__getterCache['displayedDate'];
    }
    return this.__getterCache['displayedDate'] = (() => {
      var startViewDate = new Date(this.props.startViewDate);
      if (isMonthView(this.props.viewType)) {
        return nextWeek(startViewDate);
      }
      return startViewDate;
    })();
  }
  get caption() {
    var options = {
      step: this.step,
      intervalCount: this.props.intervalCount,
      firstDayOfWeek: this.props.firstDayOfWeek,
      agendaDuration: this.props.agendaDuration,
      date: trimTime(this.displayedDate)
    };
    return getCaption(options, this.props.useShortDateFormat, this.props.customizationFunction);
  }
  get captionText() {
    return this.caption.text;
  }
  get views() {
    if (this.__getterCache['views'] !== undefined) {
      return this.__getterCache['views'];
    }
    return this.__getterCache['views'] = (() => {
      return formatViews(this.props.views);
    })();
  }
  get selectedView() {
    return getViewName(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView);
  }
  setCurrentView(view) {
    if (view.name !== (this.props.currentView !== undefined ? this.props.currentView : this.state.currentView)) {
      this.props.onCurrentViewUpdate(view.name);
    }
  }
  setCurrentDate(date) {
    if (date.getTime() !== this.props.currentDate.getTime()) {
      this.props.onCurrentDateUpdate(new Date(date));
    }
  }
  get intervalOptions() {
    if (this.__getterCache['intervalOptions'] !== undefined) {
      return this.__getterCache['intervalOptions'];
    }
    return this.__getterCache['intervalOptions'] = (() => {
      return {
        step: this.step,
        intervalCount: this.props.intervalCount,
        firstDayOfWeek: this.props.firstDayOfWeek,
        agendaDuration: this.props.agendaDuration
      };
    })();
  }
  getNextDate(direction, initialDate) {
    var date = initialDate !== null && initialDate !== void 0 ? initialDate : this.props.currentDate;
    var options = _extends({}, this.intervalOptions, {
      date
    });
    return getNextIntervalDate(options, direction);
  }
  updateDateByDirection(direction) {
    var date = this.getNextDate(direction);
    this.setCurrentDate(date);
  }
  isPreviousButtonDisabled() {
    if (this.props.min === undefined) {
      return false;
    }
    var min = trimTime(new Date(this.props.min));
    var {
      endDate
    } = this.caption;
    var previousDate = this.getNextDate(-1, endDate);
    return previousDate < min;
  }
  isNextButtonDisabled() {
    if (this.props.max === undefined) {
      return false;
    }
    var max = new Date(new Date(this.props.max).setHours(23, 59, 59));
    var {
      startDate
    } = this.caption;
    var nextDate = this.getNextDate(1, startDate);
    return nextDate > max;
  }
  changeCalendarDate(date) {
    this.setState(__state_argument => ({
      calendarVisible: false
    }));
    this.setCurrentDate(date);
  }
  changeCalendarVisible(visible) {
    this.setState(__state_argument => ({
      calendarVisible: visible
    }));
  }
  showCalendar() {
    this.changeCalendarVisible(true);
  }
  get items() {
    if (this.__getterCache['items'] !== undefined) {
      return this.__getterCache['items'];
    }
    return this.__getterCache['items'] = (() => {
      var options = {
        useDropDownViewSwitcher: this.props.useDropDownViewSwitcher,
        selectedView: this.selectedView,
        views: this.views,
        setCurrentView: view => this.setCurrentView(view),
        showCalendar: () => this.showCalendar(),
        captionText: this.captionText,
        updateDateByDirection: direction => this.updateDateByDirection(direction),
        isPreviousButtonDisabled: this.isPreviousButtonDisabled(),
        isNextButtonDisabled: this.isNextButtonDisabled()
      };
      return this.props.items.map(item => formToolbarItem(item, options));
    })();
  }
  get restAttributes() {
    var _this$props$currentVi = _extends({}, this.props, {
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
      restProps = _objectWithoutPropertiesLoose(_this$props$currentVi, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['viewType'] !== nextProps['viewType']) {
      this.__getterCache['displayedDate'] = undefined;
    }
    if (this.props['views'] !== nextProps['views']) {
      this.__getterCache['views'] = undefined;
    }
    if (this.props['viewType'] !== nextProps['viewType'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['agendaDuration'] !== nextProps['agendaDuration']) {
      this.__getterCache['intervalOptions'] = undefined;
    }
    if (this.props['useDropDownViewSwitcher'] !== nextProps['useDropDownViewSwitcher'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.props['views'] !== nextProps['views'] || this.props['onCurrentViewUpdate'] !== nextProps['onCurrentViewUpdate'] || this.props['viewType'] !== nextProps['viewType'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['agendaDuration'] !== nextProps['agendaDuration'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['useShortDateFormat'] !== nextProps['useShortDateFormat'] || this.props['customizationFunction'] !== nextProps['customizationFunction'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['onCurrentDateUpdate'] !== nextProps['onCurrentDateUpdate'] || this.props['min'] !== nextProps['min'] || this.props['max'] !== nextProps['max'] || this.props['items'] !== nextProps['items']) {
      this.__getterCache['items'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
      calendarVisible: this.state.calendarVisible,
      step: this.step,
      displayedDate: this.displayedDate,
      caption: this.caption,
      captionText: this.captionText,
      views: this.views,
      selectedView: this.selectedView,
      setCurrentView: this.setCurrentView,
      setCurrentDate: this.setCurrentDate,
      intervalOptions: this.intervalOptions,
      getNextDate: this.getNextDate,
      updateDateByDirection: this.updateDateByDirection,
      isPreviousButtonDisabled: this.isPreviousButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      changeCalendarDate: this.changeCalendarDate,
      changeCalendarVisible: this.changeCalendarVisible,
      showCalendar: this.showCalendar,
      items: this.items,
      restAttributes: this.restAttributes
    });
  }
}
function __processTwoWayProps(defaultProps) {
  var twoWayProps = ['currentView'];
  return Object.keys(defaultProps).reduce((props, propName) => {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(p => p === propName) ? 'default' + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
SchedulerToolbar.defaultProps = SchedulerToolbarProps;
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  SchedulerToolbar.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SchedulerToolbar.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(convertRulesToOptions(__defaultOptionRules)))));
}
