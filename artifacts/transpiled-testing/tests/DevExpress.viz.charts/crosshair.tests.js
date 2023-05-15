!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/crosshair.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/axes/base_axis","viz/chart_components/crosshair"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.charts/crosshair.tests.js', ['jquery', '../../helpers/vizMocks.js', 'viz/axes/base_axis', 'viz/chart_components/crosshair'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const axisModule = $__require('viz/axes/base_axis');
    const Crosshair = $__require('viz/chart_components/crosshair').Crosshair;
    const Axis = vizMocks.stubClass(axisModule.Axis);
    const environment = {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.renderer.bBoxTemplate = { y: 10, height: 20, x: 30, width: 40 };
            this.canvas = {
                width: 800,
                height: 800,
                left: 80,
                right: 90,
                top: 10,
                bottom: 80
            };
            this.crosshairGroup = this.renderer.g();
            this.renderer.g.reset();
            this.panes = [{
                coords: {
                    width: 800,
                    height: 800,
                    left: 80,
                    right: 720,
                    top: 10,
                    bottom: 790
                },
                clipRect: { id: 'clipRect' }
            }];
        },
        createAxis: function (axisOptions) {
            const axis = new Axis();

            axis.stub('getOptions').returns({ position: axisOptions.position });
            axis.stub('getTranslator').returns({ getBusinessRange: function () {
                    return { isEmpty: function () {
                            return axisOptions.emptyRange;
                        } };
                } });
            this.getFormattedValue = sinon.spy(function (value, format) {
                return value + '_formatted';
            });

            axis.getFormattedValue = this.getFormattedValue;
            axis.stub('getLabelsPosition').returns(30);
            return axis;
        },
        createCrosshair: function (options, axisOptions) {
            const valAxis = this.createAxis(axisOptions);
            const argAxis = this.createAxis(axisOptions);

            valAxis.name = 'defaultAxisName';
            this.axes = [[argAxis], [valAxis]];

            this.options = $.extend(true, {
                enabled: true,
                width: 1,
                color: 'yellow',
                opacity: 1,
                dashStyle: 'solid',
                horizontalLine: {
                    visible: true
                },
                verticalLine: {
                    visible: true
                }
            }, options);
            return new Crosshair(this.renderer, this.options, { canvas: this.canvas, axes: this.axes, panes: this.panes }, this.crosshairGroup);
        }
    };

    function checkLine(assert, createLine, x1, y1, x2, y2, attributes) {
        assert.equal(createLine.args[0][0], x1, 'x1');
        assert.equal(createLine.args[0][1], y1, 'y1');
        assert.equal(createLine.args[0][2], x2, 'x2');
        assert.equal(createLine.args[0][3], y2, 'y2');
        assert.equal(createLine.args[1], 'line');
        assert.deepEqual(createLine.returnValue.attr.getCall(0).args[0], attributes, 'attributes');
        assert.equal(createLine.returnValue.sharp.callCount, 1);
        assert.ok(createLine.returnValue.sharp.lastCall.calledAfter(createLine.returnValue.attr.lastCall));
    }

    function checkText(assert, createLabel, text, x, y, attributes, fontStyles) {
        assert.ok(createLabel.calledOnce, 'text was created');
        assert.equal(createLabel.lastCall.args[0], text, 'text');
        assert.equal(createLabel.lastCall.args[1], x, 'x');
        assert.equal(createLabel.lastCall.args[2], y, 'y');
        assert.deepEqual(createLabel.lastCall.returnValue.attr.firstCall.args[0], attributes, 'attributes');
        assert.deepEqual(createLabel.lastCall.returnValue.css.firstCall.args[0], fontStyles, 'font styles');
    }

    function checkRect(assert, createRect, x, y, width, height, attributes) {
        assert.ok(createRect.calledOnce, 'rect was created');
        assert.equal(createRect.lastCall.args[0], x, 'x');
        assert.equal(createRect.lastCall.args[1], y, 'y');
        assert.equal(createRect.lastCall.args[2], width, 'width');
        assert.equal(createRect.lastCall.args[3], height, 'height');
        assert.deepEqual(createRect.lastCall.returnValue.attr.firstCall.args[0], attributes, 'attributes');
    }

    function checkCanvas(assert, crosshair, canvas) {
        assert.equal(crosshair._canvas.top, canvas.top);
        assert.equal(crosshair._canvas.left, canvas.left);
        assert.equal(crosshair._canvas.right, canvas.width - canvas.right);
        assert.equal(crosshair._canvas.bottom, canvas.height - canvas.bottom);
    }

    function getDataForShowCrosshair(pointData, pointRadius) {
        return {
            point: {
                getCrosshairData: sinon.spy(function () {
                    return pointData;
                }),
                getPointRadius: sinon.spy(function () {
                    return pointRadius;
                })
            }
        };
    }

    QUnit.module('Crosshair', environment);

    QUnit.test('Create', function (assert) {
        const crosshair = this.createCrosshair({}, {});

        assert.ok(crosshair);
        assert.deepEqual(this.renderer, this.renderer);
        assert.deepEqual(crosshair._crosshairGroup, this.crosshairGroup);
        assert.deepEqual(crosshair._options.horizontal, {
            visible: true,
            line: {
                'stroke-width': 1,
                stroke: 'yellow',
                opacity: 1,
                dashStyle: 'solid',
                'stroke-linecap': 'butt'
            },
            label: {}
        });
        assert.deepEqual(crosshair._options.vertical, {
            visible: true,
            line: {
                'stroke-width': 1,
                stroke: 'yellow',
                opacity: 1,
                dashStyle: 'solid',
                'stroke-linecap': 'butt'
            },
            label: {}
        });
        checkCanvas(assert, crosshair, this.canvas);
        assert.deepEqual(crosshair._axes, this.axes);
        assert.deepEqual(crosshair._panes, this.panes);
    });

    QUnit.test('update', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        this.options.color = 'blue';
        const canvas = { width: 400, height: 300, left: 11, right: 12, top: 13, bottom: 14 };
        const panes = 'new panes';
        const axes = 'new axes';

        crosshair.update(this.options, { canvas: canvas, axes: axes, panes: panes });

        assert.ok(crosshair);
        assert.deepEqual(this.renderer, this.renderer);
        assert.deepEqual(crosshair._crosshairGroup, this.crosshairGroup);
        assert.deepEqual(crosshair._options.horizontal, {
            visible: true,
            line: {
                'stroke-width': 1,
                stroke: 'blue',
                opacity: 1,
                dashStyle: 'solid',
                'stroke-linecap': 'butt'
            },
            label: {}
        });
        assert.deepEqual(crosshair._options.vertical, {
            visible: true,
            line: {
                'stroke-width': 1,
                stroke: 'blue',
                opacity: 1,
                dashStyle: 'solid',
                'stroke-linecap': 'butt'
            },
            label: {}
        });
        checkCanvas(assert, crosshair, canvas);
        assert.deepEqual(crosshair._axes, axes);
        assert.deepEqual(crosshair._panes, panes);
    });

    QUnit.test('render', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        const attributes = { stroke: 'yellow', 'stroke-width': 1, opacity: 1, dashStyle: 'solid', 'stroke-linecap': 'butt' /* "square" */ };
        const circleOptions = { stroke: attributes.stroke, 'stroke-width': attributes['stroke-width'], dashStyle: attributes.dashStyle, opacity: attributes.opacity };

        // act
        crosshair.render();
        // assert
        assert.ok(crosshair);
        assert.equal(crosshair._horizontal.lines.length, 2);
        assert.equal(crosshair._vertical.lines.length, 2);
        assert.ok(crosshair._verticalGroup);
        assert.ok(crosshair._horizontalGroup);
        assert.ok(crosshair._circle);

        assert.equal(this.renderer.path.callCount, 4, 'lines ware created');

        checkLine(assert, this.renderer.path.firstCall, 80, 10, 80, 10, attributes);
        checkLine(assert, this.renderer.path.secondCall, 80, 10, 80, 10, attributes);
        checkLine(assert, this.renderer.path.thirdCall, 80, 10, 80, 10, attributes);
        checkLine(assert, this.renderer.path.lastCall, 80, 10, 80, 10, attributes);

        assert.equal(this.renderer.circle.lastCall.args[0], 80);
        assert.equal(this.renderer.circle.lastCall.args[1], 10);
        assert.equal(this.renderer.circle.lastCall.args[2], 0);
        assert.ok(this.renderer.circle.lastCall.returnValue.append.calledBefore(this.renderer.g.lastCall.returnValue.append));
        assert.deepEqual(this.renderer.circle.lastCall.returnValue.attr.getCall(0).args[0], circleOptions);
        assert.equal(this.crosshairGroup.attr.callCount, 1);
        assert.equal(this.crosshairGroup.attr.firstCall.args[0].visibility, 'hidden');
    });

    QUnit.test('render label', function (assert) {
        const options = { horizontalLine: { label: { visible: true, font: { size: 14, color: 'red' }, backgroundColor: 'blue', cssClass: 'crosshair_class' } } };
        const crosshair = this.createCrosshair(options, {});
        // act
        crosshair.render();
        // assert
        checkText(assert, this.renderer.text, '0', 0, 0, { align: 'right', 'class': 'crosshair_class' }, { 'font-size': 14, fill: 'red' });
        checkRect(assert, this.renderer.rect, 0, 0, 0, 0, { fill: 'blue' });

        assert.ok(this.renderer.text.lastCall.returnValue.attr.called);
        assert.ok(this.renderer.text.lastCall.returnValue.append.calledAfter(this.renderer.rect.lastCall.returnValue.append));
        assert.ok(this.renderer.rect.lastCall.returnValue.append.calledAfter(this.renderer.path.lastCall.returnValue.append));
    });

    QUnit.test('render label, position of axis is right', function (assert) {
        const options = { horizontalLine: { label: { visible: true, font: { size: 14, color: 'red' }, backgroundColor: 'blue' } } };
        const crosshair = this.createCrosshair(options, { position: 'right' });

        // act
        crosshair.render();
        // assert
        assert.ok(crosshair);
        checkText(assert, this.renderer.text, '0', 0, 0, { align: 'left', 'class': undefined }, { 'font-size': 14, fill: 'red' });
        checkRect(assert, this.renderer.rect, 0, 0, 0, 0, { fill: 'blue' });
    });

    QUnit.test('render with label, emptyRange', function (assert) {
        const options = { horizontalLine: { label: { visible: true, font: { size: 14, color: 'red' }, backgroundColor: 'blue' } } };
        const crosshair = this.createCrosshair(options, { emptyRange: true });

        // act
        crosshair.render();
        // assert
        assert.ok(crosshair);
        assert.ok(!this.renderer.stub('text').called);
        assert.ok(!this.renderer.stub('rect').called);
        assert.ok(!crosshair._horizontal.labels[0]);
        assert.ok(!crosshair._horizontal.labels[0]);
    });

    QUnit.test('show', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 720, xValue: 'x100', yValue: 'y30', axis: 'defaultAxisName' }, 6);

        dataForShow.x = 'someX';
        dataForShow.y = 'someY';
        // act
        crosshair.render();
        crosshair.show(dataForShow);
        // assert
        assert.equal(dataForShow.point.getCrosshairData.callCount, 1);
        assert.equal(dataForShow.point.getPointRadius.callCount, 1);
        assert.deepEqual(dataForShow.point.getCrosshairData.firstCall.args, ['someX', 'someY']);
        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });

        assert.equal(crosshair._circle.attr.callCount, 2);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].r, 9);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cx, 100);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cy, 720);
        assert.equal(crosshair._circle.attr.getCall(1).args[0]['clip-path'], 'clipRect');

        assert.equal(crosshair._horizontal.lines[0].attr.callCount, 2);
        assert.deepEqual(crosshair._horizontal.lines[0].attr.getCall(1).args[0].points, [80, 10, 91, 10]);
        assert.deepEqual(crosshair._horizontal.lines[1].attr.getCall(1).args[0].points, [109, 10, 710, 10]);

        assert.equal(crosshair._vertical.lines[0].attr.callCount, 2);
        assert.deepEqual(crosshair._vertical.lines[0].attr.getCall(1).args[0].points, [80, 10, 80, 711]);
        assert.deepEqual(crosshair._vertical.lines[1].attr.getCall(1).args[0].points, [80, 729, 80, 729]);

        assert.equal(this.renderer.path.getCall(0).returnValue.sharp.callCount, 2);
        assert.equal(this.renderer.path.getCall(2).returnValue.sharp.callCount, 2);
        assert.deepEqual(this.renderer.path.getCall(0).returnValue.sharp.secondCall.args, ['h', 1]);
        assert.deepEqual(this.renderer.path.getCall(1).returnValue.sharp.secondCall.args, ['h', 1]);
        assert.deepEqual(this.renderer.path.getCall(2).returnValue.sharp.secondCall.args, ['v', -1]);
        assert.deepEqual(this.renderer.path.getCall(3).returnValue.sharp.secondCall.args, ['v', -1]);
    });

    QUnit.test('T255239. Show when vertical and horizontal lines are invisible', function (assert) {
        const crosshair = this.createCrosshair({
            horizontalLine: { visible: false },
            verticalLine: { visible: false }
        }, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 100, y: 30, xValue: 'x100', yValue: 'y30', axis: 'defaultAxisName' }, 6));
        // assert
        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });

        assert.equal(crosshair._circle.attr.callCount, 2);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].r, 9);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cx, 100);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cy, 30);
        assert.equal(crosshair._circle.attr.getCall(1).args[0]['clip-path'], 'clipRect');
    });

    QUnit.test('show, coordinates out of the pane', function (assert) {
        this.panes[0].coords = { left: 150, right: 720, top: 10, bottom: 790 };
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 100, y: 30, xValue: 'x100', yValue: 'y30', axis: 'defaultAxisName' }, 6));
        // assert
        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });

        assert.equal(crosshair._circle.attr.callCount, 2);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].r, 9);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cx, 100);
        assert.equal(crosshair._circle.attr.getCall(1).args[0].cy, 30);
        assert.equal(crosshair._circle.attr.getCall(1).args[0]['clip-path'], null);

        assert.equal(crosshair._horizontal.lines[0].attr.callCount, 2);
        assert.deepEqual(crosshair._horizontal.lines[0].attr.getCall(1).args[0].points, [80, 10, 91, 10]);
        assert.deepEqual(crosshair._horizontal.lines[1].attr.getCall(1).args[0].points, [109, 10, 710, 10]);

        assert.equal(crosshair._vertical.lines[0].attr.callCount, 2);
        assert.deepEqual(crosshair._vertical.lines[0].attr.getCall(1).args[0].points, [80, 10, 80, 21]);
        assert.deepEqual(crosshair._vertical.lines[1].attr.getCall(1).args[0].points, [80, 39, 80, 720]);
    });

    QUnit.test('show label', function (assert) {
        this.renderer.bBoxTemplate.width = 5;
        const crosshair = this.createCrosshair({ horizontalLine: { label: { visible: true } } }, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 100.9, y: 30.4, xValue: 'x100', yValue: 'y30', axis: 'defaultAxisName' }));
        // assert
        assert.equal(crosshair._horizontal.labels[0].text.attr.callCount, 3);
        assert.deepEqual(crosshair._horizontal.labels[0].text.attr.getCall(1).args[0], { text: 'y30_formatted', x: 30, y: 10 });
        assert.deepEqual(crosshair._horizontal.labels[0].text.attr.getCall(2).args[0], { x: 30, y: 0 });

        assert.equal(crosshair._horizontal.labels[0].background.attr.callCount, 2);
        assert.deepEqual(crosshair._horizontal.labels[0].background.attr.lastCall.args[0], { x: 22, y: 6, width: 21, height: 28 });
        assert.deepEqual(crosshair._horizontalGroup.attr.lastCall.args[0], { translateY: 20 });
    });

    QUnit.test('show not in canvas, left', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 10, y: 30, xValue: 'x10', yValue: 'y30', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'hidden' });
    });

    QUnit.test('show not in canvas, right', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 730, y: 30, xValue: 'x730', yValue: 'y30', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'hidden' });
    });

    QUnit.test('show not in canvas, top', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 100, y: 3, xValue: 'x100', yValue: 'y3', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'hidden' });
    });

    QUnit.test('show not in canvas, bottom', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 200, y: 750, xValue: 'x200', yValue: 'y750', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'hidden' });
    });

    QUnit.test('show in canvas, left', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 80, y: 30, xValue: 'x80', yValue: 'y30', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });
    });

    QUnit.test('show in canvas, right', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 710, y: 30, xValue: 'x710', yValue: 'y30', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });
    });

    QUnit.test('show in canvas, top', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 100, y: 10, xValue: 'x100', yValue: 'y10', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });
    });

    QUnit.test('show in canvas, bottom', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 200, y: 720, xValue: 'x200', yValue: 'y720', axis: 'defaultAxisName' }));

        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });
    });

    QUnit.test('show very long label out of the canvas. left position', function (assert) {
        const options = { horizontalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'left' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.x = 3;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].x, 35);
    });

    QUnit.test('show very long label out of the canvas. right position', function (assert) {
        const options = { horizontalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'right' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.x = 760;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].x, 22);
    });

    QUnit.test('show big label in height out of the top canvas', function (assert) {
        const options = { horizontalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'left' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.y = 5;
        this.renderer.bBoxTemplate.height = 100;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].y, -11);
    });

    QUnit.test('show big label in height out of the bottom canvas', function (assert) {
        const options = { horizontalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'left' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 700, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.y = 5;
        this.renderer.bBoxTemplate.height = 200;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].y, -89);
    });

    QUnit.test('label formatting', function (assert) {
        const crosshair = this.createCrosshair({ label: { format: 'someFormat', precision: 'somePrecision', customizeText: 'customize_text', visible: true } }, {});
        const dataForCrosshair = getDataForShowCrosshair({ x: 120, y: 120, xValue: '200', yValue: '720', axis: 'defaultAxisName' });

        crosshair.render();
        // act
        crosshair.show(dataForCrosshair);

        // assert
        assert.equal(this.axes[0][0].getFormattedValue.callCount, 1, 'format call count. arg axis');
        assert.equal(this.axes[1][0].getFormattedValue.callCount, 1, 'format call count. val axis');
        assert.deepEqual(this.axes[0][0].getFormattedValue.getCall(0).args, ['200', {
            format: 'someFormat', precision: 'somePrecision',
            customizeText: 'customize_text', visible: true
        }, dataForCrosshair.point]);

        assert.deepEqual(this.axes[1][0].getFormattedValue.getCall(0).args, ['720', {
            format: 'someFormat', precision: 'somePrecision',
            customizeText: 'customize_text', visible: true
        }, dataForCrosshair.point]);

        assert.deepEqual(this.renderer.text.firstCall.returnValue.attr.getCall(1).args[0], { text: '200_formatted', x: 80, y: 30 });
        assert.deepEqual(this.renderer.text.secondCall.returnValue.attr.getCall(1).args[0], { text: '720_formatted', x: 30, y: 10 });
    });

    QUnit.module('Crosshair, vertical line', environment);

    QUnit.test('render label', function (assert) {
        const options = { verticalLine: { label: { visible: true, font: { size: 14, color: 'red' }, backgroundColor: 'blue' } } };
        const crosshair = this.createCrosshair(options, { position: 'top' });

        // act
        crosshair.render();
        // assert
        checkText(assert, this.renderer.text, '0', 0, 0, { align: 'center', 'class': undefined }, { 'font-size': 14, fill: 'red' });
        checkRect(assert, this.renderer.rect, 0, 0, 0, 0, { fill: 'blue' });
        assert.ok(this.renderer.text.lastCall.returnValue.attr.called);
        assert.ok(this.renderer.text.lastCall.returnValue.append.calledAfter(this.renderer.rect.lastCall.returnValue.append));
        assert.ok(this.renderer.rect.lastCall.returnValue.append.calledAfter(this.renderer.path.firstCall.returnValue.append));
    });

    QUnit.test('render with label, position is bottom', function (assert) {
        const options = { verticalLine: { label: { visible: true, font: { size: 14, color: 'red' }, backgroundColor: 'blue' } } };
        const crosshair = this.createCrosshair(options, { position: 'bottom' });

        // act
        crosshair.render();
        // assert
        checkText(assert, this.renderer.text, '0', 0, 0, { align: 'center', 'class': undefined }, { 'font-size': 14, fill: 'red' });
        checkRect(assert, this.renderer.rect, 0, 0, 0, 0, { fill: 'blue' });
    });

    QUnit.test('show label', function (assert) {
        const crosshair = this.createCrosshair({ verticalLine: { label: { visible: true } } }, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 110.9, y: 50.4, xValue: 'x110', yValue: 'y50', axis: 'defaultAxisName' }));
        // assert
        assert.equal(crosshair._vertical.labels[0].text.attr.callCount, 3);
        assert.deepEqual(crosshair._vertical.labels[0].text.attr.getCall(1).args[0], { text: 'x110_formatted', x: 80, y: 30 });
        assert.deepEqual(crosshair._vertical.labels[0].text.attr.getCall(2).args[0], { x: 80, y: 30 });

        assert.equal(crosshair._vertical.labels[0].background.attr.callCount, 2);
        assert.deepEqual(crosshair._vertical.labels[0].background.attr.lastCall.args[0], { x: 22, y: 6, width: 56, height: 28 });
        assert.deepEqual(crosshair._verticalGroup.attr.lastCall.args[0], { translateX: 30 });
    });

    QUnit.test('show label, null text', function (assert) {
        const crosshair = this.createCrosshair({ verticalLine: { label: { visible: true } } }, {});
        this.axes[0][0].getFormattedValue = function () {
            return null;
        };
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 110, y: 50, xValue: 'x110', yValue: 'y50', axis: 'defaultAxisName' }));
        // assert
        assert.equal(crosshair._vertical.labels[0].text.attr.callCount, 2);
        assert.deepEqual(crosshair._vertical.labels[0].text.attr.lastCall.args[0], { text: '' });
        assert.equal(crosshair._vertical.labels[0].background.attr.callCount, 2);
        assert.deepEqual(crosshair._vertical.labels[0].background.attr.lastCall.args[0], { x: 0, y: 0, width: 0, height: 0 });
    });

    QUnit.test('show very big label out of the canvas. top position', function (assert) {
        const options = { verticalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'top' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.y = 3;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].y, 31);
    });

    QUnit.test('show very big label out of the canvas. bottom position', function (assert) {
        const options = { verticalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'bottom' });
        const dataForShow = getDataForShowCrosshair({ x: 100, y: 30, axis: 'defaultAxisName' }, 6);

        this.axes[0][0].stub('getLabelsPosition').returns(780);
        this.renderer.bBoxTemplate.y = 780;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].y, 776);
    });

    QUnit.test('show very long label out of the left canvas', function (assert) {
        const options = { verticalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'top' });
        const dataForShow = getDataForShowCrosshair({ x: 80, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.width = 200;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].x, 108);
    });

    QUnit.test('show very long label out of the right canvas', function (assert) {
        const options = { verticalLine: { label: { visible: true } } };
        const crosshair = this.createCrosshair(options, { position: 'top' });
        const dataForShow = getDataForShowCrosshair({ x: 700, y: 30, axis: 'defaultAxisName' }, 6);

        this.renderer.bBoxTemplate.width = 200;

        crosshair.render();
        crosshair.show(dataForShow);

        assert.equal(this.renderer.text.lastCall.returnValue.attr.lastCall.args[0].x, 72);
    });

    QUnit.module('show - hide', environment);

    QUnit.test('show', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 110, y: 50, xValue: 'x110', yValue: 'y50', axis: 'defaultAxisName' }));
        // assert
        assert.equal(crosshair._crosshairGroup.attr.callCount, 2);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(1).args[0], { visibility: 'visible' });
    });

    QUnit.test('hide', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.render();
        crosshair.show(getDataForShowCrosshair({ x: 110, y: 50, xValue: 'x110', yValue: 'y50', axis: 'defaultAxisName' }));
        crosshair.hide();
        // assert
        assert.equal(crosshair._crosshairGroup.attr.callCount, 3);
        assert.deepEqual(crosshair._crosshairGroup.attr.getCall(2).args[0], { visibility: 'hidden' });
    });

    QUnit.module('Disposing', environment);

    QUnit.test('Dispose', function (assert) {
        const crosshair = this.createCrosshair({}, {});
        // act
        crosshair.dispose();
        // assert
        assert.ok(crosshair);
        assert.deepEqual(crosshair._renderer, null);
        assert.deepEqual(crosshair._crosshairGroup, null);
        assert.deepEqual(crosshair._options, null);
        assert.deepEqual(crosshair._canvas, null);
        assert.deepEqual(crosshair._axes, null);
        assert.deepEqual(crosshair._horizontalGroup, null);
        assert.deepEqual(crosshair._verticalGroup, null);
        assert.deepEqual(crosshair._horizontal, null);
        assert.deepEqual(crosshair._vertical, null);
        assert.deepEqual(crosshair._circle, null);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/axes/base_axis","viz/chart_components/crosshair"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/axes/base_axis"), require("viz/chart_components/crosshair"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=crosshair.tests.js.map