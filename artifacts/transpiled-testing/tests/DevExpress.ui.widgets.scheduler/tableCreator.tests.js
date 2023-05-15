!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/tableCreator.tests.js"], ["ui/scheduler/table_creator"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/tableCreator.tests.js", ["ui/scheduler/table_creator"], function($__export) {
  "use strict";
  var tableCreator,
      FIXTURE_DATA;
  function checkCell(cell, expectedData, assert) {
    var parentRow = cell.parentElement;
    assert.equal(parentRow.getElementsByTagName('td').length, expectedData.totalCellCount, 'Cell Count is OK');
    assert.equal(cell.textContent, expectedData.textContent, 'Cell text is OK');
    assert.strictEqual(cell.getAttribute('rowspan'), expectedData.rowspan, 'Cell rowspan is OK');
  }
  return {
    setters: [function($__m) {
      tableCreator = $__m.tableCreator;
    }],
    execute: function() {
      FIXTURE_DATA = [{
        title: 'o1',
        children: [{
          title: 'r1',
          children: [{title: 'a1'}, {title: 'a2'}]
        }, {
          title: 'r2',
          children: [{title: 'a1'}, {title: 'a2'}]
        }, {
          title: 'r3',
          children: [{title: 'a1'}, {title: 'a2'}]
        }]
      }, {
        title: 'o2',
        children: [{
          title: 'r1',
          children: [{title: 'a1'}, {title: 'a2'}]
        }, {
          title: 'r2',
          children: [{title: 'a1'}, {title: 'a2'}]
        }, {
          title: 'r3',
          children: [{title: 'a1'}, {title: 'a2'}]
        }]
      }];
      QUnit.module('Vertical table');
      QUnit.test('Default rendering', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA);
        var rows = table.getElementsByTagName('tr');
        var cells = table.getElementsByTagName('td');
        assert.equal(table.tagName.toLowerCase(), 'table', 'Table is created');
        assert.equal(rows.length, 12, 'Row count is OK');
        checkCell(cells[0], {
          totalCellCount: 3,
          textContent: 'o1',
          rowspan: '6'
        }, assert);
        checkCell(cells[1], {
          totalCellCount: 3,
          textContent: 'r1',
          rowspan: '2'
        }, assert);
        checkCell(cells[2], {
          totalCellCount: 3,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[3], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
        checkCell(cells[4], {
          totalCellCount: 2,
          textContent: 'r2',
          rowspan: '2'
        }, assert);
        checkCell(cells[5], {
          totalCellCount: 2,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[6], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
        checkCell(cells[7], {
          totalCellCount: 2,
          textContent: 'r3',
          rowspan: '2'
        }, assert);
        checkCell(cells[8], {
          totalCellCount: 2,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[9], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
        checkCell(cells[10], {
          totalCellCount: 3,
          textContent: 'o2',
          rowspan: '6'
        }, assert);
        checkCell(cells[11], {
          totalCellCount: 3,
          textContent: 'r1',
          rowspan: '2'
        }, assert);
        checkCell(cells[12], {
          totalCellCount: 3,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[13], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
        checkCell(cells[14], {
          totalCellCount: 2,
          textContent: 'r2',
          rowspan: '2'
        }, assert);
        checkCell(cells[15], {
          totalCellCount: 2,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[16], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
        checkCell(cells[17], {
          totalCellCount: 2,
          textContent: 'r3',
          rowspan: '2'
        }, assert);
        checkCell(cells[18], {
          totalCellCount: 2,
          textContent: 'a1',
          rowspan: null
        }, assert);
        checkCell(cells[19], {
          totalCellCount: 1,
          textContent: 'a2',
          rowspan: null
        }, assert);
      });
      QUnit.test('Cells rendering using the \'th\' tag', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA, {cellTag: 'th'});
        var cells = table.getElementsByTagName('th');
        assert.equal(cells.length, 20, 'Cells are OK');
      });
      QUnit.test('Custom css class for the table', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA, {groupTableClass: 'group-table'});
        assert.equal(table.className, 'group-table', 'The table css class is OK');
      });
      QUnit.test('Custom css class for rows', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA, {groupRowClass: 'group-row'});
        var rows = table.getElementsByTagName('tr');
        Array.prototype.forEach.call(rows, function(row) {
          assert.equal(row.className, 'group-row', 'The row css class is OK');
        });
      });
      QUnit.test('Custom css class for cells', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA, {groupCellClass: 'group-cell'});
        var cells = table.getElementsByTagName('td');
        Array.prototype.forEach.call(cells, function(cell) {
          assert.equal(cell.className, 'group-cell', 'The cell css class is OK');
        });
      });
      QUnit.test('Custom content for cells', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, FIXTURE_DATA, {groupCellCustomContent: function(cell, cellText) {
            var innerCellContent = document.createElement('div');
            innerCellContent.className = 'cell-content';
            innerCellContent.appendChild(cellText);
            cell.appendChild(innerCellContent);
          }});
        var cells = table.getElementsByTagName('td');
        Array.prototype.forEach.call(cells, function(cell) {
          assert.equal(cell.getElementsByClassName('cell-content').length, 1, 'The cell content is OK');
        });
      });
      QUnit.test('Custom \'children\' and \'title\' fields', function(assert) {
        var table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, [{
          name: 'One',
          items: [{name: 'Sub 1'}, {name: 'Sub 2'}]
        }], {
          childrenField: 'items',
          titleField: 'name'
        });
        var rows = table.getElementsByTagName('tr');
        assert.equal(rows.length, 2, 'Rows are OK');
        assert.equal(rows[0].getElementsByTagName('td').length, 2, 'Cells are OK');
        assert.equal(rows[1].getElementsByTagName('td').length, 1, 'Cell is OK');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/scheduler/table_creator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/scheduler/table_creator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tableCreator.tests.js.map