!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/tracker.tests.js"], ["jquery","events/pointer","viz/range_selector/tracker"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.rangeSelector/tracker.tests.js', ['jquery', 'events/pointer', 'viz/range_selector/tracker'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const pointerEvents = $__require('events/pointer');
    const trackerModule = $__require('viz/range_selector/tracker');

    QUnit.testStart(function () {
        const markup = '<div id="area"></div>\
        <div id="selected-area"></div>\
        <div id="slider-1"></div>\
        <div id="slider-2"></div>';

        $('#qunit-fixture').html(markup);
    });

    function createHandler() {
        const handler = sinon.spy();
        handler.complete = sinon.spy();
        return handler;
    }

    function Controller(test) {
        this.test = test;
        test.$slider1 = $('#slider-1');
        test.$slider2 = $('#slider-2');
        test.$areaTracker = $('#area');
        test.$selectedAreaTracker = $('#selected-area');
    }
    Controller.prototype.getTrackerTargets = function () {
        return {
            area: this.test.$areaTracker,
            selectedArea: this.test.$selectedAreaTracker,
            sliders: [this.test.$slider1, this.test.$slider2]
        };
    };

    const environment = {
        beforeEach: function () {
            const controller = new Controller(this);
            this.tracker = new trackerModule.Tracker({
                renderer: {
                    getRootOffset: function () {
                        return { left: 25 };
                    },
                    root: { css: sinon.spy() }
                },
                controller: controller
            });
            this.init(controller);
            this.update();
        },

        afterEach: function () {
            this.tracker.dispose();
        },

        update: function (options) {
            options = options || {};
            this.tracker.update(!('enabled' in options) || options.enabled, {
                moveSelectedRangeByClick: !('moveSelectedRangeByClick' in options) || options.moveSelectedRangeByClick,
                manualRangeSelectionEnabled: !('manualRangeSelectionEnabled' in options) || options.manualRangeSelectionEnabled
            });
        },

        trigger: function ($target, name, position, isTouch, isOtherButton) {
            const $event = $.Event(pointerEvents[name]);
            $event.originalEvent = $.Event(pointerEvents[name]);

            if (isTouch) {
                $event.originalEvent.touches = position.length ? $.map(position, function (pos) {
                    return { pageX: pos };
                }) : [{ pageX: position }];
            } else {
                $event.pageX = position;
                $event.which = 1;
                if (isOtherButton) {
                    $event.which = 2;
                }
            }
            ($target || $(document)).trigger($event);
            return $event;
        }
    };

    QUnit.module('Move selected area', $.extend({}, environment, {
        init: function (controller) {
            this.moveSelectedArea = controller.moveSelectedArea = sinon.spy();
        }
    }));

    QUnit.test('Performed', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200);
        const event = this.trigger(null, 'up', 195);

        assert.deepEqual(this.moveSelectedArea.lastCall.args, [170, event]);
    });

    QUnit.test('Performed (touch)', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200, true);
        const event = this.trigger(null, 'up', 195, true);

        assert.deepEqual(this.moveSelectedArea.lastCall.args, [170, event]);
    });

    QUnit.test('Canceled by pointer distance', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200);
        this.trigger(null, 'up', 211);

        assert.strictEqual(this.moveSelectedArea.lastCall, null);
    });

    QUnit.test('Disabled by total option', function (assert) {
        this.update({ enabled: false });
        this.trigger(this.$areaTracker, 'down', 200);
        this.trigger(null, 'up', 195);

        assert.strictEqual(this.moveSelectedArea.lastCall, null);
    });

    QUnit.test('Disabled by option', function (assert) {
        this.update({ moveSelectedRangeByClick: false });
        this.trigger(this.$areaTracker, 'down', 200);
        this.trigger(null, 'up', 195);

        assert.strictEqual(this.moveSelectedArea.lastCall, null);
    });

    QUnit.module('Placing one slider and moving other', $.extend({}, environment, {
        init: function (controller) {
            this.placeSliderAndBeginMoving = controller.placeSliderAndBeginMoving = sinon.spy(createHandler);
        }
    }));

    QUnit.test('Performed', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200);
        const startEvent = this.trigger(null, 'move', 215);
        const firstEvent = this.trigger(null, 'move', 220);
        const secondEvent = this.trigger(null, 'move', 225);
        const endEvent = this.trigger(null, 'up', 230);

        assert.deepEqual(this.placeSliderAndBeginMoving.lastCall.args, [175, 190, startEvent]);
        const handler = this.placeSliderAndBeginMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [195, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [200, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Performed (touch)', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200, true);
        const startEvent = this.trigger(null, 'move', 215, true);
        const firstEvent = this.trigger(null, 'move', 220, true);
        const secondEvent = this.trigger(null, 'move', 225, true);
        const endEvent = this.trigger(null, 'up', 230, true);

        assert.deepEqual(this.placeSliderAndBeginMoving.lastCall.args, [175, 190, startEvent]);
        const handler = this.placeSliderAndBeginMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [195, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [200, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Completed on move when non left button is pressed', function (assert) {
        this.trigger(this.$areaTracker, 'down', 200);
        const startEvent = this.trigger(null, 'move', 215);
        const event = this.trigger(null, 'move', 220);
        const endEvent = this.trigger(null, 'move', 225, false, true);

        assert.deepEqual(this.placeSliderAndBeginMoving.lastCall.args, [175, 190, startEvent]);
        const handler = this.placeSliderAndBeginMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [195, event]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Disabled by total option', function (assert) {
        this.update({ enabled: false });
        this.trigger(this.$areaTracker, 'down', 200);
        this.trigger(null, 'move', 215);

        assert.strictEqual(this.placeSliderAndBeginMoving.lastCall, null);
    });

    QUnit.test('Disabled by option', function (assert) {
        this.update({ manualRangeSelectionEnabled: false });
        this.trigger(this.$areaTracker, 'down', 200);
        this.trigger(null, 'move', 215);

        assert.strictEqual(this.placeSliderAndBeginMoving.lastCall, null);
    });

    QUnit.module('Moving selected area', $.extend({}, environment, {
        init: function (controller) {
            this.beginSelectedAreaMoving = controller.beginSelectedAreaMoving = sinon.spy(createHandler);
        }
    }));

    QUnit.test('Performed', function (assert) {
        this.trigger(this.$selectedAreaTracker, 'down', 200);
        const firstEvent = this.trigger(null, 'move', 210);
        const secondEvent = this.trigger(null, 'move', 250);
        const endEvent = this.trigger(null, 'up', 280);

        assert.deepEqual(this.beginSelectedAreaMoving.lastCall.args, [175]);
        const handler = this.beginSelectedAreaMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [225, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Performed (touch)', function (assert) {
        this.trigger(this.$selectedAreaTracker, 'down', 200, true);
        const firstEvent = this.trigger(null, 'move', 210, true);
        const secondEvent = this.trigger(null, 'move', 250, true);
        const endEvent = this.trigger(null, 'up', 280, true);

        assert.deepEqual(this.beginSelectedAreaMoving.lastCall.args, [175]);
        const handler = this.beginSelectedAreaMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [225, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Completed on move when non left button is pressed', function (assert) {
        this.trigger(this.$selectedAreaTracker, 'down', 200);
        const firstEvent = this.trigger(null, 'move', 210);
        const endEvent = this.trigger(null, 'move', 250, false, true);

        assert.deepEqual(this.beginSelectedAreaMoving.lastCall.args, [175]);
        const handler = this.beginSelectedAreaMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, firstEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Default prevention and propagation stopping on down', function (assert) {
        const $eventDown = this.trigger(this.$selectedAreaTracker, 'down', 200);
        const $eventMove = this.trigger(null, 'move', 250);

        assert.strictEqual($eventDown.isDefaultPrevented(), true, 'prevent default - down');
        assert.strictEqual($eventDown.isPropagationStopped(), true, 'stop propagation - down');
        assert.strictEqual($eventMove.isDefaultPrevented(), true, 'prevent default - move');
        assert.strictEqual($eventMove.isPropagationStopped(), false, 'stop propagation - move');
    });

    QUnit.test('Disabled by total option', function (assert) {
        this.update({ enabled: false });
        this.trigger(this.$selectedAreaTracker, 'down', 200);
        this.trigger(null, 'move', 215);

        assert.strictEqual(this.beginSelectedAreaMoving.lastCall, null);
    });

    QUnit.module('Slider moving', $.extend({}, environment, {
        init: function (controller) {
            this.beginSliderMoving = controller.beginSliderMoving = sinon.spy(createHandler);
            this.foregroundSlider = controller.foregroundSlider = sinon.spy();
        }
    }));

    QUnit.test('Performed', function (assert) {
        this.trigger(this.$slider1, 'down', 200);
        const firstEvent = this.trigger(null, 'move', 210);
        const secondEvent = this.trigger(null, 'move', 250);
        const endEvent = this.trigger(null, 'up', 280);

        assert.deepEqual(this.beginSliderMoving.lastCall.args, [0, 175]);
        const handler = this.beginSliderMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [225, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Performed (touch)', function (assert) {
        this.trigger(this.$slider2, 'down', 200, true);
        const firstEvent = this.trigger(null, 'move', 210, true);
        const secondEvent = this.trigger(null, 'move', 250, true);
        const endEvent = this.trigger(null, 'up', 280, true);

        assert.deepEqual(this.beginSliderMoving.lastCall.args, [1, 175]);
        const handler = this.beginSliderMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, firstEvent]);
        assert.deepEqual(handler.getCall(1).args, [225, secondEvent]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Completed on move when non left button is pressed', function (assert) {
        this.trigger(this.$slider1, 'down', 200);
        const event = this.trigger(null, 'move', 210);
        const endEvent = this.trigger(null, 'move', 250, false, true);

        assert.deepEqual(this.beginSliderMoving.lastCall.args, [0, 175]);
        const handler = this.beginSliderMoving.lastCall.returnValue;
        assert.deepEqual(handler.getCall(0).args, [185, event]);
        assert.deepEqual(handler.complete.lastCall.args, [endEvent]);
    });

    QUnit.test('Default prevention and propagation stopping on down', function (assert) {
        const $eventDown = this.trigger(this.$slider2, 'down', 200);
        const $eventMove = this.trigger(null, 'move', 250);

        assert.strictEqual($eventDown.isDefaultPrevented(), true, 'prevent default - down');
        assert.strictEqual($eventDown.isPropagationStopped(), true, 'stop propagation - down');
        assert.strictEqual($eventMove.isDefaultPrevented(), true, 'prevent default - move');
        assert.strictEqual($eventMove.isPropagationStopped(), false, 'stop propagation - move');
    });

    QUnit.test('Disabled by total option', function (assert) {
        this.update({ enabled: false });
        this.trigger(this.$slider1, 'down', 200);
        this.trigger(null, 'move', 215);

        assert.strictEqual(this.beginSliderMoving.lastCall, null);
    });

    QUnit.test('Slider is foregrounded on move', function (assert) {
        this.trigger(this.$slider1, 'move', 210);
        this.trigger(this.$slider2, 'move', 220);

        assert.deepEqual(this.foregroundSlider.getCall(0).args, [0]);
        assert.deepEqual(this.foregroundSlider.getCall(1).args, [1]);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","events/pointer","viz/range_selector/tracker"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("events/pointer"), require("viz/range_selector/tracker"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tracker.tests.js.map