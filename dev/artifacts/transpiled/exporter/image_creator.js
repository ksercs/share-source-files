"use strict";

exports.asyncEach = asyncEach;
exports.calcScaledInfo = calcScaledInfo;
exports.getData = getData;
exports.imageCreator = void 0;
exports.testFormats = testFormats;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _color = _interopRequireDefault(require("../color"));
var _type = require("../core/utils/type");
var _svg = require("../core/utils/svg");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _dom = require("../core/utils/dom");
var _window = require("../core/utils/window");
var _inflector = require("../core/utils/inflector");
var _deferred = require("../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
var _math = Math;
var PI = _math.PI;
var _min = _math.min;
var _abs = _math.abs;
var _sqrt = _math.sqrt;
var _pow = _math.pow;
var _atan2 = _math.atan2;
var _cos = _math.cos;
var _sin = _math.sin;
var _number = Number;
var IMAGE_QUALITY = 1;
var TEXT_DECORATION_LINE_WIDTH_COEFF = 0.05;
var DEFAULT_FONT_SIZE = '10px';
var DEFAULT_FONT_FAMILY = 'sans-serif';
var DEFAULT_TEXT_COLOR = '#000';
var parseAttributes;
function getStringFromCanvas(canvas, mimeType) {
  var dataURL = canvas.toDataURL(mimeType, IMAGE_QUALITY);
  var imageData = window.atob(dataURL.substring(('data:' + mimeType + ';base64,').length));
  return imageData;
}
function arcTo(x1, y1, x2, y2, radius, largeArcFlag, clockwise, context) {
  var cBx = (x1 + x2) / 2;
  var cBy = (y1 + y2) / 2;
  var aB = _atan2(y1 - y2, x1 - x2);
  var k = largeArcFlag ? 1 : -1;
  aB += 90 * (PI / 180) * (clockwise ? 1 : -1);
  var opSide = _sqrt(_pow(x2 - x1, 2) + _pow(y2 - y1, 2)) / 2;
  var adjSide = _sqrt(_abs(_pow(radius, 2) - _pow(opSide, 2)));
  var centerX = cBx + k * (adjSide * _cos(aB));
  var centerY = cBy + k * (adjSide * _sin(aB));
  var startAngle = _atan2(y1 - centerY, x1 - centerX);
  var endAngle = _atan2(y2 - centerY, x2 - centerX);
  context.arc(centerX, centerY, radius, startAngle, endAngle, !clockwise);
}
function getElementOptions(element, rootAppended) {
  var attr = parseAttributes(element.attributes || {});
  var options = (0, _extend.extend)({}, attr, {
    text: element.textContent.replace(/\s+/g, ' '),
    textAlign: attr['text-anchor'] === 'middle' ? 'center' : attr['text-anchor']
  });
  var transform = attr.transform;
  var coords;
  if (transform) {
    coords = transform.match(/translate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/);
    if (coords) {
      coords = coords[0].match(/-*\d+([.]\d+)*/g);
      options.translateX = _number(coords[0]);
      options.translateY = coords[1] ? _number(coords[1]) : 0;
    }
    coords = transform.match(/rotate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*,*\s*-*\d+([.]\d+)*)*/);
    if (coords) {
      coords = coords[0].match(/-*\d+([.]\d+)*/g);
      options.rotationAngle = _number(coords[0]);
      options.rotationX = coords[1] && _number(coords[1]);
      options.rotationY = coords[2] && _number(coords[2]);
    }
    coords = transform.match(/scale\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/);
    if (coords) {
      coords = coords[0].match(/-*\d+([.]\d+)*/g);
      options.scaleX = _number(coords[0]);
      if (coords.length > 1) {
        options.scaleY = _number(coords[1]);
      } else {
        options.scaleY = options.scaleX;
      }
    }
  }
  parseStyles(element, options, rootAppended);
  return options;
}
function drawRect(context, options) {
  var x = options.x;
  var y = options.y;
  var width = options.width;
  var height = options.height;
  var cornerRadius = options.rx;
  if (!cornerRadius) {
    context.rect(x, y, width, height);
  } else {
    cornerRadius = _min(cornerRadius, width / 2, height / 2);
    context.save();
    context.translate(x, y);
    context.moveTo(width / 2, 0);
    context.arcTo(width, 0, width, height, cornerRadius);
    context.arcTo(width, height, 0, height, cornerRadius);
    context.arcTo(0, height, 0, 0, cornerRadius);
    context.arcTo(0, 0, cornerRadius, 0, cornerRadius);
    context.lineTo(width / 2, 0);
    context.restore();
  }
}
function drawImage(context, options, shared) {
  var d = new _deferred.Deferred();
  var image = new window.Image();
  image.onload = function () {
    context.save();
    context.globalAlpha = options.globalAlpha;
    transformElement(context, options);
    clipElement(context, options, shared);
    context.drawImage(image, options.x || 0, options.y || 0, options.width, options.height);
    context.restore();
    d.resolve();
  };
  image.onerror = function () {
    d.resolve();
  };
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = options['href'] || options['xlink:href'];
  return d;
}
function drawPath(context, dAttr) {
  var dArray = dAttr.replace(/,/g, ' ').split(/([A-Z])/i).filter(function (item) {
    return item.trim() !== '';
  });
  var i = 0;
  var params;
  var prevParams;
  var prevParamsLen;
  do {
    params = (dArray[i + 1] || '').trim().split(' ');
    switch (dArray[i]) {
      case 'M':
        context.moveTo(_number(params[0]), _number(params[1]));
        i += 2;
        break;
      case 'L':
        for (var j = 0; j < params.length / 2; j++) {
          context.lineTo(_number(params[j * 2]), _number(params[j * 2 + 1]));
        }
        i += 2;
        break;
      case 'C':
        context.bezierCurveTo(_number(params[0]), _number(params[1]), _number(params[2]), _number(params[3]), _number(params[4]), _number(params[5]));
        i += 2;
        break;
      case 'a':
        prevParams = dArray[i - 1].trim().split(' ');
        prevParamsLen = prevParams.length - 1;
        arcTo(_number(prevParams[prevParamsLen - 1]), _number(prevParams[prevParamsLen]), _number(prevParams[prevParamsLen - 1]) + _number(params[5]), _number(prevParams[prevParamsLen]) + _number(params[6]), _number(params[0]), _number(params[3]), _number(params[4]), context);
        i += 2;
        break;
      case 'A':
        prevParams = dArray[i - 1].trim().split(' ');
        prevParamsLen = prevParams.length - 1;
        arcTo(_number(prevParams[prevParamsLen - 1]), _number(prevParams[prevParamsLen]), _number(params[5]), _number(params[6]), _number(params[0]), _number(params[3]), _number(params[4]), context);
        i += 2;
        break;
      case 'Z':
        context.closePath();
        i += 1;
        break;
      default:
        i++;
    }
  } while (i < dArray.length);
}
function parseStyles(element, options, rootAppended) {
  var style = element.style || {};
  var field;
  for (field in style) {
    if (style[field] !== '') {
      options[(0, _inflector.camelize)(field)] = style[field];
    }
  }
  if (rootAppended && _dom_adapter.default.isElementNode(element)) {
    style = window.getComputedStyle(element);
    ['fill', 'stroke', 'stroke-width', 'font-family', 'font-size', 'font-style', 'font-weight'].forEach(function (prop) {
      if (prop in style && style[prop] !== '') {
        options[(0, _inflector.camelize)(prop)] = style[prop];
      }
    });
    ['opacity', 'fill-opacity', 'stroke-opacity'].forEach(function (prop) {
      if (prop in style && style[prop] !== '' && style[prop] !== '1') {
        options[prop] = _number(style[prop]);
      }
    });
  }
  options.textDecoration = options.textDecoration || options.textDecorationLine;
  options.globalAlpha = (0, _type.isDefined)(options.opacity) ? options.opacity : options.globalAlpha;
}
function parseUrl(urlString) {
  var matches = urlString && urlString.match(/url\(.*#(.*?)["']?\)/i);
  return matches && matches[1];
}
function setFontStyle(context, options) {
  var fontParams = [];
  options.fontSize = options.fontSize || DEFAULT_FONT_SIZE;
  options.fontFamily = options.fontFamily || DEFAULT_FONT_FAMILY;
  options.fill = options.fill || DEFAULT_TEXT_COLOR;
  options.fontStyle && fontParams.push(options.fontStyle);
  options.fontWeight && fontParams.push(options.fontWeight);
  fontParams.push(options.fontSize);
  fontParams.push(options.fontFamily);
  context.font = fontParams.join(' ');
  context.textAlign = options.textAlign;
  context.fillStyle = options.fill;
  context.globalAlpha = options.globalAlpha;
}
function drawText(context, options, shared) {
  setFontStyle(context, options);
  applyFilter(context, options, shared);
  options.text && context.fillText(options.text, options.x || 0, options.y || 0);
  strokeElement(context, options, true);
  drawTextDecoration(context, options, shared);
}
function drawTextDecoration(context, options, shared) {
  if (!options.textDecoration || options.textDecoration === 'none') {
    return;
  }
  var x = options.x;
  var textWidth = context.measureText(options.text).width;
  var textHeight = parseInt(options.fontSize, 10);
  var lineHeight = textHeight * TEXT_DECORATION_LINE_WIDTH_COEFF < 1 ? 1 : textHeight * TEXT_DECORATION_LINE_WIDTH_COEFF;
  var y = options.y;
  switch (options.textDecoration) {
    case 'line-through':
      y -= textHeight / 3 + lineHeight / 2;
      break;
    case 'overline':
      y -= textHeight - lineHeight;
      break;
    case 'underline':
      y += lineHeight;
      break;
  }
  context.rect(x, y, textWidth, lineHeight);
  fillElement(context, options, shared);
  strokeElement(context, options);
}
function aggregateOpacity(options) {
  options.strokeOpacity = options['stroke-opacity'] !== undefined ? options['stroke-opacity'] : 1;
  options.fillOpacity = options['fill-opacity'] !== undefined ? options['fill-opacity'] : 1;
  if (options.opacity !== undefined) {
    options.strokeOpacity *= options.opacity;
    options.fillOpacity *= options.opacity;
  }
}
function hasTspan(element) {
  var nodes = element.childNodes;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === 'tspan') {
      return true;
    }
  }
  return false;
}
function drawTextElement(childNodes, context, options, shared) {
  var lines = [];
  var line;
  var offset = 0;
  for (var i = 0; i < childNodes.length; i++) {
    var element = childNodes[i];
    if (element.tagName === undefined) {
      drawElement(element, context, options, shared);
    } else if (element.tagName === 'tspan' || element.tagName === 'text') {
      var elementOptions = getElementOptions(element, shared.rootAppended);
      var mergedOptions = (0, _extend.extend)({}, options, elementOptions);
      if (element.tagName === 'tspan' && hasTspan(element)) {
        drawTextElement(element.childNodes, context, mergedOptions, shared);
        continue;
      }
      mergedOptions.textAlign = 'start';
      if (!line || elementOptions.x !== undefined) {
        line = {
          elements: [],
          options: [],
          widths: [],
          offsets: []
        };
        lines.push(line);
      }
      if (elementOptions.y !== undefined) {
        offset = 0;
      }
      if (elementOptions.dy !== undefined) {
        offset += parseFloat(elementOptions.dy);
      }
      line.elements.push(element);
      line.options.push(mergedOptions);
      line.offsets.push(offset);
      setFontStyle(context, mergedOptions);
      line.widths.push(context.measureText(mergedOptions.text).width);
    }
  }
  lines.forEach(function (line) {
    var commonWidth = line.widths.reduce(function (commonWidth, width) {
      return commonWidth + width;
    }, 0);
    var xDiff = 0;
    var currentOffset = 0;
    if (options.textAlign === 'center') {
      xDiff = commonWidth / 2;
    }
    if (options.textAlign === 'end') {
      xDiff = commonWidth;
    }
    line.options.forEach(function (o, index) {
      var width = line.widths[index];
      o.x = o.x - xDiff + currentOffset;
      o.y += line.offsets[index];
      currentOffset += width;
    });
    line.elements.forEach(function (element, index) {
      drawTextElement(element.childNodes, context, line.options[index], shared);
    });
  });
}
function drawElement(element, context, parentOptions, shared) {
  var tagName = element.tagName;
  var isText = tagName === 'text' || tagName === 'tspan' || tagName === undefined;
  var isImage = tagName === 'image';
  var isComment = element.nodeType === 8;
  var options = (0, _extend.extend)({}, parentOptions, getElementOptions(element, shared.rootAppended));
  if (options.visibility === 'hidden' || options[_svg.HIDDEN_FOR_EXPORT] || isComment) {
    return;
  }
  context.save();
  !isImage && transformElement(context, options);
  clipElement(context, options, shared);
  aggregateOpacity(options);
  var promise;
  context.beginPath();
  switch (element.tagName) {
    case undefined:
      drawText(context, options, shared);
      break;
    case 'text':
    case 'tspan':
      drawTextElement(element.childNodes, context, options, shared);
      break;
    case 'image':
      promise = drawImage(context, options, shared);
      break;
    case 'path':
      drawPath(context, options.d);
      break;
    case 'rect':
      drawRect(context, options);
      context.closePath(); // for valid clipping
      break;
    case 'circle':
      context.arc(options.cx, options.cy, options.r, 0, 2 * PI, 1);
      break;
  }
  if (!isText) {
    applyFilter(context, options, shared);
    if (!isImage) {
      promise = fillElement(context, options, shared);
    }
    strokeElement(context, options);
  }
  applyGradient(context, options, shared, element, 'linear');
  applyGradient(context, options, shared, element, 'radial');
  context.restore();
  return promise;
}
function applyGradient(context, options, _ref, element, type) {
  var linearGradients = _ref.linearGradients,
    radialGradients = _ref.radialGradients;
  var gradients = type === 'linear' ? linearGradients : radialGradients;
  if (Object.keys(gradients).length === 0) {
    return;
  }
  var id = parseUrl(options.fill);
  if (id && gradients[id]) {
    var box = element.getBBox();
    var horizontalCenter = box.x + box.width / 2;
    var verticalCenter = box.y + box.height / 2;
    var maxRadius = Math.max(box.height / 2, box.width / 2);
    var gradient = type === 'linear' ? context.createLinearGradient(box.x, 0, box.x + box.width, 0) : context.createRadialGradient(horizontalCenter, verticalCenter, 0, horizontalCenter, verticalCenter, maxRadius);
    gradients[id].colors.forEach(function (opt) {
      var offset = parseInt(opt.offset.replace(/%/, ''));
      gradient.addColorStop(offset / 100, opt.stopColor);
    });
    if (type === 'linear') {
      var _ref2, _gradients$id$transfo;
      var angle = (_ref2 = ((_gradients$id$transfo = gradients[id].transform) === null || _gradients$id$transfo === void 0 ? void 0 : _gradients$id$transfo.replace(/\D/g, '')) * Math.PI / 180) !== null && _ref2 !== void 0 ? _ref2 : 0;
      context.translate(horizontalCenter, verticalCenter);
      context.rotate(angle);
      context.translate(-horizontalCenter, -verticalCenter);
    }
    context.globalAlpha = options.opacity;
    context.fillStyle = gradient;
    context.fill();
  }
}
function applyFilter(context, options, shared) {
  var filterOptions;
  var id = parseUrl(options.filter);
  if (id) {
    filterOptions = shared.filters[id];
    if (!filterOptions) {
      filterOptions = {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: '#000'
      };
    }
    context.shadowOffsetX = filterOptions.offsetX;
    context.shadowOffsetY = filterOptions.offsetY;
    context.shadowColor = filterOptions.color;
    context.shadowBlur = filterOptions.blur;
  }
}

