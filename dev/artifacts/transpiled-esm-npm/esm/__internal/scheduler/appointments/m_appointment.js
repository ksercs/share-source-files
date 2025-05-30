/* eslint-disable max-classes-per-file */
import { move } from '../../../animation/translator';
import registerComponent from '../../../core/component_registrator';
import DOMComponent from '../../../core/dom_component';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import eventsEngine from '../../../events/core/events_engine';
import pointerEvents from '../../../events/pointer';
import { addNamespace } from '../../../events/utils/index';
import dateLocalization from '../../../localization/date';
import messageLocalization from '../../../localization/message';
import Resizable from '../../../ui/resizable';
import { hide, show } from '../../../ui/tooltip/ui.tooltip';
import { ALL_DAY_APPOINTMENT_CLASS, APPOINTMENT_CONTENT_CLASSES, APPOINTMENT_DRAG_SOURCE_CLASS, DIRECTION_APPOINTMENT_CLASSES, EMPTY_APPOINTMENT_CLASS, RECURRENCE_APPOINTMENT_CLASS, REDUCED_APPOINTMENT_CLASS, REDUCED_APPOINTMENT_ICON, REDUCED_APPOINTMENT_PARTS_CLASSES } from '../m_classes';
import { ExpressionUtils } from '../m_expression_utils';
import { getRecurrenceProcessor } from '../m_recurrence';
var DEFAULT_HORIZONTAL_HANDLES = 'left right';
var DEFAULT_VERTICAL_HANDLES = 'top bottom';
var REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME = addNamespace(pointerEvents.enter, 'dxSchedulerAppointment');
var REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME = addNamespace(pointerEvents.leave, 'dxSchedulerAppointment');
export class Appointment extends DOMComponent {
  get coloredElement() {
    return this.$element();
  }
  get rawAppointment() {
    return this.option('data');
  }
  _getDefaultOptions() {
    // @ts-expect-error
    return extend(super._getDefaultOptions(), {
      data: {},
      groupIndex: -1,
      groups: [],
      geometry: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      allowDrag: true,
      allowResize: true,
      reduced: null,
      isCompact: false,
      direction: 'vertical',
      resizableConfig: {
        keepAspectRatio: false
      },
      cellHeight: 0,
      cellWidth: 0,
      isDragSource: false
    });
  }
  notifyObserver(subject, args) {
    var observer = this.option('observer');
    if (observer) {
      observer.fire(subject, args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invoke(funcName) {
    var observer = this.option('observer');
    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'data':
      case 'groupIndex':
      case 'geometry':
      case 'allowDrag':
      case 'allowResize':
      case 'reduced':
      case 'sortedIndex':
      case 'isCompact':
      case 'direction':
      case 'resizableConfig':
      case 'cellHeight':
      case 'cellWidth':
        this._invalidate();
        break;
      case 'isDragSource':
        this._renderDragSourceClass();
        break;
      default:
        // @ts-expect-error
        super._optionChanged(args);
    }
  }
  _getHorizontalResizingRule() {
    var reducedHandles = {
      head: this.option('rtlEnabled') ? 'right' : 'left',
      body: '',
      tail: this.option('rtlEnabled') ? 'left' : 'right'
    };
    var getResizableStep = this.option('getResizableStep');
    var step = getResizableStep ? getResizableStep() : 0;
    return {
      handles: this.option('reduced') ? reducedHandles[this.option('reduced')] : DEFAULT_HORIZONTAL_HANDLES,
      minHeight: 0,
      minWidth: this.invoke('getCellWidth'),
      step,
      roundStepValue: false
    };
  }
  _getVerticalResizingRule() {
    var height = Math.round(this.invoke('getCellHeight'));
    return {
      handles: DEFAULT_VERTICAL_HANDLES,
      minWidth: 0,
      minHeight: height,
      step: height,
      roundStepValue: true
    };
  }
  _render() {
    // @ts-expect-error
    super._render();
    this._renderAppointmentGeometry();
    this._renderEmptyClass();
    this._renderReducedAppointment();
    this._renderAllDayClass();
    this._renderDragSourceClass();
    this._renderDirection();
    this.$element().data('dxAppointmentStartDate', this.option('startDate'));
    var text = ExpressionUtils.getField(this.option('dataAccessors'), 'text', this.rawAppointment);
    this.$element().attr('title', text);
    this.$element().attr('role', 'button');
    this._renderRecurrenceClass();
    this._renderResizable();
    this._setResourceColor();
  }
  _setResourceColor() {
    var appointmentConfig = {
      itemData: this.rawAppointment,
      groupIndex: this.option('groupIndex'),
      groups: this.option('groups')
    };
    var deferredColor = this.option('getAppointmentColor')(appointmentConfig);
    deferredColor.done(color => color && this.coloredElement.css('backgroundColor', color));
  }
  _renderAppointmentGeometry() {
    var geometry = this.option('geometry');
    var $element = this.$element();
    move($element, {
      top: geometry.top,
      left: geometry.left
    });
    $element.css({
      width: geometry.width < 0 ? 0 : geometry.width,
      height: geometry.height < 0 ? 0 : geometry.height
    });
  }
  _renderEmptyClass() {
    var geometry = this.option('geometry');
    if (geometry.empty || this.option('isCompact')) {
      this.$element().addClass(EMPTY_APPOINTMENT_CLASS);
    }
  }
  _renderReducedAppointment() {
    var reducedPart = this.option('reduced');
    if (!reducedPart) {
      return;
    }
    this.$element().toggleClass(REDUCED_APPOINTMENT_CLASS, true).toggleClass(REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
    this._renderAppointmentReducedIcon();
  }
  _renderAppointmentReducedIcon() {
    var $icon = $('<div>').addClass(REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
    var endDate = this._getEndDate();
    var tooltipLabel = messageLocalization.format('dxScheduler-editorLabelEndDate');
    var tooltipText = [tooltipLabel, ': ', dateLocalization.format(endDate, 'monthAndDay'), ', ', dateLocalization.format(endDate, 'year')].join('');
    // @ts-expect-error
    eventsEngine.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
    eventsEngine.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, () => {
      show({
        target: $icon,
        content: tooltipText
      });
    });
    // @ts-expect-error
    eventsEngine.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
    eventsEngine.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, () => {
      hide();
    });
  }
  _getEndDate() {
    var result = ExpressionUtils.getField(this.option('dataAccessors'), 'endDate', this.rawAppointment);
    if (result) {
      return new Date(result);
    }
    return result;
  }
  _renderAllDayClass() {
    this.$element().toggleClass(ALL_DAY_APPOINTMENT_CLASS, !!this.option('allDay'));
  }
  _renderDragSourceClass() {
    this.$element().toggleClass(APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option('isDragSource'));
  }
  _renderRecurrenceClass() {
    var rule = ExpressionUtils.getField(this.option('dataAccessors'), 'recurrenceRule', this.rawAppointment);
    if (getRecurrenceProcessor().isValidRecurrenceRule(rule)) {
      this.$element().addClass(RECURRENCE_APPOINTMENT_CLASS);
    }
  }
  _renderDirection() {
    this.$element().addClass(DIRECTION_APPOINTMENT_CLASSES[this.option('direction')]);
  }
  _createResizingConfig() {
    var config = this.option('direction') === 'vertical' ? this._getVerticalResizingRule() : this._getHorizontalResizingRule();
    if (!this.invoke('isGroupedByDate')) {
      config.stepPrecision = 'strict';
    }
    return config;
  }
  _renderResizable() {
    if (this.option('allowResize')) {
      // @ts-expect-error
      this._createComponent(this.$element(), Resizable, extend(this._createResizingConfig(), this.option('resizableConfig')));
    }
  }
  _useTemplates() {
    return false;
  }
}
registerComponent('dxSchedulerAppointment', Appointment);
export class AgendaAppointment extends Appointment {
  get coloredElement() {
    return this.$element().find(".".concat(APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER));
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      // @ts-expect-error
      createPlainResourceListAsync: new Deferred()
    });
  }
  _renderResourceList(container, list) {
    list.forEach(item => {
      var itemContainer = $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(container);
      $('<div>').text("".concat(item.label, ":")).appendTo(itemContainer);
      $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(item.values.join(', ')).appendTo(itemContainer);
    });
  }
  _render() {
    super._render();
    var createPlainResourceListAsync = this.option('createPlainResourceListAsync');
    createPlainResourceListAsync(this.rawAppointment).done(list => {
      var parent = this.$element().find(".".concat(APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS));
      var container = $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(parent);
      this._renderResourceList(container, list);
    });
  }
}