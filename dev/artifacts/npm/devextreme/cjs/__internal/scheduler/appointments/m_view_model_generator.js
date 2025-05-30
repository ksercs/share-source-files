/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_view_model_generator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentViewModelGenerator = void 0;
var _utils = require("../../../renovation/ui/scheduler/appointment/utils");
var _m_strategy_agenda = _interopRequireDefault(require("./rendering_strategies/m_strategy_agenda"));
var _m_strategy_horizontal = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal"));
var _m_strategy_horizontal_month = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal_month"));
var _m_strategy_horizontal_month_line = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal_month_line"));
var _m_strategy_vertical = _interopRequireDefault(require("./rendering_strategies/m_strategy_vertical"));
var _m_strategy_week = _interopRequireDefault(require("./rendering_strategies/m_strategy_week"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var RENDERING_STRATEGIES = {
  horizontal: _m_strategy_horizontal.default,
  horizontalMonth: _m_strategy_horizontal_month.default,
  horizontalMonthLine: _m_strategy_horizontal_month_line.default,
  vertical: _m_strategy_vertical.default,
  week: _m_strategy_week.default,
  agenda: _m_strategy_agenda.default
};
var AppointmentViewModelGenerator = /*#__PURE__*/function () {
  function AppointmentViewModelGenerator() {}
  var _proto = AppointmentViewModelGenerator.prototype;
  _proto.initRenderingStrategy = function initRenderingStrategy(options) {
    var RenderingStrategy = RENDERING_STRATEGIES[options.appointmentRenderingStrategyName];
    this.renderingStrategy = new RenderingStrategy(options);
  };
  _proto.generate = function generate(filteredItems, options) {
    var isRenovatedAppointments = options.isRenovatedAppointments;
    var appointments = filteredItems ? filteredItems.slice() : [];
    this.initRenderingStrategy(options);
    var renderingStrategy = this.getRenderingStrategy();
    var positionMap = renderingStrategy.createTaskPositionMap(appointments); // TODO - appointments are mutated inside!
    var viewModel = this.postProcess(appointments, positionMap, isRenovatedAppointments);
    if (isRenovatedAppointments) {
      // TODO this structure should be by default after remove old render
      return this.makeRenovatedViewModels(viewModel, options.supportAllDayRow, options.isVerticalGroupOrientation);
    }
    return {
      positionMap,
      viewModel
    };
  };
  _proto.postProcess = function postProcess(filteredItems, positionMap, isRenovatedAppointments) {
    var renderingStrategy = this.getRenderingStrategy();
    return filteredItems.map(function (data, index) {
      // TODO research do we need this code
      if (!renderingStrategy.keepAppointmentSettings()) {
        delete data.settings;
      }
      // TODO Seems we can analize direction in the rendering strategies
      var appointmentSettings = positionMap[index];
      appointmentSettings.forEach(function (item) {
        item.direction = renderingStrategy.getDirection() === 'vertical' && !item.allDay ? 'vertical' : 'horizontal';
      });
      var item = {
        itemData: data,
        settings: appointmentSettings
      };
      if (!isRenovatedAppointments) {
        item.needRepaint = true;
        item.needRemove = false;
      }
      return item;
    });
  };
  _proto.makeRenovatedViewModels = function makeRenovatedViewModels(viewModel, supportAllDayRow, isVerticalGrouping) {
    var _this = this;
    var strategy = this.getRenderingStrategy();
    var regularViewModels = [];
    var allDayViewModels = [];
    var compactOptions = [];
    var isAllDayPanel = supportAllDayRow && !isVerticalGrouping;
    viewModel.forEach(function (_ref) {
      var itemData = _ref.itemData,
        settings = _ref.settings;
      settings.forEach(function (options) {
        var item = _this.prepareViewModel(options, strategy, itemData);
        if (options.isCompact) {
          compactOptions.push({
            compactViewModel: options.virtual,
            appointmentViewModel: item
          });
        } else if (options.allDay && isAllDayPanel) {
          allDayViewModels.push(item);
        } else {
          regularViewModels.push(item);
        }
      });
    });
    var compactViewModels = this.prepareCompactViewModels(compactOptions, supportAllDayRow);
    var result = _extends({
      allDay: allDayViewModels,
      regular: regularViewModels
    }, compactViewModels);
    return result;
  };
  _proto.prepareViewModel = function prepareViewModel(options, strategy, itemData) {
    var geometry = strategy.getAppointmentGeometry(options);
    var viewModel = {
      key: (0, _utils.getAppointmentKey)(geometry),
      appointment: itemData,
      geometry: _extends(_extends({}, geometry), {
        // TODO move to the rendering strategies
        leftVirtualWidth: options.leftVirtualWidth,
        topVirtualHeight: options.topVirtualHeight
      }),
      info: _extends(_extends({}, options.info), {
        allDay: options.allDay,
        direction: options.direction,
        appointmentReduced: options.appointmentReduced,
        groupIndex: options.groupIndex
      })
    };
    return viewModel;
  };
  _proto.getCompactViewModelFrame = function getCompactViewModelFrame(compactViewModel) {
    return {
      isAllDay: !!compactViewModel.isAllDay,
      isCompact: compactViewModel.isCompact,
      groupIndex: compactViewModel.groupIndex,
      geometry: {
        left: compactViewModel.left,
        top: compactViewModel.top,
        width: compactViewModel.width,
        height: compactViewModel.height
      },
      items: {
        colors: [],
        data: [],
        settings: []
      }
    };
  };
  _proto.prepareCompactViewModels = function prepareCompactViewModels(compactOptions, supportAllDayRow) {
    var _this2 = this;
    var regularCompact = {};
    var allDayCompact = {};
    compactOptions.forEach(function (_ref2) {
      var compactViewModel = _ref2.compactViewModel,
        appointmentViewModel = _ref2.appointmentViewModel;
      var index = compactViewModel.index,
        isAllDay = compactViewModel.isAllDay;
      var viewModel = isAllDay && supportAllDayRow ? allDayCompact : regularCompact;
      if (!viewModel[index]) {
        viewModel[index] = _this2.getCompactViewModelFrame(compactViewModel);
      }
      var _viewModel$index$item = viewModel[index].items,
        settings = _viewModel$index$item.settings,
        data = _viewModel$index$item.data,
        colors = _viewModel$index$item.colors;
      settings.push(appointmentViewModel);
      data.push(appointmentViewModel.appointment);
      colors.push(appointmentViewModel.info.resourceColor);
    });
    var toArray = function toArray(items) {
      return Object.keys(items).map(function (key) {
        return _extends({
          key
        }, items[key]);
      });
    };
    var allDayViewModels = toArray(allDayCompact);
    var regularViewModels = toArray(regularCompact);
    return {
      allDayCompact: allDayViewModels,
      regularCompact: regularViewModels
    };
  };
  _proto.getRenderingStrategy = function getRenderingStrategy() {
    return this.renderingStrategy;
  };
  return AppointmentViewModelGenerator;
}();
exports.AppointmentViewModelGenerator = AppointmentViewModelGenerator;
