/**
* DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/module.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldChooser = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _icon = require("../../../../core/utils/icon");
var _window = require("../../../../core/utils/window");
var _type = require("../../../../core/utils/type");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _tree_view = _interopRequireDefault(require("../../../../ui/tree_view"));
var _context_menu = _interopRequireDefault(require("../../../../ui/context_menu"));
var _module_widget_utils = require("../module_widget_utils");
var _module_base = require("./module_base");
require("../data_source/module");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DIV = '<div>';
var hasWindow = (0, _window.hasWindow)();
function getDimensionFields(item, fields) {
  var result = [];
  if (item.items) {
    for (var i = 0; i < item.items.length; i += 1) {
      result.push.apply(result, getDimensionFields(item.items[i], fields));
    }
  } else if ((0, _type.isDefined)(item.index)) {
    result.push(fields[item.index]);
  }
  return result;
}
function getFirstItem(item, condition) {
  if (item.items) {
    for (var i = 0; i < item.items.length; i += 1) {
      var childrenItem = getFirstItem(item.items[i], condition);
      if (childrenItem) {
        return childrenItem;
      }
    }
  }
  if (condition(item)) {
    return item;
  }
  return undefined;
}
var compareOrder = [function (a, b) {
  var aValue = -!!a.isMeasure;
  var bValue = +!!b.isMeasure;
  return aValue + bValue;
}, function (a, b) {
  var aValue = -!!(a.items && a.items.length);
  var bValue = +!!(b.items && b.items.length);
  return aValue + bValue;
}, function (a, b) {
  var aValue = +!!(a.isMeasure === false && a.field && a.field.levels && a.field.levels.length);
  var bValue = -!!(b.isMeasure === false && b.field && b.field.levels && b.field.levels.length);
  return aValue + bValue;
}, (0, _module_widget_utils.getCompareFunction)(function (item) {
  return item.text;
})];
function compareItems(a, b) {
  var result = 0;
  var i = 0;
  while (!result && compareOrder[i]) {
    // eslint-disable-next-line no-plusplus
    result = compareOrder[i++](a, b);
  }
  return result;
}
function getScrollable(container) {
  return container.find(".".concat(_const.CLASSES.scrollable.self)).dxScrollable('instance');
}
var FieldChooser = _module_base.FieldChooserBase.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      height: 400,
      layout: 0,
      dataSource: null,
      encodeHtml: true,
      onContextMenuPreparing: null,
      allowSearch: false,
      searchTimeout: 500,
      texts: {
        columnFields: _message.default.format('dxPivotGrid-columnFields'),
        rowFields: _message.default.format('dxPivotGrid-rowFields'),
        dataFields: _message.default.format('dxPivotGrid-dataFields'),
        filterFields: _message.default.format('dxPivotGrid-filterFields'),
        allFields: _message.default.format('dxPivotGrid-allFields')
      }
    });
  },
  _refreshDataSource: function _refreshDataSource() {
    var that = this;
    that._expandedPaths = [];
    that._changedHandler = that._changedHandler || function () {
      (0, _iterator.each)(that._dataChangedHandlers, function (_, func) {
        func();
      });
      that._fireContentReadyAction();
      that._skipStateChange = true;
      that.option('state', that._dataSource.state());
      that._skipStateChange = false;
    };
    that._disposeDataSource();
    that.callBase();
    that._dataSource && that._dataSource.on('changed', that._changedHandler);
  },
  _disposeDataSource: function _disposeDataSource() {
    var that = this;
    var dataSource = that._dataSource;
    if (dataSource) {
      dataSource.off('changed', that._changedHandler);
      that._dataSource = undefined;
    }
  },
  _dispose: function _dispose() {
    this._disposeDataSource();
    this.callBase.apply(this, arguments);
  },
  _init: function _init() {
    this.callBase();
    this._refreshDataSource();
    this._dataChangedHandlers = [];
    this._initActions();
  },
  _initActions: function _initActions() {
    this._actions = {
      onContextMenuPreparing: this._createActionByOption('onContextMenuPreparing')
    };
  },
  _trigger: function _trigger(eventName, eventArg) {
    this._actions[eventName](eventArg);
  },
  _setOptionsByReference: function _setOptionsByReference() {
    this.callBase();
    (0, _extend.extend)(this._optionsByReference, {
      dataSource: true
    });
  },
  _optionChanged: function _optionChanged(args) {
    var that = this;
    switch (args.name) {
      case 'dataSource':
        that._refreshDataSource();
        that._invalidate();
        break;
      case 'layout':
      case 'texts':
      case 'allowSearch':
      case 'searchTimeout':
      case 'encodeHtml':
        that._invalidate();
        break;
      case 'onContextMenuPreparing':
        that._actions[args.name] = that._createActionByOption(args.name);
        break;
      default:
        that.callBase(args);
    }
  },
  _clean: function _clean(skipStateSetting) {
    !skipStateSetting && this._dataSource && this.option('state', this._dataSource.state());
    this.$element().children(".".concat(_const.CLASSES.fieldChooser.container)).remove();
  },
  _renderLayout0: function _renderLayout0($container) {
    var that = this;
    $container.addClass(_const.CLASSES.layout.zero);
    var $row1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
    var $row2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
    var $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row1);
    var $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row1);
    var $col3 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
    var $col4 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
    that._renderArea($col1, 'all');
    that._renderArea($col2, 'row');
    that._renderArea($col2, 'column');
    that._renderArea($col3, 'filter');
    that._renderArea($col4, 'data');
  },
  _renderLayout1: function _renderLayout1($container) {
    var that = this;
    var $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($container);
    var $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($container);
    that._renderArea($col1, 'all');
    that._renderArea($col2, 'filter');
    that._renderArea($col2, 'row');
    that._renderArea($col2, 'column');
    that._renderArea($col2, 'data');
  },
  _renderLayout2: function _renderLayout2($container) {
    var that = this;
    $container.addClass(_const.CLASSES.layout.second);
    var $row1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
    that._renderArea($row1, 'all');
    var $row2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.row).appendTo($container);
    var $col1 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
    var $col2 = (0, _renderer.default)(DIV).addClass(_const.CLASSES.col).appendTo($row2);
    that._renderArea($col1, 'filter');
    that._renderArea($col1, 'row');
    that._renderArea($col2, 'column');
    that._renderArea($col2, 'data');
  },
  _initMarkup: function _initMarkup() {
    var that = this;
    var $element = this.$element();
    var $container = (0, _renderer.default)(DIV).addClass(_const.CLASSES.fieldChooser.container).appendTo($element);
    var layout = that.option('layout');
    that.callBase();
    $element.addClass(_const.CLASSES.fieldChooser.self).addClass(_const.CLASSES.pivotGrid.fieldsContainer);
    that._dataChangedHandlers = [];
    var dataSource = this._dataSource;
    var currentState = that.option('applyChangesMode') !== 'instantly' && dataSource && dataSource.state();
    currentState && that.option('state') && dataSource.state(that.option('state'), true);
    if (layout === 0) {
      that._renderLayout0($container);
    } else if (layout === 1) {
      that._renderLayout1($container);
    } else {
      that._renderLayout2($container);
    }
    currentState && dataSource.state(currentState, true);
  },
  _renderContentImpl: function _renderContentImpl() {
    this.callBase();
    this.renderSortable();
    this._renderContextMenu();
    this.updateDimensions();
  },
  _fireContentReadyAction: function _fireContentReadyAction() {
    if (!this._dataSource || !this._dataSource.isLoading()) {
      this.callBase();
    }
  },
  _getContextMenuArgs: function _getContextMenuArgs(dxEvent) {
    var targetFieldElement = (0, _renderer.default)(dxEvent.target).closest(".".concat(_const.CLASSES.area.field));
    var targetGroupElement = (0, _renderer.default)(dxEvent.target).closest(".".concat(_const.CLASSES.area.fieldList));
    var field;
    var area;
    if (targetFieldElement.length) {
      var fieldCopy = targetFieldElement.data('field');
      if (fieldCopy) {
        field = this.getDataSource().field(fieldCopy.index) || fieldCopy;
      }
    }
    if (targetGroupElement.length) {
      area = targetGroupElement.attr('group');
    }
    return {
      event: dxEvent,
      field: field,
      area: area,
      items: []
    };
  },
  _renderContextMenu: function _renderContextMenu() {
    var that = this;
    var $container = that.$element();
    if (that._contextMenu) {
      that._contextMenu.$element().remove();
    }
    that._contextMenu = that._createComponent((0, _renderer.default)(DIV).appendTo($container), _context_menu.default, {
      onPositioning: function onPositioning(actionArgs) {
        var event = actionArgs.event;
        if (!event) {
          return;
        }
        var args = that._getContextMenuArgs(event);
        that._trigger('onContextMenuPreparing', args);
        if (args.items && args.items.length) {
          actionArgs.component.option('items', args.items);
        } else {
          actionArgs.cancel = true;
        }
      },
      target: $container,
      onItemClick: function onItemClick(params) {
        params.itemData.onItemClick && params.itemData.onItemClick(params);
      },
      cssClass: _const.CLASSES.fieldChooser.contextMenu
    });
  },
  _createTreeItems: function _createTreeItems(fields, groupFieldNames, path) {
    var that = this;
    var isMeasure;
    var resultItems = [];
    var groupedItems = [];
    var groupFieldName = groupFieldNames[0];
    var fieldsByGroup = {};
    if (!groupFieldName) {
      (0, _iterator.each)(fields, function (_, field) {
        var icon;
        if (field.isMeasure === true) {
          icon = _const.ICONS.measure;
        }
        if (field.isMeasure === false) {
          icon = field.groupName ? _const.ICONS.hierarchy : _const.ICONS.dimension;
        }
        resultItems.push({
          index: field.index,
          field: field,
          key: field.dataField,
          selected: (0, _type.isDefined)(field.area),
          text: field.caption || field.dataField,
          icon: icon,
          isMeasure: field.isMeasure,
          isDefault: field.isDefault
        });
      });
    } else {
      (0, _iterator.each)(fields, function (_, field) {
        var groupName = field[groupFieldName] || '';
        fieldsByGroup[groupName] = fieldsByGroup[groupName] || [];
        fieldsByGroup[groupName].push(field);
        if (isMeasure === undefined) {
          isMeasure = true;
        }
        isMeasure = isMeasure && field.isMeasure === true;
      });
      (0, _iterator.each)(fieldsByGroup, function (groupName, fields) {
        var currentPath = path ? "".concat(path, ".").concat(groupName) : groupName;
        var items = that._createTreeItems(fields, groupFieldNames.slice(1), currentPath);
        if (groupName) {
          groupedItems.push({
            key: groupName,
            text: groupName,
            path: currentPath,
            isMeasure: items.isMeasure,
            expanded: that._expandedPaths.includes(currentPath),
            items: items
          });
        } else {
          resultItems = items;
        }
      });
      resultItems = groupedItems.concat(resultItems);
      resultItems.isMeasure = isMeasure;
    }
    return resultItems;
  },
  _createFieldsDataSource: function _createFieldsDataSource(dataSource) {
    var fields = dataSource && dataSource.fields() || [];
    fields = fields.filter(function (field) {
      return field.visible !== false && !(0, _type.isDefined)(field.groupIndex);
    });
    var treeItems = this._createTreeItems(fields, ['dimension', 'displayFolder']);
    (0, _module_widget_utils.foreachDataLevel)(treeItems, function (items) {
      items.sort(compareItems);
    }, 0, 'items');
    return treeItems;
  },
  _renderFieldsTreeView: function _renderFieldsTreeView(container) {
    var that = this;
    var dataSource = that._dataSource;
    var treeView = that._createComponent(container, _tree_view.default, {
      dataSource: that._createFieldsDataSource(dataSource),
      showCheckBoxesMode: 'normal',
      expandNodesRecursive: false,
      searchEnabled: that.option('allowSearch'),
      searchTimeout: that.option('searchTimeout'),
      useNativeScrolling: false,
      itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
        var _a;
        var $item = (0, _renderer.default)('<div>').toggleClass(_const.CLASSES.area.field, !itemData.items).attr(_const.ATTRIBUTES.treeViewItem, true).data('field', itemData.field).appendTo(itemElement);
        if (itemData.icon) {
          (_a = (0, _icon.getImageContainer)(itemData.icon)) === null || _a === void 0 ? void 0 : _a.appendTo($item);
        }
        (0, _renderer.default)('<span>').text(itemData.text).appendTo($item);
      },
      onItemCollapsed: function onItemCollapsed(e) {
        var index = that._expandedPaths.indexOf(e.itemData.path);
        if (index >= 0) {
          that._expandedPaths.splice(index, 1);
        }
      },
      onItemExpanded: function onItemExpanded(e) {
        var index = that._expandedPaths.indexOf(e.itemData.path);
        if (index < 0) {
          that._expandedPaths.push(e.itemData.path);
        }
      },
      onItemSelectionChanged: function onItemSelectionChanged(e) {
        var data = e.itemData;
        var field;
        var fields;
        var needSelectDefaultItem = true;
        var area;
        if (data.items) {
          if (data.selected) {
            treeView.unselectItem(data);
            return;
          }
          that._processDemandState(function () {
            fields = getDimensionFields(data, dataSource.fields());
            for (var i = 0; i < fields.length; i += 1) {
              if (fields[i].area) {
                needSelectDefaultItem = false;
                break;
              }
            }
          });
          if (needSelectDefaultItem) {
            var item = getFirstItem(data, function (item) {
              return item.isDefault;
            }) || getFirstItem(data, function (item) {
              return (0, _type.isDefined)(item.index);
            });
            item && treeView.selectItem(item);
            return;
          }
        } else {
          field = dataSource.fields()[data.index];
          if (data.selected) {
            area = field.isMeasure ? 'data' : 'column';
          }
          if (field) {
            fields = [field];
          }
        }
        that._applyChanges(fields, {
          area: area,
          areaIndex: undefined
        });
      }
    });
    var dataChanged = function dataChanged() {
      var scrollable = getScrollable(container);
      var scrollTop = scrollable ? scrollable.scrollTop() : 0;
      treeView.option({
        dataSource: that._createFieldsDataSource(dataSource)
      });
      scrollable = getScrollable(container);
      if (scrollable) {
        scrollable.scrollTo({
          y: scrollTop
        });
        scrollable.update();
      }
    };
    that._dataChangedHandlers.push(dataChanged);
  },
  _renderAreaFields: function _renderAreaFields($container, area) {
    var that = this;
    var dataSource = that._dataSource;
    var fields = dataSource ? (0, _extend.extend)(true, [], dataSource.getAreaFields(area, true)) : [];
    $container.empty();
    (0, _iterator.each)(fields, function (_, field) {
      if (field.visible !== false) {
        that.renderField(field, true).appendTo($container);
      }
    });
  },
  _renderArea: function _renderArea(container, area) {
    var that = this;
    var $areaContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.self).appendTo(container);
    var $fieldsHeaderContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldListHeader).appendTo($areaContainer);
    var caption = that.option("texts.".concat(area, "Fields"));
    var $fieldsContent;
    var render;
    (0, _renderer.default)('<span>').addClass(_const.CLASSES.area.icon).addClass("dx-area-icon-".concat(area)).appendTo($fieldsHeaderContainer);
    (0, _renderer.default)('<span>').html('&nbsp;').appendTo($fieldsHeaderContainer);
    (0, _renderer.default)('<span>').addClass(_const.CLASSES.area.caption).text(caption).appendTo($fieldsHeaderContainer);
    var $fieldsContainer = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldList).addClass(_const.CLASSES.pivotGrid.dragAction).appendTo($areaContainer);
    if (area !== 'all') {
      $fieldsContainer.attr('group', area).attr(_const.ATTRIBUTES.allowScrolling, true);
      $fieldsContent = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldContainer).appendTo($fieldsContainer);
      render = function render() {
        that._renderAreaFields($fieldsContent, area);
      };
      that._dataChangedHandlers.push(render);
      render();
      $fieldsContainer.dxScrollable({
        useNative: false
      });
    } else {
      $areaContainer.addClass(_const.CLASSES.allFields);
      $fieldsContainer.addClass(_const.CLASSES.treeView.borderVisible);
      that._renderFieldsTreeView($fieldsContainer);
    }
  },
  _getSortableOptions: function _getSortableOptions() {
    // TODO
    return {};
  },
  _adjustSortableOnChangedArgs: function _adjustSortableOnChangedArgs() {},
  resetTreeView: function resetTreeView() {
    var treeView = this.$element().find(".".concat(_const.CLASSES.treeView.self)).dxTreeView('instance');
    if (treeView) {
      treeView.option('searchValue', '');
      treeView.collapseAll();
    }
  },
  applyChanges: function applyChanges() {
    var state = this.option('state');
    if ((0, _type.isDefined)(state)) {
      this._dataSource.state(state);
    }
  },
  cancelChanges: function cancelChanges() {
    var dataSource = this._dataSource;
    if (!dataSource.isLoading()) {
      this.option('state', dataSource.state());
      return true;
    }
    return false;
  },
  getDataSource: function getDataSource() {
    return this._dataSource;
  },
  updateDimensions: function updateDimensions() {
    var $scrollableElements = this.$element().find(".".concat(_const.CLASSES.area.self, " .").concat(_const.CLASSES.scrollable.self));
    $scrollableElements.dxScrollable('update');
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible && hasWindow) {
      this.updateDimensions();
    }
  }
});
exports.FieldChooser = FieldChooser;
(0, _component_registrator.default)('dxPivotGridFieldChooser', FieldChooser);
var _default = {
  FieldChooser: FieldChooser
};
exports.default = _default;
