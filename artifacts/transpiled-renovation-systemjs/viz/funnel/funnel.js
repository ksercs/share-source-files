!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/funnel/funnel.js"], ["./tiling","./tiling.funnel","./tiling.pyramid","../../core/utils/common","../core/base_widget","../../core/component_registrator","./item","../core/data_source"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/funnel/funnel.js", ["./tiling", "./tiling.funnel", "./tiling.pyramid", "../../core/utils/common", "../core/base_widget", "../../core/component_registrator", "./item", "../core/data_source"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _tiling = $__require("./tiling");
  var _tiling2 = _interopRequireDefault($__require("./tiling.funnel"));
  var _tiling3 = _interopRequireDefault($__require("./tiling.pyramid"));
  var _common = $__require("../../core/utils/common");
  var _base_widget = _interopRequireDefault($__require("../core/base_widget"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _item = _interopRequireDefault($__require("./item"));
  var _data_source = $__require("../core/data_source");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var NODES_CREATE_CHANGE = 'NODES_CREATE';
  (0, _tiling.addAlgorithm)('dynamicslope', _tiling2.default, true);
  (0, _tiling.addAlgorithm)('dynamicheight', _tiling3.default);
  function invertFigure(figure) {
    return figure.map(function (coord, index) {
      return index % 2 ? 1 - coord : coord;
    });
  }
  function getLegendItemState(itemState) {
    return {
      fill: itemState.fill,
      hatching: itemState.hatching
    };
  }
  var dxFunnel = _base_widget.default.inherit({
    _rootClass: 'dxf-funnel',
    _rootClassPrefix: 'dxf',
    _proxyData: [],
    _optionChangesMap: {
      dataSource: 'DATA_SOURCE',
      neckWidth: NODES_CREATE_CHANGE,
      neckHeight: NODES_CREATE_CHANGE,
      inverted: NODES_CREATE_CHANGE,
      algorithm: NODES_CREATE_CHANGE,
      item: NODES_CREATE_CHANGE,
      valueField: NODES_CREATE_CHANGE,
      argumentField: NODES_CREATE_CHANGE,
      colorField: NODES_CREATE_CHANGE,
      palette: NODES_CREATE_CHANGE,
      paletteExtensionMode: NODES_CREATE_CHANGE,
      sortData: NODES_CREATE_CHANGE
    },
    _themeDependentChanges: [NODES_CREATE_CHANGE],
    _getDefaultSize: function _getDefaultSize() {
      return {
        width: 400,
        height: 400
      };
    },
    _themeSection: 'funnel',
    _fontFields: ['legend.title.font', 'legend.title.subtitle.font', 'legend.font'],
    _optionChangesOrder: ['DATA_SOURCE'],
    _initialChanges: ['DATA_SOURCE'],
    _initCore: function _initCore() {
      this._group = this._renderer.g().append(this._renderer.root);
      this._items = [];
    },
    _eventsMap: {
      onHoverChanged: {
        name: 'hoverChanged'
      },
      onSelectionChanged: {
        name: 'selectionChanged'
      }
    },
    _disposeCore: _common.noop,
    _applySize: function _applySize(rect) {
      this._rect = rect.slice();
      this._change(['TILING']);
      return this._rect;
    },
    _getAlignmentRect: function _getAlignmentRect() {
      return this._rect;
    },
    _change_TILING: function _change_TILING() {
      var that = this;
      var items = that._items;
      var rect = that._rect;
      var convertCoord = function convertCoord(coord, index) {
        var offset = index % 2;
        return rect[0 + offset] + (rect[2 + offset] - rect[0 + offset]) * coord;
      };
      this._group.clear();
      items.forEach(function (item, index) {
        var coords = item.figure.map(convertCoord);
        var element = that._renderer.path([], 'area').attr({
          points: coords
        }).append(that._group);
        item.coords = coords;
        item.element = element;
      });
      this._requestChange(['TILES']);
    },
    _customChangesOrder: [NODES_CREATE_CHANGE, 'LAYOUT', 'TILING', 'TILES', 'DRAWN'],
    _dataSourceChangedHandler: function _dataSourceChangedHandler() {
      this._requestChange([NODES_CREATE_CHANGE]);
    },
    _change_DRAWN: function _change_DRAWN() {
      this._drawn();
    },
    _change_DATA_SOURCE: function _change_DATA_SOURCE() {
      this._change(['DRAWN']);
      this._updateDataSource();
    },
    _change_NODES_CREATE: function _change_NODES_CREATE() {
      this._buildNodes();
    },
    _change_TILES: function _change_TILES() {
      this._applyTilesAppearance();
    },
    _suspend: function _suspend() {
      if (!this._applyingChanges) {
        this._suspendChanges();
      }
    },
    _resume: function _resume() {
      if (!this._applyingChanges) {
        this._resumeChanges();
      }
    },
    _applyTilesAppearance: function _applyTilesAppearance() {
      this._items.forEach(function (item) {
        var state = item.getState();
        item.element.smartAttr(item.states[state]);
      });
    },
    _hitTestTargets: function _hitTestTargets(x, y) {
      var that = this;
      var data;
      this._proxyData.some(function (callback) {
        data = callback.call(that, x, y);
        if (data) {
          return true;
        }
      });
      return data;
    },
    clearHover: function clearHover() {
      this._suspend();
      this._items.forEach(function (item) {
        item.isHovered() && item.hover(false);
      });
      this._resume();
    },
    clearSelection: function clearSelection() {
      this._suspend();
      this._items.forEach(function (item) {
        item.isSelected() && item.select(false);
      });
      this._resume();
    },
    _getData: function _getData() {
      var that = this;
      var data = that._dataSourceItems() || [];
      var valueField = that._getOption('valueField', true);
      var argumentField = that._getOption('argumentField', true);
      var colorField = that._getOption('colorField', true);
      var processedData = data.reduce(function (d, item) {
        var value = Number(item[valueField]);
        if (value >= 0) {
          d[0].push({
            value: value,
            color: item[colorField],
            argument: item[argumentField],
            dataItem: item
          });
          d[1] += value;
        }
        return d;
      }, [[], 0]);
      var items = processedData[0];
      if (data.length > 0 && items.length === 0) {
        that._incidentOccurred('E2005', valueField);
      }
      if (!processedData[1]) {
        return [];
      }
      if (that._getOption('sortData', true)) {
        items.sort(function (a, b) {
          return b.value - a.value;
        });
      }
      return items;
    },
    _buildNodes: function _buildNodes() {
      var that = this;
      var data = that._getData();
      var algorithm = (0, _tiling.getAlgorithm)(that._getOption('algorithm', true));
      var percents = algorithm.normalizeValues(data);
      var itemOptions = that._getOption('item');
      var figures = algorithm.getFigures(percents, that._getOption('neckWidth', true), that._getOption('neckHeight', true));
      var palette = that._themeManager.createPalette(that._getOption('palette', true), {
        useHighlight: true,
        extensionMode: that._getOption('paletteExtensionMode', true),
        count: figures.length
      });
      that._items = figures.map(function (figure, index) {
        var curData = data[index];
        var node = new _item.default(that, {
          figure: figure,
          data: curData,
          percent: percents[index],
          id: index,
          color: curData.color || palette.getNextColor(),
          itemOptions: itemOptions
        });
        return node;
      });
      if (that._getOption('inverted', true)) {
        that._items.forEach(function (item) {
          item.figure = invertFigure(item.figure);
        });
      }
      that._renderer.initDefsElements();
      that._change(['TILING', 'DRAWN']);
    },
    _showTooltip: _common.noop,
    hideTooltip: _common.noop,
    getAllItems: function getAllItems() {
      return this._items.slice();
    },
    _getLegendData: function _getLegendData() {
      return this._items.map(function (item) {
        var states = item.states;
        return {
          id: item.id,
          visible: true,
          text: item.argument,
          item: item,
          states: {
            normal: getLegendItemState(states.normal),
            hover: getLegendItemState(states.hover),
            selection: getLegendItemState(states.selection)
          }
        };
      });
    },
    _getMinSize: function _getMinSize() {
      var adaptiveLayout = this._getOption('adaptiveLayout');
      return [adaptiveLayout.width, adaptiveLayout.height];
    }
  });
  (0, _component_registrator.default)('dxFunnel', dxFunnel);
  var _default = dxFunnel; // PLUGINS_SECTION
  exports.default = _default;
  dxFunnel.addPlugin(_data_source.plugin);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./tiling","./tiling.funnel","./tiling.pyramid","../../core/utils/common","../core/base_widget","../../core/component_registrator","./item","../core/data_source"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./tiling"), require("./tiling.funnel"), require("./tiling.pyramid"), require("../../core/utils/common"), require("../core/base_widget"), require("../../core/component_registrator"), require("./item"), require("../core/data_source"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=funnel.js.map