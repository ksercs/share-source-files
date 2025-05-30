/**
* DevExtreme (esm/viz/vector_map/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { each } from '../../core/utils/iterator';
var _round = Math.round;
var _min = Math.min;
var _max = Math.max;
var _each = each;
var horizontalAlignmentMap = {
  'left': 0,
  'center': 1,
  'right': 2
};
var verticalAlignmentMap = {
  'top': 0,
  'bottom': 1
};
function getCellIndex(options) {
  return verticalAlignmentMap[options.verticalAlignment] * 3 + horizontalAlignmentMap[options.horizontalAlignment];
}
function createCells(canvas, items) {
  var hStep = (canvas.right - canvas.left) / 3;
  var vStep = (canvas.bottom - canvas.top) / 2;
  var h1 = canvas.left;
  var h2 = _round(h1 + hStep);
  var h3 = _round(h1 + hStep + hStep);
  var h4 = canvas.right;
  var v1 = canvas.top;
  var v2 = _round(v1 + vStep);
  var v3 = canvas.bottom;
  var cells = [{
    rect: [h1, v1, h2, v2]
  }, {
    rect: [h2, v1, h3, v2],
    center: true
  }, {
    rect: [h3, v1, h4, v2],
    horInversion: true
  }, {
    rect: [h1, v2, h2, v3],
    verInversion: true
  }, {
    rect: [h2, v2, h3, v3],
    center: true,
    verInversion: true
  }, {
    rect: [h3, v2, h4, v3],
    horInversion: true,
    verInversion: true
  }];
  var itemsList = [[], [], [], [], [], []];
  _each(items, function (_, item) {
    var options = item.getLayoutOptions();
    if (options) {
      itemsList[getCellIndex(options)].push({
        item: item,
        width: options.width,
        height: options.height
      });
    }
  });
  _each(cells, function (i, cell) {
    if (itemsList[i].length) {
      cell.items = itemsList[i];
    } else {
      if (cell.center) {
        cell.rect[0] = cell.rect[2] = (cell.rect[0] + cell.rect[2]) / 2;
      } else {
        cell.rect[cell.horInversion ? 0 : 2] = cell.rect[cell.horInversion ? 2 : 0];
      }
      cell.rect[cell.verInversion ? 1 : 3] = cell.rect[cell.verInversion ? 3 : 1];
    }
  });
  return cells;
}
function adjustCellSizes(cells) {
  _each([0, 1, 2, 3, 4, 5], function (_, index) {
    var cell = cells[index];
    var otherCell = cells[(index + 3) % 6];
    if (cell.items) {
      if (!otherCell.items) {
        cell.rect[1] = _min(cell.rect[1], otherCell.rect[3]);
        cell.rect[3] = _max(cell.rect[3], otherCell.rect[1]);
      }
    }
  });
  _each([1, 4], function (_, index) {
    var cell = cells[index];
    var otherCell1 = cells[index - 1];
    var otherCell2 = cells[index + 1];
    var size1;
    var size2;
    if (cell.items) {
      if (!otherCell1.items && !otherCell2.items) {
        size1 = cell.rect[0] - otherCell1.rect[2];
        size2 = otherCell2.rect[0] - cell.rect[2];
        if (size1 > size2) {
          if (size1 / size2 >= 2) {
            cell.rect[0] -= size1;
            cell.right = true;
          } else {
            cell.rect[0] -= size2;
            cell.rect[2] += size2;
          }
        } else {
          if (size2 / size1 >= 2) {
            cell.rect[2] += size2;
            cell.center = null;
          } else {
            cell.rect[0] -= size1;
            cell.rect[2] += size1;
          }
        }
      }
    } else {
      if (otherCell1.items) {
        otherCell1.rect[2] = (cell.rect[0] + cell.rect[2]) / 2;
      }
      if (otherCell2.items) {
        otherCell2.rect[0] = (cell.rect[0] + cell.rect[2]) / 2;
      }
    }
  });
}
function adjustCellsAndApplyLayout(cells, forceMode) {
  var hasHiddenItems = false;
  adjustCellSizes(cells);
  _each(cells, function (_, cell) {
    if (cell.items) {
      hasHiddenItems = applyCellLayout(cell, forceMode) || hasHiddenItems;
    }
  });
  return hasHiddenItems;
}
function applyCellLayout(cell, forceMode) {
  var cellRect = cell.rect;
  var cellWidth = cellRect[2] - cellRect[0];
  var cellHeight = cellRect[3] - cellRect[1];
  var xOffset = 0;
  var yOffset = 0;
  var currentHeight = 0;
  var totalL = cellRect[2];
  var totalT = cellRect[3];
  var totalR = cellRect[0];
  var totalB = cellRect[1];
  var moves = [];
  var hasHiddenItems = false;
  _each(cell.items, function (_, item) {
    if (item.width > cellWidth || item.height > cellHeight) {
      moves.push(null);
      hasHiddenItems = true;
      return forceMode || false;
    }
    if (xOffset + item.width > cellWidth) {
      yOffset += currentHeight;
      xOffset = currentHeight = 0;
    }
    if (yOffset + item.height > cellHeight) {
      moves.push(null);
      hasHiddenItems = true;
      return forceMode || false;
    }
    currentHeight = _max(currentHeight, item.height);
    var dx = cell.horInversion ? cellRect[2] - item.width - xOffset : cellRect[0] + xOffset;
    var dy = cell.verInversion ? cellRect[3] - item.height - yOffset : cellRect[1] + yOffset;
    xOffset += item.width;
    totalL = _min(totalL, dx);
    totalT = _min(totalT, dy);
    totalR = _max(totalR, dx + item.width);
    totalB = _max(totalB, dy + item.height);
    moves.push([dx, dy]);
  });
  if (forceMode || !hasHiddenItems) {
    xOffset = 0;
    if (cell.right) {
      xOffset = cellRect[2] - cellRect[0] - totalR + totalL;
    } else if (cell.center) {
      xOffset = _round((cellRect[2] - cellRect[0] - totalR + totalL) / 2);
    }
    _each(cell.items, function (i, item) {
      var move = moves[i];
      if (move) {
        item.item.locate(move[0] + xOffset, move[1]);
      } else {
        item.item.resize(null);
      }
    });
    cell.rect = [totalL, totalT, totalR, totalB];
    cell.items = null;
  }
  return hasHiddenItems;
}
function applyLayout(canvas, items) {
  var cells = createCells(canvas, items);
  if (adjustCellsAndApplyLayout(cells)) {
    adjustCellsAndApplyLayout(cells, true);
  }
}
export function LayoutControl(widget) {
  var that = this;
  that._items = [];
  that._suspended = 0;
  that._widget = widget;
  that._updateLayout = function () {
    that._update();
  };
}
LayoutControl.prototype = {
  constructor: LayoutControl,
  dispose: function dispose() {
    this._items = this._updateLayout = null;
  },
  setSize: function setSize(canvas) {
    this._canvas = canvas;
    this._update();
  },
  suspend: function suspend() {
    ++this._suspended;
  },
  resume: function resume() {
    if (--this._suspended === 0) {
      this._update();
    }
  },
  // It should return callback (update trigger) instead of injecting the argument
  addItem: function addItem(item) {
    this._items.push(item);
    item.updateLayout = this._updateLayout;
  },
  removeItem: function removeItem(item) {
    var index = this._items.indexOf(item);
    this._items.splice(index, 1);
    item.updateLayout = null;
  },
  _update: function _update() {
    var canvas;
    if (this._suspended === 0) {
      canvas = this._canvas;
      _each(this._items, function (_, item) {
        item.resize(canvas);
      });
      this._widget.resolveItemsDeferred(this._items.filter(el => el.getTemplatesGroups && el.getTemplatesDef));
      applyLayout({
        left: canvas.left,
        top: canvas.top,
        right: canvas.width + canvas.left,
        bottom: canvas.height + canvas.top
      }, this._items);
    }
  }
};
