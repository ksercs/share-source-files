!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/popupDrag.tests.js"], ["jquery","ui/popup/popup_drag","ui/popup/popup_position_controller"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/popupDrag.tests.js", ["jquery", "ui/popup/popup_drag", "ui/popup/popup_position_controller"], function($__export) {
  "use strict";
  var $,
      PopupDrag,
      PopupPositionController,
      KEYBOARD_DRAG_STEP;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      PopupDrag = $__m.default;
    }, function($__m) {
      PopupPositionController = $__m.PopupPositionController;
    }],
    execute: function() {
      KEYBOARD_DRAG_STEP = 5;
      QUnit.testStart(function() {
        var markup = '<div id="draggableElement" style="width: 100px; height: 100px; position: absolute; top: 300px; left: 300px;">\
            <div id="handle" style="width: 100%; height: 50px"></div>\
        </div>\
        <div id="container" style="width: 200px; height: 200px;"></div>\
        <div id="container2" style="width: 300px; height: 350px; position: absolute; top: -1000px; left: -700px"></div>\
        ';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('overlay_drag', {beforeEach: function() {
          this.handle = $('#handle').get(0);
          this.draggableElement = $('#draggableElement').get(0);
          this.container = $('#container').get(0);
          this.container2 = $('#container2').get(0);
        }}, function() {
        QUnit.module('public methods', function() {
          QUnit.module('keyboard navigation', {beforeEach: function() {
              this.drag = new PopupDrag({
                dragEnabled: true,
                handle: this.handle,
                draggableElement: this.draggableElement,
                positionController: new PopupPositionController({
                  container: $('#qunit-fixture'),
                  $root: $('#qunit-fixture'),
                  $content: this.draggableElement,
                  restorePosition: {},
                  onVisualPositionChanged: function() {},
                  onPositioned: function() {},
                  outsideDragFactor: 0
                })
              });
              this.initialPosition = this.draggableElement.getBoundingClientRect();
              this.delta = {
                moveDown: {
                  x: 0,
                  y: KEYBOARD_DRAG_STEP
                },
                moveUp: {
                  x: 0,
                  y: -KEYBOARD_DRAG_STEP
                },
                moveLeft: {
                  x: -KEYBOARD_DRAG_STEP,
                  y: 0
                },
                moveRight: {
                  x: KEYBOARD_DRAG_STEP,
                  y: 0
                }
              };
            }}, function() {
            ['moveDown', 'moveUp', 'moveLeft', 'moveRight'].forEach(function(methodName) {
              QUnit.module(methodName, function() {
                QUnit.test('should drag element down by default step', function(assert) {
                  this.drag[methodName]($.Event('keydown'));
                  var newPosition = this.draggableElement.getBoundingClientRect();
                  var expectedLeft = this.initialPosition.left + this.delta[methodName].x;
                  var expectedTop = this.initialPosition.top + this.delta[methodName].y;
                  assert.strictEqual(newPosition.left, expectedLeft, 'horizontal position is still the same');
                  assert.strictEqual(newPosition.top, expectedTop, 'vertical position is changed correctly');
                });
                QUnit.test('parameter event should be default prevented', function(assert) {
                  var preventDefaultStub = sinon.stub();
                  var event = $.Event('keydown', {preventDefault: preventDefaultStub});
                  this.drag[methodName](event);
                  assert.ok(preventDefaultStub.called, 'event is default prevented');
                });
                QUnit.test('parameter event propogation should be stopped', function(assert) {
                  var stopPropagationStub = sinon.stub();
                  var event = $.Event('keydown', {stopPropagation: stopPropagationStub});
                  this.drag[methodName](event);
                  assert.ok(stopPropagationStub.called, 'event propagation is stopped');
                });
              });
            });
          });
        });
        QUnit.test('_moveByOffset() changes draggableElement position', function(assert) {
          var drag = new PopupDrag({
            dragEnabled: true,
            handle: this.handle,
            container: this.container,
            draggableElement: this.draggableElement,
            outsideDragFactor: 0,
            updatePositionChangeHandled: function() {}
          });
          var startPosition = this.draggableElement.getBoundingClientRect();
          drag._moveByOffset({
            top: 100,
            left: 100
          });
          var newPosition = this.draggableElement.getBoundingClientRect();
          assert.strictEqual(startPosition.top + 100, newPosition.top, 'top position changed');
          assert.strictEqual(startPosition.left + 100, newPosition.left, 'left position changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/popup/popup_drag","ui/popup/popup_position_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/popup/popup_drag"), require("ui/popup/popup_position_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popupDrag.tests.js.map