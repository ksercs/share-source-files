!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/themes/generic.dark.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/viz/core/themes/generic.dark.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var WHITE = '#ffffff';
  var BLACK = '#000000';
  var SOME_GREY = '#2b2b2b';
  var RANGE_COLOR = '#b5b5b5';
  var GREY_GREEN = '#303030';
  var AREA_LAYER_COLOR = '#686868';
  var LINE_COLOR = '#c7c7c7';
  var TARGET_COLOR = '#8e8e8e';
  var POSITIVE_COLOR = '#b8b8b8';
  var BORDER_COLOR = '#494949';
  var _default = [{
    theme: {
      name: 'generic.dark',
      font: {
        color: '#808080'
      },
      backgroundColor: '#2a2a2a',
      primaryTitleColor: '#dedede',
      secondaryTitleColor: '#a3a3a3',
      gridColor: '#555555',
      axisColor: '#a3a3a3',
      'export': {
        backgroundColor: '#2a2a2a',
        font: {
          color: '#dbdbdb'
        },
        button: {
          'default': {
            color: '#dedede',
            borderColor: '#4d4d4d',
            backgroundColor: '#2e2e2e'
          },
          hover: {
            color: '#dedede',
            borderColor: '#6c6c6c',
            backgroundColor: '#444'
          },
          focus: {
            color: '#dedede',
            borderColor: '#8d8d8d',
            backgroundColor: '#444444'
          },
          active: {
            color: '#dedede',
            borderColor: '#8d8d8d',
            backgroundColor: '#555555'
          }
        },
        shadowColor: '#292929'
      },
      tooltip: {
        color: SOME_GREY,
        border: {
          color: BORDER_COLOR
        },
        font: {
          color: '#929292'
        }
      },
      'chart:common': {
        commonSeriesSettings: {
          label: {
            border: {
              color: BORDER_COLOR
            }
          },
          valueErrorBar: {
            color: WHITE
          }
        }
      },
      'chart:common:axis': {
        constantLineStyle: {
          color: WHITE
        }
      },
      'chart:common:annotation': {
        font: {
          color: '#929292'
        },
        border: {
          color: BORDER_COLOR
        },
        color: SOME_GREY,
        shadow: {
          opacity: 0.008,
          offsetY: 4,
          blur: 8
        }
      },
      chart: {
        commonPaneSettings: {
          border: {
            color: BORDER_COLOR
          }
        },
        commonAxisSettings: {
          breakStyle: {
            color: '#818181'
          }
        },
        zoomAndPan: {
          dragBoxStyle: {
            color: WHITE
          }
        }
      },
      gauge: {
        rangeContainer: {
          backgroundColor: RANGE_COLOR
        },
        valueIndicators: {
          _default: {
            color: RANGE_COLOR
          },
          'rangebar': {
            color: '#84788b'
          },
          'twocolorneedle': {
            secondColor: '#ba544d'
          },
          'trianglemarker': {
            color: '#b7918f'
          },
          'textcloud': {
            color: '#ba544d'
          }
        }
      },
      barGauge: {
        backgroundColor: '#3c3c3c'
      },
      rangeSelector: {
        scale: {
          tick: {
            color: WHITE,
            opacity: 0.32
          },
          minorTick: {
            color: WHITE,
            opacity: 0.1
          },
          breakStyle: {
            color: '#818181'
          }
        },
        selectedRangeColor: RANGE_COLOR,
        sliderMarker: {
          color: RANGE_COLOR,
          font: {
            color: GREY_GREEN
          }
        },
        sliderHandle: {
          color: WHITE,
          opacity: 0.2
        },
        shutter: {
          color: SOME_GREY,
          opacity: 0.9
        }
      },
      map: {
        background: {
          borderColor: '#3f3f3f'
        },
        layer: {
          label: {
            stroke: BLACK,
            font: {
              color: WHITE
            }
          }
        },
        'layer:area': {
          borderColor: GREY_GREEN,
          color: AREA_LAYER_COLOR,
          hoveredBorderColor: WHITE,
          selectedBorderColor: WHITE
        },
        'layer:line': {
          color: '#c77244',
          hoveredColor: '#ff5d04',
          selectedColor: '#ff784f'
        },
        'layer:marker:bubble': {
          hoveredBorderColor: WHITE,
          selectedBorderColor: WHITE
        },
        'layer:marker:pie': {
          hoveredBorderColor: WHITE,
          selectedBorderColor: WHITE
        },
        legend: {
          border: {
            color: '#3f3f3f'
          },
          font: {
            color: WHITE
          }
        },
        controlBar: {
          borderColor: LINE_COLOR,
          color: GREY_GREEN
        }
      },
      treeMap: {
        group: {
          color: '#4c4c4c',
          label: {
            font: {
              color: '#a3a3a3'
            }
          }
        }
      },
      sparkline: {
        lineColor: LINE_COLOR,
        firstLastColor: LINE_COLOR,
        barPositiveColor: POSITIVE_COLOR,
        barNegativeColor: TARGET_COLOR,
        winColor: POSITIVE_COLOR,
        lossColor: TARGET_COLOR,
        pointColor: GREY_GREEN
      },
      bullet: {
        targetColor: TARGET_COLOR
      },
      funnel: {
        item: {
          border: {
            color: '#2a2a2a'
          }
        }
      },
      sankey: {
        label: {
          font: {
            color: WHITE
          },
          shadow: {
            opacity: 0
          }
        },
        node: {
          border: {
            color: '#2a2a2a'
          }
        },
        link: {
          color: '#888888',
          border: {
            color: '#2a2a2a'
          },
          hoverStyle: {
            color: '#bbbbbb'
          }
        }
      }
    },
    baseThemeName: 'generic.light'
  }, {
    theme: {
      name: 'generic.dark.compact'
    },
    baseThemeName: 'generic.dark'
  }];
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=generic.dark.js.map