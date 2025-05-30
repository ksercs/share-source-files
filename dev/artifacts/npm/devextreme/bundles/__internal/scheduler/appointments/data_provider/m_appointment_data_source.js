/**
* DevExtreme (bundles/__internal/scheduler/appointments/data_provider/m_appointment_data_source.js)
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
exports.AppointmentDataSource = void 0;
var _deferred = require("../../../../core/utils/deferred");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var STORE_EVENTS = {
  updating: 'updating',
  push: 'push'
};
var AppointmentDataSource = /*#__PURE__*/function () {
  function AppointmentDataSource(dataSource) {
    this.setDataSource(dataSource);
    this._updatedAppointmentKeys = [];
  }
  var _proto = AppointmentDataSource.prototype;
  _proto._getStoreKey = function _getStoreKey(target) {
    var store = this._dataSource.store();
    return store.keyOf(target);
  };
  _proto.setDataSource = function setDataSource(dataSource) {
    this._dataSource = dataSource;
    this.cleanState();
    this._initStoreChangeHandlers();
  };
  _proto._initStoreChangeHandlers = function _initStoreChangeHandlers() {
    var _this = this;
    var dataSource = this._dataSource;
    var store = dataSource === null || dataSource === void 0 ? void 0 : dataSource.store();
    if (store) {
      store.on(STORE_EVENTS.updating, function (key) {
        var keyName = store.key();
        if (keyName) {
          _this._updatedAppointmentKeys.push({
            key: keyName,
            value: key
          });
        } else {
          _this._updatedAppointment = key;
        }
      });
      store.on(STORE_EVENTS.push, function (pushItems) {
        var items = dataSource.items();
        var keyName = store.key();
        pushItems.forEach(function (pushItem) {
          var itemExists = items.filter(function (item) {
            return item[keyName] === pushItem.key;
          }).length !== 0;
          if (itemExists) {
            _this._updatedAppointmentKeys.push({
              key: keyName,
              value: pushItem.key
            });
          } else {
            var data = pushItem.data;
            data && items.push(data);
          }
        });
        dataSource.load();
      });
    }
  };
  _proto.getUpdatedAppointment = function getUpdatedAppointment() {
    return this._updatedAppointment;
  };
  _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this._updatedAppointmentKeys;
  };
  _proto.cleanState = function cleanState() {
    this._updatedAppointment = null;
    this._updatedAppointmentKeys = [];
  };
  _proto.add = function add(rawAppointment) {
    var _this2 = this;
    return this._dataSource.store().insert(rawAppointment).done(function () {
      return _this2._dataSource.load();
    });
  };
  _proto.update = function update(target, data) {
    var _this3 = this;
    var key = this._getStoreKey(target);
    // @ts-expect-error
    var d = new _deferred.Deferred();
    this._dataSource.store().update(key, data).done(function (result) {
      return _this3._dataSource.load().done(function () {
        return d.resolve(result);
      }).fail(d.reject);
    }).fail(d.reject);
    return d.promise();
  };
  _proto.remove = function remove(rawAppointment) {
    var _this4 = this;
    var key = this._getStoreKey(rawAppointment);
    return this._dataSource.store().remove(key).done(function () {
      return _this4._dataSource.load();
    });
  };
  _proto.destroy = function destroy() {
    var _a;
    var store = (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.store();
    if (store) {
      store.off(STORE_EVENTS.updating);
      store.off(STORE_EVENTS.push);
    }
  };
  _createClass(AppointmentDataSource, [{
    key: "keyName",
    get: function get() {
      var store = this._dataSource.store();
      return store.key();
    }
  }, {
    key: "isDataSourceInit",
    get: function get() {
      return !!this._dataSource;
    }
  }]);
  return AppointmentDataSource;
}();
exports.AppointmentDataSource = AppointmentDataSource;
