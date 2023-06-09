/**
* DevExtreme (esm/ui/scheduler/appointmentPopup/popup.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import { Deferred, when } from '../../../core/utils/deferred';
import { triggerResizeEvent } from '../../../events/visibility_change';
import Popup from '../../popup/ui.popup';
import { hide as hideLoading, show as showLoading } from '../loading';
import { createAppointmentAdapter } from '../appointmentAdapter';
import { getNormalizedResources } from '../resources/utils';
import { isPopupFullScreenNeeded, getMaxWidth, getPopupToolbarItems } from '../../../renovation/ui/scheduler/appointment_edit_form/popup_config';
var toMs = dateUtils.dateToMilliseconds;
var APPOINTMENT_POPUP_CLASS = 'dx-scheduler-appointment-popup';
var DAY_IN_MS = toMs('day');
var POPUP_CONFIG = {
  height: 'auto',
  maxHeight: '100%',
  showCloseButton: false,
  showTitle: false,
  preventScrollEvents: false,
  enableBodyScroll: false,
  defaultOptionsRules: [{
    device: () => devices.current().android,
    options: {
      showTitle: false
    }
  }]
};
export var ACTION_TO_APPOINTMENT = {
  CREATE: 0,
  UPDATE: 1,
  EXCLUDE_FROM_SERIES: 2
};
export class AppointmentPopup {
  constructor(scheduler, form) {
    this.scheduler = scheduler;
    this.form = form;
    this.popup = null;
    this.state = {
      action: null,
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null
      }
    };
  }
  get visible() {
    return this.popup ? this.popup.option('visible') : false;
  }
  show(appointment, config) {
    this.state.appointment.data = appointment;
    this.state.action = config.action;
    this.state.excludeInfo = config.excludeInfo;
    if (!this.popup) {
      var popupConfig = this._createPopupConfig();
      this.popup = this._createPopup(popupConfig);
    }
    this.popup.option('toolbarItems', getPopupToolbarItems(config.isToolbarVisible, e => this._doneButtonClickHandler(e)));
    this.popup.show();
  }
  hide() {
    this.popup.hide();
  }
  dispose() {
    var _this$popup;
    (_this$popup = this.popup) === null || _this$popup === void 0 ? void 0 : _this$popup.$element().remove();
  }
  _createPopup(options) {
    var popupElement = $('<div>').addClass(APPOINTMENT_POPUP_CLASS).appendTo(this.scheduler.getElement());
    return this.scheduler.createComponent(popupElement, Popup, options);
  }
  _createPopupConfig() {
    return _extends({}, POPUP_CONFIG, {
      onHiding: () => this.scheduler.focus(),
      contentTemplate: () => this._createPopupContent(),
      onShowing: e => this._onShowing(e),
      copyRootClassesToWrapper: true,
      _ignoreCopyRootClassesToWrapperDeprecation: true
    });
  }
  _onShowing(e) {
    this._updateForm();
    var arg = {
      form: this.form.dxForm,
      popup: this.popup,
      appointmentData: this.state.appointment.data,
      cancel: false
    };
    this.scheduler.getAppointmentFormOpening()(arg);
    this.scheduler.processActionResult(arg, canceled => {
      if (canceled) {
        e.cancel = true;
      } else {
        this.updatePopupFullScreenMode();
      }
    });
  }
  _createPopupContent() {
    this._createForm();
    return this.form.dxForm.$element(); // TODO
  }

  _createFormData(rawAppointment) {
    var appointment = this._createAppointmentAdapter(rawAppointment);
    var dataAccessors = this.scheduler.getDataAccessors();
    var resources = this.scheduler.getResources();
    var normalizedResources = getNormalizedResources(rawAppointment, dataAccessors, resources);
    return _extends({}, rawAppointment, normalizedResources, {
      repeat: !!appointment.recurrenceRule
    });
  }
  _createForm() {
    var rawAppointment = this.state.appointment.data;
    var formData = this._createFormData(rawAppointment);
    this.form.create(this.triggerResize.bind(this), this.changeSize.bind(this), formData); // TODO
  }

  _isReadOnly(rawAppointment) {
    var appointment = this._createAppointmentAdapter(rawAppointment);
    if (rawAppointment && appointment.disabled) {
      return true;
    }
    if (this.state.action === ACTION_TO_APPOINTMENT.CREATE) {
      return false;
    }
    return !this.scheduler.getEditingConfig().allowUpdating;
  }
  _createAppointmentAdapter(rawAppointment) {
    return createAppointmentAdapter(rawAppointment, this.scheduler.getDataAccessors(), this.scheduler.getTimeZoneCalculator());
  }
  _updateForm() {
    var {
      data
    } = this.state.appointment;
    var appointment = this._createAppointmentAdapter(this._createFormData(data));
    if (appointment.startDate) {
      appointment.startDate = appointment.calculateStartDate('toAppointment');
    }
    if (appointment.endDate) {
      appointment.endDate = appointment.calculateEndDate('toAppointment');
    }
    var formData = appointment.source();
    this.form.readOnly = this._isReadOnly(formData);
    this.form.updateFormData(formData);
  }
  triggerResize() {
    if (this.popup) {
      triggerResizeEvent(this.popup.$element());
    }
  }
  changeSize(isRecurrence) {
    if (this.popup) {
      var isFullScreen = isPopupFullScreenNeeded();
      var maxWidth = isFullScreen ? '100%' : getMaxWidth(isRecurrence);
      this.popup.option('fullScreen', isFullScreen);
      this.popup.option('maxWidth', maxWidth);
    }
  }
  updatePopupFullScreenMode() {
    if (this.form.dxForm) {
      // TODO
      var formData = this.form.formData;
      var isRecurrence = formData[this.scheduler.getDataAccessors().expr.recurrenceRuleExpr];
      if (this.visible) {
        this.changeSize(isRecurrence);
      }
    }
  }
  saveChangesAsync(isShowLoadPanel) {
    var deferred = new Deferred();
    var validation = this.form.dxForm.validate();
    isShowLoadPanel && this._showLoadPanel();
    when(validation && validation.complete || validation).done(validation => {
      if (validation && !validation.isValid) {
        hideLoading();
        deferred.resolve(false);
        return;
      }
      var adapter = this._createAppointmentAdapter(this.form.formData);
      var clonedAdapter = adapter.clone({
        pathTimeZone: 'fromAppointment'
      }); // TODO:

      this._addMissingDSTTime(adapter, clonedAdapter);
      var appointment = clonedAdapter.source();
      delete appointment.repeat; // TODO

      switch (this.state.action) {
        case ACTION_TO_APPOINTMENT.CREATE:
          this.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.UPDATE:
          this.scheduler.updateAppointment(this.state.appointment.data, appointment).done(deferred.resolve);
          break;
        case ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES:
          this.scheduler.updateAppointment(this.state.excludeInfo.sourceAppointment, this.state.excludeInfo.updatedAppointment);
          this.scheduler.addAppointment(appointment).done(deferred.resolve);
          break;
      }
      deferred.done(() => {
        hideLoading();
        this.state.lastEditData = appointment;
      });
    });
    return deferred.promise();
  }
  _doneButtonClickHandler(e) {
    e.cancel = true;
    this.saveEditDataAsync();
  }
  saveEditDataAsync() {
    var deferred = new Deferred();
    if (this._tryLockSaveChanges()) {
      when(this.saveChangesAsync(true)).done(() => {
        if (this.state.lastEditData) {
          // TODO
          var adapter = this._createAppointmentAdapter(this.state.lastEditData);
          var {
            startDate,
            endDate,
            allDay
          } = adapter;
          var startTime = startDate.getTime();
          var endTime = endDate.getTime();
          var inAllDayRow = allDay || endTime - startTime >= DAY_IN_MS;
          var dataAccessors = this.scheduler.getDataAccessors();
          var resourceList = this.scheduler.getResources();
          var normalizedResources = getNormalizedResources(this.state.lastEditData, dataAccessors, resourceList);
          this.scheduler.updateScrollPosition(startDate, normalizedResources, inAllDayRow);
          this.state.lastEditData = null;
        }
        this._unlockSaveChanges();
        deferred.resolve();
      });
    }
    return deferred.promise();
  }
  _showLoadPanel() {
    var container = this.popup.$overlayContent();
    showLoading({
      container,
      position: {
        of: container
      },
      copyRootClassesToWrapper: true,
      _ignoreCopyRootClassesToWrapperDeprecation: true
    });
  }
  _tryLockSaveChanges() {
    if (this.state.saveChangesLocker === false) {
      this.state.saveChangesLocker = true;
      return true;
    }
    return false;
  }
  _unlockSaveChanges() {
    this.state.saveChangesLocker = false;
  }

  // NOTE: Fix ticket T1100758
  _addMissingDSTTime(formAppointmentAdapter, clonedAppointmentAdapter) {
    var timeZoneCalculator = this.scheduler.getTimeZoneCalculator();
    clonedAppointmentAdapter.startDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.startDate, clonedAppointmentAdapter.startDate);
    if (clonedAppointmentAdapter.endDate) {
      clonedAppointmentAdapter.endDate = this._addMissingDSTShiftToDate(timeZoneCalculator, formAppointmentAdapter.endDate, clonedAppointmentAdapter.endDate);
    }
  }
  _addMissingDSTShiftToDate(timeZoneCalculator, originFormDate, clonedDate) {
    var _timeZoneCalculator$g, _timeZoneCalculator$g2;
    var originTimezoneShift = (_timeZoneCalculator$g = timeZoneCalculator.getOffsets(originFormDate)) === null || _timeZoneCalculator$g === void 0 ? void 0 : _timeZoneCalculator$g.common;
    var clonedTimezoneShift = (_timeZoneCalculator$g2 = timeZoneCalculator.getOffsets(clonedDate)) === null || _timeZoneCalculator$g2 === void 0 ? void 0 : _timeZoneCalculator$g2.common;
    var shiftDifference = originTimezoneShift - clonedTimezoneShift;
    return shiftDifference ? new Date(clonedDate.getTime() + shiftDifference * toMs('hour')) : clonedDate;
  }
}
