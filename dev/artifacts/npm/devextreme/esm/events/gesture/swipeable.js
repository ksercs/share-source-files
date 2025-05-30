/**
* DevExtreme (esm/events/gesture/swipeable.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { start as swipeEventStart, swipe as swipeEventSwipe, end as swipeEventEnd } from '../swipe';
import eventsEngine from '../../events/core/events_engine';
import DOMComponent from '../../core/dom_component';
import { each } from '../../core/utils/iterator';
import { addNamespace } from '../utils/index';
import { extend } from '../../core/utils/extend';
import { name } from '../../core/utils/public_component';
var DX_SWIPEABLE = 'dxSwipeable';
var SWIPEABLE_CLASS = 'dx-swipeable';
var ACTION_TO_EVENT_MAP = {
  'onStart': swipeEventStart,
  'onUpdated': swipeEventSwipe,
  'onEnd': swipeEventEnd,
  'onCancel': 'dxswipecancel'
};
var IMMEDIATE_TIMEOUT = 180;
var Swipeable = DOMComponent.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
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
  },
  _render: function _render() {
    this.callBase();
    this.$element().addClass(SWIPEABLE_CLASS);
    this._attachEventHandlers();
  },
  _attachEventHandlers: function _attachEventHandlers() {
    this._detachEventHandlers();
    if (this.option('disabled')) {
      return;
    }
    var NAME = this.NAME;
    this._createEventData();
    each(ACTION_TO_EVENT_MAP, function (actionName, eventName) {
      var action = this._createActionByOption(actionName, {
        context: this
      });
      eventName = addNamespace(eventName, NAME);
      eventsEngine.on(this.$element(), eventName, this._eventData, function (e) {
        return action({
          event: e
        });
      });
    }.bind(this));
  },
  _createEventData: function _createEventData() {
    this._eventData = {
      elastic: this.option('elastic'),
      itemSizeFunc: this.option('itemSizeFunc'),
      direction: this.option('direction'),
      immediate: this.option('immediate'),
      immediateTimeout: this.option('immediateTimeout')
    };
  },
  _detachEventHandlers: function _detachEventHandlers() {
    eventsEngine.off(this.$element(), '.' + DX_SWIPEABLE);
  },
  _optionChanged: function _optionChanged(args) {
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
        this.callBase(args);
    }
  },
  _useTemplates: function _useTemplates() {
    return false;
  }
});
name(Swipeable, DX_SWIPEABLE);
export default Swipeable;
