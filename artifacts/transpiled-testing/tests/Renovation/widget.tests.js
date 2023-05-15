!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/Renovation/widget.tests.js"], ["jquery","renovation/ui/common/widget.j","events/core/events_engine"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/Renovation/widget.tests.js", ["jquery", "renovation/ui/common/widget.j", "events/core/events_engine"], function($__export) {
  "use strict";
  var $,
      eventsEngine,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      eventsEngine = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        $('#qunit-fixture').html("\n        <div id=\"component\"></div>\n    ");
      });
      moduleConfig = {Widget: function() {
          var options = arguments[0] !== (void 0) ? arguments[0] : {};
          $('#component').dxWidget(options);
          return $('#component');
        }};
      QUnit.module('Props: width/height', moduleConfig, function() {
        QUnit.test('should overwrite predefined dimensions', function(assert) {
          var $element = $('#component');
          var style = $element.get(0).style;
          $element.css({
            width: '20px',
            height: '30px'
          });
          assert.strictEqual(style.width, '20px');
          assert.strictEqual(style.height, '30px');
          this.Widget({
            width: void 0,
            height: void 0
          });
          $element.css({
            width: '20px',
            height: '30px'
          });
          assert.strictEqual(style.width, '20px');
          assert.strictEqual(style.height, '30px');
          this.Widget({
            width: null,
            height: null
          });
          $element.css({
            width: '20px',
            height: '30px'
          });
          assert.strictEqual(style.width, '20px');
          assert.strictEqual(style.height, '30px');
          this.Widget({
            width: '',
            height: ''
          });
          assert.strictEqual(style.width, '');
          assert.strictEqual(style.height, '');
        });
      });
      QUnit.module('Props: accessKey', moduleConfig, function() {
        QUnit.test('should change "accesskey" attribute', function(assert) {
          var $widget = this.Widget({
            focusStateEnabled: true,
            accessKey: 'y'
          });
          this.Widget({accessKey: 'g'});
          assert.strictEqual($widget.attr('accesskey'), 'g');
        });
      });
      QUnit.module('Container', moduleConfig, function() {
        QUnit.test('should not remove attributes from container after render', function(assert) {
          var $container = $('#component').attr({
            'custom-attr': 'v1',
            'class': 'my-widget-class'
          });
          var widget = this.Widget({}).dxWidget('instance');
          assert.strictEqual(widget.$element().attr('id'), 'component');
          assert.strictEqual(widget.$element().attr('custom-attr'), 'v1');
          assert.ok($container.hasClass('my-widget-class'));
          assert.deepEqual(widget.option.elementAttr, undefined);
        });
        QUnit.test('should rewrite container attributes after render', function(assert) {
          $('#component').attr({'custom-attr': 'v1'});
          var widget = this.Widget({elementAttr: {'custom-attr': 'v2'}}).dxWidget('instance');
          assert.strictEqual(widget.$element().attr('custom-attr'), 'v2');
          assert.deepEqual(widget.option().elementAttr, {'custom-attr': 'v2'});
        });
        QUnit.test('should save attributes after rerender', function(assert) {
          var widget = this.Widget({elementAttr: {'custom-attr': 'v2'}}).dxWidget('instance');
          this.Widget({elementAttr: {'a': 'v'}});
          assert.strictEqual(widget.$element().attr('id'), 'component');
        });
        QUnit.test('should not recreate container element', function(assert) {
          var $container = $('#component');
          var container = $container.get(0);
          var widget = this.Widget({}).dxWidget('instance');
          assert.strictEqual(widget.$element().get(0), container);
        });
        QUnit.test('should not recreate container element after rerender', function(assert) {
          var $container = $('#component');
          var container = $container.get(0);
          var widget = this.Widget({}).dxWidget('instance');
          this.Widget({elementAttr: {'a': 'v'}});
          assert.strictEqual(widget.$element().get(0), container);
        });
        QUnit.test('should not remove container on dispose', function(assert) {
          var widget = this.Widget({}).dxWidget('instance');
          widget.dispose();
          assert.strictEqual($('#component').length, 1, 'container is not removed');
          assert.strictEqual($('#component').attr('class'), '', 'class attribute is empty');
        });
        QUnit.test('should not remove container on dxremove event', function(assert) {
          var widget = this.Widget({}).dxWidget('instance');
          var $el = widget.$element();
          eventsEngine.trigger($el, 'dxremove');
          assert.strictEqual($('#component').length, 1, 'container is not removed');
          assert.strictEqual($('#component')[0], $el[0]);
        });
        QUnit.test('should remove container on remove call', function(assert) {
          var $element = this.Widget({});
          $element.remove();
          assert.strictEqual($('#component').length, 0, 'container is removed');
        });
      });
      QUnit.module('Component Wrapper', moduleConfig, function() {
        QUnit.test('should create in separate element', function(assert) {
          $('<div>').dxWidget({});
          assert.ok(true, 'no exceptions');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","renovation/ui/common/widget.j","events/core/events_engine"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("renovation/ui/common/widget.j"), require("events/core/events_engine"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=widget.tests.js.map