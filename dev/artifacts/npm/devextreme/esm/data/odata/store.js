/**
* DevExtreme (esm/data/odata/store.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import config from '../../core/config';
import { generateExpand, generateSelect, serializeKey, convertPrimitiveValue, formatFunctionInvocationUrl, escapeServiceOperationParams } from './utils';
import { errors } from '../errors';
import query from '../query';
import Store from '../abstract_store';
import RequestDispatcher from './request_dispatcher';
import { when, Deferred } from '../../core/utils/deferred';
import './query_adapter';
var ANONYMOUS_KEY_NAME = '5d46402c-7899-4ea9-bd81-8b73c47c7683';
var expandKeyType = (key, keyType) => ({
  [key]: keyType
});
var mergeFieldTypesWithKeyType = (fieldTypes, keyType) => {
  var result = {};
  for (var field in fieldTypes) {
    result[field] = fieldTypes[field];
  }
  for (var keyName in keyType) {
    if (keyName in result) {
      if (result[keyName] !== keyType[keyName]) {
        errors.log('W4001', keyName);
      }
    } else {
      result[keyName] = keyType[keyName];
    }
  }
  return result;
};
var ODataStore = Store.inherit({
  ctor(options) {
    this.callBase(options);
    this._requestDispatcher = new RequestDispatcher(options);
    var key = this.key();
    var fieldTypes = options.fieldTypes;
    var keyType = options.keyType;
    if (keyType) {
      var keyTypeIsString = typeof keyType === 'string';
      if (!key) {
        key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
        this._legacyAnonymousKey = key;
      }
      if (keyTypeIsString) {
        keyType = expandKeyType(key, keyType);
      }
      fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType);
    }
    this._fieldTypes = fieldTypes || {};
    if (this.version() === 2) {
      this._updateMethod = 'MERGE';
    } else {
      this._updateMethod = 'PATCH';
    }
  },
  _customLoadOptions() {
    return ['expand', 'customQueryParams'];
  },
  _byKeyImpl(key, extraOptions) {
    var params = {};
    if (extraOptions) {
      params['$expand'] = generateExpand(this.version(), extraOptions.expand, extraOptions.select) || undefined;
      params['$select'] = generateSelect(this.version(), extraOptions.select) || undefined;
    }
    return this._requestDispatcher.sendRequest(this._byKeyUrl(key), 'GET', params);
  },
  createQuery(loadOptions) {
    var _loadOptions$urlOverr;
    var url;
    var queryOptions = {
      adapter: 'odata',
      beforeSend: this._requestDispatcher.beforeSend,
      errorHandler: this._errorHandler,
      jsonp: this._requestDispatcher.jsonp,
      version: this._requestDispatcher.version,
      withCredentials: this._requestDispatcher._withCredentials,
      expand: loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.expand,
      requireTotalCount: loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.requireTotalCount,
      deserializeDates: this._requestDispatcher._deserializeDates,
      fieldTypes: this._fieldTypes
    };

    // NOTE: For AppBuilder, do not remove
    url = (_loadOptions$urlOverr = loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.urlOverride) !== null && _loadOptions$urlOverr !== void 0 ? _loadOptions$urlOverr : this._requestDispatcher.url;
    if (isDefined(this._requestDispatcher.filterToLower)) {
      queryOptions.filterToLower = this._requestDispatcher.filterToLower;
    }
    if (loadOptions !== null && loadOptions !== void 0 && loadOptions.customQueryParams) {
      var params = escapeServiceOperationParams(loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.customQueryParams, this.version());
      if (this.version() === 4) {
        url = formatFunctionInvocationUrl(url, params);
      } else {
        queryOptions.params = params;
      }
    }
    return query(url, queryOptions);
  },
  _insertImpl(values) {
    this._requireKey();
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._requestDispatcher.url, 'POST', null, values)).done(serverResponse => d.resolve(serverResponse && !config().useLegacyStoreResult ? serverResponse : values, this.keyOf(serverResponse))).fail(d.reject);
    return d.promise();
  },
  _updateImpl(key, values) {
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done(serverResponse => config().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key)).fail(d.reject);
    return d.promise();
  },
  _removeImpl(key) {
    var d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), 'DELETE')).done(() => d.resolve(key)).fail(d.reject);
    return d.promise();
  },
  _convertKey(value) {
    var result = value;
    var fieldTypes = this._fieldTypes;
    var key = this.key() || this._legacyAnonymousKey;
    if (Array.isArray(key)) {
      result = {};
      for (var i = 0; i < key.length; i++) {
        var keyName = key[i];
        result[keyName] = convertPrimitiveValue(fieldTypes[keyName], value[keyName]);
      }
    } else if (fieldTypes[key]) {
      result = convertPrimitiveValue(fieldTypes[key], value);
    }
    return result;
  },
  _byKeyUrl(value) {
    var baseUrl = this._requestDispatcher.url;
    var convertedKey = this._convertKey(value);
    return "".concat(baseUrl, "(").concat(encodeURIComponent(serializeKey(convertedKey, this.version())), ")");
  },
  version() {
    return this._requestDispatcher.version;
  }
}, 'odata');
export default ODataStore;
