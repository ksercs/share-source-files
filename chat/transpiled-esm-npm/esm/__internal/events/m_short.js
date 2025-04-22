import eventsEngine from '../../common/core/events/core/events_engine';
import KeyboardProcessor from '../../common/core/events/core/keyboard_processor';
import { addNamespace as pureAddNamespace } from '../../common/core/events/utils/index';
function addNamespace(event, namespace) {
  return namespace ? pureAddNamespace(event, namespace) : event;
}
function executeAction(action, args) {
  return typeof action === 'function' ? action(args) : action.execute(args);
}
export const active = {
  on: ($el, active, inactive, opts) => {
    const {
      selector,
      showTimeout,
      hideTimeout,
      namespace
    } = opts;
    eventsEngine.on($el, addNamespace('dxactive', namespace), selector, {
      timeout: showTimeout
    },
    // @ts-expect-error
    event => executeAction(active, {
      event,
      element: event.currentTarget
    }));
    eventsEngine.on($el, addNamespace('dxinactive', namespace), selector, {
      timeout: hideTimeout
    },
    // @ts-expect-error
    event => executeAction(inactive, {
      event,
      element: event.currentTarget
    }));
  },
  off: ($el, _ref) => {
    let {
      namespace,
      selector
    } = _ref;
    eventsEngine.off($el, addNamespace('dxactive', namespace), selector);
    eventsEngine.off($el, addNamespace('dxinactive', namespace), selector);
  }
};
export const resize = {
  on: function ($el, resize) {
    let {
      namespace
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    eventsEngine.on($el, addNamespace('dxresize', namespace), resize);
  },
  off: function ($el) {
    let {
      namespace
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    eventsEngine.off($el, addNamespace('dxresize', namespace));
  }
};
export const hover = {
  on: ($el, start, end, _ref2) => {
    let {
      selector,
      namespace
    } = _ref2;
    eventsEngine.on($el, addNamespace('dxhoverend', namespace), selector, event => end(event));
    eventsEngine.on($el, addNamespace('dxhoverstart', namespace), selector, event => executeAction(start, {
      element: event.target,
      event
    }));
  },
  off: ($el, _ref3) => {
    let {
      selector,
      namespace
    } = _ref3;
    eventsEngine.off($el, addNamespace('dxhoverstart', namespace), selector);
    eventsEngine.off($el, addNamespace('dxhoverend', namespace), selector);
  }
};
export const visibility = {
  on: ($el, shown, hiding, _ref4) => {
    let {
      namespace
    } = _ref4;
    eventsEngine.on($el, addNamespace('dxhiding', namespace), hiding);
    eventsEngine.on($el, addNamespace('dxshown', namespace), shown);
  },
  off: ($el, _ref5) => {
    let {
      namespace
    } = _ref5;
    eventsEngine.off($el, addNamespace('dxhiding', namespace));
    eventsEngine.off($el, addNamespace('dxshown', namespace));
  }
};
export const focus = {
  on: ($el, focusIn, focusOut, _ref6) => {
    let {
      namespace
    } = _ref6;
    eventsEngine.on($el, addNamespace('focusin', namespace), focusIn);
    eventsEngine.on($el, addNamespace('focusout', namespace), focusOut);
  },
  off: ($el, _ref7) => {
    let {
      namespace
    } = _ref7;
    eventsEngine.off($el, addNamespace('focusin', namespace));
    eventsEngine.off($el, addNamespace('focusout', namespace));
  },
  // @ts-expect-error
  trigger: $el => eventsEngine.trigger($el, 'focus')
};
export const dxClick = {
  on: function ($el, click) {
    let {
      namespace
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    eventsEngine.on($el, addNamespace('dxclick', namespace), click);
  },
  off: function ($el) {
    let {
      namespace
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    eventsEngine.off($el, addNamespace('dxclick', namespace));
  }
};
export const click = {
  on: function ($el, click) {
    let {
      namespace
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    eventsEngine.on($el, addNamespace('click', namespace), click);
  },
  off: function ($el) {
    let {
      namespace
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    eventsEngine.off($el, addNamespace('click', namespace));
  }
};
let index = 0;
const keyboardProcessors = {};
const generateListenerId = () => `keyboardProcessorId${index++}`;
export const keyboard = {
  on: (element, focusTarget, handler) => {
    const listenerId = generateListenerId();
    keyboardProcessors[listenerId] = new KeyboardProcessor({
      element,
      focusTarget,
      handler
    });
    return listenerId;
  },
  off: listenerId => {
    if (listenerId && keyboardProcessors[listenerId]) {
      keyboardProcessors[listenerId].dispose();
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete keyboardProcessors[listenerId];
    }
  },
  // NOTE: For tests
  _getProcessor: listenerId => keyboardProcessors[listenerId]
};