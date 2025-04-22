import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import { end as swipeEventEnd, start as swipeEventStart, swipe as swipeEventSwipe } from '../../../common/core/events/swipe';
import { addNamespace } from '../../../common/core/events/utils/index';
import { each } from '../../../core/utils/iterator';
import { name } from '../../../core/utils/public_component';
import DOMComponent from '../../core/widget/dom_component';
const DX_SWIPEABLE = 'dxSwipeable';
const SWIPEABLE_CLASS = 'dx-swipeable';
const ACTION_TO_EVENT_MAP = {
  onStart: swipeEventStart,
  onUpdated: swipeEventSwipe,
  onEnd: swipeEventEnd,
  onCancel: 'dxswipecancel'
};
const IMMEDIATE_TIMEOUT = 180;
class Swipeable extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      elastic: true,
      immediate: false,
      immediateTimeout: IMMEDIATE_TIMEOUT,
      direction: 'horizontal',
      itemSizeFunc: null,
      onStart: null,
      onUpdated: null,
      onEnd: null,
      onCancel: null
    });
  }
  _render() {
    super._render();
    this.$element().addClass(SWIPEABLE_CLASS);
    this._attachEventHandlers();
  }
  _attachEventHandlers() {
    this._detachEventHandlers();
    if (this.option('disabled')) {
      return;
    }
    const {
      NAME
    } = this;
    this._createEventData();
    each(ACTION_TO_EVENT_MAP, (actionName, eventName) => {
      // @ts-expect-error ts-error
      const action = this._createActionByOption(actionName, {
        context: this
      });
      // @ts-expect-error ts-error
      eventName = addNamespace(eventName, NAME);
      eventsEngine.on(this.$element(), eventName, this._eventData, e => action({
        event: e
      }));
    });
  }
  _createEventData() {
    this._eventData = {
      elastic: this.option('elastic'),
      itemSizeFunc: this.option('itemSizeFunc'),
      direction: this.option('direction'),
      immediate: this.option('immediate'),
      immediateTimeout: this.option('immediateTimeout')
    };
  }
  _detachEventHandlers() {
    eventsEngine.off(this.$element(), `.${DX_SWIPEABLE}`);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'disabled':
      case 'onStart':
      case 'onUpdated':
      case 'onEnd':
      case 'onCancel':
      case 'elastic':
      case 'immediate':
      case 'itemSizeFunc':
      case 'direction':
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case 'rtlEnabled':
        break;
      default:
        super._optionChanged(args);
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
}
name(Swipeable, DX_SWIPEABLE);
export default Swipeable;