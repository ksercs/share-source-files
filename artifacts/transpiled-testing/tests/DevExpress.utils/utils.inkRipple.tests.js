!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.utils/utils.inkRipple.tests.js"], ["jquery","ui/widget/utils.ink_ripple","animation/fx"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.utils/utils.inkRipple.tests.js', ['jquery', 'ui/widget/utils.ink_ripple', 'animation/fx'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const inkRipple = $__require('ui/widget/utils.ink_ripple');
    const fx = $__require('animation/fx');

    const INKRIPPLE_CLASS = 'dx-inkripple';
    const INKRIPPLE_WAVE_CLASS = 'dx-inkripple-wave';
    const INKRIPPLE_WAVE_SHOWING_CLASS = 'dx-inkripple-showing';
    const INKRIPPLE_WAVE_HIDING_CLASS = 'dx-inkripple-hiding';

    const moduleConfig = {
        beforeEach: function () {
            fx.off = true;
            this.clock = sinon.useFakeTimers();
            this.$element = $('<div>').appendTo('#qunit-fixture');
        },
        afterEach: function () {
            fx.off = false;
            this.clock.restore();
            this.$element.remove();
        }
    };

    QUnit.module('rendering', moduleConfig);

    QUnit.test('inkRipple is rendered after the first \'showWave\' call', function (assert) {
        const $element = $('<div>');
        const inkRippleInstance = inkRipple.render();

        assert.equal($element.find('.' + INKRIPPLE_CLASS).length, 0, 'inkRipple element is not rendered before first active event');

        inkRippleInstance.showWave({ element: $element, event: {} });
        assert.equal($element.find('.' + INKRIPPLE_CLASS).length, 1, 'inkRipple element is rendered inside element');
    });

    QUnit.test('wave class depend on called method', function (assert) {
        const inkRippleInstance = inkRipple.render();

        inkRippleInstance.showWave({ element: this.$element, event: {} });
        const $wave = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);
        this.clock.tick();

        assert.ok($wave.hasClass(INKRIPPLE_WAVE_SHOWING_CLASS), 'wave has showing class after the \'showWave\' method call');
        assert.ok(!$wave.hasClass(INKRIPPLE_WAVE_HIDING_CLASS), 'wave has no hiding class after the \'showWave\' method call');

        inkRippleInstance.hideWave({ element: this.$element, event: {} });
        this.clock.tick();

        assert.ok($wave.hasClass(INKRIPPLE_WAVE_HIDING_CLASS), 'wave has hiding class after the \'hideWave\' method call');
        assert.ok(!$wave.hasClass(INKRIPPLE_WAVE_SHOWING_CLASS), 'wave has no showing class after the \'hideWave\' method call');
    });

    QUnit.test('showing wave class is removed if call hideWave after showWave immediately', function (assert) {
        const inkRippleInstance = inkRipple.render();

        inkRippleInstance.showWave({ element: this.$element, event: {} });
        const $wave = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);

        inkRippleInstance.hideWave({ element: this.$element, event: {} });
        this.clock.tick();
        assert.ok(!$wave.hasClass(INKRIPPLE_WAVE_SHOWING_CLASS), 'wave has no showing class after the \'hideWave\' method call');
    });

    QUnit.test('number of waves depend on \'wavesNumber\' option', function (assert) {
        const wavesNumber = 2;
        const inkRippleInstance = inkRipple.render({
            wavesNumber: wavesNumber
        });

        inkRippleInstance.showWave({ element: this.$element, event: {} });
        const $waves = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);
        assert.equal($waves.length, wavesNumber, 'the number of waves is correct');
    });

    QUnit.test('ink ripple wave has correct size', function (assert) {
        const elementSize = 30;
        const borderSize = 2;
        const waveSize = parseInt(Math.sqrt(2) * (elementSize + 2 + borderSize));
        this.$element.css({
            height: elementSize,
            width: elementSize,
            border: borderSize + 'px solid black'
        });
        const waveSizeCoefficient = 3;
        const inkRippleInstance = inkRipple.render({
            waveSizeCoefficient: waveSizeCoefficient
        });

        inkRippleInstance.showWave({ element: this.$element, event: {} });
        const $wave = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);

        assert.equal($wave.height(), waveSize * waveSizeCoefficient, 'wave height is correct');
        assert.equal($wave.width(), waveSize * waveSizeCoefficient, 'wave width is correct');
    });

    QUnit.test('ink ripple wave size is diagonal size of element', function (assert) {
        const elementHeight = 30;
        const elementWidth = 50;
        const waveSize = parseInt(Math.sqrt(elementHeight * elementHeight + elementWidth * elementWidth));
        this.$element.css({
            height: elementHeight,
            width: elementWidth
        });
        const inkRippleInstance = inkRipple.render({
            waveSizeCoefficient: 1
        });

        inkRippleInstance.showWave({ element: this.$element, event: {} });
        const $wave = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);

        assert.equal($wave.height(), $wave.width(), 'wave height and width are equal');
        assert.equal($wave.height(), waveSize, 'wave size is correct');
    });

    QUnit.test('wave is rendered in the center of ink ripple if the \'isCentered\' option is set to true', function (assert) {
        const elementWidth = 30;
        const elementHeight = 40;
        const waveSize = parseInt(Math.sqrt(elementHeight * elementHeight + elementWidth * elementWidth));
        this.$element.css({
            width: elementWidth,
            height: elementHeight
        });
        const waveSizeCoefficient = 2;
        const rippleSize = waveSize * waveSizeCoefficient;
        const inkRippleInstance = inkRipple.render({
            waveSizeCoefficient: waveSizeCoefficient,
            isCentered: true
        });

        inkRippleInstance.showWave({ element: this.$element, event: {} });

        const $wave = this.$element.find('.' + INKRIPPLE_WAVE_CLASS);
        const expectedLeft = (elementWidth - rippleSize) / 2;
        const expectedTop = (elementHeight - rippleSize) / 2;

        assert.equal(parseInt($wave.css('left')), expectedLeft, 'the \'left\' position is correct');
        assert.equal(parseInt($wave.css('top')), expectedTop, 'the \'right\' position is correct');
    });

    QUnit.test('wave is rendered in place of click by default', function (assert) {
        const elementSize = 30;
        const waveSize = parseInt(Math.sqrt(2) * elementSize);
        const $element = $('<div>').css({
            height: elementSize,
            width: elementSize
        });
        const waveSizeCoefficient = 2;
        const rippleSize = waveSize * waveSizeCoefficient;
        const inkRippleInstance = inkRipple.render({
            waveSizeCoefficient: waveSizeCoefficient
        });

        const pageX = 10;
        const pageY = 20;
        const e = $.Event('dxactive', {
            element: $element,
            pageX: pageX,
            pageY: pageY
        });

        inkRippleInstance.showWave({ element: $element, event: e });

        const $wave = $element.find('.' + INKRIPPLE_WAVE_CLASS);
        const wavePosition = $wave.position();

        assert.equal(parseInt($wave.css('left')), pageX - wavePosition.left - rippleSize / 2, 'the \'left\' position is correct');
        assert.equal(parseInt($wave.css('top')), pageY - wavePosition.top - rippleSize / 2, 'the \'top\' position is correct');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/widget/utils.ink_ripple","animation/fx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/widget/utils.ink_ripple"), require("animation/fx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.inkRipple.tests.js.map