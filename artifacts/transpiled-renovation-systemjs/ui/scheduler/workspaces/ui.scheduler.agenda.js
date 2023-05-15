!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.agenda.js"], ["../../../core/utils/size","../../../core/renderer","../../../core/dom_adapter","../../../core/utils/common","../../../core/utils/iterator","../../../core/element","../../../core/component_registrator","./ui.scheduler.work_space","../../../core/utils/extend","../../../localization/date","../table_creator","../classes","../resources/utils","../../../renovation/ui/scheduler/view_model/to_test/views/utils/agenda","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../constants","../../../core/utils/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.agenda.js", ["../../../core/utils/size", "../../../core/renderer", "../../../core/dom_adapter", "../../../core/utils/common", "../../../core/utils/iterator", "../../../core/element", "../../../core/component_registrator", "./ui.scheduler.work_space", "../../../core/utils/extend", "../../../localization/date", "../table_creator", "../classes", "../resources/utils", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/agenda", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../constants", "../../../core/utils/date"], true, function ($__require, exports, module) {
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
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../../core/dom_adapter"));
  var _common = $__require("../../../core/utils/common");
  var _iterator = $__require("../../../core/utils/iterator");
  var _element = $__require("../../../core/element");
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _uiScheduler = _interopRequireDefault($__require("./ui.scheduler.work_space"));
  var _extend = $__require("../../../core/utils/extend");
  var _date = _interopRequireDefault($__require("../../../localization/date"));
  var _table_creator = _interopRequireDefault($__require("../table_creator"));
  var _classes = $__require("../classes");
  var _utils = $__require("../resources/utils");
  var _agenda = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/agenda");
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _constants = $__require("../constants");
  var _date2 = _interopRequireDefault($__require("../../../core/utils/date"));
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
  var tableCreator = _table_creator.default.tableCreator;
  var AGENDA_CLASS = 'dx-scheduler-agenda';
  var AGENDA_DATE_CLASS = 'dx-scheduler-agenda-date';
  var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
  var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
  var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
  var NODATA_CONTAINER_CLASS = 'dx-scheduler-agenda-nodata';
  var LAST_ROW_CLASS = 'dx-scheduler-date-table-last-row';
  var INNER_CELL_MARGIN = 5;
  var OUTER_CELL_MARGIN = 20;
  var SchedulerAgenda = /*#__PURE__*/function (_WorkSpace) {
    _inheritsLoose(SchedulerAgenda, _WorkSpace);
    function SchedulerAgenda() {
      return _WorkSpace.apply(this, arguments) || this;
    }
    var _proto = SchedulerAgenda.prototype;
    _proto.getStartViewDate = function getStartViewDate() {
      return this._startViewDate;
    };
    _proto._init = function _init() {
      _WorkSpace.prototype._init.call(this);
      this._activeStateUnit = undefined;
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_WorkSpace.prototype._getDefaultOptions.call(this), {
        // Number | "month"
        agendaDuration: 7,
        rowHeight: 60,
        noDataText: ''
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      var value = args.value;
      switch (name) {
        case 'agendaDuration':
          break;
        case 'noDataText':
        case 'rowHeight':
          this._recalculateAgenda(this._rows);
          break;
        case 'groups':
          if (!value || !value.length) {
            if (this._$groupTable) {
              this._$groupTable.remove();
              this._$groupTable = null;
              this._detachGroupCountClass();
            }
          } else {
            if (!this._$groupTable) {
              this._initGroupTable();
              this._dateTableScrollable.$content().prepend(this._$groupTable);
            }
          }
          _WorkSpace.prototype._optionChanged.call(this, args);
          break;
        default:
          _WorkSpace.prototype._optionChanged.call(this, args);
      }
    };
    _proto._renderFocusState = function _renderFocusState() {
      return (0, _common.noop)();
    };
    _proto._renderFocusTarget = function _renderFocusTarget() {
      return (0, _common.noop)();
    };
    _proto._cleanFocusState = function _cleanFocusState() {
      return (0, _common.noop)();
    };
    _proto.supportAllDayRow = function supportAllDayRow() {
      return false;
    };
    _proto._isVerticalGroupedWorkSpace = function _isVerticalGroupedWorkSpace() {
      return false;
    };
    _proto._getElementClass = function _getElementClass() {
      return AGENDA_CLASS;
    };
    _proto._calculateStartViewDate = function _calculateStartViewDate() {
      return (0, _agenda.calculateStartViewDate)(this.option('currentDate'), this.option('startDayHour'));
    };
    _proto._getRowCount = function _getRowCount() {
      return this.option('agendaDuration');
    };
    _proto._getCellCount = function _getCellCount() {
      return 1;
    };
    _proto._getTimePanelRowCount = function _getTimePanelRowCount() {
      return this.option('agendaDuration');
    };
    _proto._renderAllDayPanel = function _renderAllDayPanel() {
      return (0, _common.noop)();
    };
    _proto._toggleAllDayVisibility = function _toggleAllDayVisibility() {
      return (0, _common.noop)();
    };
    _proto._initWorkSpaceUnits = function _initWorkSpaceUnits() {
      this._initGroupTable();
      this._$timePanel = (0, _renderer.default)('<table>').addClass(_classes.TIME_PANEL_CLASS);
      this._$dateTable = (0, _renderer.default)('<table>').addClass(_classes.DATE_TABLE_CLASS);
      this._$dateTableScrollableContent = (0, _renderer.default)('<div>').addClass('dx-scheduler-date-table-scrollable-content');
      this._$dateTableContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-date-table-container');
    };
    _proto._initGroupTable = function _initGroupTable() {
      var groups = this.option('groups');
      if (groups && groups.length) {
        this._$groupTable = (0, _renderer.default)('<table>').addClass(GROUP_TABLE_CLASS);
      }
    };
    _proto._renderView = function _renderView() {
      this._startViewDate = this._calculateStartViewDate();
      this._rows = [];
      this._initPositionHelper();
    };
    _proto._recalculateAgenda = function _recalculateAgenda(rows) {
      var cellTemplates = [];
      this._cleanView();
      if (this._rowsIsEmpty(rows)) {
        this._renderNoData();
        return;
      }
      this._rows = rows;
      if (this._$groupTable) {
        cellTemplates = this._renderGroupHeader();
        this._setGroupHeaderCellsHeight();
      }
      this._renderTimePanel();
      this._renderDateTable();
      this.invoke('onAgendaReady', rows);
      this._applyCellTemplates(cellTemplates);
      this._dateTableScrollable.update();
    };
    _proto._renderNoData = function _renderNoData() {
      this._$noDataContainer = (0, _renderer.default)('<div>').addClass(NODATA_CONTAINER_CLASS).html(this.option('noDataText'));
      this._dateTableScrollable.$content().append(this._$noDataContainer);
    };
    _proto._setTableSizes = function _setTableSizes() {
      return (0, _common.noop)();
    };
    _proto._toggleHorizontalScrollClass = function _toggleHorizontalScrollClass() {
      return (0, _common.noop)();
    };
    _proto._createCrossScrollingConfig = function _createCrossScrollingConfig() {
      return (0, _common.noop)();
    };
    _proto._setGroupHeaderCellsHeight = function _setGroupHeaderCellsHeight() {
      var $cells = this._getGroupHeaderCells().filter(function (_, element) {
        return !element.getAttribute('rowSpan');
      });
      var rows = this._removeEmptyRows(this._rows);
      if (!rows.length) {
        return;
      }
      for (var i = 0; i < $cells.length; i++) {
        var $cellContent = $cells.eq(i).find('.dx-scheduler-group-header-content');
        (0, _size.setOuterHeight)($cellContent, this._getGroupRowHeight(rows[i]));
      }
    };
    _proto._rowsIsEmpty = function _rowsIsEmpty(rows) {
      var result = true;
      for (var i = 0; i < rows.length; i++) {
        var groupRow = rows[i];
        for (var j = 0; j < groupRow.length; j++) {
          if (groupRow[j]) {
            result = false;
            break;
          }
        }
      }
      return result;
    };
    _proto._attachGroupCountClass = function _attachGroupCountClass() {
      var className = (0, _base.getVerticalGroupCountClass)(this.option('groups'));
      this.$element().addClass(className);
    };
    _proto._removeEmptyRows = function _removeEmptyRows(rows) {
      var result = [];
      var isEmpty = function isEmpty(data) {
        return !data.some(function (value) {
          return value > 0;
        });
      };
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].length && !isEmpty(rows[i])) {
          result.push(rows[i]);
        }
      }
      return result;
    };
    _proto._getGroupHeaderContainer = function _getGroupHeaderContainer() {
      return this._$groupTable;
    };
    _proto._makeGroupRows = function _makeGroupRows() {
      var _this = this;
      var tree = (0, _utils.createReducedResourcesTree)(this.option('loadedResources'), function (field, action) {
        return (0, _utils.getDataAccessors)(_this.option('getResourceDataAccessors')(), field, action);
      }, this.option('getFilteredItems')());
      var cellTemplate = this.option('resourceCellTemplate');
      var getGroupHeaderContentClass = _classes.GROUP_HEADER_CONTENT_CLASS;
      var cellTemplates = [];
      var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, tree, {
        cellTag: 'th',
        groupTableClass: GROUP_TABLE_CLASS,
        groupRowClass: _classes.GROUP_ROW_CLASS,
        groupCellClass: this._getGroupHeaderClass(),
        groupCellCustomContent: function groupCellCustomContent(cell, cellText, index, data) {
          var container = _dom_adapter.default.createElement('div');
          var contentWrapper = _dom_adapter.default.createElement('div');
          container.className = getGroupHeaderContentClass;
          contentWrapper.appendChild(cellText);
          container.appendChild(contentWrapper);
          container.className = getGroupHeaderContentClass;
          if (cellTemplate && cellTemplate.render) {
            cellTemplates.push(cellTemplate.render.bind(cellTemplate, {
              model: {
                data: data.data,
                id: data.value,
                color: data.color,
                text: cellText.textContent
              },
              container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
              index: index
            }));
          } else {
            contentWrapper.appendChild(cellText);
            container.appendChild(contentWrapper);
          }
          cell.appendChild(container);
        },
        cellTemplate: cellTemplate
      });
      return {
        elements: (0, _renderer.default)(table).find(".".concat(_classes.GROUP_ROW_CLASS)),
        cellTemplates: cellTemplates
      };
    };
    _proto._cleanView = function _cleanView() {
      this._$dateTable.empty();
      this._$timePanel.empty();
      if (this._$groupTable) {
        this._$groupTable.empty();
      }
      if (this._$noDataContainer) {
        this._$noDataContainer.empty();
        this._$noDataContainer.remove();
        delete this._$noDataContainer;
      }
    };
    _proto._createWorkSpaceElements = function _createWorkSpaceElements() {
      this._createWorkSpaceStaticElements();
    };
    _proto._createWorkSpaceStaticElements = function _createWorkSpaceStaticElements() {
      this._$dateTableContainer.append(this._$dateTable);
      this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
      if (this._$groupTable) {
        this._$dateTableScrollableContent.prepend(this._$groupTable);
      }
      this._$dateTableScrollableContent.append(this._$timePanel, this._$dateTableContainer);
      this.$element().append(this._dateTableScrollable.$element());
    };
    _proto._renderDateTable = function _renderDateTable() {
      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$dateTable),
        rowClass: _classes.DATE_TABLE_ROW_CLASS,
        cellClass: this._getDateTableCellClass()
      });
    };
    _proto._attachTablesEvents = function _attachTablesEvents() {
      return (0, _common.noop)();
    };
    _proto._attachEvents = function _attachEvents() {
      return (0, _common.noop)();
    };
    _proto._cleanCellDataCache = function _cleanCellDataCache() {
      return (0, _common.noop)();
    };
    _proto.isIndicationAvailable = function isIndicationAvailable() {
      return false;
    };
    _proto._prepareCellTemplateOptions = function _prepareCellTemplateOptions(text, date, rowIndex, $cell) {
      var groupsOpt = this.option('groups');
      var groups = {};
      var isGroupedView = !!groupsOpt.length;
      var path = isGroupedView && (0, _utils.getPathToLeaf)(rowIndex, groupsOpt) || [];
      path.forEach(function (resourceValue, resourceIndex) {
        var resourceName = groupsOpt[resourceIndex].name;
        groups[resourceName] = resourceValue;
      });
      var groupIndex = isGroupedView ? this._getGroupIndexByResourceId(groups) : undefined;
      return {
        model: {
          text: text,
          date: date,
          groups: groups,
          groupIndex: groupIndex
        },
        container: (0, _element.getPublicElement)($cell),
        index: rowIndex
      };
    };
    _proto._renderTableBody = function _renderTableBody(options) {
      var cellTemplates = [];
      var cellTemplateOpt = options.cellTemplate;
      this._$rows = [];
      var i;
      var fillTableBody = function (rowIndex, rowSize) {
        if (rowSize) {
          var date;
          var cellDateNumber;
          var cellDayName;
          var $row = (0, _renderer.default)('<tr>');
          var $td = (0, _renderer.default)('<td>');
          (0, _size.setHeight)($td, this._getRowHeight(rowSize));
          if (options.getStartDate) {
            date = options.getStartDate && options.getStartDate(rowIndex);
            cellDateNumber = _date.default.format(date, 'd');
            cellDayName = _date.default.format(date, _base.formatWeekday);
          }
          if (cellTemplateOpt && cellTemplateOpt.render) {
            var templateOptions = this._prepareCellTemplateOptions(cellDateNumber + ' ' + cellDayName, date, i, $td);
            cellTemplates.push(cellTemplateOpt.render.bind(cellTemplateOpt, templateOptions));
          } else {
            if (cellDateNumber && cellDayName) {
              $td.addClass(AGENDA_DATE_CLASS).text(cellDateNumber + ' ' + cellDayName);
            }
          }
          if (options.rowClass) {
            $row.addClass(options.rowClass);
          }
          if (options.cellClass) {
            $td.addClass(options.cellClass);
          }
          $row.append($td);
          this._$rows.push($row);
        }
      }.bind(this);
      for (i = 0; i < this._rows.length; i++) {
        (0, _iterator.each)(this._rows[i], fillTableBody);
        this._setLastRowClass();
      }
      (0, _renderer.default)(options.container).append((0, _renderer.default)('<tbody>').append(this._$rows));
      this._applyCellTemplates(cellTemplates);
    };
    _proto._setLastRowClass = function _setLastRowClass() {
      if (this._rows.length > 1 && this._$rows.length) {
        var $lastRow = this._$rows[this._$rows.length - 1];
        $lastRow.addClass(LAST_ROW_CLASS);
      }
    };
    _proto._renderTimePanel = function _renderTimePanel() {
      this._renderTableBody({
        container: (0, _element.getPublicElement)(this._$timePanel),
        rowCount: this._getTimePanelRowCount(),
        cellCount: 1,
        rowClass: TIME_PANEL_ROW_CLASS,
        cellClass: TIME_PANEL_CELL_CLASS,
        cellTemplate: this.option('dateCellTemplate'),
        getStartDate: this._getTimePanelStartDate.bind(this)
      });
    };
    _proto._getTimePanelStartDate = function _getTimePanelStartDate(rowIndex) {
      var current = new Date(this.option('currentDate'));
      var cellDate = new Date(current.setDate(current.getDate() + rowIndex));
      return cellDate;
    };
    _proto._getRowHeight = function _getRowHeight(rowSize) {
      var baseHeight = this.option('rowHeight');
      var innerOffset = (rowSize - 1) * INNER_CELL_MARGIN;
      return rowSize ? baseHeight * rowSize + innerOffset + OUTER_CELL_MARGIN : 0;
    };
    _proto._getGroupRowHeight = function _getGroupRowHeight(groupRows) {
      // TODO: hotfix
      if (!groupRows) {
        return;
      }
      var result = 0;
      for (var i = 0; i < groupRows.length; i++) {
        result += this._getRowHeight(groupRows[i]);
      }
      return result;
    };
    _proto._calculateRows = function _calculateRows(appointments) {
      return this.renderingStrategy.calculateRows(appointments, this.option('agendaDuration'), this.option('currentDate'));
    };
    _proto.onDataSourceChanged = function onDataSourceChanged(appointments) {
      _WorkSpace.prototype.onDataSourceChanged.call(this);
      this._renderView();
      var rows = this._calculateRows(appointments);
      this._recalculateAgenda(rows);
    };
    _proto.getAgendaVerticalStepHeight = function getAgendaVerticalStepHeight() {
      return this.option('rowHeight');
    };
    _proto.getEndViewDate = function getEndViewDate() {
      var currentDate = new Date(this.option('currentDate'));
      var agendaDuration = this.option('agendaDuration');
      currentDate.setHours(this.option('endDayHour'));
      var result = currentDate.setDate(currentDate.getDate() + agendaDuration - 1) - 60000;
      return new Date(result);
    };
    _proto.getEndViewDateByEndDayHour = function getEndViewDateByEndDayHour() {
      return this.getEndViewDate();
    };
    _proto.getCellDataByCoordinates = function getCellDataByCoordinates() {
      return {
        startDate: null,
        endDate: null
      };
    };
    _proto.updateScrollPosition = function updateScrollPosition(date) {
      var newDate = this.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
      var bounds = this.getVisibleBounds();
      var startDateHour = newDate.getHours();
      var startDateMinutes = newDate.getMinutes();
      if (this.needUpdateScrollPosition(startDateHour, startDateMinutes, bounds, newDate)) {
        this.scrollToTime(startDateHour, startDateMinutes, newDate);
      }
    };
    _proto.needUpdateScrollPosition = function needUpdateScrollPosition(hours, minutes, bounds) {
      var isUpdateNeeded = false;
      if (hours < bounds.top.hours || hours > bounds.bottom.hours) {
        isUpdateNeeded = true;
      }
      if (hours === bounds.top.hours && minutes < bounds.top.minutes) {
        isUpdateNeeded = true;
      }
      if (hours === bounds.bottom.hours && minutes > bounds.top.minutes) {
        isUpdateNeeded = true;
      }
      return isUpdateNeeded;
    };
    _proto.renovatedRenderSupported = function renovatedRenderSupported() {
      return false;
    };
    _proto._setSelectedCellsByCellData = function _setSelectedCellsByCellData() {};
    _proto._getIntervalDuration = function _getIntervalDuration() {
      return _date2.default.dateToMilliseconds('day') * this.option('intervalCount');
    };
    _proto.getDOMElementsMetaData = function getDOMElementsMetaData() {
      return {
        dateTableCellsMeta: [[{}]],
        allDayPanelCellsMeta: [{}]
      };
    };
    _createClass(SchedulerAgenda, [{
      key: "type",
      get: function get() {
        return _constants.VIEWS.AGENDA;
      }
    }, {
      key: "renderingStrategy",
      get: function get() {
        return this.invoke('getLayoutManager').getRenderingStrategyInstance();
      }
    }, {
      key: "appointmentDataProvider",
      get: function get() {
        return this.option('getAppointmentDataProvider')();
      }
    }]);
    return SchedulerAgenda;
  }(_uiScheduler.default);
  (0, _component_registrator.default)('dxSchedulerAgenda', SchedulerAgenda);
  var _default = SchedulerAgenda;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../../../core/dom_adapter","../../../core/utils/common","../../../core/utils/iterator","../../../core/element","../../../core/component_registrator","./ui.scheduler.work_space","../../../core/utils/extend","../../../localization/date","../table_creator","../classes","../resources/utils","../../../renovation/ui/scheduler/view_model/to_test/views/utils/agenda","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../constants","../../../core/utils/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../../../core/dom_adapter"), require("../../../core/utils/common"), require("../../../core/utils/iterator"), require("../../../core/element"), require("../../../core/component_registrator"), require("./ui.scheduler.work_space"), require("../../../core/utils/extend"), require("../../../localization/date"), require("../table_creator"), require("../classes"), require("../resources/utils"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/agenda"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../constants"), require("../../../core/utils/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.agenda.js.map