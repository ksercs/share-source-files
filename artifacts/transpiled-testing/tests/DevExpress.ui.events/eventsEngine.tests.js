!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.events/eventsEngine.tests.js"], ["jquery","events/core/events_engine","../../helpers/keyboardMock.js","events/core/event_registrator","core/utils/version"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.events/eventsEngine.tests.js", ["jquery", "events/core/events_engine", "../../helpers/keyboardMock.js", "events/core/event_registrator", "core/utils/version"], function($__export) {
  "use strict";
  var $,
      eventsEngine,
      keyboardMock,
      registerEvent,
      compareVersion;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      registerEvent = $__m.default;
    }, function($__m) {
      compareVersion = $__m.compare;
    }],
    execute: function() {
      QUnit.module('base');
      QUnit.test('on/one/trigger/off', function(assert) {
        var element = document.createElement('div');
        var handlerSpy = sinon.spy();
        eventsEngine.on(element, 'myEvent', handlerSpy);
        eventsEngine.trigger(element, 'myEvent');
        assert.ok(handlerSpy.calledOnce);
        eventsEngine.off(element, 'myEvent');
        eventsEngine.trigger(element, 'myEvent');
        assert.ok(handlerSpy.calledOnce);
        handlerSpy = sinon.spy();
        eventsEngine.one(element, 'myOneTimeEvent', handlerSpy);
        eventsEngine.trigger(element, 'myOneTimeEvent');
        eventsEngine.trigger(element, 'myOneTimeEvent');
        assert.ok(handlerSpy.calledOnce);
      });
      QUnit.test('using the array of DOM elements', function(assert) {
        var element1 = document.createElement('div');
        var element2 = document.createElement('div');
        var element3 = document.createElement('div');
        var handlerSpy = sinon.spy();
        eventsEngine.on([element1, element2, element3], 'myEvent', handlerSpy);
        eventsEngine.trigger([element1, element2], 'myEvent');
        assert.equal(handlerSpy.callCount, 2);
        eventsEngine.off([element2, element3], 'myEvent');
        eventsEngine.trigger([element1, element2], 'myEvent');
        assert.equal(handlerSpy.callCount, 3);
      });
      QUnit.module('namespaces');
      QUnit.test('Event is not removed if \'off\' has extra namespace', function(assert) {
        var done = assert.async();
        var element = document.createElement('div');
        eventsEngine.on(element, 'click.ns1.ns2.ns3', function() {
          assert.ok(true);
          done();
        });
        eventsEngine.off(element, 'click.ns1.ns2.ns4');
        eventsEngine.trigger(element, 'click');
      });
      QUnit.test('Event is removed for any namespace', function(assert) {
        assert.expect(0);
        var done = assert.async();
        var element = document.createElement('div');
        eventsEngine.on(element, 'click.ns1.ns2.ns3', function() {
          assert.ok(true);
          done();
        });
        eventsEngine.on(element, 'mousemove.ns1.ns2.ns3', function() {
          assert.ok(true);
          done();
        });
        eventsEngine.off(element, 'click.ns1');
        eventsEngine.off(element, 'mousemove');
        eventsEngine.trigger(element, 'click');
        eventsEngine.trigger(element, 'mousemove');
        done();
      });
      QUnit.test('Trigger custom events', function(assert) {
        var done = assert.async();
        assert.expect(4);
        var element = document.createElement('div');
        eventsEngine.on(element, 'click.ns1.ns2.ns3', function() {
          assert.ok(true);
        });
        eventsEngine.trigger(element, 'click');
        eventsEngine.trigger(element, 'click.ns1');
        eventsEngine.trigger(element, 'click.ns2');
        eventsEngine.trigger(element, 'click.ns2.ns3');
        eventsEngine.trigger(element, 'click.custom');
        eventsEngine.trigger(element, 'click.ns2.custom');
        done();
      });
      QUnit.module('native handler');
      QUnit.test('add single native handler for one element, handler removed', function(assert) {
        var element = document.createElement('div');
        var addListener = sinon.spy(HTMLElement.prototype, 'addEventListener');
        var delListener = sinon.spy(HTMLElement.prototype, 'removeEventListener');
        var handler1 = function() {};
        var handler2 = function() {
          assert.ok(false);
        };
        eventsEngine.on(element, 'click.ns1', handler1);
        eventsEngine.on(element, 'click', handler2);
        assert.ok(addListener.calledOnce);
        eventsEngine.off(element, 'click.ns1', handler1);
        assert.ok(delListener.notCalled);
        eventsEngine.off(element, 'click', handler2);
        assert.ok(delListener.calledOnce);
        eventsEngine.trigger(element, 'click');
        addListener.restore();
        delListener.restore();
      });
      QUnit.test('triggering \'click\' event for checkbox calls native click method', function(assert) {
        var counter = 0;
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        var click = sinon.spy(HTMLElement.prototype, 'click');
        var handler = function() {
          counter++;
        };
        document.body.appendChild(checkbox);
        eventsEngine.on(checkbox, 'click', handler);
        assert.notOk(checkbox.checked);
        eventsEngine.trigger(checkbox, 'click');
        assert.ok(checkbox.checked);
        eventsEngine.trigger(checkbox, 'click');
        assert.notOk(checkbox.checked);
        assert.equal(counter, 2);
        assert.equal(click.callCount, 2);
        click.restore();
      });
      QUnit.test(' trigering \'click\' event for <a> does not calls native click method', function(assert) {
        var a = document.createElement('a');
        var click = sinon.spy(HTMLElement.prototype, 'click');
        document.body.appendChild(a);
        eventsEngine.trigger(a, 'click');
        assert.ok(click.notCalled);
        click.restore();
      });
      QUnit.test('\'focusin\' and \'focus\' events call element.focus, \'focusout\' and \'blur\' - element.blur', function(assert) {
        var textBox = document.createElement('input');
        textBox.type = 'text';
        var focus = sinon.spy(HTMLElement.prototype, 'focus');
        var blur = sinon.spy(HTMLElement.prototype, 'blur');
        document.body.appendChild(textBox);
        eventsEngine.trigger(textBox, 'focusin');
        eventsEngine.trigger(textBox, 'focusout');
        eventsEngine.trigger(textBox, 'focus');
        eventsEngine.trigger(textBox, 'blur');
        if (QUnit.urlParams['nojquery']) {
          assert.ok(focus.calledTwice);
          assert.ok(blur.calledTwice);
        } else {
          assert.expect(0);
        }
        blur.restore();
        focus.restore();
      });
      QUnit.test('focusin event bubbling', function(assert) {
        var textBox = document.createElement('input');
        var container = document.createElement(container);
        var handlerSpy = sinon.spy();
        container.appendChild(textBox);
        eventsEngine.on(container, 'focusin', handlerSpy);
        eventsEngine.trigger(textBox, 'focusin');
        assert.equal(handlerSpy.callCount, 1);
      });
      QUnit.test('prevent triggered \'load\' event bubbling to body', function(assert) {
        var done = assert.async();
        var image = document.createElement('img');
        eventsEngine.on(image, 'load', function() {
          assert.ok(true);
          done();
        });
        eventsEngine.on(document.body, 'load', function() {
          assert.ok(false);
        });
        document.body.appendChild(image);
        eventsEngine.trigger(image, 'load');
      });
      QUnit.test('Simulate clicks, check which property', function(assert) {
        var testData = [{
          button: 2,
          which: 3
        }, {
          button: 0,
          which: 1
        }, {
          button: 1,
          which: 2
        }, {
          button: 3,
          which: 4
        }, {
          button: 4,
          which: 5
        }];
        var i = 0;
        var div = document.createElement('div');
        var handler = function(e) {
          assert.equal(e.which, testData[i].which);
        };
        var fireEvent = function(button) {
          var event = div.ownerDocument.createEvent('MouseEvents');
          event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, button, null);
          div.dispatchEvent(event);
        };
        document.body.appendChild(div);
        eventsEngine.on(div, 'click', handler);
        for (; i < testData.length; i++) {
          fireEvent(testData[i].button);
        }
      });
      QUnit.test('Simulate tab press, check key property', function(assert) {
        var done = assert.async();
        var input = document.createElement('input');
        input.type = 'text';
        var handler = function(e) {
          assert.equal(e.key, 'Tab');
          done();
        };
        document.body.appendChild(input);
        eventsEngine.on(input, 'keydown', handler);
        var keyboard = keyboardMock(input);
        keyboard.press('tab');
      });
      QUnit.test('Event bubbling', function(assert) {
        var fired = {
          focus: 0,
          click: 0,
          load: 0
        };
        var div = document.createElement('div');
        document.body.appendChild(div);
        var event;
        var handler = function() {
          fired[event]++;
        };
        for (event in fired) {
          eventsEngine.on(window, event, handler);
          eventsEngine.on(document, event, handler);
          eventsEngine.on(document.body, event, handler);
          eventsEngine.trigger(div, event);
        }
        assert.equal(fired.click, 3);
        assert.equal(fired.load, 0);
        assert.equal(fired.focus, 0);
      });
      QUnit.test('Should not fire event when relatedTarget is children of a target', function(assert) {
        var div = document.createElement('div');
        var childNode = document.createElement('div');
        var fired = 0;
        div.appendChild(childNode);
        document.body.appendChild(div);
        eventsEngine.on(div, 'mouseleave', function() {
          fired++;
        });
        var event = new eventsEngine.Event('mouseleave', {
          target: div,
          relatedTarget: childNode
        });
        eventsEngine.trigger(div, event);
        assert.equal(fired, 0);
      });
      QUnit.test('Should work with SVG element as a target', function(assert) {
        var svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var childElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgContainer.appendChild(childElement);
        eventsEngine.on(svgContainer, 'mouseleave', function() {});
        var event = new eventsEngine.Event('mouseleave', {
          target: svgContainer,
          relatedTarget: childElement
        });
        eventsEngine.trigger(svgContainer, event);
        assert.ok(true, 'Not failed');
      });
      QUnit.test('On/trigger/off event listeners', function(assert) {
        if (compareVersion($.fn.jquery, [1], 1) === 0) {
          assert.expect(0);
          return;
        }
        var eventNames = ['mouseover', 'mouseout', 'pointerover', 'pointerout'].concat(eventsEngine.forcePassiveFalseEventNames);
        var div = document.createElement('div');
        var callbackIsCalled;
        document.body.appendChild(div);
        var addListener = sinon.spy(HTMLElement.prototype, 'addEventListener');
        var removeListener = sinon.spy(HTMLElement.prototype, 'removeEventListener');
        eventNames.forEach(function(eventName) {
          addListener.reset();
          removeListener.reset();
          eventsEngine.on(div, eventName, function(e) {
            callbackIsCalled = true;
          });
          assert.deepEqual(addListener.callCount, 1, eventName + ': addListener.callCount, 1');
          if (eventsEngine.forcePassiveFalseEventNames.indexOf(eventName) > -1 && eventsEngine.passiveEventHandlersSupported()) {
            assert.deepEqual(addListener.getCall(0).args[2].passive, false, eventName + ': passive, false');
          } else {
            assert.deepEqual(addListener.getCall(0).args[2], undefined, eventName + ': addListener.options is undefined');
          }
          callbackIsCalled = false;
          eventsEngine.trigger(div, eventName);
          assert.ok(callbackIsCalled, eventName + ': callbackIsCalled');
          eventsEngine.off(div, eventName);
          assert.deepEqual(removeListener.callCount, 1, eventName + ': removeListener.callCount, 1');
          callbackIsCalled = false;
          eventsEngine.trigger(div, eventName);
          assert.ok(!callbackIsCalled, eventName + ': off.callbackIsCalled');
        });
        addListener.restore();
        removeListener.restore();
      });
      QUnit.test('Passive event listeners support detection, positive case', function(assert) {
        var addEventListenerStub = sinon.stub(window, 'addEventListener', function(name, handler, options) {
          options.passive;
        });
        var isPassiveEventListenerSupported = eventsEngine.detectPassiveEventHandlersSupport();
        assert.ok(isPassiveEventListenerSupported);
        addEventListenerStub.restore();
      });
      QUnit.test('Passive event listeners support detection, negative case', function(assert) {
        var addEventListenerStub = sinon.stub(window, 'addEventListener', function(name, handler) {});
        var isPassiveEventListenerSupported = eventsEngine.detectPassiveEventHandlersSupport();
        assert.notOk(isPassiveEventListenerSupported);
        addEventListenerStub.restore();
      });
      QUnit.test('\'on\' signatures', function(assert) {
        var fired = 0;
        var hasData = 0;
        var event = 'click';
        var div = document.createElement('div');
        var handler = function(e) {
          fired++;
          if (e.data && e.data.testData)
            hasData++;
        };
        var eventObj = {};
        eventObj[event] = handler;
        div.className += ' someclass';
        document.body.appendChild(div);
        eventsEngine.on(div, event, handler);
        eventsEngine.on(div, eventObj);
        eventsEngine.on(div, eventObj, {testData: true});
        eventsEngine.on(document, event, '.someclass', handler);
        eventsEngine.on(div, event, {testData: true}, handler);
        eventsEngine.on(document, event, '.someclass', {testData: true}, handler);
        eventsEngine.trigger(div, event);
        assert.equal(fired, 6);
        assert.equal(hasData, 3);
      });
      QUnit.test('mouseenter bubble to document (throught catching native \'mouseover\'), has delegateTarget', function(assert) {
        var div = document.createElement('div');
        div.className = 'selector';
        var handler = function(e) {
          assert.ok(true);
          assert.equal(e.delegateTarget, document);
        };
        document.body.appendChild(div);
        eventsEngine.on(document, 'mouseenter', '.selector', handler);
        var triggerEvent = function(name, bubble) {
          var mouseMoveEvent = document.createEvent('MouseEvents');
          mouseMoveEvent.initMouseEvent(name, bubble, false, window, 1, 50, 50, 50, 50, false, false, false, false, 0, null);
          div.dispatchEvent(mouseMoveEvent);
        };
        triggerEvent('mouseover', true);
      });
      QUnit.test('delegateTarget', function(assert) {
        var event = 'click';
        var div = document.createElement('div');
        var p = document.createElement('p');
        var divHandler = function(e) {
          assert.equal(e.delegateTarget, div);
          assert.equal(e.target, p);
          assert.equal(this, div);
        };
        var docHandler = function(e) {
          assert.equal(e.delegateTarget, document);
          assert.equal(e.target, p);
          assert.equal(this, div);
        };
        var pHandler = function(e) {
          assert.equal(e.delegateTarget, p);
          assert.equal(e.target, p);
          assert.equal(this, p);
        };
        div.className = 'testClass';
        div.appendChild(p);
        document.body.appendChild(div);
        eventsEngine.on(p, event, pHandler);
        eventsEngine.on(div, event, divHandler);
        eventsEngine.on(document, event, '.testClass', docHandler);
        eventsEngine.trigger(p, event);
      });
      QUnit.test('nativeEvents should work for window', function(assert) {
        var focusCount = 0;
        var windowMock = {focus: function() {
            focusCount++;
          }};
        windowMock.window = windowMock;
        eventsEngine.trigger(windowMock, 'focus');
        assert.equal(focusCount, 1, 'focus called once');
      });
      QUnit.test('removeEventListener should not be called if native handler is not exist', function(assert) {
        var eventName = 'event-without-native-handler';
        registerEvent(eventName, {setup: function(element) {
            return true;
          }});
        var element = document.createElement('div');
        var delListener = sinon.spy(HTMLElement.prototype, 'removeEventListener');
        var handler = function() {};
        eventsEngine.on(element, eventName, handler);
        eventsEngine.off(element, eventName);
        var notCalled = delListener.notCalled;
        var calledWithCorrectSecondArg = delListener.calledOnce && delListener.args[0][1];
        assert.ok(notCalled || calledWithCorrectSecondArg);
        delListener.restore();
      });
      QUnit.module('Memory');
      QUnit.test('removing subscriptions should remove data from elementDataMap', function(assert) {
        var div = document.createElement('div');
        eventsEngine.on(div, 'testEvent', function() {});
        eventsEngine.off(div);
        assert.notOk(eventsEngine.elementDataMap.has(div));
      });
      QUnit.test('removing subscriptions should not remove data from elementDataMap if some handlers left', function(assert) {
        var div = document.createElement('div');
        eventsEngine.on(div, 'testEvent.ns', function() {});
        eventsEngine.on(div, 'testEvent.anotherNs', function() {});
        var hasData = eventsEngine.elementDataMap.has(div);
        eventsEngine.off(div, '.anotherNs');
        assert.equal(eventsEngine.elementDataMap.has(div), hasData);
      });
      QUnit.module('Strategy');
      QUnit.test('it should be possible to set only one method for strategy', function(assert) {
        assert.expect(1);
        var div = document.createElement('div');
        var originalOn;
        eventsEngine.set({'on': function() {
            originalOn = this.callBase;
            assert.ok(true, 'method was applied');
          }});
        eventsEngine.on(div, 'testEvent', function() {});
        eventsEngine.off(div);
        eventsEngine.set({'on': originalOn});
      });
      QUnit.module('Delegate subscription');
      QUnit.test('delegate subscription should handle all matched elements', function(assert) {
        var container = document.createElement('div');
        var target = document.createElement('span');
        var nestedContainer = document.createElement('div');
        var nestedTarget = document.createElement('span');
        var log = [];
        var handler = function() {
          log.push(arguments);
        };
        container.appendChild(target);
        target.appendChild(nestedContainer);
        nestedContainer.appendChild(nestedTarget);
        eventsEngine.on(container, 'testEvent', 'span', handler);
        eventsEngine.on(nestedContainer, 'testEvent', 'span', handler);
        eventsEngine.trigger(nestedTarget, 'testEvent');
        assert.equal(log.length, 3);
      });
      QUnit.test('Hover events should be ignored if the target is a child of the current target (T731134)', function(assert) {
        var container = document.createElement('div');
        var childNode = document.createElement('div');
        container.appendChild(childNode);
        container.addEventListener = function(type, callback) {
          if (type === 'mouseover') {
            callback.call(container, new eventsEngine.Event('mouseover', {
              target: childNode,
              currentTarget: container,
              relatedTarget: container
            }));
          }
        };
        var handlerSpy = sinon.spy();
        eventsEngine.on(container, 'mouseenter', handlerSpy);
        assert.ok(handlerSpy.notCalled);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","events/core/events_engine","../../helpers/keyboardMock.js","events/core/event_registrator","core/utils/version"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("events/core/events_engine"), require("../../helpers/keyboardMock.js"), require("events/core/event_registrator"), require("core/utils/version"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=eventsEngine.tests.js.map