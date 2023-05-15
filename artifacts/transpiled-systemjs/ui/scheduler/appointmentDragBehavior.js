!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointmentDragBehavior.js"], ["../../core/renderer","../draggable","../../core/utils/extend","./constants","./utils/isSchedulerComponent","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointmentDragBehavior.js", ["../../core/renderer", "../draggable", "../../core/utils/extend", "./constants", "./utils/isSchedulerComponent", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _draggable = _interopRequireDefault($__require("../draggable"));
  var _extend = $__require("../../core/utils/extend");
  var _constants = $__require("./constants");
  var _isSchedulerComponent = $__require("./utils/isSchedulerComponent");
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var APPOINTMENT_ITEM_CLASS = 'dx-scheduler-appointment';
  var AppointmentDragBehavior = /*#__PURE__*/function () {
    function AppointmentDragBehavior(scheduler) {
      this.scheduler = scheduler;
      this.workspace = scheduler._workSpace;
      this.appointments = scheduler._appointments;
      this.initialPosition = {
        left: 0,
        top: 0
      };
      this.appointmentInfo = null;
      this.dragBetweenComponentsPromise = null;
    }
    var _proto = AppointmentDragBehavior.prototype;
    _proto.isAllDay = function isAllDay(appointment) {
      return appointment.data('dxAppointmentSettings').allDay;
    };
    _proto.onDragStart = function onDragStart(e) {
      var itemSettings = e.itemSettings,
          itemData = e.itemData,
          initialPosition = e.initialPosition;
      this.initialPosition = initialPosition;
      this.appointmentInfo = {
        appointment: itemData,
        settings: itemSettings
      };
      this.appointments.notifyObserver('hideAppointmentTooltip');
    };
    _proto.onDragMove = function onDragMove(e) {
      if (e.fromComponent !== e.toComponent) {
        this.appointments.notifyObserver('removeDroppableCellClass');
      }
    };
    _proto.getAppointmentElement = function getAppointmentElement(e) {
      var itemElement = e.event.data && e.event.data.itemElement || e.itemElement;
      return (0, _renderer.default)(itemElement);
    };
    _proto.onDragEnd = function onDragEnd(event) {
      var element = this.getAppointmentElement(event);
      var rawAppointment = this.appointments._getItemData(element);
      var container = this.appointments._getAppointmentContainer(this.isAllDay(element));
      container.append(element);
      var newCellIndex = this.workspace.getDroppableCellIndex();
      var oldCellIndex = this.workspace.getCellIndexByCoordinates(this.initialPosition);
      this.appointments.notifyObserver('updateAppointmentAfterDrag', {
        event: event,
        element: element,
        rawAppointment: rawAppointment,
        newCellIndex: newCellIndex,
        oldCellIndex: oldCellIndex
      });
    };
    _proto.onDragCancel = function onDragCancel() {
      this.removeDroppableClasses();
    };
    _proto.getItemData = function getItemData(appointmentElement) {
      var dataFromTooltip = (0, _renderer.default)(appointmentElement).data(_constants.LIST_ITEM_DATA_KEY);
      var itemDataFromTooltip = dataFromTooltip === null || dataFromTooltip === void 0 ? void 0 : dataFromTooltip.appointment;
      var itemDataFromGrid = this.appointments._getItemData(appointmentElement);
      return itemDataFromTooltip || itemDataFromGrid;
    };
    _proto.getItemSettings = function getItemSettings(appointment) {
      var itemData = (0, _renderer.default)(appointment).data(_constants.LIST_ITEM_DATA_KEY);
      return itemData && itemData.settings || [];
    };
    _proto.createDragStartHandler = function createDragStartHandler(options, appointmentDragging) {
      var _this = this;
      return function (e) {
        e.itemData = _this.getItemData(e.itemElement);
        e.itemSettings = _this.getItemSettings(e.itemElement);
        appointmentDragging.onDragStart && appointmentDragging.onDragStart(e);
        if (!e.cancel) {
          options.onDragStart(e);
        }
      };
    };
    _proto.createDragMoveHandler = function createDragMoveHandler(options, appointmentDragging) {
      return function (e) {
        appointmentDragging.onDragMove && appointmentDragging.onDragMove(e);
        if (!e.cancel) {
          options.onDragMove(e);
        }
      };
    };
    _proto.createDragEndHandler = function createDragEndHandler(options, appointmentDragging) {
      var _this2 = this;
      return function (e) {
        _this2.appointmentInfo = null;
        appointmentDragging.onDragEnd && appointmentDragging.onDragEnd(e);
        if (!e.cancel) {
          options.onDragEnd(e);
          if (e.fromComponent !== e.toComponent) {
            appointmentDragging.onRemove && appointmentDragging.onRemove(e);
          }
        }

        // NOTE: event.cancel may be promise or different type, so we need strict check here.
        if (e.cancel === true) {
          _this2.removeDroppableClasses();
        }
        if (e.cancel !== true && (0, _isSchedulerComponent.isSchedulerComponent)(e.toComponent)) {
          var targetDragBehavior = e.toComponent._getDragBehavior();
          targetDragBehavior.dragBetweenComponentsPromise = new _deferred.Deferred();
        }
      };
    };
    _proto.createDropHandler = function createDropHandler(appointmentDragging) {
      var _this3 = this;
      return function (e) {
        var updatedData = _this3.appointments.invoke('getUpdatedData', e.itemData);
        e.itemData = (0, _extend.extend)({}, e.itemData, updatedData);
        if (e.fromComponent !== e.toComponent) {
          appointmentDragging.onAdd && appointmentDragging.onAdd(e);
        }
        if (_this3.dragBetweenComponentsPromise) {
          _this3.dragBetweenComponentsPromise.resolve();
        }
      };
    };
    _proto.addTo = function addTo(container, config) {
      var appointmentDragging = this.scheduler.option('appointmentDragging') || {};
      var options = (0, _extend.extend)({
        component: this.scheduler,
        contentTemplate: null,
        filter: ".".concat(APPOINTMENT_ITEM_CLASS),
        immediate: false,
        onDragStart: this.onDragStart.bind(this),
        onDragMove: this.onDragMove.bind(this),
        onDragEnd: this.onDragEnd.bind(this),
        onDragCancel: this.onDragCancel.bind(this)
      }, config);
      this.appointments._createComponent(container, _draggable.default, (0, _extend.extend)({}, options, appointmentDragging, {
        onDragStart: this.createDragStartHandler(options, appointmentDragging),
        onDragMove: this.createDragMoveHandler(options, appointmentDragging),
        onDragEnd: this.createDragEndHandler(options, appointmentDragging),
        onDrop: this.createDropHandler(appointmentDragging),
        onCancelByEsc: true
      }));
    };
    _proto.updateDragSource = function updateDragSource(appointment, settings) {
      var appointmentInfo = this.appointmentInfo;
      if (appointmentInfo || appointment) {
        var currentAppointment = appointment || appointmentInfo.appointment;
        var currentSettings = settings || appointmentInfo.settings;
        this.appointments._setDragSourceAppointment(currentAppointment, currentSettings);
      }
    };
    _proto.removeDroppableClasses = function removeDroppableClasses() {
      this.appointments._removeDragSourceClassFromDraggedAppointment();
      this.workspace.removeDroppableCellClass();
    };
    return AppointmentDragBehavior;
  }();
  exports.default = AppointmentDragBehavior;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../draggable","../../core/utils/extend","./constants","./utils/isSchedulerComponent","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../draggable"), require("../../core/utils/extend"), require("./constants"), require("./utils/isSchedulerComponent"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointmentDragBehavior.js.map