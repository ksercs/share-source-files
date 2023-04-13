/**
* DevExtreme (bundles/__internal/grids/grid_core/modules.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __importDefault(require("../../../core/renderer"));
var class_1 = __importDefault(require("../../../core/class"));
var callbacks_1 = __importDefault(require("../../../core/utils/callbacks"));
// @ts-expect-error
var common_1 = require("../../../core/utils/common");
var type_1 = require("../../../core/utils/type");
var iterator_1 = require("../../../core/utils/iterator");
var message_1 = __importDefault(require("../../../localization/message"));
var window_1 = require("../../../core/utils/window");
var ui_errors_1 = __importDefault(require("../../../ui/widget/ui.errors"));
var WIDGET_WITH_LEGACY_CONTAINER_NAME = 'dxDataGrid';
var ModuleItem = class_1.default.inherit({
    _endUpdateCore: function () { },
    ctor: function (component) {
        var that = this;
        that._updateLockCount = 0;
        that.component = component;
        that._actions = {};
        that._actionConfigs = {};
        iterator_1.each(this.callbackNames() || [], function (index, name) {
            var flags = that.callbackFlags(name) || {};
            flags.unique = true;
            flags.syncStrategy = true;
            // @ts-expect-error
            that[this] = callbacks_1.default(flags);
        });
    },
    init: function () { },
    callbackNames: function () { },
    callbackFlags: function () { },
    publicMethods: function () { },
    beginUpdate: function () {
        this._updateLockCount++;
    },
    endUpdate: function () {
        if (this._updateLockCount > 0) {
            this._updateLockCount--;
            if (!this._updateLockCount) {
                this._endUpdateCore();
            }
        }
    },
    option: function (name) {
        var component = this.component;
        var optionCache = component._optionCache;
        if (arguments.length === 1 && optionCache) {
            if (!(name in optionCache)) {
                optionCache[name] = component.option(name);
            }
            return optionCache[name];
        }
        return component.option.apply(component, arguments);
    },
    _silentOption: function (name, value) {
        var component = this.component;
        var optionCache = component._optionCache;
        if (optionCache) {
            optionCache[name] = value;
        }
        return component._setOptionWithoutOptionChange(name, value);
    },
    localize: function (name) {
        var optionCache = this.component._optionCache;
        if (optionCache) {
            if (!(name in optionCache)) {
                optionCache[name] = message_1.default.format(name);
            }
            return optionCache[name];
        }
        return message_1.default.format(name);
    },
    on: function () {
        return this.component.on.apply(this.component, arguments);
    },
    off: function () {
        return this.component.off.apply(this.component, arguments);
    },
    optionChanged: function (args) {
        if (args.name in this._actions) {
            this.createAction(args.name, this._actionConfigs[args.name]);
            args.handled = true;
        }
    },
    getAction: function (actionName) {
        return this._actions[actionName];
    },
    setAria: function (name, value, $target) {
        var target = $target.get(0);
        var prefix = name !== 'role' && name !== 'id' ? 'aria-' : '';
        if (target.setAttribute) {
            target.setAttribute(prefix + name, value);
        }
        else {
            $target.attr(prefix + name, value);
        }
    },
    _createComponent: function () {
        return this.component._createComponent.apply(this.component, arguments);
    },
    getController: function (name) {
        return this.component._controllers[name];
    },
    createAction: function (actionName, config) {
        if (type_1.isFunction(actionName)) {
            var action_1 = this.component._createAction(actionName.bind(this), config);
            return function (e) {
                action_1({ event: e });
            };
        }
        this._actions[actionName] = this.component._createActionByOption(actionName, config);
        this._actionConfigs[actionName] = config;
        return undefined;
    },
    executeAction: function (actionName, options) {
        var action = this._actions[actionName];
        return action && action(options);
    },
    dispose: function () {
        var that = this;
        iterator_1.each(that.callbackNames() || [], function () {
            that[this].empty();
        });
    },
    addWidgetPrefix: function (className) {
        var componentName = this.component.NAME;
        return "dx-" + componentName.slice(2).toLowerCase() + (className ? "-" + className : '');
    },
    getWidgetContainerClass: function () {
        var containerName = this.component.NAME === WIDGET_WITH_LEGACY_CONTAINER_NAME ? null : 'container';
        return this.addWidgetPrefix(containerName);
    },
    elementIsInsideGrid: function ($element) {
        var $gridElement = $element.closest("." + this.getWidgetContainerClass()).parent();
        return $gridElement.is(this.component.$element());
    },
});
var Controller = ModuleItem;
var ViewController = Controller.inherit({
    getView: function (name) {
        return this.component._views[name];
    },
    getViews: function () {
        return this.component._views;
    },
});
var View = ModuleItem.inherit({
    _isReady: function () {
        return this.component.isReady();
    },
    _endUpdateCore: function () {
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
    _invalidate: function (requireResize, requireReady) {
        this._requireRender = true;
        this.component._requireResize = window_1.hasWindow() && (this.component._requireResize || requireResize);
        this._requireReady = this._requireReady || requireReady;
    },
    _renderCore: function () { },
    _resizeCore: function () { },
    _parentElement: function () {
        return this._$parent;
    },
    ctor: function (component) {
        this.callBase(component);
        this.renderCompleted = callbacks_1.default();
        this.resizeCompleted = callbacks_1.default();
    },
    element: function () {
        return this._$element;
    },
    getElementHeight: function () {
        var $element = this.element();
        if (!$element)
            return 0;
        var marginTop = parseFloat($element.css('marginTop')) || 0;
        var marginBottom = parseFloat($element.css('marginBottom')) || 0;
        var offsetHeight = $element.get(0).offsetHeight;
        return offsetHeight + marginTop + marginBottom;
    },
    isVisible: function () {
        return true;
    },
    getTemplate: function (name) {
        return this.component._getTemplate(name);
    },
    render: function ($parent, options) {
        var _this = this;
        var $element = this._$element;
        var isVisible = this.isVisible();
        if (!$element && !$parent)
            return;
        this._requireReady = false;
        if (!$element) {
            $element = this._$element = renderer_1.default('<div>').appendTo($parent);
            this._$parent = $parent;
        }
        $element.toggleClass('dx-hidden', !isVisible);
        if (isVisible) {
            this.component._optionCache = {};
            var deferred = this._renderCore(options);
            this.component._optionCache = undefined;
            if (deferred) {
                deferred.done(function () {
                    _this.renderCompleted.fire(options);
                });
            }
            else {
                this.renderCompleted.fire(options);
            }
        }
    },
    resize: function () {
        this.isResizing = true;
        this._resizeCore();
        this.resizeCompleted.fire();
        this.isResizing = false;
    },
    focus: function (preventScroll) {
        this.element().get(0).focus({ preventScroll: preventScroll });
    },
});
var MODULES_ORDER_MAX_INDEX = 1000000;
var processModules = function (that, componentClass) {
    var modules = componentClass.modules;
    var modulesOrder = componentClass.modulesOrder;
    var controllerTypes = componentClass.controllerTypes || {};
    var viewTypes = componentClass.viewTypes || {};
    if (!componentClass.controllerTypes) {
        if (modulesOrder) {
            modules.sort(function (module1, module2) {
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
        iterator_1.each(modules, function () {
            var controllers = this.controllers;
            var moduleName = this.name;
            var views = this.views;
            controllers && iterator_1.each(controllers, function (name, type) {
                if (controllerTypes[name]) {
                    throw ui_errors_1.default.Error('E1001', moduleName, name);
                }
                else if (!(type && type.subclassOf && type.subclassOf(Controller))) {
                    type.subclassOf(Controller);
                    throw ui_errors_1.default.Error('E1002', moduleName, name);
                }
                controllerTypes[name] = type;
            });
            views && iterator_1.each(views, function (name, type) {
                if (viewTypes[name]) {
                    throw ui_errors_1.default.Error('E1003', moduleName, name);
                }
                else if (!(type && type.subclassOf && type.subclassOf(View))) {
                    throw ui_errors_1.default.Error('E1004', moduleName, name);
                }
                viewTypes[name] = type;
            });
        });
        iterator_1.each(modules, function () {
            var extenders = this.extenders;
            if (extenders) {
                extenders.controllers && iterator_1.each(extenders.controllers, function (name, extender) {
                    if (controllerTypes[name]) {
                        controllerTypes[name] = controllerTypes[name].inherit(extender);
                    }
                });
                extenders.views && iterator_1.each(extenders.views, function (name, extender) {
                    if (viewTypes[name]) {
                        viewTypes[name] = viewTypes[name].inherit(extender);
                    }
                });
            }
        });
        componentClass.controllerTypes = controllerTypes;
        componentClass.viewTypes = viewTypes;
    }
    var registerPublicMethods = function (that, name, moduleItem) {
        var publicMethods = moduleItem.publicMethods();
        if (publicMethods) {
            iterator_1.each(publicMethods, function (index, methodName) {
                if (moduleItem[methodName]) {
                    if (!that[methodName]) {
                        that[methodName] = function () {
                            return moduleItem[methodName].apply(moduleItem, arguments);
                        };
                    }
                    else {
                        throw ui_errors_1.default.Error('E1005', methodName);
                    }
                }
                else {
                    throw ui_errors_1.default.Error('E1006', name, methodName);
                }
            });
        }
    };
    var createModuleItems = function (moduleTypes) {
        var moduleItems = {};
        iterator_1.each(moduleTypes, function (name, moduleType) {
            // eslint-disable-next-line new-cap
            var moduleItem = new moduleType(that);
            moduleItem.name = name;
            registerPublicMethods(that, name, moduleItem);
            moduleItems[name] = moduleItem;
        });
        return moduleItems;
    };
    that._controllers = createModuleItems(controllerTypes);
    that._views = createModuleItems(viewTypes);
};
var callModuleItemsMethod = function (that, methodName, args) {
    args = args || [];
    if (that._controllers) {
        iterator_1.each(that._controllers, function () {
            this[methodName] && this[methodName].apply(this, args);
        });
    }
    if (that._views) {
        iterator_1.each(that._views, function () {
            this[methodName] && this[methodName].apply(this, args);
        });
    }
};
exports.default = {
    modules: [],
    View: View,
    ViewController: ViewController,
    Controller: Controller,
    registerModule: function (name, module) {
        var modules = this.modules;
        for (var i = 0; i < modules.length; i++) {
            if (modules[i].name === name) {
                return;
            }
        }
        module.name = name;
        modules.push(module);
        delete this.controllerTypes;
        delete this.viewTypes;
    },
    registerModulesOrder: function (moduleNames) {
        this.modulesOrder = moduleNames;
    },
    unregisterModule: function (name) {
        this.modules = common_1.grep(this.modules, function (module) { return module.name !== name; });
        delete this.controllerTypes;
        delete this.viewTypes;
    },
    processModules: processModules,
    callModuleItemsMethod: callModuleItemsMethod,
};
