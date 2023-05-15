!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/tooltip_strategies/tooltipStrategyBase.js"], ["../../button","../../../core/templates/function_template","../../../core/renderer","../../list/ui.list.edit"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/tooltip_strategies/tooltipStrategyBase.js", ["../../button", "../../../core/templates/function_template", "../../../core/renderer", "../../list/ui.list.edit"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TooltipStrategyBase = void 0;
  var _button = _interopRequireDefault($__require("../../button"));
  var _function_template = $__require("../../../core/templates/function_template");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _uiList = _interopRequireDefault($__require("../../list/ui.list.edit"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var TOOLTIP_APPOINTMENT_ITEM = 'dx-tooltip-appointment-item';
  var TOOLTIP_APPOINTMENT_ITEM_CONTENT = TOOLTIP_APPOINTMENT_ITEM + '-content';
  var TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT = TOOLTIP_APPOINTMENT_ITEM + '-content-subject';
  var TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE = TOOLTIP_APPOINTMENT_ITEM + '-content-date';
  var TOOLTIP_APPOINTMENT_ITEM_MARKER = TOOLTIP_APPOINTMENT_ITEM + '-marker';
  var TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY = TOOLTIP_APPOINTMENT_ITEM + '-marker-body';
  var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER = TOOLTIP_APPOINTMENT_ITEM + '-delete-button-container';
  var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON = TOOLTIP_APPOINTMENT_ITEM + '-delete-button';
  var TooltipStrategyBase = /*#__PURE__*/function () {
    function TooltipStrategyBase(options) {
      this._tooltip = null;
      this._options = options;
      this._extraOptions = null;
    }
    var _proto = TooltipStrategyBase.prototype;
    _proto.show = function show(target, dataList, extraOptions) {
      if (this._canShowTooltip(dataList)) {
        this.hide();
        this._extraOptions = extraOptions;
        this._showCore(target, dataList);
      }
    };
    _proto._showCore = function _showCore(target, dataList) {
      if (!this._tooltip) {
        this._tooltip = this._createTooltip(target, dataList);
      } else {
        this._shouldUseTarget() && this._tooltip.option('target', target);
        this._list.option('dataSource', dataList);
      }
      this._prepareBeforeVisibleChanged(dataList);
      this._tooltip.option('visible', true);
    };
    _proto._prepareBeforeVisibleChanged = function _prepareBeforeVisibleChanged(dataList) {};
    _proto._getContentTemplate = function _getContentTemplate(dataList) {
      var _this = this;
      return function (container) {
        var listElement = (0, _renderer.default)('<div>');
        (0, _renderer.default)(container).append(listElement);
        _this._list = _this._createList(listElement, dataList);
      };
    };
    _proto.isAlreadyShown = function isAlreadyShown(target) {
      if (this._tooltip && this._tooltip.option('visible')) {
        return this._tooltip.option('target')[0] === target[0];
      }
    };
    _proto._onShown = function _onShown() {
      this._list.option('focusStateEnabled', this._extraOptions.focusStateEnabled);
    };
    _proto.dispose = function dispose() {};
    _proto.hide = function hide() {
      if (this._tooltip) {
        this._tooltip.option('visible', false);
      }
    };
    _proto._shouldUseTarget = function _shouldUseTarget() {
      return true;
    };
    _proto._createTooltip = function _createTooltip() {};
    _proto._canShowTooltip = function _canShowTooltip(dataList) {
      if (!dataList.length) {
        return false;
      }
      return true;
    };
    _proto._createListOption = function _createListOption(dataList) {
      var _this2 = this;
      return {
        dataSource: dataList,
        onContentReady: this._onListRender.bind(this),
        onItemClick: function onItemClick(e) {
          return _this2._onListItemClick(e);
        },
        itemTemplate: function itemTemplate(item, index) {
          return _this2._renderTemplate(item.appointment, item.targetedAppointment, index, item.color);
        },
        _swipeEnabled: false,
        pageLoadMode: 'scrollBottom'
      };
    };
    _proto._onListRender = function _onListRender() {};
    _proto._createTooltipElement = function _createTooltipElement(wrapperClass) {
      return (0, _renderer.default)('<div>').appendTo(this._options.container).addClass(wrapperClass);
    };
    _proto._createList = function _createList(listElement, dataList) {
      return this._options.createComponent(listElement, _uiList.default, this._createListOption(dataList));
    };
    _proto._renderTemplate = function _renderTemplate(appointment, targetedAppointment, index, color) {
      var itemListContent = this._createItemListContent(appointment, targetedAppointment, color);
      this._options.addDefaultTemplates(_defineProperty({}, this._getItemListTemplateName(), new _function_template.FunctionTemplate(function (options) {
        var $container = (0, _renderer.default)(options.container);
        $container.append(itemListContent);
        return $container;
      })));
      var template = this._options.getAppointmentTemplate(this._getItemListTemplateName() + 'Template');
      return this._createFunctionTemplate(template, appointment, targetedAppointment, index);
    };
    _proto._createFunctionTemplate = function _createFunctionTemplate(template, appointmentData, targetedAppointmentData, index) {
      var isButtonClicked = !!this._extraOptions.isButtonClick;
      var isEmptyDropDownAppointmentTemplate = this._isEmptyDropDownAppointmentTemplate();
      return new _function_template.FunctionTemplate(function (options) {
        return template.render({
          model: isEmptyDropDownAppointmentTemplate ? {
            appointmentData: appointmentData,
            targetedAppointmentData: targetedAppointmentData,
            isButtonClicked: isButtonClicked
          } : appointmentData,
          container: options.container,
          index: index
        });
      });
    };
    _proto._getItemListTemplateName = function _getItemListTemplateName() {
      return this._isEmptyDropDownAppointmentTemplate() ? 'appointmentTooltip' : 'dropDownAppointment';
    };
    _proto._isEmptyDropDownAppointmentTemplate = function _isEmptyDropDownAppointmentTemplate() {
      return !this._extraOptions.dropDownAppointmentTemplate || this._extraOptions.dropDownAppointmentTemplate === 'dropDownAppointment';
    };
    _proto._onListItemClick = function _onListItemClick(e) {
      this.hide();
      this._extraOptions.clickEvent && this._extraOptions.clickEvent(e);
      this._options.showAppointmentPopup(e.itemData.appointment, false, e.itemData.targetedAppointment);
    };
    _proto._createItemListContent = function _createItemListContent(appointment, targetedAppointment, color) {
      var editing = this._extraOptions.editing;
      var $itemElement = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM);
      $itemElement.append(this._createItemListMarker(color));
      $itemElement.append(this._createItemListInfo(this._options.createFormattedDateText(appointment, targetedAppointment)));
      var disabled = this._options.getAppointmentDisabled(appointment);
      if (!disabled && (editing && editing.allowDeleting === true || editing === true)) {
        $itemElement.append(this._createDeleteButton(appointment, targetedAppointment));
      }
      return $itemElement;
    };
    _proto._createItemListMarker = function _createItemListMarker(color) {
      var $marker = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER);
      var $markerBody = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY);
      $marker.append($markerBody);
      color && color.done(function (value) {
        return $markerBody.css('background', value);
      });
      return $marker;
    };
    _proto._createItemListInfo = function _createItemListInfo(object) {
      var result = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT);
      var $title = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT).text(object.text);
      var $date = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE).text(object.formatDate);
      return result.append($title).append($date);
    };
    _proto._createDeleteButton = function _createDeleteButton(appointment, targetedAppointment) {
      var _this3 = this;
      var $container = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER);
      var $deleteButton = (0, _renderer.default)('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON);
      $container.append($deleteButton);
      this._options.createComponent($deleteButton, _button.default, {
        icon: 'trash',
        stylingMode: 'text',
        onClick: function onClick(e) {
          _this3.hide();
          e.event.stopPropagation();
          _this3._options.checkAndDeleteAppointment(appointment, targetedAppointment);
        }
      });
      return $container;
    };
    return TooltipStrategyBase;
  }();
  exports.TooltipStrategyBase = TooltipStrategyBase;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../button","../../../core/templates/function_template","../../../core/renderer","../../list/ui.list.edit"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../button"), require("../../../core/templates/function_template"), require("../../../core/renderer"), require("../../list/ui.list.edit"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tooltipStrategyBase.js.map