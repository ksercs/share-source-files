!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/form/ui.form.js"], ["../../core/renderer","../../events/core/events_engine","../../core/component_registrator","../../core/guid","../../core/utils/common","../../core/config","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../../events/visibility_change","../../core/element","../../localization/message","../widget/ui.widget","../editor/editor","../../core/utils/window","../validation_engine","./ui.form.items_runtime_info","../tab_panel","../scroll_view/ui.scrollable","../../core/utils/deferred","../themes","./ui.form.item_options_actions","../../core/resize_observer","./ui.form.layout_manager","./ui.form.utils","./ui.form.layout_manager.utils","./components/label","../validation_summary","../validation_group","./constants","../toolbar/constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/form/ui.form.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/component_registrator", "../../core/guid", "../../core/utils/common", "../../core/config", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/extend", "../../events/visibility_change", "../../core/element", "../../localization/message", "../widget/ui.widget", "../editor/editor", "../../core/utils/window", "../validation_engine", "./ui.form.items_runtime_info", "../tab_panel", "../scroll_view/ui.scrollable", "../../core/utils/deferred", "../themes", "./ui.form.item_options_actions", "../../core/resize_observer", "./ui.form.layout_manager", "./ui.form.utils", "./ui.form.layout_manager.utils", "./components/label", "../validation_summary", "../validation_group", "./constants", "../toolbar/constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _common = $__require("../../core/utils/common");
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _visibility_change = $__require("../../events/visibility_change");
  var _element = $__require("../../core/element");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _window = $__require("../../core/utils/window");
  var _validation_engine = _interopRequireDefault($__require("../validation_engine"));
  var _uiForm = _interopRequireDefault($__require("./ui.form.items_runtime_info"));
  var _tab_panel = _interopRequireDefault($__require("../tab_panel"));
  var _ui2 = _interopRequireDefault($__require("../scroll_view/ui.scrollable"));
  var _deferred = $__require("../../core/utils/deferred");
  var _themes = $__require("../themes");
  var _uiForm2 = _interopRequireDefault($__require("./ui.form.item_options_actions"));
  var _resize_observer = _interopRequireDefault($__require("../../core/resize_observer"));
  $__require("./ui.form.layout_manager");
  var _uiForm4 = $__require("./ui.form.utils");
  var _uiFormLayout_manager = $__require("./ui.form.layout_manager.utils");
  var _label = $__require("./components/label");
  $__require("../validation_summary");
  $__require("../validation_group");
  var _constants = $__require("./constants");
  var _constants2 = $__require("../toolbar/constants");
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
  var FOCUSED_STATE_CLASS = 'dx-state-focused';
  var ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ['items', 'isRequired', 'validationRules', 'visible'];
  var Form = _ui.default.inherit({
    _init: function _init() {
      this.callBase();
      this._cachedColCountOptions = [];
      this._itemsRunTimeInfo = new _uiForm.default();
      this._groupsColCount = [];
      this._attachSyncSubscriptions();
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        formID: 'dx-' + new _guid.default(),
        formData: {},
        colCount: 1,
        screenByWidth: _window.defaultScreenFactorFunc,
        colCountByScreen: undefined,
        labelLocation: 'left',
        readOnly: false,
        onFieldDataChanged: null,
        customizeItem: null,
        onEditorEnterKey: null,
        minColWidth: 200,
        alignItemLabels: true,
        alignItemLabelsInAllGroups: true,
        alignRootItemLabels: true,
        showColonAfterLabel: true,
        showRequiredMark: true,
        showOptionalMark: false,
        requiredMark: '*',
        optionalMark: _message.default.format('dxForm-optionalMark'),
        requiredMessage: _message.default.getFormatter('dxForm-requiredMessage'),
        showValidationSummary: false,
        items: undefined,
        scrollingEnabled: false,
        validationGroup: undefined,
        stylingMode: (0, _config.default)().editorStylingMode,
        labelMode: 'outside'
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          showColonAfterLabel: false,
          labelLocation: 'top'
        }
      }]);
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        formData: true,
        validationGroup: true
      });
    },
    _getGroupColCount: function _getGroupColCount($element) {
      return parseInt($element.attr(_constants.GROUP_COL_COUNT_ATTR));
    },
    _applyLabelsWidthByCol: function _applyLabelsWidthByCol($container, index) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var labelMarkOptions = arguments.length > 3 ? arguments[3] : undefined;
      var fieldItemClass = options.inOneColumn ? _constants.FIELD_ITEM_CLASS : _constants.FORM_FIELD_ITEM_COL_CLASS + index;
      var cssExcludeTabbedSelector = options.excludeTabbed ? ":not(.".concat(_constants.FIELD_ITEM_TAB_CLASS, ")") : '';
      (0, _label.setLabelWidthByMaxLabelWidth)($container, ".".concat(fieldItemClass).concat(cssExcludeTabbedSelector), labelMarkOptions);
      return;
    },
    _applyLabelsWidth: function _applyLabelsWidth($container, excludeTabbed, inOneColumn, colCount, labelMarkOptions) {
      colCount = inOneColumn ? 1 : colCount || this._getGroupColCount($container);
      var applyLabelsOptions = {
        excludeTabbed: excludeTabbed,
        inOneColumn: inOneColumn
      };
      var i;
      for (i = 0; i < colCount; i++) {
        this._applyLabelsWidthByCol($container, i, applyLabelsOptions, labelMarkOptions);
      }
    },
    _getGroupElementsInColumn: function _getGroupElementsInColumn($container, columnIndex, colCount) {
      var cssColCountSelector = (0, _type.isDefined)(colCount) ? '.' + _constants.GROUP_COL_COUNT_CLASS + colCount : '';
      var groupSelector = '.' + _constants.FORM_FIELD_ITEM_COL_CLASS + columnIndex + ' > .' + _constants.FIELD_ITEM_CONTENT_CLASS + ' > .' + _constants.FORM_GROUP_CLASS + cssColCountSelector;
      return $container.find(groupSelector);
    },
    _applyLabelsWidthWithGroups: function _applyLabelsWidthWithGroups($container, colCount, excludeTabbed, labelMarkOptions) {
      if (this.option('alignRootItemLabels') === true) {
        // TODO: private option
        var $rootSimpleItems = $container.find(".".concat(_constants.ROOT_SIMPLE_ITEM_CLASS));
        for (var colIndex = 0; colIndex < colCount; colIndex++) {
          // TODO: root items are aligned with root items only
          // this code doesn't align root items with grouped items in the same column
          // (see T942517)
          this._applyLabelsWidthByCol($rootSimpleItems, colIndex, excludeTabbed, labelMarkOptions);
        }
      }
      var alignItemLabelsInAllGroups = this.option('alignItemLabelsInAllGroups');
      if (alignItemLabelsInAllGroups) {
        this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed, labelMarkOptions);
      } else {
        var $groups = this.$element().find('.' + _constants.FORM_GROUP_CLASS);
        var i;
        for (i = 0; i < $groups.length; i++) {
          this._applyLabelsWidth($groups.eq(i), excludeTabbed, undefined, undefined, labelMarkOptions);
        }
      }
    },
    _applyLabelsWidthWithNestedGroups: function _applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed, labelMarkOptions) {
      var applyLabelsOptions = {
        excludeTabbed: excludeTabbed
      };
      var colIndex;
      var groupsColIndex;
      var groupColIndex;
      var $groupsByCol;
      for (colIndex = 0; colIndex < colCount; colIndex++) {
        $groupsByCol = this._getGroupElementsInColumn($container, colIndex);
        this._applyLabelsWidthByCol($groupsByCol, 0, applyLabelsOptions, labelMarkOptions);
        for (groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex++) {
          $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
          var groupColCount = this._getGroupColCount($groupsByCol);
          for (groupColIndex = 1; groupColIndex < groupColCount; groupColIndex++) {
            this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions, labelMarkOptions);
          }
        }
      }
    },
    _labelLocation: function _labelLocation() {
      return this.option('labelLocation');
    },
    _alignLabelsInColumn: function _alignLabelsInColumn(_ref) {
      var layoutManager = _ref.layoutManager,
          inOneColumn = _ref.inOneColumn,
          $container = _ref.$container,
          excludeTabbed = _ref.excludeTabbed,
          items = _ref.items;
      if (!(0, _window.hasWindow)() || this._labelLocation() === 'top') {
        // TODO: label location can be changed to 'left/right' for some labels
        // but this condition disables alignment for such items
        return;
      }
      var labelMarkOptions = (0, _uiFormLayout_manager.convertToLabelMarkOptions)(layoutManager._getMarkOptions());
      if (inOneColumn) {
        this._applyLabelsWidth($container, excludeTabbed, true, undefined, labelMarkOptions);
      } else {
        if (this._checkGrouping(items)) {
          this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed, labelMarkOptions);
        } else {
          this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount(), labelMarkOptions);
        }
      }
    },
    _prepareFormData: function _prepareFormData() {
      if (!(0, _type.isDefined)(this.option('formData'))) {
        this.option('formData', {});
      }
    },
    _setStylingModeClass: function _setStylingModeClass() {
      if (this.option('stylingMode') === 'underlined') {
        this.$element().addClass(_constants.FORM_UNDERLINED_CLASS);
      }
    },
    _initMarkup: function _initMarkup() {
      _validation_engine.default.addGroup(this._getValidationGroup());
      this._clearCachedInstances();
      this._prepareFormData();
      this.$element().addClass(_constants.FORM_CLASS);
      this._setStylingModeClass();
      this.callBase();
      this.setAria('role', 'form', this.$element());
      if (this.option('scrollingEnabled')) {
        this._renderScrollable();
      }
      this._renderLayout();
      this._renderValidationSummary();
      this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
      this._attachResizeObserverSubscription();
    },
    _attachResizeObserverSubscription: function _attachResizeObserverSubscription() {
      var _this = this;
      if ((0, _window.hasWindow)()) {
        var formRootElement = this.$element().get(0);
        _resize_observer.default.unobserve(formRootElement);
        _resize_observer.default.observe(formRootElement, function () {
          _this._resizeHandler();
        });
      }
    },
    _resizeHandler: function _resizeHandler() {
      if (this._cachedLayoutManagers.length) {
        (0, _iterator.each)(this._cachedLayoutManagers, function (_, layoutManager) {
          var _layoutManager$option;
          (_layoutManager$option = layoutManager.option('onLayoutChanged')) === null || _layoutManager$option === void 0 ? void 0 : _layoutManager$option(layoutManager.isSingleColumnMode());
        });
      }
    },
    _getCurrentScreenFactor: function _getCurrentScreenFactor() {
      return (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option('screenByWidth')) : 'lg';
    },
    _clearCachedInstances: function _clearCachedInstances() {
      this._itemsRunTimeInfo.clear();
      this._cachedLayoutManagers = [];
    },
    _alignLabels: function _alignLabels(layoutManager, inOneColumn) {
      this._alignLabelsInColumn({
        $container: this.$element(),
        layoutManager: layoutManager,
        excludeTabbed: true,
        items: this.option('items'),
        inOneColumn: inOneColumn
      });
      (0, _visibility_change.triggerResizeEvent)(this.$element().find(".".concat(_constants2.TOOLBAR_CLASS)));
    },
    _clean: function _clean() {
      this._clearValidationSummary();
      this.callBase();
      this._groupsColCount = [];
      this._cachedColCountOptions = [];
      this._lastMarkupScreenFactor = undefined;
      _resize_observer.default.unobserve(this.$element().get(0));
    },
    _renderScrollable: function _renderScrollable() {
      var useNativeScrolling = this.option('useNativeScrolling');
      this._scrollable = new _ui2.default(this.$element(), {
        useNative: !!useNativeScrolling,
        useSimulatedScrollbar: !useNativeScrolling,
        useKeyboard: false,
        direction: 'both',
        bounceEnabled: false
      });
    },
    _getContent: function _getContent() {
      return this.option('scrollingEnabled') ? (0, _renderer.default)(this._scrollable.content()) : this.$element();
    },
    _clearValidationSummary: function _clearValidationSummary() {
      var _this$_$validationSum;
      (_this$_$validationSum = this._$validationSummary) === null || _this$_$validationSum === void 0 ? void 0 : _this$_$validationSum.remove();
      this._$validationSummary = undefined;
      this._validationSummary = undefined;
    },
    _renderValidationSummary: function _renderValidationSummary() {
      this._clearValidationSummary();
      if (this.option('showValidationSummary')) {
        this._$validationSummary = (0, _renderer.default)('<div>').addClass(_constants.FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
        this._validationSummary = this._$validationSummary.dxValidationSummary({
          validationGroup: this._getValidationGroup()
        }).dxValidationSummary('instance');
      }
    },
    _prepareItems: function _prepareItems(items, parentIsTabbedItem, currentPath, isTabs) {
      if (items) {
        var result = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var path = (0, _uiForm4.concatPaths)(currentPath, (0, _uiForm4.createItemPathByIndex)(i, isTabs));
          var itemRunTimeInfo = {
            item: item,
            itemIndex: i,
            path: path
          };
          var guid = this._itemsRunTimeInfo.add(itemRunTimeInfo);
          if ((0, _type.isString)(item)) {
            item = {
              dataField: item
            };
          }
          if ((0, _type.isObject)(item)) {
            var preparedItem = _extends({}, item);
            itemRunTimeInfo.preparedItem = preparedItem;
            preparedItem.guid = guid;
            this._tryPrepareGroupItem(preparedItem);
            this._tryPrepareTabbedItem(preparedItem, path);
            this._tryPrepareItemTemplate(preparedItem);
            if (parentIsTabbedItem) {
              preparedItem.cssItemClass = _constants.FIELD_ITEM_TAB_CLASS;
            }
            if (preparedItem.items) {
              preparedItem.items = this._prepareItems(preparedItem.items, parentIsTabbedItem, path);
            }
            result.push(preparedItem);
          } else {
            result.push(item);
          }
        }
        return result;
      }
    },
    _tryPrepareGroupItem: function _tryPrepareGroupItem(item) {
      var _this2 = this;
      if (item.itemType === 'group') {
        item.alignItemLabels = (0, _common.ensureDefined)(item.alignItemLabels, true);
        item._prepareGroupItemTemplate = function (itemTemplate) {
          if (item.template) {
            item.groupContentTemplate = _this2._getTemplate(itemTemplate);
          }
          item.template = _this2._itemGroupTemplate.bind(_this2, item);
        };
        item._prepareGroupItemTemplate(item.template);
      }
    },
    _tryPrepareTabbedItem: function _tryPrepareTabbedItem(item, path) {
      if (item.itemType === 'tabbed') {
        item.template = this._itemTabbedTemplate.bind(this, item);
        item.tabs = this._prepareItems(item.tabs, true, path, true);
      }
    },
    _tryPrepareItemTemplate: function _tryPrepareItemTemplate(item) {
      if (item.template) {
        item.template = this._getTemplate(item.template);
      }
    },
    _checkGrouping: function _checkGrouping(items) {
      if (items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item.itemType === 'group') {
            return true;
          }
        }
      }
    },
    _renderLayout: function _renderLayout() {
      var that = this;
      var items = that.option('items');
      var $content = that._getContent();

      // TODO: Introduce this.preparedItems and use it for partial rerender???
      // Compare new preparedItems with old preparedItems to detect what should be rerendered?
      items = that._prepareItems(items);

      //#DEBUG
      that._testResultItems = items;
      //#ENDDEBUG

      that._rootLayoutManager = that._renderLayoutManager($content, this._createLayoutManagerOptions(items, {
        isRoot: true,
        colCount: that.option('colCount'),
        alignItemLabels: that.option('alignItemLabels'),
        screenByWidth: this.option('screenByWidth'),
        colCountByScreen: this.option('colCountByScreen'),
        onLayoutChanged: function onLayoutChanged(inOneColumn) {
          that._alignLabels.bind(that)(that._rootLayoutManager, inOneColumn);
        },
        onContentReady: function onContentReady(e) {
          that._alignLabels(e.component, e.component.isSingleColumnMode());
        }
      }));
    },
    _tryGetItemsForTemplate: function _tryGetItemsForTemplate(item) {
      return item.items || [];
    },
    _itemTabbedTemplate: function _itemTabbedTemplate(item, e, $container) {
      var _this3 = this,
          _item$tabs;
      var $tabPanel = (0, _renderer.default)('<div>').appendTo($container);
      var tabPanelOptions = (0, _extend.extend)({}, item.tabPanelOptions, {
        dataSource: item.tabs,
        onItemRendered: function onItemRendered(args) {
          var _item$tabPanelOptions, _item$tabPanelOptions2;
          (_item$tabPanelOptions = item.tabPanelOptions) === null || _item$tabPanelOptions === void 0 ? void 0 : (_item$tabPanelOptions2 = _item$tabPanelOptions.onItemRendered) === null || _item$tabPanelOptions2 === void 0 ? void 0 : _item$tabPanelOptions2.call(_item$tabPanelOptions, args);
          (0, _visibility_change.triggerShownEvent)(args.itemElement);
        },
        itemTemplate: function itemTemplate(itemData, e, container) {
          var $container = (0, _renderer.default)(container);
          var alignItemLabels = (0, _common.ensureDefined)(itemData.alignItemLabels, true);
          var layoutManager = _this3._renderLayoutManager($container, _this3._createLayoutManagerOptions(_this3._tryGetItemsForTemplate(itemData), {
            colCount: itemData.colCount,
            alignItemLabels: alignItemLabels,
            screenByWidth: _this3.option('screenByWidth'),
            colCountByScreen: itemData.colCountByScreen,
            cssItemClass: itemData.cssItemClass,
            onLayoutChanged: function onLayoutChanged(inOneColumn) {
              _this3._alignLabelsInColumn({
                $container: $container,
                layoutManager: layoutManager,
                items: itemData.items,
                inOneColumn: inOneColumn
              });
            }
          }));
          if (_this3._itemsRunTimeInfo) {
            _this3._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid, {
              layoutManager: layoutManager
            });
          }
          if (alignItemLabels) {
            _this3._alignLabelsInColumn({
              $container: $container,
              layoutManager: layoutManager,
              items: itemData.items,
              inOneColumn: layoutManager.isSingleColumnMode()
            });
          }
        }
      });
      var tryUpdateTabPanelInstance = function tryUpdateTabPanelInstance(items, instance) {
        if (Array.isArray(items)) {
          items.forEach(function (item) {
            return _this3._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
              widgetInstance: instance
            });
          });
        }
      };
      var tabPanel = this._createComponent($tabPanel, _tab_panel.default, tabPanelOptions);
      (0, _renderer.default)($container).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
      tabPanel.on('optionChanged', function (e) {
        if (e.fullName === 'dataSource') {
          tryUpdateTabPanelInstance(e.value, e.component);
        }
      });
      tryUpdateTabPanelInstance([{
        guid: item.guid
      }].concat(_toConsumableArray((_item$tabs = item.tabs) !== null && _item$tabs !== void 0 ? _item$tabs : [])), tabPanel);
    },
    _itemGroupTemplate: function _itemGroupTemplate(item, options, $container) {
      var _this4 = this;
      var id = options.editorOptions.inputAttr.id;
      var $group = (0, _renderer.default)('<div>').toggleClass(_constants.FORM_GROUP_WITH_CAPTION_CLASS, (0, _type.isDefined)(item.caption) && item.caption.length).addClass(_constants.FORM_GROUP_CLASS).appendTo($container);
      var groupAria = {
        role: 'group',
        'labelledby': id
      };
      this.setAria(groupAria, $group);
      (0, _renderer.default)($container).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
      if (item.caption) {
        (0, _renderer.default)('<span>').addClass(_constants.FORM_GROUP_CAPTION_CLASS).text(item.caption).attr('id', id).appendTo($group);
      }
      var $groupContent = (0, _renderer.default)('<div>').addClass(_constants.FORM_GROUP_CONTENT_CLASS).appendTo($group);
      if (item.groupContentTemplate) {
        item._renderGroupContentTemplate = function () {
          $groupContent.empty();
          var data = {
            formData: _this4.option('formData'),
            component: _this4
          };
          item.groupContentTemplate.render({
            model: data,
            container: (0, _element.getPublicElement)($groupContent)
          });
        };
        item._renderGroupContentTemplate();
      } else {
        var layoutManager = this._renderLayoutManager($groupContent, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(item), {
          colCount: item.colCount,
          colCountByScreen: item.colCountByScreen,
          alignItemLabels: item.alignItemLabels,
          cssItemClass: item.cssItemClass
        }));
        this._itemsRunTimeInfo && this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
          layoutManager: layoutManager
        });
        var colCount = layoutManager._getColCount();
        if (!this._groupsColCount.includes(colCount)) {
          this._groupsColCount.push(colCount);
        }
        $group.addClass(_constants.GROUP_COL_COUNT_CLASS + colCount);
        $group.attr(_constants.GROUP_COL_COUNT_ATTR, colCount);
      }
    },
    _createLayoutManagerOptions: function _createLayoutManagerOptions(items, extendedLayoutManagerOptions) {
      var _this5 = this;
      return (0, _uiForm4.convertToLayoutManagerOptions)({
        form: this,
        formOptions: this.option(),
        $formElement: this.$element(),
        items: items,
        validationGroup: this._getValidationGroup(),
        extendedLayoutManagerOptions: extendedLayoutManagerOptions,
        onFieldDataChanged: function onFieldDataChanged(args) {
          if (!_this5._isDataUpdating) {
            _this5._triggerOnFieldDataChanged(args);
          }
        },
        onContentReady: function onContentReady(args) {
          _this5._itemsRunTimeInfo.addItemsOrExtendFrom(args.component._itemsRunTimeInfo);
          extendedLayoutManagerOptions.onContentReady && extendedLayoutManagerOptions.onContentReady(args);
        },
        onDisposing: function onDisposing(_ref2) {
          var component = _ref2.component;
          var nestedItemsRunTimeInfo = component.getItemsRunTimeInfo();
          _this5._itemsRunTimeInfo.removeItemsByItems(nestedItemsRunTimeInfo);
        },
        onFieldItemRendered: function onFieldItemRendered() {
          var _this5$_validationSum;
          (_this5$_validationSum = _this5._validationSummary) === null || _this5$_validationSum === void 0 ? void 0 : _this5$_validationSum.refreshValidationGroup();
        }
      });
    },
    _renderLayoutManager: function _renderLayoutManager($parent, layoutManagerOptions) {
      var _this6 = this;
      var baseColCountByScreen = {
        lg: layoutManagerOptions.colCount,
        md: layoutManagerOptions.colCount,
        sm: layoutManagerOptions.colCount,
        xs: 1
      };
      this._cachedColCountOptions.push({
        colCountByScreen: (0, _extend.extend)(baseColCountByScreen, layoutManagerOptions.colCountByScreen)
      });
      var $element = (0, _renderer.default)('<div>');
      $element.appendTo($parent);
      var instance = this._createComponent($element, 'dxLayoutManager', layoutManagerOptions);
      instance.on('autoColCountChanged', function () {
        _this6._clearAutoColCountChangedTimeout();
        _this6.autoColCountChangedTimeoutId = setTimeout(function () {
          return !_this6._disposed && _this6._refresh();
        }, 0);
      });
      this._cachedLayoutManagers.push(instance);
      return instance;
    },
    _getValidationGroup: function _getValidationGroup() {
      return this.option('validationGroup') || this;
    },
    _createComponent: function _createComponent($element, type, config) {
      var that = this;
      config = config || {};
      that._extendConfig(config, {
        readOnly: that.option('readOnly')
      });
      return that.callBase($element, type, config);
    },
    _attachSyncSubscriptions: function _attachSyncSubscriptions() {
      var that = this;
      that.on('optionChanged', function (args) {
        var optionFullName = args.fullName;
        if (optionFullName === 'formData') {
          if (!(0, _type.isDefined)(args.value)) {
            that._options.silent('formData', args.value = {});
          }
          that._triggerOnFieldDataChangedByDataSet(args.value);
        }
        if (that._cachedLayoutManagers.length) {
          (0, _iterator.each)(that._cachedLayoutManagers, function (index, layoutManager) {
            if (optionFullName === 'formData') {
              that._isDataUpdating = true;
              layoutManager.option('layoutData', args.value);
              that._isDataUpdating = false;
            }
            if (args.name === 'readOnly' || args.name === 'disabled') {
              layoutManager.option(optionFullName, args.value);
            }
          });
        }
      });
    },
    _optionChanged: function _optionChanged(args) {
      var splitFullName = args.fullName.split('.');

      // search() is used because the string can be ['items', ' items ', ' items .', 'items[0]', 'items[ 10 ] .', ...]
      if (splitFullName.length > 1 && splitFullName[0].search('items') !== -1 && this._itemsOptionChangedHandler(args)) {
        return;
      }
      if (splitFullName.length > 1 && splitFullName[0].search('formData') !== -1 && this._formDataOptionChangedHandler(args)) {
        return;
      }
      this._defaultOptionChangedHandler(args);
    },
    _defaultOptionChangedHandler: function _defaultOptionChangedHandler(args) {
      switch (args.name) {
        case 'formData':
          if (!this.option('items')) {
            this._invalidate();
          } else if ((0, _type.isEmptyObject)(args.value)) {
            this._resetValues();
          }
          break;
        case 'onFieldDataChanged':
          break;
        case 'items':
        case 'colCount':
        case 'onEditorEnterKey':
        case 'labelLocation':
        case 'labelMode':
        case 'alignItemLabels':
        case 'showColonAfterLabel':
        case 'customizeItem':
        case 'alignItemLabelsInAllGroups':
        case 'showRequiredMark':
        case 'showOptionalMark':
        case 'requiredMark':
        case 'optionalMark':
        case 'requiredMessage':
        case 'scrollingEnabled':
        case 'formID':
        case 'colCountByScreen':
        case 'screenByWidth':
        case 'stylingMode':
          this._invalidate();
          break;
        case 'showValidationSummary':
          this._renderValidationSummary();
          break;
        case 'minColWidth':
          if (this.option('colCount') === 'auto') {
            this._invalidate();
          }
          break;
        case 'alignRootItemLabels':
        case 'readOnly':
          break;
        case 'width':
          this.callBase(args);
          this._rootLayoutManager.option(args.name, args.value);
          this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
          break;
        case 'validationGroup':
          _validation_engine.default.removeGroup(args.previousValue || this);
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    },
    _itemsOptionChangedHandler: function _itemsOptionChangedHandler(args) {
      var nameParts = args.fullName.split('.');
      var value = args.value;
      var itemPath = this._getItemPath(nameParts);
      var item = this.option(itemPath);
      var optionNameWithoutPath = args.fullName.replace(itemPath + '.', '');
      var simpleOptionName = optionNameWithoutPath.split('.')[0].replace(/\[\d+]/, '');
      var itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
      var result = this._tryExecuteItemOptionAction(itemAction) || this._tryChangeLayoutManagerItemOption(args.fullName, value);
      if (!result && item) {
        this._changeItemOption(item, optionNameWithoutPath, value);
        var items = this._generateItemsFromData(this.option('items'));
        this.option('items', items);
        result = true;
      }
      return result;
    },
    _formDataOptionChangedHandler: function _formDataOptionChangedHandler(args) {
      var nameParts = args.fullName.split('.');
      var value = args.value;
      var dataField = nameParts.slice(1).join('.');
      var editor = this.getEditor(dataField);
      if (editor) {
        editor.option('value', value);
      } else {
        this._triggerOnFieldDataChanged({
          dataField: dataField,
          value: value
        });
      }
      return true;
    },
    _tryCreateItemOptionAction: function _tryCreateItemOptionAction(optionName, item, value, previousValue, itemPath) {
      if (optionName === 'tabs') {
        this._itemsRunTimeInfo.removeItemsByPathStartWith("".concat(itemPath, ".tabs"));
        value = this._prepareItems(value, true, itemPath, true); // preprocess user value as in _tryPrepareTabbedItem
      }

      return (0, _uiForm2.default)(optionName, {
        item: item,
        value: value,
        previousValue: previousValue,
        itemsRunTimeInfo: this._itemsRunTimeInfo
      });
    },
    _tryExecuteItemOptionAction: function _tryExecuteItemOptionAction(action) {
      return action && action.tryExecute();
    },
    _updateValidationGroupAndSummaryIfNeeded: function _updateValidationGroupAndSummaryIfNeeded(fullName) {
      var optionName = (0, _uiForm4.getOptionNameFromFullName)(fullName);
      if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.indexOf(optionName) > -1) {
        _validation_engine.default.addGroup(this._getValidationGroup());
        if (this.option('showValidationSummary')) {
          var _this$_validationSumm;
          (_this$_validationSumm = this._validationSummary) === null || _this$_validationSumm === void 0 ? void 0 : _this$_validationSumm.refreshValidationGroup();
        }
      }
    },
    _setLayoutManagerItemOption: function _setLayoutManagerItemOption(layoutManager, optionName, value, path) {
      var _this7 = this;
      if (this._updateLockCount > 0) {
        !layoutManager._updateLockCount && layoutManager.beginUpdate();
        var key = this._itemsRunTimeInfo.findKeyByPath(path);
        this.postponedOperations.add(key, function () {
          !layoutManager._disposed && layoutManager.endUpdate();
          return new _deferred.Deferred().resolve();
        });
      }
      var contentReadyHandler = function contentReadyHandler(e) {
        e.component.off('contentReady', contentReadyHandler);
        if ((0, _uiForm4.isFullPathContainsTabs)(path)) {
          var tabPath = (0, _uiForm4.tryGetTabPath)(path);
          var tabLayoutManager = _this7._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(tabPath);
          if (tabLayoutManager) {
            _this7._alignLabelsInColumn({
              items: tabLayoutManager.option('items'),
              layoutManager: tabLayoutManager,
              $container: tabLayoutManager.$element(),
              inOneColumn: tabLayoutManager.isSingleColumnMode()
            });
          }
        } else {
          _this7._alignLabels(_this7._rootLayoutManager, _this7._rootLayoutManager.isSingleColumnMode());
        }
      };
      layoutManager.on('contentReady', contentReadyHandler);
      layoutManager.option(optionName, value);
      this._updateValidationGroupAndSummaryIfNeeded(optionName);
    },
    _tryChangeLayoutManagerItemOption: function _tryChangeLayoutManagerItemOption(fullName, value) {
      var nameParts = fullName.split('.');
      var optionName = (0, _uiForm4.getOptionNameFromFullName)(fullName);
      if (optionName === 'items' && nameParts.length > 1) {
        var itemPath = this._getItemPath(nameParts);
        var layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(itemPath);
        if (layoutManager) {
          this._itemsRunTimeInfo.removeItemsByItems(layoutManager.getItemsRunTimeInfo());
          var items = this._prepareItems(value, false, itemPath);
          this._setLayoutManagerItemOption(layoutManager, optionName, items, itemPath);
          return true;
        }
      } else if (nameParts.length > 2) {
        var endPartIndex = nameParts.length - 2;
        var _itemPath = this._getItemPath(nameParts.slice(0, endPartIndex));
        var _layoutManager = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(_itemPath);
        if (_layoutManager) {
          var fullOptionName = (0, _uiForm4.getFullOptionName)(nameParts[endPartIndex], optionName);
          if (optionName === 'editorType') {
            // T903774
            if (_layoutManager.option(fullOptionName) !== value) {
              return false;
            }
          }
          if (optionName === 'visible') {
            // T874843
            var formItems = this.option((0, _uiForm4.getFullOptionName)(_itemPath, 'items'));
            if (formItems && formItems.length) {
              var layoutManagerItems = _layoutManager.option('items');
              formItems.forEach(function (item, index) {
                var layoutItem = layoutManagerItems[index];
                layoutItem.visibleIndex = item.visibleIndex;
              });
            }
          }
          this._setLayoutManagerItemOption(_layoutManager, fullOptionName, value, _itemPath);
          return true;
        }
      }
      return false;
    },
    _tryChangeLayoutManagerItemOptions: function _tryChangeLayoutManagerItemOptions(itemPath, options) {
      var _this8 = this;
      var result;
      this.beginUpdate();
      (0, _iterator.each)(options, function (optionName, optionValue) {
        result = _this8._tryChangeLayoutManagerItemOption((0, _uiForm4.getFullOptionName)(itemPath, optionName), optionValue);
        if (!result) {
          return false;
        }
      });
      this.endUpdate();
      return result;
    },
    _getItemPath: function _getItemPath(nameParts) {
      var itemPath = nameParts[0];
      var i;
      for (i = 1; i < nameParts.length; i++) {
        if (nameParts[i].search(/items\[\d+]|tabs\[\d+]/) !== -1) {
          itemPath += '.' + nameParts[i];
        } else {
          break;
        }
      }
      return itemPath;
    },
    _triggerOnFieldDataChanged: function _triggerOnFieldDataChanged(args) {
      this._createActionByOption('onFieldDataChanged')(args);
    },
    _triggerOnFieldDataChangedByDataSet: function _triggerOnFieldDataChangedByDataSet(data) {
      var that = this;
      if (data && (0, _type.isObject)(data)) {
        (0, _iterator.each)(data, function (dataField, value) {
          that._triggerOnFieldDataChanged({
            dataField: dataField,
            value: value
          });
        });
      }
    },
    _updateFieldValue: function _updateFieldValue(dataField, value) {
      if ((0, _type.isDefined)(this.option('formData'))) {
        var editor = this.getEditor(dataField);
        this.option('formData.' + dataField, value);
        if (editor) {
          var editorValue = editor.option('value');
          if (editorValue !== value) {
            editor.option('value', value);
          }
        }
      }
    },
    _generateItemsFromData: function _generateItemsFromData(items) {
      var formData = this.option('formData');
      var result = [];
      if (!items && (0, _type.isDefined)(formData)) {
        (0, _iterator.each)(formData, function (dataField) {
          result.push({
            dataField: dataField
          });
        });
      }
      if (items) {
        (0, _iterator.each)(items, function (index, item) {
          if ((0, _type.isObject)(item)) {
            result.push(item);
          } else {
            result.push({
              dataField: item
            });
          }
        });
      }
      return result;
    },
    _getItemByField: function _getItemByField(field, items) {
      var that = this;
      var fieldParts = (0, _type.isObject)(field) ? field : that._getFieldParts(field);
      var fieldName = fieldParts.fieldName;
      var fieldPath = fieldParts.fieldPath;
      var resultItem;
      if (items.length) {
        (0, _iterator.each)(items, function (index, item) {
          var itemType = item.itemType;
          if (fieldPath.length) {
            var path = fieldPath.slice();
            item = that._getItemByFieldPath(path, fieldName, item);
          } else if (itemType === 'group' && !(item.caption || item.name) || itemType === 'tabbed' && !item.name) {
            var subItemsField = that._getSubItemField(itemType);
            item.items = that._generateItemsFromData(item.items);
            item = that._getItemByField({
              fieldName: fieldName,
              fieldPath: fieldPath
            }, item[subItemsField]);
          }
          if ((0, _uiForm4.isEqualToDataFieldOrNameOrTitleOrCaption)(item, fieldName)) {
            resultItem = item;
            return false;
          }
        });
      }
      return resultItem;
    },
    _getFieldParts: function _getFieldParts(field) {
      var fieldSeparator = '.';
      var fieldName = field;
      var separatorIndex = fieldName.indexOf(fieldSeparator);
      var resultPath = [];
      while (separatorIndex !== -1) {
        resultPath.push(fieldName.substr(0, separatorIndex));
        fieldName = fieldName.substr(separatorIndex + 1);
        separatorIndex = fieldName.indexOf(fieldSeparator);
      }
      return {
        fieldName: fieldName,
        fieldPath: resultPath.reverse()
      };
    },
    _getItemByFieldPath: function _getItemByFieldPath(path, fieldName, item) {
      var that = this;
      var itemType = item.itemType;
      var subItemsField = that._getSubItemField(itemType);
      var isItemWithSubItems = itemType === 'group' || itemType === 'tabbed' || item.title;
      var result;
      do {
        if (isItemWithSubItems) {
          var name = item.name || item.caption || item.title;
          var isGroupWithName = (0, _type.isDefined)(name);
          var nameWithoutSpaces = (0, _uiForm4.getTextWithoutSpaces)(name);
          var pathNode = void 0;
          item[subItemsField] = that._generateItemsFromData(item[subItemsField]);
          if (isGroupWithName) {
            pathNode = path.pop();
          }
          if (!path.length) {
            result = that._getItemByField(fieldName, item[subItemsField]);
            if (result) {
              break;
            }
          }
          if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
            if (path.length) {
              result = that._searchItemInEverySubItem(path, fieldName, item[subItemsField]);
            }
          }
        } else {
          break;
        }
      } while (path.length && !(0, _type.isDefined)(result));
      return result;
    },
    _getSubItemField: function _getSubItemField(itemType) {
      return itemType === 'tabbed' ? 'tabs' : 'items';
    },
    _searchItemInEverySubItem: function _searchItemInEverySubItem(path, fieldName, items) {
      var that = this;
      var result;
      (0, _iterator.each)(items, function (index, groupItem) {
        result = that._getItemByFieldPath(path.slice(), fieldName, groupItem);
        if (result) {
          return false;
        }
      });
      if (!result) {
        result = false;
      }
      return result;
    },
    _changeItemOption: function _changeItemOption(item, option, value) {
      if ((0, _type.isObject)(item)) {
        item[option] = value;
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      var currentScreenFactor = this._getCurrentScreenFactor();
      if (this._lastMarkupScreenFactor !== currentScreenFactor) {
        if (this._isColCountChanged(this._lastMarkupScreenFactor, currentScreenFactor)) {
          this._targetScreenFactor = currentScreenFactor;
          this._refresh();
          this._targetScreenFactor = undefined;
        }
        this._lastMarkupScreenFactor = currentScreenFactor;
      }
    },
    _isColCountChanged: function _isColCountChanged(oldScreenSize, newScreenSize) {
      var isChanged = false;
      (0, _iterator.each)(this._cachedColCountOptions, function (index, item) {
        if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
          isChanged = true;
          return false;
        }
      });
      return isChanged;
    },
    _refresh: function _refresh() {
      var editorSelector = '.' + FOCUSED_STATE_CLASS + ' input, .' + FOCUSED_STATE_CLASS + ' textarea';
      _events_engine.default.trigger(this.$element().find(editorSelector), 'change');
      this.callBase();
    },
    _resetValues: function _resetValues() {
      this._itemsRunTimeInfo.each(function (_, itemRunTimeInfo) {
        if ((0, _type.isDefined)(itemRunTimeInfo.widgetInstance) && _editor.default.isEditor(itemRunTimeInfo.widgetInstance)) {
          itemRunTimeInfo.widgetInstance.reset();
          itemRunTimeInfo.widgetInstance.option('isValid', true);
        }
      });
      _validation_engine.default.resetGroup(this._getValidationGroup());
    },
    _updateData: function _updateData(data, value, isComplexData) {
      var that = this;
      var _data = isComplexData ? value : data;
      if ((0, _type.isObject)(_data)) {
        (0, _iterator.each)(_data, function (dataField, fieldValue) {
          that._updateData(isComplexData ? data + '.' + dataField : dataField, fieldValue, (0, _type.isObject)(fieldValue));
        });
      } else if ((0, _type.isString)(data)) {
        that._updateFieldValue(data, value);
      }
    },
    registerKeyHandler: function registerKeyHandler(key, handler) {
      this.callBase(key, handler);
      this._itemsRunTimeInfo.each(function (_, itemRunTimeInfo) {
        if ((0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
          itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler);
        }
      });
    },
    _focusTarget: function _focusTarget() {
      return this.$element().find('.' + _constants.FIELD_ITEM_CONTENT_CLASS + ' [tabindex]').first();
    },
    _visibilityChanged: function _visibilityChanged() {
      this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
    },
    _clearAutoColCountChangedTimeout: function _clearAutoColCountChangedTimeout() {
      if (this.autoColCountChangedTimeoutId) {
        clearTimeout(this.autoColCountChangedTimeoutId);
        this.autoColCountChangedTimeoutId = undefined;
      }
    },
    _dispose: function _dispose() {
      this._clearAutoColCountChangedTimeout();
      _validation_engine.default.removeGroup(this._getValidationGroup());
      this.callBase();
    },
    resetValues: function resetValues() {
      this._resetValues();
    },
    updateData: function updateData(data, value) {
      this._updateData(data, value);
    },
    getEditor: function getEditor(dataField) {
      return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) || this._itemsRunTimeInfo.findWidgetInstanceByName(dataField);
    },
    getButton: function getButton(name) {
      return this._itemsRunTimeInfo.findWidgetInstanceByName(name);
    },
    updateDimensions: function updateDimensions() {
      var that = this;
      var deferred = new _deferred.Deferred();
      if (that._scrollable) {
        that._scrollable.update().done(function () {
          deferred.resolveWith(that);
        });
      } else {
        deferred.resolveWith(that);
      }
      return deferred.promise();
    },
    itemOption: function itemOption(id, option, value) {
      var _this9 = this;
      var items = this._generateItemsFromData(this.option('items'));
      var item = this._getItemByField(id, items);
      var path = (0, _uiForm4.getItemPath)(items, item);
      if (!item) {
        return;
      }
      switch (arguments.length) {
        case 1:
          return item;
        case 3:
          {
            var itemAction = this._tryCreateItemOptionAction(option, item, value, item[option], path);
            this._changeItemOption(item, option, value);
            var fullName = (0, _uiForm4.getFullOptionName)(path, option);
            if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
              this.option('items', items);
            }
            break;
          }
        default:
          {
            if ((0, _type.isObject)(option)) {
              if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
                var allowUpdateItems;
                (0, _iterator.each)(option, function (optionName, optionValue) {
                  var itemAction = _this9._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
                  _this9._changeItemOption(item, optionName, optionValue);
                  if (!allowUpdateItems && !_this9._tryExecuteItemOptionAction(itemAction)) {
                    allowUpdateItems = true;
                  }
                });
                allowUpdateItems && this.option('items', items);
              }
            }
            break;
          }
      }
    },
    validate: function validate() {
      return _validation_engine.default.validateGroup(this._getValidationGroup());
    },
    getItemID: function getItemID(name) {
      return 'dx_' + this.option('formID') + '_' + (name || new _guid.default());
    },
    getTargetScreenFactor: function getTargetScreenFactor() {
      return this._targetScreenFactor;
    }
  });
  (0, _component_registrator.default)('dxForm', Form);
  var _default = Form;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/component_registrator","../../core/guid","../../core/utils/common","../../core/config","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../../events/visibility_change","../../core/element","../../localization/message","../widget/ui.widget","../editor/editor","../../core/utils/window","../validation_engine","./ui.form.items_runtime_info","../tab_panel","../scroll_view/ui.scrollable","../../core/utils/deferred","../themes","./ui.form.item_options_actions","../../core/resize_observer","./ui.form.layout_manager","./ui.form.utils","./ui.form.layout_manager.utils","./components/label","../validation_summary","../validation_group","./constants","../toolbar/constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/component_registrator"), require("../../core/guid"), require("../../core/utils/common"), require("../../core/config"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../../events/visibility_change"), require("../../core/element"), require("../../localization/message"), require("../widget/ui.widget"), require("../editor/editor"), require("../../core/utils/window"), require("../validation_engine"), require("./ui.form.items_runtime_info"), require("../tab_panel"), require("../scroll_view/ui.scrollable"), require("../../core/utils/deferred"), require("../themes"), require("./ui.form.item_options_actions"), require("../../core/resize_observer"), require("./ui.form.layout_manager"), require("./ui.form.utils"), require("./ui.form.layout_manager.utils"), require("./components/label"), require("../validation_summary"), require("../validation_group"), require("./constants"), require("../toolbar/constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.form.js.map