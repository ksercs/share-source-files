!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/themes/material.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled-renovation/viz/core/themes/material.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var FONT_FAMILY = '\'Roboto\', \'RobotoFallback\', \'Helvetica\', \'Arial\', sans-serif';
  var LIGHT_TITLE_COLOR = 'rgba(0,0,0,0.87)';
  var LIGHT_LABEL_COLOR = 'rgba(0,0,0,0.54)';
  var DARK_TITLE_COLOR = 'rgba(255,255,255,0.87)';
  var DARK_LABEL_COLOR = 'rgba(255,255,255,0.54)';
  var DARK_BACKGROUND_COLOR = '#363640';
  var WHITE = '#ffffff';
  var BLACK = '#000000';
  var RANGE_COLOR = '#b5b5b5';
  var AREA_LAYER_COLOR = '#686868';
  var LINE_COLOR = '#c7c7c7';
  var TARGET_COLOR = '#8e8e8e';
  var POSITIVE_COLOR = '#b8b8b8';
  var LABEL_BORDER_COLOR = '#494949';
  var BREAK_STYLE_COLOR = '#818181';
  var themes = [{
    theme: {
      name: 'material',
      defaultPalette: 'Material',
      font: {
        family: FONT_FAMILY
      },
      title: {
        margin: {
          top: 20,
          bottom: 20,
          left: 0,
          right: 0
        },
        font: {
          size: 20,
          family: FONT_FAMILY,
          weight: 500
        },
        horizontalAlignment: 'left',
        subtitle: {
          font: {
            size: 14
          },
          horizontalAlignment: 'left'
        }
      },
      tooltip: {
        shadow: {
          opacity: 0
        },
        border: {
          visible: false
        },
        paddingLeftRight: 8,
        paddingTopBottom: 6,
        arrowLength: 0,
        location: 'edge',
        color: '#616161',
        font: {
          color: WHITE
        },
        cornerRadius: 4
      },
      chart: {
        commonAxisSettings: {
          minorTick: {
            opacity: 0.5
          },
          label: {
            font: {
              size: 11
            }
          }
        },
        commonAnnotationSettings: {
          font: {
            color: WHITE
          },
          border: {
            color: '#616161'
          },
          color: '#616161',
          arrowLength: 14,
          arrowWidth: 0,
          shadow: {
            opacity: 0.08,
            offsetY: 4,
            blur: 8
          },
          cornerRadius: 4
        }
      },
      pie: {
        title: {
          horizontalAlignment: 'center',
          subtitle: {
            horizontalAlignment: 'center'
          }
        }
      },
      polar: {
        commonAxisSettings: {
          minorTick: {
            opacity: 0.5
          }
        },
        title: {
          horizontalAlignment: 'center',
          subtitle: {
            horizontalAlignment: 'center'
          }
        }
      },
      funnel: {
        title: {
          horizontalAlignment: 'center',
          subtitle: {
            horizontalAlignment: 'center'
          }
        }
      },
      gauge: {
        title: {
          horizontalAlignment: 'center',
          subtitle: {
            horizontalAlignment: 'center'
          }
        }
      },
      barGauge: {
        title: {
          horizontalAlignment: 'center',
          subtitle: {
            horizontalAlignment: 'center'
          }
        }
      },
      rangeSelector: {
        sliderHandle: {
          opacity: 0.5
        }
      },
      treeMap: {
        group: {
          label: {
            font: {
              weight: 500
            }
          }
        }
      }
    },
    baseThemeName: 'generic.light'
  }, {
    theme: {
      name: 'material.light',
      gridColor: '#e0e0e0',
      axisColor: LIGHT_LABEL_COLOR,
      primaryTitleColor: LIGHT_TITLE_COLOR,
      legend: {
        font: {
          color: LIGHT_LABEL_COLOR
        }
      },
      chart: {
        scrollBar: {
          color: '#bfbfbf',
          opacity: 0.7
        }
      },
      gauge: {
        rangeContainer: {
          backgroundColor: 'rgba(0,0,0,0.2)'
        }
      },
      barGauge: {
        backgroundColor: '#efefef'
      }
    },
    baseThemeName: 'material'
  }, {
    theme: {
      name: 'material.dark',
      gridColor: '#515159',
      backgroundColor: DARK_BACKGROUND_COLOR,
      axisColor: DARK_LABEL_COLOR,
      font: {
        color: DARK_LABEL_COLOR
      },
      primaryTitleColor: DARK_TITLE_COLOR,
      secondaryTitleColor: DARK_TITLE_COLOR,
      tooltip: {
        color: '#000'
      },
      'export': {
        backgroundColor: DARK_BACKGROUND_COLOR,
        font: {
          color: '#dbdbdb'
        },
        button: {
          'default': {
            color: '#dedede',
            borderColor: '#4d4d4d',
            backgroundColor: DARK_BACKGROUND_COLOR
          },
          hover: {
            color: '#dedede',
            borderColor: '#6c6c6c',
            backgroundColor: '#3f3f4b'
          },
          focus: {
            color: '#dedede',
            borderColor: '#8d8d8d',
            backgroundColor: '#494956'
          },
          active: {
            color: '#dedede',
            borderColor: '#8d8d8d',
            backgroundColor: '#494956'
          }
        },
        shadowColor: '#292929'
      },
      'chart:common': {
        commonSeriesSettings: {
          label: {
            border: {
              color: LABEL_BORDER_COLOR
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
        border: {
          color: '#000'
        },
        color: '#000'
      },
      chart: {
        commonPaneSettings: {
          border: {
            color: LABEL_BORDER_COLOR
          }
        },
        commonAxisSettings: {
          breakStyle: {
            color: BREAK_STYLE_COLOR
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
            color: BREAK_STYLE_COLOR
          }
        },
        selectedRangeColor: RANGE_COLOR,
        sliderMarker: {
          color: RANGE_COLOR,
          font: {
            color: DARK_BACKGROUND_COLOR
          }
        },
        sliderHandle: {
          color: WHITE,
          opacity: 0.2
        },
        shutter: {
          color: WHITE,
          opacity: 0.1
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
          borderColor: DARK_BACKGROUND_COLOR,
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
          color: DARK_BACKGROUND_COLOR
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
        pointColor: DARK_BACKGROUND_COLOR
      },
      bullet: {
        targetColor: TARGET_COLOR
      },
      funnel: {
        item: {
          border: {
            color: DARK_BACKGROUND_COLOR
          }
        }
      },
      sankey: {
        label: {
          font: {
            color: WHITE
          }
        }
      }
    },
    baseThemeName: 'material'
  }];
  function getMaterialColorScheme(accentName, themeName, accentColor) {
    return {
      theme: {
        name: 'material.' + accentName + '.' + themeName,
        rangeSelector: {
          selectedRangeColor: accentColor,
          sliderMarker: {
            color: accentColor
          },
          sliderHandle: {
            color: accentColor
          }
        },
        map: {
          'layer:marker:dot': {
            color: accentColor
          },
          'layer:marker:bubble': {
            color: accentColor
          },
          legend: {
            markerColor: accentColor
          }
        },
        bullet: {
          color: accentColor
        },
        gauge: {
          valueIndicators: {
            'rangebar': {
              color: accentColor
            },
            'textcloud': {
              color: accentColor
            }
          }
        }
      },
      baseThemeName: 'material.' + themeName
    };
  }
  var materialAccents = {
    'blue': '#03a9f4',
    'lime': '#cddc39',
    'orange': '#ff5722',
    'purple': '#9c27b0',
    'teal': '#009688'
  };
  for (var accent in materialAccents) {
    if (Object.prototype.hasOwnProperty.call(materialAccents, accent)) {
      var color = materialAccents[accent];
      themes.push(getMaterialColorScheme(accent, 'light', color), getMaterialColorScheme(accent, 'dark', color), {
        theme: {
          name: "material.".concat(accent, ".light.compact")
        },
        baseThemeName: "material.".concat(accent, ".light")
      }, {
        theme: {
          name: "material.".concat(accent, ".dark.compact")
        },
        baseThemeName: "material.".concat(accent, ".dark")
      });
    }
  }
  var _default = themes;
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
//# sourceMappingURL=material.js.map