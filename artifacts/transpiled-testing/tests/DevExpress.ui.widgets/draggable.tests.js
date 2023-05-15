!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/draggable.tests.js"], ["jquery","core/utils/common","../../helpers/pointerMock.js","core/utils/view_port","events/gesture/emitter.gesture.js","animation/frame","animation/translator","animation/fx","../../helpers/keyboardMock.js","generic_light.css!","ui/draggable","ui/scroll_view","ui/overlay"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/draggable.tests.js", ["jquery", "core/utils/common", "../../helpers/pointerMock.js", "core/utils/view_port", "events/gesture/emitter.gesture.js", "animation/frame", "animation/translator", "animation/fx", "../../helpers/keyboardMock.js", "generic_light.css!", "ui/draggable", "ui/scroll_view", "ui/overlay"], function($__export) {
  "use strict";
  var $,
      noop,
      pointerMock,
      viewPort,
      GestureEmitter,
      animationFrame,
      translator,
      fx,
      keyboardMock,
      DRAGGABLE_CLASS,
      MAX_INTEGER,
      setupDraggable,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      viewPort = $__m.default;
    }, function($__m) {
      GestureEmitter = $__m.default;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      $('body').css({
        minHeight: '800px',
        minWidth: '800px',
        margin: '0px',
        padding: '0px'
      });
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            .fixedPosition.dx-draggable-dragging {\n                position: fixed;\n            }\n            #area {\n                width: 300px;\n                height: 250px;\n                position: relative;\n                background: green;\n            }\n            #draggable {\n                width: 30px;\n                height: 50px;\n                background: yellow;\n            }\n            #draggableWithHandle {\n                width: 100px;\n                height: 100px;\n                background: grey;\n            }\n            #handle {\n                width: 30px;\n                height: 30px;\n                background: grey;\n            }\n            #items {\n                width: 300px;\n                height: 250px;\n                position: relative;\n                background: grey;\n            }\n            #items .draggable {\n                width: 30px;\n                height: 50px;\n            }\n            #item1 { background: yellow; }\n            #item2 { background: red; }\n            #item3 { background: blue; }\n            #scrollable {\n                display: none;\n                width: 250px;\n                height: 250px;\n                overflow: auto;\n                position: absolute;\n                left: 0;\n                top: 0;\n            }\n            #scrollable-container {\n                width: 500px;\n                height: 500px;\n            }\n            #scrollableItem {\n                width: 30px;\n                height: 50px;\n                background: black;\n            }\n        </style>\n        <div id=\"area\">\n            <div id=\"draggable\"></div>\n            <div id=\"draggableWithHandle\">\n                <div id=\"handle\"></div>\n            </div>\n        </div>\n        <div id=\"items\">\n            <div id=\"item1\" class=\"draggable\"></div>\n            <div id=\"item2\" class=\"draggable\"></div>\n            <div id=\"item3\" class=\"draggable\"></div>\n        </div>\n        <div id=\"other\"></div>\n        <div id=\"scrollable\">\n            <div id=\"scrollable-container\">\n                <div id=\"scrollableItem\" class=\"draggable\"></div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      DRAGGABLE_CLASS = 'dx-draggable';
      MAX_INTEGER = 2147483647;
      setupDraggable = function(that, $element) {
        $('#qunit-fixture').addClass('qunit-fixture-visible');
        that.$element = $element;
        that.createDraggable = function(options, $element) {
          return that.draggableInstance = ($element || that.$element).dxDraggable($.extend({boundary: $('body')}, options)).dxDraggable('instance');
        };
        that.pointer = pointerMock(that.$element).start();
        that.checkPosition = function(left, top, assert, $element) {
          assert.deepEqual(($element || that.$element).offset(), {
            left: left,
            top: top
          }, 'position of the draggable element');
        };
      };
      moduleConfig = {
        beforeEach: function() {
          setupDraggable(this, $('#draggable'));
        },
        afterEach: function() {
          $('#qunit-fixture').removeClass('qunit-fixture-visible');
          this.draggableInstance && this.draggableInstance.dispose();
        }
      };
      QUnit.module('Initialization', moduleConfig, function() {
        QUnit.test('Initialize draggable component', function(assert) {
          assert.ok(this.createDraggable().$element().hasClass(DRAGGABLE_CLASS), 'element has the \'dx-draggable\' class');
          assert.strictEqual(this.$element.text(), '', 'element is empty');
        });
        QUnit.test('\'immediate\' option', function(assert) {
          this.createDraggable({immediate: false});
          GestureEmitter.touchBoundary(10);
          try {
            this.pointer.down().move(5, 0).up();
          } finally {
            GestureEmitter.touchBoundary(0);
            this.checkPosition(0, 0, assert);
          }
        });
      });
      QUnit.module('Events', moduleConfig, function() {
        QUnit.test('component arg in events if component option is defined', function(assert) {
          var myComponent = $('<div>').dxScrollView().dxScrollView('instance');
          var options = {
            component: myComponent,
            onDragStart: sinon.spy(),
            onDragMove: sinon.spy(),
            onDragEnd: sinon.spy()
          };
          this.createDraggable(options);
          this.pointer.down().move(0, 20).up();
          assert.strictEqual(options.onDragStart.getCall(0).args[0].component, myComponent, 'onDragStart component');
          assert.strictEqual(options.onDragStart.getCall(0).args[0].element, myComponent.element(), 'onDragStart element');
          assert.strictEqual(options.onDragMove.getCall(0).args[0].component, myComponent, 'onDragMove component');
          assert.strictEqual(options.onDragMove.getCall(0).args[0].element, myComponent.element(), 'onDragMove element');
          assert.strictEqual(options.onDragEnd.getCall(0).args[0].component, myComponent, 'onDragEnd component');
          assert.strictEqual(options.onDragEnd.getCall(0).args[0].fromComponent, myComponent, 'onDragEnd fromComponent');
          assert.strictEqual(options.onDragEnd.getCall(0).args[0].toComponent, myComponent, 'onDragEnd toComponent');
          assert.strictEqual(options.onDragEnd.getCall(0).args[0].element, myComponent.element(), 'onDragEnd element');
        });
        QUnit.test('onCancelByEsc option changing', function(assert) {
          this.$element.prop('tabindex', 0);
          var keyboard = keyboardMock(this.$element);
          var initialPosition = translator.locate(this.$element);
          this.createDraggable({onCancelByEsc: true});
          this.pointer.down().move(0, 40);
          keyboard.keyDown('esc');
          this.pointer.move(0, 80).up();
          assert.deepEqual(translator.locate(this.$element), initialPosition, 'element position');
          this.$element.prop('tabindex', undefined);
        });
        QUnit.test('onDragCancel option called if drag canceled', function(assert) {
          var onDragCancelSpy = sinon.spy();
          this.$element.prop('tabindex', 0);
          var keyboard = keyboardMock(this.$element);
          this.createDraggable({
            onCancelByEsc: true,
            onDragCancel: onDragCancelSpy
          });
          this.pointer.down().move(0, 40);
          keyboard.keyDown('esc');
          this.pointer.move(0, 80).up();
          assert.ok(onDragCancelSpy.calledOnce, 'event fired');
          this.$element.prop('tabindex', undefined);
        });
        QUnit.test('onDragStart - check args', function(assert) {
          var onDragStartSpy = sinon.spy();
          var draggable = this.createDraggable({onDragStart: onDragStartSpy});
          this.pointer.down().move(0, 20);
          assert.ok(onDragStartSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragStartSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.strictEqual(onDragStartSpy.getCall(0).args[0].component, draggable, 'component');
        });
        QUnit.test('\'onDragStart\' option changing', function(assert) {
          var onDragStartSpy = sinon.spy();
          var draggable = this.createDraggable();
          draggable.option('onDragStart', onDragStartSpy);
          this.pointer.down().move(0, 20);
          assert.ok(onDragStartSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragStartSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
        });
        QUnit.test('onDragStart - not drag item when eventArgs.cancel is true', function(assert) {
          var onDragStartSpy = sinon.spy(function(e) {
            e.cancel = true;
          });
          this.createDraggable({onDragStart: onDragStartSpy});
          this.pointer.down().move(0, 20);
          assert.ok(onDragStartSpy.calledOnce, 'event fired');
          assert.notOk(this.$element.hasClass('dx-draggable-dragging'), 'element isn\'t dragged');
        });
        QUnit.test('onDragMove - check args', function(assert) {
          var onDragMoveSpy = sinon.spy();
          this.createDraggable({onDragMove: onDragMoveSpy});
          this.pointer.down().move(0, 20);
          assert.ok(onDragMoveSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragMoveSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
        });
        QUnit.test('\'onDragMove\' option changing', function(assert) {
          var onDragMoveSpy = sinon.spy();
          var draggable = this.createDraggable();
          draggable.option('onDragMove', onDragMoveSpy);
          this.pointer.down().move(0, 20);
          assert.ok(onDragMoveSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragMoveSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
        });
        ['same', 'another'].forEach(function(group) {
          QUnit.test('onDragMove - check args when cross-component dragging to ' + group + ' group', function(assert) {
            var onDragMoveSpy = sinon.spy();
            var draggable1 = this.createDraggable({
              onDragMove: onDragMoveSpy,
              group: 'shared'
            });
            var draggable2 = this.createDraggable({group: group === 'same' ? 'shared' : 'another'}, $('#items'));
            this.pointer.down().move(0, 300).move(0, 10);
            assert.strictEqual(onDragMoveSpy.callCount, 2, 'event was called twice');
            assert.deepEqual($(onDragMoveSpy.getCall(1).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
            assert.deepEqual(onDragMoveSpy.getCall(1).args[0].fromComponent, draggable1, 'fromComponent');
            assert.deepEqual(onDragMoveSpy.getCall(1).args[0].toComponent, group === 'same' ? draggable2 : draggable1, 'toComponent');
          });
        });
        QUnit.test('onDragEnd - check args', function(assert) {
          var onDragEndSpy = sinon.spy();
          this.createDraggable({onDragEnd: onDragEndSpy});
          this.pointer.down().move(0, 20).up();
          assert.ok(onDragEndSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragEndSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
        });
        QUnit.test('\'onDragEnd\' option changing', function(assert) {
          var onDragEndSpy = sinon.spy();
          var draggable = this.createDraggable();
          draggable.option('onDragEnd', onDragEndSpy);
          this.pointer.down().move(0, 20).up();
          assert.ok(onDragEndSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragEndSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
        });
        QUnit.test('onDragEnd - check args when cross-component dragging', function(assert) {
          var onDragEndSpy = sinon.spy();
          var draggable1 = this.createDraggable({
            onDragEnd: onDragEndSpy,
            group: 'shared'
          });
          var draggable2 = this.createDraggable({group: 'shared'}, $('#items'));
          this.pointer.down().move(0, 300).move(0, 10).up();
          assert.strictEqual(onDragEndSpy.callCount, 1, 'event fired');
          assert.deepEqual($(onDragEndSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.deepEqual(onDragEndSpy.getCall(0).args[0].fromComponent, draggable1, 'fromComponent');
          assert.deepEqual(onDragEndSpy.getCall(0).args[0].toComponent, draggable2, 'toComponent');
        });
        QUnit.test('onDragEnd - not drag item when eventArgs.cancel is true', function(assert) {
          var onDragEndSpy = sinon.spy(function(e) {
            e.cancel = true;
          });
          this.createDraggable({onDragEnd: onDragEndSpy});
          var initialPosition = translator.locate(this.$element);
          this.pointer.down().move(0, 40).up();
          assert.ok(onDragEndSpy.calledOnce, 'event fired');
          assert.deepEqual(translator.locate(this.$element), initialPosition, 'element position');
        });
        QUnit.test('\'disabled\' option', function(assert) {
          var instance = this.createDraggable({dragDirection: 'horizontal'});
          instance.option('disabled', true);
          this.pointer.down().move(100, 0).up();
          this.checkPosition(0, 0, assert);
          instance.option('disabled', false);
          this.pointer.down().move(100, 0).up();
          this.checkPosition(100, 0, assert);
        });
        QUnit.test('\'dx-state-disabled\' class (T284305)', function(assert) {
          var instance = this.createDraggable({dragDirection: 'horizontal'});
          instance.$element().addClass('dx-state-disabled');
          this.pointer.down().move(100, 0).up();
          this.checkPosition(0, 0, assert);
          instance.$element().removeClass('dx-state-disabled');
          this.pointer.down().move(100, 0).up();
          this.checkPosition(100, 0, assert);
        });
        QUnit.test('onDrop - check args', function(assert) {
          var onDropSpy = sinon.spy(function(e) {
            if (e.fromComponent !== e.toComponent) {
              $(e.element).append(e.itemElement);
            }
          });
          var draggable1 = this.createDraggable({group: 'shared'});
          var draggable2 = this.createDraggable({
            onDrop: onDropSpy,
            group: 'shared'
          }, $('#items'));
          this.pointer.down().move(0, 300).up();
          assert.strictEqual(onDropSpy.callCount, 1, 'onDrop is called');
          assert.deepEqual($(onDropSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.strictEqual(onDropSpy.getCall(0).args[0].toComponent, draggable2, 'component');
          assert.strictEqual(onDropSpy.getCall(0).args[0].fromComponent, draggable1, 'sourceComponent');
          assert.strictEqual($(draggable2.element()).children('#draggable').length, 1, 'dropped item');
        });
        QUnit.test('onDrop - check args when clone is true', function(assert) {
          var onDropSpy = sinon.spy(function(e) {
            if (e.fromComponent !== e.toComponent) {
              $(e.element).append(e.itemElement);
            }
          });
          var draggable1 = this.createDraggable({
            group: 'shared',
            data: 'x',
            clone: true
          });
          var draggable2 = this.createDraggable({
            group: 'shared',
            data: 'y',
            onDrop: onDropSpy
          }, $('#items'));
          this.pointer.down().move(0, 400).up();
          assert.strictEqual(onDropSpy.callCount, 1, 'onDrop is called');
          assert.deepEqual($(onDropSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.strictEqual(onDropSpy.getCall(0).args[0].fromComponent, draggable1, 'fromComponent');
          assert.strictEqual(onDropSpy.getCall(0).args[0].toComponent, draggable2, 'toComponent');
          assert.strictEqual(onDropSpy.getCall(0).args[0].fromData, 'x', 'fromData');
          assert.strictEqual(onDropSpy.getCall(0).args[0].toData, 'y', 'toData');
          assert.strictEqual($(draggable2.element()).children('#draggable').length, 1, 'dropped item');
        });
        QUnit.test('onDrop - not drop item when eventArgs.cancel is true', function(assert) {
          var onDropSpy = sinon.spy(function(e) {
            e.cancel = true;
          });
          this.createDraggable({group: 'shared'});
          var draggable2 = this.createDraggable({
            group: 'shared',
            onDrop: onDropSpy
          }, $('#items'));
          this.pointer.down().move(0, 400).up();
          assert.strictEqual(onDropSpy.callCount, 1, 'onDrop is called');
          assert.strictEqual($(draggable2.element()).children('#draggable').length, 0, 'item isn\'t droped');
        });
        QUnit.test('onDragStart - add item data to event arguments', function(assert) {
          var itemData = {test: true};
          var onDragStartSpy = sinon.spy(function(e) {
            e.itemData = itemData;
          });
          var draggable = this.createDraggable({
            data: 'x',
            onDragStart: onDragStartSpy
          });
          this.pointer.down().move(0, 400).up();
          assert.strictEqual(onDragStartSpy.callCount, 1, 'onDragStart is called');
          assert.deepEqual(onDragStartSpy.getCall(0).args[0].fromData, 'x', 'fromData arg');
          assert.deepEqual(draggable.option('itemData'), itemData, 'itemData option');
        });
        QUnit.test('onDrop - check itemData arg', function(assert) {
          var itemData = {test: true};
          var onDropSpy = sinon.spy();
          var onDragStartSpy = sinon.spy(function(e) {
            e.itemData = itemData;
          });
          var draggable1 = this.createDraggable({
            group: 'shared',
            onDragStart: onDragStartSpy
          });
          this.createDraggable({
            group: 'shared',
            onDrop: onDropSpy
          }, $('#items'));
          this.pointer.down().move(0, 400).up();
          assert.strictEqual(onDragStartSpy.callCount, 1, 'onDragStart is called');
          assert.deepEqual(draggable1.option('itemData'), itemData, 'itemData');
          assert.strictEqual(onDropSpy.callCount, 1, 'onDrop is called');
          assert.deepEqual(onDropSpy.getCall(0).args[0].itemData, itemData, 'itemData in onDrop event arguments');
        });
        QUnit.test('onDragEnd - the position should be correctly reset when eventArgs.cancel is true and element has a fixed position', function(assert) {
          $('#items').children().css('float', 'right');
          this.createDraggable({
            filter: '>.draggable',
            onDragStart: function(e) {
              $(e.itemElement).addClass('fixedPosition');
            },
            onDragEnd: function(e) {
              e.cancel = true;
            }
          }, $('#items'));
          var initialLocate = translator.locate($('#items').children().eq(0));
          pointerMock($('#items').children().eq(0)).start({
            x: 275,
            y: 255
          }).down().move(100, 100).up();
          assert.deepEqual(translator.locate($('#items').children().eq(0)), initialLocate);
        });
        QUnit.test('onDragEnd - the position should be correctly reset when eventArgs.cancel is true and element has a specified location', function(assert) {
          translator.move($('#items').children().first(), {
            left: 50,
            top: 50
          });
          $('#items').children().css('float', 'right');
          this.createDraggable({
            filter: '>.draggable',
            onDragStart: function(e) {
              $(e.itemElement).addClass('fixedPosition');
            },
            onDragEnd: function(e) {
              e.cancel = true;
            }
          }, $('#items'));
          var initialLocate = translator.locate($('#items').children().eq(0));
          pointerMock($('#items').children().eq(0)).start({
            x: 325,
            y: 305
          }).down().move(100, 100).up();
          assert.deepEqual(translator.locate($('#items').children().eq(0)), initialLocate);
        });
        QUnit.test('onDragEnd - the position should be reset if an error occurs during drag', function(assert) {
          this.createDraggable({
            filter: '>.draggable',
            onDragEnd: function(e) {
              e.cancel = true;
              throw new Error('test');
            }
          }, $('#items'));
          var initialLocate = translator.locate($('#items').children().eq(0));
          try {
            pointerMock($('#items').children().eq(0)).start({
              x: 325,
              y: 305
            }).down().move(100, 100).up();
          } catch (e) {
            assert.deepEqual(translator.locate($('#items').children().eq(0)), initialLocate);
            assert.notOk($('#items').children().eq(0).hasClass('dx-draggable-dragging'), 'item hasn\'t \'dx-draggable-dragging\' class');
          }
        });
        QUnit.test('The onDrop event should be called regardless of the order to subscribe to drag event', function(assert) {
          var onDropSpy = sinon.spy();
          var draggable2 = this.createDraggable({
            group: 'shared',
            onDrop: onDropSpy
          }, $('#items'));
          var draggable1 = this.createDraggable({group: 'shared'});
          var dragElementOffset1 = $(draggable1.element()).offset();
          var dragElementOffset2 = $(draggable2.element()).offset();
          this.pointer.down(dragElementOffset1.left, dragElementOffset1.top).move(dragElementOffset2.left - dragElementOffset1.left, dragElementOffset2.top - dragElementOffset1.top).up();
          assert.strictEqual(onDropSpy.callCount, 1, 'onDrop is called');
        });
        QUnit.test('onDragEnd - eventArgs.cancel as a promise that is resolved with false', function(assert) {
          var d = $.Deferred();
          var onDragEndSpy = sinon.spy(function(e) {
            e.cancel = d.promise();
          });
          this.createDraggable({onDragEnd: onDragEndSpy});
          var initialOffset = this.$element.offset();
          this.pointer.down().move(0, 40).up();
          assert.ok(this.$element.hasClass('dx-draggable-dragging'), 'element is dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top + 40
          }, 'element position');
          d.resolve(false);
          assert.notOk(this.$element.hasClass('dx-draggable-dragging'), 'element isn\'t dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top + 40
          }, 'element position');
        });
        QUnit.test('onDragEnd - eventArgs.cancel as a promise that is resolved with true', function(assert) {
          var d = $.Deferred();
          var onDragEndSpy = sinon.spy(function(e) {
            e.cancel = d.promise();
          });
          this.createDraggable({onDragEnd: onDragEndSpy});
          var initialOffset = this.$element.offset();
          this.pointer.down().move(0, 40).up();
          assert.ok(this.$element.hasClass('dx-draggable-dragging'), 'element is dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top + 40
          }, 'element position');
          d.resolve(true);
          assert.notOk(this.$element.hasClass('dx-draggable-dragging'), 'element isn\'t dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top
          }, 'element position');
        });
        QUnit.test('onDragEnd - eventArgs.cancel as a promise that is rejected', function(assert) {
          var d = $.Deferred();
          var onDragEndSpy = sinon.spy(function(e) {
            e.cancel = d.promise();
          });
          this.createDraggable({onDragEnd: onDragEndSpy});
          var initialOffset = this.$element.offset();
          this.pointer.down().move(0, 40).up();
          assert.ok(this.$element.hasClass('dx-draggable-dragging'), 'element is dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top + 40
          }, 'element position');
          d.reject();
          assert.notOk(this.$element.hasClass('dx-draggable-dragging'), 'element isn\'t dragged');
          assert.deepEqual(this.$element.offset(), {
            left: initialOffset.left,
            top: initialOffset.top
          }, 'element position');
        });
        QUnit.test('onDragEnd - check toComponent arg when cross-component dragging into nested draggable', function(assert) {
          var onDragEndSpy = sinon.spy();
          this.createDraggable({
            group: 'shared',
            onDragEnd: onDragEndSpy
          }, $('#other'));
          this.createDraggable({group: 'shared'}, $('#area'));
          var draggable = this.createDraggable({group: 'shared'});
          var otherOffset = $('#other').offset();
          var draggableOffset = $('#draggable').offset();
          pointerMock($('#other')).start({
            x: otherOffset.left,
            y: otherOffset.top
          }).down().move(draggableOffset.left - otherOffset.left + 1, draggableOffset.top - otherOffset.top + 1).move(10, 10).up();
          assert.deepEqual(onDragEndSpy.getCall(0).args[0].toComponent, draggable, 'args - toComponent');
        });
        QUnit.test('onDragEnd - check toComponent arg when dragging over a nested draggable (clone is true)', function(assert) {
          var onDragEndSpy = sinon.spy();
          var draggable = this.createDraggable({
            group: 'shared',
            onDragEnd: onDragEndSpy,
            clone: true
          }, $('#area'));
          this.createDraggable({group: 'shared'});
          var areaOffset = $('#area').offset();
          var draggableOffset = $('#draggable').offset();
          pointerMock($('#area')).start({
            x: areaOffset.left,
            y: areaOffset.top
          }).down().move(draggableOffset.left - areaOffset.left + 1, draggableOffset.top - areaOffset.top + 1).move(10, 10).up();
          assert.deepEqual(onDragEndSpy.getCall(0).args[0].toComponent, draggable, 'args - toComponent');
        });
        QUnit.test('onDragEnter - check args', function(assert) {
          var onDragEnterSpy = sinon.spy();
          var draggable1 = this.createDraggable({group: 'shared'});
          var draggable2 = this.createDraggable({
            group: 'shared',
            onDragEnter: onDragEnterSpy
          }, $('#items'));
          var pointer = this.pointer.down().move(0, 50);
          onDragEnterSpy.reset();
          pointer.move(0, 250).move(0, 50);
          assert.ok(onDragEnterSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragEnterSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.deepEqual(onDragEnterSpy.getCall(0).args[0].fromComponent, draggable1, 'fromComponent');
          assert.deepEqual(onDragEnterSpy.getCall(0).args[0].toComponent, draggable2, 'toComponent');
        });
        QUnit.test('onDragLeave - check args', function(assert) {
          var onDragLeaveSpy = sinon.spy();
          var draggable1 = this.createDraggable({group: 'shared'});
          var draggable2 = this.createDraggable({
            group: 'shared',
            onDragLeave: onDragLeaveSpy
          }, $('#items'));
          var pointer = this.pointer.down().move(0, 300).move(0, 50);
          onDragLeaveSpy.reset();
          pointer.move(0, -200);
          assert.ok(onDragLeaveSpy.calledOnce, 'event fired');
          assert.deepEqual($(onDragLeaveSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.deepEqual(onDragLeaveSpy.getCall(0).args[0].fromComponent, draggable1, 'fromComponent');
          assert.deepEqual(onDragLeaveSpy.getCall(0).args[0].toComponent, draggable2, 'toComponent');
        });
        QUnit.test('onDraggableElementShown - check args', function(assert) {
          var onDraggableElementShownSpy = sinon.spy();
          var itemData = {test: true};
          var draggable = this.createDraggable({
            onDraggableElementShown: onDraggableElementShownSpy,
            itemData: itemData,
            data: itemData
          });
          this.pointer.down().move(0, 20);
          assert.ok(onDraggableElementShownSpy.calledOnce, 'event fired');
          var args = onDraggableElementShownSpy.getCall(0).args[0];
          assert.deepEqual($(args.itemElement).get(0), this.$element.get(0), 'itemElement');
          assert.deepEqual(args.component, draggable, 'component');
          assert.deepEqual(args.itemData, itemData, 'itemData');
          assert.deepEqual(args.fromData, itemData, 'fromData');
          assert.deepEqual($(args.dragElement).get(0), $('.dx-draggable-dragging').get(0), 'dragElement');
        });
      });
      QUnit.module('\'dragDirection\' option', moduleConfig, function() {
        QUnit.test('\'horizontal\'', function(assert) {
          this.createDraggable({dragDirection: 'horizontal'});
          this.pointer.down().move(100).up();
          this.checkPosition(100, 0, assert);
          this.pointer.down().move(0, 100).up();
          this.checkPosition(100, 0, assert);
        });
        QUnit.test('\'vertical\'', function(assert) {
          this.createDraggable({dragDirection: 'vertical'});
          this.pointer.down().move(0, 100).up();
          this.checkPosition(0, 100, assert);
          this.pointer.down().move(100, 0).up();
          this.checkPosition(0, 100, assert);
        });
        QUnit.test('\'both\'', function(assert) {
          this.createDraggable({});
          this.pointer.down().move(100, 100).up();
          this.checkPosition(100, 100, assert);
        });
        QUnit.test('changing', function(assert) {
          var draggable = this.createDraggable({});
          draggable.option('dragDirection', 'horizontal');
          this.pointer.down().move(100).up();
          this.checkPosition(100, 0, assert);
          this.pointer.down().move(0, 100).up();
          this.checkPosition(100, 0, assert);
        });
        QUnit.test('dragging-class toggling', function(assert) {
          var draggable = this.createDraggable({});
          draggable.option('dragDirection', 'horizontal');
          assert.ok(!this.$element.hasClass('dx-draggable-dragging'), 'element has not appropriate class before dragging');
          this.pointer.down().move(100);
          assert.ok(this.$element.hasClass('dx-draggable-dragging'), 'element has right class');
          this.pointer.up();
          assert.ok(!this.$element.hasClass('dx-draggable-dragging'), 'element has not appropriate class');
        });
        QUnit.test('source-class toggling', function(assert) {
          this.createDraggable({});
          assert.ok(!this.$element.hasClass('dx-draggable-source'), 'element has not appropriate class before dragging');
          this.pointer.down().move(100);
          assert.ok(this.$element.hasClass('dx-draggable-source'), 'element has right class');
          this.pointer.down().up();
          assert.ok(!this.$element.hasClass('dx-draggable-source'), 'element has not appropriate class');
        });
      });
      QUnit.module('bounds', moduleConfig, function() {
        QUnit.test('\'boundary\' option as element', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          this.createDraggable({boundary: $('#area')});
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width(), areaHeight - this.$element.height(), assert);
        });
        QUnit.test('\'boundary\' option as window', function(assert) {
          var $area = $(window);
          var areaWidth = $area.outerWidth();
          var areaHeight = $area.outerHeight();
          this.createDraggable({
            autoScroll: false,
            boundary: $area
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width(), areaHeight - this.$element.height(), assert);
        });
        QUnit.test('\'boundary\' option as function', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          var lastAreaContext = null;
          var draggable = this.createDraggable({boundary: function() {
              lastAreaContext = this;
              return $area;
            }});
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width(), areaHeight - this.$element.height(), assert);
          assert.strictEqual(lastAreaContext, draggable);
        });
        QUnit.test('\'boundOffsets\' option as plain object, pair', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          var boundOffset = {
            h: 1,
            v: 2
          };
          this.createDraggable({
            boundary: $area,
            boundOffset: boundOffset
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width() - boundOffset.h, areaHeight - this.$element.height() - boundOffset.v, assert);
          this.pointer.down().move(-areaWidth - 150, -areaHeight - 150).up();
          this.checkPosition(boundOffset.h, boundOffset.v, assert);
        });
        QUnit.test('\'boundOffsets\' option as plain object, quad', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          var boundOffset = {
            left: 1,
            top: 2,
            right: 3,
            bottom: 4
          };
          this.createDraggable({
            boundary: $area,
            boundOffset: boundOffset
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width() - boundOffset.right, areaHeight - this.$element.height() - boundOffset.bottom, assert);
          this.pointer.down().move(-areaWidth - 150, -areaHeight - 150).up();
          this.checkPosition(boundOffset.left, boundOffset.top, assert);
        });
        QUnit.test('\'boundOffsets\' option as function', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          var boundOffset = {
            h: 1,
            v: -2
          };
          var draggable = this.createDraggable({
            boundary: $area,
            boundOffset: function() {
              assert.strictEqual(this, draggable);
              return boundOffset;
            }
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width() - boundOffset.h, areaHeight - this.$element.height() - boundOffset.v, assert);
          this.pointer.down().move(-areaWidth - 150, -areaHeight - 150).up();
          this.checkPosition(boundOffset.h, boundOffset.v, assert);
        });
        QUnit.test('\'boundOffset\' option as string, pair', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          this.createDraggable({
            boundary: $area,
            boundOffset: '1 -2'
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width() - 1, areaHeight - this.$element.height() - (-2), assert);
          this.pointer.down().move(-areaWidth - 150, -areaHeight - 150).up();
          this.checkPosition(1, -2, assert);
        });
        QUnit.test('\'boundOffset\' option as string, quad', function(assert) {
          var $area = $('#area');
          var areaWidth = $area.width();
          var areaHeight = $area.height();
          this.createDraggable({
            boundary: $area,
            boundOffset: '1 2 3 4'
          });
          this.pointer.down().move(areaWidth + 150, areaHeight + 150).up();
          this.checkPosition(areaWidth - this.$element.width() - 3, areaHeight - this.$element.height() - 4, assert);
          this.pointer.down().move(-areaWidth - 150, -areaHeight - 150).up();
          this.checkPosition(1, 2, assert);
        });
      });
      QUnit.module('\'allowMoveByClick\' option', moduleConfig, function() {
        QUnit.test('enabled', function(assert) {
          this.createDraggable({allowMoveByClick: true});
          pointerMock(viewPort.value()).down(100, 100);
          this.checkPosition(100 - this.$element.width() / 2, 100 - this.$element.height() / 2, assert);
        });
        QUnit.test('enabled in rtl mode', function(assert) {
          var $area = $('#area');
          $area.css('direction', 'rtl');
          this.createDraggable({
            allowMoveByClick: true,
            rtlEnabled: true,
            'area': $area
          });
          pointerMock($area).down(100, 100);
          this.checkPosition(100 - this.$element.width() / 2, 100 - this.$element.height() / 2, assert);
        });
        QUnit.test('Dragging an element should work correctly after click when it is positioned relative to an adjacent element', function(assert) {
          var $items = $('#items');
          $items.children().css('display', 'inline-block');
          setupDraggable(this, $('#item2'));
          this.createDraggable({
            allowMoveByClick: true,
            boundary: $items
          });
          pointerMock($items).down(100, 300);
          this.checkPosition(100 - this.$element.width() / 2, 300 - this.$element.height() / 2, assert);
        });
        QUnit.test('changing', function(assert) {
          var draggable = this.createDraggable({});
          draggable.option('allowMoveByClick', true);
          pointerMock(viewPort.value()).down(100, 100);
          this.checkPosition(100 - this.$element.width() / 2, 100 - this.$element.height() / 2, assert);
        });
        QUnit.test('behaviour depends from \'area\' option', function(assert) {
          var $area = $('#area');
          this.createDraggable({
            allowMoveByClick: true,
            boundary: $area
          });
          pointerMock($area).down(100, 100);
          this.checkPosition(100 - this.$element.width() / 2, 100 - this.$element.height() / 2, assert);
          pointerMock($('#other')).down(-100, -100);
          this.checkPosition(100 - this.$element.width() / 2, 100 - this.$element.height() / 2, assert);
        });
      });
      QUnit.module('regressions', moduleConfig, function() {
        QUnit.test('start element position on second gesture should not be equal to initial', function(assert) {
          this.createDraggable();
          this.pointer.down().move(100, 100).up().down().move(50, 50).up();
          this.checkPosition(150, 150, assert);
        });
        QUnit.test('immediate drag after click should work correctly', function(assert) {
          var $area = $('#area');
          this.createDraggable({
            boundary: $area,
            allowMoveByClick: true
          });
          pointerMock($area).start().down(50, 50);
          this.pointer.move(60, 60).up();
          this.checkPosition(60 - this.$element.width() / 2, 60 - this.$element.height() / 2, assert);
        });
        QUnit.test('\'onDragMove\' callback should be fired on area click', function(assert) {
          var $area = $('#area');
          var onDragMoveSpy = sinon.spy(noop);
          this.createDraggable({
            boundary: $area,
            allowMoveByClick: true,
            onDragMove: onDragMoveSpy
          });
          this.pointer.down();
          assert.ok(onDragMoveSpy.calledOnce);
        });
        QUnit.test('element position on click should be updated considering dragDirection', function(assert) {
          var $area = $('#area');
          var elementHeight = this.$element.height();
          var elementPosition = this.$element.position();
          this.createDraggable({
            boundary: $area,
            allowMoveByClick: true,
            dragDirection: 'vertical'
          });
          pointerMock($area).down(elementPosition.left + 10, elementPosition.top + elementHeight + 5);
          this.checkPosition(elementPosition.left, elementPosition.top + elementHeight / 2 + 5, assert);
        });
        QUnit.test('Start position should be correct when the element has a fixed position', function(assert) {
          $('#items').children().css('float', 'right');
          this.createDraggable({
            filter: '>.draggable',
            onDragStart: function(e) {
              $(e.itemElement).addClass('fixedPosition');
            }
          }, $('#items'));
          pointerMock($('#items').children().eq(0)).start({
            x: 275,
            y: 255
          }).down().move(100, 100);
          this.checkPosition(370, 350, assert, $('#items').children().eq(0));
        });
        QUnit.test('Start position should be correct when the element has a fixed position and clone is true', function(assert) {
          $('#items').children().css('float', 'right');
          this.createDraggable({
            filter: '>.draggable',
            clone: true,
            onDragStart: function(e) {
              $(e.itemElement).addClass('fixedPosition');
            }
          }, $('#items'));
          pointerMock($('#items').children().eq(0)).start({
            x: 275,
            y: 255
          }).down().move(100, 100);
          this.checkPosition(370, 350, assert, $('body').children('.dx-draggable-dragging'));
        });
        QUnit.test('Start position should be correct when element has a fixed position and a specified location', function(assert) {
          translator.move($('#items').children().first(), {
            left: 50,
            top: 50
          });
          $('#items').children().css('float', 'right');
          this.createDraggable({
            filter: '>.draggable',
            onDragStart: function(e) {
              $(e.itemElement).addClass('fixedPosition');
            }
          }, $('#items'));
          pointerMock($('#items').children().eq(0)).start({
            x: 325,
            y: 305
          }).down().move(100, 100);
          this.checkPosition(420, 400, assert, $('#items').children().eq(0));
        });
      });
      QUnit.module('clone', moduleConfig, function() {
        QUnit.test('Clone an element when dragging', function(assert) {
          this.createDraggable({clone: true});
          this.pointer.down().move(10, 10);
          var $cloneElement = $('body').children('.dx-draggable-dragging').children('#draggable');
          assert.strictEqual($cloneElement.length, 1, 'cloned element');
          assert.ok($cloneElement.parent().hasClass('dx-draggable-dragging'), 'parent of cloned element has dragging class');
          assert.ok(this.$element.hasClass('dx-draggable-source'), 'element has source class');
          assert.notOk(this.$element.hasClass('dx-draggable-dragging'), 'original element hasn\'t dragging class');
          assert.notOk($cloneElement.hasClass('dx-draggable-source'), 'cloned element hasn\'t source class');
          assert.ok($cloneElement.parent().hasClass('dx-draggable-clone'), 'cloned element has dragging class');
          assert.equal($cloneElement.parent().css('z-index'), MAX_INTEGER, 'z-index of the cloned element');
          this.checkPosition(10, 10, assert, $cloneElement);
          this.checkPosition(0, 0, assert);
          assert.notOk($cloneElement.hasClass('dx-rtl'), 'clone has not dx-rtl class');
          assert.equal($cloneElement.css('direction'), 'ltr', 'clone\'s direction is ltr');
        });
        QUnit.test('Clone\'s direction should be rtl if rtlEnabled: true', function(assert) {
          this.createDraggable({
            clone: true,
            rtlEnabled: true
          });
          this.pointer.down().move(10, 10);
          var $cloneElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($cloneElement.length, 1, 'cloned element');
          assert.ok($cloneElement.hasClass('dx-rtl'), 'clone has dx-rtl class');
          assert.equal($cloneElement.css('direction'), 'rtl', 'clone\'s direction is rtl');
        });
        QUnit.test('Remove cloned element after the drop end', function(assert) {
          var $cloneElement;
          this.createDraggable({clone: true});
          this.pointer.down().move(10, 10);
          $cloneElement = $('body').children('.dx-draggable-dragging').children('#draggable');
          assert.strictEqual($cloneElement.length, 1, 'there is a cloned element');
          this.pointer.up();
          $cloneElement = $('body').children('.dx-draggable-dragging').children('#draggable');
          assert.strictEqual($cloneElement.length, 0, 'there isn\'t a cloned element');
        });
        QUnit.test('Remove cloned element when disposing', function(assert) {
          var $cloneElement;
          this.createDraggable({clone: true});
          this.pointer.down().move(10, 10);
          $cloneElement = $('body').children('.dx-draggable-dragging').children('#draggable');
          assert.strictEqual($cloneElement.length, 1, 'there is a cloned element');
          this.draggableInstance.dispose();
          $cloneElement = $('body').children('.dx-draggable-dragging').children('#draggable');
          assert.strictEqual($cloneElement.length, 0, 'there isn\'t a cloned element');
        });
        QUnit.test('The cloned element offset should be correct when the parent container has offset', function(assert) {
          $('#area').css({
            top: '300px',
            left: '300px'
          });
          this.createDraggable({clone: true});
          this.pointer.down().move(10, 10);
          this.checkPosition(310, 310, assert, $('body').children('.dx-draggable-dragging').children('#draggable'));
        });
        QUnit.test('The drag element offset should be correct when the parent container has offset', function(assert) {
          $('#area').css({
            top: '300px',
            left: '300px'
          });
          this.createDraggable({});
          this.pointer.down().move(10, 10);
          this.checkPosition(310, 310, assert);
        });
      });
      QUnit.module('container', moduleConfig, function() {
        QUnit.test('Set container', function(assert) {
          this.createDraggable({
            clone: true,
            container: $('#other')
          });
          this.pointer.down().move(10, 10);
          assert.strictEqual($('#qunit-fixture').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
          assert.strictEqual($('#other').children('.dx-draggable-dragging').children('#draggable').length, 1, 'there is a cloned element');
        });
        QUnit.test('The drag element offset should be correct when the parent container has offset and the container is specified', function(assert) {
          $('#area').css({
            top: '300px',
            left: '300px'
          });
          $('#other').css({
            position: 'relative',
            left: '600px',
            top: '600px'
          });
          this.createDraggable({
            clone: true,
            container: $('#other')
          });
          this.pointer.down().move(10, 10);
          this.checkPosition(310, 310, assert, $('#other').children('.dx-draggable-dragging').children('#draggable'));
        });
        QUnit.test('Remove element from the container after the drop end', function(assert) {
          this.createDraggable({
            clone: true,
            container: $('#other')
          });
          this.pointer.down().move(10, 10);
          assert.strictEqual($('#qunit-fixture').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
          assert.strictEqual($('#other').children('.dx-draggable-dragging').children('#draggable').length, 1, 'there is a cloned element');
          this.pointer.up();
          assert.strictEqual($('#qunit-fixture').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
          assert.strictEqual($('#other').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
        });
        QUnit.test('Remove element from the container when disposing', function(assert) {
          this.createDraggable({
            clone: true,
            container: $('#other')
          });
          this.pointer.down().move(10, 10);
          assert.strictEqual($('#qunit-fixture').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
          assert.strictEqual($('#other').children('.dx-draggable-dragging').children('#draggable').length, 1, 'there is a cloned element');
          this.draggableInstance.dispose();
          assert.strictEqual($('#qunit-fixture').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
          assert.strictEqual($('#other').children('.dx-draggable-dragging').children('#draggable').length, 0, 'there isn\'t a cloned element');
        });
      });
      QUnit.module('dragTemplate', moduleConfig, function() {
        QUnit.test('Set dragTemplate', function(assert) {
          var template = sinon.spy(function() {
            return $('<div id=\'myDragElement\'/>').text('test');
          });
          this.createDraggable({dragTemplate: template});
          this.pointer.down().move(10, 10);
          assert.strictEqual($('body').children('.dx-draggable-dragging').children('#myDragElement').length, 1, 'there is a drag element');
          assert.strictEqual(template.callCount, 1, 'template is called');
          assert.deepEqual($(template.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'args[0].itemElement');
          assert.deepEqual($(template.getCall(0).args[1]).get(0), $(viewPort.value()).children('.dx-draggable-dragging').get(0), 'args[1] - container');
        });
        QUnit.test('Remove my element after the drop end', function(assert) {
          this.createDraggable({dragTemplate: function() {
              return $('<div id=\'myDragElement\'/>').text('test');
            }});
          this.pointer.down().move(10, 10);
          assert.strictEqual($('#myDragElement').length, 1, 'there is a cloned element');
          this.pointer.up();
          assert.strictEqual($('#myDragElement').length, 0, 'there isn\'t a cloned element');
        });
        QUnit.test('Remove my element when disposing', function(assert) {
          this.createDraggable({dragTemplate: function() {
              return $('<div id=\'myDragElement\'/>').text('test');
            }});
          this.pointer.down().move(10, 10);
          assert.strictEqual($('#myDragElement').length, 1, 'there is a cloned element');
          this.draggableInstance.dispose();
          assert.strictEqual($('#myDragElement').length, 0, 'there isn\'t a cloned element');
        });
        QUnit.test('Dragging element should not be removed if dragTemplate option is changed during dragging (T867087)', function(assert) {
          this.createDraggable({dragTemplate: function() {
              return $('<div id=\'myDragElement1\'>');
            }});
          this.pointer.down().move(10, 10);
          this.draggableInstance.option('dragTemplate', function() {
            return $('<div id=\'myDragElement2\'>');
          });
          assert.strictEqual($('#myDragElement1').length, 1, 'first dragTemplate is rendered');
          assert.strictEqual($('#myDragElement2').length, 0, 'second dragTemplate is not rendered');
          this.pointer.up().down().move(10, 10);
          assert.strictEqual($('#myDragElement1').length, 0, 'first dragTemplate is not rendered');
          assert.strictEqual($('#myDragElement2').length, 1, 'second dragTemplate is rendered');
        });
      });
      QUnit.module('filter', $.extend({}, moduleConfig, {beforeEach: function() {
          setupDraggable(this, $('#items'));
        }}), function() {
        QUnit.test('Set filter', function(assert) {
          var $dragItemElement;
          this.createDraggable({filter: '.draggable'});
          var items = this.$element.children();
          $dragItemElement = items.eq(0);
          pointerMock($dragItemElement).start().down().move(20, 20).up();
          this.checkPosition(20, 270, assert, items.eq(0));
          $dragItemElement = items.eq(1);
          pointerMock($dragItemElement).start().down().move(20, 20).up();
          this.checkPosition(20, 320, assert, items.eq(1));
          $dragItemElement = items.eq(2);
          pointerMock($dragItemElement).start().down().move(20, 20).up();
          this.checkPosition(20, 370, assert, items.eq(2));
        });
        QUnit.test('No exceptions on area click', function(assert) {
          this.createDraggable({
            filter: '.draggable',
            boundary: '#items'
          });
          try {
            pointerMock($('#items')).start().down().move(10, 10);
            assert.ok(true, 'No exceptions');
          } catch (e) {
            assert.ok(false, 'exception');
          }
        });
      });
      QUnit.module('handle', $.extend({}, moduleConfig, {beforeEach: function() {
          setupDraggable(this, $('#draggableWithHandle'));
        }}), function() {
        QUnit.test('Set handle', function(assert) {
          this.createDraggable({handle: '#handle'});
          this.pointer.down().move(10, 10).up();
          this.checkPosition(0, 50, assert);
          pointerMock(this.$element.find('#handle').first()).start().down().move(10, 10);
          this.checkPosition(10, 60, assert);
        });
      });
      QUnit.module('autoScroll', $.extend({}, moduleConfig, {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          setupDraggable(this, $('#scrollableItem'));
          this.originalRAF = animationFrame.requestAnimationFrame;
          animationFrame.requestAnimationFrame = function(callback) {
            return window.setTimeout(callback, 10);
          };
          $('#area').hide();
          $('#items').hide();
          $('#other').hide();
          $('#scrollable').show();
          $('#scrollable').scrollTop(0);
          $('#scrollable').scrollLeft(0);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
          animationFrame.requestAnimationFrame = this.originalRAF;
          $('#scrollable').hide();
          $('#area').show();
          $('#items').show();
          $('#other').show();
        }
      }), function() {
        QUnit.test('Vertical scrolling', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop #1');
          this.pointer.down().move(0, 240);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop #2');
          this.pointer.move(0, 1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 1, 'scrollTop #3');
          this.pointer.down().move(0, 4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 6, 'scrollTop #4');
          this.pointer.down().move(0, 4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 23, 'scrollTop #5');
          this.pointer.move(0, -239);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 23, 'scrollTop #6');
          this.pointer.move(0, -1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 22, 'scrollTop #7');
          this.pointer.down().move(0, -4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 17, 'scrollTop #8');
          this.pointer.down().move(0, -4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop #9');
        });
        QUnit.test('onDragMove should be fired during scrolling', function(assert) {
          var onDragMoveSpy = sinon.spy();
          this.createDraggable({
            scrollSensitivity: 10,
            onDragMove: onDragMoveSpy,
            scrollSpeed: 20
          });
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          this.pointer.down().move(0, 240);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          this.pointer.down().move(0, 1);
          for (var i = 1; i < 10; i++) {
            this.clock.tick(10);
            assert.equal(onDragMoveSpy.callCount, i + 2, 'onDragMove called');
          }
        });
        QUnit.test('Horizontal scrolling', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          this.pointer.down().move(240, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          this.pointer.move(1, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 1, 'scrollLeft');
          this.pointer.down().move(4, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 6, 'scrollLeft');
          this.pointer.down().move(4, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 23, 'scrollLeft');
          this.pointer.move(-239, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 23, 'scrollLeft');
          this.pointer.move(-1, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 22, 'scrollLeft');
          this.pointer.down().move(-4, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 17, 'scrollLeft');
          this.pointer.down().move(-4, 0);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
        });
        QUnit.test('Horizontal and vertical scrolling', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          this.pointer.down().move(240, 240);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          this.pointer.move(1, 1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 1, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 1, 'scrollLeft');
          this.pointer.down().move(4, 4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 6, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 6, 'scrollLeft');
          this.pointer.down().move(4, 4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 23, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 23, 'scrollLeft');
          this.pointer.move(-239, -239);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 23, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 23, 'scrollLeft');
          this.pointer.move(-1, -1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 22, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 22, 'scrollLeft');
          this.pointer.down().move(-4, -4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 17, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 17, 'scrollLeft');
          this.pointer.down().move(-4, -4);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
        });
        QUnit.test('Vertical scrolling should not start if on drag start cursor is close to the scrollable border', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          $('#scrollableItem').offset({
            top: 200,
            left: 0
          });
          this.pointer.down().move(0, 245);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
        });
        QUnit.test('Horizontal scrolling should not start if on drag start cursor is close to the scrollable border', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          $('#scrollableItem').offset({
            top: 0,
            left: 200
          });
          this.pointer.down().move(245, 0);
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
        });
        [false, true].forEach(function(isOverlay) {
          QUnit.test(("Scrolling with scrollView" + (isOverlay ? ' inside overlay' : '')), function(assert) {
            $('body').toggleClass('dx-overlay-content', isOverlay);
            var scrollView = $('#scrollable').dxScrollView({
              direction: 'both',
              useNative: false
            }).dxScrollView('instance');
            this.createDraggable({
              scrollSensitivity: 10,
              scrollSpeed: 20
            });
            assert.deepEqual(scrollView.scrollOffset(), {
              top: 0,
              left: 0
            }, 'scrollOffset');
            this.pointer.down().move(240, 240);
            this.pointer.move(1, 1);
            this.clock.tick(10);
            assert.deepEqual(scrollView.scrollOffset(), {
              top: 1,
              left: 1
            }, 'scrollOffset');
            this.pointer.move(-1, -1);
            this.clock.tick(10);
            assert.deepEqual(scrollView.scrollOffset(), {
              top: 1,
              left: 1
            }, 'scrollOffset');
            $('body').removeClass('dx-overlay-content');
          });
        });
        QUnit.test('Autoscroll should work fine if element was dropped and dragged again', function(assert) {
          this.createDraggable({
            scrollSensitivity: 10,
            scrollSpeed: 20
          });
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          this.pointer.move(245, 245).down();
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          this.pointer.move(-5, -5);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 0, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 0, 'scrollTop');
          this.pointer.move(1, 1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 1, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 1, 'scrollTop');
          this.pointer.up().move(1, 1);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 1, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 1, 'scrollTop');
          this.pointer.down().move(3, 3);
          this.clock.tick(10);
          assert.equal($('#scrollable').scrollLeft(), 1, 'scrollLeft');
          assert.equal($('#scrollable').scrollTop(), 1, 'scrollTop');
        });
        QUnit.test('Autoscroll should not work when draggable element over Overlay content', function(assert) {
          var $__2 = this;
          fx.off = true;
          try {
            $('#other').show().dxOverlay({
              width: 150,
              height: 250,
              visible: true,
              position: {
                my: 'left top',
                at: 'left top',
                of: 'body'
              },
              contentTemplate: function(container) {
                var $dragElement = $('<div id=\'myDraggable\'/>').css({
                  width: '50px',
                  height: '50px'
                });
                $__2.createDraggable({
                  scrollSensitivity: 10,
                  scrollSpeed: 20
                }, $dragElement);
                return $dragElement;
              }
            });
            assert.strictEqual($('#scrollable').scrollTop(), 0, 'scrollTop');
            var pointer = pointerMock($('#myDraggable')).start();
            pointer.down().move(0, 240);
            this.clock.tick(10);
            pointer.down().move(0, 1);
            this.clock.tick(10);
            assert.strictEqual($('#scrollable').scrollTop(), 0, 'scrollTop');
          } finally {
            fx.off = false;
          }
        });
        [true, false].forEach(function(shading) {
          QUnit.test(("Autoscroll should " + (shading ? 'not' : '') + " work when draggable element over Overlay wrapper with shading = " + shading), function(assert) {
            var $__2 = this;
            fx.off = true;
            var origViewPort = viewPort.value();
            var fixtureRoot = $('#qunit-fixture').get(0);
            if (fixtureRoot.getRootNode().host) {
              viewPort.value(fixtureRoot);
            }
            try {
              $('#other').show().dxOverlay({
                width: 150,
                height: 250,
                visible: true,
                shading: shading,
                position: {
                  my: 'left top',
                  at: 'left top',
                  of: 'body'
                },
                contentTemplate: function(container) {
                  var $dragElement = $('<div id=\'myDraggable\'/>').css({
                    width: '50px',
                    height: '50px'
                  });
                  $__2.createDraggable({
                    scrollSensitivity: 10,
                    scrollSpeed: 20
                  }, $dragElement);
                  return $dragElement;
                }
              });
              assert.strictEqual($('#scrollable').scrollTop(), 0, 'scrollTop');
              var pointer = pointerMock($('#myDraggable')).start();
              pointer.down().move(200, 240);
              this.clock.tick(10);
              pointer.down().move(0, 1);
              this.clock.tick(10);
              assert.strictEqual($('#scrollable').scrollTop(), shading ? 0 : 1, 'scrollTop');
            } finally {
              fx.off = false;
              viewPort.value(origViewPort);
            }
          });
        });
      });
      QUnit.module('cursorOffset', moduleConfig, function() {
        QUnit.test('set cursorOffset as string', function(assert) {
          this.createDraggable({cursorOffset: '20 20'});
          this.pointer.down(40, 40).move(10, 10);
          assert.strictEqual(this.$element.length, 1, 'there is a drag element');
          assert.deepEqual(this.$element.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
        });
        QUnit.test('set cursorOffset as object', function(assert) {
          this.createDraggable({cursorOffset: {
              x: 20,
              y: 20
            }});
          this.pointer.down(40, 40).move(10, 10);
          assert.strictEqual(this.$element.length, 1, 'there is a drag element');
          assert.deepEqual(this.$element.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
        });
        QUnit.test('set cursorOffset as function', function(assert) {
          var cursorOffsetSpy = sinon.spy(function() {
            return {
              x: 20,
              y: 20
            };
          });
          this.createDraggable({cursorOffset: cursorOffsetSpy});
          this.pointer.down(40, 40).move(10, 10);
          assert.strictEqual(this.$element.length, 1, 'there is a drag element');
          assert.deepEqual(this.$element.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
          assert.deepEqual($(cursorOffsetSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'item element');
          assert.deepEqual($(cursorOffsetSpy.getCall(0).args[0].dragElement).get(0), this.$element.get(0), 'drag element');
        });
        QUnit.test('set cursorOffset as string when clone is true', function(assert) {
          this.createDraggable({
            cursorOffset: '20 20',
            clone: true
          });
          this.pointer.down(40, 40).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($dragElement.length, 1, 'there is a drag element');
          assert.deepEqual($dragElement.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
        });
        QUnit.test('set cursorOffset as object when clone is true', function(assert) {
          this.createDraggable({
            cursorOffset: {
              x: 20,
              y: 20
            },
            clone: true
          });
          this.pointer.down(40, 40).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($dragElement.length, 1, 'there is a drag element');
          assert.deepEqual($dragElement.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
        });
        QUnit.test('set cursorOffset as function when clone is true', function(assert) {
          var cursorOffsetSpy = sinon.spy(function() {
            return {
              x: 20,
              y: 20
            };
          });
          this.createDraggable({
            cursorOffset: cursorOffsetSpy,
            clone: true
          });
          this.pointer.down(40, 40).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($dragElement.length, 1, 'there is a drag element');
          assert.deepEqual($dragElement.offset(), {
            left: 30,
            top: 30
          }, 'drag element offset');
          assert.deepEqual($(cursorOffsetSpy.getCall(0).args[0].itemElement).get(0), this.$element.get(0), 'item element');
          assert.deepEqual($(cursorOffsetSpy.getCall(0).args[0].dragElement).get(0), $dragElement.get(0), 'drag element');
        });
        QUnit.test('cursorOffset should be correct when the \'y\' coordinate is zero', function(assert) {
          this.createDraggable({
            cursorOffset: {
              x: 20,
              y: 0
            },
            clone: true
          });
          this.pointer.down(40, 40).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($dragElement.length, 1, 'there is a drag element');
          assert.deepEqual($dragElement.offset(), {
            left: 30,
            top: 50
          }, 'drag element offset');
        });
        QUnit.test('cursorOffset should be correct when the \'x\' coordinate is zero', function(assert) {
          this.createDraggable({
            cursorOffset: {
              x: 0,
              y: 20
            },
            clone: true
          });
          this.pointer.down(40, 40).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.strictEqual($dragElement.length, 1, 'there is a drag element');
          assert.deepEqual($dragElement.offset(), {
            left: 50,
            top: 30
          }, 'drag element offset');
        });
        QUnit.test('cursorOffset should be correct when the dragTemplate is specified', function(assert) {
          this.$element.width(150).height(150);
          this.createDraggable({
            cursorOffset: {
              x: 20,
              y: 20
            },
            dragTemplate: function(options) {
              return $(options.itemElement).clone().width(50).height(50);
            }
          });
          this.pointer.down(100, 100).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.deepEqual($dragElement.offset(), {
            left: 90,
            top: 90
          }, 'drag element offset');
        });
        QUnit.test('cursorOffset should be correct when \'y\' coordinate isn\'t set and dragTemplate is specified', function(assert) {
          this.$element.width(150).height(150);
          this.createDraggable({
            cursorOffset: {x: 20},
            dragTemplate: function(options) {
              return $(options.itemElement).clone().width(50).height(50);
            }
          });
          this.pointer.down(100, 100).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.deepEqual($dragElement.offset(), {
            left: 90,
            top: 10
          }, 'drag element offset');
        });
        QUnit.test('cursorOffset should be correct when \'x\' coordinate isn\'t set and dragTemplate is specified', function(assert) {
          this.$element.width(150).height(150);
          this.createDraggable({
            cursorOffset: {y: 20},
            dragTemplate: function(options) {
              return $(options.itemElement).clone().width(50).height(50);
            }
          });
          this.pointer.down(100, 100).move(10, 10);
          var $dragElement = $('body').children('.dx-draggable-dragging');
          assert.deepEqual($dragElement.offset(), {
            left: 10,
            top: 90
          }, 'drag element offset');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/pointerMock.js","core/utils/view_port","events/gesture/emitter.gesture.js","animation/frame","animation/translator","animation/fx","../../helpers/keyboardMock.js","generic_light.css!","ui/draggable","ui/scroll_view","ui/overlay"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/pointerMock.js"), require("core/utils/view_port"), require("events/gesture/emitter.gesture.js"), require("animation/frame"), require("animation/translator"), require("animation/fx"), require("../../helpers/keyboardMock.js"), require("generic_light.css!"), require("ui/draggable"), require("ui/scroll_view"), require("ui/overlay"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=draggable.tests.js.map