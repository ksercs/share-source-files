/**
* DevExtreme (esm/viz/sankey/data_validator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import graphModule from './graph';
const validator = {
  validate: function (data, incidentOccurred) {
    let result = null;
    if (this._hasCycle(data)) {
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle: function (data) {
    return graphModule.struct.hasCycle(data);
  }
};
export default validator;
