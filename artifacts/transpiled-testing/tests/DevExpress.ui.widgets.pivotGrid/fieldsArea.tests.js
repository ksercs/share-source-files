!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.pivotGrid/fieldsArea.tests.js"], ["jquery","generic_light.css!","core/utils/shadow_dom.js","__internal/grids/pivot_grid/fields_area/module","__internal/grids/pivot_grid/area_item/module"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.pivotGrid/fieldsArea.tests.js", ["jquery", "generic_light.css!", "core/utils/shadow_dom.js", "__internal/grids/pivot_grid/fields_area/module", "__internal/grids/pivot_grid/area_item/module"], function($__export) {
  "use strict";
  var $,
      addShadowDomStyles,
      FieldsArea,
      AreaItem;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      FieldsArea = $__m.FieldsArea;
    }, function($__m) {
      AreaItem = $__m.AreaItem;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Creation', function() {
        QUnit.test('Create Fields area', function(assert) {
          var fieldsArea = new FieldsArea();
          assert.ok(fieldsArea);
          assert.ok(fieldsArea instanceof AreaItem);
        });
      });
      QUnit.module('Rendering', {beforeEach: function() {
          this.component = {
            option: sinon.stub(),
            $element: function() {
              return $('<div>').dxPivotGridFieldChooserBase();
            }
          };
          this.component.option.withArgs('fieldPanel.texts.myAreaFieldArea').returns('Drop Fields Here');
          this.component.option.withArgs('fieldPanel.showMyAreaFields').returns(true);
          this.component.option.withArgs('fieldPanel.visible').returns(true);
          this.area = new FieldsArea(this.component, 'myArea');
          this.$container = $('#container').addClass('dx-pivotgrid');
        }}, function() {
        QUnit.test('Render without data', function(assert) {
          this.area.render(this.$container, []);
          assert.strictEqual(this.area.tableElement()[0].rows.length, 1);
          assert.strictEqual(this.area.tableElement()[0].rows[0].cells.length, 1, 'area column count');
          assert.strictEqual($(this.area.tableElement()[0].rows[0].cells[0]).find('.dx-empty-area-text').text(), 'Drop Fields Here', 'Empty area text');
          assert.ok(this.area.tableElement().hasClass('dx-area-field-container'));
          var groupElement = this.area.groupElement();
          assert.ok(groupElement.hasClass('dx-area-fields'));
          assert.ok(groupElement.hasClass('dx-pivotgrid-drag-action'), 'items in area are draggable');
          assert.strictEqual(groupElement.attr('group'), 'myArea');
        });
        QUnit.test('Render fields', function(assert) {
          this.area.render(this.$container, [{
            dataField: 'Field Area 1',
            allowFiltering: true,
            allowSorting: true,
            area: 'myArea'
          }, {
            dataField: 'Field2',
            allowFiltering: true,
            allowSorting: true,
            area: 'myArea'
          }]);
          var rows = this.area.tableElement()[0].rows;
          assert.strictEqual(rows.length, 1);
          assert.strictEqual(rows[0].cells.length, 2);
          assert.ok(this.$container.find('.dx-area-field').eq(0).children().eq(0).hasClass('dx-area-field-content'));
        });
        QUnit.test('Render fields for row area', function(assert) {
          this.component.option.withArgs('fieldPanel.showRowFields').returns(true);
          var area = new FieldsArea(this.component, 'row');
          area.render(this.$container, [{
            dataField: 'Field Area 1',
            allowFiltering: true,
            allowSorting: true,
            area: 'row'
          }]);
          assert.ok(this.$container.find('.dx-area-field').eq(0).children().eq(0).hasClass('dx-column-indicators'));
        });
        QUnit.test('Render if area is hidden', function(assert) {
          this.component.option.withArgs('fieldPanel.showMyAreaFields').returns(false);
          this.area.render(this.$container, []);
          assert.strictEqual(this.area.groupElement().is(':visible'), false);
          assert.strictEqual(this.area.tableElement()[0].rows.length, 0);
        });
        QUnit.test('Render if fieldPanel is hidden', function(assert) {
          this.component.option.withArgs('fieldPanel.visible').returns(false);
          this.area.render(this.$container, []);
          assert.strictEqual(this.area.groupElement().is(':visible'), false);
          assert.strictEqual(this.area.tableElement()[0].rows.length, 0);
        });
        QUnit.test('Render after show the area', function(assert) {
          this.component.option.withArgs('showMyAreaHeader').returns(false);
          this.area.render(this.$container, []);
          this.component.option.withArgs('showMyAreaHeader').returns(true);
          this.area.render(this.$container, []);
          assert.strictEqual(this.area.groupElement().is(':visible'), true);
          assert.strictEqual(this.area.tableElement()[0].rows.length, 1);
        });
        QUnit.test('Render group fields', function(assert) {
          this.area.render(this.$container, [{
            dataField: 'Field1',
            groupName: 'Group1',
            area: 'myArea'
          }, {
            dataField: 'Field2',
            groupName: 'Group1',
            area: 'myArea'
          }, {
            dataField: 'Field3',
            groupName: 'Group1',
            area: 'myArea'
          }, {
            dataField: 'Field4',
            area: 'myArea'
          }]);
          var cells = this.area.tableElement().find('td');
          assert.strictEqual(cells.length, 4);
          assert.strictEqual(cells.eq(0).find('.dx-group-connector').length, 1);
          assert.ok(cells.eq(0).find('.dx-group-connector').hasClass('dx-group-connector-next'));
          assert.strictEqual(cells.eq(0).find('.dx-area-field').attr('item-group'), 'Group1');
          assert.strictEqual(cells.eq(1).find('.dx-group-connector').length, 2);
          assert.ok(cells.eq(1).find('.dx-group-connector').eq(0).hasClass('dx-group-connector-prev'));
          assert.ok(cells.eq(1).find('.dx-group-connector').eq(1).hasClass('dx-group-connector-next'));
          assert.strictEqual(cells.eq(1).find('.dx-area-field').attr('item-group'), 'Group1');
          assert.strictEqual(cells.eq(2).find('.dx-group-connector').length, 1);
          assert.ok(cells.eq(2).find('.dx-group-connector').eq(0).hasClass('dx-group-connector-prev'));
          assert.strictEqual(cells.eq(2).find('.dx-area-field').attr('item-group'), 'Group1');
          assert.strictEqual(cells.eq(3).find('.dx-group-connector').length, 0);
          assert.strictEqual(cells.eq(3).find('.dx-area-field').attr('item-group'), undefined);
        });
        QUnit.test('Not render field for incorrect area', function(assert) {
          this.area.render(this.$container, [{
            dataField: 'Field1',
            area: 'myArea'
          }, {
            dataField: 'Field2',
            area: 'filter'
          }]);
          var fields = this.area.tableElement().find('.dx-area-field');
          assert.strictEqual(fields.length, 1);
          assert.strictEqual(fields.eq(0).data('field').area, 'myArea');
        });
        QUnit.test('Render empty area when all fields with incorrect area', function(assert) {
          this.area.render(this.$container, [{
            dataField: 'Field1',
            area: 'filter'
          }, {
            dataField: 'Field2',
            area: 'filter'
          }]);
          var fields = this.area.tableElement().find('.dx-area-field');
          assert.strictEqual(fields.length, 0);
          assert.strictEqual($(this.area.tableElement()[0].rows[0].cells[0]).find('.dx-empty-area-text').text(), 'Drop Fields Here', 'Empty area text');
        });
        QUnit.test('Not render hidden field', function(assert) {
          this.area.render(this.$container, [{
            dataField: 'Field1',
            area: 'myArea',
            visible: false
          }, {
            dataField: 'Field2',
            area: 'myArea'
          }]);
          var fields = this.area.tableElement().find('.dx-area-field');
          assert.strictEqual(fields.length, 1, 'rendered fields count');
          assert.strictEqual(fields.eq(0).data('field').dataField, 'Field2', 'rendered field');
        });
      });
      QUnit.module('Hamburger', {beforeEach: function() {
          this.component = {
            option: sinon.stub(),
            element: function() {
              return $('<div>').dxPivotGridFieldChooserBase();
            },
            _createComponent: function(container, Component, options) {
              return new Component(container, options);
            }
          };
          this.component.option.withArgs('fieldPanel.texts.myAreaFieldArea').returns('Drop Fields Here');
          this.component.option.withArgs('fieldPanel.showRowFields').returns(true);
          this.component.option.withArgs('fieldPanel.visible').returns(true);
          this.component.option.withArgs('rowLayout').returns('tree');
          this.fields = [{
            dataField: 'Field Area 1',
            allowFiltering: true,
            allowSorting: true,
            area: 'row'
          }, {
            dataField: 'Field2',
            allowFiltering: true,
            allowSorting: true,
            area: 'row'
          }];
          this.area = new FieldsArea(this.component, 'row');
          this.$container = $('#container').addClass('dx-pivotgrid');
          var that = this;
          this.renderArea = function() {
            that.area.render(that.$container, that.fields);
          };
        }}, function() {
        QUnit.skip('Render hamburger button', function(assert) {
          this.renderArea();
          var rows = this.area.tableElement()[0].rows;
          assert.strictEqual(rows.length, 1);
          assert.strictEqual(rows[0].cells.length, 1);
          assert.ok($(rows[0].cells[0]).children(0).dxButton('instance'));
          var popup = this.area.tableElement().find('.dx-fields-area-popup').dxPopup('instance');
          assert.ok(popup);
          assert.ok(!popup.option('visible'));
          assert.ok(!popup.option('dragEnabled'));
        });
        QUnit.skip('Show popup with fields', function(assert) {
          this.renderArea();
          var button = $(this.area.tableElement()[0].rows[0].cells[0]).children(0).dxButton('instance');
          button.element().trigger('dxclick');
          var popup = this.area.tableElement().find('.dx-fields-area-popup').dxPopup('instance');
          assert.ok(popup);
          assert.ok(popup.option('visible'));
          assert.strictEqual(popup.content().find('.dx-pivotgrid-fields-area-head').length, 1);
          assert.strictEqual(popup.content().find('.dx-pivotgrid-fields-area-head').find('.dx-area-field').length, 2);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","core/utils/shadow_dom.js","__internal/grids/pivot_grid/fields_area/module","__internal/grids/pivot_grid/area_item/module"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("core/utils/shadow_dom.js"), require("__internal/grids/pivot_grid/fields_area/module"), require("__internal/grids/pivot_grid/area_item/module"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fieldsArea.tests.js.map