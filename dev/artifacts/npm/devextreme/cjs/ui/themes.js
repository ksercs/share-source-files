/**
* DevExtreme (cjs/ui/themes.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.attachCssClasses = attachCssClasses;
exports.current = current;
exports.default = void 0;
exports.detachCssClasses = detachCssClasses;
exports.init = init;
exports.initialized = initialized;
exports.isCompact = isCompact;
exports.isDark = isDark;
exports.isGeneric = isGeneric;
exports.isMaterial = isMaterial;
exports.isPendingThemeLoaded = isPendingThemeLoaded;
exports.isWebFontLoaded = isWebFontLoaded;
exports.ready = themeReady;
exports.resetTheme = resetTheme;
exports.setDefaultTimeout = setDefaultTimeout;
exports.waitForThemeLoad = waitForThemeLoad;
exports.waitWebFont = waitWebFont;
var _size = require("../core/utils/size");
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _deferred = require("../core/utils/deferred");
var _html_parser = require("../core/utils/html_parser");
var _iterator = require("../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../core/utils/ready_callbacks"));
var _view_port = require("../core/utils/view_port");
var _window = require("../core/utils/window");
var _themes_callback = require("./themes_callback");
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
var ready = _ready_callbacks.default.add;
var viewPort = _view_port.value;
var viewPortChanged = _view_port.changeCallback;
var initDeferred = new _deferred.Deferred();
var DX_LINK_SELECTOR = 'link[rel=dx-theme]';
var THEME_ATTR = 'data-theme';
var ACTIVE_ATTR = 'data-active';
var DX_HAIRLINES_CLASS = 'dx-hairlines';
var ANY_THEME = 'any';
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15000;
var THEME_MARKER_PREFIX = 'dx.';
function readThemeMarker() {
  if (!(0, _window.hasWindow)()) {
    return null;
  }
  var element = (0, _renderer.default)('<div>', context).addClass('dx-theme-marker').appendTo(context.documentElement);
  var result;
  try {
    result = window.getComputedStyle(element.get(0))['fontFamily'];
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, '');
    if (result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {
      return null;
    }
    return result.substr(THEME_MARKER_PREFIX.length);
  } finally {
    element.remove();
  }
}

// FYI
// http://stackoverflow.com/q/2635814
// http://stackoverflow.com/a/3078636
function waitForThemeLoad(themeName) {
  var waitStartTime;
  var timerId;
  var intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    _themes_callback.themeReadyCallback.fire();
    _themes_callback.themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval(function () {
      var isLoaded = isPendingThemeLoaded();
      var isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        _ui.default.log('W0004', pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }, 10);
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  var anyThemePending = pendingThemeName === ANY_THEME;
  if (initDeferred.state() === 'resolved' && anyThemePending) {
    return true;
  }
  var themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function processMarkup() {
  var $allThemeLinks = (0, _renderer.default)(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = (0, _renderer.default)((0, _html_parser.parseHTML)('<link rel=stylesheet>'), context);
  $allThemeLinks.each(function () {
    var link = (0, _renderer.default)(this, context);
    var fullThemeName = link.attr(THEME_ATTR);
    var url = link.attr('href');
    var isActive = link.attr(ACTIVE_ATTR) === 'true';
    knownThemes[fullThemeName] = {
      url: url,
      isActive: isActive
    };
  });
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  var desiredThemeParts = desiredThemeName ? desiredThemeName.split('.') : [];
  var result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    (0, _iterator.each)(knownThemes, function (knownThemeName, themeData) {
      var knownThemeParts = knownThemeName.split('.');
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    });
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    // Cross-origin permission error
    knownThemes = null;
  }
  context = newContext;
}
function init(options) {
  options = options || {};
  initContext(options.context || _dom_adapter.default.getDocument());
  if (!context) return;
  processMarkup();
  currentThemeName = undefined;
  current(options);
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if (typeof options === 'string') {
    options = {
      theme: options
    };
  }
  var isAutoInit = options._autoInit;
  var loadCallback = options.loadCallback;
  var currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    _themes_callback.themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr('href', knownThemes[currentThemeName].url);
    if (_themes_callback.themeReadyCallback.has() || initDeferred.state() !== 'resolved' || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else {
    if (isAutoInit) {
      if ((0, _window.hasWindow)()) {
        waitForThemeLoad(ANY_THEME);
      }
      _themes_callback.themeReadyCallback.fire();
      _themes_callback.themeReadyCallback.empty();
    } else {
      throw _ui.default.Error('E0021', currentThemeName);
    }
  }
  initDeferred.done(function () {
    return attachCssClasses((0, _view_port.originalViewPort)(), currentThemeName);
  });
}
function getCssClasses(themeName) {
  themeName = themeName || current();
  var result = [];
  var themeNameParts = themeName && themeName.split('.');
  if (themeNameParts) {
    result.push('dx-theme-' + themeNameParts[0], 'dx-theme-' + themeNameParts[0] + '-typography');
    if (themeNameParts.length > 1) {
      result.push('dx-color-scheme-' + themeNameParts[1] + (isMaterial(themeName) ? '-' + themeNameParts[2] : ''));
    }
  }
  return result;
}
var themeClasses;
function attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(' ');
  (0, _renderer.default)(element).addClass(themeClasses);
  var activateHairlines = function activateHairlines() {
    var pixelRatio = (0, _window.hasWindow)() && window.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    var $tester = (0, _renderer.default)('<div>');
    $tester.css('border', '.5px solid transparent');
    (0, _renderer.default)('body').append($tester);
    if ((0, _size.getOuterHeight)($tester) === 1) {
      (0, _renderer.default)(element).addClass(DX_HAIRLINES_CLASS);
      themeClasses += ' ' + DX_HAIRLINES_CLASS;
    }
    $tester.remove();
  };
  activateHairlines();
}
function detachCssClasses(element) {
  (0, _renderer.default)(element).removeClass(themeClasses);
}
function themeReady(callback) {
  _themes_callback.themeReadyCallback.add(callback);
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterial(themeName) {
  return isTheme('material', themeName);
}
function isGeneric(themeName) {
  return isTheme('generic', themeName);
}
function isDark(themeName) {
  return isTheme('dark', themeName);
}
function isCompact(themeName) {
  return isTheme('compact', themeName);
}
function isWebFontLoaded(text, fontWeight) {
  var testedFont = 'Roboto, RobotoFallback, Arial';
  var etalonFont = 'Arial';
  var document = _dom_adapter.default.getDocument();
  var testElement = document.createElement('span');
  testElement.style.position = 'absolute';
  testElement.style.top = '-9999px';
  testElement.style.left = '-9999px';
  testElement.style.visibility = 'hidden';
  testElement.style.fontFamily = etalonFont;
  testElement.style.fontSize = '250px';
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document.body.appendChild(testElement);
  var etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = testedFont;
  var testedFontWidth = testElement.offsetWidth;
  testElement.parentNode.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  var interval = 15;
  var timeout = 2000;
  return new Promise(function (resolve) {
    var check = function check() {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    };
    var clear = function clear() {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    var intervalId = setInterval(check, interval);
    var timeoutId = setTimeout(clear, timeout);
  });
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if ((0, _renderer.default)(DX_LINK_SELECTOR, context).length) {
    throw _ui.default.Error('E0022');
  }
}
if ((0, _window.hasWindow)()) {
  autoInit();
} else {
  ready(autoInit);
}
viewPortChanged.add(function (viewPort, prevViewPort) {
  initDeferred.done(function () {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort);
  });
});
_devices.default.changed.add(function () {
  init({
    _autoInit: true
  });
});
function resetTheme() {
  $activeThemeLink && $activeThemeLink.attr('href', 'about:blank');
  currentThemeName = null;
  pendingThemeName = null;
  initDeferred = new _deferred.Deferred();
}
function initialized(callback) {
  initDeferred.done(callback);
}
function setDefaultTimeout(timeout) {
  defaultTimeout = timeout;
}

/**
 * Added default export according to our documentation
 * https://js.devexpress.com/Documentation/ApiReference/Common/Utils/ui/themes/
 * */
var _default = {
  setDefaultTimeout,
  initialized,
  resetTheme,
  ready: themeReady,
  waitWebFont,
  isWebFontLoaded,
  isCompact,
  isDark,
  isGeneric,
  isMaterial,
  detachCssClasses,
  attachCssClasses,
  current,
  waitForThemeLoad,
  isPendingThemeLoaded
};
exports.default = _default;
