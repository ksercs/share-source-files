import $ from '../../core/renderer';
import { Deferred } from '../../core/utils/deferred';
import { value as viewPort } from '../../core/utils/view_port';
import LoadPanel from '../../ui/load_panel';
let loading = null;
const createLoadPanel = function (options) {
  return new LoadPanel($('<div>').appendTo(options && options.container || viewPort()), options);
};
const removeLoadPanel = function () {
  if (!loading) {
    return;
  }
  loading.$element().remove();
  loading = null;
};
export function show(options) {
  removeLoadPanel();
  loading = createLoadPanel(options);
  return loading.show();
}
export function hide() {
  // hot fix for case without viewport
  if (!loading) {
    // @ts-expect-error
    return new Deferred().resolve();
  }
  return loading.hide().done(removeLoadPanel).promise();
}