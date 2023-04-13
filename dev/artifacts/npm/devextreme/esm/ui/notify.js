/**
* DevExtreme (esm/ui/notify.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../core/renderer';
import { value as viewPort } from '../core/utils/view_port';
import { extend } from '../core/utils/extend';
import { isPlainObject, isString } from '../core/utils/type';
import { getWindow } from '../core/utils/window';
import Toast from './toast';
var window = getWindow();
var $notify = null;
var $containers = {};
function notify(message, /* optional */typeOrStack, displayTime) {
  var options = isPlainObject(message) ? message : {
    message: message
  };
  var stack = isPlainObject(typeOrStack) ? typeOrStack : undefined;
  var type = isPlainObject(typeOrStack) ? undefined : typeOrStack;
  var {
    onHidden: userOnHidden
  } = options;
  if (stack !== null && stack !== void 0 && stack.position) {
    var {
      position
    } = stack;
    var direction = stack.direction || getDefaultDirection(position);
    var containerKey = isString(position) ? position : "".concat(position.top, "-").concat(position.left, "-").concat(position.bottom, "-").concat(position.right);
    var {
      onShowing: userOnShowing
    } = options;
    var $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);
    extend(options, {
      container: $container,
      onShowing: function onShowing(args) {
        setContainerStyles($container, direction, position);
        userOnShowing === null || userOnShowing === void 0 ? void 0 : userOnShowing(args);
      }
    });
  }
  extend(options, {
    type: type,
    displayTime: displayTime,
    onHidden: function onHidden(args) {
      $(args.element).remove();
      userOnHidden === null || userOnHidden === void 0 ? void 0 : userOnHidden(args);
    }
  });
  $notify = $('<div>').appendTo(viewPort());
  new Toast($notify, options).show();
}
var getDefaultDirection = position => {
  return isString(position) && position.includes('top') ? 'down-push' : 'up-push';
};
var createStackContainer = key => {
  var $container = $('<div>').appendTo(viewPort());
  $containers[key] = $container;
  return $container;
};
var getStackContainer = key => {
  var $container = $containers[key];
  return $container ? $container : createStackContainer(key);
};
var setContainerClasses = (container, direction) => {
  var containerClasses = "dx-toast-stack dx-toast-stack-".concat(direction, "-direction");
  container.removeAttr('class').addClass(containerClasses);
};
var setContainerStyles = (container, direction, position) => {
  var {
    offsetWidth: toastWidth,
    offsetHeight: toastHeight
  } = container.children().first().get(0);
  var dimensions = {
    toastWidth,
    toastHeight,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
  var coordinates = isString(position) ? getCoordinatesByAlias(position, dimensions) : position;
  var styles = getPositionStylesByCoordinates(direction, coordinates, dimensions);
  container.css(styles);
};
var getCoordinatesByAlias = (alias, _ref) => {
  var {
    toastWidth,
    toastHeight,
    windowHeight,
    windowWidth
  } = _ref;
  switch (alias) {
    case 'top left':
      return {
        top: 10,
        left: 10
      };
    case 'top right':
      return {
        top: 10,
        right: 10
      };
    case 'bottom left':
      return {
        bottom: 10,
        left: 10
      };
    case 'bottom right':
      return {
        bottom: 10,
        right: 10
      };
    case 'top center':
      return {
        top: 10,
        left: Math.round(windowWidth / 2 - toastWidth / 2)
      };
    case 'left center':
      return {
        top: Math.round(windowHeight / 2 - toastHeight / 2),
        left: 10
      };
    case 'right center':
      return {
        top: Math.round(windowHeight / 2 - toastHeight / 2),
        right: 10
      };
    case 'center':
      return {
        top: Math.round(windowHeight / 2 - toastHeight / 2),
        left: Math.round(windowWidth / 2 - toastWidth / 2)
      };
    case 'bottom center':
    default:
      return {
        bottom: 10,
        left: Math.round(windowWidth / 2 - toastWidth / 2)
      };
  }
};
var getPositionStylesByCoordinates = (direction, coordinates, dimensions) => {
  var _coordinates$bottom, _coordinates$left, _coordinates$right, _coordinates$top, _coordinates$left2, _coordinates$right2, _coordinates$right3, _coordinates$top2, _coordinates$bottom2, _coordinates$left3, _coordinates$top3, _coordinates$bottom3;
  var {
    toastWidth,
    toastHeight,
    windowHeight,
    windowWidth
  } = dimensions;
  switch (direction.replace(/-push|-stack/g, '')) {
    case 'up':
      return {
        bottom: (_coordinates$bottom = coordinates.bottom) !== null && _coordinates$bottom !== void 0 ? _coordinates$bottom : windowHeight - toastHeight - coordinates.top,
        top: '',
        left: (_coordinates$left = coordinates.left) !== null && _coordinates$left !== void 0 ? _coordinates$left : '',
        right: (_coordinates$right = coordinates.right) !== null && _coordinates$right !== void 0 ? _coordinates$right : ''
      };
    case 'down':
      return {
        top: (_coordinates$top = coordinates.top) !== null && _coordinates$top !== void 0 ? _coordinates$top : windowHeight - toastHeight - coordinates.bottom,
        bottom: '',
        left: (_coordinates$left2 = coordinates.left) !== null && _coordinates$left2 !== void 0 ? _coordinates$left2 : '',
        right: (_coordinates$right2 = coordinates.right) !== null && _coordinates$right2 !== void 0 ? _coordinates$right2 : ''
      };
    case 'left':
      return {
        right: (_coordinates$right3 = coordinates.right) !== null && _coordinates$right3 !== void 0 ? _coordinates$right3 : windowWidth - toastWidth - coordinates.left,
        left: '',
        top: (_coordinates$top2 = coordinates.top) !== null && _coordinates$top2 !== void 0 ? _coordinates$top2 : '',
        bottom: (_coordinates$bottom2 = coordinates.bottom) !== null && _coordinates$bottom2 !== void 0 ? _coordinates$bottom2 : ''
      };
    case 'right':
      return {
        left: (_coordinates$left3 = coordinates.left) !== null && _coordinates$left3 !== void 0 ? _coordinates$left3 : windowWidth - toastWidth - coordinates.right,
        right: '',
        top: (_coordinates$top3 = coordinates.top) !== null && _coordinates$top3 !== void 0 ? _coordinates$top3 : '',
        bottom: (_coordinates$bottom3 = coordinates.bottom) !== null && _coordinates$bottom3 !== void 0 ? _coordinates$bottom3 : ''
      };
  }
};
export default notify;
