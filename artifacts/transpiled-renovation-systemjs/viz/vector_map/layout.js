!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/vector_map/layout.js"], ["../../core/utils/iterator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/vector_map/layout.js", ["../../core/utils/iterator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.LayoutControl = LayoutControl;
  var _iterator = $__require("../../core/utils/iterator");
  var _round = Math.round;
  var _min = Math.min;
  var _max = Math.max;
  var _each = _iterator.each;
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
  function LayoutControl(widget) {
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
        this._widget.resolveItemsDeferred(this._items.filter(function (el) {
          return el.getTemplatesGroups && el.getTemplatesDef;
        }));
        applyLayout({
          left: canvas.left,
          top: canvas.top,
          right: canvas.width + canvas.left,
          bottom: canvas.height + canvas.top
        }, this._items);
      }
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/iterator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/iterator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout.js.map