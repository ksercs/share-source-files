!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/mentionModule.tests.js"], ["jquery","ui/html_editor/formats/mention","ui/html_editor/modules/mentions","core/utils/common","core/devices","events/index","events/utils/index","devextreme-quill"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/mentionModule.tests.js", ["jquery", "ui/html_editor/formats/mention", "ui/html_editor/modules/mentions", "core/utils/common", "core/devices", "events/index", "events/utils/index", "devextreme-quill"], function($__export) {
  "use strict";
  var $,
      MentionFormat,
      Mentions,
      noop,
      devices,
      dxEvent,
      normalizeKeyName,
      Quill,
      SUGGESTION_LIST_CLASS,
      LIST_ITEM_CLASS,
      FOCUSED_STATE_CLASS,
      KEY_CODES,
      POPUP_HIDING_TIMEOUT,
      APPLY_VALUE_KEYS,
      INSERT_DEFAULT_MENTION_DELTA,
      INSERT_HASH_MENTION_DELTA,
      INSERT_TEXT_DELTA,
      moduleConfig,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      MentionFormat = $__m.default;
    }, function($__m) {
      Mentions = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      dxEvent = $__m.Event;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {
      Quill = $__m.default;
    }],
    execute: function() {
      var $__6;
      SUGGESTION_LIST_CLASS = 'dx-suggestion-list';
      LIST_ITEM_CLASS = 'dx-list-item';
      FOCUSED_STATE_CLASS = 'dx-state-focused';
      KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32
      };
      POPUP_HIDING_TIMEOUT = 500;
      APPLY_VALUE_KEYS = [{
        key: 'Enter',
        code: KEY_CODES.ENTER
      }, {
        key: ' ',
        code: KEY_CODES.SPACE
      }];
      INSERT_DEFAULT_MENTION_DELTA = {ops: [{insert: '@'}]};
      INSERT_HASH_MENTION_DELTA = {ops: [{insert: '#'}]};
      INSERT_TEXT_DELTA = {ops: [{insert: 'Text'}]};
      moduleConfig = {
        beforeEach: function() {
          var $__5 = this;
          this.clock = sinon.useFakeTimers();
          this.Delta = Quill.import('delta');
          this.$element = $('#htmlEditor');
          this.log = [];
          this.$element.on('keydown', function(event) {
            var handlers = $__5.quillMock.keyboard.bindings[normalizeKeyName(event)] || $__5.quillMock.keyboard.bindings[event.which];
            if (handlers) {
              handlers.forEach(function(handler) {
                handler();
              });
            }
          });
          this.previousChar = ' ';
          this.quillMock = {
            getContents: function() {
              return {ops: [{insert: $__5.previousChar}]};
            },
            getLength: function() {
              return 0;
            },
            getBounds: function() {
              return {
                left: 0,
                bottom: 0
              };
            },
            root: this.$element.get(0),
            getModule: noop,
            getSelection: function() {
              return {
                index: 1,
                length: 0
              };
            },
            setSelection: function(index) {
              $__5.log.push({
                operation: 'setSelection',
                index: index
              });
            },
            updateContents: function(newDelta) {
              $__5.log.push({delta: newDelta});
            },
            getFormat: noop,
            on: noop,
            deleteText: function(index, length) {
              $__5.log.push({
                operation: 'deleteText',
                index: index,
                length: length
              });
            },
            insertText: function(index, text, source) {
              $__5.log.push({
                operation: 'insertText',
                index: index,
                text: text,
                source: source
              });
            },
            keyboard: {
              addBinding: function($__6, handler) {
                var key = $__6.key;
                var keys = Array.isArray(key) ? key : [key];
                keys.forEach(function(keyName) {
                  if (!$__5.quillMock.keyboard.bindings[keyName]) {
                    $__5.quillMock.keyboard.bindings[keyName] = [];
                  }
                  $__5.quillMock.keyboard.bindings[keyName].push(handler);
                });
              },
              bindings: {'enter': [noop]}
            }
          };
          this.options = {
            mentions: [{dataSource: ['Alex', 'John', 'Freddy', 'Sam']}],
            editorInstance: {
              getMentionKeyInTemplateStorage: sinon.spy(function() {
                return 'my_key_in_storage';
              }),
              addCleanCallback: noop,
              $element: function() {
                return $__5.$element;
              },
              _createComponent: function($element, widget, options) {
                return new widget($element, options);
              }
            }
          };
          this.complexDataOptions = {
            mentions: [{
              dataSource: [{
                name: 'Alex',
                position: 'manager'
              }, {
                name: 'John',
                position: 'it'
              }],
              valueExpr: 'name',
              displayExpr: function($__6) {
                var $__7 = $__6,
                    name = $__7.name,
                    position = $__7.position;
                return (name + " " + position);
              }
            }],
            editorInstance: this.options.editorInstance
          };
          this.severalMarkerOptions = {
            mentions: [{dataSource: ['Alex', 'John', 'Stew', 'Lola', 'Nancy']}, {
              dataSource: [4421, 5422, 2245, 6632],
              marker: '#'
            }],
            editorInstance: this.options.editorInstance
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      (($__6 = QUnit, test = $__6.test, $__6));
      QUnit.module('Mention format', function() {
        test('Create an element by data', function(assert) {
          var data = {
            value: 'John Smith',
            marker: '@',
            id: 'JohnSm'
          };
          var element = MentionFormat.create(data);
          assert.strictEqual(element.dataset.marker, '@', 'correct marker');
          assert.strictEqual(element.dataset.mentionValue, 'John Smith', 'correct value');
          assert.strictEqual(element.dataset.id, 'JohnSm', 'correct id');
          assert.strictEqual(element.innerText, '@John Smith', 'correct inner text');
        });
        test('Get data from element', function(assert) {
          var markup = '<span class=\'dx-mention\' data-marker=@ data-mention-value=\'John Smith\' data-id=\'JohnSm\'><span>@</span>John Smith</span>';
          var element = $(markup).get(0);
          var data = MentionFormat.value(element);
          assert.deepEqual(data, {
            value: 'John Smith',
            marker: '@',
            id: 'JohnSm'
          }, 'Correct data');
        });
        test('Change default marker', function(assert) {
          var data = {
            value: 'John Smith',
            marker: '#',
            id: 'JohnSm'
          };
          var element = MentionFormat.create(data);
          assert.strictEqual(element.innerText, '#John Smith', 'correct inner text');
        });
        test('Change default content renderer', function(assert) {
          var data = {
            value: 'John Smith',
            marker: '@',
            id: 'JohnSm',
            keyInTemplateStorage: 'my_key_in_storage'
          };
          MentionFormat.addTemplate({
            marker: '@',
            editorKey: 'my_key_in_storage'
          }, {render: function($__7) {
              var $__8 = $__7,
                  container = $__8.container,
                  mentionData = $__8.model;
              container.innerText = 'test';
              assert.deepEqual(mentionData, data);
            }});
          var element = MentionFormat.create(data);
          assert.strictEqual(element.innerText, 'test');
          MentionFormat.removeTemplate({
            marker: '@',
            editorKey: 'my_key_in_storage'
          });
          element = MentionFormat.create(data);
          assert.strictEqual(element.innerText, '@John Smith');
        });
      });
      QUnit.module('Mentions module', moduleConfig, function() {
        test('insert mention after click on item', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var expectedDelta = new this.Delta().delete(1).insert({mention: {
              value: 'Alex',
              marker: '@',
              id: 'Alex',
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.deepEqual(this.log[0].delta.ops, expectedDelta.ops, 'Correct formatting');
          assert.ok(this.options.editorInstance.getMentionKeyInTemplateStorage.calledOnce, 'id requested from widget');
        });
        test('Display and value expression with complex data', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var expectedDelta = new this.Delta().delete(1).insert({mention: {
              value: 'Alex manager',
              marker: '@',
              id: 'Alex',
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.deepEqual(this.log[0].delta.ops, expectedDelta.ops, 'Correct formatting');
        });
        test('Insert embed content should remove marker before insert a mention and restore the selection', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          mention.savePosition(2);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var expectedDelta = new this.Delta().delete(1).insert({mention: {
              value: 'Alex manager',
              marker: '@',
              id: 'Alex',
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.strictEqual(this.log.length, 2, 'add a mention + set selection');
          assert.deepEqual(this.log[0].delta.ops, expectedDelta.ops, 'add a mention');
          assert.deepEqual(this.log[1], {
            index: 2,
            operation: 'setSelection'
          });
        });
        test('changing text by user should trigger checkMentionRequest', function(assert) {
          this.quillMock.getSelection = function() {
            return {
              index: 1,
              length: 0
            };
          };
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          var mentionRequestSpy = sinon.spy(mention, 'checkMentionRequest');
          var showPopupSpy = sinon.spy(mention._popup, 'show');
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'API');
          assert.ok(mentionRequestSpy.notCalled, 'Ignore changing text by API');
          assert.ok(showPopupSpy.notCalled, 'Popup isn\'t shown');
          mention.onTextChange(INSERT_TEXT_DELTA, {}, 'user');
          assert.ok(mentionRequestSpy.calledOnce, 'trigger mention request');
          assert.ok(showPopupSpy.notCalled, 'Popup isn\'t shown because text doesn\'t contain a marker');
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          assert.ok(mentionRequestSpy.calledTwice, 'trigger mention request');
          assert.ok(showPopupSpy.calledOnce, 'Show popup with suggestion list');
        });
        test('Should appear after type a marker that replaces a selected text (T730303)', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          var showPopupSpy = sinon.spy(mention._popup, 'show');
          var replaceAllDelta = {ops: [{insert: '@'}, {delete: 2}]};
          var replaceLastWordDelta = {ops: [{retain: 5}, {insert: '@'}, {delete: 1}]};
          mention.onTextChange(replaceLastWordDelta, {}, 'user');
          assert.ok(showPopupSpy.calledOnce);
          mention.onTextChange(replaceAllDelta, {}, 'user');
          assert.ok(showPopupSpy.calledTwice);
        });
        test('Should hide popup after remove more than one char', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          var hidePopupSpy = sinon.spy(mention._popup, 'hide');
          var addMarker = {ops: [{insert: '@'}]};
          var removeWord = {ops: [{delete: 3}]};
          mention.onTextChange(addMarker, {}, 'user');
          this.clock.tick(10);
          assert.ok(hidePopupSpy.notCalled);
          mention.onTextChange(removeWord, {}, 'user');
          this.clock.tick(10);
          assert.ok(hidePopupSpy.calledOnce);
        });
        test('Module should not filter the list after quickly removing the marker (T894506)', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          var filterListSpy = sinon.spy(mention, '_filterList');
          var addMarker = {ops: [{insert: '@'}]};
          var removeMarker = {ops: [{delete: 1}]};
          mention.onTextChange(addMarker, {}, 'user');
          this.clock.tick(10);
          mention.onTextChange(removeMarker, {}, 'user');
          mention.onTextChange(addMarker, {}, 'user');
          this.clock.tick(10);
          assert.ok(filterListSpy.notCalled);
        });
        test('display expression should be used in the suggestion list', function(assert) {
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          mention.savePosition(2);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          var itemText = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().text();
          assert.strictEqual(itemText, 'Alex manager');
        });
        test('item template', function(assert) {
          this.complexDataOptions.mentions[0].itemTemplate = function(item, index, element) {
            $(element).text((item.name + "@"));
          };
          var mention = new Mentions(this.quillMock, this.complexDataOptions);
          mention.savePosition(2);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          var itemText = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().text();
          assert.strictEqual(itemText, 'Alex@');
        });
        test('several markers using', function(assert) {
          var usersCount = this.severalMarkerOptions.mentions[0].dataSource.length;
          var issueCount = this.severalMarkerOptions.mentions[1].dataSource.length;
          var mention = new Mentions(this.quillMock, this.severalMarkerOptions);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          var $items = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS));
          assert.strictEqual($items.length, usersCount, 'List of users');
          $items.first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var firstDelta = new this.Delta().delete(1).insert({mention: {
              value: 'Alex',
              marker: '@',
              id: 'Alex',
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.deepEqual(this.log[0].delta.ops, firstDelta.ops, 'insert user mention');
          mention.onTextChange(INSERT_HASH_MENTION_DELTA, {}, 'user');
          $items = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS));
          assert.strictEqual($items.length, issueCount, 'List of issues');
          $items.first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var secondDelta = new this.Delta().delete(1).insert({mention: {
              value: 4421,
              marker: '#',
              id: 4421,
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.deepEqual(this.log[2].delta.ops, secondDelta.ops, 'insert issue mention');
        });
        test('list shouldn\'t be focused on text input', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          var isListFocused = $list.hasClass(FOCUSED_STATE_CLASS);
          var isFirstListItemFocused = $list.find(("." + LIST_ITEM_CLASS)).first().hasClass(FOCUSED_STATE_CLASS);
          assert.notOk(isListFocused);
          assert.ok(isFirstListItemFocused);
        });
        test('trigger \'arrow down\' should focus next list item', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowDown',
            which: KEY_CODES.ARROW_DOWN
          }));
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          var isListFocused = $list.hasClass(FOCUSED_STATE_CLASS);
          var isSecondListItemFocused = $list.find(("." + LIST_ITEM_CLASS)).eq(1).hasClass(FOCUSED_STATE_CLASS);
          assert.notOk(isListFocused);
          assert.ok(isSecondListItemFocused);
        });
        test('list should load next page on reach end of current page', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          var items = [];
          for (var i = 0; i < 60; i++) {
            items.push(i);
          }
          this.$element.css({
            fontSize: '14px',
            lineHeight: 1.35715
          });
          this.options.mentions = [{dataSource: {
              store: items,
              pageSize: 50,
              paginate: true
            }}];
          var mention = new Mentions(this.quillMock, this.options);
          mention._popup.option('container', this.$element);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          var $items = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS));
          assert.strictEqual($items.length, 50);
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowUp',
            which: KEY_CODES.ARROW_UP
          }));
          $items = $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS));
          var isLastItemOnPageFocused = $items.eq(49).hasClass(FOCUSED_STATE_CLASS);
          assert.ok(isLastItemOnPageFocused);
          assert.strictEqual($items.length, 60, 'next page has loaded');
        });
        test('trigger \'arrow up\' should focus previous list item', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowUp',
            which: KEY_CODES.ARROW_UP
          }));
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          var isListFocused = $list.hasClass(FOCUSED_STATE_CLASS);
          var isLastListItemFocused = $list.find(("." + LIST_ITEM_CLASS)).last().hasClass(FOCUSED_STATE_CLASS);
          assert.notOk(isListFocused);
          assert.ok(isLastListItemFocused);
        });
        test('trigger "arrow down" or "arrow up" does not change focused item in case data source is loading', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowUp',
            which: KEY_CODES.ARROW_UP
          }));
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          var getLastItem = function() {
            return $list.find(("." + LIST_ITEM_CLASS)).last();
          };
          var getFocusedItem = function() {
            return $list.find(("." + LIST_ITEM_CLASS + "." + FOCUSED_STATE_CLASS));
          };
          var $lastItem = getLastItem();
          assert.ok($lastItem.hasClass(FOCUSED_STATE_CLASS), 'last item is focused');
          mention._list.getDataSource().beginLoading();
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowDown',
            which: KEY_CODES.ARROW_DOWN
          }));
          assert.ok(getFocusedItem().is($lastItem), 'the same item is still focused');
          this.$element.trigger($.Event('keydown', {
            key: 'ArrowUp',
            which: KEY_CODES.ARROW_UP
          }));
          assert.ok(getFocusedItem().is($lastItem), 'the same item is still focused');
        });
        APPLY_VALUE_KEYS.forEach(function($__7) {
          var $__8 = $__7,
              key = $__8.key,
              code = $__8.code;
          test(("trigger '" + key + "' key should select focused list item"), function(assert) {
            var mention = new Mentions(this.quillMock, this.options);
            mention.savePosition(0);
            mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
            this.clock.tick(10);
            this.$element.trigger($.Event('keydown', {
              key: key,
              which: code
            }));
            this.clock.tick(10);
            var expectedDelta = new this.Delta().delete(1).insert({mention: {
                value: 'Alex',
                marker: '@',
                id: 'Alex',
                keyInTemplateStorage: 'my_key_in_storage'
              }}).insert(' ');
            assert.deepEqual(this.log[0].delta.ops, expectedDelta.ops, 'Correct formatting');
          });
        });
        APPLY_VALUE_KEYS.forEach(function($__7) {
          var $__8 = $__7,
              key = $__8.key,
              code = $__8.code;
          test(("trigger '" + key + "' key should close list if it is empty"), function(assert) {
            var mention = new Mentions(this.quillMock, this.options);
            mention.savePosition(0);
            mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
            this.clock.tick(10);
            mention.onTextChange(INSERT_TEXT_DELTA, {}, 'user');
            this.clock.tick(POPUP_HIDING_TIMEOUT);
            var $list = $(("." + SUGGESTION_LIST_CLASS));
            this.$element.trigger($.Event('keydown', {
              key: key,
              which: code
            }));
            this.clock.tick(POPUP_HIDING_TIMEOUT);
            assert.notOk($list.is(':visible'));
          });
        });
        test('trigger \'escape\' should close list', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          this.$element.trigger($.Event('keydown', {
            key: 'Escape',
            which: KEY_CODES.ESCAPE
          }));
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          assert.notOk($list.is(':visible'));
        });
        test('mention char shouldn\'t be a part of string (e.g. e-mail)', function(assert) {
          var $__5 = this;
          var content = 'd';
          this.quillMock.getContents = function(index, length) {
            $__5.log.push({
              operation: 'getContents',
              index: index,
              length: length
            });
            return {ops: [{insert: content}]};
          };
          var mention = new Mentions(this.quillMock, this.options);
          var $list = $(("." + SUGGESTION_LIST_CLASS));
          mention.savePosition(0);
          mention.onTextChange({ops: [{
              insert: '@',
              retain: 2
            }]}, {}, 'user');
          assert.notOk($list.is(':visible'));
          assert.deepEqual(this.log[0], {
            operation: 'getContents',
            index: 1,
            length: 1
          });
          content = '\n';
          mention.onTextChange({ops: [{
              insert: '@',
              retain: 50
            }]}, {}, 'user');
          assert.ok($list.is(':visible'));
          assert.deepEqual(this.log[1], {
            operation: 'getContents',
            index: 49,
            length: 1
          });
          mention._popup.hide();
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          content = ' ';
          mention.onTextChange({ops: [{
              insert: '@',
              retain: 1
            }]}, {}, 'user');
          assert.ok($list.is(':visible'));
          assert.deepEqual(this.log[2], {
            operation: 'getContents',
            index: 0,
            length: 1
          });
        });
        test('popup position config', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          var $__7 = mention._popupPosition,
              collision = $__7.collision,
              offset = $__7.offset,
              positionTarget = $__7.of;
          assert.deepEqual(collision, {
            x: 'flipfit',
            y: 'flip'
          }, 'Check popup position collision resolve strategy');
          assert.ok(positionTarget instanceof dxEvent, 'mention positioned by event\'s pageX and pageY');
          assert.notOk(Object.prototype.hasOwnProperty.call(offset, 'h'), 'it hasn\'t a horizontal offset');
          assert.ok(Object.prototype.hasOwnProperty.call(offset, 'v'), 'it has a vertical offset');
        });
        test('popup shouldn\'t close on target scroll', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          $('#qunit-fixture').triggerHandler('scroll');
          assert.ok(mention._popup.option('visible'), 'popup is visible after scrolling');
        });
        test('popup should update position after search', function(assert) {
          var mention = new Mentions(this.quillMock, this.options);
          var popupRepaintSpy = sinon.spy(mention._popup, 'repaint');
          mention.savePosition(0);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          this.clock.tick(10);
          mention.onTextChange({ops: [{insert: 'A'}]}, {}, 'user');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          assert.ok(popupRepaintSpy.calledOnce, 'popup has been repainted after search');
        });
        test('insert mention on a start of the newline', function(assert) {
          this.previousChar = '\n';
          var mention = new Mentions(this.quillMock, this.options);
          mention.savePosition(3);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          $(("." + SUGGESTION_LIST_CLASS + " ." + LIST_ITEM_CLASS)).first().trigger('dxclick');
          this.clock.tick(POPUP_HIDING_TIMEOUT);
          var expectedDelta = new this.Delta().retain(1).delete(1).insert({mention: {
              value: 'Alex',
              marker: '@',
              id: 'Alex',
              keyInTemplateStorage: 'my_key_in_storage'
            }}).insert(' ');
          assert.deepEqual(this.log[0].delta.ops, expectedDelta.ops, 'Correct formatting');
        });
        test('popup should have correct position when mention is inserted on the new line (T1087787)', function(assert) {
          this.previousChar = '\n';
          var mention = new Mentions(this.quillMock, this.options);
          mention.onTextChange(INSERT_DEFAULT_MENTION_DELTA, {}, 'user');
          assert.strictEqual(mention.getPosition(), 2, 'position is correct (1 for new line and 1 for marker)');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor/formats/mention","ui/html_editor/modules/mentions","core/utils/common","core/devices","events","events/utils","devextreme-quill"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor/formats/mention"), require("ui/html_editor/modules/mentions"), require("core/utils/common"), require("core/devices"), require("events"), require("events/utils"), require("devextreme-quill"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mentionModule.tests.js.map