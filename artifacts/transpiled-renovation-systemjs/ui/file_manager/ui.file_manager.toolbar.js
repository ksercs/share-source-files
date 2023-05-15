!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.toolbar.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/common","../../localization/message","./ui.file_manager.common","../widget/ui.widget","../toolbar","../drop_down_button"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.toolbar.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/common", "../../localization/message", "./ui.file_manager.common", "../widget/ui.widget", "../toolbar", "../drop_down_button"], true, function ($__require, exports, module) {
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
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _common = $__require("../../core/utils/common");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _uiFile_manager = $__require("./ui.file_manager.common");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _toolbar = _interopRequireDefault($__require("../toolbar"));
  $__require("../drop_down_button");
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
  var FILE_MANAGER_TOOLBAR_CLASS = 'dx-filemanager-toolbar';
  var FILE_MANAGER_GENERAL_TOOLBAR_CLASS = 'dx-filemanager-general-toolbar';
  var FILE_MANAGER_FILE_TOOLBAR_CLASS = 'dx-filemanager-file-toolbar';
  var FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + '-separator-item';
  var FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS = FILE_MANAGER_TOOLBAR_CLASS + '-viewmode-item';
  var FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS = FILE_MANAGER_TOOLBAR_CLASS + '-has-large-icon';
  var FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS = 'dx-filemanager-view-switcher-popup';
  var DEFAULT_ITEM_CONFIGS = {
    showNavPane: {
      location: 'before'
    },
    create: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    upload: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    refresh: {
      location: 'after',
      showText: 'inMenu',
      cssClass: FILE_MANAGER_TOOLBAR_HAS_LARGE_ICON_CLASS,
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    switchView: {
      location: 'after'
    },
    download: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    move: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    copy: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    rename: {
      location: 'before',
      compactMode: {
        showText: 'inMenu',
        locateInMenu: 'auto'
      }
    },
    delete: {
      location: 'before',
      compactMode: {
        showText: 'inMenu'
      }
    },
    clearSelection: {
      location: 'after',
      locateInMenu: 'never',
      compactMode: {
        showText: 'inMenu'
      }
    },
    separator: {
      location: 'before'
    }
  };
  var DEFAULT_ITEM_ALLOWED_PROPERTIES = ['visible', 'location', 'locateInMenu', 'disabled', 'showText'];
  var DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES = ['accessKey', 'elementAttr', 'height', 'hint', 'icon', 'stylingMode', 'tabIndex', 'text', 'width'];
  var ALWAYS_VISIBLE_TOOLBAR_ITEMS = ['separator', 'switchView'];
  var REFRESH_ICON_MAP = {
    default: 'dx-filemanager-i dx-filemanager-i-refresh',
    progress: 'dx-filemanager-i dx-filemanager-i-progress',
    success: 'dx-filemanager-i dx-filemanager-i-done',
    error: 'dx-filemanager-i dx-filemanager-i-danger'
  };
  var REFRESH_ITEM_PROGRESS_MESSAGE_DELAY = 500;
  var FileManagerToolbar = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerToolbar, _Widget);
    function FileManagerToolbar() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerToolbar.prototype;
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this._generalToolbarVisible = true;
      this._refreshItemState = {
        message: '',
        status: 'default'
      };
    };
    _proto._initMarkup = function _initMarkup() {
      this._createItemClickedAction();
      this._$viewSwitcherPopup = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_VIEW_SWITCHER_POPUP_CLASS);
      this._generalToolbar = this._createToolbar(this.option('generalItems'), !this._generalToolbarVisible);
      this._fileToolbar = this._createToolbar(this.option('fileItems'), this._generalToolbarVisible);
      this._$viewSwitcherPopup.appendTo(this.$element());
      this.$element().addClass(FILE_MANAGER_TOOLBAR_CLASS + ' ' + FILE_MANAGER_GENERAL_TOOLBAR_CLASS);
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      var toolbar = this._getVisibleToolbar();
      this._checkCompactMode(toolbar);
    };
    _proto._clean = function _clean() {
      delete this._commandManager;
      delete this._itemClickedAction;
      delete this._$viewSwitcherPopup;
      delete this._generalToolbar;
      delete this._fileToolbar;
      _Widget.prototype._clean.call(this);
    };
    _proto._dimensionChanged = function _dimensionChanged(dimension) {
      if (!dimension || dimension !== 'height') {
        var toolbar = this._getVisibleToolbar();
        this._checkCompactMode(toolbar);
      }
    };
    _proto._getVisibleToolbar = function _getVisibleToolbar() {
      return this._generalToolbarVisible ? this._generalToolbar : this._fileToolbar;
    };
    _proto._createToolbar = function _createToolbar(items, hidden) {
      var _this = this;
      var toolbarItems = this._getPreparedItems(items);
      var $toolbar = (0, _renderer.default)('<div>').appendTo(this.$element());
      var result = this._createComponent($toolbar, _toolbar.default, {
        items: toolbarItems,
        visible: !hidden,
        onItemClick: function onItemClick(args) {
          return _this._raiseItemClicked(args);
        }
      });
      result.compactMode = false;
      return result;
    };
    _proto._getPreparedItems = function _getPreparedItems(items) {
      var _this2 = this;
      items = items.map(function (item) {
        var extendedItem = item;
        if ((0, _type.isString)(item)) {
          extendedItem = {
            name: item
          };
        }
        var commandName = extendedItem.name;
        var preparedItem = _this2._configureItemByCommandName(commandName, extendedItem);
        preparedItem.originalItemData = item;
        if (commandName !== 'separator') {
          _this2._setItemVisibleAvailable(preparedItem);
        }
        return preparedItem;
      });
      this._updateSeparatorsVisibility(items);
      return items;
    };
    _proto._updateSeparatorsVisibility = function _updateSeparatorsVisibility(items, toolbar) {
      var _this3 = this;
      var hasModifications = false;
      var menuItems = this._getMenuItems(toolbar);
      var hasItemsBefore = {
        before: false,
        center: false,
        after: false
      };
      var itemGroups = {
        before: this._getItemsInGroup(items, menuItems, 'before'),
        center: this._getItemsInGroup(items, menuItems, 'center'),
        after: this._getItemsInGroup(items, menuItems, 'after')
      };
      items.forEach(function (item, i) {
        var itemLocation = item.location;
        if (item.name === 'separator') {
          var isSeparatorVisible = hasItemsBefore[itemLocation] && _this3._groupHasItemsAfter(itemGroups[itemLocation]);
          if (item.visible !== isSeparatorVisible) {
            hasModifications = true;
            item.visible = isSeparatorVisible;
          }
          hasItemsBefore[itemLocation] = false;
        } else {
          if (!_this3._isItemInMenu(menuItems, item)) {
            hasItemsBefore[itemLocation] = hasItemsBefore[itemLocation] || item.visible;
          }
          itemGroups[itemLocation].shift();
        }
      });
      if (toolbar && hasModifications) {
        toolbar.repaint();
      }
      return hasModifications;
    };
    _proto._getMenuItems = function _getMenuItems(toolbar) {
      var result = toolbar ? toolbar._getMenuItems() : [];
      return result.map(function (menuItem) {
        return menuItem.originalItemData;
      });
    };
    _proto._isItemInMenu = function _isItemInMenu(menuItems, item) {
      return !!menuItems.length && (0, _common.ensureDefined)(item.locateInMenu, 'never') !== 'never' && menuItems.indexOf(item.originalItemData) !== -1;
    };
    _proto._getItemsInGroup = function _getItemsInGroup(items, menuItems, groupName) {
      var _this4 = this;
      return items.filter(function (item) {
        return item.location === groupName && !_this4._isItemInMenu(menuItems, item);
      });
    };
    _proto._groupHasItemsAfter = function _groupHasItemsAfter(items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].name !== 'separator' && items[i].visible) {
          return true;
        }
      }
      return false;
    };
    _proto._configureItemByCommandName = function _configureItemByCommandName(commandName, item) {
      var _result$options;
      var result = {};
      var command = this._commandManager.getCommandByName(commandName);
      if (command) {
        result = this._createCommandItem(command);
      }
      switch (commandName) {
        case 'separator':
          result = this._createSeparatorItem();
          break;
        case 'switchView':
          result = this._createViewModeItem();
          break;
      }
      if (this._isDefaultItem(commandName)) {
        var defaultConfig = DEFAULT_ITEM_CONFIGS[commandName];
        (0, _extend.extend)(true, result, defaultConfig);
        var resultCssClass = result.cssClass || '';
        (0, _uiFile_manager.extendAttributes)(result, item, DEFAULT_ITEM_ALLOWED_PROPERTIES);
        if ((0, _type.isDefined)(item.options)) {
          (0, _uiFile_manager.extendAttributes)(result.options, item.options, DEFAULT_ITEM_ALLOWED_OPTION_PROPERTIES);
        }
        (0, _uiFile_manager.extendAttributes)(result.options, item, ['text', 'icon']);
        if (item.cssClass) {
          resultCssClass = "".concat(resultCssClass, " ").concat(item.cssClass);
        }
        if (resultCssClass) {
          result.cssClass = resultCssClass;
        }
        if (!(0, _type.isDefined)(item.visible)) {
          result._autoHide = true;
        }
        if (result.widget === 'dxButton') {
          if (result.showText === 'inMenu' && !(0, _type.isDefined)(result.options.hint)) {
            result.options.hint = result.options.text;
          }
          if (result.compactMode && !(0, _type.isDefined)(result.options.hint)) {
            this._configureHintForCompactMode(result);
          }
        }
      } else {
        (0, _extend.extend)(true, result, item);
        if (!result.widget) {
          result.widget = 'dxButton';
        }
        if (result.widget === 'dxButton' && !result.compactMode && !result.showText && result.options && result.options.icon && result.options.text) {
          result.compactMode = {
            showText: 'inMenu'
          };
        }
      }
      if (commandName && !result.name) {
        (0, _extend.extend)(result, {
          name: commandName
        });
      }
      result.location = (0, _common.ensureDefined)(result.location, 'before');
      if (!(0, _type.isDefined)((_result$options = result.options) === null || _result$options === void 0 ? void 0 : _result$options.stylingMode)) {
        if (result.widget === 'dxButton') {
          (0, _extend.extend)(true, result, {
            options: {
              stylingMode: 'text'
            }
          });
        }
        if (result.widget === 'dxSelectBox') {
          (0, _extend.extend)(true, result, {
            options: {
              stylingMode: 'filled'
            }
          });
        }
      }
      return result;
    };
    _proto._isDefaultItem = function _isDefaultItem(commandName) {
      return !!DEFAULT_ITEM_CONFIGS[commandName];
    };
    _proto._createCommandItem = function _createCommandItem(command) {
      var _this5 = this;
      return {
        widget: 'dxButton',
        options: {
          text: command.text,
          hint: command.hint,
          commandText: command.text,
          icon: command.icon,
          stylingMode: 'text',
          onClick: function onClick(e) {
            return _this5._executeCommand(command);
          }
        }
      };
    };
    _proto._createSeparatorItem = function _createSeparatorItem() {
      return {
        template: function template(data, index, element) {
          (0, _renderer.default)(element).addClass(FILE_MANAGER_TOOLBAR_SEPARATOR_ITEM_CLASS);
        }
      };
    };
    _proto._createViewModeItem = function _createViewModeItem() {
      var _this6 = this;
      var commandItems = ['details', 'thumbnails'].map(function (name) {
        var _this6$_commandManage = _this6._commandManager.getCommandByName(name),
            text = _this6$_commandManage.text,
            icon = _this6$_commandManage.icon;
        return {
          name: name,
          text: text,
          icon: icon
        };
      });
      var selectedIndex = this.option('itemViewMode') === 'thumbnails' ? 1 : 0;
      return {
        cssClass: FILE_MANAGER_TOOLBAR_VIEWMODE_ITEM_CLASS,
        widget: 'dxDropDownButton',
        options: {
          items: commandItems,
          keyExpr: 'name',
          selectedItemKey: this.option('itemViewMode'),
          displayExpr: ' ',
          hint: commandItems[selectedIndex].text,
          stylingMode: 'text',
          showArrowIcon: false,
          useSelectMode: true,
          dropDownOptions: {
            container: this._$viewSwitcherPopup
          },
          onItemClick: function onItemClick(e) {
            return _this6._executeCommand(e.itemData.name);
          }
        }
      };
    };
    _proto._configureHintForCompactMode = function _configureHintForCompactMode(item) {
      item.options.hint = '';
      item.compactMode.options = item.compactMode.options || {};
      item.compactMode.options.hint = item.options.text;
    };
    _proto._checkCompactMode = function _checkCompactMode(toolbar) {
      if (toolbar.compactMode) {
        this._toggleCompactMode(toolbar, false);
      }
      var useCompactMode = this._toolbarHasItemsOverflow(toolbar);
      if (toolbar.compactMode !== useCompactMode) {
        if (!toolbar.compactMode) {
          this._toggleCompactMode(toolbar, useCompactMode);
        }
        toolbar.compactMode = useCompactMode;
      } else if (toolbar.compactMode) {
        this._toggleCompactMode(toolbar, true);
      }
    };
    _proto._toolbarHasItemsOverflow = function _toolbarHasItemsOverflow(toolbar) {
      var toolbarWidth = (0, _size.getWidth)(toolbar.$element());
      var itemsWidth = toolbar._getItemsWidth();
      return toolbarWidth < itemsWidth;
    };
    _proto._toggleCompactMode = function _toggleCompactMode(toolbar, useCompactMode) {
      var _this7 = this;
      var hasModifications = false;
      var items = toolbar.option('items');
      items.forEach(function (item) {
        if (item.compactMode) {
          var optionsSource = null;
          if (useCompactMode) {
            item.saved = _this7._getCompactModeOptions(item, item._available);
            optionsSource = item.compactMode;
          } else {
            optionsSource = item.saved;
          }
          var options = _this7._getCompactModeOptions(optionsSource, item._available);
          (0, _extend.extend)(true, item, options);
          hasModifications = true;
        }
      });
      hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
      if (hasModifications) {
        toolbar.repaint();
      }
      this._updateSeparatorsVisibility(items, toolbar);
    };
    _proto._getCompactModeOptions = function _getCompactModeOptions(_ref, available) {
      var showText = _ref.showText,
          locateInMenu = _ref.locateInMenu,
          options = _ref.options;
      return {
        visible: available,
        showText: (0, _common.ensureDefined)(showText, 'always'),
        locateInMenu: (0, _common.ensureDefined)(locateInMenu, 'never'),
        options: {
          hint: options === null || options === void 0 ? void 0 : options.hint
        }
      };
    };
    _proto._ensureAvailableCommandsVisible = function _ensureAvailableCommandsVisible(toolbar) {
      var _this8 = this;
      var hasModifications = false;
      var items = toolbar.option('items');
      items.forEach(function (item) {
        if (item.name !== 'separator') {
          var itemVisible = item._available;
          _this8._setItemVisibleAvailable(item);
          if (item._available !== itemVisible) {
            hasModifications = true;
          }
        }
      });
      hasModifications = this._updateSeparatorsVisibility(items) || hasModifications;
      if (hasModifications) {
        toolbar.repaint();
      }
      this._updateSeparatorsVisibility(items, toolbar);
    };
    _proto._setItemVisibleAvailable = function _setItemVisibleAvailable(item) {
      var _item$originalItemDat;
      var originalVisible = (_item$originalItemDat = item.originalItemData) === null || _item$originalItemDat === void 0 ? void 0 : _item$originalItemDat.visible;
      item._available = this._isToolbarItemAvailable(item);
      item.visible = (0, _type.isDefined)(originalVisible) ? originalVisible : item._available;
    };
    _proto._fileToolbarHasEffectiveItems = function _fileToolbarHasEffectiveItems() {
      var _this9 = this;
      var items = this._fileToolbar.option('items');
      return items.some(function (item) {
        return _this9._isFileToolbarItemAvailable(item);
      });
    };
    _proto._executeCommand = function _executeCommand(command) {
      this._commandManager.executeCommand(command);
    };
    _proto._isToolbarItemAvailable = function _isToolbarItemAvailable(toolbarItem) {
      if (!this._isDefaultItem(toolbarItem.name) || !toolbarItem._autoHide) {
        return (0, _common.ensureDefined)(toolbarItem.visible, true);
      }
      if (toolbarItem.name === 'refresh') {
        return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar;
      }
      if (ALWAYS_VISIBLE_TOOLBAR_ITEMS.indexOf(toolbarItem.name) > -1) {
        return true;
      }
      return this._isCommandAvailable(toolbarItem.name);
    };
    _proto._isFileToolbarItemAvailable = function _isFileToolbarItemAvailable(_ref2) {
      var name = _ref2.name,
          visible = _ref2.visible;
      return !this._isDefaultItem(name) && (0, _common.ensureDefined)(visible, true) || name !== 'clearSelection' && name !== 'refresh' && this._isCommandAvailable(name);
    };
    _proto._isCommandAvailable = function _isCommandAvailable(name) {
      return this._commandManager.isCommandAvailable(name, this.option('contextItems'));
    };
    _proto._updateItemInToolbar = function _updateItemInToolbar(toolbar, commandName, options) {
      toolbar.beginUpdate();
      var items = toolbar.option('items');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.name === commandName) {
          toolbar.option("items[".concat(i, "]"), options);
          break;
        }
      }
      toolbar.endUpdate();
    };
    _proto._raiseItemClicked = function _raiseItemClicked(args) {
      var changedArgs = (0, _extend.extend)(true, {}, args);
      changedArgs.itemData = args.itemData.originalItemData;
      this._itemClickedAction(changedArgs);
    };
    _proto._createItemClickedAction = function _createItemClickedAction() {
      this._itemClickedAction = this._createActionByOption('onItemClick');
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        commandManager: null,
        generalItems: [],
        fileItems: [],
        contextItems: [],
        itemViewMode: 'details',
        onItemClick: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'commandManager':
        case 'itemViewMode':
        case 'generalItems':
        case 'fileItems':
          this.repaint();
          break;
        case 'contextItems':
          this._update();
          break;
        case 'onItemClick':
          this._itemClickedAction = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto.updateItemPermissions = function updateItemPermissions() {
      this.repaint();
      this._restoreRefreshItemState();
    };
    _proto._restoreRefreshItemState = function _restoreRefreshItemState() {
      this.updateRefreshItem(this._refreshItemState.message, this._refreshItemState.status);
    };
    _proto.updateRefreshItem = function updateRefreshItem(message, status) {
      var generalToolbarOptions = null;
      var text = _message.default.format('dxFileManager-commandRefresh');
      var showText = 'inMenu';
      this._isRefreshVisibleInFileToolbar = false;
      this._refreshItemState = {
        message: message,
        status: status
      };
      if (status === 'default') {
        generalToolbarOptions = {
          options: {
            icon: REFRESH_ICON_MAP.default
          }
        };
      } else {
        generalToolbarOptions = {
          options: {
            icon: REFRESH_ICON_MAP[status]
          }
        };
        this._isRefreshVisibleInFileToolbar = true;
        text = message;
        showText = 'always';
      }
      var fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions, {
        visible: this._isRefreshVisibleInFileToolbar
      });
      this._applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions);
      this._refreshItemTextTimeout = this._updateRefreshItemText(status === 'progress', text, showText);
    };
    _proto._updateRefreshItemText = function _updateRefreshItemText(isDeferredUpdate, text, showText) {
      var _this10 = this;
      var options = {
        showText: showText,
        options: {
          text: text
        }
      };
      if (isDeferredUpdate) {
        return setTimeout(function () {
          _this10._applyRefreshItemOptions(options);
          _this10._refreshItemTextTimeout = undefined;
        }, REFRESH_ITEM_PROGRESS_MESSAGE_DELAY);
      } else {
        if (this._refreshItemTextTimeout) {
          clearTimeout(this._refreshItemTextTimeout);
        }
        this._applyRefreshItemOptions(options);
        return undefined;
      }
    };
    _proto._applyRefreshItemOptions = function _applyRefreshItemOptions(generalToolbarOptions, fileToolbarOptions) {
      if (!fileToolbarOptions) {
        fileToolbarOptions = (0, _extend.extend)({}, generalToolbarOptions);
      }
      this._updateItemInToolbar(this._generalToolbar, 'refresh', generalToolbarOptions);
      this._updateItemInToolbar(this._fileToolbar, 'refresh', fileToolbarOptions);
    };
    _proto._update = function _update() {
      var showGeneralToolbar = this.option('contextItems').length === 0 || !this._fileToolbarHasEffectiveItems();
      if (this._generalToolbarVisible !== showGeneralToolbar) {
        this._generalToolbar.option('visible', showGeneralToolbar);
        this._fileToolbar.option('visible', !showGeneralToolbar);
        this._generalToolbarVisible = showGeneralToolbar;
        this.$element().toggleClass(FILE_MANAGER_GENERAL_TOOLBAR_CLASS, showGeneralToolbar);
        this.$element().toggleClass(FILE_MANAGER_FILE_TOOLBAR_CLASS, !showGeneralToolbar);
      }
      var toolbar = this._getVisibleToolbar();
      this._ensureAvailableCommandsVisible(toolbar);
      this._checkCompactMode(toolbar);
    };
    _createClass(FileManagerToolbar, [{
      key: "_commandManager",
      get: function get() {
        return this.option('commandManager');
      }
    }]);
    return FileManagerToolbar;
  }(_ui.default);
  var _default = FileManagerToolbar;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/common","../../localization/message","./ui.file_manager.common","../widget/ui.widget","../toolbar","../drop_down_button"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/common"), require("../../localization/message"), require("./ui.file_manager.common"), require("../widget/ui.widget"), require("../toolbar"), require("../drop_down_button"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.toolbar.js.map