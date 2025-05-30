import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/button_group';
import '../../../ui/drop_down_button';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import errors from '../../../core/errors';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { renovationGetCurrentView } from '../../../renovation/ui/scheduler/model/untyped_getCurrentView';
import Toolbar from '../../../ui/toolbar';
import Widget from '../../../ui/widget/ui.widget';
import SchedulerCalendar from './m_calendar';
import { getDateNavigator } from './m_date_navigator';
import { getCaption, getNextIntervalDate, getStep, getViewName, getViewType, nextWeek, validateViews } from './m_utils';
import { getDropDownViewSwitcher, getViewSwitcher } from './m_view_switcher';
var DEFAULT_ELEMENT = 'defaultElement';
var VIEW_SWITCHER = 'viewSwitcher';
var DATE_NAVIGATOR = 'dateNavigator';
var COMPONENT_CLASS = 'dx-scheduler-header';
export class SchedulerHeader extends Widget {
  get views() {
    return this.option('views');
  }
  get captionText() {
    return this._getCaption().text;
  }
  get intervalOptions() {
    var step = getStep(this.currentView);
    var intervalCount = this.option('intervalCount');
    var firstDayOfWeek = this.option('firstDayOfWeek');
    var agendaDuration = this.option('agendaDuration');
    return {
      step,
      intervalCount,
      firstDayOfWeek,
      agendaDuration
    };
  }
  _getDefaultOptions() {
    // @ts-expect-error
    return extend(super._getDefaultOptions(), {
      _useShortDateFormat: !devices.real().generic || devices.isSimulator()
    });
  }
  _createEventMap() {
    this.eventMap = new Map([['currentView', [view => {
      this.currentView = renovationGetCurrentView(getViewName(view),
      // @ts-expect-error
      this.option('views'));
    }]], ['items', [this.repaint.bind(this)]], ['views', [validateViews]], ['currentDate', [this._getCalendarOptionUpdater('date')]], ['min', [this._getCalendarOptionUpdater('min')]], ['max', [this._getCalendarOptionUpdater('max')]], ['tabIndex', [this.repaint.bind(this)]], ['focusStateEnabled', [this.repaint.bind(this)]], ['useDropDownViewSwitcher', [this.repaint.bind(this)]]]);
  }
  _addEvent(name, event) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, []);
    }
    var events = this.eventMap.get(name);
    this.eventMap.set(name, [...events, event]);
  }
  _optionChanged(args) {
    var {
      name,
      value
    } = args;
    if (this.eventMap.has(name)) {
      var events = this.eventMap.get(name);
      events.forEach(event => {
        event(value);
      });
    }
  }
  _init() {
    // @ts-expect-error
    super._init();
    this._createEventMap();
    // @ts-expect-error
    this.$element().addClass(COMPONENT_CLASS);
    this.currentView = renovationGetCurrentView(getViewName(this.option('currentView')),
    // @ts-expect-error
    this.option('views'));
  }
  _render() {
    // @ts-expect-error
    super._render();
    this._createEventMap();
    this._renderToolbar();
  }
  _renderToolbar() {
    var config = this._createToolbarConfig();
    var toolbarElement = $('<div>');
    toolbarElement.appendTo(this.$element());
    // @ts-expect-error
    this._toolbar = this._createComponent(toolbarElement, Toolbar, config);
  }
  _createToolbarConfig() {
    var items = this.option('items');
    var parsedItems = items.map(element => this._parseItem(element));
    return {
      items: parsedItems
    };
  }
  _parseItem(item) {
    var isDefaultElement = this._isDefaultItem(item);
    if (isDefaultElement) {
      var defaultElementType = item[DEFAULT_ELEMENT];
      switch (defaultElementType) {
        case VIEW_SWITCHER:
          if (this.option('useDropDownViewSwitcher')) {
            return getDropDownViewSwitcher(this, item);
          }
          return getViewSwitcher(this, item);
        case DATE_NAVIGATOR:
          this._renderCalendar();
          return getDateNavigator(this, item);
        default:
          errors.log("Unknown default element type: ".concat(defaultElementType));
          break;
      }
    }
    return item;
  }
  _callEvent(event, arg) {
    if (this.eventMap.has(event)) {
      var events = this.eventMap.get(event);
      events.forEach(event => event(arg));
    }
  }
  _updateCurrentView(view) {
    var onCurrentViewChange = this.option('onCurrentViewChange');
    onCurrentViewChange(view.name);
    this._callEvent('currentView', view);
  }
  _updateCalendarValueAndCurrentDate(date) {
    this._updateCurrentDate(date);
    this._calendar.option('value', date);
  }
  _updateCurrentDate(date) {
    var onCurrentDateChange = this.option('onCurrentDateChange');
    onCurrentDateChange(date);
    this._callEvent('currentDate', date);
  }
  _renderCalendar() {
    // @ts-expect-error
    this._calendar = this._createComponent('<div>', SchedulerCalendar, {
      value: this.option('currentDate'),
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      onValueChanged: e => {
        this._updateCurrentDate(e.value);
        this._calendar.hide();
      }
    });
    this._calendar.$element().appendTo(this.$element());
  }
  _getCalendarOptionUpdater(name) {
    return value => {
      if (this._calendar) {
        this._calendar.option(name, value);
      }
    };
  }
  _getNextDate(direction) {
    var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var date = initialDate !== null && initialDate !== void 0 ? initialDate : this.option('currentDate');
    var options = _extends(_extends({}, this.intervalOptions), {
      date
    });
    return getNextIntervalDate(options, direction);
  }
  _isMonth() {
    var {
      currentView
    } = this;
    return getViewType(currentView) === 'month';
  }
  _getDisplayedDate() {
    var startViewDate = this.option('startViewDate');
    if (this._isMonth()) {
      return nextWeek(startViewDate);
    }
    return new Date(startViewDate);
  }
  _getCaption() {
    var date = this.option('currentDate');
    if (this.option('startViewDate')) {
      date = this._getDisplayedDate();
    }
    date = dateUtils.trimTime(date);
    var options = _extends(_extends({}, this.intervalOptions), {
      date
    });
    var customizationFunction = this.option('customizeDateNavigatorText');
    var useShortDateFormat = this.option('_useShortDateFormat');
    return getCaption(options, useShortDateFormat, customizationFunction);
  }
  _updateDateByDirection(direction) {
    var date = this._getNextDate(direction);
    this._updateCalendarValueAndCurrentDate(date);
  }
  _showCalendar(e) {
    this._calendar.show(e.element);
  }
  _hideCalendar() {
    this._calendar.hide();
  }
  _isDefaultItem(item) {
    return Object.prototype.hasOwnProperty.call(item, DEFAULT_ELEMENT);
  }
}
// @ts-expect-error
registerComponent('dxSchedulerHeader', SchedulerHeader);