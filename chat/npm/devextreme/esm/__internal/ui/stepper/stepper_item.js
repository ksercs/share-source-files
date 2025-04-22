/**
* DevExtreme (esm/__internal/ui/stepper/stepper_item.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidgetItem from '../../ui/collection/item';
export const STEP_COMPLETED_CLASS = 'dx-step-completed';
export const STEP_INVALID_CLASS = 'dx-step-invalid';
export const STEP_VALID_ICON = 'check';
export const STEP_INVALID_ICON = 'errorcircle';
class StepperItem extends CollectionWidgetItem {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher('hint', value => {
      this._renderHint(value);
    });
  }
  _renderHint(hint) {
    this._$element.attr('title', hint ?? null);
  }
  updateInvalidClass(isValid) {
    this._$element.toggleClass(STEP_INVALID_CLASS, isValid !== undefined && !isValid);
  }
  changeCompleted(isCompleted) {
    this._$element.toggleClass(STEP_COMPLETED_CLASS, isCompleted);
  }
}
export default StepperItem;
