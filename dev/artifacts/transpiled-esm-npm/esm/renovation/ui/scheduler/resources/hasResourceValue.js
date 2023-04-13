import { isDefined } from '../../../../core/utils/type';
import { equalByValue } from '../../../../core/utils/common';
export var hasResourceValue = (resourceValues, itemValue) => isDefined(resourceValues.find(value => equalByValue(value, itemValue)));