// translate and clip are the special attributtes, they should not be inherited by child nodes
function transformElement(context, options) {
  context.translate(options.translateX || 0, options.translateY || 0);
  options.translateX = undefined;
  options.translateY = undefined;
  if (options.rotationAngle) {
    context.translate(options.rotationX || 0, options.rotationY || 0);
    context.rotate(options.rotationAngle * PI / 180);
    context.translate(-(options.rotationX || 0), -(options.rotationY || 0));
    options.rotationAngle = undefined;
    options.rotationX = undefined;
    options.rotationY = undefined;
  }
  if (isFinite(options.scaleX)) {
    context.scale(options.scaleX, options.scaleY);
    options.scaleX = undefined;
    options.scaleY = undefined;
  }
}
function clipElement(context, options, shared) {
  if (options['clip-path']) {
    drawElement(shared.clipPaths[parseUrl(options['clip-path'])], context, {}, shared);
    context.clip();
    options['clip-path'] = undefined;
  }
}
function hex2rgba(hexColor, alpha) {
  var color = new _color.default(hexColor);
  return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')';
}
function createGradient(element) {
  var _element$attributes$g;
  var options = {
    colors: [],
    transform: (_element$attributes$g = element.attributes.gradientTransform) === null || _element$attributes$g === void 0 ? void 0 : _element$attributes$g.textContent
  };
  (0, _iterator.each)(element.childNodes, function (_, _ref3) {
    var attributes = _ref3.attributes;
    options.colors.push({
      offset: attributes.offset.value,
      stopColor: attributes['stop-color'].value
    });
  });
  return options;
}
function createFilter(element) {
  var color;
  var opacity;
  var filterOptions = {};
  (0, _iterator.each)(element.childNodes, function (_, node) {
    var attr = node.attributes;
    if (!attr.result) {
      return;
    }
    switch (attr.result.value) {
      case 'gaussianBlurResult':
        filterOptions.blur = _number(attr.stdDeviation.value);
        break;
      case 'offsetResult':
        filterOptions.offsetX = _number(attr.dx.value);
        filterOptions.offsetY = _number(attr.dy.value);
        break;
      case 'floodResult':
        color = attr['flood-color'] ? attr['flood-color'].value : '#000';
        opacity = attr['flood-opacity'] ? attr['flood-opacity'].value : 1;
        filterOptions.color = hex2rgba(color, opacity);
        break;
    }
  });
  return filterOptions;
}
function asyncEach(array, callback) {
  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _deferred.Deferred();
  var i = 0;
  for (; i < array.length; i++) {
    var result = callback(array[i]);
    if ((0, _type.isPromise)(result)) {
      result.then(function () {
        asyncEach(Array.prototype.slice.call(array, i + 1), callback, d);
      });
      break;
    }
  }
  if (i === array.length) {
    d.resolve();
  }
  return d;
}

