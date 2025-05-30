"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _translator = require("../../animation/translator");
var _extend = require("../../core/utils/extend");
var _color = _interopRequireDefault(require("../../color"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _editor = _interopRequireDefault(require("../editor/editor"));
var _number_box = _interopRequireDefault(require("../number_box"));
var _text_box = _interopRequireDefault(require("../text_box"));
var _draggable = _interopRequireDefault(require("../draggable"));
var _index = require("../../events/utils/index");
var _click = require("../../events/click");
var _guid = _interopRequireDefault(require("../../core/guid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var COLOR_VIEW_CLASS = 'dx-colorview';
var COLOR_VIEW_CONTAINER_CLASS = 'dx-colorview-container';
var COLOR_VIEW_ROW_CLASS = 'dx-colorview-container-row';
var COLOR_VIEW_CELL_CLASS = 'dx-colorview-container-cell';
var COLOR_VIEW_PALETTE_CLASS = 'dx-colorview-palette';
var COLOR_VIEW_PALETTE_CELL_CLASS = 'dx-colorview-palette-cell';
var COLOR_VIEW_PALETTE_HANDLE_CLASS = 'dx-colorview-palette-handle';
var COLOR_VIEW_PALETTE_GRADIENT_CLASS = 'dx-colorview-palette-gradient';
var COLOR_VIEW_PALETTE_GRADIENT_WHITE_CLASS = 'dx-colorview-palette-gradient-white';
var COLOR_VIEW_PALETTE_GRADIENT_BLACK_CLASS = 'dx-colorview-palette-gradient-black';
var COLOR_VIEW_HUE_SCALE_CLASS = 'dx-colorview-hue-scale';
var COLOR_VIEW_HUE_SCALE_CELL_CLASS = 'dx-colorview-hue-scale-cell';
var COLOR_VIEW_HUE_SCALE_HANDLE_CLASS = 'dx-colorview-hue-scale-handle';
var COLOR_VIEW_HUE_SCALE_WRAPPER_CLASS = 'dx-colorview-hue-scale-wrapper';
var COLOR_VIEW_CONTROLS_CONTAINER_CLASS = 'dx-colorview-controls-container';
var COLOR_VIEW_RED_LABEL_CLASS = 'dx-colorview-label-red';
var COLOR_VIEW_GREEN_LABEL_CLASS = 'dx-colorview-label-green';
var COLOR_VIEW_BLUE_LABEL_CLASS = 'dx-colorview-label-blue';
var COLOR_VIEW_HEX_LABEL_CLASS = 'dx-colorview-label-hex';
var COLOR_VIEW_ALPHA_CHANNEL_SCALE_CLASS = 'dx-colorview-alpha-channel-scale';
var COLOR_VIEW_APLHA_CHANNEL_ROW_CLASS = 'dx-colorview-alpha-channel-row';
var COLOR_VIEW_ALPHA_CHANNEL_SCALE_WRAPPER_CLASS = 'dx-colorview-alpha-channel-wrapper';
var COLOR_VIEW_ALPHA_CHANNEL_LABEL_CLASS = 'dx-colorview-alpha-channel-label';
var COLOR_VIEW_ALPHA_CHANNEL_HANDLE_CLASS = 'dx-colorview-alpha-channel-handle';
var COLOR_VIEW_ALPHA_CHANNEL_CELL_CLASS = 'dx-colorview-alpha-channel-cell';
var COLOR_VIEW_ALPHA_CHANNEL_BORDER_CLASS = 'dx-colorview-alpha-channel-border';
var COLOR_VIEW_COLOR_PREVIEW = 'dx-colorview-color-preview';
var COLOR_VIEW_COLOR_PREVIEW_CONTAINER_CLASS = 'dx-colorview-color-preview-container';
var COLOR_VIEW_COLOR_PREVIEW_CONTAINER_INNER_CLASS = 'dx-colorview-color-preview-container-inner';
var COLOR_VIEW_COLOR_PREVIEW_COLOR_CURRENT = 'dx-colorview-color-preview-color-current';
var COLOR_VIEW_COLOR_PREVIEW_COLOR_NEW = 'dx-colorview-color-preview-color-new';
var TEXT_EDITOR_INPUT = 'dx-texteditor-input';
var BLACK_COLOR = '#000000';
var ColorView = _editor.default.inherit({
  _supportedKeys: function _supportedKeys() {
    var isRTL = this.option('rtlEnabled');
    var that = this;
    var getHorizontalPaletteStep = function getHorizontalPaletteStep(e) {
      var step = 100 / that._paletteWidth;
      if (e.shiftKey) {
        step = step * that.option('keyStep');
      }
      step = step > 1 ? step : 1;
      return Math.round(step);
    };
    var updateHorizontalPaletteValue = function updateHorizontalPaletteValue(step) {
      var value = that._currentColor.hsv.s + step;
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      }
      that._currentColor.hsv.s = value;
      updatePaletteValue();
    };
    var getVerticalPaletteStep = function getVerticalPaletteStep(e) {
      var step = 100 / that._paletteHeight;
      if (e.shiftKey) {
        step = step * that.option('keyStep');
      }
      step = step > 1 ? step : 1;
      return Math.round(step);
    };
    var updateVerticalPaletteValue = function updateVerticalPaletteValue(step) {
      var value = that._currentColor.hsv.v + step;
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      }
      that._currentColor.hsv.v = value;
      updatePaletteValue();
    };
    function updatePaletteValue() {
      that._placePaletteHandle();
      that._updateColorFromHsv(that._currentColor.hsv.h, that._currentColor.hsv.s, that._currentColor.hsv.v);
    }
    var getHueScaleStep = function getHueScaleStep(e) {
      var step = 360 / (that._hueScaleWrapperHeight - that._hueScaleHandleHeight);
      if (e.shiftKey) {
        step = step * that.option('keyStep');
      }
      step = step > 1 ? step : 1;
      return step;
    };
    var updateHueScaleValue = function updateHueScaleValue(step) {
      that._currentColor.hsv.h += step;
      that._placeHueScaleHandle();
      var handleLocation = (0, _translator.locate)(that._$hueScaleHandle);
      that._updateColorHue(handleLocation.top + that._hueScaleHandleHeight / 2);
    };
    var getAlphaScaleStep = function getAlphaScaleStep(e) {
      var step = 1 / that._alphaChannelScaleWorkWidth;
      if (e.shiftKey) {
        step = step * that.option('keyStep');
      }
      step = step > 0.01 ? step : 0.01;
      step = isRTL ? -step : step;
      return step;
    };
    var updateAlphaScaleValue = function updateAlphaScaleValue(step) {
      that._currentColor.a += step;
      that._placeAlphaChannelHandle();
      var handleLocation = (0, _translator.locate)(that._$alphaChannelHandle);
      that._calculateColorTransparencyByScaleWidth(handleLocation.left + that._alphaChannelHandleWidth / 2);
    };
    return (0, _extend.extend)(this.callBase(), {
      upArrow: function upArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (this._currentColor.hsv.h <= 360 && !this._isTopColorHue) {
            this._saveValueChangeEvent(e);
            updateHueScaleValue(getHueScaleStep(e));
          }
        } else if (this._currentColor.hsv.v < 100) {
          this._saveValueChangeEvent(e);
          updateVerticalPaletteValue(getVerticalPaletteStep(e));
        }
      },
      downArrow: function downArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (this._currentColor.hsv.h >= 0) {
            if (this._isTopColorHue) {
              this._currentColor.hsv.h = 360;
            }
            this._saveValueChangeEvent(e);
            updateHueScaleValue(-getHueScaleStep(e));
          }
        } else if (this._currentColor.hsv.v > 0) {
          this._saveValueChangeEvent(e);
          updateVerticalPaletteValue(-getVerticalPaletteStep(e));
        }
      },
      rightArrow: function rightArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (isRTL ? this._currentColor.a < 1 : this._currentColor.a > 0 && this.option('editAlphaChannel')) {
            this._saveValueChangeEvent(e);
            updateAlphaScaleValue(-getAlphaScaleStep(e));
          }
        } else if (this._currentColor.hsv.s < 100) {
          this._saveValueChangeEvent(e);
          updateHorizontalPaletteValue(getHorizontalPaletteStep(e));
        }
      },
      leftArrow: function leftArrow(e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, _index.isCommandKeyPressed)(e)) {
          if (isRTL ? this._currentColor.a > 0 : this._currentColor.a < 1 && this.option('editAlphaChannel')) {
            this._saveValueChangeEvent(e);
            updateAlphaScaleValue(getAlphaScaleStep(e));
          }
        } else if (this._currentColor.hsv.s > 0) {
          this._saveValueChangeEvent(e);
          updateHorizontalPaletteValue(-getHorizontalPaletteStep(e));
        }
      },
      enter: function enter(e) {
        this._fireEnterKeyPressed(e);
      }
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      value: null,
      matchValue: null,
      onEnterKeyPressed: undefined,
      editAlphaChannel: false,
      keyStep: 1,
      stylingMode: undefined
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function _init() {
    this.callBase();
    this._initColorAndOpacity();
    this._initEnterKeyPressedAction();
  },
  _initEnterKeyPressedAction: function _initEnterKeyPressedAction() {
    this._onEnterKeyPressedAction = this._createActionByOption('onEnterKeyPressed');
  },
  _fireEnterKeyPressed: function _fireEnterKeyPressed(e) {
    if (!this._onEnterKeyPressedAction) return;
    this._onEnterKeyPressedAction({
      event: e
    });
  },
  _initColorAndOpacity: function _initColorAndOpacity() {
    this._setCurrentColor(this.option('value'));
  },
  _setCurrentColor: function _setCurrentColor(value) {
    value = value || BLACK_COLOR;
    var newColor = new _color.default(value);
    if (!newColor.colorIsInvalid) {
      if (!this._currentColor || this._makeRgba(this._currentColor) !== this._makeRgba(newColor)) {
        this._currentColor = newColor;
        if (this._$currentColor) {
          this._makeTransparentBackground(this._$currentColor, newColor);
        }
      }
    } else {
      if (!this._currentColor) {
        this._currentColor = new _color.default(BLACK_COLOR);
      }
      this.option('value', this._currentColor.baseColor);
    }
  },
  _setBaseColor: function _setBaseColor(value) {
    var color = value || BLACK_COLOR;
    var newColor = new _color.default(color);
    if (!newColor.colorIsInvalid) {
      var isBaseColorChanged = this._makeRgba(this.option('matchValue') !== this._makeRgba(newColor));
      if (isBaseColorChanged) {
        if (this._$baseColor) {
          this._makeTransparentBackground(this._$baseColor, newColor);
        }
      }
    }
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(COLOR_VIEW_CLASS);
    this._renderColorPickerContainer();
  },
  _render: function _render() {
    this.callBase();
    this._renderPalette();
    this._renderHueScale();
    this._renderControlsContainer();
    this._renderControls();
    this._renderAlphaChannelElements();
  },
  _makeTransparentBackground: function _makeTransparentBackground($el, color) {
    if (!(color instanceof _color.default)) {
      color = new _color.default(color);
    }
    $el.css('backgroundColor', this._makeRgba(color));
  },
  _makeRgba: function _makeRgba(color) {
    if (!(color instanceof _color.default)) {
      color = new _color.default(color);
    }
    return 'rgba(' + [color.r, color.g, color.b, color.a].join(', ') + ')';
  },
  _renderValue: function _renderValue() {
    this.callBase(this.option('editAlphaChannel') ? this._makeRgba(this._currentColor) : this.option('value'));
  },
  _renderColorPickerContainer: function _renderColorPickerContainer() {
    var $parent = this.$element();
    this._$colorPickerContainer = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_CONTAINER_CLASS).appendTo($parent);
    this._renderHtmlRows();
  },
  _renderHtmlRows: function _renderHtmlRows(updatedOption) {
    var $renderedRows = this._$colorPickerContainer.find('.' + COLOR_VIEW_ROW_CLASS);
    var renderedRowsCount = $renderedRows.length;
    var rowCount = this.option('editAlphaChannel') ? 2 : 1;
    var delta = renderedRowsCount - rowCount;
    if (delta > 0) {
      $renderedRows.eq(-1).remove();
    }
    if (delta < 0) {
      delta = Math.abs(delta);
      var rows = [];
      var i;
      for (i = 0; i < delta; i++) {
        rows.push((0, _renderer.default)('<div>').addClass(COLOR_VIEW_ROW_CLASS));
      }
      if (renderedRowsCount) {
        for (i = 0; i < rows.length; i++) {
          $renderedRows.eq(0).after(rows[i]);
        }
      } else {
        this._$colorPickerContainer.append(rows);
      }
    }
  },
  _renderHtmlCellInsideRow: function _renderHtmlCellInsideRow(index, $rowParent, additionalClass) {
    return (0, _renderer.default)('<div>').addClass(COLOR_VIEW_CELL_CLASS).addClass(additionalClass).appendTo($rowParent.find('.' + COLOR_VIEW_ROW_CLASS).eq(index));
  },
  _renderPalette: function _renderPalette() {
    var $paletteCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, COLOR_VIEW_PALETTE_CELL_CLASS);
    var $paletteGradientWhite = (0, _renderer.default)('<div>').addClass([COLOR_VIEW_PALETTE_GRADIENT_CLASS, COLOR_VIEW_PALETTE_GRADIENT_WHITE_CLASS].join(' '));
    var $paletteGradientBlack = (0, _renderer.default)('<div>').addClass([COLOR_VIEW_PALETTE_GRADIENT_CLASS, COLOR_VIEW_PALETTE_GRADIENT_BLACK_CLASS].join(' '));
    this._$palette = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_PALETTE_CLASS).css('backgroundColor', this._currentColor.getPureColor().toHex()).appendTo($paletteCell);
    this._paletteHeight = (0, _size.getHeight)(this._$palette);
    this._paletteWidth = (0, _size.getWidth)(this._$palette);
    this._renderPaletteHandle();
    this._$palette.append([$paletteGradientWhite, $paletteGradientBlack]);
  },
  _renderPaletteHandle: function _renderPaletteHandle() {
    var _this = this;
    this._$paletteHandle = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_PALETTE_HANDLE_CLASS).appendTo(this._$palette);
    var ariaId = "dx-".concat(new _guid.default());
    var handleAria = {
      id: ariaId,
      role: 'application'
    };
    this.setAria(handleAria, this._$paletteHandle);
    this.setAria('activedescendant', ariaId, this.option('target'));
    this._createComponent(this._$paletteHandle, _draggable.default, {
      contentTemplate: null,
      boundary: this._$palette,
      allowMoveByClick: true,
      boundOffset: function () {
        return -this._paletteHandleHeight / 2;
      }.bind(this),
      onDragMove: function onDragMove(_ref) {
        var event = _ref.event;
        var paletteHandlePosition = (0, _translator.locate)(_this._$paletteHandle);
        _this._updateByDrag = true;
        _this._saveValueChangeEvent(event);
        _this._updateColorFromHsv(_this._currentColor.hsv.h, _this._calculateColorSaturation(paletteHandlePosition), _this._calculateColorValue(paletteHandlePosition));
      }
    });
    this._paletteHandleWidth = (0, _size.getWidth)(this._$paletteHandle);
    this._paletteHandleHeight = (0, _size.getHeight)(this._$paletteHandle);
    this._placePaletteHandle();
  },
  _placePaletteHandle: function _placePaletteHandle() {
    (0, _translator.move)(this._$paletteHandle, {
      left: Math.round(this._paletteWidth * this._currentColor.hsv.s / 100 - this._paletteHandleWidth / 2),
      top: Math.round(this._paletteHeight - this._paletteHeight * this._currentColor.hsv.v / 100 - this._paletteHandleHeight / 2)
    });
  },
  _calculateColorValue: function _calculateColorValue(paletteHandlePosition) {
    var value = Math.floor(paletteHandlePosition.top + this._paletteHandleHeight / 2);
    return 100 - Math.round(value * 100 / this._paletteHeight);
  },
  _calculateColorSaturation: function _calculateColorSaturation(paletteHandlePosition) {
    var saturation = Math.floor(paletteHandlePosition.left + this._paletteHandleWidth / 2);
    return Math.round(saturation * 100 / this._paletteWidth);
  },
  _updateColorFromHsv: function _updateColorFromHsv(hue, saturation, value) {
    var a = this._currentColor.a;
    this._currentColor = new _color.default('hsv(' + [hue, saturation, value].join(',') + ')');
    this._currentColor.a = a;
    this._updateColorParamsAndColorPreview();
    this.applyColor();
  },
  _renderHueScale: function _renderHueScale() {
    var $hueScaleCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, COLOR_VIEW_HUE_SCALE_CELL_CLASS);
    this._$hueScaleWrapper = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_HUE_SCALE_WRAPPER_CLASS).appendTo($hueScaleCell);
    this._$hueScale = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_HUE_SCALE_CLASS).appendTo(this._$hueScaleWrapper);
    this._hueScaleHeight = (0, _size.getHeight)(this._$hueScale);
    this._hueScaleWrapperHeight = (0, _size.getOuterHeight)(this._$hueScaleWrapper);
    this._renderHueScaleHandle();
  },
  _renderHueScaleHandle: function _renderHueScaleHandle() {
    var _this2 = this;
    this._$hueScaleHandle = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_HUE_SCALE_HANDLE_CLASS).appendTo(this._$hueScaleWrapper);
    this._createComponent(this._$hueScaleHandle, _draggable.default, {
      contentTemplate: null,
      boundary: this._$hueScaleWrapper,
      allowMoveByClick: true,
      dragDirection: 'vertical',
      onDragMove: function onDragMove(_ref2) {
        var event = _ref2.event;
        _this2._updateByDrag = true;
        _this2._saveValueChangeEvent(event);
        _this2._updateColorHue((0, _translator.locate)(_this2._$hueScaleHandle).top + _this2._hueScaleHandleHeight / 2);
      }
    });
    this._hueScaleHandleHeight = (0, _size.getHeight)(this._$hueScaleHandle);
    this._placeHueScaleHandle();
  },
  _placeHueScaleHandle: function _placeHueScaleHandle() {
    var hueScaleHeight = this._hueScaleWrapperHeight;
    var handleHeight = this._hueScaleHandleHeight;
    var top = (hueScaleHeight - handleHeight) * (360 - this._currentColor.hsv.h) / 360;
    if (hueScaleHeight < top + handleHeight) {
      top = hueScaleHeight - handleHeight;
    }
    if (top < 0) {
      top = 0;
    }
    (0, _translator.move)(this._$hueScaleHandle, {
      top: Math.round(top)
    });
  },
  _updateColorHue: function _updateColorHue(handlePosition) {
    var hue = 360 - Math.round((handlePosition - this._hueScaleHandleHeight / 2) * 360 / (this._hueScaleWrapperHeight - this._hueScaleHandleHeight));
    var saturation = this._currentColor.hsv.s;
    var value = this._currentColor.hsv.v;
    this._isTopColorHue = false;
    hue = hue < 0 ? 0 : hue;
    if (hue >= 360) {
      this._isTopColorHue = true;
      hue = 0;
    }
    this._updateColorFromHsv(hue, saturation, value);
    this._$palette.css('backgroundColor', this._currentColor.getPureColor().toHex());
  },
  _renderControlsContainer: function _renderControlsContainer() {
    var $controlsContainerCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer);
    this._$controlsContainer = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_CONTROLS_CONTAINER_CLASS).appendTo($controlsContainerCell);
  },
  _renderControls: function _renderControls() {
    this._renderColorsPreview();
    this._renderRgbInputs();
    this._renderHexInput();
  },
  _renderColorsPreview: function _renderColorsPreview() {
    var $colorsPreviewContainer = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_COLOR_PREVIEW_CONTAINER_CLASS).appendTo(this._$controlsContainer);
    var $colorsPreviewContainerInner = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_COLOR_PREVIEW_CONTAINER_INNER_CLASS).appendTo($colorsPreviewContainer);
    this._$currentColor = (0, _renderer.default)('<div>').addClass([COLOR_VIEW_COLOR_PREVIEW, COLOR_VIEW_COLOR_PREVIEW_COLOR_NEW].join(' '));
    this._$baseColor = (0, _renderer.default)('<div>').addClass([COLOR_VIEW_COLOR_PREVIEW, COLOR_VIEW_COLOR_PREVIEW_COLOR_CURRENT].join(' '));
    this._makeTransparentBackground(this._$baseColor, this.option('matchValue'));
    this._makeTransparentBackground(this._$currentColor, this._currentColor);
    $colorsPreviewContainerInner.append([this._$baseColor, this._$currentColor]);
  },
  _renderAlphaChannelElements: function _renderAlphaChannelElements() {
    if (this.option('editAlphaChannel')) {
      this._$colorPickerContainer.find('.' + COLOR_VIEW_ROW_CLASS).eq(1).addClass(COLOR_VIEW_APLHA_CHANNEL_ROW_CLASS);
      this._renderAlphaChannelScale();
      this._renderAlphaChannelInput();
    }
  },
  _renderRgbInputs: function _renderRgbInputs() {
    this._rgbInputsWithLabels = [this._renderEditorWithLabel({
      editorType: _number_box.default,
      value: this._currentColor.r,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: 'R',
      labelAriaText: _message.default.format('dxColorView-ariaRed'),
      labelClass: COLOR_VIEW_RED_LABEL_CLASS
    }), this._renderEditorWithLabel({
      editorType: _number_box.default,
      value: this._currentColor.g,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: 'G',
      labelAriaText: _message.default.format('dxColorView-ariaGreen'),
      labelClass: COLOR_VIEW_GREEN_LABEL_CLASS
    }), this._renderEditorWithLabel({
      editorType: _number_box.default,
      value: this._currentColor.b,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: 'B',
      labelAriaText: _message.default.format('dxColorView-ariaBlue'),
      labelClass: COLOR_VIEW_BLUE_LABEL_CLASS
    })];
    this._$controlsContainer.append(this._rgbInputsWithLabels);
    this._rgbInputs = [this._rgbInputsWithLabels[0].find('.dx-numberbox').dxNumberBox('instance'), this._rgbInputsWithLabels[1].find('.dx-numberbox').dxNumberBox('instance'), this._rgbInputsWithLabels[2].find('.dx-numberbox').dxNumberBox('instance')];
  },
  _renderEditorWithLabel: function _renderEditorWithLabel(options) {
    var _this3 = this;
    var $editor = (0, _renderer.default)('<div>');
    var $label = (0, _renderer.default)('<label>').addClass(options.labelClass).text(options.labelText + ':').append($editor);
    _events_engine.default.off($label, _click.name);
    _events_engine.default.on($label, _click.name, function (e) {
      e.preventDefault();
    });
    var editorType = options.editorType;
    var editorOptions = (0, _extend.extend)({
      value: options.value,
      onValueChanged: options.onValueChanged,
      onKeyboardHandled: function onKeyboardHandled(opts) {
        return _this3._keyboardHandler(opts);
      }
    }, {
      stylingMode: this.option('stylingMode')
    });
    if (editorType === _number_box.default) {
      editorOptions.min = options.min || 0;
      editorOptions.max = options.max || 255;
      editorOptions.step = options.step || 1;
    }
    var editor = new editorType($editor, editorOptions);
    editor.registerKeyHandler('enter', function (e) {
      this._fireEnterKeyPressed(e);
    }.bind(this));
    this.setAria('label', options.labelAriaText, $editor);
    return $label;
  },
  hexInputOptions: function hexInputOptions() {
    return {
      editorType: _text_box.default,
      value: this._currentColor.toHex().replace('#', ''),
      onValueChanged: this._updateColor.bind(this, true),
      labelClass: COLOR_VIEW_HEX_LABEL_CLASS,
      labelText: '#',
      labelAriaText: _message.default.format('dxColorView-ariaHex')
    };
  },
  _renderHexInput: function _renderHexInput() {
    this._hexInput = _text_box.default.getInstance(this._renderEditorWithLabel(this.hexInputOptions()).appendTo(this._$controlsContainer).find('.dx-textbox'));
    var inputId = "dx-".concat(new _guid.default());
    var $hexInput = this._$controlsContainer.find(".".concat(COLOR_VIEW_HEX_LABEL_CLASS)).find(".".concat(TEXT_EDITOR_INPUT));
    this.setAria('id', inputId, $hexInput);
    this.setAria('labelledby', inputId, this._$paletteHandle);
  },
  _renderAlphaChannelScale: function _renderAlphaChannelScale() {
    var $alphaChannelScaleCell = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer, COLOR_VIEW_ALPHA_CHANNEL_CELL_CLASS);
    var $alphaChannelBorder = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_ALPHA_CHANNEL_BORDER_CLASS).appendTo($alphaChannelScaleCell);
    var $alphaChannelScaleWrapper = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_ALPHA_CHANNEL_SCALE_WRAPPER_CLASS).appendTo($alphaChannelBorder);
    this._$alphaChannelScale = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_ALPHA_CHANNEL_SCALE_CLASS).appendTo($alphaChannelScaleWrapper);
    this._makeCSSLinearGradient(this._$alphaChannelScale);
    this._renderAlphaChannelHandle($alphaChannelScaleCell);
  },
  _makeCSSLinearGradient: function _makeCSSLinearGradient($el) {
    var color = this._currentColor;
    var colorAsRgb = "".concat(color.r, ",").concat(color.g, ",").concat(color.b);
    var rtlEnabled = this.option('rtlEnabled');
    var startColor = "rgba(".concat(colorAsRgb, ", ").concat(rtlEnabled ? '1' : '0', ")");
    var finishColor = "rgba(".concat(colorAsRgb, ", ").concat(rtlEnabled ? '0' : '1', ")");
    var backgroundImage = "linear-gradient(-90deg, ".concat(startColor, ", ").concat(finishColor, ")");
    $el.css('backgroundImage', backgroundImage);
  },
  _renderAlphaChannelInput: function _renderAlphaChannelInput() {
    var that = this;
    var $alphaChannelInputCell = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer);
    that._alphaChannelInput = this._renderEditorWithLabel({
      editorType: _number_box.default,
      value: this._currentColor.a,
      max: 1,
      step: 0.1,
      onValueChanged: function onValueChanged(args) {
        var value = args.value;
        value = that._currentColor.isValidAlpha(value) ? value : that._currentColor.a;
        args.event && that._saveValueChangeEvent(args.event);
        that._updateColorTransparency(value);
        that._placeAlphaChannelHandle();
      },
      labelClass: COLOR_VIEW_ALPHA_CHANNEL_LABEL_CLASS,
      labelText: 'Alpha',
      labelAriaText: _message.default.format('dxColorView-ariaAlpha')
    }).appendTo($alphaChannelInputCell).find('.dx-numberbox').dxNumberBox('instance');
  },
  _updateColorTransparency: function _updateColorTransparency(transparency) {
    this._currentColor.a = transparency;
    this.applyColor();
  },
  _renderAlphaChannelHandle: function _renderAlphaChannelHandle($parent) {
    var _this4 = this;
    this._$alphaChannelHandle = (0, _renderer.default)('<div>').addClass(COLOR_VIEW_ALPHA_CHANNEL_HANDLE_CLASS).appendTo($parent);
    this._createComponent(this._$alphaChannelHandle, _draggable.default, {
      contentTemplate: null,
      boundary: $parent,
      allowMoveByClick: true,
      dragDirection: 'horizontal',
      onDragMove: function onDragMove(_ref3) {
        var event = _ref3.event;
        _this4._updateByDrag = true;
        var $alphaChannelHandle = _this4._$alphaChannelHandle;
        var alphaChannelHandlePosition = (0, _translator.locate)($alphaChannelHandle).left + _this4._alphaChannelHandleWidth / 2;
        _this4._saveValueChangeEvent(event);
        _this4._calculateColorTransparencyByScaleWidth(alphaChannelHandlePosition);
      }
    });
    this._alphaChannelHandleWidth = (0, _size.getWidth)(this._$alphaChannelHandle);
    this._alphaChannelScaleWorkWidth = (0, _size.getWidth)($parent) - this._alphaChannelHandleWidth;
    this._placeAlphaChannelHandle();
  },
  _calculateColorTransparencyByScaleWidth: function _calculateColorTransparencyByScaleWidth(handlePosition) {
    var transparency = (handlePosition - this._alphaChannelHandleWidth / 2) / this._alphaChannelScaleWorkWidth;
    var rtlEnabled = this.option('rtlEnabled');
    transparency = rtlEnabled ? transparency : 1 - transparency;
    if (handlePosition >= this._alphaChannelScaleWorkWidth + this._alphaChannelHandleWidth / 2) {
      transparency = rtlEnabled ? 1 : 0;
    } else if (transparency < 1) {
      transparency = transparency.toFixed(2);
    }
    var previousTransparency = this._alphaChannelInput.option('value');
    transparency = Math.max(transparency, 0);
    transparency = Math.min(transparency, 1);
    if (transparency === previousTransparency) {
      this._updateByDrag = false;
    } else {
      this._alphaChannelInput.option('value', transparency);
    }
  },
  _placeAlphaChannelHandle: function _placeAlphaChannelHandle() {
    var left = this._alphaChannelScaleWorkWidth * (1 - this._currentColor.a);
    if (left < 0) {
      left = 0;
    }
    if (this._alphaChannelScaleWorkWidth < left) {
      left = this._alphaChannelScaleWorkWidth;
    }
    (0, _translator.move)(this._$alphaChannelHandle, {
      'left': this.option('rtlEnabled') ? this._alphaChannelScaleWorkWidth - left : left
    });
  },
  applyColor: function applyColor() {
    var previousValue = this.option('value');
    var colorValue = this.option('editAlphaChannel') ? this._makeRgba(this._currentColor) : this._currentColor.toHex();
    this._makeTransparentBackground(this._$currentColor, this._currentColor);
    if (colorValue === previousValue) {
      this._updateByDrag = false;
    } else {
      this.option('value', colorValue);
    }
  },
  cancelColor: function cancelColor() {
    this._initColorAndOpacity();
    this._refreshMarkup();
  },
  _updateColor: function _updateColor(isHex, args) {
    var rgba;
    var newColor;
    if (isHex) {
      newColor = this._validateHex('#' + this._hexInput.option('value'));
    } else {
      rgba = this._validateRgb();
      if (this._alphaChannelInput) {
        rgba.push(this._alphaChannelInput.option('value'));
        newColor = 'rgba(' + rgba.join(', ') + ')';
      } else {
        newColor = 'rgb(' + rgba.join(', ') + ')';
      }
    }
    if (!this._suppressEditorsValueUpdating) {
      this._currentColor = new _color.default(newColor);
      this._saveValueChangeEvent(args.event);
      this.applyColor();
      this._refreshMarkup();
    }
  },
  _validateHex: function _validateHex(hex) {
    return this._currentColor.isValidHex(hex) ? hex : this._currentColor.toHex();
  },
  _validateRgb: function _validateRgb() {
    var r = this._rgbInputs[0].option('value');
    var g = this._rgbInputs[1].option('value');
    var b = this._rgbInputs[2].option('value');
    if (!this._currentColor.isValidRGB(r, g, b)) {
      r = this._currentColor.r;
      g = this._currentColor.g;
      b = this._currentColor.b;
    }
    return [r, g, b];
  },
  _refreshMarkup: function _refreshMarkup() {
    this._placeHueScaleHandle();
    this._placePaletteHandle();
    this._updateColorParamsAndColorPreview();
    this._$palette.css('backgroundColor', this._currentColor.getPureColor().toHex());
    if (this._$alphaChannelHandle) {
      this._updateColorTransparency(this._currentColor.a);
      this._placeAlphaChannelHandle();
    }
  },
  _updateColorParamsAndColorPreview: function _updateColorParamsAndColorPreview() {
    this._suppressEditorsValueUpdating = true;
    this._hexInput.option('value', this._currentColor.toHex().replace('#', ''));
    this._rgbInputs[0].option('value', this._currentColor.r);
    this._rgbInputs[1].option('value', this._currentColor.g);
    this._rgbInputs[2].option('value', this._currentColor.b);
    this._suppressEditorsValueUpdating = false;
    if (this.option('editAlphaChannel')) {
      this._makeCSSLinearGradient.call(this, this._$alphaChannelScale);
      this._alphaChannelInput.option('value', this._currentColor.a);
    }
  },
  _optionChanged: function _optionChanged(args) {
    var value = args.value;
    switch (args.name) {
      case 'value':
        this._setCurrentColor(value);
        if (!this._updateByDrag) {
          this._refreshMarkup();
        }
        this._updateByDrag = false;
        this.callBase(args);
        break;
      case 'matchValue':
        this._setBaseColor(value);
        break;
      case 'onEnterKeyPressed':
        this._initEnterKeyPressedAction();
        break;
      case 'editAlphaChannel':
        if (this._$colorPickerContainer) {
          this._renderHtmlRows('editAlphaChannel');
          this._renderAlphaChannelElements();
        }
        break;
      case 'keyStep':
        break;
      case 'stylingMode':
        this._renderControls();
        break;
      default:
        this.callBase(args);
    }
  }
});
(0, _component_registrator.default)('dxColorView', ColorView);
var _default = ColorView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;