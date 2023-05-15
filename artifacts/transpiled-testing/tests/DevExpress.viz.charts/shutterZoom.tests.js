!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/shutterZoom.tests.js"], ["../../helpers/pointerMock.js","../../helpers/vizMocks.js","viz/chart_components/shutter_zoom"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/shutterZoom.tests.js', ['../../helpers/pointerMock.js', '../../helpers/vizMocks.js', 'viz/chart_components/shutter_zoom'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const pointerMock = $__require('../../helpers/pointerMock.js');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const shutterPlugin = $__require('viz/chart_components/shutter_zoom');

    QUnit.module('Shutter zoom plugin', {
        initWidget: function (options) {
            this.eventSpy = sinon.spy();
            this.renderer = new vizMocks.Renderer();
            this.renderer.offsetTemplate = { left: 10, top: 5 };

            const chartMock = {
                option: function (name) {
                    return options[name];
                },
                _renderer: this.renderer,
                _eventTrigger: this.eventSpy,
                _argumentAxes: [{
                    getTranslator: function () {
                        return {
                            from: function (val) {
                                return {
                                    100: 0,
                                    200: 1,
                                    300: 2,
                                    400: 3,
                                    500: 4,
                                    600: 5,
                                    700: 6,
                                    800: 7,
                                    900: 8,
                                    1000: 9,
                                    1100: 10
                                }[val];
                            }
                        };
                    }
                }],
                _canvas: { width: 1200, height: 600 },
                panes: [{
                    canvas: { left: 100, top: 50, right: 100, bottom: 300 }
                }, {
                    canvas: { left: 100, top: 300, right: 100, bottom: 50 }
                }]
            };

            shutterPlugin.init.call(chartMock);

            this.pointer = pointerMock(chartMock._renderer.root.element).start();
            return chartMock;
        }
    });

    QUnit.test('Create detached shutter rect with given options on init', function (assert) {
        // act
        this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            enabled: true,
            fill: 'red',
            'stroke-width': 10,
            stroke: 'blue',
            opacity: 0.5
        }]);
        assert.strictEqual(rect.stub('append').callCount, 0);
    });

    QUnit.test('Append shutter rect with right size on start dragging', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart();

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            x: 100,
            y: 50,
            width: 1000,
            height: 500
        }]);
        assert.deepEqual(rect.append.lastCall.args, [this.renderer.root]);
    });

    QUnit.test('Change shutter rect x and width on dragging', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart().drag(400, 50);

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            x: 300,
            width: 400
        }]);
    });

    QUnit.test('Change shutter rect with right x and width on dragging when cursor moves out of canvas', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart().drag(1000, 50);

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            x: 300,
            width: 800
        }]);
    });

    QUnit.test('Change shutter rect y and height on dragging if chart is rotated', function (assert) {
        this.initWidget({
            rotated: true,
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 200 + 5).dragStart().drag(5, 100);

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            y: 200,
            height: 100
        }]);
    });

    QUnit.test('Change shutter rect with right y and height on dragging if chart is rotated when cursor moves out of canvas', function (assert) {
        this.initWidget({
            rotated: true,
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 200 + 5).dragStart().drag(5, 500);

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.deepEqual(rect.attr.lastCall.args, [{
            y: 200,
            height: 350
        }]);
    });

    QUnit.test('Detach shutter rect on end dragging', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart().drag(400, 50).dragEnd();

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.strictEqual(rect.remove.callCount, 1);
    });

    QUnit.test('Fire zoomStart event on start dragging', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart();

        // assert
        assert.deepEqual(this.eventSpy.firstCall.args, ['zoomStart']);
    });

    QUnit.test('Fire zoomEnd event on end dragging', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(300 + 10, 250 + 5).dragStart().drag(400, 50).dragEnd();

        // assert
        assert.deepEqual(this.eventSpy.lastCall.args, ['zoomEnd', { rangeStart: 2, rangeEnd: 6 }]);
    });

    QUnit.test('Fire zoomEnd event on end dragging, rotated', function (assert) {
        this.initWidget({
            rotated: true,
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(300 + 10, 100 + 5).dragStart().drag(400, 200).dragEnd();

        // assert
        assert.deepEqual(this.eventSpy.lastCall.args, ['zoomEnd', { rangeStart: 0, rangeEnd: 2 }]);
    });

    QUnit.test('Fire zoomEnd event with ordered params when drag from end to start', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(700 + 10, 250 + 5).dragStart().drag(-400, 50).dragEnd();

        // assert
        assert.deepEqual(this.eventSpy.lastCall.args, ['zoomEnd', { rangeStart: 2, rangeEnd: 6 }]);
    });

    QUnit.test('Do nothing if start dragging out of canvas on left', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(50, 250).dragStart();

        // assert
        assert.strictEqual(this.eventSpy.callCount, 0);
        assert.strictEqual(this.pointer.lastEvent().cancel, true);
        assert.strictEqual(this.renderer.rect.lastCall.returnValue.stub('append').callCount, 0);
    });

    QUnit.test('Do nothing if start dragging out of canvas on right', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(1150, 250).dragStart();

        // assert
        assert.strictEqual(this.eventSpy.callCount, 0);
        assert.strictEqual(this.pointer.lastEvent().cancel, true);
        assert.strictEqual(this.renderer.rect.lastCall.returnValue.stub('append').callCount, 0);
    });

    QUnit.test('Do nothing if start dragging out of canvas on top', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(300, 25).dragStart();

        // assert
        assert.strictEqual(this.eventSpy.callCount, 0);
        assert.strictEqual(this.pointer.lastEvent().cancel, true);
        assert.strictEqual(this.renderer.rect.lastCall.returnValue.stub('append').callCount, 0);
    });

    QUnit.test('Do nothing if start dragging out of canvas on bottom', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: true
            }
        });

        // act
        this.pointer.down(700, 575).dragStart();

        // assert
        assert.strictEqual(this.eventSpy.callCount, 0);
        assert.strictEqual(this.pointer.lastEvent().cancel, true);
        assert.strictEqual(this.renderer.rect.lastCall.returnValue.stub('append').callCount, 0);
    });

    QUnit.test('Do not draw anything nor triger events if shutterZoom is disabled', function (assert) {
        this.initWidget({
            shutterZoom: {
                enabled: false
            }
        });

        // act
        this.pointer.down(50, 250).dragStart();

        // assert
        assert.strictEqual(this.eventSpy.callCount, 0);
        assert.strictEqual(this.renderer.stub('rect').callCount, 0);
    });

    QUnit.test('Dispose shutter an widget dispose', function (assert) {
        const chart = this.initWidget({
            shutterZoom: {
                enabled: true,
                fill: 'red',
                'stroke-width': 10,
                stroke: 'blue',
                opacity: 0.5
            }
        });
        this.pointer.down(300 + 10, 250 + 5).dragStart().drag(400, 50);

        // act
        shutterPlugin.dispose.call(chart);

        // assert
        const rect = this.renderer.rect.lastCall.returnValue;
        assert.strictEqual(rect.dispose.callCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/pointerMock.js","../../helpers/vizMocks.js","viz/chart_components/shutter_zoom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/pointerMock.js"), require("../../helpers/vizMocks.js"), require("viz/chart_components/shutter_zoom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=shutterZoom.tests.js.map