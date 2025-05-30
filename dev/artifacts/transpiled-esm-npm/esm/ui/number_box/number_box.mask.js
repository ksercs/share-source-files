import eventsEngine from '../../events/core/events_engine';
import { extend } from '../../core/utils/extend';
import { isNumeric, isDefined, isFunction, isString } from '../../core/utils/type';
import devices from '../../core/devices';
import { fitIntoRange, inRange } from '../../core/utils/math';
import number from '../../localization/number';
import { getCaretWithOffset, isCaretInBoundaries, getCaretInBoundaries, getCaretBoundaries, getCaretAfterFormat, getCaretOffset } from './number_box.caret';
import { getFormat as getLDMLFormat } from '../../localization/ldml/number';
import NumberBoxBase from './number_box.base';
import { addNamespace, getChar, normalizeKeyName, isCommandKeyPressed } from '../../events/utils/index';
import { ensureDefined, escapeRegExp } from '../../core/utils/common';
import { getRealSeparatorIndex, getNthOccurrence, splitByIndex, adjustPercentValue } from './utils';
var NUMBER_FORMATTER_NAMESPACE = 'dxNumberFormatter';
var MOVE_FORWARD = 1;
var MOVE_BACKWARD = -1;
var MINUS = '-';
var MINUS_KEY = 'minus';
var INPUT_EVENT = 'input';
var CARET_TIMEOUT_DURATION = 0;
var NumberBoxMask = NumberBoxBase.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
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
    return extend(this.callBase(), {
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
    var decimalSeparator = number.getDecimalSeparator();
    var realSeparatorOccurrenceIndex = getRealSeparatorIndex(this.option('format')).occurrence;
    return getNthOccurrence(text, decimalSeparator, realSeparatorOccurrenceIndex);
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
        eventsEngine.trigger(this._input(), 'change');
      }
    }
  },
  _arrowHandler: function _arrowHandler(step, e) {
    if (!this._useMaskBehavior()) {
      return;
    }
    var text = this._getInputVal();
    var format = this._getFormatPattern();
    var nextCaret = getCaretWithOffset(this._caret(), step);
    if (!isCaretInBoundaries(nextCaret, text, format)) {
      nextCaret = step === MOVE_FORWARD ? nextCaret.end : nextCaret.start;
      e.preventDefault();
      this._caret(getCaretInBoundaries(nextCaret, text, format));
    }
  },
  _moveCaretToBoundary: function _moveCaretToBoundary(direction) {
    var boundaries = getCaretBoundaries(this._getInputVal(), this._getFormatPattern());
    var newCaret = getCaretWithOffset(direction === MOVE_FORWARD ? boundaries.start : boundaries.end, 0);
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
    var decimalSeparator = number.getDecimalSeparator();
    var isDecimalSeparatorNext = text.charAt(caret.end) === decimalSeparator;
    var moveToFloat = (this._lastKey === decimalSeparator || this._lastKey === '.' || this._lastKey === ',') && isDecimalSeparatorNext;
    return moveToFloat;
  },
  _getInputVal: function _getInputVal() {
    return number.convertDigits(this._input().val(), true);
  },
  _keyboardHandler: function _keyboardHandler(e) {
    this.clearCaretTimeout();
    this._lastKey = number.convertDigits(getChar(e), true);
    this._lastKeyName = normalizeKeyName(e);
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
    this._lastKey = getChar(e);
    this._lastKeyName = normalizeKeyName(e);
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
          eventsEngine.trigger(this._input(), 'input');
        }
      }
      e.preventDefault();
      return;
    }
    var decimalSeparator = number.getDecimalSeparator();
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
    var isCustomParser = isFunction(formatOption.parser);
    var parser = isCustomParser ? formatOption.parser : number.parse;
    var integerPartStartIndex = 0;
    if (!isCustomParser) {
      var formatPointIndex = getRealSeparatorIndex(format).index;
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
    var formatter = isFunction(customFormatter) ? customFormatter : number.format;
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
    var format = this.option('format');
    var isCustomParser = isFunction(format === null || format === void 0 ? void 0 : format.parser);
    var isLDMLPattern = isString(format) && (format.indexOf('0') >= 0 || format.indexOf('#') >= 0);
    var isExponentialFormat = format === 'exponential' || (format === null || format === void 0 ? void 0 : format.type) === 'exponential';
    var shouldUseFormatAsIs = isCustomParser || isLDMLPattern || isExponentialFormat;
    this._currentFormat = shouldUseFormatAsIs ? format : getLDMLFormat(value => {
      var text = this._format(value, format);
      return number.convertDigits(text, true);
    });
  },
  _getFormatForSign: function _getFormatForSign(text) {
    var format = this._getFormatPattern();
    if (isString(format)) {
      var signParts = format.split(';');
      var sign = number.getSign(text, format);
      signParts[1] = signParts[1] || '-' + signParts[0];
      return sign < 0 ? signParts[1] : signParts[0];
    } else {
      var _sign = number.getSign(text);
      return _sign < 0 ? '-' : '';
    }
  },
  _removeStubs: function _removeStubs(text, excludeComma) {
    var format = this._getFormatForSign(text);
    var thousandsSeparator = number.getThousandsSeparator();
    var stubs = this._getStubs(format);
    var result = text;
    if (stubs.length) {
      var prefixStubs = stubs[0];
      var postfixRegex = new RegExp('(' + escapeRegExp(stubs[1] || '') + ')$', 'g');
      var decoratorsRegex = new RegExp('[-' + escapeRegExp(excludeComma ? '' : thousandsSeparator) + ']', 'g');
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
    if (isDefined(value)) {
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
    var decimalSeparator = number.getDecimalSeparator();
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
    return !format.parser && this._isPercentFormat() ? adjustPercentValue(parsedValue, maxPrecision) : parsedValue;
  },
  _getParsedValue: function _getParsedValue(text, format) {
    var sign = number.getSign(text, (format === null || format === void 0 ? void 0 : format.formatter) || format);
    var textWithoutStubs = this._removeStubs(text, true);
    var parsedValue = this._parse(textWithoutStubs, format);
    var parsedValueSign = parsedValue < 0 ? -1 : 1;
    var parsedValueWithSign = isNumeric(parsedValue) && sign !== parsedValueSign ? sign * parsedValue : parsedValue;
    return parsedValueWithSign;
  },
  _isValueIncomplete: function _isValueIncomplete(text) {
    if (!this._useMaskBehavior()) {
      return this.callBase(text);
    }
    var caret = this._caret();
    var point = number.getDecimalSeparator();
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
    var isPrecisionInRange = isCustomParser ? true : inRange(floatLength, precision.min, precision.max);
    var endsWithZero = textParts[1].charAt(floatLength - 1) === '0';
    return isPrecisionInRange && (endsWithZero || !floatLength);
  },
  _isValueInRange: function _isValueInRange(value) {
    var min = ensureDefined(this.option('min'), -Infinity);
    var max = ensureDefined(this.option('max'), Infinity);
    return inRange(value, min, max);
  },
  _setInputText: function _setInputText(text) {
    var normalizedText = number.convertDigits(text, true);
    var newCaret = getCaretAfterFormat(this._getInputVal(), normalizedText, this._caret(), this._getFormatPattern());
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
    var isDesktop = devices.real().deviceType === 'desktop';
    if (this._useMaskBehavior() && isNumberType) {
      this._setInputType(isDesktop || this._isSupportInputMode() ? 'text' : 'tel');
    } else {
      this.callBase();
    }
  },
  _isChar: function _isChar(str) {
    return isString(str) && str.length === 1;
  },
  _moveCaret: function _moveCaret(offset) {
    if (!offset) {
      return;
    }
    var newCaret = getCaretWithOffset(this._caret(), offset);
    var adjustedCaret = getCaretInBoundaries(newCaret, this._getInputVal(), this._getFormatPattern());
    this._caret(adjustedCaret);
  },
  _shouldHandleKey: function _shouldHandleKey(e) {
    var keyName = normalizeKeyName(e);
    var isSpecialChar = isCommandKeyPressed(e) || e.altKey || e.shiftKey || !this._isChar(keyName);
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
    eventsEngine.off(this._input(), '.' + NUMBER_FORMATTER_NAMESPACE);
  },
  _isInputFromPaste: function _isInputFromPaste(e) {
    var inputType = e.originalEvent && e.originalEvent.inputType;
    if (isDefined(inputType)) {
      return inputType === 'insertFromPaste';
    } else {
      return this._isValuePasted;
    }
  },
  _attachFormatterEvents: function _attachFormatterEvents() {
    var $input = this._input();
    eventsEngine.on($input, addNamespace(INPUT_EVENT, NUMBER_FORMATTER_NAMESPACE), function (e) {
      this._formatValue(e);
      this._isValuePasted = false;
    }.bind(this));
    eventsEngine.on($input, addNamespace('dxclick', NUMBER_FORMATTER_NAMESPACE), function () {
      if (!this._caretTimeout) {
        this._caretTimeout = setTimeout(function () {
          this._caretTimeout = undefined;
          this._caret(getCaretInBoundaries(this._caret(), this._getInputVal(), this._getFormatPattern()));
        }.bind(this), CARET_TIMEOUT_DURATION);
      }
    }.bind(this));
    eventsEngine.on($input, 'dxdblclick', function () {
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
    var escapedDecimalSeparator = escapeRegExp(number.getDecimalSeparator());
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
    var realSeparatorIndex = getRealSeparatorIndex(currentFormat).index;
    var floatPart = (splitByIndex(currentFormat, realSeparatorIndex)[1] || '').replace(/[^#0]/g, '');
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
      if (normalizeKeyName(e) === MINUS_KEY) {
        this._applyRevertedSign(e, caret, true);
        return;
      } else {
        this._caret(getCaretInBoundaries(0, this._getInputVal(), this._getFormatPattern()));
      }
    }
    this._applyRevertedSign(e, caret);
  },
  _applyRevertedSign: function _applyRevertedSign(e, caret, preserveSelectedText) {
    var newValue = -1 * ensureDefined(this._parsedValue, null);
    if (this._isValueInRange(newValue) || newValue === 0) {
      this._parsedValue = newValue;
      if (preserveSelectedText) {
        var format = this._getFormatPattern();
        var previousText = this._getInputVal();
        this._setTextByParsedValue();
        e.preventDefault();
        var currentText = this._getInputVal();
        var offset = getCaretOffset(previousText, currentText, format);
        caret = getCaretWithOffset(caret, offset);
        var caretInBoundaries = getCaretInBoundaries(caret, currentText, format);
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
    var textWasChanged = number.convertDigits(this._formattedValue, true) !== normalizedText;
    if (textWasChanged) {
      var value = this._tryParse(normalizedText, caret, '');
      if (isDefined(value)) {
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
    if (!isNumeric(parsedValue)) {
      this._parsedValue = parsedValue;
      return;
    }
    this._parsedValue = fitIntoRange(parsedValue, this.option('min'), this.option('max'));
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
export default NumberBoxMask;