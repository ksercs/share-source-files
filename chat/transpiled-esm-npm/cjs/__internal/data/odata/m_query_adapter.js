"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.odata = void 0;
var _query_adapters = _interopRequireDefault(require("../../../common/data/query_adapters"));
var _config = _interopRequireDefault(require("../../../core/config"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _m_errors = require("../m_errors");
var _m_utils = require("../m_utils");
var _m_utils2 = require("./m_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_PROTOCOL_VERSION = 4;
const STRING_FUNCTIONS = ['contains', 'notcontains', 'startswith', 'endswith'];
const compileCriteria = (() => {
  let protocolVersion;
  let forceLowerCase;
  let fieldTypes;
  const createBinaryOperationFormatter = op => (prop, val) => `${prop} ${op} ${val}`;
  const createStringFuncFormatter = (op, reverse) => (prop, val) => {
    const bag = [op, '('];
    if (forceLowerCase) {
      prop = prop.indexOf('tolower(') === -1 ? `tolower(${prop})` : prop;
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
  const isStringFunction = function (name) {
    return STRING_FUNCTIONS.some(funcName => funcName === name);
  };
  const formatters = {
    '=': createBinaryOperationFormatter('eq'),
    '<>': createBinaryOperationFormatter('ne'),
    '>': createBinaryOperationFormatter('gt'),
    '>=': createBinaryOperationFormatter('ge'),
    '<': createBinaryOperationFormatter('lt'),
    '<=': createBinaryOperationFormatter('le'),
    // @ts-expect-error
    startswith: createStringFuncFormatter('startswith'),
    // @ts-expect-error
    endswith: createStringFuncFormatter('endswith')
  };
  const formattersV2 = (0, _extend.extend)({}, formatters, {
    /* eslint-disable spellcheck/spell-checker */
    contains: createStringFuncFormatter('substringof', true),
    notcontains: createStringFuncFormatter('not substringof', true)
  });
  const formattersV4 = (0, _extend.extend)({}, formatters, {
    // @ts-expect-error
    contains: createStringFuncFormatter('contains'),
    // @ts-expect-error
    notcontains: createStringFuncFormatter('not contains')
  });
  const compileBinary = criteria => {
    var _fieldTypes;
    criteria = (0, _m_utils.normalizeBinaryCriterion)(criteria);
    const op = criteria[1];
    const fieldName = criteria[0];
    const fieldType = fieldTypes && fieldTypes[fieldName];
    if (fieldType && isStringFunction(op) && fieldType !== 'String') {
      // @ts-expect-error
      throw new _m_errors.errors.Error('E4024', op, fieldName, fieldType);
    }
    const formatters = protocolVersion === 4 ? formattersV4 : formattersV2;
    const formatter = formatters[op.toLowerCase()];
    if (!formatter) {
      throw _m_errors.errors.Error('E4003', op);
    }
    let value = criteria[2];
    if ((_fieldTypes = fieldTypes) !== null && _fieldTypes !== void 0 && _fieldTypes[fieldName]) {
      value = (0, _m_utils2.convertPrimitiveValue)(fieldTypes[fieldName], value);
    }
    return formatter((0, _m_utils2.serializePropName)(fieldName), (0, _m_utils2.serializeValue)(value, protocolVersion));
  };
  const compileUnary = criteria => {
    const op = criteria[0];
    const crit = compileCore(criteria[1]);
    if (op === '!') {
      return `not (${crit})`;
    }
    throw _m_errors.errors.Error('E4003', op);
  };
  const compileGroup = criteria => {
    const bag = [];
    let groupOperator;
    let nextGroupOperator;
    (0, _iterator.each)(criteria, function (index, criterion) {
      if (Array.isArray(criterion)) {
        if (bag.length > 1 && groupOperator !== nextGroupOperator) {
          // @ts-expect-error
          throw new _m_errors.errors.Error('E4019');
        }
        // @ts-expect-error
        bag.push(`(${compileCore(criterion)})`);
        groupOperator = nextGroupOperator;
        nextGroupOperator = 'and';
      } else {
        nextGroupOperator = (0, _m_utils.isConjunctiveOperator)(this) ? 'and' : 'or';
      }
    });
    return bag.join(` ${groupOperator} `);
  };
  const compileCore = criteria => {
    if (Array.isArray(criteria[0])) {
      return compileGroup(criteria);
    }
    if ((0, _m_utils.isUnaryOperation)(criteria)) {
      return compileUnary(criteria);
    }
    return compileBinary(criteria);
  };
  return (criteria, version, types, filterToLower) => {
    fieldTypes = types;
    forceLowerCase = filterToLower ?? (0, _config.default)().oDataFilterToLower;
    protocolVersion = version;
    return compileCore(criteria);
  };
})();
const createODataQueryAdapter = queryOptions => {
  /* eslint-disable  @typescript-eslint/naming-convention */
  let _sorting = [];
  const _criteria = [];
  const _expand = queryOptions.expand;
  let _select;
  let _skip;
  let _take;
  let _countQuery;
  const _oDataVersion = queryOptions.version || DEFAULT_PROTOCOL_VERSION;
  const hasSlice = () => _skip || _take !== undefined;
  const hasFunction = criterion => {
    for (let i = 0; i < criterion.length; i++) {
      if ((0, _type.isFunction)(criterion[i])) {
        return true;
      }
      if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
        return true;
      }
    }
    return false;
  };
  const requestData = () => {
    const result = {};
    if (!_countQuery) {
      if (_sorting.length) {
        // @ts-expect-error
        result.$orderby = _sorting.join(',');
      }
      if (_skip) {
        // @ts-expect-error
        result.$skip = _skip;
      }
      if (_take !== undefined) {
        // @ts-expect-error
        result.$top = _take;
      }
      // @ts-expect-error
      result.$select = (0, _m_utils2.generateSelect)(_oDataVersion, _select) || undefined;
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      result.$expand = (0, _m_utils2.generateExpand)(_oDataVersion, _expand, _select) || undefined;
    }
    if (_criteria.length) {
      const criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
      const fieldTypes = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.fieldTypes;
      const filterToLower = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.filterToLower;
      // @ts-expect-error
      result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower);
    }
    if (_countQuery) {
      // @ts-expect-error
      result.$top = 0;
    }
    if (queryOptions.requireTotalCount || _countQuery) {
      // todo: tests!!!
      if (_oDataVersion !== 4) {
        // @ts-expect-error
        result.$inlinecount = 'allpages';
      } else {
        // @ts-expect-error
        result.$count = 'true';
      }
    }
    return result;
  };
  const tryLiftSelect = tasks => {
    let selectIndex = -1;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === 'select') {
        selectIndex = i;
        break;
      }
    }
    if (selectIndex < 0 || !(0, _type.isFunction)(tasks[selectIndex].args[0])) return;
    const nextTask = tasks[1 + selectIndex];
    if (!nextTask || nextTask.name !== 'slice') return;
    tasks[1 + selectIndex] = tasks[selectIndex];
    tasks[selectIndex] = nextTask;
  };
  return {
    optimize: tryLiftSelect,
    exec(url) {
      return (0, _m_utils2.sendRequest)(_oDataVersion, {
        url,
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
    /* eslint-disable @typescript-eslint/no-invalid-void-type */
    multiSort(args) {
      let rules;
      if (hasSlice()) {
        return false;
      }
      for (let i = 0; i < args.length; i++) {
        const getter = args[i][0];
        const desc = !!args[i][1];
        let rule;
        if (typeof getter !== 'string') {
          return false;
        }
        rule = (0, _m_utils2.serializePropName)(getter);
        if (desc) {
          rule += ' desc';
        }
        rules = rules || [];
        rules.push(rule);
      }
      _sorting = rules;
    },
    slice(skipCount, takeCount) {
      if (hasSlice()) {
        return false;
      }
      _skip = skipCount;
      _take = takeCount;
    },
    filter(criterion) {
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
        // @ts-expect-error
        _criteria.push('and');
      }
      // @ts-expect-error
      _criteria.push(criterion);
    },
    select(expr) {
      if (_select || (0, _type.isFunction)(expr)) {
        return false;
      }
      if (!Array.isArray(expr)) {
        expr = [].slice.call(arguments);
      }
      _select = expr;
    },
    // eslint-disable-next-line no-return-assign
    count: () => _countQuery = true
  };
};
_query_adapters.default.odata = createODataQueryAdapter;
const odata = exports.odata = createODataQueryAdapter;