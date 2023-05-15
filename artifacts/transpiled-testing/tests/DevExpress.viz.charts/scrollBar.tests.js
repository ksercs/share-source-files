!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/scrollBar.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/chart_components/scroll_bar","viz/translators/translator2d","../../helpers/pointerMock.js","events/drag"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.charts/scrollBar.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/chart_components/scroll_bar", "viz/translators/translator2d", "../../helpers/pointerMock.js", "events/drag"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      ScrollBar,
      translator2DModule,
      pointerMock,
      dragEvents,
      Translator,
      canvas,
      range,
      environment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      ScrollBar = $__m.ScrollBar;
    }, function($__m) {
      translator2DModule = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      dragEvents = $__m.default;
    }],
    execute: function() {
      Translator = vizMocks.stubClass(translator2DModule.Translator2D);
      canvas = {
        top: 10,
        bottom: 15,
        left: 20,
        right: 25,
        width: 600,
        height: 400
      };
      range = {
        min: 10,
        max: 100,
        minVisible: 30,
        maxVisible: 90,
        categories: [],
        visibleCategories: [],
        inverted: true
      };
      environment = {
        beforeEach: function() {
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          sinon.stub(translator2DModule, 'Translator2D').callsFake(function() {
            var stub = new Translator();
            stub.getScale = sinon.stub().returns(1);
            stub.stub('getCanvasVisibleArea');
            return stub;
          });
          this.options = {
            rotated: false,
            color: 'fill',
            width: 10,
            offset: 5,
            opacity: 0.5,
            visible: true
          };
        },
        afterEach: function() {
          this.renderer.dispose();
          this.renderer = null;
          this.options = null;
          translator2DModule.Translator2D.restore();
        }
      };
      QUnit.module('dxChart scrollBar', environment);
      QUnit.test('create scrollBar', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        assert.ok(scrollBar);
        assert.ok(translator2DModule.Translator2D.calledOnce);
        assert.deepEqual(translator2DModule.Translator2D.lastCall.args, [{}, {}, {}]);
        assert.equal(this.renderer.rect.callCount, 1);
        assert.deepEqual(this.renderer.rect.firstCall.args, []);
        assert.equal(group.children.length, 1);
        assert.equal(group.children[0].typeOfNode, 'rect');
      });
      QUnit.test('init scrollBar', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        scrollBar.update(this.options).updateSize(canvas);
        scrollBar.init(range, false);
        assert.ok(translator2DModule.Translator2D.calledOnce);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        assert.ok(scrollTranslator.update.calledOnce);
        assert.deepEqual(scrollTranslator.update.lastCall.args, [{
          categories: [],
          inverted: true,
          max: 100,
          maxVisible: null,
          min: 10,
          minVisible: null,
          visibleCategories: null
        }, canvas, {
          isHorizontal: true,
          stick: false
        }]);
      });
      QUnit.test('init scrollBar. Rotated', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        this.options.rotated = true;
        scrollBar.update(this.options).updateSize(canvas);
        scrollBar.init(range, false);
        assert.ok(translator2DModule.Translator2D.calledOnce);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        assert.ok(scrollTranslator.update.calledOnce);
        assert.deepEqual(scrollTranslator.update.lastCall.args, [{
          categories: [],
          inverted: true,
          max: 100,
          maxVisible: null,
          min: 10,
          minVisible: null,
          visibleCategories: null
        }, canvas, {
          isHorizontal: false,
          stick: false
        }]);
      });
      QUnit.test('init scrollBar. Remove min and max ', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var discreteRange = $.extend({}, range, {axisType: 'discrete'});
        scrollBar.update(this.options).updateSize(canvas);
        scrollBar.init(discreteRange, false);
        assert.ok(translator2DModule.Translator2D.calledOnce);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        assert.ok(scrollTranslator.update.calledOnce);
        assert.deepEqual(scrollTranslator.update.lastCall.args, [{
          categories: [],
          inverted: true,
          max: null,
          maxVisible: null,
          min: null,
          minVisible: null,
          visibleCategories: null,
          axisType: 'discrete'
        }, canvas, {
          isHorizontal: true,
          stick: false
        }]);
      });
      QUnit.test('update scrollBar', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        scrollBar.update(this.options);
        assert.deepEqual(group.children[0]._stored_settings, {
          fill: 'fill',
          rotate: -90,
          rotateX: 0,
          rotateY: 0,
          width: 10,
          opacity: 0.5
        });
        assert.deepEqual(scrollBar.getOptions(), {
          offset: 5,
          vertical: false,
          position: 'top',
          width: 10
        });
      });
      QUnit.test('update scrollBar. Rotated', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        this.options.rotated = true;
        scrollBar.update(this.options);
        assert.deepEqual(group.children[0]._stored_settings, {
          fill: 'fill',
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 0.5,
          width: 10
        });
        assert.deepEqual(scrollBar.getOptions(), {
          offset: 5,
          vertical: true,
          position: 'right',
          width: 10
        });
      });
      QUnit.test('setPosition by arguments. Both arguments in range', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('70').returns(75);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0]._stored_settings, {
          y: 45,
          height: 30
        });
      });
      QUnit.test('setPosition by arguments. Discrete axis. stick false', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group).update(this.options).init($.extend({}, range, {axisType: 'discrete'}), false);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40', -1).returns(40);
        scrollTranslator.translate.withArgs('40', +1).returns(50);
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('70', -1).returns(70);
        scrollTranslator.translate.withArgs('70', +1).returns(80);
        scrollTranslator.translate.withArgs('70').returns(75);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0].attr.lastCall.args[0], {
          y: 40,
          height: 40
        });
      });
      QUnit.test('setPosition by arguments. Discrete axis. stick true', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group).update(this.options).init($.extend({}, range, {axisType: 'discrete'}), true);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40', -1).returns(40);
        scrollTranslator.translate.withArgs('40', +1).returns(50);
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('70', -1).returns(70);
        scrollTranslator.translate.withArgs('70', +1).returns(80);
        scrollTranslator.translate.withArgs('70').returns(75);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0].attr.lastCall.args[0], {
          y: 45,
          height: 30
        });
      });
      QUnit.test('setPosition by arguments. Stick false', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group).update(this.options).init($.extend({}, range), false);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40', -1).returns(40);
        scrollTranslator.translate.withArgs('40', +1).returns(50);
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('70', -1).returns(70);
        scrollTranslator.translate.withArgs('70', +1).returns(80);
        scrollTranslator.translate.withArgs('70').returns(75);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0].attr.lastCall.args[0], {
          y: 45,
          height: 30
        });
      });
      QUnit.test('setPosition by arguments.Stick true', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group).update(this.options).init($.extend({}, range), true);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40', -1).returns(40);
        scrollTranslator.translate.withArgs('40', +1).returns(50);
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('70', -1).returns(70);
        scrollTranslator.translate.withArgs('70', +1).returns(80);
        scrollTranslator.translate.withArgs('70').returns(75);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0].attr.lastCall.args[0], {
          y: 45,
          height: 30
        });
      });
      QUnit.test('setPosition by arguments. Both arguments are undefined', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('canvas_position_start').returns(10);
        scrollTranslator.translate.withArgs('canvas_position_end').returns(100);
        scrollTranslator.translate.returns(null);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition(undefined, undefined);
        assert.deepEqual(group.children[0]._stored_settings, {
          y: 10,
          height: 90
        });
      });
      QUnit.test('setPosition by arguments. Both arguments out of canvas', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.returns(null);
        scrollTranslator.translate.withArgs('40').returns(5);
        scrollTranslator.translate.withArgs('70').returns(110);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '70');
        assert.deepEqual(group.children[0]._stored_settings, {
          y: 10,
          height: 90
        });
      });
      QUnit.test('setPosition by arguments. min = max', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '40');
        assert.deepEqual(group.children[0]._stored_settings, {
          y: 45,
          height: 2
        });
      });
      QUnit.test('setPosition by arguments. minSize', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
        scrollTranslator.translate = sinon.stub();
        scrollTranslator.translate.withArgs('40').returns(45);
        scrollTranslator.translate.withArgs('41').returns(46.9);
        scrollTranslator.getCanvasVisibleArea.returns({
          min: 10,
          max: 100
        });
        scrollBar.setPosition('40', '41');
        assert.deepEqual(group.children[0]._stored_settings, {
          y: 45,
          height: 2
        });
      });
      QUnit.test('Disposing', function(assert) {
        var group = new vizMocks.Element();
        var scrollBar = new ScrollBar(this.renderer, group);
        var element = group.children[0];
        scrollBar.dispose();
        assert.ok(!this.renderer.stub('dispose').called);
        assert.ok(!group.children.length);
        assert.ok(element.dispose.called);
      });
      QUnit.module('Scroll moving', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.group = new vizMocks.Element();
          this.scrollBar = new ScrollBar(this.renderer, this.group).update(this.options);
          this.scrollTranslator = translator2DModule.Translator2D.lastCall.returnValue;
          this.scrollTranslator.translate = sinon.stub();
          this.scrollTranslator.getCanvasVisibleArea.returns({
            min: 10,
            max: 100
          });
          this.scrollTranslator.canvasLength = 90;
          this.startEventsHandler = sinon.spy();
          this.moveEventsHandler = sinon.spy();
          this.endEventsHandler = sinon.spy();
          $(this.group.children[0].element).on('dxc-scroll-start', this.startEventsHandler);
          $(this.group.children[0].element).on('dxc-scroll-move', this.moveEventsHandler);
          $(this.group.children[0].element).on('dxc-scroll-end', this.endEventsHandler);
          this.pointer = pointerMock(this.group.children[0].element);
        },
        afterEach: function() {
          environment.afterEach.call(this);
          this.scrollBar.dispose();
          this.scrollBar = null;
          $(this.group.element).removeData();
          this.group = null;
          this.scrollTranslator = null;
          this.startEventsHandler = null;
          this.moveEventsHandler = null;
          this.endEventsHandler = null;
        }
      });
      QUnit.test('pointer down on scroll', function(assert) {
        this.pointer.start({
          x: 100,
          y: 200
        }).dragStart();
        assert.ok(this.startEventsHandler.calledOnce);
        assert.deepEqual(this.startEventsHandler.firstCall.args[0].originalEvent.type, dragEvents.start);
      });
      QUnit.test('move scroll when scale = 1', function(assert) {
        this.scrollTranslator.translate.withArgs(40).returns(10);
        this.scrollTranslator.translate.withArgs(70).returns(100);
        this.scrollBar.setPosition(40, 70);
        this.pointer.start({
          x: 100,
          y: 200
        }).dragStart().drag(-70, -130).drag(-50, -150);
        assert.ok(this.startEventsHandler.calledOnce);
        assert.deepEqual(this.moveEventsHandler.firstCall.args[0].originalEvent.type, dragEvents.move);
        assert.deepEqual(this.moveEventsHandler.firstCall.args[0].offset, {
          x: -30,
          y: -70
        });
        assert.deepEqual(this.moveEventsHandler.lastCall.args[0].offset, {
          x: 20,
          y: 80
        });
        assert.equal(this.moveEventsHandler.callCount, 2);
        assert.equal(this.group.children[0]._stored_settings.height, 70);
        assert.equal(this.group.children[0]._stored_settings.y, 10);
      });
      QUnit.test('move scroll when scale != 1', function(assert) {
        this.scrollTranslator.translate.withArgs(40).returns(30);
        this.scrollTranslator.translate.withArgs(70).returns(75);
        this.scrollTranslator.getScale.withArgs(40, 70).returns(2);
        this.scrollBar.setPosition(40, 70);
        this.pointer.start({
          x: 100,
          y: 200
        }).dragStart().drag(-70, -130).drag(-50, -150);
        assert.ok(this.startEventsHandler.calledOnce);
        assert.deepEqual(this.moveEventsHandler.firstCall.args[0].offset, {
          x: -60,
          y: -140
        });
        assert.deepEqual(this.moveEventsHandler.lastCall.args[0].offset, {
          x: 40,
          y: 160
        });
        assert.equal(this.moveEventsHandler.callCount, 2);
        assert.equal(this.group.children[0]._stored_settings.height, 45);
        assert.equal(this.group.children[0]._stored_settings.y, 10);
      });
      QUnit.test('move scroll when scale != 1. Rotated', function(assert) {
        this.options.rotated = true;
        this.scrollBar.update(this.options);
        this.scrollTranslator.translate.withArgs(40).returns(30);
        this.scrollTranslator.translate.withArgs(70).returns(75);
        this.scrollTranslator.getScale.withArgs(40, 70).returns(2);
        this.scrollBar.setPosition(40, 70);
        this.pointer.start({
          x: 200,
          y: 100
        }).dragStart().drag(-130, -70).drag(-150, -50);
        assert.ok(this.startEventsHandler.calledOnce);
        assert.deepEqual(this.moveEventsHandler.firstCall.args[0].offset, {
          x: -140,
          y: -60
        });
        assert.deepEqual(this.moveEventsHandler.lastCall.args[0].offset, {
          x: 160,
          y: 40
        });
        assert.equal(this.moveEventsHandler.callCount, 2);
        assert.equal(this.group.children[0]._stored_settings.height, 45);
        assert.equal(this.group.children[0]._stored_settings.y, 10);
      });
      QUnit.test('Fire scrollEnd event on dragend', function(assert) {
        this.scrollTranslator.translate.withArgs(40).returns(10);
        this.scrollTranslator.translate.withArgs(70).returns(100);
        this.scrollBar.setPosition(40, 70);
        this.pointer.start({
          x: 100,
          y: 200
        }).dragStart().drag(-70, -130).dragEnd();
        assert.ok(this.moveEventsHandler.calledOnce);
        assert.ok(this.endEventsHandler.calledOnce);
        assert.deepEqual(this.moveEventsHandler.firstCall.args[0].offset, {
          x: -30,
          y: -70
        });
        assert.deepEqual(this.endEventsHandler.firstCall.args[0].offset, {
          x: -30,
          y: -70
        });
        assert.deepEqual(this.endEventsHandler.firstCall.args[0].originalEvent.type, dragEvents.end);
      });
      QUnit.module('scrollBar layouting', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.getOptions = function(options) {
            return $.extend(true, {}, this.options, options);
          };
          this.panes = [{
            name: 'pane1',
            canvas: {
              left: 10,
              top: 100,
              right: 15,
              bottom: 150,
              width: 20,
              height: 200
            }
          }, {
            name: 'pane2',
            canvas: {
              left: 70,
              right: 75,
              bottom: 350,
              top: 700,
              width: 80,
              height: 800
            }
          }];
        },
        afterEach: function() {
          environment.afterEach.call(this);
        }
      });
      QUnit.test('Set position for horizontal scrollBar', function(assert) {
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var pos1 = scrollBar.update(this.getOptions({})).getOptions().position;
        var pos2 = scrollBar.update(this.getOptions({position: 'top'})).getOptions().position;
        var pos3 = scrollBar.update(this.getOptions({position: 'bottom'})).getOptions().position;
        var pos4 = scrollBar.update(this.getOptions({position: 'left'})).getOptions().position;
        var pos5 = scrollBar.update(this.getOptions({position: 'right'})).getOptions().position;
        var pos6 = scrollBar.update(this.getOptions({position: 'invalid'})).getOptions().position;
        assert.strictEqual(pos1, 'top');
        assert.strictEqual(pos2, 'top');
        assert.strictEqual(pos3, 'bottom');
        assert.strictEqual(pos4, 'top');
        assert.strictEqual(pos5, 'top');
        assert.strictEqual(pos6, 'top');
      });
      QUnit.test('Set position for vertical scrollBar', function(assert) {
        this.options.rotated = true;
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var pos1 = scrollBar.update(this.getOptions({})).getOptions().position;
        var pos2 = scrollBar.update(this.getOptions({position: 'top'})).getOptions().position;
        var pos3 = scrollBar.update(this.getOptions({position: 'bottom'})).getOptions().position;
        var pos4 = scrollBar.update(this.getOptions({position: 'left'})).getOptions().position;
        var pos5 = scrollBar.update(this.getOptions({position: 'right'})).getOptions().position;
        var pos6 = scrollBar.update(this.getOptions({position: 'invalid'})).getOptions().position;
        assert.strictEqual(pos1, 'right');
        assert.strictEqual(pos2, 'right');
        assert.strictEqual(pos3, 'right');
        assert.strictEqual(pos4, 'left');
        assert.strictEqual(pos5, 'right');
        assert.strictEqual(pos6, 'right');
      });
      QUnit.test('setPane', function(assert) {
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var p1 = scrollBar.update(this.getOptions({position: 'top'})).setPane(this.panes).pane;
        var p2 = scrollBar.update(this.getOptions({position: 'bottom'})).setPane(this.panes).pane;
        assert.strictEqual(p1, 'pane1');
        assert.strictEqual(p2, 'pane2');
      });
      QUnit.test('setPane. Rotated', function(assert) {
        this.options.rotated = true;
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var p1 = scrollBar.update(this.getOptions({position: 'left'})).setPane(this.panes).pane;
        var p2 = scrollBar.update(this.getOptions({position: 'right'})).setPane(this.panes).pane;
        assert.strictEqual(p1, 'pane1');
        assert.strictEqual(p2, 'pane2');
      });
      QUnit.test('getMargins', function(assert) {
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var pane = {name: 'testPane'};
        var b1 = scrollBar.update(this.getOptions({position: 'top'})).setPane([pane]).getMargins();
        var b2 = scrollBar.update(this.getOptions({position: 'bottom'})).setPane([pane]).getMargins();
        assert.deepEqual(b1, {
          top: 15,
          bottom: 0,
          left: 0,
          right: 0
        }, 'top scrollBar');
        assert.deepEqual(b2, {
          top: 0,
          bottom: 15,
          left: 0,
          right: 0
        }, 'bottom scrollBar');
      });
      QUnit.test('getMargins. Rotated', function(assert) {
        this.options.rotated = true;
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var pane = {name: 'testPane'};
        var b1 = scrollBar.update(this.getOptions({position: 'right'})).setPane([pane]).getMargins();
        var b2 = scrollBar.update(this.getOptions({position: 'left'})).setPane([pane]).getMargins();
        assert.deepEqual(b1, {
          top: 0,
          bottom: 0,
          left: 0,
          right: 15
        }, 'top scrollBar');
        assert.deepEqual(b2, {
          top: 0,
          bottom: 0,
          left: 15,
          right: 0
        }, 'bottom scrollBar');
      });
      QUnit.test('UpdateSize', function(assert) {
        var scrollBar = new ScrollBar(this.renderer, this.group);
        scrollBar.update(this.getOptions({position: 'top'})).setPane(this.panes).updateSize(this.panes[0].canvas);
        scrollBar.update(this.getOptions({position: 'bottom'})).setPane(this.panes).updateSize(this.panes[1].canvas);
        assert.deepEqual(this.group.children[0].attr.getCall(1).args, [{
          translateX: 0,
          translateY: 95
        }], 'top scrollBar');
        assert.deepEqual(this.group.children[0].attr.getCall(3).args, [{
          translateX: 0,
          translateY: 465
        }], 'top scrollBar');
      });
      QUnit.test('Apply layout. Rotated', function(assert) {
        this.options.rotated = true;
        var scrollBar = new ScrollBar(this.renderer, this.group);
        scrollBar.update(this.getOptions({position: 'right'})).setPane(this.panes).updateSize(this.panes[1].canvas);
        scrollBar.update(this.getOptions({position: 'left'})).setPane(this.panes).updateSize(this.panes[0].canvas);
        assert.deepEqual(this.group.children[0].attr.getCall(1).args, [{
          translateX: 10,
          translateY: 0
        }], 'right scrollBar');
        assert.deepEqual(this.group.children[0].attr.getCall(3).args, [{
          translateX: -5,
          translateY: 0
        }], 'left scrollBar');
      });
      QUnit.test('getMultipleAxesSpacing', function(assert) {
        this.options.rotated = true;
        var scrollBar = new ScrollBar(this.renderer, this.group);
        var res = scrollBar.getMultipleAxesSpacing();
        assert.strictEqual(res, 0);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/chart_components/scroll_bar","viz/translators/translator2d","../../helpers/pointerMock.js","events/drag"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/chart_components/scroll_bar"), require("viz/translators/translator2d"), require("../../helpers/pointerMock.js"), require("events/drag"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollBar.tests.js.map