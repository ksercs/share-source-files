/**
* DevExtreme (cjs/ui/gantt/ui.gantt.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _type = require("../../core/utils/type");
var _uiGantt = require("./ui.gantt.model_changes_listener");
var _uiGanttData = _interopRequireDefault(require("./ui.gantt.data.option"));
var _load_panel = _interopRequireDefault(require("../load_panel"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _splitter = _interopRequireDefault(require("../splitter"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiGantt2 = require("./ui.gantt.actions");
var _uiGantt3 = require("./ui.gantt.custom_fields");
var _uiGantt4 = require("./ui.gantt.dialogs");
var _uiGantt5 = require("./ui.gantt.export_helper");
var _uiGantt6 = require("./ui.gantt.helper");
var _uiGantt7 = require("./ui.gantt.mapping_helper");
var _uiGantt8 = require("./ui.gantt.size_helper");
var _uiGantt9 = require("./ui.gantt.templates");
var _uiGantt10 = require("./ui.gantt.bars");
var _uiGantt11 = require("./ui.gantt.treelist");
var _uiGantt12 = require("./ui.gantt.view");
var _uiGantt13 = require("./ui.gantt.data_changes_processing_helper");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var window = (0, _window.getWindow)();

// STYLE gantt
var GANTT_CLASS = 'dx-gantt';
var GANTT_VIEW_CLASS = 'dx-gantt-view';
var GANTT_TREE_LIST_WRAPPER = 'dx-gantt-treelist-wrapper';
var GANTT_TOOLBAR_WRAPPER = 'dx-gantt-toolbar-wrapper';
var GANTT_MAIN_WRAPPER = 'dx-gantt-main-wrapper';
var GANTT_TASKS = 'tasks';
var GANTT_DEPENDENCIES = 'dependencies';
var GANTT_RESOURCES = 'resources';
var GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
var GANTT_NEW_TASK_CACHE_KEY = 'gantt_new_task_key';
var Gantt = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(Gantt, _Widget);
  function Gantt() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = Gantt.prototype;
  _proto._init = function _init() {
    _Widget.prototype._init.call(this);
    _uiGrid_core.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    this._initGantt();
    this._isGanttRendered = false;
    this._initHelpers();
  };
  _proto._initGantt = function _initGantt() {
    this._refreshDataSources();
  };
  _proto._initMarkup = function _initMarkup() {
    _Widget.prototype._initMarkup.call(this);
    this.$element().addClass(GANTT_CLASS);
    this._$toolbarWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
    this._$toolbar = (0, _renderer.default)('<div>').appendTo(this._$toolbarWrapper);
    this._$mainWrapper = (0, _renderer.default)('<div>').addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
    this._$treeListWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
    this._$treeList = (0, _renderer.default)('<div>').appendTo(this._$treeListWrapper);
    this._$splitter = (0, _renderer.default)('<div>').appendTo(this._$mainWrapper);
    this._$ganttView = (0, _renderer.default)('<div>').addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
    this._$dialog = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._$loadPanel = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._$contextMenu = (0, _renderer.default)('<div>').appendTo(this.$element());
  };
  _proto._clean = function _clean() {
    var _this$_ganttView;
    (_this$_ganttView = this._ganttView) === null || _this$_ganttView === void 0 ? void 0 : _this$_ganttView._ganttViewCore.cleanMarkup();
    delete this._ganttView;
    delete this._dialogInstance;
    delete this._loadPanel;
    delete this._exportHelper;
    _Widget.prototype._clean.call(this);
  };
  _proto._refresh = function _refresh() {
    this._isGanttRendered = false;
    this._contentReadyRaised = false;
    _Widget.prototype._refresh.call(this);
  };
  _proto._fireContentReadyAction = function _fireContentReadyAction() {
    if (!this._contentReadyRaised) {
      _Widget.prototype._fireContentReadyAction.call(this);
    }
    this._contentReadyRaised = true;
  };
  _proto._dimensionChanged = function _dimensionChanged() {
    var _this$_ganttView2;
    (_this$_ganttView2 = this._ganttView) === null || _this$_ganttView2 === void 0 ? void 0 : _this$_ganttView2._onDimensionChanged();
  };
  _proto._visibilityChanged = function _visibilityChanged(visible) {
    if (visible) {
      this._refreshGantt();
    }
  };
  _proto._refreshGantt = function _refreshGantt() {
    this._refreshDataSources();
    this._refresh();
  };
  _proto._refreshDataSources = function _refreshDataSources() {
    this._refreshDataSource(GANTT_TASKS);
    this._refreshDataSource(GANTT_DEPENDENCIES);
    this._refreshDataSource(GANTT_RESOURCES);
    this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
  };
  _proto._renderContent = function _renderContent() {
    this._isMainElementVisible = this.$element().is(':visible');
    if (this._isMainElementVisible && !this._isGanttRendered) {
      this._isGanttRendered = true;
      this._renderBars();
      this._renderTreeList();
      this._renderSplitter();
    }
  };
  _proto._renderTreeList = function _renderTreeList() {
    this._ganttTreeList = new _uiGantt11.GanttTreeList(this);
    this._treeList = this._ganttTreeList.getTreeList();
    this._ganttTreeList.onAfterTreeListCreate();
  };
  _proto._renderSplitter = function _renderSplitter() {
    var _this = this;
    this._splitter = this._createComponent(this._$splitter, _splitter.default, {
      container: this.$element(),
      leftElement: this._$treeListWrapper,
      rightElement: this._$ganttView,
      onApplyPanelSize: function onApplyPanelSize(e) {
        _this._sizeHelper.onApplyPanelSize(e);
      }
    });
    this._splitter.option('initialLeftPanelWidth', this.option('taskListWidth'));
  };
  _proto._renderBars = function _renderBars() {
    this._bars = [];
    this._toolbar = new _uiGantt10.GanttToolbar(this._$toolbar, this);
    this._updateToolbarContent();
    this._bars.push(this._toolbar);
    this._contextMenuBar = new _uiGantt10.GanttContextMenuBar(this._$contextMenu, this);
    this._updateContextMenu();
    this._bars.push(this._contextMenuBar);
  };
  _proto._initHelpers = function _initHelpers() {
    this._mappingHelper = new _uiGantt7.GanttMappingHelper(this);
    this._customFieldsManager = new _uiGantt3.GanttCustomFieldsManager(this);
    this._actionsManager = new _uiGantt2.GanttActionsManager(this);
    this._ganttTemplatesManager = new _uiGantt9.GanttTemplatesManager(this);
    this._sizeHelper = new _uiGantt8.GanttSizeHelper(this);
    this._dataProcessingHelper = new _uiGantt13.GanttDataChangesProcessingHelper();
  };
  _proto._initGanttView = function _initGanttView() {
    var _this2 = this;
    if (this._ganttView) {
      return;
    }
    this._ganttView = this._createComponent(this._$ganttView, _uiGantt12.GanttView, {
      width: '100%',
      height: this._ganttTreeList.getOffsetHeight(),
      rowHeight: this._ganttTreeList.getRowHeight(),
      headerHeight: this._ganttTreeList.getHeaderHeight(),
      tasks: this._tasks,
      dependencies: this._dependencies,
      resources: this._resources,
      resourceAssignments: this._resourceAssignments,
      allowSelection: this.option('allowSelection'),
      selectedRowKey: this.option('selectedRowKey'),
      showResources: this.option('showResources'),
      showDependencies: this.option('showDependencies'),
      startDateRange: this.option('startDateRange'),
      endDateRange: this.option('endDateRange'),
      taskTitlePosition: this.option('taskTitlePosition'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      showRowLines: this.option('showRowLines'),
      scaleType: this.option('scaleType'),
      scaleTypeRange: this.option('scaleTypeRange'),
      editing: this.option('editing'),
      validation: this.option('validation'),
      stripLines: this.option('stripLines'),
      bars: this._bars,
      mainElement: this.$element(),
      onSelectionChanged: function onSelectionChanged(e) {
        _this2._ganttTreeList.selectRows(_uiGantt6.GanttHelper.getArrayFromOneElement(e.id));
      },
      onViewTypeChanged: function onViewTypeChanged(e) {
        _this2._onViewTypeChanged(e.type);
      },
      onScroll: function onScroll(e) {
        _this2._ganttTreeList.scrollBy(e.scrollTop);
      },
      onDialogShowing: this._showDialog.bind(this),
      onPopupMenuShowing: this._showPopupMenu.bind(this),
      onPopupMenuHiding: this._hidePopupMenu.bind(this),
      onExpandAll: this._expandAll.bind(this),
      onCollapseAll: this._collapseAll.bind(this),
      modelChangesListener: _uiGantt.ModelChangesListener.create(this),
      exportHelper: this._getExportHelper(),
      taskTooltipContentTemplate: this._ganttTemplatesManager.getTaskTooltipContentTemplateFunc(this.option('taskTooltipContentTemplate')),
      taskProgressTooltipContentTemplate: this._ganttTemplatesManager.getTaskProgressTooltipContentTemplateFunc(this.option('taskProgressTooltipContentTemplate')),
      taskTimeTooltipContentTemplate: this._ganttTemplatesManager.getTaskTimeTooltipContentTemplateFunc(this.option('taskTimeTooltipContentTemplate')),
      taskContentTemplate: this._ganttTemplatesManager.getTaskContentTemplateFunc(this.option('taskContentTemplate')),
      onTaskClick: function onTaskClick(e) {
        _this2._ganttTreeList.onRowClick(e);
      },
      onTaskDblClick: function onTaskDblClick(e) {
        _this2._ganttTreeList.onRowDblClick(e);
      },
      onAdjustControl: function onAdjustControl() {
        _this2._sizeHelper.onAdjustControl();
      },
      onContentReady: this._onGanttViewContentReady.bind(this)
    });
  };
  _proto._onGanttViewContentReady = function _onGanttViewContentReady(e) {
    if (!this._isParentAutoUpdateMode()) {
      this._fireContentReadyAction();
    }
  };
  _proto._isParentAutoUpdateMode = function _isParentAutoUpdateMode() {
    return this.option('validation.autoUpdateParentTasks');
  };
  _proto._onTreeListContentReady = function _onTreeListContentReady(e) {
    if (this._isParentAutoUpdateMode() && this._treeListParentRecalculatedDataUpdating) {
      this._fireContentReadyAction();
    }
    delete this._treeListParentRecalculatedDataUpdating;
    this._dataProcessingHelper.onTreeListReady();
  };
  _proto._onViewTypeChanged = function _onViewTypeChanged(type) {
    this.option('scaleType', this._actionsManager._getScaleType(type));
  };
  _proto._refreshDataSource = function _refreshDataSource(name) {
    var _this3 = this;
    var dataOption = this["_".concat(name, "Option")];
    if (dataOption) {
      dataOption.dispose();
      delete this["_".concat(name, "Option")];
      delete this["_".concat(name)];
    }
    dataOption = new _uiGanttData.default(name, this._getLoadPanel.bind(this), function (name, data) {
      _this3._dataSourceChanged(name, data);
    });
    dataOption.option('dataSource', this._getSpecificDataSourceOption(name));
    dataOption._refreshDataSource();
    this["_".concat(name, "Option")] = dataOption;
  };
  _proto._getSpecificDataSourceOption = function _getSpecificDataSourceOption(name) {
    var dataSource = this.option("".concat(name, ".dataSource"));
    if (!dataSource || Array.isArray(dataSource)) {
      return {
        store: {
          type: 'array',
          data: dataSource !== null && dataSource !== void 0 ? dataSource : [],
          key: this.option("".concat(name, ".keyExpr"))
        }
      };
    }
    return dataSource;
  };
  _proto._dataSourceChanged = function _dataSourceChanged(dataSourceName, data) {
    var getters = _uiGantt6.GanttHelper.compileGettersByOption(this.option(dataSourceName));
    var validatedData = this._validateSourceData(dataSourceName, data);
    var mappedData = validatedData.map(_uiGantt6.GanttHelper.prepareMapHandler(getters));
    this["_".concat(dataSourceName)] = mappedData;
    this._setGanttViewOption(dataSourceName, mappedData);
    if (dataSourceName === GANTT_TASKS) {
      var _this$_ganttTreeList, _this$_ganttTreeList2, _this$_ganttTreeList3;
      this._tasksRaw = validatedData;
      var forceUpdate = !((_this$_ganttTreeList = this._ganttTreeList) !== null && _this$_ganttTreeList !== void 0 && _this$_ganttTreeList.getDataSource()) && !this._ganttView;
      (_this$_ganttTreeList2 = this._ganttTreeList) === null || _this$_ganttTreeList2 === void 0 ? void 0 : _this$_ganttTreeList2.saveExpandedKeys();
      (_this$_ganttTreeList3 = this._ganttTreeList) === null || _this$_ganttTreeList3 === void 0 ? void 0 : _this$_ganttTreeList3.updateDataSource(validatedData, forceUpdate);
    }
  };
  _proto._validateSourceData = function _validateSourceData(dataSourceName, data) {
    return data && dataSourceName === GANTT_TASKS ? this._validateTaskData(data) : data;
  };
  _proto._validateTaskData = function _validateTaskData(data) {
    var _this$option;
    var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
    var parentIdGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".parentIdExpr")));
    var rootValue = (_this$option = this.option('rootValue')) !== null && _this$option !== void 0 ? _this$option : 'dx_dxt_gantt_default_root_value';
    var validationTree = {};
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item) {
        var _validationTree$key;
        var key = keyGetter(item);
        var isRootTask = key === rootValue;
        var treeItem = (_validationTree$key = validationTree[key]) !== null && _validationTree$key !== void 0 ? _validationTree$key : validationTree[key] = {
          key: key,
          children: []
        };
        if (!isRootTask) {
          var _parentIdGetter, _validationTree$paren;
          var parentId = (_parentIdGetter = parentIdGetter(item)) !== null && _parentIdGetter !== void 0 ? _parentIdGetter : rootValue;
          var parentTreeItem = (_validationTree$paren = validationTree[parentId]) !== null && _validationTree$paren !== void 0 ? _validationTree$paren : validationTree[parentId] = {
            key: parentId,
            children: []
          };
          parentTreeItem.children.push(treeItem);
          treeItem.parent = parentTreeItem;
        }
      }
    }
    var validKeys = [rootValue];
    this._appendChildKeys(validationTree[rootValue], validKeys);
    return data.filter(function (item) {
      return validKeys.indexOf(keyGetter(item)) > -1;
    });
  };
  _proto._appendChildKeys = function _appendChildKeys(treeItem, keys) {
    var children = treeItem === null || treeItem === void 0 ? void 0 : treeItem.children;
    for (var i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
      var child = children[i];
      keys.push(child.key);
      this._appendChildKeys(child, keys);
    }
  };
  _proto._onRecordInserted = function _onRecordInserted(optionName, record, callback) {
    var _this4 = this;
    var dataOption = this["_".concat(optionName, "Option")];
    if (dataOption) {
      var data = _uiGantt6.GanttHelper.getStoreObject(this.option(optionName), record);
      var isTaskInsert = optionName === GANTT_TASKS;
      if (isTaskInsert) {
        this._customFieldsManager.addCustomFieldsDataFromCache(GANTT_NEW_TASK_CACHE_KEY, data);
      }
      dataOption.insert(data, function (response) {
        var keyGetter = (0, _data.compileGetter)(_this4.option("".concat(optionName, ".keyExpr")));
        var insertedId = keyGetter(response);
        callback(insertedId);
        _this4._executeFuncSetters(optionName, record, insertedId);
        _this4._dataProcessingHelper.addCompletionAction(function () {
          _this4._actionsManager.raiseInsertedAction(optionName, data, insertedId);
        }, true, isTaskInsert);
        _this4._ganttTreeList.saveExpandedKeys();
        dataOption._reloadDataSource().done(function (data) {
          if (isTaskInsert) {
            _this4._ganttTreeList.onTaskInserted(insertedId, record.parentId);
          }
        });
      });
    }
  };
  _proto._onRecordUpdated = function _onRecordUpdated(optionName, key, values) {
    var _this5 = this;
    var dataOption = this["_".concat(optionName, "Option")];
    var isTaskUpdated = optionName === GANTT_TASKS;
    if (dataOption) {
      var data = this._mappingHelper.convertCoreToMappedData(optionName, values);
      var hasCustomFieldsData = isTaskUpdated && this._customFieldsManager.cache.hasData(key);
      if (hasCustomFieldsData) {
        this._customFieldsManager.addCustomFieldsDataFromCache(key, data);
      }
      dataOption.update(key, data, function () {
        _this5._executeFuncSetters(optionName, values, key);
        _this5._ganttTreeList.saveExpandedKeys();
        _this5._dataProcessingHelper.addCompletionAction(function () {
          _this5._actionsManager.raiseUpdatedAction(optionName, data, key);
        }, true, isTaskUpdated);
        dataOption._reloadDataSource();
      });
    }
  };
  _proto._onRecordRemoved = function _onRecordRemoved(optionName, key, data) {
    var _this6 = this;
    var dataOption = this["_".concat(optionName, "Option")];
    if (dataOption) {
      dataOption.remove(key, function () {
        _this6._ganttTreeList.saveExpandedKeys();
        _this6._dataProcessingHelper.addCompletionAction(function () {
          _this6._actionsManager.raiseDeletedAction(optionName, key, _this6._mappingHelper.convertCoreToMappedData(optionName, data));
        }, true, optionName === GANTT_TASKS);
        dataOption._reloadDataSource();
      });
    }
  };
  _proto._onParentTaskUpdated = function _onParentTaskUpdated(data) {
    var mappedData = this.getTaskDataByCoreData(data);
    this._actionsManager.raiseUpdatedAction(GANTT_TASKS, mappedData, data.id);
  };
  _proto._onParentTasksRecalculated = function _onParentTasksRecalculated(data) {
    var _this7 = this;
    if (!this.isSieving) {
      var setters = _uiGantt6.GanttHelper.compileSettersByOption(this.option(GANTT_TASKS));
      var treeDataSource = this._customFieldsManager.appendCustomFields(data.map(_uiGantt6.GanttHelper.prepareSetterMapHandler(setters)));
      // split threads for treelist filter|sort and datasource update (T1082108)
      setTimeout(function () {
        var _this7$_ganttTreeList;
        _this7._treeListParentRecalculatedDataUpdating = true;
        (_this7$_ganttTreeList = _this7._ganttTreeList) === null || _this7$_ganttTreeList === void 0 ? void 0 : _this7$_ganttTreeList.setDataSource(treeDataSource);
      });
    }
    this.isSieving = false;
  };
  _proto._onGanttViewCoreUpdated = function _onGanttViewCoreUpdated() {
    this._dataProcessingHelper.onGanttViewReady();
  };
  _proto._executeFuncSetters = function _executeFuncSetters(optionName, coreData, key) {
    var funcSetters = _uiGantt6.GanttHelper.compileFuncSettersByOption(this.option(optionName));
    var keysToUpdate = Object.keys(funcSetters).filter(function (k) {
      return (0, _type.isDefined)(coreData[k]);
    });
    if (keysToUpdate.length > 0) {
      var dataObject = this._getDataSourceItem(optionName, key);
      keysToUpdate.forEach(function (k) {
        var setter = funcSetters[k];
        setter(dataObject, coreData[k]);
      });
    }
  };
  _proto._sortAndFilter = function _sortAndFilter() {
    var _this$_savedSortFilte, _this$_savedSortFilte2, _this$_savedSortFilte3;
    var treeList = this._treeList;
    var columns = treeList.getVisibleColumns();
    var sortedColumns = columns.filter(function (c) {
      return c.sortIndex > -1;
    });
    var sortedState = sortedColumns.map(function (c) {
      return {
        sortIndex: c.sortIndex,
        sortOrder: c.sortOrder
      };
    });
    var sortedStateChanged = !this._compareSortedState((_this$_savedSortFilte = this._savedSortFilterState) === null || _this$_savedSortFilte === void 0 ? void 0 : _this$_savedSortFilte.sort, sortedState);
    var filterValue = treeList.option('filterValue');
    var filterChanged = treeList.option('expandNodesOnFiltering') && filterValue !== ((_this$_savedSortFilte2 = this._savedSortFilterState) === null || _this$_savedSortFilte2 === void 0 ? void 0 : _this$_savedSortFilte2.filter);
    var sieveColumn = sortedColumns[0] || columns.filter(function (c) {
      var _c$filterValues;
      return (0, _type.isDefined)(c.filterValue) || ((_c$filterValues = c.filterValues) === null || _c$filterValues === void 0 ? void 0 : _c$filterValues.length);
    })[0];
    var isClearSieving = ((_this$_savedSortFilte3 = this._savedSortFilterState) === null || _this$_savedSortFilte3 === void 0 ? void 0 : _this$_savedSortFilte3.sieveColumn) && !sieveColumn;
    if (sieveColumn || isClearSieving) {
      var sieveOptions = sieveColumn && {
        sievedItems: this._ganttTreeList.getSievedItems(),
        sieveColumn: sieveColumn,
        expandTasks: filterChanged || filterValue && sortedStateChanged
      };
      this.isSieving = !isClearSieving;
      this._setGanttViewOption('sieve', sieveOptions);
    }
    this._savedSortFilterState = {
      sort: sortedState,
      filter: filterValue,
      sieveColumn: sieveColumn
    };
  };
  _proto._compareSortedState = function _compareSortedState(state1, state2) {
    if (!state1 || !state2 || state1.length !== state2.length) {
      return false;
    }
    return state1.every(function (c, i) {
      return c.sortIndex === state2[i].sortIndex && c.sortOrder === state2[i].sortOrder;
    });
  };
  _proto._getToolbarItems = function _getToolbarItems() {
    var items = this.option('toolbar.items');
    return items ? items : [];
  };
  _proto._updateToolbarContent = function _updateToolbarContent() {
    var items = this._getToolbarItems();
    if (items.length) {
      this._$toolbarWrapper.show();
    } else {
      this._$toolbarWrapper.hide();
    }
    this._toolbar && this._toolbar.createItems(items);
    this._updateBarItemsState();
  };
  _proto._updateContextMenu = function _updateContextMenu() {
    var contextMenuOptions = this.option('contextMenu');
    if (contextMenuOptions.enabled && this._contextMenuBar) {
      this._contextMenuBar.createItems(contextMenuOptions.items);
      this._updateBarItemsState();
    }
  };
  _proto._updateBarItemsState = function _updateBarItemsState() {
    this._ganttView && this._ganttView.updateBarItemsState();
  };
  _proto._showDialog = function _showDialog(e) {
    if (!this._dialogInstance) {
      this._dialogInstance = new _uiGantt4.GanttDialog(this, this._$dialog);
    }
    this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option('editing'));
  };
  _proto._showPopupMenu = function _showPopupMenu(info) {
    if (this.option('contextMenu.enabled')) {
      this._ganttView.getBarManager().updateContextMenu();
      var args = {
        cancel: false,
        event: info.event,
        targetType: info.type,
        targetKey: info.key,
        items: (0, _extend.extend)(true, [], this._contextMenuBar._items),
        data: info.type === 'task' ? this.getTaskData(info.key) : this.getDependencyData(info.key)
      };
      this._actionsManager.raiseContextMenuPreparing(args);
      if (!args.cancel) {
        this._contextMenuBar.show(info.position, args.items);
      }
    }
  };
  _proto._hidePopupMenu = function _hidePopupMenu() {
    this._contextMenuBar.hide();
  };
  _proto._getLoadPanel = function _getLoadPanel() {
    if (!this._loadPanel) {
      this._loadPanel = this._createComponent(this._$loadPanel, _load_panel.default, {
        position: {
          of: this.$element()
        }
      });
    }
    return this._loadPanel;
  };
  _proto._getTaskKeyGetter = function _getTaskKeyGetter() {
    return this._getDataSourceItemKeyGetter(GANTT_TASKS);
  };
  _proto._findTaskByKey = function _findTaskByKey(key) {
    return this._getDataSourceItem(GANTT_TASKS, key);
  };
  _proto._getDataSourceItem = function _getDataSourceItem(dataOptionName, key) {
    var dataOption = this["_".concat(dataOptionName, "Option")];
    var keyGetter = this._getDataSourceItemKeyGetter(dataOptionName);
    var items = dataOption === null || dataOption === void 0 ? void 0 : dataOption._getItems();
    return items.find(function (t) {
      return keyGetter(t) === key;
    });
  };
  _proto._getDataSourceItemKeyGetter = function _getDataSourceItemKeyGetter(dataOptionName) {
    return (0, _data.compileGetter)(this.option("".concat(dataOptionName, ".keyExpr")));
  };
  _proto._setGanttViewOption = function _setGanttViewOption(optionName, value) {
    this._ganttView && this._ganttView.option(optionName, value);
  };
  _proto._getGanttViewOption = function _getGanttViewOption(optionName, value) {
    var _this$_ganttView3;
    return (_this$_ganttView3 = this._ganttView) === null || _this$_ganttView3 === void 0 ? void 0 : _this$_ganttView3.option(optionName);
  };
  _proto._getExportHelper = function _getExportHelper() {
    var _this$_exportHelper;
    (_this$_exportHelper = this._exportHelper) !== null && _this$_exportHelper !== void 0 ? _this$_exportHelper : this._exportHelper = new _uiGantt5.GanttExportHelper(this);
    return this._exportHelper;
  };
  _proto._executeCoreCommand = function _executeCoreCommand(id) {
    this._ganttView.executeCoreCommand(id);
  };
  _proto._expandAll = function _expandAll() {
    this._changeExpandAll(true);
  };
  _proto._collapseAll = function _collapseAll() {
    this._changeExpandAll(false);
  };
  _proto._onTreeListRowExpandChanged = function _onTreeListRowExpandChanged(e, expanded) {
    if (!this._lockRowExpandEvent) {
      this._ganttView.changeTaskExpanded(e.key, expanded);
      this._sizeHelper.adjustHeight();
    }
  };
  _proto._changeExpandAll = function _changeExpandAll(expanded, level, rowKey) {
    var _this8 = this,
      _promise;
    var allExpandableNodes = [];
    var nodesToExpand = [];
    this._treeList.forEachNode(function (node) {
      var _node$children;
      if ((_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length) {
        allExpandableNodes.push(node);
      }
    });
    if (rowKey) {
      var node = this._treeList.getNodeByKey(rowKey);
      _uiGantt6.GanttHelper.getAllParentNodesKeys(node, nodesToExpand);
    }
    var promise;
    this._lockRowExpandEvent = allExpandableNodes.length > 0;
    var state = allExpandableNodes.reduce(function (previous, node, index) {
      if (rowKey) {
        expanded = nodesToExpand.includes(node.key);
      } else if (level) {
        expanded = node.level < level;
      }
      previous[node.key] = expanded;
      var action = expanded ? _this8._treeList.expandRow : _this8._treeList.collapseRow;
      var isLast = index === allExpandableNodes.length - 1;
      if (isLast) {
        promise = action(node.key);
      } else {
        action(node.key);
      }
      return previous;
    }, {});
    (_promise = promise) === null || _promise === void 0 ? void 0 : _promise.then(function () {
      _this8._ganttView.applyTasksExpandedState(state);
      _this8._sizeHelper.adjustHeight();
      delete _this8._lockRowExpandEvent;
    });
  };
  _proto.getTaskResources = function getTaskResources(key) {
    var _this9 = this;
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    var coreData = this._ganttView._ganttViewCore.getTaskResources(key);
    return coreData.map(function (r) {
      return _this9._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, r);
    });
  };
  _proto.getVisibleTaskKeys = function getVisibleTaskKeys() {
    return this._ganttView._ganttViewCore.getVisibleTaskKeys();
  };
  _proto.getVisibleDependencyKeys = function getVisibleDependencyKeys() {
    return this._ganttView._ganttViewCore.getVisibleDependencyKeys();
  };
  _proto.getVisibleResourceKeys = function getVisibleResourceKeys() {
    return this._ganttView._ganttViewCore.getVisibleResourceKeys();
  };
  _proto.getVisibleResourceAssignmentKeys = function getVisibleResourceAssignmentKeys() {
    return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys();
  };
  _proto.getTaskData = function getTaskData(key) {
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    var coreData = this._ganttView._ganttViewCore.getTaskData(key);
    var mappedData = this.getTaskDataByCoreData(coreData);
    return mappedData;
  };
  _proto.getTaskDataByCoreData = function getTaskDataByCoreData(coreData) {
    var mappedData = coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_TASKS, coreData) : null;
    this._customFieldsManager.addCustomFieldsData(coreData.id, mappedData);
    return mappedData;
  };
  _proto.insertTask = function insertTask(data) {
    this._customFieldsManager.saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, data);
    this._ganttView._ganttViewCore.insertTask(this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data));
  };
  _proto.deleteTask = function deleteTask(key) {
    this._ganttView._ganttViewCore.deleteTask(key);
  };
  _proto.updateTask = function updateTask(key, data) {
    var coreTaskData = this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data);
    var isCustomFieldsUpdateOnly = !Object.keys(coreTaskData).length;
    this._customFieldsManager.saveCustomFieldsDataToCache(key, data, true, isCustomFieldsUpdateOnly);
    if (isCustomFieldsUpdateOnly) {
      var customFieldsData = this._customFieldsManager._getCustomFieldsData(data);
      if (Object.keys(customFieldsData).length > 0) {
        this._actionsManager.raiseUpdatingAction(GANTT_TASKS, {
          cancel: false,
          key: key,
          newValues: {}
        });
      }
    } else {
      this._ganttView._ganttViewCore.updateTask(key, coreTaskData);
    }
  };
  _proto.getDependencyData = function getDependencyData(key) {
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    var coreData = this._ganttView._ganttViewCore.getDependencyData(key);
    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null;
  };
  _proto.insertDependency = function insertDependency(data) {
    this._ganttView._ganttViewCore.insertDependency(this._mappingHelper.convertMappedToCoreData(GANTT_DEPENDENCIES, data));
  };
  _proto.deleteDependency = function deleteDependency(key) {
    this._ganttView._ganttViewCore.deleteDependency(key);
  };
  _proto.getResourceData = function getResourceData(key) {
    var coreData = this._ganttView._ganttViewCore.getResourceData(key);
    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, coreData) : null;
  };
  _proto.deleteResource = function deleteResource(key) {
    this._ganttView._ganttViewCore.deleteResource(key);
  };
  _proto.insertResource = function insertResource(data, taskKeys) {
    this._ganttView._ganttViewCore.insertResource(this._mappingHelper.convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys);
  };
  _proto.getResourceAssignmentData = function getResourceAssignmentData(key) {
    var coreData = this._ganttView._ganttViewCore.getResourceAssignmentData(key);
    return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null;
  };
  _proto.assignResourceToTask = function assignResourceToTask(resourceKey, taskKey) {
    this._ganttView._ganttViewCore.assignResourceToTask(resourceKey, taskKey);
  }
  // eslint-disable-next-line spellcheck/spell-checker
  ;
  _proto.unassignResourceFromTask = function unassignResourceFromTask(resourceKey, taskKey) {
    // eslint-disable-next-line spellcheck/spell-checker
    this._ganttView._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey);
  };
  _proto.unassignAllResourcesFromTask = function unassignAllResourcesFromTask(taskKey) {
    this._ganttView._ganttViewCore.unassignAllResourcesFromTask(taskKey);
  };
  _proto.updateDimensions = function updateDimensions() {
    this._sizeHelper.onAdjustControl();
  };
  _proto.scrollToDate = function scrollToDate(date) {
    this._ganttView._ganttViewCore.scrollToDate(date);
  };
  _proto.showResourceManagerDialog = function showResourceManagerDialog() {
    this._ganttView._ganttViewCore.showResourcesDialog();
  };
  _proto.showTaskDetailsDialog = function showTaskDetailsDialog(taskKey) {
    this._ganttView._ganttViewCore.showTaskDetailsDialog(taskKey);
  };
  _proto.exportToPdf = function exportToPdf(options) {
    return this._exportToPdf(options);
  };
  _proto._exportToPdf = function _exportToPdf(options) {
    var _fullOptions$pdfDocum,
      _fullOptions$docCreat,
      _window$jspdf$jsPDF,
      _window$jspdf,
      _fullOptions$format,
      _this10 = this;
    this._exportHelper.reset();
    var fullOptions = (0, _extend.extend)({}, options);
    if (fullOptions.createDocumentMethod) {
      fullOptions.docCreateMethod = fullOptions.createDocumentMethod;
    }
    (_fullOptions$pdfDocum = fullOptions.pdfDocument) !== null && _fullOptions$pdfDocum !== void 0 ? _fullOptions$pdfDocum : fullOptions.pdfDocument = fullOptions.jsPDFDocument;
    (_fullOptions$docCreat = fullOptions.docCreateMethod) !== null && _fullOptions$docCreat !== void 0 ? _fullOptions$docCreat : fullOptions.docCreateMethod = (_window$jspdf$jsPDF = (_window$jspdf = window['jspdf']) === null || _window$jspdf === void 0 ? void 0 : _window$jspdf['jsPDF']) !== null && _window$jspdf$jsPDF !== void 0 ? _window$jspdf$jsPDF : window['jsPDF'];
    (_fullOptions$format = fullOptions.format) !== null && _fullOptions$format !== void 0 ? _fullOptions$format : fullOptions.format = 'a4';
    return new Promise(function (resolve) {
      var _this10$_ganttView;
      var doc = (_this10$_ganttView = _this10._ganttView) === null || _this10$_ganttView === void 0 ? void 0 : _this10$_ganttView._ganttViewCore.exportToPdf(fullOptions);
      resolve(doc);
    });
  };
  _proto.refresh = function refresh() {
    var _this11 = this;
    return new Promise(function (resolve, reject) {
      try {
        _this11._refreshGantt();
        resolve();
      } catch (e) {
        reject(e.message);
      }
    });
  };
  _proto.expandAll = function expandAll() {
    this._expandAll();
  };
  _proto.collapseAll = function collapseAll() {
    this._collapseAll();
  };
  _proto.expandAllToLevel = function expandAllToLevel(level) {
    this._changeExpandAll(false, level);
  };
  _proto.expandToTask = function expandToTask(key) {
    var _node$parent;
    var node = this._treeList.getNodeByKey(key);
    this._changeExpandAll(false, 0, node === null || node === void 0 ? void 0 : (_node$parent = node.parent) === null || _node$parent === void 0 ? void 0 : _node$parent.key);
  };
  _proto.collapseTask = function collapseTask(key) {
    this._treeList.collapseRow(key);
  };
  _proto.expandTask = function expandTask(key) {
    this._treeList.expandRow(key);
  };
  _proto.showResources = function showResources(value) {
    this.option('showResources', value);
  };
  _proto.showDependencies = function showDependencies(value) {
    this.option('showDependencies', value);
  };
  _proto.zoomIn = function zoomIn() {
    this._ganttView._ganttViewCore.zoomIn();
  };
  _proto.zoomOut = function zoomOut() {
    this._ganttView._ganttViewCore.zoomOut();
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), _uiGantt6.GanttHelper.getDefaultOptions());
  };
  _proto._optionChanged = function _optionChanged(args) {
    var _this$_ganttTreeList4, _this$_sizeHelper, _this$_ganttTreeList5, _this$_actionsManager, _this$_actionsManager2, _this$_actionsManager3, _this$_actionsManager4, _this$_actionsManager5, _this$_actionsManager6, _this$_actionsManager7, _this$_actionsManager8, _this$_actionsManager9, _this$_actionsManager10, _this$_actionsManager11, _this$_actionsManager12, _this$_actionsManager13, _this$_actionsManager14, _this$_actionsManager15, _this$_actionsManager16, _this$_actionsManager17, _this$_actionsManager18, _this$_actionsManager19, _this$_actionsManager20, _this$_actionsManager21, _this$_actionsManager22, _this$_actionsManager23, _this$_actionsManager24, _this$_actionsManager25, _this$_actionsManager26, _this$_actionsManager27, _this$_ganttTreeList6, _this$_ganttTreeList7, _this$_ganttTemplates, _this$_ganttTemplates2, _this$_ganttTemplates3, _this$_ganttTemplates4, _this$_ganttTreeList8, _this$_sizeHelper2, _this$_sizeHelper3, _this$_ganttTreeList9, _this$_ganttTreeList10, _this$_ganttTreeList11;
    switch (args.name) {
      case 'tasks':
        this._refreshDataSource(GANTT_TASKS);
        break;
      case 'dependencies':
        this._refreshDataSource(GANTT_DEPENDENCIES);
        break;
      case 'resources':
        this._refreshDataSource(GANTT_RESOURCES);
        break;
      case 'resourceAssignments':
        this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
        break;
      case 'columns':
        (_this$_ganttTreeList4 = this._ganttTreeList) === null || _this$_ganttTreeList4 === void 0 ? void 0 : _this$_ganttTreeList4.setOption('columns', this._ganttTreeList.getColumns());
        break;
      case 'taskListWidth':
        (_this$_sizeHelper = this._sizeHelper) === null || _this$_sizeHelper === void 0 ? void 0 : _this$_sizeHelper.setInnerElementsWidth();
        break;
      case 'showResources':
        this._setGanttViewOption('showResources', args.value);
        break;
      case 'showDependencies':
        this._setGanttViewOption('showDependencies', args.value);
        break;
      case 'taskTitlePosition':
        this._setGanttViewOption('taskTitlePosition', args.value);
        break;
      case 'firstDayOfWeek':
        this._setGanttViewOption('firstDayOfWeek', args.value);
        break;
      case 'startDateRange':
        this._setGanttViewOption('startDateRange', args.value);
        break;
      case 'endDateRange':
        this._setGanttViewOption('endDateRange', args.value);
        break;
      case 'selectedRowKey':
        (_this$_ganttTreeList5 = this._ganttTreeList) === null || _this$_ganttTreeList5 === void 0 ? void 0 : _this$_ganttTreeList5.selectRows(_uiGantt6.GanttHelper.getArrayFromOneElement(args.value));
        break;
      case 'onSelectionChanged':
        (_this$_actionsManager = this._actionsManager) === null || _this$_actionsManager === void 0 ? void 0 : _this$_actionsManager.createSelectionChangedAction();
        break;
      case 'onTaskClick':
        (_this$_actionsManager2 = this._actionsManager) === null || _this$_actionsManager2 === void 0 ? void 0 : _this$_actionsManager2.createTaskClickAction();
        break;
      case 'onTaskDblClick':
        (_this$_actionsManager3 = this._actionsManager) === null || _this$_actionsManager3 === void 0 ? void 0 : _this$_actionsManager3.createTaskDblClickAction();
        break;
      case 'onTaskInserting':
        (_this$_actionsManager4 = this._actionsManager) === null || _this$_actionsManager4 === void 0 ? void 0 : _this$_actionsManager4.createTaskInsertingAction();
        break;
      case 'onTaskInserted':
        (_this$_actionsManager5 = this._actionsManager) === null || _this$_actionsManager5 === void 0 ? void 0 : _this$_actionsManager5.createTaskInsertedAction();
        break;
      case 'onTaskDeleting':
        (_this$_actionsManager6 = this._actionsManager) === null || _this$_actionsManager6 === void 0 ? void 0 : _this$_actionsManager6.createTaskDeletingAction();
        break;
      case 'onTaskDeleted':
        (_this$_actionsManager7 = this._actionsManager) === null || _this$_actionsManager7 === void 0 ? void 0 : _this$_actionsManager7.createTaskDeletedAction();
        break;
      case 'onTaskUpdating':
        (_this$_actionsManager8 = this._actionsManager) === null || _this$_actionsManager8 === void 0 ? void 0 : _this$_actionsManager8.createTaskUpdatingAction();
        break;
      case 'onTaskUpdated':
        (_this$_actionsManager9 = this._actionsManager) === null || _this$_actionsManager9 === void 0 ? void 0 : _this$_actionsManager9.createTaskUpdatedAction();
        break;
      case 'onTaskMoving':
        (_this$_actionsManager10 = this._actionsManager) === null || _this$_actionsManager10 === void 0 ? void 0 : _this$_actionsManager10.createTaskMovingAction();
        break;
      case 'onTaskEditDialogShowing':
        (_this$_actionsManager11 = this._actionsManager) === null || _this$_actionsManager11 === void 0 ? void 0 : _this$_actionsManager11.createTaskEditDialogShowingAction();
        break;
      case 'onResourceManagerDialogShowing':
        (_this$_actionsManager12 = this._actionsManager) === null || _this$_actionsManager12 === void 0 ? void 0 : _this$_actionsManager12.createResourceManagerDialogShowingAction();
        break;
      case 'onDependencyInserting':
        (_this$_actionsManager13 = this._actionsManager) === null || _this$_actionsManager13 === void 0 ? void 0 : _this$_actionsManager13.createDependencyInsertingAction();
        break;
      case 'onDependencyInserted':
        (_this$_actionsManager14 = this._actionsManager) === null || _this$_actionsManager14 === void 0 ? void 0 : _this$_actionsManager14.createDependencyInsertedAction();
        break;
      case 'onDependencyDeleting':
        (_this$_actionsManager15 = this._actionsManager) === null || _this$_actionsManager15 === void 0 ? void 0 : _this$_actionsManager15.createDependencyDeletingAction();
        break;
      case 'onDependencyDeleted':
        (_this$_actionsManager16 = this._actionsManager) === null || _this$_actionsManager16 === void 0 ? void 0 : _this$_actionsManager16.createDependencyDeletedAction();
        break;
      case 'onResourceInserting':
        (_this$_actionsManager17 = this._actionsManager) === null || _this$_actionsManager17 === void 0 ? void 0 : _this$_actionsManager17.createResourceInsertingAction();
        break;
      case 'onResourceInserted':
        (_this$_actionsManager18 = this._actionsManager) === null || _this$_actionsManager18 === void 0 ? void 0 : _this$_actionsManager18.createResourceInsertedAction();
        break;
      case 'onResourceDeleting':
        (_this$_actionsManager19 = this._actionsManager) === null || _this$_actionsManager19 === void 0 ? void 0 : _this$_actionsManager19.createResourceDeletingAction();
        break;
      case 'onResourceDeleted':
        (_this$_actionsManager20 = this._actionsManager) === null || _this$_actionsManager20 === void 0 ? void 0 : _this$_actionsManager20.createResourceDeletedAction();
        break;
      case 'onResourceAssigning':
        (_this$_actionsManager21 = this._actionsManager) === null || _this$_actionsManager21 === void 0 ? void 0 : _this$_actionsManager21.createResourceAssigningAction();
        break;
      case 'onResourceAssigned':
        (_this$_actionsManager22 = this._actionsManager) === null || _this$_actionsManager22 === void 0 ? void 0 : _this$_actionsManager22.createResourceAssignedAction();
        break;
      case 'onResourceUnassigning':
        // eslint-disable-next-line spellcheck/spell-checker
        (_this$_actionsManager23 = this._actionsManager) === null || _this$_actionsManager23 === void 0 ? void 0 : _this$_actionsManager23.createResourceUnassigningAction();
        break;
      case 'onResourceUnassigned':
        // eslint-disable-next-line spellcheck/spell-checker
        (_this$_actionsManager24 = this._actionsManager) === null || _this$_actionsManager24 === void 0 ? void 0 : _this$_actionsManager24.createResourceUnassignedAction();
        break;
      case 'onCustomCommand':
        (_this$_actionsManager25 = this._actionsManager) === null || _this$_actionsManager25 === void 0 ? void 0 : _this$_actionsManager25.createCustomCommandAction();
        break;
      case 'onContextMenuPreparing':
        (_this$_actionsManager26 = this._actionsManager) === null || _this$_actionsManager26 === void 0 ? void 0 : _this$_actionsManager26.createContextMenuPreparingAction();
        break;
      case 'onScaleCellPrepared':
        (_this$_actionsManager27 = this._actionsManager) === null || _this$_actionsManager27 === void 0 ? void 0 : _this$_actionsManager27.createScaleCellPreparedAction();
        break;
      case 'allowSelection':
        (_this$_ganttTreeList6 = this._ganttTreeList) === null || _this$_ganttTreeList6 === void 0 ? void 0 : _this$_ganttTreeList6.setOption('selection.mode', _uiGantt6.GanttHelper.getSelectionMode(args.value));
        this._setGanttViewOption('allowSelection', args.value);
        break;
      case 'showRowLines':
        (_this$_ganttTreeList7 = this._ganttTreeList) === null || _this$_ganttTreeList7 === void 0 ? void 0 : _this$_ganttTreeList7.setOption('showRowLines', args.value);
        this._setGanttViewOption('showRowLines', args.value);
        break;
      case 'stripLines':
        this._setGanttViewOption('stripLines', args.value);
        break;
      case 'scaleType':
        this._setGanttViewOption('scaleType', args.value);
        break;
      case 'scaleTypeRange':
        this._setGanttViewOption('scaleTypeRange', this.option(args.name));
        break;
      case 'editing':
        this._setGanttViewOption('editing', this.option(args.name));
        break;
      case 'validation':
        this._setGanttViewOption('validation', this.option(args.name));
        break;
      case 'toolbar':
        this._updateToolbarContent();
        break;
      case 'contextMenu':
        this._updateContextMenu();
        break;
      case 'taskTooltipContentTemplate':
        this._setGanttViewOption('taskTooltipContentTemplate', (_this$_ganttTemplates = this._ganttTemplatesManager) === null || _this$_ganttTemplates === void 0 ? void 0 : _this$_ganttTemplates.getTaskTooltipContentTemplateFunc(args.value));
        break;
      case 'taskProgressTooltipContentTemplate':
        this._setGanttViewOption('taskProgressTooltipContentTemplate', (_this$_ganttTemplates2 = this._ganttTemplatesManager) === null || _this$_ganttTemplates2 === void 0 ? void 0 : _this$_ganttTemplates2.getTaskProgressTooltipContentTemplateFunc(args.value));
        break;
      case 'taskTimeTooltipContentTemplate':
        this._setGanttViewOption('taskTimeTooltipContentTemplate', (_this$_ganttTemplates3 = this._ganttTemplatesManager) === null || _this$_ganttTemplates3 === void 0 ? void 0 : _this$_ganttTemplates3.getTaskTimeTooltipContentTemplateFunc(args.value));
        break;
      case 'taskContentTemplate':
        this._setGanttViewOption('taskContentTemplate', (_this$_ganttTemplates4 = this._ganttTemplatesManager) === null || _this$_ganttTemplates4 === void 0 ? void 0 : _this$_ganttTemplates4.getTaskContentTemplateFunc(args.value));
        break;
      case 'rootValue':
        (_this$_ganttTreeList8 = this._ganttTreeList) === null || _this$_ganttTreeList8 === void 0 ? void 0 : _this$_ganttTreeList8.setOption('rootValue', args.value);
        break;
      case 'width':
        _Widget.prototype._optionChanged.call(this, args);
        (_this$_sizeHelper2 = this._sizeHelper) === null || _this$_sizeHelper2 === void 0 ? void 0 : _this$_sizeHelper2.updateGanttWidth();
        break;
      case 'height':
        _Widget.prototype._optionChanged.call(this, args);
        (_this$_sizeHelper3 = this._sizeHelper) === null || _this$_sizeHelper3 === void 0 ? void 0 : _this$_sizeHelper3.setGanttHeight((0, _size.getHeight)(this._$element));
        break;
      case 'sorting':
        (_this$_ganttTreeList9 = this._ganttTreeList) === null || _this$_ganttTreeList9 === void 0 ? void 0 : _this$_ganttTreeList9.setOption('sorting', this.option(args.name));
        break;
      case 'filterRow':
        (_this$_ganttTreeList10 = this._ganttTreeList) === null || _this$_ganttTreeList10 === void 0 ? void 0 : _this$_ganttTreeList10.setOption('filterRow', this.option(args.name));
        break;
      case 'headerFilter':
        (_this$_ganttTreeList11 = this._ganttTreeList) === null || _this$_ganttTreeList11 === void 0 ? void 0 : _this$_ganttTreeList11.setOption('headerFilter', this.option(args.name));
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  return Gantt;
}(_ui.default);
(0, _component_registrator.default)('dxGantt', Gantt);
var _default = Gantt;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
