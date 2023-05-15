!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/diagram/ui.diagram.toolbar.js"], ["../../core/utils/size","../../core/renderer","../toolbar","../context_menu","./diagram.bar","../../core/utils/extend","../../core/utils/window","./ui.diagram.panel","./ui.diagram.menu_helper","./diagram.importer","../select_box","../color_box","../check_box"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/diagram/ui.diagram.toolbar.js", ["../../core/utils/size", "../../core/renderer", "../toolbar", "../context_menu", "./diagram.bar", "../../core/utils/extend", "../../core/utils/window", "./ui.diagram.panel", "./ui.diagram.menu_helper", "./diagram.importer", "../select_box", "../color_box", "../check_box"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _toolbar = _interopRequireDefault($__require("../toolbar"));
  var _context_menu = _interopRequireDefault($__require("../context_menu"));
  var _diagram = _interopRequireDefault($__require("./diagram.bar"));
  var _extend = $__require("../../core/utils/extend");
  var _window = $__require("../../core/utils/window");
  var _uiDiagram = _interopRequireDefault($__require("./ui.diagram.panel"));
  var _uiDiagram2 = _interopRequireDefault($__require("./ui.diagram.menu_helper"));
  var _diagram2 = $__require("./diagram.importer");
  $__require("../select_box");
  $__require("../color_box");
  $__require("../check_box");
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
  var ACTIVE_FORMAT_CLASS = 'dx-format-active';
  var DIAGRAM_TOOLBAR_CLASS = 'dx-diagram-toolbar';
  var DIAGRAM_TOOLBAR_SEPARATOR_CLASS = 'dx-diagram-toolbar-separator';
  var DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS = 'dx-diagram-toolbar-menu-separator';
  var DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS = 'dx-diagram-mobile-toolbar-color-box-opened';
  var DiagramToolbar = /*#__PURE__*/function (_DiagramPanel) {
    _inheritsLoose(DiagramToolbar, _DiagramPanel);
    function DiagramToolbar() {
      return _DiagramPanel.apply(this, arguments) || this;
    }
    var _proto = DiagramToolbar.prototype;
    _proto._init = function _init() {
      this._commands = [];
      this._itemHelpers = {};
      this._commandContextMenus = {};
      this._contextMenuList = [];
      this._valueConverters = {};
      this.bar = new DiagramToolbarBar(this);
      this._createOnInternalCommand();
      this._createOnCustomCommand();
      this._createOnSubMenuVisibilityChangingAction();
      _DiagramPanel.prototype._init.call(this);
    };
    _proto._initMarkup = function _initMarkup() {
      _DiagramPanel.prototype._initMarkup.call(this);
      var isServerSide = !(0, _window.hasWindow)();
      if (!this.option('skipAdjustSize') && !isServerSide) {
        (0, _size.setWidth)(this.$element(), '');
      }
      this._commands = this._getCommands();
      this._itemHelpers = {};
      this._commandContextMenus = {};
      this._contextMenuList = [];
      var $toolbar = this._createMainElement();
      this._renderToolbar($toolbar);
      if (!this.option('skipAdjustSize') && !isServerSide) {
        var $toolbarContent = this.$element().find('.dx-toolbar-before');
        (0, _size.setWidth)(this.$element(), (0, _size.getWidth)($toolbarContent));
      }
    };
    _proto._createMainElement = function _createMainElement() {
      return (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBAR_CLASS).appendTo(this._$element);
    };
    _proto._getCommands = function _getCommands() {
      return this.option('commands') || [];
    };
    _proto._renderToolbar = function _renderToolbar($toolbar) {
      var beforeCommands = this._commands.filter(function (command) {
        return ['after', 'center'].indexOf(command.location) === -1;
      });
      var centerCommands = this._commands.filter(function (command) {
        return command.location === 'center';
      });
      var afterCommands = this._commands.filter(function (command) {
        return command.location === 'after';
      });
      var dataSource = [].concat(this._prepareToolbarItems(beforeCommands, 'before', this._executeCommand)).concat(this._prepareToolbarItems(centerCommands, 'center', this._executeCommand)).concat(this._prepareToolbarItems(afterCommands, 'after', this._executeCommand));
      this._toolbarInstance = this._createComponent($toolbar, _toolbar.default, {
        dataSource: dataSource
      });
    };
    _proto._prepareToolbarItems = function _prepareToolbarItems(items, location, actionHandler) {
      var _this = this;
      return items.map(function (item) {
        return (0, _extend.extend)(true, {
          location: location,
          locateInMenu: _this.option('locateInMenu')
        }, _this._createItem(item, location, actionHandler), _this._createItemOptions(item), _this._createItemActionOptions(item, actionHandler));
      });
    };
    _proto._createItem = function _createItem(item, location, actionHandler) {
      var _this2 = this;
      if (item.getCommandValue || item.getEditorValue || item.getEditorDisplayValue) {
        this._valueConverters[item.command] = {
          getCommandValue: item.getCommandValue,
          getEditorValue: item.getEditorValue,
          getEditorDisplayValue: item.getEditorDisplayValue
        };
      }
      if (item.widget === 'separator') {
        return {
          template: function template(data, index, element) {
            (0, _renderer.default)(element).addClass(DIAGRAM_TOOLBAR_SEPARATOR_CLASS);
          },
          menuItemTemplate: function menuItemTemplate(data, index, element) {
            (0, _renderer.default)(element).addClass(DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS);
          }
        };
      }
      return {
        widget: item.widget || 'dxButton',
        cssClass: item.cssClass,
        options: {
          stylingMode: this.option('buttonStylingMode'),
          type: this.option('buttonType'),
          text: item.text,
          hint: item.hint,
          icon: item.icon || item.iconUnchecked || item.iconChecked,
          iconChecked: item.iconChecked,
          iconUnchecked: item.iconUnchecked,
          onInitialized: function onInitialized(e) {
            return _this2._onItemInitialized(e.component, item);
          },
          onContentReady: function onContentReady(e) {
            return _this2._onItemContentReady(e.component, item, actionHandler);
          }
        }
      };
    };
    _proto._createItemOptions = function _createItemOptions(_ref) {
      var widget = _ref.widget,
          command = _ref.command,
          items = _ref.items,
          valueExpr = _ref.valueExpr,
          displayExpr = _ref.displayExpr,
          showText = _ref.showText,
          hint = _ref.hint,
          icon = _ref.icon;
      if (widget === 'dxSelectBox') {
        return this._createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr);
      } else if (widget === 'dxTextBox') {
        return this._createTextBoxItemOptions(command, hint);
      } else if (widget === 'dxColorBox') {
        return this._createColorBoxItemOptions(command, hint, icon);
      } else if (!widget || widget === 'dxButton') {
        return {
          showText: showText || 'inMenu'
        };
      }
    };
    _proto._createSelectBoxItemOptions = function _createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr) {
      var options = this._createTextEditorItemOptions(hint);
      options = (0, _extend.extend)(true, options, {
        options: {
          dataSource: items,
          displayExpr: displayExpr || 'text',
          valueExpr: valueExpr || 'value'
        }
      });
      var isSelectButton = items && items.every(function (i) {
        return i.icon !== undefined;
      });
      var nullIconClass = 'dx-diagram-i-selectbox-null-icon dx-diagram-i';
      if (isSelectButton) {
        options = (0, _extend.extend)(true, options, {
          options: {
            fieldTemplate: function fieldTemplate(data, container) {
              (0, _renderer.default)('<i>').addClass(data && data.icon || nullIconClass).appendTo(container);
              (0, _renderer.default)('<div>').dxTextBox({
                readOnly: true,
                stylingMode: 'outlined'
              }).appendTo(container);
            },
            itemTemplate: function itemTemplate(data, index, container) {
              (0, _renderer.default)(container).attr('title', data.hint);
              return "<i class=\"".concat(data.icon, "\"></i>");
            }
          }
        });
      }
      return options;
    };
    _proto._createTextBoxItemOptions = function _createTextBoxItemOptions(command, hint) {
      var _this3 = this;
      var options = this._createTextEditorItemOptions(hint);
      options = (0, _extend.extend)(true, options, {
        options: {
          readOnly: true,
          focusStateEnabled: false,
          hoverStateEnabled: false,
          buttons: [{
            name: 'dropDown',
            location: 'after',
            options: {
              icon: 'spindown',
              disabled: false,
              stylingMode: 'text',
              onClick: function onClick(e) {
                var contextMenu = _this3._commandContextMenus[command];
                if (contextMenu) {
                  _this3._toggleContextMenu(contextMenu);
                }
              }
            }
          }]
        }
      });
      return options;
    };
    _proto._createColorBoxItemOptions = function _createColorBoxItemOptions(command, hint, icon) {
      var _this4 = this;
      var options = this._createTextEditorItemOptions(hint);
      if (icon) {
        options = (0, _extend.extend)(true, options, {
          options: {
            openOnFieldClick: true,
            fieldTemplate: function fieldTemplate(data, container) {
              (0, _renderer.default)('<i>').addClass(icon).css('borderBottomColor', data).appendTo(container);
              (0, _renderer.default)('<div>').dxTextBox({
                readOnly: true,
                stylingMode: 'outlined'
              }).appendTo(container);
            }
          }
        });
      }
      options = (0, _extend.extend)(true, options, {
        options: {
          onOpened: function onOpened() {
            if (_this4.option('isMobileView')) {
              (0, _renderer.default)('body').addClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
            }
          },
          onClosed: function onClosed() {
            (0, _renderer.default)('body').removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
          }
        }
      });
      return options;
    };
    _proto._createTextEditorItemOptions = function _createTextEditorItemOptions(hint) {
      return {
        options: {
          stylingMode: this.option('editorStylingMode'),
          hint: hint
        }
      };
    };
    _proto._createItemActionOptions = function _createItemActionOptions(item, handler) {
      var _this5 = this;
      switch (item.widget) {
        case 'dxSelectBox':
        case 'dxColorBox':
        case 'dxCheckBox':
          return {
            options: {
              onValueChanged: function onValueChanged(e) {
                var parameter = _uiDiagram2.default.getItemCommandParameter(_this5, item, e.component.option('value'));
                handler.call(_this5, item.command, item.name, parameter);
              }
            }
          };
        case 'dxTextBox':
          return {};
        default:
          return {
            options: {
              onClick: function onClick(e) {
                if (!item.items) {
                  var parameter = _uiDiagram2.default.getItemCommandParameter(_this5, item);
                  handler.call(_this5, item.command, item.name, parameter);
                } else {
                  var contextMenu = e.component._contextMenu;
                  if (contextMenu) {
                    _this5._toggleContextMenu(contextMenu);
                  }
                }
              }
            }
          };
      }
    };
    _proto._toggleContextMenu = function _toggleContextMenu(contextMenu) {
      this._contextMenuList.forEach(function (cm) {
        if (contextMenu !== cm) {
          cm.hide();
        }
      });
      contextMenu.toggle();
    };
    _proto._onItemInitialized = function _onItemInitialized(widget, item) {
      this._addItemHelper(item.command, new DiagramToolbarItemHelper(widget));
    };
    _proto._onItemContentReady = function _onItemContentReady(widget, item, actionHandler) {
      var _this6 = this;
      if ((widget.NAME === 'dxButton' || widget.NAME === 'dxTextBox') && item.items) {
        var isTouchMode = this._isTouchMode();
        var $menuContainer = (0, _renderer.default)('<div>').appendTo(this.$element());
        widget._contextMenu = this._createComponent($menuContainer, _context_menu.default, {
          items: item.items,
          target: widget.$element(),
          cssClass: _uiDiagram2.default.getContextMenuCssClass(),
          showEvent: '',
          hideOnOutsideClick: function hideOnOutsideClick(e) {
            return !isTouchMode && (0, _renderer.default)(e.target).closest(widget._contextMenu._dropDownButtonElement).length === 0;
          },
          focusStateEnabled: false,
          position: {
            at: 'left bottom'
          },
          itemTemplate: function itemTemplate(itemData, itemIndex, itemElement) {
            _uiDiagram2.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement);
          },
          onItemClick: function onItemClick(_ref2) {
            var component = _ref2.component,
                itemData = _ref2.itemData;
            _uiDiagram2.default.onContextMenuItemClick(_this6, itemData, actionHandler.bind(_this6));
            if (!itemData.items || !itemData.items.length) {
              component.hide();
            }
          },
          onShowing: function onShowing(e) {
            if (_this6._showingSubMenu) return;
            _this6._showingSubMenu = e.component;
            _this6._onSubMenuVisibilityChangingAction({
              visible: true,
              component: _this6
            });
            e.component.option('items', e.component.option('items'));
            delete _this6._showingSubMenu;
          },
          onInitialized: function onInitialized(_ref3) {
            var component = _ref3.component;
            return _this6._onContextMenuInitialized(component, item, widget);
          },
          onDisposing: function onDisposing(_ref4) {
            var component = _ref4.component;
            return _this6._onContextMenuDisposing(component, item);
          }
        });

        // prevent showing context menu by toggle "close" click
        if (!isTouchMode) {
          widget._contextMenu._dropDownButtonElement = widget.$element(); // i.e. widget.NAME === 'dxButton'
          if (widget.NAME === 'dxTextBox') {
            widget._contextMenu._dropDownButtonElement = widget.getButton('dropDown').element();
          }
        }
      }
    };
    _proto._isTouchMode = function _isTouchMode() {
      var _getDiagram = (0, _diagram2.getDiagram)(),
          Browser = _getDiagram.Browser;
      return Browser.TouchUI;
    };
    _proto._onContextMenuInitialized = function _onContextMenuInitialized(widget, item, rootWidget) {
      this._contextMenuList.push(widget);
      if (item.command) {
        this._commandContextMenus[item.command] = widget;
      }
      this._addContextMenuHelper(item, widget, [], rootWidget);
    };
    _proto._addItemHelper = function _addItemHelper(command, helper) {
      if (command !== undefined) {
        if (this._itemHelpers[command]) {
          throw new Error('Toolbar cannot contain duplicated commands.');
        }
        this._itemHelpers[command] = helper;
      }
    };
    _proto._addContextMenuHelper = function _addContextMenuHelper(item, widget, indexPath, rootWidget) {
      var _this7 = this;
      if (item.items) {
        item.items.forEach(function (subItem, index) {
          var itemIndexPath = indexPath.concat(index);
          _this7._addItemHelper(subItem.command, new DiagramToolbarSubItemHelper(widget, itemIndexPath, subItem.command, rootWidget));
          _this7._addContextMenuHelper(subItem, widget, itemIndexPath, rootWidget);
        });
      }
    };
    _proto._onContextMenuDisposing = function _onContextMenuDisposing(widget, item) {
      this._contextMenuList.splice(this._contextMenuList.indexOf(widget), 1);
      delete this._commandContextMenus[item.command];
    };
    _proto._executeCommand = function _executeCommand(command, name, value) {
      if (this._updateLocked) return;
      if (typeof command === 'number') {
        var valueConverter = this._valueConverters[command];
        if (valueConverter && valueConverter.getCommandValue) {
          value = valueConverter.getCommandValue(value);
        }
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
    _proto._setItemEnabled = function _setItemEnabled(command, enabled) {
      if (command in this._itemHelpers) {
        var helper = this._itemHelpers[command];
        if (helper.canUpdate(this._showingSubMenu)) {
          helper.setEnabled(enabled);
        }
      }
    };
    _proto._setEnabled = function _setEnabled(enabled) {
      this._toolbarInstance.option('disabled', !enabled);
      this._contextMenuList.forEach(function (contextMenu) {
        contextMenu.option('disabled', !enabled);
      });
    };
    _proto._setItemValue = function _setItemValue(command, value) {
      try {
        this._updateLocked = true;
        if (command in this._itemHelpers) {
          var helper = this._itemHelpers[command];
          if (helper.canUpdate(this._showingSubMenu)) {
            var valueConverter = this._valueConverters[command];
            if (valueConverter && valueConverter.getEditorValue) {
              value = valueConverter.getEditorValue(value);
            }
            var displayValue;
            if (valueConverter && valueConverter.getEditorDisplayValue) {
              displayValue = valueConverter.getEditorDisplayValue(value);
            }
            var contextMenu = this._commandContextMenus[command];
            helper.setValue(value, displayValue, contextMenu, contextMenu && command);
          }
        }
      } finally {
        this._updateLocked = false;
      }
    };
    _proto._setItemSubItems = function _setItemSubItems(command, items) {
      this._updateLocked = true;
      if (command in this._itemHelpers) {
        var helper = this._itemHelpers[command];
        if (helper.canUpdate(this._showingSubMenu)) {
          var contextMenu = this._commandContextMenus[command];
          helper.setItems(items, contextMenu, contextMenu && command);
        }
      }
      this._updateLocked = false;
    };
    _proto._createOnSubMenuVisibilityChangingAction = function _createOnSubMenuVisibilityChangingAction() {
      this._onSubMenuVisibilityChangingAction = this._createActionByOption('onSubMenuVisibilityChanging');
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'isMobileView':
          (0, _renderer.default)('body').removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
          this._invalidate();
          break;
        case 'onSubMenuVisibilityChanging':
          this._createOnSubMenuVisibilityChangingAction();
          break;
        case 'onInternalCommand':
          this._createOnInternalCommand();
          break;
        case 'onCustomCommand':
          this._createOnCustomCommand();
          break;
        case 'container':
        case 'commands':
          this._invalidate();
          break;
        case 'export':
          break;
        default:
          _DiagramPanel.prototype._optionChanged.call(this, args);
      }
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_DiagramPanel.prototype._getDefaultOptions.call(this), {
        isMobileView: false,
        export: {
          fileName: 'Diagram'
        },
        locateInMenu: 'auto',
        buttonStylingMode: 'text',
        buttonType: 'normal',
        editorStylingMode: 'filled',
        skipAdjustSize: false
      });
    };
    _proto.setCommandChecked = function setCommandChecked(command, checked) {
      this._setItemValue(command, checked);
    };
    _proto.setCommandEnabled = function setCommandEnabled(command, enabled) {
      this._setItemEnabled(command, enabled);
    };
    return DiagramToolbar;
  }(_uiDiagram.default);
  var DiagramToolbarBar = /*#__PURE__*/function (_DiagramBar) {
    _inheritsLoose(DiagramToolbarBar, _DiagramBar);
    function DiagramToolbarBar() {
      return _DiagramBar.apply(this, arguments) || this;
    }
    var _proto2 = DiagramToolbarBar.prototype;
    _proto2.getCommandKeys = function getCommandKeys() {
      return this._getKeys(this._owner._commands);
    };
    _proto2.setItemValue = function setItemValue(key, value) {
      this._owner._setItemValue(key, value);
    };
    _proto2.setItemEnabled = function setItemEnabled(key, enabled) {
      this._owner._setItemEnabled(key, enabled);
    };
    _proto2.setEnabled = function setEnabled(enabled) {
      this._owner._setEnabled(enabled);
    };
    _proto2.setItemSubItems = function setItemSubItems(key, items) {
      this._owner._setItemSubItems(key, items);
    };
    return DiagramToolbarBar;
  }(_diagram.default);
  var DiagramToolbarItemHelper = /*#__PURE__*/function () {
    function DiagramToolbarItemHelper(widget) {
      this._widget = widget;
    }
    var _proto3 = DiagramToolbarItemHelper.prototype;
    _proto3.canUpdate = function canUpdate(showingSubMenu) {
      return showingSubMenu === undefined;
    };
    _proto3.setEnabled = function setEnabled(enabled) {
      this._widget.option('disabled', !enabled);
    };
    _proto3.setValue = function setValue(value, displayValue, contextMenu, rootCommandKey) {
      if ('value' in this._widget.option()) {
        this._updateEditorValue(value, displayValue);
      } else if (value !== undefined) {
        this._updateButtonValue(value);
      }
      if (contextMenu) {
        this._updateContextMenuItemValue(contextMenu, '', rootCommandKey, value);
      }
    };
    _proto3.setItems = function setItems(items, contextMenu, rootCommandKey) {
      if (contextMenu) {
        this._updateContextMenuItems(contextMenu, '', rootCommandKey, items);
      } else {
        this._updateEditorItems(items);
      }
    };
    _proto3._updateContextMenuItems = function _updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items) {
      _uiDiagram2.default.updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items);
    };
    _proto3._updateEditorItems = function _updateEditorItems(items) {
      if ('items' in this._widget.option()) {
        this._widget.option('items', items.map(function (item) {
          return {
            'value': _uiDiagram2.default.getItemValue(item),
            'text': item.text
          };
        }));
      }
    };
    _proto3._updateEditorValue = function _updateEditorValue(value, displayValue) {
      this._widget.option('value', value);
      if (!this._widget.option('selectedItem') && displayValue) {
        this._widget.option('value', displayValue);
      }
    };
    _proto3._updateButtonValue = function _updateButtonValue(value) {
      if (this._widget.option('iconChecked') && this._widget.option('iconUnchecked')) {
        this._widget.option('icon', value ? this._widget.option('iconChecked') : this._widget.option('iconUnchecked'));
      } else {
        this._widget.$element().toggleClass(ACTIVE_FORMAT_CLASS, value);
      }
    };
    _proto3._updateContextMenuItemValue = function _updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value) {
      _uiDiagram2.default.updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value);
    };
    return DiagramToolbarItemHelper;
  }();
  var DiagramToolbarSubItemHelper = /*#__PURE__*/function (_DiagramToolbarItemHe) {
    _inheritsLoose(DiagramToolbarSubItemHelper, _DiagramToolbarItemHe);
    function DiagramToolbarSubItemHelper(widget, indexPath, rootCommandKey, rootWidget) {
      var _this8;
      _this8 = _DiagramToolbarItemHe.call(this, widget) || this;
      _this8._indexPath = indexPath;
      _this8._rootCommandKey = rootCommandKey;
      _this8._rootWidget = rootWidget;
      return _this8;
    }
    var _proto4 = DiagramToolbarSubItemHelper.prototype;
    _proto4.canUpdate = function canUpdate(showingSubMenu) {
      return _DiagramToolbarItemHe.prototype.canUpdate.call(this, showingSubMenu) || showingSubMenu === this._widget;
    };
    _proto4.setEnabled = function setEnabled(enabled) {
      this._widget.option(this._getItemOptionText() + 'disabled', !enabled);
      var rootEnabled = this._hasEnabledCommandItems(this._widget.option('items'));
      this._rootWidget.option('disabled', !rootEnabled);
    };
    _proto4._hasEnabledCommandItems = function _hasEnabledCommandItems(items) {
      var _this9 = this;
      if (items) {
        return items.some(function (item) {
          return item.command !== undefined && !item.disabled || _this9._hasEnabledCommandItems(item.items);
        });
      }
      return false;
    };
    _proto4.setValue = function setValue(value) {
      this._updateContextMenuItemValue(this._widget, this._getItemOptionText(), this._rootCommandKey, value);
    };
    _proto4.setItems = function setItems(items) {
      this._updateContextMenuItems(this._widget, this._getItemOptionText(), this._rootCommandKey, items);
    };
    _proto4._getItemOptionText = function _getItemOptionText() {
      return _uiDiagram2.default.getItemOptionText(this._widget, this._indexPath);
    };
    return DiagramToolbarSubItemHelper;
  }(DiagramToolbarItemHelper);
  var _default = DiagramToolbar;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../toolbar","../context_menu","./diagram.bar","../../core/utils/extend","../../core/utils/window","./ui.diagram.panel","./ui.diagram.menu_helper","./diagram.importer","../select_box","../color_box","../check_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../toolbar"), require("../context_menu"), require("./diagram.bar"), require("../../core/utils/extend"), require("../../core/utils/window"), require("./ui.diagram.panel"), require("./ui.diagram.menu_helper"), require("./diagram.importer"), require("../select_box"), require("../color_box"), require("../check_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.diagram.toolbar.js.map