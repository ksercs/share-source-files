!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/palette.js"], ["./core/utils","../core/utils/extend","../color","../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/palette.js", ["./core/utils", "../core/utils/extend", "../color", "../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports._DEBUG_palettes = void 0;
  exports.createPalette = createPalette;
  exports.currentPalette = currentPalette;
  exports.generateColors = generateColors;
  exports.getAccentColor = getAccentColor;
  exports.getDiscretePalette = getDiscretePalette;
  exports.getGradientPalette = getGradientPalette;
  exports.getPalette = getPalette;
  exports.registerPalette = registerPalette;
  var _utils = $__require("./core/utils");
  var _extend = $__require("../core/utils/extend");
  var _color = _interopRequireDefault($__require("../color"));
  var _type = $__require("../core/utils/type");
  var _palettes;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var _floor = Math.floor;
  var _ceil = Math.ceil;
  var _isArray = Array.isArray;
  var HIGHLIGHTING_STEP = 50;
  var DEFAULT_PALETTE = 'material';
  var officePalette = {
    simpleSet: ['#5f8b95', '#ba4d51', '#af8a53', '#955f71', '#859666', '#7e688c'],
    indicatingSet: ['#a3b97c', '#e1b676', '#ec7f83'],
    gradientSet: ['#5f8b95', '#ba4d51'],
    accentColor: '#ba4d51'
  };
  var palettes = (_palettes = {}, _defineProperty(_palettes, DEFAULT_PALETTE, {
    simpleSet: ['#1db2f5', '#f5564a', '#97c95c', '#ffc720', '#eb3573', '#a63db8'],
    indicatingSet: ['#97c95c', '#ffc720', '#f5564a'],
    gradientSet: ['#1db2f5', '#97c95c'],
    accentColor: '#1db2f5'
  }), _defineProperty(_palettes, 'office', officePalette), _defineProperty(_palettes, 'harmony light', {
    simpleSet: ['#fcb65e', '#679ec5', '#ad79ce', '#7abd5c', '#e18e92', '#b6d623', '#b7abea', '#85dbd5'],
    indicatingSet: ['#b6d623', '#fcb65e', '#e18e92'],
    gradientSet: ['#7abd5c', '#fcb65e'],
    accentColor: '#679ec5'
  }), _defineProperty(_palettes, 'soft pastel', {
    simpleSet: ['#60a69f', '#78b6d9', '#6682bb', '#a37182', '#eeba69', '#90ba58', '#456c68', '#7565a4'],
    indicatingSet: ['#90ba58', '#eeba69', '#a37182'],
    gradientSet: ['#78b6d9', '#eeba69'],
    accentColor: '#60a69f'
  }), _defineProperty(_palettes, 'pastel', {
    simpleSet: ['#bb7862', '#70b3a1', '#bb626a', '#057d85', '#ab394b', '#dac599', '#153459', '#b1d2c6'],
    indicatingSet: ['#70b3a1', '#dac599', '#bb626a'],
    gradientSet: ['#bb7862', '#70b3a1'],
    accentColor: '#bb7862'
  }), _defineProperty(_palettes, 'bright', {
    simpleSet: ['#70c92f', '#f8ca00', '#bd1550', '#e97f02', '#9d419c', '#7e4452', '#9ab57e', '#36a3a6'],
    indicatingSet: ['#70c92f', '#f8ca00', '#bd1550'],
    gradientSet: ['#e97f02', '#f8ca00'],
    accentColor: '#e97f02'
  }), _defineProperty(_palettes, 'soft', {
    simpleSet: ['#cbc87b', '#9ab57e', '#e55253', '#7e4452', '#e8c267', '#565077', '#6babac', '#ad6082'],
    indicatingSet: ['#9ab57e', '#e8c267', '#e55253'],
    gradientSet: ['#9ab57e', '#e8c267'],
    accentColor: '#565077'
  }), _defineProperty(_palettes, 'ocean', {
    simpleSet: ['#75c099', '#acc371', '#378a8a', '#5fa26a', '#064970', '#38c5d2', '#00a7c6', '#6f84bb'],
    indicatingSet: ['#c8e394', '#7bc59d', '#397c8b'],
    gradientSet: ['#acc371', '#38c5d2'],
    accentColor: '#378a8a'
  }), _defineProperty(_palettes, 'vintage', {
    simpleSet: ['#dea484', '#efc59c', '#cb715e', '#eb9692', '#a85c4c', '#f2c0b5', '#c96374', '#dd956c'],
    indicatingSet: ['#ffe5c6', '#f4bb9d', '#e57660'],
    gradientSet: ['#efc59c', '#cb715e'],
    accentColor: '#cb715e'
  }), _defineProperty(_palettes, 'violet', {
    simpleSet: ['#d1a1d1', '#eeacc5', '#7b5685', '#7e7cad', '#a13d73', '#5b41ab', '#e287e2', '#689cc1'],
    indicatingSet: ['#d8e2f6', '#d0b2da', '#d56a8a'],
    gradientSet: ['#eeacc5', '#7b5685'],
    accentColor: '#7b5685'
  }), _defineProperty(_palettes, 'carmine', {
    simpleSet: ['#fb7764', '#73d47f', '#fed85e', '#d47683', '#dde392', '#757ab2'],
    indicatingSet: ['#5cb85c', '#f0ad4e', '#d9534f'],
    gradientSet: ['#fb7764', '#73d47f'],
    accentColor: '#f05b41'
  }), _defineProperty(_palettes, 'dark moon', {
    simpleSet: ['#4ddac1', '#f4c99a', '#80dd9b', '#f998b3', '#4aaaa0', '#a5aef1'],
    indicatingSet: ['#59d8a4', '#f0ad4e', '#f9517e'],
    gradientSet: ['#4ddac1', '#f4c99a'],
    accentColor: '#3debd3'
  }), _defineProperty(_palettes, 'soft blue', {
    simpleSet: ['#7ab8eb', '#97da97', '#facb86', '#e78683', '#839bda', '#4db7be'],
    indicatingSet: ['#5cb85c', '#f0ad4e', '#d9534f'],
    gradientSet: ['#7ab8eb', '#97da97'],
    accentColor: '#7ab8eb'
  }), _defineProperty(_palettes, 'dark violet', {
    simpleSet: ['#9c63ff', '#64c064', '#eead51', '#d2504b', '#4b6bbf', '#2da7b0'],
    indicatingSet: ['#5cb85c', '#f0ad4e', '#d9534f'],
    gradientSet: ['#9c63ff', '#64c064'],
    accentColor: '#9c63ff'
  }), _defineProperty(_palettes, 'green mist', {
    simpleSet: ['#3cbab2', '#8ed962', '#5b9d95', '#efcc7c', '#f1929f', '#4d8dab'],
    indicatingSet: ['#72d63c', '#ffc852', '#f74a5e'],
    gradientSet: ['#3cbab2', '#8ed962'],
    accentColor: '#3cbab2'
  }), _palettes);
  var currentPaletteName;
  function currentPalette(name) {
    if (name === undefined) {
      return currentPaletteName || DEFAULT_PALETTE;
    } else {
      name = (0, _utils.normalizeEnum)(name);
      currentPaletteName = name in palettes ? name : undefined;
    }
  }
  function generateColors(palette, count) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      keepLastColorInEnd: false
    };
    options.type = options.baseColorSet;
    options.extensionMode = options.paletteExtensionMode;
    return createPalette(palette, options).generateColors(count);
  }
  function getPalette(palette, parameters) {
    parameters = parameters || {};
    palette = palette || (currentPaletteName === undefined ? parameters.themeDefault : currentPalette());
    var result;
    var type = parameters.type;
    if (_isArray(palette)) {
      return palette.slice(0);
    } else {
      if ((0, _type.isString)(palette)) {
        result = palettes[(0, _utils.normalizeEnum)(palette)];
      }
      if (!result) {
        result = palettes[currentPalette()];
      }
    }
    return type ? result[type].slice(0) : result;
  }
  function registerPalette(name, palette) {
    var item = {};
    var paletteName;
    if (_isArray(palette)) {
      item.simpleSet = palette.slice(0);
    } else if (palette) {
      item.simpleSet = _isArray(palette.simpleSet) ? palette.simpleSet.slice(0) : undefined;
      item.indicatingSet = _isArray(palette.indicatingSet) ? palette.indicatingSet.slice(0) : undefined;
      item.gradientSet = _isArray(palette.gradientSet) ? palette.gradientSet.slice(0) : undefined;
      item.accentColor = palette.accentColor;
    }
    if (!item.accentColor) {
      item.accentColor = item.simpleSet && item.simpleSet[0];
    }
    if (item.simpleSet || item.indicatingSet || item.gradientSet) {
      paletteName = (0, _utils.normalizeEnum)(name);
      (0, _extend.extend)(palettes[paletteName] = palettes[paletteName] || {}, item);
    }
  }
  function getAccentColor(palette, themeDefault) {
    palette = getPalette(palette, {
      themeDefault: themeDefault
    });
    return palette.accentColor || palette[0];
  }
  function RingBuf(buf) {
    var ind = 0;
    this.next = function () {
      var res = buf[ind++];
      if (ind === buf.length) {
        this.reset();
      }
      return res;
    };
    this.reset = function () {
      ind = 0;
    };
  }
  function getAlternateColorsStrategy(palette, parameters) {
    var stepHighlight = parameters.useHighlight ? HIGHLIGHTING_STEP : 0;
    var paletteSteps = new RingBuf([0, stepHighlight, -stepHighlight]);
    var currentPalette = [];
    function _reset() {
      var step = paletteSteps.next();
      currentPalette = step ? getAlteredPalette(palette, step) : palette.slice(0);
    }
    return {
      getColor: function getColor(index) {
        var color = currentPalette[index % palette.length];
        if (index % palette.length === palette.length - 1) {
          _reset();
        }
        return color;
      },
      generateColors: function generateColors(count) {
        var colors = [];
        count = count || parameters.count;
        for (var i = 0; i < count; i++) {
          colors.push(this.getColor(i));
        }
        return colors;
      },
      reset: function reset() {
        paletteSteps.reset();
        _reset();
      }
    };
  }
  function getExtrapolateColorsStrategy(palette, parameters) {
    function convertColor(color, cycleIndex, cycleCount) {
      var hsl = new _color.default(color).hsl;
      var l = hsl.l / 100;
      var diapason = cycleCount - 1 / cycleCount;
      var minL = l - diapason * 0.5;
      var maxL = l + diapason * 0.5;
      var cycleMiddle = (cycleCount - 1) / 2;
      var cycleDiff = cycleIndex - cycleMiddle;
      if (minL < Math.min(0.5, l * 0.9)) {
        minL = Math.min(0.5, l * 0.9);
      }
      if (maxL > Math.max(0.8, l + (1 - l) * 0.15)) {
        maxL = Math.max(0.8, l + (1 - l) * 0.15);
      }
      if (cycleDiff < 0) {
        l = l - (minL - l) * cycleDiff / cycleMiddle;
      } else {
        l = l + (maxL - l) * (cycleDiff / cycleMiddle);
      }
      hsl.l = l * 100;
      return _color.default.prototype.fromHSL(hsl).toHex();
    }
    return {
      getColor: function getColor(index, count) {
        var paletteCount = palette.length;
        var cycles = _floor((count - 1) / paletteCount + 1);
        var color = palette[index % paletteCount];
        if (cycles > 1) {
          return convertColor(color, _floor(index / paletteCount), cycles);
        }
        return color;
      },
      generateColors: function generateColors(count) {
        var colors = [];
        count = count || parameters.count;
        for (var i = 0; i < count; i++) colors.push(this.getColor(i, count));
        return colors;
      },
      reset: function reset() {}
    };
  }
  function getColorMixer(palette, parameters) {
    var paletteCount = palette.length;
    var extendedPalette = [];
    function distributeColors(count, colorsCount, startIndex, distribution) {
      var groupSize = Math.floor(count / colorsCount);
      var extraItems = count - colorsCount * groupSize;
      var i = startIndex;
      var middleIndex;
      var size;
      while (i < startIndex + count) {
        size = groupSize;
        if (extraItems > 0) {
          size += 1;
          extraItems--;
        }
        middleIndex = size > 2 ? Math.floor(size / 2) : 0;
        distribution.push(i + middleIndex);
        i += size;
      }
      return distribution.sort(function (a, b) {
        return a - b;
      });
    }
    function getColorAndDistance(arr, startIndex, count) {
      startIndex = (count + startIndex) % count;
      var distance = 0;
      for (var i = startIndex; i < count * 2; i += 1) {
        var index = (count + i) % count;
        if (arr[index]) {
          return [arr[index], distance];
        }
        distance++;
      }
    }
    function blendColors(paletteWithEmptyColors, paletteLength) {
      for (var i = 0; i < paletteLength; i++) {
        var color = paletteWithEmptyColors[i];
        if (!color) {
          var color1 = paletteWithEmptyColors[i - 1];
          if (!color1) {
            continue;
          } else {
            var c2 = getColorAndDistance(paletteWithEmptyColors, i, paletteLength);
            var color2 = new _color.default(c2[0]);
            color1 = new _color.default(color1);
            for (var j = 0; j < c2[1]; j++, i++) {
              paletteWithEmptyColors[i] = color1.blend(color2, (j + 1) / (c2[1] + 1)).toHex();
            }
          }
        }
      }
      return paletteWithEmptyColors;
    }
    function extendPalette(count) {
      if (count <= paletteCount) {
        return palette;
      }
      var result = [];
      var colorInGroups = paletteCount - 2;
      var currentColorIndex = 0;
      var cleanColorIndices = [];
      if (parameters.keepLastColorInEnd) {
        cleanColorIndices = distributeColors(count - 2, colorInGroups, 1, [0, count - 1]);
      } else {
        cleanColorIndices = distributeColors(count - 1, paletteCount - 1, 1, [0]);
      }
      for (var i = 0; i < count; i++) {
        if (cleanColorIndices.indexOf(i) > -1) {
          result[i] = palette[currentColorIndex++];
        }
      }
      result = blendColors(result, count);
      return result;
    }
    return {
      getColor: function getColor(index, count) {
        count = count || parameters.count || paletteCount;
        if (extendedPalette.length !== count) {
          extendedPalette = extendPalette(count);
        }
        return extendedPalette[index % count];
      },
      generateColors: function generateColors(count, repeat) {
        count = count || parameters.count || paletteCount;
        if (repeat && count > paletteCount) {
          var colors = extendPalette(paletteCount);
          for (var i = 0; i < count - paletteCount; i++) {
            colors.push(colors[i]);
          }
          return colors;
        } else {
          return paletteCount > 0 ? extendPalette(count).slice(0, count) : [];
        }
      },
      reset: function reset() {}
    };
  }
  function createPalette(palette, parameters, themeDefaultPalette) {
    var paletteObj = {
      dispose: function dispose() {
        this._extensionStrategy = null;
      },
      getNextColor: function getNextColor(count) {
        return this._extensionStrategy.getColor(this._currentColor++, count);
      },
      generateColors: function generateColors(count, parameters) {
        return this._extensionStrategy.generateColors(count, (parameters || {}).repeat);
      },
      reset: function reset() {
        this._currentColor = 0;
        this._extensionStrategy.reset();
        return this;
      }
    };
    parameters = parameters || {};
    var extensionMode = (parameters.extensionMode || '').toLowerCase();
    var colors = getPalette(palette, {
      type: parameters.type || 'simpleSet',
      themeDefault: themeDefaultPalette
    });
    if (extensionMode === 'alternate') {
      paletteObj._extensionStrategy = getAlternateColorsStrategy(colors, parameters);
    } else if (extensionMode === 'extrapolate') {
      paletteObj._extensionStrategy = getExtrapolateColorsStrategy(colors, parameters);
    } else {
      paletteObj._extensionStrategy = getColorMixer(colors, parameters);
    }
    paletteObj.reset();
    return paletteObj;
  }
  function getAlteredPalette(originalPalette, step) {
    var palette = [];
    var i;
    var ii = originalPalette.length;
    for (i = 0; i < ii; ++i) {
      palette.push(getNewColor(originalPalette[i], step));
    }
    return palette;
  }
  function getNewColor(currentColor, step) {
    var newColor = new _color.default(currentColor).alter(step);
    var lightness = getLightness(newColor);
    if (lightness > 200 || lightness < 55) {
      newColor = new _color.default(currentColor).alter(-step / 2);
    }
    return newColor.toHex();
  }
  function getLightness(color) {
    return color.r * 0.3 + color.g * 0.59 + color.b * 0.11;
  }
  function getDiscretePalette(source, size, themeDefaultPalette) {
    var palette = size > 0 ? createDiscreteColors(getPalette(source, {
      type: 'gradientSet',
      themeDefault: themeDefaultPalette
    }), size) : [];
    return {
      getColor: function getColor(index) {
        return palette[index] || null;
      }
    };
  }
  function createDiscreteColors(source, count) {
    var colorCount = count - 1;
    var sourceCount = source.length - 1;
    var colors = [];
    var gradient = [];
    var i;
    function addColor(pos) {
      var k = sourceCount * pos;
      var kl = _floor(k);
      var kr = _ceil(k);
      gradient.push(colors[kl].blend(colors[kr], k - kl).toHex());
    }
    for (i = 0; i <= sourceCount; ++i) {
      colors.push(new _color.default(source[i]));
    }
    if (colorCount > 0) {
      for (i = 0; i <= colorCount; ++i) {
        addColor(i / colorCount);
      }
    } else {
      addColor(0.5);
    }
    return gradient;
  }
  function getGradientPalette(source, themeDefaultPalette) {
    // TODO: Looks like some new set is going to be added
    var palette = getPalette(source, {
      type: 'gradientSet',
      themeDefault: themeDefaultPalette
    });
    var color1 = new _color.default(palette[0]);
    var color2 = new _color.default(palette[1]);
    return {
      getColor: function getColor(ratio) {
        return 0 <= ratio && ratio <= 1 ? color1.blend(color2, ratio).toHex() : null;
      }
    };
  }

  ///#DEBUG
  var _DEBUG_palettes = palettes;
  ///#ENDDEBUG
  exports._DEBUG_palettes = _DEBUG_palettes;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./core/utils","../core/utils/extend","../color","../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./core/utils"), require("../core/utils/extend"), require("../color"), require("../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=palette.js.map