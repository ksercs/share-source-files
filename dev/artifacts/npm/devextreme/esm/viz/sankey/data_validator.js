/**
* DevExtreme (esm/viz/sankey/data_validator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import graphModule from './graph';
var validator = {
  validate: function validate(data, incidentOccurred) {
    var result = null;
    if (this._hasCycle(data)) {
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle: function _hasCycle(data) {
    return graphModule.struct.hasCycle(data);
  }
};
export default validator;
