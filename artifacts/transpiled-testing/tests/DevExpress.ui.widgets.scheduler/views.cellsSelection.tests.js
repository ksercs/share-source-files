!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/views.cellsSelection.tests.js"], ["generic_light.css!","animation/fx","../../helpers/scheduler/helpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/views.cellsSelection.tests.js", ["generic_light.css!", "animation/fx", "../../helpers/scheduler/helpers.js"], function($__export) {
  "use strict";
  var fx,
      createWrapper,
      initTestMarkup,
      CLASSES,
      isDesktopEnvironment,
      test,
      module,
      testStart,
      SELECTED_CELL_CLASS;
  return {
    setters: [function($__m) {}, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      createWrapper = $__m.createWrapper;
      initTestMarkup = $__m.initTestMarkup;
      CLASSES = $__m.CLASSES;
      isDesktopEnvironment = $__m.isDesktopEnvironment;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, module = $__4.module, testStart = $__4.testStart, $__4));
      SELECTED_CELL_CLASS = CLASSES.selectedCell.slice(1);
      testStart(function() {
        return initTestMarkup();
      });
      module('Cells Selection', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        if (isDesktopEnvironment()) {
          ['standard', 'virtual'].forEach(function(scrollingMode) {
            [{
              startCell: 4,
              endCell: 6,
              intermediateCells: [12],
              selectedCellsAmount: 5,
              cellFromAnotherGroup: 7,
              view: 'day'
            }, {
              startCell: 29,
              endCell: 33,
              intermediateCells: [85, 87],
              selectedCellsAmount: 9,
              cellFromAnotherGroup: 20,
              view: 'week'
            }, {
              startCell: 19,
              endCell: 39,
              intermediateCells: [29],
              selectedCellsAmount: 11,
              cellFromAnotherGroup: 24,
              view: 'month'
            }].forEach(function($__5) {
              var $__6 = $__5,
                  startCell = $__6.startCell,
                  endCell = $__6.endCell,
                  intermediateCells = $__6.intermediateCells,
                  selectedCellsAmount = $__6.selectedCellsAmount,
                  cellFromAnotherGroup = $__6.cellFromAnotherGroup,
                  view = $__6.view;
              test(("Mouse Multiselection should work correctly with " + view + " when it is grouped by date when scrolling is " + scrollingMode), function(assert) {
                var scheduler = createWrapper({
                  views: [{
                    type: view,
                    groupOrientation: 'horizontal',
                    groupByDate: true,
                    intervalCount: 2
                  }],
                  currentView: view,
                  currentDate: new Date(2021, 0, 11),
                  startDayHour: 0,
                  endDayHour: 2,
                  scrolling: {mode: scrollingMode},
                  resources: [{
                    fieldExpr: 'ownerId',
                    dataSource: [{
                      id: 1,
                      text: 'A'
                    }, {
                      id: 2,
                      text: 'B'
                    }]
                  }],
                  groups: ['ownerId'],
                  height: 600,
                  width: 2000
                });
                scheduler.workSpace.selectCells(startCell, endCell);
                var cells = scheduler.workSpace.getCells();
                assert.equal(scheduler.workSpace.getSelectedCells().length, selectedCellsAmount, 'the amount of selected cells is correct');
                assert.ok(cells.eq(startCell).hasClass(SELECTED_CELL_CLASS), 'the start cell is selected');
                assert.ok(cells.eq(endCell).hasClass(SELECTED_CELL_CLASS), 'the end cell is selected');
                intermediateCells.forEach(function(cell) {
                  assert.ok(cells.eq(cell).hasClass(SELECTED_CELL_CLASS), 'intermediate cell is selected');
                });
                scheduler.workSpace.selectCells(endCell, cellFromAnotherGroup);
                cells = scheduler.workSpace.getCells();
                assert.equal(scheduler.workSpace.getSelectedCells().length, selectedCellsAmount, 'the amount of selected cells has not changed');
                assert.ok(cells.eq(startCell).hasClass(SELECTED_CELL_CLASS), 'the start cell is selected');
                assert.ok(cells.eq(endCell).hasClass(SELECTED_CELL_CLASS), 'the end cell is selected');
                intermediateCells.forEach(function(cell) {
                  assert.ok(cells.eq(cell).hasClass(SELECTED_CELL_CLASS), 'intermediate cell is selected');
                });
                assert.notOk(cells.eq(cellFromAnotherGroup).hasClass(SELECTED_CELL_CLASS), 'cell from another group is not selected');
              });
            });
          });
          test('Header should not rerender while selection', function(assert) {
            var scheduler = createWrapper({
              views: ['week'],
              currentView: 'week',
              currentDate: new Date(2021, 0, 11),
              startDayHour: 0,
              endDayHour: 2,
              height: 600,
              width: 800
            });
            var renderRHeaderPanelSpy = sinon.spy(scheduler.instance.getWorkSpace(), 'renderRHeaderPanel');
            scheduler.workSpace.selectCells(2, 4);
            assert.equal(renderRHeaderPanelSpy.callCount, 0, 'Header was not render');
          });
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","animation/fx","../../helpers/scheduler/helpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("animation/fx"), require("../../helpers/scheduler/helpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=views.cellsSelection.tests.js.map