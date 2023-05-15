!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/commonParts/common.js"], ["jquery","../../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/sankey/sankey","viz/themes","viz/sankey/layout"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.sankey/commonParts/common.js', ['jquery', '../../../helpers/vizMocks.js', 'viz/core/renderers/renderer', 'viz/sankey/sankey', 'viz/themes', 'viz/sankey/layout'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const vizMocks = $__require('../../../helpers/vizMocks.js');
    const rendererModule = $__require('viz/core/renderers/renderer');
    const find = function (array, predicate) {
        return array.filter(predicate)[0];
    };

    $__require('viz/sankey/sankey');
    $__require('viz/themes');

    const layoutBuilder = $__require('viz/sankey/layout').layout;
    const spiesLayoutBuilder = {
        computeLayout: sinon.spy(layoutBuilder, 'computeLayout'),
        _computeNodes: sinon.spy(layoutBuilder, '_computeNodes')
    };

    $('#qunit-fixture').append('<div id="test-container"></div>');

    function createSankey(options) {
        const defaultOptions = {
            node: {
                width: 15
            }
        };
        return $('#test-container').dxSankey($.extend({}, defaultOptions, options)).dxSankey('instance');
    }

    const environment = {
        beforeEach: function () {
            const that = this;
            this.renderer = new vizMocks.Renderer();

            this.linksGroupIndex = 0;
            this.nodesGroupIndex = 1;
            this.labelsGroupIndex = 2;

            sinon.stub(rendererModule, 'Renderer').callsFake(function () {
                return that.renderer;
            });
        },

        afterEach: function () {
            rendererModule.Renderer.restore();
        },

        linksGroup: function () {
            return this.renderer.g.getCall(this.linksGroupIndex).returnValue;
        },

        links: function () {
            return this.linksGroup().children;
        },

        link: function (index) {
            return this.links()[index].append.returnValues[0].children;
        },

        nodesGroup: function () {
            return this.renderer.g.getCall(this.nodesGroupIndex).returnValue;
        },

        nodes: function () {
            return this.nodesGroup().children;
        },

        node: function (index) {
            return this.nodes[index];
        },

        labelsGroup: function () {
            return this.renderer.g.getCall(this.labelsGroupIndex).returnValue;
        },

        labels: function () {
            return this.labelsGroup().children;
        },

        label: function (index) {
            return this.labels()[index].children[0];
        }
    };

    const testData = {
        countriesData: [{ source: 'Brazil', target: 'Portugal', weight: 5 }, { source: 'Brazil', target: 'France', weight: 1 }, { source: 'Brazil', target: 'Spain', weight: 1 }, { source: 'Brazil', target: 'England', weight: 1 }, { source: 'Canada', target: 'Portugal', weight: 1 }, { source: 'Canada', target: 'France', weight: 5 }, { source: 'Canada', target: 'England', weight: 1 }, { source: 'Mexico', target: 'Portugal', weight: 1 }, { source: 'Mexico', target: 'France', weight: 1 }, { source: 'Mexico', target: 'Spain', weight: 5 }, { source: 'Mexico', target: 'England', weight: 1 }, { source: 'USA', target: 'Portugal', weight: 1 }, { source: 'USA', target: 'France', weight: 1 }, { source: 'USA', target: 'Spain', weight: 1 }, { source: 'USA', target: 'England', weight: 5 }, { source: 'Portugal', target: 'Angola', weight: 2 }, { source: 'Portugal', target: 'Senegal', weight: 1 }, { source: 'Portugal', target: 'Morocco', weight: 1 }, { source: 'Portugal', target: 'South Africa', weight: 3 }, { source: 'France', target: 'Angola', weight: 1 }, { source: 'France', target: 'Senegal', weight: 3 }, { source: 'France', target: 'Mali', weight: 3 }, { source: 'France', target: 'Morocco', weight: 3 }, { source: 'France', target: 'South Africa', weight: 1 }, { source: 'Spain', target: 'Senegal', weight: 1 }, { source: 'Spain', target: 'Morocco', weight: 3 }, { source: 'Spain', target: 'South Africa', weight: 1 }, { source: 'England', target: 'Angola', weight: 1 }, { source: 'England', target: 'Senegal', weight: 1 }, { source: 'England', target: 'Morocco', weight: 2 }, { source: 'England', target: 'South Africa', weight: 7 }, { source: 'South Africa', target: 'China', weight: 5 }, { source: 'South Africa', target: 'India', weight: 1 }, { source: 'South Africa', target: 'Japan', weight: 3 }, { source: 'Angola', target: 'China', weight: 5 }, { source: 'Angola', target: 'India', weight: 1 }, { source: 'Angola', target: 'Japan', weight: 3 }, { source: 'Senegal', target: 'China', weight: 5 }, { source: 'Senegal', target: 'India', weight: 1 }, { source: 'Senegal', target: 'Japan', weight: 3 }, { source: 'Mali', target: 'China', weight: 5 }, { source: 'Mali', target: 'India', weight: 1 }, { source: 'Mali', target: 'Japan', weight: 3 }, { source: 'Morocco', target: 'China', weight: 5 }, { source: 'Morocco', target: 'India', weight: 1 }, { source: 'Morocco', target: 'Japan', weight: 3 }],
        simpleData: [{ source: 'A', target: 'Y', weight: 1 }, { source: 'B', target: 'Y', weight: 2 }, { source: 'B', target: 'M', weight: 4 }, { source: 'C', target: 'M', weight: 1 }, { source: 'M', target: 'Y', weight: 5 }]
    };
    module.exports.createSankey = createSankey;
    module.exports.testData = testData;
    module.exports.environment = environment;
    module.exports.layoutBuilder = layoutBuilder;
    module.exports.spiesLayoutBuilder = spiesLayoutBuilder;
    module.exports.find = find;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/sankey/sankey","viz/themes","viz/sankey/layout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/vizMocks.js"), require("viz/core/renderers/renderer"), require("viz/sankey/sankey"), require("viz/themes"), require("viz/sankey/layout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.js.map