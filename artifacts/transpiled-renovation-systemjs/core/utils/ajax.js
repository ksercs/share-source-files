!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/ajax.js"], ["./deferred","../../core/dom_adapter","../../core/http_request","../../core/utils/window","./extend","./type","./dependency_injector"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/ajax.js", ["./deferred", "../../core/dom_adapter", "../../core/http_request", "../../core/utils/window", "./extend", "./type", "./dependency_injector"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _deferred = $__require("./deferred");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _http_request = _interopRequireDefault($__require("../../core/http_request"));
  var _window = $__require("../../core/utils/window");
  var _extend = $__require("./extend");
  var _type = $__require("./type");
  var _dependency_injector = _interopRequireDefault($__require("./dependency_injector"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var SUCCESS = 'success';
  var ERROR = 'error';
  var TIMEOUT = 'timeout';
  var NO_CONTENT = 'nocontent';
  var PARSER_ERROR = 'parsererror';
  var isStatusSuccess = function isStatusSuccess(status) {
    return 200 <= status && status < 300;
  };
  var hasContent = function hasContent(status) {
    return status !== 204;
  };
  var paramsConvert = function paramsConvert(params) {
    var result = [];
    for (var name in params) {
      var value = params[name];
      if (value === undefined) {
        continue;
      }
      if (value === null) {
        value = '';
      }
      if (typeof value === 'function') {
        value = value();
      }
      result.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
    return result.join('&');
  };
  var createScript = function createScript(options) {
    var script = _dom_adapter.default.createElement('script');
    for (var name in options) {
      script[name] = options[name];
    }
    return script;
  };
  var removeScript = function removeScript(scriptNode) {
    scriptNode.parentNode.removeChild(scriptNode);
  };
  var appendToHead = function appendToHead(element) {
    return _dom_adapter.default.getHead().appendChild(element);
  };
  var evalScript = function evalScript(code) {
    var script = createScript({
      text: code
    });
    appendToHead(script);
    removeScript(script);
  };
  var evalCrossDomainScript = function evalCrossDomainScript(url) {
    var script = createScript({
      src: url
    });
    return new Promise(function (resolve, reject) {
      var events = {
        'load': resolve,
        'error': reject
      };
      var loadHandler = function loadHandler(e) {
        events[e.type]();
        removeScript(script);
      };
      for (var event in events) {
        _dom_adapter.default.listen(script, event, loadHandler);
      }
      appendToHead(script);
    });
  };
  var getAcceptHeader = function getAcceptHeader(options) {
    var dataType = options.dataType || '*';
    var scriptAccept = 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript';
    var accepts = {
      '*': '*/*',
      text: 'text/plain',
      html: 'text/html',
      xml: 'application/xml, text/xml',
      json: 'application/json, text/javascript',
      jsonp: scriptAccept,
      script: scriptAccept
    };
    (0, _extend.extendFromObject)(accepts, options.accepts, true);
    return accepts[dataType] ? accepts[dataType] + (dataType !== '*' ? ', */*; q=0.01' : '') : accepts['*'];
  };
  var getContentTypeHeader = function getContentTypeHeader(options) {
    var defaultContentType;
    if (options.data && !options.upload && getMethod(options) !== 'GET') {
      defaultContentType = 'application/x-www-form-urlencoded;charset=utf-8';
    }
    return options.contentType || defaultContentType;
  };
  var getDataFromResponse = function getDataFromResponse(xhr) {
    return xhr.responseType && xhr.responseType !== 'text' || typeof xhr.responseText !== 'string' ? xhr.response : xhr.responseText;
  };
  var postProcess = function postProcess(deferred, xhr, dataType) {
    var data = getDataFromResponse(xhr);
    switch (dataType) {
      case 'jsonp':
        evalScript(data);
        break;
      case 'script':
        evalScript(data);
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
  var isCrossDomain = function isCrossDomain(url) {
    if (!(0, _window.hasWindow)()) {
      return true;
    }
    var crossDomain = false;
    var originAnchor = _dom_adapter.default.createElement('a');
    var urlAnchor = _dom_adapter.default.createElement('a');
    originAnchor.href = window.location.href;
    try {
      urlAnchor.href = url;

      // NOTE: IE11
      // eslint-disable-next-line no-self-assign
      urlAnchor.href = urlAnchor.href;
      crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
    } catch (e) {
      crossDomain = true;
    }
    return crossDomain;
  };
  var setHttpTimeout = function setHttpTimeout(timeout, xhr) {
    return timeout && setTimeout(function () {
      xhr.customStatus = TIMEOUT;
      xhr.abort();
    }, timeout);
  };
  var getJsonpOptions = function getJsonpOptions(options) {
    if (options.dataType === 'jsonp') {
      var random = Math.random().toString().replace(/\D/g, '');
      var callbackName = options.jsonpCallback || 'dxCallback' + Date.now() + '_' + random;
      var callbackParameter = options.jsonp || 'callback';
      options.data = options.data || {};
      options.data[callbackParameter] = callbackName;
      return callbackName;
    }
  };
  var getRequestOptions = function getRequestOptions(options, headers) {
    var params = options.data;
    var paramsAlreadyString = typeof params === 'string';
    var url = options.url || window.location.href;
    if (!paramsAlreadyString && !options.cache) {
      params = params || {};
      params['_'] = Date.now();
    }
    if (params && !options.upload) {
      if (!paramsAlreadyString) {
        params = paramsConvert(params);
      }
      if (getMethod(options) === 'GET') {
        if (params !== '') {
          url += (url.indexOf('?') > -1 ? '&' : '?') + params;
        }
        params = null;
      } else if (headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
        params = params.replace(/%20/g, '+');
      }
    }
    return {
      url: url,
      parameters: params
    };
  };
  function getMethod(options) {
    return (options.method || 'GET').toUpperCase();
  }
  var getRequestHeaders = function getRequestHeaders(options) {
    var headers = options.headers || {};
    headers['Content-Type'] = headers['Content-Type'] || getContentTypeHeader(options);
    headers['Accept'] = headers['Accept'] || getAcceptHeader(options);
    if (!options.crossDomain && !headers['X-Requested-With']) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    return headers;
  };
  var sendRequest = function sendRequest(options) {
    var xhr = _http_request.default.getXhr();
    var d = new _deferred.Deferred();
    var result = d.promise();
    var async = (0, _type.isDefined)(options.async) ? options.async : true;
    var dataType = options.dataType;
    var timeout = options.timeout || 0;
    var timeoutId;
    options.crossDomain = isCrossDomain(options.url);
    var needScriptEvaluation = dataType === 'jsonp' || dataType === 'script';
    if (options.cache === undefined) {
      options.cache = !needScriptEvaluation;
    }
    var callbackName = getJsonpOptions(options);
    var headers = getRequestHeaders(options);
    var requestOptions = getRequestOptions(options, headers);
    var url = requestOptions.url;
    var parameters = requestOptions.parameters;
    if (callbackName) {
      window[callbackName] = function (data) {
        d.resolve(data, SUCCESS, xhr);
      };
    }
    if (options.crossDomain && needScriptEvaluation) {
      var reject = function reject() {
        d.reject(xhr, ERROR);
      };
      var resolve = function resolve() {
        if (dataType === 'jsonp') return;
        d.resolve(null, SUCCESS, xhr);
      };
      evalCrossDomainScript(url).then(resolve, reject);
      return result;
    }
    if (options.crossDomain && !('withCredentials' in xhr)) {
      d.reject(xhr, ERROR);
      return result;
    }
    xhr.open(getMethod(options), url, async, options.username, options.password);
    if (async) {
      xhr.timeout = timeout;
      timeoutId = setHttpTimeout(timeout, xhr);
    }
    xhr['onreadystatechange'] = function (e) {
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
      xhr.upload['onprogress'] = options.upload['onprogress'];
      xhr.upload['onloadstart'] = options.upload['onloadstart'];
      xhr.upload['onabort'] = options.upload['onabort'];
    }
    if (options.xhrFields) {
      for (var field in options.xhrFields) {
        xhr[field] = options.xhrFields[field];
      }
    }
    if (options.responseType === 'arraybuffer') {
      xhr.responseType = options.responseType;
    }
    for (var name in headers) {
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
  var _default = (0, _dependency_injector.default)({
    sendRequest: sendRequest
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./deferred","../../core/dom_adapter","../../core/http_request","../../core/utils/window","./extend","./type","./dependency_injector"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./deferred"), require("../../core/dom_adapter"), require("../../core/http_request"), require("../../core/utils/window"), require("./extend"), require("./type"), require("./dependency_injector"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ajax.js.map