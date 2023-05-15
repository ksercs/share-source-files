!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/integration/angular/component_registrator.js"], ["../../core/renderer","angular","../../events/core/events_engine","../../core/config","../../core/component_registrator_callbacks","../../core/class","../../core/utils/callbacks","../../core/utils/type","../../core/utils/iterator","../../core/utils/locker","../../ui/editor/editor","./template","./module","../../ui/collection/ui.collection_widget.edit","../../core/utils/data","../../core/utils/extend","../../core/utils/comparator","../../core/utils/inflector"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/integration/angular/component_registrator.js", ["../../core/renderer", "angular", "../../events/core/events_engine", "../../core/config", "../../core/component_registrator_callbacks", "../../core/class", "../../core/utils/callbacks", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/locker", "../../ui/editor/editor", "./template", "./module", "../../ui/collection/ui.collection_widget.edit", "../../core/utils/data", "../../core/utils/extend", "../../core/utils/comparator", "../../core/utils/inflector"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _angular = _interopRequireDefault($__require("angular"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _component_registrator_callbacks = _interopRequireDefault($__require("../../core/component_registrator_callbacks"));
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _locker = _interopRequireDefault($__require("../../core/utils/locker"));
  var _editor = _interopRequireDefault($__require("../../ui/editor/editor"));
  var _template = $__require("./template");
  var _module = _interopRequireDefault($__require("./module"));
  var _uiCollection_widget = _interopRequireDefault($__require("../../ui/collection/ui.collection_widget.edit"));
  var _data = $__require("../../core/utils/data");
  var _extend = $__require("../../core/utils/extend");
  var _comparator = $__require("../../core/utils/comparator");
  var _inflector = $__require("../../core/utils/inflector");
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
  var ITEM_ALIAS_ATTRIBUTE_NAME = 'dxItemAlias';
  var SKIP_APPLY_ACTION_CATEGORY = 'rendering';
  var NG_MODEL_OPTION = 'value';
  if (_angular.default) {
    var safeApply = function safeApply(func, scope) {
      if (scope.$root.$$phase) {
        return func(scope);
      } else {
        return scope.$apply(function () {
          return func(scope);
        });
      }
    };
    var getClassMethod = function getClassMethod(initClass, methodName) {
      var hasParentProperty = Object.prototype.hasOwnProperty.bind(initClass)('parent');
      var isES6Class = !hasParentProperty && initClass.parent;
      if (isES6Class) {
        var baseClass = Object.getPrototypeOf(initClass);
        return baseClass.prototype[methodName] ? function () {
          return baseClass.prototype[methodName]();
        } : getClassMethod(baseClass, methodName);
      } else {
        var method = initClass.parent.prototype[methodName];
        if (method) {
          return function () {
            return method();
          };
        }
        if (!method || !initClass.parent.subclassOf) {
          return function () {
            return undefined;
          };
        }
        return getClassMethod(initClass.parent, methodName);
      }
    };
    var ComponentBuilder = _class.default.inherit({
      ctor: function ctor(options) {
        this._componentDisposing = (0, _callbacks.default)();
        this._optionChangedCallbacks = (0, _callbacks.default)();
        this._ngLocker = new _locker.default();
        this._scope = options.scope;
        this._$element = options.$element;
        this._$templates = options.$templates;
        this._componentClass = options.componentClass;
        this._parse = options.parse;
        this._compile = options.compile;
        this._itemAlias = options.itemAlias;
        this._transcludeFn = options.transcludeFn;
        this._digestCallbacks = options.dxDigestCallbacks;
        this._normalizeOptions(options.ngOptions);
        this._initComponentBindings();
        this._initComponent(this._scope);
        if (!options.ngOptions) {
          this._addOptionsStringWatcher(options.ngOptionsString);
        }
      },
      _addOptionsStringWatcher: function _addOptionsStringWatcher(optionsString) {
        var _this = this;
        var clearOptionsStringWatcher = this._scope.$watch(optionsString, function (newOptions) {
          if (!newOptions) {
            return;
          }
          clearOptionsStringWatcher();
          _this._normalizeOptions(newOptions);
          _this._initComponentBindings();
          _this._component.option(_this._evalOptions(_this._scope));
        });
        this._componentDisposing.add(clearOptionsStringWatcher);
      },
      _normalizeOptions: function _normalizeOptions(options) {
        var _this2 = this;
        this._ngOptions = (0, _extend.extendFromObject)({}, options);
        if (!options) {
          return;
        }
        if (!Object.prototype.hasOwnProperty.call(options, 'bindingOptions') && options.bindingOptions) {
          this._ngOptions.bindingOptions = options.bindingOptions;
        }
        if (options.bindingOptions) {
          (0, _iterator.each)(options.bindingOptions, function (key, value) {
            if ((0, _type.type)(value) === 'string') {
              _this2._ngOptions.bindingOptions[key] = {
                dataPath: value
              };
            }
          });
        }
      },
      _initComponent: function _initComponent(scope) {
        this._component = new this._componentClass(this._$element, this._evalOptions(scope));
        this._component._isHidden = true;
        this._handleDigestPhase();
      },
      _handleDigestPhase: function _handleDigestPhase() {
        var _this3 = this;
        var beginUpdate = function beginUpdate() {
          _this3._component.beginUpdate();
        };
        var endUpdate = function endUpdate() {
          _this3._component.endUpdate();
        };
        this._digestCallbacks.begin.add(beginUpdate);
        this._digestCallbacks.end.add(endUpdate);
        this._componentDisposing.add(function () {
          _this3._digestCallbacks.begin.remove(beginUpdate);
          _this3._digestCallbacks.end.remove(endUpdate);
        });
      },
      _initComponentBindings: function _initComponentBindings() {
        var _this4 = this;
        var optionDependencies = {};
        if (!this._ngOptions.bindingOptions) {
          return;
        }
        (0, _iterator.each)(this._ngOptions.bindingOptions, function (optionPath, value) {
          var separatorIndex = optionPath.search(/\[|\./);
          var optionForSubscribe = separatorIndex > -1 ? optionPath.substring(0, separatorIndex) : optionPath;
          var prevWatchMethod;
          var clearWatcher;
          var valuePath = value.dataPath;
          var deepWatch = true;
          var forcePlainWatchMethod = false;
          if (value.deep !== undefined) {
            forcePlainWatchMethod = deepWatch = !!value.deep;
          }
          if (!optionDependencies[optionForSubscribe]) {
            optionDependencies[optionForSubscribe] = {};
          }
          optionDependencies[optionForSubscribe][optionPath] = valuePath;
          var updateWatcher = function updateWatcher() {
            var watchCallback = function watchCallback(newValue, oldValue) {
              if (_this4._ngLocker.locked(optionPath)) {
                return;
              }
              _this4._ngLocker.obtain(optionPath);
              _this4._component.option(optionPath, newValue);
              updateWatcher();
              if ((0, _comparator.equals)(oldValue, newValue) && _this4._ngLocker.locked(optionPath)) {
                _this4._ngLocker.release(optionPath);
              }
            };
            var watchMethod = Array.isArray(_this4._scope.$eval(valuePath)) && !forcePlainWatchMethod ? '$watchCollection' : '$watch';
            if (prevWatchMethod !== watchMethod) {
              if (clearWatcher) {
                clearWatcher();
              }
              clearWatcher = _this4._scope[watchMethod](valuePath, watchCallback, deepWatch);
              prevWatchMethod = watchMethod;
            }
          };
          updateWatcher();
          _this4._componentDisposing.add(clearWatcher);
        });
        this._optionChangedCallbacks.add(function (args) {
          var optionName = args.name;
          var fullName = args.fullName;
          var component = args.component;
          if (_this4._ngLocker.locked(fullName)) {
            _this4._ngLocker.release(fullName);
            return;
          }
          if (!optionDependencies || !optionDependencies[optionName]) {
            return;
          }
          var isActivePhase = _this4._scope.$root.$$phase;
          var obtainOption = function obtainOption() {
            _this4._ngLocker.obtain(fullName);
          };
          if (isActivePhase) {
            _this4._digestCallbacks.begin.add(obtainOption);
          } else {
            obtainOption();
          }
          safeApply(function () {
            (0, _iterator.each)(optionDependencies[optionName], function (optionPath, valuePath) {
              if (!_this4._optionsAreLinked(fullName, optionPath)) {
                return;
              }
              var value = component.option(optionPath);
              _this4._parse(valuePath).assign(_this4._scope, value);
              var scopeValue = _this4._parse(valuePath)(_this4._scope);
              if (scopeValue !== value) {
                args.component.option(optionPath, scopeValue);
              }
            });
          }, _this4._scope);
          var releaseOption = function releaseOption() {
            if (_this4._ngLocker.locked(fullName)) {
              _this4._ngLocker.release(fullName);
            }
            _this4._digestCallbacks.begin.remove(obtainOption);
            _this4._digestCallbacks.end.remove(releaseOption);
          };
          if (isActivePhase) {
            _this4._digestCallbacks.end.addPrioritized(releaseOption);
          } else {
            releaseOption();
          }
        });
      },
      _optionsAreNested: function _optionsAreNested(optionPath1, optionPath2) {
        var parentSeparator = optionPath1[optionPath2.length];
        return optionPath1.indexOf(optionPath2) === 0 && (parentSeparator === '.' || parentSeparator === '[');
      },
      _optionsAreLinked: function _optionsAreLinked(optionPath1, optionPath2) {
        if (optionPath1 === optionPath2) return true;
        return optionPath1.length > optionPath2.length ? this._optionsAreNested(optionPath1, optionPath2) : this._optionsAreNested(optionPath2, optionPath1);
      },
      _compilerByTemplate: function _compilerByTemplate(template) {
        var _this5 = this;
        var scopeItemsPath = this._getScopeItemsPath();
        return function (options) {
          var $resultMarkup = (0, _renderer.default)(template).clone();
          var dataIsScope = options.model && options.model.constructor === _this5._scope.$root.constructor;
          var templateScope = dataIsScope ? options.model : options.noModel ? _this5._scope : _this5._createScopeWithData(options);
          if (scopeItemsPath) {
            _this5._synchronizeScopes(templateScope, scopeItemsPath, options.index);
          }
          $resultMarkup.appendTo(options.container);
          if (!options.noModel) {
            _events_engine.default.on($resultMarkup, '$destroy', function () {
              var destroyAlreadyCalled = !templateScope.$parent;
              if (destroyAlreadyCalled) {
                return;
              }
              templateScope.$destroy();
            });
          }
          var ngTemplate = _this5._compile($resultMarkup, _this5._transcludeFn);
          _this5._applyAsync(function (scope) {
            ngTemplate(scope, null, {
              parentBoundTranscludeFn: _this5._transcludeFn
            });
          }, templateScope);
          return $resultMarkup;
        };
      },
      _applyAsync: function _applyAsync(func, scope) {
        var _this6 = this;
        func(scope);
        if (!scope.$root.$$phase) {
          if (!this._renderingTimer) {
            var clearRenderingTimer = function clearRenderingTimer() {
              clearTimeout(_this6._renderingTimer);
            };
            this._renderingTimer = setTimeout(function () {
              scope.$apply();
              _this6._renderingTimer = null;
              _this6._componentDisposing.remove(clearRenderingTimer);
            });
            this._componentDisposing.add(clearRenderingTimer);
          }
        }
      },
      _getScopeItemsPath: function _getScopeItemsPath() {
        if (this._componentClass.subclassOf(_uiCollection_widget.default) && this._ngOptions.bindingOptions && this._ngOptions.bindingOptions.items) {
          return this._ngOptions.bindingOptions.items.dataPath;
        }
      },
      _createScopeWithData: function _createScopeWithData(options) {
        var newScope = this._scope.$new();
        if (this._itemAlias) {
          newScope[this._itemAlias] = options.model;
        }
        if ((0, _type.isDefined)(options.index)) {
          newScope.$index = options.index;
        }
        return newScope;
      },
      _synchronizeScopes: function _synchronizeScopes(itemScope, parentPrefix, itemIndex) {
        if (this._itemAlias && _typeof(itemScope[this._itemAlias]) !== 'object') {
          this._synchronizeScopeField({
            parentScope: this._scope,
            childScope: itemScope,
            fieldPath: this._itemAlias,
            parentPrefix: parentPrefix,
            itemIndex: itemIndex
          });
        }
      },
      _synchronizeScopeField: function _synchronizeScopeField(args) {
        var parentScope = args.parentScope;
        var childScope = args.childScope;
        var fieldPath = args.fieldPath;
        var parentPrefix = args.parentPrefix;
        var itemIndex = args.itemIndex;
        var innerPathSuffix = fieldPath === this._itemAlias ? '' : '.' + fieldPath;
        var collectionField = itemIndex !== undefined;
        var optionOuterBag = [parentPrefix];
        if (collectionField) {
          if (!(0, _type.isNumeric)(itemIndex)) return;
          optionOuterBag.push('[', itemIndex, ']');
        }
        optionOuterBag.push(innerPathSuffix);
        var optionOuterPath = optionOuterBag.join('');
        var clearParentWatcher = parentScope.$watch(optionOuterPath, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            (0, _data.compileSetter)(fieldPath)(childScope, newValue);
          }
        });
        var clearItemWatcher = childScope.$watch(fieldPath, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (collectionField && !(0, _data.compileGetter)(parentPrefix)(parentScope)[itemIndex]) {
              clearItemWatcher();
              return;
            }
            (0, _data.compileSetter)(optionOuterPath)(parentScope, newValue);
          }
        });
        this._componentDisposing.add([clearParentWatcher, clearItemWatcher]); // TODO: test
      },
      _evalOptions: function _evalOptions(scope) {
        var _this8 = this;
        var result = (0, _extend.extendFromObject)({}, this._ngOptions);
        delete result.bindingOptions;
        if (this._ngOptions.bindingOptions) {
          (0, _iterator.each)(this._ngOptions.bindingOptions, function (key, value) {
            result[key] = scope.$eval(value.dataPath);
          });
        }
        result._optionChangedCallbacks = this._optionChangedCallbacks;
        result._disposingCallbacks = this._componentDisposing;
        result.onActionCreated = function (component, action, config) {
          if (config && config.category === SKIP_APPLY_ACTION_CATEGORY) {
            return action;
          }
          var wrappedAction = function wrappedAction() {
            var _this7 = this;
            var args = arguments;
            if (!scope || !scope.$root || scope.$root.$$phase) {
              return action.apply(this, args);
            }
            return safeApply(function () {
              return action.apply(_this7, args);
            }, scope);
          };
          return wrappedAction;
        };
        result.beforeActionExecute = result.onActionCreated;
        result.nestedComponentOptions = function (component) {
          return {
            templatesRenderAsynchronously: component.option('templatesRenderAsynchronously'),
            forceApplyBindings: component.option('forceApplyBindings'),
            modelByElement: component.option('modelByElement'),
            onActionCreated: component.option('onActionCreated'),
            beforeActionExecute: component.option('beforeActionExecute'),
            nestedComponentOptions: component.option('nestedComponentOptions')
          };
        };
        result.templatesRenderAsynchronously = true;
        if ((0, _config.default)().wrapActionsBeforeExecute) {
          result.forceApplyBindings = function () {
            safeApply(function () {}, scope);
          };
        }
        result.integrationOptions = {
          createTemplate: function createTemplate(element) {
            return new _template.NgTemplate(element, _this8._compilerByTemplate.bind(_this8));
          },
          watchMethod: function watchMethod(fn, callback, options) {
            options = options || {};
            var immediateValue;
            var skipCallback = options.skipImmediate;
            var disposeWatcher = scope.$watch(function () {
              var value = fn();
              if (value instanceof Date) {
                value = value.valueOf();
              }
              return value;
            }, function (newValue) {
              var isSameValue = immediateValue === newValue;
              if (!skipCallback && (!isSameValue || isSameValue && options.deep)) {
                callback(newValue);
              }
              skipCallback = false;
            }, options.deep);
            if (!skipCallback) {
              immediateValue = fn();
              callback(immediateValue);
            }
            if ((0, _config.default)().wrapActionsBeforeExecute) {
              _this8._applyAsync(function () {}, scope);
            }
            return disposeWatcher;
          },
          templates: {
            'dx-polymorph-widget': {
              render: function render(options) {
                var widgetName = options.model.widget;
                if (!widgetName) {
                  return;
                }
                var markup = (0, _renderer.default)('<div>').attr((0, _inflector.dasherize)(widgetName), 'options').get(0);
                var newScope = _this8._scope.$new();
                newScope.options = options.model.options;
                options.container.append(markup);
                _this8._compile(markup)(newScope);
              }
            }
          }
        };
        result.modelByElement = function () {
          return scope;
        };
        return result;
      }
    });
    ComponentBuilder = ComponentBuilder.inherit({
      ctor: function ctor(options) {
        this._componentName = options.componentName;
        this._ngModel = options.ngModel;
        this._ngModelController = options.ngModelController;
        this.callBase.apply(this, arguments);
      },
      _isNgModelRequired: function _isNgModelRequired() {
        return _editor.default.isEditor(this._componentClass.prototype) && this._ngModel;
      },
      _initComponentBindings: function _initComponentBindings() {
        this.callBase.apply(this, arguments);
        this._initNgModelBinding();
      },
      _initNgModelBinding: function _initNgModelBinding() {
        var _this9 = this;
        if (!this._isNgModelRequired()) {
          return;
        }
        var clearNgModelWatcher = this._scope.$watch(this._ngModel, function (newValue, oldValue) {
          if (_this9._ngLocker.locked(NG_MODEL_OPTION)) {
            return;
          }
          if (newValue === oldValue) {
            return;
          }
          _this9._component.option(NG_MODEL_OPTION, newValue);
        });
        this._optionChangedCallbacks.add(function (args) {
          _this9._ngLocker.obtain(NG_MODEL_OPTION);
          try {
            if (args.name !== NG_MODEL_OPTION) {
              return;
            }
            _this9._ngModelController.$setViewValue(args.value);
          } finally {
            if (_this9._ngLocker.locked(NG_MODEL_OPTION)) {
              _this9._ngLocker.release(NG_MODEL_OPTION);
            }
          }
        });
        this._componentDisposing.add(clearNgModelWatcher);
      },
      _evalOptions: function _evalOptions() {
        if (!this._isNgModelRequired()) {
          return this.callBase.apply(this, arguments);
        }
        var result = this.callBase.apply(this, arguments);
        result[NG_MODEL_OPTION] = this._parse(this._ngModel)(this._scope);
        return result;
      }
    });
    var registeredComponents = {};
    var registerComponentDirective = function registerComponentDirective(name) {
      var priority = name !== 'dxValidator' ? 1 : 10;
      _module.default.directive(name, ['$compile', '$parse', 'dxDigestCallbacks', function ($compile, $parse, dxDigestCallbacks) {
        return {
          restrict: 'A',
          require: '^?ngModel',
          priority: priority,
          compile: function compile($element) {
            var componentClass = registeredComponents[name];
            var useTemplates = componentClass.prototype._useTemplates ? componentClass.prototype._useTemplates() : getClassMethod(componentClass, '_useTemplates')();
            var $content = useTemplates ? $element.contents().detach() : null;
            return function (scope, $element, attrs, ngModelController, transcludeFn) {
              $element.append($content);
              safeApply(function () {
                new ComponentBuilder({
                  componentClass: componentClass,
                  componentName: name,
                  compile: $compile,
                  parse: $parse,
                  $element: $element,
                  scope: scope,
                  ngOptionsString: attrs[name],
                  ngOptions: attrs[name] ? scope.$eval(attrs[name]) : {},
                  ngModel: attrs.ngModel,
                  ngModelController: ngModelController,
                  transcludeFn: transcludeFn,
                  itemAlias: attrs[ITEM_ALIAS_ATTRIBUTE_NAME],
                  dxDigestCallbacks: dxDigestCallbacks
                });
              }, scope);
            };
          }
        };
      }]);
    };
    _component_registrator_callbacks.default.add(function (name, componentClass) {
      if (!registeredComponents[name]) {
        registerComponentDirective(name);
      }
      registeredComponents[name] = componentClass;
    });
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","angular","../../events/core/events_engine","../../core/config","../../core/component_registrator_callbacks","../../core/class","../../core/utils/callbacks","../../core/utils/type","../../core/utils/iterator","../../core/utils/locker","../../ui/editor/editor","./template","./module","../../ui/collection/ui.collection_widget.edit","../../core/utils/data","../../core/utils/extend","../../core/utils/comparator","../../core/utils/inflector"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("angular"), require("../../events/core/events_engine"), require("../../core/config"), require("../../core/component_registrator_callbacks"), require("../../core/class"), require("../../core/utils/callbacks"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/locker"), require("../../ui/editor/editor"), require("./template"), require("./module"), require("../../ui/collection/ui.collection_widget.edit"), require("../../core/utils/data"), require("../../core/utils/extend"), require("../../core/utils/comparator"), require("../../core/utils/inflector"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=component_registrator.js.map