"use strict";

exports.concatPaths = void 0;
exports.convertToLayoutManagerOptions = convertToLayoutManagerOptions;
exports.tryGetTabPath = exports.isFullPathContainsTabs = exports.isEqualToDataFieldOrNameOrTitleOrCaption = exports.getTextWithoutSpaces = exports.getOptionNameFromFullName = exports.getItemPath = exports.getFullOptionName = exports.createItemPathByIndex = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var createItemPathByIndex = function createItemPathByIndex(index, isTabs) {
  return "".concat(isTabs ? 'tabs' : 'items', "[").concat(index, "]");
};
exports.createItemPathByIndex = createItemPathByIndex;
var concatPaths = function concatPaths(path1, path2) {
  if ((0, _type.isDefined)(path1) && (0, _type.isDefined)(path2)) {
    return "".concat(path1, ".").concat(path2);
  }
  return path1 || path2;
};
exports.concatPaths = concatPaths;
var getTextWithoutSpaces = function getTextWithoutSpaces(text) {
  return text ? text.replace(/\s/g, '') : undefined;
};
exports.getTextWithoutSpaces = getTextWithoutSpaces;
var isEqualToDataFieldOrNameOrTitleOrCaption = function isEqualToDataFieldOrNameOrTitleOrCaption(item, fieldName) {
  if (item) {
    return item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || item.itemType === 'group' && getTextWithoutSpaces(item.caption) === fieldName;
  }
  return false;
};
exports.isEqualToDataFieldOrNameOrTitleOrCaption = isEqualToDataFieldOrNameOrTitleOrCaption;
var getFullOptionName = function getFullOptionName(path, optionName) {
  return "".concat(path, ".").concat(optionName);
};
exports.getFullOptionName = getFullOptionName;
var getOptionNameFromFullName = function getOptionNameFromFullName(fullName) {
  var parts = fullName.split('.');
  return parts[parts.length - 1].replace(/\[\d+]/, '');
};
exports.getOptionNameFromFullName = getOptionNameFromFullName;
var tryGetTabPath = function tryGetTabPath(fullPath) {
  var pathParts = fullPath.split('.');
  var resultPathParts = _toConsumableArray(pathParts);
  for (var i = pathParts.length - 1; i >= 0; i--) {
    if (isFullPathContainsTabs(pathParts[i])) {
      return resultPathParts.join('.');
    }
    resultPathParts.splice(i, 1);
  }
  return '';
};
exports.tryGetTabPath = tryGetTabPath;
var isFullPathContainsTabs = function isFullPathContainsTabs(fullPath) {
  return fullPath.indexOf('tabs') > -1;
};
exports.isFullPathContainsTabs = isFullPathContainsTabs;
var getItemPath = function getItemPath(items, item, isTabs) {
  var index = items.indexOf(item);
  if (index > -1) {
    return createItemPathByIndex(index, isTabs);
  }
  for (var i = 0; i < items.length; i++) {
    var targetItem = items[i];
    var tabOrGroupItems = targetItem.tabs || targetItem.items;
    if (tabOrGroupItems) {
      var itemPath = getItemPath(tabOrGroupItems, item, targetItem.tabs);
      if (itemPath) {
        return concatPaths(createItemPathByIndex(i, isTabs), itemPath);
      }
    }
  }
};
exports.getItemPath = getItemPath;
function convertToLayoutManagerOptions(_ref) {
  var form = _ref.form,
    $formElement = _ref.$formElement,
    formOptions = _ref.formOptions,
    items = _ref.items,
    validationGroup = _ref.validationGroup,
    extendedLayoutManagerOptions = _ref.extendedLayoutManagerOptions,
    onFieldDataChanged = _ref.onFieldDataChanged,
    onContentReady = _ref.onContentReady,
    onDisposing = _ref.onDisposing,
    onFieldItemRendered = _ref.onFieldItemRendered;
  var baseOptions = {
    form: form,
    items,
    $formElement,
    validationGroup,
    onFieldDataChanged,
    onContentReady,
    onDisposing,
    onFieldItemRendered,
    validationBoundary: formOptions.scrollingEnabled ? $formElement : undefined,
    scrollingEnabled: formOptions.scrollingEnabled,
    showRequiredMark: formOptions.showRequiredMark,
    showOptionalMark: formOptions.showOptionalMark,
    requiredMark: formOptions.requiredMark,
    optionalMark: formOptions.optionalMark,
    requiredMessage: formOptions.requiredMessage,
    screenByWidth: formOptions.screenByWidth,
    layoutData: formOptions.formData,
    labelLocation: formOptions.labelLocation,
    customizeItem: formOptions.customizeItem,
    minColWidth: formOptions.minColWidth,
    showColonAfterLabel: formOptions.showColonAfterLabel,
    onEditorEnterKey: formOptions.onEditorEnterKey,
    labelMode: formOptions.labelMode
  };

  // cannot use '=' because 'extend' makes special assingment
  var result = (0, _extend.extend)(baseOptions, {
    isRoot: extendedLayoutManagerOptions.isRoot,
    colCount: extendedLayoutManagerOptions.colCount,
    alignItemLabels: extendedLayoutManagerOptions.alignItemLabels,
    cssItemClass: extendedLayoutManagerOptions.cssItemClass,
    colCountByScreen: extendedLayoutManagerOptions.colCountByScreen,
    onLayoutChanged: extendedLayoutManagerOptions.onLayoutChanged,
    width: extendedLayoutManagerOptions.width
  });
  return result;
}