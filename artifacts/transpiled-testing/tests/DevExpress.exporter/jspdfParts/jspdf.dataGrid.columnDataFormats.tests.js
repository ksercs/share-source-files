!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.columnDataFormats.tests.js"], ["../../../helpers/noIntl.js","node_modules/intl/index.js","exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.columnDataFormats.tests.js", ["../../../helpers/noIntl.js", "node_modules/intl/index.js", "exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
  "use strict";
  var exportDataGrid,
      moduleConfig,
      createMockPdfDoc,
      createDataGrid;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      exportDataGrid = $__m.exportDataGrid;
    }, function($__m) {
      moduleConfig = $__m.moduleConfig;
      createMockPdfDoc = $__m.createMockPdfDoc;
      createDataGrid = $__m.createDataGrid;
    }],
    execute: function() {
      QUnit.module('Column data formats', moduleConfig, function() {
        QUnit.test('columns.dataType: date, columns.format.type: [\'millisecond\', \'second\', \'minute\', \'hour\', \'day\', \'month\', \'year\', \'quarter\', \'monthAndDay\', \'monthAndYear\', \'quarterAndYear\', \'shortDate\', \'shortTime\', \'longDateLongTim, \'shortDateShortT, \'longDate\', \'longTime\', \'dayOfWeek\', \'yyyy-MM-dd\']', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dateValue = new Date(2019, 9, 9, 9, 9, 9, 9);
          var columns = [{
            dataField: 'f1',
            dataType: 'datetime',
            format: 'millisecond'
          }, {
            dataField: 'f2',
            dataType: 'datetime',
            format: 'second'
          }, {
            dataField: 'f3',
            dataType: 'datetime',
            format: 'minute'
          }, {
            dataField: 'f4',
            dataType: 'datetime',
            format: 'hour'
          }, {
            dataField: 'f5',
            dataType: 'datetime',
            format: 'day'
          }, {
            dataField: 'f6',
            dataType: 'datetime',
            format: 'month'
          }, {
            dataField: 'f7',
            dataType: 'datetime',
            format: 'year'
          }, {
            dataField: 'f8',
            dataType: 'datetime',
            format: 'quarter'
          }, {
            dataField: 'f9',
            dataType: 'datetime',
            format: 'monthAndDay'
          }, {
            dataField: 'f10',
            dataType: 'datetime',
            format: 'monthAndYear'
          }, {
            dataField: 'f11',
            dataType: 'datetime',
            format: 'quarterAndYear'
          }, {
            dataField: 'f12',
            dataType: 'datetime',
            format: 'shortDate'
          }, {
            dataField: 'f13',
            dataType: 'datetime',
            format: 'shortTime'
          }, {
            dataField: 'f14',
            dataType: 'datetime',
            format: 'longDateLongTime'
          }, {
            dataField: 'f15',
            dataType: 'datetime',
            format: 'shortDateShortTime'
          }, {
            dataField: 'f16',
            dataType: 'datetime',
            format: 'longDate'
          }, {
            dataField: 'f17',
            dataType: 'datetime',
            format: 'longTime'
          }, {
            dataField: 'f18',
            dataType: 'datetime',
            format: 'dayOfWeek'
          }, {
            dataField: 'f19',
            dataType: 'datetime',
            format: 'yyyy-MM-dd'
          }];
          var columnWidths = [];
          var dataSource = [{}];
          columns.forEach(function(column) {
            dataSource[0][column.dataField] = dateValue;
            var isLongLine = ['longDateLongTime', 'shortDateShortTime', 'longDate'].indexOf(column.format) !== -1;
            columnWidths.push(isLongLine ? 210 : 80);
          });
          var dataGrid = createDataGrid({
            columns: columns,
            dataSource: dataSource,
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,009,55,65.75,{baseline:middle}', 'text,09,135,65.75,{baseline:middle}', 'text,09,215,65.75,{baseline:middle}', 'text,09,295,65.75,{baseline:middle}', 'text,9,375,65.75,{baseline:middle}', 'text,October,455,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,80,21.5', 'rect,210,55,80,21.5', 'rect,290,55,80,21.5', 'rect,370,55,80,21.5', 'rect,450,55,80,21.5', 'addPage,', 'text,2019,45,65.75,{baseline:middle}', 'text,Q4,125,65.75,{baseline:middle}', 'text,October 9,205,65.75,{baseline:middle}', 'text,October 2019,285,65.75,{baseline:middle}', 'text,Q4 2019,365,65.75,{baseline:middle}', 'text,10/9/2019,445,65.75,{baseline:middle}', 'rect,40,55,80,21.5', 'rect,120,55,80,21.5', 'rect,200,55,80,21.5', 'rect,280,55,80,21.5', 'rect,360,55,80,21.5', 'rect,440,55,80,21.5', 'addPage,', 'text,9:09 AM,45,65.75,{baseline:middle}', 'text,Wednesday, October 9, 2019 at 9:09:09 AM,125,65.75,{baseline:middle}', 'text,10/9/2019, 9:09 AM,335,65.75,{baseline:middle}', 'rect,40,55,80,21.5', 'rect,120,55,210,21.5', 'rect,330,55,210,21.5', 'addPage,', 'text,Wednesday, October 9, 2019,45,65.75,{baseline:middle}', 'text,9:09:09 AM,255,65.75,{baseline:middle}', 'text,Wednesday,335,65.75,{baseline:middle}', 'text,2019-10-09,415,65.75,{baseline:middle}', 'rect,40,55,210,21.5', 'rect,250,55,80,21.5', 'rect,330,55,80,21.5', 'rect,410,55,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: columnWidths
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'percent\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'percent'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,100.000%,145,65.75,{baseline:middle,align:right}', 'text,100%,245,65.75,{baseline:middle,align:right}', 'text,100%,345,65.75,{baseline:middle,align:right}', 'text,100.0%,445,65.75,{baseline:middle,align:right}', 'text,100.000000%,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'fixedPoint\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'fixedPoint'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,1.000,145,65.75,{baseline:middle,align:right}', 'text,1,245,65.75,{baseline:middle,align:right}', 'text,1,345,65.75,{baseline:middle,align:right}', 'text,1.0,445,65.75,{baseline:middle,align:right}', 'text,1.000000,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'decimal\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'decimal'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,001,145,65.75,{baseline:middle,align:right}', 'text,1,245,65.75,{baseline:middle,align:right}', 'text,1,345,65.75,{baseline:middle,align:right}', 'text,1,445,65.75,{baseline:middle,align:right}', 'text,000001,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'exponential\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'exponential'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,1.000E+0,145,65.75,{baseline:middle,align:right}', 'text,1E+0,245,65.75,{baseline:middle,align:right}', 'text,1.0E+0,345,65.75,{baseline:middle,align:right}', 'text,1.0E+0,445,65.75,{baseline:middle,align:right}', 'text,1.000000E+0,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'largeNumber\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'largeNumber'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,1.000,145,65.75,{baseline:middle,align:right}', 'text,1,245,65.75,{baseline:middle,align:right}', 'text,1,345,65.75,{baseline:middle,align:right}', 'text,1.0,445,65.75,{baseline:middle,align:right}', 'text,1.000000,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'thousands\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'thousands'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,0.001K,145,65.75,{baseline:middle,align:right}', 'text,0K,245,65.75,{baseline:middle,align:right}', 'text,0K,345,65.75,{baseline:middle,align:right}', 'text,0.0K,445,65.75,{baseline:middle,align:right}', 'text,0.001000K,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'millions\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'millions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,0.000M,145,65.75,{baseline:middle,align:right}', 'text,0M,245,65.75,{baseline:middle,align:right}', 'text,0M,345,65.75,{baseline:middle,align:right}', 'text,0.0M,445,65.75,{baseline:middle,align:right}', 'text,0.000001M,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'billions\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'billions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,0.000B,145,65.75,{baseline:middle,align:right}', 'text,0B,245,65.75,{baseline:middle,align:right}', 'text,0B,345,65.75,{baseline:middle,align:right}', 'text,0.0B,445,65.75,{baseline:middle,align:right}', 'text,0.000000B,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'trillions\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'trillions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 6
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,0.000T,145,65.75,{baseline:middle,align:right}', 'text,0T,245,65.75,{baseline:middle,align:right}', 'text,0T,345,65.75,{baseline:middle,align:right}', 'text,0.0T,445,65.75,{baseline:middle,align:right}', 'text,0.000000T,545,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('columns.dataType: number, columns.format.type: \'currency\' with presicion', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 2
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 4
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 0
              }
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {type: 'currency'}
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 1
              }
            }, {
              dataField: 'f6',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 5
              }
            }],
            dataSource: [{
              f1: 1,
              f2: 1,
              f3: 1,
              f4: 1,
              f5: 1,
              f6: 1
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,$1.00,125,65.75,{baseline:middle,align:right}', 'text,$1.0000,205,65.75,{baseline:middle,align:right}', 'text,$1,285,65.75,{baseline:middle,align:right}', 'text,$1,365,65.75,{baseline:middle,align:right}', 'text,$1.0,445,65.75,{baseline:middle,align:right}', 'text,$1.00000,525,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,80,21.5', 'rect,210,55,80,21.5', 'rect,290,55,80,21.5', 'rect,370,55,80,21.5', 'rect,450,55,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 80, 80, 80, 80, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/noIntl.js","intl","exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/noIntl.js"), require("intl"), require("exporter/jspdf/export_data_grid"), require("./jspdf.dataGrid_utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.dataGrid.columnDataFormats.tests.js.map