!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/events.tests.js"], ["jquery","ui/html_editor","ui/html_editor/converters/markdown","core/utils/common","events/index","core/devices","events/core/events_engine","../../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/events.tests.js", ["jquery", "ui/html_editor", "ui/html_editor/converters/markdown", "core/utils/common", "events/index", "core/devices", "events/core/events_engine", "../../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var $,
      deferUpdate,
      dxEvent,
      devices,
      eventsEngine,
      keyboardMock,
      FOCUS_STATE_CLASS,
      HTML_EDITOR_CONTENT_CLASS,
      TIME_TO_WAIT,
      ORANGE_PIXEL,
      test,
      testModule,
      createModuleConfig;
  function createEvent() {
    var type = arguments[0] !== (void 0) ? arguments[0] : 'paste';
    var element = arguments[1];
    var customEvent = document.createEvent('Event');
    customEvent.initEvent(type, true, true);
    customEvent.clipboardData = {getData: function() {
        return 'test';
      }};
    if (element) {
      var $__2 = element.getBoundingClientRect(),
          x = $__2.x,
          y = $__2.y;
      customEvent.clientX = x;
      customEvent.clientY = y;
      customEvent.dataTransfer = {files: []};
    }
    return customEvent;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {
      dxEvent = $__m.Event;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      var $__2;
      FOCUS_STATE_CLASS = 'dx-state-focused';
      HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
      TIME_TO_WAIT = 500;
      ORANGE_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYGWP4z8j4HwAFBQIB6OfkUgAAAABJRU5ErkJggg==';
      (($__2 = QUnit, test = $__2.test, testModule = $__2.module, $__2));
      createModuleConfig = function($__3) {
        var $__5;
        var $__4 = $__3,
            initialOptions = ($__5 = $__4.initialOptions) === void 0 ? {} : $__5,
            beforeCallback = $__4.beforeCallback,
            afterCallback = $__4.afterCallback;
        return {
          beforeEach: function() {
            var $__1 = this;
            beforeCallback && beforeCallback();
            this.clock = sinon.useFakeTimers();
            this.options = initialOptions;
            this.$container = $('#htmlEditor');
            this.createEditor = function(options) {
              $__1.instance = $__1.$container.dxHtmlEditor(options || $__1.options).dxHtmlEditor('instance');
            };
          },
          afterEach: function() {
            afterCallback && afterCallback();
            this.clock.restore();
          }
        };
      };
      testModule('Events', createModuleConfig({initialOptions: {value: '<p>Test 1</p><p>Test 2</p><p>Test 3</p>'}}), function() {
        test('focusIn event by API', function(assert) {
          this.createEditor();
          var focusInStub = sinon.stub();
          var focusOutStub = sinon.stub();
          this.instance.on('focusIn', focusInStub);
          this.instance.on('focusOut', focusOutStub);
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused');
          assert.strictEqual(focusOutStub.callCount, 0, 'Editor isn\'t blurred');
          $(this.instance._focusTarget()).blur();
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused');
          assert.strictEqual(focusOutStub.callCount, 1, 'Editor is blurred');
        });
        test('focus events should toggle \'dx-state-focused\' class', function(assert) {
          this.createEditor();
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $element = this.instance.$element();
          var $focusTarget = this.instance._focusTarget();
          assert.ok($element.hasClass(FOCUS_STATE_CLASS), 'element has focused class');
          assert.ok($focusTarget.hasClass(FOCUS_STATE_CLASS), 'focusTarget has focused class');
          $(this.instance._focusTarget()).blur();
          this.clock.tick(TIME_TO_WAIT);
          assert.notOk($element.hasClass(FOCUS_STATE_CLASS), 'element doesn\'t have focused class');
          assert.notOk($focusTarget.hasClass(FOCUS_STATE_CLASS), 'focusTarget doesn\'t have focused class');
        });
        test('focus events should not trigger when content is pasted', function(assert) {
          var focusInStub = sinon.stub();
          var focusOutStub = sinon.stub();
          this.createEditor({
            onFocusIn: focusInStub,
            onFocusOut: focusOutStub
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $content = $(this.instance.element()).find(("." + HTML_EDITOR_CONTENT_CLASS));
          $content[0].dispatchEvent(createEvent('paste'));
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused one time');
          assert.strictEqual(focusOutStub.callCount, 0, 'Editor isn\'t blurred');
          $content.blur();
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused one time');
          assert.strictEqual(focusOutStub.callCount, 1, 'Editor is blurred one time');
        });
        test('focus events listeners attached via \'on\' should not trigger when content is pasted', function(assert) {
          var focusInStub = sinon.stub();
          var focusOutStub = sinon.stub();
          this.createEditor({});
          this.instance.on('focusIn', focusInStub);
          this.instance.on('focusOut', focusOutStub);
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var $content = $(this.instance.element()).find(("." + HTML_EDITOR_CONTENT_CLASS));
          $content[0].dispatchEvent(createEvent('paste'));
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused one time');
          assert.strictEqual(focusOutStub.callCount, 0, 'Editor isn\'t blurred');
          $content.blur();
          this.clock.tick(TIME_TO_WAIT);
          assert.strictEqual(focusInStub.callCount, 1, 'Editor is focused one time');
          assert.strictEqual(focusOutStub.callCount, 1, 'Editor is blurred one time');
        });
        test('focus events listeners attached only after the content is rendered (T934089)', function(assert) {
          var $__1 = this;
          var focusInStub = sinon.stub();
          deferUpdate(function() {
            $__1.createEditor({onFocusIn: focusInStub});
          });
          this.instance.focus();
          assert.strictEqual(focusInStub.callCount, 1, 'Focus event handler is attached');
        });
        ['html', 'markdown'].forEach(function(valueType) {
          test(("change value to \"null\" should raise only one ValueChanged event (valueType is \"" + valueType + "\")"), function(assert) {
            var valueChangedStub = sinon.stub();
            var onValueChangedStub = sinon.stub();
            this.createEditor({
              value: 'test',
              onValueChanged: onValueChangedStub,
              valueType: valueType
            });
            this.instance.on('valueChanged', valueChangedStub);
            this.instance.option('value', null);
            assert.ok(onValueChangedStub.calledOnce, 'subscribe via options');
            assert.ok(valueChangedStub.calledOnce, 'subscribe via method');
          });
        });
      });
      testModule('drop and paste events', createModuleConfig({
        beforeCallback: function() {
          return $('#qunit-fixture').addClass('qunit-fixture-visible');
        },
        afterCallback: function() {
          return $('#qunit-fixture').removeClass('qunit-fixture-visible');
        }
      }), function() {
        ['drop', 'paste'].forEach(function(eventType) {
          test(("event should keep valueChanged event on " + eventType), function(assert) {
            var done = assert.async();
            this.createEditor({onValueChanged: function($__3) {
                var event = $__3.event;
                assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                assert.strictEqual(event.type, eventType, 'value changed after "paste" event dispatched');
                done();
              }});
            this.instance.focus();
            this.clock.tick(TIME_TO_WAIT);
            var contentElem = $(this.instance.element()).find(("." + HTML_EDITOR_CONTENT_CLASS)).get(0);
            contentElem.dispatchEvent(createEvent(eventType, eventType === 'drop' ? contentElem : null));
            contentElem.textContent = 'test';
          });
        });
        test('event should keep the last raised event', function(assert) {
          var done = assert.async();
          this.createEditor({onValueChanged: function($__3) {
              var event = $__3.event;
              assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
              assert.strictEqual(event.type, 'paste', 'value changed after "paste" event dispatched');
              done();
            }});
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var contentElem = $(this.instance.element()).find(("." + HTML_EDITOR_CONTENT_CLASS)).get(0);
          contentElem.dispatchEvent(createEvent('drop', contentElem));
          contentElem.dispatchEvent(createEvent('paste'));
          contentElem.textContent = 'test';
        });
      });
      testModule('ValueChanged event', createModuleConfig({}), function() {
        test('event should keep valueChanged event on typing', function(assert) {
          var done = assert.async();
          this.createEditor({onValueChanged: function($__3) {
              var event = $__3.event;
              assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
              assert.strictEqual(event.type, 'keydown', 'value changed after "keydown" event dispatched');
              done();
            }});
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          var contentElem = $(this.instance.element()).find(("." + HTML_EDITOR_CONTENT_CLASS)).get(0);
          keyboardMock(contentElem).type('t');
          contentElem.textContent = 't';
        });
        ['bold', 'italic', 'strike', 'underline', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'orderedList', 'bulletList', 'codeBlock', 'blockquote'].forEach(function(toolbarOperation) {
          test((toolbarOperation + " toolbar item - click on toolbar button should raise valueChanged event with the relevant event"), function(assert) {
            assert.expect(2);
            var done = assert.async();
            this.createEditor({
              value: 'test',
              toolbar: {items: [toolbarOperation]},
              onValueChanged: function($__3) {
                var event = $__3.event;
                if (event) {
                  assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                  assert.strictEqual(event.type, 'dxclick', (toolbarOperation + " toolbar item - value changed after \"dxclick\" event dispatched"));
                  done();
                }
              }
            });
            this.instance.focus();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.setSelection(0, 3);
            $('.dx-htmleditor-toolbar .dx-button').trigger('dxclick');
          });
        });
        [{
          name: 'header',
          acceptedValues: [false, 1, 2, 3, 4, 5]
        }, {
          name: 'size',
          acceptedValues: ['8pt', '10pt']
        }, {
          name: 'font',
          acceptedValues: ['Arial', 'Courier New']
        }].forEach(function(listFormat) {
          var name = listFormat.name;
          test((name + " toolbar item - click on toolbar button should raise valueChanged event with the relevant event"), function(assert) {
            assert.expect(2);
            var done = assert.async();
            this.createEditor({
              value: 'test',
              toolbar: {items: [listFormat]},
              onValueChanged: function($__4) {
                var event = $__4.event;
                if (event) {
                  assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                  assert.strictEqual(event.type, 'dxclick', (name + " toolbar item - value changed after \"dxclick\" event dispatched"));
                  done();
                }
              }
            });
            this.instance.focus();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.setSelection(0, 3);
            $('.dx-htmleditor-toolbar .dx-dropdowneditor-button').trigger('dxclick');
            $('.dx-list-item').last().trigger('dxclick');
          });
        });
        ['color', 'background'].forEach(function(colorDialog) {
          test((colorDialog + " toolbar item - click on toolbar button should raise valueChanged event with the relevant event"), function(assert) {
            assert.expect(2);
            var done = assert.async();
            this.createEditor({
              value: 'test',
              toolbar: {items: [colorDialog]},
              onValueChanged: function($__3) {
                var event = $__3.event;
                if (event) {
                  assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                  assert.strictEqual(event.type, 'dxclick', (colorDialog + " toolbar item - value changed after \"dxclick\" event dispatched"));
                  done();
                }
              }
            });
            this.instance.focus();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.setSelection(0, 3);
            $('.dx-htmleditor-toolbar .dx-button').trigger('dxclick');
            keyboardMock($('.dx-texteditor-input').first()).type('100').change();
            $('.dx-formdialog .dx-toolbar .dx-button').first().trigger('dxclick');
          });
        });
        test('link toolbar item - click on toolbar button should raise valueChanged event with the relevant event', function(assert) {
          assert.expect(2);
          var done = assert.async();
          var operationName = 'link';
          this.createEditor({
            value: 'test',
            toolbar: {items: [operationName]},
            onValueChanged: function($__3) {
              var event = $__3.event;
              if (event) {
                assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                assert.strictEqual(event.type, 'dxclick', (operationName + " toolbar item - value changed after \"dxclick\" event dispatched"));
                done();
              }
            }
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          this.instance.setSelection(0, 3);
          $('.dx-htmleditor-toolbar .dx-button').trigger('dxclick');
          keyboardMock($('.dx-texteditor-input').first()).type('http://testdomain.test').change();
          $('.dx-formdialog .dx-toolbar .dx-button').first().trigger('dxclick');
        });
        test('image toolbar item - click on toolbar button should raise valueChanged event with the relevant event', function(assert) {
          assert.expect(2);
          var done = assert.async();
          var operationName = 'image';
          this.createEditor({
            value: 'test',
            toolbar: {items: [operationName]},
            onValueChanged: function($__3) {
              var event = $__3.event;
              if (event) {
                assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                assert.strictEqual(event.type, 'dxclick', (operationName + " toolbar item - value changed after \"dxclick\" event dispatched"));
                done();
              }
            }
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          this.instance.setSelection(0, 3);
          $('.dx-htmleditor-toolbar .dx-button').trigger('dxclick');
          keyboardMock($('.dx-texteditor-input').first()).type(ORANGE_PIXEL).change();
          $('.dx-formdialog .dx-toolbar .dx-button').first().trigger('dxclick');
        });
        test('clear formatting - click on toolbar button should raise valueChanged event with the relevant event', function(assert) {
          assert.expect(2);
          var done = assert.async();
          this.createEditor({
            value: '<b>test</b>',
            toolbar: {items: ['clear']},
            onValueChanged: function($__3) {
              var event = $__3.event;
              if (event) {
                assert.ok(event instanceof dxEvent, 'event is instance of the dxEvent');
                assert.strictEqual(event.type, 'dxclick', 'clear toolbar item - value changed after "dxclick" event dispatched');
                done();
              }
            }
          });
          this.instance.focus();
          this.clock.tick(TIME_TO_WAIT);
          this.instance.setSelection(0, 3);
          $('.dx-htmleditor-toolbar .dx-button').trigger('dxclick');
        });
        test('dxpointermove event propagation should be stopped on HtmlEditor content to fix selection (T1045869)', function(assert) {
          var isIos = devices.current().platform === 'ios';
          assert.expect(1);
          this.createEditor();
          var $editorContent = this.$container.find('.dx-htmleditor-content');
          eventsEngine.on($editorContent, 'dxpointermove', function(e) {
            assert.strictEqual(e.isPropagationStopped(), isIos);
          });
          $editorContent.trigger('dxpointermove');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","ui/html_editor/converters/markdown","core/utils/common","events","core/devices","events/core/events_engine","../../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("ui/html_editor/converters/markdown"), require("core/utils/common"), require("events"), require("core/devices"), require("events/core/events_engine"), require("../../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=events.tests.js.map