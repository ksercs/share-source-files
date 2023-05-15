!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/tree_list/selection/module.js"], ["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/extend","../../../../core/utils/type","../../../../ui/grid_core/ui.grid_core.selection","../module_core"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/tree_list/selection/module.js", ["../../../../core/renderer", "../../../../core/utils/common", "../../../../core/utils/extend", "../../../../core/utils/type", "../../../../ui/grid_core/ui.grid_core.selection", "../module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _common = $__require("../../../../core/utils/common");
  var _extend = $__require("../../../../core/utils/extend");
  var _type = $__require("../../../../core/utils/type");
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.selection");
  var _module_core = _interopRequireDefault($__require("../module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TREELIST_SELECT_ALL_CLASS = 'dx-treelist-select-all';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
  var originalRowClick = _uiGrid_core.selectionModule.extenders.views.rowsView._rowClick;
  var originalHandleDataChanged = _uiGrid_core.selectionModule.extenders.controllers.data._handleDataChanged;
  var nodeExists = function nodeExists(array, currentKey) {
    return !!array.filter(function (key) {
      return key === currentKey;
    }).length;
  };
  _module_core.default.registerModule('selection', (0, _extend.extend)(true, {}, _uiGrid_core.selectionModule, {
    defaultOptions: function defaultOptions() {
      return (0, _extend.extend)(true, _uiGrid_core.selectionModule.defaultOptions(), {
        selection: {
          showCheckBoxesMode: 'always',
          recursive: false
        }
      });
    },
    extenders: {
      controllers: {
        data: {
          _handleDataChanged: function _handleDataChanged(e) {
            var selectionController = this.getController('selection');
            var isRecursiveSelection = selectionController.isRecursiveSelection();
            if (isRecursiveSelection && (!e || e.changeType !== 'updateSelectionState')) {
              selectionController.updateSelectionState({
                selectedItemKeys: this.option('selectedRowKeys')
              });
            }
            originalHandleDataChanged.apply(this, arguments);
          },
          loadDescendants: function loadDescendants() {
            var that = this;
            var d = that.callBase.apply(that, arguments);
            var selectionController = that.getController('selection');
            var isRecursiveSelection = selectionController.isRecursiveSelection();
            if (isRecursiveSelection) {
              d.done(function () {
                selectionController.updateSelectionState({
                  selectedItemKeys: that.option('selectedRowKeys')
                });
              });
            }
            return d;
          }
        },
        selection: {
          init: function init() {
            this.callBase.apply(this, arguments);
            this._selectionStateByKey = {};
          },
          _getSelectionConfig: function _getSelectionConfig() {
            var _arguments = arguments,
                _this = this;
            var config = this.callBase.apply(this, arguments);
            var plainItems = config.plainItems;
            config.plainItems = function (cached) {
              var result;
              if (cached) {
                result = _this._dataController.getCachedStoreData();
              }
              result || (result = plainItems.apply(_this, _arguments).map(function (item) {
                return item.data;
              }));
              return result || [];
            };
            config.isItemSelected = function (item) {
              var key = _this._dataController.keyOf(item);
              return _this.isRowSelected(key);
            };
            config.isSelectableItem = function (item) {
              return !!item;
            };
            config.getItemData = function (item) {
              return item;
            };
            config.allowLoadByRange = function () {
              return false;
            };
            return config;
          },
          renderSelectCheckBoxContainer: function renderSelectCheckBoxContainer($container, model) {
            var that = this;
            var rowsView = that.component.getView('rowsView');
            $container.addClass(CELL_FOCUS_DISABLED_CLASS);
            var $checkbox = rowsView._renderSelectCheckBox($container, {
              value: model.row.isSelected,
              row: model.row,
              column: model.column
            });
            rowsView._attachCheckBoxClickEvent($checkbox);
          },
          _updateSelectColumn: _common.noop,
          _getSelectAllNodeKeys: function _getSelectAllNodeKeys() {
            var component = this.component;
            var root = component.getRootNode();
            var cache = {};
            var keys = [];
            var isRecursiveSelection = this.isRecursiveSelection();
            root && _module_core.default.foreachNodes(root.children, function (node) {
              if (node.key !== undefined && (node.visible || isRecursiveSelection)) {
                keys.push(node.key);
              }
              if (!node.visible) {
                return true;
              }
              return isRecursiveSelection ? false : component.isRowExpanded(node.key, cache);
            });
            return keys;
          },
          isSelectAll: function isSelectAll() {
            var selectedRowKeys = this.option('selectedRowKeys') || [];
            if (selectedRowKeys.length === 0) return false;
            var component = this.component;
            var visibleKeys = this._getSelectAllNodeKeys();
            var isRecursiveSelection = this.isRecursiveSelection();
            var hasIndeterminateState = false;
            var selectedVisibleKeys = visibleKeys.filter(function (key) {
              var isRowSelected = component.isRowSelected(key, isRecursiveSelection);
              if (isRowSelected === undefined) {
                hasIndeterminateState = true;
              }
              return isRowSelected;
            });
            if (!selectedVisibleKeys.length) {
              return hasIndeterminateState ? undefined : false;
            }
            if (selectedVisibleKeys.length === visibleKeys.length) {
              return true;
            }
            return undefined;
          },
          selectAll: function selectAll() {
            var _this2 = this;
            var visibleKeys = this._getSelectAllNodeKeys().filter(function (key) {
              return !_this2.isRowSelected(key);
            });
            this.focusedItemIndex(-1);
            return this.selectRows(visibleKeys, true);
          },
          deselectAll: function deselectAll() {
            var visibleKeys = this._getSelectAllNodeKeys();
            this.focusedItemIndex(-1);
            return this.deselectRows(visibleKeys);
          },
          selectedItemKeys: function selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
            var that = this;
            var selectedRowKeys = that.option('selectedRowKeys');
            var isRecursiveSelection = this.isRecursiveSelection();
            var normalizedArgs = isRecursiveSelection && that._normalizeSelectionArgs({
              keys: (0, _type.isDefined)(value) ? value : []
            }, preserve, !isDeselect);
            if (normalizedArgs && !(0, _common.equalByValue)(normalizedArgs.selectedRowKeys, selectedRowKeys)) {
              that._isSelectionNormalizing = true;
              return this.callBase(normalizedArgs.selectedRowKeys, false, false, false).always(function () {
                that._isSelectionNormalizing = false;
              }).done(function (items) {
                normalizedArgs.selectedRowsData = items;
                that._fireSelectionChanged(normalizedArgs);
              });
            }
            return this.callBase(value, preserve, isDeselect, isSelectAll);
          },
          changeItemSelection: function changeItemSelection(itemIndex, keyboardKeys) {
            var _this3 = this;
            var isRecursiveSelection = this.isRecursiveSelection();
            if (isRecursiveSelection && !keyboardKeys.shift) {
              var key = this._dataController.getKeyByRowIndex(itemIndex);
              return this.selectedItemKeys(key, true, this.isRowSelected(key)).done(function () {
                _this3.isRowSelected(key) && _this3.callBase(itemIndex, keyboardKeys, true);
              });
            }
            return this.callBase.apply(this, arguments);
          },
          _updateParentSelectionState: function _updateParentSelectionState(node, isSelected) {
            var that = this;
            var state = isSelected;
            var parentNode = node.parent;
            if (parentNode) {
              if (parentNode.children.length > 1) {
                if (isSelected === false) {
                  var hasSelectedState = parentNode.children.some(function (childNode) {
                    return that._selectionStateByKey[childNode.key];
                  });
                  state = hasSelectedState ? undefined : false;
                } else if (isSelected === true) {
                  var hasNonSelectedState = parentNode.children.some(function (childNode) {
                    return !that._selectionStateByKey[childNode.key];
                  });
                  state = hasNonSelectedState ? undefined : true;
                }
              }
              this._selectionStateByKey[parentNode.key] = state;
              if (parentNode.parent && parentNode.parent.level >= 0) {
                this._updateParentSelectionState(parentNode, state);
              }
            }
          },
          _updateChildrenSelectionState: function _updateChildrenSelectionState(node, isSelected) {
            var that = this;
            var children = node.children;
            children && children.forEach(function (childNode) {
              that._selectionStateByKey[childNode.key] = isSelected;
              if (childNode.children.length > 0) {
                that._updateChildrenSelectionState(childNode, isSelected);
              }
            });
          },
          _updateSelectionStateCore: function _updateSelectionStateCore(keys, isSelected) {
            var dataController = this._dataController;
            for (var i = 0; i < keys.length; i++) {
              this._selectionStateByKey[keys[i]] = isSelected;
              var node = dataController.getNodeByKey(keys[i]);
              if (node) {
                this._updateParentSelectionState(node, isSelected);
                this._updateChildrenSelectionState(node, isSelected);
              }
            }
          },
          _getSelectedParentKeys: function _getSelectedParentKeys(key, selectedItemKeys, useCash) {
            var selectedParentNode;
            var node = this._dataController.getNodeByKey(key);
            var parentNode = node && node.parent;
            var result = [];
            while (parentNode && parentNode.level >= 0) {
              result.unshift(parentNode.key);
              var isSelected = useCash ? !nodeExists(selectedItemKeys, parentNode.key) && this.isRowSelected(parentNode.key) : selectedItemKeys.indexOf(parentNode.key) >= 0;
              if (isSelected) {
                selectedParentNode = parentNode;
                result = this._getSelectedParentKeys(selectedParentNode.key, selectedItemKeys, useCash).concat(result);
                break;
              } else if (useCash) {
                break;
              }
              parentNode = parentNode.parent;
            }
            return selectedParentNode && result || [];
          },
          _getSelectedChildKeys: function _getSelectedChildKeys(key, keysToIgnore) {
            var _this4 = this;
            var childKeys = [];
            var node = this._dataController.getNodeByKey(key);
            node && _module_core.default.foreachNodes(node.children, function (childNode) {
              var ignoreKeyIndex = keysToIgnore.indexOf(childNode.key);
              if (ignoreKeyIndex < 0) {
                childKeys.push(childNode.key);
              }
              return ignoreKeyIndex > 0 || ignoreKeyIndex < 0 && _this4._selectionStateByKey[childNode.key] === undefined;
            });
            return childKeys;
          },
          _normalizeParentKeys: function _normalizeParentKeys(key, args) {
            var that = this;
            var keysToIgnore = [key];
            var parentNodeKeys = that._getSelectedParentKeys(key, args.selectedRowKeys);
            if (parentNodeKeys.length) {
              keysToIgnore = keysToIgnore.concat(parentNodeKeys);
              keysToIgnore.forEach(function (key) {
                var index = args.selectedRowKeys.indexOf(key);
                if (index >= 0) {
                  args.selectedRowKeys.splice(index, 1);
                }
              });
              var childKeys = that._getSelectedChildKeys(parentNodeKeys[0], keysToIgnore);
              args.selectedRowKeys = args.selectedRowKeys.concat(childKeys);
            }
          },
          _normalizeChildrenKeys: function _normalizeChildrenKeys(key, args) {
            var _this5 = this;
            var node = this._dataController.getNodeByKey(key);
            node && node.children.forEach(function (childNode) {
              var index = args.selectedRowKeys.indexOf(childNode.key);
              if (index >= 0) {
                args.selectedRowKeys.splice(index, 1);
              }
              _this5._normalizeChildrenKeys(childNode.key, args);
            });
          },
          _normalizeSelectedRowKeysCore: function _normalizeSelectedRowKeysCore(keys, args, preserve, isSelect) {
            var that = this;
            keys.forEach(function (key) {
              if (preserve && that.isRowSelected(key) === isSelect) {
                return;
              }
              that._normalizeChildrenKeys(key, args);
              var index = args.selectedRowKeys.indexOf(key);
              if (isSelect) {
                if (index < 0) {
                  args.selectedRowKeys.push(key);
                }
                args.currentSelectedRowKeys.push(key);
              } else {
                if (index >= 0) {
                  args.selectedRowKeys.splice(index, 1);
                }
                args.currentDeselectedRowKeys.push(key);
                that._normalizeParentKeys(key, args);
              }
            });
          },
          _normalizeSelectionArgs: function _normalizeSelectionArgs(args, preserve, isSelect) {
            var result;
            var keys = Array.isArray(args.keys) ? args.keys : [args.keys];
            var selectedRowKeys = this.option('selectedRowKeys') || [];
            if (keys.length) {
              result = {
                currentSelectedRowKeys: [],
                currentDeselectedRowKeys: [],
                selectedRowKeys: preserve ? selectedRowKeys.slice(0) : []
              };
              this._normalizeSelectedRowKeysCore(keys, result, preserve, isSelect);
            }
            return result;
          },
          _updateSelectedItems: function _updateSelectedItems(args) {
            this.updateSelectionState(args);
            this.callBase(args);
          },
          _fireSelectionChanged: function _fireSelectionChanged() {
            if (!this._isSelectionNormalizing) {
              this.callBase.apply(this, arguments);
            }
          },
          _isModeLeavesOnly: function _isModeLeavesOnly(mode) {
            return mode === 'leavesOnly';
          },
          _removeDuplicatedKeys: function _removeDuplicatedKeys(keys) {
            var result = [];
            var processedKeys = {};
            keys.forEach(function (key) {
              if (!processedKeys[key]) {
                processedKeys[key] = true;
                result.push(key);
              }
            });
            return result;
          },
          _getAllChildKeys: function _getAllChildKeys(key) {
            var childKeys = [];
            var node = this._dataController.getNodeByKey(key);
            node && _module_core.default.foreachNodes(node.children, function (childNode) {
              childKeys.push(childNode.key);
            }, true);
            return childKeys;
          },
          _getAllSelectedRowKeys: function _getAllSelectedRowKeys(keys) {
            var _this6 = this;
            var result = [];
            keys.forEach(function (key) {
              var parentKeys = _this6._getSelectedParentKeys(key, [], true);
              var childKeys = _this6._getAllChildKeys(key);
              result.push.apply(result, parentKeys.concat([key], childKeys));
            });
            result = this._removeDuplicatedKeys(result);
            return result;
          },
          _getParentSelectedRowKeys: function _getParentSelectedRowKeys(keys) {
            var that = this;
            var result = [];
            keys.forEach(function (key) {
              var parentKeys = that._getSelectedParentKeys(key, keys);
              !parentKeys.length && result.push(key);
            });
            return result;
          },
          _getLeafSelectedRowKeys: function _getLeafSelectedRowKeys(keys) {
            var that = this;
            var result = [];
            var dataController = that._dataController;
            keys.forEach(function (key) {
              var node = dataController.getNodeByKey(key);
              node && !node.hasChildren && result.push(key);
            });
            return result;
          },
          isRecursiveSelection: function isRecursiveSelection() {
            var selectionMode = this.option('selection.mode');
            var isRecursive = this.option('selection.recursive');
            return selectionMode === 'multiple' && isRecursive;
          },
          updateSelectionState: function updateSelectionState(options) {
            var removedItemKeys = options.removedItemKeys || [];
            var selectedItemKeys = options.selectedItemKeys || [];
            if (this.isRecursiveSelection()) {
              this._updateSelectionStateCore(removedItemKeys, false);
              this._updateSelectionStateCore(selectedItemKeys, true);
            }
          },
          isRowSelected: function isRowSelected(key, isRecursiveSelection) {
            var result = this.callBase.apply(this, arguments);
            isRecursiveSelection = isRecursiveSelection !== null && isRecursiveSelection !== void 0 ? isRecursiveSelection : this.isRecursiveSelection();
            if (!result && isRecursiveSelection) {
              if (key in this._selectionStateByKey) {
                return this._selectionStateByKey[key];
              }
              return false;
            }
            return result;
          },
          getSelectedRowKeys: function getSelectedRowKeys(mode) {
            var that = this;
            if (!that._dataController) {
              return [];
            }
            var selectedRowKeys = that.callBase.apply(that, arguments);
            if (mode) {
              if (this.isRecursiveSelection()) {
                selectedRowKeys = this._getAllSelectedRowKeys(selectedRowKeys);
              }
              if (mode !== 'all') {
                if (mode === 'excludeRecursive') {
                  selectedRowKeys = that._getParentSelectedRowKeys(selectedRowKeys);
                } else if (that._isModeLeavesOnly(mode)) {
                  selectedRowKeys = that._getLeafSelectedRowKeys(selectedRowKeys);
                }
              }
            }
            return selectedRowKeys;
          },
          getSelectedRowsData: function getSelectedRowsData(mode) {
            var that = this;
            var dataController = that._dataController;
            var selectedKeys = this.getSelectedRowKeys(mode) || [];
            var selectedRowsData = [];
            selectedKeys.forEach(function (key) {
              var node = dataController.getNodeByKey(key);
              node && selectedRowsData.push(node.data);
            });
            return selectedRowsData;
          },
          refresh: function refresh() {
            this._selectionStateByKey = {};
            return this.callBase.apply(this, arguments);
          }
        }
      },
      views: {
        columnHeadersView: {
          _processTemplate: function _processTemplate(template, options) {
            var that = this;
            var resultTemplate;
            var renderingTemplate = this.callBase(template, options);
            var firstDataColumnIndex = that._columnsController.getFirstDataColumnIndex();
            if (renderingTemplate && options.rowType === 'header' && options.column.index === firstDataColumnIndex) {
              resultTemplate = {
                render: function render(options) {
                  if (that.option('selection.mode') === 'multiple') {
                    that.renderSelectAll(options.container, options.model);
                  }
                  renderingTemplate.render(options);
                }
              };
            } else {
              resultTemplate = renderingTemplate;
            }
            return resultTemplate;
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          renderSelectAll: function renderSelectAll($cell, options) {
            $cell.addClass(TREELIST_SELECT_ALL_CLASS);
            this._renderSelectAllCheckBox($cell);
          },
          _isSortableElement: function _isSortableElement($target) {
            return this.callBase($target) && !$target.closest(".".concat(SELECT_CHECKBOX_CLASS)).length;
          }
        },
        rowsView: {
          _renderIcons: function _renderIcons($iconContainer, options) {
            this.callBase.apply(this, arguments);
            if (!options.row.isNewRow && this.option('selection.mode') === 'multiple') {
              this.getController('selection').renderSelectCheckBoxContainer($iconContainer, options);
            }
            return $iconContainer;
          },
          _rowClick: function _rowClick(e) {
            var $targetElement = (0, _renderer.default)(e.event.target);
            if (this.isExpandIcon($targetElement)) {
              this.callBase.apply(this, arguments);
            } else {
              // @ts-expect-error
              originalRowClick.apply(this, arguments);
            }
          }
        }
      }
    }
  }));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/extend","../../../../core/utils/type","../../../../ui/grid_core/ui.grid_core.selection","../module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/common"), require("../../../../core/utils/extend"), require("../../../../core/utils/type"), require("../../../../ui/grid_core/ui.grid_core.selection"), require("../module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map