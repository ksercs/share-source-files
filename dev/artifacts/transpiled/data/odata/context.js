"use strict";

exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _errors = require("../errors");
var _store = _interopRequireDefault(require("./store"));
var _request_dispatcher = _interopRequireDefault(require("./request_dispatcher"));
var _utils = require("./utils");
var _deferred = require("../../core/utils/deferred");
require("./query_adapter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ODataContext = _class.default.inherit({
  ctor(options) {
    var _this = this;
    this._requestDispatcher = new _request_dispatcher.default(options);
    this._errorHandler = options.errorHandler;
    (0, _iterator.each)(options.entities || [], function (entityAlias, entityOptions) {
      _this[entityAlias] = new _store.default((0, _extend.extend)({}, options, {
        url: "".concat(_this._requestDispatcher.url, "/").concat(encodeURIComponent(entityOptions.name || entityAlias))
      }, entityOptions));
    });
  },
  get(operationName, params) {
    return this.invoke(operationName, params, 'GET');
  },
  invoke(operationName) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var httpMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';
    httpMethod = httpMethod.toLowerCase();
    var d = new _deferred.Deferred();
    var url = "".concat(this._requestDispatcher.url, "/").concat(encodeURIComponent(operationName));
    var payload;
    if (this.version() === 4) {
      if (httpMethod === 'get') {
        url = (0, _utils.formatFunctionInvocationUrl)(url, (0, _utils.escapeServiceOperationParams)(params, this.version()));
        params = null;
      } else if (httpMethod === 'post') {
        payload = params;
        params = null;
      }
    }
    (0, _deferred.when)(this._requestDispatcher.sendRequest(url, httpMethod, (0, _utils.escapeServiceOperationParams)(params, this.version()), payload)).done(function (r) {
      if ((0, _type.isPlainObject)(r) && operationName in r) {
        r = r[operationName];
      }
      d.resolve(r);
    }).fail(this._errorHandler).fail(_errors.handleError).fail(d.reject);
    return d.promise();
  },
  objectLink(entityAlias, key) {
    var store = this[entityAlias];
    if (!store) {
      throw _errors.errors.Error('E4015', entityAlias);
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
var _default = ODataContext;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;