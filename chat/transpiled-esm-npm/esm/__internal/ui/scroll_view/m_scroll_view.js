import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { hasWindow } from '../../../core/utils/window';
import LoadIndicator from '../../../ui/load_indicator';
import { isMaterialBased } from '../../../ui/themes';
import LoadPanel from '../../ui/m_load_panel';
import PullDownStrategy from './m_scroll_view.native.pull_down';
import SwipeDownStrategy from './m_scroll_view.native.swipe_down';
import SimulatedStrategy from './m_scroll_view.simulated';
import Scrollable from './m_scrollable';
// STYLE scrollView
const SCROLLVIEW_CLASS = 'dx-scrollview';
const SCROLLVIEW_CONTENT_CLASS = `${SCROLLVIEW_CLASS}-content`;
const SCROLLVIEW_TOP_POCKET_CLASS = `${SCROLLVIEW_CLASS}-top-pocket`;
const SCROLLVIEW_BOTTOM_POCKET_CLASS = `${SCROLLVIEW_CLASS}-bottom-pocket`;
const SCROLLVIEW_PULLDOWN_CLASS = `${SCROLLVIEW_CLASS}-pull-down`;
const SCROLLVIEW_REACHBOTTOM_CLASS = `${SCROLLVIEW_CLASS}-scrollbottom`;
const SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = `${SCROLLVIEW_REACHBOTTOM_CLASS}-indicator`;
const SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = `${SCROLLVIEW_REACHBOTTOM_CLASS}-text`;
const SCROLLVIEW_LOADPANEL = `${SCROLLVIEW_CLASS}-loadpanel`;
const refreshStrategies = {
  pullDown: PullDownStrategy,
  swipeDown: SwipeDownStrategy,
  simulated: SimulatedStrategy
};
const isServerSide = !hasWindow();
export class ScrollViewServerSide extends Scrollable {
  finishLoading() {}
  release() {}
  refresh() {}
  scrollOffset() {
    return {
      top: 0,
      left: 0
    };
  }
  isBottomReached() {
    return false;
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    // @ts-expect-error ts-error
    if (name !== 'onUpdated') {
      // @ts-expect-error ts-error
      return super._optionChanged.apply(this, arguments);
    }
  }
}
export class ScrollView extends Scrollable {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      pullingDownText: messageLocalization.format('dxScrollView-pullingDownText'),
      pulledDownText: messageLocalization.format('dxScrollView-pulledDownText'),
      refreshingText: messageLocalization.format('dxScrollView-refreshingText'),
      reachBottomText: messageLocalization.format('dxScrollView-reachBottomText'),
      // @ts-expect-error ts-error
      onPullDown: null,
      // @ts-expect-error ts-error
      onReachBottom: null,
      refreshStrategy: 'pullDown'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        const realDevice = devices.real();
        return realDevice.platform === 'android';
      },
      options: {
        refreshStrategy: 'swipeDown'
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterialBased();
      },
      options: {
        pullingDownText: '',
        pulledDownText: '',
        refreshingText: '',
        reachBottomText: ''
      }
    }]);
  }
  _init() {
    super._init();
    this._loadingIndicatorEnabled = true;
  }
  _initScrollableMarkup() {
    super._initScrollableMarkup();
    this.$element().addClass(SCROLLVIEW_CLASS);
    this._initContent();
    this._initTopPocket();
    this._initBottomPocket();
    this._initLoadPanel();
  }
  _initContent() {
    const $content = $('<div>').addClass(SCROLLVIEW_CONTENT_CLASS);
    this._$content.wrapInner($content);
  }
  _initTopPocket() {
    this._$topPocket = $('<div>').addClass(SCROLLVIEW_TOP_POCKET_CLASS);
    this._$pullDown = $('<div>').addClass(SCROLLVIEW_PULLDOWN_CLASS);
    this._$topPocket.append(this._$pullDown);
    this._$content.prepend(this._$topPocket);
  }
  _initBottomPocket() {
    this._$bottomPocket = $('<div>').addClass(SCROLLVIEW_BOTTOM_POCKET_CLASS);
    this._$reachBottom = $('<div>').addClass(SCROLLVIEW_REACHBOTTOM_CLASS);
    const $loadContainer = $('<div>').addClass(SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS);
    // @ts-expect-error ts-error
    const $loadIndicator = new LoadIndicator($('<div>')).$element();
    this._$reachBottomText = $('<div>').addClass(SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
    this._updateReachBottomText();
    this._$reachBottom.append($loadContainer.append($loadIndicator)).append(this._$reachBottomText);
    this._$bottomPocket.append(this._$reachBottom);
    this._$content.append(this._$bottomPocket);
  }
  _initLoadPanel() {
    const $loadPanelElement = $('<div>').addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
    const {
      refreshingText
    } = this.option();
    this._loadPanel = this._createComponent($loadPanelElement, LoadPanel, {
      shading: false,
      delay: 400,
      message: refreshingText,
      position: {
        // @ts-expect-error ts-error
        of: this.$element()
      }
    });
  }
  _updateReachBottomText() {
    const {
      reachBottomText
    } = this.option();
    // @ts-expect-error ts-error
    this._$reachBottomText.text(reachBottomText);
  }
  _createStrategy() {
    const {
      useNative,
      refreshStrategy
    } = this.option();
    const strategyName = useNative ? refreshStrategy : 'simulated';
    const strategyClass = refreshStrategies[strategyName];
    // @ts-expect-error ts-error
    // eslint-disable-next-line new-cap
    this._strategy = new strategyClass(this);
    this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
    this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
    this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this));
  }
  _createActions() {
    super._createActions();
    this._pullDownAction = this._createActionByOption('onPullDown');
    this._reachBottomAction = this._createActionByOption('onReachBottom');
    this._tryRefreshPocketState();
  }
  _tryRefreshPocketState() {
    this._pullDownEnable(this.hasActionSubscription('onPullDown'));
    this._reachBottomEnable(this.hasActionSubscription('onReachBottom'));
  }
  on(eventName) {
    // @ts-expect-error ts-error
    const result = super.on.apply(this, arguments);
    if (eventName === 'pullDown' || eventName === 'reachBottom') {
      this._tryRefreshPocketState();
    }
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _pullDownEnable(enabled) {
    if (arguments.length === 0) {
      return this._pullDownEnabled;
    }
    if (this._$pullDown && this._strategy) {
      this._$pullDown.toggle(enabled);
      this._strategy.pullDownEnable(enabled);
      this._pullDownEnabled = enabled;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _reachBottomEnable(enabled) {
    if (arguments.length === 0) {
      return this._reachBottomEnabled;
    }
    if (this._$reachBottom && this._strategy) {
      this._$reachBottom.toggle(enabled);
      this._strategy.reachBottomEnable(enabled);
      this._reachBottomEnabled = enabled;
    }
  }
  _pullDownHandler() {
    this._loadingIndicator(false);
    this._pullDownLoading();
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _loadingIndicator(value) {
    if (arguments.length < 1) {
      return this._loadingIndicatorEnabled;
    }
    this._loadingIndicatorEnabled = value;
  }
  _pullDownLoading() {
    var _this$_pullDownAction;
    this.startLoading();
    (_this$_pullDownAction = this._pullDownAction) === null || _this$_pullDownAction === void 0 || _this$_pullDownAction.call(this);
  }
  _reachBottomHandler() {
    this._loadingIndicator(false);
    this._reachBottomLoading();
  }
  _reachBottomLoading() {
    var _this$_reachBottomAct;
    this.startLoading();
    (_this$_reachBottomAct = this._reachBottomAction) === null || _this$_reachBottomAct === void 0 || _this$_reachBottomAct.call(this);
  }
  _releaseHandler() {
    this.finishLoading();
    this._loadingIndicator(true);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onPullDown':
      case 'onReachBottom':
        this._createActions();
        break;
      case 'pullingDownText':
      case 'pulledDownText':
      case 'refreshingText':
      case 'refreshStrategy':
        this._invalidate();
        break;
      case 'reachBottomText':
        this._updateReachBottomText();
        break;
      default:
        super._optionChanged(args);
    }
  }
  content() {
    return getPublicElement(this._$content.children().eq(1));
  }
  release(preventReachBottom) {
    if (preventReachBottom !== undefined) {
      this.toggleLoading(!preventReachBottom);
    }
    return this._strategy.release();
  }
  toggleLoading(showOrHide) {
    this._reachBottomEnable(showOrHide);
  }
  refresh() {
    if (!this.hasActionSubscription('onPullDown')) {
      return;
    }
    this._strategy.pendingRelease();
    this._pullDownLoading();
  }
  startLoading() {
    if (this._loadingIndicator() && this.$element().is(':visible')) {
      this._loadPanel.show();
    }
    this._lock();
  }
  finishLoading() {
    this._loadPanel.hide();
    this._unlock();
  }
  isBottomReached() {
    return this._strategy.isBottomReached();
  }
  _dispose() {
    this._strategy.dispose();
    super._dispose();
    if (this._loadPanel) {
      this._loadPanel.$element().remove();
    }
  }
}
registerComponent('dxScrollView', isServerSide ? ScrollViewServerSide : ScrollView);
export default isServerSide ? ScrollViewServerSide : ScrollView;