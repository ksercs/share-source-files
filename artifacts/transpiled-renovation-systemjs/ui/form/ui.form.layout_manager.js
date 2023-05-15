!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/form/ui.form.layout_manager.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","./ui.form.items_runtime_info","../../core/component_registrator","../../core/utils/type","../../core/utils/variable_wrapper","../../core/utils/window","../../core/utils/iterator","../../core/utils/extend","../../core/utils/array","../../core/utils/data","../../events/remove","../../localization/message","../widget/ui.widget","../responsive_box","./constants","../text_box","../number_box","../check_box","../date_box","../button","./components/field_item","./components/button_item","./components/empty_item","./ui.form.layout_manager.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/form/ui.form.layout_manager.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "./ui.form.items_runtime_info", "../../core/component_registrator", "../../core/utils/type", "../../core/utils/variable_wrapper", "../../core/utils/window", "../../core/utils/iterator", "../../core/utils/extend", "../../core/utils/array", "../../core/utils/data", "../../events/remove", "../../localization/message", "../widget/ui.widget", "../responsive_box", "./constants", "../text_box", "../number_box", "../check_box", "../date_box", "../button", "./components/field_item", "./components/button_item", "./components/empty_item", "./ui.form.layout_manager.utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _uiForm = _interopRequireDefault($__require("./ui.form.items_runtime_info"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _type = $__require("../../core/utils/type");
  var _variable_wrapper = _interopRequireDefault($__require("../../core/utils/variable_wrapper"));
  var _window = $__require("../../core/utils/window");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _array = $__require("../../core/utils/array");
  var _data = $__require("../../core/utils/data");
  var _remove = $__require("../../events/remove");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _responsive_box = _interopRequireDefault($__require("../responsive_box"));
  var _constants = $__require("./constants");
  $__require("../text_box");
  $__require("../number_box");
  $__require("../check_box");
  $__require("../date_box");
  $__require("../button");
  var _field_item = $__require("./components/field_item");
  var _button_item = $__require("./components/button_item");
  var _empty_item = $__require("./components/empty_item");
  var _uiFormLayout_manager = $__require("./ui.form.layout_manager.utils");
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
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  var FORM_EDITOR_BY_DEFAULT = 'dxTextBox';
  var LAYOUT_MANAGER_FIRST_ROW_CLASS = 'dx-first-row';
  var LAYOUT_MANAGER_LAST_ROW_CLASS = 'dx-last-row';
  var LAYOUT_MANAGER_FIRST_COL_CLASS = 'dx-first-col';
  var LAYOUT_MANAGER_LAST_COL_CLASS = 'dx-last-col';
  var LayoutManager = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        layoutData: {},
        readOnly: false,
        colCount: 1,
        colCountByScreen: undefined,
        labelLocation: 'left',
        onFieldDataChanged: null,
        onEditorEnterKey: null,
        customizeItem: null,
        alignItemLabels: true,
        minColWidth: 200,
        showRequiredMark: true,
        screenByWidth: null,
        showOptionalMark: false,
        requiredMark: '*',
        labelMode: 'outside',
        optionalMark: _message.default.format('dxForm-optionalMark'),
        requiredMessage: _message.default.getFormatter('dxForm-requiredMessage')
      });
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        layoutData: true,
        validationGroup: true
      });
    },
    _init: function _init() {
      var layoutData = this.option('layoutData');
      this.callBase();
      this._itemWatchers = [];
      this._itemsRunTimeInfo = new _uiForm.default();
      this._updateReferencedOptions(layoutData);
      this._initDataAndItems(layoutData);
    },
    _dispose: function _dispose() {
      this.callBase();
      this._cleanItemWatchers();
    },
    _initDataAndItems: function _initDataAndItems(initialData) {
      this._syncDataWithItems();
      this._updateItems(initialData);
    },
    _syncDataWithItems: function _syncDataWithItems() {
      var _this = this;
      var layoutData = this.option('layoutData');
      var userItems = this.option('items');
      if ((0, _type.isDefined)(userItems)) {
        userItems.forEach(function (item) {
          if (item.dataField && _this._getDataByField(item.dataField) === undefined) {
            var value;
            if (item.editorOptions) {
              value = item.editorOptions.value;
            }
            if ((0, _type.isDefined)(value) || item.dataField in layoutData) {
              _this._updateFieldValue(item.dataField, value);
            }
          }
        });
      }
    },
    _getDataByField: function _getDataByField(dataField) {
      return dataField ? this.option('layoutData.' + dataField) : null;
    },
    _isCheckboxUndefinedStateEnabled: function _isCheckboxUndefinedStateEnabled(_ref) {
      var allowIndeterminateState = _ref.allowIndeterminateState,
          editorType = _ref.editorType,
          dataField = _ref.dataField;
      if (allowIndeterminateState === true && editorType === 'dxCheckBox') {
        var nameParts = ['layoutData'].concat(_toConsumableArray(dataField.split('.')));
        var propertyName = nameParts.pop();
        var layoutData = this.option(nameParts.join('.'));
        return layoutData && propertyName in layoutData;
      }
      return false;
    },
    _updateFieldValue: function _updateFieldValue(dataField, value) {
      var layoutData = this.option('layoutData');
      var newValue = value;
      if (!_variable_wrapper.default.isWrapped(layoutData[dataField]) && (0, _type.isDefined)(dataField)) {
        this.option('layoutData.' + dataField, newValue);
      } else if (_variable_wrapper.default.isWritableWrapped(layoutData[dataField])) {
        newValue = (0, _type.isFunction)(newValue) ? newValue() : newValue;
        layoutData[dataField](newValue);
      }
      this._triggerOnFieldDataChanged({
        dataField: dataField,
        value: newValue
      });
    },
    _triggerOnFieldDataChanged: function _triggerOnFieldDataChanged(args) {
      this._createActionByOption('onFieldDataChanged')(args);
    },
    _updateItems: function _updateItems(layoutData) {
      var that = this;
      var userItems = this.option('items');
      var isUserItemsExist = (0, _type.isDefined)(userItems);
      var customizeItem = that.option('customizeItem');
      var items = isUserItemsExist ? userItems : this._generateItemsByData(layoutData);
      if ((0, _type.isDefined)(items)) {
        var processedItems = [];
        (0, _iterator.each)(items, function (index, item) {
          if (that._isAcceptableItem(item)) {
            item = that._processItem(item);
            customizeItem && customizeItem(item);
            if ((0, _type.isObject)(item) && _variable_wrapper.default.unwrap(item.visible) !== false) {
              processedItems.push(item);
            }
          }
        });
        if (!that._itemWatchers.length || !isUserItemsExist) {
          that._updateItemWatchers(items);
        }
        this._setItems(processedItems);
        this._sortItems();
      }
    },
    _cleanItemWatchers: function _cleanItemWatchers() {
      this._itemWatchers.forEach(function (dispose) {
        dispose();
      });
      this._itemWatchers = [];
    },
    _updateItemWatchers: function _updateItemWatchers(items) {
      var that = this;
      var watch = that._getWatch();
      items.forEach(function (item) {
        if ((0, _type.isObject)(item) && (0, _type.isDefined)(item.visible) && (0, _type.isFunction)(watch)) {
          that._itemWatchers.push(watch(function () {
            return _variable_wrapper.default.unwrap(item.visible);
          }, function () {
            that._updateItems(that.option('layoutData'));
            that.repaint();
          }, {
            skipImmediate: true
          }));
        }
      });
    },
    _generateItemsByData: function _generateItemsByData(layoutData) {
      var result = [];
      if ((0, _type.isDefined)(layoutData)) {
        (0, _iterator.each)(layoutData, function (dataField) {
          result.push({
            dataField: dataField
          });
        });
      }
      return result;
    },
    _isAcceptableItem: function _isAcceptableItem(item) {
      var itemField = item.dataField || item;
      var itemData = this._getDataByField(itemField);
      return !((0, _type.isFunction)(itemData) && !_variable_wrapper.default.isWrapped(itemData));
    },
    _processItem: function _processItem(item) {
      if (typeof item === 'string') {
        item = {
          dataField: item
        };
      }
      if (_typeof(item) === 'object' && !item.itemType) {
        item.itemType = _constants.SIMPLE_ITEM_TYPE;
      }
      if (!(0, _type.isDefined)(item.editorType) && (0, _type.isDefined)(item.dataField)) {
        var value = this._getDataByField(item.dataField);
        item.editorType = (0, _type.isDefined)(value) ? this._getEditorTypeByDataType((0, _type.type)(value)) : FORM_EDITOR_BY_DEFAULT;
      }
      if (item.editorType === 'dxCheckBox') {
        var _item$allowIndetermin;
        item.allowIndeterminateState = (_item$allowIndetermin = item.allowIndeterminateState) !== null && _item$allowIndetermin !== void 0 ? _item$allowIndetermin : true;
      }
      return item;
    },
    _getEditorTypeByDataType: function _getEditorTypeByDataType(dataType) {
      switch (dataType) {
        case 'number':
          return 'dxNumberBox';
        case 'date':
          return 'dxDateBox';
        case 'boolean':
          return 'dxCheckBox';
        default:
          return 'dxTextBox';
      }
    },
    _sortItems: function _sortItems() {
      (0, _array.normalizeIndexes)(this._items, 'visibleIndex');
      this._sortIndexes();
    },
    _sortIndexes: function _sortIndexes() {
      this._items.sort(function (itemA, itemB) {
        var indexA = itemA.visibleIndex;
        var indexB = itemB.visibleIndex;
        var result;
        if (indexA > indexB) {
          result = 1;
        } else if (indexA < indexB) {
          result = -1;
        } else {
          result = 0;
        }
        return result;
      });
    },
    _initMarkup: function _initMarkup() {
      this._itemsRunTimeInfo.clear();
      this.$element().addClass(_constants.FORM_LAYOUT_MANAGER_CLASS);
      this.callBase();
      this._renderResponsiveBox();
    },
    _renderResponsiveBox: function _renderResponsiveBox() {
      var that = this;
      var templatesInfo = [];
      if (that._items && that._items.length) {
        var colCount = that._getColCount();
        var $container = (0, _renderer.default)('<div>').appendTo(that.$element());
        that._prepareItemsWithMerging(colCount);
        var layoutItems = that._generateLayoutItems();
        that._responsiveBox = that._createComponent($container, _responsive_box.default, that._getResponsiveBoxConfig(layoutItems, colCount, templatesInfo));
        if (!(0, _window.hasWindow)()) {
          that._renderTemplates(templatesInfo);
        }
      }
    },
    _itemStateChangedHandler: function _itemStateChangedHandler(e) {
      this._refresh();
    },
    _renderTemplates: function _renderTemplates(templatesInfo) {
      var that = this;
      var itemsWithLabelTemplateCount = 0;
      templatesInfo.forEach(function (_ref2) {
        var _item$label;
        var item = _ref2.item;
        if (item !== null && item !== void 0 && (_item$label = item.label) !== null && _item$label !== void 0 && _item$label.template) {
          itemsWithLabelTemplateCount++;
        }
      });
      (0, _iterator.each)(templatesInfo, function (index, info) {
        switch (info.itemType) {
          case 'empty':
            (0, _empty_item.renderEmptyItem)(info);
            break;
          case 'button':
            that._renderButtonItem(info);
            break;
          default:
            {
              that._renderFieldItem(info, itemsWithLabelTemplateCount);
            }
        }
      });
    },
    _getResponsiveBoxConfig: function _getResponsiveBoxConfig(layoutItems, colCount, templatesInfo) {
      var that = this;
      var colCountByScreen = that.option('colCountByScreen');
      var xsColCount = colCountByScreen && colCountByScreen.xs;
      return {
        onItemStateChanged: this._itemStateChangedHandler.bind(this),
        onLayoutChanged: function onLayoutChanged() {
          var onLayoutChanged = that.option('onLayoutChanged');
          var isSingleColumnMode = that.isSingleColumnMode();
          if (onLayoutChanged) {
            that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, isSingleColumnMode);
            onLayoutChanged(isSingleColumnMode);
          }
        },
        onContentReady: function onContentReady(e) {
          if ((0, _window.hasWindow)()) {
            that._renderTemplates(templatesInfo);
          }
          if (that.option('onLayoutChanged')) {
            that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, that.isSingleColumnMode(e.component));
          }
        },
        itemTemplate: function itemTemplate(e, itemData, itemElement) {
          if (!e.location) {
            return;
          }
          var $itemElement = (0, _renderer.default)(itemElement);
          var itemRenderedCountInPreviousRows = e.location.row * colCount;
          var item = that._items[e.location.col + itemRenderedCountInPreviousRows];
          if (!item) {
            return;
          }
          var itemCssClassList = [item.cssClass];
          $itemElement.toggleClass(_constants.SINGLE_COLUMN_ITEM_CONTENT, that.isSingleColumnMode(this));
          if (e.location.row === 0) {
            itemCssClassList.push(LAYOUT_MANAGER_FIRST_ROW_CLASS);
          }
          if (e.location.col === 0) {
            itemCssClassList.push(LAYOUT_MANAGER_FIRST_COL_CLASS);
          }
          if (item.itemType === _constants.SIMPLE_ITEM_TYPE && that.option('isRoot')) {
            $itemElement.addClass(_constants.ROOT_SIMPLE_ITEM_CLASS);
          }
          var isLastColumn = e.location.col === colCount - 1 || e.location.col + e.location.colspan === colCount;
          var rowsCount = that._getRowsCount();
          var isLastRow = e.location.row === rowsCount - 1;
          if (isLastColumn) {
            itemCssClassList.push(LAYOUT_MANAGER_LAST_COL_CLASS);
          }
          if (isLastRow) {
            itemCssClassList.push(LAYOUT_MANAGER_LAST_ROW_CLASS);
          }
          if (item.itemType !== 'empty') {
            itemCssClassList.push(_constants.FIELD_ITEM_CLASS);
            itemCssClassList.push(that.option('cssItemClass'));
            if ((0, _type.isDefined)(item.col)) {
              itemCssClassList.push('dx-col-' + item.col);
            }
          }
          templatesInfo.push({
            itemType: item.itemType,
            item: item,
            $parent: $itemElement,
            rootElementCssClassList: itemCssClassList
          });
        },
        cols: that._generateRatio(colCount),
        rows: that._generateRatio(that._getRowsCount(), true),
        dataSource: layoutItems,
        screenByWidth: that.option('screenByWidth'),
        singleColumnScreen: xsColCount ? false : 'xs'
      };
    },
    _getColCount: function _getColCount() {
      var colCount = this.option('colCount');
      var colCountByScreen = this.option('colCountByScreen');
      if (colCountByScreen) {
        var screenFactor = this.option('form').getTargetScreenFactor();
        if (!screenFactor) {
          screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option('screenByWidth')) : 'lg';
        }
        colCount = colCountByScreen[screenFactor] || colCount;
      }
      if (colCount === 'auto') {
        if (this._cashedColCount) {
          return this._cashedColCount;
        }
        this._cashedColCount = colCount = this._getMaxColCount();
      }
      return colCount < 1 ? 1 : colCount;
    },
    _getMaxColCount: function _getMaxColCount() {
      if (!(0, _window.hasWindow)()) {
        return 1;
      }
      var minColWidth = this.option('minColWidth');
      var width = (0, _size.getWidth)(this.$element());
      var itemsCount = this._items.length;
      var maxColCount = Math.floor(width / minColWidth) || 1;
      return itemsCount < maxColCount ? itemsCount : maxColCount;
    },
    isCachedColCountObsolete: function isCachedColCountObsolete() {
      return this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
    },
    _prepareItemsWithMerging: function _prepareItemsWithMerging(colCount) {
      var items = this._items.slice(0);
      var item;
      var itemsMergedByCol;
      var result = [];
      var j;
      var i;
      for (i = 0; i < items.length; i++) {
        item = items[i];
        result.push(item);
        if (this.option('alignItemLabels') || item.alignItemLabels || item.colSpan) {
          item.col = this._getColByIndex(result.length - 1, colCount);
        }
        if (item.colSpan > 1 && item.col + item.colSpan <= colCount) {
          itemsMergedByCol = [];
          for (j = 0; j < item.colSpan - 1; j++) {
            itemsMergedByCol.push({
              merged: true
            });
          }
          result = result.concat(itemsMergedByCol);
        } else {
          delete item.colSpan;
        }
      }
      this._setItems(result);
    },
    _getColByIndex: function _getColByIndex(index, colCount) {
      return index % colCount;
    },
    _setItems: function _setItems(items) {
      this._items = items;
      this._cashedColCount = null; // T923489
    },

    _generateLayoutItems: function _generateLayoutItems() {
      var items = this._items;
      var colCount = this._getColCount();
      var result = [];
      var item;
      var i;
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (!item.merged) {
          var generatedItem = {
            location: {
              row: parseInt(i / colCount),
              col: this._getColByIndex(i, colCount)
            }
          };
          if ((0, _type.isDefined)(item.disabled)) {
            generatedItem.disabled = item.disabled;
          }
          if ((0, _type.isDefined)(item.visible)) {
            generatedItem.visible = item.visible;
          }
          if ((0, _type.isDefined)(item.colSpan)) {
            generatedItem.location.colspan = item.colSpan;
          }
          if ((0, _type.isDefined)(item.rowSpan)) {
            generatedItem.location.rowspan = item.rowSpan;
          }
          result.push(generatedItem);
        }
      }
      return result;
    },
    _renderEmptyItem: function _renderEmptyItem($container) {
      (0, _empty_item.renderEmptyItem)({
        $container: $container
      });
    },
    _renderButtonItem: function _renderButtonItem(_ref3) {
      var item = _ref3.item,
          $parent = _ref3.$parent,
          rootElementCssClassList = _ref3.rootElementCssClassList;
      var _renderButtonItem2 = (0, _button_item.renderButtonItem)({
        item: item,
        $parent: $parent,
        rootElementCssClassList: rootElementCssClassList,
        validationGroup: this.option('validationGroup'),
        createComponentCallback: this._createComponent.bind(this)
      }),
          $rootElement = _renderButtonItem2.$rootElement,
          buttonInstance = _renderButtonItem2.buttonInstance;

      // TODO: try to remove '_itemsRunTimeInfo' from 'render' function
      this._itemsRunTimeInfo.add({
        item: item,
        widgetInstance: buttonInstance,
        // TODO: try to remove 'widgetInstance'
        guid: item.guid,
        $itemContainer: $rootElement
      });
    },
    _renderFieldItem: function _renderFieldItem(_ref4, itemsWithLabelTemplateCount) {
      var _this2 = this,
          _item$label2,
          _this$option;
      var item = _ref4.item,
          $parent = _ref4.$parent,
          rootElementCssClassList = _ref4.rootElementCssClassList;
      var editorValue = this._getDataByField(item.dataField);
      var canAssignUndefinedValueToEditor = false;
      if (editorValue === undefined) {
        var allowIndeterminateState = item.allowIndeterminateState,
            editorType = item.editorType,
            dataField = item.dataField;
        canAssignUndefinedValueToEditor = this._isCheckboxUndefinedStateEnabled({
          allowIndeterminateState: allowIndeterminateState,
          editorType: editorType,
          dataField: dataField
        });
      }
      var name = item.dataField || item.name;
      var formOrLayoutManager = this._getFormOrThis();
      var onLabelTemplateRendered = function onLabelTemplateRendered() {
        _this2._incTemplateRenderedCallCount();
        if (_this2._shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, itemsWithLabelTemplateCount)) {
          formOrLayoutManager._alignLabels(_this2, _this2.isSingleColumnMode(formOrLayoutManager));
        }
      };
      var _renderFieldItem2 = (0, _field_item.renderFieldItem)((0, _uiFormLayout_manager.convertToRenderFieldItemOptions)({
        $parent: $parent,
        rootElementCssClassList: rootElementCssClassList,
        item: item,
        name: name,
        editorValue: editorValue,
        canAssignUndefinedValueToEditor: canAssignUndefinedValueToEditor,
        formOrLayoutManager: this._getFormOrThis(),
        createComponentCallback: this._createComponent.bind(this),
        formLabelLocation: this.option('labelLocation'),
        requiredMessageTemplate: this.option('requiredMessage'),
        validationGroup: this.option('validationGroup'),
        editorValidationBoundary: this.option('validationBoundary'),
        editorStylingMode: this.option('form') && this.option('form').option('stylingMode'),
        showColonAfterLabel: this.option('showColonAfterLabel'),
        managerLabelLocation: this.option('labelLocation'),
        template: item.template ? this._getTemplate(item.template) : null,
        labelTemplate: (_item$label2 = item.label) !== null && _item$label2 !== void 0 && _item$label2.template ? this._getTemplate(item.label.template) : null,
        itemId: this.option('form') && this.option('form').getItemID(name),
        managerMarkOptions: this._getMarkOptions(),
        labelMode: this.option('labelMode'),
        onLabelTemplateRendered: onLabelTemplateRendered
      })),
          $fieldEditorContainer = _renderFieldItem2.$fieldEditorContainer,
          widgetInstance = _renderFieldItem2.widgetInstance,
          $rootElement = _renderFieldItem2.$rootElement;
      (_this$option = this.option('onFieldItemRendered')) === null || _this$option === void 0 ? void 0 : _this$option();
      if (widgetInstance && item.dataField) {
        // TODO: move to renderFieldItem ?
        this._bindDataField(widgetInstance, item.dataField, item.editorType, $fieldEditorContainer);
      }
      this._itemsRunTimeInfo.add({
        item: item,
        widgetInstance: widgetInstance,
        guid: item.guid,
        $itemContainer: $rootElement
      });
    },
    _incTemplateRenderedCallCount: function _incTemplateRenderedCallCount() {
      var _this$_labelTemplateR;
      this._labelTemplateRenderedCallCount = ((_this$_labelTemplateR = this._labelTemplateRenderedCallCount) !== null && _this$_labelTemplateR !== void 0 ? _this$_labelTemplateR : 0) + 1;
    },
    _shouldAlignLabelsOnTemplateRendered: function _shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, totalItemsWithLabelTemplate) {
      return formOrLayoutManager.option('templatesRenderAsynchronously') && this._labelTemplateRenderedCallCount === totalItemsWithLabelTemplate;
    },
    _getMarkOptions: function _getMarkOptions() {
      return {
        showRequiredMark: this.option('showRequiredMark'),
        requiredMark: this.option('requiredMark'),
        showOptionalMark: this.option('showOptionalMark'),
        optionalMark: this.option('optionalMark')
      };
    },
    _getFormOrThis: function _getFormOrThis() {
      return this.option('form') || this;
    },
    _bindDataField: function _bindDataField(editorInstance, dataField, editorType, $container) {
      var formOrThis = this._getFormOrThis();
      editorInstance.on('enterKey', function (args) {
        formOrThis._createActionByOption('onEditorEnterKey')((0, _extend.extend)(args, {
          dataField: dataField
        }));
      });
      this._createWatcher(editorInstance, $container, dataField);
      this.linkEditorToDataField(editorInstance, dataField, editorType);
    },
    _createWatcher: function _createWatcher(editorInstance, $container, dataField) {
      function compareArrays(array1, array2) {
        if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
          return false;
        }
        for (var i = 0; i < array1.length; i++) {
          if (array1[i] !== array2[i]) {
            return false;
          }
        }
        return true;
      }
      var that = this;
      var watch = that._getWatch();
      if (!(0, _type.isFunction)(watch)) {
        return;
      }
      var dispose = watch(function () {
        return that._getDataByField(dataField);
      }, function () {
        var fieldValue = that._getDataByField(dataField);
        if (editorInstance.NAME === 'dxTagBox') {
          var editorValue = editorInstance.option('value');
          if (fieldValue !== editorValue && compareArrays(fieldValue, editorValue)) {
            // handle array only, it can be wrapped into Proxy (T1020953)
            return;
          }
        }
        editorInstance.option('value', fieldValue);
      }, {
        deep: true,
        skipImmediate: true
      },
      ///#DEBUG
      {
        createWatcherDataField: dataField
        ///#ENDDEBUG
      });

      _events_engine.default.on($container, _remove.removeEvent, dispose);
    },
    _getWatch: function _getWatch() {
      if (!(0, _type.isDefined)(this._watch)) {
        var formInstance = this.option('form');
        this._watch = formInstance && formInstance.option('integrationOptions.watchMethod');
      }
      return this._watch;
    },
    _createComponent: function _createComponent($editor, type, editorOptions) {
      var readOnlyState = this.option('readOnly');
      var hasEditorReadOnly = Object.hasOwn(editorOptions, 'readOnly');
      var instance = this.callBase($editor, type, _extends({}, editorOptions, {
        readOnly: !hasEditorReadOnly ? readOnlyState : editorOptions.readOnly
      }));
      var isChangeByForm = false;
      instance.on('optionChanged', function (args) {
        if (args.name === 'readOnly' && !isChangeByForm) {
          hasEditorReadOnly = true;
        }
      });
      this.on('optionChanged', function (args) {
        if (args.name === 'readOnly' && !hasEditorReadOnly) {
          isChangeByForm = true;
          instance.option(args.name, args.value);
          isChangeByForm = false;
        }
      });
      return instance;
    },
    _generateRatio: function _generateRatio(count, isAutoSize) {
      var result = [];
      var ratio;
      var i;
      for (i = 0; i < count; i++) {
        ratio = {
          ratio: 1
        };
        if (isAutoSize) {
          ratio.baseSize = 'auto';
        }
        result.push(ratio);
      }
      return result;
    },
    _getRowsCount: function _getRowsCount() {
      return Math.ceil(this._items.length / this._getColCount());
    },
    _updateReferencedOptions: function _updateReferencedOptions(newLayoutData) {
      var _this3 = this;
      var layoutData = this.option('layoutData');
      if ((0, _type.isObject)(layoutData)) {
        Object.getOwnPropertyNames(layoutData).forEach(function (property) {
          return delete _this3._optionsByReference['layoutData.' + property];
        });
      }
      if ((0, _type.isObject)(newLayoutData)) {
        Object.getOwnPropertyNames(newLayoutData).forEach(function (property) {
          return _this3._optionsByReference['layoutData.' + property] = true;
        });
      }
    },
    _resetWidget: function _resetWidget(instance) {
      this._disableEditorValueChangedHandler = true;
      instance.reset();
      this._disableEditorValueChangedHandler = false;
      instance.option('isValid', true);
    },
    _optionChanged: function _optionChanged(args) {
      var _this4 = this;
      if (args.fullName.search('layoutData.') === 0) {
        return;
      }
      switch (args.name) {
        case 'showRequiredMark':
        case 'showOptionalMark':
        case 'requiredMark':
        case 'optionalMark':
          this._cashedRequiredConfig = null;
          this._invalidate();
          break;
        case 'layoutData':
          this._updateReferencedOptions(args.value);
          if (this.option('items')) {
            if (!(0, _type.isEmptyObject)(args.value)) {
              this._itemsRunTimeInfo.each(function (_, itemRunTimeInfo) {
                if ((0, _type.isDefined)(itemRunTimeInfo.item)) {
                  var dataField = itemRunTimeInfo.item.dataField;
                  if (dataField && (0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
                    var valueGetter = (0, _data.compileGetter)(dataField);
                    var dataValue = valueGetter(args.value);
                    var _itemRunTimeInfo$item = itemRunTimeInfo.item,
                        allowIndeterminateState = _itemRunTimeInfo$item.allowIndeterminateState,
                        editorType = _itemRunTimeInfo$item.editorType;
                    if (dataValue !== undefined || _this4._isCheckboxUndefinedStateEnabled({
                      allowIndeterminateState: allowIndeterminateState,
                      editorType: editorType,
                      dataField: dataField
                    })) {
                      itemRunTimeInfo.widgetInstance.option('value', dataValue);
                    } else {
                      _this4._resetWidget(itemRunTimeInfo.widgetInstance);
                    }
                  }
                }
              });
            }
          } else {
            this._initDataAndItems(args.value);
            this._invalidate();
          }
          break;
        case 'items':
          this._cleanItemWatchers();
          this._initDataAndItems(args.value);
          this._invalidate();
          break;
        case 'alignItemLabels':
        case 'labelLocation':
        case 'labelMode':
        case 'requiredMessage':
          this._invalidate();
          break;
        case 'customizeItem':
          this._updateItems(this.option('layoutData'));
          this._invalidate();
          break;
        case 'colCount':
        case 'colCountByScreen':
          this._resetColCount();
          break;
        case 'minColWidth':
          if (this.option('colCount') === 'auto') {
            this._resetColCount();
          }
          break;
        case 'readOnly':
          break;
        case 'width':
          this.callBase(args);
          if (this.option('colCount') === 'auto') {
            this._resetColCount();
          }
          break;
        case 'onFieldDataChanged':
          break;
        default:
          this.callBase(args);
      }
    },
    _resetColCount: function _resetColCount() {
      this._cashedColCount = null;
      this._invalidate();
    },
    linkEditorToDataField: function linkEditorToDataField(editorInstance, dataField) {
      var _this5 = this;
      this.on('optionChanged', function (args) {
        if (args.fullName === "layoutData.".concat(dataField)) {
          editorInstance._setOptionWithoutOptionChange('value', args.value);
        }
      });
      editorInstance.on('valueChanged', function (args) {
        // TODO: This need only for the KO integration
        var isValueReferenceType = (0, _type.isObject)(args.value) || Array.isArray(args.value);
        if (!_this5._disableEditorValueChangedHandler && !(isValueReferenceType && args.value === args.previousValue)) {
          _this5._updateFieldValue(dataField, args.value);
        }
      });
    },
    _dimensionChanged: function _dimensionChanged() {
      if (this.option('colCount') === 'auto' && this.isCachedColCountObsolete()) {
        this._eventsStrategy.fireEvent('autoColCountChanged');
      }
    },
    updateData: function updateData(data, value) {
      var that = this;
      if ((0, _type.isObject)(data)) {
        (0, _iterator.each)(data, function (dataField, fieldValue) {
          that._updateFieldValue(dataField, fieldValue);
        });
      } else if (typeof data === 'string') {
        that._updateFieldValue(data, value);
      }
    },
    getEditor: function getEditor(field) {
      return this._itemsRunTimeInfo.findWidgetInstanceByDataField(field) || this._itemsRunTimeInfo.findWidgetInstanceByName(field);
    },
    isSingleColumnMode: function isSingleColumnMode(component) {
      var responsiveBox = this._responsiveBox || component;
      if (responsiveBox) {
        return responsiveBox.option('currentScreenFactor') === responsiveBox.option('singleColumnScreen');
      }
    },
    getItemsRunTimeInfo: function getItemsRunTimeInfo() {
      return this._itemsRunTimeInfo;
    }
  });
  (0, _component_registrator.default)('dxLayoutManager', LayoutManager);
  var _default = LayoutManager;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","./ui.form.items_runtime_info","../../core/component_registrator","../../core/utils/type","../../core/utils/variable_wrapper","../../core/utils/window","../../core/utils/iterator","../../core/utils/extend","../../core/utils/array","../../core/utils/data","../../events/remove","../../localization/message","../widget/ui.widget","../responsive_box","./constants","../text_box","../number_box","../check_box","../date_box","../button","./components/field_item","./components/button_item","./components/empty_item","./ui.form.layout_manager.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("./ui.form.items_runtime_info"), require("../../core/component_registrator"), require("../../core/utils/type"), require("../../core/utils/variable_wrapper"), require("../../core/utils/window"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../../core/utils/array"), require("../../core/utils/data"), require("../../events/remove"), require("../../localization/message"), require("../widget/ui.widget"), require("../responsive_box"), require("./constants"), require("../text_box"), require("../number_box"), require("../check_box"), require("../date_box"), require("../button"), require("./components/field_item"), require("./components/button_item"), require("./components/empty_item"), require("./ui.form.layout_manager.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.form.layout_manager.js.map