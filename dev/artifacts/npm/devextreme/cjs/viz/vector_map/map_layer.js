/**
* DevExtreme (cjs/viz/vector_map/map_layer.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.MapLayerCollection = MapLayerCollection;
exports.getMaxBound = getMaxBound;
var _common = require("../../core/utils/common");
var _extend2 = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _utils = require("../core/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _noop = _common.noop;
var _extend = _extend2.extend;
var _each = _iterator.each;
var _concat = Array.prototype.concat;
var TYPE_AREA = 'area';
var TYPE_LINE = 'line';
var TYPE_MARKER = 'marker';
var STATE_DEFAULT = 0;
var STATE_HOVERED = 1;
var STATE_SELECTED = 2;
var STATE_TO_INDEX = [0, 1, 2, 2];
var TOLERANCE = 1;
var SELECTIONS = {
  'none': null,
  'single': -1,
  'multiple': NaN
};
var _isArray = Array.isArray;
var _Number = Number;
var _String = String;
var _abs = Math.abs;
var _round = Math.round;
var _min = Math.min;
var _max = Math.max;
var _sqrt = Math.sqrt;
function getMaxBound(arr) {
  return arr.reduce(function (a, c) {
    return c ? [_min(a[0], c[0]), _min(a[1], c[1]), _max(a[2], c[2]), _max(a[3], c[3])] : a;
  }, arr[0]);
}
function getSelection(selectionMode) {
  var selection = (0, _utils.normalizeEnum)(selectionMode);
  selection = selection in SELECTIONS ? SELECTIONS[selection] : SELECTIONS.single;
  if (selection !== null) {
    selection = {
      state: {},
      single: selection
    };
  }
  return selection;
}
function getName(opt, index) {
  return (opt[index] || {}).name;
}
function EmptySource() {}
EmptySource.prototype.count = function () {
  return 0;
};
function ArraySource(raw) {
  this.raw = raw;
}
ArraySource.prototype = {
  constructor: ArraySource,
  count: function count() {
    return this.raw.length;
  },
  item: function item(index) {
    return this.raw[index];
  },
  geometry: function geometry(item) {
    return {
      coordinates: item.coordinates
    };
  },
  attributes: function attributes(item) {
    return item.attributes;
  },
  getBBox: function getBBox(index) {
    return arguments.length === 0 ? undefined : this.raw[index]['bbox'];
  }
};
function GeoJsonSource(raw) {
  this.raw = raw;
}
GeoJsonSource.prototype = {
  constructor: GeoJsonSource,
  count: function count() {
    return this.raw.features.length;
  },
  item: function item(index) {
    return this.raw.features[index];
  },
  geometry: function geometry(item) {
    return item.geometry;
  },
  attributes: function attributes(item) {
    return item.properties;
  },
  getBBox: function getBBox(index) {
    return arguments.length === 0 ? this.raw['bbox'] : this.raw.features[index]['bbox'];
  }
};
function isGeoJsonObject(obj) {
  return _isArray(obj.features);
}

// The problem is that when remote source returns an object (not an array) the data.DataSource internally wraps it into array (of one element)
// So specific `if` clause is required to recognize GeoJson object in the returned `items`
function unwrapFromDataSource(source) {
  var sourceType;
  if (source) {
    if (isGeoJsonObject(source)) {
      sourceType = GeoJsonSource;
    } else if (source.length === 1 && source[0] && isGeoJsonObject(source[0])) {
      sourceType = GeoJsonSource;
      source = source[0];
    } else if (_isArray(source)) {
      sourceType = ArraySource;
    }
  }
  sourceType = sourceType || EmptySource;
  return new sourceType(source);
}

// The first problem is that when our DataSource is updated with an object (not an array) it considers such object a bunch of options.
// So single object has to be wrapped into array in order to be passed to the data.DataSource as is.
// The second problem is that when our DataSource is updated with `null` or `undefined` it does nothing - callback is not triggered (it is because of charts).
// So `null` or `undefined` is changed to empty array.
function wrapToDataSource(option) {
  return option ? isGeoJsonObject(option) ? [option] : option : [];
}
function customizeHandles(proxies, callback, widget) {
  callback.call(widget, proxies);
}

// TODO: Consider moving it inside a strategy
function setAreaLabelVisibility(label) {
  label.text.attr({
    visibility: label.size[0] / label.spaceSize[0] < TOLERANCE && label.size[1] / label.spaceSize[1] < TOLERANCE ? null : 'hidden'
  });
}

// TODO: Consider moving it inside a strategy
function setLineLabelVisibility(label) {
  label.text.attr({
    visibility: label.size[0] / label.spaceSize[0] < TOLERANCE || label.size[1] / label.spaceSize[1] < TOLERANCE ? null : 'hidden'
  });
}
function getDataValue(proxy, dataField) {
  return proxy.attribute(dataField);
}
var TYPE_TO_TYPE_MAP = {
  Point: TYPE_MARKER,
  MultiPoint: TYPE_LINE,
  LineString: TYPE_LINE,
  MultiLineString: TYPE_LINE,
  Polygon: TYPE_AREA,
  MultiPolygon: TYPE_AREA
};
function pick(a, b) {
  return a !== undefined ? a : b;
}
function guessTypeByData(sample) {
  var type = TYPE_TO_TYPE_MAP[sample.type];
  var coordinates = sample.coordinates;
  if (!type) {
    if (typeof coordinates[0] === 'number') {
      type = TYPE_MARKER;
    } else if (typeof coordinates[0][0] === 'number') {
      type = TYPE_LINE;
    } else {
      type = TYPE_AREA;
    }
  }
  return type;
}
var emptyStrategy = {
  setup: _noop,
  reset: _noop,
  arrange: _noop,
  updateGrouping: _noop,
  getDefaultColor: _noop
};
var strategiesByType = {};
var strategiesByGeometry = {};
var strategiesByElementType = {};
var groupByColor;
var groupBySize;
var selectStrategy = function selectStrategy(options, data) {
  var type = (0, _utils.normalizeEnum)(options.type);
  var elementType = (0, _utils.normalizeEnum)(options.elementType);
  var sample;
  var strategy = _extend({}, emptyStrategy);
  if (data.count() > 0) {
    sample = data.geometry(data.item(0));
    type = strategiesByType[type] ? type : guessTypeByData(sample);
    _extend(strategy, strategiesByType[type]);
    strategy.fullType = strategy.type = type;
    if (strategiesByGeometry[type]) {
      _extend(strategy, strategiesByGeometry[type](sample));
    }
    if (strategiesByElementType[type]) {
      elementType = strategiesByElementType[type][elementType] ? elementType : strategiesByElementType[type]._default;
      _extend(strategy, strategiesByElementType[type][elementType]);
      strategy.elementType = elementType;
      strategy.fullType += ':' + elementType;
    }
  }
  return strategy;
};
function applyElementState(figure, styles, state, field) {
  figure[field].attr(styles[field][state]);
}
strategiesByType[TYPE_AREA] = {
  projectLabel: projectAreaLabel,
  transform: transformPointList,
  transformLabel: transformAreaLabel,
  draw: function draw(context, figure, data) {
    figure.root = context.renderer.path([], 'area').data(context.dataKey, data);
  },
  refresh: _noop,
  getLabelOffset: function getLabelOffset(label) {
    setAreaLabelVisibility(label);
    return [0, 0];
  },
  getStyles: function getStyles(settings) {
    var color = settings.color || null;
    var borderColor = settings.borderColor || null;
    var borderWidth = pick(settings.borderWidth, null);
    var opacity = pick(settings.opacity, null);
    return {
      root: [{
        'class': 'dxm-area',
        stroke: borderColor,
        'stroke-width': borderWidth,
        fill: color,
        opacity: opacity
      }, {
        'class': 'dxm-area dxm-area-hovered',
        stroke: settings.hoveredBorderColor || borderColor,
        'stroke-width': pick(settings.hoveredBorderWidth, borderWidth),
        fill: settings.hoveredColor || color,
        opacity: pick(settings.hoveredOpacity, opacity)
      }, {
        'class': 'dxm-area dxm-area-selected',
        stroke: settings.selectedBorderColor || borderColor,
        'stroke-width': pick(settings.selectedBorderWidth, borderWidth),
        fill: settings.selectedColor || color,
        opacity: pick(settings.selectedOpacity, opacity)
      }]
    };
  },
  setState: function setState(figure, styles, state) {
    applyElementState(figure, styles, state, 'root');
  },
  hasLabelsGroup: true,
  updateGrouping: function updateGrouping(context) {
    groupByColor(context);
  },
  getDefaultColor: _noop
};
strategiesByType[TYPE_LINE] = {
  projectLabel: projectLineLabel,
  transform: transformPointList,
  transformLabel: transformLineLabel,
  draw: function draw(context, figure, data) {
    figure.root = context.renderer.path([], 'line').data(context.dataKey, data);
  },
  refresh: _noop,
  getLabelOffset: function getLabelOffset(label) {
    setLineLabelVisibility(label);
    return [0, 0];
  },
  getStyles: function getStyles(settings) {
    var color = settings.color || settings.borderColor || null;
    var width = pick(settings.borderWidth, null);
    var opacity = pick(settings.opacity, null);
    return {
      root: [{
        'class': 'dxm-line',
        stroke: color,
        'stroke-width': width,
        opacity: opacity
      }, {
        'class': 'dxm-line dxm-line-hovered',
        stroke: settings.hoveredColor || settings.hoveredBorderColor || color,
        'stroke-width': pick(settings.hoveredBorderWidth, width),
        opacity: pick(settings.hoveredOpacity, opacity)
      }, {
        'class': 'dxm-line dxm-line-selected',
        stroke: settings.selectedColor || settings.selectedBorderColor || color,
        'stroke-width': pick(settings.selectedBorderWidth, width),
        opacity: pick(settings.selectedOpacity, opacity)
      }]
    };
  },
  setState: function setState(figure, styles, state) {
    applyElementState(figure, styles, state, 'root');
  },
  hasLabelsGroup: true,
  updateGrouping: function updateGrouping(context) {
    groupByColor(context);
  },
  getDefaultColor: _noop
};
strategiesByType[TYPE_MARKER] = {
  project: projectPoint,
  transform: transformPoint,
  draw: function draw(context, figure, data) {
    figure.root = context.renderer.g();
    this._draw(context, figure, data);
  },
  refresh: _noop,
  hasLabelsGroup: false,
  getLabelOffset: function getLabelOffset(label, settings) {
    return [_round((label.size[0] + _max(settings.size || 0, 0)) / 2) + 2, 0];
  },
  getStyles: function getStyles(settings) {
    var styles = {
      root: [{
        'class': 'dxm-marker'
      }, {
        'class': 'dxm-marker dxm-marker-hovered'
      }, {
        'class': 'dxm-marker dxm-marker-selected'
      }]
    };
    this._getStyles(styles, settings);
    return styles;
  },
  setState: function setState(figure, styles, state) {
    applyElementState(figure, styles, state, 'root');
    this._setState(figure, styles, state);
  },
  updateGrouping: function updateGrouping(context) {
    groupByColor(context);
    groupBySize(context);
  },
  getDefaultColor: function getDefaultColor(ctx, palette) {
    return ctx.params.themeManager.getAccentColor(palette);
  }
};
strategiesByGeometry[TYPE_AREA] = function (sample) {
  return {
    project(projection, coordinates) {
      return coordinates[0] && coordinates[0][0] && coordinates[0][0][0] && typeof coordinates[0][0][0][0] === 'number' ? projectMultiPolygon(projection, coordinates) : projectPolygon(projection, coordinates);
    }
  };
};
strategiesByGeometry[TYPE_LINE] = function (sample) {
  var coordinates = sample.coordinates;
  return {
    project: coordinates[0] && coordinates[0][0] && typeof coordinates[0][0][0] === 'number' ? projectPolygon : projectLineString
  };
};
strategiesByElementType[TYPE_MARKER] = {
  _default: 'dot',
  dot: {
    setup: function setup(context) {
      context.filter = context.renderer.shadowFilter('-40%', '-40%', '180%', '200%', 0, 1, 1, '#000000', 0.2);
    },
    reset: function reset(context) {
      context.filter.dispose();
      context.filter = null;
    },
    _draw: function _draw(ctx, figure, data) {
      figure.back = ctx.renderer.circle().sharp().data(ctx.dataKey, data).append(figure.root);
      figure.dot = ctx.renderer.circle().sharp().data(ctx.dataKey, data).append(figure.root);
    },
    refresh: function refresh(ctx, figure, data, proxy, settings) {
      figure.dot.attr({
        filter: settings.shadow ? ctx.filter.id : null
      });
    },
    _getStyles: function _getStyles(styles, style) {
      var size = style.size > 0 ? _Number(style.size) : 0;
      var hoveredSize = size;
      var selectedSize = size + (style.selectedStep > 0 ? _Number(style.selectedStep) : 0);
      var hoveredBackSize = hoveredSize + (style.backStep > 0 ? _Number(style.backStep) : 0);
      var selectedBackSize = selectedSize + (style.backStep > 0 ? _Number(style.backStep) : 0);
      var color = style.color || null;
      var borderColor = style.borderColor || null;
      var borderWidth = pick(style.borderWidth, null);
      var opacity = pick(style.opacity, null);
      var backColor = style.backColor || null;
      var backOpacity = pick(style.backOpacity, null);
      styles.dot = [{
        r: size / 2,
        stroke: borderColor,
        'stroke-width': borderWidth,
        fill: color,
        opacity: opacity
      }, {
        r: hoveredSize / 2,
        stroke: style.hoveredBorderColor || borderColor,
        'stroke-width': pick(style.hoveredBorderWidth, borderWidth),
        fill: style.hoveredColor || color,
        opacity: pick(style.hoveredOpacity, opacity)
      }, {
        r: selectedSize / 2,
        stroke: style.selectedBorderColor || borderColor,
        'stroke-width': pick(style.selectedBorderWidth, borderWidth),
        fill: style.selectedColor || color,
        opacity: pick(style.selectedOpacity, opacity)
      }];
      styles.back = [{
        r: size / 2,
        stroke: 'none',
        'stroke-width': 0,
        fill: backColor,
        opacity: backOpacity
      }, {
        r: hoveredBackSize / 2,
        stroke: 'none',
        'stroke-width': 0,
        fill: backColor,
        opacity: backOpacity
      }, {
        r: selectedBackSize / 2,
        stroke: 'none',
        'stroke-width': 0,
        fill: backColor,
        opacity: backOpacity
      }];
    },
    _setState: function _setState(figure, styles, state) {
      applyElementState(figure, styles, state, 'dot');
      applyElementState(figure, styles, state, 'back');
    }
  },
  bubble: {
    _draw: function _draw(ctx, figure, data) {
      figure.bubble = ctx.renderer.circle().sharp().data(ctx.dataKey, data).append(figure.root);
    },
    refresh: function refresh(ctx, figure, data, proxy, settings) {
      figure.bubble.attr({
        r: settings.size / 2
      });
    },
    _getStyles: function _getStyles(styles, style) {
      var color = style.color || null;
      var borderColor = style.borderColor || null;
      var borderWidth = pick(style.borderWidth, null);
      var opacity = pick(style.opacity, null);
      styles.bubble = [{
        stroke: borderColor,
        'stroke-width': borderWidth,
        fill: color,
        opacity: opacity
      }, {
        stroke: style.hoveredBorderColor || borderColor,
        'stroke-width': pick(style.hoveredBorderWidth, borderWidth),
        fill: style.hoveredColor || style.color,
        opacity: pick(style.hoveredOpacity, opacity)
      }, {
        stroke: style.selectedBorderColor || borderColor,
        'stroke-width': pick(style.selectedBorderWidth, borderWidth),
        fill: style.selectedColor || style.color,
        opacity: pick(style.selectedOpacity, opacity)
      }];
    },
    _setState: function _setState(figure, styles, state) {
      applyElementState(figure, styles, state, 'bubble');
    },
    arrange: function arrange(context, handles) {
      var values = [];
      var i;
      var ii = values.length = handles.length;
      var settings = context.settings;
      var dataField = settings.dataField;
      var minSize = settings.minSize > 0 ? _Number(settings.minSize) : 0;
      var maxSize = settings.maxSize > minSize ? _Number(settings.maxSize) : minSize;
      if (settings.sizeGroups) {
        return;
      }
      for (i = 0; i < ii; ++i) {
        values[i] = _max(getDataValue(handles[i].proxy, dataField) || 0, 0);
      }
      var minValue = _min.apply(null, values);
      var maxValue = _max.apply(null, values);
      var deltaValue = maxValue - minValue || 1;
      var deltaSize = maxSize - minSize;
      for (i = 0; i < ii; ++i) {
        handles[i]._settings.size = minSize + deltaSize * (values[i] - minValue) / deltaValue;
      }
    },
    updateGrouping: function updateGrouping(context) {
      var dataField = context.settings.dataField;
      strategiesByType[TYPE_MARKER].updateGrouping(context);
      groupBySize(context, function (proxy) {
        return getDataValue(proxy, dataField);
      });
    }
  },
  pie: {
    _draw: function _draw(ctx, figure, data) {
      figure.pie = ctx.renderer.g().append(figure.root);
      figure.border = ctx.renderer.circle().sharp().data(ctx.dataKey, data).append(figure.root);
    },
    refresh: function refresh(ctx, figure, data, proxy, settings) {
      var values = getDataValue(proxy, ctx.settings.dataField) || [];
      var colors = settings._colors;
      var sum = 0;
      var pie = figure.pie;
      var renderer = ctx.renderer;
      var dataKey = ctx.dataKey;
      var r = (settings.size > 0 ? _Number(settings.size) : 0) / 2;
      var start = 90;
      var end = start;
      var zeroSum = false;
      sum = values.reduce(function (total, item) {
        return total + (item || 0);
      }, 0);
      if (sum === 0) {
        zeroSum = true;
        sum = 360 / values.length;
      }
      values.forEach(function (item, i) {
        start = end;
        end += zeroSum ? sum : (item || 0) / sum * 360;
        renderer.arc(0, 0, 0, r, start, end).attr({
          'stroke-linejoin': 'round',
          fill: colors[i]
        }).data(dataKey, data).append(pie);
      });
      figure.border.attr({
        r: r
      });
    },
    _getStyles: function _getStyles(styles, style) {
      var opacity = pick(style.opacity, null);
      var borderColor = style.borderColor || null;
      var borderWidth = pick(style.borderWidth, null);
      styles.pie = [{
        opacity: opacity
      }, {
        opacity: pick(style.hoveredOpacity, opacity)
      }, {
        opacity: pick(style.selectedOpacity, opacity)
      }];
      styles.border = [{
        stroke: borderColor,
        'stroke-width': borderWidth
      }, {
        stroke: style.hoveredBorderColor || borderColor,
        'stroke-width': pick(style.hoveredBorderWidth, borderWidth)
      }, {
        stroke: style.selectedBorderColor || borderColor,
        'stroke-width': pick(style.selectedBorderWidth, borderWidth)
      }];
    },
    _setState: function _setState(figure, styles, state) {
      applyElementState(figure, styles, state, 'pie');
      applyElementState(figure, styles, state, 'border');
    },
    arrange: function arrange(context, handles) {
      var i;
      var ii = handles.length;
      var dataField = context.settings.dataField;
      var values;
      var count = 0;
      var palette;
      for (i = 0; i < ii; ++i) {
        values = getDataValue(handles[i].proxy, dataField);
        if (values && values.length > count) {
          count = values.length;
        }
      }
      if (count > 0) {
        palette = context.params.themeManager.createPalette(context.settings.palette, {
          useHighlight: true,
          extensionMode: 'alternate'
        });
        values = palette.generateColors(count);
        context.settings._colors = values;
        context.grouping.color = {
          callback: _noop,
          field: '',
          partition: [],
          values: []
        };
        context.params.dataExchanger.set(context.name, 'color', {
          partition: [],
          values: values
        });
      }
    }
  },
  image: {
    _draw: function _draw(ctx, figure, data) {
      figure.image = ctx.renderer.image(null, null, null, null, null, 'center').attr({
        'pointer-events': 'visible'
      }) // T567545
      .data(ctx.dataKey, data).append(figure.root);
    },
    refresh: function refresh(ctx, figure, data, proxy) {
      figure.image.attr({
        href: getDataValue(proxy, ctx.settings.dataField)
      });
    },
    _getStyles: function _getStyles(styles, style) {
      var size = style.size > 0 ? _Number(style.size) : 0;
      var hoveredSize = size + (style.hoveredStep > 0 ? _Number(style.hoveredStep) : 0);
      var selectedSize = size + (style.selectedStep > 0 ? _Number(style.selectedStep) : 0);
      var opacity = pick(style.opacity, null);
      styles.image = [{
        x: -size / 2,
        y: -size / 2,
        width: size,
        height: size,
        opacity: opacity
      }, {
        x: -hoveredSize / 2,
        y: -hoveredSize / 2,
        width: hoveredSize,
        height: hoveredSize,
        opacity: pick(style.hoveredOpacity, opacity)
      }, {
        x: -selectedSize / 2,
        y: -selectedSize / 2,
        width: selectedSize,
        height: selectedSize,
        opacity: pick(style.selectedOpacity, opacity)
      }];
    },
    _setState: function _setState(figure, styles, state) {
      applyElementState(figure, styles, state, 'image');
    }
  }
};
function projectPoint(projection, coordinates) {
  return projection.project(coordinates);
}
function projectPointList(projection, coordinates) {
  var output = [];
  var i;
  var ii = output.length = coordinates.length;
  for (i = 0; i < ii; ++i) {
    output[i] = projection.project(coordinates[i]);
  }
  return output;
}
function projectLineString(projection, coordinates) {
  return [projectPointList(projection, coordinates)];
}
function projectPolygon(projection, coordinates) {
  var output = [];
  var i;
  var ii = output.length = coordinates.length;
  for (i = 0; i < ii; ++i) {
    output[i] = projectPointList(projection, coordinates[i]);
  }
  return output;
}
function projectMultiPolygon(projection, coordinates) {
  var output = [];
  var i;
  var ii = output.length = coordinates.length;
  for (i = 0; i < ii; ++i) {
    output[i] = projectPolygon(projection, coordinates[i]);
  }
  return _concat.apply([], output);
}
function transformPoint(content, projection, coordinates) {
  var data = projection.transform(coordinates);
  content.root.attr({
    translateX: data[0],
    translateY: data[1]
  });
}
function transformList(projection, coordinates) {
  var output = [];
  var i;
  var ii = coordinates.length;
  var item;
  var k = 0;
  output.length = 2 * ii;
  for (i = 0; i < ii; ++i) {
    item = projection.transform(coordinates[i]);
    output[k++] = item[0];
    output[k++] = item[1];
  }
  return output;
}
function transformPointList(content, projection, coordinates) {
  var output = [];
  var i;
  var ii = output.length = coordinates.length;
  for (i = 0; i < ii; ++i) {
    output[i] = transformList(projection, coordinates[i]);
  }
  content.root.attr({
    points: output
  });
}
function transformAreaLabel(label, projection, coordinates) {
  var data = projection.transform(coordinates[0]);
  label.spaceSize = projection.getSquareSize(coordinates[1]);
  label.text.attr({
    translateX: data[0],
    translateY: data[1]
  });
  setAreaLabelVisibility(label);
}
function transformLineLabel(label, projection, coordinates) {
  var data = projection.transform(coordinates[0]);
  label.spaceSize = projection.getSquareSize(coordinates[1]);
  label.text.attr({
    translateX: data[0],
    translateY: data[1]
  });
  setLineLabelVisibility(label);
}
function getItemSettings(context, proxy, settings) {
  var result = combineSettings(context.settings, settings);
  applyGrouping(context.grouping, proxy, result);
  if (settings.color === undefined && settings.paletteIndex >= 0) {
    result.color = result._colors[settings.paletteIndex];
  }
  return result;
}
function applyGrouping(grouping, proxy, settings) {
  _each(grouping, function (name, data) {
    var index = findGroupingIndex(data.callback(proxy, data.field), data.partition);
    if (index >= 0) {
      settings[name] = data.values[index];
    }
  });
}
function findGroupingIndex(value, partition) {
  var start = 0;
  var end = partition.length - 1;
  var index = -1;
  var middle;
  if (partition[start] <= value && value <= partition[end]) {
    if (value === partition[end]) {
      index = end - 1;
    } else {
      while (end - start > 1) {
        middle = start + end >> 1;
        if (value < partition[middle]) {
          end = middle;
        } else {
          start = middle;
        }
      }
      index = start;
    }
  }
  return index;
}
function raiseChanged(context, handle, state, name) {
  context.params.eventTrigger(name, {
    target: handle.proxy,
    state: state
  });
}

// This is required because `$.extend` cannot be used - because of the `options.data` which is commonly a very large array
// TODO: Try to use our simple `extend` instead of `$.extend`
function combineSettings(common, partial) {
  var obj = _extend({}, common, partial);
  obj.label = _extend({}, common.label, obj.label);
  obj.label.font = _extend({}, common.label.font, obj.label.font);
  return obj;
}
function processCommonSettings(context, options) {
  var themeManager = context.params.themeManager;
  var strategy = context.str;
  var settings = combineSettings(_extend({
    label: {},
    color: strategy.getDefaultColor(context, options.palette)
  }, themeManager.theme('layer:' + strategy.fullType)), options);
  var colors;
  var i;
  var palette;
  if (settings.paletteSize > 0) {
    palette = themeManager.createDiscretePalette(settings.palette, settings.paletteSize);
    for (i = 0, colors = []; i < settings.paletteSize; ++i) {
      colors.push(palette.getColor(i));
    }
    settings._colors = colors;
  }
  return settings;
}
function valueCallback(proxy, dataField) {
  return proxy.attribute(dataField);
}
var performGrouping = function performGrouping(context, partition, settingField, dataField, valuesCallback) {
  var values;
  if (dataField && partition && partition.length > 1) {
    values = valuesCallback(partition.length - 1);
    context.grouping[settingField] = {
      callback: (0, _type.isFunction)(dataField) ? dataField : valueCallback,
      field: dataField,
      partition: partition,
      values: values
    };
    context.params.dataExchanger.set(context.name, settingField, {
      partition: partition,
      values: values,
      defaultColor: context.settings.color
    });
  }
};
function dropGrouping(context) {
  var name = context.name;
  var dataExchanger = context.params.dataExchanger;
  _each(context.grouping, function (field) {
    dataExchanger.set(name, field, null);
  });
  context.grouping = {};
}
groupByColor = function groupByColor(context) {
  performGrouping(context, context.settings.colorGroups, 'color', context.settings.colorGroupingField, function (count) {
    var _palette = context.params.themeManager.createDiscretePalette(context.settings.palette, count);
    var i;
    var list = [];
    for (i = 0; i < count; ++i) {
      list.push(_palette.getColor(i));
    }
    return list;
  });
};
groupBySize = function groupBySize(context, valueCallback) {
  var settings = context.settings;
  performGrouping(context, settings.sizeGroups, 'size', valueCallback || settings.sizeGroupingField, function (count) {
    var minSize = settings.minSize > 0 ? _Number(settings.minSize) : 0;
    var maxSize = settings.maxSize >= minSize ? _Number(settings.maxSize) : 0;
    var i = 0;
    var sizes = [];
    if (count > 1) {
      for (i = 0; i < count; ++i) {
        sizes.push((minSize * (count - i - 1) + maxSize * i) / (count - 1));
      }
    } else if (count === 1) {
      sizes.push((minSize + maxSize) / 2);
    }
    return sizes;
  });
};
function setFlag(flags, flag, state) {
  if (state) {
    flags |= flag;
  } else {
    flags &= ~flag;
  }
  return flags;
}
function hasFlag(flags, flag) {
  return !!(flags & flag);
}
function createLayerProxy(layer, name, index) {
  var proxy = {
    index: index,
    name: name,
    getElements: function getElements() {
      return layer.getProxies();
    },
    clearSelection: function clearSelection(_noEvent) {
      layer.clearSelection(_noEvent);
      return proxy;
    },
    getDataSource: function getDataSource() {
      return layer.getDataSource();
    },
    getBounds() {
      return layer.getBounds();
    }
  };
  return proxy;
}
var MapLayerElement;
var MapLayer = function MapLayer(params, container, name, index) {
  var that = this;
  that._params = params;
  that._onProjection();
  that.proxy = createLayerProxy(that, name, index);
  that._context = {
    name: name,
    layer: that.proxy,
    renderer: params.renderer,
    projection: params.projection,
    params: params,
    dataKey: params.dataKey,
    str: emptyStrategy,
    hover: false,
    selection: null,
    grouping: {},
    // TODO: Link name should be built upon layer index rather than name
    root: params.renderer.g().attr({
      'class': 'dxm-layer'
    }).linkOn(container, name).linkAppend()
  };
  that._container = container;
  that._options = {};
  // Though the `_handles` field is set in the `_createHandles` it is required here because projection events are fired before data is set
  that._handles = [];
  // The `_data` field may be accessed in the `setOptions` when data is not set
  that._data = new EmptySource();
  that._dataSourceLoaded = null;
};
MapLayer.prototype = _extend({
  constructor: MapLayer,
  getDataReadyCallback() {
    return this._dataSourceLoaded;
  },
  _onProjection: function _onProjection() {
    var that = this;
    that._removeHandlers = that._params.projection.on({
      'engine': function engine() {
        that._project();
      },
      'screen': function screen() {
        that._transform();
      },
      'center': function center() {
        that._transformCore();
      },
      'zoom': function zoom() {
        that._transform();
      }
    });
  },
  getData() {
    return this._data;
  },
  _dataSourceLoadErrorHandler: function _dataSourceLoadErrorHandler() {
    this._dataSourceChangedHandler();
  },
  _dataSourceChangedHandler: function _dataSourceChangedHandler() {
    var that = this;
    that._data = unwrapFromDataSource(that._dataSource && that._dataSource.items());
    that._update(true);
  },
  _dataSourceOptions: function _dataSourceOptions() {
    return {
      paginate: false
    };
  },
  _getSpecificDataSourceOption: function _getSpecificDataSourceOption() {
    return this._specificDataSourceOption;
  },
  _normalizeDataSource: function _normalizeDataSource(dataSource) {
    var store = dataSource.store();
    if (store._loadMode === 'raw') {
      store._loadMode = undefined;
    }
    return dataSource;
  },
  _offProjection: function _offProjection() {
    this._removeHandlers();
    this._removeHandlers = null;
  },
  dispose: function dispose() {
    var that = this;
    that._disposeDataSource();
    that._destroyHandles();
    dropGrouping(that._context);
    that._context.root.linkRemove().linkOff();
    that._context.labelRoot && that._context.labelRoot.linkRemove().linkOff();
    that._context.str.reset(that._context);
    that._offProjection();
    that._params = that._container = that._context = that.proxy = null;
    return that;
  },
  setOptions: function setOptions(options) {
    var that = this;
    options = that._options = options || {};
    that._dataSourceLoaded = new _deferred.Deferred();
    if ('dataSource' in options && options.dataSource !== that._options_dataSource) {
      that._options_dataSource = options.dataSource;
      that._params.notifyDirty();
      that._specificDataSourceOption = wrapToDataSource(options.dataSource);
      that._refreshDataSource();
    } else if (that._data.count() > 0) {
      that._params.notifyDirty();
      that._update(options.type !== undefined && options.type !== that._context.str.type || options.elementType !== undefined && options.elementType !== that._context.str.elementType);
    }
    that._transformCore();
  },
  _update: function _update(isContextChanged) {
    var that = this;
    var context = that._context;
    if (isContextChanged) {
      context.str.reset(context);
      context.root.clear();
      context.labelRoot && context.labelRoot.clear();
      that._params.tracker.reset(); // T173037; TODO: There is no need to reset the entire tracker - only its memory about items
      that._destroyHandles();
      context.str = selectStrategy(that._options, that._data);
      context.str.setup(context);
      that.proxy.type = context.str.type;
      that.proxy.elementType = context.str.elementType;
    }
    context.settings = processCommonSettings(context, that._options);
    context.hasSeparateLabel = !!(context.settings.label.enabled && context.str.hasLabelsGroup);
    context.hover = !!(0, _utils.parseScalar)(context.settings.hoverEnabled, true);
    // There is intentionally no attempt to preserve previous selection (or part of it)
    // Otherwise it would require some stack-like structure to keep selected items
    // Let's not complicate
    if (context.selection) {
      _each(context.selection.state, function (_, handle) {
        handle && handle.resetSelected();
      });
    }
    context.selection = getSelection(context.settings.selectionMode);
    if (context.hasSeparateLabel) {
      if (!context.labelRoot) {
        // TODO: Link name should be built upon layer index rather than name
        context.labelRoot = context.renderer.g().attr({
          'class': 'dxm-layer-labels'
        }).linkOn(that._container, {
          name: context.name + '-labels',
          after: context.name
        }).linkAppend();
        that._transformCore();
      }
    } else {
      if (context.labelRoot) {
        context.labelRoot.linkRemove().linkOff();
        context.labelRoot = null;
      }
    }
    if (isContextChanged) {
      that._createHandles();
    }
    dropGrouping(context);
    context.str.arrange(context, that._handles);
    context.str.updateGrouping(context);
    that._updateHandles();
    that._params.notifyReady();
    if (that._dataSourceLoaded) {
      // T890687
      that._dataSourceLoaded.resolve();
      that._dataSourceLoaded = null;
    } else {
      that._params.dataReady();
    }
  },
  getBounds() {
    return getMaxBound(this._handles.map(function (_ref) {
      var proxy = _ref.proxy;
      return proxy.coordinates().map(function (coords) {
        if (!_isArray(coords)) {
          return;
        }
        var coordsToBoundsSearch = _isArray(coords[0][0]) ? coords.reduce(function (ac, val) {
          return ac.concat(val);
        }, []) : coords;
        var initValue = coordsToBoundsSearch[0];
        return coordsToBoundsSearch.reduce(function (min, c) {
          return [_min(min[0], c[0]), _min(min[1], c[1]), _max(min[2], c[0]), _max(min[3], c[1])];
        }, [initValue[0], initValue[1], initValue[0], initValue[1]]);
      });
    }).map(getMaxBound));
  },
  _destroyHandles() {
    this._handles.forEach(function (h) {
      return h.dispose();
    });
    if (this._context.selection) {
      this._context.selection.state = {};
    }
    this._handles = [];
  },
  _createHandles: function _createHandles() {
    var that = this;
    var handles = that._handles = [];
    var data = that._data;
    var i;
    var ii = handles.length = data.count();
    var context = that._context;
    var geometry = data.geometry;
    var attributes = data.attributes;
    var handle;
    var dataItem;
    for (i = 0; i < ii; ++i) {
      dataItem = data.item(i);
      handles[i] = new MapLayerElement(context, i, geometry(dataItem), attributes(dataItem));
    }
    // Customization must be performed before anything else happens to element (that is the idea of customization)
    (0, _type.isFunction)(that._options.customize) && customizeHandles(that.getProxies(), that._options.customize, that._params.widget);
    for (i = 0; i < ii; ++i) {
      handle = handles[i];
      handle.project();
      handle.draw();
      handle.transform();
    }
    if (context.selection) {
      _each(context.selection.state, function (_, handle) {
        handle && handle.restoreSelected();
      });
    }
  },
  _updateHandles: function _updateHandles() {
    var handles = this._handles;
    var i;
    var ii = handles.length;
    for (i = 0; i < ii; ++i) {
      handles[i].refresh();
    }
    if (this._context.settings.label.enabled) {
      for (i = 0; i < ii; ++i) {
        handles[i].measureLabel();
      }
      for (i = 0; i < ii; ++i) {
        handles[i].adjustLabel();
      }
    }
  },
  _transformCore: function _transformCore() {
    var transform = this._params.projection.getTransform();
    this._context.root.attr(transform);
    this._context.labelRoot && this._context.labelRoot.attr(transform);
  },
  _project: function _project() {
    var handles = this._handles;
    var i;
    var ii = handles.length;
    for (i = 0; i < ii; ++i) {
      handles[i].project();
    }
  },
  _transform: function _transform() {
    var handles = this._handles;
    var i;
    var ii = handles.length;
    this._transformCore();
    for (i = 0; i < ii; ++i) {
      handles[i].transform();
    }
  },
  getProxies() {
    return this._handles.map(function (p) {
      return p.proxy;
    });
  },
  getProxy: function getProxy(index) {
    return this._handles[index].proxy;
  },
  raiseClick: function raiseClick(i, dxEvent) {
    this._params.eventTrigger('click', {
      target: this._handles[i].proxy,
      event: dxEvent
    });
  },
  hoverItem: function hoverItem(i, state) {
    this._handles[i].setHovered(state);
  },
  selectItem: function selectItem(i, state, _noEvent) {
    this._handles[i].setSelected(state, _noEvent);
  },
  clearSelection: function clearSelection() {
    var selection = this._context.selection;
    if (selection) {
      _each(selection.state, function (_, handle) {
        handle && handle.setSelected(false);
      });
      selection.state = {};
    }
  }
}, _data_helper.default);
function createProxy(handle, coords, attrs) {
  var proxy = {
    coordinates: function coordinates() {
      return coords;
    },
    attribute: function attribute(name, value) {
      if (arguments.length > 1) {
        attrs[name] = value;
        return proxy;
      } else {
        return arguments.length > 0 ? attrs[name] : attrs;
      }
    },
    selected: function selected(state, _noEvent) {
      if (arguments.length > 0) {
        handle.setSelected(state, _noEvent);
        return proxy;
      } else {
        return handle.isSelected();
      }
    },
    applySettings: function applySettings(settings) {
      handle.update(settings);
      return proxy;
    }
  };
  return proxy;
}
MapLayerElement = function MapLayerElement(context, index, geometry, attributes) {
  var that = this;
  var proxy = that.proxy = createProxy(that, geometry.coordinates, _extend({}, attributes));
  that._ctx = context;
  that._index = index;
  that._fig = that._label = null;
  that._state = STATE_DEFAULT;
  that._coordinates = geometry.coordinates;
  that._settings = {
    label: {}
  };
  proxy.index = index;
  proxy.layer = context.layer;
  // TODO: Replace "name" field with one referencing layer index and use layer index (instead of name) as layer id
  // as it is more suitable, simple and consistent
  that._data = {
    name: context.name,
    index: index
  };
};
MapLayerElement.prototype = {
  constructor: MapLayerElement,
  dispose: function dispose() {
    var that = this;
    that._ctx = that.proxy = that._settings = that._fig = that._label = that.data = null;
    return that;
  },
  project: function project() {
    var context = this._ctx;
    this._projection = context.str.project(context.projection, this._coordinates);
    if (context.hasSeparateLabel && this._label) {
      this._projectLabel();
    }
  },
  _projectLabel: function _projectLabel() {
    this._labelProjection = this._ctx.str.projectLabel(this._projection);
  },
  draw: function draw() {
    var that = this;
    var context = this._ctx;
    context.str.draw(context, that._fig = {}, that._data);
    that._fig.root.append(context.root);
  },
  transform: function transform() {
    var that = this;
    var context = that._ctx;
    context.str.transform(that._fig, context.projection, that._projection);
    if (context.hasSeparateLabel && that._label) {
      that._transformLabel();
    }
  },
  _transformLabel: function _transformLabel() {
    this._ctx.str.transformLabel(this._label, this._ctx.projection, this._labelProjection);
  },
  refresh: function refresh() {
    var that = this;
    var strategy = that._ctx.str;
    var settings = getItemSettings(that._ctx, that.proxy, that._settings);
    that._styles = strategy.getStyles(settings);
    strategy.refresh(that._ctx, that._fig, that._data, that.proxy, settings);
    that._refreshLabel(settings);
    that._setState();
  },
  _refreshLabel: function _refreshLabel(settings) {
    var that = this;
    var context = that._ctx;
    var labelSettings = settings.label;
    var label = that._label;
    if (context.settings.label.enabled) {
      if (!label) {
        label = that._label = {
          root: context.labelRoot || that._fig.root,
          text: context.renderer.text().attr({
            'class': 'dxm-label'
          }),
          size: [0, 0]
        };
        if (context.hasSeparateLabel) {
          that._projectLabel();
          that._transformLabel();
        }
      }
      label.value = _String(that.proxy.text || that.proxy.attribute(labelSettings.dataField) || '');
      if (label.value) {
        // The data should be set when the element is created but it requires changes in the Renderer
        label.text.attr({
          text: label.value,
          x: 0,
          y: 0
        }).css((0, _utils.patchFontOptions)(labelSettings.font)).attr({
          align: 'center',
          stroke: labelSettings.stroke,
          'stroke-width': labelSettings['stroke-width'],
          'stroke-opacity': labelSettings['stroke-opacity']
        }).data(context.dataKey, that._data).append(label.root);
        label.settings = settings;
      }
    } else {
      if (label) {
        label.text.remove();
        that._label = null;
      }
    }
  },
  measureLabel: function measureLabel() {
    var label = this._label;
    var bBox;
    if (label.value) {
      bBox = label.text.getBBox();
      label.size = [bBox.width, bBox.height, -bBox.y - bBox.height / 2];
    }
  },
  adjustLabel: function adjustLabel() {
    var label = this._label;
    var offset;
    if (label.value) {
      offset = this._ctx.str.getLabelOffset(label, label.settings);
      label.settings = null;
      label.text.attr({
        x: offset[0],
        y: offset[1] + label.size[2]
      });
    }
  },
  update: function update(settings) {
    var that = this;
    that._settings = combineSettings(that._settings, settings);
    // This check is required because the method can be called during the customization stage when DOM content neither is created nor should be changed
    if (that._fig) {
      that.refresh();
      if (that._label && that._label.value) {
        that.measureLabel();
        that.adjustLabel();
      }
    }
  },
  _setState: function _setState() {
    this._ctx.str.setState(this._fig, this._styles, STATE_TO_INDEX[this._state]);
  },
  _setForeground: function _setForeground() {
    var root = this._fig.root;
    this._state ? root.toForeground() : root.toBackground();
  },
  setHovered: function setHovered(state) {
    var that = this;
    var currentState = hasFlag(that._state, STATE_HOVERED);
    var newState = !!state;
    if (that._ctx.hover && currentState !== newState) {
      that._state = setFlag(that._state, STATE_HOVERED, newState);
      that._setState();
      that._setForeground();
      raiseChanged(that._ctx, that, newState, 'hoverChanged');
    }
    return that;
  },
  setSelected: function setSelected(state, _noEvent) {
    var that = this;
    var currentState = hasFlag(that._state, STATE_SELECTED);
    var newState = !!state;
    var selection = that._ctx.selection;
    var tmp;
    if (selection && currentState !== newState) {
      that._state = setFlag(that._state, STATE_SELECTED, newState);
      tmp = selection.state[selection.single];
      selection.state[selection.single] = null; // This is to prevent stack overflow
      if (tmp) {
        tmp.setSelected(false);
      }
      selection.state[selection.single || that._index] = state ? that : null;
      // This check is required because the method can be called during the customization stage when DOM content neither is created nor should be changed
      if (that._fig) {
        that._setState();
        that._setForeground();
        if (!_noEvent) {
          raiseChanged(that._ctx, that, newState, 'selectionChanged');
        }
      }
    }
  },
  isSelected: function isSelected() {
    return hasFlag(this._state, STATE_SELECTED);
  },
  resetSelected: function resetSelected() {
    this._state = setFlag(this._state, STATE_SELECTED, false);
  },
  restoreSelected: function restoreSelected() {
    this._fig.root.toForeground();
  }
};

// http://en.wikipedia.org/wiki/Centroid
function calculatePolygonCentroid(coordinates) {
  var i;
  var length = coordinates.length;
  var v1;
  var v2 = coordinates[length - 1];
  var cross;
  var cx = 0;
  var cy = 0;
  var area = 0;
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  for (i = 0; i < length; ++i) {
    v1 = v2;
    v2 = coordinates[i];
    cross = v1[0] * v2[1] - v2[0] * v1[1];
    area += cross;
    cx += (v1[0] + v2[0]) * cross;
    cy += (v1[1] + v2[1]) * cross;
    minX = _min(minX, v2[0]);
    maxX = _max(maxX, v2[0]);
    minY = _min(minY, v2[1]);
    maxY = _max(maxY, v2[1]);
  }
  // from centroid coords we need subtract the center of bbox coords to get a good geometrical center (T312029)
  return {
    area: _abs(area) / 2,
    center: [2 * cx / 3 / area - (minX + maxX) / 2, 2 * cy / 3 / area - (minY + maxY) / 2]
  };
}
function calculateLineStringData(coordinates) {
  var i;
  var ii = coordinates.length;
  var v1;
  var v2 = coordinates[0] || [];
  var totalLength = 0;
  var items = [0];
  var min0 = v2[0];
  var max0 = v2[0];
  var min1 = v2[1];
  var max1 = v2[1];
  for (i = 1; i < ii; ++i) {
    v1 = v2;
    v2 = coordinates[i];
    totalLength += _sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
    items[i] = totalLength;
    min0 = _min(min0, v2[0]);
    max0 = _max(max0, v2[0]);
    min1 = _min(min1, v2[1]);
    max1 = _max(max1, v2[1]);
  }
  i = findGroupingIndex(totalLength / 2, items);
  v1 = coordinates[i];
  v2 = coordinates[i + 1];
  var t = (totalLength / 2 - items[i]) / (items[i + 1] - items[i]);
  return ii ? [[v1[0] * (1 - t) + v2[0] * t, v1[1] * (1 - t) + v2[1] * t], [max0 - min0, max1 - min1], totalLength] : [];
}

// TODO: Optimize!
// There are redundant iterations in the following cycle - interior holes of a polygon should not be taken into account
// So there is only centroid to be calculated for each "Polygon"
function projectAreaLabel(coordinates) {
  var i;
  var ii = coordinates.length;
  var centroid;
  var resultCentroid;
  var maxArea = 0;
  for (i = 0; i < ii; ++i) {
    centroid = calculatePolygonCentroid(coordinates[i]);
    if (centroid.area > maxArea) {
      maxArea = centroid.area;
      resultCentroid = centroid;
    }
  }
  // TODO: Move "_sqrt" to the "calculatePolygonCentroid"
  return resultCentroid ? [resultCentroid.center, [_sqrt(resultCentroid.area), _sqrt(resultCentroid.area)]] : [[], []];
}
function projectLineLabel(coordinates) {
  var i;
  var ii = coordinates.length;
  var maxLength = 0;
  var data;
  var resultData;
  for (i = 0; i < ii; ++i) {
    data = calculateLineStringData(coordinates[i]);
    if (data[2] > maxLength) {
      maxLength = data[2];
      resultData = data;
    }
  }
  return resultData || [[], []];
}
function MapLayerCollection(params) {
  var that = this;
  var renderer = params.renderer;
  that._params = params;
  that._layers = [];
  // TODO: Use Set instance instead of plain object
  that._layerByName = {};
  that._rect = [0, 0, 0, 0];
  that._clip = renderer.clipRect();
  that._background = renderer.rect().attr({
    'class': 'dxm-background'
  }).data(params.dataKey, {
    name: 'background'
  }).append(renderer.root);
  that._container = renderer.g().attr({
    'class': 'dxm-layers',
    'clip-path': that._clip.id
  }).append(renderer.root).enableLinks();
  that._subscribeToTracker(params.tracker, renderer, params.eventTrigger);
  that._dataReady = params.dataReady;
}
MapLayerCollection.prototype = {
  constructor: MapLayerCollection,
  dispose: function dispose() {
    var that = this;
    that._clip.dispose();
    that._layers.forEach(function (l) {
      return l.dispose();
    });
    that._offTracker();
    that._params = that._offTracker = that._layers = that._layerByName = that._clip = that._background = that._container = null;
  },
  _subscribeToTracker: function _subscribeToTracker(tracker, renderer, eventTrigger) {
    var that = this;
    that._offTracker = tracker.on({
      'click': function click(arg) {
        // TODO: Adjust `x` and `y` inside the Tracker
        var offset = renderer.getRootOffset();
        var layer = that.byName(arg.data.name);
        arg.$event.x = arg.x - offset.left;
        arg.$event.y = arg.y - offset.top;
        // TODO: Remove the "raiseClick" method
        if (layer) {
          layer.raiseClick(arg.data.index, arg.$event);
        } else if (arg.data.name === 'background') {
          eventTrigger('click', {
            event: arg.$event
          });
        }
      },
      'hover-on': function hoverOn(arg) {
        var layer = that.byName(arg.data.name);
        if (layer) {
          layer.hoverItem(arg.data.index, true);
        }
      },
      'hover-off': function hoverOff(arg) {
        var layer = that.byName(arg.data.name);
        if (layer) {
          layer.hoverItem(arg.data.index, false);
        }
      }
    });
  },
  setOptions(options) {
    var that = this;
    var optionList = options ? _isArray(options) ? options : [options] : [];
    var layers = that._layers;
    var readyCallbacks = [];
    var needToCreateLayers = optionList.length !== layers.length || layers.some(function (l, i) {
      var name = getName(optionList, i);
      return (0, _type.isDefined)(name) && name !== l.proxy.name;
    });
    if (needToCreateLayers) {
      that._params.tracker.reset();
      that._layers.forEach(function (l) {
        return l.dispose();
      });
      var layerByName = that._layerByName = {};
      that._layers = layers = [];
      for (var i = 0, ii = optionList.length; i < ii; ++i) {
        var name = getName(optionList, i) || 'map-layer-' + i;
        var layer = layers[i] = new MapLayer(that._params, that._container, name, i);
        layerByName[name] = layer;
      }
    }
    layers.forEach(function (l, i) {
      l.setOptions(optionList[i]);
    });
    readyCallbacks = layers.map(function (l) {
      return l.getDataReadyCallback();
    });
    readyCallbacks.length && _deferred.when.apply(undefined, readyCallbacks).done(that._dataReady);
  },
  _updateClip: function _updateClip() {
    var rect = this._rect;
    var bw = this._borderWidth;
    this._clip.attr({
      x: rect[0] + bw,
      y: rect[1] + bw,
      width: _max(rect[2] - bw * 2, 0),
      height: _max(rect[3] - bw * 2, 0)
    });
  },
  setBackgroundOptions: function setBackgroundOptions(options) {
    this._background.attr({
      stroke: options.borderColor,
      'stroke-width': options.borderWidth,
      fill: options.color
    });
    this._borderWidth = _max(options.borderWidth, 0);
    this._updateClip();
  },
  setRect: function setRect(rect) {
    this._rect = rect;
    this._background.attr({
      x: rect[0],
      y: rect[1],
      width: rect[2],
      height: rect[3]
    });
    this._updateClip();
  },
  byIndex: function byIndex(index) {
    return this._layers[index];
  },
  byName: function byName(name) {
    return this._layerByName[name];
  },
  items: function items() {
    return this._layers;
  }
};
