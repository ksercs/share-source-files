!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/colorBox.tests.js"], ["jquery","core/utils/common","core/devices","color","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils/index","generic_light.css!","ui/color_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/colorBox.tests.js", ["jquery", "core/utils/common", "core/devices", "color", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "animation/fx", "events/utils/index", "generic_light.css!", "ui/color_box"], function($__export) {
  "use strict";
  var $,
      noop,
      devices,
      Color,
      pointerMock,
      keyboardMock,
      fx,
      normalizeKeyName,
      COLOR_BOX_CLASS,
      COLOR_BOX_INPUT_CLASS,
      COLOR_BOX_INPUT_CONTAINER_CLASS,
      COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS,
      COLOR_BOX_COLOR_IS_NOT_DEFINED,
      COLOR_BOX_OVERLAY_CLASS,
      STATE_FOCUSED_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      COLORVIEW_CLASS,
      POPUP_CONTENT_CLASS,
      COLORVIEW_HEX_INPUT_SELECTOR,
      COLORVIEW_APPLY_BUTTON_SELECTOR,
      CLEAR_BUTTON_AREA_SELECTOR,
      move,
      showColorBox,
      getColorBoxOverlay,
      getColorBoxOverlayContent;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      devices = $__m.default;
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
      QUnit.testStart(function() {
        var markup = '<div id="color-box"></div>';
        $('#qunit-fixture').addClass('dx-viewport').html(markup);
      });
      COLOR_BOX_CLASS = 'dx-colorbox';
      COLOR_BOX_INPUT_CLASS = COLOR_BOX_CLASS + '-input';
      COLOR_BOX_INPUT_CONTAINER_CLASS = COLOR_BOX_INPUT_CLASS + '-container';
      COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = COLOR_BOX_CLASS + '-color-result-preview';
      COLOR_BOX_COLOR_IS_NOT_DEFINED = COLOR_BOX_CLASS + '-color-is-not-defined';
      COLOR_BOX_OVERLAY_CLASS = COLOR_BOX_CLASS + '-overlay';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      COLORVIEW_CLASS = 'dx-colorview';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      COLORVIEW_HEX_INPUT_SELECTOR = '.dx-colorview-label-hex .dx-texteditor-input';
      COLORVIEW_APPLY_BUTTON_SELECTOR = '.dx-colorview-apply-button';
      CLEAR_BUTTON_AREA_SELECTOR = '.dx-clear-button-area';
      move = function($element, position) {
        var parentOffset = $element.parent().offset();
        pointerMock($element).start().down(parentOffset.left, parentOffset.top).move(position.left, position.top).up();
      };
      showColorBox = function(options) {
        var $colorBox = this.element.dxColorBox(options);
        $($colorBox.find('.dx-dropdowneditor-button')).trigger('dxclick');
        return $colorBox;
      };
      getColorBoxOverlay = function() {
        return $('.' + COLOR_BOX_OVERLAY_CLASS);
      };
      getColorBoxOverlayContent = function() {
        return $('.' + 'dx-overlay-content');
      };
      QUnit.module('Color Box', {
        beforeEach: function() {
          fx.off = true;
          this.element = $('#color-box');
          this.updateColorInput = function(inputAlias, value) {
            var aliases = ['red', 'green', 'blue', 'hex', 'alpha'];
            var inputIndex = $.inArray(inputAlias, aliases);
            var $input = getColorBoxOverlay().find('label .' + TEXTEDITOR_INPUT_CLASS).eq(inputIndex);
            $input.val(value);
            $($input).trigger('change');
          };
          this.checkColor = function(expectedColor, assert) {
            var colorPicker = this.element.dxColorBox('instance')._colorView;
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
        QUnit.test('Render with hex value', function(assert) {
          var $colorBox = showColorBox.call(this, {value: '#000000'});
          var $input = $colorBox.find('.' + COLOR_BOX_INPUT_CLASS);
          assert.equal($input.val(), '#000000');
          $colorBox.dxColorBox('instance').option('value', '#ff0000');
          assert.equal($input.val(), '#ff0000');
        });
        QUnit.test('If value is set as \'null\' color result preview should not have background color - the first case(T198625)', function(assert) {
          var colorBox = this.element.dxColorBox().dxColorBox('instance');
          colorBox.option('value', '#ff0000');
          colorBox.option('value', null);
          assert.ok(!colorBox.$element().find('.dx-colorbox-color-result-preview').attr('style'));
        });
        QUnit.test('If value is set as \'null\' color result preview should not have background color - the second case(T198625)', function(assert) {
          showColorBox.call(this);
          var $overlay = getColorBoxOverlay();
          var $applyButton = $overlay.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          var colorBoxInstance = this.element.dxColorBox('instance');
          colorBoxInstance._colorView._currentColor = new Color('#ff0000');
          $($applyButton).trigger('dxclick');
          colorBoxInstance.option('value', null);
          assert.ok(!colorBoxInstance.$element().find('.dx-colorbox-color-result-preview').attr('style'));
        });
        QUnit.test('If value is not \'null\' color result preview should not have a special css class', function(assert) {
          var $colorBox = this.element.dxColorBox();
          var $colorInputContainer = $colorBox.find('.' + COLOR_BOX_INPUT_CONTAINER_CLASS);
          $colorBox.dxColorBox('instance').option('value', '#ff0000');
          assert.ok(!$colorInputContainer.hasClass(COLOR_BOX_COLOR_IS_NOT_DEFINED));
        });
        QUnit.test('It should be possible to set empty value using input of dropdown editor', function(assert) {
          var $colorBox = this.element.dxColorBox({value: 'red'});
          $('.' + COLOR_BOX_INPUT_CLASS).val('').trigger('change');
          assert.equal($colorBox.dxColorBox('instance').option('value'), '');
        });
        QUnit.test('Render overlay', function(assert) {
          showColorBox.call(this);
          var $overlay = getColorBoxOverlay();
          assert.equal($overlay.length, 1);
        });
        QUnit.test('Render color picker container', function(assert) {
          showColorBox.call(this);
          var $overlay = getColorBoxOverlay();
          var $colorPickerContainer = $overlay.find('.dx-colorview-container');
          var $alphaChannelScale = $overlay.find('.dx-colorview-alpha-channel-scale');
          var $alphaChannelInput = $overlay.find('.dx-colorview-alpha-channel-input');
          var $alphaChannelLabel = $overlay.find('.dx-colorview-alpha-label');
          assert.equal($colorPickerContainer.length, 1);
          assert.equal($alphaChannelScale.length, 0);
          assert.equal($alphaChannelInput.length, 0);
          assert.equal($alphaChannelLabel.length, 0);
        });
        QUnit.test('Popup content width should be equal to colorBox width when editor width is bigger then colorBox width', function(assert) {
          this.element.dxColorBox({
            width: 1000,
            opened: true
          });
          var $colorView = $(("." + COLORVIEW_CLASS));
          var $popupContent = $(("." + POPUP_CONTENT_CLASS));
          assert.strictEqual($popupContent.width(), $colorView.outerWidth(), 'popup content width is correct');
        });
        QUnit.test('Popup content width should be equal to colorBox width when editor width is smaller then colorBox width', function(assert) {
          this.element.dxColorBox({
            width: 100,
            opened: true
          });
          var $colorView = $(("." + COLORVIEW_CLASS));
          var $popupContent = $(("." + POPUP_CONTENT_CLASS));
          assert.strictEqual($popupContent.width(), $colorView.outerWidth(), 'popup content width is correct');
        });
        QUnit.test('Click on apply button', function(assert) {
          var onValueChangedHandler = sinon.spy(noop);
          showColorBox.call(this, {onValueChanged: onValueChangedHandler});
          var $overlayContent = getColorBoxOverlayContent();
          var $applyButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          var colorBoxInstance = this.element.dxColorBox('instance');
          var newColor = '#A600F3'.toLowerCase();
          colorBoxInstance._colorView.option('value', newColor);
          $($applyButton).trigger('dxclick');
          assert.equal(colorBoxInstance.option('value'), newColor);
          assert.equal($('.' + COLOR_BOX_INPUT_CLASS).val(), newColor);
          assert.ok(onValueChangedHandler.calledOnce);
          assert.ok($('.' + COLOR_BOX_OVERLAY_CLASS).is(':hidden'));
        });
        QUnit.test('Click on cancel button', function(assert) {
          showColorBox.call(this, {value: '#ff0000'});
          this.updateColorInput('hex', 'f0f0f0');
          var $overlayContent = getColorBoxOverlayContent();
          var $cancelButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-cancel-button');
          $($cancelButton).trigger('dxclick');
          assert.ok($('.' + COLOR_BOX_OVERLAY_CLASS).is(':hidden'));
          this.checkColor({
            r: 255,
            g: 0,
            b: 0,
            hex: '#ff0000'
          }, assert);
        });
        QUnit.test('ColorBox should support 8-digit hex color', function(assert) {
          showColorBox.call(this, {value: '#be73146b'});
          this.checkColor({
            r: 190,
            g: 115,
            b: 20,
            hex: '#be7314',
            alpha: '0.42'
          }, assert);
        });
        QUnit.test('ColorBox should support 4-digit hex color', function(assert) {
          showColorBox.call(this, {value: '#fc0c'});
          this.checkColor({
            r: 255,
            g: 204,
            b: 0,
            hex: '#ffcc00',
            alpha: '0.80'
          }, assert);
        });
        QUnit.test('Cancel event should work right when color was changed', function(assert) {
          showColorBox.call(this, {
            value: '#2C77B8',
            editAlphaChannel: true
          });
          var $overlayContent = getColorBoxOverlayContent();
          var $colorChooserMarker = $overlayContent.find('.dx-colorview-palette-handle');
          var $cancelButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-cancel-button');
          move($colorChooserMarker, {
            left: 220,
            top: 80
          });
          $($cancelButton).trigger('dxclick');
          this.checkColor({
            r: 44,
            g: 119,
            b: 184,
            hex: '#2c77b8'
          }, assert);
        });
        QUnit.test('Cancel event should work right when opacity was changed', function(assert) {
          showColorBox.call(this, {
            value: 'rgba(0, 0, 0, .5)',
            editAlphaChannel: true
          });
          var $overlayContent = getColorBoxOverlayContent();
          var $alphaHandle = $overlayContent.find('.dx-colorview-alpha-channel-handle');
          var $cancelButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-cancel-button');
          move($alphaHandle, {
            left: 70,
            top: 0
          });
          $($cancelButton).trigger('dxclick');
          this.checkColor({
            r: 0,
            g: 0,
            b: 0,
            hex: '#000000',
            alpha: 0.5
          }, assert);
        });
        QUnit.test('Restore handle position on cancel button click after drag without changing value (T1080535)', function(assert) {
          var colorBox = showColorBox.call(this, {
            value: 'rgba(50, 150, 250, 0.3)',
            editAlphaChannel: true
          }).dxColorBox('instance');
          var $overlay = getColorBoxOverlay();
          var $hueHandle = $overlay.find('.dx-colorview-hue-scale-handle');
          var positionOnInit = $hueHandle.position().top;
          move($hueHandle, {
            left: 0,
            top: 0.01
          });
          var positionAfterDrag = $hueHandle.position().top;
          assert.notStrictEqual(positionOnInit, positionAfterDrag);
          colorBox.close();
          colorBox.open();
          var positionOnReopen = $hueHandle.position().top;
          assert.equal(positionOnReopen, positionOnInit);
        });
        QUnit.test('When hue was changed opacity is OK', function(assert) {
          showColorBox.call(this, {
            value: 'rgba(255, 0, 0, 0.3)',
            editAlphaChannel: true
          });
          var $overlay = getColorBoxOverlay();
          var $hueHandle = $overlay.find('.dx-colorview-hue-scale-handle');
          move($hueHandle, {
            left: 0,
            top: 289
          });
          $('.dx-colorview-apply-button').trigger('dxclick');
          assert.equal($('.' + COLOR_BOX_INPUT_CLASS).val(), 'rgba(255, 26, 0, 0.3)');
        });
        QUnit.test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          var spy = sinon.spy(noop);
          var colorBox = showColorBox.call(this, {onValueChanged: spy}).dxColorBox('instance');
          colorBox.option('value', '#00ff00');
          assert.ok(spy.calledOnce);
        });
        QUnit.test('Changing the input value of closed colorbox must change color preview', function(assert) {
          this.element.dxColorBox({value: '#ff0000'});
          var $colorBoxResultsPreview = $('.' + COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS);
          $('.' + COLOR_BOX_INPUT_CLASS).val('#0000ff').trigger('change');
          assert.equal(new Color($colorBoxResultsPreview.css('backgroundColor')).toHex().toLowerCase(), '#0000ff');
        });
        QUnit.test('Changing the input value of opened colorbox must change color preview and dropdown elements', function(assert) {
          showColorBox.call(this, {value: '#FF0000'});
          var $colorBoxResultsPreview = $('.' + COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS);
          $('.' + COLOR_BOX_INPUT_CLASS).val('#0000ff').trigger('change');
          assert.equal(new Color($colorBoxResultsPreview.css('backgroundColor')).toHex().toLowerCase(), '#0000ff');
          this.checkColor({
            r: 0,
            g: 0,
            b: 255,
            hex: '#0000ff'
          }, assert);
        });
        QUnit.test('Update colors preview', function(assert) {
          var colorPicker = showColorBox.call(this).dxColorBox('instance')._colorView;
          this.updateColorInput('hex', 'd0ff00');
          colorPicker.applyColor();
          var baseColor = $('.dx-colorview-color-preview-color-current').css('backgroundColor');
          var newColor = $('.dx-colorview-color-preview-color-new').css('backgroundColor');
          assert.equal(new Color(newColor).toHex(), '#d0ff00', 'new color');
          assert.equal(new Color(baseColor).toHex(), '#000000', 'default color');
        });
        QUnit.test('Update colors preview after value change', function(assert) {
          var colorBox = showColorBox.call(this, {value: '#fafafa'}).dxColorBox('instance');
          colorBox.option('value', '#f0f0f0');
          this.updateColorInput('hex', 'd0ff00');
          colorBox._colorView.applyColor();
          var baseColor = $('.dx-colorview-color-preview-color-current').css('backgroundColor');
          var newColor = $('.dx-colorview-color-preview-color-new').css('backgroundColor');
          assert.equal(new Color(newColor).toHex(), '#d0ff00', 'new color');
          assert.equal(new Color(baseColor).toHex(), '#f0f0f0', 'current ColorBox value still the same');
        });
        QUnit.test('Validate value of colorbox input', function(assert) {
          this.element.dxColorBox({value: '#ff0000'});
          var $colorBoxInput = $('.' + COLOR_BOX_INPUT_CLASS);
          var $colorBoxResultsPreview = $('.' + COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS);
          $($colorBoxInput.val('unknown value')).trigger('change');
          assert.equal(new Color($colorBoxResultsPreview.css('backgroundColor')).toHex().toLowerCase(), '#ff0000');
          assert.equal($colorBoxInput.val(), '#ff0000');
        });
        QUnit.test('Validate value of colorbox hex-input', function(assert) {
          this.element.dxColorBox({value: '#ff0000'});
          var $colorBoxInput = $('.' + COLOR_BOX_INPUT_CLASS);
          var $colorBoxResultsPreview = $('.' + COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS);
          $($colorBoxInput.val('#zzzzzz')).trigger('change');
          assert.equal(new Color($colorBoxResultsPreview.css('backgroundColor')).toHex().toLowerCase(), '#ff0000');
          assert.equal($colorBoxInput.val(), '#ff0000');
        });
        QUnit.test('In \'instantly\' mode popup should not disappear if value was changed', function(assert) {
          showColorBox.call(this, {applyValueMode: 'instantly'});
          var $overlay = getColorBoxOverlay();
          var $colorChooserMarker = $overlay.find('.dx-colorview-palette-handle');
          move($colorChooserMarker, {
            left: 220,
            top: 80
          });
          assert.equal($overlay.css('display'), 'block');
        });
        QUnit.test('\'instantly\' mode should work for alpha channel', function(assert) {
          var colorBox = showColorBox.call(this, {
            value: 'rgba(100, 100, 100, .2)',
            editAlphaChannel: true,
            applyValueMode: 'instantly'
          }).dxColorBox('instance');
          this.updateColorInput('alpha', 0.75);
          assert.equal(colorBox.option('value'), 'rgba(100, 100, 100, 0.75)');
        });
        QUnit.test('In \'instantly\' mode value should be updated if some input was updated', function(assert) {
          var colorBox = showColorBox.call(this, {
            value: '#ff0000',
            applyValueMode: 'instantly'
          }).dxColorBox('instance');
          this.updateColorInput('red', 100);
          assert.equal(colorBox.option('value'), '#640000');
          this.updateColorInput('green', 100);
          assert.equal(colorBox.option('value'), '#646400');
          this.updateColorInput('blue', 100);
          assert.equal(colorBox.option('value'), '#646464');
          this.updateColorInput('hex', '0000ff');
          assert.equal(colorBox.option('value'), '#0000ff');
        });
        QUnit.test('In \'instantly\' mode value should be updated correctly if some input was updated and editAlphaChannel = true', function(assert) {
          var colorBox = showColorBox.call(this, {
            value: '#ff0000',
            editAlphaChannel: true,
            applyValueMode: 'instantly'
          }).dxColorBox('instance');
          colorBox.option('value', 'rgba(100, 0, 0, 75)');
          this.updateColorInput('red', 100);
          assert.equal(colorBox.option('value'), 'rgba(100, 0, 0, 1)');
        });
        QUnit.test('Option changes', function(assert) {
          var colorBox = showColorBox.call(this).dxColorBox('instance');
          $.each([{
            name: 'value',
            value: '#ff0000'
          }, {
            name: 'editAlphaChannel',
            value: true
          }, {
            name: 'rtlEnabled',
            value: true
          }, {
            name: 'keyStep',
            value: 10
          }], function(_, option) {
            colorBox.option(option.name, option.value);
            assert.equal(colorBox._colorView.option(option.name), option.value, '\'' + option.name + '\' option is updated');
          });
        });
        QUnit.test('\'applyButtonText\' and \'cancelButtonText\' options change should update UI', function(assert) {
          var colorBox = showColorBox.call(this).dxColorBox('instance');
          var applyText = 'Test Done';
          var cancelText = 'Test Cancel';
          colorBox.option('applyButtonText', applyText);
          colorBox.close();
          colorBox.open();
          var $applyButton = getColorBoxOverlayContent().find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          assert.equal($applyButton.text(), applyText, 'apply button text is changed');
          colorBox.option('cancelButtonText', cancelText);
          colorBox.close();
          colorBox.open();
          var $cancelButton = getColorBoxOverlayContent().find('.dx-colorview-buttons-container .dx-colorview-cancel-button');
          assert.equal($cancelButton.text(), cancelText, 'cancel button text is changed');
        });
        QUnit.test('Alpha channel input should be updated if value is changed', function(assert) {
          var colorBox = showColorBox.call(this, {
            editAlphaChannel: true,
            value: 'rgba(44, 119, 184, 1)'
          }).dxColorBox('instance');
          $(colorBox._input()).val('rgba(44, 119, 184, 0.5)').trigger('change');
          assert.equal(colorBox._colorView._alphaChannelInput.option('value'), 0.5);
        });
        QUnit.test('When value was updated twice, color editors should have right values', function(assert) {
          var colorBox = this.element.dxColorBox({
            value: 'rgba(44, 119, 184, 1)',
            editAlphaChannel: true
          }).dxColorBox('instance');
          colorBox.open();
          colorBox.close();
          $(colorBox._input()).val('rgba(100, 150, 200, 0.5)').trigger('change');
          colorBox.open();
          assert.equal(colorBox._colorView._alphaChannelInput.option('value'), 0.5);
          assert.equal(colorBox._colorView._rgbInputs[0].option('value'), 100);
          assert.equal(colorBox._colorView._rgbInputs[1].option('value'), 150);
          assert.equal(colorBox._colorView._rgbInputs[2].option('value'), 200);
        });
        QUnit.test('T169171 - rendering of many drop buttons', function(assert) {
          var $colorBox = this.element.dxColorBox({});
          var colorBox = $colorBox.dxColorBox('instance');
          assert.equal($colorBox.find('.dx-dropdowneditor-button').length, 1, 'only one button is rendered');
          colorBox.open();
          colorBox.close();
          colorBox.option('value', 'rgba(0, 0, 0, 1)');
          assert.equal($colorBox.find('.dx-dropdowneditor-button').length, 1, 'one button is still rendered');
        });
        QUnit.test('Color changed in preview if value is valid', function(assert) {
          var $colorBox = this.element.dxColorBox({value: '#f00'});
          var colorBox = $colorBox.dxColorBox('instance');
          var $colorPreview = $colorBox.find('.dx-colorbox-color-result-preview');
          var $input = $colorBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          $input.val('');
          keyboard.type('#0');
          var previewColor = new Color($colorPreview.css('backgroundColor'));
          var currentColor = new Color(colorBox.option('value'));
          assert.equal(previewColor.toHex(), currentColor.toHex(), 'show current value when color is invalid');
          keyboard.type('0f').press('enter');
          previewColor = new Color($colorPreview.css('backgroundColor'));
          currentColor = new Color($input.val());
          assert.equal(previewColor.toHex(), currentColor.toHex(), 'show color if input value is valid');
        });
        QUnit.test('ColorBox set the right stylingMode option to ColorView (default)', function(assert) {
          var $colorBox = $('#color-box').dxColorBox({value: 'red'});
          var colorBox = $colorBox.dxColorBox('instance');
          colorBox.open();
          assert.equal(colorBox._colorView.option('stylingMode'), 'outlined');
        });
        QUnit.test('ColorBox set the right stylingMode option to ColorView (custom)', function(assert) {
          var $colorBox = $('#color-box').dxColorBox({
            value: 'red',
            stylingMode: 'underlined'
          });
          var colorBox = $colorBox.dxColorBox('instance');
          colorBox.open();
          assert.equal(colorBox._colorView.option('stylingMode'), 'underlined');
        });
        [{
          value: undefined,
          editAlphaChannel: false
        }, {
          value: undefined,
          editAlphaChannel: true
        }, {
          value: null,
          editAlphaChannel: false
        }, {
          value: null,
          editAlphaChannel: true
        }, {
          value: '',
          editAlphaChannel: false
        }, {
          value: '',
          editAlphaChannel: true
        }].forEach(function($__3) {
          var $__4 = $__3,
              value = $__4.value,
              editAlphaChannel = $__4.editAlphaChannel;
          QUnit.test(("Text should be empty (value=" + value + "; editAlphaChannel=" + editAlphaChannel + ")"), function(assert) {
            var colorBox = $('#color-box').dxColorBox({
              value: value,
              editAlphaChannel: editAlphaChannel
            }).dxColorBox('instance');
            assert.strictEqual(colorBox.option('text'), '');
          });
          QUnit.test(("Text should be empty after typed digit and pressed enter (value=" + value + "; editAlphaChannel=" + editAlphaChannel + ")"), function(assert) {
            var $colorBox = $('#color-box').dxColorBox({
              value: value,
              editAlphaChannel: editAlphaChannel
            });
            var colorBox = $colorBox.dxColorBox('instance');
            var $input = $colorBox.find('.' + TEXTEDITOR_INPUT_CLASS);
            var keyboard = keyboardMock($input);
            keyboard.type('0').press('enter');
            assert.strictEqual(colorBox.option('text'), '');
          });
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.$element = $('#color-box').dxColorBox({
            value: 'rgba(145, 76, 76, 1)',
            editAlphaChannel: true,
            focusStateEnabled: true
          });
          this.instance = this.$element.dxColorBox('instance');
          this.$input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          this.keyboard = keyboardMock(this.$input);
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('colorbox should work after enter key pressing', function(assert) {
          assert.expect(0);
          this.keyboard.keyDown('enter');
        });
        QUnit.test('enter key test', function(assert) {
          this.instance.option({
            opened: true,
            applyValueMode: 'useButtons'
          });
          this.keyboard.keyDown('up');
          this.keyboard.keyDown('enter');
          assert.ok(!this.instance.option('opened'), 'overlay is not visible on \'enter\' key press');
          assert.equal(this.instance.option('value'), 'rgba(148, 77, 77, 1)');
        });
        QUnit.test('enter key test on inputs', function(assert) {
          assert.expect(10);
          var instance = this.instance;
          var $input = this.$element.find('.dx-texteditor-input');
          instance.option({
            opened: true,
            value: 'rgba(153, 72, 70, 1)',
            applyValueMode: 'useButtons',
            editAlphaChannel: true
          });
          var $popup = $(instance.content());
          $popup.find('.dx-texteditor-input').each(function(_, itemInput) {
            var $itemInput = $(itemInput);
            $($input).trigger($.Event('keydown', {key: 'ArrowLeft'}));
            $($itemInput).trigger($.Event('keydown', {key: 'Enter'}));
            assert.equal(instance.option('value'), 'rgba(153, 73, 72, 1)', 'value was changed correctly after press enter');
            assert.equal(instance.option('opened'), false, 'overlay has been closed');
            instance.option({
              value: 'rgba(153, 72, 70, 1)',
              opened: true
            });
          });
        });
        QUnit.test('Enter button should update value correctly', function(assert) {
          this.instance.option({
            opened: true,
            applyValueMode: 'useButtons',
            editAlphaChannel: true
          });
          this.$input.val('#944D4D');
          this.keyboard.keyDown('enter');
          assert.equal(this.$input.val(), 'rgba(148, 77, 77, 1)');
          assert.equal(this.instance.option('value'), 'rgba(148, 77, 77, 1)');
        });
        QUnit.test('Enter button should update color name value correctly', function(assert) {
          this.instance.option({
            opened: true,
            applyValueMode: 'useButtons',
            editAlphaChannel: false
          });
          this.$input.val('red');
          this.keyboard.keyDown('enter');
          assert.equal(this.$input.val(), '#ff0000');
          assert.equal(this.instance.option('value'), '#ff0000');
        });
        QUnit.test('up arrow key test', function(assert) {
          this.instance.option({
            opened: true,
            applyValueMode: 'instantly'
          });
          this.keyboard.keyDown('up');
          assert.ok(this.instance.option('opened'), 'overlay is not visible on \'up\' key press');
          assert.equal(this.instance.option('value'), 'rgba(148, 77, 77, 1)', 'value was changed correctly ');
        });
        QUnit.test('down arrow key test', function(assert) {
          this.instance.option({
            opened: true,
            applyValueMode: 'instantly'
          });
          this.keyboard.keyDown('down');
          assert.ok(this.instance.option('opened'), 'overlay is not visible on \'up\' key press');
          assert.equal(this.instance.option('value'), 'rgba(143, 74, 74, 1)', 'value was changed correctly ');
        });
        QUnit.test('arrow right and left test', function(assert) {
          var $handler;
          var handlerOffset;
          this.instance.option({
            opened: true,
            applyValueMode: 'instantly'
          });
          $handler = getColorBoxOverlay().find('.dx-colorview-palette-handle'), handlerOffset = $handler.offset();
          this.keyboard.keyDown('right');
          assert.ok($handler.offset().left > handlerOffset.left, 'Handler moved right when \'right\' was pressed');
          this.keyboard.keyDown('left');
          this.keyboard.keyDown('left');
          assert.ok($handler.offset().left < handlerOffset.left, 'Handler moved left when \'left\' was pressed');
        });
        QUnit.test('ColorBox opening fine when focusStateEnabled set to false', function(assert) {
          this.instance.option({focusStateEnabled: false});
          this.instance.option('opened', true);
          assert.ok(this.instance._colorView, 'colorView work fine when focusStateEnabled set to false');
        });
        QUnit.testInActiveWindow('focusing colorView element should trigger focus on editor input', function(assert) {
          this.instance.option('opened', true);
          $(this.instance._colorView.$element()).triggerHandler('focus');
          assert.ok(this.instance.$element().hasClass(STATE_FOCUSED_CLASS), 'colorView on focus reset focus to element');
        });
        QUnit.testInActiveWindow('pressing tab should set focus on first input in overlay', function(assert) {
          this.instance.option('opened', true);
          this.keyboard.keyDown('tab');
          var $inputR = $(this.instance._colorView._rgbInputs[0].$element());
          assert.ok($inputR.hasClass(STATE_FOCUSED_CLASS), 'tab set focus to first input in overlay');
        });
        QUnit.testInActiveWindow('first input focused on tab should have selected text (T1127632)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.instance.option('opened', true);
          this.keyboard.keyDown('tab');
          var $firstInput = $(this.instance._colorView._rgbInputs[0].$element()).find('.dx-texteditor-container input');
          var caretPosition = {
            start: $firstInput[0].selectionStart,
            end: $firstInput[0].selectionEnd
          };
          assert.strictEqual(caretPosition.start, 0, 'selectionStart is correct');
          assert.strictEqual(caretPosition.end, 3, 'selectionEnd is correct');
        });
        QUnit.test('Pressing the \'Esc\' key should close the dropDown', function(assert) {
          assert.expect(5);
          var instance = this.instance;
          instance.option({
            opened: true,
            applyValueMode: 'useButtons',
            editAlphaChannel: true
          });
          $(instance.content()).find(("." + TEXTEDITOR_INPUT_CLASS)).each(function(index, editorInput) {
            var $editorInput = $(editorInput);
            var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
            $($editorInput).trigger(escapeKeyDown);
            assert.notOk(instance.option('opened'), 'overlay has been closed');
            instance.option('opened', true);
          });
        });
      });
      QUnit.module('Regressions', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('T171573', function(assert) {
          var $colorBox = $('#color-box').dxColorBox({value: 'red'});
          var colorBox = $colorBox.dxColorBox('instance');
          assert.equal(colorBox.option('value'), 'red');
          colorBox.open();
          assert.equal(colorBox._colorView.option('value'), 'red');
        });
        QUnit.test('T196473', function(assert) {
          var colorBox = $('#color-box').dxColorBox({value: '#ff0000'}).dxColorBox('instance');
          colorBox.open();
          var colorView = colorBox._colorView;
          var $overlayContent = getColorBoxOverlayContent();
          var $applyButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          $($applyButton).trigger('dxclick');
          assert.ok(!colorView.$element().is(':visible'));
        });
        QUnit.test('Value should not be changed by \'down\' key when colorbox was opened and closed', function(assert) {
          var colorBox = $('#color-box').dxColorBox({value: '#ff0000'}).dxColorBox('instance');
          var $input = $(colorBox.$element().find('.' + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          colorBox.open();
          var $overlayContent = getColorBoxOverlayContent();
          var $applyButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          $($applyButton).trigger('dxclick');
          keyboard.keyDown('down');
          keyboard.keyDown('down');
          keyboard.keyDown('enter');
          assert.equal(colorBox.option('value'), '#ff0000');
        });
        QUnit.test('Value should not be changed by \'up\' key when colorbox was opened and closed', function(assert) {
          var colorBox = $('#color-box').dxColorBox({value: '#326b8a'}).dxColorBox('instance');
          var $input = $(colorBox.$element().find('.' + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          colorBox.open();
          var $overlayContent = getColorBoxOverlayContent();
          var $applyButton = $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-apply-button');
          $($applyButton).trigger('dxclick');
          keyboard.keyDown('up');
          keyboard.keyDown('up');
          keyboard.keyDown('enter');
          assert.equal(colorBox.option('value'), '#326b8a');
        });
        QUnit.test('value should be reseted after popup closing when \'applyValueMode\' is \'useButtons\' (T806577)', function(assert) {
          var colorBox = $('#color-box').dxColorBox({
            value: '#aabbcc',
            applyValueMode: 'useButtons',
            opened: true
          }).dxColorBox('instance');
          var $input = $(colorBox.$element().find('.' + TEXTEDITOR_INPUT_CLASS));
          var colorView = $('.dx-colorview').dxColorView('instance');
          var keyboard = keyboardMock($input);
          colorView.option('value', '#ffffff');
          colorBox.close();
          keyboard.press('enter');
          assert.equal(colorBox.option('value'), '#aabbcc');
        });
        QUnit.test('value should be null after clear button click if editAlfaChannel = true (T976630)', function(assert) {
          var $colorBox = $('#color-box').dxColorBox({
            value: '#f05b41',
            showClearButton: true,
            editAlphaChannel: true
          });
          var colorBox = $colorBox.dxColorBox('instance');
          var $clearButton = $('#color-box').find(CLEAR_BUTTON_AREA_SELECTOR);
          $clearButton.trigger('dxclick');
          assert.equal(colorBox.option('value'), null);
          assert.equal(colorBox.option('text'), '');
        });
        QUnit.test('value should be null after clear button click if editAlfaChannel = true, applyValueMode = instantly and colorview is rendered (T976630)', function(assert) {
          var $colorBox = $('#color-box').dxColorBox({
            value: '#f05b41',
            showClearButton: true,
            applyValueMode: 'instantly',
            editAlphaChannel: true,
            opened: true
          });
          var colorBox = $colorBox.dxColorBox('instance');
          var $clearButton = $('#color-box').find(CLEAR_BUTTON_AREA_SELECTOR);
          $clearButton.trigger('dxclick');
          assert.equal(colorBox.option('value'), null);
          assert.equal(colorBox.option('text'), '');
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
            onOpened: function() {
              $__2.$colorViewHexInput = $(COLORVIEW_HEX_INPUT_SELECTOR);
              $__2.$colorViewApplyButton = $(COLORVIEW_APPLY_BUTTON_SELECTOR);
            }
          };
          this.init = function(options) {
            $__2.$element = $('#color-box').dxColorBox(options);
            $__2.instance = $__2.$element.dxColorBox('instance');
            $__2.$input = $__2.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
            $__2.keyboard = keyboardMock($__2.$input);
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
        QUnit.test('on change', function(assert) {
          this.keyboard.type('#2510e5').change();
          this.checkEvent(assert, 'change', this.$input);
          this.testProgramChange(assert);
        });
        QUnit.test('on input apply using enter', function(assert) {
          this.keyboard.type('#2510e5').press('enter');
          this.checkEvent(assert, 'keydown', this.$input, 'enter');
          this.testProgramChange(assert);
        });
        QUnit.test('on colorView palette value apply using enter', function(assert) {
          this.reinit({value: '#0707b8'});
          this.instance.open();
          this.keyboard.press('up').press('enter');
          this.checkEvent(assert, 'keydown', this.$input, 'enter');
          this.testProgramChange(assert);
        });
        QUnit.test('on colorView any text input value apply using enter', function(assert) {
          this.instance.open();
          keyboardMock(this.$colorViewHexInput).press('up').press('enter');
          this.checkEvent(assert, 'keydown', this.$colorViewHexInput, 'enter');
          this.testProgramChange(assert);
        });
        QUnit.test('on click on colorView apply button', function(assert) {
          this.instance.open();
          this.keyboard.press('up');
          this.$colorViewApplyButton.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', this.$colorViewApplyButton);
          this.testProgramChange(assert);
        });
        QUnit.test('on colorView value change when applyValueMode=instantly', function(assert) {
          this.reinit({applyValueMode: 'instantly'});
          this.instance.open();
          this.keyboard.press('up');
          this.checkEvent(assert, 'keydown', this.$input, 'arrowUp');
          this.testProgramChange(assert);
        });
        ['useButtons', 'instantly'].forEach(function(applyValueMode) {
          QUnit.test(("on click on clear button when applyValueMode=" + applyValueMode), function(assert) {
            this.reinit({
              showClearButton: true,
              value: '#613030',
              applyValueMode: applyValueMode
            });
            var $clearButton = this.$element.find(CLEAR_BUTTON_AREA_SELECTOR);
            $clearButton.trigger('dxclick');
            this.checkEvent(assert, 'dxclick', $clearButton);
            this.testProgramChange(assert);
          });
        });
        QUnit.test('on click on clear button after value selecting when applyValueMode=useButtons', function(assert) {
          this.reinit({showClearButton: true});
          this.instance.open();
          this.keyboard.press('up');
          this.$colorViewApplyButton.trigger('dxclick');
          var $clearButton = this.$element.find(CLEAR_BUTTON_AREA_SELECTOR);
          $clearButton.trigger('dxclick');
          var event = this.valueChangedHandler.getCall(1).args[0].event;
          assert.strictEqual(event.type, 'dxclick', 'event type is correct');
          assert.strictEqual(event.target, $clearButton.get(0), 'event target is correct');
          this.testProgramChange(assert);
        });
        QUnit.test('on click on clear button after value selecting when applyValueMode=instantly', function(assert) {
          this.reinit({
            showClearButton: true,
            applyValueMode: 'instantly'
          });
          this.instance.open();
          this.keyboard.press('up');
          var $clearButton = this.$element.find(CLEAR_BUTTON_AREA_SELECTOR);
          $clearButton.trigger('dxclick');
          var event = this.valueChangedHandler.getCall(1).args[0].event;
          assert.strictEqual(event.type, 'dxclick', 'event type is correct');
          assert.strictEqual(event.target, $clearButton.get(0), 'event target is correct');
          this.testProgramChange(assert);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/devices","color","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","animation/fx","events/utils","generic_light.css!","ui/color_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/devices"), require("color"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("animation/fx"), require("events/utils"), require("generic_light.css!"), require("ui/color_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=colorBox.tests.js.map