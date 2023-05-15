!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/integration/knockout/component_registrator.js"], ["../../core/renderer","knockout","../../core/utils/callbacks","../../core/utils/type","../../core/component_registrator_callbacks","../../ui/widget/ui.widget","../../viz/core/base_widget","../../renovation/component_wrapper/common/component","../../ui/draggable","../../ui/scroll_view","./template","../../ui/editor/editor","../../core/utils/locker","./utils","../../core/config"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/integration/knockout/component_registrator.js", ["../../core/renderer", "knockout", "../../core/utils/callbacks", "../../core/utils/type", "../../core/component_registrator_callbacks", "../../ui/widget/ui.widget", "../../viz/core/base_widget", "../../renovation/component_wrapper/common/component", "../../ui/draggable", "../../ui/scroll_view", "./template", "../../ui/editor/editor", "../../core/utils/locker", "./utils", "../../core/config"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _knockout = _interopRequireDefault($__require("knockout"));
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _type = $__require("../../core/utils/type");
  var _component_registrator_callbacks = _interopRequireDefault($__require("../../core/component_registrator_callbacks"));
  var _ui = _interopRequireDefault($__require("../../ui/widget/ui.widget"));
  var _base_widget = _interopRequireDefault($__require("../../viz/core/base_widget"));
  var _component = _interopRequireDefault($__require("../../renovation/component_wrapper/common/component"));
  var _draggable = _interopRequireDefault($__require("../../ui/draggable"));
  var _scroll_view = _interopRequireDefault($__require("../../ui/scroll_view"));
  var _template = $__require("./template");
  var _editor = _interopRequireDefault($__require("../../ui/editor/editor"));
  var _locker = _interopRequireDefault($__require("../../core/utils/locker"));
  var _utils = $__require("./utils");
  var _config = _interopRequireDefault($__require("../../core/config"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // eslint-disable-next-line no-restricted-imports

  if (_knockout.default) {
    var LOCKS_DATA_KEY = 'dxKoLocks';
    var CREATED_WITH_KO_DATA_KEY = 'dxKoCreation';
    var editorsBindingHandlers = [];
    var registerComponentKoBinding = function registerComponentKoBinding(componentName, componentClass) {
      if (_editor.default.isEditor(componentClass.prototype)) {
        editorsBindingHandlers.push(componentName);
      }
      _knockout.default.bindingHandlers[componentName] = {
        init: function init(domNode, valueAccessor) {
          var $element = (0, _renderer.default)(domNode);
          var optionChangedCallbacks = (0, _callbacks.default)();
          var optionsByReference = {};
          var component;
          var knockoutConfig = (0, _config.default)().knockout;
          var isBindingPropertyPredicateName = knockoutConfig && knockoutConfig.isBindingPropertyPredicateName;
          var isBindingPropertyPredicate;
          var ctorOptions = {
            onInitializing: function onInitializing(options) {
              var _this = this;
              optionsByReference = this._getOptionsByReference();
              _knockout.default.computed(function () {
                var model = _knockout.default.unwrap(valueAccessor());
                if (component) {
                  component.beginUpdate();
                }
                isBindingPropertyPredicate = isBindingPropertyPredicateName && model && model[isBindingPropertyPredicateName];
                unwrapModel(model);
                if (component) {
                  component.endUpdate();
                } else {
                  var _model$onInitializing;
                  model === null || model === void 0 ? void 0 : (_model$onInitializing = model.onInitializing) === null || _model$onInitializing === void 0 ? void 0 : _model$onInitializing.call(_this, options);
                }
              }, null, {
                disposeWhenNodeIsRemoved: domNode
              });
              component = this;
            },
            modelByElement: function modelByElement($element) {
              if ($element.length) {
                var node = (0, _utils.getClosestNodeWithContext)($element.get(0));
                return _knockout.default.dataFor(node);
              }
            },
            nestedComponentOptions: function nestedComponentOptions(component) {
              return {
                modelByElement: component.option('modelByElement'),
                nestedComponentOptions: component.option('nestedComponentOptions')
              };
            },
            _optionChangedCallbacks: optionChangedCallbacks,
            integrationOptions: {
              watchMethod: function watchMethod(fn, callback, options) {
                options = options || {};
                var skipCallback = options.skipImmediate;
                var watcher = _knockout.default.computed(function () {
                  var newValue = _knockout.default.unwrap(fn());
                  if (!skipCallback) {
                    callback(newValue);
                  }
                  skipCallback = false;
                });
                return function () {
                  watcher.dispose();
                };
              },
              templates: {
                'dx-polymorph-widget': {
                  render: function render(options) {
                    var widgetName = _knockout.default.utils.unwrapObservable(options.model.widget);
                    if (!widgetName) {
                      return;
                    }
                    var markup = (0, _renderer.default)('<div>').attr('data-bind', widgetName + ': options').get(0);
                    (0, _renderer.default)(options.container).append(markup);
                    _knockout.default.applyBindings(options.model, markup);
                  }
                }
              },
              createTemplate: function createTemplate(element) {
                return new _template.KoTemplate(element);
              }
            }
          };
          var optionNameToModelMap = {};
          var applyModelValueToOption = function applyModelValueToOption(optionName, modelValue, unwrap) {
            var locks = $element.data(LOCKS_DATA_KEY);
            var optionValue = unwrap ? _knockout.default.unwrap(modelValue) : modelValue;
            if (_knockout.default.isWriteableObservable(modelValue)) {
              optionNameToModelMap[optionName] = modelValue;
            }
            if (component) {
              if (locks.locked(optionName)) {
                return;
              }
              locks.obtain(optionName);
              try {
                if (_knockout.default.ignoreDependencies) {
                  _knockout.default.ignoreDependencies(component.option, component, [optionName, optionValue]);
                } else {
                  component.option(optionName, optionValue);
                }
              } finally {
                locks.release(optionName);
              }
            } else {
              ctorOptions[optionName] = optionValue;
            }
          };
          var handleOptionChanged = function handleOptionChanged(args) {
            var optionName = args.fullName;
            var optionValue = args.value;
            if (!(optionName in optionNameToModelMap)) {
              return;
            }
            var $element = this._$element;
            var locks = $element.data(LOCKS_DATA_KEY);
            if (locks.locked(optionName)) {
              return;
            }
            locks.obtain(optionName);
            try {
              optionNameToModelMap[optionName](optionValue);
            } finally {
              locks.release(optionName);
            }
          };
          var createComponent = function createComponent() {
            optionChangedCallbacks.add(handleOptionChanged);
            $element.data(CREATED_WITH_KO_DATA_KEY, true).data(LOCKS_DATA_KEY, new _locker.default());
            new componentClass($element, ctorOptions);
            ctorOptions = null;
          };
          var unwrapModelValue = function unwrapModelValue(currentModel, propertyName, propertyPath) {
            if (propertyPath === isBindingPropertyPredicateName) {
              return;
            }
            if (!isBindingPropertyPredicate || isBindingPropertyPredicate(propertyPath, propertyName, currentModel)) {
              var unwrappedPropertyValue;
              _knockout.default.computed(function () {
                var propertyValue = currentModel[propertyName];
                applyModelValueToOption(propertyPath, propertyValue, true);
                unwrappedPropertyValue = _knockout.default.unwrap(propertyValue);
              }, null, {
                disposeWhenNodeIsRemoved: domNode
              });
              if ((0, _type.isPlainObject)(unwrappedPropertyValue)) {
                if (!optionsByReference[propertyPath]) {
                  unwrapModel(unwrappedPropertyValue, propertyPath);
                }
              }
            } else {
              applyModelValueToOption(propertyPath, currentModel[propertyName], false);
            }
          };
          function unwrapModel(model, propertyPath) {
            for (var propertyName in model) {
              if (Object.prototype.hasOwnProperty.call(model, propertyName)) {
                unwrapModelValue(model, propertyName, propertyPath ? [propertyPath, propertyName].join('.') : propertyName);
              }
            }
          }
          createComponent();
          return {
            controlsDescendantBindings: componentClass.subclassOf(_ui.default) || componentClass.subclassOf(_base_widget.default) || componentClass.subclassOf(_component.default) && !(component instanceof _scroll_view.default) || component instanceof _draggable.default
          };
        }
      };
      if (componentName === 'dxValidator') {
        _knockout.default.bindingHandlers['dxValidator'].after = editorsBindingHandlers;
      }
    };
    _component_registrator_callbacks.default.add(function (name, componentClass) {
      registerComponentKoBinding(name, componentClass);
    });
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","knockout","../../core/utils/callbacks","../../core/utils/type","../../core/component_registrator_callbacks","../../ui/widget/ui.widget","../../viz/core/base_widget","../../renovation/component_wrapper/common/component","../../ui/draggable","../../ui/scroll_view","./template","../../ui/editor/editor","../../core/utils/locker","./utils","../../core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("knockout"), require("../../core/utils/callbacks"), require("../../core/utils/type"), require("../../core/component_registrator_callbacks"), require("../../ui/widget/ui.widget"), require("../../viz/core/base_widget"), require("../../renovation/component_wrapper/common/component"), require("../../ui/draggable"), require("../../ui/scroll_view"), require("./template"), require("../../ui/editor/editor"), require("../../core/utils/locker"), require("./utils"), require("../../core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=component_registrator.js.map