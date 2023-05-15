!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/animation.js"], ["jquery","animation/fx","../../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/animation.js", ["jquery", "animation/fx", "../../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var $,
      fx,
      keyboardMock;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      QUnit.module('Animation', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      });
      QUnit.test('expand item should be animated if option animationEnabled is true', function(assert) {
        assert.expect(7);
        var originalAnimation = fx.animate;
        var originalStop = fx.stop;
        try {
          fx.stop = sinon.spy(function($element) {
            var $nodeContainer = $node.find('.' + internals.NODE_CONTAINER_CLASS).eq(0);
            assert.equal($element.get(0), $nodeContainer.get(0), 'correct element was animated');
          });
          fx.animate = sinon.spy(function($element, config) {
            var $nodeContainer = $node.find('.' + internals.NODE_CONTAINER_CLASS).eq(0);
            config.duration = 0;
            assert.equal($element.get(0), $nodeContainer.get(0), 'correct element was animated');
            assert.equal(config.from['maxHeight'], 0, 'starting from zero height');
            assert.equal(config.to['maxHeight'], $nodeContainer.height(), 'starting from zero height');
            assert.ok($nodeContainer.hasClass(internals.OPENED_NODE_CONTAINER_CLASS), 'node container displayed');
            config.complete = (function() {
              var orig = config.complete;
              return function() {
                orig();
                assert.equal($nodeContainer.css('maxHeight'), 'none', 'max-height was reset');
                assert.ok($nodeContainer.hasClass(internals.OPENED_NODE_CONTAINER_CLASS), 'node container displayed');
              };
            })();
            originalAnimation.call(this, $element, config);
          });
          var $treeView = $('#treeView').dxTreeView({
            items: [{
              id: 1,
              text: 'Item 1',
              items: [{
                id: 3,
                text: 'Item 3'
              }]
            }],
            animationEnabled: true
          });
          var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
          var $item = $node.find('.' + internals.ITEM_CLASS).eq(0);
          $treeView.dxTreeView('instance').expandItem($item.get(0));
        } finally {
          fx.animate = originalAnimation;
          fx.stop = originalStop;
        }
      });
      QUnit.test('collapse item should be animated if option animationEnabled is true', function(assert) {
        assert.expect(8);
        var originalAnimation = fx.animate;
        var originalStop = fx.stop;
        try {
          fx.stop = sinon.spy(function($element) {
            assert.equal($element.get(0), $nodeContainer.get(0), 'correct element was animated');
          });
          fx.animate = sinon.spy(function($element, config) {
            assert.notEqual(config.duration, 0, 'not zero duration');
            config.duration = 0;
            assert.equal($element.get(0), $nodeContainer.get(0), 'correct element was animated');
            assert.equal(config.from['maxHeight'], $nodeContainer.height(), 'starting from real height');
            assert.equal(config.to['maxHeight'], 0, 'starting to zero height');
            assert.ok($nodeContainer.hasClass(internals.OPENED_NODE_CONTAINER_CLASS), 'node container displayed');
            config.complete = (function() {
              var orig = config.complete;
              return function() {
                orig();
                assert.equal($nodeContainer.css('maxHeight'), 'none', 'max-height was reset');
                assert.ok(!$nodeContainer.hasClass(internals.OPENED_NODE_CONTAINER_CLASS), 'node container displayed');
              };
            })();
            originalAnimation.call(this, $element, config);
          });
          var $treeView = $('#treeView').dxTreeView({
            items: [{
              id: 1,
              text: 'Item 1',
              expanded: true,
              items: [{
                id: 3,
                text: 'Item 3'
              }]
            }],
            animationEnabled: true
          });
          var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
          var $item = $node.find('.' + internals.ITEM_CLASS).eq(0);
          var $nodeContainer = $node.find('.' + internals.NODE_CONTAINER_CLASS).eq(0);
          $treeView.dxTreeView('instance').collapseItem($item.get(0));
        } finally {
          fx.animate = originalAnimation;
          fx.stop = originalStop;
        }
      });
      QUnit.test('collapse item should not be animated if option animationEnabled is false', function(assert) {
        var originalAnimation = fx.animate;
        try {
          fx.animate = sinon.spy(function($element, config) {
            assert.equal(config.duration, 0, 'not zero duration');
            originalAnimation.call(this, $element, config);
          });
          var $treeView = $('#treeView').dxTreeView({
            items: [{
              id: 1,
              text: 'Item 1',
              expanded: true,
              items: [{
                id: 3,
                text: 'Item 3'
              }]
            }],
            animationEnabled: false
          });
          var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
          var $item = $node.find('.' + internals.ITEM_CLASS).eq(0);
          $treeView.dxTreeView('instance').collapseItem($item.get(0));
        } finally {
          fx.animate = originalAnimation;
        }
      });
      QUnit.test('collapse item should not be animated if item is already collapsed', function(assert) {
        assert.expect(0);
        var originalAnimation = fx.animate;
        try {
          fx.animate = sinon.spy(function($element, config) {
            assert.ok(false, 'animation was no run');
          });
          var $treeView = $('#treeView').dxTreeView({items: [{
              id: 1,
              text: 'Item 1',
              expanded: false,
              items: [{
                id: 3,
                text: 'Item 3'
              }]
            }]});
          var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
          var $item = $node.find('.' + internals.ITEM_CLASS).eq(0);
          $treeView.dxTreeView('instance').collapseItem($item.get(0));
        } finally {
          fx.animate = originalAnimation;
        }
      });
      QUnit.test('keyboard navigation should stop animation', function(assert) {
        var originalStop = fx.stop;
        try {
          var $treeView = $('#treeView').dxTreeView({
            items: [{
              id: 1,
              text: 'Item 1',
              expanded: false,
              items: [{
                id: 3,
                text: 'Item 3'
              }]
            }],
            focusStateEnabled: true
          });
          var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
          var $item = $node.find('.' + internals.ITEM_CLASS).eq(0);
          $treeView.dxTreeView('instance').expandItem($item.get(0));
          fx.stop = sinon.spy();
          $item.trigger('dxpointerdown');
          var $nodeContainer = $node.find('.' + internals.NODE_CONTAINER_CLASS).eq(0);
          keyboardMock($treeView).keyDown('right');
          assert.ok(fx.stop.calledWith($nodeContainer.get(0)), 'animation stopped');
        } finally {
          fx.stop = originalStop;
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","../../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("../../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=animation.js.map