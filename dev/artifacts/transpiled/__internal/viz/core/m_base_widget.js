"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _dom_component = _interopRequireDefault(require("../../../core/dom_component"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type2 = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _base_theme_manager = require("../../../viz/core/base_theme_manager");
var _base_widget = require("../../../viz/core/base_widget.utils");
var _errors_warnings = _interopRequireDefault(require("../../../viz/core/errors_warnings"));
var _helpers = require("../../../viz/core/helpers");
var _layout = _interopRequireDefault(require("../../../viz/core/layout"));
var _renderer2 = require("../../../viz/core/renderers/renderer");
var _utils = require("../../../viz/core/utils");
var _m_charts = _interopRequireDefault(require("../../common/m_charts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var floor = Math.floor;
var log = _errors_warnings.default.log;
var SIZE_CHANGING_THRESHOLD = 1;
var OPTION_RTL_ENABLED = 'rtlEnabled';
var SIZED_ELEMENT_CLASS = 'dx-sized-element';
var baseOptionMethod = _dom_component.default.prototype.option;
function getTrue() {
  return true;
}
function getFalse() {
  return false;
}
function areCanvasesDifferent(canvas1, canvas2) {
  var sizeLessThreshold = ['width', 'height'].every(function (key) {
    return Math.abs(canvas1[key] - canvas2[key]) < SIZE_CHANGING_THRESHOLD;
  });
  var canvasCoordsIsEqual = ['left', 'right', 'top', 'bottom'].every(function (key) {
    return canvas1[key] === canvas2[key];
  });
  return !(sizeLessThreshold && canvasCoordsIsEqual);
}
function defaultOnIncidentOccurred(e) {
  if (!e.component._eventsStrategy.hasEvent('incidentOccurred')) {
    log.apply(null, [e.target.id].concat(e.target.args || []));
  }
}
function pickPositiveValue(values) {
  return values.reduce(function (result, value) {
    return value > 0 && !result ? value : result;
  }, 0);
}
// TODO - Changes handling
// * Provide more validation - something like
//     _changes: [{
//         code: "THEME",
//         options: ["theme"],
//         type: "option",
//         handler: function () {
//             this._setThemeAndRtl();
//         }
//     }, {
//         code: "CONTAINER_SIZE",
//         options: ["size", "option"],
//         type: "layout",
//         handler: function () {
//             this._updateSize();
//         }
//     }]
var getEmptyComponent = function getEmptyComponent() {
  var emptyComponentConfig = {
    _initTemplates() {},
    ctor(element, options) {
      this.callBase(element, options);
      var sizedElement = _dom_adapter.default.createElement('div');
      var width = options && (0, _type2.isNumeric)(options.width) ? "".concat(options.width, "px") : '100%';
      var height = options && (0, _type2.isNumeric)(options.height) ? "".concat(options.height, "px") : "".concat(this._getDefaultSize().height, "px");
      _dom_adapter.default.setStyle(sizedElement, 'width', width);
      _dom_adapter.default.setStyle(sizedElement, 'height', height);
      _dom_adapter.default.setClass(sizedElement, SIZED_ELEMENT_CLASS, false);
      _dom_adapter.default.insertElement(element, sizedElement);
    }
  };
  var EmptyComponent = _dom_component.default.inherit(emptyComponentConfig);
  var originalInherit = EmptyComponent.inherit;
  EmptyComponent.inherit = function (config) {
    Object.keys(config).forEach(function (field) {
      if ((0, _type2.isFunction)(config[field]) && field.substr(0, 1) !== '_' && field !== 'option' || field === '_dispose' || field === '_optionChanged') {
        config[field] = _common.noop;
      }
    });
    return originalInherit.call(this, config);
  };
  return EmptyComponent;
};
function callForEach(functions) {
  functions.forEach(function (c) {
    return c();
  });
}
function floorCanvasDimensions(canvas) {
  return _extends(_extends({}, canvas), {
    height: floor(canvas.height),
    width: floor(canvas.width)
  });
}
var isServerSide = !(0, _window.hasWindow)();
function sizeIsValid(value) {
  return (0, _type2.isDefined)(value) && value > 0;
}
var baseWidget = isServerSide ? getEmptyComponent() : _dom_component.default.inherit({
  _eventsMap: {
    onIncidentOccurred: {
      name: 'incidentOccurred',
      actionSettings: {
        excludeValidators: ['disabled']
      }
    },
    onDrawn: {
      name: 'drawn',
      actionSettings: {
        excludeValidators: ['disabled']
      }
    }
  },
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      onIncidentOccurred: defaultOnIncidentOccurred
    });
  },
  _useLinks: true,
  _init() {
    var _this = this;
    this._$element.children(".".concat(SIZED_ELEMENT_CLASS)).remove();
    this._graphicObjects = {};
    this.callBase.apply(this, arguments);
    this._changesLocker = 0;
    this._optionChangedLocker = 0;
    this._asyncFirstDrawing = true;
    this._changes = (0, _helpers.changes)();
    this._suspendChanges();
    this._themeManager = this._createThemeManager();
    this._themeManager.setCallback(function () {
      _this._requestChange(_this._themeDependentChanges);
    });
    this._renderElementAttributes();
    this._initRenderer();
    // Shouldn't "_useLinks" be passed to the renderer instead of doing 3 checks here?
    var useLinks = this._useLinks;
    // There is an implicit relation between `_useLinks` and `loading indicator` - it uses links
    // Though this relation is not ensured in code
    // we will immediately know when it is broken - `loading indicator` will break on construction
    if (useLinks) {
      this._renderer.root.enableLinks().virtualLink('core').virtualLink('peripheral');
    }
    this._renderVisibilityChange();
    this._attachVisibilityChangeHandlers();
    this._toggleParentsScrollSubscription(this._isVisible());
    this._initEventTrigger();
    this._incidentOccurred = (0, _base_widget.createIncidentOccurred)(this.NAME, this._eventTrigger);
    this._layout = new _layout.default();
    // Such solution is used only to avoid writing lots of "after"
    // for all core elements in all widgets
    // May be later a proper solution would be found
    if (useLinks) {
      this._renderer.root.linkAfter('core');
    }
    this._initPlugins();
    this._initCore();
    if (useLinks) {
      this._renderer.root.linkAfter();
    }
    this._change(this._initialChanges);
  },
  _createThemeManager() {
    return new _base_theme_manager.BaseThemeManager(this._getThemeManagerOptions());
  },
  _getThemeManagerOptions() {
    return {
      themeSection: this._themeSection,
      fontFields: this._fontFields
    };
  },
  _initialChanges: ['LAYOUT', 'RESIZE_HANDLER', 'THEME', 'DISABLED'],
  _initPlugins() {
    var _this2 = this;
    (0, _iterator.each)(this._plugins, function (_, plugin) {
      plugin.init.call(_this2);
    });
  },
  _disposePlugins() {
    var _this3 = this;
    (0, _iterator.each)(this._plugins.slice().reverse(), function (_, plugin) {
      plugin.dispose.call(_this3);
    });
  },
  _change(codes) {
    this._changes.add(codes);
  },
  _suspendChanges() {
    this._changesLocker += 1;
  },
  _resumeChanges() {
    if (--this._changesLocker === 0 && this._changes.count() > 0 && !this._applyingChanges) {
      this._renderer.lock();
      this._applyingChanges = true;
      this._applyChanges();
      this._changes.reset();
      this._applyingChanges = false;
      this._changesApplied();
      this._renderer.unlock();
      if (this._optionsQueue) {
        this._applyQueuedOptions();
      }
      this.resolveItemsDeferred(this._legend ? [this._legend] : []);
      this._optionChangedLocker += 1;
      this._notify();
      this._optionChangedLocker -= 1;
    }
  },
  resolveItemsDeferred(items) {
    this._resolveDeferred(this._getTemplatesItems(items));
  },
  _collectTemplatesFromItems(items) {
    return items.reduce(function (prev, i) {
      return {
        items: prev.items.concat(i.getTemplatesDef()),
        groups: prev.groups.concat(i.getTemplatesGroups())
      };
    }, {
      items: [],
      groups: []
    });
  },
  _getTemplatesItems(items) {
    var elements = this._collectTemplatesFromItems(items);
    var extraItems = this._getExtraTemplatesItems();
    return {
      items: extraItems.items.concat(elements.items),
      groups: extraItems.groups.concat(elements.groups),
      launchRequest: [extraItems.launchRequest],
      doneRequest: [extraItems.doneRequest]
    };
  },
  _getExtraTemplatesItems() {
    return {
      items: [],
      groups: [],
      launchRequest: function launchRequest() {},
      doneRequest: function doneRequest() {}
    };
  },
  _resolveDeferred(_ref) {
    var _this4 = this;
    var items = _ref.items,
      launchRequest = _ref.launchRequest,
      doneRequest = _ref.doneRequest,
      groups = _ref.groups;
    this._setGroupsVisibility(groups, 'hidden');
    if (this._changesApplying) {
      this._changesApplying = false;
      callForEach(doneRequest);
      return;
    }
    var syncRendering = true;
    _deferred.when.apply(this, items).done(function () {
      if (syncRendering) {
        _this4._setGroupsVisibility(groups, 'visible');
        return;
      }
      callForEach(launchRequest);
      _this4._changesApplying = true;
      var changes = ['LAYOUT', 'FULL_RENDER'];
      if (_this4._asyncFirstDrawing) {
        changes.push('FORCE_FIRST_DRAWING');
        _this4._asyncFirstDrawing = false;
      } else {
        changes.push('FORCE_DRAWING');
      }
      _this4._requestChange(changes);
      _this4._setGroupsVisibility(groups, 'visible');
    });
    syncRendering = false;
  },
  _setGroupsVisibility(groups, visibility) {
    groups.forEach(function (g) {
      return g.attr({
        visibility
      });
    });
  },
  _applyQueuedOptions() {
    var queue = this._optionsQueue;
    this._optionsQueue = null;
    this.beginUpdate();
    (0, _iterator.each)(queue, function (_, action) {
      action();
    });
    this.endUpdate();
  },
  _requestChange(codes) {
    this._suspendChanges();
    this._change(codes);
    this._resumeChanges();
  },
  _applyChanges() {
    var changes = this._changes;
    var order = this._totalChangesOrder;
    var changesOrderLength = order.length;
    for (var i = 0; i < changesOrderLength; i += 1) {
      if (changes.has(order[i])) {
        this["_change_".concat(order[i])]();
      }
    }
  },
  _optionChangesOrder: ['EVENTS', 'THEME', 'RENDERER', 'RESIZE_HANDLER'],
  _layoutChangesOrder: ['ELEMENT_ATTR', 'CONTAINER_SIZE', 'LAYOUT'],
  _customChangesOrder: ['DISABLED'],
  _change_EVENTS() {
    this._eventTrigger.applyChanges();
  },
  _change_THEME() {
    this._setThemeAndRtl();
  },
  _change_RENDERER() {
    this._setRendererOptions();
  },
  _change_RESIZE_HANDLER() {
    this._setupResizeHandler();
  },
  _change_ELEMENT_ATTR() {
    this._renderElementAttributes();
    this._change(['CONTAINER_SIZE']);
  },
  _change_CONTAINER_SIZE() {
    this._updateSize();
  },
  _change_LAYOUT() {
    this._setContentSize();
  },
  _change_DISABLED() {
    var renderer = this._renderer;
    var root = renderer.root;
    if (this.option('disabled')) {
      this._initDisabledState = root.attr('pointer-events');
      root.attr({
        'pointer-events': 'none',
        filter: renderer.getGrayScaleFilter().id
      });
    } else if (root.attr('pointer-events') === 'none') {
      root.attr({
        'pointer-events': (0, _type2.isDefined)(this._initDisabledState) ? this._initDisabledState : null,
        filter: null
      });
    }
  },
  _themeDependentChanges: ['RENDERER'],
  _initRenderer() {
    // Canvas is calculated before the renderer is created in order to capture actual
    // size of the container
    var rawCanvas = this._calculateRawCanvas();
    this._canvas = floorCanvasDimensions(rawCanvas);
    this._renderer = new _renderer2.Renderer({
      cssClass: "".concat(this._rootClassPrefix, " ").concat(this._rootClass),
      pathModified: this.option('pathModified'),
      container: this._$element[0]
    });
    this._renderer.resize(this._canvas.width, this._canvas.height);
  },
  _disposeRenderer() {
    /// #DEBUG
    // NOTE: This is temporary - until links mechanism is stabilized
    this._useLinks && this._renderer.root.checkLinks();
    /// #ENDDEBUG
    this._renderer.dispose();
  },
  _disposeGraphicObjects() {
    var _this5 = this;
    Object.keys(this._graphicObjects).forEach(function (id) {
      _this5._graphicObjects[id].dispose();
    });
    this._graphicObjects = null;
  },
  _getAnimationOptions: _common.noop,
  render() {
    this._requestChange(['CONTAINER_SIZE']);
    var visible = this._isVisible();
    this._toggleParentsScrollSubscription(visible);
    !visible && this._stopCurrentHandling();
  },
  _toggleParentsScrollSubscription(subscribe) {
    var $parents = (0, _renderer.default)(this._renderer.root.element).parents();
    var scrollEvents = 'scroll.viz_widgets';
    if (_devices.default.real().platform === 'generic') {
      $parents = $parents.add((0, _window.getWindow)());
    }
    this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function () {
      this._stopCurrentHandling();
    }.bind(this);
    _events_engine.default.off((0, _renderer.default)('').add(this._$prevRootParents), scrollEvents, this._proxiedTargetParentsScrollHandler);
    if (subscribe) {
      _events_engine.default.on($parents, scrollEvents, this._proxiedTargetParentsScrollHandler);
      this._$prevRootParents = $parents;
    }
  },
  _stopCurrentHandling: _common.noop,
  _dispose() {
    if (this._disposed) {
      return;
    }
    this.callBase.apply(this, arguments);
    this._toggleParentsScrollSubscription(false);
    this._removeResizeHandler();
    this._layout.dispose();
    this._eventTrigger.dispose();
    this._disposeCore();
    this._disposePlugins();
    this._disposeGraphicObjects();
    this._disposeRenderer();
    this._themeManager.dispose();
    this._themeManager = null;
    this._renderer = null;
    this._eventTrigger = null;
  },
  _initEventTrigger() {
    var _this6 = this;
    var callback = function callback(name, actionSettings) {
      return _this6._createActionByOption(name, actionSettings);
    };
    this._eventTrigger = (0, _base_widget.createEventTrigger)(this._eventsMap, callback);
  },
  _calculateRawCanvas() {
    var _this7 = this;
    var size = this.option('size') || {};
    var margin = this.option('margin') || {};
    var defaultCanvas = this._getDefaultSize() || {};
    var getSizeOfSide = function getSizeOfSide(size, side, getter) {
      if (sizeIsValid(size[side]) || !(0, _window.hasWindow)()) {
        return 0;
      }
      var elementSize = getter(_this7._$element);
      return elementSize <= 1 ? 0 : elementSize;
    };
    var elementWidth = getSizeOfSide(size, 'width', function (x) {
      return (0, _size.getWidth)(x);
    });
    var elementHeight = getSizeOfSide(size, 'height', function (x) {
      return (0, _size.getHeight)(x);
    });
    var canvas = {
      width: size.width <= 0 ? 0 : pickPositiveValue([size.width, elementWidth, defaultCanvas.width]),
      height: size.height <= 0 ? 0 : pickPositiveValue([size.height, elementHeight, defaultCanvas.height]),
      left: pickPositiveValue([margin.left, defaultCanvas.left]),
      top: pickPositiveValue([margin.top, defaultCanvas.top]),
      right: pickPositiveValue([margin.right, defaultCanvas.right]),
      bottom: pickPositiveValue([margin.bottom, defaultCanvas.bottom])
    };
    // This for backward compatibility - widget was not rendered when canvas is empty.
    // Now it will be rendered but because of "width" and "height"
    // of the root both set to 0 it will not be visible.
    if (canvas.width - canvas.left - canvas.right <= 0 || canvas.height - canvas.top - canvas.bottom <= 0) {
      canvas = {
        width: 0,
        height: 0
      };
    }
    return canvas;
  },
  _updateSize() {
    var rawCanvas = this._calculateRawCanvas();
    if (areCanvasesDifferent(this._canvas, rawCanvas) || this.__forceRender /* for charts */) {
      this._canvas = floorCanvasDimensions(rawCanvas);
      this._recreateSizeDependentObjects(true);
      this._renderer.resize(this._canvas.width, this._canvas.height);
      this._change(['LAYOUT']);
    }
  },
  _recreateSizeDependentObjects: _common.noop,
  _getMinSize() {
    return [0, 0];
  },
  _getAlignmentRect: _common.noop,
  _setContentSize() {
    var canvas = this._canvas;
    var layout = this._layout;
    var rect = canvas.width > 0 && canvas.height > 0 ? [canvas.left, canvas.top, canvas.width - canvas.right, canvas.height - canvas.bottom] : [0, 0, 0, 0];
    rect = layout.forward(rect, this._getMinSize());
    var nextRect = this._applySize(rect) || rect;
    layout.backward(nextRect, this._getAlignmentRect() || nextRect);
  },
  /// #DEBUG
  DEBUG_getCanvas() {
    return this._canvas;
  },
  DEBUG_getEventTrigger() {
    return this._eventTrigger;
  },
  /// #ENDDEBUG
  _getOption(name, isScalar) {
    var theme = this._themeManager.theme(name);
    var option = this.option(name);
    return isScalar ? option !== undefined ? option : theme : (0, _extend.extend)(true, {}, theme, option);
  },
  _setupResizeHandler() {
    var _this8 = this;
    var redrawOnResize = (0, _utils.parseScalar)(this._getOption('redrawOnResize', true), true);
    if (this._disposeResizeHandler) {
      this._removeResizeHandler();
    }
    this._disposeResizeHandler = (0, _base_widget.createResizeHandler)(this._$element[0], redrawOnResize, function () {
      return _this8._requestChange(['CONTAINER_SIZE']);
    });
  },
  _removeResizeHandler() {
    if (this._disposeResizeHandler) {
      this._disposeResizeHandler();
      this._disposeResizeHandler = null;
    }
  },
  // This is actually added only to make loading indicator pluggable.
  // This is bad but much better than entire loading indicator in BaseWidget.
  _onBeginUpdate: _common.noop,
  beginUpdate() {
    // The "_initialized" flag is checked because
    // first time "beginUpdate" is called in the constructor.
    if (this._initialized && this._isUpdateAllowed()) {
      this._onBeginUpdate();
      this._suspendChanges();
    }
    this.callBase.apply(this, arguments);
    return this;
  },
  endUpdate() {
    this.callBase();
    this._isUpdateAllowed() && this._resumeChanges();
    return this;
  },
  option(name) {
    // NOTE: `undefined` has to be returned because base option setter returns `undefined`.
    // `argument.length` and `isObject` checks are copypaste from Component.
    if (this._initialized && this._applyingChanges && (arguments.length > 1 || (0, _type2.isObject)(name))) {
      this._optionsQueue = this._optionsQueue || [];
      this._optionsQueue.push(this._getActionForUpdating(arguments));
    } else {
      return baseOptionMethod.apply(this, arguments);
    }
  },
  _getActionForUpdating(args) {
    var _this9 = this;
    return function () {
      baseOptionMethod.apply(_this9, args);
    };
  },
  // For quite a long time the following method were abstract (from the Component perspective).
  // Now they are not but that basic functionality is not required here.
  _clean: _common.noop,
  _render: _common.noop,
  _optionChanged(arg) {
    var _this10 = this;
    if (this._optionChangedLocker) {
      return;
    }
    var partialChanges = this.getPartialChangeOptionsName(arg);
    var changes = [];
    if (partialChanges.length > 0) {
      partialChanges.forEach(function (pc) {
        return changes.push(_this10._partialOptionChangesMap[pc]);
      });
    } else {
      changes.push(this._optionChangesMap[arg.name]);
    }
    changes = changes.filter(function (c) {
      return !!c;
    });
    if (this._eventTrigger.change(arg.name)) {
      this._change(['EVENTS']);
    } else if (changes.length > 0) {
      this._change(changes);
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _notify: _common.noop,
  _changesApplied: _common.noop,
  _optionChangesMap: {
    size: 'CONTAINER_SIZE',
    margin: 'CONTAINER_SIZE',
    redrawOnResize: 'RESIZE_HANDLER',
    theme: 'THEME',
    rtlEnabled: 'THEME',
    encodeHtml: 'THEME',
    elementAttr: 'ELEMENT_ATTR',
    disabled: 'DISABLED'
  },
  _partialOptionChangesMap: {},
  _partialOptionChangesPath: {},
  getPartialChangeOptionsName(changedOption) {
    var _this11 = this;
    var fullName = changedOption.fullName;
    var sections = fullName.split(/[.]/);
    var name = changedOption.name;
    var value = changedOption.value;
    var options = this._partialOptionChangesPath[name];
    var partialChangeOptionsName = [];
    if (options) {
      if (options === true) {
        partialChangeOptionsName.push(name);
      } else {
        options.forEach(function (op) {
          fullName.indexOf(op) >= 0 && partialChangeOptionsName.push(op);
        });
        if (sections.length === 1) {
          if ((0, _type2.type)(value) === 'object') {
            this._addOptionsNameForPartialUpdate(value, options, partialChangeOptionsName);
          } else if ((0, _type2.type)(value) === 'array') {
            if (value.length > 0 && value.every(function (item) {
              return _this11._checkOptionsForPartialUpdate(item, options);
            })) {
              value.forEach(function (item) {
                _this11._addOptionsNameForPartialUpdate(item, options, partialChangeOptionsName);
              });
            }
          }
        }
      }
    }
    return partialChangeOptionsName.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  _checkOptionsForPartialUpdate(optionObject, options) {
    return !Object.keys(optionObject).some(function (key) {
      return options.indexOf(key) === -1;
    });
  },
  _addOptionsNameForPartialUpdate(optionObject, options, partialChangeOptionsName) {
    var optionKeys = Object.keys(optionObject);
    if (this._checkOptionsForPartialUpdate(optionObject, options)) {
      optionKeys.forEach(function (key) {
        return options.indexOf(key) > -1 && partialChangeOptionsName.push(key);
      });
    }
  },
  _visibilityChanged() {
    this.render();
  },
  _setThemeAndRtl() {
    this._themeManager.setTheme(this.option('theme'), this.option(OPTION_RTL_ENABLED));
  },
  _getRendererOptions() {
    return {
      rtl: this.option(OPTION_RTL_ENABLED),
      encodeHtml: this.option('encodeHtml'),
      animation: this._getAnimationOptions()
    };
  },
  _setRendererOptions() {
    this._renderer.setOptions(this._getRendererOptions());
  },
  svg() {
    return this._renderer.svg();
  },
  getSize() {
    var canvas = this._canvas || {};
    return {
      width: canvas.width,
      height: canvas.height
    };
  },
  isReady: getFalse,
  _dataIsReady: getTrue,
  _resetIsReady() {
    this.isReady = getFalse;
  },
  _renderGraphicObjects() {
    var _this12 = this;
    var renderer = this._renderer;
    var graphics = _m_charts.default.getGraphicObjects();
    Object.keys(graphics).forEach(function (id) {
      if (!_this12._graphicObjects[id]) {
        var _graphics$id = graphics[id],
          _type = _graphics$id.type,
          colors = _graphics$id.colors,
          rotationAngle = _graphics$id.rotationAngle,
          template = _graphics$id.template,
          width = _graphics$id.width,
          height = _graphics$id.height;
        switch (_type) {
          case 'linear':
            _this12._graphicObjects[id] = renderer.linearGradient(colors, id, rotationAngle);
            break;
          case 'radial':
            _this12._graphicObjects[id] = renderer.radialGradient(colors, id);
            break;
          case 'pattern':
            _this12._graphicObjects[id] = renderer.customPattern(id, _this12._getTemplate(template), width, height);
            break;
          default:
            break;
        }
      }
    });
  },
  _drawn() {
    var _this13 = this;
    this.isReady = getFalse;
    if (this._dataIsReady()) {
      this._renderer.onEndAnimation(function () {
        _this13.isReady = getTrue;
      });
    }
    this._eventTrigger('drawn', {});
  }
});
var _default = baseWidget;
exports.default = _default;
(0, _helpers.replaceInherit)(baseWidget);