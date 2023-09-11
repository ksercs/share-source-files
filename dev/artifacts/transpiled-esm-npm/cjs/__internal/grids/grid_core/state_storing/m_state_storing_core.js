"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _storage = require("../../../../core/utils/storage");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var parseDates = function parseDates(state) {
  if (!state) return;
  (0, _iterator.each)(state, function (key, value) {
    if ((0, _type.isPlainObject)(value) || Array.isArray(value)) {
      parseDates(value);
    } else if (typeof value === 'string') {
      var date = DATE_REGEX.exec(value);
      if (date) {
        state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]));
      }
    }
  });
};
var StateStoringController = _m_modules.default.ViewController.inherit(function () {
  var getStorage = function getStorage(options) {
    var storage = options.type === 'sessionStorage' ? (0, _storage.sessionStorage)() : (0, _window.getWindow)().localStorage;
    if (!storage) {
      throw new Error('E1007');
    }
    return storage;
  };
  var getUniqueStorageKey = function getUniqueStorageKey(options) {
    return (0, _type.isDefined)(options.storageKey) ? options.storageKey : 'storage';
  };
  return {
    _loadState() {
      var options = this.option('stateStoring');
      if (options.type === 'custom') {
        return options.customLoad && options.customLoad();
      }
      try {
        // @ts-expect-error
        return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)));
      } catch (e) {
        _ui.default.log('W1022', 'State storing', e.message);
      }
    },
    _saveState(state) {
      var options = this.option('stateStoring');
      if (options.type === 'custom') {
        options.customSave && options.customSave(state);
        return;
      }
      try {
        getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state));
      } catch (e) {
        _ui.default.log(e.message);
      }
    },
    publicMethods() {
      return ['state'];
    },
    isEnabled() {
      return this.option('stateStoring.enabled');
    },
    init() {
      var that = this;
      that._state = {};
      that._isLoaded = false;
      that._isLoading = false;
      that._windowUnloadHandler = function () {
        if (that._savingTimeoutID !== undefined) {
          that._saveState(that.state());
        }
      };
      _events_engine.default.on((0, _window.getWindow)(), 'unload', that._windowUnloadHandler);
      return that;
    },
    isLoaded() {
      return this._isLoaded;
    },
    isLoading() {
      return this._isLoading;
    },
    load() {
      var _this = this;
      this._isLoading = true;
      var loadResult = (0, _deferred.fromPromise)(this._loadState());
      loadResult.always(function () {
        _this._isLoaded = true;
        _this._isLoading = false;
      }).done(function (state) {
        if (state !== null && !(0, _type.isEmptyObject)(state)) {
          _this.state(state);
        }
      });
      return loadResult;
    },
    state(state) {
      var that = this;
      if (!arguments.length) {
        return (0, _extend.extend)(true, {}, that._state);
      }
      that._state = (0, _extend.extend)({}, state);
      parseDates(that._state);
    },
    save() {
      var that = this;
      clearTimeout(that._savingTimeoutID);
      that._savingTimeoutID = setTimeout(function () {
        that._saveState(that.state());
        that._savingTimeoutID = undefined;
      }, that.option('stateStoring.savingTimeout'));
    },
    optionChanged(args) {
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
    dispose() {
      clearTimeout(this._savingTimeoutID);
      _events_engine.default.off((0, _window.getWindow)(), 'unload', this._windowUnloadHandler);
    }
  };
}());
var _default = {
  StateStoringController
};
exports.default = _default;