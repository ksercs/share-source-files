import _extends from "@babel/runtime/helpers/esm/extends";
import { compileGetter, compileSetter } from '../../../../core/utils/data';
import dateSerialization from '../../../../core/utils/date_serialization';
import { DataAccessor } from './data_accessor';
const isDateField = field => field === 'startDate' || field === 'endDate';
export class AppointmentDataAccessor extends DataAccessor {
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
      getter: compileGetter(expr),
      setter: compileSetter(expr)
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
    const getter = object => this.forceIsoDateParsing ? dateSerialization.deserializeDate(commonGetter(object)) : commonGetter(object);
    const setter = (object, value) => {
      if (this.dateSerializationFormat) {
        serializationFormatCache = this.dateSerializationFormat;
      } else if (this.forceIsoDateParsing && !serializationFormatCache) {
        const oldValue = commonGetter(object);
        serializationFormatCache = dateSerialization.getDateSerializationFormat(oldValue);
      }
      const newValue = dateSerialization.serializeDate(value, serializationFormatCache);
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