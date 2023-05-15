!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/compactAppointmentsHelper.js"], ["../../core/renderer","../button","../../animation/translator","../../localization/message","../../core/templates/function_template","../../core/utils/deferred","../../core/utils/extend","../../core/utils/position","./dataStructures","./constants","./appointmentAdapter","../../renovation/ui/scheduler/appointment/overflow_indicator/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/compactAppointmentsHelper.js", ["../../core/renderer", "../button", "../../animation/translator", "../../localization/message", "../../core/templates/function_template", "../../core/utils/deferred", "../../core/utils/extend", "../../core/utils/position", "./dataStructures", "./constants", "./appointmentAdapter", "../../renovation/ui/scheduler/appointment/overflow_indicator/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.CompactAppointmentsHelper = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _button = _interopRequireDefault($__require("../button"));
  var _translator = $__require("../../animation/translator");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _function_template = $__require("../../core/templates/function_template");
  var _deferred = $__require("../../core/utils/deferred");
  var _extend = $__require("../../core/utils/extend");
  var _position = $__require("../../core/utils/position");
  var _dataStructures = $__require("./dataStructures");
  var _constants = $__require("./constants");
  var _appointmentAdapter = $__require("./appointmentAdapter");
  var _utils = $__require("../../renovation/ui/scheduler/appointment/overflow_indicator/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
  var COMPACT_APPOINTMENT_COLLECTOR_CLASS = APPOINTMENT_COLLECTOR_CLASS + '-compact';
  var APPOINTMENT_COLLECTOR_CONTENT_CLASS = APPOINTMENT_COLLECTOR_CLASS + '-content';
  var WEEK_VIEW_COLLECTOR_OFFSET = 5;
  var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
  var CompactAppointmentsHelper = /*#__PURE__*/function () {
    function CompactAppointmentsHelper(instance) {
      this.instance = instance;
      this.elements = [];
    }
    var _proto = CompactAppointmentsHelper.prototype;
    _proto.render = function render(options) {
      var isCompact = options.isCompact,
          items = options.items,
          buttonColor = options.buttonColor;
      var template = this._createTemplate(items.data.length, isCompact);
      var button = this._createCompactButton(template, options);
      var $button = button.$element();
      this._makeBackgroundColor($button, items.colors, buttonColor);
      this._makeBackgroundDarker($button);
      this.elements.push($button);
      $button.data('items', this._createTooltipInfos(items));
      return $button;
    };
    _proto.clear = function clear() {
      this.elements.forEach(function (button) {
        button.detach();
        button.remove();
      });
      this.elements = [];
    };
    _proto._createTooltipInfos = function _createTooltipInfos(items) {
      var _this = this;
      return items.data.map(function (appointment, index) {
        var _items$settings;
        var targetedAdapter = (0, _appointmentAdapter.createAppointmentAdapter)(appointment, _this.instance._dataAccessors, _this.instance.timeZoneCalculator).clone();
        if (((_items$settings = items.settings) === null || _items$settings === void 0 ? void 0 : _items$settings.length) > 0) {
          var info = items.settings[index].info;
          targetedAdapter.startDate = info.sourceAppointment.startDate;
          targetedAdapter.endDate = info.sourceAppointment.endDate;
        }
        return new _dataStructures.AppointmentTooltipInfo(appointment, targetedAdapter.source(), items.colors[index], items.settings[index]);
      });
    };
    _proto._onButtonClick = function _onButtonClick(e, options) {
      var $button = (0, _renderer.default)(e.element);
      this.instance.showAppointmentTooltipCore($button, $button.data('items'), this._getExtraOptionsForTooltip(options, $button));
    };
    _proto._getExtraOptionsForTooltip = function _getExtraOptionsForTooltip(options, $appointmentCollector) {
      return {
        clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
        dragBehavior: options.allowDrag && this._createTooltipDragBehavior($appointmentCollector).bind(this),
        dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
        // TODO deprecated option
        isButtonClick: true
      };
    };
    _proto._clickEvent = function _clickEvent(onAppointmentClick) {
      var _this2 = this;
      return function (e) {
        var config = {
          itemData: e.itemData.appointment,
          itemElement: e.itemElement,
          targetedAppointment: e.itemData.targetedAppointment
        };
        var createClickEvent = (0, _extend.extendFromObject)(_this2.instance.fire('mapAppointmentFields', config), e, false);
        delete createClickEvent.itemData;
        delete createClickEvent.itemIndex;
        delete createClickEvent.itemElement;
        onAppointmentClick(createClickEvent);
      };
    };
    _proto._createTooltipDragBehavior = function _createTooltipDragBehavior($appointmentCollector) {
      var _this3 = this;
      return function (e) {
        var $element = (0, _renderer.default)(e.element);
        var $schedulerElement = (0, _renderer.default)(_this3.instance.element());
        var workSpace = _this3.instance.getWorkSpace();
        var getItemData = function getItemData(itemElement) {
          var _$$data;
          return (_$$data = (0, _renderer.default)(itemElement).data(_constants.LIST_ITEM_DATA_KEY)) === null || _$$data === void 0 ? void 0 : _$$data.appointment;
        };
        var getItemSettings = function getItemSettings(_, event) {
          return event.itemSettings;
        };
        var initialPosition = (0, _translator.locate)($appointmentCollector);
        var options = {
          filter: ".".concat(_constants.LIST_ITEM_CLASS),
          isSetCursorOffset: true,
          initialPosition: initialPosition,
          getItemData: getItemData,
          getItemSettings: getItemSettings
        };
        workSpace._createDragBehaviorBase($element, $schedulerElement, options);
      };
    };
    _proto._getCollectorOffset = function _getCollectorOffset(width, cellWidth) {
      return cellWidth - width - this._getCollectorRightOffset();
    };
    _proto._getCollectorRightOffset = function _getCollectorRightOffset() {
      return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
    };
    _proto._makeBackgroundDarker = function _makeBackgroundDarker(button) {
      button.css('boxShadow', "inset ".concat((0, _position.getBoundingRect)(button.get(0)).width, "px 0 0 0 rgba(0, 0, 0, 0.3)"));
    };
    _proto._makeBackgroundColor = function _makeBackgroundColor($button, colors, color) {
      _deferred.when.apply(null, colors).done(function () {
        this._makeBackgroundColorCore($button, color, Array.prototype.slice.call(arguments));
      }.bind(this));
    };
    _proto._makeBackgroundColorCore = function _makeBackgroundColorCore($button, color, itemColors) {
      color && color.done(function (color) {
        var backgroundColor = (0, _utils.getOverflowIndicatorColor)(color, itemColors);
        if (backgroundColor) {
          $button.css('backgroundColor', backgroundColor);
        }
      });
    };
    _proto._setPosition = function _setPosition(element, position) {
      (0, _translator.move)(element, {
        top: position.top,
        left: position.left
      });
    };
    _proto._createCompactButton = function _createCompactButton(template, options) {
      var _this4 = this;
      var $button = this._createCompactButtonElement(options);
      return this.instance._createComponent($button, _button.default, {
        type: 'default',
        width: options.width,
        height: options.height,
        onClick: function onClick(e) {
          return _this4._onButtonClick(e, options);
        },
        template: this._renderTemplate(template, options.items, options.isCompact)
      });
    };
    _proto._createCompactButtonElement = function _createCompactButtonElement(_ref) {
      var isCompact = _ref.isCompact,
          $container = _ref.$container,
          coordinates = _ref.coordinates;
      var result = (0, _renderer.default)('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
      this._setPosition(result, coordinates);
      return result;
    };
    _proto._renderTemplate = function _renderTemplate(template, items, isCompact) {
      return new _function_template.FunctionTemplate(function (options) {
        return template.render({
          model: {
            appointmentCount: items.data.length,
            isCompact: isCompact
          },
          container: options.container
        });
      });
    };
    _proto._createTemplate = function _createTemplate(count, isCompact) {
      this._initButtonTemplate(count, isCompact);
      return this.instance._getAppointmentTemplate('appointmentCollectorTemplate');
    };
    _proto._initButtonTemplate = function _initButtonTemplate(count, isCompact) {
      var _this5 = this;
      this.instance._templateManager.addDefaultTemplates({
        appointmentCollector: new _function_template.FunctionTemplate(function (options) {
          return _this5._createButtonTemplate(count, (0, _renderer.default)(options.container), isCompact);
        })
      });
    };
    _proto._createButtonTemplate = function _createButtonTemplate(appointmentCount, element, isCompact) {
      var text = isCompact ? appointmentCount : _message.default.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
      return element.append((0, _renderer.default)('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
    };
    return CompactAppointmentsHelper;
  }();
  exports.CompactAppointmentsHelper = CompactAppointmentsHelper;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../button","../../animation/translator","../../localization/message","../../core/templates/function_template","../../core/utils/deferred","../../core/utils/extend","../../core/utils/position","./dataStructures","./constants","./appointmentAdapter","../../renovation/ui/scheduler/appointment/overflow_indicator/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../button"), require("../../animation/translator"), require("../../localization/message"), require("../../core/templates/function_template"), require("../../core/utils/deferred"), require("../../core/utils/extend"), require("../../core/utils/position"), require("./dataStructures"), require("./constants"), require("./appointmentAdapter"), require("../../renovation/ui/scheduler/appointment/overflow_indicator/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=compactAppointmentsHelper.js.map