"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ajax = void 0;
var _http_request = _interopRequireDefault(require("../../../core/http_request"));
var _ajax_utils = require("../../../core/utils/ajax_utils");
var _deferred = require("../../../core/utils/deferred");
var _dependency_injector = _interopRequireDefault(require("../../../core/utils/dependency_injector"));
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const SUCCESS = 'success';
const ERROR = 'error';
const TIMEOUT = 'timeout';
const NO_CONTENT = 'nocontent';
const PARSER_ERROR = 'parsererror';
const isStatusSuccess = function (status) {
  return status >= 200 && status < 300;
};
const hasContent = function (status) {
  return status !== 204;
};
const getDataFromResponse = function (xhr) {
  return xhr.responseType && xhr.responseType !== 'text' || typeof xhr.responseText !== 'string' ? xhr.response : xhr.responseText;
};
const postProcess = function (deferred, xhr, dataType) {
  const data = getDataFromResponse(xhr);
  switch (dataType) {
    case 'jsonp':
      (0, _ajax_utils.evalScript)(data);
      break;
    case 'script':
      (0, _ajax_utils.evalScript)(data);
      deferred.resolve(data, SUCCESS, xhr);
      break;
    case 'json':
      try {
        deferred.resolve(JSON.parse(data), SUCCESS, xhr);
      } catch (e) {
        deferred.reject(xhr, PARSER_ERROR, e);
      }
      break;
    default:
      deferred.resolve(data, SUCCESS, xhr);
  }
};
const setHttpTimeout = function (timeout, xhr) {
  return timeout && setTimeout(function () {
    xhr.customStatus = TIMEOUT;
    xhr.abort();
  }, timeout);
};
const sendRequest = function (options) {
  const xhr = _http_request.default.getXhr();
  // @ts-expect-error only void function can be called with new
  const d = new _deferred.Deferred();
  const result = d.promise();
  const async = (0, _type.isDefined)(options.async) ? options.async : true;
  const {
    dataType
  } = options;
  const timeout = options.timeout || 0;
  let timeoutId;
  options.crossDomain = (0, _ajax_utils.isCrossDomain)(options.url);
  const needScriptEvaluation = dataType === 'jsonp' || dataType === 'script';
  if (options.cache === undefined) {
    options.cache = !needScriptEvaluation;
  }
  const callbackName = (0, _ajax_utils.getJsonpCallbackName)(options);
  const headers = (0, _ajax_utils.getRequestHeaders)(options);
  const requestOptions = (0, _ajax_utils.getRequestOptions)(options, headers);
  const {
    url
  } = requestOptions;
  const {
    parameters
  } = requestOptions;
  if (callbackName) {
    // @ts-expect-error window[callback] is window type
    window[callbackName] = function (data) {
      d.resolve(data, SUCCESS, xhr);
    };
  }
  if (options.crossDomain && needScriptEvaluation) {
    const reject = function () {
      d.reject(xhr, ERROR);
    };
    const resolve = function () {
      if (dataType === 'jsonp') return;
      d.resolve(null, SUCCESS, xhr);
    };
    (0, _ajax_utils.evalCrossDomainScript)(url).then(resolve, reject);
    return result;
  }
  if (options.crossDomain && !('withCredentials' in xhr)) {
    d.reject(xhr, ERROR);
    return result;
  }
  xhr.open((0, _ajax_utils.getMethod)(options), url, async, options.username, options.password);
  if (async) {
    xhr.timeout = timeout;
    timeoutId = setHttpTimeout(timeout, xhr);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      clearTimeout(timeoutId);
      if (isStatusSuccess(xhr.status)) {
        if (hasContent(xhr.status)) {
          postProcess(d, xhr, dataType);
        } else {
          d.resolve(null, NO_CONTENT, xhr);
        }
      } else {
        d.reject(xhr, xhr.customStatus || ERROR);
      }
    }
  };
  if (options.upload) {
    xhr.upload.onprogress = options.upload.onprogress;
    xhr.upload.onloadstart = options.upload.onloadstart;
    xhr.upload.onabort = options.upload.onabort;
  }
  if (options.xhrFields) {
    for (const field in options.xhrFields) {
      xhr[field] = options.xhrFields[field];
    }
  }
  if (options.responseType === 'arraybuffer') {
    xhr.responseType = options.responseType;
  }
  for (const name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name) && (0, _type.isDefined)(headers[name])) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  if (options.beforeSend) {
    options.beforeSend(xhr);
  }
  xhr.send(parameters);
  result.abort = function () {
    xhr.abort();
  };
  return result;
};
const Ajax = exports.Ajax = (0, _dependency_injector.default)({
  sendRequest
});