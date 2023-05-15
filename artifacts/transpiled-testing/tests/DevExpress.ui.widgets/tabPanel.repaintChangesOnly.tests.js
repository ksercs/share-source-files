!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tabPanel.repaintChangesOnly.tests.js"], ["jquery","animation/fx","ui/tab_panel"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tabPanel.repaintChangesOnly.tests.js", ["jquery", "animation/fx", "ui/tab_panel"], function($__export) {
  "use strict";
  var $,
      fx;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.module('repaintChangesOnly', {
        beforeEach: function() {
          var $__2 = this;
          this.clock = sinon.useFakeTimers();
          this.origAnimate = fx.animate;
          fx.animate = function(_, options) {
            setTimeout(function() {
              return options.complete();
            }, 1);
          };
          this.itemRenderedSpy = sinon.spy();
          this.titleRenderedSpy = sinon.spy();
          this.itemDeletedSpy = sinon.spy();
          this.createTabPanel = function(options) {
            options.repaintChangesOnly = true;
            options.itemTemplate = function(itemData) {
              return ("<div id='id_" + itemData.content + "'>" + itemData.content + "</div>");
            };
            options.itemTitleTemplate = function(itemData) {
              return ("<div id='id_" + itemData.text + "'>" + itemData.text + "</div>");
            };
            $__2.$tabPanel = $('<div>');
            $__2.tabPanel = $__2.$tabPanel.dxTabPanel(options).dxTabPanel('instance');
            $__2.tabPanel.option('onItemRendered', $__2.itemRenderedSpy);
            $__2.tabPanel.option('onTitleRendered', $__2.titleRenderedSpy);
            $__2.tabPanel.option('onItemDeleted', $__2.itemDeletedSpy);
          };
          this.containsElement = function(id) {
            try {
              return $__2.$tabPanel.find('#id_' + id)[0].textContent;
            } catch (e) {}
          };
          this.checkNotContainsElements = function(assert, idList) {
            idList.forEach(function(id) {
              assert.notOk($__2.containsElement(id), ("doesn't contain '" + id + "'"));
            });
          };
          this.checkContainsElements = function(assert, idList) {
            idList.forEach(function(id) {
              assert.ok($__2.containsElement(id), ("contains '" + id + "'"));
            });
          };
          this.checkTitleRendered = function(assert, expectedCalls) {
            assert.equal($__2.titleRenderedSpy.callCount, expectedCalls.length, 'titleRenderedSpy.callCount');
            var calls = $__2.titleRenderedSpy.getCalls();
            for (var i = 0; i < expectedCalls.length && i < calls.length; i++) {
              assert.deepEqual(calls[i].args[0].itemData, expectedCalls[i], ("titleRenderedSpy.calls[" + i + "].itemData"));
            }
          };
          this.checkItemRendered = function(assert, expectedCalls) {
            assert.equal($__2.itemRenderedSpy.callCount, expectedCalls.length, 'itemRenderedSpy.callCount');
            var calls = $__2.itemRenderedSpy.getCalls();
            for (var i = 0; i < expectedCalls.length && i < calls.length; i++) {
              assert.deepEqual(calls[i].args[0].itemData, expectedCalls[i].data, ("itemRenderedSpy.call[" + i + "].itemData"));
              assert.equal(calls[i].args[0].itemIndex, expectedCalls[i].index, ("itemRenderedSpy.call[" + i + "].itemIndex"));
            }
          };
          this.checkItemDeleted = function(assert, expectedCalls) {
            assert.equal($__2.itemDeletedSpy.callCount, expectedCalls.length, 'itemDeletedSpy.callCount');
            var calls = $__2.itemDeletedSpy.getCalls();
            for (var i = 0; i < expectedCalls.length && i < calls.length; i++) {
              assert.deepEqual(calls[i].args[0].itemData, expectedCalls[i], ("itemDeletedSpy.call[" + i + "].itemData"));
            }
          };
          this.checkContainsEmptyMessage = function(assert, expected) {
            assert.equal($__2.$tabPanel.find('.dx-empty-message').length, expected ? 1 : 0, 'EmptyMessage elements count');
          };
        },
        afterEach: function() {
          fx.animate = this.origAnimate;
          this.clock.restore();
        }
      }, function() {
        ['items', 'dataSource'].forEach(function(dataSourcePropertyName) {
          var testContext = (", option(" + dataSourcePropertyName + ")");
          QUnit.test('[] -> [{1}]' + testContext, function(assert) {
            this.createTabPanel({items: []});
            var item1_ = {
              text: '1a',
              content: '1a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1_.text, item1_.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> []' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            this.tabPanel.option(dataSourcePropertyName, []);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, []);
            this.checkItemDeleted(assert, [item1]);
            this.checkNotContainsElements(assert, [item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, true);
          });
          QUnit.test('[] -> [{1}, {2}]', function(assert) {
            this.createTabPanel({items: []});
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.tabPanel.option('items', [item1, item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1, item2]);
            this.checkItemRendered(assert, [{
              data: item1,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text]);
            this.checkNotContainsElements(assert, [item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{1}, {2}] -> {selectedIndex: 1}', function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.tabPanel.option('items', [item1, item2]);
            this.clock.tick(1);
            this.tabPanel.option('selectedIndex', 1);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{0}, {1}] -> {selectedIndex: 0}', function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item0 = {
              text: '0a',
              content: '0a_'
            };
            this.tabPanel.option('items', [item0, item1]);
            this.clock.tick(1);
            assert.equal(this.tabPanel.option('selectedIndex'), 1, 'selectedIndex after insert');
            this.tabPanel.option('selectedIndex', 0);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item0]);
            this.checkItemRendered(assert, [{
              data: item0,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item0.text, item0.content, item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{1}, {2}] -> {selectedIndex:1} -> [{1}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1]});
            this.tabPanel.option(dataSourcePropertyName, [item1, item2]);
            this.clock.tick(1);
            this.tabPanel.option('selectedIndex', 1);
            this.clock.tick(1);
            this.tabPanel.option(dataSourcePropertyName, [item2]);
            this.clock.tick(1);
            assert.equal(this.tabPanel.option('selectedIndex'), 0, 'selectedIndex is updated');
            assert.equal(this.tabPanel.option('selectedItem'), item2, 'selectedItem is correct');
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item2.text, item2.content]);
            this.checkNotContainsElements(assert, [item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2}, {3}] -> {selectedIndex:1} -> [{2}, {3}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            var item3 = {
              text: '3a',
              content: '3a_'
            };
            this.createTabPanel({items: [item1, item2, item3]});
            this.tabPanel.option('selectedIndex', 1);
            this.clock.tick(1);
            this.tabPanel.option(dataSourcePropertyName, [item2, item3]);
            this.clock.tick(1);
            assert.equal(this.tabPanel.option('selectedIndex'), 0, 'selectedIndex is updated');
            assert.equal(this.tabPanel.option('selectedItem'), item2, 'selectedItem is correct');
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item2.text, item3.text, item2.content]);
            this.checkNotContainsElements(assert, [item1.text, item1.content, item3.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{1}, {2}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1, item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, []);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item2.text, item1.content]);
            this.checkNotContainsElements(assert, [item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{1}, {2}] deferRendering=false' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({
              items: [item1],
              deferRendering: false
            });
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1, item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkContainsElements(assert, [item1.text, item2.text, item1.content, item2.content]);
            assert.strictEqual(this.$tabPanel.find('.dx-multiview-item').eq(0).hasClass('dx-multiview-item-hidden'), false, 'first multiview item is visible');
            assert.strictEqual(this.$tabPanel.find('.dx-multiview-item').eq(1).hasClass('dx-multiview-item-hidden'), true, 'second multiview item is hidden');
          });
          QUnit.test('[{1, text: 1a, content: 1a_}] -> [{1, text: 1a, content: 1a_upd}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item1_ = {
              text: '1a',
              content: '1a_upd'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item1_.text, item1_.content]);
            this.checkNotContainsElements(assert, [item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1, text: 1a, content: 1a_}] -> [{1, text: 1aupd, content: 1a_}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item1_ = {
              text: '1aupd',
              content: '1a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item1_.text, item1_.content]);
            this.checkNotContainsElements(assert, [item1.text]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1, text: 1a, content: 1a_}] -> [{1, text: 1aupd, content: 1a_upd}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item1_ = {
              text: '1aupd',
              content: '1a_upd'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item1_.text, item1_.content]);
            this.checkNotContainsElements(assert, [item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.skip('[{1, text: 1a, content: 1a_}, {2}] -> [{1, text: 1aupd, content: 1a_}, {2}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            var item1_ = {
              text: '1aupd',
              content: '1a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_, item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1_.text, item1_.content, item2.text]);
            this.checkNotContainsElements(assert, ['1a', item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1, text: 1a, content: 1a_}, {2}] -> [{1, text: 1aupd, content: 1a_}, {2}] via items[0]' + testContext, function(assert) {
            if (dataSourcePropertyName === 'dataSource') {
              assert.ok(true, 'Not supported for dataSource');
              return;
            }
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            item1.text = '1aupd';
            this.tabPanel.option(dataSourcePropertyName + '[0]', item1);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1]);
            this.checkItemRendered(assert, [{
              data: item1,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text]);
            this.checkNotContainsElements(assert, ['1a', item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1, text: 1a, content: 1a_}, {2, selected}] -> [{1, text: 1aupd, content: 1a_}, {2, selected}] via items[0]' + testContext, function(assert) {
            if (dataSourcePropertyName === 'dataSource') {
              assert.ok(true, 'Not supported for dataSource');
              return;
            }
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({
              items: [item1, item2],
              selectedIndex: 1
            });
            item1.text = '1aupd';
            this.tabPanel.option(dataSourcePropertyName + '[0]', item1);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item2.text, item2.content]);
            this.checkNotContainsElements(assert, ['1a', item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1, text: 1a, content: 1a_}, {2}] -> [{1, text: 1aupd, content: 1a_}, {2}] via items[0].text' + testContext, function(assert) {
            if (dataSourcePropertyName === 'dataSource') {
              assert.ok(true, 'Not supported for dataSource');
              return;
            }
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            this.tabPanel.option(dataSourcePropertyName + '[0].text', '1aupd');
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1]);
            this.checkItemRendered(assert, [{
              data: item1,
              index: 0
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text]);
            this.checkNotContainsElements(assert, ['1a', item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, text: 2a, content: 2a_}] -> [{1}, {2, text: 2aupd, content: 2a_}] via items[1]' + testContext, function(assert) {
            if (dataSourcePropertyName === 'dataSource') {
              assert.ok(true, 'Not supported for dataSource');
              return;
            }
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            item2.text = '2aupd';
            this.tabPanel.option(dataSourcePropertyName + '[1]', item2);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, []);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text]);
            this.checkNotContainsElements(assert, ['2a', item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, text: 2a, content: 2a_, selected}] -> [{1}, {2, text: 2aupd, content: 2a_, selected}] via items[1]' + testContext, function(assert) {
            if (dataSourcePropertyName === 'dataSource') {
              assert.ok(true, 'Not supported for dataSource');
              return;
            }
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({
              items: [item1, item2],
              selectedIndex: 1
            });
            item2.text = '2aupd';
            this.tabPanel.option(dataSourcePropertyName + '[1]', item2);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2]);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item2.text, item2.content]);
            this.checkNotContainsElements(assert, ['2a', item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}] -> [{2}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            this.createTabPanel({items: [item1]});
            var item2_ = {
              text: '2a',
              content: '2a_'
            };
            this.tabPanel.option(dataSourcePropertyName, [item2_]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item2_]);
            this.checkItemRendered(assert, [{
              data: item2_,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item2_.text, item2_.content]);
            this.checkNotContainsElements(assert, [item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2}] -> [{1}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            this.tabPanel.option(dataSourcePropertyName, [item1]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, []);
            this.checkItemDeleted(assert, [item2]);
            this.checkContainsElements(assert, [item1.text, item1.content]);
            this.checkNotContainsElements(assert, [item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2}] -> [selectedIndex: 1]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            this.tabPanel.option('selectedIndex', 1);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }]);
            this.checkItemDeleted(assert, []);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2}] -> [{1, visible:false}, {2}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            var item1_ = {
              text: '1a',
              content: '1a_',
              visible: false
            };
            this.tabPanel.option(dataSourcePropertyName, [item1_, item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, [item1_]);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 1
            }, {
              data: item1_,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item1.text, item1.content, item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2}] -> [{2}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({items: [item1, item2]});
            this.tabPanel.option(dataSourcePropertyName, [item2]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, [{
              data: item2,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item1]);
            this.checkContainsElements(assert, [item2.text, item2.content]);
            this.checkNotContainsElements(assert, [item1.text, item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, selected}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({
              items: [item1, item2],
              selectedIndex: 1
            });
            this.clock.tick(1);
            this.checkContainsElements(assert, [item1.text, item2.text, item2.content]);
            this.checkNotContainsElements(assert, [item1.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, selected}] -> [{1}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            this.createTabPanel({
              items: [item1, item2],
              selectedIndex: 1
            });
            this.tabPanel.option(dataSourcePropertyName, [item1]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, [{
              data: item1,
              index: 0
            }]);
            this.checkItemDeleted(assert, [item2]);
            this.checkContainsElements(assert, [item1.text, item1.content]);
            this.checkNotContainsElements(assert, [item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, selected}, {3}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            var item3 = {
              text: '3a',
              content: '3a_'
            };
            this.createTabPanel({
              items: [item1, item2, item3],
              selectedIndex: 1
            });
            this.clock.tick(1);
            this.checkContainsElements(assert, [item1.text, item2.text, item2.content, item3.text]);
            this.checkNotContainsElements(assert, [item1.content, item3.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
          QUnit.test('[{1}, {2, selected}, {3}] -> [{1}, {3}]' + testContext, function(assert) {
            var item1 = {
              text: '1a',
              content: '1a_'
            };
            var item2 = {
              text: '2a',
              content: '2a_'
            };
            var item3 = {
              text: '3a',
              content: '3a_'
            };
            this.createTabPanel({
              items: [item1, item2, item3],
              selectedIndex: 1
            });
            this.tabPanel.option(dataSourcePropertyName, [item1, item3]);
            this.clock.tick(1);
            this.checkTitleRendered(assert, []);
            this.checkItemRendered(assert, [{
              data: item3,
              index: 1
            }]);
            this.checkItemDeleted(assert, [item2]);
            this.checkContainsElements(assert, [item1.text, item3.text, item3.content]);
            this.checkNotContainsElements(assert, [item1.content, item2.text, item2.content]);
            this.checkContainsEmptyMessage(assert, false);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/tab_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/tab_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabPanel.repaintChangesOnly.tests.js.map