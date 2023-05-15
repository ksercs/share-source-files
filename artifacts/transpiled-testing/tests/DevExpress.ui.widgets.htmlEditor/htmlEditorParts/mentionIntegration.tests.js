!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/mentionIntegration.tests.js"], ["jquery","ui/html_editor","../../../helpers/nativePointerMock.js","./utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/mentionIntegration.tests.js", ["jquery", "ui/html_editor", "../../../helpers/nativePointerMock.js", "./utils.js"], function($__export) {
  "use strict";
  var $,
      nativePointerMock,
      prepareEmbedValue,
      test,
      module,
      SUGGESTION_LIST_CLASS,
      LIST_ITEM_CLASS,
      OVERLAY_CONTENT_CLASS,
      HTML_EDITOR_CONTENT,
      FOCUSED_STATE_CLASS,
      MENTION_CLASS,
      POPUP_TIMEOUT,
      KEY_CODES,
      NAVIGATION_KEYS,
      KeyEventsMock;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      nativePointerMock = $__m.default;
    }, function($__m) {
      prepareEmbedValue = $__m.prepareEmbedValue;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      SUGGESTION_LIST_CLASS = 'dx-suggestion-list';
      LIST_ITEM_CLASS = 'dx-list-item';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      HTML_EDITOR_CONTENT = 'dx-htmleditor-content';
      FOCUSED_STATE_CLASS = 'dx-state-focused';
      MENTION_CLASS = 'dx-mention';
      POPUP_TIMEOUT = 500;
      KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        ENTER: 13,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36
      };
      NAVIGATION_KEYS = [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN, KEY_CODES.END, KEY_CODES.HOME];
      KeyEventsMock = nativePointerMock();
      $__export('default', function() {
        module('Mentions integration', {
          beforeEach: function() {
            var $__4 = this;
            this.clock = sinon.useFakeTimers();
            this.$element = $('#htmlEditor');
            this.options = {mentions: [{dataSource: ['Alex', 'John', 'Freddy', 'Sam']}]};
            this.createWidget = function() {
              $__4.instance = $__4.$element.dxHtmlEditor($__4.options).dxHtmlEditor('instance');
            };
            this.getItems = function() {
              return $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS));
            };
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          test('insert mention after click on item', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var expectedMention = '<p><span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="John" data-id="John"><span contenteditable="false"><span>@</span>John</span></span> </p>';
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              if (valueChangeSpy.calledOnce) {
                assert.strictEqual(value, '<p>@</p>', 'marker has been added');
                $__4.getItems().eq(1).trigger('dxclick');
                $__4.clock.tick(POPUP_TIMEOUT);
              } else {
                assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('popup position', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var $fixture = $('#qunit-fixture');
            var fixtureLeft = $fixture.css('left');
            var valueChangeSpy = sinon.spy(function() {
              $__4.instance.setSelection(0, 1);
              $__4.clock.tick(10);
              var $__6 = getSelection().getRangeAt(0).getBoundingClientRect(),
                  bottom = $__6.bottom,
                  left = $__6.left;
              var overlayRect = $(("." + SUGGESTION_LIST_CLASS)).closest(("." + OVERLAY_CONTENT_CLASS)).get(0).getBoundingClientRect();
              assert.roughEqual(overlayRect.top, bottom, 1.2, 'popup top position equals to bottom position of marker');
              assert.strictEqual(overlayRect.left, left, 'popup left position equals to left position of marker');
              $fixture.css('left', fixtureLeft);
              done();
            });
            $fixture.css('left', '0px');
            this.options = {
              onValueChanged: valueChangeSpy,
              mentions: [{dataSource: [1, 2, 3, 4]}]
            };
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('set up mentions for existed editor', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $items = $__4.getItems();
              assert.strictEqual($items.length, 3, 'there\'re three items');
              assert.strictEqual($items.text(), 'AlexJohnSam', 'correct data');
              done();
            });
            this.options = {onValueChanged: valueChangeSpy};
            this.createWidget();
            this.instance.option('mentions', [{dataSource: ['Alex', 'John', 'Sam']}]);
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('reset mentions option for existed editor', function(assert) {
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $list = $(("." + SUGGESTION_LIST_CLASS));
              assert.notOk($list.is(':visible'), 'list isn\'t visible');
              done();
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.option('mentions', null);
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('change mentions marker', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var expectedMention = '<p><span class="dx-mention" spellcheck="false" data-marker="#" data-mention-value="Freddy" data-id="Freddy"><span contenteditable="false"><span>#</span>Freddy</span></span> </p>';
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              if (valueChangeSpy.calledOnce) {
                assert.strictEqual(value, '<p>#</p>', 'marker has been added');
                $__4.getItems().eq(2).trigger('dxclick');
                $__4.clock.tick(POPUP_TIMEOUT);
              } else {
                assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.option('mentions[0].marker', '#');
            this.instance.focus();
            this.$element.find('p').first().text('#');
            this.clock.tick(10);
          });
          test('list isn\'t shown for wrong marker', function(assert) {
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $list = $(("." + SUGGESTION_LIST_CLASS));
              assert.notOk($list.is(':visible'), 'list isn\'t visible');
              done();
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.option('mentions[0].marker', '#');
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('several mention markers: first mention', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $items = $__4.getItems();
              assert.strictEqual($items.length, 3, 'there\'re three items');
              assert.strictEqual($items.text(), 'AlexJohnSam', 'correct data');
              done();
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.option('mentions', [{dataSource: ['Alex', 'John', 'Sam']}, {
              dataSource: [1, 2],
              marker: '#'
            }]);
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('several mention markers: second mention', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $items = $__4.getItems();
              assert.strictEqual($items.length, 2, 'there\'re three items');
              assert.strictEqual($items.text(), '12', 'correct data');
              done();
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.option('mentions', [{dataSource: ['Alex', 'John', 'Sam']}, {
              dataSource: [1, 2],
              marker: '#'
            }]);
            this.instance.focus();
            this.$element.find('p').first().text('#');
            this.clock.tick(10);
          });
          test('reduce mention markers', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $items = $__4.getItems();
              assert.strictEqual($items.length, 3, 'there\'re three items');
              assert.strictEqual($items.text(), 'abc', 'correct data');
              done();
            });
            this.options = {
              mentions: [{dataSource: ['Alex', 'John', 'Sam']}, {
                dataSource: [1, 2],
                marker: '#'
              }],
              onValueChanged: valueChangeSpy
            };
            this.createWidget();
            this.instance.option('mentions', [{
              dataSource: ['a', 'b', 'c'],
              marker: '*'
            }]);
            this.instance.focus();
            this.$element.find('p').first().text('*');
            this.clock.tick(10);
          });
          test('old marker doesn\'t work after reduce mention markers', function(assert) {
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              var $list = $(("." + SUGGESTION_LIST_CLASS));
              assert.notOk($list.is(':visible'), 'list isn\'t visible');
              done();
            });
            this.options = {
              mentions: [{dataSource: ['Alex', 'John', 'Sam']}, {
                dataSource: [1, 2],
                marker: '#'
              }],
              onValueChanged: valueChangeSpy
            };
            this.createWidget();
            this.instance.option('mentions', [{
              dataSource: ['a', 'b', 'c'],
              marker: '*'
            }]);
            this.instance.focus();
            this.$element.find('p').first().text('#');
            this.clock.tick(10);
          });
          QUnit.skipInShadowDomMode('new mention should be selected after press \'enter\' key', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var expectedMention = '<p><span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="John" data-id="John"><span contenteditable="false"><span>@</span>John</span></span> </p>';
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              if (valueChangeSpy.calledOnce) {
                $__4.clock.tick(10);
                var $content = $__4.$element.find(("." + HTML_EDITOR_CONTENT));
                KeyEventsMock.simulateEvent($content.get(0), 'keydown', {keyCode: KEY_CODES.ARROW_DOWN});
                KeyEventsMock.simulateEvent($content.get(0), 'keydown', {keyCode: KEY_CODES.ENTER});
                $__4.clock.tick(10);
              } else {
                assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('navigation keys don\'t change a caret position when suggestion list is visible', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              if (valueChangeSpy.calledOnce) {
                $__4.clock.tick(10);
                var $content = $__4.$element.find(("." + HTML_EDITOR_CONTENT));
                var range = $__4.instance.getSelection();
                NAVIGATION_KEYS.forEach(function(keyCode) {
                  KeyEventsMock.simulateEvent($content.get(0), 'keydown', {keyCode: keyCode});
                  assert.deepEqual($__4.instance.getSelection(), range, 'caret position wasn\'t change');
                });
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('list should show relevant items on typing text', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function($__6) {
              var component = $__6.component;
              if (valueChangeSpy.calledOnce) {
                var element = $__4.$element.find('p').get(0);
                element.innerText += 'F';
                $__4.clock.tick(10);
              } else {
                $__4.clock.tick(POPUP_TIMEOUT);
                var $items = $__4.getItems();
                assert.strictEqual(component.option('value'), '<p>@F</p>', 'correct value');
                assert.strictEqual($items.length, 1, 'there is one relevant item');
                assert.strictEqual($items.text(), 'Freddy', 'correct item');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('first list item should be focused on filtering', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function() {
              if (valueChangeSpy.calledOnce) {
                var element = $__4.$element.find('p').get(0);
                element.innerText += 'F';
                $__4.clock.tick(10);
              } else {
                $__4.clock.tick(POPUP_TIMEOUT);
                var $items = $__4.getItems();
                var isFirstListItemFocused = $items.first().hasClass(FOCUSED_STATE_CLASS);
                assert.ok(isFirstListItemFocused);
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('input text should be removed after item select', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var expectedMention = '<p><span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="Freddy" data-id="Freddy"><span contenteditable="false"><span>@</span>Freddy</span></span> </p>';
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              var element = $__4.$element.find('p').get(0);
              switch (valueChangeSpy.callCount) {
                case 1:
                  element.innerText += 'F';
                  $__4.clock.tick(10);
                  break;
                case 2:
                  $__4.clock.tick(POPUP_TIMEOUT);
                  $__4.getItems().first().trigger('dxclick');
                  $__4.clock.tick(POPUP_TIMEOUT);
                  break;
                case 3:
                  assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                  done();
                  break;
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('search timeout', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var TIMEOUT = 700;
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              var $items;
              if (valueChangeSpy.calledOnce) {
                var element = $__4.$element.find('p').get(0);
                element.innerText += 'F';
                $__4.clock.tick(10);
                assert.strictEqual($__4.getItems().length, 4, 'dataSource isn\'t filtered');
              } else {
                $__4.clock.tick(TIMEOUT);
                $items = $__4.getItems();
                assert.strictEqual(value, '<p>@F</p>', 'correct value');
                assert.strictEqual($items.length, 1, 'there is one relevant item');
                assert.strictEqual($items.text(), 'Freddy', 'correct item');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.options.mentions.searchTimeout = TIMEOUT;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('minimal search length', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var getParagraph = function() {
              return $__4.$element.find('p').get(0);
            };
            var valueChangeSpy = sinon.spy(function($__6) {
              var component = $__6.component;
              var $items;
              if (valueChangeSpy.calledOnce) {
                getParagraph().innerText += 'F';
                $__4.clock.tick(10);
                var $items$__8 = $__4.getItems();
                assert.strictEqual($items$__8.length, 4, 'dataSource isn\'t filtered');
              } else if (valueChangeSpy.calledTwice) {
                getParagraph().innerText += 'r';
                $__4.clock.tick(10);
              } else {
                $__4.clock.tick(POPUP_TIMEOUT);
                $items = $__4.getItems();
                assert.strictEqual(component.option('value'), '<p>@Fr</p>', 'correct value');
                assert.strictEqual($items.length, 1, 'there is one relevant item');
                assert.strictEqual($items.text(), 'Freddy', 'correct item');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.options.mentions.minSearchLength = 2;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('search expression', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var valueChangeSpy = sinon.spy(function($__6) {
              var component = $__6.component;
              var $items;
              if (valueChangeSpy.calledOnce) {
                var element = $__4.$element.find('p').get(0);
                element.innerText += 'A';
                $__4.clock.tick(10);
              } else {
                $__4.clock.tick(POPUP_TIMEOUT);
                $items = $__4.getItems();
                assert.strictEqual(component.option('value'), '<p>@A</p>', 'correct value');
                assert.strictEqual($items.length, 1, 'there is one relevant item');
                assert.strictEqual($items.text(), 'London', 'correct item');
                done();
              }
            });
            this.options.onValueChanged = valueChangeSpy;
            this.options.mentions = [{
              dataSource: [{
                name: 'Alex',
                city: 'London'
              }, {
                name: 'John',
                city: 'New York'
              }, {
                name: 'Freddy',
                city: 'Paris'
              }],
              searchExpr: 'name',
              displayExpr: 'city'
            }];
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('template', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var expectedMention = '<p><span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="John" data-id="John"><span contenteditable="false">John!</span></span> </p>';
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              if (valueChangeSpy.calledOnce) {
                $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).eq(1).trigger('dxclick');
                $__4.clock.tick(10);
              } else {
                assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                done();
              }
            });
            this.options.mentions[0].template = function(data, container) {
              $(container).text((data.value + "!"));
            };
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
          test('template for existed value', function(assert) {
            var expectedMention = '<span class="dx-mention" spellcheck="false" data-marker="@" data-mention-value="John" data-id="John"><span contenteditable="false">John!</span></span>';
            this.options.mentions[0].template = function(data, container) {
              $(container).text((data.value + "!"));
            };
            this.options.value = expectedMention;
            this.createWidget();
            var value = prepareEmbedValue(this.$element.find(("." + MENTION_CLASS)).parent().html());
            assert.strictEqual(value, expectedMention);
          });
          test('Mention template is applied correctly after removing of a neighbour editor with the same mention marker(T1110266)', function(assert) {
            var $__4 = this;
            var done = assert.async();
            var templateResult = 'custom template';
            var expectedMention = ("<p><span class=\"dx-mention\" spellcheck=\"false\" data-marker=\"@\" data-mention-value=\"John\" data-id=\"John\"><span contenteditable=\"false\">" + templateResult + "</span></span> </p>");
            var valueChangeSpy = sinon.spy(function($__6) {
              var value = $__6.value;
              if (valueChangeSpy.calledOnce) {
                $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).eq(1).trigger('dxclick');
                $__4.clock.tick(10);
              } else {
                assert.strictEqual(prepareEmbedValue(value), expectedMention, 'mention has been added');
                done();
              }
            });
            this.options.mentions[0].template = function(_, container) {
              $(container).text(templateResult);
            };
            this.options.onValueChanged = valueChangeSpy;
            this.createWidget();
            var $secondEditor = $('<div>').appendTo('#qunit-fixture');
            $secondEditor.dxHtmlEditor(this.options);
            $secondEditor.remove();
            this.instance.focus();
            this.$element.find('p').first().text('@');
            this.clock.tick(10);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","../../../helpers/nativePointerMock.js","./utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("../../../helpers/nativePointerMock.js"), require("./utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mentionIntegration.tests.js.map