/**
* DevExtreme (esm/__internal/data/data_source/m_operation_manager.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { CANCELED_TOKEN } from '../../../common/data/data_source/utils';
export default class OperationManager {
  constructor() {
    // @ts-expect-error
    this._counter = -1;
    // @ts-expect-error
    this._deferreds = {};
  }
  add(deferred) {
    // @ts-expect-error
    this._counter++;
    // @ts-expect-error
    this._deferreds[this._counter] = deferred;
    // @ts-expect-error
    return this._counter;
  }
  remove(operationId) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    return delete this._deferreds[operationId];
  }
  cancel(operationId) {
    // @ts-expect-error
    if (operationId in this._deferreds) {
      // @ts-expect-error
      this._deferreds[operationId].reject(CANCELED_TOKEN);
      return true;
    }
    return false;
  }
  cancelAll() {
    // @ts-expect-error
    while (this._counter > -1) {
      // @ts-expect-error
      this.cancel(this._counter);
      // @ts-expect-error
      this._counter--;
    }
  }
}
