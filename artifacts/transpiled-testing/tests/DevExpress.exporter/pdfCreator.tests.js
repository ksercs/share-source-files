!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/pdfCreator.tests.js"], ["jquery","core/version","exporter","exporter/pdf_creator","core/utils/type","exporter/image_creator","core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.exporter/pdfCreator.tests.js', ['jquery', 'core/version', 'exporter', 'exporter/pdf_creator', 'core/utils/type', 'exporter/image_creator', 'core/utils/window'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const version = $__require('core/version').version;
    const getData = $__require('exporter').pdf.getData;
    const pdfCreator = $__require('exporter/pdf_creator').__tests;
    const isFunction = $__require('core/utils/type').isFunction;
    const imageCreator = $__require('exporter/image_creator').imageCreator;
    const getWindow = $__require('core/utils/window').getWindow;
    const window = getWindow();
    const ASN_DATE_REGEX = /CreationDate\s\(D:([0-9]+)Z([0-9]+)'([0-9]+)'/;

    const contentTestEnv = {
        beforeEach: function () {
            pdfCreator.set_getBlob(function (data) {
                return data;
            });
            pdfCreator.set_getBase64(function (data) {
                return data;
            });
            sinon.stub(imageCreator, 'getImageData', markup => {
                const def = $.Deferred();
                def.resolve(this.imageDataSample || '_test_' + markup + '_string_');
                return def;
            });
        },
        afterEach: function () {
            pdfCreator.restore_getBlob();
            pdfCreator.restore_getBase64();
            imageCreator.getImageData.restore();
        }
    };

    QUnit.module('PDF content test', contentTestEnv);

    QUnit.test('PDF \'main page\' populated with correct size in pt', function (assert) {
        const done = assert.async();

        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('/MediaBox[0 0 465.08 315.15]/'), -1);
        }).done(done);
    });

    QUnit.test('PDF \'content stream\' populated with correct size in pt', function (assert) {
        const done = assert.async();

        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('q 465.08 0 0 315.15 0.00 0.00 cm /I0 Do Q'), -1);
            done();
        });
    });

    QUnit.test('PDF \'info\' has correct dx version', function (assert) {
        const done = assert.async();

        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('/Producer(DevExtreme ' + version + ')'), -1, 'version is valid');
            done();
        });
    });

    QUnit.test('PDF \'image\' populated with correct size in px, length and image string', function (assert) {
        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('/Image/Width 620/Height 420/'), -1);
            assert.notStrictEqual(data.indexOf('/Length 26>>stream\r\n_test_image_markup_string_\r\n'), -1);
            done();
        });
    });

    QUnit.test('PDF \'image\' does not contain artifacts. T443241', function (assert) {
        const done = assert.async();
        this.imageDataSample = '$`';
        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            assert.strictEqual(data.indexOf('<</Type/XObject/Subtype/Image/Width'), data.lastIndexOf('<</Type/XObject/Subtype/Image/Width'));
            done();
        });
    });

    QUnit.test('PDF \'startxref\' populated with correct offset', function (assert) {
        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            const match = data.match(/startxref\r\n(\d+)\r\n/);
            assert.ok(match);
            assert.strictEqual(match.length, 2);
            assert.strictEqual(parseInt(match[1]), 717 + version.length);
            done();
        });
    });

    QUnit.test('PDF \'xref\' populated with correct blocks offset', function (assert) {
        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            const match = data.match(/xref\r\n0 8\r\n0000000000 65535 f\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\n0000000(\d\d\d) 00000 n\r\ntrailer/);

            assert.ok(match);

            assert.strictEqual(match.length, 8);
            assert.strictEqual(parseInt(match[1]), 241, '1');
            assert.strictEqual(parseInt(match[2]), 10, '2');
            assert.strictEqual(parseInt(match[3]), 346, '3');
            assert.strictEqual(parseInt(match[4]), 89, '4');
            assert.strictEqual(parseInt(match[5]), 534 + version.length, '5');
            assert.strictEqual(parseInt(match[6]), 450, '6');
            assert.strictEqual(parseInt(match[7]), 143, '7');

            done();
        });
    });

    QUnit.module('PDF content size. Scaled screen', {
        beforeEach() {
            contentTestEnv.beforeEach.apply(this, arguments);
            this.srcDevicePixelRatio = window.devicePixelRatio;
            window.devicePixelRatio = 2;
        },
        afterEach() {
            contentTestEnv.afterEach.apply(this, arguments);
            window.devicePixelRatio = this.srcDevicePixelRatio;
        }
    });

    QUnit.test('PDF \'main page\' populated with correct size in pt', function (assert) {
        const done = assert.async();

        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('/MediaBox[0 0 915.15 615.30]/'), -1);
        }).done(done);
    });

    QUnit.test('PDF \'content stream\' populated with correct size in pt', function (assert) {
        const done = assert.async();

        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.notStrictEqual(data.indexOf('q 915.15 0 0 615.30 0.00 0.00 cm /I0 Do Q'), -1);
            done();
        });
    });

    QUnit.module('Export', {
        beforeEach: function () {
            pdfCreator.set_composePdfString(function () {
                return '_composed_string_';
            });

            sinon.stub(imageCreator, 'getImageData', function (markup) {
                const def = $.Deferred();def.resolve('');return def;
            });

            if (isFunction(window.Blob)) {
                this.Blob = window.Blob;
                window.Blob = sinon.spy();
            } else {
                this.btoa = window.btoa;
                window.btoa = sinon.spy(function () {
                    return 'base64Data';
                });
            }
        },
        afterEach: function () {
            pdfCreator.restore_composePdfString();
            imageCreator.getImageData.restore();
            if (isFunction(window.Blob)) {
                window.Blob = this.Blob;
            } else {
                window.btoa = this.btoa;
            }
        }
    });

    QUnit.test('pass correct options to imageCreator', function (assert) {
        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2, margin: 10 }).then(function (data) {
            assert.deepEqual(imageCreator.getImageData.lastCall.args, ['image_markup', { width: 600.1, height: 400.2, margin: 10, format: 'JPEG' }]);
            done();
        });
    });

    QUnit.test('getData returns Blob when it is supported by Browser', function (assert) {
        if (!isFunction(window.Blob)) {
            assert.ok(true, 'Skip if there isn\'t blob');
            return;
        }

        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            assert.equal(window.Blob.callCount, 1);
            assert.equal(window.Blob.calledWithNew(), true);
            assert.ok(window.Blob.lastCall.args[0][0] instanceof ArrayBuffer);
            assert.deepEqual(new Uint8Array(window.Blob.lastCall.args[0][0]), new Uint8Array([95, 99, 111, 109, 112, 111, 115, 101, 100, 95, 115, 116, 114, 105, 110, 103, 95])); // _composed_string_
            assert.deepEqual(window.Blob.lastCall.args[1], { type: 'application/pdf' });
            assert.equal(data, window.Blob.lastCall.returnValue);
            done();
        });
    });

    QUnit.test('getData returns Base64 when Blob is not supported by Browser', function (assert) {
        if (isFunction(window.Blob)) {
            assert.ok(true, 'Skip if there is Blob');
            return;
        }

        const done = assert.async();
        getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
            assert.equal(window.btoa.callCount, 1);
            assert.deepEqual(window.btoa.lastCall.args, ['_composed_string_']);
            assert.equal(data, 'base64Data');
            done();
        });
    });

    QUnit.module('PDF CreationDate', {
        beforeEach() {
            contentTestEnv.beforeEach.apply(this, arguments);
            pdfCreator.set_getCurDate(() => this.currentDate);
        },
        afterEach() {
            contentTestEnv.afterEach.apply(this, arguments);
            pdfCreator.restore_getCurDate();
        }
    }, () => {

        QUnit.test('PDF \'info\' has correct date. Date units less 10', function (assert) {
            const done = assert.async();
            this.currentDate = new Date('Tue Feb 02 2021 06:04:01 GMT+0400');

            getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
                const matches = data.match(ASN_DATE_REGEX);

                assert.strictEqual(matches.length, 4, 'matches count is valid');
                assert.strictEqual(matches[1], '20210102020401', 'date is valid');
                assert.strictEqual(matches[2], '00', 'time should be in UTC format');
                assert.strictEqual(matches[3], '00', 'time should be in UTC format');

                done();
            });
        });

        QUnit.test('PDF \'info\' has correct date. Date units great 10', function (assert) {
            const done = assert.async();
            this.currentDate = new Date('Tue Dec 11 2021 21:12:13 GMT+0400');

            getData('image_markup', { width: 600.1, height: 400.2 }).then(function (data) {
                const matches = data.match(ASN_DATE_REGEX);

                assert.strictEqual(matches.length, 4, 'matches count is valid');
                assert.strictEqual(matches[1], '20211111171213', 'date is valid');
                assert.strictEqual(matches[2], '00', 'time should be in UTC format');
                assert.strictEqual(matches[3], '00', 'time should be in UTC format');

                done();
            });
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/version","exporter","exporter/pdf_creator","core/utils/type","exporter/image_creator","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/version"), require("exporter"), require("exporter/pdf_creator"), require("core/utils/type"), require("exporter/image_creator"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pdfCreator.tests.js.map