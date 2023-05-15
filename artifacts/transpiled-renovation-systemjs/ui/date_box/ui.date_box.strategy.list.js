!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.list.js"], ["../../core/utils/size","../../core/utils/window","../list_light","../list/modules/selection","./ui.date_box.strategy","../../core/utils/common","../../core/utils/type","../../core/utils/extend","./ui.date_utils","../../localization/date","../../core/utils/date_serialization","../drop_down_editor/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.list.js", ["../../core/utils/size", "../../core/utils/window", "../list_light", "../list/modules/selection", "./ui.date_box.strategy", "../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "./ui.date_utils", "../../localization/date", "../../core/utils/date_serialization", "../drop_down_editor/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _window = $__require("../../core/utils/window");
  var _list_light = _interopRequireDefault($__require("../list_light"));
  $__require("../list/modules/selection");
  var _uiDate_box = _interopRequireDefault($__require("./ui.date_box.strategy"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("./ui.date_utils"));
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  var _utils = $__require("../drop_down_editor/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var DATE_FORMAT = 'date';
  var BOUNDARY_VALUES = {
    'min': new Date(0, 0, 0, 0, 0),
    'max': new Date(0, 0, 0, 23, 59)
  };
  var ListStrategy = _uiDate_box.default.inherit({
    NAME: 'List',
    supportedKeys: function supportedKeys() {
      return {
        tab: function tab() {
          var _this$option = this.option(),
              opened = _this$option.opened,
              applyValueMode = _this$option.applyValueMode;
          if (opened && applyValueMode === 'instantly') {
            this.close();
          }
        },
        space: _common.noop,
        home: _common.noop,
        end: _common.noop
      };
    },
    getDefaultOptions: function getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        applyValueMode: 'instantly'
      });
    },
    getDisplayFormat: function getDisplayFormat(displayFormat) {
      return displayFormat || 'shorttime';
    },
    popupConfig: function popupConfig(_popupConfig) {
      return _popupConfig;
    },
    getValue: function getValue() {
      var selectedIndex = this._widget.option('selectedIndex');
      if (selectedIndex === -1) {
        return this.dateBox.option('value');
      }
      var itemData = this._widgetItems[selectedIndex];
      return this._getDateByItemData(itemData);
    },
    useCurrentDateByDefault: function useCurrentDateByDefault() {
      return true;
    },
    getDefaultDate: function getDefaultDate() {
      return new Date(null);
    },
    popupShowingHandler: function popupShowingHandler() {
      this.dateBox._dimensionChanged();
    },
    _renderWidget: function _renderWidget() {
      this.callBase();
      this._refreshItems();
    },
    _getWidgetName: function _getWidgetName() {
      return _list_light.default;
    },
    _getWidgetOptions: function _getWidgetOptions() {
      return {
        itemTemplate: this._timeListItemTemplate.bind(this),
        onItemClick: this._listItemClickHandler.bind(this),
        tabIndex: -1,
        onFocusedItemChanged: this._refreshActiveDescendant.bind(this),
        selectionMode: 'single'
      };
    },
    _refreshActiveDescendant: function _refreshActiveDescendant(e) {
      this.dateBox.setAria('activedescendant', '');
      this.dateBox.setAria('activedescendant', e.actionValue);
    },
    _refreshItems: function _refreshItems() {
      this._widgetItems = this._getTimeListItems();
      this._widget.option('items', this._widgetItems);
    },
    renderOpenedState: function renderOpenedState() {
      if (!this._widget) {
        return;
      }
      this._widget.option('focusedElement', null);
      this._setSelectedItemsByValue();
      if (this._widget.option('templatesRenderAsynchronously')) {
        this._asyncScrollTimeout = setTimeout(this._scrollToSelectedItem.bind(this));
      } else {
        this._scrollToSelectedItem();
      }
    },
    dispose: function dispose() {
      this.callBase();
      clearTimeout(this._asyncScrollTimeout);
    },
    _updateValue: function _updateValue() {
      if (!this._widget) {
        return;
      }
      this._refreshItems();
      this._setSelectedItemsByValue();
      this._scrollToSelectedItem();
    },
    _setSelectedItemsByValue: function _setSelectedItemsByValue() {
      var value = this.dateBoxValue();
      var dateIndex = this._getDateIndex(value);
      if (dateIndex === -1) {
        this._widget.option('selectedItems', []);
      } else {
        this._widget.option('selectedIndex', dateIndex);
      }
    },
    _scrollToSelectedItem: function _scrollToSelectedItem() {
      this._widget.scrollToItem(this._widget.option('selectedIndex'));
    },
    _getDateIndex: function _getDateIndex(date) {
      var result = -1;
      for (var i = 0, n = this._widgetItems.length; i < n; i++) {
        if (this._areDatesEqual(date, this._widgetItems[i])) {
          result = i;
          break;
        }
      }
      return result;
    },
    _areDatesEqual: function _areDatesEqual(first, second) {
      return (0, _type.isDate)(first) && (0, _type.isDate)(second) && first.getHours() === second.getHours() && first.getMinutes() === second.getMinutes();
    },
    _getTimeListItems: function _getTimeListItems() {
      var min = this.dateBox.dateOption('min') || this._getBoundaryDate('min');
      var max = this.dateBox.dateOption('max') || this._getBoundaryDate('max');
      var value = this.dateBox.dateOption('value') || null;
      var delta = max - min;
      var minutes = min.getMinutes() % this.dateBox.option('interval');
      if (delta < 0) {
        return [];
      }
      if (delta > _ui.default.ONE_DAY) {
        delta = _ui.default.ONE_DAY;
      }
      if (value - min < _ui.default.ONE_DAY) {
        return this._getRangeItems(min, new Date(min), delta);
      }
      min = this._getBoundaryDate('min');
      min.setMinutes(minutes);
      if (value && Math.abs(value - max) < _ui.default.ONE_DAY) {
        delta = (max.getHours() * 60 + Math.abs(max.getMinutes() - minutes)) * _ui.default.ONE_MINUTE;
      }
      return this._getRangeItems(min, new Date(min), delta);
    },
    _getRangeItems: function _getRangeItems(startValue, currentValue, rangeDuration) {
      var rangeItems = [];
      var interval = this.dateBox.option('interval');
      while (currentValue - startValue <= rangeDuration) {
        rangeItems.push(new Date(currentValue));
        currentValue.setMinutes(currentValue.getMinutes() + interval);
      }
      return rangeItems;
    },
    _getBoundaryDate: function _getBoundaryDate(boundary) {
      var boundaryValue = BOUNDARY_VALUES[boundary];
      var currentValue = new Date((0, _common.ensureDefined)(this.dateBox.dateOption('value'), 0));
      return new Date(currentValue.getFullYear(), currentValue.getMonth(), currentValue.getDate(), boundaryValue.getHours(), boundaryValue.getMinutes());
    },
    _timeListItemTemplate: function _timeListItemTemplate(itemData) {
      var displayFormat = this.dateBox.option('displayFormat');
      return _date.default.format(itemData, this.getDisplayFormat(displayFormat));
    },
    _listItemClickHandler: function _listItemClickHandler(e) {
      if (this.dateBox.option('applyValueMode') === 'useButtons') {
        return;
      }
      var date = this._getDateByItemData(e.itemData);
      this.dateBox.option('opened', false);
      this.dateBoxValue(date, e.event);
    },
    _getDateByItemData: function _getDateByItemData(itemData) {
      var date = this.dateBox.option('value');
      var hours = itemData.getHours();
      var minutes = itemData.getMinutes();
      var seconds = itemData.getSeconds();
      var year = itemData.getFullYear();
      var month = itemData.getMonth();
      var day = itemData.getDate();
      if (date) {
        if (this.dateBox.option('dateSerializationFormat')) {
          date = _date_serialization.default.deserializeDate(date);
        } else {
          date = new Date(date);
        }
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
      } else {
        date = new Date(year, month, day, hours, minutes, 0, 0);
      }
      return date;
    },
    getKeyboardListener: function getKeyboardListener() {
      return this._widget;
    },
    _updatePopupHeight: function _updatePopupHeight() {
      var dropDownOptionsHeight = (0, _utils.getSizeValue)(this.dateBox.option('dropDownOptions.height'));
      if (dropDownOptionsHeight === undefined || dropDownOptionsHeight === 'auto') {
        this.dateBox._setPopupOption('height', 'auto');
        var popupHeight = (0, _size.getOuterHeight)(this._widget.$element());
        var maxHeight = (0, _size.getHeight)(window) * 0.45;
        this.dateBox._setPopupOption('height', Math.min(popupHeight, maxHeight));
      }
      this.dateBox._timeList && this.dateBox._timeList.updateDimensions();
    },
    getParsedText: function getParsedText(text, format) {
      var value = this.callBase(text, format);
      if (value) {
        value = _ui.default.mergeDates(value, new Date(null), DATE_FORMAT);
      }
      return value;
    }
  });
  var _default = ListStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/utils/window","../list_light","../list/modules/selection","./ui.date_box.strategy","../../core/utils/common","../../core/utils/type","../../core/utils/extend","./ui.date_utils","../../localization/date","../../core/utils/date_serialization","../drop_down_editor/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/utils/window"), require("../list_light"), require("../list/modules/selection"), require("./ui.date_box.strategy"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("./ui.date_utils"), require("../../localization/date"), require("../../core/utils/date_serialization"), require("../drop_down_editor/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.strategy.list.js.map