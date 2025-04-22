import $ from '../../core/renderer';
import { Deferred } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import Draggable from '../../ui/draggable';
import { APPOINTMENT_SETTINGS_KEY, LIST_ITEM_DATA_KEY } from './constants';
import { isSchedulerComponent } from './utils/is_scheduler_component';
const APPOINTMENT_ITEM_CLASS = 'dx-scheduler-appointment';
export default class AppointmentDragBehavior {
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.workspace = this.scheduler._workSpace;
    this.appointments = this.scheduler._appointments;
    this.initialPosition = {
      left: 0,
      top: 0
    };
    this.appointmentInfo = null;
    this.dragBetweenComponentsPromise = null;
  }
  isAllDay(appointment) {
    return appointment.data(APPOINTMENT_SETTINGS_KEY).allDay;
  }
  onDragStart(e) {
    const {
      itemSettings,
      itemData,
      initialPosition
    } = e;
    this.initialPosition = initialPosition;
    this.appointmentInfo = {
      appointment: itemData,
      settings: itemSettings
    };
    this.appointments.notifyObserver('hideAppointmentTooltip');
  }
  onDragMove(e) {
    if (e.fromComponent !== e.toComponent) {
      this.appointments.notifyObserver('removeDroppableCellClass');
    }
  }
  getAppointmentElement(e) {
    var _e$event$data;
    const itemElement = ((_e$event$data = e.event.data) === null || _e$event$data === void 0 ? void 0 : _e$event$data.itemElement) || e.itemElement;
    return $(itemElement);
  }
  onDragEnd(event) {
    const element = this.getAppointmentElement(event);
    const isAllDay = this.isAllDay(element);
    const rawAppointment = this.appointments._getItemData(element);
    const container = this.appointments._getAppointmentContainer(isAllDay);
    container.append(element);
    const $targetCell = this.workspace.getDroppableCell();
    const $dragCell = this.workspace.getCellByCoordinates(this.initialPosition, isAllDay);
    this.appointments.notifyObserver('updateAppointmentAfterDrag', {
      event,
      element,
      rawAppointment,
      isDropToTheSameCell: $targetCell.is($dragCell),
      isDropToSelfScheduler: $targetCell.length > 0
    });
  }
  onDragCancel() {
    this.removeDroppableClasses();
  }
  getItemData(appointmentElement) {
    const dataFromTooltip = $(appointmentElement).data(LIST_ITEM_DATA_KEY);
    const itemDataFromTooltip = dataFromTooltip === null || dataFromTooltip === void 0 ? void 0 : dataFromTooltip.appointment;
    const itemDataFromGrid = this.appointments._getItemData(appointmentElement);
    return itemDataFromTooltip || itemDataFromGrid;
  }
  getItemSettings(appointment) {
    const itemData = $(appointment).data(LIST_ITEM_DATA_KEY);
    return (itemData === null || itemData === void 0 ? void 0 : itemData.settings) || [];
  }
  createDragStartHandler(options, appointmentDragging) {
    return e => {
      var _appointmentDragging$;
      e.itemData = this.getItemData(e.itemElement);
      e.itemSettings = this.getItemSettings(e.itemElement);
      (_appointmentDragging$ = appointmentDragging.onDragStart) === null || _appointmentDragging$ === void 0 || _appointmentDragging$.call(appointmentDragging, e);
      if (!e.cancel) {
        options.onDragStart(e);
      }
    };
  }
  createDragMoveHandler(options, appointmentDragging) {
    return e => {
      var _appointmentDragging$2;
      (_appointmentDragging$2 = appointmentDragging.onDragMove) === null || _appointmentDragging$2 === void 0 || _appointmentDragging$2.call(appointmentDragging, e);
      if (!e.cancel) {
        options.onDragMove(e);
      }
    };
  }
  createDragEndHandler(options, appointmentDragging) {
    return e => {
      var _appointmentDragging$3;
      const updatedData = this.appointments.invoke('getUpdatedData', e.itemData);
      this.appointmentInfo = null;
      e.toItemData = extend({}, e.itemData, updatedData);
      (_appointmentDragging$3 = appointmentDragging.onDragEnd) === null || _appointmentDragging$3 === void 0 || _appointmentDragging$3.call(appointmentDragging, e);
      if (!e.cancel) {
        options.onDragEnd(e);
        if (e.fromComponent !== e.toComponent) {
          var _appointmentDragging$4;
          (_appointmentDragging$4 = appointmentDragging.onRemove) === null || _appointmentDragging$4 === void 0 || _appointmentDragging$4.call(appointmentDragging, e);
        }
      }
      // NOTE: event.cancel may be promise or different type, so we need strict check here.
      if (e.cancel === true) {
        options.onDragCancel(e);
      }
      if (e.cancel !== true && isSchedulerComponent(e.toComponent)) {
        const targetDragBehavior = e.toComponent._getDragBehavior();
        // @ts-expect-error
        targetDragBehavior.dragBetweenComponentsPromise = new Deferred();
      }
    };
  }
  createDropHandler(appointmentDragging) {
    return e => {
      const updatedData = this.appointments.invoke('getUpdatedData', e.itemData);
      e.itemData = extend({}, e.itemData, updatedData);
      if (e.fromComponent !== e.toComponent) {
        var _appointmentDragging$5;
        (_appointmentDragging$5 = appointmentDragging.onAdd) === null || _appointmentDragging$5 === void 0 || _appointmentDragging$5.call(appointmentDragging, e);
      }
      if (this.dragBetweenComponentsPromise) {
        this.dragBetweenComponentsPromise.resolve();
      }
    };
  }
  addTo(container, config) {
    const appointmentDragging = this.scheduler.option('appointmentDragging') || {};
    const options = extend({
      component: this.scheduler,
      contentTemplate: null,
      filter: `.${APPOINTMENT_ITEM_CLASS}`,
      immediate: false,
      onDragStart: this.onDragStart.bind(this),
      onDragMove: this.onDragMove.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
      onDragCancel: this.onDragCancel.bind(this)
    }, config);
    this.appointments._createComponent(container, Draggable, extend({}, options, appointmentDragging, {
      onDragStart: this.createDragStartHandler(options, appointmentDragging),
      onDragMove: this.createDragMoveHandler(options, appointmentDragging),
      onDragEnd: this.createDragEndHandler(options, appointmentDragging),
      onDrop: this.createDropHandler(appointmentDragging),
      onCancelByEsc: true
    }));
  }
  updateDragSource(appointment, settings) {
    const {
      appointmentInfo
    } = this;
    if (appointmentInfo || appointment) {
      const currentAppointment = appointment || appointmentInfo.appointment;
      const currentSettings = settings || appointmentInfo.settings;
      this.appointments._setDragSourceAppointment(currentAppointment, currentSettings);
    }
  }
  removeDroppableClasses() {
    this.appointments._removeDragSourceClassFromDraggedAppointment();
    this.workspace.removeDroppableCellClass();
  }
}