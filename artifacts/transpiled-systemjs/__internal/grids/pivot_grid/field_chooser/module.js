!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/field_chooser/module.js"], ["../../../../core/renderer","../../../../core/utils/icon","../../../../core/utils/window","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../localization/message","../../../../core/component_registrator","../../../../ui/tree_view","../../../../ui/context_menu","../module_widget_utils","./module_base","../data_source/module","./const"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/field_chooser/module.js", ["../../../../core/renderer", "../../../../core/utils/icon", "../../../../core/utils/window", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../localization/message", "../../../../core/component_registrator", "../../../../ui/tree_view", "../../../../ui/context_menu", "../module_widget_utils", "./module_base", "../data_source/module", "./const"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.FieldChooser = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _icon = $__require("../../../../core/utils/icon");
  var _window = $__require("../../../../core/utils/window");
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _component_registrator = _interopRequireDefault($__require("../../../../core/component_registrator"));
  var _tree_view = _interopRequireDefault($__require("../../../../ui/tree_view"));
  var _context_menu = _interopRequireDefault($__require("../../../../ui/context_menu"));
  var _module_widget_utils = $__require("../module_widget_utils");
  var _module_base = $__require("./module_base");
  $__require("../data_source/module");
  var _const = $__require("./const");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/icon","../../../../core/utils/window","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../localization/message","../../../../core/component_registrator","../../../../ui/tree_view","../../../../ui/context_menu","../module_widget_utils","./module_base","../data_source/module","./const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/icon"), require("../../../../core/utils/window"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../localization/message"), require("../../../../core/component_registrator"), require("../../../../ui/tree_view"), require("../../../../ui/context_menu"), require("../module_widget_utils"), require("./module_base"), require("../data_source/module"), require("./const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map