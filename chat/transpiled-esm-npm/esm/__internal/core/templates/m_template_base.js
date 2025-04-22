import { triggerShownEvent } from '../../../common/core/events/visibility_change';
import domAdapter from '../../../core/dom_adapter';
import errors from '../../../core/errors';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
import { contains } from '../../../core/utils/dom';
export const renderedCallbacks = Callbacks({
  syncStrategy: true
});
export class TemplateBase {
  render(options) {
    options = options || {};
    const {
      onRendered
    } = options;
    delete options.onRendered;
    let $result;
    if (options.renovated && options.transclude && this._element) {
      $result = $('<div>').append(this._element).contents();
    } else {
      // @ts-expect-error need type overload
      $result = this._renderCore(options);
    }
    this._ensureResultInContainer($result, options.container);
    renderedCallbacks.fire($result, options.container);
    onRendered && onRendered();
    return $result;
  }
  _ensureResultInContainer($result, container) {
    if (!container) {
      return;
    }
    const $container = $(container);
    const resultInContainer = contains($container.get(0), $result.get(0));
    $container.append($result);
    if (resultInContainer) {
      return;
    }
    const resultInBody = contains(domAdapter.getBody(), $container.get(0));
    if (!resultInBody) {
      return;
    }
    triggerShownEvent($result);
  }
  _renderCore() {
    throw errors.Error('E0001');
  }
}