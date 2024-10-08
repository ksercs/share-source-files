/**
* DevExtreme (esm/__internal/grids/grid_core/m_modules.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/method-signature-style */
import Class from '../../../core/class';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
// @ts-expect-error
import { grep } from '../../../core/utils/common';
import { each } from '../../../core/utils/iterator';
import { isFunction } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import messageLocalization from '../../../localization/message';
import errors from '../../../ui/widget/ui.errors';
var WIDGET_WITH_LEGACY_CONTAINER_NAME = 'dxDataGrid';
var ModuleItem = Class.inherit({
  _endUpdateCore() {},
  ctor(component) {
    var that = this;
    that._updateLockCount = 0;
    that.component = component;
    that._actions = {};
    that._actionConfigs = {};
    each(this.callbackNames() || [], function (index, name) {
      var flags = that.callbackFlags(name) || {};
      flags.unique = true;
      flags.syncStrategy = true;
      // @ts-expect-error
      that[this] = Callbacks(flags);
    });
  },
  init() {},
  callbackNames() {},
  callbackFlags() {},
  publicMethods() {},
  beginUpdate() {
    this._updateLockCount++;
  },
  endUpdate() {
    if (this._updateLockCount > 0) {
      this._updateLockCount--;
      if (!this._updateLockCount) {
        this._endUpdateCore();
      }
    }
  },
  option(name) {
    var {
      component
    } = this;
    var optionCache = component._optionCache;
    if (arguments.length === 1 && optionCache) {
      if (!(name in optionCache)) {
        optionCache[name] = component.option(name);
      }
      return optionCache[name];
    }
    return component.option.apply(component, arguments);
  },
  _silentOption(name, value) {
    var {
      component
    } = this;
    var optionCache = component._optionCache;
    if (optionCache) {
      optionCache[name] = value;
    }
    return component._setOptionWithoutOptionChange(name, value);
  },
  localize(name) {
    var optionCache = this.component._optionCache;
    if (optionCache) {
      if (!(name in optionCache)) {
        optionCache[name] = messageLocalization.format(name);
      }
      return optionCache[name];
    }
    return messageLocalization.format(name);
  },
  on() {
    return this.component.on.apply(this.component, arguments);
  },
  off() {
    return this.component.off.apply(this.component, arguments);
  },
  optionChanged(args) {
    if (args.name in this._actions) {
      this.createAction(args.name, this._actionConfigs[args.name]);
      args.handled = true;
    }
  },
  getAction(actionName) {
    return this._actions[actionName];
  },
  setAria(name, value, $target) {
    var target = $target.get(0);
    var prefix = name !== 'role' && name !== 'id' ? 'aria-' : '';
    if (target.setAttribute) {
      target.setAttribute(prefix + name, value);
    } else {
      $target.attr(prefix + name, value);
    }
  },
  _createComponent() {
    return this.component._createComponent.apply(this.component, arguments);
  },
  getController(name) {
    return this.component._controllers[name];
  },
  createAction(actionName, config) {
    if (isFunction(actionName)) {
      var action = this.component._createAction(actionName.bind(this), config);
      return function (e) {
        action({
          event: e
        });
      };
    }
    this._actions[actionName] = this.component._createActionByOption(actionName, config);
    this._actionConfigs[actionName] = config;
    return undefined;
  },
  executeAction(actionName, options) {
    var action = this._actions[actionName];
    return action && action(options);
  },
  dispose() {
    var that = this;
    each(that.callbackNames() || [], function () {
      that[this].empty();
    });
  },
  addWidgetPrefix(className) {
    var componentName = this.component.NAME;
    return "dx-".concat(componentName.slice(2).toLowerCase()).concat(className ? "-".concat(className) : '');
  },
  getWidgetContainerClass() {
    var containerName = this.component.NAME === WIDGET_WITH_LEGACY_CONTAINER_NAME ? null : 'container';
    return this.addWidgetPrefix(containerName);
  },
  elementIsInsideGrid($element) {
    var $gridElement = $element.closest(".".concat(this.getWidgetContainerClass())).parent();
    return $gridElement.is(this.component.$element());
  }
});
var Controller = ModuleItem;
var ViewController = Controller.inherit({
  getView(name) {
    return this.component._views[name];
  },
  getViews() {
    return this.component._views;
  }
});
var View = ModuleItem.inherit({
  _isReady() {
    return this.component.isReady();
  },
  _endUpdateCore() {
    this.callBase();
    if (!this._isReady() && this._requireReady) {
      this._requireRender = false;
      this.component._requireResize = false;
    }
    if (this._requireRender) {
      this._requireRender = false;
      this.render(this._$parent);
    }
  },
  _invalidate(requireResize, requireReady) {
    this._requireRender = true;
    this.component._requireResize = hasWindow() && (this.component._requireResize || requireResize);
    this._requireReady = this._requireReady || requireReady;
  },
  _renderCore() {},
  _resizeCore() {},
  _parentElement() {
    return this._$parent;
  },
  ctor(component) {
    this.callBase(component);
    this.renderCompleted = Callbacks();
    this.resizeCompleted = Callbacks();
  },
  element() {
    return this._$element;
  },
  getElementHeight() {
    var $element = this.element();
    if (!$element) return 0;
    var marginTop = parseFloat($element.css('marginTop')) || 0;
    var marginBottom = parseFloat($element.css('marginBottom')) || 0;
    var {
      offsetHeight
    } = $element.get(0);
    return offsetHeight + marginTop + marginBottom;
  },
  isVisible() {
    return true;
  },
  getTemplate(name) {
    return this.component._getTemplate(name);
  },
  render($parent, options) {
    var $element = this._$element;
    var isVisible = this.isVisible();
    if (!$element && !$parent) return;
    this._requireReady = false;
    if (!$element) {
      $element = this._$element = $('<div>').appendTo($parent);
      this._$parent = $parent;
    }
    $element.toggleClass('dx-hidden', !isVisible);
    if (isVisible) {
      this.component._optionCache = {};
      var deferred = this._renderCore(options);
      this.component._optionCache = undefined;
      if (deferred) {
        deferred.done(() => {
          this.renderCompleted.fire(options);
        });
      } else {
        this.renderCompleted.fire(options);
      }
    }
  },
  resize() {
    this.isResizing = true;
    this._resizeCore();
    this.resizeCompleted.fire();
    this.isResizing = false;
  },
  focus(preventScroll) {
    this.element().get(0).focus({
      preventScroll
    });
  }
});
var MODULES_ORDER_MAX_INDEX = 1000000;
function getExtendedTypes(types) {
  var moduleExtenders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var extendTypes = {};
  Object.entries(moduleExtenders).forEach(_ref => {
    var [name, extender] = _ref;
    var currentType = types[name];
    if (currentType) {
      if (isFunction(extender)) {
        extendTypes[name] = extender(currentType);
      } else {
        var classType = currentType;
        extendTypes[name] = classType.inherit(extender);
      }
    }
  });
  return extendTypes;
}
function registerPublicMethods(componentInstance, name, moduleItem) {
  var publicMethods = moduleItem.publicMethods();
  if (publicMethods) {
    each(publicMethods, (_, methodName) => {
      if (moduleItem[methodName]) {
        if (!componentInstance[methodName]) {
          componentInstance[methodName] = function () {
            return moduleItem[methodName](...arguments);
          };
        } else {
          throw errors.Error('E1005', methodName);
        }
      } else {
        throw errors.Error('E1006', name, methodName);
      }
    });
  }
}
export function processModules(componentInstance, componentClass) {
  var {
    modules
  } = componentClass;
  var {
    modulesOrder
  } = componentClass;
  function createModuleItems(moduleTypes) {
    var moduleItems = {};
    each(moduleTypes, (name, moduleType) => {
      // eslint-disable-next-line new-cap
      var moduleItem = new moduleType(componentInstance);
      moduleItem.name = name;
      registerPublicMethods(componentInstance, name, moduleItem);
      moduleItems[name] = moduleItem;
    });
    return moduleItems;
  }
  if (modulesOrder) {
    modules.sort((module1, module2) => {
      var orderIndex1 = modulesOrder.indexOf(module1.name);
      var orderIndex2 = modulesOrder.indexOf(module2.name);
      if (orderIndex1 < 0) {
        orderIndex1 = MODULES_ORDER_MAX_INDEX;
      }
      if (orderIndex2 < 0) {
        orderIndex2 = MODULES_ORDER_MAX_INDEX;
      }
      return orderIndex1 - orderIndex2;
    });
  }
  var rootControllerTypes = {};
  var rootViewTypes = {};
  modules.forEach(_ref2 => {
    var {
      name: moduleName,
      controllers = {},
      views = {}
    } = _ref2;
    Object.entries(controllers).forEach(_ref3 => {
      var [name, type] = _ref3;
      var _a;
      if (rootControllerTypes[name]) {
        throw errors.Error('E1001', moduleName, name);
        // @ts-expect-error
      } else if (!((_a = type === null || type === void 0 ? void 0 : type.subclassOf) === null || _a === void 0 ? void 0 : _a.call(type, Controller))) {
        throw errors.Error('E1002', moduleName, name);
      }
      rootControllerTypes[name] = type;
    });
    Object.entries(views).forEach(_ref4 => {
      var [name, type] = _ref4;
      var _a;
      if (rootViewTypes[name]) {
        throw errors.Error('E1003', moduleName, name);
        // @ts-expect-error
      } else if (!((_a = type === null || type === void 0 ? void 0 : type.subclassOf) === null || _a === void 0 ? void 0 : _a.call(type, View))) {
        throw errors.Error('E1004', moduleName, name);
      }
      rootViewTypes[name] = type;
    });
  });
  var moduleExtenders = modules.filter(_ref5 => {
    var {
      extenders
    } = _ref5;
    return !!extenders;
  });
  var controllerTypes = moduleExtenders.reduce((types, _ref6) => {
    var {
      extenders
    } = _ref6;
    return _extends(_extends({}, types), getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.controllers));
  }, rootControllerTypes);
  var viewTypes = moduleExtenders.reduce((types, _ref7) => {
    var {
      extenders
    } = _ref7;
    return _extends(_extends({}, types), getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.views));
  }, rootViewTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._controllers = createModuleItems(controllerTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._views = createModuleItems(viewTypes);
}
var callModuleItemsMethod = function callModuleItemsMethod(that, methodName, args) {
  args = args || [];
  if (that._controllers) {
    each(that._controllers, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
  if (that._views) {
    each(that._views, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
};
export default {
  modules: [],
  View,
  ViewController,
  Controller,
  registerModule(name, module) {
    var {
      modules
    } = this;
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].name === name) {
        return;
      }
    }
    module.name = name;
    modules.push(module);
  },
  registerModulesOrder(moduleNames) {
    this.modulesOrder = moduleNames;
  },
  unregisterModule(name) {
    this.modules = grep(this.modules, module => module.name !== name);
  },
  processModules,
  callModuleItemsMethod
};
