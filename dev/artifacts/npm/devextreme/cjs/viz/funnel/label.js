/**
* DevExtreme (cjs/viz/funnel/label.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.plugin = void 0;
var _label = require("../series/points/label");
var _utils = require("../core/utils");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var OUTSIDE_POSITION = 'outside';
var INSIDE_POSITION = 'inside';
var OUTSIDE_LABEL_INDENT = 5;
var COLUMNS_LABEL_INDENT = 20;
var CONNECTOR_INDENT = 4;
var PREVENT_EMPTY_PIXEL_OFFSET = 1;
function getLabelIndent(pos) {
  pos = (0, _utils.normalizeEnum)(pos);
  if (pos === OUTSIDE_POSITION) {
    return OUTSIDE_LABEL_INDENT;
  } else if (pos === INSIDE_POSITION) {
    return 0;
  }
  return COLUMNS_LABEL_INDENT;
}
function isOutsidePosition(pos) {
  pos = (0, _utils.normalizeEnum)(pos);
  return pos === OUTSIDE_POSITION || pos !== INSIDE_POSITION;
}
function correctYForInverted(y, bBox, inverted) {
  return inverted ? y - bBox.height : y;
}
function getOutsideRightLabelPosition(coords, bBox, options, inverted) {
  return {
    x: coords[2] + options.horizontalOffset + OUTSIDE_LABEL_INDENT,
    y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
  };
}
function getOutsideLeftLabelPosition(coords, bBox, options, inverted) {
  return {
    x: coords[0] - bBox.width - options.horizontalOffset - OUTSIDE_LABEL_INDENT,
    y: correctYForInverted(coords[1] + options.verticalOffset, bBox, inverted)
  };
}
function getInsideLabelPosition(coords, bBox, options) {
  var width = coords[2] - coords[0];
  var height = coords[7] - coords[1];
  return {
    x: coords[0] + width / 2 + options.horizontalOffset - bBox.width / 2,
    y: coords[1] + options.verticalOffset + height / 2 - bBox.height / 2
  };
}
function getColumnLabelRightPosition(labelRect, rect, textAlignment) {
  return function (coords, bBox, options, inverted) {
    return {
      x: textAlignment === 'left' ? rect[2] + options.horizontalOffset + COLUMNS_LABEL_INDENT : labelRect[2] - bBox.width,
      y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
    };
  };
}
function getColumnLabelLeftPosition(labelRect, rect, textAlignment) {
  return function (coords, bBox, options, inverted) {
    return {
      x: textAlignment === 'left' ? labelRect[0] : rect[0] - bBox.width - options.horizontalOffset - COLUMNS_LABEL_INDENT,
      y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
    };
  };
}
function getConnectorStrategy(options, inverted) {
  var isLeftPos = options.horizontalAlignment === 'left';
  var connectorIndent = isLeftPos ? CONNECTOR_INDENT : -CONNECTOR_INDENT;
  var verticalCorrection = inverted ? -PREVENT_EMPTY_PIXEL_OFFSET : 0;
  function getFigureCenter(figure) {
    return isLeftPos ? [figure[0] + PREVENT_EMPTY_PIXEL_OFFSET, figure[1] + verticalCorrection] : [figure[2] - PREVENT_EMPTY_PIXEL_OFFSET, figure[3] + verticalCorrection];
  }
  return {
    isLabelInside: function isLabelInside() {
      return !isOutsidePosition(options.position);
    },
    getFigureCenter: getFigureCenter,
    prepareLabelPoints: function prepareLabelPoints(bBox) {
      var x = bBox.x + connectorIndent;
      var y = bBox.y;
      var x1 = x + bBox.width;
      return _toConsumableArray(Array(bBox.height + 1)).map(function (_, i) {
        return [x, y + i];
      }).concat(_toConsumableArray(Array(bBox.height + 1)).map(function (_, i) {
        return [x1, y + i];
      }));
    },
    isHorizontal: function isHorizontal() {
      return true;
    },
    findFigurePoint: function findFigurePoint(figure) {
      return getFigureCenter(figure);
    },
    adjustPoints: function adjustPoints(points) {
      return points.map(Math.round);
    }
  };
}
function getLabelOptions(labelOptions, defaultColor, defaultTextAlignment) {
  var opt = labelOptions || {};
  var labelFont = (0, _extend.extend)({}, opt.font) || {};
  var labelBorder = opt.border || {};
  var labelConnector = opt.connector || {};
  var backgroundAttr = {
    fill: opt.backgroundColor || defaultColor,
    'stroke-width': labelBorder.visible ? labelBorder.width || 0 : 0,
    stroke: labelBorder.visible && labelBorder.width ? labelBorder.color : 'none',
    dashStyle: labelBorder.dashStyle
  };
  var connectorAttr = {
    stroke: labelConnector.visible && labelConnector.width ? labelConnector.color || defaultColor : 'none',
    'stroke-width': labelConnector.visible ? labelConnector.width || 0 : 0,
    opacity: labelConnector.opacity
  };
  labelFont.color = opt.backgroundColor === 'none' && (0, _utils.normalizeEnum)(labelFont.color) === '#ffffff' && opt.position !== 'inside' ? defaultColor : labelFont.color;
  return {
    format: opt.format,
    textAlignment: opt.textAlignment || (isOutsidePosition(opt.position) ? defaultTextAlignment : 'center'),
    customizeText: opt.customizeText,
    attributes: {
      font: labelFont
    },
    visible: labelFont.size !== 0 ? opt.visible : false,
    showForZeroValues: opt.showForZeroValues,
    horizontalOffset: opt.horizontalOffset,
    verticalOffset: opt.verticalOffset,
    background: backgroundAttr,
    connector: connectorAttr,
    wordWrap: labelOptions.wordWrap,
    textOverflow: labelOptions.textOverflow
  };
}
function correctLabelPosition(pos, bBox, rect) {
  if (pos.x < rect[0]) {
    pos.x = rect[0];
  }
  if (pos.x + bBox.width > rect[2]) {
    pos.x = rect[2] - bBox.width;
  }
  if (pos.y < rect[1]) {
    pos.y = rect[1];
  }
  if (pos.y + bBox.height > rect[3]) {
    pos.y = rect[3] - bBox.height;
  }
  return pos;
}
function removeEmptySpace(labels, requiredSpace, startPoint) {
  labels.reduce(function (requiredSpace, label, index, labels) {
    var prevLabel = labels[index + 1];
    if (requiredSpace > 0) {
      var bBox = label.getBoundingRect();
      var point = prevLabel ? prevLabel.getBoundingRect().y + prevLabel.getBoundingRect().height : startPoint;
      var emptySpace = bBox.y - point;
      var shift = Math.min(emptySpace, requiredSpace);
      labels.slice(0, index + 1).forEach(function (label) {
        var bBox = label.getBoundingRect();
        label.shift(bBox.x, bBox.y - shift);
      });
      requiredSpace -= shift;
    }
    return requiredSpace;
  }, requiredSpace);
}
var plugin = {
  name: 'lables',
  init: _common.noop,
  dispose: _common.noop,
  extenders: {
    _initCore: function _initCore() {
      this._labelsGroup = this._renderer.g().attr({
        class: this._rootClassPrefix + '-labels'
      }).append(this._renderer.root);
      this._labels = [];
    },
    _applySize: function _applySize() {
      var options = this._getOption('label');
      var adaptiveLayout = this._getOption('adaptiveLayout');
      var rect = this._rect;
      var labelWidth = 0;
      var width = rect[2] - rect[0];
      this._labelRect = rect.slice();
      if (!this._labels.length || !isOutsidePosition(options.position)) {
        if ((0, _utils.normalizeEnum)(this._getOption('resolveLabelOverlapping', true) !== 'none')) {
          this._labels.forEach(function (l) {
            return !l.isVisible() && l.draw(true);
          });
        }
        return;
      }
      var groupWidth = this._labels.map(function (label) {
        label.resetEllipsis();
        return label.getBoundingRect().width;
      }).reduce(function (max, width) {
        return Math.max(max, width);
      }, 0);
      labelWidth = groupWidth + options.horizontalOffset + getLabelIndent(options.position);
      if (!adaptiveLayout.keepLabels && width - labelWidth < adaptiveLayout.width) {
        this._labels.forEach(function (label) {
          label.draw(false);
        });
        return;
      } else {
        if (width - labelWidth < adaptiveLayout.width) {
          labelWidth = width - adaptiveLayout.width;
          labelWidth = labelWidth > 0 ? labelWidth : 0;
        }
        this._labels.forEach(function (label) {
          label.draw(true);
        });
      }
      if (options.horizontalAlignment === 'left') {
        rect[0] += labelWidth;
      } else {
        rect[2] -= labelWidth;
      }
    },
    _buildNodes: function _buildNodes() {
      this._createLabels();
    },
    _change_TILING: function _change_TILING() {
      var that = this;
      var options = that._getOption('label');
      var getCoords = getInsideLabelPosition;
      var inverted = that._getOption('inverted', true);
      var textAlignment;
      if (isOutsidePosition(options.position)) {
        if ((0, _utils.normalizeEnum)(options.position) === OUTSIDE_POSITION) {
          getCoords = options.horizontalAlignment === 'left' ? getOutsideLeftLabelPosition : getOutsideRightLabelPosition;
        } else {
          textAlignment = this._defaultLabelTextAlignment();
          getCoords = options.horizontalAlignment === 'left' ? getColumnLabelLeftPosition(this._labelRect, this._rect, textAlignment) : getColumnLabelRightPosition(this._labelRect, this._rect, textAlignment);
        }
      }
      that._labels.forEach(function (label, index) {
        var item = that._items[index];
        var borderWidth = item.getNormalStyle()['stroke-width'];
        var halfBorderWidth = inverted ? borderWidth / 2 : -borderWidth / 2;
        var coords = halfBorderWidth ? item.coords.map(function (coord, index) {
          if (index === 1 || index === 3) {
            return coord - halfBorderWidth;
          } else if (index === 2) {
            return coord - borderWidth;
          } else if (index === 0) {
            return coord + borderWidth;
          }
          return coord;
        }) : item.coords;
        if (!options.showForZeroValues && item.value === 0) {
          label.draw(false);
          return;
        }
        if (isOutsidePosition(options.position)) {
          that._correctLabelWidth(label, item.coords, options);
        }
        var bBox = label.getBoundingRect();
        var pos = correctLabelPosition(getCoords(coords, bBox, options, inverted), bBox, that._labelRect);
        label.setFigureToDrawConnector(coords);
        label.shift(pos.x, pos.y);
      });
      that._resolveLabelOverlapping();
    }
  },
  members: {
    _resolveLabelOverlapping() {
      var that = this;
      var resolveLabelOverlapping = (0, _utils.normalizeEnum)(that._getOption('resolveLabelOverlapping', true));
      var labels = this._getOption('inverted', true) ? that._labels.slice().reverse() : that._labels;
      if (resolveLabelOverlapping === 'hide') {
        labels.reduce(function (height, label) {
          if (label.getBoundingRect().y < height) {
            label.hide();
          } else {
            height = label.getBoundingRect().y + label.getBoundingRect().height;
          }
          return height;
        }, 0);
      } else if (resolveLabelOverlapping === 'shift') {
        var maxHeight = this._labelRect[3];
        labels.filter(function (label) {
          return label.isVisible();
        }).reduce(function (_ref, label, index, labels) {
          var _ref2 = _slicedToArray(_ref, 2),
            height = _ref2[0],
            emptySpace = _ref2[1];
          var bBox = label.getBoundingRect();
          var y = bBox.y;
          if (bBox.y < height) {
            label.shift(bBox.x, height);
            y = height;
          }
          if (y - height > 0) {
            emptySpace += y - height;
          }
          if (y + bBox.height > maxHeight) {
            if (emptySpace && emptySpace > y + bBox.height - maxHeight) {
              removeEmptySpace(labels.slice(0, index).reverse(), y + bBox.height - maxHeight, that._labelRect[1]);
              emptySpace -= y + bBox.height - maxHeight;
              label.shift(bBox.x, y - (y + bBox.height - maxHeight));
              height = y - (y + bBox.height - maxHeight) + bBox.height;
            } else {
              label.hide();
            }
          } else {
            height = y + bBox.height;
          }
          return [height, emptySpace];
        }, [this._labelRect[1], 0]);
      }
    },
    _defaultLabelTextAlignment: function _defaultLabelTextAlignment() {
      return this._getOption('rtlEnabled', true) ? 'right' : 'left';
    },
    _correctLabelWidth: function _correctLabelWidth(label, item, options) {
      var isLeftPos = options.horizontalAlignment === 'left';
      var minX = isLeftPos ? this._labelRect[0] : item[2];
      var maxX = isLeftPos ? item[0] : this._labelRect[2];
      var maxWidth = maxX - minX;
      if (label.getBoundingRect().width > maxWidth) {
        label.fit(maxWidth);
      }
    },
    _createLabels: function _createLabels() {
      var that = this;
      var labelOptions = that._getOption('label');
      var connectorStrategy = getConnectorStrategy(labelOptions, that._getOption('inverted', true));
      this._labelsGroup.clear();
      if (!labelOptions.visible) {
        return;
      }
      this._labels = that._items.map(function (item) {
        var label = new _label.Label({
          renderer: that._renderer,
          labelsGroup: that._labelsGroup,
          strategy: connectorStrategy
        });
        label.setOptions(getLabelOptions(labelOptions, item.color, that._defaultLabelTextAlignment()));
        label.setData({
          item: item,
          value: item.value,
          percent: item.percent
        });
        label.draw(true);
        return label;
      });
      if (this._labels.length && isOutsidePosition(labelOptions.position)) {
        this._requestChange(['LAYOUT']);
      }
    }
  },
  customize: function customize(constructor) {
    constructor.prototype._proxyData.push(function (x, y) {
      var that = this;
      var data;
      that._labels.forEach(function (label, index) {
        var rect = label.getBoundingRect();
        if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
          var pos = isOutsidePosition(that._getOption('label').position) ? 'outside' : 'inside';
          data = {
            id: index,
            type: pos + '-label'
          };
          return true;
        }
      });
      return data;
    });
    ['label', 'resolveLabelOverlapping'].forEach(function (optionName) {
      constructor.addChange({
        code: optionName.toUpperCase(),
        handler: function handler() {
          this._createLabels();
          this._requestChange(['LAYOUT']);
        },
        isThemeDependent: true,
        isOptionChange: true,
        option: optionName
      });
    });
  },
  fontFields: ['label.font']
};
exports.plugin = plugin;
