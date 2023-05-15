!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.API.getEditor.tests.js"], ["jquery","core/utils/type","ui/form/ui.form","ui/text_area","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.API.getEditor.tests.js", ["jquery", "core/utils/type", "ui/form/ui.form", "ui/text_area", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      isDefined;
  function CheckGetEditorResult(assert, prepareItemsCallback) {
    var formItems1 = ['test1', {dataField: 'test2'}, {
      name: 'custom1',
      editorType: 'dxTextArea'
    }];
    var formItems2 = ['test1_', {dataField: 'test2_'}, {
      name: 'custom1_',
      editorType: 'dxTextArea'
    }];
    var form = $('#form').dxForm({items: prepareItemsCallback(formItems1)}).dxForm('instance');
    assert.ok(!isDefined(form.getEditor('notexist')), 'notexist');
    assert.equal(form.getEditor('test1').option('name'), 'test1');
    assert.equal(form.getEditor('test2').option('name'), 'test2');
    assert.equal(form.getEditor('custom1').option('name'), '', 'custom1');
    form.option('items', prepareItemsCallback(formItems2));
    assert.ok(!isDefined(form.getEditor('test1')), 'test1');
    assert.ok(!isDefined(form.getEditor('test2')), 'test2');
    assert.ok(!isDefined(form.getEditor('custom1')), 'custom1');
    assert.equal(form.getEditor('test1_').option('name'), 'test1_');
    assert.equal(form.getEditor('test2_').option('name'), 'test2_');
    assert.equal(form.getEditor('custom1_').option('name'), '', 'custom1_');
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      isDefined = $__m.isDefined;
    }, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="form"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Public API: GetEditor');
      QUnit.test('getEditor returns [item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return items;
        });
      });
      QUnit.test('getEditor returns [group.item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return [{
            itemType: 'group',
            items: items
          }];
        });
      });
      QUnit.test('getEditor returns [tabbed.tab1.item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return [{
            itemType: 'tabbed',
            tabs: [{
              title: 'tab1',
              items: items
            }]
          }];
        });
      });
      QUnit.test('getEditor returns [tabbed.tab2.item] editor', function(assert) {
        var formItems1 = [{
          itemType: 'tabbed',
          tabs: [{
            title: 'tab1',
            items: ['tab1_item1']
          }, {
            title: 'tab2',
            items: ['tab2_item1', {dataField: 'tab2_datafield1'}, {
              name: 'tab2_custom',
              editorType: 'dxTextBox'
            }]
          }]
        }];
        var formItems2 = [{
          itemType: 'tabbed',
          tabs: [{
            title: 'tab1',
            items: ['tab1_item1_']
          }, {
            title: 'tab2',
            items: ['tab2_item1_', {dataField: 'tab2_datafield1_'}, {
              name: 'tab2_custom_',
              editorType: 'dxTextArea'
            }]
          }]
        }];
        var $form = $('#form');
        var form = $form.dxForm({items: formItems1}).dxForm('instance');
        assert.ok(!isDefined(form.getEditor('tab2_item1')));
        assert.ok(!isDefined(form.getEditor('tab2_datafield1')));
        assert.ok(!isDefined(form.getEditor('tab2_custom')));
        $form.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
        assert.equal(form.getEditor('tab2_item1').option('name'), 'tab2_item1');
        assert.equal(form.getEditor('tab2_datafield1').option('name'), 'tab2_datafield1');
        assert.equal(form.getEditor('tab2_custom').option('name'), '', 'tab2_custom');
        form.option('items', formItems2);
        assert.ok(!isDefined(form.getEditor('tab2_item1')));
        assert.ok(!isDefined(form.getEditor('tab2_datafield1')));
        assert.ok(!isDefined(form.getEditor('tab2_custom')));
        assert.ok(!isDefined(form.getEditor('tab2_item1_')));
        assert.ok(!isDefined(form.getEditor('tab2_datafield1_')));
        assert.ok(!isDefined(form.getEditor('tab2_custom_')));
      });
      QUnit.test('getEditor returns [tabbed.tab1.group.item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return [{
            itemType: 'tabbed',
            tabs: [{
              title: 'tab1',
              items: [{
                itemType: 'group',
                items: items
              }]
            }]
          }];
        });
      });
      QUnit.test('getEditor returns [group.tabbed.tab1.group.item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return [{
            itemType: 'group',
            items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab1',
                items: [{
                  itemType: 'group',
                  items: items
                }]
              }]
            }]
          }];
        });
      });
      QUnit.test('getEditor returns [tabbed1.tab1_1.tabbed2.tab2_1.item] editor', function(assert) {
        CheckGetEditorResult(assert, function(items) {
          return [{
            itemType: 'tabbed',
            tabs: [{
              title: 'tab1_1',
              items: [{
                itemType: 'tabbed',
                tabs: [{
                  title: 'tab2_1',
                  items: items
                }]
              }]
            }]
          }];
        });
      });
      QUnit.test('Get editor instance', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          formData: {
            test1: 'abc',
            test2: 'xyz'
          },
          items: ['test1', {
            name: 'test3',
            editorType: 'dxNumberBox'
          }]
        });
        var form = $testContainer.dxForm('instance');
        assert.ok(!isDefined(form.getEditor('test2')), 'We hasn\'t instance for \'test2\' field');
        assert.ok(isDefined(form.getEditor('test1')), 'We have instance for \'test1\' field');
        assert.ok(isDefined(form.getEditor('test3')), 'We have instance for \'test3\' field');
        assert.equal(form.getEditor('test1').NAME, 'dxTextBox', 'It\'s textbox');
        assert.equal(form.getEditor('test3').NAME, 'dxNumberBox', 'It\'s numberBox');
      });
      QUnit.test('Get editor instance with group config', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          formData: {
            test1: 'abc',
            test2: 'xyz'
          },
          items: ['test1', {
            itemType: 'group',
            items: [{
              dataField: 'test2',
              editorType: 'dxTextArea'
            }, {
              name: 'test3',
              editorType: 'dxTextBox'
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        assert.ok(isDefined(form.getEditor('test1')), 'We have instance for \'test1\' field');
        assert.ok(isDefined(form.getEditor('test2')), 'We have instance for \'test2\' field');
        assert.ok(isDefined(form.getEditor('test3')), 'We have instance for \'test3\' field');
        assert.equal(form.getEditor('test2').NAME, 'dxTextArea', 'It\'s textArea');
        assert.equal(form.getEditor('test3').NAME, 'dxTextBox', 'It\'s textBox');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","ui/form/ui.form","ui/text_area","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("ui/form/ui.form"), require("ui/text_area"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.API.getEditor.tests.js.map