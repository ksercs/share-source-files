"use strict";

exports.encodeHtml = void 0;
exports.format = format;
exports.replaceAll = exports.quadToObject = exports.isEmpty = void 0;
var _type = require("./type");
var encodeHtml = function () {
  var encodeRegExp = [new RegExp('&', 'g'), new RegExp('"', 'g'), new RegExp('\'', 'g'), new RegExp('<', 'g'), new RegExp('>', 'g')];
  return function (str) {
    return String(str).replace(encodeRegExp[0], '&amp;').replace(encodeRegExp[1], '&quot;').replace(encodeRegExp[2], '&#39;').replace(encodeRegExp[3], '&lt;').replace(encodeRegExp[4], '&gt;');
  };
}();
exports.encodeHtml = encodeHtml;
var splitQuad = function splitQuad(raw) {
  switch (typeof raw) {
    case 'string':
      return raw.split(/\s+/, 4);
    case 'object':
      return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];
    case 'number':
      return [raw];
    default:
      return raw;
  }
};
var quadToObject = function quadToObject(raw) {
  var quad = splitQuad(raw);
  var left = parseInt(quad && quad[0], 10);
  var top = parseInt(quad && quad[1], 10);
  var right = parseInt(quad && quad[2], 10);
  var bottom = parseInt(quad && quad[3], 10);
  if (!isFinite(left)) {
    left = 0;
  }
  if (!isFinite(top)) {
    top = left;
  }
  if (!isFinite(right)) {
    right = left;
  }
  if (!isFinite(bottom)) {
    bottom = top;
  }
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
};
exports.quadToObject = quadToObject;
function format(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if ((0, _type.isFunction)(template)) {
    return template.apply(void 0, values);
  }
  values.forEach(function (value, index) {
    if ((0, _type.isString)(value)) {
      value = value.replace(/\$/g, '$$$$');
    }
    var placeholderReg = new RegExp('\\{' + index + '\\}', 'gm');
    template = template.replace(placeholderReg, value);
  });
  return template;
}
var replaceAll = function () {
  var quote = function quote(str) {
    return (str + '').replace(/([+*?.[^\]$(){}><|=!:])/g, '\\$1'); // lgtm[js/incomplete-sanitization]
  };

  return function (text, searchToken, replacementToken) {
    return text.replace(new RegExp('(' + quote(searchToken) + ')', 'gi'), replacementToken);
  };
}();
exports.replaceAll = replaceAll;
var isEmpty = function () {
  var SPACE_REGEXP = /\s/g;
  return function (text) {
    return !text || !text.replace(SPACE_REGEXP, '');
  };
}();
exports.isEmpty = isEmpty;