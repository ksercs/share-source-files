"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../common/data/odata/query_adapter");
var _request_dispatcher = _interopRequireDefault(require("../../../common/data/odata/request_dispatcher"));
var _store = _interopRequireDefault(require("../../../common/data/odata/store"));
var _class = _interopRequireDefault(require("../../../core/class"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _m_errors = require("../m_errors");
var _m_utils = require("./m_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ODataContext = _class.default.inherit({
  ctor(options) {
    this._requestDispatcher = new _request_dispatcher.default(options);
    this._errorHandler = options.errorHandler;
    (0, _iterator.each)(options.entities || [], (entityAlias, entityOptions) => {
      this[entityAlias] = new _store.default((0, _extend.extend)({}, options, {
        url: `${this._requestDispatcher.url}/${encodeURIComponent(entityOptions.name || entityAlias)}`
      }, entityOptions));
    });
  },
  get(operationName, params) {
    return this.invoke(operationName, params, 'GET');
  },
  invoke(operationName) {
    let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let httpMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';
    httpMethod = httpMethod.toLowerCase();
    // @ts-expect-error
    const d = new _deferred.Deferred();
    let url = `${this._requestDispatcher.url}/${encodeURIComponent(operationName)}`;
    let payload;
    if (this.version() === 4) {
      if (httpMethod === 'get') {
        url = (0, _m_utils.formatFunctionInvocationUrl)(url, (0, _m_utils.escapeServiceOperationParams)(params, this.version()));
        // @ts-expect-error
        params = null;
      } else if (httpMethod === 'post') {
        payload = params;
        // @ts-expect-error
        params = null;
      }
    }
    (0, _deferred.when)(this._requestDispatcher.sendRequest(url, httpMethod, (0, _m_utils.escapeServiceOperationParams)(params, this.version()), payload)).done(r => {
      if ((0, _type.isPlainObject)(r) && operationName in r) {
        r = r[operationName];
      }
      d.resolve(r);
    }).fail(this._errorHandler).fail(_m_errors.handleError).fail(d.reject);
    return d.promise();
  },
  objectLink(entityAlias, key) {
    const store = this[entityAlias];
    if (!store) {
      throw _m_errors.errors.Error('E4015', entityAlias);
    }
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    return {
      __metadata: {
        uri: store._byKeyUrl(key)
      }
    };
  },
  version() {
    return this._requestDispatcher.version;
  }
});
var _default = exports.default = ODataContext;