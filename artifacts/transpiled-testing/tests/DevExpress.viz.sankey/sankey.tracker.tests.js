!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.sankey/sankey.tracker.tests.js"], ["jquery","./commonParts/common.js","viz/sankey/tracker","viz/core/tooltip","events/click","events/pointer","viz/sankey/tooltip","core/dom_adapter","viz/sankey/sankey"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.sankey/sankey.tracker.tests.js", ["jquery", "./commonParts/common.js", "viz/sankey/tracker", "viz/core/tooltip", "events/click", "events/pointer", "viz/sankey/tooltip", "core/dom_adapter", "viz/sankey/sankey"], function($__export) {
  "use strict";
  var $,
      common,
      createSankey,
      environment,
      trackerModule,
      tooltipModule,
      clickEventName,
      pointerEvents,
      setTooltipCustomOptions,
      domAdapter,
      dxSankey,
      trackerEnvironment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      common = $__m.default;
      createSankey = $__m.createSankey;
      environment = $__m.environment;
    }, function($__m) {
      trackerModule = $__m.default;
    }, function($__m) {
      tooltipModule = $__m.default;
    }, function($__m) {
      clickEventName = $__m.name;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      setTooltipCustomOptions = $__m.setTooltipCustomOptions;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      dxSankey = $__m.default;
    }],
    execute: function() {
      dxSankey.addPlugin({
        name: 'tracker-test',
        init: function() {
          this._renderer.root.element = $('<div id=\'root\'>').appendTo('#test-container')[0];
        },
        dispose: function() {}
      });
      dxSankey.addPlugin(trackerModule.plugin);
      dxSankey.addPlugin(tooltipModule.plugin);
      setTooltipCustomOptions(dxSankey);
      trackerEnvironment = $.extend({}, environment, {
        beforeEach: function() {
          common.environment.beforeEach.apply(this, arguments);
          this.linksGroupIndex = 0;
          this.nodesGroupIndex = 1;
          this.labelsGroupIndex = 2;
        },
        afterEach: function() {
          environment.afterEach.call(this);
        },
        trigger: function(name, data, options) {
          var $target = $('<div>').appendTo(this.renderer.root.element);
          $target[0][trackerModule._TESTS_dataKey] = data;
          $target.trigger($.Event(name, options));
        }
      });
      QUnit.module('Initialization', trackerEnvironment);
      QUnit.test('Set data for items', function(assert) {
        createSankey({dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }]});
        var nodes = this.nodes();
        var links = this.links();
        assert.equal(nodes.length, 3);
        assert.equal(links.length, 2);
        assert.deepEqual(nodes[0].data.lastCall.args, [trackerModule._TESTS_dataKey, 0]);
        assert.deepEqual(nodes[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 1]);
        assert.deepEqual(nodes[2].data.lastCall.args, [trackerModule._TESTS_dataKey, 2]);
        assert.deepEqual(this.link(0)[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 3]);
        assert.deepEqual(this.link(1)[1].data.lastCall.args, [trackerModule._TESTS_dataKey, 4]);
      });
      QUnit.module('Events', trackerEnvironment);
      QUnit.test('Node hover on. Get item by tracker data', function(assert) {
        var widget = createSankey({dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }]});
        this.trigger(pointerEvents.move, 2);
        assert.strictEqual(widget.getAllNodes()[0].isHovered(), false, 'node state');
        assert.strictEqual(widget.getAllNodes()[1].isHovered(), false, 'node state');
        assert.strictEqual(widget.getAllNodes()[2].isHovered(), true, 'node state');
        assert.strictEqual(widget.getAllLinks()[0].isAdjacentNodeHovered(), true, 'adjacent links hovered');
        assert.strictEqual(widget.getAllLinks()[1].isAdjacentNodeHovered(), true, 'adjacent links hovered');
      });
      QUnit.test('Link hover on. Get item by tracker data', function(assert) {
        var widget = createSankey({dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }]});
        this.trigger(pointerEvents.move, 3);
        assert.strictEqual(widget.getAllNodes()[0].isHovered(), false, 'node state');
        assert.strictEqual(widget.getAllNodes()[1].isHovered(), false, 'node state');
        assert.strictEqual(widget.getAllNodes()[2].isHovered(), false, 'node state');
        assert.strictEqual(widget.getAllLinks()[0].isHovered(), true, 'link state');
        assert.strictEqual(widget.getAllLinks()[1].isHovered(), false, 'link state');
      });
      QUnit.test('Hover off', function(assert) {
        var widget = createSankey({dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }]});
        this.trigger(pointerEvents.move, 2);
        assert.strictEqual(widget.getAllNodes()[2].isHovered(), true, 'node is hovered');
        this.trigger(pointerEvents.move, 3);
        assert.strictEqual(widget.getAllNodes()[1].isHovered(), false, 'node is not hovered');
        assert.strictEqual(widget.getAllLinks()[0].isHovered(), true, 'link is hovered');
      });
      QUnit.test('Click on node', function(assert) {
        this.renderer.offsetTemplate = {
          left: 40,
          top: 30
        };
        var spy = sinon.spy();
        var widget = createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          onNodeClick: spy
        });
        this.trigger(clickEventName, 2, {
          pageX: 400,
          pageY: 300
        });
        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].target, widget.getAllNodes()[2], 'target');
      });
      QUnit.test('Click on link', function(assert) {
        this.renderer.offsetTemplate = {
          left: 40,
          top: 30
        };
        var spy = sinon.spy();
        var widget = createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          node: {width: 5},
          onLinkClick: spy
        });
        this.trigger(clickEventName, 3, {
          pageX: 200,
          pageY: 200
        });
        assert.strictEqual(spy.callCount, 1, 'call count');
        assert.strictEqual(spy.lastCall.args[0].target, widget.getAllLinks()[0], 'target');
      });
      QUnit.module('Tooltip', trackerEnvironment);
      QUnit.test('Show tooltip on hovered node', function(assert) {
        var widget = createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {enabled: true}
        });
        sinon.spy(widget.getAllNodes()[2], 'showTooltip');
        this.trigger(pointerEvents.move, 2);
        assert.ok(widget.getAllNodes()[2].showTooltip.called);
      });
      QUnit.test('Show tooltip on hovered link', function(assert) {
        var widget = createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {enabled: true}
        });
        sinon.spy(widget.getAllLinks()[0], 'showTooltip');
        this.trigger(pointerEvents.move, 3);
        assert.ok(widget.getAllLinks()[0].showTooltip.called);
      });
      QUnit.test('Show custom tooltip (text) on hovered node', function(assert) {
        var stub = sinon.stub().returns({text: 'custom text'});
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            customizeNodeTooltip: stub
          }
        });
        this.trigger(pointerEvents.move, 2);
        assert.ok(stub.called);
        assert.deepEqual(stub.getCall(0).args[0], {
          title: 'Z',
          label: 'Z',
          weightIn: 2,
          weightOut: 0
        });
      });
      QUnit.test('Show custom tooltip (text) on hovered link', function(assert) {
        var stub = sinon.stub().returns({text: 'custom text'});
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            customizeLinkTooltip: stub
          }
        });
        this.trigger(pointerEvents.move, 3);
        assert.ok(stub.called);
        assert.deepEqual(stub.getCall(0).args[0], {
          source: 'A',
          target: 'Z',
          weight: 1
        });
      });
      QUnit.test('Show custom tooltip (html) on hovered node', function(assert) {
        var stub = sinon.stub().returns({html: 'custom html'});
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            customizeNodeTooltip: stub
          }
        });
        this.trigger(pointerEvents.move, 2);
        assert.ok(stub.called);
        assert.deepEqual(stub.getCall(0).args[0], {
          title: 'Z',
          label: 'Z',
          weightIn: 2,
          weightOut: 0
        });
      });
      QUnit.test('Show custom tooltip (html) on hovered link', function(assert) {
        var stub = sinon.stub().returns({html: 'custom html'});
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            customizeLinkTooltip: stub
          }
        });
        this.trigger(pointerEvents.move, 3);
        assert.ok(stub.called);
        assert.deepEqual(stub.getCall(0).args[0], {
          source: 'A',
          target: 'Z',
          weight: 1
        });
      });
      QUnit.test('Tooltip with template. Hover node - call node template', function(assert) {
        var nodeTooltipTemplate = sinon.spy();
        var linkTooltipTemplate = sinon.spy();
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            nodeTooltipTemplate: nodeTooltipTemplate,
            linkTooltipTemplate: linkTooltipTemplate
          }
        });
        this.trigger(pointerEvents.move, 2, {
          pageX: 100,
          pageY: 100
        });
        assert.equal(nodeTooltipTemplate.callCount, 1);
        assert.deepEqual(nodeTooltipTemplate.getCall(0).args[0], {
          title: 'Z',
          label: 'Z',
          weightIn: 2,
          weightOut: 0
        });
        assert.ok(domAdapter.isNode(nodeTooltipTemplate.getCall(0).args[1].get(0)));
        assert.equal(linkTooltipTemplate.callCount, 0);
      });
      QUnit.test('Show custom tooltip (text) on hovered link', function(assert) {
        var nodeTooltipTemplate = sinon.spy();
        var linkTooltipTemplate = sinon.spy();
        createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            linkTooltipTemplate: linkTooltipTemplate,
            nodeTooltipTemplate: nodeTooltipTemplate
          }
        });
        this.trigger(pointerEvents.move, 3, {
          pageX: 100,
          pageY: 100
        });
        assert.equal(linkTooltipTemplate.callCount, 1);
        assert.deepEqual(linkTooltipTemplate.getCall(0).args[0], {
          source: 'A',
          target: 'Z',
          weight: 1
        });
        assert.ok(domAdapter.isNode(linkTooltipTemplate.getCall(0).args[1].get(0)));
        assert.equal(nodeTooltipTemplate.callCount, 0);
      });
      QUnit.test('Set skip template in tooltip cusomizeObject if templates are not defined', function(assert) {
        var customizeLinkTooltip = sinon.spy(function() {
          return ({html: 'html'});
        });
        var sankey = createSankey({
          dataSource: [{
            source: 'A',
            target: 'Z',
            weight: 1
          }, {
            source: 'B',
            target: 'Z',
            weight: 1
          }],
          tooltip: {
            enabled: true,
            customizeLinkTooltip: customizeLinkTooltip
          }
        });
        this.trigger(pointerEvents.move, 3, {
          pageX: 100,
          pageY: 100
        });
        assert.equal(sankey._tooltip._textHtml.html(), 'html');
      });
      QUnit.test('Format option applies to weights values in default tooltip templates', function(assert) {
        var dataRow = {
          source: 'A',
          target: 'Z',
          weight: 100
        };
        var sankey = createSankey({
          node: {width: 15},
          dataSource: [dataRow],
          tooltip: {
            enabled: true,
            format: {type: 'percent'}
          }
        });
        var tooltipRenderedData = sankey._tooltip._customizeTooltip({
          type: 'link',
          info: dataRow
        });
        var tooltipEl = $(("<div>" + tooltipRenderedData.html + "</div>"));
        assert.equal(tooltipEl.text(), 'A > ZWeight: 10,000%');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","./commonParts/common.js","viz/sankey/tracker","viz/core/tooltip","events/click","events/pointer","viz/sankey/tooltip","core/dom_adapter","viz/sankey/sankey"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("./commonParts/common.js"), require("viz/sankey/tracker"), require("viz/core/tooltip"), require("events/click"), require("events/pointer"), require("viz/sankey/tooltip"), require("core/dom_adapter"), require("viz/sankey/sankey"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sankey.tracker.tests.js.map