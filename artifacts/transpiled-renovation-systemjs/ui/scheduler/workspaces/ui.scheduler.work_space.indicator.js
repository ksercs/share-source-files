!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.indicator.js"], ["../../../core/utils/size","../../../core/renderer","./ui.scheduler.work_space","../../../core/component_registrator","../../../core/utils/date","../../../core/utils/extend","../../../core/utils/position","../../../core/utils/window","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../utils.timeZone"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.indicator.js", ["../../../core/utils/size", "../../../core/renderer", "./ui.scheduler.work_space", "../../../core/component_registrator", "../../../core/utils/date", "../../../core/utils/extend", "../../../core/utils/position", "../../../core/utils/window", "../classes", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../utils.timeZone"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _uiScheduler = _interopRequireDefault($__require("./ui.scheduler.work_space"));
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _extend = $__require("../../../core/utils/extend");
  var _position = $__require("../../../core/utils/position");
  var _window = $__require("../../../core/utils/window");
  var _classes = $__require("../classes");
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _utils = _interopRequireDefault($__require("../utils.timeZone"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var toMs = _date.default.dateToMilliseconds;
  var SCHEDULER_DATE_TIME_INDICATOR_CLASS = 'dx-scheduler-date-time-indicator';
  var TIME_PANEL_CURRENT_TIME_CELL_CLASS = 'dx-scheduler-time-panel-current-time-cell';
  var SchedulerWorkSpaceIndicator = /*#__PURE__*/function (_SchedulerWorkSpace) {
    _inheritsLoose(SchedulerWorkSpaceIndicator, _SchedulerWorkSpace);
    function SchedulerWorkSpaceIndicator() {
      return _SchedulerWorkSpace.apply(this, arguments) || this;
    }
    var _proto = SchedulerWorkSpaceIndicator.prototype;
    _proto._getToday = function _getToday() {
      return (0, _base.getToday)(this.option('indicatorTime'), this.timeZoneCalculator);
    };
    _proto.isIndicationOnView = function isIndicationOnView() {
      if (this.option('showCurrentTimeIndicator')) {
        var today = this._getToday();
        var endViewDate = _date.default.trimTime(this.getEndViewDate());
        return _date.default.dateInRange(today, this.getStartViewDate(), new Date(endViewDate.getTime() + toMs('day')));
      }
      return false;
    };
    _proto.isIndicationAvailable = function isIndicationAvailable() {
      if (!(0, _window.hasWindow)()) {
        return false;
      }
      var today = this._getToday();
      return today >= _date.default.trimTime(new Date(this.getStartViewDate()));
    };
    _proto.isIndicatorVisible = function isIndicatorVisible() {
      var today = this._getToday();

      // Subtracts 1 ms from the real endViewDate instead of 1 minute
      var endViewDate = new Date(this.getEndViewDate().getTime() + toMs('minute') - 1);
      var firstViewDate = new Date(this.getStartViewDate());
      firstViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      endViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      return _date.default.dateInRange(today, firstViewDate, endViewDate);
    };
    _proto._renderDateTimeIndication = function _renderDateTimeIndication() {
      if (this.isIndicationAvailable()) {
        if (this.option('shadeUntilCurrentTime')) {
          this._shader.render();
        }
        if (this.isIndicationOnView() && this.isIndicatorVisible()) {
          var groupCount = this._getGroupCount() || 1;
          var $container = this._dateTableScrollable.$content();
          var height = this.getIndicationHeight();
          var rtlOffset = this._getRtlOffset(this.getCellWidth());
          this._renderIndicator(height, rtlOffset, $container, groupCount);
          this._setCurrentTimeCells();
        }
      }
    };
    _proto._renderIndicator = function _renderIndicator(height, rtlOffset, $container, groupCount) {
      var groupedByDate = this.isGroupedByDate();
      var repeatCount = groupedByDate ? 1 : groupCount;
      for (var i = 0; i < repeatCount; i++) {
        var $indicator = this._createIndicator($container);
        (0, _size.setWidth)($indicator, groupedByDate ? this.getCellWidth() * groupCount : this.getCellWidth());
        this._groupedStrategy.shiftIndicator($indicator, height, rtlOffset, i);
      }
    };
    _proto._createIndicator = function _createIndicator($container) {
      var $indicator = (0, _renderer.default)('<div>').addClass(SCHEDULER_DATE_TIME_INDICATOR_CLASS);
      $container.append($indicator);
      return $indicator;
    };
    _proto._getRtlOffset = function _getRtlOffset(width) {
      return this.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._dateTableScrollable.$content().get(0)).width - this.getTimePanelWidth() - width : 0;
    };
    _proto._setIndicationUpdateInterval = function _setIndicationUpdateInterval() {
      if (!this.option('showCurrentTimeIndicator') || this.option('indicatorUpdateInterval') === 0) {
        return;
      }
      this._clearIndicatorUpdateInterval();
      this._indicatorInterval = setInterval(function () {
        this._refreshDateTimeIndication();
      }.bind(this), this.option('indicatorUpdateInterval'));
    };
    _proto._clearIndicatorUpdateInterval = function _clearIndicatorUpdateInterval() {
      if (this._indicatorInterval) {
        clearInterval(this._indicatorInterval);
        delete this._indicatorInterval;
      }
    };
    _proto._isVerticalShader = function _isVerticalShader() {
      return true;
    };
    _proto.getIndicationWidth = function getIndicationWidth(groupIndex) {
      var maxWidth = this.getCellWidth() * this._getCellCount();
      var difference = this._getIndicatorDuration();
      if (difference > this._getCellCount()) {
        difference = this._getCellCount();
      }
      var width = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
      return maxWidth < width ? maxWidth : width;
    };
    _proto.getIndicatorOffset = function getIndicatorOffset(groupIndex) {
      var difference = this._getIndicatorDuration() - 1;
      var offset = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
      return offset;
    };
    _proto._getIndicatorDuration = function _getIndicatorDuration() {
      var today = this._getToday();
      var firstViewDate = new Date(this.getStartViewDate());
      var timeDiff = today.getTime() - firstViewDate.getTime();
      if (this.option('type') === 'workWeek') {
        timeDiff = timeDiff - this._getWeekendsCount(Math.round(timeDiff / toMs('day'))) * toMs('day');
      }
      return Math.ceil((timeDiff + 1) / toMs('day'));
    };
    _proto.getIndicationHeight = function getIndicationHeight() {
      var today = _utils.default.getDateWithoutTimezoneChange(this._getToday());
      var cellHeight = this.getCellHeight();
      var date = new Date(this.getStartViewDate());
      if (this.isIndicationOnView()) {
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      }
      var duration = today.getTime() - date.getTime();
      var cellCount = duration / this.getCellDuration();
      return cellCount * cellHeight;
    };
    _proto._dispose = function _dispose() {
      this._clearIndicatorUpdateInterval();
      _SchedulerWorkSpace.prototype._dispose.apply(this, arguments);
    };
    _proto._refreshDateTimeIndication = function _refreshDateTimeIndication() {
      var _this$_shader;
      this._cleanDateTimeIndicator();
      this._cleanCurrentTimeCells();
      (_this$_shader = this._shader) === null || _this$_shader === void 0 ? void 0 : _this$_shader.clean();
      this._renderDateTimeIndication();
    };
    _proto._setCurrentTimeCells = function _setCurrentTimeCells() {
      var timePanelCells = this._getTimePanelCells();
      var currentTimeCellIndices = this._getCurrentTimePanelCellIndices();
      currentTimeCellIndices.forEach(function (timePanelCellIndex) {
        timePanelCells.eq(timePanelCellIndex).addClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS);
      });
    };
    _proto._isCurrentTimeHeaderCell = function _isCurrentTimeHeaderCell(headerIndex) {
      if (this.isIndicationOnView()) {
        var completeDateHeaderMap = this.viewDataProvider.completeDateHeaderMap;
        var date = completeDateHeaderMap[completeDateHeaderMap.length - 1][headerIndex].startDate;
        return _date.default.sameDate(date, this._getToday());
      }
      return false;
    };
    _proto._getHeaderPanelCellClass = function _getHeaderPanelCellClass(i) {
      var cellClass = _SchedulerWorkSpace.prototype._getHeaderPanelCellClass.call(this, i);
      if (this._isCurrentTimeHeaderCell(i)) {
        return cellClass + ' ' + _classes.HEADER_CURRENT_TIME_CELL_CLASS;
      }
      return cellClass;
    };
    _proto._cleanView = function _cleanView() {
      _SchedulerWorkSpace.prototype._cleanView.call(this);
      this._cleanDateTimeIndicator();
    };
    _proto._dimensionChanged = function _dimensionChanged() {
      _SchedulerWorkSpace.prototype._dimensionChanged.call(this);
      this._refreshDateTimeIndication();
    };
    _proto._cleanDateTimeIndicator = function _cleanDateTimeIndicator() {
      this.$element().find('.' + SCHEDULER_DATE_TIME_INDICATOR_CLASS).remove();
    };
    _proto._cleanCurrentTimeCells = function _cleanCurrentTimeCells() {
      this.$element().find(".".concat(TIME_PANEL_CURRENT_TIME_CELL_CLASS)).removeClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS);
    };
    _proto._cleanWorkSpace = function _cleanWorkSpace() {
      _SchedulerWorkSpace.prototype._cleanWorkSpace.call(this);
      this._renderDateTimeIndication();
      this._setIndicationUpdateInterval();
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'showCurrentTimeIndicator':
        case 'indicatorTime':
          this._cleanWorkSpace();
          break;
        case 'indicatorUpdateInterval':
          this._setIndicationUpdateInterval();
          break;
        case 'showAllDayPanel':
          _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
          this._refreshDateTimeIndication();
          break;
        case 'allDayExpanded':
          _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
          this._refreshDateTimeIndication();
          break;
        case 'crossScrollingEnabled':
          _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
          this._refreshDateTimeIndication();
          break;
        case 'shadeUntilCurrentTime':
          this._refreshDateTimeIndication();
          break;
        default:
          _SchedulerWorkSpace.prototype._optionChanged.call(this, args);
      }
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_SchedulerWorkSpace.prototype._getDefaultOptions.call(this), {
        showCurrentTimeIndicator: true,
        indicatorTime: new Date(),
        indicatorUpdateInterval: 5 * toMs('minute'),
        shadeUntilCurrentTime: true
      });
    };
    _proto._getCurrentTimePanelCellIndices = function _getCurrentTimePanelCellIndices() {
      var rowCountPerGroup = this._getTimePanelRowCount();
      var today = this._getToday();
      var index = this.getCellIndexByDate(today);
      var _this$_getCellCoordin = this._getCellCoordinatesByIndex(index),
          currentTimeRowIndex = _this$_getCellCoordin.rowIndex;
      if (currentTimeRowIndex === undefined) {
        return [];
      }
      var cellIndices;
      if (currentTimeRowIndex === 0) {
        cellIndices = [currentTimeRowIndex];
      } else {
        cellIndices = currentTimeRowIndex % 2 === 0 ? [currentTimeRowIndex - 1, currentTimeRowIndex] : [currentTimeRowIndex, currentTimeRowIndex + 1];
      }
      var verticalGroupCount = this._isVerticalGroupedWorkSpace() ? this._getGroupCount() : 1;
      return _toConsumableArray(new Array(verticalGroupCount)).reduce(function (currentIndices, _, groupIndex) {
        return [].concat(_toConsumableArray(currentIndices), _toConsumableArray(cellIndices.map(function (cellIndex) {
          return rowCountPerGroup * groupIndex + cellIndex;
        })));
      }, []);
    };
    return SchedulerWorkSpaceIndicator;
  }(_uiScheduler.default);
  (0, _component_registrator.default)('dxSchedulerWorkSpace', SchedulerWorkSpaceIndicator);
  var _default = SchedulerWorkSpaceIndicator;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","./ui.scheduler.work_space","../../../core/component_registrator","../../../core/utils/date","../../../core/utils/extend","../../../core/utils/position","../../../core/utils/window","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../utils.timeZone"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("./ui.scheduler.work_space"), require("../../../core/component_registrator"), require("../../../core/utils/date"), require("../../../core/utils/extend"), require("../../../core/utils/position"), require("../../../core/utils/window"), require("../classes"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../utils.timeZone"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.work_space.indicator.js.map