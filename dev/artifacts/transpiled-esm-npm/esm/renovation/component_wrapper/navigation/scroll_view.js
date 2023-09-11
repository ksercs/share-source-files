import Component from '../common/component';
import { Deferred } from '../../../core/utils/deferred';
export class ScrollViewWrapper extends Component {
  constructor(element, options) {
    super(element, options);
    this.updateAdditionalOptions();
  }
  update() {
    var _this$viewRef;
    (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.updateHandler();
    return Deferred().resolve();
  }
  release(preventScrollBottom) {
    this.viewRef.release(preventScrollBottom);
    return Deferred().resolve();
  }
  _dimensionChanged() {
    var _this$viewRef2;
    (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.updateHandler();
  }
  isRenovated() {
    return !!Component.IS_RENOVATED_WIDGET;
  }
  updateAdditionalOptions() {
    this.option('pullDownEnabled', this.hasActionSubscription('onPullDown'));
    this.option('reachBottomEnabled', this.hasActionSubscription('onReachBottom'));
  }
  on() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var callBase = super.on.apply(this, args);
    this.updateAdditionalOptions();
    return callBase;
  }
  _optionChanged(option) {
    var {
      name
    } = option;
    if (name === 'useNative') {
      this._isNodeReplaced = false;
    }
    super._optionChanged(option);
    if (name === 'onPullDown' || name === 'onReachBottom') {
      this.updateAdditionalOptions();
    }
  }
  _moveIsAllowed(event) {
    return this.viewRef.scrollableRef.current.scrollableRef.moveIsAllowed(event);
  }
}