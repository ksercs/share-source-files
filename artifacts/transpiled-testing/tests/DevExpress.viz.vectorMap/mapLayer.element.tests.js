!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.vectorMap/mapLayer.element.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/vector_map/map_layer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.vectorMap/mapLayer.element.tests.js', ['jquery', 'core/utils/common', '../../helpers/vizMocks.js', 'viz/vector_map/map_layer'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const mapLayerModule = $__require('viz/vector_map/map_layer');

    QUnit.module('Basic', {
        beforeEach: function () {
            this.str = { layerType: 'test-layer-type' };
            this.context = {
                renderer: new vizMocks.Renderer(),
                projection: { tag: 'projection' },
                root: new vizMocks.Element(),
                name: 'test-name',
                layer: { tag: 'layer' },
                str: this.str,
                settings: { label: {} },
                grouping: {}
            };
            this.index = 10;
            this.coordinates = { tag: 'coordinates' };
            this.attributes = { tag: 'attributes' };
            this.element = new mapLayerModule._TESTS_MapLayerElement(this.context, this.index, { coordinates: this.coordinates }, this.attributes);
        },

        project: function (hasSeparateLabel) {
            const element = this.element;
            element.proj = { tag: 'proj' };
            this.str.project = function () {
                return element.proj;
            };
            if (hasSeparateLabel) {
                element.labelProj = { tag: 'label-proj' };
                this.context.hasSeparateLabel = true;
                this.str.projectLabel = function () {
                    return element.labelProj;
                };
            }
            element.project();
        },

        draw: function (labelEnabled, hasSeparateLabel) {
            const element = this.element;
            this.project(hasSeparateLabel);
            this.str.draw = function () {
                element.figure = arguments[1];
                element.figure.root = new vizMocks.Element();
            };
            this.context.settings.label.enabled = labelEnabled;
            element.draw();
        }
    });

    QUnit.test('Project', function (assert) {
        this.str.project = sinon.spy();
        this.str.projectLabel = sinon.spy();

        this.element.project();

        assert.deepEqual(this.str.project.lastCall.args, [this.context.projection, this.coordinates], 'project');
        assert.strictEqual(this.str.projectLabel.lastCall, null, 'projectLabel');
    });

    QUnit.test('Project with labels', function (assert) {
        this.draw(true, true);
        this.str.getStyles = this.str.refresh = this.str.setState = this.str.transformLabel = noop;
        this.element.refresh();
        const proj = { tag: 'proj' };
        this.str.project = sinon.stub().returns(proj);
        this.str.projectLabel = sinon.spy();
        this.context.hasSeparateLabel = true;

        this.element.project();

        assert.deepEqual(this.str.project.lastCall.args, [this.context.projection, this.coordinates], 'project');
        assert.deepEqual(this.str.projectLabel.lastCall.args, [proj], 'projectLabel');
    });

    QUnit.test('Project with separate labels without label', function (assert) {
        this.str.project = sinon.spy();
        this.str.projectLabel = sinon.spy();
        this.context.hasSeparateLabel = true;

        this.element.project();

        assert.deepEqual(this.str.project.lastCall.args, [this.context.projection, this.coordinates], 'project');
        assert.strictEqual(this.str.projectLabel.lastCall, null, 'projectLabel');
    });

    QUnit.test('Draw', function (assert) {
        let figure;
        this.str.draw = sinon.spy(function () {
            figure = arguments[1];
            figure.root = new vizMocks.Element();
        });

        this.element.draw();

        assert.strictEqual(this.str.draw.lastCall.args.length, 3, 'draw');
        assert.strictEqual(this.str.draw.lastCall.args[0], this.context, 'draw - context arg');
        assert.deepEqual(this.str.draw.lastCall.args[2], { index: this.index, name: 'test-name' }, 'draw - data arg');
        assert.deepEqual(figure.root.append.lastCall.args, [this.context.root], 'root is appended');
        assert.strictEqual(this.context.renderer.stub('text').lastCall, null, 'text is not created');
    });

    QUnit.test('Transform', function (assert) {
        this.draw();
        this.str.transform = sinon.spy();
        this.str.transformLabel = sinon.spy();

        this.element.transform();

        assert.deepEqual(this.str.transform.lastCall.args, [this.element.figure, this.context.projection, this.element.proj], 'transform');
        assert.strictEqual(this.str.transformLabel.lastCall, null, 'transformLabel');
    });

    QUnit.test('Transform with separate labels', function (assert) {
        this.draw(true, true);
        this.str.getStyles = this.str.refresh = this.str.setState = this.str.transformLabel = noop;
        this.str.projectLabel = sinon.stub().returns('label-proj');
        this.element.refresh();
        this.str.transform = sinon.spy();
        this.str.transformLabel = sinon.spy();

        this.element.transform();

        assert.deepEqual(this.str.transform.lastCall.args, [this.element.figure, this.context.projection, this.element.proj], 'transform');
        assert.deepEqual(this.str.transformLabel.lastCall.args, [{
            root: this.element.figure.root, text: this.context.renderer.text.lastCall.returnValue, size: [0, 0], value: ''
        }, this.context.projection, 'label-proj'], 'transformLabel');
    });

    QUnit.test('Transform with separate labels without label', function (assert) {
        this.draw();
        this.str.transform = sinon.spy();
        this.str.transformLabel = sinon.spy();
        this.context.hasSeparateLabel = true;

        this.element.transform();

        assert.deepEqual(this.str.transform.lastCall.args, [this.element.figure, this.context.projection, this.element.proj], 'transform');
        assert.strictEqual(this.str.transformLabel.lastCall, null, 'transformLabel');
    });

    QUnit.test('Refresh', function (assert) {
        const styles = { tag: 'styles' };
        this.draw();
        this.str.getStyles = sinon.stub().returns(styles);
        this.str.refresh = sinon.spy();
        this.str.setState = sinon.spy();

        this.element.refresh();

        assert.strictEqual(this.str.getStyles.lastCall.args.length, 1, 'getStyles');
        const settings = this.str.getStyles.lastCall.args[0];
        assert.deepEqual(this.str.refresh.lastCall.args, [this.context, this.element.figure, { index: this.index, name: 'test-name' }, this.element.proxy, settings], 'refresh');
        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 0], 'setState');
    });

    QUnit.test('Refresh with label', function (assert) {
        const styles = { tag: 'styles' };
        this.draw(true);
        this.str.getStyles = sinon.stub().returns(styles);
        this.str.refresh = sinon.spy();
        this.str.setState = sinon.spy();
        this.element.proxy.attribute('text', 'Hello');
        $.extend(this.context.settings.label, {
            dataField: 'text',
            stroke: 'red', 'stroke-width': 2, 'stroke-opacity': 0.3,
            font: { size: 10, family: 'fam' }
        });
        this.context.dataKey = 'test-key';
        this.str.projectLabel = sinon.spy();
        this.str.transformLabel = sinon.spy();

        this.element.refresh();

        assert.strictEqual(this.str.getStyles.lastCall.args.length, 1, 'getStyles');
        const settings = this.str.getStyles.lastCall.args[0];
        const text = this.context.renderer.text.lastCall.returnValue;
        assert.deepEqual(this.str.refresh.lastCall.args, [this.context, this.element.figure, { index: this.index, name: 'test-name' }, this.element.proxy, settings], 'refresh');
        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 0], 'setState');
        assert.deepEqual(text.attr.getCall(1).args, [{ text: 'Hello', x: 0, y: 0 }], 'text settings 1');
        assert.deepEqual(text.attr.getCall(2).args, [{ align: 'center', stroke: 'red', 'stroke-width': 2, 'stroke-opacity': 0.3 }], 'text settings 2');
        assert.deepEqual(text.css.lastCall.args, [{ 'font-size': 10, 'font-family': 'fam' }], 'text styles');
        assert.deepEqual(text.data.lastCall.args, ['test-key', { index: this.index, name: 'test-name' }], 'text data');
        assert.deepEqual(text.append.lastCall.args, [this.element.figure.root], 'text is appended');
        assert.strictEqual(this.str.projectLabel.callCount, 0, 'label is not projected');
        assert.strictEqual(this.str.transformLabel.callCount, 0, 'label is not transformed');
    });

    QUnit.test('Refresh with label when labels are disabled', function (assert) {
        const styles = { tag: 'styles' };
        this.draw(true);
        this.str.getStyles = sinon.stub().returns(styles);
        this.str.refresh = sinon.spy();
        this.str.setState = sinon.spy();
        this.element.proxy.attribute('text', 'Hello');
        $.extend(this.context.settings.label, {
            dataField: 'text',
            stroke: 'red', 'stroke-width': 2, 'stroke-opacity': 0.3,
            font: { size: 10, family: 'fam' }
        });
        this.context.dataKey = 'test-key';
        this.str.projectLabel = sinon.spy();
        this.str.transformLabel = sinon.spy();
        this.element.refresh();
        const text = this.context.renderer.text.lastCall.returnValue;

        this.context.settings.label.enabled = false;
        this.element.refresh();

        assert.deepEqual(text.remove.lastCall.args, [], 'text is removed');
    });

    QUnit.test('Refresh with label when labels are disabled and particular label is enabled', function (assert) {
        const styles = { tag: 'styles' };
        this.draw(true);
        this.str.getStyles = sinon.stub().returns(styles);
        this.str.refresh = sinon.spy();
        this.str.setState = sinon.spy();
        this.element.proxy.attribute('text', 'Hello');
        $.extend(this.context.settings.label, {
            enabled: false,
            dataField: 'text',
            stroke: 'red', 'stroke-width': 2, 'stroke-opacity': 0.3,
            font: { size: 10, family: 'fam' }
        });
        this.context.dataKey = 'test-key';
        this.element.update({ label: { enabled: true } });

        this.element.refresh();

        assert.strictEqual(this.context.renderer.stub('text').lastCall, null);
    });

    QUnit.test('Refresh with separate labels', function (assert) {
        this.context.labelRoot = new vizMocks.Element();
        this.draw(true, true);
        this.str.getStyles = this.str.refresh = this.str.setState = noop;
        this.element.proxy.attribute('text', 'Hello');
        this.context.settings.label.dataField = 'text';
        this.str.projectLabel = sinon.spy();
        this.str.transformLabel = sinon.spy();

        this.element.refresh();

        assert.deepEqual(this.context.renderer.text.lastCall.returnValue.append.lastCall.args, [this.context.labelRoot], 'text is appended');
        assert.strictEqual(this.str.projectLabel.callCount, 1, 'label is projected');
        assert.strictEqual(this.str.transformLabel.callCount, 1, 'label is transformed');
    });

    QUnit.test('Refresh with label when text is in proxy', function (assert) {
        this.draw(true);
        this.str.getStyles = this.str.refresh = this.str.setState = noop;
        this.element.proxy.text = 'Hello 2';

        this.element.refresh();

        assert.deepEqual(this.context.renderer.text.lastCall.returnValue.attr.getCall(1).args[0].text, 'Hello 2', 'text');
    });

    QUnit.test('Refresh with label when text is not defined', function (assert) {
        this.draw(true);
        this.str.getStyles = this.str.refresh = this.str.setState = noop;

        this.element.refresh();

        assert.strictEqual(this.context.renderer.text.lastCall.returnValue.stub('append').lastCall, null, 'text is not appended');
    });

    QUnit.test('Options merging', function (assert) {
        let settings;
        this.str.getStyles = function () {
            settings = arguments[0];
        };
        this.context.settings = {
            p1: 'p1', p2: 'p2',
            label: {
                p3: 'p3', p4: 'p4',
                font: {
                    p5: 'p5', p6: 'p6'
                }
            }
        };
        this.element.update({
            p2: 'P2', p3: 'P3',
            label: {
                p4: 'P4', p5: 'p5',
                font: {
                    p6: 'P6', p7: 'P7'
                }
            }
        });
        this.draw();
        this.str.refresh = this.str.setState = noop;

        this.element.refresh();

        assert.deepEqual(settings, {
            p1: 'p1', p2: 'P2', p3: 'P3',
            label: {
                p3: 'p3', p4: 'P4', p5: 'p5',
                font: {
                    p5: 'p5', p6: 'P6', p7: 'P7'
                }
            }
        });
    });

    QUnit.test('Options and palette', function (assert) {
        let settings;
        this.str.getStyles = function () {
            settings = arguments[0];
        };
        this.context.settings = {
            _colors: ['a', 'b', 'c'],
            color: 'Z',
            label: {}
        };
        this.element.update({
            paletteIndex: 2
        });
        this.draw();
        this.str.refresh = this.str.setState = noop;

        this.element.refresh();

        assert.strictEqual(settings.color, 'c');
    });

    QUnit.test('Options and palette and option', function (assert) {
        let settings;
        this.str.getStyles = function () {
            settings = arguments[0];
        };
        this.context.settings = {
            _colors: ['a', 'b', 'c'],
            color: 'Z',
            label: {}
        };
        this.element.update({
            paletteIndex: 2,
            color: 'd'
        });
        this.draw();
        this.str.refresh = this.str.setState = noop;

        this.element.refresh();

        assert.strictEqual(settings.color, 'd');
    });

    QUnit.test('Options and grouping', function (assert) {
        let settings;
        const callback1 = sinon.stub().withArgs('test-field-1').returns(3);
        const callback2 = sinon.stub().withArgs('test-field-2').returns(5);
        this.str.getStyles = function () {
            settings = arguments[0];
        };
        this.context.grouping = {
            prop1: {
                callback: callback1,
                field: 'test-field-1',
                partition: [1, 2, 5],
                values: ['A', 'B']
            },
            prop2: {
                callback: callback2,
                field: 'test-field-2',
                partition: [2, 6, 8],
                values: ['C', 'D']
            }
        };
        this.element.update();
        this.draw();
        this.str.refresh = this.str.setState = noop;

        this.element.refresh();

        assert.strictEqual(settings.prop1, 'B');
        assert.strictEqual(settings.prop2, 'C');
    });

    QUnit.test('measureLabel and adjustLabel', function (assert) {
        this.draw(true);
        this.str.getStyles = this.str.refresh = this.str.setState = noop;
        this.element.proxy.attribute('text', 'Hello');
        this.context.settings.label.dataField = 'text';
        this.element.refresh();
        const text = this.context.renderer.text.lastCall.returnValue;
        text.getBBox = sinon.stub().returns({ width: 20, height: 16, y: 3 });
        this.str.getLabelOffset = sinon.stub().returns([30, 40]);

        this.element.measureLabel();
        this.element.adjustLabel();

        assert.deepEqual(text.getBBox.lastCall.args, [], 'measure');
        assert.deepEqual(text.attr.lastCall.args, [{ x: 30, y: 29 }], 'adjust');
    });

    QUnit.test('Update when not drawn', function (assert) {
        this.element.update();

        assert.ok(true, 'no error');
    });

    QUnit.test('Update when drawn', function (assert) {
        this.draw();
        this.str.getStyles = this.str.refresh = this.str.setState = noop;
        const refresh = sinon.spy(this.element, 'refresh');

        this.element.update();

        assert.deepEqual(refresh.lastCall.args, []);
    });

    QUnit.test('Set hovered', function (assert) {
        const styles = { tag: 'styles' };
        const trigger = sinon.spy();
        this.context.params = { eventTrigger: trigger };
        this.context.hover = true;
        this.str.getStyles = function () {
            return styles;
        };
        this.str.refresh = this.str.setState = noop;
        this.str.setState = sinon.spy();
        this.draw();
        this.element.refresh();

        this.element.setHovered(true);

        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 1], 'setState');
        assert.deepEqual(this.element.figure.root.toForeground.lastCall.args, [], 'toForeground');
        assert.deepEqual(trigger.lastCall.args, ['hoverChanged', { target: this.element.proxy, state: true }], 'event');

        this.element.setHovered(false);

        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 0], 'setState');
        assert.deepEqual(this.element.figure.root.toBackground.lastCall.args, [], 'toBackground');
        assert.deepEqual(trigger.lastCall.args, ['hoverChanged', { target: this.element.proxy, state: false }], 'event');
    });

    QUnit.test('Set selected', function (assert) {
        const styles = { tag: 'styles' };
        const trigger = sinon.spy();
        this.context.params = { eventTrigger: trigger };
        this.context.selection = { state: {} };
        this.str.getStyles = function () {
            return styles;
        };
        this.str.refresh = this.str.setState = noop;
        this.str.setState = sinon.spy();
        this.draw();
        this.element.refresh();

        this.element.setSelected(true);

        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 2], 'setState');
        assert.deepEqual(this.element.figure.root.toForeground.lastCall.args, [], 'toForeground');
        assert.deepEqual(trigger.lastCall.args, ['selectionChanged', { target: this.element.proxy, state: true }], 'event');

        this.element.setSelected(false);

        assert.deepEqual(this.str.setState.lastCall.args, [this.element.figure, styles, 0], 'setState');
        assert.deepEqual(this.element.figure.root.toBackground.lastCall.args, [], 'toBackground');
        assert.deepEqual(trigger.lastCall.args, ['selectionChanged', { target: this.element.proxy, state: false }], 'event');
    });

    QUnit.test('Set selected when not drawn', function (assert) {
        const trigger = sinon.spy();
        this.context.params = { eventTrigger: trigger };
        this.context.selection = { state: {} };

        this.element.setSelected(true);
        this.element.setSelected(false);

        assert.strictEqual(trigger.lastCall, null);
    });

    QUnit.test('Proxy fields', function (assert) {
        assert.strictEqual(this.element.proxy.layer, this.context.layer, 'layer');
        assert.strictEqual(this.element.proxy.index, this.index, 'index');
        assert.strictEqual(this.element.proxy.data, this.data, 'data');
    });

    QUnit.test('Proxy.coordinates', function (assert) {
        assert.strictEqual(this.element.proxy.coordinates(), this.coordinates);
    });

    QUnit.test('Proxy.attribute', function (assert) {
        assert.strictEqual(this.element.proxy.attribute('prop1'), undefined, 'getter');
        assert.strictEqual(this.element.proxy.attribute('prop1', 'test-1'), this.element.proxy, 'return value - setter');
        assert.deepEqual(this.element.proxy.attribute(), { prop1: 'test-1', tag: 'attributes' }, 'getter - all');
        assert.strictEqual(this.element.proxy.attribute('prop1'), 'test-1', 'getter');
    });

    QUnit.test('Proxy.selected getter', function (assert) {
        const stub = sinon.stub(this.element, 'isSelected').returns('val');
        assert.strictEqual(this.element.proxy.selected(), 'val');
        assert.deepEqual(stub.lastCall.args, []);
    });

    QUnit.test('Proxy.selected setter', function (assert) {
        const spy = sinon.spy(this.element, 'setSelected');
        assert.strictEqual(this.element.proxy.selected('a', 'b'), this.element.proxy);
        assert.deepEqual(spy.lastCall.args, ['a', 'b']);
    });

    QUnit.test('Proxy.applySettings', function (assert) {
        const spy = sinon.spy(this.element, 'update');
        assert.strictEqual(this.element.proxy.applySettings({ tag: 'settings' }), this.element.proxy);
        assert.deepEqual(spy.lastCall.args, [{ tag: 'settings' }]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/vector_map/map_layer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/vector_map/map_layer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mapLayer.element.tests.js.map