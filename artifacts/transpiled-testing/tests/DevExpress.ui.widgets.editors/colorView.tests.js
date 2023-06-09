!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/colorView.tests.js"], ["jquery","core/utils/common","color","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils/index","generic_light.css!","ui/color_box/color_view"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/colorView.tests.js", ["jquery", "core/utils/common", "color", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "animation/fx", "events/utils/index", "generic_light.css!", "ui/color_box/color_view"], function($__export) {
  "use strict";
  var $,
      noop,
      Color,
      pointerMock,
      keyboardMock,
      fx,
      normalizeKeyName,
      TEXTEDITOR_INPUT_SELECTOR,
      COLORVIEW_PALETTE_SELECTOR,
      COLORVIEW_HUE_SCALE_SELECTOR,
      COLORVIEW_ALPHA_CHANNEL_SCALE_SELECTOR,
      move,
      click,
      showColorView;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      Color = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
      COLORVIEW_PALETTE_SELECTOR = '.dx-colorview-palette';
      COLORVIEW_HUE_SCALE_SELECTOR = '.dx-colorview-hue-scale';
      COLORVIEW_ALPHA_CHANNEL_SCALE_SELECTOR = '.dx-colorview-alpha-channel-scale';
      QUnit.testStart(function() {
        var markup = '<div class="dx-viewport"></div>\
            <div id="color-view"></div>';
        $('#qunit-fixture').html(markup);
      });
      move = function($element, position) {
        var parentOffset = $element.parent().offset();
        pointerMock($element).start().down(parentOffset.left, parentOffset.top).move(position.left, position.top).up();
      };
      click = function($element, position) {
        pointerMock($element).start().down($element.offset().left + position.left, $element.offset().top + position.top);
      };
      showColorView = function(options) {
        return this.element.dxColorView(options);
      };
      QUnit.module('ColorView', {
        beforeEach: function() {
          fx.off = true;
          this.element = $('#color-view');
          this.checkInput = function($input, expected, assert) {
            var inputInstance = $input[expected.inputType || 'dxNumberBox']('instance');
            assert.equal($input.length, 1, 'Editor is rendered');
            assert.ok(inputInstance, 'Editor is instance of dxNumberBox');
            assert.equal($input.parent().text(), expected.labelText, 'Label is correct');
            assert.ok($input.parent().hasClass(expected.labelClass), 'Editor parent has a right class');
            assert.equal(inputInstance.option('value'), expected.value, 'Editor value is correct');
          };
          this.updateColorInput = function(inputAlias, value) {
            var aliases = ['red', 'green', 'blue', 'hex', 'alpha'];
            var inputIndex = $.inArray(inputAlias, aliases);
            var $input = this.element.find('label ' + TEXTEDITOR_INPUT_SELECTOR).eq(inputIndex);
            $input.val(value);
            $input.trigger('change');
          };
          this.checkColor = function(expectedColor, assert) {
            var colorPicker = this.element.dxColorView('instance');
            var currentColor = colorPicker._currentColor;
            assert.equal(currentColor.r, expectedColor.r, 'Red color is OK');
            assert.equal(colorPicker._rgbInputs[0]._input().val(), expectedColor.r, 'Red input is OK');
            assert.equal(currentColor.g, expectedColor.g, 'Green color is OK');
            assert.equal(colorPicker._rgbInputs[1]._input().val(), expectedColor.g, 'Green input is OK');
            assert.equal(currentColor.b, expectedColor.b, 'Blue color is OK');
            assert.equal(colorPicker._rgbInputs[2]._input().val(), expectedColor.b, 'Blue input is OK');
            assert.equal(currentColor.toHex(), expectedColor.hex, 'HEX is OK');
            if (expectedColor.alpha) {
              assert.equal(currentColor.a, expectedColor.alpha, 'Alpha is OK');
            }
          };
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Render html rows', function(assert) {
          showColorView.call(this);
          var $colorPickerContainer = this.element.find('.dx-colorview-container');
          var $rows = $colorPickerContainer.find('.dx-colorview-container-row');
          assert.equal($rows.length, 1);
        });
        QUnit.test('Render html rows with alpha channel', function(assert) {
          showColorView.call(this, {editAlphaChannel: true});
          var $colorPickerContainer = this.element.find('.dx-colorview-container');
          var $rows = $colorPickerContainer.find('.dx-colorview-container-row');
          assert.equal($rows.length, 2);
          assert.ok($rows.eq(1).hasClass('dx-colorview-alpha-channel-row'));
        });
        QUnit.test('Render palette', function(assert) {
          showColorView.call(this, {value: '#9c2a2a'});
          var $palette = this.element.find('.dx-colorview-palette');
          var $gradientWhite = $palette.find('.dx-colorview-palette-gradient-white');
          var $gradientBlack = $palette.find('.dx-colorview-palette-gradient-black');
          var $colorChooser = $palette.find('.dx-colorview-palette-handle');
          var paletteBackground = $palette.css('backgroundColor');
          assert.equal($palette.length, 1);
          assert.equal(new Color(paletteBackground).toHex(), '#ff0000');
          assert.equal($gradientWhite.length, 1);
          assert.equal($gradientBlack.length, 1);
          assert.equal($colorChooser.length, 1);
          assert.ok($palette.parent().hasClass('dx-colorview-container-cell'));
          assert.ok($palette.parent().hasClass('dx-colorview-palette-cell'));
        });
        QUnit.test('Color chooser position', function(assert) {
          showColorView.call(this, {value: '#2C77B8'});
          var $colorChooserMarker = $('.dx-colorview-palette-handle');
          var markerPosition = $colorChooserMarker.position();
          assert.equal(markerPosition.left, 205);
          assert.equal(markerPosition.top, 70);
        });
        QUnit.test('Render hue scale and hue scale handle', function(assert) {
          showColorView.call(this);
          var $hueScale = this.element.find('.dx-colorview-hue-scale');
          var $hueScaleWrapper = $hueScale.closest('.dx-colorview-hue-scale-wrapper');
          var $hueScaleHandle = $hueScaleWrapper.find('.dx-colorview-hue-scale-handle');
          assert.equal($hueScale.length, 1);
          assert.equal($hueScaleHandle.length, 1);
          assert.ok($hueScaleWrapper.parent().hasClass('dx-colorview-container-cell'));
          assert.ok($hueScaleWrapper.parent().hasClass('dx-colorview-hue-scale-cell'));
        });
        QUnit.test('Hue marker position', function(assert) {
          showColorView.call(this, {value: '#2C77B8'});
          assert.equal($('.dx-colorview-hue-scale-handle').position().top, 121);
        });
        QUnit.test('Hue marker position with #ff0000', function(assert) {
          showColorView.call(this, {value: '#ff0000'});
          assert.equal($('.dx-colorview-hue-scale-handle').position().top, 286);
        });
        QUnit.test('Hue marker position with rgb(255, 0, 1)', function(assert) {
          showColorView.call(this, {value: 'rgb(255, 0, 1)'});
          assert.equal($('.dx-colorview-hue-scale-handle').position().top, 0);
        });
        QUnit.test('Render controls container', function(assert) {
          showColorView.call(this);
          var $controlsContainer = this.element.find('.dx-colorview-controls-container');
          assert.equal($controlsContainer.length, 1);
          assert.equal($controlsContainer.parent().attr('class'), 'dx-colorview-container-cell');
        });
        QUnit.test('Render RGB inputs', function(assert) {
          showColorView.call(this, {value: '#00FFA9'});
          var $red = this.element.find('.dx-colorview-controls-container label.dx-colorview-label-red .dx-texteditor');
          var $green = this.element.find('.dx-colorview-controls-container label.dx-colorview-label-green .dx-texteditor');
          var $blue = this.element.find('.dx-colorview-controls-container label.dx-colorview-label-blue .dx-texteditor');
          this.checkInput($red, {
            value: 0,
            labelText: 'R:',
            labelClass: 'dx-colorview-label-red'
          }, assert);
          this.checkInput($green, {
            value: 255,
            labelText: 'G:',
            labelClass: 'dx-colorview-label-green'
          }, assert);
          this.checkInput($blue, {
            value: 169,
            labelText: 'B:',
            labelClass: 'dx-colorview-label-blue'
          }, assert);
        });
        QUnit.test('Render hex input', function(assert) {
          showColorView.call(this, {value: '#ff0000'});
          var $hex = this.element.find('.dx-colorview-controls-container label.dx-colorview-label-hex .dx-texteditor');
          this.checkInput($hex, {
            value: 'ff0000',
            inputType: 'dxTextBox',
            labelText: '#:',
            labelClass: 'dx-colorview-label-hex'
          }, assert);
        });
        QUnit.test('Render alpha channel scale and input', function(assert) {
          showColorView.call(this, {
            editAlphaChannel: true,
            value: 'rgba(255, 0, 0, 0.5)'
          });
          var $alphaChannelScaleWrapper = this.element.find('.dx-colorview-alpha-channel-wrapper');
          var $alphaChannelScale = $alphaChannelScaleWrapper.find('.dx-colorview-alpha-channel-scale');
          var $alphaChannelLabel = this.element.find('.dx-colorview-alpha-channel-label');
          var $alphaChannelHandle = this.element.find('.dx-colorview-alpha-channel-cell').find('.dx-colorview-alpha-channel-handle');
          var $alphaChannelScaleBorder = this.element.find('.dx-colorview-alpha-channel-border');
          assert.equal($alphaChannelScaleWrapper.length, 1);
          assert.equal($alphaChannelScale.length, 1);
          assert.equal($alphaChannelHandle.length, 1);
          assert.ok($alphaChannelScaleBorder.parent().hasClass('dx-colorview-container-cell'));
          assert.ok($alphaChannelScaleBorder.parent().hasClass('dx-colorview-alpha-channel-cell'));
          assert.equal($alphaChannelLabel.length, 1);
          assert.equal($alphaChannelLabel.parent().attr('class'), 'dx-colorview-container-cell');
          this.checkColor({
            r: 255,
            g: 0,
            b: 0,
            hex: '#ff0000',
            alpha: 0.5
          }, assert);
        });
        QUnit.test('Position of alpha channel handle with rgba(255, 0, 0, 1)', function(assert) {
          showColorView.call(this, {
            editAlphaChannel: true,
            value: 'rgba(255, 0, 0, 1)'
          });
          assert.equal($('.dx-colorview-alpha-channel-handle').position().left, 0);
        });
        QUnit.test('Position of alpha channel handle with rgba(255, 0, 0, 0)', function(assert) {
          showColorView.call(this, {
            editAlphaChannel: true,
            value: 'rgba(255, 0, 0, 0)'
          });
          assert.equal(Math.round($('.dx-colorview-alpha-channel-handle').position().left), 277);
        });
        QUnit.test('Render colors preview', function(assert) {
          showColorView.call(this);
          var $colorPreviewContainer = this.element.find('.dx-colorview-color-preview-container');
          var $colorPreviewContainerInner = this.element.find('.dx-colorview-color-preview-container-inner');
          var $baseColor = $colorPreviewContainerInner.find('.dx-colorview-color-preview-color-current');
          var $newColor = $colorPreviewContainerInner.find('.dx-colorview-color-preview-color-new');
          assert.equal($colorPreviewContainer.length, 1);
          assert.equal($colorPreviewContainerInner.length, 1);
          assert.equal($baseColor.length, 1);
          assert.equal($newColor.length, 1);
          assert.equal(new Color($baseColor.css('backgroundColor')).toHex(), '#000000');
          assert.equal(new Color($newColor.css('backgroundColor')).toHex(), '#000000');
        });
        QUnit.test('Render colors preview with predefined values', function(assert) {
          showColorView.call(this, {
            value: '#fafafa',
            matchValue: '#dadada'
          });
          var $colorPreviewContainerInner = this.element.find('.dx-colorview-color-preview-container-inner');
          var $baseColor = $colorPreviewContainerInner.find('.dx-colorview-color-preview-color-current');
          var $newColor = $colorPreviewContainerInner.find('.dx-colorview-color-preview-color-new');
          assert.equal(new Color($baseColor.css('backgroundColor')).toHex(), '#dadada');
          assert.equal(new Color($newColor.css('backgroundColor')).toHex(), '#fafafa');
        });
        QUnit.test('In \'instantly\' mode \'OK\' and \'Cancel\' buttons should not be rendered', function(assert) {
          showColorView.call(this, {applyValueMode: 'instantly'});
          var $applyButton = this.element.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          var $cancelButton = this.element.find('.dx-colorview-buttons-container .dx-colorview-cancel-button');
          var $htmlRows = this.element.find('.dx-colorview-container-row');
          assert.equal($applyButton.length, 0);
          assert.equal($cancelButton.length, 0);
          assert.equal($htmlRows.length, 1);
        });
        QUnit.test('T110896', function(assert) {
          showColorView.call(this, {
            editAlphaChannel: true,
            rtlEnabled: true,
            value: 'rgba(255, 0, 0, 1)'
          });
          assert.equal(Math.round(this.element.find('.dx-colorview-alpha-channel-handle').position().left), 277);
        });
        QUnit.test('Color chooser position can be negative', function(assert) {
          showColorView.call(this);
          var $colorChooserMarker = $('.dx-colorview-palette-handle');
          move($colorChooserMarker, {
            left: 220,
            top: -16
          });
          assert.equal(parseInt($colorChooserMarker.position().top, 10), -14);
        });
        QUnit.test('Update color values', function(assert) {
          showColorView.call(this, {value: '#2C77B8'});
          var $colorChooserMarker = this.element.find('.dx-colorview-palette-handle');
          move($colorChooserMarker, {
            left: 220,
            top: 80
          });
          this.checkColor({
            r: 45,
            g: 120,
            b: 186,
            hex: '#2d78ba'
          }, assert);
        });
        QUnit.test('Update alpha', function(assert) {
          showColorView.call(this, {editAlphaChannel: true});
          var $alphaHandle = this.element.find('.dx-colorview-alpha-channel-handle');
          move($alphaHandle, {
            left: 143,
            top: 0
          });
          this.checkColor({
            r: 0,
            g: 0,
            b: 0,
            hex: '#000000',
            alpha: 0.51
          }, assert);
        });
        QUnit.test('Change Saturation and Value by click', function(assert) {
          showColorView.call(this, {value: 'green'});
          var $palette = this.element.find('.dx-colorview-palette');
          click($palette, {
            left: 170,
            top: 170
          });
          this.checkColor({
            r: 45,
            g: 110,
            b: 45,
            hex: '#2d6e2d'
          }, assert);
        });
        QUnit.test('Change Hue by click', function(assert) {
          showColorView.call(this, {value: 'green'});
          var $hueScale = this.element.find('.dx-colorview-hue-scale');
          click($hueScale, {
            left: 0,
            top: 90
          });
          this.checkColor({
            r: 32,
            g: 0,
            b: 127,
            hex: '#20007f'
          }, assert);
        });
        QUnit.test('Change Alpha by click', function(assert) {
          showColorView.call(this, {editAlphaChannel: true});
          var $alphaScale = this.element.find('.dx-colorview-alpha-channel-scale');
          click($alphaScale, {
            left: 88,
            top: 0
          });
          this.checkColor({
            r: 0,
            g: 0,
            b: 0,
            hex: '#000000',
            alpha: 0.7
          }, assert);
        });
        QUnit.test('RGB, Hex, Alpha updating', function(assert) {
          showColorView.call(this, {
            value: '#ff0000',
            editAlphaChannel: true
          });
          this.updateColorInput('red', 100);
          this.checkColor({
            r: 100,
            g: 0,
            b: 0,
            hex: '#640000',
            alpha: 1
          }, assert);
          this.updateColorInput('green', 100);
          this.checkColor({
            r: 100,
            g: 100,
            b: 0,
            hex: '#646400',
            alpha: 1
          }, assert);
          this.updateColorInput('blue', 100);
          this.checkColor({
            r: 100,
            g: 100,
            b: 100,
            hex: '#646464',
            alpha: 1
          }, assert);
          this.updateColorInput('hex', '551414');
          this.checkColor({
            r: 85,
            g: 20,
            b: 20,
            hex: '#551414',
            alpha: 1
          }, assert);
          this.updateColorInput('alpha', 0.5);
          this.checkColor({
            r: 85,
            g: 20,
            b: 20,
            hex: '#551414',
            alpha: 0.5
          }, assert);
        });
        QUnit.test('Markers position after color updating', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('red', 200);
          this.updateColorInput('alpha', 0.5);
          assert.equal($('.dx-colorview-palette-handle').position().top, 52);
          assert.equal($('.dx-colorview-palette-handle').position().left, 202);
          assert.equal($('.dx-colorview-hue-scale-handle').position().top, 270);
          assert.ok(Math.abs($('.dx-colorview-alpha-channel-handle').position().left - 138) <= 1);
        });
        QUnit.test('Validate a wrong value of alpha channel', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('alpha', 1.5);
          this.checkColor({
            r: 100,
            g: 100,
            b: 50,
            hex: '#646432',
            alpha: 1
          }, assert);
        });
        QUnit.test('Validate a negative value', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('red', -100);
          this.checkColor({
            r: 0,
            g: 100,
            b: 50,
            hex: '#006432',
            alpha: 1
          }, assert);
        });
        QUnit.test('ColorView should apply a black color when an invalid value is passed (T1127428)', function(assert) {
          showColorView.call(this, {value: ['red', 'green']});
          this.checkColor({
            r: 0,
            g: 0,
            b: 0,
            hex: '#000000',
            alpha: 1
          }, assert);
        });
        QUnit.test('Validate a too large value', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('green', 300);
          this.checkColor({
            r: 100,
            g: 255,
            b: 50,
            hex: '#64ff32',
            alpha: 1
          }, assert);
        });
        QUnit.test('Validate a float value', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('blue', 1.2);
          this.checkColor({
            r: 100,
            g: 100,
            b: 50,
            hex: '#646432',
            alpha: 1
          }, assert);
        });
        QUnit.test('Validate a wrong hex value', function(assert) {
          showColorView.call(this, {
            value: '#646432',
            editAlphaChannel: true
          });
          this.updateColorInput('hex', '551Z14');
          this.checkColor({
            r: 100,
            g: 100,
            b: 50,
            hex: '#646432',
            alpha: 1
          }, assert);
        });
        QUnit.test('When some color param was changed (invalid) alpha channel is OK', function(assert) {
          showColorView.call(this, {
            value: 'rgba(255, 0, 0, 0.3)',
            editAlphaChannel: true
          });
          this.updateColorInput('blue', 500);
          this.updateColorInput('alpha', 1.5);
          this.checkColor({
            r: 255,
            g: 0,
            b: 255,
            hex: '#ff00ff',
            alpha: 1
          }, assert);
        });
        QUnit.test('Update hue with gray color', function(assert) {
          showColorView.call(this, {value: '#666666'});
          var $hueScale = this.element.find('.dx-colorview-hue-scale');
          var $palette = this.element.find('.dx-colorview-palette');
          click($hueScale, {
            left: 0,
            top: 90
          });
          var $paletteBackColor = new Color($palette.css('backgroundColor')).toHex();
          assert.equal($paletteBackColor, '#4000ff');
        });
        QUnit.test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          showColorView.call(this, {onValueChanged: function() {
              assert.ok(true);
            }}).dxColorView('instance').option('value', true);
        });
        QUnit.test('ColorPicker should can update value instantly', function(assert) {
          var newColor = new Color('#ba2d2d');
          var spy = sinon.spy(noop);
          var colorPicker = showColorView.call(this, {
            onValueChanged: spy,
            applyValueMode: 'instantly'
          }).dxColorView('instance');
          var $colorChooserMarker = $('.dx-colorview-palette-handle');
          move($colorChooserMarker, {
            left: 220,
            top: 80
          });
          assert.equal(colorPicker.option('value'), newColor.toHex());
          assert.ok(spy.called);
          this.checkColor({
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
            hex: newColor.toHex()
          }, assert);
        });
        QUnit.test('\'instantly\' mode should work for alpha channel', function(assert) {
          var colorPicker = showColorView.call(this, {
            value: 'rgba(100, 100, 100, .2)',
            editAlphaChannel: true,
            applyValueMode: 'instantly'
          }).dxColorView('instance');
          this.updateColorInput('alpha', 0.75);
          assert.equal(colorPicker.option('value'), 'rgba(100, 100, 100, 0.75)');
        });
        QUnit.test('In \'instantly\' mode value should be updated if some input was updated', function(assert) {
          var colorPicker = showColorView.call(this, {
            value: '#ff0000',
            applyValueMode: 'instantly'
          }).dxColorView('instance');
          this.updateColorInput('red', 100);
          assert.equal(colorPicker.option('value'), '#640000');
          this.updateColorInput('green', 100);
          assert.equal(colorPicker.option('value'), '#646400');
          this.updateColorInput('blue', 100);
          assert.equal(colorPicker.option('value'), '#646464');
          this.updateColorInput('hex', '0000ff');
          assert.equal(colorPicker.option('value'), '#0000ff');
        });
        QUnit.test('Update \'applyValueMode\' option if editAlphaChannel is true', function(assert) {
          var instance = showColorView.call(this, {editAlphaChannel: true}).dxColorView('instance');
          instance.option('applyValueMode', 'instantly');
          instance.option('applyValueMode', 'useButtons');
          var $alphaChannelRow = this.element.find('.dx-colorview-container-row').eq(1);
          assert.ok($alphaChannelRow.hasClass('dx-colorview-alpha-channel-row'));
          assert.equal($alphaChannelRow.find('.dx-colorview-alpha-channel-cell').length, 1);
        });
        QUnit.test('T102286: opacity = 1', function(assert) {
          showColorView.call(this, {
            value: 'rgba(255, 0, 0, .5)',
            editAlphaChannel: true
          });
          var $alphaHandle = this.element.find('.dx-colorview-alpha-channel-handle');
          move($alphaHandle, {
            left: 0,
            top: 0
          });
          this.checkColor({
            r: 255,
            g: 0,
            b: 0,
            hex: '#ff0000',
            alpha: 1
          }, assert);
        });
        QUnit.test('T102286: opacity = 0', function(assert) {
          showColorView.call(this, {
            value: 'rgba(255, 0, 0, .5)',
            editAlphaChannel: true
          });
          var $alphaHandle = this.element.find('.dx-colorview-alpha-channel-handle');
          move($alphaHandle, {
            left: 500,
            top: 0
          });
          assert.equal($('.dx-colorview-alpha-channel-label input').val(), 0);
        });
        QUnit.test('T104929', function(assert) {
          var instance = showColorView.call(this, {editAlphaChannel: false}).dxColorView('instance');
          instance.option('editAlphaChannel', true);
          var $htmlRows = this.element.find('.dx-colorview-container-row');
          assert.equal($htmlRows.eq(1).find('.dx-colorview-alpha-channel-scale').length, 1);
          assert.equal($htmlRows.eq(1).find('.dx-colorview-alpha-channel-label .dx-texteditor').length, 1);
          assert.equal($htmlRows.length, 2);
          instance.option('editAlphaChannel', false);
          assert.equal(this.element.find('.dx-colorview-alpha-channel-scale').length, 0);
          assert.equal(this.element.find('.dx-colorview-alpha-channel-label .dx-texteditor').length, 0);
          assert.equal(this.element.find('.dx-colorview-container-row').length, 1);
        });
        QUnit.test('T110896: move handle', function(assert) {
          showColorView.call(this, {
            editAlphaChannel: true,
            rtlEnabled: true,
            value: 'rgba(255, 0, 0, 1)'
          });
          var $alphaHandle = this.element.find('.dx-colorview-alpha-channel-handle');
          move($alphaHandle, {
            left: 70,
            top: 0
          });
          this.checkColor({
            r: 255,
            g: 0,
            b: 0,
            hex: '#ff0000',
            alpha: 0.25
          }, assert);
        });
        QUnit.test('T112555', function(assert) {
          showColorView.call(this, {value: '#001AFF'});
          var $hueMarker = this.element.find('.dx-colorview-hue-scale-handle');
          move($hueMarker, {
            left: 0,
            top: 0
          });
          this.checkColor({
            r: 255,
            g: 0,
            b: 0,
            hex: '#ff0000'
          }, assert);
        });
        QUnit.test('Markup should be updated when value was changed', function(assert) {
          var colorView = showColorView.call(this, {
            value: 'rgba(94, 169, 219, 0.62)',
            editAlphaChannel: true
          }).dxColorView('instance');
          colorView.option('value', 'rgba(48, 84, 46, 0.19)');
          var paletteHandlePosition = colorView._$paletteHandle.position();
          var alphaChannelHandlePosition = colorView._$alphaChannelHandle.position();
          var hueScaleHandlePosition = colorView._$hueScaleHandle.position();
          assert.equal(Math.floor(paletteHandlePosition.left), 116);
          assert.equal(Math.floor(paletteHandlePosition.top), 186);
          assert.equal(Math.floor(alphaChannelHandlePosition.left), 224);
          assert.equal(Math.floor(alphaChannelHandlePosition.top), -6);
          assert.equal(Math.floor(hueScaleHandlePosition.left), -7);
          assert.equal(Math.floor(hueScaleHandlePosition.top), 193);
        });
        QUnit.test('Preview for current color should be updated when value was changed', function(assert) {
          var colorView = showColorView.call(this, {
            value: 'red',
            matchValue: 'red'
          }).dxColorView('instance');
          var $baseColor = this.element.find('.dx-colorview-color-preview-color-current');
          var $newColor = this.element.find('.dx-colorview-color-preview-color-new');
          colorView.option('value', 'green');
          assert.equal(new Color($baseColor.css('backgroundColor')).toHex(), '#ff0000', 'base preview keeps initial match value');
          assert.equal(new Color($newColor.css('backgroundColor')).toHex(), '#008000', 'new color preview show selected value');
        });
        QUnit.test('Click on label should not focus the input (T179488)', function(assert) {
          var isDefaultPrevented;
          this.$element = $('#color-view').dxColorView({focusStateEnabled: true});
          var $label = this.$element.find('.dx-colorview-label-red');
          $label.on('dxclick', function(e) {
            isDefaultPrevented = e.isDefaultPrevented();
          });
          $label.trigger('dxclick');
          assert.ok(isDefaultPrevented, 'PreventDefault on label click is enabled');
        });
        QUnit.test('Color view renders the editors with default stylingMode', function(assert) {
          this.$element = $('#color-view').dxColorView({});
          var $editors = this.$element.find('.dx-editor-outlined');
          assert.equal($editors.length, 4, 'the number of outlined editors is correct');
        });
        QUnit.test('Color view renders the editors according to stylingMode option', function(assert) {
          this.$element = $('#color-view').dxColorView({stylingMode: 'underlined'});
          var $editors = this.$element.find('.dx-editor-underlined');
          var $outlinedEditors = this.$element.find('.dx-editor-outlined');
          assert.equal($editors.length, 4, 'the number of underlined editors is correct');
          assert.equal($outlinedEditors.length, 0, 'there are no outlined editors');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.$element = $('#color-view').dxColorView({
            value: 'rgba(50, 100, 100, 0.37)',
            editAlphaChannel: true,
            applyValueMode: 'instantly',
            focusStateEnabled: true,
            keyStep: 10
          });
          this.instance = this.$element.dxColorView('instance');
          this.$element.trigger('focus');
          this.keyboard = keyboardMock(this.$element);
          this.$hueMarker = this.$element.find('.dx-colorview-hue-scale-handle');
          this.$alphaMarker = this.$element.find('.dx-colorview-alpha-channel-handle');
          this.$paletteMarker = this.$element.find('.dx-colorview-palette-handle');
          this.ctrlLeft = $.Event('keydown', {
            key: 'ArrowLeft',
            ctrlKey: true
          });
          this.ctrlUp = $.Event('keydown', {
            key: 'ArrowUp',
            ctrlKey: true
          });
          this.ctrlRight = $.Event('keydown', {
            key: 'ArrowRight',
            ctrlKey: true
          });
          this.ctrlDown = $.Event('keydown', {
            key: 'ArrowDown',
            ctrlKey: true
          });
          this.commandLeft = $.Event('keydown', {
            key: 'ArrowLeft',
            metaKey: true
          });
          this.commandUp = $.Event('keydown', {
            key: 'ArrowUp',
            metaKey: true
          });
          this.commandRight = $.Event('keydown', {
            key: 'ArrowRight',
            metaKey: true
          });
          this.commandDown = $.Event('keydown', {
            key: 'ArrowDown',
            metaKey: true
          });
          this.shiftLeft = $.Event('keydown', {
            key: 'ArrowLeft',
            shiftKey: true
          });
          this.shiftUp = $.Event('keydown', {
            key: 'ArrowUp',
            shiftKey: true
          });
          this.shiftRight = $.Event('keydown', {
            key: 'ArrowRight',
            shiftKey: true
          });
          this.shiftDown = $.Event('keydown', {
            key: 'ArrowDown',
            shiftKey: true
          });
          this.ctrlShiftLeft = $.Event('keydown', {
            key: 'ArrowLeft',
            ctrlKey: true,
            shiftKey: true
          });
          this.ctrlShiftUp = $.Event('keydown', {
            key: 'ArrowUp',
            ctrlKey: true,
            shiftKey: true
          });
          this.ctrlShiftRight = $.Event('keydown', {
            key: 'ArrowRight',
            ctrlKey: true,
            shiftKey: true
          });
          this.ctrlShiftDown = $.Event('keydown', {
            key: 'ArrowDown',
            ctrlKey: true,
            shiftKey: true
          });
          this.commandShiftLeft = $.Event('keydown', {
            key: 'ArrowLeft',
            ctrlKey: true,
            shiftKey: true
          });
          this.commandShiftUp = $.Event('keydown', {
            key: 'ArrowUp',
            ctrlKey: true,
            shiftKey: true
          });
          this.commandShiftRight = $.Event('keydown', {
            key: 'ArrowRight',
            ctrlKey: true,
            shiftKey: true
          });
          this.commandShiftDown = $.Event('keydown', {
            key: 'ArrowDown',
            ctrlKey: true,
            shiftKey: true
          });
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('\'up\' key test', function(assert) {
          this.keyboard.keyDown('up');
          assert.equal(this.instance.option('value'), 'rgba(51, 102, 102, 0.37)', 'value was changed correctly when \'up\' was pressed');
        });
        QUnit.test('\'shiftUp\' key test', function(assert) {
          this.$element.trigger(this.shiftUp);
          assert.equal(this.instance.option('value'), 'rgba(54, 107, 107, 0.37)', 'value was changed correctly when \'shift+up\' was pressed');
        });
        QUnit.test('\'down\' key test', function(assert) {
          this.keyboard.keyDown('down');
          assert.equal(this.instance.option('value'), 'rgba(48, 97, 97, 0.37)', 'value was changed correctly when \'down\' was pressed');
        }), QUnit.test('\'shiftDown\' key test', function(assert) {
          this.$element.trigger(this.shiftDown);
          assert.equal(this.instance.option('value'), 'rgba(46, 92, 92, 0.37)', 'value was changed correctly when \'shift+down\' was pressed');
        });
        QUnit.test('\'right\' key test', function(assert) {
          this.keyboard.keyDown('right');
          assert.equal(this.instance.option('value'), 'rgba(49, 99, 99, 0.37)', 'value was changed correctly when \'right\' was pressed');
        }), QUnit.test('\'shiftRight\' key test', function(assert) {
          this.$element.trigger(this.shiftRight);
          assert.equal(this.instance.option('value'), 'rgba(47, 99, 99, 0.37)', 'value was changed correctly when \'shift+right\' was pressed');
        });
        QUnit.test('\'left\' key test', function(assert) {
          this.keyboard.keyDown('left');
          assert.equal(this.instance.option('value'), 'rgba(51, 99, 99, 0.37)', 'value was changed correctly when \'left\' was pressed');
        }), QUnit.test('\'shiftLeft\' key test', function(assert) {
          this.$element.trigger(this.shiftLeft);
          assert.equal(this.instance.option('value'), 'rgba(53, 99, 99, 0.37)', 'value was changed correctly when \'shift+left\' was pressed');
        });
        QUnit.test('\'ctrlUp\' key test', function(assert) {
          this.$element.trigger(this.ctrlUp);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 99, 0.37)', 'value was changed correctly when \'ctrl+up\' was pressed');
        });
        QUnit.test('\'commandUp\' key test', function(assert) {
          this.$element.trigger(this.commandUp);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 99, 0.37)', 'value was changed correctly when \'command+up\' was pressed');
        });
        QUnit.test('\'ctrlShiftUp\' key test', function(assert) {
          this.$element.trigger(this.ctrlShiftUp);
          assert.equal(this.instance.option('value'), 'rgba(50, 89, 99, 0.37)', 'value was changed correctly when \'ctrl+shift+up\' was pressed');
        });
        QUnit.test('\'commandShiftUp\' key test', function(assert) {
          this.$element.trigger(this.commandShiftUp);
          assert.equal(this.instance.option('value'), 'rgba(50, 89, 99, 0.37)', 'value was changed correctly when \'command+shift+up\' was pressed');
        });
        QUnit.test('\'ctrlDown\' key test', function(assert) {
          this.$element.trigger(this.ctrlDown);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 99, 0.37)', 'value was changed correctly when \'ctrl+down\' was pressed');
        });
        QUnit.test('\'commandDown\' key test', function(assert) {
          this.$element.trigger(this.commandDown);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 99, 0.37)', 'value was changed correctly when \'command+down\' was pressed');
        });
        QUnit.test('\'ctrlShiftDown\' key test', function(assert) {
          this.$element.trigger(this.ctrlShiftDown);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 89, 0.37)', 'value was changed correctly when \'ctrl+shift+down\' was pressed');
        });
        QUnit.test('\'commandShiftDown\' key test', function(assert) {
          this.$element.trigger(this.commandShiftDown);
          assert.equal(this.instance.option('value'), 'rgba(50, 99, 89, 0.37)', 'value was changed correctly when \'command+shift+down\' was pressed');
        });
        QUnit.test('\'ctrlRight\' key test', function(assert) {
          this.$element.trigger(this.ctrlRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'ctrl+right\' was pressed');
        });
        QUnit.test('\'commandRight\' key test', function(assert) {
          this.$element.trigger(this.commandRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'command+right\' was pressed');
        });
        QUnit.test('\'ctrlShiftRight\' key test', function(assert) {
          this.instance.option('value', 'rgba(50, 100, 100, 0.4)');
          this.$element.trigger(this.ctrlShiftRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'ctrl+shift+right\' was pressed');
        });
        QUnit.test('\'commandShiftRight\' key test', function(assert) {
          this.instance.option('value', 'rgba(50, 100, 100, 0.4)');
          this.$element.trigger(this.commandShiftRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'command+shift+right\' was pressed');
        });
        QUnit.test('\'ctrlLeft\' key test', function(assert) {
          this.$element.trigger(this.ctrlLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.38)', 'value was changed correctly when \'ctrl+left\' was pressed');
        });
        QUnit.test('\'commandLeft\' key test', function(assert) {
          this.$element.trigger(this.commandLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.38)', 'value was changed correctly when \'command+left\' was pressed');
        });
        QUnit.test('\'ctrlShiftLeft\' key test', function(assert) {
          this.$element.trigger(this.ctrlShiftLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.41)', 'value was changed correctly when \'ctrl+shift+left\' was pressed');
        });
        QUnit.test('\'commandShiftLeft\' key test', function(assert) {
          this.$element.trigger(this.commandShiftLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.41)', 'value was changed correctly when \'command+shift+left\' was pressed');
        });
        QUnit.test('\'ctrlRight\' key test, rtl mode', function(assert) {
          this.$element.dxColorView('instance').option('rtlEnabled', true);
          this.$element.trigger(this.ctrlRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.38)', 'value was changed correctly when \'ctrl+right\' was pressed');
        });
        QUnit.test('\'commandRight\' key test, rtl mode', function(assert) {
          this.$element.dxColorView('instance').option('rtlEnabled', true);
          this.$element.trigger(this.commandRight);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.38)', 'value was changed correctly when \'command+right\' was pressed');
        });
        QUnit.test('\'ctrlLeft\' key test, rtl mode', function(assert) {
          this.$element.dxColorView('instance').option('rtlEnabled', true);
          this.$element.trigger(this.ctrlLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'ctrl+left\' was pressed');
        });
        QUnit.test('\'commandLeft\' key test, rtl mode', function(assert) {
          this.$element.dxColorView('instance').option('rtlEnabled', true);
          this.$element.trigger(this.commandLeft);
          assert.equal(this.instance.option('value'), 'rgba(50, 100, 100, 0.36)', 'value was changed correctly when \'command+left\' was pressed');
        });
        QUnit.test('setting hueHandler to top position by keybord navigation change color to rgb(255,0,0)', function(assert) {
          this.instance.option('value', 'rgba(255,0,4,1)');
          this.$element.trigger(this.ctrlUp);
          assert.equal(this.instance.option('value'), 'rgba(255, 0, 0, 1)', 'value was changed correctly when handler was placed to the top position');
        });
        QUnit.test('setting hueHandler to top position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(255 , 0, 4, 1)');
          this.$element.trigger(this.ctrlUp);
          var topOffset = this.$hueMarker.offset().top;
          this.$element.trigger(this.ctrlUp);
          assert.equal(topOffset, this.$hueMarker.offset().top, 'pressing on the \'ctrl+up\' in top position does not move handler');
          this.$element.trigger(this.ctrlDown);
          assert.equal(this.instance.option('value'), 'rgba(255, 0, 4, 1)', 'value was changed correctly when \'ctrl+down\' was pressed');
        });
        QUnit.test('setting hueHandler to bottom position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(255, 4, 0, 1)');
          this.$element.trigger(this.ctrlDown);
          var topOffset = this.$hueMarker.offset().top;
          this.$element.trigger(this.ctrlDown);
          assert.equal(topOffset, this.$hueMarker.offset().top, 'pressing on the \'ctrl+down\' in bottom position does not move handler');
          this.$element.trigger(this.ctrlUp);
          assert.equal(this.instance.option('value'), 'rgba(255, 4, 0, 1)', 'value was changed correctly when \'ctrl+up\' was pressed');
        });
        QUnit.test('setting paletteHandler to top position by keybord navigation change color to rgb(255,0,0)', function(assert) {
          this.instance.option('value', 'rgba(255,0,4,1)');
          this.$element.trigger(this.ctrlUp);
          assert.equal(this.instance.option('value'), 'rgba(255, 0, 0, 1)', 'value was changed correctly when handler was placed to the top position');
        });
        QUnit.test('setting paletteHandler to top position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(255,145,145,1)');
          var topOffset = this.$paletteMarker.offset().top;
          this.keyboard.keyDown('up');
          assert.equal(topOffset, this.$paletteMarker.offset().top, 'pressing on the \'up\' in top position does not move handler');
          this.keyboard.keyDown('down');
          assert.equal(this.instance.option('value'), 'rgba(252, 144, 144, 1)', 'value was changed correctly when \'down\' was pressed');
        });
        QUnit.test('setting paletteHandler to top position by keybord navigation using keyStep change color correctly', function(assert) {
          this.instance.option('value', 'rgba(252,144,144,1)');
          this.$element.trigger(this.shiftUp);
          this.$element.trigger(this.shiftDown);
          assert.equal(this.instance.option('value'), 'rgba(247, 141, 141, 1)', 'value was changed correctly when \'down\' was pressed');
        });
        QUnit.test('setting paletteHandler to bottom position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(3,1,1,1)');
          this.keyboard.keyDown('down');
          var topOffset = this.$paletteMarker.offset().top;
          this.keyboard.keyDown('down');
          assert.equal(topOffset, this.$paletteMarker.offset().top, 'pressing on the \'down\' in bottom position does not move handler');
          this.keyboard.keyDown('up');
          assert.equal(this.instance.option('value'), 'rgba(3, 1, 1, 1)', 'value was changed correctly when \'up\' was pressed');
        });
        QUnit.test('setting paletteHandler to bottom position by keybord navigation using keyStep change color correctly', function(assert) {
          this.instance.option('value', 'rgba(5,1,1,1)');
          this.$element.trigger(this.shiftDown);
          this.$element.trigger(this.shiftUp);
          assert.equal(this.instance.option('value'), 'rgba(8, 2, 2, 1)', 'value was changed correctly when \'up\' was pressed');
        });
        QUnit.test('setting paletteHandler to left position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(140,140,140,1)');
          var leftOffset = this.$paletteMarker.offset().left;
          this.keyboard.keyDown('left');
          assert.equal(leftOffset, this.$paletteMarker.offset().left, 'pressing on the \'left\' in left position does not move handler');
          this.keyboard.keyDown('right');
          assert.equal(this.instance.option('value'), 'rgba(140, 139, 139, 1)', 'value was changed correctly when \'right\' was pressed');
        });
        QUnit.test('setting paletteHandler to left position by keybord navigation using keyStep change color correctly', function(assert) {
          this.instance.option('value', 'rgba(145,140,140,1)');
          this.$element.trigger(this.shiftLeft);
          this.$element.trigger(this.shiftRight);
          assert.equal(this.instance.option('value'), 'rgba(145, 141, 141, 1)', 'value was changed correctly when \'right\' was pressed');
        });
        QUnit.test('setting paletteHandler to right position by keybord navigation change color correctly', function(assert) {
          this.instance.option('value', 'rgba(130,0,0,1)');
          var leftOffset = this.$paletteMarker.offset().left;
          this.keyboard.keyDown('right');
          assert.equal(leftOffset, this.$paletteMarker.offset().left, 'pressing on the \'right\' in left position does not move handler');
          this.keyboard.keyDown('left');
          assert.equal(this.instance.option('value'), 'rgba(130, 1, 1, 1)', 'value was changed correctly when \'left\' was pressed');
        });
        QUnit.test('setting paletteHandler to right position by keybord navigation using keyStep change color correctly', function(assert) {
          this.instance.option('value', 'rgba(130,1,1,1)');
          this.$element.trigger(this.shiftRight);
          this.$element.trigger(this.shiftLeft);
          assert.equal(this.instance.option('value'), 'rgba(130, 4, 4, 1)', 'value was changed correctly when \'left\' was pressed');
        });
        QUnit.test('setting alphaChannelHandler to right position by keybord navigation change alpha correctly', function(assert) {
          this.instance.option('value', 'rgba(255, 0, 0, 0.01)');
          this.$element.trigger(this.ctrlRight);
          var leftOffset = this.$alphaMarker.offset().left;
          this.$element.trigger(this.ctrlRight);
          assert.equal(leftOffset, this.$alphaMarker.offset().left, 'pressing on the \'ctrl+right\' in right position does not move handler');
          this.$element.trigger(this.ctrlLeft);
          assert.equal(this.instance.option('value'), 'rgba(255, 0, 0, 0.01)', 'alpha was changed correctly when \'ctrl+left\' was pressed');
        });
        QUnit.test('setting alphaChannelHandler to left position by keybord navigation change alpha correctly', function(assert) {
          this.instance.option('value', 'rgba(255, 0, 0, 0.99)');
          this.$element.trigger(this.ctrlLeft);
          var leftOffset = this.$alphaMarker.offset().left;
          this.$element.trigger(this.ctrlLeft);
          assert.equal(leftOffset, this.$alphaMarker.offset().left, 'pressing on the \'ctrl+left\' in left position does not move handler');
          this.$element.trigger(this.ctrlRight);
          assert.equal(this.instance.option('value'), 'rgba(255, 0, 0, 0.99)', 'alpha was changed correctly when \'ctrl+right\' was pressed');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria labels for editors', function(assert) {
          var $element = $('#color-view').dxColorView({editAlphaChannel: true});
          var $r = $element.find('.dx-colorview-label-red .dx-numberbox');
          var $g = $element.find('.dx-colorview-label-green .dx-numberbox');
          var $b = $element.find('.dx-colorview-label-blue .dx-numberbox');
          var $alpha = $element.find('.dx-colorview-alpha-channel-label .dx-numberbox');
          var $code = $element.find('.dx-colorview-label-hex .dx-textbox');
          assert.equal($r.attr('aria-label'), 'Red', 'red label is correct');
          assert.equal($g.attr('aria-label'), 'Green', 'green label is correct');
          assert.equal($b.attr('aria-label'), 'Blue', 'blue label is correct');
          assert.equal($alpha.attr('aria-label'), 'Transparency', 'alpha label is correct');
          assert.equal($code.attr('aria-label'), 'Color code', 'hex label is correct');
        });
      });
      QUnit.module('valueChanged handler should receive correct event', {
        beforeEach: function() {
          var $__2 = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.valueChangedHandler = sinon.stub();
          var initialOptions = {
            onValueChanged: this.valueChangedHandler,
            editAlphaChannel: true,
            focusStateEnabled: true
          };
          this.init = function(options) {
            $__2.$element = $('#color-view').dxColorView(options);
            $__2.instance = $__2.$element.dxColorView('instance');
            $__2.keyboard = keyboardMock($__2.$element);
            $__2.$palette = $__2.$element.find(COLORVIEW_PALETTE_SELECTOR);
            $__2.$hueScale = $__2.$element.find(COLORVIEW_HUE_SCALE_SELECTOR);
            $__2.$alphaChannelScale = $__2.$element.find(COLORVIEW_ALPHA_CHANNEL_SCALE_SELECTOR);
          };
          this.reinit = function(options) {
            $__2.instance.dispose();
            $__2.init($.extend({}, initialOptions, options));
          };
          this.testProgramChange = function(assert) {
            $__2.instance.option('value', '#704f4f');
            var callCount = $__2.valueChangedHandler.callCount;
            var event = $__2.valueChangedHandler.getCall(callCount - 1).args[0].event;
            assert.strictEqual(event, undefined, 'event is undefined');
          };
          this.aliases = ['red', 'green', 'blue', 'hex', 'alpha'];
          this._getColorInput = function(inputAlias) {
            var inputIndex = $.inArray(inputAlias, this.aliases);
            return this.$element.find(("label " + TEXTEDITOR_INPUT_SELECTOR)).eq(inputIndex);
          };
          this.updateColorInput = function(inputAlias, value) {
            var $input = this._getColorInput(inputAlias);
            $input.val(value);
            $input.trigger('change');
          };
          this.checkEvent = function(assert, type, target, key) {
            var event = $__2.valueChangedHandler.getCall(0).args[0].event;
            assert.strictEqual(event.type, type, 'event type is correct');
            assert.strictEqual(event.target, target.get(0), 'event target is correct');
            if (type === 'keydown') {
              assert.strictEqual(normalizeKeyName(event), normalizeKeyName({key: key}), 'event key is correct');
            }
          };
          this.init(initialOptions);
        },
        afterEach: function() {
          fx.off = true;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('on runtime change', function(assert) {
          this.testProgramChange(assert);
        });
        QUnit.test('on click on palette', function(assert) {
          click(this.$palette, {
            left: 170,
            top: 170
          });
          this.checkEvent(assert, 'dxpointerdown', this.$palette);
          this.testProgramChange(assert);
        });
        ['upArrow', 'downArrow'].forEach(function(key) {
          QUnit.test(("on " + key + " press"), function(assert) {
            this.reinit({value: 'rgba(15, 14, 14, 1)'});
            this.keyboard.press(key);
            this.checkEvent(assert, 'keydown', this.$element, key);
            this.testProgramChange(assert);
          });
        });
        ['upArrow', 'downArrow'].forEach(function(key) {
          QUnit.test(("on " + key + "+ctrl press"), function(assert) {
            this.reinit({value: 'rgba(14, 15, 14, 1)'});
            for (var i = 0; i < 13; ++i) {
              this.keyboard.keyDown(key, {ctrlKey: true});
            }
            this.checkEvent(assert, 'keydown', this.$element, key);
            this.testProgramChange(assert);
          });
        });
        ['leftArrow', 'rightArrow'].forEach(function(key) {
          QUnit.test(("on " + key + "+ctrl press"), function(assert) {
            this.reinit({value: 'rgba(14, 15, 14, 0.65)'});
            this.keyboard.keyDown(key, {ctrlKey: true});
            this.checkEvent(assert, 'keydown', this.$element, key);
            this.testProgramChange(assert);
          });
        });
        ['leftArrow', 'rightArrow'].forEach(function(key) {
          QUnit.test(("on " + key + " press"), function(assert) {
            this.reinit({value: 'rgba(15, 14, 14, 1)'});
            for (var i = 0; i < 6; ++i) {
              this.keyboard.press(key);
            }
            this.checkEvent(assert, 'keydown', this.$element, key);
            this.testProgramChange(assert);
          });
        });
        QUnit.test('on click on hue scale', function(assert) {
          click(this.$hueScale, {
            left: 170,
            top: 170
          });
          this.checkEvent(assert, 'dxpointerdown', this.$hueScale);
          this.testProgramChange(assert);
        });
        QUnit.test('on click on alpha channel scale', function(assert) {
          click(this.$alphaChannelScale, {
            left: 88,
            top: 0
          });
          this.checkEvent(assert, 'dxpointerdown', this.$alphaChannelScale);
          this.testProgramChange(assert);
        });
        ['red', 'green', 'blue'].forEach(function(inputAlias) {
          QUnit.test(("on " + inputAlias + " text input change"), function(assert) {
            this.updateColorInput(inputAlias, 100);
            var $input = this._getColorInput(inputAlias);
            this.checkEvent(assert, 'change', $input);
            this.testProgramChange(assert);
          });
        });
        QUnit.test('on hex text input change', function(assert) {
          this.updateColorInput('hex', '551414');
          var $input = this._getColorInput('hex');
          this.checkEvent(assert, 'change', $input);
          this.testProgramChange(assert);
        });
        QUnit.test('on alpha text input change', function(assert) {
          this.updateColorInput('alpha', 0.5);
          var $input = this._getColorInput('alpha');
          this.checkEvent(assert, 'change', $input);
          this.testProgramChange(assert);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","color","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils","generic_light.css!","ui/color_box/color_view"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("color"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("animation/fx"), require("events/utils"), require("generic_light.css!"), require("ui/color_box/color_view"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=colorView.tests.js.map