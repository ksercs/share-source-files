!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/sankey/layout.js"], ["./graph","./data_validator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/sankey/layout.js", ["./graph", "./data_validator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.layout = void 0;
  var _graph = _interopRequireDefault($__require("./graph"));
  var _data_validator = _interopRequireDefault($__require("./data_validator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _SPLINE_TENSION = 0.3;
  var _ALIGNMENT_CENTER = 'center';
  var _ALIGNMENT_BOTTOM = 'bottom';
  var _ALIGNMENT_DEFAULT = _ALIGNMENT_CENTER;
  var layout = {
    _weightPerPixel: null,
    _getCascadeIdx: function _getCascadeIdx(nodeTitle, cascadesConfig) {
      var nodeInfo = cascadesConfig.filter(function (c) {
        return c.name === nodeTitle;
      })[0];
      if (nodeInfo.outgoing.length > 0) {
        // in common case number of cascade is the longest path to the node
        return nodeInfo.lp;
      } else {
        // but if the node is last (ie has no outgoing edges) lets move it to the LAST cascade
        return _graph.default.routines.maxOfArray(cascadesConfig.map(function (c) {
          return c.lp;
        }));
      }
    },
    _getInWeightForNode: function _getInWeightForNode(nodeTitle, links) {
      var w = 0;
      links.forEach(function (link) {
        if (link[1] === nodeTitle) {
          w += link[2];
        }
      });
      return w;
    },
    _getOutWeightForNode: function _getOutWeightForNode(nodeTitle, links) {
      var w = 0;
      links.forEach(function (link) {
        if (link[0] === nodeTitle) {
          w += link[2];
        }
      });
      return w;
    },
    _computeCascades: function _computeCascades(links) {
      var _this = this;
      var cascadesConfig = _graph.default.struct.computeLongestPaths(links);
      var maxCascade = _graph.default.routines.maxOfArray(cascadesConfig.map(function (c) {
        return c.lp;
      }));
      var cascades = [];

      // init cascades
      for (var i = 0; i < maxCascade + 1; i++) {
        cascades.push({});
      }

      // add nodes to cascades
      links.forEach(function (link) {
        var cascade = cascades[_this._getCascadeIdx(link[0], cascadesConfig)];
        if (!cascade[link[0]]) {
          cascade[link[0]] = {
            nodeTitle: link[0]
          };
        }
        cascade = cascades[_this._getCascadeIdx(link[1], cascadesConfig)];
        if (!cascade[link[1]]) {
          cascade[link[1]] = {
            nodeTitle: link[1]
          };
        }
      });

      // compute in and out weightes of all nodes of cascades
      cascades.forEach(function (cascade) {
        Object.keys(cascade).forEach(function (nodeTitle) {
          var node = cascade[nodeTitle];
          node.inWeight = _this._getInWeightForNode(node.nodeTitle, links);
          node.outWeight = _this._getOutWeightForNode(node.nodeTitle, links);
          node.maxWeight = Math.max(node.inWeight, node.outWeight);
        });
      });
      return cascades;
    },
    _getWeightForCascade: function _getWeightForCascade(cascades, cascadeIdx) {
      var wMax = 0;
      var cascade = cascades[cascadeIdx];
      Object.keys(cascade).forEach(function (nodeTitle) {
        wMax += Math.max(cascade[nodeTitle].inWeight, cascade[nodeTitle].outWeight);
      });
      return wMax;
    },
    _getMaxWeightThroughCascades: function _getMaxWeightThroughCascades(cascades) {
      var max = [];
      cascades.forEach(function (cascade) {
        var mW = 0;
        Object.keys(cascade).forEach(function (nodeTitle) {
          var node = cascade[nodeTitle];
          mW += Math.max(node.inWeight, node.outWeight);
        });
        max.push(mW);
      });
      return _graph.default.routines.maxOfArray(max);
    },
    _computeNodes: function _computeNodes(cascades, options) {
      var _this2 = this;
      var rects = [];
      var maxWeight = this._getMaxWeightThroughCascades(cascades);
      var maxNodeNum = _graph.default.routines.maxOfArray(cascades.map(function (nodesInCascade) {
        return Object.keys(nodesInCascade).length;
      }));
      var nodePadding = options.nodePadding;
      var heightAvailable = options.height - nodePadding * (maxNodeNum - 1);
      if (heightAvailable < 0) {
        // when the available height is too small, e.g. sum of all paddings is more then available height
        nodePadding = 0;
        heightAvailable = options.height - nodePadding * (maxNodeNum - 1);
      }
      this._weightPerPixel = maxWeight / heightAvailable;

      // compute in and out weightes of all nodes of cascades
      var cascadeIdx = 0;
      cascades.forEach(function (cascade) {
        var cascadeRects = [];
        var y = 0;
        var nodesInCascade = Object.keys(cascade).length;
        var cascadeHeight = _this2._getWeightForCascade(cascades, cascadeIdx) / _this2._weightPerPixel + nodePadding * (nodesInCascade - 1);
        var cascadeAlign;
        if (Array.isArray(options.nodeAlign)) {
          cascadeAlign = cascadeIdx < options.nodeAlign.length ? options.nodeAlign[cascadeIdx] : _ALIGNMENT_DEFAULT;
        } else {
          cascadeAlign = options.nodeAlign;
        }
        if (cascadeAlign === _ALIGNMENT_BOTTOM) {
          y = options.height - cascadeHeight;
        } else if (cascadeAlign === _ALIGNMENT_CENTER) {
          y = 0.5 * (options.height - cascadeHeight);
        }
        y = Math.round(y);
        Object.keys(cascade).forEach(function (nodeTitle) {
          cascade[nodeTitle].sort = _this2._sort && Object.prototype.hasOwnProperty.call(_this2._sort, nodeTitle) ? _this2._sort[nodeTitle] : 1;
        });
        Object.keys(cascade).sort(function (a, b) {
          return cascade[a].sort - cascade[b].sort;
        }).forEach(function (nodeTitle) {
          var node = cascade[nodeTitle];
          var height = Math.floor(heightAvailable * node.maxWeight / maxWeight);
          var x = Math.round(cascadeIdx * options.width / (cascades.length - 1)) - (cascadeIdx === 0 ? 0 : options.nodeWidth);
          var rect = {};
          rect._name = nodeTitle;
          rect.width = options.nodeWidth;
          rect.height = height;
          rect.x = x + options.x;
          rect.y = y + options.y;
          y += height + nodePadding;
          cascadeRects.push(rect);
        });
        cascadeIdx++;
        rects.push(cascadeRects);
      });
      return rects;
    },
    _findRectByName: function _findRectByName(rects, name) {
      for (var c = 0; c < rects.length; c++) {
        for (var r = 0; r < rects[c].length; r++) {
          if (name === rects[c][r]._name) return rects[c][r];
        }
      }
      return null;
    },
    _findIndexByName: function _findIndexByName(rects, nodeTitle) {
      var index = 0;
      for (var c = 0; c < rects.length; c++) {
        for (var r = 0; r < rects[c].length; r++) {
          if (nodeTitle === rects[c][r]._name) return index;
          index++;
        }
      }
      return null;
    },
    _computeLinks: function _computeLinks(links, rects, cascades) {
      var _this3 = this;
      var yOffsets = {};
      var paths = [];
      var result = [];
      cascades.forEach(function (cascade) {
        Object.keys(cascade).forEach(function (nodeTitle) {
          yOffsets[nodeTitle] = {
            in: 0,
            out: 0
          };
        });
      });
      rects.forEach(function (rectsOfCascade) {
        rectsOfCascade.forEach(function (nodeRect) {
          var nodeTitle = nodeRect._name;
          var rectFrom = _this3._findRectByName(rects, nodeTitle);
          var linksFromNode = links.filter(function (link) {
            return link[0] === nodeTitle;
          }); // all outgoing links from the node

          // all outgoing links should be sorted according to the order of their target nodes
          linksFromNode.forEach(function (link) {
            link.sort = _this3._findIndexByName(rects, link[1]);
          });
          linksFromNode.sort(function (a, b) {
            return a.sort - b.sort;
          }).forEach(function (link) {
            var rectTo = _this3._findRectByName(rects, link[1]);
            var height = Math.round(link[2] / _this3._weightPerPixel);
            var yOffsetFrom = yOffsets[link[0]].out;
            var yOffsetTo = yOffsets[link[1]].in;
            // heights of left and right parts of the link must fit the nodes on it's left and right
            var heightFrom = yOffsets[link[0]].out + height > rectFrom.height ? rectFrom.height - yOffsets[link[0]].out : height;
            var heightTo = yOffsets[link[1]].in + height > rectTo.height ? rectTo.height - yOffsets[link[1]].in : height;
            paths.push({
              from: {
                x: rectFrom.x,
                y: rectFrom.y + yOffsetFrom,
                width: rectFrom.width,
                height: heightFrom,
                node: rectFrom,
                weight: link[2]
              },
              to: {
                x: rectTo.x,
                y: rectTo.y + yOffsetTo,
                width: rectTo.width,
                height: heightTo,
                node: rectTo
              }
            });
            yOffsets[link[0]].out += height;
            yOffsets[link[1]].in += height;
          });
        });
      });
      paths.forEach(function (link) {
        var path = {
          d: _this3._spline(link.from, link.to),
          _boundingRect: {
            x: link.from.x + link.from.width,
            y: Math.min(link.from.y, link.to.y),
            width: link.to.x - (link.from.x + link.from.width),
            height: Math.max(link.from.x + link.from.height, link.to.y + link.to.height) - Math.min(link.from.y, link.to.y)
          },
          _weight: link.from.weight,
          _from: link.from.node,
          _to: link.to.node
        };
        result.push(path);
      });
      this._fitAllNodesHeight(rects, paths);
      return result;
    },
    _fitNodeHeight: function _fitNodeHeight(nodeName, nodeRects, paths) {
      var targetRect = this._findRectByName(nodeRects, nodeName);
      var heightOfLinksSummaryIn = 0;
      var heightOfLinksSummaryOut = 0;
      paths.forEach(function (path) {
        if (path.from.node._name === nodeName) {
          heightOfLinksSummaryOut += path.from.height;
        }
        if (path.to.node._name === nodeName) {
          heightOfLinksSummaryIn += path.to.height;
        }
      });
      targetRect.height = Math.max(heightOfLinksSummaryIn, heightOfLinksSummaryOut);
    },
    _fitAllNodesHeight: function _fitAllNodesHeight(nodeRects, paths) {
      for (var c = 0; c < nodeRects.length; c++) {
        for (var r = 0; r < nodeRects[c].length; r++) {
          this._fitNodeHeight(nodeRects[c][r]._name, nodeRects, paths);
        }
      }
    },
    _spline: function _spline(rectLeft, rectRight) {
      var p_UpLeft = {
        x: rectLeft.x + rectLeft.width,
        y: rectLeft.y
      };
      var p_DownLeft = {
        x: rectLeft.x + rectLeft.width,
        y: rectLeft.y + rectLeft.height
      };
      var p_UpRight = {
        x: rectRight.x,
        y: rectRight.y
      };
      var p_DownRight = {
        x: rectRight.x,
        y: rectRight.y + rectRight.height
      };
      var curve_width = _SPLINE_TENSION * (p_UpRight.x - p_UpLeft.x);
      var result = "M ".concat(p_UpLeft.x, " ").concat(p_UpLeft.y, " C ").concat(p_UpLeft.x + curve_width, " ").concat(p_UpLeft.y, " ").concat(p_UpRight.x - curve_width, " ").concat(p_UpRight.y, " ").concat(p_UpRight.x, " ").concat(p_UpRight.y, " L ").concat(p_DownRight.x, " ").concat(p_DownRight.y, " C ").concat(p_DownRight.x - curve_width, " ").concat(p_DownRight.y, " ").concat(p_DownLeft.x + curve_width, " ").concat(p_DownLeft.y, " ").concat(p_DownLeft.x, " ").concat(p_DownLeft.y, " Z");
      return result;
    },
    computeLayout: function computeLayout(linksData, sortData, options, incidentOccurred) {
      this._sort = sortData;
      var result = {};
      var validateResult = _data_validator.default.validate(linksData, incidentOccurred);
      if (!validateResult) {
        result.cascades = this._computeCascades(linksData);
        result.nodes = this._computeNodes(result.cascades, {
          width: options.availableRect.width,
          height: options.availableRect.height,
          x: options.availableRect.x,
          y: options.availableRect.y,
          nodePadding: options.nodePadding,
          nodeWidth: options.nodeWidth,
          nodeAlign: options.nodeAlign
        });
        result.links = this._computeLinks(linksData, result.nodes, result.cascades);
      } else {
        result.error = validateResult;
      }
      return result;
    },
    overlap: function overlap(box1, box2) {
      return !(box2.x > box1.x + box1.width || box2.x + box2.width < box1.x || box2.y >= box1.y + box1.height || box2.y + box2.height <= box1.y);
    }
  };
  exports.layout = layout;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./graph","./data_validator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./graph"), require("./data_validator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout.js.map