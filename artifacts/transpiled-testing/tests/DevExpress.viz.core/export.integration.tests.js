!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/export.integration.tests.js"], ["viz/tree_map/tree_map","jquery","../../helpers/vizMocks.js","viz/core/renderers/renderer","exporter","viz/core/export","core/utils/deferred","core/utils/console","core/utils/type","core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/export.integration.tests.js', ['viz/tree_map/tree_map', 'jquery', '../../helpers/vizMocks.js', 'viz/core/renderers/renderer', 'exporter', 'viz/core/export', 'core/utils/deferred', 'core/utils/console', 'core/utils/type', 'core/utils/window'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    $__require('viz/tree_map/tree_map');

    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const rendererModule = $__require('viz/core/renderers/renderer');
    const clientExporter = $__require('exporter');
    const exportModule = $__require('viz/core/export');
    const Deferred = $__require('core/utils/deferred').Deferred;
    const logger = $__require('core/utils/console').logger;
    const { isFunction } = $__require('core/utils/type');
    const getWindow = $__require('core/utils/window').getWindow;

    const window = getWindow();

    $('#qunit-fixture').append('<div id="test-container"></div>');

    $('#test-container').css({
        width: '200px',
        height: '150px'
    });

    QUnit.module('Export', {
        beforeEach: function () {
            this.$container = $('#test-container');
            const renderer = this.renderer = new vizMocks.Renderer();
            rendererModule.Renderer = function () {
                return renderer;
            };

            const exportMenu = this.exportMenu = new vizMocks.ExportMenu();
            exportModule.DEBUG_set_ExportMenu(sinon.spy(function () {
                return exportMenu;
            }));

            sinon.stub(clientExporter, 'export').returns(new Deferred());

            this.toDataURLStub = sinon.stub(window.HTMLCanvasElement.prototype, 'toDataURL');
            this.toDataURLStub.returnsArg(0);
        },

        afterEach: function () {
            clientExporter.export.restore();
            this.toDataURLStub.restore();
        },

        createWidget: function (options) {
            return this.$container.dxTreeMap(options).dxTreeMap('instance');
        }
    });

    QUnit.test('Export method. Defined options', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const svgToCanvas = function () {};
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40,
                svgToCanvas: svgToCanvas
            },
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        widget.$element().css('backgroundColor', '#ff0000');

        // act
        widget.exportTo('testName', 'jpeg');

        const firstExportCall = exportFunc.getCall(0);
        firstExportCall.args[1].exportingAction();
        firstExportCall.args[1].exportedAction();
        firstExportCall.args[1].fileSavingAction();

        // assert
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[0], this.renderer.root.element, 'export data');

        assert.equal(firstExportCall.args[1].width, 200, 'width');
        assert.equal(firstExportCall.args[1].height, 150, 'height');
        assert.equal(firstExportCall.args[1].backgroundColor, '#ff0000', 'backgroundColor');
        assert.equal(firstExportCall.args[1].fileName, 'testName', 'fileName');
        assert.equal(firstExportCall.args[1].format, 'JPEG', 'format');
        assert.equal(firstExportCall.args[1].margin, 40, 'margin');
        assert.equal(firstExportCall.args[1].svgToCanvas, svgToCanvas, 'svgToCanvas passed');

        assert.equal(exportingStub.callCount, 1, 'exporting event');
        assert.equal(exportedStub.callCount, 1, 'exported event');
        assert.equal(fileSavingStub.callCount, 1, 'file saving event');
    });

    QUnit.test('Export method. PNG format', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.exportTo('testName', 'png');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'PNG', 'format');
    });

    QUnit.test('Export method. JPEG format', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.exportTo('testName', 'jpeg');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'JPEG', 'format');
    });

    QUnit.test('Export method. GIF format', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.exportTo('testName', 'gif');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'GIF', 'format');
    });

    QUnit.test('Export method. SVG format', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.exportTo('testName', 'svg');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'SVG', 'format');
    });

    QUnit.test('Export method. PDF format', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.exportTo('testName', 'pdf');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'PDF', 'format');
    });

    QUnit.test('Export method. invalid format', function (assert) {
        // arrange
        const incidentOccurred = sinon.spy();
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub,
            onIncidentOccurred: incidentOccurred
        });

        // act
        widget.exportTo('testName', 'abc');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'PNG', 'format');
        assert.equal(incidentOccurred.callCount, 0);
    });

    QUnit.test('Export method. unsopported image format', function (assert) {
        // arrange
        this.toDataURLStub.withArgs('image/jpeg').returns('image/png');

        const incidentOccurred = sinon.spy();
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const widget = this.createWidget({
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub,
            onIncidentOccurred: incidentOccurred
        });

        // act
        widget.exportTo('testName', 'jpeg');

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
        assert.equal(firstExportCall.args[1].format, 'PNG', 'format');
        assert.equal(incidentOccurred.callCount, 1);
        assert.deepEqual(incidentOccurred.getCall(0).args[0].target.id, 'W2108');
        assert.deepEqual(incidentOccurred.getCall(0).args[0].target.args, ['JPEG']);
    });

    QUnit.test('Export method. Undefined options', function (assert) {
        // arrange
        const exportFunc = clientExporter.export;
        const widget = this.createWidget();

        // act
        widget.exportTo();

        // assert
        const firstExportCall = exportFunc.getCall(0);
        assert.equal(firstExportCall.args[1].backgroundColor, '#ffffff', 'backgroundColor');
        assert.equal(firstExportCall.args[1].fileName, 'file', 'fileName');
        assert.equal(firstExportCall.args[1].format, 'PNG', 'format');
    });

    QUnit.test('Disable pointer events while exporting', function (assert) {
        // arrange
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        // act
        widget.exportTo('testName', 'jpeg');

        assert.equal(widget._renderer.root.attr('pointer-events'), 'none');
    });

    QUnit.test('Restore pointer events after export', function (assert) {
        // arrange
        const done = assert.async();
        clientExporter.export.returns(new Deferred().resolve());
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        widget._renderer.root.attr({ 'pointer-events': 'all' });

        // act
        widget.exportTo('testName', 'jpeg').then(function () {
            assert.equal(widget._renderer.root.attr('pointer-events'), 'all');
            done();
        });
    });

    QUnit.test('Restore pointer events after export if rejected', function (assert) {
        // arrange
        sinon.stub(logger, 'error');
        const done = assert.async();
        clientExporter.export.returns(new Deferred().reject('my error'));
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        widget._renderer.root.attr({ 'pointer-events': 'all' });

        // act
        widget.exportTo('testName', 'jpeg').always(function () {
            assert.equal(widget._renderer.root.attr('pointer-events'), 'all');
            assert.deepEqual(logger.error.lastCall.args, ['my error']);
            logger.error.restore();
            done();
        });
    });

    QUnit.test('Disable pointer events while printing', function (assert) {
        // arrange
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        // act
        widget.print();

        assert.equal(widget._renderer.root.attr('pointer-events'), 'none');
    });

    QUnit.test('Restore pointer events after printing', function (assert) {
        // arrange
        clientExporter.export.returns(new Deferred().resolve());
        const done = assert.async();
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        widget._renderer.root.attr({ 'pointer-events': 'all' });

        // act
        widget.print().then(() => {
            assert.equal(widget._renderer.root.attr('pointer-events'), 'all');
            done();
        });
    });

    QUnit.test('Restore pointer events after printing if rejected', function (assert) {
        // arrange
        clientExporter.export.returns(new Deferred().reject());
        sinon.stub(logger, 'error');
        const done = assert.async();
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                margin: 40
            }
        });

        widget._renderer.root.attr({ 'pointer-events': 'all' });

        // act
        widget.print().always(function () {
            assert.equal(widget._renderer.root.attr('pointer-events'), 'all');
            logger.error.restore();
            done();
        });
    });

    QUnit.test('Export menu creation', function (assert) {
        // arrange, act
        const incidentOccurred = sinon.spy();
        const widget = this.createWidget({
            onIncidentOccurred: incidentOccurred,
            rtlEnabled: 'rtl option'
        });
        widget.exportTo = sinon.spy();
        widget.print = sinon.spy();

        // assert
        assert.equal(exportModule.ExportMenu.lastCall.args[0].renderer, this.renderer);
        assert.strictEqual(typeof exportModule.ExportMenu.lastCall.args[0].incidentOccurred, 'function');
        assert.strictEqual(this.exportMenu.setOptions.getCall(0).args[0].rtl, 'rtl option');
        assert.strictEqual(typeof exportModule.ExportMenu.lastCall.args[0].exportTo, 'function');
        assert.strictEqual(typeof exportModule.ExportMenu.lastCall.args[0].print, 'function');

        exportModule.ExportMenu.lastCall.args[0].exportTo('FORMAT');
        assert.deepEqual(widget.exportTo.getCall(0).args, [undefined, 'FORMAT']);

        exportModule.ExportMenu.lastCall.args[0].print();
        assert.equal(widget.print.callCount, 1);
    });

    QUnit.test('Export menu disposing', function (assert) {
        // arrange
        this.createWidget();

        // act
        this.$container.remove();

        // assert
        assert.equal(this.exportMenu.dispose.callCount, 1, 'disposing of export menu is called');
    });

    QUnit.test('Depends on theme', function (assert) {
        const widget = this.createWidget();
        this.exportMenu.setOptions.reset();

        widget.option('theme', 'test-theme');

        assert.strictEqual(this.exportMenu.setOptions.callCount, 1);
    });

    QUnit.test('Print method - use export to prepare image, create hidden iFrame with image, delete iFrame after printing', function (assert) {
        assert.expect(31);
        const done = assert.async();
        const deferred = new Deferred();
        const exportFunc = clientExporter.export;
        const exportedStub = sinon.spy();
        const exportingStub = sinon.spy();
        const fileSavingStub = sinon.spy();
        const mockWindow = {
            print: sinon.spy(function () {
                this.afterPrintEventHandler();
            }),
            focus: sinon.spy(),
            addEventListener: sinon.spy(function (name, callback) {
                this.afterPrintEventHandler = callback;
            })
        };
        const widget = this.createWidget({
            'export': {
                backgroundColor: '#ff0000',
                format: 'JPEG',
                margin: 40,
                __test: {
                    deferred: deferred,
                    imageSrc: '/testing/content/exporterTestsContent/test-image.png',
                    mockWindow: mockWindow,
                    checkAssertions: function () {
                        assert.equal(window.frames.length, 1);
                        const frame = window.frames[0].frameElement;
                        assert.equal(frame.style.position, 'fixed');
                        assert.equal(frame.style.width, '0px');
                        assert.equal(frame.style.height, '0px');
                        assert.equal(frame.style.right, '0px');
                        assert.equal(frame.style.bottom, '0px');

                        const body = frame.contentDocument.body;
                        const image = body.childNodes[0];
                        assert.equal(image.getAttribute('src'), '/testing/content/exporterTestsContent/test-image.png');

                        assert.equal(mockWindow.focus.callCount, 1); // Required for IE
                        assert.equal(mockWindow.print.callCount, 1);
                        assert.ok(mockWindow.focus.getCall(0).calledBefore(mockWindow.print.getCall(0)));
                        assert.equal(mockWindow.addEventListener.callCount, 1);
                        assert.strictEqual(mockWindow.addEventListener.lastCall.args[0], 'afterprint');
                        assert.ok(isFunction(mockWindow.addEventListener.lastCall.args[1]));
                    }
                }
            },
            onExporting: exportingStub,
            onExported: exportedStub,
            onFileSaving: fileSavingStub
        });

        // act
        widget.print();

        const that = this;
        const firstExportCall = exportFunc.getCall(0);
        const fileSavingEventArgs = { data: 'imageData' };
        firstExportCall.args[1].fileSavingAction(fileSavingEventArgs);

        deferred.done(function (imageSrc) {
            assert.ok(fileSavingEventArgs.cancel, 'file should not be saved');

            assert.strictEqual(exportFunc.callCount, 1, 'export was called one time');
            assert.equal(firstExportCall.args[0], that.renderer.root.element, 'export data');

            assert.equal(firstExportCall.args[1].width, 200, 'width');
            assert.equal(firstExportCall.args[1].height, 150, 'height');
            assert.equal(firstExportCall.args[1].backgroundColor, '#ff0000', 'backgroundColor');
            assert.equal(firstExportCall.args[1].fileName, 'file', 'fileName');
            assert.equal(firstExportCall.args[1].format, 'PNG', 'format');
            assert.equal(firstExportCall.args[1].useBase64, true, 'image data should be base64');
            assert.equal(firstExportCall.args[1].margin, 0, 'margin');
            assert.ok(firstExportCall.args[1].fileSavingAction);
            assert.equal(firstExportCall.args[1].exportingAction, null);
            assert.equal(firstExportCall.args[1].exportedAction, null);

            assert.equal(exportingStub.callCount, 0, 'exporting event');
            assert.equal(exportedStub.callCount, 0, 'exported event');
            assert.equal(fileSavingStub.callCount, 0, 'file saving event');

            assert.equal(imageSrc, 'data:image/png;base64,imageData');

            assert.equal(window.frames.length, 0);
            done();
        });
    });

    QUnit.test('Print method, error image loading - delete iFrame', function (assert) {
        assert.expect(4);
        const done = assert.async();
        const deferred = new Deferred();
        const exportFunc = clientExporter.export;
        const mockWindow = {
            print: sinon.spy(),
            focus: sinon.spy(),
            addEventListener: sinon.spy()
        };
        const widget = this.createWidget({
            'export': {
                __test: {
                    deferred: deferred,
                    imageSrc: 'wrong_image_url',
                    mockWindow: mockWindow,
                    checkAssertions: function () {
                        const image = window.frames[0].frameElement.contentDocument.body.childNodes[0];
                        assert.equal(image.getAttribute('src'), 'wrong_image_url');
                        assert.equal(mockWindow.focus.callCount, 0);
                        assert.equal(mockWindow.print.callCount, 0);
                    }
                }
            }
        });

        // act
        widget.print();

        exportFunc.getCall(0).args[1].fileSavingAction({ data: 'imageData' });

        deferred.done(function () {
            assert.equal(window.frames.length, 0);
            done();
        });
    });

    QUnit.test('Printing. width of chart > width of page', function (assert) {
        assert.expect(2);
        const done = assert.async();
        const deferred = new Deferred();
        const exportFunc = clientExporter.export;
        function getScaleValue(transformFieldValue) {
            return transformFieldValue.replace('scale(', '').replace(')', '');
        }
        const mockWindow = {
            print: sinon.spy(function () {
                this.afterPrintEventHandler();
            }),
            focus: sinon.spy(),
            addEventListener: sinon.spy(function (name, callback) {
                this.afterPrintEventHandler = callback;
            }),
            document: { body: { style: {} } }
        };
        const widget = this.createWidget({
            size: {
                width: 1000
            },
            'export': {
                __test: {
                    deferred,
                    imageSrc: '/testing/content/exporterTestsContent/test-image.png',
                    mockWindow,
                    checkAssertions: () => {}
                }
            }
        });

        // act
        widget.print();

        exportFunc.getCall(0).args[1].fileSavingAction({ data: 'imageData' });

        deferred.done((_, style) => {
            assert.strictEqual(parseFloat(getScaleValue(style.transform)).toFixed(2), '0.79');
            assert.strictEqual(style['transform-origin'], '0 0');
            done();
        });
    });

    QUnit.test('Export with right size after resize', function (assert) {
        const exportFunc = clientExporter.export;
        const widget = this.createWidget();

        widget.option({
            size: {
                width: 100,
                height: 200
            }
        });
        widget.exportTo('testName', 'jpeg');

        // assert
        assert.equal(exportFunc.getCall(0).args[1].width, 100, 'width');
        assert.equal(exportFunc.getCall(0).args[1].height, 200, 'height');
    });

    QUnit.test('Hide export menu before exporting and show after', function (assert) {
        const exportFunc = clientExporter.export;
        const widget = this.createWidget();

        widget.option({
            size: {
                width: 100,
                height: 200
            }
        });
        widget.exportTo('testName', 'jpeg');

        // assert
        assert.equal(this.exportMenu.hide.callCount, 1);
        assert.equal(this.exportMenu.show.callCount, 1);

        assert.ok(this.exportMenu.hide.getCall(0).calledBefore(exportFunc.getCall(0)));
        assert.ok(this.exportMenu.show.getCall(0).calledAfter(exportFunc.getCall(0)));
    });
    QUnit.test('Hide export menu before printing and show after', function (assert) {
        const exportFunc = clientExporter.export;
        const widget = this.createWidget();

        widget.option({
            size: {
                width: 100,
                height: 200
            }
        });
        widget.print();

        // assert
        assert.equal(this.exportMenu.hide.callCount, 1);
        assert.equal(this.exportMenu.show.callCount, 1);

        assert.ok(this.exportMenu.hide.getCall(0).calledBefore(exportFunc.getCall(0)));
        assert.ok(this.exportMenu.show.getCall(0).calledAfter(exportFunc.getCall(0)));
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["viz/tree_map/tree_map","jquery","../../helpers/vizMocks.js","viz/core/renderers/renderer","exporter","viz/core/export","core/utils/deferred","core/utils/console","core/utils/type","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("viz/tree_map/tree_map"), require("jquery"), require("../../helpers/vizMocks.js"), require("viz/core/renderers/renderer"), require("exporter"), require("viz/core/export"), require("core/utils/deferred"), require("core/utils/console"), require("core/utils/type"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.integration.tests.js.map