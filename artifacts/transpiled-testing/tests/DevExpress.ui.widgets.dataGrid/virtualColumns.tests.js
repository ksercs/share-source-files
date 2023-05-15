!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/virtualColumns.tests.js"], ["jquery","../../helpers/dataGridMocks.js","ui/data_grid","generic_light.css!","data/data_source/data_source","ui/data_grid/ui.data_grid.data_source_adapter","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/virtualColumns.tests.js", ["jquery", "../../helpers/dataGridMocks.js", "ui/data_grid", "generic_light.css!", "data/data_source/data_source", "ui/data_grid/ui.data_grid.data_source_adapter", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      dataGridMocks,
      DataSource,
      dataSourceAdapter,
      getOuterWidth,
      setupModule,
      teardownModule,
      createDataSource,
      setupRenderingModule,
      teardownRenderingModule;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      dataSourceAdapter = $__m.default;
    }, function($__m) {
      getOuterWidth = $__m.getOuterWidth;
    }],
    execute: function() {
      setupModule = function() {
        var columns = [];
        for (var i = 1; i <= 50; i++) {
          columns.push({dataField: 'field' + i});
        }
        this.columns = columns;
        this.setupModules = function(options) {
          dataGridMocks.setupDataGridModules(this, ['columns', 'data', 'selection', 'editing', 'masterDetail', 'columnFixing', 'virtualColumns'], {
            initDefaultOptions: true,
            controllers: {data: new dataGridMocks.MockDataController({items: []})},
            options: options
          });
        };
        this.setupVirtualColumns = function(options) {
          this.setupModules($.extend(true, {
            scrolling: {columnRenderingMode: 'virtual'},
            width: 400,
            columnWidth: 50,
            columns: this.columns
          }, options));
        };
        this.getColumns = function(parameterNames) {
          return this.columnsController.getColumns();
        };
        this.getFixedColumns = function(parameterNames) {
          return this.columnsController.getFixedColumns();
        };
      };
      teardownModule = function() {
        this.dispose();
      };
      createDataSource = function(context, config, remoteOperations) {
        var dataSource = new DataSource(config);
        var dataAdapter = dataSourceAdapter.create(context);
        dataAdapter.init(dataSource, remoteOperations);
        return dataAdapter;
      };
      QUnit.module('initialization', {
        beforeEach: setupModule,
        afterEach: teardownModule
      }, function() {
        QUnit.test('virtual column rendering is disabled by default', function(assert) {
          this.setupModules({
            width: 400,
            columnWidth: 50,
            columns: this.columns
          });
          assert.strictEqual(this.getColumns().length, 50, 'column count');
          assert.strictEqual(this.getVisibleColumns().length, 50, 'visible column count');
        });
        QUnit.test('Enable virtual column rendering using columnRenderingMode option', function(assert) {
          this.setupVirtualColumns();
          assert.strictEqual(this.getColumns().length, 50, 'column count');
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns(0, true).length, 50, 'all visible column count');
        });
        QUnit.test('getVisibleColumns if columns are generated by data source', function(assert) {
          var $__4 = this;
          var done = assert.async();
          this.setupVirtualColumns({columns: null});
          var dataItem = {};
          for (var i = 0; i < this.columns.length; i++) {
            dataItem[this.columns[i].dataField] = 'test';
          }
          var dataSource = createDataSource(this, [dataItem]);
          dataSource.load().done(function() {
            $__4.columnsController.applyDataSource(dataSource);
            assert.strictEqual($__4.getColumns().length, 50, 'column count');
            assert.strictEqual($__4.getVisibleColumns().length, 11, 'visible column count');
            assert.strictEqual($__4.getVisibleColumns(0, true).length, 50, 'all visible column count');
            done();
          });
        });
        QUnit.test('getVisibleColumns if zero width on initialization (Angular)', function(assert) {
          this.setupVirtualColumns({width: 0});
          this.options.width = 400;
          assert.strictEqual(this.getColumns().length, 50, 'column count');
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns(0, true).length, 50, 'all visible column count');
        });
        QUnit.test('getVisibleColumns should return all visible columns if second argument is true', function(assert) {
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns(0, true).length, 50, 'all visible column count');
        });
        QUnit.test('Virtual column rendering if band columns are exists', function(assert) {
          this.columns.unshift({
            caption: 'Band',
            columns: ['bandField1', 'bandField2']
          });
          this.setupVirtualColumns();
          assert.strictEqual(this.getColumns().length, 53, 'column count');
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns(0).length, 10, 'first header row column count');
          assert.strictEqual(this.getVisibleColumns(0)[9].command, 'virtual', 'first header row last column');
          assert.strictEqual(this.getVisibleColumns(1).length, 3, 'second header row column count');
          assert.strictEqual(this.getVisibleColumns(1)[2].command, 'virtual', 'second header row last column');
          assert.strictEqual(this.getVisibleColumns(0)[0].colspan, 2, 'band colspan');
          assert.strictEqual(this.getVisibleColumns(0)[1].rowspan, 2, 'non-band rowspan');
          assert.strictEqual(this.getVisibleColumns(1)[0].colspan, undefined, 'band child colspan');
          assert.strictEqual(this.getVisibleColumns(1)[0].rowspan, undefined, 'band child rowspan');
        });
        QUnit.test('Virtual column rendering if band columns and fixed columns at left are exists', function(assert) {
          this.columns.unshift({
            caption: 'Band',
            fixed: true,
            columns: ['bandField1', 'bandField2']
          });
          this.setupVirtualColumns();
          assert.strictEqual(this.getColumns().length, 53, 'column count');
          assert.deepEqual(this.getFixedColumns().map(function(column) {
            return column.dataField || column.command;
          }), ['bandField1', 'bandField2', 'transparent'], 'fixed columns');
          assert.strictEqual(this.getFixedColumns()[2].colspan, 9, 'transparent column colspan');
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.caption || column.command;
          }), ['Band', 'Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5', 'Field 6', 'Field 7', 'Field 8', 'virtual'], 'first header row columns');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.colspan;
          }), [2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], 'first header row colspans');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.rowspan;
          }), [undefined, 2, 2, 2, 2, 2, 2, 2, 2, undefined], 'first header row rowspans');
          assert.deepEqual(this.getVisibleColumns(1).map(function(column) {
            return column.caption || column.command;
          }), ['Band Field 1', 'Band Field 2', 'virtual'], 'second header row columns');
        });
        QUnit.test('Virtual column rendering if band columns and fixed columns at left are exists and scroll position at middle', function(assert) {
          this.columns.unshift({
            caption: 'Band',
            fixed: true,
            columns: ['bandField1', 'bandField2']
          });
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 25 - 400 / 2);
          assert.strictEqual(this.getColumns().length, 53, 'column count');
          assert.deepEqual(this.getFixedColumns().map(function(column) {
            return column.caption || column.command;
          }), ['Band Field 1', 'Band Field 2', 'transparent'], 'fixed columns');
          assert.strictEqual(this.getFixedColumns()[2].colspan, 12, 'transparent column colspan');
          assert.strictEqual(this.getVisibleColumns().length, 14, 'visible column count');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.caption || column.command;
          }), ['Band', 'virtual', 'Field 19', 'Field 20', 'Field 21', 'Field 22', 'Field 23', 'Field 24', 'Field 25', 'Field 26', 'Field 27', 'Field 28', 'virtual'], 'first header row columns');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.colspan;
          }), [2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], 'first header row colspans');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.rowspan;
          }), [undefined, undefined, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, undefined], 'first header row rowspans');
          assert.deepEqual(this.getVisibleColumns(1).map(function(column) {
            return column.caption || column.command;
          }), ['Band Field 1', 'Band Field 2', 'virtual', 'virtual'], 'second header row columns');
        });
        QUnit.test('Virtual column rendering if band columns and fixed columns at right are exists', function(assert) {
          this.columns.unshift({
            caption: 'Band',
            fixed: true,
            fixedPosition: 'right',
            columns: ['bandField1', 'bandField2']
          });
          this.setupVirtualColumns();
          assert.strictEqual(this.getColumns().length, 53, 'column count');
          assert.deepEqual(this.getFixedColumns().map(function(column) {
            return column.dataField || column.command;
          }), ['transparent', 'bandField1', 'bandField2'], 'fixed columns');
          assert.strictEqual(this.getFixedColumns()[0].colspan, 11, 'transparent column colspan');
          assert.strictEqual(this.getVisibleColumns().length, 13, 'visible column count');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.caption || column.command;
          }), ['Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5', 'Field 6', 'Field 7', 'Field 8', 'Field 9', 'Field 10', 'virtual', 'Band'], 'first header row columns');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.colspan;
          }), [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2], 'first header row colspans');
          assert.deepEqual(this.getVisibleColumns(0).map(function(column) {
            return column.rowspan;
          }), [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, undefined, undefined], 'first header row rowspans');
          assert.deepEqual(this.getVisibleColumns(1).map(function(column) {
            return column.caption || column.command;
          }), ['virtual', 'Band Field 1', 'Band Field 2'], 'second header row columns');
        });
        QUnit.test('virtual column is not exists if columns count are small', function(assert) {
          this.columns = this.columns.slice(0, 10);
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 10, 'visible column count');
          assert.strictEqual(this.getVisibleColumns().filter(function(column) {
            return column.command;
          }).length, 0, 'no command columns');
        });
        QUnit.test('visible column count should be less if one column have big width', function(assert) {
          this.columns[0].width = 200;
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 6, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[5].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[5].width, 50 * 45, 'virtual column width');
        });
        QUnit.test('visible columns if visibleWidth option is defined in columns', function(assert) {
          this.columns.forEach(function(column) {
            column.visibleWidth = 100;
          });
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 6, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[5].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[5].width, 100 * 45, 'virtual column width');
        });
        QUnit.test('visible columns if command column is fixed and visible', function(assert) {
          this.setupVirtualColumns({
            selection: {mode: 'multiple'},
            columnFixing: {enabled: true}
          });
          this.columnsController.reset();
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[0].command, 'select', 'select column is added to end');
          assert.strictEqual(this.getVisibleColumns()[1].dataField, 'field1', 'data column is added after select');
          assert.strictEqual(this.getVisibleColumns()[10].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[10].width, 50 * 41, 'virtual column width');
        });
      });
      QUnit.module('Scrolling', {
        beforeEach: setupModule,
        afterEach: teardownModule
      }, function() {
        QUnit.test('virtual column location if scroll position at begin', function(assert) {
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[10].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[10].width, 50 * 40, 'virtual column width');
        });
        QUnit.test('virtual column location if scroll position at end', function(assert) {
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 50 - 400);
          assert.strictEqual(this.getVisibleColumns().length, 11, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[0].command, 'virtual', 'virtual column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[0].width, 50 * 40, 'virtual column width');
        });
        QUnit.test('getVisibleColumnIndex with virtual columns', function(assert) {
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 50 - 400);
          assert.equal(this.getVisibleColumnIndex('field41'), 1, 'virtual column after command virtual column');
          assert.equal(this.getVisibleColumnIndex('field1'), -1, 'first column is not rendered');
        });
        QUnit.test('virtual column location if scroll position at middle', function(assert) {
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 25 - 400 / 2);
          assert.strictEqual(this.getVisibleColumns().length, 12, 'visible column count');
          assert.strictEqual(this.getVisibleColumns().filter(function(column) {
            return column.command;
          }).length, 2, 'two command columns are added');
          assert.strictEqual(this.getVisibleColumns()[0].command, 'virtual', 'virtual column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[0].width, 1000, 'virtual column width');
          assert.strictEqual(this.getVisibleColumns()[11].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[11].width, 1000, 'virtual column width');
        });
        QUnit.test('virtual column location if scroll position at begin with fixed columns', function(assert) {
          this.columns[0].fixed = true;
          this.columns[1].fixed = true;
          this.columns[1].fixedPosition = 'right';
          this.setupVirtualColumns();
          assert.strictEqual(this.getVisibleColumns().length, 12, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[0].dataField, 'field1', 'fixed column is added to end');
          assert.strictEqual(this.getVisibleColumns()[1].dataField, 'field3', 'fixed column is added to end');
          assert.strictEqual(this.getVisibleColumns()[10].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[11].dataField, 'field2', 'fixed column is added to end');
        });
        QUnit.test('virtual column location if scroll position at end with fixed columns', function(assert) {
          this.columns[0].fixed = true;
          this.columns[1].fixed = true;
          this.columns[1].fixedPosition = 'right';
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 50 - 400);
          assert.strictEqual(this.getVisibleColumns().length, 12, 'visible column count');
          assert.strictEqual(this.getVisibleColumns()[0].dataField, 'field1', 'fixed column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[1].command, 'virtual', 'virtual column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[1].width, 50 * 39, 'virtual column width');
          assert.strictEqual(this.getVisibleColumns()[10].dataField, 'field50', 'last non-fixed column');
          assert.strictEqual(this.getVisibleColumns()[11].dataField, 'field2', 'fixed column is added to begin');
        });
        QUnit.test('virtual column location if scroll position at middle with fixed columns', function(assert) {
          this.columns[0].fixed = true;
          this.columns[1].fixed = true;
          this.columns[1].fixedPosition = 'right';
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(50 * 25 - 400 / 2);
          assert.strictEqual(this.getVisibleColumns().length, 14, 'visible column count');
          assert.strictEqual(this.getVisibleColumns().filter(function(column) {
            return column.command;
          }).length, 2, 'two command columns are added');
          assert.strictEqual(this.getVisibleColumns()[0].dataField, 'field1', 'fixed column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[1].command, 'virtual', 'virtual column is added to begin');
          assert.strictEqual(this.getVisibleColumns()[1].width, 50 * 19, 'virtual column width');
          assert.strictEqual(this.getVisibleColumns()[12].command, 'virtual', 'virtual column is added to end');
          assert.strictEqual(this.getVisibleColumns()[12].width, 50 * 19, 'virtual column width');
          assert.strictEqual(this.getVisibleColumns()[13].dataField, 'field2', 'fixed column is added to end');
        });
        QUnit.test('columnsChanged event should be fired during scrolling to right', function(assert) {
          var columnsChangedPositions = [];
          var pos;
          this.setupVirtualColumns({width: 420});
          this.columnsController.columnsChanged.add(function(e) {
            assert.deepEqual(e, {
              optionNames: {
                all: true,
                length: 1
              },
              changeTypes: {
                columns: true,
                virtualColumnsScrolling: true,
                length: 2
              }
            }, 'columnsChanged args');
            columnsChangedPositions.push(pos);
          });
          this.columnsController.getVisibleColumns();
          for (pos = 0; pos < 1000; pos += 10) {
            this.columnsController.setScrollPosition(pos);
            var firstColumn = this.columnsController.getVisibleColumns().slice().shift();
            var lastColumn = this.columnsController.getVisibleColumns().slice().pop();
            assert.ok(pos ? firstColumn.width : 0 <= pos, 'left virtual column is outside viewport for position ' + pos);
            assert.ok(lastColumn.width <= 50 * 50 - pos + 420, 'last virtual column is outside viewport for position ' + pos);
          }
          assert.deepEqual(columnsChangedPositions, [90, 340, 590, 840], 'positions with columnsChanged');
        });
        QUnit.test('columnsChanged event should be fired during scrolling to left', function(assert) {
          var pos = 1000;
          var columnsChangedPositions = [];
          this.setupVirtualColumns({width: 420});
          this.columnsController.setScrollPosition(pos);
          this.columnsController.columnsChanged.add(function(e) {
            assert.deepEqual(e, {
              optionNames: {
                all: true,
                length: 1
              },
              changeTypes: {
                columns: true,
                virtualColumnsScrolling: true,
                length: 2
              }
            }, 'columnsChanged args');
            columnsChangedPositions.push(pos);
          });
          for (; pos >= 0; pos -= 10) {
            this.columnsController.setScrollPosition(pos);
            var firstColumn = this.columnsController.getVisibleColumns().slice().shift();
            var lastColumn = this.columnsController.getVisibleColumns().slice().pop();
            assert.ok(pos ? firstColumn.width : 0 <= pos, 'left virtual column is outside viewport for position ' + pos);
            assert.ok(lastColumn.width <= 50 * 50 - pos + 420, 'last virtual column is outside viewport for position ' + pos);
          }
          assert.deepEqual(columnsChangedPositions, [950, 700, 450, 200]);
        });
        QUnit.test('The column index offset should depend on fixed columns', function(assert) {
          this.setupVirtualColumns();
          this.columnsController.setScrollPosition(400);
          var offset = this.columnsController.getColumnIndexOffset();
          assert.equal(offset, 4, 'offset without fixed columns');
          this.columnOption(0, 'fixed', true);
          offset = this.columnsController.getColumnIndexOffset();
          assert.equal(offset, 3, 'offset with fixed column');
        });
        QUnit.test('Scrolling timeout should be zero when renderAsync is false', function(assert) {
          this.setupVirtualColumns();
          this.options.scrolling.renderAsync = false;
          this.options.scrolling.columnRenderingThreshold = 110;
          this.options.scrolling.timeout = 100;
          this.columnsController._renderTime = 150;
          var timeout = this.columnsController.getScrollingTimeout();
          assert.equal(timeout, 0);
        });
        QUnit.test('Scrolling timeout should be set to timeout if renderAsync is not defined', function(assert) {
          this.setupVirtualColumns();
          this.options.scrolling.columnRenderingThreshold = 110;
          this.options.scrolling.timeout = 100;
          this.columnsController._renderTime = 150;
          var timeout = this.columnsController.getScrollingTimeout();
          assert.equal(timeout, 100);
        });
        QUnit.test('Scrolling timeout should be set to timeout if renderAsync is true', function(assert) {
          this.setupVirtualColumns();
          this.options.scrolling.renderAsync = true;
          this.options.scrolling.columnRenderingThreshold = 110;
          this.options.scrolling.timeout = 100;
          this.columnsController._renderTime = 150;
          var timeout = this.columnsController.getScrollingTimeout();
          assert.equal(timeout, 100);
        });
      });
      QUnit.testStart(function() {
        var markup = '<div id="container" class="dx-data-grid"></div>';
        $('#qunit-fixture').html(markup);
      });
      setupRenderingModule = function() {
        var columns = [];
        for (var i = 1; i <= 50; i++) {
          columns.push({dataField: 'field' + i});
        }
        this.columns = columns;
        this.setupModules = function(options) {
          this.$element = function() {
            return $('#container');
          };
          if (options.width) {
            this.$element().css('width', options.width);
          }
          dataGridMocks.setupDataGridModules(this, ['data', 'columns', 'columnFixing', 'rows', 'columnHeaders', 'summary', 'gridView', 'virtualScrolling', 'virtualColumns'], {
            initDefaultOptions: true,
            initViews: true,
            options: options
          });
        };
        this.setupVirtualColumns = function(options) {
          this.setupModules($.extend(true, {
            scrolling: {
              columnRenderingMode: 'virtual',
              useNative: false
            },
            columnWidth: 50,
            columns: this.columns,
            dataSource: [{}]
          }, options));
        };
        this.getColumns = function(parameterNames) {
          return this.columnsController.getColumns();
        };
        this.clock = sinon.useFakeTimers();
      };
      teardownRenderingModule = function() {
        this.clock.restore();
        this.dispose();
      };
      QUnit.module('Rendering', {
        beforeEach: setupRenderingModule,
        afterEach: teardownRenderingModule
      }, function() {
        QUnit.test('virtualize columns by width from styles', function(assert) {
          $('#container').css('width', '200');
          this.setupVirtualColumns();
          assert.strictEqual(this.getColumns().length, 50, 'column count');
          assert.strictEqual(this.getVisibleColumns().length, 6, 'visible column count');
        });
        QUnit.test('columnHeaders scroll position during virtual scrolling', function(assert) {
          this.setupVirtualColumns({
            width: 200,
            scrolling: {mode: 'virtual'},
            summary: {totalItems: [{
                column: 'field1',
                summaryType: 'count'
              }]}
          });
          this.gridView.render($('#container'));
          this.gridView.update();
          this.clock.tick(30);
          this.getScrollable().scrollTo({left: 200});
          assert.strictEqual(this.columnHeadersView.element().children().scrollLeft(), 200, 'scrollLeft in headersView');
          assert.strictEqual(this.footerView.element().children().scrollLeft(), 200, 'scrollLeft in footerView');
        });
        QUnit.test('Column visibility update properly when columnAutoWidth=true', function(assert) {
          for (var i = 4; i < this.columns.length; i++) {
            this.columns[i].visible = false;
          }
          this.setupVirtualColumns({
            width: 700,
            columnWidth: null,
            'columnAutoWidth': true,
            scrolling: {
              mode: 'virtual',
              updateTimeout: 0
            }
          });
          this.gridView.render($('#container'));
          this.gridView.update();
          this.clock.tick(30);
          this.columnsController.columnOption('field5', 'visible', true);
          this.columnsController.columnOption('field6', 'visible', true);
          this.columnsController.columnOption('field7', 'visible', true);
          assert.strictEqual(this.columnHeadersView.element().find('tr td').length, 7);
        });
        QUnit.test('Update is not fired twice if columnAutoWidth=true', function(assert) {
          var headerCellTemplate = function(container, options) {
            $(container).width(200).text(options.text);
          };
          for (var i = 0; i < this.columns.length; i++) {
            this.columns[i].headerCellTemplate = headerCellTemplate;
          }
          this.setupVirtualColumns({
            width: 500,
            columnWidth: null,
            columnAutoWidth: true,
            scrolling: {
              mode: 'virtual',
              updateTimeout: 0
            }
          });
          this.gridView.render($('#container'));
          this.clock.tick(10);
          var columnsChangedSpy = sinon.spy();
          this.columnsController.columnsChanged.add(columnsChangedSpy);
          this.gridView.update();
          this.clock.tick(10);
          assert.strictEqual(this.columnHeadersView.element().find('tr td').length, 11);
          assert.ok(columnsChangedSpy.calledOnce, 'columns changed is called once');
        });
        QUnit.test('columns should be update on scrolling', function(assert) {
          this.setupVirtualColumns({width: 200});
          this.gridView.render($('#container'));
          this.gridView.update();
          this.clock.tick(30);
          this.getScrollable().scrollTo({left: 400});
          var $cells = this.rowsView.element().find('.dx-data-row').children();
          assert.strictEqual($cells.length, 12, 'cell count in data row');
          assert.strictEqual($cells[0].getBoundingClientRect().width, 250, 'virtual cell width');
          assert.strictEqual(this.getVisibleColumns()[1].dataField, 'field6', 'first rendered dataField');
        });
        QUnit.test('columns in rtl', function(assert) {
          this.setupVirtualColumns({
            rtlEnabled: true,
            width: 200
          });
          this.gridView.render($('#container'));
          this.gridView.update();
          this.clock.tick(30);
          var $cells = this.rowsView.element().find('.dx-data-row').children();
          assert.strictEqual($cells.length, 6, 'cell count in data row');
          assert.strictEqual(getOuterWidth($cells.eq(0)), 50, 'first cell width');
          assert.strictEqual(getOuterWidth($cells.eq(5)), 2250, 'virtual cell width');
          assert.strictEqual(this.getVisibleColumns()[0].dataField, 'field1', 'first rendered dataField');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/dataGridMocks.js","ui/data_grid","generic_light.css!","data/data_source/data_source","ui/data_grid/ui.data_grid.data_source_adapter","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/dataGridMocks.js"), require("ui/data_grid"), require("generic_light.css!"), require("data/data_source/data_source"), require("ui/data_grid/ui.data_grid.data_source_adapter"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtualColumns.tests.js.map