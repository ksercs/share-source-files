/**
* DevExtreme (cjs/__internal/scheduler/resources/m_agenda_resource_processor.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgendaResourceProcessor = void 0;
var _array = require("../../../core/utils/array");
var _deferred = require("../../../core/utils/deferred");
var _m_utils = require("./m_utils");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
var PromiseItem = function PromiseItem(rawAppointment, promise) {
  this.rawAppointment = rawAppointment;
  this.promise = promise;
};
var AgendaResourceProcessor = /*#__PURE__*/function () {
  function AgendaResourceProcessor() {
    var resourceDeclarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this._resourceDeclarations = resourceDeclarations;
    this.isLoaded = false;
    this.isLoading = false;
    this.resourceMap = new Map();
    this.appointmentPromiseQueue = [];
  }
  var _proto = AgendaResourceProcessor.prototype;
  _proto._pushAllResources = function _pushAllResources() {
    var _this = this;
    this.appointmentPromiseQueue.forEach(function (_ref) {
      var promise = _ref.promise,
        rawAppointment = _ref.rawAppointment;
      var result = [];
      _this.resourceMap.forEach(function (resource, fieldName) {
        var item = {
          label: resource.label,
          values: []
        };
        if (fieldName in rawAppointment) {
          (0, _array.wrapToArray)(rawAppointment[fieldName]).forEach(function (value) {
            return item.values.push(resource.map.get(value));
          });
        }
        if (item.values.length) {
          result.push(item);
        }
      });
      promise.resolve(result);
    });
    this.appointmentPromiseQueue = [];
  };
  _proto._onPullResource = function _onPullResource(fieldName, valueName, displayName, label, items) {
    var map = new Map();
    items.forEach(function (item) {
      return map.set(item[valueName], item[displayName]);
    });
    this.resourceMap.set(fieldName, {
      label,
      map
    });
  };
  _proto._hasResourceDeclarations = function _hasResourceDeclarations(resources) {
    if (resources.length === 0) {
      this.appointmentPromiseQueue.forEach(function (_ref2) {
        var promise = _ref2.promise;
        return promise.resolve([]);
      });
      this.appointmentPromiseQueue = [];
      return false;
    }
    return true;
  };
  _proto._tryPullResources = function _tryPullResources(resources, resultAsync) {
    var _this2 = this;
    if (!this.isLoading) {
      this.isLoading = true;
      var promises = [];
      resources.forEach(function (resource) {
        // @ts-expect-error
        var promise = new _deferred.Deferred().done(function (items) {
          return _this2._onPullResource((0, _m_utils.getFieldExpr)(resource), (0, _m_utils.getValueExpr)(resource), (0, _m_utils.getDisplayExpr)(resource), resource.label, items);
        });
        promises.push(promise);
        var dataSource = (0, _m_utils.getWrappedDataSource)(resource.dataSource);
        if (dataSource.isLoaded()) {
          promise.resolve(dataSource.items());
        } else {
          dataSource.load().done(function (list) {
            return promise.resolve(list);
          }).fail(function () {
            return promise.reject();
          });
        }
      });
      _deferred.when.apply(null, promises).done(function () {
        _this2.isLoaded = true;
        _this2.isLoading = false;
        _this2._pushAllResources();
      }).fail(function () {
        return resultAsync.reject();
      });
    }
  };
  _proto.initializeState = function initializeState() {
    var resourceDeclarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.resourceDeclarations = resourceDeclarations;
  };
  _proto.createListAsync = function createListAsync(rawAppointment) {
    // @ts-expect-error
    var resultAsync = new _deferred.Deferred();
    this.appointmentPromiseQueue.push(new PromiseItem(rawAppointment, resultAsync));
    if (this._hasResourceDeclarations(this.resourceDeclarations)) {
      if (this.isLoaded) {
        this._pushAllResources();
      } else {
        this._tryPullResources(this.resourceDeclarations, resultAsync);
      }
    }
    return resultAsync.promise();
  };
  _createClass(AgendaResourceProcessor, [{
    key: "resourceDeclarations",
    get: function get() {
      return this._resourceDeclarations;
    },
    set: function set(value) {
      this._resourceDeclarations = value;
      this.isLoaded = false;
      this.isLoading = false;
      this.resourceMap.clear();
      this.appointmentPromiseQueue = [];
    }
  }]);
  return AgendaResourceProcessor;
}();
exports.AgendaResourceProcessor = AgendaResourceProcessor;
