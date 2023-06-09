/**
* DevExtreme (esm/renovation/component_wrapper/scheduler/date_table.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import Component from '../common/component';
export class DateTable extends Component {
  _setOptionsByReference() {
    super._setOptionsByReference();
    this._optionsByReference = _extends({}, this._optionsByReference, {
      dataCellTemplate: true
    });
  }
}
