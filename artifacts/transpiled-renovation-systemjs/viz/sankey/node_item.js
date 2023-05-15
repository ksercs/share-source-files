!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/sankey/node_item.js"], ["../../core/utils/type","../core/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/sankey/node_item.js", ["../../core/utils/type", "../core/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _utils = $__require("../core/utils");
  var states = ['normal', 'hover'];
  function _compileAttrs(color, itemOptions, itemBaseOptions) {
    var border = itemOptions.border;
    var baseBorder = itemBaseOptions.border;
    var borderVisible = (0, _type.isDefined)(border.visible) ? border.visible : baseBorder.visible;
    var borderWidth = (0, _type.isDefined)(border.width) ? border.width : baseBorder.width;
    var borderOpacity = (0, _type.isDefined)(border.opacity) ? border.opacity : (0, _type.isDefined)(baseBorder.opacity) ? baseBorder.opacity : 1;
    var opacity = (0, _type.isDefined)(itemOptions.opacity) ? itemOptions.opacity : (0, _type.isDefined)(itemBaseOptions.opacity) ? itemBaseOptions.opacity : 1;
    return {
      fill: itemOptions.color || color,
      'stroke-width': borderVisible ? borderWidth : 0,
      stroke: itemOptions.border.color || itemBaseOptions.border.color,
      'stroke-opacity': borderOpacity,
      opacity: opacity,
      hatching: itemOptions.hatching
    };
  }
  function compileLabelAttrs(labelOptions, filter, node) {
    var _patchFontOptions = _utils.patchFontOptions;
    if (labelOptions.useNodeColors) {
      labelOptions.font.color = node.color;
    }
    var borderVisible = (0, _type.isDefined)(labelOptions.border.visible) ? labelOptions.border.visible : false;
    var borderWidth = (0, _type.isDefined)(labelOptions.border.width) ? labelOptions.border.width : 0;
    var borderColor = (0, _type.isDefined)(labelOptions.border.color) ? labelOptions.border.color : labelOptions.font.color;
    var borderOpacity = (0, _type.isDefined)(labelOptions.border.opacity) ? labelOptions.border.opacity : 1;
    var attr = {
      filter: filter
    };
    if (borderVisible && borderWidth) {
      attr.stroke = borderColor;
      attr['stroke-width'] = borderVisible ? borderWidth : 0;
      attr['stroke-opacity'] = borderOpacity;
    }
    return {
      attr: attr,
      css: _patchFontOptions(labelOptions.font)
    };
  }
  function Node(widget, params) {
    var that = this;
    var widgetOffset = widget._renderer.getRootOffset();
    that.code = 0;
    that.widget = widget;
    that.color = params.color;
    that.options = params.options;
    that.rect = params.rect;
    that.label = that.title = params.rect._name;
    that.coords = {
      x: params.rect.x + params.rect.width / 2 + widgetOffset.left,
      y: params.rect.y + params.rect.height / 2 + widgetOffset.top
    };
    that.id = params.id;
    that.linksIn = params.linksIn;
    that.linksOut = params.linksOut;
    this.states = {
      normal: _compileAttrs(this.color, that.options, that.options),
      hover: _compileAttrs(this.color, that.options.hoverStyle, that.options)
    };
  }
  Node.prototype = {
    compileAttrs: function compileAttrs() {
      return _compileAttrs(this.color, this.options);
    },
    getState: function getState() {
      return states[this.code];
    },
    isHovered: function isHovered() {
      return !!(this.code & 1);
    },
    setState: function setState(code, state) {
      var _this = this;
      if (state) {
        this.code |= code;
      } else {
        this.code &= ~code;
      }
      if (state) {
        this.linksIn.concat(this.linksOut).forEach(function (adjacentLink) {
          _this.widget._links[adjacentLink.index].setAdjacentNodeHover(true);
        });
      } else {
        this.widget._links.forEach(function (link) {
          link.isAdjacentNodeHovered() && link.adjacentNodeHover(false);
        });
        this.hideTooltip();
      }
      this.widget._applyNodesAppearance();
      this.widget._applyLinksAppearance();
    },
    hover: function hover(state) {
      if (!this.widget._getOption('hoverEnabled', true) || state === this.isHovered()) {
        return;
      }
      this.widget._suspend();
      state && this.widget.clearHover();
      this.setState(1, state);
      this.widget._eventTrigger('nodeHoverChanged', {
        target: this
      });
      this.widget._resume();
    },
    setHover: function setHover() {
      this.hover(true);
    },
    showTooltip: function showTooltip(coords) {
      this.widget._getOption('hoverEnabled', true) && this.widget._tooltip && this.widget._tooltip.show({
        type: 'node',
        info: {
          label: this.label,
          title: this.label,
          weightIn: this.linksIn.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.weight;
          }, 0),
          weightOut: this.linksOut.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.weight;
          }, 0)
        }
      }, typeof coords !== 'undefined' ? {
        x: coords[0],
        y: coords[1]
      } : this.coords);
    },
    hideTooltip: function hideTooltip() {
      this.widget._tooltip && this.widget._tooltip.hide();
    },
    getLabelAttributes: function getLabelAttributes(labelSettings, filter) {
      return compileLabelAttrs(labelSettings, filter, this);
    }
  };
  var _default = Node;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../core/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../core/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=node_item.js.map