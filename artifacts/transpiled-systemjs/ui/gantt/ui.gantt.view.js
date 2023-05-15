!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/gantt/ui.gantt.view.js"], ["../../core/renderer","../widget/ui.widget","./gantt_importer","./ui.gantt.task.area.container","../../localization/date","../../core/utils/type","../../localization/message","../../core/utils/string","../../localization/core"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/gantt/ui.gantt.view.js", ["../../core/renderer", "../widget/ui.widget", "./gantt_importer", "./ui.gantt.task.area.container", "../../localization/date", "../../core/utils/type", "../../localization/message", "../../core/utils/string", "../../localization/core"], true, function ($__require, exports, module) {
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
  exports.GanttView = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _gantt_importer = $__require("./gantt_importer");
  var _uiGanttTaskArea = $__require("./ui.gantt.task.area.container");
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _string = $__require("../../core/utils/string");
  var _core = _interopRequireDefault($__require("../../localization/core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var GanttView = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(GanttView, _Widget);
    function GanttView() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = GanttView.prototype;
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this._onSelectionChanged = this._createActionByOption('onSelectionChanged');
      this._onScroll = this._createActionByOption('onScroll');
      this._onDialogShowing = this._createActionByOption('onDialogShowing');
      this._onPopupMenuShowing = this._createActionByOption('onPopupMenuShowing');
      this._onPopupMenuHiding = this._createActionByOption('onPopupMenuHiding');
      this._expandAll = this._createActionByOption('onExpandAll');
      this._collapseAll = this._createActionByOption('onCollapseAll');
      this._taskClick = this._createActionByOption('onTaskClick');
      this._taskDblClick = this._createActionByOption('onTaskDblClick');
      this._onAdjustControl = this._createActionByOption('onAdjustControl');
    };
    _proto._initMarkup = function _initMarkup() {
      var _GanttView = (0, _gantt_importer.getGanttViewCore)();
      this._ganttViewCore = new _GanttView(this.$element().get(0), this, {
        showResources: this.option('showResources'),
        showDependencies: this.option('showDependencies'),
        taskTitlePosition: this._getTaskTitlePosition(this.option('taskTitlePosition')),
        firstDayOfWeek: this._getFirstDayOfWeek(this.option('firstDayOfWeek')),
        allowSelectTask: this.option('allowSelection'),
        startDateRange: this.option('startDateRange'),
        endDateRange: this.option('endDateRange'),
        editing: this._parseEditingSettings(this.option('editing')),
        validation: this.option('validation'),
        stripLines: {
          stripLines: this.option('stripLines')
        },
        areHorizontalBordersEnabled: this.option('showRowLines'),
        areAlternateRowsEnabled: false,
        viewType: this._getViewTypeByScaleType(this.option('scaleType')),
        viewTypeRange: this._parseViewTypeRangeSettings(this.option('scaleTypeRange')),
        cultureInfo: this._getCultureInfo(),
        taskTooltipContentTemplate: this.option('taskTooltipContentTemplate'),
        taskProgressTooltipContentTemplate: this.option('taskProgressTooltipContentTemplate'),
        taskTimeTooltipContentTemplate: this.option('taskTimeTooltipContentTemplate'),
        taskContentTemplate: this.option('taskContentTemplate'),
        sieve: this.option('sieve')
      });
      this._selectTask(this.option('selectedRowKey'));
      this.updateBarItemsState();
    };
    _proto._getFirstDayOfWeek = function _getFirstDayOfWeek(value) {
      return (0, _type.isDefined)(value) ? value : _date.default.firstDayOfWeekIndex();
    };
    _proto.getTaskAreaContainer = function getTaskAreaContainer() {
      return this._ganttViewCore.getTaskAreaContainer();
    };
    _proto.getBarManager = function getBarManager() {
      return this._ganttViewCore.barManager;
    };
    _proto.executeCoreCommand = function executeCoreCommand(id) {
      var command = this._ganttViewCore.getCommandByKey(id);
      if (command) {
        command.execute();
      }
    };
    _proto.changeTaskExpanded = function changeTaskExpanded(id, value) {
      this._ganttViewCore.changeTaskExpanded(id, value);
    };
    _proto.updateView = function updateView() {
      var _this$_ganttViewCore;
      (_this$_ganttViewCore = this._ganttViewCore) === null || _this$_ganttViewCore === void 0 ? void 0 : _this$_ganttViewCore.updateView();
    };
    _proto.updateBarItemsState = function updateBarItemsState() {
      this._ganttViewCore.barManager.updateItemsState([]);
    };
    _proto.setWidth = function setWidth(value) {
      this._ganttViewCore.setWidth(value);
    };
    _proto._onDimensionChanged = function _onDimensionChanged() {
      this._ganttViewCore.onBrowserWindowResize();
    };
    _proto._selectTask = function _selectTask(id) {
      this._ganttViewCore.selectTaskById(id);
    };
    _proto._update = function _update(keepExpandState) {
      var _this$_ganttViewCore2;
      (_this$_ganttViewCore2 = this._ganttViewCore) === null || _this$_ganttViewCore2 === void 0 ? void 0 : _this$_ganttViewCore2.updateWithDataReload(keepExpandState);
    };
    _proto._getCultureInfo = function _getCultureInfo() {
      return {
        monthNames: _date.default.getMonthNames('wide'),
        dayNames: _date.default.getDayNames('wide'),
        abbrMonthNames: _date.default.getMonthNames('abbreviated'),
        abbrDayNames: _date.default.getDayNames('abbreviated'),
        quarterNames: this._getQuarterNames(),
        amText: this._getAmText(),
        pmText: this._getPmText(),
        start: _message.default.format('dxGantt-dialogStartTitle'),
        end: _message.default.format('dxGantt-dialogEndTitle'),
        progress: _message.default.format('dxGantt-dialogProgressTitle')
      };
    };
    _proto._getAmText = function _getAmText() {
      return this._hasAmPM() ? _date.default.getPeriodNames()[0] : '';
    };
    _proto._getPmText = function _getPmText() {
      return this._hasAmPM() ? _date.default.getPeriodNames()[1] : '';
    };
    _proto._hasAmPM = function _hasAmPM() {
      var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
      var dateString = date.toLocaleTimeString(_core.default.locale());
      return dateString.match(/am|pm/i) || date.toString().match(/am|pm/i);
    };
    _proto._getQuarterNames = function _getQuarterNames() {
      var quarterFormat = _message.default.format('dxGantt-quarter');
      if (!quarterFormat) {
        return _date.default.getQuarterNames();
      }
      return [(0, _string.format)(quarterFormat, 1), (0, _string.format)(quarterFormat, 2), (0, _string.format)(quarterFormat, 3), (0, _string.format)(quarterFormat, 4)];
    };
    _proto._getTaskTitlePosition = function _getTaskTitlePosition(value) {
      switch (value) {
        case 'outside':
          return 1;
        case 'none':
          return 2;
        default:
          return 0;
      }
    };
    _proto._getViewTypeByScaleType = function _getViewTypeByScaleType(scaleType) {
      switch (scaleType) {
        case 'minutes':
          return 0;
        case 'hours':
          return 1;
        case 'sixHours':
          return 2;
        case 'days':
          return 3;
        case 'weeks':
          return 4;
        case 'months':
          return 5;
        case 'quarters':
          return 6;
        case 'years':
          return 7;
        default:
          return undefined;
      }
    };
    _proto._parseEditingSettings = function _parseEditingSettings(value) {
      return {
        enabled: value.enabled,
        allowDependencyDelete: value.allowDependencyDeleting,
        allowDependencyInsert: value.allowDependencyAdding,
        allowTaskDelete: value.allowTaskDeleting,
        allowTaskInsert: value.allowTaskAdding,
        allowTaskUpdate: value.allowTaskUpdating,
        allowResourceDelete: value.allowResourceDeleting,
        allowResourceInsert: value.allowResourceAdding,
        allowResourceUpdate: value.allowResourceUpdating,
        allowTaskResourceUpdate: value.allowTaskResourceUpdating
      };
    };
    _proto._parseViewTypeRangeSettings = function _parseViewTypeRangeSettings(value) {
      return {
        min: this._getViewTypeByScaleType(value.min),
        max: this._getViewTypeByScaleType(value.max)
      };
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'width':
          _Widget.prototype._optionChanged.call(this, args);
          this._ganttViewCore.setWidth(args.value);
          break;
        case 'height':
          this._ganttViewCore.setHeight(args.value);
          break;
        case 'tasks':
        case 'dependencies':
        case 'resources':
        case 'resourceAssignments':
          this._sieveOptions = undefined;
          this._update(true);
          break;
        case 'showResources':
          this._ganttViewCore.setShowResources(args.value);
          break;
        case 'showDependencies':
          this._ganttViewCore.setShowDependencies(args.value);
          break;
        case 'taskTitlePosition':
          this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(args.value));
          break;
        case 'firstDayOfWeek':
          this._ganttViewCore.setFirstDayOfWeek(this._getFirstDayOfWeek(args.value));
          break;
        case 'startDateRange':
          this._ganttViewCore.setStartDateRange(args.value);
          break;
        case 'endDateRange':
          this._ganttViewCore.setEndDateRange(args.value);
          break;
        case 'allowSelection':
          this._ganttViewCore.setAllowSelection(args.value);
          break;
        case 'selectedRowKey':
          this._selectTask(args.value);
          break;
        case 'editing':
          this._ganttViewCore.setEditingSettings(this._parseEditingSettings(args.value));
          break;
        case 'validation':
          this._ganttViewCore.setValidationSettings(args.value);
          this._update(true);
          break;
        case 'showRowLines':
          this._ganttViewCore.setRowLinesVisible(args.value);
          break;
        case 'scaleType':
          this._ganttViewCore.setViewType(this._getViewTypeByScaleType(args.value));
          break;
        case 'scaleTypeRange':
          this._ganttViewCore.setViewTypeRange(this._getViewTypeByScaleType(args.value.min), this._getViewTypeByScaleType(args.value.max));
          break;
        case 'stripLines':
          this._ganttViewCore.setStripLines({
            stripLines: args.value
          });
          break;
        case 'taskTooltipContentTemplate':
          this._ganttViewCore.setTaskTooltipContentTemplate(args.value);
          break;
        case 'taskProgressTooltipContentTemplate':
          this._ganttViewCore.setTaskProgressTooltipContentTemplate(args.value);
          break;
        case 'taskTimeTooltipContentTemplate':
          this._ganttViewCore.setTaskTimeTooltipContentTemplate(args.value);
          break;
        case 'taskContentTemplate':
          this._ganttViewCore.setTaskContentTemplate(args.value);
          break;
        case 'sieve':
          this._sortAndFilter(args.value);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    }

    // IGanttOwner
    ;
    _proto.getRowHeight = function getRowHeight() {
      return this.option('rowHeight');
    };
    _proto.getHeaderHeight = function getHeaderHeight() {
      return this.option('headerHeight');
    };
    _proto.getGanttTasksData = function getGanttTasksData() {
      var tasks = this.option('tasks');
      var sieveOptions = this.getSieveOptions();
      if (sieveOptions !== null && sieveOptions !== void 0 && sieveOptions.sievedItems && sieveOptions !== null && sieveOptions !== void 0 && sieveOptions.sieveColumn) {
        return sieveOptions.sievedItems;
      }
      return tasks;
    };
    _proto._sortAndFilter = function _sortAndFilter(args) {
      this._sieveOptions = args;
      this._update(!(args !== null && args !== void 0 && args.expandTasks));
      var selectedRowKey = this.option('selectedRowKey');
      this._selectTask(selectedRowKey);
    };
    _proto.getSieveOptions = function getSieveOptions() {
      return this._sieveOptions;
    };
    _proto.getGanttDependenciesData = function getGanttDependenciesData() {
      return this.option('dependencies');
    };
    _proto.getGanttResourcesData = function getGanttResourcesData() {
      return this.option('resources');
    };
    _proto.getGanttResourceAssignmentsData = function getGanttResourceAssignmentsData() {
      return this.option('resourceAssignments');
    };
    _proto.getGanttWorkTimeRules = function getGanttWorkTimeRules() {
      return null;
    };
    _proto.getExternalTaskAreaContainer = function getExternalTaskAreaContainer(element) {
      if (!this._taskAreaContainer) {
        this._taskAreaContainer = new _uiGanttTaskArea.TaskAreaContainer(element, this);
      }
      return this._taskAreaContainer;
    };
    _proto.prepareExternalTaskAreaContainer = function prepareExternalTaskAreaContainer(element, info) {
      if (info !== null && info !== void 0 && info.height) {
        this._taskAreaContainer._scrollView.option('height', info.height);
      }
    };
    _proto.changeGanttTaskSelection = function changeGanttTaskSelection(id, selected) {
      this._onSelectionChanged({
        id: id,
        selected: selected
      });
    };
    _proto.onGanttScroll = function onGanttScroll(scrollTop) {
      this._onScroll({
        scrollTop: scrollTop
      });
    };
    _proto.showDialog = function showDialog(name, parameters, callback, afterClosing) {
      this._onDialogShowing({
        name: name,
        parameters: parameters,
        callback: callback,
        afterClosing: afterClosing
      });
    };
    _proto.getModelChangesListener = function getModelChangesListener() {
      return this.option('modelChangesListener');
    };
    _proto.getExportInfo = function getExportInfo() {
      return this.option('exportInfo');
    };
    _proto.showPopupMenu = function showPopupMenu(info) {
      this._onPopupMenuShowing(info);
    };
    _proto.hidePopupMenu = function hidePopupMenu(info) {
      this._onPopupMenuHiding(info);
    };
    _proto.getMainElement = function getMainElement() {
      return this.option('mainElement').get(0);
    };
    _proto.adjustControl = function adjustControl() {
      this._onAdjustControl();
    };
    _proto.getRequireFirstLoadParentAutoCalc = function getRequireFirstLoadParentAutoCalc() {
      return this.option('validation.autoUpdateParentTasks');
    };
    _proto.collapseAll = function collapseAll() {
      this._collapseAll();
    };
    _proto.expandAll = function expandAll() {
      this._expandAll();
    };
    _proto.onTaskClick = function onTaskClick(key, event) {
      this._taskClick({
        key: key,
        event: event
      });
      return true;
    };
    _proto.onTaskDblClick = function onTaskDblClick(key, event) {
      return this._taskDblClick({
        key: key,
        event: event
      });
    };
    _proto.onGanttViewContextMenu = function onGanttViewContextMenu(event, key, type) {
      return true;
    };
    _proto.getFormattedDateText = function getFormattedDateText(date) {
      var result = '';
      if (date) {
        var datePart = _date.default.format(date, 'shortDate');
        var timeFormat = this._hasAmPM() ? 'hh:mm a' : 'HH:mm';
        var timePart = _date.default.format(date, timeFormat);
        result = datePart + ' ' + timePart;
      }
      return result;
    };
    _proto.destroyTemplate = function destroyTemplate(container) {
      (0, _renderer.default)(container).empty();
    };
    _proto.onTaskAreaSizeChanged = function onTaskAreaSizeChanged(info) {
      var scrollView = this._taskAreaContainer._scrollView;
      if ((0, _type.isDefined)(info === null || info === void 0 ? void 0 : info.height)) {
        var direction = (info === null || info === void 0 ? void 0 : info.height) > this._taskAreaContainer.getHeight() ? 'both' : 'horizontal';
        scrollView.option('direction', direction);
      }
    }
    // export
    ;
    _proto.getTreeListTableStyle = function getTreeListTableStyle() {
      return this.callExportHelperMethod('getTreeListTableStyle');
    };
    _proto.getTreeListColCount = function getTreeListColCount() {
      return this.callExportHelperMethod('getTreeListColCount');
    };
    _proto.getTreeListHeaderInfo = function getTreeListHeaderInfo(colIndex) {
      return this.callExportHelperMethod('getTreeListHeaderInfo', colIndex);
    };
    _proto.getTreeListCellInfo = function getTreeListCellInfo(rowIndex, colIndex, key) {
      return this.callExportHelperMethod('getTreeListCellInfo', key, colIndex);
    };
    _proto.getTreeListEmptyDataCellInfo = function getTreeListEmptyDataCellInfo() {
      return this.callExportHelperMethod('getTreeListEmptyDataCellInfo');
    };
    _proto.callExportHelperMethod = function callExportHelperMethod(methodName) {
      var helper = this.option('exportHelper');
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return helper[methodName].apply(helper, args);
    };
    _proto.applyTasksExpandedState = function applyTasksExpandedState(state) {
      var _this$_ganttViewCore3;
      (_this$_ganttViewCore3 = this._ganttViewCore) === null || _this$_ganttViewCore3 === void 0 ? void 0 : _this$_ganttViewCore3.applyTasksExpandedState(state);
    };
    _createClass(GanttView, [{
      key: "bars",
      get: function get() {
        return this.option('bars');
      }
    }]);
    return GanttView;
  }(_ui.default);
  exports.GanttView = GanttView;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../widget/ui.widget","./gantt_importer","./ui.gantt.task.area.container","../../localization/date","../../core/utils/type","../../localization/message","../../core/utils/string","../../localization/core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../widget/ui.widget"), require("./gantt_importer"), require("./ui.gantt.task.area.container"), require("../../localization/date"), require("../../core/utils/type"), require("../../localization/message"), require("../../core/utils/string"), require("../../localization/core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.gantt.view.js.map