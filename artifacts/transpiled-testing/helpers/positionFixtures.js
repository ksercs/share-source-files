!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/positionFixtures.js"], ["jquery"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/helpers/positionFixtures.js", ["require", "exports", "module", "jquery"], function(require, exports, module) {
      root.fixtures = module.exports = factory(require('jquery'));
    });
  } else {
    root.fixtures = factory(root.jQuery);
  }
}(window, function($) {
  const fixtures = {
    simple: {
      create: function() {
        $('<div id=where>').css({
          position: 'absolute',
          width: 100,
          height: 100,
          background: 'blue',
          top: 200,
          left: 200
        }).appendTo(document.body);
        $('<div id=what>').css({
          position: 'absolute',
          background: 'orange',
          width: 50,
          height: 50,
          top: 0,
          left: 0
        }).appendTo(document.body);
      },
      drop: function() {
        $('#where').remove();
        $('#what').remove();
      }
    },
    frameAdapted: {
      create: function() {
        fixtures.simple.create();
        $('#where').css({
          top: 100,
          left: 100
        });
        $('#what').css({
          width: 10,
          height: 10
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    differentTargets: {
      create: function() {
        fixtures.simple.create();
        $('<div id=there>').css({
          position: 'absolute',
          width: 100,
          height: 100,
          background: 'red',
          top: 50,
          left: 50
        }).appendTo(document.body);
      },
      drop: function() {
        fixtures.simple.drop();
        $('#there').remove();
      }
    },
    separatePositionedContainers: {
      create: function() {
        fixtures.simple.create();
        $('<div id=whereWrapper>').css({
          position: 'absolute',
          top: 100,
          left: 100
        }).append($('#where')).appendTo(document.body);
        $('<div id=whatWrapper>').css({
          position: 'absolute',
          top: 400,
          left: 200
        }).append($('#what')).appendTo(document.body);
      },
      drop: function() {
        $('#whereWrapper').remove();
        $('#whatWrapper').remove();
      }
    },
    customBoundary: {
      create: function() {
        const b = $('<div id=boundary>').css({
          position: 'absolute',
          background: 'green',
          width: 300,
          height: 300,
          left: 10,
          top: 10
        }).appendTo(document.body);
        $('<div id=where>').css({
          position: 'absolute',
          width: 100,
          height: 100,
          background: 'blue',
          top: 100,
          left: 100
        }).appendTo(b);
        $('<div id=what>').css({
          position: 'absolute',
          background: 'orange',
          width: 100,
          height: 100,
          top: 0,
          left: 0
        }).appendTo(document.body);
      },
      drop: function() {
        $('#where').remove();
        $('#what').remove();
        $('#boundary').remove();
      }
    },
    customBoundaryWithLeftTopOffset: {
      create: function() {
        fixtures.customBoundary.create();
        $('#where').css({
          left: 50,
          top: 50
        });
      },
      drop: function() {
        fixtures.customBoundary.drop();
      }
    },
    collisionTopLeft: {
      create: function() {
        fixtures.simple.create();
        $('#where').css({
          top: 0,
          left: 0
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    collisionTopRight: {
      create: function() {
        fixtures.simple.create();
        const win = $(window);
        const where = $('#where');
        where.css({
          top: 0,
          left: win.scrollLeft() + win.width() - where.outerWidth()
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    collisionBottomLeft: {
      create: function() {
        fixtures.simple.create();
        const win = $(window);
        const where = $('#where');
        where.css({
          top: win.scrollTop() + win.height() - where.outerHeight(),
          left: 0
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    collisionBottomRight: {
      create: function() {
        fixtures.simple.create();
        const win = $(window);
        const where = $('#where');
        where.css({
          top: win.scrollTop() + win.height() - where.outerHeight(),
          left: win.scrollLeft() + win.width() - where.outerWidth()
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    collisionSmallWindow: {
      create: function() {
        fixtures.simple.create();
        $('#where').css({
          width: $(window).width(),
          height: $(window).height(),
          top: 0,
          left: 0
        });
      },
      drop: function() {
        fixtures.simple.drop();
      }
    },
    svg: {
      create: function() {
        const $container = $(`<div id="container" style="position:absolute; top:0;">
                        <svg viewBox="0 0 500 500">
                            <g id="where">
                                <rect x="10" y="20" width="30" height="40" fill="red" />
                            </g>
                        </svg>
                    </div>`);
        $container.appendTo(document.body);
        $container.html($container.html());
        $('<div id=what>').appendTo(document.body);
      },
      drop: function() {
        $('#container').remove();
        $('#what').remove();
      }
    }
  };
  return fixtures;
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=positionFixtures.js.map