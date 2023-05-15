!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/diagram/ui.diagram.context_menu.js"], ["../../core/renderer","../widget/ui.widget","../context_menu","./diagram.commands_manager","./ui.diagram.menu_helper","./diagram.bar","./diagram.importer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/diagram/ui.diagram.context_menu.js", ["../../core/renderer", "../widget/ui.widget", "../context_menu", "./diagram.commands_manager", "./ui.diagram.menu_helper", "./diagram.bar", "./diagram.importer"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _context_menu = _interopRequireDefault($__require("../context_menu"));
  var _diagram = _interopRequireDefault($__require("./diagram.commands_manager"));
  var _uiDiagram = _interopRequireDefault($__require("./ui.diagram.menu_helper"));
  var _diagram2 = _interopRequireDefault($__require("./diagram.bar"));
  var _diagram3 = $__require("./diagram.importer");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
            x: x,
            y: y,
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
          command: command
        });
      }
      if (name !== undefined) {
        this._onCustomCommandAction({
          name: name
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
    DiagramContextMenuWrapper: DiagramContextMenuWrapper,
    DiagramContextMenu: DiagramContextMenu
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../widget/ui.widget","../context_menu","./diagram.commands_manager","./ui.diagram.menu_helper","./diagram.bar","./diagram.importer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../widget/ui.widget"), require("../context_menu"), require("./diagram.commands_manager"), require("./ui.diagram.menu_helper"), require("./diagram.bar"), require("./diagram.importer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.diagram.context_menu.js.map