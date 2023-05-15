!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/list/ui.list.edit.decorator.selection.js"], ["../../core/renderer","../../events/core/events_engine","../../events/click","../../core/utils/extend","../widget/ui.errors","../check_box","../radio_group/radio_button","../../events/utils/index","./ui.list.edit.decorator_registry","./ui.list.edit.decorator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/list/ui.list.edit.decorator.selection.js", ["../../core/renderer", "../../events/core/events_engine", "../../events/click", "../../core/utils/extend", "../widget/ui.errors", "../check_box", "../radio_group/radio_button", "../../events/utils/index", "./ui.list.edit.decorator_registry", "./ui.list.edit.decorator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _click = $__require("../../events/click");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _check_box = _interopRequireDefault($__require("../check_box"));
  var _radio_button = _interopRequireDefault($__require("../radio_group/radio_button"));
  var _index = $__require("../../events/utils/index");
  var _uiListEdit = $__require("./ui.list.edit.decorator_registry");
  var _uiListEdit2 = _interopRequireDefault($__require("./ui.list.edit.decorator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SELECT_DECORATOR_ENABLED_CLASS = 'dx-list-select-decorator-enabled';
  var SELECT_DECORATOR_SELECT_ALL_CLASS = 'dx-list-select-all';
  var SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS = 'dx-list-select-all-checkbox';
  var SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS = 'dx-list-select-all-label';
  var SELECT_CHECKBOX_CONTAINER_CLASS = 'dx-list-select-checkbox-container';
  var SELECT_CHECKBOX_CLASS = 'dx-list-select-checkbox';
  var SELECT_RADIO_BUTTON_CONTAINER_CLASS = 'dx-list-select-radiobutton-container';
  var SELECT_RADIO_BUTTON_CLASS = 'dx-list-select-radiobutton';
  var FOCUSED_STATE_CLASS = 'dx-state-focused';
  var CLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxListEditDecorator');
  (0, _uiListEdit.register)('selection', 'default', _uiListEdit2.default.inherit({
    _init: function _init() {
      this.callBase.apply(this, arguments);
      var selectionMode = this._list.option('selectionMode');
      this._singleStrategy = selectionMode === 'single';
      this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
      this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
      this._controlWidget = this._singleStrategy ? _radio_button.default : _check_box.default;
      this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
    },
    beforeBag: function beforeBag(config) {
      var $itemElement = config.$itemElement;
      var $container = config.$container.addClass(this._containerClass);
      var $control = (0, _renderer.default)('<div>').addClass(this._controlClass).appendTo($container);
      new this._controlWidget($control, (0, _extend.extend)(this._commonOptions(), {
        value: this._isSelected($itemElement),
        elementAttr: {
          'aria-label': 'Check State'
        },
        focusStateEnabled: false,
        hoverStateEnabled: false,
        onValueChanged: function (e) {
          e.event && this._list._saveSelectionChangeEvent(e.event);
          this._processCheckedState($itemElement, e.value);
          e.event && e.event.stopPropagation();
        }.bind(this)
      }));
    },
    modifyElement: function modifyElement(config) {
      this.callBase.apply(this, arguments);
      var $itemElement = config.$itemElement;
      var control = this._controlWidget.getInstance($itemElement.find('.' + this._controlClass));
      _events_engine.default.on($itemElement, 'stateChanged', function (e, state) {
        control.option('value', state);
      }.bind(this));
    },
    _updateSelectAllState: function _updateSelectAllState() {
      if (!this._$selectAll) {
        return;
      }
      this._selectAllCheckBox.option('value', this._list.isSelectAll());
    },
    afterRender: function afterRender() {
      if (this._list.option('selectionMode') !== 'all') {
        return;
      }
      if (!this._$selectAll) {
        this._renderSelectAll();
      } else {
        this._updateSelectAllState();
      }
    },
    handleKeyboardEvents: function handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
      var moveFocusDown = !moveFocusUp;
      var list = this._list;
      var $selectAll = this._$selectAll;
      var lastItemIndex = list._getLastItemIndex();
      var isFocusOutOfList = moveFocusUp && currentFocusedIndex === 0 || moveFocusDown && currentFocusedIndex === lastItemIndex;
      var hasSelectAllItem = !!$selectAll;
      if (hasSelectAllItem && isFocusOutOfList) {
        list.option('focusedElement', $selectAll);
        list.scrollToItem(list.option('focusedElement'));
        return true;
      }
      return false;
    },
    handleEnterPressing: function handleEnterPressing(e) {
      if (this._$selectAll && this._$selectAll.hasClass(FOCUSED_STATE_CLASS)) {
        e.target = this._$selectAll.get(0);
        this._list._saveSelectionChangeEvent(e);
        this._selectAllCheckBox.option('value', !this._selectAllCheckBox.option('value'));
        return true;
      }
    },
    _renderSelectAll: function _renderSelectAll() {
      var $selectAll = this._$selectAll = (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CLASS);
      var list = this._list;
      var downArrowHandler = list._supportedKeys().downArrow.bind(list);
      this._selectAllCheckBox = list._createComponent((0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS).appendTo($selectAll), _check_box.default, {
        elementAttr: {
          'aria-label': 'Select All'
        },
        focusStateEnabled: false,
        hoverStateEnabled: false
      });
      this._selectAllCheckBox.registerKeyHandler('downArrow', downArrowHandler);
      (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS).text(this._list.option('selectAllText')).appendTo($selectAll);
      this._list.itemsContainer().prepend($selectAll);
      this._updateSelectAllState();
      this._attachSelectAllHandler();
    },
    _attachSelectAllHandler: function _attachSelectAllHandler() {
      this._selectAllCheckBox.option('onValueChanged', this._selectAllHandler.bind(this));
      _events_engine.default.off(this._$selectAll, CLICK_EVENT_NAME);
      _events_engine.default.on(this._$selectAll, CLICK_EVENT_NAME, this._selectAllClickHandler.bind(this));
    },
    _selectAllHandler: function _selectAllHandler(e) {
      e.event && e.event.stopPropagation();
      var isSelectedAll = this._selectAllCheckBox.option('value');
      e.event && this._list._saveSelectionChangeEvent(e.event);
      if (isSelectedAll === true) {
        this._selectAllItems();
      } else if (isSelectedAll === false) {
        this._unselectAllItems();
      }
      this._list._createActionByOption('onSelectAllValueChanged')({
        value: isSelectedAll
      });
    },
    _checkSelectAllCapability: function _checkSelectAllCapability() {
      var list = this._list;
      var dataController = list._dataController;
      if (list.option('selectAllMode') === 'allPages' && list.option('grouped') && !dataController.group()) {
        _ui.default.log('W1010');
        return false;
      }
      return true;
    },
    _selectAllItems: function _selectAllItems() {
      if (!this._checkSelectAllCapability()) return;
      this._list._selection.selectAll(this._list.option('selectAllMode') === 'page');
    },
    _unselectAllItems: function _unselectAllItems() {
      if (!this._checkSelectAllCapability()) return;
      this._list._selection.deselectAll(this._list.option('selectAllMode') === 'page');
    },
    _selectAllClickHandler: function _selectAllClickHandler(e) {
      this._list._saveSelectionChangeEvent(e);
      this._selectAllCheckBox.option('value', !this._selectAllCheckBox.option('value'));
    },
    _isSelected: function _isSelected($itemElement) {
      return this._list.isItemSelected($itemElement);
    },
    _processCheckedState: function _processCheckedState($itemElement, checked) {
      if (checked) {
        this._list.selectItem($itemElement);
      } else {
        this._list.unselectItem($itemElement);
      }
    },
    dispose: function dispose() {
      this._disposeSelectAll();
      this._list.$element().removeClass(SELECT_DECORATOR_ENABLED_CLASS);
      this.callBase.apply(this, arguments);
    },
    _disposeSelectAll: function _disposeSelectAll() {
      if (this._$selectAll) {
        this._$selectAll.remove();
        this._$selectAll = null;
      }
    }
  }));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../events/click","../../core/utils/extend","../widget/ui.errors","../check_box","../radio_group/radio_button","../../events/utils/index","./ui.list.edit.decorator_registry","./ui.list.edit.decorator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../events/click"), require("../../core/utils/extend"), require("../widget/ui.errors"), require("../check_box"), require("../radio_group/radio_button"), require("../../events/utils/index"), require("./ui.list.edit.decorator_registry"), require("./ui.list.edit.decorator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.list.edit.decorator.selection.js.map