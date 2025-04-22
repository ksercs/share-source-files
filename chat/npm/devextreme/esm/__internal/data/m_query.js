/**
* DevExtreme (esm/__internal/data/m_query.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { queryImpl } from '../../common/data/query_implementation';
const query = function () {
  const impl = Array.isArray(arguments[0]) ? 'array' : 'remote';
  // @ts-expect-error
  return queryImpl[impl].apply(this, arguments);
};
export default query;
