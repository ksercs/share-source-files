/**
* DevExtreme (esm/__internal/events/utils/m_add_namespace.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../core/errors';
const addNamespace = (eventNames, namespace) => {
  if (!namespace) {
    throw errors.Error('E0017');
  }
  if (Array.isArray(eventNames)) {
    return eventNames.map(eventName => addNamespace(eventName, namespace)).join(' ');
  }
  if (eventNames.indexOf(' ') !== -1) {
    return addNamespace(eventNames.split(/\s+/g), namespace);
  }
  return `${eventNames}.${namespace}`;
};
export default addNamespace;
