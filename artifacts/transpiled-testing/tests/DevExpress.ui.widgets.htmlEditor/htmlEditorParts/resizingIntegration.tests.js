!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/resizingIntegration.tests.js"], ["jquery","ui/html_editor","events/click","../../../helpers/pointerMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/resizingIntegration.tests.js", ["jquery", "ui/html_editor", "events/click", "../../../helpers/pointerMock.js"], function($__export) {
  "use strict";
  var $,
      clickEvent,
      PointerMock,
      test,
      module,
      RESIZE_FRAME_CLASS,
      RESIZABLE_CLASS,
      RESIZABLE_HANDLER_CLASS,
      IMAGE,
      IMAGE_SIZE,
      BORDER_PADDING_WIDTH;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      clickEvent = $__m.name;
    }, function($__m) {
      PointerMock = $__m.default;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, module = $__4.module, $__4));
      RESIZE_FRAME_CLASS = 'dx-resize-frame';
      RESIZABLE_CLASS = 'dx-resizable';
      RESIZABLE_HANDLER_CLASS = 'dx-resizable-handle-corner-bottom-right';
      IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWNgZGT8DwABDQEDEkMQNQAAAABJRU5ErkJggg==';
      IMAGE_SIZE = 100;
      BORDER_PADDING_WIDTH = 2;
      module('Resizing integration', {
        beforeEach: function() {
          var $__3 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.options = {value: ("<img src=\"" + IMAGE + "\" width=\"" + IMAGE_SIZE + "\" height=\"" + IMAGE_SIZE + "\">")};
          this.createWidget = function() {
            $__3.instance = $__3.$element.dxHtmlEditor($__3.options).dxHtmlEditor('instance');
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        test('Click on an image with default resize module config', function(assert) {
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 0, 'There is no resize frame');
        });
        test('Click on an image after enable resizing via optionChange', function(assert) {
          this.createWidget();
          this.instance.option('mediaResizing.enabled', true);
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 1, 'There is resize frame');
          assert.ok($resizeFrame.is(':visible'), 'Resize frame is visible');
        });
        test('Click on an image with enabled resizing', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 1, 'There is resize frame');
          assert.ok($resizeFrame.is(':visible'), 'Resize frame is visible');
        });
        test('Click on an image after disable resizing via optionChange', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.instance.option('mediaResizing.enabled', false);
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 0, 'There is resize frame');
        });
        test('Click on an image with enabled resizing but remove \'image\' from allowed resizing targets', function(assert) {
          this.createWidget();
          this.instance.option('mediaResizing', {
            enabled: true,
            allowedTargets: []
          });
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 1, 'There is resize frame, resizing enabled');
          assert.notOk($resizeFrame.is(':visible'), 'Resize frame isn\'t visible, image isn\'t resizable');
        });
        test('check editor value after resizing with aspect ratio keeping', function(assert) {
          var done = assert.async();
          var hOffset = 10;
          var vOffset = 5;
          this.options.onValueChanged = function(e) {
            var $image = $(e.value).children();
            assert.ok($image.is('img'), 'It\'s an image');
            assert.strictEqual(parseInt($image.attr('height')), IMAGE_SIZE + hOffset, ("Height + " + hOffset + " because aspect ratio is kept"));
            assert.strictEqual(parseInt($image.attr('width')), IMAGE_SIZE + hOffset, ("Width + " + hOffset));
            done();
          };
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var $resizableHandler = $(("." + RESIZABLE_HANDLER_CLASS));
          PointerMock($resizableHandler).start().dragStart().drag(hOffset, vOffset).dragEnd();
        });
        test('integrated resizable should have keepAspectRatio=true (T1049676)', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var resizable = $(("." + RESIZABLE_CLASS)).dxResizable('instance');
          assert.strictEqual(resizable.option('keepAspectRatio'), true, 'aspect ratio keeping is enabled');
        });
        test('check frame position for list item with nested image', function(assert) {
          this.options = {
            value: ("<ol><li><img src=\"" + IMAGE + "\" width=\"" + IMAGE_SIZE + "\" height=\"" + IMAGE_SIZE + "\"></li></ol>"),
            mediaResizing: {enabled: true}
          };
          this.createWidget();
          var $image = this.$element.find('img');
          $image.trigger(clickEvent);
          var $__5 = this.$element.find(("." + RESIZE_FRAME_CLASS)).get(0).getBoundingClientRect(),
              frameLeft = $__5.left,
              frameTop = $__5.top;
          var $__6 = $image.get(0).getBoundingClientRect(),
              imageLeft = $__6.left,
              imageTop = $__6.top;
          assert.strictEqual(frameLeft + BORDER_PADDING_WIDTH, imageLeft, 'Frame positioned correctly by the left');
          assert.strictEqual(frameTop + BORDER_PADDING_WIDTH, imageTop, 'Frame positioned correctly by the top');
        });
        test('resizing frame should update its position after formatting', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          var $__5 = $resizeFrame.offset(),
              initialTop = $__5.top,
              initialLeft = $__5.left;
          this.instance.formatLine(0, 1, 'align', 'center');
          var $__6 = $resizeFrame.offset(),
              currentTop = $__6.top,
              currentLeft = $__6.left;
          assert.strictEqual(currentTop, initialTop, 'Resize frame save initial top position');
          assert.notEqual(currentLeft, initialLeft, 'Resize frame updates left position');
        });
        test('resizing frame should become hidden when another element focused', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.instance.focus();
          this.$element.find('img').trigger(clickEvent);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          $('<input>').appendTo('#qunit-fixture').trigger('focus');
          assert.notOk($resizeFrame.is(':visible'), 'Resize frame isn\'t visible, image isn\'t resizable');
        });
        test('editor should move selection to the image after click on image', function(assert) {
          this.options.mediaResizing = {enabled: true};
          this.createWidget();
          this.$element.find('img').trigger(clickEvent);
          var $__5 = this.instance.getSelection(),
              index = $__5.index,
              length = $__5.length;
          assert.strictEqual(index, 1, 'by image - index is 1');
          assert.strictEqual(length, 0, 'by default - zero length');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","events/click","../../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("events/click"), require("../../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizingIntegration.tests.js.map