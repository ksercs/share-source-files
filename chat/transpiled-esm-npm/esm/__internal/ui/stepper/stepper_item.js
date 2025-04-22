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