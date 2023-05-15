!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/vizMocks.js"], ["jquery","viz/core/tooltip","viz/core/title","viz/components/legend","viz/axes/base_axis","viz/series/points/base_point","viz/series/base_series","viz/core/loading_indicator","viz/core/export","viz/core/renderers/renderer","viz/core/errors_warnings","viz/core/base_widget","viz/core/base_widget.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/helpers/vizMocks.js", ["require", "exports", "module", "jquery", "viz/core/tooltip", "viz/core/title", "viz/components/legend", "viz/axes/base_axis", "viz/series/points/base_point", "viz/series/base_series", "viz/core/loading_indicator", "viz/core/export", "viz/core/renderers/renderer", "viz/core/errors_warnings", "viz/core/base_widget", "viz/core/base_widget.utils"], function(require, exports, module) {
      root.vizMocks = module.exports = factory(require('jquery'), require('viz/core/tooltip'), require('viz/core/title'), require('viz/components/legend'), require('viz/axes/base_axis'), require('viz/series/points/base_point'), require('viz/series/base_series').Series, require('viz/core/loading_indicator'), require('viz/core/export'), require('viz/core/renderers/renderer'), require('viz/core/errors_warnings'), require('viz/core/base_widget'), require('viz/core/base_widget.utils'));
    });
  } else {
    root.vizMocks = factory(jQuery, DevExpress.require('viz/core/tooltip'), DevExpress.require('viz/core/title'), DevExpress.require('viz/components/legend'), DevExpress.require('viz/axes/base_axis'), DevExpress.require('viz/series/points/base_point'), DevExpress.require('viz/series/base_series').Series, DevExpress.require('viz/core/loading_indicator'), DevExpress.require('viz/core/export'), DevExpress.require('viz/core/renderers/renderer'), DevExpress.require('viz/core/errors_warnings'), DevExpress.require('base_widget'), DevExpress.require('viz/core/base_widget.utils'));
  }
}(window, function($, tooltipModule, titleModule, legendModule, axisModule, pointModule, Series, loadingIndicatorModule, exportMenuModule, rendererModule, errors, baseWidgetModule, baseWidgetUtils) {
  const Element = stubClass(rendererModule.SvgElement, {
    attr: function(attrs) {
      if (typeof attrs === 'string') {
        if (attrs.indexOf('scale') !== -1) {
          return this._stored_settings[attrs] || 1;
        }
        return this._stored_settings[attrs] === undefined ? 0 : this._stored_settings[attrs];
      }
      for (const key in attrs) {
        this._stored_settings[key] = attrs[key];
      }
      return this;
    },
    smartAttr: function(attrs) {
      return this.attr(attrs);
    },
    applyEllipsis: function(maxWidth) {
      return maxWidth < 50;
    },
    setMaxSize: function(maxWidth) {
      return {textChanged: maxWidth < 50};
    },
    stopAnimation: function() {
      return this;
    },
    css: function(css) {
      for (const key in css) {
        this._stored_styles[key] = css[key];
      }
      return this;
    },
    append: function(parent) {
      !parent.children && (parent.children = []);
      parent.children.push(this);
      this.parent = parent;
      return this;
    },
    clear: function() {
      this.children.length = 0;
      for (let i = 0; i < this.children.length; i++) {
        this.children.parent = null;
      }
      return this;
    },
    remove: function() {
      if (this.parent) {
        for (let i = this.parent.children.length - 1; i >= 0; i--) {
          if (this.parent.children[i] === this) {
            this.parent.children.splice(i, 1);
          }
        }
      }
      this.parent = null;
      return this;
    },
    getBBox: function() {
      const template = $.isFunction(this.renderer.bBoxTemplate) ? this.renderer.bBoxTemplate.call(this) : this.renderer.bBoxTemplate;
      return $.extend({}, template);
    },
    dispose: function() {
      this.clear();
      this.remove();
      $(this.element).remove();
    },
    on: function() {
      $(this.element).on.apply($(this.element), arguments);
      return this;
    },
    off: function(a1, a2, a3) {
      $(this.element).off.apply($(this.element), arguments);
      return this;
    },
    trigger: function(a1, a2, a3) {
      $(this.element).trigger.apply($(this.element), arguments);
      return this;
    },
    restoreText: function() {}
  }, {
    $constructor: function() {
      this.children = [];
      this._stored_settings = {};
      this._stored_styles = {};
      this.element = document.createElement('svg');
      this.element.getScreenCTM = function() {
        return [0, 1, 1, 0, 210, 240];
      };
      this.element.createSVGPoint = function() {
        return {matrixTransform: function() {
            return {
              x: 3,
              y: 5
            };
          }};
      };
      this.element.addEventListener = function() {};
      this.element.removeEventListener = function() {};
    },
    $thisReturnFunctions: ['toBackground', 'sharp', 'rotate', 'enableLinks', 'virtualLink', 'linkOn', 'linkOff', 'linkAppend', 'linkRemove', 'data', 'animate']
  });
  let patternCounter = 0;
  let elementCounter = 0;
  const createMockElement = function(renderer, nodeType, params) {
    const elem = new Element();
    elem.__id = elementCounter++;
    elem.renderer = renderer;
    elem.typeOfNode = nodeType;
    $.extend(elem._stored_settings, params);
    if (nodeType === 'pattern') {
      elem.id = 'pattern.id' + patternCounter++;
    }
    if (nodeType === 'shadowFilter') {
      elem.id = 'shadowFilter.id';
    }
    if (nodeType === 'clipRect') {
      elem.id = 'clipRect.id' + patternCounter++;
    }
    if (nodeType === 'brightFilter') {
      elem.id = 'some_bright_ref';
    }
    return elem;
  };
  const Renderer = stubClass(rendererModule.Renderer, {
    animationEnabled: function() {
      return true;
    },
    arc: function(x, y, innerRadius, outerRadius, startAngle, endAngle) {
      return createMockElement(this, 'arc', {
        x: x,
        y: y,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        startAngle: startAngle,
        endAngle: endAngle
      });
    },
    g: function() {
      return createMockElement(this, 'group');
    },
    text: function(text, x, y) {
      return createMockElement(this, 'text', {
        text: text,
        x: x,
        y: y
      });
    },
    rect: function(x, y, width, height) {
      return createMockElement(this, 'rect', {
        x: x,
        y: y,
        width: width,
        height: height
      });
    },
    simpleRect: function() {
      return createMockElement(this, 'rect');
    },
    path: function(points, type) {
      return createMockElement(this, 'path', {
        points: points,
        type: type
      });
    },
    circle: function(x, y, r) {
      return createMockElement(this, 'circle', {
        cx: x,
        cy: y,
        r: r
      });
    },
    image: function(x, y, w, h, href, location) {
      return createMockElement(this, 'image', {
        x: x,
        y: y,
        width: w,
        height: h,
        location: location
      });
    },
    pattern: function(color, hatching) {
      return createMockElement(this, 'pattern', {
        color: color,
        hatching: hatching
      });
    },
    shadowFilter: function(x, y, width, height, dx, dy, blur, color, opacity) {
      return createMockElement(this, 'shadowFilter', {
        x: x,
        y: y,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        blur: blur,
        color: color,
        opacity: opacity
      });
    },
    clipRect: function(x, y, width, height) {
      return createMockElement(this, 'clipRect', {
        x: x,
        y: y,
        width: width,
        height: height
      });
    },
    dispose: function() {
      this.root.dispose();
    },
    svg: function() {
      return '';
    },
    getRootOffset: function() {
      return this.offsetTemplate || {
        left: 3,
        top: 5
      };
    },
    brightFilter: function() {
      return createMockElement(this, 'brightFilter');
    },
    linearGradient: function(colors, id, rotationAngle) {
      return createMockElement(this, 'linearGradient', {
        color: colors,
        rotationAngle: rotationAngle,
        id: id
      });
    },
    radialGradient: function(colors, id) {
      return createMockElement(this, 'linearGradient', {
        color: colors,
        id: id
      });
    },
    customPattern: function(id, template, width, height) {
      return createMockElement(this, 'pattern', {
        id: id,
        template: template,
        width: width,
        height: height
      });
    }
  }, {
    $constructor: function(options) {
      this._options = options;
      this.root = createMockElement(this, 'root');
      this.bBoxTemplate = {
        x: 1,
        y: 2,
        height: 10,
        width: 20
      };
    },
    $thisReturnFunctions: ['resize', 'draw', 'clear']
  });
  const dxErrors = errors.ERROR_MESSAGES;
  function ObjectPool(ctor) {
    const that = this;
    this.ctor = ctor;
    this.stubIndex = 0;
    this.returnValues = [];
    this.getItem = function() {
      let stub;
      const oldStub = this.returnValues[this.stubIndex];
      if (this.returnValues[this.stubIndex]) {
        stub = this._resetStub(oldStub);
      } else {
        stub = sinon.createStubInstance(this.ctor);
        this.returnValues.push(stub);
      }
      this.stubIndex++;
      return stub;
    };
    this._resetStub = function(stub) {
      $.each(stub, function(key, value) {
        if ($.isFunction(value && value.reset)) {
          value.reset();
          $.isFunction(value.resetBehavior) && value.resetBehavior();
        } else {
          stub[key] = undefined;
        }
      });
      return stub;
    };
    this.resetIndex = function() {
      that.stubIndex = 0;
    };
    const wrapCtor = function() {
      return that.getItem();
    };
    wrapCtor.resetIndex = this.resetIndex;
    wrapCtor.returnValues = this.returnValues;
    wrapCtor.toString = function() {
      return 'object pool';
    };
    return wrapCtor;
  }
  function incidentOccurred() {
    return sinon.spy(function(idError, options, notValidParameter) {
      const error = dxErrors[idError];
      if (!error) {
        currentAssert().ok(false, 'incidentOccurred Mock error. not find idError' + idError);
        return;
      }
      if (notValidParameter !== undefined) {
        currentAssert().ok(false, 'incidentOccurred Mock error. Pass more two parameters. use array for pass array parameters');
      }
    });
  }
  function stubIncidentOccurredCreation() {
    baseWidgetUtils.DEBUG_stub_createIncidentOccurred(incidentOccurred);
  }
  function restoreIncidentOccurredCreation() {
    baseWidgetUtils.DEBUG_restore_createIncidentOccurred();
  }
  function wrapObject(target, items) {
    const originalItems = $.extend({}, target);
    $.extend(target, items);
    target.__restore = function() {
      delete this.__restore;
      $.each(target, function(name) {
        delete target[name];
      });
      $.extend(target, originalItems);
    };
  }
  function stubClass(target, members, settings) {
    const _members = $.extend({}, members);
    settings = settings || {};
    proto.prototype = typeof target === 'function' ? target.prototype : target;
    const stubPrototype = stub.prototype = new proto();
    $.each(stubPrototype, function(name, member) {
      if (typeof member === 'function' && name !== 'constructor') {
        stubPrototype[name] = function() {
          createStub(this, name);
          return this[name].apply(this, arguments);
        };
      }
    });
    settings.$extraFunctions && $.each(settings.$extraFunctions, function(_, name) {
      _members[name] = 'name' in _members ? _members[name] : function() {};
    });
    settings.$thisReturnFunctions && $.each(settings.$thisReturnFunctions, function(_, name) {
      _members[name] = 'name' in _members ? _members[name] : function() {
        return this;
      };
    });
    settings.$forceStubs && (function() {
      const $constructor = settings.$constructor;
      settings.$constructor = function() {
        const instance = this;
        $constructor && $constructor.apply(instance, arguments);
        $.each(settings.$forceStubs, function(_, name) {
          instance.stub(name);
        });
      };
    }());
    $.each(_members, function(name, member) {
      if (typeof member === 'function' && name !== 'constructor') {
        stubPrototype[name] = function() {
          createStub(this, name);
          return this[name].apply(this, arguments);
        };
      } else if (name !== 'constructor') {
        stubPrototype[name] = member;
      }
    });
    stubPrototype.stub = function(name) {
      if (this.__stubs[name] === undefined) {
        if (typeof stubPrototype[name] === 'function' && name !== 'constructor') {
          createStub(this, name);
        } else {
          this.__stubs[name] = null;
        }
      }
      return this.__stubs[name];
    };
    function stub() {
      this.__stubs = {};
      this.ctorArgs = $.makeArray(arguments);
      settings.$constructor && settings.$constructor.apply(this, arguments);
      stub.called && stub.called(this);
    }
    function proto() {
      this.constructor = stub;
    }
    function createStub(instance, name) {
      instance[name] = instance.__stubs[name] = typeof _members[name] === 'function' ? sinon.spy(_members[name]) : sinon.stub();
    }
    return stub;
  }
  const getClass = function($element) {
    return $element.attr('class');
  };
  function environmentMethodInvoker(name, defaultResult) {
    return function() {
      const method = currentTest()[name];
      if (method) {
        return method.apply(this, arguments);
      } else if (typeof defaultResult === 'function') {
        return defaultResult.apply(this, arguments);
      } else {
        return defaultResult;
      }
    };
  }
  function forceThemeOptions(themeManager) {
    themeManager.setCallback.lastCall.args[0]();
  }
  function spyUponProtectedMethod(target, methodName) {
    let spy = null;
    if (typeof target['TEST' + methodName] === 'function') {
      spy = target[methodName] = sinon.spy();
    } else {
      throw new Error('The protected must also be defined as \'TEST_someMethod\' within the target.');
    }
    return spy;
  }
  return {
    Element: Element,
    Renderer: Renderer,
    LoadingIndicator: stubClass(loadingIndicatorModule.LoadingIndicator),
    ExportMenu: stubClass(exportMenuModule.ExportMenu),
    Point: stubClass(pointModule.Point),
    Series: stubClass(Series),
    Legend: stubClass(legendModule.Legend),
    Title: stubClass(titleModule.Title),
    Tooltip: stubClass(tooltipModule.Tooltip),
    Axis: stubClass(axisModule.Axis),
    incidentOccurred: incidentOccurred,
    stubIncidentOccurredCreation: stubIncidentOccurredCreation,
    restoreIncidentOccurredCreation: restoreIncidentOccurredCreation,
    wrapObject: wrapObject,
    stubClass: stubClass,
    ObjectPool: ObjectPool,
    getClass: getClass,
    environmentMethodInvoker: environmentMethodInvoker,
    forceThemeOptions: forceThemeOptions,
    spyUponProtectedMethod: spyUponProtectedMethod
  };
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/core/tooltip","viz/core/title","viz/components/legend","viz/axes/base_axis","viz/series/points/base_point","viz/series/base_series","viz/core/loading_indicator","viz/core/export","viz/core/renderers/renderer","viz/core/errors_warnings","viz/core/base_widget","viz/core/base_widget.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/core/tooltip"), require("viz/core/title"), require("viz/components/legend"), require("viz/axes/base_axis"), require("viz/series/points/base_point"), require("viz/series/base_series"), require("viz/core/loading_indicator"), require("viz/core/export"), require("viz/core/renderers/renderer"), require("viz/core/errors_warnings"), require("viz/core/base_widget"), require("viz/core/base_widget.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=vizMocks.js.map