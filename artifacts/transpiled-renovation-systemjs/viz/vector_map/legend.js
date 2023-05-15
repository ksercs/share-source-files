!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/vector_map/legend.js"], ["../../core/utils/extend","../../core/utils/iterator","../../core/utils/object","../components/legend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/vector_map/legend.js", ["../../core/utils/extend", "../../core/utils/iterator", "../../core/utils/object", "../components/legend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.LegendsControl = LegendsControl;
  exports._TESTS_Legend = void 0;
  exports._TESTS_restoreLegendType = _TESTS_restoreLegendType;
  exports._TESTS_stubLegendType = _TESTS_stubLegendType;
  var _extend2 = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _object = $__require("../../core/utils/object");
  var _legend = $__require("../components/legend");
  var _extend = _extend2.extend;
  var _each = _iterator.each;
  var unknownSource = {
    category: 'UNKNOWN',
    name: 'UNKNOWN'
  };
  function buildData(partition, values, field) {
    var i;
    var ii = values.length;
    var list = [];
    var item;
    for (i = 0; i < ii; ++i) {
      list[i] = item = {
        start: partition[i],
        end: partition[i + 1],
        index: i
      };
      item[field] = values[i];
      item.states = {
        normal: {
          fill: item.color
        }
      };
      item.visible = true;
    }
    return list;
  }

  // 'var' because JSHint throws W021 error
  var Legend = function Legend(parameters) {
    var that = this;
    that._params = parameters;
    that._root = parameters.renderer.g().attr({
      'class': 'dxm-legend'
    }).linkOn(parameters.container, {
      name: 'legend',
      after: 'legend-base'
    }).enableLinks().linkAppend();
    parameters.layoutControl.addItem(that);
    _legend.Legend.call(that, {
      renderer: parameters.renderer,
      widget: parameters.widget,
      group: that._root,
      backgroundClass: null,
      itemsGroupClass: null,
      textField: 'text',
      getFormatObject: function getFormatObject(data) {
        return data;
      }
    });
    that._onDataChanged = function (data) {
      that._updateData(data);
    };
  };
  exports._TESTS_Legend = Legend;
  Legend.prototype = _extend((0, _object.clone)(_legend.Legend.prototype), {
    constructor: Legend,
    dispose: function dispose() {
      var that = this;
      that._params.layoutControl.removeItem(that);
      that._unbindData();
      that._root.linkRemove().linkOff();
      that._params = that._root = that._onDataChanged = null;
      return _legend.Legend.prototype.dispose.apply(that, arguments);
    },
    // This method is called only by the layout
    resize: function resize(size) {
      this._params.notifyDirty();
      if (size === null) {
        this.erase();
      } else {
        this.draw(size.width, size.height);
      }
      this._params.notifyReady();
    },
    locate: _legend.Legend.prototype.shift,
    _updateData: function _updateData(data) {
      this._options.defaultColor = data && data.defaultColor;
      this.update(data ? buildData(data.partition, data.values, this._dataName) : [], this._options, this._params.themeManager.theme('legend').title);
      this.updateLayout();
    },
    _unbindData: function _unbindData() {
      if (this._dataCategory) {
        this._params.dataExchanger.unbind(this._dataCategory, this._dataName, this._onDataChanged);
      }
    },
    _bindData: function _bindData(arg) {
      this._params.dataExchanger.bind(this._dataCategory = arg.category, this._dataName = arg.name, this._onDataChanged);
    },
    // The `_root` should be appended or removed here but there is no way to check if core.Legend is actually enabled or not
    setOptions: function setOptions(options) {
      var that = this;
      that.update(that._data, options, this._params.themeManager.theme('legend').title);
      that._unbindData();
      var source = options.source;
      that._bindData(source ? {
        category: source.layer,
        name: source.grouping
      } : unknownSource);
      that.updateLayout();
      return that;
    }
  });
  function LegendsControl(parameters) {
    this._params = parameters;
    this._items = [];
    parameters.container.virtualLink('legend-base');
  }
  LegendsControl.prototype = {
    constructor: LegendsControl,
    dispose: function dispose() {
      _each(this._items, function (_, item) {
        item.dispose();
      });
      this._params = this._items = null;
    },
    setOptions: function setOptions(options) {
      var optionList = options && options.length ? options : [];
      var items = this._items;
      var i;
      var ii = optionList.length;
      var params = this._params;
      var theme = params.themeManager.theme('legend');
      for (i = items.length; i < ii; ++i) {
        items[i] = new Legend(params);
      }
      for (i = items.length - 1; i >= ii; --i) {
        items[i].dispose();
        items.splice(i, 1);
      }
      params.layoutControl.suspend();
      for (i = 0; i < ii; ++i) {
        items[i].setOptions(_extend(true, {}, theme, optionList[i]));
      }
      params.layoutControl.resume();
    }
  };

  ///#DEBUG
  var originalLegend = Legend;
  function _TESTS_stubLegendType(stub) {
    exports._TESTS_Legend = Legend = stub;
  }
  function _TESTS_restoreLegendType() {
    exports._TESTS_Legend = Legend = originalLegend;
  }
  ///#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/iterator","../../core/utils/object","../components/legend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/utils/object"), require("../components/legend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=legend.js.map