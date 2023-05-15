!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/svgCreator.tests.js"], ["jquery","core/utils/type","exporter","core/utils/svg"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.exporter/svgCreator.tests.js', ['jquery', 'core/utils/type', 'exporter', 'core/utils/svg'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const isFunction = $__require('core/utils/type').isFunction;
    const exporter = $__require('exporter').svg;
    const svgCreator = exporter.creator;
    const svgUtils = $__require('core/utils/svg');

    function setupCanvasStub() {
        // Blob
        isFunction(Blob) && sinon.stub(window, 'Blob', function (arrayBuffer, options) {
            return {
                arrayBuffer: arrayBuffer,
                options: options
            };
        });
    }

    function checkForBlob(assert) {
        if (this.blobSupported) {
            return true;
        }

        assert.ok(true, 'Skip if there isn\'t blob');
        return false;
    }

    function teardownCanvasStub() {
        // Blob
        isFunction(Blob) && window.Blob.restore();
    }

    QUnit.module('Svg creator. Get Data', {
        beforeEach: function () {
            this.blobArguments = {};

            setupCanvasStub(this.blobArguments);
            this.blobSupported = isFunction(Blob);
        },
        afterEach: function () {
            delete this.blobSupported;
            teardownCanvasStub();
        }
    });

    QUnit.test('getData', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const versionXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
        const testingMarkup = '<svg xmlns="http://www.w3.org/2000/svg" class="dxc dxc-chart" style="line-height: normal; overflow: hidden; display: block; -ms-user-select: none; -ms-touch-action: pan-x pan-y pinch-zoom; touch-action: pan-x pan-y pinch-zoom; -moz-user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="none" stroke-width="0" width="500" height="250" version="1.1"><path stroke="#ff0000" stroke-width="2" d="M 36 181 L 184 98 L 331 280" /></svg>';
        const deferred = exporter.getData(testingMarkup, {});

        assert.expect(3);
        $.when(deferred).done(function (blob) {
            try {
                const $resultSvg = $(blob.arrayBuffer[0]);

                assert.ok(blob, 'Blob was created');
                assert.deepEqual($resultSvg.html(), $(versionXML + testingMarkup).html(), 'Blob content is correct');
                assert.equal(blob.options.type, 'image/svg+xml', 'Blob type is correct');
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. markup with special symbols', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const testString = 'Temperature, °C';
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\'><text x="0" y="30" transform="translate(0,0)" text-anchor="middle" style="font-size:28px;font-family:\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana;font-weight:200;fill:#232323;cursor:default;">' + testString + '</text></svg>';
        const deferred = svgCreator.getData(testingMarkup, {});

        assert.expect(1);
        $.when(deferred).done(function (blob) {
            try {
                assert.notStrictEqual(blob.arrayBuffer[0].indexOf(testString), -1, 'Special symbols was added to result document');
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. markup with image', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const imageHtml = '<image xlink:href="../../testing/content/exporterTestsContent/test-image.png" width="300" height="200"></image>';
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'>' + imageHtml + '</svg>';
        const deferred = svgCreator.getData(testingMarkup, {});

        assert.expect(1);
        $.when(deferred).done(function (blob) {
            try {
                assert.notStrictEqual(blob.arrayBuffer[0].indexOf('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1'), -1, 'Image href was replaced on dataURI');
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. correct process two images with similar href', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const imageHtml = '<image xlink:href="../../testing/content/exporterTestsContent/test-image.png" width="300" height="200"></image><image xlink:href="../../testing/content/exporterTestsContent/test-image.png.png" width="300" height="200"></image>';
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'>' + imageHtml + '</svg>';
        const deferred = svgCreator.getData(testingMarkup, {});

        assert.expect(2);
        $.when(deferred).done(function (blob) {
            try {
                assert.notStrictEqual(blob.arrayBuffer[0].indexOf('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j'), -1);
                assert.notStrictEqual(blob.arrayBuffer[0].indexOf('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2B'), -1);
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. markup with image with href', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const imageHtml = '<image href="../../testing/content/exporterTestsContent/test-image.png" width="300" height="200"></image>';
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'>' + imageHtml + '</svg>';
        const deferred = svgCreator.getData(testingMarkup, {});

        assert.expect(1);
        $.when(deferred).done(function (blob) {
            try {
                assert.notStrictEqual(blob.arrayBuffer[0].indexOf('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1'), -1, 'Image href was replaced on dataURI');
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. markup with background-color', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'><text>test</text></svg>';
        const deferred = svgCreator.getData(testingMarkup, { backgroundColor: '#aaa' });

        assert.expect(1);
        $.when(deferred).done(function (blob) {
            try {
                assert.equal($(blob.arrayBuffer[0]).eq(1).css('background-color'), 'rgb(170, 170, 170)', 'Svg elementbackground color is correct');
            } finally {
                done();
            }
        });
    });

    QUnit.test('getData. markup with background-color. Source element hasn\'t background color', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'><text>test</text></svg>';
        const testingElement = svgUtils.getSvgElement(testingMarkup);
        const originalBackgroundColor = $(testingElement).css('backgroundColor');
        const deferred = svgCreator.getData(testingElement, { backgroundColor: '#aaa' });

        $.when(deferred).done(function () {
            assert.strictEqual($(testingElement).css('backgroundColor'), originalBackgroundColor);
            done();
        });
    });

    QUnit.test('getData returns base64 when blob is not supported', function (assert) {
        if (this.blobSupported) {
            assert.ok(true, 'Skip if there is blob');
            return;
        }

        const done = assert.async();
        const _getBlob = svgCreator._getBlob;
        const _getBase64 = svgCreator._getBase64;
        const testingMarkup = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.1\' fill=\'none\' stroke=\'none\' stroke-width=\'0\' class=\'dxc dxc-chart\' style=\'line-height:normal;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);display:block;overflow:hidden;touch-action:pan-x pan-y pinch-zoom;-ms-touch-action:pan-x pan-y pinch-zoom;\' width=\'500\' height=\'250\'><text>test</text></svg>';

        svgCreator._getBlob = function () {
            return 'blobData';
        };

        svgCreator._getBase64 = function () {
            return 'base64Data';
        };

        const deferred = svgCreator.getData(testingMarkup, { backgroundColor: '#aaa' });

        assert.expect(1);
        $.when(deferred).done(function (data) {
            try {
                assert.equal(data, 'base64Data', 'getBase64 was called');
            } finally {
                svgCreator._getBlob = _getBlob;
                svgCreator._getBase64 = _getBase64;
                done();
            }
        });
    });

    QUnit.test('Do not export elements with \'hidden-for-export\' attribute', function (assert) {
        if (!checkForBlob.call(this, assert)) return;

        const done = assert.async();
        const versionXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
        const svgStart = '<svg ';
        const xmlLink = 'xmlns:xlink="http://www.w3.org/1999/xlink" ';
        const rootAttributes = 'xmlns="http://www.w3.org/2000/svg" class="dxc dxc-chart" style="line-height: normal; overflow: hidden; display: block; -ms-user-select: none; -ms-touch-action: pan-x pan-y pinch-zoom; touch-action: pan-x pan-y pinch-zoom; -moz-user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="none" stroke-width="0" width="500" height="250" version="1.1">';
        const svgEnd = '</svg>';
        const hiddenMarkup = '<g hidden-for-export="true"><rect x="20" y="20" width="200" height="200" fill="#FF0000"></rect></g>';
        const innerMarkup = '<rect x="50" y="50" width="200" height="200" fill="#00FF00"></rect>';
        const testingMarkup = svgStart + rootAttributes + hiddenMarkup + innerMarkup + svgEnd;
        const deferred = exporter.getData(testingMarkup, {});

        assert.expect(3);
        $.when(deferred).done(function (blob) {
            try {
                const $resultSvg = $(blob.arrayBuffer[0]);

                assert.ok(blob, 'Blob was created');
                assert.deepEqual($resultSvg[1].outerHTML, $(versionXML + svgStart + xmlLink + rootAttributes + innerMarkup + svgEnd)[1].outerHTML, 'Blob content is correct');
                assert.equal(blob.options.type, 'image/svg+xml', 'Blob type is correct');
            } finally {
                done();
            }
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","exporter","core/utils/svg"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("exporter"), require("core/utils/svg"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=svgCreator.tests.js.map