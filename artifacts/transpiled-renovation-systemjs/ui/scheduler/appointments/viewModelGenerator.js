!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/viewModelGenerator.js"], ["./rendering_strategies/strategy_vertical","./rendering_strategies/strategy_week","./rendering_strategies/strategy_horizontal","./rendering_strategies/strategy_horizontal_month_line","./rendering_strategies/strategy_horizontal_month","./rendering_strategies/strategy_agenda","../../../renovation/ui/scheduler/appointment/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/viewModelGenerator.js", ["./rendering_strategies/strategy_vertical", "./rendering_strategies/strategy_week", "./rendering_strategies/strategy_horizontal", "./rendering_strategies/strategy_horizontal_month_line", "./rendering_strategies/strategy_horizontal_month", "./rendering_strategies/strategy_agenda", "../../../renovation/ui/scheduler/appointment/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.AppointmentViewModelGenerator = void 0;
  var _strategy_vertical = _interopRequireDefault($__require("./rendering_strategies/strategy_vertical"));
  var _strategy_week = _interopRequireDefault($__require("./rendering_strategies/strategy_week"));
  var _strategy_horizontal = _interopRequireDefault($__require("./rendering_strategies/strategy_horizontal"));
  var _strategy_horizontal_month_line = _interopRequireDefault($__require("./rendering_strategies/strategy_horizontal_month_line"));
  var _strategy_horizontal_month = _interopRequireDefault($__require("./rendering_strategies/strategy_horizontal_month"));
  var _strategy_agenda = _interopRequireDefault($__require("./rendering_strategies/strategy_agenda"));
  var _utils = $__require("../../../renovation/ui/scheduler/appointment/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var RENDERING_STRATEGIES = {
    'horizontal': _strategy_horizontal.default,
    'horizontalMonth': _strategy_horizontal_month.default,
    'horizontalMonthLine': _strategy_horizontal_month_line.default,
    'vertical': _strategy_vertical.default,
    'week': _strategy_week.default,
    'agenda': _strategy_agenda.default
  };
  var AppointmentViewModelGenerator = /*#__PURE__*/function () {
    function AppointmentViewModelGenerator() {}
    var _proto = AppointmentViewModelGenerator.prototype;
    _proto.initRenderingStrategy = function initRenderingStrategy(options) {
      var RenderingStrategy = RENDERING_STRATEGIES[options.appointmentRenderingStrategyName];
      this.renderingStrategy = new RenderingStrategy(options);
    };
    _proto.generate = function generate(filteredItems, options) {
      var isRenovatedAppointments = options.isRenovatedAppointments;
      var appointments = filteredItems ? filteredItems.slice() : [];
      this.initRenderingStrategy(options);
      var renderingStrategy = this.getRenderingStrategy();
      var positionMap = renderingStrategy.createTaskPositionMap(appointments); // TODO - appointments are mutated inside!
      var viewModel = this.postProcess(appointments, positionMap, isRenovatedAppointments);
      if (isRenovatedAppointments) {
        // TODO this structure should be by default after remove old render
        return this.makeRenovatedViewModels(viewModel, options.supportAllDayRow, options.isVerticalGroupOrientation);
      }
      return {
        positionMap: positionMap,
        viewModel: viewModel
      };
    };
    _proto.postProcess = function postProcess(filteredItems, positionMap, isRenovatedAppointments) {
      var renderingStrategy = this.getRenderingStrategy();
      return filteredItems.map(function (data, index) {
        // TODO research do we need this code
        if (!renderingStrategy.keepAppointmentSettings()) {
          delete data.settings;
        }

        // TODO Seems we can analize direction in the rendering strategies
        var appointmentSettings = positionMap[index];
        appointmentSettings.forEach(function (item) {
          item.direction = renderingStrategy.getDirection() === 'vertical' && !item.allDay ? 'vertical' : 'horizontal';
        });
        var item = {
          itemData: data,
          settings: appointmentSettings
        };
        if (!isRenovatedAppointments) {
          item.needRepaint = true;
          item.needRemove = false;
        }
        return item;
      });
    };
    _proto.makeRenovatedViewModels = function makeRenovatedViewModels(viewModel, supportAllDayRow, isVerticalGrouping) {
      var _this = this;
      var strategy = this.getRenderingStrategy();
      var regularViewModels = [];
      var allDayViewModels = [];
      var compactOptions = [];
      var isAllDayPanel = supportAllDayRow && !isVerticalGrouping;
      viewModel.forEach(function (_ref) {
        var itemData = _ref.itemData,
            settings = _ref.settings;
        settings.forEach(function (options) {
          var item = _this.prepareViewModel(options, strategy, itemData);
          if (options.isCompact) {
            compactOptions.push({
              compactViewModel: options.virtual,
              appointmentViewModel: item
            });
          } else if (options.allDay && isAllDayPanel) {
            allDayViewModels.push(item);
          } else {
            regularViewModels.push(item);
          }
        });
      });
      var compactViewModels = this.prepareCompactViewModels(compactOptions, supportAllDayRow);
      var result = _extends({
        allDay: allDayViewModels,
        regular: regularViewModels
      }, compactViewModels);
      return result;
    };
    _proto.prepareViewModel = function prepareViewModel(options, strategy, itemData) {
      var geometry = strategy.getAppointmentGeometry(options);
      var viewModel = {
        key: (0, _utils.getAppointmentKey)(geometry),
        appointment: itemData,
        geometry: _extends({}, geometry, {
          // TODO move to the rendering strategies
          leftVirtualWidth: options.leftVirtualWidth,
          topVirtualHeight: options.topVirtualHeight
        }),
        info: _extends({}, options.info, {
          allDay: options.allDay,
          direction: options.direction,
          appointmentReduced: options.appointmentReduced,
          groupIndex: options.groupIndex
        })
      };
      return viewModel;
    };
    _proto.getCompactViewModelFrame = function getCompactViewModelFrame(compactViewModel) {
      return {
        isAllDay: !!compactViewModel.isAllDay,
        isCompact: compactViewModel.isCompact,
        groupIndex: compactViewModel.groupIndex,
        geometry: {
          left: compactViewModel.left,
          top: compactViewModel.top,
          width: compactViewModel.width,
          height: compactViewModel.height
        },
        items: {
          colors: [],
          data: [],
          settings: []
        }
      };
    };
    _proto.prepareCompactViewModels = function prepareCompactViewModels(compactOptions, supportAllDayRow) {
      var _this2 = this;
      var regularCompact = {};
      var allDayCompact = {};
      compactOptions.forEach(function (_ref2) {
        var compactViewModel = _ref2.compactViewModel,
            appointmentViewModel = _ref2.appointmentViewModel;
        var index = compactViewModel.index,
            isAllDay = compactViewModel.isAllDay;
        var viewModel = isAllDay && supportAllDayRow ? allDayCompact : regularCompact;
        if (!viewModel[index]) {
          viewModel[index] = _this2.getCompactViewModelFrame(compactViewModel);
        }
        var _viewModel$index$item = viewModel[index].items,
            settings = _viewModel$index$item.settings,
            data = _viewModel$index$item.data,
            colors = _viewModel$index$item.colors;
        settings.push(appointmentViewModel);
        data.push(appointmentViewModel.appointment);
        colors.push(appointmentViewModel.info.resourceColor);
      });
      var toArray = function toArray(items) {
        return Object.keys(items).map(function (key) {
          return _extends({
            key: key
          }, items[key]);
        });
      };
      var allDayViewModels = toArray(allDayCompact);
      var regularViewModels = toArray(regularCompact);
      return {
        allDayCompact: allDayViewModels,
        regularCompact: regularViewModels
      };
    };
    _proto.getRenderingStrategy = function getRenderingStrategy() {
      return this.renderingStrategy;
    };
    return AppointmentViewModelGenerator;
  }();
  exports.AppointmentViewModelGenerator = AppointmentViewModelGenerator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./rendering_strategies/strategy_vertical","./rendering_strategies/strategy_week","./rendering_strategies/strategy_horizontal","./rendering_strategies/strategy_horizontal_month_line","./rendering_strategies/strategy_horizontal_month","./rendering_strategies/strategy_agenda","../../../renovation/ui/scheduler/appointment/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./rendering_strategies/strategy_vertical"), require("./rendering_strategies/strategy_week"), require("./rendering_strategies/strategy_horizontal"), require("./rendering_strategies/strategy_horizontal_month_line"), require("./rendering_strategies/strategy_horizontal_month"), require("./rendering_strategies/strategy_agenda"), require("../../../renovation/ui/scheduler/appointment/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=viewModelGenerator.js.map