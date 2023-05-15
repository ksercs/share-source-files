!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/html_editor/modules/toolbar.js"], ["devextreme-quill","../../../core/renderer","./base","../../toolbar","../../select_box","../../color_box/color_view","../../number_box","../../widget/ui.errors","./widget_collector","../../../core/utils/iterator","../../../core/utils/type","../../../core/utils/extend","../../../localization/message","../../../core/utils/inflector","../../../events/core/events_engine","../../../events/utils/index","../utils/table_helper","../utils/toolbar_helper"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/html_editor/modules/toolbar.js", ["devextreme-quill", "../../../core/renderer", "./base", "../../toolbar", "../../select_box", "../../color_box/color_view", "../../number_box", "../../widget/ui.errors", "./widget_collector", "../../../core/utils/iterator", "../../../core/utils/type", "../../../core/utils/extend", "../../../localization/message", "../../../core/utils/inflector", "../../../events/core/events_engine", "../../../events/utils/index", "../utils/table_helper", "../utils/toolbar_helper"], true, function ($__require, exports, module) {
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
  var _devextremeQuill = _interopRequireDefault($__require("devextreme-quill"));
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _base = _interopRequireDefault($__require("./base"));
  var _toolbar = _interopRequireDefault($__require("../../toolbar"));
  $__require("../../select_box");
  $__require("../../color_box/color_view");
  $__require("../../number_box");
  var _ui = _interopRequireDefault($__require("../../widget/ui.errors"));
  var _widget_collector = _interopRequireDefault($__require("./widget_collector"));
  var _iterator = $__require("../../../core/utils/iterator");
  var _type = $__require("../../../core/utils/type");
  var _extend = $__require("../../../core/utils/extend");
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _inflector = $__require("../../../core/utils/inflector");
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _index = $__require("../../../events/utils/index");
  var _table_helper = $__require("../utils/table_helper");
  var _toolbar_helper = $__require("../utils/toolbar_helper");
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
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var ToolbarModule = _base.default;
  if (_devextremeQuill.default) {
    var TOOLBAR_WRAPPER_CLASS = 'dx-htmleditor-toolbar-wrapper';
    var TOOLBAR_CLASS = 'dx-htmleditor-toolbar';
    var TOOLBAR_FORMAT_WIDGET_CLASS = 'dx-htmleditor-toolbar-format';
    var TOOLBAR_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-separator';
    var TOOLBAR_MENU_SEPARATOR_CLASS = 'dx-htmleditor-toolbar-menu-separator';
    var ACTIVE_FORMAT_CLASS = 'dx-format-active';
    var ICON_CLASS = 'dx-icon';
    var SELECTION_CHANGE_EVENT = 'selection-change';
    var USER_ACTION = 'user';
    var SILENT_ACTION = 'silent';
    var FORMAT_HOTKEYS = {
      66: 'bold',
      73: 'italic',
      85: 'underline'
    };
    var KEY_CODES = {
      b: 66,
      i: 73,
      u: 85
    };
    var localize = function localize(name) {
      return _message.default.format("dxHtmlEditor-".concat((0, _inflector.camelize)(name)));
    };
    var localizeValue = function localizeValue(value, name) {
      if (name === 'header') {
        var isHeaderValue = (0, _type.isDefined)(value) && value !== false;
        return isHeaderValue ? "".concat(localize('heading'), " ").concat(value) : localize('normalText');
      }
      return localize(value) || value;
    };
    ToolbarModule = /*#__PURE__*/function (_BaseModule) {
      _inheritsLoose(ToolbarModule, _BaseModule);
      function ToolbarModule(quill, options) {
        var _this;
        _this = _BaseModule.call(this, quill, options) || this;
        _this._toolbarWidgets = new _widget_collector.default();
        _this._formatHandlers = (0, _toolbar_helper.getFormatHandlers)(_assertThisInitialized(_this));
        _this._tableFormats = (0, _table_helper.getTableFormats)(quill);
        if ((0, _type.isDefined)(options.items)) {
          _this._addCallbacks();
          _this._renderToolbar();

          // NOTE: Fixes the synchronization of the states of items placed in a menu that is rendered postponed.
          // See bug t1117604: menu items' state could be updated after selection change before the menu is rendered.
          // We cannot just modify items' state using a toolbar api because of:
          // - runtime adding in-line styles for color formats' icon;
          // - "dx-format-active" class toggling (using elementAttr will trigger toolbar item rerendering);
          // - changing the value of non-button items.
          // Possible better solutions:
          // - rework or extend a toolbar menu api or life cycle;
          // - support a separate cache for toolbar items' state and apply it on each item's initialization.
          var toolbarMenu = _this.toolbarInstance._layoutStrategy._menu;
          if (toolbarMenu) {
            var _renderPopup = toolbarMenu._renderPopup;
            toolbarMenu._renderPopup = function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              _renderPopup.apply.apply(_renderPopup, [toolbarMenu].concat(args));
              toolbarMenu._popup.on('showing', function () {
                _this._updateToolbar(true);
              });
            };
          }
          _this.quill.on('editor-change', function (eventName, newValue, oldValue, eventSource) {
            var isSilentMode = eventSource === SILENT_ACTION && (0, _type.isEmptyObject)(_this.quill.getFormat());
            if (!isSilentMode) {
              var isSelectionChanged = eventName === SELECTION_CHANGE_EVENT;
              _this._updateToolbar(isSelectionChanged);
            }
          });
        }
        return _this;
      }
      var _proto = ToolbarModule.prototype;
      _proto._addCallbacks = function _addCallbacks() {
        this.addCleanCallback(this.clean.bind(this));
        this.editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this));
      };
      _proto._updateToolbar = function _updateToolbar(isSelectionChanged) {
        this.updateFormatWidgets(isSelectionChanged);
        this.updateHistoryWidgets();
        this.updateTableWidgets();
      };
      _proto._updateFormatWidget = function _updateFormatWidget(name, isApplied, formats) {
        var widget = this._toolbarWidgets.getByName(name);
        if (!widget) {
          return;
        }
        if (isApplied) {
          this._markActiveFormatWidget(name, widget, formats);
        } else {
          this._resetFormatWidget(name, widget);
          if (Object.prototype.hasOwnProperty.call(name)) {
            delete formats[name];
          }
        }
        this._toggleClearFormatting(isApplied || !(0, _type.isEmptyObject)(formats));
      };
      _proto._renderToolbar = function _renderToolbar() {
        var _this2 = this;
        var container = this.options.container || this._getContainer();
        this._$toolbar = (0, _renderer.default)('<div>').addClass(TOOLBAR_CLASS).appendTo(container);
        this._$toolbarContainer = (0, _renderer.default)(container).addClass(TOOLBAR_WRAPPER_CLASS);
        _events_engine.default.on(this._$toolbarContainer, (0, _index.addNamespace)('mousedown', this.editorInstance.NAME), function (e) {
          e.preventDefault();
        });
        this._subscribeFormatHotKeys();
        this.toolbarInstance = this.editorInstance._createComponent(this._$toolbar, _toolbar.default, this.toolbarConfig);
        this.editorInstance.on('optionChanged', function (_ref) {
          var name = _ref.name;
          if (name === 'readOnly' || name === 'disabled') {
            _this2.toolbarInstance.option('disabled', _this2.isInteractionDisabled);
          }
        });
      };
      _proto.isMultilineMode = function isMultilineMode() {
        var _this$options$multili;
        return (_this$options$multili = this.options.multiline) !== null && _this$options$multili !== void 0 ? _this$options$multili : true;
      };
      _proto.clean = function clean() {
        this._toolbarWidgets.clear();
        if (this._$toolbarContainer) {
          this._$toolbarContainer.empty().removeClass(TOOLBAR_WRAPPER_CLASS);
        }
      };
      _proto.repaint = function repaint() {
        this.toolbarInstance && this.toolbarInstance.repaint();
      };
      _proto._getContainer = function _getContainer() {
        var $container = (0, _renderer.default)('<div>');
        this.editorInstance.$element().prepend($container);
        return $container;
      };
      _proto._detectRenamedOptions = function _detectRenamedOptions(item) {
        var optionsInfo = [{
          newName: 'name',
          oldName: 'formatName'
        }, {
          newName: 'acceptedValues',
          oldName: 'formatValues'
        }];
        if ((0, _type.isObject)(item)) {
          (0, _iterator.each)(optionsInfo, function (index, optionName) {
            if (Object.prototype.hasOwnProperty.call(item, optionName.oldName)) {
              _ui.default.log('W1016', optionName.oldName, optionName.newName);
            }
          });
        }
      };
      _proto._subscribeFormatHotKeys = function _subscribeFormatHotKeys() {
        this.quill.keyboard.addBinding({
          which: KEY_CODES.b,
          shortKey: true
        }, this._handleFormatHotKey.bind(this));
        this.quill.keyboard.addBinding({
          which: KEY_CODES.i,
          shortKey: true
        }, this._handleFormatHotKey.bind(this));
        this.quill.keyboard.addBinding({
          which: KEY_CODES.u,
          shortKey: true
        }, this._handleFormatHotKey.bind(this));
      };
      _proto._handleFormatHotKey = function _handleFormatHotKey(range, context, _ref2) {
        var which = _ref2.which;
        var formatName = FORMAT_HOTKEYS[which];
        this._updateButtonState(formatName);
      };
      _proto._updateButtonState = function _updateButtonState(formatName) {
        var formatWidget = this._toolbarWidgets.getByName(formatName);
        var currentFormat = this.quill.getFormat();
        var formatValue = currentFormat[formatName];
        if (formatValue) {
          this._markActiveFormatWidget(formatName, formatWidget, currentFormat);
        } else {
          this._resetFormatWidget(formatName, formatWidget);
        }
      };
      _proto._prepareToolbarItems = function _prepareToolbarItems() {
        var _this3 = this;
        var resultItems = [];
        (0, _iterator.each)(this.options.items, function (index, item) {
          var newItem;
          _this3._detectRenamedOptions(item);
          if ((0, _type.isObject)(item)) {
            newItem = _this3._handleObjectItem(item);
          } else if ((0, _type.isString)(item)) {
            var buttonItemConfig = _this3._prepareButtonItemConfig(item);
            newItem = _this3._getToolbarItem(buttonItemConfig);
          }
          if (newItem) {
            resultItems.push(newItem);
          }
        });
        return resultItems;
      };
      _proto._handleObjectItem = function _handleObjectItem(item) {
        if (item.name && item.acceptedValues && this._isAcceptableItem(item.widget, 'dxSelectBox')) {
          var selectItemConfig = this._prepareSelectItemConfig(item);
          return this._getToolbarItem(selectItemConfig);
        } else if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
          var defaultButtonItemConfig = this._prepareButtonItemConfig(item.name);
          var buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
          return this._getToolbarItem(buttonItemConfig);
        } else {
          return this._getToolbarItem(item);
        }
      };
      _proto._isAcceptableItem = function _isAcceptableItem(widget, acceptableWidgetName) {
        return !widget || widget === acceptableWidgetName;
      };
      _proto._prepareButtonItemConfig = function _prepareButtonItemConfig(name) {
        var _ICON_MAP$name;
        var iconName = (_ICON_MAP$name = _toolbar_helper.ICON_MAP[name]) !== null && _ICON_MAP$name !== void 0 ? _ICON_MAP$name : name;
        var buttonText = (0, _inflector.titleize)(name);
        return {
          widget: 'dxButton',
          name: name,
          options: {
            hint: localize(buttonText),
            text: localize(buttonText),
            icon: iconName.toLowerCase(),
            onClick: this._formatHandlers[name] || (0, _toolbar_helper.getDefaultClickHandler)(this, name),
            stylingMode: 'text'
          },
          showText: 'inMenu'
        };
      };
      _proto._prepareSelectItemConfig = function _prepareSelectItemConfig(item) {
        var _this4 = this;
        var name = item.name,
            acceptedValues = item.acceptedValues;
        return (0, _extend.extend)(true, {
          widget: 'dxSelectBox',
          name: name,
          options: {
            stylingMode: 'filled',
            dataSource: acceptedValues,
            displayExpr: function displayExpr(value) {
              return localizeValue(value, name);
            },
            placeholder: localize(name),
            onValueChanged: function onValueChanged(e) {
              if (!_this4._isReset) {
                _this4._hideAdaptiveMenu();
                (0, _toolbar_helper.applyFormat)(_this4, [name, e.value, USER_ACTION], e.event);
                _this4._setValueSilent(e.component, e.value);
              }
            }
          }
        }, item);
      };
      _proto._hideAdaptiveMenu = function _hideAdaptiveMenu() {
        if (this.toolbarInstance.option('overflowMenuVisible')) {
          this.toolbarInstance.option('overflowMenuVisible', false);
        }
      };
      _proto._getToolbarItem = function _getToolbarItem(item) {
        var _this5 = this;
        var baseItem = {
          options: {
            onInitialized: function onInitialized(e) {
              if (item.name) {
                e.component.$element().addClass(TOOLBAR_FORMAT_WIDGET_CLASS);
                e.component.$element().toggleClass("dx-".concat(item.name.toLowerCase(), "-format"), !!item.name);
                _this5._toolbarWidgets.add(item.name, e.component);
              }
            },
            onDisposing: function onDisposing() {
              _this5._toolbarWidgets.remove(item.name);
            }
          }
        };
        return (0, _extend.extend)(true, {
          location: 'before',
          locateInMenu: 'auto'
        }, this._getDefaultConfig(item.name), item, baseItem);
      };
      _proto._getDefaultItemsConfig = function _getDefaultItemsConfig() {
        return {
          clear: {
            options: {
              disabled: true
            }
          },
          undo: {
            options: {
              disabled: true
            }
          },
          redo: {
            options: {
              disabled: true
            }
          },
          // ToDo: move it to the table module
          insertRowAbove: {
            options: {
              disabled: true
            }
          },
          insertRowBelow: {
            options: {
              disabled: true
            }
          },
          insertHeaderRow: {
            options: {
              disabled: true
            }
          },
          insertColumnLeft: {
            options: {
              disabled: true
            }
          },
          insertColumnRight: {
            options: {
              disabled: true
            }
          },
          deleteRow: {
            options: {
              disabled: true
            }
          },
          deleteColumn: {
            options: {
              disabled: true
            }
          },
          deleteTable: {
            options: {
              disabled: true
            }
          },
          cellProperties: {
            options: {
              disabled: true
            }
          },
          tableProperties: {
            options: {
              disabled: true
            }
          },
          separator: {
            template: function template(data, index, element) {
              (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS);
            },
            menuItemTemplate: function menuItemTemplate(data, index, element) {
              (0, _renderer.default)(element).addClass(TOOLBAR_MENU_SEPARATOR_CLASS);
            }
          }
        };
      };
      _proto._getDefaultConfig = function _getDefaultConfig(name) {
        return this._getDefaultItemsConfig()[name];
      };
      _proto.updateHistoryWidgets = function updateHistoryWidgets() {
        var historyModule = this.quill.history;
        if (!historyModule) {
          return;
        }
        var _historyModule$stack = historyModule.stack,
            undoOps = _historyModule$stack.undo,
            redoOps = _historyModule$stack.redo;
        this._updateManipulationWidget(this._toolbarWidgets.getByName('undo'), Boolean(undoOps.length));
        this._updateManipulationWidget(this._toolbarWidgets.getByName('redo'), Boolean(redoOps.length));
      };
      _proto.updateTableWidgets = function updateTableWidgets() {
        var _this6 = this;
        var table = this.quill.getModule('table');
        if (!table) {
          return;
        }
        var selection = this.quill.getSelection();
        var formats = selection && this.quill.getFormat(selection) || {};
        var isTableOperationsEnabled = this._tableFormats.some(function (format) {
          return Boolean(formats[format]);
        });
        _table_helper.TABLE_OPERATIONS.forEach(function (operationName) {
          var isInsertTable = operationName === 'insertTable';
          var widget = _this6._toolbarWidgets.getByName(operationName);
          _this6._updateManipulationWidget(widget, isInsertTable ? !isTableOperationsEnabled : isTableOperationsEnabled);
        });
      };
      _proto._updateManipulationWidget = function _updateManipulationWidget(widget, isOperationEnabled) {
        if (!widget) {
          return;
        }
        widget.option('disabled', !isOperationEnabled);
      };
      _proto.updateFormatWidgets = function updateFormatWidgets(isResetRequired) {
        var selection = this.quill.getSelection();
        if (!selection) {
          return;
        }
        var formats = this.quill.getFormat(selection);
        var hasFormats = !(0, _type.isEmptyObject)(formats);
        if (!hasFormats || isResetRequired) {
          this._resetFormatWidgets();
        }
        for (var formatName in formats) {
          var widgetName = this._getFormatWidgetName(formatName, formats);
          var formatWidget = this._toolbarWidgets.getByName(widgetName) || this._toolbarWidgets.getByName(formatName);
          if (!formatWidget) {
            continue;
          }
          this._markActiveFormatWidget(formatName, formatWidget, formats);
        }
        this._toggleClearFormatting(hasFormats || selection.length > 1);
      };
      _proto._markActiveFormatWidget = function _markActiveFormatWidget(name, widget, formats) {
        if (this._isColorFormat(name)) {
          this._updateColorWidget(name, formats[name]);
        }
        if ('value' in widget.option()) {
          this._setValueSilent(widget, formats[name]);
        } else {
          widget.$element().addClass(ACTIVE_FORMAT_CLASS);
        }
      };
      _proto._toggleClearFormatting = function _toggleClearFormatting(hasFormats) {
        var clearWidget = this._toolbarWidgets.getByName('clear');
        if (clearWidget) {
          clearWidget.option('disabled', !hasFormats);
        }
      };
      _proto._isColorFormat = function _isColorFormat(name) {
        return name === 'color' || name === 'background';
      };
      _proto._updateColorWidget = function _updateColorWidget(name, color) {
        var formatWidget = this._toolbarWidgets.getByName(name);
        if (!formatWidget) {
          return;
        }
        formatWidget.$element().find(".".concat(ICON_CLASS)).css('borderBottomColor', color || 'transparent');
      };
      _proto._getFormatWidgetName = function _getFormatWidgetName(name, formats) {
        var widgetName;
        switch (name) {
          case 'align':
            widgetName = name + (0, _inflector.titleize)(formats[name]);
            break;
          case 'list':
            widgetName = formats[name] + (0, _inflector.titleize)(name);
            break;
          case 'code-block':
            widgetName = 'codeBlock';
            break;
          case 'script':
            widgetName = formats[name] + name;
            break;
          case 'imageSrc':
            widgetName = 'image';
            break;
          default:
            widgetName = name;
        }
        return widgetName;
      };
      _proto._setValueSilent = function _setValueSilent(widget, value) {
        this._isReset = true;
        widget.option('value', value);
        this._isReset = false;
      };
      _proto._resetFormatWidgets = function _resetFormatWidgets() {
        var _this7 = this;
        this._toolbarWidgets.each(function (name, widget) {
          _this7._resetFormatWidget(name, widget);
        });
      };
      _proto._resetFormatWidget = function _resetFormatWidget(name, widget) {
        widget.$element().removeClass(ACTIVE_FORMAT_CLASS);
        if (this._isColorFormat(name)) {
          this._updateColorWidget(name);
        }
        if (name === 'clear') {
          widget.option('disabled', true);
        }
        if (widget.NAME === 'dxSelectBox') {
          this._setValueSilent(widget, null);
        }
      };
      _proto.addClickHandler = function addClickHandler(name, handler) {
        this._formatHandlers[name] = handler;
        var formatWidget = this._toolbarWidgets.getByName(name);
        if (formatWidget && formatWidget.NAME === 'dxButton') {
          formatWidget.option('onClick', handler);
        }
      };
      _createClass(ToolbarModule, [{
        key: "toolbarConfig",
        get: function get() {
          return {
            dataSource: this._prepareToolbarItems(),
            disabled: this.isInteractionDisabled,
            menuContainer: this._$toolbarContainer,
            multiline: this.isMultilineMode()
          };
        }
      }, {
        key: "isInteractionDisabled",
        get: function get() {
          return this.editorInstance.option('readOnly') || this.editorInstance.option('disabled');
        }
      }]);
      return ToolbarModule;
    }(_base.default);
  }
  var _default = ToolbarModule;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["devextreme-quill","../../../core/renderer","./base","../../toolbar","../../select_box","../../color_box/color_view","../../number_box","../../widget/ui.errors","./widget_collector","../../../core/utils/iterator","../../../core/utils/type","../../../core/utils/extend","../../../localization/message","../../../core/utils/inflector","../../../events/core/events_engine","../../../events/utils/index","../utils/table_helper","../utils/toolbar_helper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("devextreme-quill"), require("../../../core/renderer"), require("./base"), require("../../toolbar"), require("../../select_box"), require("../../color_box/color_view"), require("../../number_box"), require("../../widget/ui.errors"), require("./widget_collector"), require("../../../core/utils/iterator"), require("../../../core/utils/type"), require("../../../core/utils/extend"), require("../../../localization/message"), require("../../../core/utils/inflector"), require("../../../events/core/events_engine"), require("../../../events/utils/index"), require("../utils/table_helper"), require("../utils/toolbar_helper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.js.map