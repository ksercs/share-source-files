!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/title.js"], ["../../core/utils/type","../../core/utils/extend","./utils","./layout_element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/title.js", ["../../core/utils/type", "../../core/utils/extend", "./utils", "./layout_element"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.plugin = exports.Title = exports.DEBUG_set_title = void 0;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _utils = $__require("./utils");
  var _layout_element = $__require("./layout_element");
  var _Number = Number;
  var parseHorizontalAlignment = (0, _utils.enumParser)(['left', 'center', 'right']);
  var parseVerticalAlignment = (0, _utils.enumParser)(['top', 'bottom']);
  var DEFAULT_MARGIN = 10;
  function hasText(text) {
    return !!(text && String(text).length > 0);
  }
  function processTitleLength(elem, text, width, options, placeholderSize) {
    if (elem.attr({
      text: text
    }).setMaxSize(width, placeholderSize, options).textChanged) {
      elem.setTitle(text);
    }
  }
  function pickMarginValue(value) {
    return value >= 0 ? _Number(value) : DEFAULT_MARGIN;
  }
  function validateMargin(margin) {
    var result;
    if (margin >= 0) {
      result = {
        left: _Number(margin),
        top: _Number(margin),
        right: _Number(margin),
        bottom: _Number(margin)
      };
    } else {
      margin = margin || {};
      result = {
        left: pickMarginValue(margin.left),
        top: pickMarginValue(margin.top),
        right: pickMarginValue(margin.right),
        bottom: pickMarginValue(margin.bottom)
      };
    }
    return result;
  }
  function checkRect(rect, boundingRect) {
    return rect[2] - rect[0] < boundingRect.width || rect[3] - rect[1] < boundingRect.height;
  }
  var Title = function Title(params) {
    this._params = params;
    this._group = params.renderer.g().attr({
      'class': params.cssClass
    }).linkOn(params.root || params.renderer.root, 'title');
    this._hasText = false;
  };

  // There is no normal inheritance from LayoutElement because it is actually a container of methods rather than a class.
  exports.Title = Title;
  (0, _extend.extend)(Title.prototype, _layout_element.LayoutElement.prototype, {
    dispose: function dispose() {
      var that = this;
      that._group.linkRemove();
      that._group.linkOff();
      if (that._titleElement) {
        that._clipRect.dispose();
        that._titleElement = that._subtitleElement = that._clipRect = null;
      }
      that._params = that._group = that._options = null;
    },
    _updateOptions: function _updateOptions(options) {
      this._options = options;
      this._options.horizontalAlignment = parseHorizontalAlignment(options.horizontalAlignment, 'center');
      this._options.verticalAlignment = parseVerticalAlignment(options.verticalAlignment, 'top');
      this._options.margin = validateMargin(options.margin);
    },
    _updateStructure: function _updateStructure() {
      var that = this;
      var renderer = that._params.renderer;
      var group = that._group;
      var options = that._options;
      var align = options.horizontalAlignment;

      // Looks like the following "laziness" is only to avoid unnecessary DOM content creation -
      // for example when widget is created without "title" option.
      if (!that._titleElement) {
        that._titleElement = renderer.text().append(group);
        that._subtitleElement = renderer.text();
        that._clipRect = renderer.clipRect();
        group.attr({
          'clip-path': that._clipRect.id
        });
      }
      that._titleElement.attr({
        align: align,
        'class': options.cssClass
      });
      that._subtitleElement.attr({
        align: align,
        'class': options.subtitle.cssClass
      });
      group.linkAppend();
      hasText(options.subtitle.text) ? that._subtitleElement.append(group) : that._subtitleElement.remove();
    },
    _updateTexts: function _updateTexts() {
      var that = this;
      var options = that._options;
      var subtitleOptions = options.subtitle;
      var titleElement = that._titleElement;
      var subtitleElement = that._subtitleElement;
      var testText = 'A';
      var titleBox;
      titleElement.attr({
        text: testText,
        y: 0
      }).css((0, _utils.patchFontOptions)(options.font));
      titleBox = titleElement.getBBox(); // for multiline text
      that._baseLineCorrection = titleBox.height + titleBox.y;
      titleElement.attr({
        text: options.text
      });
      titleBox = titleElement.getBBox();
      var y = -titleBox.y;
      titleElement.attr({
        y: y
      });
      if (hasText(subtitleOptions.text)) {
        subtitleElement.attr({
          text: subtitleOptions.text,
          y: 0
        }).css((0, _utils.patchFontOptions)(subtitleOptions.font));
      }
    },
    _shiftSubtitle: function _shiftSubtitle() {
      var that = this;
      var titleBox = that._titleElement.getBBox();
      var element = that._subtitleElement;
      var offset = that._options.subtitle.offset;
      element.move(0, titleBox.y + titleBox.height - element.getBBox().y - offset);
    },
    _updateBoundingRectAlignment: function _updateBoundingRectAlignment() {
      var boundingRect = this._boundingRect;
      var options = this._options;
      boundingRect.verticalAlignment = options.verticalAlignment;
      boundingRect.horizontalAlignment = options.horizontalAlignment;
      boundingRect.cutLayoutSide = options.verticalAlignment;
      boundingRect.cutSide = 'vertical';
      boundingRect.position = {
        horizontal: options.horizontalAlignment,
        vertical: options.verticalAlignment
      };
    },
    hasText: function hasText() {
      return this._hasText;
    },
    update: function update(themeOptions, userOptions) {
      var that = this;
      var options = (0, _extend.extend)(true, {}, themeOptions, processTitleOptions(userOptions));
      var _hasText = hasText(options.text);
      var isLayoutChanged = _hasText || _hasText !== that._hasText;
      that._baseLineCorrection = 0;
      that._updateOptions(options);
      that._boundingRect = {};
      if (_hasText) {
        that._updateStructure();
        that._updateTexts();
      } else {
        that._group.linkRemove();
      }
      that._updateBoundingRect();
      that._updateBoundingRectAlignment();
      that._hasText = _hasText;
      return isLayoutChanged;
    },
    draw: function draw(width, height) {
      var that = this;
      if (that._hasText) {
        that._group.linkAppend();
        that._correctTitleLength(width);
        if (that._group.getBBox().height > height) {
          this.freeSpace();
        }
      }
      return that;
    },
    _correctTitleLength: function _correctTitleLength(width) {
      var that = this;
      var options = that._options;
      var margin = options.margin;
      var maxWidth = width - margin.left - margin.right;
      var placeholderSize = options.placeholderSize;
      processTitleLength(that._titleElement, options.text, maxWidth, options, placeholderSize);
      if (that._subtitleElement) {
        if (_Number(placeholderSize) > 0) {
          placeholderSize -= that._titleElement.getBBox().height;
        }
        processTitleLength(that._subtitleElement, options.subtitle.text, maxWidth, options.subtitle, placeholderSize);
        that._shiftSubtitle();
      }
      that._updateBoundingRect();
      var _this$getCorrectedLay = this.getCorrectedLayoutOptions(),
          x = _this$getCorrectedLay.x,
          y = _this$getCorrectedLay.y,
          height = _this$getCorrectedLay.height;
      this._clipRect.attr({
        x: x,
        y: y,
        width: width,
        height: height
      });
    },
    getLayoutOptions: function getLayoutOptions() {
      return this._boundingRect || null;
    },
    shift: function shift(x, y) {
      var that = this;
      var box = that.getLayoutOptions();
      that._group.move(x - box.x, y - box.y);
      return that;
    },
    _updateBoundingRect: function _updateBoundingRect() {
      var that = this;
      var options = that._options;
      var margin = options.margin;
      var boundingRect = that._boundingRect;
      var box = that._hasText ? that._group.getBBox() : {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        isEmpty: true
      };
      if (!box.isEmpty) {
        box.height += margin.top + margin.bottom - that._baseLineCorrection;
        box.width += margin.left + margin.right;
        box.x -= margin.left;
        box.y += that._baseLineCorrection - margin.top;
      }
      if (options.placeholderSize > 0) {
        box.height = options.placeholderSize;
      }
      boundingRect.height = box.height;
      boundingRect.width = box.width;
      boundingRect.x = box.x;
      boundingRect.y = box.y;
    },
    getCorrectedLayoutOptions: function getCorrectedLayoutOptions() {
      var srcBox = this.getLayoutOptions();
      var correction = this._baseLineCorrection;
      return (0, _extend.extend)({}, srcBox, {
        y: srcBox.y - correction,
        height: srcBox.height + correction
      });
    },
    // BaseWidget_layout_implementation
    layoutOptions: function layoutOptions() {
      if (!this._hasText) {
        return null;
      }
      return {
        horizontalAlignment: this._boundingRect.horizontalAlignment,
        verticalAlignment: this._boundingRect.verticalAlignment,
        priority: 0
      };
    },
    measure: function measure(size) {
      this.draw(size[0], size[1]);
      return [this._boundingRect.width, this._boundingRect.height];
    },
    move: function move(rect, fitRect) {
      var boundingRect = this._boundingRect;
      if (checkRect(rect, boundingRect)) {
        this.shift(fitRect[0], fitRect[1]);
      } else {
        this.shift(Math.round(rect[0]), Math.round(rect[1]));
      }
    },
    freeSpace: function freeSpace() {
      var that = this;
      that._params.incidentOccurred('W2103');
      that._group.linkRemove();
      that._boundingRect.width = that._boundingRect.height = 0;
    },
    getOptions: function getOptions() {
      return this._options;
    },
    changeLink: function changeLink(root) {
      this._group.linkRemove();
      this._group.linkOn(root, 'title');
    }
    // BaseWidget_layout_implementation
  });

  ///#DEBUG
  Title.prototype.DEBUG_getOptions = function () {
    return this._options;
  };
  ///#ENDDEBUG

  function processTitleOptions(options) {
    var newOptions = (0, _type.isString)(options) ? {
      text: options
    } : options || {};
    newOptions.subtitle = (0, _type.isString)(newOptions.subtitle) ? {
      text: newOptions.subtitle
    } : newOptions.subtitle || {};
    return newOptions;
  }
  var plugin = {
    name: 'title',
    init: function init() {
      var that = this;
      // "exports" is used for testing purposes.
      that._title = new Title({
        renderer: that._renderer,
        cssClass: that._rootClassPrefix + '-title',
        incidentOccurred: that._incidentOccurred
      });
      that._layout.add(that._title);
    },
    dispose: function dispose() {
      this._title.dispose();
      this._title = null;
    },
    customize: function customize(constructor) {
      constructor.addChange({
        code: 'TITLE',
        handler: function handler() {
          if (this._title.update(this._themeManager.theme('title'), this.option('title'))) {
            this._change(['LAYOUT']);
          }
        },
        isThemeDependent: true,
        option: 'title',
        isOptionChange: true
      });
    },
    fontFields: ['title.font', 'title.subtitle.font']
  };

  ///#DEBUG
  exports.plugin = plugin;
  var DEBUG_set_title = function DEBUG_set_title(value) {
    exports.Title = Title = value;
  };
  ///#ENDDEBUG
  exports.DEBUG_set_title = DEBUG_set_title;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend","./utils","./layout_element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"), require("./utils"), require("./layout_element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=title.js.map