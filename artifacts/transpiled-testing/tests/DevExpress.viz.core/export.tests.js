!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/export.tests.js"], ["../../helpers/vizMocks.js","viz/core/export","viz/themes","exporter","localization"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/export.tests.js', ['../../helpers/vizMocks.js', 'viz/core/export', 'viz/themes', 'exporter', 'localization'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const exportModule = $__require('viz/core/export');
    const themeModule = $__require('viz/themes');
    const clientExporter = $__require('exporter');
    const combineMarkupsOrig = exportModule.combineMarkups;

    themeModule.registerTheme({
        name: 'someTheme.light',
        backgroundColor: 'some_theme_color'
    });

    QUnit.module('Creation', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.incidentOccurred = sinon.spy();

            this.options = {
                enabled: true,
                printingEnabled: true,
                formats: ['JPEG'],
                backgroundColor: '#FFFFFF',
                font: {
                    size: 16,
                    color: '#707070',
                    family: '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
                    cursor: 'pointer',
                    weight: 200
                },
                button: {
                    margin: {
                        left: 1,
                        top: 2,
                        bottom: 3,
                        right: 4
                    },
                    'default': {
                        color: '#707070',
                        borderColor: '#b6b6b6',
                        backgroundColor: '#f5f5f5'
                    },
                    hover: {
                        color: '#333',
                        borderColor: '#bebebe',
                        backgroundColor: '#e6e6e6'
                    },
                    focus: {
                        color: '#000',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#e6e6e6'
                    },
                    active: {
                        color: '#333',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#d4d4d4'
                    }
                },

                shadowColor: '#ababab'
            };

            this.toDataURLStub = sinon.stub(window.HTMLCanvasElement.prototype, 'toDataURL');
            this.toDataURLStub.returnsArg(0);
        },
        afterEach: function () {
            this.toDataURLStub.restore();
        },
        createExportMenu: function () {
            const exportMenu = new exportModule.ExportMenu({
                renderer: this.renderer,
                incidentOccurred: this.incidentOccurred
            });
            exportMenu.setOptions(this.options);
            return exportMenu;
        }
    });

    QUnit.test('Groups creation', function (assert) {
        // arrange
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.g.callCount, 5, 'Three groups');
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.attr.getCall(0).args[0], { 'class': 'dx-export-menu', 'hidden-for-export': true }, 'Group attributes');
        assert.deepEqual(this.renderer.g.getCall(1).returnValue.attr.getCall(0).args[0], { 'class': 'dx-export-menu-button' }, 'Button css-class');
        assert.deepEqual(this.renderer.g.getCall(2).returnValue.attr.getCall(0).args[0], { 'class': 'dx-export-menu-list' }, 'List css-class');
        assert.deepEqual(this.renderer.g.getCall(3).returnValue.attr.getCall(0).args[0], { 'class': 'dx-export-menu-list-item' }, 'List item css-class');

        assert.equal(this.renderer.g.getCall(2).returnValue.append.getCall(0).args[0].element, this.renderer.g.getCall(0).returnValue.element, 'Element list is added to correct Parent');

        assert.equal(this.renderer.g.getCall(3).returnValue.append.getCall(0).args[0], this.renderer.g.getCall(2).returnValue);
    });

    QUnit.test('Button creation', function (assert) {
        // arrange, act
        this.createExportMenu();

        // assert
        assert.deepEqual(this.renderer.rect.getCall(1).args, [0, 0, 35, 35], 'Button rect');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], {
            rx: 4,
            ry: 4,
            fill: '#f5f5f5',
            stroke: '#b6b6b6',
            'stroke-width': 1,
            cursor: 'pointer'
        }, 'Button rect style');
        assert.deepEqual(this.renderer.path.getCall(0).args[0], [[9, 12, 26, 12, 26, 14, 9, 14], [9, 17, 26, 17, 26, 19, 9, 19], [9, 22, 26, 22, 26, 24, 9, 24]], 'button icon coords');
        assert.deepEqual(this.renderer.path.getCall(0).returnValue.attr.getCall(0).args[0], {
            fill: '#707070',
            cursor: 'pointer'
        }, 'Button arrow style');
        assert.deepEqual(this.renderer.path.getCall(0).returnValue.data.getCall(0).args[0], {
            'export-element-type': 'button'
        }, 'Button events data');

        assert.deepEqual(this.renderer.g.getCall(1).returnValue.setTitle.getCall(0).args[0], 'Exporting/Printing', 'Hint for button');
    });

    QUnit.test('List creation', function (assert) {
        // arrange, act
        this.options.formats = ['JPEG', 'PNG'];
        this.createExportMenu();

        // assert
        // rect
        assert.deepEqual(this.renderer.rect.getCall(0).args, [-85, 39, 120, 0], 'List rect');
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(0).args[0], {
            'stroke-width': 1,
            cursor: 'pointer',
            filter: 'shadowFilter.id',
            rx: 4,
            ry: 4
        }, 'List rect style');
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(1).args[0], {
            fill: '#f5f5f5',
            stroke: '#b6b6b6',
            height: 92
        }, 'List rect style');

        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.data.getCall(0).args[0], { 'export-element-type': 'list' }, 'Rect data');
        assert.strictEqual(this.renderer.rect.getCall(0).returnValue.append.lastCall.args[0], this.renderer.g.getCall(2).returnValue);
        assert.deepEqual(this.renderer.shadowFilter.getCall(0).args, ['-50%', '-50%', '200%', '200%', 2, 6, 3], 'Rect shadow creating');
        assert.deepEqual(this.renderer.shadowFilter.getCall(0).returnValue.attr.getCall(0).args[0], { opacity: 0.8 }, 'Rect shadow set opacity');
        assert.deepEqual(this.renderer.shadowFilter.getCall(0).returnValue.attr.getCall(1).args[0], { color: '#ababab' }, 'Rect shadow set Color');

        // separator

        assert.equal(this.renderer.path.getCall(1).args[1], 'line', 'List separator type');
        assert.deepEqual(this.renderer.path.getCall(1).returnValue.attr.getCall(0).args[0], {
            d: 'M -85 69 L 35 69',
            stroke: '#b6b6b6',
            'stroke-width': 1,
            sharp: 'v',
            cursor: 'pointer'
        }, 'List separator style');

        // texts
        assert.equal(this.renderer.text.callCount, 3, 'Texts count');

        // printing text
        assert.deepEqual(this.renderer.text.getCall(0).args, ['Print'], 'Printing text params');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'font-weight': 200,
            'pointer-events': 'none',
            cursor: 'pointer'
        }, 'Printing text style');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0], {
            'x': -70,
            'y': 62
        }, 'Printing text attributes');
        assert.deepEqual(this.renderer.rect.getCall(2).returnValue.data.getCall(0).args[0], {
            'export-element-type': 'printing'
        }, 'Printing rect events data');

        // JPEG group
        assert.deepEqual(this.renderer.text.getCall(1).args, ['JPEG file'], 'JPEG text params');
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'pointer-events': 'none',
            'font-weight': 200,
            cursor: 'pointer'
        }, 'JPEG text style');
        assert.deepEqual(this.renderer.rect.getCall(3).returnValue.data.getCall(0).args[0], {
            'export-element-type': 'exporting',
            'export-element-format': 'JPEG'
        }, 'JPEG rect events data');
        assert.deepEqual(this.renderer.text.getCall(1).returnValue.attr.getCall(0).args[0], {
            x: -70,
            y: 92
        }, 'JPEG text attrs');

        // PNG group
        assert.deepEqual(this.renderer.text.getCall(2).args, ['PNG file'], 'PNG text params');
        assert.deepEqual(this.renderer.text.getCall(2).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'pointer-events': 'none',
            'font-weight': 200,
            cursor: 'pointer'
        }, 'PNG text style');
        assert.deepEqual(this.renderer.rect.getCall(4).returnValue.data.getCall(0).args[0], {
            'export-element-type': 'exporting',
            'export-element-format': 'PNG'
        }, 'PNG rect events data');
        assert.deepEqual(this.renderer.text.getCall(2).returnValue.attr.getCall(0).args[0], {
            x: -70,
            y: 122
        }, 'PNG text attrs');
    });

    QUnit.test('List creation, without printing', function (assert) {
        // arrange, act
        this.options.printingEnabled = false;
        this.createExportMenu();

        // assert
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(0).args[0], {
            'stroke-width': 1,
            cursor: 'pointer',
            filter: 'shadowFilter.id',
            rx: 4,
            ry: 4
        }, 'list rect style');
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(1).args[0], {
            fill: '#f5f5f5',
            stroke: '#b6b6b6',
            height: 32
        }, 'list rect style');

        assert.equal(this.renderer.path.callCount, 1, 'paths count');
        assert.equal(this.renderer.text.callCount, 1, 'texts count');

        assert.deepEqual(this.renderer.text.getCall(0).args, ['JPEG file'], 'jpeg text params');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0], {
            x: -70,
            y: 62
        }, 'JPEG text attrs');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'pointer-events': 'none',
            'font-weight': 200,
            cursor: 'pointer'
        }, 'jpeg text style');
    });

    QUnit.test('List creation, without formats', function (assert) {
        // arrange, act
        this.options.formats = [];
        this.createExportMenu();

        // assert
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(1).args[0].height, 32, 'List rect');
        assert.deepEqual(this.renderer.rect.getCall(2).returnValue.css.getCall(0).args[0], {
            cursor: 'pointer',
            'pointer-events': 'all'
        }, 'List rect style');

        assert.equal(this.renderer.path.callCount, 2, 'Paths count');
        assert.equal(this.renderer.text.callCount, 1, 'Texts count');

        assert.deepEqual(this.renderer.text.getCall(0).args, ['Print'], 'Printing text params');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0], {
            x: -70,
            y: 62
        }, 'Printing text attributes');

        assert.deepEqual(this.renderer.text.getCall(0).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'pointer-events': 'none',
            'font-weight': 200,
            cursor: 'pointer'
        }, 'Printing text style');
    });

    QUnit.test('List creation with unsupported image format - do not create item nor throw incident', function (assert) {
        // arrange
        this.toDataURLStub.withArgs('image/jpeg').returns('image/png');
        this.toDataURLStub.withArgs('image/gif').returns('image/png');

        this.options.formats = null;
        this.options.printingEnabled = false;

        // act
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.text.callCount, 3);
        assert.deepEqual(this.renderer.text.getCall(0).args, ['PNG file'], 'PNG text params');
        assert.deepEqual(this.renderer.text.getCall(1).args, ['PDF file'], 'PDF text params');
        assert.deepEqual(this.renderer.text.getCall(2).args, ['SVG file'], 'SVG text params');
        assert.equal(this.incidentOccurred.callCount, 0);
    });

    QUnit.test('List creation with unsupported image format in options - do not create item but throw incident', function (assert) {
        // arrange
        this.toDataURLStub.withArgs('image/jpeg').returns('image/png');
        this.toDataURLStub.withArgs('image/gif').returns('image/png');

        this.options.formats = ['PNG', 'GIF', 'JPEG'];
        this.options.printingEnabled = false;

        // act
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.text.callCount, 1);
        assert.deepEqual(this.renderer.text.getCall(0).args, ['PNG file'], 'SUPPORTED text params');
        assert.deepEqual(this.incidentOccurred.getCall(0).args, ['W2108', ['GIF']]);
        assert.deepEqual(this.incidentOccurred.getCall(1).args, ['W2108', ['JPEG']]);
    });

    QUnit.test('Without printing and formats', function (assert) {
        // arrange, act
        this.options.formats = [];
        this.options.printingEnabled = false;
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.stub('rect').callCount, 1, 'List rect');
        assert.strictEqual(this.renderer.stub('rect').getCall(0).returnValue.stub('append').callCount, 0, 'List rect');
        assert.equal(this.renderer.stub('path').callCount, 0, 'No paths');
        assert.equal(this.renderer.stub('text').callCount, 0, 'No texts');
    });

    QUnit.test('Enabled options is false', function (assert) {
        // arrange, act
        this.options.enabled = false;
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.stub('rect').callCount, 1, 'List rect');
        assert.strictEqual(this.renderer.stub('rect').getCall(0).returnValue.stub('append').callCount, 0, 'List rect');
        assert.equal(this.renderer.stub('path').callCount, 0, 'No paths');
        assert.equal(this.renderer.stub('text').callCount, 0, 'No texts');
    });

    QUnit.module('API. Markup manipulations');

    QUnit.test('getMarkup method', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg </svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markup = exportModule.getMarkup([createWidget({ height: 25, width: 10 }), createWidget({ height: 15, width: 15 })]);

        assert.equal(markup, '<svg data-backgroundcolor="backgroundColor" height="40" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,0)"><svg </svg></g><g transform="translate(0,25)"><svg </svg></g></svg>');
    });

    QUnit.test('getMarkup. BackgroundColor in theme', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg </svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'theme') return 'someTheme.light';
                }
            };
        };
        const markup = exportModule.getMarkup([createWidget({ height: 25, width: 10 }), createWidget({ height: 15, width: 15 })]);

        assert.equal(markup, '<svg data-backgroundcolor="some_theme_color" height="40" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,0)"><svg </svg></g><g transform="translate(0,25)"><svg </svg></g></svg>');
    });

    QUnit.test('getMarkup. Different colors in charts. No backgroundColor in result', function (assert) {
        const colors = ['color_1', 'color_2'];
        let i = 0;
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg </svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return colors[i++];
                }
            };
        };
        const markup = exportModule.getMarkup([createWidget({ height: 25, width: 10 }), createWidget({ height: 15, width: 15 })]);

        assert.equal(markup, '<svg data-backgroundcolor="" height="40" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,0)"><svg </svg></g><g transform="translate(0,25)"><svg </svg></g></svg>');
    });

    QUnit.test('Combine widgets markups (combineMarkups), just widget', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg></svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markupData = exportModule.combineMarkups(createWidget({ width: 10, height: 25 }));

        assert.deepEqual(markupData, {
            markup: '<svg data-backgroundcolor="backgroundColor" height="25" width="10" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g transform="translate(0,0)"><svg></svg></g>' + '</svg>',
            width: 10,
            height: 25
        });
    });

    QUnit.test('Combine widgets markups (combineMarkups), array of widgets - column', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg></svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markupData = exportModule.combineMarkups([createWidget({ width: 10, height: 25 }), createWidget({ width: 15, height: 15 })]);

        assert.deepEqual(markupData, {
            markup: '<svg data-backgroundcolor="backgroundColor" height="40" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g transform="translate(0,0)"><svg></svg></g>' + '<g transform="translate(0,25)"><svg></svg></g>' + '</svg>',
            width: 15,
            height: 40
        });
    });

    QUnit.test('Combine widgets markups (combineMarkups), array of arrays of widgets - nested arrays are rows', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg></svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markupData = exportModule.combineMarkups([[createWidget({ width: 10, height: 25 }), createWidget({ width: 15, height: 15 })], [createWidget({ width: 20, height: 15 }), createWidget({ width: 10, height: 35 })]]);

        assert.deepEqual(markupData, {
            markup: '<svg data-backgroundcolor="backgroundColor" height="60" width="30" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g transform="translate(0,0)"><svg></svg></g><g transform="translate(10,0)"><svg></svg></g>' + '<g transform="translate(0,25)"><svg></svg></g><g transform="translate(20,25)"><svg></svg></g>' + '</svg>',
            width: 30,
            height: 60
        });
    });

    QUnit.test('Combine widgets markups (combineMarkups) in grid layout with center-center alignments', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg></svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markupData = exportModule.combineMarkups([[createWidget({ width: 10, height: 25 }), createWidget({ width: 16, height: 15 })], [createWidget({ width: 20, height: 15 }), createWidget({ width: 10, height: 35 })]], {
            gridLayout: true,
            verticalAlignment: 'center',
            horizontalAlignment: 'center'
        });

        assert.deepEqual(markupData, {
            markup: '<svg data-backgroundcolor="backgroundColor" height="60" width="40" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g transform="translate(5,0)"><svg></svg></g><g transform="translate(22,5)"><svg></svg></g>' + '<g transform="translate(0,35)"><svg></svg></g><g transform="translate(25,25)"><svg></svg></g>' + '</svg>',
            width: 40,
            height: 60
        });
    });

    QUnit.test('Combine widgets markups (combineMarkups) in grid layout with bottom-right alignments', function (assert) {
        const createWidget = function (size) {
            return {
                svg: sinon.stub().returns('<svg></svg>'),
                getSize: sinon.stub().returns(size),
                option: function (param) {
                    if (param === 'backgroundColor') return 'backgroundColor';
                }
            };
        };
        const markupData = exportModule.combineMarkups([[createWidget({ width: 10, height: 25 }), createWidget({ width: 16, height: 15 })], [createWidget({ width: 20, height: 15 }), createWidget({ width: 10, height: 35 })]], {
            gridLayout: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'right'
        });

        assert.deepEqual(markupData, {
            markup: '<svg data-backgroundcolor="backgroundColor" height="60" width="40" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g transform="translate(10,0)"><svg></svg></g><g transform="translate(24,10)"><svg></svg></g>' + '<g transform="translate(0,45)"><svg></svg></g><g transform="translate(30,25)"><svg></svg></g>' + '</svg>',
            width: 40,
            height: 60
        });
    });

    QUnit.module('API. Export methods', {
        beforeEach: function () {
            sinon.stub(clientExporter, 'export');
            this.toDataURLStub = sinon.stub(window.HTMLCanvasElement.prototype, 'toDataURL');
            this.toDataURLStub.returnsArg(0);
        },
        afterEach: function () {
            clientExporter.export.restore();
            exportModule.DEBUG_set_combineMarkups(combineMarkupsOrig);
            this.toDataURLStub.restore();
        }
    });

    QUnit.test('exportFromMarkup method. Defaults', function (assert) {
        // arrange
        const options = {
            width: 600,
            height: 400
        };
        const markup = 'testMarkup';

        // act
        exportModule.exportFromMarkup(markup, options);

        // assert
        assert.equal(clientExporter.export.callCount, 1, 'Export was called');
        assert.deepEqual(clientExporter.export.getCall(0).args[0], 'testMarkup', 'Export data');
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            format: 'PNG',
            fileName: 'file',
            width: 600,
            height: 400,
            margin: 10,
            fileSavingAction: undefined,
            exportingAction: undefined,
            exportedAction: undefined,
            backgroundColor: '#ffffff'
        }, 'Export options');
    });

    QUnit.test('exportFromMarkup method. Set options', function (assert) {
        // arrange
        const options = {
            format: 'jpeg',
            fileName: 'file1',
            width: 600,
            height: 400,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback'
        };
        const markup = 'testMarkup';

        // act
        exportModule.exportFromMarkup(markup, options);

        // assert
        assert.equal(clientExporter.export.callCount, 1, 'Export was called');
        assert.deepEqual(clientExporter.export.getCall(0).args[0], 'testMarkup', 'Export data');
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            format: 'JPEG',
            fileName: 'file1',
            width: 600,
            height: 400,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback',
            fileSavingAction: 'file saving callback',
            exportingAction: 'exporting callback',
            exportedAction: 'exported callback'
        }, 'Export options');
    });

    QUnit.test('exportFromMarkup unsupported image format - export as PNG', function (assert) {
        // arrange
        this.toDataURLStub.withArgs('image/gif').returns('image/png');

        const options = {
            format: 'gif',
            fileName: 'file1',
            width: 600,
            height: 400,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback'
        };
        const markup = 'testMarkup data-backgroundcolor="someColor"';

        // act
        exportModule.exportFromMarkup(markup, options);

        // assert
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            format: 'PNG',
            fileName: 'file1',
            width: 600,
            height: 400,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback',
            fileSavingAction: 'file saving callback',
            exportingAction: 'exporting callback',
            exportedAction: 'exported callback'
        }, 'Export options');
    });

    QUnit.test('exportFromMarkup. backgroundColor from markup', function (assert) {
        // arrange
        const options = {
            width: 600,
            height: 400
        };
        const markup = 'testMarkup data-backgroundcolor="someColor"';

        // act
        exportModule.exportFromMarkup(markup, options);

        // assert
        assert.equal(clientExporter.export.callCount, 1, 'Export was called');
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            backgroundColor: 'someColor',
            format: 'PNG',
            fileName: 'file',
            width: 600,
            height: 400,
            margin: 10,
            fileSavingAction: undefined,
            exportingAction: undefined,
            exportedAction: undefined
        }, 'Export options');
    });

    QUnit.test('exportFromMarkup. backgroundColor from current theme', function (assert) {
        // arrange
        const options = {
            width: 600,
            height: 400
        };
        const markup = 'testMarkup';
        const currentTheme = themeModule.currentTheme();

        themeModule.currentTheme('someTheme.light');

        try {
            // act
            exportModule.exportFromMarkup(markup, options);

            // assert
            assert.equal(clientExporter.export.getCall(0).args[1].backgroundColor, 'some_theme_color');
        } finally {
            themeModule.currentTheme(currentTheme);
        }
    });

    QUnit.test('exportWidgets method. Defaults', function (assert) {
        // arrange
        exportModule.DEBUG_set_combineMarkups(sinon.spy(function () {
            return { markup: 'testMarkup', width: 600, height: 400 };
        }));

        // act
        exportModule.exportWidgets([{ widget1: true }, { widget2: true }]);

        // assert
        assert.deepEqual(exportModule.combineMarkups.getCall(0).args, [[{ widget1: true }, { widget2: true }], {
            gridLayout: undefined,
            verticalAlignment: undefined,
            horizontalAlignment: undefined
        }]);
        assert.equal(clientExporter.export.callCount, 1, 'Export was called');
        assert.deepEqual(clientExporter.export.getCall(0).args[0], 'testMarkup', 'Export data');
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            format: 'PNG',
            fileName: 'file',
            width: 600,
            height: 400,
            margin: 10,
            fileSavingAction: undefined,
            exportingAction: undefined,
            exportedAction: undefined,
            backgroundColor: '#ffffff'
        }, 'Export options');
    });

    QUnit.test('exportWidgets method. Set options. Size options are ignored', function (assert) {
        // arrange
        const options = {
            format: 'jpeg',
            fileName: 'file1',
            width: 1000,
            height: 2000,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback',
            gridLayout: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'right'
        };
        exportModule.DEBUG_set_combineMarkups(sinon.spy(function () {
            return { markup: 'testMarkup', width: 600, height: 400 };
        }));

        // act
        exportModule.exportWidgets([{ widget1: true }, { widget2: true }], options);

        // assert
        assert.deepEqual(exportModule.combineMarkups.getCall(0).args, [[{ widget1: true }, { widget2: true }], {
            gridLayout: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'right'
        }]);
        assert.equal(clientExporter.export.callCount, 1, 'Export was called');
        assert.deepEqual(clientExporter.export.getCall(0).args[0], 'testMarkup', 'Export data');
        assert.deepEqual(clientExporter.export.getCall(0).args[1], {
            format: 'JPEG',
            fileName: 'file1',
            width: 600,
            height: 400,
            margin: 0,
            backgroundColor: '#00ff00',
            onFileSaving: 'file saving callback',
            onExporting: 'exporting callback',
            onExported: 'exported callback',
            fileSavingAction: 'file saving callback',
            exportingAction: 'exporting callback',
            exportedAction: 'exported callback',
            gridLayout: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'right'
        }, 'Export options');
    });

    QUnit.module('API', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.incidentOccurred = sinon.spy();

            sinon.stub(clientExporter, 'export');
            this.options = {
                printingEnabled: true,
                formats: ['JPEG'],
                enabled: true,
                font: {},

                button: {
                    margin: {
                        left: 1,
                        top: 2,
                        bottom: 3,
                        right: 4
                    },
                    'default': {
                        color: '#707070',
                        borderColor: '#b6b6b6',
                        backgroundColor: '#f5f5f5'
                    },
                    hover: {
                        color: '#333',
                        borderColor: '#bebebe',
                        backgroundColor: '#e6e6e6'
                    },
                    focus: {
                        color: '#000',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#e6e6e6'
                    },
                    active: {
                        color: '#333',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#d4d4d4'
                    }
                },
                exportOptions: {
                    width: 100,
                    height: 200
                }
            };
            this.toDataURLStub = sinon.stub(window.HTMLCanvasElement.prototype, 'toDataURL');
            this.toDataURLStub.returnsArg(0);
            this.srcCurrentTheme = themeModule.currentTheme();
        },
        afterEach: function () {
            clientExporter.export.restore();
            this.toDataURLStub.restore();
            themeModule.currentTheme(this.srcCurrentTheme);
        },
        createExportMenu: function () {
            const exportMenu = new exportModule.ExportMenu({
                renderer: this.renderer,
                incidentOccurred: this.incidentOccurred
            });
            exportMenu.setOptions(this.options);
            return exportMenu;
        }
    });

    QUnit.test('Get layout options', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        const layout = exportMenu.getLayoutOptions();

        // assert
        assert.deepEqual(layout, {
            cutLayoutSide: 'top',
            cutSide: 'vertical',
            height: 20,
            width: 20,
            x: 1,
            y: 2,
            horizontalAlignment: 'right',
            position: {
                horizontal: 'right',
                vertical: 'top'
            },
            verticalAlignment: 'top'
        }, 'layout options');
        assert.equal(this.renderer.g.getCall(1).returnValue.getBBox.callCount, 1, 'getBBox is called');
    });

    QUnit.test('Draw', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.draw(100, 60, { width: 30, height: 30, left: 50 });

        // assert
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.move.getCall(0).args, [110, 12], 'group moving');
    });

    QUnit.test('Shift', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        this.renderer.g.getCall(0).returnValue.attr.reset();

        // act
        exportMenu.shift(10, 20);

        // assert
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.attr.getCall(1).args[0], { translateY: 20 }, 'y shifting');
    });

    QUnit.test('Move', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        this.renderer.g.getCall(0).returnValue.attr.reset();

        // act
        exportMenu.move([10, 20]);

        // assert
        assert.deepEqual(this.renderer.g.getCall(0).returnValue.attr.lastCall.args[0], { translateX: 11, translateY: 22 });
    });

    QUnit.test('Measure', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();
        // act
        const size = exportMenu.measure();
        // assert
        assert.deepEqual(size, [40, 40]);
    });

    QUnit.test('Hide', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.hide();

        // assert
        assert.equal(this.renderer.g.getCall(0).returnValue.linkRemove.callCount, 1, 'link is removed');
    });

    QUnit.test('Show', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.show();

        // assert
        assert.equal(this.renderer.g.getCall(0).returnValue.linkAppend.callCount, 2, 'link is appended');
    });

    QUnit.test('Set options', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        this.renderer.rect.reset();
        this.renderer.text.reset();
        this.renderer.path.reset();

        // act
        exportMenu.setOptions({
            enabled: true,
            formats: ['png', 'abc'],
            printingEnabled: false,
            font: {
                size: 16,
                color: '#707070',
                cursor: 'pointer',
                family: '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
                weight: 200
            },
            button: {
                'default': {
                    color: '#707070',
                    borderColor: '#b6b6b6',
                    backgroundColor: '#f5f5f5'
                },
                hover: {
                    color: '#333',
                    borderColor: '#bebebe',
                    backgroundColor: '#e6e6e6'
                },
                focus: {
                    color: '#000',
                    borderColor: '#9d9d9d',
                    backgroundColor: '#e6e6e6'
                },
                active: {
                    color: '#333',
                    borderColor: '#9d9d9d',
                    backgroundColor: '#d4d4d4'
                }
            },
            backgroundColor: '#f5f5f5',
            menuButtonColor: '#f5f5f5',
            borderColor: '#b6b6b6'
        });

        // assert
        const listGroup = this.renderer.g.getCall(2).returnValue;

        assert.equal(listGroup.clear.callCount, 2, 'clearing');
        assert.equal(this.renderer.rect.callCount, 1, 'rect');
        assert.equal(this.renderer.path.callCount, 0, 'path');
        assert.equal(this.renderer.text.callCount, 1, 'text');

        assert.deepEqual(this.renderer.rect.getCall(0).args, [], 'List rect');
        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.attr.getCall(0).args[0], {
            height: 30,
            width: 118,
            x: -84,
            y: 40
        }, 'List rect attributes');

        assert.deepEqual(this.renderer.rect.getCall(0).returnValue.css.getCall(0).args[0], {
            'pointer-events': 'all',
            cursor: 'pointer'
        }, 'List rect style');

        assert.deepEqual(this.renderer.text.getCall(0).args, ['PNG file'], 'PNG text params');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.attr.getCall(0).args[0], {
            'x': -70,
            'y': 62
        }, 'PNG text attributes');
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.css.getCall(0).args[0], {
            'font-size': 16,
            'font-family': '\'Segoe UI Light\', \'Helvetica Neue Light\', \'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana',
            fill: '#707070',
            'pointer-events': 'none',
            'font-weight': 200,
            cursor: 'pointer'
        }, 'PNG text style');
    });

    QUnit.test('Dispose', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.dispose();

        // assert
        assert.equal(this.renderer.g.getCall(0).returnValue.dispose.callCount, 1, 'Group dispose was called');
        assert.equal(this.renderer.shadowFilter.getCall(0).returnValue.dispose.callCount, 1, 'Shadow filter dispose was called');
    });

    QUnit.module('Events', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.incidentOccurred = sinon.spy();

            sinon.stub(clientExporter, 'export');

            this.options = {
                enabled: true,
                printingEnabled: true,
                formats: ['JPEG'],
                font: {},
                backgroundColor: '#001122',
                button: {
                    'default': {
                        color: '#707070',
                        borderColor: '#b6b6b6',
                        backgroundColor: '#123456'
                    },
                    hover: {
                        color: '#333',
                        borderColor: '#bebebe',
                        backgroundColor: '#e6e6e6'
                    },
                    focus: {
                        color: '#000',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#e6e6e6'
                    },
                    active: {
                        color: '#333',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#d4d4d4'
                    }
                },
                exportOptions: {}
            };
        },
        afterEach: function () {
            clientExporter.export.restore();
        },
        createExportMenu: function () {
            const exportMenu = new exportModule.ExportMenu({
                renderer: this.renderer,
                exportTo: this.exportTo || function () {},
                print: this.print || function () {},
                incidentOccurred: this.incidentOccurred
            });
            exportMenu.setOptions(this.options);
            return exportMenu;
        }
    });

    QUnit.test('\'On\' subscribe', function (assert) {
        // arrange, act
        this.createExportMenu();

        // assert
        assert.equal(this.renderer.root.on.callCount, 1, 'one subscribe');
        assert.equal(this.renderer.root.on.getCall(0).args[0], 'dxpointerup.export', 'event name');
        assert.ok(this.renderer.root.on.getCall(0).args[1], 'event handler');

        assert.equal(this.renderer.rect.getCall(2).returnValue.on.callCount, 2, 'menu item subscribe count');
        assert.equal(this.renderer.rect.getCall(2).returnValue.on.getCall(0).args[0], 'dxhoverstart.export', 'menu item subscribe hover start');
        assert.equal(this.renderer.rect.getCall(2).returnValue.on.getCall(1).args[0], 'dxhoverend.export', 'menu item subscribe hover end');
        assert.equal(this.renderer.rect.getCall(2).returnValue.on.getCall(1).args[0], 'dxhoverend.export', 'menu item subscribe hover end');
        assert.equal(this.renderer.g.getCall(1).returnValue.on.getCall(2).args[0], 'dxpointerdown.export', 'button subscribe mousedown end');

        assert.equal(this.renderer.g.getCall(2).returnValue.on.callCount, 1, 'list subscribing');
        assert.equal(this.renderer.g.getCall(1).returnValue.on.callCount, 3, 'button subscribing');
    });

    QUnit.test('\'Off\' unsubscribe', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.dispose();

        // assert
        assert.equal(this.renderer.root.off.callCount, 1, 'one unsubscribe');
        assert.equal(this.renderer.root.off.getCall(0).args[0], '.export', 'event name');
        assert.equal(this.renderer.g.getCall(1).returnValue.off.callCount, 1, 'off for button');
        assert.equal(this.renderer.g.getCall(2).returnValue.off.callCount, 1, 'off for list');
    });

    QUnit.test('Button hover', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.rect.getCall(1).returnValue.attr.reset();

        // act
        this.renderer.g.getCall(1).returnValue.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#e6e6e6', stroke: '#bebebe' }, 'hovered button');
    });

    QUnit.test('Button mousedown', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.rect.getCall(1).returnValue.attr.reset();
        // act
        this.renderer.g.getCall(1).returnValue.on.getCall(2).args[1]({ target: { 'export-element-type': 'button' } });
        // assert
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#d4d4d4', stroke: '#9d9d9d' }, 'Button set active state');
    });

    QUnit.test('Button unhover', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.rect.getCall(1).returnValue.attr.reset();

        // act
        this.renderer.g.getCall(1).returnValue.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.g.getCall(1).returnValue.on.getCall(1).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(1).args[0], { fill: '#123456', stroke: '#b6b6b6' }, 'unhovered button');
    });

    QUnit.test('menuItem hover', function (assert) {
        // arrange
        this.createExportMenu();
        const menuItemRect = this.renderer.rect.getCall(2).returnValue;

        menuItemRect.attr.reset();

        // act
        menuItemRect.on.getCall(0).args[1]();

        // assert
        assert.deepEqual(menuItemRect.attr.getCall(0).args[0], { fill: '#e6e6e6' }, 'Menu item hovered');
    });

    QUnit.test('menuItem unhover', function (assert) {
        // arrange
        this.createExportMenu();
        const menuItemRect = this.renderer.rect.getCall(2).returnValue;

        menuItemRect.attr.reset();

        // act
        menuItemRect.on.getCall(0).args[1]();
        menuItemRect.on.getCall(1).args[1]();

        // assert
        assert.deepEqual(menuItemRect.attr.getCall(0).args[0], { fill: '#e6e6e6' }, 'Menu item unhovered');
        assert.deepEqual(menuItemRect.attr.getCall(1).args[0], { fill: null }, 'Menu item unhovered');
    });

    QUnit.test('Button hover when button is selected', function (assert) {
        // arrange
        this.createExportMenu();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.rect.getCall(1).returnValue.attr.reset();
        this.renderer.g.getCall(1).returnValue.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.equal(this.renderer.rect.getCall(1).returnValue.attr.callCount, 1, 'non-hovered but selected button');
    });

    QUnit.test('Button unhover when button is selected', function (assert) {
        // arrange
        this.createExportMenu();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.g.getCall(1).returnValue.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.rect.getCall(1).returnValue.attr.reset();
        this.renderer.g.getCall(1).returnValue.on.getCall(1).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.equal(this.renderer.rect.getCall(1).returnValue.attr.callCount, 1, 'non-hovered but selected button');
    });

    QUnit.test('List opening', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.g.getCall(2).returnValue.attr.reset();
        this.renderer.rect.getCall(1).returnValue.attr.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.equal(this.renderer.g.getCall(2).returnValue.append.callCount, 2, 'showing call count');
        assert.deepEqual(this.renderer.g.getCall(2).returnValue.append.getCall(0).args[0], this.renderer.g.getCall(2).returnValue.append.getCall(1).args[0], 'visible list');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#e6e6e6', stroke: '#9d9d9d' }, 'selected button has focused state style');
    });

    QUnit.test('Correct texts positions on list opening', function (assert) {
        // arrange
        this.createExportMenu();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.move.lastCall.args, [-71]);
    });

    QUnit.test('Correct texts positions on list opening. RTL', function (assert) {
        // arrange
        this.options.rtl = true;
        this.options.printingEnabled = false;
        this.createExportMenu();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.deepEqual(this.renderer.text.getCall(0).returnValue.move.lastCall.args, [-1]);
    });

    QUnit.test('List closing by menu button', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.g.getCall(2).returnValue.attr.reset();
        this.renderer.rect.getCall(1).returnValue.attr.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.equal(this.renderer.g.getCall(2).returnValue.remove.callCount, 2, 'showing call count');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(1).args[0], { fill: '#123456', stroke: '#b6b6b6' }, 'unselected button has default state style');
    });

    QUnit.test('List closing by any place', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.g.getCall(2).returnValue.attr.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.rect.getCall(1).returnValue.attr.reset();
        this.renderer.root.on.getCall(0).args[1]({ target: {} });

        // assert
        assert.equal(this.renderer.g.getCall(2).returnValue.remove.callCount, 2, 'showing call count');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#123456', stroke: '#b6b6b6' }, 'unselected button');
    });

    QUnit.test('List isn\'t closing by click on list', function (assert) {
        // arrange
        this.createExportMenu();

        this.renderer.g.getCall(2).returnValue.attr.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'list' } });

        // assert
        assert.equal(this.renderer.g.getCall(2).returnValue.append.callCount, 2, 'Appending call count');
        assert.equal(this.renderer.g.getCall(2).returnValue.remove.callCount, 1, 'Removing call count');
    });

    QUnit.test('Exporting by click on format text', function (assert) {
        // arrange
        this.exportTo = sinon.spy();

        const exportMenu = this.createExportMenu();
        exportMenu.draw(50, 50, { width: 15, height: 25 });

        this.renderer.g.getCall(2).returnValue.attr.reset();
        this.renderer.g.getCall(0).returnValue.linkAppend.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.rect.getCall(1).returnValue.attr.reset();
        this.renderer.root.on.getCall(0).args[1]({
            target: {
                'export-element-type': 'exporting',
                'export-element-format': 'JPEG'
            }
        });

        // assert
        assert.equal(this.exportTo.callCount, 1);
        assert.deepEqual(this.exportTo.getCall(0).args, ['JPEG']);

        assert.deepEqual(this.renderer.g.getCall(2).returnValue.remove.callCount, 2, 'list is closed');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#123456', stroke: '#b6b6b6' }, 'unselected button');
    });

    QUnit.test('Open list after exporting - previously clicked item is unhovered. T511729', function (assert) {
        const exportMenu = this.createExportMenu();
        exportMenu.draw(50, 50, { width: 15, height: 25 });

        const menuItemRect = this.renderer.rect.getCall(2).returnValue;
        menuItemRect.attr.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        menuItemRect.on.getCall(0).args[1]();
        this.renderer.root.on.getCall(0).args[1]({
            target: {
                'export-element-type': 'exporting',
                'export-element-format': 'JPEG'
            }
        });
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });

        // assert
        assert.deepEqual(menuItemRect.attr.callCount, 2);
        assert.deepEqual(menuItemRect.attr.lastCall.args[0], { fill: null }, 'Menu item unhovered');
    });

    QUnit.test('Printing by menu - close list', function (assert) {
        this.print = sinon.spy();

        this.createExportMenu();

        this.renderer.g.getCall(2).returnValue.attr.reset();
        this.renderer.g.getCall(0).returnValue.linkAppend.reset();

        // act
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'button' } });
        this.renderer.rect.getCall(1).returnValue.attr.reset();
        this.renderer.root.on.getCall(0).args[1]({ target: { 'export-element-type': 'printing' } });

        // assert
        assert.equal(this.print.callCount, 1);

        assert.deepEqual(this.renderer.g.getCall(2).returnValue.remove.callCount, 2, 'list is closed');
        assert.deepEqual(this.renderer.rect.getCall(1).returnValue.attr.getCall(0).args[0], { fill: '#123456', stroke: '#b6b6b6' }, 'unselected button');
    });

    // T397838
    QUnit.test('Localization', function (assert) {
        // assert
        const localization = $__require('localization');

        localization.loadMessages({
            it: {
                'vizExport-printingButtonText': 'Stampa',
                'vizExport-exportButtonText': '{0} formato',
                'vizExport-titleMenuText': 'Esportazione / stampa'
            }
        });

        this.options.formats = ['PNG'];

        localization.locale('it');
        this.createExportMenu();

        assert.deepEqual(this.renderer.text.getCall(0).args, ['Stampa'], 'Printing button text');
        assert.deepEqual(this.renderer.text.getCall(1).args, ['PNG formato'], 'Export button text');
        assert.deepEqual(this.renderer.g.getCall(1).returnValue.setTitle.getCall(0).args, ['Esportazione / stampa'], 'Export menu button title text');
    });

    QUnit.module('Layout', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.incidentOccurred = sinon.spy();

            sinon.stub(clientExporter, 'export');

            this.options = {
                enabled: true,
                printingEnabled: true,
                formats: ['JPEG'],
                font: {},
                button: {
                    'default': {
                        color: '#707070',
                        borderColor: '#b6b6b6',
                        backgroundColor: '#123456'
                    },
                    hover: {
                        color: '#333',
                        borderColor: '#bebebe',
                        backgroundColor: '#e6e6e6'
                    },
                    focus: {
                        color: '#000',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#e6e6e6'
                    },
                    active: {
                        color: '#333',
                        borderColor: '#9d9d9d',
                        backgroundColor: '#d4d4d4'
                    }
                },
                exportOptions: {}
            };
        },
        afterEach: function () {
            clientExporter.export.restore();
        },
        createExportMenu: function () {
            const exportMenu = new exportModule.ExportMenu({
                renderer: this.renderer,
                incidentOccurred: this.incidentOccurred
            });
            exportMenu.setOptions(this.options);
            return exportMenu;
        }
    });

    QUnit.test('Menu is hidden if there is no enough space', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.draw(10, 20, { width: 30, height: 30 });

        // assert
        assert.equal(this.renderer.g.getCall(0).returnValue.linkRemove.callCount, 1);
    });

    QUnit.test('freeSpace', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();
        exportMenu.draw(100, 200, { width: 30, height: 30 });

        // act
        exportMenu.freeSpace();

        // assert
        assert.equal(this.renderer.g.getCall(0).returnValue.linkRemove.callCount, 1);
    });

    QUnit.test('Return empty layout options if was hidden due to small container', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();
        exportMenu.draw(10, 20, { width: 30, height: 30 });

        // act
        const layout = exportMenu.getLayoutOptions();

        // assert
        assert.deepEqual(layout, { width: 0, height: 0, cutSide: 'vertical', cutLayoutSide: 'top' });
    });

    QUnit.test('Send warning message if was hidden due to small container', function (assert) {
        // arrange
        const exportMenu = this.createExportMenu();

        // act
        exportMenu.draw(10, 20, { width: 30, height: 30 });

        // assert
        assert.ok(this.incidentOccurred.calledWith('W2107'));
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/vizMocks.js","viz/core/export","viz/themes","exporter","localization"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/vizMocks.js"), require("viz/core/export"), require("viz/themes"), require("exporter"), require("localization"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.tests.js.map