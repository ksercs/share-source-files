!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/selectNodesRecursiveTrue.js"], ["jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/selectNodesRecursiveTrue.js", ["jquery"], function($__export) {
  "use strict";
  var $;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      QUnit.module('selectNodesRecursive = true', {
        beforeEach: function() {
          this.data = $.extend(true, [], DATA[5]);
          this.data[0].items[1].items[0].expanded = true;
          this.data[0].items[1].items[1].expanded = true;
          this.$treeView = initTree({
            items: this.data,
            showCheckBoxesMode: 'normal'
          });
          this.treeView = this.$treeView.dxTreeView('instance');
        },
        afterEach: function() {}
      });
      QUnit.test('ignore invisible items on select (T317454)', function(assert) {
        var items = [{
          text: 'item 1',
          expanded: true,
          items: [{
            text: 'item 11',
            selected: false
          }, {
            text: 'item 12',
            visible: false,
            selected: false
          }]
        }];
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'selectAll'
        });
        var treeView = $treeView.dxTreeView('instance');
        var selectAll = $treeView.find('.dx-treeview-select-all-item').dxCheckBox('instance');
        treeView.selectItem(items[0].items[0]);
        assert.strictEqual(items[0].selected, true, 'parent item ignore invisible selection');
        assert.strictEqual(selectAll.option('value'), true, 'selectAll item ignore invisible selection');
      });
      QUnit.test('ignore invisible items on unselect (T317454)', function(assert) {
        var items = [{
          text: 'item 1',
          expanded: true,
          items: [{text: 'item 11'}, {
            text: 'item 12',
            visible: false,
            selected: true
          }, {
            text: 'item 13',
            visible: false
          }]
        }];
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'selectAll'
        });
        var treeView = $treeView.dxTreeView('instance');
        var selectAll = $treeView.find('.dx-treeview-select-all-item').dxCheckBox('instance');
        treeView.selectItem(items[0]);
        assert.notOk(items[0].items[2].selected, 'invisible item ignores parent selection');
        treeView.unselectItem(items[0].items[0]);
        assert.strictEqual(items[0].selected, false, 'parent item ignore invisible selection');
        assert.strictEqual(selectAll.option('value'), false, 'selectAll item ignore invisible selection');
      });
      QUnit.test('Unselect disabled item via API', function(assert) {
        var data = $.extend(true, [], DATA[2]);
        data[0].disabled = true;
        data[0].selected = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        });
        var instance = $treeView.dxTreeView('instance');
        var $item = $treeView.find('.' + internals.ITEM_CLASS).first().get(0);
        assert.ok(instance.option('items')[0].selected, 'item is selected');
        instance.unselectItem($item);
        assert.notOk(instance.option('items')[0].selected, 'item is not selected');
      });
      QUnit.test('selection by key', function(assert) {
        var data = [{
          id: 1,
          text: 'Item 1',
          expanded: true,
          items: [{
            id: 11,
            text: 'Item 11'
          }]
        }, {
          id: 12,
          text: 'Item 12'
        }];
        var treeView = initTree({items: data}).dxTreeView('instance');
        treeView.selectItem(1);
        assert.ok(data[0].selected);
        treeView.unselectItem(1);
        assert.notOk(data[0].selected);
      });
      QUnit.test('Toggle node selected class', function(assert) {
        var data = $.extend(true, [], DATA[2]);
        data[0].selected = true;
        data[0].expanded = true;
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var $treeView = treeView.$element();
        var $selectedItems = $treeView.find('.dx-state-selected');
        var checkboxes = $treeView.find('.dx-checkbox');
        assert.equal($selectedItems.length, 3, '3 selected items');
        $(checkboxes[1]).trigger('dxclick');
        $selectedItems = $treeView.find('.dx-state-selected');
        assert.equal($selectedItems.length, 1, '1 selected items');
        $(checkboxes[2]).trigger('dxclick');
        $selectedItems = $treeView.find('.dx-state-selected');
        assert.equal($selectedItems.length, 0, '0 selected items');
      });
      QUnit.test('\'selectItem()\' by itemData', function(assert) {
        this.treeView.selectItem(this.data[0]);
        assert.ok(this.data[0].selected, 'item was selected');
      });
      QUnit.test('\'unselectItem()\' by itemData', function(assert) {
        this.treeView.selectItem(this.data[0]);
        this.treeView.unselectItem(this.data[0]);
        assert.ok(!this.data[0].selected, 'item was unselected');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selectNodesRecursiveTrue.js.map