/**
* DevExtreme (cjs/ui/gantt/ui.gantt.bars.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttToolbar = exports.GanttContextMenuBar = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _toolbar = _interopRequireDefault(require("../toolbar"));
var _context_menu = _interopRequireDefault(require("../context_menu"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _extend = require("../../core/utils/extend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TOOLBAR_SEPARATOR_CLASS = 'dx-gantt-toolbar-separator';
var COMMANDS = {
  createTask: 0,
  createSubTask: 1,
  removeTask: 2,
  removeDependency: 3,
  taskInformation: 4,
  taskAddContextItem: 5,
  undo: 6,
  redo: 7,
  zoomIn: 8,
  zoomOut: 9,
  fullScreen: 10,
  collapseAll: 11,
  expandAll: 12,
  resourceManager: 13,
  toggleResources: 14,
  toggleDependencies: 15
};
var Bar = /*#__PURE__*/function () {
  function Bar(element, owner) {
    this._element = element;
    this._owner = owner;
    this._items = [];
    this._createControl();
  }
  var _proto = Bar.prototype;
  _proto.createItems = function createItems(items) {
    this._cache = null;
    this._items = this._createItemsCore(items);
    this._menu.option('items', this._items);
  };
  _proto._createItemsCore = function _createItemsCore(items) {
    var _this = this;
    return items.map(function (item) {
      var result;
      if (typeof item === 'string') {
        result = _this._createItemByText(item);
      } else {
        result = item.name ? (0, _extend.extend)(_this._createItemByText(item.name), item) : (0, _extend.extend)(_this._getDefaultItemOptions(), item);
      }
      if (item.items) {
        result.items = _this._createItemsCore(item.items);
      }
      return result;
    });
  };
  _proto._createItemByText = function _createItemByText(text) {
    switch (text.toLowerCase()) {
      case 'separator':
        return this._createSeparator();
      case 'undo':
        return this._createDefaultItem(COMMANDS.undo, _message.default.format('dxGantt-undo'), this._getIcon('undo'));
      case 'redo':
        return this._createDefaultItem(COMMANDS.redo, _message.default.format('dxGantt-redo'), this._getIcon('redo'));
      case 'expandall':
        return this._createDefaultItem(COMMANDS.expandAll, _message.default.format('dxGantt-expandAll'), this._getIcon('expand'));
      case 'collapseall':
        return this._createDefaultItem(COMMANDS.collapseAll, _message.default.format('dxGantt-collapseAll'), this._getIcon('collapse'));
      case 'addtask':
        return this._createDefaultItem(COMMANDS.createTask, _message.default.format('dxGantt-addNewTask'), this._getIcon('add'));
      case 'addsubtask':
        return this._createDefaultItem(COMMANDS.createSubTask, _message.default.format('dxGantt-contextMenuNewSubtask'), this._getIcon('add-sub-task'));
      case 'deletetask':
        return this._createDefaultItem(COMMANDS.removeTask, _message.default.format('dxGantt-deleteSelectedTask'), this._getIcon('delete'));
      case 'deletedependency':
        return this._createDefaultItem(COMMANDS.removeDependency, _message.default.format('dxGantt-contextMenuDeleteDependency'), this._getIcon('delete-dependency'));
      case 'zoomin':
        return this._createDefaultItem(COMMANDS.zoomIn, _message.default.format('dxGantt-zoomIn'), this._getIcon('zoom-in'));
      case 'zoomout':
        return this._createDefaultItem(COMMANDS.zoomOut, _message.default.format('dxGantt-zoomOut'), this._getIcon('zoom-out'));
      case 'fullscreen':
        return this._createDefaultItem(COMMANDS.fullScreen, _message.default.format('dxGantt-fullScreen'), this._getIcon('full-screen'));
      case 'taskdetails':
        return this._createDefaultItem(COMMANDS.taskInformation, _message.default.format('dxGantt-dialogTaskDetailsTitle') + '...', this._getIcon('task-details'));
      case 'resourcemanager':
        return this._createDefaultItem(COMMANDS.resourceManager, _message.default.format('dxGantt-dialogResourceManagerTitle'), this._getIcon('resource-manager'));
      case 'showresources':
        return this._createDefaultItem(COMMANDS.toggleResources, _message.default.format('dxGantt-showResources'), this._getIcon('toggle-resources'));
      case 'showdependencies':
        return this._createDefaultItem(COMMANDS.toggleDependencies, _message.default.format('dxGantt-showDependencies'), this._getIcon('toggle-dependencies'));
      default:
        return (0, _extend.extend)(this._getDefaultItemOptions(), {
          options: {
            text: text
          }
        });
    }
  };
  _proto._getDefaultItemOptions = function _getDefaultItemOptions() {
    return {};
  };
  _proto._getItemsCache = function _getItemsCache() {
    if (!this._cache) {
      this._cache = {};
      this._fillCache(this._items);
    }
    return this._cache;
  };
  _proto._fillCache = function _fillCache(items) {
    var _this2 = this;
    items.forEach(function (item) {
      var key = item.commandId;
      if (key !== undefined) {
        if (!_this2._cache[key]) {
          _this2._cache[key] = [];
        }
        _this2._cache[key].push(item);
      }
      if (item.items) {
        _this2._fillCache(item.items);
      }
    });
  };
  _proto._getIcon = function _getIcon(name) {
    return 'dx-gantt-i dx-gantt-i-' + name;
  }

  // IBar
  ;
  _proto.getCommandKeys = function getCommandKeys() {
    var itemsCache = this._getItemsCache();
    var result = [];
    for (var itemKey in itemsCache) {
      result.push(parseInt(itemKey));
    }
    return result;
  };
  _proto.setItemEnabled = function setItemEnabled(key, enabled) {
    var itemsCache = this._getItemsCache();
    itemsCache[key].forEach(function (item) {
      item.disabled = !enabled;
    });
  };
  _proto.setItemVisible = function setItemVisible(key, visible) {
    var itemsCache = this._getItemsCache();
    itemsCache[key].forEach(function (item) {
      item.visible = visible;
    });
  };
  _proto.setItemValue = function setItemValue(_key, _value) {};
  _proto.setEnabled = function setEnabled(enabled) {
    this._menu.option('disabled', !enabled);
  };
  _proto.updateItemsList = function updateItemsList() {};
  _proto.isVisible = function isVisible() {
    return true;
  };
  _proto.isContextMenu = function isContextMenu() {
    return false;
  };
  _proto.completeUpdate = function completeUpdate() {};
  return Bar;
}();
var GanttToolbar = /*#__PURE__*/function (_Bar) {
  _inheritsLoose(GanttToolbar, _Bar);
  function GanttToolbar() {
    return _Bar.apply(this, arguments) || this;
  }
  var _proto2 = GanttToolbar.prototype;
  _proto2._createControl = function _createControl() {
    var _this3 = this;
    this._menu = this._owner._createComponent(this._element, _toolbar.default, {
      onItemClick: function onItemClick(e) {
        var commandId = e.itemData.commandId;
        if (commandId !== undefined) {
          _this3._executeCommand(e.itemData.commandId);
        }
      }
    });
  };
  _proto2._executeCommand = function _executeCommand(commandId) {
    switch (commandId) {
      case COMMANDS.toggleResources:
        this._owner.option('showResources', !this._owner.option('showResources'));
        break;
      case COMMANDS.toggleDependencies:
        this._owner.option('showDependencies', !this._owner.option('showDependencies'));
        break;
      default:
        this._owner._executeCoreCommand(commandId);
    }
  };
  _proto2._createDefaultItem = function _createDefaultItem(commandId, hint, icon) {
    return {
      commandId: commandId,
      disabled: true,
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: icon,
        stylingMode: 'text',
        hint: hint
      }
    };
  };
  _proto2._createSeparator = function _createSeparator() {
    return {
      location: 'before',
      template: function template(_data, _index, element) {
        (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS);
      }
    };
  };
  _proto2._getDefaultItemOptions = function _getDefaultItemOptions() {
    return {
      location: 'before',
      widget: 'dxButton'
    };
  }

  // IBar
  ;
  _proto2.completeUpdate = function completeUpdate() {
    this._menu.option('items', this._items);
  };
  return GanttToolbar;
}(Bar);
exports.GanttToolbar = GanttToolbar;
var GanttContextMenuBar = /*#__PURE__*/function (_Bar2) {
  _inheritsLoose(GanttContextMenuBar, _Bar2);
  function GanttContextMenuBar() {
    return _Bar2.apply(this, arguments) || this;
  }
  var _proto3 = GanttContextMenuBar.prototype;
  _proto3._createControl = function _createControl() {
    var _this4 = this;
    this._menu = this._owner._createComponent(this._element, _context_menu.default, {
      showEvent: undefined,
      onItemClick: function onItemClick(e) {
        if (e.itemData.commandId !== undefined) {
          _this4._owner._executeCoreCommand(e.itemData.commandId);
        } else {
          if (e.itemData.name !== undefined) {
            _this4._owner._actionsManager.raiseCustomCommand(e.itemData.name);
          }
        }
      }
    });
  };
  _proto3.createItems = function createItems(items) {
    if (!items || items.length === 0) {
      items = this._getDefaultItems();
    }
    _Bar2.prototype.createItems.call(this, items);
  };
  _proto3._getDefaultItems = function _getDefaultItems() {
    return [{
      text: _message.default.format('dxGantt-dialogButtonAdd'),
      commandId: COMMANDS.taskAddContextItem,
      icon: this._getIcon('add'),
      items: [{
        text: _message.default.format('dxGantt-contextMenuNewTask'),
        commandId: COMMANDS.createTask,
        icon: this._getIcon('add-task')
      }, {
        text: _message.default.format('dxGantt-contextMenuNewSubtask'),
        commandId: COMMANDS.createSubTask,
        icon: this._getIcon('add-sub-task')
      }]
    }, {
      text: _message.default.format('dxGantt-dialogTaskDetailsTitle') + '...',
      commandId: COMMANDS.taskInformation,
      icon: this._getIcon('task-details')
    }, {
      text: _message.default.format('dxGantt-contextMenuDeleteTask'),
      commandId: COMMANDS.removeTask,
      icon: this._getIcon('delete')
    }, {
      text: _message.default.format('dxGantt-contextMenuDeleteDependency'),
      commandId: COMMANDS.removeDependency,
      icon: this._getIcon('delete-dependency')
    }];
  };
  _proto3._createDefaultItem = function _createDefaultItem(commandId, text, icon) {
    return {
      commandId: commandId,
      text: text,
      icon: icon
    };
  };
  _proto3.show = function show(point, items) {
    this._menu.option('items', items || this._items);
    this._menu.option('position.offset', {
      x: point.x,
      y: point.y
    });
    this._menu.option('position.collision', 'fit');
    this._menu.show();
  };
  _proto3.hide = function hide() {
    this._menu.hide();
  }

  // IBar
  ;
  _proto3.isContextMenu = function isContextMenu() {
    return true;
  };
  return GanttContextMenuBar;
}(Bar);
exports.GanttContextMenuBar = GanttContextMenuBar;
