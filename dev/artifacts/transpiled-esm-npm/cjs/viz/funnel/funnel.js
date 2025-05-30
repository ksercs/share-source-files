"use strict";

exports.default = void 0;
var _tiling = require("./tiling");
var _tiling2 = _interopRequireDefault(require("./tiling.funnel"));
var _tiling3 = _interopRequireDefault(require("./tiling.pyramid"));
var _common = require("../../core/utils/common");
var _m_base_widget = _interopRequireDefault(require("../../__internal/viz/core/m_base_widget"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _item = _interopRequireDefault(require("./item"));
var _data_source = require("../core/data_source");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var dxFunnel = _m_base_widget.default.inherit({
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
  _getLegendData() {
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