!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.angular/collectionWidgetItem.tests.js"], ["jquery","angular","core/component_registrator","ui/collection/ui.collection_widget.edit","ui/collection/item","integration/angular"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.angular/collectionWidgetItem.tests.js", ["jquery", "angular", "core/component_registrator", "ui/collection/ui.collection_widget.edit", "ui/collection/item", "integration/angular"], function($__export) {
  "use strict";
  var $,
      angular,
      registerComponent,
      CollectionWidget,
      CollectionWidgetItem,
      FOCUSED_STATE_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      angular = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      CollectionWidget = $__m.default;
    }, function($__m) {
      CollectionWidgetItem = $__m.default;
    }, function($__m) {}],
    execute: function() {
      FOCUSED_STATE_CLASS = 'dx-state-focused';
      QUnit.module('CollectionWidgetItem', {beforeEach: function() {
          var TestCollectionItem = this.TestCollectionItem = CollectionWidgetItem.inherit({
            _renderWatchers: function() {
              this._startWatcher('value', this._renderValue.bind(this));
            },
            _renderValue: function(value) {
              this._$element.data('value', value);
            }
          });
          var TestCollection = this.TestCollection = CollectionWidget.inherit({_getDefaultOptions: function() {
              return $.extend(this.callBase(), {valueExpr: 'value'});
            }});
          TestCollection.ItemClass = TestCollectionItem;
          var DefaultCollection = this.DefaultCollection = CollectionWidget.inherit();
          registerComponent('dxTestCollection', TestCollection);
          registerComponent('dxDefaultCollection', DefaultCollection);
          this.testApp = angular.module('testApp', ['dx']);
          this.$fixtureElement = $('<div/>').attr('ng-app', 'testApp').appendTo('#qunit-fixture');
          this.$container = this.$fixtureElement;
          this.$controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo(this.$container);
        }});
      QUnit.test('item should correctly watch changes', function(assert) {
        var $markup = $('<div></div>').attr('dx-test-collection', '{ itemTemplate: noop, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [];
          $scope.noop = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.items = [{value: 1}];
        });
        var $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 1, 'value changed');
        scope.$apply(function() {
          scope.items[0].value = 2;
        });
        assert.equal($item.data('value'), 2, 'value changed');
      });
      QUnit.test('item should correctly watch changes for complex expressions', function(assert) {
        var $markup = $('<div></div>').attr('dx-test-collection', '{ itemTemplate: noop, valueExpr: valueExpr, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [];
          $scope.noop = function() {};
          $scope.valueExpr = function(data) {
            return data.value + 1;
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.items = [{value: 1}];
        });
        var $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        assert.equal($item.data('value'), 2, 'value changed');
        scope.$apply(function() {
          scope.items[0].value = 2;
        });
        assert.equal($item.data('value'), 3, 'value changed');
      });
      QUnit.test('item should correctly reset collection focus state', function(assert) {
        var $markup = $('<div></div>').attr('dx-default-collection', '{ itemTemplate: noop, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [{text: 'test'}];
          $scope.noop = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var collection = this.DefaultCollection.getInstance($markup);
        var $firstItem = $(collection.itemElements()).first();
        var resetFocusSpy = sinon.spy(collection, '_resetItemFocus');
        collection.option('focusedElement', $firstItem.get(0));
        assert.ok($firstItem.hasClass(FOCUSED_STATE_CLASS));
        scope.$apply(function() {
          scope.items[0].disabled = true;
        });
        assert.ok(resetFocusSpy.calledOnce);
        assert.notOk($firstItem.hasClass(FOCUSED_STATE_CLASS));
        scope.$apply(function() {
          scope.items[0].disabled = false;
        });
        assert.ok(resetFocusSpy.calledOnce);
      });
      QUnit.test('item should not be rerendered', function(assert) {
        var $markup = $('<div></div>').attr('dx-test-collection', '{ itemTemplate: noop, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [{value: 1}];
          $scope.noop = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var $item = this.TestCollection.getInstance($markup).itemElements().eq(0);
        $item.data('rendered', true);
        scope.$apply(function() {
          scope.items[0].value = 2;
        });
        assert.equal($item.data('rendered'), true, 'item not rerendered');
      });
      QUnit.test('item should not generate watchers for null expressions', function(assert) {
        var $markup = $('<div></div>').attr('dx-test-collection', '{ itemTemplate: noop, valueExpr: null, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [];
          $scope.noop = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var startWatchersCount = scope.$$watchers.length;
        scope.$apply(function() {
          scope.items = [{value: 1}];
        });
        assert.equal(scope.$$watchers.length, startWatchersCount + 1, 'watcher not created for value');
      });
      QUnit.test('item should not leak watchers', function(assert) {
        var $markup = $('<div></div>').attr('dx-test-collection', '{ itemTemplate: noop, bindingOptions: { items: \'items\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [];
          $scope.noop = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var startWatchersCount = scope.$$watchers.length;
        scope.$apply(function() {
          scope.items = [{value: 1}];
        });
        scope.$apply(function() {
          scope.items = [];
        });
        assert.equal(scope.$$watchers.length, startWatchersCount, 'watchers cleared');
      });
      QUnit.test('onItemRendered event should have a completely rendered itemElement', function(assert) {
        $('<div></div>').attr('dx-test-collection', '{ bindingOptions: { items: \'items\', onItemRendered: \'onItemRendered\' }}').appendTo(this.$controller);
        var itemElementText;
        this.testApp.controller('my-controller', function($scope) {
          $scope.items = [{text: 'test'}];
          $scope.onItemRendered = function(e) {
            itemElementText = $(e.itemElement).text();
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        assert.equal(itemElementText, 'test', 'itemElement has a rendered text on \'itemRendered\' event');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","angular","core/component_registrator","ui/collection/ui.collection_widget.edit","ui/collection/item","integration/angular"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("angular"), require("core/component_registrator"), require("ui/collection/ui.collection_widget.edit"), require("ui/collection/item"), require("integration/angular"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=collectionWidgetItem.tests.js.map