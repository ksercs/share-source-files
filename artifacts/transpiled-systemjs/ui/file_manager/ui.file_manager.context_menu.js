!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/file_manager/ui.file_manager.context_menu.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/common","../widget/ui.widget","../context_menu/ui.context_menu","./ui.file_manager.common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/file_manager/ui.file_manager.context_menu.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/common", "../widget/ui.widget", "../context_menu/ui.context_menu", "./ui.file_manager.common"], true, function ($__require, exports, module) {
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
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _common = $__require("../../core/utils/common");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../context_menu/ui.context_menu"));
  var _uiFile_manager = $__require("./ui.file_manager.common");
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var FILEMANAGER_CONTEXT_MEMU_CLASS = 'dx-filemanager-context-menu';
  var DEFAULT_CONTEXT_MENU_ITEMS = {
    create: {},
    upload: {},
    download: {},
    rename: {},
    move: {},
    copy: {},
    delete: {},
    refresh: {
      beginGroup: true
    }
  };
  var DEFAULT_ITEM_ALLOWED_PROPERTIES = ['beginGroup', 'closeMenuOnClick', 'disabled', 'icon', 'selectable', 'selected', 'text', 'visible'];
  var FileManagerContextMenu = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerContextMenu, _Widget);
    function FileManagerContextMenu() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerContextMenu.prototype;
    _proto._initMarkup = function _initMarkup() {
      var _this = this;
      this._initActions();
      this._isVisible = false;
      var $menu = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._contextMenu = this._createComponent($menu, _ui2.default, {
        cssClass: FILEMANAGER_CONTEXT_MEMU_CLASS,
        showEvent: '',
        onItemClick: function onItemClick(args) {
          return _this._onContextMenuItemClick(args.itemData.name, args);
        },
        onShowing: function onShowing(e) {
          return _this._onContextMenuShowing(e);
        },
        onShown: function onShown() {
          return _this._onContextMenuShown();
        },
        onHidden: function onHidden() {
          return _this._onContextMenuHidden();
        }
      });
      _Widget.prototype._initMarkup.call(this);
    };
    _proto.showAt = function showAt(fileItems, element, event, target) {
      var itemData = target.itemData,
          itemElement = target.itemElement,
          _target$isActionButto = target.isActionButton,
          isActionButton = _target$isActionButto === void 0 ? false : _target$isActionButto;
      if (this._isVisible) {
        this._onContextMenuHidden();
      }
      this._menuShowingContext = {
        targetElement: itemElement,
        itemData: itemData,
        fileItems: fileItems,
        event: event,
        isActionButton: isActionButton
      };
      var position = {
        of: element,
        at: 'top left',
        my: 'top left',
        offset: ''
      };
      if (event) {
        position.offset = event.offsetX + ' ' + event.offsetY;
      } else {
        position.my = 'left top';
        position.at = 'left bottom';
        position.boundaryOffset = '1';
      }
      this._contextMenu.option({
        target: element,
        position: position
      });
      this._contextMenu.show();
    };
    _proto.createContextMenuItems = function createContextMenuItems(fileItems, contextMenuItems, targetFileItem) {
      var _this2 = this;
      this._targetFileItems = fileItems;
      this._targetFileItem = (0, _type.isDefined)(targetFileItem) ? targetFileItem : fileItems === null || fileItems === void 0 ? void 0 : fileItems[0];
      var result = [];
      var itemArray = contextMenuItems || this.option('items');
      itemArray.forEach(function (srcItem) {
        var commandName = (0, _type.isString)(srcItem) ? srcItem : srcItem.name;
        var item = _this2._configureItemByCommandName(commandName, srcItem, fileItems, _this2._targetFileItem);
        if (_this2._isContextMenuItemAvailable(item, fileItems)) {
          result.push(item);
        }
      });
      return result;
    };
    _proto._isContextMenuItemAvailable = function _isContextMenuItemAvailable(menuItem, fileItems) {
      if (!this._isDefaultItem(menuItem.name) || !menuItem._autoHide) {
        return (0, _common.ensureDefined)(menuItem.visible, true);
      }
      if (this._isIsolatedCreationItemCommand(menuItem.name) && fileItems && fileItems.length) {
        return false;
      }
      return this._commandManager.isCommandAvailable(menuItem.name, fileItems);
    };
    _proto._isIsolatedCreationItemCommand = function _isIsolatedCreationItemCommand(commandName) {
      return (commandName === 'create' || commandName === 'upload') && this.option('isolateCreationItemCommands');
    };
    _proto._isDefaultItem = function _isDefaultItem(commandName) {
      return !!DEFAULT_CONTEXT_MENU_ITEMS[commandName];
    };
    _proto._configureItemByCommandName = function _configureItemByCommandName(commandName, item, fileItems, targetFileItem) {
      if (!this._isDefaultItem(commandName)) {
        var res = (0, _extend.extend)(true, {}, item);
        res.originalItemData = item;
        this._addItemClickHandler(commandName, res);
        if (Array.isArray(item.items)) {
          res.items = this.createContextMenuItems(fileItems, item.items, targetFileItem);
        }
        return res;
      }
      var result = this._createMenuItemByCommandName(commandName);
      var defaultConfig = DEFAULT_CONTEXT_MENU_ITEMS[commandName];
      (0, _extend.extend)(result, defaultConfig);
      result.originalItemData = item;
      (0, _uiFile_manager.extendAttributes)(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
      if (!(0, _type.isDefined)(result.visible)) {
        result._autoHide = true;
      }
      if (commandName && !result.name) {
        (0, _extend.extend)(result, {
          name: commandName
        });
      }
      return result;
    };
    _proto._createMenuItemByCommandName = function _createMenuItemByCommandName(commandName) {
      var _this$_commandManager = this._commandManager.getCommandByName(commandName),
          text = _this$_commandManager.text,
          icon = _this$_commandManager.icon;
      var menuItem = {
        name: commandName,
        text: text,
        icon: icon
      };
      this._addItemClickHandler(commandName, menuItem);
      return menuItem;
    };
    _proto._addItemClickHandler = function _addItemClickHandler(commandName, contextMenuItem) {
      var _this3 = this;
      contextMenuItem.onItemClick = function (args) {
        return _this3._onContextMenuItemClick(commandName, args);
      };
    };
    _proto._onContextMenuItemClick = function _onContextMenuItemClick(commandName, args) {
      var _this$_targetFileItem;
      var changedArgs = (0, _extend.extend)(true, {}, args);
      changedArgs.itemData = args.itemData.originalItemData;
      changedArgs.fileSystemItem = (_this$_targetFileItem = this._targetFileItem) === null || _this$_targetFileItem === void 0 ? void 0 : _this$_targetFileItem.fileItem;
      changedArgs.viewArea = this.option('viewArea');
      this._actions.onItemClick(changedArgs);
      if (this._isDefaultItem(commandName)) {
        var targetFileItems = this._isIsolatedCreationItemCommand(commandName) ? null : this._targetFileItems;
        this._commandManager.executeCommand(commandName, targetFileItems);
      }
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onContextMenuHidden: this._createActionByOption('onContextMenuHidden'),
        onContextMenuShowing: this._createActionByOption('onContextMenuShowing'),
        onItemClick: this._createActionByOption('onItemClick')
      };
    };
    _proto._onContextMenuShowing = function _onContextMenuShowing(e) {
      if (this._isVisible) {
        this._onContextMenuHidden(true);
      }
      e = (0, _extend.extend)(e, this._menuShowingContext, {
        options: this.option(),
        cancel: false
      });
      this._actions.onContextMenuShowing(e);
      if (!e.cancel) {
        var items = this.createContextMenuItems(this._menuShowingContext.fileItems, null, this._menuShowingContext.fileSystemItem);
        this._contextMenu.option('dataSource', items);
      }
    };
    _proto.tryUpdateVisibleContextMenu = function tryUpdateVisibleContextMenu() {
      if (this._isVisible) {
        var items = this.createContextMenuItems(this._targetFileItems);
        this._contextMenu.option('dataSource', items);
      }
    };
    _proto._onContextMenuShown = function _onContextMenuShown() {
      this._isVisible = true;
    };
    _proto._onContextMenuHidden = function _onContextMenuHidden(preserveContext) {
      this._isVisible = false;
      if (!preserveContext) {
        this._menuShowingContext = {};
      }
      this._contextMenu.option('visible', false);
      this._raiseContextMenuHidden();
    };
    _proto._raiseContextMenuHidden = function _raiseContextMenuHidden() {
      this._actions.onContextMenuHidden();
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        commandManager: null,
        onContextMenuHidden: null,
        onItemClick: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'commandManager':
          this.repaint();
          break;
        case 'items':
          this.tryUpdateVisibleContextMenu();
          break;
        case 'onItemClick':
        case 'onContextMenuShowing':
        case 'onContextMenuHidden':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _createClass(FileManagerContextMenu, [{
      key: "_commandManager",
      get: function get() {
        return this.option('commandManager');
      }
    }]);
    return FileManagerContextMenu;
  }(_ui.default);
  var _default = FileManagerContextMenu;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/common","../widget/ui.widget","../context_menu/ui.context_menu","./ui.file_manager.common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/common"), require("../widget/ui.widget"), require("../context_menu/ui.context_menu"), require("./ui.file_manager.common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.context_menu.js.map