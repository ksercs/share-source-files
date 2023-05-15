!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/resizingModule.tests.js"], ["jquery","devextreme-quill","ui/html_editor/modules/resizing","core/devices","events/click","../../../helpers/pointerMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/resizingModule.tests.js", ["jquery", "devextreme-quill", "ui/html_editor/modules/resizing", "core/devices", "events/click", "../../../helpers/pointerMock.js"], function($__export) {
  "use strict";
  var $,
      Quill,
      Resizing,
      devices,
      clickEvent,
      PointerMock,
      RESIZE_FRAME_CLASS,
      RESIZABLE_HANDLE_CLASS,
      RESIZABLE_HANDLE_RIGHT_CLASS,
      RESIZABLE_HANDLE_BOTTOM_CLASS,
      DX_TOUCH_DEVICE_CLASS,
      IMAGE,
      IMAGE_SIZE,
      BORDER_PADDING_WIDTH,
      moduleConfig,
      test,
      module;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Quill = $__m.default;
    }, function($__m) {
      Resizing = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      clickEvent = $__m.name;
    }, function($__m) {
      PointerMock = $__m.default;
    }],
    execute: function() {
      var $__5;
      RESIZE_FRAME_CLASS = 'dx-resize-frame';
      RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
      RESIZABLE_HANDLE_RIGHT_CLASS = 'dx-resizable-handle-right';
      RESIZABLE_HANDLE_BOTTOM_CLASS = 'dx-resizable-handle-bottom';
      DX_TOUCH_DEVICE_CLASS = 'dx-touch-device';
      IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWNgZGT8DwABDQEDEkMQNQAAAABJRU5ErkJggg==';
      IMAGE_SIZE = 100;
      BORDER_PADDING_WIDTH = 2;
      moduleConfig = {
        beforeEach: function() {
          var $__4 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor').css({
            position: 'relative',
            margin: '10px'
          });
          this.$image = $('<img>').attr({
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            src: IMAGE
          }).appendTo(this.$element);
          this.$div = $('<div>').appendTo(this.$element);
          this.selectedRange = {
            index: 0,
            length: 0
          };
          this.quillMock = {
            root: this.$element.get(0),
            on: function() {},
            off: function() {},
            getSelection: function() {
              return $__4.selectedRange;
            },
            setSelection: function(index, length) {
              $__4.selectedRange = {
                index: index,
                length: length
              };
            }
          };
          this.options = {editorInstance: {
              on: function() {},
              off: function() {},
              $element: function() {
                return $__4.$element;
              },
              _createComponent: function($element, widget, options) {
                return new widget($element, options);
              },
              _getQuillContainer: function() {
                return $__4.$element;
              }
            }};
          this.attachSpies = function(instance) {
            $__4.attachEventsSpy = sinon.spy(instance, '_attachEvents');
            $__4.detachEventsSpy = sinon.spy(instance, '_detachEvents');
            $__4.createFrameSpy = sinon.spy(instance, '_createResizeFrame');
            $__4.updateFrameSpy = sinon.spy(instance, 'updateFramePosition');
            $__4.showFrameSpy = sinon.spy(instance, 'showFrame');
            $__4.hideFrameSpy = sinon.spy(instance, 'hideFrame');
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      module('Resizing module', moduleConfig, function() {
        test('create module instance with default options', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          assert.strictEqual(this.$element.find(("." + RESIZE_FRAME_CLASS)).length, 0, 'There is no resize frame element');
          assert.deepEqual(resizingInstance.allowedTargets, ['image'], 'default allowed targets');
          assert.notOk(resizingInstance.enabled, 'module disabled by default');
        });
        test('create module instance with enabled equals to \'true\'', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.strictEqual($resizeFrame.length, 1, 'There is a resize frame element');
          assert.notOk($resizeFrame.is(':visible'), 'Resize frame element is hidden');
          assert.deepEqual(resizingInstance.allowedTargets, ['image'], 'default allowed targets');
        });
        test('module should detach events on clean', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          this.attachSpies(resizingInstance);
          resizingInstance.clean();
          assert.ok(this.detachEventsSpy.calledOnce, 'events has been detached on \'clean\'');
        });
        test('module should attach and detach events on the \'enabled\' option changing', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          this.attachSpies(resizingInstance);
          resizingInstance.option('enabled', true);
          assert.ok(this.attachEventsSpy.calledOnce, 'events has been attached');
          assert.ok(this.detachEventsSpy.notCalled, 'events hasn\'t detached');
          resizingInstance.option('enabled', false);
          assert.ok(this.attachEventsSpy.calledOnce, 'events has been attached');
          assert.ok(this.detachEventsSpy.calledOnce, 'events has been detached');
        });
        test('\'allowedTargets\' option should accept Array only', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          resizingInstance.option('allowedTargets', []);
          assert.deepEqual(resizingInstance.allowedTargets, [], 'Empty array accepted');
          resizingInstance.option('allowedTargets', true);
          assert.deepEqual(resizingInstance.allowedTargets, [], 'Boolean value rejected');
        });
        test('\'option\' can apply a set of options', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          resizingInstance.option('mediaResizing', {
            allowedTargets: ['video'],
            enabled: true
          });
          assert.ok(resizingInstance.enabled, '\'enabled\' option has been applied');
          assert.deepEqual(resizingInstance.allowedTargets, ['video'], '\'allowedTargets\' option has been applied');
        });
        test('click on an image with default module options', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          this.attachSpies(resizingInstance);
          this.$image.trigger(clickEvent);
          assert.notOk(resizingInstance._$target, 'There is no active target');
          assert.ok(this.updateFrameSpy.notCalled, 'Frame isn\'t updated');
          assert.ok(this.showFrameSpy.notCalled, 'Frame isn\'t shown');
        });
        test('click on an image with enabled resizing', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.attachSpies(resizingInstance);
          this.$image.trigger(clickEvent);
          var frameClientRect = $resizeFrame.get(0).getBoundingClientRect();
          assert.ok(resizingInstance._$target, 'There is active target');
          assert.ok(this.updateFrameSpy.calledOnce, 'Frame has been updated');
          assert.ok(this.showFrameSpy.calledOnce, 'Frame has been shown');
          assert.ok($resizeFrame.is(':visible'), 'Frame element is visible');
          assert.strictEqual(frameClientRect.width, IMAGE_SIZE + BORDER_PADDING_WIDTH * 2, 'Frame has a correct width');
          assert.strictEqual(frameClientRect.height, IMAGE_SIZE + BORDER_PADDING_WIDTH * 2, 'Frame has a correct height');
        });
        QUnit.module('resizable minWidth and minHeight', {
          beforeEach: function() {
            this.cachedStyles = {
              border: this.$image.css('border'),
              padding: this.$image.css('padding')
            };
            this.options.enabled = true;
            new Resizing(this.quillMock, this.options);
            this.$resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
            this.resizable = this.$resizeFrame.dxResizable('instance');
          },
          afterEach: function() {
            this.$image.css(this.cachedStyles);
          }
        }, function() {
          test('click on an image should update resizable minWidth and minHeight props', function(assert) {
            var borderWidth = 20;
            var padding = 10;
            this.$image.css({
              border: (borderWidth + "px solid black"),
              padding: (padding + "px")
            });
            this.$image.trigger(clickEvent);
            assert.strictEqual(this.resizable.option('minWidth'), 2 * (borderWidth + padding), 'minWidth is updated');
            assert.strictEqual(this.resizable.option('minHeight'), 2 * (borderWidth + padding), 'minHeight is updated');
          });
          test('click on an image should not update resizable minWidth and minHeight props if 2 * (padding + border) is smaller', function(assert) {
            this.$image.css({
              border: '1px solid black',
              padding: '2px'
            });
            var minWidth = this.resizable.option('minWidth');
            var minHeight = this.resizable.option('minHeight');
            this.$image.trigger(clickEvent);
            assert.strictEqual(this.resizable.option('minWidth'), minWidth, 'minWidth is not changed');
            assert.strictEqual(this.resizable.option('minHeight'), minHeight, 'minHeight is not changed');
          });
        });
        test('click on an div with enabled resizing', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.attachSpies(resizingInstance);
          this.$div.trigger(clickEvent);
          assert.notOk(resizingInstance._$target, 'There is no active target');
          assert.ok(this.updateFrameSpy.notCalled, 'Frame hasn\'t been updated');
          assert.ok(this.showFrameSpy.notCalled, 'Frame hasn\'t been shown');
          assert.notOk($resizeFrame.is(':visible'), 'Frame element isn\'t visible');
        });
        test('resize frame should have "pointer-events:none" to pass scroll events (T1157826)', function(assert) {
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.$div.trigger(clickEvent);
          assert.strictEqual($resizeFrame.css('pointer-events'), 'none', 'pointer-event=none');
        });
        test('handles inside resize frame should have "pointer-events:auto" to be clickable', function(assert) {
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          var $handles = this.$element.find(("." + RESIZABLE_HANDLE_CLASS));
          this.$div.trigger(clickEvent);
          $handles.each(function(_, handle) {
            assert.strictEqual($(handle).css('pointer-events'), 'auto', 'pointer-event=auto');
          });
        });
        test('click on an image after disable image resizing', function(assert) {
          var resizingInstance = new Resizing(this.quillMock, this.options);
          this.attachSpies(resizingInstance);
          resizingInstance.option('enabled', true);
          resizingInstance.option('allowedTargets', []);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.$image.trigger(clickEvent);
          assert.notOk(resizingInstance._$target, 'There is no active target');
          assert.ok(this.updateFrameSpy.notCalled, 'Frame hasn\'t been updated');
          assert.ok(this.showFrameSpy.notCalled, 'Frame hasn\'t been shown');
          assert.notOk($resizeFrame.is(':visible'), 'Frame element isn\'t visible');
        });
        test('click outside the target should hide resize frame', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.attachSpies(resizingInstance);
          this.$image.trigger(clickEvent);
          assert.ok(this.showFrameSpy.calledOnce, 'Frame has been shown after click on an image');
          this.$element.trigger(clickEvent);
          assert.notOk(resizingInstance._$target, 'There is no active target');
          assert.ok(this.hideFrameSpy.calledOnce, 'Frame has been hidden');
          assert.notOk($resizeFrame.is(':visible'), 'Frame element isn\'t visible');
        });
        test('keydown event should hide resize frame', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.attachSpies(resizingInstance);
          this.$image.trigger(clickEvent);
          assert.ok(this.showFrameSpy.calledOnce, 'Frame has been shown after click on an image');
          this.$element.trigger('keydown');
          assert.notOk(resizingInstance._$target, 'There is no active target');
          assert.ok(this.hideFrameSpy.calledOnce, 'Frame has been hidden');
          assert.notOk($resizeFrame.is(':visible'), 'Frame element isn\'t visible');
        });
        ['Backspace', 'Delete'].forEach(function(deleteKey) {
          test((deleteKey + " keydown event should remove target image hide resize frame (T878203)"), function(assert) {
            this.$element.prepend($(document.createTextNode('text')));
            $(this.$element).dxHtmlEditor({mediaResizing: {enabled: true}});
            this.options.enabled = true;
            var $image = $(this.$element).find('img');
            $image.trigger(clickEvent);
            $image.trigger($.Event('keydown', {key: deleteKey}));
            assert.strictEqual($(this.$element).find('img').length, 0, 'Image is removed');
          });
        });
        test('"Delete" keydown event should raise an error in case the target does not exists', function(assert) {
          this.$element.prepend($(document.createTextNode('text')));
          $(this.$element).dxHtmlEditor({mediaResizing: {enabled: true}});
          this.options.enabled = true;
          var $image = $(this.$element).find('img');
          var findStub = sinon.stub(Quill, 'find');
          var noError = true;
          $image.trigger(clickEvent);
          try {
            $image.trigger($.Event('keydown', {key: 'Delete'}));
          } catch (e) {
            noError = false;
          }
          assert.ok(noError, 'Quill cannot find an image -> no error');
          findStub.restore();
        });
        test('scroll event should update resize frame position', function(assert) {
          this.options.enabled = true;
          var resizingInstance = new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.attachSpies(resizingInstance);
          this.$image.trigger(clickEvent);
          assert.ok(this.showFrameSpy.calledOnce, 'Frame has been shown after click on an image');
          assert.ok(this.updateFrameSpy.calledOnce, 'Frame position has been updated one time');
          this.$element.trigger('scroll');
          assert.ok(resizingInstance._$target, 'There is an active target');
          assert.ok($resizeFrame.is(':visible'), 'Frame element is visible');
          assert.ok(this.updateFrameSpy.calledTwice, 'Frame has been updated two times');
          assert.ok(this.hideFrameSpy.notCalled, 'Frame hasn\'t been hidden');
        });
        test('resize frame should change an target size on the frame resizing', function(assert) {
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          this.$image.trigger(clickEvent);
          var $rightHandle = this.$element.find(("." + RESIZABLE_HANDLE_RIGHT_CLASS));
          var $bottomHandle = this.$element.find(("." + RESIZABLE_HANDLE_BOTTOM_CLASS));
          PointerMock($rightHandle).start().dragStart().drag(10, 0).dragEnd();
          PointerMock($bottomHandle).start().dragStart().drag(0, 5).dragEnd();
          var imageClientRect = this.$image.get(0).getBoundingClientRect();
          assert.strictEqual(imageClientRect.height, IMAGE_SIZE + 5, 'Image height has been increased');
          assert.strictEqual(imageClientRect.width, IMAGE_SIZE + 10, 'Image width has been increased');
        });
        test('check frame position', function(assert) {
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          this.$image.trigger(clickEvent);
          var $__6 = this.$element.find(("." + RESIZE_FRAME_CLASS)).get(0).getBoundingClientRect(),
              frameLeft = $__6.left,
              frameTop = $__6.top;
          var $__7 = this.$image.get(0).getBoundingClientRect(),
              imageLeft = $__7.left,
              imageTop = $__7.top;
          assert.strictEqual(frameLeft + BORDER_PADDING_WIDTH, imageLeft, 'Frame positioned correctly by the left');
          assert.strictEqual(frameTop + BORDER_PADDING_WIDTH, imageTop, 'Frame positioned correctly by the top');
        });
        test('widget should not fire focusout event on resize frame click (T930996)', function(assert) {
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          this.$element.on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'Default prevented');
          });
          $resizeFrame.trigger('mousedown');
        });
        test('resize frame should have specific class on mobile devices', function(assert) {
          var currentDevice = devices.current();
          devices.current('iPad');
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.ok($resizeFrame.hasClass(DX_TOUCH_DEVICE_CLASS), 'frame has specific class');
          devices.current(currentDevice);
        });
        test('resize frame shouldn\'t have specific class on desktop', function(assert) {
          var currentDevice = devices.current();
          devices.current('desktop');
          this.options.enabled = true;
          new Resizing(this.quillMock, this.options);
          var $resizeFrame = this.$element.find(("." + RESIZE_FRAME_CLASS));
          assert.notOk($resizeFrame.hasClass(DX_TOUCH_DEVICE_CLASS), 'frame doesn\'t have specific class');
          devices.current(currentDevice);
        });
        test('module should set a default selection in case editor was not focused yet', function(assert) {
          this.options.enabled = true;
          this.selectedRange = null;
          new Resizing(this.quillMock, this.options);
          this.$image.trigger(clickEvent);
          assert.deepEqual(this.selectedRange, {
            index: 0,
            length: 0
          }, 'editor has an default range');
        });
        test('module should keep actual range', function(assert) {
          var actualRange = {
            index: 5,
            length: 0
          };
          this.options.enabled = true;
          this.selectedRange = actualRange;
          new Resizing(this.quillMock, this.options);
          this.$image.trigger(clickEvent);
          assert.deepEqual(this.selectedRange, actualRange, 'editor has an actual range');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","devextreme-quill","ui/html_editor/modules/resizing","core/devices","events/click","../../../helpers/pointerMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("devextreme-quill"), require("ui/html_editor/modules/resizing"), require("core/devices"), require("events/click"), require("../../../helpers/pointerMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizingModule.tests.js.map