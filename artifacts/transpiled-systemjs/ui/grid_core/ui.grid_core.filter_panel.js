!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.filter_panel.js"], ["../../core/renderer","../../core/utils/type","./ui.grid_core.modules","./ui.grid_core.utils","../../events/core/events_engine","../../localization/message","../check_box","../filter_builder/utils","../../core/utils/deferred","../../core/utils/inflector","./ui.grid_core.accessibility"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.filter_panel.js", ["../../core/renderer", "../../core/utils/type", "./ui.grid_core.modules", "./ui.grid_core.utils", "../../events/core/events_engine", "../../localization/message", "../check_box", "../filter_builder/utils", "../../core/utils/deferred", "../../core/utils/inflector", "./ui.grid_core.accessibility"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.filterPanelModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _type = $__require("../../core/utils/type");
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _check_box = _interopRequireDefault($__require("../check_box"));
  var _utils = $__require("../filter_builder/utils");
  var _deferred = $__require("../../core/utils/deferred");
  var _inflector = $__require("../../core/utils/inflector");
  var _uiGrid_core3 = $__require("./ui.grid_core.accessibility");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var FILTER_PANEL_CLASS = 'filter-panel';
  var FILTER_PANEL_TEXT_CLASS = FILTER_PANEL_CLASS + '-text';
  var FILTER_PANEL_CHECKBOX_CLASS = FILTER_PANEL_CLASS + '-checkbox';
  var FILTER_PANEL_CLEAR_FILTER_CLASS = FILTER_PANEL_CLASS + '-clear-filter';
  var FILTER_PANEL_LEFT_CONTAINER = FILTER_PANEL_CLASS + '-left';
  var FILTER_PANEL_TARGET = 'filterPanel';
  var FilterPanelView = _uiGrid_core.default.View.inherit({
    isVisible: function isVisible() {
      return this.option('filterPanel.visible') && this.getController('data').dataSource();
    },
    init: function init() {
      var _this = this;
      this.getController('data').dataSourceChanged.add(function () {
        return _this.render();
      });
    },
    _renderCore: function _renderCore() {
      var that = this;
      var $element = that.element();
      $element.empty().addClass(that.addWidgetPrefix(FILTER_PANEL_CLASS));
      var $leftContainer = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FILTER_PANEL_LEFT_CONTAINER)).appendTo($element);
      if (that.option('filterValue') || that._filterValueBuffer) {
        $leftContainer.append(that._getCheckElement()).append(that._getFilterElement()).append(that._getTextElement());
        $element.append(that._getRemoveButtonElement());
      } else {
        $leftContainer.append(that._getFilterElement()).append(that._getTextElement());
      }
    },
    _getCheckElement: function _getCheckElement() {
      var that = this;
      var $element = (0, _renderer.default)('<div>').addClass(this.addWidgetPrefix(FILTER_PANEL_CHECKBOX_CLASS));
      that._createComponent($element, _check_box.default, {
        value: that.option('filterPanel.filterEnabled'),
        onValueChanged: function onValueChanged(e) {
          that.option('filterPanel.filterEnabled', e.value);
        }
      });
      $element.attr('title', this.option('filterPanel.texts.filterEnabledHint'));
      return $element;
    },
    _getFilterElement: function _getFilterElement() {
      var that = this;
      var $element = (0, _renderer.default)('<div>').addClass('dx-icon-filter');
      _events_engine.default.on($element, 'click', function () {
        return that._showFilterBuilder();
      });
      (0, _uiGrid_core3.registerKeyboardAction)('filterPanel', that, $element, undefined, function () {
        return that._showFilterBuilder();
      });
      that._addTabIndexToElement($element);
      return $element;
    },
    _getTextElement: function _getTextElement() {
      var that = this;
      var $textElement = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FILTER_PANEL_TEXT_CLASS));
      var filterText;
      var filterValue = that.option('filterValue');
      if (filterValue) {
        (0, _deferred.when)(that.getFilterText(filterValue, that.getController('filterSync').getCustomFilterOperations())).done(function (filterText) {
          var customizeText = that.option('filterPanel.customizeText');
          if (customizeText) {
            var customText = customizeText({
              component: that.component,
              filterValue: filterValue,
              text: filterText
            });
            if (typeof customText === 'string') {
              filterText = customText;
            }
          }
          $textElement.text(filterText);
        });
      } else {
        filterText = that.option('filterPanel.texts.createFilter');
        $textElement.text(filterText);
      }
      _events_engine.default.on($textElement, 'click', function () {
        return that._showFilterBuilder();
      });
      (0, _uiGrid_core3.registerKeyboardAction)('filterPanel', that, $textElement, undefined, function () {
        return that._showFilterBuilder();
      });
      that._addTabIndexToElement($textElement);
      return $textElement;
    },
    _showFilterBuilder: function _showFilterBuilder() {
      this.option('filterBuilderPopup.visible', true);
    },
    _getRemoveButtonElement: function _getRemoveButtonElement() {
      var that = this;
      var clearFilterValue = function clearFilterValue() {
        return that.option('filterValue', null);
      };
      var $element = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FILTER_PANEL_CLEAR_FILTER_CLASS)).text(that.option('filterPanel.texts.clearFilter'));
      _events_engine.default.on($element, 'click', clearFilterValue);
      (0, _uiGrid_core3.registerKeyboardAction)('filterPanel', this, $element, undefined, clearFilterValue);
      that._addTabIndexToElement($element);
      return $element;
    },
    _addTabIndexToElement: function _addTabIndexToElement($element) {
      if (!this.option('useLegacyKeyboardNavigation')) {
        var tabindex = this.option('tabindex') || 0;
        $element.attr('tabindex', tabindex);
      }
    },
    optionChanged: function optionChanged(args) {
      switch (args.name) {
        case 'filterValue':
          this._invalidate();
          this.option('filterPanel.filterEnabled', true);
          args.handled = true;
          break;
        case 'filterPanel':
          this._invalidate();
          args.handled = true;
          break;
        default:
          this.callBase(args);
      }
    },
    _getConditionText: function _getConditionText(fieldText, operationText, valueText) {
      var result = "[".concat(fieldText, "] ").concat(operationText);
      if ((0, _type.isDefined)(valueText)) {
        result += valueText;
      }
      return result;
    },
    _getValueMaskedText: function _getValueMaskedText(value) {
      return Array.isArray(value) ? "('".concat(value.join('\', \''), "')") : " '".concat(value, "'");
    },
    _getValueText: function _getValueText(field, customOperation, value) {
      var _this2 = this;
      var deferred = new _deferred.Deferred();
      var hasCustomOperation = customOperation && customOperation.customizeText;
      if ((0, _type.isDefined)(value) || hasCustomOperation) {
        if (!hasCustomOperation && field.lookup) {
          (0, _utils.getCurrentLookupValueText)(field, value, function (data) {
            deferred.resolve(_this2._getValueMaskedText(data));
          });
        } else {
          var displayValue = Array.isArray(value) ? value : _uiGrid_core2.default.getDisplayValue(field, value);
          (0, _deferred.when)((0, _utils.getCurrentValueText)(field, displayValue, customOperation, FILTER_PANEL_TARGET)).done(function (data) {
            deferred.resolve(_this2._getValueMaskedText(data));
          });
        }
      } else {
        deferred.resolve('');
      }
      return deferred.promise();
    },
    getConditionText: function getConditionText(filterValue, options) {
      var that = this;
      var operation = filterValue[1];
      var deferred = new _deferred.Deferred();
      var customOperation = (0, _utils.getCustomOperation)(options.customOperations, operation);
      var operationText;
      var field = (0, _utils.getField)(filterValue[0], options.columns);
      var fieldText = field.caption || '';
      var value = filterValue[2];
      if (customOperation) {
        operationText = customOperation.caption || (0, _inflector.captionize)(customOperation.name);
      } else if (value === null) {
        operationText = (0, _utils.getCaptionByOperation)(operation === '=' ? 'isblank' : 'isnotblank', options.filterOperationDescriptions);
      } else {
        operationText = (0, _utils.getCaptionByOperation)(operation, options.filterOperationDescriptions);
      }
      this._getValueText(field, customOperation, value).done(function (valueText) {
        deferred.resolve(that._getConditionText(fieldText, operationText, valueText));
      });
      return deferred;
    },
    getGroupText: function getGroupText(filterValue, options, isInnerGroup) {
      var that = this;
      var result = new _deferred.Deferred();
      var textParts = [];
      var groupValue = (0, _utils.getGroupValue)(filterValue);
      filterValue.forEach(function (item) {
        if ((0, _utils.isCondition)(item)) {
          textParts.push(that.getConditionText(item, options));
        } else if ((0, _utils.isGroup)(item)) {
          textParts.push(that.getGroupText(item, options, true));
        }
      });
      _deferred.when.apply(this, textParts).done(function () {
        var text;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (groupValue[0] === '!') {
          var groupText = options.groupOperationDescriptions['not' + groupValue.substring(1, 2).toUpperCase() + groupValue.substring(2)].split(' ');
          text = "".concat(groupText[0], " ").concat(args[0]);
        } else {
          text = args.join(" ".concat(options.groupOperationDescriptions[groupValue], " "));
        }
        if (isInnerGroup) {
          text = "(".concat(text, ")");
        }
        result.resolve(text);
      });
      return result;
    },
    getFilterText: function getFilterText(filterValue, customOperations) {
      var that = this;
      var options = {
        customOperations: customOperations,
        columns: that.getController('columns').getFilteringColumns(),
        filterOperationDescriptions: that.option('filterBuilder.filterOperationDescriptions'),
        groupOperationDescriptions: that.option('filterBuilder.groupOperationDescriptions')
      };
      return (0, _utils.isCondition)(filterValue) ? that.getConditionText(filterValue, options) : that.getGroupText(filterValue, options);
    }
  });
  var filterPanelModule = {
    defaultOptions: function defaultOptions() {
      return {
        filterPanel: {
          visible: false,
          filterEnabled: true,
          texts: {
            createFilter: _message.default.format('dxDataGrid-filterPanelCreateFilter'),
            clearFilter: _message.default.format('dxDataGrid-filterPanelClearFilter'),
            filterEnabledHint: _message.default.format('dxDataGrid-filterPanelFilterEnabledHint')
          }
        }
      };
    },
    views: {
      filterPanelView: FilterPanelView
    },
    extenders: {
      controllers: {
        data: {
          optionChanged: function optionChanged(args) {
            switch (args.name) {
              case 'filterPanel':
                this._applyFilter();
                args.handled = true;
                break;
              default:
                this.callBase(args);
            }
          }
        }
      }
    }
  };
  exports.filterPanelModule = filterPanelModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/type","./ui.grid_core.modules","./ui.grid_core.utils","../../events/core/events_engine","../../localization/message","../check_box","../filter_builder/utils","../../core/utils/deferred","../../core/utils/inflector","./ui.grid_core.accessibility"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/type"), require("./ui.grid_core.modules"), require("./ui.grid_core.utils"), require("../../events/core/events_engine"), require("../../localization/message"), require("../check_box"), require("../filter_builder/utils"), require("../../core/utils/deferred"), require("../../core/utils/inflector"), require("./ui.grid_core.accessibility"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.filter_panel.js.map