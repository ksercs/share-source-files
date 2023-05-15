!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/renderer_base.js"], ["./element_data","./dom_adapter","./utils/window","./utils/type","./utils/style","./utils/size","./utils/html_parser"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/renderer_base.js", ["./element_data", "./dom_adapter", "./utils/window", "./utils/type", "./utils/style", "./utils/size", "./utils/html_parser"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _element_data = $__require("./element_data");
  var _dom_adapter = _interopRequireDefault($__require("./dom_adapter"));
  var _window = $__require("./utils/window");
  var _type = $__require("./utils/type");
  var _style = $__require("./utils/style");
  var _size = $__require("./utils/size");
  var _html_parser = $__require("./utils/html_parser");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var renderer;
  var initRender = function initRender(selector, context) {
    if (!selector) {
      this.length = 0;
      return this;
    }
    if (typeof selector === 'string') {
      if (selector === 'body') {
        this[0] = context ? context.body : _dom_adapter.default.getBody();
        this.length = 1;
        return this;
      }
      context = context || _dom_adapter.default.getDocument();
      if (selector[0] === '<') {
        this[0] = _dom_adapter.default.createElement(selector.slice(1, -1), context);
        this.length = 1;
        return this;
      }
      [].push.apply(this, _dom_adapter.default.querySelectorAll(context, selector));
      return this;
    } else if (_dom_adapter.default.isNode(selector) || (0, _type.isWindow)(selector)) {
      this[0] = selector;
      this.length = 1;
      return this;
    } else if (Array.isArray(selector)) {
      [].push.apply(this, selector);
      return this;
    }
    return renderer(selector.toArray ? selector.toArray() : [selector]);
  };
  renderer = function renderer(selector, context) {
    return new initRender(selector, context);
  };
  renderer.fn = {
    dxRenderer: true
  };
  initRender.prototype = renderer.fn;
  var repeatMethod = function repeatMethod(methodName, args) {
    for (var i = 0; i < this.length; i++) {
      var item = renderer(this[i]);
      item[methodName].apply(item, args);
    }
    return this;
  };
  var setAttributeValue = function setAttributeValue(element, attrName, value) {
    if (value !== undefined && value !== null && value !== false) {
      _dom_adapter.default.setAttribute(element, attrName, value);
    } else {
      _dom_adapter.default.removeAttribute(element, attrName);
    }
  };
  initRender.prototype.show = function () {
    return this.toggle(true);
  };
  initRender.prototype.hide = function () {
    return this.toggle(false);
  };
  initRender.prototype.toggle = function (value) {
    if (this[0]) {
      this.toggleClass('dx-state-invisible', !value);
    }
    return this;
  };
  initRender.prototype.attr = function (attrName, value) {
    if (this.length > 1 && arguments.length > 1) return repeatMethod.call(this, 'attr', arguments);
    if (!this[0]) {
      if ((0, _type.isObject)(attrName) || value !== undefined) {
        return this;
      } else {
        return undefined;
      }
    }
    if (!this[0].getAttribute) {
      return this.prop(attrName, value);
    }
    if (typeof attrName === 'string' && arguments.length === 1) {
      var result = this[0].getAttribute(attrName);
      return result == null ? undefined : result;
    } else if ((0, _type.isPlainObject)(attrName)) {
      for (var key in attrName) {
        this.attr(key, attrName[key]);
      }
    } else {
      setAttributeValue(this[0], attrName, value);
    }
    return this;
  };
  initRender.prototype.removeAttr = function (attrName) {
    this[0] && _dom_adapter.default.removeAttribute(this[0], attrName);
    return this;
  };
  initRender.prototype.prop = function (propName, value) {
    if (!this[0]) return this;
    if (typeof propName === 'string' && arguments.length === 1) {
      return this[0][propName];
    } else if ((0, _type.isPlainObject)(propName)) {
      for (var key in propName) {
        this.prop(key, propName[key]);
      }
    } else {
      _dom_adapter.default.setProperty(this[0], propName, value);
    }
    return this;
  };
  initRender.prototype.addClass = function (className) {
    return this.toggleClass(className, true);
  };
  initRender.prototype.removeClass = function (className) {
    return this.toggleClass(className, false);
  };
  initRender.prototype.hasClass = function (className) {
    if (!this[0] || this[0].className === undefined) return false;
    var classNames = className.split(' ');
    for (var i = 0; i < classNames.length; i++) {
      if (this[0].classList) {
        if (this[0].classList.contains(classNames[i])) return true;
      } else {
        // IE9
        var _className = (0, _type.isString)(this[0].className) ? this[0].className : _dom_adapter.default.getAttribute(this[0], 'class');
        if ((_className || '').split(' ').indexOf(classNames[i]) >= 0) return true;
      }
    }
    return false;
  };
  initRender.prototype.toggleClass = function (className, value) {
    if (this.length > 1) {
      return repeatMethod.call(this, 'toggleClass', arguments);
    }
    if (!this[0] || !className) return this;
    value = value === undefined ? !this.hasClass(className) : value;
    var classNames = className.split(' ');
    for (var i = 0; i < classNames.length; i++) {
      _dom_adapter.default.setClass(this[0], classNames[i], value);
    }
    return this;
  };
  initRender.prototype.html = function (value) {
    if (!arguments.length) {
      return this[0].innerHTML;
    }
    this.empty();
    if (typeof value === 'string' && !(0, _html_parser.isTablePart)(value) || typeof value === 'number') {
      this[0].innerHTML = value;
      return this;
    }
    return this.append((0, _html_parser.parseHTML)(value));
  };
  var appendElements = function appendElements(element, nextSibling) {
    if (!this[0] || !element) return;
    if (typeof element === 'string') {
      element = (0, _html_parser.parseHTML)(element);
    } else if (element.nodeType) {
      element = [element];
    } else if ((0, _type.isNumeric)(element)) {
      element = [_dom_adapter.default.createTextNode(element)];
    }
    for (var i = 0; i < element.length; i++) {
      var item = element[i];
      var container = this[0];
      var wrapTR = container.tagName === 'TABLE' && item.tagName === 'TR';
      if (wrapTR && container.tBodies && container.tBodies.length) {
        container = container.tBodies[0];
      }
      _dom_adapter.default.insertElement(container, item.nodeType ? item : item[0], nextSibling);
    }
  };
  var setCss = function setCss(name, value) {
    if (!this[0] || !this[0].style) return;
    if (value === null || typeof value === 'number' && isNaN(value)) {
      return;
    }
    name = (0, _style.styleProp)(name);
    for (var i = 0; i < this.length; i++) {
      this[i].style[name] = (0, _style.normalizeStyleProp)(name, value);
    }
  };
  initRender.prototype.css = function (name, value) {
    if ((0, _type.isString)(name)) {
      if (arguments.length === 2) {
        setCss.call(this, name, value);
      } else {
        if (!this[0]) return;
        name = (0, _style.styleProp)(name);
        var result = window.getComputedStyle(this[0])[name] || this[0].style[name];
        return (0, _type.isNumeric)(result) ? result.toString() : result;
      }
    } else if ((0, _type.isPlainObject)(name)) {
      for (var key in name) {
        setCss.call(this, key, name[key]);
      }
    }
    return this;
  };
  initRender.prototype.prepend = function (element) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.prepend(arguments[i]);
      }
      return this;
    }
    appendElements.apply(this, [element, this[0].firstChild]);
    return this;
  };
  initRender.prototype.append = function (element) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.append(arguments[i]);
      }
      return this;
    }
    appendElements.apply(this, [element]);
    return this;
  };
  initRender.prototype.prependTo = function (element) {
    if (this.length > 1) {
      for (var i = this.length - 1; i >= 0; i--) {
        renderer(this[i]).prependTo(element);
      }
      return this;
    }
    element = renderer(element);
    if (element[0]) {
      _dom_adapter.default.insertElement(element[0], this[0], element[0].firstChild);
    }
    return this;
  };
  initRender.prototype.appendTo = function (element) {
    if (this.length > 1) {
      return repeatMethod.call(this, 'appendTo', arguments);
    }
    _dom_adapter.default.insertElement(renderer(element)[0], this[0]);
    return this;
  };
  initRender.prototype.insertBefore = function (element) {
    if (element && element[0]) {
      _dom_adapter.default.insertElement(element[0].parentNode, this[0], element[0]);
    }
    return this;
  };
  initRender.prototype.insertAfter = function (element) {
    if (element && element[0]) {
      _dom_adapter.default.insertElement(element[0].parentNode, this[0], element[0].nextSibling);
    }
    return this;
  };
  initRender.prototype.before = function (element) {
    if (this[0]) {
      _dom_adapter.default.insertElement(this[0].parentNode, element[0], this[0]);
    }
    return this;
  };
  initRender.prototype.after = function (element) {
    if (this[0]) {
      _dom_adapter.default.insertElement(this[0].parentNode, element[0], this[0].nextSibling);
    }
    return this;
  };
  initRender.prototype.wrap = function (wrapper) {
    if (this[0]) {
      var wrap = renderer(wrapper);
      wrap.insertBefore(this);
      wrap.append(this);
    }
    return this;
  };
  initRender.prototype.wrapInner = function (wrapper) {
    var contents = this.contents();
    if (contents.length) {
      contents.wrap(wrapper);
    } else {
      this.append(wrapper);
    }
    return this;
  };
  initRender.prototype.replaceWith = function (element) {
    if (!(element && element[0])) return;
    if (element.is(this)) return this;
    element.insertBefore(this);
    this.remove();
    return element;
  };
  initRender.prototype.remove = function () {
    if (this.length > 1) {
      return repeatMethod.call(this, 'remove', arguments);
    }
    (0, _element_data.cleanDataRecursive)(this[0], true);
    _dom_adapter.default.removeElement(this[0]);
    return this;
  };
  initRender.prototype.detach = function () {
    if (this.length > 1) {
      return repeatMethod.call(this, 'detach', arguments);
    }
    _dom_adapter.default.removeElement(this[0]);
    return this;
  };
  initRender.prototype.empty = function () {
    if (this.length > 1) {
      return repeatMethod.call(this, 'empty', arguments);
    }
    (0, _element_data.cleanDataRecursive)(this[0]);
    _dom_adapter.default.setText(this[0], '');
    return this;
  };
  initRender.prototype.clone = function () {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      result.push(this[i].cloneNode(true));
    }
    return renderer(result);
  };
  initRender.prototype.text = function (value) {
    if (!arguments.length) {
      var result = '';
      for (var i = 0; i < this.length; i++) {
        result += this[i] && this[i].textContent || '';
      }
      return result;
    }
    var text = (0, _type.isFunction)(value) ? value() : value;
    (0, _element_data.cleanDataRecursive)(this[0], false);
    _dom_adapter.default.setText(this[0], (0, _type.isDefined)(text) ? text : '');
    return this;
  };
  initRender.prototype.val = function (value) {
    if (arguments.length === 1) {
      return this.prop('value', (0, _type.isDefined)(value) ? value : '');
    }
    return this.prop('value');
  };
  initRender.prototype.contents = function () {
    if (!this[0]) return renderer();
    var result = [];
    result.push.apply(result, this[0].childNodes);
    return renderer(result);
  };
  initRender.prototype.find = function (selector) {
    var result = renderer();
    if (!selector) {
      return result;
    }
    var nodes = [];
    var i;
    if (typeof selector === 'string') {
      selector = selector.trim();
      for (i = 0; i < this.length; i++) {
        var element = this[i];
        if (_dom_adapter.default.isElementNode(element)) {
          var elementId = element.getAttribute('id');
          var queryId = elementId || 'dx-query-children';
          if (!elementId) {
            setAttributeValue(element, 'id', queryId);
          }
          queryId = '[id=\'' + queryId + '\'] ';
          var querySelector = queryId + selector.replace(/([^\\])(,)/g, '$1, ' + queryId);
          nodes.push.apply(nodes, _dom_adapter.default.querySelectorAll(element, querySelector));
          setAttributeValue(element, 'id', elementId);
        } else if (_dom_adapter.default.isDocument(element) || _dom_adapter.default.isDocumentFragment(element)) {
          nodes.push.apply(nodes, _dom_adapter.default.querySelectorAll(element, selector));
        }
      }
    } else {
      for (i = 0; i < this.length; i++) {
        selector = _dom_adapter.default.isNode(selector) ? selector : selector[0];
        if (this[i] !== selector && this[i].contains(selector)) {
          nodes.push(selector);
        }
      }
    }
    return result.add(nodes);
  };
  var isVisible = function isVisible(_, element) {
    var _element$host;
    element = (_element$host = element.host) !== null && _element$host !== void 0 ? _element$host : element;
    if (!element.nodeType) return true;
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  };
  initRender.prototype.filter = function (selector) {
    if (!selector) return renderer();
    if (selector === ':visible') {
      return this.filter(isVisible);
    } else if (selector === ':hidden') {
      return this.filter(function (_, element) {
        return !isVisible(_, element);
      });
    }
    var result = [];
    for (var i = 0; i < this.length; i++) {
      var item = this[i];
      if (_dom_adapter.default.isElementNode(item) && (0, _type.type)(selector) === 'string') {
        _dom_adapter.default.elementMatches(item, selector) && result.push(item);
      } else if (_dom_adapter.default.isNode(selector) || (0, _type.isWindow)(selector)) {
        selector === item && result.push(item);
      } else if ((0, _type.isFunction)(selector)) {
        selector.call(item, i, item) && result.push(item);
      } else {
        for (var j = 0; j < selector.length; j++) {
          selector[j] === item && result.push(item);
        }
      }
    }
    return renderer(result);
  };
  initRender.prototype.not = function (selector) {
    var result = [];
    var nodes = this.filter(selector).toArray();
    for (var i = 0; i < this.length; i++) {
      if (nodes.indexOf(this[i]) === -1) {
        result.push(this[i]);
      }
    }
    return renderer(result);
  };
  initRender.prototype.is = function (selector) {
    return !!this.filter(selector).length;
  };
  initRender.prototype.children = function (selector) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      var nodes = this[i] ? this[i].childNodes : [];
      for (var j = 0; j < nodes.length; j++) {
        if (_dom_adapter.default.isElementNode(nodes[j])) {
          result.push(nodes[j]);
        }
      }
    }
    result = renderer(result);
    return selector ? result.filter(selector) : result;
  };
  initRender.prototype.siblings = function () {
    var element = this[0];
    if (!element || !element.parentNode) {
      return renderer();
    }
    var result = [];
    var parentChildNodes = element.parentNode.childNodes || [];
    for (var i = 0; i < parentChildNodes.length; i++) {
      var node = parentChildNodes[i];
      if (_dom_adapter.default.isElementNode(node) && node !== element) {
        result.push(node);
      }
    }
    return renderer(result);
  };
  initRender.prototype.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
      if (callback.call(this[i], i, this[i]) === false) {
        break;
      }
    }
  };
  initRender.prototype.index = function (element) {
    if (!element) {
      return this.parent().children().index(this);
    }
    element = renderer(element);
    return this.toArray().indexOf(element[0]);
  };
  initRender.prototype.get = function (index) {
    return this[index < 0 ? this.length + index : index];
  };
  initRender.prototype.eq = function (index) {
    index = index < 0 ? this.length + index : index;
    return renderer(this[index]);
  };
  initRender.prototype.first = function () {
    return this.eq(0);
  };
  initRender.prototype.last = function () {
    return this.eq(-1);
  };
  initRender.prototype.select = function () {
    for (var i = 0; i < this.length; i += 1) {
      this[i].select && this[i].select();
    }
    return this;
  };
  initRender.prototype.parent = function (selector) {
    if (!this[0]) return renderer();
    var result = renderer(this[0].parentNode);
    return !selector || result.is(selector) ? result : renderer();
  };
  initRender.prototype.parents = function (selector) {
    var result = [];
    var parent = this.parent();
    while (parent && parent[0] && !_dom_adapter.default.isDocument(parent[0])) {
      if (_dom_adapter.default.isElementNode(parent[0])) {
        if (!selector || parent.is(selector)) {
          result.push(parent.get(0));
        }
      }
      parent = parent.parent();
    }
    return renderer(result);
  };
  initRender.prototype.closest = function (selector) {
    if (this.is(selector)) {
      return this;
    }
    var parent = this.parent();
    while (parent && parent.length) {
      if (parent.is(selector)) {
        return parent;
      }
      parent = parent.parent();
    }
    return renderer();
  };
  initRender.prototype.next = function (selector) {
    if (!this[0]) return renderer();
    var next = renderer(this[0].nextSibling);
    if (!arguments.length) {
      return next;
    }
    while (next && next.length) {
      if (next.is(selector)) return next;
      next = next.next();
    }
    return renderer();
  };
  initRender.prototype.prev = function () {
    if (!this[0]) return renderer();
    return renderer(this[0].previousSibling);
  };
  initRender.prototype.add = function (selector) {
    var targets = renderer(selector);
    var result = this.toArray();
    for (var i = 0; i < targets.length; i++) {
      var target = targets[i];
      if (result.indexOf(target) === -1) {
        result.push(target);
      }
    }
    return renderer(result);
  };
  var emptyArray = [];
  initRender.prototype.splice = function () {
    return renderer(emptyArray.splice.apply(this, arguments));
  };
  initRender.prototype.slice = function () {
    return renderer(emptyArray.slice.apply(this, arguments));
  };
  initRender.prototype.toArray = function () {
    return emptyArray.slice.call(this);
  };
  initRender.prototype.offset = function () {
    if (!this[0]) return;
    return (0, _size.getOffset)(this[0]);
  };
  initRender.prototype.offsetParent = function () {
    if (!this[0]) return renderer();
    var offsetParent = renderer(this[0].offsetParent);
    while (offsetParent[0] && offsetParent.css('position') === 'static') {
      offsetParent = renderer(offsetParent[0].offsetParent);
    }
    offsetParent = offsetParent[0] ? offsetParent : renderer(_dom_adapter.default.getDocumentElement());
    return offsetParent;
  };
  initRender.prototype.position = function () {
    if (!this[0]) return;
    var offset;
    var marginTop = parseFloat(this.css('marginTop'));
    var marginLeft = parseFloat(this.css('marginLeft'));
    if (this.css('position') === 'fixed') {
      offset = this[0].getBoundingClientRect();
      return {
        top: offset.top - marginTop,
        left: offset.left - marginLeft
      };
    }
    offset = this.offset();
    var offsetParent = this.offsetParent();
    var parentOffset = {
      top: 0,
      left: 0
    };
    if (offsetParent[0].nodeName !== 'HTML') {
      parentOffset = offsetParent.offset();
    }
    parentOffset = {
      top: parentOffset.top + parseFloat(offsetParent.css('borderTopWidth')),
      left: parentOffset.left + parseFloat(offsetParent.css('borderLeftWidth'))
    };
    return {
      top: offset.top - parentOffset.top - marginTop,
      left: offset.left - parentOffset.left - marginLeft
    };
  };
  [{
    name: 'scrollLeft',
    offsetProp: 'pageXOffset',
    scrollWindow: function scrollWindow(win, value) {
      win.scrollTo(value, win.pageYOffset);
    }
  }, {
    name: 'scrollTop',
    offsetProp: 'pageYOffset',
    scrollWindow: function scrollWindow(win, value) {
      win.scrollTo(win.pageXOffset, value);
    }
  }].forEach(function (directionStrategy) {
    var propName = directionStrategy.name;
    initRender.prototype[propName] = function (value) {
      if (!this[0]) {
        return;
      }
      var window = (0, _size.getWindowByElement)(this[0]);
      if (value === undefined) {
        return window ? window[directionStrategy.offsetProp] : this[0][propName];
      }
      if (window) {
        directionStrategy.scrollWindow(window, value);
      } else {
        this[0][propName] = value;
      }
      return this;
    };
  });
  initRender.prototype.data = function (key, value) {
    if (!this[0]) return;
    if (arguments.length < 2) {
      return _element_data.data.call(renderer, this[0], key);
    }
    _element_data.data.call(renderer, this[0], key, value);
    return this;
  };
  initRender.prototype.removeData = function (key) {
    this[0] && (0, _element_data.removeData)(this[0], key);
    return this;
  };
  var rendererWrapper = function rendererWrapper() {
    return renderer.apply(this, arguments);
  };
  Object.defineProperty(rendererWrapper, 'fn', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return renderer.fn;
    },
    set: function set(value) {
      renderer.fn = value;
    }
  });
  var _default = {
    set: function set(strategy) {
      renderer = strategy;
    },
    get: function get() {
      return rendererWrapper;
    }
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./element_data","./dom_adapter","./utils/window","./utils/type","./utils/style","./utils/size","./utils/html_parser"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./element_data"), require("./dom_adapter"), require("./utils/window"), require("./utils/type"), require("./utils/style"), require("./utils/size"), require("./utils/html_parser"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=renderer_base.js.map