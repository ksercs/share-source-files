import _extends from "@babel/runtime/helpers/esm/extends";
import { getWidth } from '../../core/utils/size';
import $ from '../../core/renderer';
import Guid from '../../core/guid';
import registerComponent from '../../core/component_registrator';
import { noop } from '../../core/utils/common';
import { isNumeric, isString, isFunction, isDefined } from '../../core/utils/type';
import { inRange } from '../../core/utils/math';
import { extend } from '../../core/utils/extend';
import Button from '../button';
import Editor from '../editor/editor';
import Swipeable from '../../events/gesture/swipeable';
import Navigator from './ui.calendar.navigator';
import Views from './ui.calendar.views';
import { move } from '../../animation/translator';
import dateUtils from '../../core/utils/date';
import dateSerialization from '../../core/utils/date_serialization';
import devices from '../../core/devices';
import fx from '../../animation/fx';
import { hasWindow } from '../../core/utils/window';
import messageLocalization from '../../localization/message';
import dateLocalization from '../../localization/date';
import { FunctionTemplate } from '../../core/templates/function_template';
import { isCommandKeyPressed } from '../../events/utils/index';
import CalendarSingleSelectionStrategy from './ui.calendar.single.selection.strategy';
import CalendarMultiSelectionStrategy from './ui.calendar.multi.selection.strategy';
import CalendarRangeSelectionStrategy from './ui.calendar.range.selection.strategy';

// STYLE calendar

