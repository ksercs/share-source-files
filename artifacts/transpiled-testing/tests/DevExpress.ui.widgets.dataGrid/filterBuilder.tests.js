!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/filterBuilder.tests.js"], ["ui/data_grid","jquery","animation/fx","../../helpers/dataGridMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/filterBuilder.tests.js", ["ui/data_grid", "jquery", "animation/fx", "../../helpers/dataGridMocks.js"], function($__export) {
  "use strict";
  var $,
      fx,
      dataGridMocks,
      setupDataGridModules;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }],
    execute: function() {
      setupDataGridModules = dataGridMocks.setupDataGridModules;
      QUnit.testStart(function() {
        var markup = "<div>\n        <div class=\"dx-datagrid\">\n            <div id=\"container\"></div>\n        </div>\n    </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Common', {beforeEach: function() {
          this.initFilterBuilderView = function(options) {
            this.options = $.extend({
              filterBuilderPopup: {},
              columns: [{dataField: 'field'}],
              filterBuilder: {}
            }, options);
            setupDataGridModules(this, ['columns', 'headerFilter', 'filterSync', 'filterBuilder', 'data'], {initViews: true});
            this.filterBuilderView.render($('#container'));
            this.filterBuilderView.component.isReady = function() {
              return true;
            };
          };
          this.changeOption = function(name, fullName, value) {
            this.option(fullName, value);
            this.filterBuilderView.beginUpdate();
            this.filterBuilderView.optionChanged({name: name});
            this.filterBuilderView.endUpdate();
          };
        }}, function() {
        QUnit.test('showFilterBuilderPopup & hideFilterBuilderPopup', function(assert) {
          var handlerShow = sinon.spy();
          var handlerHide = sinon.spy();
          this.initFilterBuilderView({filterBuilderPopup: {
              onShowing: handlerShow,
              onHiding: handlerHide
            }});
          assert.equal(handlerShow.called, 0);
          assert.equal(handlerHide.called, 0);
          this.changeOption('filterBuilderPopup', 'filterBuilderPopup.visible', true);
          assert.equal(handlerShow.called, 1);
          assert.equal(handlerHide.called, 0);
          this.changeOption('filterBuilderPopup', 'filterBuilderPopup.visible', false);
          assert.equal(handlerShow.called, 1);
          assert.equal(handlerHide.called, 1);
        });
        QUnit.test('initFilterBuilder', function(assert) {
          var handlerInit = sinon.spy();
          this.initFilterBuilderView({filterBuilder: {onInitialized: handlerInit}});
          assert.equal(handlerInit.called, 0);
          this.changeOption('filterBuilderPopup', 'filterBuilderPopup.visible', true);
          assert.equal(handlerInit.called, 1);
        });
        QUnit.test('filter builder popup has scrollview after the second showing', function(assert) {
          this.initFilterBuilderView({filterBuilderPopup: {visible: true}});
          this.changeOption('filterBuilderPopup', 'filterBuilderPopup.visible', false);
          this.changeOption('filterBuilderPopup', 'filterBuilderPopup.visible', true);
          assert.ok($('.dx-popup-content .dx-scrollview-content').length);
        });
        QUnit.test('operation of the number datatype can be used in the string datatype if it contains in the array of filterOperations', function(assert) {
          this.initFilterBuilderView({
            columns: [{
              dataField: 'field',
              filterOperations: ['>']
            }],
            filterValue: ['field', '>', 'a'],
            filterBuilderPopup: {visible: true}
          });
          assert.ok($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('the \'any of\' operation should throw an exception if filterOperations does not contain it', function(assert) {
          var that = this;
          assert.throws(function() {
            that.initFilterBuilderView({
              headerFilter: {visible: true},
              filterSyncEnabled: true,
              columns: [{
                dataField: 'field',
                dataType: 'string',
                filterOperations: ['>'],
                allowFiltering: true
              }],
              filterValue: ['field', 'anyof', ['a']],
              filterBuilderPopup: {visible: true}
            });
          }, function(e) {
            return /E1048/.test(e.message);
          });
        });
        QUnit.test('the \'any of\' operation is available in filterBuilderPopup if filterOperations contains it', function(assert) {
          this.initFilterBuilderView({
            columns: [{
              dataField: 'field',
              filterOperations: ['>', 'anyof']
            }],
            filterValue: ['field', 'anyof', ['a']],
            filterBuilderPopup: {visible: true}
          });
          assert.ok($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('the \'any of\' operation is available in filterBuilderPopup if filterOperations are not set', function(assert) {
          this.initFilterBuilderView({
            columns: [{dataField: 'field'}],
            filterValue: ['field', 'anyof', ['a']],
            filterBuilderPopup: {visible: true}
          });
          assert.ok($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('the \'any of\' operation is available in filterBuilderPopup if filterOperations is instance of defaultFilterOperations', function(assert) {
          this.initFilterBuilderView({
            columns: [{
              dataField: 'field',
              dataType: 'string',
              defaultFilterOperations: ['=']
            }],
            filterValue: ['field', 'anyof', ['a']],
            filterBuilderPopup: {visible: true}
          });
          assert.equal($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('filter value with name in identifier shows in filterBuilder', function(assert) {
          this.initFilterBuilderView({
            columns: [{
              name: 'field',
              allowFiltering: true
            }],
            filterValue: ['field', '=', 1],
            filterBuilderPopup: {visible: true}
          });
          assert.equal($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('the customOperation is available in built-in filterBuilder using dataTypes array', function(assert) {
          this.initFilterBuilderView({
            columns: [{dataField: 'field'}],
            filterValue: ['field', 'weekends'],
            filterBuilderPopup: {visible: true},
            filterBuilder: {customOperations: [{
                name: 'weekends',
                caption: 'Weekends',
                dataTypes: ['string'],
                hasValue: false
              }]}
          });
          assert.ok($('.dx-popup-content .dx-filterbuilder-item-operation').text(), 'Weekends');
        });
        QUnit.test('init filterbuilder in datagrid with banded columns', function(assert) {
          this.initFilterBuilderView({
            columns: [{
              caption: 'Banded column',
              columns: [{
                caption: 'Banded column item',
                dataField: 'field',
                filterOperations: ['=']
              }]
            }, {
              caption: 'Banded column 2',
              columns: [{
                caption: 'Inner banded column',
                columns: [{
                  caption: 'Banded column item 2',
                  dataField: 'field2',
                  filterOperations: ['=']
                }]
              }]
            }],
            filterValue: [['field', '=', 'a'], 'and', ['field2', '=', 'b']],
            filterBuilderPopup: {visible: true}
          });
          assert.ok($('.dx-popup-content .dx-filterbuilder-item-operation').length, 1);
        });
        QUnit.test('the field mustn\'t be in filterBuilder if allowFiltering = false', function(assert) {
          var filterBuilderFields;
          this.initFilterBuilderView({
            columns: [{dataField: 'field'}, {
              dataField: 'hiddenField',
              allowFiltering: false
            }],
            filterBuilder: {onInitialized: function(e) {
                filterBuilderFields = e.component.option('fields');
              }},
            filterBuilderPopup: {visible: true}
          });
          assert.deepEqual(filterBuilderFields.length, 1);
          assert.deepEqual(filterBuilderFields[0].dataField, 'field');
        });
        QUnit.test('the field mustn\'t be in filterBuilder if this does not contain dataField', function(assert) {
          var filterBuilderFields;
          this.initFilterBuilderView({
            columns: [{caption: 'field text'}, {dataField: 'field'}],
            filterBuilder: {onInitialized: function(e) {
                filterBuilderFields = e.component.option('fields');
              }},
            filterBuilderPopup: {visible: true}
          });
          assert.deepEqual(filterBuilderFields.length, 1);
          assert.deepEqual(filterBuilderFields[0].dataField, 'field');
        });
        QUnit.test('Filter builder doesn\'t throw errors when boolean data type columns are used', function(assert) {
          var handlerInit = sinon.spy();
          this.initFilterBuilderView({
            columns: [{
              dataField: 'field',
              dataType: 'boolean',
              filterOperations: []
            }],
            filterBuilder: {onInitialized: handlerInit},
            filterBuilderPopup: {visible: true},
            filterValue: ['field', '=', true]
          });
          assert.equal(handlerInit.called, 1);
        });
      });
      QUnit.module('Real dataGrid', {
        beforeEach: function() {
          this.initDataGrid = function(options) {
            this.dataGrid = $('#container').dxDataGrid($.extend({dataSource: [{}]}, options)).dxDataGrid('instance');
            return this.dataGrid;
          };
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.dataGrid.dispose();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('the \'any of\' doesn\'t throw exception when popup is hiding (without jQuery)', function(assert) {
          this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'string',
              defaultFilterOperations: ['anyof']
            }],
            filterValue: ['field', 'anyof', ['text']],
            filterBuilderPopup: {visible: true}
          });
          $('.dx-popup-content .dx-filterbuilder-item-value-text').trigger('dxclick');
          this.clock.tick(10);
          $('.dx-header-filter-menu.dx-popup').dxPopup('instance').hide();
          assert.equal($('.dx-popup-content .dx-filterbuilder-item-value-text').text(), 'text');
        });
        QUnit.test('The value for the \'Is any of\' operation is changed when filterBuilderPopup has hideOnOutsideClick=true', function(assert) {
          this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'string',
              defaultFilterOperations: ['anyof']
            }],
            filterBuilderPopup: {
              visible: true,
              hideOnOutsideClick: true
            },
            filterValue: ['field', 'anyof', ['text']]
          });
          $('.dx-popup-content .dx-filterbuilder-item-value-text').trigger('dxclick');
          this.clock.tick(10);
          $('.dx-header-filter-menu.dx-popup').dxPopup('instance').hide();
          assert.equal(this.dataGrid.option('filterBuilderPopup.visible'), true);
        });
        QUnit.test('the \'any of\' doesn\'t throw exception when column is lookup', function(assert) {
          this.initDataGrid({
            dataSource: [{field: 1}, {field: 2}],
            loadingTimeout: null,
            columns: [{
              dataField: 'field',
              lookup: {
                dataSource: [{
                  id: 1,
                  text: 'Text 1'
                }, {
                  id: 2,
                  text: 'Text 2'
                }],
                valueExpr: 'id',
                displayExpr: 'text'
              }
            }],
            filterValue: ['field', 'anyof', [1, 2]]
          });
          this.dataGrid.option('filterBuilderPopup.visible', true);
          $('.dx-popup-content .dx-filterbuilder-item-value-text').trigger('dxclick');
          var $valueText = $('.dx-popup-content .dx-filterbuilder-item-value-text');
          assert.equal($valueText.text(), 'Text 1|Text 2');
          assert.equal($valueText.children().length, 3, 'three children items');
        });
        QUnit.test('the \'any of\' doesn\'t throw exception when customizeColumns is used and column.dataType is defined', function(assert) {
          this.initDataGrid({
            dataSource: [{field: 1}, {field: 2}, {field: 3}],
            customizeColumns: function(columns) {},
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }],
            filterValue: ['field', 'anyof', [1, 2]],
            loadingTimeout: null
          });
          this.dataGrid.option('filterBuilderPopup.visible', true);
          assert.equal($('.dx-popup-content .dx-filterbuilder').length, 1);
        });
        QUnit.test('The one negative condition is specified inside another', function(assert) {
          this.initDataGrid({
            dataSource: [{field: 1}, {field: 2}, {field: 3}],
            customizeColumns: function(columns) {},
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }],
            filterPanel: {visible: true},
            filterValue: ['!', ['!', ['field', '=', 1]]],
            loadingTimeout: null
          });
          this.dataGrid.option('filterBuilderPopup.visible', true);
          assert.equal($('.dx-popup-content .dx-filterbuilder').length, 1);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/data_grid","jquery","animation/fx","../../helpers/dataGridMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/data_grid"), require("jquery"), require("animation/fx"), require("../../helpers/dataGridMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filterBuilder.tests.js.map