/**
* DevExtreme (esm/events/utils/event_nodes_disposing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../core/events_engine';
import { removeEvent } from '../remove';
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(node => !!node);
}
export var subscribeNodesDisposing = (event, callback) => {
  eventsEngine.one(nodesByEvent(event), removeEvent, callback);
};
export var unsubscribeNodesDisposing = (event, callback) => {
  eventsEngine.off(nodesByEvent(event), removeEvent, callback);
};
