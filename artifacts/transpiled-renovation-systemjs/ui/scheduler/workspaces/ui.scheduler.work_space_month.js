!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space_month.js"], ["../../../core/utils/common","../../../core/component_registrator","./ui.scheduler.work_space.indicator","../../../core/utils/date","../../../core/utils/position","../utils","../../../core/utils/window","../../../renovation/ui/scheduler/workspaces/month/date_table/layout.j","../../../renovation/ui/scheduler/view_model/to_test/views/utils/month","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space_month.js", ["../../../core/utils/common", "../../../core/component_registrator", "./ui.scheduler.work_space.indicator", "../../../core/utils/date", "../../../core/utils/position", "../utils", "../../../core/utils/window", "../../../renovation/ui/scheduler/workspaces/month/date_table/layout.j", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/month", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _common = $__require("../../../core/utils/common");
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _uiSchedulerWork_space = _interopRequireDefault($__require("./ui.scheduler.work_space.indicator"));
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _position = $__require("../../../core/utils/position");
  var _utils = $__require("../utils");
  var _window = $__require("../../../core/utils/window");
  var _layout = _interopRequireDefault($__require("../../../renovation/ui/scheduler/workspaces/month/date_table/layout.j"));
  var _month = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/month");
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _constants = $__require("../constants");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var MONTH_CLASS = 'dx-scheduler-work-space-month';
  var DATE_TABLE_CURRENT_DATE_CLASS = 'dx-scheduler-date-table-current-date';
  var DATE_TABLE_CELL_TEXT_CLASS = 'dx-scheduler-date-table-cell-text';
  var DATE_TABLE_FIRST_OF_MONTH_CLASS = 'dx-scheduler-date-table-first-of-month';
  var DATE_TABLE_OTHER_MONTH_DATE_CLASS = 'dx-scheduler-date-table-other-month';
  var toMs = _date.default.dateToMilliseconds;
  var SchedulerWorkSpaceMonth = /*#__PURE__*/function (_SchedulerWorkSpace) {
    _inheritsLoose(SchedulerWorkSpaceMonth, _SchedulerWorkSpace);
    function SchedulerWorkSpaceMonth() {
      return _SchedulerWorkSpace.apply(this, arguments) || this;
    }
    var _proto = SchedulerWorkSpaceMonth.prototype;
    _proto._getElementClass = function _getElementClass() {
      return MONTH_CLASS;
    };
    _proto._getFormat = function _getFormat() {
      return _base.formatWeekday;
    };
    _proto._getIntervalBetween = function _getIntervalBetween(currentDate) {
      var firstViewDate = this.getStartViewDate();
      var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
      return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
    };
    _proto._getDateGenerationOptions = function _getDateGenerationOptions() {
      return _extends({}, _SchedulerWorkSpace.prototype._getDateGenerationOptions.call(this), {
        cellCountInDay: 1
      });
    }

    // TODO: temporary fix, in the future, if we replace table layout on div layout, getCellWidth method need remove. Details in T712431
    // TODO: there is a test for this bug, when changing the layout, the test will also be useless
    ;
    _proto.getCellWidth = function getCellWidth() {
      var _this = this;
      return this.cache.get('cellWidth', function () {
        var DAYS_IN_WEEK = 7;
        var averageWidth = 0;
        var cells = _this._getCells().slice(0, DAYS_IN_WEEK);
        cells.each(function (index, element) {
          averageWidth += (0, _window.hasWindow)() ? (0, _position.getBoundingRect)(element).width : 0;
        });
        return cells.length === 0 ? undefined : averageWidth / DAYS_IN_WEEK;
      });
    };
    _proto._insertAllDayRowsIntoDateTable = function _insertAllDayRowsIntoDateTable() {
      return false;
    };
    _proto._getCellCoordinatesByIndex = function _getCellCoordinatesByIndex(index) {
      var rowIndex = Math.floor(index / this._getCellCount());
      var columnIndex = index - this._getCellCount() * rowIndex;
      return {
        rowIndex: rowIndex,
        columnIndex: columnIndex
      };
    };
    _proto._needCreateCrossScrolling = function _needCreateCrossScrolling() {
      return this.option('crossScrollingEnabled') || this._isVerticalGroupedWorkSpace();
    };
    _proto._getViewStartByOptions = function _getViewStartByOptions() {
      return (0, _month.getViewStartByOptions)(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), _date.default.getFirstMonthDate(this.option('startDate')));
    };
    _proto._updateIndex = function _updateIndex(index) {
      return index;
    };
    _proto.isIndicationAvailable = function isIndicationAvailable() {
      return false;
    };
    _proto.getIntervalDuration = function getIntervalDuration() {
      return toMs('day');
    };
    _proto.getTimePanelWidth = function getTimePanelWidth() {
      return 0;
    };
    _proto.supportAllDayRow = function supportAllDayRow() {
      return false;
    };
    _proto.keepOriginalHours = function keepOriginalHours() {
      return true;
    };
    _proto.getWorkSpaceLeftOffset = function getWorkSpaceLeftOffset() {
      return 0;
    };
    _proto.needApplyCollectorOffset = function needApplyCollectorOffset() {
      return true;
    };
    _proto._getHeaderDate = function _getHeaderDate() {
      return this._getViewStartByOptions();
    };
    _proto.scrollToTime = function scrollToTime() {
      return (0, _common.noop)();
    };
    _proto.renderRAllDayPanel = function renderRAllDayPanel() {};
    _proto.renderRTimeTable = function renderRTimeTable() {};
    _proto.renderRDateTable = function renderRDateTable() {
      _utils.utils.renovation.renderComponent(this, this._$dateTable, _layout.default, 'renovatedDateTable', this._getRDateTableProps());
    }

    // -------------
    // We need these methods for now but they are useless for renovation
    // -------------
    ;
    _proto._createWorkSpaceElements = function _createWorkSpaceElements() {
      if (this._isVerticalGroupedWorkSpace()) {
        this._createWorkSpaceScrollableElements();
      } else {
        _SchedulerWorkSpace.prototype._createWorkSpaceElements.call(this);
      }
    };
    _proto._toggleAllDayVisibility = function _toggleAllDayVisibility() {
      return (0, _common.noop)();
    };
    _proto._changeAllDayVisibility = function _changeAllDayVisibility() {
      return (0, _common.noop)();
    }

    // --------------
    // These methods should be deleted when we get rid of old render
    // --------------
    ;
    _proto._renderTimePanel = function _renderTimePanel() {
      return (0, _common.noop)();
    };
    _proto._renderAllDayPanel = function _renderAllDayPanel() {
      return (0, _common.noop)();
    };
    _proto._setMonthClassesToCell = function _setMonthClassesToCell($cell, data) {
      $cell.toggleClass(DATE_TABLE_CURRENT_DATE_CLASS, data.isCurrentDate).toggleClass(DATE_TABLE_FIRST_OF_MONTH_CLASS, data.firstDayOfMonth).toggleClass(DATE_TABLE_OTHER_MONTH_DATE_CLASS, data.otherMonth);
    };
    _proto._createAllDayPanelElements = function _createAllDayPanelElements() {};
    _proto._renderTableBody = function _renderTableBody(options) {
      var _this2 = this;
      options.getCellText = function (rowIndex, columnIndex) {
        var date = _this2.viewDataProvider.completeViewDataMap[rowIndex][columnIndex].startDate;
        return (0, _month.getCellText)(date, _this2.option('intervalCount'));
      };
      options.getCellTextClass = DATE_TABLE_CELL_TEXT_CLASS;
      options.setAdditionalClasses = this._setMonthClassesToCell.bind(this), _SchedulerWorkSpace.prototype._renderTableBody.call(this, options);
    };
    _createClass(SchedulerWorkSpaceMonth, [{
      key: "type",
      get: function get() {
        return _constants.VIEWS.MONTH;
      }
    }]);
    return SchedulerWorkSpaceMonth;
  }(_uiSchedulerWork_space.default);
  (0, _component_registrator.default)('dxSchedulerWorkSpaceMonth', SchedulerWorkSpaceMonth);
  var _default = SchedulerWorkSpaceMonth;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/common","../../../core/component_registrator","./ui.scheduler.work_space.indicator","../../../core/utils/date","../../../core/utils/position","../utils","../../../core/utils/window","../../../renovation/ui/scheduler/workspaces/month/date_table/layout.j","../../../renovation/ui/scheduler/view_model/to_test/views/utils/month","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/common"), require("../../../core/component_registrator"), require("./ui.scheduler.work_space.indicator"), require("../../../core/utils/date"), require("../../../core/utils/position"), require("../utils"), require("../../../core/utils/window"), require("../../../renovation/ui/scheduler/workspaces/month/date_table/layout.j"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/month"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.work_space_month.js.map