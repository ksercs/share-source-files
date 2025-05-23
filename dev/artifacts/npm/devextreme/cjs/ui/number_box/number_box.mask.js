/**
* DevExtreme (cjs/ui/number_box/number_box.mask.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _math = require("../../core/utils/math");
var _number = _interopRequireDefault(require("../../localization/number"));
var _number_box = require("./number_box.caret");
var _number2 = require("../../localization/ldml/number");
var _number_box2 = _interopRequireDefault(require("./number_box.base"));
var _index = require("../../events/utils/index");
var _common = require("../../core/utils/common");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var NUMBER_FORMATTER_NAMESPACE = 'dxNumberFormatter';
var MOVE_FORWARD = 1;
var MOVE_BACKWARD = -1;
var MINUS = '-';
var MINUS_KEY = 'minus';
var INPUT_EVENT = 'input';
var CARET_TIMEOUT_DURATION = 0;
var NumberBoxMask = _number_box2.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      useMaskBehavior: true,
      format: null
    });
  },
  _isDeleteKey: function _isDeleteKey(key) {
    return key === 'del';
  },
  _supportedKeys: function _supportedKeys() {
    if (!this._useMaskBehavior()) {
      return this.callBase();
    }
    var that = this;
    return (0, _extend.extend)(this.callBase(), {
      minus: that._revertSign.bind(that),
      del: that._removeHandler.bind(that),
      backspace: that._removeHandler.bind(that),
      leftArrow: that._arrowHandler.bind(that, MOVE_BACKWARD),
      rightArrow: that._arrowHandler.bind(that, MOVE_FORWARD),
      home: that._moveCaretToBoundaryEventHandler.bind(that, MOVE_FORWARD),
      enter: that._updateFormattedValue.bind(that),
      end: that._moveCaretToBoundaryEventHandler.bind(that, MOVE_BACKWARD)
    });
  },
  _getTextSeparatorIndex: function _getTextSeparatorIndex(text) {
    var decimalSeparator = _number.default.getDecimalSeparator();
    var realSeparatorOccurrenceIndex = (0, _utils.getRealSeparatorIndex)(this.option('format')).occurrence;
    return (0, _utils.getNthOccurrence)(text, decimalSeparator, realSeparatorOccurrenceIndex);
  },
  _focusInHandler: function _focusInHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this.clearCaretTimeout();
      this._caretTimeout = setTimeout(function () {
        this._caretTimeout = undefined;
        var caret = this._caret();
        if (caret.start === caret.end && this._useMaskBehavior()) {
          var text = this._getInputVal();
          var decimalSeparatorIndex = this._getTextSeparatorIndex(text);
          if (decimalSeparatorIndex >= 0) {
            this._caret({
              start: decimalSeparatorIndex,
              end: decimalSeparatorIndex
            });
          } else {
            this._moveCaretToBoundaryEventHandler(MOVE_BACKWARD, e);
          }
        }
      }.bind(this), CARET_TIMEOUT_DURATION);
    }
    this.callBase(e);
  },
  _focusOutHandler: function _focusOutHandler(e) {
    var shouldHandleEvent = !this._preventNestedFocusEvent(e);
    if (shouldHandleEvent) {
      this._focusOutOccurs = true;
      if (this._useMaskBehavior()) {
        this._updateFormattedValue();
      }
    }
    this.callBase(e);
    if (shouldHandleEvent) {
      this._focusOutOccurs = false;
    }
  },
  _hasValueBeenChanged(inputValue) {
    var format = this._getFormatPattern();
    var value = this.option('value');
    var formatted = this._format(value, format) || '';
    return formatted !== inputValue;
  },
  _updateFormattedValue: function _updateFormattedValue() {
    var inputValue = this._getInputVal();
    if (this._hasValueBeenChanged(inputValue)) {
      this._updateParsedValue();
      this._adjustParsedValue();
      this._setTextByParsedValue();
      if (this._parsedValue !== this.option('value')) {
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15181565/
        // https://bugreport.apple.com/web/?problemID=38133794 but this bug tracker is private
        _events_engine.default.trigger(this._input(), 'change');
      }
    }
  },
  _arrowHandler: function _arrowHandler(step, e) {
    if (!this._useMaskBehavior()) {
      return;
    }
    var text = this._getInputVal();
    var format = this._getFormatPattern();
    var nextCaret = (0, _number_box.getCaretWithOffset)(this._caret(), step);
    if (!(0, _number_box.isCaretInBoundaries)(nextCaret, text, format)) {
      nextCaret = step === MOVE_FORWARD ? nextCaret.end : nextCaret.start;
      e.preventDefault();
      this._caret((0, _number_box.getCaretInBoundaries)(nextCaret, text, format));
    }
  },
  _moveCaretToBoundary: function _moveCaretToBoundary(direction) {
    var boundaries = (0, _number_box.getCaretBoundaries)(this._getInputVal(), this._getFormatPattern());
    var newCaret = (0, _number_box.getCaretWithOffset)(direction === MOVE_FORWARD ? boundaries.start : boundaries.end, 0);
    this._caret(newCaret);
  },
  _moveCaretToBoundaryEventHandler: function _moveCaretToBoundaryEventHandler(direction, e) {
    if (!this._useMaskBehavior() || e && e.shiftKey) {
      return;
    }
    this._moveCaretToBoundary(direction);
    e && e.preventDefault();
  },
  _shouldMoveCaret: function _shouldMoveCaret(text, caret) {
    var decimalSeparator = _number.default.getDecimalSeparator();
    var isDecimalSeparatorNext = text.charAt(caret.end) === decimalSeparator;
    var moveToFloat = (this._lastKey === decimalSeparator || this._lastKey === '.' || this._lastKey === ',') && isDecimalSeparatorNext;
    return moveToFloat;
  },
  _getInputVal: function _getInputVal() {
    return _number.default.convertDigits(this._input().val(), true);
  },
  _keyboardHandler: function _keyboardHandler(e) {
    this.clearCaretTimeout();
    this._lastKey = _number.default.convertDigits((0, _index.getChar)(e), true);
    this._lastKeyName = (0, _index.normalizeKeyName)(e);
    if (!this._shouldHandleKey(e.originalEvent)) {
      return this.callBase(e);
    }
    var normalizedText = this._getInputVal();
    var caret = this._caret();
    var enteredChar = this._lastKeyName === MINUS_KEY ? '' : this._lastKey;
    var newValue = this._tryParse(normalizedText, caret, enteredChar);
    if (this._shouldMoveCaret(normalizedText, caret)) {
      this._moveCaret(1);
      e.originalEvent.preventDefault();
    }
    if (newValue === undefined) {
      if (this._lastKeyName !== MINUS_KEY) {
        e.originalEvent.preventDefault();
      }
    } else {
      this._parsedValue = newValue;
    }
    return this.callBase(e);
  },
  _keyPressHandler: function _keyPressHandler(e) {
    if (!this._useMaskBehavior()) {
      this.callBase(e);
    }
  },
  _removeHandler: function _removeHandler(e) {
    var caret = this._caret();
    var text = this._getInputVal();
    var start = caret.start;
    var end = caret.end;
    this._lastKey = (0, _index.getChar)(e);
    this._lastKeyName = (0, _index.normalizeKeyName)(e);
    var isDeleteKey = this._isDeleteKey(this._lastKeyName);
    var isBackspaceKey = !isDeleteKey;
    if (start === end) {
      var caretPosition = start;
      var canDelete = isBackspaceKey && caretPosition > 0 || isDeleteKey && caretPosition < text.length;
      if (canDelete) {
        isDeleteKey && end++;
        isBackspaceKey && start--;
      } else {
        e.preventDefault();
        return;
      }
    }
    var char = text.slice(start, end);
    if (this._isStub(char)) {
      this._moveCaret(isDeleteKey ? 1 : -1);
      if (this._parsedValue < 0 || 1 / this._parsedValue === -Infinity) {
        this._revertSign(e);
        this._setTextByParsedValue();
        var shouldTriggerInputEvent = this.option('valueChangeEvent').split(' ').includes('input');
        if (shouldTriggerInputEvent) {
          _events_engine.default.trigger(this._input(), 'input');
        }
      }
      e.preventDefault();
      return;
    }
    var decimalSeparator = _number.default.getDecimalSeparator();
    if (char === decimalSeparator) {
      var decimalSeparatorIndex = text.indexOf(decimalSeparator);
      if (this._isNonStubAfter(decimalSeparatorIndex + 1)) {
        this._moveCaret(isDeleteKey ? 1 : -1);
        e.preventDefault();
      }
      return;
    }
    if (end - start < text.length) {
      var editedText = this._replaceSelectedText(text, {
        start: start,
        end: end
      }, '');
      var noDigits = editedText.search(/[0-9]/) < 0;
      if (noDigits && this._isValueInRange(0)) {
        this._parsedValue = this._parsedValue < 0 || 1 / this._parsedValue === -Infinity ? -0 : 0;
        return;
      }
    }
    var valueAfterRemoving = this._tryParse(text, {
      start: start,
      end: end
    }, '');
    if (valueAfterRemoving === undefined) {
      e.preventDefault();
    } else {
      this._parsedValue = valueAfterRemoving;
    }
  },
  _isPercentFormat: function _isPercentFormat() {
    var format = this._getFormatPattern();
    var noEscapedFormat = format.replace(/'[^']+'/g, '');
    return noEscapedFormat.indexOf('%') !== -1;
  },
  _parse: function _parse(text, format) {
    var formatOption = this.option('format');
    var isCustomParser = (0, _type.isFunction)(formatOption.parser);
    var parser = isCustomParser ? formatOption.parser : _number.default.parse;
    var integerPartStartIndex = 0;
    if (!isCustomParser) {
      var formatPointIndex = (0, _utils.getRealSeparatorIndex)(format).index;
      var textPointIndex = this._getTextSeparatorIndex(text);
      var formatIntegerPartLength = formatPointIndex !== -1 ? formatPointIndex : format.length;
      var textIntegerPartLength = textPointIndex !== -1 ? textPointIndex : text.length;
      if (textIntegerPartLength > formatIntegerPartLength && format.indexOf('#') === -1) {
        integerPartStartIndex = textIntegerPartLength - formatIntegerPartLength;
      }
    }
    text = text.substr(integerPartStartIndex);
    return parser(text, format);
  },
  _format: function _format(value, format) {
    var formatOption = this.option('format');
    var customFormatter = (formatOption === null || formatOption === void 0 ? void 0 : formatOption.formatter) || formatOption;
    var formatter = (0, _type.isFunction)(customFormatter) ? customFormatter : _number.default.format;
    var formattedValue = value === null ? '' : formatter(value, format);
    return formattedValue;
  },
  _getFormatPattern: function _getFormatPattern() {
    if (!this._currentFormat) {
      this._updateFormat();
    }
    return this._currentFormat;
  },
  _updateFormat: function _updateFormat() {
    var _this = this;
    var format = this.option('format');
    var isCustomParser = (0, _type.isFunction)(format === null || format === void 0 ? void 0 : format.parser);
    var isLDMLPattern = (0, _type.isString)(format) && (format.indexOf('0') >= 0 || format.indexOf('#') >= 0);
    var isExponentialFormat = format === 'exponential' || (format === null || format === void 0 ? void 0 : format.type) === 'exponential';
    var shouldUseFormatAsIs = isCustomParser || isLDMLPattern || isExponentialFormat;
    this._currentFormat = shouldUseFormatAsIs ? format : (0, _number2.getFormat)(function (value) {
      var text = _this._format(value, format);
      return _number.default.convertDigits(text, true);
    });
  },
  _getFormatForSign: function _getFormatForSign(text) {
    var format = this._getFormatPattern();
    if ((0, _type.isString)(format)) {
      var signParts = format.split(';');
      var sign = _number.default.getSign(text, format);
      signParts[1] = signParts[1] || '-' + signParts[0];
      return sign < 0 ? signParts[1] : signParts[0];
    } else {
      var _sign = _number.default.getSign(text);
      return _sign < 0 ? '-' : '';
    }
  },
  _removeStubs: function _removeStubs(text, excludeComma) {
    var format = this._getFormatForSign(text);
    var thousandsSeparator = _number.default.getThousandsSeparator();
    var stubs = this._getStubs(format);
    var result = text;
    if (stubs.length) {
      var prefixStubs = stubs[0];
      var postfixRegex = new RegExp('(' + (0, _common.escapeRegExp)(stubs[1] || '') + ')$', 'g');
      var decoratorsRegex = new RegExp('[-' + (0, _common.escapeRegExp)(excludeComma ? '' : thousandsSeparator) + ']', 'g');
      result = result.replace(prefixStubs, '').replace(postfixRegex, '').replace(decoratorsRegex, '');
    }
    return result;
  },
  _getStubs: function _getStubs(format) {
    var regExpResult = /[^']([#0.,]+)/g.exec(format);
    var pattern = regExpResult && regExpResult[0].trim();
    return format.split(pattern).map(function (stub) {
      return stub.replace(/'/g, '');
    });
  },
  _truncateToPrecision: function _truncateToPrecision(value, maxPrecision) {
    if ((0, _type.isDefined)(value)) {
      var strValue = value.toString();
      var decimalSeparatorIndex = strValue.indexOf('.');
      if (strValue && decimalSeparatorIndex > -1) {
        var parsedValue = parseFloat(strValue.substr(0, decimalSeparatorIndex + maxPrecision + 1));
        return isNaN(parsedValue) ? value : parsedValue;
      }
    }
    return value;
  },
  _tryParse: function _tryParse(text, selection, char) {
    var editedText = this._replaceSelectedText(text, selection, char);
    var format = this._getFormatPattern();
    var isTextSelected = selection.start !== selection.end;
    var parsedValue = this._getParsedValue(editedText, format);
    var maxPrecision = !format.parser && this._getPrecisionLimits(editedText).max;
    var isValueChanged = parsedValue !== this._parsedValue;
    var decimalSeparator = _number.default.getDecimalSeparator();
    var isDecimalPointRestricted = char === decimalSeparator && maxPrecision === 0;
    var isUselessCharRestricted = !isTextSelected && !isValueChanged && char !== MINUS && !this._isValueIncomplete(editedText) && this._isStub(char);
    if (isDecimalPointRestricted || isUselessCharRestricted) {
      return undefined;
    }
    if (this._removeStubs(editedText) === '') {
      parsedValue = Math.abs(this._parsedValue * 0);
    }
    if (isNaN(parsedValue)) {
      return undefined;
    }
    var value = parsedValue === null ? this._parsedValue : parsedValue;
    parsedValue = maxPrecision ? this._truncateToPrecision(value, maxPrecision) : parsedValue;
    return !format.parser && this._isPercentFormat() ? (0, _utils.adjustPercentValue)(parsedValue, maxPrecision) : parsedValue;
  },
  _getParsedValue: function _getParsedValue(text, format) {
    var sign = _number.default.getSign(text, (format === null || format === void 0 ? void 0 : format.formatter) || format);
    var textWithoutStubs = this._removeStubs(text, true);
    var parsedValue = this._parse(textWithoutStubs, format);
    var parsedValueSign = parsedValue < 0 ? -1 : 1;
    var parsedValueWithSign = (0, _type.isNumeric)(parsedValue) && sign !== parsedValueSign ? sign * parsedValue : parsedValue;
    return parsedValueWithSign;
  },
  _isValueIncomplete: function _isValueIncomplete(text) {
    if (!this._useMaskBehavior()) {
      return this.callBase(text);
    }
    var caret = this._caret();
    var point = _number.default.getDecimalSeparator();
    var pointIndex = this._getTextSeparatorIndex(text);
    var isCaretOnFloat = pointIndex >= 0 && pointIndex < caret.start;
    var textParts = this._removeStubs(text, true).split(point);
    if (!isCaretOnFloat || textParts.length !== 2) {
      return false;
    }
    var floatLength = textParts[1].length;
    var format = this._getFormatPattern();
    var isCustomParser = !!format.parser;
    var precision = !isCustomParser && this._getPrecisionLimits(this._getFormatPattern(), text);
    var isPrecisionInRange = isCustomParser ? true : (0, _math.inRange)(floatLength, precision.min, precision.max);
    var endsWithZero = textParts[1].charAt(floatLength - 1) === '0';
    return isPrecisionInRange && (endsWithZero || !floatLength);
  },
  _isValueInRange: function _isValueInRange(value) {
    var min = (0, _common.ensureDefined)(this.option('min'), -Infinity);
    var max = (0, _common.ensureDefined)(this.option('max'), Infinity);
    return (0, _math.inRange)(value, min, max);
  },
  _setInputText: function _setInputText(text) {
    var normalizedText = _number.default.convertDigits(text, true);
    var newCaret = (0, _number_box.getCaretAfterFormat)(this._getInputVal(), normalizedText, this._caret(), this._getFormatPattern());
    this._input().val(text);
    this._toggleEmptinessEventHandler();
    this._formattedValue = text;
    if (!this._focusOutOccurs) {
      this._caret(newCaret);
    }
  },
  _useMaskBehavior: function _useMaskBehavior() {
    return !!this.option('format') && this.option('useMaskBehavior');
  },
  _renderInputType: function _renderInputType() {
    var isNumberType = this.option('mode') === 'number';
    var isDesktop = _devices.default.real().deviceType === 'desktop';
    if (this._useMaskBehavior() && isNumberType) {
      this._setInputType(isDesktop || this._isSupportInputMode() ? 'text' : 'tel');
    } else {
      this.callBase();
    }
  },
  _isChar: function _isChar(str) {
    return (0, _type.isString)(str) && str.length === 1;
  },
  _moveCaret: function _moveCaret(offset) {
    if (!offset) {
      return;
    }
    var newCaret = (0, _number_box.getCaretWithOffset)(this._caret(), offset);
    var adjustedCaret = (0, _number_box.getCaretInBoundaries)(newCaret, this._getInputVal(), this._getFormatPattern());
    this._caret(adjustedCaret);
  },
  _shouldHandleKey: function _shouldHandleKey(e) {
    var keyName = (0, _index.normalizeKeyName)(e);
    var isSpecialChar = (0, _index.isCommandKeyPressed)(e) || e.altKey || e.shiftKey || !this._isChar(keyName);
    var isMinusKey = keyName === MINUS_KEY;
    var useMaskBehavior = this._useMaskBehavior();
    return useMaskBehavior && !isSpecialChar && !isMinusKey;
  },
  _renderInput: function _renderInput() {
    this.callBase();
    this._renderFormatter();
  },
  _renderFormatter: function _renderFormatter() {
    this._clearCache();
    this._detachFormatterEvents();
    if (this._useMaskBehavior()) {
      this._attachFormatterEvents();
    }
  },
  _detachFormatterEvents: function _detachFormatterEvents() {
    _events_engine.default.off(this._input(), '.' + NUMBER_FORMATTER_NAMESPACE);
  },
  _isInputFromPaste: function _isInputFromPaste(e) {
    var inputType = e.originalEvent && e.originalEvent.inputType;
    if ((0, _type.isDefined)(inputType)) {
      return inputType === 'insertFromPaste';
    } else {
      return this._isValuePasted;
    }
  },
  _attachFormatterEvents: function _attachFormatterEvents() {
    var $input = this._input();
    _events_engine.default.on($input, (0, _index.addNamespace)(INPUT_EVENT, NUMBER_FORMATTER_NAMESPACE), function (e) {
      this._formatValue(e);
      this._isValuePasted = false;
    }.bind(this));
    _events_engine.default.on($input, (0, _index.addNamespace)('dxclick', NUMBER_FORMATTER_NAMESPACE), function () {
      if (!this._caretTimeout) {
        this._caretTimeout = setTimeout(function () {
          this._caretTimeout = undefined;
          this._caret((0, _number_box.getCaretInBoundaries)(this._caret(), this._getInputVal(), this._getFormatPattern()));
        }.bind(this), CARET_TIMEOUT_DURATION);
      }
    }.bind(this));
    _events_engine.default.on($input, 'dxdblclick', function () {
      this.clearCaretTimeout();
    }.bind(this));
  },
  clearCaretTimeout: function clearCaretTimeout() {
    clearTimeout(this._caretTimeout);
    this._caretTimeout = undefined;
  },
  _forceRefreshInputValue: function _forceRefreshInputValue() {
    if (!this._useMaskBehavior()) {
      return this.callBase();
    }
  },
  _isNonStubAfter: function _isNonStubAfter(index) {
    var text = this._getInputVal().slice(index);
    return text && !this._isStub(text, true);
  },
  _isStub: function _isStub(str, isString) {
    var escapedDecimalSeparator = (0, _common.escapeRegExp)(_number.default.getDecimalSeparator());
    var regExpString = '^[^0-9' + escapedDecimalSeparator + ']+$';
    var stubRegExp = new RegExp(regExpString, 'g');
    return stubRegExp.test(str) && (isString || this._isChar(str));
  },
  _parseValue: function _parseValue(text) {
    if (!this._useMaskBehavior()) {
      return this.callBase(text);
    }
    return this._parsedValue;
  },
  _getPrecisionLimits: function _getPrecisionLimits(text) {
    var currentFormat = this._getFormatForSign(text);
    var realSeparatorIndex = (0, _utils.getRealSeparatorIndex)(currentFormat).index;
    var floatPart = ((0, _utils.splitByIndex)(currentFormat, realSeparatorIndex)[1] || '').replace(/[^#0]/g, '');
    var minPrecision = floatPart.replace(/^(0*)#*/, '$1').length;
    var maxPrecision = floatPart.length;
    return {
      min: minPrecision,
      max: maxPrecision
    };
  },
  _revertSign: function _revertSign(e) {
    if (!this._useMaskBehavior()) {
      return;
    }
    var caret = this._caret();
    if (caret.start !== caret.end) {
      if ((0, _index.normalizeKeyName)(e) === MINUS_KEY) {
        this._applyRevertedSign(e, caret, true);
        return;
      } else {
        this._caret((0, _number_box.getCaretInBoundaries)(0, this._getInputVal(), this._getFormatPattern()));
      }
    }
    this._applyRevertedSign(e, caret);
  },
  _applyRevertedSign: function _applyRevertedSign(e, caret, preserveSelectedText) {
    var newValue = -1 * (0, _common.ensureDefined)(this._parsedValue, null);
    if (this._isValueInRange(newValue) || newValue === 0) {
      this._parsedValue = newValue;
      if (preserveSelectedText) {
        var format = this._getFormatPattern();
        var previousText = this._getInputVal();
        this._setTextByParsedValue();
        e.preventDefault();
        var currentText = this._getInputVal();
        var offset = (0, _number_box.getCaretOffset)(previousText, currentText, format);
        caret = (0, _number_box.getCaretWithOffset)(caret, offset);
        var caretInBoundaries = (0, _number_box.getCaretInBoundaries)(caret, currentText, format);
        this._caret(caretInBoundaries);
      }
    }
  },
  _removeMinusFromText: function _removeMinusFromText(text, caret) {
    var isMinusPressed = this._lastKeyName === MINUS_KEY && text.charAt(caret.start - 1) === MINUS;
    return isMinusPressed ? this._replaceSelectedText(text, {
      start: caret.start - 1,
      end: caret.start
    }, '') : text;
  },
  _setTextByParsedValue: function _setTextByParsedValue() {
    var format = this._getFormatPattern();
    var parsed = this._parseValue();
    var formatted = this._format(parsed, format) || '';
    this._setInputText(formatted);
  },
  _formatValue: function _formatValue(e) {
    var normalizedText = this._getInputVal();
    var caret = this._caret();
    var textWithoutMinus = this._removeMinusFromText(normalizedText, caret);
    var wasMinusRemoved = textWithoutMinus !== normalizedText;
    normalizedText = textWithoutMinus;
    if (!this._isInputFromPaste(e) && this._isValueIncomplete(textWithoutMinus)) {
      this._formattedValue = normalizedText;
      if (wasMinusRemoved) {
        this._setTextByParsedValue();
      }
      return;
    }
    var textWasChanged = _number.default.convertDigits(this._formattedValue, true) !== normalizedText;
    if (textWasChanged) {
      var value = this._tryParse(normalizedText, caret, '');
      if ((0, _type.isDefined)(value)) {
        this._parsedValue = value;
      }
    }
    this._setTextByParsedValue();
  },
  _renderDisplayText: function _renderDisplayText() {
    if (this._useMaskBehavior()) {
      this._toggleEmptinessEventHandler();
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _renderValue: function _renderValue() {
    if (this._useMaskBehavior()) {
      this._parsedValue = this.option('value');
      this._setTextByParsedValue();
    }
    return this.callBase();
  },
  _updateParsedValue: function _updateParsedValue() {
    var inputValue = this._getInputVal();
    this._parsedValue = this._tryParse(inputValue, this._caret());
  },
  _adjustParsedValue: function _adjustParsedValue() {
    if (!this._useMaskBehavior()) {
      return;
    }
    var clearedText = this._removeStubs(this._getInputVal());
    var parsedValue = clearedText ? this._parseValue() : null;
    if (!(0, _type.isNumeric)(parsedValue)) {
      this._parsedValue = parsedValue;
      return;
    }
    this._parsedValue = (0, _math.fitIntoRange)(parsedValue, this.option('min'), this.option('max'));
  },
  _valueChangeEventHandler: function _valueChangeEventHandler(e) {
    if (!this._useMaskBehavior()) {
      return this.callBase(e);
    }
    var caret = this._caret();
    this._saveValueChangeEvent(e);
    this._lastKey = null;
    this._lastKeyName = null;
    this._updateParsedValue();
    this._adjustParsedValue();
    this.option('value', this._parsedValue);
    if (caret) {
      this._caret(caret);
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'format':
      case 'useMaskBehavior':
        this._renderInputType();
        this._updateFormat();
        this._renderFormatter();
        this._renderValue();
        this._refreshValueChangeEvent();
        this._refreshEvents();
        break;
      case 'min':
      case 'max':
        this._adjustParsedValue();
        this.callBase(args);
        break;
      default:
        this.callBase(args);
    }
  },
  _clearCache: function _clearCache() {
    delete this._formattedValue;
    delete this._lastKey;
    delete this._lastKeyName;
    delete this._parsedValue;
    delete this._focusOutOccurs;
    clearTimeout(this._caretTimeout);
    delete this._caretTimeout;
  },
  _clean: function _clean() {
    this._clearCache();
    this.callBase();
  }
});
var _default = NumberBoxMask;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
