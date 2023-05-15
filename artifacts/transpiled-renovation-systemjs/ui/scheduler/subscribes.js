!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/subscribes.js"], ["../../core/renderer","../../core/utils/type","../../core/utils/date","../../core/utils/iterator","../../core/utils/extend","./classes","./utils","./appointmentAdapter","./appointments/textUtils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/subscribes.js", ["../../core/renderer", "../../core/utils/type", "../../core/utils/date", "../../core/utils/iterator", "../../core/utils/extend", "./classes", "./utils", "./appointmentAdapter", "./appointments/textUtils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _type = $__require("../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _classes = $__require("./classes");
  var _utils = $__require("./utils");
  var _appointmentAdapter = $__require("./appointmentAdapter");
  var _textUtils = $__require("./appointments/textUtils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var toMs = _date.default.dateToMilliseconds;
  var subscribes = {
    isCurrentViewAgenda: function isCurrentViewAgenda() {
      return this.currentViewType === 'agenda';
    },
    currentViewUpdated: function currentViewUpdated(currentView) {
      this.option('currentView', currentView);
    },
    currentDateUpdated: function currentDateUpdated(date) {
      this.option('currentDate', date);
    },
    getOption: function getOption(name) {
      return this.option(name);
    },
    getWorkspaceOption: function getWorkspaceOption(name) {
      return this.getWorkSpace().option(name);
    },
    isVirtualScrolling: function isVirtualScrolling() {
      return this.isVirtualScrolling();
    },
    setCellDataCacheAlias: function setCellDataCacheAlias(appointment, geometry) {
      this._workSpace.setCellDataCacheAlias(appointment, geometry);
    },
    isGroupedByDate: function isGroupedByDate() {
      return this.getWorkSpace().isGroupedByDate();
    },
    showAppointmentTooltip: function showAppointmentTooltip(options) {
      var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
      this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
    },
    hideAppointmentTooltip: function hideAppointmentTooltip() {
      this.hideAppointmentTooltip();
    },
    showEditAppointmentPopup: function showEditAppointmentPopup(options) {
      var targetedData = this.getTargetedAppointment(options.data, options.target);
      this.showAppointmentPopup(options.data, false, targetedData);
    },
    updateAppointmentAfterResize: function updateAppointmentAfterResize(options) {
      var info = _utils.utils.dataAccessors.getAppointmentInfo(options.$appointment);
      var exceptionDate = info.sourceAppointment.exceptionDate;
      this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
        this._updateAppointment(options.target, options.data, function () {
          this._appointments.moveAppointmentBack();
        });
      }.bind(this));
    },
    getUpdatedData: function getUpdatedData(rawAppointment) {
      return this._getUpdatedData(rawAppointment);
    },
    updateAppointmentAfterDrag: function updateAppointmentAfterDrag(_ref) {
      var _this = this;
      var event = _ref.event,
          element = _ref.element,
          rawAppointment = _ref.rawAppointment,
          newCellIndex = _ref.newCellIndex,
          oldCellIndex = _ref.oldCellIndex;
      var info = _utils.utils.dataAccessors.getAppointmentInfo(element);
      var appointment = (0, _appointmentAdapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
      var targetedAppointment = (0, _appointmentAdapter.createAppointmentAdapter)((0, _extend.extend)({}, rawAppointment, this._getUpdatedData(rawAppointment)), this._dataAccessors, this.timeZoneCalculator);
      var targetedRawAppointment = targetedAppointment.source();
      var becomeAllDay = targetedAppointment.allDay;
      var wasAllDay = appointment.allDay;
      var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);
      var isDragAndDropBetweenComponents = event.fromComponent !== event.toComponent;
      if (newCellIndex === -1) {
        if (!isDragAndDropBetweenComponents) {
          // TODO dragging inside component
          this._appointments.moveAppointmentBack(event);
        }
        return;
      }
      if (newCellIndex !== oldCellIndex || isDragAndDropBetweenComponents || movedBetweenAllDayAndSimple) {
        this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.exceptionDate, function () {
          _this._updateAppointment(rawAppointment, targetedRawAppointment, function () {
            this._appointments.moveAppointmentBack(event);
          }, event);
        }, undefined, undefined, event);
      } else {
        this._appointments.moveAppointmentBack(event);
      }
    },
    onDeleteButtonPress: function onDeleteButtonPress(options) {
      var targetedData = this.getTargetedAppointment(options.data, (0, _renderer.default)(options.target));
      this.checkAndDeleteAppointment(options.data, targetedData);
      this.hideAppointmentTooltip();
    },
    getTextAndFormatDate: function getTextAndFormatDate(appointmentRaw, targetedAppointmentRaw, format) {
      // TODO: rename to createFormattedDateText
      var appointmentAdapter = (0, _appointmentAdapter.createAppointmentAdapter)(appointmentRaw, this._dataAccessors, this.timeZoneCalculator);
      var targetedAdapter = (0, _appointmentAdapter.createAppointmentAdapter)(targetedAppointmentRaw || appointmentRaw, this._dataAccessors, this.timeZoneCalculator);

      // TODO pull out time zone converting from appointment adapter for knockout(T947938)
      var startDate = this.timeZoneCalculator.createDate(targetedAdapter.startDate, {
        path: 'toGrid'
      });
      var endDate = this.timeZoneCalculator.createDate(targetedAdapter.endDate, {
        path: 'toGrid'
      });
      var formatType = format || (0, _textUtils.getFormatType)(startDate, endDate, targetedAdapter.allDay, this.currentViewType !== 'month');
      return {
        text: targetedAdapter.text || appointmentAdapter.text,
        formatDate: (0, _textUtils.formatDates)(startDate, endDate, formatType)
      };
    },
    _createAppointmentTitle: function _createAppointmentTitle(data) {
      if ((0, _type.isPlainObject)(data)) {
        return data.text;
      }
      return String(data);
    },
    getResizableAppointmentArea: function getResizableAppointmentArea(options) {
      var allDay = options.allDay;
      var groups = this._getCurrentViewOption('groups');
      if (groups && groups.length) {
        if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
          var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
          return {
            left: horizontalGroupBounds.left,
            right: horizontalGroupBounds.right,
            top: 0,
            bottom: 0
          };
        }
        if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
          var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
          return {
            left: 0,
            right: 0,
            top: verticalGroupBounds.top,
            bottom: verticalGroupBounds.bottom
          };
        }
      }
    },
    needRecalculateResizableArea: function needRecalculateResizableArea() {
      return this.getWorkSpace().needRecalculateResizableArea();
    },
    getAppointmentGeometry: function getAppointmentGeometry(settings) {
      return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
    },
    isAllDay: function isAllDay(appointmentData) {
      return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
    },
    getDeltaTime: function getDeltaTime(e, initialSize, itemData) {
      return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
    },
    getDropDownAppointmentWidth: function getDropDownAppointmentWidth(isAllDay) {
      return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
    },
    getDropDownAppointmentHeight: function getDropDownAppointmentHeight() {
      return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
    },
    getCellWidth: function getCellWidth() {
      return this.getWorkSpace().getCellWidth();
    },
    getCellHeight: function getCellHeight() {
      return this.getWorkSpace().getCellHeight();
    },
    getMaxAppointmentCountPerCellByType: function getMaxAppointmentCountPerCellByType(isAllDay) {
      return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
    },
    needCorrectAppointmentDates: function needCorrectAppointmentDates() {
      return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
    },
    getRenderingStrategyDirection: function getRenderingStrategyDirection() {
      return this.getRenderingStrategyInstance().getDirection();
    },
    updateAppointmentEndDate: function updateAppointmentEndDate(options) {
      var endDate = options.endDate;
      var endDayHour = this._getCurrentViewOption('endDayHour');
      var startDayHour = this._getCurrentViewOption('startDayHour');
      var updatedEndDate = endDate;
      if (endDate.getHours() >= endDayHour) {
        updatedEndDate.setHours(endDayHour, 0, 0, 0);
      } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
        updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
        updatedEndDate.setHours(endDayHour, 0, 0, 0);
      }
      return updatedEndDate;
    },
    renderCompactAppointments: function renderCompactAppointments(options) {
      this._compactAppointmentsHelper.render(options);
    },
    clearCompactAppointments: function clearCompactAppointments() {
      this._compactAppointmentsHelper.clear();
    },
    supportCompactDropDownAppointments: function supportCompactDropDownAppointments() {
      return this.getLayoutManager().getRenderingStrategyInstance().supportCompactDropDownAppointments();
    },
    getGroupCount: function getGroupCount() {
      return this._workSpace._getGroupCount();
    },
    mapAppointmentFields: function mapAppointmentFields(config) {
      var itemData = config.itemData,
          itemElement = config.itemElement,
          targetedAppointment = config.targetedAppointment;
      var targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
      return {
        appointmentData: config.itemData,
        appointmentElement: config.itemElement,
        targetedAppointmentData: targetedData
      };
    },
    dayHasAppointment: function dayHasAppointment(day, appointment, trimTime) {
      return this.dayHasAppointment(day, appointment, trimTime);
    },
    getLayoutManager: function getLayoutManager() {
      return this._layoutManager;
    },
    getAgendaVerticalStepHeight: function getAgendaVerticalStepHeight() {
      return this.getWorkSpace().getAgendaVerticalStepHeight();
    },
    getAgendaDuration: function getAgendaDuration() {
      return this._getCurrentViewOption('agendaDuration');
    },
    getStartViewDate: function getStartViewDate() {
      return this.getStartViewDate();
    },
    getEndViewDate: function getEndViewDate() {
      return this.getEndViewDate();
    },
    forceMaxAppointmentPerCell: function forceMaxAppointmentPerCell() {
      return this.forceMaxAppointmentPerCell();
    },
    onAgendaReady: function onAgendaReady(rows) {
      var $appts = this.getAppointmentsInstance()._itemElements();
      var total = 0;
      var applyClass = function applyClass(_, count) {
        var index = count + total - 1;
        $appts.eq(index).addClass(_classes.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
        total += count;
      };
      for (var i = 0; i < rows.length; i++) {
        (0, _iterator.each)(rows[i], applyClass);
      }
    },
    getTimezone: function getTimezone() {
      return this._getTimezoneOffsetByOption();
    },
    getTargetedAppointmentData: function getTargetedAppointmentData(appointment, element) {
      return this.getTargetedAppointment(appointment, element);
    },
    getEndDayHour: function getEndDayHour() {
      return this._workSpace.option('endDayHour') || this.option('endDayHour');
    },
    getStartDayHour: function getStartDayHour() {
      return this._workSpace.option('startDayHour') || this.option('startDayHour');
    },
    isAdaptive: function isAdaptive() {
      return this.option('adaptivityEnabled');
    },
    removeDroppableCellClass: function removeDroppableCellClass() {
      this._workSpace.removeDroppableCellClass();
    }
  };
  var _default = subscribes;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/type","../../core/utils/date","../../core/utils/iterator","../../core/utils/extend","./classes","./utils","./appointmentAdapter","./appointments/textUtils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/type"), require("../../core/utils/date"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("./classes"), require("./utils"), require("./appointmentAdapter"), require("./appointments/textUtils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=subscribes.js.map