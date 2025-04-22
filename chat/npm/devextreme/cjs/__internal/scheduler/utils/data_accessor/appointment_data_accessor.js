/**
* DevExtreme (cjs/__internal/scheduler/utils/data_accessor/appointment_data_accessor.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentDataAccessor = void 0;
var _data = require("../../../../core/utils/data");
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _data_accessor = require("./data_accessor");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isDateField = field => field === 'startDate' || field === 'endDate';
class AppointmentDataAccessor extends _data_accessor.DataAccessor {
  constructor(fields) {
    let forceIsoDateParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let dateSerializationFormat = arguments.length > 2 ? arguments[2] : undefined;
    super();
    this.forceIsoDateParsing = forceIsoDateParsing;
    this.dateSerializationFormat = dateSerializationFormat;
    this.expr = _extends({}, fields);
    this.updateExpressions(fields);
  }
  getCommonAccessExpressions(expr) {
    return {
      getter: (0, _data.compileGetter)(expr),
      setter: (0, _data.compileSetter)(expr)
    };
  }
  getDateFieldAccessExpressions(expr) {
    const {
      getter: commonGetter,
      setter: commonSetter
    } = this.getCommonAccessExpressions(expr);
    // TODO: check cache usage, it sets once and forever now
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let serializationFormatCache;
    const getter = object => this.forceIsoDateParsing ? _date_serialization.default.deserializeDate(commonGetter(object)) : commonGetter(object);
    const setter = (object, value) => {
      if (this.dateSerializationFormat) {
        serializationFormatCache = this.dateSerializationFormat;
      } else if (this.forceIsoDateParsing && !serializationFormatCache) {
        const oldValue = commonGetter(object);
        serializationFormatCache = _date_serialization.default.getDateSerializationFormat(oldValue);
      }
      const newValue = _date_serialization.default.serializeDate(value, serializationFormatCache);
      commonSetter(object, newValue);
    };
    return {
      getter,
      setter
    };
  }
  getAccessExpressions(name, expr) {
    return isDateField(name) ? this.getDateFieldAccessExpressions(expr) : this.getCommonAccessExpressions(expr);
  }
  updateExpression(field, expr) {
    const name = field.replace('Expr', '');
    if (!expr) {
      /* eslint-disable @typescript-eslint/no-dynamic-delete */
      delete this.getter[name];
      delete this.setter[name];
      delete this.expr[field];
      /* eslint-enable @typescript-eslint/no-dynamic-delete */
      return;
    }
    const {
      getter,
      setter
    } = this.getAccessExpressions(name, expr);
    this.getter[name] = getter;
    this.setter[name] = setter;
    this.expr[field] = expr;
  }
}
exports.AppointmentDataAccessor = AppointmentDataAccessor;
