!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/palette.tests.js"], ["jquery","color","viz/palette"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core/palette.tests.js", ["jquery", "color", "viz/palette"], function($__export) {
  "use strict";
  var $,
      Color,
      registerPalette,
      generateColors,
      getPalette,
      createPalette,
      getDiscretePalette,
      _DEBUG_palettes,
      currentPalette,
      getGradientPalette,
      getAccentColor,
      environment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Color = $__m.default;
    }, function($__m) {
      registerPalette = $__m.registerPalette;
      generateColors = $__m.generateColors;
      getPalette = $__m.getPalette;
      createPalette = $__m.createPalette;
      getDiscretePalette = $__m.getDiscretePalette;
      _DEBUG_palettes = $__m._DEBUG_palettes;
      currentPalette = $__m.currentPalette;
      getGradientPalette = $__m.getGradientPalette;
      getAccentColor = $__m.getAccentColor;
    }],
    execute: function() {
      environment = {
        beforeEach: function() {
          this.registerPalette = registerPalette;
          this.generateColors = generateColors;
          this.getPalette = getPalette;
          this.getAccentColor = getAccentColor;
          this.createPalette = createPalette;
          this.getDiscretePalette = getDiscretePalette;
          this.palettes = _DEBUG_palettes;
          this.__original_palettes = $.extend(true, {}, this.palettes);
          this.currentPalette = currentPalette;
        },
        afterEach: function() {
          $.each(this.palettes, $.proxy(function(name) {
            delete this.palettes[name];
          }, this));
          $.extend(true, this.palettes, this.__original_palettes);
          this.currentPalette(null);
        }
      };
      QUnit.module('registerPalette', environment);
      QUnit.test('Register palette', function(assert) {
        this.registerPalette('Custom Palette', ['red', 'green', 'blue']);
        assert.deepEqual(this.palettes['custom palette'], {
          simpleSet: ['red', 'green', 'blue'],
          accentColor: 'red'
        });
      });
      QUnit.test('Register palette (new style)', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          gradientSet: ['g1', 'g2']
        });
        assert.deepEqual(this.palettes['custom palette'], {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          gradientSet: ['g1', 'g2'],
          accentColor: 'c1'
        });
      });
      QUnit.test('Register palette with same name', function(assert) {
        this.registerPalette('Custom Palette', ['red', 'green', 'blue']);
        this.registerPalette('Custom Palette', ['black', 'grey']);
        assert.deepEqual(this.palettes['custom palette'], {
          simpleSet: ['black', 'grey'],
          accentColor: 'black'
        });
      });
      QUnit.test('Register palette with same name (new style)', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2', 'd3']
        });
        this.registerPalette('Custom Palette', {
          simpleSet: ['c4', 'c5'],
          gradientSet: ['g1', 'g2']
        });
        this.registerPalette('Custom Palette', {indicatingSet: ['d4', 'd5']});
        assert.deepEqual(this.palettes['custom palette'], {
          simpleSet: ['c4', 'c5'],
          indicatingSet: ['d4', 'd5'],
          gradientSet: ['g1', 'g2'],
          accentColor: 'c4'
        });
      });
      QUnit.test('Register not valid palette', function(assert) {
        this.registerPalette('Custom Palette', 'test-value');
        assert.ok(!this.palettes['custom palette']);
      });
      QUnit.test('Register not valid palette over palette', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          gradientSet: ['g1', 'g2']
        });
        this.registerPalette('Custom Palette', null);
        assert.deepEqual(this.palettes['custom palette'], {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          gradientSet: ['g1', 'g2'],
          accentColor: 'c1'
        });
      });
      QUnit.module('getPalette', environment);
      QUnit.test('Get palette by name', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        assert.deepEqual(this.getPalette('custom PALETTE', {}).simpleSet, ['c1', 'c2', 'c3'], 'simpleSet');
        assert.deepEqual(this.getPalette('Custom Palette', {type: 'indicatingSet'}), ['d1', 'd2'], 'indicatingSet');
      });
      QUnit.test('Get palette by unknown name', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        assert.deepEqual(this.getPalette('Custom Palette 2', {}).simpleSet, this.palettes['material'].simpleSet, 'simpleSet');
        assert.deepEqual(this.getPalette('Custom Palette 2', {type: 'indicatingSet'}), this.palettes['material'].indicatingSet, 'indicatingSet');
      });
      QUnit.test('Get palette by name and theme', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        this.registerPalette('Custom Palette', {
          simpleSet: ['e1', 'e2', 'e3', 'e4'],
          indicatingSet: ['f1', 'f2', 'f3']
        }, 'Super Theme');
        assert.deepEqual(this.getPalette('Custom Palette').simpleSet, ['e1', 'e2', 'e3', 'e4'], 'simpleSet');
        assert.deepEqual(this.getPalette('Custom Palette', {type: 'indicatingSet'}), ['f1', 'f2', 'f3'], 'indicatingSet');
      });
      QUnit.test('Get palette by array', function(assert) {
        assert.deepEqual(this.getPalette(['a1', 'a2', 'a3']), ['a1', 'a2', 'a3']);
      });
      QUnit.module('getAccentColor', environment);
      QUnit.test('By given palette name', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          accentColor: 'e1'
        });
        assert.deepEqual(this.getAccentColor('Custom Palette'), 'e1');
      });
      QUnit.test('No palette, use theme default', function(assert) {
        this.registerPalette('Theme Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2'],
          accentColor: 'e1'
        });
        assert.deepEqual(this.getAccentColor(undefined, 'Theme Palette'), 'e1');
      });
      QUnit.test('By given palette name, palette does not contain accent color - return first simple color', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        assert.deepEqual(this.getAccentColor('Custom Palette'), 'c1');
      });
      QUnit.test('Palette is array of colors - return first color', function(assert) {
        assert.deepEqual(this.getAccentColor(['c1', 'c2']), 'c1');
      });
      QUnit.module('Palette', $.extend({}, environment, {checkPalette: function(assert, palette, expectedColors, message) {
          var i = 0;
          var ii = expectedColors.length * 2;
          var actual = [];
          var expected = expectedColors.concat(expectedColors);
          for (; i < ii; ++i) {
            actual.push(palette.getNextColor());
          }
          assert.deepEqual(actual, expected, message);
        }}));
      QUnit.test('Disposing', function(assert) {
        var palette = this.createPalette(['green', 'red'], {useHighlight: true});
        palette.dispose();
        assert.strictEqual(palette._extensionStrategy, null);
      });
      QUnit.test('Palette is predefined', function(assert) {
        assert.strictEqual(this.createPalette('Soft Pastel', {type: 'simpleSet'}).getNextColor(), this.palettes['soft pastel'].simpleSet[0], 'Soft Pastel');
      });
      QUnit.test('Resolve theme palette', function(assert) {
        assert.strictEqual(this.createPalette(undefined, {type: 'simpleSet'}, 'DARK VIOLET').getNextColor(), this.palettes['dark violet'].simpleSet[0], 'Soft Pastel by currentPalette');
        this.currentPalette('office');
        assert.strictEqual(this.createPalette(undefined, {type: 'simpleSet'}, 'DARK VIOLET').getNextColor(), this.palettes['office'].simpleSet[0], 'Dark Violet');
      });
      QUnit.test('Custom palette by name', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        this.checkPalette(assert, this.createPalette('Custom Palette', {extensionMode: 'alternate'}), ['c1', 'c2', 'c3'], 'simpleSet');
        this.checkPalette(assert, this.createPalette('Custom Palette', {
          type: 'indicatingSet',
          extensionMode: 'alternate'
        }), ['d1', 'd2'], 'indicatingSet');
      });
      QUnit.test('Custom palette by unknown name', function(assert) {
        this.registerPalette('Custom Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        this.checkPalette(assert, this.createPalette('Custom Palette 2', {extensionMode: 'alternate'}), this.palettes['material'].simpleSet, 'simpleSet');
      });
      QUnit.test('Custom palette by array', function(assert) {
        this.checkPalette(assert, this.createPalette(['a1', 'a2', 'a3'], {extensionMode: 'alternate'}), ['a1', 'a2', 'a3']);
      });
      QUnit.test('Lightening palette', function(assert) {
        var palette = this.createPalette(['green', 'red'], {
          useHighlight: true,
          extensionMode: 'alternate'
        });
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
        assert.strictEqual(palette.getNextColor(), '#32b232');
        assert.strictEqual(palette.getNextColor(), '#ff3232');
      });
      QUnit.test('Darkening palette after lightening', function(assert) {
        var palette = this.createPalette(['green', 'red'], {
          useHighlight: true,
          extensionMode: 'alternate'
        });
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
        assert.strictEqual(palette.getNextColor(), '#32b232');
        assert.strictEqual(palette.getNextColor(), '#ff3232');
        assert.strictEqual(palette.getNextColor(), '#199919');
        assert.strictEqual(palette.getNextColor(), '#cd0000');
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
      });
      QUnit.test('Extrapolate without passing count', function(assert) {
        var palette = this.createPalette(['green', 'red'], {extensionMode: 'extrapolate'});
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
      });
      QUnit.test('Extrapolate with passing count', function(assert) {
        var palette = this.createPalette(['green', 'red'], {extensionMode: 'extrapolate'});
        assert.strictEqual(palette.getNextColor(6), '#007300');
        assert.strictEqual(palette.getNextColor(6), '#e60000');
        assert.strictEqual(palette.getNextColor(6), '#008000');
        assert.strictEqual(palette.getNextColor(6), '#ff0000');
        assert.strictEqual(palette.getNextColor(6), '#99ff99');
        assert.strictEqual(palette.getNextColor(6), '#ff9999');
      });
      QUnit.test('Blend without passing count', function(assert) {
        var palette = this.createPalette(['green', 'red', 'yellow'], {extensionMode: 'blend'});
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
        assert.strictEqual(palette.getNextColor(), 'yellow');
        assert.strictEqual(palette.getNextColor(), 'green');
      });
      QUnit.test('Blend with passing count', function(assert) {
        var palette = this.createPalette(['green', 'red', 'yellow'], {extensionMode: 'blend'});
        assert.strictEqual(palette.getNextColor(6), 'green');
        assert.strictEqual(palette.getNextColor(6), '#804000');
        assert.strictEqual(palette.getNextColor(6), 'red');
        assert.strictEqual(palette.getNextColor(6), '#ff8000');
        assert.strictEqual(palette.getNextColor(6), 'yellow');
        assert.strictEqual(palette.getNextColor(6), '#80c000');
      });
      QUnit.test('Recalculate palette if extension count is changed', function(assert) {
        var palette = this.createPalette(['green', 'red', 'yellow'], {extensionMode: 'blend'});
        palette.getNextColor(6);
        palette.reset();
        assert.strictEqual(palette.getNextColor(8), 'green');
        assert.strictEqual(palette.getNextColor(8), '#555500');
        assert.strictEqual(palette.getNextColor(8), '#aa2b00');
        assert.strictEqual(palette.getNextColor(8), 'red');
        assert.strictEqual(palette.getNextColor(8), '#ff5500');
        assert.strictEqual(palette.getNextColor(8), '#ffaa00');
        assert.strictEqual(palette.getNextColor(8), 'yellow');
        assert.strictEqual(palette.getNextColor(8), '#80c000');
      });
      QUnit.test('Blend with passing count. Keep last color in the end', function(assert) {
        var palette = this.createPalette(['green', 'red', 'yellow'], {
          extensionMode: 'blend',
          keepLastColorInEnd: true
        });
        assert.strictEqual(palette.getNextColor(6), 'green');
        assert.strictEqual(palette.getNextColor(6), '#555500');
        assert.strictEqual(palette.getNextColor(6), '#aa2b00');
        assert.strictEqual(palette.getNextColor(6), 'red');
        assert.strictEqual(palette.getNextColor(6), '#ff8000');
        assert.strictEqual(palette.getNextColor(6), 'yellow');
      });
      QUnit.test('Lightening palette when color is too light', function(assert) {
        var palette = this.createPalette(['white'], {
          useHighlight: true,
          extensionMode: 'Alternate'
        });
        assert.strictEqual(palette.getNextColor(), 'white');
        assert.strictEqual(palette.getNextColor(), '#e6e6e6');
      });
      QUnit.test('Darken palette when color is too dark', function(assert) {
        var palette = this.createPalette(['black'], {
          useHighlight: true,
          extensionMode: 'alternate'
        });
        assert.strictEqual(palette.getNextColor(), 'black');
        assert.strictEqual(palette.getNextColor(), '#000000');
        assert.strictEqual(palette.getNextColor(), '#191919');
        assert.strictEqual(palette.getNextColor(), 'black');
      });
      QUnit.test('Reset palette', function(assert) {
        var palette = this.createPalette(['green', 'red'], {
          useHighlight: true,
          extensionMode: 'alternate'
        });
        palette.getNextColor();
        palette.getNextColor();
        palette.getNextColor();
        palette.reset();
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
        assert.strictEqual(palette.getNextColor(), '#32b232');
        assert.strictEqual(palette.getNextColor(), '#ff3232');
        assert.strictEqual(palette.getNextColor(), '#199919');
        assert.strictEqual(palette.getNextColor(), '#cd0000');
        assert.strictEqual(palette.getNextColor(), 'green');
        assert.strictEqual(palette.getNextColor(), 'red');
      });
      QUnit.test('Repeat colors', function(assert) {
        var colors = createPalette('material').generateColors(10, {
          repeat: true,
          keepLastColorInEnd: false
        });
        assert.deepEqual(colors, ['#1db2f5', '#f5564a', '#97c95c', '#ffc720', '#eb3573', '#a63db8', '#1db2f5', '#f5564a', '#97c95c', '#ffc720']);
      });
      QUnit.module('DiscretePalette', $.extend({}, environment, {createColors: function(count) {
          var i = 0;
          var step = Math.round(255 / count);
          var r = 0;
          var g = 32;
          var b = 64;
          var list = [];
          var color;
          for (; i < count; ++i) {
            color = new Color();
            color.r = r;
            color.g = g;
            color.b = b;
            list.push(color.toHex());
            r = (r + step) % 255;
            g = (g + step) % 255;
            b = (b + step) % 255;
          }
          return list;
        }}));
      QUnit.test('palette is not valid', function(assert) {
        assert.strictEqual(this.getDiscretePalette('', 2).getColor(0), this.palettes['material'].gradientSet[0], 'empty string');
        assert.strictEqual(this.getDiscretePalette(undefined, 2).getColor(0), this.palettes['material'].gradientSet[0], 'undefined');
        assert.strictEqual(this.getDiscretePalette(null, 2).getColor(0), this.palettes['material'].gradientSet[0], 'null');
        assert.strictEqual(this.getDiscretePalette('test', 2).getColor(0), this.palettes['material'].gradientSet[0], 'unknown name');
      });
      QUnit.test('palette is predefined', function(assert) {
        assert.strictEqual(this.getDiscretePalette('Soft Pastel', 2).getColor(0), this.palettes['soft pastel'].gradientSet[0], 'Soft Pastel');
        assert.strictEqual(this.getDiscretePalette('HARMONY LIGHT', 2).getColor(0), this.palettes['harmony light'].gradientSet[0], 'Harmony Light');
      });
      QUnit.test('resolve theme palette', function(assert) {
        assert.strictEqual(this.getDiscretePalette(undefined, 2, 'DARK VIOLET').getColor(0), this.palettes['dark violet'].gradientSet[0], 'Soft Pastel by currentPalette');
        this.currentPalette('material');
        assert.strictEqual(this.getDiscretePalette(undefined, 2, 'DARK VIOLET').getColor(0), this.palettes['material'].gradientSet[0], 'Dark Violet');
      });
      QUnit.test('palette is custom object', function(assert) {
        assert.strictEqual(this.getDiscretePalette(['#0fad71', '#d82900'], 2).getColor(0), '#0fad71', 'custom palette 1');
        assert.strictEqual(this.getDiscretePalette(['red', 'blue'], 2).getColor(0), '#ff0000', 'custom palette 2');
      });
      QUnit.test('palette size is 1', function(assert) {
        var start = new Color('#0f2e89');
        var end = new Color('#123fd7');
        var palette = this.getDiscretePalette([start.toHex(), end.toHex()], 1);
        assert.strictEqual(palette.getColor(0), start.blend(end, 0.5).toHex(), 'color 0');
        assert.strictEqual(palette.getColor(1), null, 'color 1');
      });
      QUnit.test('palette size is 2', function(assert) {
        var start = new Color('#ad8902');
        var end = new Color('#37e90a');
        var palette = this.getDiscretePalette([start.toHex(), end.toHex()], 2);
        assert.strictEqual(palette.getColor(0), start.toHex(), 'color 0');
        assert.strictEqual(palette.getColor(1), end.toHex(), 'color 1');
        assert.strictEqual(palette.getColor(2), null, 'color 2');
      });
      QUnit.test('palette size is 3', function(assert) {
        var start = new Color('red');
        var end = new Color('blue');
        var palette = this.getDiscretePalette([start.toHex(), end.toHex()], 3);
        assert.strictEqual(palette.getColor(0), start.toHex(), 'color 0');
        assert.strictEqual(palette.getColor(1), start.blend(end, 0.5).toHex(), 'color 1');
        assert.strictEqual(palette.getColor(2), end.toHex(), 'color 2');
        assert.strictEqual(palette.getColor(3), null, 'color 3');
      });
      QUnit.test('palette size is 51', function(assert) {
        var start = new Color('#000102');
        var end = new Color('#fff901');
        var palette = this.getDiscretePalette([start.toHex(), end.toHex()], 51);
        var i = 0;
        for (; i < 51; ++i) {
          assert.strictEqual(palette.getColor(i), start.blend(end, i / 50).toHex(), 'color ' + i);
        }
      });
      QUnit.test('palette size is not valid', function(assert) {
        assert.strictEqual(this.getDiscretePalette('', 0).getColor(0), null, '0');
        assert.strictEqual(this.getDiscretePalette('', 'test').getColor(0), null, 'test');
        assert.strictEqual(this.getDiscretePalette('', -1).getColor(0), null, '-1');
      });
      QUnit.test('More than 2 colors in source', function(assert) {
        var colors = this.createColors(5);
        var palette = this.getDiscretePalette(colors, 5);
        $.each(colors, function(i, color) {
          assert.strictEqual(palette.getColor(i), color, 'color ' + i);
        });
      });
      QUnit.test('More than 2 colors in source / greater then size / 1', function(assert) {
        var colors = this.createColors(7);
        var palette = this.getDiscretePalette(colors, 4);
        assert.strictEqual(palette.getColor(0), colors[0], 'color 0');
        assert.strictEqual(palette.getColor(1), colors[2], 'color 1');
        assert.strictEqual(palette.getColor(2), colors[4], 'color 2');
        assert.strictEqual(palette.getColor(3), colors[6], 'color 3');
      });
      QUnit.test('More than 2 colors in source / greater then size / 2', function(assert) {
        var colors = this.createColors(4);
        var palette = this.getDiscretePalette(colors, 3);
        assert.strictEqual(palette.getColor(0), colors[0], 'color 0');
        assert.strictEqual(palette.getColor(1), new Color(colors[1]).blend(colors[2], 1 / 2).toHex(), 'color 1');
        assert.strictEqual(palette.getColor(2), colors[3], 'color 2');
      });
      QUnit.test('More than 2 colors in source / less then size / 1', function(assert) {
        var colors = this.createColors(3);
        var palette = this.getDiscretePalette(colors, 4);
        assert.strictEqual(palette.getColor(0), colors[0], 'color 0');
        assert.strictEqual(palette.getColor(1), new Color(colors[0]).blend(colors[1], 2 / 3).toHex(), 'color 1');
        assert.strictEqual(palette.getColor(2), new Color(colors[1]).blend(colors[2], 1 / 3).toHex(), 'color 2');
        assert.strictEqual(palette.getColor(3), colors[2], 'color 3');
      });
      QUnit.test('More than 2 colors in source / less then size / 2', function(assert) {
        var colors = this.createColors(4);
        var palette = this.getDiscretePalette(colors, 5);
        assert.strictEqual(palette.getColor(0), colors[0], 'color 0');
        assert.strictEqual(palette.getColor(1), new Color(colors[0]).blend(colors[1], 3 / 4).toHex(), 'color 1');
        assert.strictEqual(palette.getColor(2), new Color(colors[1]).blend(colors[2], 1 / 2).toHex(), 'color 2');
        assert.strictEqual(palette.getColor(3), new Color(colors[2]).blend(colors[3], 1 / 4).toHex(), 'color 3');
        assert.strictEqual(palette.getColor(4), colors[3], 'color 4');
      });
      QUnit.module('GradientPalette', environment);
      QUnit.test('not valid', function(assert) {
        assert.strictEqual(new getGradientPalette().getColor(0), _DEBUG_palettes['material'].gradientSet[0], 'undefined');
        assert.strictEqual(new getGradientPalette().getColor(1), _DEBUG_palettes['material'].gradientSet[1], 'unknown');
      });
      QUnit.test('predefined', function(assert) {
        var palette = new getGradientPalette('violet');
        assert.strictEqual(palette.getColor(0), _DEBUG_palettes['violet'].gradientSet[0], '0');
        assert.strictEqual(palette.getColor(1), _DEBUG_palettes['violet'].gradientSet[1], '1');
        assert.strictEqual(palette.getColor(0.7), new Color(_DEBUG_palettes['violet'].gradientSet[0]).blend(_DEBUG_palettes['violet'].gradientSet[1], 0.7).toHex(), '0.7');
        assert.strictEqual(palette.getColor('test'), null, 'not valid');
        assert.strictEqual(palette.getColor(-1), null, 'out of range 1');
        assert.strictEqual(palette.getColor(2), null, 'out of range 2');
      });
      QUnit.test('resolve theme palette', function(assert) {
        assert.strictEqual(new getGradientPalette(undefined, 'DARK VIOLET').getColor(0), _DEBUG_palettes['dark violet'].gradientSet[0], 'Soft Pastel by currentPalette');
        currentPalette('material');
        assert.strictEqual(new getGradientPalette(undefined, 'DARK VIOLET').getColor(0), _DEBUG_palettes['material'].gradientSet[0], 'material');
      });
      QUnit.test('custom', function(assert) {
        var palette = new getGradientPalette(['#00ff00', '#ff0000']);
        assert.strictEqual(palette.getColor(0), '#00ff00', '0');
        assert.strictEqual(palette.getColor(1), '#ff0000', '1');
        assert.strictEqual(palette.getColor(0.3), new Color('#00ff00').blend('#ff0000', 0.3).toHex(), '0.3');
        assert.strictEqual(palette.getColor(), null, 'not valid');
        assert.strictEqual(palette.getColor(-1), null, 'out of range 1');
        assert.strictEqual(palette.getColor(2), null, 'out of range 2');
      });
      QUnit.module('Current palette', {
        beforeEach: function() {
          this.currentPalette = currentPalette;
          this.registerPalette = registerPalette;
          this.createPalette = createPalette;
        },
        afterEach: function() {
          this.currentPalette(null);
        }
      });
      QUnit.test('Getter', function(assert) {
        assert.strictEqual(this.currentPalette(), 'material');
      });
      QUnit.test('Setter', function(assert) {
        this.currentPalette('soft pastel');
        assert.strictEqual(this.currentPalette(), 'soft pastel');
      });
      QUnit.test('Setter - case sensitivity', function(assert) {
        this.currentPalette('Soft Pastel');
        assert.strictEqual(this.currentPalette(), 'soft pastel');
      });
      QUnit.test('Setter - unexisting palette', function(assert) {
        this.currentPalette('AAAAAAAAA');
        assert.strictEqual(this.currentPalette(), 'material');
      });
      QUnit.test('Setter - unexisting palette after correct change ', function(assert) {
        this.currentPalette('pastel');
        this.currentPalette('AAAAAAAAA');
        assert.strictEqual(this.currentPalette(), 'material');
      });
      QUnit.test('Create palette with current case', function(assert) {
        this.registerPalette('Current Palette', {
          simpleSet: ['c1', 'c2', 'c3'],
          indicatingSet: ['d1', 'd2']
        });
        this.currentPalette('Current Palette');
        var p = this.createPalette(undefined, {extensionMode: 'alternate'});
        assert.strictEqual(p.getNextColor(), 'c1');
      });
      QUnit.module('generateColors', environment);
      QUnit.test('Generate colors', function(assert) {
        var colors = generateColors('material', 10);
        assert.deepEqual(colors, ['#1db2f5', '#f5564a', '#c69053', '#97c95c', '#cbc83e', '#ffc720', '#f57e4a', '#eb3573', '#c93996', '#a63db8']);
      });
      QUnit.test('Generate colors less than in the palette', function(assert) {
        var colors = generateColors('material', 2);
        assert.deepEqual(colors, ['#1db2f5', '#f5564a']);
      });
      QUnit.test('Generate colors with custom palette', function(assert) {
        var colors = generateColors(['#d6e5f4', '#0f5ba3'], 4);
        assert.deepEqual(colors, ['#d6e5f4', '#73a0cc', '#0f5ba3', '#73a0cc']);
      });
      QUnit.test('Generate colors with custom palette when last color must be in end', function(assert) {
        var colors = generateColors(['#d6e5f4', '#0f5ba3'], 4, {paletteExtensionMode: 'alternate'});
        assert.deepEqual(colors, ['#d6e5f4', '#0f5ba3', '#d6e5f4', '#0f5ba3']);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","color","viz/palette"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("color"), require("viz/palette"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=palette.tests.js.map