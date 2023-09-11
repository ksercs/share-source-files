import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "adaptivityEnabled", "allDayExpr", "allDayPanelMode", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "disabled", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "height", "hint", "hoverStateEnabled", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onClick", "onKeyDown", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "rtlEnabled", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "tabIndex", "textExpr", "timeCellTemplate", "timeZone", "toolbar", "useDropDownViewSwitcher", "views", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { SchedulerProps } from './props';
import { Widget } from '../common/widget';
import DataSource from '../../../data/data_source';
import { getCurrentViewConfig, getCurrentViewProps, getValidGroups } from './model/views';
import { WorkSpace } from './workspaces/base/work_space';
import { SchedulerToolbar } from './header/header';
import { getViewDataGeneratorByViewType } from '../../../__internal/scheduler/workspaces/view_model/m_utils';
import { createDataAccessors, isViewDataProviderConfigValid } from './common';
import { createTimeZoneCalculator } from './timeZoneCalculator/createTimeZoneCalculator';
import { getGroupCount, loadResources } from '../../../__internal/scheduler/resources/m_utils';
import { getAppointmentsViewModel } from './view_model/appointments/appointments';
import { getAppointmentsConfig, getAppointmentsModel } from './model/appointments';
import { AppointmentTooltip } from './appointment/tooltip/appointment_tooltip';
import { getViewRenderConfigByType } from './workspaces/base/work_space_config';
import { getPreparedDataItems, resolveDataItems } from './utils/data';
import { getFilterStrategy } from './utils/filtering/local';
import combineRemoteFilter from './utils/filtering/remote';
import { ReducedIconTooltip } from './appointment/reduced_icon_tooltip/layout';
import { AppointmentsContextProvider } from './appointments_context_provider';
import { combineClasses } from '../../utils/combine_classes';
import { AppointmentEditForm } from './appointment_edit_form/layout';
import { getPopupSize } from './appointment_edit_form/popup_config';
import { FormContextProvider } from './form_context_provider';
import { createFormData } from './utils/editing/formData';
export var viewFunction = _ref => {
  var {
    appointmentEditFormVisible,
    appointmentFormData,
    appointmentPopupSize,
    appointmentsContextValue,
    changeAppointmentEditFormVisible,
    changeTooltipVisible,
    classes,
    currentViewConfig,
    dataAccessors,
    formContextValue,
    loadedResources,
    needCreateAppointmentEditForm,
    onViewRendered,
    props: {
      accessKey,
      activeStateEnabled,
      className,
      currentView,
      customizeDateNavigatorText,
      disabled,
      editing: {
        allowTimeZoneEditing,
        allowUpdating
      },
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      max,
      min,
      rtlEnabled,
      tabIndex,
      toolbar: toolbarItems,
      useDropDownViewSwitcher,
      views,
      visible,
      width
    },
    reducedIconEndDate,
    reducedIconTarget,
    reducedIconTooltipVisible,
    restAttributes,
    setCurrentDate,
    setCurrentView,
    startViewDate,
    tooltipData,
    tooltipTarget,
    tooltipVisible,
    workSpaceKey
  } = _ref;
  var {
    allDayPanelExpanded,
    allowMultipleCellSelection,
    cellDuration,
    crossScrollingEnabled,
    currentDate,
    dataCellTemplate,
    dateCellTemplate,
    endDayHour,
    firstDayOfWeek,
    groupByDate,
    groupOrientation,
    hoursInterval,
    indicatorUpdateInterval,
    intervalCount,
    resourceCellTemplate,
    scrolling,
    shadeUntilCurrentTime,
    showAllDayPanel,
    showCurrentTimeIndicator,
    startDate,
    startDayHour,
    timeCellTemplate,
    type
  } = currentViewConfig;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "classes": classes,
    "accessKey": accessKey,
    "activeStateEnabled": activeStateEnabled,
    "disabled": disabled,
    "focusStateEnabled": focusStateEnabled,
    "height": height,
    "hint": hint,
    "hoverStateEnabled": hoverStateEnabled,
    "rtlEnabled": rtlEnabled,
    "tabIndex": tabIndex,
    "visible": visible,
    "width": width,
    "className": className
  }, restAttributes, {
    children: createVNode(1, "div", "dx-scheduler-container", [toolbarItems.length !== 0 && createComponentVNode(2, SchedulerToolbar, {
      "items": toolbarItems,
      "views": views,
      "currentView": currentView,
      "onCurrentViewUpdate": setCurrentView,
      "currentDate": currentDate,
      "onCurrentDateUpdate": setCurrentDate,
      "startViewDate": startViewDate,
      "min": min,
      "max": max,
      "intervalCount": intervalCount,
      "firstDayOfWeek": firstDayOfWeek,
      "useDropDownViewSwitcher": useDropDownViewSwitcher,
      "customizationFunction": customizeDateNavigatorText,
      "viewType": type
    }), createComponentVNode(2, AppointmentsContextProvider, {
      "appointmentsContextValue": appointmentsContextValue,
      children: createComponentVNode(2, WorkSpace, {
        "firstDayOfWeek": firstDayOfWeek,
        "startDayHour": startDayHour,
        "endDayHour": endDayHour,
        "cellDuration": cellDuration,
        "groupByDate": groupByDate,
        "scrolling": scrolling,
        "currentDate": currentDate,
        "intervalCount": intervalCount,
        "groupOrientation": groupOrientation,
        "startDate": startDate,
        "startViewDate": startViewDate,
        "showAllDayPanel": showAllDayPanel,
        "showCurrentTimeIndicator": showCurrentTimeIndicator,
        "indicatorUpdateInterval": indicatorUpdateInterval,
        "shadeUntilCurrentTime": shadeUntilCurrentTime,
        "crossScrollingEnabled": crossScrollingEnabled,
        "hoursInterval": hoursInterval,
        "groups": loadedResources,
        "type": type,
        "schedulerHeight": height,
        "schedulerWidth": width,
        "allowMultipleCellSelection": allowMultipleCellSelection,
        "allDayPanelExpanded": allDayPanelExpanded,
        "onViewRendered": onViewRendered,
        "dataCellTemplate": dataCellTemplate,
        "timeCellTemplate": timeCellTemplate,
        "dateCellTemplate": dateCellTemplate,
        "resourceCellTemplate": resourceCellTemplate
      }, workSpaceKey)
    }), createComponentVNode(2, AppointmentTooltip, {
      "visible": tooltipVisible,
      "onVisibleChange": changeTooltipVisible,
      "target": tooltipTarget,
      "dataList": tooltipData
    }), createComponentVNode(2, ReducedIconTooltip, {
      "visible": reducedIconTooltipVisible,
      "endDate": reducedIconEndDate,
      "target": reducedIconTarget
    }), needCreateAppointmentEditForm && createComponentVNode(2, FormContextProvider, {
      "formContextValue": formContextValue,
      children: createComponentVNode(2, AppointmentEditForm, {
        "visible": appointmentEditFormVisible,
        "fullScreen": appointmentPopupSize.fullScreen,
        "maxWidth": appointmentPopupSize.maxWidth,
        "dataAccessors": dataAccessors,
        "appointmentData": appointmentFormData,
        "allowUpdating": allowUpdating,
        "firstDayOfWeek": firstDayOfWeek,
        "onVisibleChange": changeAppointmentEditFormVisible,
        "allowTimeZoneEditing": allowTimeZoneEditing
      })
    })], 0)
  })));
};
import { createReRenderEffect } from '@devextreme/runtime/inferno';
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Scheduler extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.state = {
      workSpaceViewModel: undefined,
      resourcePromisesMap: new Map(),
      loadedResources: undefined,
      dataItems: [],
      tooltipTarget: undefined,
      tooltipVisible: false,
      appointmentEditFormVisible: false,
      appointmentPopupSize: undefined,
      appointmentFocus: {
        type: 'regular',
        index: -1
      },
      needCreateAppointmentEditForm: false,
      tooltipData: [],
      appointmentFormData: undefined,
      lastViewDateByEndDayHour: undefined,
      reducedIconTooltipVisible: false,
      reducedIconEndDate: undefined,
      reducedIconTarget: undefined,
      formContextValue: undefined,
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.props.defaultCurrentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.props.defaultCurrentView
    };
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.getEndViewDate = this.getEndViewDate.bind(this);
    this.getStartViewDate = this.getStartViewDate.bind(this);
    this.hideAppointmentPopup = this.hideAppointmentPopup.bind(this);
    this.hideAppointmentTooltip = this.hideAppointmentTooltip.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToTime = this.scrollToTime.bind(this);
    this.showAppointmentPopup = this.showAppointmentPopup.bind(this);
    this.showAppointmentTooltip = this.showAppointmentTooltip.bind(this);
    this.loadGroupResources = this.loadGroupResources.bind(this);
    this.loadDataSource = this.loadDataSource.bind(this);
    this.onViewRendered = this.onViewRendered.bind(this);
    this.setCurrentView = this.setCurrentView.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.showAppointmentPopupForm = this.showAppointmentPopupForm.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.changeTooltipVisible = this.changeTooltipVisible.bind(this);
    this.changeAppointmentEditFormVisible = this.changeAppointmentEditFormVisible.bind(this);
    this.showReducedIconTooltip = this.showReducedIconTooltip.bind(this);
    this.hideReducedIconTooltip = this.hideReducedIconTooltip.bind(this);
    this.updateAppointmentFocus = this.updateAppointmentFocus.bind(this);
    this.updateFocusedAppointment = this.updateFocusedAppointment.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.loadGroupResources, [this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]), new InfernoEffect(this.loadDataSource, [this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.groups, this.state.currentView, this.props.currentView, this.props.views, this.props.resources, this.state.resourcePromisesMap]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.dataSource, this.props.remoteFiltering, this.state.lastViewDateByEndDayHour, this.props.startDateExpr, this.props.endDateExpr, this.props.startDateTimeZoneExpr, this.props.endDateTimeZoneExpr, this.props.allDayExpr, this.props.textExpr, this.props.descriptionExpr, this.props.recurrenceRuleExpr, this.props.recurrenceExceptionExpr, this.props.resources, this.props.allDayPanelMode, this.props.appointmentCollectorTemplate, this.props.appointmentTemplate, this.props.appointmentTooltipTemplate, this.props.cellDuration, this.props.crossScrollingEnabled, this.state.currentDate, this.props.currentDate, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.height, this.props.indicatorUpdateInterval, this.props.maxAppointmentsPerCell, this.props.resourceCellTemplate, this.props.scrolling, this.props.shadeUntilCurrentTime, this.props.showAllDayPanel, this.props.showCurrentTimeIndicator, this.props.startDayHour, this.props.timeCellTemplate, this.props.width, this.state.currentView, this.props.currentView, this.props.views, this.props.dateSerializationFormat]);
  }
  loadGroupResources() {
    loadResources(this.mergedGroups, this.props.resources, this.state.resourcePromisesMap).then(loadedResources => {
      this.setState(__state_argument => ({
        loadedResources: loadedResources
      }));
    });
  }
  loadDataSource() {
    if (!this.internalDataSource.isLoaded() && !this.internalDataSource.isLoading()) {
      if (this.props.remoteFiltering && this.state.lastViewDateByEndDayHour) {
        var combinedFilter = combineRemoteFilter({
          dataAccessors: this.dataAccessors,
          dataSourceFilter: this.internalDataSource.filter(),
          min: this.startViewDate,
          max: this.state.lastViewDateByEndDayHour,
          dateSerializationFormat: this.props.dateSerializationFormat
        });
        this.internalDataSource.filter(combinedFilter);
      }
      this.internalDataSource.load().done(loadOptions => {
        this.setState(__state_argument => ({
          dataItems: resolveDataItems(loadOptions)
        }));
      });
    }
  }
  get currentViewProps() {
    var {
      views
    } = this.props;
    return getCurrentViewProps(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, views);
  }
  get currentViewConfig() {
    if (this.__getterCache['currentViewConfig'] !== undefined) {
      return this.__getterCache['currentViewConfig'];
    }
    return this.__getterCache['currentViewConfig'] = (() => {
      var {
        allDayPanelMode,
        appointmentCollectorTemplate,
        appointmentTemplate,
        appointmentTooltipTemplate,
        cellDuration,
        crossScrollingEnabled,
        dataCellTemplate,
        dateCellTemplate,
        endDayHour,
        firstDayOfWeek,
        groupByDate,
        height,
        indicatorUpdateInterval,
        maxAppointmentsPerCell,
        resourceCellTemplate,
        scrolling,
        shadeUntilCurrentTime,
        showAllDayPanel,
        showCurrentTimeIndicator,
        startDayHour,
        timeCellTemplate,
        width
      } = this.props;
      return getCurrentViewConfig(this.currentViewProps, {
        firstDayOfWeek,
        startDayHour,
        endDayHour,
        cellDuration,
        groupByDate,
        scrolling,
        dataCellTemplate,
        timeCellTemplate,
        resourceCellTemplate,
        dateCellTemplate,
        appointmentTemplate,
        appointmentCollectorTemplate,
        appointmentTooltipTemplate,
        maxAppointmentsPerCell,
        showAllDayPanel,
        showCurrentTimeIndicator,
        indicatorUpdateInterval,
        shadeUntilCurrentTime,
        crossScrollingEnabled,
        height,
        width,
        allDayPanelMode
      }, this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate);
    })();
  }
  get isValidViewDataProvider() {
    var _this$state$workSpace;
    var {
      allDayPanelExpanded,
      cellDuration,
      crossScrollingEnabled,
      currentDate,
      endDayHour,
      firstDayOfWeek,
      groupByDate,
      groupOrientation,
      hoursInterval,
      intervalCount,
      scrolling,
      showAllDayPanel,
      startDate,
      startDayHour,
      type
    } = this.currentViewConfig;
    return isViewDataProviderConfigValid((_this$state$workSpace = this.state.workSpaceViewModel) === null || _this$state$workSpace === void 0 ? void 0 : _this$state$workSpace.viewDataProviderValidationOptions, {
      intervalCount: intervalCount !== null && intervalCount !== void 0 ? intervalCount : 1,
      currentDate,
      type,
      hoursInterval,
      startDayHour,
      endDayHour,
      groupOrientation,
      groupByDate,
      crossScrollingEnabled,
      firstDayOfWeek,
      startDate,
      showAllDayPanel,
      allDayPanelExpanded,
      scrolling,
      cellDuration,
      groups: this.state.loadedResources
    });
  }
  get dataAccessors() {
    if (this.__getterCache['dataAccessors'] !== undefined) {
      return this.__getterCache['dataAccessors'];
    }
    return this.__getterCache['dataAccessors'] = (() => {
      return createDataAccessors({
        startDateExpr: this.props.startDateExpr,
        endDateExpr: this.props.endDateExpr,
        startDateTimeZoneExpr: this.props.startDateTimeZoneExpr,
        endDateTimeZoneExpr: this.props.endDateTimeZoneExpr,
        allDayExpr: this.props.allDayExpr,
        textExpr: this.props.textExpr,
        descriptionExpr: this.props.descriptionExpr,
        recurrenceRuleExpr: this.props.recurrenceRuleExpr,
        recurrenceExceptionExpr: this.props.recurrenceExceptionExpr,
        resources: this.props.resources
      });
    })();
  }
  get startViewDate() {
    if (this.__getterCache['startViewDate'] !== undefined) {
      return this.__getterCache['startViewDate'];
    }
    return this.__getterCache['startViewDate'] = (() => {
      var {
        currentDate,
        firstDayOfWeek,
        intervalCount,
        startDate,
        startDayHour,
        type
      } = this.currentViewConfig;
      var options = {
        currentDate,
        startDayHour,
        startDate,
        intervalCount,
        firstDayOfWeek
      };
      var viewDataGenerator = getViewDataGeneratorByViewType(type);
      var startViewDate = viewDataGenerator.getStartViewDate(options);
      return startViewDate;
    })();
  }
  get isVirtualScrolling() {
    var _this$currentViewProp;
    return this.props.scrolling.mode === 'virtual' || ((_this$currentViewProp = this.currentViewProps.scrolling) === null || _this$currentViewProp === void 0 ? void 0 : _this$currentViewProp.mode) === 'virtual';
  }
  get timeZoneCalculator() {
    if (this.__getterCache['timeZoneCalculator'] !== undefined) {
      return this.__getterCache['timeZoneCalculator'];
    }
    return this.__getterCache['timeZoneCalculator'] = (() => {
      return createTimeZoneCalculator(this.props.timeZone);
    })();
  }
  get internalDataSource() {
    if (this.props.dataSource instanceof DataSource) {
      return this.props.dataSource;
    }
    if (this.props.dataSource instanceof Array) {
      return new DataSource({
        store: {
          type: 'array',
          data: this.props.dataSource
        },
        paginate: false
      });
    }
    return new DataSource(this.props.dataSource);
  }
  get appointmentsConfig() {
    if (this.__getterCache['appointmentsConfig'] !== undefined) {
      return this.__getterCache['appointmentsConfig'];
    }
    return this.__getterCache['appointmentsConfig'] = (() => {
      if (!this.isValidViewDataProvider || !this.state.loadedResources) {
        return undefined;
      }
      var renderConfig = getViewRenderConfigByType(this.currentViewConfig.type, this.currentViewConfig.crossScrollingEnabled, this.currentViewConfig.intervalCount, this.state.loadedResources, this.currentViewConfig.groupOrientation);
      return getAppointmentsConfig({
        adaptivityEnabled: this.props.adaptivityEnabled,
        rtlEnabled: this.props.rtlEnabled,
        resources: this.props.resources,
        timeZone: this.props.timeZone,
        groups: this.mergedGroups
      }, {
        startDayHour: this.currentViewConfig.startDayHour,
        endDayHour: this.currentViewConfig.endDayHour,
        currentDate: this.currentViewConfig.currentDate,
        scrolling: this.currentViewConfig.scrolling,
        intervalCount: this.currentViewConfig.intervalCount,
        hoursInterval: this.currentViewConfig.hoursInterval,
        showAllDayPanel: this.currentViewConfig.showAllDayPanel,
        firstDayOfWeek: this.currentViewConfig.firstDayOfWeek,
        type: this.currentViewConfig.type,
        cellDuration: this.currentViewConfig.cellDuration,
        maxAppointmentsPerCell: this.currentViewConfig.maxAppointmentsPerCell,
        allDayPanelMode: this.currentViewConfig.allDayPanelMode
      }, this.state.loadedResources, this.state.workSpaceViewModel.viewDataProvider, renderConfig.isAllDayPanelSupported);
    })();
  }
  get preparedDataItems() {
    if (this.__getterCache['preparedDataItems'] !== undefined) {
      return this.__getterCache['preparedDataItems'];
    }
    return this.__getterCache['preparedDataItems'] = (() => {
      return getPreparedDataItems(this.state.dataItems, this.dataAccessors, this.currentViewConfig.cellDuration, this.timeZoneCalculator);
    })();
  }
  get filteredItems() {
    if (this.__getterCache['filteredItems'] !== undefined) {
      return this.__getterCache['filteredItems'];
    }
    return this.__getterCache['filteredItems'] = (() => {
      if (!this.appointmentsConfig) {
        return [];
      }
      var filterStrategy = getFilterStrategy(this.appointmentsConfig.resources, this.appointmentsConfig.startDayHour, this.appointmentsConfig.endDayHour, this.appointmentsConfig.cellDurationInMinutes, this.appointmentsConfig.showAllDayPanel, this.appointmentsConfig.supportAllDayRow, this.appointmentsConfig.firstDayOfWeek, this.appointmentsConfig.viewType, this.appointmentsConfig.dateRange, this.appointmentsConfig.groupCount, this.appointmentsConfig.loadedResources, this.appointmentsConfig.isVirtualScrolling, this.timeZoneCalculator, this.dataAccessors, this.state.workSpaceViewModel.viewDataProvider);
      return filterStrategy.filter(this.preparedDataItems);
    })();
  }
  get appointmentsViewModel() {
    if (this.__getterCache['appointmentsViewModel'] !== undefined) {
      return this.__getterCache['appointmentsViewModel'];
    }
    return this.__getterCache['appointmentsViewModel'] = (() => {
      if (!this.appointmentsConfig || this.filteredItems.length === 0) {
        return {
          allDay: [],
          allDayCompact: [],
          regular: [],
          regularCompact: []
        };
      }
      var model = getAppointmentsModel(this.appointmentsConfig, this.state.workSpaceViewModel.viewDataProvider, this.timeZoneCalculator, this.dataAccessors, this.state.workSpaceViewModel.cellsMetaData);
      return getAppointmentsViewModel(model, this.filteredItems);
    })();
  }
  get workSpaceKey() {
    var _this$state$loadedRes;
    var {
      crossScrollingEnabled,
      groupOrientation,
      intervalCount
    } = this.currentViewConfig;
    if (!crossScrollingEnabled) {
      return '';
    }
    var groupCount = getGroupCount((_this$state$loadedRes = this.state.loadedResources) !== null && _this$state$loadedRes !== void 0 ? _this$state$loadedRes : []);
    return "".concat(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView, "_").concat(groupOrientation, "_").concat(intervalCount, "_").concat(groupCount);
  }
  get mergedGroups() {
    if (this.__getterCache['mergedGroups'] !== undefined) {
      return this.__getterCache['mergedGroups'];
    }
    return this.__getterCache['mergedGroups'] = (() => {
      return getValidGroups(this.props.groups, this.currentViewProps.groups);
    })();
  }
  get appointmentsContextValue() {
    if (this.__getterCache['appointmentsContextValue'] !== undefined) {
      return this.__getterCache['appointmentsContextValue'];
    }
    return this.__getterCache['appointmentsContextValue'] = (() => {
      return {
        viewModel: this.appointmentsViewModel,
        groups: this.mergedGroups,
        resources: this.props.resources,
        resourceLoaderMap: this.state.resourcePromisesMap,
        loadedResources: this.state.loadedResources,
        dataAccessors: this.dataAccessors,
        appointmentTemplate: this.currentViewConfig.appointmentTemplate,
        overflowIndicatorTemplate: this.currentViewConfig.appointmentCollectorTemplate,
        onAppointmentClick: data => this.showTooltip(data),
        onAppointmentDoubleClick: data => this.showAppointmentPopupForm(data),
        showReducedIconTooltip: data => this.showReducedIconTooltip(data),
        hideReducedIconTooltip: () => this.hideReducedIconTooltip(),
        updateFocusedAppointment: this.updateFocusedAppointment
      };
    })();
  }
  get classes() {
    return combineClasses({
      'dx-scheduler': true,
      'dx-scheduler-native': true,
      'dx-scheduler-adaptive': this.props.adaptivityEnabled
    });
  }
  onViewRendered(viewMetaData) {
    var _this$state$lastViewD;
    this.setState(__state_argument => ({
      workSpaceViewModel: viewMetaData
    }));
    var {
      viewDataProvider
    } = viewMetaData;
    var lastViewDate = viewDataProvider.getLastViewDateByEndDayHour(this.currentViewConfig.endDayHour);
    if (lastViewDate.getTime() !== ((_this$state$lastViewD = this.state.lastViewDateByEndDayHour) === null || _this$state$lastViewD === void 0 ? void 0 : _this$state$lastViewD.getTime())) {
      this.setState(__state_argument => ({
        lastViewDateByEndDayHour: lastViewDate
      }));
    }
  }
  setCurrentView(view) {
    {
      var __newValue;
      this.setState(__state_argument => {
        __newValue = view;
        return {
          currentView: __newValue
        };
      });
      this.props.currentViewChange(__newValue);
    }
  }
  setCurrentDate(date) {
    {
      var __newValue;
      this.setState(__state_argument => {
        __newValue = date;
        return {
          currentDate: __newValue
        };
      });
      this.props.currentDateChange(__newValue);
    }
  }
  showTooltip(e) {
    this.setState(__state_argument => ({
      tooltipData: e.data
    }));
    this.setState(__state_argument => ({
      tooltipTarget: e.target
    }));
    this.changeTooltipVisible(true);
  }
  showAppointmentPopupForm(_ref2) {
    var {
      data
    } = _ref2;
    var appointmentData = data[0];
    this.setState(__state_argument => ({
      appointmentFormData: appointmentData.appointment
    }));
    this.setState(__state_argument => ({
      formContextValue: {
        formData: createFormData(appointmentData.appointment)
      }
    }));
    var {
      isRecurrent
    } = appointmentData.info;
    this.setState(__state_argument => ({
      appointmentPopupSize: getPopupSize(isRecurrent)
    }));
    this.setState(__state_argument => ({
      needCreateAppointmentEditForm: true
    }));
    this.hideTooltip();
    this.changeAppointmentEditFormVisible(true);
  }
  hideTooltip() {
    this.changeTooltipVisible(false);
  }
  changeTooltipVisible(value) {
    this.setState(__state_argument => ({
      tooltipVisible: value
    }));
  }
  changeAppointmentEditFormVisible(value) {
    this.setState(__state_argument => ({
      appointmentEditFormVisible: value
    }));
  }
  showReducedIconTooltip(data) {
    this.setState(__state_argument => ({
      reducedIconTarget: data.target
    }));
    this.setState(__state_argument => ({
      reducedIconEndDate: data.endDate
    }));
    this.setState(__state_argument => ({
      reducedIconTooltipVisible: true
    }));
  }
  hideReducedIconTooltip() {
    this.setState(__state_argument => ({
      reducedIconTooltipVisible: false
    }));
  }
  updateAppointmentFocus(type, index) {
    this.state.appointmentFocus.type = type;
    this.state.appointmentFocus.index = index;
  }
  updateFocusedAppointment(type, index) {
    var {
      index: prevFocusedIndex,
      type: prevFocusedType
    } = this.state.appointmentFocus;
    if (prevFocusedIndex >= 0) {
      var prevViewModels = this.appointmentsViewModel[prevFocusedType];
      var prevViewModel = prevViewModels[prevFocusedIndex];
      prevViewModels[prevFocusedIndex] = _extends({}, prevViewModel, {
        focused: false
      });
    }
    this.updateAppointmentFocus(type, index);
    var viewModels = this.appointmentsViewModel[type];
    viewModels[index] = _extends({}, viewModels[index], {
      focused: true
    });
  }
  get restAttributes() {
    var _this$props$currentDa = _extends({}, this.props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
      restProps = _objectWithoutPropertiesLoose(_this$props$currentDa, _excluded);
    return restProps;
  }
  addAppointment(_appointment) {}
  deleteAppointment(_appointment) {}
  updateAppointment(_target, _appointment) {}
  getDataSource() {
    return this.internalDataSource;
  }
  getEndViewDate() {
    return this.state.workSpaceViewModel.viewDataProvider.getLastCellEndDate();
  }
  getStartViewDate() {
    return this.startViewDate;
  }
  hideAppointmentPopup(_saveChanges) {}
  hideAppointmentTooltip() {
    this.hideTooltip();
  }
  scrollTo(_date, _group, _allDay) {}
  scrollToTime(_hours, _minutes, _date) {}
  showAppointmentPopup(_appointmentData, _createNewAppointment, _currentAppointmentData) {}
  showAppointmentTooltip(_appointmentData, _target, _currentAppointmentData) {}
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['currentViewConfig'] = undefined;
    }
    if (this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.props['resources'] !== nextProps['resources']) {
      this.__getterCache['dataAccessors'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['startViewDate'] = undefined;
    }
    if (this.props['timeZone'] !== nextProps['timeZone']) {
      this.__getterCache['timeZoneCalculator'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups']) {
      this.__getterCache['appointmentsConfig'] = undefined;
    }
    if (this.state['dataItems'] !== nextState['dataItems'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.props['resources'] !== nextProps['resources'] || this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.props['timeZone'] !== nextProps['timeZone']) {
      this.__getterCache['preparedDataItems'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems']) {
      this.__getterCache['filteredItems'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems']) {
      this.__getterCache['appointmentsViewModel'] = undefined;
    }
    if (this.props['groups'] !== nextProps['groups'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView']) {
      this.__getterCache['mergedGroups'] = undefined;
    }
    if (this.props['allDayPanelMode'] !== nextProps['allDayPanelMode'] || this.props['appointmentCollectorTemplate'] !== nextProps['appointmentCollectorTemplate'] || this.props['appointmentTemplate'] !== nextProps['appointmentTemplate'] || this.props['appointmentTooltipTemplate'] !== nextProps['appointmentTooltipTemplate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['dataCellTemplate'] !== nextProps['dataCellTemplate'] || this.props['dateCellTemplate'] !== nextProps['dateCellTemplate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['height'] !== nextProps['height'] || this.props['indicatorUpdateInterval'] !== nextProps['indicatorUpdateInterval'] || this.props['maxAppointmentsPerCell'] !== nextProps['maxAppointmentsPerCell'] || this.props['resourceCellTemplate'] !== nextProps['resourceCellTemplate'] || this.props['scrolling'] !== nextProps['scrolling'] || this.props['shadeUntilCurrentTime'] !== nextProps['shadeUntilCurrentTime'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.props['showCurrentTimeIndicator'] !== nextProps['showCurrentTimeIndicator'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['timeCellTemplate'] !== nextProps['timeCellTemplate'] || this.props['width'] !== nextProps['width'] || this.state['currentDate'] !== nextState['currentDate'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['views'] !== nextProps['views'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.state['workSpaceViewModel'] !== nextState['workSpaceViewModel'] || this.state['loadedResources'] !== nextState['loadedResources'] || this.props['adaptivityEnabled'] !== nextProps['adaptivityEnabled'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.props['resources'] !== nextProps['resources'] || this.props['timeZone'] !== nextProps['timeZone'] || this.props['groups'] !== nextProps['groups'] || this.props['startDateExpr'] !== nextProps['startDateExpr'] || this.props['endDateExpr'] !== nextProps['endDateExpr'] || this.props['startDateTimeZoneExpr'] !== nextProps['startDateTimeZoneExpr'] || this.props['endDateTimeZoneExpr'] !== nextProps['endDateTimeZoneExpr'] || this.props['allDayExpr'] !== nextProps['allDayExpr'] || this.props['textExpr'] !== nextProps['textExpr'] || this.props['descriptionExpr'] !== nextProps['descriptionExpr'] || this.props['recurrenceRuleExpr'] !== nextProps['recurrenceRuleExpr'] || this.props['recurrenceExceptionExpr'] !== nextProps['recurrenceExceptionExpr'] || this.state['dataItems'] !== nextState['dataItems'] || this.state['resourcePromisesMap'] !== nextState['resourcePromisesMap'] || this.state['appointmentFocus'] !== nextState['appointmentFocus']) {
      this.__getterCache['appointmentsContextValue'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView,
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
      }),
      workSpaceViewModel: this.state.workSpaceViewModel,
      resourcePromisesMap: this.state.resourcePromisesMap,
      loadedResources: this.state.loadedResources,
      dataItems: this.state.dataItems,
      tooltipTarget: this.state.tooltipTarget,
      tooltipVisible: this.state.tooltipVisible,
      appointmentEditFormVisible: this.state.appointmentEditFormVisible,
      appointmentPopupSize: this.state.appointmentPopupSize,
      appointmentFocus: this.state.appointmentFocus,
      needCreateAppointmentEditForm: this.state.needCreateAppointmentEditForm,
      tooltipData: this.state.tooltipData,
      appointmentFormData: this.state.appointmentFormData,
      lastViewDateByEndDayHour: this.state.lastViewDateByEndDayHour,
      reducedIconTooltipVisible: this.state.reducedIconTooltipVisible,
      reducedIconEndDate: this.state.reducedIconEndDate,
      reducedIconTarget: this.state.reducedIconTarget,
      formContextValue: this.state.formContextValue,
      currentViewProps: this.currentViewProps,
      currentViewConfig: this.currentViewConfig,
      isValidViewDataProvider: this.isValidViewDataProvider,
      dataAccessors: this.dataAccessors,
      startViewDate: this.startViewDate,
      isVirtualScrolling: this.isVirtualScrolling,
      timeZoneCalculator: this.timeZoneCalculator,
      internalDataSource: this.internalDataSource,
      appointmentsConfig: this.appointmentsConfig,
      preparedDataItems: this.preparedDataItems,
      filteredItems: this.filteredItems,
      appointmentsViewModel: this.appointmentsViewModel,
      workSpaceKey: this.workSpaceKey,
      mergedGroups: this.mergedGroups,
      appointmentsContextValue: this.appointmentsContextValue,
      classes: this.classes,
      onViewRendered: this.onViewRendered,
      setCurrentView: this.setCurrentView,
      setCurrentDate: this.setCurrentDate,
      showTooltip: this.showTooltip,
      showAppointmentPopupForm: this.showAppointmentPopupForm,
      hideTooltip: this.hideTooltip,
      changeTooltipVisible: this.changeTooltipVisible,
      changeAppointmentEditFormVisible: this.changeAppointmentEditFormVisible,
      showReducedIconTooltip: this.showReducedIconTooltip,
      hideReducedIconTooltip: this.hideReducedIconTooltip,
      updateAppointmentFocus: this.updateAppointmentFocus,
      updateFocusedAppointment: this.updateFocusedAppointment,
      restAttributes: this.restAttributes
    });
  }
}
Scheduler.defaultProps = SchedulerProps;