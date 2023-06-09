/**
* DevExtreme (bundles/__internal/grids/grid_core/state_storing/module_core.js)
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
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var window_1 = require("../../../../core/utils/window");
var ui_errors_1 = __importDefault(require("../../../../ui/widget/ui.errors"));
var storage_1 = require("../../../../core/utils/storage");
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var type_1 = require("../../../../core/utils/type");
// @ts-expect-error
var deferred_1 = require("../../../../core/utils/deferred");
var modules_1 = __importDefault(require("../modules"));
var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var parseDates = function (state) {
    if (!state)
        return;
    iterator_1.each(state, function (key, value) {
        if (type_1.isPlainObject(value) || Array.isArray(value)) {
            parseDates(value);
        }
        else if (typeof value === 'string') {
            var date = DATE_REGEX.exec(value);
            if (date) {
                state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]));
            }
        }
    });
};
var StateStoringController = modules_1.default.ViewController.inherit((function () {
    var getStorage = function (options) {
        var storage = options.type === 'sessionStorage' ? storage_1.sessionStorage() : window_1.getWindow().localStorage;
        if (!storage) {
            throw new Error('E1007');
        }
        return storage;
    };
    var getUniqueStorageKey = function (options) {
        return type_1.isDefined(options.storageKey) ? options.storageKey : 'storage';
    };
    return {
        _loadState: function () {
            var options = this.option('stateStoring');
            if (options.type === 'custom') {
                return options.customLoad && options.customLoad();
            }
            try {
                // @ts-expect-error
                return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)));
            }
            catch (e) {
                ui_errors_1.default.log(e.message);
            }
        },
        _saveState: function (state) {
            var options = this.option('stateStoring');
            if (options.type === 'custom') {
                options.customSave && options.customSave(state);
                return;
            }
            try {
                getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state));
            }
            catch (e) {
                ui_errors_1.default.log(e.message);
            }
        },
        publicMethods: function () {
            return ['state'];
        },
        isEnabled: function () {
            return this.option('stateStoring.enabled');
        },
        init: function () {
            var that = this;
            that._state = {};
            that._isLoaded = false;
            that._isLoading = false;
            that._windowUnloadHandler = function () {
                if (that._savingTimeoutID !== undefined) {
                    that._saveState(that.state());
                }
            };
            events_engine_1.default.on(window_1.getWindow(), 'unload', that._windowUnloadHandler);
            return that;
        },
        isLoaded: function () {
            return this._isLoaded;
        },
        isLoading: function () {
            return this._isLoading;
        },
        load: function () {
            var _this = this;
            this._isLoading = true;
            var loadResult = deferred_1.fromPromise(this._loadState());
            loadResult.always(function () {
                _this._isLoaded = true;
                _this._isLoading = false;
            }).done(function (state) {
                if (state !== null && !type_1.isEmptyObject(state)) {
                    _this.state(state);
                }
            });
            return loadResult;
        },
        state: function (state) {
            var that = this;
            if (!arguments.length) {
                return extend_1.extend(true, {}, that._state);
            }
            that._state = extend_1.extend({}, state);
            parseDates(that._state);
        },
        save: function () {
            var that = this;
            clearTimeout(that._savingTimeoutID);
            that._savingTimeoutID = setTimeout(function () {
                that._saveState(that.state());
                that._savingTimeoutID = undefined;
            }, that.option('stateStoring.savingTimeout'));
        },
        optionChanged: function (args) {
            var that = this;
            switch (args.name) {
                case 'stateStoring':
                    if (that.isEnabled() && !that.isLoading()) {
                        that.load();
                    }
                    args.handled = true;
                    break;
                default:
                    that.callBase(args);
            }
        },
        dispose: function () {
            clearTimeout(this._savingTimeoutID);
            events_engine_1.default.off(window_1.getWindow(), 'unload', this._windowUnloadHandler);
        },
    };
})());
exports.default = { StateStoringController: StateStoringController };