var CALENDAR_CLASS = 'dx-calendar';
var CALENDAR_BODY_CLASS = 'dx-calendar-body';
var CALENDAR_CELL_CLASS = 'dx-calendar-cell';
var CALENDAR_FOOTER_CLASS = 'dx-calendar-footer';
var CALENDAR_TODAY_BUTTON_CLASS = 'dx-calendar-today-button';
var CALENDAR_HAS_FOOTER_CLASS = 'dx-calendar-with-footer';
var CALENDAR_VIEWS_WRAPPER_CLASS = 'dx-calendar-views-wrapper';
var CALENDAR_VIEW_CLASS = 'dx-calendar-view';
var CALENDAR_MULTIVIEW_CLASS = 'dx-calendar-multiview';
var FOCUSED_STATE_CLASS = 'dx-state-focused';
var ANIMATION_DURATION_SHOW_VIEW = 250;
var POP_ANIMATION_FROM = 0.6;
var POP_ANIMATION_TO = 1;
var CALENDAR_INPUT_STANDARD_PATTERN = 'yyyy-MM-dd';
var CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
var LEVEL_COMPARE_MAP = {
  'month': 3,
  'year': 2,
  'decade': 1,
  'century': 0
};
var ZOOM_LEVEL = {
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
};
var SELECTION_STRATEGIES = {
  SingleSelection: CalendarSingleSelectionStrategy,
  MultiSelection: CalendarMultiSelectionStrategy,
  RangeSelection: CalendarRangeSelectionStrategy
};
function elementHasFocus(element) {
  return element.hasClass(FOCUSED_STATE_CLASS);
}
var Calendar = Editor.inherit({
  _activeStateUnit: '.' + CALENDAR_CELL_CLASS,
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      /**
      * @name dxCalendarOptions.currentDate
      * @type Date
      * @hidden
      * @default new Date()
      */
      currentDate: new Date(),
      value: null,
      values: [],
      dateSerializationFormat: undefined,
      min: new Date(1000, 0),
      max: new Date(3000, 0),
      firstDayOfWeek: undefined,
      viewsCount: 1,
      zoomLevel: ZOOM_LEVEL.MONTH,
      maxZoomLevel: ZOOM_LEVEL.MONTH,
      minZoomLevel: ZOOM_LEVEL.CENTURY,
      selectionMode: 'single',
      showTodayButton: false,
      showWeekNumbers: false,
      weekNumberRule: 'auto',
      cellTemplate: 'cell',
      disabledDates: null,
      onCellClick: null,
      onContouredChanged: null,
      skipFocusCheck: false,
      _todayDate: () => new Date()

      /**
      * @name dxCalendarOptions.onContentReady
      * @hidden true
      * @action
      */
    });
  },

  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _supportedKeys: function _supportedKeys() {
    return extend(this.callBase(), {
      rightArrow: function rightArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._waitRenderView(1);
        } else {
          this._moveCurrentDateByOffset(1 * this._getRtlCorrection());
        }
      },
      leftArrow: function leftArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._waitRenderView(-1);
        } else {
          this._moveCurrentDateByOffset(-1 * this._getRtlCorrection());
        }
      },
      upArrow: function upArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._navigateUp();
        } else {
          if (fx.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(-1 * this._view.option('colCount'));
        }
      },
      downArrow: function downArrow(e) {
        e.preventDefault();
        if (isCommandKeyPressed(e)) {
          this._navigateDown();
        } else {
          if (fx.isAnimating(this._view.$element())) {
            return;
          }
          this._moveCurrentDateByOffset(1 * this._view.option('colCount'));
        }
      },
      home: function home(e) {
        e.preventDefault();
        var zoomLevel = this.option('zoomLevel');
        var currentDate = this.option('currentDate');
        var min = this._dateOption('min');
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        var date = dateUtils.sameView(zoomLevel, currentDate, min) ? min : dateUtils.getViewFirstCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      end: function end(e) {
        e.preventDefault();
        var zoomLevel = this.option('zoomLevel');
        var currentDate = this.option('currentDate');
        var max = this._dateOption('max');
        if (this._view.isDateDisabled(currentDate)) {
          return;
        }
        var date = dateUtils.sameView(zoomLevel, currentDate, max) ? max : dateUtils.getViewLastCellDate(zoomLevel, currentDate);
        this._moveToClosestAvailableDate(date);
      },
      pageUp: function pageUp(e) {
        e.preventDefault();
        this._waitRenderView(-1 * this._getRtlCorrection());
      },
      pageDown: function pageDown(e) {
        e.preventDefault();
        this._waitRenderView(1 * this._getRtlCorrection());
      },
      tab: noop,
      enter: function enter(e) {
        if (!this._isMaxZoomLevel()) {
          this._navigateDown();
        } else if (!this._view.isDateDisabled(this.option('currentDate'))) {
          var value = this._updateTimeComponent(this.option('currentDate'));
          this._selectionStrategy.selectValue(value, e);
        }
      }
    });
  },
  _getSerializationFormat: function _getSerializationFormat(optionName) {
    var value = this.option(optionName || 'value');
    if (this.option('dateSerializationFormat')) {
      return this.option('dateSerializationFormat');
    }
    if (isNumeric(value)) {
      return 'number';
    }
    if (!isString(value)) {
      return;
    }
    return dateSerialization.getDateSerializationFormat(value);
  },
  _convertToDate: function _convertToDate(value) {
    return dateSerialization.deserializeDate(value);
  },
  _dateValue: function _dateValue(value, event) {
    var optionName = Array.isArray(value) ? 'values' : 'value';
    if (event) {
      if (event.type === 'keydown') {
        var cellElement = this._view._getContouredCell().get(0);
        event.target = cellElement;
      }
      this._saveValueChangeEvent(event);
    }
    this._dateOption(optionName, value);
  },
  _dateOption: function _dateOption(optionName, optionValue) {
    if (arguments.length === 1) {
      var _this$option;
      var values = (_this$option = this.option('values')) !== null && _this$option !== void 0 ? _this$option : [];
      return optionName === 'values' ? values.map(value => this._convertToDate(value)) : this._convertToDate(this.option(optionName));
    }
    var serializationFormat = this._getSerializationFormat(optionName);
    var serializedValue = optionName === 'values' ? (optionValue === null || optionValue === void 0 ? void 0 : optionValue.map(value => dateSerialization.serializeDate(value, serializationFormat))) || [] : dateSerialization.serializeDate(optionValue, serializationFormat);
    this.option(optionName, serializedValue);
  },
  _shiftDate: function _shiftDate(zoomLevel, date, offset, reverse) {
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        date.setDate(date.getDate() + offset * reverse);
        break;
      case ZOOM_LEVEL.YEAR:
        date.setMonth(date.getMonth() + offset * reverse);
        break;
      case ZOOM_LEVEL.DECADE:
        date.setFullYear(date.getFullYear() + offset * reverse);
        break;
      case ZOOM_LEVEL.CENTURY:
        date.setFullYear(date.getFullYear() + 10 * offset * reverse);
        break;
    }
  },
  _moveCurrentDateByOffset: function _moveCurrentDateByOffset(offset) {
    var baseDate = this.option('currentDate');
    var currentDate = new Date(baseDate);
    var zoomLevel = this.option('zoomLevel');
    this._shiftDate(zoomLevel, currentDate, offset, 1);
    var maxDate = this._getMaxDate();
    var minDate = this._getMinDate();
    var isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, currentDate, baseDate);
    var isDateForwardInRange = inRange(currentDate, minDate, maxDate) && isDateForwardInNeighborView;
    var dateForward = new Date(currentDate);
    while (isDateForwardInRange) {
      if (!this._view.isDateDisabled(dateForward)) {
        currentDate = dateForward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, offset, 1);
      isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, dateForward, baseDate);
      isDateForwardInRange = inRange(dateForward, minDate, maxDate) && isDateForwardInNeighborView;
    }
    if (this._view.isDateDisabled(baseDate) || this._view.isDateDisabled(currentDate)) {
      this._waitRenderView(offset > 0 ? 1 : -1);
    } else {
      this._skipNavigate = true;
      this.option('currentDate', currentDate);
    }
  },
  _areDatesInSameView(zoomLevel, date1, date2) {
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        return date1.getMonth() === date2.getMonth();
      case ZOOM_LEVEL.YEAR:
        return date1.getYear() === date2.getYear();
      case ZOOM_LEVEL.DECADE:
        return parseInt(date1.getYear() / 10) === parseInt(date2.getYear() / 10);
      case ZOOM_LEVEL.CENTURY:
        return parseInt(date1.getYear() / 100) === parseInt(date2.getYear() / 100);
    }
  },
  _areDatesInNeighborView(zoomLevel, date1, date2) {
    var monthMinDistance = (a, b) => {
      var abs = Math.abs(a - b);
      return Math.min(abs, 12 - abs);
    };
    switch (zoomLevel) {
      case ZOOM_LEVEL.MONTH:
        return monthMinDistance(date1.getMonth(), date2.getMonth()) <= 1;
      case ZOOM_LEVEL.YEAR:
        return Math.abs(date1.getYear() - date2.getYear()) <= 1;
      case ZOOM_LEVEL.DECADE:
        return Math.abs(date1.getYear() - date2.getYear()) <= 10;
      case ZOOM_LEVEL.CENTURY:
        return Math.abs(date1.getYear() - date2.getYear()) <= 100;
    }
  },
  _moveToClosestAvailableDate: function _moveToClosestAvailableDate() {
    var baseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('currentDate');
    var currentDate = new Date(baseDate);
    var zoomLevel = this.option('zoomLevel');
    var isCurrentDateAvailable = !this._isDateNotAvailable(currentDate);
    var isDateForwardAvailable = isCurrentDateAvailable;
    var isDateBackwardAvailable = isCurrentDateAvailable;
    var isDateForwardInStartView;
    var isDateBackwardInStartView;
    var dateForward = new Date(currentDate);
    var dateBackward = new Date(currentDate);
    do {
      if (isDateForwardAvailable) {
        currentDate = dateForward;
        break;
      }
      if (isDateBackwardAvailable) {
        currentDate = dateBackward;
        break;
      }
      this._shiftDate(zoomLevel, dateForward, 1, 1);
      this._shiftDate(zoomLevel, dateBackward, 1, -1);
      isDateForwardInStartView = this._areDatesInSameView(zoomLevel, dateForward, baseDate);
      isDateBackwardInStartView = this._areDatesInSameView(zoomLevel, dateBackward, baseDate);
      isDateForwardAvailable = isDateForwardInStartView && !this._isDateNotAvailable(dateForward);
      isDateBackwardAvailable = isDateBackwardInStartView && !this._isDateNotAvailable(dateBackward);
    } while (isDateForwardInStartView || isDateBackwardInStartView);
    this.option('currentDate', currentDate);
  },
  _isDateNotAvailable: function _isDateNotAvailable(date) {
    var maxDate = this._getMaxDate();
    var minDate = this._getMinDate();
    return !inRange(date, minDate, maxDate) || this._view.isDateDisabled(date);
  },
  _init: function _init() {
    this.callBase();
    this._initSelectionStrategy();
    this._correctZoomLevel();
    this._initCurrentDate();
    this._initActions();
  },
  _initSelectionStrategy: function _initSelectionStrategy() {
    var strategyName = this._getSelectionStrategyName();
    var strategy = SELECTION_STRATEGIES[strategyName];
    if (!this._selectionStrategy || this._selectionStrategy.NAME !== strategyName) {
      this._selectionStrategy = new strategy(this);
    }
  },
  _refreshSelectionStrategy: function _refreshSelectionStrategy() {
    this._initSelectionStrategy();
    this._refresh();
  },
  _getSelectionStrategyName: function _getSelectionStrategyName() {
    var selectionMode = this.option('selectionMode');
    switch (selectionMode) {
      case 'multi':
        return 'MultiSelection';
      case 'range':
        return 'RangeSelection';
      default:
        return 'SingleSelection';
    }
  },
  _correctZoomLevel: function _correctZoomLevel() {
    var minZoomLevel = this.option('minZoomLevel');
    var maxZoomLevel = this.option('maxZoomLevel');
    var zoomLevel = this.option('zoomLevel');
    if (LEVEL_COMPARE_MAP[maxZoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      return;
    }
    if (LEVEL_COMPARE_MAP[zoomLevel] > LEVEL_COMPARE_MAP[maxZoomLevel]) {
      this.option('zoomLevel', maxZoomLevel);
    } else if (LEVEL_COMPARE_MAP[zoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
      this.option('zoomLevel', minZoomLevel);
    }
  },
  _initCurrentDate: function _initCurrentDate() {
    var _this$_getNormalizedD;
    var currentDate = (_this$_getNormalizedD = this._getNormalizedDate(this._selectionStrategy.getDefaultCurrentDate())) !== null && _this$_getNormalizedD !== void 0 ? _this$_getNormalizedD : this._getNormalizedDate(this.option('currentDate'));
    this.option('currentDate', currentDate);
  },
  _getNormalizedDate: function _getNormalizedDate(date) {
    date = dateUtils.normalizeDate(date, this._getMinDate(), this._getMaxDate());
    return isDefined(date) ? this._getDate(date) : date;
  },
  _initActions: function _initActions() {
    this._cellClickAction = this._createActionByOption('onCellClick');
    this._onContouredChanged = this._createActionByOption('onContouredChanged');
  },
  _initTemplates: function _initTemplates() {
    this._templateManager.addDefaultTemplates({
      cell: new FunctionTemplate(function (options) {
        var data = options.model;
        $(options.container).append($('<span>').text(data && data.text || String(data)));
      })
    });
    this.callBase();
  },
  _updateCurrentDate: function _updateCurrentDate(date) {
    if (fx.isAnimating(this._$viewsWrapper)) {
      fx.stop(this._$viewsWrapper, true);
    }
    var min = this._getMinDate();
    var max = this._getMaxDate();
    if (min > max) {
      this.option('currentDate', new Date());
      return;
    }
    var normalizedDate = this._getNormalizedDate(date);
    if (date.getTime() !== normalizedDate.getTime()) {
      this.option('currentDate', new Date(normalizedDate));
      return;
    }
    var offset = this._getViewsOffset(this._view.option('date'), normalizedDate);
    if (offset !== 0 && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
      offset = 0;
    }
    if (this._view && offset !== 0 && !this._suppressNavigation) {
      if (this._additionalView) {
        if (offset > 2 || offset < -1) {
          this._refreshViews();
          this._renderNavigator();
        } else if (offset === 1 && this._skipNavigate) {
          this._setViewContoured(normalizedDate);
          this._updateAriaId(normalizedDate);
        } else {
          this._navigate(offset, normalizedDate);
        }
      } else {
        this._navigate(offset, normalizedDate);
      }
    } else {
      this._renderNavigator();
      this._setViewContoured(normalizedDate);
      this._updateAriaId(normalizedDate);
    }
    this._skipNavigate = false;
  },
  _isAdditionalViewDate(date) {
    var view = this._additionalView;
    return view && dateUtils.sameMonthAndYear(date, view.option('date'));
  },
  _getActiveView: function _getActiveView(date) {
    return this._isAdditionalViewDate(date) ? this._additionalView : this._view;
  },
  _setViewContoured: function _setViewContoured(date) {
    if (this.option('skipFocusCheck') || elementHasFocus(this._focusTarget())) {
      var _this$_additionalView;
      this._view.option('contouredDate', null);
      (_this$_additionalView = this._additionalView) === null || _this$_additionalView === void 0 ? void 0 : _this$_additionalView.option('contouredDate', null);
      var view = this._isAdditionalViewDate(date) ? this._additionalView : this._view;
      view.option('contouredDate', date);
    }
  },
  _getMinDate: function _getMinDate() {
    if (this.min) {
      return this.min;
    }
    this.min = this._dateOption('min') || new Date(1000, 0);
    return this.min;
  },
  _getMaxDate: function _getMaxDate() {
    if (this.max) {
      return this.max;
    }
    this.max = this._dateOption('max') || new Date(3000, 0);
    return this.max;
  },
  _getViewsOffset: function _getViewsOffset(startDate, endDate) {
    var zoomLevel = this.option('zoomLevel');
    if (zoomLevel === ZOOM_LEVEL.MONTH) {
      return this._getMonthsOffset(startDate, endDate);
    }
    var zoomCorrection;
    switch (zoomLevel) {
      case ZOOM_LEVEL.CENTURY:
        zoomCorrection = 100;
        break;
      case ZOOM_LEVEL.DECADE:
        zoomCorrection = 10;
        break;
      default:
        zoomCorrection = 1;
        break;
    }
    return parseInt(endDate.getFullYear() / zoomCorrection) - parseInt(startDate.getFullYear() / zoomCorrection);
  },
  _getMonthsOffset: function _getMonthsOffset(startDate, endDate) {
    var yearOffset = endDate.getFullYear() - startDate.getFullYear();
    var monthOffset = endDate.getMonth() - startDate.getMonth();
    return yearOffset * 12 + monthOffset;
  },
  _waitRenderView: function _waitRenderView(offset) {
    if (this._alreadyViewRender) {
      return;
    }
    this._alreadyViewRender = true;
    var date = this._getDateByOffset(offset * this._getRtlCorrection());
    this._moveToClosestAvailableDate(date);
    this._waitRenderViewTimeout = setTimeout(() => {
      this._alreadyViewRender = false;
    });
  },
  _getRtlCorrection: function _getRtlCorrection() {
    return this.option('rtlEnabled') ? -1 : 1;
  },
  _getDateByOffset: function _getDateByOffset(offset, date) {
    var _date;
    date = this._getDate((_date = date) !== null && _date !== void 0 ? _date : this.option('currentDate'));
    var currentDay = date.getDate();
    var difference = dateUtils.getDifferenceInMonth(this.option('zoomLevel')) * offset;
    date.setDate(1);
    date.setMonth(date.getMonth() + difference);
    var lastDay = dateUtils.getLastMonthDate(date).getDate();
    date.setDate(currentDay > lastDay ? lastDay : currentDay);
    return date;
  },
  _focusTarget: function _focusTarget() {
    return this.$element();
  },
  _initMarkup: function _initMarkup() {
    this._renderSubmitElement();
    this.callBase();
    var $element = this.$element();
    $element.addClass(CALENDAR_CLASS);
    this._renderBody();
    $element.append(this.$body);
    this._renderViews();
    this._renderNavigator();
    $element.append(this._navigator.$element());
    this._renderSwipeable();
    this._renderFooter();
    this._selectionStrategy.updateAriaSelected();
    this._updateAriaId();
    this._moveToClosestAvailableDate();
  },
  _render: function _render() {
    this.callBase();
    this._setViewContoured(this.option('currentDate'));
  },
  _renderBody: function _renderBody() {
    if (!this._$viewsWrapper) {
      this.$body = $('<div>').addClass(CALENDAR_BODY_CLASS);
      this._$viewsWrapper = $('<div>').addClass(CALENDAR_VIEWS_WRAPPER_CLASS);
      this.$body.append(this._$viewsWrapper);
    }
  },
  _getKeyboardListeners() {
    return this.callBase().concat([this._view]);
  },
  _renderViews: function _renderViews() {
    this.$element().addClass(CALENDAR_VIEW_CLASS + '-' + this.option('zoomLevel'));
    var {
      currentDate,
      viewsCount
    } = this.option();
    this._view = this._renderSpecificView(currentDate);
    if (hasWindow()) {
      var beforeDate = this._getDateByOffset(-1, currentDate);
      this._beforeView = this._isViewAvailable(beforeDate) ? this._renderSpecificView(beforeDate) : null;
      var afterDate = this._getDateByOffset(viewsCount, currentDate);
      afterDate.setDate(1);
      this._afterView = this._isViewAvailable(afterDate) ? this._renderSpecificView(afterDate) : null;
    }
    if (viewsCount > 1) {
      this._additionalView = this._renderSpecificView(this._getDateByOffset(1, currentDate));
      var viewWidth = this._viewWidth();
      var elementWidth = viewWidth * viewsCount;
      this.$element().css('width', elementWidth);
    }
    this._translateViews();
  },
  _renderSpecificView: function _renderSpecificView(date) {
    var {
      viewsCount,
      zoomLevel
    } = this.option();
    var specificView = Views[zoomLevel];
    var $view = $('<div>').appendTo(this._$viewsWrapper);
    var config = this._viewConfig(date);
    var view = this._createComponent($view, specificView, config);
    $view.toggleClass(CALENDAR_MULTIVIEW_CLASS, viewsCount > 1);
    return view;
  },
  _viewConfig: function _viewConfig(date) {
    var _this$option2;
    var disabledDates = this.option('disabledDates');
    disabledDates = isFunction(disabledDates) ? this._injectComponent(disabledDates.bind(this)) : disabledDates;
    return _extends({}, this._selectionStrategy.getViewOptions(), {
      date: date,
      min: this._getMinDate(),
      max: this._getMaxDate(),
      firstDayOfWeek: (_this$option2 = this.option('firstDayOfWeek')) !== null && _this$option2 !== void 0 ? _this$option2 : dateLocalization.firstDayOfWeekIndex(),
      showWeekNumbers: this.option('showWeekNumbers'),
      weekNumberRule: this.option('weekNumberRule'),
      zoomLevel: this.option('zoomLevel'),
      tabIndex: undefined,
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      disabledDates,
      onCellClick: this._cellClickHandler.bind(this),
      cellTemplate: this._getTemplateByOption('cellTemplate'),
      allowValueSelection: this._isMaxZoomLevel(),
      _todayDate: this.option('_todayDate')
    });
  },
  _injectComponent: function _injectComponent(func) {
    var that = this;
    return function (params) {
      extend(params, {
        component: that
      });
      return func(params);
    };
  },
  _isViewAvailable: function _isViewAvailable(date) {
    var zoomLevel = this.option('zoomLevel');
    var min = dateUtils.getViewMinBoundaryDate(zoomLevel, this._getMinDate());
    var max = dateUtils.getViewMaxBoundaryDate(zoomLevel, this._getMaxDate());
    return dateUtils.dateInRange(date, min, max);
  },
  _translateViews: function _translateViews() {
    var {
      viewsCount
    } = this.option();
    move(this._view.$element(), {
      left: 0,
      top: 0
    });
    this._moveViewElement(this._beforeView, -1);
    this._moveViewElement(this._afterView, viewsCount);
    this._moveViewElement(this._additionalView, 1);
  },
  _moveViewElement(view, coefficient) {
    view && move(view.$element(), {
      left: this._getViewPosition(coefficient),
      top: 0
    });
  },
  _getViewPosition: function _getViewPosition(coefficient) {
    var rtlCorrection = this.option('rtlEnabled') ? -1 : 1;
    return coefficient * 100 * rtlCorrection + '%';
  },
  _cellClickHandler: function _cellClickHandler(e) {
    var zoomLevel = this.option('zoomLevel');
    var nextView = dateUtils.getViewDown(zoomLevel);
    var isMaxZoomLevel = this._isMaxZoomLevel();
    if (nextView && !isMaxZoomLevel) {
      this._navigateDown(e.event.currentTarget);
    } else {
      var newValue = this._updateTimeComponent(e.value);
      this._selectionStrategy.selectValue(newValue, e.event);
      this._cellClickAction(e);
    }
  },
  _updateTimeComponent: function _updateTimeComponent(date) {
    var result = new Date(date);
    var currentValue = this._dateOption('value');
    if (currentValue) {
      result.setHours(currentValue.getHours());
      result.setMinutes(currentValue.getMinutes());
      result.setSeconds(currentValue.getSeconds());
      result.setMilliseconds(currentValue.getMilliseconds());
    }
    return result;
  },
  _isMaxZoomLevel: function _isMaxZoomLevel() {
    return this.option('zoomLevel') === this.option('maxZoomLevel');
  },
  _navigateDown: function _navigateDown(cell) {
    var zoomLevel = this.option('zoomLevel');
    if (this._isMaxZoomLevel()) {
      return;
    }
    var nextView = dateUtils.getViewDown(zoomLevel);
    if (!nextView) {
      return;
    }
    var newCurrentDate = this._view.option('contouredDate') || this._view.option('date');
    if (cell) {
      newCurrentDate = $(cell).data(CALENDAR_DATE_VALUE_KEY);
    }
    this._isOtherViewCellClicked = true;
    this.option('currentDate', newCurrentDate);
    this.option('zoomLevel', nextView);
    this._isOtherViewCellClicked = false;
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
  },
  _renderNavigator: function _renderNavigator() {
    if (!this._navigator) {
      this._navigator = new Navigator($('<div>'), this._navigatorConfig());
    }
    this._navigator.option('text', this._getViewsCaption(this._view, this._additionalView));
    this._updateButtonsVisibility();
  },
  _navigatorConfig: function _navigatorConfig() {
    return {
      text: this._view.getNavigatorCaption(),
      onClick: this._navigatorClickHandler.bind(this),
      onCaptionClick: this._navigateUp.bind(this),
      rtlEnabled: this.option('rtlEnabled')
    };
  },
  _navigatorClickHandler: function _navigatorClickHandler(e) {
    var {
      currentDate,
      viewsCount
    } = this.option();
    var offset = e.direction;
    if (viewsCount > 1) {
      var additionalViewActive = this._isAdditionalViewDate(currentDate);
      var shouldDoubleOffset = additionalViewActive && offset < 0 || !additionalViewActive && offset > 0;
      if (shouldDoubleOffset) {
        offset *= 2;
      }
    }
    var newCurrentDate = this._getDateByOffset(offset, currentDate);
    this._moveToClosestAvailableDate(newCurrentDate);
  },
  _navigateUp: function _navigateUp() {
    var zoomLevel = this.option('zoomLevel');
    var nextView = dateUtils.getViewUp(zoomLevel);
    if (!nextView || this._isMinZoomLevel(zoomLevel)) {
      return;
    }
    this.option('zoomLevel', nextView);
    this._renderNavigator();
    this._animateShowView();
    this._moveToClosestAvailableDate();
    this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
  },
  _isMinZoomLevel: function _isMinZoomLevel(zoomLevel) {
    var min = this._getMinDate();
    var max = this._getMaxDate();
    return dateUtils.sameView(zoomLevel, min, max) || this.option('minZoomLevel') === zoomLevel;
  },
  _updateButtonsVisibility: function _updateButtonsVisibility() {
    this._navigator.toggleButton('next', !isDefined(this._getRequiredView('next')));
    this._navigator.toggleButton('prev', !isDefined(this._getRequiredView('prev')));
  },
  _renderSwipeable: function _renderSwipeable() {
    if (!this._swipeable) {
      this._swipeable = this._createComponent(this.$element(), Swipeable, {
        onStart: this._swipeStartHandler.bind(this),
        onUpdated: this._swipeUpdateHandler.bind(this),
        onEnd: this._swipeEndHandler.bind(this),
        itemSizeFunc: this._viewWidth.bind(this)
      });
    }
  },
  _swipeStartHandler: function _swipeStartHandler(e) {
    fx.stop(this._$viewsWrapper, true);
    var {
      viewsCount
    } = this.option();
    e.event.maxLeftOffset = this._getRequiredView('next') ? 1 / viewsCount : 0;
    e.event.maxRightOffset = this._getRequiredView('prev') ? 1 / viewsCount : 0;
  },
  _getRequiredView: function _getRequiredView(name) {
    var view;
    var isRtl = this.option('rtlEnabled');
    if (name === 'next') {
      view = isRtl ? this._beforeView : this._afterView;
    } else if (name === 'prev') {
      view = isRtl ? this._afterView : this._beforeView;
    }
    return view;
  },
  _swipeUpdateHandler: function _swipeUpdateHandler(e) {
    var offset = e.event.offset;
    move(this._$viewsWrapper, {
      left: offset * this._viewWidth(),
      top: 0
    });
    this._updateNavigatorCaption(offset);
  },
  _swipeEndHandler: function _swipeEndHandler(e) {
    var {
      currentDate,
      rtlEnabled
    } = this.option();
    var targetOffset = e.event.targetOffset;
    var moveOffset = !targetOffset ? 0 : targetOffset / Math.abs(targetOffset);
    var isAdditionalViewActive = this._isAdditionalViewDate(currentDate);
    var shouldDoubleOffset = isAdditionalViewActive && (rtlEnabled ? moveOffset === -1 : moveOffset === 1);
    if (moveOffset === 0) {
      this._animateWrapper(0, ANIMATION_DURATION_SHOW_VIEW);
      return;
    }
    var offset = -moveOffset * this._getRtlCorrection() * (shouldDoubleOffset ? 2 : 1);
    var date = this._getDateByOffset(offset);
    if (this._isDateInInvalidRange(date)) {
      if (moveOffset >= 0) {
        date = new Date(this._getMinDate());
      } else {
        date = new Date(this._getMaxDate());
      }
    }
    this.option('currentDate', date);
  },
  _viewWidth: function _viewWidth() {
    if (!this._viewWidthValue) {
      this._viewWidthValue = getWidth(this.$element());
    }
    return this._viewWidthValue;
  },
  _updateNavigatorCaption: function _updateNavigatorCaption(offset) {
    offset *= this._getRtlCorrection();
    var isMultiView = this.option('viewsCount') > 1;
    var view;
    var additionalView;
    if (offset > 0.5 && this._beforeView) {
      view = this._beforeView;
      additionalView = isMultiView && this._view;
    } else if (offset < -0.5 && this._afterView) {
      view = isMultiView ? this._additionalView : this._afterView;
      additionalView = isMultiView ? this._afterView : null;
    } else {
      view = this._view;
      additionalView = isMultiView ? this._additionalView : null;
    }
    this._navigator.option('text', this._getViewsCaption(view, additionalView));
  },
  _getViewsCaption: function _getViewsCaption(view, additionalView) {
    var caption = view.getNavigatorCaption();
    var {
      viewsCount,
      rtlEnabled
    } = this.option();
    if (viewsCount > 1 && additionalView) {
      var additionalViewCaption = additionalView.getNavigatorCaption();
      caption = rtlEnabled ? "".concat(additionalViewCaption, " - ").concat(caption) : "".concat(caption, " - ").concat(additionalViewCaption);
    }
    return caption;
  },
  _isDateInInvalidRange: function _isDateInInvalidRange(date) {
    if (this._view.isBoundary(date)) {
      return;
    }
    var min = this._getMinDate();
    var max = this._getMaxDate();
    var normalizedDate = dateUtils.normalizeDate(date, min, max);
    return normalizedDate === min || normalizedDate === max;
  },
  _renderFooter: function _renderFooter() {
    var showTodayButton = this.option('showTodayButton');
    if (showTodayButton) {
      var $todayButton = this._createComponent($('<a>'), Button, {
        focusStateEnabled: false,
        text: messageLocalization.format('dxCalendar-todayButtonText'),
        onClick: function (args) {
          this._toTodayView(args);
        }.bind(this),
        integrationOptions: {}
      }).$element().addClass(CALENDAR_TODAY_BUTTON_CLASS);
      this._$footer = $('<div>').addClass(CALENDAR_FOOTER_CLASS).append($todayButton);
      this.$element().append(this._$footer);
    }
    this.$element().toggleClass(CALENDAR_HAS_FOOTER_CLASS, showTodayButton);
  },
  _renderSubmitElement: function _renderSubmitElement() {
    this._$submitElement = $('<input>').attr('type', 'hidden').appendTo(this.$element());
    this._setSubmitValue(this.option('value'));
  },
  _setSubmitValue: function _setSubmitValue(value) {
    var dateValue = this._convertToDate(value);
    this._getSubmitElement().val(dateSerialization.serializeDate(dateValue, CALENDAR_INPUT_STANDARD_PATTERN));
  },
  _getSubmitElement: function _getSubmitElement() {
    return this._$submitElement;
  },
  _animateShowView: function _animateShowView() {
    fx.stop(this._view.$element(), true);
    this._popAnimationView(this._view, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
    if (this.option('viewsCount') > 1) {
      fx.stop(this._additionalView.$element(), true);
      this._popAnimationView(this._additionalView, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
    }
  },
  _popAnimationView: function _popAnimationView(view, from, to, duration) {
    return fx.animate(view.$element(), {
      type: 'pop',
      from: {
        scale: from,
        opacity: from
      },
      to: {
        scale: to,
        opacity: to
      },
      duration: duration
    });
  },
  _navigate: function _navigate(offset, value) {
    if (offset !== 0 && Math.abs(offset) !== 1 && this._isViewAvailable(value)) {
      var newView = this._renderSpecificView(value);
      if (offset > 0) {
        this._afterView && this._afterView.$element().remove();
        this._afterView = newView;
      } else {
        this._beforeView && this._beforeView.$element().remove();
        this._beforeView = newView;
      }
      this._translateViews();
    }
    var rtlCorrection = this._getRtlCorrection();
    var offsetSign = offset > 0 ? 1 : offset < 0 ? -1 : 0;
    var endPosition = -rtlCorrection * offsetSign * this._viewWidth();
    var viewsWrapperPosition = this._$viewsWrapper.position().left;
    if (viewsWrapperPosition !== endPosition) {
      if (this._preventViewChangeAnimation) {
        this._wrapperAnimationEndHandler(offset, value);
      } else {
        this._animateWrapper(endPosition, ANIMATION_DURATION_SHOW_VIEW).done(this._wrapperAnimationEndHandler.bind(this, offset, value));
      }
    }
  },
  _animateWrapper: function _animateWrapper(to, duration) {
    return fx.animate(this._$viewsWrapper, {
      type: 'slide',
      from: {
        left: this._$viewsWrapper.position().left
      },
      to: {
        left: to
      },
      duration: duration
    });
  },
  _getDate(value) {
    return new Date(value);
  },
  _toTodayView: function _toTodayView(args) {
    var today = new Date();
    if (this._isMaxZoomLevel()) {
      this._selectionStrategy.selectValue(today, args.event);
      return;
    }
    this._preventViewChangeAnimation = true;
    this.option('zoomLevel', this.option('maxZoomLevel'));
    this._selectionStrategy.selectValue(today, args.event);
    this._animateShowView();
    this._preventViewChangeAnimation = false;
  },
  _wrapperAnimationEndHandler: function _wrapperAnimationEndHandler(offset, newDate) {
    this._rearrangeViews(offset);
    this._translateViews();
    this._resetLocation();
    this._renderNavigator();
    this._setViewContoured(newDate);
    this._updateAriaId(newDate);
    this._selectionStrategy.updateAriaSelected();
  },
  _rearrangeViews: function _rearrangeViews(offset) {
    var _this$viewToRemoveKey;
    if (offset === 0) {
      return;
    }
    var {
      viewsCount
    } = this.option();
    var viewOffset;
    var viewToCreateKey;
    var viewToRemoveKey;
    var viewBeforeCreateKey;
    var viewAfterRemoveKey;
    if (offset < 0) {
      viewOffset = 1;
      viewToCreateKey = '_beforeView';
      viewToRemoveKey = '_afterView';
      viewBeforeCreateKey = '_view';
      viewAfterRemoveKey = viewsCount === 1 ? '_view' : '_additionalView';
    } else {
      viewOffset = -1;
      viewToCreateKey = '_afterView';
      viewToRemoveKey = '_beforeView';
      viewBeforeCreateKey = viewsCount === 1 ? '_view' : '_additionalView';
      viewAfterRemoveKey = '_view';
    }
    if (!this[viewToCreateKey]) {
      return;
    }
    var destinationDate = this[viewToCreateKey].option('date');
    (_this$viewToRemoveKey = this[viewToRemoveKey]) === null || _this$viewToRemoveKey === void 0 ? void 0 : _this$viewToRemoveKey.$element().remove();
    this[viewToRemoveKey] = this._renderSpecificView(this._getDateByOffset(viewOffset * viewsCount, destinationDate));
    this[viewAfterRemoveKey].$element().remove();
    if (viewsCount === 1) {
      this[viewAfterRemoveKey] = this[viewToCreateKey];
    } else {
      this[viewAfterRemoveKey] = this[viewBeforeCreateKey];
      this[viewBeforeCreateKey] = this[viewToCreateKey];
    }
    var dateByOffset = this._getDateByOffset(-viewOffset, destinationDate);
    this[viewToCreateKey] = this._isViewAvailable(dateByOffset) ? this._renderSpecificView(dateByOffset) : null;
  },
  _resetLocation: function _resetLocation() {
    move(this._$viewsWrapper, {
      left: 0,
      top: 0
    });
  },
  _clean: function _clean() {
    this.callBase();
    this._clearInlineWidth();
    this._clearViewWidthCache();
    delete this._$viewsWrapper;
    delete this._navigator;
    delete this._$footer;
  },
  _clearViewWidthCache: function _clearViewWidthCache() {
    delete this._viewWidthValue;
  },
  _clearInlineWidth: function _clearInlineWidth() {
    this.$element().css('width', '');
  },
  _disposeViews: function _disposeViews() {
    this._view.$element().remove();
    this._beforeView && this._beforeView.$element().remove();
    this._additionalView && this._additionalView.$element().remove();
    this._afterView && this._afterView.$element().remove();
    delete this._view;
    delete this._additionalView;
    delete this._beforeView;
    delete this._afterView;
    delete this._skipNavigate;
  },
  _dispose: function _dispose() {
    clearTimeout(this._waitRenderViewTimeout);
    this.callBase();
  },
  _refreshViews: function _refreshViews() {
    this._clearInlineWidth();
    this._disposeViews();
    this._renderViews();
  },
  _visibilityChanged: function _visibilityChanged() {
    this._translateViews();
  },
  _focusInHandler: function _focusInHandler() {
    this.callBase.apply(this, arguments);
    this._setViewContoured(this.option('currentDate'));
  },
  _focusOutHandler: function _focusOutHandler() {
    var _this$_additionalView2;
    this.callBase.apply(this, arguments);
    this._view.option('contouredDate', null);
    (_this$_additionalView2 = this._additionalView) === null || _this$_additionalView2 === void 0 ? void 0 : _this$_additionalView2.option('contouredDate', null);
  },
  _updateViewsOption: function _updateViewsOption(optionName, newValue) {
    var _this$_additionalView3, _this$_beforeView, _this$_afterView;
    this._view.option(optionName, newValue);
    (_this$_additionalView3 = this._additionalView) === null || _this$_additionalView3 === void 0 ? void 0 : _this$_additionalView3.option(optionName, newValue);
    (_this$_beforeView = this._beforeView) === null || _this$_beforeView === void 0 ? void 0 : _this$_beforeView.option(optionName, newValue);
    (_this$_afterView = this._afterView) === null || _this$_afterView === void 0 ? void 0 : _this$_afterView.option(optionName, newValue);
  },
  _updateAriaSelected: function _updateAriaSelected(value, previousValue) {
    previousValue.forEach(item => {
      this.setAria('selected', undefined, this._view._getCellByDate(item));
    });
    value.forEach(item => {
      this.setAria('selected', true, this._view._getCellByDate(item));
    });
    if (this.option('viewsCount') > 1) {
      previousValue.forEach(item => {
        this.setAria('selected', undefined, this._additionalView._getCellByDate(item));
      });
      value.forEach(item => {
        this.setAria('selected', true, this._additionalView._getCellByDate(item));
      });
    }
  },
  _updateAriaId: function _updateAriaId(value) {
    var _value;
    value = (_value = value) !== null && _value !== void 0 ? _value : this.option('currentDate');
    var ariaId = 'dx-' + new Guid();
    var view = this._getActiveView(value);
    var $newCell = view._getCellByDate(value);
    this.setAria('id', ariaId, $newCell);
    this.setAria('activedescendant', ariaId);
    this._onContouredChanged(ariaId);
  },
  _suppressingNavigation: function _suppressingNavigation(callback, args) {
    this._suppressNavigation = true;
    callback.apply(this, args);
    delete this._suppressNavigation;
  },
  _optionChanged: function _optionChanged(args) {
    var {
      value,
      previousValue
    } = args;
    switch (args.name) {
      case 'width':
        this.callBase(args);
        this._clearViewWidthCache();
        break;
      case 'min':
      case 'max':
        this.min = undefined;
        this.max = undefined;
        this._suppressingNavigation(this._updateCurrentDate, [this.option('currentDate')]);
        this._refreshViews();
        this._renderNavigator();
        break;
      case 'selectionMode':
        this._refreshSelectionStrategy();
        this._initCurrentDate();
        break;
      case 'firstDayOfWeek':
        this._refreshViews();
        this._updateButtonsVisibility();
        break;
      case 'currentDate':
        this.setAria('id', undefined, this._view._getCellByDate(previousValue));
        this._updateCurrentDate(value);
        break;
      case 'zoomLevel':
        this.$element().removeClass(CALENDAR_VIEW_CLASS + '-' + previousValue);
        this._correctZoomLevel();
        this._refreshViews();
        this._renderNavigator();
        this._updateAriaId();
        break;
      case 'minZoomLevel':
      case 'maxZoomLevel':
        this._correctZoomLevel();
        this._updateButtonsVisibility();
        break;
      case 'value':
        if (this.option('selectionMode') === 'single') {
          this._selectionStrategy.processValueChanged([value], [previousValue]);
        }
        this._setSubmitValue(value);
        this.callBase(args);
        break;
      case 'values':
        if (this.option('selectionMode') !== 'single') {
          this._selectionStrategy.processValueChanged(value, previousValue);
        }
        this._raiseValueChangeAction(value, previousValue);
        this._saveValueChangeEvent(undefined);
        break;
      case 'viewsCount':
        this._refreshViews();
        this._renderNavigator();
        break;
      case 'onCellClick':
        this._view.option('onCellClick', value);
        break;
      case 'onContouredChanged':
        this._onContouredChanged = this._createActionByOption('onContouredChanged');
        break;
      case 'disabledDates':
      case 'dateSerializationFormat':
      case 'cellTemplate':
      case 'showTodayButton':
        this._invalidate();
        break;
      case 'skipFocusCheck':
        break;
      case '_todayDate':
      case 'showWeekNumbers':
      case 'weekNumberRule':
        this._refreshViews();
        break;
      default:
        this.callBase(args);
    }
  },
  getContouredDate: function getContouredDate() {
    return this._view.option('contouredDate');
  }
});
registerComponent('dxCalendar', Calendar);
export default Calendar;