"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerPanelModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _data = require("../../../../core/utils/data");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _toolbar = _interopRequireDefault(require("../../../../ui/toolbar"));
var _m_columns_view = require("../views/m_columns_view");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var HEADER_PANEL_CLASS = 'header-panel';
var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
var TOOLBAR_ARIA_LABEL = '-ariaToolbar';
var DEFAULT_TOOLBAR_ITEM_NAMES = ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'];
var members = {
  _getToolbarItems() {
    return [];
  },
  _getButtonContainer() {
    return (0, _renderer.default)('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  },
  _getToolbarButtonClass(specificClass) {
    var secondClass = specificClass ? " ".concat(specificClass) : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  },
  _getToolbarOptions() {
    var userToolbarOptions = this.option('toolbar');
    var options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
        disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
        onItemRendered(e) {
          var itemRenderedCallback = e.itemData.onItemRendered;
          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    var userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
    options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
    this.executeAction('onToolbarPreparing', options);
    if (options.toolbarOptions && !(0, _type.isDefined)(options.toolbarOptions.visible)) {
      var toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.length);
    }
    return options.toolbarOptions;
  },
  _normalizeToolbarItems(defaultItems, userItems) {
    defaultItems.forEach(function (button) {
      if (!DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
        throw new Error("Default toolbar item '".concat(button.name, "' is not added to DEFAULT_TOOLBAR_ITEM_NAMES"));
      }
    });
    var defaultProps = {
      location: 'after'
    };
    var isArray = Array.isArray(userItems);
    if (!(0, _type.isDefined)(userItems)) {
      return defaultItems;
    }
    if (!isArray) {
      userItems = [userItems];
    }
    var defaultButtonsByNames = {};
    defaultItems.forEach(function (button) {
      defaultButtonsByNames[button.name] = button;
    });
    var normalizedItems = userItems.map(function (button) {
      if ((0, _type.isString)(button)) {
        button = {
          name: button
        };
      }
      if ((0, _type.isDefined)(button.name)) {
        if ((0, _type.isDefined)(defaultButtonsByNames[button.name])) {
          button = (0, _extend.extend)(true, {}, defaultButtonsByNames[button.name], button);
        } else if (DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
          button = _extends(_extends({}, button), {
            visible: false
          });
        }
      }
      return (0, _extend.extend)(true, {}, defaultProps, button);
    });
    return isArray ? normalizedItems : normalizedItems[0];
  },
  _renderCore() {
    if (!this._toolbar) {
      var $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
      var label = _message.default.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
      var $toolbar = (0, _renderer.default)('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, _toolbar.default, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  },
  _columnOptionChanged: _common.noop,
  _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  },
  init() {
    this.callBase();
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  render() {
    this._toolbarOptions = this._getToolbarOptions();
    this.callBase.apply(this, arguments);
  },
  setToolbarItemDisabled(name, disabled) {
    var toolbar = this._toolbar;
    if (!toolbar) {
      return;
    }
    var items = toolbar.option('items') || [];
    var itemIndex = items.findIndex(function (item) {
      return item.name === name;
    });
    if (itemIndex < 0) {
      return;
    }
    var item = toolbar.option("items[".concat(itemIndex, "]"));
    toolbar.option("items[".concat(itemIndex, "].disabled"), disabled);
    if (item.options) {
      toolbar.option("items[".concat(itemIndex, "].options.disabled"), disabled);
    }
  },
  updateToolbarDimensions() {
    var _a;
    (_a = this._toolbar) === null || _a === void 0 ? void 0 : _a.updateDimensions();
  },
  getHeaderPanel() {
    return this.element();
  },
  getHeight() {
    return this.getElementHeight();
  },
  optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();
      args.handled = true;
    }
    if (args.name === 'toolbar') {
      args.handled = true;
      if (this._toolbar) {
        var parts = (0, _data.getPathParts)(args.fullName);
        var optionName = args.fullName.replace(/^toolbar\./, '');
        if (parts.length === 1) {
          // `toolbar` case
          var toolbarOptions = this._getToolbarOptions();
          this._toolbar.option(toolbarOptions);
        } else if (parts[1] === 'items') {
          if (parts.length === 2) {
            // `toolbar.items` case
            var _toolbarOptions = this._getToolbarOptions();
            this._toolbar.option('items', _toolbarOptions.items);
          } else if (parts.length === 3) {
            // `toolbar.items[i]` case
            var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);
            this._toolbar.option(optionName, normalizedItem);
          } else if (parts.length >= 4) {
            // `toolbar.items[i].prop` case
            this._toolbar.option(optionName, args.value);
          }
        } else {
          // `toolbar.visible`, `toolbar.disabled` case
          this._toolbar.option(optionName, args.value);
        }
      }
    }
    this.callBase(args);
  },
  isVisible() {
    return !!(this._toolbarOptions && this._toolbarOptions.visible);
  },
  allowDragging: _common.noop,
  hasGroupedColumns: _common.noop
};
var HeaderPanel = _m_columns_view.ColumnsView.inherit(members);
var headerPanelModule = {
  defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore() {
          this.callBase.apply(this, arguments);
          this.getView('headerPanel').updateToolbarDimensions();
        }
      }
    }
  }
};
exports.headerPanelModule = headerPanelModule;