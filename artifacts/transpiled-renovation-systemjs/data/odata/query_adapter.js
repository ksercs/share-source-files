!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/odata/query_adapter.js"], ["../../core/utils/type","../../core/utils/iterator","../../core/config","../../core/utils/extend","../query_adapters","./utils","../errors","../utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/odata/query_adapter.js", ["../../core/utils/type", "../../core/utils/iterator", "../../core/config", "../../core/utils/extend", "../query_adapters", "./utils", "../errors", "../utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.odata = void 0;
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _extend = $__require("../../core/utils/extend");
  var _query_adapters = _interopRequireDefault($__require("../query_adapters"));
  var _utils = $__require("./utils");
  var _errors = $__require("../errors");
  var _utils2 = $__require("../utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DEFAULT_PROTOCOL_VERSION = 2;
  var STRING_FUNCTIONS = ['contains', 'notcontains', 'startswith', 'endswith'];
  var compileCriteria = function () {
    var protocolVersion;
    var forceLowerCase;
    var fieldTypes;
    var createBinaryOperationFormatter = function createBinaryOperationFormatter(op) {
      return function (prop, val) {
        return "".concat(prop, " ").concat(op, " ").concat(val);
      };
    };
    var createStringFuncFormatter = function createStringFuncFormatter(op, reverse) {
      return function (prop, val) {
        var bag = [op, '('];
        if (forceLowerCase) {
          prop = prop.indexOf('tolower(') === -1 ? "tolower(".concat(prop, ")") : prop;
          val = val.toLowerCase();
        }
        if (reverse) {
          bag.push(val, ',', prop);
        } else {
          bag.push(prop, ',', val);
        }
        bag.push(')');
        return bag.join('');
      };
    };
    var isStringFunction = function isStringFunction(name) {
      return STRING_FUNCTIONS.some(function (funcName) {
        return funcName === name;
      });
    };
    var formatters = {
      '=': createBinaryOperationFormatter('eq'),
      '<>': createBinaryOperationFormatter('ne'),
      '>': createBinaryOperationFormatter('gt'),
      '>=': createBinaryOperationFormatter('ge'),
      '<': createBinaryOperationFormatter('lt'),
      '<=': createBinaryOperationFormatter('le'),
      'startswith': createStringFuncFormatter('startswith'),
      'endswith': createStringFuncFormatter('endswith')
    };
    var formattersV2 = (0, _extend.extend)({}, formatters, {
      'contains': createStringFuncFormatter('substringof', true),
      'notcontains': createStringFuncFormatter('not substringof', true)
    });
    var formattersV4 = (0, _extend.extend)({}, formatters, {
      'contains': createStringFuncFormatter('contains'),
      'notcontains': createStringFuncFormatter('not contains')
    });
    var compileBinary = function compileBinary(criteria) {
      var _fieldTypes;
      criteria = (0, _utils2.normalizeBinaryCriterion)(criteria);
      var op = criteria[1];
      var fieldName = criteria[0];
      var fieldType = fieldTypes && fieldTypes[fieldName];
      if (fieldType && isStringFunction(op) && fieldType !== 'String') {
        throw new _errors.errors.Error('E4024', op, fieldName, fieldType);
      }
      var formatters = protocolVersion === 4 ? formattersV4 : formattersV2;
      var formatter = formatters[op.toLowerCase()];
      if (!formatter) {
        throw _errors.errors.Error('E4003', op);
      }
      var value = criteria[2];
      if ((_fieldTypes = fieldTypes) !== null && _fieldTypes !== void 0 && _fieldTypes[fieldName]) {
        value = (0, _utils.convertPrimitiveValue)(fieldTypes[fieldName], value);
      }
      return formatter((0, _utils.serializePropName)(fieldName), (0, _utils.serializeValue)(value, protocolVersion));
    };
    var compileUnary = function compileUnary(criteria) {
      var op = criteria[0];
      var crit = compileCore(criteria[1]);
      if (op === '!') {
        return "not (".concat(crit, ")");
      }
      throw _errors.errors.Error('E4003', op);
    };
    var compileGroup = function compileGroup(criteria) {
      var bag = [];
      var groupOperator;
      var nextGroupOperator;
      (0, _iterator.each)(criteria, function (index, criterion) {
        if (Array.isArray(criterion)) {
          if (bag.length > 1 && groupOperator !== nextGroupOperator) {
            throw new _errors.errors.Error('E4019');
          }
          bag.push("(".concat(compileCore(criterion), ")"));
          groupOperator = nextGroupOperator;
          nextGroupOperator = 'and';
        } else {
          nextGroupOperator = (0, _utils2.isConjunctiveOperator)(this) ? 'and' : 'or';
        }
      });
      return bag.join(" ".concat(groupOperator, " "));
    };
    var compileCore = function compileCore(criteria) {
      if (Array.isArray(criteria[0])) {
        return compileGroup(criteria);
      }
      if ((0, _utils2.isUnaryOperation)(criteria)) {
        return compileUnary(criteria);
      }
      return compileBinary(criteria);
    };
    return function (criteria, version, types, filterToLower) {
      fieldTypes = types;
      forceLowerCase = filterToLower !== null && filterToLower !== void 0 ? filterToLower : (0, _config.default)().oDataFilterToLower;
      protocolVersion = version;
      return compileCore(criteria);
    };
  }();
  var createODataQueryAdapter = function createODataQueryAdapter(queryOptions) {
    var _sorting = [];
    var _criteria = [];
    var _expand = queryOptions.expand;
    var _select;
    var _skip;
    var _take;
    var _countQuery;
    var _oDataVersion = queryOptions.version || DEFAULT_PROTOCOL_VERSION;
    var hasSlice = function hasSlice() {
      return _skip || _take !== undefined;
    };
    var hasFunction = function hasFunction(criterion) {
      for (var i = 0; i < criterion.length; i++) {
        if ((0, _type.isFunction)(criterion[i])) {
          return true;
        }
        if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
          return true;
        }
      }
      return false;
    };
    var requestData = function requestData() {
      var result = {};
      if (!_countQuery) {
        if (_sorting.length) {
          result['$orderby'] = _sorting.join(',');
        }
        if (_skip) {
          result['$skip'] = _skip;
        }
        if (_take !== undefined) {
          result['$top'] = _take;
        }
        result['$select'] = (0, _utils.generateSelect)(_oDataVersion, _select) || undefined;
        result['$expand'] = (0, _utils.generateExpand)(_oDataVersion, _expand, _select) || undefined;
      }
      if (_criteria.length) {
        var criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
        var fieldTypes = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.fieldTypes;
        var filterToLower = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.filterToLower;
        result['$filter'] = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower);
      }
      if (_countQuery) {
        result['$top'] = 0;
      }
      if (queryOptions.requireTotalCount || _countQuery) {
        // todo: tests!!!
        if (_oDataVersion !== 4) {
          result['$inlinecount'] = 'allpages';
        } else {
          result['$count'] = 'true';
        }
      }
      return result;
    };
    var tryLiftSelect = function tryLiftSelect(tasks) {
      var selectIndex = -1;
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name === 'select') {
          selectIndex = i;
          break;
        }
      }
      if (selectIndex < 0 || !(0, _type.isFunction)(tasks[selectIndex].args[0])) return;
      var nextTask = tasks[1 + selectIndex];
      if (!nextTask || nextTask.name !== 'slice') return;
      tasks[1 + selectIndex] = tasks[selectIndex];
      tasks[selectIndex] = nextTask;
    };
    return {
      optimize: tryLiftSelect,
      exec: function exec(url) {
        return (0, _utils.sendRequest)(_oDataVersion, {
          url: url,
          params: (0, _extend.extend)(requestData(), queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.params)
        }, {
          beforeSend: queryOptions.beforeSend,
          jsonp: queryOptions.jsonp,
          withCredentials: queryOptions.withCredentials,
          countOnly: _countQuery,
          deserializeDates: queryOptions.deserializeDates,
          fieldTypes: queryOptions.fieldTypes,
          isPaged: isFinite(_take)
        });
      },
      multiSort: function multiSort(args) {
        var rules;
        if (hasSlice()) {
          return false;
        }
        for (var i = 0; i < args.length; i++) {
          var getter = args[i][0];
          var desc = !!args[i][1];
          var rule = void 0;
          if (typeof getter !== 'string') {
            return false;
          }
          rule = (0, _utils.serializePropName)(getter);
          if (desc) {
            rule += ' desc';
          }
          rules = rules || [];
          rules.push(rule);
        }
        _sorting = rules;
      },
      slice: function slice(skipCount, takeCount) {
        if (hasSlice()) {
          return false;
        }
        _skip = skipCount;
        _take = takeCount;
      },
      filter: function filter(criterion) {
        if (hasSlice()) {
          return false;
        }
        if (!Array.isArray(criterion)) {
          criterion = [].slice.call(arguments);
        }
        if (hasFunction(criterion)) {
          return false;
        }
        if (_criteria.length) {
          _criteria.push('and');
        }
        _criteria.push(criterion);
      },
      select: function select(expr) {
        if (_select || (0, _type.isFunction)(expr)) {
          return false;
        }
        if (!Array.isArray(expr)) {
          expr = [].slice.call(arguments);
        }
        _select = expr;
      },
      count: function count() {
        return _countQuery = true;
      }
    };
  };
  _query_adapters.default.odata = createODataQueryAdapter;
  var odata = createODataQueryAdapter;
  exports.odata = odata;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/iterator","../../core/config","../../core/utils/extend","../query_adapters","./utils","../errors","../utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/config"), require("../../core/utils/extend"), require("../query_adapters"), require("./utils"), require("../errors"), require("../utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=query_adapter.js.map