///#DEBUG

///#ENDDEBUG

function drawCanvasElements(elements, context, parentOptions, shared) {
  return asyncEach(elements, function (element) {
    switch (element.tagName && element.tagName.toLowerCase()) {
      case 'g':
      case 'svg':
        {
          var options = (0, _extend.extend)({}, parentOptions, getElementOptions(element, shared.rootAppended));
          context.save();
          transformElement(context, options);
          clipElement(context, options, shared);
          var onDone = function onDone() {
            context.restore();
          };
          var promise = drawCanvasElements(element.childNodes, context, options, shared);
          if ((0, _type.isPromise)(promise)) {
            promise.then(onDone);
          } else {
            onDone();
          }
          return promise;
        }
      case 'defs':
        return drawCanvasElements(element.childNodes, context, {}, shared);
      case 'clippath':
        shared.clipPaths[element.attributes.id.textContent] = element.childNodes[0];
        break;
      case 'pattern':
        shared.patterns[element.attributes.id.textContent] = element;
        break;
      case 'filter':
        shared.filters[element.id] = createFilter(element);
        break;
      case 'lineargradient':
        shared.linearGradients[element.attributes.id.textContent] = createGradient(element);
        break;
      case 'radialgradient':
        shared.radialGradients[element.attributes.id.textContent] = createGradient(element);
        break;
      default:
        return drawElement(element, context, parentOptions, shared);
    }
  });
}
function setLineDash(context, options) {
  var matches = options['stroke-dasharray'] && options['stroke-dasharray'].match(/(\d+)/g);
  if (matches && matches.length) {
    matches = (0, _iterator.map)(matches, function (item) {
      return _number(item);
    });
    context.setLineDash(matches);
  }
}
function strokeElement(context, options, isText) {
  var stroke = options.stroke;
  if (stroke && stroke !== 'none' && options['stroke-width'] !== 0) {
    setLineDash(context, options);
    context.lineJoin = options['stroke-linejoin'];
    context.lineWidth = options['stroke-width'];
    context.globalAlpha = options.strokeOpacity;
    context.strokeStyle = stroke;
    isText ? context.strokeText(options.text, options.x, options.y) : context.stroke();
    context.globalAlpha = 1;
  }
}
function getPattern(context, pattern, shared, parentOptions) {
  var options = getElementOptions(pattern, shared.rootAppended);
  var patternCanvas = imageCreator._createCanvas(options.width, options.height, 0);
  var patternContext = patternCanvas.getContext('2d');
  var promise = drawCanvasElements(pattern.childNodes, patternContext, options, shared);
  var onDone = function onDone() {
    context.fillStyle = context.createPattern(patternCanvas, 'repeat');
    context.globalAlpha = parentOptions.fillOpacity;
    context.fill();
    context.globalAlpha = 1;
  };
  if ((0, _type.isPromise)(promise)) {
    promise.then(onDone);
  } else {
    onDone();
  }
  return promise;
}
function fillElement(context, options, shared) {
  var fill = options.fill;
  var promise;
  if (fill && fill !== 'none') {
    if (fill.search(/url/) === -1) {
      context.fillStyle = fill;
      context.globalAlpha = options.fillOpacity;
      context.fill();
      context.globalAlpha = 1;
    } else {
      var pattern = shared.patterns[parseUrl(fill)];
      if (!pattern) {
        return;
      }
      promise = getPattern(context, pattern, shared, options);
    }
  }
  return promise;
}
parseAttributes = function parseAttributes(attributes) {
  var newAttributes = {};
  var attr;
  (0, _iterator.each)(attributes, function (index, item) {
    attr = item.textContent;
    if (isFinite(attr)) {
      attr = _number(attr);
    }
    newAttributes[item.name.toLowerCase()] = attr; // lowerCase for Edge
  });

  return newAttributes;
};
function drawBackground(context, width, height, backgroundColor, margin) {
  context.fillStyle = backgroundColor || '#ffffff';
  context.fillRect(-margin, -margin, width + margin * 2, height + margin * 2);
}
function createInvisibleDiv() {
  var invisibleDiv = _dom_adapter.default.createElement('div');
  invisibleDiv.style.left = '-9999px';
  invisibleDiv.style.position = 'absolute';
  return invisibleDiv;
}
function convertSvgToCanvas(svg, canvas, rootAppended) {
  return drawCanvasElements(svg.childNodes, canvas.getContext('2d'), {}, {
    clipPaths: {},
    patterns: {},
    filters: {},
    linearGradients: {},
    radialGradients: {},
    rootAppended
  });
}
function getCanvasFromSvg(markup, _ref4) {
  var width = _ref4.width,
    height = _ref4.height,
    backgroundColor = _ref4.backgroundColor,
    margin = _ref4.margin,
    _ref4$svgToCanvas = _ref4.svgToCanvas,
    svgToCanvas = _ref4$svgToCanvas === void 0 ? convertSvgToCanvas : _ref4$svgToCanvas;
  var scaledScreenInfo = calcScaledInfo(width, height);
  var canvas = imageCreator._createCanvas(scaledScreenInfo.width, scaledScreenInfo.height, margin);
  var context = canvas.getContext('2d');
  context.setTransform(scaledScreenInfo.pixelRatio, 0, 0, scaledScreenInfo.pixelRatio, 0, 0);
  var svgElem = (0, _svg.getSvgElement)(markup);
  var invisibleDiv;
  var markupIsDomElement = _dom_adapter.default.isElementNode(markup);
  context.translate(margin, margin);
  _dom_adapter.default.getBody().appendChild(canvas);
  if (!markupIsDomElement) {
    invisibleDiv = createInvisibleDiv();
    invisibleDiv.appendChild(svgElem);
    _dom_adapter.default.getBody().appendChild(invisibleDiv);
  }
  // for rtl mode
  if (svgElem.attributes.direction) {
    canvas.dir = svgElem.attributes.direction.textContent;
  }
  drawBackground(context, width, height, backgroundColor, margin);
  return (0, _deferred.fromPromise)(svgToCanvas(svgElem, canvas, markupIsDomElement && (0, _dom.contains)(_dom_adapter.default.getBody(), markup))).then(function () {
    return canvas;
  }).always(function () {
    invisibleDiv && _dom_adapter.default.getBody().removeChild(invisibleDiv);
    _dom_adapter.default.getBody().removeChild(canvas);
  });
}
var imageCreator = {
  getImageData: function getImageData(markup, options) {
    var mimeType = 'image/' + options.format;
    // Injection for testing T403049
    if ((0, _type.isFunction)(options.__parseAttributesFn)) {
      parseAttributes = options.__parseAttributesFn;
    }
    return getCanvasFromSvg(markup, options).then(function (canvas) {
      return getStringFromCanvas(canvas, mimeType);
    });
  },
  getData: function getData(markup, options) {
    var that = this;
    return imageCreator.getImageData(markup, options).then(function (binaryData) {
      var mimeType = 'image/' + options.format;
      var data = (0, _type.isFunction)(window.Blob) && !options.useBase64 ? that._getBlob(binaryData, mimeType) : that._getBase64(binaryData);
      return data;
    });
  },
  _getBlob: function _getBlob(binaryData, mimeType) {
    var i;
    var dataArray = new Uint8Array(binaryData.length);
    for (i = 0; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    return new window.Blob([dataArray.buffer], {
      type: mimeType
    });
  },
  _getBase64: function _getBase64(binaryData) {
    return window.btoa(binaryData);
  },
  _createCanvas(width, height, margin) {
    var canvas = (0, _renderer.default)('<canvas>')[0];
    canvas.width = width + margin * 2;
    canvas.height = height + margin * 2;
    canvas.hidden = true;
    return canvas;
  }
};
exports.imageCreator = imageCreator;
function getData(data, options) {
  return imageCreator.getData(data, options);
}
function testFormats(formats) {
  var canvas = imageCreator._createCanvas(100, 100, 0);
  return formats.reduce(function (r, f) {
    var mimeType = ('image/' + f).toLowerCase();
    if (canvas.toDataURL(mimeType).indexOf(mimeType) !== -1) {
      r.supported.push(f);
    } else {
      r.unsupported.push(f);
    }
    return r;
  }, {
    supported: [],
    unsupported: []
  });
}
function calcScaledInfo(width, height) {
  var pixelRatio = window.devicePixelRatio || 1;
  return {
    pixelRatio,
    width: width * pixelRatio,
    height: height * pixelRatio
  };
}