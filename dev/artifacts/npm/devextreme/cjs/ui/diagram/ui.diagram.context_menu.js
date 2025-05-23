/**
* DevExtreme (cjs/ui/diagram/ui.diagram.context_menu.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _context_menu = _interopRequireDefault(require("../context_menu"));
var _diagram = _interopRequireDefault(require("./diagram.commands_manager"));
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.menu_helper"));
var _diagram2 = _interopRequireDefault(require("./diagram.bar"));
var _diagram3 = require("./diagram.importer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DIAGRAM_TOUCHBAR_CLASS = 'dx-diagram-touchbar';
var DIAGRAM_TOUCHBAR_OVERLAY_CLASS = 'dx-diagram-touchbar-overlay';
var DIAGRAM_TOUCHBAR_TARGET_CLASS = 'dx-diagram-touchbar-target';
var DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH = 800;
var DIAGRAM_TOUCHBAR_Y_OFFSET = 32;
var DiagramContextMenuWrapper = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(DiagramContextMenuWrapper, _Widget);
  function DiagramContextMenuWrapper() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = DiagramContextMenuWrapper.prototype;
  _proto._init = function _init() {
    _Widget.prototype._init.call(this);
    this._createOnVisibilityChangingAction();
    this._createOnInternalCommand();
    this._createOnCustomCommand();
    this._createOnItemClickAction();
    this._tempState = undefined;
    this._commands = [];
    this._commandToIndexMap = {};
    this.bar = new DiagramContextMenuBar(this);
  };
  _proto._initMarkup = function _initMarkup() {
    var _this = this;
    _Widget.prototype._initMarkup.call(this);
    this._commands = this._getCommands();
    this._commandToIndexMap = {};
    this._fillCommandToIndexMap(this._commands, []);
    this._$contextMenuTargetElement = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOUCHBAR_TARGET_CLASS).appendTo(this.$element());
    var $contextMenu = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._contextMenuInstance = this._createComponent($contextMenu, DiagramContextMenu, {
      isTouchBarMode: this._isTouchBarMode(),
      cssClass: this._isTouchBarMode() ? DIAGRAM_TOUCHBAR_CLASS : _uiDiagram.default.getContextMenuCssClass(),
      hideOnOutsideClick: false,
      showEvent: '',
      focusStateEnabled: false,
      items: this._commands,
      position: this._isTouchBarMode() ? {
        my: {
          x: 'center',
          y: 'bottom'
        },
        at: {
          x: 'center',
          y: 'top'
        },
        of: this._$contextMenuTargetElement
      } : {},
      itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
        _uiDiagram.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement);
      },
      onItemClick: function onItemClick(_ref) {
        var itemData = _ref.itemData;
        return _this._onItemClick(itemData);
      },
      onShowing: function onShowing(e) {
        if (_this._inOnShowing === true) return;
        _this._inOnShowing = true;
        _this._onVisibilityChangingAction({
          visible: true,
          component: _this
        });
        e.component.option('items', e.component.option('items'));
        delete _this._inOnShowing;
      }
    });
  };
  _proto._show = function _show(x, y, selection) {
    this._contextMenuInstance.hide();
    if (this._isTouchBarMode()) {
      this._$contextMenuTargetElement.show();
      if (!selection) {
        selection = {
          x,
          y,
          width: 0,
          height: 0
        };
      }
      var widthCorrection = selection.width > DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH ? 0 : (DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH - selection.width) / 2;
      this._$contextMenuTargetElement.css({
        left: selection.x - widthCorrection,
        top: selection.y - DIAGRAM_TOUCHBAR_Y_OFFSET,
        width: selection.width + 2 * widthCorrection,
        height: selection.height + 2 * DIAGRAM_TOUCHBAR_Y_OFFSET
      });
      this._contextMenuInstance.show();
    } else {
      this._contextMenuInstance.option('position', {
        offset: x + ' ' + y
      });
      this._contextMenuInstance.show();
    }
  };
  _proto._hide = function _hide() {
    this._$contextMenuTargetElement.hide();
    this._contextMenuInstance.hide();
  };
  _proto._isTouchBarMode = function _isTouchBarMode() {
    var _getDiagram = (0, _diagram3.getDiagram)(),
      Browser = _getDiagram.Browser;
    return Browser.TouchUI;
  };
  _proto._onItemClick = function _onItemClick(itemData) {
    var processed = false;
    if (this._onItemClickAction) {
      processed = this._onItemClickAction(itemData);
    }
    if (!processed) {
      _uiDiagram.default.onContextMenuItemClick(this, itemData, this._executeCommand.bind(this));
      this._contextMenuInstance.hide();
    }
  };
  _proto._executeCommand = function _executeCommand(command, name, value) {
    if (typeof command === 'number') {
      this.bar.raiseBarCommandExecuted(command, value);
    } else if (typeof command === 'string') {
      this._onInternalCommandAction({
        command
      });
    }
    if (name !== undefined) {
      this._onCustomCommandAction({
        name
      });
    }
  };
  _proto._createOnInternalCommand = function _createOnInternalCommand() {
    this._onInternalCommandAction = this._createActionByOption('onInternalCommand');
  };
  _proto._createOnCustomCommand = function _createOnCustomCommand() {
    this._onCustomCommandAction = this._createActionByOption('onCustomCommand');
  };
  _proto._getCommands = function _getCommands() {
    return _diagram.default.getContextMenuCommands(this.option('commands'));
  };
  _proto._fillCommandToIndexMap = function _fillCommandToIndexMap(commands, indexPath) {
    var _this2 = this;
    commands.forEach(function (command, index) {
      var commandIndexPath = indexPath.concat([index]);
      if (command.command !== undefined) {
        _this2._commandToIndexMap[command.command] = commandIndexPath;
      }
      if (Array.isArray(command.items)) {
        _this2._fillCommandToIndexMap(command.items, commandIndexPath);
      }
    });
  };
  _proto._setItemEnabled = function _setItemEnabled(key, enabled) {
    this._setItemVisible(key, enabled);
  };
  _proto._setItemVisible = function _setItemVisible(key, visible) {
    var itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItemVisible(this._contextMenuInstance, itemOptionText, visible);
  };
  _proto._setItemValue = function _setItemValue(key, value) {
    var itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItemValue(this._contextMenuInstance, itemOptionText, key, value);
  };
  _proto._setItemSubItems = function _setItemSubItems(key, items) {
    var itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItems(this._contextMenuInstance, itemOptionText, key, items);
  };
  _proto._setEnabled = function _setEnabled(enabled) {
    this._contextMenuInstance.option('disabled', !enabled);
  };
  _proto.isVisible = function isVisible() {
    return this._inOnShowing;
  };
  _proto._createOnVisibilityChangingAction = function _createOnVisibilityChangingAction() {
    this._onVisibilityChangingAction = this._createActionByOption('onVisibilityChanging');
  };
  _proto._createOnItemClickAction = function _createOnItemClickAction() {
    this._onItemClickAction = this._createActionByOption('onItemClick');
  };
  _proto._optionChanged = function _optionChanged(args) {
    switch (args.name) {
      case 'onVisibilityChanging':
        this._createOnVisibilityChangingAction();
        break;
      case 'onInternalCommand':
        this._createOnInternalCommand();
        break;
      case 'onCustomCommand':
        this._createOnCustomCommand();
        break;
      case 'onItemClick':
        this._createOnItemClickAction();
        break;
      case 'commands':
        this._invalidate();
        break;
      case 'export':
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  return DiagramContextMenuWrapper;
}(_ui.default);
var DiagramContextMenu = /*#__PURE__*/function (_ContextMenu) {
  _inheritsLoose(DiagramContextMenu, _ContextMenu);
  function DiagramContextMenu() {
    return _ContextMenu.apply(this, arguments) || this;
  }
  var _proto2 = DiagramContextMenu.prototype;
  _proto2._renderContextMenuOverlay = function _renderContextMenuOverlay() {
    var _this3 = this;
    _ContextMenu.prototype._renderContextMenuOverlay.call(this);
    if (this._overlay && this.option('isTouchBarMode')) {
      this._overlay && this._overlay.option('onShown', function () {
        var $content = (0, _renderer.default)(_this3._overlay.$content());
        $content.parent().addClass(DIAGRAM_TOUCHBAR_OVERLAY_CLASS);
      });
    }
  };
  return DiagramContextMenu;
}(_context_menu.default);
var DiagramContextMenuBar = /*#__PURE__*/function (_DiagramBar) {
  _inheritsLoose(DiagramContextMenuBar, _DiagramBar);
  function DiagramContextMenuBar(owner) {
    return _DiagramBar.call(this, owner) || this;
  }
  var _proto3 = DiagramContextMenuBar.prototype;
  _proto3.getCommandKeys = function getCommandKeys() {
    return this._getKeys(this._owner._commands);
  };
  _proto3.setItemValue = function setItemValue(key, value) {
    this._owner._setItemValue(key, value);
  };
  _proto3.setItemEnabled = function setItemEnabled(key, enabled) {
    this._owner._setItemEnabled(key, enabled);
  };
  _proto3.setItemVisible = function setItemVisible(key, visible) {
    this._owner._setItemVisible(key, visible);
  };
  _proto3.setItemSubItems = function setItemSubItems(key, items) {
    this._owner._setItemSubItems(key, items);
  };
  _proto3.setEnabled = function setEnabled(enabled) {
    this._owner._setEnabled(enabled);
  };
  _proto3.isVisible = function isVisible() {
    return this._owner.isVisible();
  };
  return DiagramContextMenuBar;
}(_diagram2.default);
var _default = {
  DiagramContextMenuWrapper,
  DiagramContextMenu
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
