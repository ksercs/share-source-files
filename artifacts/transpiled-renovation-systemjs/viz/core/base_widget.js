!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/base_widget.js"], ["../../core/renderer","../../core/utils/common","../../core/utils/window","../../core/dom_adapter","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../core/base_theme_manager","../../core/dom_component","./helpers","./utils","./errors_warnings","./renderers/renderer","../../core/utils/size","./layout","../../core/devices","../../events/core/events_engine","../../core/utils/deferred","../../common/charts","./base_widget.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/base_widget.js", ["../../core/renderer", "../../core/utils/common", "../../core/utils/window", "../../core/dom_adapter", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/extend", "../core/base_theme_manager", "../../core/dom_component", "./helpers", "./utils", "./errors_warnings", "./renderers/renderer", "../../core/utils/size", "./layout", "../../core/devices", "../../events/core/events_engine", "../../core/utils/deferred", "../../common/charts", "./base_widget.utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _common = $__require("../../core/utils/common");
  var _window = $__require("../../core/utils/window");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _type2 = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _base_theme_manager = $__require("../core/base_theme_manager");
  var _dom_component = _interopRequireDefault($__require("../../core/dom_component"));
  var _helpers = $__require("./helpers");
  var _utils = $__require("./utils");
  var _errors_warnings = _interopRequireDefault($__require("./errors_warnings"));
  var _renderer2 = $__require("./renderers/renderer");
  var _size = $__require("../../core/utils/size");
  var _layout = _interopRequireDefault($__require("./layout"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _deferred = $__require("../../core/utils/deferred");
  var _charts = $__require("../../common/charts");
  var _base_widget = $__require("./base_widget.utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var _floor = Math.floor;
  var _log = _errors_warnings.default.log;
  var SIZE_CHANGING_THRESHOLD = 0.3;
  var OPTION_RTL_ENABLED = 'rtlEnabled';
  var SIZED_ELEMENT_CLASS = 'dx-sized-element';
  var _option = _dom_component.default.prototype.option;
  function getTrue() {
    return true;
  }
  function getFalse() {
    return false;
  }
  function areCanvasesDifferent(canvas1, canvas2) {
    return !(Math.abs(canvas1.width - canvas2.width) < SIZE_CHANGING_THRESHOLD && Math.abs(canvas1.height - canvas2.height) < SIZE_CHANGING_THRESHOLD && canvas1.left === canvas2.left && canvas1.top === canvas2.top && canvas1.right === canvas2.right && canvas1.bottom === canvas2.bottom);
  }
  function defaultOnIncidentOccurred(e) {
    if (!e.component._eventsStrategy.hasEvent('incidentOccurred')) {
      _log.apply(null, [e.target.id].concat(e.target.args || []));
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
      _initTemplates: function _initTemplates() {},
      ctor: function ctor(element, options) {
        this.callBase(element, options);
        var sizedElement = _dom_adapter.default.createElement('div');
        var width = options && (0, _type2.isNumeric)(options.width) ? options.width + 'px' : '100%';
        var height = options && (0, _type2.isNumeric)(options.height) ? options.height + 'px' : this._getDefaultSize().height + 'px';
        _dom_adapter.default.setStyle(sizedElement, 'width', width);
        _dom_adapter.default.setStyle(sizedElement, 'height', height);
        _dom_adapter.default.setClass(sizedElement, SIZED_ELEMENT_CLASS);
        _dom_adapter.default.insertElement(element, sizedElement);
      }
    };
    var EmptyComponent = _dom_component.default.inherit(emptyComponentConfig);
    var originalInherit = EmptyComponent.inherit;
    EmptyComponent.inherit = function (config) {
      for (var field in config) {
        if ((0, _type2.isFunction)(config[field]) && field.substr(0, 1) !== '_' && field !== 'option' || field === '_dispose' || field === '_optionChanged') {
          config[field] = _common.noop;
        }
      }
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
    return _extends({}, canvas, {
      height: _floor(canvas.height),
      width: _floor(canvas.width)
    });
  }
  var isServerSide = !(0, _window.hasWindow)();
  function sizeIsValid(value) {
    return (0, _type2.isDefined)(value) && value > 0;
  }
  var baseWidget = isServerSide ? getEmptyComponent() : _dom_component.default.inherit({
    _eventsMap: {
      'onIncidentOccurred': {
        name: 'incidentOccurred',
        actionSettings: {
          excludeValidators: ['disabled']
        }
      },
      'onDrawn': {
        name: 'drawn',
        actionSettings: {
          excludeValidators: ['disabled']
        }
      }
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        onIncidentOccurred: defaultOnIncidentOccurred
      });
    },
    _useLinks: true,
    _init: function _init() {
      var that = this;
      that._$element.children('.' + SIZED_ELEMENT_CLASS).remove();
      that._graphicObjects = {};
      that.callBase.apply(that, arguments);
      that._changesLocker = 0;
      that._optionChangedLocker = 0;
      that._asyncFirstDrawing = true;
      that._changes = (0, _helpers.changes)();
      that._suspendChanges();
      that._themeManager = that._createThemeManager();
      that._themeManager.setCallback(function () {
        that._requestChange(that._themeDependentChanges);
      });
      that._renderElementAttributes();
      that._initRenderer();
      // Shouldn't "_useLinks" be passed to the renderer instead of doing 3 checks here?
      var linkTarget = that._useLinks && that._renderer.root;
      // There is an implicit relation between `_useLinks` and `loading indicator` - it uses links
      // Though this relation is not ensured in code we will immediately know when it is broken - `loading indicator` will break on construction
      linkTarget && linkTarget.enableLinks().virtualLink('core').virtualLink('peripheral');
      that._renderVisibilityChange();
      that._attachVisibilityChangeHandlers();
      that._toggleParentsScrollSubscription(this._isVisible());
      that._initEventTrigger();
      that._incidentOccurred = (0, _base_widget.createIncidentOccurred)(that.NAME, that._eventTrigger);
      that._layout = new _layout.default();
      // Such solution is used only to avoid writing lots of "after" for all core elements in all widgets
      // May be later a proper solution would be found
      linkTarget && linkTarget.linkAfter('core');
      that._initPlugins();
      that._initCore();
      linkTarget && linkTarget.linkAfter();
      that._change(that._initialChanges);
    },
    _createThemeManager: function _createThemeManager() {
      return new _base_theme_manager.BaseThemeManager(this._getThemeManagerOptions());
    },
    _getThemeManagerOptions: function _getThemeManagerOptions() {
      return {
        themeSection: this._themeSection,
        fontFields: this._fontFields
      };
    },
    _initialChanges: ['LAYOUT', 'RESIZE_HANDLER', 'THEME', 'DISABLED'],
    _initPlugins: function _initPlugins() {
      var that = this;
      (0, _iterator.each)(that._plugins, function (_, plugin) {
        plugin.init.call(that);
      });
    },
    _disposePlugins: function _disposePlugins() {
      var that = this;
      (0, _iterator.each)(that._plugins.slice().reverse(), function (_, plugin) {
        plugin.dispose.call(that);
      });
    },
    _change: function _change(codes) {
      this._changes.add(codes);
    },
    _suspendChanges: function _suspendChanges() {
      ++this._changesLocker;
    },
    _resumeChanges: function _resumeChanges() {
      var that = this;
      if (--that._changesLocker === 0 && that._changes.count() > 0 && !that._applyingChanges) {
        that._renderer.lock();
        that._applyingChanges = true;
        that._applyChanges();
        that._changes.reset();
        that._applyingChanges = false;
        that._changesApplied();
        that._renderer.unlock();
        if (that._optionsQueue) {
          that._applyQueuedOptions();
        }
        that.resolveItemsDeferred(that._legend ? [that._legend] : []);
        that._optionChangedLocker++;
        that._notify();
        that._optionChangedLocker--;
      }
    },
    resolveItemsDeferred: function resolveItemsDeferred(items) {
      this._resolveDeferred(this._getTemplatesItems(items));
    },
    _collectTemplatesFromItems: function _collectTemplatesFromItems(items) {
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
    _getTemplatesItems: function _getTemplatesItems(items) {
      var elements = this._collectTemplatesFromItems(items);
      var extraItems = this._getExtraTemplatesItems();
      return {
        items: extraItems.items.concat(elements.items),
        groups: extraItems.groups.concat(elements.groups),
        launchRequest: [extraItems.launchRequest],
        doneRequest: [extraItems.doneRequest]
      };
    },
    _getExtraTemplatesItems: function _getExtraTemplatesItems() {
      return {
        items: [],
        groups: [],
        launchRequest: function launchRequest() {},
        doneRequest: function doneRequest() {}
      };
    },
    _resolveDeferred: function _resolveDeferred(_ref) {
      var items = _ref.items,
          launchRequest = _ref.launchRequest,
          doneRequest = _ref.doneRequest,
          groups = _ref.groups;
      var that = this;
      that._setGroupsVisibility(groups, 'hidden');
      if (that._changesApplying) {
        that._changesApplying = false;
        callForEach(doneRequest);
        return;
      }
      var syncRendering = true;
      _deferred.when.apply(that, items).done(function () {
        if (syncRendering) {
          that._setGroupsVisibility(groups, 'visible');
          return;
        }
        callForEach(launchRequest);
        that._changesApplying = true;
        var changes = ['LAYOUT', 'FULL_RENDER'];
        if (that._asyncFirstDrawing) {
          changes.push('FORCE_FIRST_DRAWING');
          that._asyncFirstDrawing = false;
        } else {
          changes.push('FORCE_DRAWING');
        }
        that._requestChange(changes);
        that._setGroupsVisibility(groups, 'visible');
      });
      syncRendering = false;
    },
    _setGroupsVisibility: function _setGroupsVisibility(groups, visibility) {
      groups.forEach(function (g) {
        return g.attr({
          visibility: visibility
        });
      });
    },
    _applyQueuedOptions: function _applyQueuedOptions() {
      var that = this;
      var queue = that._optionsQueue;
      that._optionsQueue = null;
      that.beginUpdate();
      (0, _iterator.each)(queue, function (_, action) {
        action();
      });
      that.endUpdate();
    },
    _requestChange: function _requestChange(codes) {
      this._suspendChanges();
      this._change(codes);
      this._resumeChanges();
    },
    _applyChanges: function _applyChanges() {
      var that = this;
      var changes = that._changes;
      var order = that._totalChangesOrder;
      var i;
      var ii = order.length;
      for (i = 0; i < ii; ++i) {
        if (changes.has(order[i])) {
          that['_change_' + order[i]]();
        }
      }
    },
    _optionChangesOrder: ['EVENTS', 'THEME', 'RENDERER', 'RESIZE_HANDLER'],
    _layoutChangesOrder: ['ELEMENT_ATTR', 'CONTAINER_SIZE', 'LAYOUT'],
    _customChangesOrder: ['DISABLED'],
    _change_EVENTS: function _change_EVENTS() {
      this._eventTrigger.applyChanges();
    },
    _change_THEME: function _change_THEME() {
      this._setThemeAndRtl();
    },
    _change_RENDERER: function _change_RENDERER() {
      this._setRendererOptions();
    },
    _change_RESIZE_HANDLER: function _change_RESIZE_HANDLER() {
      this._setupResizeHandler();
    },
    _change_ELEMENT_ATTR: function _change_ELEMENT_ATTR() {
      this._renderElementAttributes();
      this._change(['CONTAINER_SIZE']);
    },
    _change_CONTAINER_SIZE: function _change_CONTAINER_SIZE() {
      this._updateSize();
    },
    _change_LAYOUT: function _change_LAYOUT() {
      this._setContentSize();
    },
    _change_DISABLED: function _change_DISABLED() {
      var renderer = this._renderer;
      var root = renderer.root;
      if (this.option('disabled')) {
        this._initDisabledState = root.attr('pointer-events');
        root.attr({
          'pointer-events': 'none',
          filter: renderer.getGrayScaleFilter().id
        });
      } else {
        if (root.attr('pointer-events') === 'none') {
          root.attr({
            'pointer-events': (0, _type2.isDefined)(this._initDisabledState) ? this._initDisabledState : null,
            'filter': null
          });
        }
      }
    },
    _themeDependentChanges: ['RENDERER'],
    _initRenderer: function _initRenderer() {
      var that = this;
      // Canvas is calculated before the renderer is created in order to capture actual size of the container
      var rawCanvas = that._calculateRawCanvas();
      that._canvas = floorCanvasDimensions(rawCanvas);
      that._renderer = new _renderer2.Renderer({
        cssClass: that._rootClassPrefix + ' ' + that._rootClass,
        pathModified: that.option('pathModified'),
        container: that._$element[0]
      });
      that._renderer.resize(that._canvas.width, that._canvas.height);
    },
    _disposeRenderer: function _disposeRenderer() {
      ///#DEBUG
      // NOTE: This is temporary - until links mechanism is stabilized
      this._useLinks && this._renderer.root.checkLinks();
      ///#ENDDEBUG
      this._renderer.dispose();
    },
    _disposeGraphicObjects: function _disposeGraphicObjects() {
      for (var id in this._graphicObjects) {
        this._graphicObjects[id].dispose();
      }
      this._graphicObjects = null;
    },
    _getAnimationOptions: _common.noop,
    render: function render() {
      this._requestChange(['CONTAINER_SIZE']);
      var visible = this._isVisible();
      this._toggleParentsScrollSubscription(visible);
      !visible && this._stopCurrentHandling();
    },
    _toggleParentsScrollSubscription: function _toggleParentsScrollSubscription(subscribe) {
      var $parents = (0, _renderer.default)(this._renderer.root.element).parents();
      var scrollEvents = 'scroll.viz_widgets';
      if (_devices.default.real().platform === 'generic') {
        $parents = $parents.add((0, _window.getWindow)());
      }
      this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function () {
        this._stopCurrentHandling();
      }.bind(this);
      _events_engine.default.off((0, _renderer.default)().add(this._$prevRootParents), scrollEvents, this._proxiedTargetParentsScrollHandler);
      if (subscribe) {
        _events_engine.default.on($parents, scrollEvents, this._proxiedTargetParentsScrollHandler);
        this._$prevRootParents = $parents;
      }
    },
    _stopCurrentHandling: _common.noop,
    _dispose: function _dispose() {
      var that = this;
      if (this._disposed) {
        return;
      }
      that.callBase.apply(that, arguments);
      that._toggleParentsScrollSubscription(false);
      that._removeResizeHandler();
      that._layout.dispose();
      that._eventTrigger.dispose();
      that._disposeCore();
      that._disposePlugins();
      that._disposeGraphicObjects();
      that._disposeRenderer();
      that._themeManager.dispose();
      that._themeManager = that._renderer = that._eventTrigger = null;
    },
    _initEventTrigger: function _initEventTrigger() {
      var that = this;
      that._eventTrigger = (0, _base_widget.createEventTrigger)(that._eventsMap, function (name, actionSettings) {
        return that._createActionByOption(name, actionSettings);
      });
    },
    _calculateRawCanvas: function _calculateRawCanvas() {
      var that = this;
      var size = that.option('size') || {};
      var margin = that.option('margin') || {};
      var defaultCanvas = that._getDefaultSize() || {};
      var getSizeOfSide = function getSizeOfSide(size, side, getter) {
        if (sizeIsValid(size[side]) || !(0, _window.hasWindow)()) {
          return 0;
        }
        var elementSize = getter(that._$element);
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
      // Now it will be rendered but because of "width" and "height" of the root both set to 0 it will not be visible.
      if (canvas.width - canvas.left - canvas.right <= 0 || canvas.height - canvas.top - canvas.bottom <= 0) {
        canvas = {
          width: 0,
          height: 0
        };
      }
      return canvas;
    },
    _updateSize: function _updateSize() {
      var that = this;
      var rawCanvas = that._calculateRawCanvas();
      if (areCanvasesDifferent(that._canvas, rawCanvas) || that.__forceRender /* for charts */) {
          that._canvas = floorCanvasDimensions(rawCanvas);
          that._recreateSizeDependentObjects(true);
          that._renderer.resize(this._canvas.width, this._canvas.height);
          that._change(['LAYOUT']);
        }
    },
    _recreateSizeDependentObjects: _common.noop,
    _getMinSize: function _getMinSize() {
      return [0, 0];
    },
    _getAlignmentRect: _common.noop,
    _setContentSize: function _setContentSize() {
      var canvas = this._canvas;
      var layout = this._layout;
      var rect = canvas.width > 0 && canvas.height > 0 ? [canvas.left, canvas.top, canvas.width - canvas.right, canvas.height - canvas.bottom] : [0, 0, 0, 0];
      rect = layout.forward(rect, this._getMinSize());
      var nextRect = this._applySize(rect) || rect;
      layout.backward(nextRect, this._getAlignmentRect() || nextRect);
    },
    ///#DEBUG
    DEBUG_getCanvas: function DEBUG_getCanvas() {
      return this._canvas;
    },
    DEBUG_getEventTrigger: function DEBUG_getEventTrigger() {
      return this._eventTrigger;
    },
    ///#ENDDEBUG

    _getOption: function _getOption(name, isScalar) {
      var theme = this._themeManager.theme(name);
      var option = this.option(name);
      return isScalar ? option !== undefined ? option : theme : (0, _extend.extend)(true, {}, theme, option);
    },
    _setupResizeHandler: function _setupResizeHandler() {
      var that = this;
      var redrawOnResize = (0, _utils.parseScalar)(that._getOption('redrawOnResize', true), true);
      if (that._disposeResizeHandler) {
        that._removeResizeHandler();
      }
      that._disposeResizeHandler = (0, _base_widget.createResizeHandler)(that._$element[0], redrawOnResize, function () {
        return that._requestChange(['CONTAINER_SIZE']);
      });
    },
    _removeResizeHandler: function _removeResizeHandler() {
      if (this._disposeResizeHandler) {
        this._disposeResizeHandler();
        this._disposeResizeHandler = null;
      }
    },
    // This is actually added only to make loading indicator pluggable. This is bad but much better than entire loading indicator in BaseWidget.
    _onBeginUpdate: _common.noop,
    beginUpdate: function beginUpdate() {
      var that = this;
      // The "_initialized" flag is checked because first time "beginUpdate" is called in the constructor.
      if (that._initialized && that._isUpdateAllowed()) {
        that._onBeginUpdate();
        that._suspendChanges();
      }
      that.callBase.apply(that, arguments);
      return that;
    },
    endUpdate: function endUpdate() {
      this.callBase();
      this._isUpdateAllowed() && this._resumeChanges();
      return this;
    },
    option: function option(name) {
      var that = this;
      // NOTE: `undefined` has to be returned because base option setter returns `undefined`.
      // `argument.length` and `isObject` checks are copypaste from Component.
      if (that._initialized && that._applyingChanges && (arguments.length > 1 || (0, _type2.isObject)(name))) {
        that._optionsQueue = that._optionsQueue || [];
        that._optionsQueue.push(that._getActionForUpdating(arguments));
      } else {
        return _option.apply(that, arguments);
      }
    },
    _getActionForUpdating: function _getActionForUpdating(args) {
      var that = this;
      return function () {
        _option.apply(that, args);
      };
    },
    // For quite a long time the following method were abstract (from the Component perspective).
    // Now they are not but that basic functionality is not required here.
    _clean: _common.noop,
    _render: _common.noop,
    _optionChanged: function _optionChanged(arg) {
      var that = this;
      if (that._optionChangedLocker) {
        return;
      }
      var partialChanges = that.getPartialChangeOptionsName(arg);
      var changes = [];
      if (partialChanges.length > 0) {
        partialChanges.forEach(function (pc) {
          return changes.push(that._partialOptionChangesMap[pc]);
        });
      } else {
        changes.push(that._optionChangesMap[arg.name]);
      }
      changes = changes.filter(function (c) {
        return !!c;
      });
      if (that._eventTrigger.change(arg.name)) {
        that._change(['EVENTS']);
      } else if (changes.length > 0) {
        that._change(changes);
      } else {
        that.callBase.apply(that, arguments);
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
    getPartialChangeOptionsName: function getPartialChangeOptionsName(changedOption) {
      var that = this;
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
              that._addOptionsNameForPartialUpdate(value, options, partialChangeOptionsName);
            } else if ((0, _type2.type)(value) === 'array') {
              if (value.length > 0 && value.every(function (item) {
                return that._checkOptionsForPartialUpdate(item, options);
              })) {
                value.forEach(function (item) {
                  return that._addOptionsNameForPartialUpdate(item, options, partialChangeOptionsName);
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
    _checkOptionsForPartialUpdate: function _checkOptionsForPartialUpdate(optionObject, options) {
      return !Object.keys(optionObject).some(function (key) {
        return options.indexOf(key) === -1;
      });
    },
    _addOptionsNameForPartialUpdate: function _addOptionsNameForPartialUpdate(optionObject, options, partialChangeOptionsName) {
      var optionKeys = Object.keys(optionObject);
      if (this._checkOptionsForPartialUpdate(optionObject, options)) {
        optionKeys.forEach(function (key) {
          return options.indexOf(key) > -1 && partialChangeOptionsName.push(key);
        });
      }
    },
    _visibilityChanged: function _visibilityChanged() {
      this.render();
    },
    _setThemeAndRtl: function _setThemeAndRtl() {
      this._themeManager.setTheme(this.option('theme'), this.option(OPTION_RTL_ENABLED));
    },
    _getRendererOptions: function _getRendererOptions() {
      return {
        rtl: this.option(OPTION_RTL_ENABLED),
        encodeHtml: this.option('encodeHtml'),
        animation: this._getAnimationOptions()
      };
    },
    _setRendererOptions: function _setRendererOptions() {
      this._renderer.setOptions(this._getRendererOptions());
    },
    svg: function svg() {
      return this._renderer.svg();
    },
    getSize: function getSize() {
      var canvas = this._canvas || {};
      return {
        width: canvas.width,
        height: canvas.height
      };
    },
    isReady: getFalse,
    _dataIsReady: getTrue,
    _resetIsReady: function _resetIsReady() {
      this.isReady = getFalse;
    },
    _renderGraphicObjects: function _renderGraphicObjects() {
      var renderer = this._renderer;
      var graphics = (0, _charts.getGraphicObjects)();
      for (var id in graphics) {
        if (!this._graphicObjects[id]) {
          var _graphics$id = graphics[id],
              _type = _graphics$id.type,
              colors = _graphics$id.colors,
              rotationAngle = _graphics$id.rotationAngle,
              template = _graphics$id.template,
              width = _graphics$id.width,
              height = _graphics$id.height;
          switch (_type) {
            case 'linear':
              this._graphicObjects[id] = renderer.linearGradient(colors, id, rotationAngle);
              break;
            case 'radial':
              this._graphicObjects[id] = renderer.radialGradient(colors, id);
              break;
            case 'pattern':
              this._graphicObjects[id] = renderer.customPattern(id, this._getTemplate(template), width, height);
              break;
          }
        }
      }
    },
    _drawn: function _drawn() {
      var that = this;
      that.isReady = getFalse;
      if (that._dataIsReady()) {
        that._renderer.onEndAnimation(function () {
          that.isReady = getTrue;
        });
      }
      that._eventTrigger('drawn', {});
    }
  });
  var _default = baseWidget;
  exports.default = _default;
  (0, _helpers.replaceInherit)(baseWidget);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/common","../../core/utils/window","../../core/dom_adapter","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../core/base_theme_manager","../../core/dom_component","./helpers","./utils","./errors_warnings","./renderers/renderer","../../core/utils/size","./layout","../../core/devices","../../events/core/events_engine","../../core/utils/deferred","../../common/charts","./base_widget.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/common"), require("../../core/utils/window"), require("../../core/dom_adapter"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../core/base_theme_manager"), require("../../core/dom_component"), require("./helpers"), require("./utils"), require("./errors_warnings"), require("./renderers/renderer"), require("../../core/utils/size"), require("./layout"), require("../../core/devices"), require("../../events/core/events_engine"), require("../../core/utils/deferred"), require("../../common/charts"), require("./base_widget.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base_widget.js.map