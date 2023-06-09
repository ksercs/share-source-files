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