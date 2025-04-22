import _extends from "@babel/runtime/helpers/esm/extends";
import { getPathParts } from '../../../../core/utils/data';
import { isPlainObject } from '../../../../core/utils/type';
const cloneObjectValue = value => Array.isArray(value) ? [...value] : _extends({}, value);
const cloneObjectProp = (value, prevValue, fullNameParts) => {
  const result = fullNameParts.length > 0 && prevValue && value !== prevValue ? cloneObjectValue(prevValue) : cloneObjectValue(value);
  const name = fullNameParts[0];
  if (fullNameParts.length > 1) {
    result[name] = cloneObjectProp(value[name], prevValue === null || prevValue === void 0 ? void 0 : prevValue[name], fullNameParts.slice(1));
  } else if (name) {
    if (isPlainObject(value[name])) {
      result[name] = cloneObjectValue(value[name]);
    } else {
      result[name] = value[name];
    }
  }
  return result;
};
export const updatePropsImmutable = (props, option, name, fullName) => {
  const currentPropsValue = option[name];
  const prevPropsValue = props[name];
  const result = props;
  if (isPlainObject(currentPropsValue) || name !== fullName && Array.isArray(currentPropsValue)) {
    result[name] = cloneObjectProp(currentPropsValue, prevPropsValue, getPathParts(fullName).slice(1));
  } else {
    result[name] = currentPropsValue;
  }
};