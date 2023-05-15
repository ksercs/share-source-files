!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/html_editor/modules/tableContextMenu.js"], ["devextreme-quill","../../../core/renderer","./base","../../../events/core/events_engine","../../../events/utils/index","../../context_menu","../../../localization/message","../utils/table_helper","../utils/toolbar_helper","../../../core/utils/iterator","../../../core/utils/type","../../../core/utils/inflector","../../../core/utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/html_editor/modules/tableContextMenu.js", ["devextreme-quill", "../../../core/renderer", "./base", "../../../events/core/events_engine", "../../../events/utils/index", "../../context_menu", "../../../localization/message", "../utils/table_helper", "../utils/toolbar_helper", "../../../core/utils/iterator", "../../../core/utils/type", "../../../core/utils/inflector", "../../../core/utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _devextremeQuill = _interopRequireDefault($__require("devextreme-quill"));
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _base = _interopRequireDefault($__require("./base"));
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _index = $__require("../../../events/utils/index");
  var _context_menu = _interopRequireDefault($__require("../../context_menu"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _table_helper = $__require("../utils/table_helper");
  var _toolbar_helper = $__require("../utils/toolbar_helper");
  var _iterator = $__require("../../../core/utils/iterator");
  var _type = $__require("../../../core/utils/type");
  var _inflector = $__require("../../../core/utils/inflector");
  var _extend = $__require("../../../core/utils/extend");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var MODULE_NAMESPACE = 'dxHtmlEditorTableContextMenu';
  var CONTEXT_MENU_EVENT = (0, _index.addNamespace)('dxcontextmenu', MODULE_NAMESPACE);
  var TableContextMenuModule = _base.default;
  var localize = function localize(name) {
    return _message.default.format("dxHtmlEditor-".concat((0, _inflector.camelize)(name)));
  };
  if (_devextremeQuill.default) {
    TableContextMenuModule = /*#__PURE__*/function (_BaseModule) {
      _inheritsLoose(TableContextMenuModule, _BaseModule);
      function TableContextMenuModule(quill, options) {
        var _this;
        _this = _BaseModule.call(this, quill, options) || this;
        _this.enabled = !!options.enabled;
        _this._quillContainer = _this.editorInstance._getQuillContainer();
        _this.addCleanCallback(_this.prepareCleanCallback());
        _this._formatHandlers = (0, _toolbar_helper.getFormatHandlers)(_assertThisInitialized(_this));
        _this._tableFormats = (0, _table_helper.getTableFormats)(quill);
        if (_this.enabled) {
          _this._enableContextMenu(options.items);
        }
        return _this;
      }
      var _proto = TableContextMenuModule.prototype;
      _proto._enableContextMenu = function _enableContextMenu(items) {
        var _this$_contextMenu;
        (_this$_contextMenu = this._contextMenu) === null || _this$_contextMenu === void 0 ? void 0 : _this$_contextMenu.dispose();
        this._contextMenu = this._createContextMenu(items);
        this._attachEvents();
      };
      _proto._attachEvents = function _attachEvents() {
        _events_engine.default.on(this.editorInstance._getContent(), CONTEXT_MENU_EVENT, this._prepareContextMenuHandler());
      };
      _proto._detachEvents = function _detachEvents() {
        _events_engine.default.off(this.editorInstance._getContent(), CONTEXT_MENU_EVENT);
      };
      _proto._createContextMenu = function _createContextMenu(items) {
        var $container = (0, _renderer.default)('<div>').appendTo(this.editorInstance.$element());
        var menuConfig = this._getMenuConfig(items);
        return this.editorInstance._createComponent($container, _context_menu.default, menuConfig);
      };
      _proto.showPropertiesForm = function showPropertiesForm() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cell';
        var $element = (0, _renderer.default)(this._targetElement).closest(type === 'cell' ? 'th, td' : 'table');
        this._contextMenu.hide();
        this._formatHandlers["".concat(type, "Properties")]($element);
        this._targetElement = null;
      };
      _proto._isAcceptableItem = function _isAcceptableItem(widget, acceptableWidgetName) {
        return !widget || widget === acceptableWidgetName;
      };
      _proto._handleObjectItem = function _handleObjectItem(item) {
        if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
          var defaultButtonItemConfig = this._prepareMenuItemConfig(item.name);
          var buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
          return buttonItemConfig;
        } else if (item.items) {
          item.items = this._prepareMenuItems(item.items);
          return item;
        } else {
          return item;
        }
      };
      _proto._prepareMenuItemConfig = function _prepareMenuItemConfig(name) {
        var _ICON_MAP$name, _this$_formatHandlers;
        var iconName = (_ICON_MAP$name = _toolbar_helper.ICON_MAP[name]) !== null && _ICON_MAP$name !== void 0 ? _ICON_MAP$name : name;
        var buttonText = (0, _inflector.titleize)(name);
        return {
          text: localize(buttonText),
          icon: iconName.toLowerCase(),
          onClick: (_this$_formatHandlers = this._formatHandlers[name]) !== null && _this$_formatHandlers !== void 0 ? _this$_formatHandlers : (0, _toolbar_helper.getDefaultClickHandler)(this, name)
        };
      };
      _proto._prepareMenuItems = function _prepareMenuItems(items) {
        var _this2 = this;
        var resultItems = [];
        (0, _iterator.each)(items, function (_, item) {
          var newItem;
          if ((0, _type.isObject)(item)) {
            newItem = _this2._handleObjectItem(item);
          } else if ((0, _type.isString)(item)) {
            newItem = _this2._prepareMenuItemConfig(item);
          }
          if (newItem) {
            resultItems.push(newItem);
          }
        });
        return resultItems;
      };
      _proto._getMenuConfig = function _getMenuConfig(items) {
        var _this3 = this;
        var defaultItems = [{
          text: localize('insert'),
          items: ['insertHeaderRow', 'insertRowAbove', 'insertRowBelow', (0, _extend.extend)(this._prepareMenuItemConfig('insertColumnLeft'), {
            beginGroup: true
          }), 'insertColumnRight']
        }, {
          text: localize('delete'),
          items: ['deleteColumn', 'deleteRow', 'deleteTable']
        }, (0, _extend.extend)(this._prepareMenuItemConfig('cellProperties'), {
          onClick: function onClick(e) {
            _this3.showPropertiesForm('cell');
          }
        }), (0, _extend.extend)(this._prepareMenuItemConfig('tableProperties'), {
          onClick: function onClick(e) {
            _this3.showPropertiesForm('table');
          }
        })];
        var customItems = this._prepareMenuItems(items !== null && items !== void 0 && items.length ? items : defaultItems);
        return {
          target: this._quillContainer,
          showEvent: null,
          hideOnParentScroll: false,
          items: customItems
        };
      };
      _proto._prepareContextMenuHandler = function _prepareContextMenuHandler() {
        var _this4 = this;
        return function (event) {
          if (_this4._isTableTarget(event.target)) {
            _this4._targetElement = event.target;
            _this4._setContextMenuPosition(event);
            _this4._contextMenu.show();
            event.preventDefault();
          }
        };
      };
      _proto._setContextMenuPosition = function _setContextMenuPosition(event) {
        var startPosition = this._quillContainer.get(0).getBoundingClientRect();
        this._contextMenu.option({
          position: {
            my: 'left top',
            at: 'left top',
            collision: 'fit fit',
            offset: {
              x: event.clientX - startPosition.left,
              y: event.clientY - startPosition.top
            }
          }
        });
      };
      _proto._isTableTarget = function _isTableTarget(targetElement) {
        return !!(0, _renderer.default)(targetElement).closest('.dx-htmleditor-content td, .dx-htmleditor-content th').length;
      };
      _proto.clean = function clean() {
        this._detachEvents();
      };
      _proto.option = function option(_option, value) {
        if (_option === 'tableContextMenu') {
          this.handleOptionChangeValue(value);
          return;
        }
        if (_option === 'enabled') {
          this.enabled = value;
          value ? this._enableContextMenu() : this.clean();
        } else if (_option === 'items') {
          var _this$_contextMenu2;
          (_this$_contextMenu2 = this._contextMenu) === null || _this$_contextMenu2 === void 0 ? void 0 : _this$_contextMenu2.dispose();
          this._contextMenu = this._createContextMenu(value);
        }
      };
      _proto.prepareCleanCallback = function prepareCleanCallback() {
        var _this5 = this;
        return function () {
          _this5.clean();
        };
      };
      return TableContextMenuModule;
    }(_base.default);
  }
  var _default = TableContextMenuModule;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["devextreme-quill","../../../core/renderer","./base","../../../events/core/events_engine","../../../events/utils/index","../../context_menu","../../../localization/message","../utils/table_helper","../utils/toolbar_helper","../../../core/utils/iterator","../../../core/utils/type","../../../core/utils/inflector","../../../core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("devextreme-quill"), require("../../../core/renderer"), require("./base"), require("../../../events/core/events_engine"), require("../../../events/utils/index"), require("../../context_menu"), require("../../../localization/message"), require("../utils/table_helper"), require("../utils/toolbar_helper"), require("../../../core/utils/iterator"), require("../../../core/utils/type"), require("../../../core/utils/inflector"), require("../../../core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tableContextMenu.js.map