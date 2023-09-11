import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import Calendar from '../../../ui/calendar';
import Popover from '../../../ui/popover/ui.popover';
import Popup from '../../../ui/popup/ui.popup';
import Scrollable from '../../../ui/scroll_view/ui.scrollable';
import Widget from '../../../ui/widget/ui.widget';
var CALENDAR_CLASS = 'dx-scheduler-navigator-calendar';
var CALENDAR_POPOVER_CLASS = 'dx-scheduler-navigator-calendar-popover';
export default class SchedulerCalendar extends Widget {
  show(target) {
    if (!this._isMobileLayout()) {
      this._overlay.option('target', target);
    }
    this._overlay.show();
  }
  hide() {
    this._overlay.hide();
  }
  _keyboardHandler(opts) {
    var _a;
    (_a = this._calendar) === null || _a === void 0 ? void 0 : _a._keyboardHandler(opts);
  }
  _init() {
    // @ts-expect-error
    super._init();
    this.$element();
  }
  _render() {
    // @ts-expect-error
    super._render();
    this._renderOverlay();
  }
  _renderOverlay() {
    // @ts-expect-error
    this.$element().addClass(CALENDAR_POPOVER_CLASS);
    var isMobileLayout = this._isMobileLayout();
    var overlayType = isMobileLayout ? Popup : Popover;
    // @ts-expect-error
    this._overlay = this._createComponent(this.$element(), overlayType, {
      contentTemplate: () => this._createOverlayContent(),
      onShown: () => this._calendar.focus(),
      defaultOptionsRules: [{
        device: () => isMobileLayout,
        options: {
          fullScreen: true,
          showCloseButton: false,
          toolbarItems: [{
            shortcut: 'cancel'
          }]
        }
      }]
    });
  }
  _createOverlayContent() {
    var result = $('<div>').addClass(CALENDAR_CLASS);
    // @ts-expect-error
    this._calendar = this._createComponent(result, Calendar, this._getCalendarOptions());
    if (this._isMobileLayout()) {
      var scrollable = this._createScrollable(result);
      return scrollable.$element();
    }
    return result;
  }
  _createScrollable(content) {
    // @ts-expect-error
    var result = this._createComponent('<div>', Scrollable, {
      direction: 'vertical'
    });
    result.$content().append(content);
    return result;
  }
  _optionChanged(_ref) {
    var {
      name,
      value
    } = _ref;
    var _a;
    switch (name) {
      case 'value':
        (_a = this._calendar) === null || _a === void 0 ? void 0 : _a.option('value', value);
        break;
      default:
        break;
    }
  }
  _getCalendarOptions() {
    return {
      value: this.option('value'),
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      focusStateEnabled: this.option('focusStateEnabled'),
      onValueChanged: this.option('onValueChanged'),
      skipFocusCheck: true,
      tabIndex: this.option('tabIndex')
    };
  }
  _isMobileLayout() {
    return !devices.current().generic;
  }
}
// @ts-expect-error
registerComponent('dxSchedulerCalendarPopup', SchedulerCalendar);